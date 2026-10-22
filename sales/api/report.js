// 사장님께 보내는 월간 리포트 데이터. 로그인 대신 가게별 비밀 링크 열쇠(t)로 연다.
const L = require('./_lib');
const S = require('./_store');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const shop = String(req.query.shop || '');
  if (!L.validShop(shop) || !L.safeEq(String(req.query.t || ''), L.reportToken(shop))) return res.status(401).json({ error: 'unauthorized' });
  try {
    const days = Math.min(Math.max(parseInt(req.query.days, 10) || 30, 1), 92);
    const now = Date.now();
    const dates = [];
    for (let i = days - 1; i >= 0; i--) dates.push(L.dateOf(now - i * 86400000));
    const lists = await Promise.all(dates.map(async (d) => (await S.listAll(`hits/${d}/${shop}/`)).map((b) => b.pathname)));
    const agg = L.aggregate(lists.flat(), dates);
    return res.json({ generatedAt: new Date().toISOString(), shop, dates, data: agg.shops[shop] || { pv: 0, vis: 0, days: {}, lang: {}, dev: {}, src: {}, cc: {} } });
  } catch (e) {
    console.error('report 실패', e && e.message);
    return res.status(500).json({ error: 'failed' });
  }
};
