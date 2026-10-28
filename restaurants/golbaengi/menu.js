// 을지로골뱅이 Euljiro Golbaengi (미딩, Lô 25 TT4, Trần Văn Lai, Từ Liêm, Hà Nội) 메뉴 데이터
// 출처: 구글 지도에 손님이 올린 메뉴판 사진(2026-10-28 수집, 올린 날짜 모름). 판이 세 가지:
//   전체 판(menu_01·06·13·16, 을지로골뱅이 500,000) — 메뉴 목록·생선구이·simple·주류 가격은 이것(주류 가격은 menu_06)
//   벽 판(menu_02·07, 480,000)·작은 판(menu_08, 600,000·포사리·골뱅이사리)
//   같은 메뉴가 판마다 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
//   타이거 활새우 소금구이는 입간판(menu_13). '달달한 빙수(무료)' 안내문(menu_08)은 메뉴가 아니라 뺌
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만 — 정사각형이면 양옆 흰 여백)
window.RESTAURANT = {
  brand: { ko: "을지로골뱅이", en: "Euljiro Golbaengi" },
  phone: "098 909 2060",
  address: "Lô 25 TT4, Trần Văn Lai, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "15:00 – 02:00",
};

window.MENU = [
  {
    id: "golbaengi",
    name: { ko: "을지로골뱅이", en: "Euljiro Golbaengi (Sea Snail Salad)", zh: "乙支路拌海螺", ja: "乙支路ツブ貝和え", vi: "Ốc trộn kiểu Hàn Quốc" },
    items: [
      { price: 600000, photo: "img/golbaengi-muchim.jpg", desc: { ko: "골뱅이무침 + 계란말이·스팸", en: "Spicy sea snail salad with rolled omelette & Spam", zh: "辣拌海螺 + 蛋卷、午餐肉", ja: "ツブ貝の辛い和え物 + だし巻き卵・スパム", vi: "Ốc trộn kiểu Hàn Quốc + trứng rán + thịt hộp" }, name: { ko: "을지로골뱅이", en: "Euljiro Golbaengi Set", zh: "乙支路拌海螺套餐", ja: "乙支路ツブ貝和えセット", vi: "Ốc trộn kiểu Hàn Quốc (set)" } },
      { price: 400000, desc: { ko: "계란말이·스팸 없이", en: "Without omelette & Spam", zh: "不含蛋卷和午餐肉", ja: "だし巻き卵・スパムなし", vi: "Không kèm trứng rán và thịt hộp" }, name: { ko: "을지로골뱅이 단품", en: "Euljiro Golbaengi (Salad Only)", zh: "乙支路拌海螺(单点)", ja: "乙支路ツブ貝和え(単品)", vi: "Ốc trộn kiểu Hàn Quốc (món lẻ)" } },
      { price: 80000, name: { ko: "소면 사리", en: "Add Thin Wheat Noodles", zh: "加细面", ja: "追加そうめん", vi: "Thêm bún sợi nhỏ" } },
      { price: 80000, name: { ko: "메밀면 사리", en: "Add Buckwheat Noodles", zh: "加荞麦面", ja: "追加そば麺", vi: "Thêm mì kiều mạch" } },
      { price: 180000, name: { ko: "포 사리", en: "Add Dried Filefish (Jwipo)", zh: "加鱼干", ja: "追加干しカワハギ", vi: "Thêm cá khô" } },
      { price: 400000, name: { ko: "골뱅이 추가", en: "Extra Sea Snails", zh: "加海螺", ja: "ツブ貝追加", vi: "Thêm ốc" } },
    ],
  },
  {
    id: "tang",
    name: { ko: "통 골뱅이탕", en: "Whole Sea Snail Hot Pot", zh: "整只海螺汤", ja: "ツブ貝まるごと鍋", vi: "Súp ốc" },
    items: [
      { sizes: [["M · 2~3", 500000], ["L · 3~4", 600000]], photo: "img/golbaengi-tang.jpg", desc: { ko: "중 2~3인분 · 대 3~4인분", en: "M serves 2–3 · L serves 3–4", zh: "中份2~3人 · 大份3~4人", ja: "中は2~3人前 · 大は3~4人前", vi: "Cỡ vừa 2~3 người · Cỡ lớn 3~4 người" }, name: { ko: "통 골뱅이탕", en: "Whole Sea Snail Hot Pot", zh: "整只海螺汤", ja: "ツブ貝まるごと鍋", vi: "Súp ốc" } },
      { price: 80000, name: { ko: "칼국수 사리", en: "Add Knife-cut Noodles", zh: "加刀削面", ja: "追加カルグクス", vi: "Thêm mì tươi" } },
    ],
  },
  {
    id: "anju",
    name: { ko: "대표 안주", en: "Signature Bar Dishes", zh: "招牌下酒菜", ja: "名物おつまみ", vi: "Món nhắm đặc trưng" },
    items: [
      { sizes: [["500g", 600000], ["1kg", 1000000]], photo: "img/saeu-sogeumgui.jpg", name: { ko: "타이거 활새우 소금구이", en: "Salt-grilled Live Tiger Prawns", zh: "盐烤活老虎虾", ja: "活きタイガーエビの塩焼き", vi: "Tôm sú sống nướng muối" } },
      { price: 380000, photo: "img/meoktae.jpg", name: { ko: "속초 5통 대왕먹태", en: "Sokcho Giant Dried Pollack (Meoktae)", zh: "束草5条装大王干明太鱼", ja: "束草産 特大干しスケトウダラ5尾", vi: "Cá khô xé Sokcho (5 con)" } },
      { price: 380000, photo: "img/chicken.jpg", name: { ko: "호프집 옛날 치킨", en: "Old-school Pub Fried Chicken", zh: "啤酒屋老式炸鸡", ja: "居酒屋風 昔ながらのフライドチキン", vi: "Gà rán truyền thống" } },
      { price: 180000, name: { ko: "호프집 옛날 치킨 반마리", en: "Old-school Pub Fried Chicken (Half)", zh: "啤酒屋老式炸鸡(半只)", ja: "居酒屋風 昔ながらのフライドチキン(半羽)", vi: "Gà rán truyền thống (nửa con)" } },
    ],
  },
  {
    id: "fish",
    name: { ko: "생선구이", en: "Grilled Fish", zh: "烤鱼", ja: "焼き魚", vi: "Cá nướng" },
    items: [
      { price: 320000, name: { ko: "제주 옥돔", en: "Jeju Tilefish", zh: "济州方头鱼", ja: "済州産アマダイ", vi: "Cá hồng Jeju" } },
      { price: 180000, name: { ko: "고등어", en: "Mackerel", zh: "青花鱼", ja: "サバ", vi: "Cá thu" } },
      { price: 100000, name: { ko: "서대", en: "Tonguefish (Seodae)", zh: "舌鳎鱼", ja: "舌平目(ソデ)", vi: "Cá bơn" } },
    ],
  },
  {
    id: "simple",
    name: { ko: "심플 안주", en: "Simple Snacks", zh: "简单小菜", ja: "シンプルおつまみ", vi: "Món nhắm đơn giản" },
    items: [
      { price: 180000, name: { ko: "통마늘 똥집 볶음 / 튀김", en: "Chicken Gizzards with Whole Garlic (Stir-fried / Fried)", zh: "整蒜鸡胗(炒 / 炸)", ja: "丸ニンニクと砂肝(炒め / 揚げ)", vi: "Mề gà xào tỏi / chiên" } },
      { price: 180000, name: { ko: "계란말이 + 스팸", en: "Rolled Omelette + Spam", zh: "蛋卷 + 午餐肉", ja: "だし巻き卵 + スパム", vi: "Trứng rán + thịt hộp" } },
      { price: 180000, name: { ko: "한치 + 쥐포구이", en: "Grilled Squid + Dried Filefish", zh: "烤小鱿鱼 + 烤鱼干", ja: "ヤリイカ + 干しカワハギ焼き", vi: "Mực + cá khô nướng" } },
      { price: 180000, name: { ko: "황도", en: "Yellow Peaches", zh: "黄桃", ja: "黄桃", vi: "Đào vàng" } },
      { price: 180000, name: { ko: "조개 술찜", en: "Clams Steamed in Soju", zh: "酒蒸蛤蜊", ja: "あさりの酒蒸し", vi: "Ngao hấp rượu" } },
      { price: 180000, name: { ko: "코주부 육포 + 치즈", en: "Beef Jerky + Cheese", zh: "牛肉干 + 芝士", ja: "ビーフジャーキー + チーズ", vi: "Bò khô và phô mai" } },
      { price: 180000, name: { ko: "골뱅이 들기름 막국수", en: "Sea Snail Perilla-oil Buckwheat Noodles", zh: "海螺紫苏油荞麦凉面", ja: "ツブ貝のえごま油そば", vi: "Mì trộn ốc" } },
      { price: 100000, name: { ko: "감자튀김", en: "French Fries", zh: "炸薯条", ja: "フライドポテト", vi: "Khoai tây chiên" } },
      { price: 100000, name: { ko: "쥐포구이", en: "Grilled Dried Filefish", zh: "烤鱼干", ja: "干しカワハギ焼き", vi: "Cá khô nướng" } },
      { price: 100000, name: { ko: "번데기탕", en: "Silkworm Pupa Soup", zh: "蚕蛹汤", ja: "蚕のさなぎスープ", vi: "Canh nhộng tằm" } },
      { price: 100000, name: { ko: "라면", en: "Ramyeon", zh: "韩式拉面", ja: "ラーメン(ラミョン)", vi: "Mì cay" } },
      { price: 100000, name: { ko: "국물 떡볶이", en: "Soupy Tteokbokki", zh: "汤汁炒年糕", ja: "汁たっぷりトッポッキ", vi: "Tokbokki nước" } },
    ],
  },
  {
    id: "drinks",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水 · 饮料", ja: "お酒 · ドリンク", vi: "Đồ uống có cồn · Nước giải khát" },
    items: [
      { sizes: [["330ml", 60000], ["500ml", 80000]], name: { ko: "삿포로 생맥주", en: "Sapporo Draft Beer", zh: "札幌生啤酒", ja: "サッポロ生ビール", vi: "Bia tươi Sapporo" } },
      { price: 140000, name: { ko: "하이볼 (산토리 / 짐빔)", en: "Highball (Suntory / Jim Beam)", zh: "嗨棒 Highball(三得利 / 占边)", ja: "ハイボール(サントリー / ジムビーム)", vi: "Highball (Suntory / Jim Beam)" } },
      { price: 50000, name: { ko: "병맥주 (타이거)", en: "Bottled Beer (Tiger)", zh: "瓶装啤酒(虎牌)", ja: "瓶ビール(タイガー)", vi: "Bia chai Tiger" } },
      { price: 150000, name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "焼酎(ソジュ)", vi: "Rượu soju" } },
      { price: 120000, name: { ko: "소주 (좋은데이)", en: "Soju (Good Day)", zh: "烧酒(Good Day)", ja: "焼酎(チョウンデイ)", vi: "Rượu soju (Good Day)" } },
      { price: 160000, name: { ko: "국순당 생막걸리", en: "Kooksoondang Fresh Makgeolli", zh: "麴醇堂生米酒", ja: "国純堂 生マッコリ", vi: "Rượu gạo tươi Kooksoondang" } },
      { price: 130000, name: { ko: "코라이스 밤막걸리", en: "Korice Chestnut Makgeolli", zh: "Korice 栗子米酒", ja: "コライス 栗マッコリ", vi: "Rượu gạo truyền thống Korice" } },
      { price: 350000, name: { ko: "복분자주", en: "Bokbunja (Black Raspberry Wine)", zh: "覆盆子酒", ja: "覆盆子酒(ポクプンジャ)", vi: "Rượu phúc bồn tử" } },
      { price: 180000, name: { ko: "청하", en: "Chungha", zh: "清河清酒", ja: "チョンハ(清河)", vi: "Chungha" } },
      { price: 180000, name: { ko: "달빛청하 / 로제", en: "Chungha Moonlight / Rosé", zh: "月光清河 / 玫瑰", ja: "ダルビッチョンハ / ロゼ", vi: "Chungha Moonlight / Rosé" } },
      { price: 30000, desc: { ko: "콜라·제로콜라·스프라이트·환타", en: "Coke, Coke Zero, Sprite, Fanta", zh: "可乐、零度可乐、雪碧、芬达", ja: "コーラ・コーラゼロ・スプライト・ファンタ", vi: "Coca, Coca Zero, Sprite, Fanta" }, name: { ko: "음료", en: "Soft Drinks", zh: "饮料", ja: "ソフトドリンク", vi: "Nước ngọt" } },
    ],
  },
];
