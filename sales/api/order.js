// 손님 → 주방 주문 받기 (가게 메뉴판의 order.js 가 부른다. 가게 주소가 달라서 CORS 허용)
//   GET  ?shop=        → { on, needKey }  이 가게가 주방 주문을 받는지 (주문서를 열 때 한 번)
//   POST {shop, table, k, note, lang, currency, items:[{name, sub, q, price}]} → { ok, no }
// 미리 보내는 확인(preflight)을 피하려고 손님 화면은 content-type: text/plain 으로 보낸다.
const L = require('./_lib');
const K = require('./_kitchen');

const ORIGIN = /^https:\/\/([a-z0-9]+)\.qrmenuasia\.com$|^https:\/\/([a-z0-9]+)-menu\.vercel\.app$/;
const DEV = () => process.env.KITCHEN_DEV === '1'; // 로컬 시험에서만 localhost 허용
const recent = new Map(); // 같은 기기(IP)가 너무 자주 보내면 막기(서버 한 대 안에서만, 간단한 장난 방지)

function cors(req, res) {
  const o = String(req.headers.origin || '');
  const m = o.match(ORIGIN);
  if (m || (DEV() && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o))) { res.setHeader('Access-Control-Allow-Origin', o); res.setHeader('Vary', 'Origin'); }
  return { origin: o, shop: m ? m[1] || m[2] : null };
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
      return res.json({ on: !!bell.on, needKey: !!bell.needKey });
    }
    if (req.method !== 'POST') return res.status(405).end();
    const body = L.readBody(req);
    const shop = String(body.shop || '');
    if (!L.validShop(shop)) return res.status(400).json({ error: 'bad_shop' });
    if (from.origin && !from.shop && !DEV()) return res.status(403).json({ error: 'origin' });
    if (from.shop && from.shop !== shop) return res.status(403).json({ error: 'origin' });

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
    const no = bell.seqDate === today ? bell.seq + 1 : 1; // 오늘의 주문 번호(동시에 들어오면 같은 번호가 나올 수 있음, 주문 자체는 따로 저장됨)
    await K.putFile(`${K.dir(shop)}/${today}/o-${id}.json`, JSON.stringify({ id, no, at: now, ...order }));
    await K.touch(shop, bell, { seqDate: today, seq: no });
    return res.json({ ok: true, no, id });
  } catch (e) {
    console.error('order 실패', e && e.message);
    return res.status(500).json({ error: 'failed' });
  }
};
