// 새 가게 등록을 한 번에: node tools/register-shop.mjs <가게id> [정보.json, 기본 .scratch/<가게id>/register.json]
//   node tools/register-shop.mjs --example   → 정보.json 예시를 보여 준다
// 하는 일(이미 들어 있으면 건너뜀 — 여러 번 돌려도 같은 결과):
//   _shared/sync-lang·sync-dasan·sync-stores 의 SHOPS · tools/seo.mjs 의 SHOPS · tools/export.sh 의 name()
//   sales/content.js 의 DEMOS · sales/stores/data.js 의 STORES · docs/stores.md 표 한 줄
//   → demo.mjs(카드 사진) → analytics.mjs <가게> → seo.mjs <가게>   (다른 가게 파일은 건드리지 않는다)
// 주소·지도 링크는 그 가게 menu.js 의 RESTAURANT(address·mapUrl)에서 읽는다(정보.json 의 address·map 이 있으면 그쪽).
// 만든 이유(2026-11-11): 등록을 손으로 10여 번에 나눠 하면서 가게당 토큰 약 120만이 들었다.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const EXAMPLE = {
  ko: '성저최고돼지국밥',
  name: '성저최고돼지국밥 SEONGJEO',
  sub: '순대국밥 · 모듬순대 · 수육 · 닭갈비 · 국물요리',
  region: 'bacninh', cats: ['korean'], tags: [],
  type: { ko: '한식 · 돼지국밥 · 순대 · 수육', vi: 'Cơm canh thịt Hàn Quốc · Canh lòng · Thịt luộc', en: 'Korean pork soup · Sundae · Boiled pork', zh: '韩式猪肉汤饭 · 血肠 · 白切肉', ja: '韓国豚クッパ・スンデ・ポッサム' },
  keywords: '가게 이름(한글·영문·다른 표기) 대표 메뉴 지역 이름을 띄어쓰기로',
  schema: 'Restaurant', cuisine: ['Korean', 'Pork Soup', 'Sundae'], og: 'img/sign.jpg',
  map: 'https://www.google.com/maps/place/… (수집기 maps_url, menu.js 에 mapUrl 이 있으면 생략)',
  listing: true,
  storesRow: '성저최고돼지국밥 Seongjeo — 순대국밥·수육 (주소, 전화, 영업시간) — **가게 찾기용**(날짜). 맨 위는 간판 사진. 메뉴 51개',
};
const NOTE = `// ko=보내는 파일에 붙는 상호 · name=가게 찾기 목록 이름 · sub=대표 메뉴 한 줄 · type=5개 언어 한 줄 소개
// region·cats·tags 는 sales/stores/data.js 의 REGIONS·CATS·TAGS 에 있는 값만 · schema=Restaurant|BarOrPub|CafeOrCoffeeShop
// og=링크 미리보기 사진(대표 요리 사진, 없으면 img/sign.jpg 또는 img/logo.png) · listing=true 가게 찾기용(false 정식)
// storesRow=docs/stores.md 표의 둘째 칸`;

const [id, file = id && `.scratch/${id}/register.json`] = process.argv.slice(2);
if (id === '--example') { console.log(NOTE + '\n' + JSON.stringify(EXAMPLE, null, 2)); process.exit(0); }
const die = (m) => { console.error('등록 멈춤: ' + m); process.exit(1); };
if (!/^[a-z0-9]+$/.test(id || '')) die('사용법: node tools/register-shop.mjs <가게id> [정보.json]  (예시: --example)');
const dir = path.join(ROOT, 'restaurants', id);
if (!fs.existsSync(path.join(dir, 'menu.js'))) die(`restaurants/${id}/menu.js 가 없음(먼저 new-shop.mjs)`);
if (!fs.existsSync(path.resolve(ROOT, file))) die(`${file} 가 없음. node tools/register-shop.mjs --example 로 예시를 보고 만든다`);
const J = JSON.parse(fs.readFileSync(path.resolve(ROOT, file), 'utf8'));

// 가게 정보(menu.js)와 목록에서 쓸 수 있는 값
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(dir, 'menu.js'), 'utf8'), ctx);
const R = ctx.window.RESTAURANT || {};
const dctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'sales/stores/data.js'), 'utf8'), dctx);
const D = dctx.window;
const address = J.address || R.address, map = J.map || R.mapUrl;

const miss = [];
for (const k of ['ko', 'name', 'sub', 'region', 'keywords', 'storesRow']) if (!J[k] || typeof J[k] !== 'string') miss.push(k);
for (const l of ['ko', 'vi', 'en', 'zh', 'ja']) if (!J.type?.[l]) miss.push('type.' + l);
if (!Array.isArray(J.cats) || !J.cats.length) miss.push('cats');
if (!Array.isArray(J.cuisine) || !J.cuisine.length) miss.push('cuisine');
if (!address) miss.push('address(menu.js RESTAURANT.address)');
if (!map) miss.push('map(menu.js RESTAURANT.mapUrl 또는 정보.json map)');
if (miss.length) die('정보.json 에 빠진 값: ' + miss.join(', '));
if (!D.REGIONS[J.region]) die(`region "${J.region}" 없음. 쓸 수 있는 값: ${Object.keys(D.REGIONS).join(' ')}`);
for (const c of J.cats) if (!D.CATS[c]) die(`cats "${c}" 없음. 쓸 수 있는 값: ${Object.keys(D.CATS).join(' ')}`);
for (const t of J.tags || []) if (!D.TAGS[t]) die(`tags "${t}" 없음. 쓸 수 있는 값: ${Object.keys(D.TAGS).join(' ')}`);
const og = J.og || 'img/sign.jpg';
if (!fs.existsSync(path.join(dir, og))) die(`og 사진 ${og} 가 restaurants/${id}/ 에 없음`);
if (/TODO/.test(JSON.stringify(J))) die('정보.json 에 TODO 가 남아 있음');

// 파일 고치기: 줄바꿈(LF/CRLF)은 원래대로 둔다
const done = [];
function edit(rel, has, fn) {
  const p = path.join(ROOT, rel);
  const raw = fs.readFileSync(p, 'utf8');
  const crlf = raw.includes('\r\n');
  const s = raw.replace(/\r\n/g, '\n');
  if (has(s)) { done.push(`${rel}: 이미 있음`); return; }
  const out = fn(s);
  if (out === s) die(`${rel} 에서 넣을 자리를 못 찾음`);
  fs.writeFileSync(p, crlf ? out.replace(/\n/g, '\r\n') : out);
  done.push(`${rel}: 넣음`);
}
const before = (s, mark, add) => { const i = s.indexOf(mark); return i < 0 ? s : s.slice(0, i) + add + s.slice(i); };
const q = (v) => JSON.stringify(v);
const obj5 = (o) => `{ ko: ${q(o.ko)}, vi: ${q(o.vi)}, en: ${q(o.en)}, zh: ${q(o.zh)}, ja: ${q(o.ja)} }`;
const url = `https://${id}.qrmenuasia.com`;

for (const f of ['sync-lang.sh', 'sync-dasan.sh', 'sync-stores.sh']) {
  edit(`restaurants/_shared/${f}`, (s) => new RegExp(`^SHOPS="[^"\\n]*\\b${id}\\b`, 'm').test(s),
    (s) => s.replace(/^SHOPS="([^"\n]*)"/m, (m, a) => `SHOPS="${a.trimEnd()} ${id}"`));
}
edit('tools/seo.mjs', (s) => new RegExp(`^  ${id}:`, 'm').test(s),
  (s) => before(s, '};\n\nconst today', `  ${id}: { type: '${J.schema || 'Restaurant'}', cuisine: [${J.cuisine.map((c) => `'${c.replace(/'/g, "\\'")}'`).join(', ')}], country: 'VN', currency: 'VND', og: '${og}' },\n`));
edit('tools/export.sh', (s) => new RegExp(`\\b${id}\\) echo`).test(s),
  (s) => before(s, '    *) echo "$1" ;;', `    ${id}) echo "${J.ko}" ;;\n`));
edit('sales/content.js', (s) => s.includes(`{ id: "${id}",`), (s) => {
  const a = s.indexOf('window.DEMOS = ['), i = s.indexOf('\n];', a);
  if (a < 0 || i < 0) return s;
  return s.slice(0, i + 1) + `  { id: "${id}",${J.listing === false ? '' : ' hidden: true,'} url: "${url}", shot: "img/demo-${id}.jpg", qr: "img/qr-${id}.svg",\n    name: ${q(J.name)}, type: ${obj5(J.type)} },\n` + s.slice(i + 1);
});
edit('sales/stores/data.js', (s) => s.includes(`{ id: "${id}",`), (s) => {
  const a = s.indexOf('window.STORES = ['), i = s.indexOf('\n];', a);
  if (a < 0 || i < 0) return s;
  return s.slice(0, i + 1) + `  { id: "${id}", name: ${q(J.name)}, sub: ${q(J.sub)}, url: "${url}",${J.listing === false ? '' : ' listing: true,'}\n    region: ${q(J.region)}, cats: ${q(J.cats)}, tags: ${q(J.tags || [])},\n    address: ${q(address)}, map: ${q(map)},\n    type: ${obj5(J.type)},\n    keywords: ${q(J.keywords)}\n  },\n` + s.slice(i + 1);
});
edit('docs/stores.md', (s) => s.includes(`| \`restaurants/${id}\` |`), (s) => {
  const lines = s.split('\n');
  let last = -1;
  lines.forEach((l, i) => { if (l.startsWith('| `restaurants/')) last = i; });
  if (last < 0) return s;
  lines.splice(last + 1, 0, `| \`restaurants/${id}\` | ${J.storesRow.replace(/\n/g, ' ')} |`);
  return lines.join('\n');
});
console.log(done.join('\n'));

const run = (...a) => { try { console.log(execFileSync('node', a, { cwd: ROOT, encoding: 'utf8' }).trim().split('\n').slice(-2).join('\n')); } catch (e) { die(`${a.join(' ')} 실패: ${(e.stderr || e.message || '').toString().slice(-300)}`); } };
run('tools/demo.mjs', id);
run('tools/analytics.mjs', id);
run('tools/seo.mjs', id);
console.log(`등록 끝: ${id}. 다음 → node tools/check-shop.mjs ${id}`);
