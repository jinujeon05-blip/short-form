// 꽁시꽁시 恭喜恭喜 Gông Xi Gông Xi (간판 NHÀ HÀNG GÔNG XI GÔNG XI · SINCE 2011 · 63 TT4 Đỗ Đình Thiện, KĐT Mỹ Đình - Sông Đà, Từ Liêm, Hà Nội) 메뉴 데이터 — 한국식 중화요리
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/꽁시꽁시"(사진 수집기 v1.6, 사진 63장) — 메뉴판 사진은 전부 손님이 올린 것(가게 계정 사진 없음).
// 메뉴판이 세 종류라 가격이 서로 다르다(2026-10-23 사용자 선택: **항목별로 섞기**): 짬뽕·면류 = 베트남어 메뉴책(menu_04, 짬뽕 200,000대),
// 짜장·밥·소채·두부·코스 = 한국어·영어 메뉴책(menu_08·11·12·13, 짜장면 110,000), 점심 특선 = 벽 보드(menu_01, 300,000), 추천 요리·짬짜면 = 벽 포스터(menu_06).
// 두 책에 같은 이름이 있으면(짬뽕·우동·울면·삼선우동·삼선특짬뽕·굴짬뽕·홍합짬뽕) 베트남어 책 가격. 날짜 표기가 없어 어느 쪽이 최신인지는 모름 — docs/todo.md.
window.RESTAURANT = {
  brand: { ko: "꽁시꽁시", en: "Gông Xi Gông Xi", branch: { ko: "하노이", en: "Hà Nội" } },
  phone: "0985 691 548",
  address: "63 TT4, P. Đỗ Đình Thiện, KĐT Mỹ Đình - Sông Đà, Từ Liêm, Hà Nội",
  mapQuery: "꽁시꽁시 Gông Xi Gông Xi 63 TT4 Đỗ Đình Thiện Mỹ Đình Sông Đà Từ Liêm Hà Nội",
  mapUrl: "https://www.google.com/maps/place/%EA%BD%81%EC%8B%9C%EA%BD%81%EC%8B%9C/@21.0164804,105.7787601,17z/data=!3m1!4b1!4m6!3m5!1s0x313454aa50a8585d:0x333e4bfbb1efd45d!8m2!3d21.0164804!4d105.7787601!16s%2Fg%2F11g897fp4r!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D",
  wifi: null, // 예: { ssid: "KKONGSI", password: "12345678" }
};

window.MENU = [
  {
    id: "lunch",
    name: {"ko": "점심 특선 세트", "en": "Daily Lunch Set", "zh": "午餐特惠套餐", "ja": "ランチ特選セット", "vi": "Set trưa đặc biệt"},
    note: {"ko": "요일마다 구성이 달라요. 2인 이상 주문할 수 있고, 14:30까지 주문받아요. 세트는 스프 + 요리 3가지 + 짜장 또는 짬뽕이에요.", "en": "The set changes every day. You can order for 2 or more people, and we take orders until 14:30. Each set has soup + 3 dishes + Jjajang or Jjamppong noodles.", "zh": "套餐内容每天不同。2人以上可点,接受点餐到14:30。套餐包含汤 + 3道菜 + 炸酱面或炒码面。", "ja": "メニューは曜日ごとに変わります。2名様以上でご注文いただけます。ご注文は14:30までです。セットは、スープ + 料理3品 + チャジャンミョンまたはチャンポンです。", "vi": "Món trong set thay đổi theo từng ngày. Quý khách gọi từ 2 người trở lên, nhận order đến 14:30. Mỗi set gồm súp + 3 món + mì tương đen hoặc mì hải sản cay."},
    items: [
      {"price": 300000, "name": {"ko": "월요일 점심 특선 세트", "en": "Monday Lunch Special Set", "zh": "周一午餐特惠套餐", "ja": "月曜日ランチ特選セット", "vi": "Set trưa đặc biệt Thứ 2"}, "desc": {"ko": "스프 · 양장피잡채 · 유산슬 · 탕수육+꽃빵 · 짜장 또는 짬뽕", "en": "Soup · Yangjangpi Japchae · Yusanseul · Sweet & Sour Pork + Flower Buns · Jjajang or Jjamppong", "zh": "汤 · 炒杂菜凉拌粉皮 · 溜三丝 · 糖醋肉+花卷 · 炸酱面或炒码面", "ja": "スープ · ヤンジャンピ・チャプチェ · ユサンスル · 酢豚+花巻 · チャジャンミョンまたはチャンポン", "vi": "Súp · Yangjangpi Japchae · Yusanseul · Thịt heo chiên chua ngọt + Bánh hoa cuộn · Mì tương đen hoặc Mì hải sản cay"}},
      {"price": 300000, "name": {"ko": "화요일 점심 특선 세트", "en": "Tuesday Lunch Special Set", "zh": "周二午餐特惠套餐", "ja": "火曜日ランチ特選セット", "vi": "Set trưa đặc biệt Thứ 3"}, "desc": {"ko": "스프 · 유산슬 · 오향마늘 깐풍육 · 고추잡채+꽃빵 · 짜장 또는 짬뽕", "en": "Soup · Yusanseul · Five-Spice Garlic Kkanpung Pork · Pork & Pepper Japchae + Flower Buns · Jjajang or Jjamppong", "zh": "汤 · 溜三丝 · 五香蒜香干烹肉 · 青椒肉丝+花卷 · 炸酱面或炒码面", "ja": "スープ · ユサンスル · 五香ガーリック・カンプン豚 · チンジャオロース+花巻 · チャジャンミョンまたはチャンポン", "vi": "Súp · Yusanseul · Thịt heo chiên sốt tỏi ngũ vị (Kkanpung) · Thịt heo xào ớt + Bánh hoa cuộn · Mì tương đen hoặc Mì hải sản cay"}},
      {"price": 300000, "name": {"ko": "수요일 점심 특선 세트", "en": "Wednesday Lunch Special Set", "zh": "周三午餐特惠套餐", "ja": "水曜日ランチ特選セット", "vi": "Set trưa đặc biệt Thứ 4"}, "desc": {"ko": "스프 · 양장피잡채 · 크림새우 · 사천탕수육+꽃빵 · 짜장 또는 짬뽕", "en": "Soup · Yangjangpi Japchae · Cream Shrimp · Sichuan Sweet & Sour Pork + Flower Buns · Jjajang or Jjamppong", "zh": "汤 · 炒杂菜凉拌粉皮 · 奶油虾 · 四川糖醋肉+花卷 · 炸酱面或炒码面", "ja": "スープ · ヤンジャンピ・チャプチェ · クリームエビ · 四川風酢豚+花巻 · チャジャンミョンまたはチャンポン", "vi": "Súp · Yangjangpi Japchae · Tôm sốt kem · Thịt heo chiên chua ngọt kiểu Tứ Xuyên + Bánh hoa cuộn · Mì tương đen hoặc Mì hải sản cay"}},
      {"price": 300000, "name": {"ko": "목요일 점심 특선 세트", "en": "Thursday Lunch Special Set", "zh": "周四午餐特惠套餐", "ja": "木曜日ランチ特選セット", "vi": "Set trưa đặc biệt Thứ 5"}, "desc": {"ko": "스프 · 유산슬 · 칠리새우 · 고추잡채+꽃빵 · 짜장 또는 짬뽕", "en": "Soup · Yusanseul · Chili Shrimp · Pork & Pepper Japchae + Flower Buns · Jjajang or Jjamppong", "zh": "汤 · 溜三丝 · 辣椒虾 · 青椒肉丝+花卷 · 炸酱面或炒码面", "ja": "スープ · ユサンスル · エビチリ · チンジャオロース+花巻 · チャジャンミョンまたはチャンポン", "vi": "Súp · Yusanseul · Tôm sốt ớt · Thịt heo xào ớt + Bánh hoa cuộn · Mì tương đen hoặc Mì hải sản cay"}},
      {"price": 300000, "name": {"ko": "금요일 점심 특선 세트", "en": "Friday Lunch Special Set", "zh": "周五午餐特惠套餐", "ja": "金曜日ランチ特選セット", "vi": "Set trưa đặc biệt Thứ 6"}, "desc": {"ko": "스프 · 유산슬 · 오향마늘 깐풍기 · 칠리 핫 탕수육+꽃빵 · 짜장 또는 짬뽕", "en": "Soup · Yusanseul · Five-Spice Garlic Kkanpunggi Chicken · Chili Hot Sweet & Sour Pork + Flower Buns · Jjajang or Jjamppong", "zh": "汤 · 溜三丝 · 五香蒜香干烹鸡 · 香辣糖醋肉+花卷 · 炸酱面或炒码面", "ja": "スープ · ユサンスル · 五香ガーリック・カンプンギ(鶏) · 辛口チリ酢豚+花巻 · チャジャンミョンまたはチャンポン", "vi": "Súp · Yusanseul · Gà chiên sốt tỏi ngũ vị (Kkanpunggi) · Thịt heo chiên chua ngọt cay + Bánh hoa cuộn · Mì tương đen hoặc Mì hải sản cay"}},
      {"price": 300000, "name": {"ko": "토·일요일 점심 특선 세트", "en": "Saturday & Sunday Lunch Special Set", "zh": "周六、周日午餐特惠套餐", "ja": "土・日曜日ランチ特選セット", "vi": "Set trưa đặc biệt Thứ 7 - Chủ nhật"}, "desc": {"ko": "스프 · 고추 팔보채 · 유린기 · 탕수육+꽃빵 · 짜장 또는 짬뽕", "en": "Soup · Pepper Palbochae (Eight Treasures Stir-fry) · Yurinki · Sweet & Sour Pork + Flower Buns · Jjajang or Jjamppong", "zh": "汤 · 辣椒八宝菜 · 油淋鸡 · 糖醋肉+花卷 · 炸酱面或炒码面", "ja": "スープ · 唐辛子入り八宝菜 · ユーリンギ(油淋鶏) · 酢豚+花巻 · チャジャンミョンまたはチャンポン", "vi": "Súp · Palbochae ớt (hải sản xào thập cẩm) · Gà chiên sốt hành giấm (Yurinki) · Thịt heo chiên chua ngọt + Bánh hoa cuộn · Mì tương đen hoặc Mì hải sản cay"}},
    ],
  },
  {
    id: "course",
    name: {"ko": "코스 · 추천 요리", "en": "Course Meals & Recommended Dishes", "zh": "套餐 · 推荐菜", "ja": "コース・おすすめ料理", "vi": "Set menu · Món đề xuất"},
    note: {"ko": "코스는 3~4인 기준이에요. 추천 요리는 사진 속 12가지 중에서 골라요.", "en": "Courses are for 3 to 4 people. Pick your recommended dishes from the 12 dishes in the photo.", "zh": "套餐适合3~4人享用。推荐菜请从照片中的12道菜里选择。", "ja": "コースは3~4名様向けです。おすすめ料理は、写真の12品からお選びください。", "vi": "Set menu dành cho 3~4 người. Món đề xuất được chọn trong 12 món có trong ảnh."},
    items: [
      {"price": 2200000, "unit": {"ko": "3~4인", "en": "3–4 people", "zh": "3~4人", "ja": "3〜4人前", "vi": "3–4 người"}, "name": {"ko": "행복상", "en": "Haengbok-sang Course (Happiness)", "zh": "幸福套餐", "ja": "幸福コース(ヘンボクサン)", "vi": "Set Hạnh Phúc (Haengbok-sang)"}, "desc": {"ko": "스프 · 전가복 · 새우요리 · 탕수육 · 고추잡채 · 꽃빵 · 식사 · 후식", "en": "Soup · Jeongabok (Seafood Stew) · Shrimp Dish · Sweet & Sour Pork · Pork & Pepper Japchae · Flower Buns · Meal · Dessert", "zh": "汤 · 全家福 · 虾料理 · 糖醋肉 · 青椒肉丝 · 花卷 · 主食 · 甜点", "ja": "スープ · 全家福(海鮮の煮込み) · エビ料理 · 酢豚 · チンジャオロース · 花巻 · お食事 · デザート", "vi": "Súp · Jeongabok (hải sản hầm thập cẩm) · Món tôm · Thịt heo chiên chua ngọt · Thịt heo xào ớt · Bánh hoa cuộn · Món chính · Tráng miệng"}},
      {"price": 1600000, "unit": {"ko": "3~4인", "en": "3–4 people", "zh": "3~4人", "ja": "3〜4人前", "vi": "3–4 người"}, "name": {"ko": "화목상", "en": "Hwamok-sang Course (Harmony)", "zh": "和睦套餐", "ja": "和睦コース(ファモクサン)", "vi": "Set Hòa Thuận (Hwamok-sang)"}, "desc": {"ko": "스프 · 양장피 · 새우요리 · 탕수육 · 고추잡채 · 꽃빵 · 식사 · 후식", "en": "Soup · Yangjangpi · Shrimp Dish · Sweet & Sour Pork · Pork & Pepper Japchae · Flower Buns · Meal · Dessert", "zh": "汤 · 凉拌粉皮 · 虾料理 · 糖醋肉 · 青椒肉丝 · 花卷 · 主食 · 甜点", "ja": "スープ · ヤンジャンピ · エビ料理 · 酢豚 · チンジャオロース · 花巻 · お食事 · デザート", "vi": "Súp · Yangjangpi · Món tôm · Thịt heo chiên chua ngọt · Thịt heo xào ớt · Bánh hoa cuộn · Món chính · Tráng miệng"}},
      {"price": 1200000, "unit": {"ko": "3~4인", "en": "3–4 people", "zh": "3~4人", "ja": "3〜4人前", "vi": "3–4 người"}, "name": {"ko": "단런상", "en": "Danreon-sang Course", "zh": "单伦套餐(Danreon-sang)", "ja": "ダンリョンサンコース", "vi": "Set Danreon-sang"}, "desc": {"ko": "스프 · 양장피 · 팔보채 · 탕수육 · 식사 · 후식", "en": "Soup · Yangjangpi · Palbochae (Eight Treasures Stir-fry) · Sweet & Sour Pork · Meal · Dessert", "zh": "汤 · 凉拌粉皮 · 八宝菜 · 糖醋肉 · 主食 · 甜点", "ja": "スープ · ヤンジャンピ · 八宝菜 · 酢豚 · お食事 · デザート", "vi": "Súp · Yangjangpi · Palbochae (hải sản xào thập cẩm) · Thịt heo chiên chua ngọt · Món chính · Tráng miệng"}},
      {"price": 700000, "name": {"ko": "추천 요리 2가지", "en": "Recommended Dishes: Pick 2", "zh": "推荐菜 任选2道", "ja": "おすすめ料理 2品", "vi": "Món đề xuất: chọn 2 món"}, "desc": {"ko": "양장피 · 탕수육 · 유산슬 · 크림중새우 · 찹쌀탕수육 · 칠리중새우 · 사천탕수육 · 고추잡채 · 깐풍기 · 마파두부 · 세가지냉채 · 라조기 중 2가지", "en": "Yangjangpi · Sweet & Sour Pork · Yusanseul · Cream Medium Shrimp · Glutinous Rice Sweet & Sour Pork · Chili Medium Shrimp · Sichuan Sweet & Sour Pork · Pork & Pepper Japchae · Kkanpunggi · Mapo Tofu · Three-Kind Cold Appetizer · Lajogi, pick 2", "zh": "凉拌粉皮 · 糖醋肉 · 溜三丝 · 奶油中虾 · 糯米糖醋肉 · 辣椒中虾 · 四川糖醋肉 · 青椒肉丝 · 干烹鸡 · 麻婆豆腐 · 三鲜冷盘 · 辣子鸡,任选2道", "ja": "ヤンジャンピ · 酢豚 · ユサンスル · クリーム中エビ · もち米酢豚 · エビチリ(中エビ) · 四川風酢豚 · チンジャオロース · カンプンギ · 麻婆豆腐 · 三種の冷菜 · ラージャオジー、から2品", "vi": "Yangjangpi · Thịt heo chiên chua ngọt · Yusanseul · Tôm cỡ vừa sốt kem · Thịt heo chiên bột nếp chua ngọt · Tôm cỡ vừa sốt ớt · Thịt heo chiên chua ngọt kiểu Tứ Xuyên · Thịt heo xào ớt · Kkanpunggi · Đậu phụ Mapo · Gỏi lạnh ba loại · Lajogi, chọn 2 món"}},
      {"price": 1000000, "name": {"ko": "추천 요리 3가지", "en": "Recommended Dishes: Pick 3", "zh": "推荐菜 任选3道", "ja": "おすすめ料理 3品", "vi": "Món đề xuất: chọn 3 món"}, "desc": {"ko": "양장피 · 탕수육 · 유산슬 · 크림중새우 · 찹쌀탕수육 · 칠리중새우 · 사천탕수육 · 고추잡채 · 깐풍기 · 마파두부 · 세가지냉채 · 라조기 중 3가지", "en": "Yangjangpi · Sweet & Sour Pork · Yusanseul · Cream Medium Shrimp · Glutinous Rice Sweet & Sour Pork · Chili Medium Shrimp · Sichuan Sweet & Sour Pork · Pork & Pepper Japchae · Kkanpunggi · Mapo Tofu · Three-Kind Cold Appetizer · Lajogi, pick 3", "zh": "凉拌粉皮 · 糖醋肉 · 溜三丝 · 奶油中虾 · 糯米糖醋肉 · 辣椒中虾 · 四川糖醋肉 · 青椒肉丝 · 干烹鸡 · 麻婆豆腐 · 三鲜冷盘 · 辣子鸡,任选3道", "ja": "ヤンジャンピ · 酢豚 · ユサンスル · クリーム中エビ · もち米酢豚 · エビチリ(中エビ) · 四川風酢豚 · チンジャオロース · カンプンギ · 麻婆豆腐 · 三種の冷菜 · ラージャオジー、から3品", "vi": "Yangjangpi · Thịt heo chiên chua ngọt · Yusanseul · Tôm cỡ vừa sốt kem · Thịt heo chiên bột nếp chua ngọt · Tôm cỡ vừa sốt ớt · Thịt heo chiên chua ngọt kiểu Tứ Xuyên · Thịt heo xào ớt · Kkanpunggi · Đậu phụ Mapo · Gỏi lạnh ba loại · Lajogi, chọn 3 món"}},
    ],
  },
  {
    id: "jjajang",
    name: {"ko": "짜장 · 짬짜면", "en": "Jjajang & Combo Bowls", "zh": "炸酱面 · 双拼面", "ja": "チャジャンミョン・ハーフ&ハーフ", "vi": "Mì tương đen · Combo"},
    items: [
      {"price": 110000, "photo": "img/jjajangmyeon.jpg", "name": {"ko": "짜장면", "en": "Black Bean Sauce Noodles (Jjajangmyeon)", "zh": "韩式炸酱面", "ja": "チャジャンミョン(韓国式ジャージャー麺)", "vi": "Mì tương đen (Jjajangmyeon)"}},
      {"price": 170000, "name": {"ko": "유니 짜장면", "en": "Black Bean Sauce Noodles with Pork", "zh": "肉末炸酱面(Yuni)", "ja": "ユニチャジャンミョン(細かい豚ひき肉)", "vi": "Mì tương đen thịt băm (Yuni)"}},
      {"price": 170000, "spicy": true, "name": {"ko": "사천 짜장면", "en": "Szechuan-style Black Bean Sauce Noodles", "zh": "四川炸酱面", "ja": "四川風チャジャンミョン", "vi": "Mì tương đen kiểu Tứ Xuyên"}},
      {"price": 170000, "name": {"ko": "삼선 간짜장", "en": "Fried Black Bean Sauce Noodles with Three Kinds of Seafood", "zh": "三鲜干炸酱面", "ja": "三鮮カンジャジャン(炒めチャジャンミョン)", "vi": "Mì tương đen xào khô hải sản (Ganjjajang)"}},
      {"price": 180000, "name": {"ko": "쇠고기 짜장면", "en": "Black Bean Sauce Noodles with Beef", "zh": "牛肉炸酱面", "ja": "牛肉チャジャンミョン", "vi": "Mì tương đen thịt bò"}},
      {"price": 350000, "unit": {"ko": "2~3인", "en": "2–3 people", "zh": "2~3人", "ja": "2〜3人前", "vi": "2–3 người"}, "name": {"ko": "쟁반해물짜장", "en": "Seafood Black Bean Sauce Noodles (Platter)", "zh": "海鲜炸酱面(大盘)", "ja": "海鮮チャジャンミョン(大皿)", "vi": "Mì tương đen hải sản (đĩa lớn)"}},
      {"price": 200000, "name": {"ko": "탕짜면", "en": "Sweet & Sour Pork + Jjajangmyeon Combo", "zh": "糖醋肉+炸酱面套餐", "ja": "酢豚+チャジャンミョンセット", "vi": "Combo thịt heo chiên chua ngọt + Mì tương đen"}},
      {"price": 200000, "name": {"ko": "탕짬면", "en": "Sweet & Sour Pork + Jjamppong Combo", "zh": "糖醋肉+炒码面套餐", "ja": "酢豚+チャンポンセット", "vi": "Combo thịt heo chiên chua ngọt + Mì hải sản cay"}},
      {"price": 200000, "name": {"ko": "탕볶밥", "en": "Sweet & Sour Pork + Fried Rice Combo", "zh": "糖醋肉+炒饭套餐", "ja": "酢豚+チャーハンセット", "vi": "Combo thịt heo chiên chua ngọt + Cơm chiên"}},
      {"price": 180000, "name": {"ko": "볶짜면", "en": "Fried Rice + Jjajangmyeon Combo", "zh": "炒饭+炸酱面套餐", "ja": "チャーハン+チャジャンミョンセット", "vi": "Combo Cơm chiên + Mì tương đen"}},
      {"price": 180000, "name": {"ko": "볶짬면", "en": "Fried Rice + Jjamppong Combo", "zh": "炒饭+炒码面套餐", "ja": "チャーハン+チャンポンセット", "vi": "Combo Cơm chiên + Mì hải sản cay"}},
      {"price": 180000, "photo": "img/jjamjjamyeon.jpg", "name": {"ko": "짬짜면", "en": "Jjamppong + Jjajangmyeon Half & Half", "zh": "炒码面+炸酱面 双拼(各半)", "ja": "チャンポン+チャジャンミョン ハーフ&ハーフ", "vi": "Nửa Mì hải sản cay + nửa Mì tương đen (Jjamjja-myeon)"}},
    ],
  },
  {
    id: "noodle",
    name: {"ko": "짬뽕 · 면류", "en": "Jjamppong & Noodles", "zh": "炒码面 · 面类", "ja": "チャンポン・麺類", "vi": "Mì cay · Mì nước"},
    items: [
      {"price": 220000, "spicy": true, "name": {"ko": "굴짬뽕", "en": "Oyster Spicy Noodle Soup", "zh": "牡蛎炒码面", "ja": "カキチャンポン", "vi": "Mỳ Cay Nấu Con Hàu"}},
      {"price": 210000, "spicy": true, "name": {"ko": "홍합짬뽕", "en": "Mussel Spicy Noodle Soup", "zh": "淡菜炒码面", "ja": "ムール貝チャンポン", "vi": "Mỳ Cay Nấu Con Vẹm"}},
      {"price": 200000, "name": {"ko": "삼선우동", "en": "Three-Seafood Udon (not spicy)", "zh": "三鲜乌冬面(不辣)", "ja": "三鮮うどん(辛くない)", "vi": "Mỳ Nước Nhiều Hải Sản Không Cay"}},
      {"price": 200000, "spicy": true, "name": {"ko": "삼선특짬뽕", "en": "Special Spicy Seafood Noodle Soup", "zh": "特制三鲜炒码面", "ja": "特製三鮮チャンポン", "vi": "Mỳ Cay Nhiều Hải Sản"}},
      {"price": 400000, "unit": {"ko": "2~3인", "en": "2–3 people", "zh": "2~3人", "ja": "2〜3人前", "vi": "2–3 người"}, "spicy": true, "name": {"ko": "쟁반해물짬뽕", "en": "Seafood Jjamppong Platter (Stir-fried)", "zh": "海鲜干炒码面(大盘)", "ja": "海鮮チャンポン大皿(炒め)", "vi": "Mỳ Xào Hải Sản Cay"}},
      {"price": 200000, "spicy": true, "name": {"ko": "우삼짬뽕", "en": "Beef Brisket Spicy Noodle Soup", "zh": "牛五花炒码面", "ja": "牛バラ肉チャンポン", "vi": "Mỳ Cay Nấu Thịt Bò"}},
      {"price": 220000, "spicy": true, "name": {"ko": "통쭈꾸미짬뽕", "en": "Whole Baby Octopus Spicy Noodle Soup", "zh": "整只小章鱼炒码面", "ja": "丸ごとイイダコチャンポン", "vi": "Mỳ Cay Nấu Con Bạch Tuộc"}},
      {"price": 200000, "spicy": true, "name": {"ko": "통오징어짬뽕", "en": "Whole Squid Spicy Noodle Soup", "zh": "整只鱿鱼炒码面", "ja": "丸ごとイカチャンポン", "vi": "Mỳ Cay Nấu Con Mực"}},
      {"price": 220000, "spicy": true, "name": {"ko": "육해공짬뽕", "en": "Land, Sea & Air Spicy Noodle Soup (Seafood, Beef, Chicken)", "zh": "海陆空炒码面(海鲜、牛肉、鸡肉)", "ja": "海陸空チャンポン(海鮮・牛肉・鶏肉)", "vi": "Mỳ Cay Hải Sản, Thịt Bò, Gà"}},
      {"price": 200000, "spicy": true, "name": {"ko": "불타는짬뽕", "en": "Fiery Hot Seafood Noodles", "zh": "火辣海鲜炒码面", "ja": "燃える激辛海鮮チャンポン", "vi": "Mỳ Hải Sản Siêu Cay"}},
      {"price": 160000, "spicy": true, "name": {"ko": "짬뽕", "en": "Spicy Seafood Noodle Soup (Jjamppong)", "zh": "炒码面(辣海鲜汤面)", "ja": "チャンポン(辛い海鮮スープ麺)", "vi": "Mỳ Cay Hải Sản"}},
      {"price": 160000, "name": {"ko": "우동", "en": "Seafood Udon (not spicy)", "zh": "海鲜乌冬面(不辣)", "ja": "海鮮うどん(辛くない)", "vi": "Mỳ Nước Hải Sản Không Cay"}},
      {"price": 160000, "name": {"ko": "울면", "en": "Thick-Broth Noodles (Ulmyeon)", "zh": "打卤面(Ulmyeon)", "ja": "ウルミョン(とろみスープ麺)", "vi": "Mỳ Súp"}},
      {"price": 200000, "name": {"ko": "크림짬뽕", "en": "Creamy Spicy Noodle Soup", "zh": "奶油炒码面", "ja": "クリームチャンポン", "vi": "Mỳ Cay Cream"}},
      {"price": 200000, "name": {"ko": "매생이탕면", "en": "Maesaengi (Fine Seaweed) Noodle Soup", "zh": "海藻汤面(Maesaengi)", "ja": "マエセンイ(細い海藻)スープ麺", "vi": "Mỳ Nấu Rong Biển"}},
      {"price": 200000, "spicy": true, "name": {"ko": "마라짬뽕", "en": "Mala Spicy Noodle Soup", "zh": "麻辣炒码面(汤)", "ja": "マーラーチャンポン", "vi": "Mỳ Nước Cay Gia Vị Trung Quốc"}},
      {"price": 200000, "spicy": true, "name": {"ko": "마라볶음짬뽕", "en": "Mala Stir-fried Jjamppong", "zh": "麻辣干炒码面", "ja": "マーラー炒めチャンポン", "vi": "Mỳ xào cay gia vị Trung Quốc"}},
      {"price": 220000, "name": {"ko": "샥스핀 탕면", "en": "Shark's Fin Noodle Soup", "zh": "鱼翅汤面", "ja": "フカヒレ入りスープ麺", "vi": "Mì súp vi cá mập"}},
      {"price": 200000, "name": {"ko": "진시황 중식냉면", "en": "Chinese-style Cold Noodles (Qin Shi Huang)", "zh": "秦始皇中式冷面", "ja": "秦始皇の中華冷麺", "vi": "Mỳ Lạnh Trung Quốc"}},
      {"price": 200000, "spicy": true, "name": {"ko": "냉짬뽕", "en": "Cold Spicy Seafood Noodles", "zh": "冷炒码面", "ja": "冷やしチャンポン", "vi": "Mỳ Lạnh Cay"}},
      {"price": 170000, "name": {"ko": "콩국수", "en": "Cold Soybean Noodle Soup (Kongguksu)", "zh": "豆浆冷面", "ja": "コングクス(冷たい豆乳麺)", "vi": "Mỳ Nước Đậu"}},
    ],
  },
  {
    id: "rice",
    name: {"ko": "밥류", "en": "Rice Dishes", "zh": "饭类", "ja": "ご飯類", "vi": "Cơm"},
    items: [
      {"price": 130000, "name": {"ko": "볶음밥", "en": "Fried Rice", "zh": "炒饭", "ja": "チャーハン", "vi": "Cơm chiên"}},
      {"price": 140000, "spicy": true, "name": {"ko": "짬뽕밥", "en": "Rice with Spicy Jjamppong Soup", "zh": "炒码汤饭", "ja": "チャンポンご飯", "vi": "Cơm súp hải sản cay (Jjamppong-bap)"}},
      {"price": 160000, "name": {"ko": "새우볶음밥", "en": "Shrimp Fried Rice", "zh": "虾仁炒饭", "ja": "エビチャーハン", "vi": "Cơm chiên tôm"}},
      {"price": 160000, "name": {"ko": "삼선 볶음밥", "en": "Fried Rice with Three Kinds of Seafood", "zh": "三鲜炒饭", "ja": "三鮮チャーハン", "vi": "Cơm chiên hải sản"}},
      {"price": 170000, "photo": "img/japchae-bap.jpg", "name": {"ko": "잡채밥", "en": "Japchae Rice", "zh": "杂菜盖饭", "ja": "ジャプチェ丼(中華風)", "vi": "Cơm thịt xào rau (Japchae-bap)"}},
      {"price": 170000, "spicy": true, "name": {"ko": "마파두부밥", "en": "Braised Bean Curd Rice with Chili Sauce (Mapo Tofu Rice)", "zh": "麻婆豆腐盖饭", "ja": "麻婆豆腐丼", "vi": "Cơm đậu phụ Mapo"}},
      {"price": 170000, "name": {"ko": "양송이덮밥", "en": "Rice Topped with Mushrooms", "zh": "口蘑盖饭", "ja": "マッシュルーム丼", "vi": "Cơm chan nấm mỡ"}},
      {"price": 220000, "name": {"ko": "유산슬 덮밥", "en": "Rice Topped with Stir-fried Seafood & Vegetables", "zh": "溜三丝盖饭", "ja": "ユサンスル丼", "vi": "Cơm chan Yusanseul (hải sản xào rau)"}},
      {"price": 220000, "name": {"ko": "잡탕밥", "en": "Rice Mixed with Seafood & Vegetables", "zh": "海鲜杂烩饭", "ja": "五目海鮮あんかけご飯", "vi": "Cơm hải sản thập cẩm"}},
      {"name": {"ko": "자연송이 덮밥", "en": "Rice Topped with Pine Mushrooms", "zh": "天然松茸盖饭", "ja": "天然松茸丼", "vi": "Cơm chan nấm tùng nhung tự nhiên"}},
    ],
  },
  {
    id: "veg",
    name: {"ko": "소채 · 두부 요리", "en": "Vegetables & Tofu", "zh": "蔬菜 · 豆腐类", "ja": "野菜・豆腐料理", "vi": "Rau · Đậu phụ"},
    items: [
      {"sizes": [[{"ko": "작은 양", "en": "Smaller portion", "zh": "小份", "ja": "小盛り", "vi": "Phần nhỏ"}, 350000], [{"ko": "큰 양", "en": "Larger portion", "zh": "大份", "ja": "大盛り", "vi": "Phần lớn"}, 550000]], "name": {"ko": "굴소스 청경채", "en": "Chinese Green Vegetables with Oyster Sauce", "zh": "蚝油青江菜", "ja": "青梗菜のオイスターソース炒め", "vi": "Cải thìa sốt dầu hào"}},
      {"sizes": [[{"ko": "작은 양", "en": "Smaller portion", "zh": "小份", "ja": "小盛り", "vi": "Phần nhỏ"}, 500000], [{"ko": "큰 양", "en": "Larger portion", "zh": "大份", "ja": "大盛り", "vi": "Phần lớn"}, 700000]], "name": {"ko": "고추잡채 (꽃빵)", "en": "Pork & Pepper Japchae with Chinese Flower Buns", "zh": "青椒肉丝(配花卷)", "ja": "チンジャオロース(花巻付き)", "vi": "Thịt heo xào ớt (kèm bánh hoa cuộn)"}},
      {"spicy": true, "sizes": [[{"ko": "작은 양", "en": "Smaller portion", "zh": "小份", "ja": "小盛り", "vi": "Phần nhỏ"}, 350000], [{"ko": "큰 양", "en": "Larger portion", "zh": "大份", "ja": "大盛り", "vi": "Phần lớn"}, 550000]], "name": {"ko": "마파두부", "en": "Braised Bean Curd with Chili Sauce (Mapo Tofu)", "zh": "麻婆豆腐", "ja": "麻婆豆腐", "vi": "Đậu phụ Mapo"}},
      {"sizes": [[{"ko": "작은 양", "en": "Smaller portion", "zh": "小份", "ja": "小盛り", "vi": "Phần nhỏ"}, 350000], [{"ko": "큰 양", "en": "Larger portion", "zh": "大份", "ja": "大盛り", "vi": "Phần lớn"}, 550000]], "name": {"ko": "가상 두부", "en": "Bean Curd with Bean Sauce", "zh": "家常豆腐", "ja": "家常豆腐(ジャーチャンドウフ)", "vi": "Đậu phụ sốt tương (Gasang)"}},
    ],
  },
];
