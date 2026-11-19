// HTML 슬라이드 → 장마다 PNG + 넘침 검사: node investor/deck/shots.mjs ko
import { chromium, fileUrl } from '../../tools/pw.mjs';
import { resolve } from 'path';
const lang = process.argv[2] || 'ko';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
const fails = []; p.on('requestfailed', r => fails.push(r.url()));
await p.goto(fileUrl(resolve(`investor/deck/out/deck_${lang}.html`))); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
// 글자 상자 안 내용이 상자보다 크면 보고
const over = await p.evaluate(() => [...document.querySelectorAll('.s')].flatMap((s, i) => [...s.querySelectorAll('.x')].filter(x => { const sp = x.firstElementChild; return sp.scrollHeight > x.clientHeight + 2 || sp.scrollWidth > x.clientWidth + 2; }).map(x => (i + 1) + ':' + x.innerText.slice(0, 24).replace(/\n/g, ' ') + ' [' + x.firstElementChild.scrollHeight + '>' + x.clientHeight + ']')));
console.log('넘침', JSON.stringify(over)); console.log('못 불러옴', fails.length);
const ss = await p.$$('.s'); let i = 0;
for (const s of ss) { i++; await s.screenshot({ path: `investor/deck/out/${lang}-${String(i).padStart(2, '0')}.png` }); }
await b.close();
