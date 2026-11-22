// Jinwoo 에이전트 2D 고화질 4방향 RPG 픽셀 NPC 사무실 v3 (별도 작업 공간: dashboard/static/office-game/)
// - 큼직한 책상·의자 + 캡틴 검정 가죽 의자 + 오른쪽 창가 발코니 데크 + 워터마크 제거 완료(bg-office.webp)
// - 진짜 '책상 뒤에 앉기' 레이어 처리(deskMask): 정면 책상 앞판을 캐릭터 하반신 위에 덮어 자연스럽게 착석
// - 감사실(보라)·디지털 메뉴 통제실(빨강)은 모니터를 바라보는 '앉은 뒷모습'으로 자연스럽게 표시
// - 전 직원 4방향 걷기(북 뒷통수·남 정면·동서 옆모습 4프레임) + 벽·책상·화분 통과 0 동선
(() => {
  const W = 1376, H = 768;

  // bg_v3_grid.jpg 기준 각 의자·책상 앞판 마스크(% 좌표)
  const CHARS = {
    captain: {
      name: '캡틴', role: '결재', home: [50.0, 14.5], seatFacing: 'down', scale: 0.92,
      deskMask: [43.5, 11.4, 56.5, 24.0],
    },
    claude: {
      name: '비서실장', role: '지휘', home: [50.0, 38.8], seatFacing: 'down', scale: 0.92,
      deskMask: [43.5, 35.6, 56.5, 48.2],
    },
    finder: {
      name: '시각 정보 비서', role: '사진 고르기', home: [15.2, 46.5], seatFacing: 'down', scale: 0.90,
      deskMask: [10.0, 43.3, 20.5, 54.0],
    },
    agy: {
      name: '메뉴 검사관', role: '메뉴판 읽기', home: [82.2, 49.5], seatFacing: 'up', scale: 0.90,
    },
    'menu-reader': {
      name: '자료 해석 비서', role: '메뉴판 읽기', home: [93.5, 49.5], seatFacing: 'up', scale: 0.90,
    },
    codex: {
      name: '운영 감찰관', role: '두 번째 검토', home: [7.8, 91.8], seatFacing: 'up', scale: 0.90,
    },
    reviewer: {
      name: '데이터 감사관', role: '마지막 점검', home: [19.5, 91.8], seatFacing: 'up', scale: 0.90,
    },
    polisher: {
      name: '수석 번역관', role: '번역·글', home: [38.2, 84.8], seatFacing: 'down', scale: 0.90,
      deskMask: [33.2, 81.6, 43.5, 92.6],
    },
    staffing: {
      name: '인력 공급팀', role: '인력 현황', home: [63.2, 84.8], seatFacing: 'down', scale: 0.90,
      deskMask: [58.0, 81.6, 68.5, 92.6],
    },
    sorting: {
      name: '선별팀', role: '선별 실적', home: [83.2, 84.8], seatFacing: 'down', scale: 0.90,
      deskMask: [78.0, 81.6, 88.5, 92.6],
    },
  };

  // 각 부서 벽 상단 간판
  const SIGNS = [
    { text: '미디어 관제실',     x: 15.2, y: 29.0, bg: '#15803d' },
    { text: '디지털 메뉴 통제실', x: 84.8, y: 29.0, bg: '#dc2626' },
    { text: '감사실',           x: 12.6, y: 61.5, bg: '#7c3aed' },
    { text: '통번역 통제실',     x: 38.0, y: 61.5, bg: '#2563eb' },
    { text: '인력 공급팀',       x: 63.0, y: 61.5, bg: '#0284c7' },
    { text: '선별팀',           x: 87.5, y: 61.5, bg: '#ea580c' },
  ];

  // 100% 직교(동서남북) 문·복도 동선 (bg_v3_grid.jpg 기준 — 벽·책상·화분 통과 0)
  // 각 방의 넓은 문 → 중앙 복도([50.0, 55.5]) 합류
  const TO_HALL = {
    finder:        [[15.2, 46.5], [15.2, 55.5], [26.2, 55.5], [50.0, 55.5]],
    agy:           [[82.2, 49.5], [82.2, 55.5], [73.8, 55.5], [50.0, 55.5]],
    'menu-reader': [[93.5, 49.5], [93.5, 55.5], [73.8, 55.5], [50.0, 55.5]],
    codex:         [[7.8,  91.8], [7.8,  95.8], [26.2, 95.8], [26.2, 55.5], [50.0, 55.5]],
    reviewer:      [[19.5, 91.8], [26.2, 91.8], [26.2, 55.5], [50.0, 55.5]],
    polisher:      [[38.2, 84.8], [38.2, 95.2], [50.0, 95.2], [50.0, 55.5]],
    staffing:      [[63.2, 84.8], [63.2, 95.2], [50.0, 95.2], [50.0, 55.5]],
    sorting:       [[83.2, 84.8], [83.2, 95.2], [73.8, 95.2], [73.8, 55.5], [50.0, 55.5]],
  };

  function routeToChief(id) {
    const base = TO_HALL[id];
    if (!base) return [];
    return [...base, [50.0, 51.0]];
  }

  function routeToCoffee(id) {
    const base = TO_HALL[id];
    if (!base) return [];
    // 중앙 복도 → 비서실장 왼쪽 통로(x=34.5) → 왼쪽 위 커피 머신 앞(x=16.5, y=22.5)
    return [...base, [34.5, 55.5], [34.5, 22.5], [16.5, 22.5]];
  }

  // 캡틴 전용: 의자 뒤(y=11.0)로 빠져나와 오른쪽 계단 → 오른쪽 창가 데크에서 창밖 감상 후 복귀! (책상 절대 안 밟음)
  const CAP_TO_WINDOW = [[50.0, 11.2], [61.0, 11.2], [61.0, 21.8], [82.0, 21.8]];
  const CAP_TO_DESK   = [[82.0, 21.8], [61.0, 21.8], [61.0, 11.2], [50.0, 11.2], [50.0, 14.5]];

  // 비서실장 전용: 왼쪽 통로로 커피 머신 → 캡틴 단상 왼쪽 계단으로 서빙 → 자리 복귀
  const CHIEF_TO_COFFEE   = [[50.0, 38.8], [34.5, 38.8], [34.5, 22.5], [16.5, 22.5]];
  const COFFEE_TO_CAPTAIN = [[16.5, 22.5], [35.5, 22.5], [35.5, 17.0], [41.5, 17.0]];
  const CAPTAIN_TO_CHIEF  = [[41.5, 17.0], [35.5, 17.0], [35.5, 38.8], [50.0, 38.8]];
  const CHIEF_TO_CAPTAIN  = [[50.0, 38.8], [35.5, 38.8], [35.5, 17.0], [41.5, 17.0]];

  function loadImages() {
    const imgs = { walk: {}, seated: {}, cap: {} };
    const load = (target, key, url) => new Promise(res => {
      const im = new Image();
      im.onload = () => { target[key] = im; res(); };
      im.onerror = () => res();
      im.src = url;
    });
    const jobs = [load(imgs, 'bg', '/static/office-game/assets/bg-office.webp')];
    for (const pose of ['idle', 'coffee', 'window', 'thumbs']) {
      jobs.push(load(imgs.cap, pose, `/static/office-game/assets/captain-${pose}.webp`));
    }
    imgs.walk.captain = { side: [], up: [], down: [] };
    for (let f = 1; f <= 4; f++) {
      jobs.push(load(imgs.walk.captain.side, f - 1, `/static/office-game/assets/walk/captain-${f}.webp`));
    }
    for (const id of Object.keys(CHARS)) {
      jobs.push(load(imgs, id, `/static/office-game/assets/${id}.webp`));
      if (id !== 'captain') {
        imgs.seated[id] = {};
        jobs.push(load(imgs.seated[id], 'idle', `/static/office-game/assets/seated/${id}-idle.webp`));
        jobs.push(load(imgs.seated[id], 'w1',   `/static/office-game/assets/seated/${id}-w1.webp`));
        jobs.push(load(imgs.seated[id], 'w2',   `/static/office-game/assets/seated/${id}-w2.webp`));
        imgs.walk[id] = { side: [], up: [], down: [] };
        for (let f = 1; f <= 4; f++) {
          jobs.push(load(imgs.walk[id].side, f - 1, `/static/office-game/assets/walk/${id}-${f}.webp`));
          jobs.push(load(imgs.walk[id].up,   f - 1, `/static/office-game/assets/walk/${id}-up-${f}.webp`));
          jobs.push(load(imgs.walk[id].down, f - 1, `/static/office-game/assets/walk/${id}-down-${f}.webp`));
        }
      }
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

    let imgs = { walk: {}, seated: {}, cap: {} };
    loadImages().then(loaded => { imgs = loaded; });

    const npcs = {};
    for (const [id, cfg] of Object.entries(CHARS)) {
      npcs[id] = {
        id, x: cfg.home[0], y: cfg.home[1],
        mode: 'idle', dir: cfg.seatFacing || 'down', capPose: 'idle',
        bubble: '', bubbleType: 'work', progress: null,
        carry: null, path: [], speed: 15.0, onArrive: null,
      };
    }

    let demoTimers = [];
    let isDemo = false;
    let hrMarks = [];
    let seenReports = new Set();
    let prevActive = new Set();
    let prevDoneOrder = null;
    let lastCoffeeAt = Date.now();
    let lastChiefCoffeeAt = Date.now() - 20000;
    let nextCapActAt = Date.now() + 6000;

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
      n.path = pts.map(p => [p[0], p[1]]);
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
                cap.dir = 'down';
                nextCapActAt = Date.now() + 9000;
              },
            });
          }, 5500);
        },
      });
    }

    function updateCaptainLife(now) {
      const cap = npcs.captain;
      if (cap.mode === 'done' || cap.mode === 'walk' || isDemo) return;
      if (now < nextCapActAt) return;
      if (cap.capPose === 'idle') {
        if (Math.random() < 0.55) {
          cap.capPose = 'coffee';
          cap.bubble = '☕ 커피 한 잔…';
          cap.bubbleType = 'idle';
          log('캡틴이 자리에서 커피를 마시는 중');
          nextCapActAt = now + 6500;
        } else {
          nextCapActAt = now + 15000;
          captainWindowWalk();
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
          chief.dir = 'up';
          chief.bubble = '☕ 원두 커피 추출 중…';
          setTimeout(() => {
            sendPath('claude', COFFEE_TO_CAPTAIN, {
              mode: 'coffee-walk', carry: 'coffee', bubble: '☕ 캡틴, 커피 가져왔습니다!', bubbleType: 'ok',
              onArrive: () => {
                chief.dir = 'right';
                if (cap.mode !== 'walk') {
                  cap.capPose = 'coffee';
                  cap.bubble = '☕ 고마워요! 잘 마실게요';
                  cap.bubbleType = 'ok';
                }
                log('☕ 비서실장 → 캡틴에게 커피 전달 완료');
                setTimeout(() => {
                  sendPath('claude', CAPTAIN_TO_CHIEF, {
                    mode: 'coffee-walk', carry: null, bubble: '',
                    onArrive: () => {
                      chief.mode = 'idle';
                      chief.dir = 'down';
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
      const backHome = toChief.slice().reverse();
      log(`${CHARS[id].name} → 비서실장에게 보고 이동 (${text})`);
      sendPath(id, toChief, {
        mode: 'walk', carry: 'doc', bubble: text, bubbleType: 'ok',
        onArrive: () => {
          n.dir = 'up';
          const chief = npcs.claude;
          chief.bubble = '확인했어요! ✔';
          chief.bubbleType = 'ok';
          setTimeout(() => {
            if (chief.bubble === '확인했어요! ✔') chief.bubble = '';
            sendPath(id, backHome, {
              mode: 'walk', carry: null, bubble: '',
              onArrive: () => { n.mode = 'done'; n.dir = CHARS[id].seatFacing || 'down'; n.bubble = ''; },
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
          npcs.claude.dir = 'right';
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
                npcs.claude.dir = 'down';
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
          const back = toCaf.slice().reverse();
          log(`${CHARS[id].name} 커피 휴식 이동`);
          sendPath(id, toCaf, {
            mode: 'coffee-walk', carry: null, bubble: '☕ 커피 한 잔…', bubbleType: 'idle',
            onArrive: () => {
              npcs[id].dir = 'up';
              npcs[id].carry = 'coffee';
              setTimeout(() => {
                sendPath(id, back, {
                  mode: 'coffee-walk', carry: 'coffee', bubble: '',
                  onArrive: () => { npcs[id].mode = 'idle'; npcs[id].dir = CHARS[id].seatFacing || 'down'; npcs[id].carry = null; },
                });
              }, 1300);
            },
          });
        }, idx * 900);
      });
    }

    // ---------------------------------------------------------------- 가상 22초 시연
    function stopDemo() {
      demoTimers.forEach(clearTimeout);
      demoTimers = [];
      isDemo = false;
      for (const [id, cfg] of Object.entries(CHARS)) {
        Object.assign(npcs[id], {
          x: cfg.home[0], y: cfg.home[1], mode: 'idle', dir: cfg.seatFacing || 'down', capPose: 'idle',
          bubble: '', carry: null, path: [], progress: null, onArrive: null,
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

      for (const [id, n] of Object.entries(npcs)) {
        if (id === 'captain' || n.mode === 'walk' || n.mode === 'coffee-walk') continue;
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
      if (!active.size && npcs.claude.mode === 'idle' && now - lastChiefCoffeeAt > 45000) {
        lastChiefCoffeeAt = now;
        serveCoffeeToCaptain();
      } else if (!active.size && now - lastCoffeeAt > 26000) {
        lastCoffeeAt = now;
        const idleIds = Object.keys(CHARS).filter(id => id !== 'captain' && id !== 'claude' && npcs[id].mode === 'idle');
        if (idleIds.length) coffeeStroll([idleIds[Math.floor(Math.random() * idleIds.length)]]);
      }
    }

    // ---------------------------------------------------------------- 고화질 스프라이트 렌더링
    function drawNpc(n, t) {
      const cfg = CHARS[n.id];
      const walking = n.mode === 'walk' || n.mode === 'coffee-walk';
      const working = n.mode === 'work';
      const done = n.mode === 'done';
      const frameIdx = Math.floor(t * 7.5) % 4;
      const typeIdx = Math.floor(t * 5.0) % 2;

      let im = imgs[n.id];
      let flipX = false;
      let isFullBody = walking;
      let isNorthSeated = (!walking && cfg.seatFacing === 'up');

      if (n.id === 'captain') {
        if (walking) {
          const cw = imgs.walk.captain?.side;
          im = (cw && cw[frameIdx]) ? cw[frameIdx] : (imgs.cap.idle || imgs.captain);
          flipX = (n.dir === 'left');
          isFullBody = true;
        } else {
          im = imgs.cap[n.capPose] || imgs.cap.idle || imgs.captain;
          isFullBody = (n.capPose === 'window');
        }
      } else if (walking) {
        const wset = imgs.walk[n.id];
        if (wset) {
          if (n.dir === 'up' && wset.up[frameIdx]) im = wset.up[frameIdx];
          else if (n.dir === 'down' && wset.down[frameIdx]) im = wset.down[frameIdx];
          else if (wset.side[frameIdx]) { im = wset.side[frameIdx]; flipX = (n.dir === 'left'); }
        }
      } else if (isNorthSeated) {
        // 감사실·디지털 메뉴 통제실: 모니터를 바라보고 앉은 뒷모습! (작업 시 어깨/팔 미세 타이핑 움직임)
        const upSet = imgs.walk[n.id]?.up;
        im = (upSet && upSet[1]) ? (working ? upSet[typeIdx === 0 ? 1 : 3] : upSet[1]) : imgs[n.id];
      } else {
        // 정면 책상(비서실장·미디어·번역·인력·선별): 앉은 자세 / 타이핑 2프레임
        const sset = imgs.seated[n.id];
        if (sset) {
          im = working ? (typeIdx === 0 ? sset.w1 : sset.w2) || sset.idle : sset.idle;
        }
      }
      if (!im) return;

      const cx = (n.x / 100) * W;
      const cy = (n.y / 100) * H;
      // 의자·책상 비율에 딱 맞춘 캐릭터 크기
      const targetH = (isFullBody ? 102 : isNorthSeated ? 88 : (n.id === 'captain' ? 104 : 84)) * cfg.scale;
      const targetW = targetH * (im.naturalWidth / im.naturalHeight);

      const bob = walking ? ((frameIdx % 2 === 1) ? -1.5 : 0)
        : working ? (typeIdx === 0 ? -1.2 : 0.8)
        : (n.id === 'captain' && n.capPose === 'coffee') ? Math.sin(t * 3.5) * 1.1
        : done ? -Math.abs(Math.sin(t * 5)) * 2.0
        : Math.sin(t * 2.0 + cx * 0.01) * 0.7;

      ctx.save();
      if (isFullBody) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.30)';
        ctx.beginPath();
        ctx.ellipse(cx, cy + 5, 20, 6, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      if (working) {
        const pulse = 0.24 + 0.12 * Math.sin(t * 6);
        ctx.fillStyle = `rgba(56, 189, 248, ${pulse})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy - targetH * 0.45, targetW * 0.62, targetH * 0.48, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (done && n.id !== 'captain') {
        const pulse = 0.18 + 0.09 * Math.sin(t * 4);
        ctx.fillStyle = `rgba(74, 222, 128, ${pulse})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy - targetH * 0.45, targetW * 0.54, targetH * 0.42, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.translate(cx, cy + bob);
      if (flipX) ctx.scale(-1, 1);

      if (isFullBody) {
        ctx.drawImage(im, -targetW / 2, -targetH + 6, targetW, targetH);
      } else if (isNorthSeated) {
        // 모니터를 보며 의자에 앉은 뒷모습 (하반신 65%만 그려 의자에 착석한 느낌)
        const sh = im.naturalHeight * 0.68;
        const dh = targetH * 0.68;
        ctx.drawImage(im, 0, 0, im.naturalWidth, sh, -targetW / 2, -dh + 4, targetW, dh);
      } else if (n.id === 'captain') {
        const sh = im.naturalHeight * 0.65;
        const dh = targetH * 0.65;
        ctx.drawImage(im, 0, 0, im.naturalWidth, sh, -targetW / 2, -dh + 8, targetW, dh);
      } else {
        ctx.drawImage(im, -targetW / 2, -targetH + 10, targetW, targetH);
      }

      if (n.carry === 'doc') {
        const dx = 12;
        ctx.fillStyle = 'rgba(250, 204, 21, 0.38)';
        ctx.beginPath(); ctx.arc(dx + 7, -targetH * 0.50, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 2;
        ctx.fillRect(dx, -targetH * 0.58, 14, 18);
        ctx.strokeRect(dx, -targetH * 0.58, 14, 18);
      } else if (n.carry === 'coffee') {
        const dx = 12;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 2;
        ctx.fillRect(dx, -targetH * 0.48, 10, 12);
        ctx.strokeRect(dx, -targetH * 0.48, 10, 12);
      }

      ctx.restore();

      // 핵심: 정면 책상에 앉아 있을 때 책상 앞판(deskMask)을 캐릭터 하반신 위에 덮어 '진짜 책상 뒤에 앉은' 입체감 구현!
      if (!isFullBody && cfg.deskMask && imgs.bg) {
        const [x1, y1, x2, y2] = cfg.deskMask;
        const sx = (x1 / 100) * W, sy = (y1 / 100) * H;
        const sw = ((x2 - x1) / 100) * W, sh = ((y2 - y1) / 100) * H;
        ctx.drawImage(imgs.bg, sx, sy, sw, sh, sx, sy, sw, sh);
      }
    }

    // ---------------------------------------------------------------- 60fps 메인 루프
    let lastTs = performance.now();
    let rafId = 0;

    function tick(now) {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      const t = now / 1000;

      updateCaptainLife(Date.now());

      for (const n of Object.values(npcs)) {
        if (!n.path.length) continue;
        const [tx, ty] = n.path[0];
        const dx = tx - n.x, dy = ty - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist <= n.speed * dt + 0.25) {
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
          if (Math.abs(dy) >= Math.abs(dx)) {
            n.dir = dy < 0 ? 'up' : 'down';
          } else {
            n.dir = dx >= 0 ? 'right' : 'left';
          }
        }
      }

      ctx.clearRect(0, 0, W, H);
      if (imgs.bg) ctx.drawImage(imgs.bg, 0, 0, W, H);
      else { ctx.fillStyle = '#1e293b'; ctx.fillRect(0, 0, W, H); }

      const list = Object.values(npcs).sort((a, b) => a.y - b.y);
      for (const n of list) drawNpc(n, t);

      let workingCount = 0;
      for (const [id, n] of Object.entries(npcs)) {
        if (n.mode === 'work' || n.mode === 'walk') workingCount++;
        const tag = tagEls[id];
        const bub = bubEls[id];
        const walking = n.mode === 'walk' || n.mode === 'coffee-walk';

        tag.style.left = `${n.x}%`;
        tag.style.top = `${n.y + (walking ? 1.5 : 2.2)}%`;
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
      workChip.textContent = workingCount ? `일하는 직원 ${workingCount}명` : '전원 대기 중';

      const hrHtml = hrMarks.map(([c, txt]) => `<span class="${c}">${txt}</span>`).join('');
      if (hrBox.dataset.h !== hrHtml) { hrBox.innerHTML = hrHtml; hrBox.dataset.h = hrHtml; }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    canvas.addEventListener('click', e => {
      const rect = canvas.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      let hit = null, best = 7.5;
      for (const n of Object.values(npcs)) {
        const d = Math.hypot(px - n.x, py - (n.y - 4));
        if (d < best) { best = d; hit = n.id; }
      }
      if (hit && opts.onSelect) opts.onSelect(hit, npcs[hit], CHARS[hit]);
    });

    return {
      syncReal,
      runDemo,
      stopDemo,
      coffeeStroll: () => coffeeStroll(),
      serveCoffeeToCaptain,
      captainWindowWalk,
      destroy: () => { stopDemo(); cancelAnimationFrame(rafId); },
      CHARS,
    };
  }

  window.OfficeGame = { create, CHARS };
})();
