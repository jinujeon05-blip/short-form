// 방문 기록 받는 곳. 메뉴판 페이지가 sendBeacon 으로 보낸다 (POST, 본문은 글자 JSON).
const { put } = require('@vercel/blob');
const L = require('./_lib');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Headers', 'content-type'); return res.status(204).end(); }
  if (req.method !== 'POST') return res.status(405).end();
  try {
    let b = req.body;
    if (typeof b === 'string') b = JSON.parse(b || '{}');
    b = b && typeof b === 'object' ? b : {};
    const ua = String(req.headers['user-agent'] || '');
    if (!ua || L.BOT.test(ua)) return res.status(204).end(); // 로봇 제외
    const shop = L.shopFrom(String(b.h || '').slice(0, 80), String(b.p || '').slice(0, 120));
    if (!shop) return res.status(204).end();
    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
    const date = L.dateOf();
    let refHost = '';
    try { refHost = new URL(String(b.r || '')).hostname; } catch {}
    const hit = {
      date, shop,
      vid: L.visitorId(ip, ua, date, shop),
      lang: String(b.l || '').slice(0, 8),
      cc: String(req.headers['x-vercel-ip-country'] || '').slice(0, 2),
      dev: L.deviceOf(ua, Number(b.w) || 0),
      src: L.srcOf(String(b.s || ''), refHost || String(b.r || ''), String(b.h || '')),
    };
    await put(L.encodeHit(hit), '1', { access: 'public', addRandomSuffix: false, contentType: 'text/plain' });
    return res.status(204).end();
  } catch (e) {
    console.error('hit 실패', e && e.message);
    return res.status(204).end(); // 손님 화면에는 영향 없게 항상 성공으로 답한다
  }
};
