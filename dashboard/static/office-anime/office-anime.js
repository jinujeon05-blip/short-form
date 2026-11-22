// Jinwoo 에이전트 — 12프레임 고화질 웹툰/애니 사무실 (4명 선행 시연: 캡틴·비서실장·시각 정보 비서·메뉴 검사관)
(() => {
  const W = 2560, H = 1440; // 16:9 QHD 2K 고화질 (전체화면 선명도 보장)

  // bg-office.webp (1024x576) 기준 정확한 착석 좌표 + 전경 책상/의자 마스크 좌표
  const CHARS = {
    captain: { name: '캡틴',          role: '결재',        home: [50.0, 16.0], facing: 'front', scale: 1.0,  mask: { key: 'captain-desk', x0: 41.5, y0: 9.5,  x1: 58.5, y1: 21.5 } },
    claude:  { name: '비서실장',      role: '지휘',        home: [50.0, 38.0], facing: 'front', scale: 0.96, mask: { key: 'claude-desk',  x0: 42.8, y0: 32.0, x1: 57.2, y1: 43.5 } },
    finder:  { name: '시각 정보 비서', role: '사진 고르기', home: [14.7, 45.0], facing: 'front', scale: 0.94, mask: { key: 'finder-desk',  x0: 9.2,  y0: 38.8, x1: 20.0, y1: 48.8 } },
    agy:     { name: '메뉴 검사관',   role: '메뉴판 읽기', home: [83.0, 49.0], facing: 'back',  scale: 0.96, mask: { key: 'agy-chair',    x0: 80.2, y0: 40.2, x1: 85.8, y1: 50.2 } },
  };

  const SIGNS = [
    { text: '미디어 관제실',     x: 14.8, y: 24.0, bg: '#15803d' },
    { text: '디지털 메뉴 통제실', x: 85.2, y: 24.0, bg: '#dc2626' },
    { text: '감사실',           x: 13.0, y: 56.5, bg: '#7c3aed' },
    { text: '통번역 통제실',     x: 36.2, y: 56.5, bg: '#2563eb' },
    { text: '인력 공급팀',       x: 63.8, y: 56.5, bg: '#0284c7' },
    { text: '선별팀',           x: 88.2, y: 56.5, bg: '#ea580c' },
  ];

  // 벽·책상·화분 0% 통과 동선
  const ROUTES = {
    capToWindow:  [[50.0, 15.2], [56.0, 15.2], [56.0, 16.5], [67.0, 16.5], [67.0, 20.0], [82.0, 20.0]],
    capToDesk:    [[82.0, 20.0], [67.0, 20.0], [67.0, 16.5], [56.0, 16.5], [56.0, 15.2], [50.0, 15.2]],
    chiefToCof:   [[50.0, 34.0], [34.5, 34.0], [34.5, 20.0], [15.5, 20.0]],
    cofToCap:     [[15.5, 20.0], [34.5, 20.0], [34.5, 16.5], [40.5, 16.5]],
    capToChief:   [[40.5, 16.5], [34.5, 16.5], [34.5, 34.0], [50.0, 34.0], [50.0, 38.0]],
    finderToHall: [[14.7, 41.5], [24.8, 41.5], [24.8, 51.5], [46.5, 51.5]],
    agyToHall:    [[83.0, 51.5], [75.0, 51.5], [53.5, 51.5]],
  };

  function loadAll() {
    const imgs = { walk: {}, masks: {} };
    const load = (obj, k, url) => new Promise(res => {
      const im = new Image();
      im.onload = () => { obj[k] = im; res(); };
      im.onerror = () => res();
      im.src = url;
    });
    const jobs = [load(imgs, 'bg', '/static/office-anime/assets/bg-office.webp?v=hd2k')];
    for (const [id, cfg] of Object.entries(CHARS)) {
      imgs.walk[id] = { east: [], front: [], back: [] };
      for (const dir of ['east', 'front', 'back']) {
        for (let i = 1; i <= 12; i++) {
          jobs.push(load(imgs.walk[id][dir], i - 1, `/static/office-anime/assets/walk/${id}-${dir}-${i}.webp?v=rembg3`));
        }
      }
      if (cfg.mask) {
        jobs.push(load(imgs.masks, cfg.mask.key, `/static/office-anime/assets/masks/${cfg.mask.key}.webp?v=hd2k`));
      }
    }
    return Promise.all(jobs).then(() => imgs);
  }

  function create(root, opts = {}) {
    root.innerHTML = `
      <div class="oa-stage">
        <canvas class="oa-canvas" width="${W}" height="${H}"></canvas>
        <div class="oa-hud"></div>
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
        mode: 'idle', dir: cfg.facing, path: [], speed: 12.0, walkDist: 0,
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

    // ---------------------------------------------------------------- 렌더링 (진짜 책상·의자 전경 마스크!)
    function drawNpc(n, t) {
      const cfg = CHARS[n.id];
      const wset = imgs.walk[n.id];
      if (!wset) return;
      const walking = (n.mode === 'walk');
      const fIdx = walking ? (Math.floor(n.walkDist * 1.15) % 12) : 0;

      let dirKey = 'front', flipX = false;
      if (n.dir === 'east') { dirKey = 'east'; }
      else if (n.dir === 'west') { dirKey = 'east'; flipX = true; }
      else if (n.dir === 'back') { dirKey = 'back'; }
      else { dirKey = 'front'; }

      const im = wset[dirKey]?.[fIdx] || wset.front?.[0];
      if (!im) return;

      const cx = (n.x / 100) * W;
      const cy = (n.y / 100) * H;
      const seated = (n.mode === 'idle' || n.mode === 'work');
      // 2K(1440px) 기준: 배경 의자·문틀 비율에 맞춘 자연스러운 크기 (~11.4% 높이, 기존 대비 약 20% 축소)
      const targetH = (seated ? 174 : 164) * cfg.scale;
      const targetW = targetH * (im.naturalWidth / im.naturalHeight);
      const bob = walking ? Math.sin(n.walkDist * 1.2) * 2.0 : Math.sin(t * 2.0 + cx * 0.01) * 1.0;

      ctx.save();
      if (!seated) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.28)';
        ctx.beginPath(); ctx.ellipse(cx, cy + 6, 28, 8, 0, 0, Math.PI * 2); ctx.fill();
      }
      ctx.translate(cx, cy + (seated ? 42 : 0) + bob);
      if (flipX) ctx.scale(-1, 1);
      ctx.drawImage(im, -targetW / 2, -targetH, targetW, targetH);
      ctx.restore();

      // 앉아 있을 때: 배경에서 잘라낸 실제 책상+노트북(남향) 또는 의자 등받이(북향)를 캐릭터 앞쪽에 덮어 100% 자연 착석!
      if (seated && cfg.mask && imgs.masks[cfg.mask.key]) {
        const m = cfg.mask;
        ctx.drawImage(
          imgs.masks[m.key],
          (m.x0 / 100) * W, (m.y0 / 100) * H,
          ((m.x1 - m.x0) / 100) * W, ((m.y1 - m.y0) / 100) * H
        );
      }
    }

    let last = performance.now();
    function tick(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;

      for (const n of Object.values(npcs)) {
        if (!n.path.length) continue;
        const [tx, ty] = n.path[0];
        const dx = tx - n.x, dy = ty - n.y;
        const dist = Math.hypot(dx, dy);
        const step = n.speed * dt;
        if (dist <= step + 0.2) {
          n.walkDist += dist;
          n.x = tx; n.y = ty; n.path.shift();
          if (!n.path.length && n.onArrive) { const cb = n.onArrive; n.onArrive = null; cb(); }
        } else {
          n.x += (dx / dist) * step; n.y += (dy / dist) * step;
          n.walkDist += step;
          n.dir = Math.abs(dy) >= Math.abs(dx) ? (dy < 0 ? 'back' : 'front') : (dx >= 0 ? 'east' : 'west');
        }
      }

      ctx.clearRect(0, 0, W, H);
      if (imgs.bg) ctx.drawImage(imgs.bg, 0, 0, W, H);

      for (const n of Object.values(npcs).sort((a, b) => a.y - b.y)) drawNpc(n, t);

      for (const [id, n] of Object.entries(npcs)) {
        const walking = n.mode === 'walk';
        tagEls[id].style.left = `${n.x}%`;
        tagEls[id].style.top  = `${n.y + (walking ? 1.4 : (CHARS[id].facing === 'front' ? 4.8 : 1.5))}%`;
        if (n.bubble) {
          bubEls[id].hidden = false;
          bubEls[id].textContent = n.bubble;
          bubEls[id].className = `oa-bub ${n.bubbleType}`;
          bubEls[id].style.left = `${n.x}%`;
          bubEls[id].style.top  = `${Math.max(7, n.y - (walking ? 12.2 : 9.0))}%`;
        } else {
          bubEls[id].hidden = true;
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // 캐릭터 클릭 → 고화질 웹툰 클로즈업 프로필 상태창!
    canvas.addEventListener('click', e => {
      const r = canvas.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      let hit = null, best = 8.5;
      for (const n of Object.values(npcs)) {
        const d = Math.hypot(px - n.x, py - (n.y - 4));
        if (d < best) { best = d; hit = n.id; }
      }
      if (!hit) return;
      const c = CHARS[hit], n = npcs[hit];
      modal.innerHTML = `
        <div class="oa-m-head">
          <img src="/static/office-anime/assets/portraits/${hit}.webp" alt="${c.name}">
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
    return { runDemo, serveCoffee, captainWalk, hallChat };
  }

  window.OfficeAnime = { create };
})();
