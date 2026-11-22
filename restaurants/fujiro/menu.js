// 후지로 판께빈 메뉴 — 출처: 구글 지도 메뉴판 사진(종이 메뉴판·태블릿·가게 올림, 2026-11-22 수집). 같은 메뉴 가격이 다르면 높은 쪽(docs/todo.md). 가격은 부가세 8% 별도
window.RESTAURANT = {
  "brand": {
    "ko": "후지로 판께빈",
    "en": "FUJIRO Phan Kế Bính"
  },
  "phone": "0973445220",
  "address": "47 P. Phan Kế Bính, Giảng Võ, Hà Nội",
  "wifi": null,
  "hours": {
    "ko": "평일 11:00 – 14:30 / 17:00 – 22:00 · 토·일 11:00 – 22:00",
    "en": "Weekdays 11:00 – 14:30 / 17:00 – 22:00 · Sat–Sun 11:00 – 22:00",
    "zh": "工作日 11:00 – 14:30 / 17:00 – 22:00 · 周六日 11:00 – 22:00",
    "ja": "平日 11:00 – 14:30 / 17:00 – 22:00 · 土日 11:00 – 22:00",
    "vi": "Thứ 2–6: 11:00 – 14:30 / 17:00 – 22:00 · Thứ 7, CN: 11:00 – 22:00"
  }
};

window.MENU = [
  {
    "id": "set",
    "name": {
      "ko": "정식",
      "en": "Set Meals",
      "zh": "套餐",
      "ja": "定食",
      "vi": "Cơm set"
    },
    "items": [
      {
        "name": {
          "ko": "두께 2.5cm 두툼한 로스카츠 정식",
          "en": "Thick 2.5cm Pork Loin Cutlet Set",
          "zh": "2.5cm厚切猪大排套餐",
          "ja": "厚さ2.5cm 厚切りロースカツ定食",
          "vi": "Set cốt lết heo chiên xù dày 2,5cm"
        },
        "price": 198000,
        "photo": "img/thick-loin.jpg",
        "tag": "must"
      },
      {
        "name": {
          "ko": "로스카츠(등심) 정식",
          "en": "Pork Loin Cutlet Set",
          "zh": "猪大排套餐",
          "ja": "ロースカツ定食",
          "vi": "Set cốt lết heo chiên xù (Rosu Katsu)"
        },
        "price": 165000,
        "photo": "img/loin.jpg"
      },
      {
        "name": {
          "ko": "히레카츠(안심) 정식",
          "en": "Pork Tenderloin Cutlet Set",
          "zh": "里脊猪排套餐",
          "ja": "ヒレカツ定食",
          "vi": "Set thăn heo chiên xù (Hire Katsu)"
        },
        "price": 160000
      },
      {
        "name": {
          "ko": "돈카츠 & 히레카츠 정식",
          "en": "Loin & Tenderloin Cutlet Set",
          "zh": "炸猪排&里脊猪排套餐",
          "ja": "とんかつ＆ヒレカツ定食",
          "vi": "Set cốt lết & thăn heo chiên xù"
        },
        "price": 170000,
        "photo": "img/tonkatsu-hire.jpg"
      },
      {
        "name": {
          "ko": "극상 카츠토지(돈카츠 계란 나베) 정식",
          "en": "Premium Katsutoji (Cutlet & Egg) Set",
          "zh": "极上鸡蛋炸猪排锅套餐",
          "ja": "極上カツとじ定食",
          "vi": "Set Katsutoji thượng hạng (thịt heo chiên xù nấu trứng)"
        },
        "price": 135000,
        "photo": "img/katsutoji.jpg",
        "tag": "best"
      },
      {
        "name": {
          "ko": "히레카츠토지 정식",
          "en": "Tenderloin Katsutoji Set",
          "zh": "里脊鸡蛋炸猪排锅套餐",
          "ja": "ヒレカツとじ定食",
          "vi": "Set Hire Katsutoji (thăn heo chiên xù nấu trứng)"
        },
        "price": 165000
      },
      {
        "name": {
          "ko": "치킨카츠토지 정식",
          "en": "Chicken Katsutoji Set",
          "zh": "鸡蛋炸鸡排锅套餐",
          "ja": "チキンカツとじ定食",
          "vi": "Set Chicken Katsutoji (gà chiên xù nấu trứng)"
        },
        "price": 135000
      },
      {
        "name": {
          "ko": "에비카츠토지(새우) 정식",
          "en": "Shrimp Katsutoji Set",
          "zh": "鸡蛋炸虾锅套餐",
          "ja": "海老カツとじ定食",
          "vi": "Set Ebi Katsutoji (tôm chiên xù nấu trứng)"
        },
        "price": 180000,
        "photo": "img/ebi-toji.jpg"
      },
      {
        "name": {
          "ko": "믹스카츠 정식 A (등심·안심·새우)",
          "en": "Mix Katsu Set A (Loin·Tenderloin·Shrimp)",
          "zh": "综合炸物套餐A(猪大排·里脊·炸虾)",
          "ja": "ミックスカツ定食A",
          "vi": "Set Mix Katsu A (cốt lết · thăn heo · tôm)"
        },
        "price": 198000
      },
      {
        "name": {
          "ko": "믹스카츠 정식 B (등심·안심·아스파라거스 롤)",
          "en": "Mix Katsu Set B (Loin·Tenderloin·Asparagus Roll)",
          "zh": "综合炸物套餐B(猪大排·里脊·芦笋肉卷)",
          "ja": "ミックスカツ定食B",
          "vi": "Set Mix Katsu B (cốt lết · thăn heo · thịt heo cuộn măng tây)"
        },
        "price": 198000
      },
      {
        "name": {
          "ko": "믹스카츠 정식 C (등심·아스파라거스 롤·모짜렐라 치즈)",
          "en": "Mix Katsu Set C (Loin·Asparagus Roll·Mozzarella)",
          "zh": "综合炸物套餐C(猪大排·芦笋肉卷·马苏里拉奶酪)",
          "ja": "ミックスカツ定食C",
          "vi": "Set Mix Katsu C (cốt lết · thịt heo cuộn măng tây · phô mai Mozzarella)"
        },
        "price": 198000,
        "photo": "img/mix-c.jpg"
      },
      {
        "name": {
          "ko": "믹스카츠 정식 D (등심·안심·모짜렐라 치즈)",
          "en": "Mix Katsu Set D (Loin·Tenderloin·Mozzarella)",
          "zh": "综合炸物套餐D(猪大排·里脊·马苏里拉奶酪)",
          "ja": "ミックスカツ定食D",
          "vi": "Set Mix Katsu D (cốt lết · thăn heo · phô mai Mozzarella)"
        },
        "price": 198000
      },
      {
        "name": {
          "ko": "모짜렐라 치즈 돈카츠 정식",
          "en": "Mozzarella Cheese Tonkatsu Set",
          "zh": "马苏里拉奶酪炸猪排套餐",
          "ja": "モッツァレラチーズとんかつ定食",
          "vi": "Set cốt lết chiên xù phô mai Mozzarella"
        },
        "price": 150000,
        "photo": "img/mozzarella.jpg"
      },
      {
        "name": {
          "ko": "핫초미소(된장) 로스카츠 정식",
          "en": "Hatcho Miso Pork Loin Cutlet Set",
          "zh": "八丁味噌猪大排套餐",
          "ja": "八丁味噌ロースカツ定食",
          "vi": "Set cốt lết chiên xù sốt miso Hatcho"
        },
        "price": 185000,
        "photo": "img/hatcho.jpg"
      },
      {
        "name": {
          "ko": "치킨난반 정식",
          "en": "Chicken Nanban Set",
          "zh": "南蛮炸鸡套餐",
          "ja": "チキン南蛮定食",
          "vi": "Set gà chiên sốt Nanban"
        },
        "price": 155000,
        "photo": "img/nanban.jpg"
      },
      {
        "name": {
          "ko": "점보 치킨카츠 정식 (200g)",
          "en": "Jumbo Chicken Katsu Set (200g)",
          "zh": "巨型炸鸡排套餐(200g)",
          "ja": "ジャンボチキンカツ定食(200g)",
          "vi": "Set gà chiên xù cỡ lớn (200g)"
        },
        "price": 170000
      },
      {
        "name": {
          "ko": "돈카츠 & 치킨난반 정식",
          "en": "Tonkatsu & Chicken Nanban Set",
          "zh": "炸猪排&南蛮炸鸡套餐",
          "ja": "とんかつ＆チキン南蛮定食",
          "vi": "Set cốt lết chiên xù & gà chiên sốt Nanban"
        },
        "price": 180000
      },
      {
        "name": {
          "ko": "히레카츠 & 치킨난반 정식",
          "en": "Tenderloin Katsu & Chicken Nanban Set",
          "zh": "里脊猪排&南蛮炸鸡套餐",
          "ja": "ヒレカツ＆チキン南蛮定食",
          "vi": "Set thăn heo chiên xù & gà chiên sốt Nanban"
        },
        "price": 180000
      },
      {
        "name": {
          "ko": "히레카츠 & 새우튀김 정식",
          "en": "Tenderloin Katsu & Fried Shrimp Set",
          "zh": "里脊猪排&炸虾套餐",
          "ja": "ヒレカツ＆海老フライ定食",
          "vi": "Set thăn heo chiên xù & tôm chiên xù"
        },
        "price": 210000
      },
      {
        "name": {
          "ko": "돈카츠 & 새우튀김 정식",
          "en": "Tonkatsu & Fried Shrimp Set",
          "zh": "炸猪排&炸虾套餐",
          "ja": "とんかつ＆海老フライ定食",
          "vi": "Set cốt lết chiên xù & tôm chiên xù"
        },
        "price": 220000
      },
      {
        "name": {
          "ko": "돈카츠 & 왕새우튀김 정식",
          "en": "Tonkatsu & Jumbo Fried Shrimp Set",
          "zh": "炸猪排&炸大虾套餐",
          "ja": "とんかつ＆大海老フライ定食",
          "vi": "Set cốt lết chiên xù & tôm chiên xù cỡ lớn"
        },
        "price": 245000
      },
      {
        "name": {
          "ko": "새우튀김(흰다리새우) 정식",
          "en": "Fried Shrimp Set",
          "zh": "炸虾套餐(白对虾)",
          "ja": "海老フライ定食",
          "vi": "Set tôm chiên xù (tôm thẻ chân trắng)"
        },
        "price": 180000,
        "photo": "img/ebi-fry.jpg"
      },
      {
        "name": {
          "ko": "왕새우튀김(블랙타이거) 정식",
          "en": "Jumbo Black Tiger Fried Shrimp Set",
          "zh": "炸大虾套餐(黑虎虾)",
          "ja": "大海老フライ定食(ブラックタイガー)",
          "vi": "Set tôm sú chiên xù cỡ lớn (Black Tiger)"
        },
        "price": 280000
      },
      {
        "name": {
          "ko": "굴튀김(카키후라이) 정식",
          "en": "Fried Oyster Set",
          "zh": "炸牡蛎套餐",
          "ja": "カキフライ定食",
          "vi": "Set hàu chiên xù (Kaki Fry)"
        },
        "price": 280000,
        "photo": "img/oyster.jpg"
      },
      {
        "name": {
          "ko": "후지로 올스타 정식",
          "en": "Fujiro All-Star Set",
          "zh": "FUJIRO全明星套餐",
          "ja": "FUJIRO オールスター定食",
          "vi": "Set FUJIRO All-Star"
        },
        "price": 220000
      }
    ]
  },
  {
    "id": "don",
    "name": {
      "ko": "덮밥",
      "en": "Rice Bowls (Don)",
      "zh": "盖饭",
      "ja": "丼",
      "vi": "Cơm tô (Don)"
    },
    "items": [
      {
        "name": {
          "ko": "카츠동",
          "en": "Katsudon (Pork Cutlet Bowl)",
          "zh": "炸猪排盖饭(Katsudon)",
          "ja": "カツ丼",
          "vi": "Cơm tô thịt heo chiên xù (Katsudon)"
        },
        "price": 98000,
        "photo": "img/katsudon.jpg"
      },
      {
        "name": {
          "ko": "치킨카츠동",
          "en": "Chicken Katsu Don",
          "zh": "炸鸡排盖饭",
          "ja": "チキンカツ丼",
          "vi": "Cơm tô gà chiên xù (Chicken Katsu Don)"
        },
        "price": 98000
      },
      {
        "name": {
          "ko": "에비카츠동 (새우튀김 덮밥)",
          "en": "Ebi Katsu Don (Shrimp Bowl)",
          "zh": "炸虾盖饭(Ebi Katsu Don)",
          "ja": "海老カツ丼",
          "vi": "Cơm tô tôm chiên xù (Ebi Katsu Don)"
        },
        "price": 145000,
        "photo": "img/ebidon.jpg"
      },
      {
        "name": {
          "ko": "히레카츠동 (안심 돈카츠 덮밥)",
          "en": "Hire Katsu Don (Tenderloin Bowl)",
          "zh": "里脊猪排盖饭(Hire Katsu Don)",
          "ja": "ヒレカツ丼",
          "vi": "Cơm tô thăn heo chiên xù (Hire Katsu Don)"
        },
        "price": 110000
      },
      {
        "name": {
          "ko": "오야코동 (닭고기 계란 덮밥)",
          "en": "Oyako Don (Chicken & Egg Bowl)",
          "zh": "亲子盖饭(鸡肉鸡蛋盖饭)",
          "ja": "親子丼",
          "vi": "Cơm tô gà trứng (Oyako Don)"
        },
        "price": 80000,
        "photo": "img/oyako.jpg"
      },
      {
        "name": {
          "ko": "부타동 (돼지고기 덮밥)",
          "en": "Buta Don (Pork Bowl)",
          "zh": "猪肉盖饭(Buta Don)",
          "ja": "豚丼",
          "vi": "Cơm tô thịt heo (Buta Don)"
        },
        "price": 120000
      }
    ]
  },
  {
    "id": "curry",
    "name": {
      "ko": "카레라이스",
      "en": "Curry Rice",
      "zh": "咖喱饭",
      "ja": "カレーライス",
      "vi": "Cơm cà ri"
    },
    "items": [
      {
        "name": {
          "ko": "후지로 수제 카레",
          "en": "Fujiro Homemade Curry Rice",
          "zh": "FUJIRO自制咖喱饭",
          "ja": "FUJIRO 自家製カレー",
          "vi": "Cơm cà ri tự làm FUJIRO"
        },
        "price": 98000
      },
      {
        "name": {
          "ko": "로스카츠 카레",
          "en": "Pork Loin Cutlet Curry Rice",
          "zh": "猪大排咖喱饭",
          "ja": "ロースカツカレー",
          "vi": "Cơm cà ri cốt lết chiên xù"
        },
        "price": 165000,
        "photo": "img/curry-loin.jpg"
      },
      {
        "name": {
          "ko": "두께 2.5cm 두툼한 로스카츠 카레",
          "en": "Thick 2.5cm Pork Loin Cutlet Curry",
          "zh": "2.5cm厚切猪大排咖喱饭",
          "ja": "厚切りロースカツカレー",
          "vi": "Cơm cà ri cốt lết chiên xù dày 2,5cm"
        },
        "price": 198000
      },
      {
        "name": {
          "ko": "카츠동 카레 (돈카츠 계란 카레)",
          "en": "Katsu Don Curry (Cutlet & Egg)",
          "zh": "炸猪排盖饭咖喱(炸猪排鸡蛋咖喱)",
          "ja": "カツ丼カレー",
          "vi": "Cơm cà ri Katsudon (thịt heo chiên xù, trứng, cà ri)"
        },
        "price": 180000,
        "photo": "img/curry-katsudon.jpg"
      },
      {
        "name": {
          "ko": "히레카츠 카레",
          "en": "Tenderloin Cutlet Curry Rice",
          "zh": "里脊猪排咖喱饭",
          "ja": "ヒレカツカレー",
          "vi": "Cơm cà ri thăn heo chiên xù"
        },
        "price": 150000
      },
      {
        "name": {
          "ko": "로스카츠 & 히레카츠 카레",
          "en": "Loin & Tenderloin Cutlet Curry",
          "zh": "猪大排&里脊猪排咖喱饭",
          "ja": "ロース＆ヒレカツカレー",
          "vi": "Cơm cà ri cốt lết & thăn heo chiên xù"
        },
        "price": 165000
      },
      {
        "name": {
          "ko": "치킨난반 카레",
          "en": "Chicken Nanban Curry Rice",
          "zh": "南蛮炸鸡咖喱饭",
          "ja": "チキン南蛮カレー",
          "vi": "Cơm cà ri gà chiên sốt Nanban"
        },
        "price": 145000
      },
      {
        "name": {
          "ko": "치킨카츠 카레",
          "en": "Chicken Katsu Curry Rice",
          "zh": "炸鸡排咖喱饭",
          "ja": "チキンカツカレー",
          "vi": "Cơm cà ri gà chiên xù"
        },
        "price": 140000
      },
      {
        "name": {
          "ko": "조토 스페셜 카레 (카츠 + 생계란 + 치즈)",
          "en": "Jotou Special Curry (Katsu · Raw Egg · Cheese)",
          "zh": "上等特选咖喱（炸猪排 + 生鸡蛋 + 芝士）",
          "ja": "上等スペシャルカレー(カツ・生卵・チーズ)",
          "vi": "Cơm cà ri đặc biệt (cốt lết chiên xù + trứng sống + phô mai)"
        },
        "price": 250000
      },
      {
        "name": {
          "ko": "모짜렐라 치즈 돈카츠 카레",
          "en": "Mozzarella Cheese Tonkatsu Curry",
          "zh": "马苏里拉奶酪炸猪排咖喱饭",
          "ja": "モッツァレラチーズとんかつカレー",
          "vi": "Cơm cà ri cốt lết chiên xù phô mai Mozzarella"
        },
        "price": 160000
      },
      {
        "name": {
          "ko": "새우튀김 카레",
          "en": "Fried Shrimp Curry Rice",
          "zh": "炸虾咖喱饭",
          "ja": "海老フライカレー",
          "vi": "Cơm cà ri tôm chiên xù"
        },
        "price": 240000
      },
      {
        "name": {
          "ko": "왕새우튀김 카레",
          "en": "Jumbo Fried Shrimp Curry Rice",
          "zh": "炸大虾咖喱饭",
          "ja": "大海老フライカレー",
          "vi": "Cơm cà ri tôm chiên xù cỡ lớn"
        },
        "price": 280000
      },
      {
        "name": {
          "ko": "카레 소스 (냉동)",
          "en": "Curry Sauce (Frozen)",
          "zh": "咖喱酱(冷冻)",
          "ja": "冷凍カレー",
          "vi": "Sốt cà ri (đông lạnh)"
        },
        "price": 65000
      }
    ]
  },
  {
    "id": "sando",
    "name": {
      "ko": "샌드위치",
      "en": "Sandwiches",
      "zh": "三明治",
      "ja": "サンド",
      "vi": "Sandwich"
    },
    "items": [
      {
        "name": {
          "ko": "후지로 특제 카츠산도",
          "en": "Fujiro Special Katsu Sando",
          "zh": "FUJIRO特制炸猪排三明治",
          "ja": "FUJIRO 特製カツサンド",
          "vi": "Sandwich thịt heo chiên xù đặc biệt FUJIRO (Katsu Sando)"
        },
        "price": 98000,
        "photo": "img/katsusando.jpg"
      },
      {
        "name": {
          "ko": "후지로 히레카츠 산도",
          "en": "Fujiro Hire Katsu Sando",
          "zh": "FUJIRO里脊猪排三明治",
          "ja": "FUJIRO ヒレカツサンド",
          "vi": "Sandwich thăn heo chiên xù FUJIRO (Hire Katsu Sando)"
        },
        "price": 110000
      },
      {
        "name": {
          "ko": "일본식 카레빵",
          "en": "Japanese Curry Bread",
          "zh": "日式咖喱面包",
          "ja": "カレーパン",
          "vi": "Bánh mì cà ri kiểu Nhật"
        },
        "price": 72000
      }
    ]
  },
  {
    "id": "side",
    "name": {
      "ko": "단품 · 사이드 · 디저트",
      "en": "Sides & Desserts",
      "zh": "单点 · 小菜 · 甜点",
      "ja": "一品・サイド・デザート",
      "vi": "Món lẻ · Món phụ · Tráng miệng"
    },
    "items": [
      {
        "name": {
          "ko": "멘치카츠",
          "en": "Menchi Katsu (Minced Meat Cutlet)",
          "zh": "炸肉饼(Menchi Katsu)",
          "ja": "メンチカツ",
          "vi": "Chả thịt chiên xù (Menchi Katsu)"
        },
        "price": 50000
      },
      {
        "name": {
          "ko": "치즈 멘치카츠",
          "en": "Cheese Menchi Katsu",
          "zh": "奶酪炸肉饼",
          "ja": "チーズ入りメンチカツ",
          "vi": "Chả thịt chiên xù nhân phô mai"
        },
        "price": 60000
      },
      {
        "name": {
          "ko": "돈카츠 1.5cm",
          "en": "Tonkatsu 1.5cm",
          "zh": "炸猪排 1.5cm",
          "ja": "豚カツ 1.5cm",
          "vi": "Cốt lết heo chiên xù 1,5cm"
        },
        "price": 115000
      },
      {
        "name": {
          "ko": "히레카츠 (단품)",
          "en": "Hire Katsu (A la carte)",
          "zh": "里脊猪排(单点)",
          "ja": "ヒレカツ",
          "vi": "Thăn heo chiên xù (món lẻ)"
        },
        "price": 40000
      },
      {
        "name": {
          "ko": "치즈 돈카츠 (모짜렐라)",
          "en": "Mozzarella Cheese Tonkatsu",
          "zh": "奶酪炸猪排(马苏里拉)",
          "ja": "チーズトンカツ",
          "vi": "Cốt lết chiên xù phô mai (Mozzarella)"
        },
        "price": 55000
      },
      {
        "name": {
          "ko": "카키후라이 (굴튀김)",
          "en": "Fried Oyster (Kaki Fry)",
          "zh": "炸牡蛎(Kaki Fry)",
          "ja": "カキフライ",
          "vi": "Hàu chiên xù (Kaki Fry)"
        },
        "price": 75000
      },
      {
        "name": {
          "ko": "치킨난반 (단품)",
          "en": "Chicken Nanban (A la carte)",
          "zh": "南蛮炸鸡(单点)",
          "ja": "チキン南蛮",
          "vi": "Gà chiên sốt Nanban (món lẻ)"
        },
        "price": 40000
      },
      {
        "name": {
          "ko": "왕새우튀김 (단품)",
          "en": "Jumbo Fried Shrimp",
          "zh": "炸大虾(单点)",
          "ja": "大エビフライ",
          "vi": "Tôm chiên xù cỡ lớn (món lẻ)"
        },
        "price": 80000
      },
      {
        "name": {
          "ko": "아스파라거스 롤",
          "en": "Pork Asparagus Roll",
          "zh": "芦笋猪肉卷",
          "ja": "アスパラロール",
          "vi": "Thịt heo cuộn măng tây"
        },
        "price": 40000
      },
      {
        "name": {
          "ko": "두부 샐러드",
          "en": "Tofu Salad",
          "zh": "豆腐沙拉",
          "ja": "豆腐サラダ",
          "vi": "Salad đậu phụ"
        },
        "price": 88000,
        "photo": "img/tofu-salad.jpg"
      },
      {
        "name": {
          "ko": "낫토",
          "en": "Natto",
          "zh": "纳豆",
          "ja": "納豆",
          "vi": "Natto (đậu nành lên men)"
        },
        "price": 35000,
        "photo": "img/natto.jpg"
      },
      {
        "name": {
          "ko": "나메타케 (팽이버섯 간장조림)",
          "en": "Nametake (Simmered Enoki)",
          "zh": "滑菇(酱油炖金针菇)",
          "ja": "なめ茸",
          "vi": "Nametake (nấm kim châm om tương)"
        },
        "price": 15000
      },
      {
        "name": {
          "ko": "수제 다시마키 (일본식 계란말이)",
          "en": "Homemade Dashimaki (Rolled Omelet)",
          "zh": "自制日式出汁蛋卷",
          "ja": "自家製出汁巻き",
          "vi": "Trứng cuộn Dashimaki tự làm (trứng cuộn kiểu Nhật)"
        },
        "price": 70000,
        "photo": "img/dashimaki.jpg"
      },
      {
        "name": {
          "ko": "미니 샐러드",
          "en": "Mini Salad",
          "zh": "迷你沙拉",
          "ja": "ミニサラダ",
          "vi": "Salad mini"
        },
        "price": 30000
      },
      {
        "name": {
          "ko": "공깃밥",
          "en": "Rice",
          "zh": "白米饭",
          "ja": "ライス",
          "vi": "Cơm trắng"
        },
        "price": 30000
      },
      {
        "name": {
          "ko": "돈지루 (돼지고기 된장국)",
          "en": "Tonjiru (Pork Miso Soup)",
          "zh": "猪肉味噌汤(豚汁)",
          "ja": "豚汁",
          "vi": "Tonjiru (canh miso thịt heo)"
        },
        "price": 30000
      },
      {
        "name": {
          "ko": "롤케이크",
          "en": "Roll Cake",
          "zh": "蛋糕卷",
          "ja": "ロールケーキ",
          "vi": "Bánh cuộn"
        },
        "price": 80000
      },
      {
        "name": {
          "ko": "군고구마 호지차 푸딩",
          "en": "Roasted Sweet Potato Hojicha Pudding",
          "zh": "烤红薯焙茶布丁",
          "ja": "焼き芋ほうじ茶プリン",
          "vi": "Pudding khoai lang nướng trà Hojicha"
        },
        "price": 38000
      }
    ]
  },
  {
    "id": "drink",
    "name": {
      "ko": "음료",
      "en": "Drinks",
      "zh": "饮品",
      "ja": "ドリンク",
      "vi": "Đồ uống"
    },
    "items": [
      {
        "name": {
          "ko": "센차소 아이스 말차",
          "en": "Senchasou Iced Matcha",
          "zh": "千茶荘冰抹茶",
          "ja": "千茶荘 アイス抹茶",
          "vi": "Matcha đá Senchasou"
        },
        "price": 20000
      },
      {
        "name": {
          "ko": "센차소 아이스 현미차",
          "en": "Senchasou Iced Genmaicha",
          "zh": "千茶荘冰玄米茶",
          "ja": "千茶荘 アイス玄米茶",
          "vi": "Trà gạo lứt Genmaicha đá Senchasou"
        },
        "price": 20000
      },
      {
        "name": {
          "ko": "센차소 아이스 호지차",
          "en": "Senchasou Iced Hojicha",
          "zh": "千茶荘冰焙茶",
          "ja": "千茶荘 アイスほうじ茶",
          "vi": "Trà rang Hojicha đá Senchasou"
        },
        "price": 20000
      },
      {
        "name": {
          "ko": "센차소 말차 라떼",
          "en": "Senchasou Matcha Latte",
          "zh": "千茶荘抹茶拿铁",
          "ja": "千茶荘の抹茶ラテ",
          "vi": "Matcha latte Senchasou"
        },
        "price": 40000
      },
      {
        "name": {
          "ko": "센차소 현미차 라떼",
          "en": "Senchasou Genmaicha Latte",
          "zh": "千茶荘玄米茶拿铁",
          "ja": "千茶荘の玄米茶ラテ",
          "vi": "Genmaicha latte Senchasou"
        },
        "price": 40000
      },
      {
        "name": {
          "ko": "센차소 호지차 라떼",
          "en": "Senchasou Hojicha Latte",
          "zh": "千茶荘焙茶拿铁",
          "ja": "千茶荘のほうじ茶ラテ",
          "vi": "Hojicha latte Senchasou"
        },
        "price": 40000
      },
      {
        "name": {
          "ko": "삿포로 맥주 (캔)",
          "en": "Sapporo Beer (Can)",
          "zh": "札幌啤酒(罐装)",
          "ja": "サッポロビール(缶)",
          "vi": "Bia Sapporo (lon)"
        },
        "price": 40000
      },
      {
        "name": {
          "ko": "타이거 맥주 (캔)",
          "en": "Tiger Beer (Can)",
          "zh": "虎牌啤酒(罐装)",
          "ja": "タイガービール(缶)",
          "vi": "Bia Tiger (lon)"
        },
        "price": 30000
      },
      {
        "name": {
          "ko": "타이거 실버 맥주",
          "en": "Tiger Silver Beer",
          "zh": "虎牌银标啤酒",
          "ja": "シルバータイガービール",
          "vi": "Bia Tiger Silver"
        },
        "price": 35000
      },
      {
        "name": {
          "ko": "스프라이트 (캔)",
          "en": "Sprite (Can)",
          "zh": "雪碧(罐装)",
          "ja": "スプライト(缶)",
          "vi": "Sprite (lon)"
        },
        "price": 25000
      },
      {
        "name": {
          "ko": "콜라 (캔)",
          "en": "Coke (Can)",
          "zh": "可乐(罐装)",
          "ja": "コーラ(缶)",
          "vi": "Coca-Cola (lon)"
        },
        "price": 25000
      },
      {
        "name": {
          "ko": "소다 (캔)",
          "en": "Soda (Can)",
          "zh": "苏打水(罐装)",
          "ja": "ソーダ(缶)",
          "vi": "Soda (lon)"
        },
        "price": 25000
      }
    ]
  }
];
