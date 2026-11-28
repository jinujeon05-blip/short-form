// 순희가(순희네) 메뉴 데이터 — 출처: 구글 지도에 올라온 메뉴판 사진 19장(2026-11-28 수집)
// 숯불 돼지갈비 300,000(menu_07, 다른 사진 280,000)
// 가격이 사진마다 다른 것은 높은 쪽: 특선 갈비탕 260,000(다른 사진 220,000), 진국 곰탕·설렁탕 180,000(다른 사진 170,000)
window.RESTAURANT = {
  brand: { ko: "순희네", en: "Soonhee" },
  phone: "086 288 4075",
  address: "Golden Palace 1층 A동, Mễ Trì, Nam Từ Liêm, Hà Nội",
  mapUrl: "https://www.google.com/maps/place/%EC%88%9C%ED%9D%AC%EA%B0%80(%EC%88%9C%ED%9D%AC%EB%84%A4)/@21.0116981,105.7744404,17z",
  wifi: null,
  hours: "12:00 – 22:00",
};

window.MENU = [
  {
    id: "stew",
    name: { ko: "전골", en: "Hot Pots", zh: "火锅", ja: "鍋料理", vi: "Lẩu" },
    items: [
      { name: { ko: "순희 특선 해물탕 (예약)", en: "Special Seafood Hot Pot (reservation)", zh: "顺熙特选海鲜汤锅（需预订）", ja: "スニ特選海鮮鍋（要予約）", vi: "Lẩu hải sản đặc biệt (đặt trước)" }, price: 1200000 },
      { name: { ko: "김치 전골", en: "Kimchi & Pork Hot Pot", zh: "泡菜火锅", ja: "キムチ鍋", vi: "Lẩu kim chi" }, sizes: [["S", 450000], ["L", 600000]] },
      { name: { ko: "해물 전골", en: "Spicy Seafood Hot Pot", zh: "辣海鲜火锅", ja: "海鮮チョンゴル（辛い海鮮鍋）", vi: "Lẩu hải sản cay" }, sizes: [["S", 550000], ["L", 750000]], spicy: true },
      { name: { ko: "부대찌개", en: "Budae Jjigae (Army Stew)", zh: "部队锅", ja: "プデチゲ（部隊鍋）", vi: "Lẩu thập cẩm" }, sizes: [["S", 500000], ["L", 650000]], spicy: true, photo: "img/budae.jpg" },
      { name: { ko: "소고기 버섯 전골", en: "Beef & Mushroom Hot Pot", zh: "牛肉蘑菇火锅", ja: "牛肉とキノコの鍋", vi: "Lẩu thịt bò nấm" }, sizes: [["S", 500000], ["L", 650000]] },
      { name: { ko: "동태 전골", en: "Pollock Hot Pot", zh: "明太鱼火锅", ja: "スケトウダラ鍋", vi: "Lẩu cá minh thái" }, sizes: [["S", 550000], ["L", 700000]] },
      { name: { ko: "다금바리 매운탕 (예약)", en: "Spicy Grouper Hot Pot (reservation)", zh: "辣石斑鱼汤锅（需预订）", ja: "高級ハタの辛口鍋（要予約）", vi: "Lẩu cá mú cay (đặt trước)" }, price: 1200000, spicy: true },
      { name: { ko: "라면·국수 사리", en: "Extra Ramen / Noodles", zh: "加拉面/面条", ja: "ラーメン・麺の追加", vi: "Thêm mì gói / mì sợi" }, price: 30000 },
    ],
  },
  {
    id: "jjigae",
    name: { ko: "찌개", en: "Stews", zh: "炖汤", ja: "チゲ", vi: "Canh hầm (Jjigae)" },
    items: [
      { name: { ko: "해물 된장찌개", en: "Seafood Soybean Paste Stew", zh: "海鲜大酱汤", ja: "海鮮テンジャンチゲ", vi: "Canh tương đậu hải sản" }, price: 180000 },
      { name: { ko: "된장찌개", en: "Soybean Paste Stew", zh: "大酱汤", ja: "テンジャンチゲ", vi: "Canh tương đậu" }, price: 160000 },
      { name: { ko: "김치찌개", en: "Kimchi Stew", zh: "泡菜汤", ja: "キムチチゲ", vi: "Canh kim chi" }, price: 160000, spicy: true },
      { name: { ko: "순두부찌개", en: "Soft Tofu Stew", zh: "嫩豆腐汤", ja: "スンドゥブチゲ", vi: "Canh đậu phụ non" }, price: 160000, spicy: true },
      { name: { ko: "콩비지찌개", en: "Ground Soybean & Kimchi Stew", zh: "豆渣泡菜汤", ja: "おから入りキムチチゲ", vi: "Canh bã đậu nành kim chi" }, price: 160000 },
      { name: { ko: "김치 꽁치조림", en: "Braised Mackerel Pike with Kimchi", zh: "泡菜炖秋刀鱼", ja: "キムチとサンマの煮付け", vi: "Cá thu đao kho kim chi" }, price: 190000 },
    ],
  },
  {
    id: "tang",
    name: { ko: "탕·국밥", en: "Soups", zh: "汤·汤饭", ja: "タン・クッパ", vi: "Canh & cơm canh" },
    items: [
      { name: { ko: "진국 곰탕", en: "Beef Bone Soup (Gomtang)", zh: "牛骨浓汤（곰탕）", ja: "コムタン（牛骨スープ）", vi: "Canh thịt bò" }, price: 180000 },
      { name: { ko: "설렁탕", en: "Seolleongtang (Ox Bone Soup)", zh: "雪浓汤（牛骨白汤）", ja: "ソルロンタン（牛骨白湯）", vi: "Canh xương bò Seolleongtang" }, price: 180000 },
      { name: { ko: "꼬리 곰탕", en: "Oxtail Soup", zh: "牛尾汤", ja: "テールスープ（牛テールコムタン）", vi: "Canh đuôi bò" }, price: 220000 },
      { name: { ko: "특선 갈비탕", en: "Special Beef Rib Soup", zh: "特选牛排骨汤", ja: "特選カルビタン（牛カルビスープ）", vi: "Canh sườn bò" }, price: 260000 },
      { name: { ko: "도가니탕", en: "Beef Knee Tendon Soup", zh: "牛膝筋汤", ja: "ドガニタン（牛すね軟骨スープ）", vi: "Canh gân khớp bò" }, price: 240000 },
      { name: { ko: "사골 우거지탕", en: "Beef Bone & Dried Cabbage Soup", zh: "牛骨白菜干汤", ja: "牛骨と干し白菜のスープ", vi: "Canh xương bò rau cải khô" }, price: 180000 },
      { name: { ko: "소고기 미역국", en: "Seaweed Soup with Beef or Clam", zh: "牛肉或蛤蜊海带汤", ja: "牛肉またはあさりのわかめスープ", vi: "Canh rong biển thịt bò hoặc ngao" }, price: 180000 },
      { name: { ko: "소고기 따로국밥", en: "Ttaro Gukbap (Beef & Radish Soup with Rice)", zh: "牛肉萝卜汤饭（汤饭分开上）", ja: "牛肉と大根のスープ・クッパ（ご飯別盛り）", vi: "Cơm canh thịt bò củ cải (Ttaro Gukbap)" }, price: 180000, spicy: true },
    ],
  },
  {
    id: "beef",
    name: { ko: "소고기 구이", en: "Beef BBQ", zh: "烤牛肉", ja: "牛肉の焼肉", vi: "Thịt bò nướng" },
    items: [
      { name: { ko: "소고기 모듬 스페셜", en: "Special Assorted Beef", zh: "特选牛肉拼盘", ja: "特選牛肉盛り合わせ", vi: "Thịt bò nướng thập cẩm đặc biệt" }, sizes: [["S", 1700000], ["L", 2000000]], tag: "best", photo: "img/beef-mix.jpg" },
      { name: { ko: "갈비살", en: "Beef Rib Finger (Galbisal)", zh: "牛肋条（갈비살）", ja: "カルビサル（牛バラ肉）", vi: "Thịt dẻ sườn bò nướng" }, price: 400000 },
      { name: { ko: "소양념 갈비", en: "Marinated Beef Short Rib", zh: "酱腌牛小排", ja: "味付け牛カルビ", vi: "Sườn bò ướp nướng" }, price: 600000 },
      { name: { ko: "꽃살", en: "Boneless Short Rib (Kkotsal)", zh: "牛无骨小排（꽃살）", ja: "コッサル（牛霜降りカルビ）", vi: "Thịt thăn hoa bò nướng" }, price: 550000 },
      { name: { ko: "차돌박이", en: "Beef Brisket (Chadolbaegi)", zh: "牛胸腹薄片（차돌박이）", ja: "チャドルバギ（牛バラ薄切り）", vi: "Gầu bò nướng" }, price: 440000 },
      { name: { ko: "버섯 불고기 전골", en: "Mushroom Bulgogi Hot Pot", zh: "蘑菇烤肉火锅", ja: "キノコ入りプルコギ鍋", vi: "Lẩu bulgogi nấm" }, price: 600000 },
      { name: { ko: "소고기 샤브샤브", en: "Beef Shabu-Shabu", zh: "牛肉涮锅", ja: "牛肉しゃぶしゃぶ", vi: "Lẩu bò nhúng (Shabu-shabu)" }, price: 850000 },
      { name: { ko: "육회", en: "Yukhoe (Beef Tartare)", zh: "牛肉生拌", ja: "ユッケ", vi: "Gỏi thịt bò" }, price: 400000, tag: "must", photo: "img/yukhoe.jpg" },
    ],
  },
  {
    id: "pork",
    name: { ko: "돼지·닭 구이", en: "Pork & Chicken BBQ", zh: "烤猪肉·烤鸡肉", ja: "豚肉・鶏肉の焼肉", vi: "Thịt lợn & gà nướng" },
    items: [
      { name: { ko: "돼지 모듬 스페셜", en: "Special Assorted Pork", zh: "特选猪肉拼盘", ja: "特選豚肉盛り合わせ", vi: "Thịt lợn nướng thập cẩm đặc biệt" }, price: 800000 },
      { name: { ko: "숯불 돼지갈비", en: "Charcoal Marinated Pork Ribs", zh: "炭烤腌猪排骨", ja: "炭火焼き豚カルビ", vi: "Sườn lợn ướp nướng than" }, price: 300000 },
      { name: { ko: "항정살", en: "Pork Jowl (Hangjeongsal)", zh: "猪颈肉（항정살）", ja: "ハンジョンサル（豚の首肉）", vi: "Thịt cầu vai lợn nướng" }, price: 260000 },
      { name: { ko: "숯불 생삼겹살", en: "Fresh Pork Belly", zh: "炭烤鲜五花肉", ja: "炭火焼き生サムギョプサル", vi: "Thịt lợn ba chỉ nướng" }, price: 240000 },
      { name: { ko: "닭 소금 숯불갈비", en: "Charcoal Chicken (Salt)", zh: "炭烤盐味鸡排", ja: "鶏の塩味炭火カルビ", vi: "Gà nướng than vị muối" }, price: 300000 },
      { name: { ko: "닭 양념 숯불갈비", en: "Charcoal Chicken (Spicy Marinade)", zh: "炭烤辣酱鸡排", ja: "鶏の辛味ダレ炭火カルビ", vi: "Gà nướng than sốt cay" }, price: 300000, spicy: true },
    ],
  },
  {
    id: "special",
    name: { ko: "특선 요리", en: "Specialties", zh: "特色料理", ja: "特選料理", vi: "Món đặc biệt" },
    items: [
      { name: { ko: "장어구이 1kg", en: "Grilled Eel 1kg", zh: "烤鳗鱼 1公斤", ja: "うなぎ焼き 1kg", vi: "Cá chình nướng 1kg" }, price: 1200000 },
      { name: { ko: "오징어볶음", en: "Stir-fried Squid", zh: "辣炒鱿鱼", ja: "イカ炒め", vi: "Mực xào" }, price: 300000, spicy: true },
      { name: { ko: "돼지 두루치기", en: "Duruchigi (Stir-fried Pork)", zh: "辣炒猪肉（두루치기）", ja: "豚肉のトゥルチギ（辛味炒め）", vi: "Thịt lợn xào cay Duruchigi" }, price: 400000, spicy: true, photo: "img/duruchigi.jpg" },
      { name: { ko: "연어회", en: "Salmon Sashimi", zh: "三文鱼刺身", ja: "サーモン刺身", vi: "Sashimi cá hồi" }, price: 550000 },
      { name: { ko: "연어구이", en: "Grilled Salmon", zh: "烤三文鱼", ja: "サーモン焼き", vi: "Cá hồi nướng" }, price: 550000 },
      { name: { ko: "잡채", en: "Japchae", zh: "杂菜炒粉丝", ja: "チャプチェ", vi: "Miến xào Japchae" }, price: 180000 },
      { name: { ko: "과일 샐러드", en: "Fruit Salad", zh: "水果沙拉", ja: "フルーツサラダ", vi: "Salad hoa quả" }, price: 160000 },
      { name: { ko: "해초 샐러드", en: "Seaweed Salad", zh: "海藻沙拉", ja: "海藻サラダ", vi: "Salad rong biển" }, price: 160000 },
    ],
  },
  {
    id: "lunch",
    name: { ko: "점심 특선", en: "Lunch Sets", zh: "午餐套餐", ja: "ランチ定食", vi: "Cơm set trưa" },
    items: [
      { name: { ko: "뚝배기 불고기 정식", en: "Bulgogi Set", zh: "砂锅烤肉套餐", ja: "土鍋プルコギ定食", vi: "Cơm set bulgogi nồi đất" }, price: 220000 },
      { name: { ko: "제육볶음 정식", en: "Spicy Pork Set", zh: "辣炒猪肉套餐", ja: "豚肉の辛味炒め定食", vi: "Cơm set thịt lợn xào cay" }, price: 220000, spicy: true },
      { name: { ko: "숯불 돼지갈비 정식", en: "Charcoal Pork Rib Set", zh: "炭烤猪排骨套餐", ja: "炭火焼き豚カルビ定食", vi: "Cơm set sườn lợn nướng than" }, price: 240000 },
      { name: { ko: "고등어구이 정식", en: "Grilled Mackerel Set", zh: "烤青花鱼套餐", ja: "サバの塩焼き定食", vi: "Cơm set cá thu nướng" }, price: 220000, photo: "img/godeungeo.jpg" },
    ],
  },
  {
    id: "noodle",
    name: { ko: "면·만두", en: "Noodles & Dumplings", zh: "面食·饺子", ja: "麺・餃子", vi: "Mì & há cảo" },
    items: [
      { name: { ko: "물냉면", en: "Mul Naengmyeon (Cold Noodles)", zh: "水冷面", ja: "ムルネンミョン（冷麺）", vi: "Mì lạnh nước (Mul Naengmyeon)" }, price: 170000 },
      { name: { ko: "비빔냉면", en: "Bibim Naengmyeon (Spicy Cold Noodles)", zh: "辣拌冷面", ja: "ビビンネンミョン（辛い和え冷麺）", vi: "Mì lạnh trộn cay (Bibim Naengmyeon)" }, price: 170000, spicy: true },
      { name: { ko: "소면 (해물)", en: "Somyeon (Seafood Noodles)", zh: "海鲜素面", ja: "海鮮ソミョン（そうめん）", vi: "Mì sợi nhỏ hải sản" }, price: 170000 },
      { name: { ko: "라면", en: "Korean Instant Ramen with Rice", zh: "韩式拉面（配米饭）", ja: "韓国ラーメン（ご飯付き）", vi: "Mì gói Hàn Quốc (kèm cơm)" }, price: 140000, spicy: true },
      { name: { ko: "만두국", en: "Dumpling Soup", zh: "饺子汤", ja: "マンドゥクク（餃子スープ）", vi: "Canh há cảo" }, price: 160000 },
      { name: { ko: "찐만두", en: "Steamed Dumplings", zh: "蒸饺", ja: "蒸し餃子", vi: "Há cảo hấp" }, price: 150000, photo: "img/mandu.jpg" },
    ],
  },
];
