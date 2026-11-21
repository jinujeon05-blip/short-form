// 영업 탭 (2026-11-19). 배포된 가게 사장님께 Zalo 영업 메시지를 반자동으로 보낼 수 있게 돕는다.
// 서버: dashboard/sales.py (/api/sales, /api/sales/draft, /api/sales/sent)
// 자동 발송은 하지 않는다. 캡틴이 [복사] → [Zalo 열기] → 직접 전송 → [보냄 표시] 순서로 사용한다.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const get = p => fetch(p, { cache: 'no-store' }).then(r => r.json());
  const post = (p, b) => fetch(p, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Dashboard': '1' },
    body: JSON.stringify(b),
  }).then(async r => {
    try { return await r.json(); } catch { return { error: `서버 응답 오류 (${r.status})` }; }
  }).catch(() => ({ error: '대시보드 서버에 닿지 않았어요(검은 창이 꺼졌는지 확인해 주세요)' }));
  const say = msg => (window.toast ? window.toast(msg) : alert(msg));

  const SIT_LISTING = [
    ['first', '첫 연락'],
    ['followup', '3일 뒤 답 없음(후속 연락)'],
    ['reply', '답장 응대'],
    ['price', '가격 문의 답장'],
    ['checkin', '안부·메뉴 수정 안내'],
  ];
  // 정식 가게는 '첫 연락' 제외(캡틴 지시)
  const SIT_FULL = SIT_LISTING.filter(([k]) => k !== 'first');

  const ST = {
    loaded: false,
    stores: [],
    counts: {},
    agyReady: true,
    kind: 'listing',   // 기본값: 가게 찾기용만 표시(캡틴 지시)
    status: '',        // '' | 'overdue' | 'unsent' | 'sent' | 'replied'
    q: '',
    showAll: false,
    selected: null,    // 선택된 가게 id
    drafting: null,    // 현재 초안을 만들고 있는 가게 id (한 번에 하나만)
    err: '',
    form: { situation: 'first', ownerLang: 'ko', ownerMsg: '' },
  };

  async function copyText(text, label) {
    if (!text) return say('복사할 내용이 없어요');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.append(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    say(label ? `${label} 복사했어요` : '복사했어요');
  }

  function statusBadge(s) {
    if (s.overdue) return `<span class="badge b-stop">3일+ 답 없음 (${s.daysSince}일 전 보냄)</span>`;
    if (s.replied) return `<span class="badge b-ok">답장 받음${s.repliedAt ? ' · ' + esc(s.repliedAt) : ''}</span>`;
    if (s.sentAt) return `<span class="badge b-warn">보냄 · ${esc(s.sentAt)}${s.daysSince ? ` (${s.daysSince}일 전)` : ' (오늘)'}</span>`;
    return `<span class="badge b-na">안 보냄</span>`;
  }

  function filteredStores() {
    const q = ST.q.trim().toLowerCase();
    return ST.stores.filter(s => {
      if (ST.kind && s.kind !== ST.kind) return false;
      if (ST.status === 'overdue' && !s.overdue) return false;
      if (ST.status === 'unsent' && (s.sentTs || s.replied)) return false;
      if (ST.status === 'sent' && (!s.sentTs || s.replied)) return false;
      if (ST.status === 'replied' && !s.replied) return false;
      if (q) {
        const hay = `${s.name} ${s.nameEn} ${s.sub} ${s.id} ${s.phone} ${s.region} ${s.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function selectStore(sid) {
    const s = ST.stores.find(x => x.id === sid);
    if (!s) return;
    ST.selected = sid;
    ST.err = '';
    const sits = s.kind === 'full' ? SIT_FULL : SIT_LISTING;
    let defaultSit = s.kind === 'full' ? 'checkin' : (s.overdue ? 'followup' : 'first');
    if (s.draft?.situation && sits.some(([k]) => k === s.draft.situation)) {
      defaultSit = s.draft.situation;
    }
    ST.form = {
      situation: defaultSit,
      ownerLang: s.draft?.ownerLang || 'ko',
      ownerMsg: s.draft?.ownerMsg || '',
    };
    render();
    const wk = $('#sl-work');
    if (wk) wk.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderWork() {
    const s = ST.stores.find(x => x.id === ST.selected);
    if (!s) return '';
    const isFull = s.kind === 'full';
    const sits = isFull ? SIT_FULL : SIT_LISTING;
    const busy = !!ST.drafting;
    const busyHere = ST.drafting === s.id;
    const d = s.draft;
    const koFirst = (d?.ownerLang || ST.form.ownerLang) !== 'vi';

    const draftBlock = (lang, title, text) => `
      <div class="sl-draft-box">
        <header>
          <b>${title}</b>
          <div class="sl-act" style="margin:0">
            <button class="btn" data-sl-copy="${lang}">${lang === 'ko' ? '한국어 복사' : '베트남어 복사'}</button>
            ${s.zaloUrl
              ? `<a class="sl-zalo" href="${esc(s.zaloUrl)}" target="_blank" rel="noopener">Zalo 열기</a>`
              : `<span class="sl-zalo off">전화 없음</span>`}
          </div>
        </header>
        <textarea id="sl-text-${lang}" aria-label="${title}">${esc(text || '')}</textarea>
      </div>`;

    const draftsHtml = d ? `
      <p class="muted" style="margin:6px 0 4px">
        저장된 초안 · ${esc(d.situationLabel || d.situation || '')} · ${esc(d.createdAt || '')}
        ${d.purpose ? ` — ${esc(d.purpose)}` : ''}
      </p>
      ${d.note ? `<div class="sl-warn-box"><b>캡틴 확인 필요:</b> ${esc(d.note)}</div>` : ''}
      <div class="sl-drafts">
        ${koFirst ? draftBlock('ko', '한국어 초안', d.ko) + draftBlock('vi', '베트남어 초안', d.vi)
                  : draftBlock('vi', '베트남어 초안', d.vi) + draftBlock('ko', '한국어 초안', d.ko)}
      </div>
      ${(d.followup_ko || d.followup_vi) ? `
        <div class="sl-follow">
          <h4>3~4일 뒤 답 없을 때 보낼 한 줄</h4>
          ${d.followup_ko ? `<div class="sl-follow-row"><p><b>한국어:</b> ${esc(d.followup_ko)}</p><button class="btn ghost" data-sl-copy-f="ko">복사</button></div>` : ''}
          ${d.followup_vi ? `<div class="sl-follow-row"><p><b>베트남어:</b> ${esc(d.followup_vi)}</p><button class="btn ghost" data-sl-copy-f="vi">복사</button></div>` : ''}
        </div>` : ''}` : `
      <p class="muted" style="margin:4px 0">아직 만든 초안이 없어요. 위에서 상황과 사장님 언어를 고른 뒤 <b>[메시지 만들기]</b>를 눌러 주세요.</p>`;

    return `
      <section class="sl-work" id="sl-work" aria-label="영업 메시지 만들기">
        <div class="sl-work-head">
          <div class="sl-work-title">
            <h3>
              ${esc(s.name)}
              ${s.nameEn ? `<small class="muted">${esc(s.nameEn)}</small>` : ''}
              <span class="badge ${isFull ? 'b-full' : 'b-list'}">${isFull ? '정식' : '가게 찾기용'}</span>
              ${statusBadge(s)}
            </h3>
            <div class="sl-work-meta">
              <a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url)}</a>
              ${s.category ? `<span>${esc(s.category)}</span>` : ''}
              ${s.region ? `<span>${esc(s.region)}</span>` : ''}
              ${s.phone
                ? `<span>전화: <b>${esc(s.phone)}</b>${s.landline ? ' <span class="sl-landline">(유선전화 · Zalo 없을 수 있음)</span>' : ''}</span>`
                : `<span class="sl-landline">전화번호 없음 (Zalo 열기 불가)</span>`}
            </div>
          </div>
          <button class="sl-work-close" id="sl-close">닫기</button>
        </div>

        <div class="sl-ctrl">
          <label class="sl-field">
            <span>상황${isFull ? ' (정식 가게는 첫 연락 불가)' : ''}</span>
            <select id="sl-sit" ${busy ? 'disabled' : ''}>
              ${sits.map(([k, lbl]) => `<option value="${k}" ${ST.form.situation === k ? 'selected' : ''}>${lbl}</option>`).join('')}
            </select>
          </label>
          <label class="sl-field">
            <span>사장님 언어 (먼저 보여 줄 쪽)</span>
            <select id="sl-lang" ${busy ? 'disabled' : ''}>
              <option value="ko" ${ST.form.ownerLang === 'ko' ? 'selected' : ''}>한국인</option>
              <option value="vi" ${ST.form.ownerLang === 'vi' ? 'selected' : ''}>베트남인</option>
            </select>
          </label>
          <label class="sl-field full">
            <span>사장님이 보낸 글 (답장할 때만 적기, 선택)</span>
            <textarea id="sl-msg" placeholder="예: 얼마예요? / 사진 보내드릴게요" ${busy ? 'disabled' : ''}>${esc(ST.form.ownerMsg)}</textarea>
          </label>
        </div>

        <div class="sl-act">
          <button class="btn" id="sl-make" ${busy || !ST.agyReady ? 'disabled' : ''}>
            ${busyHere ? '초안 만드는 중…' : d ? '다시 만들기' : '메시지 만들기'}
          </button>
          ${s.zaloUrl
            ? `<a class="sl-zalo" href="${esc(s.zaloUrl)}" target="_blank" rel="noopener">Zalo 열기 (${esc(s.phone)})</a>`
            : `<span class="sl-zalo off">전화번호 없음</span>`}
          ${!ST.agyReady ? '<span class="muted">안티그래비티(agy)가 PC에 설치되어 있어야 초안을 만들 수 있어요.</span>' : ''}
        </div>

        ${busy ? `<div class="sl-wait">${busyHere
          ? '안티그래비티(Gemini 4 Neon)로 초안을 만드는 중이에요… 보통 20~35초 걸려요. 다른 탭은 그대로 쓸 수 있어요.'
          : '다른 가게 초안을 만드는 중이에요. 끝난 뒤에 누를 수 있어요.'}</div>` : ''}
        ${ST.err ? `<p class="send-err" role="alert">안 됐어요: ${esc(ST.err)}</p>` : ''}

        ${draftsHtml}

        <div class="sl-status-bar">
          <small class="muted">자동 발송 없음 — [복사] → [Zalo 열기]에서 직접 보내고 아래 표시를 눌러 주세요.</small>
          <div class="sl-status-btns">
            <button class="btn sl-btn-ok" data-sl-mark="sent">보냄 표시 (오늘)</button>
            ${s.replied
              ? `<button class="btn ghost" data-sl-mark="unreplied">답 없음으로 되돌리기</button>`
              : `<button class="btn ghost" data-sl-mark="replied">답장 받음</button>`}
            ${(s.sentTs || s.replied)
              ? `<button class="btn ghost" data-sl-mark="clear">보냄 취소</button>` : ''}
          </div>
        </div>
      </section>`;
  }

  function render() {
    const box = $('#tab-sales');
    if (!box) return;
    if (!ST.loaded) {
      box.innerHTML = '<p class="muted">영업 가게 목록을 불러오는 중…</p>';
      return;
    }

    const list = filteredStores();
    const overdueInKind = ST.stores.filter(s => (!ST.kind || s.kind === ST.kind) && s.overdue).length;
    const shown = (ST.showAll || ST.q.trim() || ST.status) ? list : list.slice(0, 25);
    const busy = !!ST.drafting;

    const rowsHtml = shown.length ? shown.map(s => {
      const hasDraft = !!s.draft;
      const cls = (s.id === ST.selected ? ' sel' : '') + (s.overdue ? ' over' : '');
      return `
        <article class="sl-row${cls}" data-sl-id="${esc(s.id)}">
          <div class="sl-row-main">
            <div class="sl-row-top">
              <b>${esc(s.name)}</b>
              ${s.nameEn ? `<small>${esc(s.nameEn)}</small>` : ''}
              ${statusBadge(s)}
              ${hasDraft ? '<span class="badge b-full">초안 저장됨</span>' : ''}
            </div>
            <div class="sl-row-sub">
              <span>${esc(s.region || '지역 없음')} · ${esc(s.category || '음식점')}</span>
              ${s.phone
                ? `<span>☎ ${esc(s.phone)}${s.landline ? ' <span class="sl-landline">(유선)</span>' : ''}</span>`
                : '<span class="sl-landline">전화 없음</span>'}
            </div>
          </div>
          <div class="sl-row-act">
            <button class="btn ${hasDraft ? 'ghost' : ''}" data-sl-open="${esc(s.id)}" ${busy && s.id !== ST.selected ? 'disabled' : ''}>
              ${hasDraft ? '저장된 초안 보기' : '메시지 만들기'}
            </button>
            ${s.zaloUrl
              ? `<a class="sl-zalo" href="${esc(s.zaloUrl)}" target="_blank" rel="noopener">Zalo 열기</a>`
              : `<span class="sl-zalo off">전화 없음</span>`}
          </div>
        </article>`;
    }).join('') : '<p class="muted">조건에 맞는 가게가 없어요.</p>';

    // 검색창(#sl-q)은 한 번만 만들고 유지한다 — 매 글자마다 다시 그리면 한글 입력기(IME) 조합이 끊겨 초성만 입력된다
    if (!$('#sl-q', box)) {
      box.innerHTML = `
        <div class="sl">
          <div class="sl-notice" id="sl-notice"></div>
          <div class="sl-bar">
            <input id="sl-q" type="search" placeholder="가게 이름·전화·지역 찾기">
            <div class="seg" id="sl-kind"></div>
          </div>
          <div class="sl-pills" id="sl-status"></div>
          <div id="sl-work-wrap"></div>
          <div id="sl-list-wrap"></div>
        </div>`;
    }

    const qEl = $('#sl-q', box);
    if (qEl && document.activeElement !== qEl && qEl.value !== ST.q) qEl.value = ST.q;

    $('#sl-notice', box).innerHTML = `
      <b>반자동 Zalo 영업</b> — 추가 비용 0원(안티그래비티 Gemini). 보낸 지 <b>3일 넘고 답 없는 가게</b>는 자동으로 맨 위에 올라옵니다.
      ${overdueInKind ? ` · 지금 <b>${overdueInKind}곳</b>이 3일 넘게 답을 기다리고 있어요.` : ''}`;

    $('#sl-kind', box).innerHTML = `
      <button data-k="listing" class="${ST.kind === 'listing' ? 'on' : ''}">가게 찾기용 (${ST.counts.listing || 0})</button>
      <button data-k="full" class="${ST.kind === 'full' ? 'on' : ''}">정식 (${ST.counts.full || 0})</button>
      <button data-k="" class="${ST.kind === '' ? 'on' : ''}">전체 (${ST.stores.length})</button>`;

    $('#sl-status', box).innerHTML = `
      <button class="sl-pill ${ST.status === '' ? 'on' : ''}" data-st="">전체 ${list.length}곳</button>
      <button class="sl-pill warn ${ST.status === 'overdue' ? 'on' : ''}" data-st="overdue">3일+ 답 없음 (${overdueInKind})</button>
      <button class="sl-pill ${ST.status === 'unsent' ? 'on' : ''}" data-st="unsent">안 보냄</button>
      <button class="sl-pill ${ST.status === 'sent' ? 'on' : ''}" data-st="sent">보냄</button>
      <button class="sl-pill ${ST.status === 'replied' ? 'on' : ''}" data-st="replied">답장 받음</button>`;

    $('#sl-work-wrap', box).innerHTML = renderWork();

    $('#sl-list-wrap', box).innerHTML = `
      <div class="sl-list">${rowsHtml}</div>
      ${list.length > shown.length
        ? `<button class="btn ghost sl-more" id="sl-more">전체 ${list.length}곳 보기</button>`
        : (ST.showAll && list.length > 25 ? `<button class="btn ghost sl-more" id="sl-more">25곳만 보기</button>` : '')}`;
  }

  async function load() {
    const r = await get('/api/sales').catch(() => ({ error: '영업 목록을 불러오지 못했어요' }));
    if (r.error) {
      const box = $('#tab-sales');
      if (box) box.innerHTML = `<p class="send-err">${esc(r.error)}</p>`;
      return;
    }
    ST.loaded = true;
    ST.stores = r.stores || [];
    ST.counts = r.counts || {};
    ST.agyReady = r.agyReady !== false;
    if (!ST.drafting && r.drafting) ST.drafting = r.drafting;
    render();
  }

  async function runDraft() {
    if (!ST.selected || ST.drafting) return;
    const sid = ST.selected;
    ST.drafting = sid;
    ST.err = '';
    render();
    const r = await post('/api/sales/draft', {
      id: sid,
      situation: ST.form.situation,
      ownerLang: ST.form.ownerLang,
      ownerMsg: ST.form.ownerMsg,
    });
    ST.drafting = null;
    if (r.error) {
      ST.err = r.error;
      render();
      return;
    }
    say('초안을 만들어 저장했어요');
    await load();
  }

  async function runMark(action) {
    if (!ST.selected) return;
    const r = await post('/api/sales/sent', { id: ST.selected, action });
    if (r.error) {
      ST.err = r.error;
      render();
      return;
    }
    const labels = { sent: '오늘 날짜로 보냄 표시했어요', replied: '답장 받음으로 표시했어요', unreplied: '답 없음으로 되돌렸어요', clear: '보냄 표시를 취소했어요' };
    say(labels[action] || '저장했어요');
    await load();
  }

  // 이벤트는 #tab-sales 하나에 위임 (다시 그려도 중복 등록 없음)
  document.addEventListener('click', e => {
    const tab = $('#tab-sales');
    if (!tab || !tab.contains(e.target)) return;

    const kindBtn = e.target.closest('#sl-kind button');
    if (kindBtn) { ST.kind = kindBtn.dataset.k; ST.showAll = false; return render(); }

    const stBtn = e.target.closest('#sl-status button');
    if (stBtn) { ST.status = stBtn.dataset.st; return render(); }

    if (e.target.id === 'sl-more') { ST.showAll = !ST.showAll; return render(); }
    if (e.target.id === 'sl-close') { ST.selected = null; ST.err = ''; return render(); }
    if (e.target.id === 'sl-make') return runDraft();

    const openBtn = e.target.closest('[data-sl-open]');
    if (openBtn) return selectStore(openBtn.dataset.slOpen);

    const copyBtn = e.target.closest('[data-sl-copy]');
    if (copyBtn) {
      const lang = copyBtn.dataset.slCopy;
      const val = $(`#sl-text-${lang}`)?.value || '';
      return copyText(val, lang === 'ko' ? '한국어 초안을' : '베트남어 초안을');
    }

    const copyF = e.target.closest('[data-sl-copy-f]');
    if (copyF) {
      const s = ST.stores.find(x => x.id === ST.selected);
      const lang = copyF.dataset.slCopyF;
      return copyText(lang === 'ko' ? s?.draft?.followup_ko : s?.draft?.followup_vi, '후속 한 줄을');
    }

    const markBtn = e.target.closest('[data-sl-mark]');
    if (markBtn) return runMark(markBtn.dataset.slMark);
  });

  document.addEventListener('input', e => {
    const tab = $('#tab-sales');
    if (!tab || !tab.contains(e.target)) return;
    if (e.target.id === 'sl-q') {
      ST.q = e.target.value;
      render();
    }
    if (e.target.id === 'sl-msg') ST.form.ownerMsg = e.target.value;
  });

  document.addEventListener('change', e => {
    const tab = $('#tab-sales');
    if (!tab || !tab.contains(e.target)) return;
    if (e.target.id === 'sl-sit') ST.form.situation = e.target.value;
    if (e.target.id === 'sl-lang') ST.form.ownerLang = e.target.value;
  });

  window.Sales = {
    open() { load(); },
  };
})();
