// 점주 화면 '💬 소리함' — 시크릿 고객 소리함 설정(켜기·구글 리뷰 주소) + 최근 손님 의견(별점·한마디)
// 2026-11-18 캡틴 가-1·나-1·다-1·라-1. 데이터: /api/loyal (op=vcfg·voices). Voice.mount(el, { shop, ui, headers, onAuthFail })
(function () {
  const T = {
    ko: {
      set: '시크릿 고객 소리함', on: '소리함 켜기', review: '구글 리뷰 주소', reviewPh: 'https://g.page/r/…/review',
      reviewHint: '구글 비즈니스 프로필 → "리뷰 받기"에서 복사한 주소. 비우면 구글 버튼이 안 나와요.',
      policy: '구글 버튼은 별점과 상관없이 모든 손님에게 똑같이 보여요. (구글 정책: 좋은 리뷰만 골라 요청하면 리뷰가 지워질 수 있어요)',
      how: '테이블 QR로 들어온 손님만 보여요(가게 찾기·검색으로 들어온 사람은 못 써요). 메뉴판 맨 아래 버튼이나 "계산서" 호출 때 별점을 남겨요. 1~3점이면 주방 화면에 빨간 "불만 알림"이 소리와 함께 떠요(주방 주문을 켠 가게).',
      save: '저장', saved: '저장했어요. 손님 화면에는 1분 안에 나와요.', badUrl: '구글 리뷰 주소가 아니에요. g.page 나 google.com 주소를 넣어 주세요.',
      fail: '저장하지 못했어요. 잠시 뒤 다시 눌러 주세요.', loadFail: '불러오지 못했어요.',
      list: '최근 손님 의견', d7: '7일', d30: '30일', none: '아직 의견이 없어요', avg: '평균', n: (k) => `${k}건`, table: '테이블', alerted: '주방 알림', noText: '(한마디 없음)', reload: '새로 고침',
    },
    vi: {
      set: 'Hộp góp ý bí mật', on: 'Bật hộp góp ý', review: 'Link đánh giá Google', reviewPh: 'https://g.page/r/…/review',
      reviewHint: 'Sao chép từ Google Business Profile → "Nhận đánh giá". Để trống thì không hiện nút Google.',
      policy: 'Nút Google hiện giống nhau cho mọi khách, dù chấm mấy sao. (Chính sách Google: chỉ mời khách khen đánh giá có thể bị xoá đánh giá)',
      how: 'Chỉ khách vào bằng mã QR trên bàn mới thấy (người vào từ tìm kiếm không dùng được). Khách chấm sao bằng nút cuối thực đơn hoặc khi gọi "Tính tiền". 1–3 sao sẽ hiện cảnh báo đỏ "Khách chưa hài lòng" có âm thanh trên màn hình bếp (quán đã bật gọi món vào bếp).',
      save: 'Lưu', saved: 'Đã lưu. Khách sẽ thấy trong vòng 1 phút.', badUrl: 'Không phải link đánh giá Google. Hãy nhập link g.page hoặc google.com.',
      fail: 'Không lưu được. Vui lòng thử lại sau.', loadFail: 'Không tải được.',
      list: 'Ý kiến gần đây', d7: '7 ngày', d30: '30 ngày', none: 'Chưa có ý kiến nào', avg: 'Trung bình', n: (k) => `${k} ý kiến`, table: 'Bàn', alerted: 'Đã báo bếp', noText: '(không ghi gì)', reload: 'Tải lại',
    },
  };
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const CSS = `
  .vc h2{font-size:17px;margin:0 0 10px}.vc .card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;margin-bottom:12px}
  .vc label{display:block;font-weight:700;font-size:14px;margin:12px 0 4px}.vc .chk{display:flex;align-items:center;gap:8px;margin:0;font-size:15px}
  .vc input[type=text]{width:100%;min-width:0;font:inherit;font-size:16px;padding:10px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--ink)}
  .vc .hint{color:var(--muted);font-size:13px;margin:4px 0 0}.vc .pol{background:rgba(232,89,12,.09);border-radius:10px;padding:8px 10px;font-size:13px;margin-top:10px}
  .vc .bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:12px}.vc .msg{font-size:14px;min-height:20px}.vc .msg.bad{color:#e03131}.vc .msg.good{color:#2f9e44}
  .vc .hd{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.vc .hd h2{flex:1;margin:0;min-width:8em}.vc .seg{display:inline-flex;border:1px solid var(--line);border-radius:10px;overflow:hidden}
  .vc .seg button{font:inherit;font-size:13px;border:0;background:transparent;color:var(--muted);padding:6px 12px;cursor:pointer}.vc .seg button[aria-pressed=true]{background:var(--accent);color:#fff}
  .vc .sum{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:12px 0 4px}.vc .sum .a{font-size:26px;font-weight:900}.vc .sum .a small{font-size:14px;color:var(--muted);font-weight:600}
  .vc .bars{display:grid;gap:3px;flex:1;min-width:180px}.vc .bars div{display:grid;grid-template-columns:2.2em 1fr 2.4em;gap:6px;align-items:center;font-size:12.5px;color:var(--muted)}
  .vc .bars i{display:block;height:8px;border-radius:4px;background:#f5a400}.vc .bars span.tr{background:rgba(128,128,128,.15);border-radius:4px;height:8px;display:block}
  .vc ul{list-style:none;margin:10px 0 0;padding:0}.vc li{border-top:1px solid var(--line);padding:10px 0}.vc li.low{background:rgba(224,49,49,.06);margin:0 -16px;padding:10px 16px}
  .vc li .t{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:13px;color:var(--muted)}.vc li .s{color:#f5a400;font-size:16px;letter-spacing:1px}.vc li.low .s{color:#e03131}
  .vc li .tx{margin-top:3px;overflow-wrap:anywhere}.vc li .tag{border-radius:999px;padding:1px 8px;font-size:12px;background:#e03131;color:#fff;font-weight:700}`;

  function mount(el, o) {
    const t = T[o.ui] || T.ko;
    if (!document.getElementById('vc-css')) { const s = document.createElement('style'); s.id = 'vc-css'; s.textContent = CSS; document.head.appendChild(s); }
    el.innerHTML = `<div class="vc">
      <div class="card"><h2>💬 ${esc(t.set)}</h2>
        <label class="chk"><input type="checkbox" id="vc-on"> ${esc(t.on)}</label>
        <label>${esc(t.review)}</label><input type="text" id="vc-rv" maxlength="300" inputmode="url" autocomplete="off" placeholder="${esc(t.reviewPh)}">
        <p class="hint">${esc(t.reviewHint)}</p><p class="pol">⚖️ ${esc(t.policy)}</p><p class="hint">${esc(t.how)}</p>
        <div class="bar"><button class="btn pri" id="vc-save" type="button" style="width:auto;padding:10px 26px">${esc(t.save)}</button><span class="msg" id="vc-msg"></span></div></div>
      <div class="card"><div class="hd"><h2>${esc(t.list)}</h2><span class="seg" id="vc-days"><button type="button" data-d="7" aria-pressed="true">${esc(t.d7)}</button><button type="button" data-d="30" aria-pressed="false">${esc(t.d30)}</button></span><button class="btn" type="button" id="vc-re">↻ ${esc(t.reload)}</button></div>
        <div id="vc-list"><p class="hint">…</p></div></div>
    </div>`;
    const $ = (id) => el.querySelector('#' + id);
    const msg = (s, k) => { const m = $('vc-msg'); m.textContent = s || ''; m.className = 'msg ' + (k || ''); };
    const call = (url, init) => fetch(url, Object.assign({}, init, { headers: Object.assign({ 'content-type': 'application/json' }, o.headers()) }))
      .then(async (r) => { if (r.status === 401) { o.onAuthFail && o.onAuthFail(); throw 0; } const j = await r.json().catch(() => ({})); if (!r.ok) { const e = new Error(j.why || j.error || r.status); e.code = j.error; throw e; } return j; });

    call('/api/loyal?op=vcfg&shop=' + encodeURIComponent(o.shop)).then((j) => { const c = j.cfg || {}; $('vc-on').checked = !!c.on; $('vc-rv').value = c.review || ''; })
      .catch((e) => e && msg(t.loadFail + ' (' + e.message + ')', 'bad'));

    $('vc-save').onclick = () => {
      msg('…');
      call('/api/loyal', { method: 'POST', body: JSON.stringify({ op: 'vcfg', shop: o.shop, on: $('vc-on').checked, review: $('vc-rv').value.trim() }) })
        .then(() => msg(t.saved, 'good')).catch((e) => e && msg(e.code === 'review_url' ? t.badUrl : t.fail + ' (' + e.message + ')', 'bad'));
    };

    let days = 7;
    const fmt = (ms) => new Date(ms).toLocaleString(o.ui === 'vi' ? 'vi-VN' : 'ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const load = () => {
      $('vc-list').innerHTML = '<p class="hint">…</p>';
      call(`/api/loyal?op=voices&days=${days}&shop=${encodeURIComponent(o.shop)}`).then((j) => {
        const s = j.sum || { n: 0, by: [0, 0, 0, 0, 0] }, items = j.items || [];
        if (!s.n) { $('vc-list').innerHTML = `<p class="hint">${esc(t.none)}</p>`; return; }
        const max = Math.max(1, ...s.by);
        const bars = [5, 4, 3, 2, 1].map((k) => `<div><span>${k}★</span><span class="tr"><i style="width:${Math.round((s.by[k - 1] / max) * 100)}%"></i></span><span>${s.by[k - 1]}</span></div>`).join('');
        $('vc-list').innerHTML = `<div class="sum"><div class="a">★ ${s.avg}<br><small>${esc(t.avg)} · ${esc(t.n(s.n))}</small></div><div class="bars">${bars}</div></div><ul>` +
          items.map((x) => `<li class="${x.stars <= 3 ? 'low' : ''}"><div class="t"><span class="s">${'★'.repeat(x.stars)}${'☆'.repeat(5 - x.stars)}</span><span>${esc(fmt(x.at))}</span>${x.table ? `<span>${esc(t.table)} ${esc(x.table)}</span>` : ''}${x.lang ? `<span>${esc(x.lang.toUpperCase())}</span>` : ''}${x.alerted ? `<span class="tag">${esc(t.alerted)}</span>` : ''}</div><div class="tx">${x.text ? esc(x.text) : `<span class="hint">${esc(t.noText)}</span>`}</div></li>`).join('') + '</ul>';
      }).catch((e) => e && ($('vc-list').innerHTML = `<p class="msg bad">${esc(t.loadFail)} (${esc(e.message)})</p>`));
    };
    $('vc-days').onclick = (e) => { const b = e.target.closest('button'); if (!b) return; days = Number(b.dataset.d); el.querySelectorAll('#vc-days button').forEach((x) => x.setAttribute('aria-pressed', x === b)); load(); };
    $('vc-re').onclick = load;
    load();
  }
  window.Voice = { mount };
})();
