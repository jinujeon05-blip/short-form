// 장바구니 · 주문서 — 메뉴마다 "담기" 버튼, 아래쪽 장바구니 막대, 주문서(직원에게 보여주기 / Zalo로 보내기).
// 원본은 restaurants/_shared/ 에만 두고, sync-order.sh 로 각 가게 폴더에 복사한다.
// 가게 설정은 menu.js 의 window.ORDER (없으면 기본값):
//   staff: 주문서 언어(직원이 읽는 언어, 기본 "vi") · currency: "₫" | "원" · zalo: 주문 받을 Zalo 번호(null이면 버튼 숨김)
//   labels: 문구 바꾸기(선택) — 예: 호텔은 { table: { ko: "객실 번호", vi: "Số phòng", … }, tablePh: { … } }
// 메뉴 화면은 각 가게 index.html 이 그린다. 이 파일은 #menu > section(MENU 순서) > ul > li(items 순서)에 버튼만 붙인다.
// 테이블 번호: QR 주소에 ?t=5 를 붙이면 주문서에 자동으로 들어간다.
// 품절(2026-11-10): 점주 화면에서 품절(soldOut)로 바꾼 메뉴는 담기 버튼을 붙이지 않고(품절 배지는 override가 붙임), 장바구니에 남아 있던 것은 뺀다.
// 주방으로 보내기(2026-11-10): admin '주문·주방 기기' 탭에서 그 가게를 켠 경우에만 버튼이 보인다(기본 꺼짐).
//   주문서를 열 때 qrmenuasia.com/api/order?shop= 로 켜짐 여부를 한 번 묻고, 누르면 주방 화면(qrmenuasia.com/kitchen)으로 간다.
//   테이블 QR 열쇠: admin이 만든 테이블 주소의 &k= 를 같이 보낸다. 가게 아이디는 주소(<가게>.qrmenuasia.com)에서 읽거나 ORDER.shop.
// 직원 호출 · 우리 테이블 주문 내역(2026-11-16): 주방 주문이 켜진 가게에서만 화면 아래 [🔔 직원 호출] [🧾 주문 내역] 버튼이 보인다.
//   호출 = 물·반찬 리필·얼음·앞접시·계산서·직원 호출 → 주방 화면에 테이블 번호와 요청이 소리와 함께 뜬다.
//   주문 내역 = 같은 테이블에서 보낸 주문 전부(일행 각자 보낸 것 포함)·상태·합계. 열어 둔 동안 10초마다 새로 고침.
// 자리 표(2026-11-23 캡틴 가-1·나-1·다-1): 주방 주문·호출·내역은 테이블 QR(?t=5&k=)을 찍었을 때 서버가 주는 '자리 표'가 있어야 된다.
//   표는 1시간(주문하면 그때부터 다시 1시간) 또는 주방 [자리 정리]까지. 끝나면 주문 안 되는 기본 메뉴판으로 돌아간다(가게 밖 주문 막기).
//   QR 주소의 t·k 는 표를 받은 뒤 주소창에서 지운다. 테이블 번호를 손으로 적어 주방에 보내는 길은 없앴다.
//   내가 보낸 주문은 주방이 '접수'하기 전까지 [주문 내역]에서 수정·취소할 수 있다(그 주문을 보낸 폰만, 서버가 열쇠로 확인).
(function () {
  const MENU = window.MENU, R = window.RESTAURANT || {};
  if (!Array.isArray(MENU) || !document.getElementById("menu")) return;
  const CFG = Object.assign({ staff: "vi", currency: "₫", zalo: null, api: "https://qrmenuasia.com" }, window.ORDER || {});
  if (!CFG.shop) { const h = location.hostname.match(/^([a-z0-9]+)\.qrmenuasia\.com$|^([a-z0-9]+)-menu\.vercel\.app$/); CFG.shop = h ? h[1] || h[2] : null; }
  const KEY = "qo-cart-v1", TTL = 6 * 3600 * 1000; // 오래된 장바구니(지난 방문)는 비운다

  const T = {
    ko: { say: "이 화면을 직원에게 보여주세요", add: "담기", items: "개", view: "주문서 보기", title: "주문서", total: "합계", table: "테이블 번호", tablePh: "예: 5", note: "요청사항", notePh: "덜 맵게, 앞접시 2개 등", show: "직원에게 보여주기", send: "주문서 복사하고 Zalo 열기", copied: "주문서를 복사했어요 — Zalo에 붙여넣어 보내세요", copyFail: "복사가 안 됐어요 — 아래 내용을 직접 복사해 주세요", clear: "비우기", preview: "주문서 내용 보기", market: "시가", after: "후식", plus: "시가 메뉴 별도", hint: "최종 금액은 가게에서 확인해 드려요", close: "닫기", added: "담았어요", kitchen: "주방으로 주문 보내기", sending: "보내는 중…", sent: "주문이 주방에 들어갔어요", sentNo: "주문 번호", needTable: "테이블 번호를 먼저 적어 주세요", sendFail: "보내지 못했어요 — 이 화면을 직원에게 보여주세요", badKey: "테이블 QR을 다시 찍어 주세요 — 또는 직원에게 보여주세요", soGone: "품절된 메뉴는 장바구니에서 뺐어요" },
    en: { say: "Please show this screen to the staff", add: "Add", items: "items", view: "View order", title: "Your order", total: "Total", table: "Table no.", tablePh: "e.g. 5", note: "Requests", notePh: "Less spicy, 2 extra plates…", show: "Show to staff", send: "Copy order & open Zalo", copied: "Order copied — paste it in Zalo to send", copyFail: "Couldn't copy — please copy the text below", clear: "Clear", preview: "Show order text", market: "Market price", after: "With BBQ", plus: "+ market-price items", hint: "The shop will confirm the final amount", close: "Close", added: "Added", kitchen: "Send order to kitchen", sending: "Sending…", sent: "Your order is in the kitchen", sentNo: "Order no.", needTable: "Please enter your table number first", sendFail: "Couldn't send — please show this screen to the staff", badKey: "Please scan the table QR again — or show this to the staff", soGone: "Sold-out items were removed from your cart" },
    zh: { say: "请把此画面给服务员看", add: "加入", items: "份", view: "查看订单", title: "我的订单", total: "合计", table: "桌号", tablePh: "例：5", note: "备注", notePh: "少辣、多拿两个碟子等", show: "给服务员看", send: "复制订单并打开Zalo", copied: "订单已复制 — 粘贴到Zalo发送", copyFail: "复制失败 — 请手动复制下方内容", clear: "清空", preview: "查看订单内容", market: "时价", after: "配烤肉价", plus: "另加时价菜品", hint: "最终金额以店家确认为准", close: "关闭", added: "已加入", kitchen: "发送订单到厨房", sending: "发送中…", sent: "订单已送到厨房", sentNo: "订单号", needTable: "请先填写桌号", sendFail: "发送失败 — 请把此画面给服务员看", badKey: "请重新扫描桌上的二维码 — 或给服务员看", soGone: "已售罄的菜品已从购物车移除" },
    ja: { say: "この画面をスタッフに見せてください", add: "追加", items: "点", view: "注文を見る", title: "ご注文", total: "合計", table: "テーブル番号", tablePh: "例：5", note: "ご要望", notePh: "辛さ控えめ、取り皿2枚など", show: "スタッフに見せる", send: "注文をコピーしてZaloを開く", copied: "注文をコピーしました — Zaloに貼り付けて送信", copyFail: "コピーできませんでした — 下の内容をコピーしてください", clear: "空にする", preview: "注文内容を見る", market: "時価", after: "焼肉と一緒に", plus: "＋時価メニュー", hint: "最終金額はお店で確認します", close: "閉じる", added: "追加しました", kitchen: "厨房に注文を送る", sending: "送信中…", sent: "ご注文を厨房に送りました", sentNo: "注文番号", needTable: "先にテーブル番号を入力してください", sendFail: "送信できませんでした — この画面をスタッフに見せてください", badKey: "テーブルのQRをもう一度読み取ってください — またはスタッフに見せてください", soGone: "売り切れのメニューはカートから外しました" },
    vi: { say: "Đưa màn hình này cho nhân viên", add: "Thêm", items: "món", view: "Xem đơn", title: "Đơn gọi món", total: "Tổng", table: "Số bàn", tablePh: "VD: 5", note: "Ghi chú", notePh: "Ít cay, thêm 2 bát…", show: "Đưa nhân viên xem", send: "Sao chép đơn & mở Zalo", copied: "Đã sao chép đơn — dán vào Zalo để gửi", copyFail: "Không sao chép được — hãy chép nội dung bên dưới", clear: "Xóa đơn", preview: "Xem nội dung đơn", market: "Thời giá", after: "Giá ăn kèm thịt nướng", plus: "+ món thời giá", hint: "Quán sẽ xác nhận số tiền cuối cùng", close: "Đóng", added: "Đã thêm", kitchen: "Gửi đơn vào bếp", sending: "Đang gửi…", sent: "Đơn đã được gửi vào bếp", sentNo: "Số đơn", needTable: "Vui lòng nhập số bàn trước", sendFail: "Không gửi được — hãy đưa màn hình này cho nhân viên", badKey: "Vui lòng quét lại mã QR trên bàn — hoặc đưa nhân viên xem", soGone: "Đã bỏ món hết hàng khỏi giỏ" },
  };
  // 직원 호출 · 주문 내역 문구
  const C = {
    ko: { mine: "내 주문", edit: "수정", cancel: "취소", cancelQ: "주문 #{n}을 취소할까요?", cancelled: "주문 #{n}을 취소했어요", editing: "주문 #{n} 고치는 중 — 보내면 예전 주문은 취소돼요", editStop: "그만두기", editSend: "고친 주문 보내기", edited: "주문 #{o}을 고쳐서 다시 보냈어요", taken: "주방에서 이미 만들기 시작했어요 — 바꾸려면 직원에게 말씀해 주세요", takenHint: "만들기 시작해서 고칠 수 없어요 — 직원에게 말씀해 주세요", gone: "이미 취소된 주문이에요", qrAgain: "주문하려면 테이블 QR을 다시 찍어 주세요",
      call: "직원 호출", callT: "무엇이 필요하세요?", callSent: "직원에게 알렸어요", callFail: "알리지 못했어요 — 직원을 직접 불러 주세요", bill: "주문 내역", billT: "우리 테이블 주문 내역", billEmpty: "아직 주방에 보낸 주문이 없어요", billHint: "같은 테이블에서 보낸 주문이 모두 보여요 · 자동으로 새로 고침", stNew: "주문 들어감", stCook: "만드는 중", stDone: "나왔어요",
      req: { water: "물 부탁드립니다", refill: "반찬 리필해 주세요", ice: "얼음 좀 주세요", utensils: "앞접시·수저 주세요", bill: "계산서 부탁드립니다", staff: "직원 불러 주세요" } },
    en: { mine: "Mine", edit: "Edit", cancel: "Cancel", cancelQ: "Cancel order #{n}?", cancelled: "Order #{n} cancelled", editing: "Editing order #{n} — sending replaces the old order", editStop: "Stop editing", editSend: "Send updated order", edited: "Order #{o} was updated and re-sent", taken: "The kitchen has already started — please tell the staff to change it", takenHint: "Already being prepared — ask the staff to change it", gone: "This order was already cancelled", qrAgain: "To order, please scan the table QR again",
      call: "Call staff", callT: "What do you need?", callSent: "The staff has been notified", callFail: "Couldn't notify — please call the staff", bill: "Our orders", billT: "Our table's orders", billEmpty: "No orders sent to the kitchen yet", billHint: "Shows every order sent from this table · updates automatically", stNew: "Received", stCook: "Cooking", stDone: "Served",
      req: { water: "Water, please", refill: "Refill side dishes", ice: "Some ice, please", utensils: "Extra plates & cutlery", bill: "The bill, please", staff: "Call a staff member" } },
    zh: { mine: "我的", edit: "修改", cancel: "取消", cancelQ: "取消订单 #{n}？", cancelled: "已取消订单 #{n}", editing: "正在修改订单 #{n} — 发送后原订单将取消", editStop: "放弃修改", editSend: "发送修改后的订单", edited: "订单 #{o} 已修改并重新发送", taken: "厨房已开始制作 — 如需更改请告诉服务员", takenHint: "已在制作，无法修改 — 请告诉服务员", gone: "该订单已取消", qrAgain: "如需点餐，请重新扫描桌上的二维码",
      call: "呼叫服务员", callT: "需要什么？", callSent: "已通知服务员", callFail: "通知失败 — 请直接叫服务员", bill: "已点菜品", billT: "本桌已点菜品", billEmpty: "还没有发送到厨房的订单", billHint: "显示本桌发送的所有订单 · 自动更新", stNew: "已下单", stCook: "制作中", stDone: "已上菜",
      req: { water: "请给我水", refill: "加小菜", ice: "请给我冰块", utensils: "加碗碟餐具", bill: "买单", staff: "请服务员过来" } },
    ja: { mine: "自分の注文", edit: "変更", cancel: "取消", cancelQ: "注文 #{n} を取り消しますか？", cancelled: "注文 #{n} を取り消しました", editing: "注文 #{n} を変更中 — 送信すると前の注文は取り消されます", editStop: "やめる", editSend: "変更した注文を送る", edited: "注文 #{o} を変更して送り直しました", taken: "厨房ですでに作り始めています — 変更はスタッフにお伝えください", takenHint: "調理中のため変更できません — スタッフにお伝えください", gone: "この注文はすでに取り消されています", qrAgain: "注文するにはテーブルのQRをもう一度読み取ってください",
      call: "スタッフ呼び出し", callT: "ご用件は？", callSent: "スタッフに知らせました", callFail: "知らせられませんでした — スタッフを直接お呼びください", bill: "注文履歴", billT: "このテーブルの注文", billEmpty: "まだ厨房に送った注文はありません", billHint: "このテーブルから送った注文がすべて表示されます · 自動更新", stNew: "注文済み", stCook: "調理中", stDone: "提供済み",
      req: { water: "お水をください", refill: "おかずのおかわり", ice: "氷をください", utensils: "取り皿・カトラリーをください", bill: "お会計お願いします", staff: "スタッフを呼ぶ" } },
    vi: { mine: "Đơn của bạn", edit: "Sửa", cancel: "Hủy", cancelQ: "Hủy đơn #{n}?", cancelled: "Đã hủy đơn #{n}", editing: "Đang sửa đơn #{n} — gửi đi thì đơn cũ sẽ bị hủy", editStop: "Thôi sửa", editSend: "Gửi đơn đã sửa", edited: "Đã sửa và gửi lại đơn #{o}", taken: "Bếp đã bắt đầu làm — muốn đổi hãy báo nhân viên", takenHint: "Đang làm nên không sửa được — hãy báo nhân viên", gone: "Đơn này đã bị hủy", qrAgain: "Để gọi món, vui lòng quét lại mã QR trên bàn",
      call: "Gọi nhân viên", callT: "Bạn cần gì?", callSent: "Đã báo nhân viên", callFail: "Không báo được — hãy gọi nhân viên trực tiếp", bill: "Món đã gọi", billT: "Món bàn mình đã gọi", billEmpty: "Chưa có đơn nào gửi vào bếp", billHint: "Hiện tất cả đơn gửi từ bàn này · tự cập nhật", stNew: "Đã gửi", stCook: "Đang làm", stDone: "Đã ra món",
      req: { water: "Cho xin nước", refill: "Thêm đồ ăn kèm", ice: "Cho xin đá", utensils: "Thêm chén đĩa, đũa muỗng", bill: "Tính tiền", staff: "Gọi nhân viên" } },
  };
  const REQS = [["water", "💧"], ["refill", "🥢"], ["ice", "🧊"], ["utensils", "🍽️"], ["bill", "🧾"], ["staff", "🙋"]];
  for (const [k, byLang] of Object.entries(CFG.labels || {})) for (const [l, v] of Object.entries(byLang)) if (T[l]) T[l][k] = v;
  // 주문서 요청 버튼(2026-11-21 캡틴 가-1): 손님이 누르면 직원 화면·주방에는 직원 언어로 나간다(손님이 현지어를 몰라도 됨)
  const ASK = {
    ko: { asks: "자주 하는 요청", herb: "고수 빼 주세요", mild: "안 맵게 해 주세요", msg: "조미료(MSG) 빼 주세요", ice: "얼음은 따로 주세요", plate: "앞접시 더 주세요", togo: "포장해 주세요" },
    en: { asks: "Common requests", herb: "No cilantro, please", mild: "Not spicy, please", msg: "No MSG, please", ice: "Ice on the side, please", plate: "Extra small plates, please", togo: "To go, please" },
    zh: { asks: "常用要求", herb: "不要香菜", mild: "不要辣", msg: "不要味精", ice: "冰块另外放", plate: "多拿几个小碟", togo: "打包带走" },
    ja: { asks: "よくあるご要望", herb: "パクチー抜きで", mild: "辛くしないでください", msg: "化学調味料なしで", ice: "氷は別でください", plate: "取り皿をください", togo: "持ち帰りでお願いします" },
    vi: { asks: "Yêu cầu thường gặp", herb: "Không cho rau mùi", mild: "Không cay", msg: "Không bột ngọt", ice: "Để đá riêng", plate: "Cho thêm chén đĩa nhỏ", togo: "Gói mang về" },
  };
  const ASKS = [["herb", "🌿"], ["mild", "🌶️"], ["msg", "🧂"], ["ice", "🧊"], ["plate", "🍽️"], ["togo", "🥡"]];
  // 손님 돈으로 대략 환산(2026-11-21 캡틴 가-2): 동(₫) 가게에서 손님 언어가 ko·en·ja·zh일 때만. 환율은 고정값 —
  // 바꿀 때 FX_DATE·FX 를 같이 고치고 tools 로 11곳에 복사한다(출처 open.er-api.com, 1단위 = 몇 동). 가게에서 끄려면 ORDER.fx = false
  const FX_DATE = "2026-11-20";
  const FX = {
    ko: { per: 19.31, step: 100, f: (n) => n.toLocaleString("en-US") + "원", note: "환율 " + FX_DATE + " 기준, 대략" },
    en: { per: 25641, step: 0.1, f: (n) => "$" + (n >= 10 ? Math.round(n).toLocaleString("en-US") : n.toFixed(1)), note: "Approx. rate as of " + FX_DATE },
    ja: { per: 161.11, step: 10, f: (n) => n.toLocaleString("en-US") + "円", note: FX_DATE + " 時点の概算レート" },
    zh: { per: 3846.15, step: 1, f: (n) => n.toLocaleString("en-US") + "元", note: "约按 " + FX_DATE + " 汇率" },
  };
  const fxOf = (l) => (CFG.fx !== false && CFG.currency === "₫" && FX[l]) || null;
  const fx = (vnd, l) => { const r = fxOf(l); if (!r || !vnd) return ""; const n = Math.max(r.step, Math.round(vnd / r.per / r.step) * r.step); return r.f(r.step < 1 ? Math.round(n * 10) / 10 : n); };
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
  const soldOut = (k) => !!ITEMS.get(k).it.soldOut;
  const kept = fresh ? (saved.items || []).filter(([k, q]) => ITEMS.has(k) && q > 0) : [];
  const cart = new Map(kept.filter(([k]) => !soldOut(k)));
  const soGone = kept.length - cart.size; // 지난번에 담았는데 그사이 품절된 메뉴 수
  const qTable = new URLSearchParams(location.search).get("t") || new URLSearchParams(location.search).get("table");
  let table = (qTable || (fresh && saved.table) || "").slice(0, 12), note = (fresh && saved.note) || "";
  let asks = new Set(((fresh && saved.asks) || []).filter((k) => ASK.ko[k]));
  // 직원이 읽을 요청 = 고른 버튼(직원 언어) + 손님이 쓴 글
  const noteFor = (l) => [...ASKS.filter(([k]) => asks.has(k)).map(([k]) => ASK[l][k]), note.trim()].filter(Boolean).join(" · ");
  // 테이블 QR 열쇠(&k=)는 서버에서 '자리 표'로 바꾼다. 표 = { table, tk, exp }(1시간). 내 주문 = 수정·취소 열쇠 [{ id, no, ek }]
  const qKey = new URLSearchParams(location.search).get("k");
  let ticket = saved && saved.ticket && saved.ticket.exp > Date.now() ? saved.ticket : null;
  const staleTicket = !!(saved && saved.ticket && !ticket); // 지난번 표가 끝남 → '다시 찍어 주세요' 한 번 알림
  if (staleTicket && !qTable && table === saved.ticket.table) table = "";
  let mine = (ticket && Array.isArray(saved.mine) && saved.mine) || [];
  let editing = null, prevCart = null; // 고치는 중인 내 주문 { id, no, ek }
  let kitchenOn = null, sending = false; // null = 아직 안 물어봄
  const ordering = () => !!(kitchenOn && ticket && ticket.exp > Date.now()); // 주방 주문·호출·내역을 쓸 수 있는 상태
  const save = () => storage((s) => s.setItem(KEY, JSON.stringify({ t: Date.now(), items: [...cart], table, note, asks: [...asks], ticket, mine })));
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
    if (noteFor(l)) rows.push(`${t.note}: ${noteFor(l)}`);
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
      ${noteFor(l) ? `<div class="nt">${esc(t.note)}: ${esc(noteFor(l))}${me !== l && asks.size ? `<small>${esc(noteFor(me))}</small>` : ""}</div>` : ""}`;
  }

  const css = `
    .qo-fx { margin-top: 3px; text-align: right; font-size: 12px; font-weight: 600; color: var(--pt-muted, #888); font-variant-numeric: tabular-nums; }
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
    .qo-staff .nt small { display: block; margin-top: 6px; font-size: 13px; font-weight: 600; color: #666; }
    .qo-asks { margin: 0 0 10px; }
    .qo-asks > span { display: block; font-size: 13px; font-weight: 700; color: var(--pt-muted, #888); margin-bottom: 6px; }
    .qo-asks div { display: flex; flex-wrap: wrap; gap: 6px; }
    .qo-asks button { font: inherit; font-size: 13.5px; font-weight: 700; line-height: 1.2; letter-spacing: 0; text-transform: none; color: var(--pt-ink, #222); background: transparent; border: 1.5px solid var(--pt-line, #ddd); border-radius: 999px; padding: 7px 11px; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .qo-asks button[aria-pressed="true"] { border-color: var(--pt-accent, #e0452b); background: var(--pt-accent, #e0452b); color: #fff; }
    .qo-staff button { display: block; width: 100%; max-width: 560px; margin: 20px auto 0; font: inherit; font-size: 16px; font-weight: 800; padding: 14px; border-radius: 14px; border: 2px solid #111; background: #fff; color: #111; cursor: pointer; }
    .qo-toast { position: fixed; left: 50%; top: calc(14px + env(safe-area-inset-top)); transform: translateX(-50%); z-index: 1200; background: rgba(0,0,0,.85); color: #fff; font-size: 14px; font-weight: 700; padding: 9px 16px; border-radius: 999px; opacity: 0; transition: opacity .2s; pointer-events: none; max-width: 90vw; text-align: center; }
    .qo-toast.on { opacity: 1; }
    :lang(ko) .qo-panel, :lang(ko) .qo-add, :lang(ko) .qo-tools { word-break: keep-all; }
    body.qo-tl { padding-bottom: 64px; } body.qo-tl.qo-has { padding-bottom: 136px; }
    .qo-tools { position: fixed; left: 0; right: 0; bottom: calc(10px + env(safe-area-inset-bottom)); z-index: 899; display: flex; justify-content: center; gap: 8px; padding: 0 16px; pointer-events: none; }
    .qo-tools[hidden] { display: none; }
    body.qo-has .qo-tools { bottom: calc(74px + env(safe-area-inset-bottom)); }
    .qo-tools button { pointer-events: auto; flex: 0 1 auto; min-width: 0; font: inherit; font-size: 14px; font-weight: 800; line-height: 1.15; letter-spacing: 0; text-transform: none; color: var(--pt-ink, #222); background: var(--pt-bg, #fff); border: 1.5px solid var(--pt-line, #ddd); border-radius: 999px; padding: 10px 14px; box-shadow: 0 4px 14px rgba(0,0,0,.18); cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; -webkit-tap-highlight-color: transparent; }
    .qo-reqs { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px 0 4px; }
    .qo-reqs button { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-height: 84px; font: inherit; font-size: 14.5px; font-weight: 800; line-height: 1.25; color: var(--pt-ink, #222); background: transparent; border: 1.5px solid var(--pt-line, #ddd); border-radius: 16px; padding: 10px 8px; cursor: pointer; text-align: center; }
    .qo-reqs button i { font-style: normal; font-size: 26px; line-height: 1; }
    .qo-reqs button:disabled { opacity: .45; }
    .qo-reqs button.hot { border-color: var(--pt-accent, #e0452b); }
    .qo-tbl { display: flex; align-items: center; gap: 8px; margin: 8px 0 0; font-size: 13px; font-weight: 700; color: var(--pt-muted, #888); }
    .qo-tbl input { font: inherit; font-size: 16px; width: 90px; padding: 7px 10px; border: 1.5px solid var(--pt-line, #ddd); border-radius: 10px; background: transparent; color: var(--pt-ink, #222); }
    .qo-bill { list-style: none; margin: 10px 0 0; padding: 0; }
    .qo-bill > li { padding: 10px 0; border-bottom: 1px solid var(--pt-line, #eee); }
    .qo-bill .bh { display: flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 700; color: var(--pt-muted, #888); }
    .qo-bill .bh .s { margin-left: auto; border-radius: 999px; padding: 2px 9px; font-size: 12px; font-weight: 800; color: #fff; background: #888; white-space: nowrap; }
    .qo-bill .bh .s.new { background: #e0452b; } .qo-bill .bh .s.cooking { background: #c98a00; } .qo-bill .bh .s.done { background: #1a7f37; }
    .qo-bill .bl { display: flex; gap: 8px; padding: 4px 0 0; font-size: 14.5px; }
    .qo-bill .bl span:first-child { flex: 1; min-width: 0; font-weight: 700; }
    .qo-bill .bl span:last-child { white-space: nowrap; font-weight: 700; }
    .qo-bill li.my { background: rgba(224, 69, 43, .06); border-radius: 10px; padding-left: 8px; padding-right: 8px; }
    .qo-bill .bh .me { border-radius: 999px; padding: 1px 8px; font-size: 11.5px; font-weight: 800; color: var(--pt-accent, #e0452b); border: 1.5px solid var(--pt-accent, #e0452b); white-space: nowrap; }
    .qo-mine { display: flex; gap: 8px; margin-top: 8px; }
    .qo-mine button { flex: 1; min-width: 0; font: inherit; font-size: 14px; font-weight: 800; letter-spacing: 0; text-transform: none; padding: 9px 8px; border-radius: 12px; border: 1.5px solid var(--pt-line, #ddd); background: transparent; color: var(--pt-ink, #222); cursor: pointer; }
    .qo-mine button[data-ocancel] { color: #c0392b; border-color: #e3b1aa; }
    .qo-mh { margin: 6px 0 0; font-size: 12.5px; font-weight: 700; color: #a06a00; }
    .qo-editbar { display: flex; align-items: center; gap: 8px; margin: 10px 0 0; padding: 9px 10px; border-radius: 12px; background: #fff4d6; color: #5a4300; font-size: 13.5px; font-weight: 700; line-height: 1.35; }
    .qo-editbar[hidden] { display: none; }
    .qo-editbar span { flex: 1; min-width: 0; }
    .qo-editbar button { flex: none; font: inherit; font-size: 13px; font-weight: 800; letter-spacing: 0; text-transform: none; padding: 7px 10px; border-radius: 10px; border: 1.5px solid #c9a64a; background: #fff; color: #5a4300; cursor: pointer; }
    .qo-fields input[readonly] { opacity: .75; }
    .qo-empty { margin: 18px 0; text-align: center; font-size: 14px; color: var(--pt-muted, #888); }
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
        if (li && fxOf(l) && !li.querySelector(".qo-fx")) {
          const ps = options(it).map((o) => o.price).filter((p) => p != null);
          if (ps.length) {
            const lo = Math.min(...ps), hi = Math.max(...ps), el = document.createElement("div");
            el.className = "qo-fx";
            el.textContent = "≈ " + fx(lo, l) + (hi > lo ? " ~ " + fx(hi, l) : "");
            (li.querySelector(":scope > .info") || li).appendChild(el);
          }
        }
        if (!li || it.soldOut || li.querySelector(".qo-add")) return;
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
    $("qoHint").textContent = t.hint + (fxOf(l) && total() ? ` · ≈ ${fx(total(), l)} (${FX[l].note})` : "");
    $("qoTableL").firstChild.textContent = t.table;
    $("qoTable").placeholder = t.tablePh;
    const a = ASK[l] || ASK.en;
    $("qoAsks").innerHTML = `<span>${esc(a.asks)}</span><div>${ASKS.map(([k, ic]) =>
      `<button type="button" data-ask="${k}" aria-pressed="${asks.has(k)}">${ic} ${esc(a[k])}</button>`).join("")}</div>`;
    $("qoNoteL").firstChild.textContent = t.note;
    $("qoNote").placeholder = t.notePh;
    const on = ordering(), c = ct();
    $("qoTable").readOnly = on; // 주방 주문 = 자리 표의 테이블(바꿀 수 없음)
    if (on) $("qoTable").value = ticket.table;
    $("qoEdit").hidden = !(on && editing);
    if (on && editing) { $("qoEditT").textContent = "✏️ " + fmt(c.editing, { n: editing.no }); $("qoEditX").textContent = c.editStop; }
    $("qoKitchen").hidden = !on;
    $("qoKitchen").textContent = sending ? t.sending : on && editing ? c.editSend : t.kitchen;
    $("qoKitchen").disabled = sending;
    $("qoShow").className = on ? "qo-ghost" : "qo-main";
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
    checkKitchen();
  }
  // 이 가게가 주방 주문을 받는지 한 번만 묻는다(실패하면 버튼을 안 보여 줌 → 예전과 똑같이 동작)
  // 테이블 QR(?t=&k=)로 들어왔으면 같은 요청으로 '자리 표'를 받고, 주소창에서 t·k 를 지운다
  async function checkKitchen() {
    if (kitchenOn !== null || !CFG.shop || CFG.kitchen === false) return;
    kitchenOn = false;
    let got = null;
    try {
      const q = qTable ? `&t=${encodeURIComponent(qTable)}${qKey ? `&k=${encodeURIComponent(qKey)}` : ""}`
        : ticket ? `&tt=${encodeURIComponent(ticket.table)}&tk=${encodeURIComponent(ticket.tk)}` : ""; // 남은 표는 서버에 확인(자리 정리됐으면 끝)
      const r = await fetch(`${CFG.api}/api/order?shop=${CFG.shop}${q}`, { cache: "no-store" });
      if (r.ok) {
        const j = await r.json(); kitchenOn = !!j.on; got = j.ticket || null;
        if (kitchenOn && qTable && !got) { ticket = null; mine = []; save(); }
        if (kitchenOn && !qTable && ticket && j.ticketOk === false) { kitchenOn = true; expire(); }
      }
    } catch {}
    if (got) { setTicket(got); cleanUrl(); }
    else if (kitchenOn && (staleTicket || qTable)) toast(ct().qrAgain);
    if (!$("qoSheet").hidden) renderSheet();
    paintTools();
  }
  function cleanUrl() {
    try { const u = new URL(location.href); u.searchParams.delete("t"); u.searchParams.delete("table"); u.searchParams.delete("k"); history.replaceState(history.state, "", u.pathname + u.search + u.hash); } catch {}
  }
  let expT = null;
  function setTicket(tk) {
    if (ticket && ticket.table !== tk.table) mine = []; // 다른 테이블로 옮김
    ticket = tk; table = tk.table; save();
    clearTimeout(expT); expT = setTimeout(checkExpire, Math.min(2147483000, Math.max(1000, tk.exp - Date.now() + 500)));
  }
  // 자리 표가 끝남(1시간·자리 정리) → 주문 안 되는 기본 메뉴판으로. 장바구니는 그대로 둔다
  function expire(say = true) {
    clearTimeout(expT);
    if (ticket && table === ticket.table) table = "";
    ticket = null; mine = []; editing = null; prevCart = null; save();
    closePanel("qoCall"); closePanel("qoBillS");
    paintTools();
    if (!$("qoSheet").hidden) { $("qoTable").value = table; renderSheet(); }
    if (say && kitchenOn) toast(ct().qrAgain);
  }
  function checkExpire() { if (ticket && ticket.exp <= Date.now()) expire(); }
  // 화면으로 돌아왔을 때(가게를 나갔다 다시 폰을 켠 경우 등) 남은 표를 서버에 다시 확인. 30초에 한 번만
  let lastVerify = 0;
  async function verifyTicket() {
    if (!ordering() || Date.now() - lastVerify < 30000) return;
    lastVerify = Date.now();
    try {
      const r = await fetch(`${CFG.api}/api/order?shop=${CFG.shop}&tt=${encodeURIComponent(ticket.table)}&tk=${encodeURIComponent(ticket.tk)}`, { cache: "no-store" });
      const j = r.ok ? await r.json() : null;
      if (j && (!j.on || j.ticketOk === false)) { if (!j.on) kitchenOn = false; expire(!j.on ? false : true); }
    } catch {}
  }
  const failOf = (err, fallback) => (err === "expired" || err === "key" ? (expire(), "") : fallback);

  // ── 직원 호출 · 우리 테이블 주문 내역 (주방 주문이 켜진 가게 + 자리 표가 있을 때만) ──
  const ct = () => C[langOf()] || C.en;
  const fmt = (s, o) => s.replace(/\{(\w)\}/g, (_, k) => o[k]);
  function paintTools() {
    const on = ordering(), c = ct();
    $("qoTools").hidden = !on;
    document.body.classList.toggle("qo-tl", on);
    $("qoCallB").textContent = "🔔 " + c.call;
    $("qoBillB").textContent = "🧾 " + c.bill;
    if (!$("qoCall").hidden) renderCall();
    if (!$("qoBillS").hidden) renderBill();
  }
  function openPanel(id) { $("qoToast").classList.remove("on"); $(id).hidden = false; document.body.style.overflow = "hidden"; }
  function closePanel(id) {
    $(id).hidden = true;
    if (id === "qoBillS") clearTimeout(billTimer);
    if ($("qoSheet").hidden && $("qoCall").hidden && $("qoBillS").hidden) document.body.style.overflow = "";
  }
  const cooldown = new Map(); // 같은 요청을 연달아 누르지 않게(30초)
  function renderCall() {
    const c = ct(), t = T[langOf()];
    $("qoCallT").textContent = c.callT + (ticket ? ` · ${t.table} ${ticket.table}` : "");
    $("qoReqs").innerHTML = REQS.map(([k, icon]) => `<button type="button" data-req="${k}"${Date.now() - (cooldown.get(k) || 0) < 30000 ? " disabled" : ""}${k === "bill" ? ' class="hot"' : ""}><i>${icon}</i>${esc(c.req[k])}</button>`).join("");
  }
  async function sendCall(what) {
    const c = ct();
    if (!ordering()) return expire();
    cooldown.set(what, Date.now()); renderCall();
    setTimeout(() => { if (!$("qoCall").hidden) renderCall(); }, 30500);
    let ok = false, err = "";
    try {
      const r = await fetch(`${CFG.api}/api/order`, { method: "POST", headers: { "content-type": "text/plain" }, body: JSON.stringify({ shop: CFG.shop, kind: "call", table: ticket.table, req: what, lang: langOf(), tk: ticket.tk }) });
      ok = r.ok; if (!ok) err = ((await r.json().catch(() => ({}))).error) || "x";
    } catch { err = "net"; }
    if (ok) { closePanel("qoCall"); toast(`✅ ${c.callSent} · ${c.req[what]}`); return; }
    cooldown.delete(what);
    const msg = failOf(err, c.callFail);
    if (msg) { renderCall(); toast(msg); }
  }
  let billTimer = null, billData = null, billErr = "";
  const lineOf = (x, lang) => (x.key && ITEMS.has(x.key) ? lineName(x.key, langOf()) : lang === langOf() && x.sub ? x.sub : x.name);
  const mineOf = (id) => mine.find((x) => x.id === id);
  function renderBill() {
    const c = ct(), t = T[langOf()];
    $("qoBillT").textContent = c.billT + (ticket ? ` · ${ticket.table}` : "");
    $("qoBillHint").textContent = c.billHint;
    const d = billData;
    if (!d) { $("qoBillL").innerHTML = `<li class="qo-empty">${esc(billErr || t.sending)}</li>`; $("qoBillSum").innerHTML = ""; return; }
    const st = { new: c.stNew, cooking: c.stCook, done: c.stDone };
    const cur = d.currency || CFG.currency, m = (n) => n.toLocaleString("en-US") + cur;
    $("qoBillL").innerHTML = d.orders.length ? d.orders.map((o) => {
      const my = o.id && mineOf(o.id);
      const acts = !my ? "" : o.status === "new"
        ? `<div class="qo-mine"><button type="button" data-oedit="${esc(o.id)}">✏️ ${esc(c.edit)}</button><button type="button" data-ocancel="${esc(o.id)}">✕ ${esc(c.cancel)}</button></div>`
        : o.status === "cooking" ? `<p class="qo-mh">${esc(c.takenHint)}</p>` : "";
      return `<li${my ? ' class="my"' : ""}><div class="bh"><span>#${o.no}</span><span>${new Date(o.at).toLocaleTimeString(langOf(), { hour: "2-digit", minute: "2-digit" })}</span>${my ? `<span class="me">${esc(c.mine)}</span>` : ""}<span class="s ${o.status}">${esc(st[o.status] || "")}</span></div>
      ${o.items.map((x) => `<div class="bl"><span>${esc(lineOf(x, o.lang))} × ${x.q}</span><span>${x.price == null ? esc(t.market) : m(x.price)}</span></div>`).join("")}${acts}</li>`;
    }).join("")
      : `<li class="qo-empty">${esc(c.billEmpty)}</li>`;
    $("qoBillSum").innerHTML = d.orders.length ? `<span>${esc(t.total)}</span><span>${m(d.total)}${d.market ? ` <small>${esc(t.plus)}</small>` : ""}</span>` : "";
  }
  async function loadBill() {
    clearTimeout(billTimer);
    if ($("qoBillS").hidden) return;
    if (!ordering()) return expire();
    const fail = ct().callFail.split(" — ")[0];
    try {
      const r = await fetch(`${CFG.api}/api/order?shop=${CFG.shop}&bill=${encodeURIComponent(ticket.table)}&tk=${encodeURIComponent(ticket.tk)}`, { cache: "no-store" });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.on) { billData = j; billErr = ""; }
      else if (!failOf(j.error, "x")) return;
      else { billData = null; billErr = fail; }
    } catch { if (!billData) billErr = fail; }
    renderBill();
    if (!$("qoBillS").hidden && document.visibilityState !== "hidden") billTimer = setTimeout(loadBill, 10000);
  }
  // 내 주문 취소(접수 전만)
  async function cancelMine(id) {
    const c = ct(), my = mineOf(id);
    if (!my || !ordering() || !confirm(fmt(c.cancelQ, { n: my.no }))) return;
    let err = "";
    try {
      const r = await fetch(`${CFG.api}/api/order`, { method: "POST", headers: { "content-type": "text/plain" }, body: JSON.stringify({ shop: CFG.shop, kind: "cancel", table: ticket.table, tk: ticket.tk, id, ek: my.ek }) });
      if (!r.ok) err = ((await r.json().catch(() => ({}))).error) || "x";
    } catch { err = "net"; }
    if (!err || err === "gone") { mine = mine.filter((x) => x.id !== id); save(); toast(err ? c.gone : fmt(c.cancelled, { n: my.no })); }
    else { const msg = failOf(err, err === "taken" ? c.taken : c.callFail); if (msg) toast(msg); }
    if (!$("qoBillS").hidden) loadBill();
  }
  // 내 주문 고치기: 그 주문 내용을 장바구니에 넣고 주문서를 연다(지금 장바구니는 '그만두기'하면 돌아옴)
  function editMine(id) {
    const my = mineOf(id), o = billData && billData.orders.find((x) => x.id === id);
    if (!my || !o || !ordering()) return;
    if (!editing) prevCart = [...cart];
    cart.clear();
    for (const x of o.items) if (x.key && ITEMS.has(x.key) && !soldOut(x.key)) cart.set(x.key, (cart.get(x.key) || 0) + x.q);
    editing = { id, no: my.no, ek: my.ek };
    closePanel("qoBillS"); update(); openSheet();
  }
  function stopEdit() {
    editing = null;
    if (prevCart) { cart.clear(); prevCart.forEach(([k, q]) => cart.set(k, q)); prevCart = null; }
    update(); if (!$("qoSheet").hidden) renderSheet();
  }
  async function sendKitchen() {
    const t = T[langOf()], c = ct(), l = T[CFG.staff] ? CFG.staff : "vi", me = langOf();
    if (sending) return;
    if (!ordering()) return expire();
    const items = [...cart].map(([k, q]) => { const p = ITEMS.get(k).opt.price; return { name: lineName(k, l), sub: me === l ? "" : lineName(k, me), key: k, q, price: p == null ? null : p * q }; });
    const ed = editing;
    const body = { shop: CFG.shop, table: ticket.table, note: noteFor(T[CFG.staff] ? CFG.staff : "vi").slice(0, 200), lang: me, currency: CFG.currency, items, tk: ticket.tk, ...(ed ? { edit: { id: ed.id, ek: ed.ek } } : {}) };
    sending = true; renderSheet();
    let res = null, err = "";
    try {
      const r = await fetch(`${CFG.api}/api/order`, { method: "POST", headers: { "content-type": "text/plain" }, body: JSON.stringify(body) });
      if (r.ok) res = await r.json(); else err = ((await r.json().catch(() => ({}))).error) || "x";
    } catch { err = "net"; }
    sending = false;
    if (!res) {
      if (ed && (err === "taken" || err === "gone")) { editing = null; prevCart = null; mine = mine.filter((x) => x.id !== ed.id); save(); renderSheet(); toast(err === "taken" ? c.taken : c.gone); return; }
      const msg = failOf(err, t.sendFail);
      if (msg) { renderSheet(); toast(msg); }
      return;
    }
    if (ed) mine = mine.filter((x) => x.id !== ed.id);
    mine.push({ id: res.id, no: res.no, ek: res.ek }); mine = mine.slice(-30);
    if (res.ticket) setTicket(res.ticket); // 주문하면 그때부터 다시 1시간
    // 보낸 내용을 직원 화면 모양으로 보여 주고 장바구니를 비운다(두 번 보내기 방지)
    const head = ed ? `${esc(fmt(c.edited, { o: ed.no }))}<br>${esc(t.sentNo)} #${res.no}` : `${esc(t.sent)}<br>${esc(t.sentNo)} #${res.no}`;
    $("qoStaffBody").innerHTML = `<p class="say" style="color:#1a7f37;font-size:17px">✅ ${head}</p>` + staffHtml().replace(/^\s*<p class="say">[^<]*<\/p>/, "");
    editing = null; prevCart = null;
    cart.clear(); note = ""; asks.clear(); update(); closeSheet();
    $("qoStaff").hidden = false; $("qoStaff").scrollTop = 0;
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
          <div class="qo-editbar" id="qoEdit" hidden><span id="qoEditT"></span><button type="button" id="qoEditX"></button></div>
          <ul class="qo-lines" id="qoLines"></ul>
          <div class="qo-total" id="qoTotal"></div>
          <p class="qo-hint" id="qoHint"></p>
          <div class="qo-fields">
            <label id="qoTableL">.<input id="qoTable" maxlength="12" autocomplete="off"></label>
            <label id="qoNoteL">.<input id="qoNote" maxlength="200" autocomplete="off"></label>
          </div>
          <div class="qo-asks" id="qoAsks"></div>
          <div class="qo-acts">
            <button type="button" class="qo-main" id="qoKitchen" hidden></button>
            <button type="button" class="qo-main" id="qoShow"></button>
            <button type="button" class="qo-zalo" id="qoSend" hidden></button>
            <button type="button" class="qo-ghost" id="qoClear"></button>
          </div>
          <details class="qo-prev"><summary id="qoPrevS"></summary><pre id="qoPrev"></pre></details>
        </div>
      </div>
      <div class="qo-staff" id="qoStaff" hidden role="dialog" aria-modal="true"><div class="qo-staff-in"><div id="qoStaffBody"></div><button type="button" id="qoStaffX"></button></div></div>
      <div class="qo-tools" id="qoTools" hidden><button type="button" id="qoCallB"></button><button type="button" id="qoBillB"></button></div>
      <div class="qo-sheet" id="qoCall" hidden>
        <div class="qo-bg" data-pclose="qoCall"></div>
        <div class="qo-panel" role="dialog" aria-modal="true" aria-labelledby="qoCallT">
          <div class="qo-head"><h3 id="qoCallT"></h3><button type="button" class="qo-x" data-pclose="qoCall" aria-label="close">×</button></div>
          <div class="qo-reqs" id="qoReqs"></div>
        </div>
      </div>
      <div class="qo-sheet" id="qoBillS" hidden>
        <div class="qo-bg" data-pclose="qoBillS"></div>
        <div class="qo-panel" role="dialog" aria-modal="true" aria-labelledby="qoBillT">
          <div class="qo-head"><h3 id="qoBillT"></h3><button type="button" class="qo-x" data-pclose="qoBillS" aria-label="close">×</button></div>
          <ul class="qo-bill" id="qoBillL"></ul>
          <div class="qo-total" id="qoBillSum"></div>
          <p class="qo-hint" id="qoBillHint"></p>
        </div>
      </div>
      <div class="qo-toast" id="qoToast" role="status" aria-live="polite"></div>`;
    document.body.appendChild(root);

    document.addEventListener("click", (e) => {
      const b = e.target.closest(".qo-add button");
      if (!b || soldOut(b.dataset.k)) return;
      cart.set(b.dataset.k, (cart.get(b.dataset.k) || 0) + 1);
      update();
      toast(`${T[langOf()].added} · ${lineName(b.dataset.k, langOf())}`);
    });
    $("qoOpen").addEventListener("click", openSheet);
    $("qoSheet").addEventListener("click", (e) => {
      const el = e.target;
      if (el.closest("[data-close]")) return closeSheet();
      const inc = el.closest("[data-inc]")?.dataset.inc, dec = el.closest("[data-dec]")?.dataset.dec;
      const ask = el.closest("[data-ask]")?.dataset.ask;
      if (ask) { asks.has(ask) ? asks.delete(ask) : asks.add(ask); renderSheet(); save(); return; }
      if (inc) { cart.set(inc, cart.get(inc) + 1); update(); }
      if (dec) { const q = cart.get(dec) - 1; q > 0 ? cart.set(dec, q) : cart.delete(dec); update(); }
    });
    $("qoSheet").addEventListener("input", () => {
      if (!ordering()) table = $("qoTable").value.trim();
      note = $("qoNote").value;
      $("qoPrev").textContent = orderText();
      save();
    });
    $("qoClear").addEventListener("click", () => { cart.clear(); note = ""; asks.clear(); update(); });
    $("qoShow").addEventListener("click", () => {
      $("qoToast").classList.remove("on");
      $("qoStaffBody").innerHTML = staffHtml();
      $("qoStaff").hidden = false;
      $("qoStaff").scrollTop = 0;
    });
    $("qoStaffX").addEventListener("click", () => { $("qoStaff").hidden = true; });
    $("qoKitchen").addEventListener("click", sendKitchen);
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
    $("qoCallB").addEventListener("click", () => { openPanel("qoCall"); renderCall(); });
    $("qoBillB").addEventListener("click", () => { openPanel("qoBillS"); billData = null; billErr = ""; renderBill(); loadBill(); });
    if (ticket) setTicket(ticket); // 남은 시간이 지나면 기본 메뉴판으로
    document.addEventListener("click", (e) => { const c = e.target.closest("[data-pclose]"); if (c) closePanel(c.dataset.pclose); });
    $("qoReqs").addEventListener("click", (e) => { const b = e.target.closest("[data-req]"); if (b && !b.disabled) sendCall(b.dataset.req); });
    $("qoBillL").addEventListener("click", (e) => {
      const ed = e.target.closest("[data-oedit]"), cn = e.target.closest("[data-ocancel]");
      if (ed) editMine(ed.dataset.oedit); else if (cn) cancelMine(cn.dataset.ocancel);
    });
    $("qoEditX").addEventListener("click", stopEdit);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState !== "visible") return; checkExpire(); verifyTicket(); if (!$("qoBillS").hidden) loadBill(); });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!$("qoCall").hidden) return closePanel("qoCall");
      if (!$("qoBillS").hidden) return closePanel("qoBillS");
      if (!$("qoStaff").hidden) $("qoStaff").hidden = true;
      else if (!$("qoSheet").hidden) closeSheet();
    });

    decorate();
    update();
    checkKitchen(); // 켜진 가게면 [직원 호출] [주문 내역] 버튼을 보여 준다
    if (soGone) toast(T[langOf()].soGone);
    new MutationObserver(decorate).observe($("menu"), { childList: true });
    new MutationObserver(() => { paintButtons(); update(); paintTools(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
