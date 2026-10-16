// 소개서용 데모 화면: node tools/demo.mjs <가게폴더명> → sales/img/demo-<가게>.jpg (500×1013, 베트남어 휴대폰 기준)
import { chromium, ROOT } from './pw.mjs';
const shop = process.argv[2];
if (!shop) { console.error('사용법: node tools/demo.mjs <가게폴더명>'); process.exit(1); }
const b = await chromium.launch();
const ctx = await b.newContext({ locale: 'vi-VN', viewport: { width: 375, height: 760 }, deviceScaleFactor: 4 / 3 });
const p = await ctx.newPage(); await p.goto(`file://${ROOT}/restaurants/${shop}/index.html`); await p.waitForTimeout(800);
await p.screenshot({ path: `${ROOT}/sales/img/demo-${shop}.jpg`, type: 'jpeg', quality: 82 });
console.log('완료 sales/img/demo-' + shop + '.jpg');
await b.close();
