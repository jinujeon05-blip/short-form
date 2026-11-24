// 산호 아나고 꼼장어 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진 13장(2026-11-24 수집). 가격은 가장 최근 '모든메뉴 세금포함가' 판 기준, 사진마다 다르면 높은 쪽.
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3)
window.RESTAURANT = {
  brand: { ko: "산호 아나고 꼼장어", en: "SANHO ANAGO KKOMJANGEO" },
  phone: "0877 756 856",
  address: "176 Đ. Đình Thôn, Đình Thôn, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:00 – 02:00",
};

window.MENU = [
  {
    id: "grill",
    name: { ko: "숯불구이", en: "Charcoal grill", zh: "炭火烧烤", ja: "炭火焼き", vi: "Nướng than hoa" },
    items: [
      { name: { ko: "양념 꼼장어 (한국 직수)", en: "Seasoned grilled hagfish (imported from Korea)", zh: "韩式酱烤盲鳗(韩国直送)", ja: "味付けコムジャンオ(ヌタウナギ)焼き(韓国直送)", vi: "Cá ninja nướng sốt Hàn" }, desc: { ko: "소금구이도 가능", en: "Salt-grilled also available", zh: "也可做成盐烤", ja: "塩焼きもできます", vi: "Có thể nướng muối" }, price: 230000, tag: "best", photo: "img/komjang.jpg" },
      { name: { ko: "양념 아나고", en: "Seasoned grilled conger eel", zh: "韩式酱烤星鳗", ja: "味付けアナゴ焼き", vi: "Cá chình nướng sốt Hàn" }, price: 230000, tag: "best", photo: "img/anago.jpg" },
      { name: { ko: "매콤양념 오징어", en: "Spicy seasoned squid", zh: "香辣酱烤鱿鱼", ja: "ピリ辛味付けイカ焼き", vi: "Mực nướng sốt cay" }, price: 200000, spicy: true },
      { name: { ko: "양념 닭발", en: "Seasoned chicken feet", zh: "韩式酱烤鸡爪", ja: "味付け鶏足焼き", vi: "Chân gà nướng sốt Hàn" }, price: 200000, spicy: true },
      { name: { ko: "안창살", en: "Skirt steak", zh: "牛横膈膜肉", ja: "ハラミ(横隔膜)", vi: "Diềm thăn bò" }, price: 280000 },
      { name: { ko: "양념 소갈비살", en: "Seasoned beef rib meat", zh: "酱腌牛肋条肉", ja: "味付け牛カルビ肉", vi: "Thịt sườn bò" }, price: 250000 },
      { name: { ko: "과일숙성막창", en: "Fruit-aged pork intestine", zh: "水果熟成猪大肠", ja: "フルーツ熟成豚マクチャン(大腸)", vi: "Lòng heo nướng" }, price: 200000 },
      { name: { ko: "불막창", en: "Fiery pork intestine", zh: "火辣猪大肠", ja: "辛口豚マクチャン(大腸)", vi: "Lòng heo sốt cay" }, price: 250000, spicy: true },
      { name: { ko: "생삼겹살", en: "Fresh pork belly", zh: "生五花肉", ja: "生サムギョプサル(豚バラ)", vi: "Thịt ba chỉ nướng" }, price: 200000 },
      { name: { ko: "항정살", en: "Pork jowl", zh: "猪颈肉", ja: "豚トロ(ハンジョンサル)", vi: "Thịt má heo nướng" }, price: 200000 },
      { name: { ko: "닭똥집 숯불구이", en: "Charcoal-grilled chicken gizzard", zh: "炭烤鸡胗", ja: "砂肝の炭火焼き", vi: "Mề gà nướng than hoa" }, price: 170000 },
      { name: { ko: "쪽갈비 (간장맛/매운맛)", en: "Pork ribs (soy / spicy)", zh: "烤小排(酱油味/辣味)", ja: "豚スペアリブ(醤油味/辛口)", vi: "Sườn heo nướng (vị chua ngọt / vị cay)" }, sizes: [["중", 280000], ["대", 380000]], photo: "img/ribs.jpg" },
      { name: { ko: "솥뚜껑 닭갈비", en: "Cast-iron lid dakgalbi (stir-fried chicken)", zh: "锅盖炒鸡排(春川辣炒鸡)", ja: "釜蓋タッカルビ", vi: "Gà xào bắp cải" }, sizes: [["중 2-3인", 400000], ["대 3-4인", 600000]] },
    ],
  },
  {
    id: "combo",
    name: { ko: "세트", en: "Combo sets", zh: "套餐", ja: "セット", vi: "Combo" },
    items: [
      { name: { ko: "세트 A", en: "Set A", zh: "套餐A", ja: "セットA", vi: "Combo A" }, desc: { ko: "삼겹살·항정살·막창·된장찌개 또는 김치찌개", en: "Pork belly, pork jowl, pork intestine + soybean paste stew or kimchi stew", zh: "五花肉、猪颈肉、猪大肠+大酱汤或泡菜汤", ja: "豚バラ・豚トロ・マクチャン(大腸)+テンジャンチゲまたはキムチチゲ", vi: "Ba chỉ, má heo, lòng heo nướng + canh đậu tương hoặc canh kim chi" }, price: 550000 },
      { name: { ko: "세트 B", en: "Set B", zh: "套餐B", ja: "セットB", vi: "Combo B" }, desc: { ko: "삼겹살·항정살·소갈비살·쪽갈비(중)·된장찌개 또는 김치찌개", en: "Pork belly, pork jowl, beef rib meat, pork ribs (M) + soybean paste stew or kimchi stew", zh: "五花肉、猪颈肉、牛肋条肉、小排(中份)+大酱汤或泡菜汤", ja: "豚バラ・豚トロ・牛カルビ肉・スペアリブ(中)+テンジャンチゲまたはキムチチゲ", vi: "Ba chỉ, má heo, sườn bò, sườn heo (vừa) + canh đậu tương hoặc canh kim chi" }, price: 750000 },
    ],
  },
  {
    id: "side",
    name: { ko: "식사·안주", en: "Meals & sides", zh: "主食·下酒菜", ja: "食事・おつまみ", vi: "Món ăn kèm" },
    items: [
      { name: { ko: "골뱅이 오뎅탕", en: "Whelk & fish cake soup", zh: "海螺鱼糕汤", ja: "ツブ貝とおでんのスープ", vi: "Canh chả cá ốc bulot" }, price: 250000 },
      { name: { ko: "냄비 떡볶이", en: "Tteokbokki in a pot", zh: "锅煮辣炒年糕", ja: "鍋トッポッキ", vi: "Tokbokki" }, price: 180000, photo: "img/tteokbokki.jpg" },
      { name: { ko: "해물라면", en: "Seafood ramyeon", zh: "海鲜拉面", ja: "海鮮ラーメン", vi: "Mì hải sản" }, price: 150000, spicy: true, photo: "img/ramyeon.jpg" },
      { name: { ko: "모듬튀김", en: "Assorted fried snacks", zh: "什锦炸物", ja: "揚げ物盛り合わせ", vi: "Đồ chiên thập cẩm" }, price: 190000 },
      { name: { ko: "김치찌개", en: "Kimchi stew", zh: "泡菜汤", ja: "キムチチゲ", vi: "Canh kim chi" }, price: 120000 },
      { name: { ko: "된장찌개", en: "Soybean paste stew", zh: "大酱汤", ja: "テンジャンチゲ", vi: "Canh đậu tương" }, price: 120000 },
      { name: { ko: "물냉면", en: "Cold noodles (mul naengmyeon)", zh: "冷面(水冷面)", ja: "水冷麺(ムルネンミョン)", vi: "Mì lạnh" }, price: 100000 },
      { name: { ko: "계란찜 (2번째)", en: "Steamed egg (2nd serving)", zh: "蒸蛋(第2份)", ja: "卵蒸し(2回目)", vi: "Trứng hấp (lần 2)" }, price: 20000, photo: "img/eggsteam.jpg" },
      { name: { ko: "국수 추가", en: "Extra noodles", zh: "加面条", ja: "麺の追加", vi: "Thêm mì" }, price: 40000 },
      { name: { ko: "볶음밥 추가", en: "Fried rice add-on", zh: "加炒饭", ja: "チャーハンの追加", vi: "Thêm cơm rang" }, price: 50000 },
      { name: { ko: "공기밥", en: "Steamed rice", zh: "米饭", ja: "ライス", vi: "Cơm trắng" }, price: 20000 },
    ],
  },
  {
    id: "alcohol",
    name: { ko: "주류", en: "Alcohol", zh: "酒类", ja: "お酒", vi: "Đồ uống có cồn" },
    items: [
      { name: { ko: "참이슬", en: "Chamisul soju", zh: "真露烧酒(Chamisul)", ja: "チャミスル", vi: "Rượu Chamisul" }, price: 140000 },
      { name: { ko: "처음처럼", en: "Chum Churum soju", zh: "初饮初乐烧酒(Chum Churum)", ja: "チュムチュルム", vi: "Rượu Chum Churum" }, price: 140000 },
      { name: { ko: "새로", en: "Saero soju", zh: "Saero烧酒", ja: "セロ", vi: "Rượu Sero" }, price: 140000 },
      { name: { ko: "진로", en: "Jinro soju", zh: "真露(Jinro)烧酒", ja: "ジンロ", vi: "Rượu Jinro" }, price: 140000 },
      { name: { ko: "과일소주", en: "Fruit soju", zh: "水果烧酒", ja: "フルーツ焼酎", vi: "Rượu trái cây" }, price: 140000 },
      { name: { ko: "막걸리", en: "Makgeolli", zh: "马格利米酒", ja: "マッコリ", vi: "Rượu gạo" }, price: 150000 },
      { name: { ko: "보드카멘", en: "VodkaMen", zh: "VodkaMen伏特加", ja: "ボドカメン(VodkaMen)", vi: "VodkaMen" }, price: 150000 },
      { name: { ko: "생맥주", en: "Draft beer", zh: "生啤", ja: "生ビール", vi: "Bia tươi" }, price: 65000 },
      { name: { ko: "맥주 사이공", en: "Saigon beer", zh: "西贡啤酒", ja: "ビール サイゴン", vi: "Bia Saigon" }, price: 50000 },
      { name: { ko: "맥주 타이거", en: "Tiger beer", zh: "虎牌啤酒", ja: "ビール タイガー", vi: "Bia Tiger" }, price: 50000 },
      { name: { ko: "스트롱보우", en: "Strongbow cider", zh: "Strongbow苹果酒", ja: "ストロングボウ(シードル)", vi: "Strongbow" }, price: 50000 },
    ],
  },
  {
    id: "drink",
    name: { ko: "음료", en: "Drinks", zh: "饮料", ja: "ドリンク", vi: "Nước ngọt" },
    items: [
      { name: { ko: "코카콜라", en: "Coca-Cola", zh: "可口可乐", ja: "コカ・コーラ", vi: "Coca" }, price: 20000 },
      { name: { ko: "제로 콜라", en: "Coke Zero", zh: "零度可乐", ja: "コカ・コーラ ゼロ", vi: "Zero Coca" }, price: 20000 },
      { name: { ko: "스프라이트", en: "Sprite", zh: "雪碧", ja: "スプライト", vi: "Sprite" }, price: 20000 },
      { name: { ko: "환타", en: "Fanta", zh: "芬达", ja: "ファンタ", vi: "Fanta" }, price: 20000 },
      { name: { ko: "싱하소다", en: "Singha soda", zh: "胜狮苏打水", ja: "シンハーソーダ", vi: "Soda Singha" }, price: 30000 },
      { name: { ko: "아침햇살", en: "Morning Sun rice drink", zh: "朝日晨光大米饮料", ja: "朝の光(アチムヘッサル)ライスドリンク", vi: "Nước gạo Achimhaetsal" }, price: 30000 },
    ],
  },
];
