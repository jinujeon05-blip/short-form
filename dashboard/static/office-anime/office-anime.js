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
        <div class="oa-brief-bar">
          <button type="button" class="oa-b-btn start" data-brief-start>📋 보고해</button>
          <button type="button" class="oa-b-btn stop" data-brief-stop hidden>✋ 오늘은 여기까지 하지</button>
        </div>
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

    function runDemo() {
      serveCoffee();
      setTimeout(hallChat, 1200);
      setTimeout(transConsult, 2200);
      setTimeout(sorterCheck, 3200);
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

    // ---------------------------------------------------------------- 캡틴 직접 게임 조작 (WASD / 방향키 / 바닥 클릭 / E 착석)
    const keys = new Set();
    let clickRing = null; // { x, y, born }

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
      // 하단 좌측: 감사실(보라) 벽·가구 (상단 우측 x=21.2~25.2 출입구 개방!)
      { x0:  0.0, y0: 51.4, x1: 21.2, y1: 69.5 }, // 윗벽 + 보라 뒷벽·책장 (우측 통로 x=21.2~25.0 개방!)
      { x0: 25.0, y0: 51.4, x1: 26.8, y1: 93.0 }, // 우측 칸막이벽 (통번역실과 분리)
      { x0:  3.2, y0: 76.5, x1: 12.8, y1: 86.0 }, // 좌측 감사 책상·의자
      { x0: 14.2, y0: 76.5, x1: 23.6, y1: 86.0 }, // 우측 감사 책상·의자
      { x0:  0.0, y0: 89.2, x1: 26.8, y1: 100. }, // 아랫벽
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

      const sc = toC(sx), sr = toR(sy);
      let tc = toC(tx), tr = toR(ty);

      // 목표점이 장애물 안이면 가장 가까운 이동 가능 칸 찾기
      if (!canWalk(toX(tc), toY(tr))) {
        let found = false;
        for (let rad = 1; rad <= 6 && !found; rad++) {
          for (let dr = -rad; dr <= rad && !found; dr++) {
            for (let dc = -rad; dc <= rad && !found; dc++) {
              const nr = tr + dr, nc = tc + dc;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && canWalk(toX(nc), toY(nr))) {
                tc = nc; tr = nr; found = true;
              }
            }
          }
        }
        if (!found) return null;
      }

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

    // 역할별 RPG 대화 멘트 + 빠른 지시 버튼
    const DIALOG_CFG = {
      captain:    { greet: '오늘 사무실 전체 현황을 점검 중입니다. 어떤 지시를 내릴까요?', quick: ['☕ 커피 한 잔 하며 휴식', '👋 전체 직원 격려 인사', '🪑 대표석으로 복귀'] },
      claude:     { greet: '캡틴, 오셨어요? 오늘 진행할 업무나 지시하실 사항이 있으신가요?', quick: ['☕ 캡틴 커피 서빙해 줘', '📋 현재 전체 진행 현황 보고', '💬 팀장급 복도 회의 소집'] },
      finder:     { greet: '캡틴! 음식 사진 선별이나 이미지 보정 지시하실 게 있으신가요?', quick: ['📸 새 가게 음식 사진 고르기', '✨ 흐린 메뉴 사진 화질 개선', '📋 현재 사진 작업 현황 보고'] },
      agy:        { greet: '캡틴! 어떤 가게의 디지털 메뉴판을 점검할까요?', quick: ['🔍 메뉴판 가격·오타 전수 점검', '📱 모바일 화면 깨짐 확인', '📋 검수 완료 리스트 보고'] },
      translator: { greet: '캡틴! 베트남어·영어·한국어 메뉴 번역 지시하실 내용이 있으신가요?', quick: ['🌐 새 메뉴 4개국어 번역 시작', '✍️ 베트남어 현지 표현 자연스럽게 다듬기', '📋 번역 완료 현황 보고'] },
      sorter:     { greet: '캡틴! 새로 들어온 가게 메뉴 사진·자료를 어떤 기준으로 선별할까요?', quick: ['📦 신규 가게 자료 1차 선별 시작', '🗂️ 중복·흐린 파일 자동 정리', '📋 선별 완료 목록 보고'] },
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

      modal.innerHTML = `
        <div class="oa-m-head">
          <img src="/static/office-anime/assets/portraits/${hit}.webp?v=cap2" alt="${c.name}">
          <div>
            <h3>${c.name} <span class="oa-m-role">${c.role}</span></h3>
            <p class="oa-m-say">“${dcfg.greet}”</p>
          </div>
          <button type="button" data-close>×</button>
        </div>
        <div class="oa-m-quick">
          ${dcfg.quick.map(q => `<button type="button" class="oa-q-btn" data-q="${q}">${q}</button>`).join('')}
        </div>
        <form class="oa-m-form" data-order-form>
          <input type="text" name="msg" placeholder="${c.name}에게 직접 지시할 내용을 입력하세요…" autocomplete="off" required>
          <button type="submit">📣 지시 전달</button>
        </form>
        <div class="oa-m-res" data-res hidden></div>`;

      const sendOrder = async text => {
        const resEl = modal.querySelector('[data-res]');
        resEl.hidden = false;
        resEl.textContent = '📡 지시를 전달하는 중…';
        log(`📣 캡틴 → ${c.name}: "${text}"`);

        if (hit === 'captain') {
          if (text.includes('커피')) { closeTalkModal(false); playCaptainAction('coffee'); return; }
          if (text.includes('인사')) { closeTalkModal(false); playCaptainAction('greet'); return; }
          if (text.includes('복귀')) { closeTalkModal(false); sitCaptainBack(); return; }
        }
        if (hit === 'claude' && text.includes('커피')) {
          activeTalkNpc = null; n.pausedState = null; modalBack.hidden = true; serveCoffee(); return;
        }

        try {
          const r = await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ target: hit, target_name: c.name, text })
          });
          resEl.textContent = r.ok
            ? `✅ ${c.name}에게 지시가 접수되었습니다!`
            : `✅ ${c.name}에게 현장 지시 전달 완료 (시연 모드)`;
        } catch {
          resEl.textContent = `✅ ${c.name}에게 현장 지시 전달 완료`;
        }
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
      modalBack.hidden = false;
      setTimeout(() => modal.querySelector('input')?.focus(), 50);
    }

    // 캐릭터 클릭 → 캡틴 쪽 바라보며 RPG 대화·지시창 열기 / 빈 바닥 클릭 → A* 길찾기로 장애물 우회 이동!
    canvas.addEventListener('click', e => {
      const r = canvas.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
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
    };

    function clearBriefTimers() {
      for (const id of briefTimers) clearTimeout(id);
      briefTimers = [];
    }

    function walkNpcSafe(id, tx, ty, opts2 = {}) {
      const n = npcs[id];
      const pts = findPath(n.x, n.y, tx, ty);
      if (!pts) {
        sendPath(id, [[tx, ty]], opts2);
      } else {
        sendPath(id, pts, opts2);
      }
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

        // 인사 끝난 뒤(1.8초 후) 각자 자리로 A* 안전 복귀!
        briefTimers.push(setTimeout(() => {
          cap.bubble = '';
          for (const sid of allStaff) {
            const n = npcs[sid];
            const c = CHARS[sid];
            n.bubble = '';
            walkNpcSafe(sid, c.home[0], c.home[1], {
              onArrive: () => { n.mode = 'idle'; n.dir = c.facing; n.bubble = ''; }
            });
          }
        }, 1800));
      }, 650));
    }

    briefStartBtn.addEventListener('click', startBriefing);
    briefStopBtn.addEventListener('click', endBriefing);

    setTimeout(runDemo, 1500);
    return { runDemo, serveCoffee, captainWalk, hallChat, sitCaptainBack, playCaptainAction, startBriefing, endBriefing };
  }

  window.OfficeAnime = { create };
})();
