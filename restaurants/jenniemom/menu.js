// 분짜 제니맘(Bún Chả Jenniemom) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(2026-11-10 수집, 드라이브 QR메뉴판/분짜)
// 가격판이 3가지(menu_01·06 / menu_04·05·10 / menu_08·09·11·12)로 값이 다름 → 높은 쪽(menu_01·06) 씀 (docs/todo.md)
// 세트 4인·6인은 menu_08·11·12·13 판에만 있음. 신메뉴(menu_07) 세 번째 메뉴는 이름이 지워져 있어 뺌
// menu_02·03은 메뉴판이 아니라 넴·반똠 요리 사진
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만)
window.RESTAURANT = {
  brand: { ko: "분짜 제니맘", en: "Bún Chả Jenniemom" },
  phone: "035 733 9213",
  address: "Khu Sông Đà (gần CT4 Sông Đà), Từ Liêm, Hà Nội",
  wifi: null,
  hours: "08:00 – 15:00", // 구글 지도 '오전 8:00~오후 3:00'. 메뉴판엔 시간 없음
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ price: price ?? null, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "main",
    name: T("식사", "Mains", "主食", "食事", "Món chính"),
    items: [
      { name: T("분짜", "Bún Chả (Grilled Pork with Rice Noodles)", "烤肉米线(Bún Chả)", "ブンチャー(炭火焼き豚つけ麺)", "Bún chả"), sizes: [["S", 60000], ["L", 75000]], photo: "img/buncha.jpg", tag: "must",
        desc: T("S 소 · L 대 · 숯불에 구운 돼지고기 완자·삼겹을 새콤달콤한 국물에 담가 쌀국수 면·채소와 함께", "S small · L large · Charcoal-grilled pork patties and pork belly, dipped in a sweet-sour broth and eaten with rice noodles and fresh herbs", "S 小份 · L 大份 · 炭火烤猪肉饼和五花肉,蘸酸甜汤汁,搭配米线和蔬菜一起吃", "S 小 · L 大 · 炭火で焼いた豚肉のつくねとバラ肉を甘酸っぱいつけ汁に浸し、米麺と野菜と一緒に食べます", "S bé · L to · Chả nướng than hoa trong nước chấm chua ngọt, ăn cùng bún và rau sống") },
      it(60000, "bunchachan", T("분짜짠", "Bún Chả Chan (Bún Chả in Broth)", "汤泡烤肉米线(Bún Chả Chan)", "ブンチャーチャン(スープ入りブンチャー)", "Bún chả chan"), { tag: "special",
        desc: T("신메뉴 · 쌀국수 면 위에 숯불 고기와 국물을 부어 한 그릇으로", "New · Rice noodles with charcoal-grilled pork, served in one bowl with the broth poured over", "新品 · 米线上放炭火烤肉,浇上汤汁,一碗搞定", "新メニュー · 米麺に炭火焼きの肉をのせ、つけ汁をかけて一杯で楽しめます", "Món mới · Chả nướng và bún chan sẵn nước chấm trong một bát") }),
      it(60000, null, T("분목", "Bún Mọc (Pork Ball Noodle Soup)", "猪肉丸米线汤(Bún Mọc)", "ブンモック(豚肉団子の米麺スープ)", "Bún mọc"), { tag: "special",
        desc: T("신메뉴 · 돼지고기 완자(목)를 넣은 맑은 쌀국수", "New · Clear rice noodle soup with pork meatballs (mọc)", "新品 · 加入猪肉丸(mọc)的清汤米线", "新メニュー · 豚肉団子(モック)入りの澄んだ米麺スープ", "Món mới · Bún nước dùng trong với mọc thịt heo") }),
      it(38000, null, T("소불고기 반미", "Beef Bulgogi Bánh Mì", "牛肉烤肉越式面包", "牛プルコギのバインミー", "Bánh mì bò bulgogi")),
    ],
  },
  {
    id: "set",
    name: T("세트", "Sets", "套餐", "セット", "Set"),
    items: [
      it(200000, "set", T("분짜 세트 4인", "Bún Chả Set for 4", "烤肉米线套餐(4人)", "ブンチャーセット(4人前)", "Set 4 người"), { tag: "best" }),
      it(300000, null, T("분짜 세트 6인", "Bún Chả Set for 6", "烤肉米线套餐(6人)", "ブンチャーセット(6人前)", "Set 6 người"), {
        desc: T("넴 3개 포함", "Includes 3 nem (fried spring rolls)", "含3个炸春卷(nem)", "ネム(揚げ春巻き)3本付き", "Kèm 3 chiếc nem") }),
    ],
  },
  {
    id: "side",
    name: T("곁들임", "Sides", "配菜", "サイドメニュー", "Món ăn kèm"),
    items: [
      it(15000, "nem", T("넴 (튀긴 짜조)", "Nem (Fried Spring Roll)", "炸春卷(Nem)", "ネム(揚げ春巻き)", "Nem rán"), { desc: T("1개 가격", "Price per piece", "每个的价格", "1本の価格", "Giá 1 chiếc") }),
      it(20000, "banhtom", T("반똠 (새우 튀김전)", "Bánh Tôm (Shrimp Fritter)", "炸虾饼(Bánh Tôm)", "バインドム(エビの揚げ物)", "Bánh tôm"), { desc: T("1개 가격", "Price per piece", "每个的价格", "1枚の価格", "Giá 1 chiếc") }),
    ],
  },
  {
    id: "extra",
    name: T("추가", "Extras", "加料", "追加", "Gọi thêm"),
    items: [
      it(55000, "thit", T("고기 추가 (100g)", "Extra Grilled Pork (100g)", "加烤肉(100克)", "焼き肉追加(100g)", "Thịt thêm (100gr)")),
      it(10000, null, T("소면 추가", "Extra Rice Noodles", "加米线", "米麺追加", "Thêm bún")),
      it(5000, null, T("배달 용기", "Takeaway Container", "外带餐盒", "テイクアウト容器", "Hộp mang về")),
    ],
  },
  {
    id: "drink",
    name: T("음료", "Drinks", "饮料", "ドリンク", "Đồ uống"),
    items: [
      it(5000, null, T("짜다 (아이스티)", "Trà Đá (Iced Tea)", "冰茶(Trà Đá)", "チャーダー(アイスティー)", "Trà đá")),
      it(15000, null, T("짜닥 (금귤차)", "Trà Tắc (Kumquat Tea)", "金桔茶(Trà Tắc)", "チャータック(金柑茶)", "Trà tắc")),
      it(10000, null, T("생수 (아쿠아피나)", "Water (Aquafina)", "矿泉水(Aquafina)", "ミネラルウォーター(アクアフィナ)", "Nước suối Aquafina")),
      it(20000, null, T("세븐업 · 펩시 · 스프라이트", "7Up · Pepsi · Sprite", "7Up · 百事可乐 · 雪碧", "セブンアップ · ペプシ · スプライト", "7Up · Pepsi · Sprite")),
      it(20000, null, T("코카콜라", "Coca-Cola", "可口可乐", "コカ・コーラ", "Coca-Cola")),
      it(20000, null, T("트위스터 (오렌지 주스)", "Twister (Orange Juice Drink)", "Twister(橙汁饮料)", "ツイスター(オレンジジュース)", "Twister")),
    ],
  },
  {
    id: "alcohol",
    name: T("주류", "Alcohol", "酒类", "アルコール", "Đồ uống có cồn"),
    items: [
      it(30000, null, T("하노이 맥주", "Hanoi Beer", "河内啤酒", "ハノイビール", "Bia Hà Nội")),
      it(40000, null, T("하이네켄 · 타이거 · 사이공 맥주", "Heineken · Tiger · Saigon Beer", "喜力 · 虎牌 · 西贡啤酒", "ハイネケン · タイガー · サイゴンビール", "Bia Heineken · Tiger · Sài Gòn")),
      it(100000, null, T("소주", "Soju", "烧酒(韩国)", "焼酎(韓国)", "Soju")),
    ],
  },
];
