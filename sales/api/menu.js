// 메뉴 편집 API — 관리자(x-admin-key) 또는 그 가게 점주(x-owner-token)만 쓸 수 있다.
//   GET  ?action=load&shop=      고친 메뉴가 있으면 그것, 없으면 가게 기본 메뉴
//   POST ?action=save&shop=      {menu, info, srcLang} → 검사·자동 번역 → 즉시 공개 + 기록 보관
//   GET  ?action=history&shop=   저장 기록 목록
//   POST ?action=restore&shop=   {path} 옛 기록으로 되돌리기
//   POST ?action=reset&shop=     고친 내용 지우고 기본 메뉴로 되돌리기
const L = require('./_lib');
const S = require('./_store');
const M = require('./_menu');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const shop = String(req.query.shop || '');
  if (!L.validShop(shop)) return res.status(400).json({ error: 'bad_shop' });
  const actor = await L.actorFor(req, shop);
  if (actor === 'blocked') return res.status(429).json({ error: 'blocked' });
  if (!actor) return res.status(401).json({ error: 'unauthorized' });
  const action = String(req.query.action || '');
  try {
    if (action === 'load') {
      const cur = await S.getJson(`menu/${shop}.json`);
      if (cur) {
        if (!cur.v) { try { const d = await M.loadDefault(shop); cur.menu = M.restoreFromDefault(cur.menu, d.menu); cur.repaired = true; } catch {} }
        return res.json({ source: 'custom', ...cur });
      }
      const d = await M.loadDefault(shop);
      return res.json({ source: 'default', menu: d.menu, info: d.info, srcLang: shop === 'baekcheon' ? 'ko' : 'vi', updatedAt: null });
    }
    if (action === 'history') {
      const l = (await S.listAll(`menu-hist/${shop}/`)).sort((a, b) => S.ts(b) - S.ts(a)).slice(0, 25);
      return res.json({ items: l.map((b) => ({ path: b.pathname, ts: S.ts(b) })) });
    }
    if (req.method !== 'POST') return res.status(405).end();
    const body = L.readBody(req);
    if (action === 'save') {
      let def; try { def = await M.loadDefault(shop); } catch { return res.status(503).json({ error: 'no_default' }); }
      const menu = M.cleanMenu(body.menu, def.menu);
      const info = M.cleanInfo(body.info);
      const srcLang = M.LANGS.includes(body.srcLang) ? body.srcLang : 'vi';
      const tr = await M.fillTranslations(req, menu, srcLang);
      const doc = { v: 2, menu, info, srcLang, updatedAt: Date.now(), by: actor };
      if (JSON.stringify(doc).length > 450000) return res.status(413).json({ error: 'too_big' });
      await S.setPublic(`menu/${shop}.json`, doc);
      await S.setPublic(`menu-hist/${shop}/${doc.updatedAt}.json`, doc);
      await L.logEvent(actor, 'menu-save', shop);
      return res.json({ ok: true, translated: tr.done, pending: tr.pending, translateOk: tr.ok, why: tr.why || null, ...doc });
    }
    if (action === 'restore') {
      const path = String(body.path || '');
      if (!path.startsWith(`menu-hist/${shop}/`)) return res.status(400).json({ error: 'bad_path' });
      const doc = await S.getJson(path);
      if (!doc) return res.status(404).json({ error: 'not_found' });
      if (!doc.v) { try { const d = await M.loadDefault(shop); doc.menu = M.restoreFromDefault(doc.menu, d.menu); } catch {} }
      const next = { ...doc, v: 2, updatedAt: Date.now(), by: actor };
      await S.setPublic(`menu/${shop}.json`, next);
      await S.setPublic(`menu-hist/${shop}/${next.updatedAt}.json`, next);
      await L.logEvent(actor, 'menu-restore', shop);
      return res.json({ ok: true, ...next });
    }
    if (action === 'reset') {
      await S.remove(`menu/${shop}.json`);
      await L.logEvent(actor, 'menu-reset', shop);
      return res.json({ ok: true });
    }
    return res.status(400).json({ error: 'bad_action' });
  } catch (e) {
    console.error('menu 실패', action, shop, e && e.message);
    return res.status(e.message === 'bad_menu' || e.message === 'too_many' ? 400 : 500).json({ error: e.message || 'failed' });
  }
};
