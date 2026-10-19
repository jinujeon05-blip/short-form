// 교동치킨 Kyodong Chicken (Sunshine City, Ciputra, Hà Nội) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "QR메뉴판/교동치킨 시푸차" 폴더의 구글 지도 캡처. 가게 계정이 올린 최신 메뉴판(사이드·치킨·분식/세트·주류·신메뉴 5면) 기준,
// 2년 전 손님이 올린 옛 메뉴판(가격이 다름)은 쓰지 않음. 한국어·베트남어는 메뉴판 표기, 영어·중국어·일본어는 번역.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격 / sizes: [[{ko,en,…}, 가격], …] / tag: "new" · "best" / spicy: true
window.RESTAURANT = {
  brand: { ko: "교동치킨", en: "Kyodong Chicken", sub: "Korean Chicken & Pub", branch: "Sunshine City · Ciputra" },
  phone: null,   // TODO: 구글 지도 정보 받으면 넣기
  address: "Sunshine City, Khu đô thị Ciputra, Phú Thượng, Hà Nội",   // TODO: 정확한 호수 확인
  mapQuery: "Kyodong Chicken Sunshine City",
  wifi: null,
};

const L = (s) => ({ ko: s, en: s, zh: s, ja: s, vi: s });
const S = L("S"), M = L("M"), LG = L("L");
const WHOLE = { ko: "한 마리", en: "Whole", zh: "整只", ja: "1羽", vi: "1 con" };
const HALF = { ko: "반 마리", en: "Half", zh: "半只", ja: "半羽", vi: "Nửa con" };
const sml = (s, m, l) => [[S, s], [M, m], [LG, l]];
const LEVEL = { ko: "보통맛 / 매운맛 선택", en: "Mild or extra spicy", zh: "可选微辣／特辣", ja: "普通／激辛から選べます", vi: "Chọn ít cay / cay nhiều" };

window.MENU = [
  {
    id: "new",
    photo: "img/new.jpg",
    name: { ko: "신메뉴", en: "New Menu", zh: "新菜单", ja: "新メニュー", vi: "Món mới" },
    note: { ko: "찜닭·닭도리탕은 30분 정도 걸려요. 미리 전화로 주문하시면 좋아요",
      en: "Braised chicken dishes take about 30 minutes — feel free to call ahead",
      zh: "炖鸡、辣炖鸡需约30分钟，可提前电话点餐",
      ja: "チムタク・タットリタンは約30分かかります。お電話での事前注文がおすすめです",
      vi: "Gà om / gà hầm cay cần khoảng 30 phút, có thể gọi điện đặt trước" },
    items: [
      { price: 540000, tag: "new", name: { ko: "오리지널 찜닭 (한 마리)", en: "Original Jjimdak (whole chicken)", zh: "原味安东炖鸡（整只）", ja: "オリジナル チムタク（1羽）", vi: "Gà om" } },
      { price: 540000, tag: "new", spicy: true, name: { ko: "닭도리탕 (한 마리)", en: "Spicy Braised Chicken Stew (whole)", zh: "辣炖鸡块（整只）", ja: "タットリタン（1羽）", vi: "Gà hầm cay" } },
      { price: 432000, tag: "new", spicy: true, name: { ko: "알탕", en: "Spicy Fish Roe Stew", zh: "辣鱼子汤", ja: "アルタン（魚卵鍋）", vi: "Canh trứng cá" } },
      { price: 324000, tag: "new", name: { ko: "통영 홍합탕", en: "Tongyeong Mussel Soup", zh: "统营青口汤", ja: "統営ムール貝スープ", vi: "Canh vẹm" } },
      { price: 648000, tag: "new", name: { ko: "아롱사태 전골", en: "Beef Shank Hot Pot", zh: "牛腱火锅", ja: "牛スネ肉の鍋", vi: "Canh bắp bò" } },
      { price: 432000, tag: "new", spicy: true, name: { ko: "부대찌개", en: "Budae Jjigae (Army Stew)", zh: "部队锅", ja: "プデチゲ", vi: "Lẩu thập cẩm" } },
      { price: 270000, tag: "new", name: { ko: "오뎅탕", en: "Fish Cake Soup", zh: "鱼饼汤", ja: "おでん鍋", vi: "Canh chả cá" } },
      { price: 378000, tag: "new", spicy: true, name: { ko: "매운 오징어볶음", en: "Spicy Stir-fried Squid", zh: "辣炒鱿鱼", ja: "イカの辛炒め", vi: "Mực xào cay" } },
      { price: 195000, tag: "new", name: { ko: "돌솥비빔밥", en: "Hot Stone Bibimbap", zh: "石锅拌饭", ja: "石焼ビビンバ", vi: "Cơm trộn Hàn Quốc" } },
      { price: 270000, tag: "new", name: { ko: "돈까스", en: "Pork Cutlet", zh: "炸猪排", ja: "とんかつ", vi: "Thịt chiên xù" } },
      { price: 195000, tag: "new", name: { ko: "해물칼국수", en: "Seafood Knife-cut Noodles", zh: "海鲜刀切面", ja: "海鮮カルグクス", vi: "Mỳ hải sản" } },
      { price: 270000, tag: "new", spicy: true, name: { ko: "김치우동", en: "Kimchi Udon", zh: "泡菜乌冬面", ja: "キムチうどん", vi: "Mỳ Udong kim chi" } },
    ],
  },
  {
    id: "chicken",
    photo: "img/chicken.jpg",
    name: { ko: "치킨", en: "Chicken", zh: "炸鸡", ja: "チキン", vi: "Gà rán" },
    note: { ko: "크기 S · M · L / 갈릭허니 = 마늘 꿀 소스, 레드 = 매콤한 소스",
      en: "Sizes S · M · L / Garlic honey = sweet garlic sauce, Red = spicy sauce",
      zh: "份量 S · M · L／蒜香蜂蜜酱、红辣酱",
      ja: "サイズ S・M・L／ガーリックハニー＝甘いにんにくソース、レッド＝辛口ソース",
      vi: "Cỡ S · M · L / Sốt mật ong tỏi, sốt cay" },
    items: [
      { sizes: sml(206000, 378000, 562000), tag: "best", name: { ko: "갈릭허니 윙봉", en: "Garlic Honey Wings & Drumettes", zh: "蒜香蜂蜜鸡翅", ja: "ガーリックハニー手羽", vi: "Cánh gà sốt mật ong" } },
      { sizes: sml(206000, 378000, 562000), spicy: true, name: { ko: "레드 윙봉", en: "Red Spicy Wings & Drumettes", zh: "红辣鸡翅", ja: "レッド手羽（辛口）", vi: "Cánh gà sốt cay" } },
      { sizes: sml(206000, 389000, 584000), name: { ko: "갈릭허니 다리만", en: "Garlic Honey Drumsticks", zh: "蒜香蜂蜜鸡腿", ja: "ガーリックハニー もも肉だけ", vi: "Đùi gà sốt mật ong" } },
      { sizes: sml(206000, 389000, 584000), spicy: true, name: { ko: "레드 다리만", en: "Red Spicy Drumsticks", zh: "红辣鸡腿", ja: "レッド もも肉だけ（辛口）", vi: "Đùi gà sốt cay" } },
      { sizes: sml(206000, 378000, 562000), name: { ko: "갈릭허니 순살", en: "Garlic Honey Boneless", zh: "蒜香蜂蜜无骨鸡", ja: "ガーリックハニー 骨なし", vi: "Đùi gà rút xương sốt mật ong" } },
      { sizes: sml(206000, 378000, 562000), spicy: true, name: { ko: "레드 순살", en: "Red Spicy Boneless", zh: "红辣无骨鸡", ja: "レッド 骨なし（辛口）", vi: "Đùi gà rút xương sốt cay" } },
      { sizes: sml(206000, 378000, 562000), name: { ko: "후라이드 순살", en: "Crispy Fried Boneless", zh: "原味无骨炸鸡", ja: "フライド 骨なし", vi: "Đùi gà rút xương rán giòn" } },
      { sizes: sml(206000, 378000, 562000), name: { ko: "순살 치킨 크림 어니언", en: "Boneless Chicken with Cream Onion", zh: "奶油洋葱无骨炸鸡", ja: "骨なしチキン クリームオニオン", vi: "Gà rút xương sốt kem hành" } },
      { sizes: sml(206000, 378000, 562000), name: { ko: "순살 어니언", en: "Boneless Onion Chicken", zh: "洋葱无骨炸鸡", ja: "骨なしオニオンチキン", vi: "Gà sốt kem hành" } },
      { sizes: [[M, 389000], [LG, 584000]], spicy: true, name: { ko: "레드 콤보 (윙·봉·다리)", en: "Red Combo (wings, drumettes, drumsticks)", zh: "红辣拼盘（翅·翅根·腿）", ja: "レッドコンボ（手羽・手羽元・もも）", vi: "Combo cánh đùi sốt cay" } },
      { sizes: [[M, 389000], [LG, 584000]], name: { ko: "갈릭허니 콤보 (윙·봉·다리)", en: "Garlic Honey Combo (wings, drumettes, drumsticks)", zh: "蒜香蜂蜜拼盘（翅·翅根·腿）", ja: "ガーリックハニーコンボ（手羽・手羽元・もも）", vi: "Combo cánh đùi sốt mật ong" } },
      { sizes: [[HALF, 206000], [WHOLE, 378000]], name: { ko: "갈릭허니 치킨", en: "Garlic Honey Chicken", zh: "蒜香蜂蜜炸鸡", ja: "ガーリックハニーチキン", vi: "Gà sốt mật ong" } },
      { sizes: [[HALF, 206000], [WHOLE, 378000]], spicy: true, name: { ko: "레드 치킨", en: "Red Spicy Chicken", zh: "红辣炸鸡", ja: "レッドチキン（辛口）", vi: "Gà sốt cay" } },
      { sizes: [[HALF, 206000], [WHOLE, 378000]], name: { ko: "후라이드 치킨", en: "Crispy Fried Chicken", zh: "原味炸鸡", ja: "フライドチキン", vi: "Gà rán giòn" } },
      { price: 292000, name: { ko: "옛날통닭", en: "Old-style Whole Fried Chicken", zh: "老式整只炸鸡", ja: "昔ながらの丸鶏フライ", vi: "Gà rán nguyên con" } },
    ],
  },
  {
    id: "set",
    photo: "img/set.jpg",
    name: { ko: "분식 · 세트", en: "Snack Sets", zh: "小吃 · 套餐", ja: "粉食・セット", vi: "Set đồ ăn nhẹ" },
    items: [
      { price: 627000, tag: "best", name: { ko: "윙봉 & 분식 세트", en: "Wings & Snack Set", zh: "鸡翅小吃套餐", ja: "手羽＆粉食セット", vi: "Set cánh gà & đồ ăn nhẹ" },
        desc: { ko: "윙봉 + 떡볶이 + 모듬 튀김 + 주먹밥 · 보통맛/매운맛", en: "Wings + tteokbokki + mixed fries + rice balls · mild or spicy", zh: "鸡翅＋炒年糕＋什锦炸物＋饭团 · 微辣/特辣", ja: "手羽＋トッポッキ＋揚げ物盛り合わせ＋おにぎり・普通/激辛", vi: "Cánh gà + Tteokbokki + các loại đồ rán + cơm nắm (ít cay / cay nhiều)" } },
      { price: 411000, name: { ko: "분식 세트", en: "Snack Set", zh: "小吃套餐", ja: "粉食セット", vi: "Set đồ ăn nhẹ" },
        desc: { ko: "떡볶이 + 모듬 튀김 + 주먹밥 · 보통맛/매운맛", en: "Tteokbokki + mixed fries + rice balls · mild or spicy", zh: "炒年糕＋什锦炸物＋饭团 · 微辣/特辣", ja: "トッポッキ＋揚げ物盛り合わせ＋おにぎり・普通/激辛", vi: "Tteokbokki + các loại đồ rán + cơm nắm (ít cay / cay nhiều)" } },
      { price: 432000, tag: "best", spicy: true, name: { ko: "무뼈닭발 + 주먹밥", en: "Boneless Spicy Chicken Feet + Rice Balls", zh: "无骨鸡爪＋饭团", ja: "骨なし鶏足＋おにぎり", vi: "Chân gà rút xương + Cơm nắm" }, desc: LEVEL },
      { price: 432000, tag: "best", spicy: true, name: { ko: "진미 골뱅이 소면", en: "Spicy Sea Snail & Dried Squid Noodles", zh: "辣拌海螺鱿鱼丝细面", ja: "コルベンイ（つぶ貝）和え麺", vi: "Ốc xào miến trộn" }, desc: LEVEL },
    ],
  },
  {
    id: "side",
    photo: "img/side.jpg",
    name: { ko: "사이드 · 안주", en: "Sides & Bar Snacks", zh: "小菜 · 下酒菜", ja: "サイド・おつまみ", vi: "Món phụ & Đồ nhậu" },
    items: [
      { price: 76000, name: { ko: "감자튀김", en: "French Fries", zh: "薯条", ja: "フライドポテト", vi: "Khoai tây chiên" } },
      { price: 108000, name: { ko: "오징어 튀김", en: "Fried Squid", zh: "炸鱿鱼", ja: "イカフライ", vi: "Mực chiên" } },
      { price: 108000, name: { ko: "김말이", en: "Fried Seaweed Rolls", zh: "炸紫菜卷", ja: "キムマリ（海苔巻き揚げ）", vi: "Rong biển cuộn chiên" } },
      { price: 108000, name: { ko: "새우튀김", en: "Fried Shrimp", zh: "炸虾", ja: "エビフライ", vi: "Tôm chiên" } },
      { price: 108000, name: { ko: "고추튀김", en: "Fried Stuffed Peppers", zh: "炸辣椒", ja: "唐辛子の天ぷら", vi: "Ớt HQ chiên" } },
      { price: 108000, name: { ko: "만두 & 어묵", en: "Mandu & Fish Cake", zh: "饺子＆鱼饼", ja: "マンドゥ＆おでん", vi: "Mandu & chả cá" } },
      { price: 108000, name: { ko: "치즈볼", en: "Cheese Balls", zh: "芝士球", ja: "チーズボール", vi: "Phô mai viên" } },
      { price: 87000, name: { ko: "치즈스틱", en: "Cheese Sticks", zh: "芝士条", ja: "チーズスティック", vi: "Phô mai que" } },
      { price: 270000, name: { ko: "닭똥집 튀김", en: "Fried Chicken Gizzards", zh: "炸鸡胗", ja: "砂肝の唐揚げ", vi: "Mề gà chiên" } },
      { price: 76000, name: { ko: "주먹밥", en: "Rice Balls", zh: "饭团", ja: "おにぎり（チュモクパプ）", vi: "Cơm nắm" } },
      { price: 162000, spicy: true, name: { ko: "떡볶이", en: "Tteokbokki", zh: "炒年糕", ja: "トッポッキ", vi: "Tteokbokki" }, desc: LEVEL },
      { price: 270000, name: { ko: "모듬 튀김", en: "Mixed Fried Foods", zh: "什锦炸物", ja: "揚げ物盛り合わせ", vi: "Các loại đồ rán" } },
      { price: 195000, name: { ko: "치즈 계란말이", en: "Cheese Rolled Omelet", zh: "芝士鸡蛋卷", ja: "チーズ入り卵焼き", vi: "Trứng cuộn phô mai" } },
      { price: 108000, name: { ko: "라면 (짜파게티 / 해장라면)", en: "Ramen (black bean / spicy hangover)", zh: "拉面（炸酱面／醒酒拉面）", ja: "ラーメン（チャパゲティ／ヘジャン）", vi: "Mỳ tôm" } },
      { price: 324000, name: { ko: "해물전", en: "Seafood Pancake", zh: "海鲜煎饼", ja: "海鮮チヂミ", vi: "Bánh hải sản" } },
      { price: 324000, name: { ko: "노가리", en: "Grilled Little Pollack", zh: "烤小明太鱼", ja: "炙りノガリ（小スケトウダラ）", vi: "Cá khô nướng" } },
      { price: 324000, name: { ko: "먹태", en: "Grilled Dried Pollack", zh: "烤明太鱼干", ja: "炙りモクテ", vi: "Cá Đông the" } },
      { price: 324000, name: { ko: "반건조 오징어", en: "Semi-dried Squid", zh: "半干鱿鱼", ja: "半干しイカ", vi: "Mực khô" } },
      { price: 270000, name: { ko: "황도", en: "Yellow Peaches", zh: "黄桃", ja: "黄桃", vi: "Đào ngâm" } },
    ],
  },
  {
    id: "drinks",
    photo: "img/drinks.jpg",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水 · 饮料", ja: "お酒・ドリンク", vi: "Đồ uống" },
    items: [
      { price: 154000, name: { ko: "참이슬", en: "Chamisul (Soju)", zh: "真露 Chamisul（烧酒）", ja: "チャミスル（焼酎）", vi: "Soju Chamisul" } },
      { price: 154000, name: { ko: "진로 이즈백", en: "Jinro Is Back (Soju)", zh: "真露 Is Back（烧酒）", ja: "ジンロ イズバック（焼酎）", vi: "Soju Jinro Is Back" } },
      { price: 154000, name: { ko: "새로", en: "Saero (Soju)", zh: "Saero（烧酒）", ja: "セロ（焼酎）", vi: "Soju Saero" } },
      { price: 154000, name: { ko: "처음처럼", en: "Chum Churum (Soju)", zh: "初饮初乐（烧酒）", ja: "チョウムチョロム（焼酎）", vi: "Soju Chum Churum" } },
      { price: 44000, name: { ko: "타이거 캔", en: "Tiger (can)", zh: "老虎啤酒（罐）", ja: "タイガー（缶）", vi: "Bia Tiger lon" } },
      { price: 44000, name: { ko: "하이네켄 캔", en: "Heineken (can)", zh: "喜力（罐）", ja: "ハイネケン（缶）", vi: "Bia lon Heineken" } },
      { price: 66000, name: { ko: "생맥주 (사포로 · 칼스버그 · 흑맥주)", en: "Draft Beer (Sapporo · Carlsberg · Dark)", zh: "生啤（札幌·嘉士伯·黑啤）", ja: "生ビール（サッポロ・カールスバーグ・黒）", vi: "Bia tươi (Sapporo, Carlsberg, bia đen)" } },
      { price: 22000, name: { ko: "코카콜라 · 스프라이트", en: "Coca-Cola · Sprite", zh: "可口可乐 · 雪碧", ja: "コカ・コーラ・スプライト", vi: "Cocacola, Sprite" } },
      { price: 154000, name: { ko: "산토리 하이볼", en: "Suntory Highball", zh: "三得利嗨棒", ja: "サントリーハイボール", vi: "Highball Suntory" } },
      { price: 132000, name: { ko: "짐빔 하이볼", en: "Jim Beam Highball", zh: "金宾嗨棒", ja: "ジムビームハイボール", vi: "Highball Jim Beam" } },
    ],
  },
];
