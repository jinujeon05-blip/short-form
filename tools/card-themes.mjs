// 테이블 QR 카드 자료 만들기: node tools/card-themes.mjs
// → sales/admin/card-themes.js (가게마다 이름·맨 위 그림·메뉴판 색·전화·주소, 전용 디자인 여부)
// → sales/admin/cards/<가게>.html (전용 디자인 카드 = restaurants/<가게>/print/table-card.html 을 admin에서 쓰게 바꾼 틀)
// admin '주문·주방 기기' ③ 'QR 카드 인쇄'가 이 둘을 쓴다. 가게를 추가하거나 table-card.html·로고·partner-theme를 바꾸면 다시 돌리고 qrmenu-intro 배포.
// 전용 틀 약속: QR 그림은 <img src="qr.svg"> → {{QR}}, 테이블 번호 자리는 data-table 이 붙은 빈 요소 → {{TABLE}} 로 채운다.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { ROOT } from './pw.mjs';

const R = (p) => path.join(ROOT, p);
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(R('sales/stores/data.js'), 'utf8'), ctx);
const STORES = ctx.window.STORES || [];
const outDir = R('sales/admin/cards');
fs.mkdirSync(path.join(outDir, 'fonts'), { recursive: true });
for (const f of ['GmarketSansTTFBold.ttf', 'Jalnan2.ttf']) {
  const dst = path.join(outDir, 'fonts', f);
  if (!fs.existsSync(dst)) fs.copyFileSync(R('public/fonts/' + f), dst);
}

function menuInfo(id) {
  const f = R(`restaurants/${id}/menu.js`);
  if (!fs.existsSync(f)) return {};
  const c = { window: {}, document: { documentElement: {} }, location: { search: '', hostname: '' } }; c.self = c.window;
  try { vm.createContext(c); vm.runInContext(fs.readFileSync(f, 'utf8'), c, { timeout: 1000 }); } catch {}
  const r = c.window.RESTAURANT || {};
  const s = (v) => (v == null ? '' : typeof v === 'string' ? v : v.vi || v.en || v.ko || '');
  return { phone: s(r.phone), address: s(r.address) };
}
function theme(html) {
  const m = html.match(/<style id="partner-theme">([\s\S]*?)<\/style>/);
  const t = {};
  if (m) for (const [, k, v] of m[1].matchAll(/--pt-([a-z-]+)\s*:\s*([^;]+);/g)) t[k] = v.trim();
  return { mode: t.mode || 'light', bg: t.bg || '#fff', ink: t.ink || '#1d1b1a', muted: t.muted || '#777', line: t.line || '#e5e5e5', accent: t.accent || t.btn || '#c8102e', btn: t.btn || t.accent || '#222', btnInk: t['btn-ink'] || '#fff' };
}
function heroImg(id, html) {
  for (const f of ['logo.png', 'logo.jpg', 'logo.webp', 'sign.jpg', 'sign.webp', 'hero.jpg', 'hero.webp'])
    if (fs.existsSync(R(`restaurants/${id}/img/${f}`))) return { img: `img/${f}`, kind: f.startsWith('logo') ? 'logo' : 'photo' };
  const m = html.match(/<img[^>]+src="(img\/[^"$]+)"/);
  return m ? { img: m[1], kind: /logo|mark/i.test(m[1]) ? 'logo' : 'photo' } : { img: '', kind: '' };
}

const THEMES = {};
let custom = 0;
for (const s of STORES) {
  const id = s.id, idx = R(`restaurants/${id}/index.html`);
  if (!fs.existsSync(idx)) continue;
  const html = fs.readFileSync(idx, 'utf8'), base = `https://${id}.qrmenuasia.com/`;
  const h = heroImg(id, html), info = menuInfo(id);
  const t = { name: s.name, sub: s.sub || '', type: (s.type && (s.type.vi || s.type.en)) || '', img: h.img ? base + h.img : '', imgKind: h.kind,
    phone: info.phone || s.phone || '', address: info.address || s.address || '', c: theme(html) };
  const card = R(`restaurants/${id}/print/table-card.html`);
  if (fs.existsSync(card)) {
    let c = fs.readFileSync(card, 'utf8');
    c = c.replace(/@page\s*\{[^}]*\}/g, '')
      .replace(/url\("?(?:\.\.\/)+public\/fonts\/([^")]+)"?\)/g, 'url("/admin/cards/fonts/$1")')
      .replace(/src="qr\.svg"/g, 'src="{{QR}}"')
      .replace(/(src|href)="\.\.\/(img\/[^"]+)"/g, `$1="${base}$2"`)
      .replace(/(src|href)="(img\/[^"]+)"/g, `$1="${base}print/$2"`)
      .replace(/(<[^>]*\bdata-table\b[^>]*>)\s*(<\/)/g, '$1{{TABLE}}$2');
    if (!c.includes('{{TABLE}}')) console.warn(`! ${id}: 테이블 번호 자리(data-table) 없음 → 자동 카드로 씀`);
    else { fs.writeFileSync(path.join(outDir, `${id}.html`), c); t.custom = true; custom++; }
  }
  THEMES[id] = t;
}
// 지난번에 만든 전용 틀 중 이제 없는 것은 지움
for (const f of fs.readdirSync(outDir)) if (f.endsWith('.html') && !THEMES[f.slice(0, -5)]?.custom) fs.unlinkSync(path.join(outDir, f));
fs.writeFileSync(R('sales/admin/card-themes.js'), '// tools/card-themes.mjs 가 만듦 — 직접 고치지 말 것\nwindow.CARD_THEMES = ' + JSON.stringify(THEMES) + ';\n');
const noImg = Object.entries(THEMES).filter(([, t]) => !t.img).map(([k]) => k);
console.log(`가게 ${Object.keys(THEMES).length}곳 · 전용 디자인 ${custom}곳 · 그림 없음 ${noImg.length}곳${noImg.length ? ' (' + noImg.join(', ') + ')' : ''}`);
