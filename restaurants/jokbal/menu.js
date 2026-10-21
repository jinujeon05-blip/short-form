// 족발신선생 박닌점 Jokbal Sinseonsaeng (Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "QR메뉴판/족발신선생 박닌점" 폴더의 구글 지도 캡처 31장 (가게 계정이 올린 디지털 메뉴판 + 손님 사진, 가격 서로 같음).
// 한국어·베트남어·중국어는 메뉴판 표기, 영어·일본어는 번역. 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격 / sizes: [[{ko,en,…}, 가격], …] / tag: "best" / spicy: true
window.RESTAURANT = {
  brand: { ko: "족발신선생", en: "Jokbal Sinseonsaeng", sub: "Korean Jokbal & Bossam", branch: "Bắc Ninh" },
  phone: "0328 561 918",
  address: "195 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh",   // 구글 지도 기준
  mapQuery: "족발 신선생 박닌점",
  wifi: null,
};

const SM = { ko: "소", en: "S", zh: "小", ja: "小", vi: "Nhỏ" };
const MD = { ko: "중", en: "M", zh: "中", ja: "中", vi: "Vừa" };
const LG = { ko: "대", en: "L", zh: "大", ja: "大", vi: "Lớn" };
const sml = (s, m, l) => [[SM, s], [MD, m], [LG, l]];
const SERVICE = {
  ko: "족발·보쌈 주문 시 서비스: 고르곤졸라피자 또는 쟁반국수 + 짬뽕순두부 + 계란찜 · 방문 포장 시 40,000₫ 할인",
  en: "Free with any jokbal or bossam: gorgonzola pizza or jaengban noodles + spicy soft tofu soup + steamed egg · 40,000₫ off for takeaway pickup",
  zh: "点猪肘或五花肉赠送：披萨或荞麦面 + 嫩豆腐汤 + 鸡蛋羹 · 到店自取优惠40,000₫",
  ja: "チョッパル・ポッサム注文でサービス：ゴルゴンゾーラピザまたはチェンバンククス＋チャンポンスンドゥブ＋ケランチム・お持ち帰りは40,000₫引き",
  vi: "Gọi chân giò hoặc thịt ba chỉ hầm được tặng: pizza phô mai hoặc mỳ khay + súp đậu hũ hải sản + trứng hấp · Giảm 40.000đ khi mua mang về tại cửa hàng",
};

window.MENU = [
  {
    id: "best",
    photo: "img/best.jpg",
    name: { ko: "화덕 통구이 족발", en: "Oven-roasted Whole Jokbal", zh: "炭炉烤全猪肘", ja: "窯焼き丸ごとチョッパル", vi: "Chân giò đút lò nguyên cái" },
    note: { ko: "500°C 천연 화산석 화덕에 구운 족신 BEST", en: "Roasted in a 500°C natural volcanic-stone oven — our best", zh: "500°C天然火山石炭炉烤制 · 招牌", ja: "500°Cの天然火山石窯で焼いた一番人気", vi: "Nướng trong lò đá núi lửa tự nhiên 500°C — món BEST" },
    items: [
      { price: 980000, tag: "best", name: { ko: "화덕통구이족발 (프리미엄 앞다리)", en: "Whole Oven-roasted Jokbal (premium front leg)", zh: "炭炉风味烤全猪肘（精选超大猪前腿）", ja: "窯焼き丸ごとチョッパル（プレミアム前足）", vi: "Chân giò đút lò nguyên cái" } },
    ],
  },
  {
    id: "jokbal",
    photo: "img/jokbal.jpg",
    name: { ko: "족발", en: "Jokbal (Pork Trotters)", zh: "猪肘", ja: "チョッパル（豚足）", vi: "Chân giò" },
    note: SERVICE,
    items: [
      { sizes: sml(650000, 750000, 850000), name: { ko: "족발", en: "Braised Jokbal", zh: "卤猪肘", ja: "チョッパル", vi: "Chân giò hầm" },
        desc: { ko: "매일 매장에서 직접 삶은 따뜻하고 야들야들한 족발", en: "Braised in store every day — warm and tender", zh: "每天店内现卤，温热软嫩", ja: "毎日お店で煮込む、温かくやわらかいチョッパル", vi: "Chân giò hầm mềm, nấu tại quán mỗi ngày" } },
      { sizes: sml(680000, 780000, 880000), tag: "best", name: { ko: "화덕족발", en: "Oven-roasted Jokbal", zh: "炭炉烤猪肘", ja: "窯焼きチョッパル", vi: "Chân giò đút lò" },
        desc: { ko: "500°C 화산석 화덕에 구운 족신의 대표 족발", en: "Our signature — roasted in a 500°C volcanic-stone oven", zh: "500°C火山石炭炉烤制的招牌猪肘", ja: "500°Cの火山石窯で焼く看板メニュー", vi: "Nướng trong lò đá núi lửa 500°C" } },
      { sizes: sml(720000, 820000, 920000), name: { ko: "마늘족발", en: "Garlic Jokbal", zh: "蒜香猪肘", ja: "にんにくチョッパル", vi: "Chân giò hầm tỏi" },
        desc: { ko: "특제 마늘소스로 달달하고 알싸하게", en: "Sweet and zingy special garlic sauce", zh: "特制蒜香酱，甜中带辣", ja: "特製にんにくソースで甘くピリッと", vi: "Sốt tỏi đặc biệt, cay cay ngọt ngọt" } },
      { sizes: sml(700000, 800000, 900000), spicy: true, name: { ko: "화덕불족 (매운족발)", en: "Spicy Oven-roasted Jokbal", zh: "炭烤辛辣猪肘", ja: "窯焼き激辛チョッパル", vi: "Chân giò cay đút lò" },
        desc: { ko: "특제 매운소스를 발라 화덕에서 한 번 더 구운 족발", en: "Coated in our spicy sauce and roasted once more", zh: "刷特制辣酱再次炭烤", ja: "特製辛ソースを塗ってもう一度窯焼き", vi: "Phết sốt cay đặc biệt rồi nướng thêm một lần" } },
      { sizes: sml(750000, 850000, 950000), spicy: true, name: { ko: "화덕치즈불족", en: "Spicy Oven-roasted Jokbal with Cheese", zh: "炭烤辛辣芝士猪肘", ja: "窯焼きチーズ激辛チョッパル", vi: "Chân giò phô mai cay đút lò" } },
      { sizes: sml(700000, 800000, 900000), name: { ko: "냉채족발", en: "Cold Jokbal Salad with Mustard Sauce", zh: "芥末风味凉拌猪肘", ja: "冷菜チョッパル（からしソース）", vi: "Chân giò sốt mù tạt" },
        desc: { ko: "신선한 야채와 해파리, 특제 냉채소스 — 여름철 인기 메뉴", en: "Fresh vegetables and jellyfish in a cold mustard sauce", zh: "新鲜蔬菜和海蜇配特制凉拌酱", ja: "新鮮な野菜とクラゲ、特製冷菜ソース", vi: "Rau tươi và sứa trong nước sốt lạnh đặc biệt" } },
    ],
  },
  {
    id: "bossam",
    photo: "img/bossam.jpg",
    name: { ko: "보쌈", en: "Bossam (Pork Belly)", zh: "五花肉", ja: "ポッサム（ゆで豚）", vi: "Thịt ba chỉ hầm" },
    items: [
      { sizes: sml(650000, 750000, 850000), name: { ko: "보쌈", en: "Bossam (Boiled Pork Belly)", zh: "大酱炖五花肉", ja: "ポッサム", vi: "Thịt ba chỉ hầm" },
        desc: { ko: "매일 매장에서 직접 삶은 따뜻하고 부드러운 보쌈", en: "Boiled in store every day — warm and soft", zh: "每天店内现炖，温热软嫩", ja: "毎日お店で茹でる、温かくやわらかいポッサム", vi: "Thịt hầm nóng hổi, nấu tại quán mỗi ngày" } },
      { sizes: sml(680000, 780000, 880000), name: { ko: "화덕보쌈", en: "Oven-roasted Bossam", zh: "炭炉烤五花肉", ja: "窯焼きポッサム", vi: "Thịt ba chỉ đút lò" } },
      { sizes: sml(720000, 820000, 920000), name: { ko: "마늘보쌈", en: "Garlic Bossam", zh: "蒜香五花肉", ja: "にんにくポッサム", vi: "Thịt ba chỉ hầm tỏi" } },
      { sizes: sml(700000, 800000, 900000), spicy: true, name: { ko: "매운보쌈", en: "Spicy Oven-roasted Bossam", zh: "碳烤辛辣五花肉", ja: "激辛ポッサム", vi: "Ba chỉ cay đút lò" } },
    ],
  },
  {
    id: "set",
    photo: "img/set.jpg",
    name: { ko: "반반 · 1인 메뉴", en: "Half & Half · Single Portions", zh: "半份拼 · 1人份", ja: "ハーフ＆ハーフ・1人前", vi: "Chế biến 2 món · Suất 1 người" },
    note: { ko: "반반: 족발·보쌈·매운족발·냉채족발·매운보쌈 중 2가지 (족발·보쌈은 화덕으로 변경 가능)",
      en: "Half & half: pick 2 of jokbal, bossam, spicy jokbal, cold jokbal, spicy bossam (jokbal/bossam can be oven-roasted)",
      zh: "半份拼：猪肘、五花肉、辣猪肘、凉拌猪肘、辣五花肉任选两种（猪肘、五花肉可改炭炉烤）",
      ja: "ハーフ＆ハーフ：チョッパル・ポッサム・辛チョッパル・冷菜チョッパル・辛ポッサムから2種（チョッパル・ポッサムは窯焼きに変更可）",
      vi: "Chọn 2 món: chân giò, thịt ba chỉ hầm, chân giò cay, chân giò sốt mù tạt, ba chỉ cay (có thể đổi sang đút lò)" },
    items: [
      { sizes: [[{ ko: "중 2~3인", en: "M for 2–3", zh: "中 2~3人", ja: "中 2〜3人", vi: "Vừa 2-3 người" }, 880000], [{ ko: "대 3~4인", en: "L for 3–4", zh: "大 3~4人", ja: "大 3〜4人", vi: "Lớn 3-4 người" }, 980000]], tag: "best",
        name: { ko: "반반 메뉴", en: "Half & Half Platter", zh: "半份拼盘", ja: "ハーフ＆ハーフ", vi: "Chế biến 2 món" } },
      { price: 250000, name: { ko: "1인 화덕족발", en: "Oven-roasted Jokbal (single)", zh: "1人份 炭炉烤猪肘", ja: "1人前 窯焼きチョッパル", vi: "Chân giò đút lò (1 người)" } },
      { price: 270000, spicy: true, name: { ko: "1인 매운족발", en: "Spicy Jokbal (single)", zh: "1人份 炭烤辛辣猪肘", ja: "1人前 激辛チョッパル", vi: "Chân giò cay đút lò (1 người)" } },
      { price: 250000, name: { ko: "1인 화덕보쌈", en: "Oven-roasted Bossam (single)", zh: "1人份 炭炉烤五花肉", ja: "1人前 窯焼きポッサム", vi: "Ba chỉ đút lò (1 người)" } },
      { price: 270000, name: { ko: "1인 냉채족발", en: "Cold Jokbal Salad (single)", zh: "1人份 芥末凉拌猪肘", ja: "1人前 冷菜チョッパル", vi: "Chân giò sốt mù tạt (1 người)" } },
      { price: 270000, spicy: true, name: { ko: "1인 매운보쌈", en: "Spicy Bossam (single)", zh: "1人份 碳烤辛辣五花肉", ja: "1人前 激辛ポッサム", vi: "Ba chỉ cay đút lò (1 người)" } },
    ],
  },
  {
    id: "side",
    photo: "img/side.jpg",
    name: { ko: "사이드", en: "Sides", zh: "主食 · 小菜", ja: "サイドメニュー", vi: "Món phụ" },
    items: [
      { price: 200000, name: { ko: "쟁반국수", en: "Jaengban Noodles (spicy mixed buckwheat)", zh: "盘荞麦面", ja: "チェンバンククス（混ぜそば）", vi: "Khay mỳ" } },
      { price: 150000, name: { ko: "고르곤졸라피자", en: "Gorgonzola Pizza with Honey", zh: "戈贡佐拉披萨", ja: "ゴルゴンゾーラピザ", vi: "Pizza phô mai kèm mật ong" } },
      { price: 150000, spicy: true, name: { ko: "짬뽕순두부", en: "Spicy Seafood Soft Tofu Soup", zh: "炒码嫩豆腐", ja: "チャンポンスンドゥブ", vi: "Súp đậu hũ hải sản" } },
      { price: 100000, name: { ko: "족발볶음밥", en: "Jokbal Fried Rice", zh: "猪肘炒饭", ja: "チョッパルチャーハン", vi: "Cơm rang chân giò" } },
      { price: 100000, name: { ko: "날치알주먹밥", en: "Flying Fish Roe Rice Balls", zh: "飞鱼籽饭团", ja: "とびっこおにぎり", vi: "Cơm nắm trứng cá chuồn" } },
      { price: 100000, name: { ko: "계란찜", en: "Steamed Egg", zh: "石锅鸡蛋羹", ja: "ケランチム（韓国茶碗蒸し）", vi: "Trứng hấp" } },
      { price: 20000, name: { ko: "공기밥", en: "Steamed Rice", zh: "米饭", ja: "ライス", vi: "Cơm trắng" } },
      { price: 20000, name: { ko: "소스 추가 (매운 · 마늘 · 냉채)", en: "Extra Sauce (spicy, garlic or mustard)", zh: "蘸料（辣味、蒜香、芥末）", ja: "追加ソース（辛・にんにく・冷菜）", vi: "Nước chấm (sốt cay, sốt tỏi, sốt mù tạt)" } },
    ],
  },
  {
    id: "soup",
    photo: "img/soup.jpg",
    name: { ko: "해장국 · 찌개", en: "Soups & Stews", zh: "汤 · 锅", ja: "スープ・チゲ", vi: "Canh & Lẩu" },
    note: { ko: "매일 매장에서 직접 끓여냅니다", en: "Made fresh in store every day", zh: "每天店内现煮", ja: "毎日お店で煮込みます", vi: "Hàng ngày được chế biến trực tiếp tại nhà hàng" },
    items: [
      { price: 160000, name: { ko: "뼈해장국", en: "Pork Bone Hangover Soup", zh: "骨头汤", ja: "ピョヘジャンクッ（豚骨スープ）", vi: "Canh xương hầm" },
        desc: { ko: "160,000₫부터", en: "From 160,000₫", zh: "160,000₫起", ja: "160,000₫から", vi: "Giá chỉ từ 160.000đ" } },
      { price: 300000, spicy: true, name: { ko: "부대찌개", en: "Budae Jjigae (Army Stew)", zh: "部队锅", ja: "プデチゲ", vi: "Canh quân đội" } },
      { price: 90000, name: { ko: "부대찌개 추가 (만두 · 떡 · 햄)", en: "Stew Add-on (dumplings, rice cake or ham)", zh: "另外加菜（饺子、米饼、熏猪肉）", ja: "プデチゲ追加（餃子・トック・ハム）", vi: "Gọi thêm (há cảo, bánh gạo, thịt hun khói)" } },
    ],
  },
  {
    id: "drinks",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水", ja: "お酒・ドリンク", vi: "Đồ uống" },
    items: [
      { price: 140000, name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "焼酎", vi: "Soju" } },
      { price: 50000, name: { ko: "맥주 (타이거 · 하이네켄 330ml)", en: "Beer (Tiger, Heineken 330ml)", zh: "啤酒（老虎、喜力 330ml）", ja: "ビール（タイガー・ハイネケン 330ml）", vi: "Bia Tiger / Bia Heineken 330ml" } },
      { price: 30000, name: { ko: "음료수 (콜라 · 사이다 · 환타)", en: "Soft Drinks (Coke, Sprite, Fanta)", zh: "饮料（可乐、雪碧、芬达）", ja: "ソフトドリンク（コーラ・サイダー・ファンタ）", vi: "Nước ngọt (Coca, Sprite, Fanta)" } },
      { price: 160000, name: { ko: "막걸리", en: "Makgeolli (Rice Wine)", zh: "米酒", ja: "マッコリ", vi: "Rượu gạo" } },
      { price: 200000, name: { ko: "청하", en: "Chungha (Rice Wine)", zh: "清河", ja: "チョンハ（清酒）", vi: "Chung Ha" } },
      { price: 300000, name: { ko: "복분자", en: "Bokbunja (Raspberry Wine)", zh: "覆盆子酒", ja: "覆盆子酒", vi: "Rượu quả mâm xôi" } },
    ],
  },
];
