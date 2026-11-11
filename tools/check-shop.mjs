// 가게 점검·캡처를 한 번에: node tools/check-shop.mjs <가게id> [저장폴더, 기본 dashboard/out]
// 하는 일: seo.mjs <가게>·analytics.mjs <가게>(그 가게만 다시 맞춤) → TODO 남은 수 → check-standard → check-listing
//          → 폰 화면 캡처 <저장폴더>/<가게>-ko.png + 맨 위 부분 .scratch/<가게>/top.png(직접 볼 때는 이 작은 그림) → 커밋 안 한 파일 목록
// **메뉴·번역을 고친 뒤와 커밋 직전에 한 번 더 돌린다** — 번역을 고치고 검색용 정보를 다시 안 만들어 배포가 멈춘 일(2026-11-11 안동집·황금성).
// 만든 이유(2026-11-11): 점검을 명령 여러 번에 나눠 하면서 대화가 길어져 토큰이 많이 들었다.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium, ROOT, serve } from './pw.mjs';

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

const st = execFileSync('git', ['status', '--porcelain', '--untracked-files=all'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter((l) => l && !l.includes('.scratch/'));
const mine = st.filter((l) => l.includes(`restaurants/${id}/`)), other = st.filter((l) => !l.includes(`restaurants/${id}/`) && (!l.startsWith('??') || /^\?\? "?(sales|tools|docs|restaurants)\//.test(l)));
console.log(`■ 커밋 안 한 파일: 이 가게 ${mine.length}개 · 그 밖 ${other.length}개`);
if (other.length) console.log(other.slice(0, 20).map((l) => '  ' + l).join('\n') + (other.length > 20 ? `\n  … 외 ${other.length - 20}개` : ''));
console.log(bad ? `결과: ✘ ${bad}곳 고칠 것` : '결과: 모두 통과');
process.exit(bad ? 1 : 0);
