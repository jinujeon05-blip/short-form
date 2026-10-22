// Vercel Blob 을 작은 JSON 저장소처럼 쓰는 도구 (파일 이름은 _ 로 시작 → API 로 열리지 않음)
// - 공개 파일(setPublic): 경로가 고정이라 누구나 주소를 알면 읽을 수 있다. 메뉴·사진처럼 어차피 손님에게 보이는 것만.
// - 비밀 파일(setSecret): 경로에 무작위 글자가 붙어 주소를 추측할 수 없다. 비밀번호 해시·영업 메모처럼 숨겨야 하는 것.
const { put, list, del } = require('@vercel/blob');
const crypto = require('crypto');

const rand = (n = 4) => crypto.randomBytes(n).toString('hex');
const ts = (b) => new Date(b.uploadedAt).getTime();

async function listAll(prefix) {
  const out = [];
  let cursor;
  do {
    const r = await list({ prefix, limit: 1000, cursor });
    out.push(...r.blobs);
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  return out;
}

async function latest(prefix) {
  let best;
  for (const b of await listAll(prefix)) if (!best || ts(b) > ts(best)) best = b;
  return best;
}

async function fetchJson(b) {
  const u = new URL(b.url);
  u.searchParams.set('v', String(ts(b))); // 덮어쓴 직후에도 옛 캐시를 읽지 않도록
  const r = await fetch(u, { cache: 'no-store' });
  return r.ok ? r.json() : null;
}

async function getJson(prefix, fallback = null) {
  const b = await latest(prefix);
  if (!b) return fallback;
  return (await fetchJson(b)) ?? fallback;
}

const setPublic = (pathname, obj) =>
  put(pathname, JSON.stringify(obj), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60 });

async function setSecret(name, obj) {
  const old = await listAll(name + '-');
  await put(`${name}-${rand(8)}.json`, JSON.stringify(obj), { access: 'public', addRandomSuffix: false, contentType: 'application/json' });
  if (old.length) await del(old.map((b) => b.url));
}

const getSecret = (name, fallback = null) => getJson(name + '-', fallback);
const hasSecret = async (name) => !!(await latest(name + '-'));
const remove = async (prefix) => { const l = await listAll(prefix); if (l.length) await del(l.map((b) => b.url)); return l.length; };

module.exports = { put, list, del, rand, listAll, latest, getJson, setPublic, setSecret, getSecret, hasSecret, remove, ts };
