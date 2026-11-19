// 가게 찾기 사이트(로컬 파일) 폰 화면 캡처
import { chromium, fileUrl } from '../../tools/pw.mjs';
import { resolve } from 'path';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, locale: 'ko-KR' });
const fails=[]; p.on('requestfailed', r => fails.push(r.url()));
await p.route(/^file:\/\/\/D:\/(?!qrmenu)/, async (r) => { const u = decodeURIComponent(new URL(r.request().url()).pathname).replace(/^\/D:\//, ''); await r.fulfill({ path: resolve('sales', u) }); });
await p.goto(fileUrl(resolve('sales/stores/index.html')) + '?lang=ko'); await p.waitForTimeout(1500);
await p.screenshot({ path: 'investor/deck/img/stores-ko.png' });
console.log('fails', fails.slice(0,5)); await b.close();
