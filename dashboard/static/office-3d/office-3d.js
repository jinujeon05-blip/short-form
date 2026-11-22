// Jinwoo 에이전트 3D 사무실 (별도 시험 공간: dashboard/static/office-3d/, 2026-11-22)
// - three.js(CDN) + 무료 CC0 에셋: Quaternius 사람·동작(걷기·앉기·일어서기), Kenney 가구
// - 2D 사무실(office-game)과 같은 직원·자리·syncReal 형식 → 나중에 2D/3D 전환 버튼으로 붙인다
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const BASE = '/static/office-3d/assets/';
const ROOM = { w: 18, d: 12 };                       // 가로(X) 18m, 세로(Z) 12m. 북쪽 = -Z(화면 위)
const pct = (x, y) => [(x - 50) * ROOM.w / 100, (y - 50) * ROOM.d / 100];

// ★ 캐릭터 꾸미기는 여기만 고치면 된다(저장 → 브라우저 F5). 안내: docs/office-3d-edit.md
//   body : 'man'(남자) / 'woman'(여자)
//   hair : 'simpleparted'(옆 가르마) / 'buzzed'(짧은 머리) / 'long'(긴 머리) / 'buns'(올림머리) / 'buzzedfemale'(여자 짧은 머리)
//   여자만: skirt 치마 색, skirtLen 'short'(무릎 위)·'mini'(더 짧게), blouse 블라우스 색, legs 스타킹 색(없으면 맨다리), sheer 스타킹 진하기 0~1, shoes 구두 색
//   hairC: 머리 색, suit: 자켓 색, pants: 바지 색, tie: 넥타이 색(null = 넥타이 없음, 여자는 항상 없음)
//   색은 0x + 6자리 색 번호(예: 0x1f2f5c = 남색). 구글에서 'color picker' 검색 → HEX 값의 # 뒤 6자리
//   name: 이름표, short: 폰 이름표, home·face: 자리(2D와 같은 % 좌표)·보는 방향(s=앞, n=뒤)
export const CHARS = {
  captain:       { name: '캡틴', short: '캡틴',          role: '결재',        home: [50.0, 12.0], face: 's', body: 'man',   hair: 'simpleparted', hairC: 0x15120f, suit: 0x1f2f5c, pants: 0x1b2850, tie: 0x8b1a2b },
  claude:        { name: '비서실장', short: '비서실장',      role: '지휘',        home: [50.0, 36.0], face: 's', body: 'woman', hair: 'long',         hairC: 0x14100d, suit: 0x1e1e24, pants: 0x1e1e24, tie: null, skirt: 0x1e1e24, skirtLen: 'short', blouse: 0xf6f4ef, legs: 0x2a2424, sheer: 0.5, shoes: 0x111111 },  // 검정 정장 + 흰 블라우스 + 검은 스타킹
  finder:        { name: '시각 정보 비서', short: '시각비서', role: '사진 고르기', home: [17.0, 44.8], face: 's', body: 'woman', hair: 'buns',         hairC: 0x3a2618, suit: 0x2f6f73, pants: 0x24474a, tie: null, skirt: 0x2f6f73, skirtLen: 'mini',  blouse: 0xf4ead5, shoes: 0x2a1d14 },  // 청록 정장 + 크림 블라우스 + 갈색 구두
  agy:           { name: '메뉴 검사관', short: '메뉴검사',   role: '메뉴판 읽기', home: [72.0, 50.0], face: 'n', body: 'man',   hair: 'buzzed',       hairC: 0x18130f, suit: 0x3559a8, pants: 0x27407a, tie: 0xf2c84b },
  'menu-reader': { name: '자료 해석 비서', short: '자료해석', role: '메뉴판 읽기', home: [86.0, 50.0], face: 'n', body: 'man',   hair: 'simpleparted', hairC: 0x3a2a1c, suit: 0x3f7a4a, pants: 0x2c5534, tie: 0xe9e2cf },
  codex:         { name: '운영 감찰관', short: '감찰관',   role: '두 번째 검토', home: [10.0, 92.0], face: 'n', body: 'man',   hair: 'buzzed',       hairC: 0x0f0d0c, suit: 0x55595f, pants: 0x3d4045, tie: 0x2a2a2a },
  reviewer:      { name: '데이터 감사관', short: '감사관', role: '마지막 점검', home: [24.0, 92.0], face: 'n', body: 'man',   hair: 'simpleparted', hairC: 0x15120f, suit: 0x6d2633, pants: 0x3a2a2e, tie: 0xd9c9a3 },
  polisher:      { name: '수석 번역관', short: '번역관',   role: '번역·글',     home: [42.0, 80.0], face: 's', body: 'woman', hair: 'long',         hairC: 0x6b4226, suit: 0x5b3f86, pants: 0x3c2a5c, tie: null, skirt: 0x2b2733, skirtLen: 'short', blouse: 0xf2d4dc, shoes: 0x6d2633 },  // 보라 자켓 + 짙은 회색 치마 + 분홍 블라우스
  staffing:      { name: '인력 공급팀', short: '인력팀',   role: '인력 현황',   home: [62.0, 80.0], face: 's', body: 'woman', hair: 'buzzedfemale', hairC: 0x120e0c, suit: 0x7b2d3a, pants: 0x4c3a28, tie: null, skirt: 0x1c1a1d, skirtLen: 'mini',  blouse: 0xffffff, legs: 0x3a3030, sheer: 0.4, shoes: 0x1c1a1d },  // 와인색 자켓 + 검정 치마 + 회색 스타킹
  sorting:       { name: '선별팀', short: '선별팀',        role: '선별 실적',   home: [80.0, 80.0], face: 's', body: 'man',   hair: 'buzzed',       hairC: 0x1a1410, suit: 0x5d6a35, pants: 0x3f4824, tie: 0xb6452c },
};
const SKIN = 0xf1c9a5;
const SPOTS = { coffee: [-8.0, -3.2], window: [7.6, -4.6], sofa: [6.2, -3.4] };

// 의자에 앉은 사람 엉덩이 위치 맞춤(동작 파일 기준, 화면 보고 조정)
const SEAT_BACK = 0.36;      // 앉는 동작에서 엉덩이가 서 있던 자리보다 뒤로 들어가는 거리(실측 0.33m)
const DESK_GAP = 0.66;       // 의자 중심 → 책상 중심 거리(m)
const WALK_SPEED = 1.25;     // m/s

export async function create(root, opts = {}) {
  const onLog = opts.onLog || (() => {});
  const onSelect = opts.onSelect || (() => {});
  root.classList.add('o3-root');
  root.innerHTML = '<div class="o3-loading">3D 사무실 불러오는 중…</div><div class="o3-tags"></div><div class="o3-hint">끌어서 돌리기 · 휠/두 손가락 확대 · 사람 누르기</div>';
  const tagsEl = root.querySelector('.o3-tags');

  // ------------------------------------------------------------ 장면·카메라·빛
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  root.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1d2230);
  const camera = new THREE.PerspectiveCamera(34, 16 / 9, 0.1, 200);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.enablePan = false;
  controls.minPolarAngle = 0.35; controls.maxPolarAngle = 1.25;
  controls.minAzimuthAngle = -1.1; controls.maxAzimuthAngle = 1.1;
  controls.minDistance = 7; controls.maxDistance = 40;
  controls.target.set(0, 0.6, 0.4);

  scene.add(new THREE.HemisphereLight(0xfff4e6, 0x3b3f4a, 1.25));
  const sun = new THREE.DirectionalLight(0xfff0d8, 2.2);
  sun.position.set(9, 16, -6); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 10, bottom: -10, near: 1, far: 40 });
  sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.02;
  scene.add(sun);

  // ------------------------------------------------------------ 에셋 불러오기
  const loader = new GLTFLoader();
  const load = f => loader.loadAsync(BASE + f);
  const HAIRS = ['simpleparted', 'long', 'buns', 'buzzed', 'buzzedfemale'];
  const FURN = ['desk', 'chairDesk', 'computerScreen', 'computerKeyboard', 'laptop', 'kitchenCoffeeMachine', 'kitchenBar',
    'pottedPlant', 'plantSmall1', 'bookcaseOpen', 'loungeSofa', 'tableCoffee', 'rugRectangle', 'lampSquareFloor', 'trashcan', 'cardboardBoxClosed'];
  const [man, woman, anims, ...rest] = await Promise.all([
    load('man.glb'), load('woman.glb'), load('anims.glb'),
    ...HAIRS.map(h => load(`hair-${h}.glb`)),
    ...FURN.map(f => load(`furniture/${f}.glb`)),
  ]);
  const hairs = Object.fromEntries(HAIRS.map((h, i) => [h, rest[i]]));
  const furn = Object.fromEntries(FURN.map((f, i) => [f, rest[HAIRS.length + i].scene]));
  const clips = Object.fromEntries(anims.animations.map(a => [a.name, a]));
  root.querySelector('.o3-loading')?.remove();

  // Kenney 가구 크기를 실제 책상 높이(0.76m)에 맞춘다
  const deskH = new THREE.Box3().setFromObject(furn.desk).getSize(new THREE.Vector3()).y;
  const FS = 0.76 / deskH;
  function place(name, x, z, rot = 0, s = 1, y = 0) {
    const o = furn[name].clone(true);
    o.scale.setScalar(FS * s);
    // Kenney 모델은 원점이 모서리라 가운데로 옮긴다
    const box = new THREE.Box3().setFromObject(o); const c = box.getCenter(new THREE.Vector3());
    const pivot = new THREE.Group(); o.position.set(-c.x, -box.min.y, -c.z); pivot.add(o);
    pivot.position.set(x, y, z); pivot.rotation.y = rot;
    pivot.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
    scene.add(pivot);
    const sz = box.getSize(new THREE.Vector3());
    return { obj: pivot, size: sz };
  }

  // ------------------------------------------------------------ 방(바닥·벽·창)
  const obstacles = [];  // 길찾기용 막힌 사각형 [x0,z0,x1,z1]
  const block = (x, z, w, d, pad = 0.22) => obstacles.push([x - w / 2 - pad, z - d / 2 - pad, x + w / 2 + pad, z + d / 2 + pad]);
  {
    const cv = document.createElement('canvas'); cv.width = cv.height = 512; const g = cv.getContext('2d');
    g.fillStyle = '#b98f63'; g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#b38a5e' : '#c09669'; g.fillRect(0, i * 64, 512, 62); g.fillStyle = 'rgba(60,35,15,.25)'; g.fillRect(0, i * 64 + 62, 512, 2); g.fillRect(((i * 197) % 512), i * 64, 2, 62); }
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(ROOM.w / 4, ROOM.d / 4); tex.anisotropy = 4;
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(ROOM.w, ROOM.d), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    const base = new THREE.Mesh(new THREE.BoxGeometry(ROOM.w + 0.6, 0.3, ROOM.d + 0.6), new THREE.MeshStandardMaterial({ color: 0x3a3127 }));
    base.position.y = -0.16; scene.add(base);
    const wallM = new THREE.MeshStandardMaterial({ color: 0xeae3d6, roughness: 0.95 });
    const glassM = new THREE.MeshStandardMaterial({ color: 0xbfe3ff, emissive: 0x9fd0ff, emissiveIntensity: 0.55, roughness: 0.2 });
    const frameM = new THREE.MeshStandardMaterial({ color: 0x4a3c2e });
    const H = 2.7, T = 0.18;
    const wall = (x, z, w, d) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, H, d), wallM); m.position.set(x, H / 2, z); m.receiveShadow = true; m.castShadow = true; scene.add(m); };
    wall(0, -ROOM.d / 2 - T / 2, ROOM.w + T * 2, T);          // 북쪽 벽
    wall(-ROOM.w / 2 - T / 2, 0, T, ROOM.d);                    // 서쪽 벽
    wall(ROOM.w / 2 + T / 2, 0, T, ROOM.d);                     // 동쪽 벽
    const win = (x, z, w, rotY) => {
      const g2 = new THREE.Group();
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(w, 1.4), glassM); glass.position.y = 1.55; g2.add(glass);
      for (const yy of [0.84, 2.26]) { const b = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, 0.08, 0.06), frameM); b.position.y = yy; g2.add(b); }
      for (let k = 0; k <= 3; k++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.5, 0.06), frameM); b.position.set(-w / 2 + k * w / 3, 1.55, 0); g2.add(b); }
      g2.position.set(x, 0, z); g2.rotation.y = rotY; scene.add(g2);
    };
    const nz = -ROOM.d / 2 + 0.01;
    win(-4.5, nz, 3.0, 0); win(4.5, nz, 3.0, 0); win(ROOM.w / 2 - 0.01, -3.2, 2.8, -Math.PI / 2); win(ROOM.w / 2 - 0.01, 1.2, 2.8, -Math.PI / 2);
    // 캡틴 뒤 액자(회사 표지)
    const cv2 = document.createElement('canvas'); cv2.width = 512; cv2.height = 128; const g3 = cv2.getContext('2d');
    g3.fillStyle = '#1f2f5c'; g3.fillRect(0, 0, 512, 128); g3.fillStyle = '#e9d9a6'; g3.font = 'bold 54px system-ui, Malgun Gothic, sans-serif'; g3.textAlign = 'center'; g3.fillText('JINWOO · QR MENU', 256, 84);
    const t2 = new THREE.CanvasTexture(cv2); t2.colorSpace = THREE.SRGBColorSpace;
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.6), new THREE.MeshStandardMaterial({ map: t2 })); sign.position.set(0, 1.9, -ROOM.d / 2 + 0.02); scene.add(sign);
  }

  // ------------------------------------------------------------ 가구
  const FACE = { s: 0, n: Math.PI };
  const fwd = r => [Math.sin(r), Math.cos(r)];      // rotation.y = r 일 때 앞(+Z 기준)
  const seats = {};
  for (const [id, c] of Object.entries(CHARS)) {
    const [x, z] = pct(...c.home); const r = FACE[c.face]; const [fx, fz] = fwd(r);
    const dx = x + fx * DESK_GAP, dz = z + fz * DESK_GAP;
    const d = place('desk', dx, dz, r + Math.PI, id === 'captain' ? 1.25 : 1);
    const top = d.size.y;
    if (c.body === 'woman') place('laptop', dx, dz - fz * 0.05, r + Math.PI, 1, top);  // 화면이 앉은 사람 쪽(2026-11-22 캡틴 지적)
    else { place('computerScreen', dx, dz + fz * 0.2, r + Math.PI, 0.8, top); place('computerKeyboard', dx, dz - fz * 0.27, r + Math.PI, 1, top); }  // 화면이 앉은 사람 쪽을 본다
    const chair = place('chairDesk', x - fx * SEAT_BACK, z - fz * SEAT_BACK, r);
    block(dx, dz, d.size.x, d.size.z, 0.18);  // 책상은 0°/180°만 돌리므로 가로·세로 그대로
    seats[id] = { x, z, r, chair: chair.obj };
  }
  { // 커피 코너(서쪽 벽)
    const bar = place('kitchenBar', -ROOM.w / 2 + 0.45, -3.2, Math.PI / 2); block(-ROOM.w / 2 + 0.45, -3.2, bar.size.z, bar.size.x);
    place('kitchenCoffeeMachine', -ROOM.w / 2 + 0.4, -3.2, Math.PI / 2, 1, bar.size.y);
    const b2 = place('bookcaseOpen', -6.2, -ROOM.d / 2 + 0.3, 0, 1.2); block(-6.2, -ROOM.d / 2 + 0.3, b2.size.x, b2.size.z);
    const b3 = place('bookcaseOpen', -3.6, -ROOM.d / 2 + 0.3, 0, 1.2); block(-3.6, -ROOM.d / 2 + 0.3, b3.size.x, b3.size.z);
    // 창가 휴게 공간(동북쪽)
    place('rugRectangle', 6.4, -3.6, 0, 1.6);
    const sofa = place('loungeSofa', 6.2, -5.2, 0, 1.15); block(6.2, -5.2, sofa.size.x, sofa.size.z);
    const tb = place('tableCoffee', 6.2, -3.9, 0, 1.1); block(6.2, -3.9, tb.size.x, tb.size.z, 0.1);
    for (const [x, z] of [[-ROOM.w / 2 + 0.5, -ROOM.d / 2 + 0.5], [ROOM.w / 2 - 0.5, -ROOM.d / 2 + 0.5], [ROOM.w / 2 - 0.5, ROOM.d / 2 - 0.6], [-ROOM.w / 2 + 0.5, 1.8]]) {
      const p = place('pottedPlant', x, z, 0, 1.6); block(x, z, p.size.x, p.size.z);
    }
    place('lampSquareFloor', 3.6, -ROOM.d / 2 + 0.4, 0, 1.3);
    place('trashcan', -1.6, -4.9, 0, 0.6); place('cardboardBoxClosed', -8.2, 5.2, 0.3); place('cardboardBoxClosed', -8.0, 4.6, -0.2, 0.8);
  }

  // ------------------------------------------------------------ 길찾기(0.3m 격자 A*)
  const CELL = 0.3, GW = Math.round(ROOM.w / CELL), GD = Math.round(ROOM.d / CELL);
  const grid = new Uint8Array(GW * GD);
  const toCell = (x, z) => [Math.min(GW - 1, Math.max(0, Math.floor((x + ROOM.w / 2) / CELL))), Math.min(GD - 1, Math.max(0, Math.floor((z + ROOM.d / 2) / CELL)))];
  const toPos = (i, j) => [-ROOM.w / 2 + (i + 0.5) * CELL, -ROOM.d / 2 + (j + 0.5) * CELL];
  for (let j = 0; j < GD; j++) for (let i = 0; i < GW; i++) {
    const [x, z] = toPos(i, j);
    const edge = x < -ROOM.w / 2 + 0.35 || x > ROOM.w / 2 - 0.35 || z < -ROOM.d / 2 + 0.35 || z > ROOM.d / 2 - 0.35;
    grid[j * GW + i] = edge || obstacles.some(([a, b, c, d]) => x > a && x < c && z > b && z < d) ? 1 : 0;
  }
  const free = (i, j) => i >= 0 && j >= 0 && i < GW && j < GD && !grid[j * GW + i];
  function nearestFree(i, j) {
    if (free(i, j)) return [i, j];
    for (let r = 1; r < 12; r++) for (let dj = -r; dj <= r; dj++) for (let di = -r; di <= r; di++) if (free(i + di, j + dj)) return [i + di, j + dj];
    return [i, j];
  }
  function findPath(from, to) {
    const s = nearestFree(...toCell(...from)), g = nearestFree(...toCell(...to));
    const key = (i, j) => j * GW + i, open = new Map(), came = new Map(), gs = new Map();
    const h = (i, j) => Math.hypot(i - g[0], j - g[1]);
    gs.set(key(...s), 0); open.set(key(...s), [s[0], s[1], h(...s)]);
    let found = false, guard = 0;
    while (open.size && guard++ < 20000) {
      let bk, bv; for (const [k, v] of open) if (!bv || v[2] < bv[2]) { bk = k; bv = v; }
      open.delete(bk); const [ci, cj] = bv;
      if (ci === g[0] && cj === g[1]) { found = true; break; }
      for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
        if (!di && !dj) continue; const ni = ci + di, nj = cj + dj;
        if (!free(ni, nj) || (di && dj && (!free(ci + di, cj) || !free(ci, cj + dj)))) continue;
        const ng = gs.get(bk) + Math.hypot(di, dj), nk = key(ni, nj);
        if (ng < (gs.get(nk) ?? Infinity)) { gs.set(nk, ng); came.set(nk, bk); open.set(nk, [ni, nj, ng + h(ni, nj)]); }
      }
    }
    if (!found) return [from, to];
    const cells = []; let k = key(...g); while (k !== undefined) { cells.push([k % GW, Math.floor(k / GW)]); k = came.get(k); }
    cells.reverse();
    // 줄 당기기: 보이는 곳까지는 곧장 간다
    const los = (a, b) => { const n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * 2); for (let t = 0; t <= n; t++) { const i = Math.round(a[0] + (b[0] - a[0]) * t / n), j = Math.round(a[1] + (b[1] - a[1]) * t / n); if (!free(i, j)) return false; } return true; };
    const out = [cells[0]]; let a = 0;
    while (a < cells.length - 1) { let b = cells.length - 1; while (b > a + 1 && !los(cells[a], cells[b])) b--; out.push(cells[b]); a = b; }
    const pts = out.map(c => toPos(...c)); pts[0] = from; pts.push(to); return pts;
  }

  // ------------------------------------------------------------ 사람(옷 색은 뼈대 부위로 칠한다)
  function addRegions(geo, skeleton) {
    if (geo.getAttribute('aRegion')) return;
    const si = geo.getAttribute('skinIndex'), sw = geo.getAttribute('skinWeight'), pos = geo.getAttribute('position');
    // 부위마다 0/1 값 4개(피부·자켓·바지·신발)를 꼭짓점에 붙이고, 화면에서는 가장 큰 값으로 칠한다.
    // (부위 번호 하나를 넘기면 삼각형 안에서 중간 번호 색이 섞여 얼룩이 생긴다)
    const names = skeleton.bones.map(b => b.name); const reg = new Float32Array(pos.count * 4);
    for (let v = 0; v < pos.count; v++) {
      let best = 0, bw = -1; for (let k = 0; k < 4; k++) { const w = sw.getComponent(v, k); if (w > bw) { bw = w; best = si.getComponent(v, k); } }
      const n = names[best] || ''; const y = pos.getY(v);
      let r;
      if (/^(head|neck|hand|thumb|index|middle|ring|pinky)/i.test(n)) r = 0;
      else if (/^(foot|ball)/i.test(n)) r = 3;
      else if (/^(thigh|calf)/i.test(n)) r = 2;
      else if (/^pelvis/i.test(n)) r = y > 1.0 ? 1 : 2;
      else r = 1;
      reg[v * 4 + r] = 1;
    }
    geo.setAttribute('aReg', new THREE.BufferAttribute(reg, 4));
  }
  // 여자 치마 정장: 치마 길이(무릎 0.53m 기준, 'mini' 0.80 · 'short' 0.74), 다리(살색/스타킹), 구두
  const SKIRT_Y = { mini: 0.80, short: 0.74 };
  const W = c => ({
    skirt: c.skirt ?? c.suit, blouse: c.blouse ?? 0xf3f1ec, legs: c.legs ?? SKIN, legMix: c.legs == null ? 0 : (c.sheer ?? 0.55),
    shoes: c.shoes ?? 0x1a1a1a, y: SKIRT_Y[c.skirtLen || 'short'],
  });
  function dressMaterial(mat, c) {
    const m = mat.clone();
    const isW = c.body === 'woman', w = W(c);
    const cols = [SKIN, c.suit, isW ? w.skirt : c.pants, isW ? w.shoes : 0x151515, isW ? w.blouse : 0xf3f1ec, c.tie ?? 0xf3f1ec].map(h => new THREE.Color(h));
    m.onBeforeCompile = sh => {
      sh.uniforms.uCol = { value: cols };
      sh.uniforms.uTie = { value: c.tie == null || isW ? 0 : 1 };
      sh.uniforms.uWoman = { value: isW ? 1 : 0 };
      sh.uniforms.uSkirtY = { value: w.y };
      sh.uniforms.uLegs = { value: new THREE.Color(w.legs) };
      sh.uniforms.uLegMix = { value: w.legMix };
      sh.vertexShader = 'attribute vec4 aReg;\nvarying vec4 vReg;\nvarying vec3 vBind;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvReg = aReg; vBind = position;');
      // 셔츠 V자·넥타이·블라우스·치마 길이는 앉기 전 자세(bind) 좌표로 그려서 움직여도 따라간다
      sh.fragmentShader = 'uniform vec3 uCol[6];\nuniform float uTie, uWoman, uSkirtY, uLegMix;\nuniform vec3 uLegs;\nvarying vec4 vReg;\nvarying vec3 vBind;\n' + sh.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
        float lum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
        int rg = 0; float bv = vReg.x;
        if (vReg.y > bv) { rg = 1; bv = vReg.y; }
        if (vReg.z > bv) { rg = 2; bv = vReg.z; }
        if (vReg.w > bv) { rg = 3; }
        bool legSkin = false;
        if (uWoman > 0.5) {
          if (rg == 1 && vBind.z > -0.01 && vBind.y > 1.2 && vBind.y < 1.47 && abs(vBind.x) < 0.006 + (vBind.y - 1.2) * 0.3) rg = 4;  // 블라우스 V
          if (rg == 2 && vBind.y < uSkirtY) legSkin = true;                                                                       // 치마 아래 다리
        } else if (rg == 1 && uTie > 0.5 && vBind.z > 0.04 && vBind.y > 1.17 && vBind.y < 1.56) {
          float hw = 0.012 + (vBind.y - 1.17) * 0.24;
          if (abs(vBind.x) < hw) rg = (abs(vBind.x) < 0.022 && vBind.y < 1.52) ? 5 : 4;
        }
        vec3 skin = mix(diffuseColor.rgb, uCol[0] * (0.62 + 0.6 * lum), uWoman > 0.5 ? 0.9 : 0.7);  // 여자 원본 피부 텍스처가 어두워서 더 밝게
        if (rg == 0) diffuseColor.rgb = skin;
        else if (legSkin) diffuseColor.rgb = mix(skin, uLegs * (0.8 + 0.3 * lum), uLegMix);
        else diffuseColor.rgb = uCol[rg] * (0.78 + 0.3 * lum);`);
    };
    m.customProgramCacheKey = () => 'o3dress';
    return m;
  }

  // 치마: 허리~치마 끝까지 몸을 감싸는 원뿔 천. 위는 골반, 아래는 양 허벅지 뼈를 따라 움직인다(앉으면 앞으로 접힘)
  const skirtFit = new WeakMap();
  function makeSkirt(body, c) {
    const geo = body.geometry, w = W(c);
    if (!skirtFit.has(geo)) {
      const pos = geo.getAttribute('position'), reg = geo.getAttribute('aReg');
      const rows = 7, top = 1.02, fit = [];
      for (let r = 0; r < rows; r++) {
        const y = top - (top - w.y) * r / (rows - 1); let xm = 0, z0 = 9, z1 = -9;
        for (let v = 0; v < pos.count; v++) {
          if (reg.getX(v) > 0.5 || Math.abs(pos.getY(v) - y) > 0.03 || Math.abs(pos.getX(v)) > 0.4) continue;
          xm = Math.max(xm, Math.abs(pos.getX(v))); z0 = Math.min(z0, pos.getZ(v)); z1 = Math.max(z1, pos.getZ(v));
        }
        fit.push({ y, rx: xm + 0.018, cz: (z0 + z1) / 2, rz: (z1 - z0) / 2 + 0.02 });
      }
      skirtFit.set(geo, fit);
    }
    const fit = skirtFit.get(geo), seg = 36, names = body.skeleton.bones.map(b => b.name);
    const bi = n => names.indexOf(n), P = bi('pelvis'), L = bi('thigh_l'), R = bi('thigh_r');
    const vtx = [], idx = [], si = [], sw = [];
    fit.forEach((f, r) => {
      const t = r / (fit.length - 1), flare = 1 + t * 0.12, tw = Math.min(1, t * 1.25);
      for (let s = 0; s <= seg; s++) {
        const a = s / seg * Math.PI * 2, x = Math.sin(a) * f.rx * flare, z = f.cz + Math.cos(a) * f.rz * flare;
        vtx.push(x, f.y, z);
        const wl = Math.min(1, Math.max(0, 0.5 + x / (f.rx * 1.4)));
        si.push(P, L, R, 0); sw.push(1 - tw, tw * wl, tw * (1 - wl), 0);
      }
    });
    for (let r = 0; r < fit.length - 1; r++) for (let s = 0; s < seg; s++) {
      const a = r * (seg + 1) + s, b = a + seg + 1; idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(vtx, 3)); g.setIndex(idx);
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4)); g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
    g.computeVertexNormals();
    const mesh = new THREE.SkinnedMesh(g, new THREE.MeshStandardMaterial({ color: w.skirt, roughness: 0.75, side: THREE.DoubleSide }));
    mesh.castShadow = true; mesh.frustumCulled = false;
    body.parent.add(mesh); mesh.bind(body.skeleton, body.bindMatrix);
    return mesh;
  }

  const npcs = {};
  const clickables = [];
  // 꾸미기 창에서 바꾼 모습(이 브라우저에 저장). CHARS 기본값 위에 덮어쓴다
  const LOOK_KEY = 'jinwoo_office3d_looks';
  const LOOK_FIELDS = ['body', 'hair', 'hairC', 'suit', 'pants', 'tie', 'skirt', 'skirtLen', 'blouse', 'legs', 'sheer', 'shoes'];
  let savedLooks = {};
  try { savedLooks = JSON.parse(localStorage.getItem(LOOK_KEY) || '{}') || {}; } catch { savedLooks = {}; }
  const baseLook = id => Object.fromEntries(LOOK_FIELDS.map(k => [k, CHARS[id][k]]));
  const lookOf = id => ({ ...CHARS[id], ...(savedLooks[id] || {}) });

  // 사람 한 명의 3D 모습(몸·옷·머리·치마)을 만든다. 꾸미기에서 바꾸면 이것만 다시 부른다
  function buildAvatar(id, c) {
    const src = c.body === 'woman' ? woman.scene : man.scene;
    const o = SkeletonUtils.clone(src);
    const own = [];   // 이 사람만 쓰는 재질·모양(다시 만들 때 버림)
    let body = null; const bones = {};
    o.traverse(n => {
      if (n.isBone) bones[n.name] = n;
      if (n.isSkinnedMesh) {
        n.castShadow = true; n.frustumCulled = false;
        if (/superhero/i.test(n.material.name)) { addRegions(n.geometry, n.skeleton); n.material = dressMaterial(n.material, c); own.push(n.material); body = n; }
      }
    });
    if (c.body === 'woman' && body) { const sk = makeSkirt(body, c); own.push(sk.geometry, sk.material); }
    // 머리카락: 같은 이름 뼈대에 다시 묶는다
    (hairs[c.hair] || hairs.simpleparted).scene.traverse(n => {
      if (!n.isSkinnedMesh) return;
      const mat = n.material.clone(); mat.color = new THREE.Color(c.hairC); mat.roughness = 0.7; own.push(mat);
      const hm = new THREE.SkinnedMesh(n.geometry, mat); hm.castShadow = true; hm.frustumCulled = false;
      const sk = new THREE.Skeleton(n.skeleton.bones.map(b => bones[b.name] || b), n.skeleton.boneInverses);
      (body?.parent || o).add(hm); hm.bind(sk, n.bindMatrix);
    });
    const mixer = new THREE.AnimationMixer(o);
    const act = {}; for (const [k, clip] of Object.entries(clips)) act[k] = mixer.clipAction(clip);
    for (const k of ['Sitting_Enter', 'Sitting_Exit', 'Interact']) { act[k].setLoop(THREE.LoopOnce, 1); act[k].clampWhenFinished = true; }
    const hit = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 1.8, 8), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.y = 0.9; hit.userData.id = id; o.add(hit); own.push(hit.geometry, hit.material);
    return { o, mixer, act, hit, own };
  }

  for (const id of Object.keys(CHARS)) {
    const c = lookOf(id);
    const av = buildAvatar(id, c);
    const s = seats[id];
    av.o.position.set(s.x, 0, s.z); av.o.rotation.y = s.r; scene.add(av.o); clickables.push(av.hit);
    const tag = document.createElement('div'); tag.className = 'o3-tag' + (id === 'captain' ? ' me' : '');
    tag.innerHTML = '<span class="bb"></span><span class="nm"></span>'; tag.querySelector('.nm').textContent = c.name; tagsEl.appendChild(tag);  // 좁은 화면은 drawTags에서 짧은 이름
    npcs[id] = { id, c, o: av.o, mixer: av.mixer, act: av.act, hit: av.hit, own: av.own, cur: null, state: 'seated', mode: 'idle', path: null, queue: [], tag, bubble: '', bubbleType: '' };
    play(npcs[id], 'Sitting_Idle_Loop', 0);
    av.mixer.update(Math.random() * 3);
  }

  // 모습만 바꿔 끼운다(자리·하던 동작·걷던 길은 그대로)
  function relook(id, look) {
    const n = npcs[id]; if (!n) return;
    n.c = { ...CHARS[id], ...look };
    const old = { o: n.o, hit: n.hit, own: n.own, name: n.cur?.getClip().name || 'Idle_Loop', time: n.cur?.time || 0 };
    const av = buildAvatar(id, n.c);
    av.o.position.copy(old.o.position); av.o.rotation.y = old.o.rotation.y;
    scene.remove(old.o); old.own.forEach(d => d.dispose?.());
    clickables.splice(clickables.indexOf(old.hit), 1, av.hit);
    scene.add(av.o);
    Object.assign(n, { o: av.o, mixer: av.mixer, act: av.act, hit: av.hit, own: av.own, cur: null });
    const a = play(n, old.name, 0); if (a) a.time = old.time;
    watchOnce(n);   // 일어서기·앉기 도중이면 새 모습에서 끝날 때를 다시 기다린다
    av.mixer.update(0);
  }

  function play(n, name, fade = 0.35) {
    const a = n.act[name]; if (!a || n.cur === a) return a;
    a.reset(); a.enabled = true; a.setEffectiveWeight(1); a.setEffectiveTimeScale(1); a.play();
    if (n.cur && fade > 0) n.cur.crossFadeTo(a, fade, false); else if (n.cur) n.cur.stop();
    n.cur = a; return a;
  }
  // 한 번만 하는 동작(앉기·일어서기·커피)이 끝날 때까지 기다린다. 모습을 바꾸면 새 몸에서 다시 기다린다
  function once(n, name, fade = 0.25) {
    return new Promise(res => { n.onceWait = { name, res }; play(n, name, fade); watchOnce(n); });
  }
  function watchOnce(n) {
    const w = n.onceWait; if (!w) return;
    const a = n.act[w.name], mx = n.mixer;
    const done = e => {
      if (e.action !== a) return;
      mx.removeEventListener('finished', done);
      if (n.onceWait === w) { n.onceWait = null; w.res(); }
    };
    mx.addEventListener('finished', done);
  }
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const say = (n, text, type = 'talk', ms = 0) => { n.bubble = text; n.bubbleType = type; if (ms) setTimeout(() => { if (n.bubble === text) n.bubble = ''; }, ms); };

  // ------------------------------------------------------------ 동작: 일어서기 → 걷기 → 앉기
  async function standUp(n) {
    if (n.state !== 'seated') return;
    n.state = 'standing';
    await once(n, 'Sitting_Exit');
    play(n, 'Idle_Loop', 0.2);
  }
  function walkTo(n, x, z) {
    return new Promise(res => {
      n.path = findPath([n.o.position.x, n.o.position.z], [x, z]); n.pathI = 1; n.onArrive = res;
      n.state = 'walking'; play(n, n.id === 'captain' ? 'Walk_Formal_Loop' : 'Walk_Loop', 0.25);
    });
  }
  async function turnTo(n, r) { n.targetRot = r; await sleep(380); }
  async function sitDown(n) {
    const s = seats[n.id];
    await walkTo(n, s.x, s.z);
    await turnTo(n, s.r);
    n.o.position.set(s.x, 0, s.z); n.o.rotation.y = s.r; n.targetRot = null;
    n.state = 'sitting';
    await once(n, 'Sitting_Enter');
    n.state = 'seated';
    play(n, n.mode === 'work' ? 'Sitting_Talking_Loop' : 'Sitting_Idle_Loop', 0.3);
  }
  async function idleFor(n, ms, anim = 'Idle_Loop') { play(n, anim, 0.25); await sleep(ms); }

  // 한 사람이 하는 일을 순서대로(겹치지 않게)
  function task(n, fn) {
    n.queue.push(fn);
    if (n.running) return;
    n.running = true;
    (async () => {
      while (n.queue.length) { try { await n.queue.shift()(); } catch (e) { console.warn('office-3d', e); } }
      n.running = false;
    })();
  }
  const nearCaptain = () => { const s = seats.captain; const [fx, fz] = fwd(s.r); return [s.x + fx * (DESK_GAP * 2 + 0.6), s.z + fz * (DESK_GAP * 2 + 0.6)]; };

  function walkReport(id, text = '보고드립니다!') {
    const n = npcs[id]; if (!n || id === 'captain' || n.running) return;
    onLog(`${n.c.name} → 캡틴에게 보고하러 감`);
    task(n, async () => {
      await standUp(n);
      const [x, z] = nearCaptain();
      await walkTo(n, x + (Math.random() - 0.5) * 0.8, z);
      await turnTo(n, Math.PI);  // 캡틴(북쪽)을 본다
      say(n, text, 'talk'); say(npcs.captain, '수고했어요 👍', 'talk', 3600);
      await idleFor(n, 3600, 'Idle_Talking_Loop'); n.bubble = '';
      await sitDown(n);
      onLog(`${n.c.name} 자리로 돌아와 앉음`);
    });
  }
  function captainCoffee() {
    const n = npcs.captain; if (n.running) return;
    onLog('캡틴 커피 타러 감 ☕');
    task(n, async () => {
      await standUp(n);
      await walkTo(n, SPOTS.coffee[0] + 0.9, SPOTS.coffee[1]);
      await turnTo(n, -Math.PI / 2);
      await once(n, 'Interact'); say(n, '☕', 'talk', 2500);
      await idleFor(n, 1500);
      await walkTo(n, ...SPOTS.window);
      await turnTo(n, Math.PI / 2 + 0.3);
      say(n, '오늘도 좋은 하루', 'talk', 3500); await idleFor(n, 4200);
      await sitDown(n);
      onLog('캡틴 자리로 돌아옴');
    });
  }
  function coffeeStroll(id) {
    const n = npcs[id]; if (!n || n.running) return;
    onLog(`${n.c.name} 잠깐 커피 휴식`);
    task(n, async () => {
      await standUp(n);
      await walkTo(n, SPOTS.coffee[0] + 1.0, SPOTS.coffee[1] + (Math.random() - 0.5));
      await turnTo(n, -Math.PI / 2);
      await once(n, 'Interact'); await idleFor(n, 1800);
      await sitDown(n);
    });
  }
  function setWork(id, text) {
    const n = npcs[id]; if (!n) return;
    n.mode = 'work'; say(n, text, 'work');
    if (n.state === 'seated') play(n, 'Sitting_Talking_Loop', 0.4);
  }
  function setIdle(id, done = false) {
    const n = npcs[id]; if (!n) return;
    n.mode = done ? 'done' : 'idle';
    if (n.bubbleType === 'work') n.bubble = done ? '완료 ✔' : '';
    if (done) n.bubbleType = 'done';
    if (n.state === 'seated') play(n, 'Sitting_Idle_Loop', 0.4);
  }

  // ------------------------------------------------------------ 시연(22초)
  let isDemo = false;
  function demo() {
    if (isDemo) return; isDemo = true; onLog('▶ 시연 시작: 새 가게 제작');
    const at = (ms, f) => setTimeout(f, ms);
    at(0, () => { say(npcs.captain, '새 가게 사진 올렸어', 'talk', 3000); });
    at(1500, () => walkReport('claude', '지시 받았습니다!'));
    at(4000, () => setWork('finder', '📷 사진 고르는 중'));
    at(6000, () => { setWork('agy', '📖 메뉴판 읽는 중'); setWork('menu-reader', '📖 메뉴판 대조 중'); });
    at(9000, () => { setIdle('finder', true); setWork('polisher', '🌐 5개 언어 번역 중'); });
    at(12000, () => { setIdle('agy', true); setIdle('menu-reader', true); setWork('codex', '🔍 가격 재확인'); });
    at(15000, () => { setIdle('codex', true); setWork('reviewer', '✅ 마지막 점검'); setIdle('polisher', true); });
    at(18500, () => { setIdle('reviewer', true); walkReport('reviewer', '점검 통과!'); });
    at(21000, () => walkReport('claude', '결재 올립니다! (배포 대기)'));
    at(27000, () => { for (const id of Object.keys(npcs)) if (npcs[id].mode === 'done') setIdle(id); isDemo = false; onLog('✔ 시연 끝'); });
  }

  // ------------------------------------------------------------ 실제 대시보드 데이터(2D와 같은 형식)
  let prevActive = new Set(), prevDoneOrder = null;
  function syncReal({ orders = [], jobs = [], collector = null } = {}) {
    if (isDemo) return;
    const active = new Map();
    for (const j of jobs.filter(x => x.status === 'running')) if (CHARS[j.desk]) active.set(j.desk, j.tool === 'shot' ? '📱 화면 캡처 중…' : '🔍 표준 점검 중…');
    if (collector?.job?.status === 'running') active.set('finder', `📷 사진 수집 중 (${collector.job.photos || 0}장)`);
    const running = orders.filter(o => o.status === 'running');
    for (const o of running) {
      const last = o.steps?.at(-1);
      active.set('claude', last ? `${last.text.slice(0, 22)}…` : '📋 지시 진행 중…');
      for (const d of (o.active || [])) if (CHARS[d]) active.set(d, last?.who === d ? last.text.slice(0, 22) : `${CHARS[d].role} 중…`);
    }
    const cleared = o => o.deploy?.length ? o.deployState === 'done' : !!o.seenAt;
    const doneSet = new Set(); for (const o of orders.filter(o => o.status === 'done' && !cleared(o))) (o.worked || []).forEach(d => doneSet.add(d));
    for (const id of prevActive) if (!active.has(id) && id !== 'claude' && CHARS[id]) walkReport(id, '작업 완료 보고!');
    const latestDone = orders.find(o => o.status === 'done' && !cleared(o));
    if (latestDone && prevDoneOrder && latestDone.id !== prevDoneOrder && !running.length) walkReport('claude', '결재 올립니다!');
    if (latestDone) prevDoneOrder = latestDone.id;
    prevActive = new Set(active.keys());
    for (const id of Object.keys(npcs)) {
      if (id === 'captain') continue;
      if (active.has(id)) setWork(id, active.get(id)); else setIdle(id, doneSet.has(id));
    }
  }

  // 한가할 때 가끔 움직임
  let nextCap = performance.now() + 20000, nextStroll = performance.now() + 12000;
  function ambient(now) {
    if (isDemo) return;
    if (now > nextCap) { nextCap = now + 45000 + Math.random() * 30000; captainCoffee(); }
    if (now > nextStroll) {
      nextStroll = now + 22000 + Math.random() * 18000;
      const idle = Object.values(npcs).filter(n => n.id !== 'captain' && n.mode === 'idle' && !n.running);
      if (idle.length) coffeeStroll(idle[Math.floor(Math.random() * idle.length)].id);
    }
  }

  // ------------------------------------------------------------ 시점
  const VIEWS = [{ az: 0, pol: 0.78, k: 1 }, { az: 0.55, pol: 0.9, k: 0.9 }, { az: 0, pol: 0.42, k: 1.05 }, { az: -0.6, pol: 1.05, k: 0.75 }];
  let viewI = 0;
  function fitDistance() {
    // 방 가로(18m)가 화면 폭에, 세로(12m)가 화면 높이에 들어가는 거리 중 먼 쪽
    const vf = THREE.MathUtils.degToRad(camera.fov / 2), hf = Math.atan(Math.tan(vf) * camera.aspect);
    const byW = (ROOM.w / 2 + 0.6) / Math.tan(hf) + ROOM.d * 0.35;
    const byD = (ROOM.d / 2 + 1.2) / Math.tan(vf) * 0.95;
    return Math.max(byW, byD) * 0.97;
  }
  function applyView(v) {
    const dist = fitDistance() * v.k;
    const t = controls.target;
    camera.position.set(t.x + dist * Math.sin(v.pol) * Math.sin(v.az), t.y + dist * Math.cos(v.pol), t.z + dist * Math.sin(v.pol) * Math.cos(v.az));
    camera.lookAt(t); controls.update();
  }
  function nextView() { viewI = (viewI + 1) % VIEWS.length; applyView(VIEWS[viewI]); }

  // ------------------------------------------------------------ 클릭
  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
  let downAt = null;
  const onDown = e => { downAt = [e.clientX, e.clientY]; };
  const onUp = e => {
    if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return;
    const r = renderer.domElement.getBoundingClientRect();
    mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(mouse, camera);
    const h = ray.intersectObjects(clickables, false)[0];
    if (h) {
      const n = npcs[h.object.userData.id];
      if (editor.open) editor.pick(n.id);
      onSelect(n.id, { name: n.c.name, role: n.c.role, state: stateText(n) });
    }
  };
  const stateText = n => n.bubble || ({ seated: '자리에 앉아 있음', walking: '걷는 중', standing: '서 있음', sitting: '앉는 중' }[n.state] || n.state);
  renderer.domElement.addEventListener('pointerdown', onDown);
  renderer.domElement.addEventListener('pointerup', onUp);

  // ------------------------------------------------------------ 크기·그리기
  function resize() {
    const w = root.clientWidth || 800, h = root.clientHeight || 450;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    applyView(VIEWS[viewI]);
  }
  const ro = new ResizeObserver(resize); ro.observe(root); resize();

  const clock = new THREE.Clock(); const v3 = new THREE.Vector3();
  let raf = 0, alive = true;
  function step(dt) {
    for (const n of Object.values(npcs)) {
      if (n.state === 'walking' && n.path) {
        const p = n.path[n.pathI];
        const dx = p[0] - n.o.position.x, dz = p[1] - n.o.position.z, dist = Math.hypot(dx, dz);
        const mv = WALK_SPEED * dt;
        if (dist <= mv) {
          n.o.position.x = p[0]; n.o.position.z = p[1]; n.pathI++;
          if (n.pathI >= n.path.length) { n.path = null; n.state = 'standing'; play(n, 'Idle_Loop', 0.25); const f = n.onArrive; n.onArrive = null; f && f(); }
        } else {
          n.o.position.x += dx / dist * mv; n.o.position.z += dz / dist * mv;
          n.targetRot = Math.atan2(dx, dz);
        }
      }
      if (n.targetRot != null) {
        let d = n.targetRot - n.o.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d));
        n.o.rotation.y += d * Math.min(1, dt * 9);
      }
      n.mixer.update(dt);
    }
  }
  function drawTags() {
    const w = root.clientWidth, h = root.clientHeight;
    for (const n of Object.values(npcs)) {
      v3.set(n.o.position.x, n.state === 'seated' || n.state === 'sitting' ? 1.55 : 2.0, n.o.position.z).project(camera);
      const vis = v3.z < 1 && Math.abs(v3.x) < 1.1 && Math.abs(v3.y) < 1.1;
      n.tag.style.display = vis ? '' : 'none'; if (!vis) continue;
      n.tag.style.left = `${(v3.x + 1) / 2 * w}px`; n.tag.style.top = `${(1 - v3.y) / 2 * h}px`;
      n.tag.style.zIndex = String(1000 - Math.round(v3.z * 1000));
      const nm = n.tag.lastChild, label = w < 560 ? n.c.short : n.c.name; if (nm.textContent !== label) nm.textContent = label;
      const bb = n.tag.firstChild; if (bb.textContent !== n.bubble) bb.textContent = n.bubble;
      bb.className = 'bb ' + (n.bubbleType || '');
    }
  }
  function loop() {
    if (!alive) return;
    raf = requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.1);
    step(dt); ambient(performance.now()); controls.update(); renderer.render(scene, camera); drawTags();
  }
  loop();
  onLog('3D 사무실 준비 완료');

  // ------------------------------------------------------------ 🎨 꾸미기 창(캡틴이 화면에서 직접 고침, 2026-11-22 '마-2')
  const editor = makeEditor();
  function makeEditor() {
    const PAL = [0x1e1e24, 0x3a3f47, 0x55595f, 0x8c8f99, 0xf3f1ec, 0x1f2f5c, 0x3559a8, 0x2f6f73, 0x3f7a4a, 0x5d6a35,
      0x5b3f86, 0xd98aa0, 0x6d2633, 0x8b1a2b, 0xd97757, 0xf2c84b, 0xc8b391, 0x7a5a3a];
    const HAIR_PAL = [0x0f0d0c, 0x2b1d14, 0x3a2618, 0x5a3a22, 0x6b4226, 0x8a5a2b, 0xb08850, 0xd8c07a, 0x9a9a9a, 0x7a1f1f, 0x3b4a7a];
    const HAIR_NAMES = { simpleparted: '옆 가르마', buzzed: '짧은 머리', long: '긴 머리', buns: '올림머리', buzzedfemale: '여자 단발' };
    const hex = v => '#' + (v >>> 0).toString(16).padStart(6, '0');
    const num = s => parseInt(String(s).replace('#', ''), 16);
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'o3-edit-btn'; btn.textContent = '🎨 꾸미기';
    root.appendChild(btn);
    const panel = document.createElement('section');
    panel.className = 'o3-editor'; panel.hidden = true;
    root.insertAdjacentElement('afterend', panel);
    let cur = 'captain', draft = null, timer = 0;
    const st = { open: false, pick, close };

    function row(label, inner) { return `<div class="o3e-row"><span class="o3e-lb">${label}</span><div class="o3e-ctl">${inner}</div></div>`; }
    function chips(key, opts, val) { return opts.map(([v, t]) => `<button type="button" class="o3e-chip${v === val ? ' on' : ''}" data-k="${key}" data-v="${v}">${t}</button>`).join(''); }
    function swatches(key, pal, val, extra = '') {
      return pal.map(v => `<button type="button" class="o3e-sw${v === val ? ' on' : ''}" style="background:${hex(v)}" data-k="${key}" data-c="${v}" title="${hex(v)}"></button>`).join('')
        + `<label class="o3e-pick" title="직접 고르기"><input type="color" data-k="${key}" value="${hex(val ?? 0x888888)}"><span>＋</span></label>` + extra;
    }
    function render() {
      const c = draft, w = c.body === 'woman';
      const opts = Object.keys(CHARS).map(id => `<option value="${id}"${id === cur ? ' selected' : ''}>${CHARS[id].name}</option>`).join('');
      panel.innerHTML = `
        <div class="o3e-head"><b>🎨 꾸미기</b>
          <select class="o3e-who">${opts}</select>
          <span class="o3e-tip">사무실 안의 사람을 눌러도 바뀝니다</span></div>
        ${row('몸', chips('body', [['man', '남자'], ['woman', '여자']], c.body))}
        ${row('머리 모양', chips('hair', Object.entries(HAIR_NAMES), c.hair))}
        ${row('머리 색', swatches('hairC', HAIR_PAL, c.hairC))}
        ${row('자켓', swatches('suit', PAL, c.suit))}
        ${w ? row('치마', swatches('skirt', PAL, c.skirt ?? c.suit)) + row('치마 길이', chips('skirtLen', [['short', '무릎 위'], ['mini', '미니']], c.skirtLen || 'short'))
              + row('블라우스', swatches('blouse', PAL, c.blouse ?? 0xf3f1ec))
              + row('스타킹', swatches('legs', [0x1e1e24, 0x3a3030, 0x8c8f99, 0xd9b89a], c.legs, `<button type="button" class="o3e-chip${c.legs == null ? ' on' : ''}" data-k="legs" data-v="none">맨다리</button>`))
              + row('구두', swatches('shoes', [0x111111, 0x2a1d14, 0x4a2f1e, 0x6d2633, 0xc8a27a, 0xf3f1ec, 0x8b1a2b], c.shoes ?? 0x1a1a1a))
            : row('바지', swatches('pants', PAL, c.pants))
              + row('넥타이', swatches('tie', PAL, c.tie, `<button type="button" class="o3e-chip${c.tie == null ? ' on' : ''}" data-k="tie" data-v="none">없음</button>`))}
        <div class="o3e-foot">
          <button type="button" class="o3e-save">💾 저장</button>
          <button type="button" class="o3e-cancel">되돌리기</button>
          <button type="button" class="o3e-reset">이 사람 처음 모습</button>
          <button type="button" class="o3e-close">닫기</button>
          <span class="o3e-msg"></span>
        </div>`;
    }
    const savedOf = id => ({ ...baseLook(id), ...(savedLooks[id] || {}) });
    function pick(id) {
      if (draft && cur !== id && dirty()) relook(cur, savedOf(cur));   // 저장 안 한 사람은 저장된 모습으로 돌린다
      cur = id; draft = { ...savedOf(id) }; render();
    }
    const dirty = () => JSON.stringify(draft) !== JSON.stringify(savedOf(cur));
    function apply(now = false) {
      clearTimeout(timer);
      const go = () => { relook(cur, draft); msg(dirty() ? '저장 안 됨 — 💾 저장을 누르세요' : ''); };
      if (now) go(); else timer = setTimeout(go, 120);
    }
    function msg(t) { const m = panel.querySelector('.o3e-msg'); if (m) m.textContent = t; }
    function setVal(k, v) {
      draft[k] = v;
      if (k === 'body') {   // 남녀를 바꾸면 머리·넥타이를 어울리게 맞춘다
        if (v === 'woman') { draft.tie = null; if (draft.hair === 'buzzed' || draft.hair === 'simpleparted') draft.hair = 'long'; draft.skirt ??= draft.suit; draft.skirtLen ??= 'short'; }
        else { if (draft.hair === 'long' || draft.hair === 'buns' || draft.hair === 'buzzedfemale') draft.hair = 'simpleparted'; }
      }
      render(); apply(k === 'body' || k === 'hair');
    }
    panel.addEventListener('click', e => {
      const t = e.target.closest('button'); if (!t) return;
      if (t.classList.contains('o3e-save')) {
        const diff = {}; const base = baseLook(cur);
        for (const k of LOOK_FIELDS) if (draft[k] !== base[k]) diff[k] = draft[k] ?? null;
        if (Object.keys(diff).length) savedLooks[cur] = diff; else delete savedLooks[cur];
        try { localStorage.setItem(LOOK_KEY, JSON.stringify(savedLooks)); msg('저장했어요 ✔ (이 브라우저)'); onLog(`🎨 ${CHARS[cur].name} 모습 저장`); }
        catch { msg('저장 실패: 브라우저 저장소를 못 씀(시크릿 창?)'); }
        return;
      }
      if (t.classList.contains('o3e-cancel')) { draft = { ...savedOf(cur) }; render(); apply(true); msg('저장된 모습으로 되돌렸어요'); return; }
      if (t.classList.contains('o3e-reset')) { draft = baseLook(cur); render(); apply(true); msg('처음 모습 — 💾 저장을 눌러야 굳어요'); return; }
      if (t.classList.contains('o3e-close')) { close(); return; }
      const k = t.dataset.k; if (!k) return;
      if (t.dataset.c) setVal(k, Number(t.dataset.c));
      else setVal(k, t.dataset.v === 'none' ? null : t.dataset.v);
    });
    panel.addEventListener('input', e => {
      const el = e.target;
      if (el.matches('input[type=color]')) { draft[el.dataset.k] = num(el.value); apply(); }
    });
    panel.addEventListener('change', e => {
      const el = e.target;
      if (el.matches('.o3e-who')) pick(el.value);
      if (el.matches('input[type=color]')) render();
    });
    function open() { st.open = true; panel.hidden = false; btn.classList.add('on'); pick(cur); panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    function close() {
      if (draft && dirty()) relook(cur, savedOf(cur));
      st.open = false; panel.hidden = true; btn.classList.remove('on'); draft = null;
    }
    btn.addEventListener('click', () => (st.open ? close() : open()));
    st.destroy = () => { clearTimeout(timer); panel.remove(); };
    return st;
  }

  function destroy() {
    editor.destroy();
    alive = false; cancelAnimationFrame(raf); ro.disconnect();
    renderer.domElement.removeEventListener('pointerdown', onDown);
    renderer.domElement.removeEventListener('pointerup', onUp);
    controls.dispose(); renderer.dispose(); root.innerHTML = '';
  }
  // 시험용(브라우저 콘솔에서 상태 보기)
  const api = { syncReal, demo, walkReport, captainCoffee, coffeeStroll, nextView, destroy, npcs, seats, scene, camera, controls, _debug: { findPath, obstacles, advance: (sec) => { for (let t = 0; t < sec; t += 1 / 30) step(1 / 30); renderer.render(scene, camera); drawTags(); } } };
  window.__office3d = api;
  return api;
}

if (typeof window !== 'undefined') window.Office3D = { create, CHARS };
