// 테이블 QR 카드 출력: node tools/card.mjs <가게폴더명>
// restaurants/<가게>/print/table-card.html → table-card.png(300dpi), table-card-A6.pdf
// table-card-A4.html 이 있으면 → table-card-A4x4.pdf
import { chromium, ROOT } from './pw.mjs';
import { existsSync } from 'fs';
const shop = process.argv[2];
if (!shop) { console.error('사용법: node tools/card.mjs <가게폴더명>'); process.exit(1); }
const dir = `${ROOT}/restaurants/${shop}/print`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 397, height: 560 }, deviceScaleFactor: 300 / 96 });
const fails = []; p.on('requestfailed', r => fails.push(r.url()));
await p.goto(`file://${dir}/table-card.html`);
await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
const over = await p.evaluate(() => { const c = document.querySelector('.card').getBoundingClientRect();
  return [...document.querySelectorAll('.card *')].filter(e => { const r = e.getBoundingClientRect(); return r.right > c.right + .5 || r.left < c.left - .5; }).map(e => e.className || e.tagName); });
await p.locator('.card').screenshot({ path: `${dir}/table-card.png` });
await p.pdf({ path: `${dir}/table-card-A6.pdf`, width: '105mm', height: '148mm', printBackground: true });
if (existsSync(`${dir}/table-card-A4.html`)) {
  const a = await b.newPage(); await a.goto(`file://${dir}/table-card-A4.html`, { waitUntil: 'load' }); await a.waitForTimeout(800);
  await a.pdf({ path: `${dir}/table-card-A4x4.pdf`, format: 'A4', printBackground: true });
}
console.log('완료', dir, '| 카드 밖으로 삐져나간 요소:', over, '| 못 불러온 파일:', fails);
await b.close();
