// qrmenuasia 웹앱 홍보 숏폼 영상 (세로 1080×1920, 20초, 소리 없음 — 음악은 틱톡·릴스 앱에서 고른다)
// 대상: 손님(가게 찾기) + 점주(QR 메뉴판 만들기). 가게 하나를 홍보하는 영상이 아니다.
// 사용법: node tools/promo.mjs   → sales/print/promo.mp4
// 장면: ① 종이 메뉴판? ② 가게 찾기(지역·종류 고르기) ③ 사진 메뉴·5개 언어(가마솥) ④ 점주용 소개서 ⑤ qrmenuasia.com·QR·상담 연락처
// 글꼴: tools/video-fonts/Noto Sans KR (한·영·베·일, 중국어 간체 일부 없음 → 중국어 화면 빼기) — **영상 전용**. 메뉴판·소개서 사이트에는 쓰지 않는다(사용자 지시 2026-10-25).
//       녹화할 때만 휴대폰 화면 속 페이지에도 이 글꼴을 입혀 영상 전체를 한 글꼴로 맞춘다(사이트 파일은 그대로).
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium, ROOT } from './pw.mjs';

// sales/ 와 restaurants/ 를 로컬에서 띄운다 (sales 페이지가 /img/… 같은 절대 경로를 써서 file:// 로는 안 열림)
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webmanifest': 'application/json', '.ico': 'image/x-icon', '.ttf': 'font/ttf' };
const serve = (dir, port) => new Promise((ok) => {
  const s = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.join(dir, p);
    if (!f.startsWith(dir) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  }).listen(port, () => ok(s));
});
const SALES = `${ROOT}/sales`, FONTS = `${ROOT}/tools/video-fonts`;
const s1 = await serve(SALES, 8761), s2 = await serve(`${ROOT}/restaurants`, 8762), s3 = await serve(FONTS, 8763);

const win = { window: {} };
new Function('window', fs.readFileSync(`${SALES}/content.js`, 'utf8'))(win.window);
const C = win.window.CONTACT;
const st = { window: {} };
new Function('window', fs.readFileSync(`${SALES}/stores/data.js`, 'utf8'))(st.window);
const N = st.window.STORES.length;

const out = `${ROOT}/sales/print/promo-frames`;
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
const URL_ = 'https://qrmenuasia.com/?utm_source=video';
execFileSync('node', [`${ROOT}/tools/qr.cjs`, URL_, `${out}/qr.svg`, 'M']);
const qr = fs.readFileSync(`${out}/qr.svg`, 'utf8');
const logo = 'data:image/png;base64,' + fs.readFileSync(`${SALES}/icons/icon-512.png`).toString('base64');

const FPS = 30, T = 20;
const S = [0, 3, 8, 12, 17, 20];
const CAP = [
  null,
  ['여러 가게 메뉴를 한 번에', 'Xem thực đơn nhiều quán chỉ một chạm'],
  ['사진 메뉴 · 5개 언어', 'Thực đơn có ảnh · 5 ngôn ngữ'],
  ['사장님, QR 메뉴판\n만들어 드려요', 'Chủ quán: làm thực đơn QR cho quán'],
];
const CAP3B = ['테이블 QR 카드 ·\n가격 직접 수정 · Zalo 주문', 'Thẻ QR · Tự sửa giá · Đặt món qua Zalo'];
const LANGS = [['ko', '한국어'], ['vi', 'Tiếng Việt'], ['en', 'English'], ['ja', '日本語']]; // 중국어는 영상 글꼴에 간체가 일부 없어 뺌
const PAGES = [null, 'http://localhost:8761/stores/?lang=ko&notrack', 'http://localhost:8762/gamasot/index.html?lang=ko&notrack', 'http://localhost:8761/?lang=ko&notrack', null];

const PW = 390, PH = 696, K = 1.8;
const stage = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: V; src: url(http://localhost:8763/NotoSansKR-Bold.ttf); font-weight: 400 700; }
@font-face { font-family: V; src: url(http://localhost:8763/NotoSansKR-Black.ttf); font-weight: 800 900; }
* { box-sizing: border-box; margin: 0; }
body { width: 1080px; height: 1920px; overflow: hidden; font-family: V, sans-serif; font-weight: 700; color: #fff;
  background: radial-gradient(120% 80% at 50% 0%, #f2a03d 0%, #e0452b 55%, #7a1f12 100%); }
.cap { position: absolute; left: 0; right: 0; top: 120px; text-align: center; padding: 0 40px; }
.cap b { display: block; word-break: keep-all; font-size: 72px; font-weight: 800; line-height: 1.2; letter-spacing: -1px; }
.cap span { display: inline-block; margin-top: 22px; font-size: 40px; color: #16130f; background: #fff; border-radius: 999px; padding: 12px 34px; }
.phone { position: absolute; left: 50%; top: 430px; width: ${PW * K + 36}px; height: ${PH * K + 36}px; margin-left: -${(PW * K + 36) / 2}px;
  background: #111; border-radius: 70px; padding: 18px; box-shadow: 0 40px 90px rgba(0,0,0,.45); }
.screen { width: ${PW * K}px; height: ${PH * K}px; border-radius: 54px; overflow: hidden; background: #fff; }
iframe { width: ${PW}px; height: ${PH}px; border: 0; transform: scale(${K}); transform-origin: 0 0; }
.badge { position: absolute; left: 50%; top: 1745px; transform: translateX(-50%); font-size: 54px; color: #16130f; background: #fff; border-radius: 26px; padding: 16px 44px; opacity: 0; }
.foot { position: absolute; left: 0; right: 0; bottom: 70px; text-align: center; font-size: 40px; }
.hook { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 60px; }
.hook .mark { width: 300px; height: 300px; border-radius: 70px; box-shadow: 0 30px 70px rgba(0,0,0,.35); }
.hook b { font-size: 92px; font-weight: 800; line-height: 1.2; margin-top: 50px; }
.hook span { margin-top: 30px; font-size: 48px; color: #16130f; background: #fff; border-radius: 999px; padding: 14px 40px; }
.end { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: #faf7f2; color: #16130f; opacity: 0; }
.end img { width: 230px; height: 230px; border-radius: 52px; }
.end h1 { font-size: 104px; font-weight: 800; margin-top: 34px; letter-spacing: -1px; }
.end .sub { font-size: 40px; line-height: 1.45; color: #6f675d; margin-top: 14px; }
.end .qrs { width: 360px; margin-top: 44px; background: #fff; padding: 18px; border-radius: 28px; }
.end .qrs svg { width: 100%; height: auto; display: block; }
.end .url { margin-top: 36px; font-size: 58px; font-weight: 800; color: #fff; background: #e0452b; border-radius: 999px; padding: 16px 50px; }
.end .ct { margin-top: 40px; font-size: 36px; line-height: 1.6; color: #2a251f; }
.end .ct small { color: #6f675d; font-size: 32px; }
</style></head><body>
<div class="hook" id="hook"><img class="mark" src="${logo}"><b>외국어 메뉴판,<br>아직 종이로?</b><span>Vẫn dùng thực đơn giấy?</span></div>
<div class="cap" id="cap"><b id="capKo"></b><span id="capVi"></span></div>
<div class="phone" id="phone"><div class="screen"><iframe id="f"></iframe></div></div>
<div class="badge" id="badge"></div>
<div class="foot" id="foot">QR MENU ASIA · qrmenuasia.com</div>
<div class="end" id="end"><img src="${logo}"><h1>QR MENU ASIA</h1><p class="sub">가게 찾기 · QR 메뉴판 만들기<br>Tìm quán · Làm thực đơn QR</p>
<div class="qrs">${qr}</div><p class="url">qrmenuasia.com</p>
<p class="ct">한국어 상담 · Zalo ${C.zalo}${C.kakao ? ` · 카카오톡 ${C.kakao}` : ''}<br>Tư vấn tiếng Việt · Zalo ${C.vi.zalo}<br><small>무료 상담 · Tư vấn miễn phí</small></p></div>
</body></html>`;
fs.writeFileSync(`${out}/stage.html`, stage);
const s4 = await serve(out, 8764);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('http://localhost:8764/stage.html');
await p.evaluate(() => document.fonts.ready);
const frame = () => p.frames().find((x) => x !== p.mainFrame());
// 휴대폰 화면 속 페이지: 영상용 글꼴을 입히고(녹화할 때만), 사진을 미리 불러 두고, 부드러운 스크롤·애니메이션을 끈다
const prep = () => frame().evaluate(async () => {
  if (!document.getElementById('vfont')) {
    const s = document.createElement('style'); s.id = 'vfont';
    s.textContent = `@font-face{font-family:V;src:url(http://localhost:8763/NotoSansKR-Bold.ttf);font-weight:100 700}@font-face{font-family:V;src:url(http://localhost:8763/NotoSansKR-Black.ttf);font-weight:800 900}
      *,*::before,*::after{font-family:V,sans-serif!important;transition:none!important;animation:none!important;scroll-behavior:auto!important}`;
    document.head.appendChild(s);
  }
  document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; });
  await document.fonts.ready;
  await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 2000); })));
});
let page = -1;
const load = async (i) => {
  await p.evaluate((u) => new Promise((r) => { const f = document.getElementById('f'); f.onload = r; f.src = u; }), PAGES[i]);
  await p.waitForTimeout(400); await prep(); page = i;
};
const ease = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
let lang = 'ko', clicked = new Set();

for (let n = 0; n < FPS * T; n++) {
  const t = n / FPS;
  const sc = S.findIndex((s, i) => t >= s && t < S[i + 1]);
  const local = t - S[sc];
  if (PAGES[sc] && page !== sc) { await load(sc); lang = 'ko'; }
  const f = frame();
  let scroll = 0;
  if (sc === 1) {
    // 지역(박닌) → 종류(한식) 고르고 목록 스크롤
    for (const [at, sel] of [[1.2, '.chip[data-v="bacninh"]'], [2.2, '.chip[data-v="korean"]']]) {
      if (local >= at && !clicked.has(sel)) { await f.evaluate((s) => document.querySelector(s)?.click(), sel); await prep(); clicked.add(sel); }
    }
    scroll = 900 * ease((local - 2.7) / 2.2);
  }
  if (sc === 2) {
    const want = LANGS[Math.min(3, Math.floor(local / 1))][0];
    if (want !== lang) { await f.evaluate((l) => document.querySelector(`#langs button[data-lang="${l}"]`)?.click(), want); await prep(); lang = want; }
    scroll = 260 * ease(local / 1.2);
  }
  if (sc === 3) {
    const y = await f.evaluate(() => { const g = (id) => document.getElementById(id)?.getBoundingClientRect().top + scrollY || 0; return [g('demo'), g('kit'), g('feat')]; });
    scroll = local < 2.5 ? y[0] - 10 + 500 * ease(local / 2.5) : y[1] - 10 + Math.max(0, y[2] - y[1]) * ease((local - 2.5) / 2.3);
  }
  if (PAGES[sc]) await f.evaluate((y) => scrollTo(0, y), scroll);
  await p.evaluate(({ sc, local, cap, langName }) => {
    const $ = (id) => document.getElementById(id);
    const inA = Math.min(1, local / 0.35);
    $('hook').style.opacity = sc === 0 ? Math.min(1, local / 0.4) : 0;
    $('hook').style.transform = `scale(${sc === 0 ? 0.92 + 0.08 * Math.min(1, local / 0.6) : 1})`;
    if (cap) { $('capKo').innerHTML = cap[0].replace(/\n/g, '<br>'); $('capVi').textContent = cap[1]; }
    $('cap').style.opacity = cap ? inA : 0;
    $('cap').style.transform = `translateY(${(1 - inA) * 40}px)`;
    const ph = sc === 1 ? Math.min(1, local / 0.45) : 1;
    $('phone').style.opacity = sc >= 1 && sc <= 3 ? ph : 0;
    $('phone').style.transform = `translateY(${(1 - ph) * 300}px)`;
    $('badge').style.opacity = sc === 2 ? 1 : 0;
    $('badge').textContent = langName || '';
    $('foot').style.opacity = sc === 2 || sc === 4 ? 0 : 0.9;
    $('end').style.opacity = sc === 4 ? Math.min(1, local / 0.4) : 0;
  }, { sc, local, cap: sc === 3 && local >= 2.5 ? CAP3B : CAP[sc] || null, langName: sc === 2 ? LANGS[Math.min(3, Math.floor(local / 1))][1] : '' });
  await p.screenshot({ path: `${out}/${String(n).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
}
await b.close();
for (const s of [s1, s2, s3, s4]) s.close();
const mp4 = `${ROOT}/sales/print/promo.mp4`;
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', `${out}/%04d.jpg`, '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo',
  '-shortest', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium', '-movflags', '+faststart', '-c:a', 'aac', mp4]);
fs.rmSync(out, { recursive: true, force: true });
console.log(mp4, `${(fs.statSync(mp4).size / 1e6).toFixed(1)}MB`);
