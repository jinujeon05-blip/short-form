// 남매식당 Namme 하노이 한식당·남매술상·솥상 (107 CT5 Mỹ Đình, Từ Liêm, Hà Nội) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND (세금 별도)
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 드라이브 남매식당 폴더의 구글 지도 손님 사진(메뉴판 27장 중 메뉴 페이지 20여 장)
// 메뉴판에 한국어·베트남어가 있어 한·베는 그대로 쓰고(베트남어가 없는 항목은 새로 씀) 영어·중국어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "남매식당", en: "Namme", branch: { ko: "하노이", en: "Hà Nội" } },
  phone: "0356 836 114",
  address: "107 CT5 Mỹ Đình, Từ Liêm, Hà Nội",
  mapQuery: "남매식당 Namme 107 CT5 Mỹ Đình Từ Liêm Hà Nội",
  wifi: null, // 예: { ssid: "NAMME", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

// 크기 라벨 (분류마다 달라서 따로 만듦)
const L_S = T("소", "Small", "小", "小", "Nhỏ");
const L_M = T("중", "Medium", "中", "中", "Vừa");
const L_L = T("대", "Large", "大", "大", "Lớn");
const L_XL = T("특대", "Extra large", "特大", "特大", "Đặc biệt lớn");
const SML = (a, b, c) => [[L_S, a], [L_M, b], [L_L, c]]; // 소·중·대
const MLX = (a, b, c) => [[L_M, a], [L_L, b], [L_XL, c]]; // 중·대·특대
const ML = (a, b) => [[L_M, a], [L_L, b]]; // 중·대
// 탕·찜: 소(2인)·중(3인)·대(4인)
const PPL = (a, b, c) => [
  [T("소 (2인)", "Small (2 people)", "小（2人）", "小（2名様）", "Nhỏ (2 người)"), a],
  [T("중 (3인)", "Medium (3 people)", "中（3人）", "中（3名様）", "Vừa (3 người)"), b],
  [T("대 (4인)", "Large (4 people)", "大（4人）", "大（4名様）", "Lớn (4 người)"), c],
];
// 김치찜: 1인분·중·대
const JJ = (a, b, c) => [
  [T("1인분", "1 serving", "1人份", "1人前", "1 suất"), a],
  [L_M, b],
  [L_L, c],
];
// 간장게장: 소 1마리·중 3마리·대 5마리
const CRAB = (a, b, c) => [
  [T("소 1마리", "Small, 1 crab", "小 1只", "小 1杯", "Nhỏ 1 con"), a],
  [T("중 3마리", "Medium, 3 crabs", "中 3只", "中 3杯", "Vừa 3 con"), b],
  [T("대 5마리", "Large, 5 crabs", "大 5只", "大 5杯", "Lớn 5 con"), c],
];
const UNIT1 = T("1인분", "per serving", "每份", "1人前", "1 suất");

window.MENU = [
  {
    id: "sulsang",
    name: T("남매술상", "Namme Sulsang platters", "南妹酒桌（술상）", "ナムメ酒膳（スルサン）", "Mâm rượu (Sulsang)"),
    note: T(
      "한국 통영에서 직접 공수한 신선한 제철 해산물로 차린 모둠 안주 상이에요. 구성은 계절과 시장 상황에 따라 달라질 수 있어요.",
      "Assorted drinking-food platters made with fresh seasonal seafood brought directly from Tongyeong, Korea. Contents may change with the season and market conditions.",
      "使用从韩国统营直送的新鲜时令海鲜摆成的下酒拼盘。具体搭配可能因季节和市场情况而有所变动。",
      "韓国・統営から直送した新鮮な旬の海鮮で盛り付けた、おつまみの盛り合わせです。内容は季節や仕入れ状況により変わることがあります。",
      "Hải sản tươi nhập trực tiếp từ Tongyeong, Hàn Quốc; thành phần có thể thay đổi theo mùa."
    ),
    items: [
      it(null, "season", "남매 계절스페셜", "Namme seasonal special", "南妹季节特选", "ナムメ 季節スペシャル", "Set hải sản", {
        tag: "best",
        desc: T("홍어 + 보쌈 + 문어 + 갑오징어 + 제철해산물 2종", "Skate (hongeo) + bossam + octopus + cuttlefish + 2 kinds of seasonal seafood", "红鱼（홍어）+ 菜包肉（보쌈）+ 章鱼 + 墨鱼 + 2种时令海鲜", "ホンオ + ポッサム + タコ + コウイカ + 旬の海鮮2種", "Cá đuối muối + bosam + bạch tuộc + mực mai + 2 loại hải sản theo mùa"),
        sizes: MLX(1090000, 1390000, 1690000),
      }),
      it(null, "hongeo", "홍어삼합", "Hongeo samhap (fermented skate, boiled pork and kimchi)", "红鱼三合（홍어삼합）", "ホンオサンハプ（発酵エイ・茹で豚・キムチの盛り合わせ）", "Cá muối bosam", {
        desc: T("삭힌 홍어 + 수육 + 김치 모듬", "Fermented skate + boiled pork + kimchi platter", "发酵红鱼 + 白切肉 + 泡菜拼盘", "発酵させたエイ + 茹で豚 + キムチの盛り合わせ", "Cá đuối lên men + thịt heo luộc + kim chi"),
        sizes: SML(430000, 530000, 730000),
      }),
      it(null, "hongeo-octo", "홍어삼합+문어", "Hongeo samhap + octopus", "红鱼三合（홍어삼합）+ 章鱼", "ホンオサンハプ + タコ", "Cá muối bosam bạch tuộc", { sizes: SML(430000, 730000, 1030000) }),
      it(null, "mugu-bossam", "갑오징어+보쌈", "Cuttlefish + bossam", "墨鱼 + 菜包肉（보쌈）", "コウイカ + ポッサム", "Mực mai bosam", { sizes: SML(280000, 420000, 580000) }),
      it(null, "octo-bossam", "문어+보쌈", "Octopus + bossam", "章鱼 + 菜包肉（보쌈）", "タコ + ポッサム", "Bạch tuộc bosam", { sizes: SML(430000, 690000, 790000) }),
      it(null, "sepia-octo", "갑오징어+문어", "Cuttlefish + octopus", "墨鱼 + 章鱼", "コウイカ + タコ", "Mực mai bạch tuộc", { sizes: SML(490000, 750000, 950000) }),
      it(null, "combo", "문어+갑오징어+보쌈", "Octopus + cuttlefish + bossam", "章鱼 + 墨鱼 + 菜包肉（보쌈）", "タコ + コウイカ + ポッサム", "Bạch tuộc mực mai bosam", { sizes: SML(430000, 530000, 730000) }),
    ],
  },
  {
    id: "anju",
    name: T("안주", "Anju (drinking snacks)", "下酒菜（안주）", "おつまみ（アンジュ）", "Món nhắm"),
    items: [
      it(230000, null, "명란계란말이", "Rolled omelette with pollock roe (myeongran)", "明太鱼子蛋卷（명란계란말이）", "明太子入り卵焼き（ミョンナンケランマリ）", "Trứng cuộn trứng cá minh thái", { desc: T("계란말이 속 고소하고 짭조름한 명란", "Savory, lightly salty pollock roe inside a rolled omelette", "蛋卷里包着咸香的明太鱼子", "卵焼きの中に香ばしく塩気のある明太子", "Trứng cuộn bên trong có trứng cá minh thái béo, hơi mặn") }),
      it(230000, null, "육새우전", "Beef and shrimp jeon (yuk-saeu-jeon)", "牛肉虾饼拼盘（육새우전）", "牛肉とエビのジョン（ユクセウジョン）", "Bánh bò và tôm chiên", { desc: T("쫄깃한 육전과 통통한 새우전 한 접시", "A plate of chewy beef pancake and plump shrimp pancake", "一盘筋道的牛肉饼和饱满的虾饼", "もちもちの牛肉ジョンとぷりぷりのエビジョンを一皿に", "Một đĩa thịt bò chiên dai ngon và tôm chiên đầy đặn") }),
      it(230000, null, "왕새우전", "Jumbo shrimp jeon (wang-saeu-jeon)", "大虾饼（왕새우전）", "大エビのジョン（ワンセウジョン）", "Tôm lớn chiên", { desc: T("오동통한 새우 부침", "Pan-fried plump shrimp", "饱满多汁的煎虾", "ふっくらしたエビの焼きもの", "Tôm to mập chiên giòn") }),
      it(230000, null, "육전", "Beef jeon (yukjeon, pan-fried beef)", "牛肉饼（육전）", "牛肉のジョン（ユクジョン）", "Bò chiên trứng", { desc: T("쫄깃한 소고기 부침", "Chewy pan-fried beef", "筋道的煎牛肉", "もちもちの牛肉の焼きもの", "Thịt bò chiên trứng dai ngon") }),
      it(230000, null, "굴전", "Oyster jeon (gul-jeon)", "牡蛎饼（굴전）", "牡蠣のジョン（クルジョン）", "Hàu chiên trứng", { desc: T("굴의 감칠맛으로 더 고소한", "Extra savory with the rich flavor of oysters", "牡蛎的鲜味让它更香", "牡蠣のうま味でいっそう香ばしい", "Vị ngọt đậm của hàu làm món thêm béo ngậy") }),
      it(230000, null, "어묵탕", "Fish cake soup (eomuk-tang)", "鱼饼汤（어묵탕）", "おでん鍋（オムクタン）", "Lẩu chả cá", { desc: T("시원하고 얼큰한 국물", "Refreshing, spicy-hot broth", "清爽微辣的汤底", "さっぱりと辛みのあるスープ", "Nước dùng thanh mát, hơi cay") }),
      it(150000, null, "부추전", "Chive pancake (buchu-jeon)", "韭菜饼（부추전）", "ニラチヂミ（プチュジョン）", "Bánh xèo hẹ", { desc: T("겉은 바삭 속은 쫄깃하고 고소한", "Crispy outside, chewy and savory inside", "外酥内韧，香气十足", "外はカリッと、中はもちもちで香ばしい", "Vỏ giòn, bên trong dai và béo thơm") }),
      it(400000, null, "순대볶음", "Stir-fried sundae (sundae-bokkeum, Korean blood sausage)", "辣炒血肠（순대볶음）", "スンデ炒め（ピリ辛）", "Dồi nướng xào cay", { spicy: true, desc: T("순대에 갖은 채소를 넣어 매콤하게 볶아낸 술안주", "Korean sausage stir-fried spicy with assorted vegetables, a perfect drinking snack", "血肠加入多种蔬菜辣炒而成的下酒菜", "スンデにいろいろな野菜を加えてピリ辛に炒めたおつまみ", "Dồi Hàn Quốc xào cay cùng nhiều loại rau, rất hợp để nhắm rượu") }),
    ],
  },
  {
    id: "jjim",
    name: T("탕 · 찜", "Stews & braises", "汤 · 炖菜", "鍋・チム（蒸し煮）", "Lẩu · Hầm"),
    items: [
      it(null, "gamjatang", "감자탕", "Gamjatang (pork bone and potato stew)", "土豆猪骨汤（감자탕）", "カムジャタン（豚骨とじゃがいもの鍋）", "Canh xương heo hầm khoai tây", {
        desc: T("뼈마디 사이에 붙은 고기를 발라 먹는 재미 (뼈 추가 300,000₫)", "Part of the fun is picking the meat from between the bones (extra bones 300,000₫)", "细细剔下骨缝间的肉来吃，别有乐趣（加骨 300,000₫）", "骨の間についた肉をほぐして食べる楽しみ（骨の追加 300,000₫）", "Thú vị khi gỡ thịt giữa các khúc xương (thêm xương 300.000₫)"),
        sizes: PPL(500000, 600000, 700000),
      }),
      it(null, "kimchijjim", "통삼겹 김치찜", "Braised kimchi with whole pork belly (kimchi-jjim)", "整块五花肉炖泡菜（김치찜）", "豚バラ塊のキムチチム（煮込み）", "Kim chi hầm thịt heo", { tag: "must", sizes: JJ(220000, 470000, 570000) }),
      it(null, null, "등갈비 김치찜", "Braised kimchi with pork ribs (kimchi-jjim)", "排骨炖泡菜（김치찜）", "スペアリブのキムチチム（煮込み）", "Kim chi hầm sườn heo", { sizes: JJ(220000, 470000, 570000) }),
      it(null, null, "스팸 김치찜", "Braised kimchi with Spam (kimchi-jjim)", "午餐肉炖泡菜（김치찜）", "スパム入りキムチチム（煮込み）", "Kim chi hầm spam", { sizes: JJ(250000, 480000, 580000) }),
      it(null, "galbijjim", "소갈비찜", "Braised beef short ribs (galbi-jjim)", "炖牛排骨（갈비찜）", "牛カルビチム（牛カルビの蒸し煮）", "Sườn bò hầm", {
        desc: T("부드럽고 쫄깃한 소갈비찜, 조리 시간 30분~1시간", "Tender, chewy braised beef short ribs; cooking time 30 min to 1 hour", "软嫩筋道的炖牛排骨，烹饪时间约 30 分钟至 1 小时", "柔らかくもちもちの牛カルビチム。調理時間は30分〜1時間", "Sườn bò hầm mềm, dai; thời gian nấu 30 phút đến 1 giờ"),
        sizes: ML(800000, 1200000),
      }),
      it(null, "galbijjim", "매운 소갈비찜", "Spicy braised beef short ribs (galbi-jjim)", "辣炖牛排骨（갈비찜）", "辛口牛カルビチム", "Sườn bò hầm cay", { spicy: true, sizes: ML(800000, 1200000) }),
    ],
  },
  {
    id: "osam",
    name: T("오삼불고기", "Osam bulgogi (pork & squid)", "鱿鱼五花肉烤肉（오삼불고기）", "オサムプルコギ（イカと豚バラ）", "Ba chỉ heo xào mực"),
    items: [
      it(null, "osam", "남매 오삼불고기", "Namme osam bulgogi (spicy stir-fried pork belly and squid)", "南妹鱿鱼五花肉（오삼불고기）", "ナムメ オサムプルコギ（イカと豚バラの辛口炒め）", "Ba chỉ heo xào mực", { tag: "best", spicy: true, sizes: ML(530000, 630000) }),
      it(150000, null, "오징어 100g 추가", "Extra squid 100g", "加鱿鱼 100g", "イカ追加 100g", "Thêm mực 100g"),
      it(130000, null, "삼겹살 100g 추가", "Extra pork belly 100g", "加五花肉 100g", "豚バラ追加 100g", "Thêm ba chỉ 100g"),
      it(40000, null, "소면 100g 추가", "Extra thin wheat noodles (somyeon) 100g", "加细面（소면）100g", "そうめん追加 100g", "Thêm mì 100g"),
      it(50000, null, "볶음밥", "Fried rice (bokkeumbap)", "炒饭（볶음밥）", "チャーハン（ポックンパプ）", "Cơm rang"),
    ],
  },
  {
    id: "meat",
    name: T("고기", "Grilled meat", "烤肉", "焼肉", "Món thịt nướng"),
    items: [
      it(250000, null, "삼겹살 (200g)", "Samgyeopsal (pork belly, 200g)", "五花肉（삼겹살，200g）", "サムギョプサル（豚バラ、200g）", "Ba chỉ nướng (200g)", { unit: UNIT1 }),
      it(250000, null, "항정살 (200g)", "Hangjeongsal (pork jowl, 200g)", "猪颈肉（항정살，200g）", "ハンジョンサル（豚のトロ、200g）", "Gáy heo (Hangjeongsal) (200g)", { unit: UNIT1 }),
      it(250000, null, "돼지갈비 (280g)", "Marinated pork ribs (dwaeji-galbi, 280g)", "腌猪排骨（돼지갈비，280g）", "豚カルビ（味付け、280g）", "Sườn heo (280g)", { unit: UNIT1 }),
      it(300000, null, "소갈비살 (200g)", "Beef rib meat (so-galbisal, 200g)", "牛肋条肉（소갈비살，200g）", "牛カルビ肉（ソカルビサル、200g）", "Thịt sườn bò (200g)", { unit: UNIT1 }),
      it(380000, null, "LA갈비 (300g)", "LA galbi (cross-cut beef short ribs, 300g)", "LA牛排骨（LA갈비，300g）", "LAカルビ（牛骨付きカルビ、300g）", "Sườn bò LA (300g)", { tag: "must", unit: UNIT1 }),
    ],
  },
  {
    id: "meal",
    name: T("식사", "Meals", "主食", "お食事", "Món ăn chính"),
    note: T(
      "모든 식사에 정갈한 반찬 한 상이 무료로 제공돼요.",
      "Every meal comes with a set of side dishes (banchan) free of charge.",
      "所有主食均免费附赠一桌精致小菜。",
      "すべてのお食事に、おかず（パンチャン）一式が無料で付きます。",
      "Tặng kèm các món ăn kèm."
    ),
    items: [
      it(null, null, "간장게장 정식", "Ganjang-gejang set (soy-marinated raw crab)", "酱油蟹套餐（간장게장 정식）", "カンジャンケジャン定食（生ガニの醤油漬け）", "Cua ngâm xì dầu (Ganjang-gejang)", { tag: "best", sizes: CRAB(270000, 600000, 800000) }),
      it(170000, null, "게 추가 (1마리)", "Extra crab (1 crab)", "加蟹（1只）", "カニ追加（1杯）", "Thêm cua (1 con)"),
      it(230000, null, "보쌈 정식 (1인)", "Bossam set (1 person)", "菜包肉套餐（보쌈 정식，1人）", "ポッサム定食（1人前）", "Cơm bosam (1 người)"),
      it(200000, null, "뼈해장국", "Pork bone hangover soup (ppyeo-haejangguk)", "猪骨醒酒汤（뼈해장국）", "豚骨ヘジャンクク（酔い覚ましスープ）", "Canh xương lợn", { tag: "best" }),
      it(170000, null, "장터국밥", "Jangteo gukbap (beef and napa cabbage soup with rice)", "集市汤饭（장터국밥，牛肉白菜）", "チャンターグッパ（牛肉と白菜のスープごはん）", "Canh thịt bò cải thảo"),
      it(170000, null, "설렁탕", "Seolleongtang (ox bone soup)", "雪浓汤（설렁탕）", "ソルロンタン（牛骨スープ）", "Canh mì thịt bò"),
      it(200000, null, "뚝배기 불고기", "Bulgogi in a clay pot (ttukbaegi bulgogi)", "砂锅烤肉（뚝배기 불고기）", "土鍋プルコギ（トゥッペギプルコギ）", "Thịt bò xào nồi đất"),
      it(200000, null, "제육볶음", "Jeyuk-bokkeum (spicy stir-fried pork)", "辣炒猪肉（제육볶음）", "ジェユクポックム（豚肉の辛口炒め）", "Thịt heo xào cay", { tag: "best", spicy: true }),
      it(180000, null, "오징어볶음", "Ojingeo-bokkeum (spicy stir-fried squid)", "辣炒鱿鱼（오징어볶음）", "イカ炒め（オジンオポックム、辛口）", "Mực ống xào cay", { spicy: true }),
      it(220000, null, "고등어구이", "Grilled mackerel (godeungeo-gui)", "烤鲭鱼（고등어구이）", "サバの塩焼き（コドゥンオグイ）", "Cá thu nướng"),
      it(150000, null, "계란말이", "Rolled omelette (gyeran-mari)", "蛋卷（계란말이）", "卵焼き（ケランマリ）", "Trứng cuộn"),
      it(120000, null, "스팸+계란후라이", "Spam and fried egg", "午餐肉 + 煎蛋", "スパム + 目玉焼き", "Spam & trứng ốp"),
      it(170000, null, "김치찌개", "Kimchi stew (kimchi-jjigae)", "泡菜汤（김치찌개）", "キムチチゲ", "Canh kimchi"),
      it(170000, null, "꽁치 김치찌개", "Kimchi stew with saury (kkongchi kimchi-jjigae)", "秋刀鱼泡菜汤（꽁치 김치찌개）", "サンマ入りキムチチゲ（コンチキムチチゲ）", "Canh kimchi cá"),
      it(170000, null, "순두부찌개", "Soft tofu stew (sundubu-jjigae)", "嫩豆腐汤（순두부찌개）", "スンドゥブチゲ（やわらか豆腐鍋）", "Canh đậu hũ non"),
    ],
  },
  {
    id: "lunch",
    name: T("점심 · 면", "Lunch & noodles", "午餐 · 面食", "ランチ・麺", "Món trưa · Mì"),
    items: [
      it(140000, null, "냉모밀", "Naeng-momil (cold buckwheat soba noodles)", "冷荞麦面（냉모밀）", "冷たいそば（ネンモミル）", "Mỳ lúa mạch"),
      it(140000, null, "콩국수 (계절 메뉴)", "Kongguksu (cold soy milk noodles, seasonal)", "豆浆冷面（콩국수，季节限定）", "コングクス（冷たい豆乳麺、季節限定）", "Mỳ đậu (món theo mùa)"),
      it(140000, null, "열무국수", "Yeolmu-guksu (young radish kimchi noodles in broth)", "小萝卜泡菜汤面（열무국수）", "ヨルムグクス（若大根キムチの汁麺）", "Mỳ lạnh kimchi củ cải"),
      it(140000, null, "열무비빔국수", "Yeolmu bibim-guksu (spicy mixed noodles with young radish kimchi)", "小萝卜泡菜拌面（열무비빔국수）", "ヨルムビビムグクス（若大根キムチの和え麺）", "Mỳ trộn kimchi củ cải", { spicy: true }),
      it(140000, null, "잔치국수", "Janchi-guksu (banquet noodles in anchovy broth)", "喜宴汤面（잔치국수）", "チャンチグクス（宴会そうめん）", "Mỳ janchi"),
      it(120000, null, "물냉면 / 비빔냉면", "Mul-naengmyeon / Bibim-naengmyeon (cold noodles in broth / spicy mixed cold noodles)", "冷面汤 / 拌冷面（물냉면 / 비빔냉면）", "水冷麺／ビビン冷麺（ムルネンミョン／ビビンネンミョン）", "Mì lạnh"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒水 · 饮料", "お酒・ドリンク", "Rượu · Đồ uống"),
    items: [
      it(150000, null, "소주 (참이슬·처음처럼·진로·새로·좋은데이)", "Soju (Chamisul, Chum-churum, Jinro, Saero, Good Day)", "烧酒（真露·初饮初乐·Jinro·Saero·好日子）", "焼酎（チャミスル・チョウムチョロム・ジンロ・セロ・チョウンデイ）", "Rượu soju"),
      it(60000, null, "맥주 (타이거·사이공)", "Beer (Tiger / Saigon)", "啤酒（虎牌 / 西贡）", "ビール（タイガー／サイゴン）", "Bia"),
      it(60000, null, "삿포로 생맥주 350ml", "Sapporo draft beer 350 ml", "札幌生啤 350ml", "サッポロ生ビール 350ml", "Bia tươi Sapporo"),
      it(99000, null, "하이볼 350ml (짐빔 하이볼)", "Highball 350 ml (Jim Beam highball)", "高球鸡尾酒 350ml（占边高球）", "ハイボール 350ml（ジムビームハイボール）", "Highball"),
      it(160000, null, "막걸리", "Makgeolli (Korean rice wine)", "米酒（막걸리）", "マッコリ", "Rượu gạo"),
      it(20000, null, "음료 (콜라·제로콜라·스프라이트·환타)", "Soft drinks (Coke, Coke Zero, Sprite, Fanta)", "饮料（可乐·零度可乐·雪碧·芬达）", "ソフトドリンク（コーラ・コーラゼロ・スプライト・ファンタ）", "Nước ngọt"),
    ],
  },
];
