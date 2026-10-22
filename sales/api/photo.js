// 사진 올리기: 본문은 이미지 파일 그대로(브라우저가 미리 줄여서 보냄). 관리자 또는 그 가게 점주만.
const L = require('./_lib');
const S = require('./_store');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  const shop = String(req.query.shop || '');
  if (!L.validShop(shop)) return res.status(400).json({ error: 'bad_shop' });
  const actor = await L.actorFor(req, shop);
  if (actor === 'blocked') return res.status(429).json({ error: 'blocked' });
  if (!actor) return res.status(401).json({ error: 'unauthorized' });
  try {
    const chunks = [];
    let size = 0;
    for await (const c of req) { size += c.length; if (size > 4_000_000) return res.status(413).json({ error: 'too_big' }); chunks.push(c); }
    const buf = Buffer.concat(chunks);
    const isJpg = buf[0] === 0xff && buf[1] === 0xd8;
    const isPng = buf[0] === 0x89 && buf[1] === 0x50;
    const isWebp = buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP';
    if (!(isJpg || isPng || isWebp)) return res.status(400).json({ error: 'bad_image' });
    const ext = isJpg ? 'jpg' : isPng ? 'png' : 'webp';
    const type = isJpg ? 'image/jpeg' : isPng ? 'image/png' : 'image/webp';
    const b = await S.put(`photos/${shop}/${Date.now()}-${S.rand(3)}.${ext}`, buf, { access: 'public', addRandomSuffix: false, contentType: type, cacheControlMaxAge: 31536000 });
    await L.logEvent(actor, 'photo', shop);
    return res.json({ ok: true, url: b.url });
  } catch (e) {
    console.error('photo 실패', e && e.message);
    return res.status(500).json({ error: 'failed' });
  }
};
module.exports.config = { api: { bodyParser: false } };
