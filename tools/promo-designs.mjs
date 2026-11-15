// SNS 이미지·테이블 QR 카드 '디자인 틀' (2026-11-14, 캡틴 결정 가-1·나-1·다-1)
// 가게마다 색만 바뀌는 같은 틀이라 점주들이 SNS에 올리면 겹쳐 보여서, 배치·모양이 다른 틀을 둔다.
//   basic   기본(폰 화면 + 이름 + MENU + QR) — tools/sns.mjs 안의 예전 모양, 카드는 가게마다 만든 table-card.html 그대로
//   photo   사진 포스터 — 음식 사진 크게 + 흰 QR 스티커
//   neon    네온 간판 — 벽돌 벽, 빛나는 이름·QR 테두리
//   collage 메뉴 콜라주 — 음식 사진 칸 + 가운데 QR 칸
//   chalk   칠판 — 칠판 바탕, 분필 글씨, 손그림 화살표, 테이프 붙인 QR 종이
//   minimal 미니멀 선 — 흰 바탕, 얇은 선, 왼쪽 정렬, 큰 이름
// 규칙: 글꼴은 디자인 하나에 하나(Gmarket, 중국어·일본어 글자만 시스템 글꼴로 대신 나옴). 장식은 CSS·SVG로만(그림 파일·유료 글꼴 없음).
//       AI 음식 사진은 쓰지 않는다 — 가게 img/ 의 실제 음식 사진만(가로 400px 이상, 사진형은 3장 이상 있어야 고를 수 있음).
// 쓰는 곳: tools/sns.mjs --design <id> · tools/card.mjs --design <id> · tools/build-shop.mjs(--meta, 정식 등록) · 대시보드 '가게 만들기'.
// 무엇을 썼는지는 restaurants/<가게>/print/promo.json 에 남고, 같은 도시에서 쓴 디자인을 피해 추천한다(recommend).
// CLI: node tools/promo-designs.mjs --list            → 디자인 목록·가게별 사용 기록(JSON)
//      node tools/promo-designs.mjs --recommend <지역키> [모양 스타일] [사진 수]  → 추천 순서
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const R = (...p) => path.join(ROOT, ...p);

// ---------------------------------------------------------------- 디자인 목록 (화면 이름·설명은 대시보드도 이걸 씀)
// styles = 메뉴판 '모양 스타일'(tools/shop-styles.mjs) 중 어울리는 것 → 추천 때 앞으로
export const DESIGNS = {
  basic:   { label: '기본(폰 화면)', desc: '메뉴판 폰 화면 + 이름 + MENU 버튼 + QR', fit: '모든 가게', styles: ['basic', 'signbox'], photos: 0 },
  photo:   { label: '사진 포스터', desc: '음식 사진을 크게, 흰 QR 스티커', fit: '음식 사진이 좋은 집', styles: ['basic', 'wood', 'signbox'], photos: 1 },
  neon:    { label: '네온 간판', desc: '벽돌 벽에 빛나는 이름·QR 테두리', fit: '주점·바·치킨호프', styles: ['neon'], photos: 0 },
  collage: { label: '메뉴 콜라주', desc: '음식 사진 칸 사이에 QR 칸', fit: '메뉴가 다양한 집', styles: ['pop', 'basic'], photos: 3 },
  chalk:   { label: '칠판', desc: '칠판 바탕·분필 글씨·손그림 화살표', fit: '호프·주점·카페', styles: ['chalk', 'wood'], photos: 0 },
  minimal: { label: '미니멀 선', desc: '흰 바탕·얇은 선·왼쪽 정렬 큰 이름', fit: '카페·깔끔한 한식', styles: ['modern', 'hanji'], photos: 0 },
};

// ---------------------------------------------------------------- 색
const rgb = (h) => {
  h = String(h || '').trim();
  if (/^#[0-9a-f]{3}$/i.test(h)) h = '#' + [...h.slice(1)].map((c) => c + c).join('');
  const m = h.match(/^#([0-9a-f]{6})/i); if (!m) return null;
  const n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const hex = (a) => '#' + a.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
export const mix = (a, b, t) => { const A = rgb(a) || [0, 0, 0], B = rgb(b) || [255, 255, 255]; return hex(A.map((v, i) => v + (B[i] - v) * t)); };
export const lum = (h) => { const c = (rgb(h) || [0, 0, 0]).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const sat = (h) => { const [r, g, b] = (rgb(h) || [0, 0, 0]).map((v) => v / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b); return mx === 0 ? 0 : (mx - mn) / mx; };
const bright = (h, min = 0.3) => { let c = h; for (let i = 0; i < 6 && lum(c) < min; i++) c = mix(c, '#ffffff', 0.25); return c; };
const deep = (h, max = 0.12) => { let c = h; for (let i = 0; i < 8 && lum(c) > max; i++) c = mix(c, '#000000', 0.2); return c; };

// ---------------------------------------------------------------- 사진 크기(jpeg·png 머리만 읽음)
function imgSize(f) {
  try {
    const b = fs.readFileSync(f);
    if (b[0] === 0x89 && b[1] === 0x50) return [b.readUInt32BE(16), b.readUInt32BE(20)];
    if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i < b.length) {
        if (b[i] !== 0xff) { i++; continue; }
        const m = b[i + 1], len = b.readUInt16BE(i + 2);
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
        i += 2 + len;
      }
    }
  } catch {}
  return [0, 0];
}
// 가게 음식 사진: img/ 의 jpg·webp 중 로고·간판·대표 그림이 아니고 가로 400px 이상. menu.js 에 나오는 순서대로
export function shopPhotos(shop) {
  const dir = R('restaurants', shop, 'img');
  if (!fs.existsSync(dir)) return [];
  let menu = ''; try { menu = fs.readFileSync(R('restaurants', shop, 'menu.js'), 'utf8'); } catch {}
  return fs.readdirSync(dir)
    .filter((f) => /\.(jpe?g|webp)$/i.test(f) && !/^(logo|sign|og|hero|demo|qr)/i.test(f))
    .filter((f) => imgSize(path.join(dir, f))[0] >= 400)
    .sort((a, b) => { const ia = menu.indexOf(a), ib = menu.indexOf(b); return (ia < 0 ? 1e9 : ia) - (ib < 0 ? 1e9 : ib) || a.localeCompare(b); });
}

// ---------------------------------------------------------------- 사용 기록·추천 (캡틴 결정 다-1)
const readWin = (rel) => { const c = { window: {} }; try { vm.runInNewContext(fs.readFileSync(R(rel), 'utf8'), c); } catch {} return c.window; };
// 가게별로 쓴 디자인: print/promo.json 이 있으면 그 값, 없고 sns-square.png 가 있으면 basic(2026-11-14 이전 가게)
export function usedDesigns() {
  const S = readWin('sales/stores/data.js').STORES || [];
  const region = Object.fromEntries(S.map((s) => [s.id, s.region]));
  const out = [];
  for (const id of fs.readdirSync(R('restaurants'))) {
    const pd = R('restaurants', id, 'print');
    if (!fs.existsSync(pd)) continue;
    let p = null; try { p = JSON.parse(fs.readFileSync(path.join(pd, 'promo.json'), 'utf8')); } catch {}
    const sns = p?.sns || (fs.existsSync(path.join(pd, 'sns-square.png')) ? 'basic' : null);
    const card = p?.card || (fs.existsSync(path.join(pd, 'table-card.html')) ? 'basic' : null);
    if (sns || card) out.push({ id, region: region[id] || '', sns, card, at: p?.at || '' });
  }
  return out;
}
export function recordDesign(shop, kind, design) {
  const f = R('restaurants', shop, 'print', 'promo.json');
  let p = {}; try { p = JSON.parse(fs.readFileSync(f, 'utf8')); } catch {}
  p[kind] = design; p.at = new Date().toISOString().slice(0, 10);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, JSON.stringify(p, null, 2) + '\n');
}
// 추천 순서: 사진이 모자라면 못 고름 → 같은 도시에서 이미 쓴 디자인은 뒤로(누가 쓰는지 표시) → 모양 스타일에 어울리는 것 앞으로 → 덜 쓴 것 앞으로
// 같은 로직이 dashboard/static/builder.js 의 promoRank 에도 있다(바꾸면 둘 다).
export function recommend({ region = '', style = 'basic', photos = 0, self = '' } = {}, used = usedDesigns()) {
  const list = Object.entries(DESIGNS).map(([id, d]) => {
    const same = used.filter((u) => u.id !== self && u.region && u.region === region && (u.sns === id || u.card === id)).map((u) => u.id);
    const total = used.filter((u) => u.id !== self && (u.sns === id || u.card === id)).length;
    const ok = photos >= d.photos;
    const score = (ok ? 0 : 1000) + (same.length ? 100 + same.length : 0) - (d.styles.includes(style) ? 10 : 0) + total * 0.1;
    return { id, label: d.label, ok, same, total, score, why: !ok ? `음식 사진 ${d.photos}장 이상 필요(가로 400px 이상)` : same.length ? `같은 도시 ${same.join('·')} 사용 중` : d.styles.includes(style) ? '모양 스타일과 어울림' : '' };
  });
  return list.sort((a, b) => a.score - b.score);
}

// ---------------------------------------------------------------- 가게 자료
const esc = (s) => String(s ?? '').normalize('NFC').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export function loadShop(shop, { lang = 'vi', label = 'MENU', name } = {}) {
  const d = (readWin('sales/content.js').DEMOS || []).find((x) => x.id === shop);
  if (!d) throw new Error(`sales/content.js 의 DEMOS 에 ${shop} 이 없습니다`);
  const html = fs.readFileSync(R('restaurants', shop, 'index.html'), 'utf8');
  const pt = (k, def) => (html.match(new RegExp(`--pt-${k}:\\s*([^;]+);`)) || [])[1]?.trim() || def;
  const C = { bg: pt('bg', '#ffffff'), ink: pt('ink', '#222222'), muted: pt('muted', '#777777'), accent: pt('accent', '#e0452b'), btn: pt('btn', '#222222'), btnInk: pt('btn-ink', '#ffffff') };
  for (const k of Object.keys(C)) if (!rgb(C[k])) C[k] = { bg: '#ffffff', ink: '#222222', muted: '#777777', accent: '#e0452b', btn: '#222222', btnInk: '#ffffff' }[k];
  const dark = pt('mode', 'light') === 'dark';
  // 주소: menu.js 의 RESTAURANT.address(베트남어 우선)
  let address = '';
  try {
    const c = { window: {}, document: { documentElement: {} }, location: { search: '', hostname: '' } }; c.self = c.window;
    vm.createContext(c); vm.runInContext(fs.readFileSync(R('restaurants', shop, 'menu.js'), 'utf8'), c, { timeout: 1000 });
    const a = c.window.RESTAURANT?.address; address = typeof a === 'string' ? a : a ? a.vi || a.en || a.ko || '' : '';
  } catch {}
  const qrPath = [R('restaurants', shop, 'print', 'qr.svg'), R('sales', 'img', `qr-${shop}.svg`)].find((f) => fs.existsSync(f));
  if (!qrPath) throw new Error('QR 파일이 없습니다. 먼저 tools/qr.cjs 로 만드세요');
  const LINES = label === 'MENU'
    ? [['vi', 'Quét mã xem thực đơn'], ['ko', 'QR 찍고 메뉴 보기'], ['en', 'Scan for the menu'], ['zh', '扫码看菜单'], ['ja', 'QRでメニュー']]
    : [['vi', 'Quét mã xem sản phẩm'], ['ko', 'QR 찍고 상품 보기'], ['en', 'Scan to shop'], ['zh', '扫码看商品'], ['ja', 'QRで商品を見る']];
  if (lang === 'ko') LINES.unshift(LINES.splice(1, 1)[0]);
  return {
    id: shop, name: nameArg(name || d.name), type: d.type?.[lang] || d.type?.en || '', url: d.url.replace('https://', ''), label, lang,
    lines: LINES, address, C, dark, photos: shopPhotos(shop), qrSvg: fs.readFileSync(qrPath, 'utf8'),
  };
}
const nameArg = (s) => String(s).trim();
// Gmarket 글꼴엔 베트남어 글자(ắ·ư·ạ…)가 없어 크롬이 'Bă ́c'처럼 따로 그렸다(2026-11-14 시험) → 베트남어가 든 글만 굵은 시스템 글꼴(.vn)로
const VN = /[À-ýĂăĐđĨĩŨũƠơƯưẠ-ỹ]/;
const vt = (s) => { const e = esc(s); return VN.test(e) ? `<span class="vn">${e}</span>` : e; };
const VN_CSS = `.vn { font-family: "Segoe UI", Arial, "Noto Sans", "DejaVu Sans", sans-serif; font-weight: 700; }`;
// 국기: 윈도우 크롬은 국기 이모지를 'VN' 같은 글자로 그려서(2026-11-14 시험) 작은 SVG로 직접 그린다
const star = (cx, cy, r, f) => { const p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r * 0.4 : r; p.push(`${(cx + q * Math.cos(a)).toFixed(2)},${(cy + q * Math.sin(a)).toFixed(2)}`); } return `<polygon points="${p.join(' ')}" fill="${f}"/>`; };
const FLAG_SVG = {
  vi: `<rect width="30" height="20" fill="#da251d"/>${star(15, 10.4, 6, '#ffde00')}`,
  ko: `<rect width="30" height="20" fill="#fff"/><path d="M10 10a5 5 0 0 1 10 0a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 0-5 0" fill="#cd2e3a"/><path d="M20 10a5 5 0 0 1-10 0a2.5 2.5 0 0 1 5 0a2.5 2.5 0 0 0 5 0" fill="#0047a0"/><g stroke="#000" stroke-width="1"><path d="M4 4.5l3-2.4M5 5.8l3-2.4M6 7.1l3-2.4M22 15.3l3-2.4M23 16.6l3-2.4M21 14l3-2.4M4 15.5l3 2.4M22 4.7l3 2.4"/></g>`,
  en: `<rect width="30" height="20" fill="#012169"/><path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0L30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.6"/><path d="M15 0V20M0 10H30" stroke="#fff" stroke-width="6"/><path d="M15 0V20M0 10H30" stroke="#c8102e" stroke-width="3.4"/>`,
  zh: `<rect width="30" height="20" fill="#de2910"/>${star(6, 6, 3.6, '#ffde00')}${star(11, 2.4, 1.1, '#ffde00')}${star(13.2, 4.6, 1.1, '#ffde00')}${star(13.2, 7.8, 1.1, '#ffde00')}${star(11, 10, 1.1, '#ffde00')}`,
  ja: `<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#bc002d"/>`,
};
const FLAG = Object.fromEntries(Object.entries(FLAG_SVG).map(([k, v]) => [k, `<svg class="flag" viewBox="0 0 30 20" width="1.35em" height=".9em" style="vertical-align:-.08em;border-radius:2px;box-shadow:0 0 0 1px rgba(0,0,0,.15)">${v}</svg>`]));

// 글자 맞추기: data-fit 요소는 상자(가로·세로)를 넘으면 글자 크기를 줄인다
const FIT = `<script>(function(){function fit(){document.querySelectorAll('[data-fit]').forEach(function(e){var c=e.firstElementChild||e,s=parseFloat(getComputedStyle(e).fontSize),min=s*.3;e.style.fontSize=s+'px';function over(){var r=c.getBoundingClientRect(),b=e.getBoundingClientRect();return r.width>b.width+2||r.height>b.height+2||c.scrollWidth>c.clientWidth+2;}while(over()&&s>min){s-=1;e.style.fontSize=s+'px';}});}fit();if(document.fonts)document.fonts.ready.then(fit);})();</script>`;
const FONT_STACK = `"Gmarket", "Microsoft YaHei", "Yu Gothic", "WenQuanYi Zen Hei", "IPAGothic", "Noto Color Emoji", sans-serif`;

// 장식 SVG
const svgUrl = (s) => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;
const brick = (line) => svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='60'><g fill='none' stroke='${line}' stroke-width='2'><path d='M0 1H120M0 31H120M30 1V31M90 1V31M0 31V60M60 31V60M120 31V60'/></g></svg>`);
const chalkDust = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .07 0'/></filter><rect width='300' height='300' filter='url(#n)'/></svg>`);
const scribble = (color, w = 300) => `<svg viewBox="0 0 300 24" width="${w}" preserveAspectRatio="none" style="display:block"><path d="M4 14 C60 4 110 20 160 10 S250 6 296 12 M20 18 C90 12 170 20 280 15" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity=".85"/></svg>`;
const arrowSvg = (color, dir) => dir === 'down'
  ? `<svg viewBox="0 0 120 160" style="display:block;width:100%;height:100%"><path d="M30 6 C90 30 100 90 62 140" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/><path d="M40 118 L62 144 L86 124" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  : `<svg viewBox="0 0 200 110" style="display:block;width:100%;height:100%"><path d="M6 80 C50 10 120 10 182 50" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/><path d="M152 30 L184 52 L150 70" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ---------------------------------------------------------------- SNS 이미지 (W×H px, story = 세로 1080×1920)
// photo(i) = 사진 i번째의 data URI(없으면 빈 문자열)
export function snsHtml(design, D, { W, H, story, font, photo }) {
  const C = D.C, n = vt(D.name), t = vt(D.type), u = esc(D.url), btn = esc(D.label);
  const li = (cls = '') => D.lines.map(([l, s]) => `<li class="${cls}"><span class="fl">${FLAG[l]}</span>${vt(s)}</li>`).join('');
  const head = (css) => `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: "Gmarket"; src: url(data:font/ttf;base64,${font}); }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: ${W}px; height: ${H}px; overflow: hidden; position: relative; font-family: ${FONT_STACK}; }
  ul { list-style: none; } .fl { margin-right: .4em; }
  .qr svg { display: block; width: 100%; height: auto; }
  [data-fit] { overflow: visible; word-break: keep-all; overflow-wrap: anywhere; } .nw { white-space: nowrap; }
  ${VN_CSS}
  ${css}</style></head><body>`;
  const tail = `${FIT}</body></html>`;
  const qr = `<div class="qr">${D.qrSvg}</div>`;

  if (design === 'photo') {
    const P = photo(0), ink = '#ffffff', pin = bright(C.accent, 0.25);
    return head(`
  body { background: #111; color: ${ink}; }
  .ph { position: absolute; left: 0; top: 0; width: 100%; height: ${story ? 1180 : H}px; background: url(${P}) center/cover; }
  .ph::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) ${story ? 55 : 42}%, rgba(0,0,0,.82) 100%); }
  ${story ? `.low { position: absolute; left: 0; right: 0; top: 1180px; bottom: 0; background: ${deep(C.btn, 0.03)}; }` : ''}
  .tag { position: absolute; left: ${story ? 70 : 60}px; top: ${story ? 80 : 56}px; background: ${pin}; color: ${lum(pin) > 0.45 ? '#111' : '#fff'}; font-size: ${story ? 32 : 26}px; padding: 12px 22px 10px; border-radius: 999px; letter-spacing: 1px; }
  .name { position: absolute; left: ${story ? 70 : 60}px; ${story ? 'top: 720px; width: 940px; height: 290px;' : 'top: 560px; width: 560px; height: 230px;'} display: flex; align-items: flex-end; font-size: ${story ? 120 : 92}px; line-height: 1.02; letter-spacing: -2px; text-shadow: 0 4px 24px rgba(0,0,0,.5); }
  .sticker { position: absolute; background: #fff; border-radius: 30px; padding: 22px 22px 18px; box-shadow: 0 30px 60px rgba(0,0,0,.45); transform: rotate(${story ? -3 : -4}deg); color: #111; text-align: center;
    ${story ? 'width: 480px; left: 540px; top: 1040px;' : 'width: 360px; right: 60px; bottom: 70px;'} }
  .sticker b { display: block; font-size: ${story ? 40 : 30}px; letter-spacing: 8px; padding-left: 8px; color: ${deep(C.accent, 0.2)}; margin-bottom: 10px; }
  .sticker .qr { width: 100%; }
  .sticker em { display: block; font-style: normal; margin-top: 10px; font-size: ${story ? 24 : 18}px; color: #333; overflow-wrap: anywhere; }
  .info { position: absolute; ${story ? 'left: 70px; top: 1250px; width: 440px;' : 'left: 60px; top: 810px; width: 560px;'} }
  .info .url { font-size: ${story ? 30 : 26}px; color: ${pin}; margin-bottom: 18px; overflow-wrap: anywhere; }
  .info ul { display: grid; gap: ${story ? 22 : 5}px; font-size: ${story ? 34 : 22}px; color: rgba(255,255,255,.9); }
  ${story ? '.info ul li { white-space: nowrap; }' : ''}
`) + `<div class="ph"></div>${story ? '<div class="low"></div>' : ''}
  ${t ? `<div class="tag">${t}</div>` : ''}<div class="name" data-fit><span>${n}</span></div>
  <div class="sticker"><b>${btn}</b>${qr}${story ? '' : `<em>${u}</em>`}</div>
  <div class="info">${story ? `<div class="url">${u}</div>` : ''}<ul>${li()}</ul></div>` + tail;
  }

  if (design === 'neon') {
    const N = bright(sat(C.accent) > 0.25 ? C.accent : '#ff3ea5', 0.28), N2 = bright(sat(C.btn) > 0.25 && Math.abs(lum(C.btn) - lum(N)) > 0.02 ? C.btn : '#4ef3ff', 0.3);
    const core = (c) => mix(c, '#ffffff', 0.72), glow = (c, k = 1) => `0 0 ${4 * k}px ${c}, 0 0 ${12 * k}px ${c}, 0 0 ${28 * k}px ${c}, 0 0 ${52 * k}px ${c}`;
    return head(`
  body { background: radial-gradient(60% 40% at 50% ${story ? 14 : 18}%, ${mix(N, '#000', 0.55)}66, transparent 70%), ${brick('rgba(255,255,255,.055)')} 0 0/120px 60px, linear-gradient(180deg, #17121c, #0b090e); color: ${core(N2)}; }
  .wrap { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; padding: ${story ? '130px 60px 100px' : '60px 70px 50px'}; text-align: center; }
  .name { width: 100%; height: ${story ? 300 : 210}px; display: flex; align-items: center; justify-content: center; font-size: ${story ? 150 : 128}px; line-height: 1.05; color: ${core(N)}; text-shadow: ${glow(N)}; letter-spacing: 2px; }
  .type { margin-top: 6px; font-size: ${story ? 34 : 26}px; color: ${mix(N2, '#fff', 0.4)}; opacity: .8; letter-spacing: 3px; }
  .bar { width: ${story ? 520 : 460}px; height: 5px; border-radius: 9px; margin: ${story ? 40 : 26}px 0; background: ${core(N2)}; box-shadow: ${glow(N2, 0.7)}; }
  .row { display: flex; ${story ? 'flex-direction: column;' : ''} align-items: center; gap: ${story ? 30 : 46}px; }
  .side { display: flex; flex-direction: column; align-items: ${story ? 'center' : 'flex-start'}; gap: 18px; }
  .menu { font-size: ${story ? 64 : 52}px; letter-spacing: 12px; padding: 14px 18px 10px 30px; border: 5px solid ${core(N2)}; border-radius: 22px; color: ${core(N2)}; text-shadow: ${glow(N2, 0.8)}; box-shadow: ${glow(N2, 0.6)}, inset ${glow(N2, 0.4)}; }
  .arrow { width: ${story ? 110 : 150}px; height: ${story ? 140 : 80}px; filter: drop-shadow(0 0 6px ${N}) drop-shadow(0 0 16px ${N}); }
  .tube { width: ${story ? 540 : 390}px; padding: 22px; border-radius: 34px; background: #fff; border: 7px solid ${core(N)}; box-shadow: ${glow(N)}; }
  ul { display: grid; gap: 8px 30px; text-align: left; font-size: ${story ? 34 : 23}px; color: ${mix(N2, '#fff', 0.55)}; ${story ? 'grid-template-columns: auto auto; margin-top: 40px;' : ''} }
  ${story ? 'ul li:last-child { grid-column: 1 / -1; justify-self: center; }' : ''}
  .url { margin-top: ${story ? '70px' : 'auto'}; font-size: ${story ? 42 : 30}px; color: ${core(N)}; text-shadow: ${glow(N, 0.5)}; letter-spacing: 1px; }
`) + `<div class="wrap"><div class="name" data-fit><span>${n}</span></div>${t ? `<div class="type">${t}</div>` : ''}<div class="bar"></div>
  ${story
    ? `<div class="row"><div class="menu">${btn}</div><div class="arrow">${arrowSvg(core(N), 'down')}</div><div class="tube">${qr}</div></div><div class="url">${u}</div><ul>${li()}</ul>`
    : `<div class="row"><div class="side"><div class="menu">${btn}</div><ul>${li()}</ul></div><div class="arrow">${arrowSvg(core(N), 'right')}</div><div class="tube">${qr}</div></div><div class="url">${u}</div>`}
  </div>` + tail;
  }

  if (design === 'collage') {
    const G = 12, frame = deep(C.btn, 0.06), tile = sat(C.accent) > 0.2 ? C.accent : C.btn, tInk = lum(tile) > 0.45 ? '#141414' : '#ffffff';
    const ph = (i) => `<div class="p" style="background-image:url(${photo(i)})"></div>`;
    const cell = Math.floor((W - G * 4) / 3);
    const nameTile = `<div class="nt"><div class="nm" data-fit><span>${n}</span></div>${t ? `<small>${t}</small>` : ''}</div>`;
    const qrTile = `<div class="qt"><b>${btn}</b>${qr}</div>`;
    const lnTile = `<div class="lt"><div class="url">${u}</div><ul>${li()}</ul></div>`;
    return head(`
  body { background: ${frame}; }
  .g { position: absolute; inset: ${G}px; display: grid; gap: ${G}px; grid-template-columns: repeat(3, ${cell}px);
    grid-template-rows: ${story ? `330px repeat(3, ${cell}px) 1fr` : `repeat(3, ${cell}px)`}; }
  .p { background: center/cover #333; border-radius: 6px; }
  .nt { background: ${tile}; color: ${tInk}; border-radius: 6px; padding: ${story ? '40px 50px' : '30px 28px'}; display: flex; flex-direction: column; justify-content: ${story ? 'center' : 'flex-end'}; ${story ? 'grid-column: 1 / -1;' : ''} }
  .nm { font-size: ${story ? 120 : 70}px; line-height: 1.02; letter-spacing: -1px; height: ${story ? 190 : 210}px; display: flex; align-items: flex-end; ${story ? 'justify-content: center; text-align: center;' : ''} }
  .nt small { display: block; margin-top: 10px; font-size: ${story ? 32 : 20}px; opacity: .85; ${story ? 'text-align: center;' : ''} }
  .qt { background: #fff; border-radius: 6px; padding: ${story ? '18px 26px 26px' : '14px 30px 24px'}; display: flex; flex-direction: column; align-items: center; }
  .qt b { font-size: ${story ? 30 : 24}px; letter-spacing: 8px; padding-left: 8px; color: ${deep(tile, 0.15)}; margin-bottom: 8px; }
  .qt .qr { width: ${story ? 270 : 262}px; }
  .lt { color: ${D.dark ? '#f1ece4' : C.ink}; border-radius: 6px; padding: ${story ? '46px 60px' : '26px 24px'}; ${story ? 'grid-column: 1 / -1; display: flex; flex-direction: column; justify-content: center; align-items: center;' : ''} }
  .lt { background: ${D.dark ? '#1c1a18' : mix(C.bg, '#ffffff', 0.5)}; }
  .url { font-size: ${story ? 44 : 19}px; color: ${D.dark ? bright(C.accent, 0.3) : deep(C.accent, 0.18)}; margin-bottom: ${story ? 30 : 14}px; overflow-wrap: anywhere; }
  .lt ul { display: grid; gap: ${story ? '14px 40px' : '7px'}; font-size: ${story ? 32 : 19}px; ${story ? 'grid-template-columns: auto auto;' : ''} }
  ${story ? '.lt ul li:last-child { grid-column: 1 / -1; justify-self: center; }' : ''}
`) + `<div class="g">${story
    ? `${nameTile}${ph(0)}${ph(1)}${ph(2)}${ph(3)}${qrTile}${ph(4)}${ph(5)}${ph(6)}${ph(7)}${lnTile}`
    : `${nameTile}${ph(0)}${ph(1)}${ph(2)}${qrTile}${ph(3)}${ph(4)}${ph(5)}${lnTile}`}</div>` + tail;
  }

  if (design === 'chalk') {
    const W1 = '#f3f0e6', A = bright(sat(C.accent) > 0.2 ? C.accent : '#f2d16b', 0.42), A2 = '#f7a8b8';
    const chalkText = 'text-shadow: 0 0 1px rgba(255,255,255,.7), 0 0 8px rgba(255,255,255,.18);';
    return head(`
  body { background: #5a3d22; }
  .board { position: absolute; inset: ${story ? 34 : 28}px; border-radius: 10px; color: ${W1}; overflow: hidden;
    background: ${chalkDust}, radial-gradient(50% 35% at 30% 20%, rgba(255,255,255,.07), transparent 70%), radial-gradient(40% 30% at 80% 75%, rgba(255,255,255,.05), transparent 70%), #25322a;
    box-shadow: inset 0 0 0 6px #7a5530, inset 0 0 0 10px #3d2a17, inset 0 0 60px rgba(0,0,0,.5); }
  .in { position: absolute; inset: 0; padding: ${story ? '120px 80px 90px' : '64px 70px 50px'}; ${chalkText} }
  .name { font-size: ${story ? 120 : 96}px; line-height: 1.05; width: ${story ? '100%' : '600px'}; height: ${story ? 270 : 210}px; display: flex; align-items: flex-end; ${story ? 'justify-content: center; text-align: center;' : ''} }
  .ul { margin: 6px 0 0 ${story ? 'auto' : 0}; ${story ? 'margin-right: auto;' : ''} width: ${story ? 560 : 420}px; }
  .type { margin-top: 16px; font-size: ${story ? 34 : 26}px; color: ${A2}; ${story ? 'text-align: center;' : ''} }
  .menu { display: inline-block; margin-top: ${story ? 54 : 34}px; font-size: ${story ? 62 : 46}px; letter-spacing: 10px; color: ${A}; padding: 10px 16px 6px 28px; border: 4px solid ${A}; border-radius: 12px 26px 14px 22px / 22px 12px 26px 14px; transform: rotate(-2deg); }
  ul { margin-top: ${story ? 40 : 30}px; display: grid; gap: ${story ? '14px 40px' : '9px'}; font-size: ${story ? 31 : 24}px; ${story ? 'grid-template-columns: auto auto; justify-content: center;' : ''} }
  ${story ? 'ul li:last-child { grid-column: 1 / -1; justify-self: center; }' : ''}
  .paper { position: absolute; background: #fbfaf5; padding: 22px; border-radius: 4px; box-shadow: 0 16px 30px rgba(0,0,0,.45); transform: rotate(${story ? 2 : 3}deg);
    ${story ? 'width: 500px; left: 290px; top: 860px;' : 'width: 370px; right: 80px; top: 470px;'} }
  .paper::before, .paper::after { content: ""; position: absolute; width: 130px; height: 38px; background: rgba(236,226,196,.82); top: -18px; box-shadow: 0 2px 4px rgba(0,0,0,.15); }
  .paper::before { left: -30px; transform: rotate(-24deg); } .paper::after { right: -30px; transform: rotate(22deg); }
  .arrow { position: absolute; ${story ? 'left: 170px; top: 690px; width: 120px; height: 170px;' : 'left: 380px; top: 400px; width: 190px; height: 110px;'} }
  .url { position: absolute; ${story ? 'left: 0; right: 0; top: 1430px; text-align: center;' : 'left: 70px; bottom: 56px;'} font-size: ${story ? 40 : 28}px; color: ${A}; }
  .star { position: absolute; color: ${A2}; font-size: ${story ? 46 : 38}px; opacity: .8; }
  ${story ? '.lines { position: absolute; left: 60px; right: 60px; top: 1500px; }' : ''}
`) + `<div class="board"><div class="in">
  <div class="name" data-fit><span>${n}</span></div><div class="ul">${scribble(A, story ? 560 : 420)}</div>${t ? `<div class="type">${t}</div>` : ''}
  ${story ? `<div style="text-align:center"><span class="menu">${btn}</span></div>` : `<span class="menu">${btn}</span><ul>${li()}</ul>`}
  </div>
  <div class="arrow">${arrowSvg(W1, story ? 'down' : 'right')}</div>
  <div class="paper">${qr}</div>
  <div class="url">${u}</div>
  ${story ? `<div class="lines" style="${chalkText}"><ul>${li()}</ul></div>` : ''}
  <span class="star" style="${story ? 'right:110px;top:150px' : 'right:120px;top:90px'}">✶</span><span class="star" style="${story ? 'left:100px;top:1250px' : 'right:470px;bottom:120px'}">✶</span>
  </div>` + tail;
  }

  if (design === 'minimal') {
    const bg = D.dark ? '#f8f7f3' : mix(C.bg, '#ffffff', 0.5), ink = '#151515', A = deep(sat(C.accent) > 0.2 ? C.accent : C.btn, 0.2);
    const P = story ? 90 : 80;
    return head(`
  body { background: ${bg}; color: ${ink}; }
  .wrap { position: absolute; inset: ${P}px; display: flex; flex-direction: column; }
  .top { display: flex; justify-content: space-between; font-size: ${story ? 26 : 20}px; letter-spacing: 4px; color: #555; text-transform: uppercase; padding-bottom: 18px; border-bottom: 2px solid ${ink}; }
  .top i { font-style: normal; color: ${A}; white-space: nowrap; margin-left: 24px; }
  .top .tl { flex: 1; min-width: 0; height: 1.3em; white-space: nowrap; }
  .name { margin-top: ${story ? 70 : 42}px; height: ${story ? 440 : 300}px; font-size: ${story ? 170 : 132}px; line-height: .98; letter-spacing: -4px; display: flex; align-items: flex-end; }
  .url { margin-top: ${story ? 34 : 22}px; font-size: ${story ? 36 : 28}px; display: flex; align-items: center; gap: 14px; }
  .url::before { content: ""; width: 18px; height: 18px; border-radius: 50%; background: ${A}; flex: none; }
  .bot { margin-top: auto; display: grid; grid-template-columns: ${story ? '1fr' : '330px 1fr'}; gap: ${story ? 50 : 50}px; align-items: end; border-top: 2px solid ${ink}; padding-top: ${story ? 50 : 34}px; }
  .qr { border: 2px solid ${ink}; padding: 16px; background: #fff; width: ${story ? 520 : 330}px; }
  .menu { font-size: ${story ? 30 : 22}px; letter-spacing: 8px; color: ${A}; margin-bottom: 14px; }
  ul li { font-size: ${story ? 32 : 24}px; padding: ${story ? 14 : 9}px 0; border-bottom: 1px solid #cfcac0; display: flex; gap: 18px; }
  ul li:last-child { border-bottom: 0; }
  ul li .fl { width: 1.6em; }
  ${story ? '.bot { grid-template-columns: 520px 1fr; align-items: center; gap: 0 40px; } .bot > div:last-child { grid-column: 1 / -1; } .bot ul { margin-top: 30px; }' : ''}
  .num { font-size: 120px; color: ${A}; line-height: 1; }
`) + `<div class="wrap"><div class="top"><div class="tl" data-fit><span>${t || 'Restaurant'}</span></div><i>QR · ${btn}</i></div>
  <div class="name" data-fit><span>${n}</span></div><div class="url">${u}</div>
  <div class="bot">${qr}${story ? `<div><div class="menu">${btn}</div><div class="num">→</div></div>` : ''}<div>${story ? '' : `<div class="menu">${btn}</div>`}<ul>${li()}</ul></div></div></div>` + tail;
  }
  throw new Error('모르는 디자인: ' + design);
}

// ---------------------------------------------------------------- 테이블 QR 카드 (A6 105×148mm)
// tools/card.mjs 가 print/table-card.html 로 쓴다. admin 'QR 카드 인쇄'(tools/card-themes.mjs) 약속을 지킨다:
//   QR = <img src="qr.svg">, 테이블 번호 = data-table 빈 요소, 사진 = ../img/…, 글꼴 = ../../../public/fonts/…
const CARD_T = (lang) => {
  const T = { vi: 'QUÉT MÃ XEM THỰC ĐƠN', en: 'SCAN QR FOR MENU', ko: 'QR 찍고 메뉴 보기', zh: '扫码看菜单', ja: 'メニューを見る' };
  const main = lang === 'ko' ? 'ko' : 'vi';
  return { main: T[main], en: T.en, rest: ['ko', 'zh', 'ja', 'vi'].filter((l) => l !== main && !(main === 'vi' && l === 'vi')).map((l) => [l.toUpperCase(), T[l]]) };
};
export function cardHtml(design, D) {
  const C = D.C, n = vt(D.name), t = vt(D.type), u = esc(D.url), a = vt(D.address), T0 = CARD_T(D.lang);
  const T = { main: vt(T0.main), en: esc(T0.en) };
  const rest = T0.rest.map(([k, s]) => `<span><b>${k}</b> ${vt(s)}</span>`).join('');
  const P = (i) => (D.photos.length ? `../img/${D.photos[i % D.photos.length]}` : '');
  const head = (css) => `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<title>${esc(D.name)} · QR 카드 (${design})</title>
<!-- tools/card.mjs --design ${design} 가 tools/promo-designs.mjs 로 만듦. 손으로 고치면 다시 만들 때 사라짐 -->
<style>
  @font-face { font-family: "Gmarket"; src: url("../../../public/fonts/GmarketSansTTFBold.ttf"); }
  @page { size: 105mm 148mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #fff; }
  body { font-family: ${FONT_STACK}; }
  .card { position: relative; width: 105mm; height: 148mm; overflow: hidden; }
  .qrw { position: relative; }
  .qrw img.q { display: block; width: 100%; height: auto; }
  [data-fit] { overflow: visible; word-break: keep-all; overflow-wrap: anywhere; } .nw { white-space: nowrap; }
  .tno { position: absolute; left: -5mm; top: -5mm; z-index: 3; min-width: 12mm; height: 12mm; padding: 0 1.8mm; border-radius: 99mm;
    display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: system-ui, "Segoe UI", sans-serif; font-weight: 800; font-size: 6.5mm; line-height: .95; }
  .tno::before { content: "BÀN"; font-size: 1.8mm; letter-spacing: .2mm; line-height: 1; margin-bottom: .3mm; opacity: .9; }
  .tno:empty { display: none; }
  .rest { display: flex; flex-wrap: wrap; justify-content: center; gap: .6mm 3mm; font-size: 2.6mm; }
  .rest b { font-size: 2mm; letter-spacing: .3mm; margin-right: .6mm; }
  ${VN_CSS}
  ${css}
</style>
</head>
<body>
`;
  const qrw = (cls, tno) => `<div class="qrw ${cls}"><img class="q" src="qr.svg" alt="QR ${u}"><div class="tno" data-table style="${tno}"></div></div>`;
  const tail = `\n${FIT}\n</body>\n</html>\n`;

  if (design === 'photo') {
    const pin = bright(C.accent, 0.25), low = deep(C.btn, 0.03);
    return head(`
  .card { background: ${low}; color: #fff; }
  .ph { position: absolute; left: 0; top: 0; width: 105mm; height: 72mm; }
  .ph img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .ph::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.2), rgba(0,0,0,0) 30%, rgba(0,0,0,.75)); }
  .name { position: absolute; left: 6mm; top: 34mm; width: 52mm; height: 34mm; display: flex; align-items: flex-end; font-size: 9mm; line-height: 1.04; text-shadow: 0 1mm 4mm rgba(0,0,0,.5); }
  .stk { position: absolute; right: 6mm; top: 44mm; width: 42mm; background: #fff; border-radius: 3mm; padding: 2.4mm 2.4mm 1.6mm; transform: rotate(-4deg); box-shadow: 0 3mm 6mm rgba(0,0,0,.45); text-align: center; color: #111; }
  .stk b { display: block; font-size: 3.2mm; letter-spacing: 1.2mm; padding-left: 1.2mm; color: ${deep(C.accent, 0.2)}; margin-bottom: 1mm; }
  .tno { background: ${pin}; color: ${lum(pin) > 0.45 ? '#111' : '#fff'}; box-shadow: 0 0 0 .7mm #fff; }
  .txt { position: absolute; left: 6mm; right: 6mm; top: 96mm; text-align: center; }
  .txt h1 { font-size: 5.2mm; line-height: 1.15; }
  .txt .en { margin-top: 1.4mm; font-size: 3.4mm; letter-spacing: .8mm; color: ${pin}; }
  .rest { margin-top: 2.4mm; color: rgba(255,255,255,.75); } .rest b { color: ${pin}; }
  footer { position: absolute; left: 0; right: 0; bottom: 0; padding: 3mm 6mm 4mm; border-top: .3mm solid rgba(255,255,255,.2); text-align: center; }
  footer .u { font-size: 3.6mm; color: ${pin}; } footer .a { margin-top: 1mm; font-size: 2.4mm; color: rgba(255,255,255,.75); }
`) + `<div class="card"><div class="ph"><img src="${P(0)}" alt=""></div><div class="name" data-fit><span>${n}</span></div>
  <div class="stk"><b>${esc(D.label)}</b>${qrw('', '')}</div>
  <div class="txt"><h1>${T.main}</h1><div class="en">${T.en}</div><div class="rest">${rest}</div></div>
  <footer><div class="u">${u}</div>${a ? `<div class="a">${a}</div>` : ''}</footer></div>` + tail;
  }

  if (design === 'neon') {
    const N = bright(sat(C.accent) > 0.25 ? C.accent : '#ff3ea5', 0.28), N2 = bright(sat(C.btn) > 0.25 && Math.abs(lum(C.btn) - lum(N)) > 0.02 ? C.btn : '#4ef3ff', 0.3);
    const core = (c) => mix(c, '#ffffff', 0.72), glow = (c, k = 1) => `0 0 ${0.8 * k}mm ${c}, 0 0 ${2.4 * k}mm ${c}, 0 0 ${5.5 * k}mm ${c}`;
    return head(`
  .card { background: radial-gradient(70% 35% at 50% 16%, ${mix(N, '#000', 0.55)}66, transparent 70%), ${brick('rgba(255,255,255,.06)')} 0 0/24mm 12mm, linear-gradient(180deg, #17121c, #0b090e); color: ${core(N2)}; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 8mm 6mm 0; }
  .name { width: 93mm; height: 24mm; display: flex; align-items: center; justify-content: center; font-size: 15mm; line-height: 1.05; color: ${core(N)}; text-shadow: ${glow(N)}; }
  .type { font-size: 2.8mm; letter-spacing: .8mm; color: ${mix(N2, '#fff', 0.4)}; opacity: .8; }
  .menu { margin-top: 4mm; font-size: 4.6mm; letter-spacing: 1.6mm; padding: 1.4mm 1.6mm 1mm 3.2mm; border: .7mm solid ${core(N2)}; border-radius: 2.4mm; text-shadow: ${glow(N2, 0.7)}; box-shadow: ${glow(N2, 0.5)}, inset ${glow(N2, 0.3)}; }
  .tube { margin-top: 5mm; width: 46mm; padding: 2.6mm; background: #fff; border-radius: 4mm; border: 1mm solid ${core(N)}; box-shadow: ${glow(N)}; }
  .tno { background: ${core(N2)}; color: #111; box-shadow: ${glow(N2, 0.6)}; }
  h1 { margin-top: 5mm; font-size: 5mm; line-height: 1.15; color: ${core(N)}; text-shadow: ${glow(N, 0.5)}; }
  .en { margin-top: 1.2mm; font-size: 3.2mm; letter-spacing: .8mm; }
  .rest { margin-top: 2mm; color: ${mix(N2, '#fff', 0.55)}; opacity: .85; }
  footer { position: absolute; left: 0; right: 0; bottom: 0; padding: 3mm 6mm 4mm; text-align: center; }
  footer::before { content: ""; display: block; width: 60mm; height: .6mm; margin: 0 auto 2.6mm; border-radius: 9mm; background: ${core(N2)}; box-shadow: ${glow(N2, 0.5)}; }
  footer .u { font-size: 3.6mm; color: ${core(N)}; text-shadow: ${glow(N, 0.4)}; } footer .a { margin-top: 1mm; font-size: 2.4mm; color: #cfc8d6; }
`) + `<div class="card"><div class="name" data-fit><span>${n}</span></div>${t ? `<div class="type">${t}</div>` : ''}<div class="menu">${esc(D.label)}</div>
  <div class="tube">${qrw('', '')}</div><h1>${T.main}</h1><div class="en">${T.en}</div><div class="rest">${rest}</div>
  <footer><div class="u">${u}</div>${a ? `<div class="a">${a}</div>` : ''}</footer></div>` + tail;
  }

  if (design === 'collage') {
    const frame = deep(C.btn, 0.06), tile = sat(C.accent) > 0.2 ? C.accent : C.btn, tInk = lum(tile) > 0.45 ? '#141414' : '#ffffff';
    return head(`
  .card { background: ${frame}; color: #fff; }
  .nt { position: absolute; left: 3mm; right: 3mm; top: 3mm; height: 21mm; background: ${tile}; color: ${tInk}; border-radius: 1.2mm; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0 4mm; }
  .nm { width: 100%; height: 13mm; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 9mm; line-height: 1.02; }
  .nt small { font-size: 2.6mm; opacity: .85; }
  .grid { position: absolute; left: 3mm; right: 3mm; top: 26mm; height: 74mm; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 2mm; }
  .grid img { display: block; width: 100%; height: 100%; min-height: 0; object-fit: cover; border-radius: 1.2mm; background: #333; }
  .qt { position: absolute; left: 50%; top: 63mm; transform: translate(-50%, -50%); width: 46mm; background: #fff; border-radius: 2mm; padding: 2mm 3mm 3mm; text-align: center; box-shadow: 0 0 0 2mm ${frame}; }
  .qt b { display: block; font-size: 3mm; letter-spacing: 1.2mm; padding-left: 1.2mm; color: ${deep(tile, 0.15)}; margin-bottom: 1mm; }
  .tno { background: ${tile}; color: ${tInk}; box-shadow: 0 0 0 .7mm #fff; }
  .txt { position: absolute; left: 4mm; right: 4mm; top: 103mm; text-align: center; }
  .txt h1 { font-size: 5mm; line-height: 1.15; } .txt .en { margin-top: 1mm; font-size: 3.2mm; letter-spacing: .8mm; color: ${bright(tile, 0.3)}; }
  .rest { margin-top: 1.8mm; color: rgba(255,255,255,.75); }
  footer { position: absolute; left: 3mm; right: 3mm; bottom: 3mm; height: 12mm; background: ${mix(frame, '#ffffff', 0.08)}; border-radius: 1.2mm; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 3mm; }
  footer .u { font-size: 3.4mm; color: ${bright(tile, 0.3)}; } footer .a { margin-top: .8mm; font-size: 2.3mm; color: rgba(255,255,255,.75); }
`) + `<div class="card"><div class="nt"><div class="nm" data-fit><span>${n}</span></div>${t ? `<small>${t}</small>` : ''}</div>
  <div class="grid">${[0, 1, 2, 3].map((i) => `<img src="${P(i)}" alt="">`).join('')}</div>
  <div class="qt"><b>${esc(D.label)}</b>${qrw('', '')}</div>
  <div class="txt"><h1>${T.main}</h1><div class="en">${T.en}</div><div class="rest">${rest}</div></div>
  <footer><div class="u">${u}</div>${a ? `<div class="a">${a}</div>` : ''}</footer></div>` + tail;
  }

  if (design === 'chalk') {
    const W1 = '#f3f0e6', A = bright(sat(C.accent) > 0.2 ? C.accent : '#f2d16b', 0.42), A2 = '#f7a8b8';
    return head(`
  .card { background: #5a3d22; }
  .board { position: absolute; inset: 3mm; border-radius: 1.5mm; color: ${W1}; overflow: hidden; text-align: center;
    background: ${chalkDust}, radial-gradient(50% 35% at 30% 20%, rgba(255,255,255,.07), transparent 70%), #25322a;
    box-shadow: inset 0 0 0 1mm #7a5530, inset 0 0 0 1.6mm #3d2a17, inset 0 0 8mm rgba(0,0,0,.5);
    text-shadow: 0 0 .2mm rgba(255,255,255,.7), 0 0 1.4mm rgba(255,255,255,.18); padding: 7mm 6mm 0; display: flex; flex-direction: column; align-items: center; }
  .name { width: 88mm; height: 20mm; display: flex; align-items: flex-end; justify-content: center; font-size: 11mm; line-height: 1.04; }
  .ul { width: 50mm; margin-top: .6mm; }
  .type { margin-top: 1.4mm; font-size: 2.8mm; color: ${A2}; }
  .mrow { margin-top: 3mm; display: flex; align-items: center; gap: 2mm; }
  .menu { font-size: 4.4mm; letter-spacing: 1.4mm; color: ${A}; padding: 1.2mm 1.4mm .8mm 2.8mm; border: .6mm solid ${A}; border-radius: 2mm 4mm 2.2mm 3.6mm / 3.6mm 2mm 4mm 2.2mm; transform: rotate(-2deg); }
  .arr { width: 9mm; height: 12mm; }
  .paper { margin-top: 1mm; width: 44mm; background: #fbfaf5; padding: 2.6mm; border-radius: .6mm; transform: rotate(2deg); box-shadow: 0 2mm 4mm rgba(0,0,0,.45); position: relative; }
  .paper::before, .paper::after { content: ""; position: absolute; width: 14mm; height: 4.4mm; background: rgba(236,226,196,.85); top: -2mm; z-index: 2; }
  .paper::before { left: -4mm; transform: rotate(-24deg); } .paper::after { right: -4mm; transform: rotate(22deg); }
  .tno { background: ${A}; color: #1d2620; text-shadow: none; left: auto; right: -6mm; top: auto; bottom: -5mm; }
  h1 { margin-top: 4.4mm; font-size: 5mm; line-height: 1.15; color: ${A}; }
  .en { margin-top: 1mm; font-size: 3.2mm; letter-spacing: .8mm; }
  .rest { margin-top: 1.8mm; opacity: .85; } .rest b { color: ${A2}; }
  footer { position: absolute; left: 6mm; right: 6mm; bottom: 4mm; border-top: .4mm dashed rgba(255,255,255,.45); padding-top: 2.4mm; }
  footer .u { font-size: 3.4mm; color: ${A}; } footer .a { margin-top: .8mm; font-size: 2.3mm; opacity: .8; }
`) + `<div class="card"><div class="board"><div class="name" data-fit><span>${n}</span></div><div class="ul">${scribble(A, 189)}</div>${t ? `<div class="type">${t}</div>` : ''}
  <div class="mrow"><div class="menu">${esc(D.label)}</div><div class="arr">${arrowSvg(W1, 'down')}</div></div>
  <div class="paper">${qrw('', '')}</div><h1>${T.main}</h1><div class="en">${T.en}</div><div class="rest">${rest}</div>
  <footer><div class="u">${u}</div>${a ? `<div class="a">${a}</div>` : ''}</footer></div></div>` + tail;
  }

  if (design === 'minimal') {
    const bg = D.dark ? '#f8f7f3' : mix(C.bg, '#ffffff', 0.5), ink = '#151515', A = deep(sat(C.accent) > 0.2 ? C.accent : C.btn, 0.2);
    return head(`
  .card { background: ${bg}; color: ${ink}; padding: 8mm 8mm 0; }
  .top { display: flex; justify-content: space-between; font-size: 2.4mm; letter-spacing: .7mm; color: #555; text-transform: uppercase; padding-bottom: 2.2mm; border-bottom: .4mm solid ${ink}; }
  .top i { font-style: normal; color: ${A}; white-space: nowrap; margin-left: 3mm; }
  .top .tl { flex: 1; min-width: 0; height: 1.3em; white-space: nowrap; }
  .name { margin-top: 4mm; height: 28mm; font-size: 14mm; line-height: .98; letter-spacing: -.6mm; display: flex; align-items: flex-end; }
  .row { margin-top: 6mm; display: grid; grid-template-columns: 50mm 1fr; gap: 4mm; align-items: end; }
  .qrw { border: .4mm solid ${ink}; padding: 2mm; background: #fff; }
  .tno { background: ${A}; color: #fff; box-shadow: 0 0 0 .7mm ${bg}; }
  .side h1 { font-size: 4.2mm; line-height: 1.2; color: ${A}; }
  .side .en { margin-top: 1.2mm; font-size: 2.6mm; letter-spacing: .2mm; }
  .side .rest { margin-top: 2mm; display: grid; justify-content: start; gap: 1mm; font-size: 2.6mm; color: #444; }
  .side .rest span { border-top: .2mm solid #cfcac0; padding-top: 1mm; }
  footer { position: absolute; left: 8mm; right: 8mm; bottom: 6mm; border-top: .4mm solid ${ink}; padding-top: 2.4mm; }
  footer .u { font-size: 3.6mm; display: flex; align-items: center; gap: 1.6mm; } footer .u::before { content: ""; width: 2.2mm; height: 2.2mm; border-radius: 50%; background: ${A}; }
  footer .a { margin-top: 1mm; font-size: 2.4mm; color: #555; }
`) + `<div class="card"><div class="top"><div class="tl" data-fit><span>${t || 'Restaurant'}</span></div><i>QR · ${esc(D.label)}</i></div>
  <div class="name" data-fit><span>${n}</span></div>
  <div class="row">${qrw('', '')}<div class="side"><h1>${T.main}</h1><div class="en">${T.en}</div><div class="rest">${rest}</div></div></div>
  <footer><div class="u">${u}</div>${a ? `<div class="a">${a}</div>` : ''}</footer></div>` + tail;
  }
  throw new Error('모르는 디자인: ' + design);
}

// ---------------------------------------------------------------- CLI
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, a, b, c] = process.argv.slice(2);
  if (cmd === '--list') console.log(JSON.stringify({ designs: DESIGNS, used: usedDesigns() }, null, 2));
  else if (cmd === '--recommend') for (const r of recommend({ region: a, style: b || 'basic', photos: +(c || 0) })) console.log(`${r.ok && !r.same.length ? '○' : '×'} ${r.id.padEnd(8)} ${r.label}  ${r.why}`);
  else console.log('사용법: node tools/promo-designs.mjs --list | --recommend <지역키> [모양 스타일] [사진 수]');
}
