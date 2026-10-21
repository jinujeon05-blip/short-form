// 삼원 박닌점 NHÀ HÀNG SAMWON (Bắc Ninh) 메뉴 데이터 — 한국식 숯불구이 전문점
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "삼원 박닌점" 폴더의 구글 지도 캡처 11장 (모두 손님 사진). 메뉴는 손님이 1년 전 올린
//   매장 메뉴판 사진 한 장 기준(번호 01~42)이라 가격이 바뀌었을 수 있음. 일본어·영어는 새로 번역.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격 / sizes: [[{ko,en,…}, 가격], …] / dessert: 고기와 함께 먹는 후식 가격 / tag: "best" · "special" / spicy: true
window.RESTAURANT = {
  brand: { ko: "삼원", en: "SAMWON", branch: "Bắc Ninh" },
  phone: "0393 811 008",   // 구글 지도 기준 (간판에는 0928 410 578)
  address: "1 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh",
  mapQuery: "삼원 박닌점 SAMWON",
  wifi: { ssid: "", password: "0000088888" }, // 메뉴판에 비밀번호만 있음 (네트워크 이름 모름)
};

const P1 = { ko: "1인분", en: "1 serving", zh: "1人份", ja: "1人前", vi: "1 suất" };
const G500 = { ko: "500g", en: "500g", zh: "500克", ja: "500g", vi: "500g" };
const KG = { ko: "1kg", en: "1kg", zh: "1公斤", ja: "1kg", vi: "1kg" };
const BOOK = { ko: "3시간 전 예약", en: "Order 3 hours ahead", zh: "需提前3小时预订", ja: "3時間前までに要予約", vi: "Đặt trước 3 tiếng" };

window.MENU = [
  {
    id: "beef",
    photo: "img/beef.jpg",
    name: { ko: "소고기", en: "Beef", zh: "牛肉", ja: "牛肉", vi: "Thịt bò" },
    note: { ko: "숯불에 직원이 구워 드립니다", en: "Grilled over charcoal by our staff", zh: "店员为您炭火烤制", ja: "炭火でスタッフが焼いてくれます", vi: "Nhân viên nướng than hoa tại bàn" },
    items: [
      { sizes: [[P1, 400000], [G500, 1000000], [KG, 1900000]], tag: "best",
        name: { ko: "꽃살", en: "Prime Marbled Beef (Kkotsal)", zh: "牛里脊肉（雪花）", ja: "霜降り牛（コッサル）", vi: "Thăn bò nội vai" } },
      { sizes: [[P1, 300000], [G500, 750000], [KG, 1400000]],
        name: { ko: "소갈비살", en: "Boneless Beef Short Rib", zh: "嫩牛排骨肉", ja: "牛カルビ（中落ち）", vi: "Dẻ sườn bò" } },
      { sizes: [[P1, 320000], [G500, 800000], [KG, 1500000]],
        name: { ko: "양념 소갈비살", en: "Marinated Boneless Short Rib", zh: "调味嫩牛排骨肉", ja: "味付け牛カルビ", vi: "Dẻ sườn bò tẩm" } },
      { sizes: [[P1, 320000], [G500, 800000], [KG, 1500000]],
        name: { ko: "LA갈비", en: "LA Galbi (Flanken-cut Short Ribs)", zh: "LA牛排骨", ja: "LAカルビ", vi: "Sườn bò LA" } },
      { sizes: [[P1, 350000], [G500, 900000], [KG, 1700000]], tag: "special",
        name: { ko: "안창살", en: "Beef Skirt (Anchangsal)", zh: "牛横膈膜肉", ja: "ハラミ（アンチャンサル）", vi: "Diềm thăn bò" } },
      { price: 250000, desc: P1,
        name: { ko: "소불고기전골", en: "Beef Bulgogi Hot Pot", zh: "牛肉烤肉火锅", ja: "牛プルコギ鍋", vi: "Lẩu bò bulgogi" } },
    ],
  },
  {
    id: "pork",
    photo: "img/pork.jpg",
    name: { ko: "돼지고기", en: "Pork", zh: "猪肉", ja: "豚肉", vi: "Thịt lợn" },
    note: { ko: "1인분 기준", en: "Per serving", zh: "按1人份计价", ja: "1人前の価格", vi: "Giá cho 1 suất" },
    items: [
      { price: 200000, name: { ko: "돼지갈비", en: "Marinated Pork Ribs", zh: "调味猪排骨", ja: "味付け豚カルビ", vi: "Sườn lợn tẩm gia vị" } },
      { price: 220000, tag: "best",
        name: { ko: "흑돼지 삼겹살", en: "Black Pork Belly", zh: "黑猪五花肉", ja: "黒豚サムギョプサル", vi: "Ba chỉ lợn đen" } },
      { price: 220000, name: { ko: "흑돼지 목살", en: "Black Pork Neck", zh: "黑猪颈肉", ja: "黒豚肩ロース（モクサル）", vi: "Vai lợn đen" } },
      { price: 220000, name: { ko: "항정살", en: "Pork Jowl", zh: "猪颈肉（松阪肉）", ja: "豚トロ（ハンジョンサル）", vi: "Thịt má lợn" } },
      { price: 180000, name: { ko: "대패삼겹살 (흑돼지)", en: "Thin-sliced Black Pork Belly", zh: "薄切黑猪五花肉", ja: "薄切り黒豚サムギョプサル", vi: "Ba chỉ mỏng (lợn đen)" } },
      { price: 200000, spicy: true,
        name: { ko: "고추장 삼겹살 (대패)", en: "Gochujang Thin-sliced Pork Belly", zh: "辣酱薄切五花肉", ja: "コチュジャン薄切りサムギョプサル", vi: "Ba chỉ mỏng ướp tương ớt" } },
      { price: 270000, spicy: true, desc: { ko: "1접시", en: "1 plate", zh: "1盘", ja: "1皿", vi: "1 đĩa" },
        name: { ko: "돼지 두루치기", en: "Spicy Stir-fried Pork (Duruchigi)", zh: "辣炒猪肉", ja: "豚のトゥルチギ（辛味炒め）", vi: "Thịt lợn xào cay" } },
      { price: 200000, name: { ko: "돼지 막창", en: "Grilled Pork Intestines (Makchang)", zh: "烤猪大肠", ja: "豚マクチャン（ホルモン焼き）", vi: "Lòng lợn nướng" } },
      { price: 120000, name: { ko: "껍데기", en: "Grilled Pork Skin", zh: "烤猪皮", ja: "豚皮焼き", vi: "Bì lợn nướng" } },
      { price: 200000, name: { ko: "갈매기살", en: "Pork Skirt (Galmaegisal)", zh: "猪横膈膜肉", ja: "豚ハラミ（カルメギサル）", vi: "Thịt dải lợn" } },
    ],
  },
  {
    id: "special",
    photo: "img/special.jpg",
    name: { ko: "특별 메뉴", en: "Specials", zh: "特色菜", ja: "特別メニュー", vi: "Món đặc biệt" },
    items: [
      { sizes: [[G500, 500000], [KG, 900000]], tag: "special",
        name: { ko: "장어구이", en: "Grilled Eel", zh: "烤鳗鱼", ja: "うなぎ焼き", vi: "Cá chình nướng" } },
      { price: 800000, desc: BOOK,
        name: { ko: "닭백숙", en: "Whole Chicken Soup (Baeksuk)", zh: "清炖整鸡汤", ja: "タッペクスク（鶏の水炊き）", vi: "Canh gà hầm" } },
      { price: 900000, desc: BOOK,
        name: { ko: "옻닭백숙", en: "Lacquer-tree Herbal Chicken Soup", zh: "漆树药膳炖鸡", ja: "オッタッペクスク（漆の木の薬膳鶏）", vi: "Canh gà hầm thuốc bắc" } },
      { price: 300000, name: { ko: "신선 과일", en: "Fresh Fruit Platter", zh: "新鲜水果", ja: "フルーツ盛り合わせ", vi: "Hoa quả tươi" } },
      { price: 400000, spicy: true,
        name: { ko: "동태탕", en: "Spicy Pollock Stew", zh: "明太鱼汤", ja: "スケトウダラ鍋（トンテタン）", vi: "Canh cá minh thái" } },
      { price: 300000, name: { ko: "오뎅탕", en: "Fish Cake Soup", zh: "鱼饼汤", ja: "おでん鍋", vi: "Canh chả cá Hàn" } },
    ],
  },
  {
    id: "meal",
    photo: "img/meal.jpg",
    name: { ko: "식사류", en: "Meals & Noodles", zh: "主食", ja: "食事・麺", vi: "Món ăn chính" },
    note: { ko: "후식 = 고기와 함께 먹는 작은 크기", en: "\"With BBQ\" = smaller portion after grilling", zh: "“配烤肉价” = 吃烤肉后的小份", ja: "「焼肉と一緒に」＝焼肉の後の小盛り", vi: "\"Giá ăn kèm thịt nướng\" = suất nhỏ sau khi ăn thịt" },
    items: [
      { price: 120000, dessert: 80000, name: { ko: "잔치국수", en: "Warm Noodle Soup (Janchi-guksu)", zh: "宴会面（热汤面）", ja: "チャンチグクス（温かい素麺）", vi: "Mỳ nóng" } },
      { price: 120000, dessert: 80000, name: { ko: "김치말이 국수", en: "Cold Kimchi Noodles", zh: "泡菜冷汤面", ja: "キムチマリグクス（冷やしキムチ素麺）", vi: "Mỳ kim chi" } },
      { price: 120000, dessert: 80000, tag: "best",
        name: { ko: "비빔냉면 / 물냉면", en: "Spicy Mixed / Cold Broth Naengmyeon", zh: "拌冷面 / 水冷面", ja: "ビビン冷麺／水冷麺", vi: "Mỳ lạnh trộn / Mỳ lạnh nước" } },
      { price: 80000, name: { ko: "옛날 도시락", en: "Old-school Lunchbox (Dosirak)", zh: "怀旧便当", ja: "昔ながらのお弁当", vi: "Cơm hộp kiểu xưa" } },
      { price: 50000, name: { ko: "계란찜", en: "Steamed Egg", zh: "蒸鸡蛋羹", ja: "ケランチム（韓国茶碗蒸し）", vi: "Trứng hấp" } },
      { price: 150000, name: { ko: "갈비탕", en: "Beef Short Rib Soup (Galbitang)", zh: "排骨汤", ja: "カルビタン", vi: "Canh sườn bò" },
        desc: { ko: "메뉴판 이름이 가려져 있어 확인 필요", en: "Name partly hidden on the menu board — please ask staff", zh: "菜单名称被遮挡，请向店员确认", ja: "メニュー名が隠れているため店員にご確認ください", vi: "Tên món bị che trên thực đơn, vui lòng hỏi nhân viên" } },
      { price: 0, name: { ko: "공기밥", en: "Steamed Rice", zh: "白米饭", ja: "ご飯", vi: "Cơm trắng" } },
    ],
  },
  {
    id: "stew",
    photo: "img/stew.jpg",
    name: { ko: "안주 · 찌개", en: "Side Dishes & Stews", zh: "下酒菜 · 汤锅", ja: "おつまみ・チゲ", vi: "Món nhắm · Canh" },
    items: [
      { price: 300000, spicy: true, tag: "best",
        name: { ko: "골뱅이 무침", en: "Spicy Sea Snail Salad", zh: "辣拌海螺", ja: "ツブ貝の辛味和え", vi: "Ốc Hàn trộn" } },
      { price: 300000, spicy: true, name: { ko: "부대찌개", en: "Army Stew (Budae-jjigae)", zh: "部队火锅", ja: "プデチゲ", vi: "Canh Budae" } },
      { price: 200000, spicy: true, name: { ko: "목살 고추장찌개", en: "Pork Neck Gochujang Stew", zh: "猪颈肉辣酱汤", ja: "豚肩ロースのコチュジャンチゲ", vi: "Canh thịt vai tương ớt" } },
      { price: 200000, spicy: true, name: { ko: "김치찌개", en: "Kimchi Stew", zh: "泡菜汤", ja: "キムチチゲ", vi: "Canh kim chi" } },
      { price: 200000, name: { ko: "된장찌개", en: "Soybean Paste Stew", zh: "大酱汤", ja: "テンジャンチゲ", vi: "Canh đậu tương" } },
      { price: 200000, name: { ko: "청국장", en: "Fermented Soybean Stew (Cheonggukjang)", zh: "清麴酱汤", ja: "チョングッチャン（納豆チゲ）", vi: "Canh tương đậu lên men" } },
      { price: 200000, name: { ko: "파전", en: "Green Onion Pancake", zh: "韩式葱饼", ja: "ネギチヂミ", vi: "Bánh hành Hàn Quốc" } },
    ],
  },
  {
    id: "drinks",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水饮料", ja: "お酒・ドリンク", vi: "Đồ uống" },
    items: [
      { price: 130000, name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "焼酎", vi: "Rượu soju" } },
      { price: 150000, name: { ko: "막걸리", en: "Makgeolli (Rice Wine)", zh: "韩国米酒", ja: "マッコリ", vi: "Rượu gạo Hàn Quốc" } },
      { price: 50000, name: { ko: "맥주", en: "Beer", zh: "啤酒", ja: "ビール", vi: "Bia" } },
      { price: 100000, name: { ko: "보드카 (Men)", en: "Vodka Men", zh: "伏特加 Men", ja: "ウォッカ Men", vi: "Vodka Men" } },
      { price: 20000, name: { ko: "음료수", en: "Soft Drinks", zh: "饮料", ja: "ソフトドリンク", vi: "Nước ngọt" } },
      { price: 40000, name: { ko: "담배", en: "Cigarettes", zh: "香烟", ja: "タバコ", vi: "Thuốc lá" } },
    ],
  },
];
