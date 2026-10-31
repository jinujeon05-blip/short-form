import { fileURLToPath, pathToFileURL } from 'node:url';
// Playwright 불러오기 (클라우드 환경은 전역 설치본, 아니면 일반 import)
let pw;
try { pw = await import('/opt/node22/lib/node_modules/playwright/index.mjs'); }
catch { pw = await import('playwright'); }
export const { chromium } = pw;
// 윈도우 PC(D:\qrmenu)에서도 맞는 경로가 나오게 fileURLToPath·pathToFileURL을 쓴다
export const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/[\\/]$/, '');
export const fileUrl = (p) => pathToFileURL(p).href;

// 가게 화면은 파일 주소(file://)가 아니라 작은 로컬 서버로 연다 — 파일 주소로 열면 브라우저가
// CSS 마스크 그림(QR MENU 버튼의 qr-mark.png)을 막아 캡처에서 아이콘이 빠지고 '불러오기 실패'가 났다(2026-10-30).
// 사용: const site = await serve(); await page.goto(`${site.url}/restaurants/<가게>/index.html`); ... site.close();
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.otf': 'font/otf', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };
export async function serve(root = ROOT) {
  const server = http.createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.join(root, p);
    if (!f.startsWith(root)) { res.writeHead(403).end(); return; }
    try { const body = await readFile(f); res.writeHead(200, { 'Content-Type': TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream' }).end(body); }
    catch { res.writeHead(404).end(); }
  });
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}
