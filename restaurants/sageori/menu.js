// 사거리(뼈구이)집 Sageori Bone BBQ(숯불구이·직화 뼈구이, 박닌시 Võ Cường) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음). 출처: 구글 지도 메뉴판 사진 3장(menu_01·04·05, 2026-11-11 수집, 손님이 올린 것). 가격 단위: VND. 같은 메뉴가 사진마다 다르면 높은 쪽 가격(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "사거리(뼈구이)집", en: "Sageori Bone BBQ" },
  phone: "096 238 7904",
  address: "53C4+CMC, Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh",
  wifi: null,
  hours: "11:00 – 02:00",
};

window.MENU = [
  {
    id: "bone",
    name: { ko: "직화뼈구이", en: "Charcoal-Grilled Ribs", zh: "直火烤排骨", ja: "直火骨焼き(ジクァ ッポグイ)", vi: "Sườn nướng than hoa" },
    note: { ko: "반판 500g · 한판 1000g (뼈양념갈비는 1인분)", en: "Half tray 500g · Full tray 1000g (Marinated Pork Ribs: per person)", zh: "半盘 500g · 整盘 1000g（腌制带骨排骨为每人份）", ja: "半皿 500g · 1皿 1000g(骨付き味付けカルビは1人前)", vi: "Nửa khay 500g · Cả khay 1000g (Sườn heo tẩm ướp: giá 1 người)" },
    items: [
      { name: { ko: "직화등갈비", en: "Grilled Pork Ribs", zh: "直火烤猪肋排(Deungalbi)", ja: "直火豚バックリブ焼き(デンカルビ)", vi: "Sườn non heo nướng (Deungalbi)" }, sizes: [["500g", 430000], ["1000g", 850000]], photo: "img/deungalbi.jpg", tag: "best" },
      { name: { ko: "우대갈비삼겹", en: "Bone-in Pork Belly", zh: "带骨五花肉(Udaegalbi Samgyeop)", ja: "骨付きサムギョプサル(ウデカルビサムギョプ)", vi: "Ba chỉ heo có xương (Udaegalbi Samgyeop)" }, sizes: [["500g", 400000], ["1000g", 800000]] },
      { name: { ko: "고추장직화등갈비", en: "Gochujang Grilled Pork Ribs", zh: "辣酱直火烤猪肋排(Gochujang Deungalbi)", ja: "コチュジャン豚バックリブ焼き(コチュジャン デンカルビ)", vi: "Sườn non heo nướng sốt tương ớt Hàn (Gochujang Deungalbi)" }, sizes: [["500g", 450000], ["1000g", 900000]], spicy: true },
      { name: { ko: "뼈양념갈비", en: "Marinated Pork Ribs", zh: "腌制带骨排骨(Ppyeo Yangnyeom Galbi)", ja: "骨付き味付けカルビ(ッポ ヤンニョムカルビ)", vi: "Sườn heo tẩm ướp (Ppyeo Yangnyeom Galbi)" }, price: 220000 },
    ],
  },
  {
    id: "spine",
    name: { ko: "직화등뼈구이", en: "Grilled Pork Spine", zh: "直火烤猪脊骨", ja: "直火豚背骨焼き(ジクァ トゥンッポグイ)", vi: "Xương sống heo nướng" },
    note: { ko: "소 2인 · 중 3인 · 대 4인", en: "S 2 people · M 3 people · L 4 people", zh: "小份 2人 · 中份 3人 · 大份 4人", ja: "小 2人 · 中 3人 · 大 4人", vi: "Nhỏ 2 người · Vừa 3 người · Lớn 4 người" },
    items: [
      { name: { ko: "매운뼈구이", en: "Spicy Grilled Pork Bones", zh: "辣味烤猪骨(Maeun Ppyeoguigi)", ja: "辛口骨焼き(メウン ッポグイ)", vi: "Xương heo nướng cay (Maeun Ppyeoguigi)" }, sizes: [["S", 480000], ["M", 720000], ["L", 960000]], photo: "img/maeun-ppyeoguigi.jpg", spicy: true, tag: "must" },
      { name: { ko: "치즈뼈구이", en: "Cheese Grilled Pork Bones", zh: "芝士烤猪骨(Cheese Ppyeoguigi)", ja: "チーズ骨焼き(チーズ ッポグイ)", vi: "Xương heo nướng phô mai (Cheese Ppyeoguigi)" }, sizes: [["S", 520000], ["M", 780000], ["L", 1040000]] },
      { name: { ko: "로제뼈구이", en: "Rose Cream Grilled Pork Bones", zh: "玫瑰奶油烤猪骨(Rose Ppyeoguigi)", ja: "ロゼクリーム骨焼き(ロゼ ッポグイ)", vi: "Xương heo nướng sốt kem hồng (Rose Ppyeoguigi)" }, sizes: [["S", 520000], ["M", 780000], ["L", 1040000]] },
    ],
  },
  {
    id: "charcoal",
    name: { ko: "숯불구이", en: "Charcoal BBQ", zh: "炭火烤肉", ja: "炭火焼き", vi: "Thịt nướng than hoa" },
    note: { ko: "가격은 1인분 기준", en: "Prices are per person", zh: "价格为每人份", ja: "価格は1人前", vi: "Giá tính cho 1 phần" },
    items: [
      { name: { ko: "갈매기살", en: "Pork Skirt Meat", zh: "猪横膈膜肉(Galmaegisal)", ja: "豚ハラミ(ガルメギサル)", vi: "Thịt hoành heo (Galmaegisal)" }, price: 220000 },
      { name: { ko: "갈비덧살", en: "Pork Rib Fingers (Meat around the Ribs)", zh: "猪肋条肉(Galbi Deotsal)", ja: "豚カルビ周りの肉(カルビ トッサル)", vi: "Thịt nạc sườn heo (Galbi Deotsal)" }, price: 200000 },
      { name: { ko: "항정살", en: "Pork Jowl", zh: "猪颈肉(Hangjeongsal)", ja: "豚トロ(ハンジョンサル)", vi: "Thịt cổ heo (Hangjeongsal)" }, price: 220000 },
      { name: { ko: "생삼겹", en: "Fresh Pork Belly", zh: "新鲜五花肉(Saeng Samgyeop)", ja: "生サムギョプサル(生三枚肉)", vi: "Ba chỉ heo tươi (Saeng Samgyeop)" }, price: 180000 },
      { name: { ko: "꽃살", en: "Beef Flower Meat (Marbled Rib Meat)", zh: "牛雪花肋肉(Kkotsal)", ja: "牛フラワーカルビ(ッコッサル・霜降りリブ肉)", vi: "Thịt bò vân hoa sườn (Kkotsal)" }, price: 600000 },
      { name: { ko: "소갈비살", en: "Beef Rib Meat", zh: "牛肋条肉(So Galbisal)", ja: "牛カルビ肉(ソ カルビサル)", vi: "Thịt sườn bò (So Galbisal)" }, price: 300000 },
      { name: { ko: "소안창살", en: "Beef Inside Skirt", zh: "牛内横膈膜(So Anchangsal)", ja: "牛インサイドスカート(ソ アンチャンサル)", vi: "Thịt hoành bò (So Anchangsal)" }, price: 480000 },
    ],
  },
  {
    id: "side",
    name: { ko: "식사·사리·사이드", en: "Meals, Add-ons & Sides", zh: "主食·加料·小菜", ja: "食事・追加・サイド", vi: "Món ăn kèm, thêm & phụ" },
    items: [
      { name: { ko: "된장찌개", en: "Soybean Paste Stew", zh: "大酱汤(Doenjang Jjigae)", ja: "テンジャンチゲ(味噌チゲ)", vi: "Canh tương đậu Hàn Quốc (Doenjang Jjigae)" }, price: 60000 },
      { name: { ko: "계란찜", en: "Steamed Egg", zh: "蒸蛋(Gyeran Jjim)", ja: "ケランチム(蒸し卵)", vi: "Trứng hấp (Gyeran Jjim)" }, price: 60000, photo: "img/gyeranjjim.jpg" },
      { name: { ko: "멸치국수", en: "Anchovy Broth Noodles", zh: "鳀鱼汤面(Myeolchi Guksu)", ja: "ミョルチクスク(煮干しだしの麺)", vi: "Mì nước dùng cá cơm (Myeolchi Guksu)" }, price: 80000 },
      { name: { ko: "후식김치말이국수", en: "Kimchi Cold Noodles (Dessert Noodles)", zh: "泡菜冷面(餐后面食)", ja: "キムチマルグクス(〆の冷麺)", vi: "Mì lạnh kim chi (Kimchi Mari Guksu, món ăn cuối bữa)" }, price: 100000 },
      { name: { ko: "된장술밥", en: "Doenjang Rice Pot", zh: "大酱锅饭(Doenjang Sulbap)", ja: "テンジャン釜飯(テンジャン スルパプ)", vi: "Cơm nồi tương đậu (Doenjang Sulbap)" }, price: 100000 },
      { name: { ko: "라면", en: "Ramen", zh: "拉面", ja: "ラーメン(韓国インスタント麺)", vi: "Mì ramen" }, price: 100000 },
      { name: { ko: "치즈사리", en: "Cheese Add-on", zh: "加芝士", ja: "チーズ追加", vi: "Thêm phô mai" }, price: 100000 },
      { name: { ko: "주먹밥사리", en: "Rice Ball Add-on", zh: "加饭团", ja: "おにぎり追加", vi: "Thêm cơm nắm" }, price: 60000 },
      { name: { ko: "떡사리", en: "Rice Cake Add-on", zh: "加年糕", ja: "トック追加(餅)", vi: "Thêm bánh gạo" }, price: 60000 },
      { name: { ko: "칼국수사리", en: "Kalguksu Noodle Add-on", zh: "加刀削面(Kalguksu)", ja: "カルグクス追加(手打ち麺)", vi: "Thêm mì cắt (Kalguksu)" }, price: 80000 },
      { name: { ko: "라면사리", en: "Ramen Add-on", zh: "加拉面", ja: "ラーメン追加", vi: "Thêm mì ramen" }, price: 60000 },
      { name: { ko: "뼈추가", en: "Extra Bones", zh: "加骨头", ja: "骨追加", vi: "Thêm xương" }, price: 250000 },
    ],
  },
];
