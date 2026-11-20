// 강호동 백정 Baek Jeong BBQ 메뉴 데이터 — 한식 고기구이(하노이 뜨리엠)
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 한 가지 가격 / sizes: [["S", 가격], …] / tag / spicy / photo / desc / unit
// 원본: 구글 드라이브 "QR메뉴판/강호동 백정"(사진 수집기, 2026-11-20, 메뉴판 38장·음식 75장·매장 5장). 사진마다 가격이 달라 높은 쪽을 썼다(옛 판·새 판 차이, docs/todo.md).
// 메뉴판 오타 정정: 되지양념구이→돼지양념구이, 꽃살주목력→꽃살주물럭. 항목 사진은 손님·가게가 올린 음식 사진 중 메뉴판 그림과 맞는 것만 썼다.
window.RESTAURANT = {
  brand: { ko: "강호동 백정", en: "BAEK JEONG" },
  phone: "024 3763 5678",
  address: "Khu ĐT mới, N05-TT3, P. Đỗ Đình Thiện, Từ Liêm, Hà Nội",
  mapQuery: "Baek Jeong BBQ 강호동 백정 Khu ĐT mới N05-TT3 Đỗ Đình Thiện Từ Liêm Hà Nội",
  mapUrl: "https://www.google.com/maps/place/Nh%C3%A0+h%C3%A0ng+Baek+Jeong+BBQ+(%EA%B0%95%ED%98%B8%EB%8F%99+%EB%B0%B1%EC%A0%95)/@21.0159027,105.777612,21z/data=!4m6!3m5!1s0x313454aa41c667c3:0xeca363f14ab52706!8m2!3d21.0158283!4d105.7777477!16s%2Fg%2F11b8y6xws0",
  wifi: null,
  hours: "11:00 – 23:00",
};

window.MENU = [
 {
  "id": "set",
  "name": {
   "ko": "세트 · 콤보",
   "en": "Sets & Combos",
   "zh": "套餐 · 组合",
   "ja": "セット・コンボ",
   "vi": "Set · Combo"
  },
  "note": {
   "ko": "착한 런치 콤보 포함 · 가격 단위 VND",
   "en": "Includes value lunch combos · Prices in VND",
   "zh": "含超值午餐组合 · 价格单位 VND",
   "ja": "お得なランチコンボを含む · 価格単位 VND",
   "vi": "Có cả combo ăn trưa giá tốt · Đơn vị giá: VND"
  },
  "items": [
   {
    "name": {
     "ko": "SET A 소 한 마리",
     "en": "SET A: Whole Cow",
     "zh": "SET A 整头牛",
     "ja": "SET A 牛一頭分",
     "vi": "SET A: 1 con bò"
    },
    "price": 990000,
    "tag": "special",
    "desc": {
     "ko": "정가 1,600,000 → 990,000",
     "en": "Regular 1,600,000 → 990,000",
     "zh": "原价 1,600,000 → 990,000",
     "ja": "通常価格 1,600,000 → 990,000",
     "vi": "Giá gốc 1.600.000 → 990.000"
    }
   },
   {
    "name": {
     "ko": "SET B 한돈",
     "en": "SET B: Whole Pig",
     "zh": "SET B 韩猪",
     "ja": "SET B ハンドン(韓国産豚)",
     "vi": "SET B: Heo Hàn Quốc nguyên con"
    },
    "price": 690000,
    "tag": "special",
    "desc": {
     "ko": "생삼겹·생목살·항정살·양념갈매기살·고추장삼겹살·김치찌개·잡채. 정가 1,120,000 → 690,000",
     "en": "Fresh pork belly, fresh pork collar, pork jowl, marinated skirt, gochujang pork belly, kimchi stew, japchae. Regular 1,120,000 → 690,000",
     "zh": "生五花肉、生颈肉、猪颈肉、腌制横隔膜肉、辣酱五花肉、泡菜汤、杂菜。原价 1,120,000 → 690,000",
     "ja": "生サムギョプサル、生豚トロ(首肉)、豚トロ(ハンジョンサル)、味付けカルメギサル、コチュジャンサムギョプサル、キムチチゲ、チャプチェ。通常価格 1,120,000 → 690,000",
     "vi": "Ba chỉ tươi, thịt cổ tươi, thịt má, thịt dải sườn ướp gia vị, ba chỉ tẩm tương ớt, canh kim chi, miến xào. Giá gốc 1.120.000 → 690.000"
    }
   },
   {
    "name": {
     "ko": "비프 콤보",
     "en": "Beef Combo",
     "zh": "牛肉组合",
     "ja": "ビーフコンボ",
     "vi": "Combo bò"
    },
    "price": 490000,
    "desc": {
     "ko": "비빔면·소갈비·우삼겹·잡채·밑반찬. 정가 860,000",
     "en": "Spicy mixed noodles, beef short ribs, beef belly, japchae, side dishes. Regular 860,000",
     "zh": "拌面、牛排骨、牛五花、杂菜、小菜。原价 860,000",
     "ja": "ビビム麺、牛カルビ、牛バラ肉、チャプチェ、おかず。通常価格 860,000",
     "vi": "Mì trộn, sườn bò, ba chỉ bò, miến xào, món ăn kèm. Giá gốc 860.000"
    }
   },
   {
    "name": {
     "ko": "포크 콤보",
     "en": "Pork Combo",
     "zh": "猪肉组合",
     "ja": "ポークコンボ",
     "vi": "Combo heo"
    },
    "price": 490000,
    "desc": {
     "ko": "비빔면·양념돼지갈비·양념갈매기살·잡채·밑반찬. 정가 820,000",
     "en": "Spicy mixed noodles, marinated pork ribs, marinated skirt, japchae, side dishes. Regular 820,000",
     "zh": "拌面、腌制猪排骨、腌制横隔膜肉、杂菜、小菜。原价 820,000",
     "ja": "ビビム麺、味付け豚カルビ、味付けカルメギサル、チャプチェ、おかず。通常価格 820,000",
     "vi": "Mì trộn, sườn heo tẩm sốt, thịt dải sườn ướp gia vị, miến xào, món ăn kèm. Giá gốc 820.000"
    }
   }
  ]
 },
 {
  "id": "pork",
  "name": {
   "ko": "돼지고기",
   "en": "Pork",
   "zh": "猪肉",
   "ja": "豚肉",
   "vi": "Thịt heo"
  },
  "items": [
   {
    "name": {
     "ko": "삼겹살",
     "en": "Pork Belly",
     "zh": "五花肉",
     "ja": "サムギョプサル",
     "vi": "Thịt ba chỉ"
    },
    "price": 200000
   },
   {
    "name": {
     "ko": "생오겹살",
     "en": "Fresh Pork Belly (Skin-on)",
     "zh": "生带皮五花肉",
     "ja": "生オギョプサル(皮付き三枚肉)",
     "vi": "Thịt năm chỉ tươi"
    },
    "price": 220000
   },
   {
    "name": {
     "ko": "생목살",
     "en": "Fresh Pork Collar",
     "zh": "生猪颈肉",
     "ja": "生モックサル(豚肩ロース)",
     "vi": "Thịt cổ tươi"
    },
    "price": 240000
   },
   {
    "name": {
     "ko": "스테이크 알목살",
     "en": "Grilled Pork Neck",
     "zh": "牛排式猪颈肉",
     "ja": "ステーキ風モックサル(豚肩ロース)",
     "vi": "Thịt cổ tươi nướng"
    },
    "price": 240000
   },
   {
    "name": {
     "ko": "항정살",
     "en": "Pork Jowl",
     "zh": "猪颈肉(项肉)",
     "ja": "ハンジョンサル(豚トロ)",
     "vi": "Thịt má"
    },
    "price": 260000
   },
   {
    "name": {
     "ko": "고추장 삼겹살",
     "en": "Gochujang Marinated Pork Belly",
     "zh": "辣酱五花肉",
     "ja": "コチュジャンサムギョプサル",
     "vi": "Ba chỉ tẩm ớt"
    },
    "price": 220000,
    "spicy": true
   },
   {
    "name": {
     "ko": "양념갈매기살",
     "en": "Marinated Skirt",
     "zh": "腌制横隔膜肉",
     "ja": "味付けカルメギサル",
     "vi": "Thịt dải sườn ướp gia vị"
    },
    "price": 260000
   },
   {
    "name": {
     "ko": "돼지양념구이",
     "en": "Marinated Pork Collar",
     "zh": "腌制烤猪肉",
     "ja": "豚の味付け焼き",
     "vi": "Thịt nướng sốt hành"
    },
    "price": 280000
   },
   {
    "name": {
     "ko": "돼지갈비",
     "en": "Marinated Grilled Spareribs",
     "zh": "腌制猪排骨",
     "ja": "豚カルビ",
     "vi": "Thịt lợn tẩm sốt"
    },
    "price": 280000
   }
  ]
 },
 {
  "id": "beef",
  "name": {
   "ko": "소고기",
   "en": "Beef",
   "zh": "牛肉",
   "ja": "牛肉",
   "vi": "Thịt bò"
  },
  "items": [
   {
    "name": {
     "ko": "와규 소고기",
     "en": "Premium Wagyu Beef",
     "zh": "和牛牛肉",
     "ja": "和牛",
     "vi": "Thịt bò Wagyu"
    },
    "price": 900000
   },
   {
    "name": {
     "ko": "눈꽃살",
     "en": "Prime Boneless Short Ribs",
     "zh": "雪花牛肋条",
     "ja": "雪花カルビ(霜降り)",
     "vi": "Thịt ức"
    },
    "price": 600000
   },
   {
    "name": {
     "ko": "생갈비",
     "en": "Fresh Short Ribs",
     "zh": "生牛排骨",
     "ja": "生カルビ",
     "vi": "Thịt sườn non"
    },
    "price": 600000
   },
   {
    "name": {
     "ko": "양념갈비",
     "en": "Marinated Short Ribs",
     "zh": "腌制牛排骨",
     "ja": "味付けカルビ",
     "vi": "Sườn tẩm gia vị"
    },
    "price": 500000
   },
   {
    "name": {
     "ko": "꽃살주물럭",
     "en": "Marinated Boneless Short Ribs",
     "zh": "腌制花纹牛肋肉",
     "ja": "花サルのチュムルロク",
     "vi": "Thịt ức tẩm gia vị"
    },
    "price": 500000
   },
   {
    "name": {
     "ko": "LA갈비",
     "en": "LA Marinated Spare Ribs",
     "zh": "LA牛排骨",
     "ja": "LAカルビ",
     "vi": "Sườn bò tẩm sốt LA"
    },
    "price": 400000,
    "photo": "img/lagalbi.jpg"
   },
   {
    "name": {
     "ko": "안창살",
     "en": "Beef Outside Skirt",
     "zh": "牛横膈膜肉(安昌肉)",
     "ja": "アンチャンサル(ハラミ)",
     "vi": "Diềm thăn bò"
    },
    "price": 400000
   },
   {
    "name": {
     "ko": "우설",
     "en": "Beef Tongue",
     "zh": "牛舌",
     "ja": "牛タン",
     "vi": "Lưỡi bò"
    },
    "price": 350000
   },
   {
    "name": {
     "ko": "통마늘 특양구이",
     "en": "Grilled Garlic Beef Tripe",
     "zh": "整蒜烤牛肚",
     "ja": "丸ニンニクのトゥギャン焼き(牛ミノ)",
     "vi": "Dạ bò nướng tỏi"
    },
    "price": 320000
   },
   {
    "name": {
     "ko": "소갈비살",
     "en": "Beef Ribs",
     "zh": "牛排骨肉",
     "ja": "牛カルビ肉",
     "vi": "Thịt sườn bò"
    },
    "price": 300000,
    "photo": "img/sogalbisal.jpg"
   },
   {
    "name": {
     "ko": "우삼겹",
     "en": "Beef Belly",
     "zh": "牛五花",
     "ja": "牛バラ肉",
     "vi": "Thịt ba chỉ bò"
    },
    "price": 280000
   },
   {
    "name": {
     "ko": "차돌박이",
     "en": "Beef Brisket",
     "zh": "牛胸肉(肥牛)",
     "ja": "チャドルバギ(牛の胸肉)",
     "vi": "Gầu bò"
    },
    "price": 280000
   }
  ]
 },
 {
  "id": "gopchang",
  "name": {
   "ko": "한우 곱창",
   "en": "Hanwoo Offal",
   "zh": "韩牛内脏",
   "ja": "韓牛ホルモン",
   "vi": "Lòng bò Hanwoo"
  },
  "items": [
   {
    "name": {
     "ko": "한우모듬곱창",
     "en": "Hanwoo Assorted Gopchang",
     "zh": "韩牛什锦烤肠",
     "ja": "韓牛ホルモン盛り合わせ",
     "vi": "Lòng bò thập cẩm"
    },
    "price": 699000,
    "tag": "special",
    "unit": "300g"
   },
   {
    "name": {
     "ko": "곱창",
     "en": "Hanwoo Gopchang",
     "zh": "韩牛烤小肠",
     "ja": "韓牛コプチャン(小腸)",
     "vi": "Lòng non"
    },
    "price": 320000,
    "unit": "200g"
   },
   {
    "name": {
     "ko": "대창",
     "en": "Hanwoo Daechang",
     "zh": "韩牛烤大肠",
     "ja": "韓牛テチャン(大腸)",
     "vi": "Lòng già"
    },
    "price": 350000,
    "unit": "200g"
   },
   {
    "name": {
     "ko": "막창",
     "en": "Hanwoo Makchang",
     "zh": "韩牛烤牛百叶",
     "ja": "韓牛マクチャン(第四胃)",
     "vi": "Dạ dày bò"
    },
    "price": 350000,
    "unit": "200g"
   },
   {
    "name": {
     "ko": "특양",
     "en": "Hanwoo Teukyang",
     "zh": "韩牛特级牛肚",
     "ja": "韓牛トゥギャン(ミノ)",
     "vi": "Dạ bò loại đặc biệt"
    },
    "price": 320000,
    "unit": "200g"
   }
  ]
 },
 {
  "id": "stew",
  "name": {
   "ko": "찌개 · 탕 · 전골",
   "en": "Stews & Soups",
   "zh": "汤锅 · 火锅",
   "ja": "チゲ・スープ・鍋",
   "vi": "Canh · Lẩu"
  },
  "items": [
   {
    "name": {
     "ko": "산더미불고기",
     "en": "Mixed-Fried Vegetable Beef",
     "zh": "堆山牛肉烤肉",
     "ja": "山盛りプルコギ(牛肉)",
     "vi": "Thịt bò xào kèm rau sống"
    },
    "price": 440000
   },
   {
    "name": {
     "ko": "산더미돼지불고기",
     "en": "Mixed-Fried Vegetable Pork",
     "zh": "堆山猪肉烤肉",
     "ja": "山盛り豚プルコギ",
     "vi": "Thịt lợn xào kèm rau sống"
    },
    "price": 420000
   },
   {
    "name": {
     "ko": "김치전골",
     "en": "Kimchi Stew Hot Pot",
     "zh": "泡菜火锅",
     "ja": "キムチ鍋",
     "vi": "Canh xương hầm kim chi"
    },
    "sizes": [
     [
      "1인",
      170000
     ],
     [
      "2인",
      340000
     ]
    ],
    "spicy": true
   },
   {
    "name": {
     "ko": "갈비탕",
     "en": "Beef Ribs Soup",
     "zh": "牛排骨汤",
     "ja": "カルビタン",
     "vi": "Canh xương bò"
    },
    "price": 210000
   },
   {
    "name": {
     "ko": "해물순두부",
     "en": "Seafood Soft Tofu Stew",
     "zh": "海鲜嫩豆腐汤",
     "ja": "海鮮スンドゥブ",
     "vi": "Canh đậu phụ hải sản"
    },
    "price": 160000,
    "spicy": true
   },
   {
    "name": {
     "ko": "차돌된장찌개",
     "en": "Brisket Soybean Paste Stew",
     "zh": "牛胸肉大酱汤",
     "ja": "チャドル入りテンジャンチゲ",
     "vi": "Canh tương bí ngòi"
    },
    "price": 150000
   },
   {
    "name": {
     "ko": "김치찌개",
     "en": "Kimchi Stew",
     "zh": "泡菜汤",
     "ja": "キムチチゲ",
     "vi": "Canh kim chi"
    },
    "price": 140000,
    "spicy": true
   },
   {
    "name": {
     "ko": "된장찌개",
     "en": "Soybean Paste Stew",
     "zh": "大酱汤",
     "ja": "テンジャンチゲ",
     "vi": "Canh tương đậu phụ"
    },
    "price": 140000
   }
  ]
 },
 {
  "id": "meal",
  "name": {
   "ko": "식사 · 면",
   "en": "Rice & Noodles",
   "zh": "主食 · 面",
   "ja": "ご飯・麺",
   "vi": "Cơm · Mì"
  },
  "items": [
   {
    "name": {
     "ko": "제육비빔밥",
     "en": "Jeyuk Bibimbap",
     "zh": "辣炒猪肉拌饭",
     "ja": "豚辛炒めビビンバ",
     "vi": "Cơm trộn thập cẩm"
    },
    "price": 180000,
    "spicy": true
   },
   {
    "name": {
     "ko": "물냉면",
     "en": "Mul Naengmyeon",
     "zh": "水冷面",
     "ja": "水冷麺",
     "vi": "Mì lạnh"
    },
    "price": 150000
   },
   {
    "name": {
     "ko": "비빔냉면",
     "en": "Bibim Naengmyeon",
     "zh": "拌冷面",
     "ja": "ビビン冷麺",
     "vi": "Mì lạnh trộn"
    },
    "price": 150000,
    "spicy": true,
    "photo": "img/naengmyeon.jpg"
   },
   {
    "name": {
     "ko": "치즈양볶음밥",
     "en": "Beef Tripe Fried Rice with Cheese",
     "zh": "芝士牛肚炒饭",
     "ja": "チーズ牛ミノチャーハン",
     "vi": "Cơm rang bơ dạ bò"
    },
    "price": 150000
   },
   {
    "name": {
     "ko": "양볶음밥",
     "en": "Beef Tripe Fried Rice",
     "zh": "牛肚炒饭",
     "ja": "牛ミノチャーハン",
     "vi": "Cơm rang dạ bò"
    },
    "price": 140000
   },
   {
    "name": {
     "ko": "동치미국수",
     "en": "Dongchimi Noodles",
     "zh": "冬泡菜汤面",
     "ja": "トンチミ麺",
     "vi": "Mì lạnh củ cải"
    },
    "price": 100000
   },
   {
    "name": {
     "ko": "비빔국수",
     "en": "Spicy Mixed Noodles",
     "zh": "辣拌面",
     "ja": "ビビン麺",
     "vi": "Mì trộn"
    },
    "price": 100000,
    "spicy": true
   },
   {
    "name": {
     "ko": "호동라면",
     "en": "Hodong Ramyeon",
     "zh": "浩东拉面",
     "ja": "ホドンラーメン",
     "vi": "Mì Hodong"
    },
    "price": 90000
   },
   {
    "name": {
     "ko": "옛날도시락",
     "en": "Old-style Dosirak",
     "zh": "复古便当",
     "ja": "昔ながらのお弁当",
     "vi": "Cơm hộp truyền thống"
    },
    "price": 80000
   },
   {
    "name": {
     "ko": "볶음밥",
     "en": "Fried Rice",
     "zh": "炒饭",
     "ja": "チャーハン",
     "vi": "Cơm rang trứng"
    },
    "price": 60000
   },
   {
    "name": {
     "ko": "공기밥",
     "en": "Steamed Rice",
     "zh": "米饭",
     "ja": "白ご飯",
     "vi": "Cơm trắng"
    },
    "price": 20000
   },
   {
    "name": {
     "ko": "라면사리",
     "en": "Extra Ramyeon",
     "zh": "加拉面",
     "ja": "ラーメン追加",
     "vi": "Mì thêm"
    },
    "price": 20000
   }
  ]
 },
 {
  "id": "side",
  "name": {
   "ko": "사이드",
   "en": "Side Dishes",
   "zh": "小吃配菜",
   "ja": "サイドメニュー",
   "vi": "Món phụ"
  },
  "items": [
   {
    "name": {
     "ko": "오징어볶음",
     "en": "Stir-Fried Squid",
     "zh": "辣炒鱿鱼",
     "ja": "イカ炒め",
     "vi": "Mực xào"
    },
    "price": 280000,
    "spicy": true
   },
   {
    "name": {
     "ko": "해물볶음",
     "en": "Stir-Fried Seafood",
     "zh": "辣炒海鲜",
     "ja": "海鮮炒め",
     "vi": "Hải sản xào"
    },
    "price": 280000,
    "spicy": true
   },
   {
    "name": {
     "ko": "해물파전",
     "en": "Seafood Pancake",
     "zh": "海鲜葱饼",
     "ja": "海鮮ネギチヂミ",
     "vi": "Bánh hải sản"
    },
    "price": 180000
   },
   {
    "name": {
     "ko": "잡채",
     "en": "Japchae",
     "zh": "杂菜(韩式炒粉丝)",
     "ja": "チャプチェ",
     "vi": "Miến xào"
    },
    "price": 180000
   },
   {
    "name": {
     "ko": "신당동 떡볶이",
     "en": "Sindang-dong Tteokbokki",
     "zh": "新堂洞炒年糕",
     "ja": "新堂洞トッポッキ",
     "vi": "Bánh gạo xào cay"
    },
    "price": 180000,
    "spicy": true
   },
   {
    "name": {
     "ko": "어머니 군만두",
     "en": "Omoni Fried Dumplings",
     "zh": "妈妈煎饺",
     "ja": "オモニ焼き餃子",
     "vi": "Màn thầu Omoni"
    },
    "price": 180000
   },
   {
    "name": {
     "ko": "철판두부",
     "en": "Sizzling Tofu",
     "zh": "铁板豆腐",
     "ja": "鉄板豆腐",
     "vi": "Đậu phụ áp chảo"
    },
    "price": 160000
   },
   {
    "name": {
     "ko": "치즈계란말이",
     "en": "Cheese Rolled Omelette",
     "zh": "芝士蛋卷",
     "ja": "チーズ卵焼き",
     "vi": "Trứng cuộn bơ"
    },
    "price": 120000
   }
  ]
 },
 {
  "id": "drink",
  "name": {
   "ko": "주류 · 음료",
   "en": "Drinks",
   "zh": "酒类 · 饮料",
   "ja": "お酒・ドリンク",
   "vi": "Rượu · Đồ uống"
  },
  "items": [
   {
    "name": {
     "ko": "한국 막걸리",
     "en": "Korean Makgeolli",
     "zh": "韩国马格利酒",
     "ja": "韓国マッコリ",
     "vi": "Rượu gạo Hàn Quốc"
    },
    "price": 160000
   },
   {
    "name": {
     "ko": "참이슬",
     "en": "Chamisul Soju",
     "zh": "真露烧酒",
     "ja": "チャミスル",
     "vi": "Rượu Soju Chamisul"
    },
    "price": 140000
   },
   {
    "name": {
     "ko": "처음처럼",
     "en": "Chum-Churum Soju",
     "zh": "初饮初乐烧酒",
     "ja": "チョウムチョロム",
     "vi": "Rượu Soju Chum-Churum"
    },
    "price": 140000
   },
   {
    "name": {
     "ko": "베트남 보드카",
     "en": "Vietnamese Vodka",
     "zh": "越南伏特加",
     "ja": "ベトナムウォッカ",
     "vi": "Rượu Vodka"
    },
    "price": 110000
   },
   {
    "name": {
     "ko": "하이네켄",
     "en": "Heineken",
     "zh": "喜力啤酒",
     "ja": "ハイネケン",
     "vi": "Bia Heineken"
    },
    "price": 55000
   },
   {
    "name": {
     "ko": "타이거",
     "en": "Tiger Beer",
     "zh": "虎牌啤酒",
     "ja": "タイガービール",
     "vi": "Bia Tiger"
    },
    "price": 50000
   },
   {
    "name": {
     "ko": "사이공",
     "en": "Saigon Beer",
     "zh": "西贡啤酒",
     "ja": "サイゴンビール",
     "vi": "Bia Sài Gòn"
    },
    "price": 50000
   },
   {
    "name": {
     "ko": "하노이",
     "en": "Hanoi Beer",
     "zh": "河内啤酒",
     "ja": "ハノイビール",
     "vi": "Bia Hà Nội"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "옥수수차",
     "en": "Corn Tea",
     "zh": "玉米须茶",
     "ja": "とうもろこし茶",
     "vi": "Trà râu ngô"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "알로에",
     "en": "Aloe Juice",
     "zh": "芦荟饮料",
     "ja": "アロエジュース",
     "vi": "Nước nha đam"
    },
    "price": 30000
   },
   {
    "name": {
     "ko": "아침햇살",
     "en": "Morning Rice Drink",
     "zh": "早晨阳光米饮",
     "ja": "朝の光(米の飲料)",
     "vi": "Nước gạo Hàn Quốc"
    },
    "price": 30000
   },
   {
    "name": {
     "ko": "콜라",
     "en": "Coca-Cola",
     "zh": "可口可乐",
     "ja": "コカ・コーラ",
     "vi": "Coca-Cola"
    },
    "price": 25000
   },
   {
    "name": {
     "ko": "스프라이트",
     "en": "Sprite",
     "zh": "雪碧",
     "ja": "スプライト",
     "vi": "Sprite"
    },
    "price": 25000
   },
   {
    "name": {
     "ko": "환타",
     "en": "Fanta",
     "zh": "芬达",
     "ja": "ファンタ",
     "vi": "Fanta"
    },
    "price": 25000
   },
   {
    "name": {
     "ko": "라이트콜라",
     "en": "Coke Light",
     "zh": "健怡可乐",
     "ja": "コカ・コーラ ライト",
     "vi": "Coca-Cola Light"
    },
    "price": 20000
   },
   {
    "name": {
     "ko": "생수",
     "en": "Mineral Water",
     "zh": "矿泉水",
     "ja": "ミネラルウォーター",
     "vi": "Nước khoáng"
    },
    "price": 20000
   }
  ]
 }
];
