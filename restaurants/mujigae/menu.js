// 무지개 식당 Nhà hàng Cầu vồng 박닌 (40 Lý Nhân Tông, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND (가격은 부가세 포함, 메뉴북 상단 문구)
// price: 가격(null이면 '가격 문의') / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "무지개식당" 폴더의 구글 지도 캡처 34장(가게 계정이 10개월 전 올린 메뉴북 12면, 지도 메뉴 탭, 간판·손님 사진).
// 메뉴북에 한국어·베트남어가 있어 그대로 쓰고, 영어·중국어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "무지개 식당", en: "Nhà hàng Cầu vồng", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0359 977 790",
  address: "40 Lý Nhân Tông, Phường Võ Cường, Bắc Ninh",
  mapQuery: "무지개 식당 Nhà hàng Cầu vồng 40 Lý Nhân Tông Bắc Ninh",
  wifi: null, // 예: { ssid: "MUJIGAE", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const P = (n, a) => T(`${n}${a[0]}`, `${n} ${a[1]}`, `${n}${a[2]}`, `${n}${a[3]}`, `${n} ${a[4]}`);
const PCS = (n) => P(n, ["개", "pcs", "个", "個", "miếng"]);
const ML = (n) => T(`${n}ml`, `${n}ml`, `${n}ml`, `${n}ml`, `${n}ml`);

// 컵밥은 메뉴북에 사진이 4개 컵 한 장뿐이라 손님 사진 한 장을 모두에게 씀(메뉴별 사진 아님)
const CUP = "cup";

window.MENU = [
  {
    id: "cup",
    name: T("컵밥", "Cup rice", "杯饭", "カップご飯", "Cơm cốc"),
    items: [
      it(70000, CUP, "스팸 컵밥", "Spam cup rice", "午餐肉杯饭", "スパムのカップご飯", "Cơm cốc spam"),
      it(70000, CUP, "비엔나소시지 컵밥", "Korean sausage cup rice", "韩式香肠杯饭", "ウインナーのカップご飯", "Cơm cốc xúc xích Hàn"),
      it(80000, CUP, "스팸·비엔나소시지 컵밥", "Spam & sausage cup rice", "午餐肉香肠杯饭", "スパムとウインナーのカップご飯", "Cơm cốc spam, xúc xích Hàn"),
      it(80000, CUP, "참치·스팸 컵밥", "Tuna & Spam cup rice", "金枪鱼午餐肉杯饭", "ツナとスパムのカップご飯", "Cơm cốc cá ngừ, spam"),
      it(90000, CUP, "삼겹살 컵밥", "Pork belly cup rice", "五花肉杯饭", "豚バラのカップご飯", "Cơm cốc thịt ba chỉ"),
      it(90000, CUP, "제육볶음 컵밥", "Spicy stir-fried pork cup rice", "辣炒猪肉杯饭", "豚肉の辛味炒めカップご飯", "Cơm cốc thịt lợn xào cay", { spicy: true }),
      it(90000, CUP, "베이컨·스팸 컵밥", "Bacon & Spam cup rice", "培根午餐肉杯饭", "ベーコンとスパムのカップご飯", "Cơm cốc thịt nguội, spam"),
      it(110000, CUP, "황제 스페셜 컵밥", "Emperor special cup rice", "皇帝特制杯饭", "皇帝スペシャルカップご飯", "Cơm cốc đặc biệt", { tag: "must" }),
    ],
  },
  {
    id: "set",
    name: T("세트 (여럿이서)", "Sets for sharing", "分享套餐", "シェアセット", "Set cho nhóm"),
    items: [
      it(380000, "set", "세트 A · 2인", "Set A (2 people)", "套餐A（2人）", "セットA（2名）", "Set A (2 người)", {
        desc: T("모듬튀김 · 떡볶이 · 김밥 · 해물라면 · 모듬스시 4개", "Assorted fried snacks · Tteokbokki · Kimbap · Seafood ramen · Assorted sushi (4 pcs)", "什锦炸物 · 辣炒年糕 · 紫菜包饭 · 海鲜拉面 · 什锦寿司（4贯）", "揚げ物盛り合わせ・トッポッキ・キンパ・海鮮ラーメン・盛り合わせ寿司（4貫）", "Đồ chiên các loại · Tokbokki · Kimbap · Mỳ tôm hải sản · Sushi các loại (4PS)") }),
      it(480000, "set", "세트 B · 3인", "Set B (3 people)", "套餐B（3人）", "セットB（3名）", "Set B (3 người)", {
        desc: T("모듬튀김 · 떡볶이 · 참치김밥 · 해물라면 · 모듬스시 6개", "Assorted fried snacks · Tteokbokki · Tuna kimbap · Seafood ramen · Assorted sushi (6 pcs)", "什锦炸物 · 辣炒年糕 · 金枪鱼紫菜包饭 · 海鲜拉面 · 什锦寿司（6贯）", "揚げ物盛り合わせ・トッポッキ・ツナキンパ・海鮮ラーメン・盛り合わせ寿司（6貫）", "Đồ chiên các loại · Tokbokki · Kimbap cá ngừ · Mỳ tôm hải sản · Sushi các loại (6PS)") }),
      it(580000, "set", "세트 C · 4인", "Set C (4 people)", "套餐C（4人）", "セットC（4名）", "Set C (4 người)", {
        desc: T("모듬튀김 · 떡볶이 · 참치김밥 · 해물라면 · 모듬스시 8개 · 과일팥빙수", "Assorted fried snacks · Tteokbokki · Tuna kimbap · Seafood ramen · Assorted sushi (8 pcs) · Fruit bingsu", "什锦炸物 · 辣炒年糕 · 金枪鱼紫菜包饭 · 海鲜拉面 · 什锦寿司（8贯）· 水果红豆刨冰", "揚げ物盛り合わせ・トッポッキ・ツナキンパ・海鮮ラーメン・盛り合わせ寿司（8貫）・フルーツピンス", "Đồ chiên các loại · Tokbokki · Kimbap cá ngừ · Mỳ tôm hải sản · Sushi các loại (8PS) · Bingsu trái cây"),
        tag: "best" }),
    ],
  },
  {
    id: "kimbap",
    name: T("김밥", "Kimbap", "紫菜包饭", "キンパ", "Kimbap"),
    items: [
      it(50000, "kimbap", "김밥", "Kimbap", "紫菜包饭", "キンパ", "Kimbap thường"),
      it(60000, "kimbap_tuna", "참치마요김밥", "Tuna mayo kimbap", "金枪鱼蛋黄酱紫菜包饭", "ツナマヨキンパ", "Kimbap cá ngừ"),
      it(null, "kimbap_beef", "소고기김밥", "Beef kimbap", "牛肉紫菜包饭", "牛肉キンパ", "Kimbap thịt bò"),
      it(80000, "kimbap_special", "무지개특선김밥", "Rainbow special kimbap", "彩虹特选紫菜包饭", "ムジゲ特選キンパ", "Kimbap đặc biệt", { tag: "best" }),
    ],
  },
  {
    id: "noodle",
    name: T("면 · 파스타", "Noodles & pasta", "面 · 意面", "麺・パスタ", "Mỳ · Spaghetti"),
    items: [
      it(120000, "noodle_yeolmu", "열무국수", "Young radish kimchi noodles", "小萝卜泡菜汤面", "ヨルム（若大根キムチ）そうめん", "Mỳ kim chi củ cải non"),
      it(150000, "noodle_seafood", "해물국수", "Seafood noodle soup", "海鲜汤面", "海鮮麺", "Mỳ hải sản"),
      it(120000, "noodle_bibim", "비빔국수", "Spicy mixed noodles (bibim guksu)", "辣拌面", "ビビム麺（辛口和え麺）", "Mỳ trộn", { spicy: true }),
      it(120000, "ramen", "해물라면", "Seafood ramen", "海鲜拉面", "海鮮ラーメン", "Mỳ tôm hải sản", { spicy: true }),
      it(130000, "spag_cream", "해물크림파스타", "Seafood cream pasta", "海鲜奶油意面", "海鮮クリームパスタ", "Spaghetti kem hải sản"),
      it(130000, "spag_tomato", "해물토마토파스타", "Seafood tomato pasta", "海鲜番茄意面", "海鮮トマトパスタ", "Spaghetti cà chua hải sản"),
      it(120000, "jjapa", "해물짜파게티", "Seafood black bean noodles (jjapagetti)", "海鲜炸酱面", "海鮮ジャジャン麺（チャパゲティ）", "Mỳ tương đen hải sản"),
    ],
  },
  {
    id: "sushi",
    name: T("스시 · 롤 · 덮밥", "Sushi, rolls & rice bowl", "寿司 · 卷 · 盖饭", "寿司・ロール・丼", "Sushi · Cuộn · Cơm"),
    items: [
      it(140000, "sushi_mix", "모듬스시", "Assorted sushi", "什锦寿司", "盛り合わせ寿司", "Sushi các loại", {
        unit: PCS(10),
        desc: T("새우 2 · 연어 2 · 달걀 2 · 장어 2 · 청어 2", "Shrimp 2 · Salmon 2 · Egg 2 · Eel 2 · Herring 2", "虾2 · 三文鱼2 · 玉子2 · 鳗鱼2 · 鲱鱼2", "えび2・サーモン2・玉子2・うなぎ2・にしん2", "2 tôm, 2 cá hồi, 2 trứng, 2 lươn, 2 cá trích") }),
      it(130000, "sushi_eel", "장어스시", "Grilled eel sushi", "烤鳗鱼寿司", "うなぎ寿司", "Sushi lươn nướng", { unit: PCS(10) }),
      it(130000, "sushi_roe", "청어알스시", "Herring roe sushi", "鲱鱼籽寿司", "数の子寿司", "Sushi cá trích ép trứng", { unit: PCS(10) }),
      it(130000, "sushi_shrimp", "새우스시", "Shrimp sushi", "虾寿司", "えび寿司", "Sushi tôm", { unit: PCS(10) }),
      it(140000, "sushi_salmon", "연어스시", "Salmon sushi", "三文鱼寿司", "サーモン寿司", "Sushi cá hồi", { unit: PCS(10) }),
      it(140000, "eel_rice", "장어덮밥", "Grilled eel rice bowl", "烤鳗鱼盖饭", "うな丼", "Cơm lươn nướng"),
      it(130000, "roll_salmon", "연어롤", "Salmon roll", "三文鱼卷", "サーモンロール", "Cá hồi cuộn"),
      it(120000, "roll_shrimp", "새우롤", "Shrimp roll", "虾卷", "えびロール", "Tôm cuộn"),
      it(130000, "roll_eel", "장어롤", "Grilled eel roll", "烤鳗鱼卷", "うなぎロール", "Lươn nướng cuộn"),
    ],
  },
  {
    id: "katsu",
    name: T("돈까스", "Pork cutlet", "炸猪排", "とんかつ", "Thịt chiên xù"),
    items: [
      it(110000, "katsu", "돈까스", "Pork cutlet (tonkatsu)", "炸猪排", "とんかつ", "Thịt heo chiên xù"),
      it(140000, "katsu_cheese", "치즈돈까스", "Cheese pork cutlet", "芝士炸猪排", "チーズとんかつ", "Thịt heo chiên phomai"),
    ],
  },
  {
    id: "snack",
    name: T("튀김 · 분식", "Fried snacks & street food", "炸物 · 小吃", "揚げ物・粉食", "Đồ chiên · Món ăn vặt"),
    items: [
      it(120000, "fry_mix", "모듬튀김", "Assorted tempura", "什锦天妇罗", "天ぷら盛り合わせ", "Chiên các loại", {
        desc: T("새우 3 · 오징어 3 · 고구마 3", "Shrimp 3 · Squid 3 · Sweet potato 3", "虾3 · 鱿鱼3 · 红薯3", "えび3・いか3・さつまいも3", "3 tôm chiên, 3 mực chiên, 3 khoai chiên") }),
      it(110000, "fry_shrimp", "새우튀김", "Fried shrimp", "炸虾", "えびフライ", "Tôm chiên", { unit: PCS(6) }),
      it(80000, "fry_squid", "오징어튀김", "Fried squid", "炸鱿鱼", "いかフライ", "Mực chiên", { unit: PCS(6) }),
      it(50000, "fry_kimmari", "김말이", "Fried seaweed noodle rolls (gimmari)", "炸紫菜粉丝卷", "のり巻き春雨の揚げ物（キンマリ）", "Miến cuộn rong biển chiên", { unit: PCS(6) }),
      it(50000, "fry_sweetpotato", "고구마튀김", "Fried sweet potato", "炸红薯", "さつまいもの揚げ物", "Khoai lang chiên", { unit: PCS(6) }),
      it(60000, "fry_mandu", "군만두", "Pan-fried dumplings", "煎饺", "焼き餃子", "Há cảo nướng", { unit: PCS(6) }),
      it(100000, "sundae", "모둠순대", "Assorted sundae (Korean blood sausage)", "什锦血肠", "スンデ盛り合わせ", "Lòng dồi các loại"),
      it(120000, "tteokbokki", "떡볶이", "Tteokbokki (spicy rice cakes)", "辣炒年糕", "トッポッキ", "Tokbokki", { spicy: true }),
      it(230000, "kimtteoksun", "김·떡·순 세트", "Kimbap, tteokbokki & sundae set", "紫菜包饭·辣炒年糕·血肠套餐", "キンパ・トッポッキ・スンデセット", "Set kimbap, tokbokki, lòng dồi"),
    ],
  },
  {
    id: "rice",
    name: T("볶음밥 · 빙수", "Fried rice & dessert", "炒饭 · 刨冰", "チャーハン・かき氷", "Cơm chiên · Bingsu"),
    items: [
      it(110000, "rice_kimchi", "김치볶음밥", "Kimchi fried rice", "泡菜炒饭", "キムチチャーハン", "Cơm chiên kim chi"),
      it(120000, "rice_seafood", "해물볶음밥", "Seafood fried rice", "海鲜炒饭", "海鮮チャーハン", "Cơm rang hải sản"),
      it(120000, "bingsu", "과일팥빙수", "Fruit bingsu (shaved ice)", "水果红豆刨冰", "フルーツ小豆かき氷（ピンス）", "Bingsu trái cây"),
    ],
  },
  {
    id: "anju",
    name: T("안주", "Side dishes for drinks", "下酒菜", "おつまみ", "Món ăn kèm"),
    items: [
      it(220000, "sundae_stir", "순대야채볶음", "Stir-fried sundae with vegetables", "蔬菜炒血肠", "スンデと野菜の炒め", "Sundae xào rau"),
      it(160000, "kimchijeon", "김치전", "Kimchi pancake", "泡菜煎饼", "キムチチヂミ", "Bánh xèo kim chi"),
      it(240000, "pajeon", "해물파전", "Seafood & scallion pancake", "海鲜葱饼", "海鮮ネギチヂミ", "Bánh xèo hải sản hành"),
      it(550000, "lobster", "랍스터 치즈구이", "Cheese-baked Alaskan lobster", "芝士焗阿拉斯加龙虾", "アラスカロブスターのチーズ焼き", "Tôm hùm Alaska nướng phomai", { tag: "must" }),
      it(240000, "scallop_spicy", "가리비 양념구이", "Grilled scallops with seasoning", "调味烤扇贝", "ホタテの味付け焼き", "Sò điệp nướng gia vị"),
      it(260000, "scallop_cheese", "가리비 치즈구이", "Cheese-baked scallops", "芝士焗扇贝", "ホタテのチーズ焼き", "Sò điệp nướng phomai"),
      it(240000, "bulot_boiled", "백골뱅이 숙회", "Boiled white whelks (sukhoe)", "白骨螺（焯熟）", "ばい貝の湯引き", "Ốc Bulot hấp"),
      it(280000, "bulot_mix", "백골뱅이 무침", "Spicy white whelk salad", "凉拌白骨螺", "ばい貝の甘辛和え", "Ốc Bulot trộn", { spicy: true }),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒类 · 饮料", "お酒・ドリンク", "Rượu · Đồ uống"),
    items: [
      it(140000, null, "쌀막걸리", "Rice wine (makgeolli)", "米酒（马格利）", "マッコリ", "Rượu gạo"),
      it(100000, null, "소주", "Soju", "烧酒", "焼酎（ソジュ）", "Soju"),
      it(120000, null, "보드카 멘", "Vodka Men", "Vodka Men 伏特加", "ウォッカ（Vodka Men）", "Vodkamen"),
      it(50000, null, "병맥주", "Bottled beer", "瓶装啤酒", "瓶ビール", "Bia chai"),
      it(60000, null, "삿포로 생맥주", "Sapporo draft beer", "札幌生啤", "サッポロ生ビール", "Bia tươi Sapporo"),
      it(20000, null, "콜라", "Coca-Cola", "可乐", "コーラ", "Coca"),
      it(20000, null, "환타", "Fanta", "芬达", "ファンタ", "Fanta"),
      it(20000, null, "스프라이트", "Sprite", "雪碧", "スプライト", "Sprite"),
    ],
  },
  {
    id: "sake",
    name: T("사케", "Sake", "清酒", "日本酒", "Sake"),
    items: [
      it(150000, null, "사케 미니", "Sake mini", "清酒迷你瓶", "日本酒ミニ", "Sake mini"),
      it(200000, null, "사케 홋칸", "Sake Hokkan", "北冠清酒", "日本酒 北冠", "Sake Hokkan", { unit: ML(300) }),
      it(900000, null, "사케 쿠보타", "Sake Kubota", "久保田清酒", "日本酒 久保田", "Sake Kubota", { unit: ML(720) }),
      it(720000, null, "사케 사와노츠루", "Sake Sawanotsuru", "泽之鹤清酒", "日本酒 沢の鶴", "Sake Sawanotsuru", { unit: ML(720) }),
    ],
  },
];
