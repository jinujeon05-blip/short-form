// 홍보 영상 공용 도구 (promo.mjs·promo-stores.mjs·reel.mjs)
// 글꼴: tools/video-fonts/NotoSansKR-Bold·Black (한·영·베·일, 중국어 간체 일부 없음 → 영상에서 중국어 화면은 보여 주지 않는다)
// **영상 전용** — 메뉴판·소개서·카드 등 사이트와 인쇄물에는 쓰지 않는다(사용자 지시 2026-10-25).
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT } from './pw.mjs';

export const FONTS = `${ROOT}/tools/video-fonts`;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webmanifest': 'application/json', '.ico': 'image/x-icon', '.ttf': 'font/ttf' };

// 폴더를 로컬에서 띄운다 (sales 페이지가 /img/… 같은 절대 경로를 써서 file:// 로는 안 열림)
export const serve = (dir, port) => new Promise((ok) => {
  const s = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.join(dir, p);
    if (!f.startsWith(dir) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream', 'access-control-allow-origin': '*' }); // 글꼴은 다른 포트에서 불러오므로 CORS 필요
    fs.createReadStream(f).pipe(res);
  }).listen(port, () => ok(s));
});

// fontBase: 글꼴 폴더 주소 (http://localhost:<port> 또는 file://…)
export const fontFace = (fontBase) => `@font-face{font-family:V;src:url(${fontBase}/NotoSansKR-Bold.ttf);font-weight:100 700}@font-face{font-family:V;src:url(${fontBase}/NotoSansKR-Black.ttf);font-weight:800 900}`;

// 휴대폰 화면 속 페이지: 녹화할 때만 영상 글꼴을 입히고, 사진을 미리 불러 두고, 부드러운 스크롤·애니메이션을 끈다
export const prep = (frame, fontBase) => frame.evaluate(async (css) => {
  if (!document.getElementById('vfont')) {
    const s = document.createElement('style'); s.id = 'vfont';
    s.textContent = css + '*,*::before,*::after{font-family:V,sans-serif!important;transition:none!important;animation:none!important;scroll-behavior:auto!important}';
    document.head.appendChild(s);
  }
  document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; });
  await document.fonts.ready;
  await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 2000); })));
}, fontFace(fontBase));

export const ease = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

// 휴대폰 틀 (CSS 390×696 을 1.8배)
export const PW = 390, PH = 696, K = 1.8;
export const phoneCss = `.phone { position: absolute; left: 50%; top: 430px; width: ${PW * K + 36}px; height: ${PH * K + 36}px; margin-left: -${(PW * K + 36) / 2}px;
  background: #111; border-radius: 70px; padding: 18px; box-shadow: 0 40px 90px rgba(0,0,0,.45); }
.screen { width: ${PW * K}px; height: ${PH * K}px; border-radius: 54px; overflow: hidden; background: #fff; }
iframe { width: ${PW}px; height: ${PH}px; border: 0; transform: scale(${K}); transform-origin: 0 0; }`;

// 프레임 jpg → mp4 (무음 트랙 포함, SNS 앱 호환)
export function encode(dir, fps, mp4) {
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', `${dir}/%04d.jpg`, '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo',
    '-shortest', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium', '-movflags', '+faststart', '-c:a', 'aac', mp4]);
  fs.rmSync(dir, { recursive: true, force: true });
  return `${mp4} ${(fs.statSync(mp4).size / 1e6).toFixed(1)}MB`;
}

export const load = (file) => { const w = { window: {} }; new Function('window', fs.readFileSync(file, 'utf8'))(w.window); return w.window; };
