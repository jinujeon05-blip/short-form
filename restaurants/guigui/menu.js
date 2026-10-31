// 구이구이 Gui92 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진(2026-10-30 수집, 올린 날짜 미상), 가격이 다르면 높은 쪽
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "구이구이", en: "Gui92" },
  phone: "022 2654 9292",
  address: "Tòa nhà Viglacere ngã 6, Đ. Lý Thái Tổ, Xóm 10, Võ Cường, Bắc Ninh",
  wifi: null,
  hours: null, // 구글 지도에 영업시간 없음(2026-10-30 확인)
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ ...(price != null ? { price } : {}), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const ds = (ko, en, zh, ja, vi) => ({ desc: { ko, en, zh, ja, vi } });

window.MENU = [
  {
    id: "pork",
    name: T("돼지고기 구이", "Grilled Pork", "烤猪肉", "豚肉焼き", "Thịt lợn"),
    items: [
      it(159000, "samgyeopsal", "볏짚통삼겹살", "Straw-smoked Whole Pork Belly (Byeotjip Tong Samgyeopsal)", "稻草熏整块五花肉", "ワラ燻製 豚バラ塊焼き", "Ba chỉ heo xông khói nguyên tảng", { tag: "must" }),
      it(139000, "saengsamgyeop", "생삼겹살", "Fresh Pork Belly (Saeng Samgyeopsal)", "生五花肉", "生サムギョプサル", "Ba chỉ heo tươi"),
      it(139000, null, "목살", "Pork Neck (Moksal)", "猪颈肉", "豚肩ロース（モクサル）", "Nạc vai heo"),
      it(159000, null, "항정살", "Pork Jowl (Hangjeongsal)", "猪颈脖肉", "豚トロ（ハンジョンサル）", "Má heo"),
      it(159000, null, "양념돼지고기", "Marinated Pork (Yangnyeom Dwaejigogi)", "腌制猪肉", "味付け豚肉（ヤンニョム）", "Thịt heo tẩm gia vị"),
      it(139000, null, "대패삼겹살", "Thinly Sliced Pork Belly (Daepae Samgyeopsal)", "刨片五花肉", "薄切り豚バラ（テペサムギョプサル）", "Thịt heo bào mỏng"),
    ],
  },
  {
    id: "beef",
    name: T("소고기 구이", "Grilled Beef", "烤牛肉", "牛肉焼き", "Thịt bò"),
    items: [
      it(550000, null, "꽃갈비살", "Boneless Short Rib (Kkot Galbisal)", "花排肉", "花カルビ", "Sườn bò không xương"),
      it(250000, null, "늑간살", "Rib Finger Meat (Neukgansal)", "肋间肉", "肋間肉（ヌッカンサル）", "Dẻ sườn bò Mỹ"),
      it(220000, null, "부채살", "Top Blade (Buchaesal)", "扇形牛肉", "ハネシタ（プチェサル）", "Lõi vai bò Mỹ"),
      it(240000, null, "황제양념갈비살", "Emperor Marinated Short Rib (Hwangje Yangnyeom Galbisal)", "皇帝腌制排骨肉", "皇帝味付けカルビ", "Sườn hoàng đế tẩm gia vị"),
      it(160000, null, "우삼겹", "Beef Belly (Usamgyeop)", "牛五花", "牛バラ（ウサムギョプ）", "Ba chỉ bò Mỹ"),
      it(180000, null, "양념우삼겹", "Marinated Beef Belly (Yangnyeom Usamgyeop)", "腌制牛五花", "味付け牛バラ", "Ba chỉ bò Mỹ tẩm gia vị"),
      it(350000, null, "LA갈비", "LA Galbi (LA-style Short Ribs)", "LA排骨", "LAカルビ", "Sườn tẩm LA"),
      it(350000, null, "육회", "Beef Tartare (Yukhoe)", "生拌牛肉", "ユッケ", "Gỏi bò"),
    ],
  },
  {
    id: "set",
    name: T("세트 메뉴", "Combo Sets", "套餐", "セットメニュー", "Set Combo"),
    items: [
      it(490000, null, "세트A", "Set A", "A套餐", "セットA", "Set A", ds("볏짚삼겹살 · 목살 · 항정살 · 대패삼겹살 · 돼지껍데기", "Straw-smoked pork belly · pork neck · pork jowl · thin-sliced pork belly · pork skin", "稻草熏五花肉 · 猪颈肉 · 猪颈脖肉 · 刨片五花肉 · 猪皮", "ワラ燻製豚バラ・モクサル・ハンジョンサル・薄切り豚バラ・豚皮", "Ba chỉ heo xông khói · nạc vai · má heo · thịt heo bào · bì heo")),
      it(850000, null, "세트B", "Set B", "B套餐", "セットB", "Set B", ds("항정살 · 목살 · 늑간살 · 부채살 + 비빔밥 또는 알밥", "Pork jowl · pork neck · rib finger meat · top blade + bibimbap or albap", "猪颈脖肉 · 猪颈肉 · 肋间肉 · 扇形牛肉 + 拌饭或鱼子饭", "ハンジョンサル・モクサル・肋間肉・ハネシタ＋ビビンバまたはアルパプ", "Má heo · nạc vai · dẻ sườn bò · lõi vai bò + cơm trộn hoặc cơm niêu trứng cá")),
      it(990000, null, "세트C", "Set C", "C套餐", "セットC", "Set C", ds("꽃갈비살 · 늑간살 · 부채살 · 황제양념갈비살", "Boneless short rib · rib finger meat · top blade · emperor marinated short rib", "花排肉 · 肋间肉 · 扇形牛肉 · 皇帝腌制排骨肉", "花カルビ・肋間肉・ハネシタ・皇帝味付けカルビ", "Sườn bò không xương · dẻ sườn bò · lõi vai bò · sườn hoàng đế tẩm gia vị")),
      it(990000, null, "세트D", "Set D", "D套餐", "セットD", "Set D", ds("늑간살 · 황제갈비살 · 소불고기전골", "Rib finger meat · emperor short rib · beef bulgogi hot pot", "肋间肉 · 皇帝排骨肉 · 牛肉烤肉火锅", "肋間肉・皇帝カルビ・牛プルコギチョンゴル", "Dẻ sườn bò · sườn hoàng đế · lẩu bò bulgogi")),
    ],
  },
  {
    id: "lunch",
    name: T("점심특선 · 1인 정식", "Lunch Specials · Single Sets", "午市特餐 · 单人套餐", "ランチ特選・1人定食", "Cơm phần 1 người"),
    items: [
      it(160000, null, "삼겹정식", "Pork Belly Set (Samgyeop Jeongsik)", "五花肉套餐", "サムギョプ定食", "Ba chỉ heo nướng"),
      it(160000, null, "제육정식", "Spicy Stir-fried Pork Set (Jeyuk Jeongsik)", "辣炒猪肉套餐", "豚肉辛口炒め定食（チェユク）", "Bắp heo xào cay", { spicy: true }),
      it(200000, null, "소불고기정식", "Beef Bulgogi Set (So Bulgogi Jeongsik)", "牛肉烤肉套餐", "牛プルコギ定食", "Bò xào (bulgogi)"),
    ],
  },
  {
    id: "stew",
    name: T("전골 · 찌개 · 국", "Hot Pots, Stews & Soups", "火锅 · 炖汤 · 汤", "チョンゴル・チゲ・スープ", "Lẩu & Canh"),
    items: [
      it(450000, null, "우삼겹김치전골", "Kimchi Hot Pot with Beef Belly (Usamgyeop Kimchi Jeongol)", "牛五花泡菜火锅", "牛バラキムチチョンゴル", "Lẩu kim chi ba chỉ bò Mỹ"),
      it(400000, null, "앞다리살김치전골", "Kimchi Hot Pot with Pork Shoulder (Apdarisal Kimchi Jeongol)", "前腿肉泡菜火锅", "豚前脚肉キムチチョンゴル", "Lẩu kim chi bắp heo"),
      it(550000, null, "소불고기전골", "Beef Bulgogi Hot Pot (So Bulgogi Jeongol)", "牛肉烤肉火锅", "牛プルコギチョンゴル", "Lẩu bò bulgogi"),
      it(550000, null, "부대찌개", "Army Stew (Budae-jjigae)", "部队锅", "プデチゲ", "Canh thập cẩm (budae-jjigae)"),
      it(600000, null, "사태전골", "Beef Shank Hot Pot (Satae Jeongol)", "牛腱火锅", "牛すね肉チョンゴル", "Lẩu bắp bò Mỹ"),
      it(130000, null, "김치찌개", "Kimchi Stew (Kimchi-jjigae)", "泡菜汤", "キムチチゲ", "Canh kim chi", ds("고기 드신 후 찌개로는 70,000", "70,000 VND as a stew after ordering meat", "吃完肉后加点汤为70,000", "お肉のあとにチゲだけ頼む場合は70,000", "Gọi canh sau khi ăn thịt: 70.000")),
      it(130000, "doenjang", "된장찌개", "Soybean Paste Stew (Doenjang-jjigae)", "大酱汤", "テンジャンチゲ", "Canh tương đậu", ds("고기 드신 후 찌개로는 70,000", "70,000 VND as a stew after ordering meat", "吃完肉后加点汤为70,000", "お肉のあとにチゲだけ頼む場合は70,000", "Gọi canh sau khi ăn thịt: 70.000")),
      it(140000, null, "청국장", "Fermented Soybean Stew (Cheonggukjang)", "清麴酱汤", "チョングッチャン", "Súp tương đậu lên men"),
      it(200000, null, "소고기된장술국", "Beef Soybean Paste Soup (Sogogi Doenjang Sulguk)", "牛肉大酱醒酒汤", "牛肉テンジャンスルクク", "Canh tương đậu thịt bò Mỹ"),
      it(200000, null, "갈비탕", "Beef Short Rib Soup (Galbitang)", "排骨汤", "カルビタン", "Canh sườn bò"),
      it(160000, null, "육개장", "Spicy Beef Soup (Yukgaejang)", "辣牛肉汤", "ユッケジャン", "Canh bò cay", { spicy: true }),
    ],
  },
  {
    id: "stirfry",
    name: T("볶음 · 찜", "Stir-fries & Braised Dishes", "炒菜 · 炖菜", "炒め物・蒸し煮", "Món xào & Hầm"),
    items: [
      it(500000, "galbijjim", "순살소갈비찜", "Boneless Braised Beef Short Ribs (Sunsal So Galbijjim)", "无骨炖牛排骨", "骨なし牛カルビチム", "Dẻ sườn bò hầm"),
      it(400000, null, "콩나물불고기", "Pork Bulgogi with Bean Sprouts (Kongnamul Bulgogi)", "豆芽烤肉", "もやしプルコギ", "Thịt heo xào giá đậu tương"),
      it(400000, null, "파소불고기", "Beef Bulgogi with Scallions (Pa So Bulgogi)", "葱香牛肉烤肉", "ネギ牛プルコギ", "Bò xào bulgogi hành"),
      it(380000, null, "쭈꾸미볶음", "Stir-fried Webfoot Octopus (Jjukkumi Bokkeum)", "辣炒小章鱼", "イイダコ炒め（ジュクミ）", "Bạch tuộc xào", { spicy: true }),
      it(350000, null, "오징어볶음", "Stir-fried Squid (Ojingeo Bokkeum)", "辣炒鱿鱼", "イカ炒め（オジンオポックム）", "Mực xào", { spicy: true }),
      it(300000, null, "파두루치기", "Stir-fried Pork with Scallions (Pa Duruchigi)", "葱炒猪肉", "ネギ豚炒め（パドゥルチギ）", "Thịt heo xào hành"),
    ],
  },
  {
    id: "meal",
    name: T("식사 · 면", "Rice & Noodles", "米饭 · 面", "ご飯・麺", "Cơm & Mì"),
    items: [
      it(130000, null, "비빔밥", "Bibimbap", "拌饭", "ビビンバ", "Cơm trộn"),
      it(130000, null, "알밥", "Fish Roe Rice in Hot Stone Pot (Albap)", "鱼子石锅饭", "魚卵ご飯（アルパプ）", "Cơm niêu trộn trứng cá"),
      it(90000, null, "도시락", "Lunch Box (Dosirak)", "便当", "お弁当（トシラク）", "Cơm hộp"),
      it(120000, "haemulramyeon", "해물라면", "Seafood Ramyeon (Haemul Ramyeon)", "海鲜拉面", "海鮮ラーメン", "Mỳ hải sản"),
      it(120000, null, "물냉면", "Cold Buckwheat Noodles in Broth (Mul Naengmyeon)", "水冷面", "水冷麺（ムルネンミョン）", "Mỳ lạnh"),
      it(160000, null, "갈쌈냉면", "Cold Noodles with Marinated Pork (Galssam Naengmyeon)", "腌猪肉冷面", "味付け豚肉入り冷麺（カルサムネンミョン）", "Mỳ lạnh + thịt heo tẩm"),
      it(130000, "bibimnaengmyeon", "비빔냉면", "Spicy Mixed Cold Noodles (Bibim Naengmyeon)", "辣拌冷面", "ビビン冷麺（ビビンネンミョン）", "Mỳ lạnh trộn", { spicy: true }),
    ],
  },
  {
    id: "side",
    name: T("사이드", "Sides", "小菜", "サイドメニュー", "Món phụ"),
    note: T("고기를 주문한 뒤 주문할 수 있어요", "Available after ordering meat", "点肉后方可点此类", "お肉を注文した後に注文できます", "Gọi sau khi đã gọi thịt"),
    items: [
      it(50000, null, "계란찜", "Steamed Egg (Gyeran-jjim)", "蒸蛋", "韓国式茶碗蒸し（ケランチム）", "Trứng hấp"),
      it(100000, null, "소세지버섯구이", "Grilled Sausage & Mushrooms (Sosiji Beoseot Gui)", "烤香肠蘑菇", "ソーセージときのこ焼き", "Xúc xích + nấm nướng"),
      it(90000, null, "돼지껍데기", "Grilled Pork Skin (Dwaeji Kkeopdegi)", "烤猪皮", "豚皮焼き（テジコプテギ）", "Bì heo nướng"),
      it(80000, null, "계란말이", "Rolled Omelet (Gyeran Mari)", "鸡蛋卷", "卵焼き（ケランマリ）", "Trứng cuộn"),
      it(100000, null, "떡볶이", "Tteokbokki (Spicy Rice Cakes)", "炒年糕", "トッポッキ", "Tokbokki"),
    ],
  },
  {
    id: "drinks",
    name: T("주류 · 음료", "Drinks", "酒水 · 饮料", "お酒・ドリンク", "Đồ uống"),
    items: [
      it(40000, null, "타이거 맥주", "Tiger Beer", "虎牌啤酒", "タイガービール", "Bia Tiger"),
      it(50000, null, "하이네켄 맥주", "Heineken Beer", "喜力啤酒", "ハイネケンビール", "Bia Heineken"),
      it(50000, null, "사이공 맥주", "Saigon Beer", "西贡啤酒", "サイゴンビール", "Bia Sài Gòn"),
      it(140000, null, "소주(참이슬·처음처럼)", "Soju (Chamisul · Chum Churum)", "烧酒（真露·初饮初乐）", "焼酎（チャミスル・チョウムチョロム）", "Rượu Soju"),
      it(100000, null, "좋은데이", "Good Day Soju (Joeun Day)", "好日子烧酒", "チョウンデー焼酎", "Rượu Gooday"),
      it(null, null, "베트남 보드카", "Vietnamese Vodka", "越南伏特加", "ベトナムウォッカ", "Rượu Vodka Việt Nam", { sizes: [["300ml", 100000], ["500ml", 140000]] }),
      it(160000, null, "국순당 막걸리", "Kooksoondang Makgeolli", "国顺堂马格利", "麹醇堂マッコリ", "Rượu gạo Kooksoondang"),
      it(160000, null, "알밤 막걸리", "Chestnut Makgeolli (Alpam Makgeolli)", "栗子马格利", "栗マッコリ（アルバム）", "Rượu gạo vị hạt dẻ"),
      it(25000, null, "아침햇살", "Morning Sunshine Rice Drink (Achim Haetsal)", "朝阳米露", "朝の光（アチムヘッサル）米飲料", "Nước gạo"),
      it(25000, null, "알로에농장", "Aloe Farm Drink", "芦荟农场饮料", "アロエ農場ドリンク", "Nước nha đam"),
      it(20000, null, "콜라", "Cola", "可乐", "コーラ", "Coca-Cola"),
      it(20000, null, "환타", "Fanta", "芬达", "ファンタ", "Fanta"),
      it(20000, null, "스프라이트", "Sprite", "雪碧", "スプライト", "Sprite"),
    ],
  },
];
