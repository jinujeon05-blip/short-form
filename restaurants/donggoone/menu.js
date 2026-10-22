// 동구네 DONGGOONE 숯불구이 (Võ Cường, Nguyễn Đăng Đạo 안쪽, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "동구네" 폴더의 구글 지도 캡처 25장 — 가게 계정이 2년 전 올린 메뉴판 3면(한국어·베트남어, 음식 사진 포함),
//   손님이 1년 전 올린 벽 메뉴판(꼼장어 가격은 이 최신 값), 구글 지도 메뉴 탭·지도 정보·간판 사진.
// 메뉴판에 한국어·베트남어가 있어 그대로 쓰고 영어·중국어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "동구네", en: "DongGooNe", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0918 542 024",
  address: "Võ Cường, bên trong Nguyễn Đăng Đạo, cổng phụ trường Cơ Điện, Bắc Ninh",
  mapQuery: "동구네 Nhà hàng DongGooNe",
  wifi: null, // 예: { ssid: "DONGGOONE", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const G = { unit: "200g" };

window.MENU = [
  {
    id: "pork",
    name: T("돼지고기", "Pork", "猪肉", "豚肉", "Thịt lợn"),
    note: T("통돼지 바베큐는 하루 전에 예약해 주세요 (새끼돼지 1마리).", "Whole roast pig (one piglet) must be reserved one day in advance.", "整只烤猪（1 只乳猪）请提前一天预约。", "丸焼き（子豚1頭）は前日までにご予約ください。", "Heo quay nguyên con (1 con heo con) cần đặt trước 1 ngày."),
    items: [
      it(null, "pk-bbq", "통돼지바베큐", "Whole roast pig (piglet)", "整只烤猪（乳猪）", "子豚の丸焼きバーベキュー", "Heo quay nguyên con (heo con)", { desc: T("하루 전 예약 · 가격 문의", "Reserve one day ahead · ask for price", "需提前一天预约 · 价格请咨询", "前日予約・価格はお問い合わせ", "Đặt trước 1 ngày · hỏi giá") }),
      it(230000, "pk-samgyeop-bbq", "삼겹살바베큐", "Roast pork belly BBQ", "烤五花肉", "豚バラ肉バーベキュー", "Ba chỉ lợn BBQ", G),
      it(1000000, "pk-whole", "돼지한마리", "Whole pig (assorted cuts)", "整猪（各部位拼盘）", "豚一頭分（各部位盛り合わせ）", "Thịt lợn toàn phần"),
      it(270000, "pk-gabri", "가브리살", "Gabeurisal (pork neck-end ridge)", "猪颈背肉（가브리살）", "ガブリ肉（豚の肩ロース先端）", "Gavurisal (thịt gáy lợn)", G),
      it(220000, "pk-galmaegi", "갈매기살", "Galmaegisal (pork skirt)", "猪横隔膜肉（갈매기살）", "豚のハラミ（カルメギサル）", "Thịt dải lợn (galmaegisal)", G),
      it(220000, "pk-black-belly", "흑돼지 생삼겹살", "Black pork belly (fresh)", "黑猪生五花肉", "黒豚の生サムギョプサル", "Ba chỉ lợn đen tươi", G),
      it(220000, "pk-black-moksal", "흑돼지 생목살", "Black pork neck (fresh)", "黑猪生猪颈肉", "黒豚の生モクサル（肩ロース）", "Thịt vai lợn đen tươi", G),
      it(190000, "pk-belly", "생삼겹살", "Fresh pork belly", "生五花肉", "生サムギョプサル", "Ba chỉ lợn tươi", G),
      it(170000, "pk-moksal", "생목살", "Fresh pork neck", "生猪颈肉", "生モクサル（豚肩ロース）", "Thịt vai lợn tươi", G),
      it(190000, "pk-galbi", "양념돼지갈비", "Marinated pork ribs", "调味猪排骨", "味付け豚カルビ", "Sườn lợn tẩm gia vị", G),
      it(210000, "pk-backrib", "등갈비", "Grilled pork back ribs", "烤猪背排", "豚の背ばら肉（スペアリブ）焼き", "Sườn nướng", G),
      it(190000, "pk-daepae", "대패삼겹살", "Thinly sliced pork belly", "薄切五花肉", "薄切りサムギョプサル", "Ba chỉ lợn thái mỏng", G),
      it(140000, "pk-skin", "돼지껍데기", "Grilled pork skin", "烤猪皮", "豚皮焼き", "Da lợn nướng", G),
      it(200000, "pk-makchang", "돼지막창", "Grilled pork large intestine (makchang)", "烤猪大肠（막창）", "豚マクチャン焼き", "Lòng lợn nướng", { ...G, tag: "must" }),
      it(230000, "pk-makchang-m", "양념막창", "Marinated makchang", "调味烤猪大肠", "味付けマクチャン", "Lòng lợn tẩm gia vị", G),
    ],
  },
  {
    id: "beef",
    name: T("소고기", "Beef", "牛肉", "牛肉", "Thịt bò"),
    items: [
      it(1600000, "bf-whole", "소한마리", "Whole beef (assorted cuts)", "整牛（各部位拼盘）", "牛一頭分（各部位盛り合わせ）", "Thịt bò toàn phần"),
      it(480000, "bf-kkotsal", "꽃살", "Kkotsal (beef chuck)", "牛肩胛肉（꽃살）", "コッサル（牛肩ロース）", "Thăn bò nội vai", G),
      it(370000, "bf-anchang", "안창살", "Anchangsal (beef skirt)", "牛横膈膜（안창살）", "アンチャンサル（牛ハラミ）", "Diềm thăn bò", G),
      it(300000, "bf-galbisal", "갈비살", "Galbisal (beef rib meat)", "牛肋条肉（갈비살）", "カルビサル（牛カルビ肉）", "Dẻ sườn bò", G),
      it(340000, "bf-galbisal-m", "양념갈비살", "Marinated galbisal (beef rib meat)", "调味牛肋条肉", "味付けカルビサル", "Dẻ sườn bò tẩm gia vị", G),
      it(340000, "bf-mixed", "소고기모듬", "Assorted beef set", "牛肉拼盘", "牛肉盛り合わせ", "Set thịt bò tổng hợp", G),
      it(300000, "bf-wang", "소왕갈비", "Large beef short ribs", "特大牛排骨", "牛の特大カルビ", "Sườn bò lớn", G),
      it(270000, "bf-la", "LA갈비", "LA-style beef short ribs", "LA 牛排骨", "LAカルビ", "Sườn bò LA", G),
      it(300000, "bf-la-m", "양념 LA갈비", "Marinated LA-style short ribs", "调味 LA 牛排骨", "味付けLAカルビ", "Sườn bò LA tẩm gia vị", G),
      it(270000, "bf-usamgyeop", "우삼겹", "Beef belly slices (usamgyeop)", "牛五花（우삼겹）", "牛バラ肉（ウサムギョプ）", "Ba chỉ bò", G),
      it(260000, "bf-dogani", "양념 도가니", "Marinated beef knee cartilage (dogani)", "调味牛膝软骨（도가니）", "味付け牛膝軟骨（トガニ）", "Dầu gối bò tẩm gia vị", G),
      it(470000, "bf-lamb", "양갈비", "Grilled lamb ribs", "烤羊排", "ラムリブ焼き", "Sườn cừu nướng", G),
      it(260000, "bf-wangtang", "소 왕갈비탕", "Large beef short rib soup", "牛排骨汤（大）", "牛の特大カルビスープ（王カルビタン）", "Canh sườn bò lớn"),
      it(260000, "bf-yanggom", "양곰탕", "Lamb rib soup (yang-gomtang)", "羊排汤（양곰탕）", "羊カルビのコムタン（ヤンコムタン）", "Canh sườn cừu"),
    ],
  },
  {
    id: "eel",
    name: T("장어 · 꼼장어", "Eel", "鳗鱼 · 盐烤鳗", "うなぎ・コムジャンオ", "Lươn"),
    note: T("숯불에 구워 드십니다. 꼼장어·양념꼼장어는 대 1kg, 소 500g 기준이에요.", "Grilled over charcoal. Kkomjangeo and spicy kkomjangeo: Large = 1 kg, Small = 500 g.", "炭火烧烤。烤鳗和辣味烤鳗：大份 1 公斤，小份 500 克。", "炭火で焼いてお召し上がりください。コムジャンオ・味付けコムジャンオは大 1kg・小 500g です。", "Nướng trên than hoa. Lươn nướng và lươn nướng cay: cỡ lớn 1 kg, cỡ nhỏ 500 g."),
    items: [
      it(1200000, "el-eel", "장어", "Eel (cá chình)", "鳗鱼（河鳗）", "うなぎ（ウナギ）", "Cá chình", { unit: "1kg" }),
      it(null, "el-kkom", "꼼장어", "Grilled hagfish (kkomjangeo)", "烤盲鳗（꼼장어）", "コムジャンオ（ぬたうなぎ）焼き", "Lươn nướng", { tag: "must", sizes: [[T("대 1kg", "Large 1 kg", "大 1公斤", "大 1kg", "Lớn 1 kg"), 1300000], [T("소 500g", "Small 500 g", "小 500克", "小 500g", "Nhỏ 500 g"), 650000]] }),
      it(null, "el-kkom-m", "양념꼼장어", "Spicy marinated hagfish", "辣味烤盲鳗", "味付けコムジャンオ", "Lươn nướng cay", { spicy: true, sizes: [[T("대 1kg", "Large 1 kg", "大 1公斤", "大 1kg", "Lớn 1 kg"), 1400000], [T("소 500g", "Small 500 g", "小 500克", "小 500g", "Nhỏ 500 g"), 700000]] }),
    ],
  },
  {
    id: "stew",
    name: T("찌개 · 면", "Stews & noodles", "炖汤 · 面", "チゲ・麺", "Canh & Mì"),
    items: [
      it(180000, "st-gochu", "목살고추장찌개", "Pork neck gochujang jjigae", "猪颈肉辣酱汤", "豚肩ロースのコチュジャンチゲ", "Canh thịt vai tương ớt", { spicy: true }),
      it(150000, "st-doenjang", "된장찌개", "Doenjang jjigae (soybean paste stew)", "大酱汤", "テンジャンチゲ（味噌チゲ）", "Canh đậu tương"),
      it(150000, "st-kimchi", "김치찌개", "Kimchi jjigae", "泡菜汤", "キムチチゲ", "Canh kim chi", { spicy: true }),
      it(150000, "st-cheonggukjang", "청국장", "Cheonggukjang (fermented soybean stew)", "清麴酱汤（청국장）", "チョングッチャン（納豆チゲ）", "Canh Cheonggukjang"),
      it(120000, "nd-bibim", "비빔국수 / 잔치국수", "Bibim-guksu (spicy) / Janchi-guksu (warm)", "拌面 / 宴会面", "ビビン麺 / ヤンチ麺", "Mì bibim / Mì nước"),
      it(120000, "nd-kong", "콩국수", "Kongguksu (cold soybean noodles)", "豆浆冷面（콩국수）", "コングクス（豆乳冷麺）", "Mì đậu nành"),
      it(120000, "nd-naeng", "물냉면 / 비빔냉면", "Mul-naengmyeon (cold broth) / Bibim-naengmyeon (spicy)", "水冷面 / 拌冷面", "水冷麺 / ビビン冷麺", "Miến lạnh nước / Miến lạnh cay"),
      it(50000, "nd-egg", "계란찜", "Steamed egg (gyeran-jjim)", "蒸蛋", "韓国式茶碗蒸し（ケランチム）", "Trứng hấp"),
      it(50000, "nd-ramen", "라면사리", "Extra ramen noodles", "加面（拉面）", "ラーメンサリ（追加）", "Thêm mì ramen Hàn Quốc"),
      it(50000, "nd-noodle", "국수사리", "Extra noodles", "加面（挂面）", "ソーメンサリ（追加）", "Thêm mì Hàn Quốc"),
    ],
  },
];
