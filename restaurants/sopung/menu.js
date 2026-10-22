// 소풍 SOPUNG 한식당·숯불구이 (3 Võ Cường 12, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND, 부가세 별도
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "소풍" 폴더의 구글 지도 캡처 10장 — 가게 계정(소풍)이 6~7개월 전 올린 메뉴판 5면(대표메뉴·숯불구이 돼지·소고기와 장어·국물류와 식사류·중국어/영어판),
//   가게 계정이 8개월 전 올린 제육볶음 사진, 간판·외관 사진, 지도 정보.
// 메뉴판에 한국어·베트남어(·중국어·영어)가 있어 한·베는 그대로 쓰고 영어·중국어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "소풍", en: "Sopung", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0969 964 006",
  address: "3 Đ. Võ Cường 12, Võ Cường, Bắc Ninh",
  mapQuery: "소풍 Nhà hàng Hàn Quốc Sopung Bắc Ninh",
  wifi: null, // 예: { ssid: "SOPUNG", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const g = (n) => `${n}g`;
const P23 = T("2~3인", "2–3 people", "2-3人份", "2〜3名", "2–3 người");
const P34 = T("3~4인", "3–4 people", "3-4人份", "3〜4名", "3–4 người");
const NOTE_GRILL = T("2인분 이상 주문할 수 있어요. 구이를 주문하면 찜김치·고사리·콩나물이 기본으로 나와요.", "Order for 2 or more people. Steamed kimchi, bracken and bean sprouts come free with any grilled dish.", "烤肉需点 2 人份以上。点任何烤肉都会免费附送蒸泡菜、蕨菜和豆芽。", "2名様分以上でご注文ください。焼き物を注文すると蒸しキムチ・ワラビ・もやしが付きます。", "Gọi từ 2 người trở lên. Gọi món nướng được tặng kim chi hấp, dương xỉ và giá đỗ.");

window.MENU = [
  {
    id: "signature",
    name: T("대표메뉴", "Signature dishes", "招牌菜", "看板メニュー", "Món đặc trưng"),
    items: [
      it(600000, "byeongeo", "병어조림", "Spicy braised pomfret (byeongeo-jorim)", "辣炖鲳鱼（병어조림）", "マナガツオの辛煮付け（ピョンオジョリム）", "Cá chim bạc kho cay", { tag: "must", spicy: true }),
      it(500000, "bossam", "보쌈", "Bossam (boiled pork wraps)", "菜包肉（보쌈）", "ポッサム（茹で豚の包み）", "Thịt hấp cuốn rau", { desc: T("홍어 추가 +300,000₫", "Add skate (hongeo) +300,000₫", "加发酵鳐鱼（홍어）+300,000₫", "ホンオ（発酵エイ）追加 +300,000₫", "Thêm cá đuối lên men +300,000₫") }),
      it(840000, "agwi", "아귀찜", "Spicy steamed monkfish (agwi-jjim)", "辣蒸鮟鱇鱼（아귀찜）", "アンコウの辛蒸し（アグィチム）", "Cá vây chân hấp cay", { spicy: true }),
      it(340000, "ojingeo", "오징어볶음", "Spicy stir-fried squid", "辣炒鱿鱼", "イカ炒め（辛口）", "Mực xào cay", { spicy: true }),
      it(280000, "pajeon", "해물파전", "Seafood pajeon (savory pancake)", "海鲜葱饼（해물파전）", "海鮮チヂミ（ヘムルパジョン）", "Bánh hải sản"),
      it(320000, "dakbal", "무뼈닭발 + 주먹밥", "Boneless spicy chicken feet + rice balls", "无骨鸡爪 + 饭团", "骨なし鶏足の辛炒め＋おにぎり", "Chân gà không xương + cơm nắm", { spicy: true }),
      it(340000, "jjukkumi", "쭈꾸미볶음", "Spicy stir-fried baby octopus (jjukkumi)", "辣炒小章鱼（쭈꾸미）", "イイダコ炒め（チュクミポックン）", "Bạch tuộc nhỏ xào cay", { spicy: true }),
      it(280000, "komak", "꼬막무침", "Seasoned cockles (spicy)", "凉拌血蚶（꼬막무침）", "赤貝の和え物（コマクムチム）", "Sò huyết trộn cay", { spicy: true }),
      it(600000, "gaori", "가오리찜", "Spicy steamed skate wing (gaori-jjim)", "辣蒸鳐鱼（가오리찜）", "エイの辛蒸し（カオリチム）", "Cá đuối hấp", { spicy: true }),
      it(280000, "jeyuk", "제육볶음", "Spicy stir-fried pork (jeyuk-bokkeum)", "辣炒猪肉", "豚肉の辛口炒め（チェユクポックン）", "Thịt heo xào cay", { spicy: true }),
    ],
  },
  {
    id: "pork",
    name: T("숯불구이 · 돼지고기", "Charcoal grill · Pork", "炭火烤肉 · 猪肉", "炭火焼き・豚肉", "Thịt heo nướng than"),
    note: NOTE_GRILL,
    items: [
      it(130000, "hangjeong", "항정살", "Pork jowl (hangjeongsal)", "雪花猪肉（항정살）", "豚トロ（ハンジョンサル）", "Má heo", { unit: g(130) }),
      it(540000, "dwitgogi", "뒷고기 세트", "Special assorted pork set (dwitgogi)", "特色猪肉拼盘（뒷고기）", "特選豚肉盛り合わせ（トゥィッコギ）", "Set thịt heo nướng đặc biệt", { unit: g(550) }),
      it(140000, "ogyeop", "꼬들 생오겹살", "Fresh pork belly with skin (kkodeul-ogyeopsal)", "生五花肉（带皮）", "生オギョプサル（皮付き三枚肉）", "Ba chỉ heo tươi", { unit: g(130) }),
      it(140000, "daepae", "대패 삼겹살", "Thinly sliced pork belly", "刨子五花肉", "薄切りサムギョプサル", "Ba chỉ heo mỏng", { unit: g(130) }),
      it(160000, "gochujang", "고추장 삼겹살", "Gochujang-marinated pork belly", "辣酱五花肉", "コチュジャン味付けサムギョプサル", "Ba chỉ heo nướng sốt tương ớt", { unit: g(130), spicy: true }),
      it(220000, "seokgalbi", "석갈비", "Charcoal-grilled pork ribs (seok-galbi)", "炭烤猪排骨（석갈비）", "豚カルビ焼き（ソッカルビ）", "Sườn heo nướng", { unit: g(250) }),
    ],
  },
  {
    id: "beef",
    name: T("숯불구이 · 소고기 · 장어", "Charcoal grill · Beef & eel", "炭火烤肉 · 牛肉 · 鳗鱼", "炭火焼き・牛肉・うなぎ", "Bò & lươn nướng than"),
    note: NOTE_GRILL,
    items: [
      it(null, "eel", "민물장어", "Freshwater eel (grilled)", "烤淡水鳗鱼", "淡水うなぎの炭火焼き", "Lươn nước ngọt nướng", { sizes: [["500g", 700000], ["1kg", 1200000]] }),
      it(600000, "kkotsal", "꽃살 (미국 프라임)", "US Prime boneless short rib (kkotsal)", "美国 Prime 去骨牛小排（꽃살）", "米国産プライム 骨なしカルビ（コッサル）", "Sườn bò rút xương Mỹ", { unit: g(160) }),
      it(420000, "anchang", "안창살 (미국 프라임)", "US Prime outside skirt steak (anchangsal)", "美国 Prime 牛横膈膜（안창살）", "米国産プライム アンチャンサル", "Thịt diềm thăn ngoài Mỹ", { unit: g(160) }),
      it(240000, "chadol", "차돌박이", "Beef brisket slices (chadolbaegi)", "牛胸腹薄片（차돌박이）", "チャドルバギ（牛バラ薄切り）", "Gầu bò", { unit: g(150) }),
      it(1150000, "premium", "프리미엄 소고기 세트", "Premium beef set (US)", "美国顶级牛肉拼盘", "プレミアム牛肉セット（米国産）", "Set bò thượng hạng Mỹ", { unit: g(500) }),
      it(300000, "sogalbi", "소갈비살", "Beef rib finger meat (sogalbisal)", "牛肋条肉（소갈비살）", "牛カルビ肉（ソガルビサル）", "Rẻ sườn bò", { unit: g(150) }),
      it(300000, "yukhoe", "육회 (특선요리)", "Beef tartare (yukhoe) · special dish", "生拌牛肉（육회）· 特选料理", "ユッケ（特選料理）", "Thịt bò sống"),
    ],
  },
  {
    id: "stew",
    name: T("국물 · 전골", "Stews & hot pots", "汤 · 火锅", "鍋・チゲ", "Canh & Lẩu"),
    note: T("2~3인 기준이에요.", "Serves 2–3 people.", "2-3 人份。", "2〜3名様分です。", "Phần cho 2–3 người."),
    items: [
      it(null, "sundubu", "해물순두부", "Seafood soft tofu stew (sundubu)", "海鲜嫩豆腐汤", "海鮮スンドゥブ", "Canh đậu hũ non hải sản", { spicy: true, sizes: [[P23, 240000], [P34, 290000]] }),
      it(200000, "eomuk", "칼칼한 어묵탕", "Spicy fish cake soup", "鱼饼汤", "ピリ辛おでん鍋", "Canh chả cá", { spicy: true }),
      it(600000, "suji", "스지수육전골", "Beef tendon & boiled pork hot pot", "牛筋白肉火锅", "牛すじと茹で豚の鍋", "Lẩu gân bò thịt heo"),
      it(300000, "kimchijeongol", "돼지고기김치전골", "Pork & kimchi hot pot", "泡菜猪肉火锅", "豚肉キムチ鍋", "Lẩu kim chi thịt heo", { spicy: true }),
      it(320000, "hobak", "호박고추장찌개", "Zucchini gochujang stew", "南瓜辣酱汤", "ズッキーニのコチュジャンチゲ", "Canh bí ngòi nấu tương ớt", { spicy: true }),
      it(450000, "bulgogi", "옛맛서울불고기", "Traditional Seoul-style bulgogi hot pot", "首尔传统烤牛肉火锅", "ソウル風プルコギ鍋", "Thịt bò xào nước tương"),
    ],
  },
  {
    id: "meal",
    name: T("식사류", "Meals", "主食", "お食事", "Món chính"),
    items: [
      it(180000, "boribibim", "보리비빔밥", "Barley bibimbap", "大麦拌饭", "麦ビビンバ", "Cơm trộn lúa mạch", { tag: "must" }),
      it(180000, "dolsot", "돌솥비빔밥", "Stone bowl bibimbap", "石锅拌饭", "石焼ビビンバ", "Cơm thố đá trộn"),
      it(180000, "tteokmandu", "떡만둣국", "Rice cake & dumpling soup", "年糕饺子汤", "トックマンドゥクク（餅入り餃子スープ）", "Canh bánh gạo & há cảo"),
      it(180000, "hwangtae", "황태탕", "Dried pollack soup (hwangtae-tang)", "黄太鱼汤", "干しスケトウダラのスープ（ファンテタン）", "Canh cá minh thái khô"),
      it(150000, "cheonggukjang", "청국장", "Cheonggukjang (fermented soybean stew)", "清麴酱汤（청국장）", "チョングッチャン（納豆チゲ）", "Canh tương đậu lên men", { tag: "must" }),
      it(180000, "seolleong", "설렁탕", "Seolleongtang (ox bone soup)", "雪浓汤", "ソルロンタン", "Canh xương bò hầm"),
      it(180000, "yukgaejang", "육개장", "Yukgaejang (spicy beef soup)", "辣牛肉汤", "ユッケジャン", "Canh thịt bò cay", { spicy: true }),
      it(180000, "sujebi", "검은콩 들깨수제비", "Black bean & perilla seed sujebi (hand-pulled dough soup)", "黑豆紫苏籽面片汤", "黒豆エゴマスジェビ（手ちぎり麺スープ）", "Canh bánh bột mì nấu mè"),
    ],
  },
  {
    id: "dessert",
    name: T("후식 · 밥", "Rice & noodles", "饭 · 面食", "ご飯・麺", "Cơm & mì"),
    items: [
      it(20000, "gongibap", "공기밥", "Steamed rice", "米饭", "ご飯", "Cơm trắng"),
      it(60000, "bibimguksu", "비빔국수", "Spicy bibim noodles", "拌面", "ビビン麺", "Bún trộn cay Hàn Quốc", { spicy: true }),
      it(60000, "dosirak", "옛날도시락", "Old-fashioned lunchbox (yetnal-dosirak)", "怀旧便当", "昔ながらのお弁当", "Cơm hộp truyền thống Hàn Quốc"),
      it(100000, "mulnaeng", "물냉면", "Mul-naengmyeon (cold noodles in broth)", "水冷面", "水冷麺", "Miến nhỏ (nước)"),
      it(100000, "bibimnaeng", "비빔냉면", "Bibim-naengmyeon (spicy cold noodles)", "拌冷面", "ビビン冷麺", "Miến nhỏ (trộn)", { spicy: true }),
    ],
  },
];
