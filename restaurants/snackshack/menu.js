// Snack Shack 스포츠 바 · 버거 (Shophouse A5-11, Sunshine City, Ciputra, Hà Nội) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "Snack snack" 폴더의 구글 지도 캡처 19장. 가격은 손님이 3일 전 올린 매장 메뉴판 2장
//   (큰 메뉴판 + "BUILD YOUR BURGER") 기준, 키즈 메뉴는 가게 계정이 5개월 전 올린 포스터, 놀이방 요금은 3일 전 안내판.
// 1년 전 포스터와 값이 다른 메뉴가 있음(치킨윙 155k→165k, 애니멀 프라이 120k→160k 등) — 최신 값을 씀.
// 영어는 메뉴판 표기, 한국어·중국어·일본어·베트남어는 번역. 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// it(가격, 한국어, 영어, 중국어, 일본어, 베트남어, 추가 설정) — 추가 설정: { tag: "best", spicy, desc, sizes }
window.RESTAURANT = {
  brand: { ko: "스낵 섁", en: "Snack Shack", branch: "Sunshine City" },
  phone: "0362 191 901",
  address: "Shophouse A5-11, Sunshine City, Ciputra, Hà Nội",
  mapQuery: "Snack Shack Sunshine City",
  wifi: null,
};

const it = (price, ko, en, zh, ja, vi, x = {}) => ({ price, name: { ko, en, zh, ja, vi }, ...x });
const L = (s) => ({ ko: s, en: s, zh: s, ja: s, vi: s });
const sz = (pairs, ko, en, zh, ja, vi, x = {}) => ({ sizes: pairs.map(([l, p]) => [L(l), p]), name: { ko, en, zh, ja, vi }, ...x });
const d = (ko, en, zh, ja, vi) => ({ desc: { ko, en, zh, ja, vi } });
const BEST = { tag: "best" };

window.MENU = [
  {
    id: "burger",
    photo: "img/burger.jpg",
    name: { ko: "버거", en: "Build Your Burger", zh: "汉堡", ja: "バーガー", vi: "Burger" },
    note: { ko: "감자튀김 + 음료 세트로 바꾸면 +60,000₫", en: "Make it a meal (fries + soft drink): +60,000₫",
      zh: "加薯条和饮料变套餐 +60,000₫", ja: "ポテト＋ドリンクのセットに +60,000₫", vi: "Thêm khoai tây chiên + nước ngọt thành combo: +60.000₫" },
    items: [
      sz([["3×3 · 180g", 200000], ["4×4 · 240g", 220000]], "스매시 버거", "Smash Burger", "压扁牛肉汉堡", "スマッシュバーガー", "Burger bò ép (Smash)",
        { tag: "best", ...d("스매시 소고기 패티, 녹인 치즈, 토마토·양상추, 캐러멜라이즈 양파, 하우스 소스",
          "Smashed beef patty, melted cheese, tomato & lettuce, caramelized onion, house special sauce",
          "压扁牛肉饼、融化芝士、番茄生菜、焦糖洋葱、招牌酱", "スマッシュビーフパティ、とろけるチーズ、トマト・レタス、キャラメルオニオン、特製ソース",
          "Bò ép, phô mai tan chảy, cà chua & xà lách, hành caramel, sốt đặc biệt") }),
      sz([["2×2 · 120g", 210000], ["3×3 · 180g", 230000]], "웨스턴 베이컨 치즈버거", "Western Bacon Cheeseburger", "西部培根芝士汉堡", "ウエスタンベーコンチーズバーガー", "Burger bò phô mai thịt xông khói",
        d("스매시 소고기 패티, 치즈, 바삭한 어니언링, 베이컨, 스모키 BBQ 소스", "Smashed beef patty, melted cheese, crunchy onion rings, crispy bacon, smoky BBQ sauce",
          "压扁牛肉饼、芝士、洋葱圈、脆培根、烟熏烧烤酱", "スマッシュビーフパティ、チーズ、オニオンリング、ベーコン、スモーキーBBQソース",
          "Bò ép, phô mai, hành tây chiên giòn, thịt xông khói, sốt BBQ xông khói")),
      it(160000, "매콤 치킨버거", "Spicy Chicken Burger", "香辣鸡腿汉堡", "スパイシーチキンバーガー", "Burger gà cay",
        { spicy: true, ...d("바삭한 매운 치킨, 양상추, 코울슬로, 하우스 매운 소스", "Crispy fried spicy chicken, lettuce, coleslaw, explosive house spicy sauce",
          "香脆辣炸鸡、生菜、凉拌卷心菜、招牌辣酱", "スパイシーフライドチキン、レタス、コールスロー、特製辛口ソース",
          "Gà chiên giòn cay, xà lách, coleslaw, sốt cay đặc biệt") }),
      it(10000, "추가: 계란 프라이", "Add-on: Sunny-side Up Egg", "加料：太阳蛋", "トッピング：目玉焼き", "Thêm: trứng ốp la"),
      it(30000, "추가: 바삭한 베이컨", "Add-on: Crispy Bacon", "加料：脆培根", "トッピング：カリカリベーコン", "Thêm: thịt xông khói giòn"),
      it(10000, "추가: 피클", "Add-on: Pickles", "加料：酸黄瓜", "トッピング：ピクルス", "Thêm: dưa chuột muối"),
      it(10000, "추가: 할라피뇨", "Add-on: Jalapeños", "加料：墨西哥辣椒", "トッピング：ハラペーニョ", "Thêm: ớt jalapeño", { spicy: true }),
    ],
  },
  {
    id: "tacos",
    name: { ko: "타코 · 멕시칸", en: "Tacos & Mexican", zh: "塔可 · 墨西哥菜", ja: "タコス・メキシカン", vi: "Tacos · Món Mexico" },
    items: [
      it(180000, "티후아나 타코 (3개)", "Tijuana Tacos (3 pcs)", "提华纳塔可（3个）", "ティフアナタコス（3個）", "Tacos Tijuana (3 cái)", BEST),
      it(195000, "엔세나다 타코 (3개)", "Ensenada Tacos (3 pcs)", "恩塞纳达塔可（3个）", "エンセナダタコス（3個）", "Tacos Ensenada (3 cái)"),
      it(160000, "치킨 타코 (3개)", "Pollo Tacos (3 pcs)", "鸡肉塔可（3个）", "チキンタコス（3個）", "Tacos gà (3 cái)"),
      it(120000, "크리스피 치킨 롤 (3개)", "Crispy Chicken Roll (3 pcs)", "香脆鸡肉卷（3个）", "クリスピーチキンロール（3個）", "Cuốn gà giòn (3 cái)"),
      it(170000, "치킨 케사디야", "Quesadillas de Pollo", "鸡肉芝士薄饼", "チキンケサディーヤ", "Quesadilla gà"),
      it(180000, "치킨 타키토스", "Chicken Taquitos", "鸡肉炸卷饼", "チキンタキートス", "Taquitos gà"),
    ],
  },
  {
    id: "chicken",
    name: { ko: "치킨 · 샌드위치", en: "Chicken & Sandwiches", zh: "炸鸡 · 三明治", ja: "チキン・サンドイッチ", vi: "Gà · Sandwich" },
    items: [
      it(165000, "치킨윙 (6조각)", "Chicken Wings (6 pcs)", "鸡翅（6块）", "チキンウィング（6本）", "Cánh gà (6 miếng)"),
      it(125000, "치킨 텐더 (6조각)", "Chicken Tenders (6 pcs)", "鸡柳（6条）", "チキンテンダー（6本）", "Gà tẩm bột (6 miếng)"),
      sz([["S", 65000], ["M", 95000]], "팝콘 치킨", "Popcorn Chicken", "鸡米花", "ポップコーンチキン", "Gà viên chiên"),
      sz([["S", 145000], ["M", 195000]], "클럽 샌드위치", "Club Sandwich", "总汇三明治", "クラブサンドイッチ", "Bánh sandwich club"),
      it(130000, "핫도그", "Hot Dog", "热狗", "ホットドッグ", "Bánh mì xúc xích (hot dog)"),
    ],
  },
  {
    id: "bites",
    name: { ko: "감자튀김 · 안주 · 샐러드", en: "Game Day Bites", zh: "薯条 · 小食 · 沙拉", ja: "ポテト・おつまみ・サラダ", vi: "Khoai tây · Đồ nhắm · Salad" },
    items: [
      it(490000, "챔피언 플래터 (소시지·치킨윙·감자튀김 + 칼스버그 2잔)", "The Champion Platter (sausages, chicken wings, fries + 2 Carlsberg beers)", "冠军拼盘（香肠·鸡翅·薯条 + 2杯嘉士伯）", "チャンピオンプラッター（ソーセージ・手羽・ポテト＋カールスバーグ2杯）", "Mẹt Champion (xúc xích, cánh gà, khoai tây + 2 bia Carlsberg)", BEST),
      it(160000, "애니멀 프라이 (베이컨·치즈·캐러멜 양파)", "Animal Fries", "动物薯条（培根·芝士·焦糖洋葱）", "アニマルフライ（ベーコン・チーズ・キャラメルオニオン）", "Khoai tây Animal (thịt xông khói, phô mai)"),
      it(75000, "감자튀김", "French Fries", "薯条", "フライドポテト", "Khoai tây chiên"),
      it(180000, "소고기 나초", "Beef Nachos", "牛肉玉米片", "ビーフナチョス", "Nachos bò"),
      it(25000, "나초 칩 & 홈메이드 딥", "Nacho Chips & Special Homemade Dip", "玉米片配自制蘸酱", "ナチョチップス＆自家製ディップ", "Bánh nachos & sốt chấm"),
      it(55000, "매콤 베이컨 튀김", "Spicy Fried Bacon", "香辣炸培根", "スパイシーフライドベーコン", "Thịt xông khói chiên cay", { spicy: true }),
      it(60000, "츄러스 & 초콜릿 딥", "Churros with Chocolate Dip", "吉事果配巧克力酱", "チュロス＆チョコディップ", "Churros chấm sô cô la"),
      it(80000, "섁 하우스 샐러드", "Shack House Salad", "招牌沙拉", "シャックハウスサラダ", "Salad Shack House"),
      it(65000, "크리스프 & 라이트 샐러드", "Crisp & Light Salad", "清爽沙拉", "クリスプ＆ライトサラダ", "Salad nhẹ"),
    ],
  },
  {
    id: "kids",
    photo: "img/kids.jpg",
    name: { ko: "키즈 메뉴 · 놀이방", en: "Kids Menu & Play Area", zh: "儿童餐 · 游乐区", ja: "キッズメニュー・キッズスペース", vi: "Thực đơn trẻ em · Khu vui chơi" },
    note: { ko: "놀이방 입장권: 월~목 100,000₫ · 금~일 140,000₫ (보호자 1명 포함, 추가 보호자 30,000₫, 양말 필수, 공휴일 요금 별도)",
      en: "Play area ticket: Mon–Thu 100,000₫ · Fri–Sun 140,000₫ (1 adult included, extra adult 30,000₫, socks required, holidays differ)",
      zh: "游乐区门票：周一至周四 100,000₫ · 周五至周日 140,000₫（含1名大人，加1名大人30,000₫，须穿袜子，节假日另计）",
      ja: "キッズスペース入場料：月〜木 100,000₫・金〜日 140,000₫（大人1名込み、追加大人30,000₫、靴下必須、祝日は別料金）",
      vi: "Vé khu vui chơi: Thứ 2–5 100.000₫ · Thứ 6–CN 140.000₫ (kèm 1 phụ huynh, thêm phụ huynh 30.000₫, bắt buộc đi tất, ngày lễ giá khác)" },
    items: [
      sz([["S", 129000], ["M", 149000]], "팝콘 치킨 펀박스", "Popcorn Funbox", "鸡米花欢乐盒", "ポップコーンファンボックス", "Hộp gà viên vui nhộn"),
      it(80000, "맥앤치즈", "Mac and Cheese", "芝士通心粉", "マカロニチーズ", "Nui phô mai"),
      it(120000, "미니 치즈버거 세트", "Mini Cheese Burger Meal", "迷你芝士汉堡套餐", "ミニチーズバーガーセット", "Combo burger phô mai mini"),
      it(159000, "텐더 버디 세트", "Tenders Buddy Meal", "鸡柳伙伴套餐", "テンダーバディセット", "Combo gà tẩm bột"),
    ],
  },
  {
    id: "beer",
    name: { ko: "수제 · 생맥주", en: "Draft Beers", zh: "精酿 · 生啤", ja: "クラフト・生ビール", vi: "Bia tươi · Bia thủ công" },
    items: [
      sz([["S", 105000], ["M", 135000]], "하이반 헤이즈", "Hai Van Haze", "海云 Haze", "ハイヴァン・ヘイズ", "Hải Vân Haze"),
      sz([["S", 105000], ["M", 135000]], "패션프루트 밀맥주", "Passion Fruit Wheat Ale", "百香果小麦啤", "パッションフルーツ・ウィートエール", "Bia lúa mì chanh dây"),
      sz([["S", 105000], ["M", 135000]], "재스민 IPA", "Jasmine IPA", "茉莉花 IPA", "ジャスミンIPA", "Jasmine IPA"),
      sz([["S", 105000], ["M", 135000]], "선셋 탠저린 밀맥주", "Sunset Tangerine Wheat", "日落橘子小麦啤", "サンセット・タンジェリン・ウィート", "Bia lúa mì quýt"),
      sz([["S", 105000], ["M", 135000]], "소금 레몬 맥주", "Bia Chanh Muối (Salted Lemon)", "咸柠檬啤酒", "塩レモンビール", "Bia chanh muối"),
      sz([["S", 65000], ["M", 110000]], "칼스버그 생맥주", "Carlsberg Pilsner Draught", "嘉士伯生啤", "カールスバーグ生", "Bia tươi Carlsberg", BEST),
      it(600000, "칼스버그 맥주 타워 (3L)", "Carlsberg Draft Beer Tower (3L)", "嘉士伯啤酒塔（3升）", "カールスバーグ・ビアタワー（3L）", "Tháp bia Carlsberg (3L)"),
    ],
  },
  {
    id: "drinks",
    name: { ko: "음료", en: "Non-alcohol Drinks", zh: "饮料", ja: "ソフトドリンク", vi: "Đồ uống không cồn" },
    items: [
      it(55000, "생과일 주스 (사과·레몬·수박)", "Fresh Juice (apple, lemon, watermelon)", "鲜榨果汁（苹果·柠檬·西瓜）", "生ジュース（りんご・レモン・スイカ）", "Nước ép (táo, chanh, dưa hấu)"),
      it(60000, "아이스티 (복숭아·리치·딸기)", "Ice Tea (peach, lychee, strawberry)", "冰茶（桃子·荔枝·草莓）", "アイスティー（桃・ライチ・いちご）", "Trà (đào, vải, dâu)"),
      it(70000, "아이스 소다 (복숭아·리치·딸기)", "Ice Soda (peach, lychee, strawberry)", "冰苏打（桃子·荔枝·草莓）", "アイスソーダ（桃・ライチ・いちご）", "Soda (đào, vải, dâu)"),
      it(35000, "탄산음료", "Soft Drinks", "汽水", "ソフトドリンク", "Nước ngọt"),
      it(25000, "생수", "Mineral Water", "矿泉水", "ミネラルウォーター", "Nước khoáng"),
    ],
  },
];
