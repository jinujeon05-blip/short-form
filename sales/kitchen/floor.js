// 주방 화면 '배치도' 탭 (2026-11-16): 가게 테이블 배치 위에 주문 상태를 색으로 보여 주고,
// '배치 편집'에서 테이블·장식을 끌어 옮겨 저장한다(서버 저장 → 모든 주방 기기가 같은 배치를 봄).
// index.html 이 QKFloor.init(ctx) 로 부른다. 배치 좌표는 가로 1000 단위 기준(화면 폭에 맞춰 늘이고 줄임).
(function () {
  const W = 1000, H0 = 700, SNAP = 10;
  const TX = {
    vi: {
      list: "Danh sách", floor: "Sơ đồ bàn", edit: "✎ Sửa sơ đồ", save: "Lưu", cancel: "Hủy", addTable: "+ Bàn", addDecor: "+ Đồ vật…",
      addZone: "+ Khu", renZone: "Đổi tên khu", delZone: "Xóa khu", zoneQ: "Tên khu (VD: Tầng 1, Tầng 2, Sân ngoài)", delZoneQ: "Xóa khu này và mọi thứ trong đó?", lastZone: "Phải còn ít nhất 1 khu",
      zone0: "Sảnh", name: "Số bàn", nameH: "Giống số trên mã QR của bàn", dname: "Tên", shape: "Hình", round: "Tròn", square: "Vuông", rect: "Dài", seats: "Ghế", size: "Cỡ", rot: "↻ Xoay", flip: "⇋ Lật", copy: "⧉ Nhân bản", del: "🗑 Xóa",
      kitchen: "Bếp", counter: "Quầy", wc: "WC", door: "Lối vào", stairs: "Cầu thang", wall: "Vách", plant: "Cây",
      sEmpty: "Bàn trống", sNew: "Đơn mới", sCook: "Đang làm", sDone: "Đã ra món (đang ăn)", more: "khác", extra: "Bàn chưa có trên sơ đồ",
      hint: "Kéo bàn để di chuyển. Chạm vào bàn để sửa số, hình, số ghế. Xong thì nhấn Lưu.", dirtyQ: "Bỏ các thay đổi chưa lưu?", saved: "Đã lưu sơ đồ", dup: "Số bàn bị trùng: ", saveFail: "Lưu không được – thử lại",
      clear: "🧹 Dọn bàn (khách đã về)", clearQ: "Dọn bàn này? Bàn sẽ trở lại trống.", clearQ2: "Bàn này còn {n} đơn chưa xong. Vẫn dọn bàn?", cleared: "Đã dọn bàn", noOrder: "Chưa có đơn", since: "Từ", close: "Đóng", total: "Tổng",
    },
    ko: {
      list: "목록", floor: "배치도", edit: "✎ 배치 편집", save: "저장", cancel: "취소", addTable: "+ 테이블", addDecor: "+ 장식…",
      addZone: "+ 구역", renZone: "구역 이름", delZone: "구역 삭제", zoneQ: "구역 이름 (예: 1층, 2층, 야외)", delZoneQ: "이 구역과 안의 테이블·장식을 모두 지울까요?", lastZone: "구역은 1개 이상 있어야 해요",
      zone0: "홀", name: "테이블 번호", nameH: "테이블 QR 번호와 같아야 주문이 이 자리에 떠요", dname: "이름", shape: "모양", round: "둥근", square: "네모", rect: "긴 네모", seats: "의자", size: "크기", rot: "↻ 돌리기", flip: "⇋ 뒤집기", copy: "⧉ 복사", del: "🗑 삭제",
      kitchen: "주방", counter: "카운터", wc: "화장실", door: "입구", stairs: "계단", wall: "벽", plant: "화분",
      sEmpty: "빈 자리", sNew: "새 주문", sCook: "만드는 중", sDone: "음식 나감(식사 중)", more: "외", extra: "배치도에 없는 테이블",
      hint: "테이블을 끌어서 옮기세요. 테이블을 누르면 번호·모양·의자 수를 바꿀 수 있어요. 다 되면 저장.", dirtyQ: "저장하지 않은 변경을 버릴까요?", saved: "배치를 저장했어요", dup: "테이블 번호가 겹쳐요: ", saveFail: "저장 실패 – 다시 시도해 주세요",
      clear: "🧹 자리 정리 (손님 나감)", clearQ: "이 테이블을 정리할까요? 빈 자리로 돌아가요.", clearQ2: "아직 안 끝난 주문이 {n}건 있어요. 그래도 정리할까요?", cleared: "자리를 정리했어요", noOrder: "주문이 없어요", since: "시작", close: "닫기", total: "합계",
    },
  };
  // 장식: 문(입구)·벽은 여기서, 나머지는 floor-icons.js(QKIcons)의 그림 아이콘
  const IC = (window.QKIcons && window.QKIcons.kinds) || {};
  const DSIZE = { door: [130, 40], wall: [240, 14] };
  for (const k in IC) DSIZE[k] = IC[k].size;
  const dname = (k, x, lang) => (IC[k] ? IC[k][lang] || IC[k].vi : x[k]);
  const norm = (v) => String(v == null ? "" : v).trim().toLowerCase().slice(0, 12);
  const rid = () => Math.random().toString(36).slice(2, 8);
  const clone = (o) => JSON.parse(JSON.stringify(o));

  const STYLE = `
  .seg { display: flex; background: var(--btn); border: 1px solid var(--line); border-radius: 12px; padding: 3px; gap: 3px; flex: none; }
  .seg button { border: 0; background: transparent; border-radius: 9px; padding: 6px 10px; font-weight: 800; font-size: 14px; color: var(--muted); white-space: nowrap; }
  .seg button.on { background: var(--ink); color: var(--bg); }
  .seg b { background: var(--new); color: #fff; border-radius: 999px; padding: 0 6px; font-size: 12px; margin-left: 4px; }
  .seg b:empty { display: none; }
  #fView { padding: 10px 14px 40px; }
  .fbar { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
  .fbar .sp { flex: 1; }
  .ztab { border: 1px solid var(--line); background: var(--btn); border-radius: 999px; padding: 7px 14px; font-weight: 800; font-size: 14px; position: relative; }
  .ztab.on { background: var(--new); border-color: var(--new); color: #fff; }
  .ztab i { position: absolute; top: -3px; right: -3px; width: 11px; height: 11px; border-radius: 50%; background: var(--new); border: 2px solid var(--bg); }
  .ztab.on i { background: #fff; }
  .fprop { position: fixed; left: 50%; transform: translateX(-50%); bottom: calc(10px + env(safe-area-inset-bottom)); width: min(980px, calc(100% - 20px)); z-index: 15; min-height: 52px; box-shadow: 0 6px 24px rgba(0,0,0,.5); margin: 0 !important; }
  #fView.ed { padding-bottom: 170px; }
  .ftool, .fprop { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; padding: 8px; background: var(--card); border: 1px solid var(--line); border-radius: 12px; }
  .ftool .sp { flex: 1; }
  .ftool button, .fprop button, .ftool select, .fprop select, .fprop input { font: inherit; font-size: 14px; color: var(--ink); background: var(--btn); border: 1px solid var(--line); border-radius: 9px; padding: 7px 10px; font-weight: 700; }
  .fprop input { width: 90px; font-weight: 800; }
  .fprop label { display: flex; align-items: center; gap: 5px; font-size: 13px; color: var(--muted); }
  .ftool .pri { background: var(--new); border-color: var(--new); color: #fff; }
  .fhint { font-size: 13px; color: var(--muted); margin: 0 2px 8px; line-height: 1.5; }
  .fwrap { overflow: auto; border-radius: 16px; background: #e9e2d6; -webkit-overflow-scrolling: touch; }
  .floor { position: relative; margin: 0 auto; background: #f4efe6; border-radius: 16px; box-shadow: inset 0 0 0 6px #5b5148; font-size: 14px; color: #2b2622; user-select: none; -webkit-user-select: none; }
  .floor.ed { background-color: #f4efe6; background-image: radial-gradient(#cfc5b5 1.2px, transparent 1.3px); background-size: 20px 20px; }
  .it { position: absolute; }
  .floor.ed .it { touch-action: none; cursor: grab; }
  .floor:not(.ed) .it.ftb { cursor: pointer; }
  .it.sel { outline: 3px dashed #1f6feb; outline-offset: 5px; border-radius: 6px; }
  .tbx { position: absolute; inset: 0; border-radius: 12px; background: #fff; border: 2px solid #c9c0b2; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 3px 4px; overflow: hidden; line-height: 1.15; box-shadow: 0 2px 0 rgba(0,0,0,.08); }
  .ftb.round .tbx { border-radius: 50%; }
  .ftb .ch { position: absolute; border-radius: 5px; background: #d9d1c4; transform: translate(-50%, -50%); }
  .fn { font-weight: 900; font-size: 1.15em; }
  .ft { font-size: .8em; opacity: .85; }
  .fm { font-size: .8em; margin-top: 2px; max-width: 100%; }
  .fm div { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .fs { font-weight: 900; font-size: .9em; margin-top: 2px; }
  .ftb.sm .fm, .ftb.xs .fm, .ftb.xs .ft { display: none; }
  .ftb.s-new .tbx { background: #ff5a36; border-color: #d7401f; color: #fff; animation: fblink 1s ease-in-out infinite alternate; }
  .ftb.s-new .ch { background: #ff9a83; }
  .ftb.s-cooking .tbx { background: #f5b100; border-color: #c98f00; color: #1d1600; }
  .ftb.s-cooking .ch { background: #f7cd5a; }
  .ftb.s-done .tbx { background: #3d7be0; border-color: #2a5fb8; color: #fff; }
  .ftb.s-done .ch { background: #8db1ee; }
  @keyframes fblink { from { box-shadow: 0 0 0 0 rgba(255,90,54,0); } to { box-shadow: 0 0 0 6px rgba(255,90,54,.45); } }
  .dk { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 4px; text-align: center; font-weight: 800; font-size: .9em; border-radius: 10px; overflow: hidden; line-height: 1.1; padding: 2px; }
  .k-door .dk { background: transparent; border: 2px dashed #8d8478; color: #5b5148; }
  .k-wall .dk { background: #5b5148; border-radius: 4px; }
  .it.ic .ic { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
  .it.ic .dk { background: none; border: 0; align-items: flex-end; padding-bottom: 4px; overflow: visible; }
  .it.ic .dk span { background: rgba(255,255,255,.9); color: #3b342e; border-radius: 6px; padding: 1px 6px; font-size: .85em; white-space: nowrap; box-shadow: 0 1px 2px rgba(0,0,0,.15); }
  .fx { position: absolute; top: -12px; right: -12px; width: 28px; height: 28px; border-radius: 50%; background: #e5484d; color: #fff; border: 2px solid #fff; font-weight: 900; font-size: 15px; line-height: 22px; text-align: center; padding: 0; z-index: 2; }
  .flegend { display: flex; flex-wrap: wrap; gap: 6px 14px; margin: 10px 2px 0; font-size: 13px; color: var(--muted); }
  .flegend span { display: inline-flex; align-items: center; gap: 6px; }
  .flegend i { width: 14px; height: 14px; border-radius: 4px; display: inline-block; }
  .fextra { margin-top: 14px; }
  .fextra h4 { margin: 0 0 8px; font-size: 14px; color: var(--muted); }
  .fextra .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .fextra .it { position: relative; width: 120px; height: 84px; }
  #vTable .sum { color: var(--muted); font-size: 14px; margin: -6px 0 12px; }
  #vTable .o { margin-bottom: 10px; }
  #vTable .tacts { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
  #vTable .tacts .btn { flex: 1; }
  #vTable .clr { background: var(--done); border-color: var(--done); color: #08130a; }
  `;

  window.QKFloor = { init(ctx) {
    const { $, esc } = ctx;
    const tx = () => TX[ctx.lang()] || TX.vi;
    const st = document.createElement("style"); st.textContent = STYLE; document.head.appendChild(st);

    let layout = null, layoutTs = 0, wantTs = 0, loading = false;
    let draft = null, dirty = false, sel = "", openTable = null;
    let zone = ctx.get("zone", "");
    const clears = new Map();

    function defLayout() {
      const z = { id: "z1", name: tx().zone0 }, items = [];
      for (let i = 0; i < 10; i++) items.push({ id: "t" + (i + 1), k: "table", z: "z1", x: 60 + (i % 5) * 180, y: 50 + Math.floor(i / 5) * 170, w: 120, h: 100, shape: "square", seats: 4, name: String(i + 1) });
      items.push({ id: "d1", k: "kitchen", z: "z1", x: 60, y: 420, w: 260, h: 150, name: "" });
      items.push({ id: "d2", k: "counter", z: "z1", x: 400, y: 470, w: 200, h: 70, name: "" });
      items.push({ id: "d3", k: "wc", z: "z1", x: 820, y: 420, w: 120, h: 100, name: "" });
      items.push({ id: "d4", k: "plant", z: "z1", x: 680, y: 480, w: 56, h: 56, name: "" });
      items.push({ id: "d5", k: "door", z: "z1", x: 800, y: 640, w: 140, h: 40, name: "" });
      return { v: 1, zones: [z], items };
    }
    const cur = () => draft || layout || defLayout();
    const zoneOf = (L) => (L.zones.some((z) => z.id === zone) ? zone : L.zones[0].id);

    // ── 테이블 상태(주문에서 계산) ──
    function active(key) {
      const c = clears.get(key) || 0, out = [];
      for (const [id, o] of ctx.orders) if (o.status !== "cancel" && norm(o.data.table) === key && o.data.at > c) out.push([id, o]);
      return out.sort((a, b) => a[1].data.at - b[1].data.at);
    }
    function stateOf(list) {
      if (!list.length) return "empty";
      if (list.some(([, o]) => o.status === "new")) return "new";
      if (list.some(([, o]) => o.status === "cooking")) return "cooking";
      return "done";
    }
    function summary(list) {
      const items = new Map(); let total = 0, market = false, cur = "₫";
      for (const [, o] of list) { total += o.data.total || 0; market = market || o.data.market; cur = o.data.currency || cur; for (const it of o.data.items) items.set(it.name, (items.get(it.name) || 0) + it.q); }
      return { items: [...items.entries()], total, market, cur, first: list.length ? list[0][1].data.at : 0 };
    }

    // ── 그리기 ──
    function chairs(it, pw, ph, s) {
      const n = it.seats || 0; if (!n) return "";
      const cw = Math.max(10, 26 * s), chh = Math.max(7, 12 * s), gap = Math.max(6, 11 * s), out = [];
      const put = (x, y, rot, horiz) => out.push(`<i class="ch" style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${(horiz ? cw : chh).toFixed(1)}px;height:${(horiz ? chh : cw).toFixed(1)}px;transform:translate(-50%,-50%) rotate(${rot}deg)"></i>`);
      if (it.shape === "round") {
        for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 - Math.PI / 2; put(pw / 2 + Math.cos(a) * (pw / 2 + gap), ph / 2 + Math.sin(a) * (ph / 2 + gap), (a * 180) / Math.PI + 90, true); }
      } else {
        const sides = it.shape === "rect" || pw / ph > 1.6 || ph / pw > 1.6 ? (pw >= ph ? ["t", "b"] : ["l", "r"]) : ["t", "r", "b", "l"];
        const cnt = Object.fromEntries(sides.map((k) => [k, 0]));
        for (let i = 0; i < n; i++) cnt[sides[i % sides.length]]++;
        for (const k of sides) for (let i = 0; i < cnt[k]; i++) {
          const f = (i + 1) / (cnt[k] + 1);
          if (k === "t") put(pw * f, -gap, 0, true); else if (k === "b") put(pw * f, ph + gap, 0, true);
          else if (k === "l") put(-gap, ph * f, 0, false); else put(pw + gap, ph * f, 0, false);
        }
      }
      return out.join("");
    }
    function itemHtml(it, s, edit, extra) {
      const pw = it.w * s, ph = it.h * s, pos = extra ? "" : `left:${(it.x * s).toFixed(1)}px;top:${(it.y * s).toFixed(1)}px;width:${pw.toFixed(1)}px;height:${ph.toFixed(1)}px`;
      const x = tx(), isSel = edit && it.id === sel;
      const fx = isSel ? `<button class="fx" data-fdel="${it.id}">✕</button>` : "";
      if (it.k !== "table") {
        const ic = IC[it.k];
        if (ic) {
          const nm = it.name || (ic.label ? dname(it.k, x, ctx.lang()) : "");
          return `<div class="it ic k-${it.k}${isSel ? " sel" : ""}" data-fid="${it.id}" style="${pos}">${QKIcons.svg(it.k, it.w, it.h, it.f)}<div class="dk">${nm ? `<span>${esc(nm)}</span>` : ""}</div>${fx}</div>`;
        }
        const label = it.k === "wall" ? "" : `🚪 ${esc(it.name || x[it.k])}`;
        return `<div class="it k-${it.k}${isSel ? " sel" : ""}" data-fid="${it.id}" style="${pos}"><div class="dk">${label}</div>${fx}</div>`;
      }
      const key = norm(it.name), list = edit ? [] : active(key), state = stateOf(list), sm = summary(list);
      const size = ph < 50 || pw < 60 ? " xs" : ph < 68 || pw < 76 ? " sm" : "";
      const nl = ph >= 112 ? 2 : 1; // 작은 테이블은 메뉴 1줄 + "외 N"
      let body = `<div class="fn">${esc(it.name)}</div>`;
      if (state !== "empty") {
        const lines = sm.items.slice(0, nl).map(([n, q]) => `<div>${q}× ${esc(n)}</div>`).join("") + (sm.items.length > nl ? `<div>${x.more} ${sm.items.length - nl}</div>` : "");
        body += `<div class="ft">${esc(ctx.ago(sm.first))}</div><div class="fm">${lines}</div><div class="fs">${ctx.money(sm.total, sm.cur)}${sm.market ? "+" : ""}</div>`;
      }
      const pw2 = extra ? 120 : pw, ph2 = extra ? 84 : ph;
      return `<div class="it ftb ${it.shape} s-${state}${size}${isSel ? " sel" : ""}" data-fid="${esc(it.id)}" data-ftable="${esc(key)}" style="${pos}">${chairs(it, pw2, ph2, extra ? 0.8 : s)}<div class="tbx">${body}</div>${fx}</div>`;
    }

    function decorOptions(x) {
      const lg = ctx.lang(), G = (window.QKIcons && QKIcons.groups) || [];
      return G.map((g) => `<optgroup label="${esc(g[lg] || g.vi)}">${Object.keys(IC).filter((k) => IC[k].g === g.id).map((k) => `<option value="${k}">${esc(dname(k, x, lg))}</option>`).join("")}${g.id === "d" ? `<option value="door">${esc(x.door)}</option><option value="wall">${esc(x.wall)}</option>` : ""}</optgroup>`).join("");
    }
    let scale = 1;
    function render() {
      if ($("fView").hidden && $("vTable").hidden) return;
      const L = cur(), edit = !!draft, x = tx();
      zone = zoneOf(L);
      // 구역 탭(다른 구역에 새 주문이 있으면 빨간 점)
      const hot = new Set();
      if (!edit) for (const it of L.items) if (it.k === "table" && stateOf(active(norm(it.name))) === "new") hot.add(it.z);
      $("fZones").innerHTML = L.zones.map((z) => `<button class="ztab${z.id === zone ? " on" : ""}" data-fzone="${esc(z.id)}">${esc(z.name || "—")}${hot.has(z.id) && z.id !== zone ? "<i></i>" : ""}</button>`).join("");
      $("fEdit").hidden = edit; $("fEdit").textContent = x.edit;
      $("fTool").hidden = !edit; $("fHint").hidden = true;
      if (edit) {
        $("fTool").innerHTML = `<button data-fact="addTable">${x.addTable}</button><select data-fact="addDecor"><option value="">${x.addDecor}</option>${decorOptions(x)}</select>`
          + `<button data-fact="addZone">${x.addZone}</button><button data-fact="renZone">${x.renZone}</button><button data-fact="delZone">${x.delZone}</button><span class="sp"></span>`
          + `<button data-fact="cancel">${x.cancel}</button><button class="pri" data-fact="save">${x.save}</button>`;
      }
      // 선택한 것 설정 줄
      const it = edit && L.items.find((i) => i.id === sel);
      $("fProp").hidden = !edit; // 편집 중엔 늘 자리를 차지(누를 때 배치도가 밀리지 않게)
      if (edit && !it) $("fProp").innerHTML = `<span class="fhint" style="margin:0">${esc(x.hint)}</span>`;
      if (it) {
        const sz = `<label>${x.size} <button data-fact="smaller">−</button><button data-fact="bigger">+</button></label><button data-fact="rot">${x.rot}</button>${it.k === "swing" ? `<button data-fact="flip">${x.flip}</button>` : ""}`;
        $("fProp").innerHTML = it.k === "table"
          ? `<label title="${esc(x.nameH)}">${x.name} <input data-fprop="name" maxlength="12" value="${esc(it.name)}"></label>`
            + `<label>${x.shape} <select data-fprop="shape">${["square", "round", "rect"].map((k) => `<option value="${k}"${it.shape === k ? " selected" : ""}>${x[k]}</option>`).join("")}</select></label>`
            + `<label>${x.seats} <select data-fprop="seats">${Array.from({ length: 13 }, (_, n) => `<option${it.seats === n ? " selected" : ""}>${n}</option>`).join("")}</select></label>${sz}<button data-fact="copy">${x.copy}</button><button data-fact="del">${x.del}</button>`
          : `${it.k === "wall" ? "" : `<label>${x.dname} <input data-fprop="name" maxlength="12" placeholder="${esc(dname(it.k, x, ctx.lang()))}" value="${esc(it.name)}"></label>`}${sz}<button data-fact="del">${x.del}</button>`;
      }
      // 바닥
      const items = L.items.filter((i) => i.z === zone);
      const hU = Math.max(H0, ...items.map((i) => i.y + i.h + 40));
      const wrapW = $("fWrap").clientWidth || 360;
      scale = Math.max(0.62, Math.min(1.35, (wrapW - 4) / W));
      const fl = $("fFloor");
      fl.className = "floor" + (edit ? " ed" : "");
      $("fView").classList.toggle("ed", edit);
      fl.style.width = W * scale + "px"; fl.style.height = hU * scale + "px";
      fl.style.fontSize = Math.max(11, Math.round(15 * Math.min(scale, 1.1))) + "px";
      fl.innerHTML = items.map((i) => itemHtml(i, scale, edit)).join("");
      // 범례
      $("fLegend").innerHTML = [["#fff;border:2px solid #c9c0b2", x.sEmpty], ["#ff5a36", x.sNew], ["#f5b100", x.sCook], ["#3d7be0", x.sDone]].map(([c, n]) => `<span><i style="background:${c}"></i>${esc(n)}</span>`).join("");
      // 배치도에 없는 테이블(주문은 있는데 배치도 번호와 안 맞음)
      const known = new Set(L.items.filter((i) => i.k === "table").map((i) => norm(i.name))), extra = new Set();
      if (!edit) for (const [, o] of ctx.orders) { const k = norm(o.data.table); if (!known.has(k) && active(k).length) extra.add(k); }
      $("fExtra").innerHTML = extra.size ? `<h4>${esc(x.extra)}</h4><div class="chips">${[...extra].map((k) => itemHtml({ id: "x-" + k, k: "table", name: k, shape: "square", seats: 0, w: 120, h: 84 }, 1, false, true)).join("")}</div>` : "";
      if (openTable != null) renderTable();
    }

    // ── 테이블 누르면: 주문 카드 + 자리 정리 ──
    function renderTable() {
      const key = openTable, x = tx(), list = active(key), sm = summary(list);
      $("tbTitle").textContent = `${ctx.t().table} ${key.toUpperCase()}`;
      $("tbSum").textContent = list.length ? `${x.since} ${new Date(sm.first).toLocaleTimeString(ctx.lang() === "ko" ? "ko-KR" : "vi-VN", { hour: "2-digit", minute: "2-digit" })} · ${x.total} ${ctx.money(sm.total, sm.cur)}${sm.market ? " + " + ctx.t().market : ""}` : x.noOrder;
      $("tbList").innerHTML = list.map(([id, o]) => ctx.card(id, o)).join("");
      $("tbClear").textContent = x.clear; $("tbClear").hidden = !list.length; $("tbClose").textContent = x.close;
    }
    function openSheet(key) { openTable = key; $("vTable").hidden = false; renderTable(); }
    function closeSheet() { openTable = null; $("vTable").hidden = true; }
    async function clearTable() {
      const key = openTable, list = active(key), x = tx();
      const open = list.filter(([, o]) => o.status === "new" || o.status === "cooking").length;
      if (!confirm(open ? x.clearQ2.replace("{n}", open) : x.clearQ)) return;
      try { const r = await ctx.call("clear", { table: key }); clears.set(key, r.at || Date.now()); closeSheet(); render(); ctx.toast(x.cleared); }
      catch (e) { if (e.message !== "auth") ctx.toast(ctx.t().bad); }
    }

    // ── 배치 불러오기 ──
    async function loadLayout() {
      if (loading || draft) return;
      loading = true;
      try { const j = await ctx.call("layout"); layout = j.layout || null; layoutTs = j.layoutTs || 0; render(); } catch {}
      loading = false;
    }
    function update(j) {
      if (Array.isArray(j.clears)) for (const c of j.clears) { const k = norm(c.table); if ((clears.get(k) || 0) < c.at) clears.set(k, c.at); }
      wantTs = j.layoutTs || 0;
      if (wantTs !== layoutTs) loadLayout(); else render();
    }

    // ── 편집 ──
    function startEdit() { draft = clone(cur()); dirty = false; sel = ""; render(); }
    function endEdit() { draft = null; sel = ""; dirty = false; render(); if (wantTs !== layoutTs) loadLayout(); }
    const change = () => { dirty = true; render(); };
    function freeSpot(w, h) {
      const items = draft.items.filter((i) => i.z === zone);
      for (let y = 40; y < 1900; y += 40) for (let x = 40; x + w <= W - 20; x += 40)
        if (!items.some((i) => x < i.x + i.w + 30 && x + w + 30 > i.x && y < i.y + i.h + 30 && y + h + 30 > i.y)) return { x, y };
      return { x: 40, y: 40 };
    }
    function act(a, el) {
      const x = tx(), it = draft && draft.items.find((i) => i.id === sel);
      if (a === "addTable") {
        const nums = draft.items.filter((i) => i.k === "table").map((i) => parseInt(i.name, 10)).filter((n) => n > 0);
        const p = freeSpot(120, 100), n = { id: "t" + rid(), k: "table", z: zone, ...p, w: 120, h: 100, shape: "square", seats: 4, name: String((nums.length ? Math.max(...nums) : 0) + 1) };
        draft.items.push(n); sel = n.id; return change();
      }
      if (a === "addDecor") {
        const k = el.value; el.value = ""; if (!k) return;
        if (!DSIZE[k]) return;
        const [w, h] = DSIZE[k], p = freeSpot(w, h), n = { id: "d" + rid(), k, z: zone, ...p, w, h, name: "" };
        draft.items.push(n); sel = n.id; return change();
      }
      if (a === "addZone" || a === "renZone") {
        const z = draft.zones.find((q) => q.id === zone);
        const name = prompt(x.zoneQ, a === "renZone" ? z.name : ""); if (name == null || !name.trim()) return;
        if (a === "renZone") z.name = name.trim().slice(0, 20);
        else { if (draft.zones.length >= 8) return; const id = "z" + rid(); draft.zones.push({ id, name: name.trim().slice(0, 20) }); zone = id; ctx.set("zone", id); }
        return change();
      }
      if (a === "delZone") {
        if (draft.zones.length < 2) return ctx.toast(x.lastZone);
        if (!confirm(x.delZoneQ)) return;
        draft.zones = draft.zones.filter((q) => q.id !== zone); draft.items = draft.items.filter((i) => i.z !== zone); zone = draft.zones[0].id; sel = ""; return change();
      }
      if (a === "cancel") { if (dirty && !confirm(x.dirtyQ)) return; return endEdit(); }
      if (a === "save") return save();
      if (!it) return;
      if (a === "del") { draft.items = draft.items.filter((i) => i !== it); sel = ""; return change(); }
      if (a === "copy") { const p = freeSpot(it.w, it.h), nums = draft.items.filter((i) => i.k === "table").map((i) => parseInt(i.name, 10)).filter((n) => n > 0); const n = { ...it, id: "t" + rid(), ...p, name: String((nums.length ? Math.max(...nums) : 0) + 1) }; draft.items.push(n); sel = n.id; return change(); }
      // 여닫이 문: 정사각형이라 가로·세로를 바꿔도 그대로 → 그림을 90도씩 돌린다(f 아래 두 자리), 뒤집기는 f 의 4
      if (a === "rot" && it.k === "swing") { const f = it.f || 0; it.f = (f & 4) | ((f + 1) & 3); return change(); }
      if (a === "flip") { it.f = (it.f || 0) ^ 4; return change(); }
      if (a === "rot") { [it.w, it.h] = [it.h, it.w]; it.x = Math.min(it.x, W - it.w); it.y = Math.min(it.y, 2000 - it.h); return change(); }
      if (a === "bigger" || a === "smaller") {
        // 긴 물건(칸막이·벽·미닫이 문 등, 긴 변이 짧은 변의 3배 이상)은 길이만 바꾸고 두께는 그대로.
        // 줄일 때 최솟값 때문에 오히려 커지지 않게, 최솟값은 지금 크기보다 크지 않게(2026-11-16 진미 유리 칸막이 건)
        const f = a === "bigger" ? 1.15 : 1 / 1.15, mx = it.k === "wall" ? 1000 : 600;
        const sn = (v) => Math.max(Math.min(40, v), Math.min(mx, Math.round((v * f) / SNAP) * SNAP));
        const long = it.k !== "table" && Math.max(it.w, it.h) >= 3 * Math.min(it.w, it.h);
        if (long) { if (it.w >= it.h) it.w = sn(it.w); else it.h = sn(it.h); }
        else { it.w = sn(it.w); it.h = sn(it.h); }
        it.x = Math.min(it.x, W - it.w); return change();
      }
    }
    async function save() {
      const x = tx(), seen = new Map(), dup = new Set();
      for (const i of draft.items) if (i.k === "table") { const k = norm(i.name); if (!k) { sel = i.id; render(); return ctx.toast(x.name + "?"); } if (seen.has(k)) dup.add(i.name); seen.set(k, 1); }
      if (dup.size) return ctx.toast(x.dup + [...dup].join(", "));
      try {
        const j = await ctx.call("layout", { layout: draft });
        layout = j.layout; layoutTs = wantTs = j.layoutTs; draft = null; sel = ""; dirty = false; render(); ctx.toast(x.saved);
      } catch (e) { if (e.message !== "auth") ctx.toast(x.saveFail); }
    }

    // ── 끌어 옮기기(마우스·터치 같이: pointer 이벤트) ──
    let drag = null;
    $("fFloor").addEventListener("pointerdown", (e) => {
      if (!draft || e.target.closest(".fx")) return;
      const el = e.target.closest("[data-fid]");
      if (!el) { if (sel) { sel = ""; render(); } return; }
      const it = draft.items.find((i) => i.id === el.dataset.fid); if (!it) return;
      // 누르는 순간 다시 그리면 손가락 아래 테이블이 새로 그려져 끌기가 끊긴다 → 표시만 바꾸고, 손을 뗀 뒤 다시 그린다
      const picked = sel !== it.id;
      if (picked) { sel = it.id; $("fFloor").querySelectorAll(".it.sel").forEach((n) => n.classList.remove("sel")); el.classList.add("sel"); }
      drag = { it, node: el, sx: e.clientX, sy: e.clientY, ox: it.x, oy: it.y, moved: false, picked, pid: e.pointerId };
      try { node.setPointerCapture(e.pointerId); } catch {}
      e.preventDefault();
    });
    window.addEventListener("pointermove", (e) => {
      if (!drag || e.pointerId !== drag.pid) return;
      const dx = (e.clientX - drag.sx) / scale, dy = (e.clientY - drag.sy) / scale;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
      const it = drag.it;
      it.x = Math.max(0, Math.min(W - it.w, Math.round((drag.ox + dx) / SNAP) * SNAP));
      it.y = Math.max(0, Math.min(2000 - it.h, Math.round((drag.oy + dy) / SNAP) * SNAP));
      drag.node.style.left = it.x * scale + "px"; drag.node.style.top = it.y * scale + "px";
    });
    const endDrag = (e) => { if (!drag || e.pointerId !== drag.pid) return; const { moved, picked } = drag; drag = null; if (moved) change(); else if (picked) render(); };
    window.addEventListener("pointerup", endDrag); window.addEventListener("pointercancel", endDrag);

    document.addEventListener("click", (e) => {
      const z = e.target.closest("[data-fzone]"); if (z) { zone = z.dataset.fzone; ctx.set("zone", zone); sel = ""; return render(); }
      const d = e.target.closest("[data-fdel]"); if (d && draft) { sel = d.dataset.fdel; return act("del"); }
      const a = e.target.closest("[data-fact]"); if (a && a.tagName !== "SELECT") return act(a.dataset.fact, a);
      if (!draft) { const tb = e.target.closest("[data-ftable]"); if (tb && (tb.closest("#fFloor") || tb.closest("#fExtra"))) return openSheet(tb.dataset.ftable); }
    });
    document.addEventListener("change", (e) => {
      const a = e.target.closest("select[data-fact]"); if (a) return act(a.dataset.fact, a);
      const p = e.target.closest("[data-fprop]"); if (!p || !draft) return;
      const it = draft.items.find((i) => i.id === sel); if (!it) return;
      const k = p.dataset.fprop, v = p.value;
      if (k === "name") it.name = v.trim().slice(0, 12);
      else if (k === "seats") it.seats = Number(v) || 0;
      else if (k === "shape") { it.shape = v; if (v === "round") { const m = Math.max(it.w, it.h); it.w = it.h = Math.min(m, 200); } else if (v === "rect" && it.w < it.h * 1.6) it.w = Math.min(W, Math.round((it.h * 1.8) / SNAP) * SNAP); }
      change();
    });
    $("fEdit").onclick = startEdit;
    $("tbClear").onclick = clearTable;
    $("tbClose").onclick = closeSheet;
    $("vTable").addEventListener("click", (e) => { if (e.target === $("vTable")) closeSheet(); });
    window.addEventListener("resize", () => { clearTimeout(render.t); render.t = setTimeout(render, 150); });
    window.addEventListener("beforeunload", (e) => { if (draft && dirty) { e.preventDefault(); e.returnValue = ""; } });

    return { render, update, tabText: () => [tx().list, tx().floor], editing: () => !!draft, close: closeSheet, _state: () => ({ layout, layoutTs, draft, clears: [...clears] }) };
  } };
})();
