// 소개서 인쇄용 PDF 5개 언어: node tools/sales-pdf.mjs → sales/print/intro-<언어>.pdf (반드시 A4 2쪽이어야 함)
import { chromium, ROOT } from './pw.mjs';
import { execSync } from 'child_process';
const dir = `${ROOT}/sales`;
const b = await chromium.launch();
for (const l of ['ko', 'vi', 'zh', 'ja', 'en']) {
  const p = await b.newPage({ viewport: { width: 900, height: 1200 } });
  await p.goto(`file://${dir}/index.html?lang=${l}`); await p.waitForTimeout(500);
  const f = `${dir}/print/intro-${l}.pdf`;
  await p.pdf({ path: f, format: 'A4', printBackground: true, margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' } });
  let pages = '?'; try { pages = execSync(`pdfinfo ${f}`).toString().match(/Pages:\s+(\d+)/)[1]; } catch {}
  console.log(l, pages + '쪽', pages === '2' ? '' : '← 2쪽이 아님! 인쇄용 CSS(@media print)를 줄여야 함');
}
await b.close();
