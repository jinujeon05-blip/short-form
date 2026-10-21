// 자체 방문 집계 신호(sendBeacon)를 모든 메뉴판·소개서·가게 찾기 페이지에 넣는다 (여러 번 돌려도 같은 결과).
// 사용법: node tools/analytics.mjs      ※ 새 가게를 만들면 한 번 돌린다.
// 신호는 https://qrmenuasia.com/api/hit (sales/api/hit.js) 로 간다 → 집계는 https://qrmenuasia.com/admin
// - 내 방문 제외: 주소 끝에 ?notrack 을 붙여 한 번 열면 그 브라우저·그 주소에서는 기록하지 않는다. 다시 기록하려면 ?track
// - 로봇(검색엔진 등)은 서버에서 걸러낸다. 개인정보는 저장하지 않는다(방문자는 날짜·소금을 섞은 해시값).
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SNIPPET = `<!-- analytics:start (tools/analytics.mjs 가 만듦, 직접 고치지 말 것) -->
<script>(function(){var q=new URLSearchParams(location.search),ig=0;try{var s=localStorage;if(q.has('notrack'))s.setItem('qm_ignore','1');if(q.has('track'))s.removeItem('qm_ignore');ig=s.getItem('qm_ignore')}catch(e){}if(ig)return;try{navigator.sendBeacon('https://qrmenuasia.com/api/hit',JSON.stringify({h:location.hostname,p:location.pathname,l:document.documentElement.lang,s:q.get('utm_source')||'',r:document.referrer,w:screen.width}))}catch(e){}})()</script>
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
