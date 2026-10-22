// 메뉴 편집기 — 점주 화면(/owner/)과 관리자 화면(/admin 의 '메뉴 편집' 탭)이 같이 쓴다.
// 사용: MenuEditor.mount(요소, { shop, headers: () => ({ 'x-owner-token': ... }), onAuthFail: () => {...}, ui: 'ko'|'vi' })
// 점주는 한 언어(기본 베트남어)로만 쓰고, 나머지 언어는 저장할 때 서버가 자동 번역한다 (/api/menu?action=save).
(function () {
  const LANGS = ['ko', 'en', 'zh', 'ja', 'vi'];
  const LNAME = { ko: '한국어 / Hàn', en: 'English / Anh', zh: '中文 / Trung', ja: '日本語 / Nhật', vi: 'Tiếng Việt / Việt' };
  const TXT = {
    ko: {
      loading: '불러오는 중…', save: '저장하고 손님 화면에 반영', saving: '저장하는 중…(번역 포함, 잠시 걸려요)', saved: '저장했어요. 손님 화면에는 1분 안에 반영돼요.',
      dirty: '저장하지 않은 변경이 있어요', clean: '저장된 상태', history: '이전 버전', reset: '처음 메뉴로 되돌리기', srcLang: '내가 입력하는 언어',
      srcHelp: '이 언어로만 쓰면 돼요. 저장할 때 나머지 언어는 자동 번역돼요(고칠 수도 있어요).', info: '가게 정보', phone: '전화번호', address: '주소', wifi: '와이파이', ssid: '이름', pw: '비밀번호',
      cats: '메뉴 분류', addCat: '+ 분류 추가', addItem: '+ 메뉴 추가', catName: '분류 이름', note: '안내 문구(선택)', name: '메뉴 이름', price: '가격(₫ 또는 ₩)', priceAsk: '비우면 "가격 문의"',
      desc: '설명(선택)', spicy: '매운 메뉴', tag: '표시', tagNone: '없음', tagBest: 'BEST', tagNew: '신메뉴', tagSpecial: '추천', photo: '사진', photoAdd: '사진 올리기', photoDel: '사진 지우기',
      other: '다른 언어로 보이는 글자', auto: '자동 번역', todo: '번역 대기', emptyAuto: '(저장하면 자동 번역)', del: '삭제', up: '▲', down: '▼', sizes: '여러 가격',
      confirmDel: '정말 삭제할까요?', confirmReset: '고친 내용을 모두 지우고 처음 메뉴로 되돌릴까요? (이전 버전 기록은 남아요)', confirmRestore: '이 버전으로 되돌릴까요?', restore: '이 버전으로',
      noHist: '아직 저장 기록이 없어요', upErr: '사진을 올리지 못했어요', upBig: '사진이 너무 커요', authErr: '로그인이 풀렸어요. 다시 로그인해 주세요.', blocked: '로그인 시도가 너무 많아 잠시 막혔어요. 한 시간 뒤 다시 해 주세요.',
      fail: '저장하지 못했어요. 잠시 뒤 다시 시도해 주세요.', trWarn: '자동 번역 서비스에 연결되지 못해 {n}개 글자는 임시로 원문이 보여요. 잠시 뒤 다시 저장하면 번역을 다시 시도해요.', trOk: '자동 번역 {n}개를 채웠어요.',
      emptyCat: '비어 있는 분류예요', skipped: '이름이 없는 메뉴 {n}개는 빼고 저장했어요.', sourceDefault: '아직 고친 적이 없어요(가게 기본 메뉴를 불러왔어요)', sourceCustom: '마지막 저장', close: '닫기', more: '더 보기', less: '접기',
    },
    vi: {
      loading: 'Đang tải…', save: 'Lưu và hiển thị cho khách', saving: 'Đang lưu (có dịch tự động, hơi lâu)…', saved: 'Đã lưu. Khách sẽ thấy trong vòng 1 phút.',
      dirty: 'Có thay đổi chưa lưu', clean: 'Đã lưu', history: 'Phiên bản cũ', reset: 'Khôi phục menu ban đầu', srcLang: 'Ngôn ngữ tôi nhập',
      srcHelp: 'Chỉ cần nhập bằng ngôn ngữ này. Khi lưu, các ngôn ngữ còn lại sẽ được dịch tự động (có thể sửa).', info: 'Thông tin quán', phone: 'Số điện thoại', address: 'Địa chỉ', wifi: 'Wi-Fi', ssid: 'Tên', pw: 'Mật khẩu',
      cats: 'Nhóm món', addCat: '+ Thêm nhóm', addItem: '+ Thêm món', catName: 'Tên nhóm', note: 'Ghi chú (không bắt buộc)', name: 'Tên món', price: 'Giá (₫ hoặc ₩)', priceAsk: 'Để trống = "Hỏi giá"',
      desc: 'Mô tả (không bắt buộc)', spicy: 'Món cay', tag: 'Nhãn', tagNone: 'Không', tagBest: 'BEST', tagNew: 'Món mới', tagSpecial: 'Đề xuất', photo: 'Ảnh', photoAdd: 'Tải ảnh lên', photoDel: 'Xóa ảnh',
      other: 'Chữ hiển thị ở ngôn ngữ khác', auto: 'dịch tự động', todo: 'chờ dịch', emptyAuto: '(sẽ tự dịch khi lưu)', del: 'Xóa', up: '▲', down: '▼', sizes: 'Nhiều mức giá',
      confirmDel: 'Bạn chắc chắn muốn xóa?', confirmReset: 'Xóa mọi chỉnh sửa và quay về menu ban đầu? (Lịch sử phiên bản vẫn còn)', confirmRestore: 'Khôi phục phiên bản này?', restore: 'Dùng phiên bản này',
      noHist: 'Chưa có lịch sử lưu', upErr: 'Không tải được ảnh', upBig: 'Ảnh quá lớn', authErr: 'Phiên đăng nhập đã hết. Vui lòng đăng nhập lại.', blocked: 'Đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 1 giờ.',
      fail: 'Không lưu được. Vui lòng thử lại sau.', trWarn: 'Không kết nối được dịch tự động nên {n} chữ đang hiện bản gốc tạm thời. Lưu lại sau để thử dịch lần nữa.', trOk: 'Đã dịch tự động {n} chữ.',
      emptyCat: 'Nhóm trống', skipped: 'Đã bỏ {n} món không có tên khi lưu.', sourceDefault: 'Chưa chỉnh sửa lần nào (đang dùng menu gốc của quán)', sourceCustom: 'Lần lưu gần nhất', close: 'Đóng', more: 'Xem thêm', less: 'Thu gọn',
    },
  };
  const CSS = `
  .me{--me-line:#e7e0d2;--me-muted:#7a7466;--me-accent:#e8590c;--me-bg:#fff;--me-soft:#f6f3ee;font:15px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,"Apple SD Gothic Neo","Noto Sans KR",sans-serif;color:inherit}
  .me *{box-sizing:border-box}.me input,.me select,.me textarea{font:inherit;color:inherit;background:var(--me-bg);border:1px solid var(--me-line);border-radius:9px;padding:8px 10px;width:100%}
  .me label{display:block;font-size:12px;color:var(--me-muted);margin:8px 0 3px}.me .btn{font:inherit;font-size:14px;border:1px solid var(--me-line);background:var(--me-bg);color:inherit;border-radius:9px;padding:7px 12px;cursor:pointer;width:auto}
  .me .btn.pri{background:var(--me-accent);border-color:var(--me-accent);color:#fff;font-weight:700}.me .btn.danger{color:#e03131}.me .btn.sm{padding:4px 9px;font-size:13px}
  .me .bar{position:sticky;top:0;z-index:5;background:var(--me-soft);border:1px solid var(--me-line);border-radius:12px;padding:10px 12px;margin-bottom:12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap}
  .me .bar .st{flex:1;min-width:140px;font-size:13px;color:var(--me-muted)}.me .bar .st.dirty{color:#c2410c;font-weight:700}
  .me .box{border:1px solid var(--me-line);border-radius:14px;padding:14px;margin-bottom:12px;background:var(--me-bg)}
  .me .row{display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap}.me .row>*{flex:1;min-width:120px}.me .row>.fix{flex:none;min-width:0}
  .me .cat{border:2px solid var(--me-line);border-radius:16px;padding:12px;margin-bottom:14px;background:var(--me-soft)}
  .me .cat h3{margin:0 0 6px;font-size:15px}.me .item{border:1px solid var(--me-line);border-radius:12px;padding:10px;margin:8px 0;background:var(--me-bg)}
  .me .thumb{width:64px;height:64px;border-radius:10px;object-fit:cover;background:var(--me-soft);border:1px solid var(--me-line);flex:none}.me .thumb.big{width:96px;height:64px}
  .me .ph{display:flex;gap:8px;align-items:center;flex:none;min-width:0}.me .tools{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
  .me .badge{font-size:11px;border-radius:5px;padding:1px 6px;background:#e7f5ec;color:#2b8a3e;margin-left:6px}.me .badge.todo{background:#fff4e6;color:#d9480f}
  .me .msg{border-radius:10px;padding:9px 12px;margin-bottom:10px;font-size:14px;background:#fff4e6;color:#9a3412}.me .msg.ok{background:#e7f5ec;color:#2b8a3e}
  .me .small{font-size:12px;color:var(--me-muted)}.me details summary{cursor:pointer;color:var(--me-muted);font-size:13px;margin-top:8px}
  .me .modal{position:fixed;inset:0;background:rgba(0,0,0,.45);display:grid;place-items:center;z-index:50;padding:16px}.me .modal>div{background:var(--me-bg);border-radius:14px;padding:16px;max-width:460px;width:100%;max-height:80vh;overflow:auto}
  @media (prefers-color-scheme:dark){.me{--me-line:#33363f;--me-muted:#9a9484;--me-bg:#20222a;--me-soft:#1a1b20}.me .msg{background:#3a2a1a;color:#fdba74}.me .msg.ok{background:#16301f;color:#86efac}}`;

  function mount(root, opts) {
    const ui = opts.ui || ((navigator.language || '').startsWith('vi') ? 'vi' : 'ko');
    const T = TXT[ui];
    const $ = (h) => { const d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstChild; };
    const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    if (!document.getElementById('me-css')) { const s = document.createElement('style'); s.id = 'me-css'; s.textContent = CSS; document.head.appendChild(s); }
    root.classList.add('me');
    let D = null, dirty = false, msg = null;

    const api = async (path, init = {}) => {
      const r = await fetch(path, { ...init, headers: { ...(opts.headers() || {}), ...(init.headers || {}) } });
      if (r.status === 401) { opts.onAuthFail && opts.onAuthFail(); throw new Error('auth'); }
      if (r.status === 429) throw new Error('blocked');
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || 'failed');
      return j;
    };
    const setMsg = (text, ok) => { msg = text ? { text, ok } : null; };
    const touch = () => { dirty = true; paintBar(); };
    const text = (o) => (o && o[D.srcLang]) || '';

    // 원문(입력 언어)을 고치면, 자동 번역·대기·빈 칸이던 다른 언어는 비워서 저장 때 다시 번역되게 한다
    function editSrc(o, v) {
      o[D.srcLang] = v;
      for (const l of LANGS) if (l !== D.srcLang && ((o._auto || []).includes(l) || (o._pending || []).includes(l) || !o[l])) o[l] = '';
      o._auto = (o._auto || []).filter((l) => o[l]); o._pending = (o._pending || []).filter((l) => o[l]);
      if (!o._auto.length) delete o._auto; if (!o._pending.length) delete o._pending;
    }
    function editOther(o, l, v) {
      o[l] = v;
      o._auto = (o._auto || []).filter((x) => x !== l); o._pending = (o._pending || []).filter((x) => x !== l);
      if (!o._auto.length) delete o._auto; if (!o._pending.length) delete o._pending;
    }

    async function resizeToBlob(file, max) {
      const bmp = await createImageBitmap(file);
      const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
      const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
      c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
      return await new Promise((res) => c.toBlob(res, 'image/jpeg', 0.82));
    }
    async function pickPhoto(max, done) {
      const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
      inp.onchange = async () => {
        const f = inp.files[0]; if (!f) return;
        try {
          const b = await resizeToBlob(f, max);
          if (b.size > 3_800_000) return alert(T.upBig);
          const r = await fetch('/api/photo?shop=' + encodeURIComponent(opts.shop), { method: 'POST', headers: { ...(opts.headers() || {}), 'content-type': 'image/jpeg' }, body: b });
          if (r.status === 401) { opts.onAuthFail && opts.onAuthFail(); return; }
          const j = await r.json();
          if (!r.ok) throw new Error(j.error);
          done(j.url); touch(); paint();
        } catch (e) { alert(T.upErr); }
      };
      inp.click();
    }

    function tx(o, key, label, area) {
      const tag = area ? 'textarea rows="2"' : 'input';
      return `<label>${label}</label><${tag} data-k="${key}" value="${esc(text(o))}">${area ? esc(text(o)) + '</textarea>' : ''}`;
    }

    function itemHtml(it, ci, ii) {
      const others = LANGS.filter((l) => l !== D.srcLang).map((l) => {
        const badge = (it.name._pending || []).includes(l) ? `<span class="badge todo">${T.todo}</span>` : (it.name._auto || []).includes(l) ? `<span class="badge">${T.auto}</span>` : '';
        return `<label>${LNAME[l]}${badge}</label><input data-ol="${l}" value="${esc(it.name[l])}" placeholder="${T.emptyAuto}">`;
      }).join('');
      const sizes = it.sizes ? `<div class="small" style="margin-top:6px">${T.sizes}: ${it.sizes.map((s, si) => `${esc(s[0][D.srcLang] || s[0].ko || '')} <input data-size="${si}" type="number" style="width:110px;display:inline-block" value="${s[1]}">`).join(' · ')}</div>` : '';
      return `<div class="item" data-ci="${ci}" data-ii="${ii}">
        <div class="row">
          <div class="ph fix">${it.photo ? `<img class="thumb" src="${esc(it.photo)}" alt="">` : `<div class="thumb"></div>`}</div>
          <div><label>${T.name}</label><input data-k="name" value="${esc(text(it.name))}"></div>
          ${it.sizes ? '' : `<div style="max-width:170px"><label>${T.price}</label><input data-k="price" type="number" inputmode="numeric" value="${it.price ?? ''}" placeholder="${T.priceAsk}"></div>`}
        </div>${sizes}
        <div class="tools">
          <button class="btn sm" data-a="photo">${T.photoAdd}</button>${it.photo ? `<button class="btn sm" data-a="photodel">${T.photoDel}</button>` : ''}
          <button class="btn sm" data-a="up">${T.up}</button><button class="btn sm" data-a="down">${T.down}</button><button class="btn sm danger" data-a="del">${T.del}</button>
        </div>
        <details><summary>${T.more}</summary>
          <div class="row"><div><label>${T.desc}</label><input data-k="desc" value="${esc(text(it.desc))}"></div>
          <div class="fix"><label>${T.tag}</label><select data-k="tag"><option value="">${T.tagNone}</option><option value="best"${it.tag === 'best' ? ' selected' : ''}>${T.tagBest}</option><option value="new"${it.tag === 'new' ? ' selected' : ''}>${T.tagNew}</option><option value="special"${it.tag === 'special' ? ' selected' : ''}>${T.tagSpecial}</option></select></div></div>
          <label><input type="checkbox" data-k="spicy" style="width:auto"${it.spicy ? ' checked' : ''}> ${T.spicy}</label>
          <div class="small" style="margin-top:8px"><b>${T.other}</b></div>${others}
        </details></div>`;
    }

    function catHtml(c, ci) {
      return `<div class="cat" data-ci="${ci}">
        <div class="row">
          <div class="ph fix">${c.photo ? `<img class="thumb big" src="${esc(c.photo.startsWith('http') ? c.photo : `https://${opts.shop}.qrmenuasia.com/${c.photo}`)}" alt="">` : `<div class="thumb big"></div>`}</div>
          <div><label>${T.catName}</label><input data-k="cname" value="${esc(text(c.name))}"></div>
        </div>
        <div class="tools">
          <button class="btn sm" data-a="cphoto">${T.photoAdd}</button>${c.photo ? `<button class="btn sm" data-a="cphotodel">${T.photoDel}</button>` : ''}
          <button class="btn sm" data-a="cup">${T.up}</button><button class="btn sm" data-a="cdown">${T.down}</button><button class="btn sm danger" data-a="cdel">${T.del}</button>
        </div>
        <details><summary>${T.note}</summary><input data-k="cnote" value="${esc(text(c.note))}"></details>
        ${c.items.map((it, ii) => itemHtml(it, ci, ii)).join('') || `<div class="small" style="margin:8px 0">${T.emptyCat}</div>`}
        <button class="btn sm" data-a="additem">${T.addItem}</button>
      </div>`;
    }

    function paintBar() {
      const st = root.querySelector('.st'); if (!st) return;
      st.className = 'st' + (dirty ? ' dirty' : ''); st.textContent = dirty ? T.dirty : (D.updatedAt ? `${T.clean} · ${new Date(D.updatedAt).toLocaleString()}` : T.sourceDefault);
    }

    function paint() {
      const scroll = window.scrollY;
      root.innerHTML = `
        <div class="bar"><button class="btn pri" data-a="save">${T.save}</button><span class="st"></span><button class="btn" data-a="hist">${T.history}</button><button class="btn danger" data-a="reset">${T.reset}</button></div>
        ${msg ? `<div class="msg ${msg.ok ? 'ok' : ''}">${esc(msg.text)}</div>` : ''}
        <div class="box"><div class="row"><div style="max-width:260px"><label>${T.srcLang}</label><select data-k="srcLang">${LANGS.map((l) => `<option value="${l}"${l === D.srcLang ? ' selected' : ''}>${LNAME[l]}</option>`).join('')}</select></div><div class="small" style="align-self:center">${T.srcHelp}</div></div></div>
        <div class="box"><b>${T.info}</b>
          <div class="row"><div><label>${T.phone}</label><input data-i="phone" value="${esc(D.info.phone)}"></div><div><label>${T.address}</label><input data-i="address" value="${esc(D.info.address)}"></div></div>
          <div class="row"><div><label>${T.wifi} · ${T.ssid}</label><input data-i="ssid" value="${esc(D.info.wifi && D.info.wifi.ssid)}"></div><div><label>${T.wifi} · ${T.pw}</label><input data-i="wpw" value="${esc(D.info.wifi && D.info.wifi.password)}"></div></div>
        </div>
        <div><b>${T.cats}</b></div><div style="margin-top:8px">${D.menu.map(catHtml).join('')}</div>
        <button class="btn" data-a="addcat">${T.addCat}</button>`;
      paintBar(); window.scrollTo(0, scroll);
    }

    const swap = (a, i, j) => { if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; };

    root.addEventListener('input', (e) => {
      const t = e.target, k = t.dataset.k, box = t.closest('.item, .cat'), item = t.closest('.item');
      if (t.dataset.i) {
        const f = t.dataset.i;
        if (f === 'phone' || f === 'address') D.info[f] = t.value;
        else { D.info.wifi = D.info.wifi || { ssid: '', password: '' }; D.info.wifi[f === 'ssid' ? 'ssid' : 'password'] = t.value; }
        return touch();
      }
      if (k === 'srcLang') { D.srcLang = t.value; touch(); return paint(); }
      if (!box) return;
      const c = D.menu[+box.dataset.ci];
      if (item) {
        const it = c.items[+item.dataset.ii];
        if (k === 'name') editSrc(it.name, t.value);
        else if (k === 'price') it.price = t.value === '' ? null : Number(t.value);
        else if (k === 'desc') { it.desc = it.desc || {}; editSrc(it.desc, t.value); }
        else if (k === 'tag') it.tag = t.value || undefined;
        else if (k === 'spicy') it.spicy = t.checked || undefined;
        else if (t.dataset.ol) editOther(it.name, t.dataset.ol, t.value);
        else if (t.dataset.size !== undefined) it.sizes[+t.dataset.size][1] = Number(t.value) || 0;
      } else if (k === 'cname') editSrc(c.name, t.value);
      else if (k === 'cnote') { c.note = c.note || {}; editSrc(c.note, t.value); }
      touch();
    });

    root.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-a]'); if (!b) return;
      const a = b.dataset.a, catEl = b.closest('.cat'), itemEl = b.closest('.item');
      const ci = catEl ? +catEl.dataset.ci : -1, ii = itemEl ? +itemEl.dataset.ii : -1;
      const blank = () => ({ ko: '', en: '', zh: '', ja: '', vi: '' });
      if (a === 'save') return save();
      if (a === 'hist') return history();
      if (a === 'reset') { if (!confirm(T.confirmReset)) return; try { await api(`/api/menu?action=reset&shop=${opts.shop}`, { method: 'POST', body: '{}', headers: { 'content-type': 'application/json' } }); await load(); } catch (er) { fail(er); } return; }
      if (a === 'addcat') { D.menu.push({ id: 'c' + Date.now().toString(36), name: blank(), items: [] }); touch(); return paint(); }
      if (a === 'additem') { D.menu[ci].items.push({ name: blank(), price: null }); touch(); return paint(); }
      if (a === 'cup') swap(D.menu, ci, ci - 1); else if (a === 'cdown') swap(D.menu, ci, ci + 1);
      else if (a === 'cdel') { if (!confirm(T.confirmDel)) return; D.menu.splice(ci, 1); }
      else if (a === 'up') swap(D.menu[ci].items, ii, ii - 1); else if (a === 'down') swap(D.menu[ci].items, ii, ii + 1);
      else if (a === 'del') { if (!confirm(T.confirmDel)) return; D.menu[ci].items.splice(ii, 1); }
      else if (a === 'photodel') delete D.menu[ci].items[ii].photo;
      else if (a === 'cphotodel') delete D.menu[ci].photo;
      else if (a === 'photo') return pickPhoto(900, (u) => { D.menu[ci].items[ii].photo = u; });
      else if (a === 'cphoto') return pickPhoto(1400, (u) => { D.menu[ci].photo = u; });
      touch(); paint();
    });

    function fail(er) {
      if (er.message === 'auth') return setMsg(T.authErr), paint();
      setMsg(er.message === 'blocked' ? T.blocked : T.fail); paint();
    }

    async function save() {
      let skipped = 0;
      const menu = D.menu.map((c) => ({ ...c, items: c.items.filter((it) => { const ok = text(it.name).trim(); if (!ok) skipped++; return ok; }) })).filter((c) => text(c.name).trim());
      setMsg(T.saving, true); paint();
      try {
        const j = await api(`/api/menu?action=save&shop=${opts.shop}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ menu, info: D.info, srcLang: D.srcLang }) });
        D = { menu: j.menu, info: j.info, srcLang: j.srcLang, updatedAt: j.updatedAt, source: 'custom' }; dirty = false;
        const parts = [T.saved];
        if (j.translated) parts.push(T.trOk.replace('{n}', j.translated));
        if (j.pending) parts.push(T.trWarn.replace('{n}', j.pending));
        if (skipped) parts.push(T.skipped.replace('{n}', skipped));
        setMsg(parts.join(' '), !j.pending); paint();
      } catch (er) { fail(er); }
    }

    async function history() {
      try {
        const j = await api(`/api/menu?action=history&shop=${opts.shop}`);
        const m = $(`<div class="modal"><div><b>${T.history}</b><div class="small" style="margin:6px 0">${j.items.length ? '' : T.noHist}</div>${j.items.map((h) => `<div class="row" style="margin:6px 0"><span>${new Date(h.ts).toLocaleString()}</span><button class="btn sm fix" data-p="${esc(h.path)}">${T.restore}</button></div>`).join('')}<div style="margin-top:12px"><button class="btn" data-x="1">${T.close}</button></div></div></div>`);
        m.addEventListener('click', async (e) => {
          if (e.target === m || e.target.dataset.x) return m.remove();
          const p = e.target.dataset.p; if (!p || !confirm(T.confirmRestore)) return;
          try { const r = await api(`/api/menu?action=restore&shop=${opts.shop}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ path: p }) }); D = { menu: r.menu, info: r.info, srcLang: r.srcLang, updatedAt: r.updatedAt }; dirty = false; setMsg(T.saved, true); m.remove(); paint(); } catch (er) { m.remove(); fail(er); }
        });
        root.appendChild(m);
      } catch (er) { fail(er); }
    }

    async function load() {
      root.textContent = T.loading;
      try {
        const j = await api(`/api/menu?action=load&shop=${opts.shop}`);
        D = { menu: j.menu || [], info: { phone: j.info?.phone ?? '', address: j.info?.address ?? '', wifi: j.info?.wifi ?? null }, srcLang: j.srcLang || 'vi', updatedAt: j.updatedAt, source: j.source };
        dirty = false; msg = null; paint();
      } catch (er) { root.textContent = ''; setMsg(er.message === 'auth' ? T.authErr : er.message === 'blocked' ? T.blocked : T.fail); root.innerHTML = `<div class="msg">${esc(msg.text)}</div>`; }
    }
    window.addEventListener('beforeunload', (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });
    load();
    return { reload: load };
  }
  window.MenuEditor = { mount };
})();
