// 태백산 Taebaeksan 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진(2026-11-04 수집, 올린 날짜 미상), 가격이 다르면 높은 쪽
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "태백산", en: "Taebaeksan" },
  phone: "0969 993 384",
  address: "Tòa Nhà CT5, Kiot SH16-17, Số 6 Trần Văn Lai, Khu đô thị Mỹ Đình Sông Đà, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:30 – 24:00", // 구글 지도 '오전 10:30~오전 12:00' — 12:00=자정으로 해석, 확인 필요
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price: price ?? null, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

window.MENU = [
  {
    id: "beef",
    name: T("소고기", "Beef", "牛肉", "牛肉", "MENU THỊT BÒ"),
    note: T(
      "첫 주문 시 2인분 이상 주문해 주세요",
      "For your first order, please order at least 2 servings",
      "首次点餐请至少点2人份",
      "初回のご注文は2人前以上でお願いします",
      "Lần đầu gọi món quý khách vui lòng gọi từ 2 suất trở lên"
    ),
    items: [
      it(450000, "beefset", "태백 소고기 모둠", "Taebaek Assorted Beef (Taebaek Sogogi Modum)", "太白牛肉拼盘", "テベク牛肉盛り合わせ", "Thịt Bò Tổng Hợp Taebaek", {
        tag: "best",
        desc: T("진갈비살·갈비살·토시살 · 160g", "Prime rib finger, rib meat, skirt meat · 160g", "上等肋条肉·肋肉·横膈膜肉 · 160g", "ジンカルビ・カルビ・トシ（ハラミ） · 160g", "Thịt sườn non, sườn bò, dải bò · 160g"),
      }),
      it(750000, null, "태백 특선 소고기 모둠", "Taebaek Special Assorted Beef (Taebaek Teuksseon Sogogi Modum)", "太白特选牛肉拼盘", "テベク特選牛肉盛り合わせ", "Thịt Bò Tổng Hợp Taebaek Đặc Biệt", {
        tag: "special",
        desc: T("A5 와규·안창살·진갈비살 · 160g", "A5 wagyu, outside skirt, prime rib finger · 160g", "A5和牛·安昌肉·上等肋条肉 · 160g", "A5和牛・アンチャン（ハラミ）・ジンカルビ · 160g", "Wagyu A5, diềm thăn bò, sườn non · 160g"),
      }),
      it(850000, null, "와규 모둠", "Wagyu Assortment (Wagyu Modum)", "和牛拼盘", "和牛盛り合わせ", "Thịt Bò Wagyu Tổng Hợp", {
        desc: T("미야자키 A5 · 160g", "Miyazaki A5 · 160g", "宫崎A5 · 160g", "宮崎A5 · 160g", "Miyazaki A5 · 160g"),
      }),
      it(650000, null, "꽃갈비살", "Boneless Short Rib (Kkotgalbisal)", "花排骨肉", "骨なし花カルビ（コッカルビサル）", "Thịt Sườn Non Rút Xương", {
        desc: T("160g", "160g", "160g", "160g", "160g"),
      }),
      it(550000, null, "안창살", "Outside Skirt (Anchangsal)", "安昌肉", "アンチャンサル（ハラミ）", "Thịt Diềm Thăn Bò", {
        desc: T("160g", "160g", "160g", "160g", "160g"),
      }),
      it(750000, null, "양념 소갈비", "Marinated Beef Short Rib (Yangnyeom Sogalbi)", "腌制牛排骨", "味付け牛カルビ", "Thịt Sườn Bò Ướp Sốt", {
        desc: T("220g", "220g", "220g", "220g", "220g"),
      }),
      it(450000, null, "소갈비살", "Beef Rib Meat (Sogalbisal)", "牛肋肉", "牛カルビ肉（ソガルビサル）", "Dẻ Sườn Bò", {
        desc: T("160g", "160g", "160g", "160g", "160g"),
      }),
      it(480000, null, "양념 소갈비살", "Marinated Beef Rib Meat (Yangnyeom Sogalbisal)", "腌制牛肋肉", "味付け牛カルビ肉", "Dẻ Sườn Bò Ướp Sốt", {
        desc: T("200g", "200g", "200g", "200g", "200g"),
      }),
      it(350000, null, "토시살", "Skirt Meat (Tosisal)", "横膈膜肉", "トシ（ハラミ）", "Thịt Dải Bò", {
        desc: T("160g", "160g", "160g", "160g", "160g"),
      }),
      it(350000, null, "육회", "Beef Tartare (Yukhoe)", "生拌牛肉", "ユッケ", "Gỏi Bò Sống"),
    ],
  },
  {
    id: "pork",
    name: T("돼지고기", "Pork", "猪肉", "豚肉", "MENU THỊT LỢN"),
    note: T(
      "첫 주문 시 2인분 이상 주문해 주세요",
      "For your first order, please order at least 2 servings",
      "首次点餐请至少点2人份",
      "初回のご注文は2人前以上でお願いします",
      "Lần đầu gọi món quý khách vui lòng gọi từ 2 suất trở lên"
    ),
    items: [
      it(240000, null, "태백 돼지고기 모둠", "Taebaek Assorted Pork (Taebaek Dwaejigogi Modum)", "太白猪肉拼盘", "テベク豚肉盛り合わせ", "Thịt Lợn Tổng Hợp Taebaek", {
        desc: T("160g · 2인분 이상", "160g · 2 servings or more", "160g · 2人份起", "160g · 2人前以上", "160g · từ 2 suất trở lên"),
      }),
      it(220000, null, "돼지 삼겹살", "Pork Belly (Samgyeopsal)", "五花肉", "豚バラ（サムギョプサル）", "Thịt Ba Chỉ Lợn", {
        desc: T("160g", "160g", "160g", "160g", "160g"),
      }),
      it(220000, null, "특목살", "Premium Pork Neck (Teukmoksal)", "特选梅花肉", "特選豚肩ロース（トゥクモクサル）", "Thịt Nạc Vai Đặc Biệt", {
        desc: T("160g", "160g", "160g", "160g", "160g"),
      }),
      it(240000, null, "항정살", "Pork Jowl (Hangjeongsal)", "猪颈肉", "豚トロ（ハンジョンサル）", "Thịt Nạc Má", {
        desc: T("160g", "160g", "160g", "160g", "160g"),
      }),
      it(260000, null, "갈매기살", "Pork Skirt (Galmaegisal)", "猪横膈膜肉", "豚ハラミ（カルメギサル）", "Thịt Dải Cắt Khúc", {
        desc: T("160g", "160g", "160g", "160g", "160g"),
      }),
      it(280000, null, "양념 돼지갈비", "Marinated Pork Ribs (Yangnyeom Dwaegalbi)", "腌制猪排骨", "味付け豚カルビ", "Thịt Sườn Lợn Ướp Sốt", {
        desc: T("220g", "220g", "220g", "220g", "220g"),
      }),
      it(null, null, "민물장어구이", "Grilled Freshwater Eel (Minmul Jangeo-gui)", "烤淡水鳗鱼", "淡水ウナギの焼き物（ミンムルジャンオ）", "Cá Chình Nướng", {
        sizes: [["500g", 700000], ["1kg", 1200000]],
      }),
    ],
  },
  {
    id: "dish",
    name: T("일품 요리", "Specialty Dishes", "招牌料理", "一品料理", "ĐỒ CHÍN"),
    note: T(
      "점심(10:30~14:00)에 주문하면 영양돌솥밥 2개가 포함돼요 (주꾸미·대구·갈비찜, 2인분)",
      "Orders at lunch (10:30–14:00) include 2 nutritious stone-pot rice bowls (webfoot octopus, cod, braised short ribs; 2 servings)",
      "午餐时段（10:30~14:00）点餐含2份营养石锅饭（小章鱼·鳕鱼·炖排骨，2人份）",
      "ランチ（10:30〜14:00）のご注文には栄養釜飯が2つ付きます（イイダコ・タラ・カルビチム、2人前）",
      "Gọi món trong giờ trưa 10:30–14:00 được kèm 2 cơm thố trộn hạt (bạch tuộc nhỏ, cá tuyết, sườn bò hầm; 2 suất)"
    ),
    items: [
      it(450000, "jjukkumi", "주꾸미볶음", "Stir-fried Webfoot Octopus (Jjukkumi Bokkeum)", "辣炒小章鱼", "イイダコ炒め（ジュクミポックム）", "Bạch Tuộc Nhỏ Xào Cay", {
        spicy: true,
        desc: T("매운맛 1~3단계 선택", "Choose spice level 1–3", "辣度1~3级可选", "辛さ1〜3段階から選べます", "Chọn độ cay 1–3"),
      }),
      it(450000, null, "매운 대구조림", "Spicy Braised Cod (Maeun Daegu-jorim)", "辣炖鳕鱼", "辛いタラの煮付け（デグジョリム）", "Cá Tuyết Hầm Sốt Cay", { spicy: true }),
      it(950000, "galbijjim", "소갈비찜", "Braised Beef Short Ribs (So-galbijjim)", "炖牛排骨", "牛カルビチム", "Canh Sườn Bò Hầm Ngọt"),
      it(null, "ganjang", "매운 양념게장", "Spicy Marinated Raw Crab (Maeun Yangnyeom Gejang)", "辣腌生蟹", "辛い味付けケジャン", "Ghẹ Ướp Siêu Cay", {
        sizes: [["½", 150000], ["1", 280000]],
        spicy: true,
        desc: T("반 접시 / 한 접시", "Half plate / full plate", "半份 / 一份", "半皿 / 1皿", "Nửa đĩa / một đĩa"),
      }),
      it(250000, null, "더덕구이", "Grilled Deodeok Root (Deodeok-gui)", "烤沙参", "トドク焼き（デオドクグイ）", "Cây Deodeok Nướng"),
      it(150000, null, "잡채", "Japchae (Stir-fried Glass Noodles)", "杂菜（炒粉丝）", "チャプチェ（春雨炒め）", "Miến Xào Thập Cẩm"),
    ],
  },
  {
    id: "lunch",
    name: T("점심 메뉴", "Lunch Menu", "午餐菜单", "ランチメニュー", "MENU BUỔI TRƯA 10:30–14:00"),
    note: T(
      "10:30~14:00 · 2인분 이상 주문해 주세요",
      "10:30–14:00 · Please order at least 2 servings",
      "10:30~14:00 · 请至少点2人份",
      "10:30〜14:00 · 2人前以上でご注文ください",
      "10:30–14:00 · Vui lòng gọi từ 2 suất trở lên"
    ),
    items: [
      it(180000, null, "매운 대구찜", "Spicy Steamed Cod (Maeun Daegu-jjim)", "辣蒸鳕鱼", "辛いタラの蒸し煮（デグチム）", "Cá Tuyết Hầm Sốt Cay", { spicy: true }),
      it(180000, null, "주꾸미볶음", "Stir-fried Webfoot Octopus (Jjukkumi Bokkeum)", "辣炒小章鱼", "イイダコ炒め（ジュクミポックム）", "Bạch Tuộc Nhỏ Xào Cay", { spicy: true }),
    ],
  },
  {
    id: "soup",
    name: T("국·찌개·식사", "Soups, Stews & Meals", "汤·锅·主食", "スープ・チゲ・食事", "CANH TRUYỀN THỐNG / CANH BỘT MÌ & CƠM"),
    items: [
      it(120000, null, "김치찌개", "Kimchi Stew (Kimchi-jjigae)", "泡菜汤", "キムチチゲ", "Canh Kim Chi", { spicy: true }),
      it(120000, null, "된장찌개 (검은콩)", "Black Soybean Doenjang Stew (Doenjang-jjigae)", "大酱汤（黑豆）", "テンジャンチゲ（黒豆）", "Canh Đậu Tương Đen", { tag: "must" }),
      it(160000, null, "짬뽕순두부찌개", "Jjamppong Soft Tofu Stew (Jjamppong Sundubu-jjigae)", "海鲜辣嫩豆腐汤", "チャンポン風スンドゥブチゲ", "Canh Đậu Phụ Jjam Bbong", { spicy: true }),
      it(280000, "galbitang", "갈비탕", "Galbitang (Beef Short Rib Soup)", "牛排骨汤", "カルビタン（牛カルビスープ）", "Canh Sườn Bò"),
      it(120000, null, "남포 수제비", "Nampo Sujebi (Hand-pulled Dough Soup)", "南浦面片汤", "南浦スジェビ（手ちぎり麺スープ）", "Bánh Canh Bột Mì Nampo"),
      it(140000, null, "남포 들깨수제비", "Nampo Perilla Seed Sujebi (Deulkkae Sujebi)", "南浦紫苏籽面片汤", "南浦エゴマスジェビ", "Bánh Canh Bột Mì Nampo Vừng Xay"),
      it(90000, null, "깍두기 김치볶음밥", "Kimchi & Radish Kimchi Fried Rice (Kkakdugi Kimchi Bokkeumbap)", "萝卜块泡菜炒饭", "カクテキ・キムチ炒飯", "Cơm Rang Kimchi Củ Cải"),
    ],
  },
  {
    id: "noodle",
    name: T("냉면·돌솥밥", "Cold Noodles & Stone-pot Rice", "冷面·石锅饭", "冷麺・石釜ご飯", "MÌ LẠNH / CƠM THỐ"),
    items: [
      it(null, "mulnaengmyeon", "물냉면", "Mul Naengmyeon (Cold Noodle Soup)", "水冷面", "水冷麺（ムルネンミョン）", "Mì Lạnh Nước", {
        sizes: [["S", 90000], ["L", 150000]],
        desc: T("보통 / 대", "Regular / Large", "普通 / 大", "普通 / 大", "Thường / Lớn"),
      }),
      it(null, null, "비빔냉면", "Bibim Naengmyeon (Spicy Mixed Cold Noodles)", "拌冷面", "ビビン冷麺", "Mì Lạnh Trộn", {
        sizes: [["S", 90000], ["L", 150000]],
        desc: T("보통 / 대", "Regular / Large", "普通 / 大", "普通 / 大", "Thường / Lớn"),
      }),
      it(null, null, "매운 냉면 (비빔)", "Extra Spicy Bibim Naengmyeon (Maeun Naengmyeon)", "超辣拌冷面", "激辛ビビン冷麺", "Mì Lạnh Siêu Cay", {
        sizes: [["S", 110000], ["L", 180000]],
        spicy: true,
        desc: T("보통 / 대", "Regular / Large", "普通 / 大", "普通 / 大", "Thường / Lớn"),
      }),
      it(40000, null, "영양돌솥밥", "Nutritious Stone-pot Rice (Yeongyang Dolsotbap)", "营养石锅饭", "栄養釜飯", "Cơm Thố Trộn Hạt"),
      it(50000, null, "버섯돌솥밥", "Mushroom Stone-pot Rice (Beoseot Dolsotbap)", "蘑菇石锅饭", "きのこ釜飯", "Cơm Thố Trộn Nấm"),
      it(60000, null, "명란돌솥밥", "Pollock Roe Stone-pot Rice (Myeongnan Dolsotbap)", "明太鱼籽石锅饭", "明太子釜飯", "Cơm Thố Trộn Trứng Cá"),
    ],
  },
  {
    id: "drink",
    name: T("음료", "Drinks", "饮品", "ドリンク", "MENU ĐỒ UỐNG"),
    items: [
      it(70000, null, "에이드", "Ade (Soda)", "气泡饮", "エイド（ソーダ）", "Soda", {
        desc: T("유자·오미자·인삼·매실", "Yuja (citron), omija (five-flavor berry), ginseng, maesil (green plum)", "柚子·五味子·人参·青梅", "ユジャ・オミジャ・高麗人参・梅", "Thanh Yên, Ngũ Vị Tử, Nhân Sâm, Mơ"),
      }),
      it(80000, null, "스무디", "Smoothie", "冰沙", "スムージー", "Sinh tố", {
        desc: T("유자·인삼·미숫가루·오미자", "Yuja (citron), ginseng, misugaru (grain powder), omija (five-flavor berry)", "柚子·人参·炒谷粉·五味子", "ユジャ・高麗人参・ミスカル（穀物粉）・オミジャ", "Thanh Yên, Nhân Sâm, Bột Ngũ Cốc, Ngũ Vị Tử"),
      }),
      it(50000, null, "매실차", "Maesil Tea (Green Plum Tea)", "青梅茶", "梅茶（メシルチャ）", "Trà Mơ", {
        desc: T("Hot / Ice", "Hot / Ice", "热 / 冰", "ホット / アイス", "Hot / Ice"),
      }),
      it(50000, null, "오미자차", "Omija Tea (Five-flavor Berry Tea)", "五味子茶", "五味子茶（オミジャチャ）", "Trà Ngũ Vị Tử", {
        desc: T("Hot / Ice", "Hot / Ice", "热 / 冰", "ホット / アイス", "Hot / Ice"),
      }),
      it(50000, null, "인삼차", "Ginseng Tea (Insamcha)", "人参茶", "高麗人参茶（インサムチャ）", "Trà Nhân Sâm", {
        desc: T("Hot만", "Hot only", "仅热饮", "ホットのみ", "Chỉ Hot"),
      }),
      it(50000, null, "꿀유자차", "Honey Yuja Tea (Kkul Yujacha)", "蜂蜜柚子茶", "はちみつユジャ茶", "Trà Thanh Yên Mật Ong", {
        desc: T("Hot / Ice", "Hot / Ice", "热 / 冰", "ホット / アイス", "Hot / Ice"),
      }),
      it(50000, null, "수정과", "Sujeonggwa (Cinnamon Ginger Punch)", "水正果（桂皮姜汁）", "スジョンガ（シナモン生姜のデザート飲料）", "Nước Gừng Trộn Quế", {
        desc: T("Hot / Ice", "Hot / Ice", "热 / 冰", "ホット / アイス", "Hot / Ice"),
      }),
      it(50000, null, "식혜", "Sikhye (Sweet Rice Drink)", "甜米酿", "シッケ（甘い米の飲み物）", "Nước Gạo Truyền Thống", {
        desc: T("Hot / Ice", "Hot / Ice", "热 / 冰", "ホット / アイス", "Hot / Ice"),
      }),
      it(50000, null, "미숫가루", "Misugaru (Roasted Grain Drink)", "炒谷粉饮", "ミスカル（穀物ドリンク）", "Nước Bột Ngũ Cốc", {
        desc: T("Hot만", "Hot only", "仅热饮", "ホットのみ", "Chỉ Hot"),
      }),
      it(70000, null, "대추 한방차 (쌍화차)", "Jujube Herbal Tea (Ssanghwacha)", "红枣药草茶（双和茶）", "ナツメ韓方茶（サンファ茶）", "Trà Thảo Mộc Táo Đỏ", {
        desc: T("Hot만", "Hot only", "仅热饮", "ホットのみ", "Chỉ Hot"),
      }),
      it(20000, null, "탄산음료", "Soft Drinks", "碳酸饮料", "炭酸飲料", "Nước ngọt có ga", {
        desc: T("콜라 제로 · 콜라 오리지널 · 스프라이트 · 환타 (각 20,000)", "Coke Zero, Coke Original, Sprite, Fanta (each 20,000)", "零度可乐·原味可乐·雪碧·芬达（各20,000）", "コーラゼロ・コーラ オリジナル・スプライト・ファンタ（各20,000）", "Cola Zero, Cola Original, Sprite, Fanta (mỗi loại 20.000)"),
      }),
    ],
  },
  {
    id: "alcohol",
    name: T("술", "Beer & Liquor", "酒类", "お酒", "MENU BIA & RƯỢU"),
    items: [
      it(150000, null, "소주", "Soju", "烧酒", "焼酎（ソジュ）", "Soju", {
        desc: T("참이슬·처음처럼·좋은데이·진로·새로", "Chamisul, Chum Churum, Good Day, Jinro, Saero", "真露·初饮初乐·Good Day·Jinro·Saero", "チャミスル・チョウムチョロム・チョウンデイ・ジンロ・セロ", "Chamisul, Chum Churum, Good Day, Jinro, Saero"),
      }),
      it(150000, null, "과일소주", "Fruit Soju (Gwail Soju)", "水果烧酒", "フルーツ焼酎", "Soju trái cây", {
        desc: T("복숭아·포도·딸기·블루베리·야쿠르트", "Peach, grape, strawberry, blueberry, Yakult", "桃子·葡萄·草莓·蓝莓·养乐多", "桃・ぶどう・いちご・ブルーベリー・ヤクルト", "Đào, nho, dâu, việt quất, Yakult"),
      }),
      it(160000, null, "막걸리", "Makgeolli (Rice Wine)", "马格利（米酒）", "マッコリ", "Rượu gạo", {
        desc: T("생막걸리·밤막걸리", "Fresh makgeolli, chestnut makgeolli", "生马格利·栗子马格利", "生マッコリ・栗マッコリ", "Makgeolli tươi, makgeolli hạt dẻ"),
      }),
      it(160000, null, "과일막걸리", "Fruit Makgeolli (Gwail Makgeolli)", "水果马格利", "フルーツマッコリ", "Makgeolli trái cây", {
        desc: T("복숭아·바나나·포도", "Peach, banana, grape", "桃子·香蕉·葡萄", "桃・バナナ・ぶどう", "Đào, chuối, nho"),
      }),
      it(null, null, "태백 인삼 담금주", "Taebaek Ginseng Infused Liquor (Insam Damgeumju)", "太白人参泡酒", "テベク高麗人参漬け酒", "Rượu Nhân Sâm Ngâm", {
        sizes: [["330ml", 290000], ["500ml", 450000]],
      }),
      it(750000, null, "화요 25%", "Hwayo 25%", "火尧 25%", "火堯（ファヨ）25%", "Hwayo 25%"),
      it(1250000, null, "화요 41%", "Hwayo 41%", "火尧 41%", "火堯（ファヨ）41%", "Hwayo 41%"),
      it(990000, null, "일품진로", "Ilpum Jinro", "一品真露", "イルプム ジンロ", "Ilpum Jinro"),
      it(150000, null, "보드카 멘", "Volka Men (Vodka)", "Volka Men 伏特加", "ウォッカ ボルカ メン", "Volka Men"),
      it(340000, null, "안동소주 22%", "Andong Soju 22% (360ml)", "安东烧酒 22%（360ml）", "安東焼酎 22%（360ml）", "Soju Andong 22% (360ml)"),
      it(560000, null, "안동소주 35%", "Andong Soju 35% (360ml)", "安东烧酒 35%（360ml）", "安東焼酎 35%（360ml）", "Soju Andong 35% (360ml)"),
      it(1500000, null, "안동소주 호리병 45%", "Andong Soju Gourd Bottle 45% (400ml)", "安东烧酒 葫芦瓶 45%（400ml）", "安東焼酎 ひょうたん瓶 45%（400ml）", "Soju Andong bình hồ lô 45% (400ml)"),
      it(1900000, null, "안동소주 양반탈 (명인 박재서)", "Andong Soju Yangban Mask 45% (Master Park Jae-seo, 400ml)", "安东烧酒 两班面具 45%（名人朴宰瑞，400ml）", "安東焼酎 両班タル 45%（名人パク・ジェソ、400ml）", "Soju Andong mặt nạ Yangban 45% (nghệ nhân Park Jae-seo, 400ml)"),
    ],
  },
  {
    id: "wine",
    name: T("와인", "Wine", "葡萄酒", "ワイン", "MOSCATO / VANG TRẮNG / VANG ĐỎ"),
    items: [
      it(990000, null, "프레시넷 아스티 모스카토", "Freixenet Asti Moscato", "菲斯奈 阿斯蒂 莫斯卡托", "フレシネ アスティ モスカート", "Freixenet Asti Moscato", {
        desc: T("이탈리아 · 7%", "Italy · 7%", "意大利 · 7%", "イタリア · 7%", "Ý · 7%"),
      }),
      it(590000, null, "그랜트 버지 클래식 샤르도네", "Grant Burge Classic Chardonnay", "格兰特伯爵 经典霞多丽", "グラント・バージ クラシック シャルドネ", "Grant Burge Classic Chardonnay", {
        desc: T("호주 · 13%", "Australia · 13%", "澳大利亚 · 13%", "オーストラリア · 13%", "Úc · 13%"),
      }),
      it(990000, null, "그레이와키 소비뇽 블랑", "Greywacke Sauvignon Blanc", "灰岩 长相思", "グレイワッケ ソーヴィニヨン・ブラン", "Greywacke Sauvignon Blanc", {
        desc: T("뉴질랜드 · 13.5%", "New Zealand · 13.5%", "新西兰 · 13.5%", "ニュージーランド · 13.5%", "New Zealand · 13,5%"),
      }),
      it(590000, null, "그랜트 버지 클래식 카베르네 소비뇽", "Grant Burge Classic Cabernet Sauvignon", "格兰特伯爵 经典赤霞珠", "グラント・バージ クラシック カベルネ・ソーヴィニヨン", "Grant Burge Classic Cabernet Sauvignon", {
        desc: T("호주 · 14%", "Australia · 14%", "澳大利亚 · 14%", "オーストラリア · 14%", "Úc · 14%"),
      }),
      it(990000, null, "라포스톨 아팔타", "Lapostolle Apalta", "拉博丝特 阿帕尔塔", "ラポストール アパルタ", "Lapostolle Apalta", {
        desc: T("칠레 · 14.5%", "Chile · 14.5%", "智利 · 14.5%", "チリ · 14.5%", "Chile · 14,5%"),
      }),
      it(1490000, null, "그라타마코 볼게리 로쏘", "Grattamacco Bolgheri Rosso", "格拉塔马科 波格利红葡萄酒", "グラッタマッコ ボルゲリ・ロッソ", "Grattamacco Bolgheri Rosso", {
        desc: T("이탈리아 · 14%", "Italy · 14%", "意大利 · 14%", "イタリア · 14%", "Ý · 14%"),
      }),
      it(1990000, null, "브리오 드 칸테낙 브라운", "Brio de Cantenac Brown", "Brio de Cantenac Brown", "ブリオ・ド・カントナック・ブラウン", "Brio de Cantenac Brown", {
        desc: T("프랑스 보르도 · 13.5%", "Bordeaux, France · 13.5%", "法国波尔多 · 13.5%", "フランス ボルドー · 13.5%", "Bordeaux, Pháp · 13,5%"),
      }),
    ],
  },
];
