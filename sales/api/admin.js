// 관리자 전용 기능 모음 (헤더 x-admin-key). ?action= 으로 구분한다.
//   crm-get / crm-set    가게별 영업 상태·연락처·메모·진행 기록 (비밀 저장소 sec/crm)
//   owner-pw / owner-pw-off  점주 비밀번호 새로 만들기(한 번만 보여 줌) / 끄기
//   log-list             최근 활동 기록
//   report-link          사장님께 보낼 월간 리포트 링크
const L = require('./_lib');
const S = require('./_store');

const STATUS = ['listing', 'pitched', 'talking', 'contracted', 'paused'];
const str = (v, n) => (typeof v === 'string' ? v.slice(0, n) : '');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const actor = await L.actorFor(req, '');
  if (actor === 'blocked') return res.status(429).json({ error: 'blocked' });
  if (actor !== 'admin') return res.status(401).json({ error: 'unauthorized' });
  const action = String(req.query.action || '');
  try {
    if (action === 'crm-get') {
      const crm = await S.getSecret('sec/crm', { shops: {} });
      const owners = {};
      for (const b of await S.listAll('sec/owners/')) { const m = b.pathname.match(/^sec\/owners\/([a-z0-9]+)-/); if (m) owners[m[1]] = S.ts(b); }
      const custom = {};
      for (const b of await S.listAll('menu/')) { const m = b.pathname.match(/^menu\/([a-z0-9]+)\.json$/); if (m) custom[m[1]] = S.ts(b); }
      return res.json({ crm, owners, custom });
    }
    if (action === 'log-list') {
      const days = [0, 1, 2].map((i) => L.dateOf(Date.now() - i * 86400000));
      const rows = [];
      for (const d of days) for (const b of await S.listAll(`log/${d}/`)) {
        const f = b.pathname.split('/')[2].split('.');
        rows.push({ ts: Number(f[0]), actor: f[1], action: f[2], shop: f[3] });
      }
      const fails = (await S.listAll(`sec/fail/${new Date().toISOString().slice(0, 13).replace(/[^0-9]/g, '')}/`)).length;
      return res.json({ rows: rows.sort((a, b) => b.ts - a.ts).slice(0, 120), failsThisHour: fails });
    }
    if (req.method !== 'POST') return res.status(405).end();
    const body = L.readBody(req);
    const shop = String(body.shop || '');
    if (!L.validShop(shop)) return res.status(400).json({ error: 'bad_shop' });
    if (action === 'crm-set') {
      const crm = await S.getSecret('sec/crm', { shops: {} });
      const cur = (crm.shops[shop] ||= { status: 'listing', contact: {}, memo: '', next: '', fee: '', history: [] });
      const p = body.patch || {};
      if (STATUS.includes(p.status)) cur.status = p.status;
      if (p.contact && typeof p.contact === 'object') cur.contact = { name: str(p.contact.name, 60), phone: str(p.contact.phone, 40), zalo: str(p.contact.zalo, 40), kakao: str(p.contact.kakao, 40), note: str(p.contact.note, 200) };
      if (typeof p.memo === 'string') cur.memo = str(p.memo, 2000);
      if (typeof p.next === 'string') cur.next = /^\d{4}-\d{2}-\d{2}$/.test(p.next) ? p.next : '';
      if (typeof p.fee === 'string') cur.fee = str(p.fee, 60);
      if (body.note && String(body.note).trim()) { cur.history = [{ ts: Date.now(), text: str(String(body.note).trim(), 300) }, ...(cur.history || [])].slice(0, 100); }
      await S.setSecret('sec/crm', crm);
      await L.logEvent('admin', 'crm', shop);
      return res.json({ ok: true, entry: cur });
    }
    if (action === 'owner-pw') {
      const password = L.newPassword();
      const salt = S.rand(8);
      await S.setSecret(`sec/owners/${shop}`, { salt, hash: L.hashPw(password, salt), createdAt: Date.now() });
      await L.logEvent('admin', 'owner-pw', shop);
      return res.json({ ok: true, password });
    }
    if (action === 'owner-pw-off') {
      await S.remove(`sec/owners/${shop}-`);
      await L.logEvent('admin', 'owner-off', shop);
      return res.json({ ok: true });
    }
    if (action === 'report-link') {
      const days = Math.min(Math.max(parseInt(body.days, 10) || 30, 7), 92);
      return res.json({ ok: true, url: `https://qrmenuasia.com/report/?shop=${shop}&days=${days}&t=${L.reportToken(shop)}` });
    }
    return res.status(400).json({ error: 'bad_action' });
  } catch (e) {
    console.error('admin 실패', action, e && e.message);
    return res.status(500).json({ error: 'failed' });
  }
};
