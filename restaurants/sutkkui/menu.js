// 숯꾸이 (Nhà Hàng Thịt Nướng) 메뉴 데이터
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// 카테고리 unit = 1인분 기준 중량, item unit = 그 메뉴만 다른 중량
window.RESTAURANT = {
  brand: { ko: "숯꾸이", sub: "Nhà Hàng Thịt Nướng" },
  phone: "0866 740 772",
  address: "190 Nguyễn Cao, TP. Bắc Ninh",
  wifi: { ssid: "NHÀ HÀNG THỊT NƯỚNG", password: "992992992" },
};

// 장바구니·주문서 (_shared/order.js). staff = 주문서 언어, zalo = 주문 받을 Zalo 번호 (null이면 버튼 숨김)
window.ORDER = { staff: "vi", currency: "₫", zalo: "0866740772" };

window.MENU = [
  {
    id: "pork",
    photo: "img/pork.jpg",
    unit: "130g",
    name: { ko: "돼지고기", en: "Pork", zh: "猪肉", ja: "豚肉", vi: "Thịt lợn" },
    items: [
      { price: 100000, name: { ko: "대패삼겹살", en: "Thin-sliced Pork Belly", zh: "薄切五花肉", ja: "薄切りサムギョプサル", vi: "Ba chỉ mỏng" } },
      { price: 100000, name: { ko: "삼겹살", en: "Pork Belly", zh: "五花肉", ja: "サムギョプサル（豚バラ）", vi: "Ba chỉ" } },
      { price: 100000, name: { ko: "목살", en: "Pork Neck", zh: "梅花肉", ja: "豚肩ロース（モクサル）", vi: "Thịt vai" } },
      { price: 100000, name: { ko: "항정살", en: "Pork Jowl", zh: "猪颈肉", ja: "豚トロ（ハンジョンサル）", vi: "Má lợn" } },
      { price: 100000, name: { ko: "돼지갈비", en: "Marinated Pork Galbi", zh: "烤调味猪排", ja: "味付け豚カルビ", vi: "Thịt vai ngâm" } },
    ],
  },
  {
    id: "beef",
    photo: "img/beef.jpg",
    unit: "100g",
    name: { ko: "소고기", en: "Beef", zh: "牛肉", ja: "牛肉", vi: "Thịt bò" },
    items: [
      { price: 190000, name: { ko: "꽃살", en: "Premium Marbled Beef", zh: "优质牛肉", ja: "霜降り牛（コッサル）", vi: "Dẻ sườn hoàng đế" } },
      { price: 170000, name: { ko: "안창살", en: "Beef Skirt", zh: "牛隔膜肉", ja: "ハラミ（アンチャンサル）", vi: "Diềm bò" } },
      { price: 150000, name: { ko: "갈비살", en: "Boneless Short Rib", zh: "牛肋条", ja: "中落ちカルビ", vi: "Dẻ sườn" } },
      { price: 140000, name: { ko: "차돌박이", en: "Thin-sliced Brisket", zh: "肥牛", ja: "牛バラ薄切り（チャドルバギ）", vi: "Gàu bò" } },
      { price: 140000, name: { ko: "우삼겹 (양념)", en: "Marinated Beef Belly", zh: "牛五花肉（酱油）", ja: "味付け牛バラ（ウサムギョプ）", vi: "Thịt bò (Gia vị)" } },
      { price: 140000, name: { ko: "LA갈비 (양념)", en: "Marinated LA Galbi", zh: "LA排骨（酱油）", ja: "味付けLAカルビ", vi: "Sườn LA ngâm" } },
      { price: 400000, unit: "400g", name: { ko: "곰장어", en: "Spicy Grilled Hagfish", zh: "辣炒盲鳗", ja: "コムジャンオ（ヌタウナギ炒め）", vi: "Lươn biển" } },
    ],
  },
  {
    id: "hotpot",
    photo: "img/stew.jpg",
    name: { ko: "찜 · 전골", en: "Stews & Hot Pots", zh: "炖菜 · 火锅", ja: "チム・鍋料理", vi: "Lẩu - Món hầm" },
    items: [
      { price: 200000, name: { ko: "김치찌개", en: "Kimchi Jjigae (Pork Kimchi Stew)", zh: "猪肉泡菜汤", ja: "キムチチゲ", vi: "Canh kimchi" } },
      { price: 250000, name: { ko: "오뎅탕", en: "Fish Cake Soup", zh: "鱼饼汤", ja: "おでん鍋", vi: "Canh chả cá" } },
      { price: 350000, name: { ko: "꽁치김치찌개", en: "Saury Kimchi Stew", zh: "秋刀鱼泡菜汤", ja: "サンマのキムチチゲ", vi: "Canh kimchi cá thu" } },
      { price: 350000, name: { ko: "부대찌개", en: "Budae Jjigae (Army Stew)", zh: "部队锅", ja: "プデチゲ", vi: "Lẩu xúc xích" } },
      { price: 350000, name: { ko: "두부참치조림", en: "Spicy Braised Tofu & Tuna", zh: "辣味红烧豆腐", ja: "豆腐とツナの辛口煮", vi: "Đậu hũ hầm cá ngừ" } },
      { price: 350000, name: { ko: "제육볶음", en: "Spicy Stir-fried Pork", zh: "辣炒猪肉", ja: "チェユクポックム（豚の辛味炒め）", vi: "Thịt xào cay" } },
      { price: 400000, name: { ko: "닭도리탕", en: "Spicy Braised Chicken", zh: "辣炖鸡块", ja: "タットリタン", vi: "Canh gà cay" } },
      { price: 400000, name: { ko: "매운돼지갈비찜", en: "Spicy Braised Pork Ribs", zh: "辣炖猪排", ja: "辛口豚カルビチム", vi: "Sườn lợn hầm" } },
      { price: 400000, name: { ko: "소불고기전골", en: "Beef Bulgogi Hot Pot", zh: "烤牛肉火锅", ja: "牛プルコギ鍋", vi: "Lẩu thịt bò" } },
      { price: 600000, name: { ko: "소갈비찜", en: "Braised Beef Short Ribs", zh: "韩式炖牛排", ja: "牛カルビチム", vi: "Sườn bò hầm" } },
    ],
  },
  {
    id: "general",
    photo: "img/tteok.jpg",
    name: { ko: "일반 메뉴", en: "Sides & Snacks", zh: "炒菜 · 小吃", ja: "一品料理", vi: "Món thường" },
    items: [
      { price: 120000, name: { ko: "찐만두", en: "Steamed Dumplings", zh: "蒸饺", ja: "蒸し餃子", vi: "Bánh bao" } },
      { price: 150000, name: { ko: "탕수만두", en: "Sweet & Sour Fried Dumplings", zh: "糖醋饺子", ja: "揚げ餃子の甘酢あん", vi: "Sủi cảo chiên" } },
      { price: 150000, name: { ko: "떡볶이", en: "Tteokbokki (Spicy Rice Cakes)", zh: "辣炒年糕", ja: "トッポッキ", vi: "Tteokbokki" } },
      { price: 170000, name: { ko: "스팸 & 계란후라이", en: "Spam & Fried Egg", zh: "SPAM & 煎蛋", ja: "スパム＆目玉焼き", vi: "SPAM & Ốp la" } },
      { price: 250000, name: { ko: "아이스황도", en: "Iced Yellow Peaches", zh: "黄桃罐头", ja: "冷やし黄桃", vi: "Đào đá" } },
    ],
  },
  {
    id: "meal",
    photo: "img/naeng.jpg",
    name: { ko: "식사", en: "Meals & Noodles", zh: "吃饭", ja: "お食事", vi: "Món ăn chính" },
    items: [
      { price: 50000, name: { ko: "된장찌개", en: "Doenjang Jjigae (Soybean Paste Stew)", zh: "大酱汤", ja: "テンジャンチゲ", vi: "Canh tương thối" } },
      { price: 70000, name: { ko: "청국장", en: "Cheonggukjang (Fermented Soybean Stew)", zh: "清麴酱汤", ja: "チョングクチャン", vi: "Canh đậu tương" } },
      { price: 60000, name: { ko: "냉면 (물/비빔)", en: "Naengmyeon – Cold Noodles (Broth / Spicy)", zh: "水冷面 / 拌冷面", ja: "冷麺（水／ビビン）", vi: "Miến lạnh (nước/trộn)" } },
      { price: 130000, name: { ko: "콩국수", en: "Cold Soy Milk Noodles", zh: "冷豆浆面", ja: "コングクス（豆乳冷麺）", vi: "Mỳ đậu lành" } },
    ],
  },
  {
    id: "preorder",
    photo: "img/eel.jpg",
    notice: "h120",
    name: { ko: "예약 메뉴", en: "Pre-order Only", zh: "预订菜单", ja: "予約メニュー", vi: "Món đặt trước" },
    items: [
      { price: 900000, unit: "1kg", name: { ko: "장어", en: "Grilled Eel", zh: "河鳗", ja: "ウナギ", vi: "Cá chình" } },
      { price: 800000, name: { ko: "누룽지 백숙", en: "Ginseng Chicken with Scorched Rice", zh: "药膳炖鸡", ja: "ヌルンジペクスク（おこげ入り参鶏鍋）", vi: "Gà hầm sâm" } },
      { price: 800000, unit: "1kg", name: { ko: "새우 소금구이", en: "Salt-grilled Shrimp", zh: "盐烤虾", ja: "エビの塩焼き", vi: "Tôm hấp muối" } },
      // 원본 메뉴판 중국어가 "盐烤虾"(새우)로 잘못 들어가 있어 내용에 맞게 수정. 베트남어는 원본 그대로
      { price: 600000, name: { ko: "연포탕 (낙지, 우삼겹)", en: "Octopus & Beef Belly Soup", zh: "章鱼牛五花汤", ja: "ヨンポタン（タコと牛バラの鍋）", vi: "Lẩu ruốc" } },
      { price: 600000, name: { ko: "쪽갈비 김치찜", en: "Braised Pork Ribs with Kimchi", zh: "排骨炖泡菜", ja: "スペアリブのキムチチム", vi: "Sườn hầm kimchi" } },
    ],
  },
  {
    id: "drinks",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水", ja: "ドリンク", vi: "Đồ uống" },
    items: [
      { price: 130000, name: { ko: "소주", en: "Soju", zh: "韩国烧酒", ja: "焼酎（ソジュ）", vi: "Soju" } },
      { price: 160000, name: { ko: "막걸리", en: "Makgeolli (Rice Wine)", zh: "韩国米酒", ja: "マッコリ", vi: "Rượu gạo" } },
      { price: 180000, name: { ko: "설원 (중국술)", en: "Xueyuan (Chinese Baijiu)", zh: "林海雪原", ja: "林海雪原（中国白酒）", vi: "Rượu Lâm Hải Tuyết Nguyên (Trung Quốc)" } },
      { price: 130000, name: { ko: "백년호도 (중국술)", en: "Bainian Hutu (Chinese Baijiu)", zh: "百年糊涂", ja: "百年糊塗（中国白酒）", vi: "Rượu Bách Niên Hồ Đồ (Trung Quốc)" } },
      { price: 50000, name: { ko: "맥주", en: "Beer", zh: "啤酒", ja: "ビール", vi: "Bia" } },
      { price: 20000, name: { ko: "음료", en: "Soft Drink", zh: "汽水", ja: "ソフトドリンク", vi: "Nước ngọt" } },
    ],
  },
];
