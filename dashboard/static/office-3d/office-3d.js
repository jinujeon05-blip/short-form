// Jinwoo 에이전트 — Three.js 3D 미니어처 사무실 1개 방 시연 (캡틴 집무실 + 비서실장 라운지 + 커피바 + 창가 발코니)
import * as THREE from 'three';
import { OrbitControls } from '/static/office-3d/lib/OrbitControls.js';

const stage = document.getElementById('stage');
const labelsEl = document.getElementById('labels');
const cardEl = document.getElementById('card3d');
const statusChip = document.getElementById('status-chip');

// 1. Renderer & Scene
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
stage.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x131b2e);

const camera = new THREE.PerspectiveCamera(36, 16 / 9, 0.1, 120);
const DEFAULT_CAM = new THREE.Vector3(0, 12.5, 16.5);
const DEFAULT_TGT = new THREE.Vector3(0, 1.0, 0.2);
camera.position.copy(DEFAULT_CAM);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(DEFAULT_TGT);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.maxPolarAngle = Math.PI * 0.46;
controls.minDistance = 6;
controls.maxDistance = 28;
controls.update();

// 2. Warm Diorama Lighting (Afternoon Sunlight + Soft Bounce)
scene.add(new THREE.HemisphereLight(0xfff7e6, 0x334155, 0.95));

const sun = new THREE.DirectionalLight(0xfff2d6, 1.85);
sun.position.set(10, 18, 9);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 2;
sun.shadow.camera.far = 45;
const d = 12;
sun.shadow.camera.left = -d; sun.shadow.camera.right = d;
sun.shadow.camera.top = d; sun.shadow.camera.bottom = -d;
sun.shadow.bias = -0.0005;
scene.add(sun);

const fillLight = new THREE.PointLight(0x60a5fa, 0.55, 18);
fillLight.position.set(-7, 5, 6);
scene.add(fillLight);

// Helper to create meshes with shadows
function box(w, h, dep, color, rough = 0.72, metal = 0.05) {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, dep),
    new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal })
  );
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// 3. 3D Miniature Office Diorama (16 x 11 units)
const room = new THREE.Group();
scene.add(room);

// Base wooden diorama slab + warm oak floor
const base = box(16.6, 0.6, 11.6, 0x263148, 0.85);
base.position.set(0, -0.35, 0);
room.add(base);

const floor = box(16, 0.16, 11, 0xd8a368, 0.68);
floor.position.set(0, 0, 0);
room.add(floor);

// Subtle floor plank lines
const lineMat = new THREE.MeshBasicMaterial({ color: 0xb58049, transparent: true, opacity: 0.35 });
for (let z = -5; z <= 5; z += 1.0) {
  const ln = new THREE.Mesh(new THREE.PlaneGeometry(16, 0.03), lineMat);
  ln.rotation.x = -Math.PI / 2;
  ln.position.set(0, 0.085, z);
  room.add(ln);
}

// Back panoramic glass wall + sunlit sky backdrop
const backWallBottom = box(16.2, 0.9, 0.3, 0xe8dfd3, 0.8);
backWallBottom.position.set(0, 0.45, -5.5);
room.add(backWallBottom);

const backWallTop = box(16.2, 0.35, 0.34, 0x5c3b24, 0.7);
backWallTop.position.set(0, 4.1, -5.5);
room.add(backWallTop);

const glass = new THREE.Mesh(
  new THREE.PlaneGeometry(15.6, 3.0),
  new THREE.MeshPhysicalMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.32, roughness: 0.1, metalness: 0.1 })
);
glass.position.set(0, 2.4, -5.5);
room.add(glass);

// Window mullions
for (let x = -7.8; x <= 7.8; x += 2.6) {
  const post = box(0.16, 3.2, 0.24, 0x6b4428, 0.7);
  post.position.set(x, 2.4, -5.5);
  room.add(post);
}

// Left & Right cutaway side walls
const leftWall = box(0.3, 4.2, 11.2, 0xf1ebe1, 0.82);
leftWall.position.set(-8.0, 2.1, 0);
room.add(leftWall);

const rightWall = box(0.3, 1.3, 11.2, 0xf1ebe1, 0.82);
rightWall.position.set(8.0, 0.65, 0);
room.add(rightWall);

// Raised Mahogany CEO Podium + Stairs
const podium = box(5.4, 0.45, 3.4, 0x7c462b, 0.6);
podium.position.set(0, 0.28, -3.2);
room.add(podium);

for (let side of [-1, 1]) {
  const st1 = box(0.6, 0.22, 1.6, 0x945838, 0.65);
  st1.position.set(side * 3.0, 0.15, -2.6);
  room.add(st1);
}

// Right Viewing Balcony Deck + Railing
const deck = box(4.2, 0.12, 3.2, 0xc79258, 0.7);
deck.position.set(5.4, 0.10, -3.2);
room.add(deck);

const railTop = box(4.0, 0.1, 0.12, 0x6b4226, 0.65);
railTop.position.set(5.4, 1.15, -4.6);
room.add(railTop);
for (let rx = 3.6; rx <= 7.2; rx += 0.45) {
  const sp = box(0.08, 1.0, 0.08, 0x6b4226, 0.65);
  sp.position.set(rx, 0.62, -4.6);
  room.add(sp);
}

// 4. 3D Furniture Builders
function makeDesk(x, y, z, w, isCeo = false) {
  const g = new THREE.Group();
  const top = box(w, 0.14, 1.35, isCeo ? 0x6e3722 : 0xb57945, 0.55);
  top.position.y = 0.95;
  g.add(top);
  const front = box(w - 0.12, 0.9, 1.15, isCeo ? 0x562818 : 0x925d32, 0.68);
  front.position.y = 0.45;
  g.add(front);
  if (isCeo) {
    const trim = box(w - 0.5, 0.06, 1.2, 0xd4a64a, 0.35, 0.5);
    trim.position.y = 0.62;
    g.add(trim);
  }
  g.position.set(x, y, z);
  room.add(g);
  return g;
}

function makeLaptop(x, y, z, rotY = 0) {
  const g = new THREE.Group();
  const baseL = box(0.62, 0.04, 0.44, 0xcbd5e1, 0.3, 0.6);
  g.add(baseL);
  const lid = box(0.62, 0.42, 0.04, 0x94a3b8, 0.3, 0.6);
  lid.position.set(0, 0.21, 0.2);
  lid.rotation.x = 0.18;
  g.add(lid);
  const scr = new THREE.Mesh(
    new THREE.PlaneGeometry(0.54, 0.34),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
  );
  scr.position.set(0, 0.21, 0.175);
  scr.rotation.x = 0.18;
  scr.rotation.y = Math.PI;
  g.add(scr);
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  room.add(g);
  return scr;
}

function makeChair(x, y, z, isCeo = false) {
  const g = new THREE.Group();
  const col = isCeo ? 0x1e2430 : 0x334155;
  const seat = box(0.8, 0.12, 0.75, col, 0.5);
  seat.position.y = 0.55;
  g.add(seat);
  const back = box(0.82, isCeo ? 1.25 : 0.9, 0.14, col, 0.48);
  back.position.set(0, isCeo ? 1.15 : 0.98, -0.34);
  g.add(back);
  const stem = box(0.14, 0.5, 0.14, 0x64748b, 0.4, 0.6);
  stem.position.y = 0.25;
  g.add(stem);
  const foot = box(0.68, 0.08, 0.68, 0x475569, 0.4, 0.5);
  foot.position.y = 0.04;
  g.add(foot);
  g.position.set(x, y, z);
  room.add(g);
}

function makePlant(x, y, z, s = 1) {
  const g = new THREE.Group();
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.28, 0.58, 8),
    new THREE.MeshStandardMaterial({ color: 0xc2643a, roughness: 0.78 })
  );
  pot.position.y = 0.29; pot.castShadow = true; pot.receiveShadow = true;
  g.add(pot);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2e944d, roughness: 0.65, flatShading: true });
  for (let i = 0; i < 5; i++) {
    const lf = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32 - i * 0.03, 0), leafMat);
    const ang = i * 1.25;
    lf.position.set(Math.cos(ang) * 0.16, 0.72 + (i % 2) * 0.22, Math.sin(ang) * 0.16);
    lf.castShadow = true;
    g.add(lf);
  }
  g.position.set(x, y, z);
  g.scale.setScalar(s);
  room.add(g);
}

// CEO Desk & Chair
makeDesk(0, 0.50, -2.55, 3.0, true);
makeChair(0, 0.50, -3.55, true);
makeLaptop(-0.78, 1.54, -2.55, 0.15);
makeLaptop(0.78, 1.54, -2.55, -0.15);

// Chief Secretary Desk & Chair (Center)
makeDesk(0, 0.08, 1.85, 2.3, false);
makeChair(0, 0.08, 0.95, false);
const chiefScr = makeLaptop(0, 1.12, 1.80, 0);

// Visual Info Desk (Left corner)
makeDesk(-4.9, 0.08, 2.2, 2.1, false);
makeChair(-4.9, 0.08, 1.3, false);
const finderScr = makeLaptop(-4.9, 1.12, 2.15, 0);

// Coffee Bar (Top-Left)
const barCounter = box(3.4, 1.0, 1.1, 0x9c6644, 0.65);
barCounter.position.set(-5.6, 0.58, -4.4);
room.add(barCounter);
const espresso = box(0.75, 0.68, 0.55, 0x334155, 0.35, 0.5);
espresso.position.set(-6.4, 1.42, -4.4);
room.add(espresso);
const cooler = box(0.65, 1.35, 0.65, 0xe2e8f0, 0.4);
cooler.position.set(-3.5, 0.76, -4.4);
room.add(cooler);
const jug = new THREE.Mesh(
  new THREE.CylinderGeometry(0.24, 0.24, 0.52, 10),
  new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65, roughness: 0.1 })
);
jug.position.set(-3.5, 1.68, -4.4);
room.add(jug);

// Potted Plants
makePlant(-2.3, 0.50, -4.1, 1.05);
makePlant(2.3, 0.50, -4.1, 1.05);
makePlant(-7.1, 0.08, -2.6, 1.1);
makePlant(3.6, 0.08, 2.6, 1.15);
makePlant(-7.1, 0.08, 4.2, 0.95);

// 5. Articulated 3D Stylized Characters (TRUE 60fps Skeletal Limb Rig!)
const rayTargets = [];

function createCharacter({ id, name, role, hairColor, shirtColor, pantsColor, tieColor = null, bun = false, home, yBase = 0.08 }) {
  const root = new THREE.Group();
  root.position.set(home[0], yBase, home[1]);
  root.userData = { id };

  const skinMat = new THREE.MeshStandardMaterial({ color: 0xf6cba8, roughness: 0.62 });
  const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.7 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.65 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.75 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: 0x1e2430, roughness: 0.5 });

  const body = new THREE.Group();
  root.add(body);

  // Legs (hip pivots at y = 0.68)
  const makeLeg = (xOff) => {
    const piv = new THREE.Group();
    piv.position.set(xOff, 0.68, 0);
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.58, 0.24), pantsMat);
    leg.position.y = -0.29; leg.castShadow = true;
    piv.add(leg);
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.34), shoeMat);
    shoe.position.set(0, -0.61, 0.05); shoe.castShadow = true;
    piv.add(shoe);
    body.add(piv);
    return piv;
  };
  const leftLeg = makeLeg(-0.15);
  const rightLeg = makeLeg(0.15);

  // Torso
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.66, 0.34), shirtMat);
  torso.position.y = 1.02; torso.castShadow = true; torso.receiveShadow = true;
  body.add(torso);
  if (tieColor) {
    const tie = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.44, 0.05), new THREE.MeshStandardMaterial({ color: tieColor }));
    tie.position.set(0, 1.04, 0.18);
    body.add(tie);
  }

  // Arms (shoulder pivots at y = 1.28)
  const makeArm = (xOff) => {
    const piv = new THREE.Group();
    piv.position.set(xOff, 1.28, 0);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.52, 0.18), shirtMat);
    arm.position.y = -0.24; arm.castShadow = true;
    piv.add(arm);
    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.16), skinMat);
    hand.position.y = -0.53; hand.castShadow = true;
    piv.add(hand);
    body.add(piv);
    return piv;
  };
  const leftArm = makeArm(-0.38);
  const rightArm = makeArm(0.38);

  // Head
  const head = new THREE.Group();
  head.position.set(0, 1.62, 0);
  const skull = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.56, 0.52), skinMat);
  skull.castShadow = true;
  head.add(skull);
  const hairCap = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.24, 0.56), hairMat);
  hairCap.position.set(0, 0.22, -0.02); hairCap.castShadow = true;
  head.add(hairCap);
  const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.48, 0.16), hairMat);
  hairBack.position.set(0, 0.02, -0.24);
  head.add(hairBack);
  if (bun) {
    const bunM = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), hairMat);
    bunM.position.set(0, 0.34, -0.24);
    head.add(bunM);
  }
  // Eyes
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111827 });
  for (let ex of [-0.12, 0.12]) {
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.10, 0.04), eyeMat);
    eye.position.set(ex, 0.02, 0.26);
    head.add(eye);
  }
  body.add(head);

  // Held 3D Coffee Tray prop (hidden by default)
  const tray = new THREE.Group();
  const trayBase = box(0.64, 0.05, 0.42, 0x8b5a2b, 0.6);
  tray.add(trayBase);
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.10, 0.20, 10), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 }));
  mug.position.set(0, 0.12, 0); mug.castShadow = true;
  tray.add(mug);
  tray.position.set(0, 0.96, 0.55);
  tray.visible = false;
  body.add(tray);

  // Invisible click hitbox
  const hit = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.2, 1.1), new THREE.MeshBasicMaterial({ visible: false }));
  hit.position.y = 1.1;
  hit.userData = { id };
  root.add(hit);
  rayTargets.push(hit);

  // HTML Label & Speech Bubble
  const tagEl = document.createElement('div');
  tagEl.className = 'tag3d';
  tagEl.textContent = name;
  const bubEl = document.createElement('div');
  bubEl.className = 'bub3d';
  bubEl.hidden = true;
  labelsEl.append(tagEl, bubEl);

  room.add(root);
  return {
    id, name, role, root, body, head, leftArm, rightArm, leftLeg, rightLeg, tray, tagEl, bubEl,
    home: [...home], yBase, mode: 'sit', path: [], speed: 3.6, walkPhase: 0, onArrive: null, bubble: '',
  };
}

const npcs = {
  captain: createCharacter({
    id: 'captain', name: '캡틴', role: '결재 · 총괄',
    hairColor: 0x1e222d, shirtColor: 0x243b6b, pantsColor: 0x1d2d52, tieColor: 0xb91c1c,
    home: [0, -3.45], yBase: 0.50,
  }),
  claude: createCharacter({
    id: 'claude', name: '비서실장', role: '지휘 · 커피 서빙',
    hairColor: 0x5c3a21, shirtColor: 0xea7c38, pantsColor: 0x2c3242, bun: true,
    home: [0, 1.05], yBase: 0.08,
  }),
  finder: createCharacter({
    id: 'finder', name: '시각 정보 비서', role: '사진 고르기',
    hairColor: 0x23232c, shirtColor: 0x2b6e44, pantsColor: 0x242834,
    home: [-4.9, 1.4], yBase: 0.08,
  }),
};

function setBubble(id, text, ok = false) {
  const n = npcs[id];
  n.bubble = text || '';
  if (text) {
    n.bubEl.textContent = text;
    n.bubEl.className = 'bub3d' + (ok ? ' ok' : '');
    n.bubEl.hidden = false;
  } else {
    n.bubEl.hidden = true;
  }
}

function sendWalk(id, pts, onArrive = null) {
  const n = npcs[id];
  n.mode = 'walk';
  n.path = pts.map(p => ({ x: p[0], y: p[1], z: p[2] }));
  n.onArrive = onArrive;
}

// 6. Interactive 3D Actions
function serveCoffee() {
  const cl = npcs.claude, cap = npcs.captain;
  if (cl.mode === 'walk') return;
  statusChip.textContent = '☕ 비서실장이 캡틴 커피를 준비하는 중…';
  setBubble('claude', '☕ 캡틴 커피 타러 가는 중…');
  sendWalk('claude', [
    [-2.0, 0.08, 0.8], [-4.5, 0.08, -2.5], [-5.4, 0.08, -3.5],
  ], () => {
    cl.mode = 'stand';
    cl.root.rotation.y = Math.PI;
    setBubble('claude', '☕ 에스프레소 추출 중…');
    setTimeout(() => {
      cl.tray.visible = true;
      setBubble('claude', '☕ 캡틴, 커피 가져왔습니다!', true);
      sendWalk('claude', [
        [-3.6, 0.08, -2.6], [-2.4, 0.50, -2.6], [-1.7, 0.50, -3.2],
      ], () => {
        cl.mode = 'stand';
        cl.root.rotation.y = Math.PI / 2;
        cl.tray.visible = false;
        setBubble('captain', '☕ 고마워요! 향이 좋네요', true);
        if (cap.mode === 'sit') cap.mode = 'sip';
        setTimeout(() => {
          setBubble('claude', '');
          sendWalk('claude', [
            [-2.4, 0.50, -2.6], [-3.6, 0.08, -2.6], [-2.0, 0.08, 0.8], [0, 0.08, 1.05],
          ], () => {
            cl.mode = 'sit';
            cl.root.rotation.y = 0;
            statusChip.textContent = '캡틴 집무실 · 비서실장 라운지';
            setTimeout(() => {
              if (cap.mode === 'sip') cap.mode = 'sit';
              setBubble('captain', '');
            }, 2200);
          });
        }, 1800);
      });
    }, 1200);
  });
}

function captainWalk() {
  const cap = npcs.captain;
  if (cap.mode === 'walk') return;
  statusChip.textContent = '🚶 캡틴이 오른쪽 창가 발코니로 산책 중…';
  setBubble('captain', '잠시 바람 좀 쐬야지…');
  sendWalk('captain', [
    [2.1, 0.50, -3.4], [2.8, 0.50, -2.6], [3.6, 0.08, -2.6], [5.4, 0.14, -3.4],
  ], () => {
    cap.mode = 'stand';
    cap.root.rotation.y = Math.PI;
    setBubble('captain', '창밖 풍경이 좋네요 🌤');
    setTimeout(() => {
      setBubble('captain', '');
      sendWalk('captain', [
        [3.6, 0.08, -2.6], [2.8, 0.50, -2.6], [2.1, 0.50, -3.4], [0, 0.50, -3.45],
      ], () => {
        cap.mode = 'sit';
        cap.root.rotation.y = 0;
        statusChip.textContent = '캡틴 집무실 · 비서실장 라운지';
      });
    }, 4200);
  });
}

function toggleWork() {
  const working = npcs.claude.mode === 'work';
  for (const id of ['claude', 'finder']) {
    if (npcs[id].mode === 'walk') continue;
    npcs[id].mode = working ? 'sit' : 'work';
    setBubble(id, working ? '' : (id === 'claude' ? '📋 새 가게 지시 배정 중…' : '📷 요리 사진 선별 중…'));
  }
  statusChip.textContent = working ? '캡틴 집무실 · 비서실장 라운지' : '💻 팀원들이 3D 노트북으로 작업 중…';
}

// Smooth camera fly-to target
let camLerp = null;
function flyTo(pos, tgt) {
  camLerp = { pos: pos.clone(), tgt: tgt.clone() };
}

// Raycast click on 3D characters
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let downPos = null;
renderer.domElement.addEventListener('pointerdown', e => { downPos = { x: e.clientX, y: e.clientY }; });
renderer.domElement.addEventListener('pointerup', e => {
  if (!downPos || Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) > 6) return;
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(rayTargets, false);
  if (hits.length) {
    const id = hits[0].object.userData.id;
    const n = npcs[id];
    const p = n.root.position;
    flyTo(new THREE.Vector3(p.x + 2.8, p.y + 4.4, p.z + 5.6), new THREE.Vector3(p.x, p.y + 1.2, p.z));
    document.getElementById('c-name').textContent = n.name;
    document.getElementById('c-role').textContent = `역할: ${n.role}`;
    document.getElementById('c-state').textContent = n.bubble || (n.mode === 'work' ? '💻 작업 중' : n.mode === 'walk' ? '🚶 이동 중' : '자리에서 대기 중');
    cardEl.hidden = false;
  }
});

document.getElementById('c-close').onclick = () => { cardEl.hidden = true; flyTo(DEFAULT_CAM, DEFAULT_TGT); };
document.getElementById('btn-coffee').onclick = serveCoffee;
document.getElementById('btn-walk').onclick = captainWalk;
document.getElementById('btn-work').onclick = toggleWork;
document.getElementById('btn-cam').onclick = () => { cardEl.hidden = true; flyTo(DEFAULT_CAM, DEFAULT_TGT); };
controls.addEventListener('start', () => { camLerp = null; });

// Resize handler
function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}
window.addEventListener('resize', resize);
resize();

// 7. 60fps Animation Loop (True 3D Skeletal Articulation!)
const clock = new THREE.Clock();
const tmpV = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(0.05, clock.getDelta());
  const t = clock.elapsedTime;

  if (camLerp) {
    camera.position.lerp(camLerp.pos, 0.08);
    controls.target.lerp(camLerp.tgt, 0.08);
    if (camera.position.distanceTo(camLerp.pos) < 0.06) camLerp = null;
  }
  controls.update();

  // Monitor screen subtle pulse
  const glow = 0.75 + 0.25 * Math.sin(t * 4);
  chiefScr.material.color.setRGB(0.22 * glow, 0.74 * glow, 0.97 * glow);
  finderScr.material.color.setRGB(0.22 * glow, 0.74 * glow, 0.97 * glow);

  for (const n of Object.values(npcs)) {
    if (n.mode === 'walk' && n.path.length) {
      const tgt = n.path[0];
      const dx = tgt.x - n.root.position.x;
      const dy = tgt.y - n.root.position.y;
      const dz = tgt.z - n.root.position.z;
      const dist = Math.hypot(dx, dy, dz);
      const step = n.speed * dt;
      if (dist <= step + 0.05) {
        n.root.position.set(tgt.x, tgt.y, tgt.z);
        n.path.shift();
        if (!n.path.length && n.onArrive) {
          const cb = n.onArrive; n.onArrive = null; cb();
        }
      } else {
        n.root.position.x += (dx / dist) * step;
        n.root.position.y += (dy / dist) * step;
        n.root.position.z += (dz / dist) * step;
        const targetYaw = Math.atan2(dx, dz);
        let diff = targetYaw - n.root.rotation.y;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        n.root.rotation.y += diff * 0.2;
      }
      n.walkPhase += dt * 7.5;
      const sw = Math.sin(n.walkPhase) * 0.55;
      n.body.position.y = Math.abs(Math.sin(n.walkPhase)) * 0.07;
      n.leftLeg.rotation.x = sw;
      n.rightLeg.rotation.x = -sw;
      if (n.tray.visible) {
        n.leftArm.rotation.x = -1.05;
        n.rightArm.rotation.x = -1.05;
      } else {
        n.leftArm.rotation.x = -sw * 0.75;
        n.rightArm.rotation.x = sw * 0.75;
      }
      n.head.rotation.y = 0;
    } else if (n.mode === 'sit' || n.mode === 'work' || n.mode === 'sip') {
      // Natural seated pose: legs bent 90 deg forward inside chair, torso lowered cleanly!
      n.body.position.y = -0.18;
      n.leftLeg.rotation.x = -1.45;
      n.rightLeg.rotation.x = -1.45;
      if (n.mode === 'work') {
        n.leftArm.rotation.x = -0.95 + Math.sin(t * 14) * 0.14;
        n.rightArm.rotation.x = -0.95 - Math.sin(t * 14) * 0.14;
        n.head.rotation.x = 0.12;
      } else if (n.mode === 'sip') {
        n.leftArm.rotation.x = -0.4;
        n.rightArm.rotation.x = -1.25 - Math.sin(t * 2.5) * 0.3;
        n.head.rotation.x = -0.05;
      } else {
        n.leftArm.rotation.x = -0.55;
        n.rightArm.rotation.x = -0.55;
        n.head.rotation.x = 0;
        n.head.rotation.y = Math.sin(t * 0.9 + n.home[0]) * 0.14;
      }
    } else {
      n.body.position.y = 0;
      n.leftLeg.rotation.x = 0; n.rightLeg.rotation.x = 0;
      n.leftArm.rotation.x = 0; n.rightArm.rotation.x = 0;
      n.head.rotation.x = 0;
    }

    // Project 3D position -> 2D HTML tag & speech bubble
    tmpV.copy(n.root.position).add(new THREE.Vector3(0, 2.25, 0)).project(camera);
    const sx = (tmpV.x * 0.5 + 0.5) * stage.clientWidth;
    const sy = (-tmpV.y * 0.5 + 0.5) * stage.clientHeight;
    n.tagEl.style.left = `${sx}px`;
    n.tagEl.style.top  = `${sy}px`;
    n.bubEl.style.left = `${sx}px`;
    n.bubEl.style.top  = `${sy - 26}px`;
  }

  renderer.render(scene, camera);
}
animate();

// Auto-trigger coffee serving 2.5s after open so Captain immediately sees 3D movement!
setTimeout(serveCoffee, 2500);
