// 다방치킨 박닌본점 메뉴 — 출처: 구글 지도 메뉴판 사진(매장 태블릿 8/29·인쇄 메뉴판·가게 올림 2026-11-21 수집). 같은 메뉴 가격이 다르면 높은 쪽(docs/todo.md)
window.RESTAURANT = {
  brand: { ko: "다방치킨 박닌본점", en: "#DA BANG Chicken Bac Ninh" },
  phone: "0396600328",
  address: "6 P. Bùi Thị Xuân, Võ Cường, Bắc Ninh",
  wifi: null,
  hours: "16:00 – 24:00",
};

window.MENU = [
  {
    "id": "chicken",
    "items": [
      {
        "name": {
          "ko": "후라이드 (순살)",
          "en": "Fried Chicken (Boneless)",
          "zh": "无骨炸鸡腿",
          "ja": "フライドチキン(骨なし)",
          "vi": "Má đùi rút xương"
        },
        "price": 399600,
        "photo": "img/fried.jpg",
        "tag": "best"
      },
      {
        "name": {
          "ko": "양념",
          "en": "Sweet & Spicy Chicken (Yangnyeom)",
          "zh": "韩式甜酱炸鸡",
          "ja": "ヤンニョムチキン",
          "vi": "Gà sốt ngọt HQ"
        },
        "price": 399600,
        "photo": "img/yangnyeom.jpg"
      },
      {
        "name": {
          "ko": "매운양념",
          "en": "Hot & Spicy Chicken",
          "zh": "韩式辣酱炸鸡",
          "ja": "辛口ヤンニョムチキン",
          "vi": "Gà sốt cay HQ"
        },
        "price": 399600,
        "spicy": true
      },
      {
        "name": {
          "ko": "파닭 (와사비 소스)",
          "en": "Green Onion Chicken (Wasabi Sauce)",
          "zh": "葱香炸鸡(芥末酱)",
          "ja": "ネギチキン(わさびソース)",
          "vi": "Gà hành lá (sốt mù tạt)"
        },
        "price": 399600
      },
      {
        "name": {
          "ko": "고추마늘간장",
          "en": "Garlic Soy Chicken",
          "zh": "辣椒蒜酱鸡",
          "ja": "唐辛子ニンニク醤油チキン",
          "vi": "Gà sốt xì dầu tỏi ớt"
        },
        "price": 399600
      },
      {
        "name": {
          "ko": "스리라차 어니언",
          "en": "Sriracha Onion Chicken",
          "zh": "洋葱奶酱炸鸡",
          "ja": "スリラチャ・オニオンチキン",
          "vi": "Gà sốt kem hành"
        },
        "price": 399600
      },
      {
        "name": {
          "ko": "슈프림치킨",
          "en": "Supreme Chicken",
          "zh": "至尊炸鸡",
          "ja": "シュプリームチキン",
          "vi": "Gà Supreme"
        },
        "price": 399600
      },
      {
        "name": {
          "ko": "반반치킨 (순살)",
          "en": "Half & Half Chicken (Boneless)",
          "zh": "半半无骨炸鸡",
          "ja": "ハーフ&ハーフチキン(骨なし)",
          "vi": "Gà vị đôi"
        },
        "price": 399600
      },
      {
        "name": {
          "ko": "고추마요",
          "en": "Chili Mayo Chicken",
          "zh": "辣椒蛋黄酱炸鸡",
          "ja": "唐辛子マヨチキン",
          "vi": "Mayonnaise ớt"
        },
        "price": 340000
      },
      {
        "name": {
          "ko": "눈코찡 (와사비)",
          "en": "Wasabi Chicken",
          "zh": "芥末炸鸡",
          "ja": "わさびチキン",
          "vi": "Wasabi chicken"
        },
        "price": 340000
      },
      {
        "name": {
          "ko": "짭코바",
          "en": "Spicy BBQ Chicken",
          "zh": "BBQ烤鸡",
          "ja": "BBQチキン",
          "vi": "Gà nướng BBQ"
        },
        "price": 399600
      },
      {
        "name": {
          "ko": "로제짭코바",
          "en": "Rosé Spicy BBQ Chicken",
          "zh": "罗西BBQ烤鸡",
          "ja": "ロゼBBQチキン",
          "vi": "Gà nướng BBQ sốt rosé"
        },
        "price": 399600
      },
      {
        "name": {
          "ko": "슈프림 짭코바",
          "en": "Supreme BBQ",
          "zh": "至尊BBQ烤鸡",
          "ja": "シュプリームBBQチキン",
          "vi": "Supreme BBQ"
        },
        "price": 350000
      },
      {
        "name": {
          "ko": "반마리치킨 (순살)",
          "en": "Half Chicken (Boneless)",
          "zh": "半只鸡(无骨)",
          "ja": "ハーフチキン(骨なし)",
          "vi": "Nửa con gà"
        },
        "price": 216000
      },
      {
        "name": {
          "ko": "짭코바 반마리",
          "en": "Spicy BBQ Chicken (Half)",
          "zh": "BBQ烤鸡半只",
          "ja": "BBQチキン(ハーフ)",
          "vi": "Gà nướng BBQ nửa con"
        },
        "price": 216000
      },
      {
        "name": {
          "ko": "½ 오리지널 로스트",
          "en": "Original Roast (Half)",
          "zh": "原味烤鸡(半只)",
          "ja": "オリジナルローストチキン(ハーフ)",
          "vi": "Gà quay truyền thống (nửa con)"
        },
        "price": 183600
      },
      {
        "name": {
          "ko": "½ 고추바삭 로스트",
          "en": "Crispy Spicy Roast (Half)",
          "zh": "香辣脆皮烤鸡(半只)",
          "ja": "ピリ辛クリスピーロースト(ハーフ)",
          "vi": "Gà quay giòn cay (nửa con)"
        },
        "price": 237600
      }
    ],
    "name": {
      "ko": "다방치킨 (뼈/순살)",
      "en": "Dabang Chicken (Bone-in / Boneless)",
      "zh": "多方炸鸡(带骨/无骨)",
      "ja": "タバンチキン(骨付き/骨なし)",
      "vi": "Gà Dabang (có xương / rút xương)"
    }
  },
  {
    "id": "whole",
    "items": [
      {
        "name": {
          "ko": "옛날 통닭",
          "en": "Old-School Whole Fried Chicken",
          "zh": "整只炸鸡",
          "ja": "昔ながらの丸鶏フライ",
          "vi": "Gà chiên nguyên con"
        },
        "price": 291600
      },
      {
        "name": {
          "ko": "장작통닭 (수·금·토요일)",
          "en": "Wood-fired Whole Chicken (Wed·Fri·Sat)",
          "zh": "柴火烤整鸡(周三·五·六)",
          "ja": "薪焼き丸鶏(水・金・土曜)",
          "vi": "Gà nướng củi nguyên con (T4·T6·T7)"
        },
        "price": 250000,
        "photo": "img/jangjak.jpg",
        "tag": "special"
      },
      {
        "name": {
          "ko": "뽀드람 후라이드",
          "en": "Crispy Fried Chicken",
          "zh": "酥脆炸鸡",
          "ja": "サクサクフライドチキン",
          "vi": "Gà giòn thơm"
        },
        "price": 340000,
        "photo": "img/box.jpg"
      },
      {
        "name": {
          "ko": "윙봉 20조각",
          "en": "Chicken Wings 20 Pieces",
          "zh": "鸡翅 20块",
          "ja": "手羽 20個",
          "vi": "Cánh 20 miếng"
        },
        "price": 340000
      },
      {
        "name": {
          "ko": "윙봉반 (반마리)",
          "en": "Half Fried Chicken Wings",
          "zh": "半只炸鸡翅",
          "ja": "手羽ハーフ(半羽分)",
          "vi": "Gà cánh chiên nửa con"
        },
        "price": 216000
      },
      {
        "name": {
          "ko": "반반윙봉",
          "en": "Half & Half Wings & Drumsticks",
          "zh": "半半鸡翅鸡腿",
          "ja": "ハーフ&ハーフ手羽",
          "vi": "Gà cánh & đùi half-half"
        },
        "price": 399600
      },
      {
        "name": {
          "ko": "크리스피 윙봉",
          "en": "Crispy Wings",
          "zh": "炸鸡翅",
          "ja": "クリスピー手羽",
          "vi": "Cánh chiên giòn"
        },
        "price": 399600
      },
      {
        "name": {
          "ko": "간장 윙봉",
          "en": "Soy Sauce Wings",
          "zh": "酱油鸡翅",
          "ja": "醤油手羽",
          "vi": "Cánh gà xì dầu"
        },
        "price": 399600
      },
      {
        "name": {
          "ko": "허니 윙봉",
          "en": "Honey Wings",
          "zh": "蜜汁鸡翅",
          "ja": "ハニー手羽",
          "vi": "Cánh gà mật ong"
        },
        "price": 399600
      },
      {
        "name": {
          "ko": "레드 윙봉",
          "en": "Spicy Red Wings",
          "zh": "辣鸡翅",
          "ja": "レッド手羽(辛口)",
          "vi": "Cánh gà cay"
        },
        "price": 399600,
        "spicy": true
      }
    ],
    "name": {
      "ko": "통닭·윙봉",
      "en": "Whole Chicken & Wings",
      "zh": "整鸡·鸡翅",
      "ja": "丸鶏・手羽",
      "vi": "Gà nguyên con & Cánh gà"
    }
  },
  {
    "id": "set",
    "items": [
      {
        "name": {
          "ko": "윙봉떠까 세트",
          "en": "Wings & Tteok Set (4 Flavors)",
          "zh": "鸡翅年糕套餐(4种口味)",
          "ja": "手羽とトッポッキのセット(4種の味)",
          "vi": "Set cánh 4 vị"
        },
        "price": 380000
      },
      {
        "name": {
          "ko": "순살떠까 세트",
          "en": "Boneless Chicken & Tteok Set",
          "zh": "无骨鸡年糕套餐",
          "ja": "骨なしチキンとトッポッキのセット",
          "vi": "Set gà rút xương & tteok"
        },
        "price": 350000
      },
      {
        "name": {
          "ko": "TOK1 치떡 세트 (치킨+떡볶이)",
          "en": "TOK1 Chicken + Tteokbokki Set",
          "zh": "TOK1 炸鸡+辣炒年糕套餐",
          "ja": "TOK1 チキン+トッポッキセット",
          "vi": "Set TOK1 Gà + Tokbokki"
        },
        "price": 280000
      },
      {
        "name": {
          "ko": "TOK2 통떡 세트 (통닭+떡볶이)",
          "en": "TOK2 Whole Chicken + Tteokbokki Set",
          "zh": "TOK2 整鸡+辣炒年糕套餐",
          "ja": "TOK2 丸鶏+トッポッキセット",
          "vi": "Set TOK2 Gà nguyên con + Tokbokki"
        },
        "price": 280000
      },
      {
        "name": {
          "ko": "TOK3 윙떡 세트 (윙봉+떡볶이)",
          "en": "TOK3 Wings + Tteokbokki Set",
          "zh": "TOK3 鸡翅+辣炒年糕套餐",
          "ja": "TOK3 手羽+トッポッキセット",
          "vi": "Set TOK3 Cánh gà + Tokbokki"
        },
        "price": 280000
      }
    ],
    "name": {
      "ko": "세트메뉴",
      "en": "Set Menu",
      "zh": "套餐",
      "ja": "セットメニュー",
      "vi": "Set menu"
    }
  },
  {
    "id": "snack",
    "items": [
      {
        "name": {
          "ko": "다방 떡볶이",
          "en": "Classic Tteokbokki",
          "zh": "韩式辣炒年糕(微辣)",
          "ja": "タバンのトッポッキ(ちょい辛)",
          "vi": "Tokbokki cay nhẹ"
        },
        "price": 129600
      },
      {
        "name": {
          "ko": "가래떡 떡볶이",
          "en": "Garaetteok Tteokbokki",
          "zh": "粗年糕炒年糕",
          "ja": "カレトック(棒餅)トッポッキ",
          "vi": "Tokbokki bánh gạo to"
        },
        "price": 172800
      },
      {
        "name": {
          "ko": "로제떡볶이",
          "en": "Rosé Tteokbokki",
          "zh": "奶油辣酱年糕",
          "ja": "ロゼトッポッキ",
          "vi": "Tokbokki sốt kem cay"
        },
        "price": 172800
      },
      {
        "name": {
          "ko": "라볶이",
          "en": "Rabokki",
          "zh": "炒年糕拉面",
          "ja": "ラッポッキ",
          "vi": "Mì Tokbokki"
        },
        "price": 151200
      },
      {
        "name": {
          "ko": "쫄면",
          "en": "Spicy Chewy Noodles (Jjolmyeon)",
          "zh": "辣拌劲道面",
          "ja": "チョルミョン(辛い和え麺)",
          "vi": "Mì trộn cay dai"
        },
        "price": 90000,
        "spicy": true
      },
      {
        "name": {
          "ko": "비빔만두",
          "en": "Spicy Mixed Dumplings",
          "zh": "辣拌煎饺",
          "ja": "ピビム餃子(辛い和え)",
          "vi": "Há cảo chiên trộn cay"
        },
        "price": 200000,
        "spicy": true
      },
      {
        "name": {
          "ko": "어묵꼬치우동",
          "en": "Udon with Fish Cake Skewers",
          "zh": "鱼饼串乌冬面",
          "ja": "おでん串うどん",
          "vi": "Udon xiên chả cá"
        },
        "price": 97200
      },
      {
        "name": {
          "ko": "얼큰김치우동",
          "en": "Spicy Kimchi Udon",
          "zh": "辣泡菜乌冬面",
          "ja": "ピリ辛キムチうどん",
          "vi": "Udon kimchi cay"
        },
        "price": 97200,
        "spicy": true
      },
      {
        "name": {
          "ko": "간장계란밥",
          "en": "Soy Sauce Egg Rice",
          "zh": "酱油鸡蛋饭",
          "ja": "醤油卵ごはん",
          "vi": "Cơm trứng xì dầu"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "주먹밥",
          "en": "Rice Ball",
          "zh": "饭团",
          "ja": "おにぎり",
          "vi": "Cơm nắm"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "계란찜",
          "en": "Steamed Egg",
          "zh": "蒸蛋",
          "ja": "卵蒸し",
          "vi": "Trứng hấp"
        },
        "price": 40000
      },
      {
        "name": {
          "ko": "꼬마김밥",
          "en": "Mini Kimbap",
          "zh": "迷你紫菜包饭",
          "ja": "ミニキンパ",
          "vi": "Kimbap mini"
        },
        "price": 80000
      },
      {
        "name": {
          "ko": "매운꼬마김밥",
          "en": "Spicy Mini Kimbap",
          "zh": "辣味迷你紫菜包饭",
          "ja": "辛口ミニキンパ",
          "vi": "Kimbap mini cay"
        },
        "price": 100000,
        "spicy": true
      },
      {
        "name": {
          "ko": "고추튀김",
          "en": "Fried Green Chili",
          "zh": "炸青椒",
          "ja": "青唐辛子の揚げ物",
          "vi": "Ớt chiên"
        },
        "price": 30000
      },
      {
        "name": {
          "ko": "오징어튀김",
          "en": "Fried Squid",
          "zh": "炸鱿鱼",
          "ja": "イカの天ぷら",
          "vi": "Mực chiên giòn"
        },
        "price": 80000
      },
      {
        "name": {
          "ko": "미니 김말이",
          "en": "Mini Kimmari (Fried Seaweed Noodle Roll)",
          "zh": "迷你紫菜粉丝卷",
          "ja": "ミニキンマリ(春雨の海苔巻き揚げ)",
          "vi": "Chả rong biển mini (Kimmari)"
        },
        "price": 80000
      },
      {
        "name": {
          "ko": "고구마튀김",
          "en": "Sweet Potato Fritter",
          "zh": "炸红薯",
          "ja": "さつまいも天ぷら",
          "vi": "Khoai lang chiên"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "다방 핫도그",
          "en": "Dabang Hot Dog",
          "zh": "多方热狗",
          "ja": "タバンのハットグ",
          "vi": "Hot dog Dabang"
        },
        "price": 20000
      },
      {
        "name": {
          "ko": "모짜렐라 핫도그",
          "en": "Mozzarella Hot Dog",
          "zh": "马苏里拉热狗",
          "ja": "モッツァレラハットグ",
          "vi": "Hot dog Mozzarella"
        },
        "price": 30000
      }
    ],
    "name": {
      "ko": "분식",
      "en": "Korean Snacks",
      "zh": "韩式小吃",
      "ja": "韓国軽食(トッポッキなど)",
      "vi": "Đồ ăn vặt Hàn Quốc"
    }
  },
  {
    "id": "pizza",
    "items": [
      {
        "name": {
          "ko": "일반도우 반반피자",
          "en": "Regular Dough Half & Half Pizza",
          "zh": "普通饼底半半披萨",
          "ja": "レギュラー生地ハーフ&ハーフピザ",
          "vi": "Pizza nửa nửa đế thường"
        },
        "price": 324000
      },
      {
        "name": {
          "ko": "체다치즈 반반피자",
          "en": "Cheddar Cheese Half & Half Pizza",
          "zh": "车打芝士半半披萨",
          "ja": "チェダーチーズ ハーフ&ハーフピザ",
          "vi": "Pizza nửa nửa phô mai Cheddar"
        },
        "price": 367200
      },
      {
        "name": {
          "ko": "치즈크러스트 반반피자",
          "en": "Cheese Crust Half & Half Pizza",
          "zh": "芝士边半半披萨",
          "ja": "チーズクラスト ハーフ&ハーフピザ",
          "vi": "Pizza nửa nửa viền phô mai"
        },
        "price": 432000
      },
      {
        "name": {
          "ko": "치즈바이트 반반피자",
          "en": "Cheese Bite Half & Half Pizza",
          "zh": "芝士球边半半披萨",
          "ja": "チーズバイト ハーフ&ハーフピザ",
          "vi": "Pizza nửa nửa viền phô mai viên"
        },
        "price": 453600
      },
      {
        "name": {
          "ko": "리치골드 반반피자",
          "en": "Rich Gold Half & Half Pizza",
          "zh": "丰盛黄金半半披萨",
          "ja": "リッチゴールド ハーフ&ハーフピザ",
          "vi": "Pizza nửa nửa Rich Gold"
        },
        "price": 475200
      },
      {
        "name": {
          "ko": "고르곤졸라피자",
          "en": "Gorgonzola Pizza",
          "zh": "戈贡佐拉奶酪披萨",
          "ja": "ゴルゴンゾーラピザ",
          "vi": "Pizza Gorgonzola"
        },
        "price": 237600
      },
      {
        "name": {
          "ko": "치즈오븐스파게티",
          "en": "Cheese Oven-Baked Spaghetti",
          "zh": "芝士焗意大利面",
          "ja": "チーズオーブンスパゲティ",
          "vi": "Mì Ý đút lò phô mai"
        },
        "price": 172800
      },
      {
        "name": {
          "ko": "딥치즈&나쵸칩",
          "en": "Deep Cheese & Nacho Chips",
          "zh": "芝士酱蘸玉米片",
          "ja": "ディップチーズ&ナチョチップス",
          "vi": "Sốt phô mai & Nacho"
        },
        "price": 180000
      },
      {
        "name": {
          "ko": "폴드치킨 퀘사디아",
          "en": "Folded Chicken Quesadilla",
          "zh": "墨西哥鸡肉芝士饼",
          "ja": "フォールドチキン・ケサディーヤ",
          "vi": "Quesadilla gà gập"
        },
        "price": 190000
      },
      {
        "name": {
          "ko": "수박",
          "en": "Watermelon",
          "zh": "西瓜",
          "ja": "スイカ",
          "vi": "Dưa hấu"
        },
        "price": 97200
      }
    ],
    "name": {
      "ko": "피자·안주",
      "en": "Pizza & Side Dishes",
      "zh": "披萨·下酒菜",
      "ja": "ピザ・おつまみ",
      "vi": "Pizza & Đồ nhắm"
    }
  }
];
