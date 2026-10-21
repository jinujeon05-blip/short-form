// La Cherie Coffee (Sunshine City · Ciputra, Hà Nội — 굿데이 김밥 위층) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "La cherie" 폴더의 구글 지도 캡처 16장. 음료·빙수는 손님이 4개월 전 올린 매장 메뉴판
//   ("SELA MENU & BINGSU", 아래에 La Cherie-Selina-Selena) 기준 — 1년 전 메뉴판보다 5k 정도씩 올랐음.
// 음식(반미·피자·크루아상·티라미수)은 3년 전 가게 사진에만 있고 가격이 없어 "가격 문의"(price: null).
// 베트남어·영어는 메뉴판 표기, 한국어·중국어·일본어는 번역. 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// it(가격, 한국어, 영어, 중국어, 일본어, 베트남어, 추가 설정) — 추가 설정: { tag: "best", desc }
window.RESTAURANT = {
  brand: { ko: "라 셰리 커피", en: "La Cherie Coffee", branch: "Sunshine City" },
  phone: null,
  address: "Sunshine City, Khu đô thị Ciputra, Phú Thượng, Hà Nội",
  mapQuery: "La Cherie Coffee Ciputra",
  wifi: null,
};

const it = (price, ko, en, zh, ja, vi, x = {}) => ({ price, name: { ko, en, zh, ja, vi }, ...x });
const ml = (m, l, ko, en, zh, ja, vi, x = {}) => ({ sizes: [[SM, m], [LG, l]], name: { ko, en, zh, ja, vi }, ...x });
const SM = { ko: "M", en: "M", zh: "中", ja: "M", vi: "M" };
const LG = { ko: "L", en: "L", zh: "大", ja: "L", vi: "L" };
const BEST = { tag: "best" };

window.MENU = [
  {
    id: "signature",
    photo: "img/signature.jpg",
    name: { ko: "시그니처", en: "Signature", zh: "招牌饮品", ja: "シグネチャー", vi: "Signature" },
    items: [
      it(60000, "크림 커피", "Creamy Coffee", "奶盖咖啡", "クリームコーヒー", "Cà phê kem sữa", BEST),
      it(60000, "크림 말차", "Creamy Matcha", "奶盖抹茶", "クリーム抹茶", "Matcha kem sữa", BEST),
      it(60000, "크림 초콜릿", "Creamy Chocolate", "奶盖巧克力", "クリームチョコレート", "Socola kem sữa"),
      it(60000, "에그크림 박씨우", "White Coffee with Egg Cream", "蛋奶油白咖啡", "エッグクリーム・バックシウ", "Bạc xỉu kem trứng"),
      it(60000, "판단잎 코코넛 커피", "Coconut Pandan Coffee", "斑斓椰子咖啡", "パンダン＆ココナッツコーヒー", "Cà phê lá nếp cốt dừa"),
    ],
  },
  {
    id: "coffee",
    photo: "img/coffee.jpg",
    name: { ko: "커피", en: "Coffee", zh: "咖啡", ja: "コーヒー", vi: "Cà phê" },
    note: { ko: "로부스타(베트남식) · 아라비카", en: "Robusta (Vietnamese style) · Arabica", zh: "罗布斯塔（越南式）· 阿拉比卡", ja: "ロブスタ（ベトナム式）・アラビカ", vi: "Robusta · Arabica" },
    items: [
      it(40000, "카페 너우 (연유 커피)", "Brown Coffee (with condensed milk)", "越南炼乳咖啡", "カフェ・ナウ（練乳コーヒー）", "Cafe nâu"),
      it(35000, "카페 덴 (블랙커피)", "Black Coffee", "越南黑咖啡", "カフェ・デン（ブラック）", "Cafe đen"),
      it(59000, "코코넛 커피", "Coconut Coffee", "椰子咖啡", "ココナッツコーヒー", "Cà phê cốt dừa", BEST),
      it(50000, "박씨우 (화이트 커피)", "White Coffee (Bạc xỉu)", "白咖啡（Bạc xỉu）", "バックシウ（ホワイトコーヒー）", "Bạc xỉu"),
      it(55000, "소금 커피", "Salted Coffee", "海盐咖啡", "塩コーヒー", "Cà phê muối", BEST),
      it(55000, "에스프레소", "Espresso", "意式浓缩", "エスプレッソ", "Espresso"),
      it(55000, "아메리카노", "Americano", "美式咖啡", "アメリカーノ", "Americano"),
      it(60000, "카푸치노", "Cappuccino", "卡布奇诺", "カプチーノ", "Cappuccino"),
      it(60000, "카라멜 마키아토", "Caramel Macchiato", "焦糖玛奇朵", "キャラメルマキアート", "Caramel macchiato"),
      it(60000, "카페 모카", "Cafe Mocha", "摩卡咖啡", "カフェモカ", "Cafe mocha"),
      it(60000, "카페 라테", "Cafe Latte", "拿铁", "カフェラテ", "Cafe latte"),
    ],
  },
  {
    id: "coldbrew",
    name: { ko: "콜드브루", en: "Cold Brew", zh: "冷萃咖啡", ja: "コールドブリュー", vi: "Cà phê ủ lạnh" },
    items: [
      it(55000, "콜드브루", "Cold Brew", "冷萃咖啡", "コールドブリュー", "Cà phê ủ lạnh"),
      it(60000, "소금크림 콜드브루", "Cold Brew with Salted Cream", "海盐奶油冷萃", "塩クリーム・コールドブリュー", "Cà phê ủ lạnh kem mặn"),
      it(60000, "오렌지 콜드브루", "Orange Cold Brew", "橙子冷萃", "オレンジ・コールドブリュー", "Cà phê ủ lạnh cam"),
      it(60000, "오디 콜드브루", "Mulberry Cold Brew", "桑葚冷萃", "マルベリー・コールドブリュー", "Cà phê ủ lạnh dâu tằm"),
      it(60000, "레모네이드 콜드브루", "Lemonade Cold Brew", "柠檬冷萃", "レモネード・コールドブリュー", "Cà phê ủ lạnh chanh vàng"),
    ],
  },
  {
    id: "tea",
    photo: "img/drinks.jpg",
    name: { ko: "아이스티 · 밀크티", en: "Iced Tea & Milk Tea", zh: "冰茶 · 奶茶", ja: "アイスティー・ミルクティー", vi: "Trà · Trà sữa" },
    items: [
      it(59000, "복숭아 오렌지 레몬그라스 티", "Orange Lemongrass Peach Tea", "桃子橙子香茅茶", "桃・オレンジ・レモングラスティー", "Trà đào cam sả", BEST),
      it(59000, "리치 알로에 티", "Lychee Aloe Vera Tea", "荔枝芦荟茶", "ライチ＆アロエティー", "Trà vải nha đam"),
      it(59000, "망고 티", "Mango Tea", "芒果茶", "マンゴーティー", "Trà xoài nhiệt đới"),
      it(59000, "딸기 치아씨드 티", "Strawberry Tea with Chia Seeds", "草莓奇亚籽茶", "いちご＆チアシードティー", "Trà dâu hạt chia"),
      it(59000, "자몽 허니 티", "Honey Grapefruit Tea", "蜂蜜西柚茶", "はちみつグレープフルーツティー", "Trà bưởi đỏ mật ong"),
      it(59000, "구운 홍차 밀크티", "Roasted Black Milk Tea", "烤红茶奶茶", "焙煎紅茶ミルクティー", "Hồng trà sữa nướng"),
      it(59000, "재스민 우롱 밀크티", "Jasmine Oolong Milk Tea", "茉莉乌龙奶茶", "ジャスミン烏龍ミルクティー", "Olong nhài sữa"),
      it(59000, "샨 홍차 밀크티", "Shan Black Milk Tea", "山茶红茶奶茶", "シャン紅茶ミルクティー", "Hồng trà Shan"),
      it(59000, "에그크림 홍차 밀크티", "Black Milk Tea with Egg Cream", "蛋奶油红茶奶茶", "エッグクリーム紅茶ミルクティー", "Hồng trà sữa kem trứng"),
      it(55000, "우롱 밀크티", "Oolong Milk Tea", "乌龙奶茶", "烏龍ミルクティー", "Olong sữa"),
    ],
  },
  {
    id: "detox",
    name: { ko: "히비스커스 · 따뜻한 음료 · 말차", en: "Hibiscus, Hot Drinks & Matcha", zh: "洛神花茶 · 热饮 · 抹茶", ja: "ハイビスカス・ホット・抹茶", vi: "Detox · Đồ uống nóng · Matcha" },
    items: [
      it(60000, "히비스커스 키위", "Hibiscus Kiwi Tea", "洛神花奇异果茶", "ハイビスカス＆キウイ", "Hibiscus kiwi"),
      it(60000, "히비스커스 오렌지 허니", "Hibiscus Orange Honey Tea", "洛神花蜂蜜橙茶", "ハイビスカス＆オレンジはちみつ", "Hibiscus cam mật ong"),
      it(60000, "히비스커스 파인애플 허니", "Hibiscus Pineapple Honey Tea", "洛神花蜂蜜菠萝茶", "ハイビスカス＆パイナップルはちみつ", "Hibiscus dứa mật ong"),
      it(55000, "오렌지 재스민 밀크티 (따뜻)", "Hot Orange Jasmine Milk Tea", "热橙香茉莉奶茶", "ホット オレンジジャスミンミルクティー", "Trà nhài cam cháy"),
      it(55000, "유자 허니 티 (따뜻)", "Hot Honey Citron Tea", "热蜂蜜柚子茶", "ホット はちみつゆず茶", "Trà thanh yên mật ong"),
      it(55000, "핫초코", "Hot Chocolate", "热可可", "ホットチョコレート", "Ca cao nóng"),
      it(55000, "말차 라테", "Matcha Latte", "抹茶拿铁", "抹茶ラテ", "Matcha latte"),
      it(59000, "말차 마키아토", "Matcha Macchiato", "抹茶玛奇朵", "抹茶マキアート", "Matcha macchiato"),
      it(59000, "망고 말차 라테", "Mango Matcha Latte", "芒果抹茶拿铁", "マンゴー抹茶ラテ", "Matcha latte mango"),
    ],
  },
  {
    id: "smoothie",
    name: { ko: "요거트 · 스무디 · 주스", en: "Yogurt, Blended & Juice", zh: "酸奶 · 冰沙 · 果汁", ja: "ヨーグルト・フラッペ・ジュース", vi: "Sữa chua · Đá xay · Nước ép" },
    items: [
      it(60000, "판단잎 요거트", "Pandan Yogurt", "斑斓酸奶", "パンダンヨーグルト", "Sữa chua lá nếp"),
      it(60000, "과일 그래놀라 요거트", "Fruit and Cereal Yogurt", "水果谷物酸奶", "フルーツ＆グラノーラヨーグルト", "Sữa chua ngũ cốc hoa quả"),
      it(55000, "커피 요거트", "Coffee Yogurt", "咖啡酸奶", "コーヒーヨーグルト", "Sữa chua cà phê"),
      it(60000, "아보카도 요거트", "Avocado Mixed Yogurt", "牛油果酸奶", "アボカドヨーグルト", "Sữa chua bơ"),
      it(60000, "망고 코코넛 스무디", "Mango Coconut Ice Blended", "芒果椰子冰沙", "マンゴー＆ココナッツフラッペ", "Xoài dừa đá xay", BEST),
      it(60000, "쿠키 스무디", "Cookie Ice Blended", "曲奇冰沙", "クッキーフラッペ", "Cookie đá xay"),
      it(60000, "말차 스무디", "Matcha Ice Blended", "抹茶冰沙", "抹茶フラッペ", "Matcha đá xay"),
      it(55000, "오렌지 주스", "Orange Juice", "橙汁", "オレンジジュース", "Nước ép cam"),
      it(59000, "파인애플 주스", "Pineapple Juice", "菠萝汁", "パイナップルジュース", "Nước ép dứa"),
      it(59000, "아보카도 스무디", "Avocado Smoothie", "牛油果奶昔", "アボカドスムージー", "Sinh tố bơ"),
      it(59000, "망고 스무디", "Mango Smoothie", "芒果奶昔", "マンゴースムージー", "Sinh tố xoài"),
      it(55000, "수박 주스", "Watermelon Juice", "西瓜汁", "スイカジュース", "Nước ép dưa hấu"),
      it(55000, "생코코넛", "Fresh Coconut", "鲜椰子水", "フレッシュココナッツ", "Nước dừa tươi"),
    ],
  },
  {
    id: "bingsu",
    photo: "img/dessert.jpg",
    name: { ko: "빙수", en: "Bingsu", zh: "韩式刨冰", ja: "ピンス（かき氷）", vi: "Bingsu" },
    items: [
      ml(80000, 150000, "팥빙수", "Red Bean Bingsu", "红豆刨冰", "あずきピンス", "Bingsu đậu đỏ"),
      ml(80000, 150000, "오레오 빙수", "Oreo Bingsu", "奥利奥刨冰", "オレオピンス", "Bingsu Oreo"),
      ml(80000, 150000, "말차 빙수", "Matcha Bingsu", "抹茶刨冰", "抹茶ピンス", "Bingsu matcha"),
      ml(80000, 150000, "망고 빙수", "Mango Bingsu", "芒果刨冰", "マンゴーピンス", "Bingsu xoài", BEST),
      ml(80000, 150000, "과일 빙수", "Fruit Bingsu", "水果刨冰", "フルーツピンス", "Bingsu hoa quả"),
    ],
  },
  {
    id: "food",
    photo: "img/food.jpg",
    name: { ko: "빵 · 브런치 · 디저트", en: "Bakery, Brunch & Desserts", zh: "面包 · 早午餐 · 甜点", ja: "パン・ブランチ・デザート", vi: "Bánh · Brunch · Tráng miệng" },
    note: { ko: "가게가 3년 전 올린 사진에 있는 메뉴예요. 가격·판매 여부는 매장에 물어보세요",
      en: "From photos the café posted 3 years ago — please ask staff for prices and availability",
      zh: "来自店家3年前上传的照片，价格及是否供应请询问店员",
      ja: "3年前にお店が投稿した写真のメニューです。価格・販売有無は店員にご確認ください",
      vi: "Món trong ảnh quán đăng 3 năm trước — vui lòng hỏi nhân viên giá và món còn bán" },
    items: [
      it(null, "반미", "Bánh Mì", "越南法棍三明治", "バインミー", "Bánh mì"),
      it(null, "크루아상", "Croissant", "可颂", "クロワッサン", "Bánh sừng bò (croissant)"),
      it(null, "피자", "Pizza", "披萨", "ピザ", "Pizza"),
      it(null, "티라미수 케이크", "Tiramisu Cake", "提拉米苏蛋糕", "ティラミスケーキ", "Bánh tiramisu"),
      it(null, "아이스크림 (말차·바닐라 캐러멜·초코 오레오)", "Ice Cream (Matcha, Vanilla Caramel, Chocolate Oreo)", "冰淇淋（抹茶·香草焦糖·巧克力奥利奥）", "アイスクリーム（抹茶・バニラキャラメル・チョコオレオ）", "Kem (matcha, vani caramel, socola Oreo)"),
    ],
  },
  {
    id: "topping",
    name: { ko: "토핑 추가", en: "Toppings", zh: "加料", ja: "トッピング", vi: "Topping" },
    items: [
      it(15000, "소금 크림", "Salted Cream", "海盐奶盖", "塩クリーム", "Kem mặn"),
      it(10000, "타피오카 펄", "Tapioca Pearls", "珍珠", "タピオカ", "Trân châu"),
      it(10000, "알로에", "Aloe Vera", "芦荟", "アロエ", "Nha đam"),
    ],
  },
];
