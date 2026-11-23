// Jinwoo 에이전트 — 12프레임 고화질 웹툰/애니 사무실 (4명 선행 시연: 캡틴·비서실장·시각 정보 비서·메뉴 검사관)
(() => {
  const W = 2560, H = 1440; // 16:9 QHD 2K 고화질 (전체화면 선명도 보장)

  // bg-office.webp (cutaway 2560x1440) 픽셀 실측 착석 좌표 (headTopY=머리 꼭대기, clipY=책상 상단 경계선)
  const CHARS = {
    captain: { name: '캡틴',          role: '결재',        home: [50.0, 18.5], facing: 'front', scale: 1.0,  seat: { x: 50.0, headTopY: 6.4,  clipY: 13.0, h: 240 } },
    claude:  { name: '비서실장',      role: '지휘',        home: [50.0, 39.0], facing: 'front', scale: 0.96, seat: { x: 50.0, headTopY: 27.6, clipY: 33.4, h: 225 } },
    finder:  { name: '시각 정보 비서', role: '사진 고르기', home: [14.8, 45.0], facing: 'front', scale: 0.94, seat: { x: 14.8, headTopY: 33.2, clipY: 39.2, h: 225 } },
    agy:     { name: '메뉴 검사관',   role: '메뉴판 읽기', home: [82.4, 49.0], facing: 'back',  scale: 0.96, seat: { x: 82.4, headTopY: 35.8, clipY: 46.2, h: 220 } },
  };

  // Y-깊이(앞/뒤 가림) 전경 가구 목록: 캐릭터의 발 위치(y)가 sortY보다 위(뒤)면 가구가 캐릭터 다리를 가리고, 아래(앞)면 캐릭터가 가구 앞에 서게 됨!
  const PROPS = [
    { key: 'captain-desk', x0: 42.6, y0: 12.8, x1: 58.0, y1: 22.8, sortY: 22.4 },
    { key: 'claude-desk',  x0: 42.8, y0: 33.2, x1: 57.5, y1: 43.8, sortY: 43.4 },
    { key: 'finder-desk',  x0:  9.2, y0: 39.0, x1: 19.6, y1: 47.6, sortY: 47.2 },
    { key: 'agy-chair',    x0: 80.5, y0: 40.5, x1: 84.3, y1: 50.2, sortY: 49.5 },
  ];

  const SIGNS = [
    { text: '미디어 관제실',     x: 14.8, y: 25.8, bg: '#15803d' },
    { text: '디지털 메뉴 통제실', x: 85.2, y: 25.8, bg: '#dc2626' },
    { text: '감사실',           x: 13.0, y: 53.5, bg: '#7c3aed' },
    { text: '통번역 통제실',     x: 36.2, y: 53.5, bg: '#2563eb' },
    { text: '인력 공급팀',       x: 63.8, y: 53.5, bg: '#0284c7' },
    { text: '선별팀',           x: 88.2, y: 53.5, bg: '#ea580c' },
  ];

  // 벽·책상·화분 0% 통과 동선
  const ROUTES = {
    capToWindow:  [[50.0, 18.5], [58.0, 18.5], [64.0, 21.5], [70.0, 22.5], [82.0, 22.5]],
    capToDesk:    [[82.0, 22.5], [70.0, 22.5], [64.0, 21.5], [58.0, 18.5], [50.0, 18.5]],
    chiefToCof:   [[50.0, 35.5], [34.5, 35.5], [34.5, 22.5], [15.5, 22.5]],
    cofToCap:     [[15.5, 22.5], [34.5, 22.5], [34.5, 20.5], [39.5, 20.5]],
    capToChief:   [[39.5, 20.5], [34.5, 20.5], [34.5, 35.5], [50.0, 35.5], [50.0, 39.0]],
    finderToHall: [[14.8, 41.0], [20.6, 41.0], [20.6, 49.5], [46.5, 49.5]],
    agyToHall:    [[82.4, 51.0], [74.5, 51.0], [53.5, 50.0]],
  };

  function loadAll() {
    const imgs = { walk: {}, masks: {} };
    const load = (obj, k, url) => new Promise(res => {
      const im = new Image();
      im.onload = () => { obj[k] = im; res(); };
      im.onerror = () => res();
      im.src = url;
    });
    const jobs = [load(imgs, 'bg', '/static/office-anime/assets/bg-office.webp?v=cutaway1')];
    for (const [id, cfg] of Object.entries(CHARS)) {
      imgs.walk[id] = { east: [], front: [], back: [], greet: [], coffee: [] };
      const dirs = id === 'captain' ? ['east', 'front', 'back', 'greet', 'coffee'] : ['east', 'front', 'back'];
      for (const dir of dirs) {
        for (let i = 1; i <= 12; i++) {
          const v = id === 'captain' ? 'cap4act' : 'orig2k';
          jobs.push(load(imgs.walk[id][dir], i - 1, `/static/office-anime/assets/walk/${id}-${dir}-${i}.webp?v=${v}`));
        }
      }
    }
    for (const p of PROPS) {
      jobs.push(load(imgs.masks, p.key, `/static/office-anime/assets/masks/${p.key}.webp?v=ysort1`));
    }
    return Promise.all(jobs).then(() => imgs);
  }

  function create(root, opts = {}) {
    root.innerHTML = `
      <div class="oa-stage">
        <canvas class="oa-canvas" width="${W}" height="${H}"></canvas>
        <div class="oa-hud"></div>
        <div class="oa-ctrl-hint">🎮 캡틴 조작: 방향키 / WASD 이동 · 바닥 클릭 · 1 인사 · 2 커피 · E 자리 복귀</div>
        <button type="button" class="oa-fs-btn" title="전체화면 전환">⛶ 전체화면</button>
        <div class="oa-modal-back" hidden><div class="oa-modal"></div></div>
      </div>`;
    const stage = root.querySelector('.oa-stage');
    const canvas = root.querySelector('.oa-canvas');
    const hud = root.querySelector('.oa-hud');
    const fsBtn = root.querySelector('.oa-fs-btn');
    const modalBack = root.querySelector('.oa-modal-back');
    const modal = root.querySelector('.oa-modal');

    fsBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        stage.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    });
    document.addEventListener('fullscreenchange', () => {
      fsBtn.textContent = document.fullscreenElement ? '✕ 전체화면 닫기' : '⛶ 전체화면';
    });
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let imgs = { walk: {}, masks: {} };
    loadAll().then(loaded => { imgs = loaded; });

    const npcs = {};
    for (const [id, cfg] of Object.entries(CHARS)) {
      npcs[id] = {
        id, x: cfg.home[0], y: cfg.home[1],
        mode: 'idle', dir: cfg.facing, path: [], speed: 6.5, walkDist: 0,
        bubble: '', bubbleType: '', onArrive: null,
      };
    }

    hud.innerHTML =
      SIGNS.map(s => `<span class="oa-sign" style="left:${s.x}%;top:${s.y}%;background:${s.bg}">${s.text}</span>`).join('') +
      Object.entries(CHARS).map(([id, c]) =>
        `<div class="oa-tag" data-tag="${id}"><b>${c.name}</b><small>${c.role}</small></div>
         <div class="oa-bub" data-bub="${id}" hidden></div>`
      ).join('');

    const tagEls = {}, bubEls = {};
    for (const id of Object.keys(CHARS)) {
      tagEls[id] = hud.querySelector(`[data-tag="${id}"]`);
      bubEls[id] = hud.querySelector(`[data-bub="${id}"]`);
    }

    const log = m => { if (opts.onLog) opts.onLog(m); };

    function sendPath(id, pts, { bubble = '', bubbleType = '', onArrive = null } = {}) {
      const n = npcs[id];
      n.path = pts.map(p => [p[0], p[1]]);
      n.mode = 'walk';
      n.bubble = bubble;
      n.bubbleType = bubbleType;
      n.onArrive = onArrive;
    }

    function serveCoffee() {
      const cl = npcs.claude, cap = npcs.captain;
      if (cl.mode === 'walk') return;
      log('☕ 비서실장이 12프레임으로 커피를 타러 이동');
      sendPath('claude', ROUTES.chiefToCof, {
        bubble: '☕ 캡틴 커피 타러 가는 중…',
        onArrive: () => {
          cl.dir = 'back'; cl.bubble = '☕ 원두 커피 추출 중…';
          setTimeout(() => {
            sendPath('claude', ROUTES.cofToCap, {
              bubble: '☕ 캡틴, 커피 가져왔습니다!', bubbleType: 'ok',
              onArrive: () => {
                cl.dir = 'east';
                cap.bubble = '☕ 고마워요! 잘 마실게요'; cap.bubbleType = 'ok';
                setTimeout(() => {
                  sendPath('claude', ROUTES.capToChief, {
                    bubble: '',
                    onArrive: () => {
                      cl.mode = 'idle'; cl.dir = 'front';
                      setTimeout(() => { if (cap.bubble.includes('고마워요')) cap.bubble = ''; }, 2400);
                    },
                  });
                }, 1600);
              },
            });
          }, 1100);
        },
      });
    }

    function captainWalk() {
      const cap = npcs.captain;
      if (cap.mode === 'walk') return;
      log('🚶 캡틴이 오른쪽 창가 데크로 산책');
      sendPath('captain', ROUTES.capToWindow, {
        bubble: '잠시 바람 좀 쐬야지…',
        onArrive: () => {
          cap.mode = 'stand'; cap.dir = 'back'; cap.bubble = '창밖을 바라보는 중…';
          setTimeout(() => {
            sendPath('captain', ROUTES.capToDesk, {
              bubble: '',
              onArrive: () => { cap.mode = 'idle'; cap.dir = 'front'; },
            });
          }, 3800);
        },
      });
    }

    function hallChat() {
      const f = npcs.finder, a = npcs.agy;
      if (f.mode === 'walk' || a.mode === 'walk') return;
      let ready = 0;
      log('💬 시각 정보 비서 · 메뉴 검사관 중앙 복도 12프레임 이동 후 업무 수다');
      const talk = () => {
        f.mode = 'stand'; a.mode = 'stand'; f.dir = 'east'; a.dir = 'west';
        f.bubble = '메뉴판 사진 6장 정리 끝났어요! 📷'; f.bubbleType = 'meet';
        setTimeout(() => {
          f.bubble = ''; a.bubble = '좋아요! 가격표 바로 대조할게요 🔍'; a.bubbleType = 'ok';
          setTimeout(() => {
            a.bubble = '';
            sendPath('finder', [...ROUTES.finderToHall.slice().reverse(), CHARS.finder.home], {
              onArrive: () => { f.mode = 'idle'; f.dir = 'front'; },
            });
            sendPath('agy', [...ROUTES.agyToHall.slice().reverse(), CHARS.agy.home], {
              onArrive: () => { a.mode = 'idle'; a.dir = 'back'; },
            });
          }, 2500);
        }, 2500);
      };
      sendPath('finder', ROUTES.finderToHall, { onArrive: () => { if (++ready === 2) talk(); } });
      sendPath('agy', ROUTES.agyToHall, { onArrive: () => { if (++ready === 2) talk(); } });
    }

    function runDemo() {
      serveCoffee();
      setTimeout(hallChat, 1200);
      setTimeout(captainWalk, 6500);
    }

    // ---------------------------------------------------------------- 렌더링 (실측 책상 경계 클리핑 + 의자 실루엣 마스크!)
    function drawNpc(n, t) {
      const cfg = CHARS[n.id];
      const wset = imgs.walk[n.id];
      if (!wset) return;
      const walking = (n.mode === 'walk');
      const emoting = (n.mode === 'emote' && n.emote && wset[n.emote]?.length);
      let fIdx = 0;
      if (emoting) {
        const elapsed = Math.max(0, t - (n.emoteStart || 0));
        fIdx = Math.min(11, Math.floor(elapsed * 4.0));
      } else if (walking) {
        fIdx = Math.floor(n.walkDist * 1.05) % 12;
      }

      let dirKey = 'front', flipX = false;
      if (emoting) { dirKey = n.emote; }
      else if (n.dir === 'east') { dirKey = 'east'; }
      else if (n.dir === 'west') { dirKey = 'east'; flipX = true; }
      else if (n.dir === 'back') { dirKey = 'back'; }
      else { dirKey = 'front'; }

      const im = wset[dirKey]?.[fIdx] || wset.front?.[0];
      if (!im) return;

      const seated = (n.mode === 'idle' || n.mode === 'work');

      if (seated && cfg.seat) {
        const s = cfg.seat;
        const sx = (s.x / 100) * W;
        const topY = (s.headTopY / 100) * H;
        const clipY = (s.clipY / 100) * H;
        const bob = Math.sin(t * 1.8 + sx * 0.01) * 1.1;
        const targetH = s.h;
        const targetW = targetH * (im.naturalWidth / im.naturalHeight);

        ctx.save();
        // 책상 상단 경계선(남향) 또는 의자 좌판 하단(북향)에서 깔끔하게 클리핑하여 다리·치마가 책상 위로 튀어나오지 않음!
        ctx.beginPath();
        ctx.rect(0, 0, W, clipY);
        ctx.clip();
        ctx.drawImage(im, sx - targetW / 2, topY + bob, targetW, targetH);
        ctx.restore();
        return;
      }

      const cx = (n.x / 100) * W;
      const cy = (n.y / 100) * H;
      const targetH = 164 * cfg.scale;
      const targetW = targetH * (im.naturalWidth / im.naturalHeight);
      const bob = walking ? Math.sin(n.walkDist * 1.1) * 1.8 : 0;

      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.28)';
      ctx.beginPath(); ctx.ellipse(cx, cy + 6, 26, 7.5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.translate(cx, cy + bob);
      if (flipX) ctx.scale(-1, 1);
      ctx.drawImage(im, -targetW / 2, -targetH, targetW, targetH);
      ctx.restore();
    }

    // ---------------------------------------------------------------- 캡틴 직접 게임 조작 (WASD / 방향키 / 바닥 클릭 / E 착석)
    const keys = new Set();
    let clickRing = null; // { x, y, born }

    // 책상·벽 장애물 충돌 판정 (캡틴이 가구 위를 뚫고 지나가지 않도록 부드럽게 막음)
    const BLOCKERS = [
      { x0: 42.8, y0: 19.2, x1: 57.6, y1: 22.8 }, // 캡틴 책상 앞면
      { x0: 42.8, y0: 39.8, x1: 57.2, y1: 43.8 }, // 비서실장 책상 앞면
      { x0:  9.2, y0: 45.2, x1: 19.6, y1: 47.6 }, // 시각 정보 비서 책상
      { x0:  6.0, y0: 14.0, x1: 23.0, y1: 20.5 }, // 커피바 캐비닛
    ];
    function canWalk(x, y) {
      if (x < 4.5 || x > 95.5 || y < 16.5 || y > 93.5) return false;
      for (const b of BLOCKERS) {
        if (x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1) return false;
      }
      return true;
    }

    function sitCaptainBack() {
      const cap = npcs.captain;
      cap.path = [];
      cap.onArrive = null;
      cap.x = CHARS.captain.home[0];
      cap.y = CHARS.captain.home[1];
      cap.dir = 'front';
      cap.mode = 'idle';
      cap.bubble = '';
      log('🪑 캡틴이 대표 책상 자리에 착석했습니다');
    }

    function playCaptainAction(action) {
      const cap = npcs.captain;
      cap.path = [];
      cap.onArrive = null;
      cap.mode = 'emote';
      cap.emote = action;
      cap.emoteStart = performance.now() / 1000;
      cap.emoteUntil = cap.emoteStart + 3.4;
      cap.dir = 'front';
      if (action === 'greet') {
        cap.bubble = '👋 모두 수고 많습니다! 진행합시다';
        cap.bubbleType = 'ok';
        log('👋 캡틴이 직원들에게 인사·지시 모션을 취했습니다');
      } else if (action === 'coffee') {
        cap.bubble = '☕ 커피 한 잔 하며 상황 점검 중…';
        cap.bubbleType = '';
        log('☕ 캡틴이 커피를 마시며 잠시 휴식 중입니다');
      }
    }

    window.addEventListener('keydown', e => {
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      const k = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(k)) {
        e.preventDefault();
        keys.add(k);
        const cap = npcs.captain;
        if (cap.path.length) { cap.path = []; cap.onArrive = null; }
        if (cap.mode === 'emote') { cap.emote = null; cap.mode = 'stand'; }
        cap.bubble = '';
      } else if (k === 'e') {
        e.preventDefault();
        sitCaptainBack();
      } else if (k === '1') {
        e.preventDefault();
        playCaptainAction('greet');
      } else if (k === '2') {
        e.preventDefault();
        playCaptainAction('coffee');
      }
    });
    window.addEventListener('keyup', e => {
      keys.delete(e.key.toLowerCase());
    });
    window.addEventListener('blur', () => keys.clear());

    let last = performance.now();
    function tick(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;

      // 캡틴 키보드 실시간 게임 조작
      const cap = npcs.captain;
      let kx = 0, ky = 0;
      if (keys.has('arrowleft')  || keys.has('a')) kx -= 1;
      if (keys.has('arrowright') || keys.has('d')) kx += 1;
      if (keys.has('arrowup')    || keys.has('w')) ky -= 1;
      if (keys.has('arrowdown')  || keys.has('s')) ky += 1;
      if (kx !== 0 || ky !== 0) {
        const len = Math.hypot(kx, ky);
        const spd = 8.2 * dt;
        const nx = cap.x + (kx / len) * spd;
        const ny = cap.y + (ky / len) * spd * 1.15;
        let moved = false;
        if (canWalk(nx, cap.y)) { cap.x = nx; moved = true; }
        if (canWalk(cap.x, ny)) { cap.y = ny; moved = true; }
        cap.mode = 'walk';
        if (moved) cap.walkDist += spd;
        cap.dir = Math.abs(ky) >= Math.abs(kx) ? (ky < 0 ? 'back' : 'front') : (kx > 0 ? 'east' : 'west');
      } else if (cap.mode === 'emote' && t >= (cap.emoteUntil || 0)) {
        cap.emote = null;
        cap.bubble = '';
        cap.mode = (Math.hypot(cap.x - CHARS.captain.home[0], cap.y - CHARS.captain.home[1]) < 2.0) ? 'idle' : 'stand';
      } else if (!cap.path.length && cap.mode === 'walk') {
        // 키를 떼면 그 자리에 자연스럽게 서서 대기 (의자로 텔레포트하지 않음!)
        cap.mode = 'stand';
      }

      for (const n of Object.values(npcs)) {
        if (!n.path.length) continue;
        const [tx, ty] = n.path[0];
        const dx = tx - n.x, dy = ty - n.y;
        const dist = Math.hypot(dx, dy);
        const step = n.speed * dt;
        if (dist <= step + 0.2) {
          n.walkDist += dist;
          n.x = tx; n.y = ty; n.path.shift();
          if (!n.path.length) {
            if (n.onArrive) { const cb = n.onArrive; n.onArrive = null; cb(); }
            else if (n.id === 'captain') { n.mode = 'stand'; }
          }
        } else {
          n.x += (dx / dist) * step; n.y += (dy / dist) * step;
          n.walkDist += step;
          n.dir = Math.abs(dy) >= Math.abs(dx) ? (dy < 0 ? 'back' : 'front') : (dx >= 0 ? 'east' : 'west');
        }
      }

      ctx.clearRect(0, 0, W, H);
      if (imgs.bg) ctx.drawImage(imgs.bg, 0, 0, W, H);

      // 바닥 클릭 이동 시 황금 링 피드백
      if (clickRing) {
        const age = (now - clickRing.born) / 600;
        if (age >= 1) clickRing = null;
        else {
          ctx.save();
          ctx.strokeStyle = `rgba(250, 204, 21, ${1 - age})`;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.ellipse((clickRing.x / 100) * W, (clickRing.y / 100) * H, 14 + age * 28, 5 + age * 10, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // 통합 Y-깊이(앞/뒤 가림) 정렬: 모든 캐릭터와 모든 책상·의자 전경 마스크를 발 위치(y) 순으로 그림!
      const drawList = [
        ...Object.values(npcs).map(n => ({ y: n.y, draw: () => drawNpc(n, t) })),
        ...PROPS.map(p => ({
          y: p.sortY,
          draw: () => {
            const im = imgs.masks[p.key];
            if (im) ctx.drawImage(im, (p.x0 / 100) * W, (p.y0 / 100) * H, ((p.x1 - p.x0) / 100) * W, ((p.y1 - p.y0) / 100) * H);
          }
        })),
      ];
      drawList.sort((a, b) => a.y - b.y);
      for (const item of drawList) item.draw();

      for (const [id, n] of Object.entries(npcs)) {
        const walking = n.mode === 'walk';
        tagEls[id].style.left = `${n.x}%`;
        tagEls[id].style.top  = `${n.y + (walking ? 1.4 : (CHARS[id].facing === 'front' ? 4.8 : 1.5))}%`;
        if (n.bubble) {
          bubEls[id].hidden = false;
          bubEls[id].textContent = n.bubble;
          bubEls[id].className = `oa-bub ${n.bubbleType}`;
          bubEls[id].style.left = `${n.x}%`;
          const standing = (n.mode === 'walk' || n.mode === 'stand' || n.mode === 'emote');
          bubEls[id].style.top  = `${Math.max(3.5, n.y - (standing ? 13.0 : 9.0))}%`;
        } else {
          bubEls[id].hidden = true;
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // 캐릭터 클릭 → 프로필 상태창 / 빈 바닥 클릭 → 캡틴이 그 위치로 걸어감!
    canvas.addEventListener('click', e => {
      const r = canvas.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      let hit = null, best = 6.0;
      for (const n of Object.values(npcs)) {
        const d = Math.hypot(px - n.x, py - (n.y - 4));
        if (d < best) { best = d; hit = n.id; }
      }
      if (!hit) {
        if (canWalk(px, py)) {
          clickRing = { x: px, y: py, born: performance.now() };
          sendPath('captain', [[px, py]], { bubble: '' });
        }
        return;
      }
      const c = CHARS[hit], n = npcs[hit];
      modal.innerHTML = `
        <div class="oa-m-head">
          <img src="/static/office-anime/assets/portraits/${hit}.webp?v=cap2" alt="${c.name}">
          <div><h3>${c.name}</h3><small>${c.role} · 12프레임 고화질</small></div>
          <button type="button" data-close>×</button>
        </div>
        <p class="oa-m-st">${n.bubble || (n.mode === 'walk' ? '🚶 12프레임으로 이동 중…' : '자리에서 업무 대기 중')}</p>`;
      modalBack.hidden = false;
    });
    modalBack.addEventListener('click', e => {
      if (e.target === modalBack || e.target.closest('[data-close]')) modalBack.hidden = true;
    });

    setTimeout(runDemo, 1500);
    return { runDemo, serveCoffee, captainWalk, hallChat, sitCaptainBack, playCaptainAction };
  }

  window.OfficeAnime = { create };
})();
