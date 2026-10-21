// 관리 화면용 집계. 비밀번호(x-admin-key)가 맞아야만 답한다.
const { list } = require('@vercel/blob');
const L = require('./_lib');

async function listDay(date) {
  const out = [];
  let cursor;
  do {
    const r = await list({ prefix: `hits/${date}/`, limit: 1000, cursor });
    for (const b of r.blobs) out.push(b.pathname);
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  return out;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!L.checkAdmin(req)) return res.status(401).json({ error: 'unauthorized' });
  try {
    const days = Math.min(Math.max(parseInt(req.query.days, 10) || 30, 1), 92);
    const now = Date.now();
    const dates = [];
    for (let i = days - 1; i >= 0; i--) dates.push(L.dateOf(now - i * 86400000));
    const lists = await Promise.all(dates.map(listDay));
    return res.status(200).json({ generatedAt: new Date().toISOString(), ...L.aggregate(lists.flat(), dates) });
  } catch (e) {
    console.error('stats 실패', e && e.message);
    return res.status(500).json({ error: 'failed' });
  }
};
