// 오시마 야키니쿠(焼肉 大島 YAKINIKU OSHIMA, 일본식 와규 야키니쿠, 하노이 Kim Mã Thượng) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음). 출처: 구글 지도 손님 사진 메뉴판 책(menu_01·04·05·06, 2026-11-19 수집), 생맥주는 손님 영수증(menu_07). 메뉴판 하단: 봉사료 5%·VAT 별도.
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "오시마 야키니쿠", en: "Oshima Yakiniku" },
  phone: "038 983 9783",
  address: "54 P. Kim Mã Thượng, Ngọc Hà, Hà Nội",
  wifi: null,
  hours: "17:00 – 23:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "meibutsu",
    name: T("명물", "Signatures", "招牌名物", "名物", "Món đặc trưng"),
    items: [
      it(1000000, "sirloin", T("명물 오시마 서로인 (180g)", "Oshima Signature Sirloin (180g)", "招牌大岛西冷牛排 (180g)", "名物大島サーロイン（180g）", "Thăn ngoại Oshima đặc biệt (180g)"), { tag: "must" }),
      it(650000, "tan-steak", T("명물 특선 우설 스테이크 (1장)", "Signature Premium Beef Tongue Steak (1 piece)", "招牌特选牛舌牛排 (1片)", "名物特選タンステーキ（1枚）", "Bít tết lưỡi bò Oshima đặc biệt (1 miếng)"), { tag: "must" }),
      it(200000, "sukishabu", T("명물 스키샤부 (1장)", "Oshima Sukiyaki Shabu (1 slice)", "招牌寿喜涮牛肉 (1片)", "名物すきしゃぶ（1枚）", "Oshima Sukiyaki Shabu (1 miếng)"), { tag: "best",
        desc: T("얇게 썬 와규를 살짝 구워 날달걀에 찍어 먹는 메뉴", "Thin-sliced wagyu, lightly seared and dipped in raw egg", "薄切和牛稍微烤一下，蘸生鸡蛋液食用", "薄切り和牛をさっと焼いて溶き卵で", "Bò wagyu thái mỏng nướng sơ, chấm trứng sống") }),
    ],
  },
  {
    id: "tan",
    name: T("우설", "Beef Tongue", "牛舌", "タン", "Lưỡi bò"),
    items: [
      it(650000, null, T("특선 우설", "Premium Beef Tongue", "特选牛舌", "特選タン", "Lưỡi bò đặc biệt")),
      it(350000, null, T("상 파 우설", "Prime Beef Tongue with Green Onion", "上等葱香牛舌", "上ネギタン", "Lưỡi bò cao cấp kèm hành")),
      it(290000, null, T("상 우설", "Prime Beef Tongue", "上等牛舌", "上タン", "Lưỡi bò cao cấp")),
      it(90000, null, T("파 우설용 파 추가", "Extra Green Onion for Tongue", "牛舌用加量葱花", "ネギタンのネギ", "Hành lá dùng cho lưỡi bò")),
      it(90000, null, T("매운 파", "Spicy Green Onion", "辣味葱花", "辛ネギ", "Hành lá cay"), { spicy: true }),
    ],
  },
  {
    id: "wagyu",
    name: T("와규", "Wagyu", "和牛", "和牛", "Wagyu"),
    items: [
      it(1200000, null, T("샤토브리앙", "Chateaubriand", "夏多布里昂牛排", "シャトーブリアン", "Thăn nội Chateaubriand")),
      it(900000, null, T("안심 (히레)", "Tenderloin (Hire)", "牛里脊 (Hire)", "ヒレ", "Thăn nội")),
      it(750000, null, T("특선 안창살 (하라미)", "Premium Skirt Steak (Harami)", "特选牛横膈膜 (Harami)", "特選ハラミ", "Diềm thăn bò đặc biệt")),
      it(750000, null, T("오늘의 두툼한 컷", "Today's Thick Cut", "今日厚切", "本日の厚切り", "Bò thái lát dày đặc biệt theo ngày")),
      it(490000, null, T("특선 등심 (로스)", "Premium Loin (Rosu)", "特选牛肋脊 (Rosu)", "特選ロース", "Thăn bò đặc biệt")),
      it(490000, null, T("특선 갈비", "Premium Kalbi (Short Rib)", "特选牛小排 (Kalbi)", "特選カルビ", "Sườn bò đặc biệt")),
      it(490000, null, T("특선 부채살 (미스지)", "Premium Top Blade (Misuji)", "特选牛肩胛肉 (Misuji)", "特選ミスジ", "Lõi vai bò đặc biệt")),
      it(450000, null, T("보섭살 (이치보)", "Rump Cap (Ichibo)", "牛臀盖肉 (Ichibo)", "イチボ", "Ichibo - Đuôi thăn mông")),
      it(450000, null, T("우둔 (램프)", "Rump", "牛臀肉 (Rump)", "ランプ", "Rump - Thăn mông")),
      it(450000, null, T("상 안창살 (하라미)", "Prime Skirt Steak (Harami)", "上等牛横膈膜 (Harami)", "上ハラミ", "Diềm thăn bò cao cấp")),
      it(390000, null, T("상 갈비", "Prime Kalbi (Short Rib)", "上等牛小排 (Kalbi)", "上カルビ", "Thịt sườn bò cao cấp")),
      it(390000, null, T("상 등심 (로스)", "Prime Loin (Rosu)", "上等牛肋脊 (Rosu)", "上ロース", "Thịt thăn bò cao cấp")),
      it(390000, null, T("상 살코기 (아카미)", "Prime Lean Beef (Akami)", "上等牛瘦肉 (Akami)", "上赤身", "Thịt nạc bò cao cấp")),
      it(290000, null, T("갈비", "Kalbi (Short Rib)", "牛小排 (Kalbi)", "カルビ", "Thịt sườn bò")),
    ],
  },
  {
    id: "moriawase",
    name: T("모둠", "Platters", "拼盘", "盛り合わせ", "Set tổng hợp"),
    items: [
      it(1100000, null, T("특선 와규 오마카세 4종", "Premium Wagyu Omakase (4 cuts)", "特选和牛主厨精选 4种", "特選和牛おまかせ4種", "Set 4 loại Wagyu đặc biệt")),
      it(750000, null, T("와규 오마카세 4종", "Wagyu Omakase (4 cuts)", "和牛主厨精选 4种", "和牛おまかせ4種", "Set 4 loại Wagyu cao cấp")),
      it(500000, null, T("우설 3종 모둠", "Beef Tongue Platter (3 kinds)", "牛舌3种拼盘", "タン3種盛り合わせ", "Set 3 loại lưỡi tổng hợp")),
      it(350000, null, T("호르몬 모둠", "Offal Platter", "牛内脏拼盘", "ホルモン盛り合わせ", "Set nội tạng tổng hợp")),
    ],
  },
  {
    id: "yukke",
    name: T("와규 육회·초밥", "Wagyu Yukke & Sushi", "和牛生牛肉·寿司", "和牛ユッケ・寿司", "Yukke & Sushi Wagyu"),
    items: [
      it(590000, null, T("환상의 육회", "Oshima Maboroshi Yukke", "梦幻生牛肉 (Yukke)", "幻のユッケ", "Oshima Maboroshi Yukke")),
      it(390000, "yukke", T("와규 육회", "Wagyu Yukke (Beef Tartare)", "和牛生牛肉 (Yukke)", "和牛ユッケ", "Wagyu Yukke")),
      it(350000, null, T("불맛 육회 (아부리)", "Seared Wagyu Yukke", "炙烤和牛生牛肉 (Yukke)", "炙りユッケ", "Wagyu Yukke khò lửa")),
      it(350000, null, T("와규 마블링 초밥", "Marbled Wagyu Sushi", "和牛雪花寿司", "和牛霜降り寿司", "Sushi Wagyu thịt vân cẩm thạch")),
      it(300000, null, T("와규 살코기 초밥", "Lean Wagyu Sushi", "和牛瘦肉寿司", "和牛赤身寿司", "Sushi Wagyu thịt đỏ")),
      it(300000, null, T("요다레 소고기 (매운 소스)", "Yodare Beef (Spicy Sauce)", "口水牛肉 (辣酱)", "よだれ牛", "Bò sốt cay"), { spicy: true }),
    ],
  },
  {
    id: "hormone",
    name: T("호르몬 (내장)", "Hormone (Offal)", "牛内脏 (Hormone)", "ホルモン", "Nội tạng"),
    items: [
      it(240000, null, T("궁극의 소금 호르몬", "Ultimate Salt Hormone", "极致盐烤牛内脏", "究極の塩ホルモン", "Nội tạng bò muối")),
      it(240000, null, T("상 호르몬", "Prime Hormone", "上等牛内脏", "上ホルモン", "Nội tạng bò cao cấp")),
      it(240000, null, T("마루초 (소 소장)", "Marucho (Round Intestine)", "牛小肠 (Marucho)", "丸腸", "Lòng già")),
      it(240000, null, T("텟찬 (소 대창)", "Tetchan (Large Intestine)", "牛大肠 (Tetchan)", "テッチャン", "Lòng bò")),
      it(240000, null, T("상 미노 (양)", "Prime Mino (Rumen)", "上等牛肚 (Mino)", "上ミノ", "Sách bò cao cấp")),
      it(240000, null, T("생간", "Raw Liver", "生牛肝", "生レバー", "Gan sống")),
      it(120000, null, T("간", "Liver", "牛肝", "レバー", "Gan")),
      it(120000, null, T("벌집양 (하치노스)", "Honeycomb Tripe (Hachinosu)", "牛蜂巢胃 (Hachinosu)", "ハチノス", "Lá sách (Dạ dày tổ ong)")),
    ],
  },
  {
    id: "pork-chicken",
    name: T("돼지·닭", "Pork & Chicken", "猪肉·鸡肉", "豚・鶏", "Heo & Gà"),
    items: [
      it(180000, null, T("이베리코 돼지 목살", "Iberico Pork Shoulder Loin", "伊比利亚猪肩肉", "イベリコ豚肩ロース", "Thịt thăn vai heo Iberico")),
      it(150000, null, T("닭 목살 (세세리)", "Chicken Neck (Seseri)", "鸡颈肉 (Seseri)", "鶏せせり", "Thịt cổ gà")),
    ],
  },
  {
    id: "salad",
    name: T("샐러드·나물·김치", "Salad, Namul & Kimchi", "沙拉·拌菜·泡菜", "サラダ・ナムル・キムチ", "Salad, rau trộn & kimchi"),
    items: [
      it(160000, null, T("오시마 샐러드", "Oshima Salad", "大岛沙拉", "大島サラダ", "Salad Oshima")),
      it(160000, null, T("겉절이 샐러드 (초레기)", "Choregi Salad", "韩式生拌沙拉 (Choregi)", "チョレギサラダ", "Salad Choregi")),
      it(130000, null, T("쌈 상추", "Lettuce Wraps", "包肉生菜", "チシャ", "Xà lách")),
      it(199000, null, T("나물 모둠", "Assorted Namul", "什锦拌菜", "ナムル盛合わせ", "Rau trộn tổng hợp")),
      it(99000, null, T("나물 단품", "Namul (single)", "拌菜 (单品)", "ナムル単品", "Rau trộn")),
      it(99000, null, T("배추김치", "Napa Cabbage Kimchi", "白菜泡菜", "白菜のキムチ", "Kimchi cải thảo")),
      it(99000, null, T("무김치 (깍두기)", "Radish Kimchi", "萝卜泡菜 (Kkakdugi)", "大根のキムチ", "Kimchi củ cải trắng")),
      it(99000, null, T("오이김치", "Cucumber Kimchi", "黄瓜泡菜", "胡瓜のキムチ", "Kimchi dưa chuột")),
    ],
  },
  {
    id: "rice",
    name: T("식사", "Rice & Noodles", "主食", "お食事", "Cơm & mì"),
    items: [
      it(630000, null, T("돌솥 육회비빔밥", "Stone-pot Yukke Bibimbap", "石锅生牛肉拌饭", "石焼ユッケビビンバ", "Cơm trộn bát đá Yukke")),
      it(189000, "ishiyaki-bibimbap", T("돌솥비빔밥", "Stone-pot Bibimbap", "石锅拌饭", "石焼ビビンバ", "Cơm trộn bát đá nướng Bibimbap")),
      it(180000, null, T("비빔밥", "Bibimbap", "拌饭", "ビビンバ", "Cơm trộn Bibimbap")),
      it(219000, null, T("갈비 국밥", "Kalbi Rice Soup", "牛小排汤饭", "カルビクッパ", "Cơm canh sườn bò")),
      it(219000, null, T("육개장 국밥", "Yukgaejang Rice Soup", "辣牛肉汤饭 (Yukgaejang)", "ユッケジャンクッパ", "Cơm canh cay Yukgaejang"), { spicy: true }),
      it(159000, null, T("계란 국밥", "Egg Rice Soup", "鸡蛋汤饭", "卵クッパ", "Cơm canh trứng")),
      it(219000, null, T("냉면", "Cold Noodles (Naengmyeon)", "冷面", "冷麺", "Mì lạnh")),
      it(60000, null, T("공깃밥 (중)", "Rice (medium)", "白米饭 (中)", "ライス中", "Cơm vừa")),
      it(40000, null, T("공깃밥 (소)", "Rice (small)", "白米饭 (小)", "ライス小", "Cơm nhỏ")),
      it(35000, null, T("한국 김", "Korean Seaweed", "韩国烤海苔", "韓国のり", "Rong biển Hàn Quốc")),
    ],
  },
  {
    id: "soup",
    name: T("수프", "Soups", "汤品", "スープ", "Súp"),
    items: [
      it(189000, null, T("오시마 특제 우설 스튜", "Oshima Special Beef Tongue Stew", "大岛特制炖牛舌", "大島特製タンシチュー", "Súp lưỡi bò hầm đặc biệt Oshima")),
      it(189000, null, T("육개장", "Yukgaejang (Spicy Beef Soup)", "辣牛肉汤 (Yukgaejang)", "ユッケジャンスープ", "Súp Yukgaejang cay"), { spicy: true }),
      it(189000, null, T("갈비탕", "Kalbi Soup", "牛小排汤", "カルビスープ", "Súp sườn bò")),
      it(129000, null, T("부드러운 계란국", "Fluffy Egg Soup", "嫩滑蛋花汤", "ふんわり卵スープ", "Súp trứng bông")),
      it(129000, null, T("미역국", "Seaweed Soup", "海带汤", "わかめスープ", "Súp rong biển")),
      it(129000, null, T("콩나물국", "Bean Sprout Soup", "豆芽汤", "もやしスープ", "Súp giá đỗ")),
    ],
  },
  {
    id: "dessert",
    name: T("디저트", "Desserts", "甜点", "デザート", "Tráng miệng"),
    items: [
      it(70000, "shio-pudding", T("오시마 소금 푸딩", "Oshima Salt Pudding", "大岛海盐布丁", "大島の塩プリン", "Bánh pudding muối Oshima")),
      it(70000, null, T("바닐라 아이스크림", "Vanilla Ice Cream", "香草冰淇淋", "バニラアイス", "Kem vani")),
      it(70000, null, T("유자 셔벗", "Yuzu Sherbet", "柚子冰沙", "柚子シャーベット", "Kem đá yuzu")),
      it(300000, null, T("과일 모둠", "Fruit Platter", "什锦水果拼盘", "フルーツ盛合せ", "Trái cây tổng hợp")),
    ],
  },
  {
    id: "drink",
    name: T("음료", "Drinks", "饮品", "ドリンク", "Đồ uống"),
    items: [
      it(79000, null, T("삿포로 생맥주", "Sapporo Draft Beer", "札幌生啤酒", "札幌生ビール", "Bia tươi Sapporo")),
    ],
  },
];
