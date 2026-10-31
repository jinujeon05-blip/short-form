// 새 가게 메뉴판을 가마솥(restaurants/gamasot) 표준에서 복사해 만든다. 표준 설명은 docs/standard.md.
// 사용법: node tools/new-shop.mjs <가게id> <listing|full> <logo|sign>
//   listing = 가게 찾기용(장바구니·주문서 없음, 하단 줄에 '구글 지도' 문구), full = 정식(장바구니·주문서 포함)
//   logo = 맨 위에 img/logo.png(가게 로고), sign = 로고가 없어 img/sign.jpg(간판이 보이는 사진)
// 만든 뒤: index.html 의 색(:root, partner-theme)·UI 문구·h1, menu.js 를 가게 것으로 채우고 node tools/check-standard.mjs <가게id>.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [id, kind, top] = process.argv.slice(2);
if (!/^[a-z0-9]+$/.test(id || '') || !['listing', 'full'].includes(kind) || !['logo', 'sign'].includes(top)) {
  console.error('사용법: node tools/new-shop.mjs <가게id(영문 소문자)> <listing|full> <logo|sign>'); process.exit(1);
}
const STD = path.join(ROOT, 'restaurants/gamasot');
const dir = path.join(ROOT, 'restaurants', id);
if (fs.existsSync(dir)) { console.error(`이미 있음: restaurants/${id}`); process.exit(1); }
fs.mkdirSync(path.join(dir, 'img'), { recursive: true });

// 공용 파일은 _shared 원본에서 (가게 찾기용은 order.js 없음)
const shared = ['dasan.js', 'dasan-logo.png', 'dasan-logo-white.png', 'stores-link.js', 'lang-menu.js', 'qr-home.js', 'qr-mark.png'];
if (kind === 'full') shared.push('order.js');
for (const f of shared) fs.copyFileSync(path.join(ROOT, 'restaurants/_shared', f), path.join(dir, f));

// 윈도우 PC는 git이 CRLF로 내려받으므로 LF로 맞춘 뒤 바꾼다
let h = fs.readFileSync(path.join(STD, 'index.html'), 'utf8').replace(/\r\n/g, '\n');
const rep = (a, b) => { if (!h.includes(a)) throw new Error(`가마솥 index.html 에서 못 찾음: ${a}`); h = h.split(a).join(b); };
// seo 블록은 tools/seo.mjs 가 다시 만든다
h = h.replace(/<!-- seo:start[\s\S]*?<!-- seo:end -->\n?/, '');
rep('shop=gamasot', `shop=${id}`);
rep('encodeURIComponent("Gamasot " + R.address)', 'encodeURIComponent(R.brand.en + " " + R.address)');
rep('<img class="logo" src="img/logo.png" alt="" width="600" height="355">',
  top === 'logo' ? '<img class="logo" src="img/logo.png" alt="">' : '<img class="logo sign" src="img/sign.jpg" alt="">');
if (top === 'sign') rep('  h1 {', '  .logo.sign { width: 100%; max-width: 440px; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 14px; margin-top: 18px; }\n  h1 {');
if (kind === 'listing') {
  rep('<script src="order.js"></script>\n', '');
  // 하단 '가격 단위' 줄 끝 출처 문구 (5개 언어, CLAUDE.md 가게 찾기용 규칙)
  const SRC = {
    '가격 단위: 베트남 동(VND)': '가격 단위: 베트남 동(VND) · 메뉴·가격은 구글 지도에 올린 메뉴판 기준이며 바뀔 수 있어요',
    'Prices in Vietnamese đồng (VND)': 'Prices in Vietnamese đồng (VND) · Menu and prices are based on the menu posted on Google Maps and may change',
    '价格单位：越南盾（VND）': '价格单位：越南盾（VND）· 菜单和价格以谷歌地图上发布的菜单为准，可能会有变动',
    '価格はベトナムドン（VND）です': '価格はベトナムドン（VND）です・メニューと価格はGoogleマップに掲載されたメニュー表に基づいており、変更される場合があります',
    'Giá tính bằng VND': 'Giá tính bằng VND · Thực đơn và giá theo menu đăng trên Google Maps, có thể thay đổi',
  };
  for (const [a, b] of Object.entries(SRC)) rep(`vnd: "${a}"`, `vnd: "${b}"`);
}
// 영업시간 칸 (사용자 지시 2026-10-28: 새 가게는 항상). 전화 칸 위에 같은 모양, menu.js 의 RESTAURANT.hours 가 있으면 보인다
rep('      <a class="pill" id="call">', `      <div class="pill" id="hours" hidden>
        <i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg></i>
        <div><small id="hoursLabel"></small><strong id="hoursText"></strong></div>
      </div>
      <a class="pill" id="call">`);
const HOURS = { '비밀번호를 복사했어요': '영업시간', 'Password copied': 'Opening hours', '密码已复制': '营业时间', 'パスワードをコピーしました': '営業時間', 'Đã sao chép mật khẩu': 'Giờ mở cửa' };
for (const [a, b] of Object.entries(HOURS)) rep(`copied: "${a}", call:`, `copied: "${a}", hours: "${b}", call:`);
rep('    $("callLabel").textContent = t.call;', `    if (R.hours) {
      $("hours").hidden = false;
      $("hoursLabel").textContent = t.hours;
      $("hoursText").textContent = typeof R.hours === "string" ? R.hours : R.hours[lang];
    }
    $("callLabel").textContent = t.call;`);
// 글꼴 통일 (사용자 지시 2026-10-24): 가마솥의 Georgia(분류 제목 아래·둘째 언어 이름)를 빼고 본문 글꼴 하나만
rep('font-family: Georgia, "Times New Roman", serif; ', '');
fs.writeFileSync(path.join(dir, 'index.html'), h);

// menu.js 뼈대 (가마솥과 같은 형식)
fs.writeFileSync(path.join(dir, 'menu.js'), `// TODO 가게 이름 메뉴 데이터 — 출처(메뉴판 사진·날짜)를 적는다
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만 — 정사각형이면 양옆 흰 여백)
// 메뉴판 사진끼리 가격이 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "TODO", en: "TODO" },
  phone: "TODO",
  address: "TODO",
  wifi: null,
  hours: "TODO", // store_info.json 의 hours. 시간만이면 "11:00 – 22:00", 쉬는 날 등 글이 있으면 { ko, en, zh, ja, vi }
};
${kind === 'full' ? '\n// 장바구니·주문서 (_shared/order.js). staff = 주문서 언어, zalo = 주문 받을 Zalo 번호\nwindow.ORDER = { staff: "vi", currency: "₫", zalo: null };\n' : ''}
window.MENU = [
  {
    id: "main",
    name: { ko: "TODO", en: "TODO", zh: "TODO", ja: "TODO", vi: "TODO" },
    items: [
      { name: { ko: "TODO", en: "TODO", zh: "TODO", ja: "TODO", vi: "TODO" }, price: 0, photo: "img/TODO.jpg" },
    ],
  },
];
`);
console.log(`restaurants/${id} 만듦 (가마솥 표준, ${kind === 'listing' ? '가게 찾기용' : '정식'}, 맨 위 ${top === 'logo' ? '로고 img/logo.png' : '간판 사진 img/sign.jpg'})`);
console.log('다음: 색·문구·h1·menu.js 채우기 → 등록(sync-*.sh·seo.mjs·export.sh·data.js) → node tools/check-standard.mjs ' + id);
