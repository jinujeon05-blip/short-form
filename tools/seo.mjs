// 검색 등록용 준비: node tools/seo.mjs
// 가게마다 index.html <head> 에 대표 주소(canonical)·링크 미리보기(og)·가게 정보 구조화 데이터(JSON-LD)를 넣고
// robots.txt·sitemap.xml 을 만든다. 소개서(sales/)에는 전체 사이트맵(qrmenuasia.com/sitemap.xml)을 만든다.
// 메뉴·가격·주소를 고친 뒤 다시 돌리면 <!-- seo:start --> ~ <!-- seo:end --> 부분만 새로 바뀐다.
import { readFileSync, writeFileSync, existsSync } from 'fs';
import vm from 'vm';
import { ROOT } from './pw.mjs';

const DOMAIN = 'qrmenuasia.com';
// naver: 네이버 서치어드바이저 소유 확인 코드(가게 주소를 네이버에 따로 등록한 경우), type: schema.org 종류, cuisine: 요리 종류, country: 나라, currency: 가격 단위, phone: false 면 전화번호 생략(임시 번호)
const SHOPS = {
  sutkkui:    { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ'], country: 'VN', currency: 'VND', naver: 'ca47ee18fdb77a8f2f443cb5831aaf7908723830' },
  eros:       { type: 'BarOrPub', cuisine: ['Bar'], country: 'VN', currency: 'VND', phone: false },
  anvoi:      { type: 'Restaurant', cuisine: ['Vietnamese', 'Noodles'], country: 'VN', currency: 'VND', naver: 'c8c35a8918759c057be5313955e2ea9c92fdc072' },
  baekcheon:  { type: 'Restaurant', cuisine: ['Korean', 'Grilled eel'], country: 'KR', currency: 'KRW', naver: 'b33f476ad38d2aafc7ea74651de94e5a2262361e' },
  gamasot:    { type: 'Restaurant', cuisine: ['Korean'], country: 'VN', currency: 'VND', naver: '6d64ac159210cc85e66a84a64ce28822bab7c395' },
  biobeauty:  { type: 'Store', country: 'VN', currency: 'VND' },
  suwonseong: { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Korean-Chinese'], country: 'VN', currency: 'VND' },
  // 가게 찾기용(사장님 동의 없음) — SNS 이미지가 없어서 미리보기 사진은 가게 사진
  hellochicken: { type: 'Restaurant', cuisine: ['Korean', 'Korean fried chicken', 'Pocha'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  kyodong:      { type: 'Restaurant', cuisine: ['Korean', 'Korean fried chicken'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  choongman:    { type: 'Restaurant', cuisine: ['Korean', 'Korean fried chicken'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  youone:       { type: 'Restaurant', cuisine: ['Korean', 'Korean corn dog', 'Street food'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  kimshotel:    { type: 'Hotel', cuisine: ['Korean'], country: 'VN', currency: 'VND' },
  jokbal:       { type: 'Restaurant', cuisine: ['Korean', 'Jokbal', 'Bossam'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  daekuk:       { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Shabu-shabu'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  boknara:      { type: 'Restaurant', cuisine: ['Korean', 'Pufferfish', 'Sashimi'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  dada:         { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Stews', 'Chicken'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  sopung:       { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Charcoal grill', 'Bossam'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  buja:         { type: 'Restaurant', cuisine: ['Korean', 'Gamjatang', 'Korean BBQ', 'Haejangguk'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  soban:        { type: 'Restaurant', cuisine: ['Korean', 'Oxtail', 'Gomtang'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  donggoone:    { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Grilled eel', 'Hagfish'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  jangolang:    { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Grilled eel', 'Hot pot'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  anjirang:     { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Gopchang', 'Makchang', 'Fried chicken'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  madang:       { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Duck', 'Seafood'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  jangsucheon:  { type: 'Restaurant', cuisine: ['Korean', 'Grilled eel', 'Korean BBQ', 'Beef'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  bomunttl:     { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Beef', 'Pork', 'Naengmyeon'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  geumdwaeji:   { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Pork belly', 'Stews'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  ottugi:       { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Pork belly', 'Yukhoe', 'Stews'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  yeha:         { type: 'Restaurant', cuisine: ['Cafe', 'Dessert', 'Waffle', 'Bingsu', 'Pasta', 'Korean snacks'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  kkongsi:      { type: 'Restaurant', cuisine: ['Korean-Chinese', 'Chinese', 'Korean', 'Noodles', 'Course meals'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  jeonbotdae:   { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Beef', 'Pork belly', 'Gamjatang'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  miz:          { type: 'Restaurant', cuisine: ['Japanese', 'Sushi', 'Sashimi', 'Tuna', 'Course meals'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  mannyang:     { type: 'Restaurant', cuisine: ['Korean', 'Pocha', 'Korean bar food', 'Soups', 'Fried dishes'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  cheonan:      { type: 'HealthAndBeautyBusiness', noMenu: true, country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  seonsan:      { type: 'Restaurant', cuisine: ['Korean', 'Gopchang', 'Korean BBQ', 'Pork stew'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  jamaedang:    { type: 'Restaurant', cuisine: ['Korean', 'Korean course', 'Seafood', 'Skate', 'Korean BBQ'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  studioan:     { type: 'LocalBusiness', noMenu: true, country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  cheong:       { type: 'Restaurant', cuisine: ['Korean-Chinese', 'Chinese', 'Korean', 'Noodles'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  joseon:       { type: 'Restaurant', cuisine: ['Korean', 'Gamjatang', 'Braised pork neck bones', 'Set menus'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  namme:        { type: 'Restaurant', cuisine: ['Korean', 'Sulsang', 'Kimchi jjim', 'Osam bulgogi', 'Gamjatang'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  inyeon:       { type: 'Restaurant', cuisine: ['Korean', 'Jokbal', 'Pork feet', 'Bossam', 'Korean BBQ'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  naegohyang:   { type: 'Restaurant', cuisine: ['Korean', 'Soondae-guk', 'Pork soup'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  yukdeok:      { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Aged pork', 'Smoked duck'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  sujeong:      { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Beef offal', 'Gopchang'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  kkotdwaeji:   { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Pork belly', 'Stews'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  badasho:      { type: 'Restaurant', cuisine: ['Korean', 'Seafood', 'Sashimi'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  donamdong:    { type: 'Restaurant', cuisine: ['Korean', 'Korean stew', 'Pancakes', 'Bar snacks'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  mujigae:      { type: 'Restaurant', cuisine: ['Korean', 'Korean street food', 'Sushi', 'Snacks'], country: 'VN', currency: 'VND', og: 'img/hero.jpg' },
  haru:         { type: 'Restaurant', cuisine: ['Japanese', 'Izakaya', 'Omakase', 'Sushi'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  phothin:      { type: 'Restaurant', cuisine: ['Vietnamese', 'Pho', 'Noodles'], country: 'VN', currency: 'VND' },
  chibaengi:    { type: 'Restaurant', cuisine: ['Korean', 'Korean Fried Chicken', 'Pub'], country: 'VN', currency: 'VND', naver: '75034e35cb9a0796e18c8813a4247a29e24b28ec' },
  samwon:       { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  bangatgan:    { type: 'Restaurant', cuisine: ['Korean', 'Korean Pub', 'Pocha'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  chuam:        { type: 'Restaurant', cuisine: ['Korean', 'Korean Herbal Cuisine', 'Seafood'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  eonnine:      { type: 'Restaurant', cuisine: ['Korean', 'Noodles', 'Gimbap'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  ureong:       { type: 'Restaurant', cuisine: ['Korean', 'Ssambap', 'Bibimbap'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  goodday:      { type: 'Restaurant', cuisine: ['Korean', 'Gimbap', 'Korean street food'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  lacherie:     { type: 'CafeOrCoffeeShop', cuisine: ['Coffee', 'Vietnamese coffee', 'Bingsu'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  snackshack:   { type: 'BarOrPub', cuisine: ['American', 'Burgers', 'Mexican', 'Craft beer'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  holoi:        { type: 'Restaurant', cuisine: ['Vietnamese', 'Pho', 'Beef noodle soup'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  ijang:        { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Charcoal grill'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  baba:         { type: 'BarOrPub', cuisine: ['Korean', 'Korean pub', 'Pizza', 'Cocktails', 'Craft beer'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
  orimyeongga:  { type: 'Restaurant', cuisine: ['Korean', 'Duck', 'Gamjatang', 'Bossam'], country: 'VN', currency: 'VND', og: 'img/store.jpg' },
};

const today = new Date().toISOString().slice(0, 10);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nm = (o, l) => (o == null ? '' : typeof o === 'string' ? o : o[l] || o.en || o.ko || o.vi || '');
const uniq = (a) => [...new Set(a.filter(Boolean))];

function priceOf(it) {
  if (typeof it.price === 'number') return it.price;
  if (it.sizes) return it.sizes[0][1];
  if (it.prices) return it.prices[0];
  return null;
}

function block(lines) { return `<!-- seo:start (tools/seo.mjs 가 만듦, 직접 고치지 말 것) -->\n${lines.join('\n')}\n<!-- seo:end -->`; }

function inject(file, html) {
  let s = readFileSync(file, 'utf8');
  s = s.replace(/\n?<!-- seo:start[\s\S]*?<!-- seo:end -->/, '');
  s = s.replace('</head>', `${html}\n</head>`);
  writeFileSync(file, s);
}

const shopUrls = [];
for (const [shop, cfg] of Object.entries(SHOPS)) {
  const dir = `${ROOT}/restaurants/${shop}`;
  const ctx = { window: {} };
  vm.runInNewContext(readFileSync(`${dir}/menu.js`, 'utf8'), ctx);
  const R = ctx.window.RESTAURANT, MENU = ctx.window.MENU || [];
  const url = `https://${shop}.${DOMAIN}/`;
  shopUrls.push(url);
  const html = readFileSync(`${dir}/index.html`, 'utf8');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || shop;
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const brand = typeof R.brand === 'string' ? R.brand : [R.brand.ko, R.brand.en].filter(Boolean).join(' ');
  const phone = cfg.phone === false ? null : R.phone || (R.phones || [])[0] || (R.contacts || [])[0]?.tel;

  const ld = { '@context': 'https://schema.org', '@type': cfg.type, name: brand, url };
  if (R.address) ld.address = { '@type': 'PostalAddress', streetAddress: R.address, addressCountry: cfg.country };
  if (phone) ld.telephone = phone.replace(/\s/g, '');
  ld.image = `${url}${cfg.og || 'print/sns-square.png'}`;
  if (cfg.cuisine) ld.servesCuisine = cfg.cuisine;
  if (R.mapUrl) ld.hasMap = R.mapUrl;
  const sections = MENU.map((cat) => ({
    '@type': 'MenuSection',
    name: nm(cat.name, 'en'),
    hasMenuItem: cat.items.map((it) => {
      const item = { '@type': 'MenuItem', name: nm(it.name, 'en') };
      const alt = uniq(['ko', 'vi', 'zh', 'ja'].map((l) => nm(it.name, l))).filter((x) => x !== item.name);
      if (alt.length) item.alternateName = alt;
      const p = priceOf(it);
      if (p != null) item.offers = { '@type': 'Offer', price: p, priceCurrency: cfg.currency };
      return item;
    }),
  }));
  if (cfg.type === 'Store') {
    ld.hasOfferCatalog = { '@type': 'OfferCatalog', name: brand, itemListElement: sections.map((s) => ({ '@type': 'OfferCatalog', name: s.name, itemListElement: s.hasMenuItem.map((i) => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name: i.name, alternateName: i.alternateName }, price: i.offers?.price, priceCurrency: cfg.currency })) })) };
  } else if (!cfg.noMenu) {
    ld.hasMenu = { '@type': 'Menu', name: `${brand} menu`, inLanguage: ['ko', 'en', 'zh', 'ja', 'vi'], hasMenuSection: sections };
  }

  inject(`${dir}/index.html`, block([
    `<link rel="canonical" href="${url}">`,
    cfg.naver ? `<meta name="naver-site-verification" content="${cfg.naver}">` : '',
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${esc(title)}">`,
    desc ? `<meta property="og:description" content="${esc(desc)}">` : '',
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${url}${cfg.og || 'print/sns-square.png'}">`,
    `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean)));
  writeFileSync(`${dir}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${url}sitemap.xml\n`);
  writeFileSync(`${dir}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`);
  console.log(`${shop}: ${sections.reduce((n, s) => n + s.hasMenuItem.length, 0)}개 메뉴 → JSON-LD, robots.txt, sitemap.xml`);
}

// 소개서·가게 찾기 (qrmenuasia.com): 전체 사이트맵 하나로 모든 가게를 함께 알린다
const sales = `${ROOT}/sales`;
const main = `https://${DOMAIN}/`;
inject(`${sales}/index.html`, block([
  `<link rel="canonical" href="${main}">`,
  `<meta name="naver-site-verification" content="373cad11eece55044bada0b3b79a8f55a2b8e00c">`, // 네이버 서치어드바이저 소유 확인 (지우지 말 것)
  `<meta property="og:type" content="website">`,
  `<meta property="og:url" content="${main}">`,
  `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'QR Menu Asia', url: main })}</script>`,
]));
const all = [main, `${main}stores/`, ...shopUrls];
writeFileSync(`${sales}/robots.txt`, `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /owner/\nDisallow: /report/\nDisallow: /api/\nSitemap: ${main}sitemap.xml\n`);
writeFileSync(`${sales}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${all.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log(`sales: 전체 사이트맵 ${all.length}개 주소 → ${main}sitemap.xml`);
if (!existsSync(`${sales}/stores/index.html`)) console.log('주의: sales/stores/index.html 없음');
