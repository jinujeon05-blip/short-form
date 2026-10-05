// Writes one HTML file per page and language with its own title, description,
// canonical/hreflang links and share preview tags, plus sitemap.xml and robots.txt.
// Runs after `vite build` through vite-node, so it can import the app's TypeScript modules.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { metaFor } from '../src/meta.ts';
import { I18nProvider } from '../src/i18n/index.tsx';
import { RouteContext } from '../src/router.tsx';
import { ANIMAL_SLUGS, FORTUNE_YEARS } from '../src/engine/yearly.ts';
import { YearlyIndexPage, YearlyZodiacPage } from '../src/pages/YearlyPage.tsx';
import { HazardPage } from '../src/pages/HazardPage.tsx';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const seo = JSON.parse(fs.readFileSync(path.join(root, 'src/seo.json'), 'utf8'));
const config = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));
const site = config.siteUrl.replace(/\/+$/, '');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const articles = JSON.parse(fs.readFileSync(path.join(root, 'src/content/articles.json'), 'utf8'));
const adClient = config.adsense?.client ?? '';

const TOOL_ROUTES = ['/', '/calendar', '/match', '/name', '/saju', '/samjae'];
const INFO_ROUTES = ['/guide', '/about', '/privacy', '/terms'];
const GUIDE_ROUTES = articles.guides.map((g) => `/guide/${g.slug}`);
const FORTUNE_ROUTES = FORTUNE_YEARS.flatMap((y) => [`/fortune/${y}`, ...ANIMAL_SLUGS.map((a) => `/fortune/${y}/${a}`)]);
const ROUTES = [...TOOL_ROUTES, ...FORTUNE_ROUTES, ...INFO_ROUTES, ...GUIDE_ROUTES];
const LANGS = ['ko', 'vi'];
const LOCALE = { ko: 'ko_KR', vi: 'vi_VN' };
const NAV = {
  ko: { '/': '오늘', '/calendar': '좋은 날 달력', '/match': '궁합', '/name': '이름 변환', '/saju': '무료 사주', '/samjae': '삼재 계산기', '/guide': '읽을거리' },
  vi: { '/': 'Hôm nay', '/calendar': 'Xem ngày tốt', '/match': 'Xem tuổi hợp', '/name': 'Tên tiếng Hàn', '/saju': 'Lá số Tứ trụ', '/samjae': 'Tam Tai · Kim Lâu', '/guide': 'Bài viết' },
};

const pathFor = (route, lang) => (lang === 'vi' ? (route === '/' ? '/vi' : `/vi${route}`) : route);
const urlFor = (route, lang) => site + pathFor(route, lang);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const BRAND = { ko: '명월', vi: 'Minh Nguyệt' };
const PENDING = { ko: '이메일 준비 중', vi: 'đang cập nhật' };
const withEmail = (text, lang) => text.replace(/\{\{email\}\}/g, config.contactEmail || PENDING[lang]);

function guideOf(route) {
  return articles.guides.find((g) => route === `/guide/${g.slug}`);
}

/** Title/description/h1 for any route */
function metaOf(route, lang) {
  return metaFor(route, lang);
}

/** Server-renders the yearly fortune page so its full text is in the HTML. */
function renderFortune(route, lang) {
  const [, , year, slug] = route.split('/');
  const page = route === '/samjae'
    ? createElement(HazardPage, { query: '' })
    : slug
    ? createElement(YearlyZodiacPage, { year: Number(year), zodiac: ANIMAL_SLUGS.indexOf(slug) })
    : createElement(YearlyIndexPage, { year: Number(year) });
  const tree = createElement(
    RouteContext.Provider,
    { value: { lang, path: route, search: '' } },
    createElement(I18nProvider, { lang, onChangeLang: () => {} }, page),
  );
  return `<main class="main">${renderToString(tree)}</main>`;
}

function blocksHtml(blocks, lang) {
  return blocks.map((b) => {
    if (b.h) return `<h2 class="article-h">${esc(b.h)}</h2>`;
    if (b.p) return `<p>${esc(withEmail(b.p, lang))}</p>`;
    if (b.ul) return `<ul class="article-list">${b.ul.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>`;
    return '';
  }).join('');
}

function head(route, lang) {
  const m = metaOf(route, lang);
  const url = urlFor(route, lang);
  const image = `${site}/og-image.png`;
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${urlFor(route, l)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${urlFor(route, 'ko')}" />`,
    `<meta property="og:type" content="${guideOf(route) ? 'article' : 'website'}" />`,
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
  if (adClient) {
    tags.push(`<meta name="google-adsense-account" content="${esc(adClient)}" />`);
    tags.push(`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(adClient)}" crossorigin="anonymous"></script>`);
  }
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
  const m = metaOf(route, lang);
  const g = guideOf(route);
  const info = ['/about', '/privacy', '/terms'].includes(route) ? articles.pages[route.slice(1)][lang] : null;
  const links = [...TOOL_ROUTES, '/guide'].map((r) => `<li><a href="${pathFor(r, lang)}">${esc(NAV[lang][r])}</a></li>`).join('');
  const other = lang === 'ko' ? 'vi' : 'ko';
  if (route.startsWith('/fortune/') || route === '/samjae') return renderFortune(route, lang);
  if (g || info) {
    const doc = g ? g[lang] : info;
    return `<main class="main"><article class="article"><h1 class="article-title">${esc(doc.title)}</h1>${g ? `<p class="article-lead">${esc(doc.description)}</p>` : ''}${blocksHtml(doc.blocks, lang)}<ul class="footer-links">${links}</ul></article></main>`;
  }
  if (route === '/guide') {
    const list = articles.guides.map((x) => `<li><a href="${pathFor(`/guide/${x.slug}`, lang)}">${esc(x[lang].title)}</a> — ${esc(x[lang].description)}</li>`).join('');
    return `<main class="main"><article class="article"><h1 class="article-title">${esc(m.h1)}</h1><p>${esc(m.description)}</p><ul class="article-list">${list}</ul></article></main>`;
  }
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
    <changefreq>${route === '/' || route === '/calendar' ? 'daily' : TOOL_ROUTES.includes(route) || route === '/guide' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : TOOL_ROUTES.includes(route) || route.startsWith('/fortune/') ? '0.8' : route.startsWith('/guide') ? '0.7' : '0.3'}</priority>
  </url>`)).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
if (adClient) {
  fs.writeFileSync(path.join(dist, 'ads.txt'), `google.com, ${adClient.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`);
}
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);

console.log(`prerendered ${LANGS.length * ROUTES.length} pages for ${site}`);
