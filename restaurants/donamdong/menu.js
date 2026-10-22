// 돈암동 찌개 박닌 Donamdong Chike (18N3 Võ Cường 6, TDP Bồ Sơn, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "돈암동 찌개 박닌" 폴더의 구글 지도 캡처 14장(벽 메뉴판 사진 4장: 8개월 전 2장·3년 전 2장, 음식 사진, 간판, 지도 정보).
// 메뉴판에 한국어와 작은 베트남어가 있어 한국어는 그대로, 영어·중국어·일본어는 새로 옮기고 베트남어는 메뉴판 표기를 따름.
window.RESTAURANT = {
  brand: { ko: "돈암동 찌개", en: "Donamdong Chike", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0942 884 936",
  address: "18N3 Võ Cường 6, TDP Bồ Sơn, Phường Võ Cường, Bắc Ninh",
  mapQuery: "돈암동 찌개 박닌 Donamdong Chike 18N3 Võ Cường Bắc Ninh",
  wifi: null, // 예: { ssid: "DONAMDONG", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
// 인원수별 가격 (찌개)
const P2345 = (a, b, c, d) => ({ sizes: [
  [T("2인", "2 people", "2人", "2名", "2 người"), a],
  [T("3인", "3 people", "3人", "3名", "3 người"), b],
  [T("4인", "4 people", "4人", "4名", "4 người"), c],
  [T("5인", "5 people", "5人", "5名", "5 người"), d],
] });
const SL = (s, l) => ({ sizes: [[T("소", "S", "小", "小", "Nhỏ"), s], [T("대", "L", "大", "大", "Lớn"), l]] });
const SEASON = T("계절 메뉴", "Seasonal", "季节限定", "季節限定", "Món theo mùa");

window.MENU = [
  {
    id: "jjigae",
    name: T("찌개 · 탕 · 찜", "Stews & hot pots", "锅 · 汤 · 炖菜", "チゲ・鍋・蒸し煮", "Canh · Lẩu · Món hầm"),
    note: T("찌개는 인원수에 맞춰 고르세요. 사리는 따로 주문해요.", "Pick a stew by group size. Extras (sari) are ordered separately.", "请按人数选择，加料需另点。", "人数に合わせてお選びください。追加（サリ）は別注文です。", "Chọn theo số người. Đồ thêm (sari) gọi riêng."),
    items: [
      it(null, null, "양푼 김치찌개", "Kimchi stew (big shared pot)", "大锅泡菜汤", "ヤンプン・キムチチゲ（大鍋）", "Canh kimchi", { ...P2345(380000, 530000, 600000, 670000), spicy: true, tag: "must" }),
      it(null, "dongtae", "양푼 동태찌개", "Pollock stew (big shared pot)", "大锅明太鱼汤", "ヤンプン・干しスケトウダラ鍋（大鍋）", "Canh cá đông (dongtae)", { ...P2345(490000, 640000, 730000, 850000), spicy: true }),
      it(null, null, "곤이 알탕", "Pollock roe & milt stew", "鳕鱼籽鱼白汤", "タラの卵・白子鍋", "Canh ruột trứng cá", { ...P2345(490000, 650000, 760000, 880000), spicy: true }),
      it(null, "dakbok", "국물 닭볶음탕", "Braised chicken stew (soupy)", "汤汁辣炖鸡", "汁たっぷり鶏の辛煮込み（タッポックムタン）", "Gà hầm khoai tây", { sizes: [
        [T("한 마리", "1 chicken", "1只", "1羽", "1 con"), 600000],
        [T("한 마리 반", "1½ chickens", "1.5只", "1羽半", "1,5 con"), 750000],
        [T("두 마리", "2 chickens", "2只", "2羽", "2 con"), 900000]] }),
      it(null, null, "닭알탕", "Chicken egg (unlaid yolk) soup", "鸡蛋黄汤", "鶏の卵黄鍋（タガルタン）", "Canh ruột trứng gà", { desc: T("소·대 중 선택 (가격은 문의)", "Small or large (ask staff for price)", "分大小份（价格请询问）", "小・大あり（価格はお尋ねください）", "Cỡ nhỏ hoặc lớn (hỏi nhân viên về giá)") }),
      it(null, null, "등갈비 김치찌개", "Pork rib kimchi stew", "排骨泡菜汤", "スペアリブのキムチチゲ", "Sườn canh kimchi", { ...SL(450000, 650000), spicy: true, desc: T("등갈비 추가 200,000₫", "Extra ribs +200,000₫", "加排骨 +200,000₫", "スペアリブ追加 +200,000₫", "Thêm sườn +200,000₫") }),
      it(null, null, "등갈비 김치찜", "Braised pork ribs with kimchi", "泡菜炖排骨", "スペアリブのキムチ蒸し煮", "Sườn hầm kimchi", { ...SL(650000, 850000), spicy: true, desc: T("등갈비 추가 200,000₫", "Extra ribs +200,000₫", "加排骨 +200,000₫", "スペアリブ追加 +200,000₫", "Thêm sườn +200,000₫") }),
      it(330000, null, "오뎅탕", "Fish cake soup (odeng-tang)", "鱼饼汤", "おでん鍋", "Canh chả cá"),
      it(190000, null, "청국장", "Fermented soybean stew (cheonggukjang)", "清麴酱汤", "チョングッチャン（納豆チゲ）", "Canh đậu tương"),
    ],
  },
  {
    id: "meat",
    name: T("고기 · 구이", "Meat & grilled dishes", "肉类 · 烤物", "お肉・焼き物", "Thịt · Món nướng"),
    items: [
      it(180000, null, "삼겹살", "Pork belly", "五花肉", "サムギョプサル", "Thịt ba chỉ"),
      it(180000, null, "대패삼겹살", "Thinly sliced pork belly (daepae)", "刨片五花肉", "薄切り豚バラ（テペ）", "Thịt ba chỉ thái mỏng"),
      it(230000, null, "항정살", "Pork jowl", "猪颈肉", "豚のハンジョンサル（ほほ肉）", "Thịt má lợn"),
      it(160000, null, "편육", "Sliced boiled pork (pyeonyuk)", "切片水煮猪肉", "ゆで豚の薄切り（ピョニュク）", "Thịt luộc cắt lát"),
      it(230000, null, "고등어 구이", "Grilled mackerel", "烤青花鱼", "さばの塩焼き", "Cá thu nướng"),
      it(800000, null, "새우 소금구이", "Salt-grilled shrimp", "盐烤大虾", "えびの塩焼き", "Tôm nướng muối", { unit: SEASON, desc: T("2시간 전 예약 필수", "Reserve 2 hours ahead", "需提前2小时预订", "2時間前までに要予約", "Đặt trước 2 giờ") }),
    ],
  },
  {
    id: "special",
    name: T("보양 · 계절 메뉴", "Hearty & seasonal dishes", "滋补 · 季节菜", "滋養・季節メニュー", "Món bồi bổ · Theo mùa"),
    items: [
      it(900000, null, "백숙", "Whole boiled chicken (baeksuk)", "白切炖鸡（白熟）", "鶏の水炊き（ペクスク）", "Gà hầm (baeksuk)", { desc: T("4시간 전 예약 필수", "Reserve 4 hours ahead", "需提前4小时预订", "4時間前までに要予約", "Đặt trước 4 giờ") }),
      it(900000, "gwamegi", "과메기", "Gwamegi (semi-dried fish)", "风干青鱼（Gwamegi）", "クァメギ（干しニシン）", "Gỏi cá (gwamegi)", { unit: SEASON }),
      it(900000, null, "홍어", "Fermented skate (hongeo)", "发酵鳐鱼", "ホンオ（発酵エイ）", "Gỏi cá (hongeo)", { unit: SEASON }),
    ],
  },
  {
    id: "anju",
    name: T("전 · 안주", "Pancakes & bar snacks", "煎饼 · 下酒菜", "チヂミ・おつまみ", "Bánh xèo · Mồi nhậu"),
    items: [
      it(330000, "jeon", "해물파전", "Seafood & scallion pancake", "海鲜葱饼", "海鮮ネギチヂミ", "Bánh xèo hải sản"),
      it(200000, "jeon", "김치전", "Kimchi pancake", "泡菜煎饼", "キムチチヂミ", "Bánh xèo kimchi"),
      it(200000, null, "애호박전", "Zucchini pancake", "西葫芦煎饼", "ズッキーニのチヂミ", "Bánh bí ngòi"),
      it(200000, null, "부추전", "Chive pancake", "韭菜煎饼", "ニラチヂミ", "Bánh hẹ"),
      it(250000, null, "두부김치", "Tofu with stir-fried kimchi", "豆腐配炒泡菜", "豆腐キムチ（炒めキムチ添え）", "Đậu phụ xào kimchi"),
      it(250000, null, "순대", "Sundae (Korean blood sausage)", "血肠", "スンデ（韓国風腸詰め）", "Dồi lợn"),
      it(320000, null, "골뱅이 무침", "Spicy whelk salad", "凉拌海螺", "つぶ貝の甘辛和え", "Gỏi ốc trộn (salat ốc trộn)", { spicy: true }),
      it(180000, null, "쥐포", "Dried filefish snack (jwipo)", "风干马面鲀鱼片", "カワハギの干物（チュィポ）", "Cá khô nướng (jwipo)"),
      it(250000, null, "먹태", "Dried pollock snack (meoktae)", "风干黑明太鱼", "干しスケトウダラ（モクテ）", "Cá minh thái khô (meoktae)"),
    ],
  },
  {
    id: "noodle",
    name: T("면 · 국", "Noodles & soups", "面 · 汤", "麺・スープ", "Mì · Canh"),
    items: [
      it(140000, "kongguksu", "콩국수", "Cold soy milk noodles (kongguksu)", "冷豆浆面", "コングクス（冷たい豆乳麺）", "Mì lạnh đậu tương"),
      it(140000, null, "떡국", "Rice cake soup (tteokguk)", "年糕汤", "トックク（餅スープ）", "Canh bánh gạo"),
      it(150000, null, "떡만두국", "Rice cake & dumpling soup", "年糕饺子汤", "トック入りマンドゥスープ", "Canh bánh gạo há cảo"),
    ],
  },
  {
    id: "sari",
    name: T("사리 · 추가", "Extras (sari)", "加料", "追加（サリ）", "Đồ thêm (sari)"),
    items: [
      it(60000, null, "찌개 김치 추가", "Extra kimchi for stew", "加泡菜", "キムチ追加", "Thêm kimchi"),
      it(130000, null, "고기 추가", "Extra meat", "加肉", "お肉追加", "Thêm thịt"),
      it(130000, null, "계란말이", "Rolled omelet", "鸡蛋卷", "卵焼き（ケランマリ）", "Trứng cuộn"),
      it(50000, null, "칼국수 / 수제비", "Knife-cut noodles / hand-pulled dough flakes", "刀削面 / 面片", "カルグクス／スジェビ", "Mì kalguksu / sujebi"),
      it(50000, null, "라면사리", "Instant noodles", "方便面", "ラーメンサリ", "Mì tôm"),
      it(40000, null, "비엔나 사리", "Vienna sausages", "维也纳香肠", "ウインナー", "Xúc xích Vienna"),
      it(40000, null, "오뎅 사리", "Fish cakes", "鱼饼", "おでん", "Chả cá"),
      it(40000, null, "두부 사리", "Tofu", "豆腐", "豆腐", "Đậu phụ"),
      it(40000, null, "만두 / 떡 / 당면", "Dumplings / rice cakes / glass noodles", "饺子 / 年糕 / 粉丝", "餃子／お餅／春雨", "Há cảo / bánh gạo / miến"),
      it(120000, null, "동태알 사리", "Extra pollock roe", "加明太鱼籽", "スケトウダラの卵追加", "Thêm trứng cá"),
      it(120000, null, "고니 사리", "Extra pollock milt", "加鱼白", "白子追加", "Thêm ruột cá"),
      it(20000, null, "김", "Seaweed (gim)", "紫菜", "韓国海苔", "Rong biển"),
      it(20000, null, "공기밥", "Steamed rice", "米饭", "ご飯", "Cơm trắng"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒类 · 饮料", "お酒・ドリンク", "Rượu · Đồ uống"),
    items: [
      it(140000, null, "참이슬", "Chamisul soju", "真露烧酒", "チャミスル（焼酎）", "Soju Chamisul"),
      it(140000, null, "처음처럼", "Chum Churum soju", "初饮初乐烧酒", "チョウムチョロム（焼酎）", "Soju Chum Churum"),
      it(140000, null, "진로", "Jinro soju", "真露烧酒", "ジンロ（焼酎）", "Soju Jinro"),
      it(160000, null, "막걸리", "Makgeolli (rice wine)", "马格利", "マッコリ", "Rượu gạo (makgeolli)"),
      it(120000, null, "보드카 멘", "Vodka Men", "Vodka Men 伏特加", "ウォッカ（Vodka Men）", "Vodkamen"),
      it(60000, null, "타이거", "Tiger beer", "虎牌啤酒", "タイガービール", "Bia Tiger"),
      it(20000, null, "콜라", "Coca-Cola", "可乐", "コーラ", "Coca"),
      it(20000, null, "스프라이트", "Sprite", "雪碧", "スプライト", "Sprite"),
      it(20000, null, "환타", "Fanta", "芬达", "ファンタ", "Fanta"),
    ],
  },
];
