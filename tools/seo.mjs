// 검색 등록용 준비: node tools/seo.mjs
// 가게마다 index.html <head> 에 대표 주소(canonical)·링크 미리보기(og)·가게 정보 구조화 데이터(JSON-LD)를 넣고
// robots.txt·sitemap.xml 을 만든다. 소개서(sales/)에는 전체 사이트맵(qrmenuasia.com/sitemap.xml)을 만든다.
// 메뉴·가격·주소를 고친 뒤 다시 돌리면 <!-- seo:start --> ~ <!-- seo:end --> 부분만 새로 바뀐다.
import { readFileSync, writeFileSync, existsSync } from 'fs';
import vm from 'vm';
import { ROOT } from './pw.mjs';

const DOMAIN = 'qrmenuasia.com';
// type: schema.org 종류, cuisine: 요리 종류, country: 나라, currency: 가격 단위, phone: false 면 전화번호 생략(임시 번호)
const SHOPS = {
  sutkkui:    { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ'], country: 'VN', currency: 'VND' },
  eros:       { type: 'BarOrPub', cuisine: ['Bar'], country: 'VN', currency: 'VND', phone: false },
  anvoi:      { type: 'Restaurant', cuisine: ['Vietnamese', 'Noodles'], country: 'VN', currency: 'VND' },
  baekcheon:  { type: 'Restaurant', cuisine: ['Korean', 'Grilled eel'], country: 'KR', currency: 'KRW' },
  gamasot:    { type: 'Restaurant', cuisine: ['Korean'], country: 'VN', currency: 'VND' },
  biobeauty:  { type: 'Store', country: 'VN', currency: 'VND' },
  suwonseong: { type: 'Restaurant', cuisine: ['Korean', 'Korean BBQ', 'Korean-Chinese'], country: 'VN', currency: 'VND' },
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
  ld.image = `${url}print/sns-square.png`;
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
  } else {
    ld.hasMenu = { '@type': 'Menu', name: `${brand} menu`, inLanguage: ['ko', 'en', 'zh', 'ja', 'vi'], hasMenuSection: sections };
  }

  inject(`${dir}/index.html`, block([
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${esc(title)}">`,
    desc ? `<meta property="og:description" content="${esc(desc)}">` : '',
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${url}print/sns-square.png">`,
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
  `<meta property="og:type" content="website">`,
  `<meta property="og:url" content="${main}">`,
  `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'QR Menu Asia', url: main })}</script>`,
]));
const all = [main, `${main}stores/`, ...shopUrls];
writeFileSync(`${sales}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${main}sitemap.xml\n`);
writeFileSync(`${sales}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${all.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log(`sales: 전체 사이트맵 ${all.length}개 주소 → ${main}sitemap.xml`);
if (!existsSync(`${sales}/stores/index.html`)) console.log('주의: sales/stores/index.html 없음');
