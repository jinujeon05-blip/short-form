// 점주·관리자가 고치는 메뉴 데이터의 검사·번역·기본값 읽기
const vm = require('vm');
const { translate } = require('./_ai');

const LANGS = ['ko', 'en', 'zh', 'ja', 'vi'];
const str = (v, max = 300) => (typeof v === 'string' ? v.slice(0, max) : '');
const BLOB_HOST = /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\//;
const photoOk = (u) => (typeof u === 'string' && (BLOB_HOST.test(u) || /^img\/[\w./-]+$/.test(u)) ? u.slice(0, 400) : undefined);

// 편집기가 모르는 가게별 필드(Ăn Vội 주문 옵션, 바이오&뷰티 제품 번호·할인가, 분류 안내 등)는 지우지 않고 보존한다.
// 단, 아무 값이나 받으면 안 되므로 "그 가게 기본 menu.js 에 실제로 있는 필드·값"과 똑같을 때만 통과시킨다.
const KNOWN_I = new Set(['name', 'price', 'desc', 'unit', 'spicy', 'tag', 'sizes', 'dessert', 'photo']);
const KNOWN_C = new Set(['id', 'name', 'items', 'note', 'photo']);
const TAGS = ['best', 'new', 'special', 'must'];
const keyOk = (k) => /^[A-Za-z_]\w{0,20}$/.test(k);
function allowedExtras(defMenu) {
  const set = new Set();
  for (const c of defMenu || []) {
    for (const k of Object.keys(c)) if (!KNOWN_C.has(k)) set.add('c:' + k + '=' + JSON.stringify(c[k]));
    for (const it of c.items || []) for (const k of Object.keys(it)) if (!KNOWN_I.has(k)) set.add('i:' + k + '=' + JSON.stringify(it[k]));
  }
  return set;
}
const keepExtras = (src, out, known, prefix, allowed) => {
  if (!allowed) return;
  for (const k of Object.keys(src || {})) if (!known.has(k) && keyOk(k) && allowed.has(prefix + k + '=' + JSON.stringify(src[k]))) out[k] = src[k];
};

function cleanText(o, max = 300) {
  const t = {};
  for (const l of LANGS) t[l] = str(o && o[l], max);
  for (const k of ['_auto', '_pending']) if (o && Array.isArray(o[k])) { const a = o[k].filter((l) => LANGS.includes(l)); if (a.length) t[k] = a; }
  return t;
}

function cleanItem(it, allowed) {
  const out = { name: cleanText(it.name, 120) };
  if (it.price !== undefined) out.price = it.price === null || it.price === '' || it.price === undefined ? null : Math.max(0, Math.round(Number(it.price)) || 0);
  if (it.desc && LANGS.some((l) => str(it.desc[l]))) out.desc = cleanText(it.desc, 300);
  if (typeof it.unit === 'string' && it.unit) out.unit = str(it.unit, 40);
  else if (it.unit && typeof it.unit === 'object') out.unit = cleanText(it.unit, 40);
  if (it.spicy) out.spicy = true;
  if (TAGS.includes(it.tag)) out.tag = it.tag;
  if (Array.isArray(it.sizes)) out.sizes = it.sizes.slice(0, 8).map((s) => [typeof s[0] === 'string' ? str(s[0], 60) : cleanText(s[0], 60), Math.max(0, Math.round(Number(s[1])) || 0)]);
  if (it.dessert) out.dessert = Math.max(0, Math.round(Number(it.dessert)) || 0);
  const p = photoOk(it.photo); if (p) out.photo = p;
  keepExtras(it, out, KNOWN_I, 'i:', allowed);
  return out;
}

function cleanMenu(menu, defMenu) {
  const allowed = defMenu ? allowedExtras(defMenu) : null;
  if (!Array.isArray(menu) || menu.length > 40) throw new Error('bad_menu');
  return menu.map((c, i) => {
    const cat = { id: str(c.id, 30).replace(/[^a-zA-Z0-9_-]/g, '') || 'c' + i, name: cleanText(c.name, 80), items: (Array.isArray(c.items) ? c.items : []).slice(0, 300).map((x) => cleanItem(x, allowed)) };
    keepExtras(c, cat, KNOWN_C, 'c:', allowed);
    if (c.note && LANGS.some((l) => str(c.note[l]))) cat.note = cleanText(c.note, 300);
    const p = photoOk(c.photo); if (p) cat.photo = p;
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

// 예전 저장본(v 없음)은 가게별 필드·항목 사진이 빠져 있다 → 기본 메뉴에서 같은 분류(id)·같은 항목(이름)을 찾아 빠진 것만 채운다.
function restoreFromDefault(menu, defMenu) {
  const nameKey = (it) => JSON.stringify([it.name && it.name.ko, it.name && it.name.vi]);
  const byId = new Map((defMenu || []).map((c) => [c.id, c]));
  for (const c of menu) {
    const dc = byId.get(c.id); if (!dc) continue;
    for (const k of Object.keys(dc)) if (!KNOWN_C.has(k) || k === 'photo') if (c[k] === undefined) c[k] = dc[k];
    const byName = new Map((dc.items || []).map((it) => [nameKey(it), it]));
    for (const it of c.items || []) {
      const di = byName.get(nameKey(it)); if (!di) continue;
      for (const k of Object.keys(di)) if (!['name', 'price', 'desc', 'sizes', 'unit', 'dessert', 'spicy'].includes(k) && it[k] === undefined) it[k] = di[k];
    }
  }
  return menu;
}

module.exports = { LANGS, cleanMenu, cleanInfo, fillTranslations, loadDefault, restoreFromDefault };
