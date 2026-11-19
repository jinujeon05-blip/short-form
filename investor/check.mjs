// 제안서 넘침 검사: node investor/check.mjs investor/ko.html
import { chromium, fileUrl } from '../tools/pw.mjs';
import { resolve } from 'path';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 900, height: 1200 } });
await p.goto(fileUrl(resolve(process.argv[2]))); await p.waitForTimeout(800);
const r = await p.evaluate(() => {
  const mm = 96 / 25.4;
  return { broken: [...document.images].filter(i => !i.naturalWidth).map(i => i.src),
    pages: [...document.querySelectorAll('.page')].map((s, i) => {
      if (s.classList.contains('cover')) return null;
      const sr = s.getBoundingClientRect(); const src = s.querySelector('.src');
      const limit = src ? src.getBoundingClientRect().top - 2 : sr.bottom - 14 * mm;
      const kids = [...s.querySelectorAll('*')].filter(k => !k.closest('.src'));
      const bottom = Math.max(...kids.map(k => k.getBoundingClientRect().bottom));
      const free = Math.round((limit - bottom) / mm);
      return (i + 1) + ':' + free + 'mm';
    }).filter(Boolean) };
});
console.log(JSON.stringify(r));
await b.close();
