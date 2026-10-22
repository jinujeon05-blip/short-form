// 수정곱창 박닌 SUJEONG · LÒNG BÒ KOREA Bắc Ninh 소곱창·대창·막창 전문점 (35 Lý Nhân Tông, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "수정곱창" 폴더의 구글 지도 캡처 20장(가게 계정이 올린 메뉴 포스터 16장 — 메뉴마다 음식 사진·가격, 전체 메뉴 한 장, 간판·지도 정보).
// 포스터에 한국어뿐이라 베트남어·영어·중국어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "수정곱창", en: "Sujeong", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0964 311 225",
  address: "35 Lý Nhân Tông, Võ Cường, Bắc Ninh",
  mapQuery: "수정곱창 박닌 Lòng bò Korea 35 Lý Nhân Tông Bắc Ninh",
  wifi: null, // 예: { ssid: "SUJEONG", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const G = (n) => T(`${n}g`, `${n}g`, `${n}克`, `${n}g`, `${n}g`);
const ONE = T("1인", "1 person", "1人", "1名", "1 người");

window.MENU = [
  {
    id: "gopchang",
    name: T("곱창 · 대창 · 막창", "Beef offal grill", "牛杂烧烤", "ホルモン焼き", "Lòng bò nướng"),
    note: T(
      "베트남 최초 천연수정불판(99.9%)에 구워 먹어요. 가격은 부위별 중량 기준이에요.",
      "Grilled on Vietnam's first natural crystal grill plate (99.9%). Prices are per the weight shown.",
      "使用越南首创的天然水晶烤盘（99.9%）烧烤。价格按所示重量计算。",
      "ベトナム初の天然水晶の焼き板（99.9%）で焼きます。価格は表示の量の基準です。",
      "Nướng trên bếp đá thạch anh tự nhiên (99,9%) đầu tiên tại Việt Nam. Giá tính theo trọng lượng ghi bên cạnh."
    ),
    items: [
      it(580000, "mixed", "모듬곱창", "Assorted beef offal", "综合牛杂", "ホルモン盛り合わせ", "Lòng bò nướng tổng hợp", { unit: G(500) }),
      it(200000, "sogop", "소곱창", "Beef small intestine (gopchang)", "牛小肠", "牛コプチャン（小腸）", "Lòng non bò nướng", { unit: G(150), tag: "best" }),
      it(200000, "daejang", "소대창", "Beef large intestine (daechang)", "牛大肠", "牛テチャン（大腸）", "Đại tràng bò nướng", { unit: G(200) }),
      it(220000, "makchang", "소막창", "Beef abomasum (makchang)", "牛百叶肚", "牛マクチャン（第四胃）", "Dạ múi khế bò nướng", { unit: G(150), tag: "best" }),
    ],
  },
  {
    id: "meat",
    name: T("고기구이", "Grilled meat", "烤肉", "焼肉", "Thịt nướng"),
    items: [
      it(150000, "kkotsam", "名品 꽃삼겹", "Premium pork belly (kkot-samgyeop)", "名品花五花肉", "名品 花サムギョプサル", "Ba chỉ heo cao cấp (kkot-samgyeop)", { unit: G(150) }),
      it(150000, "cream", "크림꽃삼겹", "Cream kkot-samgyeop (pork belly)", "奶油花五花肉", "クリーム花サムギョプサル", "Ba chỉ heo cuộn hoa kem (cream kkot-samgyeop)", { unit: G(150) }),
      it(150000, "hangjeong", "名品 항정살", "Premium pork jowl (hangjeongsal)", "名品猪颈肉", "名品 豚ののど肉（ハンジョンサル）", "Thịt má heo cao cấp", { unit: G(150) }),
      it(200000, "kkodeul", "꼬들살", "Kkodeul-sal (premium cut)", "꼬들살（特色部位）", "コットゥルサル（特選部位）", "Kkodeul-sal (thịt cao cấp)", { unit: G(150) }),
      it(200000, "galbisal", "소갈비살", "Beef rib finger meat (so-galbisal)", "牛排骨肉", "牛カルビサル", "Thịt sườn bò", { unit: G(150) }),
      it(180000, "moksal", "名品 양념목살", "Premium marinated pork shoulder (yangnyeom-moksal)", "名品酱腌猪颈肉", "名品 味付け豚肩ロース", "Thịt vai heo ướp gia vị cao cấp", { unit: G(250) }),
    ],
  },
  {
    id: "special",
    name: T("전골 · 육회 · SET", "Hot pot, tartare & sets", "火锅 · 生拌牛肉 · 套餐", "鍋・ユッケ・セット", "Lẩu · Gỏi · Set"),
    items: [
      it(null, "jeongol", "곱창전골", "Beef tripe hot pot (gopchang jeongol)", "牛杂火锅", "ホルモン鍋（コプチャンジョンゴル）", "Lẩu lòng bò", { sizes: [[T("소", "S", "小", "小", "Nhỏ"), 400000], [T("중", "M", "中", "中", "Vừa"), 550000], [T("대", "L", "大", "大", "Lớn"), 800000]], tag: "best", desc: T("진하게 우린 특제 사골육수로 속까지 개운하게!", "In a rich house-made beef-bone broth.", "以浓郁的特制牛骨高汤熬制。", "じっくり煮出した特製の牛骨スープで。", "Nước dùng xương bò đặc chế đậm đà.") }),
      it(220000, "jeongol", "점심특선 곱창전골 (1인)", "Lunch special: beef tripe hot pot (1 person)", "午餐特餐 牛杂火锅（1人）", "ランチ特選 ホルモン鍋（1人前）", "Set trưa: Lẩu lòng bò (1 người)", { tag: "best", desc: T("대접밥 포함", "Bowl of rice included", "含一碗米饭", "ご飯付き", "Kèm cơm") }),
      it(880000, null, "실속 모듬 SET", "Value assorted SET", "实惠综合套餐", "お得な盛り合わせセット", "Set tổng hợp tiết kiệm", { tag: "best", desc: T("모듬곱창 + 곱창전골", "Assorted offal + beef tripe hot pot", "综合牛杂 + 牛杂火锅", "ホルモン盛り合わせ + ホルモン鍋", "Lòng bò tổng hợp + Lẩu lòng bò") }),
      it(200000, "coldnoodle", "크림 냉면 SET", "Cream pork belly + cold noodles SET", "奶油五花肉 + 冷面套餐", "クリームサムギョプサル + 冷麺セット", "Set ba chỉ cream + mì lạnh", { tag: "best", desc: T("크림삼겹살 + 물냉면 또는 비빔냉면", "Cream pork belly + water or spicy cold noodles", "奶油五花肉 + 水冷面或拌冷面", "クリームサムギョプサル + 水冷麺またはビビン冷麺", "Ba chỉ cream + mì lạnh nước hoặc trộn") }),
      it(150000, "yukhoe", "名品 육회", "Premium beef tartare (yukhoe)", "名品生拌牛肉", "名品 ユッケ", "Gỏi bò sống cao cấp (yukhoe)", { sizes: [[G(100), 150000], [G(200), 250000]] }),
      it(200000, null, "뚝배기불고기", "Bulgogi in a stone pot", "石锅烤肉", "トゥッペギプルコギ（土鍋）", "Bulgogi nồi đất"),
    ],
  },
];
