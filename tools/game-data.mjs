// 메뉴 게임(sales/stores/game.html)용 데이터: 가게 찾기 목록의 음식점마다 menu.js 에서 사진 있는(흐리지 않은) 메뉴를 전부 모아
// sales/stores/game-data.js 로 쓴다. register-shop.mjs·check-shop.mjs 가 자동으로 돌린다(2026-11-16, 손으로 안 돌려 100여 곳만 나오던 건).
// 사용: node tools/game-data.mjs
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { ROOT } from "./pw.mjs";

const load = (file) => {
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, "utf8"), ctx);
  return ctx.window;
};

// 음식점만(호텔·사진관·마사지·미용 제외), 흐린 사진(메뉴판에서 오려 낸 것 등)은 뺀다
const FOOD = ["bbq", "korean", "chicken", "noodle", "cafe", "western", "seafood", "chinese", "japanese", "vietnamese", "bar"];
const MIN_SHARP = 1100; // tools/sharpness.py 점수, 2026-10-31 사진 모음으로 눈으로 보고 정함(중간값 약 2000)

const { STORES } = load(path.join(ROOT, "sales/stores/data.js"));
const food = STORES.filter((s) => (s.cats || []).some((c) => FOOD.includes(c)));
const photos = food.flatMap((s) => {
  const dir = path.join(ROOT, "restaurants", s.id);
  if (!fs.existsSync(path.join(dir, "menu.js"))) return [];
  return fs.readdirSync(path.join(dir, "img")).filter((f) => f.endsWith(".jpg")).map((f) => path.join(dir, "img", f));
});
const sharp = JSON.parse(execFileSync("python", [path.join(ROOT, "tools/sharpness.py")], { input: photos.join("\n"), maxBuffer: 1 << 24 }).toString());
const stores = {};
const dishes = [];
for (const s of food) {
  const dir = path.join(ROOT, "restaurants", s.id);
  if (!fs.existsSync(path.join(dir, "menu.js"))) continue;
  const w = load(path.join(dir, "menu.js"));
  const cur = (w.ORDER && w.ORDER.currency) || (s.region === "korea" ? "원" : "₫");
  const picked = [];
  for (const cat of w.MENU || []) {
    for (const it of cat.items || []) {
      if (!it.photo || !it.name || !((sharp[path.join(dir, it.photo)] ?? -1) >= MIN_SHARP)) continue;
      const prices = it.sizes ? it.sizes.map((x) => x[1]) : [it.price];
      const p = prices.filter((x) => typeof x === "number");
      picked.push({ s: s.id, n: it.name, p: p.length ? Math.min(...p) : null, sp: !!it.spicy, img: `${s.url}/${it.photo}`, t: it.tag ? 0 : 1 });
    }
  }
  // 사진 있는 메뉴 전부(태그 붙은 대표 메뉴 먼저). 예전엔 가게당 6개로 잘랐다 → 2026-11-16 캡틴 지시(가-1)로 전부
  picked.sort((a, b) => a.t - b.t);
  for (const d of picked) { delete d.t; dishes.push(d); }
  if (picked.length) stores[s.id] = { name: s.name, url: s.url, region: s.region, cur };
}

// 가게 간판 룰렛용: 음식점마다 그 가게 메뉴판 맨 위 그림(로고·간판, 없으면 hero) + 종류 한 줄·주소(가게 찾기 목록 그대로)
const SIGN_FIRST = /^img\/(logo|wordmark|sign|front|store)/;
// 맨 위 그림이 간판이 아니라 음식·실내 사진인 가게(2026-11-05 모음 이미지로 봄) → 간판 사진을 구하기 전까지 이름 카드로
const NOT_SIGN = new Set(["joseon", "madang", "cheong", "miz", "dada", "jijigo"]);
// 간판 룰렛에서 뺄 종류(사용자 지시 2026-11-05: 식당 룰렛에 커피숍은 빼기)
const SIGN_SKIP_CATS = ["cafe"];
const signs = [];
for (const s of food) {
  if ((s.cats || []).some((c) => SIGN_SKIP_CATS.includes(c))) continue;
  let html = "";
  try { html = fs.readFileSync(path.join(ROOT, "restaurants", s.id, "index.html"), "utf8"); } catch { continue; }
  const refs = [...html.matchAll(/(?:src="|url\()(?:\.\/)?(img\/[^"')]+\.(?:png|jpe?g|webp))/g)].map((m) => m[1]);
  // 드라이브에서 따로 고른 간판 사진(sales/stores/signs/<id>.jpg, qrmenuasia.com/stores/signs/)이 있으면 그것을 먼저 쓴다
  if (fs.existsSync(path.join(ROOT, "sales/stores/signs", `${s.id}.jpg`))) {
    signs.push({ id: s.id, name: s.name, url: s.url, region: s.region, cats: (s.cats || []).filter((c) => FOOD.includes(c) && !SIGN_SKIP_CATS.includes(c)), type: s.type || null, addr: s.address || "", img: `/stores/signs/${s.id}.jpg`, logo: false, _file: "" });
    continue;
  }
  const img = NOT_SIGN.has(s.id) ? "" : refs.find((r) => SIGN_FIRST.test(r)) || refs.find((r) => r === "img/hero.jpg") || "";
  signs.push({ id: s.id, name: s.name, url: s.url, region: s.region, cats: (s.cats || []).filter((c) => FOOD.includes(c) && !SIGN_SKIP_CATS.includes(c)), type: s.type || null, addr: s.address || "", img: img ? `${s.url}/${img}` : "", logo: /\.png$/.test(img), _file: img ? path.join(ROOT, "restaurants", s.id, img) : "" });
}
// 투명 배경에 밝은 글씨인 로고(흰 글씨 등)는 흰 바탕에서 안 보이므로 어두운 바탕 표시(dark)
const pngs = signs.filter((x) => x.logo).map((x) => x._file);
const LIGHT_PY = "import sys,json\nfrom PIL import Image\nout={}\nfor p in sys.stdin.read().split('\\n'):\n  if not p: continue\n  im=Image.open(p).convert('RGBA').resize((80,50));d=list(im.getdata())\n  px=[(r,g,b) for r,g,b,a in d if a>128];tr=sum(1 for *_,a in d if a<=128)/len(d)\n  L=sum(0.299*r+0.587*g+0.114*b for r,g,b in px)/max(1,len(px))\n  out[p]=tr>0.3 and L>190\nprint(json.dumps(out))";
const light = JSON.parse(execFileSync("python", ["-W", "ignore", "-c", LIGHT_PY], { input: pngs.join("\n") }).toString());
for (const x of signs) { if (light[x._file]) x.dark = true; delete x._file; }
const { CATS } = load(path.join(ROOT, "sales/stores/data.js"));
const cats = Object.fromEntries(FOOD.filter((c) => CATS[c]).map((c) => [c, CATS[c]]));

const out = `// 자동 생성 — node tools/game-data.mjs (직접 고치지 않음)\nwindow.GAME_STORES = ${JSON.stringify(stores)};\nwindow.GAME_DISHES = ${JSON.stringify(dishes)};\nwindow.GAME_SIGNS = ${JSON.stringify(signs)};\nwindow.GAME_CATS = ${JSON.stringify(cats)};\n`;
const file = path.join(ROOT, "sales/stores/game-data.js");
if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== out) fs.writeFileSync(file, out);
console.log(`가게 ${Object.keys(stores).length}곳, 사진 메뉴 ${dishes.length}개, 간판 룰렛 ${signs.length}곳(그림 없음 ${signs.filter((x) => !x.img).length})`);

// 가게 찾기 '메뉴 검색'용(2026-11-24 캡틴 가-1): 가게 찾기의 모든 가게·모든 메뉴(사진 없어도)
// menu-search.js = 가게마다 { c: 돈 단위, m: [[한국어, 베트남어, 영어, 가장 낮은 가격(시가 null)], ...] }
// menu-search-zh.js·-ja.js = 같은 순서로 그 언어 이름만(중국어·일본어 화면에서만 더 불러옴)
// 가게 찾기 화면이 검색창을 누를 때만 불러온다(첫 화면은 그대로 가벼움).
const base = {}, extra = { zh: {}, ja: {} };
let searchCount = 0;
for (const s of STORES) {
  const f = path.join(ROOT, "restaurants", s.id, "menu.js");
  if (!fs.existsSync(f)) continue;
  let w; try { w = load(f); } catch { console.log(`  ! ${s.id} menu.js 읽기 실패 — 메뉴 검색에서 빠짐`); continue; }
  const m = [], ex = { zh: [], ja: [] };
  for (const cat of w.MENU || []) for (const it of cat.items || []) {
    if (!it.name) continue;
    const nm = typeof it.name === "string" ? { ko: it.name } : it.name;
    const ps = (it.sizes ? it.sizes.map((x) => x[1]) : [it.price]).filter((x) => typeof x === "number");
    const t = (l) => String(nm[l] || "");
    m.push([t("ko"), t("vi") === t("ko") ? "" : t("vi"), t("en") === t("ko") || t("en") === t("vi") ? "" : t("en"), ps.length ? Math.min(...ps) : null]);
    for (const l of ["zh", "ja"]) ex[l].push(t(l) === t("ko") ? "" : t(l));
  }
  if (!m.length) continue;
  searchCount += m.length;
  base[s.id] = { c: (w.ORDER && w.ORDER.currency) || (s.region === "korea" ? "원" : "₫"), m };
  for (const l of ["zh", "ja"]) extra[l][s.id] = ex[l];
}
const writeIf = (name, body) => {
  const sf = path.join(ROOT, "sales/stores", name);
  const js = `// 자동 생성 — node tools/game-data.mjs (직접 고치지 않음). 가게 찾기 메뉴 검색용
${body}
`;
  if (!fs.existsSync(sf) || fs.readFileSync(sf, "utf8") !== js) fs.writeFileSync(sf, js);
};
writeIf("menu-search.js", `window.MENU_SEARCH = ${JSON.stringify(base)};`);
for (const l of ["zh", "ja"]) writeIf(`menu-search-${l}.js`, `window.MENU_SEARCH_${l.toUpperCase()} = ${JSON.stringify(extra[l])};`);
console.log(`메뉴 검색: 가게 ${Object.keys(base).length}곳, 메뉴 ${searchCount}개`);
