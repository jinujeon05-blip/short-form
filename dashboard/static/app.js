// Jinwoo 에이전트(QR메뉴 대시보드) 화면. 데이터는 모두 server.py 의 /api/* (저장소 파일·git·CLI 기록)에서 온다.
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const api = p => fetch(p, { cache: 'no-store' }).then(r => r.json());
const S = { stores: [], todo: [], team: null, quota: null, visits: null, jobs: [], kind: '', q: '', open: null, all: false, collector: null, orders: [], feed: [] };

// 사무실 사진 (사용자가 ChatGPT로 만듦, 2026-10-27). 좌표는 사진 크기 대비 % [x1, y1, x2, y2]
// 폭 700px 이하에서는 세로 사진(phone)을 쓴다. 인력공급팀·선별팀은 인력 앱(jinwoo-hr)을 읽기만 한다(/api/hr, 2026-10-29)
const SCENES = {
  pc: { img: '/static/rooms/office.jpg', w: 1673, h: 940,
    signs: [[10, 33, 32, 39, '미디어 관제실'], [36, 33, 61, 39, '디지털 메뉴 통제실'], [66, 33, 89, 39, '감사실'],
      [7.5, 59.5, 31, 65, '통번역 통제실'], [37, 59.5, 62.5, 65, '인력 공급팀'], [68, 59.5, 92, 65, '선별팀']],
    spots: { captain: [45, 2, 55, 14.5], claude: [45.5, 15.5, 53, 26], finder: [15, 40, 27, 54],
      agy: [38, 40, 46, 54], 'menu-reader': [52, 40, 60, 54], codex: [67.5, 40, 76, 54], reviewer: [80, 40, 88, 54],
      polisher: [14, 66, 24, 82], staffing: [47, 65, 57, 82], sorting: [74, 64, 83, 80] } },
  phone: { img: '/static/rooms/office-phone.jpg', w: 940, h: 1672,
    signs: [[31, 15, 69, 18.5, '비서실'], [9, 30, 47, 33.3, '미디어 관제실'], [52, 30, 91, 33.3, '디지털 메뉴 통제실'],
      [5.5, 49, 46.5, 52.3, '감사실'], [53, 49, 94, 52.3, '통번역 통제실'], [5, 70.5, 46.5, 74, '인력 공급팀'], [52.5, 70.5, 94, 74, '선별팀']],
    spots: { captain: [43, 4, 57, 10], claude: [42, 17, 55, 24], finder: [17, 34, 32, 42],
      agy: [55, 34, 70, 42], 'menu-reader': [72, 34, 86, 42], codex: [7, 53, 25, 61], reviewer: [27, 53, 43, 61],
      polisher: [64, 53, 80, 62], staffing: [16, 75, 32, 84], sorting: [62, 74, 78, 84] } },
};
const ALL_CHECKS = ['check-standard', 'check-listing', 'shot'];
const M = {
  captain: { name: '캡틴', role: '결재' },
  claude: { name: '비서실장', role: '지휘', quota: 'claude', safe: ALL_CHECKS },
  finder: { name: '시각 정보 비서', role: '사진 고르기', quota: 'claude', safe: ['shot'] },
  agy: { name: '메뉴 검사관', role: '메뉴판 읽기', quota: 'gemini', tool: 'agy' },
  'menu-reader': { name: '자료 해석 비서', role: '메뉴판 읽기', quota: 'claude' },
  codex: { name: '운영 감찰관', role: '두 번째 검토', quota: 'gemini', tool: 'agy' },  // 2026-10-30: 코덱스 대신 안티그래비티 안 Claude Sonnet
  reviewer: { name: '데이터 감사관', role: '마지막 점검', quota: 'claude', safe: ALL_CHECKS },
  polisher: { name: '수석 번역관', role: '번역·글', quota: 'claude' },
  staffing: { name: '인력 공급팀', role: '인력 현황', hr: true },
  sorting: { name: '선별팀', role: '선별 실적', hr: true },
};
const AKA = { finder: 'finder', agy: '안티그래비티(agy)', 'menu-reader': 'menu-reader', codex: '안티그래비티 Claude Sonnet', reviewer: 'reviewer', polisher: 'polisher' };
const CHECK_LABEL = { 'check-standard': '가마솥 표준 점검', 'check-listing': '가게 찾기용 전체 점검', shot: '휴대폰 화면 캡처' };

// 직원마다 Claude 에 붙여 넣을 문장 (실행하지 않고 복사만)
const PROMPTS = {
  captain: [],
  claude: [
    s => `${s} 사진 수집기로 올렸어. 가게 찾기용(무동의·무료)으로 새 메뉴판 만들어줘.`,
    s => `${s} 남은 할 일(docs/todo.md) 정리하고 사장님께 물어볼 것만 짧게 알려줘.`,
  ],
  finder: [s => `finder 담당에게: 드라이브 QR메뉴판/${s} 사진 목록과 모음 이미지를 만들고, 메뉴 이름과 맞는 요리 사진 4~6장(최소 4장, 애매하면 메뉴판 사진과 대조해 채우기)을 골라줘.`],
  agy: [s => `${s} 메뉴판 사진을 안티그래비티(agy -p, 계획 모드)로 읽어서 분류|메뉴이름|가격 표를 받고, 메뉴판과 대조해줘.`],
  'menu-reader': [s => `menu-reader 담당에게 ${s} 메뉴판 사진을 읽혀서 메뉴·가격 표(한국어 이름·원문·가격·분류·근거 사진)를 만들어줘.`],
  codex: [s => `${s} 메뉴·가격 표를 운영 감찰관(안티그래비티 안 Claude Sonnet, agy --model claude-sonnet-5-5-medium)으로 메뉴판 사진과 한 번 더 대조해줘. 가격·빠진 메뉴만 짧게.`],
  reviewer: [s => `reviewer 담당에게 ${s} 배포 전 마지막 점검을 맡겨줘(예쁨·가게 느낌 → 번역 → 메뉴·가격). 배포는 하지 마.`],
  polisher: [s => `polisher 담당에게 ${s} 메뉴 5개 언어(ko·vi·en·zh·ja) 번역 초안을 맡겨줘.`],
};

// ---------------------------------------------------------------- 사무실
const pct = v => v + '%';
function sceneHtml(key, busy, done, marks) {
  const sc = SCENES[key];
  const signs = sc.signs.map(([x1, y1, x2, y2, t]) =>
    `<span class="sign" style="left:${pct(x1)};top:${pct(y1)};width:${pct(x2 - x1)};height:${pct(y2 - y1)}">${t}</span>`).join('');
  const spots = Object.entries(sc.spots).map(([id, [x1, y1, x2, y2]]) => {
    const box = `left:${pct(x1)};top:${pct(y1)};width:${pct(x2 - x1)};height:${pct(y2 - y1)}`;
    const cls = busy.has(id) ? ' on' : done.has(id) ? ' done' : '';
    const mk = marks[id]?.length ? `<span class="marks">${marks[id].map(([c, t]) => `<span class="${c}">${t}</span>`).join('')}</span>` : '';
    return `<button class="spot${cls}" style="${box}" data-id="${id}" aria-label="${M[id].name} 자리 열기">
      ${mk}<span class="tag"><b>${esc(M[id].name)}</b>${cls === ' on' ? '<em class="st">작업 중…</em>' : cls === ' done' ? '<em class="st">✔ 작업 완료</em>' : `<small>${M[id].role}</small>`}</span></button>`;
  }).join('');
  return `<div class="scene ${key}" style="aspect-ratio:${sc.w}/${sc.h}"><img src="${sc.img}" alt="Jinwoo 에이전트 사무실">${signs}${spots}</div>`;
}
// 자리 3단계(2026-10-30, 사용자 결정 '가-1'): 작업 중(파란 빛) → 끝나면 녹색 '작업 완료'
// → 배포할 가게가 있는 지시는 배포 완료되면, 배포 없는 지시는 캡틴이 결재함에서 열어 보면(서버 seenAt) 사라진다
const cleared = o => o.deploy?.length ? o.deployState === 'done' : !!o.seenAt;
// 인력 공급팀: 오늘 daily_entries 주간·야간 보고(나-1). 9시·21시(베트남 시간)가 지나도 없으면 빨간 표시. 연결 안 되면 표시 안 함
function hrMarks() {
  const r = S.hr?.status === 'ok' && S.hr.report;
  if (!r) return [];
  const h = new Date(Date.now() + 7 * 3600e3).getUTCHours(), out = [];
  if (r.day) out.push(['ok', '주간 보고 완료 ✔']); else if (h >= 9) out.push(['no', '주간 보고 없음']);
  if (r.night) out.push(['ok', '야간 보고 완료 ✔']); else if (h >= 21) out.push(['no', '야간 보고 없음']);
  return out;
}
function renderOffice() {
  const busy = new Set(S.jobs.filter(j => j.status === 'running').map(j => j.desk));
  if (S.collector?.job?.status === 'running') busy.add('finder');  // 사진 수집기가 실제로 수집 중
  for (const o of S.orders.filter(o => o.status === 'running')) {  // 지시 실행 중: 비서실장 + 지금 일하는 담당 자리
    busy.add('claude');
    (o.active || []).forEach(d => busy.add(d));
  }
  const done = new Set();
  for (const o of S.orders.filter(o => o.status === 'done' && !cleared(o))) (o.worked || []).forEach(d => done.add(d));
  const marks = { staffing: hrMarks() };
  $('#office').innerHTML = sceneHtml('pc', busy, done, marks) + sceneHtml('phone', busy, done, marks);
}
// 옆 창 얼굴: 큰 사진에서 그 사람 자리만 잘라 보여 준다
function avatar(id) {
  const sc = SCENES.pc, [x1, y1, x2, y2] = sc.spots[id], w = x2 - x1, h = y2 - y1;
  const ratio = (h * sc.h) / (w * sc.w);
  return `<div class="avatar" style="aspect-ratio:${1 / ratio};background-image:url('${sc.img}');background-size:${100 / w * 100}% auto;background-position:${x1 / (100 - w) * 100}% ${y1 / (100 - h) * 100}%"></div>`;
}

// ---------------------------------------------------------------- 지시하기 · 결재함 (server.py 의 /api/order*)
// 지시는 이 PC의 Claude Code(claude -p)가 저장소에서 실행한다. 배포·push·삭제는 막혀 있고, 결과는 결재함에 올라온다.
const CHIPS = [
  ['새 가게', '<가게> 사진 수집기로 올렸어. 가게 찾기용(무동의·무료)으로 새 메뉴판 만들어줘.'],
  ['할 일 정리', '남은 할 일(docs/todo.md) 정리하고, 내가 정해야 할 것만 번호 보기로 알려줘.'],
  ['가격 고치기', '<가게> 메뉴 <메뉴이름> 가격을 <가격>으로 고쳐줘.'],
  ['점검', '<가게> 배포 전 점검(check-standard·check-listing·shot)하고 문제만 3줄로 알려줘.'],
];
const ST = { running: ['run', 'b-warn', '실행 중'], stopping: ['run', 'b-warn', '멈추는 중'], done: ['', 'b-ok', '끝남'], fail: ['', 'b-stop', '실패'], stopped: ['', 'b-na', '멈춤'] };
const hm = t => new Date(t * 1000).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
const day = t => new Date(t * 1000).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
function orderState(o) {
  if (o.deployState === 'running') return ['run', 'b-warn', '배포 중'];
  if (o.status === 'done' && o.deploy?.length && !o.deployState) return ['wait', 'b-warn', '배포 대기'];
  if (o.status === 'done' && o.approval) return ['wait', 'b-warn', '결재 대기'];
  return ST[o.status] || ['', 'b-na', o.status];
}
function lastText(o) { const t = [...o.turns].reverse().find(t => t.by !== 'me'); return t ? t.text : ''; }
function renderInbox() {
  const wait = S.orders.filter(o => o.status === 'done' && (o.approval || (o.deploy?.length && o.deployState !== 'done')));
  const live = S.orders.filter(o => o.status === 'running' || o.status === 'stopping');
  const rest = S.orders.filter(o => !wait.includes(o) && !live.includes(o)).slice(0, 8);
  $('#inbox-count').textContent = wait.length;
  $('#inbox-count').className = 'badge ' + (wait.length ? 'b-warn' : 'b-na');
  const item = o => {
    const [cls, bc, bt] = orderState(o);
    const st = o.steps?.at(-1), now = st ? `${WHO[st.who] || '비서실장'} · ${st.text}` : '시작하는 중…';
    const sub = o.deployState === 'running' ? (o.deployLog?.at(-1) || '배포 시작…') : o.status === 'running' ? now
      : o.deploy?.length && !o.deployState ? '배포 확정 기다림: ' + o.deploy.join(', ') : o.approval ? '결재: ' + o.approval : lastText(o).split('\n')[0];
    return `<button class="ord ${cls}" data-order="${o.id}"><b>${esc(o.title)}</b><p>${esc(sub)}</p>
      <span class="muted"><span class="badge ${bc}">${bt}</span>${hm(o.createdAt)}${o.via === 'phone' ? ' · 폰' : ''}</span></button>`;
  };
  $('#inbox').innerHTML = (wait.length || live.length || rest.length)
    ? [...wait, ...live].map(item).join('') + (rest.length ? `<h5 class="muted" style="margin:10px 0 6px">지난 지시</h5>${rest.map(item).join('')}` : '')
    : '<p class="muted">아직 지시가 없습니다. 위에 적어 보내면 여기로 보고가 올라옵니다.</p>';
  const busy = live.length > 0;
  $('#order-send').disabled = busy;
  $('#order-note').textContent = busy ? '지시를 실행하는 중이에요. 끝나면 다음 지시를 받을 수 있어요.' : '배포·push·삭제는 하지 않고, 끝나면 결재함에 보고가 올라옵니다.';
}
function renderOrderPanel(oid) {
  const o = S.orders.find(x => x.id === oid);
  if (!o) return;
  const [, bc, bt] = orderState(o);
  const running = o.status === 'running' || o.status === 'stopping';
  const dep = o.deploy?.length ? (o.deployState === 'running'
    ? `<h5>배포 진행</h5><ul class="steps">${(o.deployLog || []).map(s => `<li>${esc(s)}</li>`).join('') || '<li>시작하는 중…</li>'}</ul>`
    : o.deployState === 'done' ? '' : `<div class="reply"><h5>배포</h5><p><b>배포할 가게:</b> ${o.deploy.map(s => `${esc(s)}.qrmenuasia.com`).join(', ')}</p>
      ${S.vercel ? `<button class="btn approve" id="deploy-go">배포 확정</button>` : '<p class="muted">Vercel 토큰이 아직 없어 배포 버튼이 꺼져 있어요(docs/dashboard.md \'Vercel 토큰 넣기\').</p>'}
      <p class="muted">작업 브랜치를 깃허브에 올리고(main 아님) 그 커밋으로 배포합니다. 가게 찾기용이면 가게 찾기 목록(qrmenu-intro)도 같이 배포해요. 배포 1번마다 Vercel 빌드 비용이 조금 듭니다.</p></div>`) : '';
  const keep = $('#reply-text')?.value || '';
  const who = t => t.by === 'me' ? (t.approve ? '캡틴 · 확정' : '캡틴') : t.by === 'claude' ? '비서실장 보고' : '알림';
  $('#panel-body').innerHTML = `<h2>${esc(o.title)}</h2>
    <p class="muted"><span class="badge ${bc}">${bt}</span> ${day(o.createdAt)} ${hm(o.createdAt)} · ${o.via === 'phone' ? '폰에서 지시' : 'PC에서 지시'}${o.tokens ? ` · 토큰 약 ${o.tokens >= 10000 ? Math.round(o.tokens / 10000) + '만' : Math.round(o.tokens / 1000) + '천'}${o.tokensVersion === 2 ? '(다시 읽은 것 포함)' : '(옛 기록: 다시 읽은 것 빠짐)'}` : ''}</p>
    ${o.sessionId ? `<p class="muted">창 없이 실행돼서 Claude 앱 세션 목록에는 안 보여요. 대화 전체는 ${local() ? '<button class="btn ghost" id="order-open">PC에서 대화 열기</button>' : 'PC 대시보드의 [PC에서 대화 열기]'}로 봅니다.</p>` : ''}
    ${(o.images || []).length ? `<h5>폰 화면 캡처 (로고·간판 확인)</h5><div class="shots">${o.images.map(f => `<a href="/out/${encodeURIComponent(f)}" target="_blank" rel="noopener"><img src="/out/${encodeURIComponent(f)}?t=${Math.round(o.endedAt || 0)}" alt="${esc(f)}"></a>`).join('')}</div>` : ''}
    ${o.turns.map(t => `<div class="turn ${t.by}"><span class="muted">${who(t)} · ${hm(t.at)}</span>${esc(t.text)}</div>`).join('')}
    ${running ? `<h5>진행 상황</h5><ul class="steps">${(o.steps || []).map(s => `<li><b class="who-${esc(s.who || 'claude')}">${esc(WHO[s.who] || s.who || '비서실장')}</b> ${esc(s.text)}</li>`).join('') || '<li>시작하는 중…</li>'}</ul>
      ${o.last ? `<div class="turn claude"><span class="muted">비서실장 · 지금 하는 말</span>${esc(o.last)}</div>` : ''}
      <button class="btn ghost" id="order-stop">멈추기</button>` : `
      <div class="reply"><h5>${o.approval ? '결재' : '이어서 시키기'}</h5>
      ${o.approval ? `<p><b>결재할 것:</b> ${esc(o.approval)}</p>` : ''}
      <textarea id="reply-text" placeholder="${o.approval ? '고칠 점이 있으면 적고 [수정 요청], 없으면 [확정]' : '답(예: 가-1) 또는 다음에 시킬 일'}"></textarea>
      <div class="act">${o.approval ? '<button class="btn approve" id="order-approve">확정</button>' : ''}
        <button class="btn ${o.approval ? 'ghost' : ''}" id="order-reply">${o.approval ? '수정 요청' : '보내기'}</button></div>
      <p class="muted">같은 대화를 이어서 실행합니다. 배포는 아래 [배포 확정] 버튼으로만 합니다.</p></div>`}`;
  if (dep) $('#panel-body').insertAdjacentHTML('beforeend', dep);
  if ($('#reply-text')) $('#reply-text').value = keep;
}
const local = () => ['127.0.0.1', 'localhost'].includes(location.hostname);
async function post(path, body) {
  return fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Dashboard': '1' }, body: JSON.stringify(body) }).then(r => r.json());
}
async function sendOrder() {
  const ta = $('#order-text'), text = ta.value.trim();
  if (!text) return toast('지시를 적어 주세요');
  if (/<[^>]+>/.test(text)) return toast('<가게> 같은 빈칸을 채워 주세요');
  $('#order-send').disabled = true;
  const r = await post('/api/order', { text });
  if (r.error) { toast(r.error); $('#order-send').disabled = false; return; }
  ta.value = '';
  toast('지시를 보냈습니다. 비서실장이 실행을 시작해요.');
  await loadOrders();
  openPanel('order:' + r.id);
}
async function replyOrder(approve) {
  const id = S.open.slice(6), text = $('#reply-text')?.value || '';
  const r = await post('/api/order/reply', { id, text, approve });
  if (r.error) return toast(r.error);
  $('#reply-text').value = '';
  toast(approve ? '확정했습니다. 다음 단계를 진행해요.' : '보냈습니다.');
  loadOrders();
}

// ---------------------------------------------------------------- 브리핑 · 업무 기록
const WHO = { captain: '캡틴', claude: '비서실장', designer: 'designer', finder: '시각 정보 비서', agy: '메뉴 검사관', 'menu-reader': '자료 해석 비서', codex: '운영 감찰관', reviewer: '데이터 감사관', polisher: '수석 번역관' };
function renderFeed() {
  let last = '';
  $('#feed').innerHTML = S.feed.map(i => {
    const d = day(i.at), head = d !== last ? `<li class="day">${d}</li>` : '';
    last = d;
    const click = i.kind === 'order' ? ` data-order="${i.ref}" style="cursor:pointer"` : '';
    return `${head}<li class="k-${i.kind}"${click}><time>${hm(i.at)}</time><span><span class="who">${esc(WHO[i.who] || i.who)}</span>${esc(i.text)}</span></li>`;
  }).join('') || '<li class="muted">기록 없음</li>';
}
async function loadBrief() {
  const b = await api('/api/brief');
  $('#brief').innerHTML = b.lines.map(l => `<li>${esc(l)}</li>`).join('');
  $('#brief-at').textContent = b.at + ' 기준';
}
async function loadFeed() { S.feed = (await api('/api/activity')).items; renderFeed(); }
let ordTimer, wasRunning = false;
async function loadOrders() {
  const r = await api('/api/orders');
  S.orders = r.orders; S.vercel = r.vercel;
  const running = S.orders.some(o => o.status === 'running' || o.status === 'stopping' || o.deployState === 'running');
  renderInbox(); renderOffice(); renderCounts();
  if (S.open?.startsWith('order:')) renderOrderPanel(S.open.slice(6));
  if (wasRunning && !running) { loadFeed(); loadBrief(); toast('지시 실행이 끝났습니다. 결재함을 확인하세요.'); }
  wasRunning = running;
  clearTimeout(ordTimer);
  ordTimer = setTimeout(loadOrders, running ? 2500 : 15000);
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
      <div class="row"><span class="chip">기록 없음</span><div class="track"><div class="fill" style="width:0"></div></div><b>-</b><span class="rst">아래 '확인하는 법'</span></div>
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
  const run = S.jobs.filter(j => j.status === 'running').length + S.orders.filter(o => o.status === 'running').length;
  $('#counts').innerHTML = `<span>가게 <b>${S.stores.length}</b></span><span>정식 <b>${full}</b></span><span>가게 찾기용 <b>${list}</b></span><span class="go" data-go="todo" role="button" tabindex="0" title="할 일 탭 열기">할 일 <b>${items}</b>건 ›</span><span>실행 중 <b>${run}</b></span>`;
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
  if (id.startsWith('order:')) return renderOrderPanel(id.slice(6));
  const m = M[id], t = S.team || {};
  if (m.hr) return renderHrPanel(id);
  const tool = m.tool ? t.tools?.[m.tool] : null;
  const recent = id === 'captain' ? [] : (t.recent?.[id] || []);
  const jobs = S.jobs.filter(j => j.desk === id).slice(0, 4);
  const sel = `<select class="shop">${shopOptions()}</select>`;
  $('#panel-body').innerHTML = `
    <div class="who">${avatar(id)}<div><h2>${esc(m.name)}</h2><span class="muted">${m.role}${AKA[id] ? ' · ' + AKA[id] : ''}</span></div></div>
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
// 인력공급팀·선별팀: 인력 앱 요약(읽기 전용). 일 시키기 없음
const n0 = v => v == null ? '–' : Number(v).toLocaleString('ko-KR', { maximumFractionDigits: 1 });
const rt = v => v == null ? '–' : v + '%';
function renderHrPanel(id) {
  const h = S.hr, m = M[id];
  const head = `<div class="who">${avatar(id)}<div><h2>${esc(m.name)}</h2><span class="muted">${m.role} · 인력 앱 읽기 전용</span></div></div>`;
  const foot = `<p class="muted">인력 앱(jinwoo-hr)을 읽기만 합니다. 입력·수정은 인력 앱에서 하세요.
    <a href="https://jinwoo-hr.vercel.app" target="_blank" rel="noopener">인력 앱 열기</a></p>`;
  if (!h) { $('#panel-body').innerHTML = head + '<p class="muted">불러오는 중…</p>'; return; }
  if (h.status !== 'ok') {
    $('#panel-body').innerHTML = head + `<p><span class="badge b-na">연결 필요</span></p><p>${esc(h.how)}</p>
      ${h.error ? `<p class="muted">마지막 시도 오류: ${esc(h.error)}</p>` : ''}` + foot;
    return;
  }
  const errs = h.errors.length ? `<p class="muted">못 읽은 표: ${esc(h.errors.join(', '))}</p>` : '';
  const when = `<p class="muted">베트남 날짜 ${esc(h.date)} · ${esc(h.at)} 읽음(2분마다 새로)</p>`;
  let body;
  if (id === 'staffing') {
    const T = h.today, Mo = h.month;
    body = `<div class="hr-kpi"><div><small>오늘 투입</small><b>${n0(T.total)}명</b><span>주 ${n0(T.day)} · 야 ${n0(T.night)}</span></div>
      <div><small>오늘 계획</small><b>${n0(T.plan)}명</b><span>${T.plan ? '대비 ' + Math.round(T.total / T.plan * 100) + '%' : '계획 없음'}</span></div>
      <div><small>이번 달 계획 대비</small><b>${Mo.pct == null ? '–' : Mo.pct + '%'}</b><span>실적 ${n0(Mo.actual)} / 계획 ${n0(Mo.planToDate)}(오늘까지)</span></div></div>
      <h5>거래처별 · 최근 3일 (인원 = 일일 투입 합계)</h5>
      ${h.clients.length ? `<table class="hr-days"><thead><tr><th>거래처</th>${h.days.map((d, i) => `<th>${['그저께', '어제', '오늘'][i]}<small>${d.slice(5).replace('-', '/')}</small></th>`).join('')}<th>이번 달<small>실적 / 계획</small></th></tr></thead><tbody>
        ${h.clients.map(c => `<tr><td>${esc(c.name)}</td>${h.days.map((d, i) => { const v = c.days[d];
          return `<td><b>${n0(v.day + v.night)}</b><small>주 ${n0(v.day)} · 야 ${n0(v.night)}</small>${i === 2 && c.todayPlan ? `<small>계획 ${n0(c.todayPlan)}</small>` : ''}</td>`; }).join('')}
          <td><b>${n0(c.month)}</b><small>계획 ${n0(c.monthPlan)}</small></td></tr>`).join('')}</tbody></table>`
        : '<p class="muted">최근 기록 없음</p>'}`;
  } else {
    const s = h.sorting;
    body = `<div class="hr-kpi"><div><small>오늘 검사</small><b>${n0(s.todayInspected)}</b><span>불량 ${n0(s.todayDefects)} · ${rt(s.todayRate)}</span></div>
      <div><small>이번 달 검사</small><b>${n0(s.monthInspected)}</b><span>불량 ${n0(s.monthDefects)}</span></div>
      <div><small>이번 달 불량률</small><b>${rt(s.monthRate)}</b><span>불량 ÷ 검사</span></div></div>
      <h5>제품별 · 이번 달 (검사 많은 순 12개)</h5>
      ${s.products.length ? `<table><thead><tr><th>제품</th><th>검사</th><th>불량</th><th>불량률</th></tr></thead><tbody>
        ${s.products.map(p => `<tr><td>${esc(p.name)}</td><td>${n0(p.inspected)}</td><td>${n0(p.defects)}</td><td>${rt(p.rate)}</td></tr>`).join('')}</tbody></table>`
        : '<p class="muted">이번 달 기록 없음</p>'}`;
  }
  $('#panel-body').innerHTML = head + when + body + errs + foot;
}
async function loadHr() {
  try { S.hr = await api('/api/hr'); } catch { S.hr = null; }
  renderOffice();
  if (M[S.open]?.hr) renderPanel();
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
  const ord = e.target.closest('[data-order]');
  if (ord) {
    const o = S.orders.find(x => x.id === ord.dataset.order);
    if (o?.status === 'done' && !o.seenAt) post('/api/order/seen', { id: o.id }).then(() => { o.seenAt = Date.now() / 1000; renderOffice(); });
    return openPanel('order:' + ord.dataset.order);
  }
  if (e.target.id === 'order-send') return sendOrder();
  if (e.target.id === 'order-approve') return replyOrder(true);
  if (e.target.id === 'order-reply') return replyOrder(false);
  if (e.target.id === 'deploy-go') {
    if (!confirm('정말 배포할까요? 손님이 보는 사이트가 바뀝니다.')) return;
    e.target.disabled = true;
    const r = await post('/api/deploy', { id: S.open.slice(6) });
    toast(r.error || '배포를 시작했습니다.'); return loadOrders();
  }
  if (e.target.id === 'order-open') { const r = await post('/api/order/open', { id: S.open.slice(6) }); return toast(r.error || 'Claude Code 창을 열었습니다(새 창).'); }
  if (e.target.id === 'order-stop') { const r = await post('/api/order/stop', { id: S.open.slice(6) }); return toast(r.error || '멈추는 중…'); }
  const chip = e.target.closest('#chips button');
  if (chip) {
    const ta = $('#order-text'); ta.value = CHIPS[chip.dataset.i][1]; ta.focus();
    const at = ta.value.indexOf('<'); if (at >= 0) ta.setSelectionRange(at, ta.value.indexOf('>', at) + 1);
    return;
  }
  const spot = e.target.closest('button.spot');
  if (spot) return openPanel(spot.dataset.id);
  if (e.target.closest('#close') || e.target.id === 'dim') return closePanel();
  const go = e.target.closest('[data-go]');  // 위쪽 '할 일 N건' → 아래 할 일 탭 (2026-10-30, 사용자 결정 '가-1')
  const tab = go ? $(`.tabs button[data-tab="${go.dataset.go}"]`) : e.target.closest('.tabs button');
  if (go) tab.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
$('#order-text').addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) sendOrder(); });
$('#chips').innerHTML = CHIPS.map(([t], i) => `<button data-i="${i}">${t}</button>`).join('');

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
  await Promise.all([loadJobs(), loadOrders()]);
  loadBrief(); loadFeed();
  $('#updated').textContent = `저장소 기준 · ${new Date().toLocaleTimeString('ko-KR')} 새로 읽음`;
  loadCollector();
  loadHr();
  S.visits = await api('/api/visits'); renderVisits();
}
renderOffice();
loadAll();
setInterval(() => api('/api/quota').then(q => { S.quota = q; renderQuota(); }), 60000);
setInterval(() => { loadFeed(); loadBrief(); loadHr(); }, 120000);
