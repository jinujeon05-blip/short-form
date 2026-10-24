// 둘둘분식 Dduldul Bunsik (Haihai Tokbokki · 하노이 · 35 P. Đỗ Đình Thiện, Từ Liêm) 메뉴 데이터 — 한국 분식
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/둘둘분식" — 메뉴판이 흰색·파란색·검정색 3종류이고 사진마다 가격이 달라,
// 사용자 지시(2026-10-24)대로 높은 쪽을 썼다(예: 김밥 50,000/60,000 → 60,000, 고쌈 냉면 180,000/200,000 → 200,000).
window.RESTAURANT = {
  brand: { ko: "둘둘분식", en: "Dduldul Bunsik", branch: { ko: "하노이", en: "Hà Nội" } },
  phone: "0989 953 171",
  address: "35 P. Đỗ Đình Thiện, Từ Liêm, Hà Nội",
  mapQuery: "둘둘분식 Haihai Tokbokki 35 Đỗ Đình Thiện Từ Liêm Hà Nội",
  mapUrl: "https://www.google.com/maps/place/Haihai+Tokbokki/@21.0179305,105.7795308,21z/data=!4m6!3m5!1s0x3134554646f6efcd:0x82ca3ddc84be38af!8m2!3d21.0179209!4d105.7796789!16s%2Fg%2F11kc2lbfd9",
  wifi: null, // 예: { ssid: "DDULDUL", password: "12345678" }
};

window.MENU = [
  {
    id: "snack",
    name: {"ko": "분식", "en": "Korean snacks", "zh": "韩式小吃", "ja": "粉食(韓国軽食)", "vi": "Món ăn vặt"},
    note: {"ko": "둘둘분식 마감은 22:00 입니다 · 튀김은 1개당 가격이에요 · 포장용기는 5,000₫", "en": "Dduldul Bunsik closes at 22:00 · Fried snacks are priced per piece · Takeaway container 5,000₫", "zh": "二二粉食22:00打烊 · 炸物按每个计价 · 打包盒5,000₫", "ja": "トゥルドゥル粉食は22:00閉店です · 揚げ物は1個あたりの価格です · 持ち帰り容器は5,000₫", "vi": "Dduldul Bunsik đóng cửa lúc 22:00 · Đồ chiên tính giá theo từng cái · Hộp đựng mang đi 5,000₫"},
    items: [
      {"price": 200000, "tag": "best", "name": {"ko": "떡·튀김·순대 세트", "en": "Tteok · Fried · Sundae Set", "zh": "年糕·炸物·血肠套餐", "ja": "トック・天ぷら・スンデセット", "vi": "Set bánh gạo · đồ chiên · dồi"}, "desc": {"ko": "떡볶이 + 튀김 4개 + 순대", "en": "Tteokbokki + 4 fried snacks + sundae", "zh": "辣炒年糕 + 炸物4个 + 血肠", "ja": "トッポッキ + 揚げ物4個 + スンデ", "vi": "Tteokbokki + 4 món chiên + dồi Hàn Quốc"}},
      {"price": 70000, "photo": "img/tteokbokki.jpg", "spicy": true, "name": {"ko": "떡볶이", "en": "Spicy Rice Cakes (Tteokbokki)", "zh": "辣炒年糕", "ja": "トッポッキ", "vi": "Bánh gạo cay (Tteokbokki)"}},
      {"price": 100000, "photo": "img/sundae.jpg", "name": {"ko": "순대", "en": "Korean Blood Sausage (Sundae)", "zh": "韩式血肠", "ja": "スンデ(韓国風豚の腸詰め)", "vi": "Dồi Hàn Quốc (Sundae)"}},
      {"price": 15000, "photo": "img/odeng.jpg", "name": {"ko": "어묵", "en": "Fish Cake (Eomuk)", "zh": "鱼饼", "ja": "おでん(練り物)", "vi": "Chả cá (Eomuk)"}, "desc": {"ko": "국물 무료", "en": "Broth is free", "zh": "汤免费", "ja": "スープ無料", "vi": "Miễn phí nước dùng"}},
      {"price": 40000, "name": {"ko": "컵떡볶이", "en": "Cup Tteokbokki", "zh": "杯装辣炒年糕", "ja": "カップトッポッキ", "vi": "Tteokbokki ly"}, "desc": {"ko": "1인분", "en": "1 serving", "zh": "1人份", "ja": "1人前", "vi": "1 suất"}},
      {"price": 35000, "name": {"ko": "소떡소떡", "en": "Sausage & Rice Cake Skewer (Sotteok Sotteok)", "zh": "香肠年糕串", "ja": "ソトクソトク(ソーセージと餅の串)", "vi": "Xiên xúc xích bánh gạo (Sotteok sotteok)"}},
      {"price": 25000, "name": {"ko": "떡꼬치", "en": "Rice Cake Skewer (Tteokkochi)", "zh": "年糕串", "ja": "トッコチ(餅の串焼き)", "vi": "Xiên bánh gạo (Tteokkochi)"}},
      {"price": 120000, "name": {"ko": "찐만두", "en": "Steamed Dumplings (Jjin Mandu)", "zh": "蒸饺", "ja": "蒸し餃子", "vi": "Mandu hấp"}},
      {"price": 80000, "photo": "img/twigim.jpg", "name": {"ko": "모둠 튀김", "en": "Assorted Fried Snacks", "zh": "什锦炸物", "ja": "揚げ物盛り合わせ", "vi": "Đồ chiên thập cẩm"}},
    ],
  },
  {
    id: "fried",
    name: {"ko": "튀김", "en": "Fried snacks", "zh": "炸物", "ja": "揚げ物", "vi": "Đồ chiên"},
    note: {"ko": "1개당 가격이에요", "en": "Price per piece", "zh": "按每个计价", "ja": "1個あたりの価格です", "vi": "Giá tính theo từng cái"},
    items: [
      {"price": 10000, "name": {"ko": "김말이 튀김", "en": "Fried Seaweed Noodle Roll (Gimmari)", "zh": "紫菜粉丝卷炸物", "ja": "キンマリ揚げ(のり巻き春雨揚げ)", "vi": "Gimmari chiên (rong biển cuộn miến)"}},
      {"price": 10000, "name": {"ko": "야채 튀김", "en": "Fried Vegetables", "zh": "炸蔬菜", "ja": "野菜の天ぷら", "vi": "Rau củ chiên"}},
      {"price": 10000, "name": {"ko": "고구마 튀김", "en": "Fried Sweet Potato", "zh": "炸地瓜", "ja": "さつまいもの天ぷら", "vi": "Khoai lang chiên"}},
      {"price": 10000, "name": {"ko": "계란 튀김", "en": "Fried Egg", "zh": "炸鸡蛋", "ja": "卵の天ぷら", "vi": "Trứng chiên"}},
      {"price": 20000, "name": {"ko": "오징어 튀김", "en": "Fried Squid", "zh": "炸鱿鱼", "ja": "イカの天ぷら", "vi": "Mực chiên"}},
      {"price": 20000, "name": {"ko": "고추 튀김", "en": "Fried Stuffed Chili Pepper", "zh": "炸酿辣椒", "ja": "唐辛子の肉詰め揚げ", "vi": "Ớt cuộn thịt chiên"}, "desc": {"ko": "고추에 고기를 채워 튀김", "en": "Chili pepper stuffed with meat and fried", "zh": "辣椒里塞肉后油炸", "ja": "唐辛子に肉を詰めて揚げたもの", "vi": "Ớt nhồi thịt rồi chiên"}},
    ],
  },
  {
    id: "gimbap",
    name: {"ko": "김밥", "en": "Gimbap", "zh": "紫菜包饭", "ja": "キンパ", "vi": "Kimbap"},
    items: [
      {"price": 60000, "photo": "img/gimbap.jpg", "name": {"ko": "김밥", "en": "Gimbap (Korean Seaweed Rice Roll)", "zh": "紫菜包饭", "ja": "キンパ(韓国のり巻き)", "vi": "Kimbap"}},
      {"price": 70000, "name": {"ko": "치즈김밥", "en": "Cheese Gimbap", "zh": "芝士紫菜包饭", "ja": "チーズキンパ", "vi": "Kimbap phô mai"}},
      {"price": 80000, "name": {"ko": "참치김밥", "en": "Tuna Gimbap", "zh": "金枪鱼紫菜包饭", "ja": "ツナキンパ", "vi": "Kimbap cá ngừ"}},
      {"price": 60000, "name": {"ko": "꼬마김밥(3개)", "en": "Mini Gimbap (3 pcs)", "zh": "迷你紫菜包饭(3个)", "ja": "ミニキンパ(3個)", "vi": "Kimbap mini (3 cái)"}},
    ],
  },
  {
    id: "noodle",
    name: {"ko": "면·냉면", "en": "Noodles", "zh": "面·冷面", "ja": "麺・冷麺", "vi": "Mì"},
    items: [
      {"price": 200000, "tag": "best", "photo": "img/naengmyeon.jpg", "name": {"ko": "고쌈 냉면", "en": "Gossam Naengmyeon (Cold Noodles)", "zh": "Gossam 冷面", "ja": "コッサム冷麺", "vi": "Mì lạnh Gossam (Naengmyeon)"}},
      {"price": 220000, "spicy": true, "name": {"ko": "매운 고쌈 냉면", "en": "Spicy Gossam Naengmyeon", "zh": "辣味肉包冷面", "ja": "辛いコッサム冷麺", "vi": "Mì lạnh Gossam cay"}},
      {"price": 140000, "name": {"ko": "냉면", "en": "Cold Noodles (Naengmyeon)", "zh": "冷面", "ja": "冷麺", "vi": "Mì lạnh (Naengmyeon)"}},
      {"price": 160000, "spicy": true, "name": {"ko": "매운 냉면", "en": "Spicy Cold Noodles", "zh": "辣冷面", "ja": "辛い冷麺", "vi": "Mì lạnh cay"}},
      {"price": 50000, "name": {"ko": "곱배기(면 사리 추가)", "en": "Extra Noodles (Gopbaegi)", "zh": "加量(加面)", "ja": "大盛り(麺追加)", "vi": "Thêm mì (phần lớn)"}},
      {"price": 140000, "name": {"ko": "열무국수·냉면(계절 메뉴)", "en": "Young Radish Kimchi Noodles / Cold Noodles (Seasonal)", "zh": "小萝卜泡菜面·冷面(季节限定)", "ja": "ヨルム麺・冷麺(季節メニュー)", "vi": "Mì kim chi củ cải non / mì lạnh (món theo mùa)"}},
      {"price": 140000, "name": {"ko": "잔치국수", "en": "Banquet Noodle Soup (Janchi Guksu)", "zh": "宴会汤面", "ja": "チャンチグクス(温かいそうめん)", "vi": "Mì nước kiểu Hàn (Janchi guksu)"}},
      {"price": 110000, "spicy": true, "name": {"ko": "해장라면", "en": "Haejang Ramyeon (Hangover Ramyeon)", "zh": "醒酒拉面", "ja": "ヘジャンラーメン(二日酔い用ラーメン)", "vi": "Mì giải rượu (Haejang ramyeon)"}},
      {"price": 110000, "name": {"ko": "짜계치(짜파게티+계란)", "en": "Jjagyechi (Chapagetti + Egg)", "zh": "炸酱拉面加蛋(Jjagyechi)", "ja": "チャゲチ(チャパゲティ+卵)", "vi": "Jjagyechi (mì Chapagetti + trứng)"}},
      {"price": 40000, "name": {"ko": "라면 사리", "en": "Extra Ramyeon Noodles", "zh": "加拉面", "ja": "ラーメン追加(サリ)", "vi": "Thêm mì ăn liền"}},
    ],
  },
  {
    id: "meal",
    name: {"ko": "식사·찌개", "en": "Meals & stews", "zh": "餐食·汤锅", "ja": "食事・チゲ", "vi": "Cơm - Canh"},
    items: [
      {"sizes": [[{"ko": "소 1~2인", "en": "Small (1-2 people)", "zh": "小(1~2人)", "ja": "小(1~2人前)", "vi": "Nhỏ (1-2 người)"}, 240000], [{"ko": "중 2~3인", "en": "Medium (2-3 people)", "zh": "中(2~3人)", "ja": "中(2~3人前)", "vi": "Vừa (2-3 người)"}, 450000]], "name": {"ko": "고기찌개", "en": "Meat Stew (Gogi Jjigae)", "zh": "肉汤锅", "ja": "肉チゲ", "vi": "Canh thịt (Gogi jjigae)"}},
      {"price": 400000, "spicy": true, "name": {"ko": "닭도리탕(1마리)", "en": "Spicy Braised Chicken (Dakdoritang, whole chicken)", "zh": "辣炖鸡块(整只)", "ja": "タットリタン(鶏1羽)", "vi": "Gà hầm cay (Dakdoritang, 1 con)"}},
      {"price": 200000, "tag": "best", "spicy": true, "name": {"ko": "우렁 제육 쌈밥", "en": "Spicy Pork & Snail Ssambap", "zh": "田螺辣炒猪肉包饭", "ja": "ウレン豚炒めサムパ", "vi": "Cơm cuốn thịt heo xào cay và ốc (Ssambap)"}},
      {"price": 200000, "name": {"ko": "우렁 불백 쌈밥", "en": "Bulgogi & Snail Ssambap", "zh": "田螺烤肉包饭", "ja": "ウレンプルコギサムパ", "vi": "Cơm cuốn thịt nướng và ốc (Ssambap)"}},
      {"price": 170000, "name": {"ko": "돈까스", "en": "Pork Cutlet (Donkatsu)", "zh": "炸猪排", "ja": "とんかつ", "vi": "Cốt lết heo chiên xù"}},
      {"price": 170000, "name": {"ko": "삼겹살 비빔밥", "en": "Pork Belly Bibimbap", "zh": "五花肉拌饭", "ja": "サムギョプサルビビンバ", "vi": "Cơm trộn thịt ba chỉ (Bibimbap)"}},
      {"price": 20000, "name": {"ko": "공깃밥", "en": "Steamed Rice", "zh": "米饭", "ja": "ご飯", "vi": "Cơm trắng"}},
    ],
  },
  {
    id: "drink",
    name: {"ko": "음료·주류", "en": "Drinks", "zh": "饮料·酒水", "ja": "ドリンク・お酒", "vi": "Đồ uống"},
    items: [
      {"price": 30000, "name": {"ko": "콜라·스프라이트", "en": "Cola · Sprite", "zh": "可乐·雪碧", "ja": "コーラ・スプライト", "vi": "Cola · Sprite"}},
      {"price": 150000, "name": {"ko": "소주", "en": "Soju", "zh": "烧酒", "ja": "焼酎(ソジュ)", "vi": "Soju"}},
      {"price": 50000, "name": {"ko": "타이거 병맥주", "en": "Tiger Beer (Bottle)", "zh": "虎牌瓶装啤酒", "ja": "タイガービール(瓶)", "vi": "Bia Tiger chai"}},
      {"price": 60000, "name": {"ko": "생맥주", "en": "Draft Beer", "zh": "生啤", "ja": "生ビール", "vi": "Bia tươi"}},
      {"price": 50000, "name": {"ko": "아이스 아메리카노", "en": "Iced Americano", "zh": "冰美式咖啡", "ja": "アイスアメリカーノ", "vi": "Americano đá"}},
    ],
  },
];
