// 관리자 화면 '주문·주방 기기' 탭: 가게별 주방 주문 켜기/끄기, 주방 PIN, 연결된 기기, 프린터 기본값, 테이블 QR 주소, 시험 주문
(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const key = () => { try { return sessionStorage.getItem('qm_admin'); } catch { return null; } };
  // 정식(계약) 가게를 먼저, 가게 찾기용은 뒤에
  const STORES = (window.STORES || []).slice().sort((a, b) => (a.listing ? 1 : 0) - (b.listing ? 1 : 0));
  const nameOf = (id) => (STORES.find((s) => s.id === id) || { name: id }).name;
  const PRN = { rawbt: '블루투스 영수증 프린터 (안드로이드 + RawBT 앱)', browser: '브라우저 인쇄 (PC·아이패드·와이파이 프린터)', none: '인쇄 안 함 (화면만)' };
  const fmtT = (ts) => (ts ? new Date(ts).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '–');
  let shop = null, data = null;
  const css = document.createElement('style');
  css.textContent = '#tab-kitchen .grid2>*,#tab-kitchen .cards>*{min-width:0}#tab-kitchen .copy{overflow-wrap:anywhere}';
  document.head.appendChild(css);

  async function api(action, body) {
    const q = '/api/kitchen?action=' + action + (body ? '' : '&shop=' + shop);
    const r = await fetch(q, body ? { method: 'POST', headers: { 'x-admin-key': key() || '', 'content-type': 'application/json' }, body: JSON.stringify({ shop, ...body }) } : { headers: { 'x-admin-key': key() || '' }, cache: 'no-store' });
    if (r.status === 401) { try { sessionStorage.removeItem('qm_admin'); } catch {} location.reload(); throw new Error('auth'); }
    if (!r.ok) throw new Error('failed');
    return r.json();
  }
  const copy = async (t, btn) => { try { await navigator.clipboard.writeText(t); if (btn) btn.textContent = '복사했어요'; } catch { prompt('복사해 주세요', t); } };
  function modal(html) {
    const m = document.createElement('div'); m.className = 'modal'; m.innerHTML = `<div>${html}<div style="margin-top:12px"><button class="btn" data-x="1">닫기</button></div></div>`;
    m.addEventListener('click', (e) => { if (e.target === m || e.target.dataset.x) m.remove(); }); document.body.appendChild(m); return m;
  }
  const devKind = (ua) => (/iPad/.test(ua) ? '아이패드' : /iPhone/.test(ua) ? '아이폰' : /Android/.test(ua) ? (/Mobile/.test(ua) ? '안드로이드 폰' : '안드로이드 태블릿') : /Windows/.test(ua) ? 'PC(윈도우)' : /Mac/.test(ua) ? '맥' : '기타');

  function open() {
    const box = $('tab-kitchen');
    if (!box.dataset.init) {
      box.dataset.init = '1';
      box.innerHTML = `<div class="card" style="margin-bottom:12px"><div class="f"><div><label>가게</label><select id="kShop">${STORES.map((s) => `<option value="${s.id}">${esc(s.name)}${s.listing ? ' · 가게 찾기용' : ''}</option>`).join('')}</select></div>
        <div style="align-self:end;font-size:13px;color:var(--muted)">손님이 메뉴판 주문서에서 <b>주방으로 보내기</b>를 누르면, 주방 태블릿·폰 화면에 소리와 함께 뜨고 영수증 프린터로 인쇄돼요. 처음엔 모든 가게가 <b>꺼짐</b>이에요.</div></div></div>
        <div id="kBody"></div>`;
      $('kShop').addEventListener('change', () => load($('kShop').value));
      box.addEventListener('click', onClick);
    }
    load(shop || STORES[0].id);
  }

  async function load(id) {
    shop = id; $('kShop').value = id;
    const el = $('kBody'); el.innerHTML = '<div class="card">불러오는 중…</div>';
    try { data = await api('k-get'); } catch (e) { if (e.message !== 'auth') el.innerHTML = '<div class="card">불러오지 못했어요. 잠시 뒤 다시 해 주세요.</div>'; return; }
    paint();
  }

  function paint() {
    const c = data.cfg, kurl = `https://qrmenuasia.com/kitchen/?shop=${shop}`;
    const online = data.devices.filter((d) => Date.now() - d.at < 12 * 60e3).length;
    $('kBody').innerHTML = `
      <div class="cards">
        <div class="card"><small>주방 주문</small><b style="color:${c.on ? 'var(--ok)' : 'var(--muted)'}">${c.on ? '켜짐' : '꺼짐'}</b><i>${c.on ? '손님이 보낼 수 있어요' : '손님 화면에 버튼이 안 보여요'}</i></div>
        <div class="card"><small>오늘 주문</small><b>${data.todayCount}</b><i>마지막 변경 ${fmtT(data.lastOrder)}</i></div>
        <div class="card"><small>켜져 있는 주방 기기</small><b>${online}</b><i>최근 12분 안 신호 · 전체 ${data.devices.length}대</i></div>
        <div class="card"><small>주방 PIN</small><b style="font-size:20px">${data.hasPin ? '있음' : '없음'}</b><i>${data.hasPin ? '바꾸면 모든 기기 다시 로그인' : '먼저 만들어 주세요'}</i></div>
      </div>
      <div class="grid2" style="margin-top:0">
        <div class="card"><h2 style="margin:0 0 6px;font-size:16px">① 주문 받기 설정</h2>
          <div class="f" style="grid-template-columns:1fr">
            <div><label><input type="checkbox" id="kOn" ${c.on ? 'checked' : ''} style="width:auto"> 손님 주문서에 <b>주방으로 보내기</b> 버튼 켜기</label></div>
            <div><label><input type="checkbox" id="kKey" ${c.needKey ? 'checked' : ''} style="width:auto"> 테이블 QR로 들어온 손님만 주문 가능 (가게 밖 장난 주문 막기)</label></div>
            <div><label>주방 화면이 새 주문을 확인하는 간격</label><select id="kPoll">${[5, 10, 15, 20, 30].map((n) => `<option value="${n}"${n === c.poll ? ' selected' : ''}>${n}초마다${n === 15 ? ' (추천)' : n === 5 ? ' (빠름·사용량 많음)' : ''}</option>`).join('')}</select></div>
            <div><label>기본 프린터 (기기마다 바꿀 수 있어요)</label><select id="kPrn">${Object.entries(PRN).map(([k, v]) => `<option value="${k}"${k === c.printer ? ' selected' : ''}>${v}</option>`).join('')}</select></div>
            <div><label>영수증 용지 폭</label><select id="kPaper"><option value="58"${c.paper === 58 ? ' selected' : ''}>58mm (작은 휴대용·가장 흔함)</option><option value="80"${c.paper === 80 ? ' selected' : ''}>80mm (카운터용 큰 것)</option></select></div>
          </div>
          <div class="tg"><button class="btn primary" data-k="save">설정 저장</button><button class="btn" data-k="test">시험 주문 보내기</button></div>
        </div>
        <div class="card"><h2 style="margin:0 0 6px;font-size:16px">② 주방 기기 연결</h2>
          <p style="font-size:13px;margin:0 0 8px;color:var(--muted)">주방 태블릿·폰에서 아래 주소를 열고 PIN 6자리를 넣으면 끝이에요. 앱 설치는 필요 없어요(프린터를 쓰면 RawBT 앱만).</p>
          <div class="copy">${esc(kurl)}</div>
          <div class="tg" style="margin-top:0"><button class="btn" data-k="copyk">주소 복사</button><a class="btn" href="${esc(kurl)}" target="_blank" rel="noopener">열어 보기</a><button class="btn primary" data-k="pin">${data.hasPin ? 'PIN 새로 만들기' : 'PIN 만들기'}</button><button class="btn" data-k="logout">모든 기기 로그아웃</button></div>
          <div class="scroll" style="margin-top:10px"><table><thead><tr><th>기기</th><th>종류</th><th>프린터</th><th>마지막 신호</th></tr></thead><tbody>${data.devices.map((d) => `<tr style="cursor:default"><td class="name"><span class="dot ${Date.now() - d.at < 12 * 60e3 ? 'on' : ''}"></span> ${esc(d.name || '이름 없음')}</td><td>${devKind(d.ua || '')}</td><td>${esc({ rawbt: 'RawBT', browser: '브라우저', none: '없음' }[d.printer] || '–')}</td><td class="num">${fmtT(d.at)}</td></tr>`).join('') || '<tr><td colspan="4" class="zero">아직 연결된 기기가 없어요</td></tr>'}</tbody></table></div>
        </div>
      </div>
      <div class="card" style="margin-top:14px"><h2 style="margin:0 0 6px;font-size:16px">③ 테이블별 QR 주소</h2>
        <p style="font-size:13px;margin:0 0 8px;color:var(--muted)">테이블 번호가 자동으로 들어가는 주소예요. ‘테이블 QR로 들어온 손님만’을 켜면 이 주소로 들어온 손님만 주문을 보낼 수 있어요. 테이블 번호를 고르고 <b>QR 카드 인쇄</b>를 누르면 바로 카드가 만들어져요.</p>
        <div class="tg" style="margin-top:0;align-items:center">테이블 <input class="inl" id="kFrom" type="number" min="1" value="1" style="width:80px"> ~ <input class="inl" id="kTo" type="number" min="1" value="20" style="width:80px"><button class="btn" data-k="tables">주소 만들기</button><button class="btn primary" data-k="cards">QR 카드 인쇄</button></div>
        <p style="font-size:12.5px;margin:6px 0 0;color:var(--muted)">QR 카드 인쇄: 새 창에 A4 한 장당 4장(A6, 105×148mm)이 나와요. 인쇄 창에서 ‘PDF로 저장’을 고르거나 바로 인쇄한 뒤 점선을 따라 자르세요.</p>
        <div id="kTables"></div>
      </div>
      <div class="card" style="margin-top:14px"><h2 style="margin:0 0 6px;font-size:16px">연결 안내 (사장님께 설명할 때)</h2>
        <ol style="font-size:14px;line-height:1.7;margin:0;padding-left:20px">
          <li><b>화면만</b>: 주방에 있는 안드로이드 태블릿·폰(아이패드도 됨)에서 ②의 주소 열기 → PIN 입력 → <b>시작</b>. 새 주문이 오면 소리가 나고 빨갛게 깜빡여요.</li>
          <li><b>영수증 프린터</b>: 블루투스 감열 프린터(58mm, 예: Xprinter·Goojprt, 약 50~80만 동)를 태블릿과 블루투스로 연결 → 무료 앱 <b>RawBT</b> 설치 → RawBT에서 프린터 선택 → 주방 화면 ⚙ → <b>시험 인쇄</b>.</li>
          <li><b>PC·와이파이 프린터</b>: 카운터 PC에서 주방 화면을 열고 ⚙ → 프린터를 ‘브라우저 인쇄’로. 인쇄 창이 한 번 뜨니 확인을 눌러요.</li>
          <li>베트남어·한국어 글자는 그림으로 인쇄돼서 프린터 글꼴과 상관없이 깨지지 않아요.</li>
        </ol>
        <p class="note" style="margin-top:10px">· 손님 쪽 <b>주방으로 보내기</b> 버튼은 장바구니가 있는 메뉴판(숯꾸이·가마솥·치뱅이·퍼틴 등)에만 붙어요. 가게 찾기용(메뉴 보기만)은 주문서가 없어요.<br>· 버튼이 실제 손님 화면에 나오려면 그 가게 메뉴판에 새 주문서 파일을 넣고 다시 배포해야 해요(Claude에게 “○○ 주방 주문 켜줘”).<br>· 확인 간격이 짧을수록 서버 저장소 사용량이 늘어요. 처음엔 15초로 두고 사용량을 본 뒤 조정해요.</p>
      </div>`;
  }

  async function onClick(e) {
    const b = e.target.closest('[data-k]'); if (!b) return;
    const a = b.dataset.k;
    try {
      if (a === 'save') {
        await api('k-set', { patch: { on: $('kOn').checked, needKey: $('kKey').checked, poll: +$('kPoll').value, printer: $('kPrn').value, paper: +$('kPaper').value } });
        b.textContent = '저장했어요'; setTimeout(() => load(shop), 600);
      } else if (a === 'test') {
        const j = await api('k-test', {}); b.textContent = `#${j.no} 보냈어요`; setTimeout(() => load(shop), 800);
      } else if (a === 'copyk') copy(`https://qrmenuasia.com/kitchen/?shop=${shop}`, b);
      else if (a === 'pin') {
        if (data.hasPin && !confirm('PIN을 새로 만들면 지금 연결된 주방 기기는 모두 다시 로그인해야 해요. 계속할까요?')) return;
        const j = await api('k-pin', {});
        const kurl = `https://qrmenuasia.com/kitchen/?shop=${shop}`;
        const msg = `[${nameOf(shop)}] Màn hình bếp: ${kurl}\nMã PIN: ${j.pin}\n(주방 화면 주소: ${kurl} — PIN: ${j.pin})`;
        const m = modal(`<h2 style="margin-top:0">주방 PIN</h2><p style="font-size:14px">이 창을 닫으면 다시 볼 수 없어요. 주방 직원에게 아래 문구를 보내 주세요.</p><div class="copy" style="font-size:20px;text-align:center;letter-spacing:6px">${j.pin}</div><div class="copy">${esc(msg)}</div><button class="btn primary" data-c="1">문구 복사</button>`);
        m.querySelector('[data-c]').onclick = (ev) => copy(msg, ev.target);
        load(shop);
      } else if (a === 'logout') {
        if (!confirm('이 가게의 모든 주방 기기를 로그아웃할까요? (PIN은 그대로)')) return;
        await api('k-logout', {}); load(shop);
      } else if (a === 'tables') {
        const j = await api('k-tables', { from: +$('kFrom').value, to: +$('kTo').value });
        const text = j.rows.map((r) => `${r.table}\t${r.url}`).join('\n');
        $('kTables').innerHTML = `<div class="copy" style="max-height:220px;overflow:auto">${esc(text)}</div><button class="btn" id="kTabCopy">전체 복사</button>`;
        $('kTabCopy').onclick = (ev) => copy(text, ev.target);
      } else if (a === 'cards') {
        const w = window.open('', '_blank'); // 기다린 뒤에 열면 팝업 차단될 수 있어 먼저 연다
        if (!w) { alert('새 창이 막혔어요. 브라우저에서 팝업을 허용해 주세요.'); return; }
        w.document.write('<p style="font-family:sans-serif;padding:20px">QR 카드를 만드는 중…</p>');
        let j;
        try { j = await api('k-tables', { from: +$('kFrom').value, to: +$('kTo').value }); } catch (er) { w.close(); throw er; }
        w.document.open(); w.document.write(cardsHtml(nameOf(shop), j.rows)); w.document.close();
      }
    } catch (er) { if (er.message !== 'auth') alert('처리하지 못했어요. 잠시 뒤 다시 해 주세요.'); }
  }

  // 테이블별 QR 카드(공통 모양): A4 세로 한 장에 A6 카드 4장, 점선 = 자르는 선
  function qrSvg(text) {
    const q = window.QMQR(text), n = q.n, pad = 2;
    let d = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.dark(r, c)) d += `M${c + pad} ${r + pad}h1v1h-1z`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n + pad * 2} ${n + pad * 2}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
  }
  function cardsHtml(name, rows) {
    const SAY = [['ko', '찍어서 메뉴 보고 주문하세요'], ['vi', 'Quét mã để xem thực đơn và gọi món'], ['en', 'Scan to see the menu & order'], ['zh', '扫码查看菜单并点餐'], ['ja', '読み取ってメニューを見てご注文ください']];
    const card = (r) => `<div class="c"><div class="nm">${esc(name)}</div><div class="tb"><small>TABLE · BÀN · 테이블</small><b>${esc(r.table)}</b></div>
      <div class="qr">${qrSvg(r.url)}</div><ul>${SAY.map(([l, s]) => `<li lang="${l}">${esc(s)}</li>`).join('')}</ul><div class="ft">qrmenuasia.com</div></div>`;
    const pages = [];
    for (let i = 0; i < rows.length; i += 4) pages.push(`<section class="pg">${rows.slice(i, i + 4).map(card).join('')}</section>`);
    return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(name)} 테이블 QR 카드</title><style>
      @page{size:A4 portrait;margin:0}*{box-sizing:border-box}html,body{margin:0;background:#eee;color:#111;font-family:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans",sans-serif}
      .bar{position:sticky;top:0;z-index:2;display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:10px 16px;background:#222;color:#fff;font-size:14px}.bar button{font:inherit;font-weight:700;padding:8px 16px;border:0;border-radius:8px;background:#fff;color:#111;cursor:pointer}
      .pg{width:210mm;height:297mm;margin:12px auto;background:#fff;display:grid;grid-template-columns:105mm 105mm;grid-template-rows:148.5mm 148.5mm;page-break-after:always;break-after:page;overflow:hidden}
      .c{border:1px dashed #bbb;padding:8mm 8mm 6mm;display:flex;flex-direction:column;align-items:center;text-align:center;overflow:hidden}
      .nm{font-size:15pt;font-weight:800;line-height:1.2;max-height:2.4em;overflow:hidden;word-break:keep-all}
      .tb{margin:3mm 0 2mm;display:flex;align-items:center;gap:3mm}.tb small{font-size:7.5pt;font-weight:700;color:#555;letter-spacing:.5px;writing-mode:horizontal-tb}.tb b{font-size:30pt;line-height:1;font-weight:900;border:2.5px solid #111;border-radius:3mm;padding:1mm 4mm;min-width:16mm}
      .qr{width:56mm;height:56mm}.qr svg{width:100%;height:100%;display:block}
      ul{list-style:none;margin:3mm 0 0;padding:0;font-size:8.6pt;line-height:1.45;font-weight:600}li:first-child{font-size:10pt;font-weight:800}
      .ft{margin-top:auto;font-size:7pt;color:#888}
      @media screen and (max-width:820px){.pg{zoom:.45}}
      @media print{html,body{background:#fff}.bar{display:none}.pg{margin:0}}
    </style></head><body><div class="bar"><span>${esc(name)} · 테이블 ${esc(rows[0].table)}~${esc(rows[rows.length - 1].table)} · ${rows.length}장 (A4 ${pages.length}쪽)</span><button onclick="print()">인쇄 / PDF 저장</button></div>${pages.join('')}</body></html>`;
  }

  window.QMKitchen = { open };
})();
