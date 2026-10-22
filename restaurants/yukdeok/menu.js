// 육덕 YUKDEOK 박닌 (간판 NHÀ HÀNG HÀN QUỐC 육덕 · 31N4 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "육덕" 폴더의 구글 지도 캡처 18장(1년 전 올라온 메뉴책 사진 8장 — 추천메뉴·프리미엄 숙성 돼지고기·프리미엄 생 돼지고기·프리미엄 소고기(2면)·숯불 훈제 오리·식사류, 간판·음식·지도 정보).
// 메뉴책에 한국어뿐이라 베트남어·영어·중국어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "육덕", en: "Yukdeok", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0372 407 433",
  address: "31N4 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh",
  mapQuery: "육덕 NHÀ HÀNG HÀN QUỐC 31N4 Ngọc Hân Công Chúa Bắc Ninh",
  wifi: null, // 예: { ssid: "YUKDEOK", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const G = (n) => T(`${n}g`, `${n}g`, `${n}克`, `${n}g`, `${n}g`);

window.MENU = [
  {
    id: "pick",
    name: T("추천메뉴", "Recommended", "推荐菜", "おすすめ", "Món đề xuất"),
    items: [
      it(400000, "tteokgalbi", "떡갈비", "Tteok-galbi (grilled rib patties)", "韩式烤排骨肉饼", "トッカルビ（カルビ肉の焼き物）", "Chả sườn nướng (tteok-galbi)", { unit: G(820), tag: "must", desc: T("정성을 다한 양념에 육즙이 살아 있는 상태로 직화 그릴에 구워 숯향이 가득해요.", "House-seasoned and grilled over open fire, juicy with a smoky charcoal aroma.", "以用心调制的酱料腌制，保留肉汁，直火烧烤，炭香四溢。", "丁寧に味付けして肉汁を閉じ込め、直火で焼いた炭の香り豊かな一品。", "Tẩm ướp kỹ, giữ trọn nước thịt, nướng lửa trực tiếp thơm mùi than.") }),
      it(600000, "galbikimchijjim", "등갈비 김치찜", "Braised pork back ribs with kimchi", "泡菜炖猪排骨", "豚スペアリブのキムチ蒸し煮", "Sườn heo hầm kimchi", { unit: G(750), tag: "must", desc: T("잡내를 없애려고 여러 재료로 삶은 뒤 김치와 함께 정성껏 끓여 내요.", "Boiled first with a mix of ingredients to remove any gaminess, then simmered with kimchi.", "先用多种食材煮去腥味，再与泡菜一起细心炖煮。", "臭みを取るため様々な食材で下茹でしてから、キムチと一緒にじっくり煮込みます。", "Luộc trước với nhiều nguyên liệu để khử mùi, sau đó hầm cùng kimchi.") }),
    ],
  },
  {
    id: "pork",
    name: T("프리미엄 돼지고기", "Premium pork", "优质猪肉", "プレミアム豚肉", "Thịt heo cao cấp"),
    items: [
      it(200000, "samgyeop", "삼겹살 (숙성)", "Aged pork belly (samgyeopsal)", "熟成五花肉", "熟成サムギョプサル", "Ba chỉ heo ủ chín", { tag: "must", desc: T("신선한 생고기를 전문 숙성으로 풍부한 육즙과 부드러운 식감을 살렸어요.", "Fresh pork, professionally aged for rich juices and a tender bite.", "新鲜猪肉经专业熟成，肉汁丰富，口感软嫩。", "新鮮な生肉を専門的に熟成し、豊かな肉汁と柔らかな食感に。", "Thịt tươi được ủ chín chuyên nghiệp, nhiều nước và mềm.") }),
      it(200000, "moksal", "목살 (숙성)", "Aged pork shoulder (moksal)", "熟成猪梅花肉", "熟成豚肩ロース（モクサル）", "Thịt vai heo ủ chín", { tag: "must" }),
      it(220000, "galmaegi", "갈매기살", "Pork skirt (galmaegi-sal)", "猪横膈膜", "豚ハラミ（カルメギサル）", "Thịt hoành heo (galmaegi-sal)", { desc: T("당일 도축한 신선한 고기를 하루 만에 잡내를 없애 내요.", "Fresh meat from same-day slaughter, prepared within a day to remove any gaminess.", "当日屠宰的新鲜猪肉，一天内去除腥味后上桌。", "当日屠畜した新鮮な肉を一日かけて臭みを取って提供します。", "Thịt tươi giết mổ trong ngày, khử mùi trong một ngày rồi mới phục vụ.") }),
      it(220000, "ppolsal", "뽈살", "Pork cheek (ppol-sal)", "猪颊肉", "豚ほほ肉（ポルサル）", "Thịt má heo (ppol-sal)", { desc: T("당일 도축한 신선한 고기를 하루 만에 잡내를 없애 내요.", "Fresh meat from same-day slaughter, prepared within a day to remove any gaminess.", "当日屠宰的新鲜猪肉，一天内去除腥味后上桌。", "当日屠畜した新鮮な肉を一日かけて臭みを取って提供します。", "Thịt tươi giết mổ trong ngày, khử mùi trong một ngày rồi mới phục vụ.") }),
      it(220000, "hangjeong", "항정살", "Pork jowl (hangjeongsal)", "猪颈肉", "豚ののど肉（ハンジョンサル）", "Thịt cổ heo (hang-jeong-sal)", { desc: T("당일 도축한 신선함이 살아 있는 고기예요.", "Fresh meat from same-day slaughter.", "保留当日屠宰的新鲜度。", "当日屠畜した新鮮さそのままのお肉です。", "Thịt tươi giết mổ trong ngày.") }),
    ],
  },
  {
    id: "beef",
    name: T("프리미엄 소고기", "Premium beef", "优质牛肉", "プレミアム牛肉", "Thịt bò cao cấp"),
    items: [
      it(350000, "galbisal", "갈비살", "Beef rib finger meat (galbisal)", "牛排骨肉", "牛カルビ（カルビサル）", "Thịt sườn bò (galbi-sal)", { unit: G(150), desc: T("본갈비살·꽃갈비살·참갈비살 중 참갈비살을 내요.", "The true rib-finger cut (cham-galbisal) of the three rib-finger cuts.", "在本排骨肉、花排骨肉、真排骨肉中，使用真排骨肉。", "骨付き・花・真カルビサルのうち、真カルビサルを提供します。", "Dùng phần galbi-sal thật (cham-galbisal) trong ba loại.") }),
      it(500000, "kkotsal", "꽃살", "Prime beef kkot-sal", "极品牛花肉", "特選牛 コッサル", "Bò cao cấp kkot-sal", { unit: G(150), desc: T("최고 등급인 프라임 등급으로 부드럽고 육즙이 가득해요.", "Top-grade prime beef, tender and full of juice.", "最高等级的特级牛肉，软嫩多汁。", "最高等級のプライム等級で、柔らかく肉汁たっぷり。", "Hạng prime cao nhất, mềm và đầy nước thịt.") }),
      it(380000, "yukhoe", "육회", "Beef tartare (yukhoe)", "生拌牛肉", "ユッケ", "Gỏi bò sống (yukhoe)", { desc: T("결이 곱고 지방이 적은 우둔살로 정성껏 만들어요.", "Made carefully from fine-grained, lean top round.", "选用肉质细腻、脂肪少的牛臀肉精心制作。", "きめ細かく脂肪の少ないウチモモ肉で丁寧に仕上げます。", "Làm cẩn thận từ thịt mông bò nạc, thớ mịn.") }),
    ],
  },
  {
    id: "duck",
    name: T("숯불 훈제 오리", "Charcoal-smoked duck", "炭火烟熏鸭", "炭火燻製鴨", "Vịt hun khói than"),
    items: [
      it(null, "duck", "숯불 훈제 오리", "Charcoal-smoked duck", "炭火烟熏鸭", "炭火燻製鴨", "Vịt hun khói than", { sizes: [[T("한 마리", "Whole", "一只", "1羽", "Nguyên con"), 700000], [T("반 마리", "Half", "半只", "半羽", "Nửa con"), 400000]] }),
    ],
  },
  {
    id: "meal",
    name: T("식사류", "Meals & noodles", "饭 · 面", "食事・麺", "Cơm · Mì"),
    items: [
      it(120000, "kimchimal", "김치말이 국수", "Kimchi-broth noodles (kimchi-mari guksu)", "泡菜汤面", "キムチ汁そうめん", "Mỳ kimchi"),
      it(120000, "bibim", "비빔국수", "Spicy mixed noodles (bibim-guksu)", "韩式拌面", "ビビン麺", "Mỳ trộn cay (bibim)"),
      it(120000, "janchi", "잔치국수", "Banquet noodles (janchi-guksu)", "韩式汤面", "チャンチグクス（温かいそうめん）", "Mỳ janchi (mỳ nước)"),
      it(140000, "naengmomil", "냉모밀", "Cold soba noodles (naeng-momil)", "冷荞麦面", "冷やしそば", "Mì soba lạnh"),
      it(100000, "kimchijjigae", "김치찌개", "Kimchi stew", "泡菜汤", "キムチチゲ", "Canh kimchi"),
      it(100000, "doenjang", "된장찌개", "Soybean paste stew", "大酱汤", "テンジャンチゲ", "Canh tương đậu"),
      it(80000, "gyeranjjim", "계란찜", "Steamed egg (gyeran-jjim)", "蒸蛋", "韓国式茶碗蒸し（ケランチム）", "Trứng hấp"),
    ],
  },
];
