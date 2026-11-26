// OBC Chicken 메뉴 데이터 — 출처: 구글 지도 업로드 메뉴판 사진 21장(2026-11-26)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만 — 정사각형이면 양옆 흰 여백)
// 메뉴판 사진끼리 가격이 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "OBC 치킨", en: "OBC CHICKEN" },
  phone: "0338280005",
  address: "Vinhomes Skylake, S3 Đường Phạm Hùng, Cầu Giấy, Hà Nội",
  wifi: null,
  hours: "11:00 – 23:59",
};

window.MENU = [
  {
    "id": "combo",
    "name": {
      "ko": "세트 · 콤보",
      "en": "Sets & Combos",
      "zh": "套餐 · 组合",
      "ja": "セット・コンボ",
      "vi": "Set & Combo"
    },
    "note": {
      "ko": "치킨은 윙&봉 선택 시 +20,000동",
      "en": "Choose wings & drumsticks for +20,000 VND",
      "zh": "选择鸡翅和鸡腿需加 20,000 越南盾",
      "ja": "手羽&ドラムを選ぶ場合 +20,000ドン",
      "vi": "Chọn cánh gà thêm 20.000 đồng"
    },
    "items": [
      {
        "name": {
          "ko": "OBC 콤보 1 (치킨 + 감자튀김 또는 고구마치즈스틱 + 짜계치 또는 치즈오븐떡볶이)",
          "en": "OBC Combo 1 (Chicken + French Fries or Sweet Potato Cheese Sticks + Black Noodles or Cheese Tteokbokki)",
          "zh": "OBC 组合1(炸鸡 + 薯条或芝士红薯条 + 炸酱面或芝士烤年糕)",
          "ja": "OBCコンボ1(チキン + フライドポテトまたはチーズさつまいもスティック + ジャジェチ(チャジャン麺)またはチーズオーブントッポッキ)",
          "vi": "OBC Combo 1 (Gà + Khoai tây chiên hoặc Khoai lang phô mai + Mỳ tương đen hoặc Ttokboki phô mai)"
        },
        "price": 539000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "OBC 콤보 2 (치킨 + 주전자 꼬치 오뎅탕 또는 스팸김치찌개 + 감자튀김 또는 고구마치즈스틱)",
          "en": "OBC Combo 2 (Chicken + Fish Cake Soup or Spam Kimchi Stew + French Fries or Sweet Potato Cheese Sticks)",
          "zh": "OBC 组合2(炸鸡 + 壶装鱼饼串汤或午餐肉泡菜汤 + 薯条或芝士红薯条)",
          "ja": "OBCコンボ2(チキン + やかんおでん串スープまたはスパムキムチチゲ + フライドポテトまたはチーズさつまいもスティック)",
          "vi": "OBC Combo 2 (Gà + Siêu chả cá hoặc Canh kim chi thịt hộp + Khoai tây chiên hoặc Khoai lang phô mai)"
        },
        "price": 649000
      },
      {
        "name": {
          "ko": "OBC 세트 1 (치킨 + 스팸김치찌개 또는 꼬치 오뎅탕 + 감자튀김 또는 고구마치즈스틱)",
          "en": "OBC Set 1 (Chicken + Spam Kimchi Stew or Fish Cake Soup + French Fries or Sweet Potato Cheese Sticks)",
          "zh": "OBC 套餐1(炸鸡 + 午餐肉泡菜汤或鱼饼串汤 + 薯条或芝士红薯条)",
          "ja": "OBCセット1(チキン + スパムキムチチゲまたはおでん串スープ + フライドポテトまたはチーズさつまいもスティック)",
          "vi": "OBC Set 1 (Gà rán OBC + Canh kim chi thịt hộp hoặc canh xiên chả cá + Khoai tây chiên hoặc khoai lang phô mai que)"
        },
        "price": 599000
      },
      {
        "name": {
          "ko": "OBC 세트 2 (치킨 + 짜계치 또는 치즈오븐떡볶이 + 감자튀김 또는 고구마치즈스틱)",
          "en": "OBC Set 2 (Chicken + Black Noodles or Cheese Tteokbokki + French Fries or Sweet Potato Cheese Sticks)",
          "zh": "OBC 套餐2(炸鸡 + 炸酱面或芝士烤年糕 + 薯条或芝士红薯条)",
          "ja": "OBCセット2(チキン + ジャジェチ(チャジャン麺)またはチーズオーブントッポッキ + フライドポテトまたはチーズさつまいもスティック)",
          "vi": "OBC Set 2 (Gà rán OBC + Mỳ đen hoặc Ttokboki phô mai + Khoai tây chiên hoặc khoai lang phô mai que)"
        },
        "price": 499000
      }
    ]
  },
  {
    "id": "roast",
    "name": {
      "ko": "로스트 치킨 (오븐구이)",
      "en": "Roast Chicken (Oven-baked)",
      "zh": "烤鸡(烤箱烤制)",
      "ja": "ローストチキン(オーブン焼き)",
      "vi": "Gà nướng oven"
    },
    "note": {
      "ko": "가격: 뼈·순살 / 윙&봉. 소스 2가지 선택: 허니머스타드·마요와사비·스윗칠리·양념치킨소스·레드핫·스테이크소스·데리야키",
      "en": "Price: bone-in·boneless / wings & drumsticks. Choose 2 sauces: Honey Mustard · Wasabi Mayo · Sweet Chili · Sweet & Spicy · Red Hot · Steak · Teriyaki",
      "zh": "价格:带骨·去骨 / 鸡翅&鸡腿。可选2种酱:蜂蜜芥末·蛋黄酱芥末·甜辣椒·韩式甜辣酱·红辣酱·牛排酱·照烧",
      "ja": "価格:骨付き・骨なし / 手羽&ドラム。ソース2種選択:ハニーマスタード・わさびマヨ・スイートチリ・ヤンニョムソース・レッドホット・ステーキソース・照り焼き",
      "vi": "Giá: có xương·rút xương / cánh. Chọn 2 loại xốt: Honey mustard · Mayo wasabi · Sweet chili · Ngọt cay · Cay nồng · Bít tết · Teriyaki"
    },
    "items": [
      {
        "name": {
          "ko": "로스트그릴",
          "en": "Roast Grilled Chicken",
          "zh": "烤箱烤鸡(Roast Grill)",
          "ja": "ローストグリル",
          "vi": "Gà Grilled nướng oven"
        },
        "sizes": [
          [
            "Bone/Boneless",
            360000
          ],
          [
            "Wing",
            380000
          ]
        ],
        "tag": "best"
      },
      {
        "name": {
          "ko": "블랙알리오 로스트",
          "en": "Black Alio Roast Chicken",
          "zh": "黑蒜烤鸡",
          "ja": "ブラックアリオ ロースト",
          "vi": "Gà nướng oven sốt black alio"
        },
        "sizes": [
          [
            "Bone/Boneless",
            380000
          ],
          [
            "Wing",
            400000
          ]
        ],
        "photo": "img/blackalio.jpg"
      },
      {
        "name": {
          "ko": "매운 블랙알리오 로스트",
          "en": "Spicy Black Alio Roast Chicken",
          "zh": "辣味黑蒜烤鸡",
          "ja": "辛いブラックアリオ ロースト",
          "vi": "Gà nướng oven sốt black alio cay"
        },
        "sizes": [
          [
            "Bone/Boneless",
            380000
          ],
          [
            "Wing",
            400000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "고추와사비마요 로스트",
          "en": "Pepper Wasabi Mayo Roast Chicken",
          "zh": "辣椒芥末蛋黄酱烤鸡",
          "ja": "唐辛子わさびマヨ ロースト",
          "vi": "Gà nướng oven sốt Mayonnaise & Mù tạt"
        },
        "sizes": [
          [
            "Bone/Boneless",
            380000
          ],
          [
            "Wing",
            400000
          ]
        ]
      },
      {
        "name": {
          "ko": "레드핫 로스트",
          "en": "Red Hot Roast Chicken",
          "zh": "红辣烤鸡(Red Hot)",
          "ja": "レッドホット ロースト",
          "vi": "Gà nướng oven sốt vị cay nồng"
        },
        "sizes": [
          [
            "Bone/Boneless",
            380000
          ],
          [
            "Wing",
            400000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "로스트 파닭 (순살)",
          "en": "Roast Green Onion Chicken (Boneless)",
          "zh": "烤葱香鸡(去骨)",
          "ja": "ローストパダク(ネギチキン・骨なし)",
          "vi": "Đùi gà rút xương nướng oven & hành"
        },
        "price": 380000
      },
      {
        "name": {
          "ko": "요거트 크런치 그릴샐러드",
          "en": "Yogurt Crunch Grill Salad",
          "zh": "酸奶脆香烤鸡沙拉",
          "ja": "ヨーグルトクランチ グリルサラダ",
          "vi": "Sa lát Yogurt & gà OBC nướng oven"
        },
        "price": 440000,
        "tag": "special"
      }
    ]
  },
  {
    "id": "crunch",
    "name": {
      "ko": "크런치 치킨",
      "en": "Crunch Chicken",
      "zh": "脆皮鸡",
      "ja": "クランチチキン",
      "vi": "Gà Crunch"
    },
    "note": {
      "ko": "가격: 순살 / 윙&봉",
      "en": "Price: boneless / wings & drumsticks",
      "zh": "价格:去骨 / 鸡翅&鸡腿",
      "ja": "価格:骨なし / 手羽&ドラム",
      "vi": "Giá: rút xương / cánh"
    },
    "items": [
      {
        "name": {
          "ko": "크런치",
          "en": "Crunch Chicken",
          "zh": "脆皮鸡(Crunch)",
          "ja": "クランチ",
          "vi": "Gà OBC nướng oven"
        },
        "sizes": [
          [
            "Boneless",
            360000
          ],
          [
            "Wing",
            380000
          ]
        ]
      },
      {
        "name": {
          "ko": "스위트 크런치 (양념치킨)",
          "en": "Sweet Crunch Chicken",
          "zh": "甜脆鸡(韩式甜辣酱)",
          "ja": "スイートクランチ(ヤンニョムチキン)",
          "vi": "Gà OBC nướng oven sốt ngọt"
        },
        "price": 380000
      },
      {
        "name": {
          "ko": "마늘간장 크런치",
          "en": "Garlic Soy Crunch Chicken",
          "zh": "蒜香酱油脆皮鸡",
          "ja": "ガーリックしょうゆクランチ",
          "vi": "Gà OBC oven sốt xì dầu tỏi ngọt"
        },
        "sizes": [
          [
            "Boneless",
            380000
          ],
          [
            "Wing",
            400000
          ]
        ]
      },
      {
        "name": {
          "ko": "눈꽃 시즈닝 크런치",
          "en": "Snowflake Seasoning Crunch Chicken",
          "zh": "雪花调味脆皮鸡",
          "ja": "雪花シーズニングクランチ",
          "vi": "Gà OBC oven rắc bột tuyết seasoning"
        },
        "sizes": [
          [
            "Boneless",
            380000
          ],
          [
            "Wing",
            400000
          ]
        ]
      },
      {
        "name": {
          "ko": "로스트·크런치 반반 (반마리씩 맛 선택)",
          "en": "Roast / Crunch Half & Half",
          "zh": "烤鸡·脆皮鸡各半(各半只可选口味)",
          "ja": "ロースト・クランチ ハーフ&ハーフ(半羽ずつ味を選択)",
          "vi": "Roast / Crunch nửa con mỗi loại (Half & Half)"
        },
        "price": 380000,
        "unit": "Wing +20K"
      },
      {
        "name": {
          "ko": "OBC 매콤 치즈 쫄닭 (3~4인)",
          "en": "OBC Spicy Cheese Chicken (3-4 pax)",
          "zh": "OBC 香辣芝士鸡(3~4人)",
          "ja": "OBC 辛口チーズチョルダク(3~4人前)",
          "vi": "Gà nướng phô mai cay OBC (3-4 người)"
        },
        "price": 519000,
        "tag": "special",
        "spicy": true
      }
    ]
  },
  {
    "id": "fried",
    "name": {
      "ko": "K 후라이드 치킨",
      "en": "K Fried Chicken",
      "zh": "韩式炸鸡",
      "ja": "Kフライドチキン",
      "vi": "Gà rán Hàn Quốc"
    },
    "note": {
      "ko": "기본 390,000동 · 윙&봉 +20,000 · 양념 선택(보통·매운·마늘간장·고추와사비마요·눈꽃시즈닝) +30,000",
      "en": "Base 390,000 VND · Wings & drumsticks +20,000 · Sauce (Sweet & Mild · Spicy · Garlic Soy · Chili Mayo Wasabi · Snow Cheese Seasoning) +30,000",
      "zh": "基本 390,000 越南盾 · 鸡翅&鸡腿 +20,000 · 选酱(普通·辣味·蒜香酱油·辣椒芥末蛋黄酱·雪花调味)+30,000",
      "ja": "基本 390,000ドン · 手羽&ドラム +20,000 · ソース選択(ノーマル・辛口・ガーリックしょうゆ・唐辛子わさびマヨ・雪花シーズニング)+30,000",
      "vi": "Giá gốc 390.000 đồng · Cánh +20.000 · Chọn xốt (ngọt · cay · xì dầu tỏi · ớt mayo mù tạt · bột phô mai) +30.000"
    },
    "items": [
      {
        "name": {
          "ko": "후라이드 치킨 (기본)",
          "en": "Fried Chicken (Original)",
          "zh": "炸鸡(原味)",
          "ja": "フライドチキン(オリジナル)",
          "vi": "Gà rán nguyên bản"
        },
        "price": 390000
      }
    ]
  },
  {
    "id": "side",
    "name": {
      "ko": "사이드 · 튀김",
      "en": "Sides",
      "zh": "小食 · 炸物",
      "ja": "サイド・揚げ物",
      "vi": "Món ăn kèm"
    },
    "items": [
      {
        "name": {
          "ko": "수제 고구마치즈스틱",
          "en": "Homemade Sweet Potato Cheese Sticks",
          "zh": "自制芝士红薯条",
          "ja": "自家製チーズさつまいもスティック",
          "vi": "Khoai lang phô mai que"
        },
        "price": 80000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "수제 감자튀김",
          "en": "Homemade French Fries",
          "zh": "自制薯条",
          "ja": "自家製フライドポテト",
          "vi": "Khoai tây tươi chiên giòn"
        },
        "price": 80000,
        "photo": "img/fries.jpg"
      },
      {
        "name": {
          "ko": "눈꽃치즈 감자튀김",
          "en": "Snowing Cheese French Fries",
          "zh": "雪花芝士薯条",
          "ja": "雪花チーズフライドポテト",
          "vi": "Khoai tây chiên bột phô mai tuyết hoa"
        },
        "price": 100000
      },
      {
        "name": {
          "ko": "오징어튀김",
          "en": "Fried Squid",
          "zh": "炸鱿鱼",
          "ja": "イカフライ",
          "vi": "Mực chiên"
        },
        "price": 80000
      },
      {
        "name": {
          "ko": "미니치즈볼 5p",
          "en": "Mini Cheese Balls (5 pcs)",
          "zh": "迷你芝士球 5个",
          "ja": "ミニチーズボール 5個",
          "vi": "Viên phô mai mini"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "치즈스틱 4p",
          "en": "Cheese Sticks (4 pcs)",
          "zh": "芝士条 4根",
          "ja": "チーズスティック 4本",
          "vi": "Que phô mai"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "치즈어묵튀김 6p",
          "en": "Cheese Fried Fish Cake (6 pcs)",
          "zh": "芝士鱼饼炸 6个",
          "ja": "チーズおでんフライ 6個",
          "vi": "Chả cá chiên phô mai"
        },
        "price": 70000
      },
      {
        "name": {
          "ko": "새우튀김 4p",
          "en": "Fried Shrimp (4 pcs)",
          "zh": "炸虾 4只",
          "ja": "エビフライ 4尾",
          "vi": "Tôm chiên"
        },
        "price": 70000
      },
      {
        "name": {
          "ko": "에그타르트 3p",
          "en": "Egg Tart (3 pcs)",
          "zh": "蛋挞 3个",
          "ja": "エッグタルト 3個",
          "vi": "Bánh trứng"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "단호박 치즈오븐구이",
          "en": "Cheese Oven-roasted Pumpkin",
          "zh": "芝士烤南瓜",
          "ja": "かぼちゃのチーズオーブン焼き",
          "vi": "Bí ngô nướng phô mai oven"
        },
        "price": 100000
      },
      {
        "name": {
          "ko": "요거트 아이스크림 샐러드",
          "en": "Yogurt Ice Cream Salad",
          "zh": "酸奶冰淇淋沙拉",
          "ja": "ヨーグルトアイスクリームサラダ",
          "vi": "Sa lát kem yogurt"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "꿀토마토",
          "en": "Honey Tomato",
          "zh": "蜂蜜番茄",
          "ja": "はちみつトマト",
          "vi": "Cà chua sốt mật ong"
        },
        "price": 70000
      }
    ]
  },
  {
    "id": "meal",
    "name": {
      "ko": "식사 · 안주",
      "en": "Meals & Anju",
      "zh": "主食 · 下酒菜",
      "ja": "食事・おつまみ",
      "vi": "Món chính & mồi nhậu"
    },
    "note": {
      "ko": "밥 1공기 추가 +25,000동 (계란후라이 함께)",
      "en": "Extra rice +25,000 VND (with fried egg)",
      "zh": "加一碗米饭 +25,000 越南盾(附煎蛋)",
      "ja": "ご飯1杯追加 +25,000ドン(目玉焼き付き)",
      "vi": "Thêm cơm +25.000 đồng (kèm trứng ốp la)"
    },
    "items": [
      {
        "name": {
          "ko": "치즈오븐떡볶이",
          "en": "Cheese Oven Tteokbokki",
          "zh": "芝士烤炒年糕",
          "ja": "チーズオーブントッポッキ",
          "vi": "Bánh gạo phô mai nướng oven"
        },
        "price": 120000,
        "photo": "img/tteokbokki.jpg"
      },
      {
        "name": {
          "ko": "짜계치",
          "en": "Jjagyechi (Black Noodles with Egg & Cheese)",
          "zh": "炸酱芝士蛋面(Jjagyechi)",
          "ja": "ジャジェチ(チャジャン麺・卵&チーズ)",
          "vi": "Mỳ trộn tương đen phô mai trứng"
        },
        "price": 120000,
        "photo": "img/jjagechi.jpg"
      },
      {
        "name": {
          "ko": "최루탄라면",
          "en": "Spicy Bomb Noodles",
          "zh": "催泪弹辣面",
          "ja": "催涙弾ラーメン(激辛ラーメン)",
          "vi": "Mỳ cay Hàn Quốc"
        },
        "price": 100000,
        "spicy": true
      },
      {
        "name": {
          "ko": "콘치즈 불닭볶음면",
          "en": "Corn Cheese Hot Chicken Ramen",
          "zh": "玉米芝士火鸡面",
          "ja": "コーンチーズ プルダック炒め麺",
          "vi": "Mỳ phô mai gà cay Hàn Quốc"
        },
        "price": 120000,
        "spicy": true
      },
      {
        "name": {
          "ko": "치즈 닭갈비 볶음밥",
          "en": "Cheese Dakgalbi Fried Rice",
          "zh": "芝士鸡排炒饭",
          "ja": "チーズタッカルビ チャーハン",
          "vi": "Cơm gà rang phô mai"
        },
        "price": 140000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "비빔냉면",
          "en": "Spicy Cold Noodles",
          "zh": "拌冷面",
          "ja": "ビビン冷麺",
          "vi": "Mì lạnh trộn"
        },
        "price": 120000,
        "spicy": true
      },
      {
        "name": {
          "ko": "비빔무침만두",
          "en": "Spicy Mixed Dumplings",
          "zh": "拌饺子",
          "ja": "ビビンムチム餃子(辛い和え餃子)",
          "vi": "Sủi cảo trộn cay"
        },
        "price": 180000,
        "spicy": true
      },
      {
        "name": {
          "ko": "골뱅이소면무침",
          "en": "Spicy Sea Snail Noodles",
          "zh": "拌海螺面线",
          "ja": "ゴルベンイ ソミョン和え(辛いつぶ貝そうめん)",
          "vi": "Mì trộn ốc hương"
        },
        "price": 330000,
        "spicy": true
      },
      {
        "name": {
          "ko": "스팸김치찌개",
          "en": "Spam Kimchi Stew",
          "zh": "午餐肉泡菜汤",
          "ja": "スパムキムチチゲ",
          "vi": "Canh kim chi thịt hộp"
        },
        "price": 199000
      },
      {
        "name": {
          "ko": "주전자 꼬치 오뎅탕",
          "en": "Kettle Fish Cake Skewer Soup",
          "zh": "壶装鱼饼串汤",
          "ja": "やかんおでん串スープ",
          "vi": "Siêu chả cá xiên"
        },
        "price": 200000,
        "photo": "img/odeng.jpg"
      },
      {
        "name": {
          "ko": "매콤 똥집볶음",
          "en": "Spicy Stir-fried Gizzard",
          "zh": "香辣炒鸡胗",
          "ja": "辛口鶏砂肝炒め",
          "vi": "Mề gà xào cay"
        },
        "price": 240000,
        "spicy": true
      },
      {
        "name": {
          "ko": "자가 두부김치",
          "en": "Homemade Tofu Kimchi Stir-fry",
          "zh": "自制豆腐泡菜",
          "ja": "自家製豆腐キムチ",
          "vi": "Kim chi đậu phụ"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "먹태",
          "en": "Dried Pollack",
          "zh": "干明太鱼(Meoktae)",
          "ja": "モクテ(干しスケトウダラ)",
          "vi": "Cá khô nướng Hàn Quốc"
        },
        "price": 300000
      },
      {
        "name": {
          "ko": "한치 & 땅콩",
          "en": "Semi-dried Squid & Peanuts",
          "zh": "半干鱿鱼 & 花生",
          "ja": "干しイカ(ハンチ)&ピーナッツ",
          "vi": "Mực nướng than hoa & đậu phộng"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "OBC 꼬치 7종",
          "en": "OBC Skewers (7 types)",
          "zh": "OBC 烤串7种",
          "ja": "OBC 串焼き7種",
          "vi": "Thịt xiên nướng OBC"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "깻잎 육회",
          "en": "Korean Raw Beef with Perilla",
          "zh": "紫苏叶生牛肉(Yukhoe)",
          "ja": "エゴマの葉 ユッケ",
          "vi": "Gỏi bò sống"
        },
        "price": 350000
      },
      {
        "name": {
          "ko": "육전",
          "en": "Korean Beef Pancake",
          "zh": "韩式牛肉煎饼(Yukjeon)",
          "ja": "ユクチョン(韓国式牛肉チヂミ)",
          "vi": "Bánh thịt bò chiên"
        },
        "price": 350000
      }
    ]
  },
  {
    "id": "lunch",
    "name": {
      "ko": "런치 메뉴 (11~16시)",
      "en": "Lunch (11:00-16:00)",
      "zh": "午餐菜单(11~16点)",
      "ja": "ランチメニュー(11~16時)",
      "vi": "Thực đơn trưa (11h-16h)"
    },
    "items": [
      {
        "name": {
          "ko": "소고기 비빔밥",
          "en": "Beef Bibimbap",
          "zh": "牛肉拌饭",
          "ja": "牛肉ビビンバ",
          "vi": "Cơm trộn thịt bò"
        },
        "price": 130000
      },
      {
        "name": {
          "ko": "소불고기",
          "en": "Beef Bulgogi",
          "zh": "牛肉烤肉(Bulgogi)",
          "ja": "牛プルコギ",
          "vi": "Bulgogi bò"
        },
        "price": 170000
      },
      {
        "name": {
          "ko": "김치찌개 / 청국장",
          "en": "Kimchi Stew / Doenjang Stew",
          "zh": "泡菜汤 / 清曲酱汤",
          "ja": "キムチチゲ / チョングッチャン",
          "vi": "Canh kim chi / tương đậu"
        },
        "price": 160000
      },
      {
        "name": {
          "ko": "부대찌개",
          "en": "Budae Jjigae (Army Stew)",
          "zh": "部队锅(Budae Jjigae)",
          "ja": "プデチゲ(部隊鍋)",
          "vi": "Canh quân đội"
        },
        "price": 210000
      }
    ]
  },
  {
    "id": "drinks",
    "name": {
      "ko": "주류 · 음료",
      "en": "Drinks",
      "zh": "酒类 · 饮品",
      "ja": "お酒・ドリンク",
      "vi": "Đồ uống"
    },
    "items": [
      {
        "name": {
          "ko": "소주 (참이슬·처음처럼·진로·새로)",
          "en": "Soju (Chamisul · Chum-churum · Jinro · Saero)",
          "zh": "烧酒(참이슬 Chamisul·처음처럼 Chum-churum·진로 Jinro·새로 Saero)",
          "ja": "焼酎(チャミスル・チョウムチョロム・ジンロ・セロ)",
          "vi": "Soju (Chamisul · Chumchurum · Jinro · Sero)"
        },
        "price": 140000
      },
      {
        "name": {
          "ko": "과일 이슬 (자몽·청포도·자두)",
          "en": "Fruit Chamisul (Grapefruit · Green Grape · Plum)",
          "zh": "水果烧酒 Chamisul(葡萄柚·青葡萄·李子)",
          "ja": "フルーツチャミスル(グレープフルーツ・青ブドウ・プラム)",
          "vi": "Soju Cham-iseul trái cây (Bưởi · Nho xanh · Mận)"
        },
        "price": 140000
      },
      {
        "name": {
          "ko": "타이거 맥주",
          "en": "Tiger Beer",
          "zh": "虎牌啤酒",
          "ja": "タイガービール",
          "vi": "Bia Tiger"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "사이공 맥주",
          "en": "Saigon Beer",
          "zh": "西贡啤酒",
          "ja": "サイゴンビール",
          "vi": "Bia Sài Gòn"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "드래프트 삿포로 맥주",
          "en": "Sapporo Draft Beer",
          "zh": "札幌生啤",
          "ja": "サッポロ生ビール",
          "vi": "Bia tươi Sapporo"
        },
        "price": 70000
      },
      {
        "name": {
          "ko": "국순당 생막걸리",
          "en": "Guksundang Draft Makgeolli",
          "zh": "国纯堂生米酒(Makgeolli)",
          "ja": "国順堂 生マッコリ",
          "vi": "Rượu gạo Guksundang"
        },
        "price": 160000
      },
      {
        "name": {
          "ko": "레몬 하이볼",
          "en": "Lemon Highball",
          "zh": "柠檬嗨棒(Highball)",
          "ja": "レモンハイボール",
          "vi": "Highball chanh"
        },
        "price": 100000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "얼그레이 하이볼",
          "en": "Earl Grey Highball",
          "zh": "伯爵茶嗨棒",
          "ja": "アールグレイハイボール",
          "vi": "Highball trà Earl Grey"
        },
        "price": 100000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "산딸기 하이볼",
          "en": "Raspberry Highball",
          "zh": "覆盆子嗨棒",
          "ja": "ラズベリーハイボール",
          "vi": "Highball dâu tây"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "망고 하이볼",
          "en": "Mango Highball",
          "zh": "芒果嗨棒",
          "ja": "マンゴーハイボール",
          "vi": "Highball xoài"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "스무디 (망고·딸기·아보카도)",
          "en": "Smoothie (Mango · Strawberry · Avocado)",
          "zh": "冰沙(芒果·草莓·牛油果)",
          "ja": "スムージー(マンゴー・いちご・アボカド)",
          "vi": "Sinh tố (Xoài · Dâu tây · Bơ)"
        },
        "price": 70000
      },
      {
        "name": {
          "ko": "생과일 주스 (수박·메론·오렌지)",
          "en": "Fresh Juice (Watermelon · Melon · Orange)",
          "zh": "鲜榨果汁(西瓜·哈密瓜·橙子)",
          "ja": "生搾りジュース(スイカ・メロン・オレンジ)",
          "vi": "Nước ép (Dưa hấu · Dưa vàng · Cam)"
        },
        "price": 70000
      },
      {
        "name": {
          "ko": "아메리카노 (핫/아이스)",
          "en": "Americano (Hot/Iced)",
          "zh": "美式咖啡(热/冰)",
          "ja": "アメリカーノ(ホット/アイス)",
          "vi": "Americano nóng/đá"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "연유커피",
          "en": "Condensed Milk Coffee",
          "zh": "炼乳咖啡",
          "ja": "コンデンスミルクコーヒー",
          "vi": "Bạc xỉu"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "코코넛커피",
          "en": "Coconut Coffee",
          "zh": "椰子咖啡",
          "ja": "ココナッツコーヒー",
          "vi": "Cà phê cốt dừa"
        },
        "price": 70000
      },
      {
        "name": {
          "ko": "음료수",
          "en": "Soft Drink",
          "zh": "汽水饮料",
          "ja": "ソフトドリンク",
          "vi": "Nước ngọt"
        },
        "price": 30000
      },
      {
        "name": {
          "ko": "물",
          "en": "Water",
          "zh": "水",
          "ja": "お水",
          "vi": "Nước suối"
        },
        "price": 20000
      }
    ]
  }
];
