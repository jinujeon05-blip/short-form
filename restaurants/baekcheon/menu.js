// 백천화덕아나고 (경북 경산시 백천길 7) 메뉴 데이터
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: 원(KRW)
// 카테고리 unit = 1인분 기준 중량, item unit = 그 메뉴만 다른 중량
// spicy: true = 매운 양념 (메뉴판의 辛 표시)
window.RESTAURANT = {
  brand: "백천화덕아나고",
  phone: "0507-1445-9603",
  address: "경북 경산시 백천길 7",
  mapUrl: "https://map.naver.com/p/entry/place/2005825852",
  wifi: null, // 예: { ssid: "BAEKCHEON", password: "12345678" }
};

window.MENU = [
  {
    id: "grill",
    unit: "150g",
    notice: "oven",
    name: { ko: "화덕 초벌구이", en: "Wood-fired Grill", zh: "炉火烧烤", ja: "窯焼きグリル", vi: "Món nướng lò củi" },
    items: [
      { price: 12000, spicy: true, photo: "img/anago.jpg",
        name: { ko: "양념 아나고", en: "Spicy Grilled Conger Eel", zh: "辣酱烤星鳗", ja: "ヤンニョム穴子焼き", vi: "Cá chình biển nướng sốt cay" } },
      { price: 12000, spicy: true, photo: "img/gomjangeo.jpg",
        name: { ko: "양념 곰장어", en: "Spicy Grilled Hagfish", zh: "辣酱烤盲鳗", ja: "ヤンニョム・コムジャンオ（ヌタウナギ）", vi: "Cá mút đá nướng sốt cay" } },
      { price: 10000,
        name: { ko: "간장 닭발 (누드 닭발)", en: "Soy-glazed Boneless Chicken Feet", zh: "酱油无骨鸡爪", ja: "醤油味 骨なし鶏足", vi: "Chân gà rút xương nướng xì dầu" } },
      { price: 10000, spicy: true, photo: "img/dakbal.jpg",
        name: { ko: "양념 닭발", en: "Spicy Grilled Chicken Feet", zh: "辣酱烤鸡爪", ja: "ヤンニョム鶏足（辛口）", vi: "Chân gà nướng sốt cay" } },
      { price: 10000, spicy: true,
        name: { ko: "양념 오돌뼈", en: "Spicy Pork Cartilage", zh: "辣酱烤猪脆骨", ja: "ヤンニョム豚軟骨", vi: "Sụn heo nướng sốt cay" } },
      { price: 10000,
        name: { ko: "간장 오돌뼈", en: "Soy-glazed Pork Cartilage", zh: "酱油烤猪脆骨", ja: "醤油味 豚軟骨", vi: "Sụn heo nướng xì dầu" } },
      { price: 11000, photo: "img/makchang.jpg",
        name: { ko: "막창", en: "Grilled Makchang (Intestine)", zh: "烤大肠（Makchang）", ja: "マクチャン（ホルモン焼き）", vi: "Lòng nướng (Makchang)" } },
      { price: 11000, spicy: true,
        name: { ko: "양념막창", en: "Spicy Grilled Makchang", zh: "辣酱烤大肠", ja: "ヤンニョム・マクチャン", vi: "Lòng nướng sốt cay" } },
      { price: 10000, unit: "200g",
        name: { ko: "간장 숯불 닭갈비", en: "Soy Charcoal-grilled Chicken", zh: "酱油炭烤鸡排", ja: "醤油味 炭火タッカルビ", vi: "Gà nướng than xì dầu" } },
      { price: 10000, unit: "200g", spicy: true, photo: "img/dakgalbi.jpg",
        name: { ko: "양념 숯불 닭갈비", en: "Spicy Charcoal-grilled Chicken", zh: "辣酱炭烤鸡排", ja: "ヤンニョム炭火タッカルビ", vi: "Gà nướng than sốt cay" } },
    ],
  },
  {
    id: "pho",
    notice: "lunch",
    name: { ko: "직화 불맛 쌀국수", en: "Fire-grilled Pho & Bún", zh: "炭火米粉", ja: "炭火フォー", vi: "Phở & Bún nướng than" },
    items: [
      { price: 7000, photo: "img/pho-veg.jpg",
        name: { ko: "채소 쌀국수", en: "Vegetable Pho", zh: "蔬菜米粉", ja: "野菜フォー", vi: "Phở rau" },
        desc: { ko: "속 편안하고 깔끔한 맛, 건강한 한 끼", en: "Light, clean and easy on the stomach", zh: "清淡爽口的健康一餐", ja: "あっさりやさしい健康的な一杯", vi: "Thanh nhẹ, dễ ăn, tốt cho sức khỏe" } },
      { price: 9500, photo: "img/pho-beef.jpg",
        name: { ko: "소고기 쌀국수", en: "Beef Pho", zh: "牛肉米粉", ja: "牛肉フォー", vi: "Phở bò" },
        desc: { ko: "진한 비법 육수에 소고기 고명 듬뿍", en: "Rich house broth, generous beef topping", zh: "秘制浓汤，满满牛肉", ja: "秘伝の濃厚スープに牛肉たっぷり", vi: "Nước dùng đậm đà, nhiều thịt bò" } },
      { price: 9500, photo: "img/pho-char.jpg",
        name: { ko: "숯불구이 쌀국수", en: "Pho with Charcoal-grilled Meat", zh: "炭烤肉米粉", ja: "炭火焼き肉のせフォー", vi: "Phở thịt nướng than" },
        desc: { ko: "화덕 불향 가득, 야들야들 직화구이 산더미", en: "Piled high with smoky, tender grilled meat", zh: "炉火香气，满满嫩烤肉", ja: "香ばしい炭火焼き肉を山盛りで", vi: "Thịt nướng than mềm, thơm mùi khói" } },
      { price: 12000, photo: "img/pho-sea.jpg",
        name: { ko: "해산물 쌀국수", en: "Seafood Pho", zh: "海鲜米粉", ja: "シーフードフォー", vi: "Phở hải sản" },
        desc: { ko: "새우·홍합·오징어로 바다의 감칠맛 폭발", en: "Shrimp, mussels and squid", zh: "虾、青口、鱿鱼，鲜味十足", ja: "エビ・ムール貝・イカの旨み", vi: "Tôm, vẹm và mực tươi" } },
      { price: 14000, photo: "img/buncha.jpg",
        name: { ko: "숯불구이 분짜", en: "Charcoal-grilled Bún Chả", zh: "炭烤越南烤肉米线", ja: "炭火焼きブンチャー", vi: "Bún chả nướng than" },
        desc: { ko: "새콤달콤 소스에 직화구이를 찍어 먹는 별미", en: "Grilled meat dipped in sweet-sour sauce", zh: "烤肉蘸酸甜酱汁", ja: "甘酸っぱいタレにつけて食べる", vi: "Chấm nước mắm chua ngọt" } },
      { price: 7000, photo: "img/seoksoe.jpg",
        name: { ko: "석쇠숯불구이", en: "Grill-rack Charcoal BBQ", zh: "铁网炭烤肉", ja: "網焼き炭火焼肉", vi: "Thịt nướng vỉ than" },
        desc: { ko: "화덕 불향 가득, 야들야들 직화구이", en: "Smoky and tender, grilled over fire", zh: "炉火香气，鲜嫩多汁", ja: "香ばしくやわらか", vi: "Thơm mùi khói, mềm ngon" } },
    ],
  },
  {
    id: "side",
    name: { ko: "사이드", en: "Sides & Meals", zh: "配菜 · 主食", ja: "サイド・お食事", vi: "Món phụ" },
    items: [
      { price: 5000, photo: "img/doenjang.jpg",
        name: { ko: "차돌 된장찌개", en: "Brisket Soybean Paste Stew", zh: "牛胸肉大酱汤", ja: "牛バラ入りテンジャンチゲ", vi: "Canh tương đậu với ức bò" } },
      { price: 5500, photo: "img/kimchirice.jpg",
        name: { ko: "옛날김치볶음밥", en: "Old-style Kimchi Fried Rice", zh: "传统泡菜炒饭", ja: "昔ながらのキムチチャーハン", vi: "Cơm chiên kimchi kiểu xưa" } },
      { price: 9500,
        name: { ko: "베트남 쌀국수", en: "Vietnamese Pho", zh: "越南米粉", ja: "ベトナムフォー", vi: "Phở Việt Nam" } },
      { price: 6000,
        name: { ko: "유부우동", en: "Fried Tofu Udon", zh: "油豆腐乌冬面", ja: "きつねうどん", vi: "Mì udon đậu phụ chiên" } },
      { price: 3000,
        name: { ko: "계란찜", en: "Korean Steamed Egg", zh: "韩式蒸蛋", ja: "ケランチム（韓国風茶碗蒸し）", vi: "Trứng hấp kiểu Hàn" } },
      { price: 1000,
        name: { ko: "공기밥", en: "Steamed Rice", zh: "米饭", ja: "ライス", vi: "Cơm trắng" } },
      { price: 1000,
        name: { ko: "고수 추가", en: "Extra Cilantro", zh: "加香菜", ja: "パクチー追加", vi: "Thêm rau mùi" } },
    ],
  },
  {
    id: "drinks",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水 · 饮料", ja: "ドリンク", vi: "Đồ uống" },
    items: [
      { price: 4500, name: { ko: "소주 · 맥주", en: "Soju · Beer", zh: "烧酒 · 啤酒", ja: "焼酎・ビール", vi: "Soju · Bia" } },
      { price: 6000, name: { ko: "청하", en: "Chungha (Rice Wine)", zh: "清河（清酒）", ja: "チョンハ（清酒）", vi: "Rượu Chungha" } },
      { price: 4000, name: { ko: "막걸리", en: "Makgeolli (Rice Wine)", zh: "韩国米酒", ja: "マッコリ", vi: "Rượu gạo Makgeolli" } },
      { price: 2000, name: { ko: "음료수", en: "Soft Drink", zh: "饮料", ja: "ソフトドリンク", vi: "Nước ngọt" } },
    ],
  },
];

// 원산지 표시 (메뉴판 그대로)
window.ORIGIN = [
  { ko: "아나고", en: "Conger eel", zh: "星鳗", ja: "穴子", vi: "Cá chình biển", from: "kr" },
  { ko: "곰장어", en: "Hagfish", zh: "盲鳗", ja: "ヌタウナギ", vi: "Cá mút đá", from: "us" },
  { ko: "닭발 · 오돌뼈", en: "Chicken feet · Pork cartilage", zh: "鸡爪 · 猪脆骨", ja: "鶏足・豚軟骨", vi: "Chân gà · Sụn heo", from: "kr" },
  { ko: "막창", en: "Makchang", zh: "大肠", ja: "マクチャン", vi: "Lòng", from: "ie" },
  { ko: "닭갈비", en: "Chicken", zh: "鸡肉", ja: "鶏肉", vi: "Thịt gà", from: "kr" },
];
