// 주방 화면(태블릿·폰) API + 관리자 설정. ?action= 으로 구분한다.
// 주방 기기 (헤더 x-kitchen-token, 로그인만 열쇠 없음):
//   POST login     {shop, pin}            → { token }  (60일)
//   GET  poll      ?shop=&since=<ts>      → 바뀐 게 없으면 { same:true }, 있으면 { ts, cfg, orders:[{id,url,status}] }
//   POST status    {shop, id, status}     cooking | done | cancel
//   POST beat      {shop, device, name, printer}  5분마다 "켜져 있어요"
// 관리자 (헤더 x-admin-key):
//   GET  k-get     ?shop=                 → 설정·PIN 여부·기기 목록·오늘 주문 수
//   POST k-set     {shop, patch}          주문 받기 켜기/끄기, 테이블 QR 열쇠, 확인 간격, 기본 프린터
//   POST k-pin     {shop}                 주방 PIN 새로 만들기(한 번만 보여 줌, 기존 기기 모두 로그아웃)
//   POST k-logout  {shop}                 모든 주방 기기 로그아웃
//   POST k-tables  {shop, from, to}       테이블별 QR 주소(열쇠 포함)
//   POST k-test    {shop}                 시험 주문 1건 넣기
const L = require('./_lib');
const S = require('./_store');
const K = require('./_kitchen');

const str = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : '');
const ID = /^[0-9]+-[a-f0-9]+$/;

async function kitchenApi(req, res, action) {
  if (action === 'login') {
    if (req.method !== 'POST') return res.status(405).end();
    const { shop, pin } = L.readBody(req);
    if (!L.validShop(shop) || !pin) return res.status(400).json({ error: 'bad_request' });
    if (await L.isBlocked(req)) return res.status(429).json({ error: 'blocked' });
    const rec = await S.getSecret(`sec/kitchen/${shop}`);
    const ok = rec && L.safeEq(L.hashPw(String(pin).replace(/\s/g, ''), rec.salt), rec.hash);
    if (!ok) { await L.addFail(req).catch(() => {}); return res.status(401).json({ error: 'wrong' }); }
    const bell = await K.readBell(shop);
    await L.logEvent('kitchen', 'k-login', shop);
    return res.json({ ok: true, token: K.kitchenToken(shop, bell.gen) });
  }
  const shop = String((req.method === 'GET' ? req.query.shop : L.readBody(req).shop) || '');
  if (!L.validShop(shop)) return res.status(400).json({ error: 'bad_shop' });
  const bell = await K.readBell(shop);
  if (!K.verifyKitchen(req.headers['x-kitchen-token'], shop, bell.gen)) return res.status(401).json({ error: 'unauthorized' });
  const cfg = { on: bell.on, poll: bell.poll, printer: bell.printer, paper: bell.paper };

  if (action === 'poll') {
    const since = Number(req.query.since) || 0;
    if (since && bell.ts && bell.ts <= since) return res.json({ same: true, ts: bell.ts, cfg });
    return res.json({ ts: bell.ts || Date.now(), cfg, orders: await K.listOrders(shop) });
  }
  if (req.method !== 'POST') return res.status(405).end();
  const body = L.readBody(req);
  if (action === 'status') {
    if (!ID.test(String(body.id)) || !K.STATUSES.includes(body.status)) return res.status(400).json({ error: 'bad_request' });
    await K.putFile(`${K.dir(shop)}/${K.dateOfId(body.id)}/s-${body.id}.${body.status}`, '1', 'text/plain');
    await K.touch(shop, bell);
    return res.json({ ok: true });
  }
  if (action === 'beat') {
    const dev = String(body.device || '').replace(/[^a-z0-9]/gi, '').slice(0, 16);
    if (!dev) return res.status(400).json({ error: 'bad_request' });
    await K.putFile(`${K.dir(shop)}/dev/${dev}.json`, JSON.stringify({ name: str(body.name, 40), printer: str(body.printer, 12), ua: str(String(req.headers['user-agent'] || ''), 160), at: Date.now() }));
    return res.json({ ok: true, cfg });
  }
  return res.status(400).json({ error: 'bad_action' });
}

async function adminApi(req, res, action) {
  const actor = await L.actorFor(req, '');
  if (actor === 'blocked') return res.status(429).json({ error: 'blocked' });
  if (actor !== 'admin') return res.status(401).json({ error: 'unauthorized' });
  const body = req.method === 'POST' ? L.readBody(req) : {};
  const shop = String((req.method === 'GET' ? req.query.shop : body.shop) || '');
  if (!L.validShop(shop)) return res.status(400).json({ error: 'bad_shop' });
  const bell = await K.readBell(shop);

  if (action === 'k-get') {
    const base = K.dir(shop), devices = [];
    for (const b of await S.listAll(`${base}/dev/`)) {
      try { const r = await fetch(b.url + '?v=' + S.ts(b), { cache: 'no-store' }); if (r.ok) devices.push({ id: b.pathname.split('/').pop().replace(/\.json$/, ''), ...(await r.json()) }); } catch {}
    }
    const orders = await K.listOrders(shop), today = L.dateOf();
    const todayCount = orders.filter((o) => K.dateOfId(o.id) === today).length;
    return res.json({ cfg: { on: bell.on, needKey: bell.needKey, poll: bell.poll, printer: bell.printer, paper: bell.paper }, hasPin: await S.hasSecret(`sec/kitchen/${shop}`), devices: devices.sort((a, b) => b.at - a.at), todayCount, lastOrder: bell.ts || 0 });
  }
  if (req.method !== 'POST') return res.status(405).end();
  if (action === 'k-set') {
    const p = body.patch || {}, next = { ...bell };
    if (typeof p.on === 'boolean') next.on = p.on;
    if (typeof p.needKey === 'boolean') next.needKey = p.needKey;
    if ([5, 10, 15, 20, 30].includes(p.poll)) next.poll = p.poll;
    if (['rawbt', 'browser', 'none'].includes(p.printer)) next.printer = p.printer;
    if ([58, 80].includes(p.paper)) next.paper = p.paper;
    await K.touch(shop, next);
    await L.logEvent('admin', 'k-set', shop);
    return res.json({ ok: true });
  }
  if (action === 'k-pin') {
    const pin = String(require('crypto').randomInt(0, 1e6)).padStart(6, '0');
    const salt = S.rand(8);
    await S.setSecret(`sec/kitchen/${shop}`, { salt, hash: L.hashPw(pin, salt), createdAt: Date.now() });
    await K.touch(shop, bell, { gen: (bell.gen || 1) + 1 });
    await L.logEvent('admin', 'k-pin', shop);
    return res.json({ ok: true, pin });
  }
  if (action === 'k-logout') {
    await K.touch(shop, bell, { gen: (bell.gen || 1) + 1 });
    await S.remove(`${K.dir(shop)}/dev/`);
    await L.logEvent('admin', 'k-logout', shop);
    return res.json({ ok: true });
  }
  if (action === 'k-tables') {
    const from = Math.max(1, parseInt(body.from, 10) || 1), to = Math.min(from + 99, Math.max(from, parseInt(body.to, 10) || from));
    const rows = [];
    for (let t = from; t <= to; t++) rows.push({ table: String(t), url: `https://${shop}.qrmenuasia.com/?t=${t}&k=${K.tableKey(shop, t)}&utm_source=qr` });
    return res.json({ ok: true, rows });
  }
  if (action === 'k-test') {
    const today = L.dateOf(), id = K.newId(), no = bell.seqDate === today ? bell.seq + 1 : 1;
    const order = { id, no, at: Date.now(), table: 'TEST', note: '시험 주문입니다 · Đơn thử nghiệm', lang: 'ko', currency: '₫', test: true,
      items: [{ name: 'Món thử nghiệm A', sub: '시험 메뉴 A', q: 2, price: 200000 }, { name: 'Món thử nghiệm B', sub: '시험 메뉴 B', q: 1, price: null }], total: 200000, market: true };
    await K.putFile(`${K.dir(shop)}/${today}/o-${id}.json`, JSON.stringify(order));
    await K.touch(shop, bell, { seqDate: today, seq: no });
    await L.logEvent('admin', 'k-test', shop);
    return res.json({ ok: true, no });
  }
  return res.status(400).json({ error: 'bad_action' });
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const action = String((req.query && req.query.action) || '');
  try {
    if (action.startsWith('k-')) return await adminApi(req, res, action);
    return await kitchenApi(req, res, action);
  } catch (e) {
    console.error('kitchen 실패', action, e && e.message);
    return res.status(500).json({ error: 'failed' });
  }
};
