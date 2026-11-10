// 주방 주문 공용 함수 (파일 이름이 _ 로 시작 → API 로 열리지 않음)
// 저장 구조 (가게마다 주소를 추측할 수 없는 폴더 하나, HASH_SALT 로 만든 무작위 글자):
//   kq/<가게>/<열쇠>/bell.json                 설정 + 마지막 변경 시각(ts). 주방 화면은 몇 초마다 이것 하나만 읽는다(싼 읽기 1번).
//   kq/<가게>/<열쇠>/<날짜>/o-<주문id>.json     주문 1건 = 파일 1개(동시에 들어와도 서로 덮어쓰지 않음, 한 번 쓰면 안 바뀜)
//   kq/<가게>/<열쇠>/<날짜>/s-<주문id>.<상태>   상태 표시(빈 파일). cooking(만드는 중)·done(완료)·cancel(취소)
//   kq/<가게>/<열쇠>/dev/<기기id>.json          주방 기기 마지막 접속(5분마다)
// bell.ts 가 바뀌었을 때만 목록(list, 비싼 읽기)을 읽는다 → 주문이 없을 땐 비용이 거의 안 든다.
const { put, head, BlobNotFoundError } = require('@vercel/blob');
const L = require('./_lib');
const S = require('./_store');

const DEFAULT = { on: false, needKey: false, poll: 15, printer: 'rawbt', paper: 58, gen: 1, ts: 0, seqDate: '', seq: 0 };
const STATUSES = ['cooking', 'done', 'cancel'];
const RANK = { new: 0, cooking: 1, done: 2, cancel: 3 };

const dir = (shop) => `kq/${shop}/${L.hmac('kq', shop, 16)}`;
let BASE = ''; // 공개 Blob 주소 앞부분(https://<저장소>.public.blob.vercel-storage.com). put/head 결과에서 한 번 알아 둔다
const learn = (url, pathname) => { if (url && url.endsWith('/' + pathname)) BASE = url.slice(0, -pathname.length - 1); };

async function readBell(shop) {
  const p = `${dir(shop)}/bell.json`;
  try {
    if (!BASE) { const h = await head(p); learn(h.url, p); }
    const r = await fetch(`${BASE}/${p}?v=${Date.now()}`, { cache: 'no-store' });
    if (r.status === 404) return { ...DEFAULT };
    if (!r.ok) throw new Error('bell ' + r.status);
    return { ...DEFAULT, ...(await r.json()) };
  } catch (e) {
    // 아직 설정 파일이 없는 가게 = 꺼짐. 실제 @vercel/blob 은 오류 이름이 시험용과 달라 문구로도 확인한다(2026-11-10 실서버 500 건)
    if ((BlobNotFoundError && e instanceof BlobNotFoundError) || /not.?found|does not exist|404/i.test(String(e && (e.name + ' ' + e.message)))) return { ...DEFAULT };
    throw e;
  }
}

async function writeBell(shop, bell) {
  const p = `${dir(shop)}/bell.json`;
  const r = await put(p, JSON.stringify(bell), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60 });
  learn(r.url, p);
  return bell;
}
const touch = (shop, bell, extra = {}) => writeBell(shop, { ...bell, ...extra, ts: Date.now() });

const putFile = (p, body, type = 'application/json') =>
  put(p, body, { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: type, cacheControlMaxAge: 31536000 });

// 오늘·어제(베트남 시간) 주문과 상태. 자정을 넘겨 영업하는 가게도 있어서 이틀을 본다.
async function listOrders(shop) {
  const base = dir(shop), out = new Map();
  for (const d of [L.dateOf(Date.now() - 86400000), L.dateOf()]) {
    for (const b of await S.listAll(`${base}/${d}/`)) {
      const name = b.pathname.slice(base.length + d.length + 2);
      let m = name.match(/^o-([0-9]+-[a-f0-9]+)\.json$/);
      if (m) { const o = out.get(m[1]) || { id: m[1], status: 'new' }; o.url = b.url; out.set(m[1], o); continue; }
      m = name.match(/^s-([0-9]+-[a-f0-9]+)\.([a-z]+)$/);
      if (m && RANK[m[2]] != null) { const o = out.get(m[1]) || { id: m[1], status: 'new' }; if (RANK[m[2]] > RANK[o.status]) o.status = m[2]; out.set(m[1], o); }
    }
  }
  return [...out.values()].filter((o) => o.url).sort((a, b) => a.id.localeCompare(b.id));
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

const newId = () => `${Date.now()}-${S.rand(3)}`;
const dateOfId = (id) => L.dateOf(Number(String(id).split('-')[0]));

// 손님이 보낸 주문을 검사해 저장 형태로 바꾼다(글자 수·개수 제한, 숫자만 허용)
function cleanOrder(b) {
  const s = (v, n) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n) : '');
  const items = (Array.isArray(b.items) ? b.items : []).slice(0, 60).map((x) => ({
    name: s(x && x.name, 120), sub: s(x && x.sub, 120),
    q: Math.min(99, Math.max(1, parseInt(x && x.q, 10) || 1)),
    price: Number.isFinite(x && x.price) && x.price >= 0 ? Math.round(x.price) : null,
  })).filter((x) => x.name);
  const total = items.reduce((n, x) => n + (x.price || 0), 0);
  return { table: s(b.table, 12), note: s(b.note, 200), lang: s(b.lang, 5), currency: s(b.currency, 3) || '₫', items, total, market: items.some((x) => x.price == null) };
}

module.exports = { DEFAULT, STATUSES, dir, readBell, writeBell, touch, putFile, listOrders, kitchenToken, verifyKitchen, tableKey, newId, dateOfId, cleanOrder };
