// 돈오리(DONORI, 눈꽃삼겹살 & 오리BBQ 전문점, 하노이 Từ Liêm) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음). 출처: 구글 지도에 올라온 메뉴판 사진(2026-11-07 수집). 같은 메뉴가 사진마다 다르면 높은 쪽 가격(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "돈오리", en: "DONORI" },
  phone: "0838205252",
  address: "205 Đ. Đình Thôn, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:00 – 22:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });
const DUCK = (half, whole) => [["400g", half], ["800g", whole]];

window.MENU = [
  {
    id: "combo",
    name: T("콤보 세트", "Combo Sets", "组合套餐", "コンボセット", "Combo"),
    note: T("할인가 (DON COMBO 1 정가 739,000 · 2 정가 469,000 · ORI COMBO 정가 1,180,000)", "Discounted price (DON COMBO 1 regular 739,000 · 2 regular 469,000 · ORI COMBO regular 1,180,000)", "优惠价 (DON COMBO 1 原价 739,000 · 2 原价 469,000 · ORI COMBO 原价 1,180,000)", "割引価格 (DON COMBO 1 通常価格 739,000 · 2 通常価格 469,000 · ORI COMBO 通常価格 1,180,000)", "Giá ưu đãi (DON COMBO 1 giá gốc 739.000 · 2 giá gốc 469.000 · ORI COMBO giá gốc 1.180.000)"),
    items: [
      it(549000, null, T("DON COMBO 1 (600g)", "DON COMBO 1 (600g)", "DON COMBO 1 (600g)", "DON COMBO 1 (600g)", "Combo heo 1 (600g)"), { tag: "best", desc: T("눈꽃삼겹살 · 숙성목살 · 항정살 · 뒷고기", "Snowflake pork belly · Aged pork neck · Pork jowl · Pork trimmings (rear cuts)", "雪花五花肉 · 熟成猪颈肉 · 猪颈肉(项正肉) · 后腿碎肉", "雪花サムギョプサル · 熟成豚肩ロース · ハンジョンサル(豚トロ) · 豚の後ろ部位ミックス", "Ba chỉ heo hoa tuyết · Thịt vai heo ủ · Thịt má heo · Thịt heo phần sau") }),
      it(399000, null, T("DON COMBO 2 (450g)", "DON COMBO 2 (450g)", "DON COMBO 2 (450g)", "DON COMBO 2 (450g)", "Combo heo 2 (450g)"), { desc: T("눈꽃삼겹살 · 숙성목살 · 항정살", "Snowflake pork belly · Aged pork neck · Pork jowl", "雪花五花肉 · 熟成猪颈肉 · 猪颈肉(项正肉)", "雪花サムギョプサル · 熟成豚肩ロース · ハンジョンサル(豚トロ)", "Ba chỉ heo hoa tuyết · Thịt vai heo ủ · Thịt má heo") }),
      it(990000, null, T("ORI COMBO (800g)", "ORI COMBO (800g)", "ORI COMBO (800g)", "ORI COMBO (800g)", "Combo vịt (800g)"), { tag: "best", desc: T("오리 로스 반마리 400g + 오리 주물럭 반마리 400g", "Half grilled duck 400g (unmarinated) + half spicy marinated duck 400g", "半只烤鸭肉 400g(原味) + 半只辣酱腌鸭肉 400g", "鴨ロース半羽 400g(味付けなし) + 鴨チュムルロク半羽 400g(辛味付け)", "Vịt nướng ½ con 400g + Vịt xào cay ½ con 400g") }),
    ],
  },
  {
    id: "pork",
    name: T("돼지고기 구이", "Grilled Pork", "烤猪肉", "豚肉の焼き物", "Thịt heo nướng"),
    items: [
      it(180000, "samgyeop", T("눈꽃삼겹살 (180g)", "Nunkkot Samgyeopsal (Snowflake Thin-Sliced Pork Belly) (180g)", "雪花五花肉 (180g)", "雪花サムギョプサル(薄切り豚バラ) (180g)", "Ba chỉ heo hoa tuyết (180g)"), { tag: "must" }),
      it(180000, null, T("숙성목살 (180g)", "Sukseong Moksal (Aged Pork Neck) (180g)", "熟成猪颈肉 (180g)", "熟成モクサル(豚肩ロース) (180g)", "Thịt vai heo ủ (180g)")),
      it(199000, null, T("항정살 (180g)", "Hangjeongsal (Pork Jowl) (180g)", "猪颈肉(项正肉) (180g)", "ハンジョンサル(豚トロ) (180g)", "Thịt má heo (180g)")),
      it(180000, null, T("뒷고기 (180g)", "Dwitgogi (Pork Trimmings, Rear Cuts) (180g)", "后腿碎肉 (180g)", "ディッコギ(豚の後ろ部位ミックス) (180g)", "Thịt heo phần sau (180g)")),
    ],
  },
  {
    id: "duck",
    name: T("오리 BBQ", "Duck BBQ", "烤鸭", "鴨BBQ", "Vịt BBQ"),
    note: T("반마리 400g (2인분) · 한마리 800g (3~4인분)", "Half duck 400g (2 servings) · Whole duck 800g (3–4 servings)", "半只 400g (2人份) · 整只 800g (3~4人份)", "半羽 400g (2人前) · 1羽 800g (3~4人前)", "½ con 400g (2 người) · 1 con 800g (3–4 người)"),
    items: [
      it(DUCK(590000, 990000), "jumulleok", T("오리 주물럭", "Ori Jumulleok (Spicy Marinated Duck)", "辣酱腌鸭肉", "鴨チュムルロク(辛味付け鴨肉)", "Vịt xào cay"), { tag: "must", spicy: true }),
      it(DUCK(590000, 990000), "roast", T("오리 로스", "Ori Roseu (Grilled Sliced Duck, Unmarinated)", "烤鸭肉片(原味)", "鴨ロース(味付けなしの焼き鴨)", "Vịt nướng")),
      it(DUCK(590000, 990000), null, T("오리 불고기", "Ori Bulgogi (Marinated Duck)", "韩式烤鸭肉", "鴨プルコギ", "Vịt xào bulgogi")),
      it(30000, null, T("볶음밥 (1인분)", "Fried Rice (1 serving)", "炒饭 (1人份)", "チャーハン (1人前)", "Cơm chiên (1 phần)")),
    ],
  },
  {
    id: "special",
    name: T("특선 요리", "Special Dishes", "特色料理", "特選料理", "Món đặc biệt"),
    note: T("오리 영양전골 · 능이백숙은 사전 예약", "Duck nutritious hotpot · Neungi baeksuk: reservation required", "鸭肉养生火锅 · 能耳菌炖鸭/炖鸡需提前预订", "鴨の栄養チョンゴル · ヌンイペクスクは要予約", "Lẩu vịt bổ dưỡng · Vịt/gà hầm nấm: đặt trước"),
    items: [
      it(650000, "bossam", T("훈제오리 & 보쌈", "Smoked Duck & Bossam (Boiled Pork Wraps)", "烟熏鸭肉 & 菜包肉", "燻製鴨 & ポッサム(茹で豚)", "Vịt xông khói & thịt heo luộc"), { tag: "special" }),
      it(650000, null, T("훈제오리", "Smoked Duck", "烟熏鸭肉", "燻製鴨", "Vịt xông khói")),
      it(650000, null, T("보쌈", "Bossam (Boiled Pork Wraps)", "菜包肉", "ポッサム(茹で豚)", "Thịt heo luộc")),
      it(1100000, null, T("오리 영양전골 (예약)", "Ori Yeongyang Jeongol (Duck Nutritious Hotpot) (reservation)", "鸭肉养生火锅 (需预订)", "鴨の栄養チョンゴル(鍋) (要予約)", "Lẩu vịt bổ dưỡng (đặt trước)")),
      it(1500000, "baeksuk", T("오리 능이백숙 (예약)", "Ori Neungi Baeksuk (Whole Duck Soup with Neungi & Pine Mushrooms) (reservation)", "能耳菌松茸炖鸭 (需预订)", "鴨ヌンイペクスク(ヌンイ茸と松茸の丸ごと鴨スープ) (要予約)", "Vịt hầm nấm đông cô và nấm thông (đặt trước)")),
      it(1500000, null, T("닭 능이백숙 (예약)", "Dak Neungi Baeksuk (Whole Chicken Soup with Neungi & Pine Mushrooms) (reservation)", "能耳菌松茸炖鸡 (需预订)", "鶏ヌンイペクスク(ヌンイ茸と松茸の丸ごと鶏スープ) (要予約)", "Gà hầm nấm đông cô và nấm thông (đặt trước)")),
    ],
  },
  {
    id: "side",
    name: T("사이드 메뉴", "Side Dishes", "小菜 · 配菜", "サイドメニュー", "Món ăn kèm"),
    items: [
      it(300000, null, T("무뼈닭발", "Boneless Spicy Chicken Feet (Muppyeo Dakbal)", "无骨辣鸡爪", "骨なし鶏足(ピリ辛)", "Chân gà cay"), { spicy: true }),
      it(380000, null, T("갑오징어 회무침", "Gabojingeo Hoemuchim (Spicy Cuttlefish Salad)", "凉拌辣墨鱼", "甲イカの刺身和え(ピリ辛)", "Gỏi mực nang trộn cay"), { spicy: true }),
      it(300000, null, T("두부김치", "Dubu Kimchi (Tofu with Stir-Fried Kimchi)", "豆腐配炒泡菜", "豆腐キムチ(豆腐と炒めキムチ)", "Kim chi đậu phụ")),
      it(480000, null, T("골뱅이 소면", "Golbaengi Somyeon (Spicy Sea Snail with Somen Noodles)", "辣拌海螺素面", "ゴルベンイ・ソミョン(辛い巻貝そうめん和え)", "Gỏi ốc xoắn trộn mì sợi"), { spicy: true }),
      it(450000, null, T("육사시미", "Yuk Sashimi (Raw Beef Slices)", "生牛肉片", "ユッサシミ(生牛肉の刺身)", "Thịt bò sống")),
      it(450000, null, T("동태전", "Dongtaejeon (Pan-Fried Pollack)", "香煎明太鱼片", "トンテジョン(スケトウダラのチヂミ)", "Cá đông lạnh tẩm bột chiên")),
    ],
  },
  {
    id: "lunch",
    name: T("점심 세트", "Lunch Sets", "午餐套餐", "ランチセット", "Set ăn trưa"),
    note: T("11:00 – 14:00 · 솥밥 정식 · 2인 이상 주문 (돼지불백 · 제육볶음 · 뚝배기 불고기는 1인 가능)", "11:00 – 14:00 · Set meal with pot rice · Minimum 2 people (Pork bulgogi, spicy pork and hot-pot bulgogi: 1 person OK)", "11:00 – 14:00 · 锅饭套餐 · 2人起点(猪肉烤肉、辣炒猪肉、砂锅烤牛肉可1人点)", "11:00 – 14:00 · 釜飯定食 · 2名様以上でご注文(豚プルコギ・チェユクポックム・トゥッペギプルコギは1名様からOK)", "11:00 – 14:00 · Kèm cơm niêu · Áp dụng từ 2 người trở lên (Thịt heo bulgogi · Thịt heo xào cay · Bulgogi bò nồi đá: 1 người cũng được)"),
    items: [
      it(179000, null, T("눈꽃삼겹살 + 솥밥 정식", "Snowflake Pork Belly + Pot Rice Set", "雪花五花肉 + 锅饭套餐", "雪花サムギョプサル + 釜飯定食", "Ba chỉ heo hoa tuyết + Cơm niêu")),
      it(179000, null, T("숙성목살 + 솥밥 정식", "Aged Pork Neck + Pot Rice Set", "熟成猪颈肉 + 锅饭套餐", "熟成豚肩ロース + 釜飯定食", "Thịt vai heo ủ + Cơm niêu")),
      it(199000, null, T("항정살 + 솥밥 정식", "Pork Jowl + Pot Rice Set", "猪颈肉(项正肉) + 锅饭套餐", "ハンジョンサル(豚トロ) + 釜飯定食", "Thịt má heo + Cơm niêu")),
      it(199000, null, T("돼지불백 + 솥밥 정식", "Dwaeji Bulbaek (Pork Bulgogi) + Pot Rice Set", "韩式酱烤猪肉 + 锅饭套餐", "豚プルコギ(豚の甘辛焼き) + 釜飯定食", "Thịt heo bulgogi + Cơm niêu")),
      it(199000, null, T("제육볶음 + 솥밥 정식", "Jeyuk Bokkeum (Spicy Stir-Fried Pork) + Pot Rice Set", "辣炒猪肉 + 锅饭套餐", "豚肉の辛味炒め(チェユクポックム) + 釜飯定食", "Thịt heo xào cay + Cơm niêu"), { spicy: true }),
      it(199000, null, T("오리 주물럭 + 솥밥 정식", "Ori Jumulleok (Spicy Marinated Duck) + Pot Rice Set", "辣酱腌鸭肉 + 锅饭套餐", "鴨チュムルロク(辛味付け) + 釜飯定食", "Vịt xào cay + Cơm niêu"), { spicy: true }),
      it(199000, null, T("오리 로스구이 + 솥밥 정식", "Grilled Sliced Duck (Unmarinated) + Pot Rice Set", "烤鸭肉片(原味) + 锅饭套餐", "鴨ロース焼き(味付けなし) + 釜飯定食", "Vịt nướng + Cơm niêu")),
      it(199000, null, T("오리 불고기 + 솥밥 정식", "Ori Bulgogi (Marinated Duck) + Pot Rice Set", "韩式烤鸭肉 + 锅饭套餐", "鴨プルコギ + 釜飯定食", "Vịt bulgogi + Cơm niêu")),
      it(199000, null, T("뚝배기 불고기 + 솥밥 정식", "Ttukbaegi Bulgogi (Beef Bulgogi in Earthenware Pot) + Pot Rice Set", "砂锅烤牛肉 + 锅饭套餐", "土鍋プルコギ + 釜飯定食", "Bulgogi bò nồi đá + Cơm niêu")),
      it(199000, null, T("소불고기 + 솥밥 정식", "So Bulgogi (Beef Bulgogi) + Pot Rice Set", "韩式烤牛肉 + 锅饭套餐", "牛プルコギ + 釜飯定食", "Bò bulgogi + Cơm niêu")),
    ],
  },
  {
    id: "noodle",
    name: T("면 · 식사", "Noodles & Rice", "面食 · 主食", "麺・食事", "Mì & Cơm"),
    items: [
      it(180000, "naengmyeon", T("물냉면 + 서비스 불고기", "Mul Naengmyeon (Cold Noodles in Broth) + Free Bulgogi", "水冷面 + 赠送烤肉", "水冷麺 + サービスプルコギ", "Mì lạnh nước + Bulgogi")),
      it(180000, null, T("비빔냉면 + 서비스 불고기", "Bibim Naengmyeon (Spicy Cold Noodles) + Free Bulgogi", "拌冷面 + 赠送烤肉", "ビビン冷麺 + サービスプルコギ", "Mì lạnh trộn + Bulgogi"), { spicy: true }),
      it(190000, null, T("들기름 막국수", "Deulgireum Makguksu (Buckwheat Noodles with Perilla Oil)", "紫苏油荞麦面", "エゴマ油マッククス(そば粉の麺)", "Mì kiều mạch dầu tía tô")),
      it(130000, null, T("후식 물냉면", "Mul Naengmyeon (Dessert Size)", "水冷面 (餐后小份)", "水冷麺 (〆用ミニサイズ)", "Mì lạnh nước (tráng miệng)")),
      it(130000, null, T("후식 비빔냉면", "Bibim Naengmyeon (Dessert Size)", "拌冷面 (餐后小份)", "ビビン冷麺 (〆用ミニサイズ)", "Mì lạnh trộn cay (tráng miệng)"), { spicy: true }),
      it(40000, null, T("솥밥", "Sotbap (Pot Rice)", "锅饭", "釜飯", "Cơm nấu nồi")),
      it(30000, null, T("볶음밥", "Fried Rice", "炒饭", "チャーハン", "Cơm chiên thêm")),
      it(20000, null, T("공기밥", "Steamed Rice", "白米饭", "ご飯", "Cơm trắng")),
      it(40000, null, T("우동사리", "Add-on Udon Noodles", "加乌冬面", "追加うどん", "Mì udon thêm")),
      it(30000, null, T("라면사리", "Add-on Ramen Noodles", "加拉面", "追加ラーメン", "Mì ramen thêm")),
      it(30000, null, T("볶음용 라면사리", "Add-on Ramen Noodles (for Stir-Frying)", "加拉面 (炒制用)", "追加ラーメン (炒め用)", "Mì ramen luộc thêm")),
      it(30000, null, T("떡사리", "Add-on Rice Cakes (Tteok)", "加年糕", "追加トック(餅)", "Bánh gạo thêm")),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Alcohol & Drinks", "酒类 · 饮料", "お酒・ドリンク", "Đồ uống"),
    note: T("콜키지 테이블당 300,000", "Corkage fee 300,000 per table", "开瓶费 每桌 300,000", "持ち込み料 1テーブルにつき 300,000", "Phí corkage 300.000 / bàn"),
    items: [
      it(150000, null, T("참이슬", "Chamisul", "真露(Chamisul)", "チャミスル", "Chamisul")),
      it(150000, null, T("진로이즈백", "Jinro Is Back", "Jinro Is Back", "ジンロ イズバック", "Jinro Is Back")),
      it(150000, null, T("처음처럼", "Chum Churum", "初饮初乐(Chum Churum)", "チャムチュルム", "Chum Churum")),
      it(150000, null, T("새로", "Saero", "Saero", "セロ", "Saero")),
      it(130000, null, T("좋은데이", "Good Day", "Good Day", "グッドデイ", "Good Day")),
      it(170000, null, T("선양소주 (블루)", "Sunyang Soju (Blue)", "鲜阳烧酒 (蓝色)", "鮮陽焼酎(ブルー)", "Sunyang (Blue)")),
      it(190000, null, T("선양소주 (오크)", "Sunyang Soju (Oak)", "鲜阳烧酒 (橡木)", "鮮陽焼酎(オーク)", "Sunyang (Oak)")),
      it(600000, null, T("일품진로", "Ilpoom Jinro", "一品真露(Ilpoom Jinro)", "イルプム ジンロ", "Ilpoom Jinro")),
      it(190000, null, T("막걸리 (쌀 · 밤 · 생)", "Makgeolli (Rice · Chestnut · Draft)", "马格利米酒 (大米 · 栗子 · 鲜酿)", "マッコリ(米・栗・生)", "Makgeolli (gạo · hạt dẻ · tươi)")),
      it(350000, null, T("복분자주", "Bokbunja (Korean Black Raspberry Wine)", "覆盆子酒", "覆盆子酒(ポクブンジャ)", "Bokbunja")),
      it(50000, null, T("타이거", "Tiger", "虎牌啤酒(Tiger)", "タイガービール", "Tiger")),
      it(50000, null, T("하이네켄", "Heineken", "喜力(Heineken)", "ハイネケン", "Heineken")),
      it(50000, null, T("사이공", "Saigon", "西贡啤酒(Saigon)", "サイゴンビール", "Saigon")),
      it(25000, null, T("코카콜라", "Coca-Cola", "可口可乐", "コカ・コーラ", "Coca-Cola")),
      it(25000, null, T("코카콜라 제로", "Coca-Cola Zero", "零度可口可乐", "コカ・コーラ ゼロ", "Coca-Cola Zero")),
      it(25000, null, T("스프라이트", "Sprite", "雪碧", "スプライト", "Sprite")),
      it(25000, null, T("환타", "Fanta", "芬达", "ファンタ", "Fanta")),
    ],
  },
];
