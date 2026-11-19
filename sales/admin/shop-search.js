// 관리 화면 공통 '가게 검색' 부품 (2026-11-16)
// 가게 고르기 <select>를 검색창으로 바꾼다. 원래 <select>는 숨겨서 그대로 두므로(값·change 이벤트 그대로),
// 각 탭 코드는 select 를 만든 뒤 QMShopPick.attach(select) 한 줄만 부르면 된다.
// 찾는 범위: 가게 이름·아이디·부제·주소·지역·검색어(keywords), 한글 초성(ㄱㅁㅅ → 가마솥), 베트남어 성조 없이(pho → Phở).
(function () {
  const STORES = window.STORES || [];
  const REG = window.REGIONS || {};
  const byId = {}; STORES.forEach((s) => { byId[s.id] = s; });
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const CHO = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[\s·.,'’\-_/()]+/g, '');
  const initials = (s) => Array.from(String(s || '')).map((ch) => { const c = ch.charCodeAt(0); return c >= 0xac00 && c <= 0xd7a3 ? CHO[Math.floor((c - 0xac00) / 588)] : /[a-z0-9]/i.test(ch) ? ch.toLowerCase() : ''; }).join('');
  const isCho = (q) => /^[ㄱ-ㅎ]+$/.test(q);
  const RKEY = 'qm_admin_recent_shops';
  const recent = { get() { try { return JSON.parse(localStorage.getItem(RKEY) || '[]'); } catch { return []; } }, add(id) { try { const a = recent.get().filter((x) => x !== id); a.unshift(id); localStorage.setItem(RKEY, JSON.stringify(a.slice(0, 6))); } catch {} } };

  const css = document.createElement('style');
  css.textContent = `
  .sp-pick{position:relative}
  .sp-box{display:flex;align-items:center;gap:8px;background:var(--bg);border:1.5px solid var(--line);border-radius:12px;padding:0 12px;transition:border-color .15s,box-shadow .15s}
  .sp-box:focus-within{border-color:var(--accent);box-shadow:0 0 0 4px var(--accent-2)}
  .sp-box svg{flex:none;color:var(--muted)}
  .sp-pick .sp-box input{flex:1;min-width:0;width:auto;font:inherit;font-size:16px;font-weight:700;color:var(--ink);background:transparent;border:0;border-radius:0;outline:0;padding:11px 0;box-shadow:none}
  .sp-box input::placeholder{font-weight:400;color:var(--muted)}
  .sp-box .sp-n{flex:none;font-size:12px;color:var(--muted);white-space:nowrap}
  .sp-list{position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:50;margin:0;padding:6px;list-style:none;background:var(--card);border:1px solid var(--line);border-radius:12px;box-shadow:0 14px 40px rgba(0,0,0,.16);max-height:min(380px,60vh);overflow-y:auto}
  .sp-list li{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:9px;cursor:pointer}
  .sp-list li.on{background:var(--accent-2)}
  .sp-list li .av{flex:none;width:32px;height:32px;border-radius:9px;display:grid;place-items:center;font-weight:800;font-size:14px;color:#fff;background:var(--accent)}
  .sp-list li .tx{min-width:0;flex:1}
  .sp-list li b{display:block;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .sp-list li small{display:block;font-size:12px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .sp-list li .sp-tag{flex:none;font-size:11px;border-radius:999px;padding:1px 8px;background:var(--bg);color:var(--muted);border:1px solid var(--line)}
  .sp-list li.cur b::after{content:' ✓';color:var(--accent)}
  .sp-list .sp-empty{padding:14px;color:var(--muted);font-size:13px;text-align:center}
  .sp-list mark{background:none;color:var(--accent);font-weight:800}
  .sp-recent{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:8px;font-size:12px;color:var(--muted)}
  .sp-recent button{font:inherit;font-size:12px;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:3px 10px;cursor:pointer;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .sp-recent button:hover{border-color:var(--accent);color:var(--accent)}
  .sp-recent button.cur{background:var(--accent);border-color:var(--accent);color:#fff}`;
  document.head.appendChild(css);

  const HUE = (id) => { let h = 0; for (const c of String(id)) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
  const avatar = (id, name) => { const ch = Array.from(String(name || id).replace(/^[^0-9A-Za-z가-힣À-ỹ]+/, ''))[0] || '?'; return `<span class="av" style="background:hsl(${HUE(id)} 55% 50%)">${esc(ch.toUpperCase())}</span>`; };

  // 검색 대상 한 줄 만들기
  function entry(opt) {
    const s = byId[opt.value] || {};
    const name = s.name || opt.textContent.replace(/ · 가게 찾기용$/, '');
    const region = s.region && REG[s.region] ? [REG[s.region].ko, REG[s.region].vi, REG[s.region].en].join(' ') : '';
    const type = s.type && typeof s.type === 'object' ? Object.values(s.type).join(' ') : s.type || '';
    return {
      id: opt.value, name, listing: !!s.listing,
      sub: [s.sub, region && REG[s.region].ko].filter(Boolean).join(' · ') || opt.value + '.qrmenuasia.com',
      kName: norm(name), kId: norm(opt.value), kCho: initials(name),
      kMid: norm([s.sub, s.address, region].join(' ')), kLow: norm([type, s.keywords].join(' ')),
    };
  }
  function score(e, q, qn) {
    if (!q) return 10;
    if (isCho(q)) return e.kCho.startsWith(q) ? 0 : e.kCho.includes(q) ? 1 : -1;
    if (!qn) return 10;
    if (e.kName.startsWith(qn) || e.kId.startsWith(qn)) return 0;
    if (e.kName.includes(qn) || e.kId.includes(qn)) return 1;
    if (e.kMid.includes(qn)) return 2;
    if (e.kLow.includes(qn)) return 3;
    return -1;
  }
  function hl(text, q) {
    const t = String(text); if (!q || isCho(q)) return esc(t);
    const i = t.toLowerCase().indexOf(q.toLowerCase()); if (i < 0) return esc(t);
    return esc(t.slice(0, i)) + '<mark>' + esc(t.slice(i, i + q.length)) + '</mark>' + esc(t.slice(i + q.length));
  }

  function attach(sel, opts) {
    if (!sel || sel.dataset.sp) return;
    sel.dataset.sp = '1';
    opts = opts || {};
    const list = Array.from(sel.options).map(entry);
    const wrap = document.createElement('div'); wrap.className = 'sp-pick';
    wrap.innerHTML = `<div class="sp-box"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input type="search" role="combobox" aria-expanded="false" aria-autocomplete="list" autocomplete="off" spellcheck="false" placeholder="가게 이름·주소·초성(ㄱㅁㅅ) 검색"><span class="sp-n">${list.length}곳</span></div>
      <ul class="sp-list" role="listbox" hidden></ul><div class="sp-recent" hidden></div>`;
    sel.hidden = true;
    sel.insertAdjacentElement('afterend', wrap);
    const inp = wrap.querySelector('input'), ul = wrap.querySelector('ul'), rec = wrap.querySelector('.sp-recent');
    let shown = [], on = 0, open = false;

    const curName = () => { const e = list.find((x) => x.id === sel.value); return e ? e.name : ''; };
    const syncLabel = () => { if (document.activeElement !== inp) inp.value = curName(); paintRecent(); };
    // 다른 코드가 select.value = id 로 바꿔도 검색창 글자가 따라가게 한다
    const d = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    Object.defineProperty(sel, 'value', { configurable: true, get() { return d.get.call(this); }, set(v) { d.set.call(this, v); syncLabel(); } });

    function paintRecent() {
      const ids = recent.get().filter((id) => list.some((x) => x.id === id));
      rec.hidden = !ids.length;
      rec.innerHTML = ids.length ? '최근: ' + ids.map((id) => `<button type="button" data-id="${esc(id)}" class="${id === sel.value ? 'cur' : ''}">${esc(list.find((x) => x.id === id).name)}</button>`).join('') : '';
    }
    function paint(q) {
      const raw = q.trim(), qn = norm(raw), qc = raw.replace(/\s+/g, '');
      shown = list.map((e) => [e, score(e, isCho(qc) ? qc : raw, qn)]).filter(([, s]) => s >= 0)
        .sort((a, b) => a[1] - b[1] || (raw ? a[0].name.length - b[0].name.length : 0)).map(([e]) => e);
      if (!raw) { const cur = shown.findIndex((e) => e.id === sel.value); on = cur < 0 ? 0 : cur; } else on = 0;
      ul.innerHTML = shown.length ? shown.map((e, i) => `<li role="option" data-i="${i}" class="${i === on ? 'on' : ''}${e.id === sel.value ? ' cur' : ''}">${avatar(e.id, e.name)}<span class="tx"><b>${hl(e.name, raw)}</b><small>${hl(e.sub, raw)}</small></span>${e.listing ? '<span class="sp-tag">가게 찾기용</span>' : ''}</li>`).join('')
        : `<li class="sp-empty">“${esc(raw)}”에 맞는 가게가 없어요</li>`;
      wrap.querySelector('.sp-n').textContent = raw ? `${shown.length}/${list.length}곳` : `${list.length}곳`;
      show(true); move(0);
    }
    function show(v) { open = v; ul.hidden = !v; inp.setAttribute('aria-expanded', v); }
    function move(dir) {
      if (!shown.length) return;
      on = Math.max(0, Math.min(shown.length - 1, on + dir));
      ul.querySelectorAll('li[data-i]').forEach((li) => li.classList.toggle('on', +li.dataset.i === on));
      const li = ul.querySelector(`li[data-i="${on}"]`); if (li) li.scrollIntoView({ block: 'nearest' });
    }
    function pick(id) {
      show(false); inp.blur();
      recent.add(id);
      if (id !== sel.value) { sel.value = id; sel.dispatchEvent(new Event('change', { bubbles: true })); }
      syncLabel();
    }

    inp.addEventListener('focus', () => { inp.select(); paint(''); });
    inp.addEventListener('input', () => paint(inp.value));
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) paint(inp.value); else move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); if (open && shown[on]) pick(shown[on].id); }
      else if (e.key === 'Escape') { show(false); inp.blur(); }
    });
    inp.addEventListener('blur', () => setTimeout(() => { if (document.activeElement !== inp) { show(false); syncLabel(); } }, 150));
    ul.addEventListener('mousedown', (e) => e.preventDefault()); // 누르는 순간 검색창이 닫히지 않게
    ul.addEventListener('click', (e) => { const li = e.target.closest('li[data-i]'); if (li) pick(shown[+li.dataset.i].id); });
    rec.addEventListener('click', (e) => { const b = e.target.closest('button[data-id]'); if (b) pick(b.dataset.id); });
    sel.addEventListener('change', syncLabel);
    syncLabel();
    if (opts.focus) setTimeout(() => inp.focus(), 0);
  }

  // 표 줄 걸러 내기용(방문 현황 등): 이름·아이디·주소·검색어에 q가 들어 있는가
  function match(id, label, q) {
    const raw = String(q || '').trim(); if (!raw) return true;
    const qc = raw.replace(/\s+/g, '');
    const e = entry({ value: id, textContent: label || id });
    return score(e, isCho(qc) ? qc : raw, norm(raw)) >= 0;
  }

  window.QMShopPick = { attach, match };
})();
