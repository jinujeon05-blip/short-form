// 손님 → 주방 주문 받기 (가게 메뉴판의 order.js 가 부른다. 가게 주소가 달라서 CORS 허용)
//   GET  ?shop=        → { on, needKey }  이 가게가 주방 주문을 받는지 (주문서를 열 때 한 번)
//   GET  ?shop=&bill=<테이블>&k=  → 손님용 '우리 테이블 주문 내역' { on, orders:[{no, at, status, items, total}], total, market, currency }
//   POST {shop, table, k, note, lang, currency, items:[{name, sub, key, q, price}]} → { ok, no }
//   POST {shop, kind:'call', table, k, req, lang}  → 직원 호출(req = water·refill·ice·utensils·bill·staff) { ok }
// 미리 보내는 확인(preflight)을 피하려고 손님 화면은 content-type: text/plain 으로 보낸다.
const L = require('./_lib');
const K = require('./_kitchen');

const ORIGIN = /^https:\/\/([a-z0-9]+)\.qrmenuasia\.com$|^https:\/\/([a-z0-9]+)-menu\.vercel\.app$/;
const DEV = () => process.env.KITCHEN_DEV === '1'; // 로컬 시험에서만 localhost 허용
const recent = new Map(); // 같은 기기(IP)가 너무 자주 보내면 막기(서버 한 대 안에서만, 간단한 장난 방지)
const recentCall = new Map(); // 직원 호출: 기기당 10분 12번, 같은 테이블·같은 요청은 40초 안에 다시 오면 한 번으로 친다
const lastCall = new Map();
const okKey = (bell, shop, table, k) => !bell.needKey || L.safeEq(String(k || ''), K.tableKey(shop, table));

function cors(req, res) {
  const o = String(req.headers.origin || '');
  const m = o.match(ORIGIN);
  if (m || (DEV() && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o))) { res.setHeader('Access-Control-Allow-Origin', o); res.setHeader('Vary', 'Origin'); }
  return { origin: o, shop: m ? m[1] || m[2] : null };
}

// 직원 호출: 주방 화면에 '5번 테이블 — 물' 띠와 소리. 주문과 같은 폴더(r-<id>.json), 주방이 [확인]하면 s-<id>.done
async function staffCall(req, res, shop, body) {
  const s = (v, n) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n) : '');
  const table = s(body.table, 12), what = String(body.req || '');
  if (!K.CALLS.includes(what)) return res.status(400).json({ error: 'bad_req' });
  if (!table) return res.status(400).json({ error: 'table' });
  const dev = L.ipHash(req) + '|' + String(req.headers['user-agent'] || '').slice(0, 120), now = Date.now();
  const hits = (recentCall.get(dev) || []).filter((t) => now - t < 10 * 60e3);
  if (hits.length >= 12) return res.status(429).json({ error: 'too_many' });
  if (recentCall.size > 5000) recentCall.clear();
  const bell = await K.readBell(shop);
  if (!bell.on) return res.status(409).json({ error: 'off' });
  if (!okKey(bell, shop, table, body.k)) return res.status(403).json({ error: 'key' });
  hits.push(now); recentCall.set(dev, hits);
  const same = `${shop}|${K.tableNorm(table)}|${what}`;
  if (now - (lastCall.get(same) || 0) < 40e3) return res.json({ ok: true, dup: true });
  if (lastCall.size > 5000) lastCall.clear();
  lastCall.set(same, now);
  const id = K.newId();
  await K.putFile(`${K.dir(shop)}/${L.dateOf()}/r-${id}.json`, JSON.stringify({ id, at: now, table, req: what, lang: s(body.lang, 5) }));
  await K.bump(shop);
  return res.json({ ok: true, id });
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const from = cors(req, res);
  if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); res.setHeader('Access-Control-Allow-Headers', 'content-type'); return res.status(204).end(); }
  try {
    if (req.method === 'GET') {
      const shop = String((req.query && req.query.shop) || '');
      if (!L.validShop(shop)) return res.status(400).json({ error: 'bad_shop' });
      const bell = await K.readBell(shop);
      const q = req.query || {};
      if (q.bill != null) {
        const table = K.tableNorm(q.bill);
        if (!bell.on) return res.json({ on: false });
        if (!table) return res.status(400).json({ error: 'table' });
        if (!okKey(bell, shop, table, q.k)) return res.status(403).json({ error: 'key' });
        const b = await K.tableBill(shop, await K.stamp(shop), table);
        return res.json({ on: true, orders: b.orders, total: b.total, market: b.market, currency: b.currency });
      }
      return res.json({ on: !!bell.on, needKey: !!bell.needKey });
    }
    if (req.method !== 'POST') return res.status(405).end();
    const body = L.readBody(req);
    const shop = String(body.shop || '');
    if (!L.validShop(shop)) return res.status(400).json({ error: 'bad_shop' });
    if (from.origin && !from.shop && !DEV()) return res.status(403).json({ error: 'origin' });
    if (from.shop && from.shop !== shop) return res.status(403).json({ error: 'origin' });

    if (body.kind === 'call') return await staffCall(req, res, shop, body);

    // 가게 와이파이를 쓰는 손님들은 IP가 같아서 IP+브라우저 정보로 센다(한 기기 10분에 10건까지)
    const ip = L.ipHash(req) + '|' + String(req.headers['user-agent'] || '').slice(0, 120), now = Date.now();
    const hits = (recent.get(ip) || []).filter((t) => now - t < 10 * 60e3);
    if (hits.length >= 10) return res.status(429).json({ error: 'too_many' });
    if (recent.size > 5000) recent.clear();

    const bell = await K.readBell(shop);
    if (!bell.on) return res.status(409).json({ error: 'off' });
    const order = K.cleanOrder(body);
    if (!order.items.length) return res.status(400).json({ error: 'empty' });
    if (!order.table) return res.status(400).json({ error: 'table' });
    if (bell.needKey && !L.safeEq(String(body.k || ''), K.tableKey(shop, order.table))) return res.status(403).json({ error: 'key' });

    hits.push(now); recent.set(ip, hits);
    const today = L.dateOf(), id = K.newId();
    const no = await K.nextNo(shop, today); // 오늘의 주문 번호(동시에 들어오면 같은 번호가 나올 수 있음, 주문 자체는 따로 저장됨)
    await K.putFile(`${K.dir(shop)}/${today}/o-${id}.json`, JSON.stringify({ id, no, at: now, ...order }));
    await K.bump(shop);
    return res.json({ ok: true, no, id });
  } catch (e) {
    console.error('order 실패', e && e.message);
    return res.status(500).json({ error: 'failed' });
  }
};
