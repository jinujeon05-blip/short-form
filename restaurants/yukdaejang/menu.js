// 육대장 하노이 지점(옛날전통육개장 육대장 YUK DAE JANG, 한식 육개장·보쌈·전골, 하노이 Mỹ Đình Sông Đà) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음). 출처: 구글 지도 손님 사진(2026-11-07 수집). 세움 메뉴판이 시기별로 여러 판(육개장 170,000→240,000)이라 가장 최근·가장 높은 판(menu_04·06·01 세 면)을 씀, 2층 곱창·삼겹살은 세움 홍보판(menu_17·36). docs/todo.md
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "육대장", en: "Yuk Dae Jang" },
  phone: "038 819 5310",
  address: "Lô 9 TT4, KĐT Mỹ Đình Sông Đà, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "09:00 – 14:30 · 16:30 – 22:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "soup",
    name: T("육개장 · 탕", "YukGaeJang & Soups", "辣牛肉汤 · 汤类", "ユッケジャン・スープ", "YukGaeJang & Canh"),
    note: T("더 맵게 가능 · 전 메뉴 포장 가능", "Can be made spicier · All menu available for take-out", "可加辣 · 全部菜品可外带", "もっと辛くも可能・全メニューお持ち帰り可", "Chọn mức độ cay · Tất cả món đều mua mang về được"),
    items: [
      it(240000, "yukgaejang", T("옛날전통육개장", "Original YukGaeJang (Spicy Beef Soup)", "传统老式辣牛肉汤", "昔ながらのユッケジャン", "YukGaeJang truyền thống (canh bò cay)"), { tag: "must", spicy: true }),
      it(260000, null, T("꼬막육개장", "Cockle YukGaeJang (Spicy Beef Soup)", "蚶子辣牛肉汤", "コマク（赤貝）入りユッケジャン", "YukGaeJang sò huyết (canh bò cay)"), { spicy: true }),
      it(260000, null, T("순두부육개장", "Soft Tofu YukGaeJang (Spicy Beef Soup)", "嫩豆腐辣牛肉汤", "スンドゥブ入りユッケジャン", "YukGaeJang đậu phụ mềm (canh bò cay)"), { spicy: true }),
      it(280000, null, T("해물순두부육개장", "Seafood Soft Tofu YukGaeJang (Spicy Beef Soup)", "海鲜嫩豆腐辣牛肉汤", "海鮮スンドゥブ入りユッケジャン", "YukGaeJang đậu phụ mềm hải sản (canh bò cay)"), { spicy: true }),
      it(280000, null, T("갈비탕", "Galbitang (Beef Rib Soup)", "牛排骨汤", "カルビタン（牛カルビスープ）", "Canh sườn bò (Galbitang)")),
      it(240000, null, T("설렁탕", "Seolleongtang (Ox Bone Soup)", "雪浓汤（牛骨汤）", "ソルロンタン（牛骨スープ）", "Canh xương bò Seolleongtang")),
      it(240000, null, T("황태설렁탕", "Dried Pollack Seolleongtang", "黄太鱼雪浓汤", "干しスケトウダラのソルロンタン", "Canh xương bò Seolleongtang cá minh thái khô")),
      it(240000, null, T("사골떡만두국", "Rice Cake & Handmade Dumpling Soup in Ox Bone Broth", "牛骨年糕水饺汤", "牛骨スープのトックマンドゥクク（餅と餃子入り）", "Canh xương bò bánh gạo và há cảo")),
    ],
  },
  {
    id: "noodle",
    name: T("면 · 냉면", "Noodles", "面 · 冷面", "麺・冷麺", "Mì"),
    items: [
      it(240000, "yukkalmyeon", T("육칼면 (라면사리)", "Spicy Beef Noodle Soup (with ramen noodles)", "辣牛肉汤面（拉面）", "ユッケジャン麺（インスタント麺）", "Mì YukGaeJang (mì gói)"), { spicy: true }),
      it(240000, null, T("생(生)육칼면", "Spicy Beef Noodle Soup (with fresh noodles)", "辣牛肉汤面（鲜面）", "ユッケジャン麺（生麺）", "Mì YukGaeJang (mì tươi)"), { spicy: true }),
      it(260000, null, T("꼬막생(生)육칼면", "Cockle Spicy Beef Noodle Soup (with fresh noodles)", "蚶子辣牛肉汤面（鲜面）", "コマク入りユッケジャン麺（生麺）", "Mì YukGaeJang sò huyết (mì tươi)"), { spicy: true }),
      it(190000, "naengmyeon", T("양지냉면 (물 / 비빔)", "Cold Buckwheat Noodles with Beef Brisket (in broth / spicy)", "牛腩冷面（汤 / 拌）", "牛バラ肉の冷麺（水冷麺 / ビビン）", "Mì lạnh với nạm bò (nước / trộn cay)")),
    ],
  },
  {
    id: "bossam",
    name: T("보쌈 · 무침", "Bossam & Salads", "菜包肉 · 凉拌", "ポッサム・和え物", "Thịt heo luộc & Gỏi"),
    items: [
      it([["L", 900000], ["M", 700000], ["S", 260000]], "bossam", T("한방보쌈", "Herbal Bossam (Pork Belly Boiled with Herbs)", "药膳菜包肉", "薬膳ポッサム", "Bossam thảo mộc (thịt heo luộc)"), { tag: "best" }),
      it(500000, null, T("간장보쌈", "Soy Sauce Bossam (Pork Belly in Soy Sauce)", "酱油菜包肉", "醤油ポッサム", "Bossam sốt nước tương (thịt heo luộc)")),
      it(450000, null, T("보쌈무침", "Seasoned Pork Belly & Vegetables", "凉拌五花肉蔬菜", "ポッサムの和え物（豚バラ肉と野菜）", "Gỏi thịt heo luộc bốn mùa")),
      it(450000, null, T("양지무침", "Seasoned Beef Brisket & Vegetables", "凉拌牛腩蔬菜", "牛バラ肉の和え物（野菜入り）", "Gỏi nạm bò bốn mùa")),
      it(430000, null, T("꼬막무침", "Seasoned Cockles & Vegetables", "凉拌蚶子蔬菜", "コマク（赤貝）の和え物", "Gỏi sò huyết bốn mùa"), { spicy: true }),
    ],
  },
  {
    id: "jeongol",
    name: T("전골 · 찜", "Hot Pots & Braised", "火锅 · 炖菜", "鍋・蒸し煮", "Lẩu & Món hầm"),
    items: [
      it(700000, null, T("육개장전골", "YukGaeJang Hot Pot", "辣牛肉汤火锅", "ユッケジャン鍋", "Lẩu YukGaeJang"), { spicy: true, desc: T("육수 추가 70,000", "Extra broth 70,000", "加汤 70,000", "スープ追加 70,000", "Thêm nước dùng 70.000") }),
      it(700000, "budae-jeongol", T("부대전골", "Sausage Hot Pot (Budae Jeongol)", "部队火锅", "プデチゲ（部隊鍋）", "Lẩu quân đội Budae (xúc xích, thịt hộp)"), { desc: T("공기밥 서비스", "Free rice", "赠送米饭", "ご飯サービス", "Tặng kèm cơm") }),
      it(950000, null, T("모듬수육전골", "Assorted Boiled Meat Hot Pot", "什锦白切肉火锅", "盛り合わせ茹で肉鍋", "Lẩu thịt luộc thập cẩm")),
      it(1300000, null, T("대장갈비찜", "Braised Beef Short Ribs", "炖牛小排", "牛カルビの蒸し煮", "Sườn bò om")),
    ],
  },
  {
    id: "mandu",
    name: T("만두", "Dumplings", "饺子", "餃子", "Há cảo"),
    items: [
      it(140000, "mandu", T("갈비만두", "Galbi Dumplings", "排骨饺子", "カルビ餃子", "Há cảo sườn bò (galbi)"), { unit: "8pcs" }),
      it(140000, null, T("고기만두", "Meat Dumplings", "肉馅饺子", "肉餃子", "Há cảo thịt heo"), { unit: "8pcs" }),
      it(140000, null, T("김치만두", "Kimchi Dumplings", "泡菜饺子", "キムチ餃子", "Há cảo kim chi"), { unit: "8pcs" }),
      it(140000, null, T("왕만두", "King Dumplings", "大饺子", "大きな餃子", "Há cảo to"), { unit: "4pcs" }),
    ],
  },
  {
    id: "grill",
    name: T("곱창 · 삼겹살 구이 (2층)", "Grilled Intestines & Pork Belly (2nd floor)", "烤牛肠 · 烤五花肉（2楼）", "ホルモン・サムギョプサル焼き（2階）", "Lòng bò & Ba chỉ nướng (tầng 2)"),
    note: T("2층에서 판매 · 1인분 가격 · 2인분 이상 주문", "Served on the 2nd floor · Price per serving · Minimum 2 servings", "仅限2楼 · 价格为每份 · 须点2份以上", "2階のみ・1人前の価格・2人前からご注文", "Bán ở tầng 2 · Giá 1 phần · Gọi từ 2 phần trở lên"),
    items: [
      it(520000, null, T("한우 곱창", "Hanwoo Gopchang (Korean Beef Small Intestine)", "韩牛小肠", "韓牛コプチャン（小腸）", "Lòng non bò Hàn Quốc (Hanwoo)")),
      it(420000, null, T("한우 대창", "Hanwoo Daechang (Korean Beef Large Intestine)", "韩牛大肠", "韓牛テチャン（大腸）", "Lòng già bò Hàn Quốc (Hanwoo)")),
      it(480000, null, T("모듬곱창", "Assorted Beef Intestines", "什锦牛杂", "ホルモン盛り合わせ", "Lòng bò thập cẩm")),
      it(390000, null, T("곱창", "Gopchang (Beef Small Intestine)", "牛小肠", "コプチャン（牛の小腸）", "Lòng non bò")),
      it(390000, null, T("막창", "Makchang (Beef Abomasum)", "烤牛皱胃（Makchang）", "マクチャン（牛の第四胃）", "Dạ múi khế bò")),
      it(440000, null, T("특양", "Teukyang (Premium Beef Tripe)", "特选牛百叶（Teukyang）", "特上ヤン（牛の第一胃）", "Dạ cỏ bò loại đặc biệt")),
      it(250000, null, T("염통", "Yeomtong (Beef Heart)", "牛心", "ハツ（牛の心臓）", "Tim bò")),
      it(180000, null, T("우삼겹구이", "Grilled Beef Belly", "烤牛五花", "牛バラ肉の焼き", "Ba chỉ bò nướng")),
      it(150000, null, T("옛날삼겹살", "Old-style Pork Belly", "老式五花肉", "昔ながらのサムギョプサル", "Ba chỉ heo nướng kiểu xưa")),
    ],
  },
  {
    id: "extra",
    name: T("추가 메뉴", "Extras", "加点", "追加メニュー", "Gọi thêm"),
    items: [
      it(200000, null, T("보쌈고기 추가", "Extra Boiled Pork Belly", "加菜包肉", "ポッサム肉の追加", "Thêm thịt heo luộc")),
      it(330000, null, T("수육 추가", "Extra Boiled Beef", "加白切肉", "スユク（茹で肉）の追加", "Thêm thịt bò luộc")),
      it(220000, null, T("햄 추가", "Extra Sausage", "加火腿香肠", "ハム・ソーセージの追加", "Thêm giăm bông, xúc xích")),
      it(70000, null, T("육수 추가", "Extra Broth", "加汤", "スープの追加", "Thêm nước dùng")),
      it(60000, null, T("면사리 추가", "Extra Noodles", "加面", "麺の追加", "Thêm mì")),
      it(20000, null, T("밥 추가", "Extra Rice", "加米饭", "ご飯の追加", "Thêm cơm")),
    ],
  },
  {
    id: "drinks",
    name: T("음료 · 주류", "Drinks", "饮料 · 酒类", "ドリンク・お酒", "Đồ uống"),
    items: [
      it(160000, null, T("소주", "Soju", "烧酒", "焼酎（ソジュ）", "Rượu Soju")),
      it(160000, null, T("막걸리", "Makgeolli (Korean Rice Wine)", "马格利（韩国米酒）", "マッコリ（韓国のお米のお酒）", "Rượu gạo Makgeolli")),
      it(60000, null, T("맥주 (사이공 스페셜 · 타이거 · 하이네켄)", "Beer (Saigon Special · Tiger · Heineken)", "啤酒（西贡特别版 · 虎牌 · 喜力）", "ビール（サイゴンスペシャル・タイガー・ハイネケン）", "Bia (Saigon Special · Tiger · Heineken)")),
      it(30000, null, T("음료수 (콜라 · 스프라이트 · 환타)", "Soft Drink (Coke · Sprite · Fanta)", "软饮（可乐 · 雪碧 · 芬达）", "清涼飲料（コーラ・スプライト・ファンタ）", "Nước ngọt (Coca · Sprite · Fanta)")),
    ],
  },
];
