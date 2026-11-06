// 맛찬들 왕소금구이 Matchandeul BBQ 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진 24장(2026-11-05 수집, 올린 날짜 미상), 가격이 다르면 높은 쪽
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "맛찬들 왕소금구이", en: "Matchandeul BBQ Premium" },
  phone: "0879 927 736",
  address: "CT4 Tòa Nhà Sông Đà, Đ. Mễ Trì, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:00 – 22:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price: price ?? null, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

window.MENU = [
  {
    id: "grill",
    name: T("고기구이", "GRILLED MEATS", "烤肉", "焼肉", "THỊT NƯỚNG"),
    items: [
      it(220000, "samgyeopsal", "숙성 생삼겹살", "Aged Pork Belly (Saeng Samgyeopsal)", "熟成生五花肉", "熟成 生サムギョプサル（豚バラ肉）", "Ba chỉ heo ủ (Saeng Samgyeopsal)", {
        tag: "best",
        desc: T("150g", "150g", "150克", "150g", "150g"),
      }),
      it(220000, null, "숙성 생목살", "Aged Pork Shoulder (Saeng Moksal)", "熟成生猪颈肉", "熟成 生モクサル（豚肩ロース）", "Thịt vai heo ủ (Saeng Moksal)", {
        desc: T("150g", "150g", "150克", "150g", "150g"),
      }),
      it(300000, null, "숙성 항정살", "Aged Pork Jowl (Hangjeongsal)", "熟成猪颈脊肉（项正肉）", "熟成 ハンジョンサル（豚トロ）", "Nọng heo ủ (Hangjeongsal)", {
        desc: T("130g", "130g", "130克", "130g", "130g"),
      }),
      it(600000, null, "숙성 꽃살(진갈비살)", "Aged Beef Rib Cut (Kkotsal / Jin-galbisal)", "熟成花肉（真排骨肉）", "熟成 コッサル（ジンカルビサル）", "Sườn bò ủ (Kkotsal / Jin Galbisal)", {
        desc: T("130g", "130g", "130克", "130g", "130g"),
      }),
      it(450000, null, "양념 LA 소갈비", "Marinated LA Beef Short Ribs (Yangnyeom LA Sogalbi)", "腌制LA牛排骨", "味付け LAカルビ（牛）", "Sườn bò LA tẩm ướp (Yangnyeom LA Sogalbi)", {
        desc: T("250g", "250g", "250克", "250g", "250g"),
      }),
      it(270000, null, "돼지 양념구이", "Marinated Grilled Pork (Dwaeji Yangnyeom-gui)", "腌制烤猪肉", "味付け焼き豚（ヤンニョムグイ）", "Thịt heo nướng tẩm ướp (Dwaeji Yangnyeom-gui)", {
        desc: T("200g · 양념한 돼지고기", "200g · Marinated pork", "200克 · 腌制猪肉", "200g · 味付けした豚肉", "200g · Thịt heo tẩm ướp"),
      }),
    ],
  },
  {
    id: "side",
    name: T("구이 곁들임", "ADD-ONS", "烤肉配菜", "焼肉のお供", "ĐỒ ĂN KÈM"),
    items: [
      it(150000, null, "구워먹는 치즈", "Grilling Cheese (Gu-wo Meokneun Cheese)", "烤着吃的芝士", "焼いて食べるチーズ", "Phô mai nướng (Gu-wo Meokneun Cheese)", {
        desc: T("10조각 · 한국에서 인기인 구워먹는 치즈", "10 pieces · Grilling cheese popular in Korea", "10块 · 在韩国很受欢迎的烤芝士", "10切れ · 韓国で人気の焼いて食べるチーズ", "10 miếng · Phô mai nướng được yêu thích ở Hàn Quốc"),
      }),
      it(180000, null, "버섯모듬", "Assorted Mushrooms (Beoseot Modeum)", "什锦菌菇", "きのこ盛り合わせ", "Nấm thập cẩm (Beoseot Modeum)", {
        desc: T("350g · 건강버섯 5가지: 표고·느타리·팽이·만가닥(흰/노란)·새송이", "350g · 5 kinds: shiitake, oyster, enoki, beech (white / yellow), king oyster", "350克 · 5种健康菌菇：香菇、平菇、金针菇、真姬菇（白/黄）、杏鲍菇", "350g · 5種のきのこ：しいたけ・ひらたけ・えのき・しめじ（白/黄）・エリンギ", "350g · 5 loại nấm: nấm hương, nấm sò, nấm kim châm, nấm ngọc thạch (trắng / vàng), nấm đùi gà"),
      }),
    ],
  },
  {
    id: "lunch",
    name: T("점심특선", "LUNCH SPECIALS", "午餐特惠", "ランチ特選", "SUẤT TRƯA ĐẶC BIỆT"),
    note: T(
      "평일 11:00~15:00 · 토·일·공휴일 제외 · 상품권·기타 할인 불가 · 돌솥밥은 2인분 · 공기밥 무료",
      "Weekdays 11:00–15:00 · Not available on Sat, Sun and public holidays · No vouchers or other discounts · Stone-pot rice serves 2 · Steamed rice is free",
      "工作日 11:00~15:00 · 周六、周日及公共假日除外 · 不可使用代金券及其他优惠 · 石锅饭为2人份 · 米饭免费",
      "平日 11:00～15:00 · 土・日・祝日は除く · 商品券・その他の割引は不可 · 石鍋ご飯は2人前 · ご飯は無料",
      "Ngày thường 11:00–15:00 · Không áp dụng thứ Bảy, Chủ Nhật và ngày lễ · Không dùng phiếu quà tặng và khuyến mãi khác · Cơm nồi đá là 2 phần · Cơm trắng miễn phí",
    ),
    items: [
      it(500000, null, "2인 든든정식", "Hearty Set Meal for 2 (2-In Deundeun Jeongsik)", "2人丰盛套餐", "2人前 たっぷり定食", "Set no bụng cho 2 người (2-In Deundeun Jeongsik)", {
        desc: T(
          "삼겹살 or 목살 2인분(300g) + 찌개 大 1개(김치·된장·청국장 중) + 돌솥밥 1 · 정상가 700,000 → 특가 500,000",
          "Pork belly or pork neck for 2 (300g) + 1 large stew (kimchi, soybean paste or cheonggukjang) + 1 stone-pot rice · Regular 700,000 → Special 500,000",
          "五花肉或猪颈肉2人份（300克）+ 大份汤锅1个（泡菜/大酱/清麴酱任选）+ 石锅饭1份 · 原价 700,000 → 特价 500,000",
          "豚バラ or モクサル2人前（300g）+ チゲ大1つ（キムチ・テンジャン・チョングッチャンから）+ 石鍋ご飯1 · 通常価格 700,000 → 特価 500,000",
          "Ba chỉ hoặc thịt cổ heo 2 phần (300g) + 1 nồi canh lớn (kim chi, tương đậu hoặc cheonggukjang) + 1 cơm nồi đá · Giá gốc 700,000 → Giá đặc biệt 500,000",
        ),
      }),
      it(750000, null, "3인 든든정식", "Hearty Set Meal for 3 (3-In Deundeun Jeongsik)", "3人丰盛套餐", "3人前 たっぷり定食", "Set no bụng cho 3 người (3-In Deundeun Jeongsik)", {
        desc: T(
          "삼겹살 or 목살 3인분(450g) + 찌개 小 2개 + 돌솥밥 2 · 정상가 1,000,000 → 특가 750,000",
          "Pork belly or pork neck for 3 (450g) + 2 small stews + 2 stone-pot rice · Regular 1,000,000 → Special 750,000",
          "五花肉或猪颈肉3人份（450克）+ 小份汤锅2个 + 石锅饭2份 · 原价 1,000,000 → 特价 750,000",
          "豚バラ or モクサル3人前（450g）+ チゲ小2つ + 石鍋ご飯2 · 通常価格 1,000,000 → 特価 750,000",
          "Ba chỉ hoặc thịt cổ heo 3 phần (450g) + 2 nồi canh nhỏ + 2 cơm nồi đá · Giá gốc 1,000,000 → Giá đặc biệt 750,000",
        ),
      }),
      it(1000000, null, "4인 든든정식", "Hearty Set Meal for 4 (4-In Deundeun Jeongsik)", "4人丰盛套餐", "4人前 たっぷり定食", "Set no bụng cho 4 người (4-In Deundeun Jeongsik)", {
        desc: T(
          "삼겹살 or 목살 4인분(600g) + 찌개 大 2개 + 돌솥밥 2 · 정상가 1,400,000 → 특가 1,000,000",
          "Pork belly or pork neck for 4 (600g) + 2 large stews + 2 stone-pot rice · Regular 1,400,000 → Special 1,000,000",
          "五花肉或猪颈肉4人份（600克）+ 大份汤锅2个 + 石锅饭2份 · 原价 1,400,000 → 特价 1,000,000",
          "豚バラ or モクサル4人前（600g）+ チゲ大2つ + 石鍋ご飯2 · 通常価格 1,400,000 → 特価 1,000,000",
          "Ba chỉ hoặc thịt cổ heo 4 phần (600g) + 2 nồi canh lớn + 2 cơm nồi đá · Giá gốc 1,400,000 → Giá đặc biệt 1,000,000",
        ),
      }),
      it(250000, null, "점심 고기냉면 세트", "Lunch Meat & Cold Noodle Set (Jeomsim Gogi Naengmyeon Set)", "午餐烤肉冷面套餐", "ランチ 焼肉冷麺セット", "Set trưa thịt nướng và mì lạnh (Jeomsim Gogi Naengmyeon)", {
        desc: T(
          "삼겹살 or 목살 100g + 물냉면 or 비빔냉면 택1 · 정상가 300,000 → 특가 250,000",
          "Pork belly or pork neck 100g + your choice of water or spicy mixed cold noodles · Regular 300,000 → Special 250,000",
          "五花肉或猪颈肉100克 + 水冷面或拌冷面二选一 · 原价 300,000 → 特价 250,000",
          "豚バラ or モクサル100g + 水冷麺 or ビビン冷麺から選択 · 通常価格 300,000 → 特価 250,000",
          "Ba chỉ hoặc thịt cổ heo 100g + chọn mì lạnh nước hoặc mì lạnh trộn · Giá gốc 300,000 → Giá đặc biệt 250,000",
        ),
      }),
    ],
  },
  {
    id: "stew",
    name: T("찌개 · 탕", "STEWS & SOUPS", "汤锅类", "チゲ・スープ", "CANH & LẨU"),
    note: T("공기밥 1개 포함 (전골 제외)", "Includes 1 bowl of steamed rice (hot pots excluded)", "含米饭1碗（火锅除外）", "ご飯1杯付き（鍋料理は除く）", "Kèm 1 bát cơm trắng (không áp dụng cho lẩu)"),
    items: [
      it(200000, null, "청국장찌개", "Cheonggukjang Stew (Fermented Soybean Stew)", "清麴酱汤", "チョングッチャンチゲ（納豆風味噌鍋）", "Canh đậu tương lên men (Cheonggukjang)"),
      it(null, null, "대왕 갈비탕", "Giant Galbitang (Beef Short Rib Soup)", "特大排骨汤", "特大カルビタン（牛カルビスープ）", "Canh sườn bò cỡ lớn (Galbitang)", { sizes: [["S", 190000], ["L", 380000]] }),
      it(160000, "kimchijjigae", "한국식 김치찌개", "Korean Kimchi Stew (Kimchi-jjigae)", "韩式泡菜汤", "韓国式キムチチゲ", "Canh kim chi kiểu Hàn (Kimchi-jjigae)", { spicy: true }),
      it(160000, null, "한국식 된장찌개", "Korean Soybean Paste Stew (Doenjang-jjigae)", "韩式大酱汤", "韓国式テンジャンチゲ（味噌チゲ）", "Canh tương đậu kiểu Hàn (Doenjang-jjigae)"),
    ],
  },
  {
    id: "hotpot",
    name: T("야식 전골 특선", "LATE-NIGHT HOT POTS", "夜宵火锅特选", "夜食 鍋特選", "LẨU ĂN KHUYA"),
    items: [
      it(600000, null, "삼겹김치전골", "Pork Belly Kimchi Hot Pot (Samgyeop Kimchi Jeongol)", "五花肉泡菜火锅", "豚バラキムチ鍋（チョンゴル）", "Lẩu kim chi ba chỉ (Samgyeop Kimchi Jeongol)", {
        spicy: true,
        desc: T("3~4인분", "3–4 servings", "3~4人份", "3～4人前", "3–4 người ăn"),
      }),
      it(600000, null, "차돌된장전골", "Beef Brisket Soybean Paste Hot Pot (Chadol Doenjang Jeongol)", "牛腩大酱火锅", "牛バラ薄切り味噌鍋（チャドルテンジャン・チョンゴル）", "Lẩu tương đậu bò thái mỏng (Chadol Doenjang Jeongol)", {
        desc: T("3~4인분", "3–4 servings", "3~4人份", "3～4人前", "3–4 người ăn"),
      }),
    ],
  },
  {
    id: "noodle",
    name: T("면류", "NOODLES", "面类", "麺類", "MÓN MÌ"),
    items: [
      it(200000, "kongguksu", "냉 콩국수", "Noodles in Cold Soybean Soup (Naeng Kongguksu)", "冷豆浆面", "冷たい豆乳麺（ネンコングクス）", "Mì nước đậu nành lạnh (Naeng Kongguksu)"),
      it(150000, null, "후식 콩국수(small)", "Dessert-size Cold Soybean Noodles (Small)", "餐后小份冷豆浆面", "食後用 コングクス（小）", "Mì nước đậu nành lạnh (nhỏ, dùng sau bữa ăn)", {
        desc: T("식사 후 먹는 작은 양", "Small portion after the meal", "餐后食用的小份", "食事の後に食べる小さめの量", "Phần nhỏ dùng sau bữa ăn"),
      }),
      it(150000, "bibimnaengmyeon", "비빔 냉면", "Spicy Mixed Cold Noodles (Bibim Naengmyeon)", "辣拌冷面", "ビビン冷麺", "Mì lạnh trộn cay (Bibim Naengmyeon)", { spicy: true }),
      it(100000, null, "후식 비빔 냉면(small)", "Dessert-size Spicy Mixed Cold Noodles (Small)", "餐后小份辣拌冷面", "食後用 ビビン冷麺（小）", "Mì lạnh trộn cay (nhỏ, dùng sau bữa ăn)", {
        spicy: true,
        desc: T("식사 후 먹는 작은 양", "Small portion after the meal", "餐后食用的小份", "食事の後に食べる小さめの量", "Phần nhỏ dùng sau bữa ăn"),
      }),
      it(150000, null, "물 냉면", "Cold Noodles in Broth (Mul Naengmyeon)", "水冷面", "水冷麺（ムルネンミョン）", "Mì lạnh nước (Mul Naengmyeon)"),
      it(100000, null, "후식 물 냉면(small)", "Dessert-size Cold Noodles in Broth (Small)", "餐后小份水冷面", "食後用 水冷麺（小）", "Mì lạnh nước (nhỏ, dùng sau bữa ăn)", {
        desc: T("식사 후 먹는 작은 양", "Small portion after the meal", "餐后食用的小份", "食事の後に食べる小さめの量", "Phần nhỏ dùng sau bữa ăn"),
      }),
    ],
  },
  {
    id: "meal",
    name: T("식사 · 사이드", "RICE & SIDES", "主食与小吃", "ご飯・サイド", "CƠM & MÓN PHỤ"),
    items: [
      it(150000, null, "돌솥비빔밥", "Stone Pot Bibimbap (Dolsot Bibimbap)", "石锅拌饭", "石焼ビビンバ", "Cơm trộn nồi đá (Dolsot Bibimbap)"),
      it(80000, null, "돌솥밥 + 누룽지물", "Stone Pot Rice with Scorched Rice Tea (Dolsotbap + Nurungji-mul)", "石锅饭 + 锅巴水", "石鍋ご飯 + おこげ湯（ヌルンジ）", "Cơm nồi đá + nước cơm cháy (Dolsotbap + Nurungji-mul)", {
        desc: T("식사 20분 전 주문", "Order 20 minutes before your meal", "请在用餐前20分钟点单", "お食事の20分前にご注文ください", "Vui lòng gọi trước bữa ăn 20 phút"),
      }),
      it(120000, null, "계란찜", "Steamed Egg (Gyeranjjim)", "蒸蛋", "韓国式茶碗蒸し（ケランチム）", "Trứng hấp (Gyeranjjim)", {
        desc: T("주문 후 약 15분", "About 15 minutes after ordering", "点单后约需15分钟", "ご注文後 約15分", "Khoảng 15 phút sau khi gọi món"),
      }),
      it(20000, null, "공기밥 추가", "Extra Steamed Rice", "加米饭", "ご飯 追加", "Thêm cơm trắng"),
      it(150000, null, "해물파전", "Seafood Scallion Pancake (Haemul Pajeon)", "海鲜葱饼", "海鮮ネギチヂミ（ヘムルパジョン）", "Bánh xèo hải sản kiểu Hàn (Haemul Pajeon)"),
      it(150000, null, "김치전", "Kimchi Pancake (Kimchijeon)", "泡菜饼", "キムチチヂミ（キムチジョン）", "Bánh kim chi chiên (Kimchijeon)"),
    ],
  },
  {
    id: "drinks",
    name: T("주류 · 음료", "DRINKS", "酒水饮料", "お酒・ドリンク", "ĐỒ UỐNG"),
    items: [
      it(140000, null, "소주", "Soju", "烧酒", "焼酎（ソジュ）", "Rượu Soju"),
      it(55000, null, "Tiger 맥주", "Tiger Beer", "虎牌啤酒", "タイガービール", "Bia Tiger"),
      it(55000, null, "Saigon 맥주", "Saigon Beer", "西贡啤酒", "サイゴンビール", "Bia Saigon"),
      it(180000, null, "생막걸리", "Draft Makgeolli (Saeng Makgeolli)", "生马格利米酒", "生マッコリ", "Rượu gạo Makgeolli tươi (Saeng Makgeolli)"),
      it(130000, null, "보드카", "Vodka", "伏特加", "ウォッカ", "Rượu Vodka"),
      it(22000, null, "코카콜라 · 스프라이트 · 환타", "Coca-Cola / Sprite / Fanta", "可口可乐 / 雪碧 / 芬达", "コカ・コーラ / スプライト / ファンタ", "Coca-Cola / Sprite / Fanta"),
      it(20000, null, "생수", "Bottled Water", "矿泉水", "ミネラルウォーター", "Nước suối"),
      it(50000, null, "홍초", "Hongcho (Red Vinegar Drink)", "红醋饮料（Hongcho）", "ホンチョ（紅酢ドリンク）", "Nước giấm đỏ Hongcho"),
    ],
  },
];
