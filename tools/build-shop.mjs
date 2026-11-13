// 운영자 모드 '가게 만들기'(대시보드 탭)의 뒷단. 캡틴이 화면에서 채운 초안(draft.json)으로 가마솥 표준 가게를 만든다.
// 사용법:
//   node tools/build-shop.mjs --meta                       → 지역·분류·태그 목록과 이미 있는 가게 id(JSON)
//   node tools/build-shop.mjs <가게id> <초안폴더> build      → restaurants/<가게id> 만들기(미리보기용, 등록 안 함)
//   node tools/build-shop.mjs <가게id> <초안폴더> register   → 등록(register-shop) + 정식이면 QR·카드·SNS 이미지
// 초안폴더 = dashboard/out/builder/<가게id> (draft.json + img/*.jpg·png, git 제외)
// 화면 구조는 new-shop.mjs(가마솥 표준) 그대로 두고 색·문구·메뉴 데이터만 바꾼다(CLAUDE.md 0장).
// 가마솥 모양(왼쪽 띠·물결 무늬·모서리 선)은 빼고 위쪽 띠로 바꾼다(CLAUDE.md 2장 '가마솥은 구조만').
// 다시 만들기: 저장소에 아직 커밋하지 않은 가게(git ls-files 가 비어 있음)이고 이 초안으로 만든 표시(초안폴더/built.json)가 있을 때만
// restaurants/<가게id> 를 지우고 새로 만든다. 이미 커밋된 가게·다른 방법으로 만든 가게는 절대 지우지 않는다.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['ko', 'en', 'zh', 'ja', 'vi'];
const die = (m) => { console.error('만들기 멈춤: ' + m); process.exit(1); };
const readWin = (rel) => { const c = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), c); return c.window; };

const [id, draftDir, step = 'build'] = process.argv.slice(2);
if (id === '--meta') {
  const D = readWin('sales/stores/data.js');
  const shops = fs.readdirSync(path.join(ROOT, 'restaurants')).filter((d) => /^[a-z0-9]+$/.test(d));
  console.log(JSON.stringify({ regions: D.REGIONS, cats: D.CATS, tags: D.TAGS, shops }));
  process.exit(0);
}
if (!/^[a-z0-9]{2,30}$/.test(id || '')) die('가게 id 는 영문 소문자·숫자 2~30자');
if (!draftDir || !fs.existsSync(path.join(draftDir, 'draft.json'))) die('초안(draft.json)이 없음');
const J = JSON.parse(fs.readFileSync(path.join(draftDir, 'draft.json'), 'utf8'));
const dir = path.join(ROOT, 'restaurants', id);
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8' });
const node = (...a) => {
  try { return execFileSync('node', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { die(`${a.join(' ')} 실패: ${`${e.stdout || ''}${e.stderr || ''}`.trim().split('\n').slice(-4).join(' / ').slice(0, 500)}`); }
};
const tracked = () => git('ls-files', '--', `restaurants/${id}`).trim() !== '';
const s5 = (o, k = '') => LANGS.map((l) => [l, String(o?.[l] ?? '').trim()]);
const need5 = (o, what) => { const miss = s5(o).filter(([, v]) => !v).map(([l]) => l); if (miss.length) problems.push(`${what}: ${miss.join('·')} 비어 있음`); };
const HEX = /^#[0-9a-f]{6}$/i;

// ---------------------------------------------------------------- 초안 확인
const problems = [];
if (!['listing', 'full'].includes(J.kind)) problems.push('종류(가게 찾기용/정식)를 고르세요');
if (!['logo', 'sign'].includes(J.top)) problems.push('맨 위 그림(로고/간판 사진)을 고르세요');
const topFile = J.top === 'logo' ? 'logo.png' : 'sign.jpg';
if (J.top && !fs.existsSync(path.join(draftDir, 'img', topFile))) problems.push(`맨 위 그림(${J.top === 'logo' ? '로고' : '간판 사진'})을 올리세요`);
if (!J.name?.ko?.trim()) problems.push('가게 이름(한국어)이 비어 있음');
if (!J.name?.en?.trim()) problems.push('가게 이름(영문)이 비어 있음');
need5(J.tagline, '한 줄 소개');
(J.chips || []).forEach((c, i) => need5(c, `특징 칩 ${i + 1}`));
need5(J.quote, '인사 문구');
if (!J.info?.phone?.trim()) problems.push('전화번호가 비어 있음');
if (!J.info?.address?.trim()) problems.push('주소가 비어 있음');
if (!/^https:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|maps\.google\.[a-z.]+)/.test(J.info?.mapUrl || '')) problems.push('구글 지도 주소(https://…google…/maps 또는 maps.app.goo.gl)를 넣으세요');
if (!J.info?.hours?.ko?.trim()) problems.push('영업시간이 비어 있음');
const T = J.theme || {};
for (const k of ['band', 'accent', 'title']) if (!HEX.test(T[k] || '')) problems.push(`색(${k})이 #rrggbb 형식이 아님`);
const cats = (J.cats || []).filter((c) => c && (c.name?.ko || (c.items || []).length));
if (!cats.length) problems.push('메뉴 분류가 없음');
let photos = 0;
cats.forEach((c, ci) => {
  need5(c.name, `분류 ${ci + 1} 이름`);
  if (c.note && LANGS.some((l) => c.note[l])) need5(c.note, `분류 "${c.name?.ko}" 안내`);
  if (!(c.items || []).length) problems.push(`분류 "${c.name?.ko}"에 메뉴가 없음`);
  (c.items || []).forEach((it, ii) => {
    const label = `"${it.name?.ko || `${ci + 1}-${ii + 1}번`}"`;
    need5(it.name, `메뉴 ${label} 이름`);
    if (it.desc && LANGS.some((l) => it.desc[l])) need5(it.desc, `메뉴 ${label} 설명`);
    const sizes = (it.sizes || []).filter((s) => s && (s[0] || s[1]));
    if (sizes.length) { if (sizes.some(([a, b]) => !String(a).trim() || !(Number(b) > 0))) problems.push(`메뉴 ${label} 크기별 가격이 비어 있음`); }
    else if (!it.market && !(Number(it.price) > 0)) problems.push(`메뉴 ${label} 가격이 없음(시가면 '시가' 체크)`);
    if (it.tag && !['must', 'best', 'special'].includes(it.tag)) problems.push(`메뉴 ${label} 표시가 이상함`);
    if (it.photo) {
      if (!/^[a-z0-9-]+\.jpg$/.test(it.photo) || !fs.existsSync(path.join(draftDir, 'img', it.photo))) problems.push(`메뉴 ${label} 사진 ${it.photo} 이 없음`);
      else photos++;
    }
  });
});
if (J.kind === 'full' && J.order?.zalo && !/^[0-9 +]{8,16}$/.test(J.order.zalo)) problems.push('Zalo 번호는 숫자만');
if (step === 'register') {
  const R = J.reg || {};
  if (!R.region) problems.push('지역을 고르세요');
  if (!(R.cats || []).length) problems.push('가게 찾기 분류를 하나 이상 고르세요');
  need5(R.type, '가게 종류 한 줄(5개 언어)');
  if (!(R.cuisine || []).length) problems.push('요리 종류(영문, 검색용)를 넣으세요');
}
if (problems.length) die('\n- ' + problems.join('\n- '));

// ---------------------------------------------------------------- 색
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (a) => '#' + a.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => toHex(hex(a).map((v, i) => v + (hex(b)[i] - v) * t));
const lum = (h) => { const [r, g, b] = hex(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const on = (h) => (lum(h) > 0.42 ? '#1d1b18' : '#ffffff');
const dark = T.mode === 'dark';
const band = T.band, accent = T.accent;
const C = dark
  ? { paper: mix('#151412', band, 0.10), paper2: mix('#1f1d1a', band, 0.18), ink: '#f3efe7', muted: '#b9b2a6', line: mix('#34312c', band, 0.25), card: mix('#1c1a17', band, 0.08), desc: '#d4cec3' }
  : { paper: mix('#ffffff', band, 0.05), paper2: mix('#ffffff', band, 0.12), ink: '#24211e', muted: '#6f6a62', line: mix('#e6e2da', band, 0.18), card: '#ffffff', desc: '#55504a' };
C.band = band; C.band2 = mix(band, '#000000', 0.2); C.accent = accent; C.title = T.title; C.navInk = on(band); C.navDim = mix(on(band), band, 0.18);

// ---------------------------------------------------------------- 만들기
function build() {
  const mark = path.join(draftDir, 'built.json');
  if (fs.existsSync(dir)) {
    if (tracked()) die(`restaurants/${id} 는 이미 저장소에 있는 가게예요. 다른 id 를 쓰세요(이미 있는 가게는 그대로 둡니다)`);
    if (!fs.existsSync(mark)) die(`restaurants/${id} 폴더가 이미 있는데 이 화면으로 만든 것이 아니에요. 다른 id 를 쓰세요`);
    fs.rmSync(dir, { recursive: true, force: true }); // 이 화면으로 만들고 아직 커밋 안 한 것만 다시 만든다
  }
  node('tools/new-shop.mjs', id, J.kind, J.top);
  fs.writeFileSync(mark, JSON.stringify({ at: new Date().toISOString() }));

  // 그림: 맨 위 + 요리 사진(화면에서 이미 4:3 640×480 으로 잘라 옴)
  fs.copyFileSync(path.join(draftDir, 'img', topFile), path.join(dir, 'img', topFile));
  for (const c of cats) for (const it of c.items) if (it.photo) fs.copyFileSync(path.join(draftDir, 'img', it.photo), path.join(dir, 'img', it.photo));

  const q = (v) => JSON.stringify(v);
  const e = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let h = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  const rep = (a, b) => { if (!h.includes(a)) die(`index.html 에서 못 찾음: ${a.slice(0, 60)}`); h = h.split(a).join(b); };
  const repRe = (re, b, what) => { if (!re.test(h)) die(`index.html 에서 못 찾음: ${what}`); h = h.replace(re, b); };
  const nm = `${J.name.ko.trim()} ${J.name.en.trim()}`;
  repRe(/<title>[^<]*<\/title>/, `<title>${e(nm)} 메뉴</title>`, 'title');
  repRe(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${e(`${nm} · ${J.tagline.vi.trim()} — ${J.info.address.trim()}`)}">`, 'description');
  repRe(/<meta name="theme-color" content="[^"]*">/, `<meta name="theme-color" content="${band}">`, 'theme-color');
  // 색: 가마솥 :root 를 통째로 바꾸고 물결 무늬(--waves)를 뺀다
  repRe(/  :root \{\n    --paper:[\s\S]*?\n  \}\n/, `  :root {
    --paper: ${C.paper};
    --paper-2: ${C.paper2};
    --band: ${C.band};
    --band-2: ${C.band2};
    --ink: ${C.ink};
    --muted: ${C.muted};
    --line: ${C.line};
    --rust: ${C.accent};
    --gold: ${C.accent};
    --card: ${C.card};
  }
`, ':root');
  // 가마솥 모양 빼기: 왼쪽 띠 → 위쪽 띠, 물결 무늬·모서리 선 없음
  rep('border-left: 14px solid var(--band); }', `border-top: 8px solid var(--band); background: linear-gradient(180deg, var(--paper-2), var(--paper)); }`);
  repRe(/  header::after \{[\s\S]*?pointer-events: none; \}\n/, '', 'header::after');
  repRe(/  \.corner \{[^\n]*\n  \.corner\.l \{[^\n]*\n  \.corner\.r \{[^\n]*\n/, '', '.corner');
  rep('  <span class="corner l"></span><span class="corner r"></span>\n', '');
  // 가마솥 베이지색으로 박혀 있던 곳을 이 가게 색으로
  rep('background: rgba(255,255,255,.6); border: 1px solid #cfc4b2;', 'background: var(--card); border: 1px solid var(--line);');
  rep('color: var(--band-2); background: var(--paper-2); border: 1px solid #d8cdbb;', `color: ${dark ? C.ink : C.band2}; background: var(--paper-2); border: 1px solid var(--line);`);
  rep('nav a { flex: none; color: #ece4d6;', `nav a { flex: none; color: ${C.navDim};`);
  rep('.head::before, .head::after { content: ""; flex: 1; height: 1px; background: #cfc4b2; }', '.head::before, .head::after { content: ""; flex: 1; height: 1px; background: var(--line); }');
  rep('background: #fff; border: 1px dashed #cdbfa9;', 'background: var(--card); border: 1px dashed var(--line);');
  rep('.tags .hot { background: #fff; color: #c2402a; border: 1px solid #e6b3a6; }', `.tags .hot { background: var(--card); color: ${dark ? '#ff8a73' : '#c2402a'}; border: 1px solid ${dark ? '#7a3a2e' : '#e6b3a6'}; }`);
  rep('border-bottom: 2px dotted #cdbfa9;', 'border-bottom: 2px dotted var(--line);');
  rep('background: #fff; border: 1px solid var(--line); border-radius: 8px;', 'background: var(--card); border: 1px solid var(--line); border-radius: 8px;');
  rep('.desc { margin-top: 4px; font-size: 13px; color: #5d544b; }', `.desc { margin-top: 4px; font-size: 13px; color: ${C.desc}; }`);
  rep('footer { margin-top: 40px; background: var(--band); color: #f3ecdf;', `footer { margin-top: 40px; background: var(--band); color: ${C.navInk};`);
  // 제목 색, 분류 탭 글자색(띠 색이 밝으면 어두운 글자)
  repRe(/  h1 \{([^\n]*)\}/, (m, a) => `  h1 {${a.replace(/\s*color:[^;]*;/, '')} color: ${C.title}; }`, 'h1');
  // 하단 파트너 배너 색
  repRe(/  :root \{ --pt-mode:[^\n]*\}/, `  :root { --pt-mode: ${dark ? 'dark' : 'light'}; --pt-bg: ${C.paper}; --pt-ink: ${C.ink}; --pt-muted: ${C.muted}; --pt-line: ${C.line}; --pt-accent: ${band}; --pt-btn: ${C.band2}; --pt-btn-ink: ${on(C.band2)}; --pt-shadow: 0 6px 16px rgba(0,0,0,${dark ? '.35' : '.12'}); }`, 'partner-theme');
  // 이름
  rep('    <h1>가마솥</h1>\n    <p class="en">GAMASOT</p>', `    <h1>${e(J.name.ko.trim())}</h1>\n    <p class="en">${e(J.name.en.trim())}</p>`);
  // 문구 5개 언어: 한 줄 소개·특징 칩·인사 문구
  for (const l of LANGS) {
    const seg = new RegExp(`(\\n    ${l}: \\{[\\s\\S]*?)(?=\\n    (?:ko|en|zh|ja|vi): \\{|\\n  \\};)`);
    const m = h.match(seg);
    if (!m) die(`UI 문구 ${l} 칸을 못 찾음`);
    const lines = J.quote[l].trim().split(/\n+/).map(e);
    const by = J.quoteBy?.[l]?.trim();
    const quote = lines.join('<br>') + (by ? `<small>– ${e(by)} –</small>` : '');
    const s = m[1]
      .replace(/tagline: "(?:[^"\\]|\\.)*"/, `tagline: ${q(J.tagline[l].trim())}`)
      .replace(/chips: \[[^\]]*\]/, `chips: ${q((J.chips || []).map((c) => c[l].trim()))}`)
      .replace(/quote: "(?:[^"\\]|\\.)*"/, `quote: ${q(quote)}`);
    h = h.replace(m[1], () => s);
  }
  fs.writeFileSync(path.join(dir, 'index.html'), h);

  // menu.js
  const one = (o) => `{ ${LANGS.map((l) => `${l}: ${q(o[l].trim())}`).join(', ')} }`;
  const hk = J.info.hours;
  const timeOnly = /^[0-9:~–\- .,]+$/.test(hk.ko.trim());
  const hours = timeOnly || !LANGS.every((l) => hk[l]?.trim()) ? q(hk.ko.trim()) : one(hk);
  const wifi = J.info.wifiName?.trim() ? `{ ssid: ${q(J.info.wifiName.trim())}, password: ${q((J.info.wifiPass || '').trim())} }` : 'null';
  const used = new Set();
  const catId = (c, i) => {
    let s = (c.name.en || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24) || `cat${i + 1}`;
    if (/^[0-9]/.test(s)) s = 'c' + s;
    while (used.has(s)) s += '-' + (i + 1);
    used.add(s); return s;
  };
  const item = (it) => {
    const parts = [`name: ${one(it.name)}`];
    const sizes = (it.sizes || []).filter((s) => s && (s[0] || s[1]));
    if (sizes.length) parts.push(`sizes: ${q(sizes.map(([a, b]) => [String(a).trim(), Number(b)]))}`);
    else parts.push(`price: ${it.market ? 'null' : Number(it.price)}`);
    if (it.tag) parts.push(`tag: ${q(it.tag)}`);
    if (it.spicy) parts.push('spicy: true');
    if (it.desc && LANGS.some((l) => it.desc[l])) parts.push(`desc: ${one(it.desc)}`);
    if (it.photo) parts.push(`photo: ${q('img/' + it.photo)}`);
    return `      { ${parts.join(', ')} },`;
  };
  const menu = `// ${J.name.ko.trim()}(${J.name.en.trim()}) 메뉴 데이터 — 대시보드 '가게 만들기'로 캡틴이 직접 입력(${new Date().toISOString().slice(0, 10)}). 가격 VND
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3)
window.RESTAURANT = {
  brand: { ko: ${q(J.name.ko.trim())}, en: ${q(J.name.en.trim())} },
  phone: ${q(J.info.phone.trim())},
  address: ${q(J.info.address.trim())},
  mapUrl: ${q(J.info.mapUrl.trim())},
  wifi: ${wifi},
  hours: ${hours},
};
${J.kind === 'full' ? `\n// 장바구니·주문서 (_shared/order.js). staff = 주문서 언어, zalo = 주문 받을 Zalo 번호 (null이면 버튼 숨김)\nwindow.ORDER = { staff: "vi", currency: "₫", zalo: ${J.order?.zalo ? q(J.order.zalo.replace(/\s/g, '')) : 'null'} };\n` : ''}
window.MENU = [
${cats.map((c, i) => `  {
    id: ${q(catId(c, i))},
    name: ${one(c.name)},${c.note && LANGS.some((l) => c.note[l]) ? `\n    note: ${one(c.note)},` : ''}
    items: [
${c.items.map(item).join('\n')}
    ],
  },`).join('\n')}
];
`;
  fs.writeFileSync(path.join(dir, 'menu.js'), menu);
  // 지도 링크: new-shop 은 brand.en + 주소 검색으로 둔다 → 캡틴이 넣은 구글 지도 주소가 있으면 그것으로
  h = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  const mapLine = '$("map").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(R.brand.en + " " + R.address);';
  if (h.includes(mapLine)) fs.writeFileSync(path.join(dir, 'index.html'), h.replace(mapLine, '$("map").href = R.mapUrl || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(R.brand.en + " " + R.address);'));
  // 가게 찾기·검색 정보가 아직 없으니 미리보기는 seo 블록 없이 본다(등록 때 seo.mjs 가 만든다)
  console.log(`만듦: restaurants/${id} (${J.kind === 'listing' ? '가게 찾기용' : '정식'}, 메뉴 ${cats.reduce((n, c) => n + c.items.length, 0)}개, 요리 사진 ${photos}장)`);
  if (photos < 4) console.log(`주의: 요리 사진 ${photos}장 — 4~6장을 권해요(쓸 만한 사진이 4장 안 되면 있는 것 전부)`);
}

// ---------------------------------------------------------------- 등록(+ 정식 결과물)
function register() {
  if (!fs.existsSync(path.join(dir, 'menu.js'))) die('먼저 [미리 만들기]를 누르세요');
  const R = J.reg;
  const names = cats.flatMap((c) => c.items.slice(0, 6).map((it) => it.name.ko.trim()));
  const regFile = path.join(draftDir, 'register.json');
  fs.writeFileSync(regFile, JSON.stringify({
    ko: J.name.ko.trim(),
    name: `${J.name.ko.trim()} ${J.name.en.trim().toUpperCase()}`,
    sub: R.sub?.trim() || cats.map((c) => c.name.ko.trim()).slice(0, 6).join(' · '),
    region: R.region, cats: R.cats, tags: R.tags || [],
    type: Object.fromEntries(LANGS.map((l) => [l, R.type[l].trim()])),
    keywords: (R.keywords?.trim() || [J.name.ko, J.name.en, ...names, J.info.address].join(' ')).replace(/\s+/g, ' ').trim(),
    schema: R.schema || 'Restaurant', cuisine: R.cuisine,
    og: R.og && fs.existsSync(path.join(dir, R.og)) ? R.og : `img/${topFile}`,
    map: J.info.mapUrl.trim(), address: J.info.address.trim(),
    listing: J.kind === 'listing',
    storesRow: `${J.name.ko.trim()} ${J.name.en.trim()} — ${cats.map((c) => c.name.ko.trim()).slice(0, 4).join('·')} (${J.info.address.trim()}, ${J.info.phone.trim()}, ${J.info.hours.ko.trim()}) — **${J.kind === 'listing' ? '가게 찾기용' : '정식'}**(${new Date().toISOString().slice(0, 10)}, 대시보드 '가게 만들기'). 맨 위는 ${J.top === 'logo' ? '로고' : '간판 사진'}. 메뉴 ${cats.reduce((n, c) => n + c.items.length, 0)}개`,
  }, null, 2));
  console.log(node('tools/register-shop.mjs', id, rel(regFile)).trim().split('\n').slice(-12).join('\n'));
  if (J.kind === 'full') fullPrint();
}

// 정식 가게 결과물(check-shop 이 요구): QR·테이블 카드·SNS 이미지. 카드는 이 가게 색과 맨 위 그림으로 만든다.
function fullPrint() {
  const pd = path.join(dir, 'print');
  fs.mkdirSync(pd, { recursive: true });
  const url = `https://${id}.qrmenuasia.com`;
  node('tools/qr.cjs', url, rel(path.join(pd, 'qr.svg')), 'M');
  const json = path.join(pd, 'qr.json');
  let ok = '';
  try { ok = execFileSync('python', [path.join(ROOT, 'tools/qr-check.py'), json], { cwd: ROOT, encoding: 'utf8' }); } catch (e) { ok = String(e.stdout || e.message); }
  fs.rmSync(json, { force: true });
  console.log('QR 확인: ' + ok.trim().split('\n').pop());
  const e = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const top = J.top === 'logo'
    ? `<div class="top"><img class="logo" src="../img/logo.png" alt=""></div>`
    : `<div class="top"><img class="sign" src="../img/sign.jpg" alt=""></div>`;
  fs.writeFileSync(path.join(pd, 'table-card.html'), `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>${e(J.name.ko)} ${e(J.name.en)} · QR 카드</title>
<!-- 대시보드 '가게 만들기'가 이 가게 색으로 만든 기본 카드. 더 꾸미려면 designer 담당에게 -->
<style>
  @font-face { font-family: "Gmarket"; src: url("../../../public/fonts/GmarketSansTTFBold.ttf"); }
  @page { size: 105mm 148mm; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --paper: ${C.paper}; --ink: ${C.ink}; --muted: ${C.muted}; --band: ${band}; --on: ${C.navInk}; --accent: ${accent}; --title: ${C.title}; }
  html, body { background: #fff; }
  body { font-family: "Gmarket", sans-serif; color: var(--ink); }
  .card { position: relative; width: 105mm; height: 148mm; overflow: hidden; background: var(--paper); display: flex; flex-direction: column; align-items: center; border-top: 3mm solid var(--band); }
  .top { margin-top: 5mm; height: 30mm; display: flex; align-items: center; justify-content: center; }
  .top .logo { max-width: 70mm; max-height: 30mm; display: block; }
  .top .sign { width: 80mm; height: 30mm; object-fit: cover; border-radius: 2mm; display: block; }
  .name { margin-top: 3mm; font-size: 7mm; letter-spacing: .6mm; line-height: 1; color: var(--title); text-align: center; }
  .en { margin-top: 1.4mm; font-size: 3.4mm; letter-spacing: 1.2mm; color: var(--muted); }
  .qr-box { position: relative; margin-top: 4mm; background: #fff; border-radius: 3mm; padding: 2mm; box-shadow: 0 0 0 .7mm var(--band); }
  .qr-box img { display: block; width: 38mm; height: 38mm; }
  .badge { position: absolute; right: -6mm; top: -3mm; transform: rotate(8deg); background: var(--accent); color: #fff; font-size: 2.5mm; padding: .9mm 2mm .7mm; border-radius: 99mm; }
  h1 { margin-top: 4mm; font-size: 4.6mm; text-align: center; line-height: 1.15; }
  .langs { margin-top: 1.4mm; font-size: 2.6mm; color: var(--muted); text-align: center; }
  .tno { position: absolute; right: calc(100% - 3mm); top: -6mm; z-index: 3; min-width: 12mm; height: 12mm; padding: 0 1.8mm; border-radius: 99mm;
    display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--accent); color: #fff; box-shadow: 0 0 0 .8mm var(--paper);
    font-family: system-ui, "Segoe UI", sans-serif; font-weight: 800; font-size: 6.5mm; line-height: .95; }
  .tno::before { content: "BÀN"; font-size: 1.8mm; letter-spacing: .2mm; line-height: 1; margin-bottom: .3mm; opacity: .9; }
  .tno:empty { display: none; }
  .card > footer { position: absolute; left: 0; right: 0; bottom: 0; height: 15mm; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: .8mm; background: var(--band); color: var(--on); padding: 0 4mm; text-align: center; }
  footer .tel { font-size: 3.6mm; }
  footer .addr { font-size: 2.4mm; }
</style>
</head>
<body>
<div class="card">
  ${top}
  <div class="name">${e(J.name.ko)}</div>
  <div class="en">${e(J.name.en.toUpperCase())}</div>
  <div class="qr-box">
    <img src="qr.svg" alt="QR ${url}">
    <div class="tno" data-table></div>
    <span class="badge">5 ngôn ngữ</span>
  </div>
  <h1>QUÉT MÃ XEM THỰC ĐƠN</h1>
  <div class="langs">SCAN QR FOR MENU · QR 찍고 메뉴 보기 · 扫码看菜单 · メニューを見る</div>
  <footer>
    <div class="tel">☎ ${e(J.info.phone)}</div>
    <div class="addr">${e(J.info.address)}</div>
  </footer>
</div>
</body>
</html>
`);
  console.log(node('tools/card.mjs', id).trim().split('\n').slice(-2).join('\n'));
  // SNS 이미지 제목은 기본이 '한글 이름 + 영문 이름'인데, 길면 세 줄이 되어 아래 일본어 안내가 잘렸다(2026-11-13 시험) → 길면 한글 이름만
  const full = `${J.name.ko.trim()} ${J.name.en.trim().toUpperCase()}`;
  const snsName = full.length > 14 ? J.name.ko.trim() : full;
  const sns = node('tools/sns.mjs', id, J.snsLang === 'ko' ? 'ko' : 'vi', 'MENU', snsName).trim();
  console.log(sns.split('\n').slice(-2).join('\n'));
  if (/넘친 요소: [A-Z]/.test(sns)) console.log('주의: SNS 이미지에 넘친 글자가 있어요 — restaurants/' + id + '/print/sns-*.png 를 열어 보세요');
}

if (step === 'build') build();
else if (step === 'register') register();
else die('단계는 build 또는 register');
