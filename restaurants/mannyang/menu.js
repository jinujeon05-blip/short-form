// 만냥포차 (Bắc Ninh) 메뉴 데이터 — 한국식 포차(안주·탕·튀김)
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/만냥포차"(사진 수집기 v1.6, 사진 31장: 메뉴판 4·음식 18·기타 9) — 전부 손님이 올린 사진(가게 계정 사진 없음).
// 가격은 사진 메뉴판 중 **사진이 들어간 새 디자인판(menu_04)** 기준. menu_01(옛 디자인으로 보임)은 일부 가격이 달라(순살치킨 180·진미채 180·번데기탕 100·설탕토마토 60·계란찜 80·떡볶이 150·백골뱅이탕/짬뽕탕 280 등) 쓰지 않았고, 거기에만 있는 '먹태 구이 200K'는 뺐다 — docs/todo.md.
// 항목 사진은 손님이 올린 음식 사진(food_NN) 중 메뉴판의 그 요리와 같은 것만 썼다(2026-10-24 화질 문제로 교체). 맞는 고화질 사진이 없는 5개(닭똥집·가브리살·쥐포·열빙어·번데기탕)는 사진을 뺐다. 냉제육은 menu_03, 맨 위 사진은 가게 정문 사진(etc_01).
window.RESTAURANT = {
  brand: { ko: "만냥포차", en: "Man Nyang Pocha", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0392 531 302",
  address: "174 Đ. Hoàng Hoa Thám, Võ Cường, Bắc Ninh",
  mapQuery: "만냥포차 174 Đ. Hoàng Hoa Thám Võ Cường Bắc Ninh",
  mapUrl: "https://www.google.com/maps/place/%EB%A7%8C%EB%83%A5%ED%8F%AC%EC%B0%A8/@21.1712468,106.0568324,17z/data=!3m1!4b1!4m6!3m5!1s0x31350900039c3341:0xb81f884cd20c0966!8m2!3d21.1712468!4d106.0568324!16s%2Fg%2F11zcv_2hb7",
  wifi: null, // 예: { ssid: "MANNYANG", password: "12345678" }
};

window.MENU = [
 {
  "id": "soup",
  "name": {
   "ko": "탕 · 찌개",
   "en": "Soups & Stews",
   "zh": "汤 · 锅",
   "ja": "鍋 · スープ",
   "vi": "Canh · Lẩu"
  },
  "items": [
   {
    "price": 250000,
    "tag": "best",
    "photo": "img/jjambbong.jpg",
    "name": {
     "ko": "해물짬뽕탕",
     "en": "Spicy Seafood Jjambbong Soup",
     "zh": "海鲜辣炒码汤",
     "ja": "海鮮チャンポンタン",
     "vi": "Canh hải sản cay Jjambbong"
    }
   },
   {
    "price": 250000,
    "photo": "img/odeng.jpg",
    "name": {
     "ko": "오뎅탕",
     "en": "Fish Cake Soup",
     "zh": "鱼饼汤",
     "ja": "おでん鍋",
     "vi": "Canh Chả Cá"
    }
   },
   {
    "price": 280000,
    "tag": "must",
    "spicy": true,
    "photo": "img/dakbokk.jpg",
    "name": {
     "ko": "닭볶음탕 (반마리)",
     "en": "Spicy Braised Chicken Stew (half)",
     "zh": "辣炖鸡汤(半只)",
     "ja": "タッポックムタン(半羽)",
     "vi": "Gà Hầm Cay Nửa Con"
    }
   },
   {
    "price": 100000,
    "name": {
     "ko": "소곱창 추가",
     "en": "Extra Beef Intestines",
     "zh": "加牛小肠",
     "ja": "牛ホルモン追加",
     "vi": "Thêm Lòng Bò"
    }
   },
   {
    "price": 250000,
    "tag": "must",
    "photo": "img/baekgol.jpg",
    "name": {
     "ko": "백골뱅이탕",
     "en": "Whelk Soup",
     "zh": "白骨螺汤",
     "ja": "ツブ貝鍋(ベクゴル)",
     "vi": "Canh Ốc Biển"
    }
   }
  ]
 },
 {
  "id": "stirfry",
  "name": {
   "ko": "볶음 · 구이",
   "en": "Stir-fried & Grilled",
   "zh": "炒菜 · 烧烤",
   "ja": "炒め物 · 焼き物",
   "vi": "Xào · Nướng"
  },
  "items": [
   {
    "price": 250000,
    "spicy": true,
    "photo": "img/jjukkumi.jpg",
    "name": {
     "ko": "쭈꾸미 볶음 & 중면",
     "en": "Spicy Stir-fried Baby Octopus & Noodles",
     "zh": "辣炒小章鱼配中面",
     "ja": "ジュクミ炒め＆中麺",
     "vi": "Bạch Tuộc Con Xào Cay & Mì Trung"
    }
   },
   {
    "price": 200000,
    "spicy": true,
    "photo": "img/kukmul.jpg",
    "name": {
     "ko": "국물닭발",
     "en": "Spicy Chicken Feet in Broth",
     "zh": "带汤辣鸡爪",
     "ja": "スープ鶏足(タッパル)",
     "vi": "Chân Gà Sốt Cay"
    }
   },
   {
    "price": 200000,
    "name": {
     "ko": "마늘 닭똥집 볶음",
     "en": "Garlic Stir-fried Chicken Gizzards",
     "zh": "蒜香炒鸡胗",
     "ja": "ニンニク砂肝炒め",
     "vi": "Mề Gà Xào Tỏi"
    }
   },
   {
    "price": 250000,
    "name": {
     "ko": "통마늘 가브리살 볶음",
     "en": "Stir-fried Pork Neck with Whole Garlic",
     "zh": "整蒜炒猪颈肉",
     "ja": "丸ニンニクとカブリ肉炒め",
     "vi": "Nạc nọng xào tỏi"
    }
   },
   {
    "price": 200000,
    "photo": "img/yeontan.jpg",
    "name": {
     "ko": "연탄불고기",
     "en": "Charcoal-grilled Marinated Pork",
     "zh": "炭火烤肉",
     "ja": "練炭プルコギ",
     "vi": "Thịt heo nướng than tổ ong"
    }
   }
  ]
 },
 {
  "id": "muchim",
  "name": {
   "ko": "무침 · 별미",
   "en": "Salads & Specialties",
   "zh": "凉拌 · 特色菜",
   "ja": "和え物 · 名物",
   "vi": "Trộn · Món đặc biệt"
  },
  "items": [
   {
    "price": 250000,
    "tag": "must",
    "photo": "img/naengjeyuk.jpg",
    "name": {
     "ko": "냉제육",
     "en": "Cold Boiled Pork Slices",
     "zh": "冷水煮猪肉",
     "ja": "冷やしポッサム(ネンジェユク)",
     "vi": "Thịt Lợn Luộc Lạnh"
    }
   },
   {
    "price": 200000,
    "spicy": true,
    "photo": "img/golbaengi.jpg",
    "name": {
     "ko": "골뱅이 무침 & 소면",
     "en": "Spicy Whelk Salad & Somen",
     "zh": "凉拌海螺配素面",
     "ja": "ツブ貝和え＆そうめん",
     "vi": "Ốc Biển Trộn Cay & Mì"
    }
   },
   {
    "price": 200000,
    "spicy": true,
    "name": {
     "ko": "구운 쥐포 & 야채무침",
     "en": "Grilled Filefish Jerky & Veggie Salad",
     "zh": "烤鱼干配蔬菜拌",
     "ja": "焼きカワハギ＆野菜和え",
     "vi": "Cá Bò Nướng"
    }
   },
   {
    "price": 200000,
    "spicy": true,
    "photo": "img/tteokbokki.jpg",
    "name": {
     "ko": "차돌 떡볶이",
     "en": "Beef Brisket Tteokbokki",
     "zh": "牛胸肉炒年糕",
     "ja": "チャドル(牛バラ)トッポッキ",
     "vi": "Bánh gạo cay chuẩn vị Hàn Quốc"
    }
   },
   {
    "price": 120000,
    "tag": "must",
    "spicy": true,
    "photo": "img/oi.jpg",
    "name": {
     "ko": "사천식 오이무침",
     "en": "Sichuan-style Cucumber Salad",
     "zh": "四川风味拌黄瓜",
     "ja": "四川風きゅうり和え",
     "vi": "Dưa chuột trộn cay kiểu Tứ Xuyên"
    }
   }
  ]
 },
 {
  "id": "fried",
  "name": {
   "ko": "튀김 · 전",
   "en": "Fried & Pancakes",
   "zh": "炸物 · 煎饼",
   "ja": "揚げ物 · チヂミ",
   "vi": "Chiên · Bánh xèo kiểu Hàn"
  },
  "items": [
   {
    "price": 170000,
    "tag": "must",
    "photo": "img/chicken.jpg",
    "name": {
     "ko": "바삭 치킨 (반마리)",
     "en": "Crispy Fried Chicken (half)",
     "zh": "酥脆炸鸡(半只)",
     "ja": "サクサクチキン(半羽)",
     "vi": "Gà Rán Nửa con"
    }
   },
   {
    "price": 200000,
    "name": {
     "ko": "순살 치킨 (반마리)",
     "en": "Boneless Fried Chicken (half)",
     "zh": "无骨炸鸡(半只)",
     "ja": "骨なしチキン(半羽)",
     "vi": "Gà rán không xương Nửa con"
    }
   },
   {
    "price": 200000,
    "tag": "must",
    "photo": "img/jinmi.jpg",
    "name": {
     "ko": "진미채 튀김",
     "en": "Fried Shredded Squid",
     "zh": "炸鱿鱼丝",
     "ja": "イカ糸の揚げ物",
     "vi": "Mực Xé Chiên"
    }
   },
   {
    "price": 200000,
    "name": {
     "ko": "알 꽉찬 열빙어 튀김",
     "en": "Fried Roe-filled Capelin",
     "zh": "满籽炸多春鱼",
     "ja": "子持ちシシャモ揚げ",
     "vi": "Cá trứng chiên"
    }
   },
   {
    "price": 200000,
    "photo": "img/buchu.jpg",
    "name": {
     "ko": "보리새우 부추전",
     "en": "Barley Shrimp & Chive Pancake",
     "zh": "大麦虾韭菜煎饼",
     "ja": "干しエビとニラのチヂミ",
     "vi": "Bánh hẹ tôm đồng rán"
    }
   },
   {
    "price": 200000,
    "photo": "img/gamja.jpg",
    "name": {
     "ko": "바삭 감자전",
     "en": "Crispy Potato Pancake",
     "zh": "酥脆土豆饼",
     "ja": "サクサクじゃがいもチヂミ",
     "vi": "Bánh khoai tây chiên giòn"
    }
   }
  ]
 },
 {
  "id": "extra",
  "name": {
   "ko": "추가 메뉴",
   "en": "Extras",
   "zh": "加点菜单",
   "ja": "追加メニュー",
   "vi": "Món phụ"
  },
  "note": {
   "ko": "공기밥 · 우동사리 · 라면사리가 있어요. 주먹밥도 가능해요.",
   "en": "White rice, extra udon and ramen noodles are available. Rice balls too.",
   "zh": "有米饭、乌冬面加料、拉面加料,也可以做饭团。",
   "ja": "ご飯・うどん・ラーメンの追加があります。おにぎりも可能です。",
   "vi": "Có cơm trắng, thêm mì Udon, mì tôm. Có cả cơm nắm."
  },
  "items": [
   {
    "price": 120000,
    "spicy": true,
    "photo": "img/udon.jpg",
    "name": {
     "ko": "얼큰 가락우동",
     "en": "Spicy Udon Noodle Soup",
     "zh": "辣味乌冬面汤",
     "ja": "ピリ辛うどん",
     "vi": "Mì Udon nước dùng cay"
    }
   },
   {
    "price": 100000,
    "photo": "img/gyeran.jpg",
    "name": {
     "ko": "화산 계란찜 (치즈)",
     "en": "Volcano Steamed Egg (cheese)",
     "zh": "火山蒸蛋(芝士)",
     "ja": "火山たまご蒸し(チーズ)",
     "vi": "Trứng Hấp Phô Mai"
    }
   },
   {
    "price": 80000,
    "name": {
     "ko": "번데기탕",
     "en": "Silkworm Pupae Soup",
     "zh": "蚕蛹汤",
     "ja": "ポンデギタン(蚕のさなぎ鍋)",
     "vi": "Canh Nhộng Tằm"
    }
   },
   {
    "price": 80000,
    "photo": "img/tomato.jpg",
    "name": {
     "ko": "추억의 설탕 토마토",
     "en": "Nostalgic Sugared Tomatoes",
     "zh": "怀旧糖渍番茄",
     "ja": "懐かしの砂糖トマト",
     "vi": "Cà chua ướp đường kiểu hoài niệm"
    }
   }
  ]
 }
];
