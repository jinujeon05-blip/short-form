// 단골 적립(도장) · 오늘의 할인 배너 (2026-11-17 캡틴 결정 가-1·나-1, quicktables 벤치마킹 2번)
// 손님 전화번호를 받지 않는다. 도장은 '카드 번호'(8글자, 손님 폰 localStorage)에 쌓인다.
//   손님(가게 메뉴판의 /loyal-rt.js, CORS = 그 가게 주소만):
//     GET  ?shop=&card=                       → { on, goal, reward, n, today }  (n = 지금 쓸 수 있는 도장 수)
//     POST {op:'stamp', shop, code, card?}    → 카운터 QR(1분마다 바뀜)로 도장 1개. 카드 없으면 새로 만든다. 하루 1번.
//     POST {op:'use',   shop, code, card}     → 카운터 '혜택 사용' QR로 도장 goal개를 쓴다
//     POST {op:'restore', shop, card}         → 복구 번호로 예전 카드 불러오기
//   점주·관리자(x-owner-token 또는 x-admin-key):
//     GET  ?shop=&op=cfg → 설정 · GET ?shop=&op=code → 카운터 QR 주소 2개(도장·사용)
//     POST {op:'cfg', shop, on, goal, reward, banner:{text, from, to}} → 설정 저장
// 시크릿 고객 소리함(2026-11-18 캡틴 가-1·나-1·다-1·라-1): 별점(1~5)+한마디. 구글 리뷰 버튼은 별점과 상관없이 모두에게 똑같이 보인다
//   (구글 지도 정책: 긍정 리뷰만 골라 요청 금지). 1~3점은 주방 화면에 '불만 알림' 띠+소리(직원 호출 r- 파일, req:'voice').
//     POST {op:'voice', shop, stars, text, table, k, lang}  (손님, 테이블 QR 열쇠 k 필수 → 아니면 403) → { ok, alerted }  같은 테이블 알림은 20분에 1번
//     GET  ?shop=&op=vcfg · ?shop=&op=voices&days=  (점주·관리자) → 설정 / 최근 의견
//     POST {op:'vcfg', shop, on, review}  (점주·관리자) → 설정 저장. review = 구글 리뷰 주소(https, 구글 주소만)
//   저장: 설정 = sec/voice/<가게>-<무작위>.json, 의견 = voice/<가게>/<추측 못 하는 글자>/<날짜>/<시각>-<무작위>.<별점>.json
// 저장: 설정 = sec/loyal/<가게>-<무작위>.json (새 이름으로 저장 → CDN 옛 내용 문제 없음)
//       도장 = loyal/<가게>/c/<카드>/s.<날짜>.<무작위> (빈 파일), 사용 = loyal/<가게>/c/<카드>/u.<시각>.<무작위>
const L = require('./_lib');
const S = require('./_store');

const ORIGIN = /^https:\/\/([a-z0-9]+)\.qrmenuasia\.com$|^https:\/\/([a-z0-9]+)-menu\.vercel\.app$/;
const DEV = () => process.env.KITCHEN_DEV === '1';
const CARD = /^[a-hjkmnp-z2-9]{8}$/;
const ABC = 'abcdefghjkmnpqrstuvwxyz23456789';
const WIN = 60e3; // 카운터 QR 한 칸 = 1분, 지난 2칸까지 받아 준다(약 3분)
const recent = new Map(); // 기기(IP)당 10분 30번까지

const cfgName = (shop) => `sec/loyal/${shop}`;
const cardDir = (shop, card) => `loyal/${shop}/c/${card}/`;
const newCard = () => Array.from({ length: 8 }, () => ABC[require('crypto').randomInt(ABC.length)]).join('');
const codeFor = (shop, kind, w) => L.hmac('loyal-' + kind, `${shop}.${w}`, 10);
const okCode = (shop, kind, code) => {
  const w = Math.floor(Date.now() / WIN);
  return [w, w - 1, w - 2].some((x) => L.safeEq(String(code || ''), codeFor(shop, kind, x)));
};

function cors(req, res) {
  const o = String(req.headers.origin || '');
  const m = o.match(ORIGIN);
  if (m || (DEV() && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o))) { res.setHeader('Access-Control-Allow-Origin', o); res.setHeader('Vary', 'Origin'); }
  return m ? m[1] || m[2] : DEV() ? '*' : null;
}

const str = (v, n) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n) : '');
const day = (v) => (/^\d{4}-\d{2}-\d{2}$/.test(String(v || '')) ? String(v) : '');
function clean(b) {
  const g = Math.round(Number(b.goal));
  const bn = b.banner || {};
  return {
    on: !!b.on, goal: g >= 3 && g <= 20 ? g : 10, reward: str(b.reward, 60),
    banner: { text: str(bn.text, 100), from: day(bn.from), to: day(bn.to) },
  };
}
// ── 소리함 ──
const vName = (shop) => `sec/voice/${shop}`;
const vDir = (shop) => `voice/${shop}/${L.hmac('voice', shop, 16)}/`;
const REVIEW = /^https:\/\/(g\.page|search\.google\.com|www\.google\.com|google\.com|maps\.google\.com|maps\.app\.goo\.gl|goo\.gl|www\.google\.com\.vn|g\.co)\/[^\s<>"']{1,280}$/;
const vClean = (b) => { const r = str(b.review, 300); return { on: !!b.on, review: REVIEW.test(r) ? r : '' }; };
const readVoice = async (shop) => vClean((await S.getSecret(vName(shop))) || { on: false });
const vRecent = new Map(); // 기기당 30분 3번
const vTable = new Map(); // 같은 테이블 주방 알림은 20분에 1번(2026-11-18 영업 방해 보완)
async function voiceList(shop, days) {
  const out = [];
  for (let i = 0; i < days; i++) {
    const d = L.dateOf(Date.now() - i * 86400000), base = vDir(shop) + d + '/';
    for (const f of await S.listAll(base)) { const m = f.pathname.slice(base.length).match(/^(\d+)-[a-f0-9]+\.([1-5])\.json$/); if (m) out.push({ at: Number(m[1]), stars: Number(m[2]), url: f.url }); }
  }
  out.sort((a, b) => b.at - a.at);
  const sum = { n: out.length, avg: out.length ? Math.round((out.reduce((n, x) => n + x.stars, 0) / out.length) * 10) / 10 : 0, by: [1, 2, 3, 4, 5].map((k) => out.filter((x) => x.stars === k).length) };
  const items = out.slice(0, 100);
  for (let i = 0; i < items.length; i += 12) await Promise.all(items.slice(i, i + 12).map(async (x) => { try { const r = await fetch(x.url); if (r.ok) { const j = await r.json(); x.text = j.text || ''; x.table = j.table || ''; x.lang = j.lang || ''; x.alerted = !!j.alerted; } } catch {} delete x.url; }));
  return { sum, items };
}
async function saveVoice(req, res, shop, b) {
  const v = await readVoice(shop);
  if (!v.on) return res.status(409).json({ error: 'off' });
  const stars = Math.round(Number(b.stars));
  if (!(stars >= 1 && stars <= 5)) return res.status(400).json({ error: 'stars' });
  // 테이블 QR(?t=&k=)로 들어온 손님만(캡틴 가-2, 2026-11-18): 가게 찾기·검색으로 들어온 사람이 가짜 불만으로 주방을 울리지 못하게
  const K = require('./_kitchen'), table = str(b.table, 12);
  if (!table || !L.safeEq(String(b.k || ''), K.tableKey(shop, table))) return res.status(403).json({ error: 'key' });
  const dev = L.ipHash(req) + '|' + String(req.headers['user-agent'] || '').slice(0, 120), now = Date.now();
  const hits = (vRecent.get(dev) || []).filter((t) => now - t < 30 * 60e3);
  if (hits.length >= 3) return res.status(429).json({ error: 'too_many' });
  hits.push(now); vRecent.set(dev, hits); if (vRecent.size > 5000) vRecent.clear();
  const text = str(b.text, 300), lang = str(b.lang, 5), tk = shop + '|' + K.tableNorm(table);
  let alerted = false;
  if (stars <= 3 && now - (vTable.get(tk) || 0) >= 20 * 60e3) { // 주방 화면에 '불만 알림'(주방 주문이 켜진 가게만). 실패해도 의견은 저장한다
    try {
      const bell = await K.readBell(shop);
      if (bell.on) { const id = K.newId(); await K.putFile(`${K.dir(shop)}/${L.dateOf()}/r-${id}.json`, JSON.stringify({ id, at: now, table, req: 'voice', stars, text, lang })); await K.bump(shop); alerted = true; vTable.set(tk, now); if (vTable.size > 5000) vTable.clear(); }
    } catch (e) { console.error('voice 알림 실패', shop, e && e.message); }
  }
  await S.put(`${vDir(shop)}${L.dateOf()}/${now}-${S.rand(3)}.${stars}.json`, JSON.stringify({ at: now, stars, text, table, lang, alerted }), { access: 'public', addRandomSuffix: false, contentType: 'application/json' });
  return res.json({ ok: true, alerted });
}

const readCfg = async (shop) => clean((await S.getSecret(cfgName(shop))) || { on: false });
// 손님에게 보이는 부분만(배너는 오늘 날짜가 기간 안일 때만)
function publicCfg(c) {
  const today = L.dateOf(), b = c.banner;
  const live = b.text && (!b.from || b.from <= today) && (!b.to || today <= b.to);
  return { on: c.on && !!c.reward, goal: c.goal, reward: c.reward, banner: live ? b.text : '', today };
}

async function count(shop, card) {
  const files = await S.listAll(cardDir(shop, card));
  const today = L.dateOf();
  let s = 0, u = 0, stampedToday = false;
  for (const f of files) {
    const name = f.pathname.slice(cardDir(shop, card).length);
    if (name.startsWith('s.')) { s++; if (name.startsWith('s.' + today + '.')) stampedToday = true; }
    else if (name.startsWith('u.')) u++;
  }
  return { files: files.length, s, u, stampedToday };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const from = cors(req, res);
  if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); res.setHeader('Access-Control-Allow-Headers', 'content-type'); return res.status(204).end(); }
  try {
    const q = req.query || {};
    if (req.method === 'GET') {
      const shop = String(q.shop || '');
      if (!L.validShop(shop)) return res.status(400).json({ error: 'bad_shop' });
      if (q.op === 'cfg' || q.op === 'code' || q.op === 'vcfg' || q.op === 'voices') { // 점주·관리자
        const actor = await L.actorFor(req, shop);
        if (actor === 'blocked') return res.status(429).json({ error: 'blocked' });
        if (actor !== 'owner' && actor !== 'admin') return res.status(401).json({ error: 'unauthorized' });
        if (q.op === 'vcfg') return res.json({ ok: true, cfg: await readVoice(shop) });
        if (q.op === 'voices') return res.json({ ok: true, ...(await voiceList(shop, Math.min(31, Math.max(1, Math.round(Number(q.days) || 7))))) });
        if (q.op === 'cfg') return res.json({ ok: true, cfg: await readCfg(shop) });
        const w = Math.floor(Date.now() / WIN);
        const base = (DEV() && process.env.LOYAL_MENU_URL) || `https://${shop}.qrmenuasia.com/`;
        return res.json({ ok: true, give: `${base}?stamp=${codeFor(shop, 'give', w)}`, use: `${base}?use=${codeFor(shop, 'use', w)}`, next: (w + 1) * WIN - Date.now() });
      }
      const c = publicCfg(await readCfg(shop));
      const card = String(q.card || '');
      if (!c.on || !CARD.test(card)) return res.json({ ...c, n: 0 });
      const k = await count(shop, card);
      return res.json({ ...c, n: k.s - k.u * c.goal, stampedToday: k.stampedToday, known: k.files > 0 });
    }
    if (req.method !== 'POST') return res.status(405).end();
    const b = L.readBody(req);
    const shop = String(b.shop || '');
    if (!L.validShop(shop)) return res.status(400).json({ error: 'bad_shop' });

    if (b.op === 'vcfg') {
      const actor = await L.actorFor(req, shop);
      if (actor === 'blocked') return res.status(429).json({ error: 'blocked' });
      if (actor !== 'owner' && actor !== 'admin') return res.status(401).json({ error: 'unauthorized' });
      if (str(b.review, 300) && !REVIEW.test(str(b.review, 300))) return res.status(400).json({ error: 'review_url' });
      const cfg = vClean(b);
      await S.setSecret(vName(shop), cfg);
      await L.logEvent(actor, 'voice-cfg', shop, cfg.on ? 'on' : 'off');
      return res.json({ ok: true, cfg });
    }
    if (b.op === 'cfg') {
      const actor = await L.actorFor(req, shop);
      if (actor === 'blocked') return res.status(429).json({ error: 'blocked' });
      if (actor !== 'owner' && actor !== 'admin') return res.status(401).json({ error: 'unauthorized' });
      const cfg = clean(b);
      await S.setSecret(cfgName(shop), cfg);
      await L.logEvent(actor, 'loyal-cfg', shop, cfg.on ? 'on' : 'off');
      return res.json({ ok: true, cfg });
    }

    // 손님 요청: 그 가게 주소에서 온 것만
    if (from !== shop && from !== '*') return res.status(403).json({ error: 'origin' });
    const dev = L.ipHash(req), now = Date.now();
    const hits = (recent.get(dev) || []).filter((t) => now - t < 10 * 60e3);
    if (hits.length >= 30) return res.status(429).json({ error: 'too_many' });
    hits.push(now); recent.set(dev, hits);
    if (recent.size > 5000) recent.clear();
    if (b.op === 'voice') return await saveVoice(req, res, shop, b);

    const cfg = await readCfg(shop), pc = publicCfg(cfg);
    if (!pc.on) return res.status(409).json({ error: 'off' });
    let card = String(b.card || '');

    if (b.op === 'restore') {
      if (!CARD.test(card)) return res.status(400).json({ error: 'card' });
      const k = await count(shop, card);
      if (!k.files) return res.status(404).json({ error: 'no_card' });
      return res.json({ ok: true, card, n: k.s - k.u * cfg.goal, goal: cfg.goal });
    }
    if (b.op === 'stamp') {
      if (!okCode(shop, 'give', b.code)) return res.status(410).json({ error: 'expired' });
      if (!CARD.test(card)) card = newCard();
      const k = await count(shop, card);
      if (k.stampedToday) return res.json({ ok: true, dup: true, card, n: k.s - k.u * cfg.goal, goal: cfg.goal });
      await S.put(`${cardDir(shop, card)}s.${L.dateOf()}.${S.rand(3)}`, '1', { access: 'public', addRandomSuffix: false });
      return res.json({ ok: true, card, n: k.s + 1 - k.u * cfg.goal, goal: cfg.goal });
    }
    if (b.op === 'use') {
      if (!okCode(shop, 'use', b.code)) return res.status(410).json({ error: 'expired' });
      if (!CARD.test(card)) return res.status(400).json({ error: 'card' });
      const k = await count(shop, card), n = k.s - k.u * cfg.goal;
      if (n < cfg.goal) return res.status(409).json({ error: 'not_enough', n, goal: cfg.goal });
      await S.put(`${cardDir(shop, card)}u.${now}.${S.rand(3)}`, '1', { access: 'public', addRandomSuffix: false });
      return res.json({ ok: true, used: true, card, n: n - cfg.goal, goal: cfg.goal, reward: cfg.reward });
    }
    return res.status(400).json({ error: 'bad_op' });
  } catch (e) {
    console.error('loyal 실패', e && e.message);
    return res.status(500).json({ error: 'failed', why: String((e && e.message) || e).slice(0, 80) });
  }
};

module.exports.readCfg = readCfg;
module.exports.publicCfg = publicCfg;
module.exports.readVoice = readVoice;
