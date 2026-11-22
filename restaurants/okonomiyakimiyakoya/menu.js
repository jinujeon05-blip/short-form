// 미야코야 메뉴 — 출처: 구글 지도 메뉴판 사진(종이 메뉴판 여러 버전, 2026-11-22 수집). 같은 메뉴 가격이 다르면 높은 쪽(docs/todo.md). 주류는 일부만 수록
window.RESTAURANT = {
  "brand": {
    "ko": "미야코야",
    "en": "Okonomiyaki Miyakoya · お好み本舗みやこ屋"
  },
  "phone": "02432016651",
  "address": "25 Linh Lang, Ngọc Hà, Hà Nội",
  "wifi": null,
  "hours": {
    "ko": "평일 17:00 – 22:00 · 토·일 11:30 – 23:00",
    "en": "Weekdays 17:00 – 22:00 · Sat–Sun 11:30 – 23:00",
    "zh": "平日 17:00 – 22:00 · 周六、日 11:30 – 23:00",
    "ja": "平日 17:00 – 22:00 ・ 土日 11:30 – 23:00",
    "vi": "Ngày thường 17:00 – 22:00 · Thứ 7, CN 11:30 – 23:00"
  }
};

window.MENU = [
  {
    "id": "teppan",
    "name": {
      "ko": "철판구이·스테이크",
      "en": "Teppan Grill & Steak",
      "zh": "铁板烧·牛排",
      "ja": "鉄板焼き・ステーキ",
      "vi": "Món nướng teppan · Bít tết"
    },
    "items": [
      {
        "name": {
          "ko": "일본산 소고기 등심(서로인)",
          "en": "Japanese Beef Sirloin",
          "zh": "日本产牛沙朗(西冷)",
          "ja": "日本産 牛サーロイン",
          "vi": "Thăn ngoại bò Nhật (Sirloin)"
        },
        "price": 600000,
        "tag": "best",
        "photo": "img/sirloin.jpg"
      },
      {
        "name": {
          "ko": "에어즈록 스테이크 800g",
          "en": "Ayers Rock Steak (800g)",
          "zh": "艾尔斯岩牛排 800g",
          "ja": "エアーズロックステーキ 800g",
          "vi": "Bít tết Ayers Rock 800g"
        },
        "price": 680000,
        "tag": "special",
        "photo": "img/ayers-rock.jpg"
      },
      {
        "name": {
          "ko": "하프 에어즈록 스테이크 400g",
          "en": "Half Ayers Rock Steak (400g)",
          "zh": "半份艾尔斯岩牛排 400g",
          "ja": "ハーフエアーズロックステーキ 400g",
          "vi": "Bít tết Ayers Rock cỡ nhỏ 400g"
        },
        "price": 380000
      },
      {
        "name": {
          "ko": "고기 축제 (고기 모둠)",
          "en": "Niku Matsuri (assorted meat)",
          "zh": "肉祭(肉类拼盘)",
          "ja": "肉祭り",
          "vi": "Niku Matsuri (Đĩa thịt tổng hợp)"
        },
        "price": 485000
      },
      {
        "name": {
          "ko": "바다 축제 (해산물 모둠)",
          "en": "Umi Matsuri (assorted seafood)",
          "zh": "海祭(海鲜拼盘)",
          "ja": "海祭り",
          "vi": "Umi Matsuri (Đĩa hải sản tổng hợp)"
        },
        "price": 590000,
        "tag": "special",
        "photo": "img/umi-matsuri.jpg"
      },
      {
        "name": {
          "ko": "새우 버터구이",
          "en": "Butter-grilled Shrimp",
          "zh": "黄油烤虾",
          "ja": "えびバター",
          "vi": "Tôm nướng bơ"
        },
        "price": 261000,
        "photo": "img/shrimp-butter.jpg"
      },
      {
        "name": {
          "ko": "굴 버터구이",
          "en": "Butter-grilled Oysters",
          "zh": "黄油烤生蚝",
          "ja": "カキバター",
          "vi": "Hàu nướng bơ"
        },
        "price": 186000,
        "photo": "img/oyster.jpg"
      },
      {
        "name": {
          "ko": "통오징어 구이",
          "en": "Whole Grilled Squid",
          "zh": "铁板烤整只鱿鱼",
          "ja": "イカ姿焼き",
          "vi": "Mực nướng nguyên con"
        },
        "price": 159000,
        "photo": "img/squid.jpg"
      },
      {
        "name": {
          "ko": "해산물 아히요",
          "en": "Seafood Ahijo",
          "zh": "西班牙蒜香橄榄油海鲜(Ajillo)",
          "ja": "海鮮アヒージョ",
          "vi": "Hải sản Ajillo (hầm dầu olive tỏi)"
        },
        "price": 110000,
        "photo": "img/ahijo.jpg"
      },
      {
        "name": {
          "ko": "새우 브로콜리 갈릭버터 볶음",
          "en": "Shrimp & Broccoli in Garlic Butter",
          "zh": "蒜香黄油炒虾仁西兰花",
          "ja": "エビとブロッコリーのガーリックバター炒め",
          "vi": "Tôm xào bông cải xanh bơ tỏi"
        },
        "price": 145000
      },
      {
        "name": {
          "ko": "오징어 다리 파소금구이",
          "en": "Grilled Squid Legs with Green Onion Salt",
          "zh": "葱盐烤鱿鱼须",
          "ja": "イカゲソねぎ塩焼き",
          "vi": "Râu mực nướng muối hành"
        },
        "price": 80000
      },
      {
        "name": {
          "ko": "돼지고기 김치볶음",
          "en": "Stir-fried Pork Kimchi",
          "zh": "泡菜炒猪肉",
          "ja": "豚キムチ炒め",
          "vi": "Thịt heo xào kim chi"
        },
        "price": 118000
      },
      {
        "name": {
          "ko": "고기 야채볶음",
          "en": "Stir-fried Meat & Vegetables",
          "zh": "肉类炒蔬菜",
          "ja": "肉野菜炒め",
          "vi": "Thịt xào rau củ"
        },
        "price": 108000
      },
      {
        "name": {
          "ko": "해산물 야채볶음",
          "en": "Stir-fried Seafood & Vegetables",
          "zh": "海鲜炒蔬菜",
          "ja": "海鮮野菜炒め",
          "vi": "Hải sản xào rau củ"
        },
        "price": 128000
      }
    ]
  },
  {
    "id": "okonomi",
    "name": {
      "ko": "오코노미야키",
      "en": "Okonomiyaki",
      "zh": "大阪烧",
      "ja": "お好み焼き",
      "vi": "Okonomiyaki (Bánh xèo kiểu Nhật)"
    },
    "items": [
      {
        "name": {
          "ko": "미야코 타마",
          "en": "Miyako Tama",
          "zh": "Miyako Tama 大阪烧",
          "ja": "みやこ玉",
          "vi": "Miyako Tama (Bánh xèo kiểu Nhật đặc biệt)"
        },
        "price": 159000,
        "tag": "best",
        "photo": "img/miyako-tama.jpg"
      },
      {
        "name": {
          "ko": "소울 타마",
          "en": "Soul Tama",
          "zh": "Soul Tama 大阪烧",
          "ja": "ソウル玉",
          "vi": "Soul Tama (Bánh xèo Nhật kiểu Seoul)"
        },
        "price": 129000,
        "photo": "img/soul-tama.jpg"
      },
      {
        "name": {
          "ko": "마하라자 타마",
          "en": "Maharaja Tama",
          "zh": "Maharaja Tama 大阪烧",
          "ja": "マハラジャ玉",
          "vi": "Maharaja Tama (Bánh xèo Nhật vị cà ri)"
        },
        "price": 129000
      },
      {
        "name": {
          "ko": "네바 치즈 타마",
          "en": "Neba Cheese Tama",
          "zh": "Neba Cheese Tama 大阪烧",
          "ja": "ねばっちーズ玉",
          "vi": "Neba Cheese Tama (Bánh xèo Nhật phô mai kéo sợi)"
        },
        "price": 179000
      },
      {
        "name": {
          "ko": "해적 타마",
          "en": "Kaizoku Tama (Seafood)",
          "zh": "Kaizoku Tama 海鲜大阪烧",
          "ja": "海賊玉",
          "vi": "Kaizoku Tama (Bánh xèo Nhật hải sản)"
        },
        "price": 159000
      }
    ]
  },
  {
    "id": "monja",
    "name": {
      "ko": "몬자야키",
      "en": "Monjayaki",
      "zh": "文字烧",
      "ja": "もんじゃ焼き",
      "vi": "Monjayaki"
    },
    "items": [
      {
        "name": {
          "ko": "파 스지(소힘줄) 몬자",
          "en": "Negi Suji Monja",
          "zh": "葱牛筋文字烧",
          "ja": "ネギすじもんじゃ",
          "vi": "Monja hành bò gân"
        },
        "price": 185000
      },
      {
        "name": {
          "ko": "명란 떡 치즈 몬자",
          "en": "Mentai Mochi Cheese Monja",
          "zh": "明太子年糕芝士文字烧",
          "ja": "明太もちチーズもんじゃ",
          "vi": "Monja trứng cá tuyết, bánh gạo, phô mai"
        },
        "price": 265000,
        "tag": "special"
      },
      {
        "name": {
          "ko": "돼지고기 카레 콘 몬자",
          "en": "Pork Curry Corn Monja",
          "zh": "猪肉咖喱玉米文字烧",
          "ja": "豚カレーコーンもんじゃ",
          "vi": "Monja thịt heo cà ri bắp"
        },
        "price": 159000
      },
      {
        "name": {
          "ko": "버섯 버터 몬자",
          "en": "Mushroom Butter Monja",
          "zh": "蘑菇黄油文字烧",
          "ja": "きのこバターもんじゃ",
          "vi": "Monja nấm bơ"
        },
        "price": 159000
      },
      {
        "name": {
          "ko": "이탈리안 몬자",
          "en": "Italian Monja",
          "zh": "意式文字烧",
          "ja": "イタリアンもんじゃ",
          "vi": "Monja kiểu Ý"
        },
        "price": 179000
      },
      {
        "name": {
          "ko": "해적(해산물) 몬자",
          "en": "Kaizoku (Seafood) Monja",
          "zh": "海盗(海鲜)文字烧",
          "ja": "海賊もんじゃ",
          "vi": "Monja Kaizoku (hải sản)"
        },
        "price": 179000
      },
      {
        "name": {
          "ko": "해적 명란 몬자",
          "en": "Kaizoku Mentai Monja",
          "zh": "海盗明太子文字烧",
          "ja": "海賊明太もんじゃ",
          "vi": "Monja Kaizoku trứng cá tuyết"
        },
        "price": 289000
      },
      {
        "name": {
          "ko": "디럭스 몬자",
          "en": "Deluxe Monja",
          "zh": "豪华文字烧",
          "ja": "デラックスもんじゃ",
          "vi": "Monja Deluxe"
        },
        "price": 360000
      },
      {
        "name": {
          "ko": "콘(옥수수) 몬자",
          "en": "Corn Monja",
          "zh": "玉米文字烧",
          "ja": "コーンもんじゃ",
          "vi": "Monja bắp"
        },
        "price": 99000
      },
      {
        "name": {
          "ko": "치즈 몬자",
          "en": "Cheese Monja",
          "zh": "芝士文字烧",
          "ja": "チーズもんじゃ",
          "vi": "Monja phô mai"
        },
        "price": 105000
      },
      {
        "name": {
          "ko": "돼지고기 몬자",
          "en": "Pork Monja",
          "zh": "猪肉文字烧",
          "ja": "豚もんじゃ",
          "vi": "Monja thịt heo"
        },
        "price": 125000
      },
      {
        "name": {
          "ko": "새우 몬자",
          "en": "Shrimp Monja",
          "zh": "虾文字烧",
          "ja": "えびもんじゃ",
          "vi": "Monja tôm"
        },
        "price": 135000
      },
      {
        "name": {
          "ko": "오징어 몬자",
          "en": "Squid Monja",
          "zh": "鱿鱼文字烧",
          "ja": "イカもんじゃ",
          "vi": "Monja mực"
        },
        "price": 125000
      },
      {
        "name": {
          "ko": "명란젓 몬자",
          "en": "Mentaiko Monja",
          "zh": "明太子文字烧",
          "ja": "明太子もんじゃ",
          "vi": "Monja trứng cá tuyết muối"
        },
        "price": 189000
      },
      {
        "name": {
          "ko": "새우·돼지고기 몬자",
          "en": "Shrimp & Pork Monja",
          "zh": "虾猪肉文字烧",
          "ja": "えび・豚もんじゃ",
          "vi": "Monja tôm thịt heo"
        },
        "price": 159000
      },
      {
        "name": {
          "ko": "오징어·돼지고기 몬자",
          "en": "Squid & Pork Monja",
          "zh": "鱿鱼猪肉文字烧",
          "ja": "イカ・豚もんじゃ",
          "vi": "Monja mực thịt heo"
        },
        "price": 149000
      },
      {
        "name": {
          "ko": "명란·돼지고기 몬자",
          "en": "Mentai & Pork Monja",
          "zh": "明太子猪肉文字烧",
          "ja": "明太・豚もんじゃ",
          "vi": "Monja trứng cá tuyết thịt heo"
        },
        "price": 235000
      }
    ]
  },
  {
    "id": "noodle",
    "name": {
      "ko": "야키소바·밥",
      "en": "Yakisoba & Rice",
      "zh": "日式炒面·米饭",
      "ja": "焼きそば・ご飯",
      "vi": "Mì xào Yakisoba · Cơm"
    },
    "items": [
      {
        "name": {
          "ko": "고기 야키소바",
          "en": "Pork Yakisoba",
          "zh": "肉类日式炒面",
          "ja": "肉焼ソバ",
          "vi": "Mì xào Yakisoba thịt"
        },
        "price": 145000
      },
      {
        "name": {
          "ko": "새우 야키소바",
          "en": "Shrimp Yakisoba",
          "zh": "虾仁日式炒面",
          "ja": "えび焼ソバ",
          "vi": "Mì xào Yakisoba tôm"
        },
        "price": 169000
      },
      {
        "name": {
          "ko": "오징어 야키소바",
          "en": "Squid Yakisoba",
          "zh": "鱿鱼日式炒面",
          "ja": "イカ焼ソバ",
          "vi": "Mì xào Yakisoba mực"
        },
        "price": 145000
      },
      {
        "name": {
          "ko": "해산물 야키소바",
          "en": "Seafood Yakisoba",
          "zh": "海鲜日式炒面",
          "ja": "海鮮焼きソバ",
          "vi": "Mì xào Yakisoba hải sản"
        },
        "price": 169000
      },
      {
        "name": {
          "ko": "소금 대파 야키소바",
          "en": "Salt & Green Onion Yakisoba",
          "zh": "盐葱日式炒面",
          "ja": "塩ねぎ焼そば",
          "vi": "Mì xào Yakisoba muối hành"
        },
        "price": 159000
      },
      {
        "name": {
          "ko": "소힘줄(스지) 야키소바",
          "en": "Beef Tendon Yakisoba",
          "zh": "牛筋日式炒面",
          "ja": "牛スジ焼そば",
          "vi": "Mì xào Yakisoba gân bò"
        },
        "price": 179000
      },
      {
        "name": {
          "ko": "버섯 닭고기 소금버터 야키소바",
          "en": "Mushroom & Chicken Salt Butter Yakisoba",
          "zh": "蘑菇鸡肉盐黄油日式炒面",
          "ja": "キノコと鶏の塩バター焼そば",
          "vi": "Mì xào Yakisoba nấm gà bơ muối"
        },
        "price": 189000,
        "tag": "best",
        "photo": "img/yakisoba-mushroom.jpg"
      },
      {
        "name": {
          "ko": "와규 마늘 볶음밥",
          "en": "Wagyu Garlic Rice",
          "zh": "和牛蒜香炒饭",
          "ja": "和牛ガーリックライス",
          "vi": "Cơm chiên tỏi bò Wagyu"
        },
        "price": 180000,
        "tag": "special",
        "photo": "img/garlic-rice.jpg"
      },
      {
        "name": {
          "ko": "돼지고기 김치 볶음밥",
          "en": "Pork Kimchi Fried Rice",
          "zh": "泡菜猪肉炒饭",
          "ja": "豚キムチ焼飯",
          "vi": "Cơm chiên kim chi thịt heo"
        },
        "price": 165000
      },
      {
        "name": {
          "ko": "소바메시(야키소바 볶음밥)",
          "en": "Soba Meshi (Yakisoba Fried Rice)",
          "zh": "荞麦面炒饭(Soba Meshi)",
          "ja": "そば飯",
          "vi": "Soba Meshi (Cơm chiên mì Yakisoba)"
        },
        "price": 165000
      },
      {
        "name": {
          "ko": "구운 주먹밥 (된장국 포함)",
          "en": "Grilled Rice Ball (with Miso Soup)",
          "zh": "烤饭团(含味噌汤)",
          "ja": "焼おにぎり（味噌汁付き）",
          "vi": "Cơm nắm nướng (kèm súp miso)"
        },
        "price": 35000,
        "photo": "img/onigiri.jpg"
      },
      {
        "name": {
          "ko": "공깃밥",
          "en": "Steamed Rice",
          "zh": "白米饭",
          "ja": "ライス",
          "vi": "Cơm trắng"
        },
        "price": 20000
      }
    ]
  },
  {
    "id": "yaki",
    "name": {
      "ko": "야키니쿠·호르몬",
      "en": "Yakiniku & Hormone",
      "zh": "烤肉·烤内脏",
      "ja": "焼肉・ホルモン",
      "vi": "Yakiniku · Lòng nướng"
    },
    "items": [
      {
        "name": {
          "ko": "된장 호르몬(곱창)",
          "en": "Miso Hormone (Pork Intestine)",
          "zh": "味噌烤内脏",
          "ja": "味噌ホルモン",
          "vi": "Lòng heo nướng sốt miso (Hormone)"
        },
        "price": 79000
      },
      {
        "name": {
          "ko": "소금 호르몬(곱창)",
          "en": "Salt Hormone (Pork Intestine)",
          "zh": "盐烤内脏",
          "ja": "塩ホルモン",
          "vi": "Lòng heo nướng muối (Hormone)"
        },
        "price": 79000
      },
      {
        "name": {
          "ko": "가츠(돼지 위)",
          "en": "Gatsu (Pork Stomach)",
          "zh": "烤猪胃(Gatsu)",
          "ja": "ガツ",
          "vi": "Dạ dày heo nướng (Gatsu)"
        },
        "price": 65000
      },
      {
        "name": {
          "ko": "항정살(톤토로)",
          "en": "Tontoro (Pork Jowl)",
          "zh": "猪颈肉(Tontoro)",
          "ja": "トントロ",
          "vi": "Thịt heo má đào (Tontoro)"
        },
        "price": 135000
      },
      {
        "name": {
          "ko": "파소금 돼지 혀",
          "en": "Green Onion Salt Pork Tongue",
          "zh": "葱盐猪舌",
          "ja": "ネギ塩タン",
          "vi": "Lưỡi heo nướng muối hành"
        },
        "price": 79000
      },
      {
        "name": {
          "ko": "돼지갈비(부타카루비)",
          "en": "Pork Karubi",
          "zh": "猪五花肋排(Buta Karubi)",
          "ja": "豚カルビ",
          "vi": "Sườn heo nướng (Buta Karubi)"
        },
        "price": 108000
      },
      {
        "name": {
          "ko": "돼지갈비 페퍼",
          "en": "Pork Karubi Pepper",
          "zh": "黑胡椒猪肋排",
          "ja": "豚カルビペッパー",
          "vi": "Sườn heo nướng tiêu đen"
        },
        "price": 115000
      },
      {
        "name": {
          "ko": "호르몬 3종 모둠",
          "en": "Hormone 3-Kind Platter",
          "zh": "内脏三拼",
          "ja": "ホルモン3点盛り",
          "vi": "Đĩa lòng heo 3 loại"
        },
        "price": 125000
      },
      {
        "name": {
          "ko": "소갈비(카루비)",
          "en": "Beef Karubi",
          "zh": "牛肋排(Karubi)",
          "ja": "カルビ",
          "vi": "Sườn bò nướng (Karubi)"
        },
        "price": 178000
      },
      {
        "name": {
          "ko": "안창살(하라미)",
          "en": "Harami (Outside Skirt)",
          "zh": "牛横膈膜(Harami)",
          "ja": "ハラミ",
          "vi": "Thịt hoành bò (Harami)"
        },
        "price": 175000
      },
      {
        "name": {
          "ko": "닭다리살",
          "en": "Chicken Thigh",
          "zh": "鸡腿肉",
          "ja": "鶏もも",
          "vi": "Đùi gà nướng"
        },
        "price": 72000
      },
      {
        "name": {
          "ko": "닭모래집",
          "en": "Chicken Gizzard",
          "zh": "鸡胗",
          "ja": "砂肝",
          "vi": "Mề gà nướng"
        },
        "price": 58000
      },
      {
        "name": {
          "ko": "닭껍질",
          "en": "Chicken Skin",
          "zh": "鸡皮",
          "ja": "鶏かわ",
          "vi": "Da gà nướng"
        },
        "price": 52000
      }
    ]
  },
  {
    "id": "side",
    "name": {
      "ko": "일품요리·수프",
      "en": "Side Dishes & Soup",
      "zh": "单点小菜·汤",
      "ja": "一品料理・スープ",
      "vi": "Món ăn kèm · Súp"
    },
    "items": [
      {
        "name": {
          "ko": "스모츠(곱창 초무침)",
          "en": "Sumotsu (Vinegared Pork Intestine)",
          "zh": "醋拌内脏(Sumotsu)",
          "ja": "酢もつ",
          "vi": "Lòng heo trộn giấm (Sumotsu)"
        },
        "price": 52000
      },
      {
        "name": {
          "ko": "소힘줄 폰즈",
          "en": "Beef Tendon Ponzu",
          "zh": "柚子醋牛筋",
          "ja": "牛スジポン酢",
          "vi": "Gân bò sốt Ponzu"
        },
        "price": 81000
      },
      {
        "name": {
          "ko": "타코와사비",
          "en": "Tako Wasabi",
          "zh": "芥末章鱼",
          "ja": "たこわさび",
          "vi": "Bạch tuộc Wasabi (Tako Wasabi)"
        },
        "price": 61000
      },
      {
        "name": {
          "ko": "김치",
          "en": "Kimchi",
          "zh": "泡菜",
          "ja": "キムチ",
          "vi": "Kim chi"
        },
        "price": 43000,
        "photo": "img/kimchi.jpg"
      },
      {
        "name": {
          "ko": "히야얏코(냉두부)",
          "en": "Hiyayakko (Chilled Tofu)",
          "zh": "冷豆腐(Hiyayakko)",
          "ja": "冷やっこ",
          "vi": "Đậu hũ lạnh (Hiyayakko)"
        },
        "price": 42000
      },
      {
        "name": {
          "ko": "소금 대파 냉두부",
          "en": "Salt & Green Onion Tofu",
          "zh": "盐葱冷豆腐",
          "ja": "塩ねぎやっこ",
          "vi": "Đậu hũ lạnh muối hành"
        },
        "price": 42000
      },
      {
        "name": {
          "ko": "닭껍질 폰즈",
          "en": "Chicken Skin Ponzu",
          "zh": "柚子醋鸡皮",
          "ja": "鶏かわポン酢",
          "vi": "Da gà sốt Ponzu"
        },
        "price": 58000
      },
      {
        "name": {
          "ko": "닭모래집 난반즈케",
          "en": "Gizzard Nanbanzuke",
          "zh": "南蛮渍鸡胗",
          "ja": "砂肝の南蛮漬け",
          "vi": "Mề gà ngâm chua ngọt (Nanbanzuke)"
        },
        "price": 64000
      },
      {
        "name": {
          "ko": "에다마메(풋콩)",
          "en": "Edamame",
          "zh": "毛豆",
          "ja": "枝豆",
          "vi": "Đậu nành Nhật luộc (Edamame)"
        },
        "price": 33000
      },
      {
        "name": {
          "ko": "미소 오이",
          "en": "Miso Cucumber",
          "zh": "味噌黄瓜",
          "ja": "味噌きゅう",
          "vi": "Dưa leo chấm miso"
        },
        "price": 41000
      },
      {
        "name": {
          "ko": "나메타케 무즙",
          "en": "Nametake Oroshi",
          "zh": "滑菇萝卜泥",
          "ja": "なめ茸おろし",
          "vi": "Nấm Nameko củ cải bào"
        },
        "price": 43000
      },
      {
        "name": {
          "ko": "양파 슬라이스",
          "en": "Onion Slice",
          "zh": "洋葱丝",
          "ja": "オニオンスライス",
          "vi": "Hành tây thái lát"
        },
        "price": 43000
      },
      {
        "name": {
          "ko": "감자 샐러드",
          "en": "Potato Salad",
          "zh": "土豆沙拉",
          "ja": "ポテトサラダ",
          "vi": "Salad khoai tây"
        },
        "price": 51000
      },
      {
        "name": {
          "ko": "가츠 사시미(돼지 위 숙회)",
          "en": "Gatsu Sashi",
          "zh": "猪胃刺身(Gatsu Sashi)",
          "ja": "ガツ刺し",
          "vi": "Dạ dày heo trần (Gatsu Sashi)"
        },
        "price": 72000
      },
      {
        "name": {
          "ko": "모츠니코미(곱창 조림)",
          "en": "Motsu Nikomi (Stewed Offal)",
          "zh": "炖内脏(Motsu Nikomi)",
          "ja": "もつ煮込み",
          "vi": "Lòng heo hầm (Motsu Nikomi)"
        },
        "price": 73000
      },
      {
        "name": {
          "ko": "브로콜리 오히타시",
          "en": "Seasoned Boiled Broccoli",
          "zh": "凉拌西兰花(Ohitashi)",
          "ja": "ブロッコリーのおひたし",
          "vi": "Bông cải xanh luộc sốt Ohitashi"
        },
        "price": 78000,
        "photo": "img/broccoli.jpg"
      },
      {
        "name": {
          "ko": "파 미역 수프",
          "en": "Green Onion & Seaweed Soup",
          "zh": "葱花海带汤",
          "ja": "ネギわかめスープ",
          "vi": "Súp rong biển hành lá"
        },
        "price": 48000,
        "photo": "img/wakame-soup.jpg"
      },
      {
        "name": {
          "ko": "계란 수프",
          "en": "Egg Soup",
          "zh": "蛋花汤",
          "ja": "たまごスープ",
          "vi": "Súp trứng"
        },
        "price": 48000,
        "photo": "img/egg-soup.jpg"
      }
    ]
  },
  {
    "id": "fry",
    "name": {
      "ko": "튀김·샐러드·말기·호일구이",
      "en": "Fried Dishes, Salads, Maki & Foil-baked",
      "zh": "炸物·沙拉·蛋卷·锡纸烧",
      "ja": "揚げ物・サラダ・巻き・ホイル焼き",
      "vi": "Món chiên · Salad · Maki · Nướng giấy bạc"
    },
    "items": [
      {
        "name": {
          "ko": "튀김 춘권",
          "en": "Fried Spring Rolls",
          "zh": "炸春卷",
          "ja": "揚げ春巻き",
          "vi": "Chả giò chiên"
        },
        "price": 55000
      },
      {
        "name": {
          "ko": "감자튀김",
          "en": "French Fries",
          "zh": "炸薯条",
          "ja": "ポテトフライ",
          "vi": "Khoai tây chiên"
        },
        "price": 45000,
        "photo": "img/fries.jpg"
      },
      {
        "name": {
          "ko": "통마늘 튀김",
          "en": "Deep-fried Whole Garlic",
          "zh": "炸整蒜",
          "ja": "にんにく丸揚げ",
          "vi": "Tỏi nguyên tép chiên giòn"
        },
        "price": 69000
      },
      {
        "name": {
          "ko": "가지 튀김 조림(아게다시 나스)",
          "en": "Agedashi Eggplant",
          "zh": "炸茄子(Agedashi Nasu)",
          "ja": "揚げ出し茄子",
          "vi": "Cà tím chiên sốt dashi (Agedashi Nasu)"
        },
        "price": 89000
      },
      {
        "name": {
          "ko": "미야코 샐러드",
          "en": "Miyako Salad",
          "zh": "Miyako 沙拉",
          "ja": "みやこサラダ",
          "vi": "Salad Miyako"
        },
        "price": 68000
      },
      {
        "name": {
          "ko": "방방지(닭가슴살 참깨) 샐러드",
          "en": "Banbanji Salad",
          "zh": "棒棒鸡沙拉",
          "ja": "バンバンジーサラダ",
          "vi": "Salad gà xé sốt mè (Banbanji)"
        },
        "price": 76000
      },
      {
        "name": {
          "ko": "토마토 슬라이스",
          "en": "Tomato Slice",
          "zh": "番茄片",
          "ja": "トマトスライス",
          "vi": "Cà chua thái lát"
        },
        "price": 37000
      },
      {
        "name": {
          "ko": "믹스 말기(계란말이)",
          "en": "Mix Maki (Egg & Cheese Roll)",
          "zh": "什锦蛋卷(Mix Maki)",
          "ja": "ミックス巻き",
          "vi": "Mix Maki (Trứng cuộn phô mai)"
        },
        "price": 82000,
        "tag": "best",
        "photo": "img/maki.jpg"
      },
      {
        "name": {
          "ko": "돼지고기 말기",
          "en": "Pork Maki",
          "zh": "猪肉卷(Maki)",
          "ja": "豚巻き",
          "vi": "Chả cuộn thịt heo (Maki)"
        },
        "price": 72000
      },
      {
        "name": {
          "ko": "새우 말기",
          "en": "Shrimp Maki",
          "zh": "虾卷(Maki)",
          "ja": "えび巻き",
          "vi": "Chả cuộn tôm (Maki)"
        },
        "price": 78000
      },
      {
        "name": {
          "ko": "오징어 말기",
          "en": "Squid Maki",
          "zh": "鱿鱼卷(Maki)",
          "ja": "イカ巻き",
          "vi": "Chả cuộn mực (Maki)"
        },
        "price": 72000
      },
      {
        "name": {
          "ko": "콘버터 호일구이",
          "en": "Corn Butter (Foil-wrapped)",
          "zh": "锡纸烤玉米黄油",
          "ja": "コーンバター",
          "vi": "Bắp bơ nướng giấy bạc"
        },
        "price": 43000,
        "photo": "img/corn-butter.jpg"
      },
      {
        "name": {
          "ko": "팽이버섯 버터 호일구이",
          "en": "Enoki Butter (Foil-wrapped)",
          "zh": "锡纸烤金针菇黄油",
          "ja": "エノキバター",
          "vi": "Nấm kim châm bơ nướng giấy bạc"
        },
        "price": 63000
      },
      {
        "name": {
          "ko": "해산물 버섯 치즈 호일구이",
          "en": "Seafood Mushroom Cheese (Foil-wrapped)",
          "zh": "锡纸烤海鲜蘑菇芝士",
          "ja": "海鮮キノコチーズ",
          "vi": "Hải sản nấm phô mai nướng giấy bạc"
        },
        "price": 89000
      },
      {
        "name": {
          "ko": "바지락 술찜 호일구이",
          "en": "Sake-steamed Clams (Foil-wrapped)",
          "zh": "锡纸清酒蒸蛤蜊",
          "ja": "アサリ酒蒸し",
          "vi": "Nghêu hấp rượu sake nướng giấy bạc"
        },
        "price": 82000
      },
      {
        "name": {
          "ko": "연어 찬찬야키 호일구이",
          "en": "Salmon Chanchan-yaki (Foil-wrapped)",
          "zh": "锡纸烤三文鱼(Chanchan-yaki)",
          "ja": "鮭のチャンチャン焼き",
          "vi": "Cá hồi nướng giấy bạc kiểu Chanchan-yaki"
        },
        "price": 185000
      }
    ]
  },
  {
    "id": "set",
    "name": {
      "ko": "세트·퐁듀",
      "en": "Sets & Fondue",
      "zh": "套餐·芝士火锅",
      "ja": "セット・フォンデュ",
      "vi": "Set · Fondue"
    },
    "items": [
      {
        "name": {
          "ko": "만푸쿠 세트 (7품, 3~4인분)",
          "en": "Manpuku Set (7 dishes, for 3–4)",
          "zh": "满腹套餐(7道菜,3~4人份)",
          "ja": "まんぷくセット",
          "vi": "Set Manpuku (7 món, cho 3–4 người)"
        },
        "price": 770000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "도쿠도쿠 세트 (4품, 2~3인분)",
          "en": "Tokutoku Set (4 dishes, for 2–3)",
          "zh": "超值套餐(4道菜,2~3人份)",
          "ja": "得々セット",
          "vi": "Set Tokutoku (4 món, cho 2–3 người)"
        },
        "price": 440000
      },
      {
        "name": {
          "ko": "치즈 퐁듀",
          "en": "Cheese Fondue",
          "zh": "芝士火锅(奶酪火锅)",
          "ja": "チーズフォンデュ",
          "vi": "Fondue phô mai"
        },
        "price": 305000,
        "tag": "special",
        "photo": "img/fondue.jpg"
      },
      {
        "name": {
          "ko": "치즈 추가",
          "en": "Extra Cheese",
          "zh": "加芝士",
          "ja": "チーズ単品",
          "vi": "Thêm phô mai"
        },
        "price": 75000
      }
    ]
  },
  {
    "id": "dessert",
    "name": {
      "ko": "디저트",
      "en": "Dessert",
      "zh": "甜品",
      "ja": "デザート",
      "vi": "Tráng miệng"
    },
    "items": [
      {
        "name": {
          "ko": "바닐라 아이스크림",
          "en": "Vanilla Ice Cream",
          "zh": "香草冰淇淋",
          "ja": "バニラアイス",
          "vi": "Kem vani"
        },
        "price": 21000
      },
      {
        "name": {
          "ko": "딸기 아이스크림",
          "en": "Strawberry Ice Cream",
          "zh": "草莓冰淇淋",
          "ja": "ストロベリーアイス",
          "vi": "Kem dâu"
        },
        "price": 21000
      },
      {
        "name": {
          "ko": "초콜릿 아이스크림",
          "en": "Chocolate Ice Cream",
          "zh": "巧克力冰淇淋",
          "ja": "チョコレートアイス",
          "vi": "Kem sô cô la"
        },
        "price": 21000
      },
      {
        "name": {
          "ko": "꿀 콩가루 아이스크림",
          "en": "Honey Kinako Ice Cream",
          "zh": "蜂蜜黄豆粉冰淇淋",
          "ja": "蜂蜜きな粉アイス",
          "vi": "Kem mật ong bột đậu nành (Kinako)"
        },
        "price": 31000
      }
    ]
  },
  {
    "id": "drink",
    "name": {
      "ko": "음료·주류",
      "en": "Drinks & Alcohol",
      "zh": "饮料·酒类",
      "ja": "ドリンク・お酒",
      "vi": "Đồ uống · Rượu bia"
    },
    "items": [
      {
        "name": {
          "ko": "삿포로 생맥주",
          "en": "Sapporo Draft Beer",
          "zh": "札幌生啤酒",
          "ja": "サッポロ生ビール",
          "vi": "Bia tươi Sapporo"
        },
        "price": 62000
      },
      {
        "name": {
          "ko": "타이거 병맥주",
          "en": "Tiger Beer (Bottle)",
          "zh": "虎牌啤酒(瓶装)",
          "ja": "タイガービール(瓶)",
          "vi": "Bia chai Tiger"
        },
        "price": 52000
      },
      {
        "name": {
          "ko": "짐빔 하이볼",
          "en": "Jim Beam Highball",
          "zh": "金宾高球(Highball)",
          "ja": "ハイボール(ジムビーム)",
          "vi": "Highball Jim Beam"
        },
        "price": 88000
      },
      {
        "name": {
          "ko": "가쿠 하이볼",
          "en": "Kaku Highball",
          "zh": "角瓶高球(Highball)",
          "ja": "角ハイボール",
          "vi": "Highball Kaku (Suntory Kakubin)"
        },
        "price": 105000
      },
      {
        "name": {
          "ko": "소주 하이볼",
          "en": "Shochu Highball",
          "zh": "烧酎高球(Highball)",
          "ja": "焼酎ハイボール",
          "vi": "Highball Shochu"
        },
        "price": 68000
      },
      {
        "name": {
          "ko": "말차 하이",
          "en": "Matcha Hai (Shochu & Matcha)",
          "zh": "抹茶烧酎高球(Matcha Hai)",
          "ja": "抹茶ハイ",
          "vi": "Matcha Hai (Shochu pha trà matcha)"
        },
        "price": 88000
      },
      {
        "name": {
          "ko": "우롱 하이",
          "en": "Oolong Hai (Shochu & Oolong Tea)",
          "zh": "乌龙烧酎高球(Oolong Hai)",
          "ja": "ウーロンハイ",
          "vi": "Oolong Hai (Shochu pha trà ô long)"
        },
        "price": 84000
      },
      {
        "name": {
          "ko": "매실주 소다",
          "en": "Umeshu Soda (Plum Liquor)",
          "zh": "梅酒苏打",
          "ja": "梅酒ソーダ",
          "vi": "Rượu mơ soda"
        },
        "price": 78000
      },
      {
        "name": {
          "ko": "매실주 온더락",
          "en": "Umeshu on the Rocks",
          "zh": "梅酒加冰",
          "ja": "梅酒ロック",
          "vi": "Rượu mơ uống với đá"
        },
        "price": 75000
      },
      {
        "name": {
          "ko": "생레몬 사와",
          "en": "Fresh Lemon Sour",
          "zh": "鲜柠檬沙瓦(Sour)",
          "ja": "生レモンサワー",
          "vi": "Sour chanh tươi"
        },
        "price": 88000
      },
      {
        "name": {
          "ko": "사과식초 사와",
          "en": "Apple Vinegar Sour",
          "zh": "苹果醋沙瓦(Sour)",
          "ja": "りんご酢サワー",
          "vi": "Sour giấm táo"
        },
        "price": 89000
      },
      {
        "name": {
          "ko": "우메보시 사와",
          "en": "Umeboshi (Salted Plum) Sour",
          "zh": "腌梅沙瓦(Sour)",
          "ja": "梅干しサワー",
          "vi": "Sour ô mai muối Nhật (Umeboshi)"
        },
        "price": 86000
      },
      {
        "name": {
          "ko": "코카콜라 / 제로",
          "en": "Coca-Cola / Zero",
          "zh": "可口可乐 / 零度",
          "ja": "コカ・コーラ / ゼロ",
          "vi": "Coca-Cola / Zero"
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
          "ko": "환타 (오렌지·포도)",
          "en": "Fanta (Orange / Grape)",
          "zh": "芬达(橙子·葡萄)",
          "ja": "ファンタ（オレンジ・グレープ）",
          "vi": "Fanta (cam · nho)"
        },
        "price": 28000
      },
      {
        "name": {
          "ko": "우롱차",
          "en": "Oolong Tea",
          "zh": "乌龙茶",
          "ja": "烏龍茶",
          "vi": "Trà ô long"
        },
        "price": 30000
      },
      {
        "name": {
          "ko": "사과 주스",
          "en": "Apple Juice",
          "zh": "苹果汁",
          "ja": "アップルジュース",
          "vi": "Nước ép táo"
        },
        "price": 35000
      },
      {
        "name": {
          "ko": "레몬 소다",
          "en": "Lemon Soda",
          "zh": "柠檬苏打",
          "ja": "レモンソーダ",
          "vi": "Soda chanh"
        },
        "price": 48000
      },
      {
        "name": {
          "ko": "생수 · 탄산수",
          "en": "Mineral Water / Soda",
          "zh": "矿泉水 · 气泡水",
          "ja": "ミネラルウォーター・ソーダ",
          "vi": "Nước suối · Nước có ga"
        },
        "price": 25000
      }
    ]
  }
];
