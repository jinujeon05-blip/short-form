// 복나라 NHÀ HÀNG BOKNARA (Bắc Ninh) 메뉴 데이터 — 복어 요리·활어회 한식당
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "QR메뉴판/복나라" 폴더의 구글 지도 캡처 12장 (모두 손님 사진). 복 요리·SET는 11개월 전,
//   해산물·활어회는 2년 전, 주류는 3년 전 사진 기준이라 가격이 바뀌었을 수 있음. 메뉴판은 한국어뿐 → 다른 언어는 번역.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격 / sizes: [[{ko,en,…}, 가격], …] / tag: "best" / spicy: true
window.RESTAURANT = {
  brand: { ko: "복나라", en: "BOKNARA", sub: "Korean Pufferfish & Sashimi", branch: "Bắc Ninh" },
  phone: "0902 545 080",
  address: "Lô 28N5 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh",   // 간판 기준 (28N5는 작은 글씨라 확인 필요)
  mapQuery: "BokNaRa 복나라",
  wifi: null,
};

const ONE = { ko: "1인 뚝배기", en: "Single pot", zh: "1人份砂锅", ja: "1人前（トゥッペギ）", vi: "Nồi đất 1 người" };
const SET = { ko: "복튀김 세트", en: "With fried puffer", zh: "配炸河豚", ja: "フグ天ぷらセット", vi: "Kèm cá nóc chiên" };
const HM = { ko: "전골 중", en: "Hot pot M", zh: "火锅 中", ja: "鍋 中", vi: "Lẩu vừa" };
const HL = { ko: "전골 대", en: "Hot pot L", zh: "火锅 大", ja: "鍋 大", vi: "Lẩu lớn" };
const M = { ko: "중", en: "M", zh: "中", ja: "中", vi: "Vừa" };
const LG = { ko: "대", en: "L", zh: "大", ja: "大", vi: "Lớn" };
const S = { ko: "소", en: "S", zh: "小", ja: "小", vi: "Nhỏ" };

window.MENU = [
  {
    id: "soup",
    photo: "img/soup.jpg",
    name: { ko: "복 요리", en: "Pufferfish Soups", zh: "河豚料理", ja: "フグ料理", vi: "Món cá nóc" },
    note: { ko: "복3탕은 복지리에 전복·낙지·새우를 더한 보양식입니다", en: "Bok 3-tang is clear pufferfish soup with abalone, octopus and shrimp added", zh: "河豚三汤是在河豚清汤中加入鲍鱼、章鱼和虾的滋补汤", ja: "フグ3湯はフグちりにアワビ・タコ・エビを加えた滋養食です", vi: "Lẩu 3 món là canh cá nóc thêm bào ngư, bạch tuộc và tôm" },
    items: [
      { sizes: [[ONE, 180000], [SET, 200000], [HM, 500000], [HL, 700000]], tag: "best",
        name: { ko: "복 지리", en: "Clear Pufferfish Soup (Bok-jiri)", zh: "河豚清汤", ja: "フグちり", vi: "Canh cá nóc (nước trong)" } },
      { sizes: [[ONE, 180000], [SET, 200000], [HM, 500000], [HL, 700000]], spicy: true,
        name: { ko: "복 매운탕", en: "Spicy Pufferfish Stew", zh: "辣河豚汤", ja: "フグの辛い鍋（メウンタン）", vi: "Lẩu cá nóc cay" } },
      { sizes: [[ONE, 250000], [SET, 270000], [HM, 700000], [HL, 900000]],
        name: { ko: "복 3탕", en: "Bok 3-tang (with abalone, octopus & shrimp)", zh: "河豚三汤（加鲍鱼、章鱼、虾）", ja: "フグ3湯（アワビ・タコ・エビ入り）", vi: "Lẩu cá nóc 3 món (bào ngư, bạch tuộc, tôm)" } },
      { sizes: [[{ ko: "1인", en: "Single", zh: "1人份", ja: "1人前", vi: "1 người" }, 180000], [SET, 200000]],
        name: { ko: "복 칼국수", en: "Pufferfish Knife-cut Noodle Soup", zh: "河豚刀切面", ja: "フグのカルグクス", vi: "Mì cắt cá nóc" } },
      { price: 250000, name: { ko: "삼계탕", en: "Samgyetang (Ginseng Chicken Soup)", zh: "参鸡汤", ja: "サムゲタン", vi: "Gà hầm sâm" }, desc: ONE },
      { price: 180000, name: { ko: "우거지갈비탕", en: "Beef Rib Soup with Cabbage", zh: "白菜干排骨汤", ja: "ウゴジカルビタン", vi: "Canh sườn bò rau cải" }, desc: ONE },
    ],
  },
  {
    id: "fry",
    photo: "img/fry.jpg",
    name: { ko: "복 튀김 · 수육 · 불고기", en: "Fried, Boiled & Stir-fried Pufferfish", zh: "炸 · 白切 · 炒河豚", ja: "フグ天ぷら・スユク・プルコギ", vi: "Cá nóc chiên · luộc · xào" },
    items: [
      { sizes: [[M, 300000], [LG, 550000]], tag: "best", name: { ko: "복 튀김", en: "Fried Pufferfish", zh: "炸河豚", ja: "フグの天ぷら", vi: "Cá nóc chiên" } },
      { sizes: [[M, 700000], [LG, 900000]], name: { ko: "복 수육", en: "Boiled Pufferfish", zh: "白切河豚", ja: "フグのスユク（茹で）", vi: "Cá nóc luộc" } },
      { sizes: [[M, 600000], [LG, 800000]], spicy: true, name: { ko: "복 불고기", en: "Spicy Stir-fried Pufferfish", zh: "辣炒河豚", ja: "フグのプルコギ（辛口炒め）", vi: "Cá nóc xào cay" } },
    ],
  },
  {
    id: "set",
    photo: "img/set.jpg",
    name: { ko: "SET · 왕만두", en: "Sets & Dumplings", zh: "套餐 · 大饺子", ja: "セット・王マンドゥ", vi: "Set & Bánh bao" },
    items: [
      { price: 600000, tag: "best", name: { ko: "SET 1", en: "SET 1", zh: "套餐 1", ja: "セット1", vi: "SET 1" },
        desc: { ko: "복 지리 1인 뚝배기 + 통오징어 양념구이 + 파전 + 새우장", en: "Clear pufferfish soup (single) + grilled marinated whole squid + green onion pancake + soy-marinated shrimp", zh: "河豚清汤（1人份）+ 调味烤整只鱿鱼 + 葱饼 + 酱虾", ja: "フグちり1人前＋イカ丸ごとヤンニョム焼き＋チヂミ＋エビの醤油漬け", vi: "Canh cá nóc 1 người + mực nướng nguyên con + bánh hành + tôm ngâm tương" } },
      { price: 600000, name: { ko: "SET 2", en: "SET 2", zh: "套餐 2", ja: "セット2", vi: "SET 2" },
        desc: { ko: "복 매운탕 1인 뚝배기 + 초밥 12개 + 복튀김 + 새우장", en: "Spicy pufferfish stew (single) + 12 pcs sushi + fried pufferfish + soy-marinated shrimp", zh: "辣河豚汤（1人份）+ 寿司12个 + 炸河豚 + 酱虾", ja: "フグメウンタン1人前＋寿司12貫＋フグ天ぷら＋エビの醤油漬け", vi: "Lẩu cá nóc cay 1 người + 12 miếng sushi + cá nóc chiên + tôm ngâm tương" } },
      { price: 120000, name: { ko: "왕만두 (6개)", en: "King Dumplings (6 pcs)", zh: "大饺子（6个）", ja: "王マンドゥ（6個）", vi: "Bánh bao lớn (6 cái)" },
        desc: { ko: "고기만두 또는 김치만두", en: "Meat or kimchi", zh: "肉馅或泡菜馅", ja: "肉またはキムチ", vi: "Nhân thịt hoặc kim chi" } },
    ],
  },
  {
    id: "sea",
    photo: "img/sea.jpg",
    name: { ko: "해산물 · 일품", en: "Seafood", zh: "海鲜", ja: "海鮮・一品料理", vi: "Hải sản" },
    items: [
      { price: 300000, name: { ko: "새우장", en: "Soy-marinated Shrimp", zh: "酱虾", ja: "エビの醤油漬け（セウジャン）", vi: "Tôm ngâm tương" } },
      { price: 300000, spicy: true, name: { ko: "물회", en: "Cold Spicy Raw Fish Soup (Mulhoe)", zh: "生鱼片冷汤", ja: "ムルフェ（冷たい刺身スープ）", vi: "Gỏi cá nước lạnh" }, desc: { ko: "1인", en: "Single", zh: "1人份", ja: "1人前", vi: "1 người" } },
      { price: 250000, name: { ko: "회덮밥", en: "Raw Fish Rice Bowl", zh: "生鱼片盖饭", ja: "刺身丼（フェトッパプ）", vi: "Cơm trộn cá sống" } },
      { price: 250000, name: { ko: "초밥", en: "Sushi", zh: "寿司", ja: "寿司", vi: "Sushi" }, desc: { ko: "1인", en: "Single", zh: "1人份", ja: "1人前", vi: "1 người" } },
      { price: 300000, name: { ko: "통오징어 양념구이", en: "Grilled Marinated Whole Squid", zh: "调味烤整只鱿鱼", ja: "イカ丸ごとヤンニョム焼き", vi: "Mực nướng nguyên con sốt cay" } },
      { price: 300000, name: { ko: "통오징어 숙회", en: "Blanched Whole Squid", zh: "白灼整只鱿鱼", ja: "イカ丸ごと湯引き", vi: "Mực luộc nguyên con" } },
      { sizes: [[M, 200000], [LG, 300000]], name: { ko: "해물 파전", en: "Seafood Green Onion Pancake", zh: "海鲜葱饼", ja: "海鮮チヂミ", vi: "Bánh hành hải sản" } },
    ],
  },
  {
    id: "hwe",
    photo: "img/hwe.jpg",
    name: { ko: "활어회", en: "Live Fish Sashimi", zh: "活鱼生鱼片", ja: "活魚の刺身", vi: "Gỏi cá tươi sống" },
    items: [
      { sizes: [[S, 1000000], [M, 1500000], [LG, 1900000]], tag: "best", name: { ko: "다금바리", en: "Longtooth Grouper Sashimi (Dagumbari)", zh: "龙趸石斑鱼生鱼片", ja: "クエ（タグムバリ）の刺身", vi: "Gỏi cá mú" } },
    ],
  },
  {
    id: "drinks",
    photo: "img/drinks.jpg",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水 · 饮料", ja: "お酒・ドリンク", vi: "Đồ uống" },
    note: { ko: "전통 음료 3종은 복나라에서 직접 만들었습니다 · 김치 1kg 100,000₫ 판매", en: "All 3 traditional drinks are house-made · Kimchi sold by the kilo (1kg 100,000₫)", zh: "三种传统饮料均为本店自制 · 出售泡菜 1公斤 100,000₫", ja: "伝統飲料3種はすべて自家製・キムチ販売 1kg 100,000₫", vi: "3 loại đồ uống truyền thống do quán tự làm · Bán kim chi 1kg 100.000đ" },
    items: [
      { price: 140000, name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "焼酎", vi: "Soju" } },
      { price: 50000, name: { ko: "맥주", en: "Beer", zh: "啤酒", ja: "ビール", vi: "Bia" } },
      { price: 160000, name: { ko: "막걸리", en: "Makgeolli", zh: "马格利米酒", ja: "マッコリ", vi: "Rượu gạo Makgeolli" } },
      { price: 220000, name: { ko: "청하", en: "Chungha (Rice Wine)", zh: "清河", ja: "チョンハ（清酒）", vi: "Rượu Chungha" } },
      { price: 120000, name: { ko: "보드카", en: "Vodka", zh: "伏特加", ja: "ウォッカ", vi: "Vodka" } },
      { price: 20000, name: { ko: "탄산음료", en: "Soft Drinks", zh: "碳酸饮料", ja: "炭酸飲料", vi: "Nước ngọt có ga" } },
      { price: 100000, name: { ko: "전통 음료 3종 세트", en: "Traditional Drinks (3-bottle set)", zh: "传统饮料3种套装", ja: "伝統飲料3種セット", vi: "Bộ 3 đồ uống truyền thống" },
        desc: { ko: "식혜 · 단호박 식혜 · 수정과", en: "Sikhye (rice punch), pumpkin sikhye, sujeonggwa (cinnamon punch)", zh: "甜米露 · 南瓜甜米露 · 水正果（肉桂茶）", ja: "シッケ・カボチャシッケ・スジョンガ", vi: "Sikhye, sikhye bí đỏ, sujeonggwa (trà quế)" } },
      { price: 100000, name: { ko: "김치 1kg (포장 판매)", en: "Kimchi 1kg (takeaway)", zh: "泡菜 1公斤（外带）", ja: "キムチ 1kg（持ち帰り）", vi: "Kim chi 1kg (mang về)" } },
    ],
  },
];
