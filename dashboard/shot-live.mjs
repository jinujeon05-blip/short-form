// 실제 주소(배포된 사이트)를 폰 크기로 캡처한다: node dashboard/shot-live.mjs <주소> <저장할 png>
// 대시보드가 배포 뒤 자동 마무리에서 쓴다(tools/shot.mjs 는 로컬 파일만 찍는다).
import { chromium } from '../tools/pw.mjs';
const [url, out] = process.argv.slice(2);
if (!/^https:\/\/[a-z0-9-]+\.qrmenuasia\.com\/?$/.test(url || '') || !out) {
  console.error('사용법: node dashboard/shot-live.mjs https://<가게>.qrmenuasia.com <저장할 png>');
  process.exit(1);
}
const b = await chromium.launch();
try {
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const res = await p.goto(url + (url.includes('?') ? '' : '?lang=ko'), { waitUntil: 'load', timeout: 60000 });
  if (!res || res.status() !== 200) throw new Error('응답 ' + (res ? res.status() : '없음'));
  await p.waitForTimeout(1200);
  await p.screenshot({ path: out, fullPage: true });
  console.log(out);
} catch (e) {
  console.error(String(e.message || e).slice(0, 200));
  process.exitCode = 1;
} finally {
  await b.close();
}
