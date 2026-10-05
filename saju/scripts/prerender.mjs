// Writes one HTML file per page and language with its own title, description,
// canonical/hreflang links and share preview tags, plus sitemap.xml and robots.txt.
// Runs after `vite build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const seo = JSON.parse(fs.readFileSync(path.join(root, 'src/seo.json'), 'utf8'));
const config = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));
const site = config.siteUrl.replace(/\/+$/, '');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const ROUTES = ['/', '/calendar', '/match', '/name', '/saju'];
const LANGS = ['ko', 'vi'];
const LOCALE = { ko: 'ko_KR', vi: 'vi_VN' };
const NAV = {
  ko: { '/': '오늘', '/calendar': '좋은 날 달력', '/match': '궁합', '/name': '이름 변환', '/saju': '무료 사주' },
  vi: { '/': 'Hôm nay', '/calendar': 'Xem ngày tốt', '/match': 'Xem tuổi hợp', '/name': 'Tên tiếng Hàn', '/saju': 'Lá số Tứ trụ' },
};

const pathFor = (route, lang) => (lang === 'vi' ? (route === '/' ? '/vi' : `/vi${route}`) : route);
const urlFor = (route, lang) => site + pathFor(route, lang);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function head(route, lang) {
  const m = seo[lang][route];
  const url = urlFor(route, lang);
  const image = `${site}/og-image.png`;
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${urlFor(route, l)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${urlFor(route, 'ko')}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${lang === 'vi' ? 'Minh Nguyệt 明月' : '명월 明月'}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${LOCALE[lang]}" />`,
    `<meta property="og:locale:alternate" content="${LOCALE[lang === 'ko' ? 'vi' : 'ko']}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  const v = config.verification ?? {};
  if (v.google) tags.push(`<meta name="google-site-verification" content="${esc(v.google)}" />`);
  if (v.naver) tags.push(`<meta name="naver-site-verification" content="${esc(v.naver)}" />`);
  if (v.bing) tags.push(`<meta name="msvalidate.01" content="${esc(v.bing)}" />`);
  if (route === '/') {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: lang === 'vi' ? 'Minh Nguyệt 明月' : '명월 明月',
      alternateName: ['명월', 'Minh Nguyệt', 'Myeongwol'],
      url,
      inLanguage: lang,
      description: m.description,
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(ld)}</script>`);
  }
  return tags.join('\n    ');
}

/** Static content shown before the app loads (and to crawlers that do not run JavaScript). */
function body(route, lang) {
  const m = seo[lang][route];
  const links = ROUTES.map((r) => `<li><a href="${pathFor(r, lang)}">${esc(NAV[lang][r])}</a></li>`).join('');
  const other = lang === 'ko' ? 'vi' : 'ko';
  return `<main class="main"><section class="section"><h1 class="section-title">${esc(m.h1)}</h1><p class="section-desc">${esc(m.description)}</p><ul class="footer-links">${links}<li><a href="${pathFor(route, other)}" hreflang="${other}">${other === 'vi' ? 'Tiếng Việt' : '한국어'}</a></li></ul></section></main>`;
}

for (const lang of LANGS) {
  for (const route of ROUTES) {
    const html = template
      .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
      .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head(route, lang))
      .replace('<!--seo:body-->', body(route, lang));
    const rel = pathFor(route, lang);
    const file = rel === '/' ? path.join(dist, 'index.html') : path.join(dist, rel, 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
    // Also /vi/calendar.html so hosts with clean URLs serve it at /vi/calendar without a trailing slash.
    if (rel !== '/') fs.writeFileSync(path.join(dist, `${rel}.html`), html);
  }
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.flatMap((lang) => ROUTES.map((route) => `  <url>
    <loc>${urlFor(route, lang)}</loc>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(route, l)}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(route, 'ko')}" />
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' || route === '/calendar' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`)).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);

console.log(`prerendered ${LANGS.length * ROUTES.length} pages for ${site}`);
