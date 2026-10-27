// HTML → PDF (점주용 가이드 등, 페이지 크기는 HTML의 @page 를 따름): node tools/pdf.mjs <입력.html> <출력.pdf>
import { chromium, fileUrl } from './pw.mjs';
import { resolve } from 'path';
const [inp, out] = process.argv.slice(2);
if (!inp || !out) { console.error('사용법: node tools/pdf.mjs <입력.html> <출력.pdf>'); process.exit(1); }
const b = await chromium.launch(); const p = await b.newPage(); const fails = [];
p.on('requestfailed', r => fails.push(r.url()));
await p.goto(`${fileUrl(resolve(inp))}`); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
console.log('완료', out, '| 못 불러온 파일:', fails); await b.close();
