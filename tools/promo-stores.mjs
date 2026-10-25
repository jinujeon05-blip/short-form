// 가게 찾기(qrmenuasia.com/stores) 손님용 홍보 숏폼 영상 (세로 1080×1920, 23초, 소리 없음 — 음악은 틱톡·릴스 앱에서 고른다)
// 대상: 손님(한인·베트남인·여행자). 가게 하나가 아니라 '가게 찾기' 웹앱을 홍보한다.
// 사용법: node tools/promo-stores.mjs [검색어, 기본 삼겹살]   → sales/print/promo-stores.mp4
// 가게 수는 계속 늘어나니 영상에 숫자를 넣지 않는다(사용자 지시 2026-10-25).
// 장면: ① 오늘 뭐 먹지? ② 가게 메뉴 미리 보기 ③ 음식 이름으로 검색 ④ 지역·종류 고르기 ⑤ 사진·가격·내 언어로(가마솥) ⑥ 주소·QR·홈 화면에 추가
// 글꼴은 tools/video-lib.mjs 참고(영상 전용 Noto Sans KR, 중국어 화면은 안 보여 줌).
import fs from 'node:fs';
import { chromium, ROOT } from './pw.mjs';
import { serve, prep as prepPage, ease, phoneCss, encode, fontFace, FONTS } from './video-lib.mjs';
import { execFileSync } from 'node:child_process';

const word = process.argv[2] || '삼겹살';
const SALES = `${ROOT}/sales`;
const out = `${ROOT}/sales/print/promo-stores-frames`;
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
const servers = [await serve(SALES, 8771), await serve(`${ROOT}/restaurants`, 8772), await serve(FONTS, 8773), await serve(out, 8774)];
const FB = 'http://localhost:8773';

const URL_ = 'https://qrmenuasia.com/stores/?utm_source=video_stores';
execFileSync('node', [`${ROOT}/tools/qr.cjs`, URL_, `${out}/qr.svg`, 'M']);
const qr = fs.readFileSync(`${out}/qr.svg`, 'utf8');
const logo = 'data:image/png;base64,' + fs.readFileSync(`${SALES}/icons/icon-512.png`).toString('base64');

const FPS = 30, T = 23;
const S = [0, 3, 7.5, 12, 15.5, 19.5, 23];
const CAP = [
  null,
  ['가게 메뉴를\n가기 전에 미리', 'Xem trước thực đơn trước khi đến'],
  ['먹고 싶은 음식으로 검색', 'Tìm theo món bạn muốn ăn'],
  ['지역 · 종류별로 골라 보기', 'Lọc theo khu vực · loại món'],
  ['사진 · 가격을 내 언어로', 'Xem ảnh, giá bằng ngôn ngữ của bạn'],
];
// 중국어는 영상 글꼴(Noto Sans KR)에 간체가 일부 없어 화면에서 뺀다
const LANGS = [['ko', '한국어'], ['vi', 'Tiếng Việt'], ['en', 'English'], ['ja', '日本語']];
const STORES = 'http://localhost:8771/stores/?lang=ko&notrack';
const PAGES = [null, STORES, STORES, STORES, 'http://localhost:8772/gamasot/index.html?lang=ko&notrack', null];

const stage = `<!doctype html><html><head><meta charset="utf-8"><style>
${fontFace(FB)}
* { box-sizing: border-box; margin: 0; }
body { width: 1080px; height: 1920px; overflow: hidden; font-family: V, sans-serif; font-weight: 700; color: #fff;
  background: radial-gradient(120% 80% at 50% 0%, #f2a03d 0%, #e0452b 55%, #7a1f12 100%); }
.cap { position: absolute; left: 0; right: 0; top: 110px; text-align: center; padding: 0 40px; }
.cap b { display: block; word-break: keep-all; font-size: 74px; font-weight: 900; line-height: 1.2; letter-spacing: -1px; }
.cap span { display: inline-block; margin-top: 22px; font-size: 40px; color: #16130f; background: #fff; border-radius: 999px; padding: 12px 34px; }
${phoneCss}
.badge { position: absolute; left: 50%; top: 1745px; transform: translateX(-50%); font-size: 54px; color: #16130f; background: #fff; border-radius: 26px; padding: 16px 44px; opacity: 0; }
.foot { position: absolute; left: 0; right: 0; bottom: 70px; text-align: center; font-size: 40px; }
.hook { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 60px; }
.hook img { width: 280px; height: 280px; border-radius: 66px; box-shadow: 0 30px 70px rgba(0,0,0,.35); }
.hook b { font-size: 118px; font-weight: 900; line-height: 1.15; margin-top: 56px; letter-spacing: -2px; }
.hook span { margin-top: 30px; font-size: 52px; color: #16130f; background: #fff; border-radius: 999px; padding: 14px 44px; }
.hook p { margin-top: 40px; font-size: 44px; line-height: 1.45; }
.end { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: #faf7f2; color: #16130f; opacity: 0; padding: 0 50px; }
.end img { width: 200px; height: 200px; border-radius: 46px; }
.end h1 { font-size: 92px; font-weight: 900; margin-top: 30px; letter-spacing: -1px; }
.end .sub { font-size: 40px; line-height: 1.45; color: #6f675d; margin-top: 12px; }
.end .qrs { width: 380px; margin-top: 40px; background: #fff; padding: 18px; border-radius: 28px; }
.end .qrs svg { width: 100%; height: auto; display: block; }
.end .url { margin-top: 34px; font-size: 54px; font-weight: 900; color: #fff; background: #e0452b; border-radius: 999px; padding: 16px 46px; }
.end .tip { margin-top: 40px; font-size: 38px; line-height: 1.5; color: #2a251f; }
.end .tip small { display: block; color: #6f675d; font-size: 34px; }
.tap { position: absolute; width: 90px; height: 90px; margin: -45px 0 0 -45px; border-radius: 50%; background: rgba(255,255,255,.55); border: 6px solid #fff; box-shadow: 0 6px 24px rgba(0,0,0,.35); opacity: 0; pointer-events: none; }
</style></head><body>
<div class="hook" id="hook"><img src="${logo}"><b>오늘 뭐 먹지?</b><span>Hôm nay ăn gì?</span><p>박닌 · 하노이 맛집 메뉴<br>Thực đơn quán ngon Bắc Ninh · Hà Nội</p></div>
<div class="cap" id="cap"><b id="capKo"></b><span id="capVi"></span></div>
<div class="phone" id="phone"><div class="screen"><iframe id="f"></iframe></div></div>
<div class="tap" id="tap"></div>
<div class="badge" id="badge"></div>
<div class="foot" id="foot">qrmenuasia.com/stores</div>
<div class="end" id="end"><img src="${logo}"><h1>가게 찾기</h1><p class="sub">QR MENU ASIA · Tìm quán</p>
<div class="qrs">${qr}</div><p class="url">qrmenuasia.com/stores</p>
<p class="tip">무료 · 설치 없이 바로 · 홈 화면에 추가하면 앱처럼<small>Miễn phí · Không cần cài · Thêm vào màn hình chính</small></p></div>
</body></html>`;
fs.writeFileSync(`${out}/stage.html`, stage);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('http://localhost:8774/stage.html');
await p.evaluate(() => document.fonts.ready);
const frame = () => p.frames().find((x) => x !== p.mainFrame());
const prep = () => prepPage(frame(), FB);
let url = null;
const open = async (u) => {
  await p.evaluate((u) => new Promise((r) => { const f = document.getElementById('f'); f.onload = r; f.src = u; }), u);
  await p.waitForTimeout(400); await prep(); url = u;
};
// 휴대폰 화면 속 요소의 화면 좌표(무대 기준) — 누르는 손가락 표시용
const where = async (sel) => {
  const r = await frame().evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; }, sel);
  const ph = await p.evaluate(() => { const b = document.querySelector('.screen').getBoundingClientRect(); return [b.left, b.top]; });
  return r ? [ph[0] + r[0] * 1.8, ph[1] + r[1] * 1.8] : null;
};

let lang = 'ko', typed = '', done = new Set(), tap = null;
for (let n = 0; n < FPS * T; n++) {
  const t = n / FPS;
  const sc = S.findIndex((s, i) => t >= s && t < S[i + 1]);
  const local = t - S[sc];
  if (PAGES[sc] && url !== PAGES[sc]) { await open(PAGES[sc]); lang = 'ko'; }
  const f = frame();
  let scroll = 0;
  if (sc === 1) scroll = 1500 * ease((local - 0.8) / 3.4);
  if (sc === 2) {
    // 검색창에 한 글자씩
    const k = Math.min(word.length, Math.max(0, Math.floor((local - 0.6) / 0.45) + 1));
    const want = local < 0.6 ? '' : word.slice(0, k);
    if (!done.has('top2')) { await f.evaluate(() => scrollTo(0, 0)); done.add('top2'); }
    if (want !== typed) { await f.evaluate((v) => { const q = document.getElementById('q'); q.value = v; q.dispatchEvent(new Event('input', { bubbles: true })); }, want); await prep(); typed = want; }
    const box = await f.evaluate(() => document.getElementById('searchBox').getBoundingClientRect().top + scrollY);
    scroll = Math.max(0, box - 40) + 520 * ease((local - 2.4) / 1.8);
    tap = local < 0.7 ? await where('#q') : null;
  }
  if (sc === 3) {
    if (!done.has('clear')) { await f.evaluate(() => { const q = document.getElementById('q'); q.value = ''; q.dispatchEvent(new Event('input', { bubbles: true })); }); await prep(); done.add('clear'); }
    const top = await f.evaluate(() => document.getElementById('regionChips').getBoundingClientRect().top + scrollY);
    scroll = Math.max(0, top - 60) + 520 * ease((local - 2.2) / 1.2);
    tap = null;
    for (const [at, sel] of [[0.5, '.chip[data-v="hanoi"]'], [1.4, '.chip[data-v="korean"]']]) {
      if (local >= at - 0.35 && local < at + 0.15) tap = await where(sel);
      if (local >= at && !done.has(sel)) { await f.evaluate((s) => document.querySelector(s)?.click(), sel); await prep(); done.add(sel); }
    }
  }
  if (sc === 4) {
    const want = LANGS[Math.min(3, Math.floor(local / 1))][0];
    if (want !== lang) { await f.evaluate((l) => document.querySelector(`#langs button[data-lang="${l}"]`)?.click(), want); await prep(); lang = want; }
    scroll = 480 + 260 * ease(local / 1.5);
    tap = null;
  }
  if (PAGES[sc]) await f.evaluate((y) => scrollTo(0, y), scroll);
  await p.evaluate(({ sc, local, cap, langName, tap }) => {
    const $ = (id) => document.getElementById(id);
    const inA = Math.min(1, local / 0.35);
    $('hook').style.opacity = sc === 0 ? Math.min(1, local / 0.4) : 0;
    $('hook').style.transform = `scale(${sc === 0 ? 0.92 + 0.08 * Math.min(1, local / 0.6) : 1})`;
    if (cap) { $('capKo').innerHTML = cap[0].replace(/\n/g, '<br>'); $('capVi').textContent = cap[1]; }
    $('cap').style.opacity = cap ? inA : 0;
    $('cap').style.transform = `translateY(${(1 - inA) * 40}px)`;
    const ph = sc === 1 ? Math.min(1, local / 0.45) : 1;
    $('phone').style.opacity = sc >= 1 && sc <= 4 ? ph : 0;
    $('phone').style.transform = `translateY(${(1 - ph) * 300}px)`;
    $('tap').style.opacity = tap ? 1 : 0;
    if (tap) { $('tap').style.left = tap[0] + 'px'; $('tap').style.top = tap[1] + 'px'; }
    $('badge').style.opacity = sc === 4 ? 1 : 0;
    $('badge').textContent = langName || '';
    $('foot').style.opacity = sc === 4 || sc === 5 ? 0 : 0.9;
    $('end').style.opacity = sc === 5 ? Math.min(1, local / 0.4) : 0;
  }, { sc, local, cap: CAP[sc] || null, langName: sc === 4 ? LANGS[Math.min(3, Math.floor(local / 1))][1] : '', tap });
  await p.screenshot({ path: `${out}/${String(n).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
}
await b.close();
servers.forEach((s) => s.close());
console.log(encode(out, FPS, `${ROOT}/sales/print/promo-stores.mp4`), `검색어 ${word}`);
