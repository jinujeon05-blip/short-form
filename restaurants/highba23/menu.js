// Highba23.pub 메뉴 데이터 — 출처: 메뉴판 사진(구글 지도 업로드) 2026-11-26
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만 — 정사각형이면 양옆 흰 여백)
// 메뉴판 사진끼리 가격이 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "하이바23 펍", en: "HIGHBA23 PUB" },
  phone: "0867230826",
  address: "The Manor, tháp B/B009 P. Đỗ Đình Thiện, The Manor - Hà Nội, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:00 – 02:00",
};

window.MENU = [
  {
    id: "food",
    name: { ko: "음식", en: "Food", zh: "美食", ja: "フード", vi: "Món ăn" },
    note: {
      ko: "모든 음식 180,000동",
      en: "All food 180,000 VND",
      zh: "所有美食均为180,000越南盾",
      ja: "全フード180,000ドン",
      vi: "Tất cả món ăn 180,000 VND",
    },
    items: [
      { name: { ko: "타코 (돼지고기·닭고기)", en: "Pork · Chicken Tacos", zh: "墨西哥塔可（猪肉·鸡肉）", ja: "タコス（豚肉・鶏肉）", vi: "Taco thịt heo · thịt gà" }, price: 180000 },
      { name: { ko: "진짜 독일 소시지", en: "Authentic German Sausage", zh: "正宗德国香肠", ja: "本場ドイツソーセージ", vi: "Xúc xích Đức chính hiệu" }, price: 180000, photo: "img/sausage.jpg" },
      { name: { ko: "멕시칸 윙봉", en: "Mexican Chicken Wings", zh: "墨西哥风味鸡翅", ja: "メキシカンチキンウィング", vi: "Cánh gà kiểu Mexico" }, price: 180000 },
      { name: { ko: "치즈 나초", en: "Cheese Nachos", zh: "芝士玉米片", ja: "チーズナチョス", vi: "Nachos phô mai" }, price: 180000, photo: "img/nachos.jpg" },
      { name: { ko: "파스타 (크림·토마토)", en: "Cream · Tomato Pasta", zh: "意大利面（奶油·番茄）", ja: "パスタ（クリーム・トマト）", vi: "Mì Ý sốt kem · cà chua" }, price: 180000 },
      { name: { ko: "시저 샐러드", en: "Caesar Salad", zh: "凯撒沙拉", ja: "シーザーサラダ", vi: "Salad Caesar" }, price: 180000 },
      { name: { ko: "치즈 플래터", en: "Cheese Platter", zh: "芝士拼盘", ja: "チーズプラッター", vi: "Đĩa phô mai" }, price: 180000 },
      { name: { ko: "감바스", en: "Gambas Shrimp", zh: "蒜香橄榄油虾", ja: "ガンバス（エビのアヒージョ）", vi: "Tôm Gambas" }, price: 180000 },
      { name: { ko: "폭립", en: "BBQ Pork Ribs", zh: "烧烤猪肋排", ja: "BBQポークリブ", vi: "Sườn heo nướng BBQ" }, price: 180000 },
      { name: { ko: "피쉬 앤 칩스", en: "Fish and Chips", zh: "炸鱼薯条", ja: "フィッシュ＆チップス", vi: "Cá và khoai tây chiên" }, price: 180000 },
      { name: { ko: "감자튀김", en: "French Fries", zh: "炸薯条", ja: "フライドポテト", vi: "Khoai tây chiên" }, price: 180000 },
      { name: { ko: "과일 플래터", en: "Fruit Platter", zh: "水果拼盘", ja: "フルーツプラッター", vi: "Đĩa trái cây" }, price: 180000, photo: "img/fruit.jpg" },
      { name: { ko: "먹태 (구운 말린 명태)", en: "Grilled Dried Pollack (Meoktae)", zh: "烤干明太鱼（Meoktae）", ja: "焼き干しスケトウダラ（モクテ）", vi: "Cá minh thái khô nướng" }, price: 180000 },
      { name: { ko: "마른오징어", en: "Grilled Dried Squid", zh: "烤鱿鱼干", ja: "焼きスルメイカ", vi: "Mực khô nướng" }, price: 180000 },
      { name: { ko: "해물떡볶이", en: "Seafood Tteokbokki", zh: "海鲜辣炒年糕（Tteokbokki）", ja: "海鮮トッポッキ", vi: "Bánh gạo cay hải sản" }, price: 180000 },
    ],
  },
  {
    id: "day",
    name: { ko: "낮 메뉴", en: "Daytime Menu", zh: "日间菜单", ja: "昼メニュー", vi: "Thực đơn ban ngày" },
    note: {
      ko: "낮 10:30~16:30 한정",
      en: "Daytime only, 10:30–16:30",
      zh: "仅限白天 10:30~16:30",
      ja: "昼 10:30～16:30 限定",
      vi: "Chỉ phục vụ ban ngày 10:30–16:30",
    },
    items: [
      { name: { ko: "아메리카노 (달랏산 원두)", en: "Americano (Da Lat beans)", zh: "美式咖啡（大叻咖啡豆）", ja: "アメリカーノ（ダラット産豆）", vi: "Americano (hạt cà phê Đà Lạt)" }, price: 30000 },
      { name: { ko: "호텔식 블랙퍼스트", en: "Hotel-style Breakfast", zh: "酒店式早餐", ja: "ホテル風ブレックファスト", vi: "Bữa sáng kiểu khách sạn" }, price: 180000 },
      { name: { ko: "진짜 미국식 핫도그", en: "Authentic American Hot Dog", zh: "正宗美式热狗", ja: "本格アメリカンホットドッグ", vi: "Hot dog kiểu Mỹ chính hiệu" }, price: 100000 },
      { name: { ko: "직접 착즙 오렌지 3개 주스", en: "Freshly Squeezed Juice of 3 Oranges", zh: "现榨3个橙子鲜榨果汁", ja: "オレンジ3個の搾りたてジュース", vi: "Nước cam vắt tươi từ 3 quả cam" }, price: 50000 },
    ],
  },
  {
    id: "craft",
    name: { ko: "수제맥주", en: "Craft Beer", zh: "精酿啤酒", ja: "クラフトビール", vi: "Bia thủ công" },
    items: [
      { name: { ko: "JASMINE IPA", en: "JASMINE IPA", zh: "JASMINE IPA", ja: "JASMINE IPA", vi: "JASMINE IPA" }, desc: { ko: "6.5% · IBU 50", en: "6.5% · IBU 50", zh: "6.5% · IBU 50", ja: "6.5% · IBU 50", vi: "6.5% · IBU 50" }, price: 120000 },
      { name: { ko: "POMELO IPA", en: "POMELO IPA", zh: "POMELO IPA", ja: "POMELO IPA", vi: "POMELO IPA" }, desc: { ko: "6.2% · IBU 31", en: "6.2% · IBU 31", zh: "6.2% · IBU 31", ja: "6.2% · IBU 31", vi: "6.2% · IBU 31" }, price: 120000 },
      { name: { ko: "IRISH STOUT", en: "IRISH STOUT", zh: "IRISH STOUT", ja: "IRISH STOUT", vi: "IRISH STOUT" }, desc: { ko: "4.5% · IBU 25", en: "4.5% · IBU 25", zh: "4.5% · IBU 25", ja: "4.5% · IBU 25", vi: "4.5% · IBU 25" }, price: 120000 },
      { name: { ko: "PALE ALE", en: "PALE ALE", zh: "PALE ALE", ja: "PALE ALE", vi: "PALE ALE" }, desc: { ko: "5.0% · IBU 32", en: "5.0% · IBU 32", zh: "5.0% · IBU 32", ja: "5.0% · IBU 32", vi: "5.0% · IBU 32" }, price: 120000 },
      { name: { ko: "CHANH MUỐI (찬무오이)", en: "CHANH MUỐI (Salted Lemon Beer)", zh: "CHANH MUỐI（咸柠檬啤酒）", ja: "CHANH MUỐI（塩漬けレモンビール）", vi: "CHANH MUỐI" }, desc: { ko: "소금절임 레몬 맥주 · 2.5% · IBU 11", en: "Salted lemon beer · 2.5% · IBU 11", zh: "咸柠檬啤酒 · 2.5% · IBU 11", ja: "塩漬けレモンビール · 2.5% · IBU 11", vi: "Bia chanh muối · 2.5% · IBU 11" }, price: 120000 },
    ],
  },
  {
    id: "draft",
    name: { ko: "생맥주", en: "Draft Beer", zh: "生啤", ja: "生ビール", vi: "Bia tươi" },
    items: [
      { name: { ko: "삿포로", en: "Sapporo", zh: "札幌", ja: "サッポロ", vi: "Sapporo" }, sizes: [["38cl", 85000], ["3L", 670000]] },
      { name: { ko: "블랑 1664", en: "Blanc 1664", zh: "1664白啤", ja: "ブラン1664", vi: "Blanc 1664" }, sizes: [["38cl", 85000], ["3L", 670000]] },
      { name: { ko: "칼스버그", en: "Carlsberg", zh: "嘉士伯", ja: "カールスバーグ", vi: "Carlsberg" }, sizes: [["38cl", 85000], ["3L", 670000]] },
      { name: { ko: "하이네켄", en: "Heineken", zh: "喜力", ja: "ハイネケン", vi: "Heineken" }, sizes: [["38cl", 85000], ["3L", 670000]] },
      { name: { ko: "타이거", en: "Tiger", zh: "虎牌", ja: "タイガー", vi: "Tiger" }, sizes: [["38cl", 75000], ["3L", 600000]] },
    ],
  },
  {
    id: "bottle",
    name: { ko: "병맥주", en: "Bottled Beer", zh: "瓶装啤酒", ja: "瓶ビール", vi: "Bia chai" },
    items: [
      { name: { ko: "타이거 크리스탈", en: "Tiger Crystal", zh: "虎牌水晶", ja: "タイガークリスタル", vi: "Tiger Crystal" }, price: 60000 },
      { name: { ko: "코로나", en: "Corona", zh: "科罗娜", ja: "コロナ", vi: "Corona" }, price: 90000 },
      { name: { ko: "버드와이저", en: "Budweiser", zh: "百威", ja: "バドワイザー", vi: "Budweiser" }, price: 90000 },
      { name: { ko: "호가든", en: "Hoegaarden", zh: "福佳白啤", ja: "ヒューガルデン", vi: "Hoegaarden" }, price: 90000 },
      { name: { ko: "기네스", en: "Guinness", zh: "健力士", ja: "ギネス", vi: "Guinness" }, price: 200000, photo: "img/guinness.jpg" },
    ],
  },
  {
    id: "highball",
    name: { ko: "하이볼·칵테일", en: "Highball & Cocktails", zh: "嗨棒·鸡尾酒", ja: "ハイボール・カクテル", vi: "Highball & Cocktail" },
    items: [
      { name: { ko: "레몬 하이볼", en: "Lemon Highball", zh: "柠檬嗨棒", ja: "レモンハイボール", vi: "Highball chanh" }, price: 120000 },
      { name: { ko: "얼그레이 하이볼", en: "Earl Grey Highball", zh: "伯爵茶嗨棒", ja: "アールグレイハイボール", vi: "Highball Earl Grey" }, price: 120000 },
      { name: { ko: "모히토", en: "Mojito", zh: "莫吉托", ja: "モヒート", vi: "Mojito" }, price: 150000 },
    ],
  },
  {
    id: "wine",
    name: { ko: "와인", en: "Wine", zh: "葡萄酒", ja: "ワイン", vi: "Rượu vang" },
    note: { ko: "1병 가격", en: "Price per bottle", zh: "每瓶价格", ja: "1本の価格", vi: "Giá mỗi chai" },
    items: [
      { name: { ko: "몬테스 클래식 멜롯", en: "Montes Classic Merlot", zh: "蒙特斯经典梅洛", ja: "モンテス クラシック メルロー", vi: "Montes Classic Merlot" }, price: 1200000 },
      { name: { ko: "몬테스 클래식 카베르네 소비뇽", en: "Montes Classic Cabernet Sauvignon", zh: "蒙特斯经典赤霞珠", ja: "モンテス クラシック カベルネ・ソーヴィニヨン", vi: "Montes Classic Cabernet Sauvignon" }, price: 1200000 },
    ],
  },
  {
    id: "whisky",
    name: { ko: "위스키", en: "Whisky", zh: "威士忌", ja: "ウイスキー", vi: "Whisky" },
    items: [
      { name: { ko: "발렌타인 17년", en: "Ballantine's 17 Years", zh: "百龄坛17年", ja: "バランタイン17年", vi: "Ballantine's 17 năm" }, price: 5000000 },
      { name: { ko: "발렌타인 30년", en: "Ballantine's 30 Years", zh: "百龄坛30年", ja: "バランタイン30年", vi: "Ballantine's 30 năm" }, price: 18000000 },
      { name: { ko: "조니워커 골드", en: "Johnnie Walker Gold", zh: "尊尼获加金牌", ja: "ジョニーウォーカー ゴールド", vi: "Johnnie Walker Gold" }, price: 4000000 },
      { name: { ko: "조니워커 블루", en: "Johnnie Walker Blue", zh: "尊尼获加蓝牌", ja: "ジョニーウォーカー ブルー", vi: "Johnnie Walker Blue" }, price: 10000000 },
      { name: { ko: "맥캘란 12년", en: "Macallan 12 Years", zh: "麦卡伦12年", ja: "マッカラン12年", vi: "Macallan 12 năm" }, price: 5000000 },
      { name: { ko: "맥캘란 15년", en: "Macallan 15 Years", zh: "麦卡伦15年", ja: "マッカラン15年", vi: "Macallan 15 năm" }, price: 10000000 },
      { name: { ko: "로얄살루트 21년", en: "Royal Salute 21 Years", zh: "皇家礼炮21年", ja: "ロイヤルサルート21年", vi: "Royal Salute 21 năm" }, price: 9000000 },
    ],
  },
  {
    id: "soju",
    name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "ソジュ（焼酎）", vi: "Soju" },
    items: [
      { name: { ko: "참이슬", en: "Chamisul", zh: "参真露（Chamisul）", ja: "チャミスル", vi: "Chamisul" }, price: 200000 },
      { name: { ko: "새로", en: "Saero", zh: "新绿（Saero）", ja: "セロ", vi: "Saero" }, price: 200000 },
      { name: { ko: "처음처럼", en: "Chum-churum", zh: "初饮初乐（Chum-churum）", ja: "チュムチュロム", vi: "Chum-churum" }, price: 200000 },
      { name: { ko: "진로", en: "Jinro", zh: "真露（Jinro）", ja: "ジンロ", vi: "Jinro" }, price: 200000 },
    ],
  },
  {
    id: "soft",
    name: { ko: "음료", en: "Drinks", zh: "饮料", ja: "ドリンク", vi: "Đồ uống" },
    items: [
      { name: { ko: "제로콜라", en: "Coke Zero", zh: "零度可乐", ja: "コカ・コーラ ゼロ", vi: "Coke Zero" }, price: 30000 },
      { name: { ko: "코카콜라", en: "Coca-Cola", zh: "可口可乐", ja: "コカ・コーラ", vi: "Coca-Cola" }, price: 30000 },
      { name: { ko: "스프라이트", en: "Sprite", zh: "雪碧", ja: "スプライト", vi: "Sprite" }, price: 30000 },
      { name: { ko: "레드불", en: "Red Bull", zh: "红牛", ja: "レッドブル", vi: "Red Bull" }, price: 30000 },
      { name: { ko: "소다워터", en: "Soda Water", zh: "苏打水", ja: "ソーダ水", vi: "Soda" }, price: 30000 },
      { name: { ko: "생수", en: "Water", zh: "矿泉水", ja: "ミネラルウォーター", vi: "Nước suối" }, price: 20000 },
      { name: { ko: "커피", en: "Coffee", zh: "咖啡", ja: "コーヒー", vi: "Cà phê" }, price: 60000 },
      { name: { ko: "오렌지주스", en: "Orange Juice", zh: "橙汁", ja: "オレンジジュース", vi: "Nước cam" }, price: 70000 },
    ],
  },
];
