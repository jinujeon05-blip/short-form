// 삼계탕천국 Samgyetang Cheonguk 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(사진 수집기 2026-11-10)
//   삼계탕 menu_06·04 / 갈비탕 menu_03·19 / 닭한마리 menu_05 / 스페셜 menu_02 / 갈비찜·전골 menu_01·12 / 냉면 menu_22
//   신메뉴 입간판 menu_10·20 / 콤보 menu_11 / 한방차·주류·추가메뉴 menu_07 / 전체 메뉴 보드 menu_08·23
// 읽기: 안티그래비티(제미나이) → 재대조: 운영 감찰관(안티그래비티 Claude Sonnet)
// price: 한 가지 가격 / sizes: [["½", 반계탕 가격], ["1", 한 마리 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
// 가격이 사진마다 다른 것(한방 갈비탕·콤보)은 높은 쪽 — docs/todo.md 에 적음
window.RESTAURANT = {
  brand: { ko: "삼계탕천국", en: "Samgyetang Cheonguk" },
  phone: "082 398 2136",
  address: "Lô 68 TT4, P. Đỗ Đình Thiện, Mỹ Đình 1, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "09:00 – 02:00",
};

const it = (price, ko, en, zh, ja, vi, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price }), name: { ko, en, zh, ja, vi }, ...x });
const hw = (half, whole) => [["½", half * 1000], ["1", whole * 1000]]; // 반계탕 / 한 마리
const cat = (id, ko, en, zh, ja, vi, items, x = {}) => ({ id, name: { ko, en, zh, ja, vi }, ...x, items });
const hot = { spicy: true };

window.MENU = [
  cat("samgyetang", "삼계탕", "Samgyetang", "参鸡汤", "サムゲタン", "Gà hầm sâm", [
    it(hw(150, 250), "전통 삼계탕", "Traditional Samgyetang", "传统参鸡汤", "伝統サムゲタン", "Gà hầm truyền thống", { photo: "img/samgyetang.jpg" }),
    it(hw(200, 300), "전통 전복 삼계탕", "Traditional Abalone Samgyetang", "传统鲍鱼参鸡汤", "伝統アワビサムゲタン", "Gà hầm bào ngư truyền thống", { photo: "img/jeonbok-samgyetang.jpg" }),
    it(hw(160, 270), "얼큰 삼계탕", "Spicy Samgyetang", "香辣参鸡汤", "ピリ辛サムゲタン", "Gà hầm cay", hot),
    it(hw(210, 320), "얼큰 전복 삼계탕", "Spicy Abalone Samgyetang", "香辣鲍鱼参鸡汤", "ピリ辛アワビサムゲタン", "Gà hầm bào ngư cay", hot),
    it(hw(180, 300), "영양 삼계탕", "Nourishing Samgyetang", "营养参鸡汤", "栄養サムゲタン", "Gà hầm dinh dưỡng"),
    it(hw(230, 350), "영양 전복 삼계탕", "Nourishing Abalone Samgyetang", "营养鲍鱼参鸡汤", "栄養アワビサムゲタン", "Gà hầm bào ngư dinh dưỡng"),
    it(hw(180, 300), "한방 삼계탕", "Herbal Samgyetang", "韩方药膳参鸡汤", "韓方サムゲタン", "Gà hầm đông y"),
    it(hw(230, 350), "한방 전복 삼계탕", "Herbal Abalone Samgyetang", "韩方药膳鲍鱼参鸡汤", "韓方アワビサムゲタン", "Gà hầm bào ngư đông y"),
    it(hw(180, 300), "블랙 삼계탕", "Black Samgyetang", "黑色参鸡汤", "ブラックサムゲタン", "Gà hầm đen"),
    it(hw(230, 350), "블랙 전복 삼계탕", "Black Abalone Samgyetang", "黑色鲍鱼参鸡汤", "ブラックアワビサムゲタン", "Gà hầm bào ngư đen"),
    it(hw(180, 300), "쌍화 삼계탕", "Ssanghwa Herbal Samgyetang", "双和参鸡汤", "サンファ（双和）サムゲタン", "Gà hầm thảo dược đen"),
    it(hw(230, 350), "쌍화 전복 삼계탕", "Ssanghwa Herbal Abalone Samgyetang", "双和鲍鱼参鸡汤", "サンファ（双和）アワビサムゲタン", "Gà hầm bào ngư thảo dược đen"),
    it(hw(180, 300), "사물 삼계탕", "Samul (Four-herb) Samgyetang", "四物参鸡汤", "サムル（四物）サムゲタン", "Gà hầm Samul"),
    it(hw(230, 350), "사물 전복 삼계탕", "Samul (Four-herb) Abalone Samgyetang", "四物鲍鱼参鸡汤", "サムル（四物）アワビサムゲタン", "Gà hầm bào ngư Samul"),
    it(hw(180, 300), "마라 삼계탕", "Mala Samgyetang", "麻辣参鸡汤", "麻辣（マーラー）サムゲタン", "Gà hầm Mala", hot),
    it(hw(230, 350), "마라 전복 삼계탕", "Mala Abalone Samgyetang", "麻辣鲍鱼参鸡汤", "麻辣（マーラー）アワビサムゲタン", "Gà hầm bào ngư Mala", hot),
    it(hw(180, 300), "하수오 삼계탕", "Hasuo (Fo-ti Root) Samgyetang", "何首乌参鸡汤", "何首烏（カシュウ）サムゲタン", "Gà hầm hà thủ ô"),
    it(hw(230, 350), "하수오 전복 삼계탕", "Hasuo (Fo-ti Root) Abalone Samgyetang", "何首乌鲍鱼参鸡汤", "何首烏（カシュウ）アワビサムゲタン", "Gà hầm bào ngư hà thủ ô"),
  ], { note: { ko: "½ = 반계탕(반 마리) · 1 = 한 마리", en: "½ = half chicken · 1 = whole chicken", zh: "½ = 半只 · 1 = 整只", ja: "½ = 半羽 · 1 = 一羽", vi: "½ = nửa con · 1 = một con" } }),

  cat("galbitang", "갈비탕", "Galbitang", "排骨汤", "カルビタン", "Canh sườn bò", [
    it(250000, "전통 갈비탕", "Traditional Galbitang (Beef Short Rib Soup)", "传统牛排骨汤", "伝統カルビタン", "Canh sườn truyền thống"),
    it(310000, "전통 전복 갈비탕", "Traditional Abalone Galbitang", "传统鲍鱼牛排骨汤", "伝統アワビカルビタン", "Canh sườn bào ngư truyền thống", { photo: "img/jeonbok-galbitang.jpg" }),
    it(270000, "얼큰 갈비탕", "Spicy Galbitang", "香辣牛排骨汤", "ピリ辛カルビタン", "Canh sườn cay", hot),
    it(330000, "매운 전복 갈비탕", "Spicy Abalone Galbitang", "辣味鲍鱼牛排骨汤", "辛口アワビカルビタン", "Canh sườn bào ngư cay", hot),
    it(300000, "한방 갈비탕", "Herbal Galbitang", "韩方药膳牛排骨汤", "韓方カルビタン", "Canh sườn đông y"),
    it(350000, "한방 전복 갈비탕", "Herbal Abalone Galbitang", "韩方药膳鲍鱼牛排骨汤", "韓方アワビカルビタン", "Canh sườn bào ngư đông y"),
  ]),

  cat("dakhanmari", "닭한마리", "Whole Chicken Hot Pot", "一只鸡火锅", "タッカンマリ", "Lẩu gà Hàn Quốc", [
    it(600000, "전통 닭한마리", "Traditional Whole Chicken Hot Pot (Dak-hanmari)", "传统一只鸡火锅", "伝統タッカンマリ（丸鶏鍋）", "Lẩu gà một con truyền thống"),
    it(650000, "얼큰 닭한마리", "Spicy Whole Chicken Hot Pot", "香辣一只鸡火锅", "ピリ辛タッカンマリ", "Lẩu gà một con cay", hot),
    it(700000, "마라 닭한마리", "Mala Whole Chicken Hot Pot", "麻辣一只鸡火锅", "麻辣（マーラー）タッカンマリ", "Lẩu gà Mala Trung Quốc", hot),
    it(700000, "한방 닭한마리", "Herbal Whole Chicken Hot Pot", "韩方药膳一只鸡火锅", "韓方タッカンマリ", "Lẩu gà thuốc bắc"),
  ]),

  cat("special", "스페셜 메뉴", "Special Menu", "特色菜", "スペシャルメニュー", "Menu đặc biệt", [
    it(650000, "닭다리 안동 찜닭", "Andong Braised Chicken Legs (Jjimdak)", "安东炖鸡腿", "鶏もも肉の安東チムタク", "Đùi gà om Andong"),
    it(650000, "닭다리 볶음탕", "Spicy Braised Chicken Legs (Dak-bokkeumtang)", "辣炖鸡腿", "鶏もも肉のタッポックムタン（辛口煮込み）", "Đùi gà hầm cay", hot),
    it(650000, "닭다리 묵은지 볶음탕", "Spicy Braised Chicken Legs with Aged Kimchi", "陈年泡菜辣炖鸡腿", "鶏もも肉と熟成キムチの辛口煮込み", "Đùi gà hầm kimchi", hot),
    it(330000, "국물 닭발", "Spicy Chicken Feet in Broth", "汤汁辣鸡爪", "汁あり激辛鶏足（タッパル）", "Chân gà sốt cay", hot),
  ]),

  cat("new", "천국 신메뉴", "New Menu", "新品", "新メニュー", "Món mới", [
    it(400000, "천국 생닭다리 구이", "Grilled Fresh Chicken Thigh", "烤鲜鸡腿肉", "生鶏もも肉の焼き物", "Má đùi gà nướng"),
    it(350000, "천국 미나리 삼겹살", "Grilled Pork Belly with Water Parsley", "水芹烤五花肉", "セリサムギョプサル", "Ba chỉ nướng rau cần", { desc: { ko: "삼겹살 또는 목살", en: "Pork belly or pork neck", zh: "五花肉或梅花肉", ja: "サムギョプサルまたは豚肩ロース", vi: "Ba chỉ hoặc thịt cổ heo" } }),
    it(500000, "천국 닭갈비", "Spicy Stir-fried Chicken (Dak-galbi)", "辣炒鸡排", "タッカルビ", "Gà xào cay", hot),
  ]),

  cat("galbi", "갈비찜 · 전골", "Braised Ribs · Hot Pot", "炖排骨 · 火锅", "カルビチム・鍋", "Sườn om · Lẩu sườn", [
    it(700000, "전통 갈비찜", "Traditional Braised Beef Short Ribs", "传统炖牛排骨", "伝統カルビチム（牛カルビの煮込み）", "Sườn om truyền thống"),
    it(700000, "매운 갈비찜", "Spicy Braised Beef Short Ribs", "辣炖牛排骨", "辛口カルビチム", "Sườn om cay", hot),
    it(700000, "전통 갈비 전골", "Traditional Beef Short Rib Hot Pot", "传统牛排骨火锅", "伝統カルビ鍋", "Lẩu sườn truyền thống"),
    it(720000, "매운 갈비 전골", "Spicy Beef Short Rib Hot Pot", "辣牛排骨火锅", "辛口カルビ鍋", "Lẩu sườn cay", hot),
    it(750000, "한방 갈비 전골", "Herbal Beef Short Rib Hot Pot", "韩方药膳牛排骨火锅", "韓方カルビ鍋", "Lẩu sườn đông y"),
  ]),

  cat("naengmyeon", "냉면", "Cold Noodles", "冷面", "冷麺", "Mì lạnh", [
    it(130000, "물냉면", "Mul-naengmyeon (Cold Buckwheat Noodles in Broth)", "水冷面", "水冷麺（ムルネンミョン）", "Mì lạnh nước", { photo: "img/naengmyeon.jpg" }),
    it(130000, "비빔냉면", "Bibim-naengmyeon (Spicy Mixed Cold Noodles)", "拌冷面", "ビビン冷麺", "Mì lạnh trộn", hot),
  ]),

  cat("combo", "콤보", "Combo", "套餐", "コンボ", "Combo", [
    it(1160000, "콤보 원", "Combo 1", "套餐 1", "コンボ 1", "Combo 1", { desc: { ko: "매운 갈비찜 + 계란찜 + 블랙 전복 삼계탕 + 콜라", en: "Spicy braised beef short ribs + steamed egg + black abalone samgyetang + cola", zh: "辣炖牛排骨 + 鸡蛋羹 + 黑色鲍鱼参鸡汤 + 可乐", ja: "辛口カルビチム + ケランチム（茶碗蒸し風）+ ブラックアワビサムゲタン + コーラ", vi: "Sườn om cay + trứng hấp + gà hầm bào ngư đen + Coca" } }),
    it(1160000, "콤보 투", "Combo 2", "套餐 2", "コンボ 2", "Combo 2", { desc: { ko: "전통 갈비찜 + 물냉면 + 국물 닭발", en: "Traditional braised beef short ribs + cold buckwheat noodles + spicy chicken feet", zh: "传统炖牛排骨 + 水冷面 + 汤汁辣鸡爪", ja: "伝統カルビチム + 水冷麺 + 汁あり激辛鶏足", vi: "Sườn om truyền thống + mì lạnh nước + chân gà sốt cay" } }),
  ], { note: { ko: "2~3인용", en: "Serves 2–3 people", zh: "2~3人份", ja: "2〜3人前", vi: "Dành cho 2–3 người" } }),

  cat("add", "추가 메뉴", "Add-ons", "加点", "追加メニュー", "Món thêm", [
    it(40000, "당면", "Glass Noodles", "粉丝", "春雨", "Miến"),
    it(40000, "우동", "Udon Noodles", "乌冬面", "うどん", "Mì Udon"),
    it(40000, "칼국수", "Kalguksu (Knife-cut Noodles)", "刀切面", "カルグクス", "Mì Kalguksu"),
    it(40000, "떡볶이", "Tteokbokki (Rice Cakes)", "辣炒年糕", "トッポッキ", "Bánh gạo Tokbokki"),
    it(60000, "볶음밥", "Fried Rice", "炒饭", "ポックンパ（焼き飯）", "Cơm rang"),
    it(20000, "밥", "Steamed Rice", "米饭", "ご飯", "Cơm"),
    it(70000, "주먹밥", "Rice Balls", "饭团", "おにぎり", "Cơm nắm"),
    it(30000, "찰밥", "Glutinous Rice", "糯米饭", "もち米ご飯", "Cơm nếp"),
    it(100000, "달걀프라이", "Fried Egg", "煎蛋", "目玉焼き", "Trứng ốp la"),
    it(50000, "전복 (추가)", "Extra Abalone", "加鲍鱼", "アワビ追加", "Thêm bào ngư"),
    it(300000, "갈비 (추가)", "Extra Beef Short Ribs", "加牛排骨", "カルビ追加", "Thêm sườn"),
    it(350000, "갈비찜 추가", "Extra Braised Beef Short Ribs (Galbijjim)", "加炖牛排骨", "カルビチム追加", "Thêm sườn om"),
    it(200000, "닭똥집 볶음", "Stir-fried Chicken Gizzards", "炒鸡胗", "砂肝炒め", "Mề gà xào"),
  ]),

  cat("tonic", "보약 · 한방차", "Herbal Tonics & Tea", "补药 · 韩方茶", "韓方茶・滋養ドリンク", "Thuốc bổ & thảo dược", [
    it(70000, "십전대보탕", "Sipjeondaebo-tang (Ten-herb Tonic)", "十全大补汤", "十全大補湯", "Thập toàn đại bổ"),
    it(70000, "쌍화", "Ssanghwa Herbal Tea", "双和茶", "サンファ茶（双和茶）", "Thảo dược đen Ssanghwa"),
    it(70000, "사물탕", "Samul-tang (Four-herb Tonic)", "四物汤", "四物湯", "Tứ vật thang (Samul)"),
    it(70000, "하수오", "Hasuo (Fo-ti Root) Tea", "何首乌茶", "何首烏茶", "Hà thủ ô"),
  ]),

  cat("drinks", "주류 · 음료", "Drinks", "酒水 · 饮料", "お酒・ドリンク", "Rượu Hàn Quốc · Nước giải khát", [
    it(140000, "참이슬", "Chamisul Soju", "真露 Chamisul 烧酒", "チャミスル", "Rượu Chamisul"),
    it(140000, "처음처럼", "Chum Churum Soju", "初饮初乐烧酒", "チョウムチョロム", "Rượu Chum Churum"),
    it(140000, "진로", "Jinro Soju", "真露 Jinro 烧酒", "ジンロ", "Rượu Jinro"),
    it(140000, "새로", "Saero Soju", "Saero 烧酒", "セロ", "Rượu Saero"),
    it(180000, "막걸리", "Makgeolli (Rice Wine)", "马格利米酒", "マッコリ", "Rượu gạo Makgeolli"),
    it(70000, "생맥주", "Draft Beer", "生啤酒", "生ビール", "Bia tươi"),
    it(20000, "콜라", "Coca-Cola", "可乐", "コーラ", "Coca-Cola"),
    it(20000, "콜라 제로", "Coca-Cola Zero", "零度可乐", "コーラゼロ", "Coca-Cola Zero"),
    it(20000, "스프라이트", "Sprite", "雪碧", "スプライト", "Sprite"),
    it(20000, "환타", "Fanta", "芬达", "ファンタ", "Fanta"),
  ]),
];
