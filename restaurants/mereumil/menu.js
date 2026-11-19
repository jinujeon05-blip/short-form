// 메르밀(Mereumil) 메뉴 데이터 — 출처: 구글 지도 손님 메뉴판 사진(2026-11-09 수집)
// 본 메뉴판(menu_01·04·11·14·17, 세트 = 만두 2알 / 돈까스 세트 = 미니소바) + 신메뉴 포스터(menu_05·06)를 씀.
// 책 메뉴판(menu_12·13·18: 세트 = 미니돈까스 또는 만두 3알, 미니돈까스·흑임자 콩국수·흑임자 콩물)은 콩국수에 COMING SOON 도장이 있어
// 오픈 전 옛 판으로 봄 → 안 씀. 아직 COMING SOON인 쑥떡 메밀 콩국수(240K/280K)도 뺌 (docs/todo.md)
// 가격은 모든 판에서 같음. 운영 감찰관 재대조: 차이 0
// price: 한 가지 가격 / sizes: [["Single", 가격], ["Combo", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "메르밀", en: "Mereumil" },
  phone: "0965 028 284",
  address: "A3 Lô DD, KĐT Mễ Trì, Đ. Mỹ Đình, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:30 – 22:00", // 구글 지도 '오전 10:30~오후 10:00'. 메뉴판엔 시간 없음
};

const T = (ko, en = "", zh = "", ja = "", vi = "") => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });
const SC = (a, b) => [["Single", a], ["Combo", b]];

window.MENU = [
  {
    id: "soba",
    name: T("메밀면", "Buckwheat Noodles (Memil-myeon)", "荞麦面", "そば", "Mì kiều mạch"),
    note: T("Single = 단품 · Combo = 만두 2알 포함", "Single = a la carte · Combo = includes 2 dumplings", "Single = 单点 · Combo = 含2个饺子", "Single = 単品 ・ Combo = 餃子2個付き", "Single = món lẻ · Combo = kèm 2 cái bánh bao"),
    items: [
      it(SC(160000, 200000), "naeng", T("냉메밀", "Cold Buckwheat Noodles (Naeng-memil)", "冷荞麦面（Naeng-memil）", "冷たいそば（ネンメミル）", "Mì kiều mạch lạnh"), { tag: "best" }),
      it(SC(170000, 210000), null, T("땡초메밀", "Spicy Chili Buckwheat Noodles (Ttaengcho-memil)", "青阳辣椒荞麦面（Ttaengcho-memil）", "唐辛子そば（テンチョメミル）", "Mì kiều mạch cay kiểu Hàn"), { tag: "best", spicy: true }),
      it(SC(170000, 210000), null, T("온메밀", "Hot Buckwheat Noodles (On-memil)", "热荞麦面（On-memil）", "温かいそば（オンメミル）", "Mì kiều mạch nóng truyền thống")),
      it(SC(180000, 220000), null, T("우삼겹 온메밀", "Hot Buckwheat Noodles with Beef Brisket Slices (Usamgyeop On-memil)", "牛五花热荞麦面（Usamgyeop On-memil）", "牛バラ温かいそば（ウサムギョプ オンメミル）", "Mì kiều mạch nóng bò ba chỉ")),
      it(SC(220000, 260000), "deulgireum", T("들기름 메밀", "Perilla Oil Buckwheat Noodles (Deulgireum Memil)", "紫苏油荞麦面（Deulgireum Memil）", "えごま油そば（トゥルギルム メミル）", "Mì kiều mạch dầu tía tô")),
      it(SC(170000, 210000), "bibim", T("비빔메밀", "Spicy Mixed Buckwheat Noodles (Bibim-memil)", "拌荞麦面（Bibim-memil）", "ビビンそば（ビビンメミル）", "Mì kiều mạch trộn đặc biệt")),
      it(SC(200000, 240000), null, T("메밀 콩국수", "Buckwheat Noodles in Cold Soy Milk Broth (Memil Kongguksu)", "荞麦冷豆浆面（Memil Kongguksu）", "そばの冷たい豆乳麺（メミル コングクス）", "Mì kiều mạch nước đậu nành")),
    ],
  },
  {
    id: "new",
    name: T("신메뉴", "New Menu", "新品", "新メニュー", "Món mới"),
    items: [
      it(SC(200000, 240000), null, T("우삼겹 짬뽕 메밀", "Beef Brisket Jjamppong Buckwheat Noodles (Usamgyeop Jjamppong Memil)", "牛五花炒码荞麦面（Usamgyeop Jjamppong Memil）", "牛バラ チャンポンそば（ウサムギョプ チャンポン メミル）", "Mì kiều mạch Jjamppong bò ba chỉ")),
      it(200000, null, T("오뎅소바", "Fish Cake Soba (Odeng Soba)", "鱼饼荞麦汤（Odeng Soba）", "おでんそば（オデンソバ）", "Soba chả cá"), { desc: T("면 미포함", "Noodles not included", "不含面条", "麺は含みません", "Không kèm mì") }),
      it(80000, null, T("새우튀김 (3마리)", "Fried Shrimp (Saeu Twigim, 3 pcs)", "炸虾（Saeu Twigim，3只）", "海老フライ（セウティギム、3尾）", "Tôm chiên (3 con)")),
    ],
  },
  {
    id: "katsu",
    name: T("돈까스", "Pork Cutlet (Donkatsu)", "猪排", "とんかつ", "Tonkatsu"),
    note: T("Single = 단품 · Combo = 미니소바 포함", "Single = a la carte · Combo = includes a mini soba", "Single = 单点 · Combo = 含迷你荞麦面", "Single = 単品 ・ Combo = ミニそば付き", "Single = món lẻ · Combo = kèm mì soba mini"),
    items: [
      it(SC(170000, 210000), "donkatsu", T("수제 등심돈까스", "Handmade Pork Loin Cutlet (Sujae Deungsim Donkatsu)", "手工里脊猪排（Sujae Deungsim Donkatsu）", "手作りロースとんかつ（スジェ トゥンシム トンカツ）", "Tonkatsu thăn heo chiên giòn")),
      it(SC(190000, 230000), null, T("수제 치즈돈까스", "Handmade Cheese Pork Cutlet (Sujae Cheese Donkatsu)", "手工芝士猪排（Sujae Cheese Donkatsu）", "手作りチーズとんかつ（スジェ チーズ トンカツ）", "Tonkatsu phô mai tan chảy")),
    ],
  },
  {
    id: "side",
    name: T("사이드 · 추가", "Sides · Extras", "小食 · 加料", "サイド・追加", "Món phụ · Thêm"),
    items: [
      it(60000, "mandu", T("고기왕만두 (3알)", "Jumbo Meat Dumplings (Gogi Wang-mandu, 3 pcs)", "大肉馅饺子（Gogi Wang-mandu，3个）", "特大肉餃子（コギ ワンマンドゥ、3個）", "Bánh bao nhân thịt cỡ lớn (3 cái)")),
      it(80000, null, T("맛보기 콩물 (200ml)", "Soy Milk Broth Tasting Size (Kongmul, 200ml)", "尝鲜豆浆汤（Kongmul，200ml）", "お試し豆乳スープ（コンムル、200ml）", "Sữa đậu nành (200ml)")),
      it(40000, null, T("면 추가", "Extra Noodles (Myeon Chuga)", "加面", "麺追加", "Thêm mì")),
      it(20000, null, T("육수 추가 (냉메밀)", "Extra Broth (Yuksu Chuga, for Cold Buckwheat Noodles)", "加汤底（冷荞麦面用）", "だし追加（冷たいそば用）", "Thêm nước dùng (soba lạnh)")),
    ],
  },
  {
    id: "drink",
    name: T("음료", "Drinks", "饮品", "ドリンク", "Đồ uống"),
    items: [
      it(20000, null, T("콜라 / 스프라이트 / 슈웹스", "Coca-Cola / Sprite / Schweppes", "可乐 / 雪碧 / 怡泉", "コーラ / スプライト / シュウェップス", "Coca-Cola / Sprite / Schweppes")),
    ],
  },
];
