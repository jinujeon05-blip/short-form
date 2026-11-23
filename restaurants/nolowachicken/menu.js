// 놀로와 치킨 Nollowa Chicken 메뉴 데이터 — 출처: 구글 지도에 올린 메뉴판 사진 44장 (2026-11-23 수집)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] (S=반 마리, L=한 마리) / 가격은 VAT 10% 별도
// 메뉴판 사진끼리 가격이 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "놀로와 치킨", en: "Nollowa Chicken" },
  phone: "0969790682",
  address: "BT 01 11, Khu đô thị Mỗ Lao, Hà Đông, Hà Nội",
  wifi: null,
  hours: "10:00 – 22:30",
};

window.MENU = [
  {
    "id": "best",
    "name": {
      "ko": "베스트 치킨",
      "en": "Best Chicken",
      "zh": "人气炸鸡",
      "ja": "ベストチキン",
      "vi": "Gà rán bán chạy"
    },
    "note": {
      "ko": "S = 반 마리, L = 한 마리 · 뼈 / 순살 선택 · 가격은 VAT 10% 별도",
      "en": "S = half, L = whole · bone-in or boneless · Prices exclude 10% VAT",
      "zh": "S = 半只，L = 整只 · 可选带骨/无骨 · 价格不含10% VAT",
      "ja": "S = 半羽、L = 1羽 · 骨付き/骨なしを選択 · 価格は別途VAT 10%",
      "vi": "S = nửa con, L = một con · Có xương hoặc không xương · Giá chưa gồm VAT 10%"
    },
    "items": [
      {
        "name": {
          "ko": "후라이드 치킨",
          "en": "Fried Chicken",
          "zh": "原味炸鸡",
          "ja": "フライドチキン",
          "vi": "Gà rán"
        },
        "sizes": [
          [
            "S",
            160000
          ],
          [
            "L",
            300000
          ]
        ],
        "photo": "img/fried.jpg",
        "tag": "best"
      },
      {
        "name": {
          "ko": "양념 치킨",
          "en": "Seasoned Sweet Chicken",
          "zh": "甜辣酱炸鸡",
          "ja": "ヤンニョムチキン",
          "vi": "Gà sốt cay ngọt"
        },
        "sizes": [
          [
            "S",
            170000
          ],
          [
            "L",
            320000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "뿌링클 치킨",
          "en": "Bburinkle Chicken",
          "zh": "布林克炸鸡 (Bburinkle)",
          "ja": "ブリンクルチキン",
          "vi": "Gà lắc bột phô mai"
        },
        "sizes": [
          [
            "S",
            170000
          ],
          [
            "L",
            320000
          ]
        ]
      },
      {
        "name": {
          "ko": "반반 치킨",
          "en": "Half & Half Chicken",
          "zh": "双拼炸鸡",
          "ja": "ハーフ&ハーフチキン",
          "vi": "Gà rán 2 vị"
        },
        "desc": {
          "ko": "후라이드·양념·뿌링클 중 2가지 선택",
          "en": "Choose 2 of Fried, Seasoned, Bburinkle",
          "zh": "原味、甜辣酱、布林克中任选2种",
          "ja": "フライド・ヤンニョム・ブリンクルから2種類選択",
          "vi": "Chọn 2 trong 3 vị: gà rán, gà sốt, gà lắc phô mai"
        },
        "price": 320000
      },
      {
        "name": {
          "ko": "순살 3종 치킨",
          "en": "Triple Sauce Boneless Chicken",
          "zh": "无骨三拼炸鸡",
          "ja": "骨なし3種チキン",
          "vi": "Gà viên mix 3 vị"
        },
        "price": 380000
      },
      {
        "name": {
          "ko": "어니언 치킨 (순살)",
          "en": "Onion Cream Chicken (Boneless)",
          "zh": "洋葱奶油炸鸡 (无骨)",
          "ja": "オニオンチキン (骨なし)",
          "vi": "Gà viên sốt kem hành"
        },
        "sizes": [
          [
            "S",
            170000
          ],
          [
            "L",
            320000
          ]
        ],
        "photo": "img/onion.jpg"
      },
      {
        "name": {
          "ko": "스리라차 어니언 치킨 (순살)",
          "en": "Sriracha Onion Chicken (Boneless)",
          "zh": "是拉差洋葱炸鸡 (无骨)",
          "ja": "スリラチャオニオンチキン (骨なし)",
          "vi": "Gà viên sốt kem hành Sriracha"
        },
        "sizes": [
          [
            "S",
            170000
          ],
          [
            "L",
            320000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "킹트리플 치킨",
          "en": "King Triple Chicken",
          "zh": "王者三重炸鸡 (King Triple)",
          "ja": "キングトリプルチキン",
          "vi": "Gà rán King Triple"
        },
        "sizes": [
          [
            "S",
            190000
          ],
          [
            "L",
            360000
          ]
        ]
      },
      {
        "name": {
          "ko": "고추마요 바삭치킨",
          "en": "Chili Mayo Crispy Chicken",
          "zh": "青椒蛋黄酱脆皮炸鸡",
          "ja": "青唐辛子マヨのサクサクチキン",
          "vi": "Gà chiên giòn mayonnaise ớt xanh"
        },
        "sizes": [
          [
            "S",
            190000
          ],
          [
            "L",
            360000
          ]
        ]
      }
    ]
  },
  {
    "id": "crispy",
    "name": {
      "ko": "바삭 치킨",
      "en": "Crispy Chicken",
      "zh": "脆皮炸鸡",
      "ja": "サクサクチキン",
      "vi": "Gà chiên giòn"
    },
    "note": {
      "ko": "S = 반 마리, L = 한 마리 · 부위 선택: 뼈 / 순살 / 윙봉 / 닭다리",
      "en": "S = half, L = whole · Choose: bone-in / boneless / wings / drumsticks",
      "zh": "S = 半只，L = 整只 · 部位可选：带骨/无骨/鸡翅/鸡腿",
      "ja": "S = 半羽、L = 1羽 · 部位を選択：骨付き/骨なし/手羽/ドラムスティック",
      "vi": "S = nửa con, L = một con · Chọn: có xương / không xương / cánh / đùi"
    },
    "items": [
      {
        "name": {
          "ko": "바삭 후라이드 치킨",
          "en": "Crispy Fried Chicken",
          "zh": "脆皮原味炸鸡",
          "ja": "サクサクフライドチキン",
          "vi": "Gà chiên giòn"
        },
        "sizes": [
          [
            "S",
            160000
          ],
          [
            "L",
            300000
          ]
        ]
      },
      {
        "name": {
          "ko": "바삭 양념치킨",
          "en": "Crispy Sweet Chicken",
          "zh": "脆皮甜辣酱炸鸡",
          "ja": "サクサクヤンニョムチキン",
          "vi": "Gà chiên giòn sốt"
        },
        "sizes": [
          [
            "S",
            170000
          ],
          [
            "L",
            320000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "바삭 간장치킨",
          "en": "Crispy Soy Sauce Chicken",
          "zh": "脆皮酱油炸鸡",
          "ja": "サクサク醤油チキン",
          "vi": "Gà chiên giòn sốt xì dầu"
        },
        "sizes": [
          [
            "S",
            170000
          ],
          [
            "L",
            320000
          ]
        ]
      },
      {
        "name": {
          "ko": "바삭 뿌링클치킨",
          "en": "Crispy Bburinkle Chicken",
          "zh": "脆皮布林克炸鸡 (Bburinkle)",
          "ja": "サクサクブリンクルチキン",
          "vi": "Gà chiên giòn lắc phô mai"
        },
        "sizes": [
          [
            "S",
            170000
          ],
          [
            "L",
            320000
          ]
        ]
      },
      {
        "name": {
          "ko": "바삭 반반치킨",
          "en": "Half & Half Crispy Chicken",
          "zh": "脆皮双拼炸鸡",
          "ja": "サクサクハーフ&ハーフチキン",
          "vi": "Gà giòn 2 vị"
        },
        "desc": {
          "ko": "후라이드·양념·간장·뿌링클 중 2가지 선택",
          "en": "Choose 2 of Fried, Sweet, Soy, Bburinkle",
          "zh": "原味、甜辣酱、酱油、布林克中任选2种",
          "ja": "フライド・ヤンニョム・醤油・ブリンクルから2種類選択",
          "vi": "Chọn 2 trong 4 vị"
        },
        "price": 320000
      },
      {
        "name": {
          "ko": "바삭 순살 3종 치킨",
          "en": "Crispy Boneless Triple Sauce Chicken",
          "zh": "脆皮无骨三拼炸鸡",
          "ja": "サクサク骨なし3種チキン",
          "vi": "Gà viên giòn 3 vị"
        },
        "desc": {
          "ko": "후라이드·양념·간장·뿌링클 중 3가지 선택",
          "en": "Choose 3 of Fried, Sweet, Soy, Bburinkle",
          "zh": "原味、甜辣酱、酱油、布林克中任选3种",
          "ja": "フライド・ヤンニョム・醤油・ブリンクルから3種類選択",
          "vi": "Chọn 3 trong 4 vị"
        },
        "price": 380000
      },
      {
        "name": {
          "ko": "바삭 허니치킨",
          "en": "Crispy Honey Chicken",
          "zh": "脆皮蜂蜜炸鸡",
          "ja": "サクサクハニーチキン",
          "vi": "Gà giòn mật ong"
        },
        "desc": {
          "ko": "순살 / 윙봉 선택",
          "en": "Boneless or wings",
          "zh": "可选无骨或鸡翅",
          "ja": "骨なし/手羽から選択",
          "vi": "Gà viên hoặc cánh"
        },
        "sizes": [
          [
            "S",
            190000
          ],
          [
            "L",
            360000
          ]
        ]
      },
      {
        "name": {
          "ko": "바삭 매운치킨",
          "en": "Crispy Spicy Chicken",
          "zh": "脆皮辣味炸鸡",
          "ja": "サクサク辛口チキン",
          "vi": "Gà giòn cay"
        },
        "desc": {
          "ko": "순살 / 윙봉 선택",
          "en": "Boneless or wings",
          "zh": "可选无骨或鸡翅",
          "ja": "骨なし/手羽から選択",
          "vi": "Gà viên hoặc cánh"
        },
        "sizes": [
          [
            "S",
            190000
          ],
          [
            "L",
            360000
          ]
        ],
        "spicy": true
      }
    ]
  },
  {
    "id": "special",
    "name": {
      "ko": "인기 · 신메뉴 · BBQ",
      "en": "Popular · New · BBQ",
      "zh": "人气 · 新品 · BBQ",
      "ja": "人気 · 新メニュー · BBQ",
      "vi": "Món hot · Mới · BBQ"
    },
    "note": {
      "ko": "BBQ 치킨 치즈 추가 +30,000₫ · UFO 치즈 추가 +40,000₫",
      "en": "BBQ chicken extra cheese +30,000₫ · UFO extra cheese +40,000₫",
      "zh": "BBQ炸鸡加芝士 +30,000₫ · UFO芝士加量 +40,000₫",
      "ja": "BBQチキンのチーズ追加 +30,000₫ · UFOチーズ追加 +40,000₫",
      "vi": "Thêm phô mai gà nướng +30.000₫ · Thêm phô mai UFO +40.000₫"
    },
    "items": [
      {
        "name": {
          "ko": "UFO 치즈 치킨",
          "en": "UFO Cheese Chicken",
          "zh": "UFO芝士炸鸡",
          "ja": "UFOチーズチキン",
          "vi": "Cánh gà phô mai đĩa bay"
        },
        "desc": {
          "ko": "윙봉 16조각 · 후라이드/양념/간장/뿌링클/허니/레드 중 2가지 선택",
          "en": "16 wings · choose 2 flavors: Fried, Sweet, Soy, Bburinkle, Honey, Spicy",
          "zh": "鸡翅16块 · 原味/甜辣酱/酱油/布林克/蜂蜜/红辣味中任选2种",
          "ja": "手羽16本 · フライド/ヤンニョム/醤油/ブリンクル/ハニー/レッドから2種類選択",
          "vi": "16 miếng cánh · chọn 2 vị: gà rán, sốt, xì dầu, phô mai, mật ong, cay"
        },
        "price": 400000,
        "unit": "16pcs",
        "tag": "special"
      },
      {
        "name": {
          "ko": "UFO 치즈 쭈꾸미",
          "en": "UFO Cheese Webfoot Octopus",
          "zh": "UFO芝士辣炒小章鱼",
          "ja": "UFOチーズチュクミ",
          "vi": "Bạch tuộc cay phô mai đĩa bay"
        },
        "price": 350000,
        "unit": "SET",
        "tag": "special",
        "spicy": true
      },
      {
        "name": {
          "ko": "레인보우 치킨",
          "en": "Rainbow Chicken",
          "zh": "彩虹炸鸡",
          "ja": "レインボーチキン",
          "vi": "Gà viên cầu vồng"
        },
        "desc": {
          "ko": "치즈킹·어니언·킹트리플·스리라차·크리미킹·양념·뿌링클·치즈볼",
          "en": "Cheese King, Onion, King Triple, Sriracha, Creamy King, Sweet, Bburinkle, Cheese Ball",
          "zh": "芝士王、洋葱、王者三重、是拉差、奶油王、甜辣酱、布林克、芝士球",
          "ja": "チーズキング・オニオン・キングトリプル・スリラチャ・クリーミーキング・ヤンニョム・ブリンクル・チーズボール",
          "vi": "Cheese King, kem hành, King Triple, Sriracha, Creamy King, sốt ngọt, lắc phô mai, phô mai viên"
        },
        "price": 490000,
        "unit": "SET",
        "tag": "special"
      },
      {
        "name": {
          "ko": "순살 볼케이노 BBQ 치킨",
          "en": "Volcano BBQ Chicken (Boneless)",
          "zh": "火山BBQ炸鸡 (无骨)",
          "ja": "ボルケーノBBQチキン (骨なし)",
          "vi": "Gà nướng cay (không xương)"
        },
        "price": 230000,
        "unit": "SET",
        "spicy": true
      },
      {
        "name": {
          "ko": "순살 왕갈비 BBQ 치킨",
          "en": "Wang Galbi BBQ Chicken (Boneless)",
          "zh": "王排骨BBQ炸鸡 (无骨)",
          "ja": "ワンカルビBBQチキン (骨なし)",
          "vi": "Gà nướng Wang-Galbi (không xương)"
        },
        "price": 230000,
        "unit": "SET"
      }
    ]
  },
  {
    "id": "combo",
    "name": {
      "ko": "콤보 · 세트",
      "en": "Combos & Sets",
      "zh": "套餐 · 组合",
      "ja": "コンボ · セット",
      "vi": "Combo & Set"
    },
    "note": {
      "ko": "치킨은 뼈 / 순살 선택 · 콤보 #1~#4 치즈떡 변경 +20,000₫ · 가격은 VAT 10% 별도",
      "en": "Chicken: bone-in or boneless · Combo #1–#4: switch to cheese rice cakes +20,000₫ · Prices exclude 10% VAT",
      "zh": "鸡肉可选带骨/无骨 · 套餐#1~#4可换芝士年糕 +20,000₫ · 价格不含10%增值税",
      "ja": "チキンは骨付き/骨なしを選択 · コンボ#1~#4はチーズ餅に変更 +20,000₫ · 価格は10%VAT別",
      "vi": "Gà: có xương hoặc không xương · Combo #1–#4: đổi sang bánh gạo phô mai +20.000₫ · Giá chưa gồm VAT 10%"
    },
    "items": [
      {
        "name": {
          "ko": "콤보 #1",
          "en": "Combo #1",
          "zh": "套餐 #1",
          "ja": "コンボ #1",
          "vi": "Combo #1"
        },
        "desc": {
          "ko": "치킨 반 마리 + 떡볶이",
          "en": "Half chicken + Tteokbokki",
          "zh": "半只炸鸡 + 辣炒年糕",
          "ja": "チキン半羽 + トッポッキ",
          "vi": "Nửa con gà + bánh gạo xào cay"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "콤보 #2",
          "en": "Combo #2",
          "zh": "套餐 #2",
          "ja": "コンボ #2",
          "vi": "Combo #2"
        },
        "desc": {
          "ko": "반반 치킨 + 떡볶이",
          "en": "Half & Half chicken + Tteokbokki",
          "zh": "双拼炸鸡 + 辣炒年糕",
          "ja": "ハーフ&ハーフチキン + トッポッキ",
          "vi": "Gà 2 vị + bánh gạo xào cay"
        },
        "price": 390000
      },
      {
        "name": {
          "ko": "콤보 #3",
          "en": "Combo #3",
          "zh": "套餐 #3",
          "ja": "コンボ #3",
          "vi": "Combo #3"
        },
        "desc": {
          "ko": "치킨 반 마리 + 로제 떡볶이",
          "en": "Half chicken + Rose Tteokbokki",
          "zh": "半只炸鸡 + 玫瑰酱炒年糕",
          "ja": "チキン半羽 + ロゼトッポッキ",
          "vi": "Nửa con gà + bánh gạo Rose"
        },
        "price": 270000
      },
      {
        "name": {
          "ko": "콤보 #4",
          "en": "Combo #4",
          "zh": "套餐 #4",
          "ja": "コンボ #4",
          "vi": "Combo #4"
        },
        "desc": {
          "ko": "반반 치킨 + 로제 떡볶이",
          "en": "Half & Half chicken + Rose Tteokbokki",
          "zh": "双拼炸鸡 + 玫瑰酱炒年糕",
          "ja": "ハーフ&ハーフチキン + ロゼトッポッキ",
          "vi": "Gà 2 vị + bánh gạo Rose"
        },
        "price": 410000
      },
      {
        "name": {
          "ko": "콤보 #5",
          "en": "Combo #5",
          "zh": "套餐 #5",
          "ja": "コンボ #5",
          "vi": "Combo #5"
        },
        "desc": {
          "ko": "치킨 반 마리 + 짜장면/짬뽕 중 택1 + 콜라 2",
          "en": "Half chicken + Jajangmyeon or Jjamppong + 2 Cokes",
          "zh": "半只炸鸡 + 炸酱面/炒码面二选一 + 可乐2瓶",
          "ja": "チキン半羽 + ジャージャー麺/チャンポンから1品 + コーラ2本",
          "vi": "Nửa con gà + mì tương đen hoặc mì hải sản cay + 2 Coca"
        },
        "price": 320000
      },
      {
        "name": {
          "ko": "콤보 #6",
          "en": "Combo #6",
          "zh": "套餐 #6",
          "ja": "コンボ #6",
          "vi": "Combo #6"
        },
        "desc": {
          "ko": "반반 치킨 + 짜장면/짬뽕 중 택1 + 치즈볼 + 콜라 2",
          "en": "Half & Half chicken + Jajangmyeon or Jjamppong + Cheese balls + 2 Cokes",
          "zh": "双拼炸鸡 + 炸酱面/炒码面二选一 + 芝士球 + 可乐2瓶",
          "ja": "ハーフ&ハーフチキン + ジャージャー麺/チャンポンから1品 + チーズボール + コーラ2本",
          "vi": "Gà 2 vị + mì tương đen hoặc mì hải sản cay + phô mai viên + 2 Coca"
        },
        "price": 570000
      },
      {
        "name": {
          "ko": "런치 콤보 (10:00~14:00)",
          "en": "Lunch Combo (10:00–14:00)",
          "zh": "午市套餐 (10:00~14:00)",
          "ja": "ランチコンボ (10:00~14:00)",
          "vi": "Combo trưa (10:00–14:00)"
        },
        "desc": {
          "ko": "치킨 반 마리 + 막국수 + 떡볶이",
          "en": "Half chicken + Buckwheat noodles + Tteokbokki",
          "zh": "半只炸鸡 + 荞麦冷面 + 辣炒年糕",
          "ja": "チキン半羽 + マッククス + トッポッキ",
          "vi": "Nửa con gà + mì lạnh sợi nhỏ + bánh gạo xào cay"
        },
        "price": 390000
      },
      {
        "name": {
          "ko": "로제파스타 콤보 (2~3인)",
          "en": "Rose Pasta Combo (2–3 people)",
          "zh": "玫瑰酱意面套餐 (2~3人)",
          "ja": "ロゼパスタコンボ (2~3人前)",
          "vi": "Combo mì Ý Rose (2–3 người)"
        },
        "desc": {
          "ko": "로제파스타 + 치킨 반 마리(후라이드/양념/간장 택1) + 감자튀김 + 콜라 2",
          "en": "Rose pasta + half chicken (Fried, Sweet or Soy) + fries + 2 Cokes",
          "zh": "玫瑰酱意面 + 半只炸鸡 (原味/甜辣酱/酱油三选一) + 薯条 + 可乐2瓶",
          "ja": "ロゼパスタ + チキン半羽 (フライド/ヤンニョム/醤油から1種) + フライドポテト + コーラ2本",
          "vi": "Mì Ý Rose + nửa con gà (rán, sốt hoặc xì dầu) + khoai tây chiên + 2 Coca"
        },
        "price": 370000
      },
      {
        "name": {
          "ko": "슈퍼 콤보 (6~8인)",
          "en": "Super Combo (6–8 people)",
          "zh": "超级套餐 (6~8人)",
          "ja": "スーパーコンボ (6~8人前)",
          "vi": "Super Combo (6–8 người)"
        },
        "desc": {
          "ko": "반반 치킨 + 윙봉(허니/매운맛 택1) + 로제 떡볶이 + 감자튀김 + 콜라 4",
          "en": "Half & Half chicken + wings (Honey or Spicy) + Rose Tteokbokki + fries + 4 Cokes",
          "zh": "双拼炸鸡 + 鸡翅 (蜂蜜/辣味二选一) + 玫瑰酱炒年糕 + 薯条 + 可乐4瓶",
          "ja": "ハーフ&ハーフチキン + 手羽 (ハニー/辛口から1種) + ロゼトッポッキ + フライドポテト + コーラ4本",
          "vi": "Gà 2 vị + cánh gà (mật ong hoặc cay) + bánh gạo Rose + khoai tây chiên + 4 Coca"
        },
        "price": 690000,
        "tag": "best"
      },
      {
        "name": {
          "ko": "BBQ 세트 #1",
          "en": "BBQ Set #1",
          "zh": "BBQ套餐 #1",
          "ja": "BBQセット #1",
          "vi": "BBQ Set #1"
        },
        "desc": {
          "ko": "BBQ 치킨(볼케이노/왕갈비 택1) + 막국수 + 콜라 2",
          "en": "BBQ chicken (Volcano or Wang Galbi) + Buckwheat noodles + 2 Cokes",
          "zh": "BBQ炸鸡 (火山/王排骨二选一) + 荞麦冷面 + 可乐2瓶",
          "ja": "BBQチキン (ボルケーノ/ワンカルビから1種) + マッククス + コーラ2本",
          "vi": "Gà nướng (cay hoặc Wang-Galbi) + mì lạnh + 2 Coca"
        },
        "price": 370000
      },
      {
        "name": {
          "ko": "BBQ 세트 #2",
          "en": "BBQ Set #2",
          "zh": "BBQ套餐 #2",
          "ja": "BBQセット #2",
          "vi": "BBQ Set #2"
        },
        "desc": {
          "ko": "BBQ 치킨(볼케이노/왕갈비 택1) + 순살 후라이드 반 마리 + 짜장면/짬뽕 택1 + 콜라 4",
          "en": "BBQ chicken (Volcano or Wang Galbi) + half boneless fried chicken + Jajangmyeon or Jjamppong + 4 Cokes",
          "zh": "BBQ炸鸡 (火山/王排骨二选一) + 半只无骨原味炸鸡 + 炸酱面/炒码面二选一 + 可乐4瓶",
          "ja": "BBQチキン (ボルケーノ/ワンカルビから1種) + 骨なしフライド半羽 + ジャージャー麺/チャンポンから1品 + コーラ4本",
          "vi": "Gà nướng + nửa con gà rán không xương + mì tương đen hoặc mì hải sản cay + 4 Coca"
        },
        "price": 570000
      }
    ]
  },
  {
    "id": "snack",
    "name": {
      "ko": "분식",
      "en": "Korean Snacks",
      "zh": "韩式小吃",
      "ja": "韓国軽食",
      "vi": "Món ăn vặt Hàn"
    },
    "items": [
      {
        "name": {
          "ko": "떡볶이",
          "en": "Tteokbokki",
          "zh": "辣炒年糕",
          "ja": "トッポッキ",
          "vi": "Bánh gạo xào cay"
        },
        "price": 140000,
        "photo": "img/tteok.jpg",
        "tag": "best",
        "spicy": true
      },
      {
        "name": {
          "ko": "치즈 떡볶이",
          "en": "Cheese Tteokbokki",
          "zh": "芝士辣炒年糕",
          "ja": "チーズトッポッキ",
          "vi": "Bánh gạo phô mai cay"
        },
        "price": 160000,
        "spicy": true
      },
      {
        "name": {
          "ko": "로제 떡볶이",
          "en": "Rose Tteokbokki",
          "zh": "玫瑰酱炒年糕",
          "ja": "ロゼトッポッキ",
          "vi": "Bánh gạo Rose"
        },
        "price": 160000,
        "photo": "img/rose.jpg"
      },
      {
        "name": {
          "ko": "짜장 떡볶이",
          "en": "Jajang Tteokbokki",
          "zh": "炸酱炒年糕",
          "ja": "ジャージャートッポッキ",
          "vi": "Bánh gạo sốt tương đen"
        },
        "price": 140000
      },
      {
        "name": {
          "ko": "라볶이",
          "en": "Rabokki (Tteokbokki with Noodles)",
          "zh": "拉面辣炒年糕 (Rabokki)",
          "ja": "ラポッキ",
          "vi": "Bánh gạo xào mì cay"
        },
        "price": 140000,
        "spicy": true
      },
      {
        "name": {
          "ko": "로제 파스타",
          "en": "Rose Pasta",
          "zh": "玫瑰酱意面",
          "ja": "ロゼパスタ",
          "vi": "Mì Ý sốt Rose"
        },
        "price": 160000
      },
      {
        "name": {
          "ko": "짜파게티",
          "en": "Jjapaghetti (Black Bean Noodles)",
          "zh": "炸酱拌面 (Jjapaghetti)",
          "ja": "チャパゲティ",
          "vi": "Mì tương đen"
        },
        "price": 70000
      },
      {
        "name": {
          "ko": "김치전",
          "en": "Kimchi Pancake",
          "zh": "泡菜煎饼",
          "ja": "キムチチヂミ",
          "vi": "Bánh kim chi"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "해물파전",
          "en": "Seafood Pancake",
          "zh": "海鲜葱饼",
          "ja": "海鮮ネギチヂミ",
          "vi": "Bánh hải sản"
        },
        "price": 150000
      }
    ]
  },
  {
    "id": "rice",
    "name": {
      "ko": "식사 · 덮밥",
      "en": "Rice Dishes",
      "zh": "正餐 · 盖饭",
      "ja": "食事 · どんぶり",
      "vi": "Món cơm"
    },
    "items": [
      {
        "name": {
          "ko": "비빔밥",
          "en": "Bibimbap",
          "zh": "拌饭",
          "ja": "ビビンバ",
          "vi": "Cơm trộn thịt bò"
        },
        "price": 130000
      },
      {
        "name": {
          "ko": "돌솥비빔밥",
          "en": "Hot Stone Pot Bibimbap",
          "zh": "石锅拌饭",
          "ja": "石焼ビビンバ",
          "vi": "Cơm trộn nồi đá"
        },
        "price": 130000,
        "photo": "img/bibim.jpg",
        "tag": "best"
      },
      {
        "name": {
          "ko": "김치 볶음밥",
          "en": "Kimchi Fried Rice",
          "zh": "泡菜炒饭",
          "ja": "キムチチャーハン",
          "vi": "Cơm rang kim chi"
        },
        "price": 130000
      },
      {
        "name": {
          "ko": "제육 김치 볶음밥",
          "en": "Kimchi & Pork Fried Rice",
          "zh": "辣猪肉泡菜炒饭",
          "ja": "豚キムチチャーハン",
          "vi": "Cơm rang kim chi thịt lợn"
        },
        "price": 130000
      },
      {
        "name": {
          "ko": "베이컨 새우 볶음밥",
          "en": "Bacon Shrimp Fried Rice",
          "zh": "培根虾仁炒饭",
          "ja": "ベーコンエビチャーハン",
          "vi": "Cơm rang tôm thịt ba chỉ"
        },
        "price": 130000
      },
      {
        "name": {
          "ko": "잡채 덮밥",
          "en": "Japchae Rice Bowl",
          "zh": "杂菜盖饭",
          "ja": "チャプチェ丼",
          "vi": "Cơm miến xào hải sản"
        },
        "price": 130000
      },
      {
        "name": {
          "ko": "제육 덮밥",
          "en": "Spicy Pork Rice Bowl",
          "zh": "辣炒猪肉盖饭",
          "ja": "豚辛炒め丼",
          "vi": "Cơm thịt lợn xào hành tây"
        },
        "price": 130000
      },
      {
        "name": {
          "ko": "돈가스",
          "en": "Pork Cutlet",
          "zh": "日式炸猪排 (Donkatsu)",
          "ja": "トンカツ",
          "vi": "Cơm thịt thăn chiên xù"
        },
        "price": 130000
      },
      {
        "name": {
          "ko": "치즈가스",
          "en": "Cheese Cutlet",
          "zh": "芝士炸猪排",
          "ja": "チーズカツ",
          "vi": "Cơm cutlet phô mai"
        },
        "price": 130000
      }
    ]
  },
  {
    "id": "noodle",
    "name": {
      "ko": "면 요리",
      "en": "Noodles",
      "zh": "面类",
      "ja": "麺料理",
      "vi": "Món mì"
    },
    "items": [
      {
        "name": {
          "ko": "막국수",
          "en": "Buckwheat Noodles (Makguksu)",
          "zh": "荞麦冷面",
          "ja": "マッククス",
          "vi": "Mì lạnh sợi nhỏ"
        },
        "price": 150000,
        "spicy": true
      },
      {
        "name": {
          "ko": "해물야끼볶음",
          "en": "Stir-fried Seafood Noodles",
          "zh": "海鲜炒面",
          "ja": "海鮮焼きそば",
          "vi": "Mỳ xào hải sản"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "자장면",
          "en": "Jajangmyeon",
          "zh": "炸酱面",
          "ja": "ジャージャー麺",
          "vi": "Mì tương đen"
        },
        "price": 140000
      },
      {
        "name": {
          "ko": "짬뽕",
          "en": "Jjamppong",
          "zh": "炒码面",
          "ja": "チャンポン",
          "vi": "Mì hải sản cay"
        },
        "price": 140000,
        "photo": "img/jjam.jpg",
        "spicy": true
      }
    ]
  },
  {
    "id": "soup",
    "name": {
      "ko": "찌개 · 탕",
      "en": "Stews & Soups",
      "zh": "炖锅 · 汤",
      "ja": "チゲ · スープ",
      "vi": "Canh & Lẩu nhỏ"
    },
    "items": [
      {
        "name": {
          "ko": "뚝배기 불고기",
          "en": "Beef Bulgogi Stew",
          "zh": "砂锅烤牛肉",
          "ja": "土鍋プルコギ",
          "vi": "Canh thịt bò"
        },
        "price": 140000
      },
      {
        "name": {
          "ko": "순두부찌개",
          "en": "Soft Tofu Soup",
          "zh": "嫩豆腐汤",
          "ja": "スンドゥブチゲ",
          "vi": "Canh đậu hũ non"
        },
        "price": 140000,
        "spicy": true
      },
      {
        "name": {
          "ko": "돼지 김치찌개",
          "en": "Pork Kimchi Stew",
          "zh": "猪肉泡菜汤",
          "ja": "豚キムチチゲ",
          "vi": "Canh kim chi thịt lợn"
        },
        "price": 140000,
        "spicy": true
      },
      {
        "name": {
          "ko": "부대찌개",
          "en": "Budae Jjigae (Army Stew)",
          "zh": "部队锅",
          "ja": "プデチゲ",
          "vi": "Canh kim chi xúc xích"
        },
        "price": 150000,
        "spicy": true
      },
      {
        "name": {
          "ko": "육개장",
          "en": "Spicy Beef Soup (Yukgaejang)",
          "zh": "辣牛肉汤",
          "ja": "ユッケジャン",
          "vi": "Canh thịt bò cay"
        },
        "price": 140000,
        "spicy": true
      },
      {
        "name": {
          "ko": "감자탕",
          "en": "Pork Back-bone Stew (Gamjatang)",
          "zh": "土豆猪骨汤",
          "ja": "カムジャタン",
          "vi": "Canh xương hầm khoai tây"
        },
        "price": 170000
      }
    ]
  },
  {
    "id": "hotpot",
    "name": {
      "ko": "전골",
      "en": "Hot Pot",
      "zh": "火锅",
      "ja": "チョンゴル (鍋)",
      "vi": "Lẩu"
    },
    "items": [
      {
        "name": {
          "ko": "오뎅탕",
          "en": "Fish Cake Soup",
          "zh": "鱼饼汤",
          "ja": "おでん鍋",
          "vi": "Canh chả cá"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "즉석 떡볶이",
          "en": "Tteokbokki Hot Pot",
          "zh": "现煮年糕火锅",
          "ja": "即席トッポッキ鍋",
          "vi": "Lẩu bánh gạo"
        },
        "price": 300000,
        "spicy": true
      },
      {
        "name": {
          "ko": "돼지 김치전골",
          "en": "Pork Kimchi Hot Pot",
          "zh": "猪肉泡菜火锅",
          "ja": "豚キムチ鍋",
          "vi": "Lẩu kim chi thịt lợn"
        },
        "price": 350000,
        "spicy": true
      },
      {
        "name": {
          "ko": "부대찌개 전골",
          "en": "Budae Jjigae Hot Pot",
          "zh": "部队火锅",
          "ja": "プデチゲ鍋",
          "vi": "Lẩu kim chi xúc xích"
        },
        "price": 350000,
        "spicy": true
      },
      {
        "name": {
          "ko": "불고기 전골",
          "en": "Bulgogi Hot Pot",
          "zh": "烤肉火锅",
          "ja": "プルコギ鍋",
          "vi": "Lẩu bulgogi"
        },
        "price": 350000
      },
      {
        "name": {
          "ko": "소고기 전골",
          "en": "Beef Hot Pot",
          "zh": "牛肉火锅",
          "ja": "牛肉鍋",
          "vi": "Lẩu thịt bò"
        },
        "price": 350000,
        "spicy": true
      }
    ]
  },
  {
    "id": "drink",
    "name": {
      "ko": "주류 · 음료",
      "en": "Drinks",
      "zh": "酒类 · 饮料",
      "ja": "お酒 · ドリンク",
      "vi": "Đồ uống"
    },
    "items": [
      {
        "name": {
          "ko": "참이슬",
          "en": "Chamisul Soju",
          "zh": "真露烧酒 (Chamisul)",
          "ja": "チャミスル",
          "vi": "Soju Chamisul"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "자몽에 이슬",
          "en": "Grapefruit Soju",
          "zh": "西柚烧酒",
          "ja": "グレープフルーツ焼酎",
          "vi": "Soju bưởi"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "청포도에 이슬",
          "en": "Green Grape Soju",
          "zh": "青葡萄烧酒",
          "ja": "青ブドウ焼酎",
          "vi": "Soju nho xanh"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "자두에 이슬",
          "en": "Plum Soju",
          "zh": "李子烧酒",
          "ja": "プラム焼酎",
          "vi": "Soju mận"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "딸기에 이슬",
          "en": "Strawberry Soju",
          "zh": "草莓烧酒",
          "ja": "イチゴ焼酎",
          "vi": "Soju dâu"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "처음처럼",
          "en": "Chum-churum Soju",
          "zh": "初饮初乐烧酒 (Chum-churum)",
          "ja": "チョウムチョロム",
          "vi": "Soju Chum-churum"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "진로",
          "en": "Jinro Soju",
          "zh": "眞露烧酒 (Jinro)",
          "ja": "ジンロ",
          "vi": "Soju Jinro"
        },
        "price": 120000
      },
      {
        "name": {
          "ko": "복분자",
          "en": "Bokbunja (Black Raspberry Wine)",
          "zh": "覆盆子酒 (Bokbunja)",
          "ja": "覆盆子酒 (ポクブンジャ)",
          "vi": "Rượu Bokbunja"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "밤 막걸리",
          "en": "Chestnut Makgeolli",
          "zh": "栗子米酒",
          "ja": "栗マッコリ",
          "vi": "Rượu gạo hạt dẻ"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "복숭아 막걸리",
          "en": "Peach Makgeolli",
          "zh": "水蜜桃米酒",
          "ja": "桃マッコリ",
          "vi": "Rượu gạo đào"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "타이거 크리스탈",
          "en": "Tiger Crystal",
          "zh": "虎牌水晶啤酒",
          "ja": "タイガークリスタル",
          "vi": "Bia Tiger Crystal"
        },
        "price": 30000
      },
      {
        "name": {
          "ko": "하이네켄",
          "en": "Heineken",
          "zh": "喜力啤酒",
          "ja": "ハイネケン",
          "vi": "Bia Heineken"
        },
        "price": 40000
      },
      {
        "name": {
          "ko": "콜라 · 콜라 라이트",
          "en": "Coke · Coke Light",
          "zh": "可乐 · 轻怡可乐",
          "ja": "コーラ · コーラライト",
          "vi": "Coca · Coca Light"
        },
        "price": 20000
      },
      {
        "name": {
          "ko": "스프라이트",
          "en": "Sprite",
          "zh": "雪碧",
          "ja": "スプライト",
          "vi": "Sprite"
        },
        "price": 20000
      },
      {
        "name": {
          "ko": "환타",
          "en": "Fanta",
          "zh": "芬达",
          "ja": "ファンタ",
          "vi": "Fanta"
        },
        "price": 20000
      },
      {
        "name": {
          "ko": "오렌지 주스",
          "en": "Orange Juice",
          "zh": "橙汁",
          "ja": "オレンジジュース",
          "vi": "Nước cam ép"
        },
        "price": 20000
      }
    ]
  }
];
