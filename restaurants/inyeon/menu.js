// 인연식당 Nhân Duyên 하노이 미딩 '하노이 원조 족발전문점'(2007년부터) (Lô 103 TT3, Hoàng Trọng Mậu / KĐT Mỹ Đình, Từ Liêm, Hà Nội) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND (세금 별도)
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 드라이브 QR메뉴판/인연식당 폴더의 구글 지도 손님 사진(메뉴책 새 판 기준)
// 메뉴판에 한국어·베트남어·영어가 있어 한·베는 그대로 쓰고 영어는 다듬고, 중국어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "인연식당", en: "Nhan Duyen", branch: { ko: "하노이 미딩", en: "Mỹ Đình, Hà Nội" } },
  phone: "0903 302 859",
  address: "Lô 103 TT3, Hoàng Trọng Mậu / KĐT Mỹ Đình, Từ Liêm, Hà Nội",
  mapQuery: "인연식당 Nhân Duyên Lô 103 TT3 Mỹ Đình Hà Nội",
  wifi: null, // 예: { ssid: "NHANDUYEN", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

// 크기 라벨: 소(0.5kg)·대(1kg)
const L_S = T("소 (0.5kg)", "Small (0.5 kg)", "小（0.5公斤）", "小（0.5kg）", "Nhỏ (0,5kg)");
const L_L = T("대 (1kg)", "Large (1 kg)", "大（1公斤）", "大（1kg）", "Lớn (1kg)");
const SL = (a, b) => [[L_S, a], [L_L, b]]; // 소·대

window.MENU = [
  {
    id: "special",
    name: T("추천 · 족발", "Specials · Pork feet", "招牌 · 猪蹄（족발）", "おすすめ・チョッパル", "ĐẶC BIỆT"),
    note: T(
      "족발은 대(1kg)와 소(0.5kg) 중에서 골라요. 주먹밥을 곁들이면 더 맛있어요.",
      "Pork feet come in Large (1 kg) or Small (0.5 kg). They taste even better with rice balls.",
      "猪蹄可选大份（1公斤）或小份（0.5公斤）。搭配饭团更美味。",
      "チョッパルは大（1kg）と小（0.5kg）からお選びいただけます。おにぎりと一緒に食べるとさらにおいしいです。",
      "Chân giò gồm cỡ lớn 1kg và nhỏ 0,5kg. Ăn kèm cơm nắm sẽ ngon hơn."
    ),
    items: [
      it(null, "waengjokbal", "왕족발", "Korean-style pork feet (wang-jokbal)", "韩式大猪蹄（왕족발）", "ワン・チョッパル（韓国式豚足）", "Chân Giò Truyền thống Hàn Quốc", {
        tag: "best",
        desc: T("돼지 족을 간장 양념에 푹 삶은 한국식 족발", "Pig's trotters simmered in a soy-based sauce, Korean style", "猪蹄用酱油酱汁炖煮的韩式招牌菜", "豚足を醤油ダレでじっくり煮込んだ韓国式チョッパル", "Chân giò heo nấu mềm trong sốt xì dầu theo kiểu Hàn Quốc"),
        sizes: SL(350000, 630000),
      }),
      it(null, "naengchae", "냉채족발", "Pork feet with cold salad (naengchae-jokbal)", "凉菜猪蹄（냉채족발）", "冷菜チョッパル（サラダ添え豚足）", "Chân Giò Kèm SaLad", {
        desc: T("족발에 새콤한 냉채 샐러드를 곁들인 메뉴", "Pork feet served with a tangy cold salad", "猪蹄搭配酸爽凉拌沙拉", "チョッパルに酸味のある冷菜サラダを添えました", "Chân giò ăn kèm salad lạnh chua nhẹ"),
        sizes: SL(420000, 730000),
      }),
      it(320000, "makguksu", "쟁반막국수", "Cold buckwheat noodles with sauce (jaengban-makguksu)", "拌荞麦冷面拼盘（쟁반막국수）", "チェンバン・マックグクス（冷たいそばの和え麺）", "Mì Lạnh Trộn Sốt"),
      it(100000, "jumeokbap", "주먹밥", "Rice balls (jumeokbap)", "饭团（주먹밥）", "おにぎり（チュモクパプ）", "Cơm nắm"),
    ],
  },
  {
    id: "grill",
    name: T("구이", "Grilled", "烧烤", "焼き物", "NƯỚNG"),
    items: [
      it(220000, "dakkkochi", "닭꼬치구이", "Grilled chicken skewers (dak-kkochi)", "烤鸡肉串（닭꼬치구이）", "焼き鳥（タッコチ）", "Gà Nướng"),
      it(390000, "samgyeopsal", "고추장통삼겹살", "Grilled whole pork belly with gochujang", "辣酱烤整块五花肉（고추장통삼겹살）", "コチュジャン厚切り豚バラ焼き", "Thịt Ba Chỉ Kochujang", { spicy: true }),
      it(250000, "godeungeo", "고등어", "Grilled mackerel (godeungeo)", "烤鲭鱼（고등어）", "サバの塩焼き（コドゥンオ）", "Cá Saba Nướng"),
      it(390000, "saewoo", "새우튀김", "Shrimp tempura (saewoo-twigim)", "炸虾（새우튀김）", "エビの天ぷら（セウトゥイギム）", "Tôm Chiên"),
      it(340000, "modeum", "모듬튀김", "Assorted tempura (modeum-twigim)", "什锦炸物（모듬튀김）", "盛り合わせ天ぷら（モドゥムトゥイギム）", "Tôm và rau chiên"),
      it(220000, "ddongjip", "닭똥집", "Chicken gizzards stir-fried with sesame oil (ddongjip)", "香油炒鸡胗（닭똥집）", "砂肝のごま油炒め（タクトンジプ）", "Mề Gà Xào"),
    ],
  },
  {
    id: "fry",
    name: T("볶음", "Stir-fried", "炒菜", "炒め物", "XÀO"),
    items: [
      it(390000, "jeyuk", "제육볶음", "Jeyuk-bokkeum (spicy stir-fried pork)", "辣炒猪肉（제육볶음）", "ジェユクポックム（豚肉の辛口炒め）", "Thịt Nạc Vai Xào", { spicy: true, tag: "best" }),
      it(350000, "cheesetteok", "치즈해물떡볶이", "Cheese seafood tteokbokki", "芝士海鲜辣炒年糕（치즈해물떡볶이）", "チーズ海鮮トッポッキ", "Tokk Hải Sản Rắc Phô Mai", { spicy: true }),
      it(230000, "odengtteok", "오뎅떡볶이", "Fish cake tteokbokki (odeng-tteokbokki)", "鱼饼辣炒年糕（오뎅떡볶이）", "おでんトッポッキ", "Tokk Chả Cá", { spicy: true }),
      it(390000, "hanchi", "한치두루치기", "Spicy fried squid with vegetables (hanchi-duruchigi)", "辣炒鱿鱼配蔬菜（한치두루치기）", "ヤリイカと野菜の辛口炒め（ハンチドゥルチギ）", "Mực Xào", { spicy: true }),
      it(390000, "jukkumi", "주꾸미볶음", "Stir-fried small octopus (jukkumi-bokkeum)", "辣炒小章鱼（주꾸미볶음）", "イイダコ炒め（チュクミポックム）", "Bạch Tuộc Xào", { spicy: true }),
      it(380000, "golbaengi", "골뱅이무침", "Sweet and spicy whelk salad (golbaengi-muchim)", "凉拌海螺（골뱅이무침）", "つぶ貝の和え物（コルベンイムチム）", "Ốc Trộn", { spicy: true }),
    ],
  },
  {
    id: "soup",
    name: T("탕", "Hot pot & soup", "汤锅", "鍋・スープ", "CANH"),
    items: [
      it(740000, null, "동태매운탕 (3~4인분)", "Dongtae maeuntang (spicy pollack stew, serves 3-4)", "辣明太鱼汤（동태매운탕，3~4人份）", "トンテメウンタン（スケトウダラの辛口鍋、3〜4人前）", "Canh Cá Đông Thể", { spicy: true }),
      it(390000, null, "꼬치오뎅탕", "Skewered fish cake soup (kkochi-odengtang)", "鱼饼串汤（꼬치오뎅탕）", "串おでん鍋（コチオデンタン）", "Canh Chả Cá"),
      it(170000, null, "번데기탕", "Spicy silkworm pupa soup (beondegi-tang)", "辣蚕蛹汤（번데기탕）", "蚕のさなぎのスープ（ポンデギタン、辛口）", "Nhộng Nấu Cay", { spicy: true }),
    ],
  },
  {
    id: "meal",
    name: T("식사류", "Rice & noodles", "主食", "お食事", "CƠM VÀ MÌ"),
    items: [
      it(null, "seolleongtang", "설렁탕", "Seolleongtang (ox bone soup)", "雪浓汤（설렁탕）", "ソルロンタン（牛骨スープ）", "Canh Bò"),
      it(190000, "sundubu", "해물순두부", "Seafood soft tofu stew (haemul-sundubu)", "海鲜嫩豆腐汤（해물순두부）", "海鮮スンドゥブ（やわらか豆腐鍋）", "Canh Đậu Phụ Hải Sản", { spicy: true }),
      it(180000, "naengmomil", "냉모밀정식", "Cold soba noodle set (naeng-momil)", "冷荞麦面套餐（냉모밀정식）", "冷たいそば定食（ネンモミル）", "Mì Lạnh"),
      it(180000, "kimchijjigae", "김치찌개", "Kimchi stew (kimchi-jjigae)", "泡菜汤（김치찌개）", "キムチチゲ", "Canh Kim Chi", { spicy: true }),
      it(180000, "ureong", "우렁된장찌개", "Soybean paste stew with snails (ureong-doenjang-jjigae)", "田螺大酱汤（우렁된장찌개）", "タニシ入りテンジャンチゲ（ウロンテンジャンチゲ）", "Canh Duen Jang"),
      it(120000, "ramen", "라면", "Korean ramyeon (instant noodles)", "韩式拉面（라면）", "韓国ラーメン（ラミョン）", "Mì Hàn Quốc", { spicy: true }),
    ],
  },
  {
    id: "extra",
    name: T("추가", "Extras", "加料", "追加", "THÊM"),
    items: [
      it(130000, null, "모밀사리", "Extra soba noodles (momil-sari)", "加荞麦面（모밀사리）", "そば追加（モミルサリ）", "Thêm Mì Lạnh"),
      it(70000, null, "막국수사리", "Extra buckwheat noodles (makguksu-sari)", "加荞麦冷面（막국수사리）", "マックグクス追加（マックグクスサリ）", "Thêm Mì Nhật Bản"),
      it(50000, null, "소면/라면사리", "Extra thin wheat noodles (somyeon) / ramyeon noodles", "加细面（소면）/ 拉面", "そうめん／ラーメン追加（ソミョン／ラミョンサリ）", "Thêm Mì Trắng / Mì Hàn Quốc"),
      it(10000, null, "공기밥", "Steamed rice (gongi-bap)", "米饭（공기밥）", "ライス（コンギパプ）", "Thêm Cơm"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒水 · 饮料", "お酒・ドリンク", "RƯỢU · NƯỚC NGỌT"),
    items: [
      it(190000, null, "생막걸리", "Draft makgeolli (Korean rice wine)", "生米酒（생막걸리）", "生マッコリ", "Rượu gạo Hàn Quốc"),
      it(150000, null, "처음처럼/참이슬", "Soju (Chum-churum / Chamisul)", "烧酒（初饮初乐 처음처럼 / 真露 참이슬）", "焼酎（チョウムチョロム／チャミスル）", "Rượu Chum Churum / Cham I Sul"),
      it(150000, null, "새로/진로이즈백", "Soju (Saero / Jinro Is Back)", "烧酒（Saero 새로 / Jinro Is Back 진로이즈백）", "焼酎（セロ／ジンロイズバック）", "Rượu Sero / IS back"),
      it(50000, null, "타이거/사이공", "Beer (Tiger / Saigon)", "啤酒（虎牌 / 西贡）", "ビール（タイガー／サイゴン）", "Bia Tiger / Saigon"),
      it(180000, null, "홍초", "Hongcho (Korean vinegar drink)", "红醋饮料（홍초）", "ホンチョ（韓国のお酢ドリンク）", "Hong Cho"),
      it(20000, null, "콜라/7up/라비", "Soft drinks (Coca-Cola / 7Up / Lavie water)", "饮料（可口可乐 / 7Up / Lavie 矿泉水）", "ドリンク（コカ・コーラ／7UP／ラヴィ）", "Coca-cola / 7up / Lavie"),
    ],
  },
];
