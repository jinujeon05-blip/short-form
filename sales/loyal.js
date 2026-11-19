// 점주 화면 '🎁 단골' — 단골 적립(도장) 설정 · 오늘의 할인 배너 · 카운터 도장 QR(크게 보기)
// 2026-11-17 캡틴 결정 가-1·나-1. 데이터: /api/loyal (op=cfg·code). Loyal.mount(el, { shop, ui, headers, onAuthFail })
// 카운터 QR은 1분마다 바뀐다(사진으로 찍어 두고 쓰기 어렵게). 이 화면이 20초마다 새 주소를 받아 다시 그린다.
(function () {
  const T = {
    ko: {
      title: '단골 적립 · 오늘의 할인', loyal: '단골 도장 적립', on: '적립 켜기', goal: '도장 몇 개를 모으면', reward: '받는 혜택', rewardPh: '예: 음료 1잔 무료',
      banner: '오늘의 할인 배너', bannerHint: '손님 메뉴판 맨 위에 띠로 나와요. 쓴 글 그대로 나오니 손님 언어로 써 주세요.', text: '문구', textPh: '예: 점심 김치찌개 20% 할인 (11~14시)',
      from: '시작 날짜', to: '끝 날짜', dateHint: '날짜를 비우면 계속 나와요. 문구를 지우면 배너가 사라져요.', save: '저장', saved: '저장했어요. 손님 화면에는 1분 안에 나와요.',
      needReward: '적립을 켜려면 혜택을 적어 주세요', fail: '저장하지 못했어요. 잠시 뒤 다시 눌러 주세요.', loadFail: '불러오지 못했어요.',
      counter: '카운터 도장 QR 크게 보기', counterHint: '계산할 때 이 화면을 손님에게 보여 주세요. 손님이 찍으면 도장 1개(하루 1번).',
      give: '도장 주기', use: '혜택 사용', giveHint: '손님 폰 카메라로 찍게 해 주세요 → 도장 1개', useHint: '도장을 다 모은 손님만 찍게 해 주세요 → 혜택 사용 완료 화면',
      close: '닫기', changes: (s) => `QR이 ${s}초 뒤 바뀌어요`, how: '이렇게 써요', steps: ['위에서 혜택을 정하고 적립을 켜고 저장', '카운터 태블릿·폰에서 "카운터 도장 QR 크게 보기"', '계산할 때 손님이 QR을 찍으면 도장 1개', '다 모은 손님은 "혜택 사용" QR을 찍고 직원에게 완료 화면을 보여 줌'],
      offNote: '적립이 꺼져 있으면 QR을 찍어도 도장이 쌓이지 않아요.',
    },
    vi: {
      title: 'Tích tem · Ưu đãi hôm nay', loyal: 'Tích tem cho khách quen', on: 'Bật tích tem', goal: 'Số tem cần tích', reward: 'Ưu đãi nhận được', rewardPh: 'vd: Tặng 1 ly nước',
      banner: 'Dải ưu đãi hôm nay', bannerHint: 'Hiện ở đầu thực đơn của khách. Hiện đúng chữ bạn viết, hãy viết bằng ngôn ngữ của khách.', text: 'Nội dung', textPh: 'vd: Canh kimchi giảm 20% buổi trưa (11–14h)',
      from: 'Ngày bắt đầu', to: 'Ngày kết thúc', dateHint: 'Để trống ngày thì hiện mãi. Xoá nội dung thì dải ưu đãi biến mất.', save: 'Lưu', saved: 'Đã lưu. Khách sẽ thấy trong vòng 1 phút.',
      needReward: 'Hãy nhập ưu đãi trước khi bật tích tem', fail: 'Không lưu được. Vui lòng thử lại sau.', loadFail: 'Không tải được.',
      counter: 'Mở mã QR tích tem ở quầy', counterHint: 'Khi thanh toán, đưa màn hình này cho khách. Khách quét là được 1 tem (mỗi ngày 1 lần).',
      give: 'Tặng tem', use: 'Dùng ưu đãi', giveHint: 'Cho khách quét bằng camera điện thoại → 1 tem', useHint: 'Chỉ cho khách đã đủ tem quét → màn hình đã dùng ưu đãi',
      close: 'Đóng', changes: (s) => `Mã QR đổi sau ${s} giây`, how: 'Cách dùng', steps: ['Nhập ưu đãi, bật tích tem rồi lưu', 'Trên máy tính bảng/điện thoại ở quầy, bấm "Mở mã QR tích tem ở quầy"', 'Khi thanh toán, khách quét QR là được 1 tem', 'Khách đủ tem quét QR "Dùng ưu đãi" và đưa màn hình cho nhân viên'],
      offNote: 'Khi tắt tích tem, khách quét QR cũng không được tem.',
    },
  };
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const CSS = `
  .ly h2{font-size:17px;margin:0 0 10px}.ly .card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;margin-bottom:12px}
  .ly label{display:block;font-weight:700;font-size:14px;margin:12px 0 4px}.ly .chk{display:flex;align-items:center;gap:8px;margin:0;font-size:15px}
  .ly input[type=text],.ly input[type=number],.ly input[type=date]{width:100%;font:inherit;font-size:16px;padding:10px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink)}
  .ly .two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px}.ly input{min-width:0;max-width:100%}.ly .hint{color:var(--muted);font-size:13px;margin:4px 0 0}
  .ly .bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:6px}.ly .msg{font-size:14px;min-height:20px}.ly .msg.bad{color:#e03131}.ly .msg.good{color:#2f9e44}
  .ly .big{width:100%;font-size:17px;padding:14px}.ly ol{margin:6px 0 0;padding-left:20px;color:var(--muted);font-size:14px}
  .ly-qr{position:fixed;inset:0;z-index:50;background:#fff;color:#111;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:16px;text-align:center}
  .ly-qr .tabs{display:flex;gap:6px;background:#f1ece3;border-radius:12px;padding:4px}.ly-qr .tabs button{font:inherit;font-weight:800;font-size:16px;border:0;border-radius:9px;padding:10px 18px;background:transparent;color:#555;cursor:pointer}
  .ly-qr .tabs button[aria-pressed=true]{background:#e8590c;color:#fff}.ly-qr.use .tabs button[aria-pressed=true]{background:#1f8a4c}
  .ly-qr svg{width:min(78vw,62vh);height:auto;display:block}.ly-qr .h{font-size:18px;font-weight:800;max-width:520px}.ly-qr .s{color:#777;font-size:14px}
  .ly-qr .x{position:absolute;top:12px;right:12px;font:inherit;font-weight:700;border:0;border-radius:10px;padding:8px 14px;background:#1f2430;color:#fff;cursor:pointer}`;

  function qrSvg(text) {
    const q = window.QMQR(text), n = q.n, pad = 2;
    let d = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.dark(r, c)) d += `M${c + pad},${r + pad}h1v1h-1z`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n + pad * 2} ${n + pad * 2}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
  }

  function mount(el, o) {
    const t = T[o.ui] || T.ko;
    if (!document.getElementById('ly-css')) { const s = document.createElement('style'); s.id = 'ly-css'; s.textContent = CSS; document.head.appendChild(s); }
    el.innerHTML = `<div class="ly">
      <div class="card"><h2>🎁 ${esc(t.loyal)}</h2>
        <label class="chk"><input type="checkbox" id="ly-on"> ${esc(t.on)}</label>
        <div class="two"><div><label>${esc(t.goal)}</label><input type="number" id="ly-goal" min="3" max="20" value="10"></div>
        <div><label>${esc(t.reward)}</label><input type="text" id="ly-rw" maxlength="60" placeholder="${esc(t.rewardPh)}"></div></div>
        <p class="hint">${esc(t.offNote)}</p></div>
      <div class="card"><h2>📣 ${esc(t.banner)}</h2><p class="hint" style="margin:0">${esc(t.bannerHint)}</p>
        <label>${esc(t.text)}</label><input type="text" id="ly-bt" maxlength="100" placeholder="${esc(t.textPh)}">
        <div class="two"><div><label>${esc(t.from)}</label><input type="date" id="ly-bf"></div><div><label>${esc(t.to)}</label><input type="date" id="ly-bto"></div></div>
        <p class="hint">${esc(t.dateHint)}</p></div>
      <div class="bar"><button class="btn pri" id="ly-save" type="button" style="width:auto;padding:10px 26px">${esc(t.save)}</button><span class="msg" id="ly-msg"></span></div>
      <div class="card" style="margin-top:12px"><button class="btn pri big" id="ly-open" type="button">🔳 ${esc(t.counter)}</button><p class="hint">${esc(t.counterHint)}</p>
        <p style="margin:12px 0 0;font-weight:700">${esc(t.how)}</p><ol>${t.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></div>
    </div>`;
    const $ = (id) => el.querySelector('#' + id);
    const msg = (s, k) => { const m = $('ly-msg'); m.textContent = s || ''; m.className = 'msg ' + (k || ''); };
    const call = (url, init) => fetch(url, Object.assign({}, init, { headers: Object.assign({ 'content-type': 'application/json' }, o.headers()) }))
      .then(async (r) => { if (r.status === 401) { o.onAuthFail && o.onAuthFail(); throw 0; } const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(j.why || j.error || r.status); return j; });

    call('/api/loyal?op=cfg&shop=' + encodeURIComponent(o.shop)).then((j) => {
      const c = j.cfg || {};
      $('ly-on').checked = !!c.on; $('ly-goal').value = c.goal || 10; $('ly-rw').value = c.reward || '';
      const b = c.banner || {}; $('ly-bt').value = b.text || ''; $('ly-bf').value = b.from || ''; $('ly-bto').value = b.to || '';
    }).catch((e) => e && msg(t.loadFail + ' (' + e.message + ')', 'bad'));

    $('ly-save').onclick = () => {
      const on = $('ly-on').checked, reward = $('ly-rw').value.trim();
      if (on && !reward) return msg(t.needReward, 'bad');
      msg('…');
      call('/api/loyal', { method: 'POST', body: JSON.stringify({ op: 'cfg', shop: o.shop, on, goal: Number($('ly-goal').value), reward, banner: { text: $('ly-bt').value.trim(), from: $('ly-bf').value, to: $('ly-bto').value } }) })
        .then(() => msg(t.saved, 'good')).catch((e) => e && msg(t.fail + ' (' + e.message + ')', 'bad'));
    };

    $('ly-open').onclick = () => {
      const old = document.querySelector('.ly-qr'); if (old) old.remove();
      const ov = document.createElement('div'); ov.className = 'ly-qr';
      ov.innerHTML = `<button class="x" type="button">${esc(t.close)}</button><div class="tabs"><button type="button" data-k="give" aria-pressed="true">🎁 ${esc(t.give)}</button><button type="button" data-k="use" aria-pressed="false">✅ ${esc(t.use)}</button></div><div id="ly-q"></div><div class="h" id="ly-h"></div><div class="s" id="ly-s"></div>`;
      document.body.appendChild(ov);
      let kind = 'give', data = null, until = 0, timer;
      const draw = () => {
        if (!data) return;
        ov.classList.toggle('use', kind === 'use');
        ov.querySelector('#ly-q').innerHTML = qrSvg(data[kind]);
        ov.querySelector('#ly-h').textContent = kind === 'use' ? t.useHint : t.giveHint;
        ov.querySelectorAll('.tabs button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.k === kind));
      };
      const load = () => call('/api/loyal?op=code&shop=' + encodeURIComponent(o.shop)).then((j) => { data = j; until = Date.now() + j.next; draw(); }).catch((e) => e && (ov.querySelector('#ly-s').textContent = t.loadFail + ' (' + e.message + ')'));
      const tick = () => {
        if (!document.body.contains(ov)) return clearInterval(timer);
        const left = Math.max(0, Math.round((until - Date.now()) / 1000));
        if (data && left <= 0) load();
        ov.querySelector('#ly-s').textContent = data ? t.changes(left) : '';
      };
      ov.querySelector('.tabs').onclick = (e) => { const b = e.target.closest('button'); if (b) { kind = b.dataset.k; draw(); } };
      ov.querySelector('.x').onclick = () => { clearInterval(timer); ov.remove(); };
      load(); timer = setInterval(tick, 1000);
    };
  }
  window.Loyal = { mount };
})();
