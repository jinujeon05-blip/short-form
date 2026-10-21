// 대국 박닌 NHÀ HÀNG DAEKUK (Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "QR메뉴판/대국 박닌" 폴더의 구글 지도 캡처 26장 (가게 계정이 2개월 전에 올린 메뉴책 21면).
// 한국어·베트남어·중국어는 메뉴책 표기, 영어·일본어는 번역. 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격 / sizes: [[{ko,en,…}, 가격], …] / tag: "best" · "new" / spicy: true
window.RESTAURANT = {
  brand: { ko: "대국", en: "DAEKUK", sub: "Korean BBQ & Shabu-shabu", branch: "Bắc Ninh" },
  phone: null,   // 구글 지도 캡처에 전화번호 없음
  address: "16 Bùi Thị Xuân, Võ Cường, Bắc Ninh",   // 구글 지도 기준 (16 P Bùi Thị Xuân, P, Võ Cường, Bắc Ninh 80606)
  mapQuery: "Nhà hàng Daekuk",
  wifi: null,
};

const MID = { ko: "중 (2~3인)", en: "M (for 2–3)", zh: "中（2~3人）", ja: "中（2〜3人前）", vi: "Vừa (2-3 người)" };
const PRE = { ko: "예약 주문", en: "Pre-order only", zh: "需提前预订", ja: "要予約", vi: "Đặt trước" };

window.MENU = [
  {
    id: "shabu",
    photo: "img/shabu.jpg",
    name: { ko: "샤브샤브", en: "Shabu-shabu", zh: "火锅", ja: "しゃぶしゃぶ", vi: "Lẩu" },
    note: { ko: "육수 선택: 시그니처 기본 육수 · 맑은 담백 육수(NEW) · 매콤 마라",
      en: "Choose a broth: signature · clear & light (NEW) · spicy mala",
      zh: "汤底选择：招牌高汤 · 清醇高汤（新） · 麻辣",
      ja: "スープを選択：シグネチャー・あっさり澄まし（NEW）・ピリ辛麻辣",
      vi: "Chọn nước lẩu: Lẩu Đặc Biệt · Lẩu Thanh Đạm (mới) · Lẩu Mala" },
    items: [
      { sizes: [[MID, 800000]], tag: "best", name: { ko: "소고기 샤브샤브", en: "Beef Shabu-shabu", zh: "牛肉火锅", ja: "牛しゃぶしゃぶ", vi: "Lẩu bò" },
        desc: { ko: "최상급 소고기(차돌박이·우삼겹·목심)와 채소", en: "Premium beef (brisket, short plate, chuck) with vegetables", zh: "顶级牛肉（肥牛、牛五花、牛颈肉）配蔬菜", ja: "最上級牛肉（チャドルバギ・ウサムギョプ・肩ロース）と野菜", vi: "Thịt bò thượng hạng (ba chỉ bò, nạm bò, nạc vai) và rau" } },
      { sizes: [[MID, 1200000]], name: { ko: "해물 샤브샤브", en: "Seafood Shabu-shabu", zh: "海鲜火锅", ja: "海鮮しゃぶしゃぶ", vi: "Lẩu hải sản" },
        desc: { ko: "왕새우·바닷가재·통골뱅이·전복 외 8가지 해산물과 야채", en: "King prawns, lobster, whelks, abalone and 8 more seafoods with vegetables", zh: "大虾、龙虾、整只海螺、鲍鱼等8种海鲜配蔬菜", ja: "大エビ・ロブスター・ツブ貝・アワビなど8種の海鮮と野菜", vi: "Tôm he, tôm hùm, ốc, bào ngư và 8 loại hải sản khác cùng rau" } },
    ],
  },
  {
    id: "pork",
    photo: "img/pork.jpg",
    name: { ko: "돼지고기", en: "Pork BBQ", zh: "猪肉", ja: "豚肉焼肉", vi: "Thịt heo nướng" },
    note: { ko: "직원이 직접 구워 드려요", en: "Our staff grill the meat at your table", zh: "服务员现场为您烤肉", ja: "スタッフがテーブルで焼きます", vi: "Nhân viên nướng thịt tại bàn" },
    items: [
      { price: 100000, tag: "best", name: { ko: "삼겹살 120g", en: "Pork Belly 120g", zh: "五花肉 120克", ja: "サムギョプサル 120g", vi: "Ba chỉ heo 120g" } },
      { price: 100000, name: { ko: "목살 120g", en: "Pork Neck 120g", zh: "梅花肉 120克", ja: "豚肩ロース 120g", vi: "Nạc vai heo 120g" } },
      { price: 100000, name: { ko: "양념돼지갈비 150g", en: "Marinated Pork Ribs 150g", zh: "韩式腌制猪排骨 150克", ja: "味付け豚カルビ 150g", vi: "Sườn heo ướp sốt kiểu Hàn 150g" } },
    ],
  },
  {
    id: "beef",
    photo: "img/beef.jpg",
    name: { ko: "소고기", en: "Beef BBQ", zh: "牛肉", ja: "牛肉焼肉", vi: "Thịt bò nướng" },
    items: [
      { price: 180000, name: { ko: "갈비살 100g", en: "Boneless Short Rib 100g", zh: "牛小排 100克", ja: "カルビ（中落ち）100g", vi: "Sườn bò rút xương 100g" } },
      { price: 250000, tag: "best", name: { ko: "꽃살 100g", en: "Marbled Beef 100g", zh: "雪花牛肉 100克", ja: "霜降り牛 100g", vi: "Thịt hoa bò 100g" } },
    ],
  },
  {
    id: "dish",
    photo: "img/dish.jpg",
    name: { ko: "요리", en: "Dishes", zh: "料理", ja: "料理", vi: "Món ăn" },
    items: [
      { price: 200000, name: { ko: "두부김치", en: "Tofu with Stir-fried Kimchi", zh: "豆腐配泡菜", ja: "トゥブキムチ", vi: "Đậu phụ ăn kèm kim chi" } },
      { price: 250000, spicy: true, name: { ko: "쭈꾸미볶음", en: "Spicy Stir-fried Baby Octopus", zh: "辣炒小章鱼", ja: "イイダコ炒め", vi: "Bạch tuộc mini xào cay" } },
      { price: 200000, spicy: true, name: { ko: "오징어볶음", en: "Spicy Stir-fried Squid", zh: "辣炒鱿鱼", ja: "イカ炒め", vi: "Mực xào cay" } },
      { price: 600000, name: { ko: "모둠회", en: "Assorted Sashimi", zh: "生鱼片拼盘", ja: "刺身盛り合わせ", vi: "Sashimi thập cẩm" }, desc: PRE },
      { price: 500000, name: { ko: "제육보쌈", en: "Boiled Pork Wraps (Bossam)", zh: "韩式白切猪肉拼盘", ja: "ポッサム（ゆで豚）", vi: "Thịt luộc cuốn kiểu Hàn" }, desc: PRE },
      { price: 200000, spicy: true, name: { ko: "제육볶음", en: "Spicy Stir-fried Pork", zh: "韩式辣炒猪肉", ja: "豚肉の辛味炒め", vi: "Thịt heo xào cay" } },
      { price: 450000, spicy: true, name: { ko: "부대찌개", en: "Budae Jjigae (Army Stew)", zh: "韩式部队火锅", ja: "プデチゲ", vi: "Lẩu Budae" } },
      { price: 150000, spicy: true, name: { ko: "칼칼어묵탕", en: "Spicy Fish Cake Soup", zh: "辣鱼饼汤", ja: "ピリ辛おでん鍋", vi: "Canh chả cá cay" } },
      { price: 200000, name: { ko: "새우튀김", en: "Fried Shrimp", zh: "炸虾", ja: "エビフライ", vi: "Tôm chiên giòn" } },
      { price: 200000, name: { ko: "오징어튀김", en: "Fried Squid", zh: "炸鱿鱼", ja: "イカフライ", vi: "Mực chiên giòn" } },
      { price: 180000, name: { ko: "해물파전", en: "Seafood Green Onion Pancake", zh: "海鲜葱饼", ja: "海鮮チヂミ", vi: "Bánh hành hải sản" } },
      { price: 150000, name: { ko: "김치전", en: "Kimchi Pancake", zh: "泡菜煎饼", ja: "キムチチヂミ", vi: "Bánh kim chi" } },
      { price: 150000, name: { ko: "감자전", en: "Potato Pancake", zh: "土豆煎饼", ja: "じゃがいもチヂミ", vi: "Bánh khoai tây" } },
    ],
  },
  {
    id: "meal",
    photo: "img/meal.jpg",
    name: { ko: "식사 · 찌개", en: "Meals & Stews", zh: "主食类", ja: "食事・チゲ", vi: "Món chính" },
    items: [
      { price: 150000, spicy: true, name: { ko: "김치찌개", en: "Kimchi Stew", zh: "泡菜汤", ja: "キムチチゲ", vi: "Canh kim chi" } },
      { price: 150000, name: { ko: "된장찌개", en: "Soybean Paste Stew", zh: "韩式大酱汤", ja: "テンジャンチゲ", vi: "Canh tương đậu Hàn Quốc" } },
      { price: 160000, tag: "best", name: { ko: "차돌된장찌개", en: "Soybean Paste Stew with Beef Brisket", zh: "肥牛大酱汤", ja: "牛バラ入りテンジャンチゲ", vi: "Canh tương đậu với ba chỉ bò" } },
      { price: 150000, name: { ko: "청국장찌개", en: "Cheonggukjang (Fermented Soybean Stew)", zh: "韩式臭酱汤", ja: "チョングッチャンチゲ", vi: "Canh đậu lên men" } },
      { price: 180000, spicy: true, name: { ko: "해물순두부찌개", en: "Seafood Soft Tofu Stew", zh: "海鲜嫩豆腐汤", ja: "海鮮スンドゥブチゲ", vi: "Canh đậu phụ non hải sản" } },
      { price: 150000, name: { ko: "미역국", en: "Seaweed Soup", zh: "海带汤", ja: "ワカメスープ", vi: "Canh rong biển" } },
      { price: 180000, spicy: true, name: { ko: "제육덮밥", en: "Spicy Pork Rice Bowl", zh: "韩式辣炒猪肉盖饭", ja: "豚肉辛味炒め丼", vi: "Cơm thịt heo xào cay" } },
      { price: 120000, name: { ko: "김치볶음밥", en: "Kimchi Fried Rice", zh: "泡菜炒饭", ja: "キムチチャーハン", vi: "Cơm rang kim chi" } },
      { price: 120000, name: { ko: "물냉면", en: "Cold Noodles in Broth", zh: "韩式冷面", ja: "水冷麺", vi: "Mì lạnh nước" } },
      { price: 120000, spicy: true, name: { ko: "비빔냉면", en: "Spicy Mixed Cold Noodles", zh: "韩式拌冷面", ja: "ビビン冷麺", vi: "Mì lạnh trộn cay" } },
      { price: 120000, name: { ko: "잔치국수", en: "Janchi Guksu (Warm Noodle Soup)", zh: "韩式宴席面", ja: "チャンチグクス", vi: "Mì nước kiểu Hàn" } },
      { price: 20000, name: { ko: "공기밥", en: "Steamed Rice", zh: "米饭", ja: "ライス", vi: "Cơm trắng" } },
    ],
  },
  {
    id: "drinks",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水", ja: "お酒・ドリンク", vi: "Đồ uống" },
    items: [
      { price: 120000, name: { ko: "참이슬", en: "Chamisul (Soju)", zh: "真露", ja: "チャミスル（焼酎）", vi: "Soju Chamisul" } },
      { price: 120000, name: { ko: "진로이즈백", en: "Jinro Is Back (Soju)", zh: "真露复古版", ja: "ジンロ イズバック（焼酎）", vi: "Rượu Jinro Is Back" } },
      { price: 120000, name: { ko: "처음처럼", en: "Chum Churum (Soju)", zh: "初饮初乐", ja: "チョウムチョロム（焼酎）", vi: "Rượu Chum Churum" } },
      { price: 120000, name: { ko: "새로", en: "Saero (Soju)", zh: "新露", ja: "セロ（焼酎）", vi: "Rượu Saero" } },
      { price: 120000, name: { ko: "좋은데이", en: "Good Day (Soju)", zh: "好日子", ja: "チョウンデー（焼酎）", vi: "Rượu Good Day" } },
      { price: 250000, name: { ko: "대국주 (증류주 450ml)", en: "Daegukju (distilled spirit, 450ml)", zh: "大国酒（蒸馏酒 450ml）", ja: "テグク酒（蒸留酒 450ml）", vi: "Rượu Daegukju (rượu chưng cất 450ml)" } },
      { price: 450000, name: { ko: "화요 17도", en: "Hwayo 17%", zh: "火曜17度", ja: "火堯 17度", vi: "Hwayo 17 độ" } },
      { price: 700000, name: { ko: "화요 25도", en: "Hwayo 25%", zh: "火曜25度", ja: "火堯 25度", vi: "Hwayo 25 độ" } },
      { price: 1000000, name: { ko: "일품진로 25도", en: "Ilpoom Jinro 25%", zh: "一品真露25度", ja: "一品眞露 25度", vi: "Ilpoom Jinro 25 độ" } },
      { price: 200000, name: { ko: "청하", en: "Chungha (Rice Wine)", zh: "清河", ja: "チョンハ（清酒）", vi: "Rượu Cheongha" } },
      { price: 500000, name: { ko: "복분자", en: "Bokbunja (Raspberry Wine)", zh: "覆盆子酒", ja: "覆盆子酒", vi: "Rượu Bokbunja" } },
      { price: 150000, name: { ko: "막걸리", en: "Makgeolli", zh: "马格利米酒", ja: "マッコリ", vi: "Rượu gạo Makgeolli" } },
      { price: 40000, name: { ko: "타이거 라거 맥주", en: "Tiger Lager", zh: "虎牌拉格啤酒", ja: "タイガー ラガー", vi: "Bia Tiger Lager" } },
      { price: 35000, name: { ko: "금색 타이거 맥주", en: "Tiger (gold can)", zh: "金色老虎啤酒", ja: "タイガー（金缶）", vi: "Bia Tiger vàng" } },
      { price: 20000, name: { ko: "콜라 · 환타 · 사이다", en: "Coke · Fanta · Sprite", zh: "可乐 · 芬达 · 雪碧", ja: "コーラ・ファンタ・サイダー", vi: "Coca-Cola / Fanta / Sprite" } },
      { price: 30000, name: { ko: "토닉워터", en: "Tonic Water", zh: "汤力水", ja: "トニックウォーター", vi: "Nước tonic" } },
    ],
  },
];
