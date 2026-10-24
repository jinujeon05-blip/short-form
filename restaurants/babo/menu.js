// 바보아저씨 Babo (생돈까스 전문점 · 하노이 · 73 P. Trần Văn Lai, Từ Liêm) 메뉴 데이터 — 한식 분식·돈까스
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/바보아저씨" — 메뉴판 사진은 menu_01 한 장(세워 둔 메뉴판)이라 가격이 한 종류뿐.
// 안주류 6개(닭도리탕·낙지소면·동태찌개·오뎅탕·골뱅이비빔면·두부김치)는 메뉴판에 가격 표기가 없어 price null.
window.RESTAURANT = {
  brand: { ko: "바보아저씨", en: "Babo", branch: { ko: "하노이", en: "Hà Nội" } },
  phone: "0962 475 460",
  address: "73 P. Trần Văn Lai, Từ Liêm, Hà Nội",
  mapQuery: "Babo 바보아저씨 73 Trần Văn Lai Từ Liêm Hà Nội",
  mapUrl: "https://www.google.com/maps/place/Babo+%EB%B0%94%EB%B3%B4%EC%95%84%EC%A0%80%EC%94%A8/@21.0166812,105.77778,17z/data=!3m1!4b1!4m6!3m5!1s0x3134558625c11c0f:0xcb9d8ebc24972ab5!8m2!3d21.0166812!4d105.77778!16s%2Fg%2F11sf94b9f5",
  wifi: null, // 예: { ssid: "BABO", password: "12345678" }
};

window.MENU = [
  {
    id: "cutlet",
    name: {"ko": "돈까스류", "en": "Cutlets", "zh": "炸猪排类", "ja": "とんかつ類", "vi": "Món cốt lết chiên xù"},
    items: [
      {"price": 160000, "photo": "img/donkatsu.jpg", "tag": "best", "name": {"ko": "돈까스", "en": "Pork Cutlet (Donkatsu)", "zh": "炸猪排", "ja": "とんかつ", "vi": "Cốt lết heo chiên xù"}},
      {"price": 160000, "name": {"ko": "생선까스", "en": "Fish Cutlet (Saengseon-gaseu)", "zh": "炸鱼排", "ja": "魚カツ", "vi": "Cá chiên xù"}},
      {"price": 170000, "name": {"ko": "돈까스 + 생선까스", "en": "Pork Cutlet + Fish Cutlet", "zh": "炸猪排 + 炸鱼排", "ja": "とんかつ + 魚カツ", "vi": "Cốt lết heo + cá chiên xù"}},
      {"price": 170000, "name": {"ko": "돈까스 + 치킨까스", "en": "Pork Cutlet + Chicken Cutlet", "zh": "炸猪排 + 炸鸡排", "ja": "とんかつ + チキンカツ", "vi": "Cốt lết heo + gà chiên xù"}},
      {"price": 180000, "name": {"ko": "치즈돈까스", "en": "Cheese Pork Cutlet (Cheese Donkatsu)", "zh": "芝士炸猪排", "ja": "チーズとんかつ", "vi": "Cốt lết heo phô mai chiên xù"}},
      {"price": 170000, "name": {"ko": "치킨까스", "en": "Chicken Cutlet (Chicken Gaseu)", "zh": "炸鸡排", "ja": "チキンカツ", "vi": "Gà chiên xù"}},
      {"price": 170000, "name": {"ko": "함박스테이크", "en": "Hamburg Steak (Hambak Steak)", "zh": "汉堡肉排", "ja": "ハンバーグステーキ", "vi": "Bò viên áp chảo kiểu Hamburg"}},
      {"price": 180000, "name": {"ko": "파마산 돈까스", "en": "Parmesan Pork Cutlet", "zh": "帕玛森炸猪排", "ja": "パルメザンとんかつ", "vi": "Cốt lết heo phô mai Parmesan"}},
      {"price": 200000, "name": {"ko": "파마산 치즈돈까스", "en": "Parmesan Cheese Pork Cutlet", "zh": "帕玛森芝士炸猪排", "ja": "パルメザンチーズとんかつ", "vi": "Cốt lết heo phô mai Parmesan kéo sợi"}},
      {"price": 250000, "name": {"ko": "정식", "en": "Set Meal (Jeongsik)", "zh": "套餐", "ja": "定食", "vi": "Suất cơm combo"}, "desc": {"ko": "모둠돈까스 + 김밥 1줄", "en": "Assorted cutlets + 1 roll of gimbap", "zh": "什锦炸排 + 紫菜包饭1条", "ja": "盛り合わせカツ + キンパ1本", "vi": "Cốt lết chiên xù thập cẩm + 1 cuộn kimbap"}},
      {"price": 210000, "name": {"ko": "고치도그", "en": "Gochi Dog", "zh": "地瓜芝士热狗(Gochi Dog)", "ja": "コチドッグ", "vi": "Gochi Dog"}, "desc": {"ko": "고구마 치즈돈까스 롤", "en": "Sweet potato cheese cutlet roll", "zh": "地瓜芝士炸猪排卷", "ja": "さつまいもチーズとんかつロール", "vi": "Cuộn cốt lết chiên xù khoai lang phô mai"}},
    ],
  },
  {
    id: "set",
    name: {"ko": "1인 SET 메뉴", "en": "Single Set", "zh": "单人套餐", "ja": "1人前セット", "vi": "Set 1 người"},
    items: [
      {"price": 180000, "name": {"ko": "돈까스(1pc) + 쫄면 또는 비빔국수", "en": "Pork Cutlet (1 pc) + Chewy Spicy Noodles or Bibim Guksu", "zh": "炸猪排(1块) + 辣拌筋面或拌面", "ja": "とんかつ(1枚) + チョルミョンまたはビビン麺", "vi": "Cốt lết heo (1 miếng) + mì dai trộn cay hoặc mì trộn"}},
      {"price": 180000, "name": {"ko": "돈까스(1pc) + 김치볶음밥", "en": "Pork Cutlet (1 pc) + Kimchi Fried Rice", "zh": "炸猪排(1块) + 泡菜炒饭", "ja": "とんかつ(1枚) + キムチチャーハン", "vi": "Cốt lết heo (1 miếng) + cơm chiên kim chi"}},
      {"price": 180000, "name": {"ko": "돈까스(1pc) + 제육덮밥", "en": "Pork Cutlet (1 pc) + Spicy Pork Rice Bowl", "zh": "炸猪排(1块) + 辣炒猪肉盖饭", "ja": "とんかつ(1枚) + 豚肉炒め丼", "vi": "Cốt lết heo (1 miếng) + cơm thịt heo xào cay"}},
      {"price": 200000, "name": {"ko": "치즈돈까스(1pc) + 쫄면 또는 비빔국수", "en": "Cheese Pork Cutlet (1 pc) + Chewy Spicy Noodles or Bibim Guksu", "zh": "芝士炸猪排(1块) + 辣拌筋面或拌面", "ja": "チーズとんかつ(1枚) + チョルミョンまたはビビン麺", "vi": "Cốt lết heo phô mai (1 miếng) + mì dai trộn cay hoặc mì trộn"}},
      {"price": 200000, "name": {"ko": "치즈돈까스(1pc) + 김치볶음밥", "en": "Cheese Pork Cutlet (1 pc) + Kimchi Fried Rice", "zh": "芝士炸猪排(1块) + 泡菜炒饭", "ja": "チーズとんかつ(1枚) + キムチチャーハン", "vi": "Cốt lết heo phô mai (1 miếng) + cơm chiên kim chi"}},
      {"price": 200000, "name": {"ko": "치즈돈까스(1pc) + 제육덮밥", "en": "Cheese Pork Cutlet (1 pc) + Spicy Pork Rice Bowl", "zh": "芝士炸猪排(1块) + 辣炒猪肉盖饭", "ja": "チーズとんかつ(1枚) + 豚肉炒め丼", "vi": "Cốt lết heo phô mai (1 miếng) + cơm thịt heo xào cay"}},
    ],
  },
  {
    id: "snack",
    name: {"ko": "분식류", "en": "Street Snacks", "zh": "小吃类", "ja": "粉食(軽食)類", "vi": "Món ăn vặt"},
    items: [
      {"price": 80000, "photo": "img/tteokbokki.jpg", "spicy": true, "name": {"ko": "떡볶이", "en": "Spicy Rice Cakes (Tteokbokki)", "zh": "辣炒年糕", "ja": "トッポッキ", "vi": "Bánh gạo cay (Tteokbokki)"}},
      {"price": 80000, "photo": "img/sundae.jpg", "name": {"ko": "순대", "en": "Korean Blood Sausage (Sundae)", "zh": "韩式血肠", "ja": "スンデ(韓国風豚の腸詰め)", "vi": "Dồi Hàn Quốc (Sundae)"}},
      {"price": 130000, "spicy": true, "name": {"ko": "치즈떡볶이", "en": "Cheese Tteokbokki", "zh": "芝士辣炒年糕", "ja": "チーズトッポッキ", "vi": "Tteokbokki phô mai"}},
      {"price": 130000, "spicy": true, "name": {"ko": "라볶이", "en": "Rabokki (Ramyeon + Tteokbokki)", "zh": "拉面辣炒年糕(Rabokki)", "ja": "ラポッキ(ラーメントッポッキ)", "vi": "Rabokki (mì + bánh gạo cay)"}},
      {"price": 130000, "name": {"ko": "떡국", "en": "Rice Cake Soup (Tteokguk)", "zh": "年糕汤", "ja": "トックク(餅スープ)", "vi": "Canh bánh gạo (Tteokguk)"}},
      {"price": 130000, "photo": "img/mandu-guk.jpg", "name": {"ko": "만둣국", "en": "Dumpling Soup (Mandu-guk)", "zh": "饺子汤", "ja": "マンドゥクク(餃子スープ)", "vi": "Canh mandu (súp sủi cảo)"}},
      {"price": 130000, "name": {"ko": "떡만둣국", "en": "Rice Cake & Dumpling Soup (Tteok-mandu-guk)", "zh": "年糕饺子汤", "ja": "トックマンドゥクク(餅と餃子のスープ)", "vi": "Canh bánh gạo và mandu"}},
      {"price": 150000, "spicy": true, "name": {"ko": "쫄볶이", "en": "Jjolbokki (Chewy Noodles + Tteokbokki)", "zh": "筋面辣炒年糕(Jjolbokki)", "ja": "チョルポッキ(チョルミョン入りトッポッキ)", "vi": "Jjolbokki (mì dai + bánh gạo cay)"}},
      {"price": 160000, "name": {"ko": "떡순대", "en": "Tteok-sundae", "zh": "年糕血肠拼盘", "ja": "トックスンデ", "vi": "Tteok-sundae (bánh gạo và dồi)"}, "desc": {"ko": "떡볶이 + 순대", "en": "Tteokbokki + Sundae", "zh": "辣炒年糕 + 血肠", "ja": "トッポッキ + スンデ", "vi": "Tteokbokki + dồi Hàn Quốc"}},
      {"price": 180000, "name": {"ko": "순살 찜닭", "en": "Boneless Braised Chicken (Jjimdak)", "zh": "无骨炖鸡(Jjimdak)", "ja": "骨なしチムタク", "vi": "Gà hầm không xương (Jjimdak)"}, "desc": {"ko": "간장 또는 카레", "en": "Soy sauce or curry", "zh": "酱油或咖喱", "ja": "醤油またはカレー", "vi": "Vị xì dầu hoặc cà ri"}},
    ],
  },
  {
    id: "meal",
    name: {"ko": "식사·덮밥", "en": "Rice Dishes", "zh": "饭类·盖饭", "ja": "ご飯・丼", "vi": "Cơm"},
    items: [
      {"price": 50000, "photo": "img/gimbap.jpg", "name": {"ko": "김밥", "en": "Gimbap (Korean Seaweed Rice Roll)", "zh": "紫菜包饭", "ja": "キンパ(韓国のり巻き)", "vi": "Kimbap"}, "desc": {"ko": "1줄", "en": "1 roll", "zh": "1条", "ja": "1本", "vi": "1 cuộn"}},
      {"price": 70000, "name": {"ko": "참치김밥", "en": "Tuna Gimbap", "zh": "金枪鱼紫菜包饭", "ja": "ツナキンパ", "vi": "Kimbap cá ngừ"}, "desc": {"ko": "1줄", "en": "1 roll", "zh": "1条", "ja": "1本", "vi": "1 cuộn"}},
      {"price": 70000, "name": {"ko": "치즈김밥", "en": "Cheese Gimbap", "zh": "芝士紫菜包饭", "ja": "チーズキンパ", "vi": "Kimbap phô mai"}, "desc": {"ko": "1줄", "en": "1 roll", "zh": "1条", "ja": "1本", "vi": "1 cuộn"}},
      {"price": 130000, "photo": "img/omurice.jpg", "name": {"ko": "오므라이스", "en": "Omurice (Omelet Rice)", "zh": "蛋包饭", "ja": "オムライス", "vi": "Cơm trứng cuộn (Omurice)"}},
      {"price": 130000, "name": {"ko": "비빔밥", "en": "Bibimbap (Mixed Rice)", "zh": "拌饭", "ja": "ビビンバ", "vi": "Cơm trộn (Bibimbap)"}},
      {"price": 130000, "name": {"ko": "김치볶음밥", "en": "Kimchi Fried Rice", "zh": "泡菜炒饭", "ja": "キムチチャーハン", "vi": "Cơm chiên kim chi"}},
      {"price": 130000, "name": {"ko": "참치마요덮밥", "en": "Tuna Mayo Rice Bowl", "zh": "金枪鱼蛋黄酱盖饭", "ja": "ツナマヨ丼", "vi": "Cơm cá ngừ sốt mayo"}},
      {"price": 140000, "spicy": true, "name": {"ko": "제육덮밥", "en": "Spicy Pork Rice Bowl (Jeyuk Deopbap)", "zh": "辣炒猪肉盖饭", "ja": "豚肉炒め丼(ジェユクトッパプ)", "vi": "Cơm thịt heo xào cay (Jeyuk)"}},
      {"price": 170000, "spicy": true, "name": {"ko": "낙지덮밥", "en": "Spicy Octopus Rice Bowl (Nakji Deopbap)", "zh": "辣炒章鱼盖饭", "ja": "ナクチ丼(テナガダコ炒めのせご飯)", "vi": "Cơm bạch tuộc xào cay (Nakji)"}},
      {"price": 170000, "name": {"ko": "불고기덮밥", "en": "Bulgogi Rice Bowl", "zh": "烤肉盖饭(Bulgogi)", "ja": "プルコギ丼", "vi": "Cơm bò xào kiểu Bulgogi"}},
      {"price": 170000, "spicy": true, "name": {"ko": "오징어덮밥", "en": "Spicy Squid Rice Bowl (Ojingeo Deopbap)", "zh": "辣炒鱿鱼盖饭", "ja": "イカ炒め丼(オジンオトッパプ)", "vi": "Cơm mực xào cay (Ojingeo)"}},
      {"price": 170000, "name": {"ko": "뚝배기불고기", "en": "Bulgogi in a Stone Pot (Ttukbaegi Bulgogi)", "zh": "砂锅烤肉(Bulgogi)", "ja": "トゥッペギプルコギ(土鍋プルコギ)", "vi": "Bulgogi nồi đất (Ttukbaegi)"}},
    ],
  },
  {
    id: "noodle",
    name: {"ko": "면류", "en": "Noodles", "zh": "面类", "ja": "麺類", "vi": "Mì/bún"},
    items: [
      {"price": 130000, "spicy": true, "name": {"ko": "비빔국수", "en": "Spicy Mixed Noodles (Bibim Guksu)", "zh": "辣拌面", "ja": "ビビン麺(ビビムグクス)", "vi": "Mì trộn cay (Bibim guksu)"}},
      {"price": 130000, "photo": "img/yeolmu-guksu.jpg", "name": {"ko": "열무국수", "en": "Young Radish Kimchi Noodles (Yeolmu Guksu)", "zh": "小萝卜泡菜面", "ja": "ヨルム麺(若大根キムチの麺)", "vi": "Mì kim chi củ cải non (Yeolmu guksu)"}},
      {"price": 130000, "name": {"ko": "콩국수", "en": "Cold Soy Milk Noodles (Kong Guksu)", "zh": "豆浆冷面", "ja": "コングクス(冷たい豆乳麺)", "vi": "Mì sữa đậu nành lạnh (Kong guksu)"}},
      {"price": 130000, "name": {"ko": "잔치국수", "en": "Banquet Noodle Soup (Janchi Guksu)", "zh": "宴会汤面", "ja": "チャンチグクス(温かいそうめん)", "vi": "Mì nước kiểu Hàn (Janchi guksu)"}},
      {"price": 130000, "name": {"ko": "어묵우동", "en": "Fish Cake Udon", "zh": "鱼饼乌冬面", "ja": "おでんうどん", "vi": "Udon chả cá"}},
      {"price": 130000, "name": {"ko": "쫄면", "en": "Chewy Spicy Noodles (Jjolmyeon)", "zh": "辣拌筋面(Jjolmyeon)", "ja": "チョルミョン(コシの強い辛い和え麺)", "vi": "Mì dai trộn cay (Jjolmyeon)"}, "spicy": true},
      {"price": 130000, "name": {"ko": "모밀국수", "en": "Buckwheat Noodles (Memil Guksu)", "zh": "荞麦面", "ja": "そば", "vi": "Mì kiều mạch (Soba)"}},
    ],
  },
  {
    id: "stew",
    name: {"ko": "찌개류", "en": "Stews", "zh": "汤锅类", "ja": "チゲ類", "vi": "Canh/lẩu"},
    items: [
      {"price": 130000, "photo": "img/kimchi-jjigae.jpg", "spicy": true, "name": {"ko": "김치찌개", "en": "Kimchi Stew (Kimchi Jjigae)", "zh": "泡菜汤", "ja": "キムチチゲ", "vi": "Canh kim chi (Kimchi jjigae)"}},
      {"price": 130000, "spicy": true, "name": {"ko": "참치김치찌개", "en": "Tuna Kimchi Stew", "zh": "金枪鱼泡菜汤", "ja": "ツナキムチチゲ", "vi": "Canh kim chi cá ngừ"}},
      {"price": 130000, "name": {"ko": "된장찌개", "en": "Soybean Paste Stew (Doenjang Jjigae)", "zh": "大酱汤", "ja": "味噌チゲ(テンジャンチゲ)", "vi": "Canh tương đậu (Doenjang jjigae)"}},
      {"price": 150000, "name": {"ko": "차돌된장찌개", "en": "Beef Brisket Soybean Paste Stew", "zh": "牛腩大酱汤", "ja": "牛カルビ入り味噌チゲ", "vi": "Canh tương đậu thịt bò chadol"}},
      {"price": 150000, "spicy": true, "name": {"ko": "꽁치김치찌개", "en": "Mackerel Pike Kimchi Stew", "zh": "秋刀鱼泡菜汤", "ja": "サンマキムチチゲ", "vi": "Canh kim chi cá thu đao"}},
      {"price": 150000, "spicy": true, "name": {"ko": "부대찌개", "en": "Army Stew (Budae Jjigae)", "zh": "部队锅", "ja": "プデチゲ", "vi": "Lẩu quân đội (Budae jjigae)"}},
    ],
  },
  {
    id: "ramyeon",
    name: {"ko": "라면", "en": "Ramyeon", "zh": "拉面", "ja": "ラーメン", "vi": "Mì ăn liền"},
    items: [
      {"price": 80000, "photo": "img/ramyeon.jpg", "name": {"ko": "라면", "en": "Ramyeon (Korean Instant Noodles)", "zh": "韩式拉面", "ja": "韓国ラーメン", "vi": "Mì ăn liền Hàn Quốc"}},
      {"price": 90000, "spicy": true, "name": {"ko": "해장라면", "en": "Haejang Ramyeon (Hangover Ramyeon)", "zh": "醒酒拉面", "ja": "ヘジャンラーメン(二日酔い用ラーメン)", "vi": "Mì giải rượu (Haejang ramyeon)"}},
      {"price": 100000, "name": {"ko": "떡라면", "en": "Rice Cake Ramyeon", "zh": "年糕拉面", "ja": "餅ラーメン", "vi": "Mì ăn liền bánh gạo"}},
      {"price": 100000, "name": {"ko": "만두라면", "en": "Dumpling Ramyeon", "zh": "饺子拉面", "ja": "餃子ラーメン", "vi": "Mì ăn liền mandu"}},
      {"price": 100000, "name": {"ko": "치즈라면", "en": "Cheese Ramyeon", "zh": "芝士拉面", "ja": "チーズラーメン", "vi": "Mì ăn liền phô mai"}},
    ],
  },
  {
    id: "anju",
    name: {"ko": "안주류", "en": "Side dishes for drinks", "zh": "下酒菜", "ja": "おつまみ", "vi": "Mồi nhậu"},
    items: [
      {"price": null, "spicy": true, "name": {"ko": "닭도리탕", "en": "Spicy Braised Chicken (Dakdoritang)", "zh": "辣炖鸡块(Dakdoritang)", "ja": "タットリタン(鶏の辛い煮込み)", "vi": "Gà hầm cay (Dakdoritang)"}},
      {"price": null, "spicy": true, "name": {"ko": "낙지소면", "en": "Spicy Octopus Somyeon (Nakji Somyeon)", "zh": "辣炒章鱼细面", "ja": "ナクチそうめん(辛いテナガダコ入り)", "vi": "Mì somyeon bạch tuộc cay (Nakji somyeon)"}},
      {"price": null, "name": {"ko": "동태찌개", "en": "Pollack Stew (Dongtae Jjigae)", "zh": "明太鱼汤锅", "ja": "冷凍スケトウダラのチゲ", "vi": "Lẩu cá minh thái (Dongtae jjigae)"}},
      {"price": null, "name": {"ko": "오뎅탕", "en": "Fish Cake Soup (Odeng-tang)", "zh": "鱼饼汤", "ja": "おでん鍋", "vi": "Lẩu chả cá (Odeng-tang)"}},
      {"price": null, "spicy": true, "name": {"ko": "골뱅이비빔면", "en": "Spicy Whelk Mixed Noodles (Golbaengi Bibimmyeon)", "zh": "辣拌海螺面", "ja": "ツブ貝の辛い和え麺", "vi": "Mì trộn ốc biển cay (Golbaengi bibimmyeon)"}},
      {"price": null, "name": {"ko": "두부김치", "en": "Tofu with Stir-fried Kimchi (Dubu Kimchi)", "zh": "豆腐配炒泡菜", "ja": "豆腐キムチ(豆腐と炒めキムチ)", "vi": "Đậu phụ ăn kèm kim chi xào (Dubu kimchi)"}},
    ],
  },
  {
    id: "drink",
    name: {"ko": "주류·음료", "en": "Drinks", "zh": "酒水·饮料", "ja": "お酒・ドリンク", "vi": "Đồ uống"},
    items: [
      {"price": 20000, "name": {"ko": "음료수 (콜라·사이다·환타)", "en": "Soft Drink (Cola · Cider · Fanta)", "zh": "饮料(可乐·汽水·芬达)", "ja": "ソフトドリンク(コーラ・サイダー・ファンタ)", "vi": "Nước ngọt (Cola · Cider · Fanta)"}},
      {"price": 50000, "name": {"ko": "맥주", "en": "Beer", "zh": "啤酒", "ja": "ビール", "vi": "Bia"}},
      {"price": 130000, "name": {"ko": "소주", "en": "Soju", "zh": "烧酒", "ja": "焼酎(ソジュ)", "vi": "Soju"}},
      {"price": 150000, "name": {"ko": "막걸리", "en": "Makgeolli (Korean Rice Wine)", "zh": "马格利米酒", "ja": "マッコリ", "vi": "Makgeolli (rượu gạo Hàn Quốc)"}},
    ],
  },
];
