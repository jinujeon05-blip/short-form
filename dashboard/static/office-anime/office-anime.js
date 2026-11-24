// Jinwoo 에이전트 — 12프레임 고화질 웹툰/애니 사무실 (4명 선행 시연: 캡틴·비서실장·시각 정보 비서·메뉴 검사관)
(() => {
  const W = 2560, H = 1440;
  // 서 있는 키(그림판 px, 2026-11-23): 앉은 모습(seat.h 220~240)과 같은 그림이라 같은 기준으로 맞춤.
  // 예전 164는 앉은 사람보다 30% 작아 화분 옆에서 작아 보였음. 여자는 남자보다 6% 작게.
  const MALE_IDS = new Set(['captain', 'agy', 'auditor']); // 데이터 감사관=남, 자료 해석 비서=여(그림 파일은 서로 바뀌어 있음: asset)
  const STAND_H_MALE = 232, FEMALE_RATIO = 0.94;
  const standPx = id => STAND_H_MALE * (MALE_IDS.has(id) ? 1 : FEMALE_RATIO);
  const standPct = id => standPx(id) / H * 100; // 화면 세로 % (말풍선·퀘스트 표시 위치용) // 16:9 QHD 2K 고화질 (전체화면 선명도 보장)

  // bg-office.webp (2026-11-24 새 배경 '입체 오피스 평면도', 같은 날 9조각 고화질 3996x2248로 교체(좌표 %는 그대로)) 픽셀 실측 착석 좌표
  // (headTopY=머리 꼭대기, clipY=책상 상단 경계선(남향)·의자 좌판(북향), standPos=일어설 때 서는 책상 옆 바닥 — 반드시 걸을 수 있는 칸)
  // 옛 배경과 책상을 자동 대조(템플릿 비교)해 옮긴 뒤 합성 캡처로 확인함
  const CHARS = {
    captain:    { name: '캡틴',          role: '결재',        home: [50.0, 16.4], standPos: [55.5, 16.4], facing: 'front', scale: 1.0,  seat: { x: 50.0, headTopY: 5.9,  clipY: 12.45, h: 240 } },
    claude:     { name: '비서실장',      role: '지휘',        home: [50.0, 37.7], standPos: [44.0, 35.2], facing: 'front', scale: 0.96, seat: { x: 50.0, headTopY: 26.1, clipY: 31.9, h: 225 } },
    finder:     { name: '시각 정보 비서', role: '사진 고르기', home: [14.6, 43.3], standPos: [20.6, 43.2], facing: 'front', scale: 0.94, seat: { x: 14.6, headTopY: 31.6, clipY: 37.6, h: 225 } },
    agy:        { name: '메뉴 검사관',   role: '메뉴판 읽기', home: [83.0, 46.6], standPos: [79.6, 48.0], facing: 'back',  scale: 0.96, seat: { x: 83.0, headTopY: 33.5, clipY: 43.9, h: 220 } },
    translator: { name: '수석 번역관',   role: '4개국어 번역', home: [37.6, 71.5], standPos: [43.4, 71.5], facing: 'front', scale: 0.95, seat: { x: 37.6, headTopY: 62.4, clipY: 69.4, h: 235 } },
    sorter:     { name: '선별팀 팀장',   role: '방문 현황 담당',   home: [85.0, 70.9], standPos: [79.2, 70.6], facing: 'front', scale: 0.95, seat: { x: 85.0, headTopY: 62.2, clipY: 68.7, h: 230 } },
    inspector:  { name: '운영 감찰관',   role: '두 번째 검토', home: [7.2,  80.4], standPos: [11.2, 82.6], facing: 'back',  scale: 0.95, seat: { x: 7.2,  headTopY: 66.3, clipY: 77.1, h: 220 } },
    staffing:   { name: '인력 공급팀',   role: '인력·일정 관리', home: [64.5, 71.6], standPos: [58.2, 71.4], facing: 'front', scale: 0.95, seat: { x: 64.5, headTopY: 62.6, clipY: 69.4, h: 230 } },
    reader:     { name: '자료 해석 비서', role: '메뉴판 해석',  asset: 'auditor', home: [92.5, 46.5], standPos: [89.4, 48.0], facing: 'back',  scale: 0.96, seat: { x: 92.5, headTopY: 33.5, clipY: 43.9, h: 220 } },
    auditor:    { name: '데이터 감사관', role: '마지막 점검',  asset: 'reader',  home: [17.2, 80.4], standPos: [20.0, 82.6], facing: 'back',  scale: 0.95, seat: { x: 17.2, headTopY: 66.3, clipY: 77.1, h: 220 } },
  };

  // Y-깊이(앞/뒤 가림) 전경 가구 목록 (7개 방 모든 책상·의자 완비!):
  // 캐릭터의 발 위치(y)가 sortY보다 위(뒤)면 가구가 다리를 가리고, 아래(앞)면 캐릭터가 가구 앞에 서게 됨!
  const PROPS = [
    { key: 'captain-desk',       x0: 42.77, y0: 12.26, x1: 57.78, y1: 22.01, sortY: 21.62 },
    { key: 'claude-desk',        x0: 42.41, y0: 31.66, x1: 57.84, y1: 42.79, sortY: 42.37 },
    { key: 'finder-desk',        x0:  9.14, y0: 37.45, x1: 19.29, y1: 45.83, sortY: 45.44 },
    { key: 'red-left-desk',      x0: 78.04, y0: 37.28, x1: 86.78, y1: 44.50, sortY: 44.12 },
    { key: 'red-right-desk',     x0: 88.05, y0: 37.21, x1: 96.80, y1: 44.43, sortY: 44.05 },
    { key: 'agy-chair',          x0: 81.17, y0: 38.52, x1: 84.78, y1: 47.73, sortY: 47.06 },
    { key: 'red-right-chair',    x0: 90.62, y0: 38.45, x1: 94.42, y1: 47.66, sortY: 46.99 },
    { key: 'purple-left-desk',   x0:  2.85, y0: 68.42, x1: 12.18, y1: 78.36, sortY: 77.95 },
    { key: 'purple-right-desk',  x0: 12.87, y0: 68.42, x1: 22.09, y1: 78.36, sortY: 77.95 },
    { key: 'purple-left-chair',  x0:  5.21, y0: 70.47, x1:  9.31, y1: 81.74, sortY: 81.23 },
    { key: 'purple-right-chair', x0: 15.13, y0: 70.47, x1: 19.23, y1: 81.74, sortY: 81.23 },
    { key: 'navy-desk',          x0: 32.69, y0: 69.18, x1: 42.59, y1: 78.45, sortY: 78.00 },
    { key: 'sky-desk',           x0: 59.92, y0: 69.25, x1: 69.37, y1: 78.52, sortY: 78.07 },
    { key: 'orange-desk',        x0: 80.99, y0: 68.56, x1: 89.41, y1: 77.81, sortY: 77.34 },
  ];

  const SIGNS = [
    { text: '미디어 관제실',     x: 14.5, y: 23.9, bg: '#15803d' },
    { text: '디지털 메뉴 통제실', x: 85.0, y: 23.9, bg: '#dc2626' },
    { text: '감사실',           x: 11.5, y: 49.3, bg: '#7c3aed' },
    { text: '통번역 통제실',     x: 36.8, y: 49.4, bg: '#2563eb' },
    { text: '인력 공급팀',       x: 63.6, y: 49.4, bg: '#0284c7' },
    { text: '선별팀',           x: 88.5, y: 49.4, bg: '#ea580c' },
  ];

  // 동선 경유점(2026-11-24 새 배경): 실제 이동은 safeRoute()가 점과 점 사이를 A* 길찾기로 이어 벽·문짝을 절대 뚫지 않음
  const ROUTES = {
    chiefToCof:   [[44.0, 35.2], [34.5, 35.2], [34.5, 22.0], [15.5, 22.0]],
    cofToCap:     [[15.5, 22.0], [27.5, 22.0], [39.5, 21.0]],
    capToChief:   [[39.5, 21.0], [34.5, 22.0], [34.5, 35.2], [44.0, 35.2], [50.0, 37.7]],
    finderToHall: [[20.6, 43.2], [24.0, 46.5], [28.5, 46.6], [40.5, 45.5]],
    agyToHall:    [[79.6, 48.0], [73.5, 47.2], [53.5, 45.5]],
    transToHall:  [[43.4, 71.5], [46.6, 78.0], [50.5, 78.0], [50.5, 56.0]],
    hallToTrans:  [[50.5, 56.0], [50.5, 78.0], [46.6, 78.0], [43.4, 71.5], [37.6, 71.5]],
    sorterToHall: [[79.2, 70.6], [75.0, 70.5], [75.0, 47.5], [66.0, 45.5]],
    hallToSorter: [[66.0, 45.5], [75.0, 47.5], [75.0, 70.5], [79.2, 70.6], [85.0, 70.9]],
    inspToHall:   [[11.2, 82.6], [24.5, 80.5], [24.5, 50.0], [34.0, 46.5]],
    hallToInsp:   [[34.0, 46.5], [24.5, 50.0], [24.5, 80.5], [11.2, 82.6], [7.2, 80.4]],
    staffToHall:  [[58.2, 71.4], [57.5, 78.0], [51.0, 78.0], [51.0, 59.0]],
    hallToStaff:  [[51.0, 59.0], [51.0, 78.0], [57.5, 78.0], [58.2, 71.4], [64.5, 71.6]],
    readerToHall: [[89.4, 48.0], [73.5, 47.2], [58.5, 45.5]],
    hallToReader: [[58.5, 45.5], [73.5, 47.2], [89.4, 48.0], [92.5, 46.5]],
    auditToHall:  [[20.0, 82.6], [24.5, 80.5], [24.5, 50.0], [38.5, 46.5]],
    hallToAudit:  [[38.5, 46.5], [24.5, 50.0], [24.5, 80.5], [20.0, 82.6], [17.2, 80.4]],
  };

  function loadAll() {
    const imgs = { walk: {}, masks: {} };
    const load = (obj, k, url) => new Promise(res => {
      const im = new Image();
      im.onload = () => { obj[k] = im; res(); };
      im.onerror = () => res();
      im.src = url;
    });
    const jobs = [load(imgs, 'bg', '/static/office-anime/assets/bg-office.webp?v=hq4k6')];
    for (const [id, cfg] of Object.entries(CHARS)) {
      imgs.walk[id] = { east: [], front: [], back: [], se: [], ne: [], greet: [], coffee: [], kick: [], water: [], clean: [], dance: [], sweep: [], brew: [], carry: [], serve: [] };
      const dirs = id === 'captain' ? ['east', 'front', 'back', 'se', 'ne', 'greet', 'coffee', 'kick']
        : id === 'claude' ? ['east', 'front', 'back', 'se', 'ne', 'dance', 'brew', 'carry', 'serve']
        : id === 'reader' ? ['east', 'front', 'back', 'se', 'ne', 'dance']
        : id === 'sorter' ? ['east', 'front', 'back', 'water']
        : id === 'staffing' ? ['east', 'front', 'back', 'clean']
        : id === 'inspector' ? ['east', 'front', 'back', 'sweep']
        : ['east', 'front', 'back'];
      const assetId = cfg.asset || id;
      for (const dir of dirs) {
        for (let i = 1; i <= 12; i++) {
          const v = id === 'captain' ? (dir === 'kick' ? 'kick1' : 'cap8dir') : (dir === 'brew' || dir === 'carry' || dir === 'serve') ? 'cof3' : (dir === 'se' || dir === 'ne') ? 'diag1' : (dir === 'water' || dir === 'clean' || dir === 'dance' || dir === 'sweep') ? 'act3' : 'orig2k';
          jobs.push(load(imgs.walk[id][dir], i - 1, `/static/office-anime/assets/walk/${assetId}-${dir}-${i}.webp?v=${v}`));
        }
      }
      // 캡틴 주먹 격투(복싱 연속 공격)는 15프레임 — 챗GPT 3명씩 5장(가드·잽·스트레이트·훅·어퍼컷)
      if (id === 'captain') {
        imgs.walk[id].punch = [];
        for (let i = 1; i <= 15; i++) jobs.push(load(imgs.walk[id].punch, i - 1, `/static/office-anime/assets/walk/captain-punch-${i}.webp?v=punch1`));
      }
      // 비서실장 책상 업무(문서 작성) 12프레임 — 앉아 있는 동안 계속 반복(챗GPT 3명씩 4장: 쓰기·생각·종이 넘기기·서명)
      if (id === 'claude') {
        imgs.walk[id].write = [];
        for (let i = 1; i <= 12; i++) jobs.push(load(imgs.walk[id].write, i - 1, `/static/office-anime/assets/walk/claude-write-${i}.webp?v=write1`));
      }
      // 운영 감찰관 솔로 댄스 36프레임 (127 BPM 전용 BGM 17.35초 칼박 싱크: 인트로6 + 메인24×2 + 엔딩6)
      if (id === 'inspector') {
        imgs.walk[id].dance = [];
        for (let i = 1; i <= 36; i++) jobs.push(load(imgs.walk[id].dance, i - 1, `/static/office-anime/assets/walk/inspector-dance-${i}.webp?v=idance1`));
      }
    }
    for (const p of PROPS) {
      jobs.push(load(imgs.masks, p.key, `/static/office-anime/assets/masks/${p.key}.webp?v=hq4k2`));
    }
    return Promise.all(jobs).then(() => imgs);
  }

  function create(root, opts = {}) {
    let realBusySet = new Set(); // 대시보드에서 실제로 일하는 중인 직원(syncReal이 채움) — 위쪽 함수들이 먼저 쓰므로 맨 앞에 둠
    const DOCK_IDS = ['claude', 'finder', 'agy', 'reader', 'inspector', 'auditor', 'translator', 'staffing', 'sorter'];
    const DOCK_SHORT = { claude: '비서', finder: '시각', agy: '검사', reader: '해석', inspector: '감찰', auditor: '감사', translator: '번역', staffing: '인력', sorter: '선별' };
    const dockHtml = DOCK_IDS.map(id => {
      const c = CHARS[id];
      return `<button type="button" class="oa-dock-btn" data-dock="${id}" title="${c.name}(${c.role}) 캡틴 앞으로 호출">
        <img src="/static/office-anime/assets/portraits/${c.asset || id}.webp?v=cap3" alt="${c.name}">
        <span>${DOCK_SHORT[id]}</span><i class="oa-dock-q" hidden></i>
      </button>`;
    }).join('');
    root.innerHTML = `
      <div class="oa-stage">
        <div class="oa-rot-wrap">
          <canvas class="oa-canvas" width="${W}" height="${H}"></canvas>
          <div class="oa-cam" data-cam>
            <div class="oa-hud"></div>
          </div>
          <div class="oa-joy" data-joy aria-label="캡틴 이동 조이스틱"><div class="oa-joy-knob" data-joy-knob></div></div>
          <div class="oa-rpg-hud">
            <span class="oa-rpg-pill" data-rpg-stat>👑 <b>Lv.1</b> 캡틴 · 퀘스트 <span class="oa-rpg-qcnt zero" data-qcnt>0</span></span>
            <button type="button" class="oa-cam-btn on" data-cam-btn title="게임 카메라(캡틴 확대 추적) / 전체 보기 전환">🗺 전체 보기</button>
          </div>
          <div class="oa-snd-bar">
            <button type="button" class="oa-snd-btn on" data-sfx-btn title="게임 효과음 켜기/끄기">🔊 효과음</button>
            <button type="button" class="oa-snd-btn" data-bgm-btn title="사무실 BGM 켜기/끄기">🎵 BGM</button>
          </div>
          <div class="oa-dock" data-dock-bar aria-label="직원 빠른 호출">${dockHtml}</div>
          <div class="oa-ctrl-hint">🎮 WASD·방향키 이동 · 바닥 클릭 · 1 인사 · 2 커피 · 3 발차기 · 4 주먹 · E 착석</div>
          <div class="oa-skills" aria-label="액션 스킬창">
            <button type="button" class="oa-sk sk-sit" data-cap-sit title="캡틴 대표석 복귀(E)"><i>🪑</i><span>착석</span></button>
            <button type="button" class="oa-sk sk-cof" data-brief-cof title="비서실장 커피 서빙"><i>☕</i><span>서빙</span></button>
            <button type="button" class="oa-sk sk-dance" data-brief-dance title="비서실장·자료해석 합동 댄스"><i>💃</i><span>댄스</span></button>
            <button type="button" class="oa-sk sk-solo" data-inspector-dance title="운영 감찰관 솔로 댄스 (전용 BGM)"><i>👍</i><span>솔로</span></button>
            <button type="button" class="oa-sk sk-capcof" data-cap-coffee title="캡틴 커피 마시기(2)"><i>☕</i><span>커피</span></button>
            <button type="button" class="oa-sk sk-kick" data-cap-kick title="캡틴 태권도 발차기 시범(3)"><i>🥋</i><span>발차기</span></button>
            <button type="button" class="oa-sk sk-punch" data-cap-punch title="캡틴 주먹 격투 연속 공격(4)"><i>👊</i><span>주먹</span></button>
            <button type="button" class="oa-sk sk-greet" data-cap-greet title="캡틴 격려 인사(1)"><i>👋</i><span>인사</span></button>
            <button type="button" class="oa-sk sk-main start" data-brief-start title="전 직원 단상 앞 보고"><i>📋</i><span>보고해</span></button>
            <button type="button" class="oa-sk sk-main stop" data-brief-stop hidden title="보고 종료 및 해산"><i>✋</i><span>종료</span></button>
          </div>
          <button type="button" class="oa-fs-btn" title="전체화면 전환">⛶ 전체화면</button>
          <div class="oa-modal-back" hidden><div class="oa-modal"></div></div>
        </div>
      </div>`;
    const stage = root.querySelector('.oa-stage');
    const camEl = root.querySelector('[data-cam]');
    const camBtn = root.querySelector('[data-cam-btn]');
    const canvas = root.querySelector('.oa-canvas');
    const hud = root.querySelector('.oa-hud');
    const fsBtn = root.querySelector('.oa-fs-btn');
    const dockBtns = {};
    root.querySelectorAll('[data-dock]').forEach(btn => {
      dockBtns[btn.dataset.dock] = btn;
      btn.addEventListener('click', () => openTalkModal(btn.dataset.dock));
    });
    // 캡틴 확대 추적 게임 카메라 (기본값: follow 1.85배 확대 추적, 보고 중엔 단상 앞 2.4배 확대)
    let camMode = 'follow';
    const cam = { z: 1.85, fx: CHARS.captain.home[0], fy: CHARS.captain.home[1] + 5, tx: 0, ty: 0 };
    let modalTargets = [], modalSlot = null, modalPlaceAt = 0; // 대화창 자리 정하기(placeModal)용
    camBtn?.addEventListener('click', () => {
      camMode = (camMode === 'follow') ? 'overview' : 'follow';
      camBtn.classList.toggle('on', camMode === 'follow');
      camBtn.textContent = camMode === 'follow' ? '🗺 전체 보기' : '🎥 추적 카메라';
      SFX.tap();
    });
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

    // ---- 화질·속도: 그림판은 '화면에 보이는 부분'만 화면 실제 픽셀 크기로 그림 (2026-11-23)
    // 카메라 확대·이동은 CSS가 아니라 그림판 안(setTransform)에서 함 → 선명하고, 안 보이는 곳은 안 그려서 빠름.
    // 그리는 좌표는 그대로 2560×1440 기준. 이름표·말풍선(HUD)만 .oa-cam에서 CSS로 같이 움직임.
    // (11-23 첫 시도는 전체를 3584로 그려 PC 전체화면이 16.6ms→34ms로 끊겼음)
    let resCheckAt = 0;
    function updateCanvasRes() {
      const wrap = root.querySelector('.oa-rot-wrap');
      const cssW = wrap?.clientWidth || W;
      const dpr = Math.min(3, window.devicePixelRatio || 1);
      const bw = Math.max(640, Math.min(3200, Math.round(cssW * dpr / 16) * 16)); // 16px 단위로만 바꿈
      if (canvas.width === bw) return;
      canvas.width = bw;
      canvas.height = Math.round(bw * H / W);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    let imgs = { walk: {}, masks: {} };
    loadAll().then(loaded => { imgs = loaded; });

    const npcs = {};
    for (const [id, cfg] of Object.entries(CHARS)) {
      npcs[id] = {
        id, x: cfg.home[0], y: cfg.home[1],
        mode: 'idle', dir: cfg.facing, path: [], speed: id === 'captain' ? 6.5 : 4.2, walkDist: 0,
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
    function noiseBurst(dur = 0.12, vol = 0.035, delay = 0) {
      if (!sfxOn) return;
      const c = ensureAudio();
      if (!c) return;
      const len = Math.max(1, Math.floor(c.sampleRate * dur));
      const buf = c.createBuffer(1, len, c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.sin((i / len) * Math.PI);
      const src = c.createBufferSource();
      src.buffer = buf;
      const flt = c.createBiquadFilter();
      flt.type = 'bandpass'; flt.frequency.value = 1800; flt.Q.value = 1.2;
      const g = c.createGain();
      g.gain.value = vol;
      src.connect(flt); flt.connect(g); g.connect(c.destination);
      src.start(c.currentTime + delay);
    }
    // ---- 진짜 소리 파일(2026-11-23): 직원 목소리 assets/voice/<직원>-<call|ok|done|greet>.mp3(ElevenLabs v3 감정 목소리),
    //      행동 효과음 assets/sfx/<이름>.mp3(ElevenLabs). 효과음 버튼(sfxOn)으로 같이 켜고 끔. 파일이 없거나 실패하면 예전 기계음.
    const CLIP_BASE = '/static/office-anime/assets/';
    const clipRaw = {}, clipBuf = {};
    function fetchClip(path) {
      if (!clipRaw[path]) clipRaw[path] = fetch(CLIP_BASE + path + '?v=4').then(r => r.ok ? r.arrayBuffer() : null).catch(() => null);
      return clipRaw[path];
    }
    async function getClip(path) {
      if (clipBuf[path]) return clipBuf[path];
      const c = ensureAudio(); if (!c) return null;
      const raw = await fetchClip(path); if (!raw) return null;
      try { clipBuf[path] = await c.decodeAudioData(raw.slice(0)); } catch { return null; }
      return clipBuf[path];
    }
    async function playClip(path, vol = 1, delay = 0) {
      if (!sfxOn) return null;
      const buf = await getClip(path);
      const c = actx; if (!buf || !c || !sfxOn) return null;
      const src = c.createBufferSource(), g = c.createGain();
      src.buffer = buf; g.gain.value = vol;
      src.connect(g); g.connect(c.destination);
      src.start(c.currentTime + delay);
      return src;
    }
    // 목소리는 한 번에 한 명만(겹치면 앞사람 끊고 새 사람) — 여러 명이 동시에 떠들지 않게
    let voiceSrc = null;
    const VOICE_KINDS = { captain: ['greet', 'brief', 'end', 'coffee'] };
    const voiceKinds = id => VOICE_KINDS[id] || ['call', 'ok', 'done', 'greet'];
    async function voice(id, kind, delay = 0) {
      if (!sfxOn || !CHARS[id] || !voiceKinds(id).includes(kind)) return;
      if (delay) await new Promise(r => setTimeout(r, delay * 1000));
      const buf = await getClip(`voice/${id}-${kind}.mp3`);
      if (!buf || !sfxOn) return;
      try { voiceSrc?.stop(); } catch {}
      voiceSrc = await playClip(`voice/${id}-${kind}.mp3`, 1.0);
    }
    // 처음 열 때 파일만 미리 받아 둠(소리 해독은 첫 터치 뒤) — 합쳐서 약 0.6MB
    if (sfxOn) setTimeout(() => {
      ['coffee', 'sit', 'water', 'sweep', 'dance', 'brief', 'send'].forEach(n => fetchClip(`sfx/${n}.mp3`));
      Object.keys(CHARS).forEach(id => voiceKinds(id).forEach(k => fetchClip(`voice/${id}-${k}.mp3`)));
    }, 1500);
    const clipOr = (name, vol, fallback) => { playClip(`sfx/${name}.mp3`, vol).then(src => { if (!src && sfxOn) fallback(); }); };

    const SFX = {
      tap:       () => { tone(580, 0.08, 'triangle', 0.07); tone(820, 0.09, 'triangle', 0.06, 0.05); navigator.vibrate?.(12); },
      close:     () => { tone(520, 0.07, 'sine', 0.055); tone(380, 0.08, 'sine', 0.045, 0.045); },
      walkClick: () => { tone(660, 0.06, 'sine', 0.05); tone(990, 0.07, 'sine', 0.04, 0.035); },
      send:      () => { navigator.vibrate?.([15, 25, 20]); clipOr('send', 0.8, () => { tone(523, 0.09, 'triangle', 0.08); tone(659, 0.09, 'triangle', 0.08, 0.07); tone(784, 0.14, 'triangle', 0.09, 0.14); }); },
      fanfare:   () => {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i === 3 ? 0.42 : 0.12, 'triangle', 0.10, i * 0.09));
        tone(659.25, 0.42, 'sine', 0.06, 0.27);
        tone(783.99, 0.42, 'sine', 0.06, 0.27);
        navigator.vibrate?.([20, 35, 20, 35, 45]);
      },
      brief:     () => { navigator.vibrate?.([20, 40, 20]); clipOr('brief', 0.9, () => { tone(659.25, 0.22, 'sine', 0.09); tone(523.25, 0.36, 'sine', 0.09, 0.20); }); },
      kick:      () => { [0, 0.75, 1.5, 2.25].forEach(d => noiseBurst(0.09, 0.05, d)); navigator.vibrate?.([12, 60, 12]); },
      punch:     () => { [0.32, 0.81, 1.29, 1.78, 2.1].forEach(d => noiseBurst(0.06, 0.045, d)); navigator.vibrate?.([10, 40, 10, 40, 14]); },
      greet:     () => { tone(587.33, 0.09, 'triangle', 0.07); tone(880.0, 0.14, 'triangle', 0.07, 0.08); navigator.vibrate?.(14); },
      coffee:    () => clipOr('coffee', 0.8, () => { tone(1174, 0.07, 'sine', 0.05); tone(1568, 0.09, 'sine', 0.045, 0.07); tone(880, 0.12, 'triangle', 0.05, 0.15); }),
      sit:       () => clipOr('sit', 0.7, () => { tone(260, 0.07, 'triangle', 0.065); tone(196, 0.09, 'sine', 0.05, 0.05); }),
      water:     () => clipOr('water', 0.7, () => { [740, 920, 1120, 880].forEach((f, i) => tone(f, 0.07, 'sine', 0.045, i * 0.075)); }),
      sweep:     () => clipOr('sweep', 0.7, () => { noiseBurst(0.14, 0.032, 0); noiseBurst(0.14, 0.028, 0.22); }),
      dance:     () => {
        navigator.vibrate?.([15, 20, 15, 20, 30]);
        clipOr('dance', 0.8, () => [587.33, 739.99, 880.0, 1174.66, 1479.98].forEach((f, i) => tone(f, 0.14, 'triangle', 0.085, i * 0.065)));
      },
      step:      () => { tone(190, 0.03, 'sine', 0.018); },
    };

    // 사무실 BGM 1곡 반복 재생 (2026-11-24 캡틴 지시: 'adventure tale' 1곡만, mp3는 모든 브라우저 재생)
    const BGM_TRACKS = ['bgm-adventure'];
    const bgmBufs = [null];
    let bgmIdx = 0, bgmSrc = null, bgmGain = null, bgmLoading = false;
    async function loadBgmTrack(c, idx) {
      if (bgmBufs[idx]) return bgmBufs[idx];
      try {
        const res = await fetch(`/static/office-anime/assets/${BGM_TRACKS[idx]}.mp3?v=1`);
        if (!res.ok) return null;
        bgmBufs[idx] = await c.decodeAudioData(await res.arrayBuffer());
        return bgmBufs[idx];
      } catch { return null; }
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
      if (oldSrc) {
        oldSrc.onended = null;
        setTimeout(() => { try { oldSrc.stop(); oldSrc.disconnect(); } catch {} }, 280);
      }
    }
    async function playBgmAt(idx) {
      if (!bgmOn) return;
      const c = ensureAudio();
      if (!c || bgmLoading) return;
      bgmLoading = true;
      const buf = await loadBgmTrack(c, idx);
      bgmLoading = false;
      if (!buf || !bgmOn) return;
      stopBgmNode();
      const src = c.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const g = c.createGain();
      const now = c.currentTime;
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(0.42, now + 0.45);
      src.connect(g); g.connect(c.destination);
      src.start(0);
      bgmSrc = src; bgmGain = g;
      if (bgmBtn) bgmBtn.textContent = '🎵 BGM 켜짐';
    }
    function toggleBgm() {
      bgmOn = !bgmOn;
      bgmBtn?.classList.toggle('on', bgmOn);
      if (!bgmOn) {
        stopBgmNode();
        if (bgmBtn) bgmBtn.textContent = '🎵 BGM';
        return;
      }
      playBgmAt(bgmIdx);
    }
    // 캐릭터별 7.20초 전용 아이돌 댄스 음악 재생 + 재생 중 BGM 자동 덕킹(볼륨 낮춤 → 끝나면 복원)
    const danceBufs = {};
    let danceSrc = null, danceThemeIdx = 0;
    function stopDanceMusic() {
      if (danceSrc) { try { danceSrc.onended = null; danceSrc.stop(); danceSrc.disconnect(); } catch {} danceSrc = null; }
      if (bgmGain && actx && bgmOn) {
        try { bgmGain.gain.setTargetAtTime(0.42, actx.currentTime, 0.25); } catch {}
      }
    }
    async function playDanceMusic(who = 'claude') {
      if (!sfxOn) return;
      const c = ensureAudio();
      if (!c) return;
      stopDanceMusic();
      const key = who === 'inspector' ? 'dance-inspector' : who === 'reader' ? 'dance-reader' : 'dance-claude';
      if (!danceBufs[key]) {
        const probe = document.createElement('audio');
        const urls = probe.canPlayType('audio/ogg; codecs="vorbis"')
          ? [`/static/office-anime/assets/${key}.ogg?v=1`, `/static/office-anime/assets/${key}.m4a?v=1`]
          : [`/static/office-anime/assets/${key}.m4a?v=1`, `/static/office-anime/assets/${key}.ogg?v=1`];
        for (const u of urls) {
          try {
            const res = await fetch(u);
            if (!res.ok) continue;
            danceBufs[key] = await c.decodeAudioData(await res.arrayBuffer());
            break;
          } catch {}
        }
      }
      const buf = danceBufs[key];
      if (!buf) { SFX.dance(); return; }
      // 댄스 음악이 나오는 동안 배경 BGM을 부드럽게 줄임
      if (bgmGain && bgmOn) {
        try { bgmGain.gain.setTargetAtTime(0.05, c.currentTime, 0.15); } catch {}
      }
      const src = c.createBufferSource();
      src.buffer = buf;
      const g = c.createGain();
      g.gain.setValueAtTime(0.55, c.currentTime);
      src.connect(g); g.connect(c.destination);
      src.onended = () => {
        if (danceSrc === src) danceSrc = null;
        if (bgmGain && actx && bgmOn) {
          try { bgmGain.gain.setTargetAtTime(0.42, actx.currentTime, 0.28); } catch {}
        }
      };
      src.start(0);
      danceSrc = src;
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
        id === 'captain'
          ? `<div class="oa-tag oa-tag-cap" data-tag="${id}"><span class="oa-crown">👑</span><b>${c.name}</b><small>${c.role}</small></div>
             <div class="oa-quest" data-q="${id}" hidden>!</div>
             <div class="oa-bub" data-bub="${id}" hidden></div>`
          : `<div class="oa-tag" data-tag="${id}"><b>${c.name}</b><small>${c.role}</small></div>
             <div class="oa-quest" data-q="${id}" hidden>!</div>
             <div class="oa-bub" data-bub="${id}" hidden></div>`
      ).join('') +
      `<button type="button" class="oa-cap-status" data-cap-status hidden title="캡틴 실시간 업무·결재 상태 (클릭 시 바로 이동)"></button>
       <div class="oa-cap-hp" data-cap-hp title="클로드 잔여량 · 위: 5시간(녹색) / 아래: 주간(파랑)">
         <div class="oa-hp-track"><div class="oa-hp-fill h5" data-hp-5h style="width:100%"></div></div>
         <div class="oa-hp-track"><div class="oa-hp-fill wk" data-hp-wk style="width:100%"></div></div>
       </div>
       <div class="oa-cap-ring" data-cap-ring>
         <button type="button" class="oa-cr-item i0" data-cr="newshop">🏪 새 가게 제작</button>
         <button type="button" class="oa-cr-item i1" data-cr="greet">👋 격려 인사</button>
         <button type="button" class="oa-cr-item i2" data-cr="coffee">☕ 커피 휴식</button>
         <button type="button" class="oa-cr-item i3" data-cr="sit">🪑 대표석 복귀</button>
       </div>`;
    const capStatusEl = hud.querySelector('[data-cap-status]');
    const capHpEl = hud.querySelector('[data-cap-hp]');
    const capHp5h = hud.querySelector('[data-hp-5h]');
    const capHpWk = hud.querySelector('[data-hp-wk]');
    const capRingEl = hud.querySelector('[data-cap-ring]');
    let latestOrders = [], pendingApprovals = [];
    // 방문 현황 담당(선별팀 팀장) 30분 보고 (2026-11-24, 캡틴 다-1) — 서버 dashboard/visits.py 의 report
    let latestVisits = null;
    const lsGet = k => { try { return localStorage.getItem(k) || ''; } catch { return ''; } };
    const lsSet = (k, v) => { try { localStorage.setItem(k, String(v)); } catch {} };
    capStatusEl?.addEventListener('click', e => {
      e.stopPropagation();
      SFX.tap();
      if (pendingApprovals.length && opts.onOpenOrder) {
        opts.onOpenOrder(pendingApprovals[0].id);
      } else if (pendingApprovals.length) {
        openTalkModal('claude');
      } else if (latestOrders.length && opts.onOpenOrder) {
        opts.onOpenOrder(latestOrders[0].id);
      } else {
        setCapRing(!capRingOpen);
      }
    });
    let capRingOpen = false;
    let capRingOrigin = { x: 0, y: 0 };
    function setCapRing(open) {
      if (capRingOpen === open) return;
      capRingOpen = open;
      capRingEl?.classList.toggle('open', open);
      if (open) {
        capRingOrigin = { x: npcs.captain.x, y: npcs.captain.y };
        SFX.tap();
      } else {
        SFX.close();
      }
    }
    capRingEl?.addEventListener('click', e => {
      const btn = e.target.closest('[data-cr]');
      if (!btn) return;
      e.stopPropagation();
      const act = btn.dataset.cr;
      setCapRing(false);
      if (act === 'greet') playCaptainAction('greet');
      else if (act === 'coffee') playCaptainAction('coffee');
      else if (act === 'sit') sitCaptainBack();
      else if (act === 'approval' && pendingApprovals.length) {
        if (opts.onOpenOrder) opts.onOpenOrder(pendingApprovals[0].id);
        else openTalkModal('claude');
      }
      else if (act === 'newshop') {
        openTalkModal('captain');
        const inp = modal.querySelector('input[name="msg"]');
        if (inp) {
          inp.value = '<가게명> 사진 수집기로 올렸어. 가게 찾기용(무동의·무료)으로 새 메뉴판 만들어줘.';
          inp.focus(); inp.setSelectionRange(0, 5);
        }
      }
    });

    const tagEls = {}, bubEls = {}, questEls = {};
    for (const id of Object.keys(CHARS)) {
      tagEls[id] = hud.querySelector(`[data-tag="${id}"]`);
      bubEls[id] = hud.querySelector(`[data-bub="${id}"]`);
      questEls[id] = hud.querySelector(`[data-q="${id}"]`);
    }
    tagEls.captain?.addEventListener('click', e => {
      e.stopPropagation();
      setCapRing(!capRingOpen);
    });
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

    // 작업 중(대시보드에서 실제 일하는 중) 직원은 자리에서 움직이지 않음(2026-11-24 캡틴 요청).
    // 예외: 자기 자리로 돌아가는 길, 캡틴이 직접 부른 것(직원 클릭·보고해 = force)
    function busyBlocked(id, pts, force) {
      if (force || !realBusySet.has(id) || id === 'captain') return false;
      const c = CHARS[id], last = pts && pts[pts.length - 1];
      if (c && last && (Math.hypot(last[0] - c.home[0], last[1] - c.home[1]) < 4 ||
        (c.standPos && Math.hypot(last[0] - c.standPos[0], last[1] - c.standPos[1]) < 4))) return false;
      return true;
    }

    function sendPath(id, pts, { bubble = '', bubbleType = '', onArrive = null, force = false } = {}) {
      const n = npcs[id];
      if (busyBlocked(id, pts, force)) return false;
      n.path = pts.map(p => [p[0], p[1]]);
      n.mode = 'walk';
      n.bubble = bubble;
      n.bubbleType = bubbleType;
      n.onArrive = onArrive;
      return true;
    }

    function serveCoffee() {
      if (briefingActive) return;
      const cl = npcs.claude, cap = npcs.captain;
      if (cl.mode === 'walk' || cl.mode === 'emote') return;
      if (realBusySet.has('claude')) return;
      SFX.coffee();
      log('☕ 비서실장이 커피바에서 커피를 추출해 캡틴께 서빙합니다');
      cl.walkOverride = null;
      sendPath('claude', safeRoute(ROUTES.chiefToCof), {
        bubble: '☕ 캡틴 커피 타러 가는 중…',
        onArrive: () => {
          if (briefingActive) return;
          cl.dir = 'back';
          cl.mode = 'emote'; cl.emote = 'brew'; cl.emoteLoop = true;
          cl.emoteStart = performance.now() / 1000;
          cl.bubble = '☕ 원두 커피 추출 중…';
          SFX.coffee();
          setTimeout(() => {
            if (briefingActive) return;
            cl.emote = null; cl.emoteLoop = false;
            cl.walkOverride = 'carry';
            sendPath('claude', safeRoute(ROUTES.cofToCap), {
              bubble: '☕ 캡틴, 커피 가져왔습니다!', bubbleType: 'ok',
              onArrive: () => {
                if (briefingActive) { cl.walkOverride = null; return; }
                cl.walkOverride = null;
                cl.x = 43.0; cl.y = 22.8; // 캡틴 책상 바로 앞 밀착!
                cl.dir = 'east';
                cl.mode = 'emote'; cl.emote = 'serve'; cl.emoteLoop = false;
                cl.emoteStart = performance.now() / 1000;
                cl.bubble = '☕ 캡틴, 따뜻한 커피 내려놓았습니다!'; cl.bubbleType = 'ok';
                SFX.coffee();
                setTimeout(() => {
                  cap.bubble = '☕ 고마워요! 잘 마실게요'; cap.bubbleType = 'ok';
                }, 900);
                setTimeout(() => {
                  if (briefingActive) return;
                  cl.emote = null; cl.emoteLoop = false;
                  sendPath('claude', safeRoute(ROUTES.capToChief), {
                    bubble: '',
                    onArrive: () => {
                      seatNpc('claude');
                      setTimeout(() => { if (cap.bubble.includes('고마워요')) cap.bubble = ''; }, 2400);
                    },
                  });
                }, 3100);
              },
            });
          }, 2400);
        },
      });
    }

    function captainWalk() {
      if (briefingActive) return;
      const cap = npcs.captain;
      if (cap.mode === 'walk') return;
      log('🚶 캡틴이 계단·통로를 따라 오른쪽 테라스로 산책');
      walkCaptainSafe(82.0, 19.8, {
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
      if (realBusySet.has('finder') || realBusySet.has('agy')) return;
      let ready = 0;
      log('💬 시각 정보 비서 · 메뉴 검사관 중앙 복도 12프레임 이동 후 업무 수다');
      const talk = () => {
        f.mode = 'stand'; a.mode = 'stand'; f.dir = 'east'; a.dir = 'west';
        f.bubble = '메뉴판 사진 6장 정리 끝났어요! 📷'; f.bubbleType = 'meet';
        setTimeout(() => {
          f.bubble = ''; a.bubble = '좋아요! 가격표 바로 대조할게요 🔍'; a.bubbleType = 'ok';
          setTimeout(() => {
            a.bubble = '';
            sendPath('finder', safeRoute([...ROUTES.finderToHall.slice().reverse(), CHARS.finder.home]), {
              onArrive: () => seatNpc('finder'),
            });
            sendPath('agy', safeRoute([...ROUTES.agyToHall.slice().reverse(), CHARS.agy.home]), {
              onArrive: () => seatNpc('agy'),
            });
          }, 2500);
        }, 2500);
      };
      sendPath('finder', safeRoute(ROUTES.finderToHall), { onArrive: () => { if (++ready === 2) talk(); } });
      sendPath('agy', safeRoute(ROUTES.agyToHall), { onArrive: () => { if (++ready === 2) talk(); } });
    }

    function transConsult() {
      if (briefingActive) return;
      const tr = npcs.translator;
      if (!tr || tr.mode === 'walk') return;
      log('🌐 수석 번역관이 번역 톤 상의를 위해 중앙 복도로 이동');
      sendPath('translator', safeRoute(ROUTES.transToHall), {
        bubble: '🌐 메뉴 번역 톤 상의하러 가는 중…',
        onArrive: () => {
          tr.dir = 'back'; tr.bubble = '💬 베트남어·영어 메뉴 표현 확인 완료!'; tr.bubbleType = 'ok';
          setTimeout(() => {
            sendPath('translator', safeRoute(ROUTES.hallToTrans), {
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
      sendPath('sorter', safeRoute(ROUTES.sorterToHall), {
        bubble: '📦 메뉴 원본 자료 선별 완료 보고 중…',
        onArrive: () => {
          sr.dir = 'west'; sr.bubble = '✅ 1차 자료 선별 완료! 바로 전달했습니다'; sr.bubbleType = 'ok';
          setTimeout(() => {
            sendPath('sorter', safeRoute(ROUTES.hallToSorter), {
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
      sendPath('inspector', safeRoute(ROUTES.inspToHall), {
        bubble: '🛡️ 배포 전 최종 교차 감찰 진행 중…',
        onArrive: () => {
          ins.dir = 'east'; ins.bubble = '✅ 2차 운영 감찰 이상 없음! 통과입니다'; ins.bubbleType = 'ok';
          setTimeout(() => {
            if (briefingActive) return;
            sendPath('inspector', safeRoute(ROUTES.hallToInsp), {
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
      sendPath('staffing', safeRoute(ROUTES.staffToHall), {
        bubble: '📅 오늘 주·야간 출근 인력 현황 보고 중…',
        onArrive: () => {
          st.dir = 'back'; st.bubble = '✅ 거래처 14명 배치 완료! 이상 없습니다'; st.bubbleType = 'ok';
          setTimeout(() => {
            if (briefingActive) return;
            sendPath('staffing', safeRoute(ROUTES.hallToStaff), {
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
      sendPath('reader', safeRoute(ROUTES.readerToHall), {
        bubble: '📑 메뉴판 원문·가격 데이터 해석 완료!',
        onArrive: () => {
          rd.dir = 'west'; rd.bubble = '✅ JSON 메뉴 데이터 번역팀에 전달했습니다'; rd.bubbleType = 'ok';
          setTimeout(() => {
            if (briefingActive) return;
            sendPath('reader', safeRoute(ROUTES.hallToReader), {
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
      sendPath('auditor', safeRoute(ROUTES.auditToHall), {
        bubble: '📊 전 가게 데이터·링크 무결성 최종 감사 중…',
        onArrive: () => {
          au.dir = 'east'; au.bubble = '✅ 최종 데이터 감사 100% 통과! 배포 가능'; au.bubbleType = 'ok';
          setTimeout(() => {
            if (briefingActive) return;
            sendPath('auditor', safeRoute(ROUTES.hallToAudit), {
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
    const WRITE_DUR = [0.45, 0.32, 0.32, 0.4, 1.3, 0.38, 0.4, 0.35, 0.45, 0.7, 0.5, 0.45];
    const WRITE_TOTAL = WRITE_DUR.reduce((a, b) => a + b, 0);
    const WRITE_SCALE = (226 / 650) * (499 / 214); // = 앉은 그림 목표 높이 / s.h
    const WRITE_CLIP = 0.49;
    function drawNpc(n, t) {
      const cfg = CHARS[n.id];
      const wset = imgs.walk[n.id];
      if (!wset) return;
      const walking = (n.mode === 'walk');
      const fightKey = (n.fightKind === 'punch') ? 'punch' : 'kick'; // 발차기·주먹 격투가 같은 타이머(kickUntil)를 씀
      const kicking = (n.id === 'captain' && n.kickUntil && t < n.kickUntil && wset[fightKey]?.length);
      const emoting = !kicking && (n.mode === 'emote' && n.emote && wset[n.emote]?.length);
      let fIdx = 0;
      if (kicking) {
        const elapsed = Math.max(0, t - (n.kickStart || 0));
        fIdx = Math.min(wset[fightKey].length - 1, Math.floor(elapsed * (fightKey === 'punch' ? 6.2 : 5.2)));
      } else if (emoting) {
        const elapsed = Math.max(0, t - (n.emoteStart || 0));
        if (n.id === 'inspector' && n.emote === 'dance' && wset.dance?.length === 36) {
          // 127 BPM 전용 BGM(17.35s) 칼박 싱크: 인트로 2.2s(0..5) → 메인 6.6s×2(6..29) → 엔딩 1.95s(30..35)
          if (elapsed < 2.20) {
            fIdx = Math.min(5, Math.floor((elapsed / 2.20) * 6));
          } else if (elapsed < 15.40) {
            const loopPos = ((elapsed - 2.20) % 6.60) / 6.60;
            fIdx = 6 + Math.min(23, Math.floor(loopPos * 24));
          } else {
            fIdx = 30 + Math.min(5, Math.floor(((elapsed - 15.40) / 1.95) * 6));
          }
        } else {
          fIdx = n.emoteLoop ? (Math.floor(elapsed * 5.0) % 12) : Math.min(11, Math.floor(elapsed * 4.0));
        }
      } else if (walking) {
        const stride = (n.id === 'captain') ? 1.05 : 1.65;
        fIdx = Math.floor(n.walkDist * stride) % 12;
      }

      let dirKey = 'front', flipX = false;
      if (kicking) {
        dirKey = fightKey;
        flipX = (n.dir === 'west' || n.dir === 'sw' || n.dir === 'nw');
      } else if (emoting) { dirKey = n.emote; flipX = (n.dir === 'west'); }
      else if (walking && n.walkOverride && wset[n.walkOverride]?.length) {
        dirKey = n.walkOverride;
        flipX = (n.dir === 'west' || n.dir === 'sw' || n.dir === 'nw');
      }
      else if (n.dir === 'east') { dirKey = 'east'; }
      else if (n.dir === 'west') { dirKey = 'east'; flipX = true; }
      else if (n.dir === 'se' && wset.se?.length) { dirKey = 'se'; }
      else if (n.dir === 'sw' && wset.se?.length) { dirKey = 'se'; flipX = true; }
      else if (n.dir === 'ne' && wset.ne?.length) { dirKey = 'ne'; }
      else if (n.dir === 'nw' && wset.ne?.length) { dirKey = 'ne'; flipX = true; }
      else if (n.dir === 'back') { dirKey = 'back'; }
      else { dirKey = 'front'; }

      let im = wset[dirKey]?.[fIdx] || wset.front?.[0];
      if (!im) return;

      const seated = (n.mode === 'idle' || n.mode === 'work' || (n.id === 'captain' && n.idleCoffeeSeated && n.mode === 'emote' && n.emote === 'coffee'));
      // 비서실장: 앉아 있으면 문서 작성 12프레임을 계속 반복(생각·서명 장면은 조금 길게)
      let writing = false;
      if (seated && cfg.seat && wset.write?.length === 12 && wset.write.every(Boolean)) {
        const loopT = t % WRITE_TOTAL;
        let k = 0, acc = 0;
        while (k < 11 && loopT >= acc + WRITE_DUR[k]) { acc += WRITE_DUR[k]; k++; }
        im = wset.write[k]; writing = true;
      }

      if (seated && cfg.seat) {
        const s = cfg.seat;
        const sx = (s.x / 100) * W;
        const topY = (s.headTopY / 100) * H;
        const clipY = (s.clipY / 100) * H;
        // 작업 중(실제 대시보드 일) = 자판 두드리듯 잔떨림 + 모니터 불빛 + 머리 위 '입력 중…' 점 3개
        const working = n.mode === 'idle' && realBusySet.has(n.id);
        const ph = sx * 0.013;
        const bob = working
          ? Math.sin(t * 1.6 + ph) * 0.6 + Math.abs(Math.sin(t * 9.5 + ph)) * 1.4
          : Math.sin(t * 1.8 + sx * 0.01) * 1.1;
        const sway = working ? Math.sin(t * 4.7 + ph) * 0.9 : 0;
        // 앉은 그림은 서 있는 그림과 머리~허리 길이가 같도록 줄임(서 있는 그림 머리~허리 226/650, 앉은 그림 214/499)
        const targetH = writing ? s.h * WRITE_SCALE : s.h;
        const targetW = targetH * (im.naturalWidth / im.naturalHeight);

        ctx.save();
        // 책상 상단 경계선(남향) 또는 의자 좌판 하단(북향)에서 깔끔하게 클리핑하여 다리·치마가 책상 위로 튀어나오지 않음!
        ctx.beginPath();
        // 문서 작성 중에는 책상 위 손·펜이 보이도록 손끝(그림 높이 49%)까지 보여 줌
        ctx.rect(0, 0, W, writing ? Math.max(clipY, topY + targetH * WRITE_CLIP) : clipY);
        ctx.clip();
        ctx.drawImage(im, sx - targetW / 2 + (writing ? sway * 0.3 : sway), topY + (writing ? bob * 0.4 : bob), targetW, targetH);
        ctx.restore();
        if (working) {
          // 모니터 불빛(얼굴·책상 쪽이 은은하게 깜빡임)
          const gy = cfg.facing === 'back' ? topY + targetH * 0.05 : topY + targetH * 0.42;
          const a = 0.13 + 0.06 * Math.sin(t * 3.1 + ph) + (Math.sin(t * 13 + ph) > 0.92 ? 0.05 : 0);
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          const g = ctx.createRadialGradient(sx, gy, 4, sx, gy, targetH * 0.42);
          g.addColorStop(0, `rgba(125,205,255,${a.toFixed(3)})`);
          g.addColorStop(1, 'rgba(125,205,255,0)');
          ctx.fillStyle = g;
          ctx.fillRect(sx - targetH * 0.45, gy - targetH * 0.45, targetH * 0.9, targetH * 0.9);
          ctx.restore();
          // 머리 위 '입력 중…' 점 3개 (말풍선이 없을 때만)
          if (!n.bubble) {
            const bx = sx, by = topY - 20, r = 5.5;
            ctx.save();
            ctx.fillStyle = 'rgba(12,74,110,0.88)';
            ctx.strokeStyle = 'rgba(56,189,248,0.95)'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.roundRect ? ctx.roundRect(bx - 30, by - 14, 60, 28, 14) : ctx.rect(bx - 30, by - 14, 60, 28);
            ctx.fill(); ctx.stroke();
            for (let i = 0; i < 3; i++) {
              const k = (Math.sin(t * 6 - i * 0.9) + 1) / 2;
              ctx.fillStyle = `rgba(224,242,254,${(0.35 + 0.65 * k).toFixed(2)})`;
              ctx.beginPath(); ctx.arc(bx - 14 + i * 14, by - k * 3, r, 0, Math.PI * 2); ctx.fill();
            }
            ctx.restore();
          }
        }
        return;
      }

      const cx = (n.x / 100) * W;
      const cy = (n.y / 100) * H;
      const targetH = standPx(n.id);
      const sizeK = targetH / 164; // 그림자 크기도 키에 맞춤
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
      ctx.beginPath(); ctx.ellipse(cx, cy + 6, 26 * sizeK, 7.5 * sizeK, 0, 0, Math.PI * 2); ctx.fill();
      ctx.translate(cx, cy + bob);
      ctx.scale((flipX ? -1 : 1) * bowScaleX, bowScaleY);
      ctx.drawImage(im, -targetW / 2, -targetH, targetW, targetH);
      ctx.restore();
    }

    // ---------------------------------------------------------------- 캡틴 직접 게임 조작 (WASD / 방향키 / 가상 엄지 조이스틱 / 바닥 클릭 / E 착석 + 10초 미조작 자동 커피!)
    const keys = new Set();
    let joyVec = { x: 0, y: 0 };
    let clickRing = null; // { x, y, born }
    let lastCapInput = performance.now() / 1000;
    function touchCaptainInput() {
      lastCapInput = performance.now() / 1000;
      const cap = npcs.captain;
      if (cap && cap.idleCoffee) {
        cap.idleCoffee = false;
        const wasSeated = cap.idleCoffeeSeated;
        cap.idleCoffeeSeated = false;
        if (cap.mode === 'emote' && cap.emote === 'coffee') {
          cap.emote = null; cap.emoteLoop = false; cap.emoteUntil = 0;
          cap.mode = wasSeated ? 'idle' : 'stand';
          if (cap.bubble === '☕ 커피 한 잔 하며 쉬는 중…') cap.bubble = '';
        }
      }
    }

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
        touchCaptainInput();
        const cap = npcs.captain;
        if (cap.path.length) { cap.path = []; cap.onArrive = null; }
        if (cap.mode === 'emote') { cap.emote = null; cap.emoteLoop = false; cap.mode = 'stand'; }
        if (!(cap.kickUntil && performance.now() / 1000 < cap.kickUntil)) cap.bubble = '';
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

    // 사무실 전체 벽·책상·화분·가구 실측 충돌 박스 (2026-11-24 새 배경 실측. 열린 문 아래·위 틈·계단·복도·맨 아래 나무 바닥만 통과)
    // 주의: A* 격자가 1.5% 간격이라 벽 상자는 폭 1.5% 이상으로 둔다(얇으면 격자가 건너뜀).
    // 문짝: 2026-11-24 캡틴 요청으로 모든 방의 문짝 그림·막힘을 지움 — 벽이 끊긴 입구로 드나듦.
    const BLOCKERS = [
      // 상단 창가·커피바·테라스 난간·화분·단상
      { x0:  0.0, y0:  0.0, x1:  8.0, y1: 22.2 }, // 좌측 상단 화분(화분 바닥 21.5까지)
      { x0:  7.8, y0:  0.0, x1: 23.8, y1: 21.2 }, // 커피바 + 정수기(장 바닥선 20.6까지 — 위에 올라선 것처럼 안 보이게)
      { x0: 71.5, y0:  0.0, x1: 100., y1: 19.0 }, // 우측 테라스 난간(기둥 바닥 18.2까지)
      { x0: 91.5, y0:  0.0, x1: 100., y1: 21.4 }, // 우측 상단 화분(화분 바닥 20.6까지)
      { x0: 42.3, y0: 17.2, x1: 58.0, y1: 21.8 }, // 캡틴 대표 책상
      { x0: 36.8, y0: 23.4, x1: 63.2, y1: 27.8 }, // 단상 앞쪽 턱 (좌우 계단으로만 내려오게)
      // 중앙 복도 책상·화분
      { x0: 42.2, y0: 38.0, x1: 58.0, y1: 42.6 }, // 비서실장 책상
      { x0: 28.3, y0: 30.0, x1: 32.2, y1: 41.0 }, // 복도 좌측 화분(잎~화분 바닥 40.4)
      { x0: 68.0, y0: 30.0, x1: 72.2, y1: 41.0 }, // 복도 우측 화분(잎~화분 바닥 40.4)
      // 미디어 관제실(초록): 문짝 아래 틈(y 46~47.4)으로 드나듦
      { x0:  0.0, y0: 22.8, x1: 28.8, y1: 39.6 }, // 윗벽 + 크로마키 뒷벽
      { x0:  0.0, y0: 22.8, x1:  8.6, y1: 49.0 }, // 좌벽 + 카메라 삼각대
      { x0: 27.4, y0: 22.8, x1: 28.8, y1: 46.0 }, // 우측 벽(문짝은 11-24 삭제)
      { x0: 20.8, y0: 36.0, x1: 26.5, y1: 41.8 }, // 우측 조명·휴지통
      { x0:  9.0, y0: 41.0, x1: 19.6, y1: 44.8 }, // 시각 정보 비서 책상
      { x0:  0.0, y0: 47.4, x1: 23.0, y1: 50.5 }, // 초록방 앞벽 + 보라방 윗벽
      // 디지털 메뉴 통제실(빨강): 문짝 아래 틈(y 46~48.4)으로 드나듦
      { x0: 71.6, y0: 22.8, x1: 100., y1: 38.8 }, // 윗벽 + 빨강 뒷벽 + 벽에 붙은 책상 상판(책상 뒤로 못 걷게)
      { x0: 71.6, y0: 22.8, x1: 73.4, y1: 46.0 }, // 좌측 벽(문짝은 11-24 삭제)
      { x0: 74.0, y0: 37.0, x1: 77.2, y1: 43.6 }, // 휴지통
      { x0: 77.6, y0: 38.5, x1: 87.2, y1: 47.6 }, // 좌측 책상·의자
      { x0: 87.6, y0: 38.5, x1: 97.6, y1: 47.6 }, // 우측 책상·의자
      { x0: 96.6, y0: 22.8, x1: 100., y1: 50.0 }, // 우벽 + 화분
      // 감사실(보라): 오른쪽 벽 아래 입구(y 78.3~83.4)로 드나듦(2026-11-24 캡틴 요청으로 복도 쪽 문짝 그림·막힘 삭제)
      { x0:  0.0, y0: 48.2, x1: 23.0, y1: 71.8 }, // 윗벽 + 책장 + 휴지통 + 벽에 붙은 책상 상판
      { x0:  0.0, y0: 48.0, x1:  2.0, y1: 90.0 }, // 좌벽
      { x0: 20.6, y0: 48.2, x1: 22.9, y1: 78.3 }, // 우측 벽
      { x0:  2.6, y0: 71.5, x1: 12.4, y1: 81.9 }, // 좌측 감사 책상·의자
      { x0: 12.6, y0: 71.5, x1: 21.0, y1: 81.9 }, // 우측 감사 책상·의자
      { x0:  0.0, y0: 77.0, x1:  4.4, y1: 84.0 }, // 좌하단 화분
      { x0:  0.0, y0: 83.4, x1: 22.0, y1: 90.0 }, // 앞벽
      // 통번역 통제실(남색): 좌우 벽이 끊긴 입구(y 73~79)로 드나듦
      { x0: 26.2, y0: 48.3, x1: 47.2, y1: 67.2 }, // 윗벽 + 뒷벽 + 화분·책장
      { x0: 29.2, y0: 66.0, x1: 33.4, y1: 69.0 }, // 화분 바닥(68.3)
      { x0: 39.8, y0: 66.0, x1: 44.6, y1: 68.4 }, // 책장 바닥(67.7)
      { x0: 26.2, y0: 48.3, x1: 29.2, y1: 73.0 }, // 좌벽
      { x0: 26.2, y0: 79.0, x1: 28.6, y1: 90.0 }, // 좌측 기둥
      { x0: 27.5, y0: 79.0, x1: 31.8, y1: 85.0 }, // 좌하단 화분
      { x0: 44.6, y0: 48.3, x1: 46.0, y1: 72.6 }, // 우벽
      { x0: 44.2, y0: 79.0, x1: 46.2, y1: 90.0 }, // 우측 기둥
      { x0: 26.2, y0: 84.6, x1: 47.2, y1: 89.8 }, // 앞벽
      { x0: 31.8, y0: 73.6, x1: 42.8, y1: 78.8 }, // 수석 번역관 책상
      // 인력 공급팀(하늘): 좌우 벽이 끊긴 입구(y 72~78.6)로 드나듦
      { x0: 53.6, y0: 48.4, x1: 73.4, y1: 65.4 }, // 윗벽 + 뒷벽
      { x0: 55.6, y0: 65.0, x1: 59.8, y1: 68.6 }, // 좌측 화분
      { x0: 68.6, y0: 65.0, x1: 72.0, y1: 68.6 }, // 휴지통
      { x0: 53.4, y0: 48.4, x1: 55.4, y1: 72.4 }, // 좌벽
      { x0: 54.8, y0: 78.9, x1: 57.0, y1: 85.0 }, // 좌측 기둥
      { x0: 71.8, y0: 48.4, x1: 73.4, y1: 72.0 }, // 우벽
      { x0: 73.0, y0: 78.6, x1: 76.0, y1: 85.0 }, // 우측 기둥
      { x0: 53.4, y0: 84.6, x1: 76.0, y1: 89.8 }, // 앞벽
      { x0: 59.4, y0: 73.6, x1: 69.8, y1: 78.9 }, // 인력 공급팀 책상
      // 선별팀(주황): 하늘방 옆 좁은 통로(x 73.4~76.6) → 왼쪽 벽 아래 입구(y 69~78, 2026-11-24 캡틴 요청으로 문짝 그림·막힘 삭제)
      { x0: 77.0, y0: 48.4, x1: 100., y1: 65.2 }, // 윗벽 + 주황 뒷벽
      { x0: 76.6, y0: 48.4, x1: 78.4, y1: 69.0 }, // 좌벽
      { x0: 80.6, y0: 73.0, x1: 89.8, y1: 78.2 }, // 선별팀 책상
      { x0: 86.8, y0: 64.0, x1: 92.6, y1: 68.6 }, // 포장 기계 테이블
      { x0: 91.6, y0: 48.4, x1: 100., y1: 85.0 }, // 선반·세로 컨베이어·우벽
      { x0: 86.2, y0: 73.6, x1: 100., y1: 84.0 }, // 가로 컨베이어
      { x0: 75.4, y0: 78.4, x1: 79.2, y1: 85.0 }, // 좌하단 화분
      { x0: 74.0, y0: 84.6, x1: 100., y1: 89.8 }, // 앞벽
      // 맨 아래 넓은 나무 바닥(y 89.8~97.5)은 전부 걸을 수 있음
    ];
    function canWalk(x, y) {
      if (x < 2.0 || x > 98.0 || y < 15.6 || y > 97.5) return false;
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

    // 경유점 목록을 A* 길찾기로 이어 붙임: 경유점 사이를 직선으로 가다 벽·문짝을 뚫지 않게 (2026-11-24 새 배경)
    function safeRoute(pts) {
      if (!pts || pts.length < 2) return pts || [];
      const out = [[pts[0][0], pts[0][1]]];
      for (let i = 1; i < pts.length; i++) {
        const [cx, cy] = out[out.length - 1];
        const [tx, ty] = pts[i];
        const seg = findPath(cx, cy, tx, ty);
        if (seg) out.push(...seg);
        if (canWalk(tx, ty) || i === pts.length - 1) out.push([tx, ty]);
      }
      return out;
    }

    const KICK_SPOT = [50.0, 27.0]; // 발차기 시범 자리(단상 앞 바닥, 보고 줄 y29.8보다 조금 위)
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
      SFX.sit();
      log('🪑 캡틴이 대표 책상 자리에 착석했습니다');
    }

    function playCaptainAction(action) {
      touchCaptainInput();
      const cap = npcs.captain;
      // 발차기는 다리가 책상에 가려지므로, 대표석(의자)에 있으면 단상 앞 바닥으로 걸어 나온 뒤 찬다
      if (action === 'kick' || action === 'punch') {
        const isPunch = action === 'punch';
        // 캡틴 이동 중 발차기·주먹 지원! 앉아 있을 때만 대표석 앞으로 나온 뒤 동작, 서 있거나 이동 중이면 멈추지 않고 바로 동작!
        if (!cap._kickWalked && cap.mode === 'idle' &&
            Math.hypot(cap.x - CHARS.captain.home[0], cap.y - CHARS.captain.home[1]) < 4.0) {
          const ok = walkCaptainSafe(KICK_SPOT[0], KICK_SPOT[1], {
            bubble: isPunch ? '👊 잠깐 몸 좀 풀게요!' : '🥋 잠깐 시범 보일게요!',
            onArrive: () => { cap._kickWalked = true; cap.dir = 'east'; playCaptainAction(action); cap._kickWalked = false; },
          });
          if (ok) return;
        }
        const nowS = performance.now() / 1000;
        cap.fightKind = action;
        cap.kickStart = nowS;
        cap.kickUntil = nowS + (isPunch ? 2.55 : 2.35);
        if (cap.mode === 'idle') cap.mode = 'stand';
        const say = isPunch ? '👊 원투! 연속 펀치!' : '🥋 얍! 이동 발차기!';
        if (isPunch) SFX.punch(); else SFX.kick();
        cap.bubble = say;
        cap.bubbleType = 'ok';
        spawnBurst(cap.x, cap.y - 4, isPunch ? '👊 퍽!' : '🥋 얍!', 0);
        log(isPunch ? '👊 캡틴이 주먹 격투(잽·스트레이트·훅·어퍼컷) 연속 공격을 시전했습니다' : '🥋 캡틴이 이동 중 태권도 발차기를 시전했습니다');
        setTimeout(() => { if (cap.bubble === say) cap.bubble = ''; }, 2600);
        return;
      }
      cap.path = [];
      cap.onArrive = null;
      cap.mode = 'emote';
      cap.emote = action;
      cap.emoteStart = performance.now() / 1000;
      cap.emoteUntil = cap.emoteStart + 3.4;
      cap.dir = 'front';
      if (action === 'greet') {
        SFX.greet();
        voice('captain', 'greet');
        // 직원 대답은 한 명만(비서실장) — 다 같이 말하면 시끄러움
        voice('claude', 'greet', 1.7);
        cap.bubble = '👋 모두 수고 많습니다! 진행합시다';
        cap.bubbleType = 'ok';
        log('👋 캡틴이 직원들에게 인사·지시 모션을 취했습니다');
      } else if (action === 'coffee') {
        SFX.coffee();
        voice('captain', 'coffee', 0.2);
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
        touchCaptainInput();
        keys.add(k);
        const cap = npcs.captain;
        if (cap.path.length) { cap.path = []; cap.onArrive = null; }
        if (cap.mode === 'emote') { cap.emote = null; cap.emoteLoop = false; cap.mode = 'stand'; }
        if (!(cap.kickUntil && performance.now() / 1000 < cap.kickUntil)) cap.bubble = '';
      } else if (k === 'e') {
        e.preventDefault();
        sitCaptainBack();
      } else if (k === '1') {
        e.preventDefault();
        playCaptainAction('greet');
      } else if (k === '2') {
        e.preventDefault();
        playCaptainAction('coffee');
      } else if (k === '3' || k === ' ') {
        e.preventDefault();
        playCaptainAction('kick');
      } else if (k === '4' || k === 'f') {
        e.preventDefault();
        playCaptainAction('punch');
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
        touchCaptainInput();
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
        cap.emote = null; cap.emoteLoop = false;
        cap.bubble = '';
        cap.mode = (Math.hypot(cap.x - CHARS.captain.home[0], cap.y - CHARS.captain.home[1]) < 2.0) ? 'idle' : 'stand';
      } else if (!cap.path.length && cap.mode === 'walk') {
        // 키를 떼면 그 자리에 자연스럽게 서서 대기 (의자로 텔레포트하지 않음!)
        cap.mode = 'stand';
      } else if (!briefingActive && modalBack.hidden && !cap.path.length &&
                 !(cap.kickUntil && t < cap.kickUntil) &&
                 (cap.mode === 'idle' || cap.mode === 'stand') &&
                 (t - lastCapInput >= 10.0)) {
        // 10초 이상 캡틴 미조작 시 커피 마시기 무한 루프 (조작할 때까지 유지!)
        cap.idleCoffee = true;
        cap.idleCoffeeSeated = (cap.mode === 'idle');
        cap.mode = 'emote';
        cap.emote = 'coffee';
        cap.emoteLoop = true;
        cap.emoteStart = t;
        cap.emoteUntil = Infinity;
        cap.dir = 'front';
        cap.bubble = '☕ 커피 한 잔 하며 쉬는 중…';
        cap.bubbleType = '';
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
          const has8 = (n.id === 'captain' || n.id === 'claude' || n.id === 'reader');
          n.dir = vecToDir(dx, dy, has8);
        }
      }

      // 캡틴 중심 부드러운 게임 카메라 추적 (1.85배 확대 ↔ 전체 보기 1.0배 자동 보간!)
      // 보고 중(2026-11-24 캡틴 요청)엔 전체 보기 대신 캡틴 단상 앞(직원 줄 y=29.8·비서실장 단상 포함)을 2.4배로 비춤
      if (camEl) {
        const targetZ = briefingActive ? 2.4 : (camMode === 'follow' ? 1.85 : 1.0);
        const targetFx = briefingActive ? 50 : cap.x;
        const targetFy = briefingActive ? 21 : Math.max(10, Math.min(90, cap.y - 2));
        const k = Math.min(1, dt * 6.5);
        cam.z += (targetZ - cam.z) * k;
        cam.fx += (targetFx - cam.fx) * k;
        cam.fy += (targetFy - cam.fy) * k;
        const tx = Math.max(100 - 100 * cam.z, Math.min(0, 50 - cam.fx * cam.z));
        const ty = Math.max(100 - 100 * cam.z, Math.min(0, 50 - cam.fy * cam.z));
        cam.tx = tx; cam.ty = ty;
        camEl.style.transform = `translate(${tx.toFixed(2)}%, ${ty.toFixed(2)}%) scale(${cam.z.toFixed(4)})`;
      }
      if (now - resCheckAt > 500) { resCheckAt = now; updateCanvasRes(); }
      {
        const s = canvas.width / W, z = cam.z || 1;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(s * z, 0, 0, s * z, (cam.tx || 0) / 100 * W * s, (cam.ty || 0) / 100 * H * s);
      }
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

      // 보고 중 2.4배 확대일 때 말풍선·이름표가 같이 커져 화면을 가리지 않게 '전체 보기' 때 크기로 되돌림(폰 포함) — 평소 추적·전체 보기는 그대로(1)
      const uiS = briefingActive ? 1 / (cam.z || 1) : 1;
      const tagTf = uiS < 0.999 ? `translate(-50%, 0) scale(${uiS.toFixed(3)})` : '';
      const bubTf = uiS < 0.999 ? `translate(-50%, -100%) scale(${uiS.toFixed(3)})` : '';
      for (const [id, n] of Object.entries(npcs)) {
        const walking = n.mode === 'walk';
        tagEls[id].style.transform = tagTf; tagEls[id].style.transformOrigin = tagTf ? '50% 0' : '';
        bubEls[id].style.transform = bubTf; bubEls[id].style.transformOrigin = bubTf ? '50% 100%' : '';
        tagEls[id].style.left = `${n.x}%`;
        const tagTop = (id === 'captain' && n.mode === 'idle')
          ? 16.8
          : (n.y + (walking ? 1.4 : (CHARS[id].facing === 'front' ? 4.8 : 1.5)));
        tagEls[id].style.top  = `${tagTop}%`;
        // RPG 퀘스트 마커(! / ?) 머리 위 표시 (말풍선이 없을 때 깔끔하게 통통 뜀)
        const q = activeQuests[id];
        const qEl = questEls[id];
        if (q && qEl && !n.bubble) {
          qEl.hidden = false;
          qEl.textContent = q.type === 'exc' ? '!' : '?';
          qEl.className = `oa-quest ${q.type === 'exc' ? 'exc' : 'ask'}`;
          qEl.style.left = `${n.x}%`;
          const standing = (n.mode === 'walk' || n.mode === 'stand' || n.mode === 'emote');
          qEl.style.top = `${Math.max(4, n.y - (standing ? standPct(id) + 1.4 : 8.5))}%`;
        } else if (qEl) {
          qEl.hidden = true;
        }
        if (n.bubble) {
          tagEls[id].classList.add('speaking');
          bubEls[id].hidden = false;
          bubEls[id].textContent = n.bubble;
          bubEls[id].className = `oa-bub ${n.bubbleType}`;
          const standing = (n.mode === 'walk' || n.mode === 'stand' || n.mode === 'emote');
          let bx = n.x;
          let by = Math.max(5.0, n.y - (standing ? standPct(id) + 1.8 : 11.5));
          // 캡틴 착석 시 말풍선이 캡틴 얼굴·피통 게이지를 가리지 않도록 오른쪽 옆에 깔끔하게 배치!
          if (id === 'captain' && !standing) {
            bx = 60.5;
            by = 10.2;
          } else if (briefingActive && id === 'claude' && n.y < 24) {
            // 보고 진행 중 비서실장이 단상 위에 있을 때 좌측 상단 HUD(Lv/퀘스트/전체보기)에 가리지 않게 아래쪽 빈 창가로 배치!
            bx = 34.5;
            by = 11.5;
          } else if (id === 'captain' && standing) {
            // 캡틴 서 있을 때도 머리 위 피통 게이지(standPct + 0.6) 위쪽으로 여유 확보
            by = Math.max(4.8, n.y - (standPct(id) + 3.4));
          }
          bubEls[id].style.left = `${bx}%`;
          bubEls[id].style.top  = `${by}%`;
        } else {
          tagEls[id].classList.remove('speaking');
          bubEls[id].hidden = true;
        }
        // 하단 직원 호출 프로필 바 상태 동기화 (작업 중·완료·퀘스트)
        const dBtn = dockBtns[id];
        if (dBtn) {
          dBtn.classList.toggle('work', tagEls[id].classList.contains('work'));
          dBtn.classList.toggle('done', tagEls[id].classList.contains('done'));
          dBtn.classList.toggle('calling', activeTalkNpc?.id === id);
          const dq = dBtn.querySelector('.oa-dock-q');
          if (dq) {
            if (q) { dq.hidden = false; dq.textContent = q.type === 'exc' ? '!' : '?'; dq.className = `oa-dock-q ${q.type}`; }
            else { dq.hidden = true; }
          }
        }
      }

      // 캡틴 머리 위 RPG HP/MP 피통 게이지 + 실시간 상태 표시 배지 + 타원형 링 메뉴 위치 추적
      if (capHpEl) {
        const capStanding = (cap.mode === 'walk' || cap.mode === 'stand' || cap.mode === 'emote');
        const hpTop = Math.max(5.0, cap.y - (capStanding ? standPct('captain') + 0.6 : 12.2));
        capHpEl.style.left = `${cap.x}%`;
        capHpEl.style.top  = `${hpTop}%`;
        if (capStatusEl) {
          capStatusEl.style.left = `${cap.x}%`;
          capStatusEl.style.top  = `${Math.max(0.8, hpTop - 4.0)}%`;
        }
        if (capRingEl) {
          capRingEl.style.left = `${cap.x}%`;
          capRingEl.style.top  = `${Math.max(8, cap.y - (capStanding ? standPct('captain') + 1.5 : 13.5))}%`;
          if (capRingOpen && (cap.mode === 'walk' || Math.hypot(cap.x - capRingOrigin.x, cap.y - capRingOrigin.y) > 0.35)) {
            setCapRing(false);
          }
        }
      }

      // 대화창이 열려 있으면 0.2초마다 캐릭터(카메라 확대 반영) 화면 위치를 다시 보고, 가리면 다른 자리로 옮김
      if (!modalBack.hidden && now - modalPlaceAt > 200) { modalPlaceAt = now; placeModal(); }
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
      sorter:     { greet: '캡틴! 오늘 메뉴판 방문 현황을 30분마다 보고드려요(08~22시).', quick: ['📊 지금 보고해', '🔍 상세 보기', '📅 어제와 비교'] },
      inspector:  { greet: '캡틴! 배포 전 2차 교차 감찰이 필요한 가게나 메뉴판이 있으신가요?', quick: ['🛡️ 배포 예정 가게 2차 교차 감찰', '🔎 오타·링크 깨짐 최종 확인', '📋 감찰 통과 현황 보고'] },
      staffing:   { greet: '캡틴! 오늘 거래처 주·야간 인력 배치나 근태 현황 확인하실까요?', quick: ['📅 오늘 주·야간 인력 배치 보고', '📊 이번 달 거래처 실적 확인', '📋 미보고 거래처 점검'] },
      reader:     { greet: '캡틴! 새로 들어온 메뉴판 사진에서 글자·가격 데이터를 추출할까요?', quick: ['📑 신규 메뉴판 원문 해석 시작', '💰 가격·옵션 누락 정밀 대조', '📋 해석 완료 리스트 보고'] },
      auditor:    { greet: '캡틴! 배포 전 마지막 데이터 감사·오류 점검을 진행할까요?', quick: ['📊 전체 메뉴 데이터 최종 감사', '🔗 배포 링크·이미지 깨짐 점검', '📋 감사 완료 보고서 제출'] },
    };

    const vEsc = s => String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
    function visitBlock() {
      const v = latestVisits;
      if (!v) return `<div class="oa-m-visit" data-visit><p class="oa-v-empty">아직 오늘 방문 기록이 없어요. [📊 지금 보고해]를 누르면 바로 읽어 와요.</p></div>`;
      return `<div class="oa-m-visit" data-visit>
          <div class="oa-v-head"><b>📊 ${vEsc(v.hm)} 방문 보고</b><span>오늘 ${v.vis}명${v.d30 ? ` · 30분 새 ${v.d30}명` : ''}</span></div>
          <ul>${v.lines.map(l => `<li>${vEsc(l)}</li>`).join('')}</ul>
        </div>`;
    }

    // 새 30분 보고가 오면 선별팀 팀장이 캡틴 앞으로 걸어와 말풍선으로 보고 → 자리로 돌아감 (한 보고에 한 번)
    function visitWalkReport() {
      const v = latestVisits, n = npcs.sorter, c = CHARS.sorter;
      if (!v || !n || !c || String(v.id) === lsGet('oa_visit_shown')) return;
      if (briefingActive || document.hidden || n.mode !== 'idle' || realBusySet.has('sorter') || activeTalkNpc) return;
      lsSet('oa_visit_shown', v.id);
      const [tx, ty] = getSpotNearCaptain();
      log(`📊 선별팀 팀장이 ${v.hm} 방문 현황 보고하러 캡틴에게 갑니다`);
      walkNpcSafe('sorter', tx, ty, {
        bubble: '📊 방문 현황 보고드리러 갑니다!', bubbleType: 'ok',
        onArrive: () => {
          n.mode = 'stand';
          faceEachOther(n, npcs.captain);
          n.bubble = v.speech; n.bubbleType = 'ok';
          voice('sorter', 'done', 0.1);
          setTimeout(() => {
            if (activeTalkNpc && activeTalkNpc.id === 'sorter') return; // 캡틴이 눌러 대화 중이면 그대로
            if (n.bubble === v.speech) n.bubble = '';
            if (!briefingActive) walkNpcSafe('sorter', c.home[0], c.home[1], { onArrive: () => seatNpc('sorter') });
          }, 9000);
        },
      });
    }

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

      // 대화창을 닫으면 직원이 캡틴 앞에서 A* 안전 동선으로 자기 자리로 걸어 돌아가 착석!
      const c = CHARS[n.id];
      n.emote = null; n.emoteLoop = false;
      n.path = []; n.onArrive = null;
      if (Math.hypot(n.x - c.home[0], n.y - c.home[1]) < 3.5) {
        seatNpc(n.id);
        if (keepOrderBubble) { n.bubble = st.orderBubble || n.bubble; }
      } else {
        walkNpcSafe(n.id, c.home[0], c.home[1], {
          bubble: keepOrderBubble ? n.bubble : '↩ 자리로 돌아가겠습니다!',
          bubbleType: keepOrderBubble ? n.bubbleType : '',
          onArrive: () => seatNpc(n.id)
        });
      }
    }

    function getSpotNearCaptain() {
      const cap = npcs.captain;
      const atDesk = (cap.mode === 'idle') || Math.hypot(cap.x - CHARS.captain.home[0], cap.y - CHARS.captain.home[1]) < 4.5;
      if (atDesk) return [50.0, 29.8]; // 캡틴이 대표석에 앉아 있으면 단상 앞 정중앙 보고 위치!
      const cands = [
        [cap.x, cap.y + 4.8], [cap.x + 5.0, cap.y], [cap.x - 5.0, cap.y],
        [cap.x, cap.y - 4.8], [cap.x + 4.0, cap.y + 4.0], [cap.x - 4.0, cap.y + 4.0],
        [cap.x + 4.0, cap.y - 4.0], [cap.x - 4.0, cap.y - 4.0],
      ];
      for (const [tx, ty] of cands) {
        if (canWalk(tx, ty)) return [tx, ty];
      }
      return [50.0, 29.8];
    }

    // ---- 대화창 자리 정하기: 확대 카메라까지 반영한 '실제 화면 위치'로 캡틴·대화 상대(말풍선 포함)를 피함
    function charScreenBox(p) {
      const z = cam.z || 1, tx = cam.tx || 0, ty = cam.ty || 0;
      // 머리 위 말풍선까지 가리지 않게 위쪽 여유를 넉넉히(-24, 키 232 기준)
      return { x0: tx + (p.x - 5) * z, x1: tx + (p.x + 5) * z, y0: ty + (p.y - 24) * z, y1: ty + (p.y + 4) * z };
    }
    function placeModal() {
      if (modalBack.hidden || !modalTargets.length) return;
      const wrap = root.querySelector('.oa-rot-wrap');
      const W = wrap.clientWidth || 1, H = wrap.clientHeight || 1;
      const mw = modal.offsetWidth / W * 100, mh = modal.offsetHeight / H * 100;
      // 위 HUD(레벨·전체 보기)·아래 직원 바를 되도록 피하되, 자리가 모자라면 여백을 줄임
      let padT = 9, padB = 12;
      if (mh + padT + padB > 98) { padT = 1; padB = 1; }
      const padX = 1;
      const span = (lo, hi) => lo <= hi ? [lo, (lo + hi) / 2, hi] : [50];
      const xs = span(mw / 2 + padX, 100 - mw / 2 - padX);
      const ys = span(mh / 2 + padT, 100 - mh / 2 - padB);
      const boxes = modalTargets.map(charScreenBox);
      const overlap = (cx, cy) => boxes.reduce((s, b) => {
        const ox = Math.max(0, Math.min(cx + mw / 2, b.x1) - Math.max(cx - mw / 2, b.x0));
        const oy = Math.max(0, Math.min(cy + mh / 2, b.y1) - Math.max(cy - mh / 2, b.y0));
        return s + ox * oy;
      }, 0);
      // 지금 자리가 아무도 안 가리면 그대로 둠(창이 이리저리 흔들리지 않게)
      if (modalSlot && overlap(modalSlot.x, modalSlot.y) === 0
          && xs.some(x => Math.abs(x - modalSlot.x) < 0.5) && ys.some(y => Math.abs(y - modalSlot.y) < 0.5)) return;
      let best = null, bestScore = Infinity;
      for (const x of xs) for (const y of ys) {
        let minDist = Infinity;
        for (const b of boxes) minDist = Math.min(minDist, Math.hypot(x - (b.x0 + b.x1) / 2, y - (b.y0 + b.y1) / 2));
        const score = overlap(x, y) * 1000 - minDist;
        if (score < bestScore) { bestScore = score; best = { x, y }; }
      }
      modalSlot = best;
      modal.style.left = `${best.x}%`;
      modal.style.top = `${best.y}%`;
    }

    function closeTalkModal(keepOrderBubble = false) {
      if (!modalBack.hidden) SFX.close();
      modalBack.hidden = true;
      resumeTalkNpc(keepOrderBubble);
    }

    function openTalkModal(hit) {
      // 이전 대화 중인 직원이 있었다면 먼저 자기 자리로 복귀
      if (activeTalkNpc && activeTalkNpc.id !== hit) resumeTalkNpc(false);

      const c = CHARS[hit], n = npcs[hit], cap = npcs.captain;
      const dcfg = DIALOG_CFG[hit] || { greet: '캡틴, 지시하실 업무가 있으신가요?', quick: ['📋 현재 업무 보고'] };

      if (hit !== 'captain') {
        const wasSeated = (n.mode === 'idle' || n.mode === 'work');
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
        n.emote = null; n.emoteLoop = false;
        n.path = []; n.onArrive = null;
        activeTalkNpc = n;

        // 직원을 클릭하면 무조건 캡틴 앞으로 걸어와서 마주 보고 대기!
        const [tx, ty] = getSpotNearCaptain();
        const alreadyClose = !wasSeated && Math.hypot(n.x - tx, n.y - ty) < 3.2;
        if (alreadyClose) {
          n.mode = 'stand';
          faceEachOther(n, cap);
          n.bubble = '💬 캡틴, 지시하실 게 있으신가요?';
          n.bubbleType = 'meet';
        } else {
          if (wasSeated && c.standPos) { n.x = c.standPos[0]; n.y = c.standPos[1]; }
          walkNpcSafe(hit, tx, ty, {
            force: true,
            bubble: '🏃 네 캡틴, 바로 가겠습니다!',
            bubbleType: 'meet',
            onArrive: () => {
              if (activeTalkNpc !== n) return;
              n.mode = 'stand';
              faceEachOther(n, cap);
              n.bubble = '💬 캡틴, 지시하실 게 있으신가요?';
              n.bubbleType = 'meet';
            }
          });
        }
      }

      const escHtml = s => String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
      const parseApprovalChoices = ord => {
        if (!ord) return [];
        const lastAi = [...(ord.turns || [])].reverse().find(t => t.by === 'claude')?.text || '';
        const src = `${ord.approval || ''}\n${lastAi}`;
        const found = [];
        const seen = new Set();
        // 1) "1. ...", "2) ...", "① ..." 또는 "가-1 ..." 패턴 파싱
        for (const raw of src.split(/\r?\n/)) {
          const line = raw.trim();
          let m = line.match(/^(?:([1-4])[.)]|([①②③④]))\s+(.{2,60})/);
          if (m) {
            const circ = { '①': '1', '②': '2', '③': '3', '④': '4' };
            const num = m[1] || circ[m[2]];
            const lbl = m[3].replace(/\*\*/g, '').trim().slice(0, 34);
            if (!seen.has(num)) { seen.add(num); found.push({ num, label: lbl, replyText: `${num}번으로 진행해 주세요 (${lbl})`, approve: false }); }
            continue;
          }
          m = line.match(/^([가나다라]-[1-4])[.:)\s]+(.{2,60})/);
          if (m && found.length < 4) {
            const key = m[1], lbl = m[2].replace(/\*\*/g, '').trim().slice(0, 30);
            if (!seen.has(key)) { seen.add(key); found.push({ num: String(found.length + 1), label: `${key} ${lbl}`, replyText: key, approve: false }); }
          }
        }
        if (found.length >= 2) return found.slice(0, 4);
        // 2) 번호 선택지가 따로 없으면 기본 1·2·3 결재 선택지 제공
        const isDeployOnly = !ord.approval && ord.deploy?.length && ord.deployState !== 'done';
        return [
          isDeployOnly
            ? { num: '1', label: '배포 확정 창 바로 열기', action: 'openOrder' }
            : { num: '1', label: '✅ 확정 진행 (승인)', replyText: '확정합니다. 진행해 주세요.', approve: true },
          { num: '2', label: '✏️ 수정 요청 (직접 입력)', action: 'edit' },
          { num: '3', label: '📋 결재 내용 자세히 보기', action: 'openOrder' },
        ];
      };

      const OA_TO_DASH = {
        captain: 'captain', claude: 'claude', finder: 'finder', agy: 'agy',
        reader: 'menu-reader', inspector: 'codex', auditor: 'reviewer',
        translator: 'polisher', staffing: 'staffing', sorter: 'sorting'
      };
      const dashId = OA_TO_DASH[hit] || hit;
      // 이 직원에게 걸려 있는 결재 대기 건 (비서실장/캡틴은 첫 결재 건, 다른 직원은 본인 참여 결재 건)
      const npcAppr = pendingApprovals.find(o => (hit === 'claude' || hit === 'captain') || (o.worked || []).includes(dashId))
        || (hit === 'claude' ? pendingApprovals[0] : null);
      const apprChoices = npcAppr ? parseApprovalChoices(npcAppr) : [];
      const apprHtml = npcAppr ? `
        <div class="oa-m-appr">
          <div class="oa-appr-head">
            <span class="oa-appr-badge">🔔 결재 대기</span>
            <strong class="oa-appr-title">${escHtml((npcAppr.title || npcAppr.text || '결재 건').slice(0, 26))}</strong>
            <button type="button" class="oa-appr-go" data-open-order="${escHtml(npcAppr.id)}">📋 결재 내용</button>
          </div>
          ${npcAppr.approval ? `<p class="oa-appr-desc">${escHtml(npcAppr.approval.slice(0, 95))}</p>` : (npcAppr.deploy?.length ? `<p class="oa-appr-desc">배포 대기: ${escHtml(npcAppr.deploy.join(', '))}</p>` : '')}
          <div class="oa-appr-choices">
            ${apprChoices.map((ch, idx) => `<button type="button" class="oa-appr-opt" data-appr-idx="${idx}"><span class="oa-appr-num">${escHtml(ch.num)}</span><span class="oa-appr-lbl">${escHtml(ch.label)}</span></button>`).join('')}
          </div>
        </div>` : '';

      const fallbackOrder = npcAppr || latestOrders.find(o => (o.worked || []).includes(dashId)) || latestOrders[0];
      const orderBtn = (opts.onOpenOrder && fallbackOrder)
        ? `<button type="button" class="oa-q-btn appr-link" data-open-order="${escHtml(fallbackOrder.id)}">📋 ${npcAppr ? '결재 내용 보기' : '최근 결재·지시 보기'}</button>` : '';
      const detailBtn = opts.onOpenDetail
        ? `<button type="button" class="oa-q-btn detail" data-open-detail>👤 직원 상세</button>` : '';
      const q = activeQuests[hit];
      const questHtml = (!npcAppr && q && q.kind !== 'visits') ? `
        <div class="oa-m-quest ${q.type === 'ask' ? 'done' : ''}">
          <span class="oa-m-quest-txt">${q.type === 'exc' ? '❗ [퀘스트] ' : '✅ [완료 보고] '}${q.title}</span>
          <button type="button" class="oa-m-quest-btn" data-quest-act>${q.actionLabel}</button>
        </div>` : '';
      const visitHtml = (hit === 'sorter') ? visitBlock() : '';
      if (hit === 'sorter' && latestVisits) { lsSet('oa_visit_read', latestVisits.id); if (activeQuests.sorter?.kind === 'visits') { delete activeQuests.sorter; updateRpgHud(); } }
      SFX.tap();
      if (hit !== 'captain') voice(hit, 'call', 0.12);
      modal.innerHTML = `
        <div class="oa-m-head">
          <img src="/static/office-anime/assets/portraits/${c.asset || hit}.webp?v=cap3" alt="${c.name}">
          <div>
            <h3>${c.name} <span class="oa-m-role">${c.role}</span></h3>
            <p class="oa-m-say">“${dcfg.greet}”</p>
          </div>
          <button type="button" data-close>×</button>
        </div>
        ${apprHtml}
        ${visitHtml}
        ${questHtml}
        <div class="oa-m-quick">
          ${orderBtn}
          ${dcfg.quick.map(q => `<button type="button" class="oa-q-btn" data-q="${q}">${q}</button>`).join('')}
          ${detailBtn}
        </div>
        <form class="oa-m-form" data-order-form>
          <input type="text" name="msg" placeholder="${c.name}에게 직접 지시할 내용을 입력하세요…" autocomplete="off" required>
          <button type="submit">📣 지시 전달</button>
        </form>
        <div class="oa-m-res" data-res hidden></div>`;

      modal.querySelectorAll('[data-open-order]').forEach(btn => {
        btn.addEventListener('click', () => {
          SFX.tap();
          const oid = btn.dataset.openOrder;
          closeTalkModal(false);
          if (opts.onOpenOrder && oid) opts.onOpenOrder(oid);
          else if (opts.onOpenDetail) opts.onOpenDetail(dashId);
        });
      });
      modal.querySelectorAll('[data-appr-idx]').forEach(btn => {
        btn.addEventListener('click', async () => {
          const ch = apprChoices[Number(btn.dataset.apprIdx)];
          if (!ch || !npcAppr) return;
          if (ch.action === 'openOrder') {
            SFX.tap();
            closeTalkModal(false);
            if (opts.onOpenOrder) opts.onOpenOrder(npcAppr.id);
            return;
          }
          if (ch.action === 'edit') {
            SFX.tap();
            const inp = modal.querySelector('input[name="msg"]');
            if (inp) { inp.value = '수정 요청: '; inp.focus(); }
            const resEl = modal.querySelector('[data-res]');
            if (resEl) { resEl.hidden = false; resEl.textContent = '✏️ 수정할 내용을 입력하고 [지시 전달]을 눌러주세요!'; }
            return;
          }
          const resEl = modal.querySelector('[data-res]');
          if (resEl) { resEl.hidden = false; resEl.textContent = `📡 [${ch.num}번] 결재 응답을 전달하는 중…`; }
          if (opts.onReplyOrder) {
            const r = await opts.onReplyOrder({ id: npcAppr.id, text: ch.replyText || ch.label, approve: !!ch.approve });
            if (r?.error) { if (resEl) resEl.textContent = `⚠️ ${r.error}`; return; }
          }
          SFX.fanfare();
          if (hit !== 'captain') voice(hit, 'ok', 0.25);
          spawnBurst(n.x, n.y, '✅ 결재 완료! +100 EXP', 100);
          n.bubble = `✅ [${ch.num}번] 결재 확인했습니다! 바로 진행합니다!`;
          n.bubbleType = 'ok';
          if (resEl) resEl.textContent = `✅ [${ch.num}번] "${ch.label}" 전달 완료!`;
          setTimeout(() => closeTalkModal(true), 850);
        });
      });
      modal.querySelector('[data-open-detail]')?.addEventListener('click', () => {
        SFX.tap();
        closeTalkModal(false);
        opts.onOpenDetail(dashId);
      });
      modal.querySelector('[data-quest-act]')?.addEventListener('click', async () => {
        if (!q) return;
        if (q.kind === 'visits') {
          SFX.tap();
          lsSet('oa_visit_read', q.reportId);
          delete activeQuests[hit];
          updateRpgHud();
          closeTalkModal(false);
          opts.onOpenVisits?.();
        } else if (q.kind === 'newshop' && q.shopName) {
          SFX.send();
          spawnBurst(n.x, n.y, '+100 EXP', 100);
          sendOrder(`${q.shopName} 사진 수집기로 올렸어. 가게 찾기용으로 만들어줘`);
        } else if (q.kind === 'seen' && q.orderId && opts.onMarkSeen) {
          SFX.fanfare();
          voice(hit, 'done', 0.3);
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
          if (text.includes('발차기') || text.includes('태권도')) { closeTalkModal(false); playCaptainAction('kick'); return; }
          if (['주먹', '펀치', '복싱', '격투'].some(w => text.includes(w))) { closeTalkModal(false); playCaptainAction('punch'); return; }
          if (text.includes('복귀')) { closeTalkModal(false); sitCaptainBack(); return; }
        }
        if (hit === 'sorter' && text === '🔍 상세 보기') { closeTalkModal(false); opts.onOpenVisits?.(); return; }
        if (hit === 'sorter' && text === '📅 어제와 비교') {
          const v = latestVisits;
          resEl.textContent = !v ? '아직 오늘 방문 기록이 없어요.'
            : v.ydayVis == null ? `오늘 ${v.hm}까지 ${v.vis}명이에요. 어제 같은 시각 기록은 아직 없어요(기록은 오늘부터 쌓여요).`
            : `오늘 ${v.hm}까지 ${v.vis}명 · 어제 ${v.ydayHm}까지 ${v.ydayVis}명 → ${v.vis - v.ydayVis > 0 ? (v.vis - v.ydayVis) + '명 많아요 ▲' : v.vis - v.ydayVis < 0 ? (v.ydayVis - v.vis) + '명 적어요 ▼' : '똑같아요'}`;
          return;
        }
        if (hit === 'sorter' && text === '📊 지금 보고해') {
          resEl.textContent = '📡 방문 기록을 새로 읽는 중…';
          const r = opts.onVisitsRefresh ? await opts.onVisitsRefresh().catch(() => null) : null;
          if (!r || r.error || !r.report) { resEl.textContent = `⚠️ 못 읽었어요: ${r?.error || '대시보드 서버(다시 켜야 할 수 있어요) 또는 관리자 키 확인'}`; return; }
          latestVisits = r.report;
          lsSet('oa_visit_shown', r.report.id); lsSet('oa_visit_read', r.report.id);
          const box = modal.querySelector('[data-visit]');
          if (box) box.outerHTML = visitBlock();
          resEl.textContent = r.fresh ? `✅ ${r.report.hm} 기준으로 새로 읽었어요.` : `ℹ️ 2분 안에 읽은 결과라 그대로 보여 드려요(${r.report.hm} 기준).`;
          voice(hit, 'done', 0.2);
          n.bubble = r.report.speech; n.bubbleType = 'ok';
          setTimeout(() => { if (n.bubble === r.report.speech) n.bubble = ''; }, 9000);
          placeModal();
          return;
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
        if (hit !== 'captain') voice(hit, 'ok', 0.25);
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
      modalTargets = (hit === 'captain') ? [cap] : [cap, n];
      modalSlot = null;
      modalBack.hidden = false;
      placeModal();
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
      // 화면 위치 → 사무실(확대 전) 좌표로 바꿈 (카메라 확대·이동은 그림판 안에서 하므로)
      px = (px - (cam.tx || 0)) / (cam.z || 1);
      py = (py - (cam.ty || 0)) / (cam.z || 1);
      let hit = null, best = 6.8;
      for (const n of Object.values(npcs)) {
        const standing = (n.mode === 'walk' || n.mode === 'stand' || n.mode === 'emote');
        const d = Math.hypot(px - n.x, py - (n.y - (standing ? standPct(n.id) * 0.45 : 4)));
        if (d < best) { best = d; hit = n.id; }
      }
      if (!hit) {
        touchCaptainInput();
        if (capRingOpen) setCapRing(false);
        if (canWalk(px, py)) {
          SFX.walkClick();
          clickRing = { x: px, y: py, born: performance.now() };
          walkCaptainSafe(px, py, { bubble: '', onArrive: () => { npcs.captain.mode = 'stand'; } });
        }
        return;
      }
      if (hit === 'captain') {
        setCapRing(!capRingOpen);
        return;
      }
      if (capRingOpen) setCapRing(false);
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
      if (busyBlocked(id, [[tx, ty]], opts2.force)) return false;
      // 이미 자기 자리에 앉아 있는데 '자리로 돌아가기'가 또 오면(늦게 도착한 타이머) 일어서지 않음
      if (n.mode === 'idle' && c && Math.hypot(tx - c.home[0], ty - c.home[1]) < 0.6) return true;
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
      stopInspectorSolo(false);
      briefingActive = true;
      SFX.brief();
      voice('captain', 'brief', 0.5);
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
              voice(sid, 'done');
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
        force: true,
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
          force: true,
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
      voice('captain', 'end');
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
    root.querySelector('[data-inspector-dance]')?.addEventListener('click', () => inspectorSoloDance());
    root.querySelector('[data-cap-greet]')?.addEventListener('click', () => playCaptainAction('greet'));
    root.querySelector('[data-cap-coffee]')?.addEventListener('click', () => playCaptainAction('coffee'));
    // 모바일 멀티터치(왼손 조이스틱 드래그 + 오른손 발차기 탭)에서 즉시 발동하도록 pointerdown 사용!
    [['[data-cap-kick]', 'kick'], ['[data-cap-punch]', 'punch']].forEach(([sel, act]) => {
      const btn = root.querySelector(sel);
      if (!btn) return;
      let trigAt = 0;
      const fire = e => {
        e.preventDefault(); e.stopPropagation();
        const nowMs = performance.now();
        if (nowMs - trigAt < 250) return;
        trigAt = nowMs;
        playCaptainAction(act);
      };
      btn.addEventListener('pointerdown', fire);
      btn.addEventListener('click', fire);
    });
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

    function syncReal({ orders = [], jobs = [], collector = null, hr = null, quota = null, newshops = [], storesCount = 0, talk = [], visits = null } = {}) {
      latestVisits = visits || latestVisits;
      if (storesCount > 0) totalStoresCount = storesCount;
      // 캡틴 머리 위 클로드 사용량 HP(5시간=녹색)/MP(주간=파랑) 피통 게이지 업데이트! (0% 사용 = 100% 풀, 많이 쓸수록 깎이고 위험 시 빨강)
      const cq = quota?.claude;
      if (cq?.status === 'ok' && Array.isArray(cq.bars) && capHp5h && capHpWk) {
        const b5 = cq.bars.find(b => /5시간|5h/i.test(b.label || '')) || cq.bars[0];
        const bw = cq.bars.find(b => /주간|week/i.test(b.label || '')) || cq.bars[1];
        const u5 = Math.max(0, Math.min(100, Number(b5?.used ?? 0)));
        const uw = Math.max(0, Math.min(100, Number(bw?.used ?? 0)));
        const rem5 = Math.max(2, 100 - u5);
        const remW = Math.max(2, 100 - uw);
        capHp5h.style.width = `${rem5}%`;
        capHp5h.classList.toggle('warn', u5 >= 65 && u5 < 80);
        capHp5h.classList.toggle('low',  u5 >= 80);
        capHpWk.style.width = `${remW}%`;
        capHpWk.classList.toggle('warn', uw >= 70 && uw < 85);
        capHpWk.classList.toggle('low',  uw >= 85);
        capHpEl.title = `클로드 잔여량 · 5시간 ${100 - u5}% 남음(${u5}% 사용) · 주간 ${100 - uw}% 남음(${uw}% 사용)`;
      }
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
      if (!briefingActive) {
        for (const id of busy) {
          const n = npcs[id], c = CHARS[id];
          if (!n || !c || id === 'captain' || n.mode === 'idle' || n.goingToWork) continue;
          if (activeTalkNpc && activeTalkNpc.id === id) continue;
          n.goingToWork = true;
          n.emote = null; n.emoteLoop = false;
          walkNpcSafe(id, c.home[0], c.home[1], {
            bubble: '⚡ 일 들어왔어요, 자리로 갑니다!', bubbleType: 'ok',
            onArrive: () => { n.goingToWork = false; seatNpc(id); },
          });
        }
      }

      const done = new Set();
      const doneOrderOf = {};
      const cleared = o => o.deployState === 'done' || (!o.deployable && o.seenAt);
      for (const o of orders.filter(o => o.status === 'done' && !cleared(o))) {
        for (const d of (o.worked || [])) {
          const oaId = DASH_TO_OA[d];
          if (oaId) { done.add(oaId); if (!doneOrderOf[oaId]) doneOrderOf[oaId] = o; }
        }
      }

      // RPG 퀘스트(! / ?) 및 캡틴 실시간 상태 배지 갱신 (실제 대시보드 데이터 기반!)
      latestOrders = orders || [];
      pendingApprovals = latestOrders.filter(o =>
        o.status !== 'running' && o.status !== 'stopping' &&
        (o.approval || o.status === 'wait' || o.needAnswer || (o.deploy?.length && o.deployState !== 'done' && o.deployState !== 'running'))
      );
      if (capStatusEl) {
        capStatusEl.classList.remove('st-wait', 'st-work', 'st-done');
        if (pendingApprovals.length > 0) {
          capStatusEl.textContent = `🔔 결재 ${pendingApprovals.length}건 대기`;
          capStatusEl.classList.add('st-wait');
          capStatusEl.hidden = false;
        } else if (busy.size > 0) {
          capStatusEl.textContent = `⚡ ${busy.size}명 작업 중`;
          capStatusEl.classList.add('st-work');
          capStatusEl.hidden = false;
        } else if (done.size > 0) {
          capStatusEl.textContent = `✅ 완료 보고 ${done.size}건`;
          capStatusEl.classList.add('st-done');
          capStatusEl.hidden = false;
        } else {
          capStatusEl.textContent = '';
          capStatusEl.hidden = true;
        }
      }
      const ringFirst = capRingEl?.querySelector('.oa-cr-item.i0');
      if (ringFirst) {
        if (pendingApprovals.length > 0) {
          ringFirst.dataset.cr = 'approval';
          ringFirst.textContent = `🔔 결재함 (${pendingApprovals.length}건)`;
        } else {
          ringFirst.dataset.cr = 'newshop';
          ringFirst.textContent = '🏪 새 가게 제작';
        }
      }
      const nextQ = {};
      // 1) 결재 대기 또는 배포 대기 -> 비서실장 머리 위 노란 '!'
      const waitOrder = pendingApprovals[0];
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
      // 2-1) 아직 열어 보지 않은 30분 방문 보고 -> 선별팀 팀장 머리 위 초록 '?' (새 가게 알림이 먼저)
      if (latestVisits && !nextQ.sorter && String(latestVisits.id) !== lsGet('oa_visit_read')) {
        nextQ.sorter = {
          type: 'ask', kind: 'visits', reportId: latestVisits.id,
          title: `${latestVisits.hm} 방문 보고: 오늘 ${latestVisits.vis}명`,
          actionLabel: '🔍 상세 보기'
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
      if (latestVisits) YESTERDAY_REPORTS.sorter = latestVisits.speech;
      visitWalkReport();
      if (hr?.report) {
        const dayOk = hr.report.day ? '주간 ✔' : '주간 대기';
        const nightOk = hr.report.night ? '야간 ✔' : '야간 대기';
        YESTERDAY_REPORTS.staffing = `📅 인력 현황 보고: ${dayOk} · ${nightOk} 확인 완료했습니다!`;
      }

      // 새로 완료된 담당이 있으면 복도로 걸어 나와 보고 모션 자동 실행!
      if (prevReal && !briefingActive && !document.hidden) {
        for (const id of prevReal.busy) {
          if (!busy.has(id) && id !== 'claude' && id !== 'captain' && npcs[id]?.mode === 'idle') {
            walkNpcSafe(id, 50 + (Math.random() * 6 - 3), 46.5, {
              bubble: '✅ 작업 완료 보고드립니다!',
              bubbleType: 'ok',
              onArrive: () => {
                npcs[id].mode = 'stand'; npcs[id].dir = 'back';
                voice(id, 'done');
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
      walkNpcSafe(pick, 15.5, 22.0, {
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
            if (emoteKey === 'water') SFX.water();
            else if (emoteKey === 'clean' || emoteKey === 'sweep') SFX.sweep();
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
        if (Math.abs(ax - bx) < 2) { a.dir = 'front'; b.dir = 'back'; }
        else { a.dir = 'east'; b.dir = 'west'; }
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
        return doChore('sorter', leftPlant ? 32.8 : 67.4, 37.4, leftPlant ? 'west' : 'east',
          '🪴 물뿌리개 들고 화분 관리 가는 중…', '💧 화분에 물 주는 중… 쑥쑥 자라라!', 3800, '', 'water',
          leftPlant ? [32.4, 37.4] : [67.7, 37.4]);
      },
      // 2. 운영 감찰관: 복도 화분과 비서실장 책상 사이 공간 바닥 빗자루 청소
      () => {
        const leftSide = Math.random() < 0.5;
        return doChore('inspector', leftSide ? 37.0 : 63.0, 41.2, 'front',
          '🧹 화분 옆 복도 청소하러 나왔습니다!', '🧹 복도 바닥 빗자루질 중… 깔끔하게!', 3600, '', 'sweep');
      },
      // 3. 인력 공급팀 팀장: 캡틴 책상 먼지 털기 (책상 좌측 앞쪽 y=23.0 밀착 → 먼지털이가 책상 상판 위를 직접 닦음!)
      () => doChore('staffing', 41.0, 22.4, 'east',
        '🪶 캡틴 책상 정돈하러 올라가는 중…', '✨ 캡틴 책상 먼지 닦아드렸습니다!', 3600, '', 'clean',
        [43.8, 22.2]),
      // 4. 비서실장: 캡틴 커피 서빙 & 안부 여쭙기
      () => {
        if (!isFree('claude')) return false;
        serveCoffee(); return true;
      },
      // 5. 시각 정보 비서: 스튜디오 조명·카메라 점검
      () => doChore('finder', 20.6, 43.2, 'east',
        '💡 스튜디오 조명 점검 중…', '📷 크로마키 조명·카메라 각도 완벽!', 2800),
      // 6. 감사실 2인방(운영 감찰관 + 데이터 감사관): 좌측 복도 또는 커피 라운지 교차 토론
      () => {
        const atLounge = Math.random() < 0.5;
        return doPairChat('inspector', 'auditor',
          atLounge ? 22.5 : 31.0, atLounge ? 20.0 : 45.5,
          atLounge ? 27.5 : 36.5, atLounge ? 20.0 : 45.5,
          '🛡️ 방금 검수한 가격표 교차 확인했나요?', '📊 네! 오타 0건, 100% 일치합니다!');
      },
      // 7. 수석 번역관 + 비서실장: 번역 톤 상의
      () => {
        if (!isFree('translator')) return false;
        return doChore('translator', 49.8, 46.5, 'back',
          '🌐 번역 톤 상의하러 가는 중…', '💬 베트남어·영어 메뉴 표현 자연스럽게 다듬었어요!', 3000);
      },
      // 8. 디지털 메뉴 통제실 2인방(메뉴 검사관 + 자료 해석 비서): 우측 테라스 또는 우측 복도 데이터 수다
      () => {
        const atTerrace = Math.random() < 0.5;
        return doPairChat('reader', 'agy',
          atTerrace ? 75.5 : 60.5, atTerrace ? 19.8 : 45.5,
          atTerrace ? 81.5 : 66.0, atTerrace ? 19.8 : 45.5,
          '📑 방금 해석한 메뉴 JSON 넘겼어요!', '🔍 좋아요, 모바일 화면 바로 대조할게요!');
      },
      // 9. 랜덤 대기 직원: 커피바 휴식 & 스트레칭 (위치 분산)
      () => {
        const pool = ['finder', 'agy', 'translator', 'sorter', 'inspector', 'staffing', 'reader', 'auditor'].filter(isFree);
        if (!pool.length) return false;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        const hr = new Date().getHours();
        const msg = (hr >= 11 && hr <= 13) ? '☕ 점심 식후 아아 한 잔 추출 중…' : '☕ 시원한 커피 한 잔 하며 스트레칭 중…';
        const cx = [10.5, 15.0, 19.5][Math.floor(Math.random() * 3)];
        return doChore(pick, cx, 22.0, 'back', '☕ 커피바 휴식 가는 중…', msg, 3000);
      },
      // 10. 랜덤 대기 직원: 우측 테라스 창밖 구경(환기, 위치 분산)
      () => {
        const pool = ['finder', 'agy', 'translator', 'sorter', 'inspector', 'staffing', 'reader', 'auditor'].filter(isFree);
        if (!pool.length) return false;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        const tx = [76.5, 82.5, 88.5][Math.floor(Math.random() * 3)];
        return doChore(pick, tx, 19.8, 'back', '🌤️ 테라스 바람 좀 쐬러 가는 중…', '🌤️ 창밖 풍경이 좋네요… 잠시 환기 중!', 3200);
      },
      // 11. 서로 다른 부서 2명 사무실 전역 빈 공간 분산 수다(Banter)
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
        const spots = [
          [22.5, 20.0, 27.5, 20.0], // 좌측 커피 라운지
          [75.5, 19.8, 81.5, 19.8], // 우측 햇살 테라스
          [34.5, 45.5, 40.0, 45.5], // 좌측 복도
          [60.0, 45.5, 65.5, 45.5], // 우측 복도
          [50.5, 63.0, 50.5, 70.0], // 중앙 하단 남북 복도
          [31.0, 93.5, 37.0, 93.5], // 맨 아래 나무 바닥(왼쪽)
          [62.0, 93.5, 68.0, 93.5], // 맨 아래 나무 바닥(오른쪽)
        ];
        const [m1, m2] = pairs[Math.floor(Math.random() * pairs.length)];
        const [ax, ay, bx, by] = spots[Math.floor(Math.random() * spots.length)];
        return doPairChat(a, b, ax, ay, bx, by, m1, m2);
      },
      // 12. 선별팀 팀장: 방 안 컨베이어 옆 박스 점검
      () => doChore('sorter', 85.4, 80.8, 'east',
        '📦 컨베이어 분류 상태 확인 중…', '✅ 포장 라인·분류함 이상 없음!', 2800),
      // 13. 비서실장 + 자료 해석 비서: 분산 무대 합동 아이돌 댄스 타임!
      () => (isFree('claude') && isFree('reader')) ? danceParty() : false,
    ];

    let lastDanceStage = -1;
    let soloDanceTimer = null, lastSoloStage = -1;
    const soloBtn = root.querySelector('[data-inspector-dance]');
    function stopInspectorSolo(returnHome = true) {
      if (soloDanceTimer) { clearTimeout(soloDanceTimer); soloDanceTimer = null; }
      soloBtn?.classList.remove('on');
      const ins = npcs.inspector;
      if (!ins) return;
      if (ins.mode === 'emote' && ins.emote === 'dance') {
        stopDanceMusic();
        ins.emote = null; ins.emoteLoop = false; ins.bubble = '';
        if (returnHome && !briefingActive && !(activeTalkNpc && activeTalkNpc.id === 'inspector')) {
          walkNpcSafe('inspector', CHARS.inspector.home[0], CHARS.inspector.home[1], {
            onArrive: () => seatNpc('inspector')
          });
        }
      }
    }
    function inspectorSoloDance() {
      if (briefingActive) return false;
      const ins = npcs.inspector;
      if (!ins) return false;
      // 이미 솔로 댄스 중이면 한 번 더 눌러서 깔끔하게 종료·복귀
      if (soloDanceTimer || (ins.mode === 'emote' && ins.emote === 'dance')) {
        stopInspectorSolo(true);
        log('👍 운영 감찰관 솔로 댄스 종료 — 자리로 복귀합니다.');
        return true;
      }
      const soloStages = [
        { name: '중앙 홀',          pos: [50.0, 49.0] },
        { name: '좌측 복도 라운지', pos: [37.2, 46.5] },
        { name: '우측 복도 라운지', pos: [62.7, 46.5] },
        { name: '우측 햇살 테라스', pos: [78.5, 19.8] },
        { name: '좌측 커피바 앞',   pos: [27.5, 22.5] },
        { name: '맨 아래 나무 바닥', pos: [50.0, 93.5] },
      ];
      lastSoloStage = (lastSoloStage + 1) % soloStages.length;
      const st = soloStages[lastSoloStage];
      soloBtn?.classList.add('on');
      ins.emote = null; ins.emoteLoop = false;
      log(`👍 운영 감찰관 — ${st.name} 솔로 아이돌 댄스 무대!`);
      walkNpcSafe('inspector', st.pos[0], st.pos[1], {
        bubble: `👍 ${st.name} 솔로 무대로 이동 중…`,
        onArrive: () => {
          if (briefingActive) { soloBtn?.classList.remove('on'); return; }
          ins.dir = 'front';
          ins.mode = 'emote'; ins.emote = 'dance'; ins.emoteLoop = true;
          ins.emoteStart = performance.now() / 1000;
          ins.bubble = '👍✨ 운영 감찰관 솔로 댄스 타임!';
          ins.bubbleType = 'meet';
          playDanceMusic('inspector');
          spawnBurst(st.pos[0], st.pos[1] - 1.8, '👍 감찰관 솔로 댄스! +25 EXP', 25);
          soloDanceTimer = setTimeout(() => {
            soloDanceTimer = null;
            soloBtn?.classList.remove('on');
            stopDanceMusic();
            if (briefingActive || (activeTalkNpc && activeTalkNpc.id === 'inspector')) return;
            ins.emote = null; ins.emoteLoop = false; ins.bubble = '';
            walkNpcSafe('inspector', CHARS.inspector.home[0], CHARS.inspector.home[1], {
              bubble: '😎 솔로 무대 끝! 자리로 복귀합니다.',
              onArrive: () => seatNpc('inspector')
            });
          }, 17350);
        }
      });
      return true;
    }

    function danceParty() {
      if (briefingActive) return false;
      stopInspectorSolo(true);
      const stages = [
        { name: '우측 햇살 테라스', a: [75.5, 19.8], b: [81.5, 19.8], bx: 78.5, by: 18.2 },
        { name: '좌측 복도 라운지', a: [34.5, 46.5], b: [40.0, 46.5], bx: 37.2, by: 44.5 },
        { name: '우측 복도 라운지', a: [60.0, 46.5], b: [65.5, 46.5], bx: 62.7, by: 44.5 },
        { name: '좌측 커피바 앞',   a: [25.0, 22.5], b: [30.0, 22.5], bx: 27.5, by: 20.9 },
        { name: '중앙 홀',          a: [46.5, 46.0], b: [53.5, 46.0], bx: 50.0, by: 44.5 },
        { name: '맨 아래 나무 바닥', a: [46.0, 93.5], b: [54.0, 93.5], bx: 50.0, by: 91.5 },
      ];
      let sIdx = Math.floor(Math.random() * stages.length);
      if (sIdx === lastDanceStage) sIdx = (sIdx + 1) % stages.length;
      lastDanceStage = sIdx;
      const st = stages[sIdx];
      const dancers = [
        { id: 'claude', tx: st.a[0], ty: st.a[1], go: `💃 ${st.name} 무대로 이동 중…`, msg: '💃✨ 신나는 아이돌 댄스 타임!' },
        { id: 'reader', tx: st.b[0], ty: st.b[1], go: '🎶 같이 춤추러 가요!', msg: '🎶 같이 춤춰요 캡틴! ✨' },
      ];
      // 2명 모두 도착할 때까지 먼저 온 쪽이 기다렸다가, 동시에 댄스 시작 + 음악 시작 + 7.2초 뒤 동시 종료!
      const validDancers = dancers.filter(d => npcs[d.id]);
      let arrivedCount = 0;
      log(`💃 비서실장 · 자료 해석 비서 — ${st.name} 합동 아이돌 댄스 타임!`);
      const startDuoSync = () => {
        if (briefingActive) return;
        const syncStart = performance.now() / 1000;
        const theme = (danceThemeIdx++ % 2 === 0) ? 'claude' : 'reader';
        playDanceMusic(theme);
        spawnBurst(st.bx, st.by, theme === 'claude' ? '💃 비서실장 댄스! +20 EXP' : '🎶 자료해석 댄스! +20 EXP', 20);
        for (const d of validDancers) {
          const dn = npcs[d.id];
          dn.dir = 'front';
          dn.mode = 'emote'; dn.emote = 'dance'; dn.emoteLoop = true;
          dn.emoteStart = syncStart;
          dn.bubble = d.msg; dn.bubbleType = 'meet';
        }
        setTimeout(() => {
          stopDanceMusic();
          for (const d of validDancers) {
            const dn = npcs[d.id];
            if (briefingActive || (activeTalkNpc && activeTalkNpc.id === d.id)) continue;
            dn.emote = null; dn.emoteLoop = false; dn.bubble = '';
            walkNpcSafe(d.id, CHARS[d.id].home[0], CHARS[d.id].home[1], {
              onArrive: () => seatNpc(d.id)
            });
          }
        }, 7200);
      };
      for (const d of validDancers) {
        const n = npcs[d.id];
        n.emote = null; n.emoteLoop = false;
        walkNpcSafe(d.id, d.tx, d.ty, {
          bubble: d.go,
          onArrive: () => {
            if (briefingActive) return;
            n.dir = 'front';
            n.mode = 'stand';
            if (++arrivedCount < validDancers.length) {
              n.bubble = '🎶 준비 완료! 기다리는 중…';
              n.bubbleType = '';
            } else {
              startDuoSync();
            }
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
    return { runDemo, serveCoffee, captainWalk, hallChat, sitCaptainBack, playCaptainAction, startBriefing, endBriefing, syncReal, stroll, danceParty, inspectorSoloDance };
  }

  window.OfficeAnime = { create };
})();
