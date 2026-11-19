// 수원성 하노이 한식당(Suwonsung, Mễ Trì Hạ) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음). 출처: 구글 지도에 올라온 메뉴판 사진(2026-11-06 수집). 같은 메뉴가 사진마다 다르면 높은 쪽 가격(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "수원성 하노이", en: "Suwonsung Hanoi" },
  phone: "02436647888",
  address: "TT4 P. Trần Văn Lai, Khu đô thị Mễ Trì Hạ, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:00 – 22:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "beef",
    name: T("소고기", "Beef", "牛肉", "牛肉", "Thịt bò"),
    note: T("프라임급 소고기 · VAT 별도", "Prime-grade beef · VAT not included", "优质牛肉 · 不含VAT", "プライム級牛肉 · VAT別", "Thịt bò prime · Chưa gồm VAT"),
    items: [
      it(2000000, null, T("수원성 소모듬 (900g)", "Suwonsung Mixed Beef (900g)", "水原城牛肉拼盘 (900g)", "水原城 牛肉盛り合わせ (900g)", "Thịt bò tổng hợp Suwonsung (900g)"), { tag: "best" }),
      it(300000, null, T("생갈비살 (150g)", "Fresh Beef Short Rib Meat (150g)", "鲜牛排骨肉 (150g)", "生カルビ肉 (150g)", "Thịt sườn bò (150g)")),
      it(300000, null, T("양념 갈비살 (150g)", "Marinated Beef Short Rib Meat (150g)", "腌制牛排骨肉 (150g)", "味付けカルビ肉 (150g)", "Thịt sườn bò tẩm gia vị (150g)")),
      it(600000, null, T("꽃살 프라임 (150g)", "Prime Boneless Rib (150g)", "特级雪花牛肋肉 (150g)", "プライム 花カルビ (150g)", "Sườn không xương prime (150g)")),
      it(360000, null, T("부채살 (150g)", "Beef Blade Steak (150g)", "牛肩胛肉 (150g)", "ブレードステーキ(ブチェサル) (150g)", "Dẻ quạt bò (150g)")),
      it(480000, null, T("특양구이 (250g)", "Grilled Beef Tripe (250g)", "特级烤牛肚 (250g)", "特上ヤン焼き(牛の第一胃) (250g)", "Dạ dày bò nướng (250g)")),
      it(700000, null, T("수원성 양념왕갈비 (300g)", "Suwonsung Marinated Giant Beef Ribs (300g)", "水原城腌制特大牛排骨 (300g)", "水原城 味付け特大カルビ (300g)", "Sườn bò tẩm gia vị (300g)"), { tag: "must" }),
      it(400000, "yukhoe", T("육회 (200g)", "Beef Tartare (200g)", "韩式生牛肉 (200g)", "ユッケ (200g)", "Gỏi thịt bò (200g)")),
    ],
  },
  {
    id: "pork",
    name: T("돼지고기", "Pork", "猪肉", "豚肉", "Thịt lợn"),
    note: T("프라임급 베트남 돈육 · VAT 10% 별도", "Prime-grade Vietnamese pork · VAT 10% not included", "优质越南猪肉 · 不含10% VAT", "プライム級ベトナム産豚肉 · VAT10%別", "Thịt lợn Việt Nam prime · Chưa gồm VAT 10%"),
    items: [
      it(1000000, null, T("수원성 돼지모듬 (900g)", "Suwonsung Mixed Pork (900g)", "水原城猪肉拼盘 (900g)", "水原城 豚肉盛り合わせ (900g)", "Thịt lợn tổng hợp Suwonsung (900g)"), { tag: "best" }),
      it(240000, "samgyeop", T("삼겹살 (200g)", "Pork Belly (200g)", "五花肉 (200g)", "サムギョプサル (200g)", "Thịt ba chỉ (200g)")),
      it(240000, null, T("대패삼겹살 (200g)", "Thin-sliced Pork Belly (200g)", "薄切五花肉 (200g)", "薄切りサムギョプサル (200g)", "Thịt ba chỉ mỏng (200g)")),
      it(240000, null, T("목살 (200g)", "Pork Neck (200g)", "猪颈肉 (200g)", "豚首肉(モクサル) (200g)", "Thịt vai (200g)")),
      it(260000, null, T("항정살 (200g)", "Pork Jowl (200g)", "猪颈背肉 (200g)", "豚トロ(ハンジョンサル) (200g)", "Thịt má lợn (200g)")),
      it(300000, null, T("돼지갈비 (300g)", "Pork Ribs (300g)", "猪排骨 (300g)", "豚カルビ (300g)", "Thịt sườn lợn (300g)")),
      it(140000, null, T("돼지껍데기 (200g)", "Pork Skin (200g)", "烤猪皮 (200g)", "豚皮焼き(コプテギ) (200g)", "Da lợn (200g)")),
    ],
  },
  {
    id: "grill",
    name: T("구이 · 안주", "Grill & Side Dishes", "烧烤 · 下酒菜", "焼き物 · おつまみ", "Món nướng · Đồ ăn nhẹ"),
    note: T("VAT 별도", "VAT not included", "不含VAT", "VAT別", "Chưa gồm VAT"),
    items: [
      it([["한마리", 1200000], ["반마리", 600000]], null, T("장어구이", "Grilled Eel", "烤鳗鱼", "うなぎの塩焼き", "Lươn nướng")),
      it(200000, null, T("양념 닭발구이 (200g)", "Spicy Grilled Chicken Feet (200g)", "辣味烤鸡爪 (200g)", "味付け鶏足焼き (200g)", "Chân gà nướng cay (200g)"), { spicy: true }),
      it(300000, null, T("새우구이 (10마리)", "Grilled Shrimp (10 pcs)", "烤虾 (10只)", "海老焼き (10尾)", "Tôm nướng (10 con)")),
      it(240000, null, T("해물 부추전", "Seafood & Chive Pancake", "海鲜韭菜煎饼", "海鮮ニラチヂミ", "Bánh hải sản hẹ")),
      it(240000, null, T("해물 파전", "Seafood & Green Onion Pancake", "海鲜葱饼", "海鮮ネギチヂミ(パジョン)", "Bánh hải sản hành")),
      it(600000, null, T("동태지리 전골", "Pollock Hot Pot (Clear Broth)", "清汤明太鱼火锅", "スケトウダラのあっさり鍋(トンテジリ)", "Lẩu cá tuyết")),
      it(600000, null, T("소고기 버섯전골", "Beef & Mushroom Hot Pot", "牛肉蘑菇火锅", "牛肉ときのこの鍋", "Lẩu nấm và thịt bò")),
      it(500000, null, T("술국", "Hangover Soup (Sul-guk)", "醒酒汤", "酔い覚ましスープ", "Súp giải rượu (Sul-guk)")),
    ],
  },
  {
    id: "lunch",
    name: T("점심특선", "Lunch Specials", "午餐特惠套餐", "ランチ特選", "Món đặc biệt bữa trưa"),
    note: T("점심 한정(11시~14시) · 순두부 · 우거지탕 · 된장찌개 중 택1 · VAT 10% 별도", "Lunch only (11:00–14:00) · choose one: soft tofu stew, beef bone & cabbage soup, soybean paste stew · VAT 10% not included", "仅限午餐(11点~14点) · 嫩豆腐汤 · 白菜牛骨汤 · 大酱汤 任选其一 · 不含10% VAT", "ランチ限定(11時~14時) · スンドゥブ · ウゴジタン · テンジャンチゲから1つ選択 · VAT10%別", "Chỉ bữa trưa (11h–14h) · chọn 1: canh đậu phụ non, canh xương bò rau cải, canh tương · Chưa gồm VAT 10%"),
    items: [
      it(250000, null, T("돼지갈비 정식", "Pork Ribs Set", "猪排骨套餐", "豚カルビ定食", "Set sườn lợn")),
      it(250000, null, T("간장불고기 정식", "Soy Bulgogi Set", "酱油烤肉套餐", "醤油プルコギ定食", "Set bulgogi tẩm xì dầu")),
      it(240000, null, T("고등어구이 정식", "Grilled Mackerel Set", "烤青花鱼套餐", "焼きサバ定食", "Set cá thu nướng")),
    ],
  },
  {
    id: "meal",
    name: T("식사류", "Soups & Stews", "正餐", "お食事", "Món chính"),
    note: T("VAT 별도", "VAT not included", "不含VAT", "VAT別", "Chưa gồm VAT"),
    items: [
      it(180000, null, T("순두부찌개", "Soft Tofu Stew", "嫩豆腐汤", "スンドゥブチゲ", "Canh đậu phụ non")),
      it(180000, null, T("콩비지찌개", "Soybean Pulp Stew", "豆渣汤", "おからチゲ(コンビジチゲ)", "Canh đậu tương")),
      it(200000, null, T("어탕국수", "Fish Soup Noodles", "鱼汤面", "魚のスープ麺(オタンククス)", "Canh cá trê")),
      it(180000, null, T("소고기 따로국밥", "Beef & Radish Soup with Rice", "牛肉萝卜汤配饭", "牛肉と大根のスープ ご飯別盛り(タロクッパ)", "Canh củ cải thịt bò")),
      it(180000, null, T("사골 우거지탕", "Beef Bone & Cabbage Soup", "牛骨白菜汤", "牛骨ウゴジタン(干し白菜スープ)", "Canh xương bò rau cải")),
      it(180000, null, T("김치찜", "Braised Kimchi", "炖泡菜", "キムチチム(キムチの蒸し煮)", "Kimchi hầm"), { spicy: true }),
      it(180000, null, T("소고기미역국", "Beef Seaweed Soup", "牛肉海带汤", "牛肉わかめスープ", "Canh rong biển thịt bò")),
      it(200000, null, T("동태지리", "Pollock Soup (Clear Broth)", "清汤明太鱼汤", "スケトウダラのあっさりスープ(トンテジリ)", "Canh cá tuyết")),
      it(180000, null, T("만두국", "Dumpling Soup", "饺子汤", "餃子スープ(マンドゥクク)", "Canh mandu")),
      it(140000, null, T("된장찌개", "Soybean Paste Stew", "大酱汤", "テンジャンチゲ", "Canh tương")),
      it(160000, null, T("누룽지 + 된장찌개", "Scorched Rice + Mini Soybean Paste Stew", "锅巴 + 迷你大酱汤", "おこげ + ミニテンジャンチゲ", "Cơm cháy + canh tương nhỏ")),
      it(160000, "mandu", T("찐만두", "Steamed Dumplings", "蒸饺", "蒸し餃子", "Mandu hấp")),
    ],
  },
  {
    id: "noodle",
    name: T("냉면 · 면 · 후식", "Cold Noodles & Desserts", "冷面 · 面食 · 餐后", "冷麺 · 麺 · 食後", "Miến lạnh · Món mì · Tráng miệng"),
    note: T("후식가는 고기를 드신 뒤 식사 · VAT 10% 별도", "Dessert price applies after a meat order · VAT 10% not included", "餐后价适用于点烤肉之后的用餐 · 不含10% VAT", "食後価格はお肉を召し上がった後のお食事に適用 · VAT10%別", "Giá tráng miệng khi gọi thịt nướng · Chưa gồm VAT 10%"),
    items: [
      it([["식사", 160000], ["후식", 100000]], "mul", T("물 냉면", "Cold Noodles in Broth (Mul Naengmyeon)", "水冷面", "水冷麺(ムルネンミョン)", "Miến lạnh nước")),
      it([["식사", 160000], ["후식", 100000]], "bibim", T("비빔 냉면", "Spicy Mixed Cold Noodles (Bibim Naengmyeon)", "拌冷面", "ビビン冷麺", "Miến lạnh trộn"), { spicy: true }),
      it([["식사", 160000], ["후식", 100000]], null, T("회 냉면", "Cold Noodles with Raw Fish", "生鱼片冷面", "刺身冷麺(フェネンミョン)", "Miến lạnh gỏi cá"), { spicy: true }),
      it(160000, null, T("콩국수", "Cold Soybean Noodles", "冷豆浆面", "豆乳冷麺(コングクス)", "Mì sữa đậu nành")),
      it(200000, null, T("식사냉면 + 만두 3개", "Cold Noodles + 3 Dumplings", "正餐冷面 + 3个饺子", "冷麺(食事) + 餃子3個", "Miến lạnh + 3 mandu"), { desc: T("물 · 비빔 · 회냉면 중 선택", "Choose mul, bibim, or raw fish noodles", "水冷面 · 拌冷面 · 生鱼片冷面 任选", "水冷麺 · ビビン冷麺 · 刺身冷麺から選択", "Chọn miến nước, trộn hoặc gỏi cá") }),
      it(80000, null, T("냉면 사리 추가", "Extra Noodles", "加冷面", "冷麺の麺追加", "Thêm mì")),
      it(40000, null, T("후식 된장찌개", "Soybean Paste Stew (dessert size)", "餐后大酱汤", "食後テンジャンチゲ", "Canh tương (phần tráng miệng)")),
      it(40000, null, T("계란찜", "Steamed Egg", "蒸蛋", "韓国風茶碗蒸し(ケランチム)", "Trứng hấp")),
      it(20000, null, T("공깃밥", "Steamed Rice", "米饭", "ご飯", "Cơm trắng")),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒类 · 饮料", "お酒 · ドリンク", "Đồ uống"),
    note: T("VAT 별도", "VAT not included", "不含VAT", "VAT別", "Chưa gồm VAT"),
    items: [
      it(140000, null, T("소주 참이슬 (360ml)", "Soju Chamisul (360ml)", "烧酒 참이슬 (360ml)", "焼酎 チャミスル (360ml)", "Soju Chamisul (360ml)")),
      it(140000, null, T("소주 진로이즈백 (360ml)", "Soju Jinro Is Back (360ml)", "烧酒 真露Is Back (360ml)", "焼酎 ジンロイズバック (360ml)", "Soju Jinro Is Back (360ml)")),
      it(120000, null, T("소주 처음처럼 (360ml)", "Soju Chum Churum (360ml)", "烧酒 처음처럼 (360ml)", "焼酎 チョウムチョロム (360ml)", "Soju Chum Churum (360ml)")),
      it(120000, null, T("소주 좋은데이 (360ml)", "Soju Good Day (360ml)", "烧酒 좋은데이 (360ml)", "焼酎 チョウンデー (360ml)", "Soju Good Day (360ml)")),
      it(140000, null, T("소주 청춘 (360ml)", "Soju Chungchun (360ml)", "烧酒 青春 (360ml)", "焼酎 青春(チョンチュン) (360ml)", "Soju Chungchun (360ml)")),
      it(110000, null, T("보드카 (300ml)", "Vodka (300ml)", "伏特加 (300ml)", "ウォッカ (300ml)", "Vodka (300ml)")),
      it(500000, null, T("복분자 (375ml)", "Bokbunja Black Raspberry Wine (375ml)", "覆盆子酒 (375ml)", "覆盆子酒(ポクブンジャ) (375ml)", "Rượu mâm xôi đen Bokbunja (375ml)")),
      it(290000, null, T("백세주 (375ml)", "Baekseju (375ml)", "百岁酒 (375ml)", "百歳酒(ペクセジュ) (375ml)", "Baekseju (375ml)")),
      it(150000, null, T("막걸리 (750ml)", "Makgeolli (750ml)", "马格利 (750ml)", "マッコリ (750ml)", "Makgeolli (750ml)")),
      it(50000, null, T("타이거 맥주 (병)", "Tiger Beer (bottle)", "虎牌啤酒 (瓶)", "タイガービール (瓶)", "Bia Tiger (chai)")),
      it(150000, null, T("홍초", "Hongcho (vinegar drink)", "红醋饮料 (洪草)", "ホンチョ(紅酢ドリンク)", "Hongcho")),
      it(20000, null, T("음료수 (콜라 · 스프라이트 · 환타)", "Soft Drinks (Coke · Sprite · Fanta)", "饮料 (可乐 · 雪碧 · 芬达)", "ソフトドリンク (コーラ · スプライト · ファンタ)", "Nước ngọt (Coca · Sprite · Fanta)")),
    ],
  },
];
