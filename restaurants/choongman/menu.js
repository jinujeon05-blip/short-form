// 충만치킨 Choong Man Chicken (Sunshine City, Hà Nội) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "QR메뉴판/충만치킨 션샤인" 폴더의 구글 지도 캡처 (가게 계정이 올린 메뉴판 9면, 3개월 전).
// 한국어·영어·베트남어는 메뉴판 표기, 중국어·일본어는 번역. 가격은 부가세(VAT) 별도.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격 / sizes: [[{ko,en,…}, 가격], …] / tag: "new" · "best" / spicy: true
window.RESTAURANT = {
  brand: { ko: "충만치킨", en: "Choong Man Chicken", sub: "Korean Chicken", branch: "Sunshine City" },
  phone: "0336 562 936",
  address: "S3 SH01, Sunshine City, Khu đô thị Ciputra, Phú Thượng, Hà Nội",   // 구글 지도·간판 기준
  mapQuery: "Choong Man Chicken Sunshine City",
  wifi: null,
};

const L = (s) => ({ ko: s, en: s, zh: s, ja: s, vi: s });
const M = L("M"), LG = L("L");
const ml = (m, l) => [[M, m], [LG, l]];
const TWO = { ko: "순한맛 / 매운맛 선택", en: "Mild or spicy", zh: "可选微辣／辣", ja: "マイルド／辛口から選べます", vi: "Chọn ít cay / cay" };

window.MENU = [
  {
    id: "original",
    photo: "img/chicken.jpg",
    name: { ko: "오리지널 시리즈", en: "Original Series", zh: "经典炸鸡系列", ja: "オリジナルシリーズ", vi: "Original Series" },
    note: { ko: "크기 M · L", en: "Sizes M · L", zh: "份量 M · L", ja: "サイズ M・L", vi: "Cỡ M · L" },
    items: [
      { sizes: ml(180000, 330000), tag: "best", name: { ko: "충만후라이드", en: "CM Fried Chicken", zh: "忠满原味炸鸡", ja: "チュンマン フライドチキン", vi: "Gà Chiên Choongman" } },
      { sizes: ml(190000, 350000), spicy: true, name: { ko: "마늘양념치킨", en: "Spicy Garlic Chicken", zh: "蒜香甜辣炸鸡", ja: "にんにくヤンニョムチキン", vi: "Gà chiên sốt tỏi cay ngọt" }, desc: { ko: "순한맛(달콤 매콤) / 매운맛 선택", en: "Sweet & spicy or extra spicy", zh: "可选甜辣／辣", ja: "甘辛／辛口から選べます", vi: "Chọn ngọt & cay / cay" } },
      { sizes: ml(190000, 350000), spicy: true, name: { ko: "레드핫치킨", en: "Red Hot Chicken", zh: "红辣炸鸡", ja: "レッドホットチキン（激辛）", vi: "Gà cay nóng" } },
      { sizes: ml(190000, 350000), spicy: true, name: { ko: "마늘 간장치킨", en: "Soy Garlic Chicken", zh: "蒜香酱油炸鸡", ja: "にんにく醤油チキン", vi: "Gà rán sốt nước tương tỏi" } },
      { sizes: ml(190000, 350000), name: { ko: "치즈몬스터", en: "Cheese Fried Chicken", zh: "芝士炸鸡", ja: "チーズモンスター", vi: "Gà Chiên phô mai" } },
      { sizes: [[M, 280000]], name: { ko: "카스테라치킨", en: "Castella Chicken", zh: "蛋糕粉炸鸡", ja: "カステラチキン", vi: "Gà rán Castella" } },
      { sizes: ml(210000, 380000), spicy: true, name: { ko: "간장파닭", en: "Soy Garlic Green Onion Chicken", zh: "酱油葱丝炸鸡", ja: "醤油ネギチキン", vi: "Gà chiên sốt tương phủ hành" } },
      { sizes: ml(200000, 360000), spicy: true, name: { ko: "맵스노우", en: "Snow + Spicy Garlic Chicken", zh: "雪花洋葱辣蒜炸鸡", ja: "辛スノー（雪玉ねぎ＋辛にんにく）", vi: "Gà chiên cay phủ sốt hành tuyết" } },
    ],
  },
  {
    id: "tikku",
    photo: "img/tikku.jpg",
    name: { ko: "티꾸닭 시리즈", en: "Tikkutak Series", zh: "炭烤炸鸡系列", ja: "ティックタクシリーズ", vi: "Tikkutak Series" },
    note: { ko: "튀긴 치킨을 숯불에 한 번 더 구워 기름은 빼고 겉은 바삭, 속은 촉촉 · 크기 M · L",
      en: "Fried, then grilled over charcoal — crispy, juicy and not greasy · Sizes M · L",
      zh: "先炸后炭烤，去油更香，外脆里嫩 · 份量 M · L",
      ja: "揚げてから炭火で焼き上げ、余分な油を落としてカリッとジューシー・サイズ M・L",
      vi: "Gà chiên rồi nướng trên bếp than, giòn rụm, mọng nước, không ngấy · Cỡ M · L" },
    items: [
      { sizes: ml(210000, 390000), tag: "best", spicy: true, name: { ko: "간장 티꾸닭", en: "Tikku Chicken with Soy Garlic", zh: "酱油炭烤鸡", ja: "醤油ティックタク", vi: "Gà Tikku sốt nước tương" } },
      { sizes: ml(210000, 390000), spicy: true, name: { ko: "고추장 티꾸닭", en: "Tikku Chicken with Gochujang", zh: "辣酱炭烤鸡", ja: "コチュジャン ティックタク（激辛）", vi: "Gà Tikku sốt gojujang" } },
      { sizes: ml(210000, 390000), spicy: true, name: { ko: "커리 티꾸닭", en: "Tikku Chicken with Curry Sauce", zh: "咖喱炭烤鸡", ja: "カレー ティックタク", vi: "Gà Tikku cà ri" } },
      { sizes: ml(210000, 390000), spicy: true, name: { ko: "갈릭 티꾸닭", en: "Tikku Chicken with Garlic Sauce", zh: "蒜香炭烤鸡", ja: "ガーリック ティックタク", vi: "Gà Tikku Tỏi" } },
      { sizes: ml(210000, 390000), spicy: true, name: { ko: "하오츠 티꾸닭 (양꼬치 소스)", en: "Chinese Tikku Chicken (lamb skewer sauce)", zh: "好吃炭烤鸡（羊肉串酱）", ja: "ハオチー ティックタク（羊串ソース）", vi: "Gà Tikku sốt cay tứ xuyên" } },
    ],
  },
  {
    id: "snow",
    photo: "img/snow.jpg",
    name: { ko: "스노우어니언 · 순살 콤보", en: "Snow Onion & Boneless Combos", zh: "雪花洋葱 · 无骨拼盘", ja: "スノーオニオン・骨なしコンボ", vi: "Snow Onion & Combo không xương" },
    note: { ko: "바삭한 치킨에 생양파를 듬뿍 올리고 스노우 소스를 뿌린 충만치킨 원조 어니언 치킨",
      en: "Choongman's original onion chicken — crispy chicken topped with fresh onion and Snow Onion sauce",
      zh: "忠满原创洋葱炸鸡：脆皮炸鸡铺满新鲜洋葱，淋上特制雪花酱",
      ja: "チュンマン元祖オニオンチキン。カリッと揚げたチキンに生玉ねぎとスノーソースをたっぷり",
      vi: "Onion Chicken nguyên bản của Choongman: gà rán giòn phủ nhiều hành tây tươi và sốt Snow Onion" },
    items: [
      { sizes: ml(200000, 380000), tag: "best", name: { ko: "스노우 어니언", en: "Snow Onion Chicken", zh: "雪花洋葱炸鸡", ja: "スノーオニオンチキン", vi: "Gà Chiên phủ hành tuyết" } },
      { sizes: ml(210000, 400000), spicy: true, name: { ko: "커리 스노우 어니언", en: "Curry Snow Onion Chicken", zh: "咖喱雪花洋葱炸鸡", ja: "カレー スノーオニオン", vi: "Gà Chiên phủ hành tuyết cà ri" } },
      { sizes: ml(210000, 400000), spicy: true, name: { ko: "핫 스노우 어니언", en: "Hot Snow Onion Chicken", zh: "香辣雪花洋葱炸鸡", ja: "ホット スノーオニオン", vi: "Gà Chiên phủ hành tuyết sốt cay" } },
      { price: 450000, name: { ko: "순살 4콤보", en: "Boneless Combo 4", zh: "无骨四拼", ja: "骨なし4種コンボ", vi: "Combo 4" },
        desc: { ko: "후라이드 · 간장 · 레드핫 · 치즈", en: "Fried, soy sauce, red hot, cheese", zh: "原味 · 酱油 · 红辣 · 芝士", ja: "フライド・醤油・レッドホット・チーズ", vi: "Gà Chiên Choongman, sốt nước tương, cay nóng, phô mai" } },
      { price: 520000, name: { ko: "순살 5콤보", en: "Boneless Combo 5", zh: "无骨五拼", ja: "骨なし5種コンボ", vi: "Combo 5" },
        desc: { ko: "스노우어니언 · 후라이드 · 간장 · 레드핫 · 치즈", en: "Snow onion, fried, soy sauce, red hot, cheese", zh: "雪花洋葱 · 原味 · 酱油 · 红辣 · 芝士", ja: "スノーオニオン・フライド・醤油・レッドホット・チーズ", vi: "Phủ hành tuyết, Choongman, sốt nước tương, cay nóng, phô mai" } },
    ],
  },
  {
    id: "jjim",
    photo: "img/jjim.jpg",
    name: { ko: "찜닭 · 탕", en: "Braised Chicken & Soups", zh: "炖鸡 · 汤锅", ja: "チムタク・鍋", vi: "Gà kho & Canh" },
    items: [
      { sizes: [[M, 260000]], spicy: true, name: { ko: "충만찜닭 (1~2인분)", en: "Korean Braised Chicken (1–2 servings)", zh: "忠满炖鸡（1~2人份）", ja: "チュンマン チムタク（1〜2人前）", vi: "Gà kho Hàn Quốc (1~2 người)" } },
      { sizes: ml(260000, 490000), tag: "best", name: { ko: "안동찜닭", en: "Andong Braised Chicken in Soy Sauce", zh: "安东炖鸡", ja: "安東チムタク", vi: "Gà kho Andong" } },
      { sizes: ml(260000, 490000), name: { ko: "로제찜닭", en: "Rosé Braised Chicken", zh: "奶油番茄炖鸡", ja: "ロゼ チムタク", vi: "Gà kho Rose" } },
      { sizes: ml(260000, 490000), spicy: true, name: { ko: "순살 닭도리탕", en: "Boneless Spicy Chicken Stew", zh: "无骨辣炖鸡块", ja: "骨なしタットリタン", vi: "Gà hầm cay không xương Hàn Quốc" }, desc: { ko: "조금 매운맛 / 많이 매운맛 선택", en: "Less spicy or very spicy", zh: "可选微辣／特辣", ja: "少し辛い／とても辛いから選べます", vi: "Chọn ít cay / rất cay" } },
      { price: 400000, spicy: true, name: { ko: "감자탕 (2~3인분)", en: "Pork Backbone Stew (2–3 servings)", zh: "土豆排骨汤（2~3人份）", ja: "カムジャタン（2〜3人前）", vi: "Canh xương khoai tây (2~3 người)" } },
      { price: 250000, name: { ko: "오뎅탕", en: "Korean Fish Cake Soup", zh: "鱼饼汤", ja: "おでん鍋", vi: "Canh chả cá" } },
      { price: 350000, name: { ko: "어묵홍합탕", en: "Fish Cake & Mussel Soup", zh: "鱼饼青口汤", ja: "おでんとムール貝の鍋", vi: "Canh Vẹm" } },
    ],
  },
  {
    id: "tteok",
    photo: "img/tteok.jpg",
    name: { ko: "떡볶이 · 돈까스", en: "Tteokbokki & Pork Cutlet", zh: "炒年糕 · 炸猪排", ja: "トッポッキ・とんかつ", vi: "Tteokbokki & Thịt chiên xù" },
    items: [
      { price: 140000, spicy: true, name: { ko: "충만 떡볶이", en: "Choongman Tteokbokki", zh: "忠满炒年糕", ja: "チュンマン トッポッキ", vi: "Tteokbokki Choongman" } },
      { price: 180000, spicy: true, name: { ko: "치즈 떡볶이", en: "Cheese Tteokbokki", zh: "芝士炒年糕", ja: "チーズトッポッキ", vi: "Tteokbokki phô mai" } },
      { price: 160000, name: { ko: "짜장 떡볶이", en: "Jjajang Tteokbokki", zh: "炸酱炒年糕", ja: "チャジャン トッポッキ", vi: "Tteokbokki tương đen" } },
      { price: 180000, name: { ko: "로제 떡볶이", en: "Rosé Tteokbokki", zh: "奶油番茄炒年糕", ja: "ロゼトッポッキ", vi: "Tteokbokki Rose" } },
      { price: 150000, name: { ko: "돈까스", en: "Pork Cutlet", zh: "炸猪排", ja: "とんかつ", vi: "Thịt chiên xù" } },
      { price: 180000, name: { ko: "치즈 돈까스", en: "Cheese Stuffed Pork Cutlet", zh: "芝士炸猪排", ja: "チーズとんかつ", vi: "Thịt chiên xù phô mai" } },
    ],
  },
  {
    id: "anju",
    photo: "img/anju.jpg",
    name: { ko: "안주", en: "Bar Snacks", zh: "下酒菜", ja: "おつまみ", vi: "Đồ nhậu" },
    items: [
      { price: 160000, name: { ko: "후라이드 똥집", en: "Fried Chicken Gizzards", zh: "炸鸡胗", ja: "砂肝の唐揚げ", vi: "Mề gà Chiên" } },
      { price: 160000, name: { ko: "티꾸 간장 똥집", en: "Tikku Chicken Gizzards with Soy Sauce", zh: "炭烤酱油鸡胗", ja: "ティック 醤油砂肝", vi: "Mề gà Tikku sốt nước tương" } },
      { price: 160000, spicy: true, name: { ko: "티꾸 고추장 똥집", en: "Tikku Chicken Gizzards with Gochujang", zh: "炭烤辣酱鸡胗", ja: "ティック コチュジャン砂肝", vi: "Mề gà Tikku sốt gojujang" } },
      { price: 340000, name: { ko: "똥집 모듬", en: "Chicken Gizzard Platter", zh: "鸡胗拼盘", ja: "砂肝盛り合わせ", vi: "Combo Mề Gà" } },
      { price: 380000, spicy: true, name: { ko: "골뱅이 소면", en: "Spicy Sea Snails with Noodles", zh: "辣拌海螺细面", ja: "コルベンイ（つぶ貝）和え麺", vi: "Mì trộn ốc biển" } },
      { price: 250000, spicy: true, name: { ko: "충만 무뼈닭발 (1~2인분)", en: "CM Spicy Boneless Chicken Feet (1–2 servings)", zh: "忠满无骨辣鸡爪（1~2人份）", ja: "チュンマン 骨なし鶏足（1〜2人前）", vi: "Chân gà rút xương xào cay CM (1~2 người)" } },
      { price: 220000, name: { ko: "먹태 & 견과류", en: "Dried Pollack & Nuts", zh: "明太鱼干＆坚果", ja: "モクテ＆ナッツ", vi: "Cá minh thái & Đỗ lạc" } },
      { price: 220000, name: { ko: "쥐포구이 & 견과류", en: "Grilled Fish Jerky & Nuts", zh: "烤鱼片＆坚果", ja: "焼きカワハギ干し＆ナッツ", vi: "Cá bò khô nướng & Đỗ lạc" } },
    ],
  },
  {
    id: "side",
    photo: "img/side.jpg",
    name: { ko: "튀김 · 샐러드", en: "Fried Sides & Salads", zh: "炸物 · 沙拉", ja: "揚げ物・サラダ", vi: "Đồ chiên & Salad" },
    items: [
      { price: 60000, name: { ko: "튀김 (1가지 선택)", en: "Fried Foods (choose one)", zh: "炸物（任选一种）", ja: "揚げ物（1種選択）", vi: "Đồ chiên (chọn 1)" },
        desc: { ko: "오징어 · 만두 · 고구마 · 김말이", en: "Squid, dumplings, sweet potato or seaweed rolls", zh: "鱿鱼 · 饺子 · 红薯 · 紫菜卷", ja: "イカ・餃子・さつまいも・海苔巻き揚げ", vi: "Mực Ống, Há Cảo, Khoai Lang, Rong Biển Cuốn" } },
      { price: 180000, name: { ko: "모듬튀김", en: "Assorted Fried Foods", zh: "什锦炸物", ja: "揚げ物盛り合わせ", vi: "Set đồ chiên tổng hợp" },
        desc: { ko: "오징어 · 만두 · 고구마 · 김말이", en: "Squid, dumplings, sweet potato, seaweed rolls", zh: "鱿鱼 · 饺子 · 红薯 · 紫菜卷", ja: "イカ・餃子・さつまいも・海苔巻き揚げ", vi: "Mực Ống, Há Cảo, Khoai Lang, Rong Biển Cuốn" } },
      { price: 70000, name: { ko: "뿌링클 감자튀김", en: "Purinkle French Fries", zh: "芝士粉薯条", ja: "プリンクル フライドポテト", vi: "Khoai tây chiên lắc phô mai" } },
      { price: 100000, name: { ko: "새우튀김 5개", en: "Fried Shrimp (5 pcs)", zh: "炸虾（5只）", ja: "エビフライ（5本）", vi: "Tôm chiên xù - 5 cái" },
        desc: { ko: "1개 추가 20K", en: "Add 1 pc: 20K", zh: "加1只 20K", ja: "1本追加 20K", vi: "Thêm 1 cái: 20K" } },
      { price: 60000, name: { ko: "치즈볼 3개", en: "Cheese Balls (3 pcs)", zh: "芝士球（3个）", ja: "チーズボール（3個）", vi: "Phô mai viên chiên - 3 cái" } },
      { price: 140000, name: { ko: "화이트소스 치킨 샐러드", en: "Chicken Salad with Mayonnaise Sauce", zh: "白酱炸鸡沙拉", ja: "ホワイトソース チキンサラダ", vi: "Salad gà Mayo Hàn Quốc" } },
      { price: 80000, name: { ko: "화이트소스 샐러드", en: "Salad with Mayonnaise Sauce", zh: "白酱沙拉", ja: "ホワイトソース サラダ", vi: "Salad sốt Mayo Hàn Quốc" } },
    ],
  },
  {
    id: "meal",
    photo: "img/meal.jpg",
    name: { ko: "밥 · 면", en: "Rice & Noodles", zh: "米饭 · 面食", ja: "ご飯・麺", vi: "Cơm & Mì" },
    items: [
      { price: 90000, name: { ko: "스팸마요덮밥", en: "Spam Mayonnaise Rice Bowl", zh: "午餐肉蛋黄酱盖饭", ja: "スパムマヨ丼", vi: "Cơm trộn sốt Mayon" } },
      { price: 90000, name: { ko: "충만주먹밥", en: "Rice Balls (Jumeokbap)", zh: "忠满饭团", ja: "チュンマン おにぎり", vi: "Cơm nắm rong biển" },
        desc: { ko: "오리지널 / 순한맛(키즈) 선택", en: "Original or not spicy (kids)", zh: "可选原味／不辣（儿童）", ja: "オリジナル／辛くない（キッズ）", vi: "Vị nguyên bản / Không cay (KIDS)" } },
      { price: 20000, name: { ko: "공기밥", en: "Bowl of Rice", zh: "白米饭", ja: "ライス", vi: "Cơm trắng" } },
      { price: 100000, name: { ko: "어묵우동", en: "Fish Cake Udon", zh: "鱼饼乌冬面", ja: "おでんうどん", vi: "Mì udong chả cá Hàn Quốc" } },
      { price: 80000, name: { ko: "라면", en: "Korean Ramen", zh: "韩式拉面", ja: "ラーメン", vi: "Mì tôm Hàn Quốc" }, desc: TWO },
      { price: 80000, name: { ko: "짜파게티", en: "Jjapaghetti", zh: "炸酱方便面", ja: "チャパゲティ", vi: "Mì tương đen" } },
      { price: 100000, name: { ko: "물냉면", en: "Mul-Naengmyeon (cold noodle soup)", zh: "水冷面", ja: "水冷麺", vi: "Mì lạnh (nước)" } },
      { price: 100000, spicy: true, name: { ko: "비빔냉면", en: "Bibim-Naengmyeon (spicy cold noodles)", zh: "拌冷面", ja: "ビビン冷麺", vi: "Mì lạnh (trộn, có kèm nước dùng)" } },
    ],
  },
  {
    id: "drinks",
    photo: "img/drinks.jpg",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水 · 饮料", ja: "お酒・ドリンク", vi: "Đồ uống" },
    items: [
      { price: 140000, name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "焼酎", vi: "Soju" },
        desc: { ko: "참이슬 · 새로 · 진로이즈백 · 처음처럼 · 산양", en: "Chamisul, Saero, Jinro Is Back, Chum Churum, Sanyang", zh: "真露 · Saero · 真露Is Back · 初饮初乐 · 山阳", ja: "チャミスル・セロ・ジンロ イズバック・チョウムチョロム・サニャン", vi: "Chamisul, Saero, Jinro Is Back, Chum Churum, Sanyang" } },
      { price: 50000, name: { ko: "캔맥주 (타이거)", en: "Canned Beer (Tiger)", zh: "罐装啤酒（老虎）", ja: "缶ビール（タイガー）", vi: "Bia lon Tiger" } },
      { price: 60000, name: { ko: "생맥주 (삿포로 · 칼스버그)", en: "Draft Beer (Sapporo, Carlsberg)", zh: "生啤（札幌 · 嘉士伯）", ja: "生ビール（サッポロ・カールスバーグ）", vi: "Bia tươi (Sapporo, Carlsberg)" } },
      { price: 120000, name: { ko: "충만 하이볼 (얼그레이 · 자몽)", en: "Soda Highball (Earl Grey, Grapefruit)", zh: "忠满嗨棒（伯爵茶 · 西柚）", ja: "チュンマン ハイボール（アールグレイ・グレープフルーツ）", vi: "Nước soda highball (vị trà bá tước, vị bưởi)" } },
      { price: 70000, name: { ko: "레몬에이드 (블루 · 핑크 · 옐로우)", en: "Sparkling Lemonade (Blue, Pink, Yellow)", zh: "柠檬气泡饮（蓝 · 粉 · 黄）", ja: "レモネード（ブルー・ピンク・イエロー）", vi: "Nước soda vị chanh (xanh, hồng, vàng)" } },
      { price: 20000, name: { ko: "콜라 · 스프라이트 · 환타 · 제로콜라 · 탄산수", en: "Coke, Sprite, Fanta, Coke Zero, Sparkling Water", zh: "可乐 · 雪碧 · 芬达 · 零度可乐 · 苏打水", ja: "コーラ・スプライト・ファンタ・コーラゼロ・炭酸水", vi: "Coca, Sprite, Fanta, Coca Zero, nước Soda" } },
      { price: 50000, name: { ko: "아침햇살", en: "Korean Morning Rice Drink", zh: "韩国米饮料", ja: "アチムヘッサル（お米ドリンク）", vi: "Nước gạo rang" } },
      { price: 35000, name: { ko: "뽀로로 음료", en: "Pororo Drink", zh: "啵乐乐饮料", ja: "ポロロドリンク", vi: "Nước uống Pororo" },
        desc: { ko: "딸기 · 밀크 · 바나나 · 블루베리 · 사과 · 열대과일", en: "Strawberry, milk, banana, blueberry, apple, tropical fruit", zh: "草莓 · 牛奶 · 香蕉 · 蓝莓 · 苹果 · 热带水果", ja: "いちご・ミルク・バナナ・ブルーベリー・りんご・トロピカル", vi: "Dâu, sữa, chuối, việt quất, táo, trái cây nhiệt đới" } },
      { price: 30000, name: { ko: "초코에몽", en: "Choco Emong", zh: "巧克力牛奶（哆啦A梦）", ja: "チョコエモン", vi: "Socola doraemon" } },
    ],
  },
];
