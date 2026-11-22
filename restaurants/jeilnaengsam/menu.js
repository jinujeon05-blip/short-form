// 제일냉삼 메뉴 데이터 — 출처: 구글 지도에 올린 메뉴판 사진(menu_01, 2026-11-22 수집). 가격 단위 VND
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "제일냉삼", en: "Jeil Naengsam" },
  phone: "0814981290",
  address: "272 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh",
  wifi: null,
  hours: {
    ko: "평일 15:30 – 23:00 · 일요일 13:00 – 23:00",
    en: "Weekdays 15:30 – 23:00 · Sunday 13:00 – 23:00",
    zh: "平日 15:30 – 23:00 · 周日 13:00 – 23:00",
    ja: "平日 15:30 – 23:00 · 日曜 13:00 – 23:00",
    vi: "Ngày thường 15:30 – 23:00 · Chủ nhật 13:00 – 23:00",
  },
};

window.MENU = [
  {
    id: "meat",
    name: { ko: "고기 메뉴", en: "Meat", zh: "肉类", ja: "お肉", vi: "Món thịt" },
    note: { ko: "최초 주문은 2인분, 한판 이상 가능합니다", en: "First order: 2 servings, from one full plate", zh: "首次点餐需2人份，一盘起", ja: "最初のご注文は2人前、1皿からです", vi: "Gọi lần đầu tối thiểu 2 phần, từ một đĩa trở lên" },
    items: [
      { name: { ko: "냉동삼겹살", en: "Frozen Pork Belly (Naengsam)", zh: "冷冻五花肉（冷三）", ja: "冷凍サムギョプサル（ネンサム）", vi: "Thịt ba chỉ đông lạnh" }, desc: { ko: "180g", en: "180g", zh: "180g", ja: "180g", vi: "180g" }, price: 200000, tag: "must", photo: "img/p1.jpg" },
      { name: { ko: "항정살", en: "Pork Jowl (Hangjeongsal)", zh: "猪颈肉（项正肉）", ja: "豚トロ（ハンジョンサル）", vi: "Thịt má lợn" }, desc: { ko: "180g", en: "180g", zh: "180g", ja: "180g", vi: "180g" }, price: 220000 },
      { name: { ko: "우삼겹", en: "Beef Belly Slices (Usamgyeop)", zh: "牛五花片（牛三层）", ja: "牛カルビ薄切り（ウサムギョプ）", vi: "Thịt ba chỉ bò" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 220000 },
      { name: { ko: "차돌박이", en: "Beef Brisket Slices (Chadolbaegi)", zh: "牛胸腹薄片", ja: "牛バラ薄切り（チャドルバギ）", vi: "Thịt ức bò" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 240000 },
      { name: { ko: "생삼겹살 한판", en: "Fresh Pork Belly, Full Plate (Saengsamgyeopsal)", zh: "鲜五花肉 整盘", ja: "生サムギョプサル 1皿", vi: "Thịt heo tươi cả bìa" }, desc: { ko: "500g", en: "500g", zh: "500g", ja: "500g", vi: "500g" }, price: 600000, photo: "img/p2.jpg" },
      { name: { ko: "생삼겹살 반판", en: "Fresh Pork Belly, Half Plate (Saengsamgyeopsal)", zh: "鲜五花肉 半盘", ja: "生サムギョプサル 半皿", vi: "Thịt heo tươi 1/2 bìa" }, desc: { ko: "250g", en: "250g", zh: "250g", ja: "250g", vi: "250g" }, price: 300000 },
    ],
  },
  {
    id: "side",
    name: { ko: "사이드 메뉴", en: "Side dishes", zh: "小菜与主食", ja: "サイドメニュー", vi: "Món ăn kèm" },
    items: [
      { name: { ko: "김치찜", en: "Braised Kimchi (Kimchi-jjim)", zh: "炖泡菜（泡菜锅）", ja: "キムチチム（煮込みキムチ）", vi: "Lẩu kim chi" }, price: 600000, spicy: true },
      { name: { ko: "물/비빔냉면", en: "Cold Noodles, Broth or Spicy Mixed (Mul/Bibim Naengmyeon)", zh: "水冷面/拌冷面", ja: "水冷麺/ビビン冷麺", vi: "Mỳ nước lạnh / Mỳ trộn lạnh" }, price: 160000 },
      { name: { ko: "김치말이국수", en: "Kimchi Cold Noodles (Kimchi-mari Guksu)", zh: "泡菜汤冷面", ja: "キムチマリ冷麺", vi: "Mỳ kim chi" }, price: 140000 },
      { name: { ko: "비빔국수", en: "Spicy Mixed Noodles (Bibim Guksu)", zh: "辣拌面", ja: "ビビン麺（和え麺）", vi: "Mỳ trộn" }, price: 140000, spicy: true },
      { name: { ko: "잔치국수", en: "Warm Noodle Soup (Janchi Guksu)", zh: "汤面（宴会面）", ja: "チャンチグクス（温かい素麺）", vi: "Mỳ nóng" }, price: 140000 },
      { name: { ko: "계란말이", en: "Rolled Omelet (Gyeran-mari)", zh: "鸡蛋卷", ja: "卵焼き（ケランマリ）", vi: "Trứng cuộn" }, price: 140000 },
      { name: { ko: "김치찌개", en: "Kimchi Stew (Kimchi-jjigae)", zh: "泡菜汤锅", ja: "キムチチゲ", vi: "Canh kim chi" }, price: 80000, spicy: true },
      { name: { ko: "된장찌개", en: "Soybean Paste Stew (Doenjang-jjigae)", zh: "大酱汤", ja: "テンジャンチゲ（味噌チゲ）", vi: "Canh đậu tương" }, price: 80000 },
      { name: { ko: "냄비라면", en: "Pot Ramen (Naembi Ramyeon)", zh: "锅煮拉面", ja: "鍋ラーメン", vi: "Mỳ tôm" }, price: 80000, photo: "img/p3.jpg" },
      { name: { ko: "치즈볶음밥", en: "Cheese Fried Rice (Cheese Bokkeumbap)", zh: "芝士炒饭", ja: "チーズチャーハン", vi: "Cơm rang phomai" }, price: 80000 },
      { name: { ko: "볶음밥", en: "Fried Rice (Bokkeumbap)", zh: "炒饭", ja: "チャーハン", vi: "Cơm rang" }, price: 60000 },
      { name: { ko: "계란탕", en: "Egg Soup (Gyeran-tang)", zh: "鸡蛋汤", ja: "卵スープ（ケランタン）", vi: "Canh trứng" }, price: 60000 },
      { name: { ko: "계란찜", en: "Steamed Egg (Gyeran-jjim)", zh: "蒸蛋", ja: "韓国風蒸し卵（ケランチム）", vi: "Trứng hấp" }, price: 60000 },
      { name: { ko: "공기밥", en: "Steamed Rice (Gongibap)", zh: "米饭", ja: "ご飯", vi: "Cơm" }, price: 20000 },
    ],
  },
  {
    id: "extra",
    name: { ko: "구이 추가 메뉴", en: "Grill add-ons", zh: "烤肉加点", ja: "焼き追加", vi: "Thêm món nướng" },
    items: [
      { name: { ko: "버섯", en: "Mushrooms (Beoseot)", zh: "蘑菇", ja: "きのこ", vi: "Thêm nấm" }, price: 80000 },
      { name: { ko: "옛날 소시지", en: "Old-style Sausage (Yetnal Sausage)", zh: "韩式怀旧香肠", ja: "昔ながらのソーセージ", vi: "Xúc xích" }, price: 40000 },
    ],
  },
  {
    id: "drink",
    name: { ko: "주류", en: "Drinks", zh: "酒水", ja: "ドリンク", vi: "Đồ uống" },
    items: [
      { name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "焼酎（ソジュ）", vi: "Soju" }, price: 140000 },
      { name: { ko: "맥주", en: "Beer (Bottled)", zh: "瓶装啤酒", ja: "瓶ビール", vi: "Bia" }, price: 50000 },
      { name: { ko: "생맥주", en: "Draft Beer", zh: "生啤", ja: "生ビール", vi: "Bia tươi" }, price: 60000 },
      { name: { ko: "막걸리", en: "Makgeolli (Rice Wine)", zh: "马格利米酒", ja: "マッコリ", vi: "Rượu gạo" }, price: 160000 },
      { name: { ko: "음료수", en: "Soft Drink", zh: "饮料", ja: "清涼飲料", vi: "Nước ngọt" }, price: 20000 },
    ],
  },
];
