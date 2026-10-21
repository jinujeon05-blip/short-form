// 유원핫도그 Youone Hotdog (Sunshine City, Hà Nội) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "QR메뉴판/유원핫도그 션샤인" 폴더의 구글 지도 캡처 28장.
//   메뉴 이름·설명은 구글 지도 "메뉴" 탭, 가격은 손님이 올린 매장 메뉴판 사진(11개월 전·1년 전 두 장)에서 읽음.
//   사진이 작아 음료·사이드 가격 일부는 흐릿함 → 더 최근 사진(11개월 전) 기준. 가격 없는 컵빙수·기타(막대사탕 등)는 뺌.
// 한국어·영어·베트남어는 메뉴판 표기, 중국어·일본어는 번역. 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격 / sizes: [[{ko,en,…}, 가격], …] / tag: "new" · "best" / spicy: true
window.RESTAURANT = {
  brand: { ko: "유원핫도그", en: "Youone Hotdog", sub: "Korean Hotdog & Tokbokki", branch: "Sunshine City" },
  phone: null,
  address: "Tòa S1 (sảnh sau), Sunshine City, Khu đô thị Ciputra, Phú Thượng, Hà Nội",   // 구글 지도 기준 (S1동 뒤쪽 로비)
  mapQuery: "Youone Hotdog Sunshine City",
  wifi: null,
};

const L = (s) => ({ ko: s, en: s, zh: s, ja: s, vi: s });
const S = L("S"), LG = L("L");
const SL = { ko: "S 1~2인 · L 2~3인", en: "S for 1–2 · L for 2–3", zh: "S 1~2人 · L 2~3人", ja: "S 1〜2人前・L 2〜3人前", vi: "S 1-2 người · L 2-3 người" };

window.MENU = [
  {
    id: "hotdog",
    photo: "img/hotdog.jpg",
    name: { ko: "핫도그", en: "Hotdogs", zh: "韩式热狗", ja: "ホットドッグ", vi: "Hotdog" },
    items: [
      { price: 50000, tag: "best", name: { ko: "고구마 치즈 핫도그", en: "Sweet Potato Cheese Hotdog", zh: "红薯芝士热狗", ja: "さつまいもチーズホットドッグ", vi: "Khoai lang phô mai" },
        desc: { ko: "직접 만든 고구마 + 모짜렐라 + 소시지", en: "Homemade sweet potato, mozzarella and sausage", zh: "自制红薯泥＋马苏里拉芝士＋香肠", ja: "自家製さつまいも＋モッツァレラ＋ソーセージ", vi: "Khoai lang nghiền tự làm, phô mai mozza có xúc xích" } },
      { price: 45000, tag: "best", name: { ko: "더블치즈 핫도그", en: "Double Cheese Hotdog", zh: "双重芝士热狗", ja: "ダブルチーズホットドッグ", vi: "Double cheese" },
        desc: { ko: "모짜렐라 + 체다, 치즈만 가득", en: "Mozzarella and cheddar, all cheese", zh: "马苏里拉＋切达，满满芝士", ja: "モッツァレラ＋チェダー、チーズだけ", vi: "Cả mozza cả cheddar, toàn phô mai" } },
      { price: 35000, tag: "best", name: { ko: "모짜렐라 핫도그", en: "Mozza Hotdog", zh: "马苏里拉芝士热狗", ja: "モッツァレラホットドッグ", vi: "Mozza hotdog" },
        desc: { ko: "반은 모짜렐라, 반은 소시지", en: "Half stretchy mozzarella, half sausage", zh: "一半拉丝芝士，一半香肠", ja: "半分モッツァレラ、半分ソーセージ", vi: "Phô mai kéo dài, nửa xúc xích nửa phô mai" } },
      { price: 40000, name: { ko: "통모짜 핫도그", en: "All Mozza Hotdog", zh: "全芝士热狗", ja: "オールモッツァレラホットドッグ", vi: "All mozza hotdog" },
        desc: { ko: "100% 모짜렐라", en: "100% mozzarella", zh: "100%马苏里拉芝士", ja: "モッツァレラ100%", vi: "Mozza 100% tự nhiên" } },
      { price: 35000, name: { ko: "체다치즈 핫도그", en: "Cheddar Hotdog", zh: "切达芝士热狗", ja: "チェダーチーズホットドッグ", vi: "Cheddar hotdog" } },
      { price: 30000, name: { ko: "유원 핫도그 (소시지)", en: "Youone Hotdog (sausage)", zh: "Youone原味热狗（香肠）", ja: "ユウォン ホットドッグ（ソーセージ）", vi: "Youone hotdog (xúc xích)" } },
      { price: 30000, name: { ko: "떡 핫도그", en: "Rice Cake Hotdog", zh: "年糕热狗", ja: "トック（餅）ホットドッグ", vi: "Tok hotdog (bánh gạo)" } },
      { price: 25000, name: { ko: "미니 핫도그", en: "Mini Hotdog", zh: "迷你热狗", ja: "ミニホットドッグ", vi: "Mini hotdog" } },
      { price: 60000, tag: "new", name: { ko: "츄러스 도그", en: "Churro Dog", zh: "吉事果热狗", ja: "チュロスドッグ", vi: "Churro dog" }, desc: { ko: "소시지 + 츄러스", en: "Sausage wrapped in churro", zh: "香肠＋吉事果", ja: "ソーセージ＋チュロス", vi: "Xúc xích cùng với churros" } },
    ],
  },
  {
    id: "topping",
    name: { ko: "토핑 · 소스 추가", en: "Toppings & Extra Sauces", zh: "加料 · 酱料", ja: "トッピング・追加ソース", vi: "Thêm topping & sốt" },
    note: { ko: "핫도그에 토핑을 더할 수 있어요", en: "Add a coating or sauce to any hotdog", zh: "热狗可加料或加酱", ja: "ホットドッグにトッピング・ソースを追加できます", vi: "Thêm topping hoặc sốt cho hotdog" },
    items: [
      { price: 5000, name: { ko: "감자 토핑", en: "Potato Coating", zh: "土豆丁裹衣", ja: "ポテトトッピング", vi: "Khoai tây" } },
      { price: 3000, name: { ko: "라면 토핑", en: "Ramen Noodle Coating", zh: "方便面裹衣", ja: "ラーメントッピング", vi: "Mì tôm" } },
      { price: 2000, name: { ko: "치즈 가루", en: "Cheese Powder", zh: "芝士粉", ja: "チーズパウダー", vi: "Lắc phô mai" } },
      { price: 0, desc: { ko: "무료", en: "Free", zh: "免费", ja: "無料", vi: "Miễn phí" }, name: { ko: "설탕 묻히기", en: "Sugar Coating", zh: "裹糖", ja: "砂糖まぶし", vi: "Lăn đường" } },
      { price: 10000, name: { ko: "허니머스터드", en: "Honey Mustard", zh: "蜂蜜芥末酱", ja: "ハニーマスタード", vi: "Mù tạt mật ong" } },
      { price: 13000, name: { ko: "갈릭마요", en: "Garlic Mayo", zh: "蒜香蛋黄酱", ja: "ガーリックマヨ", vi: "Garlic mayo" } },
      { price: 13000, name: { ko: "스위트마요", en: "Sweet Mayo", zh: "甜蛋黄酱", ja: "スイートマヨ", vi: "Sweet mayo" } },
      { price: 15000, name: { ko: "스위트칠리", en: "Sweet Chilli", zh: "甜辣酱", ja: "スイートチリ", vi: "Sweet chilli" } },
      { price: 10000, name: { ko: "초코 딥", en: "Choco Dip", zh: "巧克力蘸酱", ja: "チョコディップ", vi: "Choco dip" } },
    ],
  },
  {
    id: "combo",
    photo: "img/combo.jpg",
    name: { ko: "콤보 메뉴", en: "Combo Menu", zh: "套餐", ja: "コンボメニュー", vi: "Combo" },
    items: [
      { price: 99000, name: { ko: "모짜 고구마 콤보", en: "Mozza & Sweet Potato Combo", zh: "芝士红薯套餐", ja: "モッツァ＆さつまいもコンボ", vi: "Mozza Khoai lang combo" },
        desc: { ko: "고구마 치즈 핫도그 + 모짜렐라 핫도그 + 콜라", en: "Sweet potato cheese hotdog, mozza hotdog and a Coke", zh: "红薯芝士热狗＋芝士热狗＋可乐", ja: "さつまいもチーズ＋モッツァレラ＋コーラ", vi: "Goguma, Mozza, Coca" } },
      { price: 118000, name: { ko: "샐러드 샌드 콤보", en: "Salad Sand Combo", zh: "沙拉三明治套餐", ja: "サラダサンドコンボ", vi: "Salad sand combo" },
        desc: { ko: "샐러드 샌드 + 감자튀김 + 콜라", en: "Salad sand, fries and a Coke", zh: "沙拉三明治＋薯条＋可乐", ja: "サラダサンド＋フライドポテト＋コーラ", vi: "Sandwich chiên, khoai tây chiên, coca" } },
      { price: 98000, name: { ko: "아메리카노 츄러스 콤보", en: "Americano Churros Combo", zh: "美式咖啡吉事果套餐", ja: "アメリカーノ＆チュロスコンボ", vi: "Americano Churros combo" },
        desc: { ko: "츄러스 3개 + 아메리카노 콜드브루", en: "3 churros and a cold brew Americano", zh: "吉事果3根＋冷萃美式", ja: "チュロス3本＋コールドブリュー", vi: "Churros 3c, Americano cold brew" } },
      { price: 118000, name: { ko: "아메리카노 에그마요 샌드 콤보", en: "Americano Eggmayo Sand Combo", zh: "美式咖啡蛋沙拉三明治套餐", ja: "アメリカーノ＆エッグマヨサンドコンボ", vi: "Americano Eggmayo sand combo" },
        desc: { ko: "에그마요 샌드 + 아메리카노 콜드브루", en: "Eggmayo sand and a cold brew Americano", zh: "蛋沙拉三明治＋冷萃美式", ja: "エッグマヨサンド＋コールドブリュー", vi: "Eggmayo sand, Americano cold brew" } },
      { price: 189000, tag: "best", name: { ko: "커플 콤보", en: "Couple Combo", zh: "情侣套餐", ja: "カップルコンボ", vi: "Couple combo" },
        desc: { ko: "핫보끼 S + 유원 핫도그 + 더블치즈 핫도그 (2인)", en: "Hot tokbokki S, Youone hotdog and double cheese hotdog (for 2)", zh: "辣炒年糕S＋原味热狗＋双重芝士热狗（2人）", ja: "ホットッポッキS＋ユウォンホットドッグ＋ダブルチーズ（2人）", vi: "Hotbokki S, Youone hotdog, Double cheese hotdog (2 người)" } },
      { price: 148000, name: { ko: "싱글 콤보", en: "Single Combo", zh: "单人套餐", ja: "シングルコンボ", vi: "Single combo" } },
    ],
  },
  {
    id: "sand",
    photo: "img/sand.jpg",
    name: { ko: "샌드", en: "Sands", zh: "三明治", ja: "サンド", vi: "Sandwich" },
    items: [
      { price: 70000, tag: "new", name: { ko: "에그마요 샌드", en: "Eggmayo Sand", zh: "蛋沙拉三明治", ja: "エッグマヨサンド", vi: "Eggmayo sand" },
        desc: { ko: "모짜렐라 + 삶은 달걀 + 특제 소스 + 양파", en: "Mozzarella, boiled egg, special sauce and onion", zh: "马苏里拉＋水煮蛋＋特制酱＋洋葱", ja: "モッツァレラ＋ゆで卵＋特製ソース＋玉ねぎ", vi: "Có phô mai mozzarella bên trong, trứng luộc, sốt đặc biệt, hành tây" } },
      { price: 60000, tag: "new", name: { ko: "샐러드 샌드", en: "Salad Sand", zh: "沙拉三明治", ja: "サラダサンド", vi: "Salad sand" },
        desc: { ko: "소시지 + 양배추 샐러드", en: "Sausage with cabbage salad", zh: "香肠＋卷心菜沙拉", ja: "ソーセージ＋キャベツサラダ", vi: "Xúc xích + salad bắp cải" } },
      { price: 80000, name: { ko: "핫치킨 샌드", en: "Hot Chicken Sand", zh: "辣鸡三明治", ja: "ホットチキンサンド", vi: "Hot chicken sand" },
        desc: { ko: "매콤한 치킨 + 체다치즈", en: "Spicy fried chicken with cheddar", zh: "香辣炸鸡＋切达芝士", ja: "ピリ辛チキン＋チェダーチーズ", vi: "Bởi hot chicken, gà chiên, có phô mai cheddar bên trong" } },
      { price: 80000, name: { ko: "포테이토 콘 치즈 샌드", en: "Potato Corn Cheese Sand", zh: "土豆玉米芝士三明治", ja: "ポテトコーンチーズサンド", vi: "Potato corn cheese sand" },
        desc: { ko: "으깬 감자 + 옥수수 + 치즈", en: "Mashed potato, corn and cheese", zh: "土豆泥＋玉米＋芝士", ja: "マッシュポテト＋コーン＋チーズ", vi: "Khoai tây nghiền, ngô, bên trong có phô mai" } },
    ],
  },
  {
    id: "tokbokki",
    photo: "img/tokbokki.jpg",
    name: { ko: "떡볶이", en: "Tokbokki", zh: "炒年糕", ja: "トッポッキ", vi: "Tokbokki" },
    note: SL,
    items: [
      { sizes: [[S, 120000], [LG, 230000]], spicy: true, name: { ko: "핫 떡볶이", en: "Hot Tokbokki", zh: "辣炒年糕", ja: "ホットッポッキ", vi: "Hot tokbokki" }, desc: { ko: "부산식, 맵고 맛있게", en: "Busan style, spicy", zh: "釜山风味，香辣", ja: "釜山風のピリ辛", vi: "Vừa cay vừa ngon, tokbokki kiểu Busan" } },
      { sizes: [[S, 130000], [LG, 250000]], tag: "best", spicy: true, name: { ko: "치즈 떡볶이", en: "Cheese Tokbokki", zh: "芝士炒年糕", ja: "チーズトッポッキ", vi: "Cheese bokki" } },
      { sizes: [[S, 129000], [LG, 249000]], name: { ko: "로제 떡볶이", en: "Rosé Tokbokki", zh: "奶油番茄炒年糕", ja: "ロゼトッポッキ", vi: "Rose bokki" }, desc: { ko: "고소하고 살짝 매콤", en: "Creamy and a little spicy", zh: "浓郁微辣", ja: "クリーミーで少しピリ辛", vi: "Thơm ngon ngậy béo một chút cay" } },
      { sizes: [[S, 139000], [LG, 279000]], name: { ko: "로제 치즈 떡볶이", en: "Rosé Cheese Tokbokki", zh: "奶油番茄芝士炒年糕", ja: "ロゼチーズトッポッキ", vi: "Rose cheese bokki" } },
      { sizes: [[S, 131000], [LG, 251000]], name: { ko: "크림 떡볶이", en: "Cream Tokbokki", zh: "奶油炒年糕", ja: "クリームトッポッキ", vi: "Cream bokki" }, desc: { ko: "맵지 않고 달콤 고소", en: "Sweet, creamy and not spicy", zh: "香甜浓郁不辣", ja: "辛くない甘いクリーム味", vi: "Ngậy béo ngọt không cay" } },
    ],
  },
  {
    id: "side",
    photo: "img/side.jpg",
    name: { ko: "사이드", en: "Sides", zh: "小食", ja: "サイドメニュー", vi: "Món phụ" },
    items: [
      { sizes: [[{ ko: "3개", en: "3 pcs", zh: "3个", ja: "3個", vi: "3 viên" }, 30000], [{ ko: "5개", en: "5 pcs", zh: "5个", ja: "5個", vi: "5 viên" }, 45000]], name: { ko: "치즈볼", en: "Cheese Balls", zh: "芝士球", ja: "チーズボール", vi: "Cheese balls" } },
      { price: 55000, name: { ko: "치킨팝", en: "Chicken Pop", zh: "鸡米花", ja: "チキンポップ", vi: "Chicken pop" } },
      { price: 45000, name: { ko: "감자튀김", en: "French Fries", zh: "薯条", ja: "フライドポテト", vi: "Khoai tây chiên" } },
    ],
  },
  {
    id: "churros",
    photo: "img/churros.jpg",
    name: { ko: "츄러스 · 아이스크림", en: "Churros & Ice Cream", zh: "吉事果 · 冰淇淋", ja: "チュロス・アイス", vi: "Churros & Kem" },
    items: [
      { price: 50000, name: { ko: "츄러스 3개", en: "Churros (3 pcs)", zh: "吉事果（3根）", ja: "チュロス（3本）", vi: "Churros 3 cái" } },
      { price: 58000, tag: "best", name: { ko: "츄러스 4개 + 초코 소스", en: "Churros (4 pcs) + Choco Sauce", zh: "吉事果（4根）＋巧克力酱", ja: "チュロス（4本）＋チョコソース", vi: "Churros 4 cái + choco sauce" } },
      { price: 30000, tag: "best", name: { ko: "아이스크림 츄러스", en: "Ice Cream Churros", zh: "冰淇淋吉事果", ja: "アイスクリームチュロス", vi: "Kem churros" } },
      { price: 25000, name: { ko: "초코 선데", en: "Choco Sundae", zh: "巧克力圣代", ja: "チョコサンデー", vi: "Choco sundae" } },
      { price: 25000, name: { ko: "딸기 선데", en: "Strawberry Sundae", zh: "草莓圣代", ja: "ストロベリーサンデー", vi: "Strawberry sundae" } },
      { price: 10000, name: { ko: "콘 아이스크림", en: "Ice Cream Cone", zh: "甜筒冰淇淋", ja: "ソフトクリーム（コーン）", vi: "Kem ốc quế" } },
      { price: 70000, name: { ko: "팥빙수", en: "Red Bean Bingsu", zh: "红豆刨冰", ja: "あずきピンス", vi: "Bingsu đậu đỏ" } },
      { price: 80000, tag: "best", name: { ko: "딸기빙수", en: "Strawberry Bingsu", zh: "草莓刨冰", ja: "いちごピンス", vi: "Bingsu dâu tây" } },
    ],
  },
  {
    id: "drinks",
    name: { ko: "음료", en: "Drinks", zh: "饮料", ja: "ドリンク", vi: "Đồ uống" },
    items: [
      { price: 50000, name: { ko: "아메리카노 콜드브루", en: "Americano Cold Brew", zh: "冷萃美式咖啡", ja: "アメリカーノ コールドブリュー", vi: "Americano cold brew" } },
      { price: 65000, name: { ko: "곡물 라떼", en: "Whole Grain Latte", zh: "谷物拿铁", ja: "穀物ラテ", vi: "Whole grain latte" } },
      { price: 75000, name: { ko: "말차 라떼", en: "Matcha Latte", zh: "抹茶拿铁", ja: "抹茶ラテ", vi: "Matcha latte" } },
      { price: 65000, name: { ko: "초코 라떼", en: "Choco Latte", zh: "巧克力拿铁", ja: "チョコラテ", vi: "Choco latte" } },
      { price: 35000, name: { ko: "복숭아 아이스티", en: "Peach Iced Tea", zh: "桃子冰茶", ja: "ピーチアイスティー", vi: "Trà đào" } },
      { price: 35000, name: { ko: "레몬 아이스티", en: "Lemon Iced Tea", zh: "柠檬冰茶", ja: "レモンアイスティー", vi: "Trà chanh" } },
      { price: 40000, name: { ko: "블루 레몬에이드", en: "Blue Lemonade", zh: "蓝柠檬气泡饮", ja: "ブルーレモネード", vi: "Blue lemon ade" } },
      { price: 50000, name: { ko: "밀크티", en: "Milk Tea", zh: "奶茶", ja: "ミルクティー", vi: "Trà sữa" } },
      { price: 55000, name: { ko: "딸기 바나나 스무디", en: "Strawberry Banana Smoothie", zh: "草莓香蕉奶昔", ja: "いちごバナナスムージー", vi: "Sinh tố dâu chuối" } },
      { price: 20000, name: { ko: "콜라 · 스프라이트", en: "Coke · Sprite", zh: "可乐 · 雪碧", ja: "コーラ・スプライト", vi: "Coca / Sprite" } },
    ],
  },
];
