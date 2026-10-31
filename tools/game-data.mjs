// 메뉴 게임(sales/stores/game.html)용 데이터: 가게 찾기 목록의 가게마다 menu.js 에서 사진 있는 메뉴(가게당 6개)만 모아
// sales/stores/game-data.js 로 쓴다. 새 가게를 등록하거나 메뉴 사진을 바꾸면 다시 돌린다.
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
const FOOD = ["bbq", "korean", "chicken", "noodle", "cafe", "western", "seafood", "chinese", "japanese", "bar"];
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
  // 가게당 6개까지(태그 붙은 대표 메뉴 먼저) — 폰에서 가볍게
  picked.sort((a, b) => a.t - b.t);
  for (const d of picked.slice(0, 6)) { delete d.t; dishes.push(d); }
  if (picked.length) stores[s.id] = { name: s.name, url: s.url, region: s.region, cur };
}

const out = `// 자동 생성 — node tools/game-data.mjs (직접 고치지 않음)\nwindow.GAME_STORES = ${JSON.stringify(stores)};\nwindow.GAME_DISHES = ${JSON.stringify(dishes)};\n`;
const file = path.join(ROOT, "sales/stores/game-data.js");
if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== out) fs.writeFileSync(file, out);
console.log(`가게 ${Object.keys(stores).length}곳, 사진 메뉴 ${dishes.length}개`);
