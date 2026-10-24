// 가게 메뉴판이 가마솥 표준(docs/standard.md)을 지키는지 점검한다. 새 가게를 만들거나 고친 뒤, 배포 전에 항상.
// 사용법: node tools/check-standard.mjs <가게id> [<가게id>…]   (오류가 있으면 종료 코드 1, '주의'는 사람이 확인)
// 가마솥 표준 이전에 만든 가게(맨 위가 큰 hero 사진 등)는 구조 항목에서 걸릴 수 있다 — 새 가게·고친 가게에만 쓴다.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const ids = process.argv.slice(2);
if (!ids.length) { console.error('사용법: node tools/check-standard.mjs <가게id> …'); process.exit(1); }
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(ROOT, p));

// 그림 크기 (JPEG·PNG 머리만 읽음)
function size(file) {
  const b = fs.readFileSync(file);
  if (b[0] === 0x89 && b[1] === 0x50) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  for (let i = 2; i < b.length - 9;) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1], len = b.readUInt16BE(i + 2);
    if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + len;
  }
  return null;
}

const sb = { window: {} };
vm.runInNewContext(read('sales/stores/data.js'), sb);
const STORES = sb.window.STORES;
const shopsIn = (f) => (read(f).match(/^SHOPS="([^"]*)"/m) || [, ''])[1].split(/\s+/);
let fail = false;

for (const id of ids) {
  const err = [], warn = [];
  const d = `restaurants/${id}`;
  if (!exists(`${d}/index.html`)) { console.log(`\n[${id}] index.html 없음`); fail = true; continue; }
  const h = read(`${d}/index.html`);
  const store = STORES.find((s) => s.id === id);
  const listing = !!store?.listing;

  // ① 화면 구조 (위→아래, 가마솥과 같은 순서)
  const order = [['id="langs"', '언어 버튼'], ['class="logo', '맨 위 로고/간판 사진'], ['<h1>', '가게 이름 h1'], ['id="tagline"', '한 줄 소개'],
    ['id="chips"', '특징 칩'], ['<nav>', '분류 탭'], ['id="menu"', '메뉴'], ['<footer>', '가게 정보'], ['id="call"', '전화'], ['id="map"', '주소·지도'], ['id="foot"', '가격 단위 줄']];
  let at = -1;
  for (const [k, what] of order) {
    const i = h.indexOf(k);
    if (i < 0) err.push(`${what}(${k}) 없음`);
    else if (i < at) err.push(`${what}(${k}) 순서가 가마솥과 다름`);
    else at = i;
  }
  // ② 맨 위: 로고가 있으면 로고, 없으면 간판 사진
  const top = (h.match(/<img class="logo[^"]*" src="([^"]+)"/) || [])[1];
  if (top && !exists(`${d}/${top}`)) err.push(`맨 위 그림 ${top} 파일 없음`);
  if (exists(`${d}/img/logo.png`) && top !== 'img/logo.png') err.push('img/logo.png 가 있는데 맨 위에 로고를 안 씀 (로고가 있으면 항상 로고)');
  if (top === 'img/sign.jpg') warn.push('맨 위가 간판 사진 — 정말 로고가 없는지(수집기 "기타" 사진까지) 확인했는가');
  // ③ 표준 밖 요소 (사용자에게 먼저 묻지 않은 것)
  const foot = (h.match(/<footer>[\s\S]*?<\/footer>/) || [''])[0];
  if (/<img/i.test(foot)) err.push('가게 정보(footer)에 사진이 있음 — 표준에 없는 요소');
  if (/class="hero"/.test(h)) err.push('큰 hero 사진 머리 — 가마솥 표준은 로고/간판 사진 + 가게 이름');
  if (/disclaimer/i.test(h)) err.push('별도 문구 상자(disclaimer) — 문구는 가격 단위 줄 끝에만');
  if (/gamasot|가마솥|GAMASOT/i.test(h.replace(/가마솥밥|가마솥에/g, '')) && id !== 'gamasot') err.push('가마솥 글자가 남아 있음 (복사 후 안 바꾼 곳)');
  if (/TODO/.test(h)) err.push('index.html 에 TODO 남음');
  // ④ 공용 스크립트·순서
  const scripts = ['menu.js', 'api/override', 'dasan.js', 'stores-link.js', 'lang-menu.js', 'qr-home.js', 'api/hit'];
  let s = -1;
  for (const k of scripts) {
    const i = h.indexOf(k);
    if (i < 0) err.push(`${k} 없음`); else if (i < s) err.push(`${k} 순서가 가마솥과 다름`); else s = i;
    if (!k.startsWith('api') && k !== 'menu.js' && !exists(`${d}/${k}`)) err.push(`${d}/${k} 파일 없음 (sync-*.sh)`);
  }
  if (!h.includes(`shop=${id}`)) err.push(`점주 편집 스크립트가 shop=${id} 가 아님`);
  if (listing && /order\.js/.test(h)) err.push('가게 찾기용인데 장바구니(order.js)가 있음');
  if (!listing && !/order\.js/.test(h)) warn.push('정식인데 장바구니(order.js) 없음 — 가게 찾기용이면 data.js 에 listing: true');
  if (!/price == null/.test(h)) err.push('price == null(시가) 처리 없음');
  // ⑤ 하단 '가격 단위' 줄 5개 언어 (가게 찾기용은 구글 지도 문구)
  const vnd = [...h.matchAll(/vnd: "([^"]*)"/g)].map((m) => m[1]);
  if (vnd.length !== 5) err.push(`가격 단위 줄이 5개 언어가 아님(${vnd.length})`);
  else if (listing) [/구글 지도/, /Google Maps/, /谷歌/, /Googleマップ/, /Google Maps/].forEach((r, i) => { if (!r.test(vnd[i])) err.push(`${['ko', 'en', 'zh', 'ja', 'vi'][i]} 가격 단위 줄에 구글 지도 문구 없음`); });
  // ⑥ 글꼴 섞임
  const fams = new Set([...h.matchAll(/@font-face\s*{[^}]*font-family:\s*["']?([^"';]+)/g)].map((m) => m[1]));
  if (fams.size > 1) warn.push(`웹 글꼴이 ${fams.size}개 (${[...fams].join(', ')}) — 한 페이지 글꼴 섞지 않기`);
  // ⑦ 메뉴 데이터·사진
  if (exists(`${d}/menu.js`)) {
    const m = read(`${d}/menu.js`);
    if (/TODO/.test(m)) err.push('menu.js 에 TODO 남음');
    const sbx = { window: {} };
    try { vm.runInNewContext(m, sbx); } catch (e) { err.push('menu.js 실행 오류: ' + e.message); }
    const R = sbx.window.RESTAURANT || {}, MENU = sbx.window.MENU || [];
    for (const k of ['phone', 'address']) if (!R[k]) warn.push(`RESTAURANT.${k} 비어 있음`);
    let n = 0;
    for (const cat of MENU) for (const it of cat.items || []) {
      n++;
      for (const l of ['ko', 'en', 'zh', 'ja', 'vi']) if (!it.name?.[l]) err.push(`메뉴 "${it.name?.ko}" ${l} 이름 없음`);
      if (it.price === undefined && !it.sizes) err.push(`메뉴 "${it.name?.ko}" 가격 없음 (시가는 price: null)`);
      if (it.photo) {
        const f = path.join(ROOT, d, it.photo);
        if (!fs.existsSync(f)) err.push(`사진 없음: ${it.photo}`);
        else { const z = size(f); if (z && Math.max(...z) < 360) warn.push(`작은 사진 ${it.photo} ${z.join("×")} — 메뉴판 속 그림을 잘라 쓴 것 아닌가 (긴 변 640px 정도 고화질만)`); }
      }
    }
    if (!n) err.push('메뉴가 없음');
  } else err.push('menu.js 없음');
  // ⑧ 등록
  if (!store) err.push('sales/stores/data.js 에 없음');
  if (!exists(`sales/img/demo-${id}.jpg`)) err.push(`가게 찾기 카드 사진 sales/img/demo-${id}.jpg 없음 (node tools/demo.mjs ${id})`);
  for (const f of ['sync-lang.sh', 'sync-dasan.sh', 'sync-stores.sh']) if (!shopsIn(`restaurants/_shared/${f}`).includes(id)) err.push(`_shared/${f} SHOPS 에 없음`);
  if (!new RegExp(`^\\s*${id}:`, 'm').test(read('tools/seo.mjs'))) err.push('tools/seo.mjs SHOPS 에 없음');
  if (!h.includes('<!-- seo:start')) err.push('seo 블록 없음 (node tools/seo.mjs)');
  if (!new RegExp(`\\b${id}\\)`).test(read('tools/export.sh'))) err.push('tools/export.sh name() 에 상호 없음');

  console.log(`\n[${id}] ${listing ? '가게 찾기용' : '정식'} · 맨 위 ${top || '없음'}`);
  if (err.length) { fail = true; console.log('오류:\n- ' + err.join('\n- ')); }
  if (warn.length) console.log('주의:\n- ' + warn.join('\n- '));
  if (!err.length && !warn.length) console.log('문제 없음');
}
process.exit(fail ? 1 : 0);
