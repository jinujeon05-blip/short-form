// Jinwoo 에이전트 2D 고화질(2K) 픽셀 타이쿤 NPC 사무실 (별도 작업 공간: dashboard/static/office-game/)
// Google Flow 2K 픽셀 아트 빈 사무실 배경(bg-office.webp) + 10명 투명 픽셀 캐릭터 스프라이트(assets/*.webp)
// + 60fps 게임 움직임 엔진(걷기·타이핑·보고·결재 전달·커피 휴식) + 선명한 한국어 말풍선·진행 바 오버레이.
(() => {
  const W = 1920, H = 1072; // 배경 2K 원본 비율 그대로 (16:9)

  // 10명 캐릭터 배치 (bg-office.webp 의 실제 의자·책상 위치에 맞춘 % 좌표)
  const CHARS = {
    captain:       { name: '캡틴',          role: '결재',        home: [50.0, 17.5], seatedClip: 0.56, scale: 1.00 },
    claude:        { name: '비서실장',      role: '지휘',        home: [50.0, 41.5], seatedClip: 0.58, scale: 1.02 },
    finder:        { name: '시각 정보 비서', role: '사진 고르기', home: [28.2, 47.0], seatedClip: 0.58, scale: 1.00 },
    agy:           { name: '메뉴 검사관',   role: '메뉴판 읽기', home: [75.3, 49.0], seatedClip: 0.62, scale: 1.02 },
    'menu-reader': { name: '자료 해석 비서', role: '메뉴판 읽기', home: [90.2, 51.0], seatedClip: 0.62, scale: 1.00 },
    codex:         { name: '운영 감찰관',   role: '두 번째 검토', home: [7.2, 87.5],  seatedClip: 0.64, scale: 1.04 },
    reviewer:      { name: '데이터 감사관', role: '마지막 점검', home: [17.8, 87.5], seatedClip: 0.64, scale: 1.04 },
    polisher:      { name: '수석 번역관',   role: '번역·글',     home: [31.2, 81.5], seatedClip: 0.62, scale: 1.02 },
    staffing:      { name: '인력 공급팀',   role: '인력 현황',   home: [64.6, 83.5], seatedClip: 0.58, scale: 1.04 },
    sorting:       { name: '선별팀',        role: '선별 실적',   home: [91.5, 89.5], seatedClip: 0.62, scale: 1.04 },
  };

  // 각 부서 벽 상단 색 띠에 딱 맞춘 선명한 한국어 간판
  const SIGNS = [
    { text: '미디어 관제실',     x: 16.5, y: 34.0, bg: '#15803d' },
    { text: '디지털 메뉴 통제실', x: 83.0, y: 34.0, bg: '#dc2626' },
    { text: '감사실',           x: 11.5, y: 69.5, bg: '#7c3aed' },
    { text: '통번역 통제실',     x: 34.8, y: 69.5, bg: '#2563eb' },
    { text: '인력 공급팀',       x: 65.2, y: 69.5, bg: '#0284c7' },
    { text: '선별팀',           x: 88.2, y: 69.5, bg: '#ea580c' },
  ];

  // 복도 웨이포인트 (% 좌표 — 벽·화분·책상을 피하는 중앙 목재 통로)
  const EXIT_PATH = {
    captain:       [[50.0, 17.5]],
    claude:        [[50.0, 41.5], [50.0, 54.0]],
    finder:        [[28.2, 47.0], [23.0, 62.5], [44.0, 62.5]],
    agy:           [[75.3, 49.0], [74.0, 62.5], [56.0, 62.5]],
    'menu-reader': [[90.2, 51.0], [75.0, 62.5], [56.0, 62.5]],
    codex:         [[7.2, 87.5],  [21.0, 65.0], [44.0, 62.5]],
    reviewer:      [[17.8, 87.5], [21.0, 65.0], [44.0, 62.5]],
    polisher:      [[31.2, 81.5], [44.0, 64.0]],
    staffing:      [[64.6, 83.5], [56.0, 64.0]],
    sorting:       [[91.5, 89.5], [78.0, 65.0], [56.0, 62.5]],
  };

  function routeToChief(id) {
    const out = EXIT_PATH[id].slice();
    const last = out[out.length - 1];
    const isLeft = last[0] < 50;
    out.push(isLeft ? [44.0, 54.5] : [56.0, 54.5]);
    return out;
  }

  function routeToCoffee(id) {
    const out = EXIT_PATH[id].slice();
    out.push([46.0, 54.5], [37.0, 31.0], [15.0, 26.5]);
    return out;
  }

  // 이미지 사전 불러오기
  function loadImages() {
    const imgs = {};
    const load = (key, url) => new Promise(res => {
      const im = new Image();
      im.onload = () => { imgs[key] = im; res(); };
      im.onerror = () => res();
      im.src = url;
    });
    const jobs = [load('bg', '/static/office-game/assets/bg-office.webp')];
    for (const id of Object.keys(CHARS)) {
      jobs.push(load(id, `/static/office-game/assets/${id}.webp`));
    }
    return Promise.all(jobs).then(() => imgs);
  }

  function create(container, opts = {}) {
    container.innerHTML = `
      <div class="og-stage">
        <canvas class="og-canvas" width="${W}" height="${H}"></canvas>
        <div class="og-hud"></div>
      </div>`;
    const canvas = container.querySelector('.og-canvas');
    const hud = container.querySelector('.og-hud');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;

    let imgs = {};
    loadImages().then(loaded => { imgs = loaded; });

    const npcs = {};
    for (const [id, cfg] of Object.entries(CHARS)) {
      npcs[id] = {
        id, x: cfg.home[0], y: cfg.home[1],
        mode: 'idle', bubble: '', bubbleType: 'work', progress: null,
        carry: null, path: [], speed: 15.5, facing: 1, onArrive: null,
      };
    }

    let demoTimers = [];
    let isDemo = false;
    let hrMarks = [];
    let seenReports = new Set();
    let prevActive = new Set();
    let prevDoneOrder = null;
    let lastCoffeeAt = 0;

    // HUD (부서 간판 + 캐릭터 이름표 + 실시간 작업 말풍선 + 상태칩 + 인력배지)
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
      <div class="og-hr" data-hr-box style="left:65.2%;top:74%"></div>`;

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
      if (!n) return;
      n.path = pts.map(p => [p[0], p[1]]);
      n.mode = mode;
      n.carry = carry;
      n.bubble = bubble;
      n.bubbleType = bubbleType;
      n.progress = null;
      n.onArrive = onArrive;
    }

    function walkReport(id, text = '보고드립니다!') {
      const n = npcs[id];
      if (!n || id === 'captain' || id === 'claude') return;
      const toChief = routeToChief(id);
      const backHome = toChief.slice().reverse();
      log(`${CHARS[id].name} → 비서실장에게 이동 (${text})`);
      sendPath(id, toChief, {
        mode: 'walk', carry: 'doc', bubble: text, bubbleType: 'ok',
        onArrive: () => {
          const chief = npcs.claude;
          chief.bubble = '확인했어요! ✔';
          chief.bubbleType = 'ok';
          setTimeout(() => {
            if (chief.bubble === '확인했어요! ✔') chief.bubble = '';
            sendPath(id, backHome, {
              mode: 'walk', carry: null, bubble: '',
              onArrive: () => { n.mode = 'done'; n.bubble = ''; n.facing = 1; },
            });
          }, 1100);
        },
      });
    }

    function chiefHandoff(text = '결재 올립니다!') {
      const cap = npcs.captain;
      log(`비서실장 → 캡틴에게 결재 전달 (${text})`);
      sendPath('claude', [[50.0, 41.5], [40.0, 32.0], [50.0, 29.0]], {
        mode: 'walk', carry: 'doc', bubble: text, bubbleType: 'ok',
        onArrive: () => {
          cap.mode = 'done';
          cap.bubble = '수고했어요! ✔';
          cap.bubbleType = 'ok';
          setTimeout(() => {
            sendPath('claude', [[50.0, 29.0], [40.0, 32.0], [50.0, 41.5]], {
              mode: 'walk', carry: null, bubble: '',
              onArrive: () => {
                npcs.claude.mode = 'done';
                npcs.claude.facing = 1;
                setTimeout(() => { if (cap.bubble === '수고했어요! ✔') cap.bubble = ''; }, 2500);
              },
            });
          }, 1400);
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
          const back = toCaf.slice().reverse();
          log(`${CHARS[id].name} 커피 휴식 이동`);
          sendPath(id, toCaf, {
            mode: 'coffee-walk', carry: null, bubble: '☕ 커피 한 잔…', bubbleType: 'idle',
            onArrive: () => {
              npcs[id].carry = 'coffee';
              setTimeout(() => {
                sendPath(id, back, {
                  mode: 'coffee-walk', carry: 'coffee', bubble: '',
                  onArrive: () => { npcs[id].mode = 'idle'; npcs[id].carry = null; npcs[id].facing = 1; },
                });
              }, 1400);
            },
          });
        }, idx * 900);
      });
    }

    // ---------------------------------------------------------------- 가상 20초 시연
    function stopDemo() {
      demoTimers.forEach(clearTimeout);
      demoTimers = [];
      isDemo = false;
      for (const [id, cfg] of Object.entries(CHARS)) {
        Object.assign(npcs[id], {
          x: cfg.home[0], y: cfg.home[1], mode: 'idle',
          bubble: '', carry: null, path: [], progress: null, facing: 1, onArrive: null,
        });
      }
    }

    function runDemo() {
      stopDemo();
      isDemo = true;
      const at = (ms, fn) => demoTimers.push(setTimeout(fn, ms));

      log('▶ 시연 시작: 캡틴이 "새 가게 메뉴판 제작" 지시');
      npcs.captain.bubble = '새 가게 메뉴판 만들어줘!';
      npcs.captain.bubbleType = 'work';
      npcs.claude.mode = 'work';
      npcs.claude.bubble = '지시 접수! 팀 배정 중…';

      at(1400, () => {
        npcs.captain.bubble = '';
        npcs.claude.bubble = '사진·메뉴판 읽기 시작해 주세요!';
        npcs.finder.mode = 'work';
        npcs.finder.bubble = '📷 요리 사진 6장 고르는 중…';
        npcs.finder.progress = 35;
        npcs.agy.mode = 'work';
        npcs.agy.bubble = '🔍 메뉴판 5장 읽는 중…';
        npcs.agy.progress = 25;
        log('비서실장 → 시각 정보 비서·메뉴 검사관 작업 시작');
      });

      at(3800, () => {
        npcs.finder.progress = 90;
        npcs.agy.progress = 65;
        npcs.claude.bubble = '진행 상황 확인 중…';
      });

      at(5200, () => {
        npcs.finder.progress = null;
        walkReport('finder', '사진 6장 선별 완료!');
      });

      at(7600, () => {
        npcs.agy.progress = 100;
        walkReport('agy', '메뉴 48개·가격 정리 완료!');
      });

      at(10000, () => {
        npcs.polisher.mode = 'work';
        npcs.polisher.bubble = '🌐 5개 언어 번역 중…';
        npcs.polisher.progress = 40;
        npcs.codex.mode = 'work';
        npcs.codex.bubble = '🔎 가격·누락 재대조 중…';
        npcs.codex.progress = 50;
        log('수석 번역관·운영 감찰관 작업 시작');
      });

      at(12600, () => {
        npcs.polisher.progress = 95;
        npcs.codex.progress = 95;
        npcs.reviewer.mode = 'work';
        npcs.reviewer.bubble = '✅ 최종 점검 준비 중…';
        walkReport('codex', '가격 대조 이상 없음!');
      });

      at(15200, () => {
        npcs.polisher.progress = null;
        walkReport('polisher', '5개 언어 번역 끝!');
        npcs.reviewer.bubble = '✅ 배포 전 점검 통과!';
        npcs.reviewer.bubbleType = 'ok';
      });

      at(17800, () => {
        walkReport('reviewer', '최종 점검 합격!');
      });

      at(20400, () => {
        chiefHandoff('결재 올립니다! (배포 대기)');
      });

      at(24200, () => {
        log('✔ 시연 완료! 실제 지시가 들어오면 이대로 자동 움직입니다.');
        isDemo = false;
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

      for (const [id, n] of Object.entries(npcs)) {
        if (n.mode === 'walk' || n.mode === 'coffee-walk') continue;
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
      if (!active.size && now - lastCoffeeAt > 28000) {
        lastCoffeeAt = now;
        const idleIds = Object.keys(CHARS).filter(id => id !== 'captain' && id !== 'claude' && npcs[id].mode === 'idle');
        if (idleIds.length) coffeeStroll([idleIds[Math.floor(Math.random() * idleIds.length)]]);
      }
    }

    // ---------------------------------------------------------------- 고화질 스프라이트 렌더링
    function drawNpc(n, t) {
      const im = imgs[n.id];
      if (!im) return;
      const cfg = CHARS[n.id];
      const walking = n.mode === 'walk' || n.mode === 'coffee-walk';
      const working = n.mode === 'work';
      const done = n.mode === 'done';

      const cx = (n.x / 100) * W;
      const cy = (n.y / 100) * H;
      const targetH = 188 * cfg.scale;
      const targetW = targetH * (im.naturalWidth / im.naturalHeight);

      // 자연스러운 움직임 (걷기 통통 + 살짝 좌우 흔들림, 타이핑 진동, 완료 기쁨 바운스, 대기 숨쉬기)
      const bob = walking ? -Math.abs(Math.sin(t * 11)) * 10
        : working ? Math.sin(t * 16) * 2.2
        : done ? -Math.abs(Math.sin(t * 5.5)) * 5
        : Math.sin(t * 2.2 + cx * 0.01) * 1.5;
      const tilt = walking ? Math.sin(t * 11) * 0.06 : 0;

      ctx.save();
      // 바닥 그림자
      ctx.fillStyle = 'rgba(15, 23, 42, 0.34)';
      ctx.beginPath();
      ctx.ellipse(cx, cy + (walking ? 12 : -4), targetW * 0.42, walking ? 12 : 9, 0, 0, Math.PI * 2);
      ctx.fill();

      // 작업 중 빛나는 파란 아우라 / 완료 시 초록 반짝임
      if (working) {
        const pulse = 0.28 + 0.14 * Math.sin(t * 6);
        ctx.fillStyle = `rgba(56, 189, 248, ${pulse})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy - targetH * 0.35, targetW * 0.72, targetH * 0.48, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (done) {
        const pulse = 0.22 + 0.1 * Math.sin(t * 4);
        ctx.fillStyle = `rgba(74, 222, 128, ${pulse})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy - targetH * 0.35, targetW * 0.65, targetH * 0.42, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.translate(cx, cy + bob);
      ctx.rotate(tilt);
      if (walking && n.facing < 0) ctx.scale(-1, 1);

      if (walking) {
        // 걸을 때는 전신 2K 스프라이트 표시
        ctx.drawImage(im, -targetW / 2, -targetH + 14, targetW, targetH);
      } else {
        // 자리에 앉아 있을 때는 책상 위로 상반신만 자연스럽게 표시
        const clip = cfg.seatedClip || 0.6;
        const sh = im.naturalHeight * clip;
        const dh = targetH * clip;
        ctx.drawImage(im, 0, 0, im.naturalWidth, sh, -targetW / 2, -dh + 10, targetW, dh);
      }

      // 들고 있는 아이콘 (빛나는 황금 보고서 / 커피컵)
      if (n.carry === 'doc') {
        ctx.fillStyle = 'rgba(250, 204, 21, 0.38)';
        ctx.beginPath(); ctx.arc(targetW * 0.38, -targetH * 0.48, 22, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 3;
        ctx.fillRect(targetW * 0.24, -targetH * 0.58, 26, 32);
        ctx.strokeRect(targetW * 0.24, -targetH * 0.58, 26, 32);
      } else if (n.carry === 'coffee') {
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 3;
        ctx.fillRect(targetW * 0.26, -targetH * 0.48, 18, 20);
        ctx.strokeRect(targetW * 0.26, -targetH * 0.48, 18, 20);
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

      for (const n of Object.values(npcs)) {
        if (!n.path.length) continue;
        const [tx, ty] = n.path[0];
        const dx = tx - n.x, dy = ty - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist <= n.speed * dt + 0.2) {
          n.x = tx; n.y = ty;
          n.path.shift();
          if (!n.path.length && n.onArrive) {
            const cb = n.onArrive;
            n.onArrive = null;
            cb();
          }
        } else {
          n.x += (dx / dist) * n.speed * dt;
          n.y += (dy / dist) * n.speed * dt;
          if (Math.abs(dx) > 0.1) n.facing = dx >= 0 ? 1 : -1;
        }
      }

      ctx.clearRect(0, 0, W, H);
      if (imgs.bg) {
        ctx.drawImage(imgs.bg, 0, 0, W, H);
      } else {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, W, H);
      }

      // Y좌표 순으로 캐릭터 그리기 (자연스러운 앞뒤 원근감)
      const list = Object.values(npcs).sort((a, b) => a.y - b.y);
      for (const n of list) drawNpc(n, t);

      // 선명한 한국어 HUD 업데이트
      let workingCount = 0;
      for (const [id, n] of Object.entries(npcs)) {
        if (n.mode === 'work' || n.mode === 'walk') workingCount++;
        const tag = tagEls[id];
        const bub = bubEls[id];
        const walking = n.mode === 'walk' || n.mode === 'coffee-walk';

        tag.style.left = `${n.x}%`;
        tag.style.top = `${n.y + (walking ? 1.8 : 0.8)}%`;
        tag.className = 'og-tag' + (n.mode === 'work' ? ' work' : n.mode === 'done' ? ' done' : n.mode === 'walk' ? ' walk' : '');
        tag.querySelector('small').textContent =
          n.mode === 'work' ? '작업 중…' : n.mode === 'walk' ? '이동 중' : n.mode === 'done' ? '✔ 작업 완료' : CHARS[id].role;

        if (n.bubble) {
          bub.hidden = false;
          bub.style.left = `${n.x}%`;
          bub.style.top = `${n.y - (walking ? 17.5 : 11.5)}%`;
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
      workChip.textContent = workingCount ? `일하는 직원 ${workingCount}명` : '전원 대기 중';

      const hrHtml = hrMarks.map(([c, txt]) => `<span class="${c}">${txt}</span>`).join('');
      if (hrBox.dataset.h !== hrHtml) { hrBox.innerHTML = hrHtml; hrBox.dataset.h = hrHtml; }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    // 클릭 감지
    canvas.addEventListener('click', e => {
      const rect = canvas.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      let hit = null, best = 7.5;
      for (const n of Object.values(npcs)) {
        const d = Math.hypot(px - n.x, py - (n.y - 5));
        if (d < best) { best = d; hit = n.id; }
      }
      if (hit && opts.onSelect) opts.onSelect(hit, npcs[hit], CHARS[hit]);
    });

    return {
      syncReal,
      runDemo,
      stopDemo,
      coffeeStroll: () => coffeeStroll(),
      destroy: () => { stopDemo(); cancelAnimationFrame(rafId); },
      CHARS,
    };
  }

  window.OfficeGame = { create, CHARS };
})();
