// 사용: node tools/floor-art.mjs  (원본 SVG를 D:\qrmenu\배치도아이콘 에 두고 돌림, 원본 폴더는 git에 안 올림)
// 캡틴이 준 게임풍 2.5D SVG(D:\qrmenu\배치도아이콘, 2026-11-20) → sales/kitchen/art/*.svg
// 한국어 글자 배지(카운터·주방·냉장고·테이블 번호 등)는 지운다: 화면이 베트남어일 때도 맞는 이름표를 따로 붙이고, 테이블 번호는 실제 번호를 쓴다.
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, '배치도아이콘'), OUT = path.join(ROOT, 'sales/kitchen/art');
fs.mkdirSync(OUT, { recursive: true });
const fromHtml = (file, id) => { const h = fs.readFileSync(path.join(SRC, file), 'utf8'); const i = h.indexOf(`id: '${id}'`); const s = h.indexOf('<svg', i), e = h.indexOf('</svg>', s) + 6; return h.slice(s, e); };
// [나갈 이름, 원본, 글자 배지 지우기]
const LIST = [
  ['kitchen', 'kitchen-station.svg', 1], ['pos', 'counter-pos.svg', 1], ['pickup', ['qr_svg_2_16.html', 'pickup-serving-counter'], 1],
  ['selfbar', 'self-bar-station.svg', 1], ['banchan', 'fixture_self_bar.svg', 1], ['drinkfridge', 'beverage-showcase-fridge.svg', 1],
  ['showcase', 'fixture_drink_fridge.svg', 0], ['selffridge', 'fridge-selfbar.svg', 1], ['coffee', 'fixture_cafe_bar.svg', 0],
  ['barstool', 'bar-table-stools.svg', 0], ['bench', ['qr_svg_2_16.html', 'waiting-bench'], 0], ['waiting', 'prop_waiting_area.svg', 0],
  ['mat', 'entrance-door.svg', 0], ['glassdoor', 'prop_entrance_door.svg', 0], ['autodoor', 'auto-sliding-door.svg', 0],
  ['window', 'glass-window-wall.svg', 0], ['partition', 'wood-partition.svg', 0], ['stairs2', 'second-floor-stairs.svg', 0], ['restroom', 'restroom-zone.svg', 1],
  ['monstera', 'plant-monstera.svg', 0], ['aircon', 'standing-aircon.svg', 0], ['tv', 'prop_wall_tv.svg', 0], ['rug', ['qr_svg_2_16.html', 'interior-woven-rug'], 0],
  // 테이블 모양
  ['t-wood4', 'table-4p-wood.svg', 1], ['t-cafe2', 'table-2p-cafe.svg', 1], ['t-bbq', 'bbq-table-4p.svg', 0], ['t-bbq2', 'table_bbq_grill.svg', 0],
  ['t-group6', 'group-table-6p.svg', 1], ['t-booth', 'sofa-booth-seat.svg', 1], ['t-floor', 'table_floor_seating.svg', 0], ['t-plastic', 'table_outdoor_local.svg', 0], ['t-parasol', 'outdoor-parasol-table.svg', 0],
  // 상태 말풍선·팻말
  ['s-new', 'status_new_order.svg', 0], ['s-call', 'status_call_staff.svg', 0], ['s-bill', 'status_payment.svg', 0], ['s-food', 'overlay_food_set.svg', 0], ['s-vip', 'overlay_reserved.svg', 0],
];
const out = {};
for (const [name, src, strip] of LIST) {
  let s = Array.isArray(src) ? fromHtml(...src) : fs.readFileSync(path.join(SRC, src), 'utf8');
  if (strip) {
    const lines = s.split('\n'), ti = lines.findIndex((l) => l.includes('<text'));
    if (ti < 0) throw new Error('글자 없음 ' + name);
    let pi = ti - 1; while (pi > 0 && !/<(rect|circle)\b/.test(lines[pi])) pi--; // 바로 앞 배지(네모·동그라미)
    lines.splice(pi, ti - pi + 1); s = lines.join('\n');
    if (s.includes('<text')) throw new Error('글자 남음 ' + name);
  }
  if (/<script|https?:\/\/(?!www\.w3\.org)/.test(s)) throw new Error('외부 주소·스크립트 ' + name);
  // id 앞에 이름을 붙여 다른 그림과 안 겹치게(img로 쓰지만 혹시 바로 넣어도 안전하게)
  s = s.replace(/<!--[\s\S]*?-->/g, '').replace(/\n\s*\n/g, '\n').trim() + '\n';
  const vb = s.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  out[name] = [Number(vb[1]), Number(vb[2])];
  fs.writeFileSync(path.join(OUT, name + '.svg'), s);
}
console.log(JSON.stringify(out));
console.log(fs.readdirSync(OUT).reduce((a, f) => a + fs.statSync(path.join(OUT, f)).size, 0), 'bytes');
