// 소개서·가게 찾기(qrmenuasia.com) 웹앱 아이콘: node tools/app-icon.mjs
// 페이지 위쪽 "QR" 로고(주황 그라데이션 #e0452b → #f2a03d)를 그대로 키워 sales/icons/ 에 PNG로 만든다.
import { chromium, ROOT } from './pw.mjs';
const out = `${ROOT}/sales/icons`;
// pad: 가장자리 여백 비율 (maskable 은 안드로이드가 원/물방울로 잘라도 글자가 남도록 넉넉히), round: 모서리
const svg = (pad, round, menu = true) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0452b"/><stop offset="1" stop-color="#f2a03d"/></linearGradient></defs>
  <rect width="512" height="512" rx="${round}" fill="url(#g)"/>
  <g transform="translate(256 256) scale(${1 - pad * 2}) translate(-256 -256)">
    ${menu ? '' : '<g transform="translate(0 50)">'}<text x="256" y="300" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="220" fill="#fff" letter-spacing="-6">QR</text>${menu ? '' : '</g>'}
    ${menu ? '<text x="263" y="390" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="62" fill="#fff" fill-opacity=".92" letter-spacing="14">MENU</text>' : ''}
  </g>
</svg>`;
const ICONS = [
  ['icon-512.png', 512, svg(0.04, 112)], ['icon-192.png', 192, svg(0.04, 112)],
  ['icon-maskable-512.png', 512, svg(0.14, 0)], ['apple-touch-icon.png', 180, svg(0.06, 0)],
  ['favicon-32.png', 32, svg(-0.08, 112, false)],
];
const b = await chromium.launch();
for (const [name, size, s] of ICONS) {
  const p = await b.newPage({ viewport: { width: size, height: size } });
  await p.setContent(`<html><body style="margin:0;background:transparent">${s.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
  await p.screenshot({ path: `${out}/${name}`, omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  await p.close();
}
await b.close();
console.log('완료', out, ICONS.map((i) => i[0]).join(', '));
