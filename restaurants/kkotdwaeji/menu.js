// 꽃돼지 삼겹살 Kotteji (간판 NHÀ HÀNG HÀN QUỐC 꽃돼지 삼겹살 · 21N8 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "박닌 꽃돼지" 폴더의 구글 지도 캡처 16장(손님이 1년 전 올린 매장 벽 메뉴판 사진 1장, 간판·음식 사진 14장, 지도 정보).
// 메뉴판에 한국어·중국어·베트남어가 있어 한·베는 그대로 쓰고, 영어·중국어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "꽃돼지 삼겹살", en: "Kotteji", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0868 974 029",
  address: "21N8 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh",
  mapQuery: "박닌 꽃돼지 Kotteji 21N8 Ngọc Hân Công Chúa Bắc Ninh",
  wifi: null, // 예: { ssid: "KOTTEJI", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const G = (n) => T(`${n}g`, `${n}g`, `${n}克`, `${n}g`, `${n}g`);
const ONE = T("1인분", "1 serving", "1人份", "1人前", "1 người");
const S1 = (ko, en, zh, ja, vi, p, x = {}) => it(p, null, ko, en, zh, ja, vi, x);

const SOUP_NOTE = T(
  "세트의 찌개는 김치찌개 · 된장찌개 · 순두부찌개 · 매운 오뎅탕 중에서 골라요.",
  "Choose the stew in a set from kimchi stew, soybean paste stew, soft tofu stew or spicy fish cake soup.",
  "套餐的汤可从泡菜汤、大酱汤、嫩豆腐汤、辣鱼饼汤中任选。",
  "セットのチゲは、キムチチゲ・テンジャンチゲ・スンドゥブチゲ・辛いおでん鍋から選べます。",
  "Canh trong set tự chọn: canh kimchi, canh tương, canh đậu non hoặc canh chả cá cay."
);

window.MENU = [
  {
    id: "set",
    name: T("세트 · 콤보", "Sets & combo", "套餐 · 拼盘", "セット・コンボ", "Set · Combo"),
    note: SOUP_NOTE,
    items: [
      it(520000, null, "삼겹 모듬 콤보 (600g)", "Pork combo (600 g)", "猪肉拼盘（600克）", "豚肉コンボ（600g）", "Combo thịt heo (600g)"),
      it(480000, null, "세트 1", "Set 1", "套餐1", "セット1", "Sét 1", { desc: T("편육 + 고갈비(고등어구이) + 막국수", "Boiled pork slices (pyeonyuk) + grilled mackerel + buckwheat noodles", "猪肉冻 + 烤青花鱼 + 拌荞麦面", "ポッサム風ゆで豚 + サバの焼き物 + マッククス", "Giò + Cá + Mỳ") }),
      it(480000, null, "세트 2", "Set 2", "套餐2", "セット2", "Sét 2", { desc: T("닭꼬치 + 두부김치 + 찌개", "Chicken skewers + tofu with stir-fried kimchi + stew", "鸡肉串 + 炒泡菜配豆腐 + 汤", "焼き鳥串 + 豆腐キムチ + チゲ", "Gà xiên + Đậu phụ kimchi + Canh") }),
      it(480000, null, "세트 3", "Set 3", "套餐3", "セット3", "Sét 3", { desc: T("닭꼬치 + 편육 + 찌개", "Chicken skewers + boiled pork slices + stew", "鸡肉串 + 韩式猪肉冻 + 汤", "焼き鳥串 + ゆで豚 + チゲ", "Gà xiên + Giò + Canh") }),
      it(600000, "jokgalbi", "세트 4", "Set 4", "套餐4", "セット4", "Sét 4", { desc: T("쪽갈비 + 삼겹살 + 찌개", "Grilled pork ribs + pork belly + stew", "烤猪排骨 + 五花肉 + 汤", "豚スペアリブ + サムギョプサル + チゲ", "Sườn + ba chỉ + Canh") }),
    ],
  },
  {
    id: "grill",
    name: T("구이", "Grilled dishes", "烧烤", "焼き物", "Món nướng"),
    items: [
      it(null, "sam", "삼겹살", "Grilled pork belly (samgyeopsal)", "烤五花肉", "サムギョプサル", "Thịt ba chỉ", { sizes: [[G(200), 180000], [T("1근 (600g)", "600 g", "600克", "600g", "600g"), 500000]], tag: "must" }),
      it(180000, null, "항정살", "Pork jowl (hangjeongsal)", "猪颈肉", "豚ののど肉（ハンジョンサル）", "Thịt má heo", { unit: G(200) }),
      it(180000, null, "목살", "Pork shoulder (moksal)", "猪梅花肉", "豚の肩ロース（モクサル）", "Thịt vai", { unit: G(200) }),
      it(180000, null, "대패삼겹살", "Thin-sliced pork belly", "薄切五花肉", "薄切りサムギョプサル", "Ba chỉ bào mỏng", { unit: G(200) }),
      it(null, "jokgalbi", "쪽갈비구이", "Grilled pork ribs", "烤猪排骨", "豚スペアリブ焼き", "Sườn lợn nướng", { sizes: [[G(500), 350000], [T("1kg", "1 kg", "1公斤", "1kg", "1kg"), 650000]] }),
      it(180000, null, "고갈비 (고등어구이)", "Grilled mackerel with sauce", "酱烤青花鱼", "サバの甘辛焼き（コガルビ）", "Cá thu nướng sốt"),
      it(180000, null, "닭꼬치", "Chicken skewers", "鸡肉串", "焼き鳥串", "Gà xiên"),
    ],
  },
  {
    id: "stew",
    name: T("찌개 · 찜 · 탕", "Stews & hot pots", "炖菜 · 汤锅", "チゲ・蒸し煮・鍋", "Canh · Lẩu · Món hầm"),
    items: [
      it(null, "kimchijjim", "묵은지 김치찜", "Braised aged kimchi with pork", "炖老泡菜", "熟成キムチの蒸し煮", "Canh kimchi hầm", { sizes: [[T("중", "M", "中", "中", "Nhỏ"), 500000], [T("대", "L", "大", "大", "Lớn"), 650000]] }),
      it(null, "galbijjim", "매운 갈비찜", "Spicy braised short ribs", "麻辣炖排骨", "辛いカルビチム", "Canh sườn hầm cay", { sizes: [[T("중", "M", "中", "中", "Nhỏ"), 500000], [T("대", "L", "大", "大", "Lớn"), 650000]], spicy: true }),
      it(140000, null, "돼지 김치찌개", "Pork kimchi stew", "猪肉泡菜汤", "豚キムチチゲ", "Canh kimchi", { unit: ONE }),
      it(160000, "kimchi", "참치 김치찌개", "Tuna kimchi stew", "金枪鱼泡菜汤", "ツナキムチチゲ", "Canh kimchi cá ngừ", { unit: ONE }),
      it(140000, null, "김치 꿀꿀이", "Kimchi pork-and-rice soup (kimchi kkulkkuri)", "泡菜汤饭", "キムチクルクリ（汁ご飯）", "Kimchi kunkuni"),
      it(120000, null, "된장 꿀꿀이", "Soybean paste pork-and-rice soup", "大酱汤饭", "テンジャンクルクリ（汁ご飯）", "Canh tương kunkuni"),
      it(120000, null, "된장찌개", "Soybean paste stew", "大酱汤", "テンジャンチゲ", "Canh tương đậu"),
      it(140000, null, "얼큰 순두부", "Spicy soft tofu stew", "辣嫩豆腐汤", "辛いスンドゥブチゲ", "Canh đậu non cay", { unit: ONE, spicy: true }),
      it(140000, null, "얼큰한 매운 오뎅탕", "Spicy fish cake soup", "麻辣鱼饼汤", "辛いおでん鍋", "Canh chả cá cay", { unit: ONE, spicy: true }),
      it(null, "budae", "부대찌개", "Army stew (budae-jjigae)", "部队火锅", "プデチゲ", "Lẩu quân đội", { unit: ONE }),
    ],
  },
  {
    id: "anju",
    name: T("안주", "Side dishes & bar snacks", "下酒菜", "おつまみ", "Món nhắm"),
    items: [
      it(200000, null, "편육", "Boiled pork slices (pyeonyuk)", "韩式猪肉冻", "ゆで豚（ピョニュク）", "Giò thủ Hàn Quốc", { unit: G(200) }),
      it(180000, null, "두부김치", "Tofu with stir-fried kimchi", "炒泡菜配豆腐", "豆腐キムチ", "Kimchi xào & đậu phụ"),
      it(180000, null, "먹태", "Dried pollock (meoktae), 1 fish", "干明太鱼（1条）", "干しスケトウダラ（モクテ）1尾", "Cá minh thái", { unit: T("1마리", "1 fish", "1条", "1尾", "1 con") }),
      it(280000, null, "꼬치 오뎅탕", "Fish cake skewer soup", "鱼饼串汤", "串おでん鍋", "Canh chả cá xiên"),
      it(260000, null, "홍합탕", "Mussel soup", "青口汤", "ムール貝のスープ", "Canh vẹm biển"),
    ],
  },
  {
    id: "meal",
    name: T("식사 · 면", "Meals & noodles", "饭 · 面", "ご飯・麺", "Cơm · Mì"),
    items: [
      it(150000, null, "제육볶음", "Stir-fried spicy pork", "韩式辣炒猪肉", "豚の辛炒め（チェユクポックム）", "Thịt lợn xào cay"),
      it(150000, null, "돼지불백", "Pork bulgogi", "韩式烤猪肉", "豚プルコギ（ブルベク）", "Bulgogi thịt lợn"),
      it(120000, "kimchimal", "김치말이 국수 (냉)", "Cold kimchi noodles", "泡菜冷汤面", "キムチ冷やし麺", "Mỳ kimchi lạnh"),
      it(120000, "mulnaeng", "물냉면", "Cold buckwheat noodles in broth (mul-naengmyeon)", "冷面", "水冷麺", "Miến lạnh"),
      it(120000, null, "막국수", "Spicy mixed buckwheat noodles", "拌荞麦面", "マッククス（混ぜ麺）", "Mỳ trộn"),
      it(120000, "janchi", "잔치국수", "Warm banquet noodles (janchi-guksu)", "热汤面", "温かいそうめん（チャンチグクス）", "Mỳ janji nóng"),
      it(80000, "bokkeum", "볶음밥", "Fried rice", "炒饭", "チャーハン", "Cơm rang"),
      it(20000, null, "공깃밥", "Steamed rice", "米饭", "白ご飯", "Cơm trắng"),
    ],
  },
];
