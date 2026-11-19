// 홍강(SÔNG HỒNG · 紅江) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(새 판 menu_10·06 단품, menu_02·09·11·13 세트, 2026-11-09 수집)
// 옛 판(menu_14·16·29, 1만~3만 동 낮음)은 쓰지 않음. 세트3 560,000은 menu_02에서 잘려 menu_09·11·13으로 확인
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만 — 정사각형이면 양옆 흰 여백)
// 메뉴판 사진끼리 가격이 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "홍강", en: "Song Hong" },
  phone: "0868 699 189",
  address: "Ngõ 145 Đ. Đình Thôn, Đình Thôn, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:30 – 14:00 · 16:30 – 21:30", // 구글 지도 '오전 10:30~오후 2:00 / 오후 4:30~9:30' (휴식 시간 있음)
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "meal",
    name: T("식사", "Meals", "主食", "食事", "Món chính"),
    note: T("모든 가격은 부가세 포함", "All prices include VAT", "所有价格均含增值税", "価格はすべて税込（VAT込み）です", "Giá trên đã bao gồm thuế VAT"),
    items: [
      it(150000, "jjajang", T("유니짜장면", "Black Bean Sauce Noodles (Yuni Jjajangmyeon)", "炸酱面（Yuni 炸酱面）", "ジャージャー麺（ユニジャジャンミョン）", "Mỳ đen"), { tag: "must" }),
      it(210000, null, T("고기짬뽕 (밥/면)", "Spicy Pork Noodle Soup (Gogi Jjamppong) · rice or noodles", "肉丝炒码面（辣汤面）· 可选米饭或面条", "肉入りチャンポン（ご飯／麺）", "Mỳ cay thịt ba chỉ"), { spicy: true }),
      it(210000, "jjamppong", T("해물짬뽕 (밥/면)", "Spicy Seafood Noodle Soup (Jjamppong) · rice or noodles", "炒码面（海鲜辣汤面）· 可选米饭或面条", "海鮮チャンポン（ご飯／麺）", "Mỳ cay hải sản"), { tag: "best", spicy: true }),
      it(220000, null, T("해물우동", "Seafood Udon Noodle Soup (Haemul Udong, not spicy)", "海鲜乌冬面（不辣）", "海鮮うどん（辛くない）", "Mỳ hải sản không cay")),
      it(220000, null, T("잡채밥", "Stir-fried Glass Noodles over Rice (Japchae-bap)", "杂菜盖饭（炒粉丝盖饭）", "チャプチェ丼（春雨炒めのせご飯）", "Miến xào trộn cơm")),
      it(170000, null, T("계란볶음밥", "Egg Fried Rice (Gyeran Bokkeumbap)", "鸡蛋炒饭", "卵チャーハン", "Cơm rang trứng")),
      it(210000, null, T("새우볶음밥", "Shrimp Fried Rice (Saewoo Bokkeumbap)", "虾仁炒饭", "エビチャーハン", "Cơm rang tôm")),
      it(210000, null, T("해물볶음밥", "Seafood Fried Rice (Haemul Bokkeumbap)", "海鲜炒饭", "海鮮チャーハン", "Cơm rang hải sản")),
    ],
    tip: T("식사 곱빼기 40,000 추가 · 공기밥 20,000", "Large portion +40,000 · Steamed rice 20,000", "加大份 +40,000 · 白米饭 20,000", "大盛り +40,000 ・ ライス 20,000", "Thêm suất lớn 40.000 · Cơm trắng 20.000"),
  },
  {
    id: "dish",
    name: T("요리", "Dishes", "热菜", "料理", "Món xào & chiên"),
    items: [
      it(260000, null, T("탕수육", "Sweet & Sour Pork (Tangsuyuk)", "糖醋肉", "酢豚（タンスユク）", "Thịt lợn sốt chua ngọt"), { tag: "best" }),
      it(360000, null, T("사천탕수육", "Szechuan Spicy Sweet & Sour Pork (Sacheon Tangsuyuk)", "四川辣味糖醋肉", "四川風辛い酢豚", "Thịt lợn sốt cay"), { spicy: true }),
      it(360000, null, T("유린탕수육", "Fried Pork with Soy-Vinegar Sauce (Yurin Tangsuyuk)", "油淋糖醋肉（酱醋汁炸猪肉）", "油淋豚（醤油酢ソースの揚げ豚）", "Thịt lợn sốt chua ngọt đặc biệt")),
      it(310000, "kkanpunggi", T("깐풍기", "Spicy Garlic Fried Chicken (Kkanpunggi)", "干烹鸡（蒜香辣炸鸡）", "カンプンギ（ピリ辛ガーリック唐揚げ）", "Gà chiên xào cay"), { spicy: true }),
      it(280000, null, T("닭강정", "Sweet Crispy Fried Chicken (Dakgangjeong)", "韩式甜脆炸鸡（Dakgangjeong）", "タッカンジョン（甘辛い韓国風唐揚げ）", "Gà chiên sốt mật ong")),
      it(360000, "yuringi", T("유린기", "Fried Chicken with Soy-Vinegar Sauce (Yuringi)", "油淋鸡", "ユーリンチー（油淋鶏）", "Gà chiên sốt chua ngọt")),
      it(450000, null, T("간쇼새우", "Sweet Chili Shrimp (Ganshao Saewoo)", "干烧虾（甜辣虾）", "ガンショウ海老（甘辛チリソース）", "Tôm sốt chua cay"), { spicy: true }),
      it(500000, "yangjangpi", T("양장피", "Seafood & Vegetable Platter with Mustard Sauce (Yangjangpi)", "杂拌凉菜（芥末海鲜拼盘）", "ヤンジャンピ（海鮮と野菜の辛子ソース和え）", "Nộm hải sản sốt mù tạt")),
      it(310000, null, T("잡채", "Stir-fried Glass Noodles with Vegetables (Japchae)", "韩式炒杂菜（炒粉丝）", "チャプチェ（春雨炒め）", "Miến xào Hàn Quốc")),
      it(300000, null, T("마파두부", "Spicy Tofu in Szechuan Sauce (Mapo Tofu)", "麻婆豆腐", "麻婆豆腐", "Đậu phụ tứ xuyên"), { spicy: true }),
      it(150000, null, T("군만두 & 쇼마이", "Pan-fried Dumplings & Shumai (Gunmandu & Shumai)", "煎饺 & 烧卖", "焼き餃子 & シュウマイ", "Bánh sủi cảo chiên & Xíu mại")),
      it(180000, "tteokbokki", T("떡볶이", "Spicy Rice Cakes (Tteokbokki)", "辣炒年糕", "トッポッキ（辛い餅炒め）", "Tokbokki"), { spicy: true }),
    ],
  },
  {
    id: "combo",
    name: T("세트 메뉴", "Set Menus", "套餐", "セットメニュー", "Combo set"),
    note: T("짬뽕은 해물짬뽕·고기짬뽕 중 고르세요", "Choose Jjamppong: seafood or pork", "炒码面可选海鲜或肉丝", "チャンポンは海鮮か肉入りを選べます", "Mỳ cay chọn hải sản hoặc thịt"),
    items: [
      it(360000, null, T("세트 1 · 짜장면 + 탕수육(S)", "Set 1 · Jjajangmyeon + Sweet & Sour Pork (S)", "套餐1 · 炸酱面 + 糖醋肉（小）", "セット1 · ジャージャー麺 + 酢豚（S）", "Set 1 · Mỳ đen + Thịt lợn sốt chua ngọt (S)")),
      it(420000, null, T("세트 2 · 짬뽕 + 탕수육(S)", "Set 2 · Jjamppong + Sweet & Sour Pork (S)", "套餐2 · 炒码面 + 糖醋肉（小）", "セット2 · チャンポン + 酢豚（S）", "Set 2 · Mỳ cay + Thịt lợn sốt chua ngọt (S)")),
      it(560000, null, T("세트 3 · 짜장면 + 짬뽕 + 탕수육(S)", "Set 3 · Jjajangmyeon + Jjamppong + Sweet & Sour Pork (S)", "套餐3 · 炸酱面 + 炒码面 + 糖醋肉（小）", "セット3 · ジャージャー麺 + チャンポン + 酢豚（S）", "Set 3 · Mỳ đen + Mỳ cay + Thịt lợn sốt chua ngọt (S)")),
      it(380000, null, T("세트 4 · 짜장면 + 닭강정", "Set 4 · Jjajangmyeon + Sweet Crispy Fried Chicken (Dakgangjeong)", "套餐4 · 炸酱面 + 韩式甜脆炸鸡", "セット4 · ジャージャー麺 + タッカンジョン", "Set 4 · Mỳ đen + Gà chiên sốt mật ong")),
      it(440000, null, T("세트 5 · 짬뽕 + 닭강정", "Set 5 · Jjamppong + Sweet Crispy Fried Chicken (Dakgangjeong)", "套餐5 · 炒码面 + 韩式甜脆炸鸡", "セット5 · チャンポン + タッカンジョン", "Set 5 · Mỳ cay + Gà chiên sốt mật ong")),
      it(1100000, null, T("A110 (2~3인) · 양장피 + 유린탕수육 + 마파두부", "A110 (2–3 people) · Seafood & Vegetable Platter with Mustard Sauce + Fried Pork with Soy-Vinegar Sauce + Mapo Tofu", "A110（2~3人）· 杂拌凉菜 + 油淋糖醋肉 + 麻婆豆腐", "A110（2〜3名様）· ヤンジャンピ + 油淋豚 + 麻婆豆腐", "A110 (2–3 người) · Nộm hải sản sốt mù tạt + Thịt lợn sốt chua ngọt đặc biệt + Đậu phụ tứ xuyên")),
      it(1100000, null, T("B110 (2~3인) · 해물잡탕 + 간쇼새우 + 깐풍기", "B110 (2–3 people) · Spicy Stir-fried Seafood (Japtang) + Sweet Chili Shrimp + Spicy Garlic Fried Chicken", "B110（2~3人）· 海鲜杂烩（辣味炒海鲜）+ 干烧虾 + 干烹鸡", "B110（2〜3名様）· 海鮮チャプタン（辛い海鮮炒め）+ ガンショウ海老 + カンプンギ", "B110 (2–3 người) · Hải sản xào cay + Tôm sốt chua cay + Gà chiên xào cay")),
      it(1100000, null, T("C110 (2~3인) · 짬뽕탕 + 유린기 + 탕수육", "C110 (2–3 people) · Jjamppong Soup (no noodles) + Fried Chicken with Soy-Vinegar Sauce + Sweet & Sour Pork", "C110（2~3人）· 炒码汤（不含面）+ 油淋鸡 + 糖醋肉", "C110（2〜3名様）· チャンポンスープ（麺なし）+ ユーリンチー + 酢豚", "C110 (2–3 người) · Canh hải sản cay + Gà chiên sốt chua ngọt + Thịt lợn sốt chua ngọt")),
    ],
  },
  {
    id: "drink",
    name: T("주류·음료", "Drinks & Alcohol", "酒水饮料", "お酒・ドリンク", "Đồ uống"),
    items: [
      it(275000, null, T("연태고량주 100ml", "Yantai Gu Niang Baijiu (Yeontae Goryangju) 100ml", "烟台古酿 100ml", "煙台古醸（高粱酒）100ml", "Rượu Yên Đài 100ml")),
      it(550000, null, T("연태고량주 (33도) 250ml", "Yantai Gu Niang Baijiu (Yeontae Goryangju) 33% 250ml", "烟台古酿（33度）250ml", "煙台古醸（高粱酒）33度 250ml", "Rượu Yên Đài (33°) 250ml")),
      it(990000, null, T("연태고량주 (33도) 500ml", "Yantai Gu Niang Baijiu (Yeontae Goryangju) 33% 500ml", "烟台古酿（33度）500ml", "煙台古醸（高粱酒）33度 500ml", "Rượu Yên Đài (33°) 500ml")),
      it(1100000, null, T("연태고량주 (42도) 500ml", "Yantai Gu Niang Baijiu (Yeontae Goryangju) 42% 500ml", "烟台古酿（42度）500ml", "煙台古醸（高粱酒）42度 500ml", "Rượu Yên Đài (42°) 500ml")),
      it(130000, null, T("좋은데이", "Soju (Good Day)", "烧酒（好天天 Good Day）", "焼酎（ジョウンデイ）", "Soju Good Day")),
      it(150000, null, T("처음처럼 · 참이슬", "Soju (Chum Churum · Chamisul)", "烧酒（初饮初乐 · 真露）", "焼酎（チョウムチョロム・チャミスル）", "Soju Chum Churum · Chamisul")),
      it(50000, null, T("타이거 병맥주", "Tiger Beer (bottle)", "虎牌啤酒（瓶装）", "タイガービール（瓶）", "Bia Tiger chai")),
      it(25000, null, T("음료수 (콜라·사이다·환타)", "Soft Drinks (Coke · Sprite · Fanta)", "饮料（可乐 · 雪碧 · 芬达）", "ソフトドリンク（コーラ・サイダー・ファンタ）", "Nước ngọt (Coca · Sprite · Fanta)")),
    ],
    tip: T("주류 콜키지 병당 500,000", "Corkage fee for outside alcohol: 500,000 per bottle", "自带酒水开瓶费：每瓶 500,000", "お酒の持ち込み料：1本につき 500,000", "Phí mang rượu vào 500.000 / chai"),
  },
];
