// 가게 점검·캡처를 한 번에: node tools/check-shop.mjs <가게id> [저장폴더, 기본 dashboard/out]
// 하는 일: seo.mjs <가게>·analytics.mjs <가게>(그 가게만 다시 맞춤) → TODO 남은 수 → check-standard → check-listing
//          → 폰 화면 캡처 <저장폴더>/<가게>-ko.png + 맨 위 부분 .scratch/<가게>/top.png(직접 볼 때는 이 작은 그림) → 카드 사진 sales/img/demo-<가게>.jpg 다시 찍기 → 커밋 안 한 파일 목록
// **메뉴·번역을 고친 뒤와 커밋 직전에 한 번 더 돌린다** — 번역을 고치고 검색용 정보를 다시 안 만들어 배포가 멈춘 일(2026-11-11 안동집·황금성).
// 만든 이유(2026-11-11): 점검을 명령 여러 번에 나눠 하면서 대화가 길어져 토큰이 많이 들었다.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import { chromium, ROOT, serve } from './pw.mjs';

// 정식 가게 결과물: 정식(sales/stores/data.js 에 listing: true 가 없는 가게)은 print/ 에 이 파일이 다 있어야 한다.
// 진미식당이 QR 카드만 만들고 SNS 이미지를 빠뜨린 일(2026-11-13)로 넣었다. 가게 찾기용은 검사하지 않는다.
const PRINT = [['print/table-card-A6.pdf', 'node tools/card.mjs'], ['print/sns-square.png', 'node tools/sns.mjs'], ['print/sns-story.png', 'node tools/sns.mjs']];
const sb = { window: {} }; vm.runInNewContext(fs.readFileSync(`${ROOT}/sales/stores/data.js`, 'utf8'), sb);
const STORES = sb.window.STORES || [];
const isFull = (sid) => { const s = STORES.find((x) => x.id === sid); return !!s && !s.listing; };
const missingPrint = (sid) => PRINT.filter(([f]) => !fs.existsSync(`${ROOT}/restaurants/${sid}/${f}`));

// node tools/check-shop.mjs --print-all : 정식 가게 전부의 결과물 빠짐만 본다(화면 캡처·seo 안 돌림)
if (process.argv[2] === '--print-all') {
  const full = STORES.filter((s) => !s.listing && fs.existsSync(`${ROOT}/restaurants/${s.id}/index.html`));
  const miss = full.map((s) => [s.id, s.name, missingPrint(s.id)]).filter(([, , m]) => m.length);
  console.log(`정식 가게 ${full.length}곳 중 결과물 빠진 곳 ${miss.length}곳`);
  miss.forEach(([sid, name, m]) => console.log(`  ${sid} (${name}): ${m.map(([f]) => f.replace('print/', '')).join(', ')}`));
  process.exit(miss.length ? 1 : 0);
}

const [id, out = 'dashboard/out'] = process.argv.slice(2);
if (!/^[a-z0-9]+$/.test(id || '') || !fs.existsSync(`${ROOT}/restaurants/${id}/index.html`)) { console.error('사용법: node tools/check-shop.mjs <가게id> [저장폴더]'); process.exit(1); }
let bad = 0;
const run = (label, cmd, args, keep = 12) => {
  let text, ok = true;
  try { text = execFileSync(cmd, args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { ok = false; text = `${e.stdout || ''}${e.stderr || ''}` || String(e.message); }
  const lines = text.trim().split('\n').filter((l) => !/^warning: in the working copy/.test(l));
  console.log(`■ ${label}: ${ok ? '통과' : '✘ 실패'}`);
  if (lines.join('').trim()) console.log(lines.slice(-keep).map((l) => '  ' + l.slice(0, 300)).join('\n'));
  if (!ok) bad++;
  return text;
};

run('검색 정보(seo)', 'node', ['tools/seo.mjs', id], 2);
run('방문 기록 코드', 'node', ['tools/analytics.mjs', id], 1);

const todo = ['menu.js', 'index.html'].map((f) => [f, (fs.readFileSync(`${ROOT}/restaurants/${id}/${f}`, 'utf8').match(/TODO/g) || []).length]);
const left = todo.filter(([, n]) => n);
console.log(`■ TODO 남은 곳: ${left.length ? '✘ ' + left.map(([f, n]) => `${f} ${n}개`).join(', ') : '없음'}`);
if (left.length) bad++;

if (isFull(id)) {
  const m = missingPrint(id);
  console.log(`■ 정식 결과물(QR 카드·SNS): ${m.length ? '✘ 빠짐 ' + m.map(([f, c]) => `${f} (${c} ${id})`).join(', ') : '통과'}`);
  if (m.length) bad++;
} else console.log('■ 정식 결과물: 가게 찾기용이라 검사 안 함');

run('가마솥 표준', 'node', ['tools/check-standard.mjs', id], 20);
run('가게 찾기 목록', 'node', ['tools/check-listing.mjs'], 8);

// 캡처: 전체(결재함용) + 맨 위 부분(직접 볼 때)
const outDir = path.resolve(ROOT, out), scratch = `${ROOT}/.scratch/${id}`;
fs.mkdirSync(outDir, { recursive: true }); fs.mkdirSync(scratch, { recursive: true });
const site = await serve(), b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = [];
p.on('pageerror', (e) => errs.push(e.message)); p.on('requestfailed', (r) => errs.push('못 불러옴 ' + r.url().replace(site.url, '')));
p.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(site.url)) errs.push(`${r.status()} ${r.url().replace(site.url, '')}`); });
await p.goto(`${site.url}/restaurants/${id}/index.html?lang=ko`); await p.waitForTimeout(800);
const wide = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
await p.screenshot({ path: `${outDir}/${id}-ko.png`, fullPage: true });
await p.screenshot({ path: `${scratch}/top.png`, clip: { x: 0, y: 0, width: 390, height: 1400 }, fullPage: true });
const pc = await b.newPage({ viewport: { width: 1280, height: 800 } });
await pc.goto(`${site.url}/restaurants/${id}/index.html?lang=ko`); await pc.waitForTimeout(500);
const widePc = await pc.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
await b.close(); site.close();
const shotBad = errs.length || wide > 0 || widePc > 0;
console.log(`■ 화면: ${shotBad ? '✘ ' : '통과 '}폰 가로 넘침 ${wide}px · PC 가로 넘침 ${widePc}px · 오류 ${errs.length ? errs.slice(0, 5).join(' | ') : '없음'}`);
console.log(`  캡처: ${out}/${id}-ko.png (전체) · .scratch/${id}/top.png (맨 위, 직접 볼 때)`);
if (shotBad) bad++;

// 카드 사진(가게 찾기 목록·소개서)을 지금 화면으로 다시 찍는다 — 등록(register-shop) 때 찍은 사진이 꾸미기 전 모습으로 남던 일(2026-11-12 강남면옥 '가마솥' 카드).
const demo = `sales/img/demo-${id}.jpg`;
if (fs.existsSync(`${ROOT}/${demo}`)) run('카드 사진 다시 찍기', 'node', ['tools/demo.mjs', id], 1);
else console.log(`■ 카드 사진: 아직 없음(${demo}) — register-shop.mjs 로 등록하면 생긴다`);

const st = execFileSync('git', ['status', '--porcelain', '--untracked-files=all'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter((l) => l && !l.includes('.scratch/'));
const isMine = (l) => l.includes(`restaurants/${id}/`) || l.includes(demo);
const mine = st.filter(isMine), other = st.filter((l) => !isMine(l) &&(!l.startsWith('??') || /^\?\? "?(sales|tools|docs|restaurants)\//.test(l)));
console.log(`■ 커밋 안 한 파일: 이 가게 ${mine.length}개 · 그 밖 ${other.length}개`);
if (other.length) console.log(other.slice(0, 20).map((l) => '  ' + l).join('\n') + (other.length > 20 ? `\n  … 외 ${other.length - 20}개` : ''));
console.log(bad ? `결과: ✘ ${bad}곳 고칠 것` : '결과: 모두 통과');
process.exit(bad ? 1 : 0);
