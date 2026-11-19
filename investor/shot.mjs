// 쪽 모음 이미지: node investor/shot.mjs investor/ko.html out.png
import { chromium, fileUrl } from '../tools/pw.mjs';
import { resolve } from 'path';
const [inp, out] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1000, height: 1123 } });
await p.goto(fileUrl(resolve(inp))); await p.waitForTimeout(800);
await p.addStyleTag({ content: 'body{display:grid;grid-template-columns:repeat(6,210mm);gap:6mm;width:max-content;padding:6mm;} .page{margin:0!important}' });
await p.waitForTimeout(300);
await p.screenshot({ path: out, fullPage: true, scale: 'css' });
await b.close(); console.log('ok');
