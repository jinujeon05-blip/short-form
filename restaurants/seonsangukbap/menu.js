// 선산국밥 Nhà Hàng Sơn San (211 Nguyễn Cao, Kinh Bắc, Bắc Ninh) 메뉴 데이터 — 돼지국밥·순대국밥
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND — 가게 TV 메뉴판에 '현재 가격은 세액(VAT) 포함 금액'이라고 적혀 있음
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/선산국밥"(사진 수집기 v1.6, 사진 47장: 메뉴판 6·음식 38·기타 3, 전부 손님 사진). 진짜 메뉴판은 **TV 메뉴판 사진(menu_01·etc_03)** — 노란 벽 메뉴판(menu_04·05)은 옛 가격(돼지국밥 140,000 등)이라 쓰지 않았다.
// TV 메뉴판은 이름과 가격 줄이 기울어 있어 순서대로 짝지었다(18줄 ↔ 18개 가격). 소머리수육 850,000·술국 중 550,000/대 750,000·곱창전골 270,000(1인분, 2인분부터)은 반사광 때문에 확인이 필요하다 — docs/todo.md.
// 항목 사진은 손님 음식 사진 중 요리가 확실한 5개만 썼다. 정문 간판 사진은 etc_01.
window.RESTAURANT = {
  brand: { ko: "선산국밥", en: "Seonsan Gukbap", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0347 942 577",
  address: "211 Nguyễn Cao, Kinh Bắc, Bắc Ninh",
  mapQuery: "선산국밥 식당 Nhà Hàng Sơn San 211 Nguyễn Cao Kinh Bắc Bắc Ninh",
  mapUrl: "https://www.google.com/maps/place/%EC%84%A0%EC%82%B0%EA%B5%AD%EB%B0%A5+%EC%8B%9D%EB%8B%B9/@21.1749161,106.0594283,21z/data=!4m6!3m5!1s0x31350eaa53a17433:0xceedd9d9f0fdfe53!8m2!3d21.1749161!4d106.0595892!16s%2Fg%2F11f3dfndcg",
  wifi: { ssid: "Sơn San", password: "14022014" }, // 가게 TV 메뉴판·벽 안내판 근거
};

window.MENU = [
 {
  "id": "gukbap",
  "name": {
   "ko": "국밥",
   "en": "Rice Soups (Gukbap)",
   "zh": "汤饭",
   "ja": "クッパ",
   "vi": "Cơm canh"
  },
  "note": {
   "ko": "현재 가격은 세액(VAT) 포함 금액이에요.",
   "en": "Current prices include VAT.",
   "zh": "目前价格已含税(VAT)。",
   "ja": "現在の価格は税(VAT)込みです。",
   "vi": "Giá hiện tại đã bao gồm thuế VAT."
  },
  "items": [
   {
    "price": 160000,
    "photo": "img/dwaeji.jpg",
    "name": {
     "ko": "돼지국밥",
     "en": "Pork Rice Soup (Dwaeji Gukbap)",
     "zh": "猪肉汤饭",
     "ja": "豚肉クッパ",
     "vi": "Cơm canh thịt lợn"
    }
   },
   {
    "price": 160000,
    "name": {
     "ko": "순대만국밥",
     "en": "Sundae Rice Soup (Sundae Only)",
     "zh": "猪血肠汤饭",
     "ja": "スンデのみクッパ",
     "vi": "Cơm canh dồi lợn"
    }
   },
   {
    "price": 160000,
    "name": {
     "ko": "순대돼지국밥",
     "en": "Pork & Sundae Rice Soup",
     "zh": "猪肉血肠汤饭",
     "ja": "豚肉とスンデのクッパ",
     "vi": "Cơm canh thịt + dồi Hàn"
    }
   },
   {
    "price": 195000,
    "photo": "img/naejang.jpg",
    "name": {
     "ko": "내장국밥",
     "en": "Offal Rice Soup (Naejang Gukbap)",
     "zh": "猪肠汤饭",
     "ja": "ホルモンクッパ",
     "vi": "Cơm canh lòng"
    }
   },
   {
    "price": 195000,
    "spicy": true,
    "name": {
     "ko": "닭개장",
     "en": "Spicy Chicken Soup (Dakgaejang)",
     "zh": "鸡丝辣汤",
     "ja": "タッケジャン",
     "vi": "Canh gà"
    }
   },
   {
    "price": 195000,
    "name": {
     "ko": "수육국밥",
     "en": "Boiled Pork Rice Soup (Suyuk Gukbap)",
     "zh": "五花肉汤饭",
     "ja": "茹で豚クッパ",
     "vi": "Cơm canh thịt lợn + ba chỉ hấp"
    }
   },
   {
    "price": 205000,
    "name": {
     "ko": "섞어국밥",
     "en": "Mixed Rice Soup (Seokkeo Gukbap)",
     "zh": "什锦汤饭",
     "ja": "ミックスクッパ",
     "vi": "Cơm canh thập cẩm"
    }
   },
   {
    "price": 205000,
    "name": {
     "ko": "소머리국밥",
     "en": "Ox Head Rice Soup (Someori Gukbap)",
     "zh": "牛头肉汤饭",
     "ja": "ソモリクッパ(牛頭)",
     "vi": "Cơm canh thịt bò"
    }
   },
   {
    "price": 205000,
    "name": {
     "ko": "선산해장국",
     "en": "Seonsan Haejangguk (Beef Offal Soup)",
     "zh": "牛肠解酒汤",
     "ja": "ソンサンヘジャンクッ",
     "vi": "Canh lòng bò"
    }
   }
  ]
 },
 {
  "id": "plate",
  "name": {
   "ko": "수육 · 전골 · 안주",
   "en": "Boiled Meat, Hot Pot & Sides",
   "zh": "白切肉 · 火锅 · 下酒菜",
   "ja": "茹で肉 · 鍋 · おつまみ",
   "vi": "Thịt hấp · Lẩu · Món nhắm"
  },
  "items": [
   {
    "price": 150000,
    "name": {
     "ko": "순대",
     "en": "Sundae (Korean Blood Sausage)",
     "zh": "猪血肠",
     "ja": "スンデ",
     "vi": "Dồi lợn"
    }
   },
   {
    "price": 330000,
    "photo": "img/suyuk.jpg",
    "name": {
     "ko": "수육",
     "en": "Boiled Pork Belly (Suyuk)",
     "zh": "白切五花肉",
     "ja": "茹で豚バラ(スユク)",
     "vi": "Ba chỉ hấp"
    }
   },
   {
    "price": 450000,
    "photo": "img/modeum.jpg",
    "name": {
     "ko": "암뽕오소리모듬",
     "en": "Assorted Steamed Organ Meats (Ampong · Osori)",
     "zh": "猪血肠和内脏拼盘",
     "ja": "アンポン・オソリ盛り合わせ",
     "vi": "Lòng thập cẩm hấp"
    }
   },
   {
    "price": 850000,
    "name": {
     "ko": "소머리수육",
     "en": "Boiled Ox Head Slices",
     "zh": "牛头肉",
     "ja": "牛頭肉の茹で(ソモリスユク)",
     "vi": "Thịt bò hấp"
    }
   },
   {
    "sizes": [
     [
      {
       "ko": "중",
       "en": "Small",
       "zh": "小号",
       "ja": "小",
       "vi": "nhỏ"
      },
      550000
     ],
     [
      {
       "ko": "대",
       "en": "Large",
       "zh": "大号",
       "ja": "大",
       "vi": "to"
      },
      750000
     ]
    ],
    "name": {
     "ko": "술국",
     "en": "Sulguk (Pork Soup)",
     "zh": "猪肉汤",
     "ja": "スルグク(豚肉スープ)",
     "vi": "Canh thịt lợn"
    }
   },
   {
    "price": 270000,
    "photo": "img/jeongol.jpg",
    "name": {
     "ko": "곱창전골",
     "en": "Offal Hot Pot (Gopchang Jeongol)",
     "zh": "内脏火锅",
     "ja": "ホルモン鍋",
     "vi": "Lẩu lòng"
    },
    "desc": {
     "ko": "2인분부터 주문 가능 (1인분 가격)",
     "en": "From 2 servings (price per serving)",
     "zh": "2人份起点(单价为每人份)",
     "ja": "2人前から(価格は1人前)",
     "vi": "Từ 2 suất (giá mỗi suất)"
    }
   }
  ]
 },
 {
  "id": "rice",
  "name": {
   "ko": "밥",
   "en": "Rice",
   "zh": "米饭",
   "ja": "ご飯",
   "vi": "Cơm"
  },
  "items": [
   {
    "price": 40000,
    "name": {
     "ko": "볶음밥",
     "en": "Fried Rice",
     "zh": "炒饭",
     "ja": "チャーハン",
     "vi": "Cơm rang"
    }
   },
   {
    "price": 15000,
    "name": {
     "ko": "공기밥",
     "en": "Steamed Rice",
     "zh": "米饭",
     "ja": "ご飯",
     "vi": "Cơm trắng"
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
    "price": 20000,
    "name": {
     "ko": "음료",
     "en": "Soft Drinks",
     "zh": "饮料",
     "ja": "ソフトドリンク",
     "vi": "Nước ngọt"
    }
   },
   {
    "price": 55000,
    "name": {
     "ko": "맥주",
     "en": "Beer",
     "zh": "啤酒",
     "ja": "ビール",
     "vi": "Bia"
    }
   },
   {
    "price": 110000,
    "name": {
     "ko": "보드카 (Voka Men)",
     "en": "Vodka (Voka Men)",
     "zh": "伏特加(Voka Men)",
     "ja": "ウォッカ(Voka Men)",
     "vi": "Rượu Voka Men"
    }
   },
   {
    "price": 130000,
    "name": {
     "ko": "소주",
     "en": "Soju",
     "zh": "烧酒",
     "ja": "焼酎(ソジュ)",
     "vi": "Rượu soju"
    }
   },
   {
    "price": 150000,
    "name": {
     "ko": "막걸리",
     "en": "Makgeolli",
     "zh": "马格利酒",
     "ja": "マッコリ",
     "vi": "Rượu gạo"
    }
   }
  ]
 }
];
