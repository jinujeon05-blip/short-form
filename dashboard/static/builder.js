// 운영자 모드 '가게 만들기' 탭 (2026-11-13). 캡틴이 가게 하나를 처음부터 끝까지 직접 만든다.
// 서버: dashboard/builder.py (/api/builder/*) → tools/build-shop.mjs → new-shop·register-shop·check-shop.
// 사진은 이 화면(브라우저)에서 잘라 보낸다: 요리 4:3 640×480 JPEG, 간판 16:9 1280×720 JPEG, 로고 PNG(긴 변 800 이하).
(() => {
  const L5 = ['ko', 'en', 'zh', 'ja', 'vi'];
  const L4 = ['en', 'zh', 'ja', 'vi'];
  const LN = { ko: '한국어', en: 'English', zh: '中文', ja: '日本語', vi: 'Tiếng Việt' };
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const post = (p, b) => fetch(p, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Dashboard': '1' }, body: JSON.stringify(b) })
    .then(async r => { try { return await r.json(); } catch { return { error: `서버 응답 ${r.status}` }; } })
    .catch(() => ({ error: '대시보드 서버에 연결이 안 돼요(꺼졌나요?)' }));
  const get = p => fetch(p, { cache: 'no-store' }).then(r => r.json());
  const blank5 = () => ({ ko: '', en: '', zh: '', ja: '', vi: '' });
  const say = msg => (window.toast ? window.toast(msg) : alert(msg));

  // 색 묶음: 가게 느낌에 맞춰 고른 뒤 색을 바꿀 수 있다(CLAUDE.md 0장 '주점은 어둡고 세련되게, 분식은 밝고 가볍게')
  const PRESETS = {
    warm: { label: '한식 · 따뜻하게', mode: 'light', band: '#8a5a3c', accent: '#c0392b', title: '#5a3a26' },
    red: { label: '고깃집 · 붉게', mode: 'light', band: '#b3261e', accent: '#e8a317', title: '#b3261e' },
    bright: { label: '분식 · 밝고 가볍게', mode: 'light', band: '#f08a24', accent: '#e23d5f', title: '#e0661a' },
    navy: { label: '면옥 · 깔끔하게', mode: 'light', band: '#1f3f9e', accent: '#c8232c', title: '#1f3f9e' },
    green: { label: '카페 · 초록', mode: 'light', band: '#2f6b4f', accent: '#d9822b', title: '#2f6b4f' },
    pub: { label: '주점 · 어둡고 세련되게', mode: 'dark', band: '#7a1f2b', accent: '#e0b04a', title: '#e0b04a' },
    night: { label: '이자카야 · 밤', mode: 'dark', band: '#23395b', accent: '#f2c14e', title: '#f2c14e' },
  };
  const CUISINE = { korean: 'Korean', bbq: 'Korean BBQ', chicken: 'Fried Chicken', noodle: 'Noodles', cafe: 'Cafe', western: 'Western',
    seafood: 'Seafood', chinese: 'Korean-Chinese', japanese: 'Japanese', pub: 'Pub', bar: 'Bar', snack: 'Korean Street Food', hotel: 'Hotel' };

  const newDraft = () => ({
    kind: 'listing', top: 'sign', name: { ko: '', en: '' },
    tagline: blank5(), chips: [], quote: blank5(), quoteBy: blank5(),
    info: { phone: '', address: '', mapUrl: '', hours: blank5(), wifiName: '', wifiPass: '' }, order: { zalo: '' },
    theme: { preset: 'warm', ...PRESETS.warm }, snsLang: 'vi',
    cats: [{ name: blank5(), note: null, items: [] }],
    reg: { region: 'bacninh', cats: ['korean'], tags: [], type: blank5(), cuisine: ['Korean'], sub: '', keywords: '', schema: 'Restaurant' },
  });

  const B = { meta: null, id: '', D: null, info: null, ai: new Set(), dirty: false, saveT: null, poll: null, view: 'phone', lang: 'ko' };

  // ---------------------------------------------------------------- 경로로 값 읽고 쓰기 ("cats.0.items.2.name")
  const at = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), B.D);
  function setAt(path, v) {
    const ks = path.split('.'); const last = ks.pop();
    const o = ks.reduce((o, k) => o[k], B.D); o[last] = v;
  }

  // ---------------------------------------------------------------- 그리기
  const root = () => $('#tab-builder');
  async function open() {
    if (!B.meta) {
      B.meta = await get('/api/builder/meta').catch(() => ({ error: '서버 연결 안 됨' }));
      if (B.meta.error) { root().innerHTML = `<p class="send-err">가게 만들기 정보를 못 읽었어요: ${esc(B.meta.error)}</p>`; B.meta = null; return; }
    }
    if (!B.D) return renderStart();
    render();
  }

  function renderStart() {
    const ds = B.meta.drafts || [];
    root().innerHTML = `<div class="bd">
      <div class="bd-card">
        <h3>새 가게 만들기</h3>
        <p class="muted">가게 하나를 이 화면에서 처음부터 끝까지 만들어요. 화면 구조는 가마솥 표준 그대로이고, 색·문구·사진·메뉴만 채우면 돼요. 번역은 [AI 번역]으로 초안을 받고 고칠 수 있어요.</p>
        <div class="bd-grid2">
          <label>가게 id <small>주소가 돼요: <b>id</b>.qrmenuasia.com · 영문 소문자·숫자</small><input id="bd-newid" maxlength="30" placeholder="예: hanok" autocomplete="off"></label>
          <label>종류<select id="bd-newkind"><option value="listing">가게 찾기용 (무동의·무료)</option><option value="full">정식 (사장님 동의·계약)</option></select></label>
        </div>
        <p class="send-err" id="bd-newerr"></p>
        <button class="btn" id="bd-create">이 id로 시작</button>
      </div>
      ${ds.length ? `<div class="bd-card"><h3>만들던 가게 이어서 하기</h3><div class="bd-drafts">${ds.map(d => `<button class="btn ghost" data-load="${esc(d.id)}">${esc(d.name)} <small>(${esc(d.id)} · ${esc(stageLabel(d.state))})</small></button>`).join('')}</div></div>` : ''}
    </div>`;
  }
  const stageLabel = s => ({ built: '미리 만듦', registered: '등록함', checked: '점검 통과', committed: '커밋·결재함' }[s] || '입력 중');

  async function create() {
    const id = $('#bd-newid').value.trim().toLowerCase();
    const err = $('#bd-newerr');
    if (!/^[a-z0-9]{2,30}$/.test(id)) { err.textContent = '가게 id 는 영문 소문자·숫자 2~30자예요'; return; }
    if ((B.meta.shops || []).includes(id)) { err.textContent = `${id} 는 이미 있는 가게예요. 다른 id 를 쓰세요`; return; }
    if ((B.meta.drafts || []).some(d => d.id === id)) { err.textContent = `${id} 는 만들던 초안이 있어요. 아래 '이어서 하기'에서 여세요`; return; }
    B.id = id; B.D = newDraft(); B.D.kind = $('#bd-newkind').value; B.ai = new Set();
    const r = await post('/api/builder/save', { id, draft: B.D });
    if (r.error) { err.textContent = r.error; B.D = null; return; }
    B.meta.drafts = [{ id, name: id, state: null }, ...(B.meta.drafts || [])];
    await loadInfo(); render();
  }

  async function loadDraft(id) {
    const r = await get('/api/builder/draft?id=' + encodeURIComponent(id));
    if (r.error || !r.draft) return say(r.error || '초안이 없어요');
    B.id = id; B.D = Object.assign(newDraft(), r.draft); B.info = r; B.ai = new Set(r.draft._ai || []);
    render(); if (r.job?.running) pollJob();
  }
  async function loadInfo() { B.info = await get('/api/builder/draft?id=' + encodeURIComponent(B.id)); }

  // 5개 언어 칸: 한국어 한 칸 + [번역 칸] 펼치기
  function f5(path, label, opt = {}) {
    const v = at(path) || blank5();
    const filled = L4.filter(l => (v[l] || '').trim()).length;
    const tag = opt.area ? 'textarea' : 'input';
    const one = (l) => `<label class="bd-l ${B.ai.has(path + '.' + l) ? 'ai' : ''}"><span>${LN[l]}</span><${tag} data-p="${path}.${l}" ${opt.area ? 'rows="2"' : ''}>${opt.area ? esc(v[l]) : ''}</${tag}></label>`;
    return `<div class="bd-f5">
      <div class="bd-f5-top"><label class="bd-l main"><span>${esc(label)}${opt.need === false ? ' <small>(없으면 비워 두기)</small>' : ''}</span><${tag} data-p="${path}.ko" ${opt.area ? 'rows="2"' : ''} placeholder="${esc(opt.ph || '')}">${opt.area ? esc(v.ko) : ''}</${tag}></label></div>
      <details ${opt.openTr ? 'open' : ''}><summary>번역 ${filled}/4${L4.some(l => B.ai.has(path + '.' + l)) ? ' <em class="ai-mark">AI 초안</em>' : ''}</summary><div class="bd-tr">${L4.map(one).join('')}</div></details>
    </div>`;
  }
  const inp = (path, label, ph = '', type = 'text') => `<label class="bd-l ${B.ai.has(path) ? 'ai' : ''}"><span>${label}</span><input type="${type}" data-p="${path}" placeholder="${esc(ph)}"></label>`;

  function render() {
    const D = B.D, st = B.info?.state?.stage, locked = st === 'committed';
    const photos = (B.info?.images || []).filter(n => /^[a-z0-9-]+\.jpg$/.test(n) && n !== 'sign.jpg');
    const regions = Object.entries(B.meta.regions || {}), cats = Object.entries(B.meta.cats || {}), tags = Object.entries(B.meta.tags || {});
    const topImg = D.top === 'logo' ? 'logo.png' : 'sign.jpg';
    const hasTop = (B.info?.images || []).includes(topImg);
    const nItems = D.cats.reduce((n, c) => n + c.items.length, 0);
    root().innerHTML = `<div class="bd">
    <div class="bd-head">
      <div><b>${esc(D.name.ko || B.id)}</b> <small class="muted">${esc(B.id)}.qrmenuasia.com · ${D.kind === 'listing' ? '가게 찾기용' : '정식'} · ${esc(stageLabel(st))}</small></div>
      <div class="bd-head-r"><span class="muted" id="bd-saved">${B.dirty ? '저장 중…' : '자동 저장됨'}</span><button class="btn ghost" id="bd-other">다른 가게</button></div>
    </div>
    ${locked ? `<p class="bd-note">이 가게는 커밋하고 결재함에 올렸어요(${esc(B.info.state.commit || '')}). 배포는 결재함 [배포 확정]. 더 고칠 것은 Claude 앱이나 점주 편집 화면에서 해요.</p>` : ''}
    <div class="bd-cols">
    <div class="bd-form" ${locked ? 'inert' : ''}>

      <section class="bd-card"><h3><i>1</i>가게 이름·종류</h3>
        <div class="bd-grid2">
          ${inp('name.ko', '가게 이름(한국어, 맨 위 큰 글씨)', '예: 한옥집')}
          ${inp('name.en', '영문 이름(아래 작은 글씨)', '예: HANOK')}
        </div>
        <div class="bd-grid2">
          <label class="bd-l"><span>종류</span><select data-p="kind"><option value="listing">가게 찾기용 — 메뉴 보기만</option><option value="full">정식 — 장바구니·주문서·QR 카드</option></select></label>
          ${D.kind === 'full' ? inp('order.zalo', 'Zalo 주문 번호(없으면 비움)', '예: 0889301000') : '<div></div>'}
        </div>
      </section>

      <section class="bd-card"><h3><i>2</i>맨 위 그림</h3>
        <div class="bd-seg">
          <label><input type="radio" name="bd-top" value="logo" ${D.top === 'logo' ? 'checked' : ''}> 로고가 있어요 (PNG, 배경 투명이면 좋아요)</label>
          <label><input type="radio" name="bd-top" value="sign" ${D.top === 'sign' ? 'checked' : ''}> 로고가 없어요 → 간판이 보이는 가게 사진</label>
        </div>
        <div class="bd-topimg">
          ${hasTop ? `<img src="/builder-img/${B.id}/${topImg}?t=${Date.now()}" alt="" class="${D.top}">` : `<div class="bd-empty">${D.top === 'logo' ? '로고' : '간판 사진'}을 올려 주세요</div>`}
          <label class="btn ghost bd-file">${hasTop ? '바꾸기' : '올리기'}<input type="file" accept="image/*" id="bd-topfile" hidden></label>
        </div>
        <p class="muted">${D.top === 'logo' ? '로고는 긴 변 800px 이하 PNG로 줄여서 올려요.' : '간판 사진은 16:9로 잘라요(끌어서 위치, 막대로 크기).'}</p>
      </section>

      <section class="bd-card"><h3><i>3</i>색</h3>
        <div class="bd-presets">${Object.entries(PRESETS).map(([k, p]) => `<button type="button" class="bd-preset ${D.theme.preset === k ? 'on' : ''}" data-preset="${k}" style="--b:${p.band};--a:${p.accent};--bg:${p.mode === 'dark' ? '#1b1a18' : '#faf8f4'}"><span></span>${p.label}</button>`).join('')}</div>
        <div class="bd-grid4">
          <label class="bd-l"><span>바탕</span><select data-p="theme.mode"><option value="light">밝게</option><option value="dark">어둡게</option></select></label>
          <label class="bd-l"><span>주 색(위 띠·분류 탭·아래)</span><input type="color" data-p="theme.band"></label>
          <label class="bd-l"><span>포인트 색(BEST 표시 등)</span><input type="color" data-p="theme.accent"></label>
          <label class="bd-l"><span>가게 이름 색</span><input type="color" data-p="theme.title"></label>
        </div>
        <p class="muted">간판·메뉴판 색을 닮게 고르세요. 바꾼 뒤 [미리 만들기]를 누르면 오른쪽 화면에 보여요.</p>
      </section>

      <section class="bd-card"><h3><i>4</i>문구</h3>
        ${f5('tagline', '한 줄 소개(이름 아래)', { ph: '예: 한식 · 냉면 · 갈비' })}
        <div class="bd-sub">특징 칩 <small class="muted">포장·배달·주차처럼 간판·메뉴판에 있는 사실만</small> <button type="button" class="btn ghost bd-mini" data-add="chip">+ 칩</button></div>
        ${D.chips.map((c, i) => `<div class="bd-rowx">${f5(`chips.${i}`, `칩 ${i + 1}`, { ph: '예: 포장 가능' })}<button type="button" class="bd-x" data-del="chips.${i}" title="지우기">×</button></div>`).join('') || '<p class="muted">칩 없음(괜찮아요)</p>'}
        ${f5('quote', '인사 문구(아래 가게 정보 위, 줄바꿈 가능)', { area: true, ph: '예: 맛있게 드시고 좋은 하루 보내세요' })}
        ${f5('quoteBy', '서명', { need: false, ph: '예: 한옥집 직원 일동' })}
      </section>

      <section class="bd-card"><h3><i>5</i>가게 정보</h3>
        <div class="bd-grid2">
          ${inp('info.phone', '전화', '예: 0868 333 769')}
          ${inp('info.address', '주소', '예: 206 Hoàng Hoa Thám, Võ Cường, Bắc Ninh')}
        </div>
        ${inp('info.mapUrl', '구글 지도 주소(가게 페이지 링크)', 'https://www.google.com/maps/place/… 또는 https://maps.app.goo.gl/…')}
        ${f5('info.hours', '영업시간', { ph: '예: 10:00 – 22:00 (쉬는 날이 있으면 글로)' })}
        <div class="bd-grid2">
          ${inp('info.wifiName', '와이파이 이름(없으면 비움)')}
          ${inp('info.wifiPass', '와이파이 비밀번호')}
        </div>
      </section>

      <section class="bd-card"><h3><i>6</i>음식 사진 <small class="muted">4~6장 권장 · 4:3(640×480)으로 꽉 차게 잘라요</small></h3>
        <div class="bd-photos">
          ${photos.map(n => `<figure><img src="/builder-img/${B.id}/${n}?t=${B.info.state?.at || 0}" alt=""><figcaption>${esc(n.replace('.jpg', ''))}<button type="button" class="bd-x" data-delphoto="${n}" title="사진 지우기">×</button></figcaption></figure>`).join('')}
          <label class="bd-addphoto">+ 사진 올리기<input type="file" accept="image/*" multiple id="bd-foodfile" hidden></label>
        </div>
      </section>

      <section class="bd-card"><h3><i>7</i>메뉴 <small class="muted">${D.cats.length}분류 · ${nItems}개</small></h3>
        <details class="bd-bulk"><summary>표로 한꺼번에 넣기 (안티그래비티 메뉴판 읽기 결과를 붙여 넣기)</summary>
          <p class="muted">한 줄에 하나: <code>분류 | 메뉴 이름 | 가격</code> · 가격은 <code>150000</code>, <code>150,000</code>, <code>시가</code>, <code>S 100000 / L 150000</code></p>
          <textarea id="bd-bulktext" rows="6" placeholder="식사 | 물냉면 | 160000&#10;식사 | 비빔냉면 | 160000&#10;안주 | 모둠전 | S 200000 / L 300000"></textarea>
          <button type="button" class="btn ghost" id="bd-bulkgo">아래 메뉴 뒤에 넣기</button>
        </details>
        ${D.cats.map((c, ci) => catHtml(c, ci, photos)).join('')}
        <button type="button" class="btn ghost" data-add="cat">+ 분류 더하기</button>
      </section>

      <section class="bd-card"><h3><i>8</i>가게 찾기 등록 정보</h3>
        <div class="bd-grid2">
          <label class="bd-l"><span>지역</span><select data-p="reg.region">${regions.map(([k, r]) => `<option value="${k}">${esc(r.ko)}</option>`).join('')}</select></label>
          <label class="bd-l"><span>검색용 종류</span><select data-p="reg.schema"><option value="Restaurant">음식점</option><option value="BarOrPub">주점·바</option><option value="CafeOrCoffeeShop">카페</option></select></label>
        </div>
        <div class="bd-sub">가게 찾기 분류 <small class="muted">하나 이상</small></div>
        <div class="bd-checks">${cats.map(([k, c]) => `<label><input type="checkbox" data-regcat="${k}" ${D.reg.cats.includes(k) ? 'checked' : ''}> ${esc(c.icon || '')} ${esc(c.ko)}</label>`).join('')}</div>
        <div class="bd-sub">표시 <small class="muted">(있을 때만)</small></div>
        <div class="bd-checks">${tags.map(([k, t]) => `<label><input type="checkbox" data-regtag="${k}" ${D.reg.tags.includes(k) ? 'checked' : ''}> ${esc(t.ko)}</label>`).join('')}</div>
        ${f5('reg.type', '가게 종류 한 줄(가게 찾기 카드)', { ph: '예: 한식 · 냉면 · 갈비' })}
        <div class="bd-grid2">
          <label class="bd-l"><span>요리 종류(영문, 쉼표로)</span><input data-cuisine value="${esc(D.reg.cuisine.join(', '))}" placeholder="Korean, Naengmyeon"></label>
          ${inp('reg.sub', '대표 메뉴 한 줄(비우면 분류 이름)', '예: 냉면 · 갈비 · 만두')}
        </div>
        ${D.kind === 'full' ? `<label class="bd-l"><span>SNS 이미지 언어</span><select data-p="snsLang"><option value="vi">베트남어(베트남 손님)</option><option value="ko">한국어(한국 손님)</option></select></label>` : ''}
      </section>
    </div>

    <aside class="bd-side">
      <div class="bd-card bd-actions">
        <h3>만들기</h3>
        <button class="btn bd-wide" id="bd-tr">AI 번역으로 빈 칸 채우기</button>
        <p class="muted">안티그래비티(무료)가 먼저, 안 되면 Claude(Pro 한도). 한국어가 있는 칸의 빈 번역만 채우고, 채운 칸은 노랗게 'AI 초안'으로 보여요.</p>
        <button class="btn bd-wide" id="bd-build">① 미리 만들기</button>
        <button class="btn bd-wide" id="bd-finish" ${st === 'built' || st === 'registered' || st === 'checked' ? '' : 'disabled'}>② 저장·점검 (등록 + check-shop)</button>
        <button class="btn bd-wide" id="bd-commit" ${st === 'checked' && B.info?.state?.checkOk ? '' : 'disabled'}>③ 커밋하고 결재함에 올리기</button>
        <p class="muted">배포는 하지 않아요. 결재함에서 [배포 확정]을 눌러야 배포돼요.</p>
        <p class="send-err" id="bd-err"></p>
        <pre class="bd-log" id="bd-log" hidden></pre>
        ${st !== 'registered' && st !== 'checked' && st !== 'committed' ? '<button class="btn ghost bd-wide bd-danger" id="bd-discard">이 초안 지우기</button>' : ''}
      </div>
      <div class="bd-card bd-prev">
        <div class="bd-prev-h"><b>미리보기</b>
          <select id="bd-plang">${L5.map(l => `<option value="${l}" ${B.lang === l ? 'selected' : ''}>${LN[l]}</option>`).join('')}</select>
          <div class="bd-seg2"><button type="button" data-view="phone" class="${B.view === 'phone' ? 'on' : ''}">폰</button><button type="button" data-view="pc" class="${B.view === 'pc' ? 'on' : ''}">PC</button></div>
        </div>
        ${B.info?.shopExists ? `<div class="bd-frame ${B.view}"><iframe id="bd-iframe" title="미리보기" src="/shop/${B.id}/?lang=${B.lang}&notrack=1&t=${Date.now()}"></iframe></div>
          <a class="muted" href="/shop/${B.id}/?lang=${B.lang}&notrack=1" target="_blank" rel="noopener">새 창으로 열기 ↗</a>`
          : '<p class="muted">[① 미리 만들기]를 누르면 여기에 폰 화면이 나와요.</p>'}
      </div>
    </aside>
    </div></div>`;
    fillInputs();
    if (B.info?.job) showJob(B.info.job);
  }

  function catHtml(c, ci, photos) {
    return `<div class="bd-cat">
      <div class="bd-cat-h"><b>분류 ${ci + 1}</b>
        <button type="button" class="bd-mini btn ghost" data-move="cats.${ci}.-1" ${ci ? '' : 'disabled'}>↑</button>
        <button type="button" class="bd-mini btn ghost" data-move="cats.${ci}.1" ${ci < B.D.cats.length - 1 ? '' : 'disabled'}>↓</button>
        <button type="button" class="bd-x" data-del="cats.${ci}" title="분류 지우기">×</button></div>
      ${f5(`cats.${ci}.name`, '분류 이름', { ph: '예: 식사' })}
      ${c.note ? `<div class="bd-rowx">${f5(`cats.${ci}.note`, '분류 안내', { ph: '예: 2~3인 기준' })}<button type="button" class="bd-x" data-delnote="${ci}" title="안내 지우기">×</button></div>` : `<button type="button" class="bd-mini btn ghost" data-addnote="${ci}">+ 분류 안내 문구</button>`}
      <div class="bd-items">${c.items.map((it, ii) => itemHtml(it, ci, ii, photos)).join('')}</div>
      <button type="button" class="btn ghost bd-mini" data-additem="${ci}">+ 메뉴</button>
    </div>`;
  }
  function itemHtml(it, ci, ii, photos) {
    const p = `cats.${ci}.items.${ii}`;
    const sized = Array.isArray(it.sizes) && it.sizes.length;
    return `<div class="bd-item">
      <div class="bd-item-top">
        ${it.photo ? `<img class="bd-thumb" src="/builder-img/${B.id}/${it.photo}" alt="">` : '<span class="bd-thumb none">사진<br>없음</span>'}
        <div class="bd-item-main">
          <div class="bd-item-row">
            <label class="bd-l grow"><span>메뉴 이름(한국어)</span><input data-p="${p}.name.ko" placeholder="예: 물냉면"></label>
            ${sized ? '' : `<label class="bd-l price"><span>가격(VND)</span><input data-p="${p}.price" inputmode="numeric" placeholder="160000" ${it.market ? 'disabled' : ''}></label>`}
          </div>
          <div class="bd-item-opts">
            <label><input type="checkbox" data-pb="${p}.market" ${it.market ? 'checked' : ''} ${sized ? 'disabled' : ''}> 시가</label>
            <label><input type="checkbox" data-sized="${p}" ${sized ? 'checked' : ''}> 크기별 가격</label>
            <label><input type="checkbox" data-pb="${p}.spicy" ${it.spicy ? 'checked' : ''}> 🌶 매운</label>
            <select data-p="${p}.tag"><option value="">표시 없음</option><option value="best">BEST</option><option value="must">Must Try</option><option value="special">스페셜</option></select>
            <select data-p="${p}.photo"><option value="">사진 없음</option>${photos.map(n => `<option value="${n}">사진: ${esc(n.replace('.jpg', ''))}</option>`).join('')}</select>
            <button type="button" class="bd-mini btn ghost" data-move="${p}.-1" ${ii ? '' : 'disabled'}>↑</button>
            <button type="button" class="bd-mini btn ghost" data-move="${p}.1" ${ii < B.D.cats[ci].items.length - 1 ? '' : 'disabled'}>↓</button>
            <button type="button" class="bd-x" data-del="${p}" title="메뉴 지우기">×</button>
          </div>
          ${sized ? `<div class="bd-sizes">${it.sizes.map((s, si) => `<span><input data-size="${p}.${si}.0" value="${esc(s[0])}" placeholder="S" class="sz"><input data-size="${p}.${si}.1" value="${esc(s[1] || '')}" inputmode="numeric" placeholder="가격"><button type="button" class="bd-x" data-delsize="${p}.${si}">×</button></span>`).join('')}<button type="button" class="bd-mini btn ghost" data-addsize="${p}">+ 크기</button></div>` : ''}
          <details><summary>번역·설명 ${L4.filter(l => (it.name[l] || '').trim()).length}/4${L4.some(l => B.ai.has(`${p}.name.${l}`)) ? ' <em class="ai-mark">AI 초안</em>' : ''}</summary>
            <div class="bd-tr">${L4.map(l => `<label class="bd-l ${B.ai.has(`${p}.name.${l}`) ? 'ai' : ''}"><span>${LN[l]}</span><input data-p="${p}.name.${l}"></label>`).join('')}</div>
            ${it.desc ? f5(`${p}.desc`, '설명(이름 아래 작은 글씨)', { need: false, openTr: true }) : `<button type="button" class="bd-mini btn ghost" data-adddesc="${p}">+ 설명</button>`}
          </details>
        </div>
      </div>
    </div>`;
  }

  function fillInputs() {
    $$('[data-p]', root()).forEach(el => {
      const v = at(el.dataset.p);
      if (el.type === 'radio') return;
      el.value = v == null ? '' : v;
    });
  }

  // ---------------------------------------------------------------- 고치기·저장
  function changed(structural) {
    B.dirty = true;
    const s = $('#bd-saved'); if (s) s.textContent = '저장 중…';
    clearTimeout(B.saveT);
    B.saveT = setTimeout(save, 900);
    if (structural) { const y = window.scrollY; render(); window.scrollTo(0, y); }
  }
  async function save() {
    clearTimeout(B.saveT);
    B.D._ai = [...B.ai];
    const r = await post('/api/builder/save', { id: B.id, draft: B.D });
    B.dirty = !!r.error;
    const s = $('#bd-saved'); if (s) s.textContent = r.error ? '저장 안 됨: ' + r.error : '자동 저장됨';
    return !r.error;
  }

  function onInput(e) {
    const el = e.target;
    if (el.dataset.p) {
      let v = el.value;
      const p = el.dataset.p;
      if (/\.price$/.test(p)) v = v.replace(/[^\d]/g, '') ? Number(v.replace(/[^\d]/g, '')) : null;
      if (p === 'theme.band' || p === 'theme.accent' || p === 'theme.title' || p === 'theme.mode') B.D.theme.preset = '';
      setAt(p, v);
      if (B.ai.delete(p)) el.closest('.bd-l')?.classList.remove('ai');  // 사람이 고치면 'AI 초안' 표시를 뗀다
      changed(e.type === 'change' && (el.tagName === 'SELECT' && /^(kind|cats\.\d+\.items\.\d+\.photo)$/.test(p)));
    } else if (el.dataset.size) {
      const [p, si, k] = splitLast(el.dataset.size, 2);
      const it = at(p); it.sizes[+si][+k] = +k === 1 ? Number(el.value.replace(/[^\d]/g, '')) || '' : el.value;
      changed(false);
    } else if (el.dataset.cuisine !== undefined) {
      B.D.reg.cuisine = el.value.split(',').map(s => s.trim()).filter(Boolean); changed(false);
    }
  }
  const splitLast = (s, n) => { const a = s.split('.'); return [a.slice(0, -n).join('.'), ...a.slice(-n)]; };

  function onChange(e) {
    const el = e.target;
    if (el.name === 'bd-top') { B.D.top = el.value; return changed(true); }
    if (el.dataset.pb) { setAt(el.dataset.pb, el.checked); return changed(true); }
    if (el.dataset.sized) { const it = at(el.dataset.sized); it.sizes = el.checked ? [['S', it.price || ''], ['L', '']] : undefined; if (!el.checked) delete it.sizes; return changed(true); }
    if (el.dataset.regcat) { const c = B.D.reg.cats; el.checked ? c.push(el.dataset.regcat) : c.splice(c.indexOf(el.dataset.regcat), 1); autoCuisine(); return changed(true); }
    if (el.dataset.regtag) { const t = B.D.reg.tags; el.checked ? t.push(el.dataset.regtag) : t.splice(t.indexOf(el.dataset.regtag), 1); return changed(false); }
    if (el.id === 'bd-topfile') return el.files[0] && uploadTop(el.files[0]);
    if (el.id === 'bd-foodfile') return el.files.length && uploadFood([...el.files]);
    if (el.id === 'bd-plang') { B.lang = el.value; const f = $('#bd-iframe'); if (f) f.src = `/shop/${B.id}/?lang=${B.lang}&notrack=1&t=${Date.now()}`; return; }
    onInput(e);
  }
  function autoCuisine() {
    const was = B.D.reg.cuisine.join(', ');
    const auto = B.D.reg.cats.map(c => CUISINE[c]).filter(Boolean);
    if (!was || Object.values(CUISINE).some(v => was.includes(v))) B.D.reg.cuisine = auto.length ? auto : ['Korean'];
  }

  async function onClick(e) {
    const t = e.target.closest('button, [data-load]');
    if (!t) return;
    if (t.id === 'bd-create') return create();
    if (t.dataset.load) return loadDraft(t.dataset.load);
    if (t.id === 'bd-other') { if (B.dirty) await save(); B.D = null; B.id = ''; B.meta = null; return open(); }
    if (t.dataset.preset) { const p = PRESETS[t.dataset.preset]; Object.assign(B.D.theme, p, { preset: t.dataset.preset }); delete B.D.theme.label; return changed(true); }
    if (t.dataset.add === 'chip') { B.D.chips.push(blank5()); return changed(true); }
    if (t.dataset.add === 'cat') { B.D.cats.push({ name: blank5(), note: null, items: [] }); return changed(true); }
    if (t.dataset.additem) { B.D.cats[+t.dataset.additem].items.push({ name: blank5(), price: null }); return changed(true); }
    if (t.dataset.addnote) { B.D.cats[+t.dataset.addnote].note = blank5(); return changed(true); }
    if (t.dataset.delnote) { B.D.cats[+t.dataset.delnote].note = null; return changed(true); }
    if (t.dataset.adddesc) { at(t.dataset.adddesc).desc = blank5(); return changed(true); }
    if (t.dataset.addsize) { at(t.dataset.addsize).sizes.push(['', '']); return changed(true); }
    if (t.dataset.delsize) { const [p, si] = splitLast(t.dataset.delsize, 1); const it = at(p); it.sizes.splice(+si, 1); if (!it.sizes.length) delete it.sizes; return changed(true); }
    if (t.dataset.del) {
      const [p, i] = splitLast(t.dataset.del, 1); const arr = at(p); const what = arr[+i];
      const name = what?.name?.ko || what?.ko || '';
      if (!confirm(`지울까요? ${name ? `"${name}"` : ''}${what?.items?.length ? ` (메뉴 ${what.items.length}개 포함)` : ''}`)) return;
      arr.splice(+i, 1); return changed(true);
    }
    if (t.dataset.move) { const [p, i, d] = splitLast(t.dataset.move, 2); const arr = at(p); const j = +i + +d; [arr[+i], arr[j]] = [arr[j], arr[+i]]; return changed(true); }
    if (t.dataset.delphoto) {
      const n = t.dataset.delphoto, users = D_items().filter(it => it.photo === n);
      if (!confirm(`사진 ${n} 을 지울까요?${users.length ? ` (메뉴 ${users.length}개에서 빠져요)` : ''}`)) return;
      users.forEach(it => { it.photo = ''; });
      const r = await post('/api/builder/photo/delete', { id: B.id, name: n });
      if (r.error) return say(r.error);
      await save(); await loadInfo(); return render();
    }
    if (t.dataset.view) { B.view = t.dataset.view; return render(); }
    if (t.id === 'bd-bulkgo') return bulk();
    if (t.id === 'bd-tr') return translateAll(t);
    if (t.id === 'bd-build') return build(t);
    if (t.id === 'bd-finish') return finish(t);
    if (t.id === 'bd-commit') return commit(t);
    if (t.id === 'bd-discard') return discard();
  }
  const D_items = () => B.D.cats.flatMap(c => c.items);
  const err = msg => { const el = $('#bd-err'); if (el) el.textContent = msg ? '안 됐어요: ' + msg : ''; if (msg) say(msg.split('\n')[0]); };

  // 표 붙여 넣기: 분류 | 이름 | 가격
  function bulk() {
    const lines = $('#bd-bulktext').value.split('\n').map(l => l.trim()).filter(Boolean);
    let n = 0; const bad = [];
    for (const l of lines) {
      const parts = l.split(/\s*[|\t]\s*/);
      if (parts.length < 3) { bad.push(l); continue; }
      const [cat, name, priceRaw] = parts;
      let c = B.D.cats.find(x => x.name.ko.trim() === cat.trim());
      if (!c) { c = B.D.cats.find(x => !x.name.ko.trim() && !x.items.length); if (c) c.name.ko = cat.trim(); else { c = { name: { ...blank5(), ko: cat.trim() }, note: null, items: [] }; B.D.cats.push(c); } }
      const it = { name: { ...blank5(), ko: name.trim() }, price: null };
      const pr = priceRaw.trim();
      const sz = [...pr.matchAll(/([A-Za-z가-힣0-9]+)\s*[: ]\s*([\d.,]+)/g)];
      if (/시가|market|liên hệ/i.test(pr)) it.market = true;
      else if (/\//.test(pr) && sz.length >= 2) it.sizes = sz.map(m => [m[1], Number(m[2].replace(/[.,]/g, ''))]);
      else if (/\d/.test(pr)) it.price = Number(pr.replace(/[^\d]/g, ''));
      else { bad.push(l); continue; }
      c.items.push(it); n++;
    }
    say(`${n}개 넣었어요${bad.length ? ` · 못 읽은 줄 ${bad.length}개` : ''}`);
    changed(true);
    if (bad.length) $('#bd-bulktext').value = bad.join('\n');
  }

  // ---------------------------------------------------------------- 사진 자르기 (브라우저에서)
  function loadImg(file) {
    return new Promise((ok, no) => { const u = URL.createObjectURL(file); const im = new Image(); im.onload = () => ok(im); im.onerror = () => no(new Error('사진을 못 열었어요')); im.src = u; });
  }
  // 자르기 창: 끌어서 위치, 막대로 크기. 결과는 w×h JPEG data URL
  function cropper(img, w, h, title) {
    return new Promise(done => {
      const box = document.createElement('div');
      box.className = 'bd-crop';
      box.innerHTML = `<div class="bd-crop-in"><b>${esc(title)}</b><small class="muted">끌어서 위치를 맞추고, 막대로 크게·작게. 틀 안이 그대로 메뉴판에 들어가요(${w}×${h}).</small>
        <canvas width="${w}" height="${h}"></canvas><input type="range" min="1" max="4" step="0.01" value="1" aria-label="크기">
        <div class="bd-crop-b"><button type="button" class="btn ghost" data-c="skip">이 사진 건너뛰기</button><button type="button" class="btn" data-c="ok">이렇게 자르기</button></div></div>`;
      document.body.appendChild(box);
      const cv = $('canvas', box), cx = cv.getContext('2d'), rg = $('input', box);
      const cover = Math.max(w / img.width, h / img.height);
      let z = 1, ox = 0, oy = 0;  // ox, oy = 가운데에서 얼마나 옮겼는지(캔버스 픽셀)
      const draw = () => {
        const s = cover * z, dw = img.width * s, dh = img.height * s;
        const mx = (dw - w) / 2, my = (dh - h) / 2;
        ox = Math.max(-mx, Math.min(mx, ox)); oy = Math.max(-my, Math.min(my, oy));
        cx.fillStyle = '#fff'; cx.fillRect(0, 0, w, h);
        cx.drawImage(img, (w - dw) / 2 + ox, (h - dh) / 2 + oy, dw, dh);
      };
      draw();
      let drag = null;
      cv.addEventListener('pointerdown', e => { drag = [e.clientX, e.clientY]; cv.setPointerCapture(e.pointerId); });
      cv.addEventListener('pointermove', e => {
        if (!drag) return; const k = w / cv.getBoundingClientRect().width;
        ox += (e.clientX - drag[0]) * k; oy += (e.clientY - drag[1]) * k; drag = [e.clientX, e.clientY]; draw();
      });
      cv.addEventListener('pointerup', () => { drag = null; });
      cv.addEventListener('wheel', e => { e.preventDefault(); z = Math.max(1, Math.min(4, z * (e.deltaY < 0 ? 1.06 : 1 / 1.06))); rg.value = z; draw(); }, { passive: false });
      rg.addEventListener('input', () => { z = +rg.value; draw(); });
      box.addEventListener('click', e => {
        const c = e.target.dataset.c; if (!c) return;
        const out = c === 'ok' ? cv.toDataURL('image/jpeg', 0.86) : null;
        box.remove(); done(out);
      });
    });
  }
  async function uploadTop(file) {
    try {
      const img = await loadImg(file);
      let data, name;
      if (B.D.top === 'logo') {
        const s = Math.min(1, 800 / Math.max(img.width, img.height));
        const cv = document.createElement('canvas'); cv.width = Math.round(img.width * s); cv.height = Math.round(img.height * s);
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
        data = cv.toDataURL('image/png'); name = 'logo.png';
      } else {
        data = await cropper(img, 1280, 720, '간판 사진 (16:9)'); name = 'sign.jpg';
        if (!data) return;
      }
      const r = await post('/api/builder/photo', { id: B.id, name, data });
      if (r.error) return say(r.error);
      await save(); await loadInfo(); render();
    } catch (e) { say(e.message); }
  }
  async function uploadFood(files) {
    const have = new Set(B.info?.images || []);
    let n = 0;
    for (const f of files) {
      try {
        const img = await loadImg(f);
        if (Math.max(img.width, img.height) < 480) { if (!confirm(`${f.name}: 사진이 작아요(${img.width}×${img.height}). 흐리게 보일 수 있어요. 그래도 쓸까요?`)) continue; }
        const data = await cropper(img, 640, 480, `음식 사진 (4:3) · ${f.name}`);
        if (!data) continue;
        let i = 1; while (have.has(`food-${i}.jpg`)) i++;
        const name = `food-${i}.jpg`; have.add(name);
        const r = await post('/api/builder/photo', { id: B.id, name, data });
        if (r.error) { say(r.error); continue; }
        n++;
      } catch (e) { say(`${f.name}: ${e.message}`); }
    }
    await loadInfo(); render();
    if (n) say(`사진 ${n}장 올렸어요. 메뉴마다 '사진:' 칸에서 고르세요`);
  }

  // ---------------------------------------------------------------- AI 번역
  function groups() {  // [경로, 값] — 한국어가 있고 번역 빈 칸이 있는 5개 언어 칸
    const out = [];
    const add = (p, v) => { if (v && (v.ko || '').trim() && L4.some(l => !(v[l] || '').trim())) out.push([p, v]); };
    ['tagline', 'quote', 'quoteBy', 'reg.type'].forEach(p => add(p, at(p)));
    const hk = B.D.info.hours; if (hk.ko && !/^[0-9:~–\- .,]+$/.test(hk.ko.trim())) add('info.hours', hk);
    B.D.chips.forEach((c, i) => add(`chips.${i}`, c));
    B.D.cats.forEach((c, ci) => {
      add(`cats.${ci}.name`, c.name); if (c.note) add(`cats.${ci}.note`, c.note);
      c.items.forEach((it, ii) => { add(`cats.${ci}.items.${ii}.name`, it.name); if (it.desc) add(`cats.${ci}.items.${ii}.desc`, it.desc); });
    });
    return out;
  }
  async function translateAll(btn) {
    const gs = groups();
    const items = Object.fromEntries(gs.map(([p, v]) => [p, v.ko.trim()]));
    if (!B.D.name.en.trim() && B.D.name.ko.trim()) items.__brand = B.D.name.ko.trim() + ' (가게 이름 — 번역 말고 영문 로마자 표기)';
    if (!Object.keys(items).length) return say('번역할 빈 칸이 없어요(한국어를 먼저 채우세요)');
    btn.disabled = true; const was = btn.textContent;
    btn.textContent = `번역 중… (${Object.keys(items).length}칸, 1~3분)`;
    err('');
    const r = await post('/api/builder/translate', { items });
    btn.disabled = false; btn.textContent = was;
    if (r.error) return err(r.error);
    let n = 0;
    for (const [p, v] of Object.entries(r.result || {})) {
      if (p === '__brand') { if (!B.D.name.en.trim()) { B.D.name.en = v.en; B.ai.add('name.en'); n++; } continue; }
      const cur = at(p); if (!cur) continue;
      for (const l of L4) if (!(cur[l] || '').trim() && v[l]) { cur[l] = v[l]; B.ai.add(`${p}.${l}`); n++; }
    }
    changed(true);
    say(`번역 ${n}칸 채웠어요 (${r.engine === 'agy' ? '안티그래비티' : r.engine === 'claude' ? 'Claude' : r.engine || '없음'})`);
    if (r.errors?.length) err(r.errors.join(' / '));
  }

  // ---------------------------------------------------------------- 만들기·점검·커밋
  async function build(btn) {
    btn.disabled = true; err('');
    if (!(await save())) { btn.disabled = false; return err('저장이 안 돼서 멈췄어요'); }
    const r = await post('/api/builder/build', { id: B.id });
    btn.disabled = false;
    if (r.error) return err(r.error);
    await loadInfo(); render();
    showLog(r.out);
    say('미리 만들었어요. 오른쪽 화면을 확인하세요');
  }
  async function finish(btn) {
    if (!confirm('저장·점검을 할까요?\n가게 찾기 목록·검색 정보·카드 사진에 이 가게를 등록하고(공통 파일 몇 개에 한 줄씩 들어가요), check-shop 으로 점검해요. 1~3분 걸려요. 배포는 하지 않아요.')) return;
    btn.disabled = true; err('');
    const r = await post('/api/builder/finish', { id: B.id });
    if (r.error) { btn.disabled = false; return err(r.error); }
    pollJob();
  }
  function pollJob() {
    clearInterval(B.poll);
    B.poll = setInterval(async () => {
      const r = await get('/api/builder/draft?id=' + encodeURIComponent(B.id)).catch(() => null);
      if (!r || r.id !== B.id) return;
      showJob(r.job);
      if (r.job && !r.job.running) { clearInterval(B.poll); B.info = r; render(); say(r.job.ok ? '점검 통과! ③ 커밋하고 결재함에 올리기' : '고칠 것이 있어요. 아래 기록을 보세요'); }
    }, 2500);
  }
  function showJob(job) { if (job) showLog((job.running ? '⏳ 도는 중…\n' : '') + (job.log || []).join('\n')); }
  function showLog(t) { const el = $('#bd-log'); if (el && t) { el.hidden = false; el.textContent = t; el.scrollTop = el.scrollHeight; } }
  async function commit(btn) {
    if (!confirm('이 가게 파일과 등록한 공통 파일만 커밋하고, 결재함에 "배포 대기"로 올릴까요?\n배포는 결재함에서 [배포 확정]을 눌러야 해요.')) return;
    btn.disabled = true;
    const r = await post('/api/builder/commit', { id: B.id });
    if (r.error) { btn.disabled = false; return err(r.error); }
    await loadInfo(); render();
    showLog(`커밋 ${r.commit} · 결재함에 올렸어요(${r.order}). 결재함에서 [배포 확정]을 누르면 배포돼요.`);
    say('결재함에 올렸어요');
    if (window.loadOrders) window.loadOrders();
  }
  async function discard() {
    const what = `지울 것: 초안(dashboard/out/builder/${B.id})${B.info?.shopExists ? ` + 미리 만든 restaurants/${B.id} 폴더` : ''}. 저장소 커밋은 건드리지 않아요.`;
    if (!confirm(`이 초안을 지울까요? 되돌릴 수 없어요.\n${what}`)) return;
    const r = await post('/api/builder/discard', { id: B.id });
    if (r.error) return err(r.error);
    B.D = null; B.id = ''; B.meta = null; open();
  }

  // ---------------------------------------------------------------- 이벤트
  document.addEventListener('input', e => { if (e.target.closest('#tab-builder') && e.target.type !== 'file' && e.target.type !== 'checkbox' && e.target.type !== 'radio') onInput(e); });
  document.addEventListener('change', e => { if (e.target.closest('#tab-builder') && (e.target.tagName === 'SELECT' || ['checkbox', 'radio', 'file'].includes(e.target.type))) onChange(e); });
  document.addEventListener('click', e => { if (e.target.closest('#tab-builder')) onClick(e); });
  window.addEventListener('beforeunload', e => { if (B.dirty) { save(); e.preventDefault(); } });
  window.Builder = { open };
})();
