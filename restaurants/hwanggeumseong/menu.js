// 황금성 박닝점(수타면 전문점) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진 7장(수집 2026-11-11). 가격 단위: VND
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시
window.RESTAURANT = {
  brand: { ko: "황금성", en: "Hwanggeumseong" },
  phone: "0985 919 143",
  address: "Lô 30 Đ. Hoàng Hoa Thám, Võ Cường, Bắc Ninh",
  wifi: null,
  hours: null,
};

window.MENU = [
  {
    "id": "recommend",
    "name": {
      "ko": "추천요리",
      "en": "Chef's Recommendations",
      "zh": "推荐菜品",
      "ja": "おすすめ料理",
      "vi": "Món đặc biệt"
    },
    "note": {
      "ko": "2가지 요리 700,000₫ · 3가지 요리 1,000,000₫ (아래 요리 중에서 고르기, 가격은 ×2 / ×3 기준)",
      "en": "2 dishes 700,000₫ · 3 dishes 1,000,000₫ (choose from the dishes below; prices are for ×2 / ×3)",
      "zh": "2道菜 700,000₫ · 3道菜 1,000,000₫(从下列菜品中选择,价格按×2 / ×3计算)",
      "ja": "2品 700,000₫ · 3品 1,000,000₫(下記の料理からお選びください。価格は×2 / ×3の場合)",
      "vi": "2 món 700.000₫ · 3 món 1.000.000₫ (chọn trong các món dưới đây)"
    },
    "items": [
      {
        "name": {
          "ko": "양장피",
          "en": "Yangjangpi (Cold Seafood & Meat Salad with Mustard Sauce)",
          "zh": "什锦凉拌粉皮",
          "ja": "ヤンジャンピ(五目春雨の冷菜)",
          "vi": "Gỏi thập cẩm"
        },
        "sizes": [
          [
            "×2",
            700000
          ],
          [
            "×3",
            1000000
          ]
        ],
        "photo": "img/yangjangpi.jpg"
      },
      {
        "name": {
          "ko": "유산슬",
          "en": "Yusanseul (Seafood & Vegetables in Starch Sauce)",
          "zh": "溜三丝(海鲜蔬菜勾芡)",
          "ja": "ユサンスル(海鮮と野菜のとろみ炒め)",
          "vi": "Măng xào hải sản"
        },
        "sizes": [
          [
            "×2",
            700000
          ],
          [
            "×3",
            1000000
          ]
        ],
        "photo": "img/yusanseul.jpg"
      },
      {
        "name": {
          "ko": "탕수육",
          "en": "Tangsuyuk (Sweet & Sour Pork)",
          "zh": "糖醋肉",
          "ja": "タンスユク(酢豚)",
          "vi": "Thịt chua ngọt"
        },
        "sizes": [
          [
            "×2",
            700000
          ],
          [
            "×3",
            1000000
          ]
        ]
      },
      {
        "name": {
          "ko": "마파두부",
          "en": "Mapo Tofu (Spicy Tofu)",
          "zh": "麻婆豆腐",
          "ja": "麻婆豆腐",
          "vi": "Đậu hũ sốt tứ xuyên"
        },
        "sizes": [
          [
            "×2",
            700000
          ],
          [
            "×3",
            1000000
          ]
        ],
        "photo": "img/mapa-dubu.jpg",
        "spicy": true
      },
      {
        "name": {
          "ko": "칠리새우",
          "en": "Chili Shrimp",
          "zh": "干烧虾仁",
          "ja": "エビチリ",
          "vi": "Tôm sốt chua ngọt"
        },
        "sizes": [
          [
            "×2",
            700000
          ],
          [
            "×3",
            1000000
          ]
        ],
        "photo": "img/chili-saeu.jpg"
      },
      {
        "name": {
          "ko": "깐풍기",
          "en": "Kkanpunggi (Crispy Fried Chicken in Spicy Sauce)",
          "zh": "干烹鸡",
          "ja": "カンプンギ(甘辛い揚げ鶏)",
          "vi": "Gà xào cay"
        },
        "sizes": [
          [
            "×2",
            700000
          ],
          [
            "×3",
            1000000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "고추잡채",
          "en": "Gochujapchae (Stir-fried Peppers & Pork)",
          "zh": "青椒肉丝",
          "ja": "青椒肉絲(チンジャオロース)",
          "vi": "Ớt xào thịt"
        },
        "sizes": [
          [
            "×2",
            700000
          ],
          [
            "×3",
            1000000
          ]
        ]
      },
      {
        "name": {
          "ko": "누룽지탕",
          "en": "Nurungjitang (Scorched Rice with Seafood Sauce)",
          "zh": "锅巴海鲜汤",
          "ja": "ヌルンジタン(おこげの海鮮あんかけ)",
          "vi": "Súp cơm cháy hải sản"
        },
        "sizes": [
          [
            "×2",
            700000
          ],
          [
            "×3",
            1000000
          ]
        ]
      },
      {
        "name": {
          "ko": "오향장육",
          "en": "Ohyangjangyuk (Five-spice Braised Pork)",
          "zh": "五香酱肉",
          "ja": "オヒャンジャンユク(五香醤油煮豚)",
          "vi": "Thịt heo hầm ngũ vị"
        },
        "sizes": [
          [
            "×2",
            700000
          ],
          [
            "×3",
            1000000
          ]
        ]
      },
      {
        "name": {
          "ko": "라조기",
          "en": "Lajogi (Spicy Chicken with Chili Peppers)",
          "zh": "辣子鸡",
          "ja": "ラジョギ(唐辛子と鶏の辛味炒め)",
          "vi": "Gà xào ớt cay"
        },
        "sizes": [
          [
            "×2",
            700000
          ],
          [
            "×3",
            1000000
          ]
        ],
        "photo": "img/lajogi.jpg",
        "spicy": true
      },
      {
        "name": {
          "ko": "크림새우",
          "en": "Cream Shrimp",
          "zh": "奶油虾",
          "ja": "クリームエビ",
          "vi": "Tôm sốt kem"
        },
        "sizes": [
          [
            "×2",
            700000
          ],
          [
            "×3",
            1000000
          ]
        ]
      },
      {
        "name": {
          "ko": "팔보채",
          "en": "Palbochae (Stir-fried Seafood & Vegetables)",
          "zh": "八宝菜",
          "ja": "八宝菜",
          "vi": "Hải sản xào rau"
        },
        "sizes": [
          [
            "×2",
            700000
          ],
          [
            "×3",
            1000000
          ]
        ]
      }
    ]
  },
  {
    "id": "half",
    "name": {
      "ko": "반반 · 정식",
      "en": "Half & Half · Set Meals",
      "zh": "半半套餐 · 定食",
      "ja": "ハーフ&ハーフ · 定食",
      "vi": "Combo · Cơm phần"
    },
    "items": [
      {
        "name": {
          "ko": "짬짜 · 볶짬 · 볶짜 (반반)",
          "en": "Half & Half: Jjamppong/Jajangmyeon · Fried Rice/Jjamppong · Fried Rice/Jajangmyeon",
          "zh": "半半:辣海鲜汤面/炸酱面 · 炒饭/辣海鲜汤面 · 炒饭/炸酱面",
          "ja": "ハーフ&ハーフ:チャンポン/ジャジャン麺 · チャーハン/チャンポン · チャーハン/ジャジャン麺",
          "vi": "Combo nửa-nửa (mì cay · mì đen · cơm chiên)"
        },
        "price": 160000
      },
      {
        "name": {
          "ko": "탕짬 · 탕짜 · 탕볶 (반반)",
          "en": "Half & Half: Tangsuyuk/Jjamppong · Tangsuyuk/Jajangmyeon · Tangsuyuk/Fried Rice",
          "zh": "半半:糖醋肉/辣海鲜汤面 · 糖醋肉/炸酱面 · 糖醋肉/炒饭",
          "ja": "ハーフ&ハーフ:酢豚/チャンポン · 酢豚/ジャジャン麺 · 酢豚/チャーハン",
          "vi": "Combo nửa-nửa kèm món chua ngọt"
        },
        "price": 180000
      },
      {
        "name": {
          "ko": "탕수육 정식",
          "en": "Tangsuyuk Set Meal",
          "zh": "糖醋肉套餐",
          "ja": "タンスユク定食",
          "vi": "Cơm phần thịt chua ngọt"
        },
        "price": 190000
      },
      {
        "name": {
          "ko": "고추잡채 정식",
          "en": "Gochujapchae Set Meal",
          "zh": "青椒肉丝套餐",
          "ja": "青椒肉絲定食",
          "vi": "Cơm phần ớt xào thịt"
        },
        "price": 190000
      },
      {
        "name": {
          "ko": "팔보채 정식",
          "en": "Palbochae Set Meal",
          "zh": "八宝菜套餐",
          "ja": "八宝菜定食",
          "vi": "Cơm phần hải sản xào rau"
        },
        "price": 190000
      },
      {
        "name": {
          "ko": "새우칠리 정식",
          "en": "Chili Shrimp Set Meal",
          "zh": "干烧虾仁套餐",
          "ja": "エビチリ定食",
          "vi": "Cơm phần tôm sốt chua ngọt"
        },
        "price": 190000
      },
      {
        "name": {
          "ko": "유산슬 정식",
          "en": "Yusanseul Set Meal",
          "zh": "溜三丝套餐",
          "ja": "ユサンスル定食",
          "vi": "Cơm phần măng xào hải sản"
        },
        "price": 190000
      }
    ]
  },
  {
    "id": "set",
    "name": {
      "ko": "세트메뉴",
      "en": "Set Menu",
      "zh": "套餐",
      "ja": "セットメニュー",
      "vi": "Set menu"
    },
    "items": [
      {
        "name": {
          "ko": "1. 탕수육+짜장+짬뽕",
          "en": "1. Tangsuyuk + Jajangmyeon + Jjamppong",
          "zh": "1. 糖醋肉+炸酱面+辣海鲜汤面",
          "ja": "1. 酢豚+ジャジャン麺+チャンポン",
          "vi": "Thịt chua ngọt + mì đen + mì cay"
        },
        "price": 400000
      },
      {
        "name": {
          "ko": "2. 탕수육+삼선짜장+삼선짬뽕",
          "en": "2. Tangsuyuk + Seafood Jajangmyeon + Seafood Jjamppong",
          "zh": "2. 糖醋肉+三鲜炸酱面+三鲜辣海鲜汤面",
          "ja": "2. 酢豚+海鮮ジャジャン麺+海鮮チャンポン",
          "vi": "Thịt chua ngọt + mì đen hải sản + mì cay hải sản"
        },
        "price": 450000
      },
      {
        "name": {
          "ko": "3. 새우칠리+짜장+짬뽕",
          "en": "3. Chili Shrimp + Jajangmyeon + Jjamppong",
          "zh": "3. 干烧虾仁+炸酱面+辣海鲜汤面",
          "ja": "3. エビチリ+ジャジャン麺+チャンポン",
          "vi": "Tôm sốt chua ngọt + mì đen + mì cay"
        },
        "price": 550000
      },
      {
        "name": {
          "ko": "4. 새우칠리+삼선짜장+삼선짬뽕",
          "en": "4. Chili Shrimp + Seafood Jajangmyeon + Seafood Jjamppong",
          "zh": "4. 干烧虾仁+三鲜炸酱面+三鲜辣海鲜汤面",
          "ja": "4. エビチリ+海鮮ジャジャン麺+海鮮チャンポン",
          "vi": "Tôm sốt chua ngọt + mì đen hải sản + mì cay hải sản"
        },
        "price": 600000
      },
      {
        "name": {
          "ko": "5. 팔보채+짜장+짬뽕",
          "en": "5. Palbochae + Jajangmyeon + Jjamppong",
          "zh": "5. 八宝菜+炸酱面+辣海鲜汤面",
          "ja": "5. 八宝菜+ジャジャン麺+チャンポン",
          "vi": "Hải sản xào rau + mì đen + mì cay"
        },
        "price": 550000
      },
      {
        "name": {
          "ko": "6. 팔보채+삼선짜장+삼선짬뽕",
          "en": "6. Palbochae + Seafood Jajangmyeon + Seafood Jjamppong",
          "zh": "6. 八宝菜+三鲜炸酱面+三鲜辣海鲜汤面",
          "ja": "6. 八宝菜+海鮮ジャジャン麺+海鮮チャンポン",
          "vi": "Hải sản xào rau + mì đen hải sản + mì cay hải sản"
        },
        "price": 600000
      },
      {
        "name": {
          "ko": "7. 양장피+짜장+짬뽕",
          "en": "7. Yangjangpi + Jajangmyeon + Jjamppong",
          "zh": "7. 什锦凉拌粉皮+炸酱面+辣海鲜汤面",
          "ja": "7. ヤンジャンピ+ジャジャン麺+チャンポン",
          "vi": "Gỏi thập cẩm + mì đen + mì cay"
        },
        "price": 550000
      },
      {
        "name": {
          "ko": "8. 양장피+삼선짜장+삼선짬뽕",
          "en": "8. Yangjangpi + Seafood Jajangmyeon + Seafood Jjamppong",
          "zh": "8. 什锦凉拌粉皮+三鲜炸酱面+三鲜辣海鲜汤面",
          "ja": "8. ヤンジャンピ+海鮮ジャジャン麺+海鮮チャンポン",
          "vi": "Gỏi thập cẩm + mì đen hải sản + mì cay hải sản"
        },
        "price": 600000
      },
      {
        "name": {
          "ko": "9. 깐풍기+짜장+짬뽕",
          "en": "9. Kkanpunggi + Jajangmyeon + Jjamppong",
          "zh": "9. 干烹鸡+炸酱面+辣海鲜汤面",
          "ja": "9. カンプンギ+ジャジャン麺+チャンポン",
          "vi": "Gà xào cay + mì đen + mì cay"
        },
        "price": 550000
      },
      {
        "name": {
          "ko": "10. 깐풍기+삼선짜장+삼선짬뽕",
          "en": "10. Kkanpunggi + Seafood Jajangmyeon + Seafood Jjamppong",
          "zh": "10. 干烹鸡+三鲜炸酱面+三鲜辣海鲜汤面",
          "ja": "10. カンプンギ+海鮮ジャジャン麺+海鮮チャンポン",
          "vi": "Gà xào cay + mì đen hải sản + mì cay hải sản"
        },
        "price": 600000
      }
    ]
  },
  {
    "id": "lunch",
    "name": {
      "ko": "요일별 점심특선",
      "en": "Daily Lunch Specials",
      "zh": "每日午餐特餐",
      "ja": "曜日別ランチ特選",
      "vi": "Set trưa theo ngày"
    },
    "note": {
      "ko": "1인 250,000₫ · 2인 이상 주문 가능 · 짜장 또는 짬뽕 선택",
      "en": "250,000₫ per person · Order for 2 or more · Choose Jajangmyeon or Jjamppong",
      "zh": "每人 250,000₫ · 2人起点 · 可选炸酱面或辣海鲜汤面",
      "ja": "1人 250,000₫ · 2名様から注文可 · ジャジャン麺かチャンポンを選択",
      "vi": "250.000₫/người · Từ 2 người · Chọn mì đen hoặc mì cay"
    },
    "items": [
      {
        "name": {
          "ko": "월요일 점심특선",
          "en": "Monday Lunch Special",
          "zh": "周一午餐特餐",
          "ja": "月曜日ランチ特選",
          "vi": "Set trưa Thứ 2"
        },
        "price": 250000,
        "desc": {
          "ko": "스프 · 양장피 · 유산슬 · 가지볶음 · 짜장 또는 짬뽕",
          "en": "Soup · Yangjangpi · Yusanseul · Stir-fried Eggplant · Jajangmyeon or Jjamppong",
          "zh": "汤 · 什锦凉拌粉皮 · 溜三丝 · 炒茄子 · 炸酱面或辣海鲜汤面",
          "ja": "スープ · ヤンジャンピ · ユサンスル · ナスの炒め物 · ジャジャン麺またはチャンポン",
          "vi": "Súp · Gỏi thập cẩm · Măng xào hải sản · Cà tím xào · Mì đen hoặc mì cay"
        }
      },
      {
        "name": {
          "ko": "화요일 점심특선",
          "en": "Tuesday Lunch Special",
          "zh": "周二午餐特餐",
          "ja": "火曜日ランチ特選",
          "vi": "Set trưa Thứ 3"
        },
        "price": 250000,
        "desc": {
          "ko": "스프 · 팔보채 · 짜장 또는 짬뽕",
          "en": "Soup · Palbochae · Jajangmyeon or Jjamppong",
          "zh": "汤 · 八宝菜 · 炸酱面或辣海鲜汤面",
          "ja": "スープ · 八宝菜 · ジャジャン麺またはチャンポン",
          "vi": "Súp · Hải sản xào rau · Mì đen hoặc mì cay"
        }
      },
      {
        "name": {
          "ko": "수요일 점심특선",
          "en": "Wednesday Lunch Special",
          "zh": "周三午餐特餐",
          "ja": "水曜日ランチ特選",
          "vi": "Set trưa Thứ 4"
        },
        "price": 250000,
        "desc": {
          "ko": "스프 · 양장피 · 크림새우 · 마파두부 · 짜장 또는 짬뽕",
          "en": "Soup · Yangjangpi · Cream Shrimp · Mapo Tofu · Jajangmyeon or Jjamppong",
          "zh": "汤 · 什锦凉拌粉皮 · 奶油虾 · 麻婆豆腐 · 炸酱面或辣海鲜汤面",
          "ja": "スープ · ヤンジャンピ · クリームエビ · 麻婆豆腐 · ジャジャン麺またはチャンポン",
          "vi": "Súp · Gỏi thập cẩm · Tôm sốt kem · Đậu hũ sốt tứ xuyên · Mì đen hoặc mì cay"
        }
      },
      {
        "name": {
          "ko": "목요일 점심특선",
          "en": "Thursday Lunch Special",
          "zh": "周四午餐特餐",
          "ja": "木曜日ランチ特選",
          "vi": "Set trưa Thứ 5"
        },
        "price": 250000,
        "desc": {
          "ko": "스프 · 유산슬 · 칠리새우 · 고추잡채 · 짜장 또는 짬뽕",
          "en": "Soup · Yusanseul · Chili Shrimp · Gochujapchae · Jajangmyeon or Jjamppong",
          "zh": "汤 · 溜三丝 · 干烧虾仁 · 青椒肉丝 · 炸酱面或辣海鲜汤面",
          "ja": "スープ · ユサンスル · エビチリ · 青椒肉絲 · ジャジャン麺またはチャンポン",
          "vi": "Súp · Măng xào hải sản · Tôm sốt chua ngọt · Ớt xào thịt · Mì đen hoặc mì cay"
        }
      },
      {
        "name": {
          "ko": "금요일 점심특선",
          "en": "Friday Lunch Special",
          "zh": "周五午餐特餐",
          "ja": "金曜日ランチ特選",
          "vi": "Set trưa Thứ 6"
        },
        "price": 250000,
        "desc": {
          "ko": "스프 · 양장피 · 깐풍기 · 잡채 · 짜장 또는 짬뽕",
          "en": "Soup · Yangjangpi · Kkanpunggi · Japchae (Stir-fried Glass Noodles) · Jajangmyeon or Jjamppong",
          "zh": "汤 · 什锦凉拌粉皮 · 干烹鸡 · 炒杂菜粉丝 · 炸酱面或辣海鲜汤面",
          "ja": "スープ · ヤンジャンピ · カンプンギ · チャプチェ(春雨炒め) · ジャジャン麺またはチャンポン",
          "vi": "Súp · Gỏi thập cẩm · Gà xào cay · Miến xào · Mì đen hoặc mì cay"
        }
      },
      {
        "name": {
          "ko": "토 · 일요일 점심특선",
          "en": "Saturday · Sunday Lunch Special",
          "zh": "周六 · 周日午餐特餐",
          "ja": "土 · 日曜日ランチ特選",
          "vi": "Set trưa Thứ 7 · Chủ nhật"
        },
        "price": 250000,
        "desc": {
          "ko": "스프 · 팔보채 · 유린기 · 고추잡채 · 짜장 또는 짬뽕",
          "en": "Soup · Palbochae · Yurinki (Fried Chicken with Scallion Vinegar Sauce) · Gochujapchae · Jajangmyeon or Jjamppong",
          "zh": "汤 · 八宝菜 · 油淋鸡 · 青椒肉丝 · 炸酱面或辣海鲜汤面",
          "ja": "スープ · 八宝菜 · ユーリンチー(揚げ鶏のネギ酢ソース) · 青椒肉絲 · ジャジャン麺またはチャンポン",
          "vi": "Súp · Hải sản xào rau · Gà rán sốt hành giấm · Ớt xào thịt · Mì đen hoặc mì cay"
        }
      }
    ]
  },
  {
    "id": "jjamppong",
    "name": {
      "ko": "짬뽕 · 전골",
      "en": "Jjamppong · Hot Pot",
      "zh": "辣海鲜汤面 · 火锅",
      "ja": "チャンポン · 鍋",
      "vi": "Mì cay · Lẩu"
    },
    "note": {
      "ko": "새로운 메뉴: 짬뽕전골 (입구 입간판 기준)",
      "en": "New menu: Jjamppong Jeongol (Spicy Noodle Hot Pot) (per the sign at the entrance)",
      "zh": "新菜品:辣汤火锅(依据门口立牌)",
      "ja": "新メニュー:チャンポン鍋(入口の立て看板より)",
      "vi": "Món mới: lẩu mì cay"
    },
    "items": [
      {
        "name": {
          "ko": "해물짬뽕전골",
          "en": "Seafood Jjamppong Jeongol (Spicy Seafood Hot Pot)",
          "zh": "海鲜辣汤火锅",
          "ja": "海鮮チャンポン鍋",
          "vi": "Lẩu hải sản cay"
        },
        "price": 500000,
        "spicy": true
      },
      {
        "name": {
          "ko": "쇠고기짬뽕전골",
          "en": "Beef Jjamppong Jeongol (Spicy Beef Hot Pot)",
          "zh": "牛肉辣汤火锅",
          "ja": "牛肉チャンポン鍋",
          "vi": "Lẩu bò cay"
        },
        "price": 400000,
        "spicy": true
      },
      {
        "name": {
          "ko": "소갈비짬뽕",
          "en": "Beef Short Rib Jjamppong",
          "zh": "牛排骨辣海鲜汤面",
          "ja": "牛カルビチャンポン",
          "vi": "Mì cay sườn bò"
        },
        "price": 200000,
        "spicy": true
      },
      {
        "name": {
          "ko": "통오징어짬뽕",
          "en": "Whole Squid Jjamppong",
          "zh": "整只鱿鱼辣海鲜汤面",
          "ja": "丸ごとイカチャンポン",
          "vi": "Mì cay mực nguyên con"
        },
        "price": 200000,
        "spicy": true
      },
      {
        "name": {
          "ko": "통닭짬뽕",
          "en": "Whole Chicken Jjamppong",
          "zh": "整鸡辣海鲜汤面",
          "ja": "丸ごと鶏チャンポン",
          "vi": "Mì cay gà nguyên con"
        },
        "price": 200000,
        "spicy": true
      },
      {
        "name": {
          "ko": "마라짬뽕",
          "en": "Mala Jjamppong (Numbing Spicy Noodle Soup)",
          "zh": "麻辣海鲜汤面",
          "ja": "マーラーチャンポン",
          "vi": "Mì cay Mala"
        },
        "price": 180000,
        "spicy": true
      },
      {
        "name": {
          "ko": "차돌짬뽕",
          "en": "Beef Brisket (Chadol) Jjamppong",
          "zh": "牛腩辣海鲜汤面",
          "ja": "牛バラ(チャドル)チャンポン",
          "vi": "Mì cay thịt bò chadol"
        },
        "price": 180000,
        "spicy": true
      },
      {
        "name": {
          "ko": "갈비짬뽕",
          "en": "Rib Jjamppong",
          "zh": "排骨辣海鲜汤面",
          "ja": "カルビチャンポン",
          "vi": "Mì cay sườn"
        },
        "price": 180000,
        "spicy": true
      }
    ]
  },
  {
    "id": "pocha",
    "name": {
      "ko": "포차 메뉴",
      "en": "Pocha (Korean Pub) Menu",
      "zh": "韩式小酒馆菜单",
      "ja": "ポチャ(居酒屋)メニュー",
      "vi": "Món nhậu"
    },
    "note": {
      "ko": "저녁 9시부터 새벽까지",
      "en": "From 9 PM until dawn",
      "zh": "晚上9点至凌晨",
      "ja": "夜9時から明け方まで",
      "vi": "Từ 21:00 đến sáng"
    },
    "items": [
      {
        "name": {
          "ko": "새우칠리",
          "en": "Chili Shrimp",
          "zh": "干烧虾仁",
          "ja": "エビチリ",
          "vi": "Tôm sốt chua ngọt"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "크림새우",
          "en": "Cream Shrimp",
          "zh": "奶油虾",
          "ja": "クリームエビ",
          "vi": "Tôm sốt kem"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "깐풍기",
          "en": "Kkanpunggi (Crispy Fried Chicken in Spicy Sauce)",
          "zh": "干烹鸡",
          "ja": "カンプンギ(甘辛い揚げ鶏)",
          "vi": "Gà xào cay"
        },
        "price": 200000,
        "spicy": true
      },
      {
        "name": {
          "ko": "팔보채",
          "en": "Palbochae (Stir-fried Seafood & Vegetables)",
          "zh": "八宝菜",
          "ja": "八宝菜",
          "vi": "Hải sản xào rau"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "유산슬",
          "en": "Yusanseul (Seafood & Vegetables in Starch Sauce)",
          "zh": "溜三丝(海鲜蔬菜勾芡)",
          "ja": "ユサンスル(海鮮と野菜のとろみ炒め)",
          "vi": "Măng xào hải sản"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "낙지볶음",
          "en": "Stir-fried Octopus (Nakji-bokkeum)",
          "zh": "辣炒章鱼",
          "ja": "ナクチポックム(タコの辛味炒め)",
          "vi": "Bạch tuộc xào"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "제육볶음",
          "en": "Jeyuk-bokkeum (Spicy Stir-fried Pork)",
          "zh": "辣炒猪肉",
          "ja": "ジェユクポックム(豚肉の辛味炒め)",
          "vi": "Thịt ba chỉ xào"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "마라샹궈",
          "en": "Mala Xiangguo (Spicy Dry Pot)",
          "zh": "麻辣香锅",
          "ja": "マーラーシャンゴー(麻辣炒め鍋)",
          "vi": "Lẩu khô Mala"
        },
        "price": 200000,
        "spicy": true
      },
      {
        "name": {
          "ko": "마라탕",
          "en": "Malatang (Spicy Numbing Hot Pot Soup)",
          "zh": "麻辣烫",
          "ja": "マーラータン(麻辣スープ)",
          "vi": "Lẩu Mala thập cẩm"
        },
        "price": 250000,
        "spicy": true
      },
      {
        "name": {
          "ko": "양장피",
          "en": "Yangjangpi (Cold Seafood & Meat Salad with Mustard Sauce)",
          "zh": "什锦凉拌粉皮",
          "ja": "ヤンジャンピ(五目春雨の冷菜)",
          "vi": "Gỏi thập cẩm"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "냉채",
          "en": "Naengchae (Cold Jellyfish Salad)",
          "zh": "凉拌海蜇",
          "ja": "ネンチェ(クラゲの冷菜)",
          "vi": "Gỏi sứa"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "동파육",
          "en": "Dongpayuk (Braised Pork Belly)",
          "zh": "东坡肉",
          "ja": "トンポーロー(豚の角煮)",
          "vi": "Thịt ba chỉ hấp"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "갈비볶음",
          "en": "Stir-fried Ribs (Galbi-bokkeum)",
          "zh": "炒排骨",
          "ja": "カルビ炒め",
          "vi": "Sườn xào"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "고추삼겹살",
          "en": "Pork Belly with Chili Peppers",
          "zh": "辣椒炒五花肉",
          "ja": "唐辛子入り豚バラ炒め",
          "vi": "Ba chỉ xào ớt"
        },
        "price": 200000
      }
    ]
  },
  {
    "id": "summer",
    "name": {
      "ko": "여름 별미",
      "en": "Summer Specialties",
      "zh": "夏季特色",
      "ja": "夏の味",
      "vi": "Món mùa hè"
    },
    "note": {
      "ko": "5월~10월 한정",
      "en": "May to October only",
      "zh": "仅限5月至10月",
      "ja": "5月〜10月限定",
      "vi": "Từ tháng 5 đến tháng 10"
    },
    "items": [
      {
        "name": {
          "ko": "냉면",
          "en": "Naengmyeon (Cold Noodles)",
          "zh": "冷面",
          "ja": "冷麺",
          "vi": "Miến lạnh"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "냉짬뽕",
          "en": "Naeng-Jjamppong (Cold Spicy Seafood Noodles)",
          "zh": "冷辣海鲜汤面",
          "ja": "冷やしチャンポン",
          "vi": "Mì cay lạnh"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "비빔냉면",
          "en": "Bibim Naengmyeon (Spicy Mixed Cold Noodles)",
          "zh": "拌冷面",
          "ja": "ビビン冷麺",
          "vi": "Miến trộn"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "콩국수",
          "en": "Kongguksu (Cold Soy Milk Noodles)",
          "zh": "豆浆冷面",
          "ja": "コングクス(豆乳冷麺)",
          "vi": "Mì sữa đậu nành"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "중국식냉면",
          "en": "Chinese-style Cold Noodles",
          "zh": "中式凉面",
          "ja": "中華風冷麺",
          "vi": "Mì lạnh kiểu Trung Quốc"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "냉우동",
          "en": "Cold Udon",
          "zh": "冷乌冬面",
          "ja": "冷やしうどん",
          "vi": "Mì udon lạnh"
        },
        "price": 150000
      }
    ]
  }
];
