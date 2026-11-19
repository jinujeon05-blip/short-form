// 도야짬뽕(DOYA JJAMBBONG, 한국식 중식당, 하노이 Từ Liêm) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음). 출처: 구글 지도에 올라온 메뉴판 사진(2026-11-07 수집: 흰 메뉴판 앞·뒷면, 검은 책자 세트 면, 콤보 세트판). 같은 메뉴가 사진마다 다르면 높은 쪽 가격(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "도야짬뽕", en: "DOYA JJAMBBONG" },
  phone: "0848658123",
  address: "18 ngách 39/70 Đ. Đình Thôn, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:00 – 15:00 · 17:00 – 23:30",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });
const ML = (m, l) => [["M", m], ["L", l]];
const SML = (s, m, l) => [["S", s], ["M", m], ["L", l]];
const SET2 = (a, b) => [["🥟 8P", a], ["🍖 Mini", b]];

window.MENU = [
  {
    id: "top4",
    name: T("술안주 4대 천왕", "Top 4 Must Try", "下酒菜四大天王", "おつまみ四天王", "Top 4 món nhắm"),
    items: [
      it([["S", 200000], ["M", 380000]], null, T("고추잡채 (꽃빵)", "Stir-fried Pepper & Pork (Gochu Japchae) with Steamed Bread", "青椒肉丝(配花卷)", "チンジャオロース(花巻付き)", "Thịt heo xào ớt chuông thái sợi (Gochu Japchae) + Bánh bao hấp"), { tag: "must" }),
      it(380000, null, T("해물 누룽지탕", "Seafood Nurungji Soup (Crispy Rice Soup)", "海鲜锅巴汤", "海鮮おこげスープ", "Canh cơm cháy hải sản"), { tag: "must" }),
      it(380000, null, T("해물 짬뽕탕", "Spicy Seafood Jjambbong Soup", "海鲜炒码汤", "海鮮チャンポンスープ", "Canh Jjambbong hải sản cay"), { tag: "must", spicy: true }),
      it(700000, "yangjangpi", T("양장피", "Yangjangpi (Seafood & Vegetable Salad)", "两张皮(海鲜杂拌凉菜)", "ヤンジャンピ(海鮮と野菜の和え物)", "Yangjangpi (Gỏi hải sản trộn mù tạt)"), { tag: "must", desc: T("해산물·채소 채 + 겨자 소스", "Shredded seafood & vegetables with mustard sauce", "海鲜和蔬菜丝配芥末酱", "海鮮と野菜の細切りにからしソース", "Hải sản và rau củ thái sợi, ăn kèm sốt mù tạt") }),
    ],
  },
  {
    id: "jjamppong",
    name: T("도야짬뽕", "Doya Jjambbong", "DOYA 炒码面", "DOYA チャンポン", "Mì Jjambbong"),
    tip: T("면 추가 30,000", "Add noodles 30,000", "加面 30,000", "麺の追加 30,000", "Thêm mì 30.000"),
    items: [
      it(SML(90000, 160000, 190000), "jjamppong", T("도야짬뽕", "Doya Jjambbong", "DOYA 炒码面(辣海鲜汤面)", "DOYA チャンポン(辛い海鮮スープ麺)", "Mì Jjambbong Doya"), { tag: "best", spicy: true }),
      it(ML(200000, 230000), null, T("소고기짬뽕", "Beef Jjambbong", "牛肉炒码面", "牛肉チャンポン", "Mì Jjambbong bò"), { spicy: true }),
      it(ML(200000, 230000), null, T("새우고추짬뽕", "Shrimp Chilli Jjambbong", "虾仁辣椒炒码面", "エビと唐辛子のチャンポン", "Mì Jjambbong tôm ớt"), { spicy: true }),
      it(ML(200000, 230000), null, T("해물짬뽕", "Spicy Seafood Jjambbong", "红汤海鲜炒码面(辣)", "辛い海鮮チャンポン", "Mì Jjambbong hải sản cay"), { spicy: true }),
      it(ML(200000, 230000), "baekjjamppong", T("해물백짬뽕", "White Seafood Jjambbong (Not Spicy)", "白汤海鲜炒码面(不辣)", "白いスープの海鮮チャンポン(辛くない)", "Mì Jjambbong hải sản nước trắng (không cay)")),
      it(ML(200000, 230000), null, T("크림짬뽕", "Cream Jjambbong", "奶油炒码面", "クリームチャンポン", "Mì Jjambbong sốt kem")),
      it(ML(200000, 230000), null, T("마라짬뽕", "Mala Jjambbong", "麻辣炒码面", "麻辣チャンポン", "Mì Mala Jjambbong"), { spicy: true }),
      it(ML(200000, 230000), null, T("순두부짬뽕", "Soft Tofu Jjambbong", "嫩豆腐炒码面", "純豆腐チャンポン", "Mì Jjambbong đậu hũ non"), { spicy: true }),
      it(ML(200000, 230000), null, T("수제비짬뽕", "Sujebi Jjambbong (Hand-torn Dough)", "手撕面片炒码汤", "スジェビチャンポン(手ちぎり麺)", "Jjambbong bánh canh xé tay"), { spicy: true }),
      it(200000, null, T("냉짬뽕", "Cold Jjambbong", "冷炒码面", "冷やしチャンポン", "Mì Jjambbong lạnh"), { spicy: true }),
      it(ML(210000, 400000), null, T("해물쟁반짬뽕", "Seafood Jjambbong Platter", "海鲜炒码面拼盘", "海鮮チャンポン大皿", "Đĩa mì Jjambbong hải sản"), { spicy: true }),
      it(160000, null, T("콩국수", "Cold Soy Milk Noodles (Kongguksu)", "豆浆冷面", "コングクス(冷たい豆乳麺)", "Mì lạnh sữa đậu nành")),
    ],
  },
  {
    id: "jjajang",
    name: T("도야짜장", "Doya Jjajang", "DOYA 炸酱面", "DOYA ジャージャー麺", "Mì tương đen"),
    items: [
      it(SML(70000, 120000, 150000), "jjajang", T("도야짜장", "Doya Jjajang", "DOYA 韩式炸酱面", "DOYA ジャージャー麺", "Mì tương đen Doya"), { tag: "best" }),
      it(ML(160000, 190000), null, T("새우고추짜장", "Shrimp Chilli Jjajang", "虾仁辣椒炸酱面", "エビと唐辛子のジャージャー麺", "Mì tương đen tôm ớt"), { spicy: true }),
      it(ML(200000, 380000), null, T("해물쟁반짜장", "Seafood Jjajang Platter", "海鲜炸酱面拼盘", "海鮮ジャージャー麺大皿", "Đĩa mì tương đen hải sản")),
      it(ML(160000, 190000), null, T("간짜장", "Ganjjajang (Dry-fried Jjajang)", "干炸酱面", "カンジャジャン(汁なしジャージャー麺)", "Mì tương đen xào khô (Ganjjajang)")),
    ],
  },
  {
    id: "fried",
    name: T("프리미엄 튀김요리", "Premium Fried Dishes", "精选炸物", "プレミアム揚げ物", "Món chiên"),
    items: [
      it([["Baby 5PC", 100000], ["Mini 10PC", 200000], ["S 15PC", 300000], ["M 20PC", 400000], ["L 25PC", 500000]], null, T("탕수육", "Sweet and Sour Pork (Tangsuyuk)", "糖醋肉", "酢豚", "Thịt heo chiên sốt chua ngọt (Tangsuyuk)")),
      it(SML(110000, 200000, 380000), null, T("유린기", "Fried Chicken with Soy-Vinegar Sauce (Yurinki)", "油淋鸡", "ユーリンチー", "Gà chiên sốt giấm xì dầu (Yurinki)"), { desc: T("매운맛 · 안 매운맛", "Spicy · Not spicy", "辣味 · 不辣", "辛い · 辛くない", "Cay · Không cay") }),
      it(SML(110000, 200000, 380000), null, T("깐풍기", "Garlic Chilli Fried Chicken (Kkanpoongki)", "干烹鸡", "カンプンギ(ガーリック唐辛子ソースの揚げ鶏)", "Gà chiên sốt tỏi ớt (Kkanpoongki)"), { desc: T("매운맛 · 안 매운맛", "Spicy · Not spicy", "辣味 · 不辣", "辛い · 辛くない", "Cay · Không cay") }),
    ],
  },
  {
    id: "shrimp",
    name: T("해물 특선요리", "Seafood Specials", "特色海鲜", "海鮮の特選料理", "Món tôm đặc biệt"),
    items: [
      it(SML(110000, 200000, 380000), null, T("크림새우", "Cream Shrimp", "奶油虾", "クリームエビ", "Tôm sốt kem")),
      it(SML(110000, 200000, 380000), null, T("칠리새우", "Chilli Shrimp (Sweet Chilli Sauce)", "甜辣酱虾(干烧虾)", "エビチリ", "Tôm sốt ớt ngọt (Chilli)"), { spicy: true }),
      it(SML(110000, 200000, 380000), null, T("깐풍새우", "Garlic Chilli Fried Shrimp (Kkanpoong)", "干烹虾", "カンプンエビ(ガーリック唐辛子ソースの揚げエビ)", "Tôm chiên sốt tỏi ớt (Kkanpoong)")),
    ],
  },
  {
    id: "rice",
    name: T("식사", "Rice", "米饭", "ご飯もの", "Cơm"),
    items: [
      it([["S", 160000], ["M", 190000]], null, T("새우볶음밥", "Shrimp Fried Rice", "虾仁炒饭", "エビチャーハン", "Cơm chiên tôm")),
      it(ML(190000, 220000), null, T("불고기잡채밥", "Bulgogi Japchae Rice", "烤肉杂菜饭", "プルコギチャプチェご飯", "Cơm Bulgogi Japchae (thịt bò nướng và miến)")),
    ],
  },
  {
    id: "side",
    name: T("사이드", "Sides", "小食", "サイドメニュー", "Món phụ"),
    items: [
      it([["4PC", 50000], ["8PC", 100000]], null, T("군만두", "Fried Dumplings", "煎饺", "焼き餃子", "Há cảo chiên")),
      it(100000, "mulmandu", T("물만두", "Boiled Dumplings", "水饺", "水餃子", "Há cảo luộc")),
      it(80000, null, T("꽃빵튀김 (4개)", "Fried Flower Buns (4 pcs)", "炸花卷(4个)", "揚げ花巻(4個)", "Bánh bao xoắn chiên (4 cái)")),
      it(70000, null, T("떡볶이", "Tteokbokki (Spicy Rice Cakes)", "辣炒年糕", "トッポッキ", "Bánh gạo cay Tokbokki"), { spicy: true }),
      it(70000, null, T("김밥", "Kimbap", "紫菜包饭", "キンパ", "Cơm cuộn rong biển (Kimbap)")),
      it(70000, null, T("두부튀김", "Fried Tofu with Sauce", "炸豆腐配酱汁", "揚げ豆腐ソース添え", "Đậu hũ chiên sốt")),
      it(25000, null, T("미니 군만두 5개 추가", "Add 5 Mini Fried Dumplings", "加5个迷你煎饺", "ミニ焼き餃子5個追加", "Thêm 5 há cảo chiên mini")),
      it(40000, null, T("치즈 추가", "Add Cheese", "加芝士", "チーズ追加", "Thêm phô mai sợi")),
    ],
  },
  {
    id: "combo",
    name: T("콤보 세트", "Combo Sets", "组合套餐", "コンボセット", "Combo"),
    items: [
      it(320000, null, T("2인 콤보 SET A", "Combo for 2 — Set A", "2人组合套餐 A", "2名様コンボ SET A", "Combo 2 người — Set A"), { desc: T("탕수육(Baby) + 유린기 S + 깐풍새우 S + 군만두 2개", "Sweet & sour pork (Baby) + Yurinki S + Kkanpoong shrimp S + 2 fried dumplings", "糖醋肉(Baby)+ 油淋鸡 S + 干烹虾 S + 煎饺2个", "酢豚(Baby)+ ユーリンチー S + カンプンエビ S + 焼き餃子2個", "Thịt heo sốt chua ngọt (Baby) + Gà sốt giấm xì dầu S + Tôm sốt tỏi ớt S + Há cảo chiên 2 cái") }),
      it(320000, null, T("2인 콤보 SET B", "Combo for 2 — Set B", "2人组合套餐 B", "2名様コンボ SET B", "Combo 2 người — Set B"), { desc: T("탕수육(Baby) + 깐풍기 S + 칠리새우 S + 군만두 2개", "Sweet & sour pork (Baby) + Kkanpoongki S + Chilli shrimp S + 2 fried dumplings", "糖醋肉(Baby)+ 干烹鸡 S + 甜辣酱虾 S + 煎饺2个", "酢豚(Baby)+ カンプンギ S + エビチリ S + 焼き餃子2個", "Thịt heo sốt chua ngọt (Baby) + Gà sốt tỏi ớt S + Tôm sốt ớt ngọt S + Há cảo chiên 2 cái") }),
      it(600000, null, T("4인 콤보 SET C", "Combo for 4 — Set C", "4人组合套餐 C", "4名様コンボ SET C", "Combo 4 người — Set C"), { desc: T("탕수육(Mini) + 유린기 M + 깐풍새우 M + 군만두 4개", "Sweet & sour pork (Mini) + Yurinki M + Kkanpoong shrimp M + 4 fried dumplings", "糖醋肉(Mini)+ 油淋鸡 M + 干烹虾 M + 煎饺4个", "酢豚(Mini)+ ユーリンチー M + カンプンエビ M + 焼き餃子4個", "Thịt heo sốt chua ngọt (Mini) + Gà sốt giấm xì dầu M + Tôm sốt tỏi ớt M + Há cảo chiên 4 cái") }),
      it(600000, null, T("4인 콤보 SET D", "Combo for 4 — Set D", "4人组合套餐 D", "4名様コンボ SET D", "Combo 4 người — Set D"), { desc: T("탕수육(Mini) + 깐풍기 M + 칠리새우 M + 군만두 4개", "Sweet & sour pork (Mini) + Kkanpoongki M + Chilli shrimp M + 4 fried dumplings", "糖醋肉(Mini)+ 干烹鸡 M + 甜辣酱虾 M + 煎饺4个", "酢豚(Mini)+ カンプンギ M + エビチリ M + 焼き餃子4個", "Thịt heo sốt chua ngọt (Mini) + Gà sốt tỏi ớt M + Tôm sốt ớt ngọt M + Há cảo chiên 4 cái") }),
      it(700000, null, T("양장피 + 군만두 4개", "Yangjangpi + 4 Fried Dumplings", "两张皮 + 煎饺4个", "ヤンジャンピ + 焼き餃子4個", "Yangjangpi + Há cảo chiên 4 cái")),
      it(200000, null, T("고추잡채 S + 군만두 4개", "Gochu Japchae S + 4 Fried Dumplings", "青椒肉丝 S + 煎饺4个", "チンジャオロース S + 焼き餃子4個", "Gochu Japchae S + Há cảo chiên 4 cái"), { tag: "best" }),
    ],
  },
  {
    id: "anju-set",
    name: T("술안주 세트", "Drinking Snack Sets", "下酒菜套餐", "おつまみセット", "Set đồ nhắm"),
    note: T("해물짬뽕탕은 해물누룽지탕으로 바꿀 수 있어요", "Seafood jjambbong soup can be swapped for seafood nurungji soup", "海鲜炒码汤可换成海鲜锅巴汤", "海鮮チャンポンスープは海鮮おこげスープに変更できます", "Có thể đổi canh Jjambbong hải sản sang canh cơm cháy hải sản"),
    tip: T("세트 주문 시 군만두(4개) 20,000", "With a set: fried dumplings (4 pcs) 20,000", "点套餐加煎饺(4个)20,000", "セット注文時 焼き餃子(4個)20,000", "Khi gọi set: há cảo chiên (4 cái) 20.000"),
    items: [
      it(560000, null, T("SET A", "Set A", "套餐 A", "セット A", "Set A"), { desc: T("해물짬뽕탕 + 미니 탕수육", "Seafood jjambbong soup + Mini sweet & sour pork", "海鲜炒码汤 + 迷你糖醋肉", "海鮮チャンポンスープ + ミニ酢豚", "Canh Jjambbong hải sản + Thịt heo sốt chua ngọt (Mini)") }),
      it(700000, null, T("SET B", "Set B", "套餐 B", "セット B", "Set B"), { desc: T("해물짬뽕탕 + 깐풍기 · 고추잡채 · 유린기 중 1", "Seafood jjambbong soup + one of Kkanpoongki · Gochu Japchae · Yurinki", "海鲜炒码汤 + 干烹鸡 · 青椒肉丝 · 油淋鸡 任选1", "海鮮チャンポンスープ + カンプンギ・チンジャオロース・ユーリンチーから1品", "Canh Jjambbong hải sản + 1 món: Gà sốt tỏi ớt · Gochu Japchae · Gà sốt giấm xì dầu") }),
      it(720000, null, T("SET C", "Set C", "套餐 C", "セット C", "Set C"), { desc: T("해물짬뽕탕 + 깐풍새우 · 칠리새우 · 크림새우 중 1", "Seafood jjambbong soup + one of Kkanpoong · Chilli · Cream shrimp", "海鲜炒码汤 + 干烹虾 · 甜辣酱虾 · 奶油虾 任选1", "海鮮チャンポンスープ + カンプンエビ・エビチリ・クリームエビから1品", "Canh Jjambbong hải sản + 1 món: Tôm sốt tỏi ớt · Tôm sốt ớt ngọt · Tôm sốt kem") }),
      it(920000, null, T("SET D", "Set D", "套餐 D", "セット D", "Set D"), { desc: T("해물짬뽕탕 + 미니 탕수육 + 깐풍새우 · 칠리새우 · 크림새우 중 1", "Seafood jjambbong soup + Mini sweet & sour pork + one of Kkanpoong · Chilli · Cream shrimp", "海鲜炒码汤 + 迷你糖醋肉 + 干烹虾 · 甜辣酱虾 · 奶油虾 任选1", "海鮮チャンポンスープ + ミニ酢豚 + カンプンエビ・エビチリ・クリームエビから1品", "Canh Jjambbong hải sản + Thịt heo sốt chua ngọt (Mini) + 1 món tôm: sốt tỏi ớt · sốt ớt ngọt · sốt kem") }),
      it(1260000, null, T("SET E", "Set E", "套餐 E", "セット E", "Set E"), { desc: T("해물짬뽕탕 + 미니 탕수육 + 새우요리 1(깐풍·칠리·크림) + 고추잡채 · 깐풍기 · 유린기 중 1", "Seafood jjambbong soup + Mini sweet & sour pork + 1 shrimp dish (Kkanpoong · Chilli · Cream) + one of Gochu Japchae · Kkanpoongki · Yurinki", "海鲜炒码汤 + 迷你糖醋肉 + 虾类1道(干烹·甜辣酱·奶油)+ 青椒肉丝 · 干烹鸡 · 油淋鸡 任选1", "海鮮チャンポンスープ + ミニ酢豚 + エビ料理1品(カンプン・チリ・クリーム)+ チンジャオロース・カンプンギ・ユーリンチーから1品", "Canh Jjambbong hải sản + Thịt heo sốt chua ngọt (Mini) + 1 món tôm (sốt tỏi ớt · sốt ớt ngọt · sốt kem) + 1 món: Gochu Japchae · Gà sốt tỏi ớt · Gà sốt giấm xì dầu") }),
    ],
  },
  {
    id: "meal-set",
    name: T("식사 세트", "Meal Sets", "套餐", "食事セット", "Set ăn"),
    note: T("🥟 군만두 또는 🍖 미니 탕수육 중 하나를 곁들여요", "Comes with 🥟 fried dumplings or 🍖 mini sweet & sour pork", "可搭配 🥟 煎饺 或 🍖 迷你糖醋肉 其中之一", "🥟 焼き餃子 か 🍖 ミニ酢豚 のどちらかが付きます", "Kèm 🥟 há cảo chiên hoặc 🍖 thịt heo sốt chua ngọt (mini)"),
    items: [
      it(SET2(320000, 320000), null, T("2인: 짜장 + 짜장", "For 2: Jjajang + Jjajang", "2人:炸酱面 + 炸酱面", "2名様:ジャージャー麺 + ジャージャー麺", "2 người: Mì tương đen + Mì tương đen")),
      it(SET2(360000, 360000), null, T("2인: 짜장 + 짬뽕", "For 2: Jjajang + Jjambbong", "2人:炸酱面 + 炒码面", "2名様:ジャージャー麺 + チャンポン", "2 người: Mì tương đen + Mì Jjambbong")),
      it(SET2(400000, 400000), null, T("2인: 짬뽕 + 짬뽕", "For 2: Jjambbong + Jjambbong", "2人:炒码面 + 炒码面", "2名様:チャンポン + チャンポン", "2 người: Mì Jjambbong + Mì Jjambbong")),
      it(SET2(460000, 460000), null, T("2인: 해물쟁반짜장 L", "For 2: Seafood Jjajang Platter L", "2人:海鲜炸酱面拼盘 L", "2名様:海鮮ジャージャー麺大皿 L", "2 người: Đĩa mì tương đen hải sản L")),
      it(SET2(480000, 480000), null, T("2인: 해물쟁반짬뽕 L", "For 2: Seafood Jjambbong Platter L", "2人:海鲜炒码面拼盘 L", "2名様:海鮮チャンポン大皿 L", "2 người: Đĩa mì Jjambbong hải sản L")),
      it([["🥟 4P", 160000], ["🍖 Mini", 300000]], null, T("1인: 짜장", "For 1: Jjajang", "1人:炸酱面", "1名様:ジャージャー麺", "1 người: Mì tương đen")),
      it([["🥟 4P", 200000], ["🍖 Mini", 340000]], null, T("1인: 짬뽕", "For 1: Jjambbong", "1人:炒码面", "1名様:チャンポン", "1 người: Mì Jjambbong")),
      it([["🥟 4P", 200000], ["🍖 Mini", 340000]], null, T("1인: 볶음밥", "For 1: Fried Rice", "1人:炒饭", "1名様:チャーハン", "1 người: Cơm chiên")),
      it([["🥟 4P", 240000], ["🍖 Mini", 380000]], null, T("1인: 불고기잡채밥", "For 1: Bulgogi Japchae Rice", "1人:烤肉杂菜饭", "1名様:プルコギチャプチェご飯", "1 người: Cơm Bulgogi Japchae")),
      it([["🥟 4P", 240000], ["🍖 Mini", 380000]], null, T("1인: 해물쟁반짜장 S", "For 1: Seafood Jjajang Platter S", "1人:海鲜炸酱面拼盘 S", "1名様:海鮮ジャージャー麺大皿 S", "1 người: Đĩa mì tương đen hải sản S")),
      it([["🥟 4P", 250000], ["🍖 Mini", 390000]], null, T("1인: 해물쟁반짬뽕 S", "For 1: Seafood Jjambbong Platter S", "1人:海鲜炒码面拼盘 S", "1名様:海鮮チャンポン大皿 S", "1 người: Đĩa mì Jjambbong hải sản S")),
    ],
  },
  {
    id: "drinks",
    name: T("주류 · 음료", "Drinks", "酒水饮料", "お酒・ドリンク", "Đồ uống"),
    items: [
      it(140000, null, T("진로", "Jinro Soju", "真露烧酒", "眞露(焼酎)", "Soju Jinro")),
      it(140000, null, T("새로", "Saero Soju", "Saero 烧酒", "セロ(焼酎)", "Soju Saero")),
      it(140000, null, T("참이슬", "Chamisul Soju", "Chamisul 烧酒", "チャミスル(焼酎)", "Soju Chamisul")),
      it(140000, null, T("처음처럼", "Chum Churum Soju", "初饮初乐烧酒", "チャムチュルム(焼酎)", "Soju Chum Churum")),
      it([["110ml", 220000], ["250ml", 370000], ["500ml", 670000]], null, T("연태고량주", "Yantai Kaoliang Liquor", "烟台高粱酒", "煙台高粱酒", "Rượu cao lương Yantai")),
      it(150000, null, T("보드카 맨", "Vodka Men", "Vodka Men 伏特加", "ウォッカ・マン", "Vodka Men")),
      it(40000, null, T("타이거 맥주", "Tiger Beer", "虎牌啤酒", "タイガービール", "Bia Tiger")),
      it(30000, null, T("콜라", "Coca-Cola", "可口可乐", "コカ・コーラ", "Coca-Cola")),
      it(30000, null, T("스프라이트", "Sprite", "雪碧", "スプライト", "Sprite")),
      it(30000, null, T("환타", "Fanta", "芬达", "ファンタ", "Fanta")),
      it(15000, null, T("생수 (500ml)", "Water (500ml)", "矿泉水(500ml)", "ミネラルウォーター(500ml)", "Nước suối (500ml)")),
    ],
  },
];
