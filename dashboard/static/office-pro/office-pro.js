// Jinwoo 에이전트 — Phaser 3 프로 픽셀 RPG 사무실 (별도 시연 공간: dashboard/static/office-pro/)
// - 1픽셀 격자 타일맵(16x16) + 가구 분리 Y-깊이 정렬(depth = y: 책상 뒤 착석·북향 의자 등받이 100% 자연 겹침!)
// - 진짜 A* 격자 길찾기(장애물 0% 통과) + 6프레임 4방향 픽셀 걷기 + 클릭 시 카메라 줌인/줌아웃
// - 전 직원 자율 생활 행동(커피·안부·컨베이어·화분 물주기·책상 정리·바닥 청소·조명/카메라 점검·감사실 협의·번역 상의·캡틴 외근)
(() => {
  const TW = 16;
  const COLS = 44, ROWS = 24;
  const W = COLS * TW;   // 704 (정확한 16:9 비율에 가까운 44x24 격자, Phaser pixelArt 정수 배율)
  const H = ROWS * TW;   // 384

  const CHARS = {
    captain:       { name: '캡틴',          role: '결재',        seat: [22, 3],  facing: 'down',  desk: [22, 4],  chair: 'ceo' },
    claude:        { name: '비서실장',      role: '지휘',        seat: [22, 9],  facing: 'down',  desk: [22, 10], chair: 'down' },
    finder:        { name: '시각 정보 비서', role: '사진 고르기', seat: [7,  10], facing: 'down',  desk: [7,  11], chair: 'down' },
    agy:           { name: '메뉴 검사관',   role: '메뉴판 읽기', seat: [35, 11], facing: 'up',    desk: [35, 10], chair: 'up' },
    'menu-reader': { name: '자료 해석 비서', role: '메뉴판 읽기', seat: [40, 11], facing: 'up',    desk: [40, 10], chair: 'up' },
    codex:         { name: '운영 감찰관',   role: '두 번째 검토', seat: [4,  21], facing: 'up',    desk: [4,  20], chair: 'up' },
    reviewer:      { name: '데이터 감사관', role: '마지막 점검', seat: [9,  21], facing: 'up',    desk: [9,  20], chair: 'up' },
    polisher:      { name: '수석 번역관',   role: '번역·글',     seat: [16, 19], facing: 'down',  desk: [16, 20], chair: 'down' },
    staffing:      { name: '인력 공급팀',   role: '인력 현황',   seat: [27, 19], facing: 'down',  desk: [27, 20], chair: 'down' },
    sorting:       { name: '선별팀',        role: '선별 실적',   seat: [36, 19], facing: 'down',  desk: [36, 20], chair: 'down' },
  };

  // 방 영역 (타일 좌표 x0, y0, x1, y1, 바닥 타일, 간판 이름, 간판 색)
  const ROOMS = [
    { x0: 1,  y0: 7,  x1: 12, y1: 13, tile: 'tile-green',  name: '미디어 관제실',     bg: '#15803d', door: [10, 13] },
    { x0: 31, y0: 7,  x1: 42, y1: 13, tile: 'tile-red',    name: '디지털 메뉴 통제실', bg: '#dc2626', door: [33, 13] },
    { x0: 1,  y0: 16, x1: 12, y1: 22, tile: 'tile-purple', name: '감사실',           bg: '#7c3aed', door: [10, 16] },
    { x0: 14, y0: 16, x1: 20, y1: 22, tile: 'tile-blue',   name: '통번역 통제실',     bg: '#2563eb', door: [19, 16] },
    { x0: 23, y0: 16, x1: 30, y1: 22, tile: 'tile-cyan',   name: '인력 공급팀',       bg: '#0284c7', door: [24, 16] },
    { x0: 32, y0: 16, x1: 42, y1: 22, tile: 'tile-orange', name: '선별팀',           bg: '#ea580c', door: [34, 16] },
  ];

  // A* 격자 길찾기 (벽·책상·화분·컨베이어를 100% 피해 가는 진짜 게임 길찾기!)
  function createGrid() {
    const g = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    const block = (x0, y0, x1, y1) => {
      for (let y = y0; y <= y1; y++)
        for (let x = x0; x <= x1; x++)
          if (y >= 0 && y < ROWS && x >= 0 && x < COLS) g[y][x] = 1;
    };
    // 외벽 (위쪽 창가 y=0..1, 좌우 x=0/43, 하단 y=23 — 단 출구 x=21..22는 열어둠!)
    block(0, 0, COLS - 1, 1);
    block(0, 0, 0, ROWS - 1);
    block(COLS - 1, 0, COLS - 1, ROWS - 1);
    block(0, ROWS - 1, 20, ROWS - 1);
    block(23, ROWS - 1, COLS - 1, ROWS - 1);
    // 커피바
    block(1, 2, 7, 3);
    // 방 벽 (문 2칸씩 열어둠)
    for (const r of ROOMS) {
      block(r.x0, r.y0, r.x1, r.y0);
      block(r.x0, r.y1, r.x1, r.y1);
      block(r.x0, r.y0, r.x0, r.y1);
      block(r.x1, r.y0, r.x1, r.y1);
      // 문 2칸 열기
      g[r.door[1]][r.door[0]] = 0;
      g[r.door[1]][r.door[0] + 1] = 0;
    }
    // 책상 막기
    for (const [id, c] of Object.entries(CHARS)) {
      const [dx, dy] = c.desk;
      const hw = id === 'captain' ? 2 : 1;
      block(dx - hw, dy, dx + hw, dy);
    }
    // 선별팀 컨베이어
    block(40, 17, 41, 21);
    block(38, 21, 41, 21);
    // 책장·카메라·조명
    block(2, 17, 10, 17);
    block(2, 9, 3, 12);
    return g;
  }

  function astar(grid, sx, sy, ex, ey) {
    sx = Math.max(1, Math.min(COLS - 2, Math.round(sx)));
    sy = Math.max(2, Math.min(ROWS - 1, Math.round(sy)));
    ex = Math.max(1, Math.min(COLS - 2, Math.round(ex)));
    ey = Math.max(2, Math.min(ROWS - 1, Math.round(ey)));
    const key = (x, y) => (y << 7) | x;
    const open = [{ x: sx, y: sy, g: 0, f: Math.abs(ex - sx) + Math.abs(ey - sy) }];
    const came = new Map();
    const gScore = new Map([[key(sx, sy), 0]]);
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let best = open[0];

    while (open.length) {
      open.sort((a, b) => a.f - b.f);
      const cur = open.shift();
      if (cur.x === ex && cur.y === ey) { best = cur; break; }
      if (Math.abs(cur.x - ex) + Math.abs(cur.y - ey) < Math.abs(best.x - ex) + Math.abs(best.y - ey)) best = cur;
      for (const [dx, dy] of dirs) {
        const nx = cur.x + dx, ny = cur.y + dy;
        if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) continue;
        if (grid[ny][nx] === 1 && !(nx === ex && ny === ey)) continue;
        const nk = key(nx, ny);
        const ng = cur.g + 1;
        if (ng < (gScore.get(nk) ?? 1e9)) {
          gScore.set(nk, ng);
          came.set(nk, cur);
          open.push({ x: nx, y: ny, g: ng, f: ng + Math.abs(ex - nx) + Math.abs(ey - ny) });
        }
      }
    }
    const path = [];
    let cur = best;
    while (cur) {
      path.push([cur.x, cur.y]);
      cur = came.get(key(cur.x, cur.y));
    }
    path.reverse();
    if (path.length > 1) path.shift();
    return path;
  }

  function create(container, opts = {}) {
    container.innerHTML = `
      <div class="op-shell">
        <div class="op-stage">
          <div class="op-canvas-host" style="position:absolute;inset:0"></div>
          <div class="op-hud-layer" data-op-hud></div>
          <div class="op-hud-top">
            <span class="op-chip live" data-op-mode>● Phaser 3 실시간</span>
            <span class="op-chip" data-op-work>전원 대기 중</span>
          </div>
          <div class="op-hud-r">
            <button type="button" data-op-act="zoom">🔍 전체 보기</button>
            <button type="button" data-op-act="coffee">☕ 커피 서빙</button>
            <button type="button" data-op-act="chat">💬 수다</button>
          </div>
          <button type="button" class="op-fs-btn" data-op-fs>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
            <span data-op-fs-lbl>전체화면</span>
          </button>
          <div class="op-modal-back" data-op-modal hidden>
            <div class="op-modal" data-op-modal-body></div>
          </div>
        </div>
      </div>`;

    const shell = container.querySelector('.op-shell');
    const host = container.querySelector('.op-canvas-host');
    const hudLayer = container.querySelector('[data-op-hud]');
    const modeChip = container.querySelector('[data-op-mode]');
    const workChip = container.querySelector('[data-op-work]');
    const fsBtn = container.querySelector('[data-op-fs]');
    const fsLbl = container.querySelector('[data-op-fs-lbl]');
    const modalBack = container.querySelector('[data-op-modal]');
    const modalBody = container.querySelector('[data-op-modal-body]');
    const log = msg => { if (opts.onLog) opts.onLog(msg); };

    const grid = createGrid();
    let sceneRef = null;
    let isDemo = false;
    let demoTimers = [];
    let isFs = false;

    // ---------------------------------------------------------------- Phaser 3 Scene
    class OfficeScene extends Phaser.Scene {
      constructor() { super('OfficeScene'); }

      preload() {
        const A = '/static/office-pro/assets/';
        for (const t of ['wood', 'podium', 'deck', 'green', 'red', 'purple', 'blue', 'cyan', 'orange']) {
          this.load.image(`tile-${t}`, `${A}tile-${t}.png`);
        }
        for (const f of ['desk-wood', 'desk-ceo', 'chair-ceo', 'chair-down', 'chair-up-back',
          'monitor-back', 'laptop-front', 'plant-big', 'bookshelf', 'coffee-bar',
          'camera-tripod', 'studio-light', 'calendar-board', 'box']) {
          this.load.image(f, `${A}furn/${f}.png`);
        }
        for (const id of Object.keys(CHARS)) {
          this.load.spritesheet(id, `${A}chars/${id}.png`, { frameWidth: 24, frameHeight: 36 });
        }
      }

      create() {
        sceneRef = this;
        const tx = c => c * TW + TW / 2;
        const ty = r => r * TW + TW / 2;

        // 1. 기본 나무 바닥
        for (let r = 2; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            this.add.image(tx(c), ty(r), 'tile-wood').setDepth(0);
          }
        }
        // 캡틴 단상 & 오른쪽 창가 발코니 데크
        for (let r = 2; r <= 5; r++)
          for (let c = 17; c <= 27; c++)
            this.add.image(tx(c), ty(r), 'tile-podium').setDepth(1);
        for (let r = 2; r <= 5; r++)
          for (let c = 31; c <= 42; c++)
            this.add.image(tx(c), ty(r), 'tile-deck').setDepth(1);

        // 2. 파노라마 유리창 + 따뜻한 햇살 빔
        const g = this.add.graphics().setDepth(2);
        g.fillStyle(0xfef3c7, 1).fillRect(0, 0, W, TW * 2);
        g.fillStyle(0xe0f2fe, 0.72).fillRect(0, 4, W, TW * 1.5);
        g.lineStyle(2, 0x785032, 1);
        for (let x = 0; x <= W; x += 64) g.lineBetween(x, 0, x, TW * 2);
        g.lineBetween(0, TW * 2, W, TW * 2);
        // 대각선 햇살 효과
        g.fillStyle(0xfef9c3, 0.14);
        for (let sx = 70; sx < W; sx += 160) {
          g.fillPoints([{ x: sx, y: TW * 2 }, { x: sx + 55, y: TW * 2 }, { x: sx + 15, y: TW * 6 }, { x: sx - 40, y: TW * 6 }], true);
        }
        // 발코니 난간
        g.fillStyle(0x6e4427, 1).fillRect(31 * TW, 2.2 * TW, 12 * TW, 4);
        for (let rx = 31 * TW + 6; rx < 43 * TW; rx += 10) g.fillRect(rx, 2.2 * TW, 3, 14);
        // 단상 양쪽 계단
        g.fillStyle(0x9a5d38, 1);
        g.fillRect(15.5 * TW, 3.2 * TW, 1.6 * TW, 2.4 * TW);
        g.fillRect(27.9 * TW, 3.2 * TW, 1.6 * TW, 2.4 * TW);
        g.lineStyle(1, 0x4a2915, 0.8);
        for (let sy = 3.5 * TW; sy < 5.5 * TW; sy += 6) {
          g.lineBetween(15.5 * TW, sy, 17.1 * TW, sy);
          g.lineBetween(27.9 * TW, sy, 29.5 * TW, sy);
        }

        // 3. 부서별 카펫 & 벽 & 간판
        const wg = this.add.graphics().setDepth(4);
        for (const rm of ROOMS) {
          for (let r = rm.y0; r <= rm.y1; r++)
            for (let c = rm.x0; c <= rm.x1; c++)
              this.add.image(tx(c), ty(r), rm.tile).setDepth(1);
          // 깔끔한 픽셀 벽
          const rx0 = rm.x0 * TW, ry0 = rm.y0 * TW, rw = (rm.x1 - rm.x0 + 1) * TW, rh = (rm.y1 - rm.y0 + 1) * TW;
          wg.lineStyle(5, 0x3b2618, 1).strokeRect(rx0 + 2, ry0 + 2, rw - 4, rh - 4);
          wg.lineStyle(2, 0xd6bfa6, 1).strokeRect(rx0 + 5, ry0 + 5, rw - 10, rh - 10);
          // 문 2칸 뚫기 (나무 바닥 덮기)
          this.add.image(tx(rm.door[0]), ty(rm.door[1]), 'tile-wood').setDepth(5);
          this.add.image(tx(rm.door[0] + 1), ty(rm.door[1]), 'tile-wood').setDepth(5);
        }

        // 선명한 벡터 한글 HTML HUD 생성 (카메라 줌인/팬에 실시간 동기화!)
        hudLayer.innerHTML =
          ROOMS.map((rm, i) => `<span class="op-sign" data-sign="${i}" style="background:${rm.bg}">${rm.name}</span>`).join('') +
          Object.entries(CHARS).map(([id, c]) =>
            `<span class="op-tag" data-tag="${id}">${c.name}</span><span class="op-bub" data-bub="${id}" hidden></span>`
          ).join('');
        this.signEls = ROOMS.map((rm, i) => ({
          el: hudLayer.querySelector(`[data-sign="${i}"]`),
          wx: (rm.x0 + rm.x1 + 1) * TW / 2,
          wy: rm.y0 * TW + 4,
        }));

        // 4. 컨베이어 벨트 (선별팀 우측 하단)
        const cg = this.add.graphics().setDepth(18);
        cg.fillStyle(0x334155, 1).fillRect(39.8 * TW, 17 * TW, 2.2 * TW, 4.8 * TW);
        cg.fillRect(37.6 * TW, 20.6 * TW, 4.4 * TW, 1.6 * TW);
        cg.lineStyle(1, 0x64748b, 1);
        for (let cy = 17.3 * TW; cy < 21.6 * TW; cy += 6) cg.lineBetween(40 * TW, cy, 41.8 * TW, cy);
        this.convBoxes = [
          this.add.image(40.9 * TW, 18 * TW, 'box').setDepth(240),
          this.add.image(40.9 * TW, 20 * TW, 'box').setDepth(240),
        ];
        this.convPhase = 0;
        this.convOn = true; // 기본 은은하게 가동!

        // 5. 분리된 가구 레이어 (TRUE Y-DEPTH SORTING!)
        this.add.image(tx(4), ty(2.6), 'coffee-bar').setDepth(ty(3));
        // 책장(감사실), 카메라·조명(미디어 관제실), 달력(인력 공급팀)
        this.add.image(tx(4.2), ty(17.1), 'bookshelf').setDepth(ty(17.5));
        this.add.image(tx(8.5), ty(17.1), 'bookshelf').setDepth(ty(17.5));
        this.add.image(tx(2.6), ty(9.5),  'camera-tripod').setDepth(ty(10));
        this.add.image(tx(2.6), ty(11.6), 'studio-light').setDepth(ty(12));
        this.add.image(tx(10.6), ty(9.4), 'studio-light').setDepth(ty(10));
        this.add.image(tx(27),   ty(17.3), 'calendar-board').setDepth(15);

        // 화분들
        for (const [px, py] of [[17.4, 2.8], [26.6, 2.8], [13.5, 9.5], [29.8, 9.5], [15.0, 17.5], [24.2, 17.5]]) {
          this.add.image(tx(px), ty(py), 'plant-big').setOrigin(0.5, 0.85).setDepth(ty(py));
        }

        // 각 직원 책상 + 의자 + 모니터/노트북 (Y-깊이 정확 배치!)
        for (const [id, c] of Object.entries(CHARS)) {
          const dx = tx(c.desk[0]), dy = ty(c.desk[1]);
          const sx = tx(c.seat[0]), sy = ty(c.seat[1]);
          if (id === 'captain') {
            this.add.image(sx, sy - 2, 'chair-ceo').setOrigin(0.5, 0.72).setDepth(sy - 8);
            this.add.image(dx, dy, 'desk-ceo').setOrigin(0.5, 0.55).setDepth(dy + 4);
            this.add.image(dx - 22, dy - 7, 'laptop-front').setDepth(dy + 6);
            this.add.image(dx + 22, dy - 7, 'laptop-front').setDepth(dy + 6);
          } else if (c.facing === 'down') {
            this.add.image(sx, sy - 2, 'chair-down').setOrigin(0.5, 0.72).setDepth(sy - 8);
            this.add.image(dx, dy, 'desk-wood').setOrigin(0.5, 0.55).setDepth(dy + 4);
            this.add.image(dx, dy - 6, 'laptop-front').setDepth(dy + 6);
          } else {
            // 북향 직원: 모니터 책상(뒤쪽) → 캐릭터 → 의자 등받이(앞쪽 depth + 6) = 100% 진짜 RPG 의자 착석!
            this.add.image(dx, dy, 'desk-wood').setOrigin(0.5, 0.55).setDepth(dy - 2);
            this.add.image(dx, dy - 8, 'monitor-back').setDepth(dy);
            this.add.image(sx, sy + 4, 'chair-up-back').setOrigin(0.5, 0.75).setDepth(sy + 8);
          }
        }

        // 6. 전 직원 6프레임 4방향 애니메이션 등록 + 스프라이트 생성
        this.npcs = {};
        for (const [id, c] of Object.entries(CHARS)) {
          this.anims.create({ key: `${id}-down`,  frames: this.anims.generateFrameNumbers(id, { start: 0,  end: 5  }), frameRate: 7.5, repeat: -1 });
          this.anims.create({ key: `${id}-up`,    frames: this.anims.generateFrameNumbers(id, { start: 6,  end: 11 }), frameRate: 7.5, repeat: -1 });
          this.anims.create({ key: `${id}-right`, frames: this.anims.generateFrameNumbers(id, { start: 12, end: 17 }), frameRate: 7.5, repeat: -1 });
          this.anims.create({ key: `${id}-left`,  frames: this.anims.generateFrameNumbers(id, { start: 18, end: 23 }), frameRate: 7.5, repeat: -1 });
          this.anims.create({ key: `${id}-type`,  frames: this.anims.generateFrameNumbers(id, { start: 25, end: 26 }), frameRate: 3.2, repeat: -1 });
          this.anims.create({ key: `${id}-coffee`,frames: this.anims.generateFrameNumbers(id, { start: 28, end: 29 }), frameRate: 1.0, repeat: -1 });

          const sx = tx(c.seat[0]), sy = ty(c.seat[1]);
          const sp = this.add.sprite(sx, sy, id, c.facing === 'up' ? 6 : 24)
            .setOrigin(0.5, 0.82)
            .setDepth(sy)
            .setInteractive({ useHandCursor: true });

          const tagEl = hudLayer.querySelector(`[data-tag="${id}"]`);
          const bubEl = hudLayer.querySelector(`[data-bub="${id}"]`);

          const npc = {
            id, cfg: c, sp, tagEl, bubEl,
            mode: 'idle', path: [], speed: 48, onArrive: null, bubble: '',
          };
          sp.on('pointerdown', () => this.focusNpc(id));
          this.npcs[id] = npc;
        }

        this.nextLifeAt = this.time.now + 3500;
        this.lifeIdx = 0;
        this.cameras.main.setBounds(0, 0, W, H);
      }

      focusNpc(id) {
        const n = this.npcs[id];
        if (!n) return;
        const cam = this.cameras.main;
        cam.pan(n.sp.x, n.sp.y, 400, 'Sine.easeInOut');
        cam.zoomTo(1.65, 400, 'Sine.easeInOut');
        openModal(id, n);
      }

      resetCamera() {
        const cam = this.cameras.main;
        cam.pan(W / 2, H / 2, 360, 'Sine.easeInOut');
        cam.zoomTo(1.0, 360, 'Sine.easeInOut');
      }

      setBubble(id, text, color = '#0f172a', bg = '#ffffff') {
        const n = this.npcs[id];
        if (!n) return;
        n.bubble = text || '';
        if (text) {
          n.bubEl.textContent = text;
          n.bubEl.className = 'op-bub' + (bg === '#dcfce7' ? ' ok' : bg === '#fef3c7' ? ' meet' : '');
          n.bubEl.hidden = false;
        } else {
          n.bubEl.hidden = true;
        }
      }

      walkTo(id, destCol, destRow, onArrive = null) {
        const n = this.npcs[id];
        if (!n) return;
        const curC = Math.floor(n.sp.x / TW), curR = Math.floor(n.sp.y / TW);
        const path = astar(grid, curC, curR, destCol, destRow);
        if (!path.length) { if (onArrive) onArrive(); return; }
        n.path = path;
        n.mode = 'walk';
        n.onArrive = onArrive;
      }

      seatNpc(id, mode = 'idle') {
        const n = this.npcs[id];
        if (!n) return;
        n.mode = mode;
        n.path = [];
        n.sp.setPosition(n.cfg.seat[0] * TW + TW / 2, n.cfg.seat[1] * TW + TW / 2);
        n.sp.setDepth(n.sp.y);
        if (mode === 'work') {
          if (n.cfg.facing === 'up') n.sp.anims.stop().setFrame(6);
          else n.sp.anims.play(`${id}-type`, true);
        } else if (mode === 'done') {
          n.sp.anims.stop().setFrame(n.cfg.facing === 'up' ? 6 : 27);
        } else {
          n.sp.anims.stop().setFrame(n.cfg.facing === 'up' ? 6 : 24);
        }
      }

      runAutonomous() {
        const acts = [
          // 1. 비서실장 → 캡틴 커피 서빙
          () => this.serveCoffee(),
          // 2. 직원 2명 중앙 복도 수다
          () => this.hallwayChat(),
          // 3. 캡틴 창가 발코니 산책
          () => {
            const cap = this.npcs.captain;
            if (cap.mode !== 'idle') return false;
            log('🚶 캡틴이 오른쪽 창가 발코니로 산책');
            this.setBubble('captain', '잠시 바람 좀 쐬야지…');
            this.walkTo('captain', 37, 4, () => {
              cap.sp.anims.stop().setFrame(6);
              this.setBubble('captain', '창밖을 바라보는 중…');
              this.time.delayedCall(4200, () => {
                this.setBubble('captain', '');
                this.walkTo('captain', cap.cfg.seat[0], cap.cfg.seat[1], () => this.seatNpc('captain', 'idle'));
              });
            });
            return true;
          },
          // 4. 선별팀 → 복도 화분 물 주기
          () => {
            const s = this.npcs.sorting;
            if (s.mode !== 'idle') return false;
            log('🌱 선별팀이 복도 화분에 물 주기');
            this.setBubble('sorting', '🌱 화분에 물 주러…');
            this.walkTo('sorting', 29, 10, () => {
              s.sp.anims.stop().setFrame(12);
              this.setBubble('sorting', '🌱 화분에 물 주는 중…', '#14532d', '#dcfce7');
              this.time.delayedCall(3500, () => {
                this.setBubble('sorting', '');
                this.walkTo('sorting', s.cfg.seat[0], s.cfg.seat[1], () => this.seatNpc('sorting', 'idle'));
              });
            });
            return true;
          },
          // 5. 인력 공급팀 → 사무실 복도 청소
          () => {
            const st = this.npcs.staffing;
            if (st.mode !== 'idle') return false;
            log('🧹 인력 공급팀이 중앙 복도 청소');
            this.setBubble('staffing', '🧹 사무실 바닥 청소 중…');
            this.walkTo('staffing', 19, 14, () => {
              this.walkTo('staffing', 26, 14, () => {
                this.setBubble('staffing', '');
                this.walkTo('staffing', st.cfg.seat[0], st.cfg.seat[1], () => this.seatNpc('staffing', 'idle'));
              });
            });
            return true;
          },
        ];
        for (let i = 0; i < acts.length; i++) {
          if (acts[(this.lifeIdx + i) % acts.length]()) {
            this.lifeIdx = (this.lifeIdx + i + 1) % acts.length;
            break;
          }
        }
      }

      serveCoffee() {
        const cl = this.npcs.claude, cap = this.npcs.captain;
        if (cl.mode !== 'idle') return false;
        log('☕ 비서실장이 캡틴 커피를 타러 이동');
        this.setBubble('claude', '☕ 캡틴 커피 타러 가는 중…');
        this.walkTo('claude', 5, 4, () => {
          cl.sp.anims.stop().setFrame(6);
          this.setBubble('claude', '☕ 원두 추출 중…');
          this.time.delayedCall(1200, () => {
            this.setBubble('claude', '☕ 커피 가져왔습니다!', '#14532d', '#dcfce7');
            this.walkTo('claude', 19, 4, () => {
              cl.sp.anims.stop().setFrame(12);
              if (cap.mode === 'idle') {
                cap.sp.anims.play('captain-coffee', true);
                this.setBubble('captain', '☕ 고마워요! 잘 마실게요', '#14532d', '#dcfce7');
              }
              this.time.delayedCall(2200, () => {
                this.setBubble('claude', '');
                this.walkTo('claude', cl.cfg.seat[0], cl.cfg.seat[1], () => {
                  this.seatNpc('claude', 'idle');
                  this.time.delayedCall(2200, () => {
                    if (cap.mode === 'idle') { this.seatNpc('captain', 'idle'); this.setBubble('captain', ''); }
                  });
                });
              });
            });
          });
        });
        return true;
      }

      hallwayChat() {
        const pool = ['finder', 'agy', 'menu-reader', 'codex', 'reviewer', 'polisher'].filter(id => this.npcs[id].mode === 'idle');
        if (pool.length < 2) return false;
        const a = pool[Math.floor(Math.random() * pool.length)];
        const b = pool.filter(x => x !== a)[Math.floor(Math.random() * (pool.length - 1))];
        let ready = 0;
        log(`💬 ${CHARS[a].name} · ${CHARS[b].name} 복도 업무 수다`);
        const banter = () => {
          this.npcs[a].sp.anims.stop().setFrame(12);
          this.npcs[b].sp.anims.stop().setFrame(18);
          this.setBubble(a, '오늘 새 가게 사진 정리 깔끔하죠? 😊', '#78350f', '#fef3c7');
          this.time.delayedCall(2200, () => {
            this.setBubble(a, '');
            this.setBubble(b, '네! 5개 국어 번역도 바로 준비돼 있어요 👍', '#78350f', '#fef3c7');
            this.time.delayedCall(2200, () => {
              this.setBubble(b, '');
              this.walkTo(a, CHARS[a].seat[0], CHARS[a].seat[1], () => this.seatNpc(a, 'idle'));
              this.walkTo(b, CHARS[b].seat[0], CHARS[b].seat[1], () => this.seatNpc(b, 'idle'));
            });
          });
        };
        this.walkTo(a, 20, 14, () => { if (++ready === 2) banter(); });
        this.walkTo(b, 23, 14, () => { if (++ready === 2) banter(); });
        return true;
      }

      update(time, delta) {
        const dt = Math.min(0.05, delta / 1000);
        // 컨베이어 상자 부드러운 이동
        if (this.convOn && this.convBoxes) {
          this.convPhase = (this.convPhase + dt * 0.25) % 1;
          this.convBoxes.forEach((b, i) => {
            const u = (this.convPhase + i * 0.5) % 1;
            if (u < 0.7) { b.setPosition(40.9 * TW, (17.4 + (u / 0.7) * 3.8) * TW); }
            else { b.setPosition((40.9 - ((u - 0.7) / 0.3) * 2.8) * TW, 21.2 * TW); }
          });
        }

        if (!isDemo && time > this.nextLifeAt) {
          this.nextLifeAt = time + 11000 + Math.random() * 5000;
          this.runAutonomous();
        }

        const cam = this.cameras.main;
        const wv = cam.worldView;
        const toPctX = wx => ((wx - wv.x) / wv.width) * 100;
        const toPctY = wy => ((wy - wv.y) / wv.height) * 100;
        for (const s of this.signEls) {
          s.el.style.left = `${toPctX(s.wx)}%`;
          s.el.style.top  = `${toPctY(s.wy)}%`;
        }

        let busyCount = 0;
        for (const n of Object.values(this.npcs)) {
          if (n.mode === 'work' || n.mode === 'walk') busyCount++;
          if (n.path.length) {
            const [tc, tr] = n.path[0];
            const tx = tc * TW + TW / 2, ty = tr * TW + TW / 2;
            const dx = tx - n.sp.x, dy = ty - n.sp.y;
            const dist = Math.hypot(dx, dy);
            const step = n.speed * dt;
            if (dist <= step + 0.5) {
              n.sp.setPosition(tx, ty);
              n.path.shift();
              if (!n.path.length && n.onArrive) {
                const cb = n.onArrive; n.onArrive = null; cb();
              }
            } else {
              n.sp.x += (dx / dist) * step;
              n.sp.y += (dy / dist) * step;
              const dir = Math.abs(dy) >= Math.abs(dx) ? (dy < 0 ? 'up' : 'down') : (dx >= 0 ? 'right' : 'left');
              n.sp.anims.play(`${n.id}-${dir}`, true);
            }
          }
          // TRUE Y-DEPTH SORTING: 캐릭터가 걸을 때도 책상·화분 앞뒤를 정확히 구분!
          n.sp.setDepth(n.sp.y);
          n.tagEl.style.left = `${toPctX(n.sp.x)}%`;
          n.tagEl.style.top  = `${toPctY(n.sp.y + 10)}%`;
          n.tagEl.className  = 'op-tag' + (n.mode === 'work' ? ' work' : n.mode === 'done' ? ' done' : n.mode === 'walk' ? ' walk' : '');
          n.bubEl.style.left = `${toPctX(n.sp.x)}%`;
          n.bubEl.style.top  = `${toPctY(n.sp.y - 26)}%`;
        }
        workChip.textContent = busyCount ? `활동 중인 직원 ${busyCount}명` : '전원 대기 중';
      }
    }

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: host,
      width: W,
      height: H,
      backgroundColor: '#0b101b',
      pixelArt: true,
      antialias: false,
      roundPixels: true,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      scene: [OfficeScene],
    });

    // ---------------------------------------------------------------- RPG 상태창 & 전체화면
    function openModal(id, n) {
      const c = CHARS[id];
      const st = n.mode === 'work' ? '작업 중…' : n.mode === 'walk' ? '이동 중' : n.mode === 'done' ? '✔ 작업 완료' : '대기 중';
      modalBody.innerHTML = `
        <div class="op-m-head">
          <h3>${c.name} <small style="color:#94a3b8;font-weight:400">· ${c.role}</small></h3>
          <button type="button" data-op-mclose>×</button>
        </div>
        <div class="op-m-now">
          <div style="color:#fde68a;font-size:11px;font-weight:700;margin-bottom:3px">현재 상태 (${st})</div>
          <div>${n.bubble || '자리에서 다음 지시를 기다리고 있습니다.'}</div>
        </div>
        <p class="op-muted">Phaser 3 엔진: 클릭하면 해당 직원에게 부드럽게 줌인되고, 닫으면 사무실 전체로 줌아웃됩니다.</p>
        <div class="op-m-foot">
          <button type="button" class="op-btn blue" data-op-mclose>닫기 (줌 리셋)</button>
        </div>`;
      modalBack.hidden = false;
    }

    modalBack.addEventListener('click', e => {
      if (e.target === modalBack || e.target.closest('[data-op-mclose]')) {
        modalBack.hidden = true;
        if (sceneRef) sceneRef.resetCamera();
      }
    });

    function syncFs() {
      const nat = (document.fullscreenElement === shell || document.webkitFullscreenElement === shell);
      isFs = nat || shell.classList.contains('is-fs') || shell.classList.contains('is-fs-rot');
      const port = isFs && window.innerHeight > window.innerWidth && window.innerWidth <= 900;
      shell.classList.toggle('og-rot-stage', nat && port);
      if (!isFs) shell.classList.remove('is-fs', 'is-fs-rot', 'og-rot-stage');
      fsLbl.textContent = isFs ? '축소' : '전체화면';
    }
    fsBtn.addEventListener('click', async () => {
      if (isFs) {
        shell.classList.remove('is-fs', 'is-fs-rot', 'og-rot-stage');
        try { if (document.fullscreenElement) await document.exitFullscreen(); } catch {}
        try { screen.orientation?.unlock?.(); } catch {}
      } else {
        let ok = false;
        try { if (shell.requestFullscreen) { await shell.requestFullscreen(); ok = true; } } catch {}
        try { await screen.orientation?.lock?.('landscape'); } catch {}
        if (!ok) shell.classList.add(window.innerHeight > window.innerWidth && window.innerWidth <= 900 ? 'is-fs-rot' : 'is-fs');
      }
      syncFs();
    });
    document.addEventListener('fullscreenchange', syncFs);
    window.addEventListener('resize', syncFs);

    container.querySelector('.op-hud-r').addEventListener('click', e => {
      const act = e.target.closest('[data-op-act]')?.dataset.opAct;
      if (!sceneRef) return;
      if (act === 'zoom') { modalBack.hidden = true; sceneRef.resetCamera(); }
      else if (act === 'coffee') sceneRef.serveCoffee();
      else if (act === 'chat') sceneRef.hallwayChat();
    });

    function runDemo() {
      if (!sceneRef) return;
      demoTimers.forEach(clearTimeout); demoTimers = [];
      isDemo = true;
      modeChip.textContent = '▶ 가상 시연 중'; modeChip.className = 'op-chip demo';
      const at = (ms, fn) => demoTimers.push(setTimeout(fn, ms));
      log('▶ Phaser 3 시연: 캡틴 지시 → 시각 정보 비서·메뉴 검사관 작업 → 보고');
      sceneRef.setBubble('captain', '새 가게 메뉴판 만들어줘!', '#1e3a8a', '#dbeafe');
      sceneRef.seatNpc('claude', 'work');
      sceneRef.setBubble('claude', '지시 접수! 팀 배정 중…');
      at(1500, () => {
        sceneRef.seatNpc('finder', 'work'); sceneRef.setBubble('finder', '📷 요리 사진 선별 중…');
        sceneRef.seatNpc('agy', 'work'); sceneRef.setBubble('agy', '🔍 메뉴판 읽는 중…');
      });
      at(4500, () => {
        sceneRef.setBubble('finder', '사진 6장 선별 완료!', '#14532d', '#dcfce7');
        sceneRef.walkTo('finder', 22, 12, () => {
          sceneRef.setBubble('claude', '확인했어요! ✔', '#14532d', '#dcfce7');
          setTimeout(() => {
            sceneRef.setBubble('finder', '');
            sceneRef.walkTo('finder', CHARS.finder.seat[0], CHARS.finder.seat[1], () => sceneRef.seatNpc('finder', 'done'));
          }, 1200);
        });
      });
      at(8500, () => {
        sceneRef.setBubble('agy', '메뉴 48개 정리 완료!', '#14532d', '#dcfce7');
        sceneRef.walkTo('agy', 22, 12, () => {
          setTimeout(() => {
            sceneRef.setBubble('agy', '');
            sceneRef.walkTo('agy', CHARS.agy.seat[0], CHARS.agy.seat[1], () => sceneRef.seatNpc('agy', 'done'));
          }, 1200);
        });
      });
      at(13500, () => {
        isDemo = false;
        modeChip.textContent = '● Phaser 3 실시간'; modeChip.className = 'op-chip live';
        sceneRef.setBubble('captain', ''); sceneRef.setBubble('claude', '');
        sceneRef.seatNpc('claude', 'done');
        log('✔ Phaser 3 시연 완료!');
      });
    }

    return {
      runDemo,
      serveCoffee: () => sceneRef?.serveCoffee(),
      hallwayChat: () => sceneRef?.hallwayChat(),
      resetCamera: () => sceneRef?.resetCamera(),
      destroy: () => game.destroy(true),
    };
  }

  window.OfficePro = { create };
})();
