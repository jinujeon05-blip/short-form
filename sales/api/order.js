// 손님 → 주방 주문 받기 (가게 메뉴판의 order.js 가 부른다. 가게 주소가 달라서 CORS 허용)
//   GET  ?shop=        → { on, needKey }  이 가게가 주방 주문을 받는지 (메뉴판을 열 때 한 번)
//   GET  ?shop=&t=<테이블>&k=<QR 열쇠>  → { on, needKey, ticket:{table, tk, exp} | null, error? }  테이블 QR을 찍었을 때 '자리 표'(1시간) 받기
//   GET  ?shop=&tt=<테이블>&tk=  → { on, ticketOk }  폰에 남은 자리 표가 아직 되는지
//   GET  ?shop=&bill=<테이블>&tk=  → 손님용 '우리 테이블 주문 내역' { on, orders:[{id, no, at, status, items, total}], total, market, currency }
//   POST {shop, table, tk, note, lang, currency, items:[{name, sub, key, q, price}], edit?:{id, ek}} → { ok, no, id, ek, ticket }
//        edit = 주방이 아직 접수 안 한 내 주문을 고쳐 다시 보냄(예전 주문은 '손님 수정'으로 취소, 새 주문에 repl = 예전 번호)
//   POST {shop, kind:'cancel', table, tk, id, ek}  → 접수 전 내 주문 취소 { ok }  (접수 뒤면 409 taken)
//   POST {shop, kind:'call', table, tk, req, lang}  → 직원 호출(req = water·refill·ice·utensils·bill·staff) { ok }
// 자리 표(tk): 받은 뒤 1시간(주문하면 그때부터 다시 1시간) 또는 주방 [자리 정리]까지. 없거나 틀리면 403 key, 끝났으면 403 expired.
// 미리 보내는 확인(preflight)을 피하려고 손님 화면은 content-type: text/plain 으로 보낸다.
const L = require('./_lib');
const K = require('./_kitchen');

const ORIGIN = /^https:\/\/([a-z0-9]+)\.qrmenuasia\.com$|^https:\/\/([a-z0-9]+)-menu\.vercel\.app$/;
const DEV = () => process.env.KITCHEN_DEV === '1'; // 로컬 시험에서만 localhost 허용
const recent = new Map(); // 같은 기기(IP)가 너무 자주 보내면 막기(서버 한 대 안에서만, 간단한 장난 방지)
const recentCall = new Map(); // 직원 호출: 기기당 10분 12번, 같은 테이블·같은 요청은 40초 안에 다시 오면 한 번으로 친다
const lastCall = new Map();
const okKey = (bell, shop, table, k) => !bell.needKey || L.safeEq(String(k || ''), K.tableKey(shop, table));
// 자리 표 검사: 통과면 false, 아니면 403을 보내고 true
async function denyTicket(res, shop, table, tk) {
  const r = await K.checkTicket(shop, table, tk);
  if (r === 'ok') return false;
  res.status(403).json({ error: r === 'expired' ? 'expired' : 'key' });
  return true;
}
const ID = /^[0-9]+-[a-f0-9]+$/;

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
  if (await denyTicket(res, shop, table, body.tk)) return;
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

// 손님이 접수 전 내 주문 취소: 자리 표 + 그 주문의 수정 열쇠(보낸 폰에만 있음)가 맞아야. 접수 뒤면 409 taken
async function cancelMine(req, res, shop, body) {
  const id = String(body.id || ''), table = String(body.table || '').slice(0, 12);
  if (!ID.test(id)) return res.status(400).json({ error: 'bad_req' });
  const bell = await K.readBell(shop);
  if (!bell.on) return res.status(409).json({ error: 'off' });
  if (await denyTicket(res, shop, table, body.tk)) return;
  if (!L.safeEq(String(body.ek || ''), K.editKey(shop, id))) return res.status(403).json({ error: 'edit' });
  const g = await K.guestEditable(shop, id);
  if (!g.ok) return res.status(409).json({ error: g.error });
  const d = await fetch(g.url).then((r) => (r.ok ? r.json() : null)).catch(() => null);
  if (!d || K.tableNorm(d.table) !== K.tableNorm(table)) return res.status(403).json({ error: 'edit' });
  await K.guestCancel(shop, id, 'g');
  await K.bump(shop);
  return res.json({ ok: true });
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
        if (await denyTicket(res, shop, table, q.tk)) return;
        const b = await K.tableBill(shop, await K.stamp(shop), table);
        return res.json({ on: true, orders: b.orders, total: b.total, market: b.market, currency: b.currency });
      }
      if (q.t != null && bell.on) { // 테이블 QR을 찍음 → 자리 표(열쇠가 필요한 가게는 QR 열쇠가 맞아야)
        const table = String(q.t).replace(/[\u0000-\u001f]/g, '').trim().slice(0, 12);
        if (!K.tableNorm(table)) return res.json({ on: true, needKey: !!bell.needKey, ticket: null, error: 'table' });
        if (!okKey(bell, shop, table, q.k)) return res.json({ on: true, needKey: true, ticket: null, error: 'key' });
        return res.json({ on: true, needKey: !!bell.needKey, ticket: K.makeTicket(shop, table) });
      }
      if (q.tk != null && q.tt != null && bell.on) { // 손님 폰에 남은 자리 표가 아직 되는지(메뉴판을 다시 열 때·화면으로 돌아올 때)
        const r = await K.checkTicket(shop, String(q.tt).slice(0, 12), q.tk);
        return res.json({ on: true, needKey: !!bell.needKey, ticketOk: r === 'ok' });
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
    if (body.kind === 'cancel') return await cancelMine(req, res, shop, body);

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
    if (await denyTicket(res, shop, order.table, body.tk)) return;
    // 수정: 내 주문(열쇠 확인)이고 주방이 아직 접수 안 했을 때만. 예전 주문 번호를 새 주문에 적는다
    let old = null;
    if (body.edit) {
      const eid = String(body.edit.id || '');
      if (!ID.test(eid) || !L.safeEq(String(body.edit.ek || ''), K.editKey(shop, eid))) return res.status(403).json({ error: 'edit' });
      const g = await K.guestEditable(shop, eid);
      if (!g.ok) return res.status(409).json({ error: g.error });
      const d = await fetch(g.url).then((r) => (r.ok ? r.json() : null)).catch(() => null);
      if (!d || K.tableNorm(d.table) !== K.tableNorm(order.table)) return res.status(403).json({ error: 'edit' });
      old = { id: eid, no: d.no };
    }

    hits.push(now); recent.set(ip, hits);
    const today = L.dateOf(), id = K.newId();
    const no = await K.nextNo(shop, today); // 오늘의 주문 번호(동시에 들어오면 같은 번호가 나올 수 있음, 주문 자체는 따로 저장됨)
    await K.putFile(`${K.dir(shop)}/${today}/o-${id}.json`, JSON.stringify({ id, no, at: now, ...order, ...(old ? { repl: old.no } : {}) }));
    if (old) await K.guestCancel(shop, old.id, 'e');
    await K.bump(shop);
    // 주문하면 자리 표를 새로 준다(그때부터 다시 1시간). 수정·취소 열쇠(ek)는 이 폰에만
    return res.json({ ok: true, no, id, ek: K.editKey(shop, id), ticket: K.makeTicket(shop, order.table, now), ...(old ? { repl: old.no } : {}) });
  } catch (e) {
    console.error('order 실패', e && e.message);
    return res.status(500).json({ error: 'failed' });
  }
};
