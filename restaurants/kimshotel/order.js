// 장바구니 · 주문서 — 메뉴마다 "담기" 버튼, 아래쪽 장바구니 막대, 주문서(직원에게 보여주기 / Zalo로 보내기).
// 원본은 restaurants/_shared/ 에만 두고, sync-order.sh 로 각 가게 폴더에 복사한다.
// 가게 설정은 menu.js 의 window.ORDER (없으면 기본값):
//   staff: 주문서 언어(직원이 읽는 언어, 기본 "vi") · currency: "₫" | "원" · zalo: 주문 받을 Zalo 번호(null이면 버튼 숨김)
//   labels: 문구 바꾸기(선택) — 예: 호텔은 { table: { ko: "객실 번호", vi: "Số phòng", … }, tablePh: { … } }
// 메뉴 화면은 각 가게 index.html 이 그린다. 이 파일은 #menu > section(MENU 순서) > ul > li(items 순서)에 버튼만 붙인다.
// 테이블 번호: QR 주소에 ?t=5 를 붙이면 주문서에 자동으로 들어간다.
(function () {
  const MENU = window.MENU, R = window.RESTAURANT || {};
  if (!Array.isArray(MENU) || !document.getElementById("menu")) return;
  const CFG = Object.assign({ staff: "vi", currency: "₫", zalo: null }, window.ORDER || {});
  const KEY = "qo-cart-v1", TTL = 6 * 3600 * 1000; // 오래된 장바구니(지난 방문)는 비운다

  const T = {
    ko: { say: "이 화면을 직원에게 보여주세요", add: "담기", items: "개", view: "주문서 보기", title: "주문서", total: "합계", table: "테이블 번호", tablePh: "예: 5", note: "요청사항", notePh: "덜 맵게, 앞접시 2개 등", show: "직원에게 보여주기", send: "주문서 복사하고 Zalo 열기", copied: "주문서를 복사했어요 — Zalo에 붙여넣어 보내세요", copyFail: "복사가 안 됐어요 — 아래 내용을 직접 복사해 주세요", clear: "비우기", preview: "주문서 내용 보기", market: "시가", after: "후식", plus: "시가 메뉴 별도", hint: "최종 금액은 가게에서 확인해 드려요", close: "닫기", added: "담았어요" },
    en: { say: "Please show this screen to the staff", add: "Add", items: "items", view: "View order", title: "Your order", total: "Total", table: "Table no.", tablePh: "e.g. 5", note: "Requests", notePh: "Less spicy, 2 extra plates…", show: "Show to staff", send: "Copy order & open Zalo", copied: "Order copied — paste it in Zalo to send", copyFail: "Couldn't copy — please copy the text below", clear: "Clear", preview: "Show order text", market: "Market price", after: "With BBQ", plus: "+ market-price items", hint: "The shop will confirm the final amount", close: "Close", added: "Added" },
    zh: { say: "请把此画面给服务员看", add: "加入", items: "份", view: "查看订单", title: "我的订单", total: "合计", table: "桌号", tablePh: "例：5", note: "备注", notePh: "少辣、多拿两个碟子等", show: "给服务员看", send: "复制订单并打开Zalo", copied: "订单已复制 — 粘贴到Zalo发送", copyFail: "复制失败 — 请手动复制下方内容", clear: "清空", preview: "查看订单内容", market: "时价", after: "配烤肉价", plus: "另加时价菜品", hint: "最终金额以店家确认为准", close: "关闭", added: "已加入" },
    ja: { say: "この画面をスタッフに見せてください", add: "追加", items: "点", view: "注文を見る", title: "ご注文", total: "合計", table: "テーブル番号", tablePh: "例：5", note: "ご要望", notePh: "辛さ控えめ、取り皿2枚など", show: "スタッフに見せる", send: "注文をコピーしてZaloを開く", copied: "注文をコピーしました — Zaloに貼り付けて送信", copyFail: "コピーできませんでした — 下の内容をコピーしてください", clear: "空にする", preview: "注文内容を見る", market: "時価", after: "焼肉と一緒に", plus: "＋時価メニュー", hint: "最終金額はお店で確認します", close: "閉じる", added: "追加しました" },
    vi: { say: "Đưa màn hình này cho nhân viên", add: "Thêm", items: "món", view: "Xem đơn", title: "Đơn gọi món", total: "Tổng", table: "Số bàn", tablePh: "VD: 5", note: "Ghi chú", notePh: "Ít cay, thêm 2 bát…", show: "Đưa nhân viên xem", send: "Sao chép đơn & mở Zalo", copied: "Đã sao chép đơn — dán vào Zalo để gửi", copyFail: "Không sao chép được — hãy chép nội dung bên dưới", clear: "Xóa đơn", preview: "Xem nội dung đơn", market: "Thời giá", after: "Giá ăn kèm thịt nướng", plus: "+ món thời giá", hint: "Quán sẽ xác nhận số tiền cuối cùng", close: "Đóng", added: "Đã thêm" },
  };
  for (const [k, byLang] of Object.entries(CFG.labels || {})) for (const [l, v] of Object.entries(byLang)) if (T[l]) T[l][k] = v;
  // 직원에게 보여주는 주문서 머리말 (직원 언어)
  const HEAD = { vi: "ĐƠN GỌI MÓN", ko: "주문서", en: "ORDER", zh: "点餐单", ja: "注文書" };

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const langOf = () => { const l = (document.documentElement.lang || "en").toLowerCase().split("-")[0]; return T[l] ? l : "en"; };
  const money = (n) => n.toLocaleString("en-US") + CFG.currency;
  const pick = (o, l) => (o == null ? "" : typeof o === "string" ? o : o[l] || o.en || o.ko || "");
  function storage(fn) { try { return fn(localStorage); } catch { return null; } }

  // 메뉴 하나의 고를 수 있는 가격: sizes(S/L, 한 마리/반 마리) · dessert(후식 가격) · price(null = 시가)
  function options(it) {
    if (it.sizes) return it.sizes.map(([label, price]) => ({ label, price }));
    if (it.dessert) return [{ label: null, price: it.price }, { label: "after", price: it.dessert }];
    return [{ label: null, price: it.price }];
  }
  const ITEMS = new Map(); // key "카테고리id.순서.옵션" → { it, opt }
  MENU.forEach((cat) => cat.items.forEach((it, i) => options(it).forEach((opt, o) => ITEMS.set(`${cat.id}.${i}.${o}`, { it, opt }))));
  const optLabel = (opt, l) => (opt.label === "after" ? T[l].after : pick(opt.label, l));
  const lineName = (k, l) => { const { it, opt } = ITEMS.get(k), s = optLabel(opt, l); return pick(it.name, l) + (s ? ` (${s})` : ""); };

  // ── 장바구니 (localStorage, 순서 유지) ──
  const saved = storage((s) => JSON.parse(s.getItem(KEY) || "null"));
  const fresh = saved && Date.now() - saved.t < TTL;
  const cart = new Map(fresh ? (saved.items || []).filter(([k, q]) => ITEMS.has(k) && q > 0) : []);
  const qTable = new URLSearchParams(location.search).get("t") || new URLSearchParams(location.search).get("table");
  let table = (qTable || (fresh && saved.table) || "").slice(0, 12), note = (fresh && saved.note) || "";
  const save = () => storage((s) => s.setItem(KEY, JSON.stringify({ t: Date.now(), items: [...cart], table, note })));
  const count = () => [...cart.values()].reduce((a, b) => a + b, 0);
  const total = () => [...cart].reduce((n, [k, q]) => n + (ITEMS.get(k).opt.price || 0) * q, 0);
  const hasMarket = () => [...cart.keys()].some((k) => ITEMS.get(k).opt.price == null);

  function orderText() {
    const l = T[CFG.staff] ? CFG.staff : "vi", t = T[l];
    const rows = [`🧾 ${HEAD[l] || HEAD.en}${table ? ` · ${t.table}: ${table}` : ""}`, ""];
    for (const [k, q] of cart) {
      const p = ITEMS.get(k).opt.price;
      rows.push(`• ${lineName(k, l)} × ${q} — ${p == null ? t.market : money(p * q)}`);
    }
    rows.push("", `${t.total}: ${money(total())}${hasMarket() ? ` ${t.plus}` : ""}`);
    if (note.trim()) rows.push(`${t.note}: ${note.trim()}`);
    return rows.join("\n");
  }

  // 직원에게 보여주는 화면: 직원 언어로 크게, 위에는 손님 언어로 안내 한 줄
  function staffHtml() {
    const l = T[CFG.staff] ? CFG.staff : "vi", t = T[l], me = langOf();
    const lines = [...cart].map(([k, q]) => {
      const p = ITEMS.get(k).opt.price, mine = me === l ? "" : lineName(k, me);
      return `<li><em>${q}×</em><b>${esc(lineName(k, l))}</b><small>${p == null ? esc(t.market) : money(p * q)}${mine ? ` · ${esc(mine)}` : ""}</small></li>`;
    }).join("");
    return `<p class="say">${esc(T[me].say)}</p>
      <div class="hd"><b>🧾 ${esc(HEAD[l] || HEAD.en)}</b>${table ? `<span>${esc(t.table)} ${esc(table)}</span>` : ""}</div>
      <ul>${lines}</ul>
      <div class="ft"><span>${esc(t.total)}</span><span>${money(total())}${hasMarket() ? ` ${esc(t.plus)}` : ""}</span></div>
      ${note.trim() ? `<div class="nt">${esc(t.note)}: ${esc(note.trim())}</div>` : ""}`;
  }

  const css = `
    .qo-add { display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 6px; margin-top: 7px; }
    .qo-add button { position: relative; font: inherit; font-size: 12.5px; font-weight: 800; line-height: 1; letter-spacing: 0; text-transform: none; color: var(--pt-ink, #222); background: transparent; border: 1.5px solid var(--pt-line, #ddd); border-radius: 999px; padding: 6px 11px 6px 9px; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .qo-add button::before { content: "+ "; color: var(--pt-accent, #e0452b); }
    .qo-add button.in { border-color: var(--pt-accent, #e0452b); }
    .qo-add button[data-n]::after { content: attr(data-n); position: absolute; top: -8px; right: -6px; min-width: 18px; height: 18px; padding: 0 4px; box-sizing: border-box; display: grid; place-items: center; border-radius: 999px; font-size: 11px; background: var(--pt-accent, #e0452b); color: #fff; }
    body.qo-has { padding-bottom: 84px; }
    .qo-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 900; padding: 10px 16px calc(10px + env(safe-area-inset-bottom)); pointer-events: none; }
    .qo-bar[hidden], .qo-sheet[hidden], .qo-staff[hidden] { display: none; }
    .qo-bar button { pointer-events: auto; display: flex; align-items: center; gap: 10px; width: 100%; max-width: 528px; margin: 0 auto; font: inherit; color: var(--pt-btn-ink, #fff); background: var(--pt-btn, #222); border: 0; border-radius: 16px; padding: 12px 16px; box-shadow: var(--pt-shadow, 0 8px 20px rgba(0,0,0,.3)); cursor: pointer; }
    .qo-bar .qo-n { background: var(--pt-btn-ink, #fff); color: var(--pt-bg, #222); font-weight: 800; border-radius: 999px; min-width: 26px; padding: 2px 8px; font-size: 14px; }
    .qo-bar .qo-sum { flex: 1; text-align: left; font-weight: 800; font-size: 17px; }
    .qo-bar b { font-size: 14.5px; }
    .qo-sheet { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: flex-end; justify-content: center; }
    .qo-bg { position: absolute; inset: 0; background: rgba(0,0,0,.5); }
    .qo-panel { position: relative; width: 100%; max-width: 560px; max-height: 88vh; overflow-y: auto; box-sizing: border-box; color: var(--pt-ink, #222); background: var(--pt-bg, #fff); border-radius: 20px 20px 0 0; padding: 16px 16px calc(20px + env(safe-area-inset-bottom)); text-align: left; }
    .qo-panel * { box-sizing: border-box; letter-spacing: 0; text-transform: none; }
    .qo-head { display: flex; justify-content: space-between; align-items: center; }
    .qo-head h3 { margin: 0; font-size: 20px; font-weight: 800; color: var(--pt-ink, #222); }
    .qo-x { font: inherit; font-size: 26px; line-height: 1; border: 0; background: none; color: var(--pt-muted, #888); cursor: pointer; padding: 0 4px; }
    .qo-lines { list-style: none; margin: 8px 0 0; padding: 0; }
    .qo-lines li { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--pt-line, #eee); }
    .qo-lines .nm { flex: 1; min-width: 0; font-size: 15px; font-weight: 700; }
    .qo-lines .nm small { display: block; font-size: 12px; font-weight: 500; color: var(--pt-muted, #888); }
    .qo-lines .pr { font-size: 14px; font-weight: 700; white-space: nowrap; }
    .qo-qty { display: flex; align-items: center; gap: 6px; }
    .qo-qty button { width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid var(--pt-line, #ccc); background: transparent; color: var(--pt-ink, #222); font: inherit; font-weight: 800; cursor: pointer; padding: 0; }
    .qo-qty span { min-width: 18px; text-align: center; font-weight: 800; }
    .qo-total { display: flex; justify-content: space-between; align-items: baseline; margin: 12px 0 2px; font-size: 17px; font-weight: 800; }
    .qo-total small { font-size: 12px; font-weight: 600; color: var(--pt-muted, #888); }
    .qo-hint { margin: 0 0 10px; font-size: 12px; color: var(--pt-muted, #888); }
    .qo-fields { display: grid; grid-template-columns: 110px 1fr; gap: 8px; margin: 10px 0; }
    .qo-fields label { display: grid; gap: 4px; font-size: 12.5px; font-weight: 700; color: var(--pt-muted, #888); }
    .qo-fields input { font: inherit; font-size: 16px; width: 100%; padding: 9px 11px; border: 1.5px solid var(--pt-line, #ddd); border-radius: 12px; background: transparent; color: var(--pt-ink, #222); }
    .qo-acts { display: grid; gap: 8px; margin-top: 6px; }
    .qo-acts button { font: inherit; font-weight: 800; font-size: 15.5px; border-radius: 14px; padding: 13px; cursor: pointer; }
    .qo-main { color: var(--pt-btn-ink, #fff); background: var(--pt-btn, #222); border: 0; }
    .qo-zalo { color: #fff; background: #0068ff; border: 0; }
    .qo-ghost { color: var(--pt-muted, #888); background: transparent; border: 1.5px solid var(--pt-line, #ddd); }
    .qo-prev { margin-top: 10px; font-size: 13px; color: var(--pt-muted, #888); }
    .qo-prev summary { cursor: pointer; }
    .qo-prev pre { white-space: pre-wrap; font: inherit; font-size: 13.5px; color: var(--pt-ink, #222); border: 1px dashed var(--pt-line, #ddd); border-radius: 12px; padding: 10px; margin: 8px 0 0; user-select: all; -webkit-user-select: all; }
    .qo-staff { position: fixed; inset: 0; z-index: 1100; overflow-y: auto; background: #fff; color: #111; padding: 20px 20px calc(24px + env(safe-area-inset-bottom)); }
    .qo-staff-in { max-width: 560px; margin: 0 auto; }
    .qo-staff .say { margin: 0 0 14px; font-size: 14px; font-weight: 700; color: #666; text-align: center; }
    .qo-staff .hd { display: flex; justify-content: space-between; align-items: center; gap: 10px; border-bottom: 3px solid #111; padding-bottom: 10px; }
    .qo-staff .hd b { font-size: 22px; font-weight: 800; }
    .qo-staff .hd span { font-size: 26px; font-weight: 800; background: #111; color: #fff; border-radius: 12px; padding: 4px 14px; white-space: nowrap; }
    .qo-staff ul { list-style: none; margin: 0; padding: 0; }
    .qo-staff li { display: grid; grid-template-columns: 52px 1fr; gap: 2px 10px; padding: 12px 0; border-bottom: 1px solid #ddd; }
    .qo-staff li em { grid-row: span 2; font-style: normal; font-size: 26px; font-weight: 800; text-align: right; }
    .qo-staff li b { font-size: 21px; font-weight: 800; line-height: 1.3; }
    .qo-staff li small { font-size: 14px; color: #666; }
    .qo-staff .ft { display: flex; justify-content: space-between; font-size: 20px; font-weight: 800; padding: 12px 0 0; }
    .qo-staff .nt { margin: 12px 0 0; padding: 10px 12px; border: 2px dashed #111; border-radius: 12px; font-size: 18px; font-weight: 700; white-space: pre-wrap; }
    .qo-staff button { display: block; width: 100%; max-width: 560px; margin: 20px auto 0; font: inherit; font-size: 16px; font-weight: 800; padding: 14px; border-radius: 14px; border: 2px solid #111; background: #fff; color: #111; cursor: pointer; }
    .qo-toast { position: fixed; left: 50%; top: calc(14px + env(safe-area-inset-top)); transform: translateX(-50%); z-index: 1200; background: rgba(0,0,0,.85); color: #fff; font-size: 14px; font-weight: 700; padding: 9px 16px; border-radius: 999px; opacity: 0; transition: opacity .2s; pointer-events: none; max-width: 90vw; text-align: center; }
    .qo-toast.on { opacity: 1; }
    :lang(ko) .qo-panel, :lang(ko) .qo-add { word-break: keep-all; }
  `;

  function toast(msg) {
    const el = $("qoToast");
    el.textContent = msg;
    el.classList.add("on");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => el.classList.remove("on"), 1800);
  }

  // 메뉴 화면이 다시 그려질 때마다(언어 변경) 버튼을 붙인다
  function decorate() {
    const l = langOf(), t = T[l];
    const sections = document.querySelectorAll("#menu > section");
    MENU.forEach((cat, ci) => {
      const sec = sections[ci];
      if (!sec || sec.id !== cat.id) return;
      const lis = sec.querySelectorAll(":scope > ul > li");
      cat.items.forEach((it, i) => {
        const li = lis[i];
        if (!li || li.querySelector(".qo-add")) return;
        const box = document.createElement("div");
        box.className = "qo-add";
        box.innerHTML = options(it).map((opt, o) =>
          `<button type="button" data-k="${cat.id}.${i}.${o}">${esc(optLabel(opt, l) || t.add)}</button>`).join("");
        (li.querySelector(":scope > .info") || li).appendChild(box);
      });
    });
    paintButtons();
  }
  function paintButtons() {
    const t = T[langOf()];
    document.querySelectorAll(".qo-add button").forEach((b) => {
      const q = cart.get(b.dataset.k) || 0;
      b.classList.toggle("in", q > 0);
      if (q) b.dataset.n = q; else delete b.dataset.n;
      b.setAttribute("aria-label", `${t.add}: ${lineName(b.dataset.k, langOf())}${q ? ` (${q})` : ""}`);
    });
  }

  function update() {
    const l = langOf(), t = T[l], n = count();
    $("qoBar").hidden = n === 0;
    document.body.classList.toggle("qo-has", n > 0);
    $("qoN").textContent = n;
    $("qoSum").textContent = money(total()) + (hasMarket() ? " +" : "");
    $("qoCta").textContent = t.view + " ›";
    paintButtons();
    if (!$("qoSheet").hidden) renderSheet();
    save();
  }

  function renderSheet() {
    const l = langOf(), t = T[l];
    if (!cart.size) { closeSheet(); return; }
    $("qoTitle").textContent = t.title;
    $("qoLines").innerHTML = [...cart].map(([k, q]) => {
      const p = ITEMS.get(k).opt.price, other = l === CFG.staff ? "" : lineName(k, CFG.staff);
      return `<li><div class="nm">${esc(lineName(k, l))}${other ? `<small>${esc(other)}</small>` : ""}</div>
        <div class="qo-qty"><button type="button" data-dec="${k}" aria-label="-">−</button><span>${q}</span><button type="button" data-inc="${k}" aria-label="+">+</button></div>
        <div class="pr">${p == null ? esc(t.market) : money(p * q)}</div></li>`;
    }).join("");
    $("qoTotal").innerHTML = `<span>${esc(t.total)}</span><span>${money(total())}${hasMarket() ? ` <small>${esc(t.plus)}</small>` : ""}</span>`;
    $("qoHint").textContent = t.hint;
    $("qoTableL").firstChild.textContent = t.table;
    $("qoTable").placeholder = t.tablePh;
    $("qoNoteL").firstChild.textContent = t.note;
    $("qoNote").placeholder = t.notePh;
    $("qoShow").textContent = t.show;
    $("qoSend").hidden = !CFG.zalo;
    $("qoSend").textContent = t.send;
    $("qoClear").textContent = t.clear;
    $("qoPrevS").textContent = t.preview;
    $("qoPrev").textContent = orderText();
    $("qoStaffX").textContent = t.close;
  }
  function openSheet() {
    $("qoToast").classList.remove("on");
    $("qoTable").value = table;
    $("qoNote").value = note;
    $("qoSheet").hidden = false;
    document.body.style.overflow = "hidden";
    renderSheet();
  }
  function closeSheet() { $("qoSheet").hidden = true; document.body.style.overflow = ""; }

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch {}
    try {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch { return false; }
  }

  function mount() {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    const root = document.createElement("div");
    root.className = "qo-root";
    root.innerHTML = `
      <div class="qo-bar" id="qoBar" hidden><button type="button" id="qoOpen"><span class="qo-n" id="qoN"></span><span class="qo-sum" id="qoSum"></span><b id="qoCta"></b></button></div>
      <div class="qo-sheet" id="qoSheet" hidden>
        <div class="qo-bg" data-close></div>
        <div class="qo-panel" role="dialog" aria-modal="true" aria-labelledby="qoTitle">
          <div class="qo-head"><h3 id="qoTitle"></h3><button type="button" class="qo-x" data-close aria-label="close">×</button></div>
          <ul class="qo-lines" id="qoLines"></ul>
          <div class="qo-total" id="qoTotal"></div>
          <p class="qo-hint" id="qoHint"></p>
          <div class="qo-fields">
            <label id="qoTableL">.<input id="qoTable" maxlength="12" autocomplete="off"></label>
            <label id="qoNoteL">.<input id="qoNote" maxlength="200" autocomplete="off"></label>
          </div>
          <div class="qo-acts">
            <button type="button" class="qo-main" id="qoShow"></button>
            <button type="button" class="qo-zalo" id="qoSend" hidden></button>
            <button type="button" class="qo-ghost" id="qoClear"></button>
          </div>
          <details class="qo-prev"><summary id="qoPrevS"></summary><pre id="qoPrev"></pre></details>
        </div>
      </div>
      <div class="qo-staff" id="qoStaff" hidden role="dialog" aria-modal="true"><div class="qo-staff-in"><div id="qoStaffBody"></div><button type="button" id="qoStaffX"></button></div></div>
      <div class="qo-toast" id="qoToast" role="status" aria-live="polite"></div>`;
    document.body.appendChild(root);

    document.addEventListener("click", (e) => {
      const b = e.target.closest(".qo-add button");
      if (!b) return;
      cart.set(b.dataset.k, (cart.get(b.dataset.k) || 0) + 1);
      update();
      toast(`${T[langOf()].added} · ${lineName(b.dataset.k, langOf())}`);
    });
    $("qoOpen").addEventListener("click", openSheet);
    $("qoSheet").addEventListener("click", (e) => {
      const el = e.target;
      if (el.closest("[data-close]")) return closeSheet();
      const inc = el.closest("[data-inc]")?.dataset.inc, dec = el.closest("[data-dec]")?.dataset.dec;
      if (inc) { cart.set(inc, cart.get(inc) + 1); update(); }
      if (dec) { const q = cart.get(dec) - 1; q > 0 ? cart.set(dec, q) : cart.delete(dec); update(); }
    });
    $("qoSheet").addEventListener("input", () => {
      table = $("qoTable").value.trim();
      note = $("qoNote").value;
      $("qoPrev").textContent = orderText();
      save();
    });
    $("qoClear").addEventListener("click", () => { cart.clear(); note = ""; update(); });
    $("qoShow").addEventListener("click", () => {
      $("qoToast").classList.remove("on");
      $("qoStaffBody").innerHTML = staffHtml();
      $("qoStaff").hidden = false;
      $("qoStaff").scrollTop = 0;
    });
    $("qoStaffX").addEventListener("click", () => { $("qoStaff").hidden = true; });
    $("qoSend").addEventListener("click", async () => {
      const t = T[langOf()];
      if (await copy(orderText())) {
        toast(t.copied);
        setTimeout(() => { location.href = "https://zalo.me/" + String(CFG.zalo).replace(/\D/g, ""); }, 900);
      } else {
        $("qoPrev").closest("details").open = true;
        toast(t.copyFail);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!$("qoStaff").hidden) $("qoStaff").hidden = true;
      else if (!$("qoSheet").hidden) closeSheet();
    });

    decorate();
    update();
    new MutationObserver(decorate).observe($("menu"), { childList: true });
    new MutationObserver(() => { paintButtons(); update(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
