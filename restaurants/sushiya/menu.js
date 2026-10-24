// 스시야 Sushiya(스시야) (14 Đường Võ Cường-5, Võ Cường, Bắc Ninh) 메뉴 데이터 — 한국식 스시·사시미
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/스시야"(사진 수집기 v1.6, 사진 39장: 메뉴판 5·음식 24·기타 10, 전부 손님 사진). 진짜 메뉴판은 **나무 메뉴판 2장(menu_01: 식사·안주·주류, menu_04: 초밥·롤·단품초밥)** + 입구 칠판 menu_05(점심 특선 240,000, 11:00~14:00). 와이파이 Sushiya / 38383838은 나무 메뉴판 근거.
// 항목 사진은 손님 음식 사진 중 요리가 맞는 것만 썼다(초밥 세트 대부분·덮밥은 사진 없음). 정문 사진은 etc_01.
window.RESTAURANT = {
  brand: { ko: "스시야", en: "Sushiya", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0327 294 225",
  address: "14 Đường Võ Cường-5, Võ Cường, Bắc Ninh",
  mapQuery: "Sushiya 스시야 14 Đường Võ Cường-5 Võ Cường Bắc Ninh",
  mapUrl: "https://www.google.com/maps/place/Sushiya(%EC%8A%A4%EC%8B%9C%EC%95%BC)/@21.1727003,106.0590801,19z/data=!3m1!4b1!4m6!3m5!1s0x31350900239026b3:0x1476e906505d8fa1!8m2!3d21.1727003!4d106.0590801!16s%2Fg%2F11wpmh26lz",
  wifi: { ssid: "Sushiya", password: "38383838" },
};

window.MENU = [
 {
  "id": "lunch",
  "name": {
   "ko": "점심 특선",
   "en": "Lunch Special",
   "zh": "午餐特选",
   "ja": "ランチ特選",
   "vi": "Set trưa đặc biệt"
  },
  "note": {
   "ko": "오전 11시 ~ 오후 2시에만 주문할 수 있어요.",
   "en": "Available 11:00–14:00 only.",
   "zh": "仅限上午11点至下午2点。",
   "ja": "午前11時〜午後2時のみ。",
   "vi": "Chỉ phục vụ 11:00–14:00."
  },
  "items": [
   {
    "price": 240000,
    "tag": "must",
    "photo": "img/lunch.jpg",
    "name": {
     "ko": "점심 특선 세트",
     "en": "Lunch Special Set",
     "zh": "午餐特选套餐",
     "ja": "ランチ特選セット",
     "vi": "Set trưa đặc biệt"
    },
    "desc": {
     "ko": "초밥 6pcs · 새우튀김 · 샐러드 · 우동 또는 메밀",
     "en": "6 sushi · shrimp tempura · salad · udon or soba",
     "zh": "寿司6贯 · 炸虾 · 沙拉 · 乌冬面或荞麦面",
     "ja": "寿司6貫 · 海老天 · サラダ · うどんまたはそば",
     "vi": "6 sushi · tôm chiên · salad · mì udon hoặc soba"
    }
   }
  ]
 },
 {
  "id": "sushi",
  "name": {
   "ko": "초밥 세트",
   "en": "Sushi Sets",
   "zh": "寿司套餐",
   "ja": "寿司セット",
   "vi": "Set sushi"
  },
  "items": [
   {
    "price": 240000,
    "tag": "must",
    "photo": "img/modeum.jpg",
    "unit": {
     "ko": "12pcs",
     "en": "12 pcs",
     "zh": "12贯",
     "ja": "12貫",
     "vi": "12 miếng"
    },
    "name": {
     "ko": "모듬 초밥",
     "en": "Assorted Sushi",
     "zh": "综合寿司",
     "ja": "握り盛り合わせ",
     "vi": "Sushi tổng hợp"
    },
    "desc": {
     "ko": "흰살생선 2 · 연어 2 · 참치 1 · 생새우 1 · 초새우 1 · 초소라 1 · 계란 1 · 구운초밥 2 · 유부 1",
     "en": "White fish 2 · salmon 2 · tuna 1 · raw shrimp 1 · vinegared shrimp 1 · vinegared conch 1 · egg 1 · seared 2 · inari 1",
     "zh": "白肉鱼2 · 三文鱼2 · 金枪鱼1 · 生虾1 · 醋虾1 · 醋海螺1 · 玉子1 · 炙烤寿司2 · 豆皮1",
     "ja": "白身魚2 · サーモン2 · マグロ1 · 生エビ1 · 酢エビ1 · 酢貝1 · 玉子1 · 炙り2 · いなり1",
     "vi": "Cá thịt trắng 2 · cá hồi 2 · cá ngừ 1 · tôm sống 1 · tôm giấm 1 · ốc giấm 1 · trứng 1 · nướng 2 · đậu hũ chiên 1"
    }
   },
   {
    "price": 280000,
    "unit": {
     "ko": "14pcs",
     "en": "14 pcs",
     "zh": "14贯",
     "ja": "14貫",
     "vi": "14 miếng"
    },
    "name": {
     "ko": "특선 초밥",
     "en": "Premium Sushi",
     "zh": "特选寿司",
     "ja": "特選握り",
     "vi": "Sushi đặc biệt"
    },
    "desc": {
     "ko": "흰살생선 2 · 지느러미 1 · 연어 2 · 참치 1 · 생새우 1 · 초새우 1 · 초소라 1 · 계란 1 · 구운초밥 2 · 소고기 1 · 장어 1",
     "en": "White fish 2 · fin 1 · salmon 2 · tuna 1 · raw shrimp 1 · vinegared shrimp 1 · vinegared conch 1 · egg 1 · seared 2 · beef 1 · eel 1",
     "zh": "白肉鱼2 · 鱼鳍1 · 三文鱼2 · 金枪鱼1 · 生虾1 · 醋虾1 · 醋海螺1 · 玉子1 · 炙烤寿司2 · 牛肉1 · 鳗鱼1",
     "ja": "白身魚2 · エンガワ1 · サーモン2 · マグロ1 · 生エビ1 · 酢エビ1 · 酢貝1 · 玉子1 · 炙り2 · 牛肉1 · ウナギ1",
     "vi": "Cá thịt trắng 2 · vây cá 1 · cá hồi 2 · cá ngừ 1 · tôm sống 1 · tôm giấm 1 · ốc giấm 1 · trứng 1 · nướng 2 · bò 1 · lươn 1"
    }
   },
   {
    "price": 360000,
    "unit": {
     "ko": "16pcs",
     "en": "16 pcs",
     "zh": "16贯",
     "ja": "16貫",
     "vi": "16 miếng"
    },
    "name": {
     "ko": "스페셜 초밥",
     "en": "Special Sushi",
     "zh": "至尊寿司",
     "ja": "スペシャル握り",
     "vi": "Sushi cao cấp"
    },
    "desc": {
     "ko": "흰살생선 3 · 지느러미 2 · 연어뱃살 2 · 오도로 1 · 간장새우 1 · 구운초새우 2 · 구운연어 2 · 장어계란 1 · 소고기 2",
     "en": "White fish 3 · fin 2 · salmon belly 2 · otoro 1 · soy shrimp 1 · grilled shrimp 2 · seared salmon 2 · eel & egg 1 · beef 2",
     "zh": "白肉鱼3 · 鱼鳍2 · 三文鱼腩2 · 大腹1 · 酱油虾1 · 烤虾2 · 炙烤三文鱼2 · 鳗鱼玉子1 · 牛肉2",
     "ja": "白身魚3 · エンガワ2 · サーモントロ2 · 大トロ1 · 醤油エビ1 · 焼きエビ2 · 炙りサーモン2 · ウナ玉1 · 牛肉2",
     "vi": "Cá thịt trắng 3 · vây cá 2 · bụng cá hồi 2 · otoro 1 · tôm nước tương 1 · tôm nướng 2 · cá hồi nướng 2 · lươn trứng 1 · bò 2"
    }
   },
   {
    "price": 350000,
    "unit": {
     "ko": "10pcs",
     "en": "10 pcs",
     "zh": "10贯",
     "ja": "10貫",
     "vi": "10 miếng"
    },
    "name": {
     "ko": "흰살 생선초밥",
     "en": "White Fish Sushi",
     "zh": "白肉鱼寿司",
     "ja": "白身魚の握り",
     "vi": "Sushi cá thịt trắng"
    }
   },
   {
    "price": 330000,
    "unit": {
     "ko": "10pcs",
     "en": "10 pcs",
     "zh": "10贯",
     "ja": "10貫",
     "vi": "10 miếng"
    },
    "name": {
     "ko": "흰살 + 연어 초밥",
     "en": "White Fish & Salmon Sushi",
     "zh": "白肉鱼+三文鱼寿司",
     "ja": "白身魚＆サーモン握り",
     "vi": "Sushi cá thịt trắng + cá hồi"
    }
   },
   {
    "price": 330000,
    "unit": {
     "ko": "10pcs",
     "en": "10 pcs",
     "zh": "10贯",
     "ja": "10貫",
     "vi": "10 miếng"
    },
    "name": {
     "ko": "연어 초밥",
     "en": "Salmon Sushi",
     "zh": "三文鱼寿司",
     "ja": "サーモン握り",
     "vi": "Sushi cá hồi"
    }
   },
   {
    "price": 270000,
    "unit": {
     "ko": "10pcs",
     "en": "10 pcs",
     "zh": "10贯",
     "ja": "10貫",
     "vi": "10 miếng"
    },
    "name": {
     "ko": "초새우 초밥",
     "en": "Vinegared Shrimp Sushi",
     "zh": "醋虾寿司",
     "ja": "酢エビ握り",
     "vi": "Sushi tôm giấm"
    }
   },
   {
    "price": 310000,
    "unit": {
     "ko": "10pcs",
     "en": "10 pcs",
     "zh": "10贯",
     "ja": "10貫",
     "vi": "10 miếng"
    },
    "name": {
     "ko": "생새우 + 간장새우 초밥",
     "en": "Raw & Soy-marinated Shrimp Sushi",
     "zh": "生虾+酱油虾寿司",
     "ja": "生エビ＆醤油エビ握り",
     "vi": "Sushi tôm sống + tôm nước tương"
    }
   },
   {
    "price": 320000,
    "unit": {
     "ko": "10pcs",
     "en": "10 pcs",
     "zh": "10贯",
     "ja": "10貫",
     "vi": "10 miếng"
    },
    "name": {
     "ko": "소고기 초밥",
     "en": "Beef Sushi",
     "zh": "牛肉寿司",
     "ja": "牛肉握り",
     "vi": "Sushi bò"
    }
   },
   {
    "price": 270000,
    "unit": {
     "ko": "10pcs",
     "en": "10 pcs",
     "zh": "10贯",
     "ja": "10貫",
     "vi": "10 miếng"
    },
    "name": {
     "ko": "구운 모듬초밥",
     "en": "Seared Assorted Sushi",
     "zh": "炙烤综合寿司",
     "ja": "炙り盛り合わせ",
     "vi": "Sushi nướng tổng hợp"
    },
    "desc": {
     "ko": "소고기 2 · 연어 2 · 구운초새우 2 · 구운소라 2 · 구운계란 2",
     "en": "Beef 2 · salmon 2 · grilled shrimp 2 · grilled conch 2 · grilled egg 2",
     "zh": "牛肉2 · 三文鱼2 · 烤虾2 · 烤海螺2 · 烤玉子2",
     "ja": "牛肉2 · サーモン2 · 焼きエビ2 · 焼き貝2 · 焼き玉子2",
     "vi": "Bò 2 · cá hồi 2 · tôm nướng 2 · ốc nướng 2 · trứng nướng 2"
    }
   }
  ]
 },
 {
  "id": "roll",
  "name": {
   "ko": "롤",
   "en": "Rolls",
   "zh": "卷",
   "ja": "ロール",
   "vi": "Cuộn"
  },
  "items": [
   {
    "price": 150000,
    "photo": "img/california.jpg",
    "name": {
     "ko": "캘리포니아 롤",
     "en": "California Roll",
     "zh": "加州卷",
     "ja": "カリフォルニアロール",
     "vi": "Cuộn California"
    }
   },
   {
    "price": 240000,
    "name": {
     "ko": "연어 롤",
     "en": "Salmon Roll",
     "zh": "三文鱼卷",
     "ja": "サーモンロール",
     "vi": "Cuộn cá hồi"
    }
   },
   {
    "price": 260000,
    "name": {
     "ko": "장어 롤",
     "en": "Eel Roll",
     "zh": "鳗鱼卷",
     "ja": "ウナギロール",
     "vi": "Cuộn lươn"
    }
   },
   {
    "price": 260000,
    "spicy": true,
    "name": {
     "ko": "구운 칠리 롤",
     "en": "Seared Chili Roll",
     "zh": "炙烤辣椒卷",
     "ja": "炙りチリロール",
     "vi": "Cuộn nướng ớt"
    }
   }
  ]
 },
 {
  "id": "single",
  "name": {
   "ko": "단품 초밥",
   "en": "Single Sushi",
   "zh": "单点寿司",
   "ja": "単品握り",
   "vi": "Sushi lẻ"
  },
  "note": {
   "ko": "가격은 1pcs 기준이에요.",
   "en": "Prices are per piece.",
   "zh": "价格为每贯。",
   "ja": "価格は1貫あたりです。",
   "vi": "Giá tính cho 1 miếng."
  },
  "items": [
   {
    "price": 37000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "광어",
     "en": "Flatfish (Halibut)",
     "zh": "比目鱼",
     "ja": "ヒラメ",
     "vi": "Cá thờn bơn"
    }
   },
   {
    "price": 38000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "광어 지느러미",
     "en": "Flatfish Fin (Engawa)",
     "zh": "比目鱼鱼鳍",
     "ja": "エンガワ",
     "vi": "Vây cá thờn bơn"
    }
   },
   {
    "price": 35000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "연어",
     "en": "Salmon",
     "zh": "三文鱼",
     "ja": "サーモン",
     "vi": "Cá hồi"
    }
   },
   {
    "price": 37000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "연어 뱃살",
     "en": "Salmon Belly",
     "zh": "三文鱼腩",
     "ja": "サーモンハラス",
     "vi": "Bụng cá hồi"
    }
   },
   {
    "price": 32000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "흰살생선",
     "en": "White Fish",
     "zh": "白肉鱼",
     "ja": "白身魚",
     "vi": "Cá thịt trắng"
    }
   },
   {
    "price": 40000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "참치",
     "en": "Tuna",
     "zh": "金枪鱼",
     "ja": "マグロ",
     "vi": "Cá ngừ"
    }
   },
   {
    "price": 80000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "오도로",
     "en": "Otoro (Fatty Tuna)",
     "zh": "大腹",
     "ja": "大トロ",
     "vi": "Otoro (bụng cá ngừ)"
    }
   },
   {
    "price": 38000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "황새치",
     "en": "Swordfish",
     "zh": "剑鱼",
     "ja": "カジキ",
     "vi": "Cá kiếm"
    }
   },
   {
    "price": 29000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "초새우",
     "en": "Vinegared Shrimp",
     "zh": "醋虾",
     "ja": "酢エビ",
     "vi": "Tôm giấm"
    }
   },
   {
    "price": 30000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "생새우",
     "en": "Raw Shrimp",
     "zh": "生虾",
     "ja": "生エビ",
     "vi": "Tôm sống"
    }
   },
   {
    "price": 32000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "간장 새우",
     "en": "Soy-marinated Shrimp",
     "zh": "酱油虾",
     "ja": "醤油エビ",
     "vi": "Tôm nước tương"
    }
   },
   {
    "price": 37000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "구운 연어",
     "en": "Seared Salmon",
     "zh": "炙烤三文鱼",
     "ja": "炙りサーモン",
     "vi": "Cá hồi nướng"
    }
   },
   {
    "price": 32000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "구운 초새우",
     "en": "Grilled Vinegared Shrimp",
     "zh": "烤醋虾",
     "ja": "焼き酢エビ",
     "vi": "Tôm giấm nướng"
    }
   },
   {
    "price": 34000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "구운 초소라",
     "en": "Grilled Vinegared Conch",
     "zh": "烤醋海螺",
     "ja": "焼き酢貝",
     "vi": "Ốc giấm nướng"
    }
   },
   {
    "price": 32000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "구운 칠리새우",
     "en": "Grilled Chili Shrimp",
     "zh": "烤辣椒虾",
     "ja": "焼きチリエビ",
     "vi": "Tôm nướng ớt"
    }
   },
   {
    "price": 34000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "갈릭 생새우",
     "en": "Garlic Raw Shrimp",
     "zh": "蒜香生虾",
     "ja": "ガーリック生エビ",
     "vi": "Tôm sống tỏi"
    }
   },
   {
    "price": 35000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "갈릭 간장새우",
     "en": "Garlic Soy Shrimp",
     "zh": "蒜香酱油虾",
     "ja": "ガーリック醤油エビ",
     "vi": "Tôm nước tương tỏi"
    }
   },
   {
    "price": 35000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "소고기",
     "en": "Beef",
     "zh": "牛肉",
     "ja": "牛肉",
     "vi": "Bò"
    }
   },
   {
    "price": 38000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "장어",
     "en": "Eel",
     "zh": "鳗鱼",
     "ja": "ウナギ",
     "vi": "Lươn"
    }
   },
   {
    "price": 42000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "장어 계란",
     "en": "Eel & Egg",
     "zh": "鳗鱼玉子",
     "ja": "ウナ玉",
     "vi": "Lươn trứng"
    }
   },
   {
    "price": 25000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "계란",
     "en": "Egg (Tamago)",
     "zh": "玉子烧",
     "ja": "玉子",
     "vi": "Trứng"
    }
   },
   {
    "price": 25000,
    "unit": {
     "ko": "1pcs",
     "en": "1 pc",
     "zh": "1贯",
     "ja": "1貫",
     "vi": "1 miếng"
    },
    "name": {
     "ko": "유부",
     "en": "Inari (Tofu Pouch)",
     "zh": "豆皮寿司",
     "ja": "いなり",
     "vi": "Đậu hũ chiên"
    }
   }
  ]
 },
 {
  "id": "meal",
  "name": {
   "ko": "식사",
   "en": "Rice & Noodles",
   "zh": "主食",
   "ja": "食事",
   "vi": "Cơm & Mì"
  },
  "items": [
   {
    "price": 180000,
    "name": {
     "ko": "모듬회 덮밥",
     "en": "Assorted Sashimi Rice Bowl",
     "zh": "综合刺身盖饭",
     "ja": "海鮮丼",
     "vi": "Cơm cá sống tổng hợp"
    }
   },
   {
    "price": 160000,
    "name": {
     "ko": "참치 회덮밥",
     "en": "Tuna Sashimi Rice Bowl",
     "zh": "金枪鱼刺身盖饭",
     "ja": "マグロ丼",
     "vi": "Cơm cá ngừ"
    }
   },
   {
    "price": 190000,
    "name": {
     "ko": "연어 회덮밥",
     "en": "Salmon Sashimi Rice Bowl",
     "zh": "三文鱼刺身盖饭",
     "ja": "サーモン丼",
     "vi": "Cơm cá hồi"
    }
   },
   {
    "price": 240000,
    "name": {
     "ko": "장어 덮밥",
     "en": "Eel Rice Bowl",
     "zh": "鳗鱼盖饭",
     "ja": "うな丼",
     "vi": "Cơm lươn"
    }
   },
   {
    "price": 120000,
    "photo": "img/udon.jpg",
    "name": {
     "ko": "우동 / 메밀",
     "en": "Udon / Soba",
     "zh": "乌冬面 / 荞麦面",
     "ja": "うどん / そば",
     "vi": "Mì udon / soba"
    }
   }
  ]
 },
 {
  "id": "anju",
  "name": {
   "ko": "안주",
   "en": "Sashimi & Small Plates",
   "zh": "下酒菜",
   "ja": "おつまみ",
   "vi": "Món nhắm"
  },
  "items": [
   {
    "price": 900000,
    "photo": "img/tuna_m.jpg",
    "name": {
     "ko": "참치회 (중)",
     "en": "Tuna Sashimi (M)",
     "zh": "金枪鱼刺身(中)",
     "ja": "マグロ刺身(中)",
     "vi": "Cá ngừ sashimi (vừa)"
    }
   },
   {
    "price": 1300000,
    "photo": "img/tuna_l.jpg",
    "name": {
     "ko": "참치회 (대)",
     "en": "Tuna Sashimi (L)",
     "zh": "金枪鱼刺身(大)",
     "ja": "マグロ刺身(大)",
     "vi": "Cá ngừ sashimi (lớn)"
    }
   },
   {
    "price": 650000,
    "photo": "img/salmon.jpg",
    "name": {
     "ko": "연어회",
     "en": "Salmon Sashimi",
     "zh": "三文鱼刺身",
     "ja": "サーモン刺身",
     "vi": "Cá hồi sashimi"
    }
   },
   {
    "price": 1000000,
    "photo": "img/tunasalmon.jpg",
    "name": {
     "ko": "참치 + 연어",
     "en": "Tuna & Salmon Sashimi",
     "zh": "金枪鱼+三文鱼刺身",
     "ja": "マグロ＆サーモン刺身",
     "vi": "Cá ngừ + cá hồi"
    }
   },
   {
    "price": 500000,
    "name": {
     "ko": "미니 사시미",
     "en": "Mini Sashimi",
     "zh": "迷你刺身",
     "ja": "ミニ刺身",
     "vi": "Sashimi mini"
    }
   },
   {
    "price": 240000,
    "name": {
     "ko": "오뎅탕",
     "en": "Fish Cake Soup",
     "zh": "鱼饼汤",
     "ja": "おでん鍋",
     "vi": "Canh chả cá"
    }
   },
   {
    "price": 240000,
    "spicy": true,
    "name": {
     "ko": "김치 우동",
     "en": "Kimchi Udon",
     "zh": "泡菜乌冬面",
     "ja": "キムチうどん",
     "vi": "Udon kim chi"
    }
   },
   {
    "price": 200000,
    "photo": "img/shrimpfry.jpg",
    "name": {
     "ko": "새우 튀김",
     "en": "Shrimp Tempura",
     "zh": "炸虾",
     "ja": "海老天",
     "vi": "Tôm chiên"
    }
   },
   {
    "price": 160000,
    "photo": "img/mixfry.jpg",
    "name": {
     "ko": "모듬 튀김",
     "en": "Assorted Tempura",
     "zh": "综合炸物",
     "ja": "天ぷら盛り合わせ",
     "vi": "Chiên tổng hợp"
    }
   },
   {
    "price": 120000,
    "name": {
     "ko": "양미리 구이",
     "en": "Grilled Sand Lance (Yangmiri)",
     "zh": "烤玉筋鱼",
     "ja": "ヤンミリ焼き",
     "vi": "Cá yangmiri nướng"
    }
   },
   {
    "price": 170000,
    "name": {
     "ko": "생선 머리 구이",
     "en": "Grilled Fish Head",
     "zh": "烤鱼头",
     "ja": "魚の頭焼き",
     "vi": "Đầu cá nướng"
    }
   },
   {
    "price": 130000,
    "name": {
     "ko": "꽁치 구이",
     "en": "Grilled Pacific Saury",
     "zh": "烤秋刀鱼",
     "ja": "サンマ焼き",
     "vi": "Cá thu đao nướng"
    }
   }
  ]
 },
 {
  "id": "drink",
  "name": {
   "ko": "술 · 음료",
   "en": "Drinks",
   "zh": "酒水",
   "ja": "お酒 · ドリンク",
   "vi": "Rượu & đồ uống"
  },
  "items": [
   {
    "price": 140000,
    "name": {
     "ko": "소주 (참이슬 · 새로 · 진로)",
     "en": "Soju (Chamisul · Saero · Jinro)",
     "zh": "烧酒(真露 · 新乐 · 진로)",
     "ja": "焼酎(チャミスル · セロ · ジンロ)",
     "vi": "Soju (Chamisul · Saero · Jinro)"
    }
   },
   {
    "price": 120000,
    "name": {
     "ko": "소주 (좋은데이 · 처음처럼)",
     "en": "Soju (Good Day · Chum Churum)",
     "zh": "烧酒(好天天 · 初饮初乐)",
     "ja": "焼酎(チョウンデー · チョウムチョロム)",
     "vi": "Soju (Good Day · Chum Churum)"
    }
   },
   {
    "price": 40000,
    "name": {
     "ko": "맥주",
     "en": "Beer",
     "zh": "啤酒",
     "ja": "ビール",
     "vi": "Bia"
    }
   },
   {
    "price": 60000,
    "name": {
     "ko": "생맥주",
     "en": "Draft Beer",
     "zh": "生啤",
     "ja": "生ビール",
     "vi": "Bia tươi"
    }
   },
   {
    "price": 20000,
    "name": {
     "ko": "음료수",
     "en": "Soft Drinks",
     "zh": "饮料",
     "ja": "ソフトドリンク",
     "vi": "Nước ngọt"
    }
   }
  ]
 }
];
