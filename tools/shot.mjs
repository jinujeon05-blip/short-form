// 메뉴판 화면 캡처(휴대폰 크기, 전체 길이): node tools/shot.mjs <가게폴더명> [언어들, 기본 ko,vi] [저장폴더, 기본 /tmp]
// 오류·못 불러온 파일도 함께 출력한다.
import { chromium, ROOT } from './pw.mjs';
const [shop, langs = 'ko,vi', out = '/tmp'] = process.argv.slice(2);
if (!shop) { console.error('사용법: node tools/shot.mjs <가게폴더명> [ko,vi] [저장폴더]'); process.exit(1); }
const b = await chromium.launch();
for (const l of langs.split(',')) {
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('requestfailed', r => errs.push('fail ' + r.url()));
  await p.goto(`file://${ROOT}/restaurants/${shop}/index.html?lang=${l}`); await p.waitForTimeout(700);
  const path = `${out}/${shop}-${l}.png`;
  await p.screenshot({ path, fullPage: true });
  console.log(path, errs.length ? errs : '오류 없음');
}
await b.close();
