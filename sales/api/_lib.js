// 방문 집계 공용 함수 (파일 이름이 _ 로 시작하면 Vercel 이 API 로 열지 않는다)
// 저장 방식: 방문 1건 = 빈 Blob 파일 1개. 내용은 파일 "경로"에 넣는다 → 집계할 때 파일을 열지 않고 목록(list)만 읽으면 된다.
//   hits/<날짜>/<가게>/<방문자해시>.<언어>.<국가>.<기기>.<유입>.<무작위>
const crypto = require('crypto');

const TZ_OFFSET_MS = 7 * 3600 * 1000; // 베트남 시간(UTC+7) 기준으로 하루를 나눈다
const dateOf = (ms = Date.now()) => new Date(ms + TZ_OFFSET_MS).toISOString().slice(0, 10);

const BOT = /bot|crawl|spider|slurp|headless|lighthouse|preview|monitor|uptime|pingdom|curl|wget|python|java\/|go-http|axios|node-fetch|okhttp|facebookexternalhit|embedly|yeti|phantom|puppeteer|playwright|selenium|vercel|screenshot|checker|scan/i;

const slug = (s, max = 12) => String(s || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, max) || 'na';

// 접속한 주소에서 가게 이름을 뽑는다. 우리 주소가 아니면 null (남의 사이트가 보낸 신호는 버린다)
function shopFrom(host, path) {
  host = String(host || '').toLowerCase().replace(/^www\./, '');
  const isIntro = host === 'qrmenuasia.com' || host === 'qrmenu-intro.vercel.app';
  if (isIntro) return /^\/stores(\/|$)/.test(path || '') ? 'stores' : 'intro';
  let m = host.match(/^([a-z0-9]+)\.qrmenuasia\.com$/);
  if (m) return m[1];
  m = host.match(/^([a-z0-9]+)-menu\.vercel\.app$/); // 예전 주소(이미 인쇄한 QR)
  if (m) return m[1];
  return null;
}

// 어디서 들어왔나: ?utm_source=qr 같은 꼬리표가 있으면 그대로, 없으면 이전 페이지 주소로 짐작
function srcOf(utm, refHost, host) {
  if (utm) return slug(utm, 14);
  refHost = String(refHost || '').toLowerCase();
  if (!refHost || refHost === String(host).toLowerCase()) return 'direct';
  if (/(^|\.)qrmenuasia\.com$/.test(refHost)) return 'site'; // 소개서·가게 찾기·다른 가게 메뉴판에서 넘어옴
  if (/google|naver|bing|daum|yahoo|baidu|coccoc/.test(refHost)) return 'search';
  if (/facebook|instagram|zalo|tiktok|youtube|kakao|messenger|threads|twitter|x\.com|t\.co/.test(refHost)) return 'social';
  return 'link';
}

const deviceOf = (ua, width) => (/mobi|android|iphone|ipad/i.test(ua) || (width > 0 && width < 820) ? 'mobile' : 'desktop');

// 같은 사람이 하루에 여러 번 열어도 방문자 1명으로 세기 위한 값. 날짜·소금을 섞어 해시해서 개인을 식별할 수 없다.
function visitorId(ip, ua, date, shop) {
  return crypto.createHash('sha256').update([process.env.HASH_SALT || 'x', date, shop, ip, ua].join('|')).digest('hex').slice(0, 10);
}

const encodeHit = (h) => `hits/${h.date}/${h.shop}/${[h.vid, slug(h.lang, 8), slug(h.cc, 2), h.dev, slug(h.src, 14), crypto.randomBytes(3).toString('hex')].join('.')}`;

function decodeHit(pathname) {
  const m = pathname.match(/^hits\/(\d{4}-\d{2}-\d{2})\/([a-z0-9]+)\/([^/]+)$/);
  if (!m) return null;
  const f = m[3].split('.');
  if (f.length < 6) return null;
  return { date: m[1], shop: m[2], vid: f[0], lang: f[1], cc: f[2], dev: f[3], src: f[4] };
}

const bump = (o, k, n = 1) => { o[k] = (o[k] || 0) + n; };

// 방문 목록 → 가게별 집계 (페이지뷰 = 방문 기록 수, 방문자 = 하루 단위로 중복 제거한 사람 수의 합)
function aggregate(pathnames, dates) {
  const shops = {};
  const seen = new Set();
  for (const p of pathnames) {
    const h = decodeHit(p);
    if (!h) continue;
    const s = (shops[h.shop] ||= { pv: 0, vis: 0, days: {}, lang: {}, dev: {}, src: {}, cc: {} });
    s.pv++;
    const d = (s.days[h.date] ||= { pv: 0, vis: 0 });
    d.pv++;
    const key = h.date + '|' + h.shop + '|' + h.vid;
    if (!seen.has(key)) { seen.add(key); s.vis++; d.vis++; bump(s.lang, h.lang); bump(s.dev, h.dev); bump(s.src, h.src); bump(s.cc, h.cc); }
  }
  return { dates, shops };
}

function checkAdmin(req) {
  const given = String(req.headers['x-admin-key'] || '');
  const real = String(process.env.ADMIN_PASSWORD || '');
  if (!real || given.length !== real.length) return false;
  return crypto.timingSafeEqual(Buffer.from(given), Buffer.from(real));
}

module.exports = { dateOf, BOT, slug, shopFrom, srcOf, deviceOf, visitorId, encodeHit, decodeHit, aggregate, checkAdmin, TZ_OFFSET_MS };

// ───────────────────────── 로그인 · 보안 (관리자·점주·리포트 링크) ─────────────────────────
const S = require('./_store');
const ipOf = (req) => String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
const ipHash = (req) => crypto.createHash('sha256').update(ipOf(req) + '|' + (process.env.HASH_SALT || 'x')).digest('hex').slice(0, 12);
const hourKey = () => new Date().toISOString().slice(0, 13).replace(/[^0-9]/g, '');
const MAX_FAILS = 8; // 한 시간에 틀린 비밀번호 8번이면 그 기기(IP)는 한 시간 막는다

const failPrefix = (req) => `sec/fail/${hourKey()}/${ipHash(req)}.`;
const isBlocked = async (req) => (await S.listAll(failPrefix(req))).length >= MAX_FAILS;
const addFail = (req) => S.put(failPrefix(req) + S.rand(3), '1', { access: 'public', addRandomSuffix: false });

const hmac = (label, body, len = 32) => crypto.createHmac('sha256', crypto.createHash('sha256').update(label + '|' + (process.env.HASH_SALT || 'x')).digest()).update(body).digest('hex').slice(0, len);
const safeEq = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

const ownerToken = (shop, ttl = 12 * 3600e3) => { const exp = Date.now() + ttl; return `${shop}.${exp}.${hmac('sess', `${shop}.${exp}`)}`; };
function verifyOwnerToken(tok, shop) {
  const [s, exp, sig] = String(tok || '').split('.');
  if (!s || s !== shop || !(Date.now() < Number(exp)) || !sig) return false;
  return safeEq(sig, hmac('sess', `${s}.${exp}`));
}
const reportToken = (shop) => hmac('rep', shop, 24);

const hashPw = (pw, salt) => crypto.scryptSync(String(pw), salt, 32).toString('hex');
const newPassword = () => {
  const a = 'abcdefghjkmnpqrstuvwxyz23456789';
  const pick = () => Array.from({ length: 4 }, () => a[crypto.randomInt(a.length)]).join('');
  return `${pick()}-${pick()}-${pick()}`;
};

// 관리자 또는 그 가게 점주인지 판별 → 'admin' | 'owner' | null. 틀린 시도는 기록하고 너무 많으면 막는다.
async function actorFor(req, shop) {
  if (await isBlocked(req)) return 'blocked';
  if (checkAdmin(req)) return 'admin';
  if (shop && req.headers['x-owner-token'] && verifyOwnerToken(req.headers['x-owner-token'], shop)) return 'owner';
  if (req.headers['x-admin-key'] || req.headers['x-owner-token']) await addFail(req).catch(() => {});
  return null;
}

async function logEvent(actor, action, shop = '', note = '') {
  const d = dateOf();
  const p = `log/${d}/${Date.now()}.${slug(actor, 10)}.${slug(action, 16)}.${slug(shop, 14)}.${S.rand(2)}`;
  await S.put(p + (note ? '.' + encodeURIComponent(String(note).slice(0, 60)).replace(/%/g, '') : ''), '1', { access: 'public', addRandomSuffix: false }).catch(() => {});
}

const readBody = (req) => (req.body && typeof req.body === 'object' ? req.body : typeof req.body === 'string' ? JSON.parse(req.body || '{}') : {});
const validShop = (s) => /^[a-z0-9]{2,20}$/.test(String(s || ''));

Object.assign(module.exports, { ipOf, ipHash, isBlocked, addFail, ownerToken, verifyOwnerToken, reportToken, hashPw, newPassword, actorFor, logEvent, readBody, validShop, safeEq });
