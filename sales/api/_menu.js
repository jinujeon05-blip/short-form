// 점주·관리자가 고치는 메뉴 데이터의 검사·번역·기본값 읽기
const vm = require('vm');
const { translate } = require('./_ai');

const LANGS = ['ko', 'en', 'zh', 'ja', 'vi'];
const str = (v, max = 300) => (typeof v === 'string' ? v.slice(0, max) : '');
const BLOB_HOST = /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\//;
const photoOk = (u) => (typeof u === 'string' && BLOB_HOST.test(u) ? u.slice(0, 400) : undefined);

function cleanText(o, max = 300) {
  const t = {};
  for (const l of LANGS) t[l] = str(o && o[l], max);
  for (const k of ['_auto', '_pending']) if (o && Array.isArray(o[k])) { const a = o[k].filter((l) => LANGS.includes(l)); if (a.length) t[k] = a; }
  return t;
}

function cleanItem(it) {
  const out = { name: cleanText(it.name, 120) };
  out.price = it.price === null || it.price === '' || it.price === undefined ? null : Math.max(0, Math.round(Number(it.price)) || 0);
  if (it.desc && LANGS.some((l) => str(it.desc[l]))) out.desc = cleanText(it.desc, 300);
  if (it.unit && typeof it.unit === 'object') out.unit = cleanText(it.unit, 40);
  if (it.spicy) out.spicy = true;
  if (['best', 'new', 'special'].includes(it.tag)) out.tag = it.tag;
  if (Array.isArray(it.sizes)) out.sizes = it.sizes.slice(0, 8).map((s) => [cleanText(s[0], 60), Math.max(0, Math.round(Number(s[1])) || 0)]);
  if (it.dessert) out.dessert = Math.max(0, Math.round(Number(it.dessert)) || 0);
  const p = photoOk(it.photo); if (p) out.photo = p;
  return out;
}

function cleanMenu(menu) {
  if (!Array.isArray(menu) || menu.length > 40) throw new Error('bad_menu');
  return menu.map((c, i) => {
    const cat = { id: str(c.id, 30).replace(/[^a-zA-Z0-9_-]/g, '') || 'c' + i, name: cleanText(c.name, 80), items: (Array.isArray(c.items) ? c.items : []).slice(0, 300).map(cleanItem) };
    if (c.note && LANGS.some((l) => str(c.note[l]))) cat.note = cleanText(c.note, 300);
    const p = photoOk(c.photo); if (p) cat.photo = p; else if (typeof c.photo === 'string' && /^img\/[\w./-]+$/.test(c.photo)) cat.photo = c.photo; // 기존 가게 사진은 그대로
    return cat;
  });
}

function cleanInfo(info) {
  const o = {};
  if (info && typeof info === 'object') {
    if (typeof info.phone === 'string') o.phone = str(info.phone, 30) || null;
    if (typeof info.address === 'string') o.address = str(info.address, 160);
    if (info.wifi === null) o.wifi = null;
    else if (info.wifi && typeof info.wifi === 'object') o.wifi = { ssid: str(info.wifi.ssid, 40), password: str(info.wifi.password, 40) };
  }
  return o;
}

// 비어 있는(또는 번역 대기인) 언어를 자동 번역으로 채운다. 번역이 안 되면 원문을 임시로 채워 화면이 비지 않게 하고 _pending 으로 표시.
async function fillTranslations(req, menu, srcLang) {
  const src = LANGS.includes(srcLang) ? srcLang : 'vi';
  const objs = [];
  for (const c of menu) {
    objs.push(c.name); if (c.note) objs.push(c.note);
    for (const it of c.items) { objs.push(it.name); if (it.desc) objs.push(it.desc); }
  }
  const jobs = [], refs = [];
  for (const o of objs) {
    const text = o[src];
    if (!text) continue;
    const need = LANGS.filter((l) => l !== src && (!o[l] || (o._pending || []).includes(l)));
    if (!need.length) continue;
    jobs.push({ text, from: src, to: need }); refs.push(o);
  }
  if (jobs.length > 250) throw new Error('too_many');
  const r = await translate(req, jobs);
  let done = 0, pending = 0;
  refs.forEach((o, i) => {
    const pend = new Set();
    for (const l of jobs[i].to) {
      const v = r.out[i][l];
      if (v) { o[l] = v; done++; o._auto = [...new Set([...(o._auto || []), l])]; }
      else { o[l] = o[l] || o[src]; pend.add(l); pending++; }
    }
    if (pend.size) o._pending = [...pend]; else delete o._pending;
  });
  return { done, pending, ok: r.ok, why: r.why };
}

// 가게 메뉴판의 기본 menu.js 를 읽어 MENU·RESTAURANT 를 꺼낸다 (우리 서버의 자기 도메인 파일만 읽는다)
async function loadDefault(shop) {
  const r = await fetch(`https://${shop}.qrmenuasia.com/menu.js?x=${Date.now()}`);
  if (!r.ok) throw new Error('no_default');
  const code = await r.text();
  const sandbox = { window: {}, console: { log() {} } };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { timeout: 1000 });
  const w = JSON.parse(JSON.stringify(sandbox.window));
  const R = w.RESTAURANT || {};
  return { menu: w.MENU || [], info: { phone: R.phone ?? null, address: R.address || '', wifi: R.wifi ?? null } };
}

module.exports = { LANGS, cleanMenu, cleanInfo, fillTranslations, loadDefault };
