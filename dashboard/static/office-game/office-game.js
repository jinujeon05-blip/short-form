// Jinwoo 에이전트 2D HD 픽셀 타이쿤 NPC 사무실 (별도 작업 공간: dashboard/static/office-game/)
// 논리 해상도 480x270(정확한 16:9 HD 픽셀 아트) + 위쪽 선명한 한국어 HUD/말풍선 오버레이.
// 기존 대시보드에 이식할 때는 window.OfficeGame.create(container, { onSelect }) 만 호출하면 된다.
(() => {
  const W = 480, H = 270;

  // 10명 캐릭터 정의 (대시보드 app.js 의 M 키와 1:1 동일)
  const CHARS = {
    captain: {
      name: '캡틴', role: '결재', dept: 'executive',
      home: [240, 34], seatDir: 'down',
      hair: '#1e1b24', hairStyle: 'short', skin: '#f6c8a8',
      shirt: '#1e3a6d', accent: '#dc2626', pants: '#172554',
    },
    claude: {
      name: '비서실장', role: '지휘', dept: 'chief',
      home: [240, 74], seatDir: 'down',
      hair: '#3b2417', hairStyle: 'long', skin: '#fad2b4',
      shirt: '#ea580c', accent: '#ffedd5', pants: '#1f2937',
    },
    finder: {
      name: '시각 정보 비서', role: '사진 고르기', dept: 'media',
      home: [86, 134], seatDir: 'down',
      hair: '#2d1f18', hairStyle: 'long', skin: '#fad2b4',
      shirt: '#2f855a', accent: '#c6f6d5', pants: '#1e293b',
    },
    agy: {
      name: '메뉴 검사관', role: '메뉴판 읽기', dept: 'menu',
      home: [204, 134], seatDir: 'down',
      hair: '#1f2430', hairStyle: 'short', skin: '#f5c6a5',
      shirt: '#3b82f6', accent: '#dbeafe', pants: '#1e293b', glasses: true,
    },
    'menu-reader': {
      name: '자료 해석 비서', role: '메뉴판 읽기', dept: 'menu',
      home: [276, 134], seatDir: 'down',
      hair: '#3a2218', hairStyle: 'long', skin: '#fad4b8',
      shirt: '#8b5cf6', accent: '#ede9fe', pants: '#1e293b',
    },
    codex: {
      name: '운영 감찰관', role: '두 번째 검토', dept: 'audit',
      home: [368, 134], seatDir: 'down',
      hair: '#1e232e', hairStyle: 'short', skin: '#f5c6a5',
      shirt: '#0d9488', accent: '#ccfbf1', pants: '#1e293b', glasses: true,
    },
    reviewer: {
      name: '데이터 감사관', role: '마지막 점검', dept: 'audit',
      home: [430, 134], seatDir: 'down',
      hair: '#3e2518', hairStyle: 'bob', skin: '#fad4b8',
      shirt: '#eab308', accent: '#fef9c3', pants: '#1e293b',
    },
    polisher: {
      name: '수석 번역관', role: '번역·글', dept: 'trans',
      home: [86, 224], seatDir: 'down',
      hair: '#2f1d16', hairStyle: 'long', skin: '#fad4b8',
      shirt: '#ec4899', accent: '#fce7f3', pants: '#1e293b',
    },
    staffing: {
      name: '인력 공급팀', role: '인력 현황', dept: 'staffing',
      home: [240, 224], seatDir: 'down',
      hair: '#241b17', hairStyle: 'bob', skin: '#f8cfb1',
      shirt: '#0284c7', accent: '#e0f2fe', pants: '#1e293b', headset: true,
    },
    sorting: {
      name: '선별팀', role: '선별 실적', dept: 'sorting',
      home: [378, 224], seatDir: 'down',
      hair: '#332018', hairStyle: 'bun', skin: '#f8cfb1',
      shirt: '#f8fafc', accent: '#78350f', pants: '#451a03', apron: true,
    },
  };

  // 부서 간판 (각 방 위쪽 띠에 딱 맞춰 배치 — 캐릭터 말풍선과 겹치지 않게)
  const SIGNS = [
    { text: '미디어 관제실', x: 16.9, y: 36.8, bg: '#15803d' },
    { text: '디지털 메뉴 통제실', x: 50.0, y: 36.8, bg: '#dc2626' },
    { text: '감사실', x: 83.1, y: 36.8, bg: '#7c3aed' },
    { text: '통번역 통제실', x: 16.9, y: 70.4, bg: '#2563eb' },
    { text: '인력 공급팀', x: 50.0, y: 70.4, bg: '#0284c7' },
    { text: '선별팀', x: 83.1, y: 70.4, bg: '#ea580c' },
  ];

  // 복도 웨이포인트 그래프 (책상·벽·화분을 절대 밟지 않는 안전한 보행 경로)
  const WP = {
    coffee: [52, 62],
    topL:   [156, 86],
    topC:   [240, 86],
    topR:   [324, 86],
    chiefL: [212, 86],
    chiefR: [268, 86],
    midL:   [156, 178],
    midC:   [240, 178],
    midR:   [324, 178],
    meet1:  [226, 178],
    meet2:  [254, 178],
    capStep:[240, 56],
  };

  // 각 캐릭터의 자리 ↔ 가장 가까운 복도 진입점 경로
  const EXIT_PATH = {
    captain:       [[240, 34]],
    claude:        [[240, 74], [240, 86]],
    finder:        [[86, 134], [156, 134], [156, 86]],
    agy:           [[204, 134], [156, 134], [156, 86]],
    'menu-reader': [[276, 134], [324, 134], [324, 86]],
    codex:         [[368, 134], [324, 134], [324, 86]],
    reviewer:      [[430, 134], [324, 134], [324, 86]],
    polisher:      [[86, 224], [156, 224], [156, 178]],
    staffing:      [[240, 224], [156, 224], [156, 178]],
    sorting:       [[378, 224], [324, 224], [324, 178]],
  };

  function routeToChief(id) {
    const out = EXIT_PATH[id].slice();
    const last = out[out.length - 1];
    const isLeft = last[0] < 240;
    if (last[1] > 100) out.push(isLeft ? WP.topL : WP.topR);
    out.push(isLeft ? WP.chiefL : WP.chiefR);
    return out;
  }

  function routeToCoffee(id) {
    const out = EXIT_PATH[id].slice();
    const last = out[out.length - 1];
    if (last[1] > 100) out.push(last[0] < 240 ? WP.topL : WP.topR);
    if (last[0] > 240) out.push(WP.topL);
    out.push([156, 62], WP.coffee);
    return out;
  }

  function routeToMeeting(id, slot) {
    const out = EXIT_PATH[id].slice();
    const last = out[out.length - 1];
    if (last[1] < 100) out.push(last[0] < 240 ? WP.midL : WP.midR);
    out.push(slot === 0 ? WP.meet1 : WP.meet2);
    return out;
  }

  // ---------------------------------------------------------------- 픽셀 아트 그리기 도우미
  function px(c, x, y, w, h, color) {
    c.fillStyle = color;
    c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function drawPlant(c, x, y, t) {
    const sway = Math.sin(t * 1.4 + x * 0.1) > 0.6 ? 1 : 0;
    // 그림자
    px(c, x - 6, y + 4, 12, 4, 'rgba(0,0,0,0.16)');
    // 화분
    px(c, x - 4, y, 8, 6, '#b45309');
    px(c, x - 5, y - 1, 10, 2, '#d97706');
    px(c, x - 3, y + 1, 2, 4, '#f59e0b');
    // 잎사귀
    px(c, x - 5 + sway, y - 7, 10, 6, '#15803d');
    px(c, x - 4 + sway, y - 10, 8, 5, '#16a34a');
    px(c, x - 2 + sway, y - 12, 4, 3, '#22c55e');
    px(c, x - 6, y - 5, 3, 3, '#166534');
    px(c, x + 3 + sway, y - 6, 3, 3, '#4ade80');
  }

  function drawDesk(c, x, y, w, active, t, extra) {
    // 그림자
    px(c, x - 1, y + 11, w + 2, 4, 'rgba(15,23,42,0.16)');
    // 책상 상판 (입체감)
    px(c, x, y, w, 9, '#f8fafc');
    px(c, x, y, w, 2, '#ffffff');
    px(c, x, y + 8, w, 4, '#cbd5e1');
    px(c, x, y + 11, w, 1, '#94a3b8');
    // 다리
    px(c, x + 2, y + 12, 2, 3, '#64748b');
    px(c, x + w - 4, y + 12, 2, 3, '#64748b');

    // 노트북/모니터
    const mx = x + Math.floor(w / 2) - 6;
    px(c, mx, y - 3, 12, 7, '#1e293b');
    const scr = active ? (Math.floor(t * 6) % 2 === 0 ? '#38bdf8' : '#60a5fa') : '#334155';
    px(c, mx + 1, y - 2, 10, 5, scr);
    if (active) {
      // 반짝이는 코드/차트 줄 + 화면 빛 번짐
      px(c, mx + 2, y - 1, 5, 1, '#e0f2fe');
      px(c, mx + 2, y + 1, 7, 1, '#bae6fd');
      c.fillStyle = 'rgba(56, 189, 248, 0.16)';
      c.fillRect(mx - 4, y - 6, 20, 12);
    }
    px(c, mx + 4, y + 4, 4, 2, '#475569');
    // 키보드
    px(c, mx + 1, y + 6, 10, 2, '#94a3b8');

    if (extra === 'flags') {
      // 통번역실 미니 국기 5개
      const colors = ['#ef4444', '#dc2626', '#2563eb', '#f59e0b', '#ffffff'];
      colors.forEach((col, i) => {
        px(c, x + 3 + i * 3, y - 3, 1, 5, '#475569');
        px(c, x + 4 + i * 3, y - 3, 2, 2, col);
      });
    } else if (extra === 'books') {
      px(c, x + 3, y + 1, 7, 5, '#2563eb');
      px(c, x + 3, y + 1, 7, 1, '#93c5fd');
    } else if (extra === 'papers') {
      px(c, x + w - 10, y + 1, 7, 5, '#fef9c3');
      px(c, x + w - 9, y + 2, 5, 1, '#cbd5e1');
      px(c, x + w - 9, y + 4, 4, 1, '#cbd5e1');
    } else if (extra === 'camera') {
      px(c, x + 3, y + 1, 7, 4, '#1e293b');
      px(c, x + 5, y + 2, 3, 2, '#38bdf8');
    } else if (extra === 'calendar') {
      px(c, x + 3, y + 1, 7, 5, '#fff');
      px(c, x + 3, y + 1, 7, 2, '#ef4444');
    }
  }

  // 정적 배경(바닥·창문·벽·카펫·가구)을 오프스크린 캔버스에 한 번 그려 성능을 높인다
  function buildStaticMap() {
    const off = document.createElement('canvas');
    off.width = W;
    off.height = H;
    const c = off.getContext('2d');
    c.imageSmoothingEnabled = false;

    // 1. 따뜻한 원목 바닥 + 판자 결
    px(c, 0, 0, W, H, '#e8cfa6');
    for (let y = 26; y < H; y += 8) {
      px(c, 0, y, W, 1, '#d9bc8c');
      for (let x = ((y / 8) % 2) * 18; x < W; x += 36) {
        px(c, x, y, 1, 8, '#dec396');
      }
    }

    // 2. 위쪽 벽 + 파노라마 창문 + 바깥 도시 스카이라인
    px(c, 0, 0, W, 28, '#f1f5f9');
    px(c, 0, 26, W, 2, '#cbd5e1');
    const wins = [[12, 140], [166, 148], [328, 140]];
    for (const [wx, ww] of wins) {
      px(c, wx, 2, ww, 22, '#bae6fd');
      px(c, wx, 14, ww, 10, '#e0f2fe');
      // 원경 빌딩 실루엣
      for (let bx = wx + 4; bx < wx + ww - 8; bx += 14) {
        const bh = 5 + ((bx * 7) % 10);
        px(c, bx, 24 - bh, 10, bh, '#93c5fd');
        px(c, bx + 2, 24 - bh + 2, 2, 2, '#dbeafe');
      }
      // 창틀
      c.strokeStyle = '#64748b';
      c.lineWidth = 1;
      c.strokeRect(wx + 0.5, 2.5, ww - 1, 21);
      for (let gx = wx + 28; gx < wx + ww - 10; gx += 28) {
        px(c, gx, 2, 1, 22, '#94a3b8');
      }
    }

    // 3. 캡틴 단상 (위쪽 가운데, 2단 목재 계단)
    px(c, 174, 24, 132, 36, '#8b5a2b');
    px(c, 178, 26, 124, 30, '#a6713f');
    px(c, 182, 28, 116, 26, '#c8925a');
    // 계단
    px(c, 222, 56, 36, 4, '#a6713f');
    px(c, 222, 60, 36, 3, '#784820');
    // 캡틴 책상 (고급 마호가니 + 유리)
    px(c, 210, 40, 60, 11, '#5c3a21');
    px(c, 212, 41, 56, 7, '#784820');
    px(c, 215, 42, 50, 5, 'rgba(186,230,253,0.45)');
    px(c, 218, 42, 11, 5, '#1e293b'); // 노트북
    px(c, 219, 43, 9, 3, '#38bdf8');
    px(c, 255, 43, 3, 4, '#dc2626'); // 결재 도장

    // 4. 비서실장 자리 (가운데 통로 상단)
    px(c, 198, 66, 84, 20, '#dbeafe');
    px(c, 200, 68, 80, 16, '#eff6ff');

    // 5. 왼쪽 위 커피 라운지 (대기 중 NPC 휴식 공간)
    px(c, 14, 32, 74, 38, '#e2e8f0');
    px(c, 16, 34, 70, 34, '#f8fafc');
    // 커피 머신 카운터
    px(c, 18, 36, 40, 12, '#78350f');
    px(c, 18, 36, 40, 3, '#92400e');
    px(c, 22, 30, 12, 10, '#334155'); // 에스프레소 머신
    px(c, 24, 32, 8, 4, '#0f172a');
    px(c, 27, 36, 2, 3, '#ef4444');
    // 정수기
    px(c, 64, 30, 10, 14, '#e2e8f0');
    px(c, 66, 25, 6, 6, '#38bdf8');

    // 6. 오른쪽 위 미니 회의 게시판 / 현황판
    px(c, 392, 32, 74, 36, '#e2e8f0');
    px(c, 394, 34, 70, 32, '#f8fafc');
    px(c, 402, 36, 54, 16, '#1e293b');
    px(c, 404, 38, 50, 12, '#0f172a');
    px(c, 407, 41, 14, 2, '#4ade80');
    px(c, 407, 45, 22, 2, '#38bdf8');
    px(c, 434, 40, 14, 8, '#f59e0b');

    // 7. 6개 부서 구역 (바닥 카펫 + 흰색 파티션 벽)
    const zones = [
      // 위 줄
      { x: 14,  y: 102, w: 134, h: 68, fill: '#dcfce7', border: '#16a34a', bar: '#15803d' }, // 미디어 관제실
      { x: 164, y: 102, w: 152, h: 68, fill: '#fee2e2', border: '#dc2626', bar: '#b91c1c' }, // 디지털 메뉴 통제실
      { x: 332, y: 102, w: 134, h: 68, fill: '#f3e8ff', border: '#7c3aed', bar: '#6d28d9' }, // 감사실
      // 아래 줄
      { x: 14,  y: 192, w: 134, h: 68, fill: '#dbeafe', border: '#2563eb', bar: '#1d4ed8' }, // 통번역 통제실
      { x: 164, y: 192, w: 152, h: 68, fill: '#e0f2fe', border: '#0284c7', bar: '#0369a1' }, // 인력 공급팀
      { x: 332, y: 192, w: 134, h: 68, fill: '#ffedd5', border: '#ea580c', bar: '#c2410c' }, // 선별팀
    ];
    for (const z of zones) {
      px(c, z.x - 2, z.y - 2, z.w + 4, z.h + 4, '#ffffff');
      px(c, z.x, z.y, z.w, z.h, z.fill);
      c.strokeStyle = z.border;
      c.lineWidth = 1;
      c.strokeRect(z.x + 0.5, z.y + 0.5, z.w - 1, z.h - 1);
      // 파티션 상단 색 띠
      px(c, z.x, z.y, z.w, 4, z.bar);
    }

    // 미디어 관제실 카메라 삼각대 소품
    px(c, 34, 130, 8, 5, '#1e293b');
    px(c, 42, 131, 3, 3, '#38bdf8');
    px(c, 37, 135, 2, 10, '#475569');
    px(c, 34, 144, 2, 4, '#475569');
    px(c, 40, 144, 2, 4, '#475569');

    // 인력 공급팀 벽 달력 소품
    px(c, 186, 204, 18, 14, '#fff');
    px(c, 186, 204, 18, 4, '#ef4444');
    for (let r = 0; r < 3; r++) for (let col = 0; col < 4; col++) {
      px(c, 188 + col * 4, 210 + r * 3, 2, 2, (r === 1 && col === 2) ? '#22c55e' : '#cbd5e1');
    }

    // 대각선 햇살 효과 (고화질 분위기)
    c.save();
    c.fillStyle = 'rgba(255, 252, 230, 0.14)';
    c.beginPath(); c.moveTo(40, 24); c.lineTo(140, 24); c.lineTo(90, 270); c.lineTo(0, 270); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(290, 24); c.lineTo(410, 24); c.lineTo(340, 270); c.lineTo(220, 270); c.closePath(); c.fill();
    c.restore();

    return off;
  }

  // 컨베이어 벨트 + 움직이는 택배 상자 (선별팀 전용 애니메이션)
  function drawConveyor(c, t) {
    const x = 414, y = 216, w = 44, h = 14;
    px(c, x, y, w, h, '#334155');
    px(c, x + 2, y + 2, w - 4, h - 4, '#475569');
    // 벨트 롤러 움직임
    const shift = Math.floor(t * 14) % 6;
    for (let rx = x + 3 + shift; rx < x + w - 3; rx += 6) {
      px(c, rx, y + 3, 2, h - 6, '#64748b');
    }
    // 상자 2개 이동
    for (let i = 0; i < 2; i++) {
      const bx = x + 4 + ((Math.floor(t * 12) + i * 20) % 30);
      px(c, bx, y + 3, 9, 8, '#d97706');
      px(c, bx + 1, y + 4, 7, 3, '#f59e0b');
      px(c, bx + 3, y + 3, 3, 8, '#fde68a');
    }
  }

  // HD 픽셀 캐릭터 그리기 (16x22 논리 픽셀 — 표정·눈깜빡임·타이핑·걷기·서류·커피컵)
  function drawChar(c, npc, t) {
    const cfg = CHARS[npc.id];
    const x = Math.round(npc.x);
    const y = Math.round(npc.y);
    const walking = npc.mode === 'walk' || npc.mode === 'coffee-walk';
    const working = npc.mode === 'work';
    const done = npc.mode === 'done';

    const bob = walking ? (Math.sin(t * 14) > 0 ? -1 : 0)
      : done ? (Math.sin(t * 7) > 0.3 ? -1 : 0)
      : (Math.sin(t * 2.4 + x) > 0.7 ? -1 : 0);

    // 바닥 그림자
    px(c, x - 6, y + 5, 12, 3, 'rgba(15,23,42,0.24)');

    // 다리 (걷기 시 교차 애니메이션)
    if (walking) {
      const step = Math.sin(t * 14);
      px(c, x - 3, y + 1 + (step > 0 ? -1 : 1), 3, 5, cfg.pants);
      px(c, x + 1, y + 1 + (step > 0 ? 1 : -1), 3, 5, cfg.pants);
    } else {
      px(c, x - 3, y + 2, 3, 4, cfg.pants);
      px(c, x + 1, y + 2, 3, 4, cfg.pants);
    }

    // 몸통 (상의)
    px(c, x - 5, y - 6 + bob, 10, 8, cfg.shirt);
    // 목 카라 / 넥타이 / 앞치마
    if (cfg.id === 'captain' || npc.id === 'captain') {
      px(c, x - 1, y - 6 + bob, 2, 6, cfg.accent); // 빨간 넥타이
    } else if (cfg.apron) {
      px(c, x - 4, y - 5 + bob, 8, 7, cfg.accent); // 선별팀 갈색 앞치마
    } else {
      px(c, x - 2, y - 6 + bob, 4, 2, cfg.accent);
    }

    // 팔 (타이핑 시 빠르게 위아래, 서류 들기, 걷기 흔들기)
    const armL = working ? (Math.floor(t * 12) % 2) : walking ? (Math.sin(t * 14) > 0 ? 1 : -1) : 0;
    const armR = working ? ((Math.floor(t * 12) + 1) % 2) : -armL;
    px(c, x - 7, y - 5 + bob + armL, 2, 5, cfg.shirt);
    px(c, x - 7, y - 1 + bob + armL, 2, 2, cfg.skin);
    px(c, x + 5, y - 5 + bob + armR, 2, 5, cfg.shirt);
    px(c, x + 5, y - 1 + bob + armR, 2, 2, cfg.skin);

    // 머리 (10x9 HD 픽셀 얼굴)
    px(c, x - 5, y - 15 + bob, 10, 9, cfg.skin);
    // 머리카락 스타일
    px(c, x - 6, y - 17 + bob, 12, 4, cfg.hair);
    px(c, x - 6, y - 14 + bob, 2, 4, cfg.hair);
    px(c, x + 4, y - 14 + bob, 2, 4, cfg.hair);
    if (cfg.hairStyle === 'long') {
      px(c, x - 6, y - 10 + bob, 2, 5, cfg.hair);
      px(c, x + 4, y - 10 + bob, 2, 5, cfg.hair);
    } else if (cfg.hairStyle === 'bun') {
      px(c, x - 2, y - 19 + bob, 4, 3, cfg.hair);
    }

    // 앞면 볼 때 눈·안경·헤드셋 (뒷면 걸을 땐 머리카락으로 덮음)
    if (npc.dir === 'up') {
      px(c, x - 5, y - 15 + bob, 10, 8, cfg.hair);
    } else {
      const blink = ((Math.floor(t * 10 + x) % 47) === 0);
      if (!blink) {
        px(c, x - 3, y - 11 + bob, 2, 2, '#111827');
        px(c, x + 2, y - 11 + bob, 2, 2, '#111827');
        px(c, x - 3, y - 11 + bob, 1, 1, '#fff');
        px(c, x + 2, y - 11 + bob, 1, 1, '#fff');
      } else {
        px(c, x - 3, y - 10 + bob, 2, 1, '#111827');
        px(c, x + 2, y - 10 + bob, 2, 1, '#111827');
      }
      // 볼터치
      px(c, x - 4, y - 9 + bob, 1, 1, '#fda4af');
      px(c, x + 3, y - 9 + bob, 1, 1, '#fda4af');
      if (cfg.glasses) {
        px(c, x - 4, y - 12 + bob, 4, 1, '#334155');
        px(c, x + 1, y - 12 + bob, 4, 1, '#334155');
        px(c, x, y - 11 + bob, 1, 1, '#334155');
      }
      if (cfg.headset) {
        px(c, x - 7, y - 12 + bob, 2, 4, '#0f172a');
        px(c, x - 5, y - 9 + bob, 3, 1, '#38bdf8');
      }
    }

    // 들고 있는 아이템 (빛나는 황금 보고서 / 커피컵)
    if (npc.carry === 'doc') {
      px(c, x + 5, y - 8 + bob, 6, 7, '#fef08a');
      px(c, x + 6, y - 7 + bob, 4, 1, '#d97706');
      px(c, x + 6, y - 5 + bob, 4, 1, '#d97706');
      c.fillStyle = 'rgba(250, 204, 21, 0.28)';
      c.fillRect(x + 3, y - 10 + bob, 10, 11);
    } else if (npc.carry === 'coffee') {
      px(c, x + 6, y - 3 + bob, 4, 4, '#ffffff');
      px(c, x + 6, y - 3 + bob, 4, 1, '#78350f');
    }

    // 작업 중일 때 바닥 파란 링 / 완료 시 초록 반짝임
    if (working) {
      c.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      c.lineWidth = 1;
      c.strokeRect(x - 8.5, y - 18.5, 17, 26);
    } else if (done) {
      if (Math.floor(t * 4) % 2 === 0) {
        px(c, x + 7, y - 16, 2, 2, '#4ade80');
        px(c, x - 9, y - 13, 2, 2, '#fde047');
      }
    }
  }

  // ---------------------------------------------------------------- 게임 인스턴스 생성
  function create(container, opts = {}) {
    container.innerHTML = `
      <div class="og-stage">
        <canvas class="og-canvas" width="${W}" height="${H}"></canvas>
        <div class="og-hud"></div>
      </div>`;
    const stage = container.querySelector('.og-stage');
    const canvas = container.querySelector('.og-canvas');
    const hud = container.querySelector('.og-hud');
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const staticMap = buildStaticMap();

    const npcs = {};
    for (const [id, cfg] of Object.entries(CHARS)) {
      npcs[id] = {
        id, x: cfg.home[0], y: cfg.home[1], dir: cfg.seatDir,
        mode: 'idle', bubble: '', bubbleType: 'work', progress: null,
        carry: null, path: [], speed: 46, onArrive: null,
      };
    }

    let modeLabel = '실시간 연동';
    let demoTimers = [];
    let isDemo = false;
    let hrMarks = [];
    let seenReports = new Set();
    let prevActive = new Set();
    let prevDoneOrder = null;
    let lastCoffeeAt = 0;

    // HUD 요소 1회 생성 (부서 간판 + 캐릭터 이름표 + 말풍선 + 상태칩 + 인력배지)
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
      <div class="og-hr" data-hr-box style="left:50%;top:79%"></div>`;

    const tagEls = {}, bubEls = {};
    for (const id of Object.keys(CHARS)) {
      tagEls[id] = hud.querySelector(`[data-tag="${id}"]`);
      bubEls[id] = hud.querySelector(`[data-bub="${id}"]`);
    }
    const modeChip = hud.querySelector('[data-mode-chip]');
    const workChip = hud.querySelector('[data-work-chip]');
    const hrBox = hud.querySelector('[data-hr-box]');

    function log(msg) {
      if (opts.onLog) opts.onLog(msg);
    }

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
          n.dir = 'up';
          const chief = npcs.claude;
          chief.bubble = '확인했어요! ✔';
          chief.bubbleType = 'ok';
          setTimeout(() => {
            if (chief.bubble === '확인했어요! ✔') chief.bubble = '';
            sendPath(id, backHome, {
              mode: 'walk', carry: null, bubble: '',
              onArrive: () => {
                n.dir = CHARS[id].seatDir;
                n.mode = 'done';
                n.bubble = '';
              },
            });
          }, 1100);
        },
      });
    }

    function chiefHandoff(text = '결재 올립니다!') {
      const chief = npcs.claude;
      const cap = npcs.captain;
      log(`비서실장 → 캡틴에게 결재 전달 (${text})`);
      sendPath('claude', [[240, 74], WP.capStep], {
        mode: 'walk', carry: 'doc', bubble: text, bubbleType: 'ok',
        onArrive: () => {
          chief.dir = 'up';
          cap.mode = 'done';
          cap.bubble = '수고했어요! ✔';
          cap.bubbleType = 'ok';
          setTimeout(() => {
            sendPath('claude', [WP.capStep, [240, 74]], {
              mode: 'walk', carry: null, bubble: '',
              onArrive: () => {
                chief.dir = 'down';
                chief.mode = 'done';
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
      const chosen = pick.slice(0, 2);
      chosen.forEach((id, idx) => {
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
                  onArrive: () => {
                    npcs[id].dir = CHARS[id].seatDir;
                    npcs[id].mode = 'idle';
                    npcs[id].carry = null;
                  },
                });
              }, 1400);
            },
          });
        }, idx * 900);
      });
    }

    // ---------------------------------------------------------------- 가상 20초 시연(데모)
    function stopDemo() {
      demoTimers.forEach(clearTimeout);
      demoTimers = [];
      isDemo = false;
      modeLabel = '실시간 연동';
      for (const [id, cfg] of Object.entries(CHARS)) {
        Object.assign(npcs[id], {
          x: cfg.home[0], y: cfg.home[1], dir: cfg.seatDir,
          mode: 'idle', bubble: '', carry: null, path: [], progress: null, onArrive: null,
        });
      }
    }

    function runDemo() {
      stopDemo();
      isDemo = true;
      modeLabel = '가상 시연 중';
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
        npcs.agy.progress = 60;
        npcs.claude.bubble = '진행 상황 확인 중…';
      });

      at(5200, () => {
        npcs.finder.progress = null;
        walkReport('finder', '사진 6장 선별 완료!');
      });

      at(7400, () => {
        npcs.agy.progress = 100;
        walkReport('agy', '메뉴 48개·가격 정리 완료!');
      });

      at(9600, () => {
        npcs.polisher.mode = 'work';
        npcs.polisher.bubble = '🌐 5개 언어 번역 중…';
        npcs.polisher.progress = 40;
        npcs.codex.mode = 'work';
        npcs.codex.bubble = '🔎 가격·누락 재대조 중…';
        npcs.codex.progress = 45;
        log('수석 번역관·운영 감찰관 작업 시작');
      });

      at(12200, () => {
        npcs.polisher.progress = 95;
        npcs.codex.progress = 95;
        // 감사관끼리 짧은 회의 연출
        const p1 = routeToMeeting('reviewer', 0);
        const p2 = routeToMeeting('polisher', 1);
        npcs.reviewer.mode = 'work';
        npcs.reviewer.bubble = '✅ 최종 점검 준비 중…';
        sendPath('codex', routeToChief('codex'), {
          mode: 'walk', carry: 'doc', bubble: '가격 대조 이상 없음!', bubbleType: 'ok',
          onArrive: () => {
            sendPath('codex', routeToChief('codex').reverse(), {
              mode: 'walk', onArrive: () => { npcs.codex.mode = 'done'; npcs.codex.dir = 'down'; },
            });
          },
        });
      });

      at(14600, () => {
        npcs.polisher.progress = null;
        walkReport('polisher', '5개 언어 번역 끝!');
        npcs.reviewer.bubble = '✅ 배포 전 점검 통과!';
        npcs.reviewer.bubbleType = 'ok';
      });

      at(17200, () => {
        walkReport('reviewer', '최종 점검 합격!');
      });

      at(19800, () => {
        chiefHandoff('결재 올립니다! (배포 대기)');
      });

      at(23500, () => {
        log('✔ 시연 완료! 실제 지시가 들어오면 이대로 자동 움직입니다.');
        isDemo = false;
        modeLabel = '실시간 연동';
      });
    }

    // ---------------------------------------------------------------- 실제 대시보드 데이터 연동
    function syncReal({ orders = [], jobs = [], collector = null, hr = null, talk = [] } = {}) {
      if (isDemo) return;
      modeLabel = '실시간 연동';

      // 인력 공급팀 보고 배지
      const r = hr?.status === 'ok' && hr.report;
      hrMarks = [];
      if (r) {
        const h = new Date(Date.now() + 7 * 3600e3).getUTCHours();
        if (r.day) hrMarks.push(['ok', '주간 보고 ✔']);
        else if (h >= 9) hrMarks.push(['no', '주간 보고 없음']);
        if (r.night) hrMarks.push(['ok', '야간 보고 ✔']);
        else if (h >= 21) hrMarks.push(['no', '야간 보고 없음']);
      }

      const active = new Map(); // id -> 작업 설명
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

      // 완료(미확인/배포대기) 담당
      const doneSet = new Set();
      const cleared = o => o.deploy?.length ? o.deployState === 'done' : !!o.seenAt;
      for (const o of orders.filter(o => o.status === 'done' && !cleared(o))) {
        (o.worked || []).forEach(d => doneSet.add(d));
      }

      // 새로 보고가 올라온 담당은 걷기 트리거
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

      // 지시가 방금 끝났으면 비서실장 결재 전달
      const latestDone = orders.find(o => o.status === 'done' && !cleared(o));
      if (latestDone && prevDoneOrder && latestDone.id !== prevDoneOrder && !runningOrders.length) {
        chiefHandoff('결재 올립니다!');
      }
      if (latestDone) prevDoneOrder = latestDone.id;
      prevActive = new Set(active.keys());

      // 자리 상태 반영 (걷는 중인 캐릭터는 방해하지 않음)
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

      // 전원 대기 중일 때 가끔(28초마다) 한 명이 커피를 마시러 다녀와 살아 있는 느낌 유지
      const now = Date.now();
      if (!active.size && now - lastCoffeeAt > 28000) {
        lastCoffeeAt = now;
        const idleIds = Object.keys(CHARS).filter(id => id !== 'captain' && id !== 'claude' && npcs[id].mode === 'idle');
        if (idleIds.length) coffeeStroll([idleIds[Math.floor(Math.random() * idleIds.length)]]);
      }
    }

    // ---------------------------------------------------------------- 프레임 루프 (60fps)
    let lastTs = performance.now();
    let rafId = 0;

    function tick(now) {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      const t = now / 1000;

      // 1. 이동 업데이트
      for (const n of Object.values(npcs)) {
        if (!n.path.length) continue;
        const [tx, ty] = n.path[0];
        const dx = tx - n.x, dy = ty - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist <= n.speed * dt + 0.5) {
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
          n.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
        }
      }

      // 2. 캔버스 그리기
      ctx.drawImage(staticMap, 0, 0);

      // 커피 머신 김 애니메이션
      const stY = 26 - (Math.floor(t * 5) % 4);
      px(ctx, 26, stY, 2, 2, 'rgba(255,255,255,0.7)');
      px(ctx, 29, stY - 2, 2, 2, 'rgba(255,255,255,0.5)');

      // 선별팀 컨베이어 벨트
      drawConveyor(ctx, t);

      // 화분 (앞뒤 깊이감)
      drawPlant(ctx, 166, 46, t);
      drawPlant(ctx, 314, 46, t);
      drawPlant(ctx, 140, 114, t);
      drawPlant(ctx, 340, 114, t);
      drawPlant(ctx, 140, 204, t);
      drawPlant(ctx, 340, 204, t);

      // 책상 + 캐릭터 Y좌표 정렬(깊이감: 위쪽 사람 → 아래쪽 책상 → 아래쪽 사람)
      const desks = [
        { x: 212, y: 76, w: 56, id: 'claude', extra: 'papers' },
        { x: 58,  y: 138, w: 56, id: 'finder', extra: 'camera' },
        { x: 178, y: 138, w: 52, id: 'agy', extra: 'papers' },
        { x: 250, y: 138, w: 52, id: 'menu-reader', extra: 'papers' },
        { x: 342, y: 138, w: 52, id: 'codex', extra: 'books' },
        { x: 404, y: 138, w: 52, id: 'reviewer', extra: 'papers' },
        { x: 58,  y: 228, w: 56, id: 'polisher', extra: 'flags' },
        { x: 212, y: 228, w: 56, id: 'staffing', extra: 'calendar' },
        { x: 350, y: 228, w: 56, id: 'sorting', extra: 'papers' },
      ];

      const renderables = [];
      for (const d of desks) renderables.push({ y: d.y + 4, fn: () => drawDesk(ctx, d.x, d.y, d.w, npcs[d.id].mode === 'work', t, d.extra) });
      for (const n of Object.values(npcs)) renderables.push({ y: n.y, fn: () => drawChar(ctx, n, t) });
      renderables.sort((a, b) => a.y - b.y);
      renderables.forEach(r => r.fn());

      // 3. 선명한 한국어 HUD 위치·내용 업데이트
      let workingCount = 0;
      for (const [id, n] of Object.entries(npcs)) {
        if (n.mode === 'work' || n.mode === 'walk') workingCount++;
        const tag = tagEls[id];
        const bub = bubEls[id];
        tag.style.left = `${(n.x / W) * 100}%`;
        tag.style.top = `${((n.y + 9) / H) * 100}%`;
        tag.className = 'og-tag' + (n.mode === 'work' ? ' work' : n.mode === 'done' ? ' done' : n.mode === 'walk' ? ' walk' : '');
        const sub = tag.querySelector('small');
        sub.textContent = n.mode === 'work' ? '작업 중…' : n.mode === 'walk' ? '이동 중' : n.mode === 'done' ? '✔ 작업 완료' : CHARS[id].role;

        if (n.bubble) {
          bub.hidden = false;
          bub.style.left = `${(n.x / W) * 100}%`;
          bub.style.top = `${((n.y - 19) / H) * 100}%`;
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

    // 4. 캐릭터 클릭 감지 (기존 대시보드 옆 창 열기와 그대로 호환)
    canvas.addEventListener('click', e => {
      const rect = canvas.getBoundingClientRect();
      const cx = ((e.clientX - rect.left) / rect.width) * W;
      const cy = ((e.clientY - rect.top) / rect.height) * H;
      let hit = null, best = 24;
      for (const n of Object.values(npcs)) {
        const d = Math.hypot(cx - n.x, cy - (n.y - 6));
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
