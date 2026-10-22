// 점주 로그인: {shop, password} → 12시간짜리 열쇠(token)
const L = require('./_lib');
const S = require('./_store');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
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
