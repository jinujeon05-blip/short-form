// 오리명가 鴨料名家 NHÀ HÀNG VỊT (33 Đ. Nguyễn Tất Tố, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "오리명가" 폴더의 구글 지도 캡처 19장 (손님이 1개월 전 올린 메뉴북 7면·1년 전 벽 메뉴판·음식 사진·간판·지도 정보).
// 한국어·베트남어는 메뉴북 표기, 영어·중국어(메뉴북에 한자 병기)·일본어는 새로 옮김. 가격 단위: VND (메뉴북은 "650,000đ" 형식)
// 메뉴/가격 수정은 이 파일만 고치면 됩니다.
// it(가격, 한국어, 영어, 중국어, 일본어, 베트남어, 추가 설정) — 추가 설정: { spicy, tag: "best"|"special"|"new", desc, unit }
window.RESTAURANT = {
  brand: { ko: "오리명가", en: "鴨料名家", branch: "Bắc Ninh · Võ Cường" },
  phone: "0769 167 588",
  address: "33 Đ. Nguyễn Tất Tố, Võ Cường, Bắc Ninh",
  mapQuery: "오리명가 Nhà hàng Vịt",
  wifi: null,
};

const it = (price, ko, en, zh, ja, vi, x = {}) => ({ price, name: { ko, en, zh, ja, vi }, ...x });
const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
// 사이즈별 가격: sz([[라벨, 가격], …], 한국어, 영어, 중국어, 일본어, 베트남어, 추가 설정)
const sz = (pairs, ko, en, zh, ja, vi, x = {}) => ({ sizes: pairs, name: { ko, en, zh, ja, vi }, ...x });
const WHOLE = T("한 마리", "Whole", "整只", "1羽", "1 con");
const HALF = T("반 마리", "Half", "半只", "半羽", "1/2 con");
const SM = T("소", "Small", "小", "小", "Nhỏ");
const MD = T("중", "Medium", "中", "中", "Vừa");
const LG = T("대", "Large", "大", "大", "Lớn");
const G = (n) => T(`${n}g`, `${n}g`, `${n}g`, `${n}g`, `${n}g`);
const PER = T("1인분 · 2인분 이상 주문", "Per serving · min. 2 servings", "每份 · 2份起点", "1人前・2人前から", "1 phần · tối thiểu 2 phần");

window.MENU = [
  {
    id: "duck",
    photo: "img/duck.jpg",
    name: T("오리요리", "Duck dishes", "鴨料理", "鴨料理", "Món vịt"),
    note: T("옻오리·옻닭 백숙은 1시간 전, 건송이버섯 백숙은 2시간 전에 예약해 주세요",
      "Please reserve the lacquer-tree baeksuk 1 hour ahead and the dried pine-mushroom baeksuk 2 hours ahead",
      "漆树鸭/鸡清炖请提前 1 小时预约，干松茸清炖请提前 2 小时预约",
      "ウルシ入りペクスクは1時間前、乾燥松茸ペクスクは2時間前までにご予約ください",
      "Vui lòng đặt trước 1 giờ với món hầm cây ôt và trước 2 giờ với món hầm nấm 건송이"),
    items: [
      sz([[WHOLE, 650000], [HALF, 450000]], "오리 주물럭", "Spicy stir-fried duck (jumulleok)", "酱料烤鸭（주물럭）", "鴨のジュムルロク（ピリ辛炒め）", "Vịt xào cay (jumulleok)",
        { desc: T("매콤한 양념에 버무려 볶은 오리고기", "Duck marinated in spicy sauce and stir-fried", "香辣酱汁腌制后翻炒的鸭肉", "ピリ辛ダレで和えて炒めた鴨肉", "Thịt vịt ướp sốt cay rồi xào"), tag: "best", spicy: true }),
      sz([[WHOLE, 650000], [HALF, 450000]], "생오리 구이", "Grilled fresh duck", "烤生鸭肉", "生鴨の焼き肉", "Vịt nướng (생오리 구이)",
        { desc: T("신선한 오리고기를 구워 먹는 오리로스", "Fresh duck grilled at the table", "新鲜鸭肉现烤享用", "新鮮な鴨肉を焼いていただく鴨ロース", "Thịt vịt tươi nướng tại bàn") }),
      sz([[WHOLE, 800000], [HALF, 500000]], "오리 훈제", "Smoked duck", "熏鸭", "鴨の燻製", "Vịt hun khói",
        { desc: T("훈연해 향이 깊은 오리", "Smoked duck with deep aroma", "烟熏入味、香气浓郁的鸭肉", "燻製で香り豊かな鴨", "Vịt hun khói đậm hương") }),
      it(900000, "오리/닭 백숙", "Duck / chicken baeksuk (clear boiled soup)", "鸭/鸡清炖（백숙）", "鴨／鶏のペクスク（水炊き）", "Vịt / gà hầm thuốc bắc (baeksuk)",
        { unit: T("한 마리", "Whole bird", "整只", "1羽", "1 con"), desc: T("푹 고아 낸 깊은 맛의 보양 백숙", "A restorative, slowly simmered whole-bird soup", "长时间慢炖、味道醇厚的滋补清炖", "じっくり煮込んだ滋養たっぷりのペクスク", "Món hầm bổ dưỡng, ninh kỹ đậm vị"), tag: "best" }),
      it(1000000, "옻 오리/닭 백숙", "Lacquer-tree duck / chicken baeksuk", "漆树鸭/鸡清炖", "ウルシ入り鴨／鶏のペクスク", "Vịt / gà hầm cây ôt (옻)",
        { unit: T("한 마리", "Whole bird", "整只", "1羽", "1 con"), desc: T("옻나무를 넣어 끓인 백숙 · 1시간 전 예약", "Baeksuk simmered with lacquer-tree · reserve 1 hour ahead", "加入漆树炖煮的清炖 · 请提前 1 小时预约", "ウルシの木を入れて煮込んだペクスク・1時間前までに予約", "Món hầm với cây ôt · đặt trước 1 giờ") }),
      it(1200000, "건송이버섯 백숙", "Dried pine-mushroom baeksuk", "干松茸清炖", "乾燥松茸のペクスク", "Hầm nấm 건송이 (nấm thông khô)",
        { unit: T("한 마리", "Whole bird", "整只", "1羽", "1 con"), desc: T("건송이버섯을 넣은 보양 백숙 · 2시간 전 예약", "Baeksuk with dried pine mushrooms · reserve 2 hours ahead", "加入干松茸的滋补清炖 · 请提前 2 小时预约", "乾燥松茸入りの滋養ペクスク・2時間前までに予約", "Món hầm nấm thông khô bổ dưỡng · đặt trước 2 giờ") }),
    ],
  },
  {
    id: "main",
    photo: "img/main.jpg",
    name: T("일품요리", "Signature dishes", "一品料理", "一品料理", "Món đặc biệt"),
    note: T("닭볶음탕은 30분 전에 예약해 주세요", "Please reserve the dakbokkeumtang 30 minutes ahead", "辣炖鸡请提前 30 分钟预约", "タッポックンタンは30分前までにご予約ください", "Vui lòng đặt trước 30 phút với món gà hầm"),
    items: [
      it(200000, "삼겹살", "Pork belly (samgyeopsal)", "五花肉", "豚バラ（サムギョプサル）", "Thịt ba chỉ", { unit: PER }),
      it(220000, "항정살", "Pork jowl (hangjeongsal)", "猪颈肉（松板肉）", "豚トロ（ハンジョンサル）", "Thịt má heo", { unit: PER }),
      sz([[G(900), 650000], [G(500), 450000]], "목살 주물럭", "Spicy stir-fried pork neck (moksal jumulleok)", "酱料猪颈肉（목살 주물럭）", "豚首肉のジュムルロク（ピリ辛炒め）", "Thịt lợn xào mộc sam (목살 주물럭)", { spicy: true }),
      sz([[SM, 400000], [MD, 500000], [LG, 700000]], "감자탕", "Gamjatang (pork bone & potato stew)", "土豆炖猪骨（감자탕）", "カムジャタン", "Canh khoai tây (gamjatang)", { desc: T("돼지 등뼈와 감자를 푹 끓인 얼큰한 탕", "Spicy stew of pork spine bones and potatoes", "猪脊骨与土豆慢炖的香辣汤", "豚の背骨とじゃがいもを煮込んだ辛口鍋", "Canh sườn heo và khoai tây nấu cay"), tag: "best", spicy: true }),
      it(650000, "닭볶음탕 (한 마리)", "Braised spicy chicken (whole)", "辣炖鸡（整只）", "タッポックンタン（1羽）", "Gà hầm kim chi (1 con)", { spicy: true }),
      it(650000, "묵은지 닭볶음탕 (한 마리)", "Braised chicken with aged kimchi (whole)", "老泡菜辣炖鸡（整只）", "熟成キムチのタッポックンタン（1羽）", "Gà hầm kim chi muối lâu (1 con)", { spicy: true }),
      sz([[SM, 200000], [MD, 400000], [LG, 500000]], "돼지 김치찌개", "Pork kimchi stew", "猪肉泡菜汤", "豚キムチチゲ", "Canh kim chi thịt heo", { spicy: true }),
      it(550000, "홍어찜", "Steamed skate (hongeo-jjim)", "蒸红鱼（홍어찜）", "エイの蒸し物（ホンオチム）", "Cá đuối hấp"),
      it(null, "홍어 삼합", "Hongeo samhap (skate, pork & kimchi)", "红鱼三合（홍어삼합）", "ホンオ・サムハプ（エイ・豚・キムチ）", "Gỏi cá đuối samhap"),
      sz([[LG, 500000], [MD, 300000]], "마늘소스 보쌈", "Bossam with garlic sauce", "蒜蓉酱菜包肉", "ニンニクソースのポッサム", "Ba chỉ sốt tỏi (bossam)", { desc: T("부드럽게 삶은 돼지고기에 마늘 소스를 듬뿍", "Tender boiled pork topped with plenty of garlic sauce", "嫩煮猪肉淋上大量蒜蓉酱", "柔らかく茹でた豚肉にニンニクソースをたっぷり", "Thịt heo luộc mềm phủ nhiều sốt tỏi") }),
      sz([[LG, 1000000], [MD, 700000]], "굴 보쌈", "Oyster bossam", "生蚝菜包肉", "牡蠣ポッサム", "Gỏi hàu bossam", { desc: T("보쌈에 생굴과 김치 곁들임", "Bossam served with fresh oysters and kimchi", "菜包肉搭配鲜生蚝与泡菜", "ポッサムに生牡蠣とキムチを添えて", "Bossam ăn kèm hàu tươi và kim chi") }),
      it(120000, "잔치국수", "Janchi guksu (banquet noodles)", "喜面（잔치국수）", "チャンチククス（宴会そうめん）", "Mỳ janchi"),
    ],
  },
  {
    id: "jeon",
    photo: "img/jeon.jpg",
    name: T("전 · 튀김", "Pancakes & fries", "煎饼 · 炸物", "チヂミ・揚げ物", "Bánh xèo Hàn & đồ chiên"),
    items: [
      it(300000, "해물 파전", "Seafood scallion pancake (haemul pajeon)", "海鲜葱饼", "海鮮ねぎチヂミ", "Bánh hành hải sản", { tag: "special" }),
      it(300000, "해물 부추전", "Seafood chive pancake", "海鲜韭菜煎饼", "海鮮ニラチヂミ", "Bánh hẹ hải sản"),
      it(500000, "홍어전", "Skate pancake (hongeo-jeon)", "煎红鱼饼", "エイのチヂミ", "Cá đuối chiên"),
      it(500000, "동태전", "Pollack fritters (dongtae-jeon)", "煎明太鱼片", "スケトウダラのチヂミ（ドンテジョン）", "Cá minh thái chiên"),
      it(400000, "굴튀김", "Fried oysters", "炸牡蛎", "牡蠣フライ", "Hàu chiên"),
    ],
  },
  {
    id: "drink",
    photo: "img/drink.jpg",
    name: T("주류 · 음료", "Drinks", "酒类 · 饮料", "お酒・ドリンク", "Rượu & nước uống"),
    items: [
      it(140000, "소주", "Soju", "烧酒", "焼酎", "Soju"),
      it(280000, "설원", "Seolwon (Xueyuan) liquor", "雪原酒", "雪原（ソルウォン）", "Tuyết nguyên (설원)"),
      it(60000, "맥주 (Tiger)", "Beer (Tiger)", "啤酒（Tiger）", "ビール（タイガー）", "Bia Tiger"),
      it(160000, "막걸리", "Makgeolli (rice wine)", "米酒（막걸리）", "マッコリ", "Rượu gạo (makgeolli)"),
      it(20000, "음료수", "Soft drinks", "饮料", "ソフトドリンク", "Nước ngọt", { desc: T("환타 · 스프라이트 · 코카콜라 · 미닛메이드 스플래시", "Fanta · Sprite · Coca-Cola · Minute Maid Splash", "芬达 · 雪碧 · 可口可乐 · 美汁源 Splash", "ファンタ・スプライト・コカ・コーラ・ミニッツメイド スプラッシュ", "Fanta · Sprite · Coca-Cola · Minute Maid Splash") }),
    ],
  },
];
