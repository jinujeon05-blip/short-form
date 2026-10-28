// 한사리감자탕 & 뼈구이 미딩점 HANSARI GAMJATANG (30 TT4, Mỹ Đình, Từ Liêm, Hà Nội) 메뉴 데이터
// 출처: 구글 지도 메뉴판 사진(2026-10-28 수집, 올린 날짜 모름). 판이 두 가지:
//   새 판(손님 사진 menu_09 요리·menu_10 식사, "모든 음식 부가세(VAT) 포함" 표기, 가격이 더 높음) — 이 메뉴는 전부 새 판 기준
//   옛 판(가게 계정 사진 menu_02·05 요리·menu_07·01 식사, 부가세 표기 없음, 가격 낮음)
//   옛 판에만 있는 제주돔베고기·콩나물 우거지탕 추가·맥주 카스/테라는 뺌 (docs/todo.md 에)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만 — 정사각형이면 양옆 흰 여백)
window.RESTAURANT = {
  brand: { ko: "한사리감자탕 & 뼈구이", en: "Hansari Gamjatang" },
  phone: "0975 963 003",
  address: "30 TT4, KĐT Mỹ Đình – Sông Đà, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "09:00 – 23:00",
};

const SML = { ko: "S 소 · M 중 · L 대", en: "S small · M medium · L large", zh: "S 小 · M 中 · L 大", ja: "S 小 · M 中 · L 大", vi: "S nhỏ · M vừa · L lớn" };

window.MENU = [
  {
    id: "main",
    name: { ko: "요리 메뉴", en: "Hot Pots & Mains", zh: "主菜与火锅", ja: "料理メニュー", vi: "Món chính" },
    items: [
      { sizes: [["S", 700000], ["M", 800000], ["L", 900000]], spicy: true, photo: "img/gamjatang.jpg", desc: SML, name: { ko: "한사리 감자탕", en: "Hansari Gamjatang (Pork Bone Stew)", zh: "汉萨里土豆排骨汤(Gamjatang)", ja: "ハンサリ カムジャタン(豚骨とじゃがいもの鍋)", vi: "Lẩu xương hầm khoai tây Hansari" } },
      { sizes: [["S", 700000], ["M", 800000], ["L", 900000]], desc: SML, name: { ko: "맑은 감자탕", en: "Clear Pork Bone Stew", zh: "清汤土豆排骨锅", ja: "あっさりカムジャタン", vi: "Lẩu xương hầm khoai tây không cay" } },
      { sizes: [["M", 800000], ["L", 900000]], desc: { ko: "M 중 · L 대", en: "M medium · L large", zh: "M 中 · L 大", ja: "M 中 · L 大", vi: "M vừa · L lớn" }, name: { ko: "한가득 뼈찜", en: "Braised Pork Bones (Ppyeo-jjim)", zh: "辣炖猪骨(Ppyeo-jjim)", ja: "豚骨の蒸し煮(ペッチム)", vi: "Xương heo om cay (Ppyeo-jjim)" } },
      { sizes: [["S", 700000], ["M", 800000], ["L", 900000]], spicy: true, photo: "img/bbyeo-gui.jpg", desc: { ko: "간장맛 / 매콤간장맛 / 매운맛 · S 소 · M 중 · L 대", en: "Soy / spicy soy / spicy · S small · M medium · L large", zh: "酱油味 / 微辣酱油味 / 辣味 · S 小 · M 中 · L 大", ja: "醤油味 / ピリ辛醤油味 / 辛口 · S 小 · M 中 · L 大", vi: "Vị xì dầu / vị xì dầu cay / cay · S nhỏ · M vừa · L lớn" }, name: { ko: "직화 뼈구이", en: "Flame-grilled Pork Bones", zh: "直火烤猪骨", ja: "直火焼き豚骨", vi: "Xương nướng than" } },
      { sizes: [["S", 750000], ["M", 850000], ["L", 950000]], photo: "img/mandu-jeongol.jpg", desc: { ko: "얼큰 / 맑은 · S 소 · M 중 · L 대", en: "Spicy / clear broth · S small · M medium · L large", zh: "香辣 / 清汤 · S 小 · M 中 · L 大", ja: "ピリ辛 / あっさり · S 小 · M 中 · L 大", vi: "Cay / không cay · S nhỏ · M vừa · L lớn" }, name: { ko: "얼큰·맑은 왕만두 전골", en: "Giant Dumpling Hot Pot (Spicy / Clear)", zh: "香辣/清汤大饺子火锅", ja: "大餃子鍋(ピリ辛・あっさり)", vi: "Lẩu màn thầu (cay / không cay)" } },
      { sizes: [["S", 850000], ["M", 950000], ["L", 1050000]], desc: SML, name: { ko: "콩비지 감자탕", en: "Pork Bone Stew with Ground Soybean", zh: "豆渣土豆排骨锅", ja: "おからカムジャタン", vi: "Lẩu xương hầm khoai tây bã đậu" } },
      { sizes: [["S", 850000], ["M", 950000], ["L", 1050000]], spicy: true, desc: SML, name: { ko: "부대 감자탕", en: "Army-style Pork Bone Stew (Budae)", zh: "部队土豆排骨锅(Budae)", ja: "プデ・カムジャタン(部隊鍋風)", vi: "Lẩu xương hầm khoai tây kiểu quân đội (Budae)" } },
    ],
  },
  {
    id: "set",
    name: { ko: "세트 메뉴", en: "Set Menus", zh: "套餐", ja: "セットメニュー", vi: "Set menu" },
    items: [
      { sizes: [["S", 800000], ["M", 900000], ["L", 1000000]], desc: { ko: "한사리 감자탕 + 매콤 만두범벅(6p) + 음료 1캔", en: "Hansari Gamjatang + spicy dumplings (6 pcs) + 1 canned drink", zh: "汉萨里土豆排骨汤 + 香辣饺子(6个) + 罐装饮料1罐", ja: "ハンサリ カムジャタン + ピリ辛餃子(6個) + 缶飲料1本", vi: "Lẩu xương hầm khoai tây Hansari + màn thầu chiên xốt cay (6P) + 1 lon nước" }, name: { ko: "SET 1 한사리감자탕 세트", en: "SET 1 Hansari Gamjatang Set", zh: "SET 1 汉萨里土豆排骨汤套餐", ja: "SET 1 ハンサリ カムジャタンセット", vi: "SET 1 Lẩu xương hầm khoai tây Hansari" } },
      { sizes: [["S", 800000], ["M", 900000], ["L", 1000000]], desc: { ko: "직화 뼈구이 + 날치알 셀프 주먹밥 + 얼큰 우거지탕 + 음료 1캔", en: "Flame-grilled pork bones + flying-fish-roe rice balls (DIY) + spicy cabbage soup + 1 canned drink", zh: "直火烤猪骨 + 飞鱼籽自制饭团 + 香辣干菜汤 + 罐装饮料1罐", ja: "直火焼き豚骨 + とびこおにぎり(セルフ) + ピリ辛ウゴジスープ + 缶飲料1本", vi: "Xương nướng than + cơm nắm trứng cá (tự làm) + canh rau khô cay + 1 lon nước" }, name: { ko: "SET 2 직화뼈구이 세트", en: "SET 2 Flame-grilled Pork Bone Set", zh: "SET 2 直火烤猪骨套餐", ja: "SET 2 直火焼き豚骨セット", vi: "SET 2 Xương nướng than" } },
      { sizes: [["S", 2100000], ["M", 2350000], ["L", 2600000]], desc: { ko: "한사리 감자탕 + 직화 뼈구이 + 한가득 뼈찜 + 소주 1병 서비스", en: "Hansari Gamjatang + flame-grilled pork bones + braised pork bones + 1 free bottle of soju", zh: "汉萨里土豆排骨汤 + 直火烤猪骨 + 辣炖猪骨 + 赠烧酒1瓶", ja: "ハンサリ カムジャタン + 直火焼き豚骨 + 豚骨の蒸し煮 + 焼酎1本サービス", vi: "Lẩu xương hầm khoai tây Hansari + xương nướng than + xương heo om cay + tặng 1 chai soju" }, name: { ko: "SET 3 한사리 단체세트", en: "SET 3 Hansari Group Set", zh: "SET 3 汉萨里团体套餐", ja: "SET 3 ハンサリ団体セット", vi: "SET 3 Set nhóm Hansari" } },
    ],
  },
  {
    id: "meal",
    name: { ko: "식사 메뉴", en: "Meals", zh: "餐食", ja: "お食事メニュー", vi: "Menu bữa ăn" },
    items: [
      { price: 200000, spicy: true, photo: "img/haejangguk.jpg", desc: { ko: "뼈 또는 순살", en: "With bones or boneless", zh: "带骨或去骨", ja: "骨付きまたは骨なし", vi: "Có xương hoặc không xương" }, name: { ko: "뼈해장국", en: "Pork Bone Hangover Soup", zh: "猪骨醒酒汤", ja: "豚骨ヘジャンクク(二日酔いスープ)", vi: "Canh xương" } },
      { price: 240000, spicy: true, name: { ko: "뼈해장국 (특)", en: "Pork Bone Hangover Soup (Large)", zh: "猪骨醒酒汤(特大)", ja: "豚骨ヘジャンクク(特盛)", vi: "Canh xương (đặc biệt)" } },
      { price: 200000, desc: { ko: "뼈 또는 순살", en: "With bones or boneless", zh: "带骨或去骨", ja: "骨付きまたは骨なし", vi: "Có xương hoặc không xương" }, name: { ko: "맑은 뼈해장국", en: "Clear Pork Bone Soup", zh: "清汤猪骨醒酒汤", ja: "あっさり豚骨ヘジャンクク", vi: "Canh xương không cay" } },
      { price: 240000, name: { ko: "맑은 뼈해장국 (특)", en: "Clear Pork Bone Soup (Large)", zh: "清汤猪骨醒酒汤(特大)", ja: "あっさり豚骨ヘジャンクク(特盛)", vi: "Canh xương không cay (đặc biệt)" } },
      { price: 240000, desc: { ko: "뼈 또는 순살", en: "With bones or boneless", zh: "带骨或去骨", ja: "骨付きまたは骨なし", vi: "Có xương hoặc không xương" }, name: { ko: "콩비지 뼈탕", en: "Pork Bone Soup with Ground Soybean", zh: "豆渣猪骨汤", ja: "おから豚骨スープ", vi: "Canh xương bã đậu" } },
      { price: 240000, spicy: true, desc: { ko: "뼈 또는 순살", en: "With bones or boneless", zh: "带骨或去骨", ja: "骨付きまたは骨なし", vi: "Có xương hoặc không xương" }, name: { ko: "부대 뼈탕", en: "Army-style Pork Bone Soup", zh: "部队猪骨汤", ja: "プデ風豚骨スープ", vi: "Canh xương lạp xưởng và thịt hun khói" } },
      { price: 200000, desc: { ko: "얼큰 / 맑은 · 뼈 또는 순살", en: "Spicy / clear · with bones or boneless", zh: "香辣 / 清汤 · 带骨或去骨", ja: "ピリ辛 / あっさり · 骨付きまたは骨なし", vi: "Cay / không cay · có xương hoặc không xương" }, name: { ko: "왕만두 뼈탕", en: "Giant Dumpling Pork Bone Soup", zh: "大饺子猪骨汤", ja: "大餃子入り豚骨スープ", vi: "Canh xương màn thầu" } },
      { price: 200000, photo: "img/donkatsu.jpg", name: { ko: "등심 돈까스", en: "Pork Loin Cutlet (Donkatsu)", zh: "里脊猪排(Donkatsu)", ja: "ロース豚カツ(トンカツ)", vi: "Thịt cốt lết chiên" } },
      { price: 200000, name: { ko: "치즈 돈까스", en: "Cheese Pork Cutlet (Cheese Donkatsu)", zh: "芝士猪排(Cheese Donkatsu)", ja: "チーズ豚カツ(チーズトンカツ)", vi: "Thịt chiên phô mai" } },
    ],
  },
  {
    id: "side",
    name: { ko: "사이드 메뉴", en: "Sides", zh: "小吃配菜", ja: "サイドメニュー", vi: "Món phụ" },
    items: [
      { price: 400000, spicy: true, desc: { ko: "3조각 · 간장맛 / 매콤간장맛 / 매운맛", en: "3 pcs · soy / spicy soy / spicy", zh: "3块 · 酱油味 / 微辣酱油味 / 辣味", ja: "3切れ · 醤油味 / ピリ辛醤油味 / 辛口", vi: "3P · vị xì dầu / vị xì dầu cay / cay" }, name: { ko: "맛보기 직화 뼈구이", en: "Flame-grilled Pork Bones (Taster)", zh: "直火烤猪骨(试吃份)", ja: "直火焼き豚骨(お試し)", vi: "Xương nướng (phần ăn thử)" } },
      { price: 100000, name: { ko: "날치알 셀프 주먹밥", en: "Flying-fish-roe Rice Balls (DIY)", zh: "飞鱼籽自制饭团", ja: "とびこおにぎり(セルフ)", vi: "Cơm nắm trứng cá và rong biển" } },
      { price: 350000, name: { ko: "소불고기 구이", en: "Grilled Beef Bulgogi", zh: "烤牛肉(Bulgogi)", ja: "牛プルコギ焼き", vi: "Bò nướng bulgogi" } },
      { price: 150000, spicy: true, desc: { ko: "12조각 · 김말이 3 · 군만두 3 · 고구마 3 · 고추 3", en: "12 pcs · seaweed rolls 3 · fried dumplings 3 · sweet potato 3 · chili 3", zh: "12块 · 紫菜卷3 · 煎饺3 · 红薯3 · 辣椒3", ja: "12個 · のり巻き揚げ3 · 焼き餃子3 · さつまいも3 · 唐辛子3", vi: "12P · miến cuộn rong biển 3 · màn thầu 3 · khoai lang 3 · ớt 3" }, name: { ko: "매콤 튀김범벅", en: "Spicy Fried Assortment", zh: "香辣炸物拼盘", ja: "ピリ辛揚げ物盛り合わせ", vi: "Đồ chiên cay" } },
      { price: 120000, spicy: true, desc: { ko: "6조각", en: "6 pcs", zh: "6个", ja: "6個", vi: "6P" }, name: { ko: "매콤 만두범벅", en: "Spicy Dumplings", zh: "香辣饺子", ja: "ピリ辛餃子", vi: "Màn thầu chiên xốt cay" } },
      { sizes: [["2P", 60000], ["4P", 120000]], desc: { ko: "2조각 · 4조각", en: "2 pcs · 4 pcs", zh: "2个 · 4个", ja: "2個 · 4個", vi: "2P · 4P" }, name: { ko: "왕만두 튀김", en: "Fried Giant Dumplings", zh: "炸大饺子", ja: "大餃子の揚げ物", vi: "Màn thầu chiên" } },
    ],
  },
  {
    id: "add",
    name: { ko: "추가 메뉴", en: "Add-ons", zh: "加点", ja: "追加メニュー", vi: "Món thêm" },
    items: [
      { price: 200000, desc: { ko: "감자탕용 · 2조각", en: "For the stew · 2 pcs", zh: "用于土豆排骨汤 · 2块", ja: "カムジャタン用 · 2切れ", vi: "Dùng cho lẩu xương · 2P" }, name: { ko: "뼈 추가 커플", en: "Extra Bones (Couple)", zh: "加骨(双人份)", ja: "骨追加(カップル)", vi: "Thêm xương (Couple)" } },
      { price: 350000, desc: { ko: "감자탕용 · 4조각", en: "For the stew · 4 pcs", zh: "用于土豆排骨汤 · 4块", ja: "カムジャタン用 · 4切れ", vi: "Dùng cho lẩu xương · 4P" }, name: { ko: "뼈 추가 패밀리", en: "Extra Bones (Family)", zh: "加骨(家庭份)", ja: "骨追加(ファミリー)", vi: "Thêm xương (Family)" } },
      { price: 40000, name: { ko: "수제비 / 라면 사리", en: "Add Hand-torn Noodles / Ramyeon", zh: "加面疙瘩 / 拉面", ja: "スジェビ / ラーメン追加", vi: "Thêm bánh bột xé / mì gói" } },
      { price: 40000, desc: { ko: "우거지 + 수제비", en: "Dried cabbage + hand-torn noodles", zh: "干菜 + 面疙瘩", ja: "ウゴジ(干し白菜) + スジェビ", vi: "Rau khô + bánh bột xé" }, name: { ko: "더블 사리", en: "Double Add-on", zh: "双倍加料", ja: "ダブル追加", vi: "Thêm đôi" } },
      { price: 40000, name: { ko: "우거지 / 감자 추가", en: "Add Dried Cabbage / Potato", zh: "加干菜 / 土豆", ja: "ウゴジ / じゃがいも追加", vi: "Thêm rau khô / khoai tây" } },
      { sizes: [["2P", 60000], ["4P", 120000]], desc: { ko: "2개 · 4개", en: "2 pcs · 4 pcs", zh: "2个 · 4个", ja: "2個 · 4個", vi: "2P · 4P" }, name: { ko: "왕만두 추가", en: "Add Giant Dumplings", zh: "加大饺子", ja: "大餃子追加", vi: "Thêm màn thầu" } },
      { price: 50000, name: { ko: "볶음밥", en: "Fried Rice", zh: "炒饭", ja: "チャーハン", vi: "Cơm chiên" } },
      { price: 40000, desc: { ko: "뼈찜·뼈구이용", en: "For braised / grilled bones", zh: "用于辣炖猪骨、烤猪骨", ja: "豚骨の蒸し煮・直火焼き用", vi: "Dùng cho xương om / xương nướng" }, name: { ko: "야끼만두 / 떡사리 / 당면사리", en: "Add Fried Dumplings / Rice Cakes / Glass Noodles", zh: "加煎饺 / 年糕 / 粉丝", ja: "焼き餃子 / お餅 / 春雨追加", vi: "Thêm màn thầu chiên / bánh gạo / miến" } },
      { price: 20000, name: { ko: "공기밥", en: "Steamed Rice", zh: "米饭", ja: "ご飯", vi: "Cơm trắng" } },
    ],
  },
  {
    id: "drink",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水饮料", ja: "お酒・ドリンク", vi: "Rượu bia & đồ uống" },
    items: [
      { price: 150000, desc: { ko: "참이슬 / 처음처럼 / 새로 / 진로이즈백 / 보드카", en: "Chamisul / Chum Churum / Saero / Jinro Is Back / vodka", zh: "真露 / 初饮初乐 / Saero / Jinro Is Back / 伏特加", ja: "チャミスル / チョウムチョロム / セロ / ジンロイズバック / ウォッカ", vi: "Chamisul / Chum Churum / Saero / Jinro / vodka" }, name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "焼酎(ソジュ)", vi: "Soju" } },
      { price: 60000, name: { ko: "맥주 (타이거)", en: "Beer (Tiger)", zh: "啤酒(虎牌)", ja: "ビール(タイガー)", vi: "Bia (Tiger)" } },
      { price: 150000, name: { ko: "막걸리", en: "Makgeolli", zh: "马格利酒(Makgeolli)", ja: "マッコリ", vi: "Rượu gạo (Makgeolli)" } },
      { price: 30000, desc: { ko: "콜라 / 제로콜라 / 사이다 / 환타", en: "Coke / Coke Zero / Sprite / Fanta", zh: "可乐 / 零度可乐 / 雪碧 / 芬达", ja: "コーラ / コーラゼロ / サイダー / ファンタ", vi: "Coca / Coca Zero / Sprite / Fanta" }, name: { ko: "음료", en: "Soft Drinks", zh: "饮料", ja: "ドリンク", vi: "Đồ uống" } },
    ],
  },
];
