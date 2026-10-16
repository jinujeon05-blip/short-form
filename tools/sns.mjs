// SNS 홍보용 QR 이미지: node tools/sns.mjs <가게폴더명> [메뉴판 화면 언어, 기본 vi] [버튼 글자, 기본 MENU] [가게 이름, 기본 DEMOS 의 name]
// 버튼 글자가 MENU 가 아니면(예: 화장품 판매 SHOP) 안내 문구도 '상품 보기'로 바뀐다.
// → restaurants/<가게>/print/sns-square.png (1080×1080, 게시물·Zalo) · sns-story.png (1080×1920, 스토리)
// 가게 이름·종류·주소는 sales/content.js 의 DEMOS, 색은 가게 index.html 의 partner-theme 를 쓴다.
import { chromium, ROOT } from './pw.mjs';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import vm from 'vm';
const [shop, lang = 'vi', label = 'MENU', nameArg] = process.argv.slice(2);
if (!shop) { console.error('사용법: node tools/sns.mjs <가게폴더명> [vi|ko|en|zh|ja] [MENU|SHOP] [가게 이름]'); process.exit(1); }

const ctx = { window: {} }; vm.runInNewContext(readFileSync(`${ROOT}/sales/content.js`, 'utf8'), ctx);
const d = ctx.window.DEMOS.find((x) => x.id === shop);
if (!d) { console.error(`sales/content.js 의 DEMOS 에 ${shop} 이 없습니다`); process.exit(1); }
const html = readFileSync(`${ROOT}/restaurants/${shop}/index.html`, 'utf8');
const pt = (k, def) => (html.match(new RegExp(`--pt-${k}:\\s*([^;]+);`)) || [])[1]?.trim() || def;
const dark = pt('mode', 'light') === 'dark';
const C = { bg: pt('bg', '#fff'), ink: pt('ink', '#222'), muted: pt('muted', '#777'), accent: pt('accent', '#e0452b'), btn: pt('btn', '#222'), btnInk: pt('btn-ink', '#fff') };
// QR: 가게 print/qr.svg, 없으면(테이블 카드를 안 만든 가게) 소개서의 sales/img/qr-<가게>.svg
const qrPath = [`${ROOT}/restaurants/${shop}/print/qr.svg`, `${ROOT}/sales/img/qr-${shop}.svg`].find(existsSync);
if (!qrPath) { console.error('QR 파일이 없습니다. 먼저 tools/qr.cjs 로 만드세요'); process.exit(1); }
const qr = readFileSync(qrPath, 'utf8');
const url = d.url.replace('https://', '');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const name = esc(nameArg || d.name), type = esc(d.type[lang] || d.type.en), btn = esc(label);
const gmarket = readFileSync(`${ROOT}/public/fonts/GmarketSansTTFBold.ttf`).toString('base64');

const b = await chromium.launch();
// 1) 메뉴판 첫 화면 캡처 (휴대폰 모형 안에 넣을 그림)
const ph = await b.newPage({ viewport: { width: 390, height: 800 }, deviceScaleFactor: 2.5 });
await ph.goto(`file://${ROOT}/restaurants/${shop}/index.html?lang=${lang}`, { waitUntil: 'load' });
// 첫 화면에 보이는 사진·글꼴을 기다린다 (아래쪽 lazy 사진은 안 뜨므로 최대 4초)
await ph.evaluate(() => Promise.race([new Promise((r) => setTimeout(r, 4000)), Promise.all([document.fonts.ready,
  ...[...document.images].filter((i) => i.getBoundingClientRect().top < innerHeight).map((i) => i.complete || new Promise((r) => { i.onload = i.onerror = r; }))])]));
await ph.waitForTimeout(500);
const shot = (await ph.screenshot({ type: 'jpeg', quality: 88 })).toString('base64');

const LINES = label === 'MENU'
  ? [['🇻🇳', 'Quét mã xem thực đơn'], ['🇰🇷', 'QR 찍고 메뉴 보기'], ['🇬🇧', 'Scan for the menu'], ['🇨🇳', '扫码看菜单'], ['🇯🇵', 'QRでメニュー']]
  : [['🇻🇳', 'Quét mã xem sản phẩm'], ['🇰🇷', 'QR 찍고 상품 보기'], ['🇬🇧', 'Scan to shop'], ['🇨🇳', '扫码看商品'], ['🇯🇵', 'QRで商品を見る']];
if (lang === 'ko') LINES.unshift(LINES.splice(1, 1)[0]); // 한국 매장은 한국어 줄을 맨 위로
const page = (W, H, story) => `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: "Gmarket"; src: url(data:font/ttf;base64,${gmarket}); }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: ${W}px; height: ${H}px; overflow: hidden; font-family: "Inter", "Gmarket", "WenQuanYi Zen Hei", "IPAGothic", "Noto Color Emoji", sans-serif; color: ${C.ink};
    background: radial-gradient(90% 60% at 80% 0%, color-mix(in srgb, ${C.accent} ${dark ? 30 : 16}%, transparent), transparent 70%),
                radial-gradient(70% 50% at 0% 100%, color-mix(in srgb, ${C.accent} ${dark ? 18 : 10}%, transparent), transparent 70%), ${C.bg}; }
  .box { position: absolute; inset: 0; display: grid; ${story
    ? 'grid-template-rows: auto 1fr auto; justify-items: center; padding: 170px 80px 190px; text-align: center;'
    : 'grid-template-columns: 410px 1fr; gap: 64px; align-items: center; padding: 70px 76px;'} }
  .phone { width: ${story ? 400 : 410}px; border-radius: ${story ? 62 : 54}px; padding: ${story ? 14 : 12}px; background: #0b0a09;
    box-shadow: 0 40px 80px rgba(0,0,0,${dark ? .6 : .28}), inset 0 0 0 2px #3b342c; ${story ? 'transform: rotate(-3deg);' : ''} }
  .phone img { display: block; width: 100%; border-radius: ${story ? 49 : 43}px; aspect-ratio: 390 / ${story ? 720 : 800}; object-fit: cover; object-position: top; }
  .name { font-weight: 900; font-size: ${story ? 96 : 74}px; line-height: 1.05; letter-spacing: -1.5px; word-break: keep-all; }
  .type { margin-top: 14px; font-size: ${story ? 34 : 27}px; font-weight: 600; color: ${C.muted}; }
  .menu { display: inline-block; margin-top: ${story ? 0 : 34}px; font-weight: 900; font-size: ${story ? 40 : 30}px; letter-spacing: 6px; color: ${C.btnInk}; background: ${C.btn}; border-radius: 999px; padding: 10px 30px 10px 36px; }
  .qr { position: relative; width: ${story ? 360 : 330}px; margin-top: 26px; padding: 18px; background: #fff; border-radius: 28px; box-shadow: 0 0 0 4px ${C.accent}, 0 20px 40px rgba(0,0,0,.18); ${story ? 'margin-left: auto; margin-right: auto;' : ''} }
  .qr svg { display: block; width: 100%; height: auto; }
  .url { margin-top: 22px; font-weight: 800; font-size: ${story ? 36 : 27}px; color: ${C.accent}; letter-spacing: .3px; }
  ul { list-style: none; margin-top: 22px; display: grid; grid-template-columns: ${story ? 'auto auto' : '1fr'}; gap: 8px ${story ? 34 : 0}px; ${story ? 'justify-content: center; text-align: left;' : ''} font-size: ${story ? 30 : 24}px; font-weight: 600; color: ${C.muted}; }
  ${story ? 'ul li:last-child { grid-column: 1 / -1; justify-self: center; }' : ''}
</style></head><body><div class="box">
  ${story ? `<div><div class="name">${name}</div><div class="type">${type}</div></div>
    <div style="display:grid;place-items:center;margin:24px 0"><div class="phone"><img src="data:image/jpeg;base64,${shot}"></div></div>
    <div><span class="menu">${btn}</span><div class="qr">${qr}</div><div class="url">${url}</div><ul>${LINES.map(([f, t]) => `<li>${f} ${t}</li>`).join('')}</ul></div>`
  : `<div class="phone"><img src="data:image/jpeg;base64,${shot}"></div>
    <div><div class="name">${name}</div><div class="type">${type}</div><span class="menu">${btn}</span>
      <div class="qr">${qr}</div><div class="url">${url}</div><ul>${LINES.slice(0, 3).map(([f, t]) => `<li>${f} ${t}</li>`).join('')}</ul></div>`}
</div></body></html>`;

const out = `${ROOT}/restaurants/${shop}/print`; mkdirSync(out, { recursive: true });
for (const [W, H, story, file] of [[1080, 1080, false, 'sns-square.png'], [1080, 1920, true, 'sns-story.png']]) {
  const p = await b.newPage({ viewport: { width: W, height: H } });
  await p.setContent(page(W, H, story)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const over = await p.evaluate(([W, H]) => [...document.querySelectorAll('.box *')].filter((e) => { const r = e.getBoundingClientRect(); return r.right > W + .5 || r.bottom > H + .5 || r.left < -.5; }).map((e) => e.className || e.tagName), [W, H]);
  await p.screenshot({ path: `${out}/${file}` });
  console.log(`${out}/${file}`, over.length ? `| 화면 밖으로 넘친 요소: ${over}` : '| 넘침 없음');
}
await b.close();
