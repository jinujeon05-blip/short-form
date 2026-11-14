// 테이블 QR 카드 출력: node tools/card.mjs <가게폴더명>
// restaurants/<가게>/print/table-card.html → table-card.png(300dpi), table-card-A6.pdf
// table-card-A4.html 이 있으면 → table-card-A4x4.pdf
// --design <id>: tools/promo-designs.mjs 의 디자인 틀(photo·neon·collage·chalk·minimal)로 table-card.html 을 새로 쓴 뒤 출력한다.
//   손으로 만든 카드(designer 담당 등)를 덮어쓰지 않게, 틀로 만든 카드·대시보드 기본 카드가 아니면 --force 가 있어야 한다.
//   쓴 디자인은 print/promo.json 에 남는다. --design 을 안 주면 예전처럼 있는 table-card.html 을 그대로 출력.
import { chromium, ROOT, fileUrl } from './pw.mjs';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { spawnSync } from 'child_process';
import { DESIGNS, loadShop, cardHtml, recordDesign } from './promo-designs.mjs';
const argv = process.argv.slice(2);
const force = argv.includes('--force'); if (force) argv.splice(argv.indexOf('--force'), 1);
const di = argv.indexOf('--design');
const design = di >= 0 ? argv.splice(di, 2)[1] : '';
const shop = argv[0];
if (!shop) { console.error('사용법: node tools/card.mjs <가게폴더명> [--design photo|neon|collage|chalk|minimal] [--force]'); process.exit(1); }
const dir = `${ROOT}/restaurants/${shop}/print`;
if (design && design !== 'basic') {
  if (!DESIGNS[design]) { console.error(`모르는 디자인 ${design} — ${Object.keys(DESIGNS).join('·')}`); process.exit(1); }
  const f = `${dir}/table-card.html`;
  const old = existsSync(f) ? readFileSync(f, 'utf8') : '';
  if (old && !force && !/tools\/card\.mjs --design|'가게 만들기'가 이 가게 색으로 만든 기본 카드/.test(old)) { console.error(`${shop} 의 table-card.html 은 손으로 만든 카드예요. 덮어쓰려면 --force`); process.exit(1); }
  const D = loadShop(shop, {});
  if (D.photos.length < DESIGNS[design].photos) { console.error(`${design} 디자인은 음식 사진(가로 400px 이상)이 ${DESIGNS[design].photos}장 이상 필요해요 — ${shop} 은 ${D.photos.length}장`); process.exit(1); }
  if (!existsSync(`${dir}/qr.svg`)) { console.error('print/qr.svg 가 없습니다. 먼저 tools/qr.cjs 로 만드세요'); process.exit(1); }
  mkdirSync(dir, { recursive: true });
  writeFileSync(f, cardHtml(design, D));
  recordDesign(shop, 'card', design);
} else if (design === 'basic' && existsSync(`${dir}/promo.json`)) recordDesign(shop, 'card', 'basic');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 397, height: 560 }, deviceScaleFactor: 300 / 96 });
const fails = []; p.on('requestfailed', r => fails.push(r.url()));
await p.goto(`${fileUrl(dir)}/table-card.html`);
await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
const over = await p.evaluate(() => { const c = document.querySelector('.card').getBoundingClientRect();
  return [...document.querySelectorAll('.card *')].filter(e => { if (e.closest('svg') && e.tagName !== 'svg') return false; const r = e.getBoundingClientRect(); return r.width && (r.right > c.right + .5 || r.left < c.left - .5 || r.bottom > c.bottom + .5); }).map(e => (e.className?.baseVal ?? e.className) || e.tagName); });
const cut = await p.evaluate(() => [...document.querySelectorAll('[data-fit]')].filter((e) => { const c = (e.firstElementChild || e).getBoundingClientRect(), b = e.getBoundingClientRect(); return c.width > b.width + 2 || c.height > b.height + 2; }).map((e) => e.className));
await p.locator('.card').screenshot({ path: `${dir}/table-card.png` });
await p.pdf({ path: `${dir}/table-card-A6.pdf`, width: '105mm', height: '148mm', printBackground: true });
if (existsSync(`${dir}/table-card-A4.html`)) {
  const a = await b.newPage(); await a.goto(`${fileUrl(dir)}/table-card-A4.html`, { waitUntil: 'load' }); await a.waitForTimeout(800);
  await a.pdf({ path: `${dir}/table-card-A4x4.pdf`, format: 'A4', printBackground: true });
}
console.log('완료', dir, design ? `| 디자인 ${design}` : '', '| 카드 밖으로 삐져나간 요소:', over, '| 못 불러온 파일:', fails, cut.length ? `| 글자 잘림: ${cut}` : '');
await b.close();
if (design && design !== 'basic') {
  const qc = spawnSync('python', [`${ROOT}/tools/qr-img-check.py`, `https://${shop}.qrmenuasia.com`, `${dir}/table-card.png`], { encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' } });
  console.log((qc.stdout || qc.stderr || 'QR 그림 확인 못 함(python 없음)').trim());
  if (qc.status === 1) process.exitCode = 1;
}
