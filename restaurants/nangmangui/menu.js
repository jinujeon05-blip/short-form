// 낭만구이 Langman BBQ 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진 20장(수집기 2026-11-28, 디지털 메뉴판·책자판·벽 포스터)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// 사진끼리 가격이 다르면 높은 쪽 — 한우 소곱창(디지털 390k·책자 990k), docs/todo.md 참고
window.RESTAURANT = {
  brand: { ko: "낭만구이", en: "Langman BBQ" },
  phone: "0399 538 092",
  address: "LK B22 Embassy Garden, KĐT Tây Hồ Tây, Xuân Đỉnh, Hà Nội",
  wifi: null,
  hours: "11:00 – 23:00",
};

window.MENU = [
 {
  "id": "set",
  "name": {
   "ko": "프리미엄 세트",
   "en": "Premium Beef Sets",
   "zh": "精选套餐",
   "ja": "プレミアムセット",
   "vi": "Set thịt cao cấp"
  },
  "note": {
   "ko": "식사하시면 무료 서비스 — 뚝배기 계란찜 · 소고기 된장찌개 또는 김치찌개 · 셀프코너 김치전(무제한)",
   "en": "Free with your meal — steamed egg in a clay pot · beef soybean stew or kimchi stew · self-serve kimchi pancake (unlimited)",
   "zh": "用餐即赠 — 砂锅蒸蛋 · 牛肉大酱汤或泡菜汤 · 自助泡菜饼（不限量）",
   "ja": "ご利用で無料サービス — 土鍋卵蒸し・牛肉テンジャンチゲまたはキムチチゲ・セルフキムチチヂミ（食べ放題）",
   "vi": "Tặng miễn phí khi dùng bữa — trứng hấp nồi đất · canh tương bò hoặc canh kim chi · bánh xèo kim chi tự phục vụ (không giới hạn)"
  },
  "items": [
   {
    "name": {
     "ko": "황제 소고기 세트",
     "en": "Emperor Beef Set",
     "zh": "皇帝牛肉套餐",
     "ja": "エンペラー牛肉セット",
     "vi": "Set bò Hoàng đế"
    },
    "desc": {
     "ko": "와규 꽃등심 + 와규 본갈비살 + 프라임 꽃살 · 400g",
     "en": "Wagyu ribeye + Wagyu boneless short rib + Prime boneless short rib · 400g",
     "zh": "和牛肉眼 + 和牛去骨牛小排 + 顶级牛肋条 · 400g",
     "ja": "和牛リブロース＋和牛骨なしカルビ＋プライム花サル · 400g",
     "vi": "Thăn vai Wagyu + sườn rút xương Wagyu + thăn bò Prime · 400g"
    },
    "price": 1390000,
    "tag": "best",
    "photo": "img/hwangje.jpg"
   },
   {
    "name": {
     "ko": "모둠 소고기 세트",
     "en": "Assorted Beef Set",
     "zh": "综合牛肉套餐",
     "ja": "牛肉盛り合わせセット",
     "vi": "Set bò thập cẩm"
    },
    "desc": {
     "ko": "꽃살 + 생갈비 + 부채살 + 안창살 + 소갈비살 · 600g",
     "en": "Prime boneless short rib + LA short rib + top blade + outside skirt + boneless short rib · 600g",
     "zh": "牛肋条 + 生牛小排 + 扇形牛肉 + 内裙肉 + 去骨牛小排 · 600g",
     "ja": "花サル＋生カルビ＋プチェサル＋アンチャンサル＋牛カルビ身 · 600g",
     "vi": "Thăn bò + sườn bò LA + lõi nạc vai + diềm bò + sườn không xương · 600g"
    },
    "price": 1190000
   },
   {
    "name": {
     "ko": "낭만 세트",
     "en": "Langman Set",
     "zh": "浪漫套餐",
     "ja": "ロマンセット",
     "vi": "Set Lãng Mạn"
    },
    "desc": {
     "ko": "생갈비 + 소갈비살 + 삼겹살 + 항정살 · 400g",
     "en": "LA short rib + boneless short rib + pork belly + pork jowl · 400g",
     "zh": "生牛小排 + 去骨牛小排 + 五花肉 + 猪颈肉 · 400g",     "ja": "生カルビ＋牛カルビ身＋サムギョプサル＋豚トロ · 400g",
     "vi": "Sườn bò LA + sườn không xương + ba chỉ heo + má heo · 400g"
    },
    "price": 490000,
    "tag": "special"
   }
  ]
 },
 {
  "id": "beef",
  "name": {
   "ko": "프리미엄 소고기",
   "en": "Premium Beef",
   "zh": "精选牛肉",
   "ja": "プレミアム牛肉",
   "vi": "Bò cao cấp"
  },
  "tip": {
   "ko": "가격은 100g 기준이며 부가세 별도입니다.",
   "en": "Prices are per 100g and exclude VAT.",
   "zh": "价格为每100克，不含增值税。",
   "ja": "価格は100g当たりで、VAT別です。",
   "vi": "Giá tính trên 100g, chưa bao gồm VAT."
  },
  "items": [
   {
    "name": {
     "ko": "꽃살 프라임",
     "en": "Prime Boneless Short Rib",
     "zh": "顶级牛肋条",
     "ja": "プライム花サル",
     "vi": "Thăn bò Prime"
    },
    "price": 320000,
    "unit": "100g"
   },
   {
    "name": {
     "ko": "안창살 프라임",
     "en": "Prime Outside Skirt",
     "zh": "顶级内裙肉",
     "ja": "プライムハラミ（アンチャンサル）",
     "vi": "Diềm bò Prime"
    },
    "price": 270000,
    "unit": "100g"
   },
   {
    "name": {
     "ko": "부채살 (깍두기 부채살)",
     "en": "Top Blade (Cube Steak)",
     "zh": "扇形牛肉（方块牛排）",
     "ja": "プチェサル（角切りステーキ）",
     "vi": "Lõi nạc vai bò (thái vuông)"
    },
    "price": 190000,
    "unit": "100g"
   },
   {
    "name": {
     "ko": "생갈비",
     "en": "LA-cut Short Ribs (Saenggalbi)",
     "zh": "生牛小排",
     "ja": "生カルビ",
     "vi": "Sườn bò LA"
    },
    "price": 240000,
    "unit": "100g"
   },
   {
    "name": {
     "ko": "소갈비살",
     "en": "Boneless Beef Ribs",
     "zh": "去骨牛小排",
     "ja": "牛カルビ身",
     "vi": "Sườn bò không xương"
    },
    "price": 190000,
    "unit": "100g"
   },
   {
    "name": {
     "ko": "양념 소갈비살",
     "en": "Marinated Beef Ribs",
     "zh": "腌制牛小排",
     "ja": "味付け牛カルビ身",
     "vi": "Sườn bò không xương ướp"
    },
    "price": 190000,
    "unit": "100g",
    "tag": "best",
    "photo": "img/yangnyeom.jpg"
   }
  ]
 },
 {
  "id": "wagyu",
  "name": {
   "ko": "A5 와규",
   "en": "A5 Wagyu",
   "zh": "A5和牛",
   "ja": "A5和牛",
   "vi": "Wagyu A5"
  },
  "items": [
   {
    "name": {
     "ko": "와규 꽃등심 A5",
     "en": "Japanese Wagyu A5 Ribeye",
     "zh": "日本和牛 A5 肉眼",
     "ja": "和牛リブロース A5",
     "vi": "Thăn vai Wagyu A5 Nhật"
    },
    "sizes": [
     [
      "150g",
      690000
     ],
     [
      "250g",
      1090000
     ]
    ],
    "tag": "must",
    "photo": "img/wagyu.jpg"
   },
   {
    "name": {
     "ko": "와규 본갈비살 A5",
     "en": "Japanese Wagyu A5 Boneless Short Rib",
     "zh": "日本和牛 A5 去骨牛小排",
     "ja": "和牛骨なしカルビ A5",
     "vi": "Sườn rút xương Wagyu A5 Nhật"
    },
    "price": 600000,
    "unit": "150g"
   },
   {
    "name": {
     "ko": "와규 야끼니꾸 A5",
     "en": "Japanese Wagyu A5 Yakiniku",
     "zh": "日本和牛 A5 烧肉",
     "ja": "和牛焼肉 A5",
     "vi": "Wagyu A5 nướng kiểu Nhật"
    },
    "price": 690000,
    "unit": "150g"
   }
  ]
 },
 {
  "id": "pork",
  "name": {
   "ko": "프리미엄 돼지고기",
   "en": "Premium Pork",
   "zh": "精选猪肉",
   "ja": "プレミアム豚肉",
   "vi": "Heo cao cấp"
  },
  "tip": {
   "ko": "가격은 100g 기준이며 부가세 별도입니다.",
   "en": "Prices are per 100g and exclude VAT.",
   "zh": "价格为每100克，不含增值税。",
   "ja": "価格は100g当たりで、VAT別です。",
   "vi": "Giá tính trên 100g, chưa bao gồm VAT."
  },
  "items": [
   {
    "name": {
     "ko": "삼겹살",
     "en": "Pork Belly",
     "zh": "五花肉",
     "ja": "サムギョプサル",
     "vi": "Ba chỉ heo"
    },
    "price": 100000,
    "unit": "100g",
    "tag": "best",
    "photo": "img/samgyeop.jpg"
   },
   {
    "name": {
     "ko": "항정살",
     "en": "Pork Jowl",
     "zh": "猪颈肉",
     "ja": "豚トロ（ハンジョンサル）",
     "vi": "Má heo"
    },
    "price": 120000,
    "unit": "100g"
   },
   {
    "name": {
     "ko": "껍데기",
     "en": "Pork Skin",
     "zh": "猪皮",
     "ja": "豚皮（コプデギ）",
     "vi": "Da heo"
    },
    "price": 100000,
    "unit": "100g"
   }
  ]
 },
 {
  "id": "special",
  "name": {
   "ko": "한식 특선 · 안주",
   "en": "Korean Specialties",
   "zh": "韩式特色菜",
   "ja": "韓国料理・おつまみ",
   "vi": "Món Hàn đặc biệt"
  },
  "items": [
   {
    "name": {
     "ko": "한우 소곱창",
     "en": "Korean Beef Intestines (Gopchang)",
     "zh": "韩牛小肠",
     "ja": "韓牛コプチャン",
     "vi": "Lòng bò Hàn Quốc"
    },
    "price": 990000,
    "unit": "350g",
    "tag": "must",
    "photo": "img/gopchang.jpg"
   },
   {
    "name": {
     "ko": "육회",
     "en": "Korean Beef Tartare (Yukhoe)",
     "zh": "韩式生拌牛肉",
     "ja": "ユッケ",
     "vi": "Thịt bò sống kiểu Hàn (Yukhoe)"
    },
    "price": 290000
   },
   {
    "name": {
     "ko": "문어숙회",
     "en": "Parboiled Octopus Slices",
     "zh": "白灼章鱼片",
     "ja": "タコの湯引き",
     "vi": "Bạch tuộc luộc sơ"
    },
    "price": 290000
   },
   {
    "name": {
     "ko": "수제 편육",
     "en": "Pressed Pork (Pyeonyuk)",
     "zh": "自制压猪肉片",
     "ja": "手作りピョンユク（豚肉の蒸し押し）",
     "vi": "Giò thủ"
    },
    "price": 290000
   },
   {
    "name": {
     "ko": "떡갈비",
     "en": "Grilled Beef Rib Patty (Tteokgalbi)",
     "zh": "韩式烤牛肉饼",
     "ja": "トッカルビ",
     "vi": "Bò băm nướng (tteokgalbi)"
    },
    "price": 190000
   },
   {
    "name": {
     "ko": "두부김치",
     "en": "Tofu with Stir-fried Kimchi",
     "zh": "豆腐配炒泡菜",
     "ja": "豆腐キムチ",
     "vi": "Đậu phụ kim chi xào"
    },
    "price": 290000
   }
  ]
 },
 {
  "id": "meal",
  "name": {
   "ko": "식사 · 탕",
   "en": "Rice & Soups",
   "zh": "饭类 · 汤",
   "ja": "ご飯・スープ",
   "vi": "Cơm & canh"
  },
  "items": [
   {
    "name": {
     "ko": "갈비탕",
     "en": "Short Rib Soup",
     "zh": "牛排骨汤",
     "ja": "カルビタン",
     "vi": "Canh sườn bò"
    },
    "price": 190000
   },
   {
    "name": {
     "ko": "김치찌개",
     "en": "Kimchi Stew",
     "zh": "泡菜汤",
     "ja": "キムチチゲ",
     "vi": "Canh kim chi"
    },
    "price": 100000,
    "spicy": true
   },
   {
    "name": {
     "ko": "뼈감자탕",
     "en": "Pork Backbone Stew with Potatoes",
     "zh": "土豆猪骨汤",
     "ja": "カムジャタン",
     "vi": "Canh xương heo khoai tây"
    },
    "price": 160000
   },
   {
    "name": {
     "ko": "어묵탕",
     "en": "Korean Fish Cake Soup",
     "zh": "鱼饼汤",
     "ja": "オデン鍋",
     "vi": "Canh chả cá Hàn Quốc"
    },
    "price": 190000
   },
   {
    "name": {
     "ko": "조개수제비",
     "en": "Clam Sujebi (Hand-pulled Dough Soup)",
     "zh": "蛤蜊面片汤",
     "ja": "あさりのスジェビ",
     "vi": "Canh bột nhào nấu ngao"
    },
    "price": 140000
   },
   {
    "name": {
     "ko": "육회 비빔밥",
     "en": "Beef Tartare Bibimbap",
     "zh": "生牛肉拌饭",
     "ja": "ユッケビビンバ",
     "vi": "Cơm trộn bò sống"
    },
    "price": 190000
   },
   {
    "name": {
     "ko": "비빔밥",
     "en": "Bibimbap",
     "zh": "拌饭",
     "ja": "ビビンバ",
     "vi": "Cơm trộn Hàn Quốc"
    },
    "price": 120000
   }
  ]
 },
 {
  "id": "noodle",
  "name": {
   "ko": "냉면 · 면류",
   "en": "Cold Noodles & Ramen",
   "zh": "冷面 · 面类",
   "ja": "冷麺・麺類",
   "vi": "Mì lạnh & mì ăn liền"
  },
  "items": [
   {
    "name": {
     "ko": "물냉면",
     "en": "Mul-naengmyeon (Cold Noodles)",
     "zh": "水冷面",
     "ja": "水冷麺",
     "vi": "Mì lạnh nước"
    },
    "sizes": [
     [
      "S",
      80000
     ],
     [
      "R",
      120000
     ]
    ],
    "tag": "must",
    "photo": "img/mulnaeng.jpg"
   },
   {
    "name": {
     "ko": "비빔냉면",
     "en": "Bibim-naengmyeon (Spicy Cold Noodles)",
     "zh": "拌冷面",
     "ja": "ビビン冷麺",
     "vi": "Mì lạnh trộn cay"
    },
    "sizes": [
     [
      "S",
      80000
     ],
     [
      "R",
      120000
     ]
    ],
    "spicy": true
   },
   {
    "name": {
     "ko": "신라면",
     "en": "Shin Ramyun",
     "zh": "辛拉面",
     "ja": "辛ラーメン",
     "vi": "Mì Shin Ramyun"
    },
    "price": 80000,
    "spicy": true
   },
   {
    "name": {
     "ko": "짜파게티",
     "en": "Chapagetti (Black Bean Noodles)",
     "zh": "炸酱方便面",
     "ja": "チャパゲティ",
     "vi": "Mì tương đen Chapagetti"
    },
    "price": 80000
   },
   {
    "name": {
     "ko": "비빔면",
     "en": "Bibim Noodles",
     "zh": "拌面",
     "ja": "ビビン麺",
     "vi": "Mì trộn Hàn Quốc"
    },
    "price": 80000,
    "spicy": true
   }
  ]
 },
 {
  "id": "drink",
  "name": {
   "ko": "주류 · 음료",
   "en": "Drinks",
   "zh": "酒水 · 饮料",
   "ja": "お酒・ドリンク",
   "vi": "Đồ uống"
  },
  "items": [
   {
    "name": {
     "ko": "막걸리",
     "en": "Makgeolli (Korean Rice Wine)",
     "zh": "马格利米酒",
     "ja": "マッコリ",
     "vi": "Rượu gạo Makgeolli"
    },
    "price": 180000
   },
   {
    "name": {
     "ko": "타이거 맥주",
     "en": "Tiger Beer",
     "zh": "虎牌啤酒",
     "ja": "タイガービール",
     "vi": "Bia Tiger"
    },
    "price": 50000
   },
   {
    "name": {
     "ko": "생맥주",
     "en": "Draft Beer",
     "zh": "生啤",
     "ja": "生ビール",
     "vi": "Bia tươi"
    },
    "price": 60000
   },
   {
    "name": {
     "ko": "아침햇살",
     "en": "Achimhaetsal (Rice Drink)",
     "zh": "早晨阳光大米饮料",
     "ja": "朝の光（米ドリンク）",
     "vi": "Nước gạo Morning"
    },
    "price": 60000
   },
   {
    "name": {
     "ko": "콜라",
     "en": "Cola",
     "zh": "可乐",
     "ja": "コーラ",
     "vi": "Coca-Cola"
    },
    "price": 30000
   },
   {
    "name": {
     "ko": "제로 콜라",
     "en": "Zero Cola",
     "zh": "零度可乐",
     "ja": "ゼロコーラ",
     "vi": "Coca Zero"
    },
    "price": 30000
   },
   {
    "name": {
     "ko": "스프라이트",
     "en": "Sprite",
     "zh": "雪碧",
     "ja": "スプライト",
     "vi": "Sprite"
    },
    "price": 30000
   },
   {
    "name": {
     "ko": "환타",
     "en": "Fanta",
     "zh": "芬达",
     "ja": "ファンタ",
     "vi": "Fanta"
    },
    "price": 30000
   }
  ]
 }
];
