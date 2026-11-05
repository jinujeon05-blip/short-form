// 끝돈 The Last Pig BBQ 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진 21장(2026-11-05 수집, 올린 날짜 미상)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "끝돈", en: "The Last Pig BBQ" },
  phone: "0777 599 292",
  address: "CT4, Căn SH8.ĐN2, Sông Đà - Q, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:00 – 22:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price: price ?? null, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const G = (n) => T(`${n}g`, `${n}g`, `${n}克`, `${n}g`, `${n}g`);

window.MENU = [
  {
    id: "pork",
    name: T("돼지고기 구이", "PORK BBQ", "猪肉烧烤", "豚肉焼肉", "THỊT HEO NƯỚNG"),
    items: [
      it(220000, "samgyeopsal", "숙성 삼겹살", "Aged Pork Belly (Samgyeopsal)", "熟成五花肉", "熟成 サムギョプサル（豚バラ肉）", "Thịt ba chỉ ủ", { tag: "best", desc: G(150) }),
      it(220000, null, "숙성 꽃목살", "Aged Pork Neck (Kkotmoksal)", "熟成花颈肉", "熟成 コッモクサル（豚肩ロース）", "Nạc vai ủ", { desc: G(150) }),
      it(260000, null, "숙성 가브리", "Aged Pork Rib-Eye Cap (Gabeuri)", "熟成猪颈背肉（Gabeuri）", "熟成 カブリ（豚肩ロースの端）", "Nạc diềm ủ", { desc: G(150) }),
      it(270000, null, "숙성 꼬들살", "Aged Pork Neck-Rind Cut (Kkodeulsal)", "熟成猪颈脆肉（Kkodeulsal）", "熟成 コドゥルサル（豚の首肉）", "Thịt gáy ủ", { desc: G(150) }),
      it(270000, null, "숙성 항정살", "Aged Pork Jowl (Hangjeongsal)", "熟成猪颈脊肉（项正肉）", "熟成 ハンジョンサル（豚トロ）", "Thịt má ủ", { desc: G(150) }),
      it(240000, null, "양념 돼지 갈비", "Marinated Pork Ribs (Yangnyeom Dwaeji Galbi)", "腌制猪排骨", "味付け 豚カルビ", "Sườn lợn tẩm gia vị đặc biệt", { desc: G(250) }),
      it(540000, null, "끝돈 숙성 모듬 (SET)", "Kkeutdon Aged Pork Platter (SET)", "Kkeutdon 熟成拼盘 (SET)", "Kkeutdon 熟成盛り合わせ (SET)","Set thịt lợn ủ tổng hợp Kkeutdon (SET)", {
        desc: T("400g = 숙성 꽃목살 200g + 숙성 삼겹살 200g", "400g = Aged Pork Neck 200g + Aged Pork Belly 200g", "400克 = 熟成花颈肉200克 + 熟成五花肉200克", "400g = 熟成コッモクサル200g + 熟成サムギョプサル200g", "400g = Nạc vai ủ 200g + Thịt ba chỉ ủ 200g"),
      }),
      it(680000, null, "끝돈 특수 부위 모듬 (SET)", "Kkeutdon Special Cuts Platter (SET)", "Kkeutdon 特殊部位拼盘 (SET)", "Kkeutdon 特殊部位盛り合わせ (SET)", "Set thịt lợn ủ tổng hợp đặc biệt Kkeutdon (SET)", {
        desc: T("500g = 숙성 항정살 200g + 숙성 가브리 150g + 숙성 꼬들살 150g", "500g = Aged Pork Jowl 200g + Aged Rib-Eye Cap 150g + Aged Neck-Rind Cut 150g", "500克 = 熟成猪颈脊肉200克 + 熟成猪颈背肉150克 + 熟成猪颈脆肉150克", "500g = 熟成ハンジョンサル200g + 熟成カブリ150g + 熟成コドゥルサル150g", "500g = Thịt má ủ 200g + Nạc diềm ủ 150g + Thịt gáy ủ 150g"),
      }),
    ],
  },
  {
    id: "beef",
    name: T("소고기 구이 · 끝소", "BEEF BBQ · THE LAST BEEF", "牛肉烧烤 · THE LAST BEEF", "牛肉焼肉・THE LAST BEEF", "THỊT BÒ NƯỚNG · THE LAST BEEF"),
    items: [
      it(370000, null, "마늘 양념 갈비살", "Garlic-Marinated Beef Rib Finger (Galbisal)", "蒜香腌制牛肋条", "ガーリック味付け カルビサル（牛バラ）", "Dẻ sườn bò có gia vị", { desc: G(150) }),
      it(520000, null, "마늘 양념 안창살", "Garlic-Marinated Beef Skirt (Anchangsal)", "蒜香腌制牛横膈膜", "ガーリック味付け アンチャンサル（牛ハラミ）", "Diềm thăn bò có gia vị", { desc: G(150) }),
      it(370000, null, "숙성 황제 갈비살", "Aged Emperor Beef Rib Finger (Hwangje Galbisal)", "熟成皇帝牛肋条", "熟成 皇帝カルビサル（牛バラ）", "Dẻ sườn bò ủ", { desc: G(150) }),
      it(520000, null, "숙성 안창살", "Aged Beef Skirt (Anchangsal)", "熟成牛横膈膜", "熟成 アンチャンサル（牛ハラミ）", "Diềm thăn bò", { desc: G(150) }),
      it(680000, null, "숙성 꽃살 프라임", "Aged Prime Beef Ribeye Cap (Kkotsal)", "熟成特选花肉（Kkotsal）", "熟成 コッサル プライム（牛リブ）", "Sườn bò không xương prime ủ", { desc: G(150) }),
      it(840000, null, "숙성 살치살 프라임", "Aged Prime Beef Chuck Flap (Salchisal)", "熟成特选牛肩胛脊肉（Salchisal）", "熟成 サルチサル プライム（牛肩ロース）", "Bẹ vai bò ủ prime", { desc: G(150) }),
      it(840000, null, "고베 와규 숙성 설화살", "Aged Kobe Wagyu Marbled Cut (Seolhwasal)", "神户和牛熟成雪花肉（Seolhwasal）", "神戸和牛 熟成 ソルファサル（霜降り）", "Wagyu bò kobe ủ", { desc: G(150) }),
      it(1850000, "sohanmari", "숙성 소 한마리", "Aged Whole Beef Platter (So Hanmari)", "熟成整牛拼盘", "熟成 牛一頭盛り（ソ ハンマリ）", "Thịt bò ủ tổng hợp", {
        tag: "special",
        desc: T("500g = 숙성 와규 · 숙성 살치 · 숙성 안창살 · 숙성 꽃살 · 숙성 갈비살", "500g = Aged Wagyu · Aged Salchi · Aged Skirt · Aged Kkotsal · Aged Rib Finger", "500克 = 熟成和牛 · 熟成牛肩胛脊肉 · 熟成牛横膈膜 · 熟成花肉 · 熟成牛肋条", "500g = 熟成和牛・熟成サルチ・熟成アンチャン・熟成コッサル・熟成カルビサル", "500g = Wagyu ủ · Bẹ vai ủ · Diềm thăn ủ · Sườn bò không xương ủ · Dẻ sườn ủ"),
      }),
      it(null, "beefcake", "소고기 케익", "Beef Cake (Sogogi Cake)", "牛肉蛋糕", "牛肉ケーキ", "Bánh sinh nhật thịt bò", {
        tag: "special",
        sizes: [["M", 3700000], ["L", 4900000]],
        desc: T(
          "중 2~3인 800g · 대 3~4인 1200g / 구성 중·대: 숙성 와규 350g·500g, 숙성 꽃살 350g·500g, 숙성 안창살 100g·200g",
          "M 2–3 people 800g · L 3–4 people 1200g / Contents M·L: Aged Wagyu 350g·500g, Aged Kkotsal 350g·500g, Aged Skirt 100g·200g",
          "中份 2~3人 800克 · 大份 3~4人 1200克 / 中·大份内容：熟成和牛350克·500克，熟成花肉350克·500克，熟成牛横膈膜100克·200克",
          "中 2～3人 800g · 大 3～4人 1200g / 中・大の内容：熟成和牛350g・500g、熟成コッサル350g・500g、熟成アンチャンサル100g・200g",
          "Vừa 2–3 người 800g · Lớn 3–4 người 1200g / Gồm vừa·lớn: Wagyu ủ 350g·500g, Sườn bò không xương ủ 350g·500g, Diềm thăn ủ 100g·200g",
        ),
      }),
    ],
  },
  {
    id: "lunch",
    name: T("점심 특선", "LUNCH SPECIAL COMBO", "午餐特选套餐", "ランチ特選コンボ", "BỮA TRƯA ĐẶC BIỆT"),
    note: T(
      "2인분 이상 주문 가능 · 콤보마다 A~E 중 1가지 무료(택1): 김치찌개 · 된장찌개 · 김치말이국수 · 단무지 비빔국수 · 누룽지",
      "Order for 2 or more · Each combo comes with 1 free item of A–E (choose one): kimchi stew · soybean paste stew · cold kimchi noodles · mixed noodles with pickled radish · scorched rice soup",
      "2人份起订 · 每份套餐可从A~E中免费选1样：泡菜汤 · 大酱汤 · 泡菜冷汤面 · 腌萝卜拌面 · 锅巴汤",
      "2人前以上でご注文可 · 各コンボにA～Eから1品無料（1つ選択）：キムチチゲ · テンジャンチゲ · キムチマル冷麺 · たくあんビビン麺 · おこげスープ",
      "Gọi từ 2 phần trở lên · Mỗi combo được tặng 1 món trong A–E (chọn 1): canh kim chi · canh tương đậu · mì kim chi lạnh · mì trộn củ cải vàng · súp cơm cháy",
    ),
    items: [
      it(220000, null, "숙성 삼겹살 콤보", "Aged Pork Belly Combo", "熟成五花肉套餐", "熟成 サムギョプサル コンボ", "Combo thịt ba chỉ ủ", { desc: G(150) }),
      it(220000, null, "숙성 꽃목살 콤보", "Aged Pork Neck Combo", "熟成花颈肉套餐", "熟成 コッモクサル コンボ", "Combo nạc vai ủ", { desc: G(150) }),
      it(220000, null, "양념 돼지갈비 콤보", "Marinated Pork Ribs Combo", "腌制猪排骨套餐", "味付け 豚カルビ コンボ", "Combo sườn lợn tẩm gia vị", { desc: G(200) }),
      it(370000, null, "마늘 양념 갈비살 콤보", "Garlic-Marinated Beef Rib Finger Combo", "蒜香腌制牛肋条套餐", "ガーリック味付け カルビサル コンボ", "Combo dẻ sườn bò có gia vị", { desc: G(150) }),
      it(520000, null, "마늘 양념 안창살 콤보", "Garlic-Marinated Beef Skirt Combo", "蒜香腌制牛横膈膜套餐", "ガーリック味付け アンチャンサル コンボ", "Combo diềm thăn bò có gia vị", { desc: G(150) }),
      it(680000, null, "숙성 꽃살 프라임 콤보", "Aged Prime Beef Ribeye Cap Combo", "熟成特选花肉套餐", "熟成 コッサル プライム コンボ", "Combo sườn bò không xương prime ủ", { desc: G(150) }),
      it(1700000, null, "숙성 소한마리 콤보", "Aged Whole Beef Combo (So Hanmari)", "熟成整牛套餐", "熟成 牛一頭 コンボ（ソ ハンマリ）", "Combo bò ủ tổng hợp", {
        desc: T("2~3인 · 500g = 숙성 와규 · 살치 · 안창살 · 꽃살 · 갈비살", "2–3 people · 500g = Aged Wagyu · Salchi · Skirt · Kkotsal · Rib Finger", "2~3人 · 500克 = 熟成和牛 · 牛肩胛脊肉 · 牛横膈膜 · 花肉 · 牛肋条", "2～3人 · 500g = 熟成和牛・サルチ・アンチャン・コッサル・カルビサル", "2–3 người · 500g = Wagyu ủ · Bẹ vai · Diềm thăn · Sườn bò không xương · Dẻ sườn"),
      }),
    ],
  },
  {
    id: "meal",
    name: T("식사 · 찌개", "MEALS & STEWS", "主食与汤锅", "お食事・チゲ", "MÓN CHÍNH & CANH"),
    note: T(
      "후식(S)은 고기 주문 시에만 주문 가능 · 공기밥 무료",
      "Dessert size (S) can only be ordered with a meat order · Steamed rice is free",
      "餐后小份（S）仅限点肉时加点 · 米饭免费",
      "食後用（S）はお肉をご注文の場合のみ · ご飯は無料",
      "Phần ăn sau bữa (S) chỉ gọi được khi có gọi thịt · Cơm trắng miễn phí",
    ),
    items: [
      it(160000, "doenjang", "된장찌개", "Soybean Paste Stew (Doenjang-jjigae)", "大酱汤", "テンジャンチゲ（味噌チゲ）", "Canh tương đậu", { desc: T("후식 사이즈(S) 80,000동", "Dessert size (S) 80,000 VND", "餐后小份（S）80,000越南盾", "食後用サイズ（S）80,000ドン", "Phần ăn sau bữa (S) 80,000đ") }),
      it(160000, null, "김치찌개", "Kimchi Stew (Kimchi-jjigae)", "泡菜汤", "キムチチゲ", "Canh kim chi", { spicy: true, desc: T("후식 사이즈(S) 80,000동", "Dessert size (S) 80,000 VND", "餐后小份（S）80,000越南盾", "食後用サイズ（S）80,000ドン", "Phần ăn sau bữa (S) 80,000đ") }),
      it(160000, "kimchimal", "김치말이 국수", "Cold Kimchi Broth Noodles (Kimchimal Guksu)", "泡菜冷汤面", "キムチマル冷麺（冷たいキムチスープ麺）", "Mì kim chi lạnh", { desc: T("후식 사이즈(S) 80,000동", "Dessert size (S) 80,000 VND", "餐后小份（S）80,000越南盾", "食後用サイズ（S）80,000ドン", "Phần ăn sau bữa (S) 80,000đ") }),
      it(160000, null, "단무지 비빔국수", "Mixed Noodles with Pickled Radish (Danmuji Bibim Guksu)", "腌萝卜拌面", "たくあんビビン麺", "Mì trộn củ cải vàng", { desc: T("후식 사이즈(S) 80,000동", "Dessert size (S) 80,000 VND", "餐后小份（S）80,000越南盾", "食後用サイズ（S）80,000ドン", "Phần ăn sau bữa (S) 80,000đ") }),
      it(160000, null, "누룽지", "Scorched Rice Soup (Nurungji)", "锅巴汤", "おこげスープ（ヌルンジ）", "Súp cơm cháy", { desc: T("후식 사이즈(S) 80,000동", "Dessert size (S) 80,000 VND", "餐后小份（S）80,000越南盾", "食後用サイズ（S）80,000ドン", "Phần ăn sau bữa (S) 80,000đ") }),
    ],
  },
  {
    id: "jeongol",
    name: T("전골", "HOT POTS", "火锅", "鍋料理（チョンゴル）", "LẨU"),
    items: [
      it(360000, null, "소고기 된장 전골", "Beef Soybean Paste Hot Pot (Sogogi Doenjang Jeongol)", "牛肉大酱火锅", "牛肉テンジャン鍋（チョンゴル）", "Thịt bò lẩu tương đậu", { desc: T("2~3인", "2–3 servings", "2~3人份", "2～3人前", "2–3 người ăn") }),
      it(360000, null, "돼지고기 김치 전골", "Pork Kimchi Hot Pot (Dwaeji Kimchi Jeongol)", "猪肉泡菜火锅", "豚肉キムチ鍋（チョンゴル）", "Thịt lợn lẩu kim chi", { spicy: true, desc: T("2~3인", "2–3 servings", "2~3人份", "2～3人前", "2–3 người ăn") }),
      it(680000, null, "소불고기 전골", "Beef Bulgogi Hot Pot (So Bulgogi Jeongol)", "牛肉烤肉火锅", "牛プルコギ鍋（チョンゴル）", "Lẩu bulgogi", { desc: T("2~3인", "2–3 servings", "2~3人份", "2～3人前", "2–3 người ăn") }),
      it(750000, null, "소곱창 짜그리", "Beef Small Intestine Hot Pot, Thick Broth (So Gopchang Jjagwuri)", "牛小肠浓汤锅（Jjagwuri）", "牛ホルモン煮込み鍋（ソコプチャン チャグリ）", "Lẩu lòng bò ít nước", { desc: T("2~3인", "2–3 servings", "2~3人份", "2～3人前", "2–3 người ăn") }),
    ],
  },
  {
    id: "drinks",
    name: T("주류", "DRINKS", "酒水", "お酒", "ĐỒ UỐNG"),
    note: T(
      "외부 주류 반입 시 주류차지 500,000동 · 모든 가격 병 기준",
      "Corkage fee for outside alcohol: 500,000 VND · All prices are per bottle",
      "自带酒水需收开瓶费500,000越南盾 · 所有价格均按瓶计",
      "お酒の持ち込みは持ち込み料500,000ドン · 価格はすべて1本あたり",
      "Phí đồ uống bên ngoài 500.000đ · Tất cả giá tính theo chai",
    ),
    items: [
      it(50000, null, "사이공 맥주", "Saigon Beer", "西贡啤酒", "サイゴンビール", "Bia Sài Gòn"),
      it(50000, null, "타이거 맥주", "Tiger Beer", "虎牌啤酒", "タイガービール", "Bia Tiger"),
      it(140000, null, "참이슬", "Chamisul Soju", "真露烧酒（Chamisul）", "チャミスル（焼酎）", "Soju Chamisul"),
      it(140000, null, "처음처럼", "Chum-churum Soju", "初饮初乐烧酒（Chum-churum）", "チョウムチョロム（焼酎）", "Soju Chum Churum"),
      it(140000, null, "새로", "Saero Soju", "新乐烧酒（Saero）", "セロ（焼酎）", "Soju Saero"),
      it(140000, null, "진로 이즈백", "Jinro Is Back Soju", "真露 Is Back 烧酒", "ジンロ イズバック（焼酎）", "Soju Jinro Is Back"),
      it(120000, null, "좋은데이", "Good Day Soju (Joeunday)", "好日子烧酒（Joeunday）", "チョウンデー（焼酎）", "Soju Good Day"),
      it(140000, null, "청포도에이슬", "Green Grape Soju (Cheongpodo Eseul)", "青提子烧酒（Cheongpodo Eseul）", "青ぶどうチャミスル（Cheongpodo Eseul）", "Soju vị nho xanh"),
      it(140000, null, "자두에이슬", "Plum Soju (Jadu Eseul)", "李子烧酒（Jadu Eseul）", "すももチャミスル（Jadu Eseul）", "Soju vị mận"),
      it(140000, null, "딸기에이슬", "Strawberry Soju (Ttalgi Eseul)", "草莓烧酒（Ttalgi Eseul）", "いちごチャミスル（Ttalgi Eseul）", "Soju vị dâu"),
      it(140000, null, "자몽에이슬", "Grapefruit Soju (Jamong Eseul)", "西柚烧酒（Jamong Eseul）", "グレープフルーツチャミスル（Jamong Eseul）", "Soju vị bưởi"),
    ],
  },
];
