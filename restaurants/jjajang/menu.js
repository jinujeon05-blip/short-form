// 짜장도둑 (JJAJANG DODOOK · Lô 22 TT1, Khu đô thị, Từ Liêm, Hà Nội) 메뉴 데이터 — 하노이 한국식 중화요리(면류·밥류·요리·음료)
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/짜장도둑" — 메뉴판 사진 대부분은 손님이 올림(가게 계정 사진은 menu_07).
// 사진마다 가격이 다르면 사용자 지시(2026-10-24)대로 높은 쪽(부가세 8% 포함가)을 쓴다. 요리 13번 이후·음료는 포함가 사진이 없어 부가세 별도 표기 가격 그대로.
window.RESTAURANT = {
  brand: { ko: "짜장도둑", en: "Jjajang Dodook", branch: { ko: "하노이", en: "Hà Nội" } },
  phone: "0862 009 638",
  address: "Lô 22 TT1, Khu đô thị, Từ Liêm, Hà Nội",
  mapQuery: "짜장도둑 JJAJANG DODOOK Lô 22 TT1 Từ Liêm Hà Nội",
  mapUrl: "https://www.google.com/maps/place/%EC%A7%9C%EC%9E%A5%EB%8F%84%EB%91%91+(JJAJANG+DODOOK)/@21.0173794,105.7761732,17z/data=!3m1!4b1!4m6!3m5!1s0x31345566c325b419:0x1eb3dfe5f444a81b!8m2!3d21.0173794!4d105.7761732!16s%2Fg%2F11vw_9lpk4",
  wifi: null, // 예: { ssid: "JJAJANG", password: "12345678" }
};

window.MENU = [
  {
    id: "noodle",
    name: {"ko": "면류", "en": "Noodles", "zh": "面类", "ja": "麺類", "vi": "Mỳ"},
    items: [
      {"price": 140400, "tag": "best", "photo": "img/jjajang.jpg", "name": {"ko": "짜장", "en": "Black Bean Noodles (Jajangmyeon)", "zh": "炸酱面", "ja": "ジャージャー麺(チャジャンミョン)", "vi": "Mỳ đen"}},
      {"price": 162000, "spicy": true, "name": {"ko": "청양짜장", "en": "Spicy Black Bean Noodles (Cheongyang Jjajang)", "zh": "青阳辣炸酱面", "ja": "辛口ジャージャー麺(チョンヤン)", "vi": "Mỳ đen cay"}},
      {"price": 194400, "photo": "img/ganjjajang.jpg", "name": {"ko": "간짜장", "en": "Black Bean Noodles with Pork (Ganjjajang)", "zh": "干炸酱面", "ja": "カンジャジャン(汁なしジャージャー麺)", "vi": "Mỳ đen thịt lợn"}},
      {"price": 216000, "spicy": true, "name": {"ko": "유슬짜장", "en": "Spicy Shredded Black Bean Noodles (Yuseul Jjajang)", "zh": "肉丝炸酱面", "ja": "ユスル・ジャージャー麺(千切り肉)", "vi": "Mỳ đen cay"}},
      {"price": 216000, "name": {"ko": "유니짜장", "en": "Minced Pork Black Bean Noodles (Yuni Jjajang)", "zh": "肉末炸酱面", "ja": "ユニ・ジャージャー麺(挽き肉)", "vi": "Mỳ đen thịt lợn xay"}},
      {"price": 237600, "name": {"ko": "삼선쟁반짜장", "en": "Seafood Stir-fried Black Bean Noodles (Samseon Jaengban Jjajang)", "zh": "三鲜炒酱面", "ja": "海鮮チェンバンジャージャー麺", "vi": "Mỳ đen xào hải sản"}},
      {"price": 270000, "tag": "best", "spicy": true, "photo": "img/jjamppong.jpg", "name": {"ko": "해물짬뽕", "en": "Spicy Seafood Noodle Soup (Jjamppong)", "zh": "海鲜炒码面", "ja": "海鮮チャンポン", "vi": "Mỳ cay hải sản"}},
      {"price": 270000, "spicy": true, "name": {"ko": "삼선굴짬뽕", "en": "Spicy Seafood Noodles with Oysters", "zh": "三鲜牡蛎炒码面", "ja": "三鮮牡蠣チャンポン", "vi": "Mỳ cay hải sản hàu"}},
      {"price": 270000, "spicy": true, "name": {"ko": "삼선쟁반짬뽕", "en": "Spicy Stir-fried Seafood Noodles", "zh": "三鲜炒码面(干炒)", "ja": "三鮮チェンバンチャンポン(炒め)", "vi": "Mỳ hải sản xào cay"}},
      {"price": 270000, "name": {"ko": "삼선우동", "en": "Seafood Udon Noodles", "zh": "三鲜乌冬面", "ja": "三鮮うどん", "vi": "Mỳ udon hải sản"}},
      {"price": 270000, "name": {"ko": "삼선울면", "en": "Seafood Noodle Soup (Samseon Ulmyeon)", "zh": "三鲜卤面", "ja": "三鮮ウルミョン(とろみ麺)", "vi": "Súp mỳ hải sản"}},
      {"price": 270000, "name": {"ko": "기스면", "en": "Chicken Noodle Soup (Gisumyeon)", "zh": "鸡丝面", "ja": "キスミョン(鶏肉入り麺)", "vi": "Súp mỳ"}},
    ],
  },
  {
    id: "rice",
    name: {"ko": "밥류", "en": "Rice", "zh": "米饭类", "ja": "ご飯もの", "vi": "Cơm"},
    items: [
      {"price": 162000, "name": {"ko": "볶음밥", "en": "Fried Rice (Bokkeumbap)", "zh": "炒饭", "ja": "チャーハン", "vi": "Cơm rang"}},
      {"price": 162000, "name": {"ko": "짜장밥", "en": "Black Bean Sauce Rice (Jjajangbap)", "zh": "炸酱饭", "ja": "ジャージャー飯", "vi": "Cơm rang tương đen"}},
      {"price": 270000, "name": {"ko": "해물짬뽕밥", "en": "Seafood Rice Soup (Jjamppong-bap)", "zh": "海鲜炒码饭", "ja": "海鮮チャンポンご飯", "vi": "Cơm canh hải sản"}},
      {"price": 216000, "name": {"ko": "삼선볶음밥", "en": "Seafood Fried Rice", "zh": "三鲜炒饭", "ja": "三鮮チャーハン", "vi": "Cơm rang hải sản"}},
      {"price": 216000, "photo": "img/bokkeumbap.jpg", "name": {"ko": "새우볶음밥", "en": "Shrimp Fried Rice", "zh": "虾仁炒饭", "ja": "海老チャーハン", "vi": "Cơm rang tôm"}},
      {"price": 216000, "name": {"ko": "잡채밥", "en": "Glass Noodles over Rice (Japchae-bap)", "zh": "杂菜盖饭", "ja": "チャプチェご飯", "vi": "Cơm miến xào"}},
      {"price": 248400, "spicy": true, "name": {"ko": "고추잡채밥", "en": "Spicy Pepper Stir-fry over Rice (Gochu Japchae-bap)", "zh": "青椒肉丝盖饭", "ja": "青椒肉絲ご飯(コチュジャプチェ)", "vi": "Cơm xào ớt (cay)"}},
      {"price": 248400, "spicy": true, "name": {"ko": "오징어덮밥", "en": "Spicy Squid Rice Bowl (Ojingeo Deopbap)", "zh": "辣鱿鱼盖饭", "ja": "イカ丼(辛口)", "vi": "Cơm trộn mực (cay)"}},
      {"price": 216000, "name": {"ko": "마파두부밥", "en": "Mapo Tofu over Rice", "zh": "麻婆豆腐饭", "ja": "麻婆豆腐丼", "vi": "Cơm đậu phụ Tứ Xuyên"}},
      {"price": 216000, "name": {"ko": "송이덮밥", "en": "Mushroom Rice Bowl (Songi Deopbap)", "zh": "松茸盖饭", "ja": "きのこ丼(ソンイ)", "vi": "Cơm xào nấm"}},
      {"price": 270000, "name": {"ko": "유산슬밥", "en": "Seafood & Vegetable Stir-fry over Rice (Yusanseul-bap)", "zh": "什锦海鲜盖饭", "ja": "ユサンスル丼(海鮮と野菜あんかけ)", "vi": "Cơm rau xào hải sản"}},
      {"price": 270000, "name": {"ko": "잡탕밥", "en": "Mixed Seafood & Vegetable Rice (Japtang-bap)", "zh": "什锦烩饭", "ja": "雑湯ご飯(チャプタンバプ)", "vi": "Cơm xào thập cẩm"}},
    ],
  },
  {
    id: "dish",
    name: {"ko": "요리", "en": "Fried / Sauced Dishes", "zh": "炒菜与热菜", "ja": "炒め・ソース料理", "vi": "Món chiên/sốt"},
    items: [
      {"price": 216000, "tag": "best", "photo": "img/tangsuyuk.jpg", "name": {"ko": "탕수육", "en": "Sweet & Sour Pork (Tangsuyuk)", "zh": "糖醋肉", "ja": "酢豚(タンスユク)", "vi": "Thịt lợn xốt chua ngọt"}},
      {"price": 270000, "spicy": true, "name": {"ko": "사천탕수육", "en": "Sichuan Sweet & Sour Pork (Spicy)", "zh": "四川糖醋肉", "ja": "四川風酢豚(辛口)", "vi": "Thịt lợn xốt cay"}},
      {"price": 324000, "spicy": true, "name": {"ko": "깐풍육", "en": "Spicy Fried Pork (Kkanpung-yuk)", "zh": "干烹猪肉", "ja": "豚肉のカンプン(辛口揚げ炒め)", "vi": "Thịt lợn chiên cay"}},
      {"price": 324000, "spicy": true, "name": {"ko": "깐풍기", "en": "Spicy Fried Chicken (Kkanpung-gi)", "zh": "干烹鸡", "ja": "鶏のカンプン(辛口揚げ炒め)", "vi": "Thịt gà chiên cay"}},
      {"price": 324000, "name": {"ko": "깐쇼새우", "en": "Sweet & Sour Shrimp (Kkansho Saeu)", "zh": "干烧虾", "ja": "海老のカンショ(甘酸っぱいソース)", "vi": "Tôm xốt chua ngọt"}},
      {"price": 324000, "spicy": true, "name": {"ko": "깐풍새우", "en": "Spicy Garlic Shrimp (Kkanpung Saeu)", "zh": "干烹虾", "ja": "海老のカンプン(ガーリック辛口)", "vi": "Tôm xốt tỏi cay"}},
      {"price": 324000, "name": {"ko": "고추잡채", "en": "Stir-fried Meat with Peppers & Steamed Buns (Gochu Japchae)", "zh": "青椒肉丝配花卷", "ja": "青椒肉絲(蒸しパン添え)", "vi": "Ớt cay xào thịt và bánh bao"}},
      {"price": 324000, "name": {"ko": "유산슬", "en": "Stir-fried Bamboo Shoots with Seafood (Yusanseul)", "zh": "什锦海鲜炒笋", "ja": "ユサンスル(海鮮とタケノコの炒め)", "vi": "Măng xào hải sản"}},
      {"price": 324000, "name": {"ko": "팔보채", "en": "Stir-fried Seafood with Vegetables (Palbochae)", "zh": "八宝菜", "ja": "八宝菜", "vi": "Hải sản xào rau"}},
      {"price": 324000, "name": {"ko": "양장피", "en": "Mixed Salad (Yangjangpi)", "zh": "杂拌凉菜(两张皮)", "ja": "ヤンジャンピ(中華風春雨サラダ)", "vi": "Nộm thập cẩm"}},
      {"price": 540000, "name": {"ko": "잡채", "en": "Stir-fried Glass Noodles (Japchae)", "zh": "炒杂菜(韩式炒粉丝)", "ja": "チャプチェ", "vi": "Miến xào"}},
      {"price": 540000, "name": {"ko": "마파두부", "en": "Sichuan-style Tofu (Mapo Tofu)", "zh": "麻婆豆腐", "ja": "麻婆豆腐", "vi": "Đậu phụ Tứ Xuyên"}},
      {"price": 500000, "name": {"ko": "계란탕", "en": "Egg Drop Soup", "zh": "蛋花汤", "ja": "卵スープ", "vi": "Canh trứng"}},
      {"price": 500000, "name": {"ko": "산선술국", "en": "Spicy Seafood Soup", "zh": "辣海鲜汤", "ja": "辛口海鮮スープ", "vi": "Canh cay hải sản"}},
      {"price": 500000, "name": {"ko": "삼선누룽지탕", "en": "Seafood Soup with Crispy Rice (Nurungji-tang)", "zh": "三鲜锅巴汤", "ja": "三鮮おこげスープ", "vi": "Canh hải sản cơm cháy"}},
      {"price": 100000, "name": {"ko": "군만두", "en": "Fried Dumplings (Gunmandu)", "zh": "煎饺", "ja": "焼き餃子", "vi": "Há cảo chiên"}},
      {"price": 100000, "name": {"ko": "물만두", "en": "Steamed Dumplings (Mulmandu)", "zh": "蒸饺", "ja": "蒸し餃子", "vi": "Há cảo hấp"}},
      {"price": 20000, "name": {"ko": "공기밥", "en": "Steamed Rice", "zh": "米饭", "ja": "ご飯", "vi": "Cơm"}},
    ],
  },
  {
    id: "drink",
    name: {"ko": "음료", "en": "Drinks", "zh": "饮品", "ja": "ドリンク", "vi": "Đồ uống"},
    items: [
      {"price": 20000, "name": {"ko": "탄산음료 (콜라·환타·스프라이트)", "en": "Soft Drinks (Coca / Fanta / Sprite)", "zh": "汽水(可乐·芬达·雪碧)", "ja": "炭酸飲料(コーラ・ファンタ・スプライト)", "vi": "Nước ngọt (Coca/Fanta/Sprite)"}},
      {"price": 130000, "name": {"ko": "소주", "en": "Soju", "zh": "烧酒", "ja": "焼酎(ソジュ)", "vi": "Rượu soju"}},
      {"price": 60000, "name": {"ko": "맥주", "en": "Beer", "zh": "啤酒", "ja": "ビール", "vi": "Bia"}},
      {"sizes": [["250ml", 800000], ["500ml", 1000000]], "name": {"ko": "연태고량주", "en": "Yantai Gaoliang Liquor", "zh": "烟台高粱酒", "ja": "煙台高粱酒", "vi": "Rượu Yeon Tae"}},
    ],
  },
];
