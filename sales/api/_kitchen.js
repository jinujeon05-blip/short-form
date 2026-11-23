// 주방 주문 공용 함수 (파일 이름이 _ 로 시작 → API 로 열리지 않음)
// 저장 구조 (가게마다 주소를 추측할 수 없는 폴더 하나, HASH_SALT 로 만든 무작위 글자):
//   kq/<가게>/<열쇠>/bell.json                 설정(켜기·열쇠·프린터·gen·layoutTs). **설정을 바꿀 때만** 쓴다.
//   kq/<가게>/<열쇠>/tick.json                 '새 소식' 표시. 주문·호출·상태·자리 정리 때마다 덮어쓴다(내용은 안 씀).
//     주방 화면·손님 내역은 tick 의 '마지막 수정 시각'을 head(저장소 API, CDN 캐시 안 거침)로 보고 바뀌었을 때만 목록을 읽는다.
//     (2026-11-16 건: 예전엔 bell.json 을 주문마다 덮어쓰고 공개 주소로 읽었는데, 덮어쓴 파일은 CDN 이 최대 60초 옛 내용을 줘서
//      주방 화면이 새 주문·호출을 못 알아채고(새로 고침해야 보임) 주문 번호가 겹쳤다(#1 두 번). 자주 바뀌는 값은 공개 주소로 읽지 않는다.)
//   kq/<가게>/<열쇠>/<날짜>/o-<주문id>.json     주문 1건 = 파일 1개(동시에 들어와도 서로 덮어쓰지 않음, 한 번 쓰면 안 바뀜)
//   kq/<가게>/<열쇠>/<날짜>/s-<주문id>.<상태>   상태 표시(빈 파일). cooking(만드는 중)·done(완료)·cancel(취소)
//   kq/<가게>/<열쇠>/dev/<기기id>.json          주방 기기 마지막 접속(5분마다)
//   kq/<가게>/<열쇠>/layout.json               테이블 배치도(구역·테이블·장식). 바꾸면 bell.layoutTs 를 올린다
//   kq/<가게>/<열쇠>/<날짜>/c-<시각>-<테이블hex>.clr  '자리 정리'(손님 나감) 표시. 그 시각 전 주문은 배치도에서 빠진다
//   kq/<가게>/<열쇠>/<날짜>/r-<id>.json       직원 호출 1건(물·반찬 리필·계산서 등). 주방이 [확인]하면 s-<id>.done
//   kq/<가게>/<열쇠>/bill/<테이블hex>.json     손님용 '우리 테이블 주문 내역' 임시 저장(tick 시각이 같으면 다시 계산하지 않음)
//   kq/<가게>/<열쇠>/clr/<테이블hex>.txt       그 테이블 마지막 '자리 정리' 시각(head 의 올린 시각으로 읽음). 그 전에 받은 손님 '자리 표'는 무효
//   kq/<가게>/<열쇠>/<날짜>/x-<주문id>.g|.e     손님이 직접 취소(g)·수정(e)해서 생긴 취소. 상태 파일 s-<id>.cancel 과 같이 쓴다
// tick 시각이 바뀌었을 때만 목록(list, 비싼 읽기)을 읽는다 → 주문이 없을 땐 head 1번뿐.
const { put, head, BlobNotFoundError } = require('@vercel/blob');
const L = require('./_lib');
const S = require('./_store');

const DEFAULT = { on: false, needKey: false, poll: 15, printer: 'rawbt', paper: 58, gen: 1, ts: 0, seqDate: '', seq: 0 };
const STATUSES = ['cooking', 'done', 'cancel'];
const RANK = { new: 0, cooking: 1, done: 2, cancel: 3 };

const dir = (shop) => `kq/${shop}/${L.hmac('kq', shop, 16)}`;
let BASE = ''; // 공개 Blob 주소 앞부분(https://<저장소>.public.blob.vercel-storage.com). put/head 결과에서 한 번 알아 둔다
const learn = (url, pathname) => { if (url && url.endsWith('/' + pathname)) BASE = url.slice(0, -pathname.length - 1); };

// 설정 읽기: bell.json 은 덮어쓰는 파일이라 공개 주소로 읽으면 CDN 이 최대 60초 옛 내용을 준다(2026-11-16 건).
// 그래서 쓸 때 같은 내용을 '한 번 쓰고 안 바뀌는' cfg/<bell.json 올린 시각>.json 으로도 남기고,
// 읽을 때는 head(저장소 API, 캐시 없음)로 bell.json 올린 시각을 알아내 그 고정 파일을 읽는다. 고정 파일은 기기 메모리에도 둔다.
const notFound = (e) => (BlobNotFoundError && e instanceof BlobNotFoundError) || /not.?found|does not exist|404/i.test(String(e && (e.name + ' ' + e.message)));
const cfgMem = new Map();
async function readBell(shop) {
  const p = `${dir(shop)}/bell.json`;
  let h;
  try { h = await head(p); } catch (e) {
    // 아직 설정 파일이 없는 가게 = 꺼짐. 실제 @vercel/blob 은 오류 이름이 시험용과 달라 문구로도 확인한다(2026-11-10 실서버 500 건)
    if (notFound(e)) return { ...DEFAULT };
    throw e;
  }
  learn(h.url, p);
  const up = new Date(h.uploadedAt).getTime() || 0, key = `${shop}|${up}`;
  if (cfgMem.has(key)) return { ...cfgMem.get(key) };
  let r = await fetch(`${BASE}/${dir(shop)}/cfg/${up}.json`);
  const fixed = r.ok;
  if (!fixed) r = await fetch(`${BASE}/${p}?v=${up}`, { cache: 'no-store' }); // 예전 방식으로 저장된 가게(고정 파일 없음)
  if (r.status === 404) return { ...DEFAULT };
  if (!r.ok) throw new Error('bell ' + r.status);
  const bell = { ...DEFAULT, ...(await r.json()) };
  if (fixed) { if (cfgMem.size > 500) cfgMem.clear(); cfgMem.set(key, bell); }
  return { ...bell };
}

async function writeBell(shop, bell) {
  const p = `${dir(shop)}/bell.json`, body = JSON.stringify(bell);
  const r = await put(p, body, { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60 });
  learn(r.url, p);
  const up = new Date((await head(p)).uploadedAt).getTime() || 0;
  await putFile(`${dir(shop)}/cfg/${up}.json`, body); // 한 번 쓰고 안 바뀌는 사본(위 readBell 설명)
  return bell;
}
// 새 소식(주문·호출·상태·자리 정리): tick.json 만 덮어쓴다. 설정 파일은 건드리지 않는다(옛 내용으로 덮어써 설정이 되돌아가는 것 방지).
const tickPath = (shop) => `${dir(shop)}/tick.json`;
async function bump(shop) {
  const p = tickPath(shop);
  const r = await put(p, String(Date.now()), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'text/plain', cacheControlMaxAge: 60 });
  learn(r.url, p);
}
// 마지막 새 소식 시각(밀리초). 저장소 API 의 파일 정보라 CDN 캐시와 상관없이 바로 바뀐다. 아직 없으면 0.
async function stamp(shop) {
  try { const h = await head(tickPath(shop)); return new Date(h.uploadedAt).getTime() || 0; }
  catch (e) {
    if ((BlobNotFoundError && e instanceof BlobNotFoundError) || /not.?found|does not exist|404/i.test(String(e && (e.name + ' ' + e.message)))) return 0;
    throw e;
  }
}
// 설정을 바꿀 때: 설정 파일 + 새 소식(주방 화면이 설정도 다시 받게)
const touch = async (shop, bell, extra = {}) => { const b = await writeBell(shop, { ...bell, ...extra, ts: Date.now() }); await bump(shop); return b; };
// 오늘 주문 번호 = 오늘 주문 파일 수 + 1 (목록은 저장소 API 라 바로 맞음. 동시에 들어오면 같은 번호가 날 수 있음)
async function nextNo(shop, day) {
  const base = `${dir(shop)}/${day}/`;
  return (await S.listAll(base)).filter((b) => /^o-/.test(b.pathname.slice(base.length))).length + 1;
}

const putFile = (p, body, type = 'application/json') =>
  put(p, body, { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: type, cacheControlMaxAge: 31536000 });

// 오늘·어제(베트남 시간) 주문과 상태 + '자리 정리' 기록. 자정을 넘겨 영업하는 가게도 있어서 이틀을 본다.
async function listState(shop) {
  const base = dir(shop), out = new Map(), calls = new Map(), stat = new Map(), by = new Map(), clears = [];
  for (const d of [L.dateOf(Date.now() - 86400000), L.dateOf()]) {
    for (const b of await S.listAll(`${base}/${d}/`)) {
      const name = b.pathname.slice(base.length + d.length + 2);
      let m = name.match(/^o-([0-9]+-[a-f0-9]+)\.json$/);
      if (m) { out.set(m[1], { id: m[1], status: 'new', url: b.url }); continue; }
      m = name.match(/^r-([0-9]+-[a-f0-9]+)\.json$/);
      if (m) { calls.set(m[1], { id: m[1], status: 'new', url: b.url }); continue; }
      m = name.match(/^s-([0-9]+-[a-f0-9]+)\.([a-z]+)$/);
      if (m && RANK[m[2]] != null) { if (RANK[m[2]] > RANK[stat.get(m[1]) || 'new']) stat.set(m[1], m[2]); continue; }
      m = name.match(/^x-([0-9]+-[a-f0-9]+)\.([ge])$/);
      if (m) { by.set(m[1], m[2]); continue; }
      m = name.match(/^c-([0-9]+)-([0-9a-f]{2,96})\.clr$/);
      if (m) clears.push({ table: Buffer.from(m[2], 'hex').toString('utf8'), at: Number(m[1]) });
    }
  }
  for (const [id, st] of stat) { const o = out.get(id) || calls.get(id); if (o) o.status = st; } // 상태 파일(s-)은 주문(o-)·호출(r-) 어느 쪽에도 붙는다
  for (const [id, b] of by) { const o = out.get(id); if (o) o.by = b; } // 손님 취소(g)·수정(e) 표시
  const sorted = (m) => [...m.values()].filter((o) => o.url).sort((a, b) => a.id.localeCompare(b.id));
  return { orders: sorted(out), calls: sorted(calls), clears };
}
const listOrders = async (shop) => (await listState(shop)).orders;
const tableNorm = (v) => String(v == null ? '' : v).trim().toLowerCase().slice(0, 12);
const clearPath = (shop, table, at = Date.now()) => `${dir(shop)}/${L.dateOf(at)}/c-${at}-${Buffer.from(tableNorm(table), 'utf8').toString('hex')}.clr`;

// 테이블 배치도. 주방 화면 '배치 편집'에서 저장, 모든 주방 기기가 같이 본다.
const KINDS = ['table', 'kitchen', 'counter', 'wc', 'door', 'stairs', 'wall', 'plant', 'plant2', 'plant3', 'sofa', 'bar', 'fridge', 'cook', 'divwood', 'divglass', 'swing', 'slide', 'trash',
  // 게임풍 2.5D 그림 장식(2026-11-20, sales/kitchen/floor-icons.js ARTS와 같은 이름)
  'akitchen', 'apos', 'apickup', 'aselfbar', 'abanchan', 'acoffee', 'adrinkfridge', 'ashowcase', 'aselffridge', 'abarstool', 'abench', 'awaiting',
  'amat', 'aglassdoor', 'aautodoor', 'awindow', 'apartition', 'astairs2', 'arestroom', 'amonstera', 'aaircon', 'atv', 'arug'];
const SHAPES = ['round', 'square', 'rect'];
const TSTYLES = ['wood4', 'cafe2', 'bbq', 'bbq2', 'group6', 'booth', 'floor', 'plastic', 'parasol']; // 테이블 그림(floor-icons.js TSTYLES)
const FLOORS = ['wood', 'check', 'beige']; // 구역 바닥 무늬
function cleanLayout(v) {
  if (!v || typeof v !== 'object') return null;
  const str = (x, n) => (typeof x === 'string' ? x.replace(/[\x00-\x1f]/g, ' ').trim().slice(0, n) : '');
  const num = (x, lo, hi) => Math.min(hi, Math.max(lo, Math.round(Number(x) || 0)));
  const zones = (Array.isArray(v.zones) ? v.zones : []).slice(0, 8)
    .map((z) => ({ id: str(z && z.id, 8).replace(/[^a-z0-9]/gi, ''), name: str(z && z.name, 20), ...(z && FLOORS.includes(z.bg) ? { bg: z.bg } : {}) }))
    .filter((z, i, a) => z.id && a.findIndex((y) => y.id === z.id) === i);
  if (!zones.length) return null;
  const zid = new Set(zones.map((z) => z.id));
  const items = (Array.isArray(v.items) ? v.items : []).slice(0, 200).filter((x) => x && KINDS.includes(x.k) && zid.has(x.z)).map((x) => {
    const o = { id: str(x.id, 12).replace(/[^a-z0-9]/gi, '') || S.rand(3), k: x.k, z: x.z, x: num(x.x, 0, 2000), y: num(x.y, 0, 2000), w: num(x.w, 10, 1000), h: num(x.h, 10, 1000), name: str(x.name, 12) };
    if (x.k === 'swing' && x.f) o.f = num(x.f, 0, 7);
    if (x.k === 'table') { o.shape = SHAPES.includes(x.shape) ? x.shape : 'square'; o.seats = num(x.seats, 0, 16); if (TSTYLES.includes(x.st)) o.st = x.st; if (x.rv) o.rv = 1; }
    return o;
  });
  return { v: 1, zones, items };
}
async function readLayout(shop, bell) {
  if (!bell.layoutTs) return null;
  const p = `${dir(shop)}/layout.json`;
  if (!BASE) { const h = await head(p); learn(h.url, p); }
  // 저장할 때마다 layout/<layoutTs>.json 고정 파일로 남긴다(덮어쓰는 layout.json 은 CDN 이 옛 내용을 줄 수 있음, 2026-11-16 건)
  let r = await fetch(`${BASE}/${dir(shop)}/layout/${bell.layoutTs}.json`);
  if (!r.ok) r = await fetch(`${BASE}/${p}?v=${bell.layoutTs}`, { cache: 'no-store' }); // 예전에 저장한 가게
  if (r.status === 404) return null;
  if (!r.ok) throw new Error('layout ' + r.status);
  return cleanLayout(await r.json());
}
async function writeLayout(shop, layout, layoutTs) {
  const p = `${dir(shop)}/layout.json`;
  const r = await put(p, JSON.stringify(layout), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60 });
  learn(r.url, p);
  await putFile(`${dir(shop)}/layout/${layoutTs}.json`, JSON.stringify(layout));
}

// 주방 기기 열쇠: 60일. 관리자가 '모든 기기 로그아웃'(gen 올림)이나 PIN 새로 만들기를 하면 전부 풀린다.
const kitchenToken = (shop, gen, ttl = 60 * 86400e3) => { const exp = Date.now() + ttl; return `${shop}.${exp}.${gen}.${L.hmac('kit', `${shop}.${exp}.${gen}`)}`; };
function verifyKitchen(tok, shop, gen) {
  const [s, exp, g, sig] = String(tok || '').split('.');
  if (s !== shop || !(Date.now() < Number(exp)) || String(g) !== String(gen) || !sig) return false;
  return L.safeEq(sig, L.hmac('kit', `${s}.${exp}.${g}`));
}

// 테이블 QR 열쇠: 손님이 가게 안 테이블 QR로 들어왔는지 확인(설정 needKey 가 켜진 가게만 검사)
const tableKey = (shop, table) => L.hmac('tbl', `${shop}|${String(table).trim().toLowerCase()}`, 10);

// ── 손님 '자리 표'(2026-11-23 캡틴 가-1) ── 테이블 QR(?t=5&k=)을 찍으면 서버가 시간이 붙은 표를 준다.
// 주문·호출·주문 내역·수정·취소는 이 표가 있어야 된다. 표는 받은 뒤(또는 마지막 주문 뒤) 1시간이 지나거나,
// 주방에서 그 테이블 [자리 정리]를 누르면 끝난다 → 가게를 나간 손님 폰에 남은 정보로는 주문이 안 들어간다.
// 표 = "<받은 시각>.<서명>". 서명은 가게·테이블·시각을 묶어서 다른 테이블·다른 시각으로 바꾸면 틀린다.
const TICKET_MS = 60 * 60e3;
const ticketSig = (shop, table, at) => L.hmac('tix', `${shop}|${tableNorm(table)}|${at}`, 16);
const makeTicket = (shop, table, at = Date.now()) => ({ table: String(table).trim().slice(0, 12), tk: `${at}.${ticketSig(shop, table, at)}`, exp: at + TICKET_MS });
const clrFile = (shop, table) => `${dir(shop)}/clr/${Buffer.from(tableNorm(table), 'utf8').toString('hex')}.txt`;
// 마지막 자리 정리 시각: 덮어쓰는 파일이지만 내용이 아니라 head(저장소 API, CDN 캐시 없음)의 올린 시각을 본다
async function lastClear(shop, table) {
  try { const h = await head(clrFile(shop, table)); return new Date(h.uploadedAt).getTime() || 0; }
  catch (e) { if (notFound(e)) return 0; throw e; }
}
const markClear = (shop, table) => put(clrFile(shop, table), String(Date.now()), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'text/plain', cacheControlMaxAge: 60 });
// 'ok' | 'bad'(없음·위조·다른 테이블) | 'expired'(1시간 지남·자리 정리됨)
async function checkTicket(shop, table, tk) {
  const m = String(tk || '').match(/^([0-9]{12,14})\.([0-9a-f]{16})$/);
  if (!m || !tableNorm(table) || !L.safeEq(m[2], ticketSig(shop, table, m[1]))) return 'bad';
  const at = Number(m[1]), now = Date.now();
  if (at > now + 60e3) return 'bad';
  if (now - at > TICKET_MS) return 'expired';
  if (at <= await lastClear(shop, table)) return 'expired';
  return 'ok';
}
// 손님 수정·취소 열쇠: 주문을 보낸 폰에만 준다(같은 테이블 일행도 남의 주문은 못 고침)
const editKey = (shop, id) => L.hmac('oed', `${shop}|${id}`, 16);
// 손님이 고칠 수 있는지: 그 주문의 상태 파일이 하나도 없어야(주방이 아직 '접수' 안 함). 주문 파일 정보도 돌려준다
async function guestEditable(shop, id) {
  const day = dateOfId(id), base = `${dir(shop)}/${day}/`;
  const [o, st] = await Promise.all([S.listAll(`${base}o-${id}.json`), S.listAll(`${base}s-${id}.`)]);
  const file = o.find((b) => b.pathname === `${base}o-${id}.json`);
  if (!file) return { ok: false, error: 'gone' };
  if (st.length) return { ok: false, error: st.some((b) => /\.cancel$/.test(b.pathname)) ? 'gone' : 'taken' };
  return { ok: true, day, url: file.url };
}
async function guestCancel(shop, id, kind) {
  const day = dateOfId(id);
  await putFile(`${dir(shop)}/${day}/s-${id}.cancel`, '1', 'text/plain');
  await putFile(`${dir(shop)}/${day}/x-${id}.${kind}`, '1', 'text/plain');
}

const newId = () => `${Date.now()}-${S.rand(3)}`;
const dateOfId = (id) => L.dateOf(Number(String(id).split('-')[0]));

// 손님이 보낸 주문을 검사해 저장 형태로 바꾼다(글자 수·개수 제한, 숫자만 허용)
function cleanOrder(b) {
  const s = (v, n) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n) : '');
  const items = (Array.isArray(b.items) ? b.items : []).slice(0, 60).map((x) => ({
    name: s(x && x.name, 120), sub: s(x && x.sub, 120), key: s(x && x.key, 40).replace(/[^a-z0-9._-]/gi, ''),
    q: Math.min(99, Math.max(1, parseInt(x && x.q, 10) || 1)),
    price: Number.isFinite(x && x.price) && x.price >= 0 ? Math.round(x.price) : null,
  })).filter((x) => x.name);
  const total = items.reduce((n, x) => n + (x.price || 0), 0);
  return { table: s(b.table, 12), note: s(b.note, 200), lang: s(b.lang, 5), currency: s(b.currency, 3) || '₫', items, total, market: items.some((x) => x.price == null) };
}

// ── 직원 호출 ── 손님이 누르는 요청 종류(글자는 화면이 언어별로 그린다)
const CALLS = ['water', 'refill', 'ice', 'utensils', 'bill', 'staff'];

// ── 손님용 '우리 테이블 주문 내역' ── 같은 테이블에서 보낸 주문(마지막 '자리 정리' 뒤, 취소 제외)과 합계.
// 손님 폰이 10초마다 묻기 때문에, 새 소식(tick 시각)이 그대로면 저장해 둔 결과를 돌려준다(목록 읽기 = 비싼 읽기를 피함).
// 파일 이름에 새 소식 시각을 넣는다 → 한 번 쓰고 안 바뀌는 파일이라 CDN 옛 내용 문제가 없다. 같은 기기 메모리에도 둔다.
const billPath = (shop, table, ts) => `${dir(shop)}/bill/${Buffer.from(tableNorm(table), 'utf8').toString('hex')}-${ts}-v2.json`; // v2 = 주문 id 포함(손님 수정·취소)
const billMem = new Map();
async function readPublic(p, v) {
  try {
    if (!BASE) { const h = await head(p); learn(h.url, p); }
    const r = await fetch(`${BASE}/${p}?v=${v}`, { cache: 'no-store' });
    return r.ok ? await r.json() : null;
  } catch { return null; }
}
async function tableBill(shop, ts, table) {
  const key = tableNorm(table), p = billPath(shop, key, ts), mk = `${shop}|${key}|${ts}`;
  if (ts && billMem.has(mk)) return billMem.get(mk);
  const cached = ts ? await readPublic(p, ts) : null;
  if (cached && cached.ts === ts) { billMem.set(mk, cached); return cached; }
  const st = await listState(shop);
  const clearAt = st.clears.filter((c) => tableNorm(c.table) === key).reduce((n, c) => Math.max(n, c.at), 0);
  const mine = st.orders.filter((o) => o.status !== 'cancel' && Number(o.id.split('-')[0]) > clearAt);
  const orders = [];
  for (const o of mine) {
    try {
      const r = await fetch(o.url); if (!r.ok) continue;
      const d = await r.json();
      if (tableNorm(d.table) !== key || d.at <= clearAt) continue;
      orders.push({ id: o.id, no: d.no, at: d.at, status: o.status, lang: d.lang, currency: d.currency, total: d.total || 0, market: !!d.market, items: (d.items || []).map((x) => ({ name: x.name, sub: x.sub, key: x.key || '', q: x.q, price: x.price })) });
    } catch {}
  }
  orders.sort((a, b) => a.at - b.at);
  const bill = { ts, table: key, orders, total: orders.reduce((n, o) => n + o.total, 0), market: orders.some((o) => o.market), currency: (orders[0] && orders[0].currency) || '₫' };
  if (ts) { if (billMem.size > 2000) billMem.clear(); billMem.set(mk, bill); await putFile(p, JSON.stringify(bill)).then((r) => learn(r.url, p)).catch(() => {}); }
  return bill;
}

// ── 매출 집계(점주 화면·관리 화면 '매출') ── 하루 = 그날 폴더의 주문(o-)·상태(s-)를 모아 센다. 취소는 빼고 셈(캡틴 나-1).
// 음식은 이름(주방 언어 = 가게 기본 언어, 옵션 '(L)' 포함)으로 묶는다. key(메뉴 위치)는 메뉴 순서를 바꾸면 달라져서 쓰지 않는다.
// 이틀 이상 지난 날은 더 바뀌지 않으므로 rep/<날짜>-v<버전>.json 에 한 번 써 두고(한 번 쓰고 안 바뀜 → CDN 옛 내용 문제 없음) 다시 쓴다.
// 오늘·어제는 늦게 끝나는 가게의 상태가 바뀔 수 있어 매번 센다(주문 파일은 안 바뀌므로 기기 메모리에 둔다).
const REP_V = 1;
const orderMem = new Map();
async function readOrder(url) {
  if (orderMem.has(url)) return orderMem.get(url);
  try { const r = await fetch(url); if (!r.ok) return null; const d = await r.json(); if (orderMem.size > 5000) orderMem.clear(); orderMem.set(url, d); return d; } catch { return null; }
}
const vnHour = (ms) => new Date(Number(ms) + L.TZ_OFFSET_MS).getUTCHours();
async function countDay(shop, day) {
  const base = `${dir(shop)}/${day}/`, files = new Map(), stat = new Map();
  for (const b of await S.listAll(base)) {
    const name = b.pathname.slice(base.length);
    let m = name.match(/^o-([0-9]+-[a-f0-9]+)\.json$/);
    if (m) { files.set(m[1], b.url); continue; }
    m = name.match(/^s-([0-9]+-[a-f0-9]+)\.([a-z]+)$/);
    if (m && RANK[m[2]] != null && RANK[m[2]] > RANK[stat.get(m[1]) || 'new']) stat.set(m[1], m[2]);
  }
  const ids = [...files.keys()], docs = [];
  for (let i = 0; i < ids.length; i += 12) docs.push(...await Promise.all(ids.slice(i, i + 12).map((id) => readOrder(files.get(id)))));
  const out = { day, v: REP_V, orders: 0, revenue: 0, cancelled: 0, open: 0, market: 0, currency: '', hours: Array.from({ length: 24 }, () => [0, 0]), items: {} };
  ids.forEach((id, i) => {
    const d = docs[i]; if (!d) return;
    const st = stat.get(id) || 'new';
    if (st === 'cancel') { out.cancelled++; return; }
    out.orders++; if (st !== 'done') out.open++;
    if (!out.currency && d.currency) out.currency = d.currency;
    const h = out.hours[vnHour(d.at || Number(id.split('-')[0]))];
    h[0]++;
    for (const x of d.items || []) {
      const k = x.name, it = out.items[k] || (out.items[k] = { name: x.name, sub: x.sub || '', q: 0, amt: 0, mq: 0 });
      if (!it.sub && x.sub) it.sub = x.sub;
      it.q += x.q || 1;
      if (x.price == null) { it.mq += x.q || 1; out.market += x.q || 1; } else { it.amt += x.price; out.revenue += x.price; h[1] += x.price; }
    }
  });
  return out;
}
async function salesRange(shop, from, to) {
  const days = [];
  for (let t = Date.parse(from + 'T00:00:00Z'), e = Date.parse(to + 'T00:00:00Z'); t <= e; t += 86400000) days.push(new Date(t).toISOString().slice(0, 10));
  const fixedBefore = L.dateOf(Date.now() - 86400000); // 어제보다 앞선 날 = 다 끝난 날
  const cached = new Map();
  if (days.some((d) => d < fixedBefore)) for (const b of await S.listAll(`${dir(shop)}/rep/`)) { const m = b.pathname.match(/\/rep\/(\d{4}-\d{2}-\d{2})-v(\d+)\.json$/); if (m && Number(m[2]) === REP_V) cached.set(m[1], b.url); }
  const one = async (day) => {
    if (cached.has(day)) { const d = await readOrder(cached.get(day)); if (d && d.v === REP_V) return d; }
    const d = await countDay(shop, day);
    if (day < fixedBefore) await putFile(`${dir(shop)}/rep/${day}-v${REP_V}.json`, JSON.stringify(d)).catch(() => {});
    return d;
  };
  const res = [];
  for (let i = 0; i < days.length; i += 6) res.push(...await Promise.all(days.slice(i, i + 6).map(one)));
  return res;
}

module.exports = { salesRange, CALLS, tableBill, bump, stamp, nextNo, DEFAULT, STATUSES, dir, readBell, writeBell, touch, putFile, listOrders, listState, tableNorm, clearPath, cleanLayout, readLayout, writeLayout, kitchenToken, verifyKitchen, tableKey, newId, dateOfId, cleanOrder,
  TICKET_MS, makeTicket, checkTicket, markClear, editKey, guestEditable, guestCancel };
