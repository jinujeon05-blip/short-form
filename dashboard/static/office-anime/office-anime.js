// Jinwoo 에이전트 — 12프레임 고화질 웹툰/애니 사무실 (4명 선행 시연: 캡틴·비서실장·시각 정보 비서·메뉴 검사관)
(() => {
  const W = 2560, H = 1440; // 16:9 QHD 2K 고화질 (전체화면 선명도 보장)

  // bg-office.webp (cutaway 2560x1440) 픽셀 실측 착석 좌표 (headTopY=머리 꼭대기, clipY=책상 상단 경계선, standPos=대화 시 의자 옆 바닥에 서는 위치!)
  const CHARS = {
    captain:    { name: '캡틴',          role: '결재',        home: [50.0, 18.5], standPos: [55.5, 18.5], facing: 'front', scale: 1.0,  seat: { x: 50.0, headTopY: 6.4,  clipY: 13.0, h: 240 } },
    claude:     { name: '비서실장',      role: '지휘',        home: [50.0, 39.0], standPos: [44.2, 36.5], facing: 'front', scale: 0.96, seat: { x: 50.0, headTopY: 27.6, clipY: 33.4, h: 225 } },
    finder:     { name: '시각 정보 비서', role: '사진 고르기', home: [14.8, 45.0], standPos: [19.8, 41.5], facing: 'front', scale: 0.94, seat: { x: 14.8, headTopY: 33.2, clipY: 39.2, h: 225 } },
    agy:        { name: '메뉴 검사관',   role: '메뉴판 읽기', home: [82.4, 49.0], standPos: [77.2, 49.8], facing: 'back',  scale: 0.96, seat: { x: 82.4, headTopY: 35.8, clipY: 46.2, h: 220 } },
    translator: { name: '수석 번역관',   role: '4개국어 번역', home: [36.8, 76.8], standPos: [42.6, 76.8], facing: 'front', scale: 0.95, seat: { x: 36.8, headTopY: 67.4, clipY: 74.4, h: 235 } },
    sorter:     { name: '선별팀 팀장',   role: '자료 선별',   home: [83.4, 77.0], standPos: [77.2, 77.0], facing: 'front', scale: 0.95, seat: { x: 83.4, headTopY: 68.2, clipY: 74.7, h: 230 } },
    inspector:  { name: '운영 감찰관',   role: '두 번째 검토', home: [7.7,  86.2], standPos: [13.2, 86.8], facing: 'back',  scale: 0.95, seat: { x: 7.7,  headTopY: 72.2, clipY: 83.0, h: 220 } },
    staffing:   { name: '인력 공급팀',   role: '인력·일정 관리', home: [64.4, 76.8], standPos: [58.0, 76.8], facing: 'front', scale: 0.95, seat: { x: 64.4, headTopY: 67.6, clipY: 74.4, h: 230 } },
    reader:     { name: '자료 해석 비서', role: '메뉴판 해석',  asset: 'auditor', home: [92.2, 49.0], standPos: [87.2, 50.0], facing: 'back',  scale: 0.96, seat: { x: 92.2, headTopY: 35.8, clipY: 46.2, h: 220 } },
    auditor:    { name: '데이터 감사관', role: '마지막 점검',  asset: 'reader',  home: [18.6, 86.2], standPos: [24.5, 87.2], facing: 'back',  scale: 0.95, seat: { x: 18.6, headTopY: 72.2, clipY: 83.0, h: 220 } },
  };

  // Y-깊이(앞/뒤 가림) 전경 가구 목록 (7개 방 모든 책상·의자 완비!):
  // 캐릭터의 발 위치(y)가 sortY보다 위(뒤)면 가구가 다리를 가리고, 아래(앞)면 캐릭터가 가구 앞에 서게 됨!
  const PROPS = [
    { key: 'captain-desk',      x0: 42.6, y0: 12.8, x1: 58.0, y1: 22.8, sortY: 22.4 },
    { key: 'claude-desk',       x0: 42.8, y0: 33.2, x1: 57.5, y1: 43.8, sortY: 43.4 },
    { key: 'finder-desk',       x0:  9.2, y0: 39.0, x1: 19.6, y1: 47.6, sortY: 47.2 },
    { key: 'red-left-desk',     x0: 77.2, y0: 39.2, x1: 86.4, y1: 46.8, sortY: 46.4 },
    { key: 'red-right-desk',    x0: 87.5, y0: 39.2, x1: 96.7, y1: 46.8, sortY: 46.4 },
    { key: 'agy-chair',         x0: 80.5, y0: 40.5, x1: 84.3, y1: 50.2, sortY: 49.5 },
    { key: 'red-right-chair',   x0: 90.2, y0: 40.5, x1: 94.2, y1: 50.2, sortY: 49.5 },
    { key: 'purple-left-desk',  x0:  3.5, y0: 74.5, x1: 12.6, y1: 84.2, sortY: 83.8 },
    { key: 'purple-right-desk', x0: 14.4, y0: 74.5, x1: 23.4, y1: 84.2, sortY: 83.8 },
    { key: 'purple-left-chair', x0:  5.8, y0: 76.5, x1:  9.8, y1: 87.5, sortY: 87.0 },
    { key: 'purple-right-chair',x0: 16.6, y0: 76.5, x1: 20.6, y1: 87.5, sortY: 87.0 },
    { key: 'navy-desk',         x0: 31.3, y0: 74.2, x1: 42.3, y1: 84.5, sortY: 84.0 },
    { key: 'sky-desk',          x0: 59.3, y0: 74.2, x1: 69.8, y1: 84.5, sortY: 84.0 },
    { key: 'orange-desk',       x0: 79.1, y0: 74.5, x1: 88.2, y1: 84.5, sortY: 84.0 },
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
    transToHall:  [[36.8, 76.8], [43.2, 76.8], [43.2, 81.2], [49.8, 81.2], [49.8, 56.0]],
    hallToTrans:  [[49.8, 56.0], [49.8, 81.2], [43.2, 81.2], [43.2, 76.8], [36.8, 76.8]],
    sorterToHall: [[83.4, 77.0], [76.5, 77.0], [76.5, 51.0], [66.0, 51.0]],
    hallToSorter: [[66.0, 51.0], [76.5, 51.0], [76.5, 77.0], [83.4, 77.0]],
    inspToHall:   [[7.7,  88.0], [24.6, 88.0], [24.6, 50.5], [34.0, 50.5]],
    hallToInsp:   [[34.0, 50.5], [24.6, 50.5], [24.6, 88.0], [7.7,  88.0]],
    staffToHall:  [[64.4, 76.8], [57.2, 76.8], [57.2, 81.2], [50.2, 81.2], [50.2, 59.0]],
    hallToStaff:  [[50.2, 59.0], [50.2, 81.2], [57.2, 81.2], [57.2, 76.8], [64.4, 76.8]],
    readerToHall: [[92.2, 50.8], [74.5, 50.8], [58.5, 50.8]],
    hallToReader: [[58.5, 50.8], [74.5, 50.8], [92.2, 50.8]],
    auditToHall:  [[18.6, 88.0], [24.6, 88.0], [24.6, 50.5], [38.5, 50.5]],
    hallToAudit:  [[38.5, 50.5], [24.6, 50.5], [24.6, 88.0], [18.6, 88.0]],
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
      imgs.walk[id] = { east: [], front: [], back: [], se: [], ne: [], greet: [], coffee: [], water: [], clean: [], dance: [], sweep: [] };
      const dirs = id === 'captain' ? ['east', 'front', 'back', 'se', 'ne', 'greet', 'coffee']
        : id === 'claude' ? ['east', 'front', 'back', 'dance']
        : id === 'reader' ? ['east', 'front', 'back', 'dance']
        : id === 'sorter' ? ['east', 'front', 'back', 'water']
        : id === 'staffing' ? ['east', 'front', 'back', 'clean']
        : id === 'inspector' ? ['east', 'front', 'back', 'sweep']
        : ['east', 'front', 'back'];
      const assetId = cfg.asset || id;
      for (const dir of dirs) {
        for (let i = 1; i <= 12; i++) {
          const v = id === 'captain' ? 'cap8dir' : (dir === 'water' || dir === 'clean' || dir === 'dance' || dir === 'sweep') ? 'act3' : 'orig2k';
          jobs.push(load(imgs.walk[id][dir], i - 1, `/static/office-anime/assets/walk/${assetId}-${dir}-${i}.webp?v=${v}`));
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
        <div class="oa-rot-wrap">
          <canvas class="oa-canvas" width="${W}" height="${H}"></canvas>
          <div class="oa-hud"></div>
          <div class="oa-joy" data-joy aria-label="캡틴 이동 조이스틱"><div class="oa-joy-knob" data-joy-knob></div></div>
          <div class="oa-rpg-hud">
            <span class="oa-rpg-pill" data-rpg-stat>👑 <b>Lv.1</b> 캡틴 · 퀘스트 <span class="oa-rpg-qcnt zero" data-qcnt>0</span></span>
            <button type="button" class="oa-snd-btn on" data-sfx-btn title="게임 효과음 켜기/끄기">🔊 효과음</button>
            <button type="button" class="oa-snd-btn" data-bgm-btn title="잔잔한 사무실 BGM 켜기/끄기">🎵 BGM</button>
          </div>
          <div class="oa-cap-acts" data-cap-acts>
            <button type="button" class="oa-c-btn" data-cap-greet>👋 인사</button>
            <button type="button" class="oa-c-btn" data-cap-coffee>☕ 커피</button>
            <button type="button" class="oa-c-btn" data-cap-sit>🪑 착석</button>
          </div>
          <div class="oa-ctrl-hint">🎮 캡틴 조작: 방향키 / WASD 이동 · 바닥 클릭 · 1 인사 · 2 커피 · E 자리 복귀</div>
          <div class="oa-brief-bar">
            <button type="button" class="oa-b-btn dance" data-brief-dance>💃 댄스</button>
            <button type="button" class="oa-b-btn cof" data-brief-cof>☕ 서빙</button>
            <button type="button" class="oa-b-btn start" data-brief-start>📋 보고해</button>
            <button type="button" class="oa-b-btn stop" data-brief-stop hidden>✋ 오늘은 여기까지 하지</button>
          </div>
          <button type="button" class="oa-fs-btn" title="전체화면 전환">⛶ 전체화면</button>
          <div class="oa-modal-back" hidden><div class="oa-modal"></div></div>
        </div>
      </div>`;
    const stage = root.querySelector('.oa-stage');
    const canvas = root.querySelector('.oa-canvas');
    const hud = root.querySelector('.oa-hud');
    const fsBtn = root.querySelector('.oa-fs-btn');
    const modalBack = root.querySelector('.oa-modal-back');
    const modal = root.querySelector('.oa-modal');

    // ---------------------------------------------------------------- 모바일 가로 자동 회전 + 화면 꺼짐 방지(Wake Lock + NoSleep) + 뒤로가기 키 종료
    let wakeLock = null;
    let fakeFs = false;
    let fsHistoryPushed = false;
    let keepAwakeVideo = null;

    // HTTP LAN(8900) 환경에서도 화면이 꺼지지 않도록 초소형 무음 루프 비디오 폴백 생성
    function startNoSleepFallback() {
      try {
        if (!keepAwakeVideo) {
          const v = document.createElement('video');
          v.setAttribute('playsinline', '');
          v.setAttribute('muted', '');
          v.muted = true;
          v.loop = true;
          v.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0.001;pointer-events:none;bottom:0;right:0;';
          // 1x1 초소형 무음 MP4 (NoSleep 표준 방식)
          v.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAu1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjY0MyA1YzY1NzA0IC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlyaWdodCAyMDAzLTIwMTUgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz0xIGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBiX3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29wPTAgd2VpZ2h0cD0yIGtleWludD0yNTAga2V5aW50X21pbj0yNSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjMuMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgZWRpdD0wIHRlbXBvcmFsX212cD0wIGlxX3JhdGlvPTEuNDAgcGJfcmF0aW89MS4zMCBhcT0xOjEuMDAgAIAAAAF6ZAAABQAAAACAAAAA';
          document.body.appendChild(v);
          keepAwakeVideo = v;
        }
        keepAwakeVideo.play().catch(() => {});
      } catch {}
    }

    async function acquireWakeLock() {
      try {
        if ('wakeLock' in navigator && !wakeLock) {
          wakeLock = await navigator.wakeLock.request('screen');
          wakeLock.addEventListener('release', () => { wakeLock = null; });
        }
      } catch {}
      startNoSleepFallback();
    }

    function releaseWakeLock() {
      try { if (wakeLock) { wakeLock.release().catch(() => {}); wakeLock = null; } } catch {}
      try { if (keepAwakeVideo) { keepAwakeVideo.pause(); } } catch {}
    }

    function updateMobileRotClass() {
      const isActive = !!document.fullscreenElement || fakeFs;
      const isPortraitMobile = (window.innerHeight > window.innerWidth) && (window.innerWidth <= 920);
      stage.classList.toggle('oa-fs-rot', isActive && isPortraitMobile);
      stage.classList.toggle('oa-fs-mock', fakeFs && !isPortraitMobile);
      fsBtn.textContent = isActive ? '✕ 전체화면 닫기' : '⛶ 전체화면';
    }

    async function enterFullscreen() {
      await acquireWakeLock();
      // 모바일 뒤로가기 키를 눌렀을 때 페이지 이탈 대신 전체화면만 닫히게 히스토리 1칸 추가
      if (!fsHistoryPushed) {
        try { history.pushState({ oaFs: 1 }, ''); fsHistoryPushed = true; } catch {}
      }
      let nativeOk = false;
      try {
        if (stage.requestFullscreen) {
          await stage.requestFullscreen();
          nativeOk = true;
        } else if (stage.webkitRequestFullscreen) {
          stage.webkitRequestFullscreen();
          nativeOk = true;
        }
      } catch {}
      if (!nativeOk) fakeFs = true;
      // 안드로이드 등 지원 기기에서는 OS 가로 회전 자동 잠금!
      try {
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape');
        }
      } catch {}
      updateMobileRotClass();
    }

    async function exitFullscreen(fromPopState = false) {
      fakeFs = false;
      stage.classList.remove('oa-fs-rot', 'oa-fs-mock');
      releaseWakeLock();
      try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch {}
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else if (document.webkitFullscreenElement && document.webkitExitFullscreen) document.webkitExitFullscreen();
      } catch {}
      if (!fromPopState && fsHistoryPushed) {
        fsHistoryPushed = false;
        try { if (history.state && history.state.oaFs) history.back(); } catch {}
      } else {
        fsHistoryPushed = false;
      }
      updateMobileRotClass();
    }

    fsBtn.addEventListener('click', () => {
      if (!document.fullscreenElement && !fakeFs) enterFullscreen();
      else exitFullscreen(false);
    });
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && !fakeFs) {
        releaseWakeLock();
        try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch {}
        fsHistoryPushed = false;
      }
      updateMobileRotClass();
    });
    window.addEventListener('resize', updateMobileRotClass);
    window.addEventListener('popstate', () => {
      if (document.fullscreenElement || fakeFs) {
        exitFullscreen(true);
      }
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && (document.fullscreenElement || fakeFs)) {
        acquireWakeLock();
      }
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

    // ---------------------------------------------------------------- 게임 효과음(Web Audio) + 잔잔한 로파이 BGM + 폰 진동 + 황금 파티클/EXP 연출
    let sfxOn = (localStorage.getItem('jinwoo_oa_sfx') !== '0');
    let bgmOn = false;
    let actx = null, bgmTimer = null;
    const sfxBtn = root.querySelector('[data-sfx-btn]');
    const bgmBtn = root.querySelector('[data-bgm-btn]');
    const rpgStatEl = root.querySelector('[data-rpg-stat]');
    if (sfxBtn) { sfxBtn.classList.toggle('on', sfxOn); sfxBtn.textContent = sfxOn ? '🔊 효과음' : '🔇 무음'; }

    function ensureAudio() {
      if (!actx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) actx = new AC();
      }
      if (actx && actx.state === 'suspended') actx.resume().catch(() => {});
      return actx;
    }
    function tone(freq, dur, type = 'triangle', vol = 0.08, delay = 0) {
      if (!sfxOn) return;
      const c = ensureAudio();
      if (!c) return;
      const now = c.currentTime + delay;
      const o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(vol, now + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      o.connect(g); g.connect(c.destination);
      o.start(now); o.stop(now + dur + 0.02);
    }
    const SFX = {
      tap:     () => { tone(580, 0.08, 'triangle', 0.07); tone(820, 0.09, 'triangle', 0.06, 0.05); navigator.vibrate?.(12); },
      send:    () => { tone(523, 0.09, 'triangle', 0.08); tone(659, 0.09, 'triangle', 0.08, 0.07); tone(784, 0.14, 'triangle', 0.09, 0.14); navigator.vibrate?.([15, 25, 20]); },
      fanfare: () => {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i === 3 ? 0.42 : 0.12, 'triangle', 0.10, i * 0.09));
        tone(659.25, 0.42, 'sine', 0.06, 0.27);
        tone(783.99, 0.42, 'sine', 0.06, 0.27);
        navigator.vibrate?.([20, 35, 20, 35, 45]);
      },
      step:    () => { tone(190, 0.03, 'sine', 0.018); },
    };

    // 20초 무이음 루프 애니 오피스·카페 Lo-Fi BGM (bgm-office.ogg, 사파리용 .m4a 폴백 — Web Audio 완전 무이음 루프!)
    let bgmBuf = null, bgmSrc = null, bgmGain = null, bgmLoading = false;
    async function loadBgmBuffer(c) {
      if (bgmBuf) return bgmBuf;
      const probe = document.createElement('audio');
      const urls = probe.canPlayType('audio/ogg; codecs="vorbis"')
        ? ['/static/office-anime/assets/bgm-office.ogg?v=1', '/static/office-anime/assets/bgm-office.m4a?v=1']
        : ['/static/office-anime/assets/bgm-office.m4a?v=1', '/static/office-anime/assets/bgm-office.ogg?v=1'];
      for (const u of urls) {
        try {
          const res = await fetch(u);
          if (!res.ok) continue;
          const ab = await res.arrayBuffer();
          bgmBuf = await c.decodeAudioData(ab);
          return bgmBuf;
        } catch {}
      }
      return null;
    }
    function stopBgmNode() {
      if (bgmGain && actx) {
        try {
          const now = actx.currentTime;
          bgmGain.gain.cancelScheduledValues(now);
          bgmGain.gain.setValueAtTime(bgmGain.gain.value, now);
          bgmGain.gain.linearRampToValueAtTime(0.0001, now + 0.25);
        } catch {}
      }
      const oldSrc = bgmSrc;
      bgmSrc = null;
      if (oldSrc) setTimeout(() => { try { oldSrc.stop(); oldSrc.disconnect(); } catch {} }, 280);
    }
    async function toggleBgm() {
      bgmOn = !bgmOn;
      bgmBtn?.classList.toggle('on', bgmOn);
      if (!bgmOn) { stopBgmNode(); return; }
      const c = ensureAudio();
      if (!c || bgmLoading) return;
      bgmLoading = true;
      const buf = await loadBgmBuffer(c);
      bgmLoading = false;
      if (!buf || !bgmOn) return;
      stopBgmNode();
      const src = c.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const g = c.createGain();
      const now = c.currentTime;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(0.42, now + 0.4);
      src.connect(g); g.connect(c.destination);
      src.start(0);
      bgmSrc = src; bgmGain = g;
    }
    document.addEventListener('visibilitychange', () => {
      if (!bgmGain || !actx || !bgmOn) return;
      const now = actx.currentTime;
      bgmGain.gain.setTargetAtTime(document.hidden ? 0.0001 : 0.42, now, 0.15);
    });
    sfxBtn?.addEventListener('click', () => {
      sfxOn = !sfxOn;
      try { localStorage.setItem('jinwoo_oa_sfx', sfxOn ? '1' : '0'); } catch {}
      sfxBtn.classList.toggle('on', sfxOn);
      sfxBtn.textContent = sfxOn ? '🔊 효과음' : '🔇 무음';
      if (sfxOn) SFX.tap();
    });
    bgmBtn?.addEventListener('click', toggleBgm);

    // 황금 파티클 + 플로팅 +EXP 연출
    const bursts = []; // { x, y, vx, vy, life, max, color, size }
    const floats = []; // { x, y, text, life, max }
    let bonusExp = parseInt(localStorage.getItem('jinwoo_oa_exp') || '0', 10) || 0;
    let totalStoresCount = 0;
    let activeQuests = {}; // { [oaId]: { type:'exc'|'ask', title, actionLabel, orderId?, shopName? } }

    function updateRpgHud() {
      if (!rpgStatEl) return;
      const exp = totalStoresCount * 100 + bonusExp;
      const lv = Math.max(1, Math.floor(exp / 1000) + 1);
      const qCount = Object.keys(activeQuests).length;
      const shopPart = totalStoresCount > 0 ? ` · 🏪 ${totalStoresCount}호점` : '';
      rpgStatEl.innerHTML = `👑 <b>Lv.${lv}</b> 캡틴${shopPart} · 퀘스트 <span class="oa-rpg-qcnt${qCount ? '' : ' zero'}">${qCount}</span>`;
    }

    function spawnBurst(xp, yp, label = '+100 EXP', expGain = 100) {
      if (expGain > 0) {
        bonusExp += expGain;
        try { localStorage.setItem('jinwoo_oa_exp', String(bonusExp)); } catch {}
        updateRpgHud();
      }
      const cx = (xp / 100) * W, cy = ((yp - 8) / 100) * H;
      const colors = ['#fde047', '#f59e0b', '#fef08a', '#4ade80', '#38bdf8'];
      for (let i = 0; i < 26; i++) {
        const ang = (Math.PI * 2 * i) / 26 + (Math.random() - 0.5) * 0.3;
        const spd = 110 + Math.random() * 210;
        bursts.push({
          x: cx, y: cy, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd - 70,
          life: 0, max: 0.85 + Math.random() * 0.45,
          color: colors[i % colors.length], size: 5 + Math.random() * 6
        });
      }
      if (label) floats.push({ x: cx, y: cy - 20, text: label, life: 0, max: 1.45 });
    }

    hud.innerHTML =
      SIGNS.map(s => `<span class="oa-sign" style="left:${s.x}%;top:${s.y}%;background:${s.bg}">${s.text}</span>`).join('') +
      Object.entries(CHARS).map(([id, c]) =>
        `<div class="oa-tag" data-tag="${id}"><b>${c.name}</b><small>${c.role}</small></div>
         <div class="oa-quest" data-q="${id}" hidden>!</div>
         <div class="oa-bub" data-bub="${id}" hidden></div>`
      ).join('');

    const tagEls = {}, bubEls = {}, questEls = {};
    for (const id of Object.keys(CHARS)) {
      tagEls[id] = hud.querySelector(`[data-tag="${id}"]`);
      bubEls[id] = hud.querySelector(`[data-bub="${id}"]`);
      questEls[id] = hud.querySelector(`[data-q="${id}"]`);
    }
    updateRpgHud();

    const log = m => { if (opts.onLog) opts.onLog(m); };

    // 착석 시 항상 정확한 home 좌표(의자 등받이 sortY 뒤쪽!)로 안착시켜 의자가 등을 완벽하게 가리도록 보장!
    function seatNpc(id) {
      const n = npcs[id], c = CHARS[id];
      if (!n || !c) return;
      n.x = c.home[0];
      n.y = c.home[1];
      n.mode = 'idle';
      n.dir = c.facing;
      n.bubble = '';
    }

    function sendPath(id, pts, { bubble = '', bubbleType = '', onArrive = null } = {}) {
      const n = npcs[id];
      n.path = pts.map(p => [p[0], p[1]]);
      n.mode = 'walk';
      n.bubble = bubble;
      n.bubbleType = bubbleType;
      n.onArrive = onArrive;
    }

    function serveCoffee() {
      if (briefingActive) return;
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
      if (briefingActive) return;
      const cap = npcs.captain;
      if (cap.mode === 'walk') return;
      log('🚶 캡틴이 계단·통로를 따라 오른쪽 테라스로 산책');
      walkCaptainSafe(82.0, 22.5, {
        bubble: '잠시 바람 좀 쐬어야지…',
        onArrive: () => {
          cap.mode = 'stand'; cap.dir = 'back'; cap.bubble = '창밖을 바라보는 중…';
          setTimeout(() => {
            walkCaptainSafe(CHARS.captain.home[0], CHARS.captain.home[1], {
              bubble: '',
              onArrive: () => { cap.mode = 'idle'; cap.dir = 'front'; },
            });
          }, 3800);
        },
      });
    }

    function hallChat() {
      if (briefingActive) return;
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
              onArrive: () => seatNpc('finder'),
            });
            sendPath('agy', [...ROUTES.agyToHall.slice().reverse(), CHARS.agy.home], {
              onArrive: () => seatNpc('agy'),
            });
          }, 2500);
        }, 2500);
      };
      sendPath('finder', ROUTES.finderToHall, { onArrive: () => { if (++ready === 2) talk(); } });
      sendPath('agy', ROUTES.agyToHall, { onArrive: () => { if (++ready === 2) talk(); } });
    }

    function transConsult() {
      if (briefingActive) return;
      const tr = npcs.translator;
      if (!tr || tr.mode === 'walk') return;
      log('🌐 수석 번역관이 번역 톤 상의를 위해 중앙 복도로 이동');
      sendPath('translator', ROUTES.transToHall, {
        bubble: '🌐 메뉴 번역 톤 상의하러 가는 중…',
        onArrive: () => {
          tr.dir = 'back'; tr.bubble = '💬 베트남어·영어 메뉴 표현 확인 완료!'; tr.bubbleType = 'ok';
          setTimeout(() => {
            sendPath('translator', ROUTES.hallToTrans, {
              bubble: '↩ 통번역 통제실 복귀',
              onArrive: () => { tr.mode = 'idle'; tr.dir = 'front'; tr.bubble = ''; }
            });
          }, 2600);
        }
      });
    }

    function sorterCheck() {
      if (briefingActive) return;
      const sr = npcs.sorter;
      if (!sr || sr.mode === 'walk') return;
      log('📦 선별팀 팀장이 자료 분류 보고를 위해 중앙 복도로 이동');
      sendPath('sorter', ROUTES.sorterToHall, {
        bubble: '📦 메뉴 원본 자료 선별 완료 보고 중…',
        onArrive: () => {
          sr.dir = 'west'; sr.bubble = '✅ 1차 자료 선별 완료! 바로 전달했습니다'; sr.bubbleType = 'ok';
          setTimeout(() => {
            sendPath('sorter', ROUTES.hallToSorter, {
              bubble: '↩ 선별팀 복귀',
              onArrive: () => { sr.mode = 'idle'; sr.dir = 'front'; sr.bubble = ''; }
            });
          }, 2600);
        }
      });
    }

    function inspCheck() {
      if (briefingActive) return;
      const ins = npcs.inspector;
      if (!ins || ins.mode === 'walk') return;
      log('🛡️ 운영 감찰관이 배포 전 교차 검토 보고를 위해 복도로 이동');
      sendPath('inspector', ROUTES.inspToHall, {
        bubble: '🛡️ 배포 전 최종 교차 감찰 진행 중…',
        onArrive: () => {
          ins.dir = 'east'; ins.bubble = '✅ 2차 운영 감찰 이상 없음! 통과입니다'; ins.bubbleType = 'ok';
          setTimeout(() => {
            if (briefingActive) return;
            sendPath('inspector', ROUTES.hallToInsp, {
              bubble: '↩ 감사실 복귀',
              onArrive: () => seatNpc('inspector')
            });
          }, 2600);
        }
      });
    }

    function staffCheck() {
      if (briefingActive) return;
      const st = npcs.staffing;
      if (!st || st.mode === 'walk') return;
      log('📅 인력 공급팀 팀장이 주·야간 인력 보고를 위해 복도로 이동');
      sendPath('staffing', ROUTES.staffToHall, {
        bubble: '📅 오늘 주·야간 출근 인력 현황 보고 중…',
        onArrive: () => {
          st.dir = 'back'; st.bubble = '✅ 거래처 14명 배치 완료! 이상 없습니다'; st.bubbleType = 'ok';
          setTimeout(() => {
            if (briefingActive) return;
            sendPath('staffing', ROUTES.hallToStaff, {
              bubble: '↩ 인력 공급팀 복귀',
              onArrive: () => { st.mode = 'idle'; st.dir = 'front'; st.bubble = ''; }
            });
          }, 2600);
        }
      });
    }

    function readerCheck() {
      if (briefingActive) return;
      const rd = npcs.reader;
      if (!rd || rd.mode === 'walk') return;
      log('📑 자료 해석 비서가 메뉴판 텍스트 추출 결과를 들고 복도로 이동');
      sendPath('reader', ROUTES.readerToHall, {
        bubble: '📑 메뉴판 원문·가격 데이터 해석 완료!',
        onArrive: () => {
          rd.dir = 'west'; rd.bubble = '✅ JSON 메뉴 데이터 번역팀에 전달했습니다'; rd.bubbleType = 'ok';
          setTimeout(() => {
            if (briefingActive) return;
            sendPath('reader', ROUTES.hallToReader, {
              bubble: '↩ 디지털 메뉴 통제실 복귀',
              onArrive: () => seatNpc('reader')
            });
          }, 2600);
        }
      });
    }

    function auditorCheck() {
      if (briefingActive) return;
      const au = npcs.auditor;
      if (!au || au.mode === 'walk') return;
      log('📊 데이터 감사관이 최종 품질 점검 보고를 위해 복도로 이동');
      sendPath('auditor', ROUTES.auditToHall, {
        bubble: '📊 전 가게 데이터·링크 무결성 최종 감사 중…',
        onArrive: () => {
          au.dir = 'east'; au.bubble = '✅ 최종 데이터 감사 100% 통과! 배포 가능'; au.bubbleType = 'ok';
          setTimeout(() => {
            if (briefingActive) return;
            sendPath('auditor', ROUTES.hallToAudit, {
              bubble: '↩ 감사실 복귀',
              onArrive: () => seatNpc('auditor')
            });
          }, 2600);
        }
      });
    }

    function runDemo() {
      serveCoffee();
      setTimeout(hallChat, 1200);
      setTimeout(transConsult, 2200);
      setTimeout(sorterCheck, 3200);
      setTimeout(inspCheck, 4200);
      setTimeout(staffCheck, 5200);
      setTimeout(readerCheck, 5800);
      setTimeout(auditorCheck, 6200);
      setTimeout(captainWalk, 6800);
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
        fIdx = n.emoteLoop ? (Math.floor(elapsed * 5.0) % 12) : Math.min(11, Math.floor(elapsed * 4.0));
      } else if (walking) {
        fIdx = Math.floor(n.walkDist * 1.05) % 12;
      }

      let dirKey = 'front', flipX = false;
      if (emoting) { dirKey = n.emote; flipX = (n.dir === 'west'); }
      else if (n.dir === 'east') { dirKey = 'east'; }
      else if (n.dir === 'west') { dirKey = 'east'; flipX = true; }
      else if (n.dir === 'se' && wset.se?.length) { dirKey = 'se'; }
      else if (n.dir === 'sw' && wset.se?.length) { dirKey = 'se'; flipX = true; }
      else if (n.dir === 'ne' && wset.ne?.length) { dirKey = 'ne'; }
      else if (n.dir === 'nw' && wset.ne?.length) { dirKey = 'ne'; flipX = true; }
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

      // 캡틴에게 공손히 허리 숙여 인사하는 보우(Bow) 모션!
      let bowScaleY = 1, bowScaleX = 1;
      if (n.bowStart && n.bowUntil && t < n.bowUntil) {
        const p = Math.min(1, Math.max(0, (t - n.bowStart) / (n.bowUntil - n.bowStart)));
        const dip = Math.sin(p * Math.PI); // 0 -> 1 -> 0 부드러운 인사 곡선
        bowScaleY = 1 - dip * 0.14;
        bowScaleX = 1 + dip * 0.04;
      }

      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.28)';
      ctx.beginPath(); ctx.ellipse(cx, cy + 6, 26, 7.5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.translate(cx, cy + bob);
      ctx.scale((flipX ? -1 : 1) * bowScaleX, bowScaleY);
      ctx.drawImage(im, -targetW / 2, -targetH, targetW, targetH);
      ctx.restore();
    }

    // ---------------------------------------------------------------- 캡틴 직접 게임 조작 (WASD / 방향키 / 가상 엄지 조이스틱 / 바닥 클릭 / E 착석)
    const keys = new Set();
    let joyVec = { x: 0, y: 0 };
    let clickRing = null; // { x, y, born }

    // 가상 엄지 조이스틱 (볼 모양 드래그 — 모바일 90도 회전 상태에서도 방향 정확 변환!)
    const joyEl = root.querySelector('[data-joy]');
    const joyKnob = root.querySelector('[data-joy-knob]');
    let joyPtr = null;
    const JOY_MAX = 26;
    function updateJoy(clientX, clientY) {
      const r = joyEl.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      let dx = clientX - cx, dy = clientY - cy;
      if (stage.classList.contains('oa-fs-rot')) {
        // 90도 시계방향 회전 시 화면 터치 델타를 회전된 게임 좌표계로 변환
        const rdx = dy, rdy = -dx;
        dx = rdx; dy = rdy;
      }
      const dist = Math.hypot(dx, dy);
      const clamped = Math.min(JOY_MAX, dist);
      const nx = dist > 4 ? (dx / dist) : 0;
      const ny = dist > 4 ? (dy / dist) : 0;
      joyKnob.style.transform = `translate(${nx * clamped}px, ${ny * clamped}px)`;
      joyVec = { x: nx * (clamped / JOY_MAX), y: ny * (clamped / JOY_MAX) };
      if (dist > 4) {
        const cap = npcs.captain;
        if (cap.path.length) { cap.path = []; cap.onArrive = null; }
        if (cap.mode === 'emote') { cap.emote = null; cap.mode = 'stand'; }
        cap.bubble = '';
      }
    }
    function resetJoy() {
      joyPtr = null;
      joyVec = { x: 0, y: 0 };
      joyEl.classList.remove('active');
      joyKnob.style.transform = 'translate(0px, 0px)';
    }
    joyEl.addEventListener('pointerdown', e => {
      e.preventDefault(); e.stopPropagation();
      joyPtr = e.pointerId;
      joyEl.classList.add('active');
      joyEl.setPointerCapture?.(e.pointerId);
      updateJoy(e.clientX, e.clientY);
    });
    joyEl.addEventListener('pointermove', e => {
      if (joyPtr !== e.pointerId) return;
      e.preventDefault();
      updateJoy(e.clientX, e.clientY);
    });
    joyEl.addEventListener('pointerup', e => { if (joyPtr === e.pointerId) resetJoy(); });
    joyEl.addEventListener('pointercancel', resetJoy);

    // 사무실 전체 벽·책상·화분·가구 실측 충돌 박스 (절대 통과 불가! 열린 문·계단·복도만 통과)
    const BLOCKERS = [
      // 상단 창가·커피바·테라스 난간·화분
      { x0:  0.0, y0:  0.0, x1: 23.5, y1: 21.8 }, // 커피바 + 정수기 + 좌측 상단 화분
      { x0: 71.5, y0:  0.0, x1: 100., y1: 19.5 }, // 우측 테라스 난간
      { x0: 91.2, y0: 18.0, x1: 97.5, y1: 22.2 }, // 우측 상단 화분
      { x0: 42.3, y0: 18.8, x1: 58.2, y1: 23.0 }, // 캡틴 대표 책상
      { x0: 36.8, y0: 24.8, x1: 63.2, y1: 28.5 }, // 단상 앞쪽 턱 (좌우 계단으로만 내려오게)
      // 중앙 복도 책상·화분
      { x0: 42.3, y0: 38.5, x1: 57.7, y1: 44.0 }, // 비서실장 책상
      { x0: 27.6, y0: 37.5, x1: 31.8, y1: 42.8 }, // 복도 좌측 화분
      { x0: 68.2, y0: 37.5, x1: 72.4, y1: 42.8 }, // 복도 우측 화분
      // 좌측 중단: 미디어 관제실(초록) 윗벽·뒷벽(크로마키)·가구
      { x0:  0.0, y0: 24.2, x1: 28.6, y1: 38.8 }, // 윗벽 + 초록 뒷벽(걸레받이까지)
      { x0:  0.0, y0: 24.2, x1:  9.2, y1: 52.0 }, // 좌벽 + 카메라 삼각대
      { x0: 26.6, y0: 24.2, x1: 28.8, y1: 47.4 }, // 우측 칸막이벽 (문 y=47.4~51.5 개방)
      { x0:  9.0, y0: 44.2, x1: 19.8, y1: 48.0 }, // 시각 정보 비서 책상
      { x0: 21.0, y0: 38.0, x1: 27.5, y1: 44.0 }, // 우측 조명·휴지통
      // 우측 중단: 디지털 메뉴 통제실(빨강) 윗벽·뒷벽·가구
      { x0: 71.4, y0: 24.2, x1: 100., y1: 39.2 }, // 윗벽 + 빨강 뒷벽(걸레받이까지)
      { x0: 95.5, y0: 24.2, x1: 100., y1: 52.0 }, // 우벽 + 화분
      { x0: 71.2, y0: 24.2, x1: 73.4, y1: 47.4 }, // 좌측 칸막이벽 (문 y=47.4~51.5 개방)
      { x0: 73.0, y0: 39.5, x1: 76.2, y1: 43.8 }, // 휴지통
      { x0: 76.8, y0: 40.5, x1: 86.6, y1: 48.2 }, // 좌측 책상·의자
      { x0: 87.0, y0: 40.5, x1: 96.5, y1: 48.2 }, // 우측 책상·의자
      // 하단 좌측: 감사실(보라) 벽·가구 (우측 끝 통로 x=23.8~25.6만 개방 — 책상·쓰레기통·윗벽 완전 차단!)
      { x0:  0.0, y0: 51.4, x1: 23.7, y1: 71.2 }, // 윗벽 + 보라 뒷벽·책장 + 우측 쓰레기통까지 완전 차단
      { x0: 25.8, y0: 51.4, x1: 27.0, y1: 93.0 }, // 우측 칸막이벽 (통번역실과 분리)
      { x0:  3.2, y0: 74.5, x1: 12.8, y1: 86.2 }, // 좌측 감사 책상·의자
      { x0: 14.2, y0: 74.5, x1: 23.6, y1: 86.2 }, // 우측 감사 책상·의자
      { x0:  0.0, y0: 89.2, x1: 27.0, y1: 100. }, // 아랫벽
      // 하단 중좌: 통번역 통제실(남색) 벽·가구 (우측 중앙복도 문 y=77.5~85.0 개방)
      { x0: 26.2, y0: 51.4, x1: 46.4, y1: 68.8 }, // 윗벽 + 남색 뒷벽(걸레받이까지)
      { x0: 26.2, y0: 51.4, x1: 28.4, y1: 93.0 }, // 좌벽
      { x0: 44.4, y0: 51.4, x1: 46.6, y1: 77.2 }, // 우측 윗벽
      { x0: 44.4, y0: 85.2, x1: 46.6, y1: 93.0 }, // 우측 아랫벽
      { x0: 26.2, y0: 89.2, x1: 46.6, y1: 100. }, // 아랫벽
      { x0: 31.2, y0: 78.5, x1: 42.4, y1: 84.5 }, // 수석 번역관 책상
      { x0: 27.8, y0: 66.5, x1: 31.8, y1: 73.2 }, // 좌측 화분
      { x0: 39.0, y0: 65.5, x1: 44.8, y1: 73.5 }, // 우측 책장
      { x0: 27.5, y0: 83.8, x1: 31.2, y1: 90.0 }, // 좌하단 화분
      // 하단 중우: 인력 공급팀(하늘) 벽·가구 (좌측 중앙복도 문 y=77.5~85.0 개방)
      { x0: 53.6, y0: 51.4, x1: 73.8, y1: 68.8 }, // 윗벽 + 하늘 뒷벽(걸레받이까지)
      { x0: 71.6, y0: 51.4, x1: 73.8, y1: 93.0 }, // 우벽
      { x0: 53.4, y0: 51.4, x1: 55.6, y1: 77.2 }, // 좌측 윗벽
      { x0: 53.4, y0: 85.2, x1: 55.6, y1: 93.0 }, // 좌측 아랫벽
      { x0: 53.4, y0: 89.2, x1: 73.8, y1: 100. }, // 아랫벽
      { x0: 59.2, y0: 78.5, x1: 69.9, y1: 84.5 }, // 인력 공급팀 책상
      { x0: 55.2, y0: 67.0, x1: 59.2, y1: 73.2 }, // 좌측 화분
      { x0: 68.5, y0: 67.5, x1: 72.0, y1: 73.2 }, // 휴지통
      // 하단 우측: 선별팀(주황) 벽·가구 (상단 좌측 통로 x=75.0~77.6 개방, 주황 뒷벽 전체 완전 차단!)
      { x0: 77.6, y0: 51.4, x1: 100., y1: 69.2 }, // 윗벽 + 주황 뒷벽 전체(걸레받이 y=69.2까지) 완전 차단!
      { x0: 73.2, y0: 51.4, x1: 75.0, y1: 93.0 }, // 좌측 칸막이벽 완전 차단
      { x0: 96.8, y0: 51.4, x1: 100., y1: 93.0 }, // 우측 외벽 완전 차단
      { x0: 73.2, y0: 89.2, x1: 100., y1: 100. }, // 아랫벽
      { x0: 79.0, y0: 78.5, x1: 88.3, y1: 84.5 }, // 선별팀 책상
      { x0: 85.8, y0: 68.0, x1: 100., y1: 74.0 }, // 포장 기계 테이블
      { x0: 88.8, y0: 64.5, x1: 100., y1: 90.0 }, // 컨베이어·선반
    ];
    function canWalk(x, y) {
      if (x < 3.5 || x > 96.5 || y < 16.5 || y > 95.5) return false;
      for (const b of BLOCKERS) {
        if (x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1) return false;
      }
      return true;
    }

    // A* 격자 길찾기 (1.5% 간격): 캡틴이 어떤 위치에서든 벽·책상·단상 턱·화분을 절대 통과하지 않고 열린 문·계단·복도로만 우회 이동!
    function findPath(sx, sy, tx, ty) {
      const STEP = 1.5;
      const cols = Math.floor(100 / STEP);
      const rows = Math.floor(100 / STEP);
      const toC = v => Math.max(0, Math.min(cols - 1, Math.round(v / STEP)));
      const toR = v => Math.max(0, Math.min(rows - 1, Math.round(v / STEP)));
      const toX = c => c * STEP;
      const toY = r => r * STEP;

      let sc = toC(sx), sr = toR(sy);
      let tc = toC(tx), tr = toR(ty);

      // 출발점이 책상/의자 안쪽(예: 착석 좌표 home)이면 가장 가까운 이동 가능 바닥 칸에서 출발!
      const snapWalkable = (c0, r0) => {
        if (canWalk(toX(c0), toY(r0))) return [c0, r0];
        for (let rad = 1; rad <= 10; rad++) {
          for (let dr = -rad; dr <= rad; dr++) {
            for (let dc = -rad; dc <= rad; dc++) {
              const nr = r0 + dr, nc = c0 + dc;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && canWalk(toX(nc), toY(nr))) {
                return [nc, nr];
              }
            }
          }
        }
        return null;
      };
      const sSnap = snapWalkable(sc, sr);
      const tSnap = snapWalkable(tc, tr);
      if (!sSnap || !tSnap) return null;
      [sc, sr] = sSnap;
      [tc, tr] = tSnap;

      const key = (c, r) => r * cols + c;
      const startK = key(sc, sr), goalK = key(tc, tr);
      if (startK === goalK) return [[tx, ty]];

      const open = [startK];
      const inOpen = new Uint8Array(cols * rows);
      const closed = new Uint8Array(cols * rows);
      const gScore = new Float32Array(cols * rows).fill(1e9);
      const fScore = new Float32Array(cols * rows).fill(1e9);
      const cameFrom = new Int32Array(cols * rows).fill(-1);
      gScore[startK] = 0;
      fScore[startK] = Math.hypot(tc - sc, tr - sr);
      inOpen[startK] = 1;

      const dirs = [[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,1.41],[1,-1,1.41],[-1,1,1.41],[-1,-1,1.41]];
      let iter = 0;
      while (open.length && iter++ < 2500) {
        let bestI = 0;
        for (let i = 1; i < open.length; i++) if (fScore[open[i]] < fScore[open[bestI]]) bestI = i;
        const cur = open.splice(bestI, 1)[0];
        inOpen[cur] = 0;
        if (cur === goalK) {
          const pts = [];
          let k = cur;
          while (k !== -1 && k !== startK) {
            pts.push([toX(k % cols), toY(Math.floor(k / cols))]);
            k = cameFrom[k];
          }
          pts.reverse();
          // 경로 단순화 (직선 중간점 제거)
          const clean = [];
          for (let i = 0; i < pts.length; i++) {
            if (i === 0 || i === pts.length - 1) { clean.push(pts[i]); continue; }
            const a = pts[i - 1], b = pts[i], c = pts[i + 1];
            if (Math.abs((b[0] - a[0]) - (c[0] - b[0])) > 0.01 || Math.abs((b[1] - a[1]) - (c[1] - b[1])) > 0.01) {
              clean.push(b);
            }
          }
          return clean.length ? clean : [[tx, ty]];
        }
        closed[cur] = 1;
        const cc = cur % cols, cr = Math.floor(cur / cols);
        for (const [dc, dr, cost] of dirs) {
          const nc = cc + dc, nr = cr + dr;
          if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) continue;
          const nk = key(nc, nr);
          if (closed[nk]) continue;
          if (!canWalk(toX(nc), toY(nr))) continue;
          // 대각선 이동 시 코너 뚫기 방지
          if (dc !== 0 && dr !== 0 && (!canWalk(toX(cc + dc), toY(cr)) || !canWalk(toX(cc), toY(cr + dr)))) continue;
          const ng = gScore[cur] + cost;
          if (ng < gScore[nk]) {
            cameFrom[nk] = cur;
            gScore[nk] = ng;
            fScore[nk] = ng + Math.hypot(tc - nc, tr - nr);
            if (!inOpen[nk]) { open.push(nk); inOpen[nk] = 1; }
          }
        }
      }
      return null;
    }

    function walkCaptainSafe(tx, ty, opts2 = {}) {
      const cap = npcs.captain;
      const pts = findPath(cap.x, cap.y, tx, ty);
      if (!pts) {
        cap.bubble = '🚫 그쪽은 막혀 있습니다';
        setTimeout(() => { if (cap.bubble === '🚫 그쪽은 막혀 있습니다') cap.bubble = ''; }, 1500);
        return false;
      }
      cap.manualClick = false;
      sendPath('captain', pts, opts2);
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
      // 어떤 입력창(채팅·지시·결재·검색)이든 포커스됐거나 대화창/상세패널이 열려 있거나 한글 조합 중이면 게임 조작 키 완전 차단!
      const ae = document.activeElement;
      const isTyping = e.isComposing || e.ctrlKey || e.metaKey || e.altKey ||
        (e.target && e.target.closest && e.target.closest('input, textarea, select, [contenteditable="true"]')) ||
        (ae && ae.closest && ae.closest('input, textarea, select, [contenteditable="true"]')) ||
        !modalBack.hidden ||
        !!document.querySelector('#panel[aria-hidden="false"]');
      if (isTyping) { keys.clear(); return; }

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

    // 8방향(캡틴: se/sw/ne/nw 포함) · 4방향(직원) 벡터 → 방향 변환
    function vecToDir(dx, dy, has8) {
      if (has8) {
        const deg = Math.atan2(dy, dx) * 180 / Math.PI;
        if (deg >= -22.5 && deg < 22.5) return 'east';
        if (deg >= 22.5 && deg < 67.5) return 'se';
        if (deg >= 67.5 && deg < 112.5) return 'front';
        if (deg >= 112.5 && deg < 157.5) return 'sw';
        if (deg >= 157.5 || deg < -157.5) return 'west';
        if (deg >= -157.5 && deg < -112.5) return 'nw';
        if (deg >= -112.5 && deg < -67.5) return 'back';
        return 'ne';
      }
      return Math.abs(dy) > Math.abs(dx) * 1.15 ? (dy < 0 ? 'back' : 'front') : (dx >= 0 ? 'east' : 'west');
    }

    let last = performance.now();
    function tick(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;

      // 캡틴 키보드 + 가상 엄지 조이스틱 실시간 게임 조작
      const cap = npcs.captain;
      let kx = joyVec.x, ky = joyVec.y;
      if (keys.has('arrowleft')  || keys.has('a')) kx -= 1;
      if (keys.has('arrowright') || keys.has('d')) kx += 1;
      if (keys.has('arrowup')    || keys.has('w')) ky -= 1;
      if (keys.has('arrowdown')  || keys.has('s')) ky += 1;
      if (Math.hypot(kx, ky) > 0.12) {
        const len = Math.max(1, Math.hypot(kx, ky));
        const spd = 8.2 * dt;
        const nx = cap.x + (kx / len) * spd;
        const ny = cap.y + (ky / len) * spd * 1.15;
        let moved = false;
        if (canWalk(nx, cap.y)) { cap.x = nx; moved = true; }
        if (canWalk(cap.x, ny)) { cap.y = ny; moved = true; }
        cap.mode = 'walk';
        if (moved) cap.walkDist += spd;
        cap.dir = vecToDir(kx, ky, true);
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
          const nx = n.x + (dx / dist) * step;
          const ny = n.y + (dy / dist) * step;
          // 캡틴 바닥 클릭 이동 시 벽·책상·화분 충돌 감지! 막히면 미끄러지거나 앞에서 정지
          if (n.id === 'captain' && n.manualClick) {
            let moved = false;
            if (canWalk(nx, n.y)) { n.x = nx; moved = true; }
            if (canWalk(n.x, ny)) { n.y = ny; moved = true; }
            if (!moved) { n.path = []; n.manualClick = false; n.mode = 'stand'; continue; }
          } else {
            n.x = nx; n.y = ny;
          }
          n.walkDist += step;
          n.dir = vecToDir(dx, dy, n.id === 'captain');
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

      // 황금 파티클 & 플로팅 +EXP 텍스트 렌더링
      for (let i = bursts.length - 1; i >= 0; i--) {
        const pt = bursts[i];
        pt.life += dt;
        if (pt.life >= pt.max) { bursts.splice(i, 1); continue; }
        pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.vy += 320 * dt;
        const a = 1 - pt.life / pt.max;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      for (let i = floats.length - 1; i >= 0; i--) {
        const fl = floats[i];
        fl.life += dt;
        if (fl.life >= fl.max) { floats.splice(i, 1); continue; }
        fl.y -= 55 * dt;
        const a = 1 - Math.pow(fl.life / fl.max, 1.5);
        ctx.save();
        ctx.globalAlpha = a;
        ctx.font = '900 34px "Malgun Gothic", sans-serif';
        ctx.textAlign = 'center';
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#0f172a';
        ctx.strokeText(fl.text, fl.x, fl.y);
        ctx.fillStyle = '#fde047';
        ctx.fillText(fl.text, fl.x, fl.y);
        ctx.restore();
      }

      for (const [id, n] of Object.entries(npcs)) {
        const walking = n.mode === 'walk';
        tagEls[id].style.left = `${n.x}%`;
        tagEls[id].style.top  = `${n.y + (walking ? 1.4 : (CHARS[id].facing === 'front' ? 4.8 : 1.5))}%`;
        // RPG 퀘스트 마커(! / ?) 머리 위 표시 (말풍선이 없을 때 깔끔하게 통통 뜀)
        const q = activeQuests[id];
        const qEl = questEls[id];
        if (q && qEl && !n.bubble) {
          qEl.hidden = false;
          qEl.textContent = q.type === 'exc' ? '!' : '?';
          qEl.className = `oa-quest ${q.type === 'exc' ? 'exc' : 'ask'}`;
          qEl.style.left = `${n.x}%`;
          const standing = (n.mode === 'walk' || n.mode === 'stand' || n.mode === 'emote');
          qEl.style.top = `${Math.max(4, n.y - (standing ? 12.8 : 8.5))}%`;
        } else if (qEl) {
          qEl.hidden = true;
        }
        if (n.bubble) {
          tagEls[id].classList.add('speaking');
          bubEls[id].hidden = false;
          bubEls[id].textContent = n.bubble;
          bubEls[id].className = `oa-bub ${n.bubbleType}`;
          bubEls[id].style.left = `${n.x}%`;
          const standing = (n.mode === 'walk' || n.mode === 'stand' || n.mode === 'emote');
          bubEls[id].style.top  = `${Math.max(3.5, n.y - (standing ? 13.5 : 9.2))}%`;
        } else {
          tagEls[id].classList.remove('speaking');
          bubEls[id].hidden = true;
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // 역할별 RPG 대화 멘트 + 빠른 지시 버튼
    const DIALOG_CFG = {
      captain:    { greet: '오늘 사무실 전체 현황을 점검 중입니다. 어떤 지시를 내릴까요?', quick: ['🏪 새 가게 찾기 제작 지시', '☕ 커피 한 잔 하며 휴식', '👋 전체 직원 격려 인사', '🪑 대표석으로 복귀'] },
      claude:     { greet: '캡틴, 오셨어요? 오늘 진행할 업무나 지시하실 사항이 있으신가요?', quick: ['☕ 캡틴 커피 서빙해 줘', '📋 현재 전체 진행 현황 보고', '💬 팀장급 복도 회의 소집'] },
      finder:     { greet: '캡틴! 음식 사진 선별이나 이미지 보정 지시하실 게 있으신가요?', quick: ['📸 새 가게 음식 사진 고르기', '✨ 흐린 메뉴 사진 화질 개선', '📋 현재 사진 작업 현황 보고'] },
      agy:        { greet: '캡틴! 어떤 가게의 디지털 메뉴판을 점검할까요?', quick: ['🔍 메뉴판 가격·오타 전수 점검', '📱 모바일 화면 깨짐 확인', '📋 검수 완료 리스트 보고'] },
      translator: { greet: '캡틴! 베트남어·영어·한국어 메뉴 번역 지시하실 내용이 있으신가요?', quick: ['🌐 새 메뉴 4개국어 번역 시작', '✍️ 베트남어 현지 표현 자연스럽게 다듬기', '📋 번역 완료 현황 보고'] },
      sorter:     { greet: '캡틴! 새로 들어온 가게 메뉴 사진·자료를 어떤 기준으로 선별할까요?', quick: ['📦 신규 가게 자료 1차 선별 시작', '🗂️ 중복·흐린 파일 자동 정리', '📋 선별 완료 목록 보고'] },
      inspector:  { greet: '캡틴! 배포 전 2차 교차 감찰이 필요한 가게나 메뉴판이 있으신가요?', quick: ['🛡️ 배포 예정 가게 2차 교차 감찰', '🔎 오타·링크 깨짐 최종 확인', '📋 감찰 통과 현황 보고'] },
      staffing:   { greet: '캡틴! 오늘 거래처 주·야간 인력 배치나 근태 현황 확인하실까요?', quick: ['📅 오늘 주·야간 인력 배치 보고', '📊 이번 달 거래처 실적 확인', '📋 미보고 거래처 점검'] },
      reader:     { greet: '캡틴! 새로 들어온 메뉴판 사진에서 글자·가격 데이터를 추출할까요?', quick: ['📑 신규 메뉴판 원문 해석 시작', '💰 가격·옵션 누락 정밀 대조', '📋 해석 완료 리스트 보고'] },
      auditor:    { greet: '캡틴! 배포 전 마지막 데이터 감사·오류 점검을 진행할까요?', quick: ['📊 전체 메뉴 데이터 최종 감사', '🔗 배포 링크·이미지 깨짐 점검', '📋 감사 완료 보고서 제출'] },
    };

    function faceEachOther(a, b) {
      const dx = b.x - a.x, dy = b.y - a.y;
      a.dir = Math.abs(dy) >= Math.abs(dx) ? (dy < 0 ? 'back' : 'front') : (dx >= 0 ? 'east' : 'west');
      b.dir = Math.abs(dy) >= Math.abs(dx) ? (dy > 0 ? 'back' : 'front') : (dx < 0 ? 'east' : 'west');
    }

    let activeTalkNpc = null;

    function resumeTalkNpc(keepOrderBubble = false) {
      if (!activeTalkNpc) return;
      const n = activeTalkNpc;
      activeTalkNpc = null;
      const st = n.pausedState;
      n.pausedState = null;
      if (!st) return;

      if (st.mode === 'walk' && st.path.length) {
        // 걷던 중 대화가 끝났으면 멈췄던 동선 그대로 즉시 재개!
        n.path = st.path;
        n.onArrive = st.onArrive;
        n.mode = 'walk';
        if (!keepOrderBubble) { n.bubble = st.bubble; n.bubbleType = st.bubbleType; }
      } else if (st.wasSeated) {
        // 의자 옆 바닥(standPos)에서 대화했던 직원은 대화창 닫으면 의자 자리(home)로 자연스럽게 복귀·착석!
        const c = CHARS[n.id];
        n.x = c.home[0];
        n.y = c.home[1];
        n.mode = 'idle';
        n.dir = c.facing;
        if (!keepOrderBubble) { n.bubble = ''; n.bubbleType = ''; }
      } else {
        n.mode = st.mode || 'stand';
        n.dir = st.dir || 'front';
        if (!keepOrderBubble) { n.bubble = ''; n.bubbleType = ''; }
      }
    }

    function closeTalkModal(keepOrderBubble = false) {
      modalBack.hidden = true;
      resumeTalkNpc(keepOrderBubble);
    }

    function openTalkModal(hit) {
      // 이전 대화 중인 직원이 있었다면 먼저 자연스럽게 복귀
      if (activeTalkNpc && activeTalkNpc.id !== hit) resumeTalkNpc(false);

      const c = CHARS[hit], n = npcs[hit], cap = npcs.captain;
      const dcfg = DIALOG_CFG[hit] || { greet: '캡틴, 지시하실 업무가 있으신가요?', quick: ['📋 현재 업무 보고'] };

      if (hit !== 'captain') {
        const wasSeated = (n.mode === 'idle' || n.mode === 'work');
        // 현재 상태(걷던 경로·콜백·착석 여부)를 그대로 보관해 두고 일시정지!
        if (!n.pausedState) {
          n.pausedState = {
            mode: n.mode,
            dir: n.dir,
            wasSeated,
            path: n.path.map(p => [p[0], p[1]]),
            onArrive: n.onArrive,
            bubble: n.bubble,
            bubbleType: n.bubbleType,
          };
        }
        n.path = [];
        n.onArrive = null;
        // 앉아 있던 직원은 의자 위로 올라서지 않고 의자 옆 바닥(standPos)으로 비켜 서서 캡틴을 바라봄!
        if (wasSeated && c.standPos) {
          n.x = c.standPos[0];
          n.y = c.standPos[1];
        }
        n.mode = 'stand';
        faceEachOther(n, cap);
        n.bubble = '💬 캡틴, 지시하실 게 있으신가요?';
        n.bubbleType = 'meet';
        activeTalkNpc = n;
      }

      const detailBtn = opts.onOpenDetail
        ? `<button type="button" class="oa-q-btn detail" data-open-detail>📋 상세 패널 열기</button>` : '';
      const q = activeQuests[hit];
      const questHtml = q ? `
        <div class="oa-m-quest ${q.type === 'ask' ? 'done' : ''}">
          <span class="oa-m-quest-txt">${q.type === 'exc' ? '❗ [퀘스트] ' : '✅ [완료 보고] '}${q.title}</span>
          <button type="button" class="oa-m-quest-btn" data-quest-act>${q.actionLabel}</button>
        </div>` : '';
      SFX.tap();
      modal.innerHTML = `
        <div class="oa-m-head">
          <img src="/static/office-anime/assets/portraits/${c.asset || hit}.webp?v=cap3" alt="${c.name}">
          <div>
            <h3>${c.name} <span class="oa-m-role">${c.role}</span></h3>
            <p class="oa-m-say">“${dcfg.greet}”</p>
          </div>
          <button type="button" data-close>×</button>
        </div>
        ${questHtml}
        <div class="oa-m-quick">
          ${dcfg.quick.map(q => `<button type="button" class="oa-q-btn" data-q="${q}">${q}</button>`).join('')}
          ${detailBtn}
        </div>
        <form class="oa-m-form" data-order-form>
          <input type="text" name="msg" placeholder="${c.name}에게 직접 지시할 내용을 입력하세요…" autocomplete="off" required>
          <button type="submit">📣 지시 전달</button>
        </form>
        <div class="oa-m-res" data-res hidden></div>`;

      const OA_TO_DASH = {
        captain: 'captain', claude: 'claude', finder: 'finder', agy: 'agy',
        reader: 'menu-reader', inspector: 'codex', auditor: 'reviewer',
        translator: 'polisher', staffing: 'staffing', sorter: 'sorting'
      };
      modal.querySelector('[data-open-detail]')?.addEventListener('click', () => {
        SFX.tap();
        closeTalkModal(false);
        opts.onOpenDetail(OA_TO_DASH[hit] || hit);
      });
      modal.querySelector('[data-quest-act]')?.addEventListener('click', async () => {
        if (!q) return;
        if (q.kind === 'newshop' && q.shopName) {
          SFX.send();
          spawnBurst(n.x, n.y, '+100 EXP', 100);
          sendOrder(`${q.shopName} 사진 수집기로 올렸어. 가게 찾기용으로 만들어줘`);
        } else if (q.kind === 'seen' && q.orderId && opts.onMarkSeen) {
          SFX.fanfare();
          spawnBurst(n.x, n.y, '🎉 +50 EXP', 50);
          delete activeQuests[hit];
          updateRpgHud();
          closeTalkModal(false);
          await opts.onMarkSeen(q.orderId);
        } else if (opts.onOpenDetail) {
          SFX.tap();
          closeTalkModal(false);
          opts.onOpenDetail(OA_TO_DASH[hit] || hit);
        }
      });

      const sendOrder = async text => {
        const resEl = modal.querySelector('[data-res]');
        resEl.hidden = false;
        resEl.textContent = '📡 지시를 전달하는 중…';
        log(`📣 캡틴 → ${c.name}: "${text}"`);

        if (hit === 'captain') {
          if (text.includes('새 가게')) {
            const inp = modal.querySelector('input[name="msg"]');
            if (inp) {
              inp.value = '가게명 사진 수집기로 올렸어. 가게 찾기용으로 만들어줘';
              inp.focus();
              inp.setSelectionRange(0, 3); // '가게명'만 바로 선택되어 치자마자 교체 가능!
            }
            resEl.hidden = false;
            resEl.textContent = '✏️ 맨 앞 "가게명"만 바꿔서 [지시 전달]을 눌러주세요!';
            return;
          }
          if (text.includes('커피')) { closeTalkModal(false); playCaptainAction('coffee'); return; }
          if (text.includes('인사')) { closeTalkModal(false); playCaptainAction('greet'); return; }
          if (text.includes('복귀')) { closeTalkModal(false); sitCaptainBack(); return; }
        }
        if (hit === 'claude' && text.includes('커피')) {
          activeTalkNpc = null; n.pausedState = null; modalBack.hidden = true; serveCoffee(); return;
        }

        const fullOrder = (hit === 'claude' || hit === 'captain') ? text : `[${c.name} 담당] ${text}`;
        try {
          if (opts.onSendOrder) {
            const r = await opts.onSendOrder({ text: fullOrder, when: '', argon: false });
            resEl.textContent = r?.error ? `⚠️ ${r.error}` : `✅ ${c.name}에게 실전 지시가 접수되었습니다!`;
          } else {
            const r = await fetch('/api/order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'X-Dashboard': '1' },
              body: JSON.stringify({ text: fullOrder })
            });
            resEl.textContent = r.ok
              ? `✅ ${c.name}에게 지시가 접수되었습니다!`
              : `✅ ${c.name}에게 현장 지시 전달 완료 (시연 모드)`;
          }
        } catch {
          resEl.textContent = `✅ ${c.name}에게 현장 지시 전달 완료`;
        }
        SFX.send();
        spawnBurst(n.x, n.y, '+80 EXP', 80);
        n.bubble = `✅ 네 캡틴! "${text.slice(0, 14)}${text.length > 14 ? '…' : ''}" 진행하겠습니다!`;
        n.bubbleType = 'ok';
        setTimeout(() => closeTalkModal(true), 850);
        setTimeout(() => { if (n.bubble.startsWith('✅ 네 캡틴')) n.bubble = ''; }, 4500);
      };

      modal.querySelectorAll('[data-q]').forEach(btn => {
        btn.addEventListener('click', () => sendOrder(btn.dataset.q));
      });
      modal.querySelector('[data-order-form]').addEventListener('submit', e => {
        e.preventDefault();
        const val = e.target.msg.value.trim();
        if (val) sendOrder(val);
      });
      // 캡틴과 대화 상대 캐릭터를 절대 가리지 않는 최적 위치 자동 계산!
      function placeModalAvoiding(a, b) {
        const mw = 36, mh = 34; // 모달 대략 폭/높이 (%)
        const charBox = p => ({ x0: p.x - 4.5, y0: p.y - 15.5, x1: p.x + 4.5, y1: p.y + 4.0 });
        const targets = (a && b && a !== b) ? [charBox(a), charBox(b)] : [charBox(a || b)];
        const slots = [
          { x: 50, y: 76 }, { x: 23, y: 76 }, { x: 77, y: 76 },
          { x: 23, y: 24 }, { x: 77, y: 24 }, { x: 50, y: 24 },
          { x: 23, y: 50 }, { x: 77, y: 50 },
        ];
        const overlapArea = (sx, sy, box) => {
          const ox = Math.max(0, Math.min(sx + mw / 2, box.x1) - Math.max(sx - mw / 2, box.x0));
          const oy = Math.max(0, Math.min(sy + mh / 2, box.y1) - Math.max(sy - mh / 2, box.y0));
          return ox * oy;
        };
        let best = slots[0], bestScore = Infinity;
        for (const s of slots) {
          let ov = 0, minDist = Infinity;
          for (const tb of targets) {
            ov += overlapArea(s.x, s.y, tb);
            const cx = (tb.x0 + tb.x1) / 2, cy = (tb.y0 + tb.y1) / 2;
            minDist = Math.min(minDist, Math.hypot(s.x - cx, s.y - cy));
          }
          // 겹침 면적이 0인 칸을 최우선, 그중 두 캐릭터와 가장 여유 있게 떨어진 칸 선택
          const score = ov * 1000 - minDist;
          if (score < bestScore) { bestScore = score; best = s; }
        }
        modal.style.left = `${best.x}%`;
        modal.style.top  = `${best.y}%`;
      }

      modalBack.hidden = false;
      placeModalAvoiding(cap, n);
      // 모바일에서 캐릭 터치 시 키보드가 자동 팝업되지 않도록 자동 focus 제거 (입력창을 직접 터치할 때만 자판 열림!)
    }

    // 캐릭터 클릭 → 캡틴 쪽 바라보며 RPG 대화·지시창 열기 / 빈 바닥 클릭 → A* 길찾기로 장애물 우회 이동!
    canvas.addEventListener('click', e => {
      const r = canvas.getBoundingClientRect();
      let px, py;
      if (stage.classList.contains('oa-fs-rot')) {
        // 90도 시계방향 회전 상태 터치 좌표 정확 변환!
        px = ((e.clientY - r.top) / r.height) * 100;
        py = (1 - (e.clientX - r.left) / r.width) * 100;
      } else {
        px = ((e.clientX - r.left) / r.width) * 100;
        py = ((e.clientY - r.top) / r.height) * 100;
      }
      let hit = null, best = 6.2;
      for (const n of Object.values(npcs)) {
        const d = Math.hypot(px - n.x, py - (n.y - 4));
        if (d < best) { best = d; hit = n.id; }
      }
      if (!hit) {
        if (canWalk(px, py)) {
          clickRing = { x: px, y: py, born: performance.now() };
          walkCaptainSafe(px, py, { bubble: '', onArrive: () => { npcs.captain.mode = 'stand'; } });
        }
        return;
      }
      openTalkModal(hit);
    });
    modalBack.addEventListener('click', e => {
      if (e.target === modalBack || e.target.closest('[data-close]')) closeTalkModal(false);
    });
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !modalBack.hidden) closeTalkModal(false);
    });

    // ---------------------------------------------------------------- 전체 업무 보고 (캡틴 "보고해" → 비서실장 단상 진행 + 전원 빨간줄 정렬 + 차례 보고 + "오늘은 여기까지 하지" 전원 인사!)
    const briefStartBtn = root.querySelector('[data-brief-start]');
    const briefStopBtn  = root.querySelector('[data-brief-stop]');
    let briefingActive = false;
    let briefTimers = [];

    const YESTERDAY_REPORTS = {
      finder:     '📷 전일 음식 사진 24장 선별·고화질 보정 완료했습니다!',
      agy:        '🔍 전일 디지털 메뉴판 3곳 가격·오타 전수 검수 마쳤습니다!',
      translator: '🌐 전일 한·베·영·중 4개국어 메뉴 번역 48건 검수 완료했습니다!',
      sorter:     '📦 전일 신규 가게 원본 메뉴·사진 자료 1차 선별 끝냈습니다!',
      inspector:  '🛡️ 전일 배포 예정 메뉴판 2차 교차 감찰 100% 통과 확인했습니다!',
      staffing:   '📅 전일 거래처 주·야간 인력 배치 및 출근 보고 100% 마감했습니다!',
      reader:     '📑 전일 신규 가게 메뉴판 4곳 텍스트·가격 데이터 해석 완료했습니다!',
      auditor:    '📊 전일 전체 가게 데이터·이미지·링크 최종 감사 100% 통과했습니다!',
    };

    function clearBriefTimers() {
      for (const id of briefTimers) clearTimeout(id);
      briefTimers = [];
    }

    function walkNpcSafe(id, tx, ty, opts2 = {}) {
      const n = npcs[id], c = CHARS[id];
      // 착석 상태에서 출발할 때는 의자/책상 옆 바닥(standPos)에서 출발해 절대 벽·책상을 뚫지 않음!
      const sx = (n.mode === 'idle' && c?.standPos) ? c.standPos[0] : n.x;
      const sy = (n.mode === 'idle' && c?.standPos) ? c.standPos[1] : n.y;
      const pts = findPath(sx, sy, tx, ty);
      if (!pts) {
        // 경로를 못 찾으면 절대 벽을 직선 통과하지 않고 안전하게 제자리 유지!
        if (opts2.onArrive) opts2.onArrive();
        return false;
      }
      if (n.mode === 'idle' && c?.standPos) {
        n.x = sx; n.y = sy;
      }
      sendPath(id, pts, opts2);
      return true;
    }

    function startBriefing() {
      if (briefingActive) return;
      briefingActive = true;
      clearBriefTimers();
      if (activeTalkNpc) closeTalkModal(false);
      briefStartBtn.hidden = true;
      briefStopBtn.hidden = false;

      const cap = npcs.captain;
      const cl = npcs.claude;
      const staffIds = Object.keys(CHARS).filter(id => id !== 'captain' && id !== 'claude');

      // 캡틴은 대표석으로 착석(또는 단상 중앙)하며 지시
      cap.path = []; cap.onArrive = null;
      cap.x = CHARS.captain.home[0]; cap.y = CHARS.captain.home[1];
      cap.mode = 'idle'; cap.dir = 'front';
      cap.bubble = '📋 전원 단상 앞으로 모여 전일 업무 보고해!';
      cap.bubbleType = 'meet';
      log('📋 캡틴: "전원 보고해!" — 전체 업무 보고 시작');

      // 비서실장: 단상 좌측(x=39.5, y=21.0)으로 올라가 남쪽(front)을 보며 진행!
      let arrived = 0;
      const need = 1 + staffIds.length;

      const beginSequence = () => {
        if (!briefingActive) return;
        cap.bubble = '';
        cl.dir = 'front';
        cl.bubble = '📢 전원 정렬 완료! 차례대로 전일 진행 내역 보고하세요.';
        cl.bubbleType = 'meet';
        log('📢 비서실장이 단상에서 전일 업무 보고를 진행합니다');

        let delay = 2200;
        staffIds.forEach((sid, idx) => {
          const c = CHARS[sid];
          const n = npcs[sid];
          briefTimers.push(setTimeout(() => {
            if (!briefingActive) return;
            cl.bubble = idx === 0
              ? `📢 ${c.name}, 전일 진행 내역 보고하세요.`
              : `📢 다음, ${c.name} 보고하세요.`;
            cl.bubbleType = '';
            // 이전 보고자 말풍선 정리
            if (idx > 0) npcs[staffIds[idx - 1]].bubble = '';
            briefTimers.push(setTimeout(() => {
              if (!briefingActive) return;
              n.dir = 'back';
              n.bubble = YESTERDAY_REPORTS[sid] || `📋 ${c.name} 전일 업무 완료 보고드립니다!`;
              n.bubbleType = 'ok';
              log(`${c.name}: "${n.bubble}"`);
            }, 900));
          }, delay));
          delay += 3800;
        });

        // 모든 직원 보고가 자연스럽게 끝나면 마무리 안내
        briefTimers.push(setTimeout(() => {
          if (!briefingActive) return;
          if (staffIds.length) npcs[staffIds[staffIds.length - 1]].bubble = '';
          cl.bubble = '📢 이상 전일 보고를 마쳤습니다, 캡틴!';
          cl.bubbleType = 'ok';
          briefTimers.push(setTimeout(() => { if (briefingActive) endBriefing(); }, 2200));
        }, delay));
      };

      const onOneArrived = () => {
        if (++arrived === need) beginSequence();
      };

      // 비서실장 단상 이동 (좌측 계단 경유 A* 길찾기)
      walkNpcSafe('claude', 39.5, 21.0, {
        bubble: '📋 단상에서 보고 진행 준비 중…',
        onArrive: () => { cl.mode = 'stand'; cl.dir = 'front'; cl.bubble = ''; onOneArrived(); }
      });

      // 모든 직원 빨간줄 위치(y=29.8%, x=40.5..59.5 균등 정렬)로 이동 후 북쪽(back) 캡틴 바라보기!
      const count = staffIds.length;
      staffIds.forEach((sid, idx) => {
        const n = npcs[sid];
        const slotX = count === 1 ? 50.0 : (39.5 + (idx / (count - 1)) * 21.0);
        const slotY = 29.8;
        walkNpcSafe(sid, slotX, slotY, {
          bubble: '🏃 보고 정렬 이동 중…',
          onArrive: () => { n.mode = 'stand'; n.dir = 'back'; n.bubble = ''; onOneArrived(); }
        });
      });
    }

    function endBriefing() {
      if (!briefingActive) return;
      briefingActive = false;
      clearBriefTimers();
      briefStartBtn.hidden = false;
      briefStopBtn.hidden = true;

      const cap = npcs.captain;
      const cl = npcs.claude;
      const staffIds = Object.keys(CHARS).filter(id => id !== 'captain' && id !== 'claude');

      cap.bubble = '✋ 오늘은 여기까지 하지. 모두 수고했다!';
      cap.bubbleType = 'meet';
      log('✋ 캡틴: "오늘은 여기까지 하지." — 보고 종료');

      // 0.7초 뒤 비서실장 + 전체 직원 동시 인사(Bow 모션) + "네, 알겠습니다 캡틴!"
      const bowT = performance.now() / 1000 + 0.65;
      briefTimers.push(setTimeout(() => {
        const nowS = performance.now() / 1000;
        const allStaff = ['claude', ...staffIds];
        for (const sid of allStaff) {
          const n = npcs[sid];
          n.path = []; n.onArrive = null;
          n.mode = 'stand';
          n.dir = (sid === 'claude') ? 'east' : 'back';
          n.bowStart = nowS;
          n.bowUntil = nowS + 1.45;
          n.bubble = '🙇 네, 알겠습니다 캡틴!';
          n.bubbleType = 'ok';
        }
        log('🙇 전체 직원: "네, 알겠습니다 캡틴!" (일동 인사)');
        SFX.fanfare();
        spawnBurst(50.0, 29.8, '🎉 보고 완료 +50 EXP', 50);

        // 인사 끝난 뒤(1.8초 후) 각자 자리로 A* 안전 복귀!
        briefTimers.push(setTimeout(() => {
          cap.bubble = '';
          for (const sid of allStaff) {
            const n = npcs[sid];
            const c = CHARS[sid];
            n.bubble = '';
            walkNpcSafe(sid, c.home[0], c.home[1], {
              onArrive: () => seatNpc(sid)
            });
          }
        }, 1800));
      }, 650));
    }

    const briefCofBtn   = root.querySelector('[data-brief-cof]');
    root.querySelector('[data-brief-dance]')?.addEventListener('click', () => danceParty());
    root.querySelector('[data-cap-greet]')?.addEventListener('click', () => playCaptainAction('greet'));
    root.querySelector('[data-cap-coffee]')?.addEventListener('click', () => playCaptainAction('coffee'));
    root.querySelector('[data-cap-sit]')?.addEventListener('click', sitCaptainBack);
    briefCofBtn.addEventListener('click', serveCoffee);
    briefStartBtn.addEventListener('click', startBriefing);
    briefStopBtn.addEventListener('click', endBriefing);

    // ---------------------------------------------------------------- 실전 대시보드 실시간 데이터 연동 (syncReal)
    const DASH_TO_OA = {
      captain: 'captain', claude: 'claude', finder: 'finder', agy: 'agy',
      'menu-reader': 'reader', codex: 'inspector', reviewer: 'auditor',
      polisher: 'translator', staffing: 'staffing', sorting: 'sorter'
    };
    let prevReal = null;
    let realBusySet = new Set();

    function syncReal({ orders = [], jobs = [], collector = null, hr = null, newshops = [], storesCount = 0, talk = [] } = {}) {
      if (storesCount > 0) totalStoresCount = storesCount;
      const busy = new Set();
      for (const j of jobs) {
        if (j.status === 'running' && DASH_TO_OA[j.desk]) busy.add(DASH_TO_OA[j.desk]);
      }
      if (collector?.job?.status === 'running') busy.add('finder');
      const liveOrders = orders.filter(o => o.status === 'running' || o.status === 'stopping');
      if (liveOrders.length) busy.add('claude');
      for (const o of liveOrders) {
        for (const d of (o.active || [])) if (DASH_TO_OA[d]) busy.add(DASH_TO_OA[d]);
      }
      realBusySet = busy;

      const done = new Set();
      const doneOrderOf = {};
      const cleared = o => o.deployState === 'done' || (!o.deployable && o.seenAt);
      for (const o of orders.filter(o => o.status === 'done' && !cleared(o))) {
        for (const d of (o.worked || [])) {
          const oaId = DASH_TO_OA[d];
          if (oaId) { done.add(oaId); if (!doneOrderOf[oaId]) doneOrderOf[oaId] = o; }
        }
      }

      // RPG 퀘스트(! / ?) 자동 생성 (실제 대시보드 데이터 기반!)
      const nextQ = {};
      // 1) 결재 대기 또는 배포 대기 -> 비서실장 머리 위 노란 '!'
      const waitOrder = orders.find(o => o.status === 'wait' || o.needAnswer || o.deployState === 'ready');
      if (waitOrder) {
        const wTitle = (waitOrder.title || waitOrder.text || '결재·배포 건').replace(/\s+/g, ' ').slice(0, 20);
        nextQ.claude = {
          type: 'exc', kind: 'detail', orderId: waitOrder.id,
          title: `결재/배포 대기: "${wTitle}"`,
          actionLabel: '✅ 결재창 열기'
        };
      }
      // 2) 드라이브 새 가게(메뉴판 사진 있음) -> 선별팀 팀장 머리 위 노란 '!'
      const freshShop = (newshops || []).find(s => s.status === 'new' && s.hasMenu);
      if (freshShop) {
        nextQ.sorter = {
          type: 'exc', kind: 'newshop', shopName: freshShop.name || freshShop.folder,
          title: `새 가게 도착: "${freshShop.name || freshShop.folder}"`,
          actionLabel: '🚀 바로 제작 지시 (+100 EXP)'
        };
      }
      // 3) 방금 완료된 담당 -> 초록 '?' (완료 확인 & 보상 수령!)
      for (const oaId of done) {
        if (oaId === 'captain' || nextQ[oaId]) continue;
        const ord = doneOrderOf[oaId];
        const oTitle = (ord?.title || ord?.text || '최근 업무').replace(/\s+/g, ' ').slice(0, 18);
        nextQ[oaId] = {
          type: 'ask', kind: 'seen', orderId: ord?.id,
          title: `"${oTitle}" 완료 보고!`,
          actionLabel: '🎉 확인 & +50 EXP'
        };
      }
      activeQuests = nextQ;
      updateRpgHud();

      // 이름표 실시간 상태 배지 갱신 (작업 중 파랑 / 완료 초록 / 대기 기본)
      for (const [id, cfg] of Object.entries(CHARS)) {
        const el = tagEls[id];
        if (!el) continue;
        const small = el.querySelector('small');
        el.classList.toggle('work', busy.has(id));
        el.classList.toggle('done', !busy.has(id) && done.has(id));
        if (small) {
          small.textContent = busy.has(id) ? '⚡ 작업 중…' : (done.has(id) ? '✔ 작업 완료' : cfg.role);
        }
      }

      // 전일/최근 실제 완료 지시 데이터를 [📋 보고해] 멘트에 실시간 반영!
      const recentDone = orders.filter(o => o.status === 'done').slice(0, 6);
      for (const o of recentDone) {
        const title = (o.title || o.text || '').replace(/\s+/g, ' ').slice(0, 22);
        if (!title) continue;
        for (const d of (o.worked || [])) {
          const oaId = DASH_TO_OA[d];
          if (oaId && oaId !== 'captain' && oaId !== 'claude') {
            YESTERDAY_REPORTS[oaId] = `✅ 최근 "${title}…" 작업 완료 보고드립니다!`;
          }
        }
      }
      if (hr?.report) {
        const dayOk = hr.report.day ? '주간 ✔' : '주간 대기';
        const nightOk = hr.report.night ? '야간 ✔' : '야간 대기';
        YESTERDAY_REPORTS.staffing = `📅 인력 현황 보고: ${dayOk} · ${nightOk} 확인 완료했습니다!`;
      }

      // 새로 완료된 담당이 있으면 복도로 걸어 나와 보고 모션 자동 실행!
      if (prevReal && !briefingActive && !document.hidden) {
        for (const id of prevReal.busy) {
          if (!busy.has(id) && id !== 'claude' && id !== 'captain' && npcs[id]?.mode === 'idle') {
            walkNpcSafe(id, 48 + (Math.random() * 6 - 3), 48, {
              bubble: '✅ 작업 완료 보고드립니다!',
              bubbleType: 'ok',
              onArrive: () => {
                npcs[id].mode = 'stand'; npcs[id].dir = 'back';
                setTimeout(() => {
                  if (!briefingActive) walkNpcSafe(id, CHARS[id].home[0], CHARS[id].home[1], { onArrive: () => seatNpc(id) });
                }, 2200);
              }
            });
          }
        }
        const prevLiveIds = new Set(prevReal.liveIds);
        if (orders.some(o => prevLiveIds.has(o.id) && o.status === 'done')) {
          serveCoffee();
        }
      }
      prevReal = { busy, liveIds: liveOrders.map(o => o.id) };
    }

    function stroll() {
      if (briefingActive) return;
      const idleIds = Object.keys(CHARS).filter(id => id !== 'captain' && id !== 'claude' && npcs[id]?.mode === 'idle');
      if (!idleIds.length) return;
      const pick = idleIds[Math.floor(Math.random() * idleIds.length)];
      walkNpcSafe(pick, 15.5, 22.5, {
        bubble: '☕ 잠시 커피 휴식 중…',
        onArrive: () => {
          npcs[pick].mode = 'stand'; npcs[pick].dir = 'back';
          setTimeout(() => {
            if (!briefingActive) walkNpcSafe(pick, CHARS[pick].home[0], CHARS[pick].home[1], { onArrive: () => seatNpc(pick) });
          }, 2200);
        }
      });
    }

    // ---------------------------------------------------------------- 대기 중 자율 사무실 생활 엔진 (12종: 화분 물주기·청소·책상 닦기·커피·테라스 환기·부서 수다 등!)
    const isFree = id => {
      const n = npcs[id];
      return n && n.mode === 'idle' && !realBusySet.has(id) && (!activeTalkNpc || activeTalkNpc.id !== id);
    };

    function doChore(id, tx, ty, workDir, goMsg, workMsg, workMs, returnMsg = '', emoteKey = null, exactPos = null) {
      if (briefingActive || !isFree(id)) return false;
      return walkNpcSafe(id, tx, ty, {
        bubble: goMsg,
        onArrive: () => {
          if (briefingActive) return;
          const n = npcs[id];
          if (exactPos) { n.x = exactPos[0]; n.y = exactPos[1]; }
          n.dir = workDir; n.bubble = workMsg; n.bubbleType = 'ok';
          if (emoteKey && imgs.walk[id]?.[emoteKey]?.length) {
            n.mode = 'emote'; n.emote = emoteKey; n.emoteLoop = true; n.emoteStart = performance.now() / 1000;
          } else {
            n.mode = 'stand';
          }
          setTimeout(() => {
            if (briefingActive || (activeTalkNpc && activeTalkNpc.id === id)) return;
            n.emote = null; n.emoteLoop = false;
            walkNpcSafe(id, CHARS[id].home[0], CHARS[id].home[1], {
              bubble: returnMsg,
              onArrive: () => seatNpc(id)
            });
          }, workMs);
        }
      });
    }

    function doPairChat(idA, idB, ax, ay, bx, by, msgA, msgB) {
      if (briefingActive || !isFree(idA) || !isFree(idB)) return false;
      let ready = 0;
      const onMeet = () => {
        if (briefingActive || ++ready < 2) return;
        const a = npcs[idA], b = npcs[idB];
        a.mode = 'stand'; b.mode = 'stand';
        a.dir = 'east'; b.dir = 'west';
        a.bubble = msgA; a.bubbleType = 'meet';
        setTimeout(() => {
          if (briefingActive) return;
          a.bubble = ''; b.bubble = msgB; b.bubbleType = 'ok';
          setTimeout(() => {
            if (briefingActive) return;
            b.bubble = '';
            walkNpcSafe(idA, CHARS[idA].home[0], CHARS[idA].home[1], { onArrive: () => seatNpc(idA) });
            walkNpcSafe(idB, CHARS[idB].home[0], CHARS[idB].home[1], { onArrive: () => seatNpc(idB) });
          }, 2600);
        }, 2500);
      };
      walkNpcSafe(idA, ax, ay, { onArrive: onMeet });
      walkNpcSafe(idB, bx, by, { onArrive: onMeet });
      return true;
    }

    const LIFE_EVENTS = [
      // 1. 선별팀 팀장: 중앙 복도 좌/우 화분 물주기 (화분 바로 옆 밀착 + 물뿌리개 12프레임 애니메이션!)
      () => {
        const leftPlant = Math.random() < 0.5;
        return doChore('sorter', leftPlant ? 32.5 : 67.2, 41.0, leftPlant ? 'west' : 'east',
          '🪴 물뿌리개 들고 화분 관리 가는 중…', '💧 화분에 물 주는 중… 쑥쑥 자라라!', 3800, '', 'water',
          leftPlant ? [31.9, 41.4] : [68.1, 41.4]);
      },
      // 2. 운영 감찰관: 중앙 복도 빗자루 바닥 청소 (전용 빗자루질 모션 준비되면 자동 연결!)
      () => doChore('inspector', 49.5, 48.0, 'front',
        '🧹 복도 바닥 청소하러 나왔습니다!', '🧹 중앙 복도 빗자루질 중… 깔끔하게!', 3600, '', 'sweep'),
      // 3. 인력 공급팀 팀장: 캡틴 책상 먼지 털기 (책상 좌측 앞쪽 y=23.0 밀착 → 먼지털이가 책상 상판 위를 직접 닦음!)
      () => doChore('staffing', 41.0, 23.0, 'east',
        '🪶 캡틴 책상 정돈하러 올라가는 중…', '✨ 캡틴 책상 먼지 닦아드렸습니다!', 3600, '', 'clean',
        [43.8, 23.0]),
      // 4. 비서실장: 캡틴 커피 서빙 & 안부 여쭙기
      () => {
        if (!isFree('claude')) return false;
        serveCoffee(); return true;
      },
      // 5. 시각 정보 비서: 스튜디오 조명·카메라 점검
      () => doChore('finder', 20.0, 42.0, 'west',
        '💡 스튜디오 조명 점검 중…', '📷 크로마키 조명·카메라 각도 완벽!', 2800),
      // 6. 감사실 2인방(운영 감찰관 + 데이터 감사관): 복도 교차 토론
      () => doPairChat('inspector', 'auditor', 36.0, 48.5, 41.5, 48.5,
        '🛡️ 방금 검수한 가격표 교차 확인했나요?', '📊 네! 오타 0건, 100% 일치합니다!'),
      // 7. 수석 번역관 + 비서실장: 번역 톤 상의
      () => {
        if (!isFree('translator')) return false;
        return doChore('translator', 49.8, 46.5, 'back',
          '🌐 번역 톤 상의하러 가는 중…', '💬 베트남어·영어 메뉴 표현 자연스럽게 다듬었어요!', 3000);
      },
      // 8. 디지털 메뉴 통제실 2인방(메뉴 검사관 + 자료 해석 비서): 복도 데이터 수다
      () => doPairChat('reader', 'agy', 58.0, 48.5, 63.5, 48.5,
        '📑 방금 해석한 메뉴 JSON 넘겼어요!', '🔍 좋아요, 모바일 화면 바로 대조할게요!'),
      // 9. 랜덤 대기 직원: 커피바 휴식 & 스트레칭
      () => {
        const pool = ['finder', 'agy', 'translator', 'sorter', 'inspector', 'staffing', 'reader', 'auditor'].filter(isFree);
        if (!pool.length) return false;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        const hr = new Date().getHours();
        const msg = (hr >= 11 && hr <= 13) ? '☕ 점심 식후 아아 한 잔 추출 중…' : '☕ 시원한 커피 한 잔 하며 스트레칭 중…';
        return doChore(pick, 15.5, 22.5, 'back', '☕ 커피바 휴식 가는 중…', msg, 3000);
      },
      // 10. 랜덤 대기 직원: 우측 테라스 창밖 구경(환기)
      () => {
        const pool = ['finder', 'agy', 'translator', 'sorter', 'inspector', 'staffing', 'reader', 'auditor'].filter(isFree);
        if (!pool.length) return false;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        return doChore(pick, 82.0, 22.5, 'back', '🌤️ 테라스 바람 좀 쐬러 가는 중…', '🌤️ 창밖 풍경이 좋네요… 잠시 환기 중!', 3200);
      },
      // 11. 서로 다른 부서 2명 복도 우연한 인사(Banter)
      () => {
        const pool = ['finder', 'translator', 'sorter', 'staffing', 'inspector', 'auditor'].filter(isFree);
        if (pool.length < 2) return false;
        const a = pool[Math.floor(Math.random() * pool.length)];
        const rest = pool.filter(x => x !== a);
        const b = rest[Math.floor(Math.random() * rest.length)];
        const pairs = [
          ['😊 오늘 점심 쌀국수 어때요?', '🍜 좋아요! 일 끝나고 같이 가요!'],
          ['☕ 커피 한 잔 하셨어요?', '😄 방금 마셨어요! 오후도 파이팅!'],
          ['📁 오늘 새 가게 메뉴 깔끔하네요!', '👍 사진이 잘 나와서 작업이 빨라요!'],
        ];
        const [m1, m2] = pairs[Math.floor(Math.random() * pairs.length)];
        return doPairChat(a, b, 46.5, 49.0, 52.5, 49.0, m1, m2);
      },
      // 12. 선별팀 팀장: 방 안 컨베이어 옆 박스 점검
      () => doChore('sorter', 85.0, 76.0, 'east',
        '📦 컨베이어 분류 상태 확인 중…', '✅ 포장 라인·분류함 이상 없음!', 2800),
      // 13. 비서실장 + 자료 해석 비서: 중앙 홀 합동 아이돌 댄스 타임!
      () => (isFree('claude') && isFree('reader')) ? danceParty() : false,
    ];

    function danceParty() {
      if (briefingActive) return false;
      const dancers = [
        { id: 'claude', tx: 46.8, ty: 49.0, go: '💃 무대로 나가는 중…', msg: '💃✨ 신나는 아이돌 댄스 타임!' },
        { id: 'reader', tx: 53.2, ty: 49.0, go: '🎶 같이 춤추러 가요!', msg: '🎶 같이 춤춰요 캡틴! ✨' },
      ];
      let burstDone = false;
      log('💃 비서실장 · 자료 해석 비서 합동 아이돌 댄스 타임!');
      for (const d of dancers) {
        const n = npcs[d.id];
        if (!n) continue;
        n.emote = null; n.emoteLoop = false;
        walkNpcSafe(d.id, d.tx, d.ty, {
          bubble: d.go,
          onArrive: () => {
            if (briefingActive) return;
            n.dir = 'front';
            n.mode = 'emote'; n.emote = 'dance'; n.emoteLoop = true;
            n.emoteStart = performance.now() / 1000;
            n.bubble = d.msg; n.bubbleType = 'meet';
            if (!burstDone) {
              burstDone = true;
              SFX.fanfare();
              spawnBurst(50.0, 47.0, '💃 아이돌 댄스! +20 EXP', 20);
            }
            setTimeout(() => {
              if (briefingActive || (activeTalkNpc && activeTalkNpc.id === d.id)) return;
              n.emote = null; n.emoteLoop = false; n.bubble = '';
              walkNpcSafe(d.id, CHARS[d.id].home[0], CHARS[d.id].home[1], {
                onArrive: () => seatNpc(d.id)
              });
            }, 7200);
          }
        });
      }
      return true;
    }

    let lastLifeIdx = -1;
    function scheduleIdleLife() {
      const waitMs = 6500 + Math.floor(Math.random() * 4500);
      setTimeout(() => {
        scheduleIdleLife();
        if (document.hidden || briefingActive || !modalBack.hidden) return;
        // 동시에 너무 많이 돌아다니지 않도록 현재 걷고 있는 직원이 3명 이하일 때만 새 생활 이벤트 시작!
        const walkingCount = Object.values(npcs).filter(n => n.id !== 'captain' && n.mode !== 'idle').length;
        if (walkingCount >= 3) return;
        for (let tries = 0; tries < 5; tries++) {
          const idx = Math.floor(Math.random() * LIFE_EVENTS.length);
          if (idx === lastLifeIdx) continue;
          if (LIFE_EVENTS[idx]()) { lastLifeIdx = idx; break; }
        }
      }, waitMs);
    }
    scheduleIdleLife();

    if (opts.autoDemo !== false) setTimeout(runDemo, 1500);
    return { runDemo, serveCoffee, captainWalk, hallChat, sitCaptainBack, playCaptainAction, startBriefing, endBriefing, syncReal, stroll, danceParty };
  }

  window.OfficeAnime = { create };
})();
