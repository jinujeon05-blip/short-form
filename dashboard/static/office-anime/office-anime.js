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
    vip_jung:   { name: '정은수 대표님', role: 'NANA VINA · VIP', guest: true, home: [50.0, 96.5], standPos: [50.0, 96.5], facing: 'back', scale: 1.0, seat: null },
  };

  // 신관 대회의실 6석 실측 착석 좌표 (상단 창틀로 올린 새 대회의실 기준 — 배포 대기 중 6명 자동 회의 연출!)
  // 윗줄(앞모습): 시각정보비서 · 비서실장 · 수석번역관 / 아랫줄(뒷모습): 운영감찰관 · 데이터감사관 · 자료해석비서
  const CONF_SEATS = {
    finder:     { x: 143.7, y: 23.0, headTopY: 14.8, clipY: 21.2, h: 215, facing: 'front', stand: [134.0, 32.0] },
    claude:     { x: 150.6, y: 23.0, headTopY: 14.8, clipY: 21.2, h: 215, facing: 'front', stand: [136.0, 32.0] },
    translator: { x: 157.5, y: 23.0, headTopY: 14.8, clipY: 21.2, h: 215, facing: 'front', stand: [138.0, 32.0] },
    inspector:  { x: 143.1, y: 31.2, headTopY: 19.3, clipY: 28.4, h: 205, facing: 'back',  stand: [143.1, 33.5] },
    auditor:    { x: 150.5, y: 31.2, headTopY: 19.6, clipY: 28.5, h: 205, facing: 'back',  stand: [150.5, 33.5] },
    reader:     { x: 158.0, y: 31.2, headTopY: 19.5, clipY: 28.5, h: 205, facing: 'back',  stand: [158.0, 33.5] },
  };
  const CONF_IDS = ['finder', 'claude', 'translator', 'inspector', 'auditor', 'reader'];

  // Y-깊이(앞/뒤 가림) 전경 가구 목록 (7개 방 모든 책상·의자 완비!):
  // 캐릭터의 발 위치(y)가 sortY보다 위(뒤)면 가구가 다리를 가리고, 아래(앞)면 캐릭터가 가구 앞에 서게 됨!
  const PROPS = [
    { key: 'captain-desk',       x0: 42.77, y0: 12.26, x1: 57.78, y1: 22.01, sortY: 21.62 },
    { key: 'claude-chair',       x0: 47.87, y0: 27.62, x1: 52.13, y1: 32.38, sortY: 31.50 },
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
    // 신관 대회의실 윗줄 의자 3개 등받이 마스크 (뒤쪽 통로 통과 시 다리가 의자 뒤로 자연스럽게 가려짐! 착석자 y=23.0은 앞쪽에 그려짐)
    { key: 'conf-top-chair-1',   x0: 142.02, y0: 17.88, x1: 145.45, y1: 21.09, sortY: 21.60 },
    { key: 'conf-top-chair-2',   x0: 148.97, y0: 17.84, x1: 152.30, y1: 21.09, sortY: 21.60 },
    { key: 'conf-top-chair-3',   x0: 155.76, y0: 17.88, x1: 159.21, y1: 21.09, sortY: 21.60 },
    // 신관 대회의실 아랫줄 의자 3개 전경 마스크 (운영감찰관·데이터감사관·자료해석비서가 등받이 안쪽에 자연스럽게 착석!)
    { key: 'conf-chair-1',       x0: 140.90, y0: 23.20, x1: 145.40, y1: 31.80, sortY: 31.60 },
    { key: 'conf-chair-2',       x0: 148.20, y0: 23.40, x1: 152.80, y1: 31.80, sortY: 31.60 },
    { key: 'conf-chair-3',       x0: 155.70, y0: 23.40, x1: 160.30, y1: 31.80, sortY: 31.60 },
  ];

  const SIGNS = [
    { text: '미디어 관제실',     x: 14.5, y: 23.9, bg: '#15803d' },
    { text: '디지털 메뉴 통제실', x: 85.0, y: 23.9, bg: '#dc2626' },
    { text: '감사실',           x: 11.5, y: 49.3, bg: '#7c3aed' },
    { text: '통번역 통제실',     x: 36.8, y: 49.4, bg: '#2563eb' },
    { text: '인력 공급팀',       x: 63.6, y: 49.4, bg: '#0284c7' },
    { text: '선별팀',           x: 88.5, y: 49.4, bg: '#ea580c' },
    // 오른쪽 4K 신관(x 100~200): 대회의실·VIP 접견실, 복싱 짐, 직원 휴게실
    { text: '대회의실 · VIP 접견실', x: 158.0, y: 10.6, bg: '#0f766e' },
    { text: '트레이닝 · 복싱 짐',    x: 124.0, y: 49.4, bg: '#b91c1c' },
    { text: '직원 휴게실 · 라운지',  x: 176.0, y: 49.4, bg: '#059669' },
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
    // 실패한 그림은 3번까지 다시 받음(https 주소에서 한꺼번에 요청하다 일부가 끊겨 캐릭터가 사라진 건, 2026-11-27)
    const load = (obj, k, url, tries = 0) => new Promise(res => {
      const im = new Image();
      im.onload = () => { obj[k] = im; res(); };
      im.onerror = () => {
        if (tries >= 3) return res();
        setTimeout(() => load(obj, k, url, tries + 1).then(res), 600 * (tries + 1) + Math.random() * 400);
      };
      im.src = url;
    });
    const TV_STORES = [
      { slug: 'kimshotel',      name: '킴스호텔',     sub: '박닌 · 호텔·한식' },
      { slug: 'chibaengi',      name: '치뱅이 본점',   sub: '박닌 · 치킨·호프' },
      { slug: 'phothin',        name: '퍼틴 미딩점',   sub: '하노이 · 쌀국수' },
      { slug: 'jinmi',          name: '진미식당',     sub: '박닌 · 한식·찌개' },
      { slug: 'bacninhbanjeom', name: '박닌반점',     sub: '박닌 · 중화요리' },
      { slug: 'chibaengimin',   name: '치뱅이&민짬뽕', sub: '하노이 · 치킨·짬뽕' },
      { slug: 'sutkkui',        name: '숯꾸이',       sub: '박닌 · 숯불구이' },
      { slug: 'gamasot',        name: '가마솥',       sub: '하노이 · 한식당' },
      { slug: 'eros',           name: 'EROS 바',      sub: '라운지 · 칵테일' },
      { slug: 'anvoi',          name: 'Ăn Vội',       sub: '꽝응아이 · 비빔면' },
      { slug: 'baekcheon',      name: '백천화덕아나고', sub: '경산 · 화덕아나고' },
      { slug: 'biobeauty',      name: '바이오&뷰티',   sub: 'K-뷰티 · 화장품' },
    ];
    imgs.tv = {};
    const jobs = [
      load(imgs, 'bg', '/static/office-anime/assets/bg-office.webp?v=hq4k9'),
      load(imgs, 'bgRight', '/static/office-anime/assets/bg-office-right.webp?v=wing6'),
      load(imgs, 'punchBag', '/static/office-anime/assets/masks/punching-bag.webp?v=wing2'),
      ...TV_STORES.map(st => load(imgs.tv, st.slug, `/static/office-anime/assets/tv/${st.slug}.webp?v=tv2`)),
    ];
    imgs.tvStores = TV_STORES;
    for (const [id, cfg] of Object.entries(CHARS)) {
      imgs.walk[id] = { east: [], front: [], back: [], se: [], ne: [], greet: [], coffee: [], kick: [], praise: [], stamp: [], water: [], clean: [], dance: [], sweep: [], brew: [], carry: [], serve: [], bow: [], sideBow: [], photo: [], review: [], inspect: [], analyze: [], cheer: [], stretch: [], talk: [], thumb: [] };
      const dirs = id === 'captain' ? ['east', 'front', 'back', 'se', 'ne', 'greet', 'coffee', 'kick', 'praise', 'stamp']
        : id === 'claude' ? ['east', 'front', 'back', 'bow', 'sweep']
        : id === 'reader' ? ['east', 'front', 'back', 'se', 'ne', 'dance']
        : id === 'sorter' ? ['east', 'front', 'back', 'water']
        : id === 'staffing' ? ['east', 'front', 'back', 'clean']
        : id === 'inspector' ? ['east', 'front', 'back', 'se', 'ne', 'dance', 'brew', 'carry', 'serve']
        : id === 'vip_jung' ? ['east', 'front', 'back', 'greet', 'coffee', 'talk', 'thumb']
        : ['east', 'front', 'back'];
      const assetId = cfg.asset || id;
      for (const dir of dirs) {
        for (let i = 1; i <= 12; i++) {
          const v = (id === 'claude' && dir === 'bow') ? 'bow2' : (id === 'claude' || id === 'inspector') ? 'swap1' : (id === 'vip_jung') ? 'vip3' : (dir === 'praise' || dir === 'stamp' || dir === 'bow') ? 'new2' : id === 'captain' ? (dir === 'kick' ? 'kick2' : 'cap8dir2') : (dir === 'brew' || dir === 'carry' || dir === 'serve') ? 'cof3' : (dir === 'se' || dir === 'ne') ? 'diag1' : (dir === 'water' || dir === 'clean' || dir === 'dance' || dir === 'sweep') ? 'act3' : ((id === 'translator' && dir === 'east') || (id === 'sorter' && (dir === 'east' || dir === 'back'))) ? 'fix26' : 'orig2k';
          jobs.push(load(imgs.walk[id][dir], i - 1, `/static/office-anime/assets/walk/${assetId}-${dir}-${i}.webp?v=${v}_df4`));
        }
      }
      // 캡틴 주먹 격투(복싱 연속 공격) 15프레임 + 화랑 스타일 태권도 10단 콤보 48프레임!
      if (id === 'captain') {
        imgs.walk[id].punch = [];
        for (let i = 1; i <= 15; i++) jobs.push(load(imgs.walk[id].punch, i - 1, `/static/office-anime/assets/walk/captain-punch-${i}.webp?v=punch1_df3`));
        imgs.walk[id].combo = [];
        for (let i = 1; i <= 48; i++) jobs.push(load(imgs.walk[id].combo, i - 1, `/static/office-anime/assets/walk/captain-combo-${i}.webp?v=combo2`));
        imgs.walk[id].baek = [];
        for (let i = 1; i <= 48; i++) jobs.push(load(imgs.walk[id].baek, i - 1, `/static/office-anime/assets/walk/captain-baek-${i}.webp?v=baek1`));
      }
      // 전 캐릭터 11명(캡틴·직원 9명·정은수 대표님) 신관 ChatGPT 12컷(소파 정면4·측면4·음료2·스낵2)!
      const lngV = (id === 'claude' || id === 'inspector') ? 'swap1' : 'lng3';
      imgs.walk[id].sofa_front = [];
      for (let i = 1; i <= 4; i++) jobs.push(load(imgs.walk[id].sofa_front, i - 1, `/static/office-anime/assets/walk/${assetId}-sofa_front-${i}.webp?v=${lngV}`));
      imgs.walk[id].sofa_left = [];
      for (let i = 1; i <= 4; i++) jobs.push(load(imgs.walk[id].sofa_left, i - 1, `/static/office-anime/assets/walk/${assetId}-sofa_left-${i}.webp?v=${lngV}`));
      imgs.walk[id].drink = [];
      for (let i = 1; i <= 2; i++) jobs.push(load(imgs.walk[id].drink, i - 1, `/static/office-anime/assets/walk/${assetId}-drink-${i}.webp?v=${lngV}`));
      imgs.walk[id].snack = [];
      for (let i = 1; i <= 2; i++) jobs.push(load(imgs.walk[id].snack, i - 1, `/static/office-anime/assets/walk/${assetId}-snack-${i}.webp?v=${lngV}`));
      // 전 직원(캡틴·외부 손님 제외) 9명 정중 인사 12프레임 로드 (id 기준 파일명 — reader↔auditor 일치!)
      if (id !== 'captain' && id !== 'claude' && !cfg.guest) {
        const bowV = (id === 'inspector') ? 'bow2' : 'bow1_df3';
        for (let i = 1; i <= 12; i++) jobs.push(load(imgs.walk[id].bow, i - 1, `/static/office-anime/assets/walk/${id}-bow-${i}.webp?v=${bowV}`));
      }
      // 운영 감찰관 옆으로 정중 인사 12프레임 (정은수 대표님 대화 후 전용; 보고해는 뒷모습 bow 사용)
      if (id === 'inspector') {
        for (let i = 1; i <= 12; i++) jobs.push(load(imgs.walk[id].sideBow, i - 1, `/static/office-anime/assets/walk/inspector-sidebow-${i}.webp?v=bow2`));
      }
      // 시각 정보 비서 스튜디오 카메라 촬영 12프레임
      if (id === 'finder') {
        for (let i = 1; i <= 12; i++) jobs.push(load(imgs.walk[id].photo, i - 1, `/static/office-anime/assets/walk/finder-photo-${i}.webp?v=bow1_df3`));
      }
      // 수석 번역관(review)·메뉴 검사관(inspect)·자료 해석 비서 4종(analyze/cheer/coffee/stretch) 특기 동작 12프레임
      if (id === 'translator') {
        for (let i = 1; i <= 12; i++) jobs.push(load(imgs.walk[id].review, i - 1, `/static/office-anime/assets/walk/translator-review-${i}.webp?v=act4_df3`));
      }
      if (id === 'agy') {
        for (let i = 1; i <= 12; i++) jobs.push(load(imgs.walk[id].inspect, i - 1, `/static/office-anime/assets/walk/agy-inspect-${i}.webp?v=act4_df3`));
      }
      if (id === 'reader') {
        for (const act of ['analyze', 'cheer', 'coffee', 'stretch']) {
          for (let i = 1; i <= 12; i++) jobs.push(load(imgs.walk[id][act], i - 1, `/static/office-anime/assets/walk/reader-${act}-${i}.webp?v=act4_df3`));
        }
      }
      // 전 직원 10명 책상 맞춤 앉은 업무 동작(외부 손님 제외)
      if (!cfg.guest) {
        imgs.walk[id].seat = [];
        const seatCnt = (id === 'claude') ? 24 : (id === 'staffing') ? 8 : 4;
        const seatV = (id === 'claude') ? 'seatvid1' : (id === 'inspector') ? 'swap1' : 'seat2_df3';
        for (let i = 1; i <= seatCnt; i++) jobs.push(load(imgs.walk[id].seat, i - 1, `/static/office-anime/assets/walk/${id}-seat-${i}.webp?v=${seatV}`));
      }
      // 비서실장 댄스 36프레임 (구 운영감찰관 캐릭터 교체 반영!)
      if (id === 'claude') {
        imgs.walk[id].dance = [];
        for (let i = 1; i <= 36; i++) jobs.push(load(imgs.walk[id].dance, i - 1, `/static/office-anime/assets/walk/claude-dance-${i}.webp?v=swap1`));
      }
      // 운영 감찰관 구 책상 업무(백업 유지)
      if (id === 'inspector') {
        imgs.walk[id].write = [];
        for (let i = 1; i <= 12; i++) jobs.push(load(imgs.walk[id].write, i - 1, `/static/office-anime/assets/walk/inspector-write-${i}.webp?v=swap1`));
      }
    }
    for (const p of PROPS) {
      jobs.push(load(imgs.masks, p.key, `/static/office-anime/assets/masks/${p.key}.webp?v=hq4k3`));
    }
    // 📱 폰 앱(안드로이드 크롬)에서 캐릭터가 사라지는 문제(2026-11-27): 3996×2248 배경 2장(풀면 장당 약 36MB)을
    // 매 프레임 <img> 그대로 그리면 브라우저 그림 풀기 공간(디코드 캐시)이 넘쳐, 뒤에 그리는 캐릭터 그림이 빠짐.
    // → 배경은 미리 풀어 둔 ImageBitmap으로 바꿔 캐시를 쓰지 않게 함(실패하면 원래 그림 그대로).
    const toBitmap = async key => {
      const im = imgs[key];
      if (!im || typeof createImageBitmap !== 'function') return;
      try { imgs[key] = await createImageBitmap(im); } catch {}
    };
    return Promise.all(jobs)
      .then(() => Promise.all([toBitmap('bg'), toBitmap('bgRight')]))
      .then(() => imgs);
  }

  // 게임 안 글자에서 이모지 빼기(캡틴 지시 2026-11-27)
  const EMOJI_RE = /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{FE0F}\u{200D}\u{20E3}]/gu;
  const noEmoji = t => String(t || '').replace(EMOJI_RE, '').replace(/^\s+/, '').replace(/\s{2,}/g, ' ');

  function create(root, opts = {}) {
    let realBusySet = new Set(); // 대시보드에서 실제로 일하는 중인 직원(syncReal이 채움) — 위쪽 함수들이 먼저 쓰므로 맨 앞에 둠
    const DOCK_IDS = ['claude', 'finder', 'agy', 'reader', 'inspector', 'auditor', 'translator', 'staffing', 'sorter'];
    const DOCK_SHORT = { claude: '비서', finder: '시각', agy: '검사', reader: '해석', inspector: '감찰', auditor: '감사', translator: '번역', staffing: '인력', sorter: '선별' };
    const dockHtml = DOCK_IDS.map(id => {
      const c = CHARS[id];
      return `<button type="button" class="oa-dock-btn" data-dock="${id}" title="${c.name}(${c.role}) 캡틴 앞으로 호출">
        <img src="/static/office-anime/assets/portraits/${c.asset || id}.webp?v=swap2" alt="${c.name}">
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
            <button type="button" class="oa-cam-btn oa-menu-btn" data-menu-btn title="메뉴 펼치기/접기" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg><span>메뉴</span></button>
            <span class="oa-rpg-pill" data-rpg-stat>👑 <b>Lv.1</b> 캡틴 · 퀘스트 <span class="oa-rpg-qcnt zero" data-qcnt>0</span></span>
            <button type="button" class="oa-cam-btn on" data-cam-btn title="게임 카메라(캡틴 확대 추적) / 전체 보기 전환">🗺 전체 보기</button>
            <button type="button" class="oa-cam-btn" data-wing-btn title="오른쪽 신관(복싱짐·회의실·휴게실) ↔ 본관 이동">🥊 신관·복싱짐</button>
            <button type="button" class="oa-cam-btn" data-relax-btn title="신관 회의실 의자 · VIP 소파 · 휴게실 소파 · 냉장고 음료 순회 체험">🛋️ 휴식·음료</button>
          </div>
          <div class="oa-snd-bar">
            <button type="button" class="oa-snd-btn on" data-sfx-btn title="게임 효과음 켜기/끄기">🔊 효과음</button>
            <button type="button" class="oa-snd-btn" data-bgm-btn title="사무실 BGM 켜기/끄기">🎵 BGM</button>
          </div>
          <div class="oa-dock" data-dock-bar aria-label="직원 빠른 호출">${dockHtml}</div>
          <div class="oa-ctrl-hint">🎮 WASD·방향키 이동 · 바닥 클릭 · 1 인사 · 3 발차기 · 4 주먹 · 7 화랑 · 8 백두산</div>
          <div class="oa-skills" aria-label="액션 스킬창">
            <button type="button" class="oa-sk sk-cof" data-brief-cof title="비서실장 커피 서빙">
              <i class="oa-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v3M10 2v3M14 2v3"/></svg></i>
              <span>서빙</span>
            </button>
            <button type="button" class="oa-sk sk-dance" data-brief-dance title="운영 감찰관·자료해석 합동 댄스">
              <i class="oa-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></i>
              <span>댄스</span>
            </button>
            <button type="button" class="oa-sk sk-solo" data-inspector-dance title="비서실장 솔로 댄스 (전용 BGM)">
              <i class="oa-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></i>
              <span>솔로</span>
            </button>
            <button type="button" class="oa-sk sk-combo" data-cap-combo title="캡틴 화랑 태권도 10단 콤보(7)">
              <em class="oa-key">7</em>
              <i class="oa-ico"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.7 2.3c.6 2.8-1 4.6-2.4 6.1-1.3 1.4-2.3 2.7-2.3 4.6a4 4 0 0 0 8 0c0-1.4-.6-2.7-1.5-3.7 1.9.7 4.5 2.7 4.5 6.2a7 7 0 1 1-14 0c0-4.2 3.1-7.4 5.4-9.8 1.2-1.2 2-2.2 2.3-3.4Z"/></svg></i>
              <span>10콤보</span>
            </button>
            <button type="button" class="oa-sk sk-kick" data-cap-kick title="캡틴 태권도 발차기 시범(3)">
              <em class="oa-key">3</em>
              <i class="oa-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg></i>
              <span>발차기</span>
            </button>
            <button type="button" class="oa-sk sk-punch" data-cap-punch title="캡틴 주먹 격투 연속 공격(4)">
              <em class="oa-key">4</em>
              <i class="oa-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V7a2 2 0 0 0-4 0v3"/><path d="M14 10V5a2 2 0 0 0-4 0v5"/><path d="M10 10V6a2 2 0 0 0-4 0v8a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6v-3a2 2 0 0 0-2-2h-2"/></svg></i>
              <span>주먹</span>
            </button>
            <button type="button" class="oa-sk sk-greet" data-cap-greet title="캡틴 격려 인사(1)">
              <em class="oa-key">1</em>
              <i class="oa-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11V6a2 2 0 0 1 4 0v3"/><path d="M11 9V4a2 2 0 0 1 4 0v5"/><path d="M15 9V6a2 2 0 0 1 4 0v8a7 7 0 0 1-7 7h-1a7 7 0 0 1-6.5-4.4L3.2 13a2 2 0 0 1 3.4-2.1L7 11.5"/></svg></i>
              <span>인사</span>
            </button>
            <button type="button" class="oa-sk sk-main start" data-brief-start title="전 직원 단상 앞 보고">
              <i class="oa-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg></i>
              <span>보고해</span>
            </button>
            <button type="button" class="oa-sk sk-main stop" data-brief-stop hidden title="보고 종료 및 해산">
              <i class="oa-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/></svg></i>
              <span>종료</span>
            </button>
          </div>
          <button type="button" class="oa-fs-btn" title="전체화면 전환">⛶ 전체화면</button>
          <div class="oa-modal-back" hidden><div class="oa-modal"></div></div>
        </div>
      </div>`;
    const stage = root.querySelector('.oa-stage');
    // 가-1(캡틴 2026-11-27): 칩·소리·안내·액션 버튼은 '메뉴' 하나에 접어 둠(평소엔 직원 얼굴 줄·전체화면만)
    const menuBtn = root.querySelector('[data-menu-btn]');
    const setMenu = open => {
      stage.classList.toggle('oa-menu-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.querySelector('span').textContent = open ? '접기' : '메뉴';
      try { localStorage.setItem('oa_menu_open', open ? '1' : ''); } catch {}
    };
    // 메뉴 안 칩·소리·안내 글에서도 이모지 빼기(글이 나중에 바뀌어도)
    for (const sel of ['.oa-rpg-hud', '.oa-snd-bar', '.oa-ctrl-hint']) {
      const el = root.querySelector(sel);
      if (!el) continue;
      stripEmoji(el);
      new MutationObserver(() => stripEmoji(el)).observe(el, { childList: true, subtree: true, characterData: true });
    }
    let menuInit = false;
    try { menuInit = localStorage.getItem('oa_menu_open') === '1'; } catch {}
    setMenu(menuInit);
    menuBtn.addEventListener('click', e => { e.stopPropagation(); setMenu(!stage.classList.contains('oa-menu-open')); });
    const camEl = root.querySelector('[data-cam]');
    const camBtn = root.querySelector('[data-cam-btn]');
    const wingBtn = root.querySelector('[data-wing-btn]');
    const relaxBtn = root.querySelector('[data-relax-btn]');
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
    function setCamMode(mode) {
      if (camMode === mode) return;
      camMode = mode;
      if (camBtn) {
        camBtn.classList.toggle('on', camMode === 'follow');
        camBtn.textContent = camMode === 'follow' ? '🗺 전체 보기' : '🎥 추적 카메라';
      }
      SFX.tap();
    }
    camBtn?.addEventListener('click', () => {
      setCamMode(camMode === 'follow' ? 'overview' : 'follow');
    });
    // 마우스 가운데 휠로 전체 보기 ↔ 추적 카메라 전환 (위로 굴리면 추적 카메라, 아래로 굴리면 전체 보기)
    let wheelCamLock = 0;
    stage.addEventListener('wheel', e => {
      if (!modalBack.hidden || briefingActive) return;
      if (Math.abs(e.deltaY) < 4) return;
      e.preventDefault();
      const now = performance.now();
      if (now - wheelCamLock < 200) return;
      wheelCamLock = now;
      setCamMode(e.deltaY < 0 ? 'follow' : 'overview');
    }, { passive: false });
    // 🛋️ 캡틴 신관 인터랙티브 착석·음료 스팟 (회의실 의자 · 상단 VIP 소파 · 휴게실 위/오른쪽 소파 · 스낵바/냉장고!)
    const CAP_SPOTS = [
      { id: 'conf_mid',        kind: 'seat',  name: '대회의실 의자',      x: 150.6, y: 23.0, headTopY: 14.5, clipY: 21.2, h: 225, facing: 'front', stand: [150.6, 33.5], box: [138, 16, 163, 25], say: '📋 대회의실 자리에서 브리핑 준비 중…' },
      { id: 'vip_sofa',        kind: 'seat',  pose: 'sofa_front', name: 'VIP 접견실 소파',    x: 177.5, y: 24.0, headTopY: 13.8, clipY: 23.8, h: 162, facing: 'front', stand: [177.5, 32.5], box: [169, 15, 186, 25], say: '🛋️ VIP 접견실 소파에서 여유롭게 휴식 중…' },
      { id: 'lounge_top_sofa', kind: 'seat',  pose: 'sofa_front', name: '휴게실 위쪽 소파',   x: 164.5, y: 69.5, headTopY: 58.8, clipY: 69.2, h: 158, facing: 'front', stand: [173.5, 69.5], box: [158, 61, 171, 70], say: '☕ 휴게실 소파에 앉아 잠깐 쉬는 중…' },
      { id: 'lounge_r_sofa',   kind: 'seat',  pose: 'sofa_left',  name: '휴게실 오른쪽 소파', x: 192.7, y: 76.0, headTopY: 64.6, clipY: 100.0, h: 168, facing: 'west',  stand: [189.2, 81.5], box: [190, 67, 198, 82], say: '🛋️ 휴게실 창가 소파에서 다리 꼬고 휴식 중…' },
      { id: 'lounge_fridge',   kind: 'drink', emote: 'drink',     name: '휴게실 음료 냉장고', x: 186.0, y: 68.4, facing: 'front', stand: [186.0, 68.4], box: [183, 54, 189, 68], say: '🥤 냉장고에서 시원한 캔 음료 꺼내 마시는 중!' },
      { id: 'lounge_snack',    kind: 'drink', emote: 'snack',     name: '휴게실 스낵바',      x: 176.5, y: 68.4, facing: 'front', stand: [176.5, 68.4], box: [170, 54, 183, 68], say: '☕ 스낵바에서 간식이랑 커피 챙기는 중!' },
    ];
    let relaxIdx = 0;
    function goCaptainSpot(sp) {
      if (!sp) return;
      touchCaptainInput();
      const cap = npcs.captain;
      const finishSpot = () => {
        if (sp.kind === 'seat') {
          cap.x = sp.x; cap.y = sp.y;
          cap.dir = sp.facing;
          cap.mode = 'idle';
          cap.customSeat = sp;
          cap.bubble = sp.say; cap.bubbleType = 'ok';
          SFX.sit();
          spawnBurst(cap.x, cap.y - 6, `🛋️ ${sp.name} 착석!`, 10);
          log(`🛋️ 캡틴이 ${sp.name}에 앉아 휴식합니다.`);
          setTimeout(() => { if (cap.bubble === sp.say) cap.bubble = ''; }, 3600);
        } else {
          cap.dir = 'front';
          cap.mode = 'emote';
          cap.emote = (sp.emote && imgs.walk.captain?.[sp.emote]?.length) ? sp.emote : 'coffee';
          cap.emoteLoop = false;
          cap.emoteStart = performance.now() / 1000;
          cap.emoteUntil = cap.emoteStart + 3.6;
          cap.customSeat = null;
          cap.bubble = sp.say; cap.bubbleType = 'ok';
          SFX.coffee();
          spawnBurst(cap.x, cap.y - 6, `🥤 ${sp.name} 이용! +15 EXP`, 15);
          log(`🥤 캡틴이 ${sp.name}에서 음료를 꺼내 마셨습니다.`);
          setTimeout(() => { if (cap.bubble === sp.say) cap.bubble = ''; }, 3600);
        }
      };
      cap.customSeat = null;
      const ok = walkCaptainSafe(sp.stand[0], sp.stand[1], {
        bubble: `🚶 ${sp.name}(으)로 이동 중…`,
        onArrive: finishSpot,
      });
      if (!ok) finishSpot();
    }
    relaxBtn?.addEventListener('click', () => {
      SFX.tap();
      const sp = CAP_SPOTS[relaxIdx % CAP_SPOTS.length];
      relaxIdx++;
      goCaptainSpot(sp);
    });
    wingBtn?.addEventListener('click', () => {
      SFX.tap();
      touchCaptainInput();
      const cap = npcs.captain;
      if (cap.x < 100) {
        // 신관 복싱짐 샌드백 앞으로 바로 이동!
        const ok = walkCaptainSafe(122.5, 76.0, {
          bubble: '🥊 신관 복싱짐으로 이동!',
          onArrive: () => { cap.mode = 'stand'; cap.dir = 'west'; cap.bubble = '🥊 샌드백 쳐볼까! (3 발차기 · 4 주먹)'; setTimeout(() => { if (cap.bubble.includes('샌드백')) cap.bubble = ''; }, 3000); }
        });
        if (!ok) { cap.x = 122.5; cap.y = 76.0; cap.mode = 'stand'; cap.dir = 'west'; }
      } else {
        // 본관 중앙으로 복귀!
        const ok = walkCaptainSafe(50.0, 29.8, {
          bubble: '🏢 본관으로 복귀!',
          onArrive: () => { cap.mode = 'stand'; cap.dir = 'front'; }
        });
        if (!ok) { cap.x = 50.0; cap.y = 29.8; cap.mode = 'stand'; }
      }
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

    const fsHome = document.createComment('oa-fs-home');
    function updateMobileRotClass() {
      const isActive = !!document.fullscreenElement || fakeFs;
      const isPortraitMobile = (window.innerHeight > window.innerWidth) && (window.innerWidth <= 920);
      if (isActive && fakeFs) {
        if (stage.parentNode && stage.parentNode !== document.body) {
          stage.parentNode.insertBefore(fsHome, stage);
          document.body.appendChild(stage);
        }
      } else if (!isActive && fsHome.parentNode) {
        fsHome.parentNode.insertBefore(stage, fsHome);
        fsHome.remove();
      }
      stage.classList.toggle('oa-fs-rot', isActive && isPortraitMobile);
      stage.classList.toggle('oa-fs-mock', fakeFs && !isPortraitMobile);
      document.documentElement.classList.toggle('oa-fs-lock', isActive && fakeFs);
      document.body.classList.toggle('oa-fs-lock', isActive && fakeFs);
      fsBtn.textContent = isActive ? '✕ 전체화면 닫기' : '⛶ 전체화면';
    }

    async function enterFullscreen() {
      await acquireWakeLock();
      // 모바일 뒤로가기 키를 눌렀을 때 페이지 이탈 대신 전체화면만 닫히게 히스토리 1칸 추가
      if (!fsHistoryPushed) {
        try { history.pushState({ oaFs: 1 }, ''); fsHistoryPushed = true; } catch {}
      }
      let nativeOk = false;
      // 모바일·PC 모두 네이티브 requestFullscreen()을 호출해야 안드로이드 상단 상태바·하단 내비바(주황 테두리)가 숨겨지는 진짜 영상식 전체화면으로 진입함!
      try {
        if (stage.requestFullscreen) {
          await stage.requestFullscreen({ navigationUI: 'hide' }).catch(() => stage.requestFullscreen());
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
    // 📱 크롬 안드로이드(삼성 인터넷은 정상)에서 가만히 두면 캐릭터만 안 그려지는 문제(2026-11-27, v=135 배경 고침으로도 안 됨):
    // 크롬은 그림판을 GPU 프로세스에서 그리며 그림 저장 공간 예산이 작아 캐릭터 그림을 빠뜨림 → 크롬 안드로이드만 CPU 그림판 사용.
    // 시험: 주소 뒤 ?canvas=cpu / ?canvas=gpu 로 강제(그 브라우저에 기억됨).
    // → 진짜 원인은 https 주소에서 그림이 덜 들어온 것(서버 대기 줄)이라 기본은 다시 GPU. 비교 시험용 스위치만 남김.
    const CANVAS_MODE = (() => {
      try {
        const q = new URLSearchParams(location.search).get('canvas');
        if (q === 'cpu' || q === 'gpu') localStorage.setItem('oa_canvas_mode', q);
        const saved = localStorage.getItem('oa_canvas_mode');
        if (saved === 'cpu' || saved === 'gpu') return saved;
      } catch {}
      return 'gpu';
    })();
    const ctx = canvas.getContext('2d', CANVAS_MODE === 'cpu' ? { willReadFrequently: true } : undefined);
    window.__oaCanvasMode = CANVAS_MODE;
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

    // ---- 새로고침 시 캡틴·직원·카메라 위치 유지 (localStorage 자동 저장 & 복원!)
    const POS_KEY = 'jinwoo_oa_pos_v1';
    const restoredResumeQueue = []; // 새로고침 직후 걷던/서 있던 직원들의 움직임을 자연스럽게 이어가기 위한 복원 큐
    function restoreOfficePositions() {
      try {
        const raw = localStorage.getItem(POS_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        if (!data || typeof data !== 'object') return;
        if (data.npcs) {
          for (const [id, sv] of Object.entries(data.npcs)) {
            const n = npcs[id];
            if (!n || !sv || CHARS[id]?.guest) continue;
            const x = Number(sv.x), y = Number(sv.y);
            if (!Number.isFinite(x) || !Number.isFinite(y) || x < 2 || x > 198 || y < 14 || y > 98) continue;
            if (sv.mode === 'conf' && CONF_SEATS[id]) {
              n.x = CONF_SEATS[id].x; n.y = CONF_SEATS[id].y;
              n.mode = 'conf'; n.dir = CONF_SEATS[id].facing;
            } else if (sv.customSeat && Number.isFinite(sv.customSeat.x) && Number.isFinite(sv.customSeat.y)) {
              n.customSeat = sv.customSeat;
              n.x = sv.customSeat.x; n.y = sv.customSeat.y;
              n.mode = 'idle'; n.dir = sv.customSeat.facing || 'front';
              if (id !== 'captain') restoredResumeQueue.push({ id, kind: 'sofa' });
            } else if (sv.mode === 'idle') {
              n.x = CHARS[id].home[0]; n.y = CHARS[id].home[1];
              n.mode = 'idle'; n.dir = CHARS[id].facing;
            } else if (sv.mode === 'walk' && Array.isArray(sv.path) && sv.path.length) {
              n.x = x; n.y = y;
              n.mode = 'stand'; n.dir = sv.dir || CHARS[id].facing;
              restoredResumeQueue.push({ id, kind: 'walk', path: sv.path, bubble: sv.bubble || '' });
            } else {
              n.x = x; n.y = y;
              n.mode = 'stand'; n.dir = sv.dir || CHARS[id].facing;
              if (id !== 'captain') restoredResumeQueue.push({ id, kind: 'return' });
            }
          }
        }
        if (data.cam) {
          if (data.cam.mode === 'overview' || data.cam.mode === 'follow') {
            camMode = data.cam.mode;
            if (camBtn) {
              camBtn.classList.toggle('on', camMode === 'follow');
              camBtn.textContent = camMode === 'follow' ? '🗺 전체 보기' : '🎥 추적 카메라';
            }
          }
          if (Number.isFinite(data.cam.fx)) cam.fx = data.cam.fx;
          if (Number.isFinite(data.cam.fy)) cam.fy = data.cam.fy;
          if (Number.isFinite(data.cam.z)) cam.z = data.cam.z;
        }
      } catch {}
    }
    function saveOfficePositions() {
      try {
        if (briefingActive) return;
        const out = { npcs: {}, cam: { fx: cam.fx, fy: cam.fy, z: cam.z, mode: camMode } };
        for (const [id, n] of Object.entries(npcs)) {
          if (CHARS[id]?.guest) continue;
          const m = (n.mode === 'idle' || n.mode === 'conf' || n.mode === 'walk') ? n.mode : 'stand';
          const rec = { x: Math.round(n.x * 10) / 10, y: Math.round(n.y * 10) / 10, mode: m, dir: n.dir };
          if (n.customSeat) {
            const s = n.customSeat;
            rec.customSeat = { id: s.id, pose: s.pose, x: s.x, y: s.y, headTopY: s.headTopY, clipY: s.clipY, h: s.h, facing: s.facing, stand: s.stand };
          }
          if (m === 'walk' && n.path && n.path.length) {
            rec.path = n.path.map(p => [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10]);
            if (n.bubble) rec.bubble = n.bubble;
          }
          out.npcs[id] = rec;
        }
        localStorage.setItem(POS_KEY, JSON.stringify(out));
      } catch {}
    }
    restoreOfficePositions();
    // 새로고침 후 멈춰 있지 않도록 걷던 경로·소파 휴식·복귀 동선을 자연스럽게 이어서 실행!
    setTimeout(() => {
      restoredResumeQueue.forEach((item, idx) => {
        const n = npcs[item.id];
        if (!n || briefingActive) return;
        if (item.kind === 'walk' && item.path?.length) {
          const pts = item.path.filter(p => Array.isArray(p) && Number.isFinite(p[0]) && Number.isFinite(p[1]));
          if (!pts.length) return;
          if (item.id === 'captain') {
            n.path = pts; n.mode = 'walk'; n.bubble = item.bubble || '';
            n.onArrive = () => { n.mode = 'stand'; n.bubble = ''; };
          } else {
            const dest = pts[pts.length - 1];
            const isHome = Math.hypot(dest[0] - CHARS[item.id].home[0], dest[1] - CHARS[item.id].home[1]) < 3.0;
            n.path = pts; n.mode = 'walk'; n.bubble = item.bubble || '';
            n.onArrive = () => {
              if (briefingActive) return;
              if (isHome) { seatNpc(item.id); return; }
              n.mode = 'stand';
              setTimeout(() => {
                if (briefingActive || (activeTalkNpc && activeTalkNpc.id === item.id)) return;
                walkNpcSafe(item.id, CHARS[item.id].home[0], CHARS[item.id].home[1], {
                  bubble: '', onArrive: () => seatNpc(item.id)
                });
              }, 2200 + Math.random() * 1800);
            };
          }
        } else if (item.kind === 'sofa') {
          setTimeout(() => {
            if (briefingActive || !n.customSeat || (activeTalkNpc && activeTalkNpc.id === item.id)) return;
            walkNpcSafe(item.id, CHARS[item.id].home[0], CHARS[item.id].home[1], {
              bubble: '↩ 휴식 끝! 자리로 복귀해요', onArrive: () => seatNpc(item.id)
            });
          }, 6000 + idx * 1400);
        } else if (item.kind === 'return') {
          setTimeout(() => {
            if (briefingActive || n.mode !== 'stand' || (activeTalkNpc && activeTalkNpc.id === item.id)) return;
            walkNpcSafe(item.id, CHARS[item.id].home[0], CHARS[item.id].home[1], {
              bubble: '', onArrive: () => seatNpc(item.id)
            });
          }, 700 + idx * 450);
        }
      });
    }, 350);
    setInterval(saveOfficePositions, 1500);
    window.addEventListener('beforeunload', saveOfficePositions);
    window.addEventListener('pagehide', saveOfficePositions);

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
      if (!clipRaw[path]) clipRaw[path] = fetch(CLIP_BASE + path + '?v=9').then(r => r.ok ? r.arrayBuffer() : null).catch(() => null);
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
    // 자연스러운 대화 순서 대기열(Voice Queue): 앞사람 말이 끝나야 0.22초 숨 고르기 후 다음 사람이 이어서 말함(말 잘림 방지!)
    let voiceSrc = null, voiceBusy = false, voiceGapTimer = null;
    const voiceQueue = [];
    function clearVoiceQueue(stopCurrent = false) {
      voiceQueue.length = 0;
      if (voiceGapTimer) { clearTimeout(voiceGapTimer); voiceGapTimer = null; }
      if (stopCurrent && voiceSrc) {
        try { voiceSrc.onended = null; voiceSrc.stop(); } catch {}
        voiceSrc = null; voiceBusy = false;
        updateBgmDuck(0.25);
      }
    }
    async function pumpVoiceQueue() {
      if (voiceBusy || !voiceQueue.length) return;
      if (!sfxOn) { clearVoiceQueue(true); return; }
      const next = voiceQueue.shift();
      voiceBusy = true;
      const buf = await getClip(next.path);
      if (!buf || !sfxOn) {
        voiceBusy = false;
        updateBgmDuck(0.25);
        try { next.onEnd?.(); } catch {}
        if (voiceQueue.length && sfxOn) pumpVoiceQueue();
        return;
      }
      const src = await playClip(next.path, 1.0);
      if (!src) {
        voiceBusy = false;
        updateBgmDuck(0.25);
        try { next.onEnd?.(); } catch {}
        if (voiceQueue.length && sfxOn) pumpVoiceQueue();
        return;
      }
      voiceSrc = src;
      updateBgmDuck(0.12);
      src.onended = () => {
        if (voiceSrc === src) voiceSrc = null;
        voiceBusy = false;
        try { next.onEnd?.(); } catch {}
        if (voiceQueue.length && sfxOn) {
          voiceGapTimer = setTimeout(() => { voiceGapTimer = null; pumpVoiceQueue(); }, 220);
        } else {
          updateBgmDuck(0.32);
        }
      };
    }
    const VOICE_KINDS = {
      captain:    ['greet', 'brief', 'end', 'coffee', 'kick', 'punch', 'sit', 'approve', 'order', 'nice', 'walk', 'thanks'],
      claude:     ['call', 'ok', 'done', 'greet', 'greet-vip', 'brief', 'approval', 'work', 'dance', 'sweep', 'chat', 'warn', 'nice', 'hmm', 'rest'],
      inspector:  ['call', 'ok', 'done', 'greet', 'coffee', 'dance', 'brief', 'approval', 'work', 'ok2', 'yay', 'rest', 'greet-vip', 'chat', 'warn', 'hmm'],
      finder:     ['call', 'ok', 'done', 'greet', 'studio', 'work', 'chat', 'snap', 'wow', 'yes'],
      translator: ['call', 'ok', 'done', 'greet', 'chat', 'work', 'fix', 'aha', 'yes', 'rest'],
      staffing:   ['call', 'ok', 'done', 'greet', 'clean', 'report', 'urgent', 'cheer', 'ok2', 'rest'],
      sorter:     ['call', 'ok', 'done', 'greet', 'visit', 'newshop', 'check', 'water', 'oh', 'yay', 'yes', 'rest'],
      reader:     ['call', 'ok', 'done', 'greet', 'work', 'dance', 'chat', 'aha', 'yay', 'hmm'],
      agy:        ['call', 'ok', 'done', 'greet', 'work', 'alert', 'chat', 'yes', 'wow', 'rest'],
      auditor:    ['call', 'ok', 'done', 'greet', 'approve', 'warn', 'chat', 'hmm', 'ok2', 'rest'],
      // NANA VINA 정은수 대표님(Fish Audio 남자 성우, 2026-11-26) — 직원 자리 인사는 그 직원 id로
      vip_jung:   ['arrive', 'greet', 'chat', 'coffee', 'claude', 'finder', 'translator', 'staffing', 'sorter', 'wait', 'bye', 'meeting'],
    };
    const voiceKinds = id => VOICE_KINDS[id] || ['call', 'ok', 'done', 'greet'];
    const VOICE_PICK_MAP = {
      ok:   { inspector: ['ok', 'ok2'], finder: ['ok', 'yes'], translator: ['ok', 'yes'], staffing: ['ok', 'ok2'], sorter: ['ok', 'yes'], agy: ['ok', 'yes'], auditor: ['ok', 'ok2'] },
      done: { claude: ['done', 'nice'], inspector: ['done', 'yay'], finder: ['done', 'snap', 'wow'], translator: ['done', 'aha'], staffing: ['done', 'cheer'], sorter: ['done', 'yay'], reader: ['done', 'yay', 'aha'], agy: ['done', 'wow'], auditor: ['done', 'approve', 'hmm'] },
      call: { sorter: ['call', 'oh'], vip_jung: ['chat'] },
    };
    async function voice(id, kind, delay = 0, optsV = {}) {
      const pool = VOICE_PICK_MAP[kind]?.[id];
      const chosen = pool ? pool[Math.floor(Math.random() * pool.length)] : kind;
      if (!sfxOn || !CHARS[id] || !voiceKinds(id).includes(chosen)) {
        try { optsV.onEnd?.(); } catch {}
        return;
      }
      if (delay) await new Promise(r => setTimeout(r, delay * 1000));
      if (!sfxOn) { try { optsV.onEnd?.(); } catch {} return; }
      const path = `voice/${id}-${chosen}.mp3`;
      if (optsV.interrupt) {
        clearVoiceQueue(true);
      } else {
        // 대기열 과다 누적·동일인 중복 발화 방지 (최대 4건)
        const last = voiceQueue[voiceQueue.length - 1];
        if (last && last.id === id && last.kind === kind) return;
        if (voiceQueue.length >= 4) voiceQueue.shift();
      }
      voiceQueue.push({ id, kind, path, onEnd: optsV.onEnd });
      pumpVoiceQueue();
    }
    // 처음 열 때 파일만 미리 받아 둠(소리 해독은 첫 터치 뒤) — 합쳐서 약 0.6MB
    if (sfxOn) setTimeout(() => {
      ['coffee', 'sit', 'water', 'sweep', 'dance', 'brief', 'send'].forEach(n => fetchClip(`sfx/${n}.mp3`));
      Object.keys(CHARS).filter(id => !CHARS[id].guest).forEach(id => voiceKinds(id).forEach(k => fetchClip(`voice/${id}-${k}.mp3`)));
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
      bagHit:    (heavy = false) => {
        if (!sfxOn) return;
        const c = ensureAudio(); if (!c) return;
        const now = c.currentTime;
        // 묵직한 가죽 샌드백 저음 펀치/킥 임팩트 (퍽!/쾅!)
        const o = c.createOscillator(), g = c.createGain();
        o.type = heavy ? 'sawtooth' : 'triangle';
        o.frequency.setValueAtTime(heavy ? 128 : 155, now);
        o.frequency.exponentialRampToValueAtTime(heavy ? 32 : 46, now + (heavy ? 0.19 : 0.12));
        g.gain.setValueAtTime(0.001, now);
        g.gain.exponentialRampToValueAtTime(heavy ? 0.34 : 0.24, now + 0.008);
        g.gain.exponentialRampToValueAtTime(0.001, now + (heavy ? 0.22 : 0.14));
        const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = heavy ? 420 : 580;
        o.connect(lp); lp.connect(g); g.connect(c.destination);
        o.start(now); o.stop(now + 0.24);
        // 가죽 타격 파열음
        noiseBurst(heavy ? 0.11 : 0.065, heavy ? 0.16 : 0.10, 0);
        if (heavy) tone(520, 0.045, 'square', 0.06, 0.01);
        navigator.vibrate?.(heavy ? [35, 20, 45] : [20]);
      },
      greet:     () => { tone(587.33, 0.09, 'triangle', 0.07); tone(880.0, 0.14, 'triangle', 0.07, 0.08); navigator.vibrate?.(14); },
      coffee:    () => clipOr('coffee', 0.8, () => { tone(1174, 0.07, 'sine', 0.05); tone(1568, 0.09, 'sine', 0.045, 0.07); tone(880, 0.12, 'triangle', 0.05, 0.15); }),
      sit:       () => clipOr('sit', 0.7, () => { tone(260, 0.07, 'triangle', 0.065); tone(196, 0.09, 'sine', 0.05, 0.05); }),
      water:     () => clipOr('water', 0.7, () => { [740, 920, 1120, 880].forEach((f, i) => tone(f, 0.07, 'sine', 0.045, i * 0.075)); }),
      sweep:     () => clipOr('sweep', 0.7, () => { noiseBurst(0.14, 0.032, 0); noiseBurst(0.14, 0.028, 0.22); }),
      stamp:     () => {
        // 묵직한 결재 도장 쾅! 임팩트 사운드
        tone(110, 0.14, 'triangle', 0.22);
        tone(68, 0.18, 'sine', 0.24, 0.02);
        tone(680, 0.06, 'triangle', 0.08, 0.04);
        navigator.vibrate?.([30, 20, 40]);
      },
      praise:    () => {
        // 따뜻한 박수·칭찬 팡파르
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, 0.12, 'triangle', 0.08, i * 0.07));
        navigator.vibrate?.([15, 25, 25]);
      },
      shutter:   () => {
        // 카메라 셔터 "찰칵!" 효과음
        tone(1850, 0.035, 'square', 0.06);
        tone(920, 0.045, 'triangle', 0.08, 0.03);
        tone(2200, 0.03, 'sine', 0.05, 0.055);
      },
      dance:     () => {
        navigator.vibrate?.([15, 20, 15, 20, 30]);
        clipOr('dance', 0.8, () => [587.33, 739.99, 880.0, 1174.66, 1479.98].forEach((f, i) => tone(f, 0.14, 'triangle', 0.085, i * 0.065)));
      },
      step:      () => { tone(190, 0.03, 'sine', 0.018); },
    };

    // 사무실 BGM (2026-11-28 캡틴 지시):
    // - 업무 지시·진행 중(realBusySet.size > 0): '퀘스트-바쁜 업무 모드'(bgm-quest-busy) 자동 반복 재생
    // - 평상시·업무 종료 후(realBusySet.size === 0): '일상업무 모드'(bgm-daily-1) ↔ '일상업무 모드2'(bgm-daily-2) 번갈아 재생
    const BGM_DAILY_TRACKS = ['bgm-daily-1', 'bgm-daily-2'];
    const BGM_BUSY_TRACK = 'bgm-quest-busy';
    const bgmBufs = {};
    let bgmDailyIdx = 0, bgmMode = 'daily', bgmSrc = null, bgmGain = null, bgmSeq = 0;
    let bgmUserMuted = false, lastWorkBusy = false;
    async function loadBgmTrack(c, key) {
      if (bgmBufs[key]) return bgmBufs[key];
      try {
        const res = await fetch(`/static/office-anime/assets/${key}.mp3?v=2`);
        if (!res.ok) return null;
        bgmBufs[key] = await c.decodeAudioData(await res.arrayBuffer());
        return bgmBufs[key];
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
    function getTargetBgmVol() {
      if (document.hidden) return 0.0001;
      if (danceSrc) return 0.05;
      if (voiceSrc) return 0.14; // 직원·캡틴·VIP 목소리 재생 중 BGM 부드럽게 덕킹!
      return 0.42;
    }
    function updateBgmDuck(tc = 0.18) {
      if (!bgmGain || !actx || !bgmOn) return;
      try { bgmGain.gain.setTargetAtTime(getTargetBgmVol(), actx.currentTime, tc); } catch {}
    }
    async function playBgmMode(mode, forceRestart = false) {
      if (!bgmOn) return;
      if (!forceRestart && bgmSrc && bgmMode === mode) return;
      const c = ensureAudio();
      if (!c) return;
      const mySeq = ++bgmSeq;
      bgmMode = mode;
      const key = (mode === 'busy') ? BGM_BUSY_TRACK : BGM_DAILY_TRACKS[bgmDailyIdx % BGM_DAILY_TRACKS.length];
      const buf = await loadBgmTrack(c, key);
      if (!buf || !bgmOn || mySeq !== bgmSeq) return;
      stopBgmNode();
      const src = c.createBufferSource();
      src.buffer = buf;
      src.loop = (mode === 'busy');
      const g = c.createGain();
      const now = c.currentTime;
      const targetVol = getTargetBgmVol();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(targetVol, now + 0.45);
      src.connect(g); g.connect(c.destination);
      if (mode === 'daily') {
        src.onended = () => {
          if (bgmSrc === src && bgmOn && bgmMode === 'daily') {
            bgmDailyIdx = (bgmDailyIdx + 1) % BGM_DAILY_TRACKS.length;
            playBgmMode('daily', true);
          }
        };
      }
      src.start(0);
      bgmSrc = src; bgmGain = g;
      if (bgmBtn) {
        bgmBtn.textContent = mode === 'busy'
          ? '🔥 업무 BGM'
          : `🎵 일상 BGM ${(bgmDailyIdx % BGM_DAILY_TRACKS.length) + 1}`;
      }
    }
    function syncBgmByWork(isBusy) {
      const wantMode = isBusy ? 'busy' : 'daily';
      // 업무 지시 시작(평상시 → 바쁜 업무 전환) 시 사용자가 직접 끈 게 아니면 퀘스트-바쁜 업무 모드 자동 재생!
      if (isBusy && !lastWorkBusy && !bgmOn && !bgmUserMuted) {
        bgmOn = true;
        bgmBtn?.classList.toggle('on', true);
        playBgmMode('busy', true);
      } else if (bgmOn && wantMode !== bgmMode) {
        if (wantMode === 'daily' && bgmMode === 'busy') {
          bgmDailyIdx = (bgmDailyIdx + 1) % BGM_DAILY_TRACKS.length;
        }
        playBgmMode(wantMode, true);
      }
      lastWorkBusy = isBusy;
    }
    function toggleBgm() {
      bgmOn = !bgmOn;
      bgmBtn?.classList.toggle('on', bgmOn);
      if (!bgmOn) {
        bgmUserMuted = true;
        bgmSeq++;
        stopBgmNode();
        if (bgmBtn) bgmBtn.textContent = '🎵 BGM';
        return;
      }
      bgmUserMuted = false;
      playBgmMode(realBusySet.size > 0 ? 'busy' : 'daily', true);
    }
    // 캐릭터별 7.20초 전용 아이돌 댄스 음악 재생 + 재생 중 BGM 자동 덕킹(볼륨 낮춤 → 끝나면 복원)
    const danceBufs = {};
    let danceSrc = null, danceThemeIdx = 0;
    function stopDanceMusic() {
      if (danceSrc) { try { danceSrc.onended = null; danceSrc.stop(); danceSrc.disconnect(); } catch {} danceSrc = null; }
      updateBgmDuck(0.25);
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
        updateBgmDuck(0.28);
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
    let expPushTimer = null;
    function pushRpgExp() {
      clearTimeout(expPushTimer);
      expPushTimer = setTimeout(() => {
        fetch('/api/rpg-exp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Dashboard': '1' },
          body: JSON.stringify({ exp: bonusExp }),
        }).then(r => r.ok ? r.json() : null).then(d => {
          if (d && Number.isFinite(d.exp) && d.exp > bonusExp) {
            bonusExp = d.exp;
            try { localStorage.setItem('jinwoo_oa_exp', String(bonusExp)); } catch {}
            updateRpgHud();
          }
        }).catch(() => {});
      }, 600);
    }
    function pullRpgExp() {
      fetch('/api/rpg-exp').then(r => r.ok ? r.json() : null).then(d => {
        if (!d || !Number.isFinite(d.exp)) return;
        if (d.exp > bonusExp) {
          bonusExp = d.exp;
          try { localStorage.setItem('jinwoo_oa_exp', String(bonusExp)); } catch {}
          updateRpgHud();
        } else if (bonusExp > d.exp) {
          pushRpgExp();
        }
      }).catch(() => {});
    }
    pullRpgExp();
    setInterval(pullRpgExp, 25000);
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
        pushRpgExp();
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
          : c.guest
            ? `<div class="oa-tag oa-tag-vip" data-tag="${id}" hidden><span class="oa-vip-ic">🤝</span><b>${c.name}</b><small>${c.role}</small></div>
               <div class="oa-quest" data-q="${id}" hidden>!</div>
               <div class="oa-bub" data-bub="${id}" hidden></div>`
            : `<div class="oa-tag" data-tag="${id}"><b>${c.name}</b><small>${c.role}</small></div>
               <div class="oa-quest" data-q="${id}" hidden>!</div>
               <div class="oa-bub" data-bub="${id}" hidden></div>`
      ).join('') +
      `<button type="button" class="oa-cap-status" data-cap-status hidden title="캡틴 실시간 업무·결재 상태 (클릭 시 바로 이동)"></button>
       <div class="oa-near-box" data-cap-near hidden></div>
       <div class="oa-cap-hp" data-cap-hp title="클로드 잔여량 · 위: 5시간(녹색) / 아래: 주간(파랑)">
         <div class="oa-hp-track"><div class="oa-hp-fill h5" data-hp-5h style="width:100%"></div></div>
         <div class="oa-hp-track"><div class="oa-hp-fill wk" data-hp-wk style="width:100%"></div></div>
       </div>
       <div class="oa-cap-ring" data-cap-ring>
         <button type="button" class="oa-cr-item i0" data-cr="newshop">🏪 새 가게 제작</button>
         <button type="button" class="oa-cr-item i1" data-cr="praise">👍 직원 칭찬</button>
         <button type="button" class="oa-cr-item i2" data-cr="stamp">🖋️ 결재 도장</button>
         <button type="button" class="oa-cr-item i3" data-cr="sit">🪑 대표석 복귀</button>
       </div>
       <div class="oa-stamp-fx" data-stamp-fx hidden><span>✅ 결재 완료</span></div>
       <div class="oa-flash-fx" data-flash-fx hidden></div>`;
    const stampFxEl = hud.querySelector('[data-stamp-fx]');
    const flashFxEl = hud.querySelector('[data-flash-fx]');
    function triggerCameraFlash() {
      SFX.shutter();
      if (!flashFxEl) return;
      flashFxEl.hidden = false;
      flashFxEl.classList.remove('pop');
      void flashFxEl.offsetWidth;
      flashFxEl.classList.add('pop');
      setTimeout(() => { flashFxEl.hidden = true; flashFxEl.classList.remove('pop'); }, 450);
    }
    const capStatusEl = hud.querySelector('[data-cap-status]');
    const capNearEl = hud.querySelector('[data-cap-near]');
    let nearActions = [];
    let nearSig = '';
    const NEAR_ASK = {
      conf_mid:        '대회의실 의자에 앉기',
      vip_sofa:        'VIP 소파에 앉기',
      lounge_top_sofa: '휴게실 소파에 앉기',
      lounge_r_sofa:   '창가 소파에 앉기',
      lounge_fridge:   '냉장고 캔 음료 마시기',
      lounge_snack:    '스낵바 커피·간식 챙기기',
    };
    function findNearbyCapActions() {
      const cap = npcs.captain;
      if (!cap || briefingActive || !modalBack.hidden || capRingOpen) return [];
      if (cap.mode === 'emote' || (cap.kickUntil && performance.now() / 1000 < cap.kickUntil)) return [];
      const cands = [];
      for (const sp of CAP_SPOTS) {
        if (cap.customSeat && cap.customSeat.id === sp.id) continue;
        const dStand = Math.hypot(cap.x - sp.stand[0], cap.y - sp.stand[1]);
        const dSpot  = Math.hypot(cap.x - sp.x, cap.y - sp.y);
        const d = Math.min(dStand, dSpot);
        const maxR = (sp.kind === 'drink') ? 13.5 : 14.0;
        if (d <= maxR) cands.push({ id: sp.id, d, label: NEAR_ASK[sp.id] || `${sp.name} 이용`, run: () => goCaptainSpot(sp) });
      }
      // 복싱 짐 샌드백 근접 시 3가지 타격 선택지 제공!
      const dBag = Math.hypot(cap.x - BAG.cx, cap.y - BAG.cy);
      if (dBag <= 14.0) {
        cands.push({ id: 'bag_baek',  d: dBag,        label: '샌드백 백두산 10콤보', run: () => playCaptainAction('baek') });
        cands.push({ id: 'bag_combo', d: dBag + 0.01, label: '샌드백 화랑 10콤보',   run: () => playCaptainAction('combo') });
        cands.push({ id: 'bag_punch', d: dBag + 0.02, label: '샌드백 주먹 연타',     run: () => playCaptainAction('punch') });
      }
      // 본관 캡틴 대표석 근접 시 (서 있을 때만)
      if (cap.mode !== 'idle') {
        const dDesk = Math.hypot(cap.x - CHARS.captain.home[0], cap.y - CHARS.captain.home[1]);
        if (dDesk <= 10.0) cands.push({ id: 'cap_desk', d: dDesk, label: '대표석에 앉기', run: () => sitCaptainBack() });
      }
      cands.sort((a, b) => a.d - b.d);
      return cands.slice(0, 3);
    }
    function runNearAction(idx = 0) {
      const item = nearActions[idx];
      if (!item) return;
      SFX.tap();
      const fn = item.run;
      nearActions = [];
      nearSig = '';
      if (capNearEl) capNearEl.hidden = true;
      fn();
    }
    capNearEl?.addEventListener('click', e => {
      e.stopPropagation();
      const btn = e.target.closest('[data-near-i]');
      if (!btn) return;
      runNearAction(Number(btn.dataset.nearI) || 0);
    });
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
      else if (act === 'praise') playCaptainAction('praise');
      else if (act === 'stamp') playCaptainAction('stamp');
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
      n.customSeat = null;
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
      const ins = npcs.inspector, cap = npcs.captain;
      if (!ins || ins.mode === 'walk' || ins.mode === 'emote') return;
      if (realBusySet.has('inspector')) return;
      SFX.coffee();
      log('☕ 운영 감찰관이 커피바에서 커피를 추출해 캡틴께 서빙합니다');
      ins.walkOverride = null;
      walkNpcSafe('inspector', 15.5, 22.0, {
        force: true,
        bubble: '☕ 캡틴 커피 타러 가는 중…',
        onArrive: () => {
          if (briefingActive) return;
          ins.dir = imgs.walk.inspector.brew?.length ? 'back' : 'front';
          ins.mode = 'emote'; ins.emote = imgs.walk.inspector.brew?.length ? 'brew' : 'snack'; ins.emoteLoop = true;
          ins.emoteStart = performance.now() / 1000;
          ins.bubble = '☕ 원두 커피 추출 중…';
          SFX.coffee();
          setTimeout(() => {
            if (briefingActive) return;
            ins.emote = null; ins.emoteLoop = false;
            ins.walkOverride = imgs.walk.inspector.carry?.length ? 'carry' : null;
            sendPath('inspector', safeRoute(ROUTES.cofToCap), {
              bubble: '☕ 캡틴, 커피 가져왔습니다!', bubbleType: 'ok',
              onArrive: () => {
                voice('inspector', 'coffee', 0.1);
                voice('captain', 'thanks', 2.6);
                if (briefingActive) { ins.walkOverride = null; return; }
                ins.walkOverride = null;
                ins.x = 43.0; ins.y = 22.8; // 캡틴 책상 바로 앞 밀착!
                ins.dir = imgs.walk.inspector.serve?.length ? 'east' : 'front';
                ins.mode = 'emote'; ins.emote = imgs.walk.inspector.serve?.length ? 'serve' : 'snack'; ins.emoteLoop = false;
                ins.emoteStart = performance.now() / 1000;
                ins.bubble = '☕ 캡틴, 따뜻한 커피 내려놓았습니다!'; ins.bubbleType = 'ok';
                SFX.coffee();
                setTimeout(() => {
                  cap.bubble = '☕ 고마워요! 잘 마실게요'; cap.bubbleType = 'ok';
                }, 900);
                setTimeout(() => {
                  if (briefingActive) return;
                  ins.emote = null; ins.emoteLoop = false;
                  walkNpcSafe('inspector', CHARS.inspector.home[0], CHARS.inspector.home[1], {
                    bubble: '',
                    onArrive: () => {
                      seatNpc('inspector');
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
      if (n.hidden) return;
      const cfg = CHARS[n.id];
      const wset = imgs.walk[n.id];
      if (!wset) return;
      const walking = (n.mode === 'walk');
      const fightKey = (n.fightKind === 'baek') ? 'baek' : (n.fightKind === 'combo') ? 'combo' : (n.fightKind === 'punch') ? 'punch' : 'kick'; // 발차기·주먹·화랑/백두산 10단 콤보
      const kicking = (n.id === 'captain' && n.kickUntil && t < n.kickUntil && wset[fightKey]?.length);
      const emoting = !kicking && (n.mode === 'emote' && n.emote && wset[n.emote]?.length);
      let fIdx = 0;
      if (kicking) {
        const elapsed = Math.max(0, t - (n.kickStart || 0));
        const fpsK = (fightKey === 'combo' || fightKey === 'baek') ? 13.8 : (fightKey === 'punch' ? 6.2 : 5.2);
        fIdx = Math.min(wset[fightKey].length - 1, Math.floor(elapsed * fpsK));
      } else if (emoting) {
        const elapsed = Math.max(0, t - (n.emoteStart || 0));
        if (n.id === 'claude' && n.emote === 'dance' && wset.dance?.length === 36) {
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
          const eLen = wset[n.emote]?.length || 12;
          if (eLen <= 4) {
            fIdx = Math.floor(elapsed * 1.15) % eLen;
          } else {
            fIdx = n.emoteLoop ? (Math.floor(elapsed * 5.0) % eLen) : Math.min(eLen - 1, Math.floor(elapsed * 4.0));
          }
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

      const capSipping = (n.id === 'captain' && n.idleCoffeeSeated && n.mode === 'emote' && n.emote === 'coffee');
      const capStamping = (n.id === 'captain' && n.mode === 'emote' && n.emote === 'stamp' && wset.stamp?.length === 12);
      const isConfSeat = (n.mode === 'conf' && !!CONF_SEATS[n.id]);
      const isCustomSeat = ((n.mode === 'idle' || (n.id === 'captain' && capSipping)) && !!n.customSeat);
      const activeSeat = isCustomSeat ? n.customSeat : (isConfSeat ? CONF_SEATS[n.id] : cfg.seat);
      const activeFacing = isCustomSeat ? (n.customSeat.facing === 'west' ? 'front' : n.customSeat.facing) : (isConfSeat ? CONF_SEATS[n.id].facing : cfg.facing);
      const seated = (n.mode === 'idle' || n.mode === 'work' || isConfSeat || capSipping || capStamping);
      // 전 직원 10명 책상·회의실 맞춤 앉은 포즈 루프 (직원별 위상 분산, 실제 작업 중엔 더 부지런히 전환!)
      let seatPose = false;
      const working = (n.mode === 'idle' || n.mode === 'work') && realBusySet.has(n.id);
      if (capStamping) {
        seatPose = true;
      } else if (isCustomSeat && n.customSeat.pose && wset[n.customSeat.pose]?.length) {
        const arrP = wset[n.customSeat.pose];
        im = arrP[Math.floor(t * 0.72) % arrP.length];
        seatPose = false;
      } else if (seated && !capSipping && activeSeat && wset.seat?.length >= 4 && wset.seat.every(Boolean)) {
        const cnt = wset.seat.length;
        const stepSec = (cnt >= 12) ? (working ? 0.24 : 0.38) : (working ? 1.45 : (isConfSeat ? 2.2 : 2.85));
        const phase = (activeSeat.x * 0.37 + activeSeat.headTopY * 0.19);
        const k = Math.floor((t + phase) / stepSec) % cnt;
        im = wset.seat[k];
        seatPose = true;
      }

      if (seated && activeSeat) {
        const s = activeSeat;
        const sx = (s.x / 100) * W;
        const topY = (s.headTopY / 100) * H;
        const clipY = (s.clipY / 100) * H;
        // 작업 중(실제 대시보드 일) = 자판 두드리듯 잔떨림 + 모니터 불빛 + 머리 위 '입력 중…' 점 3개
        const ph = sx * 0.013;
        const bob = working
          ? Math.sin(t * 1.6 + ph) * 0.5 + Math.abs(Math.sin(t * 9.5 + ph)) * 1.1
          : Math.sin(t * 1.8 + sx * 0.01) * 0.85;
        const sway = working ? Math.sin(t * 4.7 + ph) * 0.7 : 0;
        // 새 상반신 앉은 그림: 앞모습은 머리~손끝이 책상 상판에 딱 얹히도록(0.45), 뒷모습은 의자 등받이 높이에 맞춤(0.56)
        const seatScale = (activeFacing === 'back') ? 0.56 : (n.id === 'captain' ? 0.46 : 0.44);
        const targetH = seatPose ? s.h * seatScale : s.h;
        const targetW = targetH * (im.naturalWidth / im.naturalHeight);

        ctx.save();
        // 책상/회의 테이블/소파 앞 테이블 경계선에서 깔끔하게 클리핑 (오른쪽 소파처럼 clipY>=99면 전신 표시!)
        if (!(isCustomSeat && s.clipY >= 99)) {
          ctx.beginPath();
          const maxClip = (seatPose && activeFacing === 'front') ? Math.max(clipY + 14, topY + targetH) : clipY;
          ctx.rect(0, 0, W * 2, maxClip);
          ctx.clip();
        }
        ctx.drawImage(im, sx - targetW / 2 + (seatPose ? sway * 0.35 : sway), topY + (seatPose ? bob * 0.45 : bob), targetW, targetH);
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
      const targetH = standPx(n.id) * ((kicking && (fightKey === 'combo' || fightKey === 'baek')) ? 1.28 : 1.0);
      const sizeK = targetH / 164; // 그림자 크기도 키에 맞춤
      const targetW = targetH * (im.naturalWidth / im.naturalHeight);
      const bob = walking ? Math.sin(n.walkDist * 1.1) * 1.8 : 0;

      // 캡틴에게 공손히 허리 숙여 인사하는 2분할 허리 축 보우(Bow) 모션 (하체·다리는 꼿꼿이 고정, 상체만 허리에서 숙였다 잠깐 멈춘 뒤 복귀!)
      let bowDip = 0;
      if (n.bowStart && n.bowUntil && t >= n.bowStart && t < n.bowUntil) {
        const p = Math.min(1, Math.max(0, (t - n.bowStart) / (n.bowUntil - n.bowStart)));
        const ease = x => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        if (p < 0.30) bowDip = ease(p / 0.30);           // 0..30%: 부드럽게 숙임
        else if (p < 0.64) bowDip = 1.0;                 // 30..64%: 정중히 숙인 채 잠깐 멈춤(홀드)
        else bowDip = 1 - ease((p - 0.64) / 0.36);       // 64..100%: 천천히 고개 들며 복귀
      }

      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.28)';
      ctx.beginPath(); ctx.ellipse(cx, cy + 6, 26 * sizeK, 7.5 * sizeK, 0, 0, Math.PI * 2); ctx.fill();
      ctx.translate(cx, cy + bob);
      ctx.scale(flipX ? -1 : 1, 1);
      if (bowDip > 0.005) {
        const iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height;
        const waistRatio = 0.48; // 위 48% = 상체(머리~허리), 아래 52% = 하체(골반~구두, 고정!)
        const srcSplit = Math.round(ih * waistRatio);
        const dstUpperH = targetH * waistRatio;
        const dstLowerH = targetH - dstUpperH;
        // 1) 하체(다리·치마/바지·구두): 절대 찌그러지지 않고 꼿꼿이 서 있음
        ctx.drawImage(im, 0, srcSplit, iw, ih - srcSplit, -targetW / 2, -dstLowerH, targetW, dstLowerH);
        // 2) 상체(머리~허리): 허리 축(-dstLowerH)을 기준으로 원근감 있게 앞으로 숙임!
        const upScaleY = 1 - bowDip * 0.36;
        const upScaleX = 1 + bowDip * 0.05;
        const upH = dstUpperH * upScaleY;
        const upW = targetW * upScaleX;
        // 이음매 1.5px 살짝 겹쳐 틈새 0%
        ctx.drawImage(im, 0, 0, iw, srcSplit + 2, -upW / 2, -dstLowerH - upH + 1.5, upW, upH + 1.5);
      } else {
        ctx.drawImage(im, -targetW / 2, -targetH, targetW, targetH);
      }
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
      if (cap && cap.customSeat) {
        if (cap.customSeat.stand) { cap.x = cap.customSeat.stand[0]; cap.y = cap.customSeat.stand[1]; }
        cap.customSeat = null;
        cap.mode = 'stand';
      }
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
      { x0: 23.5, y0:  0.0, x1: 36.5, y1: 19.2 }, // 좌측 상단 통유리 창가(정수기~단상 계단 사이 — 창틀 위로 못 올라가게!)
      { x0: 63.5, y0:  0.0, x1: 72.0, y1: 19.2 }, // 우측 상단 통유리 창가(단상 계단~테라스 난간 사이 — 창틀 위로 못 올라가게!)
      { x0: 71.5, y0:  0.0, x1: 100., y1: 19.0 }, // 우측 테라스 난간·신관 연결 통유리 창가(기둥 바닥 18.2까지 — 화분 제거로 신관 복도 완전 개방!)
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
      // 맨 아래 넓은 나무 바닥(y 89.8~97.5)은 본관~신관(x 2~198) 전부 걸을 수 있음!
      // ---- 오른쪽 4K 신관 (x 100~200): 대회의실·VIP 접견실(상단 창틀 밀착 + 앞쪽 대복도 완전 개방!), 트레이닝·복싱 짐, 직원 휴게실·라운지 ----
      { x0: 100.0, y0:  0.0, x1: 200.0, y1: 16.0 }, // 신관 상단 통유리 창가
      // 대회의실 & VIP 접견실 (앞쪽 전체 y 31.8~48.5 완전 개방 — 사방에서 시원하게 출입!)
      { x0: 123.5, y0: 10.0, x1: 192.5, y1: 19.6 }, // 윗벽 + 대형 스크린 + 화분
      { x0: 121.8, y0: 10.0, x1: 124.8, y1: 30.0 }, // 왼쪽 짧은 벽 (아래쪽 완전 개방!)
      { x0: 190.5, y0: 10.0, x1: 196.0, y1: 30.2 }, // 오른쪽 짧은 벽
      { x0: 138.0, y0: 20.5, x1: 163.5, y1: 31.4 }, // 대회의실 원목 테이블·의자
      { x0: 170.0, y0: 16.0, x1: 185.5, y1: 29.5 }, // VIP 가죽 소파·티테이블
      // 트레이닝 · 복싱 짐 (오른쪽 아래 출입구 y 74.5~85.0 활짝 열림!)
      { x0: 100.0, y0: 48.5, x1: 148.0, y1: 65.5 }, // 윗벽 + 거울 + 덤벨 랙 + 샌드백 기둥
      { x0: 100.0, y0: 48.5, x1: 107.0, y1: 88.5 }, // 왼쪽 벽 + 요가매트
      { x0: 100.0, y0: 85.0, x1: 148.0, y1: 88.8 }, // 아래 벽
      { x0: 146.0, y0: 48.5, x1: 148.8, y1: 74.5 }, // 오른쪽 윗벽 (아래쪽 넓은 출입구 개방!)
      { x0: 132.5, y0: 62.0, x1: 142.5, y1: 70.5 }, // 운동 벤치
      { x0: 115.8, y0: 71.5, x1: 119.6, y1: 76.2 }, // 샌드백 하단 바닥 점유 영역
      // 직원 휴게실 · 라운지 (왼쪽 아래 출입구 y 74.5~85.0 활짝 열림!)
      { x0: 152.5, y0: 48.5, x1: 200.0, y1: 67.5 }, // 윗벽 + 스낵바 + 냉장고 + 소파
      { x0: 191.2, y0: 48.5, x1: 200.0, y1: 88.5 }, // 오른쪽 벽 + 소파
      { x0: 152.5, y0: 85.0, x1: 200.0, y1: 88.8 }, // 아래 벽
      { x0: 152.2, y0: 48.5, x1: 154.8, y1: 74.5 }, // 왼쪽 윗벽 (아래쪽 넓은 출입구 개방!)
      { x0: 159.5, y0: 67.0, x1: 171.0, y1: 79.8 }, // 좌측 원형 카페 테이블 (위쪽 소파 y1=67.5와 빈틈없이 밀착 — 테이블·화분 위 보행 원천 차단!)
      { x0: 178.5, y0: 69.8, x1: 188.0, y1: 79.8 }, // 우측 원형 카페 테이블 (상판·화분 차단 + 오른쪽 소파·냉장고 통로 확보)
    ];
    function canWalk(x, y) {
      if (x < 2.0 || x > 198.0 || y < 15.6 || y > 97.5) return false;
      for (const b of BLOCKERS) {
        if (x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1) return false;
      }
      return true;
    }

    // A* 격자 길찾기 (1.5% 간격, 본관+신관 200×100 전체!): 벽·책상·단상 턱·화분을 절대 통과하지 않고 열린 문·계단·복도로만 우회 이동!
    function findPath(sx, sy, tx, ty) {
      const STEP = 1.5;
      const cols = Math.floor(200 / STEP);
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
      cap.customSeat = null;
      cap.path = [];
      cap.onArrive = null;
      cap.x = CHARS.captain.home[0];
      cap.y = CHARS.captain.home[1];
      cap.dir = 'front';
      cap.mode = 'idle';
      cap.bubble = '';
      SFX.sit();
      voice('captain', 'sit', 0.15);
      log('🪑 캡틴이 대표 책상 자리에 착석했습니다');
    }

    // 🥊 신관 복싱 짐 인터랙티브 샌드백 물리·타격감·콤보 시스템!
    const BAG = { x0: 115.47, y0: 57.03, x1: 119.19, y1: 74.96, pivotX: 117.33, pivotY: 57.03, cx: 117.33, cy: 74.5 };
    const bagState = { angle: 0, vel: 0, squash: 0, combo: 0, lastHit: 0, shockwaves: [] };
    let shakeAmt = 0;

    function hitPunchingBag(isHeavy = false) {
      const cap = npcs.captain;
      const nowS = performance.now() / 1000;
      if (nowS - bagState.lastHit > 4.2) bagState.combo = 0;
      bagState.combo += 1;
      bagState.lastHit = nowS;
      // 캡틴이 왼쪽에 있으면 오른쪽(+)으로, 오른쪽에 있으면 왼쪽(-)으로 샌드백이 강하게 날아감!
      const pushDir = (cap.x <= BAG.cx) ? 1 : -1;
      bagState.vel += pushDir * (isHeavy ? 7.6 : 4.8);
      bagState.vel = Math.max(-11.5, Math.min(11.5, bagState.vel));
      bagState.squash = isHeavy ? 0.19 : 0.12;
      shakeAmt = Math.max(shakeAmt, isHeavy ? 15 : 8);
      SFX.bagHit(isHeavy);
      // 충격파 링 + 불꽃 파티클 + 콤보 텍스트!
      const hitX = (BAG.cx / 100) * W;
      const hitY = ((isHeavy ? 64.5 : 62.5) / 100) * H;
      bagState.shockwaves.push({ x: hitX, y: hitY, born: performance.now(), heavy: isHeavy });
      const colors = isHeavy ? ['#ef4444', '#f97316', '#facc15', '#ffffff'] : ['#facc15', '#fb923c', '#ffffff'];
      for (let i = 0; i < (isHeavy ? 18 : 11); i++) {
        const ang = (Math.random() * Math.PI * 2);
        const spd = (isHeavy ? 260 : 170) + Math.random() * 240;
        bursts.push({
          x: hitX, y: hitY,
          vx: Math.cos(ang) * spd + pushDir * 120,
          vy: Math.sin(ang) * spd - 90,
          size: (isHeavy ? 5 : 3.5) + Math.random() * 5,
          color: colors[i % colors.length],
          life: 0, max: 0.36 + Math.random() * 0.22,
        });
      }
      const word = isHeavy
        ? (bagState.combo >= 5 ? `⚡ 크리티컬!! ${bagState.combo} HIT!` : `💥 쾅!! ${bagState.combo} HIT!`)
        : (bagState.combo >= 4 ? `🔥 연타! ${bagState.combo} HIT!` : `👊 퍽! ${bagState.combo} HIT`);
      spawnBurst(BAG.cx, 58.0, `${word} +15 EXP`, 15);
    }

    function playCaptainAction(action) {
      touchCaptainInput();
      const cap = npcs.captain;
      // 발차기·주먹·10단 콤보는 다리가 책상에 가려지므로, 대표석(의자)에 있으면 단상 앞 바닥으로 걸어 나온 뒤 시전한다
      if (action === 'kick' || action === 'punch' || action === 'combo' || action === 'baek') {
        const isPunch = action === 'punch';
        const isBaek  = action === 'baek';
        const isCombo = (action === 'combo' || isBaek);
        // 캡틴 이동 중 발차기·주먹·10콤보 지원! 앉아 있을 때만 대표석 앞으로 나온 뒤 동작, 서 있거나 이동 중이면 멈추지 않고 바로 동작!
        if (!cap._kickWalked && cap.mode === 'idle' &&
            Math.hypot(cap.x - CHARS.captain.home[0], cap.y - CHARS.captain.home[1]) < 4.0) {
          const ok = walkCaptainSafe(KICK_SPOT[0], KICK_SPOT[1], {
            bubble: isBaek ? '⚡ 백두산 10단 콤보 시범 보일게요!' : (isCombo ? '🔥 화랑 10단 콤보 시범 보일게요!' : (isPunch ? '👊 잠깐 몸 좀 풀게요!' : '🥋 잠깐 시범 보일게요!')),
            onArrive: () => { cap._kickWalked = true; cap.dir = 'east'; playCaptainAction(action); cap._kickWalked = false; },
          });
          if (ok) return;
        }
        const nearBag = Math.hypot(cap.x - BAG.cx, cap.y - BAG.cy) < 11.5;
        if (nearBag) {
          cap.dir = (cap.x <= BAG.cx) ? 'east' : 'west';
        }
        const nowS = performance.now() / 1000;
        cap.fightKind = action;
        cap.kickStart = nowS;
        cap.kickUntil = nowS + (isCombo ? 3.55 : (isPunch ? 2.55 : 2.35));
        if (cap.mode === 'idle') cap.mode = 'stand';
        const say = isBaek
          ? (nearBag ? '⚡ 백두산 10단 콤보!! 샌드백 폭파 10연타!' : '⚡ 백두산 태권도 10단 콤보 발차기!!')
          : isCombo
          ? (nearBag ? '🔥 화랑 10단 콤보!! 샌드백 폭파 10연타!' : '🔥 화랑 태권도 10단 콤보 발차기!!')
          : (nearBag
            ? (isPunch ? '🥊 샌드백 연타! 원투 훅 어퍼컷!' : '🥊 샌드백 강타! 회축 쾅!!')
            : (isPunch ? '👊 원투! 연속 펀치!' : '🥋 얍! 이동 발차기!'));
        if (nearBag) {
          // 샌드백 타격 타이밍에 맞춰 다단 히트 임팩트 발동! (10콤보 3.45초 고속 연타 + 10타 회오리 피니시!)
          const timings = isCombo
            ? [[260, false], [540, true], [840, false], [1140, false], [1440, true], [1740, false], [2060, true], [2380, false], [2720, true], [3100, true]]
            : (isPunch ? [[220, false], [680, false], [1180, true]] : [[280, true], [920, true]]);
          timings.forEach(([ms, heavy]) => setTimeout(() => {
            if (Math.hypot(npcs.captain.x - BAG.cx, npcs.captain.y - BAG.cy) < 13.5) hitPunchingBag(heavy);
          }, ms));
        } else {
          if (isCombo) {
            [0.22, 0.52, 0.82, 1.12, 1.42, 1.72, 2.04, 2.36, 2.70, 3.08].forEach(d => noiseBurst(0.08, 0.055, d));
            navigator.vibrate?.([15, 40, 15, 40, 15, 40, 35]);
            spawnBurst(cap.x, cap.y - 4, '🔥 10단 콤보!! +80 EXP', 80);
          } else {
            if (isPunch) SFX.punch(); else SFX.kick();
            spawnBurst(cap.x, cap.y - 4, isPunch ? '👊 퍽!' : '🥋 얍!', 0);
          }
        }
        cap.bubble = say;
        cap.bubbleType = 'ok';
        log(isCombo
          ? (nearBag ? '🔥 캡틴이 복싱 짐 샌드백에 화랑 10단 콤보 10연타를 작렬시켰습니다!' : '🔥 캡틴이 화랑 스타일 태권도 10단 콤보를 시전했습니다!')
          : (nearBag ? `🥊 캡틴이 복싱 짐 샌드백을 ${isPunch ? '연속 펀치로' : '강력한 발차기로'} 타격했습니다!` : (isPunch ? '👊 캡틴이 주먹 격투(잽·스트레이트·훅·어퍼컷) 연속 공격을 시전했습니다' : '🥋 캡틴이 이동 중 태권도 발차기를 시전했습니다')));
        setTimeout(() => { if (cap.bubble === say) cap.bubble = ''; }, isCombo ? 5100 : 2600);
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
      } else if (action === 'praise') {
        // 캡틴이 대표석에 앉아 있으면 책상 앞으로 걸어 나온 뒤 칭찬·박수·엄지척!
        if (!cap._praiseWalked && Math.hypot(cap.x - CHARS.captain.home[0], cap.y - CHARS.captain.home[1]) < 4.0) {
          cap.mode = 'stand'; cap.emote = null;
          const ok = walkCaptainSafe(KICK_SPOT[0], KICK_SPOT[1], {
            bubble: '👏 수고한 직원 칭찬하러 가는 중…',
            onArrive: () => { cap._praiseWalked = true; playCaptainAction('praise'); cap._praiseWalked = false; },
          });
          if (ok) return;
        }
        cap.emoteUntil = cap.emoteStart + 3.2;
        SFX.praise();
        voice('captain', 'nice');
        cap.bubble = '👍 오, 잘했어! 아주 깔끔하네!';
        cap.bubbleType = 'ok';
        spawnBurst(cap.x, cap.y - 5, '👏 칭찬 +30 EXP', 30);
        // 가장 가까운 직원 찾아 기뻐하는 반응 + 하트 파티클!
        let near = null, minD = Infinity;
        for (const [sid, sn] of Object.entries(npcs)) {
          if (sid === 'captain') continue;
          const d = Math.hypot(sn.x - cap.x, sn.y - cap.y);
          if (d < minD) { minD = d; near = sn; }
        }
        if (near) {
          const prevBub = near.bubble;
          near.bubble = '💖 감사합니다 캡틴! 더 열심히 하겠습니다!';
          near.bubbleType = 'meet';
          voice(near.id, 'done', 0.4);
          spawnBurst(near.x, near.y - 4, '💖 기쁨 +30 EXP', 30);
          setTimeout(() => { if (near.bubble.startsWith('💖 감사합니다')) near.bubble = prevBub || ''; }, 3600);
        }
        log('👏 캡틴이 직원을 칭찬하며 박수·엄지척을 보냈습니다');
      } else if (action === 'stamp') {
        // 캡틴 대표석 결재 도장 쾅! 모션 + 화면 황금 스탬프 오버레이
        cap.x = CHARS.captain.home[0];
        cap.y = CHARS.captain.home[1];
        cap.emoteUntil = cap.emoteStart + 3.0;
        cap.bubble = '🖋️ 좋아, 그대로 확정하고 진행해!';
        cap.bubbleType = 'meet';
        voice('captain', 'approve');
        setTimeout(() => {
          SFX.stamp();
          spawnBurst(50.0, 14.0, '✅ 결재 완료! +50 EXP', 50);
          if (stampFxEl) {
            stampFxEl.hidden = false;
            stampFxEl.classList.remove('pop');
            void stampFxEl.offsetWidth;
            stampFxEl.classList.add('pop');
            setTimeout(() => { stampFxEl.hidden = true; stampFxEl.classList.remove('pop'); }, 1850);
          }
        }, 950);
        setTimeout(() => {
          if (cap.mode === 'emote' && cap.emote === 'stamp') {
            cap.emote = null; cap.mode = 'idle'; cap.bubble = '';
          }
        }, 3050);
        log('🖋️ 캡틴이 대표석에서 결재 도장을 쾅! 찍었습니다');
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
      } else if (k === '4') {
        e.preventDefault();
        playCaptainAction('punch');
      } else if (k === '5') {
        e.preventDefault();
        playCaptainAction('praise');
      } else if (k === '6') {
        e.preventDefault();
        playCaptainAction('stamp');
      } else if (k === '7') {
        e.preventDefault();
        playCaptainAction('combo');
      } else if (k === '8') {
        e.preventDefault();
        playCaptainAction('baek');
      } else if (k === 'f' && nearActions.length) {
        e.preventDefault();
        runNearAction(0);
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
      } else if (!briefingActive && modalBack.hidden && !cap.path.length && !cap.customSeat &&
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
          const has8 = (n.id === 'captain' || n.id === 'inspector' || n.id === 'reader');
          n.dir = vecToDir(dx, dy, has8);
        }
      }

      // 🥊 샌드백 물리 진자 흔들림 & 화면 반동 셰이크 업데이트
      bagState.vel += (-36 * bagState.angle - 4.8 * bagState.vel) * dt;
      bagState.angle += bagState.vel * dt;
      if (Math.abs(bagState.angle) < 0.0005 && Math.abs(bagState.vel) < 0.002) { bagState.angle = 0; bagState.vel = 0; }
      bagState.squash *= Math.pow(0.008, dt);
      shakeAmt *= Math.pow(0.0004, dt);
      if (shakeAmt < 0.25) shakeAmt = 0;
      if (wingBtn) {
        const inRight = cap.x >= 100;
        const lbl = inRight ? '🏢 본관 복귀' : '🥊 신관·복싱짐';
        if (wingBtn.textContent !== lbl) wingBtn.textContent = lbl;
      }

      // 캡틴 중심 부드러운 게임 카메라 추적 (본관 0~100 + 신관 100~200 확장 월드!)
      // 보고 중(2026-11-24 캡틴 요청)엔 전체 보기 대신 캡틴 단상 앞(직원 줄 y=29.8·비서실장 단상 포함)을 2.4배로 비춤
      if (camEl) {
        const targetZ = briefingActive ? 2.4 : (camMode === 'follow' ? 1.85 : 1.0);
        const targetFx = briefingActive ? 50 : (camMode === 'overview' ? (cap.x >= 100 ? 150 : 50) : cap.x);
        const targetFy = briefingActive ? 21 : Math.max(10, Math.min(90, cap.y - 2));
        const k = Math.min(1, dt * 6.5);
        cam.z += (targetZ - cam.z) * k;
        cam.fx += (targetFx - cam.fx) * k;
        cam.fy += (targetFy - cam.fy) * k;
        const tx = Math.max(100 - 200 * cam.z, Math.min(0, 50 - cam.fx * cam.z));
        const ty = Math.max(100 - 100 * cam.z, Math.min(0, 50 - cam.fy * cam.z));
        cam.tx = tx; cam.ty = ty;
        camEl.style.transform = `translate(${tx.toFixed(2)}%, ${ty.toFixed(2)}%) scale(${cam.z.toFixed(4)})`;
      }
      if (now - resCheckAt > 500) { resCheckAt = now; updateCanvasRes(); }
      {
        const s = canvas.width / W, z = cam.z || 1;
        const shX = shakeAmt ? (Math.random() * 2 - 1) * shakeAmt : 0;
        const shY = shakeAmt ? (Math.random() * 2 - 1) * shakeAmt * 0.6 : 0;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(s * z, 0, 0, s * z, (cam.tx || 0) / 100 * W * s + shX, (cam.ty || 0) / 100 * H * s + shY);
      }
      // 화면에 보이는 세로 띠(월드 x)만 계산 → 안 보이는 본관/신관 배경은 그리지 않음(폰 메모리·속도)
      const viewX0 = -((cam.tx || 0) / 100) * W / (cam.z || 1) - 40;
      const viewX1 = viewX0 + W / (cam.z || 1) + 80;
      if (imgs.bg && viewX0 < W) {
        ctx.drawImage(imgs.bg, 0, 0, W, H);
        // 🖥️ 본관 4대 PC 모니터(디지털 메뉴 통제실 2대 + 감사실 2대) 실시간 작업 화면 연출!
        const pcMons = [
          { id: 'agy',       kind: 'menu',  x0: 80.83, y0: 32.65, x1: 84.58, y1: 36.21, acc: '#38bdf8' },
          { id: 'reader',    kind: 'code',  x0: 90.52, y0: 32.43, x1: 94.34, y1: 36.17, acc: '#34d399' },
          { id: 'inspector', kind: 'qa',    x0:  5.46, y0: 65.12, x1:  9.28, y1: 68.82, acc: '#c084fc' },
          { id: 'auditor',   kind: 'chart', x0: 15.48, y0: 65.12, x1: 19.30, y1: 68.82, acc: '#fbbf24' },
        ];
        for (const m of pcMons) {
          const mx = (m.x0 / 100) * W, my = (m.y0 / 100) * H;
          const mw = ((m.x1 - m.x0) / 100) * W, mh = ((m.y1 - m.y0) / 100) * H;
          const busy = realBusySet.has(m.id);
          const spd = busy ? 2.4 : 1.0;
          ctx.save();
          ctx.beginPath(); ctx.rect(mx, my, mw, mh); ctx.clip();
          // 다크 모드 업무 UI 배경
          const mg = ctx.createLinearGradient(mx, my, mx, my + mh);
          mg.addColorStop(0, '#0f1c38');
          mg.addColorStop(1, '#0b1326');
          ctx.fillStyle = mg;
          ctx.fillRect(mx, my, mw, mh);
          // 상단 윈도우 타이틀바 + 3색 점
          ctx.fillStyle = 'rgba(30,41,59,0.92)';
          ctx.fillRect(mx, my, mw, 7);
          ctx.fillStyle = '#f87171'; ctx.fillRect(mx + 4, my + 2.5, 2.5, 2.5);
          ctx.fillStyle = '#fbbf24'; ctx.fillRect(mx + 8.5, my + 2.5, 2.5, 2.5);
          ctx.fillStyle = '#4ade80'; ctx.fillRect(mx + 13, my + 2.5, 2.5, 2.5);
          ctx.fillStyle = m.acc;
          ctx.fillRect(mx + 22, my + 2.5, mw * 0.36, 2.2);
          // 모니터별 살아 움직이는 업무 화면
          const by = my + 10, bh = mh - 12;
          if (m.kind === 'menu') {
            // 메뉴 검사관: 좌측 QR메뉴 카드 썸네일 + 우측 스크롤 가격표 체크리스트
            ctx.fillStyle = 'rgba(56,189,248,0.22)';
            ctx.fillRect(mx + 5, by, mw * 0.34, bh * 0.55);
            ctx.fillStyle = '#fde047';
            ctx.fillRect(mx + 8, by + 3, mw * 0.22, 3);
            ctx.fillStyle = 'rgba(255,255,255,0.65)';
            ctx.fillRect(mx + 8, by + 9, mw * 0.26, 2.2);
            ctx.fillRect(mx + 8, by + 14, mw * 0.18, 2.2);
            const sc = (t * 9 * spd) % 10;
            for (let r = 0; r < 5; r++) {
              const ry = by + r * 8 - sc * 0.6;
              if (ry < by - 4 || ry > my + mh) continue;
              ctx.fillStyle = '#4ade80'; ctx.fillRect(mx + mw * 0.44, ry, 3.5, 3.5);
              ctx.fillStyle = 'rgba(226,232,240,0.75)';
              ctx.fillRect(mx + mw * 0.50, ry + 0.5, mw * (0.28 + ((r * 13) % 16) * 0.01), 2.6);
            }
          } else if (m.kind === 'code') {
            // 자료 해석 비서: 신택스 컬러 JSON·코드 스크롤 + 하단 진행바
            const sc = (t * 14 * spd) % 9;
            const cols = ['#38bdf8', '#34d399', '#fbbf24', '#f472b6', '#e2e8f0'];
            for (let r = 0; r < 6; r++) {
              const ry = by + r * 6.5 - sc * 0.5;
              if (ry < by - 3 || ry > my + mh - 7) continue;
              const indent = (r % 3) * 6;
              ctx.fillStyle = cols[r % cols.length];
              ctx.fillRect(mx + 6 + indent, ry, mw * (0.18 + ((r * 7) % 10) * 0.025), 2.6);
              ctx.fillStyle = 'rgba(148,163,184,0.65)';
              ctx.fillRect(mx + 36 + indent, ry, mw * 0.28, 2.4);
            }
            const prog = (0.35 + 0.65 * ((t * 0.28 * spd) % 1));
            ctx.fillStyle = 'rgba(51,65,85,0.8)'; ctx.fillRect(mx + 6, my + mh - 6, mw - 12, 3);
            ctx.fillStyle = '#34d399'; ctx.fillRect(mx + 6, my + mh - 6, (mw - 12) * prog, 3);
          } else if (m.kind === 'qa') {
            // 운영 감찰관: 보라·시안 원형 게이지 + 실시간 검수 체크 리스트
            const cx = mx + mw * 0.23, cy = by + bh * 0.46, rad = Math.min(mw, bh) * 0.28;
            ctx.strokeStyle = 'rgba(192,132,252,0.28)'; ctx.lineWidth = 3.5;
            ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.stroke();
            ctx.strokeStyle = '#c084fc';
            ctx.beginPath(); ctx.arc(cx, cy, rad, -Math.PI / 2, -Math.PI / 2 + Math.PI * (1.2 + 0.5 * Math.sin(t * 1.4 * spd))); ctx.stroke();
            const sc = (t * 8 * spd) % 10;
            for (let r = 0; r < 5; r++) {
              const ry = by + r * 9 - sc * 0.5;
              if (ry < by - 4 || ry > my + mh) continue;
              ctx.fillStyle = (r % 3 === 0) ? '#38bdf8' : '#4ade80';
              ctx.fillRect(mx + mw * 0.46, ry, 5, 3.2);
              ctx.fillStyle = 'rgba(226,232,240,0.78)';
              ctx.fillRect(mx + mw * 0.54, ry, mw * (0.26 + ((r * 11) % 12) * 0.012), 2.8);
            }
          } else {
            // 데이터 감사관: 실시간 상승 막대 그래프 + 지표 라인
            const bars = 6, bw = (mw * 0.52) / bars;
            for (let b = 0; b < bars; b++) {
              const frac = 0.28 + 0.58 * (0.5 + 0.5 * Math.sin(t * 1.8 * spd + b * 0.9));
              const bh2 = (bh - 6) * frac;
              ctx.fillStyle = b % 2 === 0 ? '#34d399' : '#fbbf24';
              ctx.fillRect(mx + 6 + b * bw, my + mh - 4 - bh2, bw - 3, bh2);
            }
            for (let r = 0; r < 4; r++) {
              ctx.fillStyle = r === 0 ? '#fde047' : 'rgba(148,163,184,0.75)';
              ctx.fillRect(mx + mw * 0.63, by + 3 + r * 9, mw * (0.26 - (r % 2) * 0.06), 3);
            }
          }
          // 모니터 유리 반사광 + 은은한 화면 발광
          const gl = ctx.createLinearGradient(mx, my, mx + mw * 0.65, my + mh);
          gl.addColorStop(0, 'rgba(255,255,255,0.14)');
          gl.addColorStop(0.4, 'rgba(255,255,255,0)');
          gl.addColorStop(1, 'rgba(0,0,0,0.16)');
          ctx.fillStyle = gl;
          ctx.fillRect(mx, my, mw, mh);
          ctx.restore();
        }
      }
      if (imgs.bgRight && viewX1 > W) {
        ctx.drawImage(imgs.bgRight, W, 0, W, H);
        // 📺 신관 대회의실 대형 TV 디스플레이: 정식 계약 매장 QR메뉴 자동 롤링 쇼케이스!
        if (imgs.tvStores?.length) {
          const tx = (143.64 / 100) * W, ty = (11.52 / 100) * H;
          const tw = ((158.03 - 143.64) / 100) * W, th = ((17.17 - 11.52) / 100) * H;
          ctx.save();
          ctx.beginPath();
          ctx.rect(tx, ty, tw, th);
          ctx.clip();
          // 1) 애니 오피스 감성 딥 사파이어 + 오로라 웨이브 배경
          const bgG = ctx.createLinearGradient(tx, ty, tx + tw, ty + th);
          bgG.addColorStop(0, '#091836');
          bgG.addColorStop(0.5, '#12316b');
          bgG.addColorStop(1, '#08142c');
          ctx.fillStyle = bgG;
          ctx.fillRect(tx, ty, tw, th);
          // 은은한 흐르는 빛 웨이브
          const wShift = Math.sin(t * 0.7) * 24;
          const aura = ctx.createRadialGradient(tx + tw * 0.35 + wShift, ty + th * 0.6, 6, tx + tw * 0.35 + wShift, ty + th * 0.6, tw * 0.45);
          aura.addColorStop(0, 'rgba(56,189,248,0.28)');
          aura.addColorStop(1, 'rgba(56,189,248,0)');
          ctx.fillStyle = aura;
          ctx.fillRect(tx, ty, tw, th);
          // 2) 상단 슬림 LIVE 헤더 바
          const hdrH = 15;
          ctx.fillStyle = 'rgba(4,11,26,0.72)';
          ctx.fillRect(tx, ty, tw, hdrH);
          ctx.fillStyle = 'rgba(56,189,248,0.32)';
          ctx.fillRect(tx, ty + hdrH - 0.8, tw, 0.8);
          // LIVE 깜빡임 점
          const pulse = 0.55 + 0.45 * Math.sin(t * 4.5);
          ctx.fillStyle = `rgba(52,211,153,${pulse.toFixed(2)})`;
          ctx.beginPath(); ctx.arc(tx + 9, ty + hdrH * 0.5, 2.7, 0, Math.PI * 2); ctx.fill();
          ctx.font = '800 8.5px "Malgun Gothic", sans-serif';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'left';
          ctx.fillStyle = '#fde047';
          ctx.fillText('LIVE', tx + 15, ty + hdrH * 0.52);
          ctx.fillStyle = '#e0f2fe';
          ctx.fillText('· JINWOO QR MENU 정식 계약 매장 쇼케이스', tx + 39, ty + hdrH * 0.52);
          ctx.textAlign = 'right';
          ctx.fillStyle = '#7dd3fc';
          ctx.fillText(`총 ${imgs.tvStores.length}개 정식 운영`, tx + tw - 7, ty + hdrH * 0.52);
          // 3) 정식 계약 가게 QR메뉴 카드 무한 부드러운 롤링 마키
          const stores = imgs.tvStores;
          const cardW = 116, cardH = th - hdrH - 8, gap = 8;
          const step = cardW + gap, totalW = stores.length * step;
          const scrollX = (t * 26) % totalW;
          const cy = ty + hdrH + 4;
          const startIdx = Math.floor(scrollX / step);
          for (let k = -1; k <= Math.ceil(tw / step) + 1; k++) {
            const idx = ((startIdx + k) % stores.length + stores.length) % stores.length;
            const st = stores[idx];
            const cx = tx + (startIdx + k) * step - scrollX;
            if (cx + cardW < tx - 4 || cx > tx + tw + 4) continue;
            // 카드 글래스 배경 + 테두리
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(cx, cy, cardW, cardH, 6);
            const cG = ctx.createLinearGradient(cx, cy, cx, cy + cardH);
            cG.addColorStop(0, 'rgba(30,58,138,0.82)');
            cG.addColorStop(1, 'rgba(15,23,42,0.92)');
            ctx.fillStyle = cG;
            ctx.fill();
            ctx.strokeStyle = 'rgba(147,197,253,0.48)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.clip();
            // 좌측 가게 대표 음식/간판 사진
            const phW = 54, phH = cardH - 6;
            const pim = imgs.tv?.[st.slug];
            if (pim) {
              ctx.save();
              ctx.beginPath(); ctx.roundRect(cx + 3, cy + 3, phW, phH, 4); ctx.clip();
              ctx.drawImage(pim, cx + 3, cy + 3, phW, phH);
              ctx.restore();
            }
            // 우측 정식 배지 + 가게명 + 업종 + 미니 QR 아이콘
            const rx = cx + phW + 7;
            ctx.fillStyle = 'rgba(250,204,21,0.22)';
            ctx.beginPath(); ctx.roundRect(rx, cy + 5, 24, 10, 3); ctx.fill();
            ctx.strokeStyle = 'rgba(250,204,21,0.75)'; ctx.lineWidth = 0.7; ctx.stroke();
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.font = '800 6.8px "Malgun Gothic", sans-serif';
            ctx.fillStyle = '#fef08a';
            ctx.fillText('정식', rx + 12, cy + 10.3);
            ctx.textAlign = 'left';
            ctx.font = '800 8.8px "Malgun Gothic", sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(st.name.slice(0, 7), rx, cy + 25);
            ctx.font = '600 6.8px "Malgun Gothic", sans-serif';
            ctx.fillStyle = '#93c5fd';
            ctx.fillText(st.sub.slice(0, 9), rx, cy + 37);
            // 우측 하단 미니 QR 코드 심볼
            const qx = cx + cardW - 14, qy = cy + cardH - 14;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath(); ctx.roundRect(qx, qy, 10.5, 10.5, 1.5); ctx.fill();
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(qx + 1.5, qy + 1.5, 3, 3);
            ctx.fillRect(qx + 6, qy + 1.5, 3, 3);
            ctx.fillRect(qx + 1.5, qy + 6, 3, 3);
            ctx.fillRect(qx + 6, qy + 6, 1.5, 1.5);
            ctx.fillRect(qx + 7.5, qy + 7.5, 1.5, 1.5);
            ctx.restore();
          }
          // 4) 4K 모니터 유리 반사광 + 베젤 안쪽 그림자 (애니 배경과 자연스럽게 일체화!)
          const glare = ctx.createLinearGradient(tx, ty, tx + tw * 0.55, ty + th);
          glare.addColorStop(0, 'rgba(255,255,255,0.13)');
          glare.addColorStop(0.35, 'rgba(255,255,255,0.03)');
          glare.addColorStop(0.36, 'rgba(255,255,255,0)');
          glare.addColorStop(1, 'rgba(0,0,0,0.14)');
          ctx.fillStyle = glare;
          ctx.fillRect(tx, ty, tw, th);
          ctx.strokeStyle = 'rgba(0,0,0,0.45)';
          ctx.lineWidth = 2;
          ctx.strokeRect(tx + 1, ty + 1, tw - 2, th - 2);
          ctx.restore();
        }
      }

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

      // 통합 Y-깊이(앞/뒤 가림) 정렬: 모든 캐릭터와 모든 책상·의자 전경 마스크 + 신관 샌드백을 발 위치(y) 순으로 그림!
      const drawList = [
        ...Object.values(npcs).map(n => ({ y: n.y, draw: () => drawNpc(n, t) })),
        ...PROPS.map(p => ({
          y: p.sortY,
          draw: () => {
            const im = imgs.masks[p.key];
            if (im) ctx.drawImage(im, (p.x0 / 100) * W, (p.y0 / 100) * H, ((p.x1 - p.x0) / 100) * W, ((p.y1 - p.y0) / 100) * H);
          }
        })),
        {
          y: BAG.cy,
          draw: () => {
            const im = imgs.punchBag;
            if (!im) return;
            const px = (BAG.pivotX / 100) * W;
            const py = (BAG.pivotY / 100) * H;
            const bw = ((BAG.x1 - BAG.x0) / 100) * W;
            const bh = ((BAG.y1 - BAG.y0) / 100) * H;
            // 바닥 동적 그림자 (샌드백 흔들림에 따라 같이 이동!)
            const shX = px + Math.sin(bagState.angle) * bh * 0.72;
            ctx.save();
            ctx.fillStyle = 'rgba(0,0,0,0.28)';
            ctx.beginPath();
            ctx.ellipse(shX, (77.0 / 100) * H, bw * 0.44, 14, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            // 체인 피벗 기준 진자 회전 + 타격 찌그러짐(스쿼시) 연출!
            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(-bagState.angle);
            const sxBag = 1 + bagState.squash;
            const syBag = 1 - bagState.squash * 0.45;
            ctx.scale(sxBag, syBag);
            ctx.drawImage(im, -bw * 0.5, 0, bw, bh);
            ctx.restore();
          }
        },
      ];
      drawList.sort((a, b) => a.y - b.y);
      for (const item of drawList) item.draw();

      // 🥊 샌드백 타격 충격파 링 렌더링
      for (let i = bagState.shockwaves.length - 1; i >= 0; i--) {
        const sw = bagState.shockwaves[i];
        const age = (now - sw.born) / (sw.heavy ? 380 : 280);
        if (age >= 1) { bagState.shockwaves.splice(i, 1); continue; }
        ctx.save();
        ctx.strokeStyle = sw.heavy ? `rgba(239, 68, 68, ${1 - age})` : `rgba(250, 204, 21, ${1 - age})`;
        ctx.lineWidth = (sw.heavy ? 10 : 6) * (1 - age * 0.6);
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, 18 + age * (sw.heavy ? 115 : 75), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

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
        if (n.hidden) {
          if (tagEls[id]) tagEls[id].hidden = true;
          if (bubEls[id]) bubEls[id].hidden = true;
          if (questEls[id]) questEls[id].hidden = true;
          continue;
        }
        if (tagEls[id]) tagEls[id].hidden = false;
        const walking = n.mode === 'walk';
        tagEls[id].style.transform = tagTf; tagEls[id].style.transformOrigin = tagTf ? '50% 0' : '';
        bubEls[id].style.transform = bubTf; bubEls[id].style.transformOrigin = bubTf ? '50% 100%' : '';
        tagEls[id].style.left = `${n.x}%`;
        const isStanding = (n.mode === 'walk' || n.mode === 'stand' || n.mode === 'emote');
        const tagTop = n.customSeat
          ? (n.y + 1.4)
          : ((id === 'captain' && n.mode === 'idle')
            ? 16.8
            : (n.y + (isStanding ? 1.2 : (CHARS[id].facing === 'front' ? 4.8 : 1.5))));
        tagEls[id].style.top  = `${tagTop}%`;
        // RPG 퀘스트 마커(! / ?) 머리 위 표시 (말풍선이 없을 때 깔끔하게 통통 뜀 — 착석·회의실·신관 소파 시 실측 headTopY 기준 머리 위로 띄움!)
        const q = activeQuests[id];
        const qEl = questEls[id];
        const standing = (n.mode === 'walk' || n.mode === 'stand' || n.mode === 'emote');
        const curSeat = n.customSeat ? n.customSeat : ((n.mode === 'conf' && CONF_SEATS[id]) ? CONF_SEATS[id] : CHARS[id]?.seat);
        const headY = standing ? (n.y - standPct(id)) : (curSeat?.headTopY ?? (n.y - 12.0));
        if (q && qEl && !(n.bubble && (n.bubbleType === 'ok' || (n.bubbleType === 'meet' && activeTalkNpc === n)))) {
          qEl.hidden = false;
          qEl.textContent = q.type === 'exc' ? '!' : '?';
          qEl.className = `oa-quest ${q.type === 'exc' ? 'exc' : 'ask'}`;
          qEl.style.left = `${n.x}%`;
          qEl.style.top = `${Math.max(3.5, headY - (standing ? 1.4 : 1.2))}%`;
        } else if (qEl) {
          qEl.hidden = true;
        }
        const showBub = n.bubble && (n.bubbleType === 'ok' || (n.bubbleType === 'meet' && activeTalkNpc === n));
        if (showBub) {
          tagEls[id].classList.add('speaking');
          bubEls[id].hidden = false;
          let bt = noEmoji(n.bubble);
          if (bt.length > 34) bt = bt.slice(0, 34) + '…';
          if (bubEls[id].textContent !== bt) bubEls[id].textContent = bt;
          bubEls[id].className = `oa-bub ${n.bubbleType}`;
          let bx = n.x;
          let by = Math.max(5.0, headY - (standing ? 1.8 : 1.5));
          // 캡틴 착석 시 말풍선이 캡틴 얼굴·피통 게이지를 가리지 않도록 배치!
          if (id === 'captain' && !standing) {
            if (n.customSeat) {
              bx = n.x;
              by = Math.max(4.5, headY - 4.4);
            } else {
              bx = 60.5;
              by = 10.2;
            }
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
        const hpTop = (cap.customSeat && !capStanding)
          ? Math.max(4.5, cap.customSeat.headTopY - 2.6)
          : Math.max(5.0, cap.y - (capStanding ? standPct('captain') + 0.6 : 12.2));
        capHpEl.style.left = `${cap.x}%`;
        capHpEl.style.top  = `${hpTop}%`;
        if (capStatusEl) {
          capStatusEl.style.left = `${cap.x}%`;
          capStatusEl.style.top  = `${Math.max(0.8, hpTop - 4.0)}%`;
        }
        if (capNearEl) {
          const list = findNearbyCapActions();
          if (list.length) {
            const sig = list.map(a => a.id).join('|');
            if (sig !== nearSig) {
              nearSig = sig;
              capNearEl.innerHTML = list.map((a, i) =>
                `<button type="button" class="oa-near-btn${i === 0 ? ' main' : ''}" data-near-i="${i}">${i === 0 ? '<span class="oa-near-k">F</span>' : '<span class="oa-near-dot"></span>'}<span class="oa-near-t">${a.label}</span></button>`
              ).join('');
            }
            nearActions = list;
            capNearEl.hidden = false;
            const flipLeft = (cap.x > 180) || (cap.x > 82 && cap.x < 100);
            capNearEl.classList.toggle('flip-l', flipLeft);
            capNearEl.style.left = `${cap.x + (flipLeft ? -2.8 : 2.8)}%`;
            capNearEl.style.top  = `${Math.max(8.0, cap.y - 10.5)}%`;
          } else {
            nearActions = [];
            nearSig = '';
            capNearEl.hidden = true;
          }
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
      // 상태창에서 PC·폰 모두 한 줄로 보이게 짧게(캡틴 지시 2026-11-27). 버튼 = [보이는 말, 실제로 보내는 지시 글]
      captain:    { greet: '오늘 어떤 지시를 내릴까요?', quick: [['새 가게 지시', '🏪 새 가게 찾기 제작 지시'], ['커피 휴식', '☕ 커피 한 잔 하며 휴식'], ['직원 격려', '👋 전체 직원 격려 인사'], ['대표석 복귀', '🪑 대표석으로 복귀']] },
      claude:     { greet: '캡틴, 지시하실 일 있으세요?', quick: [['커피 서빙', '☕ 캡틴 커피 서빙해 줘'], ['진행 현황 보고', '📋 현재 전체 진행 현황 보고'], ['팀장 회의 소집', '💬 팀장급 복도 회의 소집']] },
      finder:     { greet: '캡틴, 사진 작업 있으세요?', quick: [['사진 고르기', '📸 새 가게 음식 사진 고르기'], ['사진 화질 개선', '✨ 흐린 메뉴 사진 화질 개선'], ['작업 현황 보고', '📋 현재 사진 작업 현황 보고']] },
      agy:        { greet: '어느 가게 메뉴판 볼까요?', quick: [['가격·오타 점검', '🔍 메뉴판 가격·오타 전수 점검'], ['폰 화면 확인', '📱 모바일 화면 깨짐 확인'], ['검수 현황 보고', '📋 검수 완료 리스트 보고']] },
      translator: { greet: '캡틴, 번역할 메뉴 있으세요?', quick: [['새 메뉴 번역', '🌐 새 메뉴 4개국어 번역 시작'], ['베트남어 다듬기', '✍️ 베트남어 현지 표현 자연스럽게 다듬기'], ['번역 현황 보고', '📋 번역 완료 현황 보고']] },
      sorter:     { greet: '방문 현황은 30분마다 보고해요.', quick: [['지금 보고해', '📊 지금 보고해'], ['상세 보기', '🔍 상세 보기'], ['어제와 비교', '📅 어제와 비교']] },
      inspector:  { greet: '2차 감찰할 가게 있으세요?', quick: [['2차 교차 감찰', '🛡️ 배포 예정 가게 2차 교차 감찰'], ['오타·링크 확인', '🔎 오타·링크 깨짐 최종 확인'], ['감찰 현황 보고', '📋 감찰 통과 현황 보고']] },
      staffing:   { greet: '오늘 인력 현황 보실까요?', quick: [['인력 배치 보고', '📅 오늘 주·야간 인력 배치 보고'], ['거래처 실적', '📊 이번 달 거래처 실적 확인'], ['미보고 거래처', '📋 미보고 거래처 점검']] },
      reader:     { greet: '새 메뉴판 사진 읽을까요?', quick: [['메뉴판 해석', '📑 신규 메뉴판 원문 해석 시작'], ['가격 누락 대조', '💰 가격·옵션 누락 정밀 대조'], ['해석 현황 보고', '📋 해석 완료 리스트 보고']] },
      auditor:    { greet: '배포 전 최종 점검할까요?', quick: [['최종 데이터 감사', '📊 전체 메뉴 데이터 최종 감사'], ['링크·사진 점검', '🔗 배포 링크·이미지 깨짐 점검'], ['감사 보고서 제출', '📋 감사 완료 보고서 제출']] },
      vip_jung:   { greet: '아우님! 커피 한잔 할까?', quick: [['커피 대접', '☕ 형님 커피 한 잔 대접하기'], ['사무실 안내', '🤝 직원들 둘러보시게 안내']] },
    };

    // 전체화면 상태창 가운데 캐릭터: 기본은 걷기 그림 정면 1장. 제미나이 영상을 넣으면 video: 'fullbody/<파일>.mp4'
    const FULLBODY = {
      claude:   { bgVideo: 'status/claude-full.mp4?v=1', idleVideo: 'status/claude-idle.mp4?v=1', talkVideo: 'status/claude-talk.mp4?v=1' },
      sorter:   { bgVideo: 'status/sorter-full.mp4?v=1' },
      staffing: { bgVideo: 'status/staffing-full.mp4?v=1' },
      agy: { dir: 'front' }, reader: { dir: 'front' }, auditor: { dir: 'front' }, inspector: { dir: 'front' },
    };

    // 상태창 글자에서 이모지 빼기(캡틴 지시 2026-11-27). 버튼의 data-q 값(지시 판단용)은 그대로 둔다
    function stripEmoji(el) {
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let t = w.nextNode(); t; t = w.nextNode()) {
        const raw = t.nodeValue, cut = raw.replace(EMOJI_RE, '');
        if (cut === raw) continue;
        t.nodeValue = cut.replace(/^\s+/, '').replace(/\s{2,}/g, ' ');
      }
      el.querySelectorAll('input[placeholder]').forEach(i => {
        const v = i.placeholder.replace(EMOJI_RE, '').trim();
        if (v !== i.placeholder) i.placeholder = v;
      });
    }

    const vEsc = s =>String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
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
          voice('sorter', 'visit', 0.1);
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
        // 좁은 방·책상 옆에서도 대표석으로 튀지 않도록 더 가까운 반경(2.8~3.2) → 캡틴 본인 좌표까지 단계 탐색!
        [cap.x, cap.y + 3.0], [cap.x + 3.0, cap.y], [cap.x - 3.0, cap.y], [cap.x, cap.y - 3.0],
        [cap.x + 2.2, cap.y + 2.2], [cap.x - 2.2, cap.y + 2.2], [cap.x + 2.2, cap.y - 2.2], [cap.x - 2.2, cap.y - 2.2],
        [cap.x, cap.y],
      ];
      for (const [tx, ty] of cands) {
        if (canWalk(tx, ty)) return [tx, ty];
      }
      return [cap.x, cap.y];
    }

    // ---- 대화창 자리 정하기: 확대 카메라까지 반영한 '실제 화면 위치'로 캡틴·대화 상대(말풍선 포함)를 피함
    function charScreenBox(p) {
      const z = cam.z || 1, tx = cam.tx || 0, ty = cam.ty || 0;
      // 머리 위 말풍선까지 가리지 않게 위쪽 여유를 넉넉히(-24, 키 232 기준)
      return { x0: tx + (p.x - 5) * z, x1: tx + (p.x + 5) * z, y0: ty + (p.y - 24) * z, y1: ty + (p.y + 4) * z };
    }
    function placeModal() {
      if (modalBack.hidden || !modalTargets.length || modal.classList.contains('kbd-top') || modal.classList.contains('oa-full')) return;
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

    let statusAnimTimer = null;
    function stopStatusCharAnim() {
      if (statusAnimTimer) { clearTimeout(statusAnimTimer); statusAnimTimer = null; }
    }
    const STATUS_ACT_ORDER = {
      reader:     ['analyze', 'cheer', 'coffee', 'dance'],
      finder:     ['photo'],
      agy:        ['inspect'],
      translator: [],
      sorter:     [],
      staffing:   [],
      inspector:  ['sideBow', 'dance'],
      auditor:    [],
      captain:    ['greet', 'coffee', 'praise'],
      vip_jung:   ['greet', 'talk', 'thumb', 'coffee'],
    };
    function startStatusCharAnim(hit, imgEl, baseSrc) {
      stopStatusCharAnim();
      if (!imgEl) return;
      const wset = imgs.walk[hit];
      if (!wset) return;
      const order = STATUS_ACT_ORDER[hit] || ['drink', 'snack'];
      const clips = [];
      for (const act of order) {
        const arr = (wset[act] || []).filter(im => im && im.complete && im.naturalWidth > 0).map(im => im.src);
        if (arr.length >= 2) clips.push({ act, frames: arr });
      }
      if (!clips.length) return;
      let clipIdx = 0, frameIdx = 0, resting = true;
      const step = () => {
        if (modalBack.hidden || !document.body.contains(imgEl)) { stopStatusCharAnim(); return; }
        if (resting) {
          imgEl.src = baseSrc;
          resting = false;
          frameIdx = 0;
          statusAnimTimer = setTimeout(step, 1500);
          return;
        }
        const clip = clips[clipIdx % clips.length];
        const isShort = clip.frames.length <= 4;
        const totalFrames = isShort ? clip.frames.length * 2 : clip.frames.length;
        if (frameIdx < totalFrames) {
          imgEl.src = clip.frames[frameIdx % clip.frames.length];
          frameIdx++;
          statusAnimTimer = setTimeout(step, isShort ? 680 : 220);
        } else {
          clipIdx = (clipIdx + 1) % clips.length;
          resting = true;
          statusAnimTimer = setTimeout(step, 260);
        }
      };
      statusAnimTimer = setTimeout(step, 1200);
    }

    function closeTalkModal(keepOrderBubble = false) {
      stopStatusCharAnim();
      if (!modalBack.hidden) SFX.close();
      modal.classList.remove('kbd-top');
      modalBack.hidden = true;
      resumeTalkNpc(keepOrderBubble);
    }

    // 모바일·낮은 화면에서 입력창에 포커스(키보드 올라옴) 시 대화창을 화면 최상단 슬림 입력바로 고정해 키보드 가림 방지!
    const isCompactKbd = () => window.matchMedia('(pointer: coarse), (max-width: 960px), (max-height: 540px)').matches;
    let kbdBlurTimer = null;
    modal.addEventListener('focusin', e => {
      if (!e.target?.matches?.('input, textarea')) return;
      if (kbdBlurTimer) { clearTimeout(kbdBlurTimer); kbdBlurTimer = null; }
      if (isCompactKbd()) {
        modal.classList.add('kbd-top');
        modal.scrollTop = 0;
        // 모바일 키보드에서 커서 앞쪽('<가게명>')이 보이도록 좌측 스크롤 보정
        requestAnimationFrame(() => { try { e.target.scrollLeft = 0; } catch {} });
      }
    });
    modal.addEventListener('focusout', e => {
      if (!e.target?.matches?.('input, textarea')) return;
      if (kbdBlurTimer) clearTimeout(kbdBlurTimer);
      kbdBlurTimer = setTimeout(() => {
        if (!modal.contains(document.activeElement) || !document.activeElement?.matches?.('input, textarea')) {
          modal.classList.remove('kbd-top');
          if (!modalBack.hidden) placeModal();
        }
      }, 220);
    });

    function openTalkModal(hit) {
      // 이전 대화 중인 직원이 있었다면 먼저 자기 자리로 복귀
      if (activeTalkNpc && activeTalkNpc.id !== hit) resumeTalkNpc(false);

      const c = CHARS[hit], n = npcs[hit], cap = npcs.captain;
      const dcfg = DIALOG_CFG[hit] || { greet: '캡틴, 지시하실 일 있으세요?', quick: [['업무 보고', '📋 현재 업무 보고']] };

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
            ? { num: '1', label: '배포 확정', action: 'deploy' }
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
        ? `<button type="button" class="oa-q-btn appr-link" data-open-order="${escHtml(fallbackOrder.id)}">📋 ${npcAppr ? '결재 내용 보기' : '결재·지시 보기'}</button>` : '';
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
      if (hit !== 'captain') voice(hit, 'call', 0.12, { interrupt: true });
      // 전체화면 상태창: 게임 안에서는 NPC처럼 짧게 말하고, 자세한 내용은 대시보드에서(캡틴 지시 2026-11-27)
      const cut = (t, n) => { t = noEmoji(t).replace(/["“”]/g, ''); return t.length > n ? t.slice(0, n) + '…' : t; };
      const talk = [];
      let choices = '';
      if (npcAppr) {
        talk.push('결재 기다리는 게 있어요.');
        talk.push(`"${cut(npcAppr.title || npcAppr.text || '결재 건', 13)}"`);
        choices = apprChoices.map((ch, idx) => `<button type="button" class="oa-f-choice" data-appr-idx="${idx}">${escHtml(cut(ch.label, 12))}</button>`).join('');
      } else if (hit === 'sorter' && latestVisits) {
        const v = latestVisits;
        const diff = v.ydayVis == null ? null : v.vis - v.ydayVis;
        talk.push(`오늘 ${v.vis}명 다녀갔어요. (${v.hm})`);
        if (diff != null) talk.push(diff > 0 ? `어제보다 ${diff}명 많아요!` : diff < 0 ? `어제보다 ${-diff}명 적어요.` : '어제랑 똑같아요.');
      } else if (q && q.kind !== 'visits') {
        talk.push(q.type === 'exc' ? '확인하실 게 있어요!' : '작업 하나 끝냈어요!');
        talk.push(cut(q.title, 15));
        choices = `<button type="button" class="oa-f-choice" data-quest-act>${escHtml(cut(q.actionLabel, 12))}</button>`;
      } else {
        talk.push(dcfg.greet);
      }
      const tabs = [{ id: 'work', label: '대화' }];
      const firstTab = 'work';
      const fb = FULLBODY[hit] || {};
      const bodyV = (hit === 'claude' || hit === 'inspector') ? 'swap1' : 'orig2k_df4';
      const bodyImg = `/static/office-anime/assets/walk/${c.asset || hit}-${fb.dir || 'front'}-${fb.frame || 1}.webp?v=${bodyV}`;
      const bgVidHtml = fb.bgVideo
        ? `<video class="oa-f-bgvid" src="/static/office-anime/assets/${fb.bgVideo}" autoplay muted loop playsinline></video>`
        : '';
      const bodyHtml = fb.bgVideo ? '' : (fb.video
        ? `<video class="oa-f-body" src="/static/office-anime/assets/${fb.video}" poster="${bodyImg}" autoplay muted loop playsinline></video>`
        : `<img class="oa-f-body" src="${bodyImg}" alt="${c.name}">`);
      modal.classList.add('oa-full');
      modal.innerHTML = `
        <div class="oa-f-bg">${bgVidHtml}</div>
        <button type="button" class="oa-f-close" data-close aria-label="닫기">×</button>
        <div class="oa-f-left">
          <div class="oa-f-tabs">
            ${tabs.map(t => `<button type="button" class="oa-f-tab ${t.id === firstTab ? 'on' : ''}" data-tab="${t.id}">${t.label}</button>`).join('')}
          </div>
          <div class="oa-f-panel">
            <div class="oa-f-page" data-page="work">
              <div class="oa-f-say"><span class="oa-f-who">${c.name}</span>${talk.map(t => `<p>${escHtml(t)}</p>`).join('')}</div>
              <div class="oa-m-res oa-f-say oa-f-reply" data-res hidden></div>
              ${choices ? `<div class="oa-f-choices">${choices}</div>` : ''}
            </div>
          </div>
        </div>
        <div class="oa-f-char">${bodyHtml}</div>
        <div class="oa-f-right">
          <div class="oa-f-name"><b>${c.name}</b><span>${c.role}</span></div>
          <div class="oa-f-btns">
            ${orderBtn}
            ${dcfg.quick.map(q => { const [lb, od] = Array.isArray(q) ? q : [q, q]; return `<button type="button" class="oa-q-btn" data-q="${escHtml(od)}">${escHtml(lb)}</button>`; }).join('')}
            ${detailBtn}
          </div>
        </div>
        <form class="oa-m-form oa-f-form" data-order-form>
          <input type="text" name="msg" placeholder="${c.name}에게 직접 지시할 내용을 입력하세요…" autocomplete="off" required>
          <button type="submit">📣 지시 전달</button>
        </form>`;
      stripEmoji(modal);
      if (!fb.bgVideo && !fb.video) {
        startStatusCharAnim(hit, modal.querySelector('.oa-f-body'), bodyImg);
      } else {
        stopStatusCharAnim();
      }
      if (!modal._noEmojiObs) {
        // 나중에 바뀌는 안내 글(지시 전달 결과 등)에도 이모지가 들어가지 않게
        modal._noEmojiObs = new MutationObserver(() => { if (modal.classList.contains('oa-full')) stripEmoji(modal); });
        modal._noEmojiObs.observe(modal, { childList: true, subtree: true, characterData: true });
      }
      modal.querySelectorAll('[data-tab]').forEach(tb => tb.addEventListener('click', () => {
        SFX.tap();
        modal.querySelectorAll('[data-tab]').forEach(x => x.classList.toggle('on', x === tb));
        modal.querySelectorAll('[data-page]').forEach(p => { p.hidden = p.dataset.page !== tb.dataset.tab; });
      }));

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
          if (ch.action === 'deploy') {
            btn.disabled = true;
            const resEl = modal.querySelector('[data-res]');
            if (resEl) { resEl.hidden = false; resEl.textContent = '배포 준비할게요, 잠시만요…'; }
            if (opts.onDeployOrder) {
              const r = await opts.onDeployOrder(npcAppr.id);
              if (r?.error) {
                btn.disabled = false;
                if (resEl) resEl.textContent = '잘 안 됐어요. 다시 해 주세요.';
                return;
              }
            } else if (opts.onOpenOrder) {
              closeTalkModal(false);
              opts.onOpenOrder(npcAppr.id);
              return;
            }
            SFX.fanfare();
            playCaptainAction('stamp');
            spawnBurst(n.x, n.y, '🚀 배포 시작! +150 EXP', 150);
            n.bubble = `🚀 [${(npcAppr.deploy || []).join(', ') || '가게'}] 배포를 바로 시작합니다!`;
            n.bubbleType = 'ok';
            if (resEl) resEl.textContent = '배포 시작했어요!';
            setTimeout(() => closeTalkModal(true), 900);
            return;
          }
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
            if (resEl) { resEl.hidden = false; resEl.textContent = '어떻게 고칠까요? 적어 주세요.'; }
            return;
          }
          const resEl = modal.querySelector('[data-res]');
          if (resEl) { resEl.hidden = false; resEl.textContent = '네, 전달할게요…'; }
          if (opts.onReplyOrder) {
            const r = await opts.onReplyOrder({ id: npcAppr.id, text: ch.replyText || ch.label, approve: !!ch.approve });
            if (r?.error) { if (resEl) resEl.textContent = '잘 안 됐어요. 다시 해 주세요.'; return; }
          }
          SFX.fanfare();
          if (ch.approve) playCaptainAction('stamp');
          else if (hit !== 'captain') voice(hit, 'ok', 0.25);
          spawnBurst(n.x, n.y, '✅ 결재 완료! +100 EXP', 100);
          n.bubble = `✅ [${ch.num}번] 결재 확인했습니다! 바로 진행합니다!`;
          n.bubbleType = 'ok';
          if (resEl) resEl.textContent = '알겠습니다, 진행할게요!';
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
        resEl.textContent = '잠시만요, 전달할게요…';
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
            resEl.textContent = '"가게명"만 바꿔서 보내 주세요.';
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
            : v.ydayVis == null ? '어제 기록은 아직 없어요.'
            : (v.vis - v.ydayVis > 0 ? `어제보다 ${v.vis - v.ydayVis}명 많아요!` : v.vis - v.ydayVis < 0 ? `어제보다 ${v.ydayVis - v.vis}명 적어요.` : '어제랑 똑같아요.');
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
          resEl.textContent = `오늘 ${r.report.vis}명이에요. (${r.report.hm})`;
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
            resEl.textContent = r?.error ? '전달이 안 됐어요. 다시 해 주세요.' : '네, 바로 시작할게요!';
          } else {
            const r = await fetch('/api/order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'X-Dashboard': '1' },
              body: JSON.stringify({ text: fullOrder })
            });
            resEl.textContent = r.ok ? '네, 바로 시작할게요!' : '네, 알겠습니다! (시연)';
          }
        } catch {
          resEl.textContent = '네, 알겠습니다!';
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
      // 전체화면 상태창이 잘리지 않게, 밀려 있던 사무실 틀 스크롤을 맨 위로
      const rotWrap = root.querySelector('.oa-rot-wrap');
      if (rotWrap) { rotWrap.scrollTop = 0; rotWrap.scrollLeft = 0; }
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
        // 🥊 신관 복싱 짐 샌드백을 직접 클릭하면 앞으로 걸어가서 바로 주먹/발차기 타격!
        if (Math.hypot(px - BAG.cx, py - 64.5) < 6.8) {
          const cap = npcs.captain;
          const standX = (cap.x <= BAG.cx) ? 112.2 : 122.8;
          const standY = 76.0;
          const act = (Math.random() < 0.5) ? 'punch' : 'kick';
          SFX.walkClick();
          clickRing = { x: standX, y: standY, born: performance.now() };
          if (Math.hypot(cap.x - BAG.cx, cap.y - BAG.cy) < 10.5) {
            playCaptainAction(act);
          } else {
            walkCaptainSafe(standX, standY, {
              bubble: '🥊 샌드백 치러 가자!',
              onArrive: () => { cap.mode = 'stand'; playCaptainAction(act); }
            });
          }
          return;
        }
        // 🛋️ 신관 회의실 의자 · VIP 소파 · 휴게실 소파 · 스낵바/냉장고 직접 클릭 시 바로 이동해 착석·음료 마시기!
        const hitSpot = CAP_SPOTS.find(sp => sp.box && px >= sp.box[0] && px <= sp.box[2] && py >= sp.box[1] && py <= sp.box[3]);
        if (hitSpot) {
          SFX.walkClick();
          clickRing = { x: hitSpot.stand[0], y: hitSpot.stand[1], born: performance.now() };
          spawnBurst(hitSpot.stand[0], hitSpot.stand[1], `${hitSpot.name} 선택`, 0);
          goCaptainSpot(hitSpot);
          return;
        }
        if (canWalk(px, py)) {
          npcs.captain.customSeat = null;
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

    // ---------------------------------------------------------------- 신관 대회의실 6명 자동 회의 연출 (제작 완료 · 배포 대기 중!)
    let confMeetingActive = false;
    let confChatTimer = null;
    let confChatIdx = 0;
    const CONF_LINES = [
      { id: 'claude',     say: '📋 캡틴 배포 확정 대기 중입니다. 마지막 점검해 볼까요?' },
      { id: 'finder',     say: '📷 메뉴 사진 해상도랑 색감 보정, 깔끔하게 끝냈어요!' },
      { id: 'translator', say: '🌐 한·베·영·중 4개국어 번역 오타 0건 확인했습니다!' },
      { id: 'inspector',  say: '🛡️ 가격·옵션 교차 감찰까지 이상 없습니다.' },
      { id: 'auditor',    say: '📊 링크·데이터 무결성 최종 감사 100% 통과입니다.' },
      { id: 'reader',     say: '📑 메뉴판 구성도 완벽해요! 캡틴 배포 확정만 남았네요~' },
    ];
    function startConfMeeting(depOrder = null) {
      if (briefingActive) return;
      if (!confMeetingActive) {
        confMeetingActive = true;
        const shopNm = depOrder?.title || (depOrder?.deploy || []).join(', ') || '가게';
        log(`🏢 [${shopNm}] 배포 대기 — 6명이 신관 대회의실에 모여 최종 점검 회의를 시작합니다.`);
      }
      for (const id of CONF_IDS) {
        const n = npcs[id], s = CONF_SEATS[id];
        if (!n || !s) continue;
        if (n.mode === 'conf' || n.confWalking) continue;
        if (activeTalkNpc && activeTalkNpc.id === id) continue;
        if (realBusySet.has(id)) continue;
        n.confWalking = true;
        n.emote = null; n.emoteLoop = false;
        const ok = walkNpcSafe(id, s.stand[0], s.stand[1], {
          force: true,
          bubble: '🏢 대회의실로 이동 중…',
          onArrive: () => {
            n.confWalking = false;
            if (!confMeetingActive || briefingActive) return;
            n.x = s.x; n.y = s.y; n.mode = 'conf'; n.dir = s.facing; n.bubble = '';
          }
        });
        if (!ok) {
          n.confWalking = false;
          n.x = s.x; n.y = s.y; n.mode = 'conf'; n.dir = s.facing; n.bubble = '';
        }
      }
      if (!confChatTimer) {
        confChatTimer = setInterval(() => {
          if (!confMeetingActive || briefingActive) return;
          const seatedIds = CONF_IDS.filter(id => npcs[id]?.mode === 'conf');
          if (seatedIds.length < 2) return;
          // 말풍선 겹침 방지: 이전 발언자 말풍선 정리 후 순서대로 1명씩 발언!
          for (const id of CONF_IDS) {
            if (npcs[id]?.mode === 'conf') npcs[id].bubble = '';
          }
          const line = CONF_LINES[confChatIdx % CONF_LINES.length];
          confChatIdx++;
          const sp = npcs[line.id];
          if (sp && sp.mode === 'conf') {
            sp.bubble = line.say;
            sp.bubbleType = line.id === 'claude' ? 'meet' : 'ok';
          }
        }, 4200);
      }
    }
    function endConfMeeting(walkHome = true) {
      if (!confMeetingActive) return;
      confMeetingActive = false;
      if (confChatTimer) { clearInterval(confChatTimer); confChatTimer = null; }
      for (const id of CONF_IDS) {
        const n = npcs[id];
        if (!n) continue;
        n.confWalking = false;
        if (n.mode === 'conf') {
          n.bubble = '';
          if (walkHome && !(activeTalkNpc && activeTalkNpc.id === id)) {
            const s = CONF_SEATS[id];
            n.x = s.stand[0]; n.y = s.stand[1]; n.mode = 'stand';
            walkNpcSafe(id, CHARS[id].home[0], CHARS[id].home[1], {
              force: true,
              bubble: '↩ 자리로 복귀 중…',
              onArrive: () => seatNpc(id),
            });
          } else {
            n.mode = 'stand';
          }
        }
      }
    }

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
      // 이미 자기 자리에 앉아 있는데 '자리로 돌아가기'가 또 오면(늦게 도착한 타이머) 일어서지 않음 (신관 소파 착석 중엔 정상 출발!)
      if (n.mode === 'idle' && !n.customSeat && c && Math.hypot(tx - c.home[0], ty - c.home[1]) < 0.6) return true;
      // 착석 상태에서 출발할 때는 소파 앞 바닥(customSeat.stand) 또는 의자 옆 바닥(standPos)에서 출발해 절대 벽·책상을 뚫지 않음!
      const exitPt = (n.customSeat && n.customSeat.stand) ? n.customSeat.stand : ((n.mode === 'idle' && c?.standPos) ? c.standPos : null);
      const sx = exitPt ? exitPt[0] : n.x;
      const sy = exitPt ? exitPt[1] : n.y;
      const pts = findPath(sx, sy, tx, ty);
      if (!pts) {
        // 경로를 못 찾으면 절대 벽을 직선 통과하지 않고 안전하게 제자리 유지!
        if (opts2.onArrive) opts2.onArrive();
        return false;
      }
      if (exitPt) {
        n.x = sx; n.y = sy;
      }
      n.customSeat = null;
      sendPath(id, pts, opts2);
      return true;
    }

    function startBriefing() {
      if (briefingActive) return;
      stopInspectorSolo(false);
      endConfMeeting(false);
      dismissVipForBriefing();
      briefingActive = true;
      SFX.brief();
      voice('captain', 'brief', 0.5);
      clearBriefTimers();
      if (activeTalkNpc) closeTalkModal(false);
      briefStartBtn.hidden = true;
      briefStopBtn.hidden = false;
      stage.classList.add('oa-briefing');

      const cap = npcs.captain;
      const cl = npcs.claude;
      const staffIds = Object.keys(CHARS).filter(id => id !== 'captain' && id !== 'claude' && !CHARS[id].guest);

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
      stage.classList.remove('oa-briefing');

      const cap = npcs.captain;
      const cl = npcs.claude;
      const staffIds = Object.keys(CHARS).filter(id => id !== 'captain' && id !== 'claude' && !CHARS[id].guest);

      cap.bubble = '✋ 오늘은 여기까지 하지. 모두 수고했다!';
      cap.bubbleType = 'meet';
      voice('captain', 'end', 0, { interrupt: true });
      log('✋ 캡틴: "오늘은 여기까지 하지." — 보고 종료');

      // 0.7초 뒤 전 직원 9명 전원 12프레임 실제 영상 정중 인사 (0.04초 미세 시차로 자연스럽게!)
      briefTimers.push(setTimeout(() => {
        const nowS = performance.now() / 1000;
        const allStaff = ['claude', ...staffIds];
        const midIdx = Math.floor(staffIds.length / 2);
        const lastIdx = staffIds.length - 1;
        for (const sid of allStaff) {
          const n = npcs[sid];
          n.path = []; n.onArrive = null;
          const idx = staffIds.indexOf(sid);
          const stagger = sid === 'claude' ? 0 : (idx >= 0 ? idx * 0.045 : 0);
          // 말풍선 겹침 방지: 단상 비서실장 + 대열 중앙 대표 1명 총 2곳에만 깔끔하게 표시!
          const endBub = (sid === 'claude') ? '🙇 수고하셨습니다, 캡틴!'
            : (idx === midIdx) ? '🙇 네, 알겠습니다 캡틴!'
            : '';
          if (imgs.walk[sid]?.bow?.length === 12) {
            n.dir = (sid === 'claude') ? 'east' : 'back';
            n.mode = 'emote'; n.emote = 'bow'; n.emoteLoop = false;
            n.emoteStart = nowS + stagger;
            n.bubble = endBub;
            n.bubbleType = endBub ? 'ok' : '';
          } else {
            n.mode = 'stand';
            n.dir = (sid === 'claude') ? 'east' : 'back';
            n.bowStart = nowS + stagger;
            n.bowUntil = n.bowStart + 1.95;
            n.bubble = endBub;
            n.bubbleType = endBub ? 'ok' : '';
          }
        }
        voice('claude', 'greet', 0.35);
        log('🙇 비서실장 & 전 직원 9명: 캡틴께 정중히 인사 후 해산 준비');
        SFX.fanfare();
        spawnBurst(50.0, 29.8, '🎉 보고 완료 +50 EXP', 50);

        // 전 직원 12프레임 인사 끝난 뒤(3.1초 후) 각자 자리로 A* 안전 복귀!
        briefTimers.push(setTimeout(() => {
          cap.bubble = '';
          for (const sid of allStaff) {
            const n = npcs[sid];
            const c = CHARS[sid];
            n.emote = null; n.emoteLoop = false;
            n.bubble = '';
            walkNpcSafe(sid, c.home[0], c.home[1], {
              onArrive: () => seatNpc(sid)
            });
          }
        }, 3100));
      }, 650));
    }

    const briefCofBtn   = root.querySelector('[data-brief-cof]');
    root.querySelector('[data-brief-dance]')?.addEventListener('click', () => danceParty());
    root.querySelector('[data-inspector-dance]')?.addEventListener('click', () => inspectorSoloDance());
    root.querySelector('[data-cap-greet]')?.addEventListener('click', () => playCaptainAction('greet'));
    root.querySelector('[data-cap-coffee]')?.addEventListener('click', () => playCaptainAction('coffee'));
    // 모바일 멀티터치(왼손 조이스틱 드래그 + 오른손 발차기 탭)에서 즉시 발동하도록 pointerdown 사용!
    [['[data-cap-kick]', 'kick'], ['[data-cap-punch]', 'punch'], ['[data-cap-combo]', 'combo']].forEach(([sel, act]) => {
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
      syncBgmByWork(busy.size > 0);
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
      // 배포 대기(제작 완료 · 배포 미확정) 시 6명 신관 대회의실 자동 회의 연출 연동!
      const hasDeployWait = liveOrders.length === 0 && latestOrders.some(o =>
        o.status === 'done' && o.deploy?.length && o.deployState !== 'done' && o.deployState !== 'running'
      );
      if (hasDeployWait && !briefingActive) {
        startConfMeeting(latestOrders.find(o => o.status === 'done' && o.deploy?.length && o.deployState !== 'done' && o.deployState !== 'running'));
      } else if (!hasDeployWait && confMeetingActive) {
        endConfMeeting(true);
      }

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
      return n && n.mode === 'idle' && !n.vipReserved && !realBusySet.has(id) && (!activeTalkNpc || activeTalkNpc.id !== id);
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
            if (emoteKey === 'water') { SFX.water(); if (id === 'sorter') voice('sorter', 'water', 0.25); }
            else if (emoteKey === 'clean') { SFX.sweep(); if (id === 'staffing') voice('staffing', 'clean', 0.25); }
            else if (emoteKey === 'sweep') { SFX.sweep(); if (id === 'claude') voice('claude', 'sweep', 0.25); }
            else if (emoteKey === 'photo') {
              n.emoteLoop = false;
              setTimeout(() => { if (!briefingActive && n.emote === 'photo') triggerCameraFlash(); }, 1050);
              setTimeout(() => { if (!briefingActive && n.emote === 'photo') { triggerCameraFlash(); voice('finder', 'snap', 0.1); } }, 1850);
            }
            else if (emoteKey === 'review') { n.emoteLoop = false; voice('translator', 'chat', 0.25); }
            else if (emoteKey === 'inspect') { n.emoteLoop = false; voice('agy', 'wow', 1.2); }
            else if (emoteKey === 'analyze') { n.emoteLoop = false; voice('reader', 'work', 0.2); }
            else if (emoteKey === 'cheer') { n.emoteLoop = false; voice('reader', 'aha', 0.35); }
            else if (emoteKey === 'coffee') { n.emoteLoop = false; SFX.coffee(); }
            else if (emoteKey === 'stretch') { n.emoteLoop = false; }
          } else {
            n.mode = 'stand';
            if (id === 'sorter' && workMsg.includes('포장')) voice('sorter', 'check', 0.2);
            else if (id === 'finder' && workMsg.includes('크로마키')) voice('finder', 'studio', 0.2);
            else if (id === 'translator' && workMsg.includes('번역')) voice('translator', 'chat', 0.2);
            else if (voiceKinds(id).includes('rest') && (workMsg.includes('커피') || workMsg.includes('환기'))) voice(id, 'rest', 0.25);
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
        if (voiceKinds(idA).includes('chat')) voice(idA, 'chat', 0.15);
        setTimeout(() => {
          if (briefingActive) return;
          a.bubble = ''; b.bubble = msgB; b.bubbleType = 'ok';
          if (voiceKinds(idB).includes('chat')) voice(idB, 'chat', 0.15);
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
      // 2. 비서실장: 복도 화분과 비서실장 책상 사이 공간 바닥 빗자루 청소
      () => {
        const leftSide = Math.random() < 0.5;
        return doChore('claude', leftSide ? 37.0 : 63.0, 41.2, 'front',
          '🧹 화분 옆 복도 청소하러 나왔습니다!', '🧹 복도 바닥 빗자루질 중… 깔끔하게!', 3600, '', 'sweep');
      },
      // 3. 인력 공급팀 팀장: 캡틴 책상 먼지 털기 (책상 좌측 앞쪽 y=23.0 밀착 → 먼지털이가 책상 상판 위를 직접 닦음!)
      () => doChore('staffing', 41.0, 22.4, 'east',
        '🪶 캡틴 책상 정돈하러 올라가는 중…', '✨ 캡틴 책상 먼지 닦아드렸습니다!', 3600, '', 'clean',
        [43.8, 22.2]),
      // 4. 운영 감찰관: 캡틴 커피 서빙 & 안부 여쭙기
      () => {
        if (!isFree('inspector')) return false;
        serveCoffee(); return true;
      },
      // 5. 시각 정보 비서: 스튜디오 카메라 촬영 (12프레임 + 하얀 플래시 + '찰칵! 완벽해요!')
      () => doChore('finder', 20.6, 43.2, 'front',
        '📷 카메라 들고 스튜디오 촬영 준비 중…', '📸 찰칵! 완벽한 메뉴판 사진이에요!', 3400, '', 'photo'),
      // 6. 감사실 2인방(운영 감찰관 + 데이터 감사관): 좌측 복도 또는 커피 라운지 교차 토론
      () => {
        const atLounge = Math.random() < 0.5;
        return doPairChat('inspector', 'auditor',
          atLounge ? 22.5 : 31.0, atLounge ? 20.0 : 45.5,
          atLounge ? 27.5 : 36.5, atLounge ? 20.0 : 45.5,
          '🛡️ 방금 검수한 가격표 교차 확인했나요?', '📊 네! 오타 0건, 100% 일치합니다!');
      },
      // 7. 수석 번역관: 좌측 복도에서 5개 언어 번역 검수 & 표현 다듬기 (비서실장 자리 가리지 않게 중앙 제외!)
      () => {
        if (!isFree('translator')) return false;
        return doChore('translator', 35.5, 45.5, 'front',
          '🌐 번역 톤 점검하러 가는 중…', '💬 베트남어·영어 메뉴 표현 자연스럽게 다듬었어요!', 3600, '', 'review');
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
        return doChore(pick, cx, 22.0, pick === 'reader' ? 'front' : 'back', '☕ 커피바 휴식 가는 중…', msg, 3400, '', pick === 'reader' ? 'coffee' : '');
      },
      // 10. 랜덤 대기 직원: 우측 테라스 창밖 구경(환기, 자료 해석 비서는 우아한 기지개 12프레임!)
      () => {
        const pool = ['finder', 'agy', 'translator', 'sorter', 'inspector', 'staffing', 'reader', 'auditor'].filter(isFree);
        if (!pool.length) return false;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        const tx = [76.5, 82.5, 88.5][Math.floor(Math.random() * 3)];
        return doChore(pick, tx, 19.8, pick === 'reader' ? 'front' : 'back', '🌤️ 테라스 바람 좀 쐬러 가는 중…', pick === 'reader' ? '🙆‍♀️ 후~ 기지개 쭉! 상쾌해요!' : '🌤️ 창밖 풍경이 좋네요… 잠시 환기 중!', 3400, '', pick === 'reader' ? 'stretch' : '');
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
      () => (isFree('inspector') && isFree('reader')) ? danceParty() : false,
      // 14. 신관 직원 휴게실 소파 휴식 (전 직원 9명 ChatGPT 12컷 sofa_front / sofa_left 활용!)
      () => {
        const pool = ['claude', 'finder', 'agy', 'translator', 'sorter', 'inspector', 'staffing', 'reader', 'auditor'].filter(id => isFree(id) && !npcs[id].customSeat);
        if (!pool.length) return false;
        const sofaSpots = [
          { id: 'lounge_top_l',  pose: 'sofa_front', x: 161.2, y: 69.5, headTopY: 58.8, clipY: 69.2, h: 158, facing: 'front', stand: [173.5, 69.5], msg: '🛋️ 휴게실 소파에서 잠깐 쉬고 갈게요~' },
          { id: 'lounge_top_r',  pose: 'sofa_front', x: 167.8, y: 69.5, headTopY: 58.8, clipY: 69.2, h: 158, facing: 'front', stand: [173.5, 69.5], msg: '☕ 소파에 앉으니 피로가 싹 풀리네요!' },
          { id: 'lounge_r_sofa', pose: 'sofa_left',  x: 192.7, y: 76.0, headTopY: 64.6, clipY: 100.0, h: 168, facing: 'west',  stand: [189.2, 81.5], msg: '🛋️ 창가 소파 자리 너무 편해요~' },
          { id: 'vip_sofa_l',    pose: 'sofa_front', x: 173.0, y: 24.0, headTopY: 13.8, clipY: 23.8, h: 162, facing: 'front', stand: [173.0, 32.5], msg: '📋 VIP 접견실 소파에서 자료 정리 중…' },
        ];
        const freeSpots = sofaSpots.filter(sp => !Object.values(npcs).some(o => o.customSeat && Math.hypot(o.customSeat.x - sp.x, o.customSeat.y - sp.y) < 2.2));
        if (!freeSpots.length) return false;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        const sp = freeSpots[Math.floor(Math.random() * freeSpots.length)];
        return walkNpcSafe(pick, sp.stand[0], sp.stand[1], {
          bubble: '🚶 신관 라운지 휴식 가는 중…',
          onArrive: () => {
            if (briefingActive) return;
            const n = npcs[pick];
            n.x = sp.x; n.y = sp.y; n.dir = sp.facing; n.mode = 'idle';
            n.customSeat = sp; n.bubble = sp.msg; n.bubbleType = 'ok';
            setTimeout(() => {
              if (briefingActive || (activeTalkNpc && activeTalkNpc.id === pick)) return;
              if (n.customSeat === sp) {
                n.x = sp.stand[0]; n.y = sp.stand[1];
                n.customSeat = null; n.mode = 'stand';
              }
              walkNpcSafe(pick, CHARS[pick].home[0], CHARS[pick].home[1], {
                bubble: '↩ 충전 완료! 자리로 복귀해요',
                onArrive: () => seatNpc(pick)
              });
            }, 9500 + Math.random() * 4500);
          }
        });
      },
      // 15. 신관 휴게실 음료 냉장고(drink) & 스낵바 커피·크루아상(snack) 체험!
      () => {
        const pool = ['claude', 'finder', 'agy', 'translator', 'sorter', 'inspector', 'staffing', 'reader', 'auditor'].filter(id => isFree(id) && !npcs[id].customSeat);
        if (!pool.length) return false;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        const isDrink = Math.random() < 0.5;
        return doChore(
          pick,
          isDrink ? 186.0 : 176.5, 68.4, 'front',
          isDrink ? '🥤 휴게실 냉장고 음료 마시러 가는 중…' : '🥐 스낵바 커피랑 크루아상 챙기러 가는 중…',
          isDrink ? '🥤 와~ 시원한 캔 음료 한 잔 최고예요!' : '☕ 갓 구운 크루아상이랑 커피 꿀맛이에요!',
          4800, '↩ 간식 충전 끝! 복귀해요', isDrink ? 'drink' : 'snack'
        );
      },
      // 14. 메뉴 검사관: 복도에서 스마트폰 메뉴판 정밀 점검 & 엄지척! (12프레임)
      () => doChore('agy', 63.0, 45.5, 'front',
        '📱 모바일 메뉴판 점검하러 가는 중…', '👍 우와, 모바일 메뉴판 진짜 깔끔하네요!', 3600, '', 'inspect'),
      // 15. 자료 해석 비서: 복도에서 메뉴 데이터 정밀 해석(analyze) 또는 아하! 기쁨(cheer) (12프레임)
      () => {
        const isCheer = Math.random() < 0.5;
        return doChore('reader', isCheer ? 60.0 : 37.5, 45.5, 'front',
          isCheer ? '💡 데이터 정리 완료! 잠깐 기분 전환 중…' : '📑 메뉴 가격표 데이터 해석 점검 중…',
          isCheer ? '✨ 아하! 딱 맞아떨어졌어요! 👍' : '👓 메뉴랑 가격표 빠짐없이 해석 완료!',
          3600, '', isCheer ? 'cheer' : 'analyze');
      },
    ];

    let lastDanceStage = -1;
    let soloDanceTimer = null, lastSoloStage = -1;
    const soloBtn = root.querySelector('[data-inspector-dance]');
    function stopInspectorSolo(returnHome = true) {
      if (soloDanceTimer) { clearTimeout(soloDanceTimer); soloDanceTimer = null; }
      soloBtn?.classList.remove('on');
      const cl = npcs.claude;
      if (!cl) return;
      if (cl.mode === 'emote' && cl.emote === 'dance') {
        stopDanceMusic();
        cl.emote = null; cl.emoteLoop = false; cl.bubble = '';
        if (returnHome && !briefingActive && !(activeTalkNpc && activeTalkNpc.id === 'claude')) {
          walkNpcSafe('claude', CHARS.claude.home[0], CHARS.claude.home[1], {
            onArrive: () => seatNpc('claude')
          });
        }
      }
    }
    function inspectorSoloDance() {
      if (briefingActive) return false;
      const cl = npcs.claude;
      if (!cl) return false;
      // 이미 솔로 댄스 중이면 한 번 더 눌러서 깔끔하게 종료·복귀
      if (soloDanceTimer || (cl.mode === 'emote' && cl.emote === 'dance')) {
        stopInspectorSolo(true);
        log('👍 비서실장 솔로 댄스 종료 — 자리로 복귀합니다.');
        return true;
      }
      const soloStages = [
        { name: '좌측 복도 라운지', pos: [37.2, 46.5] },
        { name: '우측 복도 라운지', pos: [62.7, 46.5] },
        { name: '우측 햇살 테라스', pos: [78.5, 19.8] },
        { name: '좌측 커피바 앞',   pos: [27.5, 22.5] },
        { name: '맨 아래 나무 바닥', pos: [50.0, 93.5] },
      ];
      lastSoloStage = (lastSoloStage + 1) % soloStages.length;
      const st = soloStages[lastSoloStage];
      soloBtn?.classList.add('on');
      cl.emote = null; cl.emoteLoop = false;
      log(`👍 비서실장 — ${st.name} 솔로 아이돌 댄스 무대!`);
      walkNpcSafe('claude', st.pos[0], st.pos[1], {
        bubble: `👍 ${st.name} 솔로 무대로 이동 중…`,
        onArrive: () => {
          if (briefingActive) { soloBtn?.classList.remove('on'); return; }
          cl.dir = 'front';
          cl.mode = 'emote'; cl.emote = 'dance'; cl.emoteLoop = true;
          cl.emoteStart = performance.now() / 1000;
          cl.bubble = '👍✨ 비서실장 솔로 댄스 타임!';
          cl.bubbleType = 'meet';
          playDanceMusic('inspector');
          spawnBurst(st.pos[0], st.pos[1] - 1.8, '👍 비서실장 솔로 댄스! +25 EXP', 25);
          soloDanceTimer = setTimeout(() => {
            soloDanceTimer = null;
            soloBtn?.classList.remove('on');
            stopDanceMusic();
            if (briefingActive || (activeTalkNpc && activeTalkNpc.id === 'claude')) return;
            cl.emote = null; cl.emoteLoop = false; cl.bubble = '';
            walkNpcSafe('claude', CHARS.claude.home[0], CHARS.claude.home[1], {
              bubble: '😎 솔로 무대 끝! 자리로 복귀합니다.',
              onArrive: () => seatNpc('claude')
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
        { name: '맨 아래 나무 바닥', a: [46.0, 93.5], b: [54.0, 93.5], bx: 50.0, by: 91.5 },
      ];
      let sIdx = Math.floor(Math.random() * stages.length);
      if (sIdx === lastDanceStage) sIdx = (sIdx + 1) % stages.length;
      lastDanceStage = sIdx;
      const st = stages[sIdx];
      const dancers = [
        { id: 'inspector', tx: st.a[0], ty: st.a[1], go: `💃 ${st.name} 무대로 이동 중…`, msg: '💃✨ 신나는 아이돌 댄스 타임!' },
        { id: 'reader', tx: st.b[0], ty: st.b[1], go: '🎶 같이 춤추러 가요!', msg: '🎶 같이 춤춰요 캡틴! ✨' },
      ];
      // 2명 모두 도착 → 먼저 인트로 멘트("자, 음악 주세요!" 등) 끝까지 말함 → 멘트 끝나자마자 음악 + 2인 칼군무 동시 시작 + 7.2초 뒤 동시 종료!
      const validDancers = dancers.filter(d => npcs[d.id]);
      let arrivedCount = 0;
      log(`💃 운영 감찰관 · 자료 해석 비서 — ${st.name} 합동 아이돌 댄스 타임!`);
      const startDuoSync = () => {
        if (briefingActive) return;
        const theme = (danceThemeIdx++ % 2 === 0) ? 'inspector' : 'reader';
        let launched = false;
        const launchMusicAndDance = () => {
          if (launched || briefingActive) return;
          launched = true;
          const syncStart = performance.now() / 1000;
          playDanceMusic(theme === 'inspector' ? 'claude' : 'reader');
          spawnBurst(st.bx, st.by, theme === 'inspector' ? '💃 운영 감찰관 댄스! +20 EXP' : '🎶 자료해석 댄스! +20 EXP', 20);
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
        // 1) 두 사람이 무대에 정렬해 서서 인트로 멘트 먼저 말함!
        for (const d of validDancers) {
          const dn = npcs[d.id];
          dn.dir = 'front'; dn.mode = 'stand';
          dn.bubble = (d.id === theme)
            ? (theme === 'inspector' ? '🎤 캡틴! 분위기 좀 띄워볼까요? 자, 음악 주세요!' : '🎤 자~ 신나게 같이 춤춰요, 캡틴!')
            : '🎶 준비 완료! 큐 사인 대기 중…';
          dn.bubbleType = 'meet';
        }
        // 2) 멘트 음성이 끝나는 순간(onEnd) 즉시 음악과 춤 동시 시작! (안전 폴백 6.5초)
        voice(theme === 'reader' ? 'reader' : 'inspector', 'dance', 0, { interrupt: true, onEnd: launchMusicAndDance });
        setTimeout(launchMusicAndDance, 6500);
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

    // ---------------------------------------------------------------- NANA VINA 정은수 대표님(VIP 손님) 자동 방문·커피·직원 순회·퇴장 반복 루프!
    if (npcs.vip_jung) {
      npcs.vip_jung.hidden = true;
      npcs.vip_jung.mode = 'stand';
    }
    let vipActive = false;
    let vipTimers = [];
    let nextVipTimer = null;
    const vipSetTimeout = (fn, ms) => { const id = setTimeout(fn, ms); vipTimers.push(id); return id; };
    const clearVipTimers = () => { vipTimers.forEach(id => { clearTimeout(id); clearInterval(id); }); vipTimers = []; };
    function dismissVipForBriefing() {
      clearVipTimers();
      // 모든 직원의 VIP 예약 플래그 즉시 해제 → 보고 정렬에 100% 정상 합류!
      for (const n of Object.values(npcs)) { n.vipReserved = false; }
      const v = npcs.vip_jung;
      if (!v || v.hidden) { vipActive = false; return; }
      v.emote = null; v.emoteLoop = false;
      v.path = []; v.onArrive = null;
      log('👋 전체 보고 시작 — 정은수 대표님께서 자리를 비워주시고 사무실 밖으로 나가십니다.');
      const ok = walkNpcSafe('vip_jung', 50.0, 96.5, {
        force: true,
        bubble: (voice('vip_jung', 'meeting'), '👋 회의 시작하네! 아우님, 나 먼저 나가 있을게~'),
        bubbleType: 'meet',
        onArrive: () => {
          v.hidden = true; v.bubble = ''; v.mode = 'stand';
          vipActive = false;
          scheduleNextVip();
        }
      });
      if (!ok) {
        v.hidden = true; v.bubble = ''; v.mode = 'stand';
        vipActive = false;
        scheduleNextVip();
      }
    }
    function startVipVisit() {
      const v = npcs.vip_jung;
      if (!v || vipActive || briefingActive) return false;
      clearVipTimers();
      if (nextVipTimer) { clearTimeout(nextVipTimer); nextVipTimer = null; }
      vipActive = true;
      lsSet('oa_vip_last_at', String(Date.now()));
      let vipGreetVoiced = false;
      const pickOne = arr => arr[Math.floor(Math.random() * arr.length)];
      const arriveSay = pickOne([
        '🤝 아우님! NANA VINA 정은수 왔어!',
        '👋 아우님~ 지나가는 길에 얼굴 보러 들렀어!',
        '😊 아우님! 오늘도 열심히 일하고 있나 보네!',
        '🤝 NANA VINA 정은수 형님이야! 잠깐 들렀어!',
      ]);
      const greetSay = pickOne([
        '🤝 아우님! 요즘 사업 잘 되지? 잠깐 들렀어!',
        '😄 아우님, QR메뉴 사업 날로 번창하네! 멋지다!',
        '✨ 오늘 사무실 분위기 진짜 활기차네! 잘하고 있어!',
        '🤝 아우님, 바쁜데 잠깐 얼굴만 보고 갈게!',
      ]);
      const capGreetReply = pickOne([
        '😄 형님 오셨어요! 커피 한 잔 하시고 편히 보세요!',
        '😄 어서 오세요 형님! 마침 잘 오셨습니다!',
        '😊 형님, 늘 응원해 주셔서 감사해요! 커피 한 잔 하세요!',
        '😄 정은수 형님! 오늘도 편하게 둘러보고 가세요!',
      ]);
      const coffeeSay = pickOne([
        '☕ 여기 사무실 커피 향이 진짜 좋네~',
        '☕ 크~ 역시 아우님네 사무실 커피가 제일 맛있어!',
        '☕ 커피 한 잔 마시니까 피로가 싹 풀리네~',
        '☕ 이 원두 어디 거지? 향이 끝내주는데!',
      ]);
      const byeSay = pickOne([
        '👋 아우님, 나 먼저 들어가 볼게! 조만간 한잔하자!',
        '👋 잘 쉬다 간다 아우님! 저녁에 연락할게!',
        '👋 아우님, 오늘도 대박 나라! 또 놀러 올게!',
        '👋 다들 고생 많고, 아우님 조만간 식사 한번 하자!',
      ]);
      const capByeReply = pickOne([
        '😄 조심히 들어가세요 형님! 곧 연락드릴게요!',
        '😄 형님, 들어가세요! 조만간 한잔 모시겠습니다!',
        '😊 와주셔서 감사해요 형님! 또 들러 주세요!',
        '😄 네 형님! 안전 운전하시고 이따 연락드릴게요!',
      ]);
      v.hidden = false;
      v.x = 50.0; v.y = 96.5; v.dir = 'back'; v.mode = 'walk';
      v.emote = null; v.emoteLoop = false;
      log('🤝 NANA VINA 정은수 대표님(VIP)이 사무실에 방문하셨습니다!');

      const cap = npcs.captain;
      // 캡틴이 자리에 앉아 있으면 단상 앞, 돌아다니고 있으면 실제 캡틴 캐릭터 바로 앞으로 찾아감!
      const greetSpot = getSpotNearCaptain();
      const coffeeSpot = [15.5, 22.0];
      // 대표님이 담당자 standPos 바로 옆(4.5~5% 거리)에 서서, 담당자가 일어났을 때 깔끔하게 마주 보고 대화!
      const tourStops = [
        {
          id: 'claude', pos: [38.5, 35.2], dir: 'east',
          vipSays: ['✨ 비서실장님, 우리 아우님 잘 보좌해 주셔서 감사해요!', '✨ 비서실장님 덕분에 회사가 척척 돌아가네요!', '😊 오늘도 일정 관리하느라 고생 많으시죠?'],
          npcSays: ['😊 정은수 대표님, 언제든 편히 쉬다 가세요!', '😊 감사합니다 대표님! 커피 한 잔 더 드릴까요?', '😊 늘 응원해 주셔서 감사합니다, 정은수 대표님!'],
        },
        {
          id: 'finder', pos: [25.5, 43.2], dir: 'west',
          vipSays: ['📷 스튜디오 시설이 아주 끝내주네요! 고생 많으세요!', '📷 사진 보정 퀄리티가 전문 스튜디오급이네요!', '✨ 오늘도 예쁜 메뉴 사진 많이 고르셨나요?'],
          npcSays: ['😊 감사합니다 정은수 대표님!', '😄 좋게 봐주셔서 기분 좋네요 대표님!', '😊 대표님, 다음에 프로필 사진도 한 장 찍어드릴게요!'],
        },
        {
          id: 'translator', pos: [48.0, 71.5], dir: 'west',
          vipSays: ['🌐 5개국어 번역 퀄리티가 정말 대단하시던데요!', '🌐 베트남 현지 손님들도 메뉴판 보고 감탄하겠어요!', '✨ 번역팀 덕분에 글로벌 진출도 문제없겠네요!'],
          npcSays: ['😊 좋게 봐주셔서 감사합니다 대표님!', '😄 현지 말투까지 꼼꼼히 다듬고 있어요!', '😊 응원 감사합니다 정은수 대표님!'],
        },
        {
          id: 'staffing', pos: [53.5, 71.4], dir: 'east',
          vipSays: ['💪 현장 인력 관리 꼼꼼하시네요! 파이팅입니다!', '💪 일정이랑 인력 배치가 아주 빈틈없군요!', '✨ 오늘도 현장 지원하느라 수고 많으세요!'],
          npcSays: ['😄 감사합니다! NANA VINA도 파이팅입니다!', '😊 덕분에 힘이 나네요, 대표님!', '😄 늘 격려해 주셔서 감사합니다 대표님!'],
        },
        {
          id: 'sorter', pos: [74.5, 70.6], dir: 'east',
          vipSays: ['📦 선별팀이랑 방문 현황까지 완벽하군요!', '📦 오늘도 신규 가게 자료 엄청 많이 들어왔네요!', '✨ 방문 현황 실시간으로 챙기시느라 고생 많으세요!'],
          npcSays: ['😊 정은수 대표님 또 놀러 오세요!', '😄 감사합니다 대표님! 오늘 방문자도 쑥쑥 늘고 있어요!', '😊 다음에도 편하게 들러 주세요 대표님!'],
        },
        {
          id: 'inspector', pos: [15.8, 82.6], dir: 'west', voiceKey: 'chat',
          vipSays: ['🛡️ 운영 감찰관님, 2차 교차 감찰까지 꼼꼼히 챙겨 주셔서 든든해요!', '✨ 감찰관님 덕분에 메뉴판 완성도가 확실히 다르네요!', '😊 오늘도 최종 점검하느라 고생 많으십니다!'],
          npcSays: ['😊 감사합니다, 정은수 대표님! 꼼꼼하게 점검하겠습니다!', '😊 대표님, 늘 응원해 주셔서 큰 힘이 됩니다!', '😊 언제든 편하게 들러 주세요, 정은수 대표님!'],
        },
      ].map(s => ({ ...s, vipSay: pickOne(s.vipSays), npcSay: pickOne(s.npcSays) }));
      // 옆으로 정중 인사(12프레임) 보유 직원: 운영 감찰관(sideBow)·비서실장(bow) 모두 정은수 대표님 대화 후 방향 맞춰 인사!
      const HAS_SIDE_BOW = { inspector: true, claude: true };
      // 매 방문마다 2곳의 담당자 공간을 랜덤 선택해 순회 방문!
      const picked = [...tourStops].sort(() => Math.random() - 0.5).slice(0, 2);

      const exitOffice = () => {
        if (!v || v.hidden) { vipActive = false; return; }
        v.dir = 'front';
        if (imgs.walk.vip_jung?.greet?.length === 12) {
          v.mode = 'emote'; v.emote = 'greet'; v.emoteLoop = true; v.emoteStart = performance.now() / 1000;
        } else {
          v.emote = null; v.emoteLoop = false;
        }
        v.bubble = byeSay;
        voice('vip_jung', 'bye');
        v.bubbleType = 'meet';
        // 말풍선 겹침 방지: 대표님 작별 인사(2.0초) → 대표님 말풍선 닫고 캡틴 화답(2.2초)
        vipSetTimeout(() => {
          v.emote = null; v.emoteLoop = false;
          v.bubble = '';
          if (cap && !briefingActive) {
            const prev = cap.bubble;
            cap.bubble = capByeReply;
            cap.bubbleType = 'ok';
            setTimeout(() => { if (cap.bubble === capByeReply) cap.bubble = prev || ''; }, 2400);
          }
          walkNpcSafe('vip_jung', 50.0, 96.5, {
            force: true,
            bubble: '🚶 NANA VINA로 복귀 중…',
            onArrive: () => {
              v.hidden = true; v.bubble = ''; v.mode = 'stand';
              vipActive = false;
              log('👋 정은수 대표님께서 인사를 마치고 사무실을 나가셨습니다.');
              scheduleNextVip();
            }
          });
        }, 2000);
      };

      const visitStop = idx => {
        if (briefingActive) return;
        if (idx >= picked.length) { exitOffice(); return; }
        const st = picked[idx];
        const tn = npcs[st.id];
        const tc = CHARS[st.id];
        let vipArrived = false;
        let npcReady = !tn || (tn.mode === 'idle' && Math.hypot(tn.x - tc.home[0], tn.y - tc.home[1]) < 3.5);
        let started = false;
        let guardTimer = null;
        if (tn) tn.vipReserved = true;

        const startMeeting = () => {
          if (started) return;
          started = true;
          if (guardTimer) { clearTimeout(guardTimer); guardTimer = null; }
          if (briefingActive) {
            if (tn) tn.vipReserved = false;
            return;
          }
          v.dir = st.dir; v.mode = 'stand';
          // 1) 대표님이 먼저 말풍선 표시 + 친근한 대화(talk) 동작 + 담당자는 일어서서 대표님 쪽을 마주 보며 경청! (말풍선 겹침 0%)
          if (imgs.walk.vip_jung?.talk?.length === 12) {
            v.mode = 'emote'; v.emote = 'talk'; v.emoteLoop = true; v.emoteStart = performance.now() / 1000;
          }
          v.bubble = st.vipSay; v.bubbleType = 'meet';
          voice('vip_jung', st.voiceKey || st.id);
          if (tn && tc && !(activeTalkNpc && activeTalkNpc.id === st.id)) {
            tn.bubble = ''; // 이전 "기다리는 중" 말풍선 제거해 겹침 방지
            if (tc.standPos) { tn.x = tc.standPos[0]; tn.y = tc.standPos[1]; }
            tn.mode = 'stand'; tn.emote = null; tn.emoteLoop = false;
            faceEachOther(tn, v);
            faceEachOther(v, tn);
          }

          // 2) 2.2초 뒤: 대표님 말풍선을 닫고 담당자가 대답 + 대표님은 시원한 엄지척(thumb) 격려!
          vipSetTimeout(() => {
            v.bubble = '';
            if (imgs.walk.vip_jung?.thumb?.length === 12) {
              v.mode = 'emote'; v.emote = 'thumb'; v.emoteLoop = true; v.emoteStart = performance.now() / 1000;
            }
            if (tn && !briefingActive && !(activeTalkNpc && activeTalkNpc.id === st.id)) {
              tn.bubble = st.npcSay; tn.bubbleType = 'ok';
              if (!vipGreetVoiced) {
                vipGreetVoiced = true;
                voice(st.id, st.id === 'claude' ? 'greet-vip' : 'greet', 0.1);
              }
            }
          }, 2200);

          // 3) 4.5초 뒤: 대화 종료 → 옆으로 인사 보유 직원(운영 감찰관·비서실장)은 정은수 대표님 방향으로 보고 정중 인사 후 착석!
          vipSetTimeout(() => {
            v.emote = null; v.emoteLoop = false;
            v.bubble = '';
            const sideEmote = (st.id === 'inspector' && imgs.walk.inspector?.sideBow?.length === 12) ? 'sideBow' : 'bow';
            const canSideBow = tn && HAS_SIDE_BOW[st.id] && imgs.walk[st.id]?.[sideEmote]?.length === 12
              && !briefingActive && !(activeTalkNpc && activeTalkNpc.id === st.id);
            if (canSideBow) {
              tn.dir = (v.x < tn.x) ? 'west' : 'east';
              tn.mode = 'emote'; tn.emote = sideEmote; tn.emoteLoop = false;
              tn.emoteStart = performance.now() / 1000;
              tn.bubble = '🙇 감사합니다, 정은수 대표님!';
              tn.bubbleType = 'ok';
              vipSetTimeout(() => {
                tn.vipReserved = false;
                if (!briefingActive && !(activeTalkNpc && activeTalkNpc.id === st.id)) {
                  tn.emote = null; tn.emoteLoop = false;
                  tn.bubble = '';
                  seatNpc(st.id);
                }
                visitStop(idx + 1);
              }, 3000);
              return;
            }
            if (tn) {
              tn.vipReserved = false;
              if (!briefingActive && !(activeTalkNpc && activeTalkNpc.id === st.id)) {
                tn.bubble = '';
                seatNpc(st.id);
              }
            }
            visitStop(idx + 1);
          }, 4500);
        };

        const markNpcReady = () => {
          if (briefingActive) return;
          npcReady = true;
          if (tn && !started) {
            seatNpc(st.id);
            if (!vipArrived) tn.bubble = '😊 정은수 대표님 기다리는 중…';
          }
          if (vipArrived && !started) startMeeting();
        };

        // 담당자가 자리 밖에 있으면 즉시 자리로 복귀! (경로 실패/근접 시 즉시 ready 처리 -> 데드락 0%)
        if (tn && tc && !npcReady && !(activeTalkNpc && activeTalkNpc.id === st.id)) {
          tn.emote = null; tn.emoteLoop = false; tn.path = []; tn.onArrive = null;
          const okNpc = walkNpcSafe(st.id, tc.home[0], tc.home[1], {
            force: true,
            bubble: '🏃 정은수 대표님 오신대요! 자리로 복귀 중…',
            onArrive: markNpcReady
          });
          if (!okNpc) markNpcReady();
        } else if (tn && npcReady && !briefingActive) {
          tn.bubble = '😊 정은수 대표님 기다리는 중…';
        }

        // 정은수 대표님 출발 (도착 시 담당자가 아직 오는 중이면 기다리되, 최대 8초 안전 폴백으로 절대 멈추지 않음!)
        const okVip = walkNpcSafe('vip_jung', st.pos[0], st.pos[1], {
          force: true,
          bubble: `🚶 ${tc?.name || '직원'} 자리 들르는 중…`,
          onArrive: () => {
            if (briefingActive) return;
            v.dir = st.dir; v.mode = 'stand';
            vipArrived = true;
            if (npcReady) {
              startMeeting();
            } else {
              v.bubble = '😊 잠깐 기다려 볼까…';
              voice('vip_jung', 'wait');
              v.bubbleType = '';
              // 0.3초마다 담당자가 자리에 도착했는지 재확인 + 최대 8초 뒤 자동 진행
              const poll = setInterval(() => {
                if (started || briefingActive) { clearInterval(poll); return; }
                if (!tn || tn.mode === 'idle' || Math.hypot(tn.x - tc.home[0], tn.y - tc.home[1]) < 4.0) {
                  clearInterval(poll);
                  npcReady = true;
                  startMeeting();
                }
              }, 300);
              vipTimers.push(poll);
              guardTimer = vipSetTimeout(() => { clearInterval(poll); startMeeting(); }, 8000);
            }
          }
        });
        if (!okVip) {
          if (tn) tn.vipReserved = false;
          visitStop(idx + 1);
        }
      };

      // 1) 입장 → 캡틴 실시간 위치로 추적해 인사(이동 중 캡틴이 자리를 옮겨도 끝까지 따라감!) → 2) 커피바 → 3) 직원 공간 2곳 방문 → 4) 작별 & 퇴장!
      let capTarget = greetSpot;
      let greetedCap = false;
      let capTrackPoll = null;
      const stopCapTrack = () => {
        if (capTrackPoll) { clearInterval(capTrackPoll); capTrackPoll = null; }
      };
      const doGreetCaptain = () => {
        if (greetedCap || briefingActive) return;
        greetedCap = true;
        stopCapTrack();
        v.mode = 'stand';
        if (cap) faceEachOther(v, cap);
        else v.dir = 'back';
        if (imgs.walk.vip_jung?.greet?.length === 12) {
          v.mode = 'emote'; v.emote = 'greet'; v.emoteLoop = true; v.emoteStart = performance.now() / 1000;
        }
        v.bubble = greetSay;
        voice('vip_jung', 'greet');
        v.bubbleType = 'meet';
        spawnBurst(v.x, v.y - 4, '🤝 NANA VINA VIP 방문!', 0);
        // 2.0초 뒤 대표님 말풍선 닫고 캡틴 화답 + 대표님 엄지척 격려 (겹침 방지!)
        vipSetTimeout(() => {
          v.bubble = '';
          if (imgs.walk.vip_jung?.thumb?.length === 12) {
            v.mode = 'emote'; v.emote = 'thumb'; v.emoteLoop = true; v.emoteStart = performance.now() / 1000;
          }
          if (cap && !briefingActive) {
            const prev = cap.bubble;
            cap.bubble = capGreetReply;
            cap.bubbleType = 'ok';
            setTimeout(() => { if (cap.bubble === capGreetReply) cap.bubble = prev || ''; }, 2400);
          }
        }, 2000);
        vipSetTimeout(() => {
          if (briefingActive) return;
          v.emote = null; v.emoteLoop = false;
          walkNpcSafe('vip_jung', coffeeSpot[0], coffeeSpot[1], {
            force: true,
            bubble: '☕ 커피 한 잔 마시러 가는 중…',
            onArrive: () => {
              if (briefingActive) return;
              v.dir = 'front';
              if (imgs.walk.vip_jung?.coffee?.length === 12) {
                v.mode = 'emote'; v.emote = 'coffee'; v.emoteLoop = true; v.emoteStart = performance.now() / 1000;
              } else {
                v.mode = 'stand';
              }
              SFX.coffee();
              v.bubble = coffeeSay;
              voice('vip_jung', 'coffee');
              v.bubbleType = 'ok';
              vipSetTimeout(() => {
                v.emote = null; v.emoteLoop = false; v.bubble = '';
                visitStop(0);
              }, 3800);
            }
          });
        }, 4200);
      };
      let rerouteCount = 0;
      const walkToCaptainNow = (spot) => {
        capTarget = spot;
        const ok = walkNpcSafe('vip_jung', spot[0], spot[1], {
          force: true,
          bubble: arriveSay,
          bubbleType: 'meet',
          onArrive: () => {
            if (greetedCap || briefingActive) return;
            const fresh = getSpotNearCaptain();
            if (rerouteCount < 6 && Math.hypot(v.x - fresh[0], v.y - fresh[1]) > 8.0) {
              rerouteCount++;
              walkToCaptainNow(fresh);
            } else {
              doGreetCaptain();
            }
          }
        });
        if (!ok) doGreetCaptain();
      };
      // 입장 인사 음성은 경로 재탐색 때 반복되지 않도록 입장 시 딱 1번만 재생!
      voice('vip_jung', 'arrive');
      walkToCaptainNow(capTarget);
      // 대표님이 걸어오는 동안(0.7초마다) 캡틴이 다른 곳으로 이동했으면 새 위치로 실시간 경로 재탐색!
      capTrackPoll = setInterval(() => {
        if (greetedCap || briefingActive || !vipActive || v.hidden) { stopCapTrack(); return; }
        const fresh = getSpotNearCaptain();
        if (Math.hypot(fresh[0] - capTarget[0], fresh[1] - capTarget[1]) > 5.5 && rerouteCount < 6) {
          rerouteCount++;
          walkToCaptainNow(fresh);
        }
      }, 700);
      vipTimers.push(capTrackPoll);
      return true;
    }
    // 정은수 대표님 방문 주기: 15분~20분마다 한 번씩 등장 (새로고침해도 마지막 방문 시각 기억!)
    const VIP_MIN_MS = 15 * 60 * 1000;
    const VIP_MAX_MS = 20 * 60 * 1000;
    function scheduleNextVip(delayMs) {
      if (nextVipTimer) { clearTimeout(nextVipTimer); nextVipTimer = null; }
      const wait = delayMs ?? (VIP_MIN_MS + Math.floor(Math.random() * (VIP_MAX_MS - VIP_MIN_MS)));
      nextVipTimer = setTimeout(() => {
        nextVipTimer = null;
        if (document.hidden || briefingActive || vipActive) { scheduleNextVip(60 * 1000); return; }
        startVipVisit();
      }, wait);
    }
    (() => {
      const lastAt = Number(lsGet('oa_vip_last_at') || 0);
      const elapsed = lastAt ? (Date.now() - lastAt) : VIP_MIN_MS;
      const rem = Math.max(0, VIP_MIN_MS - elapsed);
      const initWait = rem + Math.floor(Math.random() * (VIP_MAX_MS - VIP_MIN_MS));
      scheduleNextVip(lastAt ? Math.max(60 * 1000, initWait) : (VIP_MIN_MS + Math.floor(Math.random() * (VIP_MAX_MS - VIP_MIN_MS))));
    })();

    if (opts.autoDemo !== false) setTimeout(runDemo, 1500);
    return { runDemo, serveCoffee, captainWalk, hallChat, sitCaptainBack, playCaptainAction, startBriefing, endBriefing, syncReal, stroll, danceParty, inspectorSoloDance, startVipVisit };
  }

  window.OfficeAnime = { create };
})();
