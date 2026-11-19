// 점주 로그인(POST: {shop, password} → 12시간짜리 열쇠) · 방문 리포트 링크(GET: ?shop= + x-owner-token)
// · 매출(GET: ?shop=&op=sales&from=&to=, 점주 또는 관리자 x-admin-key) — 주방 주문 기록으로 날짜별 주문 수·음식별 수량·매출
const L = require('./_lib');
const S = require('./_store');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    try {
      const shop = String((req.query && req.query.shop) || '');
      if (!L.validShop(shop)) return res.status(400).json({ error: 'bad_shop' });
      const actor = await L.actorFor(req, shop);
      if (actor === 'blocked') return res.status(429).json({ error: 'blocked' });
      if (actor !== 'owner' && actor !== 'admin') return res.status(401).json({ error: 'unauthorized' });
      if (req.query.op === 'sales') { // 매출: ?op=sales&from=YYYY-MM-DD&to=YYYY-MM-DD (베트남 날짜, 최대 93일, 오늘 뒤는 잘라 냄)
        const D = /^\d{4}-\d{2}-\d{2}$/, today = L.dateOf();
        let from = String(req.query.from || ''), to = String(req.query.to || '');
        if (!D.test(from) || !D.test(to) || isNaN(Date.parse(from)) || isNaN(Date.parse(to))) return res.status(400).json({ error: 'bad_date' });
        if (to > today) to = today;
        if (from > to) return res.json({ ok: true, from, to, today, days: [] });
        if ((Date.parse(to) - Date.parse(from)) / 86400000 > 92) return res.status(400).json({ error: 'too_long' });
        const days = await require('./_kitchen').salesRange(shop, from, to);
        return res.json({ ok: true, from, to, today, days });
      }
      return res.json({ ok: true, report: '/report/?shop=' + shop + '&days=30&t=' + L.reportToken(shop) });
    } catch (e) {
      console.error('owner 실패', e && e.message);
      return res.status(500).json({ error: 'failed' });
    }
  }
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { shop, password } = L.readBody(req);
    if (!L.validShop(shop) || !password) return res.status(400).json({ error: 'bad_request' });
    if (await L.isBlocked(req)) return res.status(429).json({ error: 'blocked' });
    const rec = await S.getSecret(`sec/owners/${shop}`);
    const ok = rec && L.safeEq(L.hashPw(String(password).trim(), rec.salt), rec.hash);
    if (!ok) { await L.addFail(req).catch(() => {}); return res.status(401).json({ error: 'wrong' }); }
    await L.logEvent('owner', 'login', shop);
    return res.json({ ok: true, token: L.ownerToken(shop) });
  } catch (e) {
    console.error('owner 실패', e && e.message);
    return res.status(500).json({ error: 'failed' });
  }
};
