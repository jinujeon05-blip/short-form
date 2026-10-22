// 관리자 화면의 새 탭들: 가게 관리(영업 현황) · 메뉴 편집 · 리포트 · 보안·기록
(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const key = () => { try { return sessionStorage.getItem('qm_admin'); } catch { return null; } };
  const H = () => ({ 'x-admin-key': key() || '' });
  const STORES = (window.STORES || []).slice();
  const nameOf = (id) => (STORES.find((s) => s.id === id) || { name: id }).name;
  const STATUS = { listing: '가게 찾기용(동의 전)', pitched: '제안함', talking: '협의 중', contracted: '정식·계약', paused: '보류' };
  const defStatus = (s) => (s.listing ? 'listing' : 'contracted');
  const ACT = { 'menu-save': '메뉴 저장', 'menu-restore': '이전 버전으로 복원', 'menu-reset': '기본 메뉴로 초기화', photo: '사진 올림', login: '점주 로그인', 'owner-pw': '점주 비밀번호 발급', 'owner-off': '점주 로그인 끔', crm: '영업 정보 수정' };
  const ACTOR = { admin: '관리자', owner: '점주' };
  const fmtT = (ts) => new Date(ts).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  let crm = { shops: {} }, owners = {}, custom = {}, sel = null, editor = null, menuShop = null, statsCache = null;

  const css = document.createElement('style');
  css.textContent = `
  .tabs{display:flex;gap:4px;overflow-x:auto;margin:0 0 14px;border-bottom:1px solid var(--line)}
  .tabs button{font:inherit;font-size:14px;border:0;background:transparent;color:var(--muted);padding:9px 14px;cursor:pointer;border-bottom:3px solid transparent;white-space:nowrap}
  .tabs button[aria-pressed="true"]{color:var(--ink);font-weight:700;border-bottom-color:var(--accent)}
  .f{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.f label{display:block;font-size:12px;color:var(--muted);margin:6px 0 3px}
  .f input,.f textarea,.f select,.inl{font:inherit;color:inherit;background:var(--bg);border:1px solid var(--line);border-radius:9px;padding:8px 10px;width:100%}
  select.inl{width:auto;padding:5px 8px}.f .wide{grid-column:1/-1}
  .tg{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.pill{display:inline-block;border-radius:999px;padding:1px 9px;font-size:12px;background:var(--accent-2)}
  .dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--line)}.dot.on{background:var(--ok)}
  .hist{font-size:13px;margin:6px 0;color:var(--muted)}.hist b{color:var(--ink);font-weight:600}
  .modal{position:fixed;inset:0;background:rgba(0,0,0,.45);display:grid;place-items:center;z-index:60;padding:16px}.modal>div{background:var(--card);border-radius:14px;padding:18px;max-width:480px;width:100%}
  .copy{font:13px/1.5 ui-monospace,Menlo,Consolas,monospace;background:var(--bg);border:1px dashed var(--line);border-radius:10px;padding:10px;white-space:pre-wrap;word-break:break-all;margin:10px 0}
  @media(max-width:720px){.f{grid-template-columns:1fr}}`;
  document.head.appendChild(css);

  async function api(action, body) {
    const r = await fetch('/api/admin?action=' + action, body ? { method: 'POST', headers: { ...H(), 'content-type': 'application/json' }, body: JSON.stringify(body) } : { headers: H() });
    if (r.status === 401) { try { sessionStorage.removeItem('qm_admin'); } catch {} location.reload(); throw new Error('auth'); }
    if (r.status === 429) { alert('로그인 시도가 너무 많아 한 시간 막혔어요.'); throw new Error('blocked'); }
    if (!r.ok) throw new Error('failed');
    return r.json();
  }
  const entry = (id) => crm.shops[id] || { status: defStatus(STORES.find((s) => s.id === id) || {}), contact: {}, memo: '', next: '', fee: '', history: [] };
  const copyText = async (t, btn) => { try { await navigator.clipboard.writeText(t); if (btn) btn.textContent = '복사했어요'; } catch { prompt('복사해 주세요', t); } };
  function modal(html) {
    const m = document.createElement('div'); m.className = 'modal'; m.innerHTML = `<div>${html}<div style="margin-top:12px"><button class="btn" data-x="1">닫기</button></div></div>`;
    m.addEventListener('click', (e) => { if (e.target === m || e.target.dataset.x) m.remove(); }); document.body.appendChild(m); return m;
  }

  // ───── 가게 관리 ─────
  async function loadShops() {
    const box = $('tab-shops'); box.innerHTML = '<div class="card">불러오는 중…</div>';
    try { ({ crm, owners, custom } = await api('crm-get')); } catch { box.innerHTML = '<div class="card">불러오지 못했어요. 새로고침해 주세요.</div>'; return; }
    paintShops();
  }
  function paintShops() {
    const box = $('tab-shops');
    const counts = {}; STORES.forEach((s) => { const st = entry(s.id).status; counts[st] = (counts[st] || 0) + 1; });
    const due = STORES.filter((s) => { const n = entry(s.id).next; return n && n <= new Date().toISOString().slice(0, 10); });
    const cards = Object.entries(STATUS).map(([k, v]) => `<div class="card"><small>${v}</small><b>${counts[k] || 0}</b></div>`).join('');
    const rows = STORES.map((s) => { const e = entry(s.id); return `<tr data-id="${s.id}" class="${s.id === sel ? 'sel' : ''}"><td class="name">${esc(s.name)}<small>${s.id}.qrmenuasia.com</small></td>
      <td><select class="inl" data-st="${s.id}">${Object.entries(STATUS).map(([k, v]) => `<option value="${k}"${k === e.status ? ' selected' : ''}>${v}</option>`).join('')}</select></td>
      <td class="num hide-m">${esc(e.next || '–')}</td><td><span class="dot ${owners[s.id] ? 'on' : ''}" title="점주 로그인"></span></td><td><span class="dot ${custom[s.id] ? 'on' : ''}" title="직접 고친 메뉴"></span></td>
      <td class="hide-m" style="text-align:left;max-width:240px;overflow:hidden;text-overflow:ellipsis">${esc((e.history[0] || {}).text || e.memo || '')}</td></tr>`; }).join('');
    box.innerHTML = `<div class="cards" style="grid-template-columns:repeat(5,1fr)">${cards}</div>
      ${due.length ? `<div class="card" style="margin-bottom:12px;border-color:var(--accent)"><b>오늘까지 연락할 곳</b>: ${due.map((s) => esc(s.name)).join(' · ')}</div>` : ''}
      <div class="card"><div class="scroll"><table><thead><tr><th>가게</th><th>상태</th><th class="hide-m">다음 연락</th><th>점주 로그인</th><th>맞춤 메뉴</th><th class="hide-m">최근 기록·메모</th></tr></thead><tbody>${rows}</tbody></table></div></div>
      <div id="shopDetail"></div>`;
    if (sel) detail(sel);
  }
  function detail(id) {
    sel = id; document.querySelectorAll('#tab-shops tbody tr').forEach((r) => r.classList.toggle('sel', r.dataset.id === id));
    const e = entry(id), c = e.contact || {}, el = $('shopDetail');
    el.innerHTML = `<div class="card detail"><h2>${esc(nameOf(id))}</h2><p class="sub">${id}.qrmenuasia.com</p>
      <div class="f"><div><label>사장님 이름</label><input data-f="cname" value="${esc(c.name)}"></div><div><label>전화</label><input data-f="cphone" value="${esc(c.phone)}"></div>
      <div><label>Zalo</label><input data-f="czalo" value="${esc(c.zalo)}"></div><div><label>카카오톡</label><input data-f="ckakao" value="${esc(c.kakao)}"></div>
      <div><label>다음 연락일</label><input type="date" data-f="next" value="${esc(e.next)}"></div><div><label>요금·조건</label><input data-f="fee" value="${esc(e.fee)}" placeholder="예: 월 20만동, 설치비 면제"></div>
      <div class="wide"><label>연락처 메모</label><input data-f="cnote" value="${esc(c.note)}"></div><div class="wide"><label>메모</label><textarea rows="3" data-f="memo">${esc(e.memo)}</textarea></div></div>
      <div class="tg"><button class="btn primary" data-a="save">저장</button><button class="btn" data-a="pw">점주 비밀번호 새로 만들기</button><button class="btn" data-a="pwoff">점주 로그인 끄기</button><button class="btn" data-a="rep30">리포트 링크(30일)</button><button class="btn" data-a="rep90">리포트 링크(90일)</button><button class="btn" data-a="editmenu">메뉴 편집</button></div>
      <h2 style="margin-top:18px">영업 진행 기록</h2><div class="f"><div class="wide"><input data-f="note" placeholder="예: 10/22 사장님과 통화, 다음 주 방문 약속"></div></div><div class="tg"><button class="btn" data-a="addnote">기록 추가</button></div>
      <div style="margin-top:8px">${(e.history || []).map((h) => `<div class="hist"><b>${new Date(h.ts).toLocaleDateString('ko-KR')}</b> ${esc(h.text)}</div>`).join('') || '<div class="hist">아직 기록이 없어요</div>'}</div></div>`;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  const val = (f) => (document.querySelector(`#shopDetail [data-f="${f}"]`) || {}).value || '';
  async function saveEntry(withNote) {
    const patch = { contact: { name: val('cname'), phone: val('cphone'), zalo: val('czalo'), kakao: val('ckakao'), note: val('cnote') }, memo: val('memo'), next: val('next'), fee: val('fee') };
    const j = await api('crm-set', { shop: sel, patch, note: withNote ? val('note') : '' });
    crm.shops[sel] = j.entry; return j;
  }
  $('tab-shops').addEventListener('change', async (e) => {
    const id = e.target.dataset.st; if (!id) return;
    try { const j = await api('crm-set', { shop: id, patch: { status: e.target.value } }); crm.shops[id] = j.entry; const prev = sel; paintShops(); sel = prev; } catch {}
  });
  $('tab-shops').addEventListener('click', async (e) => {
    const tr = e.target.closest('tbody tr[data-id]'); if (tr && !e.target.closest('select')) return detail(tr.dataset.id);
    const b = e.target.closest('[data-a]'); if (!b || !sel) return;
    const a = b.dataset.a;
    try {
      if (a === 'save') { await saveEntry(false); b.textContent = '저장했어요'; paintShops(); }
      else if (a === 'addnote') { if (!val('note').trim()) return; await saveEntry(true); paintShops(); }
      else if (a === 'pw') {
        if (owners[sel] && !confirm('이미 점주 비밀번호가 있어요. 새로 만들면 예전 비밀번호는 쓸 수 없어요. 계속할까요?')) return;
        const j = await api('owner-pw', { shop: sel }); owners[sel] = Date.now();
        const link = `https://qrmenuasia.com/owner/?shop=${sel}`;
        const msg = `[${nameOf(sel)}] 메뉴 관리 주소: ${link}\n비밀번호: ${j.password}\n(Địa chỉ quản lý thực đơn: ${link} — Mật khẩu: ${j.password})`;
        const m = modal(`<h2 style="margin-top:0">점주 비밀번호</h2><p style="font-size:14px">이 화면을 닫으면 비밀번호를 다시 볼 수 없어요. 사장님께 아래 문구를 그대로 보내 주세요.</p><div class="copy">${esc(msg)}</div><button class="btn primary" data-c="1">문구 복사</button>`);
        m.querySelector('[data-c]').onclick = (ev) => copyText(msg, ev.target); paintShops();
      }
      else if (a === 'pwoff') { if (!confirm('이 가게 점주가 더 이상 로그인할 수 없게 할까요?')) return; await api('owner-pw-off', { shop: sel }); delete owners[sel]; paintShops(); }
      else if (a === 'rep30' || a === 'rep90') {
        const j = await api('report-link', { shop: sel, days: a === 'rep30' ? 30 : 90 });
        const m = modal(`<h2 style="margin-top:0">${esc(nameOf(sel))} 방문 리포트 링크</h2><p style="font-size:14px">사장님께 보내면 비밀번호 없이 열려요. 한국어/베트남어 전환과 인쇄(PDF 저장)가 됩니다.</p><div class="copy">${esc(j.url)}</div><button class="btn primary" data-c="1">링크 복사</button> <a class="btn" href="${esc(j.url)}" target="_blank" rel="noopener">열어 보기</a>`);
        m.querySelector('[data-c]').onclick = (ev) => copyText(j.url, ev.target);
      }
      else if (a === 'editmenu') show('menu', sel);
    } catch (er) { if (er.message !== 'auth' && er.message !== 'blocked') alert('처리하지 못했어요. 잠시 뒤 다시 해 주세요.'); }
  });

  // ───── 메뉴 편집 ─────
  function menuTab(shop) {
    const box = $('tab-menu');
    if (!box.dataset.init) {
      box.dataset.init = '1';
      box.innerHTML = `<div class="card" style="margin-bottom:12px"><div class="f"><div><label>가게</label><select id="menuShop">${STORES.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></div><div style="align-self:end;font-size:13px;color:var(--muted)">점주가 쓰는 화면과 같아요. 여기서 저장해도 손님 화면에 1분 안에 반영돼요.</div></div></div><div id="menuEd"></div>`;
      $('menuShop').addEventListener('change', () => menuTab($('menuShop').value));
    }
    shop = shop || menuShop || STORES[0].id;
    if (shop === menuShop && editor) return;
    menuShop = shop; $('menuShop').value = shop; $('menuEd').innerHTML = '';
    editor = MenuEditor.mount($('menuEd'), { shop, ui: 'ko', headers: H, onAuthFail: () => location.reload() });
  }

  // ───── 리포트 ─────
  async function reportTab() {
    const box = $('tab-report'); box.innerHTML = '<div class="card">불러오는 중…</div>';
    try {
      const r = await fetch('/api/stats?days=30', { headers: H() }); if (r.status === 401) return location.reload();
      statsCache = await r.json(); ({ crm } = await api('crm-get'));
    } catch { box.innerHTML = '<div class="card">불러오지 못했어요.</div>'; return; }
    const sh = statsCache.shops;
    const rows = STORES.map((s) => { const d = sh[s.id] || { vis: 0, pv: 0 }; return { s, vis: d.vis, pv: d.pv }; }).sort((a, b) => b.vis - a.vis);
    box.innerHTML = `<div class="card"><p style="margin-top:0;font-size:14px">최근 30일 방문자가 많은 순서예요. <b>링크 복사</b>를 누르면 사장님께 보낼 리포트 주소가 복사돼요(비밀번호 없이 열림, 한국어/베트남어, 인쇄·PDF 저장 가능).</p>
      <div class="tg" style="margin:0 0 10px"><button class="btn" id="csv">전체 요약 엑셀(CSV) 내려받기</button></div>
      <div class="scroll"><table><thead><tr><th>가게</th><th>방문자(30일)</th><th class="hide-m">페이지뷰</th><th class="hide-m">상태</th><th>리포트</th></tr></thead><tbody>${rows.map(({ s, vis, pv }) => `<tr style="cursor:default"><td class="name">${esc(s.name)}</td><td class="num">${vis}</td><td class="num hide-m">${pv}</td><td class="hide-m">${STATUS[entry(s.id).status]}</td><td><button class="btn" data-copy="${s.id}">링크 복사</button></td></tr>`).join('')}</tbody></table></div></div>`;
    $('csv').onclick = () => {
      const lines = ['가게,아이디,상태,방문자(30일),페이지뷰(30일),모바일 비율,QR 꼬리표 방문자,다음 연락일'];
      rows.forEach(({ s, vis, pv }) => { const d = sh[s.id] || { dev: {}, src: {} }; const mob = vis ? Math.round(((d.dev.mobile || 0) / vis) * 100) : 0; lines.push([s.name, s.id, STATUS[entry(s.id).status], vis, pv, mob + '%', (d.src && d.src.qr) || 0, entry(s.id).next || ''].map((x) => `"${String(x).replace(/"/g, '""')}"`).join(',')); });
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' })); a.download = `qr-menu-summary-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    };
    box.querySelectorAll('[data-copy]').forEach((b) => (b.onclick = async () => { try { const j = await api('report-link', { shop: b.dataset.copy, days: 30 }); await copyText(j.url, b); } catch {} }));
  }

  // ───── 보안·기록 ─────
  async function secTab() {
    const box = $('tab-sec'); box.innerHTML = '<div class="card">불러오는 중…</div>';
    let j; try { j = await api('log-list'); } catch { box.innerHTML = '<div class="card">불러오지 못했어요.</div>'; return; }
    box.innerHTML = `<div class="cards" style="grid-template-columns:repeat(3,1fr)"><div class="card"><small>이번 한 시간 틀린 로그인</small><b>${j.failsThisHour}</b><i>한 기기(IP)에서 8번 틀리면 한 시간 막혀요</i></div><div class="card"><small>점주 로그인 켜진 가게</small><b>${Object.keys(owners).length || '–'}</b></div><div class="card"><small>직접 고친 메뉴가 있는 가게</small><b>${Object.keys(custom).length || '–'}</b></div></div>
      <div class="card"><h2 style="margin-top:0">최근 활동 (최근 3일)</h2><div class="scroll"><table><thead><tr><th>시간</th><th>누가</th><th>무엇을</th><th>가게</th></tr></thead><tbody>${j.rows.map((r) => `<tr style="cursor:default"><td class="num">${fmtT(r.ts)}</td><td>${ACTOR[r.actor] || esc(r.actor)}</td><td>${ACT[r.action] || esc(r.action)}</td><td>${esc(r.shop && r.shop !== 'na' ? nameOf(r.shop) : '')}</td></tr>`).join('') || '<tr><td colspan="4" class="zero">아직 기록이 없어요</td></tr>'}</tbody></table></div></div>
      <p class="note">· 관리자 비밀번호를 바꾸고 싶으면 저(Claude)에게 “비밀번호 바꿔줘”라고 하세요(약 1분). · 점주 비밀번호는 위 <b>가게 관리</b> 탭에서 가게마다 새로 만들거나 끌 수 있어요.</p>`;
  }

  // ───── 탭 전환 ─────
  function show(tab, arg) {
    document.querySelectorAll('#tabs button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.t === tab));
    ['stats', 'shops', 'menu', 'report', 'sec'].forEach((t) => { const el = $('tab-' + t); if (el) el.hidden = t !== tab; });
    $('range').style.display = tab === 'stats' ? '' : 'none'; $('reload').style.display = tab === 'stats' ? '' : 'none';
    if (tab === 'shops') loadShops(); else if (tab === 'menu') menuTab(arg); else if (tab === 'report') reportTab(); else if (tab === 'sec') secTab();
    try { history.replaceState(null, '', '#' + tab); } catch {}
  }
  $('tabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) show(b.dataset.t); });
  window.QMAdmin = { show, start() { const t = (location.hash || '').slice(1); if (['shops', 'menu', 'report', 'sec'].includes(t)) show(t); } };
})();
