// 명희원(明熙園 · Myung Hee Won) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(새 벽 메뉴판 menu_01·02·06, 2026-11-09 수집)
// 옛 판(벽 menu_05·08, 책자 menu_07·09~14: 소 크기 없음·생더덕탕수육·사품냉채·산낙지짬뽕·생전복짬뽕·왕돈까스·특선·코스)은 안 씀
// 새 판·옛 판 가격이 다른 해파리냉채(500,000/700,000)·짬뽕밥(180,000/200,000)은 높은 쪽 (docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만)
window.RESTAURANT = {
  brand: { ko: "명희원", en: "Myung Hee Won" },
  phone: "0855 668 282",
  address: "Lô 15 TT1, KĐT Mỹ Đình Sông Đà, Mỹ Đình 1, Nam Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:00 – 22:00", // 구글 지도 '오전 10:00~오후 10:00'. 메뉴판·간판에 시간 없음
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });
const SML = (l, m, s) => [["L", l], ["M", m], ["S", s]];
const P12 = (one, two) => [["1P", one], ["2P", two]];

window.MENU = [
  {
    id: "meal",
    name: T("식사", "Meals", "主食", "食事", "Món chính"),
    note: T("1P = 1인분 · 2P = 2인분 · 가격은 부가세(VAT) 별도", "1P = 1 serving · 2P = 2 servings · Prices exclude VAT", "1P = 1人份 · 2P = 2人份 · 价格不含增值税（VAT）", "1P = 1人前 ・ 2P = 2人前 ・ 価格は税別（VAT別）", "1P = 1 suất · 2P = 2 suất · Giá chưa bao gồm thuế VAT"),
    items: [
      it(140000, "jjajang", T("짜장면", "Black Bean Sauce Noodles (Jjajangmyeon)", "炸酱面", "ジャージャー麺（ジャジャンミョン）", "Mỳ đen"), { tag: "must" }),
      it(180000, null, T("간짜장", "Dry-fried Black Bean Sauce Noodles (Ganjjajang) · sauce served separately", "干炸酱面（酱另放）", "カンジャジャン（ソース別盛りのジャージャー麺）", "Mỳ đen đặc (sốt ăn riêng)")),
      it(190000, null, T("삼선간짜장", "Seafood Dry-fried Black Bean Sauce Noodles (Samseon Ganjjajang)", "三鲜干炸酱面（海鲜）", "三鮮カンジャジャン（海鮮入り）", "Mỳ đen đặc hải sản")),
      it(180000, null, T("유니짜장", "Minced Black Bean Sauce Noodles (Yuni Jjajang)", "细碎炸酱面（食材切得很碎）", "ユニジャジャン（具を細かく刻んだジャージャー麺）", "Mỳ đen uni (nguyên liệu băm nhỏ)")),
      it(P12(200000, 350000), null, T("쟁반짜장", "Black Bean Sauce Noodles on a Platter (Jaengban Jjajang)", "盘装炸酱面（大盘炒面）", "チェンバンジャジャン（大皿ジャージャー麺）", "Mỳ đen khay")),
      it(P12(250000, 400000), null, T("불타는쟁반짜장", "Fiery Spicy Platter Black Bean Noodles (Bultaneun Jaengban Jjajang)", "超辣盘装炸酱面", "激辛チェンバンジャジャン（大皿ジャージャー麺）", "Mỳ đen khay rất cay"), { spicy: true }),
      it(P12(300000, 450000), "bokkeumjjamppong", T("불타는볶음짬뽕", "Fiery Stir-fried Spicy Noodles (Bultaneun Bokkeum Jjamppong)", "超辣干炒码面", "激辛炒めチャンポン（汁なし）", "Mỳ cay xào rất cay"), { spicy: true }),
      it(180000, "jjamppong", T("짬뽕", "Spicy Seafood Noodle Soup (Jjamppong)", "炒码面（海鲜辣汤面）", "チャンポン（辛い海鮮麺）", "Mỳ cay"), { tag: "best", spicy: true }),
      it(200000, null, T("불타는짬뽕", "Fiery Spicy Seafood Noodle Soup (Bultaneun Jjamppong)", "超辣炒码面", "激辛チャンポン", "Mỳ cay rất cay"), { spicy: true }),
      it(200000, null, T("마라짬뽕", "Mala Spicy Noodle Soup (Mala Jjamppong)", "麻辣炒码面", "麻辣チャンポン（マーラー味）", "Mỳ cay mara"), { spicy: true }),
      it(200000, null, T("삼선짬뽕", "Three-Seafood Spicy Noodle Soup (Samseon Jjamppong)", "三鲜炒码面", "三鮮チャンポン", "Mỳ cay hải sản"), { spicy: true }),
      it(220000, null, T("차돌짬뽕", "Beef Brisket Spicy Noodle Soup (Chadol Jjamppong)", "牛腩炒码面", "牛バラ肉チャンポン", "Mỳ cay thịt ức bò"), { spicy: true }),
      it(200000, null, T("백짬뽕", "White Seafood Noodle Soup (Baek Jjamppong, not spicy)", "白汤炒码面（海鲜，不辣）", "白チャンポン（辛くない海鮮麺）", "Mỳ hải sản (nước trắng, không cay)")),
      it(200000, null, T("삼선우동", "Seafood Udon Noodle Soup (Samseon Udong)", "三鲜乌冬面", "三鮮うどん", "Udon hải sản")),
      it(200000, null, T("삼선울면", "Seafood Thick Soup Noodles (Samseon Ulmyeon)", "三鲜打卤面", "三鮮ウルミョン（とろみ海鮮麺）", "Mì ôn lỗ hải sản")),
      it(200000, null, T("기스면", "Chicken Broth Noodles (Giseumyeon)", "鸡丝汤面", "キスミョン（鶏スープ麺）", "Mì nước luộc gà")),
      it(150000, null, T("짜장밥", "Black Bean Sauce over Rice (Jjajangbap)", "炸酱盖饭", "ジャージャー丼（ジャジャンバプ）", "Cơm đen")),
      it(200000, null, T("짬뽕밥", "Spicy Seafood Soup with Rice (Jjamppongbap)", "炒码汤饭", "チャンポンご飯（辛い海鮮スープご飯）", "Cơm cay"), { spicy: true }),
      it(150000, null, T("볶음밥", "Fried Rice (Bokkeumbap)", "炒饭", "チャーハン", "Cơm rang")),
      it(190000, null, T("새우볶음밥", "Shrimp Fried Rice (Saewoo Bokkeumbap)", "虾仁炒饭", "エビチャーハン", "Cơm rang tôm")),
      it(190000, null, T("양송이밥", "Button Mushroom Sauce over Rice (Yangsongi-bap)", "蘑菇盖饭", "マッシュルーム丼（ヤンソンイバプ）", "Cơm nấm trắng")),
      it(190000, null, T("마파두부밥", "Mapo Tofu over Rice (Mapo Dubu-bap)", "麻婆豆腐盖饭", "麻婆豆腐丼", "Cơm đậu phụ mapo")),
      it(190000, null, T("잡채밥", "Stir-fried Glass Noodles over Rice (Japchae-bap)", "杂菜盖饭（炒粉丝盖饭）", "チャプチェ丼（春雨炒めのせご飯）", "Cơm miến xào")),
      it(220000, null, T("고추잡채밥", "Stir-fried Peppers & Pork over Rice (Gochu Japchae-bap)", "青椒肉丝盖饭", "チンジャオロース丼（ゴチュジャプチェバプ）", "Cơm thịt xào ớt chuông")),
      it(240000, null, T("잡탕밥", "Mixed Seafood Stir-fry over Rice (Japtang-bap)", "海鲜杂烩盖饭", "海鮮チャプタン丼（海鮮と野菜の炒めのせご飯）", "Cơm thập cẩm")),
      it(240000, null, T("유산슬밥", "Stir-fried Seafood, Meat & Vegetables over Rice (Yusanseul-bap)", "溜三丝盖饭（海鲜肉菜烩饭）", "ユサンスル丼（海鮮・肉・野菜の炒めのせご飯）", "Cơm thịt rau xào")),
      it(170000, null, T("콩국수", "Cold Soy Milk Noodles (Kongguksu)", "冷豆浆面", "コングクス（冷たい豆乳麺）", "Mì lạnh đậu tương")),
      it(200000, null, T("중국냉면", "Chinese-style Cold Noodles (Jungguk Naengmyeon)", "中式冷面", "中華冷麺（ジュングクネンミョン）", "Mì lạnh Trung Quốc")),
      it(100000, "gunmandu", T("군만두", "Pan-fried Dumplings (Gunmandu)", "煎饺", "焼き餃子", "Há cảo chiên")),
      it(100000, null, T("물만두", "Boiled Dumplings (Mulmandu)", "水饺", "水餃子", "Há cảo hấp")),
    ],
  },
  {
    id: "dish",
    name: T("요리", "Dishes", "热菜", "料理", "Món ăn"),
    note: T("L = 대 · M = 중 · S = 소 · 가격은 부가세(VAT) 별도", "L = Large · M = Medium · S = Small · Prices exclude VAT", "L = 大份 · M = 中份 · S = 小份 · 价格不含增值税（VAT）", "L = 大 ・ M = 中 ・ S = 小 ・ 価格は税別（VAT別）", "L = Lớn · M = Vừa · S = Nhỏ · Giá chưa bao gồm thuế VAT"),
    items: [
      it(SML(550000, 440000, 330000), "tangsuyuk", T("탕수육", "Sweet & Sour Pork (Tangsuyuk)", "糖醋肉", "酢豚（タンスユク）", "Thịt lợn sốt chua ngọt"), { tag: "best" }),
      it(SML(600000, 490000, 380000), null, T("사천탕수육", "Szechuan Spicy Sweet & Sour Pork (Sacheon Tangsuyuk)", "四川辣味糖醋肉", "四川風辛い酢豚", "Thịt lợn sốt cay"), { spicy: true }),
      it([["M", 400000], ["S", 300000]], null, T("표고버섯탕수육", "Sweet & Sour Shiitake Mushrooms (Pyogo Beoseot Tangsuyuk)", "糖醋香菇", "椎茸の酢豚風（ピョゴボソッタンスユク）", "Nấm hương sốt chua ngọt")),
      it(SML(950000, 750000, 550000), "yangjangpi", T("양장피", "Seafood & Vegetable Platter with Mustard Sauce (Yangjangpi)", "杂拌凉菜（芥末海鲜拼盘）", "ヤンジャンピ（海鮮と野菜の辛子ソース和え）", "Nộm hải sản sốt mù tạt"), { tag: "must" }),
      it(SML(850000, 650000, 450000), null, T("고추잡채", "Stir-fried Peppers & Pork (Gochu Japchae)", "青椒肉丝", "チンジャオロース風（ゴチュジャプチェ）", "Thịt xào ớt chuông")),
      it(SML(950000, 750000, 550000), null, T("깐풍기", "Spicy Garlic Fried Chicken (Kkanpunggi)", "干烹鸡（蒜香辣炸鸡）", "カンプンギ（ピリ辛ガーリック唐揚げ）", "Gà chiên xào cay"), { spicy: true }),
      it(SML(950000, 750000, 550000), null, T("유린기", "Fried Chicken with Soy-Vinegar Sauce (Yuringi)", "油淋鸡", "ユーリンチー（油淋鶏）", "Gà chiên sốt chua ngọt")),
      it(SML(1000000, 800000, 600000), null, T("팔보채", "Stir-fried Eight Treasures (Palbochae)", "八宝菜", "八宝菜（パルボチェ）", "Hải sản thịt rau xào bát bảo (Palbochae)")),
      it(SML(1000000, 800000, 600000), null, T("유산슬", "Stir-fried Seafood, Meat & Vegetables (Yusanseul)", "溜三丝（海鲜肉菜烩）", "ユサンスル（海鮮・肉・野菜の炒め）", "Hải sản thịt rau xào (Yusanseul)")),
      it(SML(1000000, 800000, 600000), null, T("깐쇼새우", "Sweet Chili Shrimp (Kkansyo Saewoo)", "干烧虾（甜辣虾）", "ガンショウ海老（甘辛チリソース）", "Tôm sốt chua cay")),
      it(SML(1000000, 800000, 600000), null, T("깐풍새우", "Spicy Garlic Fried Shrimp (Kkanpung Saewoo)", "干烹虾（蒜香辣炸虾）", "カンプン海老（ピリ辛ガーリック揚げ）", "Tôm chiên xào cay"), { spicy: true }),
      it(SML(1000000, 800000, 600000), null, T("크림새우", "Creamy Fried Shrimp (Cream Saewoo)", "奶油虾", "クリームソースのエビ揚げ", "Tôm sốt kem")),
      it(700000, null, T("해파리냉채", "Jellyfish Cold Salad (Haepari Naengchae)", "凉拌海蜇", "クラゲの冷菜", "Nộm sứa")),
      it(500000, null, T("해물누룽지탕", "Seafood & Crispy Rice Soup (Haemul Nurungjitang)", "海鲜锅巴汤", "海鮮おこげスープ", "Súp hải sản cơm cháy")),
      it(450000, null, T("마파두부", "Spicy Tofu in Szechuan Sauce (Mapo Tofu)", "麻婆豆腐", "麻婆豆腐", "Đậu phụ tứ xuyên")),
      it(500000, null, T("해물잡탕", "Mixed Seafood Stew (Haemul Japtang)", "海鲜杂烩", "海鮮チャプタン（海鮮と野菜の煮込み）", "Hải sản thập cẩm")),
      it(300000, null, T("삼선탕", "Three-Seafood Soup (Samseontang)", "三鲜汤", "三鮮スープ", "Canh hải sản tam tiên")),
      it(100000, null, T("꽃빵 추가", "Extra Steamed Flower Buns (Kkotppang)", "加花卷", "花巻（中華蒸しパン）追加", "Thêm bánh hoa cuộn (Kkotppang)")),
    ],
  },
  {
    id: "set",
    name: T("알뜰세트", "Value Sets", "实惠套餐", "お得セット", "Combo tiết kiệm"),
    note: T("1인 가격 · 2인 이상 주문 · 식사는 짜장면·짬뽕·볶음밥 중 선택", "Price per person · Min. 2 people · Choose a meal: Jjajangmyeon, Jjamppong or Fried Rice", "每人价格 · 2人起点 · 主食可选炸酱面、炒码面或炒饭", "1名様の価格 ・ 2名様から注文可 ・ 食事はジャージャー麺・チャンポン・チャーハンから選択", "Giá 1 người · Gọi từ 2 người · Món chính chọn mỳ đen, mỳ cay hoặc cơm rang"),
    items: [
      it(200000, null, T("탕수육 세트", "Sweet & Sour Pork Set (Tangsuyuk Set)", "糖醋肉套餐", "酢豚セット（タンスユクセット）", "Set thịt lợn sốt chua ngọt")),
      it(230000, null, T("사천탕수육 세트", "Szechuan Sweet & Sour Pork Set (Sacheon Tangsuyuk Set)", "四川糖醋肉套餐", "四川風酢豚セット", "Set thịt lợn sốt cay")),
      it(270000, null, T("유린기 세트", "Soy-Vinegar Fried Chicken Set (Yuringi Set)", "油淋鸡套餐", "ユーリンチーセット（油淋鶏）", "Set gà chiên sốt chua ngọt")),
      it(300000, null, T("크림새우 세트", "Creamy Fried Shrimp Set (Cream Saewoo Set)", "奶油虾套餐", "クリームエビセット", "Set tôm sốt kem")),
    ],
    tip: T(
      "세트 식사 변경(추가금): 간짜장·유니짜장·삼선짬뽕·불타는짬뽕·새우볶음밥·잡채밥 +40,000 · 삼선간짜장 +50,000 · 차돌짬뽕 +60,000 · 고추잡채밥 +70,000",
      "Change your set meal (extra charge): Ganjjajang · Yuni Jjajang · Samseon Jjamppong · Fiery Jjamppong · Shrimp Fried Rice · Japchae-bap +40,000 · Samseon Ganjjajang +50,000 · Chadol Jjamppong +60,000 · Gochu Japchae-bap +70,000",
      "更换套餐主食（需加价）：干炸酱面·细碎炸酱面·三鲜炒码面·超辣炒码面·虾仁炒饭·杂菜盖饭 +40,000 · 三鲜干炸酱面 +50,000 · 牛腩炒码面 +60,000 · 青椒肉丝盖饭 +70,000",
      "セットの食事を変更（追加料金）：カンジャジャン・ユニジャジャン・三鮮チャンポン・激辛チャンポン・エビチャーハン・チャプチェ丼 +40,000 ・ 三鮮カンジャジャン +50,000 ・ 牛バラ肉チャンポン +60,000 ・ チンジャオロース丼 +70,000",
      "Đổi món chính trong set (phụ thu): Mỳ đen đặc · Mỳ đen uni · Mỳ cay hải sản · Mỳ cay rất cay · Cơm rang tôm · Cơm miến xào +40.000 · Mỳ đen đặc hải sản +50.000 · Mỳ cay thịt ức bò +60.000 · Cơm thịt xào ớt chuông +70.000",
    ),
  },
];
