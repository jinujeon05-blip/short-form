// 대시보드용: sales/stores/data.js 와 restaurants/*/menu.js 를 vm 으로 읽어 JSON 으로 내보낸다.
// 사용법: node dashboard/collect.mjs   (server.py 가 부른다, 파일은 고치지 않음)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function run(file) {
  const win = {};
  const ctx = { window: win, document: { addEventListener() {}, querySelector() { return null; } }, console: { log() {}, warn() {} } };
  ctx.self = win;
  try { vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx, { timeout: 2000 }); }
  catch (e) { return { error: e.message, win }; }
  return { win };
}

const data = run(path.join(ROOT, 'sales/stores/data.js'));
const stores = (data.win.STORES || []).map(s => ({
  id: s.id, name: s.name, sub: s.sub || '', url: s.url || '', listing: !!s.listing, region: s.region || '',
}));

const menus = {};
for (const d of fs.readdirSync(path.join(ROOT, 'restaurants'))) {
  const f = path.join(ROOT, 'restaurants', d, 'menu.js');
  if (d.startsWith('_') || !fs.existsSync(f)) continue;
  const { win, error } = run(f);
  const M = Array.isArray(win.MENU) ? win.MENU : [];
  const items = M.reduce((n, c) => n + (Array.isArray(c.items) ? c.items.length : 0), 0);
  const brand = win.RESTAURANT && win.RESTAURANT.brand;
  menus[d] = { cats: M.length, items, error: error || null,
    brand: brand ? (brand.ko || brand.en || brand.vi || '') : '' };
}

process.stdout.write(JSON.stringify({ stores, menus, dataError: data.error || null }));
