// 상디에고 피자 & 그릴 Sang Diego Pizza & Grill (25 Lê Thái Tổ, Võ Cường, Bắc Ninh) 메뉴 데이터 — 피자·스테이크·파스타
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND — 메뉴판에 '8% VAT 별도(Giá chưa bao gồm VAT)'라고 적혀 있음
// 원본: 구글 드라이브 "QR메뉴판/sang diego pizza"(사진 수집기 v1.7, 사진 125장: 메뉴판 36·음식 87·매장 2, 전부 손님 사진).
// 메뉴판이 시기별로 여러 버전(menu_01~36)이라 같은 메뉴 가격이 다름 → 높은 쪽(보통 최신)을 썼다. 운영 감찰관(Claude Sonnet)이 사진 대조 완료. 베이컨 치즈 버거 110,000은 사진이 흐려 118,000일 수도 있음(docs/todo.md).
// 항목 사진은 요리가 확실한 6장만(BBQ 플래터·티본·마르게리타 치즈 피자·해산물 알리오 올리오·클럽 샌드위치·BBQ 윙). 맨 위는 정문 간판 사진(store_02).
window.RESTAURANT = {
  brand: { ko: "상디에고 피자 & 그릴", en: "Sang Diego Pizza & Grill", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "02227300068",
  address: "25 Lê Thái Tổ, Võ Cường, Bắc Ninh",
  mapQuery: "Sang Diego Pizza & Grill Bắc Ninh 25 Lê Thái Tổ",
  mapUrl: "https://www.google.com/maps/place/Sang+Diego+Pizza+%26+Grill+B%E1%BA%AFc+Ninh/@21.1713814,106.0600854,21z",
  wifi: null,
  hours: "08:00 – 22:00", // 캡틴이 알려 준 시간(2026-11-20), 구글 지도 미확인
};

window.MENU = [
 {
  "id": "platter",
  "name": {
   "ko": "플래터",
   "en": "Platters",
   "zh": "拼盘",
   "ja": "プラッター",
   "vi": "Khay combo (Platters)"
  },
  "note": {
   "ko": "메뉴 가격은 8% 부가세(VAT) 별도예요.",
   "en": "Prices exclude 8% VAT.",
   "zh": "菜品价格不含8%增值税(VAT)。",
   "ja": "メニュー価格は8%の付加価値税(VAT)別です。",
   "vi": "Giá món chưa bao gồm 8% VAT."
  },
  "items": [
   {
    "name": {
     "ko": "BBQ 미트 플래터 (3~4인)",
     "en": "BBQ Meat Platter (3-4 persons)",
     "zh": "BBQ烤肉拼盘(3-4人)",
     "ja": "BBQミートプラッター(3~4人)",
     "vi": "Khay thịt nướng BBQ (3-4 người)"
    },
    "price": 599000,
    "photo": "img/bbq.jpg"
   },
   {
    "name": {
     "ko": "엔조이 패밀리 플래터 (3~4인)",
     "en": "Enjoy Family Platter (3-4 persons)",
     "zh": "Enjoy家庭拼盘(3-4人)",
     "ja": "エンジョイ・ファミリープラッター(3~4人)",
     "vi": "Khay Enjoy Family (3-4 người)"
    },
    "price": 499000
   },
   {
    "name": {
     "ko": "심플리 콤보 플래터 (2인)",
     "en": "Simply Combo Platter (2 persons)",
     "zh": "Simply Combo拼盘(2人)",
     "ja": "シンプリー・コンボプラッター(2人)",
     "vi": "Khay Simply Combo (2 người)"
    },
    "price": 399000
   },
   {
    "name": {
     "ko": "브라이트 스타 플래터 (2인)",
     "en": "Bright Star Platter (2 persons)",
     "zh": "Bright Star拼盘(2人)",
     "ja": "ブライトスター・プラッター(2人)",
     "vi": "Khay Bright Star (2 người)"
    },
    "price": 345000
   }
  ]
 },
 {
  "id": "promo",
  "name": {
   "ko": "요일 프로모션",
   "en": "Weekly Promotions",
   "zh": "每周优惠",
   "ja": "曜日別プロモーション",
   "vi": "Khuyến mãi theo ngày"
  },
  "note": {
   "ko": "월·목요일: 라지 피자 1판을 사면 1판 무료!",
   "en": "Mon & Thu: Buy any Large Pizza, get any Large Pizza free!",
   "zh": "周一和周四：买1个大号(L)披萨，送1个大号(L)披萨！",
   "ja": "月・木曜日：Lサイズピザを1枚ご注文でもう1枚無料！",
   "vi": "Thứ Hai và Thứ Năm: mua 1 Pizza size L tặng 1 Pizza size L!"
  },
  "items": [
   {
    "name": {
     "ko": "화요일 콤보",
     "en": "Tuesday Combo",
     "zh": "周二套餐",
     "ja": "火曜日コンボ",
     "vi": "Combo thứ Ba"
    },
    "price": 225000,
    "desc": {
     "ko": "피자 M 1 · 미트소스 스파게티 1 · 프라이드 치킨 다리 1 · 감자튀김 1 · 콜라 1.5L",
     "en": "1 Pizza (M) · 1 Meat Sauce Spaghetti · 1 Fried Chicken Thigh · 1 French Fries · 1 Coke 1.5L",
     "zh": "1个披萨(M) · 1份肉酱意大利面 · 1个炸鸡腿 · 1份薯条 · 1瓶1.5L可乐",
     "ja": "ピザ(M)1枚 · ミートソーススパゲッティ1皿 · フライドチキンもも1本 · フライドポテト1皿 · コーラ1.5L",
     "vi": "1 Pizza (M) · 1 Mỳ Ý sốt thịt bằm · 1 Đùi gà chiên · 1 Khoai tây chiên · 1 Coca-Cola 1.5L"
    }
   },
   {
    "name": {
     "ko": "수요일 콤보",
     "en": "Wednesday Combo",
     "zh": "周三套餐",
     "ja": "水曜日コンボ",
     "vi": "Combo thứ Tư"
    },
    "price": 215000,
    "desc": {
     "ko": "피자 M 1 · 스몰 피자 1 · 콜라 1.5L",
     "en": "1 Pizza (M) · 1 Small Pizza · 1 Coke 1.5L",
     "zh": "1个披萨(M) · 1个小号披萨 · 1瓶1.5L可乐",
     "ja": "ピザ(M)1枚 · スモールピザ1枚 · コーラ1.5L",
     "vi": "1 Pizza (M) · 1 Pizza nhỏ · 1 Coca-Cola 1.5L"
    }
   },
   {
    "name": {
     "ko": "금요일 콤보",
     "en": "Friday Combo",
     "zh": "周五套餐",
     "ja": "金曜日コンボ",
     "vi": "Combo thứ Sáu"
    },
    "price": 269000,
    "desc": {
     "ko": "피자 L 1 · 미트소스 스파게티 1 · 치킨 윙 4 · 감자튀김 1 · 콜라 1.5L",
     "en": "1 Pizza (L) · 1 Meat Sauce Spaghetti · 4 Chicken Wings · 1 French Fries · 1 Coke 1.5L",
     "zh": "1个披萨(L) · 1份肉酱意大利面 · 4个鸡翅 · 1份薯条 · 1瓶1.5L可乐",
     "ja": "ピザ(L)1枚 · ミートソーススパゲッティ1皿 · チキンウィング4本 · フライドポテト1皿 · コーラ1.5L",
     "vi": "1 Pizza (L) · 1 Mỳ Ý sốt thịt bằm · 4 Cánh gà · 1 Khoai tây chiên · 1 Coca-Cola 1.5L"
    }
   }
  ]
 },
 {
  "id": "pizza",
  "name": {
   "ko": "피자",
   "en": "Pizza",
   "zh": "披萨",
   "ja": "ピザ",
   "vi": "Pizza"
  },
  "note": {
   "ko": "토핑 추가: S 15,000 · M 20,000 · L 25,000",
   "en": "Extra topping: S 15,000 · M 20,000 · L 25,000",
   "zh": "加料：S 15,000 · M 20,000 · L 25,000",
   "ja": "トッピング追加：S 15,000 · M 20,000 · L 25,000",
   "vi": "Thêm topping: S 15,000 · M 20,000 · L 25,000"
  },
  "items": [
   {
    "name": {
     "ko": "마르게리타 (치즈 피자)",
     "en": "Margherita",
     "zh": "玛格丽特(芝士披萨)",
     "ja": "マルゲリータ(チーズピザ)",
     "vi": "Margherita (Pizza phô mai)"
    },
    "sizes": [
     [
      "S",
      89000
     ],
     [
      "M",
      139000
     ],
     [
      "L",
      189000
     ]
    ],
    "photo": "img/margherita.jpg"
   },
   {
    "name": {
     "ko": "하와이안 (트로피컬 피자)",
     "en": "Hawaiian",
     "zh": "夏威夷(热带水果披萨)",
     "ja": "ハワイアン(トロピカルピザ)",
     "vi": "Hawaiian (Pizza nhiệt đới)"
    },
    "sizes": [
     [
      "S",
      95000
     ],
     [
      "M",
      145000
     ],
     [
      "L",
      195000
     ]
    ]
   },
   {
    "name": {
     "ko": "씨푸드 (해산물 피자)",
     "en": "Seafood",
     "zh": "海鲜(海鲜披萨)",
     "ja": "シーフード(海鮮ピザ)",
     "vi": "Seafood (Pizza hải sản)"
    },
    "sizes": [
     [
      "S",
      110000
     ],
     [
      "M",
      160000
     ],
     [
      "L",
      210000
     ]
    ]
   },
   {
    "name": {
     "ko": "오션 투나 (참치 피자)",
     "en": "Ocean Tuna",
     "zh": "海洋金枪鱼(金枪鱼披萨)",
     "ja": "オーシャンツナ(ツナピザ)",
     "vi": "Ocean Tuna (Pizza cá ngừ)"
    },
    "sizes": [
     [
      "S",
      95000
     ],
     [
      "M",
      149000
     ],
     [
      "L",
      199000
     ]
    ]
   },
   {
    "name": {
     "ko": "비피 (소고기·옥수수 피자)",
     "en": "Beefy",
     "zh": "Beefy(牛肉玉米披萨)",
     "ja": "ビーフィー(牛肉・コーンピザ)",
     "vi": "Beefy (Pizza bò và bắp)"
    },
    "sizes": [
     [
      "S",
      99000
     ],
     [
      "M",
      149000
     ],
     [
      "L",
      199000
     ]
    ]
   },
   {
    "name": {
     "ko": "아메리칸 스타일 (폭립·치킨 피자)",
     "en": "American Style",
     "zh": "美式风味(排骨鸡肉披萨)",
     "ja": "アメリカンスタイル(スペアリブ・チキンピザ)",
     "vi": "American Style (Pizza sườn BBQ và gà)"
    },
    "sizes": [
     [
      "S",
      99000
     ],
     [
      "M",
      149000
     ],
     [
      "L",
      199000
     ]
    ]
   },
   {
    "name": {
     "ko": "베지 (야채 피자)",
     "en": "Veggie",
     "zh": "蔬菜(蔬菜披萨)",
     "ja": "ベジ(野菜ピザ)",
     "vi": "Veggie (Pizza rau củ)"
    },
    "sizes": [
     [
      "S",
      95000
     ],
     [
      "M",
      145000
     ],
     [
      "L",
      195000
     ]
    ]
   },
   {
    "name": {
     "ko": "미트 러버스 (콜드컷·소고기·파인애플)",
     "en": "Meat Lover's",
     "zh": "肉食爱好者(冷切肉·牛肉·菠萝)",
     "ja": "ミートラバーズ(コールドカット・牛肉・パイナップル)",
     "vi": "Meat Lover's (Thịt nguội · bò · dứa)"
    },
    "sizes": [
     [
      "S",
      99000
     ],
     [
      "M",
      149000
     ],
     [
      "L",
      199000
     ]
    ]
   },
   {
    "name": {
     "ko": "딜라이트 치킨 (구운 치킨 피자)",
     "en": "Delight Chicken",
     "zh": "美味烤鸡(烤鸡披萨)",
     "ja": "ディライトチキン(ローストチキンピザ)",
     "vi": "Delight Chicken (Pizza gà nướng)"
    },
    "sizes": [
     [
      "S",
      99000
     ],
     [
      "M",
      149000
     ],
     [
      "L",
      199000
     ]
    ]
   },
   {
    "name": {
     "ko": "페퍼로니 (매운 미국 소시지)",
     "en": "Pepperoni",
     "zh": "意式辣香肠(美式辣香肠)",
     "ja": "ペパロニ(辛いアメリカンソーセージ)",
     "vi": "Pepperoni (Xúc xích Mỹ cay)"
    },
    "sizes": [
     [
      "S",
      110000
     ],
     [
      "M",
      160000
     ],
     [
      "L",
      210000
     ]
    ]
   },
   {
    "name": {
     "ko": "더블 치즈버거 피자",
     "en": "Double Cheeseburger",
     "zh": "双层芝士汉堡披萨",
     "ja": "ダブルチーズバーガーピザ",
     "vi": "Pizza Double Cheeseburger"
    },
    "sizes": [
     [
      "S",
      99000
     ],
     [
      "M",
      149000
     ],
     [
      "L",
      199000
     ]
    ]
   },
   {
    "name": {
     "ko": "소시지 러버스 (독일 소시지)",
     "en": "Sausage Lover's",
     "zh": "香肠爱好者(德式香肠)",
     "ja": "ソーセージラバーズ(ドイツソーセージ)",
     "vi": "Sausage Lover's (Xúc xích Đức)"
    },
    "sizes": [
     [
      "S",
      99000
     ],
     [
      "M",
      149000
     ],
     [
      "L",
      199000
     ]
    ]
   },
   {
    "name": {
     "ko": "카르보나라 (베이컨 피자)",
     "en": "Carbonara",
     "zh": "卡邦尼(培根披萨)",
     "ja": "カルボナーラ(ベーコンピザ)",
     "vi": "Carbonara (Pizza thịt xông khói)"
    },
    "sizes": [
     [
      "S",
      105000
     ],
     [
      "M",
      155000
     ],
     [
      "L",
      205000
     ]
    ]
   },
   {
    "name": {
     "ko": "BBQ 포크 & 투나 (폭립·참치)",
     "en": "BBQ Pork & Tuna",
     "zh": "BBQ猪肉金枪鱼(排骨·金枪鱼)",
     "ja": "BBQポーク＆ツナ(スペアリブ・ツナ)",
     "vi": "BBQ Pork & Tuna (Sườn · cá ngừ)"
    },
    "sizes": [
     [
      "S",
      105000
     ],
     [
      "M",
      155000
     ],
     [
      "L",
      205000
     ]
    ]
   },
   {
    "name": {
     "ko": "비프 & 머쉬룸",
     "en": "Beef & Mushroom",
     "zh": "牛肉蘑菇",
     "ja": "ビーフ＆マッシュルーム",
     "vi": "Beef & Mushroom (Bò và nấm)"
    },
    "sizes": [
     [
      "S",
      105000
     ],
     [
      "M",
      155000
     ],
     [
      "L",
      205000
     ]
    ]
   },
   {
    "name": {
     "ko": "하프 앤 하프 (두 가지 맛 반반)",
     "en": "Half & Half (two flavors)",
     "zh": "双拼(两种口味各一半)",
     "ja": "ハーフ＆ハーフ(2種類の味を半分ずつ)",
     "vi": "Half & Half (Hai vị một nửa)"
    },
    "sizes": [
     [
      "S",
      120000
     ],
     [
      "M",
      170000
     ],
     [
      "L",
      220000
     ]
    ]
   },
   {
    "name": {
     "ko": "스페셜 시카고 피자",
     "en": "Special Chicago Pizza",
     "zh": "特色芝加哥披萨",
     "ja": "スペシャル・シカゴピザ",
     "vi": "Pizza Chicago đặc biệt"
    },
    "price": 199000
   }
  ]
 },
 {
  "id": "napoli",
  "name": {
   "ko": "나폴리 클래식 피자",
   "en": "Neapolitan Classic Pizza",
   "zh": "那不勒斯经典披萨",
   "ja": "ナポリ クラシックピザ",
   "vi": "Pizza Napoli cổ điển"
  },
  "items": [
   {
    "name": {
     "ko": "6 치즈 민트 허니 피자",
     "en": "6 Cheese Pizza with Mint Honey",
     "zh": "六种芝士薄荷蜂蜜披萨",
     "ja": "6チーズ ミントハニーピザ",
     "vi": "Pizza 6 loại phô mai với mật ong bạc hà"
    },
    "price": 245000
   },
   {
    "name": {
     "ko": "클래식 마르게리타 피자",
     "en": "Classic Margherita Pizza",
     "zh": "经典玛格丽特披萨",
     "ja": "クラシック・マルゲリータピザ",
     "vi": "Pizza Margherita cổ điển"
    },
    "price": 185000
   },
   {
    "name": {
     "ko": "로스티드 치킨 & 초리조 피자",
     "en": "Roasted Chicken & Chorizo Pizza",
     "zh": "烤鸡腊肠披萨",
     "ja": "ローストチキン＆チョリソーピザ",
     "vi": "Pizza gà nướng & chorizo"
    },
    "price": 245000
   },
   {
    "name": {
     "ko": "사파 연어 미소 크림 피자",
     "en": "Sapa Salmon Miso Cream Pizza",
     "zh": "沙坝三文鱼味噌奶油披萨",
     "ja": "サパ産サーモン味噌クリームピザ",
     "vi": "Pizza cá hồi Sapa sốt kem miso"
    },
    "price": 249000
   },
   {
    "name": {
     "ko": "새우 & 갈릭 피자",
     "en": "Prawn & Garlic Pizza",
     "zh": "大虾蒜香披萨",
     "ja": "エビ＆ガーリックピザ",
     "vi": "Pizza tôm & tỏi"
    },
    "price": 249000
   },
   {
    "name": {
     "ko": "파르마 햄 & 부라타 마르게리타 피자",
     "en": "Margherita Pizza with Parma Ham & Burrata",
     "zh": "帕尔马火腿布拉塔玛格丽特披萨",
     "ja": "パルマハム＆ブッラータのマルゲリータピザ",
     "vi": "Pizza Margherita với giăm bông Parma & phô mai Burrata"
    },
    "price": 269000
   },
   {
    "name": {
     "ko": "BBQ 비프 피자",
     "en": "BBQ Beef Pizza",
     "zh": "BBQ牛肉披萨",
     "ja": "BBQビーフピザ",
     "vi": "Pizza bò BBQ"
    },
    "price": 249000
   },
   {
    "name": {
     "ko": "하프 & 하프 피자",
     "en": "Half & Half Pizza",
     "zh": "双拼披萨",
     "ja": "ハーフ＆ハーフピザ",
     "vi": "Pizza Half & Half"
    },
    "price": 285000
   }
  ]
 },
 {
  "id": "steak",
  "name": {
   "ko": "스테이크",
   "en": "Steak",
   "zh": "牛排",
   "ja": "ステーキ",
   "vi": "Bít tết"
  },
  "items": [
   {
    "name": {
     "ko": "시즐링 호주산 스테이크",
     "en": "Sizzling Aussie Steak",
     "zh": "铁板澳洲牛排",
     "ja": "シズリング オージーステーキ",
     "vi": "Bít tết Úc Sizzling"
    },
    "sizes": [
     [
      "S 200g",
      255000
     ],
     [
      "M 250g",
      315000
     ],
     [
      "L 300g",
      369000
     ]
    ]
   },
   {
    "name": {
     "ko": "블랙 앵거스 스테이크 (200g)",
     "en": "Black Angus Steak (200g)",
     "zh": "黑安格斯牛排(200g)",
     "ja": "ブラックアンガスステーキ(200g)",
     "vi": "Bít tết Black Angus (200g)"
    },
    "price": 310000
   },
   {
    "name": {
     "ko": "티본 스테이크 (400g)",
     "en": "T-Bone Steak (400g)",
     "zh": "T骨牛排(400g)",
     "ja": "Tボーンステーキ(400g)",
     "vi": "Bít tết T-Bone (400g)"
    },
    "price": 435000,
    "photo": "img/tbone.jpg"
   },
   {
    "name": {
     "ko": "시즐링 후지 스테이크 (200g)",
     "en": "Sizzling Fuji Steak (200g)",
     "zh": "铁板富士牛排(200g)",
     "ja": "シズリング フジステーキ(200g)",
     "vi": "Bít tết Sizzling Fuji (200g)"
    },
    "price": 335000
   },
   {
    "name": {
     "ko": "시즐링 호쿠비 스테이크 (200g)",
     "en": "Sizzling Hokubee Steak (200g)",
     "zh": "铁板Hokubee牛排(200g)",
     "ja": "シズリング ホクビーステーキ(200g)",
     "vi": "Bít tết Sizzling Hokubee (200g)"
    },
    "price": 299000
   },
   {
    "name": {
     "ko": "미국산 소고기 스테이크 (250g)",
     "en": "US Beef Steak (250g)",
     "zh": "美国牛肉牛排(250g)",
     "ja": "アメリカ産牛肉ステーキ(250g)",
     "vi": "Bít tết bò Mỹ (250g)"
    },
    "price": 249000
   },
   {
    "name": {
     "ko": "시즐링 양고기 스테이크 (250g)",
     "en": "Sizzling Lamb Steak (250g)",
     "zh": "铁板羊肉牛排(250g)",
     "ja": "シズリング ラムステーキ(250g)",
     "vi": "Bít tết cừu Sizzling (250g)"
    },
    "price": 299000
   },
   {
    "name": {
     "ko": "블랙 록 그릴 스테이크",
     "en": "Black Rock Grill Steak",
     "zh": "黑石烤牛排",
     "ja": "ブラックロックグリルステーキ",
     "vi": "Bít tết nướng đá đen"
    },
    "sizes": [
     [
      "S 200g",
      275000
     ],
     [
      "M 250g",
      329000
     ],
     [
      "L 300g",
      389000
     ]
    ]
   },
   {
    "name": {
     "ko": "블랙 팬 그릴 스테이크",
     "en": "Black Pan Grill Steak",
     "zh": "黑铁锅烤牛排",
     "ja": "ブラックパングリルステーキ",
     "vi": "Bít tết chảo gang đen"
    },
    "price": 315000
   },
   {
    "name": {
     "ko": "그린 페퍼 소스 부채살 스테이크",
     "en": "US Top Blade Steak - Green Pepper Sauce",
     "zh": "美国牛肩胛牛排配青胡椒酱",
     "ja": "アメリカ産トップブレードステーキ グリーンペッパーソース",
     "vi": "Bít tết thăn vai bò Mỹ sốt tiêu xanh"
    },
    "sizes": [
     [
      "S 160g",
      175000
     ],
     [
      "L 250g",
      239000
     ]
    ]
   },
   {
    "name": {
     "ko": "레드 와인 소스 부채살 스테이크",
     "en": "US Top Blade Steak - Red Wine Sauce",
     "zh": "美国牛肩胛牛排配红酒酱",
     "ja": "アメリカ産トップブレードステーキ 赤ワインソース",
     "vi": "Bít tết thăn vai bò Mỹ sốt rượu vang đỏ"
    },
    "sizes": [
     [
      "S 160g",
      175000
     ],
     [
      "L 250g",
      239000
     ]
    ]
   },
   {
    "name": {
     "ko": "머쉬룸 소스 부채살 스테이크",
     "en": "US Top Blade Steak - Mushroom Sauce",
     "zh": "美国牛肩胛牛排配蘑菇酱",
     "ja": "アメリカ産トップブレードステーキ マッシュルームソース",
     "vi": "Bít tết thăn vai bò Mỹ sốt nấm"
    },
    "sizes": [
     [
      "S 160g",
      175000
     ],
     [
      "L 250g",
      239000
     ]
    ]
   },
   {
    "name": {
     "ko": "데리야키 소스 부채살 스테이크",
     "en": "US Top Blade Steak - Teriyaki Sauce",
     "zh": "美国牛肩胛牛排配照烧酱",
     "ja": "アメリカ産トップブレードステーキ 照り焼きソース",
     "vi": "Bít tết thăn vai bò Mỹ sốt Teriyaki"
    },
    "sizes": [
     [
      "S 160g",
      175000
     ],
     [
      "L 250g",
      239000
     ]
    ]
   },
   {
    "name": {
     "ko": "치즈 부채살 스테이크",
     "en": "US Top Blade Cheese Steak",
     "zh": "美国牛肩胛芝士牛排",
     "ja": "アメリカ産トップブレードチーズステーキ",
     "vi": "Bít tết thăn vai bò Mỹ phô mai"
    },
    "sizes": [
     [
      "S 160g",
      195000
     ],
     [
      "L 250g",
      249000
     ]
    ]
   },
   {
    "name": {
     "ko": "시즐링 로컬 비프",
     "en": "Sizzling Local Beef",
     "zh": "铁板本地牛肉",
     "ja": "シズリング ローカルビーフ",
     "vi": "Bò địa phương Sizzling"
    },
    "price": 165000
   },
   {
    "name": {
     "ko": "시즐링 부채살 스테이크 (250g)",
     "en": "Sizzling Top Blade Steak (250g)",
     "zh": "铁板牛肩胛牛排(250g)",
     "ja": "シズリング トップブレードステーキ(250g)",
     "vi": "Bít tết thăn vai Sizzling (250g)"
    },
    "price": 255000
   },
   {
    "name": {
     "ko": "시즐링 믹스드 그릴 (1~2인)",
     "en": "Sizzling Mixed Grill (1-2 persons)",
     "zh": "铁板烤肉拼盘(1-2人)",
     "ja": "シズリング ミックスグリル(1~2人)",
     "vi": "Sizzling Mixed Grill (1-2 người)"
    },
    "price": 299000
   },
   {
    "name": {
     "ko": "치즈 베이크 비프 스테이크",
     "en": "Beef Steak with Cheese Bake",
     "zh": "芝士焗牛排",
     "ja": "チーズベイクのビーフステーキ",
     "vi": "Bít tết bò nướng phô mai"
    },
    "price": 249000
   }
  ]
 },
 {
  "id": "pasta",
  "name": {
   "ko": "스파게티 · 라자냐",
   "en": "Spaghetti & Lasagna",
   "zh": "意大利面·千层面",
   "ja": "スパゲッティ・ラザニア",
   "vi": "Mỳ Ý · Lasagna"
  },
  "items": [
   {
    "name": {
     "ko": "볼로네제 스파게티",
     "en": "Bolognese Spaghetti",
     "zh": "肉酱意大利面",
     "ja": "ボロネーゼ スパゲッティ",
     "vi": "Mỳ Ý Bolognese"
    },
    "price": 79000
   },
   {
    "name": {
     "ko": "까르보나라 스파게티",
     "en": "Carbonara Spaghetti",
     "zh": "奶油培根意大利面(卡邦尼)",
     "ja": "カルボナーラ スパゲッティ",
     "vi": "Mỳ Ý Carbonara"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "마리나라 스파게티 (해산물 토마토)",
     "en": "Marinara Spaghetti",
     "zh": "玛丽娜拉意大利面(海鲜番茄)",
     "ja": "マリナーラ スパゲッティ(海鮮トマト)",
     "vi": "Mỳ Ý Marinara (Hải sản sốt cà chua)"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "치킨 파르미지아나",
     "en": "Chicken Parmigiana",
     "zh": "帕尔玛干酪鸡排",
     "ja": "チキン パルミジャーナ",
     "vi": "Gà Parmigiana"
    },
    "price": 115000
   },
   {
    "name": {
     "ko": "비프 파르미지아나",
     "en": "Beef Parmigiana",
     "zh": "帕尔玛干酪牛排",
     "ja": "ビーフ パルミジャーナ",
     "vi": "Bò Parmigiana"
    },
    "price": 125000
   },
   {
    "name": {
     "ko": "라자냐",
     "en": "Lasagna",
     "zh": "千层面",
     "ja": "ラザニア",
     "vi": "Lasagna"
    },
    "price": 125000
   },
   {
    "name": {
     "ko": "해산물 알리오 올리오",
     "en": "Seafood Aglio Olio",
     "zh": "海鲜蒜香橄榄油意大利面",
     "ja": "シーフード アーリオ・オーリオ",
     "vi": "Mỳ Ý Aglio Olio hải sản"
    },
    "price": 99000,
    "photo": "img/aglio.jpg"
   },
   {
    "name": {
     "ko": "스테이크 & 머쉬룸 스파게티",
     "en": "Steak & Mushroom Spaghetti",
     "zh": "牛排蘑菇意大利面",
     "ja": "ステーキ＆マッシュルーム スパゲッティ",
     "vi": "Mỳ Ý bò bít tết & nấm"
    },
    "price": 95000
   },
   {
    "name": {
     "ko": "상디에고 스페셜 스파게티",
     "en": "Sang Diego Special Spaghetti",
     "zh": "Sang Diego特色意大利面",
     "ja": "サンディエゴ スペシャルスパゲッティ",
     "vi": "Mỳ Ý đặc biệt Sang Diego"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "미트볼 스파게티",
     "en": "Meatball Spaghetti",
     "zh": "肉丸意大利面",
     "ja": "ミートボール スパゲッティ",
     "vi": "Mỳ Ý viên thịt"
    },
    "price": 89000
   }
  ]
 },
 {
  "id": "burger",
  "name": {
   "ko": "버거 · 샌드위치",
   "en": "Burgers & Sandwiches",
   "zh": "汉堡·三明治",
   "ja": "バーガー・サンドイッチ",
   "vi": "Burger · Sandwich"
  },
  "items": [
   {
    "name": {
     "ko": "베이컨 치즈 버거",
     "en": "Bacon Cheese Burger",
     "zh": "培根芝士汉堡",
     "ja": "ベーコンチーズバーガー",
     "vi": "Burger thịt xông khói phô mai"
    },
    "price": 110000
   },
   {
    "name": {
     "ko": "호주산 스테이크 버거",
     "en": "Aussie Steak Burger",
     "zh": "澳洲牛排汉堡",
     "ja": "オージーステーキバーガー",
     "vi": "Burger bít tết Úc"
    },
    "price": 129000
   },
   {
    "name": {
     "ko": "비프 치즈 버거",
     "en": "Beef Cheese Burger",
     "zh": "牛肉芝士汉堡",
     "ja": "ビーフチーズバーガー",
     "vi": "Burger bò phô mai"
    },
    "price": 95000
   },
   {
    "name": {
     "ko": "치킨 버거",
     "en": "Chicken Burger",
     "zh": "鸡肉汉堡",
     "ja": "チキンバーガー",
     "vi": "Burger gà"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "클럽 샌드위치",
     "en": "Club Sandwich",
     "zh": "总汇三明治",
     "ja": "クラブサンドイッチ",
     "vi": "Sandwich Club"
    },
    "price": 95000,
    "photo": "img/club.jpg"
   },
   {
    "name": {
     "ko": "햄 & 치즈 샌드위치",
     "en": "Ham & Cheese Sandwich",
     "zh": "火腿芝士三明治",
     "ja": "ハム＆チーズサンドイッチ",
     "vi": "Sandwich giăm bông phô mai"
    },
    "price": 90000
   }
  ]
 },
 {
  "id": "mexican",
  "name": {
   "ko": "멕시칸",
   "en": "Mexican",
   "zh": "墨西哥菜",
   "ja": "メキシカン",
   "vi": "Món Mexico"
  },
  "note": {
   "ko": "퀘사디아·타코·엔칠라다는 치킨 또는 비프를 고를 수 있어요(비프 가격 기준).",
   "en": "Quesadillas, tacos and enchiladas come with chicken or beef (beef price shown).",
   "zh": "墨西哥奶酪饼、塔可和恩奇拉达可选鸡肉或牛肉(所示为牛肉价格)。",
   "ja": "ケサディーヤ、タコス、エンチラーダはチキンかビーフをお選びいただけます(表示はビーフの価格です)。",
   "vi": "Quesadilla, Taco và Enchilada có thể chọn gà hoặc bò (giá hiển thị là giá bò)."
  },
  "items": [
   {
    "name": {
     "ko": "퀘사디아 (비프)",
     "en": "Quesadillas (Beef)",
     "zh": "墨西哥奶酪饼(牛肉)",
     "ja": "ケサディーヤ(ビーフ)",
     "vi": "Quesadilla (Bò)"
    },
    "price": 110000
   },
   {
    "name": {
     "ko": "타코 (비프)",
     "en": "Tacos (Beef)",
     "zh": "塔可(牛肉)",
     "ja": "タコス(ビーフ)",
     "vi": "Taco (Bò)"
    },
    "price": 170000
   },
   {
    "name": {
     "ko": "엔칠라다",
     "en": "Enchiladas",
     "zh": "恩奇拉达",
     "ja": "エンチラーダ",
     "vi": "Enchilada"
    },
    "price": 185000
   },
   {
    "name": {
     "ko": "부리토 (비프)",
     "en": "Burritos (Beef)",
     "zh": "墨西哥卷饼(牛肉)",
     "ja": "ブリトー(ビーフ)",
     "vi": "Burrito (Bò)"
    },
    "price": 195000
   }
  ]
 },
 {
  "id": "asian",
  "name": {
   "ko": "아시안 푸드",
   "en": "Asian Food Corner",
   "zh": "亚洲美食",
   "ja": "アジアンフード",
   "vi": "Góc món Á"
  },
  "items": [
   {
    "name": {
     "ko": "BBQ 립 & 라이스",
     "en": "Ribs & Rice",
     "zh": "BBQ排骨饭",
     "ja": "BBQリブ＆ライス",
     "vi": "Sườn BBQ & cơm"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "레몬그라스 닭다리 구이 덮밥",
     "en": "Grilled Lemongrass Chicken Thighs",
     "zh": "香茅烤鸡腿饭",
     "ja": "レモングラス焼きチキンもも肉丼",
     "vi": "Cơm đùi gà nướng sả"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "일본식 소고기 카레",
     "en": "Japanese Beef Curry",
     "zh": "日式牛肉咖喱饭",
     "ja": "日本風ビーフカレー",
     "vi": "Cơm cà ri bò kiểu Nhật"
    },
    "price": 110000
   },
   {
    "name": {
     "ko": "일본식 치킨 카레",
     "en": "Japanese Chicken Curry",
     "zh": "日式鸡肉咖喱饭",
     "ja": "日本風チキンカレー",
     "vi": "Cơm cà ri gà kiểu Nhật"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "해산물 야채 볶음 덮밥",
     "en": "Seafood Stir Fry",
     "zh": "海鲜蔬菜炒饭盖饭",
     "ja": "海鮮と野菜の炒め丼",
     "vi": "Cơm hải sản xào rau củ"
    },
    "price": 115000
   },
   {
    "name": {
     "ko": "후추 소스 소고기 덮밥",
     "en": "Beef with Pepper Sauce",
     "zh": "黑胡椒牛肉饭",
     "ja": "ペッパーソース牛肉丼",
     "vi": "Cơm bò sốt tiêu"
    },
    "price": 105000
   },
   {
    "name": {
     "ko": "쉐이킹 비프 (소고기 룩락)",
     "en": "Shaking Beef",
     "zh": "摇摇牛肉(越式牛肉粒)",
     "ja": "シェイキングビーフ(ボールックラック)",
     "vi": "Bò lúc lắc"
    },
    "price": 105000
   },
   {
    "name": {
     "ko": "모둠 볶음밥",
     "en": "Mixed Fried Rice",
     "zh": "什锦炒饭",
     "ja": "ミックス炒飯",
     "vi": "Cơm chiên thập cẩm"
    },
    "price": 85000
   },
   {
    "name": {
     "ko": "피시소스 닭다리 구이 덮밥",
     "en": "Chicken Thighs with Fish Sauce",
     "zh": "鱼露烤鸡腿饭",
     "ja": "ナンプラー焼きチキンもも肉丼",
     "vi": "Cơm đùi gà nướng nước mắm"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "데리야키 허니 치킨 캐슈넛",
     "en": "Teriyaki Honey Chicken Cashews",
     "zh": "照烧蜂蜜腰果鸡",
     "ja": "照り焼きハニーチキンのカシューナッツ",
     "vi": "Gà Teriyaki mật ong hạt điều"
    },
    "price": 99000
   }
  ]
 },
 {
  "id": "seafood",
  "name": {
   "ko": "해산물",
   "en": "Seafood",
   "zh": "海鲜",
   "ja": "シーフード",
   "vi": "Hải sản"
  },
  "items": [
   {
    "name": {
     "ko": "오션 바스켓 (모둠 해산물 튀김)",
     "en": "Ocean Basket (Mixed Fried Seafood)",
     "zh": "海洋拼篮(什锦炸海鲜)",
     "ja": "オーシャンバスケット(海鮮ミックスフライ)",
     "vi": "Ocean Basket (Hải sản chiên thập cẩm)"
    },
    "price": 299000
   },
   {
    "name": {
     "ko": "연어 스테이크",
     "en": "Salmon Steak",
     "zh": "三文鱼排",
     "ja": "サーモンステーキ",
     "vi": "Bít tết cá hồi"
    },
    "price": 249000
   },
   {
    "name": {
     "ko": "피시 앤 칩스",
     "en": "Fish & Chips",
     "zh": "炸鱼薯条",
     "ja": "フィッシュ＆チップス",
     "vi": "Cá và khoai tây chiên (Fish & Chips)"
    },
    "price": 170000
   },
   {
    "name": {
     "ko": "새우 구이 (6마리)",
     "en": "Grilled Prawns (6 pcs)",
     "zh": "烤大虾(6只)",
     "ja": "エビのグリル(6尾)",
     "vi": "Tôm nướng (6 con)"
    },
    "price": 160000
   }
  ]
 },
 {
  "id": "starter",
  "name": {
   "ko": "스타터 · 수프",
   "en": "Starters & Soups",
   "zh": "开胃菜·汤",
   "ja": "スターター・スープ",
   "vi": "Khai vị · Súp"
  },
  "note": {
   "ko": "시즈닝 쉐이크 감자튀김으로 바꾸면 +5,000.",
   "en": "Seasoned shake fries: +5,000.",
   "zh": "换成调味摇摇薯条：+5,000。",
   "ja": "シーズニングシェイクフライドポテトに変更：+5,000。",
   "vi": "Đổi sang khoai tây chiên lắc gia vị: +5,000."
  },
  "items": [
   {
    "name": {
     "ko": "단호박 아몬드 수프",
     "en": "Pumpkin Almond Soup",
     "zh": "南瓜杏仁浓汤",
     "ja": "かぼちゃとアーモンドのスープ",
     "vi": "Súp bí đỏ hạnh nhân"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "치킨 콘 수프",
     "en": "Chicken Corn Soup",
     "zh": "鸡肉玉米浓汤",
     "ja": "チキンコーンスープ",
     "vi": "Súp gà bắp"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "해산물 수프",
     "en": "Seafood Soup",
     "zh": "海鲜汤",
     "ja": "シーフードスープ",
     "vi": "Súp hải sản"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "해삼 수프",
     "en": "Sea Cucumber Soup",
     "zh": "海参汤",
     "ja": "ナマコスープ",
     "vi": "Súp hải sâm"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "갈릭 브레드",
     "en": "Garlic Bread",
     "zh": "蒜香面包",
     "ja": "ガーリックブレッド",
     "vi": "Bánh mì bơ tỏi"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "시즈닝 웨지 감자",
     "en": "Seasoned Potato Wedges",
     "zh": "调味角形薯块",
     "ja": "シーズニングポテトウェッジ",
     "vi": "Khoai tây wedges tẩm gia vị"
    },
    "price": 75000
   },
   {
    "name": {
     "ko": "프렌치 프라이",
     "en": "French Fries",
     "zh": "薯条",
     "ja": "フライドポテト",
     "vi": "Khoai tây chiên"
    },
    "price": 65000
   },
   {
    "name": {
     "ko": "피그미 립 (BBQ 폭립 3조각)",
     "en": "Pygmy Ribs (3 pcs BBQ ribs)",
     "zh": "迷你排骨(3块BBQ排骨)",
     "ja": "ピグミーリブ(BBQスペアリブ3個)",
     "vi": "Pygmy Ribs (3 miếng sườn BBQ)"
    },
    "price": 135000
   },
   {
    "name": {
     "ko": "BBQ 치킨 윙 (프라이드 또는 BBQ 소스)",
     "en": "BBQ Chicken Wings (fried or BBQ sauce)",
     "zh": "BBQ鸡翅(炸或BBQ酱)",
     "ja": "BBQチキンウィング(フライドまたはBBQソース)",
     "vi": "Cánh gà BBQ (chiên hoặc sốt BBQ)"
    },
    "price": 85000,
    "photo": "img/wings.jpg"
   },
   {
    "name": {
     "ko": "치킨 너겟 (6조각)",
     "en": "Chicken Nuggets (6 pcs)",
     "zh": "鸡块(6块)",
     "ja": "チキンナゲット(6個)",
     "vi": "Gà viên chiên (6 miếng)"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "칼라마리 링 (오징어 튀김)",
     "en": "Calamari Rings",
     "zh": "炸鱿鱼圈",
     "ja": "カラマリリング(イカフライ)",
     "vi": "Mực chiên vòng (Calamari)"
    },
    "price": 150000
   },
   {
    "name": {
     "ko": "해산물 스프링롤 (4조각)",
     "en": "Seafood Spring Rolls (4 pcs)",
     "zh": "海鲜春卷(4条)",
     "ja": "海鮮春巻き(4本)",
     "vi": "Chả giò hải sản (4 cuốn)"
    },
    "price": 99000
   },
   {
    "name": {
     "ko": "베이크드 치즈 새우",
     "en": "Baked Cheese Prawns",
     "zh": "芝士焗大虾",
     "ja": "ベイクドチーズプロウン(エビのチーズ焼き)",
     "vi": "Tôm nướng phô mai"
    },
    "price": 145000
   },
   {
    "name": {
     "ko": "크리스피 닭다리 튀김",
     "en": "Crispy Chicken Thigh",
     "zh": "香脆炸鸡腿",
     "ja": "クリスピーチキンもも肉",
     "vi": "Đùi gà chiên giòn"
    },
    "price": 35000
   },
   {
    "name": {
     "ko": "구운 소시지",
     "en": "Grilled Sausage",
     "zh": "烤香肠",
     "ja": "焼きソーセージ",
     "vi": "Xúc xích nướng"
    },
    "price": 22000
   },
   {
    "name": {
     "ko": "치즈 스틱 (4조각)",
     "en": "Cheese Sticks (4 pcs)",
     "zh": "芝士条(4条)",
     "ja": "チーズスティック(4本)",
     "vi": "Phô mai que (4 miếng)"
    },
    "price": 50000
   },
   {
    "name": {
     "ko": "옥수수 튀김",
     "en": "Fried Corn",
     "zh": "炸玉米",
     "ja": "フライドコーン",
     "vi": "Bắp chiên"
    },
    "price": 50000
   }
  ]
 },
 {
  "id": "salad",
  "name": {
   "ko": "샐러드",
   "en": "Salads",
   "zh": "沙拉",
   "ja": "サラダ",
   "vi": "Salad"
  },
  "items": [
   {
    "name": {
     "ko": "시저 샐러드",
     "en": "Caesar Salad",
     "zh": "凯撒沙拉",
     "ja": "シーザーサラダ",
     "vi": "Salad Caesar"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "참치 샐러드",
     "en": "Tuna Salad",
     "zh": "金枪鱼沙拉",
     "ja": "ツナサラダ",
     "vi": "Salad cá ngừ"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "신선 과일 샐러드",
     "en": "Fresh Fruit Salad",
     "zh": "新鲜水果沙拉",
     "ja": "フレッシュフルーツサラダ",
     "vi": "Salad trái cây tươi"
    },
    "price": 89000
   },
   {
    "name": {
     "ko": "그린 샐러드",
     "en": "Green Salad",
     "zh": "蔬菜沙拉",
     "ja": "グリーンサラダ",
     "vi": "Salad rau xanh"
    },
    "price": 79000
   },
   {
    "name": {
     "ko": "러시안 샐러드",
     "en": "Russian Salad",
     "zh": "俄式沙拉",
     "ja": "ロシアンサラダ",
     "vi": "Salad kiểu Nga"
    },
    "price": 85000
   },
   {
    "name": {
     "ko": "케이준 샐러드",
     "en": "Cajun Salad",
     "zh": "卡真沙拉",
     "ja": "ケイジャンサラダ",
     "vi": "Salad Cajun"
    },
    "price": 78000
   },
   {
    "name": {
     "ko": "새우 샐러드",
     "en": "Prawn Salad",
     "zh": "大虾沙拉",
     "ja": "エビサラダ",
     "vi": "Salad tôm"
    },
    "price": 110000
   },
   {
    "name": {
     "ko": "스테이크 샐러드",
     "en": "Steak Salad",
     "zh": "牛排沙拉",
     "ja": "ステーキサラダ",
     "vi": "Salad bít tết"
    },
    "price": 120000
   },
   {
    "name": {
     "ko": "부라타 치즈 & 파르마 햄 추가",
     "en": "Add Burrata & Parma Ham",
     "zh": "加布拉塔芝士和帕尔马火腿",
     "ja": "ブッラータチーズ＆パルマハム追加",
     "vi": "Thêm phô mai Burrata & giăm bông Parma"
    },
    "price": 160000
   }
  ]
 },
 {
  "id": "side",
  "name": {
   "ko": "사이드",
   "en": "Side Dishes",
   "zh": "配菜",
   "ja": "サイドディッシュ",
   "vi": "Món ăn kèm"
  },
  "items": [
   {
    "name": {
     "ko": "데친 채소",
     "en": "Steamed Vegetables",
     "zh": "水煮蔬菜",
     "ja": "温野菜",
     "vi": "Rau luộc"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "매쉬드 포테이토",
     "en": "Mashed Potato",
     "zh": "土豆泥",
     "ja": "マッシュポテト",
     "vi": "Khoai tây nghiền"
    },
    "price": 35000
   },
   {
    "name": {
     "ko": "공깃밥",
     "en": "Steamed Rice",
     "zh": "白米饭",
     "ja": "ご飯",
     "vi": "Cơm trắng"
    },
    "price": 15000
   },
   {
    "name": {
     "ko": "모둠 콜리플라워 볶음",
     "en": "Mixed Fried Cauliflower",
     "zh": "什锦炒花菜",
     "ja": "カリフラワーのミックス炒め",
     "vi": "Súp lơ xào thập cẩm"
    },
    "price": 50000
   },
   {
    "name": {
     "ko": "계란 프라이",
     "en": "Fried Egg",
     "zh": "煎蛋",
     "ja": "目玉焼き",
     "vi": "Trứng ốp la"
    },
    "price": 10000
   },
   {
    "name": {
     "ko": "빵",
     "en": "Bread",
     "zh": "面包",
     "ja": "パン",
     "vi": "Bánh mì"
    },
    "price": 10000
   }
  ]
 },
 {
  "id": "juice",
  "name": {
   "ko": "생과일 주스",
   "en": "Fresh Fruit Juices",
   "zh": "鲜榨果汁",
   "ja": "フレッシュフルーツジュース",
   "vi": "Nước ép trái cây tươi"
  },
  "items": [
   {
    "name": {
     "ko": "레몬 주스",
     "en": "Lemon Juice",
     "zh": "柠檬汁",
     "ja": "レモンジュース",
     "vi": "Nước chanh"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "패션후르츠 주스",
     "en": "Passion Fruit Juice",
     "zh": "百香果汁",
     "ja": "パッションフルーツジュース",
     "vi": "Nước ép chanh dây"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "수박 주스",
     "en": "Watermelon Juice",
     "zh": "西瓜汁",
     "ja": "スイカジュース",
     "vi": "Nước ép dưa hấu"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "파인애플 주스",
     "en": "Pineapple Juice",
     "zh": "菠萝汁",
     "ja": "パイナップルジュース",
     "vi": "Nước ép dứa"
    },
    "price": 42000
   },
   {
    "name": {
     "ko": "구아바 주스",
     "en": "Guava Juice",
     "zh": "番石榴汁",
     "ja": "グァバジュース",
     "vi": "Nước ép ổi"
    },
    "price": 42000
   },
   {
    "name": {
     "ko": "오렌지 주스",
     "en": "Orange Juice",
     "zh": "橙汁",
     "ja": "オレンジジュース",
     "vi": "Nước ép cam"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "사과 주스",
     "en": "Apple Juice",
     "zh": "苹果汁",
     "ja": "アップルジュース",
     "vi": "Nước ép táo"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "당근 주스",
     "en": "Carrot Juice",
     "zh": "胡萝卜汁",
     "ja": "にんじんジュース",
     "vi": "Nước ép cà rốt"
    },
    "price": 38000
   }
  ]
 },
 {
  "id": "smoothie",
  "name": {
   "ko": "스무디 · 쉐이크 · 티",
   "en": "Smoothies, Shakes & Tea",
   "zh": "冰沙·奶昔·茶",
   "ja": "スムージー・シェイク・ティー",
   "vi": "Sinh tố · Sữa lắc · Trà"
  },
  "items": [
   {
    "name": {
     "ko": "아보카도 스무디",
     "en": "Avocado Smoothie",
     "zh": "牛油果冰沙",
     "ja": "アボカドスムージー",
     "vi": "Sinh tố bơ"
    },
    "price": 50000
   },
   {
    "name": {
     "ko": "망고 스무디",
     "en": "Mango Smoothie",
     "zh": "芒果冰沙",
     "ja": "マンゴースムージー",
     "vi": "Sinh tố xoài"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "바나나 스무디",
     "en": "Banana Smoothie",
     "zh": "香蕉冰沙",
     "ja": "バナナスムージー",
     "vi": "Sinh tố chuối"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "패션후르츠 스무디",
     "en": "Passion Fruit Smoothie",
     "zh": "百香果冰沙",
     "ja": "パッションフルーツスムージー",
     "vi": "Sinh tố chanh dây"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "블루베리 요거트 스무디",
     "en": "Blueberry Yogurt Smoothie",
     "zh": "蓝莓酸奶冰沙",
     "ja": "ブルーベリーヨーグルトスムージー",
     "vi": "Sinh tố sữa chua việt quất"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "초콜릿 쉐이크",
     "en": "Chocolate Shake",
     "zh": "巧克力奶昔",
     "ja": "チョコレートシェイク",
     "vi": "Sữa lắc sô cô la"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "딸기 쉐이크",
     "en": "Strawberry Shake",
     "zh": "草莓奶昔",
     "ja": "ストロベリーシェイク",
     "vi": "Sữa lắc dâu"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "바닐라 쉐이크",
     "en": "Vanilla Shake",
     "zh": "香草奶昔",
     "ja": "バニラシェイク",
     "vi": "Sữa lắc vani"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "복숭아 아이스티",
     "en": "Peach Iced Tea",
     "zh": "蜜桃冰茶",
     "ja": "ピーチアイスティー",
     "vi": "Trà đào"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "레몬그라스 오렌지 복숭아 티",
     "en": "Orange Peach Tea with Lemongrass",
     "zh": "香茅橙子蜜桃茶",
     "ja": "レモングラス オレンジピーチティー",
     "vi": "Trà cam đào sả"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "복숭아 모히토",
     "en": "Peach Mojito",
     "zh": "蜜桃莫吉托",
     "ja": "ピーチモヒート",
     "vi": "Mojito đào"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "딸기 모히토",
     "en": "Strawberry Mojito",
     "zh": "草莓莫吉托",
     "ja": "ストロベリーモヒート",
     "vi": "Mojito dâu"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "패션후르츠 모히토",
     "en": "Passion Fruit Mojito",
     "zh": "百香果莫吉托",
     "ja": "パッションフルーツモヒート",
     "vi": "Mojito chanh dây"
    },
    "price": 40000
   },
   {
    "name": {
     "ko": "민트 모히토",
     "en": "Mint Mojito",
     "zh": "薄荷莫吉托",
     "ja": "ミントモヒート",
     "vi": "Mojito bạc hà"
    },
    "price": 40000
   }
  ]
 },
 {
  "id": "drinks",
  "name": {
   "ko": "음료 · 맥주",
   "en": "Drinks & Beer",
   "zh": "饮料·啤酒",
   "ja": "ドリンク・ビール",
   "vi": "Nước uống · Bia"
  },
  "items": [
   {
    "name": {
     "ko": "코카콜라",
     "en": "Coca-Cola",
     "zh": "可口可乐",
     "ja": "コカ・コーラ",
     "vi": "Coca-Cola"
    },
    "price": 20000
   },
   {
    "name": {
     "ko": "코카콜라 라이트",
     "en": "Coca-Cola Light",
     "zh": "轻怡可口可乐",
     "ja": "コカ・コーラ ライト",
     "vi": "Coca-Cola Light"
    },
    "price": 22000
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
     "ko": "레드불",
     "en": "Red Bull",
     "zh": "红牛",
     "ja": "レッドブル",
     "vi": "Red Bull"
    },
    "price": 22000
   },
   {
    "name": {
     "ko": "다사니 생수",
     "en": "Dasani Water",
     "zh": "Dasani矿泉水",
     "ja": "ダサニ ミネラルウォーター",
     "vi": "Nước suối Dasani"
    },
    "price": 15000
   },
   {
    "name": {
     "ko": "타이거 크리스탈",
     "en": "Tiger Crystal",
     "zh": "虎牌水晶啤酒",
     "ja": "タイガー クリスタル",
     "vi": "Bia Tiger Crystal"
    },
    "price": 28000
   },
   {
    "name": {
     "ko": "사이공 맥주",
     "en": "Saigon Beer",
     "zh": "西贡啤酒",
     "ja": "サイゴンビール",
     "vi": "Bia Sài Gòn"
    },
    "price": 28000
   },
   {
    "name": {
     "ko": "하노이 맥주",
     "en": "Hanoi Beer",
     "zh": "河内啤酒",
     "ja": "ハノイビール",
     "vi": "Bia Hà Nội"
    },
    "price": 28000
   },
   {
    "name": {
     "ko": "하이네켄",
     "en": "Heineken",
     "zh": "喜力啤酒",
     "ja": "ハイネケン",
     "vi": "Heineken"
    },
    "price": 28000
   },
   {
    "name": {
     "ko": "생맥주",
     "en": "Draft Beer",
     "zh": "生啤",
     "ja": "生ビール",
     "vi": "Bia tươi"
    },
    "price": 42000
   },
   {
    "name": {
     "ko": "하우스 와인",
     "en": "House Wine",
     "zh": "餐厅自选红酒",
     "ja": "ハウスワイン",
     "vi": "Rượu vang nhà hàng"
    },
    "price": null,
    "desc": {
     "ko": "직원에게 와인 리스트를 문의하세요.",
     "en": "Please ask the staff for the wine list.",
     "zh": "请向店员咨询酒单。",
     "ja": "ワインリストはスタッフにお尋ねください。",
     "vi": "Vui lòng hỏi nhân viên để xem danh sách rượu vang."
    }
   }
  ]
 },
 {
  "id": "dessert",
  "name": {
   "ko": "디저트",
   "en": "Desserts",
   "zh": "甜点",
   "ja": "デザート",
   "vi": "Tráng miệng"
  },
  "items": [
   {
    "name": {
     "ko": "바나나 크레페",
     "en": "Banana Crepe",
     "zh": "香蕉可丽饼",
     "ja": "バナナクレープ",
     "vi": "Bánh crepe chuối"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "바나나 튀김",
     "en": "Fried Banana",
     "zh": "炸香蕉",
     "ja": "バナナフライ",
     "vi": "Chuối chiên"
    },
    "price": 45000
   },
   {
    "name": {
     "ko": "아이스크림 (초콜릿 · 바닐라 · 딸기)",
     "en": "Ice Cream (Chocolate / Vanilla / Strawberry)",
     "zh": "冰淇淋(巧克力 · 香草 · 草莓)",
     "ja": "アイスクリーム(チョコレート・バニラ・ストロベリー)",
     "vi": "Kem (Sô cô la · Vani · Dâu)"
    },
    "price": 60000
   }
  ]
 }
];
