// 장어랑 고기랑 JANG O LANG (Lô 26TT4, P. Trần Văn Lai, Từ Liêm, Hà Nội) 장어구이·꼼장어·숯불고기 한식당 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "장어랑 고기랑" 폴더의 구글 지도 캡처 22장(가게 계정이 올린 메뉴판 이미지 — 점심 특선 세트·점심 식사·전골류, 손님이 1~2년 전 올린 인쇄 메뉴책, 간판·지도 정보).
// 메뉴판에 한국어·베트남어가 있어 그대로 쓰고 영어·중국어·일본어는 새로 옮김. 같은 메뉴가 여러 판에 있으면 가장 최근 판의 가격을 씀.
window.RESTAURANT = {
  brand: { ko: "장어랑 고기랑", en: "Jang O Lang", branch: { ko: "하노이", en: "Hà Nội" } },
  phone: "0377 522 243",
  address: "Lô 26TT4, P. Trần Văn Lai, Từ Liêm, Hà Nội",
  mapQuery: "장어랑 고기랑 Jang O Lang",
  wifi: null, // 예: { ssid: "JANGOLANG", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const G = (n) => T(`${n}g`, `${n}g`, `${n}克`, `${n}g`, `${n}g`);
const SIZE = (a, b) => [[T("중", "M", "中", "中", "Vừa"), a], [T("대", "L", "大", "大", "Lớn"), b]];
const KG = (a, b) => [[T("1kg", "1kg", "1公斤", "1kg", "1kg"), a], [T("500g", "500g", "500克", "500g", "500g"), b]];
const OLD = T("2년 전 메뉴판 기준", "Based on a menu from 2 years ago", "依据2年前的菜单", "2年前のメニュー基準", "Theo thực đơn 2 năm trước");

window.MENU = [
  {
    id: "set",
    name: T("점심 특선 세트", "Lunch special sets", "午餐特选套餐", "ランチ特選セット", "Set ăn trưa đặc biệt"),
    items: [
      it(290000, "set-galbi", "숯불 갈비살 세트", "Charcoal-grilled galbi-sal set (with stew)", "炭火牛排骨肉套餐（含炖汤）", "炭火カルビサルセット（チゲ付き）", "Set sườn nướng than hoa", { desc: T("숯불 갈비살 + 찌개", "Charcoal-grilled galbi-sal + stew", "炭火牛排骨肉 + 炖汤", "炭火カルビサル + チゲ", "Sườn nướng than hoa + canh") }),
      it(220000, "set-pork", "돼지고기 세트", "Pork set", "猪肉套餐", "豚肉セット", "Set thịt heo", { desc: T("삼겹살 / 항정살 중 선택", "Choice of samgyeopsal or hangjeongsal", "五花肉 / 猪颈肉 任选", "サムギョプサル / ハンジョンサル 選択", "Thịt ba chỉ / Thịt vai") }),
      it(340000, "set-anchang", "숯불 안창살 세트", "Charcoal-grilled anchang-sal (skirt) set", "炭火牛横膈膜套餐", "炭火アンチャンサル（ハラミ）セット", "Set diềm thăn bò nướng than hoa"),
      it(200000, "set-daepae", "대패삼겹살 세트", "Thin-sliced pork belly (daepae) set", "薄切五花肉套餐", "薄切りサムギョプサルセット", "Set thịt ba chỉ thái lát mỏng"),
    ],
  },
  {
    id: "pork",
    name: T("숯불 돼지고기", "Charcoal-grilled pork", "炭火猪肉", "炭火焼き豚肉", "Thịt heo nướng than hoa"),
    items: [
      it(220000, "p-prime", "프라임 통삼겹살 (옌바이 흑돼지)", "Prime whole pork belly (Yên Bái black pig)", "特级整块五花肉（安沛黑猪）", "プライム 厚切りサムギョプサル（イェンバイ黒豚）", "Thịt ba chỉ Prime (heo rừng Yên Bái)", { unit: G(180) }),
      it(250000, "p-daepae", "흑돼지 대패삼겹살", "Black-pig thin-sliced pork belly (2+ people)", "黑猪薄切五花肉（2人以上）", "黒豚 薄切りサムギョプサル（2名様から）", "Thịt ba chỉ lợn đen thái lát mỏng (>2 suất)", { desc: T("신김치 + 콩나물 포함, 2인 이상", "With sour kimchi & bean sprouts, 2+ people", "含酸泡菜和豆芽，2人以上", "古漬けキムチ・もやし付き、2名様から", "Kèm kim chi + giá đỗ, từ 2 người") }),
      it(230000, "p-hangjeong", "항정살", "Pork jowl (hangjeong-sal)", "猪颈肉", "豚トロ（ハンジョンサル）", "Má heo"),
      it(250000, "p-galbi", "양념 돼지갈비 (옌바이 흑돼지)", "Marinated pork ribs (Yên Bái black pig)", "酱腌猪排骨（安沛黑猪）", "味付け豚カルビ（イェンバイ黒豚）", "Sườn ướp gia vị (heo rừng Yên Bái)", { unit: G(200) }),
      it(200000, "p-smoked", "훈제 삼겹살", "Smoked pork belly (2+ people)", "烟熏五花肉（2人以上）", "燻製サムギョプサル（2名様から）", "Ba chỉ lợn hun khói (>2 suất)", { unit: G(150), desc: OLD }),
      it(200000, "p-jeyuk", "얼얼 제육볶음", "Fiery spicy stir-fried pork (jeyuk-bokkeum)", "香辣炒猪肉（제육볶음）", "ピリ辛豚肉炒め（チェユクポックム）", "Nạc vai giòn xào sốt cay", { spicy: true, desc: OLD }),
      it(200000, "p-bulgogi", "흑돼지 돼지불고기", "Black-pig pork bulgogi", "黑猪猪肉烤肉", "黒豚のプルコギ", "Bulgogi heo đen", { desc: OLD }),
    ],
  },
  {
    id: "beef",
    name: T("숯불 소고기", "Charcoal-grilled beef", "炭火牛肉", "炭火焼き牛肉", "Thịt bò nướng than hoa"),
    items: [
      it(590000, "b-kkotsal", "꽃살 (진갈비살)", "Kkot-sal (boneless short rib)", "花排肉（无骨牛小排）", "コッサル（骨なしカルビ）", "Sườn bò không xương (Thịt sườn bò)", { unit: G(150) }),
      it(450000, "b-anchang", "안창살 (7일 숙성)", "Anchang-sal (outside skirt), 7-day aged", "牛横膈膜（熟成7天）", "アンチャンサル（7日熟成）", "Diềm thăn bò (ướp 7 ngày)"),
      it(380000, "b-anchang-m", "양념 안창살", "Marinated anchang-sal (skirt)", "酱腌牛横膈膜", "味付けアンチャンサル", "Diềm thăn bò gia vị"),
      it(400000, "b-la", "LA갈비 (7일 숙성)", "LA galbi (cross-cut short rib), 7-day aged", "LA牛排骨（熟成7天）", "LAカルビ（7日熟成）", "Sườn bò LA (ướp 7 ngày)", { unit: G(200) }),
      it(350000, "b-galbisal", "갈비살 (7일 숙성)", "Galbi-sal (rib finger meat), 7-day aged", "牛肋条肉（熟成7天）", "カルビサル（7日熟成）", "Dẻ sườn bò (ướp 7 ngày)", { unit: G(170) }),
      it(280000, "b-bulgogi", "즉석 소불고기", "Table-side beef bulgogi (2+ people)", "现炒牛肉烤肉（2人以上）", "牛プルコギ（2名様から）", "Thịt bò xào bulgogi (>2 suất)"),
      it(450000, "b-yukhoe", "육회 (홍두깨살)", "Beef tartare (yukhoe, eye of round)", "生拌牛肉（牛腱子心）", "ユッケ（牛もも肉）", "Gỏi thịt bò (thịt mông bò)", { unit: G(200) }),
      it(490000, "b-wanggalbi", "특선 왕갈비 (양념)", "Special wang-galbi (marinated beef ribs)", "特选大排骨（腌制）", "特選ワンカルビ（味付け）", "Sườn cuộn hoàng đế (ướp gia vị)", { unit: G(220) }),
      it(650000, "b-jjim", "동인동 찜갈비", "Dongin-dong braised spicy short ribs", "东仁洞辣炖排骨", "トンインドン風カルビチム（辛口）", "Sườn om cay", { spicy: true, desc: T("2~3인분", "2–3 servings", "2～3人份", "2〜3人前", "2–3 người ăn") }),
    ],
  },
  {
    id: "eel",
    name: T("장어 · 꼼장어", "Eel & kkomjangeo", "鳗鱼 · 盲鳗", "うなぎ・コムジャンオ", "Cá chình · Lươn"),
    note: T(
      "꼼장어는 재료 수급에 따라 준비되지 않을 수 있어요 (구글 지도 안내).",
      "Kkomjangeo may be unavailable depending on supply (per Google Maps tips).",
      "盲鳗（꼼장어）可能因食材供应而暂时没有（谷歌地图提示）。",
      "コムジャンオは仕入れ状況により、ご用意できない場合があります（Googleマップの案内）。",
      "Lươn (kkomjangeo) có thể hết tùy nguồn nguyên liệu (theo gợi ý trên Google Maps)."
    ),
    items: [
      it(null, "e-salt", "숯불 소금구이 장어", "Charcoal-grilled eel, salt-seasoned", "炭火盐烤鳗鱼", "炭火塩焼きうなぎ", "Cá chình tẩm muối nướng than hoa", { sizes: KG(1200000, 600000), tag: "must" }),
      it(null, "e-gochu", "숯불 고추장구이 장어", "Charcoal-grilled eel, gochujang", "炭火辣酱烤鳗鱼", "炭火コチュジャン焼きうなぎ", "Cá chình tẩm gia vị nướng", { sizes: KG(1200000, 600000), spicy: true }),
      it(null, "e-soy", "숯불 간장구이 장어", "Charcoal-grilled eel, soy sauce", "炭火酱油烤鳗鱼", "炭火醤油焼きうなぎ", "Cá chình tẩm xì dầu nướng than hoa", { sizes: KG(1200000, 600000) }),
      it(280000, "e-don", "장어덮밥", "Grilled eel rice bowl (unadon)", "烤鳗鱼盖饭", "うな丼", "Cơm cá chình nướng sốt"),
      it(null, "k-salt", "꼼장어구이 (소금)", "Grilled kkomjangeo (hagfish), salt", "盐烤盲鳗（꼼장어）", "コムジャンオ塩焼き", "Lươn tẩm muối nướng", { sizes: [[T("400g", "400g", "400克", "400g", "400g"), 500000], [T("800g", "800g", "800克", "800g", "800g"), 900000]] }),
      it(null, "k-gochu", "꼼장어구이 (고추장양념)", "Grilled kkomjangeo (hagfish), gochujang", "辣酱烤盲鳗（꼼장어）", "コムジャンオ コチュジャン焼き", "Lươn tẩm sốt cay nướng", { sizes: [[T("400g", "400g", "400克", "400g", "400g"), 600000], [T("800g", "800g", "800克", "800g", "800g"), 1000000]], spicy: true }),
    ],
  },
  {
    id: "stew",
    name: T("찌개 · 식사", "Stews & meals", "炖汤 · 主食", "チゲ・食事", "Canh · Món ăn trưa"),
    items: [
      it(180000, "kimchi", "고기 듬뿍 김치찌개", "Kimchi stew with plenty of pork", "肉多泡菜汤", "お肉たっぷりキムチチゲ", "Canh kim chi nhiều thịt", { spicy: true }),
      it(160000, "doenjang", "시골 된장찌개", "Country-style doenjang jjigae (soybean paste stew)", "乡村大酱汤", "田舎風テンジャンチゲ", "Canh đậu tương"),
      it(180000, "mackerel", "노르웨이 고등어 구이", "Grilled Norwegian mackerel", "烤挪威鲭鱼", "ノルウェー産サバの塩焼き", "Cá thu Na Uy nướng"),
      it(180000, "sireagi", "시래기 장어탕", "Eel soup with dried radish greens", "萝卜缨鳗鱼汤", "シレギうなぎスープ", "Canh lươn"),
      it(170000, "kongbiji", "콩비지 찌개", "Kongbiji jjigae (ground soybean stew)", "豆渣汤", "おから（コンビジ）チゲ", "Canh óc đậu"),
      it(160000, "cheonggukjang", "청국장", "Cheonggukjang (fermented soybean stew)", "清麴酱汤", "チョングッチャン（発酵大豆チゲ）", "Canh đậu tương lên men"),
      it(180000, "bibimbap", "돌솥 비빔밥", "Dolsot bibimbap (stone-pot)", "石锅拌饭", "石焼ビビンバ", "Cơm trộn nồi đá"),
    ],
  },
  {
    id: "hot",
    name: T("전골류", "Hot pots", "火锅", "鍋料理", "Món lẩu"),
    items: [
      it(null, "h-dongtae", "동태전골", "Pollock hot pot (dongtae jeongol)", "明太鱼火锅", "トンテ鍋（スケトウダラ）", "Lẩu cá minh thái", { sizes: SIZE(600000, 900000) }),
      it(null, "h-tofu", "두부김치 전골", "Tofu & kimchi hot pot", "豆腐泡菜火锅", "豆腐キムチ鍋", "Lẩu kim chi đậu phụ", { sizes: SIZE(500000, 800000) }),
      it(null, "h-galchi", "갈치조림 전골", "Braised hairtail hot pot", "炖带鱼火锅", "太刀魚の煮付け鍋", "Lẩu cá hố om", { sizes: SIZE(650000, 950000) }),
      it(null, "h-mackerel", "고등어 김치조림 전골", "Braised mackerel & kimchi hot pot", "鲭鱼泡菜炖锅", "サバとキムチの煮込み鍋", "Cá thu hầm kim chi", { sizes: SIZE(650000, 950000) }),
      it(650000, "h-sujji", "도가니(스지) 전골", "Beef tendon & knee cartilage hot pot", "牛筋牛膝软骨火锅", "牛スジ・トガニ鍋", "Lẩu sụn chân bò", { desc: T("2~3인분", "2–3 servings", "2～3人份", "2〜3人前", "2–3 người ăn") }),
    ],
  },
  {
    id: "more",
    name: T("탕 · 면 · 전", "Soups, noodles & pancakes", "汤 · 面 · 煎饼", "スープ・麺・チヂミ", "Canh · Mì · Bánh"),
    note: T(
      "이 쪽 메뉴는 손님이 2년 전 올린 메뉴판 기준이라 가격이 바뀌었을 수 있어요.",
      "These items are based on a menu posted by a customer 2 years ago; prices may have changed.",
      "此部分依据顾客2年前上传的菜单，价格可能已有变动。",
      "このページは2年前にお客様が投稿したメニュー基準のため、価格が変わっている場合があります。",
      "Phần này theo thực đơn khách đăng 2 năm trước, giá có thể đã thay đổi."
    ),
    items: [
      it(200000, "dongtae", "동태탕", "Dongtae-tang (pollock soup)", "明太鱼汤", "トンテタン（スケトウダラ鍋）", "Canh cá minh thái"),
      it(200000, "altang", "알탕", "Altang (fish roe soup)", "鱼子汤", "アルタン（魚卵スープ）", "Canh lòng và trứng cá minh thái"),
      it(200000, "galbitang", "갈비탕", "Galbi-tang (beef short rib soup)", "牛排骨汤", "カルビタン", "Canh sườn bò"),
      it(220000, "bulgogi-pot", "뚝배기불고기", "Bulgogi in a stone pot", "石锅烤肉", "トゥッペギプルコギ（土鍋）", "Bò xào Bulgogi nồi đất"),
      it(200000, "haejang", "뼈해장국", "Ppyeo-haejangguk (spicy pork bone soup)", "辣猪骨醒酒汤", "ペヘジャンクク（辛口豚骨スープ）", "Canh xương heo cay", { spicy: true }),
      it(170000, "janchi", "잔치국수", "Janchi-guksu (banquet noodles in broth)", "宴会汤面（잔치국수）", "チャンチグクス（温かい素麺）", "Mì yến tiệc", { desc: T("후식으로 주문 시 90,000₫", "90,000₫ when ordered as a dessert", "作为饭后甜点点餐为 90,000₫", "デザートとして注文の場合 90,000₫", "Gọi làm món tráng miệng: 90,000₫") }),
      it(150000, "kong", "콩국수", "Kong-guksu (cold soy milk noodles)", "豆浆冷面", "コングクス（豆乳麺）", "Mì đậu nành"),
      it(150000, "naengmyeon", "냉면 (비빔 / 물)", "Naengmyeon (spicy mixed / cold broth)", "冷面（拌 / 汤）", "冷麺（ビビン / 水）", "Miến lạnh (trộn / nước)", { desc: T("후식으로 주문 시 100,000₫", "100,000₫ when ordered as a dessert", "作为饭后甜点点餐为 100,000₫", "デザートとして注文の場合 100,000₫", "Gọi làm món tráng miệng: 100,000₫") }),
      it(null, "omelet", "계란말이", "Rolled omelet (gyeran-mari)", "鸡蛋卷", "卵焼き（ケランマリ）", "Trứng cuộn rán"),
      it(200000, "pajeon", "해물파전", "Seafood pajeon (scallion pancake)", "海鲜葱饼", "海鮮チヂミ", "Bánh hành hải sản kiểu Hàn"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks & liquor", "酒水 · 饮料", "お酒・ドリンク", "Rượu & đồ uống"),
    note: T(
      "손님이 2년 전 올린 메뉴판 기준이라 가격이 바뀌었을 수 있어요.",
      "Based on a menu posted by a customer 2 years ago; prices may have changed.",
      "依据顾客2年前上传的菜单，价格可能已有变动。",
      "2年前にお客様が投稿したメニュー基準のため、価格が変わっている場合があります。",
      "Theo thực đơn khách đăng 2 năm trước, giá có thể đã thay đổi."
    ),
    items: [
      it(150000, null, "소주 (참이슬 · 이즈백 · 처음처럼)", "Soju (Chamisul, Iseubaek, Chum Churum)", "烧酒（真露、爱之白、初饮初乐）", "ソジュ（チャミスル・イズバック・チョウムチョロム）", "Rượu soju"),
      it(140000, null, "소주 (좋은데이)", "Soju (Good Day)", "烧酒（Good Day）", "ソジュ（チョウンデイ）", "Rượu soju (Good Day)"),
      it(140000, null, "하노이 보드카", "Hanoi vodka", "河内伏特加", "ハノイウォッカ", "Vodka Hà Nội"),
      it(330000, null, "복분자", "Bokbunja (Korean black raspberry wine)", "覆盆子酒", "覆盆子酒（ポクブンジャ）", "Rượu bokbunja", { unit: T("375ml", "375ml", "375毫升", "375ml", "375ml") }),
      it(330000, null, "백세주", "Baekseju (herbal rice wine)", "百岁酒", "百歳酒（ペクセジュ）", "Rượu bekseju", { unit: T("375ml", "375ml", "375毫升", "375ml", "375ml") }),
      it(150000, null, "홍초", "Hongcho (red vinegar drink)", "红醋饮料（홍초）", "紅酢（ホンチョ）", "Hong cho", { unit: T("500ml", "500ml", "500毫升", "500ml", "500ml") }),
      it(180000, null, "막걸리", "Makgeolli (traditional rice wine)", "马格利（米酒）", "マッコリ", "Rượu gạo truyền thống"),
      it(60000, null, "타이거 맥주", "Tiger beer", "虎牌啤酒", "タイガービール", "Bia Tiger"),
      it(20000, null, "음료 (콜라 · 사이다)", "Soft drinks (Coca-Cola & Sprite)", "饮料（可乐 · 雪碧）", "ソフトドリンク（コーラ・スプライト）", "Nước ngọt (Coca & Sprite)"),
    ],
  },
];
