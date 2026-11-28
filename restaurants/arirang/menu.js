// 아리랑 Arirang 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진 24장(수집기 2026-11-28, 책자판·유리창 포스터·점심 메뉴)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// 사진끼리 가격이 다르면 높은 쪽 — 점심·세트·삼계탕·냉면·BBQ 등, docs/todo.md 참고
window.RESTAURANT = {
  brand: { ko: "아리랑", en: "Arirang" },
  phone: "0968 736 465",
  address: "Liền Kề B02 Embassy Garden, Khu Ngoại giao đoàn, Xuân Đỉnh, Hà Nội",
  wifi: null,
  hours: "11:00 – 14:30 / 17:00 – 21:30",
};

window.MENU = [
 {
  "id": "set",
  "name": {
   "ko": "세트 메뉴",
   "en": "Set Menus",
   "zh": "套餐菜单",
   "ja": "セットメニュー",
   "vi": "Set menu"
  },
  "items": [
   {
    "name": {
     "ko": "A 소고기 세트 (눈꽃살·차돌박이·소갈비주물럭·우설구이·콘치즈 + 된장찌개 + 계란찜)",
     "en": "Beef Set (chuck flap tail, brisket, marinated beef rib, ox tongue, corn cheese + soybean stew + steamed egg)",
     "zh": "A 牛肉套餐（雪花牛肉·牛胸肉·腌牛排骨·烤牛舌·芝士玉米 + 大酱汤 + 蒸蛋）",
     "ja": "A 牛肉セット（雪花牛肉・牛バラ薄切り・味付けカルビ・牛タン焼き・コーンチーズ + テンジャンチゲ + 卵蒸し）",
     "vi": "Set thịt bò (lườn hoa, gầu bò, sườn bò ướp, lưỡi bò, ngô phô mai + canh tương + trứng hấp)"
    },
    "price": 1098000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "B 돼지고기 세트 (삼겹살·돼지목살·항정살·돼지불고기·계란말이 + 김치찌개 + 계란찜)",
     "en": "Pork Set (pork belly, collar, neck, pork bulgogi, egg roll + kimchi stew + steamed egg)",
     "zh": "B 猪肉套餐（五花肉·猪颈肉·猪颈脊肉·猪肉烤肉·鸡蛋卷 + 泡菜汤 + 蒸蛋）",
     "ja": "B 豚肉セット（サムギョプサル・豚首肉・豚トロ・豚プルコギ・卵焼き + キムチチゲ + 卵蒸し）",
     "vi": "Set thịt heo (ba chỉ, nạc vai, má heo, bulgogi heo, trứng cuộn + canh kim chi + trứng hấp)"
    },
    "price": 568000
   },
   {
    "name": {
     "ko": "C 소·돼지고기 세트 (소갈비주물럭·눈꽃살·삼겹살·항정살·잡채 + 순두부찌개 + 계란찜)",
     "en": "Beef & Pork Set (marinated beef rib, chuck flap tail, pork belly, pork neck, japchae + soft tofu stew + steamed egg)",
     "zh": "C 牛猪肉套餐（腌牛排骨·雪花牛肉·五花肉·猪颈脊肉·韩式炒粉丝 + 嫩豆腐汤 + 蒸蛋）",
     "ja": "C 牛・豚セット（味付けカルビ・雪花牛肉・サムギョプサル・豚トロ・チャプチェ + スンドゥブチゲ + 卵蒸し）",
     "vi": "Set bò & heo (sườn bò ướp, lườn hoa, ba chỉ, má heo, miến xào + canh đậu phụ non + trứng hấp)"
    },
    "price": 1038000
   },
   {
    "name": {
     "ko": "가족 세트 (눈꽃살·우설구이·돼지목살·항정살·삼겹살·돼지갈비찜·부대전골 + 김치전 + 계란찜)",
     "en": "Family Set (chuck flap tail, ox tongue, pork collar, neck, belly, braised pork ribs, army stew + kimchi pancake + steamed egg)",
     "zh": "家庭套餐（雪花牛肉·烤牛舌·猪颈肉·猪颈脊肉·五花肉·炖猪排骨·部队锅 + 泡菜煎饼 + 蒸蛋）",
     "ja": "ファミリーセット（雪花牛肉・牛タン焼き・豚首肉・豚トロ・サムギョプサル・豚カルビ煮・プデチゲ + キムチチヂミ + 卵蒸し）",
     "vi": "Set gia đình (lườn hoa, lưỡi bò, nạc vai, má heo, ba chỉ, sườn heo hầm, lẩu quân đội + bánh kim chi + trứng hấp)"
    },
    "price": 1698000
   }
  ]
 },
 {
  "id": "lunch",
  "name": {
   "ko": "점심 특선",
   "en": "Lunch Specials",
   "zh": "午餐特选·烤肉单人套餐",
   "ja": "ランチ特選・焼肉1人セット",
   "vi": "Set trưa"
  },
  "items": [
   {
    "name": {
     "ko": "돼지제육볶음 정식 (밥·계란후라이·미역국)",
     "en": "Spicy Stir-fried Pork Lunch Set (rice, fried egg, seaweed soup)",
     "zh": "辣炒猪肉套餐（米饭·煎蛋·海带汤）",
     "ja": "豚肉の辛味炒め定食（ご飯・目玉焼き・わかめスープ）",
     "vi": "Thịt heo xào cay + cơm + trứng ốp + canh rong biển"
    },
    "price": 105000,
    "spicy": true
   },
   {
    "name": {
     "ko": "소불고기 정식 (밥·계란후라이·미역국)",
     "en": "Beef Bulgogi Lunch Set (rice, fried egg, seaweed soup)",
     "zh": "牛肉烤肉套餐（米饭·煎蛋·海带汤）",
     "ja": "牛プルコギ定食（ご飯・目玉焼き・わかめスープ）",
     "vi": "Thịt bò xào + cơm + trứng ốp + canh rong biển"
    },
    "price": 160000
   },
   {
    "name": {
     "ko": "차돌된장찌개 + 밥",
     "en": "Soybean Paste Stew with Beef Brisket + Rice",
     "zh": "牛胸肉大酱汤 + 米饭",
     "ja": "牛バラ肉のテンジャンチゲ + ご飯",
     "vi": "Canh tương thịt bò + cơm"
    },
    "price": 100000
   },
   {
    "name": {
     "ko": "돼지김치찌개 + 밥",
     "en": "Kimchi Stew with Pork + Rice",
     "zh": "猪肉泡菜汤 + 米饭",
     "ja": "豚キムチチゲ + ご飯",
     "vi": "Canh kim chi thịt heo + cơm"
    },
    "price": 90000,
    "spicy": true
   },
   {
    "name": {
     "ko": "고등어구이 + 밥 + 미역국",
     "en": "Grilled Mackerel + Rice + Seaweed Soup",
     "zh": "烤青花鱼 + 米饭 + 海带汤",
     "ja": "焼きサバ + ご飯 + わかめスープ",
     "vi": "Cá thu nướng + cơm + canh rong biển"
    },
    "price": 108000,
    "photo": "img/godeungeo.jpg"
   },
   {
    "name": {
     "ko": "해물순두부찌개 + 밥",
     "en": "Seafood Soft Tofu Stew + Rice",
     "zh": "海鲜嫩豆腐汤 + 米饭",
     "ja": "海鮮スンドゥブチゲ + ご飯",
     "vi": "Canh đậu phụ non hải sản + cơm"
    },
    "price": 120000,
    "spicy": true
   },
   {
    "name": {
     "ko": "야채 비빔밥 + 미역국",
     "en": "Vegetable Bibimbap + Seaweed Soup",
     "zh": "蔬菜拌饭 + 海带汤",
     "ja": "野菜ビビンバ + わかめスープ",
     "vi": "Cơm trộn rau + canh rong biển"
    },
    "price": 95000
   },
   {
    "name": {
     "ko": "바비큐 1인 세트 · 소고기 (차돌박이 또는 양념부채살 + 계란찜·밥·미역국)",
     "en": "BBQ Set for One · Beef (brisket or marinated top blade + steamed egg, rice, seaweed soup)",
     "zh": "烤肉单人套餐 · 牛肉（牛胸肉或腌牛肩肉 + 蒸蛋·米饭·海带汤）",
     "ja": "焼肉1人セット · 牛肉（牛バラ薄切りまたは味付けトップブレード + 卵蒸し・ご飯・わかめスープ）",
     "vi": "Set nướng 1 người · Bò (gầu bò hoặc lõi vai ướp + trứng hấp, cơm, canh rong biển)"
    },
    "price": 258000
   },
   {
    "name": {
     "ko": "바비큐 1인 세트 · 돼지고기 (삼겹살·목살·뽈살 중 택1 + 계란찜·밥·미역국)",
     "en": "BBQ Set for One · Pork (pork belly, collar or cheek + steamed egg, rice, seaweed soup)",
     "zh": "烤肉单人套餐 · 猪肉（五花肉·猪颈肉·猪脸肉任选其一 + 蒸蛋·米饭·海带汤）",
     "ja": "焼肉1人セット · 豚肉（サムギョプサル・豚首肉・豚ほほ肉から1つ + 卵蒸し・ご飯・わかめスープ）",
     "vi": "Set nướng 1 người · Heo (ba chỉ, nạc vai hoặc má + trứng hấp, cơm, canh rong biển)"
    },
    "price": 178000
   }
  ]
 },
 {
  "id": "kimbap",
  "name": {
   "ko": "김밥 · 사리",
   "en": "Gimbap",
   "zh": "紫菜包饭·加料",
   "ja": "キンパ・追加トッピング",
   "vi": "Cơm cuộn"
  },
  "items": [
   {
    "name": {
     "ko": "아리랑 김밥 (점심특선 즉석 김밥)",
     "en": "Arirang Gimbap (lunch special)",
     "zh": "阿里郎紫菜包饭（午餐特选现做）",
     "ja": "アリラン キンパ（ランチ特選・できたて）",
     "vi": "Cơm cuộn Arirang (đặc biệt bữa trưa)"
    },
    "price": 65000,
    "tag": "best",
    "photo": "img/kimbap.jpg"
   },
   {
    "name": {
     "ko": "볶은 김치 김밥",
     "en": "Stir-fried Kimchi Gimbap",
     "zh": "炒泡菜紫菜包饭",
     "ja": "炒めキムチキンパ",
     "vi": "Cơm cuộn kim chi xào"
    },
    "price": 85000
   },
   {
    "name": {
     "ko": "제육 김밥",
     "en": "Spicy Pork Gimbap",
     "zh": "辣猪肉紫菜包饭",
     "ja": "豚肉の辛味炒めキンパ",
     "vi": "Cơm cuộn thịt heo cay"
    },
    "price": 95000,
    "spicy": true
   },
   {
    "name": {
     "ko": "소불고기 김밥",
     "en": "Beef Bulgogi Gimbap",
     "zh": "牛肉烤肉紫菜包饭",
     "ja": "牛プルコギキンパ",
     "vi": "Cơm cuộn thịt bò xào"
    },
    "price": 105000
   },
   {
    "name": {
     "ko": "아리랑 김밥 + 라면 세트 (매운맛/순한맛)",
     "en": "Gimbap + Ramen Set (spicy or mild)",
     "zh": "阿里郎紫菜包饭 + 拉面套餐（辣/不辣）",
     "ja": "アリランキンパ + ラーメンセット（辛口/普通）",
     "vi": "Cơm cuộn + mì (cay / không cay)"
    },
    "price": 140000
   },
   {
    "name": {
     "ko": "아리랑 김밥 + 칼칼떡볶이 세트",
     "en": "Gimbap + Spicy Tteokbokki Set",
     "zh": "阿里郎紫菜包饭 + 辣炒年糕套餐",
     "ja": "アリランキンパ + 辛口トッポッキセット",
     "vi": "Cơm cuộn + bánh gạo cay"
    },
    "price": 175000,
    "spicy": true
   },
   {
    "name": {
     "ko": "사리 추가 · 쌀떡",
     "en": "Add-on: Rice Cake",
     "zh": "加料 · 年糕条",
     "ja": "追加 · 餅（トック）",
     "vi": "Thêm: bánh gạo"
    },
    "price": 25000
   },
   {
    "name": {
     "ko": "사리 추가 · 슬라이스 치즈",
     "en": "Add-on: Sliced Cheese",
     "zh": "加料 · 芝士片",
     "ja": "追加 · スライスチーズ",
     "vi": "Thêm: phô mai lát"
    },
    "price": 12000
   },
   {
    "name": {
     "ko": "사리 추가 · 어묵",
     "en": "Add-on: Fish Cake",
     "zh": "加料 · 鱼饼",
     "ja": "追加 · おでん（練り物）",
     "vi": "Thêm: chả cá"
    },
    "price": 28000
   },
   {
    "name": {
     "ko": "사리 추가 · 순두부",
     "en": "Add-on: Soft Tofu",
     "zh": "加料 · 嫩豆腐",
     "ja": "追加 · 純豆腐",
     "vi": "Thêm: đậu phụ non"
    },
    "price": 17000
   }
  ]
 },
 {
  "id": "jeon",
  "name": {
   "ko": "전",
   "en": "Korean Pancakes",
   "zh": "煎饼",
   "ja": "チヂミ・チョン",
   "vi": "Bánh kếp"
  },
  "items": [
   {
    "name": {
     "ko": "해물파전",
     "en": "Seafood & Green Onion Pancake",
     "zh": "海鲜葱饼",
     "ja": "海鮮チヂミ（パジョン）",
     "vi": "Bánh kếp hải sản"
    },
    "price": 258000,
    "photo": "img/jeon.jpg"
   },
   {
    "name": {
     "ko": "소고기육전",
     "en": "Pan-fried Battered Beef",
     "zh": "牛肉煎饼",
     "ja": "ユクチョン（牛肉のピカタ風焼き）",
     "vi": "Bánh kếp thịt bò"
    },
    "price": 228000
   },
   {
    "name": {
     "ko": "모듬전",
     "en": "Assorted Korean Pancakes",
     "zh": "什锦煎饼",
     "ja": "チョンの盛り合わせ",
     "vi": "Bánh kếp tổng hợp"
    },
    "price": 398000
   },
   {
    "name": {
     "ko": "김치전",
     "en": "Kimchi Pancake",
     "zh": "泡菜煎饼",
     "ja": "キムチチヂミ",
     "vi": "Bánh kếp kim chi"
    },
    "price": 188000,
    "spicy": true
   },
   {
    "name": {
     "ko": "치즈김치전",
     "en": "Kimchi Pancake with Cheese",
     "zh": "芝士泡菜煎饼",
     "ja": "チーズキムチチヂミ",
     "vi": "Bánh kếp kim chi phô mai"
    },
    "price": 258000,
    "spicy": true
   },
   {
    "name": {
     "ko": "치즈감자전 (반숙 계란)",
     "en": "Cheese Potato Pancake with Soft-cooked Egg",
     "zh": "芝士土豆煎饼（半熟蛋）",
     "ja": "チーズじゃがいもチヂミ（半熟卵）",
     "vi": "Bánh kếp khoai tây phô mai & trứng ốp"
    },
    "price": 258000
   }
  ]
 },
 {
  "id": "bokkeum",
  "name": {
   "ko": "볶음",
   "en": "Stir-fries",
   "zh": "炒菜",
   "ja": "炒め物",
   "vi": "Món xào"
  },
  "items": [
   {
    "name": {
     "ko": "돼지제육볶음",
     "en": "Spicy Stir-fried Pork",
     "zh": "辣炒猪肉",
     "ja": "豚肉の辛味炒め（チェユクポックム）",
     "vi": "Thịt heo xào cay"
    },
    "price": 238000,
    "spicy": true
   },
   {
    "name": {
     "ko": "쭈꾸미볶음",
     "en": "Spicy Stir-fried Webfoot Octopus & Vegetables",
     "zh": "辣炒小章鱼",
     "ja": "チュクミ炒め（イイダコの辛味炒め）",
     "vi": "Bạch tuộc xào cay"
    },
    "price": 328000,
    "spicy": true
   },
   {
    "name": {
     "ko": "쭈삼불고기",
     "en": "Spicy Stir-fried Webfoot Octopus & Pork",
     "zh": "小章鱼五花肉烤肉",
     "ja": "チュクミと豚肉のプルコギ",
     "vi": "Ba chỉ xào bạch tuộc cay"
    },
    "price": 308000,
    "spicy": true
   },
   {
    "name": {
     "ko": "두부김치",
     "en": "Stir-fried Kimchi & Pork with Boiled Tofu",
     "zh": "豆腐泡菜",
     "ja": "豆腐キムチ（茹で豆腐と豚キムチ炒め）",
     "vi": "Đậu phụ kim chi xào thịt heo"
    },
    "price": 288000
   }
  ]
 },
 {
  "id": "jeongol",
  "name": {
   "ko": "전골",
   "en": "Hot Pots",
   "zh": "火锅",
   "ja": "鍋料理",
   "vi": "Lẩu"
  },
  "items": [
   {
    "name": {
     "ko": "손만두버섯전골 (순한맛/매운맛)",
     "en": "Homemade Dumpling & Mushroom Hot Pot (mild or spicy)",
     "zh": "手工饺子蘑菇火锅（不辣/辣）",
     "ja": "手作り餃子ときのこの鍋（普通/辛口）",
     "vi": "Lẩu nấm há cảo (cay / không cay)"
    },
    "price": 588000
   },
   {
    "name": {
     "ko": "해물전골",
     "en": "Seafood Hot Pot",
     "zh": "海鲜火锅",
     "ja": "海鮮鍋",
     "vi": "Lẩu hải sản cay"
    },
    "sizes": [
     [
      "S",
      648000
     ],
     [
      "L",
      748000
     ]
    ],
    "spicy": true
   },
   {
    "name": {
     "ko": "서울식 불고기 전골",
     "en": "Seoul-style Beef Bulgogi Hot Pot",
     "zh": "首尔式牛肉烤肉火锅",
     "ja": "ソウル式牛プルコギ鍋",
     "vi": "Lẩu bulgogi bò kiểu Seoul"
    },
    "sizes": [
     [
      "S",
      548000
     ],
     [
      "L",
      648000
     ]
    ]
   },
   {
    "name": {
     "ko": "돼지김치전골",
     "en": "Kimchi & Pork Hot Pot",
     "zh": "猪肉泡菜火锅",
     "ja": "豚キムチ鍋",
     "vi": "Lẩu kim chi thịt heo"
    },
    "sizes": [
     [
      "S",
      488000
     ],
     [
      "L",
      588000
     ]
    ],
    "spicy": true
   },
   {
    "name": {
     "ko": "갈비전골 (1인분, 2인분부터 주문, 순한맛/매운맛)",
     "en": "Beef Short Rib Hot Pot (per portion, min. 2 portions, mild or spicy)",
     "zh": "排骨火锅（每份，2份起点，不辣/辣）",
     "ja": "カルビ鍋（1人前、2人前から注文、普通/辛口）",
     "vi": "Lẩu sườn bò (1 phần, đặt từ 2 phần, cay / không cay)"
    },
    "price": 388000
   },
   {
    "name": {
     "ko": "부대전골 (소시지·돼지고기·김치)",
     "en": "Army Stew (sausage, pork & kimchi)",
     "zh": "部队锅（香肠·猪肉·泡菜）",
     "ja": "プデチゲ（ソーセージ・豚肉・キムチ）",
     "vi": "Lẩu quân đội Hàn Quốc cay"
    },
    "sizes": [
     [
      "S",
      498000
     ],
     [
      "L",
      598000
     ]
    ],
    "spicy": true
   },
   {
    "name": {
     "ko": "감자탕",
     "en": "Pork Backbone Stew",
     "zh": "猪脊骨土豆汤",
     "ja": "カムジャタン（豚背骨スープ）",
     "vi": "Canh xương heo (gamjatang) cay"
    },
    "sizes": [
     [
      "S",
      548000
     ],
     [
      "L",
      648000
     ]
    ],
    "spicy": true
   },
   {
    "name": {
     "ko": "소곱창전골",
     "en": "Beef Intestine Hot Pot",
     "zh": "牛小肠火锅",
     "ja": "牛ホルモン鍋（ソコプチャンジョンゴル）",
     "vi": "Lẩu lòng non bò"
    },
    "price": 538000
   }
  ]
 },
 {
  "id": "bbq",
  "name": {
   "ko": "바비큐",
   "en": "BBQ",
   "zh": "烤肉",
   "ja": "焼肉",
   "vi": "Thịt nướng"
  },
  "items": [
   {
    "name": {
     "ko": "소갈비살",
     "en": "Boneless Beef Rib",
     "zh": "无骨牛排骨肉",
     "ja": "骨なしカルビ",
     "vi": "Sườn bò không xương"
    },
    "price": 358000
   },
   {
    "name": {
     "ko": "눈꽃살",
     "en": "Premium Chuck Flap Tail",
     "zh": "雪花牛肉",
     "ja": "雪花牛肉（ヌンコッサル）",
     "vi": "Lườn hoa"
    },
    "price": 648000,
    "tag": "best"
   },
   {
    "name": {
     "ko": "한우 부채살",
     "en": "Korean Beef Top Blade",
     "zh": "韩牛肩胛肉",
     "ja": "韓牛トップブレード",
     "vi": "Lõi vai bò Hàn Quốc"
    },
    "price": 798000
   },
   {
    "name": {
     "ko": "장어 (500g/1kg)",
     "en": "Eel (500g / 1kg)",
     "zh": "鳗鱼（500g/1kg）",
     "ja": "うなぎ（500g/1kg）",
     "vi": "Lươn (500g / 1kg)"
    },
    "sizes": [
     [
      "500g",
      678000
     ],
     [
      "1kg",
      1188000
     ]
    ]
   },
   {
    "name": {
     "ko": "소갈비주물럭",
     "en": "Marinated Boneless Beef Rib",
     "zh": "腌无骨牛排骨肉",
     "ja": "味付け骨なしカルビ（ジュムルク）",
     "vi": "Sườn bò ướp không xương"
    },
    "price": 358000
   },
   {
    "name": {
     "ko": "소양념갈비",
     "en": "Marinated Beef Ribs (bone-in)",
     "zh": "腌牛排骨（带骨）",
     "ja": "味付け牛カルビ（骨付き）",
     "vi": "Sườn bò ướp"
    },
    "price": 498000
   },
   {
    "name": {
     "ko": "차돌박이",
     "en": "Beef Brisket",
     "zh": "牛胸肉",
     "ja": "牛バラ薄切り（チャドルバギ）",
     "vi": "Gầu bò"
    },
    "price": 288000
   },
   {
    "name": {
     "ko": "소곱창 & 대창",
     "en": "Beef Small & Large Intestine",
     "zh": "牛小肠与大肠",
     "ja": "牛小腸・大腸（コプチャン＆テチャン）",
     "vi": "Lòng non & lòng già bò"
    },
    "price": 498000
   },
   {
    "name": {
     "ko": "우설구이",
     "en": "Grilled Ox Tongue",
     "zh": "烤牛舌",
     "ja": "牛タン焼き",
     "vi": "Lưỡi bò nướng"
    },
    "price": 198000
   },
   {
    "name": {
     "ko": "돼지 모듬 특수부위 (목덜미·가브리·뽈)",
     "en": "Assorted Special Pork Cuts (collar, rib-cap, cheek)",
     "zh": "什锦猪特殊部位（猪颈肉·肋眼盖·脸颊肉）",
     "ja": "豚特殊部位盛り合わせ（首肉・カブリ・ほほ肉）",
     "vi": "Thập cẩm heo đặc biệt (thịt vai, má, gáy)"
    },
    "price": 238000
   },
   {
    "name": {
     "ko": "칼삼겹살",
     "en": "Thick-cut Pork Belly",
     "zh": "厚切五花肉",
     "ja": "厚切りサムギョプサル",
     "vi": "Ba chỉ hoa dày"
    },
    "price": 218000
   },
   {
    "name": {
     "ko": "돼지양념갈비",
     "en": "Marinated Pork Spare Ribs",
     "zh": "腌猪排骨",
     "ja": "味付け豚カルビ",
     "vi": "Sườn heo ướp"
    },
    "price": 238000
   },
   {
    "name": {
     "ko": "냉동꽃삼겹살",
     "en": "Frozen Flower Pork Belly",
     "zh": "冷冻花五花肉",
     "ja": "冷凍花サムギョプサル",
     "vi": "Ba chỉ hoa đông lạnh"
    },
    "price": 198000
   },
   {
    "name": {
     "ko": "돼지항정살",
     "en": "Pork Neck",
     "zh": "猪颈脊肉",
     "ja": "豚トロ",
     "vi": "Má heo"
    },
    "price": 238000
   }
  ]
 },
 {
  "id": "anju",
  "name": {
   "ko": "안주",
   "en": "Bar Snacks",
   "zh": "下酒菜",
   "ja": "おつまみ",
   "vi": "Món nhắm"
  },
  "items": [
   {
    "name": {
     "ko": "고갈비",
     "en": "Grilled Mackerel with Spicy Sauce",
     "zh": "辣烤青花鱼",
     "ja": "辛口焼きサバ（コガルビ）",
     "vi": "Cá thu nướng cay"
    },
    "price": 328000,
    "spicy": true
   },
   {
    "name": {
     "ko": "꼬치어묵탕",
     "en": "Fish Cake Skewer Soup",
     "zh": "鱼饼串汤",
     "ja": "おでん串スープ",
     "vi": "Canh chả cá xiên que"
    },
    "price": 288000
   },
   {
    "name": {
     "ko": "무뼈닭발볶음",
     "en": "Spicy Stir-fried Boneless Chicken Feet",
     "zh": "无骨辣炒鸡爪",
     "ja": "骨なし鶏足の辛味炒め",
     "vi": "Chân gà rút xương xào cay"
    },
    "price": 238000,
    "spicy": true
   },
   {
    "name": {
     "ko": "스팸 & 반숙계란후라이",
     "en": "Pan-fried Spam & Half-cooked Fried Eggs",
     "zh": "煎午餐肉与半熟煎蛋",
     "ja": "スパム焼きと半熟目玉焼き",
     "vi": "Thịt nguội chiên & trứng ốp la"
    },
    "price": 218000
   },
   {
    "name": {
     "ko": "우삼겹숙주볶음",
     "en": "Stir-fried Beef Brisket & Mung Bean Sprouts",
     "zh": "牛五花炒豆芽",
     "ja": "牛バラ肉ともやしの炒め",
     "vi": "Ba chỉ bò xào giá đỗ"
    },
    "price": 238000
   },
   {
    "name": {
     "ko": "콘치즈",
     "en": "Corn Cheese",
     "zh": "芝士玉米",
     "ja": "コーンチーズ",
     "vi": "Ngô xào phô mai"
    },
    "price": 118000
   },
   {
    "name": {
     "ko": "블랙타이거 생새우회 (1kg, 하루 전 예약)",
     "en": "Black Tiger Raw Shrimp Sashimi (1kg, order a day ahead)",
     "zh": "黑虎虾刺身（1kg，需提前一天预订）",
     "ja": "ブラックタイガー生エビ刺身（1kg、前日予約）",
     "vi": "Gỏi tôm sú sống (1kg, đặt trước 1 ngày)"
    },
    "price": 1098000
   },
   {
    "name": {
     "ko": "단팥아이스홍시",
     "en": "Iced Soft Persimmon with Sweet Red Bean",
     "zh": "红豆冰软柿",
     "ja": "あずき入りアイス熟し柿",
     "vi": "Chè đậu đỏ với hồng lạnh"
    },
    "price": 208000
   },
   {
    "name": {
     "ko": "생오이 & 쌈장",
     "en": "Fresh Cucumber & Ssamjang",
     "zh": "新鲜黄瓜配大酱",
     "ja": "生きゅうりとサムジャン",
     "vi": "Dưa chuột tươi với tương ssamjang"
    },
    "price": 58000
   }
  ]
 },
 {
  "id": "chicken",
  "name": {
   "ko": "치킨",
   "en": "Fried Chicken",
   "zh": "炸鸡",
   "ja": "チキン",
   "vi": "Gà rán"
  },
  "items": [
   {
    "name": {
     "ko": "후라이드 치킨",
     "en": "Fried Chicken",
     "zh": "炸鸡",
     "ja": "フライドチキン",
     "vi": "Gà rán"
    },
    "sizes": [
     [
      "1",
      328000
     ],
     [
      "1/2",
      188000
     ]
    ]
   },
   {
    "name": {
     "ko": "양념 치킨",
     "en": "Sweet Chili Fried Chicken",
     "zh": "甜辣炸鸡",
     "ja": "ヤンニョムチキン",
     "vi": "Gà rán sốt cay ngọt"
    },
    "sizes": [
     [
      "1",
      348000
     ],
     [
      "1/2",
      198000
     ]
    ],
    "tag": "best",
    "photo": "img/yangnyeom.jpg"
   },
   {
    "name": {
     "ko": "간장 치킨",
     "en": "Soy Garlic Fried Chicken",
     "zh": "酱油炸鸡",
     "ja": "醤油チキン",
     "vi": "Gà sốt xì dầu"
    },
    "sizes": [
     [
      "1",
      348000
     ],
     [
      "1/2",
      198000
     ]
    ]
   },
   {
    "name": {
     "ko": "반반 치킨 (후라이드 + 양념)",
     "en": "Half & Half Chicken (fried + sweet chili)",
     "zh": "半半炸鸡（原味 + 甜辣）",
     "ja": "ハーフ＆ハーフチキン（プレーン + ヤンニョム）",
     "vi": "Gà rán nửa truyền thống nửa sốt cay ngọt"
    },
    "price": 348000
   },
   {
    "name": {
     "ko": "순살 후라이드 치킨",
     "en": "Boneless Fried Chicken",
     "zh": "无骨炸鸡",
     "ja": "骨なしフライドチキン",
     "vi": "Gà rán không xương"
    },
    "sizes": [
     [
      "1",
      368000
     ],
     [
      "1/2",
      198000
     ]
    ]
   },
   {
    "name": {
     "ko": "순살 닭강정",
     "en": "Boneless Chicken Gangjeong in Hot Chili Sauce",
     "zh": "无骨韩式甜辣炸鸡",
     "ja": "骨なしタッカンジョン",
     "vi": "Gà rán không xương sốt cay"
    },
    "sizes": [
     [
      "1",
      388000
     ],
     [
      "1/2",
      218000
     ]
    ],
    "spicy": true
   },
   {
    "name": {
     "ko": "순살 허니아몬드 치킨",
     "en": "Boneless Honey Almond Chicken",
     "zh": "无骨蜂蜜杏仁炸鸡",
     "ja": "骨なしハニーアーモンドチキン",
     "vi": "Gà rán không xương sốt hạnh nhân mật ong"
    },
    "sizes": [
     [
      "1",
      398000
     ],
     [
      "1/2",
      228000
     ]
    ]
   }
  ]
 },
 {
  "id": "side",
  "name": {
   "ko": "사이드",
   "en": "Sides",
   "zh": "小菜·配菜",
   "ja": "サイドメニュー",
   "vi": "Món ăn kèm"
  },
  "items": [
   {
    "name": {
     "ko": "손만두 지짐이 (8개)",
     "en": "Pan-fried Homemade Dumplings (8 pcs)",
     "zh": "手工煎饺（8个）",
     "ja": "手作り焼き餃子（8個）",
     "vi": "Há cảo chiên (8 cái)"
    },
    "price": 168000,
    "photo": "img/mandu.jpg"
   },
   {
    "name": {
     "ko": "칼칼떡볶이",
     "en": "Spicy Rice Cakes & Fish Cakes",
     "zh": "辣炒年糕",
     "ja": "辛口トッポッキ",
     "vi": "Bánh gạo cay & chả cá"
    },
    "price": 198000,
    "spicy": true
   },
   {
    "name": {
     "ko": "왕계란말이",
     "en": "Giant Rolled Omelette",
     "zh": "特大鸡蛋卷",
     "ja": "特大だし巻き卵（ケランマリ）",
     "vi": "Trứng cuộn cỡ lớn"
    },
    "price": 188000
   },
   {
    "name": {
     "ko": "칼칼치즈떡볶이",
     "en": "Spicy Rice Cakes & Fish Cakes with Cheese",
     "zh": "芝士辣炒年糕",
     "ja": "チーズ辛口トッポッキ",
     "vi": "Bánh gạo phô mai cay"
    },
    "price": 268000,
    "spicy": true,
    "photo": "img/cheesetteok.jpg"
   },
   {
    "name": {
     "ko": "계란찜",
     "en": "Steamed Egg",
     "zh": "蒸蛋",
     "ja": "卵蒸し（ケランチム）",
     "vi": "Trứng hấp"
    },
    "price": 80000,
    "photo": "img/gyeran.jpg"
   },
   {
    "name": {
     "ko": "순살 대구튀김",
     "en": "Fried Boneless Cod",
     "zh": "无骨炸鳕鱼",
     "ja": "骨なし鱈の揚げ物",
     "vi": "Cá chiên không xương"
    },
    "price": 278000
   },
   {
    "name": {
     "ko": "솥밥 추가",
     "en": "Extra Rice in Cast-iron Pot",
     "zh": "加石锅饭",
     "ja": "釜飯の追加",
     "vi": "Thêm cơm niêu"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "칼국수 사리",
     "en": "Extra Noodles (kalguksu)",
     "zh": "加刀削面",
     "ja": "カルグクスの麺追加",
     "vi": "Thêm mì gạo"
    },
    "price": 30000
   },
   {
    "name": {
     "ko": "공기밥",
     "en": "Bowl of Rice",
     "zh": "米饭",
     "ja": "ご飯（茶碗）",
     "vi": "Cơm (bát)"
    },
    "price": 20000
   },
   {
    "name": {
     "ko": "라면 사리",
     "en": "Extra Instant Noodles",
     "zh": "加拉面",
     "ja": "ラーメン追加",
     "vi": "Thêm mì tôm"
    },
    "price": 25000
   },
   {
    "name": {
     "ko": "볶음밥 (전골·찜 주문 시)",
     "en": "Fried Rice (with hot pot or braised dish)",
     "zh": "炒饭（点火锅或炖菜时）",
     "ja": "チャーハン（鍋・蒸し料理注文時）",
     "vi": "Cơm rang (khi gọi lẩu hoặc món hấp)"
    },
    "price": 45000
   }
  ]
 },
 {
  "id": "meal",
  "name": {
   "ko": "식사",
   "en": "Rice & Noodles",
   "zh": "主食",
   "ja": "食事",
   "vi": "Cơm & mì"
  },
  "items": [
   {
    "name": {
     "ko": "한방삼계탕",
     "en": "Ginseng Chicken Soup with Herbs",
     "zh": "药膳参鸡汤",
     "ja": "薬膳参鶏湯",
     "vi": "Gà hầm sâm"
    },
    "sizes": [
     [
      "1",
      298000
     ],
     [
      "1/2",
      198000
     ]
    ]
   },
   {
    "name": {
     "ko": "자장면",
     "en": "Noodles with Black Bean Sauce",
     "zh": "炸酱面",
     "ja": "ジャジャン麺",
     "vi": "Mì tương đen"
    },
    "price": 128000
   },
   {
    "name": {
     "ko": "김치볶음밥",
     "en": "Kimchi Fried Rice",
     "zh": "泡菜炒饭",
     "ja": "キムチチャーハン",
     "vi": "Cơm rang kim chi"
    },
    "price": 148000,
    "spicy": true
   },
   {
    "name": {
     "ko": "물회",
     "en": "Cold Raw Fish Soup",
     "zh": "韩式冷生鱼片汤（물회）",
     "ja": "ムルフェ（冷たい刺身スープ）",
     "vi": "Gỏi cá trộn nước lạnh"
    },
    "price": 328000
   },
   {
    "name": {
     "ko": "자장볶음밥",
     "en": "Fried Rice with Black Bean Sauce",
     "zh": "炸酱炒饭",
     "ja": "ジャジャンチャーハン",
     "vi": "Cơm rang tương đen"
    },
    "price": 148000
   },
   {
    "name": {
     "ko": "물/비빔냉면",
     "en": "Buckwheat Noodles in Cold Broth / Spicy Mixed Buckwheat Noodles",
     "zh": "冷面/拌冷面",
     "ja": "水冷麺/ビビン冷麺",
     "vi": "Mì lạnh / mì trộn cay"
    },
    "price": 158000,
    "spicy": true
   },
   {
    "name": {
     "ko": "잔치/비빔국수",
     "en": "Noodles in Hot Broth / Spicy Mixed Noodles",
     "zh": "韩式汤面（宴会面）/拌面",
     "ja": "チャンチ麺（温麺）/ビビン麺",
     "vi": "Mì sợi nước / mì sợi trộn cay"
    },
    "price": 158000,
    "spicy": true
   }
  ]
 },
 {
  "id": "pot",
  "name": {
   "ko": "솥밥",
   "en": "Cast-iron Pot Rice",
   "zh": "石锅饭",
   "ja": "釜飯",
   "vi": "Cơm niêu"
  },
  "items": [
   {
    "name": {
     "ko": "소고기스테이크 솥밥",
     "en": "Beef Steak Rice in Cast-iron Pot",
     "zh": "牛排石锅饭",
     "ja": "ビーフステーキ釜飯",
     "vi": "Cơm niêu bò bít tết"
    },
    "price": 308000
   },
   {
    "name": {
     "ko": "연어 솥밥",
     "en": "Salmon Steak Rice in Cast-iron Pot",
     "zh": "三文鱼石锅饭",
     "ja": "サーモン釜飯",
     "vi": "Cơm niêu cá hồi nướng"
    },
    "price": 298000
   },
   {
    "name": {
     "ko": "장어 솥밥",
     "en": "Eel Rice in Cast-iron Pot",
     "zh": "鳗鱼石锅饭",
     "ja": "うなぎ釜飯",
     "vi": "Cơm niêu lươn"
    },
    "price": 328000
   },
   {
    "name": {
     "ko": "돼지제육볶음 솥밥",
     "en": "Spicy Stir-fried Pork Rice in Cast-iron Pot",
     "zh": "辣炒猪肉石锅饭",
     "ja": "豚肉の辛味炒め釜飯",
     "vi": "Cơm niêu thịt heo xào cay"
    },
    "price": 188000,
    "spicy": true
   },
   {
    "name": {
     "ko": "소불고기 솥밥",
     "en": "Beef Bulgogi Rice in Cast-iron Pot",
     "zh": "牛肉烤肉石锅饭",
     "ja": "牛プルコギ釜飯",
     "vi": "Cơm niêu thịt bò xào"
    },
    "price": 208000
   },
   {
    "name": {
     "ko": "육개장 솥밥",
     "en": "Spicy Beef Soup with Rice in Cast-iron Pot",
     "zh": "辣牛肉汤石锅饭",
     "ja": "ユッケジャン釜飯",
     "vi": "Cơm niêu canh bò cay (yukgaejang)"
    },
    "price": 188000,
    "spicy": true
   },
   {
    "name": {
     "ko": "갈비탕 솥밥",
     "en": "Beef Short Rib Soup with Rice in Cast-iron Pot",
     "zh": "排骨汤石锅饭",
     "ja": "カルビタン釜飯",
     "vi": "Cơm niêu canh sườn bò"
    },
    "price": 248000
   },
   {
    "name": {
     "ko": "전복소고기미역국 솥밥",
     "en": "Seaweed Soup with Abalone & Beef, Rice in Cast-iron Pot",
     "zh": "鲍鱼牛肉海带汤石锅饭",
     "ja": "あわびと牛肉のわかめスープ釜飯",
     "vi": "Cơm niêu canh rong biển thịt bò bào ngư"
    },
    "price": 198000
   },
   {
    "name": {
     "ko": "설렁탕 솥밥",
     "en": "Ox Bone Soup with Beef, Rice in Cast-iron Pot",
     "zh": "雪浓汤石锅饭",
     "ja": "ソルロンタン釜飯",
     "vi": "Cơm niêu canh xương bò"
    },
    "price": 188000
   },
   {
    "name": {
     "ko": "순대국 솥밥",
     "en": "Korean Sausage Soup with Pork Head Meat, Rice in Cast-iron Pot",
     "zh": "血肠汤石锅饭",
     "ja": "スンデクッ釜飯",
     "vi": "Cơm niêu canh lòng heo"
    },
    "price": 188000
   },
   {
    "name": {
     "ko": "전복 솥밥",
     "en": "Braised Abalone Rice in Cast-iron Pot",
     "zh": "鲍鱼石锅饭",
     "ja": "あわび釜飯",
     "vi": "Cơm niêu bào ngư"
    },
    "price": 308000
   },
   {
    "name": {
     "ko": "돼지김치찌개 솥밥",
     "en": "Kimchi Stew with Pork, Rice in Cast-iron Pot",
     "zh": "猪肉泡菜汤石锅饭",
     "ja": "豚キムチチゲ釜飯",
     "vi": "Cơm niêu canh kim chi"
    },
    "price": 138000,
    "spicy": true
   },
   {
    "name": {
     "ko": "차돌된장찌개 솥밥",
     "en": "Soybean Paste Stew with Beef Brisket, Rice in Cast-iron Pot",
     "zh": "牛胸肉大酱汤石锅饭",
     "ja": "牛バラ肉テンジャンチゲ釜飯",
     "vi": "Cơm niêu canh tương thịt bò"
    },
    "price": 158000
   },
   {
    "name": {
     "ko": "해물순두부 솥밥",
     "en": "Seafood Soft Tofu Stew, Rice in Cast-iron Pot",
     "zh": "海鲜嫩豆腐石锅饭",
     "ja": "海鮮スンドゥブ釜飯",
     "vi": "Cơm niêu canh đậu phụ non hải sản"
    },
    "price": 198000,
    "spicy": true
   },
   {
    "name": {
     "ko": "고등어구이 솥밥",
     "en": "Grilled Mackerel Rice in Cast-iron Pot",
     "zh": "烤青花鱼石锅饭",
     "ja": "焼きサバ釜飯",
     "vi": "Cơm niêu cá thu nướng"
    },
    "price": 248000
   },
   {
    "name": {
     "ko": "돌솥 비빔밥",
     "en": "Bibimbap in Hot Stone Pot",
     "zh": "石锅拌饭",
     "ja": "石焼きビビンバ",
     "vi": "Cơm trộn bát đá"
    },
    "price": 148000
   }
  ]
 },
 {
  "id": "drink",
  "name": {
   "ko": "주류 · 음료",
   "en": "Drinks",
   "zh": "酒水·饮料",
   "ja": "お酒・ドリンク",
   "vi": "Đồ uống"
  },
  "items": [
   {
    "name": {
     "ko": "소주",
     "en": "Soju",
     "zh": "烧酒",
     "ja": "焼酎",
     "vi": "Rượu soju"
    },
    "price": 140000
   },
   {
    "name": {
     "ko": "막걸리",
     "en": "Makgeolli (rice wine)",
     "zh": "马格利",
     "ja": "マッコリ",
     "vi": "Rượu gạo"
    },
    "price": 180000
   },
   {
    "name": {
     "ko": "생맥주 하이네켄",
     "en": "Draft Beer Heineken",
     "zh": "喜力生啤",
     "ja": "生ビール ハイネケン",
     "vi": "Bia tươi Heineken"
    },
    "price": 60000
   },
   {
    "name": {
     "ko": "생맥주 타이거",
     "en": "Draft Beer Tiger",
     "zh": "虎牌生啤",
     "ja": "生ビール タイガー",
     "vi": "Bia tươi Tiger"
    },
    "price": 70000
   },
   {
    "name": {
     "ko": "하이볼",
     "en": "Highball",
     "zh": "高球鸡尾酒",
     "ja": "ハイボール",
     "vi": "Highball"
    },
    "price": 100000
   },
   {
    "name": {
     "ko": "병맥주 하이네켄/타이거",
     "en": "Bottled Beer Heineken / Tiger",
     "zh": "瓶装啤酒 喜力/虎牌",
     "ja": "瓶ビール ハイネケン/タイガー",
     "vi": "Bia chai Heineken / Tiger"
    },
    "price": 50000
   },
   {
    "name": {
     "ko": "병맥주 하노이",
     "en": "Bottled Beer Hanoi",
     "zh": "瓶装啤酒 河内",
     "ja": "瓶ビール ハノイ",
     "vi": "Bia chai Hà Nội"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "병맥주 사이공",
     "en": "Bottled Beer Saigon",
     "zh": "瓶装啤酒 西贡",
     "ja": "瓶ビール サイゴン",
     "vi": "Bia chai Sài Gòn"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "소맥타워 (소주 360ml + 타이거 1,320ml)",
     "en": "Soju & Beer Tower (Soju 360ml + Tiger 1,320ml)",
     "zh": "烧啤塔（烧酒 360ml + 虎牌 1,320ml）",
     "ja": "ソメクタワー（焼酎 360ml + タイガー 1,320ml）",
     "vi": "Tháp bia (Soju 360ml + Tiger 1.320ml)"
    },
    "price": 310000
   },
   {
    "name": {
     "ko": "콜라/펩시/스프라이트/트위스터",
     "en": "Coca / Pepsi / Sprite / Twister",
     "zh": "可乐/百事/雪碧/Twister",
     "ja": "コーラ/ペプシ/スプライト/トゥイスター",
     "vi": "Coca / Pepsi / Sprite / Twister"
    },
    "price": 30000
   },
   {
    "name": {
     "ko": "한국 캔음료",
     "en": "Korean Canned Drinks",
     "zh": "韩国罐装饮料",
     "ja": "韓国缶ドリンク",
     "vi": "Nước ngọt Hàn Quốc"
    },
    "price": 50000
   },
   {
    "name": {
     "ko": "녹차/홍차",
     "en": "Green / Black Tea",
     "zh": "绿茶/红茶",
     "ja": "緑茶/紅茶",
     "vi": "Trà xanh / Hồng trà"
    },
    "price": 35000
   },
   {
    "name": {
     "ko": "아이스레몬티",
     "en": "Iced Lemon Tea",
     "zh": "冰柠檬茶",
     "ja": "アイスレモンティー",
     "vi": "Trà chanh"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "미네랄워터",
     "en": "Mineral Water",
     "zh": "矿泉水",
     "ja": "ミネラルウォーター",
     "vi": "Nước khoáng"
    },
    "price": 10000
   }
  ]
 }
];
