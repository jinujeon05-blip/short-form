// 미담 Mi Dam 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진 14장(수집기 2026-11-28, 벽면판·책자판)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// 사진끼리 가격이 다르면 높은 쪽(냉면·고등어구이) — docs/todo.md 참고
window.RESTAURANT = {
  brand: { ko: "미담", en: "MI DAM" },
  phone: "0904 089 306",
  address: "LK.A02 Embassy Garden, Xuân Tảo, Bắc Từ Liêm, Hà Nội",
  wifi: null,
  hours: null,
};

window.MENU = [
 {
  "id": "set",
  "name": {
   "ko": "세트",
   "en": "Set Menus",
   "zh": "套餐",
   "ja": "セットメニュー",
   "vi": "Set menu"
  },
  "items": [
   {
    "name": {
     "ko": "소고기 세트",
     "en": "Beef Set",
     "zh": "牛肉套餐",
     "ja": "牛肉セット",
     "vi": "Set bò"
    },
   "photo": "img/sogogi-set.jpg",
    "price": 790000
   },
   {
    "name": {
     "ko": "돼지고기 세트",
     "en": "Pork Set",
     "zh": "猪肉套餐",
     "ja": "豚肉セット",
     "vi": "Set lợn"
    },
    "price": 599000
   },
   {
    "name": {
     "ko": "특별 세트",
     "en": "Special Set",
     "zh": "特色套餐",
     "ja": "スペシャルセット",
     "vi": "Set đặc biệt"
    },
    "price": 999000
   },
   {
    "name": {
     "ko": "무제한 돼지갈비",
     "en": "All-You-Can-Eat Pork Ribs",
     "zh": "猪排骨无限畅吃",
     "ja": "豚カルビ食べ放題",
     "vi": "Sườn nướng không giới hạn"
    },
    "price": 330000
   }
  ]
 },
 {
  "id": "beef",
  "name": {
   "ko": "소고기구이",
   "en": "Grilled Beef",
   "zh": "烤牛肉",
   "ja": "牛肉の焼肉",
   "vi": "Bò nướng"
  },
  "items": [
   {
    "name": {
     "ko": "갈비살",
     "en": "Galbisal (Beef Short Rib Meat)",
     "zh": "牛肋肉",
     "ja": "カルビサル(牛バラ肉)",
     "vi": "Rẻ sườn hoàng đế"
    },
   "photo": "img/galbisal.jpg",
    "unit": "150g",
    "price": 250000
   },
   {
    "name": {
     "ko": "차돌박이",
     "en": "Chadolbaegi (Thin-Sliced Beef Brisket)",
     "zh": "牛胸肉薄片",
     "ja": "チャドルバギ(牛バラ薄切り)",
     "vi": "Gầu bò"
    },
    "unit": "170g",
    "price": 250000
   },
   {
    "name": {
     "ko": "안창살",
     "en": "Anchangsal (Beef Skirt Steak)",
     "zh": "牛横膈膜肉",
     "ja": "アンチャンサル(牛ハラミ)",
     "vi": "Riềm thăn bò"
    },
    "unit": "150g",
    "price": 330000
   },
   {
    "name": {
     "ko": "등심 살치살",
     "en": "Deungsim Salchisal (Ribeye Cap)",
     "zh": "牛里脊 雪花牛肉",
     "ja": "ロース サルチサル(リブキャップ)",
     "vi": "Thăn ngoại bò Mỹ"
    },
    "unit": "150g",
    "price": 420000
   }
  ]
 },
 {
  "id": "pork",
  "name": {
   "ko": "돼지고기구이",
   "en": "Grilled Pork",
   "zh": "烤猪肉",
   "ja": "豚肉の焼肉",
   "vi": "Heo nướng"
  },
  "items": [
   {
    "name": {
     "ko": "꽃삼겹살",
     "en": "Flower Pork Belly (Kkot Samgyeopsal)",
     "zh": "花五花肉",
     "ja": "花サムギョプサル(豚バラ)",
     "vi": "Ba chỉ hoa lên ngôi"
    },
   "photo": "img/kkot-samgyeopsal.jpg",
    "unit": "180g",
    "price": 199000
   },
   {
    "name": {
     "ko": "대패삼겹살",
     "en": "Thin-Sliced Pork Belly (Daepae Samgyeopsal)",
     "zh": "刨片五花肉",
     "ja": "薄切りサムギョプサル(デペサムギョプサル)",
     "vi": "Ba chỉ siêu mỏng"
    },
   "photo": "img/daepae-samgyeopsal.jpg",
    "unit": "180g",
    "price": 179000
   },
   {
    "name": {
     "ko": "삼겹살",
     "en": "Pork Belly (Samgyeopsal)",
     "zh": "五花肉",
     "ja": "サムギョプサル(豚バラ)",
     "vi": "Ba chỉ heo"
    },
   "photo": "img/samgyeopsal.jpg",
    "unit": "180g",
    "price": 169000
   },
   {
    "name": {
     "ko": "가브리살",
     "en": "Gabrisal (Pork Neck Ridge Meat)",
     "zh": "猪颈脊肉",
     "ja": "カブリサル(豚の肩ロース上部)",
     "vi": "Má heo"
    },
    "unit": "180g",
    "price": 199000
   },
   {
    "name": {
     "ko": "돼지갈비",
     "en": "Pork Ribs (Dwaeji Galbi)",
     "zh": "猪排骨",
     "ja": "豚カルビ",
     "vi": "Sườn heo"
    },
    "unit": "200g",
    "price": 120000
   },
   {
    "name": {
     "ko": "고추장불고기",
     "en": "Spicy Gochujang Pork Bulgogi",
     "zh": "辣酱烤猪肉",
     "ja": "コチュジャン豚プルコギ",
     "vi": "Heo mỏng ướp gia vị"
    },
    "sizes": [
     [
      "S",
      350000
     ],
     [
      "L",
      500000
     ]
    ],
    "spicy": true
   }
  ]
 },
 {
  "id": "stew",
  "name": {
   "ko": "찌개·국·전골",
   "en": "Stews, Soups & Hot Pots",
   "zh": "炖汤·汤·火锅",
   "ja": "チゲ・スープ・鍋",
   "vi": "Canh · Lẩu"
  },
  "items": [
   {
    "name": {
     "ko": "김치찌개",
     "en": "Kimchi Stew (Kimchi Jjigae)",
     "zh": "泡菜汤",
     "ja": "キムチチゲ",
     "vi": "Canh kim chi"
    },
    "price": 150000,
    "spicy": true
   },
   {
    "name": {
     "ko": "차돌된장찌개",
     "en": "Beef Brisket Soybean Paste Stew (Chadol Doenjang Jjigae)",
     "zh": "牛胸肉大酱汤",
     "ja": "牛バラ入りテンジャンチゲ",
     "vi": "Canh tương thịt bò"
    },
    "price": 159000
   },
   {
    "name": {
     "ko": "뚝불고기",
     "en": "Ttukbulgogi (Bulgogi Stew in Earthen Pot)",
     "zh": "砂锅烤肉汤",
     "ja": "トゥクプルコギ(土鍋プルコギ)",
     "vi": "Canh bò nấm"
    },
    "price": 170000
   },
   {
    "name": {
     "ko": "미역국",
     "en": "Seaweed Soup (Miyeokguk)",
     "zh": "海带汤",
     "ja": "わかめスープ",
     "vi": "Canh rong biển"
    },
    "price": 160000
   },
   {
    "name": {
     "ko": "동태찌개",
     "en": "Spicy Pollock Stew (Dongtae Jjigae)",
     "zh": "明太鱼汤",
     "ja": "スケトウダラのチゲ(トンテチゲ)",
     "vi": "Canh cá minh thái"
    },
    "price": 170000,
    "spicy": true
   },
   {
    "name": {
     "ko": "뼈해장국",
     "en": "Pork Bone Hangover Soup (Ppyeo Haejangguk)",
     "zh": "猪骨醒酒汤",
     "ja": "豚の背骨のヘジャンクク",
     "vi": "Canh xương heo hầm"
    },
    "price": 200000
   },
   {
    "name": {
     "ko": "아구탕",
     "en": "Spicy Monkfish Soup (Agutang)",
     "zh": "安康鱼汤",
     "ja": "アンコウ鍋(アグタン)(アグタン)",
     "vi": "Canh cá mặt quỷ"
    },
    "price": 200000,
    "spicy": true
   },
   {
    "name": {
     "ko": "만두김치전골",
     "en": "Dumpling Kimchi Hot Pot (Mandu Kimchi Jeongol)",
     "zh": "饺子泡菜火锅",
     "ja": "餃子キムチ鍋",
     "vi": "Lẩu kim chi há cảo"
    },
    "sizes": [
     [
      "S",
      400000
     ],
     [
      "L",
      650000
     ]
    ],
    "spicy": true
   },
   {
    "name": {
     "ko": "다리닭도리탕",
     "en": "Braised Chicken Drumsticks (Dari Dakdoritang)",
     "zh": "辣炖鸡腿",
     "ja": "鶏もも肉のタットリタン",
     "vi": "Đùi gà hầm khoai"
    },
    "sizes": [
     [
      "S",
      500000
     ],
     [
      "L",
      600000
     ]
    ],
    "spicy": true
   },
   {
    "name": {
     "ko": "생불고기 전골",
     "en": "Fresh Bulgogi Hot Pot (Saeng Bulgogi Jeongol)",
     "zh": "鲜烤肉火锅",
     "ja": "生プルコギ鍋",
     "vi": "Bò lẩu nấm"
    },
    "sizes": [
     [
      "S",
      349000
     ],
     [
      "L",
      499000
     ]
    ]
   },
   {
    "name": {
     "ko": "뼈해장국 전골",
     "en": "Pork Bone Hangover Hot Pot (Ppyeo Haejangguk Jeongol)",
     "zh": "猪骨醒酒火锅",
     "ja": "豚の背骨のヘジャンクク鍋",
     "vi": "Lẩu xương hầm rau khô"
    },
    "sizes": [
     [
      "S",
      550000
     ],
     [
      "L",
      700000
     ]
    ]
   }
  ]
 },
 {
  "id": "anju",
  "name": {
   "ko": "안주류·전",
   "en": "Drinking Snacks & Pancakes",
   "zh": "下酒菜·煎饼",
   "ja": "おつまみ・チヂミ",
   "vi": "Món uống rượu"
  },
  "items": [
   {
    "name": {
     "ko": "낙지볶음",
     "en": "Spicy Stir-Fried Octopus (Nakji Bokkeum)",
     "zh": "辣炒章鱼",
     "ja": "ナクチポックム(タコ炒め)",
     "vi": "Bạch tuộc xào"
    },
    "price": 349000,
    "spicy": true
   },
   {
    "name": {
     "ko": "제육볶음",
     "en": "Spicy Stir-Fried Pork (Jeyuk Bokkeum)",
     "zh": "辣炒猪肉",
     "ja": "豚肉の辛味炒め(チェユクポックム)",
     "vi": "Thịt heo xào cay"
    },
    "price": 249000,
    "spicy": true
   },
   {
    "name": {
     "ko": "아구찜",
     "en": "Braised Spicy Monkfish (Agujjim)",
     "zh": "辣炖安康鱼",
     "ja": "アグチム(アンコウの蒸し煮)",
     "vi": "Cá xào giá"
    },
    "sizes": [
     [
      "S",
      600000
     ],
     [
      "M",
      800000
     ],
     [
      "L",
      1000000
     ]
    ],
    "spicy": true
   },
   {
    "name": {
     "ko": "해물파전",
     "en": "Seafood Scallion Pancake (Haemul Pajeon)",
     "zh": "海鲜葱饼",
     "ja": "海鮮ネギチヂミ",
     "vi": "Bánh hải sản"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "부추전",
     "en": "Chive Pancake (Buchujeon)",
     "zh": "韭菜煎饼",
     "ja": "ニラチヂミ",
     "vi": "Bánh hẹ"
    },
    "price": 159000
   },
   {
    "name": {
     "ko": "고등어구이",
     "en": "Grilled Mackerel (Godeungeo Gui)",
     "zh": "烤青花鱼",
     "ja": "サバの塩焼き",
     "vi": "Cá basa nướng"
    },
    "price": 200000
   }
  ]
 },
 {
  "id": "meal",
  "name": {
   "ko": "식사·면류",
   "en": "Rice & Noodles",
   "zh": "饭类·面类",
   "ja": "ご飯・麺類",
   "vi": "Cơm · Mì"
  },
  "items": [
   {
    "name": {
     "ko": "돌솥육회비빔밥",
     "en": "Stone Pot Beef Tartare Bibimbap (Dolsot Yukhoe Bibimbap)",
     "zh": "石锅生牛肉拌饭",
     "ja": "石焼ユッケビビンバ",
     "vi": "Cơm trộn gỏi bò"
    },
    "price": 159000
   },
   {
    "name": {
     "ko": "김치볶음밥",
     "en": "Kimchi Fried Rice (Kimchi Bokkeumbap)",
     "zh": "泡菜炒饭",
     "ja": "キムチチャーハン",
     "vi": "Cơm rang kim chi"
    },
    "price": 149000
   },
   {
    "name": {
     "ko": "해물볶음밥",
     "en": "Seafood Fried Rice (Haemul Bokkeumbap)",
     "zh": "海鲜炒饭",
     "ja": "海鮮チャーハン",
     "vi": "Cơm rang hải sản"
    },
    "price": 159000
   },
   {
    "name": {
     "ko": "미담 쌈밥",
     "en": "Mi Dam Ssambap (Rice Wraps)",
     "zh": "Mi Dam 生菜包饭",
     "ja": "ミダム サムパ(包みご飯)",
     "vi": "Cơm Mi Dam"
    },
    "price": 200000
   },
   {
    "name": {
     "ko": "김치덮밥",
     "en": "Kimchi Rice Bowl (Kimchi Deopbap)",
     "zh": "泡菜盖饭",
     "ja": "キムチ丼",
     "vi": "Kim chi xào + cơm"
    },
    "price": 160000
   },
   {
    "name": {
     "ko": "제육덮밥",
     "en": "Spicy Pork Rice Bowl (Jeyuk Deopbap)",
     "zh": "辣猪肉盖饭",
     "ja": "豚肉の辛味炒め丼",
     "vi": "Thịt xào cay + cơm"
    },
    "price": 160000
   },
   {
    "name": {
     "ko": "잔치국수",
     "en": "Warm Wheat Noodle Soup (Janchi Guksu)",
     "zh": "宴会汤面",
     "ja": "チャンチグクス(温かいそうめん)",
     "vi": "Bún Hàn Quốc"
    },
    "price": 150000
   },
   {
    "name": {
     "ko": "콩국수",
     "en": "Cold Soy Milk Noodles (Kongguksu)",
     "zh": "豆浆冷面",
     "ja": "コングクス(冷たい豆乳麺)",
     "vi": "Mì đậu tương"
    },
    "price": 160000
   },
   {
    "name": {
     "ko": "비빔냉면",
     "en": "Spicy Mixed Cold Noodles (Bibim Naengmyeon)",
     "zh": "辣拌冷面",
     "ja": "ビビン冷麺",
     "vi": "Mì lạnh trộn"
    },
    "price": 150000
   },
   {
    "name": {
     "ko": "물냉면",
     "en": "Cold Noodles in Broth (Mul Naengmyeon)",
     "zh": "汤冷面",
     "ja": "水冷麺",
     "vi": "Mì lạnh nước"
    },
    "price": 150000
   },
   {
    "name": {
     "ko": "라면",
     "en": "Ramyeon (Korean Instant Noodles)",
     "zh": "韩式泡面",
     "ja": "ラーメン(韓国インスタント麺)",
     "vi": "Mì tôm"
    },
    "price": 70000
   }
  ]
 },
 {
  "id": "drink",
  "name": {
   "ko": "주류·음료",
   "en": "Alcohol & Drinks",
   "zh": "酒类·饮料",
   "ja": "お酒・ドリンク",
   "vi": "Đồ uống"
  },
  "items": [
   {
    "name": {
     "ko": "소주",
     "en": "Soju",
     "zh": "烧酒",
     "ja": "焼酎(ソジュ)",
     "vi": "Soju"
    },
    "price": 150000
   },
   {
    "name": {
     "ko": "백세주",
     "en": "Baekseju (Herbal Rice Wine)",
     "zh": "百岁酒",
     "ja": "ペクセジュ(薬草入り米酒)",
     "vi": "Baek Se Ju"
    },
    "price": 280000
   },
   {
    "name": {
     "ko": "막걸리",
     "en": "Makgeolli (Korean Rice Wine)",
     "zh": "马格利米酒",
     "ja": "マッコリ",
     "vi": "Rượu gạo"
    },
    "price": 160000
   },
   {
    "name": {
     "ko": "복분자",
     "en": "Bokbunja (Korean Raspberry Wine)",
     "zh": "覆盆子酒",
     "ja": "ポクブンジャ(覆盆子酒)",
     "vi": "Bok Bun Ja"
    },
    "price": 380000
   },
   {
    "name": {
     "ko": "콜라",
     "en": "Coca-Cola",
     "zh": "可乐",
     "ja": "コーラ",
     "vi": "Coca"
    },
    "price": 20000
   },
   {
    "name": {
     "ko": "레몬 펩시",
     "en": "Lemon Pepsi",
     "zh": "柠檬百事",
     "ja": "レモンペプシ",
     "vi": "Pepsi"
    },
    "price": 20000
   },
   {
    "name": {
     "ko": "생레몬주스",
     "en": "Fresh Lemon Juice",
     "zh": "鲜柠檬汁",
     "ja": "生レモンジュース",
     "vi": "Nước chanh tươi"
    },
    "price": 35000
   },
   {
    "name": {
     "ko": "생오렌지주스",
     "en": "Fresh Orange Juice",
     "zh": "鲜橙汁",
     "ja": "生オレンジジュース",
     "vi": "Cam tươi"
    },
    "price": 40000
   }
  ]
 }
];
