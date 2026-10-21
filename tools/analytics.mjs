// Vercel Web Analytics 방문 기록 코드를 모든 메뉴판·소개서·가게 찾기 페이지에 넣는다 (여러 번 돌려도 같은 결과).
// 사용법: node tools/analytics.mjs
// ※ 먼저 Vercel 대시보드 → 해당 프로젝트 → Analytics 탭 → Enable 을 눌러야 기록이 시작된다.
//   켠 뒤에 "다시 배포"해야 /_vercel/insights/script.js 가 열린다. (켜기 전에 넣어 둬도 해롭지 않음 — 404 만 난다)
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SNIPPET = `<!-- analytics:start (tools/analytics.mjs 가 만듦, 직접 고치지 말 것) -->
<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
<script defer src="/_vercel/insights/script.js"></script>
<!-- analytics:end -->
`;

const files = [];
for (const d of fs.readdirSync(path.join(root, 'restaurants'))) {
  if (d.startsWith('_')) continue;
  const f = path.join(root, 'restaurants', d, 'index.html');
  if (fs.existsSync(f)) files.push(f);
}
files.push(path.join(root, 'sales/index.html'), path.join(root, 'sales/stores/index.html'));

let n = 0;
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  const re = /<!-- analytics:start[\s\S]*?<!-- analytics:end -->\n/;
  if (re.test(s)) s = s.replace(re, () => SNIPPET);
  else if (s.includes('</body>')) s = s.replace('</body>', () => SNIPPET + '</body>');
  else { console.log('</body> 없음:', f); continue; }
  fs.writeFileSync(f, s);
  n++;
}
console.log(`${n}개 페이지에 방문 기록 코드 반영`);
