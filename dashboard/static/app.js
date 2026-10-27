// QR메뉴 사무실 화면. 데이터는 모두 server.py 의 /api/* (저장소 파일·git·CLI 기록)에서 온다.
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const api = p => fetch(p, { cache: 'no-store' }).then(r => r.json());
const S = { stores: [], todo: [], team: null, quota: null, visits: null, jobs: [], kind: '', q: '', open: null, all: false, collector: null };

// 사무실 사진 (사용자가 ChatGPT로 만듦, 2026-10-27). 좌표는 사진 크기 대비 % [x1, y1, x2, y2]
// 폭 700px 이하에서는 세로 사진(phone)을 쓴다. 인력공급팀·선별팀은 아직 사업 전이라 '준비 중'(눌러도 실행 안 됨)
const SOON = { staffing: '인력공급팀', sorting: '선별팀' };
const SCENES = {
  pc: { img: '/static/rooms/office.jpg', w: 1673, h: 940,
    signs: [[10, 33, 32, 39, '사진팀'], [36, 33, 61, 39, '메뉴판팀'], [66, 33, 89, 39, '검수팀'],
      [7.5, 59.5, 31, 65, '번역팀'], [37, 59.5, 62.5, 65, '인력공급팀 · 준비 중'], [68, 59.5, 92, 65, '선별팀 · 준비 중']],
    spots: { captain: [45, 2, 55, 14.5], claude: [45.5, 15.5, 53, 26], finder: [15, 40, 27, 54],
      agy: [38, 40, 46, 54], 'menu-reader': [52, 40, 60, 54], codex: [67.5, 40, 76, 54], reviewer: [80, 40, 88, 54],
      polisher: [14, 66, 24, 82], staffing: [47, 65, 57, 82], sorting: [74, 64, 83, 80] } },
  phone: { img: '/static/rooms/office-phone.jpg', w: 940, h: 1672,
    signs: [[31, 15, 69, 18.5, '비서실'], [9, 30, 47, 33.3, '사진팀'], [52, 30, 91, 33.3, '메뉴판팀'],
      [5.5, 49, 46.5, 52.3, '검수팀'], [53, 49, 94, 52.3, '번역팀'], [5, 70.5, 46.5, 74, '인력공급팀 · 준비 중'], [52.5, 70.5, 94, 74, '선별팀 · 준비 중']],
    spots: { captain: [43, 4, 57, 10], claude: [42, 17, 55, 24], finder: [17, 34, 32, 42],
      agy: [55, 34, 70, 42], 'menu-reader': [72, 34, 86, 42], codex: [7, 53, 25, 61], reviewer: [27, 53, 43, 61],
      polisher: [64, 53, 80, 62], staffing: [16, 75, 32, 84], sorting: [62, 74, 78, 84] } },
};
const ALL_CHECKS = ['check-standard', 'check-listing', 'shot'];
const M = {
  captain: { name: '캡틴', role: '결재' },
  claude: { name: '클로드', role: '지휘', quota: 'claude', safe: ALL_CHECKS },
  finder: { name: 'finder', role: '사진 고르기', quota: 'claude', safe: ['shot'] },
  agy: { name: '안티그래비티', role: '메뉴판 읽기', quota: 'gemini', tool: 'agy' },
  'menu-reader': { name: 'menu-reader', role: '메뉴판 읽기', quota: 'claude' },
  codex: { name: '코덱스', role: '두 번째 검토', quota: 'codex', tool: 'codex' },
  reviewer: { name: 'reviewer', role: '마지막 점검', quota: 'claude', safe: ALL_CHECKS },
  polisher: { name: 'polisher', role: '번역·글', quota: 'claude' },
};
const CHECK_LABEL = { 'check-standard': '가마솥 표준 점검', 'check-listing': '가게 찾기용 전체 점검', shot: '휴대폰 화면 캡처' };

// 직원마다 Claude 에 붙여 넣을 문장 (실행하지 않고 복사만)
const PROMPTS = {
  captain: [],
  claude: [
    s => `${s} 사진 수집기로 올렸어. 가게 찾기용(무동의·무료)으로 새 메뉴판 만들어줘.`,
    s => `${s} 남은 할 일(docs/todo.md) 정리하고 사장님께 물어볼 것만 짧게 알려줘.`,
  ],
  finder: [s => `finder 담당에게: 드라이브 QR메뉴판/${s} 사진 목록과 모음 이미지를 만들고, 메뉴 이름과 확실히 맞는 요리 사진 4~6장을 골라줘.`],
  agy: [s => `${s} 메뉴판 사진을 안티그래비티(agy -p, 계획 모드)로 읽어서 분류|메뉴이름|가격 표를 받고, 메뉴판과 대조해줘.`],
  'menu-reader': [s => `menu-reader 담당에게 ${s} 메뉴판 사진을 읽혀서 메뉴·가격 표(한국어 이름·원문·가격·분류·근거 사진)를 만들어줘.`],
  codex: [s => `${s} 메뉴·가격 표를 코덱스(codex exec --sandbox read-only)로 메뉴판 사진과 한 번 더 대조해줘. 가격·빠진 메뉴만 짧게.`],
  reviewer: [s => `reviewer 담당에게 ${s} 배포 전 마지막 점검을 맡겨줘(예쁨·가게 느낌 → 번역 → 메뉴·가격). 배포는 하지 마.`],
  polisher: [s => `polisher 담당에게 ${s} 메뉴 5개 언어(ko·vi·en·zh·ja) 번역 초안을 맡겨줘.`],
};

// ---------------------------------------------------------------- 사무실
const pct = v => v + '%';
function sceneHtml(key, busy) {
  const sc = SCENES[key];
  const signs = sc.signs.map(([x1, y1, x2, y2, t]) =>
    `<span class="sign" style="left:${pct(x1)};top:${pct(y1)};width:${pct(x2 - x1)};height:${pct(y2 - y1)}">${t}</span>`).join('');
  const spots = Object.entries(sc.spots).map(([id, [x1, y1, x2, y2]]) => {
    const box = `left:${pct(x1)};top:${pct(y1)};width:${pct(x2 - x1)};height:${pct(y2 - y1)}`;
    if (SOON[id]) return `<div class="spot soon" style="${box}" title="${SOON[id]} · 준비 중" aria-disabled="true"><span class="tag">${SOON[id]} <small>· 준비 중</small></span></div>`;
    return `<button class="spot${busy.has(id) ? ' on' : ''}" style="${box}" data-id="${id}" aria-label="${M[id].name} 자리 열기">
      <span class="bubble">작업 중…</span><span class="tag">${esc(M[id].name)} <small>· ${M[id].role}</small></span></button>`;
  }).join('');
  return `<div class="scene ${key}" style="aspect-ratio:${sc.w}/${sc.h}"><img src="${sc.img}" alt="QR메뉴 사무실">${signs}${spots}</div>`;
}
function renderOffice() {
  const busy = new Set(S.jobs.filter(j => j.status === 'running').map(j => j.desk));
  if (S.collector?.job?.status === 'running') busy.add('finder');  // 사진 수집기가 실제로 수집 중
  $('#office').innerHTML = sceneHtml('pc', busy) + sceneHtml('phone', busy);
}
// 옆 창 얼굴: 큰 사진에서 그 사람 자리만 잘라 보여 준다
function avatar(id) {
  const sc = SCENES.pc, [x1, y1, x2, y2] = sc.spots[id], w = x2 - x1, h = y2 - y1;
  const ratio = (h * sc.h) / (w * sc.w);
  return `<div class="avatar" style="aspect-ratio:${1 / ratio};background-image:url('${sc.img}');background-size:${100 / w * 100}% auto;background-position:${x1 / (100 - w) * 100}% ${y1 / (100 - h) * 100}%"></div>`;
}

// ---------------------------------------------------------------- 할당량
const level = p => p >= 90 ? ['stop', 'b-stop', '새 일 금지'] : p >= 80 ? ['warn', 'b-warn', '조심'] : ['', 'b-ok', '여유'];
function dur(sec) {
  if (sec == null) return '';
  const d = Math.floor(sec / 86400), h = Math.floor(sec % 86400 / 3600), m = Math.floor(sec % 3600 / 60);
  return d ? `${d}일 ${h}시간` : h ? `${h}시간 ${m}분` : `${m}분`;
}
function ago(iso) {
  if (!iso) return '';
  const m = Math.round((Date.now() - new Date(iso)) / 60000);
  return m < 1 ? '방금 확인' : m < 60 ? `${m}분 전 기록` : m < 1440 ? `${Math.round(m / 60)}시간 전 기록` : `${Math.round(m / 1440)}일 전 기록`;
}
function quotaCard(key) {
  const q = S.quota?.[key];
  if (!q) return '';
  const title = key === 'codex' ? 'ChatGPT (Codex)' : q.name;
  if (q.status !== 'ok') {
    return `<div class="q na"><h3><i class="dot"></i>${esc(title)}<span class="badge b-na">확인 불가</span></h3>
      <details><summary>확인하는 법</summary>${esc(q.how)}</details></div>`;
  }
  const worst = Math.max(...q.bars.map(b => b.used));
  const [lvl, bc, bt] = level(worst);
  return `<div class="q ${lvl}"><h3><i class="dot"></i>${esc(title)}${q.plan ? ` <small class="muted">${esc(q.plan)}</small>` : ''}<span class="badge ${bc}">${bt}</span><span class="when">${ago(q.recordedAt)}</span></h3>
    ${q.bars.map(b => { const [lv] = level(b.used); return `<div class="row ${lv}"><span class="chip">${esc(b.label)}</span>
      <div class="track"><div class="fill" style="width:${Math.max(1, Math.min(100, b.used))}%"></div></div>
      <b>${b.used}% 사용</b><span class="rst">${b.stale ? '기록 뒤 초기화됨' : '초기화까지 ' + dur(b.resetIn)}</span></div>`; }).join('')}
    <div class="src" title="${esc(q.source)}">출처: ${esc(q.source)}${q.note ? ' · ' + esc(q.note) : ''}</div></div>`;
}
function renderQuota() { $('#quota').innerHTML = ['claude', 'codex', 'gemini'].map(quotaCard).join(''); }

// ---------------------------------------------------------------- 탭
// 할 일 수 = docs/todo.md 의 '- **…**' 줄 수 (한 줄 안의 문장 수가 아님)
function todoFor(id) { return S.todo.filter(g => g.shop === id).length; }
function renderStores() {
  const q = S.q.trim().toLowerCase();
  // 커밋 안 한 가게 먼저, 그다음 마지막 커밋 시각 순 (파일 시각은 브랜치를 바꾸면 전부 새로 찍혀서 안 씀)
  const all = S.stores.filter(s => (!S.kind || s.kind === S.kind) && (!q || (s.name + s.sub + s.id).toLowerCase().includes(q)))
    .sort((a, b) => (b.dirty - a.dirty) || (b.lastCommit || '').localeCompare(a.lastCommit || ''));
  // 처음엔 최근 수정한 12곳만 (사용자 요청 2026-10-27: 너무 많이 나옴)
  const list = S.all || q ? all : all.slice(0, 12);
  $('#more').hidden = list.length === all.length && !S.all;
  $('#more').textContent = S.all ? '최근 12곳만 보기' : `전체 ${all.length}곳 보기`;
  $('#stores').innerHTML = list.map(s => {
    const k = s.kind === 'full' ? '<span class="badge b-full">정식</span>' : s.kind === 'listing' ? '<span class="badge b-list">가게 찾기용</span>' : '<span class="badge b-na">종류 미정</span>';
    const t = todoFor(s.id);
    return `<article class="sc"><div class="ph" ${s.demo ? `style="background-image:url('/demo/${s.id}')"` : ''}>${k}</div><div class="bd">
      <b>${esc(s.name)}</b><a href="${s.url}" target="_blank" rel="noopener">${s.id}.qrmenuasia.com</a>
      <div class="meta"><span>메뉴 ${s.menuItems}</span><span>사진 ${s.photos}</span>${t ? `<span>할 일 ${t}</span>` : ''}</div>
      <div class="meta">${s.dirty ? '<span>커밋 안 한 수정 있음</span>' : ''}<span>수정 ${esc(s.lastCommit || '-')}</span>${s.inStores ? '' : '<span>가게 찾기 목록에 없음</span>'}</div></div></article>`;
  }).join('') || '<p class="muted">맞는 가게가 없습니다.</p>';
}
function renderTodo() {
  const name = id => S.stores.find(s => s.id === id)?.name;
  $('#tab-todo').innerHTML = `<p class="muted">출처: docs/todo.md (${S.todo.length}묶음). 해결되면 그 파일에서 지웁니다.</p>` +
    S.todo.map(g => `<div class="box"><h3>${esc(g.title)}${g.shop ? `<a class="muted" href="https://${g.shop}.qrmenuasia.com" target="_blank" rel="noopener">${esc(name(g.shop) || g.shop)}</a>` : '<span class="badge b-na">공통</span>'}${g.note ? `<span class="muted">${esc(g.note)}</span>` : ''}</h3>
      <ul>${g.items.map(i => `<li>${esc(i.replace(/\*\*/g, ''))}</li>`).join('')}</ul></div>`).join('');
}
function renderVisits() {
  const v = S.visits;
  if (!v) return;
  if (v.status !== 'ok') {
    $('#tab-visits').innerHTML = `<div class="box"><h3>방문 기록 <span class="badge b-na">연결 필요</span></h3><p>${esc(v.how)}</p>${v.error ? `<p class="muted">마지막 시도 오류: ${esc(v.error)}</p>` : ''}</div>`;
    return;
  }
  const rows = Object.entries(v.shops).sort((a, b) => b[1].visitors - a[1].visitors);
  const name = id => S.stores.find(s => s.id === id)?.name || id;
  $('#tab-visits').innerHTML = `<p class="muted">최근 ${v.days}일 · qrmenuasia.com/api/stats · ${esc(new Date(v.generatedAt).toLocaleString('ko-KR'))}</p>
    <table><thead><tr><th>가게</th><th>방문자</th><th>페이지뷰</th></tr></thead><tbody>${rows.map(([id, r]) => `<tr><td>${esc(name(id))}</td><td>${r.visitors}</td><td>${r.views}</td></tr>`).join('')}</tbody></table>`;
}
function renderCounts() {
  const full = S.stores.filter(s => s.kind === 'full').length, list = S.stores.filter(s => s.kind === 'listing').length;
  const items = S.todo.length;
  const run = S.jobs.filter(j => j.status === 'running').length;
  $('#counts').innerHTML = `<span>가게 <b>${S.stores.length}</b></span><span>정식 <b>${full}</b></span><span>가게 찾기용 <b>${list}</b></span><span>할 일 <b>${items}</b>건</span><span>실행 중 <b>${run}</b></span>`;
}

// ---------------------------------------------------------------- 옆 창
function shopOptions() { return S.stores.map(s => `<option value="${s.id}">${esc(s.name)} (${s.id})</option>`).join(''); }
function jobHtml(j) {
  const st = j.status === 'running' ? '<span class="badge b-warn">실행 중</span>' : j.status === 'ok' ? '<span class="badge b-ok">통과</span>' : '<span class="badge b-stop">문제 있음</span>';
  return `<div class="job"><b>${esc(j.label)}</b> ${j.shop ? esc(j.shop) : ''} ${st}
    <span class="muted">${new Date(j.startedAt * 1000).toLocaleTimeString('ko-KR')}</span>
    ${j.output ? `<pre>${esc(j.output)}</pre>` : ''}${(j.images || []).map(src => `<a href="${src}" target="_blank"><img src="${src}" alt="캡처"></a>`).join('')}</div>`;
}
function teamJob(id) {
  const t = S.team || {};
  if (id === 'captain') return '결재. "배포해", "main 머지해줘", 돈이 드는 일·사장님 연락·SNS 게시 승인은 캡틴만 한다(CLAUDE.md 2·3장). 대시보드에는 배포 버튼이 없다.';
  if (id === 'claude') return `메인: ${t.leadJob || ''}. ${t.order || ''}`;
  if (id === 'agy') return t.agyNote || '';
  if (id === 'codex') return t.codexNote || '';
  const r = t.roles?.[id];
  return r ? `${r.job} (모델 ${r.model})` : '';
}
function renderPanel() {
  const id = S.open;
  if (!id) return;
  const m = M[id], t = S.team || {};
  const tool = m.tool ? t.tools?.[m.tool] : null;
  const recent = id === 'captain' ? [] : (t.recent?.[id] || []);
  const jobs = S.jobs.filter(j => j.desk === id).slice(0, 4);
  const sel = `<select class="shop">${shopOptions()}</select>`;
  $('#panel-body').innerHTML = `
    <div class="who">${avatar(id)}<div><h2>${esc(m.name)}</h2><span class="muted">${m.role}</span></div></div>
    ${tool ? `<p>${tool.installed ? `<span class="badge b-ok">설치됨</span> <code>${esc(tool.version)}</code>` : '<span class="badge b-stop">설치 안 됨</span>'} <span class="muted">(${m.tool} --version)</span></p>` : ''}
    ${id === 'finder' ? collectorHtml() : ''}
    <h5>맡은 일 · CLAUDE.md 5장</h5><p>${esc(teamJob(id).replace(/\*\*|`/g, ''))}</p>
    <h5>최근 한 일 · git log</h5>${recent.length ? `<ul class="recent">${recent.map(c => `<li>${esc(c.msg)} <code>${c.date} ${c.sha}</code></li>`).join('')}</ul>` : '<p class="muted">기록 없음</p>'}
    ${m.quota ? `<h5>할당량</h5>${quotaCard(m.quota)}${m.quota === 'claude' && id !== 'claude' ? '<p class="muted">담당은 Claude 한도를 같이 씁니다.</p>' : ''}` : ''}
    ${id === 'captain' ? '' : `<h5>일 시키기</h5>
      ${m.safe ? `<div class="act">${sel}${m.safe.map(c => `<button class="btn run" data-tool="${c}">${CHECK_LABEL[c]}</button>`).join('')}</div>
        <p class="muted">위 점검은 파일을 고치지 않아 바로 실행합니다. 가게 찾기용 전체 점검은 가게 선택과 상관없이 전부 봅니다.</p>` : ''}
      <p class="muted">아래 일은 실행하지 않습니다. 문장을 복사해 Claude 대화에 붙여 넣으세요.</p>
      ${m.safe ? '' : `<div class="act">${sel}</div>`}
      ${PROMPTS[id].map((f, i) => `<div class="prompt"><p data-i="${i}"></p><button class="btn ghost copy" data-i="${i}">복사</button></div>`).join('')}
      ${jobs.length ? `<h5>점검 결과</h5>${jobs.map(jobHtml).join('')}` : ''}`}`;
  const shopSel = $('.shop', $('#panel-body'));
  if (shopSel) {
    if (S.panelShop) shopSel.value = S.panelShop;
    const fill = () => {
      S.panelShop = shopSel.value;
      const s = S.stores.find(x => x.id === shopSel.value);
      const label = s ? `${s.name}(${s.id})` : '<가게>';
      document.querySelectorAll('.prompt p').forEach(p => { p.textContent = PROMPTS[id][p.dataset.i](label); });
    };
    shopSel.onchange = fill; fill();
  }
}
function collectorHtml() {
  const c = S.collector;
  if (!c) return '';
  if (!c.installed) return '<h5>구글 지도 사진 수집기</h5><p class="muted">D:\\구글지도 사진 자동화 폴더가 없습니다.</p>';
  const j = c.job, st = { running: '<span class="badge b-warn">수집 중</span>', done: '<span class="badge b-ok">끝남</span>', stopped: '<span class="badge b-na">멈춤</span>' };
  // 휴대폰(Tailscale)으로 열었으면 수집기도 휴대폰용 주소(포트 8766)로 연다
  const local = ['127.0.0.1', 'localhost'].includes(location.hostname);
  const url = local ? c.url : `http://${location.hostname}:8766`;
  return `<h5>구글 지도 사진 수집기 · ${esc(url.replace('http://', ''))}</h5>
    <div class="act">${c.running ? `<span class="badge b-ok">켜짐</span> v${esc(c.version)}` : '<span class="badge b-na">꺼짐</span>'}
      ${c.running ? `<a class="btn ghost" href="${url}" target="_blank" rel="noopener">수집기 화면 열기</a>` : '<button class="btn" id="launch">수집기 켜기</button>'}</div>
    ${j ? `<div class="job"><b>${esc(j.store || '가게 이름 없음')}</b> ${st[j.status] || esc(j.status || '')} <span class="muted">사진 ${j.photos}장</span>
      ${j.log?.length ? `<pre>${esc(j.log.join('\n'))}</pre>` : ''}</div>` : ''}
    ${c.history?.length ? `<ul class="recent">${c.history.map(h => `<li>${esc(h.name || h.folder)} <code>${esc(h.at)} · ${h.count}장</code></li>`).join('')}</ul>` : ''}
    <p class="muted">수집 시작·저장은 수집기 화면에서 합니다. 대시보드는 상태만 읽습니다.</p>`;
}
function openPanel(id) { S.open = id; renderPanel(); $('#panel').classList.add('open'); $('#dim').classList.add('open'); $('#panel').setAttribute('aria-hidden', 'false'); }
function closePanel() { S.open = null; $('#panel').classList.remove('open'); $('#dim').classList.remove('open'); $('#panel').setAttribute('aria-hidden', 'true'); }
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 1800); }

document.addEventListener('click', async e => {
  const spot = e.target.closest('button.spot');
  if (spot) return openPanel(spot.dataset.id);
  if (e.target.closest('#close') || e.target.id === 'dim') return closePanel();
  const tab = e.target.closest('.tabs button');
  if (tab) {
    document.querySelectorAll('.tabs button').forEach(b => b.classList.toggle('on', b === tab));
    document.querySelectorAll('.tab').forEach(s => { s.hidden = s.id !== 'tab-' + tab.dataset.tab; });
    return;
  }
  const k = e.target.closest('#kind button');
  if (k) { S.kind = k.dataset.k; document.querySelectorAll('#kind button').forEach(b => b.classList.toggle('on', b === k)); return renderStores(); }
  if (e.target.id === 'more') { S.all = !S.all; return renderStores(); }
  if (e.target.id === 'launch') {
    e.target.disabled = true;
    const r = await fetch('/api/collector/launch', { method: 'POST', headers: { 'X-Dashboard': '1' } }).then(r => r.json());
    toast(r.error || '수집기를 켰습니다(새 창). 잠시 뒤 상태가 바뀝니다.');
    setTimeout(loadCollector, 4000);
    return;
  }
  const copy = e.target.closest('.copy');
  if (copy) {
    const text = $(`.prompt p[data-i="${copy.dataset.i}"]`).textContent;
    try { await navigator.clipboard.writeText(text); } catch { const ta = document.createElement('textarea'); ta.value = text; document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    return toast('복사했습니다');
  }
  const run = e.target.closest('.run');
  if (run) {
    run.disabled = true;
    const r = await fetch('/api/run', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Dashboard': '1' },
      body: JSON.stringify({ tool: run.dataset.tool, shop: $('.shop').value, desk: S.open }) }).then(r => r.json());
    if (r.error) toast(r.error); else toast(`${CHECK_LABEL[run.dataset.tool]} 시작`);
    await loadJobs();
    run.disabled = false;
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
$('#q').addEventListener('input', e => { S.q = e.target.value; renderStores(); });

// ---------------------------------------------------------------- 불러오기
let jobTimer;
async function loadJobs() {
  S.jobs = (await api('/api/jobs')).jobs;
  renderOffice(); renderCounts();
  if (S.open) {
    const keep = $('.shop')?.value;
    renderPanel();
    if (keep && $('.shop')) $('.shop').value = keep;
  }
  clearTimeout(jobTimer);
  if (S.jobs.some(j => j.status === 'running')) jobTimer = setTimeout(loadJobs, 2000);
}
let colTimer;
async function loadCollector() {
  try { S.collector = await api('/api/collector'); } catch { S.collector = null; }
  renderOffice();
  if (S.open === 'finder') renderPanel();
  clearTimeout(colTimer);
  colTimer = setTimeout(loadCollector, S.collector?.job?.status === 'running' ? 3000 : 10000);
}
async function loadAll() {
  const [st, td, tm, qt] = await Promise.all([api('/api/stores'), api('/api/todo'), api('/api/team'), api('/api/quota')]);
  S.stores = st.stores; S.todo = td.groups; S.team = tm; S.quota = qt;
  renderQuota(); renderStores(); renderTodo(); renderCounts();
  await loadJobs();
  $('#updated').textContent = `저장소 기준 · ${new Date().toLocaleTimeString('ko-KR')} 새로 읽음`;
  loadCollector();
  S.visits = await api('/api/visits'); renderVisits();
}
renderOffice();
loadAll();
setInterval(() => api('/api/quota').then(q => { S.quota = q; renderQuota(); }), 60000);
