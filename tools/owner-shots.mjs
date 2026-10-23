// 점주 메뉴 관리 설명서용 화면 캡처 (가짜 서버로 편집기를 띄워 한국어·베트남어 화면을 찍는다)
// 사용법: node tools/owner-shots.mjs [저장폴더, 기본 sales/owner/guide-img]
// - sales/ 를 정적 서버로 열고 /api/menu 만 가짜 데모 데이터로 답한다(실제 가게 데이터·비밀번호는 쓰지 않음).
// - 번호 표시(빨간 동그라미)는 설명서 본문의 번호와 같다. 편집기 화면이 바뀌면 다시 찍는다.
import { chromium, ROOT } from './pw.mjs';
import http from 'http';
import fs from 'fs';
import path from 'path';

const out = path.resolve(process.argv[2] || `${ROOT}/sales/owner/guide-img`);
fs.mkdirSync(out, { recursive: true });
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
let PORT = 0;
const img = (n) => `http://127.0.0.1:${PORT}/restaurants/joseon/img/${n}.jpg`;
const T = (ko, vi) => ({ ko, vi, en: '', zh: '', ja: '' });
const menu = () => [
  { id: 'c1', name: T('찜 요리', 'Món hầm'), photo: img('hero'), items: [
    { name: T('조선시대 뼈찜', 'Xương cổ hầm'), price: 750000, photo: img('bbyeo-jjim'), tag: 'best', desc: T('대표 메뉴예요. 2~3인분.', 'Món đặc trưng. Cho 2–3 người.') },
    { name: T('갑오징어찜', 'Mực hấp xào cay'), price: 750000, photo: img('gapojing'), spicy: true },
    { name: T('아구찜', 'Cá mặt quỷ xào cay'), price: null, spicy: true },
  ] },
  { id: 'c2', name: T('식사', 'Món ăn chính'), items: [
    { name: T('뼈해장국', 'Canh xương heo'), price: 200000, photo: img('haejang') },
    { name: T('된장찌개', 'Canh tương đậu'), price: 120000, photo: img('doenjang') },
  ] },
];
const server = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/api/menu') {
    res.setHeader('content-type', 'application/json');
    if (u.searchParams.get('action') === 'history') return res.end(JSON.stringify({ items: [{ ts: Date.now() - 3600e3, path: 'a' }, { ts: Date.now() - 86400e3, path: 'b' }, { ts: Date.now() - 5 * 86400e3, path: 'c' }] }));
    return res.end(JSON.stringify({ menu: menu(), info: { phone: '0904 072 700', address: '123 Đường Mẫu, Từ Liêm, Hà Nội', wifi: { ssid: 'MyShop', password: '12345678' } }, srcLang: 'vi', updatedAt: Date.now() - 600e3 }));
  }
  let p = decodeURIComponent(u.pathname);
  if (p.startsWith('/restaurants/')) p = ROOT + p; else p = `${ROOT}/sales${p}`;
  if (p.endsWith('/')) p += 'index.html';
  else if (!path.extname(p)) p += '/index.html';
  fs.readFile(p, (e, d) => { if (e) { res.statusCode = 404; return res.end('not found'); } res.setHeader('content-type', TYPES[path.extname(p)] || 'application/octet-stream'); res.end(d); });
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
PORT = server.address().port;

// 번호 표시: 요소 왼쪽 위 모서리에 빨간 동그라미
const BADGE = (list) => { for (const [sel, n, dx, dy] of list) { const e = document.querySelector(sel); if (!e) { console.log('없음', sel); continue; } const r = e.getBoundingClientRect(); const d = document.createElement('div'); d.className = 'bdg'; d.textContent = n; d.style.cssText = 'position:absolute;z-index:99;width:24px;height:24px;border-radius:50%;background:#e03131;color:#fff;font:700 14px/24px system-ui;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.4);left:' + (r.left + scrollX + (dx === 'R' ? r.width - 26 : (dx || 0)) - 8) + 'px;top:' + (r.top + scrollY + (dy || 0) - 10) + 'px'; document.body.appendChild(d); } };

const b = await chromium.launch();
for (const ui of ['ko', 'vi']) {
  const ctx = await b.newContext({ viewport: { width: 760, height: 1000 }, deviceScaleFactor: 2 });
  await ctx.addInitScript((l) => { try { localStorage.setItem('owner-lang', l); } catch {} }, ui);
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  // 1) 로그인 화면
  await p.goto(`http://127.0.0.1:${PORT}/owner/?shop=demo`); await p.waitForTimeout(500);
  await p.screenshot({ path: `${out}/login-${ui}.png`, clip: { x: 0, y: 40, width: 760, height: 360 } });
  // 2) 편집기 (로그인한 상태로)
  await p.evaluate(() => sessionStorage.setItem('qm_owner_demo', 'demo'));
  await p.goto(`http://127.0.0.1:${PORT}/owner/?shop=demo`); await p.waitForTimeout(900);
  await p.evaluate(BADGE, [['[data-a=save]', 1], ['.bar .st', 2, 'R', 4], ['[data-a=hist]', 3], ['[data-a=reset]', 4],
    ['.box:nth-of-type(2)', 5, 4, 4], ['.cat .row', 6], ['.cat .item .ph', 7], ['.cat .item .row > div:nth-child(2)', 8, 100, 2], ['.cat .item .row > div:nth-child(3)', 9, 100, 2], ['.cat .item .tools', 10, 380, 14], ['.cat .item details summary', 11, 120, 6]]);
  await p.screenshot({ path: `${out}/editor-${ui}.png`, fullPage: false, clip: { x: 0, y: 70, width: 760, height: 780 } });
  // 3) 더 보기 펼친 화면
  await p.evaluate(() => { document.querySelectorAll('.bdg').forEach((e) => e.remove()); });
  await p.click('.cat .item details summary'); await p.waitForTimeout(300);
  const box = await p.locator('.cat .item').first().boundingBox();
  await p.evaluate(BADGE, [['.cat .item details textarea, .cat .item details input[data-k=desc]', 12, 170, -14], ['.cat .item details select[data-k=tag]', 13, 50, -14], ['.cat .item details input[data-k=spicy]', 14, 140, -2], ['.cat .item details input[data-ol=en]', 15, 120, -18]]);
  await p.screenshot({ path: `${out}/item-${ui}.png`, clip: { x: 0, y: Math.max(0, box.y - 6), width: 760, height: Math.min(box.height + 12, 760) } });
  // 4) 이전 버전
  await p.reload(); await p.waitForTimeout(700);
  await p.click('[data-a=hist]'); await p.waitForTimeout(300);
  await p.screenshot({ path: `${out}/history-${ui}.png`, clip: { x: 0, y: 0, width: 760, height: 560 } });
  console.log(ui, errs.length ? errs : '오류 없음');
  await ctx.close();
}
await b.close(); server.close();
console.log('저장:', out);
