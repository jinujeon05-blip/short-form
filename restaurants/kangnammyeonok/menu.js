// 강남면옥(Kangnam Myeonok) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진 2026-11-12. 가격 VND, 부가세 별도
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만 — 정사각형이면 양옆 흰 여백)
// 메뉴판 사진끼리 가격이 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "강남면옥", en: "Kangnam Myeonok" },
  phone: "0979 900 680",
  address: "125 Ngọc Hân Công Chúa, Bắc Ninh",
  wifi: null,
  hours: "11:00 – 22:30",
};

window.MENU = [
  {
    id: "main",
    name: { ko: "식사메뉴", en: "Main Dishes", zh: "主食", ja: "お食事", vi: "Món ăn chính" },
    items: [
      { name: { ko: "코다리 냉면", en: "Kodari Spicy Cold Noodles", zh: "鳕鱼干拌冷面(Kodari)", ja: "コダリ冷麺", vi: "Miến trộn Kodari" }, price: 160000, tag: "best", spicy: true, photo: "img/kodari.jpg" },
      { name: { ko: "물냉면", en: "Mul Naengmyeon (Cold Noodle Soup)", zh: "水冷面", ja: "水冷麺(ムル冷麺)", vi: "Miến nước" }, price: 160000, tag: "best", photo: "img/mulnaengmyeon.jpg" },
      { name: { ko: "사리 추가", en: "Extra Noodles", zh: "加面", ja: "麺の追加", vi: "Miến ăn thêm" }, price: 60000 },
      { name: { ko: "고기만두", en: "Meat Dumplings (Gogi Mandu)", zh: "肉馅饺子", ja: "肉餃子", vi: "Bánh bao thịt" }, price: 80000 },
      { name: { ko: "장어탕", en: "Eel Soup (Jangeotang)", zh: "鳗鱼汤", ja: "うなぎスープ(チャンオタン)", vi: "Canh cá trình" }, price: 160000 },
      { name: { ko: "설렁탕", en: "Beef Bone Soup (Seolleongtang)", zh: "雪浓汤", ja: "ソルロンタン", vi: "Canh thịt bò" }, price: 160000 },
      { name: { ko: "김치찌개", en: "Kimchi Stew (Kimchi Jjigae)", zh: "泡菜汤", ja: "キムチチゲ", vi: "Canh kimchi" }, price: 140000, spicy: true },
      { name: { ko: "된장찌개", en: "Soybean Paste Stew (Doenjang Jjigae)", zh: "大酱汤", ja: "テンジャンチゲ", vi: "Canh tương thịt bò" }, price: 140000 },
      { name: { ko: "떡만두국", en: "Rice Cake & Dumpling Soup (Tteok Manduguk)", zh: "年糕饺子汤", ja: "トックマンドゥクク", vi: "Canh bánh gạo màn thầu" }, price: 160000 },
      { name: { ko: "황태탕", en: "Dried Pollack Soup (Hwangtaetang)", zh: "黄太汤(干明太鱼汤)", ja: "ファンテタン(干しスケトウダラのスープ)", vi: "Canh cá" }, price: 160000 },
      { name: { ko: "뚝배기 불고기 1인", en: "Bulgogi Hot Pot (1 person)", zh: "砂锅烤肉 1人份", ja: "トゥッペギ・プルコギ 1人前", vi: "Lẩu bò 1 người" }, price: 250000 },
      { name: { ko: "돌솥비빔밥", en: "Stone Pot Bibimbap", zh: "石锅拌饭", ja: "石焼きビビンバ", vi: "Cơm trộn Hàn Quốc" }, price: 160000 },
    ],
  },
  {
    id: "beef",
    name: { ko: "소고기 숯불구이 (2인분 이상 주문)", en: "Charcoal-Grilled Beef (min. 2 servings)", zh: "炭火烤牛肉(2人份起点)", ja: "牛肉の炭火焼き(2人前から)", vi: "Thịt bò nướng than (gọi từ 2 phần)" },
    items: [
      { name: { ko: "민물장어 (1kg은 2인분 이상)", en: "Freshwater Eel (1kg: 2+ servings)", zh: "淡水鳗鱼(1kg需2人份以上)", ja: "淡水うなぎ(1kgは2人前以上)", vi: "Cá trình (1kg từ 2 phần)" }, sizes: [["500g", 700000], ["1kg", 1200000]], tag: "special", photo: "img/eel.jpg" },
      { name: { ko: "꽃살 (160g)", en: "Beef Flower Ribs (160g)", zh: "花肋肉 (160g)", ja: "ハナサル(牛カルビ・160g)", vi: "Sườn non bò (160g)" }, price: 550000 },
      { name: { ko: "소고기 모듬 (550g)", en: "Assorted Beef Set (550g)", zh: "牛肉拼盘 (550g)", ja: "牛肉盛り合わせ(550g)", vi: "Set thịt bò (550g)" }, price: 990000 },
      { name: { ko: "프라임 소갈비 (300g)", en: "Prime Beef Short Ribs (300g)", zh: "精选牛排骨 (300g)", ja: "プライム牛カルビ(300g)", vi: "Sườn bò tẩm ướp (300g)" }, price: 400000, photo: "img/galbi.jpg" },
      { name: { ko: "안창살 (160g)", en: "Beef Skirt Steak (Anchangsal, 160g)", zh: "牛横膈膜肉 (160g)", ja: "アンチャンサル(牛ハラミ・160g)", vi: "Diềm thăn bò (160g)" }, price: 390000 },
      { name: { ko: "갈비살 (160g)", en: "Beef Rib Meat (Galbisal, 160g)", zh: "牛肋条肉 (160g)", ja: "カルビサル(160g)", vi: "Dẻ sườn bò (160g)" }, price: 270000 },
      { name: { ko: "양념갈비살 (160g)", en: "Marinated Beef Rib Meat (160g)", zh: "腌制牛肋条肉 (160g)", ja: "味付けカルビサル(160g)", vi: "Dẻ sườn bò tẩm ướp (160g)" }, price: 270000 },
      { name: { ko: "차돌박이 (160g)", en: "Beef Brisket (Chadolbaegi, 160g)", zh: "牛胸腹薄片 (160g)", ja: "チャドルバギ(牛バラ薄切り・160g)", vi: "Gầu bò (160g)" }, price: 200000 },
      { name: { ko: "소고기 주물럭 (160g)", en: "Seasoned Beef (Jumulleok, 160g)", zh: "调味牛肉 (160g)", ja: "牛肉のジュムルロク(味付け・160g)", vi: "Vai bò tẩm ướp (160g)" }, price: 250000 },
      { name: { ko: "꼼장어 (300g)", en: "Grilled Hagfish (Kkomjangeo, 300g)", zh: "烤盲鳗 (300g)", ja: "コムジャンオ(ぬめりうなぎ)焼き(300g)", vi: "Cá mầm đá (300g)" }, price: 500000, spicy: true },
      { name: { ko: "새우 (10마리)", en: "Shrimp (10 pcs)", zh: "虾 (10只)", ja: "えび(10尾)", vi: "Tôm (10 con)" }, price: 240000 },
    ],
  },
  {
    id: "pork",
    name: { ko: "돼지구이", en: "Grilled Pork", zh: "烤猪肉", ja: "豚肉焼き", vi: "Thịt lợn nướng" },
    items: [
      { name: { ko: "돼지갈비 (250g)", en: "Pork Ribs (250g)", zh: "猪排骨 (250g)", ja: "豚カルビ(250g)", vi: "Sườn lợn tẩm ướp (250g)" }, price: 200000 },
      { name: { ko: "항정살 (180g)", en: "Pork Jowl (Hangjeongsal, 180g)", zh: "猪颈肉 (180g)", ja: "ハンジョンサル(豚頬肉・180g)", vi: "Thịt má lợn (180g)" }, price: 180000 },
      { name: { ko: "삼겹살 (180g)", en: "Pork Belly (Samgyeopsal, 180g)", zh: "五花肉 (180g)", ja: "サムギョプサル(180g)", vi: "Thịt ba chỉ (180g)" }, price: 170000 },
      { name: { ko: "목살 (180g)", en: "Pork Neck (Moksal, 180g)", zh: "猪颈背肉 (180g)", ja: "モクサル(豚肩ロース・180g)", vi: "Nạc vai lợn (180g)" }, price: 170000 },
      { name: { ko: "대패삼겹살 (150g)", en: "Thin-Sliced Pork Belly (Daepae Samgyeopsal, 150g)", zh: "薄切五花肉 (150g)", ja: "テペサムギョプサル(薄切り豚バラ・150g)", vi: "Ba chỉ lát mỏng (150g)" }, price: 170000 },
      { name: { ko: "돼지고기 모듬 (600g)", en: "Assorted Pork Set (600g)", zh: "猪肉拼盘 (600g)", ja: "豚肉盛り合わせ(600g)", vi: "Set thịt lợn (600g)" }, price: 520000 },
    ],
  },
  {
    id: "jorim",
    name: { ko: "조림·전골", en: "Braised Dishes & Hot Pots", zh: "炖菜·火锅", ja: "煮込み・鍋", vi: "Kho · Lẩu" },
    items: [
      { name: { ko: "왕코다리조림", en: "Braised Semi-Dried Pollack, Large (Wang Kodari Jorim)", zh: "特大炖鳕鱼干(Kodari)", ja: "王コダリの煮付け", vi: "Cá minh thái kho" }, sizes: [["소 2~3인", 660000], ["중 3~4인", 880000], ["대 4~5인", 1100000]], spicy: true, photo: "img/kodarijorim.jpg" },
      { name: { ko: "왕코다리조림 점심특선 2인분 (점심시간 솥밥 무료, 공기밥 별도)", en: "Braised Pollack Lunch Special for 2 (free pot rice at lunch, steamed rice extra)", zh: "特大炖鳕鱼干午餐特惠 2人份(午餐时段免费锅饭,白米饭另收费)", ja: "王コダリの煮付けランチ特選 2人前(ランチ時間は釜飯無料、ご飯は別料金)", vi: "Cá minh thái kho đặc biệt trưa 2 người (miễn phí cơm thố giờ trưa, cơm trắng tính riêng)" }, price: 440000, spicy: true },
      { name: { ko: "코다리 갈비 조림", en: "Braised Pollack with Ribs (Kodari Galbi Jorim)", zh: "鳕鱼干炖排骨", ja: "コダリとカルビの煮込み", vi: "Cá minh thái kho sườn" }, sizes: [["소", 690000], ["중", 920000], ["대", 1150000]], spicy: true },
      { name: { ko: "코다리 쭈꾸미 조림", en: "Braised Pollack with Webfoot Octopus (Kodari Jjukkumi Jorim)", zh: "鳕鱼干炖小章鱼", ja: "コダリとチュクミの煮込み", vi: "Cá minh thái kho bạch tuộc" }, sizes: [["소", 750000], ["중", 1000000], ["대", 1250000]], spicy: true },
      { name: { ko: "촌불고기 2인분", en: "Country-Style Bulgogi Hot Pot (2 servings)", zh: "乡村烤肉锅 2人份", ja: "田舎プルコギ 2人前", vi: "Lẩu bò 2 xuất" }, price: 440000, tag: "must", photo: "img/chonbulgogi.jpg" },
      { name: { ko: "촌불고기 1인분 추가", en: "Country-Style Bulgogi, Extra Serving (1 person)", zh: "乡村烤肉锅 加1人份", ja: "田舎プルコギ 1人前追加", vi: "Lẩu bò thêm 1 xuất" }, price: 220000 },
      { name: { ko: "동태찌개", en: "Pollack Stew (Dongtae Jjigae)", zh: "明太鱼汤锅", ja: "トンテチゲ(スケトウダラ鍋)", vi: "Canh cá Dong The" }, sizes: [["중 2인", 400000], ["대 3~4인", 700000]], spicy: true },
      { name: { ko: "등갈비 김치찜 (3~4인)", en: "Braised Pork Ribs with Kimchi (Deunggalbi Kimchi Jjim, 3-4 people)", zh: "泡菜炖猪肋排(3~4人份)", ja: "スペアリブのキムチ蒸し(3~4人前)", vi: "Sườn heo om kimchi (3-4 người)" }, price: 550000, spicy: true },
    ],
  },
  {
    id: "anju",
    name: { ko: "안주·볶음", en: "Bar Snacks & Stir-Fries", zh: "下酒菜·炒菜", ja: "おつまみ・炒め物", vi: "Món nhậu" },
    items: [
      { name: { ko: "쭈꾸미 볶음", en: "Spicy Stir-Fried Webfoot Octopus (Jjukkumi Bokkeum)", zh: "辣炒小章鱼", ja: "チュクミ炒め", vi: "Bạch tuộc xào" }, price: 300000, spicy: true },
      { name: { ko: "꼼장어 볶음", en: "Spicy Stir-Fried Hagfish (Kkomjangeo Bokkeum)", zh: "辣炒盲鳗", ja: "コムジャンオ炒め", vi: "Cá mút đá ướp gia vị" }, price: 300000, spicy: true },
      { name: { ko: "쭈삼볶음", en: "Stir-Fried Octopus & Pork Belly (Jjusam Bokkeum)", zh: "辣炒章鱼五花肉", ja: "チュサム炒め(タコと豚バラ)", vi: "Bạch tuộc xào ba chỉ" }, price: 300000, spicy: true },
      { name: { ko: "짝태구이", en: "Grilled Dried Pollack (Jjaktae Gui)", zh: "烤干明太鱼", ja: "チャクテ焼き(干しスケトウダラ)", vi: "Cá khô nướng" }, price: 250000 },
    ],
  },
  {
    id: "jeon",
    name: { ko: "전·수육", en: "Savory Pancakes & Boiled Meat", zh: "煎饼·白切肉", ja: "チヂミ・ポッサム", vi: "Chiên · Hấp" },
    items: [
      { name: { ko: "해물파전", en: "Seafood Scallion Pancake (Haemul Pajeon)", zh: "海鲜葱饼", ja: "海鮮パジョン", vi: "Bánh hải sản" }, price: 200000 },
      { name: { ko: "소고기 수육", en: "Steamed Sliced Beef (Soygogi Suyuk)", zh: "白切牛肉", ja: "牛肉のスユク(茹で肉)", vi: "Thịt bò hấp" }, price: 250000 },
      { name: { ko: "굴전", en: "Pan-Fried Oysters (Gul Jeon)", zh: "煎牡蛎", ja: "牡蠣のチヂミ", vi: "Hàu tẩm gia vị chiên" }, price: 250000 },
      { name: { ko: "홍어전", en: "Pan-Fried Skate (Hongeo Jeon)", zh: "煎鳐鱼", ja: "ホンオのジョン(エイの衣焼き)", vi: "Cá hong ơ rán" }, price: 550000 },
    ],
  },
  {
    id: "lunch",
    name: { ko: "점심특선 (11:00~14:00, 2인분 이상)", en: "Lunch Specials (11:00-14:00, min. 2 servings)", zh: "午餐特惠(11:00~14:00,2人份起)", ja: "ランチ特選(11:00~14:00、2人前から)", vi: "Thực đơn trưa (11:00-14:00, từ 2 phần)" },
    items: [
      { name: { ko: "SET 1 돼지갈비 + 후식 냉면 (코다리/물)", en: "SET 1 Pork Ribs + Cold Noodles for dessert (Kodari/Mul)", zh: "套餐1 猪排骨+餐后冷面(鳕鱼干拌/水冷面)", ja: "SET 1 豚カルビ+デザート冷麺(コダリ/水)", vi: "SET 1 Sườn lợn tẩm ướp + miến tráng miệng (Kodari/nước)" }, price: 250000 },
      { name: { ko: "SET 2 소고기 주물럭 + 후식 냉면 (코다리/물)", en: "SET 2 Seasoned Beef + Cold Noodles for dessert (Kodari/Mul)", zh: "套餐2 调味牛肉+餐后冷面(鳕鱼干拌/水冷面)", ja: "SET 2 牛肉ジュムルロク+デザート冷麺(コダリ/水)", vi: "SET 2 Vai bò tẩm ướp + miến tráng miệng (Kodari/nước)" }, price: 300000 },
    ],
  },
  {
    id: "side",
    name: { ko: "추가·사이드", en: "Extras & Sides", zh: "加点·小菜", ja: "追加・サイド", vi: "Món thêm" },
    items: [
      { name: { ko: "맛보기 냉면 (비빔/물)", en: "Small Cold Noodles (Bibim/Mul)", zh: "迷你冷面(拌/水)", ja: "ミニ冷麺(ビビム/水)", vi: "Miến nhỏ (trộn/nước)" }, price: 100000 },
      { name: { ko: "누룽지탕", en: "Scorched Rice Soup (Nurungji Tang)", zh: "锅巴汤", ja: "おこげスープ(ヌルンジタン)", vi: "Canh cơm cháy" }, price: 60000 },
      { name: { ko: "된장찌개 (소)", en: "Soybean Paste Stew, Small (Doenjang Jjigae)", zh: "大酱汤(小)", ja: "テンジャンチゲ(小)", vi: "Canh đậu tương (nhỏ)" }, price: 50000 },
      { name: { ko: "공기밥", en: "Steamed Rice", zh: "白米饭", ja: "ご飯", vi: "Cơm" }, price: 20000 },
      { name: { ko: "계란찜", en: "Steamed Egg (Gyeran Jjim)", zh: "蒸蛋", ja: "卵蒸し(ケランチム)", vi: "Trứng hấp" }, price: 50000 },
      { name: { ko: "솥밥", en: "Pot Rice (Sotbap)", zh: "锅饭", ja: "釜飯", vi: "Cơm thố" }, price: 40000 },
    ],
  },
];
