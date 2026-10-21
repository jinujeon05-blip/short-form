// 쌀국수 Phở Bò Hồ Lợi (28 ngõ 209 An Dương Vương, Phú Thượng, Tây Hồ, Hà Nội) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "Phở Bò Hồ Lợi" 폴더의 구글 지도 캡처 10장. 메뉴는 매장 벽 메뉴판 사진 3장(3개월 전·1개월 전 두 장, 모두 같은 판) 기준.
// 베트남어는 메뉴판 표기, 한·영·중·일은 새로 번역(고기 부위 이름은 하노이 쌀국수 용어를 풀어 옮긴 것).
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
window.RESTAURANT = {
  brand: { ko: "퍼보 호러이", en: "Phở Bò Hồ Lợi", branch: "Phú Thượng" },
  phone: "0904 631 565",
  address: "28 ngõ 209 An Dương Vương, Phú Thượng, Tây Hồ, Hà Nội",
  mapQuery: "Phở Bò Hồ Lợi",
  wifi: null,
};

// 쌀국수 고기 부위 (베트남어 → 4개 언어). 메뉴판의 "Tái chín", "Sườn nhừ lõi" 같은 이름은 이 부위를 이어 붙인 것.
const PART = {
  "Sườn nhừ": ["푹 삶은 갈비", "Tender braised ribs", "软烂牛排骨", "とろとろ煮込みスペアリブ"],
  "Sốt vang": ["소고기 와인 스튜(솟 방)", "Beef wine stew (sốt vang)", "红酒炖牛肉", "牛肉の赤ワイン煮込み"],
  "Nạm tươi": ["생 양지(남)", "Fresh flank", "鲜牛腩", "生のバラ肉"],
  "Tái": ["살짝 익힌 소고기", "Rare beef", "半生牛肉", "レア牛肉"],
  "Chín": ["푹 익힌 양지", "Well-done brisket", "熟牛腩", "よく火の通ったバラ肉"],
  "Nạm": ["양지(남)", "Flank", "牛腩", "バラ肉"],
  "Gầu": ["기름진 양지(저우)", "Fatty brisket", "肥牛腩", "脂身のバラ肉"],
  "Gân": ["힘줄", "Tendon", "牛筋", "牛すじ"],
  "Lăn": ["마늘 볶음 소고기(란)", "Garlic-sautéed beef", "蒜炒牛肉", "ニンニク炒め牛肉"],
  "Lõi": ["사태 속살(로이)", "Lean core cut", "牛腱芯", "すね肉の芯"],
  "Tuỷ": ["골수", "Bone marrow", "牛骨髓", "骨髄"],
};
const KEYS = Object.keys(PART).sort((a, b) => b.length - a.length);
const parts = (vi) => {
  const out = [];
  let rest = vi.trim();
  while (rest) {
    const k = KEYS.find((k) => rest.toLowerCase().startsWith(k.toLowerCase()));
    if (!k) throw new Error("부위 이름을 모름: " + vi);
    out.push(PART[k]);
    rest = rest.slice(k.length).trim();
  }
  return out;
};
const join = (arr, i, sep) => arr.map((p) => p[i]).join(sep);
// pho(가격, 베트남어 이름) — 메뉴판 이름을 부위별로 풀어 5개 언어 이름을 만든다
const pho = (price, vi, x = {}) => {
  const p = parts(vi);
  return { price, name: { ko: join(p, 0, " + "), en: join(p, 1, " + "), zh: join(p, 2, " + "), ja: join(p, 3, " + "), vi }, ...x };
};
const it = (price, ko, en, zh, ja, vi, x = {}) => ({ price, name: { ko, en, zh, ja, vi }, ...x });
const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const U = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi }); // 단위 (가격 옆에 작게)

const TIER = (n) => T(`쌀국수 ${n}K`, `Phở ${n}K`, `牛肉河粉 ${n}K`, `フォー ${n}K`, `Phở ${n}K`);
const TIER_NOTE = T(
  "메뉴판 이름을 이어 붙여 불러도 돼요 (예: 'Tái chín')",
  "You can combine cuts when ordering, just like the names on the board (e.g. 'Tái chín')",
  "点单时可以自由组合部位，就像菜单上的名字（例如 'Tái chín'）",
  "メニューの名前のように部位を組み合わせて注文できます（例: 'Tái chín'）",
  "Có thể mix các topping theo sở thích để gọi tên phở (ví dụ 'Tái chín')");

window.MENU = [
  {
    id: "pho50",
    photo: "img/pho.jpg",
    name: TIER(50),
    note: T("먼저 주문하고 자리에 앉으면 직원이 가져다줘요. 주말엔 줄이 길 수 있어요",
      "Order first, then take a seat and staff will bring it. Expect a queue on weekends",
      "先点单再入座，店员会送到桌上。周末可能要排队",
      "先に注文して席に着くと店員が運んでくれます。週末は行列になることも",
      "Gọi món trước rồi ngồi vào bàn, nhân viên sẽ mang ra. Cuối tuần có thể phải xếp hàng"),
    items: [
      pho(50000, "Tái", { tag: "best" }), pho(50000, "Tái chín", { tag: "best" }), pho(50000, "Tái nạm"),
      pho(50000, "Chín"), pho(50000, "Nạm"), pho(50000, "Gân"),
    ],
  },
  {
    id: "pho55",
    name: TIER(55),
    items: [
      pho(55000, "Tái gầu"), pho(55000, "Tái lăn"), pho(55000, "Chín gầu"), pho(55000, "Nạm gầu"),
      pho(55000, "Tái gân"), pho(55000, "Chín gân"), pho(55000, "Nạm tươi"),
    ],
  },
  {
    id: "pho60",
    name: TIER(60),
    items: [
      pho(60000, "Lõi"), pho(60000, "Tái nạm gầu"), pho(60000, "Lăn chín"), pho(60000, "Lăn gầu"),
      pho(60000, "Lăn nạm tươi"), pho(60000, "Lăn nạm"), pho(60000, "Sốt vang"), pho(60000, "Sốt vang chín"),
      pho(60000, "Sốt vang tái"), pho(60000, "Sốt vang nạm"),
    ],
  },
  {
    id: "pho65",
    name: TIER(65),
    items: [
      pho(65000, "Tái gầu gân"), pho(65000, "Gân tuỷ"), pho(65000, "Gầu tuỷ"),
      pho(65000, "Nạm tươi tuỷ"), pho(65000, "Sốt vang gầu"), pho(65000, "Sốt vang nạm tươi"),
    ],
  },
  {
    id: "pho70",
    name: TIER(70),
    items: [
      pho(70000, "Sườn nhừ"), pho(70000, "Lõi gầu"), pho(70000, "Lõi nạm"), pho(70000, "Lõi chín"),
      pho(70000, "Lõi gân"), pho(70000, "Lõi tuỷ"), pho(70000, "Sốt vang gân tuỷ"),
    ],
  },
  {
    id: "pho80",
    name: TIER(80),
    items: [
      pho(80000, "Sườn nhừ lõi"), pho(80000, "Sườn nhừ gầu"), pho(80000, "Sườn nhừ tái"), pho(80000, "Sườn nhừ lăn"),
      pho(80000, "Sườn nhừ nạm tươi"), pho(80000, "Sườn nhừ sốt vang"), pho(80000, "Sườn nhừ tuỷ"),
      pho(80000, "Lõi gầu tuỷ"), pho(80000, "Lõi gầu nạm tươi"), pho(80000, "Lõi gầu gân"), pho(80000, "Lõi lăn nạm tươi"),
    ],
  },
  {
    id: "pho90",
    name: TIER(90),
    items: [
      it(90000, "특별 한 그릇", "Special bowl", "特别碗", "スペシャル（特製）", "Bát đặc biệt", { tag: "special" }),
      pho(90000, "Sườn nhừ lõi gầu"), pho(90000, "Sườn nhừ lõi lăn"),
    ],
  },
  {
    id: "kids",
    name: T("어린이 쌀국수 30K", "Kids' bowl 30K", "儿童小碗 30K", "子ども用フォー 30K", "Bát trẻ con 30K"),
    items: [
      it(30000, "어린이 · 완자(목)", "Kids · Pork meatball (mọc)", "儿童 · 猪肉丸（mọc）", "子ども用・肉団子（モック）", "Bát trẻ con · Mọc"),
      it(30000, "어린이 · 살짝 익힌 소고기", "Kids · Rare beef", "儿童 · 半生牛肉", "子ども用・レア牛肉", "Bát trẻ con · Tái"),
      it(30000, "어린이 · 푹 익힌 양지", "Kids · Well-done brisket", "儿童 · 熟牛腩", "子ども用・よく火の通ったバラ肉", "Bát trẻ con · Chín"),
      it(30000, "어린이 · 마늘 볶음 소고기", "Kids · Garlic-sautéed beef", "儿童 · 蒜炒牛肉", "子ども用・ニンニク炒め牛肉", "Bát trẻ con · Lăn"),
    ],
  },
  {
    id: "extra",
    photo: "img/quay.jpg",
    name: T("추가 메뉴 · 곁들임", "Extras & Sides", "加料 · 配菜", "追加・サイド", "Gọi thêm · Ăn kèm"),
    note: T("직접 만든 바삭하고 쫄깃한 꿔이(튀김빵)도 인기예요",
      "The house-made crispy quẩy (fried dough sticks) is popular too",
      "自制的酥脆油条（quẩy）也很受欢迎",
      "自家製のクァイ（揚げパン）も人気です",
      "Quẩy nhà tự làm giòn thơm cũng rất được yêu thích"),
    items: [
      it(200000, "안주용 모둠 그릇 (소)", "Sharing beef platter (small)", "下酒拼盘（小）", "おつまみ盛り合わせ（小）", "Bát nhậu nhỏ"),
      it(300000, "안주용 모둠 그릇 (대)", "Sharing beef platter (large)", "下酒拼盘（大）", "おつまみ盛り合わせ（大）", "Bát nhậu to"),
      it(50000, "로이 (데친 것)", "Lean core cut, blanched (lõi chần)", "烫牛腱芯", "すね肉の芯（さっと茹で）", "Lõi chần"),
      it(50000, "갈비", "Braised ribs", "牛排骨", "スペアリブ", "Sườn"),
      it(30000, "살짝 익힌 소고기 추가", "Extra rare beef", "加半生牛肉", "レア牛肉 追加", "Tái"),
      it(30000, "마늘 볶음 소고기 추가", "Extra garlic-sautéed beef", "加蒜炒牛肉", "ニンニク炒め牛肉 追加", "Lăn"),
      it(30000, "힘줄 추가", "Extra tendon", "加牛筋", "牛すじ 追加", "Gân"),
      it(30000, "생 양지 추가", "Extra fresh flank", "加鲜牛腩", "生のバラ肉 追加", "Nạm tươi"),
      it(15000, "면만(고기 없음)", "Noodles only (no meat)", "只要河粉（不加肉）", "麺だけ（肉なし）", "Phở không người lái"),
      it(10000, "완자(목)", "Pork meatball (mọc)", "猪肉丸（mọc）", "肉団子（モック）", "Mọc", { unit: U("1개", "each", "每个", "1個", "/ 1 viên") }),
      it(5000, "꿔이(튀김빵)", "Quẩy (fried dough sticks)", "油条（quẩy）", "クァイ（揚げパン）", "Quẩy", { unit: U("2개", "2 pcs", "2根", "2本", "/ 2 cái") }),
      it(10000, "토종닭 삶은 달걀", "Boiled free-range egg", "水煮土鸡蛋", "地鶏のゆで卵", "Trứng gà ta chần", { unit: U("1개", "each", "每个", "1個", "/ 1 quả") }),
      it(5000, "아이스 티", "Iced tea", "冰茶", "アイスティー", "Trà đá", { unit: U("1잔", "per glass", "每杯", "1杯", "/ 1 cốc") }),
    ],
  },
  {
    id: "takeaway",
    name: T("포장 판매", "Take-home items", "外带商品", "持ち帰り", "Đồ mua mang về"),
    note: T("kg 또는 통 단위로 포장해 갈 수 있어요. 꼬리찜은 하루 전에 예약해야 해요",
      "Take-home beef by the kg or box. Braised oxtail needs one day's notice",
      "可按公斤或盒外带。炖牛尾需提前一天预订",
      "量り売り・パック売りで持ち帰れます。牛テールの煮込みは1日前までに予約",
      "Mua mang về theo kg hoặc hộp. Đuôi bò hầm đặt trước 01 ngày"),
    items: [
      it(550000, "푹 익힌 기름진 양지", "Well-done fatty brisket", "熟肥牛腩", "よく火の通った脂身のバラ肉", "Gầu chín", { unit: U("1kg", "per kg", "每公斤", "1kg", "/ 1kg") }),
      it(490000, "푹 익힌 양지(남)", "Well-done flank", "熟牛腩", "よく火の通ったバラ肉（ネーム）", "Nạm chín", { unit: U("1kg", "per kg", "每公斤", "1kg", "/ 1kg") }),
      it(180000, "소고기 와인 스튜(솟 방)", "Beef wine stew (sốt vang)", "红酒炖牛肉", "牛肉の赤ワイン煮込み", "Sốt vang", { unit: U("1통", "per box", "每盒", "1パック", "/ 1 hộp") }),
      it(380000, "푹 삶은 갈비", "Braised ribs", "炖牛排骨", "煮込みスペアリブ", "Sườn hầm", { unit: U("1kg", "per kg", "每公斤", "1kg", "/ 1kg") }),
      it(360000, "꼬리찜 (하루 전 예약)", "Braised oxtail (order 1 day ahead)", "炖牛尾（需提前1天预订）", "牛テール煮込み（1日前予約）", "Đuôi bò hầm (đặt trước 01 ngày)", { unit: U("1kg", "per kg", "每公斤", "1kg", "/ 1kg") }),
      it(40000, "고추 소스", "Chili sauce", "辣椒酱", "チリソース", "Tương ớt", { unit: U("1병", "per bottle", "每瓶", "1本", "/ 1 chai") }),
      it(150000, "육포(보 코)", "Beef jerky (bò khô)", "牛肉干", "ビーフジャーキー（ボーコー）", "Bò khô", { unit: U("100g 봉지", "100g bag", "每袋（100g）", "100g袋", "/ 1 túi lạng") }),
    ],
  },
];
