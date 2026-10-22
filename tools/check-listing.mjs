// 가게 찾기용(sales/stores/data.js 의 listing: true) 메뉴판 점검 — 새 가게를 만들거나 고친 뒤, 배포 전에 항상 돌린다.
// 사용법: node tools/check-listing.mjs   (문제가 있으면 목록을 보여 주고 종료 코드 1)
// 검사: ① 하단 "가격 단위" 줄(index.html 의 UI.<언어>.vnd, 5개 언어 모두)에 '구글 지도' 출처 문구가 있는가
//       ② 왼쪽 위 QR MENU 로고 링크(qr-home.js)가 있는가 ③ 맨 아래 별도 문구 상자(disclaimer 등)를 만들지 않았는가 ④ 다산 배너·가게 더 보기·방문 기록 코드가 들어 있는가
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'sales/stores/data.js'), 'utf8'), sandbox);
const shops = sandbox.window.STORES.filter((s) => s.listing).map((s) => s.id);
const SRC = [/구글 지도/, /Google Maps/, /谷歌地图|谷歌/, /Googleマップ/, /Google Maps/]; // ko en zh ja vi
const bad = [];
for (const id of shops) {
  const f = path.join(ROOT, 'restaurants', id, 'index.html');
  if (!fs.existsSync(f)) { bad.push(`${id}: index.html 없음`); continue; }
  const t = fs.readFileSync(f, 'utf8');
  const vnd = [...t.matchAll(/vnd: "([^"]*)"/g)].map((m) => m[1]);
  if (vnd.length !== 5) bad.push(`${id}: 하단 '가격 단위' 줄(vnd)이 5개 언어가 아님(${vnd.length}개)`);
  else vnd.forEach((v, i) => { if (!SRC[i].test(v)) bad.push(`${id}: ${['ko', 'en', 'zh', 'ja', 'vi'][i]} 하단 줄에 '구글 지도에 올린 메뉴판 기준' 문구가 없음`); });
  if (/disclaimer|notice/i.test(t.replace(/<!--[\s\S]*?-->/g, '').replace(/class="note"|\.note\b|cat\.note|\.note /g, ''))) bad.push(`${id}: 별도 문구 상자로 보이는 코드가 있음(문구는 '가격 단위' 줄 끝에만)`);
  for (const [k, what] of [['dasan.js', '다산 배너'], ['stores-link.js', '가게 더 보기 링크'], ['api/hit', '방문 기록 코드'], ['api/override', '점주 편집 반영 스크립트'], ['qr-home.js', '왼쪽 위 QR MENU 로고(가게 찾기 링크)']]) if (!t.includes(k)) bad.push(`${id}: ${what}(${k}) 없음`);
}
console.log(`가게 찾기용 ${shops.length}곳 점검`);
if (bad.length) { console.log('문제:\n- ' + bad.join('\n- ')); process.exit(1); }
console.log('문제 없음');
