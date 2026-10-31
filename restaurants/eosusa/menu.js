// 어수사(OSUSA) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진 16장(2026-10-30 수집, 올린 날짜 미상), 가격 단위 VND
// price: 한 가지 가격 / sizes: [["1kg", 가격], ["1.3kg", 가격]] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "어수사", en: "OSUSA" },
  phone: "038 345 3723",
  address: "37 Lý Nhân Tông, Võ Cường, Bắc Ninh",
  wifi: null,
  hours: { ko: "10:00 – 23:30 (일요일은 22:00까지)", en: "10:00 – 23:30 (Sun until 22:00)", zh: "10:00 – 23:30（周日至22:00）", ja: "10:00 – 23:30（日曜は22:00まで）", vi: "10:00 – 23:30 (Chủ nhật đến 22:00)" }, // 구글 지도 2026-10-30 확인
};

window.MENU = [
  {
    id: "raw",
    name: { ko: "회", en: "Sashimi", zh: "生鱼片", ja: "刺身", vi: "Gỏi cá" },
    note: {
      ko: "소 1kg · 중 1.3kg · 대 1.6kg 기준, 시가는 매장에 문의",
      en: "Small 1kg · Medium 1.3kg · Large 1.6kg. Ask the staff for market-price items",
      zh: "小 1kg · 中 1.3kg · 大 1.6kg 为准,时价请向店内咨询",
      ja: "小 1kg・中 1.3kg・大 1.6kg 基準。時価は店舗にお問い合わせください",
      vi: "Nhỏ 1kg · Vừa 1.3kg · Lớn 1.6kg. Món theo thời giá vui lòng hỏi nhân viên",
    },
    items: [
      { sizes: [["1kg", 880000], ["1.3kg", 1180000], ["1.6kg", 1480000]], name: { ko: "도미 회", en: "Raw Sea Bream Sashimi", zh: "鲷鱼刺身", ja: "鯛の刺身", vi: "Gỏi cá thác" } },
      { sizes: [["1kg", 880000], ["1.3kg", 1180000], ["1.6kg", 1480000]], name: { ko: "민어 회", en: "Raw Croaker Sashimi", zh: "鮸鱼刺身", ja: "ニベの刺身", vi: "Gỏi cá sủ" } },
      { sizes: [["1kg", 1180000], ["1.3kg", 1480000], ["1.6kg", 1780000]], name: { ko: "다금바리 회", en: "Raw Longtooth Grouper Sashimi", zh: "龙趸刺身", ja: "ハタ(ダグムバリ)の刺身", vi: "Gỏi Cá Song" } },
      { sizes: [["1kg", 980000], ["1.3kg", 1280000], ["1.6kg", 1580000]], name: { ko: "병어 회", en: "Raw Butterfish Sashimi", zh: "鲳鱼刺身", ja: "マナガツオの刺身", vi: "Gỏi Cá Chim" } },
      { sizes: [["1kg", 980000], ["1.3kg", 1280000], ["1.6kg", 1580000]], name: { ko: "흑돔 회", en: "Raw Black Porgy Sashimi", zh: "黑鲷刺身", ja: "クロダイの刺身", vi: "Gỏi Cá Cháp" } },
      { price: 900000, name: { ko: "갑오징어 회", en: "Raw Cuttlefish Sashimi", zh: "墨鱼刺身", ja: "コウイカの刺身", vi: "Gỏi Mực" } },
      { price: null, name: { ko: "광어 회", en: "Raw Flounder Sashimi", zh: "牙鲆鱼刺身", ja: "ヒラメの刺身", vi: "Gỏi Cá Bơn" }, desc: { ko: "1kg 기준", en: "Per 1kg", zh: "按1kg计", ja: "1kg基準", vi: "Tính theo 1kg" } },
      { price: 1080000, name: { ko: "연어 회", en: "Raw Salmon Sashimi", zh: "三文鱼刺身", ja: "サーモンの刺身", vi: "Gỏi Cá Hồi" }, desc: { ko: "1kg 기준", en: "Per 1kg", zh: "按1kg计", ja: "1kg基準", vi: "Tính theo 1kg" } },
      { price: 1700000, photo: "img/modeum-hoe.jpg", name: { ko: "모듬회", en: "Assorted Sashimi Platter", zh: "什锦刺身拼盘", ja: "刺身盛り合わせ", vi: "Gỏi Cá Thập Cẩm" } },
      { price: 600000, name: { ko: "활어모듬회", en: "Assorted Live Fish Sashimi", zh: "活鱼什锦刺身", ja: "活魚の刺身盛り合わせ", vi: "Gỏi Cá Thập Cẩm (cá sống)" }, desc: { ko: "1인 기준 · 2인 이상 주문 가능", en: "Per person · Order for 2 or more", zh: "每人价 · 2人以上可点", ja: "1人前・2人以上で注文可", vi: "Giá 1 người · Gọi từ 2 người trở lên" } },
      { price: 900000, photo: "img/chamchi-hoe.jpg", name: { ko: "참치회", en: "Tuna Sashimi", zh: "金枪鱼刺身", ja: "マグロの刺身", vi: "Gỏi Cá Ngừ" }, desc: { ko: "1인 기준 · 2인 이상 주문 가능", en: "Per person · Order for 2 or more", zh: "每人价 · 2人以上可点", ja: "1人前・2人以上で注文可", vi: "Giá 1 người · Gọi từ 2 người trở lên" } },
    ],
  },
  {
    id: "seafood",
    name: { ko: "해산물", en: "Seafood", zh: "海鲜", ja: "海鮮", vi: "Hải sản" },
    items: [
      { price: 900000, name: { ko: "해산물모듬", en: "Assorted Seafood Platter", zh: "海鲜拼盘", ja: "海鮮盛り合わせ", vi: "Hải sản thập cẩm" }, desc: { ko: "개불·멍게·전복·해삼 등", en: "Spoon worm, sea squirt, abalone, sea cucumber, etc.", zh: "海肠、海鞘、鲍鱼、海参等", ja: "ユムシ・ホヤ・アワビ・ナマコなど", vi: "Giun biển, hải tiêu, bào ngư, hải sâm, v.v." } },
      { price: 480000, name: { ko: "개불 한접시", en: "Spoon Worm (1 plate)", zh: "海肠(一盘)", ja: "ケブル(ユムシ)1皿", vi: "Giun Biển" } },
      { price: 580000, name: { ko: "멍게 한접시", en: "Sea Squirt (1 plate)", zh: "海鞘(一盘)", ja: "ホヤ 1皿", vi: "Mongke (hải tiêu)" } },
      { price: 580000, name: { ko: "전복 한접시", en: "Abalone (1 plate)", zh: "鲍鱼(一盘)", ja: "アワビ 1皿", vi: "Bào Ngư" } },
      { price: 480000, name: { ko: "해삼 한접시", en: "Sea Cucumber (1 plate)", zh: "海参(一盘)", ja: "ナマコ 1皿", vi: "Hải Sâm" } },
      { price: 400000, name: { ko: "산낙지", en: "Live Octopus", zh: "活章鱼", ja: "活きタコ(サンナクチ)", vi: "Gỏi Bạch Tuộc" } },
      { price: 400000, name: { ko: "굴", en: "Oysters", zh: "生蚝", ja: "牡蠣", vi: "Gỏi Hàu" } },
    ],
  },
  {
    id: "sushi",
    name: { ko: "초밥", en: "Sushi", zh: "寿司", ja: "寿司", vi: "Sushi" },
    items: [
      { price: 250000, name: { ko: "모듬초밥", en: "Assorted Sushi", zh: "什锦寿司", ja: "盛り合わせ寿司", vi: "Sushi Thập Cẩm" }, desc: { ko: "12개", en: "12 pieces", zh: "12个", ja: "12貫", vi: "12 miếng" } },
      { price: 200000, name: { ko: "활어초밥", en: "Live Fish Sushi", zh: "活鱼寿司", ja: "活魚の寿司", vi: "Sushi Cá Trắng" }, desc: { ko: "12개", en: "12 pieces", zh: "12个", ja: "12貫", vi: "12 miếng" } },
      { price: 250000, name: { ko: "참치초밥", en: "Tuna Sushi", zh: "金枪鱼寿司", ja: "マグロの寿司", vi: "Sushi Cá Ngừ" }, desc: { ko: "10개", en: "10 pieces", zh: "10个", ja: "10貫", vi: "10 miếng" } },
      { price: 250000, name: { ko: "연어초밥", en: "Salmon Sushi", zh: "三文鱼寿司", ja: "サーモンの寿司", vi: "Sushi Cá Hồi" }, desc: { ko: "12개", en: "12 pieces", zh: "12个", ja: "12貫", vi: "12 miếng" } },
      { price: 200000, name: { ko: "새우초밥", en: "Shrimp Sushi", zh: "虾寿司", ja: "海老の寿司", vi: "Sushi Tôm" }, desc: { ko: "10개", en: "10 pieces", zh: "10个", ja: "10貫", vi: "10 miếng" } },
    ],
  },
  {
    id: "mulhoe",
    name: { ko: "물회", en: "Cold Raw Fish Soup", zh: "冷汤生鱼片", ja: "ムルフェ(冷たい刺身スープ)", vi: "Gỏi cá trộn đá lạnh" },
    items: [
      { spicy: true, price: 200000, name: { ko: "물회", en: "Cold Raw Fish Soup", zh: "冷汤生鱼片", ja: "ムルフェ(冷たい刺身スープ)", vi: "Gỏi Cá Trộn Rau Đá Lạnh" } },
      { spicy: true, price: 300000, name: { ko: "갑오징어 물회", en: "Cold Cuttlefish Soup", zh: "墨鱼冷汤", ja: "コウイカのムルフェ", vi: "Gỏi Mực Trộn Rau Đá Lạnh" } },
    ],
  },
  {
    id: "roll",
    name: { ko: "롤·면", en: "Rolls & Noodles", zh: "卷·面", ja: "巻き寿司・麺", vi: "Cuộn & Mì" },
    items: [
      { price: 160000, name: { ko: "캘리포니아 롤", en: "California Roll", zh: "加州卷", ja: "カリフォルニアロール", vi: "Cuộn California" } },
      { price: 160000, name: { ko: "연어 롤", en: "Salmon Roll", zh: "三文鱼卷", ja: "サーモンロール", vi: "Cuộn Cá Hồi" } },
      { price: 150000, name: { ko: "우동", en: "Udon Noodle Soup", zh: "乌冬面", ja: "うどん", vi: "Mỳ Udon" } },
      { price: 200000, name: { ko: "튀김우동", en: "Tempura Udon", zh: "天妇罗乌冬面", ja: "天ぷらうどん", vi: "Mỳ Udon Tempura" } },
      { price: 180000, name: { ko: "냉모밀소바", en: "Cold Soba Noodles", zh: "冷荞麦面", ja: "冷やしそば", vi: "Mỳ Lạnh Soba" } },
    ],
  },
  {
    id: "rice",
    name: { ko: "밥", en: "Rice Dishes", zh: "饭类", ja: "ご飯もの", vi: "Cơm" },
    items: [
      { price: 180000, name: { ko: "회덮밥", en: "Raw Fish Rice Bowl", zh: "生鱼片盖饭", ja: "刺身丼", vi: "Cơm Gỏi Cá Trắng" } },
      { price: 250000, name: { ko: "특회덮밥", en: "Special Raw Fish Rice Bowl", zh: "特制生鱼片盖饭", ja: "特製刺身丼", vi: "Cơm Gỏi Cá" } },
      { price: 250000, name: { ko: "장어덮밥", en: "Grilled Eel Rice Bowl", zh: "鳗鱼盖饭", ja: "うなぎ丼", vi: "Cơm Cá Trình" } },
      { price: 160000, name: { ko: "알밥", en: "Fish Roe Rice Bowl", zh: "鱼籽饭", ja: "魚卵ご飯", vi: "Cơm Trứng Cá" } },
    ],
  },
  {
    id: "soup",
    name: { ko: "탕·튀김·구이", en: "Soups, Fried & Grilled", zh: "汤·炸物·烤物", ja: "鍋・揚げ物・焼き物", vi: "Lẩu, Chiên & Nướng" },
    items: [
      { price: 550000, name: { ko: "연포탕", en: "Octopus Soup", zh: "章鱼汤", ja: "タコ鍋(ヨンポタン)", vi: "Canh Bạch Tuộc" } },
      { price: 250000, name: { ko: "알탕", en: "Fish Roe Soup", zh: "鱼籽汤", ja: "魚卵鍋", vi: "Canh Thố Trứng Cá" } },
      { price: 250000, name: { ko: "동태탕", en: "Pollack Soup", zh: "明太鱼汤", ja: "スケトウダラ鍋", vi: "Canh cá minh thái" } },
      { spicy: true, price: 550000, photo: "img/maeuntang.jpg", name: { ko: "매운탕", en: "Spicy Fish Stew", zh: "辣鱼汤", ja: "辛い魚鍋(メウンタン)", vi: "Lẩu Cá Cay" } },
      { price: 550000, name: { ko: "지리탕", en: "Clear Fish Stew", zh: "清鱼汤", ja: "白い魚鍋(チリタン)", vi: "Lẩu Cá Không Cay" } },
      { price: 500000, name: { ko: "모듬튀김", en: "Assorted Fried Platter", zh: "什锦炸物", ja: "揚げ物盛り合わせ", vi: "Chiên Thập Cẩm" } },
      { photo: "img/saeu-tuigim.jpg", price: 400000, name: { ko: "새우튀김", en: "Fried Shrimp", zh: "炸虾", ja: "海老フライ", vi: "Tôm Chiên" } },
      { price: 350000, name: { ko: "오징어튀김", en: "Fried Squid", zh: "炸鱿鱼", ja: "イカフライ", vi: "Mực Chiên" } },
      { price: 1080000, name: { ko: "장어구이", en: "Grilled Eel", zh: "烤鳗鱼", ja: "うなぎの焼き物", vi: "Cá Trình Nướng" }, desc: { ko: "1kg 기준", en: "Per 1kg", zh: "按1kg计", ja: "1kg基準", vi: "Tính theo 1kg" } },
      { price: 450000, name: { ko: "전어구이 한접시", en: "Grilled Gizzard Shad (1 plate)", zh: "烤鰶鱼(一盘)", ja: "コノシロの焼き物 1皿", vi: "Cá mòi nướng" } },
    ],
  },
  {
    id: "drink",
    name: { ko: "주류·음료", en: "Drinks", zh: "酒水·饮料", ja: "お酒・ドリンク", vi: "Đồ uống" },
    items: [
      { price: 120000, name: { ko: "소주 (참이슬·처음처럼·좋은데이)", en: "Soju (Chamisul, Chum Churum, Good Day)", zh: "烧酒(真露、初饮初乐、好天天)", ja: "焼酎(チャミスル・チョウムチョロム・チョウンデイ)", vi: "Soju (Chamisul, Chum Churum, Good Day)" } },
      { price: 60000, name: { ko: "타이거 맥주", en: "Tiger Beer", zh: "虎牌啤酒", ja: "タイガービール", vi: "Bia Tiger" } },
      { price: 160000, name: { ko: "막걸리", en: "Makgeolli (Rice Wine)", zh: "米酒", ja: "マッコリ", vi: "Rượu gạo Makgeolli" } },
      { price: 180000, name: { ko: "청하", en: "Chungha (Sake)", zh: "清河清酒", ja: "チョンハ(清酒)", vi: "Rượu Chungha" } },
      { price: 300000, name: { ko: "복분자주", en: "Bokbunja (Korean Black Raspberry Wine)", zh: "覆盆子酒", ja: "復盆子酒(ポクブンジャ)", vi: "Rượu mâm xôi Bokbunja" } },
      { price: 350000, name: { ko: "백세주", en: "Baekseju (Herbal Rice Wine)", zh: "百岁酒", ja: "百歳酒(ペクセジュ)", vi: "Rượu Baekseju" } },
      { price: 130000, name: { ko: "보드카 멘 베이직", en: "Vodka Men Basic", zh: "伏特加 Men Basic", ja: "ウォッカ メン ベーシック", vi: "Vodka Men Basic" } },
      { price: 220000, name: { ko: "보드카 멘 프리미엄", en: "Vodka Men Premium", zh: "伏特加 Men Premium", ja: "ウォッカ メン プレミアム", vi: "Vodka Men Premium" } },
      { price: 320000, name: { ko: "보드카 멘 골드", en: "Vodka Men Gold", zh: "伏特加 Men Gold", ja: "ウォッカ メン ゴールド", vi: "Vodka Men Gold" } },
      { price: 200000, name: { ko: "홍초", en: "Hongcho (Pomegranate Vinegar Drink)", zh: "红醋饮料", ja: "紅酢(ホンチョ)", vi: "Hongcho (nước giấm thạch lựu)" } },
      { price: 30000, name: { ko: "콜라·환타·스프라이트", en: "Coke, Fanta, Sprite", zh: "可乐·芬达·雪碧", ja: "コーラ・ファンタ・スプライト", vi: "Coca, Fanta, Sprite" } },
      { price: 1400000, name: { ko: "사케 쇼치쿠바이 교토 후시미즈 지타테", en: "Sake Shochikubai Kyoto Fushimizu Jitate", zh: "清酒 松竹梅 京都伏水 地立", ja: "日本酒 松竹梅 京都 伏水 地立て", vi: "Sake Shochikubai Kyoto Fushimizu Jitate" } },
      { price: 1100000, name: { ko: "사케 에츠노 하지메", en: "Sake Etsu no Hajime", zh: "清酒 越乃初", ja: "日本酒 越の初", vi: "Sake Etsu no Hajime" } },
      { price: 950000, name: { ko: "사케 쇼치쿠바이 조센", en: "Sake Shochikubai Josen", zh: "清酒 松竹梅 上选", ja: "日本酒 松竹梅 上撰", vi: "Sake Shochikubai Josen" } },
    ],
  },
];
