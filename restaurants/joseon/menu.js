// 조선시대 하노이 본점 Nhà Hàng Joseon Sidae 한식당·목뼈 감자탕·뼈찜 (TT4/khu P. Đỗ Đình Thiện, khu đô thị, Từ Liêm, Hà Nội) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 드라이브 조선시대 하노이 폴더의 구글 지도 메뉴판 사진(가게 계정 3장 + 손님이 찍은 메뉴책 사진)
// 메뉴판에 한국어·베트남어가 있어 한·베는 그대로 쓰고 영어·중국어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "조선시대", en: "Joseon Sidae", branch: { ko: "하노이", en: "Hà Nội" } },
  phone: "0904 072 700",
  address: "TT4/khu P. Đỗ Đình Thiện, khu đô thị, Từ Liêm, Hà Nội",
  mapQuery: "조선시대 하노이 본점 Nhà Hàng Joseon Sidae",
  wifi: null, // 예: { ssid: "JOSEON", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const S3 = (a, b, c) => [[T("소", "Small", "小", "小", "Nhỏ"), a], [T("중", "Medium", "中", "中", "Vừa"), b], [T("대", "Large", "大", "大", "Lớn"), c]];
// 세트 정가 문구 (할인가는 sizes, 정가는 desc)
const REG = (a, b, c) => {
  const f = (n) => n.toLocaleString("en-US");
  const s = `${f(a)} / ${f(b)} / ${f(c)}₫`;
  return T(`정가 ${s}`, `Regular price ${s}`, `原价 ${s}`, `通常価格 ${s}`, `Giá gốc ${s}`);
};

window.MENU = [
  {
    id: "bone",
    name: T("뼈 요리 (목뼈)", "Pork neck bone dishes", "猪颈骨料理", "豚の首骨料理", "Menu món xương"),
    note: T(
      "불뼈구이·간장뼈구이를 반반으로 고르면 크기별로 +30,000₫예요.",
      "Choose half spicy grilled and half soy-sauce grilled bones for +30,000₫ per size.",
      "选择辣味烤骨和酱油烤骨各一半，每种分量加收 +30,000₫。",
      "辛口焼きと醤油焼きを半々にすると、サイズごとに +30,000₫ です。",
      "Chọn 1/2 xương nướng cay, 1/2 xì dầu: thêm 30.000₫ mỗi cỡ."
    ),
    items: [
      it(null, "gamjatang", "목뼈감자탕", "Pork neck bone and potato stew (gamjatang)", "猪颈骨土豆汤（감자탕）", "豚の首骨とじゃがいもの鍋（カムジャタン）", "Canh Xương Cổ Heo Hầm Khoai Tây", { tag: "best", sizes: S3(580000, 780000, 980000) }),
      it(null, "ganjang-gui", "목뼈 간장뼈구이", "Soy-sauce grilled pork neck bones (ganjang-ppyeo-gui)", "酱油烤猪颈骨（간장뼈구이）", "豚の首骨の醤油焼き（カンジャンピョグイ）", "Xương Cổ Nướng Vị Xì Dầu", { sizes: S3(750000, 900000, 1050000) }),
      it(null, "bul-gui", "목뼈 불뼈구이", "Spicy grilled pork neck bones (bul-ppyeo-gui)", "辣味烤猪颈骨（불뼈구이）", "豚の首骨の辛口焼き（プルピョグイ）", "Xương Cổ Nướng Vị Cay", { spicy: true, sizes: S3(750000, 900000, 1050000) }),
      it(null, "ganjang-jjim", "목뼈 간장뼈찜", "Soy-sauce braised pork neck bones (ganjang-ppyeo-jjim)", "酱油炖猪颈骨（간장뼈찜）", "豚の首骨の醤油蒸し煮（カンジャンピョチム）", "Xương Cổ Hầm Vị Xì Dầu", { sizes: S3(750000, 900000, 1050000) }),
      it(null, "bul-jjim", "목뼈 불뼈찜", "Spicy braised pork neck bones (bul-ppyeo-jjim)", "辣味炖猪颈骨（불뼈찜）", "豚の首骨の辛口蒸し煮（プルピョチム）", "Xương Cổ Hầm Vị Cay", { spicy: true, sizes: S3(750000, 900000, 1050000) }),
    ],
  },
  {
    id: "jjim",
    name: T("찜 요리", "Braised & steamed dishes", "炖蒸料理", "チム（蒸し煮）料理", "Menu hấp xào"),
    items: [
      it(null, "bbyeo-jjim", "조선시대 뼈찜", "Joseon Sidae signature braised pork neck bones", "朝鲜时代招牌炖猪颈骨（뼈찜）", "朝鮮時代 看板の豚首骨蒸し煮（ピョチム）", "Xương Cổ Hầm Joseonsidae", { tag: "must", sizes: S3(750000, 900000, 1050000) }),
      it(null, "gapojing", "갑오징어찜", "Spicy braised cuttlefish (gapojing-jjim)", "辣炖墨鱼（갑오징어찜）", "コウイカの辛口蒸し煮（カポジンチム）", "Mực Hấp Xào Sốt Cay", { spicy: true, sizes: S3(750000, 900000, 1050000) }),
      it(null, "agu", "아구찜", "Spicy braised monkfish (agu-jjim)", "辣炖鮟鱇鱼（아구찜）", "アンコウの辛口蒸し煮（アグチム）", "Cá Mặt Quỷ Xào Cay", { spicy: true, sizes: S3(700000, 850000, 1050000) }),
      it(null, "algon", "알곤이찜", "Spicy braised fish roe (algoni-jjim)", "辣炖鱼子（알곤이찜）", "魚卵の辛口蒸し煮（アルゴニチム）", "Trứng Cá Xào Cay", { spicy: true, sizes: S3(750000, 900000, 1050000) }),
    ],
  },
  {
    id: "set",
    name: T("세트 메뉴", "Set menus", "套餐", "セットメニュー", "Menu Combo"),
    note: T(
      "모든 세트는 대패삼겹살 + 매실에이드 + 계란찜이 함께 나와요. 표시한 가격은 할인가이고, 정가는 각 세트 설명에 적었어요.",
      "Every set comes with thin-sliced pork belly (daepae-samgyeopsal), plum ade and steamed egg. Prices shown are discounted; the regular price is in each set's description.",
      "所有套餐都附带刨片五花肉（대패삼겹살）、梅子饮料和蒸蛋。标示价格为优惠价，原价写在各套餐说明中。",
      "すべてのセットに薄切りサムギョプサル・梅エイド・卵蒸しが付きます。表示価格は割引価格で、通常価格は各セットの説明に記載しています。",
      "Mọi set đều kèm Thịt Ba Chỉ Nướng, Trà Mơ và Trứng Hấp. Giá hiển thị là giá ưu đãi, giá gốc ghi trong phần mô tả từng set."
    ),
    items: [
      it(null, "set1", "세트1 감자탕 세트 (목뼈감자탕)", "Set 1: Gamjatang set (pork neck bone and potato stew)", "套餐1 土豆汤套餐（猪颈骨土豆汤）", "セット1 カムジャタンセット（豚の首骨鍋）", "Set 1", { desc: REG(1350000, 1550000, 1750000), sizes: S3(1220000, 1440000, 1590000) }),
      it(null, "set2", "세트2 불뼈구이 세트", "Set 2: Spicy grilled pork neck bone set", "套餐2 辣味烤猪颈骨套餐（불뼈구이）", "セット2 辛口骨焼きセット（プルピョグイ）", "Set 2 (Xương Cổ Nướng Cay)", { spicy: true, desc: REG(1520000, 1670000, 1820000), sizes: S3(1370000, 1510000, 1640000) }),
      it(null, "set3", "세트3 간장뼈구이 세트", "Set 3: Soy-sauce grilled pork neck bone set", "套餐3 酱油烤猪颈骨套餐（간장뼈구이）", "セット3 醤油骨焼きセット（カンジャンピョグイ）", "Set 3 (Xương Cổ Nướng Xì Dầu)", { desc: REG(1520000, 1670000, 1820000), sizes: S3(1370000, 1510000, 1640000) }),
      it(null, "set4", "세트4 불뼈찜 세트", "Set 4: Spicy braised pork neck bone set", "套餐4 辣味炖猪颈骨套餐（불뼈찜）", "セット4 辛口骨蒸し煮セット（プルピョチム）", "Set 4 (Xương Cổ Hầm Cay)", { spicy: true, desc: REG(1520000, 1670000, 1820000), sizes: S3(1370000, 1510000, 1640000) }),
      it(null, "set5", "세트5 간장뼈찜 세트", "Set 5: Soy-sauce braised pork neck bone set", "套餐5 酱油炖猪颈骨套餐（간장뼈찜）", "セット5 醤油骨蒸し煮セット（カンジャンピョチム）", "Set 5 (Xương Cổ Hầm Xì Dầu)", { desc: REG(1520000, 1670000, 1820000), sizes: S3(1370000, 1510000, 1640000) }),
      it(null, "set6", "세트6 갑오징어찜 세트", "Set 6: Spicy braised cuttlefish set", "套餐6 辣炖墨鱼套餐（갑오징어찜）", "セット6 コウイカ蒸し煮セット（カポジンチム）", "Set 6 (Mực Hấp Xào Cay)", { spicy: true, desc: REG(1520000, 1670000, 1820000), sizes: S3(1370000, 1510000, 1640000) }),
      it(null, "set7", "세트7 아귀찜 세트", "Set 7: Spicy braised monkfish set", "套餐7 辣炖鮟鱇鱼套餐（아귀찜）", "セット7 アンコウ蒸し煮セット（アグィチム）", "Set 7 (Cá Mặt Quỷ Xào Cay)", { spicy: true, desc: REG(1470000, 1620000, 1770000), sizes: S3(1330000, 1460000, 1600000) }),
      it(null, "set8", "세트8 알곤이찜 세트", "Set 8: Spicy braised fish roe set", "套餐8 辣炖鱼子套餐（알곤이찜）", "セット8 魚卵蒸し煮セット（アルゴニチム）", "Set 8 (Trứng Cá Xào Cay)", { spicy: true, desc: REG(1470000, 1620000, 1770000), sizes: S3(1330000, 1460000, 1600000) }),
      it(null, "set9", "세트9 조선시대 뼈찜 세트", "Set 9: Joseon Sidae signature braised pork neck bone set", "套餐9 朝鲜时代招牌炖猪颈骨套餐（뼈찜）", "セット9 朝鮮時代 看板の骨蒸し煮セット（ピョチム）", "Set 9 (Xương Cổ Hầm Joseonsidae)", { tag: "best", desc: REG(1500000, 1620000, 1740000), sizes: S3(1350000, 1460000, 1570000) }),
    ],
  },
  {
    id: "meal",
    name: T("식사", "Meals", "主食", "お食事", "Menu meal"),
    note: T(
      "점심 세트(11:00~14:00): 해장국을 주문하면 만두 3개 + 계란후라이가 더해지고 가격이 +30,000₫예요.",
      "Lunch set (11:00–14:00): order a hangover soup (haejangguk) and get 3 dumplings (mandu) + a fried egg for +30,000₫.",
      "午餐套餐（11:00~14:00）：点醒酒汤（해장국）加送 3 个饺子（만두）和 1 个煎蛋，价格加收 +30,000₫。",
      "ランチセット（11:00〜14:00）：ヘジャンクク（酔い覚ましスープ）を注文すると、餃子3個と目玉焼きが付き +30,000₫ です。",
      "Set trưa (11:00–14:00): gọi canh giải rượu được tặng thêm 03 Mandu & Trứng Ốp, +30K."
    ),
    items: [
      it(200000, "haejang", "목뼈해장국", "Pork neck bone hangover soup (haejangguk)", "猪颈骨醒酒汤（해장국）", "豚の首骨ヘジャンクク（酔い覚ましスープ）", "Canh Xương Cổ Heo (1 Suất)", { desc: T("점심 세트 230,000₫", "Lunch set 230,000₫", "午餐套餐 230,000₫", "ランチセット 230,000₫", "Set trưa 230.000₫") }),
      it(170000, "ugeoji", "우거지 해장국", "Dried cabbage hangover soup (ugeoji-haejangguk), meatless", "干白菜醒酒汤（우거지 해장국），无肉", "ウゴジ（干し白菜）ヘジャンクク・肉なし", "Canh Giải Rượu (không có thịt)", { desc: T("고기가 들어가지 않아요. 점심 세트 200,000₫", "Contains no meat. Lunch set 200,000₫", "不含肉。午餐套餐 200,000₫", "肉は入っていません。ランチセット 200,000₫", "Không có thịt. Set trưa 200.000₫") }),
      it(120000, "doenjang", "된장찌개", "Soybean paste stew (doenjang-jjigae)", "大酱汤（된장찌개）", "テンジャンチゲ（味噌鍋）", "Canh Tương Đậu"),
      it(140000, "mulnaeng", "물냉면", "Cold buckwheat noodles in broth (mul-naengmyeon)", "冷面汤（물냉면）", "水冷麺（ムルネンミョン）", "Miến Lạnh"),
      it(160000, "kimchimal", "김치말이국수", "Cold kimchi broth noodles (kimchi-mari-guksu)", "泡菜冷汤面（김치말이국수）", "キムチ冷やし麺（キムチマリグクス）", "Mì Kimchi Lạnh"),
      it(160000, "naengmomil", "냉모밀", "Cold buckwheat soba noodles (naeng-momil)", "冷荞麦面（냉모밀）", "冷たいそば（ネンモミル）", "Mì Lạnh"),
      it(500000, "gapo-bokkeum", "갑오징어볶음", "Spicy stir-fried cuttlefish (gapojing-bokkeum)", "辣炒墨鱼（갑오징어볶음）", "コウイカ炒め（辛口、カポジンポックム）", "Mực Nang Xào Lửa Lớn Cay", { spicy: true }),
      it(190000, "daepae", "대패삼겹살", "Thinly sliced pork belly (daepae-samgyeopsal)", "刨片五花肉（대패삼겹살）", "薄切りサムギョプサル（テペサムギョプサル）", "Thịt Ba Chỉ Nướng", { unit: T("1인분", "per person", "每人", "1名分", "1 người"), desc: T("2인분부터 주문할 수 있어요", "Order for 2 or more people", "2 人份起点", "2名様分からご注文いただけます", "Gọi từ 2 người trở lên") }),
    ],
  },
  {
    id: "extra",
    name: T("추가 메뉴", "Extras & sides", "加点 · 小菜", "追加メニュー", "Menu Extra"),
    items: [
      it(300000, null, "뼈추가", "Extra bones", "加骨", "骨の追加", "Thêm Xương"),
      it(250000, null, "갑오징어추가", "Extra cuttlefish", "加墨鱼", "コウイカの追加", "Thêm Mực"),
      it(200000, null, "알곤이추가", "Extra fish roe (algoni)", "加鱼子（알곤이）", "魚卵（アルゴニ）の追加", "Thêm Trứng Cá"),
      it(200000, null, "아귀 추가", "Extra monkfish", "加鮟鱇鱼", "アンコウの追加", "Thêm Cá Mặt Quỷ"),
      it(50000, null, "우거지추가", "Extra dried cabbage (ugeoji)", "加干白菜（우거지）", "ウゴジ（干し白菜）の追加", "Thêm Cải Thảo Canh Xương"),
      it(40000, null, "감자수제비", "Potato sujebi (hand-pulled dough flakes)", "土豆面疙瘩（감자수제비）", "じゃがいもスジェビ（手ちぎり団子）", "Sujebi"),
      it(20000, null, "라면사리", "Ramen noodles (add-on)", "加拉面", "ラーメン追加", "Mì"),
      it(40000, null, "당면사리", "Glass noodles (add-on)", "加粉丝（당면）", "春雨（タンミョン）追加", "Miến"),
      it(30000, null, "우동사리", "Udon noodles (add-on)", "加乌冬面", "うどん追加", "Mì Udon"),
      it(50000, null, "떡사리", "Rice cakes (tteok, add-on)", "加年糕（떡）", "トック（餅）追加", "Bánh Gạo"),
      it(50000, null, "분모자", "Potato starch noodles (bunmoja, add-on)", "加粉末子（분모자，土豆粉条）", "プンモジャ（じゃがいも春雨）追加", "Mì Ống Khoai Tây"),
      it(20000, null, "공깃밥", "Steamed rice", "米饭", "ご飯", "Bát Cơm"),
      it(50000, null, "주먹밥", "Rice ball (jumeokbap)", "饭团（주먹밥）", "おにぎり（ジュモクパプ）", "Cơm Nắm"),
      it(60000, null, "볶음밥", "Fried rice (bokkeumbap)", "炒饭（볶음밥）", "チャーハン（ポックンパプ）", "Cơm Chiên"),
      it(80000, null, "튀김만두", "Fried dumplings (mandu)", "炸饺子（만두）", "揚げ餃子（マンドゥ）", "Mandu Chiên"),
      it(80000, null, "매운튀김만두", "Spicy fried dumplings (mandu)", "辣味炸饺子（만두）", "辛口揚げ餃子（マンドゥ）", "Mandu Chiên Cay", { spicy: true }),
      it(80000, null, "계란찜", "Steamed egg (gyeran-jjim)", "蒸蛋（계란찜）", "卵蒸し（ケランチム）", "Trứng Hấp"),
      it(100000, null, "부추전", "Chive pancake (buchu-jeon)", "韭菜饼（부추전）", "ニラチヂミ（プチュジョン）", "Bánh Xèo Hẹ"),
      it(10000, null, "계란후라이", "Fried egg", "煎蛋", "目玉焼き", "Trứng Ốp"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒水 · 饮料", "お酒・ドリンク", "Menu Rượu · Đồ Uống"),
    items: [
      it(140000, null, "소주 (참이슬·처음처럼·진로·새로·선양)", "Soju (Chamisul, Chum-churum, Jinro, Saero, Sunyang)", "烧酒（真露·初饮初乐·Jinro·Saero·鲜阳）", "焼酎（チャミスル・チョウムチョロム・ジンロ・セロ・ソニャン）", "Soju"),
      it(130000, null, "좋은데이", "Soju: Good Day (Joeunday)", "烧酒：好日子（좋은데이）", "焼酎：チョウンデイ", "Soju Joeunday"),
      it(150000, null, "선양오크", "Sunyang Oak soju", "鲜阳橡木烧酒（선양오크）", "ソニャンオーク焼酎", "Sunyang Oak"),
      it(50000, null, "맥주 (Tiger/Saigon)", "Beer (Tiger / Saigon)", "啤酒（虎牌 / 西贡）", "ビール（タイガー／サイゴン）", "Bia"),
      it(65000, null, "삿포로 생맥주", "Sapporo draft beer", "札幌生啤", "サッポロ生ビール", "Bia Tươi Sapporo"),
      it(350000, null, "복분자", "Bokbunja (Korean black raspberry wine)", "覆盆子酒（복분자）", "復盆子酒（ポクブンジャ）", "Rượu Mâm Xôi"),
      it(250000, null, "백세주", "Baekseju (herbal rice wine)", "百岁酒（백세주）", "百歳酒（ペクセジュ）", "Rượu Baekseju"),
      it(600000, null, "일품진로", "Ilpum Jinro (premium soju)", "一品真露（일품진로）", "一品ジンロ（プレミアム焼酎）", "Rượu Ilphum Jinro"),
      it(120000, null, "보드카 (300ml)", "Vodka (300 ml)", "伏特加（300ml）", "ウォッカ（300ml）", "Vodka"),
      it(160000, null, "막걸리", "Makgeolli (Korean rice wine)", "米酒（막걸리）", "マッコリ", "Rượu Gạo"),
      it(150000, null, "외부주류 반입 300ml (1병당)", "Corkage, outside alcohol 300 ml (per bottle)", "自带酒水开瓶费 300ml（每瓶）", "お酒の持ち込み料 300ml（1本あたり）", "Corkage"),
      it(300000, null, "외부주류 반입 700ml (1병당)", "Corkage, outside alcohol 700 ml (per bottle)", "自带酒水开瓶费 700ml（每瓶）", "お酒の持ち込み料 700ml（1本あたり）", "Corkage"),
      it(120000, null, "매실에이드", "Plum ade (maesil-ade)", "梅子气泡饮（매실에이드）", "梅エイド（メシルエイド）", "Trà Mơ"),
      it(20000, null, "콜라 / 사이다", "Coke / Sprite", "可乐 / 雪碧", "コーラ／サイダー", "Coca/Sprite"),
    ],
  },
];
