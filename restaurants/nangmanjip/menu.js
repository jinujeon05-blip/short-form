// 낭만집 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진 3장(2026-10-30 수집, 올린 날짜 미상) 신판(menu_01·03) 기준, 가격 단위 VND
// price: 한 가지 가격 / sizes: [["M", 가격], ["L", 가격]] (M=중, L=대, S=미니) / price: null = 시가
// tag: "best" = 메뉴판의 ★(인기)
window.RESTAURANT = {
  brand: { ko: "낭만집", en: "Nangmanjip" },
  phone: "086 577 7600",
  address: "34 Đường Võ Cường-6, Võ Cường, Bắc Ninh",
  wifi: null,
  hours: "15:00 – 22:10", // 구글 지도(매일) 2026-10-30 확인 — 수집기는 '모름'으로 못 읽음
};

window.MENU = [
  {
    id: "stew",
    name: { ko: "찌개", en: "Stews", zh: "锅类", ja: "鍋・チゲ", vi: "Món lẩu & canh" },
    note: {
      ko: "찜·전골·백숙·김밥 단체 예약 가능 (포장/예약판매)",
      en: "Group orders of jjim, jeongol, baeksuk and gimbap can be reserved (takeaway / pre-order)",
      zh: "炖菜、火锅、白煮鸡、紫菜包饭可团体预订(外带/预售)",
      ja: "蒸し煮・鍋・水炊き風の鶏の白煮・キンパの団体予約可(お持ち帰り/予約販売)",
      vi: "Nhận đặt trước món hấp, lẩu, gà luộc và kimbap cho đoàn (mang về / đặt trước)",
    },
    items: [
      { tag: "best", spicy: true, sizes: [["M", 400000], ["L", 600000]], name: { ko: "콩불 (콩나물불고기)", en: "Kongbul (Spicy Bean-sprout Bulgogi)", zh: "豆芽辣烤肉(Kongbul)", ja: "コンブル(もやしプルコギ)", vi: "Thịt heo xào giá đỗ cay (Kongbul)" } },
      { sizes: [["M", 450000], ["L", 650000]], name: { ko: "돼지불고기전골 (소/돼지)", en: "Bulgogi Hot Pot, Pork or Beef (Bulgogi Jeongol)", zh: "烤肉火锅(猪肉/牛肉)", ja: "プルコギ鍋(豚肉/牛肉)", vi: "Lẩu bulgogi (heo/bò)" }, desc: { ko: "소고기/돼지고기 중에서 고르세요", en: "Choose beef or pork", zh: "可选牛肉或猪肉", ja: "牛肉か豚肉を選べます", vi: "Chọn thịt bò hoặc thịt heo" } },
      { sizes: [["M", 400000], ["L", 600000]], name: { ko: "김치찌개", en: "Kimchi Stew (Kimchi-jjigae)", zh: "泡菜汤", ja: "キムチチゲ", vi: "Canh kim chi" }, desc: { ko: "생돼지고기 / 참치 중에서 고르세요", en: "Choose fresh pork or tuna", zh: "可选生猪肉或金枪鱼", ja: "生の豚肉かツナを選べます", vi: "Chọn thịt heo tươi hoặc cá ngừ" } },
      { tag: "best", sizes: [["M", 400000], ["L", 700000]], name: { ko: "돼지 김치찜", en: "Braised Pork with Kimchi (Dwaeji Kimchi-jjim)", zh: "泡菜炖猪肉", ja: "豚キムチ蒸し煮", vi: "Thịt heo hầm kim chi" } },
      { spicy: true, sizes: [["M", 400000], ["L", 600000]], name: { ko: "제육볶음", en: "Spicy Stir-fried Pork (Jeyuk Bokkeum)", zh: "辣炒猪肉", ja: "豚肉の辛味炒め(ジェユクポックム)", vi: "Thịt heo xào cay" } },
      { price: 500000, name: { ko: "만두전골", en: "Dumpling Hot Pot (Mandu Jeongol)", zh: "饺子火锅", ja: "餃子鍋", vi: "Lẩu sủi cảo" }, desc: { ko: "고기 / 김치 중에서 고르세요", en: "Choose meat or kimchi", zh: "可选肉馅或泡菜馅", ja: "肉かキムチを選べます", vi: "Chọn nhân thịt hoặc kim chi" } },
      { sizes: [["M", 300000], ["L", 500000]], name: { ko: "오뎅탕", en: "Fish Cake Soup (Odeng-tang)", zh: "鱼饼汤", ja: "おでん鍋", vi: "Lẩu chả cá (Odeng)" } },
    ],
  },
  {
    id: "meat",
    name: { ko: "고기", en: "Grilled Pork & Meat", zh: "烤肉", ja: "焼き肉", vi: "Thịt nướng" },
    items: [
      { price: 150000, name: { ko: "대패삼겹살", en: "Thin-sliced Pork Belly (Daepae Samgyeopsal)", zh: "薄切五花肉", ja: "薄切り豚バラ(テペサムギョプサル)", vi: "Ba chỉ heo thái mỏng" } },
      { price: 180000, name: { ko: "냉동삼겹살", en: "Frozen Pork Belly (Naengdong Samgyeopsal)", zh: "冷冻五花肉", ja: "冷凍豚バラ(サムギョプサル)", vi: "Ba chỉ heo đông lạnh" } },
      { price: 200000, name: { ko: "생삼겹살", en: "Fresh Pork Belly (Saeng Samgyeopsal)", zh: "鲜五花肉", ja: "生の豚バラ(サムギョプサル)", vi: "Ba chỉ heo tươi" } },
      { price: 220000, name: { ko: "항정살", en: "Pork Jowl (Hangjeongsal)", zh: "猪颈肉", ja: "豚トロ(ハンジョンサル)", vi: "Thịt heo má" } },
      { price: 220000, name: { ko: "우삼겹", en: "Beef Brisket Slices (Usamgyeop)", zh: "牛五花", ja: "牛バラ薄切り(ウサムギョプ)", vi: "Ba chỉ bò" } },
      { tag: "best", price: 700000, photo: "img/geotjeori-bossam.jpg", name: { ko: "겉절이보쌈", en: "Boiled Pork with Fresh Kimchi (Geotjeori Bossam)", zh: "鲜泡菜白切肉(Bossam)", ja: "ボッサム(浅漬けキムチ添え)", vi: "Thịt heo luộc ăn kèm kim chi tươi (Bossam)" } },
      { tag: "best", price: 1200000, photo: "img/hongeo-samhap.jpg", name: { ko: "홍어삼합", en: "Fermented Skate, Pork & Kimchi (Hongeo Samhap)", zh: "鳐鱼三合(发酵鳐鱼、猪肉、泡菜)", ja: "ホンオサムハプ(発酵エイ・豚肉・キムチ)", vi: "Hongeo Samhap (cá đuối lên men, thịt heo, kim chi)" } },
      { tag: "best", price: 700000, name: { ko: "낭만세트", en: "Nangman Set", zh: "浪漫套餐", ja: "ナンマンセット", vi: "Set Nangman" }, desc: { ko: "550g · 우삼겹 + 생삼겹 + 항정살 + 팥빙수 1", en: "550g · Beef brisket + fresh pork belly + pork jowl + 1 patbingsu", zh: "550g · 牛五花 + 鲜五花肉 + 猪颈肉 + 红豆刨冰1份", ja: "550g・牛バラ + 生豚バラ + 豚トロ + パッピンス1", vi: "550g · Ba chỉ bò + ba chỉ heo tươi + heo má + 1 patbingsu" } },
      { price: 650000, name: { ko: "명랑세트", en: "Myeongnang Set", zh: "明朗套餐", ja: "ミョンランセット", vi: "Set Myeongnang" }, desc: { ko: "550g · 냉동삼겹 + 생삼겹 + 항정살 + 팥빙수 1", en: "550g · Frozen pork belly + fresh pork belly + pork jowl + 1 patbingsu", zh: "550g · 冷冻五花肉 + 鲜五花肉 + 猪颈肉 + 红豆刨冰1份", ja: "550g・冷凍豚バラ + 生豚バラ + 豚トロ + パッピンス1", vi: "550g · Ba chỉ đông lạnh + ba chỉ tươi + heo má + 1 patbingsu" } },
    ],
  },
  {
    id: "side",
    name: { ko: "한잔 더 사이드", en: "Side dishes to go with a drink", zh: "下酒小菜", ja: "おつまみ", vi: "Món nhậu" },
    items: [
      { tag: "best", price: 300000, name: { ko: "육회", en: "Beef Tartare (Yukhoe)", zh: "生拌牛肉", ja: "ユッケ", vi: "Bò sống trộn (Yukhoe)" } },
      { tag: "best", price: 300000, name: { ko: "육전", en: "Beef Pancake (Yukjeon)", zh: "煎牛肉饼", ja: "牛肉のジョン(ユクジョン)", vi: "Thịt bò chiên bột trứng (Yukjeon)" } },
      { price: 200000, name: { ko: "호박전 / 부추전", en: "Zucchini or Chive Pancake (Hobak-jeon / Buchu-jeon)", zh: "西葫芦煎饼 / 韭菜煎饼", ja: "ズッキーニのジョン / ニラチヂミ", vi: "Bánh bí xanh / Bánh hẹ" } },
      { price: 150000, photo: "img/gamjajeon.jpg", name: { ko: "감자전", en: "Potato Pancake (Gamja-jeon)", zh: "土豆煎饼", ja: "ジャガイモのチヂミ", vi: "Bánh khoai tây" } },
      { tag: "best", price: 400000, name: { ko: "미니보쌈", en: "Mini Boiled Pork (Mini Bossam)", zh: "迷你白切肉(Bossam)", ja: "ミニボッサム", vi: "Bossam mini (thịt heo luộc)" } },
      { tag: "best", price: 400000, name: { ko: "냉수육", en: "Cold Boiled Pork (Naengsuyuk)", zh: "凉拌白切肉", ja: "冷たいゆで豚(ネンスユク)", vi: "Thịt heo luộc nguội (Naengsuyuk)" } },
      { price: 450000, name: { ko: "골뱅이무침", en: "Spicy Whelk Salad (Golbaengi Muchim)", zh: "凉拌海螺", ja: "ツブ貝の和え物(コルベンイムチム)", vi: "Gỏi ốc (Golbaengi)" } },
      { price: 400000, name: { ko: "오징어 초무침", en: "Squid with Vinegar Dressing (Ojingeo Chomuchim)", zh: "醋拌鱿鱼", ja: "イカの酢和え", vi: "Gỏi mực trộn giấm" } },
      { tag: "best", spicy: true, price: 400000, name: { ko: "오징어 두루치기", en: "Spicy Stir-fried Squid (Ojingeo Duruchigi)", zh: "辣炒鱿鱼", ja: "イカのトゥルチギ(辛味炒め)", vi: "Mực xào cay (Duruchigi)" } },
      { price: 200000, photo: "img/dubu-kimchi.jpg", name: { ko: "두부김치", en: "Tofu with Stir-fried Kimchi (Dubu Kimchi)", zh: "豆腐配炒泡菜", ja: "豆腐キムチ", vi: "Đậu hũ ăn kèm kim chi xào" } },
      { price: 200000, name: { ko: "계란말이", en: "Rolled Omelette (Gyeran Mari)", zh: "韩式蛋卷", ja: "卵焼き(ケランマリ)", vi: "Trứng cuộn" } },
      { price: 80000, name: { ko: "팥빙수", en: "Red Bean Shaved Ice (Patbingsu)", zh: "红豆刨冰", ja: "パッピンス(小豆かき氷)", vi: "Patbingsu (đá bào đậu đỏ)" } },
    ],
  },
  {
    id: "meal",
    name: { ko: "식사", en: "Meals & noodles", zh: "主食", ja: "お食事", vi: "Món ăn no" },
    items: [
      { price: 120000, name: { ko: "술밥 (김치 / 된장)", en: "Sul-bap, Rice Soup for After Drinks (Kimchi / Doenjang)", zh: "解酒汤饭(泡菜 / 大酱)", ja: "酒ご飯スープ(キムチ / 味噌)", vi: "Cơm canh ăn sau khi nhậu (kim chi / tương)" } },
      { price: 140000, name: { ko: "잔치국수 / 비빔국수", en: "Warm Noodle Soup / Spicy Mixed Noodles (Janchi / Bibim Guksu)", zh: "宴会汤面 / 拌面", ja: "チャンチククス(温麺)/ ビビンククス", vi: "Mì nước / Mì trộn cay" } },
      { price: 140000, name: { ko: "김치말이국수", en: "Kimchi Noodle Soup (Kimchi Mari Guksu)", zh: "泡菜冷汤面", ja: "キムチマリ国麺(冷やしキムチ麺)", vi: "Mì nước kim chi" } },
      { price: 140000, name: { ko: "김치 / 된장 / 청국장 찌개", en: "Kimchi / Doenjang / Cheonggukjang Stew", zh: "泡菜 / 大酱 / 清麴酱汤", ja: "キムチ / 味噌 / チョングクジャンチゲ", vi: "Canh kim chi / tương / cheonggukjang" } },
    ],
  },
  {
    id: "extra",
    name: { ko: "추가", en: "Extras", zh: "加点", ja: "追加", vi: "Gọi thêm" },
    items: [
      { price: 40000, name: { ko: "볶음밥", en: "Fried Rice (Bokkeumbap)", zh: "炒饭", ja: "チャーハン", vi: "Cơm rang" } },
      { price: 20000, name: { ko: "공기밥", en: "Steamed Rice (Gongibap)", zh: "米饭", ja: "ご飯", vi: "Cơm trắng" } },
      { price: 80000, name: { ko: "계란라면", en: "Egg Ramen (Gyeran Ramyeon)", zh: "鸡蛋拉面", ja: "卵入りラーメン", vi: "Mì ramen trứng" } },
      { price: 80000, name: { ko: "짜파게티", en: "Chapagetti (Black Bean Instant Noodles)", zh: "炸酱方便面(Chapagetti)", ja: "チャパゲティ(インスタントチャジャン麺)", vi: "Chapagetti (mì tương đen)" } },
      { price: 40000, name: { ko: "사리추가", en: "Extra Noodles / Add-ins (Sari)", zh: "加面条等配料", ja: "サリ追加(麺などの追加)", vi: "Thêm sợi (mì, v.v.)" } },
    ],
  },
  {
    id: "drink",
    name: { ko: "주류·음료", en: "Drinks", zh: "酒类·饮料", ja: "お酒・ドリンク", vi: "Rượu & đồ uống" },
    items: [
      { price: 140000, name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "焼酎(ソジュ)", vi: "Rượu soju" } },
      { price: 140000, name: { ko: "막걸리", en: "Rice Wine (Makgeolli)", zh: "米酒(玛格利)", ja: "マッコリ", vi: "Rượu gạo Makgeolli" } },
      { price: 50000, name: { ko: "맥주", en: "Beer", zh: "啤酒", ja: "ビール", vi: "Bia" } },
      { price: 50000, name: { ko: "웰치스", en: "Welch's Soda", zh: "Welch's 葡萄汽水", ja: "ウェルチス(ぶどう炭酸)", vi: "Nước ngọt Welch's" } },
      { price: 20000, name: { ko: "콜라 / 사이다 / 환타", en: "Coke / Cider (Lemon-lime Soda) / Fanta", zh: "可乐 / 汽水 / 芬达", ja: "コーラ / サイダー / ファンタ", vi: "Coca / Cider (soda chanh) / Fanta" } },
    ],
  },
  {
    id: "special",
    name: { ko: "오늘의 별지 메뉴", en: "Wall specials", zh: "墙上特别菜单", ja: "壁の特別メニュー", vi: "Món đặc biệt trên tường" },
    note: {
      ko: "벽에 붙은 안내 종이 기준이며 시기에 따라 바뀔 수 있어요",
      en: "Based on the paper notices on the wall; may change with the season",
      zh: "以墙上张贴的告示为准，可能随时节变动",
      ja: "壁に貼られた案内紙に基づいており、時期により変わることがあります",
      vi: "Theo giấy thông báo dán trên tường, có thể thay đổi theo thời điểm",
    },
    items: [
      { price: 200000, name: { ko: "어리굴젓 (큰 접시, 250g)", en: "Salted Oysters with Chili (Eorigul-jeot), large plate 250g", zh: "辣腌牡蛎(大盘 250g)", ja: "オリグルジョッ(辛味塩辛の牡蠣・大皿250g)", vi: "Hàu muối cay (Eorigul-jeot), đĩa lớn 250g" } },
      { price: 80000, name: { ko: "갈치속젓밥", en: "Rice with Salted Cutlassfish Innards (Galchi-sokjeot Bap)", zh: "带鱼内脏酱拌饭", ja: "カルチ内臓塩辛ご飯", vi: "Cơm mắm ruột cá hố (Galchi-sokjeot)" }, desc: { ko: "계란 추가 +20,000", en: "Add an egg +20,000", zh: "加鸡蛋 +20,000", ja: "卵追加 +20,000", vi: "Thêm trứng +20,000" } },
      { sizes: [["S", 400000], ["L", 800000]], name: { ko: "불맛 마늘항정 수육", en: "Fire-grilled Garlic Pork Jowl, Boiled (Bulmat Maneul Hangjeong Suyuk)", zh: "火烤蒜香猪颈肉白切", ja: "火入れにんにく豚トロのスユク", vi: "Heo má tỏi nướng lửa rồi luộc (Suyuk)" }, desc: { ko: "S = 미니, L = 대", en: "S = Mini, L = Large", zh: "S = 迷你，L = 大份", ja: "S = ミニ、L = 大", vi: "S = Mini, L = Lớn" } },
      { tag: "best", sizes: [["M", 700000], ["L", 1000000]], name: { ko: "구룡포 과메기 (개시!)", en: "Guryongpo Gwamegi, Semi-dried Pacific Saury (Now in season!)", zh: "九龙浦半干秋刀鱼(Gwamegi，开卖！)", ja: "九龍浦クァメギ(半乾燥サンマ・販売開始！)", vi: "Gwamegi Guryongpo (cá thu đao sấy bán khô, đã có hàng!)" } },
    ],
  },
];
