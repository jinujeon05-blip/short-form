// Korilla 펍 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(사진 수집기 2026-11-10) menu_04·05·12·13(음식), menu_10·11·18(술)
// 읽기: 안티그래비티(제미나이) → 재대조: 운영 감찰관(안티그래비티 Claude Sonnet) 전부 일치
// menu_01 '프리미엄 메뉴 SIGNATURE 1~19'(스테이크·피자·파스타·해산물)는 글자가 흐리게 가려져 있어 넣지 않음(docs/todo.md 에 적음)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "코릴라 펍", en: "Korilla Pub" },
  phone: "0934 691 611",
  address: "CT4 Đ. Mễ Trì, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "17:00 – 01:00",
};

const it = (price, ko, en, zh, ja, vi, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price }), name: { ko, en, zh, ja, vi }, ...x });
const gb = (g, b) => [["Glass", g], ["Bottle", b]];
const cat = (id, ko, en, zh, ja, vi, items, x = {}) => ({ id, name: { ko, en, zh, ja, vi }, ...x, items });

window.MENU = [
  cat("chicken", "치킨", "Chicken", "炸鸡", "チキン", "Gà", [
    it([["S", 200000], ["L", 300000]], "순살 후라이드", "Boneless Fried Chicken", "无骨炸鸡", "骨なしフライドチキン", "Gà rán không xương"),
    it([["S", 250000], ["L", 350000]], "순살 양념치킨", "Boneless Seasoned Chicken (Yangnyeom)", "无骨甜辣酱炸鸡", "骨なしヤンニョムチキン", "Gà tẩm gia vị không xương"),
    it(350000, "반반 치킨", "Half & Half Chicken", "半半炸鸡", "ハーフ＆ハーフチキン", "Gà rán mix (nửa rán, nửa sốt)"),
    it(250000, "치킨 텐더 & 칩스", "Chicken Tenders & Chips", "鸡柳薯条", "チキンテンダー＆ポテト", "Gà tẩm bột & khoai tây chiên"),
    it(200000, "닭똥집 튀김", "Fried Chicken Gizzard", "炸鸡胗", "鶏の砂肝フライ", "Mề gà chiên"),
    it([["S", 290000], ["L", 490000]], "경산 찜닭", "Gyeongsan Braised Chicken (Jjimdak)", "庆山韩式酱炖鸡", "慶山チムタク（鶏の甘辛蒸し煮）", "Gà hấp sốt xì dầu"),
  ], { note: { ko: "S = 반 마리", en: "S = half portion", zh: "S = 半只", ja: "S = 半羽", vi: "S = nửa con" } }),

  cat("fried", "튀김", "Deep-fried", "炸物", "揚げ物", "Chiên", [
    it(300000, "안주 돈까스", "Pork Cutlet (Donkatsu)", "炸猪排", "とんかつ", "Thịt lợn chiên xù", { photo: "img/donkas.jpg" }),
    it(200000, "오징어 튀김", "Fried Squid", "炸鱿鱼", "イカフライ", "Mực chiên"),
    it(350000, "새우 튀김", "Shrimp Tempura", "炸虾", "海老の天ぷら", "Tôm chiên"),
    it(250000, "모듬 튀김", "Assorted Fries", "什锦炸物", "揚げ物盛り合わせ", "Chiên thập cẩm"),
    it(160000, "감자 튀김", "French Fries", "炸薯条", "フライドポテト", "Khoai tây chiên"),
    it(120000, "고구마 스틱", "Sweet Potato Sticks", "地瓜条", "さつまいもスティック", "Khoai lang chiên"),
  ]),

  cat("salad", "샐러드", "Salad", "沙拉", "サラダ", "Salad", [
    it(350000, "멕시칸 샐러드", "Mexican Salad", "墨西哥沙拉", "メキシカンサラダ", "Salad Mexico"),
    it(250000, "케이준 샐러드", "Cajun Salad", "卡津沙拉", "ケイジャンサラダ", "Salad Cajun"),
    it(390000, "연어 샐러드", "Salmon Salad", "三文鱼沙拉", "サーモンサラダ", "Salad cá hồi"),
    it(390000, "골뱅이 소면", "Seasoned Whelk with Noodles", "凉拌海螺细面", "つぶ貝の和えそうめん", "Ốc trộn bún"),
  ]),

  cat("snack", "분식", "Snack", "小吃", "粉食（軽食）", "Ăn vặt", [
    it(200000, "떡볶이", "Tteokbokki", "炒年糕", "トッポッキ", "Tokbokki", { photo: "img/tteokbokki.jpg", desc: { ko: "순한맛·매운맛 선택", en: "Mild or spicy", zh: "可选微辣或辣", ja: "マイルド・辛口から選べます", vi: "Chọn vị nhẹ hoặc cay" } }),
    it(250000, "로제 떡볶이", "Rosé Tteokbokki", "玫瑰酱炒年糕", "ロゼトッポッキ", "Tokbokki sốt Rosé"),
  ]),

  cat("stirfry", "볶음 & 탕", "Stir-fried & Soup", "炒菜 & 汤锅", "炒め物＆鍋", "Xào & Lẩu", [
    it(250000, "오징어 볶음", "Stir-fried Squid", "炒鱿鱼", "イカ炒め", "Mực xào"),
    it(250000, "닭똥집 볶음", "Stir-fried Chicken Gizzard", "炒鸡胗", "鶏の砂肝炒め", "Mề gà xào"),
    it(250000, "쏘세지 야채 볶음", "Sausage & Vegetable Stir-fry", "香肠炒蔬菜", "ソーセージと野菜の炒め", "Xúc xích xào rau"),
    it(250000, "스팸 & 계란 후라이", "Spam & Fried Egg", "午餐肉煎蛋", "スパム＆目玉焼き", "Spam & trứng chiên"),
    it(350000, "부산 오뎅탕", "Busan Fish Cake Soup", "釜山鱼糕汤", "釜山風おでん鍋", "Canh chả cá Busan", { photo: "img/odeng.jpg" }),
    it(390000, "매콤 짬뽕탕", "Spicy Seafood Noodle Soup (Jjamppong)", "辣味海鲜汤（炒码汤）", "ピリ辛チャンポンスープ", "Lẩu hải sản cay", { spicy: true }),
  ]),

  cat("dry", "마른안주 & 과일", "Dry Snacks & Fruit", "干货下酒菜 & 水果", "乾き物＆フルーツ", "Đồ khô & Hoa quả", [
    it(390000, "모듬 마른 안주", "Assorted Dry Snacks", "什锦干货下酒菜", "乾き物盛り合わせ", "Đồ khô thập cẩm"),
    it(390000, "계절 과일", "Seasonal Fruit Platter", "时令水果拼盘", "季節のフルーツ盛り合わせ", "Hoa quả thập cẩm", { photo: "img/fruit.jpg" }),
    it(250000, "과일 화채", "Fruit Punch (Hwachae)", "韩式水果冷饮", "フルーツファチェ（韓国風フルーツポンチ）", "Hoa quả dầm"),
    it(250000, "아이스 황도", "Iced Yellow Peach", "冰黄桃", "冷やし黄桃", "Đào ngâm lạnh"),
    it(300000, "황태채 구이", "Grilled Dried Pollack", "烤明太鱼干丝", "干しスケトウダラの炙り", "Cá khô nướng", { photo: "img/hwangtae.jpg" }),
    it(350000, "한치 & 쥐포 튀김", "Fried Cuttlefish & Filefish Jerky", "炸小鱿鱼 & 炸马面鱼干", "ヤリイカ＆カワハギ干しの揚げ物", "Mực & cá chỉ vàng chiên"),
  ]),

  cat("highball", "하이볼", "Highball", "嗨棒（Highball）", "ハイボール", "Highball", [
    it(gb(120000, 1500000), "제임슨 하이볼", "Jameson Highball", "尊美醇嗨棒", "ジェムソン ハイボール", "Jameson Highball"),
    it(gb(120000, 2800000), "산토리 하이볼", "Suntory Highball", "三得利嗨棒", "サントリー ハイボール", "Suntory Highball"),
    it(gb(140000, 2000000), "짐빔 하이볼", "Jim Beam Highball", "金宾嗨棒", "ジムビーム ハイボール", "Jim Beam Highball"),
    it(gb(140000, 2500000), "메이커스 마크 하이볼", "Maker's Mark Highball", "美格嗨棒", "メーカーズマーク ハイボール", "Maker's Mark Highball"),
    it(gb(140000, 2000000), "와일드 터키 하이볼", "Wild Turkey Highball", "野火鸡嗨棒", "ワイルドターキー ハイボール", "Wild Turkey Highball"),
    it(gb(160000, 2200000), "조니워커 하이볼", "Johnnie Walker Highball", "尊尼获加嗨棒", "ジョニーウォーカー ハイボール", "Johnnie Walker Highball"),
    it(gb(180000, 3000000), "몽키 숄더 하이볼", "Monkey Shoulder Highball", "猴子肩膀嗨棒", "モンキーショルダー ハイボール", "Monkey Shoulder Highball"),
    it(130000, "얼그레이 하이볼", "Earl Grey Highball", "伯爵茶嗨棒", "アールグレイ ハイボール", "Earl Grey Highball", { desc: { ko: "기주 선택: 산토리·제임슨·짐빔", en: "Base: Suntory, Jameson or Jim Beam", zh: "可选基酒：三得利、尊美醇、金宾", ja: "ベース選択：サントリー・ジェムソン・ジムビーム", vi: "Chọn rượu nền: Suntory, Jameson, Jim Beam" } }),
  ], { note: { ko: "Bottle = 그 위스키 한 병 가격", en: "Bottle = price for a full bottle of that whisky", zh: "Bottle = 该威士忌整瓶的价格", ja: "Bottle = そのウイスキー1本の価格", vi: "Bottle = giá nguyên chai rượu đó" } }),

  cat("whisky", "위스키 & 양주", "Whisky & Spirits", "威士忌 & 洋酒", "ウイスキー＆洋酒", "Whisky & Rượu mạnh", [
    it(gb(150000, 1900000), "조니워커 블랙", "Johnnie Walker Black", "尊尼获加黑牌", "ジョニーウォーカー ブラック", "Johnnie Walker Black"),
    it(gb(200000, 2500000), "조니워커 골드", "Johnnie Walker Gold", "尊尼获加金牌", "ジョニーウォーカー ゴールド", "Johnnie Walker Gold"),
    it(gb(640000, 8000000), "조니워커 블루", "Johnnie Walker Blue", "尊尼获加蓝牌", "ジョニーウォーカー ブルー", "Johnnie Walker Blue"),
    it(gb(280000, 3500000), "시바스 리갈 18년", "Chivas Regal 18", "芝华士18年", "シーバスリーガル 18年", "Chivas Regal 18"),
    it(gb(400000, 5000000), "로얄 살루트 21년", "Royal Salute 21", "皇家礼炮21年", "ロイヤルサルート 21年", "Royal Salute 21"),
    it(gb(120000, 1500000), "발렌타인 12년", "Ballantine's 12", "百龄坛12年", "バランタイン 12年", "Ballantine's 12"),
    it(gb(440000, 5500000), "발렌타인 21년", "Ballantine's 21", "百龄坛21年", "バランタイン 21年", "Ballantine's 21"),
    it(gb(320000, 4000000), "발베니 12년", "Balvenie 12", "百富12年", "ザ・バルヴェニー 12年", "Balvenie 12"),
    it(gb(960000, 12000000), "발베니 18년", "Balvenie 18", "百富18年", "ザ・バルヴェニー 18年", "Balvenie 18"),
    it(gb(1520000, 19000000), "발베니 21년", "Balvenie 21", "百富21年", "ザ・バルヴェニー 21年", "Balvenie 21"),
    it(gb(320000, 4000000), "맥캘란 12년", "Macallan 12", "麦卡伦12年", "マッカラン 12年", "Macallan 12"),
    it(gb(640000, 8000000), "맥캘란 15년", "Macallan 15", "麦卡伦15年", "マッカラン 15年", "Macallan 15"),
    it(gb(1280000, 16000000), "맥캘란 18년", "Macallan 18", "麦卡伦18年", "マッカラン 18年", "Macallan 18"),
    it(gb(200000, 2500000), "글렌피딕 12년", "Glenfiddich 12", "格兰菲迪12年", "グレンフィディック 12年", "Glenfiddich 12"),
    it(gb(520000, 6500000), "글렌피딕 18년", "Glenfiddich 18", "格兰菲迪18年", "グレンフィディック 18年", "Glenfiddich 18"),
    it(gb(800000, 10000000), "글렌피딕 21년", "Glenfiddich 21", "格兰菲迪21年", "グレンフィディック 21年", "Glenfiddich 21"),
    it(gb(150000, 1900000), "잭 다니엘 No.7", "Jack Daniel's No.7", "杰克丹尼 No.7", "ジャックダニエル No.7", "Jack Daniel's No.7"),
    it(gb(250000, 3200000), "그레이 구스", "Grey Goose", "灰雁伏特加", "グレイグース", "Grey Goose"),
    it(gb(120000, 1500000), "호세 쿠엘보 에스페셜", "Jose Cuervo Especial", "豪帅快活 Especial", "ホセ・クエルボ エスペシャル", "Jose Cuervo Especial"),
    it(gb(140000, 1800000), "호세 쿠엘보 실버", "Jose Cuervo Silver", "豪帅快活 银标", "ホセ・クエルボ シルバー", "Jose Cuervo Silver"),
    it(gb(320000, 4000000), "레미 마르탱 VSOP", "Rémy Martin VSOP", "人头马VSOP", "レミーマルタン VSOP", "Rémy Martin VSOP"),
    it(gb(880000, 11000000), "레미 마르탱 XO", "Rémy Martin XO", "人头马XO", "レミーマルタン XO", "Rémy Martin XO"),
    it(gb(320000, 4000000), "헤네시 VSOP", "Hennessy VSOP", "轩尼诗VSOP", "ヘネシー VSOP", "Hennessy VSOP"),
    it(gb(880000, 11000000), "헤네시 XO", "Hennessy XO", "轩尼诗XO", "ヘネシー XO", "Hennessy XO"),
    it(190000, "칵테일 오마카세", "Cocktail Omakase", "主厨特调鸡尾酒（Omakase）", "カクテルおまかせ", "Cocktail Omakase", { desc: { ko: "무알콜도 가능", en: "Non-alcoholic available", zh: "也可做无酒精款", ja: "ノンアルコールも可能", vi: "Có thể làm không cồn" } }),
  ]),

  cat("craft", "수제 맥주", "Craft Beer", "精酿啤酒", "クラフトビール", "Bia thủ công", [
    it(120000, "페일 에일", "Pale Ale", "淡色艾尔", "ペールエール", "Pale Ale", { desc: { ko: "5% · 330ml", en: "5% · 330ml", zh: "5% · 330ml", ja: "5% · 330ml", vi: "5% · 330ml" } }),
    it(120000, "스타우트 나이트로 아이리시", "Stout Nitro Irish", "爱尔兰氮气世涛", "アイリッシュ ナイトロスタウト", "Stout Nitro Irish", { desc: { ko: "4.5% · 330ml", en: "4.5% · 330ml", zh: "4.5% · 330ml", ja: "4.5% · 330ml", vi: "4.5% · 330ml" } }),
    it(120000, "앰버 에일", "Amber Ale", "琥珀艾尔", "アンバーエール", "Amber Ale", { desc: { ko: "6.5% · 330ml", en: "6.5% · 330ml", zh: "6.5% · 330ml", ja: "6.5% · 330ml", vi: "6.5% · 330ml" } }),
    it(120000, "포멜로 IPA", "Pomelo IPA", "柚子IPA", "ポメロIPA", "Pomelo IPA", { desc: { ko: "6.2% · 330ml", en: "6.2% · 330ml", zh: "6.2% · 330ml", ja: "6.2% · 330ml", vi: "6.2% · 330ml" } }),
    it(110000, "솔티드 레모네이드", "Salted Lemonade", "海盐柠檬啤酒", "ソルティレモネード", "Salted Lemonade", { desc: { ko: "2.2% · 330ml", en: "2.2% · 330ml", zh: "2.2% · 330ml", ja: "2.2% · 330ml", vi: "2.2% · 330ml" } }),
    it(120000, "자스민 IPA", "Jasmine IPA", "茉莉花IPA", "ジャスミンIPA", "Jasmine IPA", { desc: { ko: "6.5% · 330ml", en: "6.5% · 330ml", zh: "6.5% · 330ml", ja: "6.5% · 330ml", vi: "6.5% · 330ml" } }),
  ]),

  cat("beer", "맥주", "Beer", "啤酒", "ビール", "Bia", [
    it(80000, "칼스버그 생맥주", "Carlsberg Draft", "嘉士伯生啤", "カールスバーグ 生ビール", "Bia tươi Carlsberg", { desc: { ko: "330ml", en: "330ml", zh: "330ml", ja: "330ml", vi: "330ml" } }),
    it(80000, "블랑 생맥주", "Blanc Draft", "Blanc 白啤生啤", "ブラン 生ビール", "Bia tươi Blanc", { desc: { ko: "330ml", en: "330ml", zh: "330ml", ja: "330ml", vi: "330ml" } }),
    it(700000, "피처 타워", "Pitcher Tower", "啤酒塔", "ビールタワー", "Tháp bia", { desc: { ko: "3000cc", en: "3000cc", zh: "3000cc", ja: "3000cc", vi: "3000cc" } }),
    it(60000, "타이거", "Tiger", "虎牌", "タイガー", "Tiger"),
    it(70000, "버드와이저", "Budweiser", "百威", "バドワイザー", "Budweiser"),
    it(90000, "코로나", "Corona", "科罗娜", "コロナ", "Corona"),
    it(90000, "호가든", "Hoegaarden", "福佳白", "ヒューガルデン", "Hoegaarden"),
    it(130000, "레페 블론드", "Leffe Blonde", "乐飞金啤", "レフ・ブロンド", "Leffe Blonde"),
  ]),

  cat("soju", "소주 & 음료", "Soju & Drinks", "烧酒 & 饮料", "焼酎＆ドリンク", "Soju & Đồ uống", [
    it(150000, "참이슬", "Chamisul", "真露 Chamisul 烧酒", "チャミスル", "Chamisul"),
    it(150000, "진로 이즈백", "Jinro is Back", "真露 is Back 烧酒", "ジンロ イズバック", "Jinro is Back"),
    it(150000, "처음처럼", "Chum Churum", "初饮初乐 烧酒", "チャムチュルム", "Chum Churum"),
    it(130000, "좋은데이", "Good Day", "Good Day 烧酒", "チョウンデー", "Good Day"),
    it(20000, "콜라", "Coke", "可乐", "コーラ", "Coca-Cola"),
    it(20000, "스프라이트", "Sprite", "雪碧", "スプライト", "Sprite"),
    it(20000, "환타", "Fanta", "芬达", "ファンタ", "Fanta"),
    it(20000, "탄산수", "Sparkling Water", "气泡水", "炭酸水", "Nước có ga"),
  ]),
];
