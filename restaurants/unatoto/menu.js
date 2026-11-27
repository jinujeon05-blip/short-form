// 이자카야 우나토토 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진 41장(수집기 2026-11-27, 가게 계정+손님 사진). 가격 VND, VAT 별도·봉사료 없음(메뉴판 표기)
// price: 한 가지 가격 / sizes: [["M", 가격], ["L", 가격]] / price: null = 시가
// 일부러 뺀 것: 전골 추가 토핑(약 25종)·소주 믹서(와리)·사시미 곁들임(시소·김·초생강). 소주 잔/병·사케 용량은 sizes 라벨(Glass·Bottle·180ml 등). 메뉴판 사진끼리 가격이 다르면 높은 쪽(없음)
window.RESTAURANT = {
  brand: { ko: "이자카야 우나토토", en: "Izakaya Unatoto" },
  phone: "024 3204 7682",
  address: "531 P. Kim Mã, Giảng Võ, Hà Nội",
  mapUrl: "https://www.google.com/maps/place/Izakaya+Unatoto+Kim+M%C3%A3/@21.0296996,105.8106073,17z/data=!4m6!3m5!1s0x3135ab2cd8ea42e5:0xe90967cb29c9aae4!8m2!3d21.0296996!4d105.8106073!16s%2Fg%2F11s1pmml_c",
  wifi: null,
  hours: "11:00 – 22:00",
};

window.MENU = [
 {
  "id": "unagi",
  "name": {
   "ko": "장어 덮밥·우나주",
   "en": "Eel Rice Bowls & Unaju",
   "zh": "鳗鱼饭·鳗鱼重",
   "ja": "鰻丼・うな重",
   "vi": "Cơm Lươn & Unaju"
  },
  "items": [
   {
    "name": {
     "ko": "장어 & 치킨 가라아게 덮밥",
     "en": "Eel & Fried Chicken Rice Bowl",
     "zh": "鳗鱼炸鸡盖饭",
     "ja": "鰻唐揚げ丼",
     "vi": "Cơm Lươn & Gà Chiên"
    },
    "price": 199000,
    "tag": "best",
    "photo": "img/unagi-karaage.jpg"
   },
   {
    "name": {
     "ko": "장어구이 & 장어 덴푸라 덮밥",
     "en": "Grilled Eel & Eel Tempura Rice Bowl",
     "zh": "烤鳗鱼天妇罗鳗鱼盖饭",
     "ja": "鰻蒲焼と天ぷらの相盛り丼",
     "vi": "Cơm Lươn Nướng & Tempura Lươn"
    },
    "price": 269000
   },
   {
    "name": {
     "ko": "장어 덴푸라 덮밥",
     "en": "Eel Tempura Rice Bowl",
     "zh": "鳗鱼天妇罗盖饭",
     "ja": "鰻天丼",
     "vi": "Cơm Tempura Lươn"
    },
    "price": 239000
   },
   {
    "name": {
     "ko": "장어 달걀 덮밥",
     "en": "Grilled Eel With Egg Sauce Rice Bowl",
     "zh": "鳗鱼鸡蛋盖饭",
     "ja": "鰻の卵とじ丼",
     "vi": "Cơm Lươn Sốt Trứng"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "장어 온천달걀 파 덮밥",
     "en": "Grilled Eel and Egg with Spring Onions Rice Bowl",
     "zh": "鳗鱼温泉蛋葱花盖饭",
     "ja": "うな玉丼",
     "vi": "Cơm Lươn Trứng Hành"
    },
    "price": 179000
   },
   {
    "name": {
     "ko": "장어 & 돼지고기 덮밥",
     "en": "Grilled Eel & Pork Rice Bowl",
     "zh": "鳗鱼猪肉盖饭",
     "ja": "鰻豚丼",
     "vi": "Cơm Lươn & Thịt Heo Nướng"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "장어 & 소고기 덮밥",
     "en": "Grilled Eel & Beef Rice Bowl",
     "zh": "鳗鱼牛肉盖饭",
     "ja": "鰻牛丼",
     "vi": "Cơm Lươn & Thịt Bò"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "장어 & 닭고기 덮밥",
     "en": "Grilled Eel & Chicken Rice Bowl",
     "zh": "鳗鱼鸡肉盖饭",
     "ja": "鰻鳥丼",
     "vi": "Cơm Lươn & Gà Nướng"
    },
    "price": 199000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "깜짝 통장어 덮밥",
     "en": "Unexpected Eel Rice Bowl",
     "zh": "惊喜整条鳗鱼饭",
     "ja": "びっくり重",
     "vi": "Cơm Lươn Bất Ngờ"
    },
    "price": 549000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "특선 장어 덮밥 1 (우나주 상)",
     "en": "Special Eel Rice Bowl 1",
     "zh": "特选鳗鱼饭1(上)",
     "ja": "うな重上",
     "vi": "Cơm Lươn Đặc Biệt 1"
    },
    "price": 339000
   },
   {
    "name": {
     "ko": "특선 장어 덮밥 2 (우나주 특상)",
     "en": "Special Eel Rice Bowl 2",
     "zh": "特选鳗鱼饭2(特上)",
     "ja": "うな重特上",
     "vi": "Cơm Lươn Đặc Biệt 2"
    },
    "price": 439000
   },
   {
    "name": {
     "ko": "장어 덮밥 (우나주)",
     "en": "Eel Tail Rice Bowl",
     "zh": "鳗鱼重",
     "ja": "うな重",
     "vi": "Cơm Lươn Nướng Hộp (Unaju)"
    },
    "price": 229000
   },
   {
    "name": {
     "ko": "삼미 장어 덮밥",
     "en": "Three Flavors Eel Rice",
     "zh": "三味鳗鱼饭",
     "ja": "鰻三昧重",
     "vi": "Cơm Lươn Tam Vị"
    },
    "price": 299000
   },
   {
    "name": {
     "ko": "사색 장어 덮밥 (장어·관자·연어알·달걀말이)",
     "en": "Grilled Eel, Scallops, Salmon Roe & Rolled Omelette Rice Bowl",
     "zh": "四色鳗鱼饭(鳗鱼·扇贝·三文鱼子·玉子烧)",
     "ja": "彩四色重",
     "vi": "Cơm Lươn Tứ Sắc"
    },
    "price": 299000
   },
   {
    "name": {
     "ko": "장어·구운 연어·연어알 덮밥",
     "en": "Grilled Eel, Salmon & Salmon Roe Rice Bowl",
     "zh": "鳗鱼烤三文鱼三文鱼子盖饭",
     "ja": "鰻とサーモンいくら重",
     "vi": "Cơm Lươn, Cá Hồi Nướng & Trứng Cá Hồi"
    },
    "price": 299000
   },
   {
    "name": {
     "ko": "특선 히츠마부시",
     "en": "Special Hitsumabushi Rice Set",
     "zh": "特选鳗鱼三吃(Hitsumabushi)",
     "ja": "ひつまぶし",
     "vi": "Cơm Hitsumabushi Đặc Biệt"
    },
    "price": 309000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "더블 장어덮밥",
     "en": "Double Eel Rice Bowl",
     "zh": "双份鳗鱼盖饭",
     "ja": "うな丼ダブル",
     "vi": "Cơm Lươn Gấp Đôi"
    },
    "price": 249000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "장어덮밥",
     "en": "Grilled Eel Rice Bowl",
     "zh": "烤鳗鱼盖饭",
     "ja": "うな丼",
     "vi": "Cơm Lươn Nướng"
    },
    "price": 139000
   }
  ]
 },
 {
  "id": "don",
  "name": {
   "ko": "해산물 덮밥",
   "en": "Seafood Rice Bowls",
   "zh": "海鲜盖饭",
   "ja": "海鮮丼",
   "vi": "Cơm Hải Sản"
  },
  "items": [
   {
    "name": {
     "ko": "네기토로 덮밥",
     "en": "Minced Tuna Rice Bowl",
     "zh": "葱吞拿鱼蓉盖饭",
     "ja": "ネギトロ丼",
     "vi": "Cơm Cá Ngừ Xay Negitoro"
    },
    "sizes": [
     [
      "M",
      119000
     ],
     [
      "L",
      170000
     ],
     [
      "XL",
      220000
     ]
    ]
   },
   {
    "name": {
     "ko": "반숙달걀 네기토로 덮밥",
     "en": "Minced Tuna & Poached Egg Rice Bowl",
     "zh": "半熟蛋葱吞拿鱼蓉盖饭",
     "ja": "月見ねぎとろ丼",
     "vi": "Cơm Cá Ngừ Xay Negitoro & Trứng Lòng Đào"
    },
    "price": 140000
   },
   {
    "name": {
     "ko": "연어알 네기토로 덮밥",
     "en": "Minced Tuna & Salmon Roe Rice Bowl",
     "zh": "三文鱼子葱吞拿鱼蓉盖饭",
     "ja": "ねぎとろ&たっぷりいくら丼",
     "vi": "Cơm Cá Ngừ Xay Negitoro & Trứng Cá Hồi"
    },
    "price": 249000
   },
   {
    "name": {
     "ko": "참치 사시미 덮밥",
     "en": "Sashimi Tuna Rice Bowl",
     "zh": "吞拿鱼刺身盖饭",
     "ja": "鉄火丼",
     "vi": "Cơm Sashimi Cá Ngừ"
    },
    "sizes": [
     [
      "M",
      119000
     ],
     [
      "L",
      170000
     ],
     [
      "XL",
      220000
     ]
    ]
   },
   {
    "name": {
     "ko": "삼색 덮밥 (참치·가리비·연어알)",
     "en": "Tuna, Scallop & Salmon Roe Rice Bowl",
     "zh": "三色盖饭(吞拿鱼·扇贝·三文鱼子)",
     "ja": "三色丼 (マグロとホタテといくら)",
     "vi": "Cơm 3 Màu (Cá Ngừ, Sò Điệp & Trứng Cá Hồi)"
    },
    "price": 299000,
    "photo": "img/sanshoku.jpg"
   },
   {
    "name": {
     "ko": "이색 덮밥 (참치·연어)",
     "en": "Tuna & Salmon Rice Bowl",
     "zh": "双色盖饭(吞拿鱼·三文鱼)",
     "ja": "二色丼 (マグロとサーモン)",
     "vi": "Cơm 2 Màu (Cá Ngừ & Cá Hồi)"
    },
    "price": 230000
   },
   {
    "name": {
     "ko": "간장절임 참치덮밥",
     "en": "Soy-Marinated Tuna Rice Bowl",
     "zh": "酱油腌吞拿鱼盖饭",
     "ja": "漬け丼",
     "vi": "Cơm Cá Ngừ Ngâm Tương"
    },
    "sizes": [
     [
      "M",
      119000
     ],
     [
      "L",
      170000
     ],
     [
      "XL",
      220000
     ]
    ]
   },
   {
    "name": {
     "ko": "간장절임 참치·연어 덮밥",
     "en": "Soy-Marinated Tuna & Salmon Rice Bowl",
     "zh": "酱油腌吞拿鱼三文鱼盖饭",
     "ja": "まぐろサーモン漬けとろ丼",
     "vi": "Cơm Cá Ngừ & Cá Hồi Ngâm Tương"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "참치 3종 덮밥",
     "en": "3 Kinds Tuna Rice Bowl",
     "zh": "吞拿鱼三味盖饭",
     "ja": "まぐろ三種丼",
     "vi": "Cơm Cá Ngừ 3 Loại"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "해산물 육회 소스 덮밥",
     "en": "Seafood With Yukke Sauce Rice Bowl",
     "zh": "海鲜韩式拌酱盖饭",
     "ja": "海鮮ユッケ丼",
     "vi": "Cơm Hải Sản Sốt Yukke"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "연어·연어알·참치 덮밥",
     "en": "Salmon, Tuna & Salmon Roe Rice Bowl",
     "zh": "三文鱼·三文鱼子·吞拿鱼盖饭",
     "ja": "サーモンいくらまぐろ丼",
     "vi": "Cơm Cá Hồi, Trứng Cá Hồi & Cá Ngừ"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "연어 덮밥",
     "en": "Salmon Rice Bowl",
     "zh": "三文鱼盖饭",
     "ja": "サーモン丼",
     "vi": "Cơm Cá Hồi"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "3종 연어 덮밥",
     "en": "3 Kinds Salmon Rice Bowl",
     "zh": "三文鱼三味盖饭",
     "ja": "サーモン三種丼",
     "vi": "Cơm Cá Hồi 3 Loại"
    },
    "price": 249000
   },
   {
    "name": {
     "ko": "다진 연어 반숙 계란 덮밥",
     "en": "Minced Salmon & Poached Egg Rice Bowl",
     "zh": "三文鱼蓉半熟蛋盖饭",
     "ja": "月見さけとろ丼",
     "vi": "Cơm Cá Hồi Xay & Trứng Lòng Đào"
    },
    "price": 149000
   },
   {
    "name": {
     "ko": "연어·연어알 덮밥",
     "en": "Salmon & Salmon Roe Rice Bowl",
     "zh": "三文鱼·三文鱼子盖饭",
     "ja": "サーモンいくら丼",
     "vi": "Cơm Cá Hồi & Trứng Cá Hồi"
    },
    "price": 249000
   },
   {
    "name": {
     "ko": "특선 연어알 덮밥",
     "en": "Special Salmon Roe Rice Bowl",
     "zh": "特选三文鱼子盖饭",
     "ja": "こぼれるいくら丼",
     "vi": "Cơm Trứng Cá Hồi Đặc Biệt"
    },
    "price": 499000
   }
  ]
 },
 {
  "id": "bowl",
  "name": {
   "ko": "튀김·고기·돌솥 덮밥",
   "en": "Tempura, Meat & Stone Bowl Rice",
   "zh": "天妇罗·肉类·石锅盖饭",
   "ja": "天ぷら・肉・石焼丼",
   "vi": "Cơm Tempura, Thịt & Thố Đá"
  },
  "items": [
   {
    "name": {
     "ko": "장어 & 새우 덴푸라 덮밥 + 미소된장국",
     "en": "Grilled Eel & Shrimp Tempura Rice Bowl + Miso Soup",
     "zh": "鳗鱼虾天妇罗盖饭+味噌汤",
     "ja": "鰻と海老天丼 +味噌汁",
     "vi": "Cơm Lươn & Tôm Tempura + Súp Miso"
    },
    "price": 249000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "특선 새우 덴푸라 덮밥 + 미소된장국",
     "en": "Special Shrimp Tempura Rice Bowl + Miso Soup",
     "zh": "特制虾天妇罗盖饭+味噌汤",
     "ja": "特製海老天丼+味噌汁",
     "vi": "Cơm Tempura Tôm Đặc Biệt + Súp Miso"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "새우 덴푸라 덮밥",
     "en": "Shrimp Tempura Rice Bowl",
     "zh": "虾天妇罗盖饭",
     "ja": "海老天丼",
     "vi": "Cơm Tempura Tôm"
    },
    "price": 139000
   },
   {
    "name": {
     "ko": "돈카츠 덮밥",
     "en": "Deep Fried Pork With Rice (Tonkatsu)",
     "zh": "炸猪排盖饭",
     "ja": "カツ丼",
     "vi": "Cơm Thịt Heo Chiên Xù"
    },
    "price": 99000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "닭꼬치 구이 덮밥",
     "en": "Grilled Chicken Skewer Rice Bowl",
     "zh": "烤鸡肉串盖饭",
     "ja": "串焼き鳥丼",
     "vi": "Cơm Xiên Gà Nướng"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "닭고기 계란 덮밥",
     "en": "Chicken With Egg Sauce Rice Bowl",
     "zh": "亲子盖饭",
     "ja": "鶏の親子丼",
     "vi": "Cơm Gà Sốt Trứng"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "타레마요 치킨 가라아게 덮밥",
     "en": "Fried Chicken With Taremayo Sauce Rice Bowl",
     "zh": "塔勒蛋黄酱炸鸡盖饭",
     "ja": "月見タレマヨ唐揚げ丼",
     "vi": "Cơm Gà Chiên Taremayo"
    },
    "price": 149000
   },
   {
    "name": {
     "ko": "돼지고기 구이 덮밥",
     "en": "Grilled Pork Rice Bowl",
     "zh": "烤猪肉盖饭",
     "ja": "豚丼",
     "vi": "Cơm Thịt Heo Nướng"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "소고기 덮밥",
     "en": "Stir-fried Beef Rice Bowl",
     "zh": "牛肉盖饭",
     "ja": "牛丼",
     "vi": "Cơm Thịt Bò"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "장어 & 고등어 돌솥 덮밥",
     "en": "Grilled Eel & Saba Rice Stone Bowl",
     "zh": "鳗鱼青花鱼石锅饭",
     "ja": "鰻と鯖の石焼きひつまぶし",
     "vi": "Cơm Lươn & Cá Saba Nướng Thố Đá"
    },
    "price": 229000
   },
   {
    "name": {
     "ko": "장어 돌솥 덮밥",
     "en": "Grilled Eel Rice Stone Bowl",
     "zh": "鳗鱼石锅饭",
     "ja": "鰻の石焼きひつまぶし",
     "vi": "Cơm Lươn Nướng Thố Đá"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "연어 & 명란 버터 돌솥 덮밥",
     "en": "Salmon & Grilled Mentai Egg Rice Stone Bowl",
     "zh": "三文鱼明太子黄油石锅饭",
     "ja": "サーモンと明太バターの石焼きひつまぶし",
     "vi": "Cơm Cá Hồi & Trứng Mentai Nướng Thố Đá"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "돌솥 볶음밥",
     "en": "Fried Rice Stone Bowl",
     "zh": "石锅炒饭",
     "ja": "石焼チャーハン",
     "vi": "Cơm Chiên Thố Đá"
    },
    "price": 99000
   }
  ]
 },
 {
  "id": "noodle",
  "name": {
   "ko": "면·오차즈케",
   "en": "Noodles & Chazuke",
   "zh": "面类·茶泡饭",
   "ja": "麺・茶漬け",
   "vi": "Mì & Chazuke"
  },
  "items": [
   {
    "name": {
     "ko": "장어 & 연어알 구운 주먹밥 오차즈케",
     "en": "Grilled Rice Ball Chazuke With Eel & Salmon Roe",
     "zh": "鳗鱼三文鱼子烤饭团茶泡饭",
     "ja": "焼きおにぎり茶漬け鰻といくら乗せ",
     "vi": "Cơm Nướng Than Chazuke Với Lươn Và Trứng Cá Hồi"
    },
    "price": 139000
   },
   {
    "name": {
     "ko": "연어 & 연어알 구운 주먹밥 오차즈케",
     "en": "Grilled Rice Ball Chazuke With Salmon & Salmon Roe",
     "zh": "三文鱼三文鱼子烤饭团茶泡饭",
     "ja": "焼きおにぎり茶漬け鮭といくら乗せ",
     "vi": "Cơm Nướng Than Chazuke Với Cá Hồi Và Trứng Cá Hồi"
    },
    "price": 139000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "연어 구운 주먹밥 오차즈케",
     "en": "Grilled Rice Ball Chazuke With Salmon",
     "zh": "三文鱼烤饭团茶泡饭",
     "ja": "焼きおにぎり茶漬け（鮭）",
     "vi": "Cơm Nướng Than Chazuke Với Cá Hồi"
    },
    "price": 99000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "장어 구운 주먹밥 오차즈케",
     "en": "Grilled Rice Ball Chazuke With Eel",
     "zh": "鳗鱼烤饭团茶泡饭",
     "ja": "焼きおにぎり茶漬け（鰻）",
     "vi": "Cơm Nướng Than Chazuke Với Lươn"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "타코와사비 구운 주먹밥 오차즈케",
     "en": "Grilled Rice Ball Chazuke With Octopus & Wasabi",
     "zh": "章鱼芥末烤饭团茶泡饭",
     "ja": "焼きおにぎり茶漬け（たこワサビ）",
     "vi": "Cơm Nướng Than Chazuke Với Bạch Tuộc Và Wasabi"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "명란 구운 주먹밥 오차즈케",
     "en": "Grilled Rice Ball Chazuke With Spicy Cod Roe (Mentaiko)",
     "zh": "明太子烤饭团茶泡饭",
     "ja": "焼きおにぎり茶漬け（明太子）",
     "vi": "Cơm Nướng Than Chazuke Trứng Cá Cay (Mentaiko)"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "따뜻한 튀김 소바",
     "en": "Hot Soba & Tempura",
     "zh": "热天妇罗荞麦面",
     "ja": "天ぷらそば（温）",
     "vi": "Mì Soba Tempura Nóng"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "차가운 튀김 우동",
     "en": "Cold Udon & Tempura",
     "zh": "冷天妇罗乌冬面",
     "ja": "天ぷらうどん（冷）",
     "vi": "Mì Udon Tempura Lạnh"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "따뜻한 튀김 우동",
     "en": "Hot Udon & Tempura",
     "zh": "热天妇罗乌冬面",
     "ja": "天ぷらうどん（温）",
     "vi": "Mì Udon Tempura Nóng"
    },
    "price": 99000,
    "photo": "img/udon.jpg"
   },
   {
    "name": {
     "ko": "차가운 튀김 소바",
     "en": "Cold Soba & Tempura",
     "zh": "冷天妇罗荞麦面",
     "ja": "天ぷらそば（冷）",
     "vi": "Mì Soba Tempura Lạnh"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "일본식 야키소바",
     "en": "Japanese Stir-fried Soba",
     "zh": "日式炒荞麦面",
     "ja": "焼きそば",
     "vi": "Mì Soba Xào Kiểu Nhật"
    },
    "price": 99000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "오므소바 (달걀말이 야키소바)",
     "en": "Japanese Omelet with Stir-fry Soba",
     "zh": "蛋包炒荞麦面",
     "ja": "オムソバ",
     "vi": "Mì Soba Xào Cuộn Trứng"
    },
    "price": 129000
   },
   {
    "name": {
     "ko": "야키우동",
     "en": "Stir-fried Udon",
     "zh": "日式炒乌冬面",
     "ja": "焼きうどん",
     "vi": "Mì Udon Xào"
    },
    "price": 99000
   }
  ]
 },
 {
  "id": "skewer",
  "name": {
   "ko": "꼬치구이",
   "en": "Skewers",
   "zh": "烤串",
   "ja": "串焼き",
   "vi": "Xiên Nướng"
  },
  "items": [
   {
    "name": {
     "ko": "닭꼬치 5종 모둠",
     "en": "Assortment of 5 Chicken Skewers",
     "zh": "五种烤鸡肉串拼盘",
     "ja": "焼鳥五本盛り合わせ",
     "vi": "Xiên Gà Nướng 5 Loại"
    },
    "price": 119000,
    "photo": "img/yakitori.jpg"
   },
   {
    "name": {
     "ko": "우나토토 스타일 닭다리살 대꼬치",
     "en": "Unatoto - Style Grilled Chicken Thigh",
     "zh": "宇奈土土风味大串鸡腿肉",
     "ja": "鶏モモ宇奈とと大串",
     "vi": "Xiên Đùi Gà Nướng Kiểu Unatoto"
    },
    "price": 39000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "마늘 닭다리살 대꼬치",
     "en": "Special Grilled Chicken Thigh & Garlic Skewer",
     "zh": "大蒜鸡腿肉大串",
     "ja": "にんにく間大串",
     "vi": "Xiên Đùi Gà Tỏi Nướng"
    },
    "price": 39000
   },
   {
    "name": {
     "ko": "닭염통 꼬치",
     "en": "Grilled Chicken Heart Skewer",
     "zh": "烤鸡心串",
     "ja": "焼鳥ハツ",
     "vi": "Xiên Tim Gà Nướng"
    },
    "price": 24000
   },
   {
    "name": {
     "ko": "닭다리살 꼬치",
     "en": "Grilled Chicken Thigh Skewer",
     "zh": "烤鸡腿肉串",
     "ja": "焼鳥もも",
     "vi": "Xiên Thịt Đùi Gà Nướng"
    },
    "price": 24000
   },
   {
    "name": {
     "ko": "닭파 꼬치 (네기마)",
     "en": "Grilled Chicken and Onion Skewer",
     "zh": "鸡肉葱串",
     "ja": "焼鳥ねぎ間",
     "vi": "Xiên Gà & Hành Nướng"
    },
    "price": 24000
   },
   {
    "name": {
     "ko": "닭똥집 꼬치",
     "en": "Grilled Chicken Gizzard Skewer",
     "zh": "烤鸡胗串",
     "ja": "焼鳥砂肝",
     "vi": "Xiên Mề Gà Nướng"
    },
    "price": 24000
   },
   {
    "name": {
     "ko": "닭껍질 꼬치",
     "en": "Grilled Chicken Skin Skewer",
     "zh": "烤鸡皮串",
     "ja": "焼鳥皮",
     "vi": "Xiên Da Gà Nướng"
    },
    "price": 24000
   },
   {
    "name": {
     "ko": "닭날개 꼬치",
     "en": "Grilled Chicken Wing Skewer",
     "zh": "烤鸡翅串",
     "ja": "焼鳥手羽先",
     "vi": "Xiên Cánh Gà Nướng"
    },
    "price": 24000
   },
   {
    "name": {
     "ko": "닭꼬리살 꼬치 (본지리)",
     "en": "Grilled Chicken Tail Skewer",
     "zh": "烤鸡尾肉串",
     "ja": "焼鳥ぼんじり",
     "vi": "Xiên Phao Câu Gà Nướng"
    },
    "price": 24000
   },
   {
    "name": {
     "ko": "닭고기 완자 꼬치 (츠쿠네)",
     "en": "Grilled Chicken Ball Skewer",
     "zh": "烤鸡肉丸串",
     "ja": "つくね串",
     "vi": "Xiên Gà Viên Nướng"
    },
    "price": 29000
   },
   {
    "name": {
     "ko": "닭고기 완자 & 달걀 노른자 꼬치",
     "en": "Grilled Chicken Ball Skewer & Egg Yolk",
     "zh": "鸡肉丸蛋黄串",
     "ja": "つくね/黄身付け",
     "vi": "Xiên Gà Viên & Lòng Đỏ Trứng"
    },
    "price": 39000
   },
   {
    "name": {
     "ko": "치즈 닭고기 완자 꼬치",
     "en": "Grilled Chicken Ball with Cheese Skewer",
     "zh": "芝士鸡肉丸串",
     "ja": "つくね/チーズ",
     "vi": "Xiên Gà Viên Phô Mai"
    },
    "price": 39000
   },
   {
    "name": {
     "ko": "닭가슴연골 꼬치",
     "en": "Grilled Chicken Cartilage Skewer",
     "zh": "烤鸡胸软骨串",
     "ja": "やげん軟骨串",
     "vi": "Xiên Sụn Ức Gà"
    },
    "price": 24000
   },
   {
    "name": {
     "ko": "장어 & 닭꼬치 모둠 세트",
     "en": "Grilled Eel & Chicken Skewers Set",
     "zh": "鳗鱼鸡肉串拼盘套餐",
     "ja": "鰻串と焼鳥串の盛り合わせ",
     "vi": "Set Xiên Lươn & Gà Nướng"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "장어 꼬치 5종 모둠",
     "en": "Assortment of 5 Eel Skewers",
     "zh": "五种鳗鱼串拼盘",
     "ja": "宇奈串五本盛り合わせ",
     "vi": "Xiên Lươn Nướng 5 Loại"
    },
    "price": 269000
   },
   {
    "name": {
     "ko": "타레 소스 장어 꼬치",
     "en": "Eel Skewer with Tare Sauce",
     "zh": "酱汁鳗鱼串",
     "ja": "宇奈串タレ",
     "vi": "Xiên Lươn Sốt Tare"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "와사비 장어 꼬치",
     "en": "Eel Skewer with Wasabi Sauce",
     "zh": "芥末鳗鱼串",
     "ja": "宇奈串ワサビ",
     "vi": "Xiên Lươn Sốt Wasabi"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "마요네즈 장어 꼬치",
     "en": "Eel Skewer with Mayonnaise Sauce",
     "zh": "蛋黄酱鳗鱼串",
     "ja": "宇奈串マヨネーズ",
     "vi": "Xiên Lươn Sốt Mayonnaise"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "달걀노른자 장어 꼬치",
     "en": "Eel Skewer with Egg Yolk",
     "zh": "蛋黄鳗鱼串",
     "ja": "宇奈串黄身付け",
     "vi": "Xiên Lươn Lòng Đỏ Trứng"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "폰즈 & 무즙 장어 꼬치",
     "en": "Eel Skewer with Ponzu & Grated Radish",
     "zh": "柚子醋萝卜泥鳗鱼串",
     "ja": "宇奈串おろしぽん酢",
     "vi": "Xiên Lươn Sốt Ponzu & Củ Cải Bào"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "유즈코쇼 장어 꼬치",
     "en": "Eel Skewer with Yuzu Kosho",
     "zh": "柚子胡椒鳗鱼串",
     "ja": "宇奈串ゆず胡椒",
     "vi": "Xiên Lươn Sốt Tiêu Nhật"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "치즈 장어 꼬치",
     "en": "Eel Skewer with Cheese",
     "zh": "芝士鳗鱼串",
     "ja": "宇奈串チーズ",
     "vi": "Xiên Lươn Phô Mai"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "시샤모 꼬치구이",
     "en": "Grilled Shishamo Skewer",
     "zh": "烤多春鱼串",
     "ja": "ししゃも串",
     "vi": "Xiên Cá Shishamo Nướng"
    },
    "price": 39000
   },
   {
    "name": {
     "ko": "삼겹살 꼬치구이",
     "en": "Grilled Pork Belly Skewer",
     "zh": "烤五花肉串",
     "ja": "豚バラ串",
     "vi": "Xiên Ba Chỉ Heo Nướng"
    },
    "price": 39000
   },
   {
    "name": {
     "ko": "메추리알 꼬치",
     "en": "Quail Egg Skewer",
     "zh": "鹌鹑蛋串",
     "ja": "うずらの玉子串",
     "vi": "Xiên Trứng Cút"
    },
    "price": 24000
   }
  ]
 },
 {
  "id": "sashimi",
  "name": {
   "ko": "사시미",
   "en": "Sashimi",
   "zh": "刺身",
   "ja": "刺身",
   "vi": "Sashimi"
  },
  "items": [
   {
    "name": {
     "ko": "일본산 생굴 사시미 (폰즈/간장)",
     "en": "Oyster Sashimi with Ponzu/Shoyu Sauce",
     "zh": "日本生蚝刺身(柚子醋/酱油)",
     "ja": "日本産 生牡蠣 おろしポン酢/醤油",
     "vi": "Hàu Nhật Sashimi Ponzu/Shoyu"
    },
    "sizes": [
     [
      "1pc",
      129000
     ],
     [
      "3pc",
      329000
     ]
    ]
   },
   {
    "name": {
     "ko": "연어알 & 간 무",
     "en": "Salmon Roe and Grated Radish",
     "zh": "三文鱼子配萝卜泥",
     "ja": "いくらおろし",
     "vi": "Trứng Cá Hồi & Củ Cải Xay"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "연어 & 연어알 사시미",
     "en": "Salmon Sashimi & Salmon Roe",
     "zh": "三文鱼刺身配三文鱼子",
     "ja": "サーモンいくらの刺身",
     "vi": "Sashimi Cá Hồi & Trứng Cá Hồi"
    },
    "price": 169000
   },
   {
    "name": {
     "ko": "연어 사시미",
     "en": "Salmon Sashimi",
     "zh": "三文鱼刺身",
     "ja": "サーモン刺身",
     "vi": "Sashimi Cá Hồi"
    },
    "price": 149000
   },
   {
    "name": {
     "ko": "참치 사시미",
     "en": "Tuna Sashimi",
     "zh": "吞拿鱼刺身",
     "ja": "まぐろ刺身",
     "vi": "Sashimi Cá Ngừ"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "연어 뱃살 사시미",
     "en": "Fatty Salmon Sashimi",
     "zh": "三文鱼腩刺身",
     "ja": "トロサーモン刺身",
     "vi": "Sashimi Bụng Cá Hồi"
    },
    "price": 169000
   },
   {
    "name": {
     "ko": "청어알 사시미",
     "en": "Herring Roe Sashimi",
     "zh": "鲱鱼子刺身",
     "ja": "子持ちニシン刺身",
     "vi": "Sashimi Cá Trích"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "미니 오징어 사시미",
     "en": "Mini Squid Sashimi",
     "zh": "小鱿鱼刺身",
     "ja": "ミニイカの刺身",
     "vi": "Sashimi Mực Mini"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "북방조개 사시미",
     "en": "Hokki Shellfish Sashimi",
     "zh": "北极贝刺身",
     "ja": "北寄貝刺身",
     "vi": "Sashimi Sò Đỏ"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "문어 사시미",
     "en": "Octopus Sashimi",
     "zh": "章鱼刺身",
     "ja": "たこ刺身",
     "vi": "Sashimi Bạch Tuộc"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "가리비 관자 사시미",
     "en": "Scallop Sashimi",
     "zh": "扇贝刺身",
     "ja": "ホタテ刺身",
     "vi": "Sashimi Sò Điệp"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "사시미 6종 모둠",
     "en": "Assortment of 6 Sashimi",
     "zh": "六种刺身拼盘",
     "ja": "刺身六点",
     "vi": "Sashimi 6 Loại"
    },
    "price": 299000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "사시미 3종 모둠",
     "en": "Assortment of 3 Sashimi",
     "zh": "三种刺身拼盘",
     "ja": "刺身三点",
     "vi": "Sashimi 3 Loại"
    },
    "price": 169000
   },
   {
    "name": {
     "ko": "연어 사시미 4종 모둠",
     "en": "Assorted Salmon - 4 Kinds",
     "zh": "四种三文鱼刺身拼盘",
     "ja": "サーモン四種盛り",
     "vi": "Sashimi Cá Hồi 4 Loại"
    },
    "price": 269000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "연어알",
     "en": "Salmon Roe",
     "zh": "三文鱼子",
     "ja": "いくら",
     "vi": "Trứng Cá Hồi"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "날치알",
     "en": "Flying Fish Roe",
     "zh": "飞鱼子",
     "ja": "まさご",
     "vi": "Trứng Cá Chuồn"
    },
    "price": 29000
   }
  ]
 },
 {
  "id": "roll",
  "name": {
   "ko": "롤 스시",
   "en": "Roll Sushi",
   "zh": "卷寿司",
   "ja": "ロール寿司",
   "vi": "Sushi Cuộn"
  },
  "items": [
   {
    "name": {
     "ko": "연어 뱃살 & 연어알 롤",
     "en": "Salmon & Salmon Roe Roll",
     "zh": "三文鱼腩三文鱼子卷",
     "ja": "サーモンハラスいくらロール",
     "vi": "Sushi Cuộn Cá Hồi và Trứng Cá Hồi"
    },
    "price": 169000
   },
   {
    "name": {
     "ko": "연어 롤",
     "en": "Salmon Roll",
     "zh": "三文鱼卷",
     "ja": "サーモンロール",
     "vi": "Sushi Cuộn Cá Hồi"
    },
    "price": 149000
   },
   {
    "name": {
     "ko": "새우 롤",
     "en": "Shrimp Roll",
     "zh": "虾卷",
     "ja": "海老ロール",
     "vi": "Sushi Cuộn Tôm"
    },
    "price": 139000
   },
   {
    "name": {
     "ko": "참치 육회 롤",
     "en": "Yukke Tuna Roll",
     "zh": "吞拿鱼韩式拌酱卷",
     "ja": "マグロユッケロール",
     "vi": "Sushi Cuộn Cá Ngừ Yukke"
    },
    "price": 139000
   },
   {
    "name": {
     "ko": "가리비 튀김 롤",
     "en": "Scallop Tempura Roll",
     "zh": "扇贝天妇罗卷",
     "ja": "帆立天ロール",
     "vi": "Sushi Cuộn Tempura Sò Điệp"
    },
    "price": 139000
   },
   {
    "name": {
     "ko": "새우 튀김 롤",
     "en": "Shrimp Tempura Roll",
     "zh": "虾天妇罗卷",
     "ja": "海老天ロール",
     "vi": "Sushi Cuộn Tempura Tôm"
    },
    "price": 139000
   },
   {
    "name": {
     "ko": "장어 버터 초밥",
     "en": "Eel & Butter Roll",
     "zh": "鳗鱼黄油卷",
     "ja": "鰻バター寿司",
     "vi": "Sushi Cuộn Lươn Bơ"
    },
    "price": 139000
   },
   {
    "name": {
     "ko": "구운 장어 롤",
     "en": "Roasted Eel Roll",
     "zh": "炙烤鳗鱼卷",
     "ja": "炙り鰻ロール",
     "vi": "Sushi Cuộn Lươn Nướng"
    },
    "price": 149000
   },
   {
    "name": {
     "ko": "구운 고기 치즈 롤",
     "en": "Roasted Meat Cheese Roll",
     "zh": "炙烤肉芝士卷",
     "ja": "炙り肉チーズロール",
     "vi": "Sushi Thịt Nướng Phô Mai"
    },
    "price": 139000
   },
   {
    "name": {
     "ko": "구운 연어 롤",
     "en": "Roasted Salmon Roll",
     "zh": "炙烤三文鱼卷",
     "ja": "炙りサーモンロール",
     "vi": "Sushi Cá Hồi Khè"
    },
    "price": 149000
   },
   {
    "name": {
     "ko": "구운 참치 롤",
     "en": "Roasted Tuna Roll",
     "zh": "炙烤吞拿鱼卷",
     "ja": "炙りまぐろロール",
     "vi": "Sushi Cá Ngừ Khè"
    },
    "price": 139000
   }
  ]
 },
 {
  "id": "tempura",
  "name": {
   "ko": "튀김",
   "en": "Tempura & Fried",
   "zh": "天妇罗·炸物",
   "ja": "天ぷら・揚げ物",
   "vi": "Tempura & Món Chiên"
  },
  "items": [
   {
    "name": {
     "ko": "새우 튀김",
     "en": "Shrimp Tempura",
     "zh": "炸虾天妇罗",
     "ja": "海老の天ぷら",
     "vi": "Tempura Tôm"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "장어 튀김",
     "en": "Eel Tempura",
     "zh": "鳗鱼天妇罗",
     "ja": "鰻の天ぷら",
     "vi": "Tempura Lươn"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "모둠 튀김 (5종)",
     "en": "Mix Tempura (5 Types)",
     "zh": "什锦天妇罗(5种)",
     "ja": "天ぷら 五点盛り",
     "vi": "Tempura Thập Cẩm (5 Loại)"
    },
    "price": 155000
   },
   {
    "name": {
     "ko": "모둠 튀김 (3종)",
     "en": "Mix Tempura (3 Types)",
     "zh": "什锦天妇罗(3种)",
     "ja": "天ぷら三点盛り",
     "vi": "Tempura Thập Cẩm (3 Loại)"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "가리비 튀김",
     "en": "Scallop Tempura",
     "zh": "扇贝天妇罗",
     "ja": "ほたての天ぷら",
     "vi": "Tempura Sò Điệp"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "오징어 튀김",
     "en": "Squid Tempura",
     "zh": "鱿鱼天妇罗",
     "ja": "イカ天ぷら",
     "vi": "Tempura Mực"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "오징어 다리 튀김",
     "en": "Squid Tentacle Tempura",
     "zh": "鱿鱼须天妇罗",
     "ja": "ゲソ天ぷら",
     "vi": "Tempura Râu Mực"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "닭고기 튀김",
     "en": "Chicken Tempura",
     "zh": "鸡肉天妇罗",
     "ja": "とり天ぷら",
     "vi": "Tempura Gà"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "연어알 김 튀김 (2개)",
     "en": "Seaweed Tempura with Salmon Roe (2 pcs)",
     "zh": "三文鱼籽海苔天妇罗(2块)",
     "ja": "のり天ぷらいくら乗せ",
     "vi": "Tempura Rong Biển Kèm Trứng Cá Hồi (2 Miếng)"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "참치뱃살·단무지 김 튀김 (2개)",
     "en": "Seaweed Tempura with Fatty Tuna & Pickled Radish (2 pcs)",
     "zh": "金枪鱼腩腌萝卜海苔天妇罗(2块)",
     "ja": "のり天ぷらトロたく乗せ",
     "vi": "Tempura Rong Biển Kèm Cá Ngừ & Củ Cải Muối (2 Miếng)"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "보리멸(키스) 튀김",
     "en": "Kisu Fish Tempura",
     "zh": "鱚鱼天妇罗",
     "ja": "キス天ぷら",
     "vi": "Tempura Cá Kisu"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "새우 튀김 3마리 세트",
     "en": "Shrimp Tempura Set (3 Pieces)",
     "zh": "炸虾天妇罗套餐(3只)",
     "ja": "エビ天ぷら三本セット",
     "vi": "Set Tempura Tôm (3 Con)"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "반숙 맛계란 튀김",
     "en": "Soft-boiled Egg Tempura",
     "zh": "溏心蛋天妇罗",
     "ja": "味玉天ぷら",
     "vi": "Tempura Trứng Lòng Đào"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "야채 튀김 5종 모둠",
     "en": "Vegetable Tempura (5 Types)",
     "zh": "什锦蔬菜天妇罗(5种)",
     "ja": "野菜天ぷら五点盛り",
     "vi": "Tempura Rau Củ (5 Loại)"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "버섯 튀김",
     "en": "Mushroom Tempura",
     "zh": "蘑菇天妇罗",
     "ja": "きのこの天ぷら",
     "vi": "Tempura Nấm"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "고구마 튀김",
     "en": "Sweet Potato Tempura",
     "zh": "红薯天妇罗",
     "ja": "さつまいも天ぷら",
     "vi": "Tempura Khoai Lang"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "치즈 튀김",
     "en": "Cheese Tempura",
     "zh": "芝士天妇罗",
     "ja": "チーズ天ぷら",
     "vi": "Tempura Phô Mai"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "특제 타레마요 치킨 가라아게",
     "en": "Fried Chicken with Taremayo Sauce",
     "zh": "特制塔雷蛋黄酱炸鸡",
     "ja": "特製タレマヨ唐揚げ",
     "vi": "Gà Chiên Sốt Taremayo"
    },
    "price": 99000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "특제 타레 치킨 가라아게",
     "en": "Fried Chicken with Tare Sauce",
     "zh": "特制塔雷酱炸鸡",
     "ja": "特製タレ唐揚げ",
     "vi": "Gà Chiên Sốt Tare Đặc Biệt"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "전갱이 튀김",
     "en": "Deep-fried Horse Mackerel",
     "zh": "炸竹荚鱼",
     "ja": "アジフライ",
     "vi": "Cá Trác Chiên Xù"
    },
    "price": 79000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "닭가슴살 연골 튀김",
     "en": "Deep Fried Chicken Breast Cartilage",
     "zh": "炸鸡胸软骨",
     "ja": "やげん軟骨揚げ",
     "vi": "Sụn Ức Gà Chiên"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "돈가스",
     "en": "Pork Katsu (Tonkatsu)",
     "zh": "日式炸猪排",
     "ja": "とんかつ",
     "vi": "Thịt Heo Chiên Xù"
    },
    "price": 79000
   },
   {
    "name": {
     "ko": "새우튀김",
     "en": "Fried Shrimp (Ebi Fry)",
     "zh": "炸虾",
     "ja": "エビフライ",
     "vi": "Tôm Chiên Xù"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "작은 새우 튀김",
     "en": "Crispy Fried Small Shrimp",
     "zh": "酥炸小虾",
     "ja": "小エビ唐揚げ",
     "vi": "Tôm Mini Chiên Giòn"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "새우칩 (에비센)",
     "en": "Crispy Shrimp Fritters (Ebisen)",
     "zh": "虾片",
     "ja": "えびせん",
     "vi": "Bánh Phồng Tôm"
    },
    "price": 29000
   }
  ]
 },
 {
  "id": "salad",
  "name": {
   "ko": "샐러드",
   "en": "Salad",
   "zh": "沙拉",
   "ja": "サラダ",
   "vi": "Salad"
  },
  "items": [
   {
    "name": {
     "ko": "우나토토 특선 장어 샐러드",
     "en": "Special Unatoto Grilled Eel Salad",
     "zh": "宇奈土土特制烤鳗鱼沙拉",
     "ja": "宇奈ととサラダ",
     "vi": "Salad Unatoto Đặc Biệt"
    },
    "price": 149000
   },
   {
    "name": {
     "ko": "시저 샐러드 (베이컨·반숙 계란)",
     "en": "Caesar Salad",
     "zh": "凯撒沙拉(培根·溏心蛋)",
     "ja": "シーザーサラダ",
     "vi": "Salad Thịt Xông Khói & Trứng Lòng Đào"
    },
    "price": 99000,
    "photo": "img/salad.jpg"
   },
   {
    "name": {
     "ko": "일본식 그린 샐러드",
     "en": "Japanese Vegetable Salad",
     "zh": "日式蔬菜沙拉",
     "ja": "グリーンサラダ",
     "vi": "Salad Rau Kiểu Nhật"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "해산물 샐러드",
     "en": "Seafood Salad",
     "zh": "海鲜沙拉",
     "ja": "海鮮サラダ",
     "vi": "Salad Hải Sản"
    },
    "price": 139000
   },
   {
    "name": {
     "ko": "바삭한 연어껍질 샐러드",
     "en": "Crispy Salmon Skin Salad",
     "zh": "酥脆三文鱼皮沙拉",
     "ja": "サーモンのカリカリサラダ",
     "vi": "Salad Da Cá Hồi Chiên Giòn"
    },
    "price": 139000
   },
   {
    "name": {
     "ko": "연어 마요 샐러드",
     "en": "Salmon Mayo Salad",
     "zh": "三文鱼蛋黄酱沙拉",
     "ja": "サーモンマヨサラダ",
     "vi": "Salad Cá Hồi"
    },
    "price": 149000
   },
   {
    "name": {
     "ko": "톤페이야키풍 돼지고기 계란 샐러드",
     "en": "Pork and Egg Salad (Tonpeiyaki Style)",
     "zh": "猪肉蛋饼风味沙拉",
     "ja": "豚平焼きサラダ風",
     "vi": "Salad Thịt Heo Phủ Trứng"
    },
    "price": 79000
   },
   {
    "name": {
     "ko": "베이컨 감자 샐러드",
     "en": "Potato Salad with Bacon",
     "zh": "培根土豆沙拉",
     "ja": "ベーコンポテトサラダ",
     "vi": "Salad Khoai Tây Với Thịt Xông Khói"
    },
    "price": 99000
   }
  ]
 },
 {
  "id": "dish",
  "name": {
   "ko": "일품·안주·철판",
   "en": "Dishes, Appetizers & Teppan",
   "zh": "小菜·下酒菜·铁板",
   "ja": "一品・おつまみ・鉄板",
   "vi": "Món Nhắm & Món Ăn Kèm"
  },
  "items": [
   {
    "name": {
     "ko": "가오리 지느러미 구이",
     "en": "Dried Stingray",
     "zh": "烤鳐鱼鳍",
     "ja": "えいひれ",
     "vi": "Khô Cá Đuối"
    },
    "price": 69000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "참치 육포",
     "en": "Dried Tuna",
     "zh": "金枪鱼干",
     "ja": "まぐろジャーキー",
     "vi": "Khô Cá Ngừ"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "연두부 냉채 (히야얏코)",
     "en": "Chilled Tofu (Hiyayakko)",
     "zh": "凉拌嫩豆腐",
     "ja": "冷奴",
     "vi": "Đậu Hũ Lạnh"
    },
    "price": 39000
   },
   {
    "name": {
     "ko": "우나토토 간장 맛달걀",
     "en": "Unatoto Soy Sauce Eggs",
     "zh": "宇奈土土酱油入味蛋",
     "ja": "宇奈ととの味玉",
     "vi": "Trứng Ngâm Tương Unatoto"
    },
    "price": 39000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "소금 참기름 양배추",
     "en": "Japanese Cabbage Salad",
     "zh": "盐香芝麻油卷心菜",
     "ja": "塩だれキャベツ",
     "vi": "Bắp Cải Trộn Sốt Muối Mè"
    },
    "price": 39000
   },
   {
    "name": {
     "ko": "안주용 미역 무침",
     "en": "Seaweed Salad",
     "zh": "凉拌裙带菜",
     "ja": "おつまみワカメ",
     "vi": "Rong Biển Trộn Mè"
    },
    "price": 59000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "일본식 에다마메",
     "en": "Japanese Edamame Beans",
     "zh": "日式毛豆",
     "ja": "枝豆",
     "vi": "Đậu Edamame Nhật"
    },
    "price": 39000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "바다포도",
     "en": "Sea Grapes",
     "zh": "海葡萄",
     "ja": "海ぶどう",
     "vi": "Rong Nho"
    },
    "price": 39000
   },
   {
    "name": {
     "ko": "배추김치",
     "en": "Cabbage Kimchi",
     "zh": "白菜泡菜",
     "ja": "白菜キムチ",
     "vi": "Kim Chi Cải Thảo"
    },
    "price": 39000
   },
   {
    "name": {
     "ko": "소금 소스 오이 무침",
     "en": "Cucumber with Salt Sauce",
     "zh": "盐味拌黄瓜",
     "ja": "塩だれ胡瓜",
     "vi": "Dưa Nhật Sốt Muối"
    },
    "price": 39000
   },
   {
    "name": {
     "ko": "날개 군만두",
     "en": "Crispy Winged Pork Gyoza",
     "zh": "带翅煎饺",
     "ja": "羽付き肉餃子",
     "vi": "Há Cảo Nhật Chiên Giòn"
    },
    "price": 89000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "돼지고기 김치볶음",
     "en": "Stir-fried Pork & Kimchi",
     "zh": "猪肉炒泡菜",
     "ja": "豚バラキムチ炒め",
     "vi": "Thịt Heo Xào Kim Chi"
    },
    "price": 79000
   },
   {
    "name": {
     "ko": "돼지고기 생강구이 (쇼가야키)",
     "en": "Pork & Ginger Stir-fry (Shogayaki)",
     "zh": "姜烧猪肉",
     "ja": "豚生姜焼き",
     "vi": "Thịt Heo Xào Gừng"
    },
    "price": 79000
   },
   {
    "name": {
     "ko": "큐브 스테이크",
     "en": "Diced Steak",
     "zh": "骰子牛排",
     "ja": "サイコロステーキ",
     "vi": "Thịt Bò Áp Chảo"
    },
    "price": 299000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "데리야끼 닭구이",
     "en": "Grilled Chicken with Teriyaki Sauce",
     "zh": "照烧鸡肉",
     "ja": "鶏の照り焼き",
     "vi": "Gà Nướng Sốt Teriyaki"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "숯불 삼겹살 구이",
     "en": "Charcoal Grilled Pork Belly",
     "zh": "炭火烤五花肉",
     "ja": "豚バラ炭火焼き",
     "vi": "Ba Chỉ Heo Nướng Than"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "철판 부추 달걀볶음",
     "en": "Pan Fried Omelette with Chives",
     "zh": "铁板韭菜煎蛋",
     "ja": "鉄板ニラ玉",
     "vi": "Trứng Chiên Hẹ"
    },
    "price": 79000
   },
   {
    "name": {
     "ko": "주전자 바지락 버터찜",
     "en": "Steamed Clams with Butter",
     "zh": "黄油蒸蛤蜊(铁壶)",
     "ja": "やかんで浅利バター",
     "vi": "Nghêu Hấp Bơ"
    },
    "price": 89000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "문어 타코야키 (4알)",
     "en": "Takoyaki Octopus (4 Pieces)",
     "zh": "章鱼烧(4个)",
     "ja": "たこ焼き",
     "vi": "Takoyaki Bạch Tuộc (4 Viên)"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "트러플 마요 감자튀김",
     "en": "French Fries with Truffle Mayonnaise",
     "zh": "松露蛋黄酱薯条",
     "ja": "ポテトフライトリュフマヨネーズ添え",
     "vi": "Khoai Tây Chiên Phủ Xốt Nấm Truffle"
    },
    "price": 79000
   },
   {
    "name": {
     "ko": "타코와사비",
     "en": "Wasabi Octopus",
     "zh": "芥末章鱼",
     "ja": "たこワサビ",
     "vi": "Bạch Tuộc Wasabi"
    },
    "price": 79000
   },
   {
    "name": {
     "ko": "감자튀김",
     "en": "French Fries",
     "zh": "薯条",
     "ja": "ポテトフライ",
     "vi": "Khoai Tây Chiên"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "일본식 가지 튀김 조림",
     "en": "Japanese Fried Eggplant in Dashi",
     "zh": "日式炸茄子",
     "ja": "茄子の揚げびたし",
     "vi": "Cà Tím Chiên Kiểu Nhật"
    },
    "price": 49000
   },
   {
    "name": {
     "ko": "다시 국물 튀김두부",
     "en": "Japanese Fried Tofu (Agedashi)",
     "zh": "炸豆腐(高汤)",
     "ja": "揚げ出し豆腐",
     "vi": "Đậu Hũ Chiên Dashi"
    },
    "price": 49000
   },
   {
    "name": {
     "ko": "폰즈 닭내장 무침",
     "en": "Chicken Intestine with Ponzu Sauce",
     "zh": "柚子醋拌鸡肠",
     "ja": "鶏ポン酢",
     "vi": "Lòng Gà Sốt Ponzu"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "장어 계란말이 (하프)",
     "en": "Eel Egg Roll (Half)",
     "zh": "鳗鱼蛋卷(半份)",
     "ja": "うまきハーフ",
     "vi": "Trứng Cuộn Lươn Nửa Phần"
    },
    "price": 65000
   },
   {
    "name": {
     "ko": "장어 계란말이",
     "en": "Eel Egg Roll",
     "zh": "鳗鱼蛋卷",
     "ja": "うまき",
     "vi": "Trứng Cuộn Lươn"
    },
    "price": 120000
   },
   {
    "name": {
     "ko": "두부 튀김",
     "en": "Fried Tofu",
     "zh": "炸豆腐",
     "ja": "厚揚げ豆腐",
     "vi": "Đậu Hũ Chiên"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "연어알 계란찜",
     "en": "Steamed Egg with Salmon Roe",
     "zh": "三文鱼籽蒸蛋",
     "ja": "いくら茶碗蒸し",
     "vi": "Trứng Hấp Ikura"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "장어 계란찜",
     "en": "Steamed Egg with Grilled Eel",
     "zh": "鳗鱼蒸蛋",
     "ja": "鰻の茶碗蒸し",
     "vi": "Trứng Hấp Lươn"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "명란 마요 반숙 계란",
     "en": "Mentai Mayonnaise Soft-Boiled Eggs",
     "zh": "明太子蛋黄酱溏心蛋",
     "ja": "めんたま",
     "vi": "Trứng Lòng Đào Mentai Mayonnaise"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "일본식 차슈",
     "en": "Japanese Char Siu Meat",
     "zh": "日式叉烧",
     "ja": "おつまみチャーシュー",
     "vi": "Thịt Xá Xíu Kiểu Nhật"
    },
    "price": 79000
   },
   {
    "name": {
     "ko": "미소된장국",
     "en": "Miso Soup",
     "zh": "味噌汤",
     "ja": "味噌汁",
     "vi": "Súp Miso"
    },
    "price": 20000
   },
   {
    "name": {
     "ko": "공깃밥",
     "en": "Rice",
     "zh": "米饭",
     "ja": "ご飯",
     "vi": "Cơm"
    },
    "sizes": [
     [
      "Regular",
      20000
     ],
     [
      "Large",
      40000
     ]
    ]
   },
   {
    "name": {
     "ko": "김치",
     "en": "Kimchi",
     "zh": "泡菜",
     "ja": "キムチ",
     "vi": "Kim Chi"
    },
    "price": 20000
   }
  ]
 },
 {
  "id": "side",
  "name": {
   "ko": "세트 · 곁들임",
   "en": "Sets & Sides",
   "zh": "套餐 · 小菜",
   "ja": "セット・サイド",
   "vi": "Set · Món ăn kèm"
  },
  "items": [
   {
    "name": {
     "ko": "세트 A (미소된장국 + 온천달걀 또는 김치)",
     "en": "Set A (Miso soup + soft-boiled egg or kimchi)",
     "zh": "套餐A(味噌汤+温泉蛋或泡菜)",
     "ja": "セットA(味噌汁+温玉またはキムチ)",
     "vi": "Set A (Súp miso + trứng lòng đào hoặc kim chi)"
    },
    "price": 35000
   },
   {
    "name": {
     "ko": "세트 B (우동 + 온천달걀 또는 김치)",
     "en": "Set B (Udon + soft-boiled egg or kimchi)",
     "zh": "套餐B(乌冬面+温泉蛋或泡菜)",
     "ja": "セットB(うどん+温玉またはキムチ)",
     "vi": "Set B (Mì udon + trứng lòng đào hoặc kim chi)"
    },
    "price": 65000
   },
   {
    "name": {
     "ko": "세트 C (미소된장국 + 계란찜 또는 달걀말이)",
     "en": "Set C (Miso soup + steamed egg or rolled omelette)",
     "zh": "套餐C(味噌汤+蒸蛋或玉子烧)",
     "ja": "セットC(味噌汁+茶碗蒸しまたはだし巻き)",
     "vi": "Set C (Súp miso + trứng hấp hoặc trứng cuộn)"
    },
    "price": 80000
   },
   {
    "name": {
     "ko": "다시 맑은국",
     "en": "Dashi soup",
     "zh": "清汤",
     "ja": "吸い物",
     "vi": "Súp Dashi"
    },
    "price": 20000
   },
   {
    "name": {
     "ko": "미니 샐러드",
     "en": "Mini salad",
     "zh": "迷你沙拉",
     "ja": "ミニサラダ",
     "vi": "Salad mini"
    },
    "price": 20000
   },
   {
    "name": {
     "ko": "미니 감자 샐러드",
     "en": "Mini potato salad",
     "zh": "迷你土豆沙拉",
     "ja": "ミニポテトサラダ",
     "vi": "Salad khoai tây mini"
    },
    "price": 20000
   },
   {
    "name": {
     "ko": "온천달걀",
     "en": "Soft-boiled egg",
     "zh": "温泉蛋",
     "ja": "温玉",
     "vi": "Trứng lòng đào"
    },
    "price": 20000
   },
   {
    "name": {
     "ko": "오크라",
     "en": "Okra",
     "zh": "秋葵",
     "ja": "オクラ",
     "vi": "Đậu bắp"
    },
    "price": 20000
   }
  ]
 },
 {
  "id": "grill",
  "name": {
   "ko": "숯불·해산물구이",
   "en": "Charcoal & Seafood Grill",
   "zh": "炭火·海鲜烧烤",
   "ja": "炭火・海鮮焼き",
   "vi": "Nướng Than & Hải Sản"
  },
  "items": [
   {
    "name": {
     "ko": "임연수어 숯불구이",
     "en": "Charcoal Grilled Shima Hokke Fish",
     "zh": "炭烤花鲫鱼",
     "ja": "しまほっけ炭火焼",
     "vi": "Cá Shima Hokke Nướng Than"
    },
    "price": 179000
   },
   {
    "name": {
     "ko": "연어 뱃살 숯불구이",
     "en": "Charcoal Grilled Salmon Belly",
     "zh": "炭烤三文鱼腩",
     "ja": "サーモンハラス炭火焼",
     "vi": "Lườn Cá Hồi Nướng Than"
    },
    "price": 149000
   },
   {
    "name": {
     "ko": "일본산 치즈 굴 숯불구이",
     "en": "Char-grilled Japanese Oyster with Cheese",
     "zh": "日本产芝士炭烤生蚝",
     "ja": "日本産 牡蠣 炭火焼（チーズ）",
     "vi": "Hàu Nhật Nướng Than Sốt Phô Mai"
    },
    "sizes": [
     [
      "1pc",
      139000
     ],
     [
      "3pc",
      339000
     ]
    ]
   },
   {
    "name": {
     "ko": "고등어 숯불구이",
     "en": "Charcoal Grilled Saba Fish",
     "zh": "炭烤青花鱼",
     "ja": "鯖の炭火焼",
     "vi": "Cá Saba Nướng Than"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "연어알 올린 연어 숯불구이",
     "en": "Charcoal Grilled Salmon with Salmon Roe",
     "zh": "炭烤三文鱼配三文鱼籽",
     "ja": "サーモンタレ焼きいくらがけ",
     "vi": "Cá Hồi Nướng Phủ Trứng Cá Hồi"
    },
    "price": 189000
   },
   {
    "name": {
     "ko": "오징어 숯불구이",
     "en": "Charcoal Grilled Squid",
     "zh": "炭烤鱿鱼",
     "ja": "いか炭火焼",
     "vi": "Mực Nướng Than"
    },
    "price": 179000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "홋카이도산 가리비 치즈 토치구이",
     "en": "Hokkaido Scallops with Grilled Cheese",
     "zh": "北海道扇贝火炙芝士烧",
     "ja": "北海道産 帆立の炙りチーズ焼",
     "vi": "Sò Điệp Sốt Phô Mai Khè"
    },
    "price": 189000
   },
   {
    "name": {
     "ko": "연어 게 내장 구이",
     "en": "Grilled Salmon with Crab Miso",
     "zh": "蟹黄味噌烤三文鱼",
     "ja": "サーモンと蟹みそ焼き",
     "vi": "Miso Cua & Cá Hồi Nướng"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "새우 게 내장 구이",
     "en": "Grilled Shrimp with Crab Miso",
     "zh": "蟹黄味噌烤虾",
     "ja": "エビと蟹みそ焼き",
     "vi": "Miso Cua & Tôm Nướng"
    },
    "price": 119000
   },
   {
    "name": {
     "ko": "관자 게 내장 구이",
     "en": "Grilled Scallop with Crab Miso",
     "zh": "蟹黄味噌烤扇贝",
     "ja": "ホタテと蟹みそ焼き",
     "vi": "Miso Cua & Sò Điệp Nướng"
    },
    "price": 119000
   }
  ]
 },
 {
  "id": "nabe",
  "name": {
   "ko": "전골",
   "en": "Hotpot",
   "zh": "火锅",
   "ja": "鍋",
   "vi": "Lẩu"
  },
  "items": [
   {
    "name": {
     "ko": "돼지고기 샤브샤브 전골",
     "en": "Pork Shabu Shabu Hotpot",
     "zh": "猪肉涮涮锅",
     "ja": "豚のしゃぶしゃぶ",
     "vi": "Lẩu Shabu Thịt Heo"
    },
    "price": 229000
   },
   {
    "name": {
     "ko": "김치 전골",
     "en": "Japanese Kimchi Hotpot",
     "zh": "泡菜火锅",
     "ja": "キムチ鍋",
     "vi": "Lẩu Kim Chi"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "콜라겐 닭고기 채소 전골",
     "en": "Japanese Chicken Hotpot",
     "zh": "胶原蛋白鸡肉蔬菜锅",
     "ja": "コラーゲンたっぷり美肌鍋 (鶏の水炊き)",
     "vi": "Lẩu Gà Rau Củ"
    },
    "price": 199000
   },
   {
    "name": {
     "ko": "소고기 & 돼지고기 샤부샤부 전골",
     "en": "Pork & Beef Shabu Shabu Hotpot",
     "zh": "牛肉猪肉涮涮锅",
     "ja": "牛と豚のしゃぶしゃぶ",
     "vi": "Lẩu Shabu Thịt Heo & Bò"
    },
    "price": 259000
   }
  ]
 },
 {
  "id": "highball",
  "name": {
   "ko": "하이볼·사워",
   "en": "Highball & Sour",
   "zh": "高球·酸酒",
   "ja": "ハイボール・サワー",
   "vi": "Highball & Sour"
  },
  "items": [
   {
    "name": {
     "ko": "하이볼",
     "en": "Highball",
     "zh": "高球威士忌",
     "ja": "ハイボール",
     "vi": "Rượu Highball"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "가쿠 하이볼",
     "en": "Kaku Highball",
     "zh": "角瓶高球",
     "ja": "角ハイボール",
     "vi": "Rượu Kaku Highball"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "말차 하이볼",
     "en": "Matcha Highball",
     "zh": "抹茶高球",
     "ja": "抹茶ハイ",
     "vi": "Rượu Matcha High"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "코크 하이볼",
     "en": "Coke Highball",
     "zh": "可乐高球",
     "ja": "コークハイ",
     "vi": "Rượu Coke High"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "우롱 하이",
     "en": "Oolong High",
     "zh": "乌龙高球",
     "ja": "ウーロンハイ",
     "vi": "Oolong High (Rượu Trà Ô Long)"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "레몬 사워",
     "en": "Lemon Shochu Sour",
     "zh": "柠檬酸酒",
     "ja": "レモンサワー",
     "vi": "Rượu Shochu Vị Chanh"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "복숭아 사워",
     "en": "Peach Shochu Sour",
     "zh": "水蜜桃酸酒",
     "ja": "ピーチサワー",
     "vi": "Rượu Shochu Vị Đào"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "유자 사워",
     "en": "Yuzu Shochu Sour",
     "zh": "柚子酸酒",
     "ja": "ゆずサワー",
     "vi": "Rượu Shochu Vị Tắc"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "매실 사워",
     "en": "Plum Shochu Sour",
     "zh": "青梅酸酒",
     "ja": "梅サワー",
     "vi": "Rượu Shochu Vị Mơ"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "과육 망고 파인애플 사워",
     "en": "Mango Pineapple Shochu Sour (with Fruit)",
     "zh": "果肉芒果菠萝酸酒",
     "ja": "果肉入りマンゴーパインサワー",
     "vi": "Rượu Shochu Vị Xoài Dứa"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "망고 사워",
     "en": "Mango Shochu Sour",
     "zh": "芒果酸酒",
     "ja": "マンゴーサワー",
     "vi": "Rượu Shochu Vị Xoài"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "과육 딸기 사워",
     "en": "Strawberry Shochu Sour (with Fruit)",
     "zh": "果肉草莓酸酒",
     "ja": "果肉入りストロベリーサワー",
     "vi": "Rượu Shochu Vị Dâu"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "과육 망고 사워",
     "en": "Mango Shochu Sour (with Fruit)",
     "zh": "果肉芒果酸酒",
     "ja": "果肉入りマンゴーサワー",
     "vi": "Rượu Shochu Trái Cây Xoài"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "모히토 사워",
     "en": "Mojito Sour",
     "zh": "莫吉托酸酒",
     "ja": "モヒートサワー",
     "vi": "Rượu Mojito"
    },
    "price": 89000
   }
  ]
 },
 {
  "id": "sake",
  "name": {
   "ko": "사케·소주",
   "en": "Sake & Shochu",
   "zh": "清酒·烧酎",
   "ja": "日本酒・焼酎",
   "vi": "Sake & Shochu"
  },
  "items": [
   {
    "name": {
     "ko": "닷사이 사케",
     "en": "Dassai Sake",
     "zh": "獭祭清酒",
     "ja": "獺祭",
     "vi": "Sake Dassai"
    },
    "sizes": [
     [
      "180ml",
      650000
     ],
     [
      "720ml",
      2200000
     ]
    ]
   },
   {
    "name": {
     "ko": "하쿠츠루 나마 사케",
     "en": "Hakutsuru Nama Sake",
     "zh": "白鹤生清酒",
     "ja": "白鶴生",
     "vi": "Sake Hakutsuru Nama"
    },
    "sizes": [
     [
      "300ml",
      350000
     ]
    ]
   },
   {
    "name": {
     "ko": "우라카스미 사케",
     "en": "Urakasumi Sake",
     "zh": "浦霞清酒",
     "ja": "浦霞",
     "vi": "Sake Urakasumi"
    },
    "sizes": [
     [
      "180ml",
      800000
     ],
     [
      "720ml",
      2800000
     ]
    ]
   },
   {
    "name": {
     "ko": "마스미 사케",
     "en": "Masumi Sake",
     "zh": "真澄清酒",
     "ja": "真澄",
     "vi": "Sake Masumi"
    },
    "sizes": [
     [
      "180ml",
      400000
     ],
     [
      "720ml",
      1400000
     ]
    ]
   },
   {
    "name": {
     "ko": "쿠보타 센주 사케",
     "en": "Kubota Senju Sake",
     "zh": "久保田千寿清酒",
     "ja": "久保田千寿",
     "vi": "Sake Kubota Senju"
    },
    "sizes": [
     [
      "180ml",
      300000
     ],
     [
      "720ml",
      1200000
     ]
    ]
   },
   {
    "name": {
     "ko": "자쿠 호노토모 사케",
     "en": "Zaku Honotomo Sake",
     "zh": "作 穗乃智清酒",
     "ja": "作 穂乃智",
     "vi": "Sake Zaku Honotomo"
    },
    "sizes": [
     [
      "180ml",
      400000
     ],
     [
      "720ml",
      1400000
     ]
    ]
   },
   {
    "name": {
     "ko": "카이 오토코야마 사케",
     "en": "Kai Otokoyama Sake",
     "zh": "甲斐男山清酒",
     "ja": "甲斐男山",
     "vi": "Sake Kai Otokoyama"
    },
    "sizes": [
     [
      "180ml",
      400000
     ],
     [
      "720ml",
      1400000
     ]
    ]
   },
   {
    "name": {
     "ko": "시치혼야리 사케",
     "en": "Shichihonyari Sake",
     "zh": "七本枪清酒",
     "ja": "七本鎗",
     "vi": "Sake Shichihonyari"
    },
    "sizes": [
     [
      "180ml",
      400000
     ],
     [
      "720ml",
      1400000
     ]
    ]
   },
   {
    "name": {
     "ko": "핫카이산 사케",
     "en": "Hakkaisan Sake",
     "zh": "八海山清酒",
     "ja": "八海山",
     "vi": "Sake Hakkaisan"
    },
    "sizes": [
     [
      "180ml",
      400000
     ],
     [
      "720ml",
      1400000
     ]
    ]
   },
   {
    "name": {
     "ko": "고카이 사케",
     "en": "Gokai Sake",
     "zh": "豪快清酒",
     "ja": "豪快",
     "vi": "Sake Gokai"
    },
    "sizes": [
     [
      "180ml",
      139000
     ],
     [
      "1800ml",
      1200000
     ]
    ]
   },
   {
    "name": {
     "ko": "소맥 6잔 (참이슬·맥주)",
     "en": "Somaek (Soju & Beer) 6 Glasses",
     "zh": "烧啤6杯(真露烧酒+啤酒)",
     "ja": "ソメク6杯 (チャミスル・ビール)",
     "vi": "Soju Mix Bia (6 Ly)"
    },
    "price": 450000
   },
   {
    "name": {
     "ko": "진로 참이슬 오리지널",
     "en": "Jinro Chamisul Original Soju",
     "zh": "真露竹炭烧酒 原味",
     "ja": "ジンロ チャミスル",
     "vi": "Soju Jinro Chamisul Original"
    },
    "price": 159000
   },
   {
    "name": {
     "ko": "햐쿠넨노 코도쿠 (보리 소주)",
     "en": "Hyakunen No Kodoku Mugi Shochu",
     "zh": "百年孤独(大麦烧酎)",
     "ja": "百年の孤独（麦）",
     "vi": "Shochu Hyakunen No Kodoku (Lúa Mạch)"
    },
    "sizes": [
     [
      "Glass",
      400000
     ],
     [
      "Bottle",
      4400000
     ]
    ]
   },
   {
    "name": {
     "ko": "니카이도 (보리 소주)",
     "en": "Nikaido Mugi Shochu",
     "zh": "二阶堂(大麦烧酎)",
     "ja": "二階堂（麦）",
     "vi": "Shochu Nikaido (Lúa Mạch)"
    },
    "sizes": [
     [
      "Glass",
      90000
     ],
     [
      "Bottle",
      990000
     ]
    ]
   },
   {
    "name": {
     "ko": "나카나카 (보리 소주)",
     "en": "Nakanaka Mugi Shochu",
     "zh": "中々(大麦烧酎)",
     "ja": "中々（麦）",
     "vi": "Shochu Nakanaka (Lúa Mạch)"
    },
    "sizes": [
     [
      "Glass",
      139000
     ],
     [
      "Bottle",
      1700000
     ]
    ]
   },
   {
    "name": {
     "ko": "야마네코 (고구마 소주)",
     "en": "Yamaneko Imo Shochu",
     "zh": "山猫(红薯烧酎)",
     "ja": "山ねこ（芋）",
     "vi": "Shochu Yamaneko (Khoai Lang)"
    },
    "sizes": [
     [
      "Glass",
      150000
     ],
     [
      "Bottle",
      1650000
     ]
    ]
   },
   {
    "name": {
     "ko": "야마자루 (보리 소주)",
     "en": "Yamasaru Mugi Shochu",
     "zh": "山猿(大麦烧酎)",
     "ja": "山猿（麦）",
     "vi": "Shochu Yamasaru (Lúa Mạch)"
    },
    "sizes": [
     [
      "Glass",
      150000
     ],
     [
      "Bottle",
      1650000
     ]
    ]
   },
   {
    "name": {
     "ko": "카네하치 (보리 소주)",
     "en": "Kanehachi Mugi Shochu",
     "zh": "兼八(大麦烧酎)",
     "ja": "兼八（麦）",
     "vi": "Shochu Kanehachi (Lúa Mạch)"
    },
    "sizes": [
     [
      "Glass",
      180000
     ],
     [
      "Bottle",
      1980000
     ]
    ]
   },
   {
    "name": {
     "ko": "마카이헤노 이자나이 (군고구마 소주)",
     "en": "Makaieno Izanai Yakiimo Shochu",
     "zh": "魔界之邀(烤红薯烧酎)",
     "ja": "魔界への誘い（焼芋）",
     "vi": "Shochu Makaieno Izanai (Khoai Lang Nướng)"
    },
    "sizes": [
     [
      "Glass",
      120000
     ],
     [
      "Bottle",
      1320000
     ]
    ]
   },
   {
    "name": {
     "ko": "긴레이 시로 (쌀 소주)",
     "en": "Ginrei Shiro Shochu",
     "zh": "吟丽白(大米烧酎)",
     "ja": "吟麗しろ（米）",
     "vi": "Shochu Ginrei Shiro (Gạo)"
    },
    "sizes": [
     [
      "Glass",
      120000
     ],
     [
      "Bottle",
      1320000
     ]
    ]
   },
   {
    "name": {
     "ko": "쿠로 키리시마 (고구마 소주)",
     "en": "Kuro Kirishima Imo Shochu",
     "zh": "黑雾岛(红薯烧酎)",
     "ja": "黒霧島（芋）",
     "vi": "Shochu Kuro Kirishima (Khoai Lang)"
    },
    "sizes": [
     [
      "Glass",
      99000
     ],
     [
      "Bottle",
      1000000
     ]
    ]
   },
   {
    "name": {
     "ko": "이이치코 (보리 소주)",
     "en": "Iichiko Mugi Shochu",
     "zh": "いいちこ(大麦烧酎)",
     "ja": "いいちこ（麦）",
     "vi": "Shochu Iichiko (Lúa Mạch)"
    },
    "sizes": [
     [
      "Glass",
      99000
     ],
     [
      "Bottle",
      1000000
     ]
    ]
   }
  ]
 },
 {
  "id": "soft",
  "name": {
   "ko": "말차·음료·디저트",
   "en": "Matcha, Drinks & Dessert",
   "zh": "抹茶·饮品·甜点",
   "ja": "抹茶・ドリンク・デザート",
   "vi": "Matcha, Đồ Uống & Tráng Miệng"
  },
  "items": [
   {
    "name": {
     "ko": "매실 말차",
     "en": "Plum Matcha",
     "zh": "青梅抹茶",
     "ja": "梅抹茶",
     "vi": "Matcha Mơ"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "망고 말차",
     "en": "Mango Matcha",
     "zh": "芒果抹茶",
     "ja": "マンゴー抹茶",
     "vi": "Matcha Xoài"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "딸기 말차",
     "en": "Strawberry Matcha",
     "zh": "草莓抹茶",
     "ja": "いちご抹茶",
     "vi": "Matcha Dâu"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "패션프루트 말차",
     "en": "Passion Fruit Matcha",
     "zh": "百香果抹茶",
     "ja": "パッションフルーツ抹茶",
     "vi": "Matcha Chanh Dây"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "복숭아 말차",
     "en": "Peach Matcha",
     "zh": "水蜜桃抹茶",
     "ja": "ピーチ抹茶",
     "vi": "Matcha Đào"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "유자 말차",
     "en": "Yuzu Matcha",
     "zh": "柚子抹茶",
     "ja": "柚子抹茶",
     "vi": "Matcha Tắc"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "딸기 소다",
     "en": "Strawberry Soda",
     "zh": "草莓苏打",
     "ja": "いちごソーダ",
     "vi": "Soda Dâu"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "유자 소다",
     "en": "Yuzu Soda",
     "zh": "柚子苏打",
     "ja": "柚子ソーダ",
     "vi": "Soda Tắc"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "매실 소다",
     "en": "Ume Soda",
     "zh": "青梅苏打",
     "ja": "梅ソーダ",
     "vi": "Soda Mơ"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "망고 소다",
     "en": "Mango Soda",
     "zh": "芒果苏打",
     "ja": "マンゴーソーダ",
     "vi": "Soda Xoài"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "패션프루트 소다",
     "en": "Passion Fruit Soda",
     "zh": "百香果苏打",
     "ja": "パッションフルーツソーダ",
     "vi": "Soda Chanh Dây"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "복숭아 소다",
     "en": "Peach Soda",
     "zh": "水蜜桃苏打",
     "ja": "ピーチソーダ",
     "vi": "Soda Đào"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "통 파인애플 아이스크림",
     "en": "Whole Pineapple Ice Cream",
     "zh": "整颗菠萝冰淇淋",
     "ja": "まるごとパイナップルアイス",
     "vi": "Kem Trái Dứa"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "말차 라떼",
     "en": "Matcha Latte",
     "zh": "抹茶拿铁",
     "ja": "抹茶ラテ",
     "vi": "Trà Xanh Latte"
    },
    "price": 59000
   },
   {
    "name": {
     "ko": "말차 아이스크림 & 라떼",
     "en": "Matcha Ice Cream & Latte",
     "zh": "抹茶冰淇淋拿铁",
     "ja": "抹茶クリーム",
     "vi": "Kem Matcha & Latte"
    },
    "price": 69000
   },
   {
    "name": {
     "ko": "말차 아이스크림",
     "en": "Matcha Ice Cream",
     "zh": "抹茶冰淇淋",
     "ja": "抹茶アイス",
     "vi": "Kem Trà Xanh"
    },
    "price": 29000
   },
   {
    "name": {
     "ko": "말차 모찌 아이스크림",
     "en": "Matcha Mochi Ice Cream",
     "zh": "抹茶麻糬冰淇淋",
     "ja": "抹茶餅アイス",
     "vi": "Kem Mochi Trà Xanh"
    },
    "price": 20000
   },
   {
    "name": {
     "ko": "와라비모찌 & 바닐라 아이스크림",
     "en": "Warabimochi & Vanilla Ice Cream",
     "zh": "蕨饼配香草冰淇淋",
     "ja": "バニラアイスとわらび餅",
     "vi": "Warabimochi & Kem Vani"
    },
    "price": 39000
   },
   {
    "name": {
     "ko": "와라비모찌 & 말차 아이스크림",
     "en": "Warabimochi & Matcha Ice Cream",
     "zh": "蕨饼配抹茶冰淇淋",
     "ja": "抹茶アイスとわらび餅",
     "vi": "Warabimochi & Kem Trà Xanh"
    },
    "price": 39000
   },
   {
    "name": {
     "ko": "바닐라 아이스크림",
     "en": "Vanilla Ice Cream",
     "zh": "香草冰淇淋",
     "ja": "バニラアイス",
     "vi": "Kem Vani"
    },
    "price": 29000
   },
   {
    "name": {
     "ko": "유자 아이스크림",
     "en": "Yuzu Ice Cream",
     "zh": "柚子冰淇淋",
     "ja": "ゆずアイス",
     "vi": "Kem Vị Yuzu Nhật"
    },
    "price": 29000
   },
   {
    "name": {
     "ko": "코카콜라",
     "en": "Coca Cola",
     "zh": "可口可乐",
     "ja": "コーラ",
     "vi": "Coca Cola"
    },
    "price": 29000
   },
   {
    "name": {
     "ko": "오렌지 주스",
     "en": "Orange Juice",
     "zh": "橙汁",
     "ja": "オレンジジュース",
     "vi": "Nước Cam"
    },
    "price": 29000
   },
   {
    "name": {
     "ko": "녹차",
     "en": "Green Tea",
     "zh": "绿茶",
     "ja": "緑茶",
     "vi": "Trà Xanh"
    },
    "price": 19000
   },
   {
    "name": {
     "ko": "우롱차",
     "en": "Oolong Tea",
     "zh": "乌龙茶",
     "ja": "ウーロン茶",
     "vi": "Trà Ô Long"
    },
    "price": 19000
   },
   {
    "name": {
     "ko": "생수",
     "en": "Mineral Water",
     "zh": "矿泉水",
     "ja": "ミネラルウォーター",
     "vi": "Nước Suối"
    },
    "price": 19000
   }
  ]
 }
];
