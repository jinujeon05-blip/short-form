// 포장재 시안 그림: node tools/mockup.mjs <가게폴더명>
// restaurants/<가게>/print/packaging-mockup.html → packaging-mockup.png (2000×1250)
import { chromium, ROOT } from './pw.mjs';
const shop = process.argv[2];
if (!shop) { console.error('사용법: node tools/mockup.mjs <가게폴더명>'); process.exit(1); }
const dir = `${ROOT}/restaurants/${shop}/print`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 2000, height: 1250 } });
const fails = []; p.on('requestfailed', r => fails.push(r.url()));
await p.goto(`file://${dir}/packaging-mockup.html`);
await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
await p.locator('.stage').screenshot({ path: `${dir}/packaging-mockup.png` });
console.log('완료', `${dir}/packaging-mockup.png`, '| 못 불러온 파일:', fails);
await b.close();
