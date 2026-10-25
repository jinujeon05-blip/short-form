// SNS 홍보 숏폼 영상(세로 1080×1920, 15초, 소리 없음 — 음악은 틱톡·릴스 앱에서 고른다)
// 사용법: node tools/reel.mjs <가게> [사진1,사진2]   예) node tools/reel.mjs gamasot img/galbijjim.jpg,img/gejang.jpg
// 장면: ① 테이블 QR 찍기 ② 사진 메뉴판이 열림(스크롤) ③ 5개 언어로 바뀜 ④ 음식 사진 확대 ⑤ 가게 이름·주소·QR
// 메뉴판 화면을 프레임마다 캡처해 휴대폰 틀에 넣고 ffmpeg 로 묶는다 → restaurants/<가게>/print/reel.mp4
// 색은 가게 partner-theme(--pt-accent, --pt-btn), 글꼴은 tools/video-fonts 의 Gothic A1 하나만(영상 전용).
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { chromium, ROOT } from './pw.mjs';
const [shop, photoArg] = process.argv.slice(2);
if (!shop) { console.error('사용법: node tools/reel.mjs <가게> [사진1,사진2]'); process.exit(1); }
const D = `${ROOT}/restaurants/${shop}`;
const html = fs.readFileSync(`${D}/index.html`, 'utf8');
const theme = (k, d) => (html.match(new RegExp(`--pt-${k}:\\s*([^;]+);`)) || [, d])[1].trim();
const accent = theme('accent', '#857866'), btn = theme('btn', '#6f6353');
const win = { window: {} };
new Function('window', fs.readFileSync(`${D}/menu.js`, 'utf8'))(win.window);
const R = win.window.RESTAURANT, MENU = win.window.MENU;
const allPhotos = MENU.flatMap((c) => c.items.filter((i) => i.photo).map((i) => i.photo));
const photos = photoArg ? photoArg.split(',') : allPhotos.slice(0, 2);
const top = fs.existsSync(`${D}/img/logo.png`) ? 'img/logo.png' : 'img/sign.jpg';
const host = `${shop}.qrmenuasia.com`;

const FPS = 30, T = 15;
const S = [0, 2.5, 6, 9.5, 12.5, 15]; // 장면 시작 시각
const CAP = [
  ['테이블 QR 한 번 찍으면', 'Quét mã QR tại bàn'],
  ['사진 메뉴판이 바로 열려요', 'Thực đơn hình ảnh hiện ngay'],
  ['5개 언어로 바로 바뀌어요', 'Đổi 5 ngôn ngữ chỉ một chạm'],
  ['음식 사진도 크게 보여요', 'Xem ảnh món ăn thật rõ'],
];
const LANGS = [['ko', '한국어'], ['vi', 'Tiếng Việt'], ['en', 'English'], ['zh', '中文'], ['ja', '日本語']];

const out = `${D}/print/reel-frames`;
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
const font = `file://${ROOT}/tools/video-fonts/GothicA1-Bold.ttf`; // 영상 전용 글꼴(한·영·베), G마켓 산스는 베트남어가 없음
const qr = fs.readFileSync(`${D}/print/qr.svg`, 'utf8');
// 휴대폰 화면: CSS 390×696 을 1.8배로 (화면 702×1253)
const PW = 390, PH = 696, K = 1.8;
const stage = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: G; src: url(${font}); }
* { box-sizing: border-box; margin: 0; }
body { width: 1080px; height: 1920px; overflow: hidden; font-family: G, sans-serif; color: #fff;
  background: radial-gradient(120% 80% at 50% 0%, ${accent} 0%, ${btn} 60%, #2b2622 100%); }
.cap { position: absolute; left: 0; right: 0; top: 120px; text-align: center; }
.cap b { display: block; font-size: 74px; line-height: 1.15; letter-spacing: -1px; }
.cap span { display: inline-block; margin-top: 22px; font-size: 42px; color: #2b2622; background: #fff; border-radius: 999px; padding: 12px 34px; }
.phone { position: absolute; left: 50%; top: 430px; width: ${PW * K + 36}px; height: ${PH * K + 36}px; margin-left: -${(PW * K + 36) / 2}px;
  background: #111; border-radius: 70px; padding: 18px; box-shadow: 0 40px 90px rgba(0,0,0,.45); }
.screen { width: ${PW * K}px; height: ${PH * K}px; border-radius: 54px; overflow: hidden; background: #fff; }
iframe { width: ${PW}px; height: ${PH}px; border: 0; transform: scale(${K}); transform-origin: 0 0; }
.badge { position: absolute; left: 50%; top: 1745px; transform: translateX(-50%); font-size: 56px; color: #2b2622; background: #fff; border-radius: 26px; padding: 18px 44px; box-shadow: 0 16px 40px rgba(0,0,0,.3); opacity: 0; }
.qr { position: absolute; left: 50%; top: 560px; width: 760px; margin-left: -380px; background: #fff; border-radius: 48px; padding: 60px; }
.qr svg { display: block; width: 100%; height: auto; }
.scan { position: absolute; left: 30px; right: 30px; height: 10px; border-radius: 5px; background: ${accent}; box-shadow: 0 0 40px 12px ${accent}; }
.foot { position: absolute; left: 0; right: 0; bottom: 70px; text-align: center; font-size: 40px; opacity: .9; }
.end { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: #fff; color: #2b2622; opacity: 0; }
.end img.logo { width: 520px; height: 320px; object-fit: contain; }
.end h1 { font-size: 110px; margin-top: 20px; }
.end .en { font-size: 46px; letter-spacing: 10px; color: ${btn}; margin-top: 10px; }
.end .addr { font-size: 36px; color: #6a625a; margin: 40px 80px 0; line-height: 1.4; }
.end .qrs { width: 330px; margin-top: 50px; }
.end .qrs svg { width: 100%; height: auto; display: block; }
.end .url { margin-top: 34px; font-size: 52px; color: #fff; background: ${btn}; border-radius: 999px; padding: 16px 46px; }
.end .brand { margin-top: 40px; font-size: 32px; color: #9a9188; }
</style></head><body>
<div class="cap" id="cap"><b id="capKo"></b><span id="capVi"></span></div>
<div class="qr" id="qr">${qr}<div class="scan" id="scan"></div></div>
<div class="phone" id="phone"><div class="screen"><iframe id="f" src="file://${D}/index.html?lang=ko&notrack"></iframe></div></div>
<div class="badge" id="badge"></div>
<div class="foot" id="foot">QR MENU · ${host}</div>
<div class="end" id="end"><img class="logo" src="file://${D}/${top}"><h1>${R.brand.ko}</h1><p class="en">${R.brand.en}</p>
<p class="addr">${R.address}</p><div class="qrs">${qr}</div><p class="url">${host}</p><p class="brand">QR MENU ASIA · qrmenuasia.com</p></div>
</body></html>`;
fs.writeFileSync(`${out}/stage.html`, stage);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto(`file://${out}/stage.html`);
await p.waitForTimeout(1500);
const f = p.frames().find((x) => x.url().includes('index.html'));
// 사진을 미리 다 불러 두고, 부드러운 스크롤은 끈다
const prep = () => f.evaluate(async () => {
  document.documentElement.style.scrollBehavior = 'auto';
  document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; });
  await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 1500); })));
});
const setLang = (l) => f.evaluate((l) => document.querySelector(`#langs button[data-lang="${l}"]`)?.click(), l);
await prep();
const thumbY = await f.evaluate((ps) => ps.map((ph) => { const e = document.querySelector(`.thumb[data-photo="${ph}"]`); return e ? e.getBoundingClientRect().top + scrollY : 0; }), photos);

const ease = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
let lang = 'ko', zoom = null;
for (let n = 0; n < FPS * T; n++) {
  const t = n / FPS;
  const sc = S.findIndex((s, i) => t >= s && t < S[i + 1]);
  const local = t - S[sc];
  // 메뉴판 안쪽 상태
  let want = 'ko', scroll = 0, wantZoom = null;
  if (sc === 1) scroll = 1100 * ease((local - 0.6) / 2.6);
  if (sc === 2) { want = LANGS[Math.min(4, Math.floor(local / 0.7))][0]; scroll = 0; }
  if (sc === 3) {
    const i = local < 1.5 ? 0 : 1;
    scroll = Math.max(0, thumbY[i] - 260);
    if (local % 1.5 > 0.35) wantZoom = photos[i];
  }
  if (want !== lang) { await setLang(want); await prep(); lang = want; }
  if (wantZoom !== zoom) {
    await f.evaluate((ph) => {
      const z = document.getElementById('zoom');
      if (!ph) { z.classList.remove('show'); return; }
      document.querySelector(`.thumb[data-photo="${ph}"]`)?.click();
    }, wantZoom);
    zoom = wantZoom;
    if (zoom) await f.evaluate(() => new Promise((r) => { const i = document.getElementById('zoomImg'); i.complete ? r() : (i.onload = r); }));
  }
  await f.evaluate((y) => scrollTo(0, y), scroll);
  // 바깥 무대
  await p.evaluate(({ sc, local, cap, langName }) => {
    const $ = (id) => document.getElementById(id);
    const inA = Math.min(1, local / 0.35);
    if (cap) { $('capKo').textContent = cap[0]; $('capVi').textContent = cap[1]; }
    $('cap').style.opacity = cap ? inA : 0;
    $('cap').style.transform = `translateY(${(1 - inA) * 40}px)`;
    $('qr').style.opacity = sc === 0 ? 1 : 0;
    $('scan').style.top = `${30 + 640 * (0.5 - 0.5 * Math.cos(local * 2.6))}px`;
    const ph = sc === 0 ? 0 : Math.min(1, local / 0.45 + (sc > 1 ? 1 : 0));
    $('phone').style.opacity = sc >= 1 && sc <= 3 ? ph : 0;
    $('phone').style.transform = `translateY(${(1 - ph) * 300}px)`;
    $('badge').style.opacity = sc === 2 ? 1 : 0;
    $('badge').textContent = langName || '';
    $('end').style.opacity = sc === 4 ? Math.min(1, local / 0.4) : 0;
    $('foot').style.opacity = sc === 4 || sc === 2 ? 0 : 0.9;
  }, { sc, local, cap: CAP[sc] || null, langName: sc === 2 ? LANGS[Math.min(4, Math.floor(local / 0.7))][1] : '' });
  await p.screenshot({ path: `${out}/${String(n).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
}
await b.close();
const mp4 = `${D}/print/reel.mp4`;
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', `${out}/%04d.jpg`, '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo',
  '-shortest', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium', '-movflags', '+faststart', '-c:a', 'aac', mp4]);
fs.rmSync(out, { recursive: true, force: true });
console.log(mp4, `${(fs.statSync(mp4).size / 1e6).toFixed(1)}MB`, `사진: ${photos.join(', ')}`);
