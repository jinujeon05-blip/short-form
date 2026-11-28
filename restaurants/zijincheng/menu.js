// 자금성 하노이 메뉴 — 출처: 구글 지도에 올라온 메뉴판 사진 31장(2026-11-28 수집). 새판(A~H 글자 번호판)을 기준으로, 사진마다 가격이 다르면 높은 쪽.
// price: 한 가지 가격 / sizes: [[라벨, 가격], …] / tag: "best" / spicy: true / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "하노이 자금성", en: "Jageumseong Hanoi" },
  phone: "098 645 8393",
  address: "LKC03, Khu đô thị Tây Hồ Tây, Xuân Đỉnh, Hà Nội",
  wifi: null,
  hours: "10:20 – 22:00",
};

window.MENU = [
  {
    "id": "soup",
    "name": {
      "ko": "스프 · 냉채",
      "en": "Soups · Cold Appetizers",
      "zh": "汤 · 凉菜",
      "ja": "スープ・冷菜",
      "vi": "Súp · Món nguội"
    },
    "items": [
      {
        "name": {
          "ko": "매생이스프",
          "en": "Maesaengi Soup (fine seaweed soup)",
          "zh": "青苔浓汤",
          "ja": "メセンイスープ(青のりスープ)",
          "vi": "Súp rong biển Maesaengi"
        },
        "price": 130000
      },
      {
        "name": {
          "ko": "계란탕",
          "en": "Egg Drop Soup (Gyeran-tang)",
          "zh": "蛋花汤",
          "ja": "卵スープ",
          "vi": "Súp trứng"
        },
        "price": 350000
      },
      {
        "name": {
          "ko": "해물누룽지탕",
          "en": "Seafood Nurungji-tang (seafood with crispy rice soup)",
          "zh": "海鲜锅巴汤",
          "ja": "海鮮おこげスープ",
          "vi": "Súp hải sản cơm cháy"
        },
        "price": 600000
      },
      {
        "name": {
          "ko": "양장피",
          "en": "Yangjangpi (cold seafood and mung bean sheet salad)",
          "zh": "两张皮(杂烩拌粉皮)",
          "ja": "ヤンジャンピ(春雨と海鮮の冷菜)",
          "vi": "Yangjangpi (gỏi hải sản trộn miến)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            800000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1000000
          ]
        ]
      },
      {
        "name": {
          "ko": "오향장육",
          "en": "Ohyang Jangyuk (five-spice braised beef and pork)",
          "zh": "五香酱肉",
          "ja": "五香醤肉(オヒャンジャンユク)",
          "vi": "Ohyang Jangyuk (thịt kho ngũ vị hương)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            800000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1000000
          ]
        ]
      },
      {
        "name": {
          "ko": "삼품냉채",
          "en": "Three-Item Cold Platter",
          "zh": "三品冷盘",
          "ja": "三品冷菜盛り合わせ",
          "vi": "Đĩa nguội ba món"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            800000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1000000
          ]
        ]
      },
      {
        "name": {
          "ko": "사품냉채",
          "en": "Four-Item Cold Platter",
          "zh": "四品冷盘",
          "ja": "四品冷菜盛り合わせ",
          "vi": "Đĩa nguội bốn món"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            800000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            1050000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1250000
          ]
        ]
      }
    ]
  },
  {
    "id": "noodle",
    "name": {
      "ko": "면류",
      "en": "Noodles",
      "zh": "面类",
      "ja": "麺類",
      "vi": "Các món mì"
    },
    "note": {
      "ko": "전 메뉴 곱빼기 +30,000₫",
      "en": "Large portion for any item +30,000₫",
      "zh": "所有菜品加大份 +30,000₫",
      "ja": "全メニュー大盛り +30,000₫",
      "vi": "Tất cả món gọi phần lớn +30,000₫"
    },
    "items": [
      {
        "name": {
          "ko": "자장면",
          "en": "Jajangmyeon (black bean sauce noodles)",
          "zh": "炸酱面",
          "ja": "ジャジャン麺(黒味噌麺)",
          "vi": "Jajangmyeon (mì tương đen)"
        },
        "price": 130000,
        "photo": "img/jajangmyeon.jpg",
        "tag": "best"
      },
      {
        "name": {
          "ko": "유니자장면",
          "en": "Yuni Jajangmyeon (black bean noodles with fine-ground sauce)",
          "zh": "肉泥炸酱面",
          "ja": "ユニジャジャン麺(ひき肉ジャジャン麺)",
          "vi": "Yuni Jajangmyeon (mì tương đen sốt thịt xay nhuyễn)"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "간자장면",
          "en": "Ganjajangmyeon (dry-fried black bean sauce noodles)",
          "zh": "干炸酱面",
          "ja": "カンジャジャン麺(汁なし炒めジャジャン麺)",
          "vi": "Ganjajangmyeon (mì tương đen xào khô)"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "소고기자장면",
          "en": "Beef Jajangmyeon (black bean sauce noodles with beef)",
          "zh": "牛肉炸酱面",
          "ja": "牛肉ジャジャン麺",
          "vi": "Jajangmyeon thịt bò"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "삼선자장면",
          "en": "Samseon Jajangmyeon (black bean noodles with seafood)",
          "zh": "三鲜炸酱面",
          "ja": "三鮮ジャジャン麺(海鮮入り)",
          "vi": "Samseon Jajangmyeon (mì tương đen hải sản)"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "사천자장면",
          "en": "Sichuan Jajangmyeon (spicy)",
          "zh": "四川炸酱面（辣）",
          "ja": "四川ジャジャン麺（辛い）",
          "vi": "Mì tương đen kiểu Tứ Xuyên (cay)"
        },
        "price": 200000,
        "spicy": true
      },
      {
        "name": {
          "ko": "삼선간자장면",
          "en": "Samseon Ganjajangmyeon (dry-fried black bean noodles with seafood)",
          "zh": "三鲜干炸酱面",
          "ja": "三鮮カンジャジャン麺(海鮮入り)",
          "vi": "Samseon Ganjajangmyeon (mì tương đen xào khô hải sản)"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "유슬자장면 (매운자장면)",
          "en": "Yuseul Jajangmyeon (spicy black bean noodles with shredded meat)",
          "zh": "肉丝炸酱面(辣味炸酱面)",
          "ja": "ユスルジャジャン麺(辛いジャジャン麺)",
          "vi": "Yuseul Jajangmyeon (mì tương đen cay)"
        },
        "price": 200000,
        "spicy": true
      },
      {
        "name": {
          "ko": "쟁반자장면 (1인분)",
          "en": "Jaengban Jajangmyeon (black bean noodles on a platter, 1 serving)",
          "zh": "盘装炸酱面(1人份)",
          "ja": "チェンバンジャジャン麺(大皿・1人前)",
          "vi": "Jaengban Jajangmyeon (mì tương đen khay, 1 phần)"
        },
        "price": 170000
      },
      {
        "name": {
          "ko": "짬뽕",
          "en": "Jjamppong (spicy seafood noodle soup)",
          "zh": "炒码面(辣海鲜汤面)",
          "ja": "チャンポン(辛い海鮮スープ麺)",
          "vi": "Jjamppong (mì hải sản cay)"
        },
        "price": 170000,
        "spicy": true
      },
      {
        "name": {
          "ko": "삼선짬뽕",
          "en": "Samseon Jjamppong (spicy noodle soup with sea cucumber, shrimp and squid)",
          "zh": "三鲜炒码面",
          "ja": "三鮮チャンポン",
          "vi": "Samseon Jjamppong (mì hải sản cay thập cẩm)"
        },
        "price": 220000,
        "photo": "img/samseon-jjamppong.jpg",
        "spicy": true,
        "tag": "best"
      },
      {
        "name": {
          "ko": "홍합굴짬뽕",
          "en": "Mussel and Oyster Jjamppong (spicy seafood noodle soup)",
          "zh": "青口牡蛎炒码面",
          "ja": "ムール貝と牡蠣のチャンポン",
          "vi": "Jjamppong vẹm và hàu"
        },
        "price": 220000,
        "spicy": true
      },
      {
        "name": {
          "ko": "굴짬뽕",
          "en": "Oyster Jjamppong (spicy seafood noodle soup)",
          "zh": "牡蛎炒码面",
          "ja": "牡蠣チャンポン",
          "vi": "Jjamppong hàu"
        },
        "price": 220000,
        "spicy": true
      },
      {
        "name": {
          "ko": "쟁반짬뽕 (1인분)",
          "en": "Jaengban Jjamppong (spicy stir-fried noodles on a platter, 1 serving)",
          "zh": "盘装炒码面(1人份)",
          "ja": "チェンバンチャンポン(大皿・1人前)",
          "vi": "Jaengban Jjamppong (mì xào hải sản cay khay, 1 phần)"
        },
        "price": 220000,
        "spicy": true
      },
      {
        "name": {
          "ko": "우동",
          "en": "Udong (Chinese-Korean style udon soup)",
          "zh": "乌冬面",
          "ja": "ウドン(中華風うどん)",
          "vi": "Udong (mì udon kiểu Hàn-Hoa)"
        },
        "price": 170000
      },
      {
        "name": {
          "ko": "삼선우동",
          "en": "Samseon Udong (udon soup with seafood)",
          "zh": "三鲜乌冬面",
          "ja": "三鮮ウドン",
          "vi": "Samseon Udong (mì udon hải sản)"
        },
        "price": 220000
      },
      {
        "name": {
          "ko": "울면",
          "en": "Ulmyeon (thick starchy noodle soup)",
          "zh": "勾芡卤面(蛋花浓汤面)",
          "ja": "ウルミョン(とろみスープ麺)",
          "vi": "Ulmyeon (mì nước sệt)"
        },
        "price": 170000
      },
      {
        "name": {
          "ko": "삼선울면",
          "en": "Samseon Ulmyeon (thick noodle soup with seafood)",
          "zh": "三鲜勾芡卤面",
          "ja": "三鮮ウルミョン",
          "vi": "Samseon Ulmyeon (mì nước sệt hải sản)"
        },
        "price": 220000
      },
      {
        "name": {
          "ko": "기스면",
          "en": "Gisumyeon (clear chicken broth noodles)",
          "zh": "鸡丝面",
          "ja": "キスミョン(鶏だしの細麺スープ)",
          "vi": "Gisumyeon (mì nước dùng gà)"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "냉짬뽕 (계절 메뉴)",
          "en": "Cold Jjamppong (cold spicy seafood noodles, seasonal)",
          "zh": "冷炒码面(季节限定)",
          "ja": "冷やしチャンポン(季節限定)",
          "vi": "Jjamppong lạnh (món theo mùa)"
        },
        "price": 200000,
        "photo": "img/naeng-jjamppong.jpg"
      },
      {
        "name": {
          "ko": "콩국수 (계절 메뉴)",
          "en": "Kongguksu (cold soybean noodle soup, seasonal)",
          "zh": "冷豆浆面(季节限定)",
          "ja": "コングクス(冷たい豆乳麺・季節限定)",
          "vi": "Kongguksu (mì sữa đậu nành lạnh, món theo mùa)"
        },
        "price": 180000
      }
    ]
  },
  {
    "id": "half",
    "name": {
      "ko": "반반 메뉴 (1인분)",
      "en": "Half-and-Half Menu (1 serving)",
      "zh": "双拼菜单(1人份)",
      "ja": "半々メニュー(1人前)",
      "vi": "Món kết hợp hai nửa (1 phần)"
    },
    "items": [
      {
        "name": {
          "ko": "짬뽕 + 짜장면",
          "en": "Jjamppong + Jajangmyeon",
          "zh": "炒码面 + 炸酱面",
          "ja": "チャンポン + ジャジャン麺",
          "vi": "Jjamppong + Jajangmyeon"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "볶음밥 + 짜장면",
          "en": "Fried Rice + Jajangmyeon",
          "zh": "炒饭 + 炸酱面",
          "ja": "チャーハン + ジャジャン麺",
          "vi": "Cơm chiên + Jajangmyeon"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "볶음밥 + 짬뽕",
          "en": "Fried Rice + Jjamppong",
          "zh": "炒饭 + 炒码面",
          "ja": "チャーハン + チャンポン",
          "vi": "Cơm chiên + Jjamppong"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "탕수육 + 짜장면",
          "en": "Tangsuyuk + Jajangmyeon",
          "zh": "糖醋肉 + 炸酱面",
          "ja": "タンスユク + ジャジャン麺",
          "vi": "Tangsuyuk + Jajangmyeon"
        },
        "price": 210000
      },
      {
        "name": {
          "ko": "탕수육 + 짬뽕",
          "en": "Tangsuyuk + Jjamppong",
          "zh": "糖醋肉 + 炒码面",
          "ja": "タンスユク + チャンポン",
          "vi": "Tangsuyuk + Jjamppong"
        },
        "price": 210000
      },
      {
        "name": {
          "ko": "탕수육 + 볶음밥",
          "en": "Tangsuyuk + Fried Rice",
          "zh": "糖醋肉 + 炒饭",
          "ja": "タンスユク + チャーハン",
          "vi": "Tangsuyuk + Cơm chiên"
        },
        "price": 210000
      },
      {
        "name": {
          "ko": "탕수육 + 짬뽕 + 짜장면",
          "en": "Tangsuyuk + Jjamppong + Jajangmyeon",
          "zh": "糖醋肉 + 炒码面 + 炸酱面",
          "ja": "タンスユク + チャンポン + ジャジャン麺",
          "vi": "Tangsuyuk + Jjamppong + Jajangmyeon"
        },
        "price": 240000,
        "photo": "img/tri-combo.jpg"
      },
      {
        "name": {
          "ko": "탕수육 + 짬뽕 + 볶음밥",
          "en": "Tangsuyuk + Jjamppong + Fried Rice",
          "zh": "糖醋肉 + 炒码面 + 炒饭",
          "ja": "タンスユク + チャンポン + チャーハン",
          "vi": "Tangsuyuk + Jjamppong + Cơm chiên"
        },
        "price": 240000
      },
      {
        "name": {
          "ko": "탕수육 + 짜장면 + 볶음밥",
          "en": "Tangsuyuk + Jajangmyeon + Fried Rice",
          "zh": "糖醋肉 + 炸酱面 + 炒饭",
          "ja": "タンスユク + ジャジャン麺 + チャーハン",
          "vi": "Tangsuyuk + Jajangmyeon + Cơm chiên"
        },
        "price": 240000
      },
      {
        "name": {
          "ko": "크림새우 + 짜장면 + 짬뽕",
          "en": "Cream Shrimp + Jajangmyeon + Jjamppong",
          "zh": "奶油虾 + 炸酱面 + 炒码面",
          "ja": "クリームエビ + ジャジャン麺 + チャンポン",
          "vi": "Tôm sốt kem + Jajangmyeon + Jjamppong"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "크림새우 + 짜장면 + 볶음밥",
          "en": "Cream Shrimp + Jajangmyeon + Fried Rice",
          "zh": "奶油虾 + 炸酱面 + 炒饭",
          "ja": "クリームエビ + ジャジャン麺 + チャーハン",
          "vi": "Tôm sốt kem + Jajangmyeon + Cơm chiên"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "크림새우 + 짬뽕 + 볶음밥",
          "en": "Cream Shrimp + Jjamppong + Fried Rice",
          "zh": "奶油虾 + 炒码面 + 炒饭",
          "ja": "クリームエビ + チャンポン + チャーハン",
          "vi": "Tôm sốt kem + Jjamppong + Cơm chiên"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "칠리새우 + 짜장면 + 짬뽕",
          "en": "Chili Shrimp + Jajangmyeon + Jjamppong",
          "zh": "干烧虾仁 + 炸酱面 + 炒码面",
          "ja": "エビチリ + ジャジャン麺 + チャンポン",
          "vi": "Tôm sốt ớt + Jajangmyeon + Jjamppong"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "칠리새우 + 짜장면 + 볶음밥",
          "en": "Chili Shrimp + Jajangmyeon + Fried Rice",
          "zh": "干烧虾仁 + 炸酱面 + 炒饭",
          "ja": "エビチリ + ジャジャン麺 + チャーハン",
          "vi": "Tôm sốt ớt + Jajangmyeon + Cơm chiên"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "칠리새우 + 짬뽕 + 볶음밥",
          "en": "Chili Shrimp + Jjamppong + Fried Rice",
          "zh": "干烧虾仁 + 炒码面 + 炒饭",
          "ja": "エビチリ + チャンポン + チャーハン",
          "vi": "Tôm sốt ớt + Jjamppong + Cơm chiên"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "깐풍기 + 짜장면 + 짬뽕",
          "en": "Kkanpunggi + Jajangmyeon + Jjamppong",
          "zh": "干烹鸡 + 炸酱面 + 炒码面",
          "ja": "カンプンギ + ジャジャン麺 + チャンポン",
          "vi": "Kkanpunggi + Jajangmyeon + Jjamppong"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "깐풍기 + 짜장면 + 볶음밥",
          "en": "Kkanpunggi + Jajangmyeon + Fried Rice",
          "zh": "干烹鸡 + 炸酱面 + 炒饭",
          "ja": "カンプンギ + ジャジャン麺 + チャーハン",
          "vi": "Kkanpunggi + Jajangmyeon + Cơm chiên"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "깐풍기 + 짬뽕 + 볶음밥",
          "en": "Kkanpunggi + Jjamppong + Fried Rice",
          "zh": "干烹鸡 + 炒码面 + 炒饭",
          "ja": "カンプンギ + チャンポン + チャーハン",
          "vi": "Kkanpunggi + Jjamppong + Cơm chiên"
        },
        "price": 250000
      }
    ]
  },
  {
    "id": "rice",
    "name": {
      "ko": "밥류",
      "en": "Rice Dishes",
      "zh": "饭类",
      "ja": "ご飯類",
      "vi": "Các món cơm"
    },
    "items": [
      {
        "name": {
          "ko": "자장밥",
          "en": "Jajangbap (black bean sauce over rice)",
          "zh": "炸酱饭",
          "ja": "ジャジャン飯(ジャジャンソースかけご飯)",
          "vi": "Jajangbap (cơm sốt tương đen)"
        },
        "price": 160000
      },
      {
        "name": {
          "ko": "짬뽕밥",
          "en": "Jjamppongbap (spicy seafood soup with rice)",
          "zh": "炒码饭(辣海鲜汤饭)",
          "ja": "チャンポン飯(辛い海鮮スープご飯)",
          "vi": "Jjamppongbap (cơm súp hải sản cay)"
        },
        "price": 170000
      },
      {
        "name": {
          "ko": "삼선짬뽕밥",
          "en": "Samseon Jjamppongbap (spicy seafood soup with rice)",
          "zh": "三鲜炒码饭",
          "ja": "三鮮チャンポン飯",
          "vi": "Samseon Jjamppongbap (cơm súp hải sản cay thập cẩm)"
        },
        "price": 220000
      },
      {
        "name": {
          "ko": "홍합굴짬뽕밥",
          "en": "Mussel and Oyster Jjamppongbap (spicy soup with rice)",
          "zh": "青口牡蛎炒码饭",
          "ja": "ムール貝と牡蠣のチャンポン飯",
          "vi": "Jjamppongbap vẹm và hàu"
        },
        "price": 220000
      },
      {
        "name": {
          "ko": "굴짬뽕밥",
          "en": "Oyster Jjamppongbap (spicy soup with rice)",
          "zh": "牡蛎炒码饭",
          "ja": "牡蠣チャンポン飯",
          "vi": "Jjamppongbap hàu"
        },
        "price": 220000
      },
      {
        "name": {
          "ko": "볶음밥",
          "en": "Fried Rice (Bokkeumbap)",
          "zh": "炒饭",
          "ja": "チャーハン",
          "vi": "Cơm chiên"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "새우볶음밥",
          "en": "Shrimp Fried Rice",
          "zh": "虾仁炒饭",
          "ja": "エビチャーハン",
          "vi": "Cơm chiên tôm"
        },
        "price": 190000
      },
      {
        "name": {
          "ko": "삼선볶음밥",
          "en": "Samseon Fried Rice (seafood fried rice)",
          "zh": "三鲜炒饭",
          "ja": "三鮮チャーハン",
          "vi": "Cơm chiên hải sản thập cẩm"
        },
        "price": 190000
      },
      {
        "name": {
          "ko": "닭고기볶음밥",
          "en": "Chicken Fried Rice",
          "zh": "鸡肉炒饭",
          "ja": "鶏肉チャーハン",
          "vi": "Cơm chiên gà"
        },
        "price": 190000
      },
      {
        "name": {
          "ko": "잡채밥",
          "en": "Japchaebap (stir-fried shredded meat and vegetables over rice)",
          "zh": "杂菜盖饭",
          "ja": "チャプチェ飯(炒め物のせご飯)",
          "vi": "Japchaebap (cơm xào thịt và rau thái sợi)"
        },
        "price": 190000
      },
      {
        "name": {
          "ko": "마파두부밥",
          "en": "Mapa Tofu Rice (spicy tofu over rice)",
          "zh": "麻婆豆腐饭",
          "ja": "麻婆豆腐丼",
          "vi": "Cơm đậu hũ Mapa"
        },
        "price": 190000
      },
      {
        "name": {
          "ko": "고추잡채밥",
          "en": "Gochujapchae Rice (stir-fried pepper and pork strips over rice)",
          "zh": "青椒肉丝盖饭",
          "ja": "チンジャオロース丼",
          "vi": "Cơm Gochujapchae (cơm thịt xào ớt chuông)"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "잡탕밥",
          "en": "Japtangbap (mixed seafood and meat over rice)",
          "zh": "杂烩盖饭",
          "ja": "チャプタン飯(海鮮と肉の五目あんかけご飯)",
          "vi": "Japtangbap (cơm thập cẩm sốt)"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "유산슬밥",
          "en": "Ryusanseul Rice (stir-fried sea cucumber, shrimp and squid over rice)",
          "zh": "溜三丝盖饭",
          "ja": "リュウサンスル丼",
          "vi": "Cơm Ryusanseul (cơm hải sản xào sốt)"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "양송이덮밥",
          "en": "Button Mushroom Rice Bowl",
          "zh": "口蘑盖饭",
          "ja": "マッシュルーム丼",
          "vi": "Cơm nấm mỡ"
        },
        "price": 190000
      },
      {
        "name": {
          "ko": "자연송이덮밥",
          "en": "Natural Pine Mushroom Rice Bowl",
          "zh": "天然松茸盖饭",
          "ja": "天然松茸丼",
          "vi": "Cơm phủ nấm tùng nhung tự nhiên"
        },
        "price": 500000
      },
      {
        "name": {
          "ko": "제육덮밥",
          "en": "Jeyuk Rice Bowl (stir-fried pork over rice)",
          "zh": "辣炒猪肉盖饭",
          "ja": "豚肉炒め丼(チェユク)",
          "vi": "Cơm thịt heo xào Jeyuk"
        },
        "price": 190000
      },
      {
        "name": {
          "ko": "중화비빔밥",
          "en": "Junghwa Bibimbap (Chinese-style mixed rice)",
          "zh": "中式拌饭",
          "ja": "中華ビビンバ",
          "vi": "Cơm trộn kiểu Hoa (Junghwa Bibimbap)"
        },
        "price": 190000
      }
    ]
  },
  {
    "id": "side",
    "name": {
      "ko": "만두 · 소채 · 두부",
      "en": "Dumplings · Vegetables · Tofu",
      "zh": "饺子 · 蔬菜 · 豆腐",
      "ja": "餃子・野菜・豆腐",
      "vi": "Bánh xếp · Rau · Đậu hũ"
    },
    "items": [
      {
        "name": {
          "ko": "군만두",
          "en": "Gunmandu (pan-fried dumplings)",
          "zh": "煎饺",
          "ja": "焼き餃子",
          "vi": "Gunmandu (bánh xếp chiên)"
        },
        "sizes": [
          [
            {
              "ko": "5개",
              "en": "5 pcs",
              "zh": "5个",
              "ja": "5個",
              "vi": "5 cái"
            },
            60000
          ],
          [
            {
              "ko": "10개",
              "en": "10 pcs",
              "zh": "10个",
              "ja": "10個",
              "vi": "10 cái"
            },
            110000
          ]
        ],
        "photo": "img/gunmandu.jpg",
        "tag": "best"
      },
      {
        "name": {
          "ko": "찐만두",
          "en": "Steamed Dumplings (Jjinmandu)",
          "zh": "蒸饺",
          "ja": "蒸し餃子",
          "vi": "Bánh xếp hấp"
        },
        "price": 100000
      },
      {
        "name": {
          "ko": "찐 꽃빵",
          "en": "Steamed Flower Buns",
          "zh": "蒸花卷",
          "ja": "蒸し花巻",
          "vi": "Bánh bao hoa hấp"
        },
        "sizes": [
          [
            {
              "ko": "5개",
              "en": "5 pcs",
              "zh": "5个",
              "ja": "5個",
              "vi": "5 cái"
            },
            40000
          ],
          [
            {
              "ko": "10개",
              "en": "10 pcs",
              "zh": "10个",
              "ja": "10個",
              "vi": "10 cái"
            },
            80000
          ]
        ]
      },
      {
        "name": {
          "ko": "굴소스 청경채",
          "en": "Bok Choy with Oyster Sauce",
          "zh": "蚝油青菜",
          "ja": "チンゲン菜のオイスターソース炒め",
          "vi": "Cải thìa xào dầu hào"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            500000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            600000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            800000
          ]
        ]
      },
      {
        "name": {
          "ko": "고추잡채",
          "en": "Gochujapchae (stir-fried pepper and pork strips)",
          "zh": "青椒肉丝",
          "ja": "チンジャオロース",
          "vi": "Gochujapchae (thịt xào ớt chuông)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            500000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            600000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            800000
          ]
        ]
      },
      {
        "name": {
          "ko": "자연송이 죽순볶음",
          "en": "Stir-fried Pine Mushrooms and Bamboo Shoots",
          "zh": "松茸炒竹笋",
          "ja": "松茸とタケノコの炒め",
          "vi": "Nấm tùng nhung xào măng"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            1100000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            1500000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1800000
          ]
        ]
      },
      {
        "name": {
          "ko": "마파두부",
          "en": "Mapa Tofu (spicy mapo tofu)",
          "zh": "麻婆豆腐",
          "ja": "麻婆豆腐",
          "vi": "Đậu hũ Mapa (mapo)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            400000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            600000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            800000
          ]
        ]
      },
      {
        "name": {
          "ko": "새우&두부",
          "en": "Shrimp & Tofu",
          "zh": "虾仁豆腐",
          "ja": "エビと豆腐",
          "vi": "Tôm & Đậu hũ"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            500000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            600000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            800000
          ]
        ]
      }
    ]
  },
  {
    "id": "meat",
    "name": {
      "ko": "돼지고기 · 소고기 · 닭고기",
      "en": "Pork · Beef · Chicken",
      "zh": "猪肉 · 牛肉 · 鸡肉",
      "ja": "豚肉・牛肉・鶏肉",
      "vi": "Thịt heo · Thịt bò · Thịt gà"
    },
    "items": [
      {
        "name": {
          "ko": "탕수육",
          "en": "Tangsuyuk (sweet and sour pork)",
          "zh": "糖醋肉",
          "ja": "タンスユク(酢豚)",
          "vi": "Tangsuyuk (thịt heo chiên chua ngọt)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            350000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            480000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            600000
          ]
        ],
        "tag": "best"
      },
      {
        "name": {
          "ko": "칠리탕수육",
          "en": "Chili Tangsuyuk (sweet and sour pork in chili sauce)",
          "zh": "甜辣糖醋肉",
          "ja": "チリ・タンスユク",
          "vi": "Tangsuyuk sốt ớt"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            400000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            600000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            800000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "사천탕수육",
          "en": "Sichuan Tangsuyuk (spicy sweet and sour pork)",
          "zh": "四川糖醋肉",
          "ja": "四川タンスユク",
          "vi": "Tangsuyuk Tứ Xuyên"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            400000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            600000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            800000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "깐풍육",
          "en": "Kkanpungyuk (spicy garlic fried pork)",
          "zh": "干烹肉",
          "ja": "カンプンユク(豚肉の辛味炒め)",
          "vi": "Kkanpungyuk (thịt heo chiên sốt tỏi cay)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            800000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1000000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "잡채",
          "en": "Japchae (stir-fried shredded meat and vegetables)",
          "zh": "杂菜炒肉丝",
          "ja": "チャプチェ",
          "vi": "Japchae (thịt và rau xào thái sợi)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            450000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            650000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            850000
          ]
        ]
      },
      {
        "name": {
          "ko": "난자완스",
          "en": "Nanjawanseu (fried minced pork patties)",
          "zh": "南煎丸子",
          "ja": "ナンジャワンス(肉団子の煮込み)",
          "vi": "Nanjawanseu (thịt viên chiên sốt)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            550000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            750000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            950000
          ]
        ]
      },
      {
        "name": {
          "ko": "삼겹살찜",
          "en": "Steamed Pork Belly",
          "zh": "蒸五花肉",
          "ja": "豚バラ肉の蒸し煮",
          "vi": "Ba chỉ heo hấp"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            500000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            700000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            900000
          ]
        ]
      },
      {
        "name": {
          "ko": "소고기 탕수육",
          "en": "Beef Tangsuyuk (sweet and sour beef)",
          "zh": "糖醋牛肉",
          "ja": "牛肉タンスユク",
          "vi": "Tangsuyuk thịt bò"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            450000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            650000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            850000
          ]
        ]
      },
      {
        "name": {
          "ko": "소고기 난자완스",
          "en": "Beef Nanjawanseu (fried minced beef patties)",
          "zh": "牛肉南煎丸子",
          "ja": "牛肉ナンジャワンス",
          "vi": "Nanjawanseu thịt bò"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            700000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            900000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1100000
          ]
        ]
      },
      {
        "name": {
          "ko": "깐풍기",
          "en": "Kkanpunggi (spicy garlic fried chicken)",
          "zh": "干烹鸡",
          "ja": "カンプンギ(鶏の辛味ソース揚げ)",
          "vi": "Kkanpunggi (gà chiên sốt tỏi cay)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            800000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1000000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "라조기 (두반장 소스)",
          "en": "Lajogi (fried chicken in doubanjang sauce)",
          "zh": "辣子鸡(豆瓣酱)",
          "ja": "ラジョギ(豆板醤ソース)",
          "vi": "Lajogi (gà chiên sốt đậu bản tương)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            800000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1000000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "유린기",
          "en": "Yurinki (crispy chicken with soy-vinegar sauce)",
          "zh": "油淋鸡",
          "ja": "ユーリンチー",
          "vi": "Yurinki (gà chiên giòn sốt chua)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            800000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1000000
          ]
        ]
      }
    ]
  },
  {
    "id": "sea",
    "name": {
      "ko": "새우 · 해산물",
      "en": "Shrimp · Seafood",
      "zh": "虾 · 海鲜",
      "ja": "エビ・海鮮",
      "vi": "Tôm · Hải sản"
    },
    "items": [
      {
        "name": {
          "ko": "칠리새우",
          "en": "Chili Shrimp",
          "zh": "干烧虾仁",
          "ja": "エビチリ",
          "vi": "Tôm sốt ớt"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            650000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            850000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1200000
          ]
        ],
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
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            650000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            850000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1200000
          ]
        ]
      },
      {
        "name": {
          "ko": "깐풍새우",
          "en": "Kkanpung Shrimp (spicy garlic fried shrimp)",
          "zh": "干烹虾",
          "ja": "カンプンセウ(エビの辛味ソース揚げ)",
          "vi": "Tôm chiên sốt tỏi cay"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            650000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            850000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1200000
          ]
        ],
        "spicy": true
      },
      {
        "name": {
          "ko": "류산슬",
          "en": "Ryusanseul (stir-fried sea cucumber, shrimp and squid)",
          "zh": "溜三丝",
          "ja": "リュウサンスル(海鮮の五目あんかけ炒め)",
          "vi": "Ryusanseul (hải sản xào sốt)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            800000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1000000
          ]
        ]
      },
      {
        "name": {
          "ko": "팔보채",
          "en": "Palbochae (eight-treasure stir-fry)",
          "zh": "八宝菜",
          "ja": "八宝菜",
          "vi": "Palbochae (bát bảo xào)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            800000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1000000
          ]
        ]
      },
      {
        "name": {
          "ko": "어향가지볶음",
          "en": "Eohyang Gaji (stir-fried eggplant in spicy sauce)",
          "zh": "鱼香茄子",
          "ja": "魚香茄子炒め",
          "vi": "Cà tím xào sốt cay chua"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            800000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1000000
          ]
        ]
      },
      {
        "name": {
          "ko": "전가복",
          "en": "Jeongabok (braised seafood medley)",
          "zh": "全家福",
          "ja": "全家福(海鮮の五目煮込み)",
          "vi": "Jeongabok (hải sản thập cẩm om)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            1600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            2000000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            2400000
          ]
        ]
      }
    ]
  },
  {
    "id": "premium",
    "name": {
      "ko": "관자 · 전복 · 해삼",
      "en": "Scallop · Abalone · Sea Cucumber",
      "zh": "扇贝 · 鲍鱼 · 海参",
      "ja": "ホタテ・アワビ・ナマコ",
      "vi": "Sò điệp · Bào ngư · Hải sâm"
    },
    "items": [
      {
        "name": {
          "ko": "관자볶음",
          "en": "Stir-fried Scallops",
          "zh": "炒扇贝",
          "ja": "ホタテ炒め",
          "vi": "Sò điệp xào"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            900000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            1100000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            1300000
          ]
        ]
      },
      {
        "name": {
          "ko": "관자&자연송이",
          "en": "Scallops & Pine Mushrooms",
          "zh": "扇贝炒松茸",
          "ja": "ホタテと松茸",
          "vi": "Sò điệp & Nấm tùng nhung"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            1600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            2200000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            2400000
          ]
        ]
      },
      {
        "name": {
          "ko": "전복볶음",
          "en": "Stir-fried Abalone",
          "zh": "炒鲍鱼",
          "ja": "アワビ炒め",
          "vi": "Bào ngư xào"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            1600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            2000000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            2400000
          ]
        ]
      },
      {
        "name": {
          "ko": "전복&자연송이",
          "en": "Abalone & Pine Mushrooms",
          "zh": "鲍鱼炒松茸",
          "ja": "アワビと松茸",
          "vi": "Bào ngư & Nấm tùng nhung"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            1600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            2000000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            2400000
          ]
        ]
      },
      {
        "name": {
          "ko": "해삼탕",
          "en": "Sea Cucumber Soup",
          "zh": "海参汤",
          "ja": "海参スープ（ヘサムタン）",
          "vi": "Haesamtang (hải sâm sốt)"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            1600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            2000000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            2400000
          ]
        ]
      },
      {
        "name": {
          "ko": "해삼&전복",
          "en": "Sea Cucumber & Abalone",
          "zh": "海参鲍鱼",
          "ja": "ナマコとアワビ",
          "vi": "Hải sâm & Bào ngư"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            1600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            2000000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            2400000
          ]
        ]
      },
      {
        "name": {
          "ko": "해삼&자연송이",
          "en": "Sea Cucumber & Pine Mushrooms",
          "zh": "海参松茸",
          "ja": "ナマコと松茸",
          "vi": "Hải sâm & Nấm tùng nhung"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            1600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            2000000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            2400000
          ]
        ]
      },
      {
        "name": {
          "ko": "해삼&삼겹살찜",
          "en": "Sea Cucumber & Steamed Pork Belly",
          "zh": "海参蒸五花肉",
          "ja": "ナマコと豚バラ肉の蒸し煮",
          "vi": "Hải sâm & Ba chỉ heo hấp"
        },
        "sizes": [
          [
            {
              "ko": "소",
              "en": "Small",
              "zh": "小",
              "ja": "小",
              "vi": "Nhỏ"
            },
            1600000
          ],
          [
            {
              "ko": "중",
              "en": "Medium",
              "zh": "中",
              "ja": "中",
              "vi": "Vừa"
            },
            2000000
          ],
          [
            {
              "ko": "대",
              "en": "Large",
              "zh": "大",
              "ja": "大",
              "vi": "Lớn"
            },
            2400000
          ]
        ]
      }
    ]
  },
  {
    "id": "course",
    "name": {
      "ko": "코스 요리",
      "en": "Course Menu",
      "zh": "套餐",
      "ja": "コース料理",
      "vi": "Thực đơn theo suất"
    },
    "note": {
      "ko": "3인부터 주문 가능 · 1인 가격",
      "en": "Order for 3 or more · Price per person",
      "zh": "3人起订 · 每人价格",
      "ja": "3名様よりご注文可 · 1名様の価格",
      "vi": "Đặt từ 3 người · Giá mỗi người"
    },
    "items": [
      {
        "name": {
          "ko": "점심 코스 (11:00~14:00): 매생이스프 · 류산슬 · 깐풍기 · 고추잡채 · 식사(자장면·짬뽕 택1)",
          "en": "Lunch Course (11:00~14:00): Maesaengi Soup · Ryusanseul · Kkanpunggi · Gochujapchae · Meal (choose Jajangmyeon or Jjamppong)",
          "zh": "午餐套餐(11:00~14:00):青苔浓汤 · 溜三丝 · 干烹鸡 · 青椒肉丝 · 主食(炸酱面·炒码面二选一)",
          "ja": "ランチコース(11:00~14:00):メセンイスープ · リュウサンスル · カンプンギ · チンジャオロース · お食事(ジャジャン麺・チャンポンから1品)",
          "vi": "Suất trưa (11:00~14:00): Súp rong biển Maesaengi · Ryusanseul · Kkanpunggi · Gochujapchae · Món chính (chọn 1: Jajangmyeon hoặc Jjamppong)"
        },
        "price": 350000
      },
      {
        "name": {
          "ko": "패밀리 코스: 매생이스프 · 양장피 · 팔보채 · 고추잡채 · 칠리새우 · 탕수육 · 식사(자장면·짬뽕·볶음밥 택1)",
          "en": "Family Course: Maesaengi Soup · Yangjangpi · Palbochae · Gochujapchae · Chili Shrimp · Tangsuyuk · Meal (choose Jajangmyeon, Jjamppong or Fried Rice)",
          "zh": "家庭套餐:青苔浓汤 · 两张皮 · 八宝菜 · 青椒肉丝 · 干烧虾仁 · 糖醋肉 · 主食(炸酱面·炒码面·炒饭三选一)",
          "ja": "ファミリーコース:メセンイスープ · ヤンジャンピ · 八宝菜 · チンジャオロース · エビチリ · タンスユク · お食事(ジャジャン麺・チャンポン・チャーハンから1品)",
          "vi": "Suất gia đình: Súp rong biển Maesaengi · Yangjangpi · Palbochae · Gochujapchae · Tôm sốt ớt · Tangsuyuk · Món chính (chọn 1: Jajangmyeon, Jjamppong hoặc Cơm chiên)"
        },
        "price": 500000
      },
      {
        "name": {
          "ko": "저녁 코스 A: 매생이스프 · 삼품냉채 · 깐풍기 · 팔보채 · 고추잡채 · 칠리새우 · 라조육 · 식사 택1",
          "en": "Dinner Course A: Maesaengi Soup · Three-Item Cold Platter · Kkanpunggi · Palbochae · Gochujapchae · Chili Shrimp · Lajoyuk · Meal (choose 1)",
          "zh": "晚餐套餐A:青苔浓汤 · 三品冷盘 · 干烹鸡 · 八宝菜 · 青椒肉丝 · 干烧虾仁 · 辣子肉 · 主食(任选一)",
          "ja": "ディナーコースA:メセンイスープ · 三品冷菜盛り合わせ · カンプンギ · 八宝菜 · チンジャオロース · エビチリ · ラジョユク · お食事(1品選択)",
          "vi": "Suất tối A: Súp rong biển Maesaengi · Đĩa nguội ba món · Kkanpunggi · Palbochae · Gochujapchae · Tôm sốt ớt · Lajoyuk · Món chính (chọn 1)"
        },
        "price": 600000
      },
      {
        "name": {
          "ko": "저녁 코스 B: 매생이스프 · 사품냉채 · 깐풍기 · 유산슬 · 고추잡채 · 칠리새우 · 관자볶음 · 식사 택1",
          "en": "Dinner Course B: Maesaengi Soup · Four-Item Cold Platter · Kkanpunggi · Ryusanseul · Gochujapchae · Chili Shrimp · Stir-fried Scallops · Meal (choose 1)",
          "zh": "晚餐套餐B:青苔浓汤 · 四品冷盘 · 干烹鸡 · 溜三丝 · 青椒肉丝 · 干烧虾仁 · 炒扇贝 · 主食(任选一)",
          "ja": "ディナーコースB:メセンイスープ · 四品冷菜盛り合わせ · カンプンギ · リュウサンスル · チンジャオロース · エビチリ · ホタテ炒め · お食事(1品選択)",
          "vi": "Suất tối B: Súp rong biển Maesaengi · Đĩa nguội bốn món · Kkanpunggi · Ryusanseul · Gochujapchae · Tôm sốt ớt · Sò điệp xào · Món chính (chọn 1)"
        },
        "price": 800000
      }
    ]
  },
  {
    "id": "drink",
    "name": {
      "ko": "주류 · 음료",
      "en": "Alcohol · Drinks",
      "zh": "酒类 · 饮料",
      "ja": "お酒・ドリンク",
      "vi": "Rượu · Đồ uống"
    },
    "items": [
      {
        "name": {
          "ko": "탄산음료",
          "en": "Soft Drink",
          "zh": "碳酸饮料",
          "ja": "炭酸飲料",
          "vi": "Nước ngọt có ga"
        },
        "price": 20000
      },
      {
        "name": {
          "ko": "참이슬 · 처음처럼",
          "en": "Chamisul · Chum-churum (Korean soju)",
          "zh": "真露 · 初饮初乐(韩国烧酒)",
          "ja": "チャミスル・チョウムチョロム(韓国焼酎)",
          "vi": "Chamisul · Chum-churum (rượu soju Hàn Quốc)"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "좋은데이",
          "en": "Good Day (Korean soju)",
          "zh": "好日子烧酒",
          "ja": "チョウンデー(韓国焼酎)",
          "vi": "Good Day (rượu soju Hàn Quốc)"
        },
        "price": 130000
      },
      {
        "name": {
          "ko": "병맥주",
          "en": "Bottled Beer",
          "zh": "瓶装啤酒",
          "ja": "瓶ビール",
          "vi": "Bia chai"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "생맥주",
          "en": "Draft Beer",
          "zh": "生啤",
          "ja": "生ビール",
          "vi": "Bia tươi"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "이과두주",
          "en": "Erguotou (Chinese baijiu)",
          "zh": "二锅头",
          "ja": "二鍋頭(イグァドゥジュ)",
          "vi": "Nhị Oa Đầu (rượu trắng Trung Quốc)"
        },
        "price": 200000
      },
      {
        "name": {
          "ko": "고량주",
          "en": "Goryangju (Chinese sorghum liquor)",
          "zh": "高粱酒",
          "ja": "高粱酒(コリャンジュ)",
          "vi": "Rượu cao lương"
        },
        "price": 300000
      },
      {
        "name": {
          "ko": "설원주",
          "en": "Seolwonju (Chinese liquor)",
          "zh": "雪原酒",
          "ja": "雪原酒(ソルォンジュ)",
          "vi": "Seolwonju (rượu Trung Quốc)"
        },
        "price": 500000
      },
      {
        "name": {
          "ko": "백년호두",
          "en": "Baeknyeon Hodu (walnut liquor)",
          "zh": "百年核桃酒",
          "ja": "百年胡桃酒(ペンニョンホドゥ)",
          "vi": "Baeknyeon Hodu (rượu óc chó)"
        },
        "price": 1000000
      },
      {
        "name": {
          "ko": "연태고량주",
          "en": "Yantai Goryangju (Yantai sorghum liquor)",
          "zh": "烟台高粱酒",
          "ja": "煙台高粱酒",
          "vi": "Rượu cao lương Yên Đài"
        },
        "sizes": [
          [
            {
              "ko": "125ml",
              "en": "125ml",
              "zh": "125ml",
              "ja": "125ml",
              "vi": "125ml"
            },
            450000
          ],
          [
            {
              "ko": "250ml",
              "en": "250ml",
              "zh": "250ml",
              "ja": "250ml",
              "vi": "250ml"
            },
            800000
          ],
          [
            {
              "ko": "500ml",
              "en": "500ml",
              "zh": "500ml",
              "ja": "500ml",
              "vi": "500ml"
            },
            1300000
          ]
        ]
      }
    ]
  }
];
