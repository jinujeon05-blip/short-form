// 추암 Choo Am (약선요리식당 · Lô 1N3 Hoàng Hoa Thám, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "추암" 폴더의 구글 지도 캡처 22장. 메뉴 사진은 매니저(추승준)가 6~7년 전에 올린 것뿐이라
//   가격이 많이 바뀌었을 수 있음. 6년 전 메뉴판(6~51번)을 기준으로, 1~5번 약선 특별 메뉴는 7년 전 메뉴판에서 가져옴.
// 한국어·베트남어는 메뉴판 표기(명백한 오타만 고침), 영어·중국어·일본어는 새로 번역. 가격은 부가세 10% 별도.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// it(가격, 한국어, 영어, 중국어, 일본어, 베트남어, 추가 설정) — 추가 설정: { spicy, tag: "best", desc, sizes }
window.RESTAURANT = {
  brand: { ko: "추암", en: "Choo Am", branch: "Bắc Ninh" },
  phone: "0705 016 054",
  address: "Lô 1N3 Hoàng Hoa Thám, Võ Cường, Bắc Ninh",
  mapQuery: "추암 Choo Am",
  wifi: null,
};

const it = (price, ko, en, zh, ja, vi, x = {}) => ({ price, name: { ko, en, zh, ja, vi }, ...x });
const sl = (s, l, ko, en, zh, ja, vi, x = {}) => ({ sizes: [[SM, s], [LG, l]], name: { ko, en, zh, ja, vi }, ...x });
const SM = { ko: "소", en: "S", zh: "小", ja: "小", vi: "Nhỏ" };
const LG = { ko: "대", en: "L", zh: "大", ja: "大", vi: "Lớn" };
const HOT = { spicy: true };
const HALF = (p) => ({ desc: { ko: `반 마리 추가 ${p}`, en: `Extra half duck ${p}`, zh: `加半只 ${p}`, ja: `半羽追加 ${p}`, vi: `Thêm nửa con ${p}` } });

window.MENU = [
  {
    id: "special",
    photo: "img/special.jpg",
    name: { ko: "약선 특별 메뉴", en: "Medicinal-herb Specials", zh: "药膳特色菜", ja: "薬膳スペシャル", vi: "Món đặc biệt thảo dược" },
    note: { ko: "약선(藥膳)은 식품과 약초로 만든 우리나라 전통 건강 음식입니다",
      en: "Yakseon: traditional Korean health food cooked with medicinal herbs",
      zh: "药膳是用食材与药草烹制的韩国传统养生料理",
      ja: "薬膳は食材と薬草で作る韓国伝統の健康料理です",
      vi: "Yakseon là món ăn bồi bổ truyền thống Hàn Quốc nấu cùng thảo dược" },
    items: [
      it(1200000, "약선 오리 백숙", "Herbal Whole Duck Soup", "药膳炖全鸭", "薬膳 鴨の水炊き（ペクスク）", "Vịt hầm thảo dược", { tag: "best" }),
      it(1000000, "약선 닭 백숙", "Herbal Whole Chicken Soup", "药膳炖全鸡", "薬膳 鶏の水炊き（ペクスク）", "Gà hầm thảo dược", { tag: "best" }),
      it(1200000, "약선 옻 오리·닭 백숙", "Lacquer-tree Herbal Duck or Chicken Soup", "药膳漆树炖鸭·鸡", "薬膳 漆の木の鴨・鶏水炊き", "Vịt / gà hầm cây sơn thảo dược"),
      it(760000, "약선 간장 모듬 정식", "Herbal Soy-braised Assorted Set", "药膳酱油拼盘套餐", "薬膳 醤油盛り合わせ定食", "Set tổng hợp xì dầu thảo dược"),
      it(600000, "약선 물 소불고기", "Herbal Beef Bulgogi in Broth", "药膳汤汁烤牛肉", "薬膳 汁ありプルコギ（牛）", "Bò bulgogi nước thảo dược"),
    ],
  },
  {
    id: "soup",
    photo: "img/soup.jpg",
    name: { ko: "국물 요리", en: "Hot Pots & Soups", zh: "汤锅", ja: "鍋料理", vi: "Món lẩu" },
    items: [
      sl(700000, 1000000, "해물탕", "Spicy Seafood Hot Pot", "海鲜汤锅", "海鮮鍋（ヘムルタン）", "Lẩu hải sản", { spicy: true, tag: "best" }),
      sl(700000, 1000000, "아귀탕", "Monkfish Hot Pot", "安康鱼汤锅", "アンコウ鍋", "Lẩu cá mặt quỷ", HOT),
      sl(700000, 1000000, "꽃게탕", "Blue Crab Hot Pot", "花蟹汤锅", "ワタリガニ鍋", "Lẩu ghẹ", HOT),
      sl(450000, 800000, "동태탕", "Frozen Pollock Hot Pot", "冻明太鱼汤锅", "スケトウダラ鍋", "Lẩu cá minh thái", HOT),
      sl(600000, 900000, "알탕", "Spicy Fish Roe Hot Pot", "鱼籽汤锅", "タラコ鍋（アルタン）", "Lẩu trứng cá", HOT),
      sl(400000, 800000, "사골 김치 두부전골", "Kimchi Tofu Hot Pot in Bone Broth", "骨汤泡菜豆腐火锅", "牛骨スープのキムチ豆腐鍋", "Lẩu kim chi", HOT),
      sl(600000, 900000, "존슨탕 (부대찌개)", "Johnson-tang (Army Stew)", "部队火锅", "ジョンソンタン（プデチゲ）", "Lẩu thịt hộp", HOT),
    ],
  },
  {
    id: "jjim",
    photo: "img/jjim.jpg",
    name: { ko: "찜 · 조림", en: "Spicy Braises", zh: "炖菜 · 酱焖", ja: "蒸し煮・煮付け", vi: "Món hấp xào · Món kho" },
    items: [
      sl(700000, 1000000, "해물찜", "Spicy Braised Seafood", "辣炖海鲜", "海鮮の辛味蒸し", "Hải sản xào cay", HOT),
      sl(700000, 1000000, "아귀찜", "Spicy Braised Monkfish", "辣炖安康鱼", "アンコウの辛味蒸し", "Cá mặt quỷ xào cay", HOT),
      sl(700000, 1000000, "꽃게찜", "Spicy Braised Blue Crab", "辣炖花蟹", "ワタリガニの辛味蒸し", "Ghẹ hấp xào cay", HOT),
      sl(600000, 900000, "코다리찜", "Spicy Braised Half-dried Pollock", "辣炖半干明太鱼", "コダリの辛味蒸し", "Cá kodari xào cay", HOT),
      sl(600000, 900000, "오징어찜", "Spicy Braised Squid", "辣炖鱿鱼", "イカの辛味蒸し", "Mực hấp", HOT),
      it(300000, "두부조림", "Braised Tofu", "酱焖豆腐", "豆腐の煮付け", "Đậu phụ kho"),
      it(500000, "고등어조림", "Braised Mackerel", "酱焖鲭鱼", "サバの煮付け", "Cá thu kho", HOT),
      it(600000, "다금바리조림", "Braised Grouper", "酱焖石斑鱼", "クエの煮付け", "Cá mú kho", HOT),
      it(700000, "모듬 생선조림", "Braised Assorted Fish", "酱焖杂鱼", "魚の盛り合わせ煮付け", "Cá kho tổng hợp", HOT),
      it(800000, "갈치조림", "Braised Hairtail", "酱焖带鱼", "タチウオの煮付け", "Cá hố kho", HOT),
      it(600000, "코다리조림", "Braised Half-dried Pollock", "酱焖半干明太鱼", "コダリの煮付け", "Cá kodari kho", HOT),
    ],
  },
  {
    id: "stirfry",
    photo: "img/stirfry.jpg",
    name: { ko: "볶음 · 구이", en: "Stir-fries & Grills", zh: "炒菜 · 烧烤", ja: "炒め物・焼き物", vi: "Món xào · Món nướng" },
    items: [
      sl(400000, 700000, "제육볶음", "Spicy Stir-fried Pork", "辣炒猪肉", "豚肉の辛味炒め（チェユク）", "Thịt lợn xào", { spicy: true, tag: "best" }),
      sl(400000, 700000, "쭈삼볶음", "Webfoot Octopus & Pork Belly Stir-fry", "小章鱼炒五花肉", "イイダコとサムギョプサル炒め", "Ba chỉ xào bạch tuộc", HOT),
      sl(400000, 700000, "오삼볶음", "Squid & Pork Belly Stir-fry", "鱿鱼炒五花肉", "イカとサムギョプサル炒め", "Mực xào ba chỉ", HOT),
      it(600000, "닭볶음탕", "Spicy Braised Chicken", "辣炖鸡块", "タッポックムタン（鶏の辛煮込み）", "Gà xào cay", HOT),
      sl(700000, 1000000, "모듬 생선구이", "Grilled Assorted Fish", "烤杂鱼拼盘", "焼き魚の盛り合わせ", "Cá nướng tổng hợp",
        { desc: { ko: "다금바리·갈치·열기·고등어·서대", en: "Grouper, hairtail, rockfish, mackerel, sole", zh: "石斑鱼·带鱼·平鲉·鲭鱼·舌鳎", ja: "クエ・タチウオ・メバル・サバ・シタビラメ", vi: "Cá mú, cá hố, cá rockfish, cá thu, cá bơn" } }),
      it(180000, "숙성 삼겹살 200g (+된장찌개)", "Aged Pork Belly 200g (with Soybean Stew)", "熟成五花肉200克（配大酱汤）", "熟成サムギョプサル200g（テンジャンチゲ付き）", "Thịt ba chỉ nướng 200g (kèm canh tương)"),
      it(800000, "철판 오리 주물럭", "Iron-plate Marinated Duck", "铁板调味鸭肉", "鉄板 鴨のチュムルロク", "Vịt xào", HALF("500,000₫")),
      it(800000, "오리 로스구이", "Grilled Duck Roast", "烤鸭肉", "鴨のロース焼き", "Vịt nướng", HALF("500,000₫")),
    ],
  },
  {
    id: "side",
    photo: "img/side.jpg",
    name: { ko: "사이드 · 무침", en: "Sides & Salads", zh: "小菜 · 凉拌", ja: "サイド・和え物", vi: "Món phụ · Món nộm" },
    items: [
      it(100000, "김치전", "Kimchi Pancake", "泡菜饼", "キムチチヂミ", "Bánh kim chi"),
      it(300000, "해물파전", "Seafood Green Onion Pancake", "海鲜葱饼", "海鮮ネギチヂミ", "Bánh hành hải sản", { tag: "best" }),
      it(100000, "계란말이", "Rolled Omelette", "鸡蛋卷", "韓国風卵焼き", "Trứng cuộn"),
      it(150000, "고등어 구이", "Grilled Mackerel", "烤鲭鱼", "サバの塩焼き", "Cá thu nướng"),
      it(450000, "오징어 초무침", "Spicy Vinegared Squid Salad", "醋拌鱿鱼", "イカの酢味噌和え", "Mực nộm", HOT),
    ],
  },
  {
    id: "east",
    name: { ko: "강원도 동해 특별요리", en: "East Sea (Gangwon-do) Specials", zh: "江原道东海特色菜", ja: "江原道・東海の特別料理", vi: "Món đặc biệt biển Đông Gangwon" },
    items: [
      it(800000, "문어숙회", "Blanched Octopus", "白灼章鱼", "タコの湯引き", "Bạch tuộc luộc"),
      it(1000000, "가자미 세꼬시 초무침", "Bone-in Flounder Sashimi Salad", "醋拌带骨鲽鱼片", "カレイの骨ごと刺身和え", "Gỏi cá bơn trộn chua cay", HOT),
      it(1000000, "참골뱅이·소라 초무침", "Sea Snail & Conch Salad", "醋拌海螺", "ツブ貝・サザエの酢和え", "Ốc trộn chua cay", HOT),
      it(600000, "말린 열기 요리", "Dried Rockfish Dish", "干平鲉料理", "干しメバル料理", "Món cá rockfish khô",
        { desc: { ko: "메뉴판 이름이 흐려 확인 필요", en: "Name unclear on the menu — please ask staff", zh: "菜单名称模糊，请向店员确认", ja: "メニュー名が不鮮明なため店員にご確認ください", vi: "Tên món trên thực đơn bị mờ, vui lòng hỏi nhân viên" } }),
    ],
  },
  {
    id: "meal",
    photo: "img/meal.jpg",
    name: { ko: "식사", en: "Meals", zh: "饭食", ja: "食事", vi: "Cơm · Canh" },
    note: { ko: "저녁에는 추어탕·곤드레비빔밥·청국장/된장찌개·고등어구이 정식·닭곰탕만 됩니다",
      en: "Dinner: only loach soup, gondre bibimbap, soybean stews, mackerel set and chicken soup",
      zh: "晚餐仅供应泥鳅汤、山菜拌饭、清麴酱/大酱汤、烤鲭鱼套餐、鸡汤",
      ja: "夕食はチュオタン・コンドレビビンバ・チョングッチャン／テンジャンチゲ・サバ焼き定食・タッコムタンのみ",
      vi: "Buổi tối chỉ có: canh cá trạch, cơm trộn gondre, canh tương, cá thu nướng kèm canh, canh gà" },
    items: [
      it(120000, "청국장 / 된장찌개", "Cheonggukjang or Soybean Paste Stew", "清麴酱汤 / 大酱汤", "チョングッチャン／テンジャンチゲ", "Canh tương lên men / canh tương"),
      it(150000, "추어탕", "Loach Soup (Chueotang)", "泥鳅汤", "チュオタン（ドジョウ汁）", "Canh cá trạch"),
      it(150000, "황태 해장국", "Dried Pollock Hangover Soup", "干明太鱼醒酒汤", "干しスケトウダラのヘジャンクッ", "Canh cá minh thái khô"),
      it(120000, "김치찌개", "Kimchi Stew", "泡菜汤", "キムチチゲ", "Canh kim chi", HOT),
      it(150000, "돼지 고추장찌개", "Pork Gochujang Stew", "猪肉辣酱汤", "豚肉のコチュジャンチゲ", "Canh thịt lợn tương ớt", HOT),
      it(150000, "닭곰탕", "Chicken Soup (Dak-gomtang)", "鸡汤", "タッコムタン（鶏スープ）", "Canh gà"),
      it(160000, "곤드레 비빔밥", "Gondre (Thistle) Bibimbap", "山菜拌饭", "コンドレビビンバ", "Cơm trộn gondre", { tag: "best" }),
      it(160000, "수제 돈까스", "Homemade Pork Cutlet", "手工炸猪排", "手作りトンカツ", "Thịt chiên xù"),
      it(150000, "뚝배기 알탕", "Fish Roe Stew in Stone Pot", "石锅鱼籽汤", "トゥッペギ・アルタン", "Canh trứng cá", HOT),
      it(160000, "제육덮밥", "Spicy Pork Rice Bowl", "辣炒猪肉盖饭", "チェユク丼", "Cơm thịt lợn xào cay", HOT),
      it(200000, "고등어구이 정식", "Grilled Mackerel Set", "烤鲭鱼套餐", "サバ焼き定食", "Cá thu nướng kèm canh"),
    ],
  },
  {
    id: "drinks",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水饮料", ja: "お酒・ドリンク", vi: "Đồ uống" },
    items: [
      it(120000, "소주", "Soju", "烧酒", "焼酎", "Rượu soju"),
      it(50000, "타이거 맥주", "Tiger Beer", "虎牌啤酒", "タイガービール", "Bia Tiger"),
      it(100000, "보드카 멘", "Vodka Men", "伏特加 Men", "ウォッカ Men", "Rượu vodka Men"),
      it(200000, "생막걸리", "Fresh Makgeolli", "生米酒", "生マッコリ", "Rượu gạo tươi"),
      it(150000, "막걸리", "Makgeolli", "韩国米酒", "マッコリ", "Rượu gạo trắng"),
      it(200000, "홍초 (500ml)", "Hongcho Vinegar Drink (500ml)", "红醋饮料（500毫升）", "ホンチョ（飲む酢・500ml）", "Giấm hồng Hongcho (500ml)"),
      it(20000, "음료", "Soft Drinks", "饮料", "ソフトドリンク", "Nước ngọt"),
    ],
  },
];
