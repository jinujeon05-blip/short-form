// 선산곱창 & 돼지찌개 Nhà Hàng 선산곱창 (138 Nguyễn Cao, Kinh Bắc, Bắc Ninh) 메뉴 데이터 — 한국식 곱창·돼지찌개
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/선산곱창"(사진 수집기 v1.6, 사진 45장: 메뉴판 10·음식 34·매장 1 — 메뉴판 분류 중 menu_10은 정문 간판 사진, menu_02·03·04·08·09는 음식·화면 캡처). 가격은 **종이 메뉴판(menu_01, 90도 돌아간 사진)** + 벽 안내판(menu_05·07: 곱창전골 1인분 220,000·2인분부터, 소곱창·소막창 한판 1,200,000(3인분 600g), 소주 120,000·맥주 50,000·음료 20,000, 산낙지 150,000)으로 맞춰 봤다(서로 일치).
// 종이 메뉴판 번역에서 틀려 보이는 곳은 고쳐 썼다: 스팸구이('春卷'·Nem rán은 춘권 → Spam), 막창구이 '1인분' 표기는 안내판의 '한 판 3인분 600g'을 따랐다. 막걸리·보카맨·설향은 가격이 없어 '가격 문의'.
// 항목 사진은 손님이 올린 음식 사진 중 요리가 확실한 것만 썼다(소막창·스팸·두부김치 등은 사진 없음).
window.RESTAURANT = {
  brand: { ko: "선산곱창", en: "Seonsan Gopchang", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0865 438 615",
  address: "138 Nguyễn Cao, Kinh Bắc, Bắc Ninh",
  mapQuery: "선산곱창 Nhà Hàng 선산곱창 138 Nguyễn Cao Kinh Bắc Bắc Ninh",
  mapUrl: "https://www.google.com/maps/place/Nh%C3%A0+H%C3%A0ng+%EC%84%A0%EC%82%B0%EA%B3%B1%EC%B0%BD/@21.1747191,106.0588987,21z/data=!4m6!3m5!1s0x31350f1d67cfebeb:0xa13a74c475676f29!8m2!3d21.1747203!4d106.058823!16s%2Fg%2F11jnwvwyx1",
  wifi: { ssid: "SUN SAN T1", password: "33333333" }, // 가게 안 와이파이 안내판(menu_05·07)
};

window.MENU = [
 {
  "id": "pot",
  "name": {
   "ko": "찌개 · 전골",
   "en": "Stews & Hot Pot",
   "zh": "锅 · 汤",
   "ja": "鍋 · チゲ",
   "vi": "Lẩu · Canh"
  },
  "items": [
   {
    "price": 220000,
    "tag": "must",
    "photo": "img/gopchang.jpg",
    "unit": {
     "ko": "1인분",
     "en": "1 serving",
     "zh": "1人份",
     "ja": "1人前",
     "vi": "1 suất"
    },
    "name": {
     "ko": "선산곱창 (곱창전골)",
     "en": "Seonsan Gopchang (Beef Intestine Hot Pot)",
     "zh": "牛肠火锅",
     "ja": "ホルモン鍋(ソンサンコプチャン)",
     "vi": "Lòng lẩu"
    },
    "desc": {
     "ko": "2인분부터 주문할 수 있어요",
     "en": "Order from 2 servings",
     "zh": "2人份起点",
     "ja": "2人前からご注文いただけます",
     "vi": "Từ 2 suất trở lên"
    }
   },
   {
    "price": 160000,
    "spicy": true,
    "photo": "img/jjigae.jpg",
    "unit": {
     "ko": "1인분",
     "en": "1 serving",
     "zh": "1人份",
     "ja": "1人前",
     "vi": "1 suất"
    },
    "name": {
     "ko": "돼지찌개",
     "en": "Pork Stew",
     "zh": "猪肉汤",
     "ja": "豚肉チゲ",
     "vi": "Canh thịt lợn"
    }
   },
   {
    "price": 220000,
    "spicy": true,
    "photo": "img/budae.jpg",
    "unit": {
     "ko": "1인분",
     "en": "1 serving",
     "zh": "1人份",
     "ja": "1人前",
     "vi": "1 suất"
    },
    "name": {
     "ko": "부대찌개",
     "en": "Budae Jjigae (Army Stew)",
     "zh": "部队锅(麻辣香肠)",
     "ja": "プデチゲ",
     "vi": "Xúc xích hầm cay"
    }
   }
  ]
 },
 {
  "id": "grill",
  "name": {
   "ko": "구이",
   "en": "Grilled",
   "zh": "烧烤",
   "ja": "焼き物",
   "vi": "Món nướng"
  },
  "items": [
   {
    "price": 1200000,
    "photo": "img/gopgui.jpg",
    "desc": {
     "ko": "한 판 (3인분 · 600g)",
     "en": "1 plate (3 servings · 600g)",
     "zh": "一盘(3人份 · 600克)",
     "ja": "1皿(3人前 · 600g)",
     "vi": "1 khay (3 suất · 600g)"
    },
    "name": {
     "ko": "소 곱창구이",
     "en": "Grilled Beef Small Intestine",
     "zh": "烤牛小肠",
     "ja": "牛ホルモン焼き",
     "vi": "Lòng nướng"
    }
   },
   {
    "price": 1200000,
    "desc": {
     "ko": "한 판 (3인분 · 600g)",
     "en": "1 plate (3 servings · 600g)",
     "zh": "一盘(3人份 · 600克)",
     "ja": "1皿(3人前 · 600g)",
     "vi": "1 khay (3 suất · 600g)"
    },
    "name": {
     "ko": "소 막창구이",
     "en": "Grilled Beef Tripe (Makchang)",
     "zh": "烤牛肚",
     "ja": "牛マクチャン焼き",
     "vi": "Dạ dày nướng"
    }
   },
   {
    "price": 300000,
    "photo": "img/bongi.jpg",
    "unit": {
     "ko": "1인분",
     "en": "1 serving",
     "zh": "1人份",
     "ja": "1人前",
     "vi": "1 suất"
    },
    "name": {
     "ko": "봉이 돼지막창",
     "en": "Bongi Grilled Pork Intestine",
     "zh": "烤猪大肠(봉이)",
     "ja": "豚マクチャン焼き(ポンイ)",
     "vi": "Ruột heo nướng (막창)"
    }
   },
   {
    "price": 160000,
    "photo": "img/samgyeop.jpg",
    "unit": {
     "ko": "1인분",
     "en": "1 serving",
     "zh": "1人份",
     "ja": "1人前",
     "vi": "1 suất"
    },
    "name": {
     "ko": "삼겹살",
     "en": "Grilled Pork Belly",
     "zh": "烤五花肉",
     "ja": "サムギョプサル",
     "vi": "Thịt nướng"
    }
   }
  ]
 },
 {
  "id": "side",
  "name": {
   "ko": "사이드 · 일반 메뉴",
   "en": "Sides & Light Dishes",
   "zh": "小菜 · 一般菜单",
   "ja": "サイド · 一般メニュー",
   "vi": "Món nhẹ"
  },
  "items": [
   {
    "price": 160000,
    "name": {
     "ko": "두부김치",
     "en": "Tofu & Kimchi",
     "zh": "豆腐泡菜",
     "ja": "豆腐キムチ",
     "vi": "Đậu phụ kim chi"
    }
   },
   {
    "price": 300000,
    "name": {
     "ko": "어묵탕",
     "en": "Fish Cake Soup",
     "zh": "鱼饼汤",
     "ja": "おでん鍋",
     "vi": "Canh chả cá"
    }
   },
   {
    "price": 200000,
    "name": {
     "ko": "스팸구이",
     "en": "Grilled Spam",
     "zh": "烤午餐肉",
     "ja": "スパム焼き",
     "vi": "Spam nướng"
    }
   },
   {
    "price": 200000,
    "photo": "img/dotori.jpg",
    "name": {
     "ko": "도토리묵무침",
     "en": "Acorn Jelly Salad",
     "zh": "橡子凉粉拌菜",
     "ja": "どんぐりゼリーの和え物",
     "vi": "Gỏi thạch hạt dẻ (dotori)"
    }
   },
   {
    "price": 120000,
    "spicy": true,
    "name": {
     "ko": "배추 & 매운 부추전",
     "en": "Cabbage & Spicy Chive Pancake",
     "zh": "白菜辣韭菜煎饼",
     "ja": "白菜と辛いニラのチヂミ",
     "vi": "Bánh hẹ cay & cải thảo rán"
    }
   },
   {
    "price": 120000,
    "name": {
     "ko": "계란말이 & 찜",
     "en": "Rolled Omelet & Steamed Egg",
     "zh": "蛋卷 · 蒸蛋",
     "ja": "卵焼き＆卵蒸し",
     "vi": "Trứng cuộn, trứng hấp"
    }
   },
   {
    "price": 120000,
    "spicy": true,
    "name": {
     "ko": "비빔국수",
     "en": "Spicy Mixed Noodles",
     "zh": "拌面",
     "ja": "ビビム麺",
     "vi": "Mì trộn"
    }
   },
   {
    "price": 250000,
    "spicy": true,
    "name": {
     "ko": "비빔만두",
     "en": "Mixed Fried Dumplings (Bibim Mandu)",
     "zh": "拌煎饺",
     "ja": "ビビムマンドゥ",
     "vi": "Bánh xếp rán trộn cay"
    }
   },
   {
    "price": 150000,
    "name": {
     "ko": "산낙지",
     "en": "Live Octopus (Sannakji)",
     "zh": "活章鱼",
     "ja": "活きタコ(サンナクチ)",
     "vi": "Bạch tuộc sống"
    }
   },
   {
    "price": 40000,
    "photo": "img/bokkeumbap.jpg",
    "name": {
     "ko": "볶음밥",
     "en": "Fried Rice",
     "zh": "炒饭",
     "ja": "チャーハン",
     "vi": "Cơm rang"
    }
   },
   {
    "price": 40000,
    "name": {
     "ko": "대접밥",
     "en": "Rice Bowl",
     "zh": "什锦饭",
     "ja": "丼ご飯",
     "vi": "Cơm trộn"
    }
   },
   {
    "price": 20000,
    "name": {
     "ko": "공기밥",
     "en": "Steamed Rice",
     "zh": "白饭",
     "ja": "ご飯",
     "vi": "Cơm trắng"
    }
   },
   {
    "price": 40000,
    "name": {
     "ko": "우동 · 라면 · 당면사리",
     "en": "Extra Udon / Ramen / Glass Noodles",
     "zh": "乌冬面 · 拉面 · 粉丝",
     "ja": "うどん · ラーメン · 春雨の追加",
     "vi": "Mì udong, mì tôm, miến"
    }
   }
  ]
 },
 {
  "id": "reserve",
  "name": {
   "ko": "예약 메뉴",
   "en": "Pre-order Menu",
   "zh": "预约菜单",
   "ja": "予約メニュー",
   "vi": "Thực đơn đặt chỗ"
  },
  "note": {
   "ko": "미리 예약해야 주문할 수 있어요.",
   "en": "Please order in advance (reservation required).",
   "zh": "需提前预约。",
   "ja": "事前のご予約が必要です。",
   "vi": "Vui lòng đặt chỗ trước."
  },
  "items": [
   {
    "price": 1200000,
    "photo": "img/baeksuk.jpg",
    "name": {
     "ko": "능이 백숙",
     "en": "Neungi Mushroom Chicken Baeksuk",
     "zh": "人参炖鸡",
     "ja": "ヌンイ茸の鶏水炊き(ペクスク)",
     "vi": "Gà hầm sâm"
    }
   },
   {
    "price": 1200000,
    "name": {
     "ko": "왕 새우 소금구이",
     "en": "Salt-grilled Giant Prawns",
     "zh": "盐烤大虾",
     "ja": "大エビの塩焼き",
     "vi": "Tôm càng nướng muối"
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
    "price": 120000,
    "name": {
     "ko": "소주",
     "en": "Soju",
     "zh": "烧酒",
     "ja": "焼酎(ソジュ)",
     "vi": "Soju"
    }
   },
   {
    "price": 50000,
    "name": {
     "ko": "맥주",
     "en": "Beer",
     "zh": "啤酒",
     "ja": "ビール",
     "vi": "Bia"
    }
   },
   {
    "price": null,
    "name": {
     "ko": "막걸리 · 보카맨 · 설향",
     "en": "Makgeolli · Bocaman · Seolhyang",
     "zh": "马格利酒 · 博卡曼 · 雪香",
     "ja": "マッコリ · ボカマン · ソリャン",
     "vi": "Makgeolli, Bocaman, Seolhyang"
    }
   },
   {
    "price": 20000,
    "name": {
     "ko": "음료 (콜라 · 사이다 · 환타)",
     "en": "Soft Drinks (Cola · Cider · Fanta)",
     "zh": "饮料(可乐 · 苹果汽水 · 芬达)",
     "ja": "ソフトドリンク(コーラ · サイダー · ファンタ)",
     "vi": "Nước ngọt (Cola, rượu táo, Fanta)"
    }
   }
  ]
 }
];
