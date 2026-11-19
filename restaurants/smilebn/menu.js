// 박닌 스마일 회관 BAC NINH SMILE 메뉴 데이터 (구글 지도에 올린 메뉴판 기준, 가게 찾기용, 2026-11-19)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만 — 정사각형이면 양옆 흰 여백)
// 메뉴판 사진끼리 가격이 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "박닌 스마일 회관", en: "BAC NINH SMILE" },
  phone: "0977 851 004",
  address: "35 Đ. Nguyễn Tất Tố, Võ Cường, Bắc Ninh",
  hours: "10:00 – 22:00",
};

window.MENU = [
 {
  "id": "combo",
  "name": {
   "ko": "모듬 · 세트",
   "en": "Assorted Platters · Sets",
   "zh": "拼盘 · 套餐",
   "ja": "盛り合わせ・セット",
   "vi": "Combo · Set"
  },
  "items": [
   {
    "name": {
     "ko": "스마일 모듬",
     "en": "Smile Assorted Platter",
     "zh": "Smile 综合拼盘",
     "ja": "スマイル盛り合わせ",
     "vi": "COMBO tổng hợp Smile"
    },
    "price": 490000,
    "desc": {
     "ko": "400g · 2~3인분 · 냉삼+대패+천겹+벌집껍데기",
     "en": "400g · Serves 2-3 · Frozen pork belly (Naengsam) + thin-sliced pork belly (Daepae) + pork jowl (Cheongyeop) + honeycomb pork skin",
     "zh": "400g · 2~3人份 · 冷冻五花肉（冷三）+薄切五花肉+千层猪颈肉+蜂窝猪皮",
     "ja": "400g · 2~3人前 · 冷凍サムギョプサル（ネンサム）＋薄切りバラ（テパ）＋豚トロ（チョンギョプ）＋ハチの巣豚皮",
     "vi": "400g · 2~3 người · Ba chỉ đông lạnh + ba chỉ thái lát + thịt heo ngàn lớp + da heo"
    },
    "tag": "best"
   },
   {
    "name": {
     "ko": "동네 이장 모듬",
     "en": "Village Chief Assorted Platter",
     "zh": "村长综合拼盘",
     "ja": "村長の盛り合わせ",
     "vi": "COMBO tổng hợp Đong Nê I-jang"
    },
    "price": 590000,
    "desc": {
     "ko": "400g · 2~3인분 · 3% 뒷고기+생소금구이+천겹살",
     "en": "400g · Serves 2-3 · 3% salt-grilled pork (Dwitgogi) + fresh salt-grilled pork + pork jowl (Cheongyeopsal)",
     "zh": "400g · 2~3人份 · 3%盐烤后腿肉（Dwitgogi）+鲜盐烤猪肉+千层猪颈肉",
     "ja": "400g · 2~3人前 · 3%塩ティッコギ（トゥィッコギ）＋生塩焼き＋豚トロ（チョンギョプサル）",
     "vi": "400g · 2~3 người · Thịt heo đặc biệt 3% + thịt heo nướng muối + thịt heo ngàn lớp"
    }
   },
   {
    "name": {
     "ko": "잔치 한마당 세트",
     "en": "Feast Set (Janchi Hanmadang)",
     "zh": "盛宴套餐（Janchi Hanmadang）",
     "ja": "宴会セット（チャンチ・ハンマダン）",
     "vi": "COMBO tiệc tổng hợp"
    },
    "sizes": [
     [
      "450g",
      1490000
     ],
     [
      "800g",
      2990000
     ]
    ],
    "desc": {
     "ko": "꽃살+살치살+소갈비살+우삼겹",
     "en": "Marbled beef (Kkotsal) + chuck flap tail (Salchisal) + boneless short rib + US beef belly",
     "zh": "花肉+雪花牛肩肉（Salchisal）+无骨牛小排+美国牛五花",
     "ja": "花カルビ（コッサル）＋サルチサル＋骨なしカルビ＋アメリカ産牛バラ",
     "vi": "Hoa sườn bò + bẹ vai bò + sườn bò không xương + ba chỉ bò Mỹ"
    }
   }
  ]
 },
 {
  "id": "pork",
  "name": {
   "ko": "돼지고기 구이",
   "en": "Grilled Pork",
   "zh": "烤猪肉",
   "ja": "豚肉の焼肉",
   "vi": "Thịt heo nướng"
  },
  "items": [
   {
    "name": {
     "ko": "-45° 정석 특 냉삼",
     "en": "Premium Frozen Pork Belly -45° (Naengsam)",
     "zh": "-45° 正宗特级冷冻五花肉（冷三）",
     "ja": "-45° 特上冷凍サムギョプサル（ネンサム）",
     "vi": "Thịt ba chỉ đông lạnh đặc biệt -45°"
    },
    "price": 130000,
    "desc": {
     "ko": "150g · 2인부터 주문 가능",
     "en": "150g · Minimum order for 2",
     "zh": "150g · 2人起订",
     "ja": "150g · 2名様から注文可",
     "vi": "150g · từ 2 người"
    },
    "photo": "img/naengsam.jpg",
    "tag": "must"
   },
   {
    "name": {
     "ko": "생삼겹살",
     "en": "Fresh Pork Belly (Saeng Samgyeopsal)",
     "zh": "鲜五花肉（Saeng Samgyeopsal）",
     "ja": "生サムギョプサル",
     "vi": "Ba chỉ heo tươi"
    },
    "price": 180000,
    "desc": {
     "ko": "150g · 2인부터 주문 가능",
     "en": "150g · Minimum order for 2",
     "zh": "150g · 2人起订",
     "ja": "150g · 2名様から注文可",
     "vi": "150g · từ 2 người"
    }
   },
   {
    "name": {
     "ko": "양념 돼지 갈비",
     "en": "Marinated Pork Ribs (Yangnyeom Dwaeji Galbi)",
     "zh": "腌制猪排（Yangnyeom Dwaeji Galbi）",
     "ja": "味付け豚カルビ",
     "vi": "Sườn heo sốt tẩm gia vị"
    },
    "price": 180000,
    "desc": {
     "ko": "150g",
     "en": "150g",
     "zh": "150g",
     "ja": "150g",
     "vi": "150g"
    }
   },
   {
    "name": {
     "ko": "3% 소금 뒷고기",
     "en": "3% Salt-Grilled Pork (Dwitgogi)",
     "zh": "3%盐烤后腿肉（Dwitgogi）",
     "ja": "3%塩ティッコギ（トゥィッコギ）",
     "vi": "Thịt heo đặc biệt nướng muối"
    },
    "price": 200000,
    "desc": {
     "ko": "150g",
     "en": "150g",
     "zh": "150g",
     "ja": "150g",
     "vi": "150g"
    }
   },
   {
    "name": {
     "ko": "천겹살 (항정살)",
     "en": "Pork Jowl (Cheongyeopsal)",
     "zh": "千层猪颈肉（Cheongyeopsal）",
     "ja": "豚トロ（チョンギョプサル）",
     "vi": "Thịt má heo"
    },
    "price": 180000,
    "desc": {
     "ko": "120g",
     "en": "120g",
     "zh": "120g",
     "ja": "120g",
     "vi": "120g"
    }
   },
   {
    "name": {
     "ko": "스마일 돼지막창",
     "en": "Smile Grilled Pork Intestine (Dwaeji Makchang)",
     "zh": "Smile 烤猪肠（Dwaeji Makchang）",
     "ja": "スマイル豚マクチャン",
     "vi": "Lòng non heo Smile"
    },
    "price": 290000,
    "desc": {
     "ko": "150g · 2인부터 주문 가능",
     "en": "150g · Minimum order for 2",
     "zh": "150g · 2人起订",
     "ja": "150g · 2名様から注文可",
     "vi": "150g · từ 2 người"
    }
   }
  ]
 },
 {
  "id": "beef",
  "name": {
   "ko": "소고기 구이",
   "en": "Grilled Beef",
   "zh": "烤牛肉",
   "ja": "牛肉の焼肉",
   "vi": "Thịt bò nướng"
  },
  "items": [
   {
    "name": {
     "ko": "프라임 생갈비",
     "en": "Prime Fresh Short Rib (Saeng Galbi)",
     "zh": "优质鲜牛小排（Saeng Galbi）",
     "ja": "プライム生カルビ",
     "vi": "Sườn bò tươi Prime"
    },
    "price": 390000,
    "desc": {
     "ko": "200g",
     "en": "200g",
     "zh": "200g",
     "ja": "200g",
     "vi": "200g"
    }
   },
   {
    "name": {
     "ko": "소갈비살",
     "en": "Boneless Short Rib (Sogalbisal)",
     "zh": "无骨牛小排（Sogalbisal）",
     "ja": "骨なしカルビ（ソカルビサル）",
     "vi": "Sườn bò không xương"
    },
    "price": 240000,
    "desc": {
     "ko": "150g · 2인부터 주문 가능",
     "en": "150g · Minimum order for 2",
     "zh": "150g · 2人起订",
     "ja": "150g · 2名様から注文可",
     "vi": "150g · từ 2 người"
    }
   },
   {
    "name": {
     "ko": "양념소갈비살 (마늘폭탄)",
     "en": "Marinated Boneless Short Rib (Garlic Bomb)",
     "zh": "腌制无骨牛小排（蒜香炸弹）",
     "ja": "味付け骨なしカルビ（ニンニク爆弾）",
     "vi": "Dẻ sườn bò sốt gia vị tỏi"
    },
    "price": 270000,
    "desc": {
     "ko": "150g · 2인부터 주문 가능",
     "en": "150g · Minimum order for 2",
     "zh": "150g · 2人起订",
     "ja": "150g · 2名様から注文可",
     "vi": "150g · từ 2 người"
    }
   },
   {
    "name": {
     "ko": "살치살",
     "en": "Chuck Flap Tail (Salchisal)",
     "zh": "雪花牛肩肉（Salchisal）",
     "ja": "サルチサル（牛肩ロース）",
     "vi": "Bẹ vai bò"
    },
    "price": 350000,
    "desc": {
     "ko": "120g · 2인부터 주문 가능",
     "en": "120g · Minimum order for 2",
     "zh": "120g · 2人起订",
     "ja": "120g · 2名様から注文可",
     "vi": "120g · từ 2 người"
    }
   },
   {
    "name": {
     "ko": "고소한 우삼겹",
     "en": "Rich US Beef Belly (Usamgyeop)",
     "zh": "香浓美国牛五花（Usamgyeop）",
     "ja": "香ばしいアメリカ産牛バラ（ウサムギョプ）",
     "vi": "Ba chỉ bò Mỹ"
    },
    "price": 200000,
    "desc": {
     "ko": "150g · 2인부터 주문 가능",
     "en": "150g · Minimum order for 2",
     "zh": "150g · 2人起订",
     "ja": "150g · 2名様から注文可",
     "vi": "150g · từ 2 người"
    }
   },
   {
    "name": {
     "ko": "스마일 소막창",
     "en": "Smile Grilled Beef Intestine (So Makchang)",
     "zh": "Smile 烤牛肠（So Makchang）",
     "ja": "スマイル牛マクチャン",
     "vi": "Lòng non bò Smile"
    },
    "price": 490000,
    "desc": {
     "ko": "150g · 2인부터 주문 가능",
     "en": "150g · Minimum order for 2",
     "zh": "150g · 2人起订",
     "ja": "150g · 2名様から注文可",
     "vi": "150g · từ 2 người"
    }
   }
  ]
 },
 {
  "id": "lamb",
  "name": {
   "ko": "양고기 구이",
   "en": "Grilled Lamb",
   "zh": "烤羊肉",
   "ja": "ラム肉の焼肉",
   "vi": "Thịt cừu nướng"
  },
  "items": [
   {
    "name": {
     "ko": "양 생갈비",
     "en": "Fresh Lamb Ribs (Yang Saeng Galbi)",
     "zh": "鲜羊排（Yang Saeng Galbi）",
     "ja": "生ラムカルビ",
     "vi": "Sườn cừu tươi"
    },
    "price": 600000,
    "desc": {
     "ko": "250g · 2인부터 주문 가능",
     "en": "250g · Minimum order for 2",
     "zh": "250g · 2人起订",
     "ja": "250g · 2名様から注文可",
     "vi": "250g · từ 2 người"
    }
   },
   {
    "name": {
     "ko": "양 숄더 렉",
     "en": "Lamb Shoulder Rack",
     "zh": "羊肩排",
     "ja": "ラムショルダーラック",
     "vi": "Sườn cừu French Rack"
    },
    "price": 300000,
    "desc": {
     "ko": "200g · 2인부터 주문 가능",
     "en": "200g · Minimum order for 2",
     "zh": "200g · 2人起订",
     "ja": "200g · 2名様から注文可",
     "vi": "200g · từ 2 người"
    },
    "photo": "img/lamb.jpg"
   }
  ]
 },
 {
  "id": "raw",
  "name": {
   "ko": "육회 · 별미",
   "en": "Beef Tartare · Specialties",
   "zh": "生牛肉 · 特色小吃",
   "ja": "ユッケ・珍味",
   "vi": "Gỏi · Món đặc biệt"
  },
  "items": [
   {
    "name": {
     "ko": "스마일 육회",
     "en": "Smile Beef Tartare (Yukhoe)",
     "zh": "Smile 韩式生牛肉（Yukhoe）",
     "ja": "スマイルユッケ",
     "vi": "Gỏi bò Smile"
    },
    "price": 200000,
    "desc": {
     "ko": "150g",
     "en": "150g",
     "zh": "150g",
     "ja": "150g",
     "vi": "150g"
    },
    "photo": "img/yukhoe.jpg",
    "tag": "best"
   },
   {
    "name": {
     "ko": "스마일 특선 살치살 육회",
     "en": "Smile Special Chuck Flap Tail Beef Tartare (Salchisal Yukhoe)",
     "zh": "Smile 特选雪花牛肩肉生牛肉（Salchisal Yukhoe）",
     "ja": "スマイル特選サルチサルユッケ",
     "vi": "Gỏi bẹ vai bò Smile đặc biệt"
    },
    "price": 400000,
    "desc": {
     "ko": "150g",
     "en": "150g",
     "zh": "150g",
     "ja": "150g",
     "vi": "150g"
    }
   },
   {
    "name": {
     "ko": "오징어 초무침",
     "en": "Tangy Squid Salad (Ojingeo Chomuchim)",
     "zh": "醋拌鱿鱼（Ojingeo Chomuchim）",
     "ja": "イカの酢和え",
     "vi": "Mực trộn chua cay"
    },
    "price": 220000
   }
  ]
 },
 {
  "id": "stew",
  "name": {
   "ko": "찌개 · 식사",
   "en": "Stews · Meals",
   "zh": "炖汤 · 正餐",
   "ja": "チゲ・お食事",
   "vi": "Canh · Cơm"
  },
  "items": [
   {
    "name": {
     "ko": "된장찌개",
     "en": "Soybean Paste Stew (Doenjang Jjigae)",
     "zh": "大酱汤（Doenjang Jjigae）",
     "ja": "テンジャンチゲ",
     "vi": "Canh tương đậu"
    },
    "price": 140000
   },
   {
    "name": {
     "ko": "김치찌개",
     "en": "Kimchi Stew (Kimchi Jjigae)",
     "zh": "泡菜汤（Kimchi Jjigae）",
     "ja": "キムチチゲ",
     "vi": "Canh kimchi"
    },
    "price": 140000
   },
   {
    "name": {
     "ko": "해물순두부찌개",
     "en": "Seafood Soft Tofu Stew (Haemul Sundubu Jjigae)",
     "zh": "海鲜嫩豆腐汤（Haemul Sundubu Jjigae）",
     "ja": "海鮮スンドゥブチゲ",
     "vi": "Canh đậu non hải sản"
    },
    "price": 160000
   },
   {
    "name": {
     "ko": "매운돼지갈비찜",
     "en": "Spicy Braised Pork Ribs (Maeun Dwaeji Galbijjim)",
     "zh": "辣炖猪排（Maeun Dwaeji Galbijjim）",
     "ja": "辛い豚カルビチム",
     "vi": "Sườn heo hầm cay"
    },
    "price": 650000,
    "desc": {
     "ko": "800g",
     "en": "800g",
     "zh": "800g",
     "ja": "800g",
     "vi": "800g"
    }
   },
   {
    "name": {
     "ko": "된장술밥",
     "en": "Soybean Paste Rice Soup (Doenjang Sulbap)",
     "zh": "大酱泡饭（Doenjang Sulbap）",
     "ja": "テンジャンスルパプ（味噌ご飯スープ）",
     "vi": "Cơm canh đậu tương"
    },
    "price": 150000
   },
   {
    "name": {
     "ko": "스마일 술밥",
     "en": "Smile Rice Soup (Smile Sulbap)",
     "zh": "Smile 泡饭（Sulbap）",
     "ja": "スマイルスルパプ（ご飯スープ）",
     "vi": "Cơm canh Smile"
    },
    "price": 200000
   }
  ]
 },
 {
  "id": "noodle",
  "name": {
   "ko": "냉면 · 국수",
   "en": "Cold Noodles · Noodles",
   "zh": "冷面 · 面条",
   "ja": "冷麺・麺類",
   "vi": "Mì"
  },
  "items": [
   {
    "name": {
     "ko": "물냉면",
     "en": "Cold Buckwheat Noodles in Broth (Mul Naengmyeon)",
     "zh": "水冷面（Mul Naengmyeon）",
     "ja": "水冷麺（ムルネンミョン）",
     "vi": "Mì lạnh nước"
    },
    "sizes": [
     [
      "S",
      80000
     ],
     [
      "L",
      160000
     ]
    ],
    "desc": {
     "ko": "S = 후식 양 · L = 보통 양",
     "en": "S = dessert-size portion · L = regular portion",
     "zh": "S = 小份（餐后） · L = 正常份",
     "ja": "S = 食後向けの小盛り · L = 通常盛り",
     "vi": "S = suất nhỏ (tráng miệng) · L = suất lớn"
    }
   },
   {
    "name": {
     "ko": "비빔냉면",
     "en": "Spicy Mixed Cold Noodles (Bibim Naengmyeon)",
     "zh": "拌冷面（Bibim Naengmyeon）",
     "ja": "ビビン冷麺",
     "vi": "Mì lạnh trộn cay"
    },
    "sizes": [
     [
      "S",
      80000
     ],
     [
      "L",
      160000
     ]
    ],
    "desc": {
     "ko": "S = 후식 양 · L = 보통 양",
     "en": "S = dessert-size portion · L = regular portion",
     "zh": "S = 小份（餐后） · L = 正常份",
     "ja": "S = 食後向けの小盛り · L = 通常盛り",
     "vi": "S = suất nhỏ (tráng miệng) · L = suất lớn"
    }
   },
   {
    "name": {
     "ko": "백합 칼국수 (조개육수)",
     "en": "Clam Knife-Cut Noodle Soup (Baekhap Kalguksu)",
     "zh": "蛤蜊刀削面（Baekhap Kalguksu，贝类高汤）",
     "ja": "ハマグリカルグクス（貝だし）",
     "vi": "Mì hải sản không cay"
    },
    "sizes": [
     [
      "S",
      90000
     ],
     [
      "L",
      180000
     ]
    ],
    "desc": {
     "ko": "S = 후식 양 · L = 보통 양",
     "en": "S = dessert-size portion · L = regular portion",
     "zh": "S = 小份（餐后） · L = 正常份",
     "ja": "S = 食後向けの小盛り · L = 通常盛り",
     "vi": "S = suất nhỏ (tráng miệng) · L = suất lớn"
    }
   },
   {
    "name": {
     "ko": "쫄면",
     "en": "Chewy Spicy Noodles (Jjolmyeon)",
     "zh": "辣拌筋道面（Jjolmyeon）",
     "ja": "チョルミョン",
     "vi": "Mì dai trộn"
    },
    "price": 150000
   }
  ]
 },
 {
  "id": "lunch",
  "name": {
   "ko": "스마일 점심 특선",
   "en": "Smile Lunch Special",
   "zh": "Smile 午餐特选",
   "ja": "スマイルランチ特選",
   "vi": "Suất trưa đặc biệt Smile"
  },
  "note": {
   "ko": "월요일~금요일 점심에만 주문할 수 있어요",
   "en": "Available only at lunchtime, Monday to Friday",
   "zh": "仅限周一至周五午餐时段点餐",
   "ja": "月曜日～金曜日のランチタイムのみご注文いただけます",
   "vi": "Áp dụng từ thứ Hai đến thứ Sáu, chỉ buổi trưa"
  },
  "items": [
   {
    "name": {
     "ko": "고기밥상",
     "en": "Meat Table Set (Gogi Bapsang)",
     "zh": "肉类套餐（Gogi Bapsang）",
     "ja": "肉定食（コギパプサン）",
     "vi": "Set thịt tổng hợp"
    },
    "price": 130000,
    "desc": {
     "ko": "1인 기준 (2·3·4인) · 대패삼겹살+청국장 또는 된장찌개+반찬+식혜+야채쌈 · 찌개는 1가지만 선택",
     "en": "Price per person (for 2, 3 or 4 people) · Thin-sliced pork belly + Cheonggukjang or soybean paste stew + side dishes + Sikhye + lettuce wraps · Choose only 1 stew per table",
     "zh": "每人价格（2·3·4人用）· 薄切五花肉+清麴酱汤或大酱汤+小菜+甜米露+蔬菜包 · 每桌汤只能选1种",
     "ja": "1名様の料金（2・3・4名様用）· 薄切りサムギョプサル＋チョングッチャンまたはテンジャンチゲ＋おかず＋シッケ＋野菜サム · チゲは1種類のみ選択",
     "vi": "Giá 1 người (2/3/4 người) · Ba chỉ heo cuộn + canh đậu tương lên men hoặc canh tương đậu + món ăn kèm + Sikhye + rau cuốn · Mỗi bàn chỉ gọi 1 loại canh"
    },
    "photo": "img/daepae.jpg",
    "tag": "best"
   },
   {
    "name": {
     "ko": "제육쌈밥정식",
     "en": "Spicy Pork Ssambap Set (Jeyuk Ssambap Jeongsik)",
     "zh": "辣炒猪肉包饭套餐（Jeyuk Ssambap）",
     "ja": "豚辛炒めサムパ定食（ジェユクサムパ）",
     "vi": "Set cơm cuốn thịt xào cay (Jeyuk)"
    },
    "price": 180000,
    "desc": {
     "ko": "1인 기준 (2·3·4인) · 제육볶음+야채쌈+청국장 또는 된장찌개+반찬+식혜 · 찌개는 1가지만 선택",
     "en": "Price per person (for 2, 3 or 4 people) · Spicy stir-fried pork (Jeyuk Bokkeum) + lettuce wraps + Cheonggukjang or soybean paste stew + side dishes + Sikhye · Choose only 1 stew per table",
     "zh": "每人价格（2·3·4人用）· 辣炒猪肉+蔬菜包+清麴酱汤或大酱汤+小菜+甜米露 · 每桌汤只能选1种",
     "ja": "1名様の料金（2・3・4名様用）· 豚の辛炒め（ジェユクポックム）＋野菜サム＋チョングッチャンまたはテンジャンチゲ＋おかず＋シッケ · チゲは1種類のみ選択",
     "vi": "Giá 1 người (2/3/4 người) · Thịt heo xào cay + rau cuốn + canh + món ăn kèm + Sikhye · Mỗi bàn chỉ gọi 1 loại canh"
    }
   },
   {
    "name": {
     "ko": "뼈다귀 해장국",
     "en": "Pork Bone Hangover Soup (Ppyeodagwi Haejangguk)",
     "zh": "猪骨醒酒汤（Ppyeodagwi Haejangguk）",
     "ja": "豚骨ヘジャンクク（二日酔いスープ）",
     "vi": "Canh xương hầm giải rượu Smile"
    },
    "price": 200000
   },
   {
    "name": {
     "ko": "순대국밥",
     "en": "Korean Blood Sausage Soup with Rice (Sundae Gukbap)",
     "zh": "血肠汤饭（Sundae Gukbap）",
     "ja": "スンデクッパ（韓国風腸詰めスープご飯）",
     "vi": "Canh lòng huyết Hàn Quốc"
    },
    "price": 180000
   },
   {
    "name": {
     "ko": "여름 동치미 열무국수",
     "en": "Summer Dongchimi Young Radish Noodles (Yeolmu Guksu)",
     "zh": "夏日萝卜水泡菜小萝卜叶面（Yeolmu Guksu）",
     "ja": "夏のトンチミ ヨルム冷麺（ヨルムグクス）",
     "vi": "Mì lạnh nước củ cải (dongchimi)"
    },
    "price": 130000
   }
  ]
 },
 {
  "id": "extra",
  "name": {
   "ko": "고기 후 추가 · 후식",
   "en": "After-Meat Add-ons · Desserts",
   "zh": "吃肉后加点 · 饭后餐",
   "ja": "お肉の後の追加・〆メニュー",
   "vi": "Gọi thêm sau khi ăn thịt"
  },
  "note": {
   "ko": "고기를 드신 후에 주문할 수 있어요",
   "en": "Can be ordered only after eating the meat",
   "zh": "吃完肉后才可点餐",
   "ja": "お肉をお召し上がりになった後にご注文いただけます",
   "vi": "Chỉ gọi sau khi đã ăn thịt"
  },
  "items": [
   {
    "name": {
     "ko": "돌판치즈 볶음밥",
     "en": "Stone-Plate Cheese Fried Rice (Dolpan Cheese Bokkeumbap)",
     "zh": "石板芝士炒饭（Dolpan Cheese Bokkeumbap）",
     "ja": "石板チーズチャーハン（トルパンチーズポックンパプ）",
     "vi": "Cơm chiên phô mai"
    },
    "price": 50000,
    "photo": "img/bokkeum.jpg",
    "tag": "must"
   },
   {
    "name": {
     "ko": "구워먹는 치즈 (6개)",
     "en": "Grilling Cheese (6 pieces)",
     "zh": "烤芝士（6块）",
     "ja": "焼きチーズ（6個）",
     "vi": "Phô mai nướng (6 miếng)"
    },
    "price": 60000
   },
   {
    "name": {
     "ko": "쫄면 비빔추가",
     "en": "Extra Spicy Mixed Noodles (Jjolmyeon Bibim Add-on)",
     "zh": "加点拌面（Jjolmyeon）",
     "ja": "チョルミョン ビビン追加",
     "vi": "Thêm mì trộn cay"
    },
    "price": 40000
   }
  ]
 },
 {
  "id": "liquor",
  "name": {
   "ko": "주류",
   "en": "Alcohol",
   "zh": "酒类",
   "ja": "お酒",
   "vi": "Rượu · Bia"
  },
  "items": [
   {
    "name": {
     "ko": "참이슬",
     "en": "Chamisul (Soju)",
     "zh": "真露烧酒（Chamisul）",
     "ja": "チャミスル",
     "vi": "Chamisul"
    },
    "price": 130000
   },
   {
    "name": {
     "ko": "진로이즈백",
     "en": "Jinro Is Back (Soju)",
     "zh": "真露 Is Back 烧酒",
     "ja": "ジンロイズバック",
     "vi": "Rượu Jinro"
    },
    "price": 130000
   },
   {
    "name": {
     "ko": "새로소주",
     "en": "Saero Soju",
     "zh": "Saero 烧酒",
     "ja": "セロ焼酎",
     "vi": "Sero Soju"
    },
    "price": 130000
   },
   {
    "name": {
     "ko": "처음처럼",
     "en": "Chum-churum (Soju)",
     "zh": "初饮初乐烧酒（Chum-churum）",
     "ja": "チョウムチョロム",
     "vi": "Rượu Chum-churum"
    },
    "price": 130000
   },
   {
    "name": {
     "ko": "좋은데이",
     "en": "Good Day (Soju)",
     "zh": "Good Day 烧酒",
     "ja": "チョウンデイ",
     "vi": "Rượu Good Day"
    },
    "price": 110000
   },
   {
    "name": {
     "ko": "청하",
     "en": "Chung-ha (Sake)",
     "zh": "清河清酒（Chung-ha）",
     "ja": "チョンハ（清酒）",
     "vi": "Rượu Chongha"
    },
    "price": 160000
   },
   {
    "name": {
     "ko": "막걸리",
     "en": "Makgeolli (Rice Wine)",
     "zh": "马格利米酒（Makgeolli）",
     "ja": "マッコリ",
     "vi": "Rượu gạo"
    },
    "price": 160000
   },
   {
    "name": {
     "ko": "과일막걸리",
     "en": "Fruit Makgeolli",
     "zh": "水果马格利米酒",
     "ja": "フルーツマッコリ",
     "vi": "Rượu gạo hoa quả"
    },
    "price": 150000
   },
   {
    "name": {
     "ko": "과일소주",
     "en": "Fruit Soju",
     "zh": "水果烧酒",
     "ja": "フルーツ焼酎",
     "vi": "Soju hoa quả"
    },
    "price": 150000
   },
   {
    "name": {
     "ko": "선양 오크",
     "en": "Sunyang Oak (Soju)",
     "zh": "鲜阳 Oak 烧酒",
     "ja": "ソンヤン オーク",
     "vi": "Sunyang Soju Oak"
    },
    "price": 150000
   },
   {
    "name": {
     "ko": "선양블루",
     "en": "Sunyang Blue (Soju)",
     "zh": "鲜阳 Blue 烧酒",
     "ja": "ソンヤン ブルー",
     "vi": "Sunyang Soju Blue"
    },
    "price": 130000
   },
   {
    "name": {
     "ko": "병맥주 (타이거)",
     "en": "Bottled Beer (Tiger)",
     "zh": "瓶装啤酒（虎牌）",
     "ja": "瓶ビール（タイガー）",
     "vi": "Bia chai Tiger"
    },
    "price": 50000
   },
   {
    "name": {
     "ko": "생맥주 (삿포로)",
     "en": "Draft Beer (Sapporo)",
     "zh": "生啤（札幌）",
     "ja": "生ビール（サッポロ）",
     "vi": "Bia tươi Sapporo"
    },
    "price": 60000
   }
  ]
 },
 {
  "id": "drink",
  "name": {
   "ko": "음료",
   "en": "Drinks",
   "zh": "饮料",
   "ja": "ドリンク",
   "vi": "Đồ uống"
  },
  "items": [
   {
    "name": {
     "ko": "스프라이트",
     "en": "Sprite",
     "zh": "雪碧",
     "ja": "スプライト",
     "vi": "Sprite"
    },
    "price": 30000
   },
   {
    "name": {
     "ko": "콜라",
     "en": "Coca-Cola",
     "zh": "可口可乐",
     "ja": "コーラ",
     "vi": "Coca-Cola"
    },
    "price": 30000
   },
   {
    "name": {
     "ko": "코카콜라 제로",
     "en": "Coca-Cola Zero",
     "zh": "零度可口可乐",
     "ja": "コカ・コーラ ゼロ",
     "vi": "Coca-Cola Zero"
    },
    "price": 30000
   },
   {
    "name": {
     "ko": "환타",
     "en": "Fanta",
     "zh": "芬达",
     "ja": "ファンタ",
     "vi": "Fanta"
    },
    "price": 30000
   },
   {
    "name": {
     "ko": "아침햇살",
     "en": "Morning Rice (Achim Haetsal Rice Drink)",
     "zh": "早晨阳光大米饮料（Achim Haetsal）",
     "ja": "朝の光（アチムヘッサル・米ドリンク）",
     "vi": "Nước gạo Morning Rice"
    },
    "price": 50000
   },
   {
    "name": {
     "ko": "알로에",
     "en": "Aloe Drink",
     "zh": "芦荟饮料",
     "ja": "アロエドリンク",
     "vi": "Nước nha đam"
    },
    "price": 50000
   }
  ]
 }
];
