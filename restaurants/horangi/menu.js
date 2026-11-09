// 호랑이식당(Nhà Hàng Hổ) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(가게 계정 menu_04·08~14, 손님 menu_01·05~07·15~18·24, 2026-11-09 수집)
// 손님 사진(15~18·24)은 같은 메뉴판을 찍은 것으로 가격이 모두 같음. 안티그래비티 판독 → 운영 감찰관(Sonnet) 재대조 차이 0
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만)
window.RESTAURANT = {
  brand: { ko: "호랑이식당", en: "Nhà Hàng Hổ" },
  phone: "0388 699 426",
  address: "The Emerald, SH01, CT8 tòa E2, Ngõ 180 Đình Thôn, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:00 – 22:00", // 구글 지도 '오전 10:00~오후 10:00'. 메뉴판·간판에 시간 없음
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });
const SML = (s, m, l) => [["S", s], ["M", m], ["L", l]];
const SM = (s, m) => [["S", s], ["M", m]];

window.MENU = [
  {
    id: "katsu",
    name: T("수제돈까스", "Handmade Pork Cutlet", "手工炸猪排", "手作りとんかつ", "Cơm thịt heo chiên xù"),
    note: T("S = 소 · M = 중 · L = 대", "S = Small · M = Medium · L = Large", "S = 小份 · M = 中份 · L = 大份", "S = 小 · M = 中 · L = 大", "S = Nhỏ · M = Vừa · L = Lớn"),
    items: [
      it(SML(99000, 159000, 209000), null, T("수제돈까스", "Handmade Pork Cutlet", "手工炸猪排", "手作りとんかつ", "Cơm thịt heo chiên xù cơ bản"), { tag: "best" }),
      it(SML(109000, 169000, 219000), null, T("수제카레돈까스", "Handmade Curry Pork Cutlet", "手工咖喱炸猪排", "手作りカレーとんかつ", "Cơm thịt heo chiên xù sốt cà ri")),
      it(SML(119000, 179000, 229000), null, T("수제매운돈까스", "Handmade Spicy Pork Cutlet", "手工辣味炸猪排", "手作り辛口とんかつ", "Cơm thịt heo chiên xù sốt cay"), { spicy: true }),
      it(169000, "cheese-katsu", T("수제치즈돈까스", "Handmade Cheese Pork Cutlet", "手工芝士炸猪排", "手作りチーズとんかつ", "Cơm thịt heo chiên xù nhân pho mai")),
      it(159000, null, T("수제고구마돈까스", "Handmade Sweet Potato Pork Cutlet", "手工地瓜炸猪排", "手作りさつまいもとんかつ", "Cơm thịt heo chiên xù nhân khoai lang")),
    ],
  },
  {
    id: "bowl",
    name: T("덮밥", "Rice Bowls", "盖饭", "丼", "Cơm"),
    note: T("S = 소 · M = 중", "S = Small · M = Medium", "S = 小份 · M = 中份", "S = 小 · M = 中", "S = Nhỏ · M = Vừa"),
    items: [
      it(SM(79000, 129000), null, T("치킨덮밥", "Fried Chicken Rice Bowl", "炸鸡盖饭", "チキン丼", "Cơm gà chiên giòn Hàn Quốc"), { tag: "best" }),
      it(SM(99000, 149000), null, T("카레치킨덮밥", "Curry Chicken Rice Bowl", "咖喱炸鸡盖饭", "カレーチキン丼", "Cơm gà chiên giòn sốt cà ri Hàn Quốc")),
      it(139000, null, T("간장닭갈비덮밥", "Soy Sauce Dak-galbi Rice Bowl", "酱油辣炒鸡排盖饭", "醤油タッカルビ丼", "Cơm gà xào xì dầu Hàn Quốc")),
      it(139000, null, T("양념닭갈비덮밥", "Spicy Dak-galbi Rice Bowl", "辣酱辣炒鸡排盖饭", "ヤンニョムタッカルビ丼", "Cơm gà xào cay ngọt Hàn Quốc")),
      it(179000, null, T("왕치킨덮밥", "Large Fried Chicken Rice Bowl", "特大炸鸡盖饭", "特大チキン丼", "Cơm gà chiên giòn Hàn Quốc big size"), { tag: "best" }),
      it(69000, null, T("간장버터계란밥", "Soy Sauce Butter Egg Rice Bowl", "酱油黄油鸡蛋饭", "醤油バター卵ご飯", "Cơm trứng ốp la bơ xì dầu")),
      it(SM(79000, 129000), null, T("카레덮밥", "Curry Rice Bowl", "咖喱盖饭", "カレー丼", "Cơm cà ri"), { tag: "best" }),
      it(159000, null, T("우삼겹덮밥", "Soy Sauce Beef Rice Bowl", "牛五花盖饭", "牛バラ丼", "Cơm ba chỉ bò xào")),
      it(129000, null, T("새우튀김덮밥", "Fried Shrimp Rice Bowl", "炸虾盖饭", "エビフライ丼", "Cơm tôm chiên xù")),
      it(SM(79000, 129000), null, T("계란김치덮밥", "Egg Kimchi Rice Bowl", "鸡蛋泡菜盖饭", "卵キムチ丼", "Cơm kimchi trứng tuyết")),
      it(149000, null, T("간장삼겹살덮밥", "Soy Sauce Pork Rice Bowl", "酱油五花肉盖饭", "醤油サムギョプサル丼", "Cơm thịt ba chỉ heo xào xì dầu")),
      it(149000, null, T("양념삼겹살덮밥", "Spicy Pork Rice Bowl", "辣酱五花肉盖饭", "ヤンニョムサムギョプサル丼", "Cơm thịt ba chỉ heo xào cay ngọt")),
      it(149000, null, T("매콤새우덮밥", "Spicy Shrimp Rice Bowl", "香辣虾盖饭", "ピリ辛エビ丼", "Cơm tôm xào cay"), { spicy: true }),
    ],
  },
  {
    id: "rice",
    name: T("밥", "Rice", "米饭", "ご飯もの", "Cơm rang · Cơm trứng"),
    items: [
      it(99000, null, T("김치볶음밥", "Kimchi Fried Rice", "泡菜炒饭", "キムチチャーハン", "Cơm rang kim chi"), { tag: "best" }),
      it(109000, "omurice", T("오므라이스", "Omelette Rice", "蛋包饭", "オムライス", "Cơm trứng cuộn")),
    ],
  },
  {
    id: "udon",
    name: T("우동", "Udon", "乌冬面", "うどん", "Udon"),
    items: [
      it(89000, null, T("우동", "Udon", "乌冬面", "うどん", "Udon"), { tag: "best" }),
      it(99000, null, T("김치우동", "Kimchi Udon", "泡菜乌冬面", "キムチうどん", "Kim chi Udon"), { tag: "best" }),
      it(99000, null, T("카레우동", "Curry Udon", "咖喱乌冬面", "カレーうどん", "Cà ri Udon")),
    ],
  },
  {
    id: "chicken",
    name: T("순살치킨", "Boneless Chicken", "无骨炸鸡", "骨なしチキン", "Gà không xương"),
    note: T("S = 5조각 · M = 8조각 · L = 11조각", "S = 5 pcs · M = 8 pcs · L = 11 pcs", "S = 5块 · M = 8块 · L = 11块", "S = 5個 · M = 8個 · L = 11個", "S = 5 miếng · M = 8 miếng · L = 11 miếng"),
    items: [
      it(SML(99000, 149000, 199000), null, T("순살후라이드치킨", "Fried Chicken", "原味无骨炸鸡", "骨なしフライドチキン", "Gà chiên không xương"), { tag: "best" }),
      it(SML(119000, 169000, 219000), "yangnyeom", T("순살양념치킨", "Spicy Sauce Chicken", "甜辣无骨炸鸡", "骨なしヤンニョムチキン", "Gà sốt cay ngọt")),
      it(SML(119000, 169000, 219000), null, T("순살간장치킨", "Soy Sauce Chicken", "酱油无骨炸鸡", "骨なし醤油チキン", "Gà sốt nước tương")),
      it(SML(119000, 169000, 219000), null, T("순살치즈시즈닝치킨", "Cheese Seasoned Chicken", "芝士粉无骨炸鸡", "骨なしチーズシーズニングチキン", "Gà chiên lắc pho mai")),
      it(SML(119000, 169000, 219000), null, T("순살크림어니언치킨", "Cream Onion Chicken", "奶油洋葱无骨炸鸡", "骨なしクリームオニオンチキン", "Gà sốt kem hành")),
    ],
  },
  {
    id: "roll",
    name: T("롤", "Rolls", "饭卷", "ロール", "Cơm cuộn"),
    items: [
      it(79000, null, T("기본롤", "Basic Roll", "原味饭卷", "基本ロール", "Cơm cuộn"), { tag: "best" }),
      it(99000, null, T("베이컨롤", "Bacon Roll", "培根饭卷", "ベーコンロール", "Cơm cuộn bacon")),
      it(109000, null, T("치킨마요롤", "Chicken Mayo Roll", "鸡肉蛋黄酱饭卷", "チキンマヨロール", "Cơm cuộn gà mayo")),
      it(99000, null, T("볶음김치롤", "Fried Kimchi Roll", "炒泡菜饭卷", "炒めキムチロール", "Cơm cuộn kim chi")),
      it(109000, null, T("매콤크래미롤", "Spicy Crab Stick Roll", "香辣蟹肉棒饭卷", "ピリ辛カニカマロール", "Cơm cuộn thanh cua sốt cay ngọt"), { spicy: true }),
      it(119000, null, T("어니언참치롤", "Onion Tuna Roll", "洋葱金枪鱼饭卷", "オニオンツナロール", "Cơm cuộn cá ngừ hành tây")),
      it(99000, null, T("에그롤", "Egg Roll", "鸡蛋饭卷", "エッグロール", "Cơm cuộn trứng")),
    ],
  },
  {
    id: "pasta",
    name: T("파스타 · 리조또", "Pasta · Risotto", "意面 · 烩饭", "パスタ・リゾット", "Mỳ Ý · Cơm Ý"),
    items: [
      it(99000, null, T("알리오올리오", "Aglio e Olio Pasta", "蒜香橄榄油意面", "アーリオ・オーリオ", "Mỳ dầu oliu")),
      it(99000, null, T("토마토파스타", "Tomato Pasta", "番茄意面", "トマトパスタ", "Mỳ sốt cà chua")),
      it(169000, null, T("까르보나라", "Carbonara Pasta", "奶油培根意面", "カルボナーラ", "Mỳ Ý sốt kem")),
      it(169000, "rose-pasta", T("로제파스타", "Rosé Pasta", "玫瑰酱意面", "ロゼパスタ", "Mỳ sốt rose")),
      it(169000, null, T("크림리조또", "Cream Risotto", "奶油烩饭", "クリームリゾット", "Cơm Ý Risotto")),
      it(169000, null, T("로제리조또", "Rosé Risotto", "玫瑰酱烩饭", "ロゼリゾット", "Cơm Ý Rose Risotto")),
    ],
  },
  {
    id: "side",
    name: T("사이드", "Sides", "小食", "サイドメニュー", "Món phụ"),
    items: [
      it(89000, null, T("떡볶이", "Tteokbokki", "炒年糕", "トッポッキ", "Tteokbokki"), { spicy: true }),
      it(129000, null, T("치즈떡볶이", "Cheese Tteokbokki", "芝士炒年糕", "チーズトッポッキ", "Tteokbokki pho mai")),
      it(139000, "rose-tteokbokki", T("로제떡볶이", "Rosé Tteokbokki", "玫瑰酱炒年糕", "ロゼトッポッキ", "Tteokbokki rose")),
      it(79000, null, T("돈까스 (1개)", "Pork Cutlet (1 pc)", "炸猪排（1块）", "とんかつ（1枚）", "Thịt heo chiên xù (1 miếng)")),
      it(99000, null, T("치즈돈까스 (2개)", "Cheese Cutlet (2 pcs)", "芝士炸猪排（2块）", "チーズとんかつ（2枚）", "Thịt heo chiên xù pho mai (2 miếng)")),
      it(89000, null, T("고구마돈까스 (2개)", "Sweet Potato Cutlet (2 pcs)", "地瓜炸猪排（2块）", "さつまいもとんかつ（2枚）", "Thịt heo chiên xù khoai lang (2 miếng)")),
      it(39000, null, T("치즈볼 (2개)", "Cheese Balls (2 pcs)", "芝士球（2个）", "チーズボール（2個）", "Pho mai viên (2 viên)")),
      it(59000, null, T("군만두 (4개)", "Fried Dumplings (4 pcs)", "煎饺（4个）", "焼き餃子（4個）", "Mandu chiên (4 cái)")),
      it(29000, null, T("새우튀김 (2개)", "Fried Shrimp (2 pcs)", "炸虾（2只）", "エビフライ（2尾）", "Tôm chiên (2 con)")),
      it(59000, null, T("감자튀김", "French Fries", "炸薯条", "フライドポテト", "Khoai tây chiên")),
      it(69000, null, T("치즈감자튀김", "Cheese Fries", "芝士薯条", "チーズポテト", "Khoai tây lắc pho mai")),
      it(49000, null, T("고구마튀김 (4개)", "Fried Sweet Potato (4 pcs)", "炸地瓜（4块）", "さつまいもの揚げ物（4個）", "Khoai lang chiên (4 miếng)")),
      it(59000, null, T("치즈감자전", "Cheese Potato Pancake", "芝士土豆饼", "チーズじゃがいもチヂミ", "Bánh khoai pho mai")),
      it(10000, null, T("공기밥", "Steamed Rice", "米饭", "白ご飯", "Cơm trắng")),
      it(10000, null, T("계란후라이 (1개)", "Fried Egg (1 pc)", "煎蛋（1个）", "目玉焼き（1個）", "Trứng ốp (1 quả)")),
    ],
  },
  {
    id: "topping",
    name: T("토핑 추가", "Extra Toppings", "加料", "トッピング追加", "Topping thêm"),
    note: T("밥·우동에 추가", "Add to rice or udon", "可加在米饭、乌冬面上", "ご飯・うどんに追加", "Thêm vào cơm hoặc udon"),
    items: [
      it(29000, null, T("베이컨", "Bacon", "培根", "ベーコン", "Bacon")),
      it(59000, null, T("삼겹살", "Pork Belly", "五花肉", "サムギョプサル", "Ba chỉ heo")),
      it(69000, null, T("우삼겹", "Beef Brisket", "牛五花", "牛バラ肉", "Ba chỉ bò")),
      it(29000, null, T("소시지", "Sausage", "香肠", "ソーセージ", "Xúc xích")),
      it(79000, null, T("돈까스", "Pork Cutlet", "炸猪排", "とんかつ", "Thịt heo chiên xù")),
      it(39000, null, T("치킨", "Chicken", "鸡肉", "チキン", "Thịt gà")),
      it(19000, null, T("새우튀김", "Fried Shrimp", "炸虾", "エビフライ", "Tôm chiên")),
      it(59000, null, T("참치", "Tuna", "金枪鱼", "ツナ", "Cá ngừ")),
      it(39000, null, T("치즈", "Cheese", "芝士", "チーズ", "Pho mai")),
    ],
  },
  {
    id: "drink",
    name: T("음료 · 주류", "Drinks", "饮料 · 酒类", "ドリンク・お酒", "Đồ uống"),
    items: [
      it(60000, null, T("생망고스무디", "Mango Smoothie", "鲜芒果冰沙", "生マンゴースムージー", "Sinh tố xoài")),
      it(50000, null, T("생수박주스", "Watermelon Juice", "鲜西瓜汁", "生スイカジュース", "Nước ép dưa hấu")),
      it(25000, null, T("콜라", "Coca-Cola", "可口可乐", "コーラ", "Coca")),
      it(25000, null, T("스프라이트", "Sprite", "雪碧", "スプライト", "Sprite")),
      it(120000, null, T("참이슬", "Chamisul Soju", "真露烧酒", "チャミスル（焼酎）", "Soju Chamisul")),
      it(120000, null, T("새로", "Saero Soju", "Saero烧酒", "セロ（焼酎）", "Soju Saero")),
      it(70000, null, T("아사히 생맥주", "Asahi Draft Beer", "朝日生啤", "アサヒ生ビール", "Bia tươi Asahi")),
      it(40000, null, T("타이거 맥주", "Tiger Beer", "虎牌啤酒", "タイガービール", "Bia Tiger")),
    ],
  },
];
