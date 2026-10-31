// ① 자체 방문 집계 신호(sendBeacon) ② 점주가 고친 메뉴 불러오기(menu.js 바로 뒤, 가게 메뉴판만)를 모든 메뉴판·소개서·가게 찾기 페이지에 넣는다 (여러 번 돌려도 같은 결과).
// 사용법: node tools/analytics.mjs      ※ 새 가게를 만들면 한 번 돌린다.
// 신호는 https://qrmenuasia.com/api/hit (sales/api/hit.js) 로 간다 → 집계는 https://qrmenuasia.com/admin
// - 내 방문 제외: 주소 끝에 ?notrack 을 붙여 한 번 열면 그 브라우저·그 주소에서는 기록하지 않는다. 다시 기록하려면 ?track
// - 로봇(검색엔진 등)은 서버에서 걸러낸다. 개인정보는 저장하지 않는다(방문자는 날짜·소금을 섞은 해시값).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SNIPPET = `<!-- analytics:start (tools/analytics.mjs 가 만듦, 직접 고치지 말 것) -->
<script>(function(){var q=new URLSearchParams(location.search),ig=0;try{var s=localStorage;if(q.has('notrack'))s.setItem('qm_ignore','1');if(q.has('track'))s.removeItem('qm_ignore');ig=s.getItem('qm_ignore')}catch(e){}if(ig)return;try{navigator.sendBeacon('https://qrmenuasia.com/api/hit',JSON.stringify({h:location.hostname,p:location.pathname,l:document.documentElement.lang,s:q.get('utm_source')||'',r:document.referrer,w:screen.width}))}catch(e){}})()</script>
<!-- analytics:end -->
`;


// 점주·관리자가 고친 메뉴가 있으면 손님 화면이 menu.js 바로 뒤에서 /api/override 를 불러 window.MENU 를 바꿔 끼운다 (없으면 아무 일도 안 함)
const overrideBlock = (shop) => `<!-- override:start (tools/analytics.mjs 가 만듦, 직접 고치지 말 것) -->
<script src="https://qrmenuasia.com/api/override?shop=${shop}"></script>
<!-- override:end -->
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
  // 윈도우 PC는 CRLF로 내려받으므로 LF로 맞춘다(안 맞추면 기존 블록을 못 찾아 두 번 붙는다)
  let s = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
  const re = /<!-- analytics:start[\s\S]*?<!-- analytics:end -->\n/;
  if (re.test(s)) s = s.replace(re, () => SNIPPET);
  else if (s.includes('</body>')) s = s.replace('</body>', () => SNIPPET + '</body>');
  else { console.log('</body> 없음:', f); continue; }
  const shop = (f.match(/restaurants\/([a-z0-9]+)\/index\.html$/) || [])[1];
  if (shop) {
    const reO = /<!-- override:start[\s\S]*?<!-- override:end -->\n/;
    const tag = '<script src="menu.js"></script>\n';
    if (reO.test(s)) s = s.replace(reO, () => overrideBlock(shop));
    else if (s.includes(tag)) s = s.replace(tag, () => tag + overrideBlock(shop));
    else console.log('menu.js 태그 없음:', f);
  }
  // 내용이 같으면 쓰지 않는다(안 바뀐 가게 파일까지 수정됨으로 잡히던 문제, 2026-10-30)
  if (fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n') === s) continue;
  fs.writeFileSync(f, s);
  n++;
}
console.log(`${n}개 페이지에 방문 기록 코드 반영(나머지는 이미 최신)`);
