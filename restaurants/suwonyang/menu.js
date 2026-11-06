// 수원 양갈비 구이(SUWON Đùi Cừu Nướng) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음). 출처: 구글 지도에 올라온 메뉴판 사진(2026-11-06 수집). 같은 메뉴가 사진마다 다르면 높은 쪽 가격(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "수원 양갈비 구이", en: "SUWON Đùi Cừu Nướng" },
  phone: "0922931212",
  address: "223 Nguyễn Cao, Kinh Bắc, Bắc Ninh",
  wifi: null,
  hours: "11:00 – 14:00 · 16:00 – 23:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "lamb",
    name: T("양고기 구이", "Grilled Lamb", "烤羊肉", "羊肉の炭火焼き", "Cừu nướng"),
    items: [
      it([["1.5kg", 1489000], ["1.8kg", 1750000]], "lambleg", T("양다리", "Whole Lamb Leg", "羊腿", "羊もも肉(骨付き)", "Đùi cừu"), { tag: "best" }),
      it([["100g", 100000], ["300g", 250000]], null, T("슬라이스 양다리", "Sliced Lamb Leg", "羊腿切片", "羊もも肉スライス", "Đùi cừu cắt lát")),
      it([["250g", 350000]], "lambribs", T("고급 양갈비", "Premium Lamb Ribs", "精品羊排", "上質ラムリブ", "Sườn cừu cao cấp"), { tag: "must" }),
      it([["8꼬치", 180000], ["10꼬치", 225000]], "skewers", T("양꼬치", "Lamb Skewers", "羊肉串", "羊串", "Thịt cừu xiên"), { tag: "best" }),
    ],
  },
  {
    id: "dish",
    name: T("요리", "Dishes", "热菜", "料理", "Món xào · chiên"),
    items: [
      it(270000, null, T("경장육슬", "Shredded Pork in Sweet Bean Sauce (Jingjiangrousi)", "京酱肉丝", "京醤肉絲(豚肉の甘味噌炒め)", "Thịt heo xào sốt tương")),
      it(250000, null, T("향라새우", "Spicy Stir-fried Shrimp", "香辣虾", "香辣エビ(エビの辛炒め)", "Tôm xào cay"), { spicy: true }),
      it(220000, null, T("향라가지", "Spicy Stir-fried Eggplant", "香辣茄子", "香辣ナス(ナスの辛炒め)", "Cà tím xào cay"), { spicy: true }),
      it(270000, null, T("꿔바로우", "Crispy Sweet & Sour Pork (Guobaorou)", "锅包肉", "鍋包肉(中華風酢豚)", "Thịt heo chiên sốt chua ngọt")),
    ],
  },
  {
    id: "cold",
    name: T("냉채 · 무침", "Cold Dishes", "凉菜", "冷菜・和え物", "Món nguội · trộn"),
    items: [
      it(120000, null, T("유포건두부", "Dried Tofu Strips in Chili Oil", "红油干豆腐丝", "干し豆腐の辣油和え", "Đậu phụ khô trộn dầu ớt"), { spicy: true }),
      it(100000, null, T("건두부무침", "Dried Tofu Strip Salad", "凉拌干豆腐丝", "干し豆腐のサラダ", "Đậu phụ khô trộn rau")),
      it(80000, null, T("송화단", "Century Egg", "皮蛋", "ピータン", "Trứng bắc thảo")),
      it(60000, null, T("오이무침", "Garlic Smashed Cucumber", "蒜蓉拍黄瓜", "叩きキュウリのニンニク和え", "Dưa chuột trộn tỏi")),
      it(50000, null, T("겨자 목이버섯무침", "Wood Ear Mushroom with Mustard", "芥末木耳", "キクラゲのからし和え", "Nấm mộc nhĩ mù tạt")),
    ],
  },
  {
    id: "meal",
    name: T("식사 · 면", "Rice & Noodles", "主食 · 面", "ご飯・麺", "Cơm · Mì"),
    items: [
      it(60000, null, T("계란볶음밥", "Egg Fried Rice", "蛋炒饭", "卵チャーハン", "Cơm rang trứng")),
      it(70000, null, T("가지볶음밥", "Eggplant Fried Rice", "茄子炒饭", "ナスのチャーハン", "Cơm rang cà tím")),
      it(120000, "naengmyeon", T("냉면", "Cold Noodles (Naengmyeon)", "冷面", "冷麺", "Mì lạnh")),
      it(90000, null, T("온면", "Warm Noodle Soup (Onmyeon)", "热汤面", "温麺(温かい麺)", "Mì nóng")),
      it(68000, null, T("매운 한국 라면", "Korean Spicy Ramen", "韩式辣拉面", "韓国式辛ラーメン", "Mì cay Hàn Quốc"), { spicy: true }),
      it(10000, null, T("공기밥", "Steamed Rice", "米饭", "ご飯", "Cơm trắng")),
    ],
  },
  {
    id: "side",
    name: T("사이드 · 만두", "Sides & Dumplings", "配菜 · 饺子", "サイド・餃子", "Món ăn kèm · Sủi cảo"),
    items: [
      it(55000, null, T("물만두", "Boiled Dumplings", "水饺", "水餃子", "Sủi cảo luộc")),
      it(58000, null, T("만두튀김", "Fried Dumplings", "煎饺", "揚げ餃子", "Sủi cảo chiên")),
      it(48000, null, T("찐빵", "Steamed Buns", "蒸包子", "蒸しパン(包子)", "Bánh bao hấp")),
      it(35000, null, T("부추구이", "Grilled Chives", "烤韭菜", "ニラ焼き", "Hẹ nướng")),
      it(15000, null, T("마늘구이", "Grilled Garlic", "烤大蒜", "ニンニク焼き", "Tỏi nướng")),
    ],
  },
  {
    id: "set",
    name: T("세트 · 콤보", "Sets & Combos", "套餐 · 组合", "セット・コンボ", "Set · Combo"),
    note: T("점심 세트는 점심 시간대 메뉴예요.", "Lunch sets are served at lunchtime.", "午餐套餐为午市供应。", "ランチセットはランチタイムのメニューです。", "Set ăn trưa phục vụ vào giờ trưa."),
    items: [
      it(295000, null, T("점심 세트 1", "Lunch Set 1", "午餐套餐 1", "ランチセット1", "Set ăn trưa 1"), { desc: T("양꼬치 6꼬치 + 면 2그릇(땡초라면·온면·냉면 중 선택)", "6 lamb skewers + 2 noodles of your choice (spicy ramen · warm · cold)", "羊肉串6串 + 自选汤面2碗(辣拉面/热汤面/冷面)", "羊串6本 + 麺2人前(辛ラーメン・温麺・冷麺から選択)", "6 xiên cừu + 2 mỳ tùy chọn (mỳ cay · mỳ nóng · mỳ lạnh)") }),
      it(315000, null, T("점심 세트 2", "Lunch Set 2", "午餐套餐 2", "ランチセット2", "Set ăn trưa 2"), { desc: T("소갈비살 + 면 2그릇(땡초라면·온면·냉면 중 선택)", "Beef rib finger meat + 2 noodles of your choice (spicy ramen · warm · cold)", "牛肋条肉 + 自选汤面2碗(辣拉面/热汤面/冷面)", "牛カルビ身 + 麺2人前(辛ラーメン・温麺・冷麺から選択)", "Thịt dẻ sườn bò + 2 mỳ tùy chọn (mỳ cay · mỳ nóng · mỳ lạnh)") }),
      it(390000, null, T("콤보 1", "Combo 1", "组合套餐 1", "コンボ1", "Combo 1"), { desc: T("슬라이스 양다리 300g + 양꼬치 4꼬치 + 오이무침 + 볶음밥", "Sliced lamb leg 300g + 4 lamb skewers + cucumber salad + fried rice", "羊腿切片300克 + 羊肉串4串 + 蒜蓉拍黄瓜 + 蛋炒饭", "羊もも肉スライス300g + 羊串4本 + キュウリ和え + チャーハン", "Đùi cừu cắt lát 300g + 4 xiên cừu + dưa chuột trộn tỏi + cơm rang") }),
      it(1545000, null, T("콤보 2", "Combo 2", "组合套餐 2", "コンボ2", "Combo 2"), { desc: T("양다리 1.5kg + 오이무침 + 건두부무침", "Whole lamb leg 1.5kg + cucumber salad + dried tofu salad", "羊腿1.5公斤 + 蒜蓉拍黄瓜 + 凉拌干豆腐丝", "羊もも肉1.5kg + キュウリ和え + 干し豆腐サラダ", "Đùi cừu 1.5kg + dưa chuột trộn tỏi + đậu phụ khô trộn rau") }),
      it(null, null, T("콤보 3", "Combo 3", "组合套餐 3", "コンボ3", "Combo 3"), { desc: T("우대갈비 1대 + 갈비살 150g + 냉면 + 물만두 (가격은 메뉴판에 없어 매장에 문의)", "Beef short rib (1 piece) + rib finger meat 150g + cold noodles + boiled dumplings (price not shown on the menu — please ask the restaurant)", "牛仔骨1块 + 牛肋条肉150克 + 冷面 + 水饺(菜单未标价，请向店内咨询)", "牛カルビ1本 + カルビ身150g + 冷麺 + 水餃子(価格はメニューに記載なし。店舗にお問い合わせください)", "1 miếng sườn bò non + thịt dẻ sườn bò 150g + mì lạnh + sủi cảo luộc (menu không ghi giá — vui lòng hỏi nhà hàng)") }),
    ],
  },
  {
    id: "beer",
    name: T("맥주 · 음료", "Beer & Drinks", "啤酒 · 饮料", "ビール・ドリンク", "Bia · Nước uống"),
    items: [
      it(45000, null, T("타이거 맥주", "Tiger Beer", "虎牌啤酒", "タイガービール", "Bia Tiger")),
      it(45000, null, T("타이거 크리스탈 맥주", "Tiger Crystal Beer", "虎牌晶纯啤酒", "タイガークリスタル", "Bia Tiger Crystal")),
      it([["330ml", 50000], ["640ml", 90000]], null, T("칭다오 맥주", "Tsingtao Beer", "青岛啤酒", "青島ビール", "Bia Tsingtao")),
      it(45000, null, T("사이공 맥주", "Saigon Beer", "西贡啤酒", "サイゴンビール", "Bia Sài Gòn")),
      it(20000, null, T("음료수", "Soft Drink", "饮料", "ソフトドリンク", "Nước ngọt")),
      it(32000, null, T("레드불", "Red Bull", "红牛饮料", "レッドブル", "Bò Húc")),
    ],
  },
  {
    id: "liquor",
    name: T("소주 · 전통주 · 고량주", "Soju & Liquor", "烧酒 · 白酒", "焼酎・お酒", "Rượu"),
    items: [
      it(130000, null, T("참이슬", "Chamisul Soju", "真露竹炭烧酒", "チャミスル", "Rượu Chamisul")),
      it(130000, null, T("처음처럼", "Chum Churum Soju", "初饮初乐烧酒", "チョウムチョロム", "Rượu Chum Churum")),
      it(130000, null, T("새로", "Saero Soju", "Saero烧酒", "セロ(焼酎)", "Rượu Saero")),
      it(130000, null, T("진로", "Jinro Soju", "真露烧酒", "ジンロ(焼酎)", "Rượu Jinro")),
      it(130000, null, T("과일주", "Fruit Liquor", "果酒", "果実酒", "Rượu hoa quả")),
      it([["250ml", 170000], ["450ml", 270000]], null, T("설원주", "Seolwonju", "雪原酒", "雪原酒(ソルォンジュ)", "Rượu Tuyết Nguyên")),
      it(150000, null, T("막걸리", "Makgeolli (Rice Wine)", "马格利米酒", "マッコリ", "Rượu gạo Makgeolli")),
      it(90000, null, T("매실주", "Plum Liquor", "梅酒", "梅酒", "Rượu mơ")),
      it(90000, null, T("산사주", "Hawthorn Liquor", "山楂酒", "サンザシ酒", "Rượu táo mèo")),
      it([["250ml", 230000], ["500ml", 385000]], null, T("연태고량주", "Yantai Gaoliang Liquor", "烟台白酒", "煙台高粱酒", "Rượu Yantai trắng")),
    ],
  },
];
