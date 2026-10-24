// 천안 이발관(마사지) 天安理发店 Cheon An BarberShop (66 P Lương Thế Vinh, Kinh Bắc, Bắc Ninh) 메뉴 데이터 — 이발관·마사지
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND(팁 포함, 선불)
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/천안 이발관"(사진 수집기 v1.6, 사진 33장 전부 '기타'로 분류됨 — 실제로는 간판·실내·가격표·로고). 가격은 **가게 계정이 올린 한국어 가격표(etc_24: 팁 포함·선불)** 기준.
// 다른 가격표 사진(etc_14·19: 총액 550,000 = 마사지 350,000 + 팁 200,000 등 / etc_16·22 중국어 옛 가격표: 일반룸 400,000·VIP 500,000·커트 200,000·염색 300,000)은 판이 달라 쓰지 않았다 — docs/todo.md.
// 항목 사진은 매장 실내 사진(서비스 사진이 아님).
window.RESTAURANT = {
  brand: { ko: "천안 이발관", en: "Cheon An BarberShop", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0866 431 006",
  address: "66 P. Lương Thế Vinh, Kinh Bắc, Bắc Ninh",
  mapQuery: "천안 이발관 天安理发店 Cheon An BarberShop 66 P. Lương Thế Vinh Kinh Bắc Bắc Ninh",
  mapUrl: "https://www.google.com/maps/place/%EC%B2%9C%EC%95%88+%EC%9D%B4%EB%B0%9C%EA%B4%80(%EB%A7%88%EC%82%AC%EC%A7%80)%E5%A4%A9%E5%AE%89+%E7%90%86%E5%8F%91%E5%BA%97(%E6%8C%89%E6%91%A9)Cheon+An+BarberShop/@21.1738933,106.0547668,17z/data=!3m1!4b1!4m6!3m5!1s0x31350f006cd9799b:0x99742b09b7277f1d!8m2!3d21.1738933!4d106.0547668!16s%2Fg%2F11vy8wvqpd",
  wifi: null, // 예: { ssid: "...", password: "..." }
};

window.MENU = [
 {
  "id": "massage",
  "name": {
   "ko": "마사지 코스",
   "en": "Massage Courses",
   "zh": "按摩套餐",
   "ja": "マッサージコース",
   "vi": "Liệu trình massage"
  },
  "note": {
   "ko": "팁 포함 · 선불이에요. 마사지 관리를 받으면 이발은 무료! 프리미엄 120분 이용 시 핫스톤 서비스가 있어요.",
   "en": "Tip included · pay in advance. Free haircut with any massage! Hot-stone service with Premium 120 min.",
   "zh": "含小费 · 请提前付款。做按摩即可免费理发!选择尊享套餐120分钟赠送热石服务。",
   "ja": "チップ込み・前払いです。マッサージ施術で理髪が無料!プレミアム120分はホットストーン付きです。",
   "vi": "Đã gồm tip · trả trước. Miễn phí cắt tóc khi làm massage! Gói Premium 120 phút có dịch vụ đá nóng (hot stone)."
  },
  "items": [
   {
    "tag": "must",
    "photo": "img/premium.jpg",
    "sizes": [
     [
      {
       "ko": "90분",
       "en": "90 min",
       "zh": "90分钟",
       "ja": "90分",
       "vi": "90 phút"
      },
      500000
     ],
     [
      {
       "ko": "120분",
       "en": "120 min",
       "zh": "120分钟",
       "ja": "120分",
       "vi": "120 phút"
      },
      700000
     ]
    ],
    "name": {
     "ko": "프리미엄",
     "en": "Premium",
     "zh": "至尊套餐",
     "ja": "プレミアム",
     "vi": "Premium"
    }
   },
   {
    "photo": "img/scrub.jpg",
    "sizes": [
     [
      {
       "ko": "90분",
       "en": "90 min",
       "zh": "90分钟",
       "ja": "90分",
       "vi": "90 phút"
      },
      700000
     ],
     [
      {
       "ko": "120분",
       "en": "120 min",
       "zh": "120分钟",
       "ja": "120分",
       "vi": "120 phút"
      },
      900000
     ]
    ],
    "name": {
     "ko": "프리미엄 & 발각질",
     "en": "Premium & Foot Scrub",
     "zh": "至尊按摩&脚部去死皮",
     "ja": "プレミアム&足の角質ケア",
     "vi": "Premium & tẩy da chết chân"
    }
   },
   {
    "price": 1000000,
    "photo": "img/fourhand.jpg",
    "unit": {
     "ko": "90분",
     "en": "90 min",
     "zh": "90分钟",
     "ja": "90分",
     "vi": "90 phút"
    },
    "name": {
     "ko": "4핸드",
     "en": "4-Hand Massage",
     "zh": "四手按摩",
     "ja": "4ハンドマッサージ",
     "vi": "Massage 4 tay"
    }
   }
  ]
 },
 {
  "id": "hair",
  "name": {
   "ko": "이발 · 염색",
   "en": "Haircut & Coloring",
   "zh": "理发 · 染发",
   "ja": "カット・カラー",
   "vi": "Cắt tóc · Nhuộm"
  },
  "note": {
   "ko": "마사지 관리를 받으시면 이발은 무료예요.",
   "en": "Haircut is free with any massage.",
   "zh": "做按摩后理发免费。",
   "ja": "マッサージ施術で理髪は無料です。",
   "vi": "Miễn phí cắt tóc khi làm massage."
  },
  "items": [
   {
    "price": 100000,
    "photo": "img/cut.jpg",
    "name": {
     "ko": "커트",
     "en": "Haircut",
     "zh": "理发",
     "ja": "カット",
     "vi": "Cắt tóc"
    }
   },
   {
    "price": 200000,
    "photo": "img/color.jpg",
    "name": {
     "ko": "염색",
     "en": "Hair Coloring",
     "zh": "染发",
     "ja": "カラー",
     "vi": "Nhuộm tóc"
    }
   }
  ]
 }
];
