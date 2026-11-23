// Jinwoo 에이전트 2D 고화질 8방향 RPG 픽셀 NPC 사무실 v6 (별도 작업 공간: dashboard/static/office-game/)
// - 남향 6명: 책상 위쪽 가장자리에 딱 맞춰 착석 + 노트북 일체형 착석·타이핑 (책상 가운데서 올라오는 현상 해결)
// - 북향 4명(감사실·디지털 메뉴 통제실): 의자 일체형 뒷모습 착석·타이핑 (등과 의자 등받이 겹침 해결)
// - 8방향(남·남동·동·북동·북·북서·서·남서) 자연스러운 대각선 이동 + 보폭 동기화 느긋한 걸음 속도
// - 커피 서빙·휴식 이동 시 쟁반·머그컵을 손에 자연스럽게 들고 걷는 전용 스프라이트 적용
(() => {
  const W = 1376, H = 768;

  // bg_v3_grid.jpg 기준 각 의자·책상 위쪽 가장자리 정중앙 % 좌표
  const CHARS = {
    captain:       { name: '캡틴',          role: '결재',        home: [50.0, 13.0], seatFacing: 's', scale: 0.88 },
    claude:        { name: '비서실장',      role: '지휘',        home: [50.0, 37.2], seatFacing: 's', scale: 0.88 },
    finder:        { name: '시각 정보 비서', role: '사진 고르기', home: [15.2, 44.8], seatFacing: 's', scale: 0.86 },
    agy:           { name: '메뉴 검사관',   role: '메뉴판 읽기', home: [82.2, 51.0], seatFacing: 'n', scale: 0.96 },
    'menu-reader': { name: '자료 해석 비서', role: '메뉴판 읽기', home: [93.5, 51.0], seatFacing: 'n', scale: 0.96 },
    codex:         { name: '운영 감찰관',   role: '두 번째 검토', home: [7.8,  93.6], seatFacing: 'n', scale: 0.96 },
    reviewer:      { name: '데이터 감사관', role: '마지막 점검', home: [19.5, 93.6], seatFacing: 'n', scale: 0.96 },
    polisher:      { name: '수석 번역관',   role: '번역·글',     home: [38.2, 83.0], seatFacing: 's', scale: 0.86 },
    staffing:      { name: '인력 공급팀',   role: '인력 현황',   home: [63.2, 83.0], seatFacing: 's', scale: 0.86 },
    sorting:       { name: '선별팀',        role: '선별 실적',   home: [83.2, 83.0], seatFacing: 's', scale: 0.86 },
  };

  // 에셋 보유 목록 (전 직원 9명 100% 커피·서류 들고 걷기 전용 스프라이트 완비!)
  const SMOOTH6_IDS = new Set(['claude', 'finder', 'agy', 'menu-reader', 'codex', 'reviewer']);
  const DIAG8_IDS   = new Set(['captain', 'claude', 'finder', 'reviewer']);

  // 이동 방향 벡터 → 8방향 코드(e, se, s, sw, w, nw, n, ne)
  function angleToDir8(dx, dy) {
    const deg = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
    if (deg >= 337.5 || deg < 22.5) return 'e';
    if (deg < 67.5)  return 'se';
    if (deg < 112.5) return 's';
    if (deg < 157.5) return 'sw';
    if (deg < 202.5) return 'w';
    if (deg < 247.5) return 'nw';
    if (deg < 292.5) return 'n';
    return 'ne';
  }

  // 복도 90° 모서리를 부드러운 45° 대각선 턴으로 깎아 8방향 걷기가 자연스럽게 드러나도록 보정
  function bevelPath8(pts) {
    if (!pts || pts.length < 3) return (pts || []).map(p => [p[0], p[1]]);
    const out = [[pts[0][0], pts[0][1]]];
    for (let i = 1; i < pts.length - 1; i++) {
      const a = pts[i - 1], b = pts[i], c = pts[i + 1];
      const d1 = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const d2 = Math.hypot(c[0] - b[0], c[1] - b[1]);
      const cut = Math.min(2.2, d1 * 0.28, d2 * 0.28);
      if (cut > 0.7) {
        out.push([b[0] - ((b[0] - a[0]) / d1) * cut, b[1] - ((b[1] - a[1]) / d1) * cut]);
        out.push([b[0] + ((c[0] - b[0]) / d2) * cut, b[1] + ((c[1] - b[1]) / d2) * cut]);
      } else {
        out.push([b[0], b[1]]);
      }
    }
    const last = pts[pts.length - 1];
    out.push([last[0], last[1]]);
    return out;
  }

  // 각 부서 벽 상단 간판
  const SIGNS = [
    { text: '미디어 관제실',     x: 15.2, y: 29.0, bg: '#15803d' },
    { text: '디지털 메뉴 통제실', x: 84.8, y: 29.0, bg: '#dc2626' },
    { text: '감사실',           x: 12.6, y: 61.5, bg: '#7c3aed' },
    { text: '통번역 통제실',     x: 38.0, y: 61.5, bg: '#2563eb' },
    { text: '인력 공급팀',       x: 63.0, y: 61.5, bg: '#0284c7' },
    { text: '선별팀',           x: 87.5, y: 61.5, bg: '#ea580c' },
  ];

  // 100% 직교(동서남북) 문·복도 동선 — 책상 뒤에서 옆으로 먼저 빠져나온 뒤 복도로 이동 (책상·벽·화분 통과 0, verify_routes.jpg 검증)
  const TO_HALL = {
    finder:        [[15.2, 41.5], [22.2, 41.5], [22.2, 55.5], [50.0, 55.5]],
    agy:           [[82.2, 51.5], [82.2, 55.5], [50.0, 55.5]],
    'menu-reader': [[93.5, 51.5], [93.5, 55.5], [50.0, 55.5]],
    codex:         [[7.8,  94.5], [7.8,  96.8], [26.2, 96.8], [26.2, 55.5], [50.0, 55.5]],
    reviewer:      [[19.5, 94.5], [26.2, 94.5], [26.2, 55.5], [50.0, 55.5]],
    polisher:      [[38.2, 79.5], [44.8, 79.5], [44.8, 86.5], [50.0, 86.5], [50.0, 55.5]],
    staffing:      [[63.2, 79.5], [56.5, 79.5], [56.5, 86.5], [50.0, 86.5], [50.0, 55.5]],
    sorting:       [[83.2, 79.5], [73.8, 79.5], [73.8, 55.5], [50.0, 55.5]],
  };

  function routeToChief(id) {
    const base = TO_HALL[id];
    if (!base) return [];
    return [...base, [50.0, 51.0]];
  }

  function routeToCoffee(id) {
    const base = TO_HALL[id];
    if (!base) return [];
    return [...base, [34.5, 55.5], [34.5, 22.5], [16.5, 22.5]];
  }

  // 캡틴 전용: 의자 옆 → 두 화분 사이 중앙 계단(y=16.8)으로 내려와 바닥(x=67.5) → 오른쪽 창가 데크(x=82.0, y=22.5)
  const CAP_TO_WINDOW = [[50.0, 13.0], [55.0, 13.0], [55.0, 16.8], [67.5, 16.8], [67.5, 22.5], [82.0, 22.5]];
  const CAP_TO_DESK   = [[82.0, 22.5], [67.5, 22.5], [67.5, 16.8], [55.0, 16.8], [55.0, 13.0], [50.0, 13.0]];

  // 비서실장 전용: 의자 뒤(y=34.0)에서 왼쪽으로 빠져나와 화분 밖 통로(x=34.5)로 이동
  const CHIEF_TO_COFFEE   = [[50.0, 34.0], [34.5, 34.0], [34.5, 22.5], [16.5, 22.5]];
  const COFFEE_TO_CAPTAIN = [[16.5, 22.5], [34.5, 22.5], [34.5, 16.8], [41.5, 16.8]];
  const CAPTAIN_TO_CHIEF  = [[41.5, 16.8], [34.5, 16.8], [34.5, 34.0], [50.0, 34.0], [50.0, 37.2]];
  const CHIEF_TO_CAPTAIN  = [[50.0, 34.0], [34.5, 34.0], [34.5, 16.8], [41.5, 16.8]];

  // 남향 직원 중 배경에 노트북이 없는 4명의 빈 책상용 노트북 소품 (자리를 비웠을 때만 표시 — 시각 정보 비서·캡틴은 배경에 이미 노트북 있음)
  const DESK_LAPTOPS = [
    { id: 'claude',   x: 50.0, y: 40.2, w: 46 },
    { id: 'polisher', x: 38.2, y: 85.8, w: 44 },
    { id: 'staffing', x: 63.2, y: 85.8, w: 44 },
    { id: 'sorting',  x: 83.2, y: 85.8, w: 44 },
  ];

  function loadImages() {
    const imgs = { walk: {}, seated: {}, cap: { coffeeSeq: [], dir8: {} } };
    const load = (target, key, url) => new Promise(res => {
      const im = new Image();
      im.onload = () => { target[key] = im; res(); };
      im.onerror = () => res();
      im.src = url;
    });
    const jobs = [
      load(imgs, 'bg', '/static/office-game/assets/bg-office.webp'),
      load(imgs, 'laptop', '/static/office-game/assets/laptop.webp'),
      load(imgs, 'propMug', '/static/office-game/assets/prop-mug.webp'),
      load(imgs, 'propTray', '/static/office-game/assets/prop-tray.webp'),
      load(imgs, 'propDoc', '/static/office-game/assets/prop-doc.webp'),
      load(imgs, 'propCan', '/static/office-game/assets/prop-can.webp'),
      load(imgs, 'propBroom', '/static/office-game/assets/prop-broom.webp'),
      load(imgs, 'propDuster', '/static/office-game/assets/prop-duster.webp'),
      load(imgs, 'propBox', '/static/office-game/assets/prop-box.webp'),
    ];
    for (const pose of ['idle', 'coffee', 'window', 'thumbs']) {
      jobs.push(load(imgs.cap, pose, `/static/office-game/assets/captain-${pose}.webp`));
    }
    for (let f = 1; f <= 4; f++) {
      jobs.push(load(imgs.cap.coffeeSeq, f - 1, `/static/office-game/assets/captain-coffee-${f}.webp`));
    }
    imgs.walk.captain = { se: [], ne: [], up: [] };
    for (let f = 1; f <= 4; f++) {
      jobs.push(load(imgs.walk.captain.se, f - 1, `/static/office-game/assets/walk/captain-se-${f}.webp`));
      jobs.push(load(imgs.walk.captain.ne, f - 1, `/static/office-game/assets/walk/captain-ne-${f}.webp`));
      jobs.push(load(imgs.walk.captain.up, f - 1, `/static/office-game/assets/walk/captain-up-${f}.webp`));
    }
    for (const id of Object.keys(CHARS)) {
      jobs.push(load(imgs, id, `/static/office-game/assets/${id}.webp`));
      imgs.seated[id] = {};
      jobs.push(load(imgs.seated[id], 'idle', `/static/office-game/assets/seated/${id}-idle.webp`));
      jobs.push(load(imgs.seated[id], 'w1',   `/static/office-game/assets/seated/${id}-w1.webp`));
      jobs.push(load(imgs.seated[id], 'w2',   `/static/office-game/assets/seated/${id}-w2.webp`));
      if (id !== 'captain') {
        imgs.walk[id] = { side: [], side6: [], se: [], ne: [], up: [], down: [] };
        for (let f = 1; f <= 4; f++) {
          jobs.push(load(imgs.walk[id].side, f - 1, `/static/office-game/assets/walk/${id}-${f}.webp`));
          jobs.push(load(imgs.walk[id].up,   f - 1, `/static/office-game/assets/walk/${id}-up-${f}.webp`));
          jobs.push(load(imgs.walk[id].down, f - 1, `/static/office-game/assets/walk/${id}-down-${f}.webp`));
        }
        if (SMOOTH6_IDS.has(id)) {
          for (let f = 1; f <= 6; f++) {
            jobs.push(load(imgs.walk[id].side6, f - 1, `/static/office-game/assets/walk/${id}-s6-${f}.webp`));
          }
        }
        if (DIAG8_IDS.has(id)) {
          for (let f = 1; f <= 4; f++) {
            jobs.push(load(imgs.walk[id].se, f - 1, `/static/office-game/assets/walk/${id}-se-${f}.webp`));
            jobs.push(load(imgs.walk[id].ne, f - 1, `/static/office-game/assets/walk/${id}-ne-${f}.webp`));
          }
        }
      }
    }
    return Promise.all(jobs).then(() => imgs);
  }

  function create(container, opts = {}) {
    container.innerHTML = `
      <div class="og-shell">
        <div class="og-stage">
          <canvas class="og-canvas" width="${W}" height="${H}"></canvas>
          <div class="og-hud"></div>
          <div class="og-fs-bar">
            <button type="button" data-og-act="order" style="background:rgba(250,204,21,0.92);color:#111827;border-color:#fde047">📣 업무 지시</button>
            <button type="button" data-og-act="coffee">☕ 커피 서빙</button>
            <button type="button" data-og-act="stroll">🚶 휴식</button>
            <button type="button" data-og-act="exit" class="og-exit">✕ 나가기</button>
          </div>
          <button type="button" class="og-fs-btn" data-og-fs aria-label="전체화면 게임 모드" title="전체화면 (폰 자동 가로 전환)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
            <span data-og-fs-lbl>전체화면</span>
          </button>
          <div class="og-modal-back" data-og-modal hidden>
            <div class="og-modal" role="dialog" aria-modal="true" data-og-modal-body></div>
          </div>
        </div>
      </div>`;
    const shell = container.querySelector('.og-shell');
    const canvas = container.querySelector('.og-canvas');
    const hud = container.querySelector('.og-hud');
    const fsBtn = container.querySelector('[data-og-fs]');
    const fsLbl = container.querySelector('[data-og-fs-lbl]');
    const modalBack = container.querySelector('[data-og-modal]');
    const modalBody = container.querySelector('[data-og-modal-body]');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;

    let imgs = { walk: {}, seated: {}, cap: { coffeeSeq: [], dir8: {} } };
    loadImages().then(loaded => { imgs = loaded; });

    const npcs = {};
    for (const [id, cfg] of Object.entries(CHARS)) {
      npcs[id] = {
        id, x: cfg.home[0], y: cfg.home[1],
        mode: 'idle', dir: cfg.seatFacing || 's', capPose: 'idle', capCoffeeStart: 0,
        action: null, hiddenOut: false, bubble: '', bubbleType: 'work', progress: null,
        carry: null, path: [], speed: 11.2, walkDist: 0, onArrive: null,
      };
    }

    let demoTimers = [];
    let isDemo = false;
    let conveyorActive = false;
    let conveyorPhase = 0;
    let hrMarks = [];
    let seenReports = new Set();
    let prevActive = new Set();
    let prevDoneOrder = null;
    let lastCoffeeAt = Date.now();
    let lastChiefCoffeeAt = Date.now() - 20000;
    let nextCapActAt = Date.now() + 6000;
    let nextLifeActAt = Date.now() + 5500;
    let lifeSeqIdx = 0;
    let hasActiveWork = false;

    const signsHtml = SIGNS.map(s =>
      `<span class="og-sign" style="left:${s.x}%;top:${s.y}%;background:${s.bg}">${s.text}</span>`
    ).join('');
    const npcHudHtml = Object.entries(CHARS).map(([id, cfg]) =>
      `<div class="og-tag" data-tag="${id}"><b>${cfg.name}</b><small>${cfg.role}</small></div>
       <div class="og-bubble" data-bub="${id}" hidden></div>`
    ).join('');
    hud.innerHTML = `
      <div class="og-statusbar">
        <span class="og-chip live" data-mode-chip>● 실시간 연동</span>
        <span class="og-chip" data-work-chip>대기 중</span>
      </div>
      ${signsHtml}
      ${npcHudHtml}
      <div class="og-hr" data-hr-box style="left:63.2%;top:72.0%"></div>`;

    const tagEls = {}, bubEls = {};
    for (const id of Object.keys(CHARS)) {
      tagEls[id] = hud.querySelector(`[data-tag="${id}"]`);
      bubEls[id] = hud.querySelector(`[data-bub="${id}"]`);
    }
    const modeChip = hud.querySelector('[data-mode-chip]');
    const workChip = hud.querySelector('[data-work-chip]');
    const hrBox = hud.querySelector('[data-hr-box]');

    const log = msg => { if (opts.onLog) opts.onLog(msg); };

    function sendPath(id, pts, { mode = 'walk', carry = null, bubble = '', bubbleType = 'work', onArrive = null } = {}) {
      const n = npcs[id];
      if (!n || !pts.length) return;
      n.path = bevelPath8(pts);
      n.mode = mode;
      n.carry = carry;
      n.bubble = bubble;
      n.bubbleType = bubbleType;
      n.progress = null;
      n.onArrive = onArrive;
    }

    function captainWindowWalk() {
      const cap = npcs.captain;
      if (cap.mode === 'walk' || cap.mode === 'done') return;
      log('캡틴이 의자에서 일어나 오른쪽 창가 데크로 산책 이동');
      sendPath('captain', CAP_TO_WINDOW, {
        mode: 'walk', carry: null, bubble: '잠시 바람 좀 쐬야지…', bubbleType: 'idle',
        onArrive: () => {
          cap.mode = 'idle';
          cap.capPose = 'window';
          cap.bubble = '창밖을 바라보는 중…';
          cap.bubbleType = 'idle';
          setTimeout(() => {
            if (cap.mode === 'done') return;
            sendPath('captain', CAP_TO_DESK, {
              mode: 'walk', carry: null, bubble: '',
              onArrive: () => {
                cap.mode = 'idle';
                cap.capPose = 'idle';
                cap.dir = 's';
                nextCapActAt = Date.now() + 9000;
              },
            });
          }, 5500);
        },
      });
    }

    function captainOuting() {
      const cap = npcs.captain;
      if (cap.mode === 'walk' || cap.mode === 'done' || cap.hiddenOut) return false;
      const outPath = [[50.0, 13.0], [55.0, 13.0], [55.0, 16.8], [67.5, 16.8], [67.5, 55.5], [50.0, 55.5], [50.0, 96.5]];
      const inPath  = [[50.0, 96.5], [50.0, 55.5], [67.5, 55.5], [67.5, 16.8], [55.0, 16.8], [55.0, 13.0], [50.0, 13.0]];
      const msgs = ['🚗 거래처 미팅 다녀올게요!', '🚗 새 가게 사장님 뵙고 올게요!'];
      log('🚗 캡틴이 외근 나가는 중');
      sendPath('captain', outPath, {
        mode: 'walk', carry: null, bubble: msgs[Math.floor(Math.random() * msgs.length)], bubbleType: 'idle',
        onArrive: () => {
          cap.hiddenOut = true;
          cap.mode = 'action';
          cap.action = 'outing';
          cap.bubble = '';
          log('🚗 캡틴 외근 중… (잠시 뒤 복귀)');
          setTimeout(() => {
            if (isDemo) { cap.hiddenOut = false; return; }
            cap.hiddenOut = false;
            cap.action = null;
            log('👋 캡틴이 외근에서 사무실로 복귀');
            sendPath('captain', inPath, {
              mode: 'walk', carry: null, bubble: '👋 외근 다녀왔습니다!', bubbleType: 'ok',
              onArrive: () => {
                cap.mode = 'idle';
                cap.capPose = 'idle';
                cap.dir = 's';
                if (isFree(npcs.claude)) {
                  npcs.claude.bubble = '캡틴, 다녀오셨어요! 😊';
                  npcs.claude.bubbleType = 'ok';
                  setTimeout(() => { if (npcs.claude.bubble.includes('다녀오셨어요')) npcs.claude.bubble = ''; }, 2600);
                }
                setTimeout(() => { if (cap.bubble.includes('다녀왔습니다')) cap.bubble = ''; }, 2400);
                nextCapActAt = Date.now() + 12000;
              },
            });
          }, 11000);
        },
      });
      return true;
    }

    function updateCaptainLife(now) {
      const cap = npcs.captain;
      if (cap.mode === 'done' || cap.mode === 'walk' || cap.hiddenOut || isDemo) return;
      if (now < nextCapActAt) return;
      if (cap.capPose === 'idle') {
        const r = Math.random();
        if (r < 0.45) {
          cap.capPose = 'coffee';
          cap.capCoffeeStart = performance.now();
          cap.bubble = '☕ 커피 한 잔…';
          cap.bubbleType = 'idle';
          log('캡틴이 자리에서 커피를 마시는 중');
          nextCapActAt = now + 6800;
        } else if (r < 0.80) {
          nextCapActAt = now + 15000;
          captainWindowWalk();
        } else {
          nextCapActAt = now + 28000;
          captainOuting();
        }
      } else if (cap.capPose === 'coffee') {
        cap.capPose = 'idle';
        cap.bubble = '';
        nextCapActAt = now + 9000 + Math.random() * 5000;
      }
    }

    function serveCoffeeToCaptain() {
      const chief = npcs.claude;
      const cap = npcs.captain;
      if (chief.mode === 'walk' || chief.mode === 'coffee-walk') return;
      log('☕ 비서실장이 캡틴 커피를 타러 이동');
      sendPath('claude', CHIEF_TO_COFFEE, {
        mode: 'coffee-walk', carry: null, bubble: '☕ 캡틴 커피 타러 가는 중…', bubbleType: 'idle',
        onArrive: () => {
          chief.dir = 'n';
          chief.bubble = '☕ 원두 커피 추출 중…';
          setTimeout(() => {
            sendPath('claude', COFFEE_TO_CAPTAIN, {
              mode: 'coffee-walk', carry: 'coffee', bubble: '☕ 캡틴, 커피 가져왔습니다!', bubbleType: 'ok',
              onArrive: () => {
                chief.dir = 'e';
                if (cap.mode !== 'walk') {
                  cap.capPose = 'coffee';
                  cap.capCoffeeStart = performance.now();
                  cap.bubble = '☕ 고마워요! 잘 마실게요';
                  cap.bubbleType = 'ok';
                }
                log('☕ 비서실장 → 캡틴에게 커피 전달 완료');
                setTimeout(() => {
                  sendPath('claude', CAPTAIN_TO_CHIEF, {
                    mode: 'coffee-walk', carry: null, bubble: '',
                    onArrive: () => {
                      chief.mode = 'idle';
                      chief.dir = 's';
                      setTimeout(() => {
                        if (cap.bubble === '☕ 고마워요! 잘 마실게요') cap.bubble = '';
                        nextCapActAt = Date.now() + 8000;
                      }, 3000);
                    },
                  });
                }, 1500);
              },
            });
          }, 1200);
        },
      });
    }

    function walkReport(id, text = '보고드립니다!') {
      const n = npcs[id];
      if (!n || id === 'captain' || id === 'claude') return;
      const toChief = routeToChief(id);
      // 도착 후 원래 앉는 자리(home)로 자연스럽게 착석
      const backHome = [...toChief.slice().reverse(), CHARS[id].home];
      log(`${CHARS[id].name} → 비서실장에게 보고 이동 (${text})`);
      sendPath(id, toChief, {
        mode: 'walk', carry: 'doc', bubble: text, bubbleType: 'ok',
        onArrive: () => {
          n.dir = 'n';
          const chief = npcs.claude;
          chief.bubble = '확인했어요! ✔';
          chief.bubbleType = 'ok';
          setTimeout(() => {
            if (chief.bubble === '확인했어요! ✔') chief.bubble = '';
            sendPath(id, backHome, {
              mode: 'walk', carry: null, bubble: '',
              onArrive: () => { n.mode = 'done'; n.dir = CHARS[id].seatFacing || 's'; n.bubble = ''; },
            });
          }, 1100);
        },
      });
    }

    function chiefHandoff(text = '결재 올립니다!') {
      const cap = npcs.captain;
      log(`비서실장 → 캡틴에게 결재 전달 (${text})`);
      sendPath('claude', CHIEF_TO_CAPTAIN, {
        mode: 'walk', carry: 'doc', bubble: text, bubbleType: 'ok',
        onArrive: () => {
          npcs.claude.dir = 'e';
          cap.mode = 'done';
          cap.capPose = 'thumbs';
          cap.x = CHARS.captain.home[0];
          cap.y = CHARS.captain.home[1];
          cap.path = [];
          cap.bubble = '수고했어요! ✔';
          cap.bubbleType = 'ok';
          setTimeout(() => {
            sendPath('claude', CAPTAIN_TO_CHIEF, {
              mode: 'walk', carry: null, bubble: '',
              onArrive: () => {
                npcs.claude.mode = 'done';
                npcs.claude.dir = 's';
                setTimeout(() => {
                  if (cap.bubble === '수고했어요! ✔') {
                    cap.bubble = '';
                    cap.mode = 'idle';
                    cap.capPose = 'idle';
                  }
                }, 2600);
              },
            });
          }, 1500);
        },
      });
    }

    function coffeeStroll(ids) {
      const pick = ids || Object.keys(CHARS).filter(id => id !== 'captain' && id !== 'claude' && npcs[id].mode === 'idle');
      if (!pick.length) return;
      pick.slice(0, 2).forEach((id, idx) => {
        setTimeout(() => {
          if (npcs[id].mode !== 'idle') return;
          const toCaf = routeToCoffee(id);
          const back = [...toCaf.slice().reverse(), CHARS[id].home];
          log(`${CHARS[id].name} 커피 휴식 이동`);
          sendPath(id, toCaf, {
            mode: 'coffee-walk', carry: null, bubble: '☕ 커피 한 잔…', bubbleType: 'idle',
            onArrive: () => {
              npcs[id].dir = 'n';
              npcs[id].carry = 'coffee';
              setTimeout(() => {
                sendPath(id, back, {
                  mode: 'coffee-walk', carry: 'coffee', bubble: '',
                  onArrive: () => { npcs[id].mode = 'idle'; npcs[id].dir = CHARS[id].seatFacing || 's'; npcs[id].carry = null; },
                });
              }, 1300);
            },
          });
        }, idx * 900);
      });
    }

    // ---------------------------------------------------------------- 살아있는 사무실 자율 행동 (2026-11-22 캡틴 요청)
    const isFree = n => n && (n.mode === 'idle' || n.mode === 'done');

    // 1) 비서실장 → 캡틴에게 시키실 일 묻기
    function chiefAskCaptain() {
      const chief = npcs.claude, cap = npcs.captain;
      if (!isFree(chief) || !isFree(cap) || cap.capPose === 'window') return false;
      const prevMode = chief.mode;
      const asks = ['캡틴, 시키실 일 있으실까요?', '새로 진행할 가게 있을까요?', '오늘 추가로 챙길 업무 있으신가요?'];
      const replies = ['지금은 괜찮아요, 수고해요! ☕', '조금 있다가 지시할게요! 👍', '덕분에 잘 돌아가고 있어요 😊'];
      const qi = Math.floor(Math.random() * asks.length);
      log('💬 비서실장이 캡틴에게 업무 지시 여부를 여쭤보러 이동');
      sendPath('claude', CHIEF_TO_CAPTAIN, {
        mode: 'coffee-walk', carry: null, bubble: '', bubbleType: 'idle',
        onArrive: () => {
          chief.mode = 'action';
          chief.action = 'ask';
          chief.dir = 'e';
          chief.bubble = asks[qi];
          chief.bubbleType = 'meet';
          setTimeout(() => {
            if (isFree(cap)) {
              cap.bubble = replies[qi];
              cap.bubbleType = 'ok';
            }
            setTimeout(() => {
              if (cap.bubble === replies[qi]) cap.bubble = '';
              chief.action = null;
              sendPath('claude', CAPTAIN_TO_CHIEF, {
                mode: 'coffee-walk', carry: null, bubble: '',
                onArrive: () => { chief.mode = prevMode; chief.dir = 's'; },
              });
            }, 2400);
          }, 1800);
        },
      });
      return true;
    }

    // 2) 선별팀 → 일어나서 컨베이어 벨트 돌려보기
    function sortingConveyor() {
      const n = npcs.sorting;
      if (!isFree(n)) return false;
      const prevMode = n.mode;
      const toBelt = [[83.2, 79.5], [89.6, 79.5], [89.6, 86.2]];
      const back = [[89.6, 86.2], [89.6, 79.5], [83.2, 79.5], CHARS.sorting.home];
      log('📦 선별팀이 컨베이어 벨트 가동·점검 시작');
      sendPath('sorting', toBelt, {
        mode: 'coffee-walk', carry: null, bubble: '📦 컨베이어 점검하러…', bubbleType: 'idle',
        onArrive: () => {
          n.mode = 'action';
          n.action = 'conveyor';
          n.dir = 'e';
          n.bubble = '📦 컨베이어 벨트 가동 점검 중…';
          n.bubbleType = 'work';
          conveyorActive = true;
          setTimeout(() => {
            conveyorActive = false;
            n.action = null;
            n.bubble = '✔ 선별 컨베이어 정상!';
            n.bubbleType = 'ok';
            setTimeout(() => {
              sendPath('sorting', back, {
                mode: 'coffee-walk', carry: null, bubble: '',
                onArrive: () => { n.mode = prevMode; n.dir = 's'; },
              });
            }, 900);
          }, 5200);
        },
      });
      return true;
    }

    // 3) 선별팀 → 복도 화분에 물 주기
    function sortingWaterPlants() {
      const n = npcs.sorting;
      if (!isFree(n)) return false;
      const prevMode = n.mode;
      const toPlant = [[83.2, 79.5], [73.8, 79.5], [73.8, 55.5], [64.4, 55.5], [64.4, 44.5]];
      const back = [...toPlant.slice().reverse(), CHARS.sorting.home];
      log('🌱 선별팀이 복도 화분에 물 주러 이동');
      sendPath('sorting', toPlant, {
        mode: 'coffee-walk', carry: 'can', bubble: '🌱 화분에 물 주러 가는 중…', bubbleType: 'idle',
        onArrive: () => {
          n.mode = 'action';
          n.action = 'water';
          n.carry = 'can';
          n.dir = 'e';
          n.bubble = '🌱 화분에 물 주는 중…';
          n.bubbleType = 'ok';
          setTimeout(() => {
            n.action = null;
            sendPath('sorting', back, {
              mode: 'coffee-walk', carry: 'can', bubble: '',
              onArrive: () => { n.mode = prevMode; n.dir = 's'; n.carry = null; },
            });
          }, 4800);
        },
      });
      return true;
    }

    // 4) 인력 공급팀 → 캡틴 책상 정리 정돈
    function staffingTidyCaptain() {
      const n = npcs.staffing, cap = npcs.captain;
      if (!isFree(n)) return false;
      const prevMode = n.mode;
      const toCap = [[63.2, 79.5], [56.5, 79.5], [56.5, 86.5], [50.0, 86.5], [50.0, 55.5], [34.5, 55.5], [34.5, 16.8], [41.5, 16.8]];
      const back = [...toCap.slice().reverse(), CHARS.staffing.home];
      log('✨ 인력 공급팀이 캡틴 책상 정리 정돈하러 이동');
      sendPath('staffing', toCap, {
        mode: 'coffee-walk', carry: 'duster', bubble: '✨ 캡틴 책상 정리하러…', bubbleType: 'idle',
        onArrive: () => {
          n.mode = 'action';
          n.action = 'tidy';
          n.carry = 'duster';
          n.dir = 'e';
          n.bubble = '✨ 캡틴 책상 정리 정돈 중…';
          n.bubbleType = 'ok';
          if (isFree(cap) && cap.capPose !== 'window') {
            setTimeout(() => {
              cap.bubble = '고마워요, 아주 깔끔하네요! 👍';
              cap.bubbleType = 'ok';
              setTimeout(() => { if (cap.bubble.includes('깔끔')) cap.bubble = ''; }, 2600);
            }, 1400);
          }
          setTimeout(() => {
            n.action = null;
            sendPath('staffing', back, {
              mode: 'coffee-walk', carry: 'duster', bubble: '',
              onArrive: () => { n.mode = prevMode; n.dir = 's'; n.carry = null; },
            });
          }, 4600);
        },
      });
      return true;
    }

    // 5) 인력 공급팀 → 사무실 바닥 빗자루 청소
    function staffingSweepOffice() {
      const n = npcs.staffing;
      if (!isFree(n)) return false;
      const prevMode = n.mode;
      const toHall = [[63.2, 79.5], [56.5, 79.5], [56.5, 86.5], [50.0, 86.5], [50.0, 55.5], [44.2, 55.5]];
      const back = [[54.5, 55.5], [50.0, 55.5], [50.0, 86.5], [56.5, 86.5], [56.5, 79.5], [63.2, 79.5], CHARS.staffing.home];
      log('🧹 인력 공급팀이 사무실 바닥 청소 시작');
      sendPath('staffing', toHall, {
        mode: 'coffee-walk', carry: 'broom', bubble: '🧹 사무실 청소 시작!', bubbleType: 'idle',
        onArrive: () => {
          n.mode = 'action';
          n.action = 'sweep';
          n.carry = 'broom';
          n.dir = 'e';
          n.bubble = '🧹 중앙 복도 쓸고 닦는 중…';
          n.bubbleType = 'idle';
          setTimeout(() => {
            sendPath('staffing', [[44.2, 55.5], [54.5, 55.5]], {
              mode: 'coffee-walk', carry: 'broom', bubble: '🧹 바닥 청소 중…', bubbleType: 'idle',
              onArrive: () => {
                n.mode = 'action';
                n.action = 'sweep';
                n.dir = 'w';
                setTimeout(() => {
                  n.action = null;
                  sendPath('staffing', back, {
                    mode: 'coffee-walk', carry: 'broom', bubble: '',
                    onArrive: () => { n.mode = prevMode; n.dir = 's'; n.carry = null; },
                  });
                }, 2200);
              },
            });
          }, 1800);
        },
      });
      return true;
    }

    // 6) 할 일 없을 때 직원 2명이 중앙 복도에서 만나 업무 대화 & 수다
    const CHAT_SCRIPTS = [
      ['요즘 가게 찾기용 메뉴판 사진 퀄리티 좋아졌죠?', '맞아요! 손님들이 훨씬 보기 편해졌대요 😊', '다음 가게도 깔끔하게 뽑아봐요!'],
      ['베트남어·영어 번역 자연스러운지 이따 같이 볼까요?', '좋아요! 5개 국어 톤 맞춰서 확인해요 👍', '네, 준비되면 바로 부를게요!'],
      ['오늘 사무실 커피 원두 향이 유독 좋네요 ☕', '저도 아까 한 잔 마셨는데 딱 좋더라고요 😄', '잠시 쉬었으니 다시 화이팅해요!'],
      ['새 가게 사진 올라오면 바로 분류 시작할게요!', '저도 메뉴판 가격표 대조 대기 중이에요 💪', '오늘도 완벽하게 끝내봅시다!'],
    ];
    function staffChat() {
      const pool = ['finder', 'agy', 'menu-reader', 'codex', 'reviewer', 'polisher'].filter(id => isFree(npcs[id]));
      if (pool.length < 2) return false;
      const a = pool[Math.floor(Math.random() * pool.length)];
      const rest = pool.filter(x => x !== a);
      const b = rest[Math.floor(Math.random() * rest.length)];
      const prevA = npcs[a].mode, prevB = npcs[b].mode;
      const script = CHAT_SCRIPTS[Math.floor(Math.random() * CHAT_SCRIPTS.length)];
      const spotA = [46.8, 55.5], spotB = [53.2, 55.5];
      const pathA = [...TO_HALL[a], spotA], pathB = [...TO_HALL[b], spotB];
      const backA = [...pathA.slice().reverse(), CHARS[a].home];
      const backB = [...pathB.slice().reverse(), CHARS[b].home];
      let arrived = 0;

      function startBanter() {
        const na = npcs[a], nb = npcs[b];
        na.dir = 'e'; nb.dir = 'w';
        na.bubble = script[0]; na.bubbleType = 'meet';
        setTimeout(() => {
          na.bubble = '';
          nb.bubble = script[1]; nb.bubbleType = 'meet';
          setTimeout(() => {
            nb.bubble = '';
            na.bubble = script[2]; na.bubbleType = 'ok';
            setTimeout(() => {
              na.action = null; nb.action = null;
              sendPath(a, backA, { mode: 'coffee-walk', bubble: '', onArrive: () => { na.mode = prevA; na.dir = CHARS[a].seatFacing || 's'; } });
              sendPath(b, backB, { mode: 'coffee-walk', bubble: '', onArrive: () => { nb.mode = prevB; nb.dir = CHARS[b].seatFacing || 's'; } });
            }, 2200);
          }, 2600);
        }, 2600);
      }

      log(`💬 ${CHARS[a].name} · ${CHARS[b].name} 복도에서 업무 수다`);
      sendPath(a, pathA, {
        mode: 'coffee-walk', bubble: '',
        onArrive: () => { npcs[a].mode = 'action'; npcs[a].action = 'chat'; npcs[a].dir = 'e'; if (++arrived === 2) startBanter(); },
      });
      sendPath(b, pathB, {
        mode: 'coffee-walk', bubble: '',
        onArrive: () => { npcs[b].mode = 'action'; npcs[b].action = 'chat'; npcs[b].dir = 'w'; if (++arrived === 2) startBanter(); },
      });
      return true;
    }

    // 7) 시각 정보 비서 → 미디어 관제실 안 조명·카메라 점검
    function finderCheckGear() {
      const n = npcs.finder;
      if (!isFree(n)) return false;
      const prevMode = n.mode;
      const toLight  = [[15.2, 41.5], [20.8, 41.5]];
      const toCamera = [[20.8, 41.5], [8.6, 41.5], [8.6, 46.8]];
      const backHome = [[8.6, 46.8], [8.6, 41.5], [15.2, 41.5], CHARS.finder.home];
      log('📷 시각 정보 비서가 미디어 관제실 조명·카메라 점검 시작');
      sendPath('finder', toLight, {
        mode: 'coffee-walk', bubble: '💡 조명 점검하러…', bubbleType: 'idle',
        onArrive: () => {
          n.mode = 'action'; n.action = 'gear'; n.dir = 'e';
          n.bubble = '💡 스튜디오 조명 밝기 점검 중…'; n.bubbleType = 'work';
          setTimeout(() => {
            n.action = null;
            sendPath('finder', toCamera, {
              mode: 'coffee-walk', bubble: '📷 카메라 확인 중…', bubbleType: 'idle',
              onArrive: () => {
                n.mode = 'action'; n.action = 'gear'; n.dir = 'w';
                n.bubble = '📷 카메라 렌즈·초점 점검 중…'; n.bubbleType = 'ok';
                setTimeout(() => {
                  n.action = null;
                  sendPath('finder', backHome, {
                    mode: 'coffee-walk', bubble: '',
                    onArrive: () => { n.mode = prevMode; n.dir = 's'; },
                  });
                }, 2600);
              },
            });
          }, 2400);
        },
      });
      return true;
    }

    // 8) 운영 감찰관 + 데이터 감사관 → 감사실 안에서 업무 대화
    const AUDIT_SCRIPTS = [
      ['방금 메뉴판 가격표 숫자 한 번 더 대조해 볼까요?', '네, 0 빠진 곳 없는지 제가 마지막까지 볼게요 🔍', '좋아요! 오류 0건으로 깔끔하게 올립시다 👍'],
      ['표준 점검 통과율 요즘 계속 100%네요!', '맞아요, 사진이랑 번역 품질도 훨씬 좋아졌어요 ✔', '다음 가게도 꼼꼼히 체크해 봐요!'],
    ];
    function auditDiscuss() {
      const a = npcs.codex, b = npcs.reviewer;
      if (!isFree(a) || !isFree(b)) return false;
      const prevA = a.mode, prevB = b.mode;
      const sc = AUDIT_SCRIPTS[Math.floor(Math.random() * AUDIT_SCRIPTS.length)];
      let ready = 0;
      function talk() {
        a.dir = 'e'; b.dir = 'w';
        a.bubble = sc[0]; a.bubbleType = 'meet';
        setTimeout(() => {
          a.bubble = ''; b.bubble = sc[1]; b.bubbleType = 'meet';
          setTimeout(() => {
            b.bubble = ''; a.bubble = sc[2]; a.bubbleType = 'ok';
            setTimeout(() => {
              a.action = null; b.action = null;
              sendPath('codex', [[11.6, 95.8], [7.8, 95.8], CHARS.codex.home], {
                mode: 'coffee-walk', bubble: '', onArrive: () => { a.mode = prevA; a.dir = 'n'; },
              });
              sendPath('reviewer', [[15.8, 95.8], [19.5, 95.8], CHARS.reviewer.home], {
                mode: 'coffee-walk', bubble: '', onArrive: () => { b.mode = prevB; b.dir = 'n'; },
              });
            }, 2200);
          }, 2500);
        }, 2500);
      }
      log('🔍 운영 감찰관 · 데이터 감사관이 감사실에서 업무 협의');
      sendPath('codex', [[7.8, 95.8], [11.6, 95.8]], {
        mode: 'coffee-walk', bubble: '',
        onArrive: () => { a.mode = 'action'; a.action = 'chat'; a.dir = 'e'; if (++ready === 2) talk(); },
      });
      sendPath('reviewer', [[19.5, 95.8], [15.8, 95.8]], {
        mode: 'coffee-walk', bubble: '',
        onArrive: () => { b.mode = 'action'; b.action = 'chat'; b.dir = 'w'; if (++ready === 2) talk(); },
      });
      return true;
    }

    // 9) 수석 번역관 → 비서실장에게 가서 번역 이야기 나누기
    function polisherTalkChief() {
      const p = npcs.polisher, c = npcs.claude;
      if (!isFree(p) || !isFree(c)) return false;
      const prevP = p.mode;
      const toChief = routeToChief('polisher');
      const backHome = [...toChief.slice().reverse(), CHARS.polisher.home];
      log('🌐 수석 번역관이 비서실장에게 번역 상의하러 이동');
      sendPath('polisher', toChief, {
        mode: 'coffee-walk', carry: 'doc', bubble: '🌐 번역 톤 상의하러…', bubbleType: 'idle',
        onArrive: () => {
          p.mode = 'action'; p.action = 'chat'; p.dir = 'n';
          p.bubble = '베트남어·일본어 메뉴 설명 톤 괜찮을까요? 🌐'; p.bubbleType = 'meet';
          setTimeout(() => {
            c.bubble = '자연스럽고 손님들이 읽기 딱 좋아요! 👌'; c.bubbleType = 'ok';
            setTimeout(() => {
              c.bubble = '';
              p.bubble = '감사합니다! 같은 톤으로 정리할게요 😊'; p.bubbleType = 'ok';
              setTimeout(() => {
                p.action = null;
                sendPath('polisher', backHome, {
                  mode: 'coffee-walk', carry: 'doc', bubble: '',
                  onArrive: () => { p.mode = prevP; p.dir = 's'; p.carry = null; },
                });
              }, 2000);
            }, 2500);
          }, 2200);
        },
      });
      return true;
    }

    function updateOfficeLife(now) {
      if (isDemo || hasActiveWork) return;
      if (now < nextLifeActAt) return;
      const acts = [
        chiefAskCaptain, finderCheckGear, auditDiscuss, sortingConveyor,
        polisherTalkChief, staffChat, staffingTidyCaptain, sortingWaterPlants,
        staffingSweepOffice, serveCoffeeToCaptain,
      ];
      for (let tries = 0; tries < acts.length; tries++) {
        const fn = acts[(lifeSeqIdx + tries) % acts.length];
        if (fn()) {
          lifeSeqIdx = (lifeSeqIdx + tries + 1) % acts.length;
          break;
        }
      }
      nextLifeActAt = now + 15000 + Math.random() * 7000;
    }

    // ---------------------------------------------------------------- 가상 22초 시연
    function stopDemo() {
      demoTimers.forEach(clearTimeout);
      demoTimers = [];
      isDemo = false;
      for (const [id, cfg] of Object.entries(CHARS)) {
        Object.assign(npcs[id], {
          x: cfg.home[0], y: cfg.home[1], mode: 'idle', dir: cfg.seatFacing || 's', capPose: 'idle',
          action: null, hiddenOut: false, bubble: '', carry: null, path: [], progress: null, onArrive: null,
        });
      }
    }

    function runDemo() {
      stopDemo();
      isDemo = true;
      const at = (ms, fn) => demoTimers.push(setTimeout(fn, ms));

      log('▶ 시연 시작: 캡틴이 커피를 마시며 "새 가게 메뉴판 제작" 지시');
      npcs.captain.capPose = 'coffee';
      npcs.captain.bubble = '새 가게 메뉴판 만들어줘!';
      npcs.captain.bubbleType = 'work';
      npcs.claude.mode = 'work';
      npcs.claude.bubble = '지시 접수! 팀 배정 중…';

      at(1600, () => {
        captainWindowWalk();
        npcs.claude.bubble = '사진·메뉴판 읽기 시작해 주세요!';
        npcs.finder.mode = 'work';
        npcs.finder.bubble = '📷 요리 사진 6장 고르는 중…';
        npcs.finder.progress = 35;
        npcs.agy.mode = 'work';
        npcs.agy.bubble = '🔍 메뉴판 5장 읽는 중…';
        npcs.agy.progress = 25;
        log('비서실장 → 시각 정보 비서·메뉴 검사관 앉아서 작업 시작');
      });

      at(4200, () => {
        npcs.finder.progress = 90;
        npcs.agy.progress = 65;
        npcs.claude.bubble = '진행 상황 확인 중…';
      });

      at(5600, () => {
        npcs.finder.progress = null;
        walkReport('finder', '사진 6장 선별 완료!');
      });

      at(8400, () => {
        npcs.agy.progress = 100;
        walkReport('agy', '메뉴 48개·가격 정리 완료!');
      });

      at(11200, () => {
        npcs.polisher.mode = 'work';
        npcs.polisher.bubble = '🌐 5개 언어 번역 중…';
        npcs.polisher.progress = 45;
        npcs.staffing.mode = 'work';
        npcs.staffing.bubble = '📋 인력 현황 정리 중…';
        npcs.staffing.progress = 55;
        log('수석 번역관·인력 공급팀 앉아서 작업 시작');
      });

      at(14000, () => {
        npcs.polisher.progress = 95;
        npcs.staffing.progress = 100;
        walkReport('staffing', '오늘 인력 보고 완료!');
      });

      at(16800, () => {
        npcs.polisher.progress = null;
        walkReport('polisher', '5개 언어 번역 끝!');
      });

      at(20600, () => {
        chiefHandoff('결재 올립니다! (배포 대기)');
      });

      at(25500, () => {
        log('✔ 시연 완료! 실제 지시가 들어오면 이대로 자동 움직입니다.');
        isDemo = false;
        nextCapActAt = Date.now() + 5000;
      });
    }

    // ---------------------------------------------------------------- 실제 대시보드 데이터 연동
    function syncReal({ orders = [], jobs = [], collector = null, hr = null, talk = [] } = {}) {
      if (isDemo) return;

      const r = hr?.status === 'ok' && hr.report;
      hrMarks = [];
      if (r) {
        const h = new Date(Date.now() + 7 * 3600e3).getUTCHours();
        if (r.day) hrMarks.push(['ok', '주간 보고 ✔']);
        else if (h >= 9) hrMarks.push(['no', '주간 보고 없음']);
        if (r.night) hrMarks.push(['ok', '야간 보고 ✔']);
        else if (h >= 21) hrMarks.push(['no', '야간 보고 없음']);
      }

      const active = new Map();
      for (const j of jobs.filter(x => x.status === 'running')) {
        if (CHARS[j.desk]) active.set(j.desk, j.tool === 'shot' ? '📱 화면 캡처 중…' : '🔍 표준 점검 중…');
      }
      if (collector?.job?.status === 'running') {
        active.set('finder', `📷 사진 수집 중 (${collector.job.photos || 0}장)`);
      }

      const runningOrders = orders.filter(o => o.status === 'running');
      for (const o of runningOrders) {
        const lastStep = o.steps?.at(-1);
        active.set('claude', lastStep ? `${lastStep.text.slice(0, 22)}…` : '📋 지시 진행 중…');
        for (const d of (o.active || [])) {
          if (CHARS[d]) active.set(d, lastStep?.who === d ? lastStep.text.slice(0, 22) : `${CHARS[d].role} 중…`);
        }
      }

      const doneSet = new Set();
      const cleared = o => o.deploy?.length ? o.deployState === 'done' : !!o.seenAt;
      for (const o of orders.filter(o => o.status === 'done' && !cleared(o))) {
        (o.worked || []).forEach(d => doneSet.add(d));
      }

      for (const id of prevActive) {
        if (!active.has(id) && id !== 'claude' && CHARS[id] && npcs[id].mode !== 'walk') {
          walkReport(id, '작업 완료 보고!');
        }
      }
      for (const t of talk.slice(-8)) {
        const key = `${t.i}:${t.who}:${t.kind}`;
        if (t.kind === 'report' && CHARS[t.who] && !seenReports.has(key)) {
          seenReports.add(key);
          if (seenReports.size > 1 && runningOrders.length) walkReport(t.who, '보고드립니다!');
        }
      }

      const latestDone = orders.find(o => o.status === 'done' && !cleared(o));
      if (latestDone && prevDoneOrder && latestDone.id !== prevDoneOrder && !runningOrders.length) {
        chiefHandoff('결재 올립니다!');
      }
      if (latestDone) prevDoneOrder = latestDone.id;
      prevActive = new Set(active.keys());

      hasActiveWork = active.size > 0;
      for (const [id, n] of Object.entries(npcs)) {
        if (id === 'captain' || n.mode === 'walk' || n.mode === 'coffee-walk' || n.mode === 'action') continue;
        if (active.has(id)) {
          n.mode = 'work';
          n.bubble = active.get(id);
          n.bubbleType = 'work';
        } else if (doneSet.has(id)) {
          n.mode = 'done';
          if (n.bubble && !n.bubble.includes('✔')) n.bubble = '';
        } else {
          n.mode = 'idle';
          if (n.bubble && n.bubbleType !== 'idle') n.bubble = '';
        }
      }

      const now = Date.now();
      if (!active.size && now - lastCoffeeAt > 36000) {
        lastCoffeeAt = now;
        const idleIds = Object.keys(CHARS).filter(id => id !== 'captain' && id !== 'claude' && npcs[id].mode === 'idle');
        if (idleIds.length) coffeeStroll([idleIds[Math.floor(Math.random() * idleIds.length)]]);
      }
    }

    // ---------------------------------------------------------------- 고화질 8방향 스프라이트 렌더링
    function drawNpc(n, t) {
      if (n.hiddenOut) return;
      const cfg = CHARS[n.id];
      const walking = n.mode === 'walk' || n.mode === 'coffee-walk';
      const acting = n.mode === 'action';
      const working = n.mode === 'work';
      const done = n.mode === 'done';
      // 실제 걸음 보폭(1.15~1.25보/초)에 정확히 맞춘 느긋한 프레임 속도 — 팔·다리·어깨 빠른 떨림 완전 제거!
      const frame4 = Math.floor(n.walkDist * 0.45) % 4;
      const frame6 = Math.floor(n.walkDist * 0.62) % 6;
      const typeIdx = Math.floor(t * 2.2) % 2;

      let im = imgs[n.id];
      let flipX = false;
      let isFullBody = walking || acting;
      let isNorthSeated = (!isFullBody && cfg.seatFacing === 'n');
      let using6 = false;

      const d = n.dir || 's';

      if (n.id === 'captain') {
        if (walking) {
          // 100% 동일 외형·동일 크기의 통일 시트(se/ne/up)만 사용해 방향 전환 시 크기 변화·얼굴 변형 0!
          const cw = imgs.walk.captain;
          if (d === 'n' && cw?.up?.[frame4]) {
            im = cw.up[frame4];
          } else if ((d === 'ne' || d === 'nw') && cw?.ne?.[frame4]) {
            im = cw.ne[frame4]; flipX = (d === 'nw');
          } else if (cw?.se?.[frame4]) {
            im = cw.se[frame4]; flipX = (d === 'w' || d === 'sw');
          }
          isFullBody = true;
        } else if (n.capPose === 'window') {
          im = imgs.walk.captain?.up?.[0] || imgs.cap.window || imgs.captain;
          isFullBody = true;
        } else if (n.capPose === 'coffee') {
          // 4단계 자연스러운 커피 마시기 시퀀스: 컵 잡기(0.7s) → 들기(0.7s) → 눈 감고 한 모금(2.4s) → 미소 내려놓기(1.2s) → 반복
          const seq = imgs.cap.coffeeSeq;
          const el = ((performance.now() - (n.capCoffeeStart || 0)) / 1000) % 5.6;
          const ci = el < 0.7 ? 0 : el < 1.4 ? 1 : el < 3.8 ? 2 : el < 5.0 ? 3 : 0;
          im = (seq && seq[ci]) ? seq[ci] : (imgs.cap.coffee || imgs.seated.captain?.idle);
        } else if (n.capPose === 'thumbs') {
          im = imgs.cap.thumbs || imgs.seated.captain?.idle;
        } else {
          im = imgs.seated.captain?.idle || imgs.cap.idle;
        }
      } else if (walking || acting) {
        // 커피·서류·청소도구·물뿌리개를 들고 있어도 항상 자연스러운 전신 8방향 스프라이트 사용!
        const wset = imgs.walk[n.id];
        const fUse = acting ? 0 : frame4;
        const f6Use = acting ? 0 : frame6;
        if (wset) {
          if (d === 'n' && wset.up?.[fUse]) {
            im = wset.up[fUse];
          } else if (d === 's' && wset.down?.[fUse]) {
            im = wset.down[fUse];
          } else if ((d === 'se' || d === 'sw') && wset.se?.[fUse]) {
            im = wset.se[fUse]; flipX = (d === 'sw');
          } else if ((d === 'ne' || d === 'nw') && wset.ne?.[fUse]) {
            im = wset.ne[fUse]; flipX = (d === 'nw');
          } else if (wset.side6?.[f6Use]) {
            im = wset.side6[f6Use];
            flipX = (d === 'w' || d === 'sw' || d === 'nw');
            using6 = !acting;
          } else if (wset.side?.[fUse]) {
            im = wset.side[fUse];
            flipX = (d === 'w' || d === 'sw' || d === 'nw');
          }
        }
      } else {
        const sset = imgs.seated[n.id];
        if (sset) {
          im = working ? (typeIdx === 0 ? sset.w1 : sset.w2) || sset.idle : sset.idle;
        }
      }
      if (!im) return;

      const cx = (n.x / 100) * W;
      const isCapCoffee = (n.id === 'captain' && !isFullBody && n.capPose === 'coffee');
      const isCapActionCrop = (n.id === 'captain' && !isFullBody && n.capPose === 'thumbs');
      const cy = (n.y / 100) * H + (isCapCoffee ? -6 : 0);
      // 모든 걷기 스프라이트를 여백 0으로 정확히 정규화했으므로 84px 고정 높이 = 방향 전환 시 크기 변화 0%!
      const targetH = (isFullBody ? 84 : isCapActionCrop ? 114 : isCapCoffee ? 70 : isNorthSeated ? 82 : 74) * cfg.scale;
      const targetW = targetH * (im.naturalWidth / im.naturalHeight);

      // 타이핑·착석 시 어깨 흔들림 0, 걷기 시에만 아주 부드러운 보폭 리듬
      const bob = walking
        ? (using6 ? ((frame6 === 1 || frame6 === 4) ? -1.0 : 0) : ((frame4 % 2 === 1) ? -1.0 : 0))
        : done ? -Math.abs(Math.sin(t * 3.2)) * 0.9
        : 0;

      ctx.save();
      if (isFullBody) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.28)';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 5, 18, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      if (working) {
        const pulse = 0.20 + 0.08 * Math.sin(t * 4);
        ctx.fillStyle = `rgba(56, 189, 248, ${pulse})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy - targetH * 0.45, targetW * 0.52, targetH * 0.44, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (done && n.id !== 'captain') {
        const pulse = 0.16 + 0.07 * Math.sin(t * 3.2);
        ctx.fillStyle = `rgba(74, 222, 128, ${pulse})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy - targetH * 0.45, targetW * 0.50, targetH * 0.40, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.translate(cx, cy + bob);
      if (flipX) ctx.scale(-1, 1);

      if (isFullBody) {
        ctx.drawImage(im, -targetW / 2, -targetH + 6, targetW, targetH);
      } else if (isCapActionCrop) {
        const sh = im.naturalHeight * 0.55;
        const dh = targetH * 0.55;
        ctx.drawImage(im, 0, 0, im.naturalWidth, sh, -targetW / 2, -dh, targetW, dh);
      } else {
        ctx.drawImage(im, -targetW / 2, -targetH, targetW, targetH);
      }

      // 걷기·행동 애니메이션 위에 픽셀 아트 소품(쟁반·머그컵·서류철·물뿌리개·빗자루·먼지털이)과 이펙트 합성
      if ((walking || acting) && (n.carry || n.action) && d !== 'n') {
        const swayY = Math.sin(walking ? n.walkDist * 1.4 : t * 5.0) * 1.1;
        const isFront = (d === 's');
        if (n.carry === 'coffee') {
          const prop = (n.id === 'claude' && imgs.propTray) ? imgs.propTray : imgs.propMug;
          if (prop) {
            const pw = (n.id === 'claude') ? 26 : 16;
            const ph = pw * (prop.naturalHeight / prop.naturalWidth);
            const px = isFront ? 4 : (targetW * 0.24);
            const py = -targetH * 0.54 + swayY;
            ctx.drawImage(prop, px, py, pw, ph);
          }
        } else if (n.carry === 'doc' && imgs.propDoc) {
          const pw = 16;
          const ph = pw * (imgs.propDoc.naturalHeight / imgs.propDoc.naturalWidth);
          const px = isFront ? 5 : (targetW * 0.16);
          const py = -targetH * 0.50 + swayY;
          ctx.drawImage(imgs.propDoc, px, py, pw, ph);
        } else if ((n.carry === 'can' || n.action === 'water') && imgs.propCan) {
          const pw = 24;
          const ph = pw * (imgs.propCan.naturalHeight / imgs.propCan.naturalWidth);
          const tilt = n.action === 'water' ? 0.28 + Math.sin(t * 5) * 0.08 : 0;
          ctx.save();
          ctx.translate(targetW * 0.28, -targetH * 0.44 + swayY);
          ctx.rotate(tilt);
          ctx.drawImage(imgs.propCan, -4, -ph * 0.5, pw, ph);
          ctx.restore();
          if (n.action === 'water') {
            // 반짝이는 파란 물방울 이펙트
            ctx.fillStyle = '#38bdf8';
            for (let k = 0; k < 4; k++) {
              const p = (t * 2.8 + k * 0.25) % 1;
              ctx.beginPath();
              ctx.arc(targetW * 0.28 + 20 + k * 2.5, -targetH * 0.44 + 4 + p * 22, 1.8, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        } else if ((n.carry === 'broom' || n.action === 'sweep') && imgs.propBroom) {
          const pw = 20;
          const ph = pw * (imgs.propBroom.naturalHeight / imgs.propBroom.naturalWidth);
          const swing = Math.sin(t * 6.5) * 0.28;
          ctx.save();
          ctx.translate(targetW * 0.24, -targetH * 0.46);
          ctx.rotate(swing);
          ctx.drawImage(imgs.propBroom, -pw * 0.4, -ph * 0.25, pw, ph);
          ctx.restore();
          if (n.action === 'sweep') {
            ctx.fillStyle = 'rgba(254, 240, 138, 0.85)';
            const sp = (t * 3.5) % 1;
            ctx.fillRect(targetW * 0.35 + sp * 10, -4 - sp * 8, 3, 3);
            ctx.fillRect(targetW * 0.22 - sp * 8, -6 - sp * 6, 2.5, 2.5);
          }
        } else if ((n.carry === 'duster' || n.action === 'tidy') && imgs.propDuster) {
          const pw = 22;
          const ph = pw * (imgs.propDuster.naturalHeight / imgs.propDuster.naturalWidth);
          const wave = n.action === 'tidy' ? Math.sin(t * 8.0) * 0.42 : 0;
          ctx.save();
          ctx.translate(targetW * 0.26, -targetH * 0.48);
          ctx.rotate(wave);
          ctx.drawImage(imgs.propDuster, -2, -ph * 0.7, pw, ph);
          ctx.restore();
          if (n.action === 'tidy') {
            ctx.fillStyle = '#fde047';
            const alpha = 0.5 + 0.5 * Math.sin(t * 9);
            ctx.globalAlpha = alpha;
            ctx.fillRect(targetW * 0.45, -targetH * 0.65, 4, 4);
            ctx.fillRect(targetW * 0.58, -targetH * 0.52, 3, 3);
            ctx.globalAlpha = 1;
          }
        } else if (n.action === 'gear') {
          // 카메라·조명 점검 시 부드러운 플래시 반짝임 이펙트
          const flash = Math.max(0, Math.sin(t * 6));
          ctx.fillStyle = `rgba(254, 240, 138, ${0.25 + flash * 0.55})`;
          ctx.beginPath();
          ctx.arc(targetW * 0.42, -targetH * 0.56, 5 + flash * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    }

    // ---------------------------------------------------------------- 60fps 메인 루프
    let lastTs = performance.now();
    let rafId = 0;

    function tick(now) {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      const t = now / 1000;

      const nowMs = Date.now();
      updateCaptainLife(nowMs);
      updateOfficeLife(nowMs);
      if (conveyorActive) conveyorPhase = (conveyorPhase + dt * 0.42) % 1;

      for (const n of Object.values(npcs)) {
        if (!n.path.length) continue;
        const [tx, ty] = n.path[0];
        const dx = tx - n.x, dy = ty - n.y;
        const dist = Math.hypot(dx, dy);
        // 마지막 목적지 도착 직전에 부드럽게 감속
        const ease = (n.path.length === 1 && dist < 3.0) ? Math.max(0.45, dist / 3.0) : 1.0;
        const step = n.speed * ease * dt;
        if (dist <= step + 0.18) {
          n.walkDist += dist;
          n.x = tx; n.y = ty;
          n.path.shift();
          if (!n.path.length && n.onArrive) {
            const cb = n.onArrive;
            n.onArrive = null;
            cb();
          }
        } else {
          n.x += (dx / dist) * step;
          n.y += (dy / dist) * step;
          n.walkDist += step;
          n.dir = angleToDir8(dx, dy);
        }
      }

      ctx.clearRect(0, 0, W, H);
      if (imgs.bg) ctx.drawImage(imgs.bg, 0, 0, W, H);
      else { ctx.fillStyle = '#1e293b'; ctx.fillRect(0, 0, W, H); }

      // 선별팀 컨베이어 벨트 가동 시 상자가 L자 벨트를 따라 부드럽게 이동 + 초록 가동 LED 깜빡임
      if (conveyorActive && imgs.propBox) {
        for (let b = 0; b < 2; b++) {
          const u = (conveyorPhase + b * 0.5) % 1;
          let bx, by;
          if (u < 0.65) {
            bx = 96.4;
            by = 75.5 + (u / 0.65) * 14.5;
          } else {
            bx = 96.4 - ((u - 0.65) / 0.35) * 5.2;
            by = 90.0;
          }
          ctx.drawImage(imgs.propBox, (bx / 100) * W - 11, (by / 100) * H - 11, 22, 20);
        }
        ctx.fillStyle = Math.sin(t * 10) > 0 ? '#22c55e' : '#86efac';
        ctx.beginPath();
        ctx.arc(0.916 * W, 0.875 * H, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      const list = Object.values(npcs).sort((a, b) => a.y - b.y);
      for (const n of list) drawNpc(n, t);

      // 남향 직원이 자리를 비웠을 때만 빈 책상 위에 노트북 소품 표시 (앉아 있을 때는 노트북 일체형 스프라이트가 정확히 맞물림!)
      if (imgs.laptop) {
        const lwRatio = imgs.laptop.naturalHeight / imgs.laptop.naturalWidth;
        for (const lp of DESK_LAPTOPS) {
          const st = npcs[lp.id];
          if (st && st.mode !== 'walk' && st.mode !== 'coffee-walk' && st.mode !== 'action') continue;
          const lx = (lp.x / 100) * W;
          const ly = (lp.y / 100) * H;
          const lh = lp.w * lwRatio;
          ctx.drawImage(imgs.laptop, lx - lp.w / 2, ly - lh, lp.w, lh);
        }
      }

      let workingCount = 0;
      for (const [id, n] of Object.entries(npcs)) {
        if (n.mode === 'work' || n.mode === 'walk') workingCount++;
        const tag = tagEls[id];
        const bub = bubEls[id];
        if (n.hiddenOut) {
          tag.style.display = 'none';
          bub.hidden = true;
          continue;
        }
        tag.style.display = '';
        const walking = n.mode === 'walk' || n.mode === 'coffee-walk';

        tag.style.left = `${n.x}%`;
        tag.style.top = `${n.y + (walking ? 1.5 : (CHARS[id].seatFacing === 's' ? 4.4 : 1.0))}%`;
        tag.className = 'og-tag' + (n.mode === 'work' ? ' work' : n.mode === 'done' ? ' done' : n.mode === 'walk' ? ' walk' : '');
        tag.querySelector('small').textContent =
          n.mode === 'work' ? '작업 중…' : n.mode === 'walk' ? '이동 중' : n.mode === 'done' ? '✔ 작업 완료' : CHARS[id].role;

        if (n.bubble) {
          bub.hidden = false;
          const isCapTop = (id === 'captain' && n.x < 65);
          bub.style.left = `${isCapTop ? n.x + 11 : n.x}%`;
          bub.style.top = `${isCapTop ? 12.0 : Math.max(7, n.y - (walking ? 14.5 : 10.5))}%`;
          bub.className = `og-bubble ${n.bubbleType || ''}`;
          const prog = n.progress != null ? `<div class="og-prog"><i style="width:${n.progress}%"></i></div>` : '';
          const html = `${n.bubble}${prog}`;
          if (bub.dataset.h !== html) { bub.innerHTML = html; bub.dataset.h = html; }
        } else {
          bub.hidden = true;
        }
      }

      modeChip.textContent = isDemo ? '▶ 가상 시연 중' : '● 실시간 연동';
      modeChip.className = `og-chip ${isDemo ? 'demo' : 'live'}`;
      workChip.textContent = npcs.captain.hiddenOut ? '🚗 캡틴 외근 중' : (workingCount ? `일하는 직원 ${workingCount}명` : '전원 대기 중');

      const hrHtml = hrMarks.map(([c, txt]) => `<span class="${c}">${txt}</span>`).join('');
      if (hrBox.dataset.h !== hrHtml) { hrBox.innerHTML = hrHtml; hrBox.dataset.h = hrHtml; }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    // ---------------------------------------------------------------- 전체화면(유튜브 스타일 + 폰 가로 전환) & RPG 상태창
    let isFs = false;
    let selectedId = null;

    function syncFsUi() {
      const nativeFs = (document.fullscreenElement === shell || document.webkitFullscreenElement === shell);
      isFs = nativeFs || shell.classList.contains('is-fs') || shell.classList.contains('is-fs-rot');
      const stillPortrait = isFs && window.innerHeight > window.innerWidth && window.innerWidth <= 900;
      shell.classList.toggle('og-rot-stage', nativeFs && stillPortrait);
      if (!isFs) shell.classList.remove('is-fs', 'is-fs-rot', 'og-rot-stage');
      if (fsLbl) fsLbl.textContent = isFs ? '축소' : '전체화면';
      if (fsBtn) {
        const svg = fsBtn.querySelector('svg');
        if (svg) {
          svg.innerHTML = isFs
            ? '<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/>'
            : '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>';
        }
      }
    }

    async function enterFullscreen() {
      let nativeOk = false;
      try {
        if (shell.requestFullscreen) { await shell.requestFullscreen(); nativeOk = true; }
        else if (shell.webkitRequestFullscreen) { shell.webkitRequestFullscreen(); nativeOk = true; }
      } catch {}
      try {
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape');
        }
      } catch {}
      if (!nativeOk) {
        const isPortraitPhone = window.innerHeight > window.innerWidth && window.innerWidth <= 900;
        shell.classList.toggle('is-fs-rot', isPortraitPhone);
        shell.classList.toggle('is-fs', !isPortraitPhone);
      }
      syncFsUi();
    }

    async function exitFullscreen() {
      shell.classList.remove('is-fs', 'is-fs-rot', 'og-rot-stage');
      try {
        if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitFullscreenElement && document.webkitExitFullscreen) document.webkitExitFullscreen();
      } catch {}
      try {
        if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
      } catch {}
      syncFsUi();
    }

    function toggleFullscreen() {
      if (isFs) exitFullscreen();
      else enterFullscreen();
    }

    document.addEventListener('fullscreenchange', syncFsUi);
    document.addEventListener('webkitfullscreenchange', syncFsUi);
    window.addEventListener('resize', syncFsUi);

    function escH(s) {
      return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    const ORDER_CHIPS = [
      ['새 가게', '<가게> 사진 수집기로 올렸어. 가게 찾기용(무동의·무료)으로 새 메뉴판 만들어줘.'],
      ['할 일 정리', '남은 할 일(docs/todo.md) 정리하고, 내가 정해야 할 것만 번호 보기로 알려줘.'],
      ['가격 고치기', '<가게> 메뉴 <메뉴이름> 가격을 <가격>으로 고쳐줘.'],
      ['점검', '<가게> 배포 전 점검(check-standard·check-listing·shot)하고 문제만 3줄로 알려줘.'],
    ];

    function openCaptainOrderForm() {
      const box = modalBody.querySelector('[data-og-ord-wrap]');
      if (!box) return;
      box.hidden = false;
      const btn = modalBody.querySelector('[data-og-morder]');
      if (btn) btn.hidden = true;
      const ta = box.querySelector('[data-og-ord-ta]');
      if (ta) setTimeout(() => ta.focus(), 40);
    }

    function openStatusModal(id, autoOrder = false) {
      const cfg = CHARS[id], n = npcs[id];
      if (!cfg || !n) return;
      selectedId = id;
      const modeText = n.mode === 'work' ? '작업 중…' : n.mode === 'done' ? '✔ 작업 완료'
        : (n.mode === 'walk' || n.mode === 'coffee-walk') ? '이동 중'
        : (id === 'captain' && n.capPose === 'coffee') ? '☕ 커피 마시는 중'
        : (id === 'captain' && n.capPose === 'window') ? '창밖 보는 중' : '대기 중';
      const badgeCls = n.mode === 'work' ? 'work' : n.mode === 'done' ? 'done'
        : (n.mode === 'walk' || n.mode === 'coffee-walk') ? 'walk' : '';
      const info = opts.getInfo ? opts.getInfo(id) : null;
      const avaSrc = `/static/office-game/assets/seated/${id}-idle.webp`;
      const nowMsg = n.bubble || (info?.liveText) || (n.mode === 'idle' ? '자리에서 다음 지시를 기다리는 중입니다.' : modeText);

      let extraHtml = '';
      if (info?.job) {
        extraHtml += `<div class="og-m-sec"><h4>맡은 일</h4><p>${escH(info.job)}</p></div>`;
      }
      if (info?.kpis?.length) {
        extraHtml += `<div class="og-m-sec"><h4>실시간 현황</h4><div class="og-m-kpi">${info.kpis.map(k =>
          `<div><small>${escH(k.label)}</small><strong>${escH(k.value)}</strong></div>`
        ).join('')}</div></div>`;
      }
      if (info?.recent?.length) {
        extraHtml += `<div class="og-m-sec"><h4>최근 작업 기록</h4><ul class="og-m-list">${info.recent.slice(0, 3).map(r =>
          `<li>${escH(r)}</li>`
        ).join('')}</ul></div>`;
      }

      const canOrder = (id === 'captain' && typeof opts.onSendOrder === 'function');
      const orderHtml = canOrder ? `
        <div class="og-ord-box" data-og-ord-wrap hidden>
          <div class="og-ord-chips">
            ${ORDER_CHIPS.map(([label], i) => `<button type="button" data-og-chip="${i}">${escH(label)}</button>`).join('')}
          </div>
          <textarea class="og-ord-ta" data-og-ord-ta rows="3" placeholder="지시를 적고 Enter (줄바꿈은 Shift+Enter) · 예: 바보아저씨 사진 수집기로 올렸어. 가게 찾기용으로 만들어줘"></textarea>
          <div class="og-ord-row">
            <select data-og-ord-when aria-label="언제 실행">
              <option value="">지금 실행</option>
              <option value="reset">한도 풀리면 실행</option>
              <option value="time">시각 정해서 실행</option>
            </select>
            <input type="datetime-local" data-og-ord-at hidden>
            <label><input type="checkbox" data-og-ord-argon> Argon 사용</label>
          </div>
          <div class="og-ord-foot">
            <span class="og-ord-note">배포·push·삭제는 하지 않고, 끝나면 결재함에 보고가 올라옵니다.</span>
            <button type="button" class="og-ord-send" data-og-ord-send>보내기</button>
          </div>
          <p class="og-ord-err" data-og-ord-err role="alert"></p>
        </div>` : '';

      modalBody.innerHTML = `
        <div class="og-m-head">
          <div class="og-m-ava"><img src="${avaSrc}" alt="${escH(cfg.name)}"></div>
          <div class="og-m-title">
            <h3>${escH(cfg.name)} <span class="og-m-badge ${badgeCls}">${escH(modeText)}</span></h3>
            <small>${escH(cfg.role)}${info?.sub ? ' · ' + escH(info.sub) : ''}</small>
          </div>
          <button type="button" class="og-m-x" data-og-mclose aria-label="닫기">×</button>
        </div>
        <div class="og-m-now">
          <b>현재 상태</b>
          <div>${escH(nowMsg)}</div>
          ${n.progress != null ? `<div class="og-prog" style="margin-top:6px"><i style="width:${n.progress}%"></i></div>` : ''}
        </div>
        ${extraHtml}
        ${orderHtml}
        <div class="og-m-foot">
          ${canOrder ? `<button type="button" class="og-m-order" data-og-morder>📣 업무 지시하기</button>` : ''}
          ${opts.onOpenDetail ? `<button type="button" class="og-m-detail" data-og-mdetail>📋 상세·점검 창 열기</button>` : ''}
          <button type="button" class="og-m-close" data-og-mclose>닫기</button>
        </div>`;
      modalBack.hidden = false;

      if (canOrder) {
        const ta = modalBody.querySelector('[data-og-ord-ta]');
        const sel = modalBody.querySelector('[data-og-ord-when]');
        const atIn = modalBody.querySelector('[data-og-ord-at]');
        const argonIn = modalBody.querySelector('[data-og-ord-argon]');
        const sendBtn = modalBody.querySelector('[data-og-ord-send]');
        const errEl = modalBody.querySelector('[data-og-ord-err]');
        const setErr = msg => { errEl.textContent = msg ? '안 됐어요: ' + msg : ''; };

        sel.addEventListener('change', () => {
          atIn.hidden = (sel.value !== 'time');
          setErr('');
        });
        async function doSend() {
          const text = ta.value.trim();
          if (!text) return setErr('지시를 적어 주세요');
          if (/<[^>]+>/.test(text)) return setErr('<가게> 같은 빈칸을 채워 주세요');
          let when = null;
          if (sel.value === 'reset') when = { kind: 'reset' };
          else if (sel.value === 'time') {
            if (!atIn.value) return setErr('실행할 시각을 골라 주세요');
            const ts = Math.floor(new Date(atIn.value).getTime() / 1000);
            if (!ts || ts <= Math.floor(Date.now() / 1000)) return setErr('앞으로 올 시각을 골라 주세요');
            when = { kind: 'time', at: ts };
          }
          sendBtn.disabled = true;
          setErr('');
          try {
            const res = await opts.onSendOrder({ text, when, argon: !!argonIn.checked });
            if (res?.error) {
              setErr(res.error);
              sendBtn.disabled = false;
              return;
            }
            closeStatusModal();
            npcs.captain.bubble = when ? '📅 지시 예약 완료!' : '📣 지시 전달! 실행 시작!';
            npcs.captain.bubbleType = 'ok';
            setTimeout(() => {
              if (npcs.captain.bubble.includes('지시')) npcs.captain.bubble = '';
            }, 3500);
          } catch {
            setErr('대시보드 서버에 닿지 않았어요');
            sendBtn.disabled = false;
          }
        }
        sendBtn.addEventListener('click', doSend);
        ta.addEventListener('keydown', e => {
          if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
            e.preventDefault();
            doSend();
          }
        });
        ta.addEventListener('input', () => setErr(''));
        if (autoOrder) openCaptainOrderForm();
      }
    }

    function closeStatusModal() {
      selectedId = null;
      modalBack.hidden = true;
    }

    fsBtn.addEventListener('click', e => { e.stopPropagation(); toggleFullscreen(); });
    shell.querySelector('.og-fs-bar').addEventListener('click', e => {
      const act = e.target.closest('[data-og-act]')?.dataset.ogAct;
      if (act === 'order') openStatusModal('captain', true);
      else if (act === 'coffee') serveCoffeeToCaptain();
      else if (act === 'stroll') coffeeStroll();
      else if (act === 'exit') exitFullscreen();
    });
    modalBack.addEventListener('click', e => {
      if (e.target === modalBack || e.target.closest('[data-og-mclose]')) return closeStatusModal();
      if (e.target.closest('[data-og-morder]')) return openCaptainOrderForm();
      const chipBtn = e.target.closest('[data-og-chip]');
      if (chipBtn) {
        const ta = modalBody.querySelector('[data-og-ord-ta]');
        if (ta) {
          ta.value = ORDER_CHIPS[Number(chipBtn.dataset.ogChip)][1];
          ta.focus();
          const at = ta.value.indexOf('<');
          if (at >= 0) ta.setSelectionRange(at, ta.value.indexOf('>', at) + 1);
        }
        return;
      }
      if (e.target.closest('[data-og-mdetail]')) {
        const id = selectedId;
        closeStatusModal();
        if (isFs) exitFullscreen();
        if (id && opts.onOpenDetail) opts.onOpenDetail(id);
      }
    });

    canvas.addEventListener('click', e => {
      const rect = canvas.getBoundingClientRect();
      let px, py;
      if (shell.classList.contains('is-fs-rot') || shell.classList.contains('og-rot-stage')) {
        // 90° 시계방향 CSS 회전 상태의 터치 좌표 보정
        px = ((e.clientY - rect.top) / rect.height) * 100;
        py = (1 - (e.clientX - rect.left) / rect.width) * 100;
      } else {
        px = ((e.clientX - rect.left) / rect.width) * 100;
        py = ((e.clientY - rect.top) / rect.height) * 100;
      }
      let hit = null, best = 8.0;
      for (const n of Object.values(npcs)) {
        const d = Math.hypot(px - n.x, py - (n.y - 4));
        if (d < best) { best = d; hit = n.id; }
      }
      if (hit) {
        openStatusModal(hit);
        if (opts.onSelect) opts.onSelect(hit, npcs[hit], CHARS[hit]);
      }
    });

    return {
      syncReal,
      runDemo,
      stopDemo,
      coffeeStroll: () => coffeeStroll(),
      serveCoffeeToCaptain,
      captainWindowWalk,
      captainOuting,
      chiefAskCaptain,
      finderCheckGear,
      auditDiscuss,
      polisherTalkChief,
      sortingConveyor,
      sortingWaterPlants,
      staffingTidyCaptain,
      staffingSweepOffice,
      staffChat,
      toggleFullscreen,
      enterFullscreen,
      exitFullscreen,
      openStatusModal,
      closeStatusModal,
      destroy: () => { stopDemo(); exitFullscreen(); cancelAnimationFrame(rafId); },
      CHARS,
    };
  }

  window.OfficeGame = { create, CHARS };
})();
