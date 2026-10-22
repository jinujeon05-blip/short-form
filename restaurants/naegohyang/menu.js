// 내고향 돌솥순대국 NAE GOHYANG (간판 NHÀ HÀNG HÀN QUỐC 내고향 돌솥순대국 전문점 · 11B CT5, KĐT Mỹ Đình - Mễ Trì, Từ Liêm, Hà Nội) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND (부가세 포함 — 메뉴판 표기)
// price: 가격(null이면 '가격 문의') / sizes / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "내고향 순대국" 폴더의 구글 지도 캡처 11장(가게 계정 NAE GOHYANG이 9개월 전 올린 메뉴판 '식사·안주'와 '주류·음료·포장' 2면, 6일 전 올라온 입간판 메뉴 사진, 음식 사진, 간판·지도 정보).
// 메뉴판에 한국어·베트남어·중국어가 있어 그대로 쓰고, 영어·일본어만 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "내고향 돌솥순대국", en: "Nae Gohyang", branch: { ko: "미딩", en: "Mỹ Đình" } },
  phone: "0348 709 354",
  address: "11B CT5, KĐT Mỹ Đình - Mễ Trì, Từ Liêm, Hà Nội",
  mapQuery: "내고향 돌솥순대국 NAE GOHYANG 11B CT5 khu đô thị Mỹ Đình Từ Liêm Hà Nội",
  wifi: null, // 예: { ssid: "NAEGOHYANG", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

window.MENU = [
  {
    id: "soup",
    name: T("돌솥 순대국", "Soondae-guk", "猪肉汤饭", "スンデグク", "Canh thịt lợn"),
    note: T("돌솥밥이 함께 나와 식사 후 숭늉으로 마무리해요. 가격은 부가세 포함이에요.", "Served with stone-pot rice, finished with nurungji tea. Prices include VAT.", "配砂锅饭，饭后可喝锅巴茶。价格含增值税。", "石鍋ご飯が付き、食後はおこげ湯で締めます。価格は税込です。", "Kèm cơm thố, ăn xong dùng nước cơm cháy. Giá đã gồm VAT."),
    items: [
      it(205200, "dolsot", "돌솥 순대국", "Pork & soondae soup with stone-pot rice", "砂锅饭配猪肉汤", "石鍋ご飯付きスンデグク", "Cơm thố canh thịt lợn", { tag: "must" }),
      it(183600, null, "공기밥 순대국", "Pork & soondae soup with steamed rice", "白饭配猪肉汤", "白ご飯付きスンデグク", "Cơm trắng canh thịt lợn"),
    ],
  },
  {
    id: "side",
    name: T("순대 · 수육 · 안주", "Soondae, suyuk & side dishes", "血肠 · 蒸猪肉 · 下酒菜", "スンデ・スユク・おつまみ", "Lòng dồi · Thịt luộc · Món nhắm"),
    items: [
      it(216000, "sundae", "순대", "Korean blood sausage (soondae)", "韩国猪血肠", "スンデ（韓国式血腸）", "Lòng dồi Hàn Quốc"),
      it(324000, "pyeonyuk", "편육", "Pyeonyuk (pressed boiled pork-ear slices)", "韩国猪耳卷", "ピョニュク（豚耳の煮込みスライス）", "Giò tai Hàn Quốc"),
      it(270000, "combo", "순대 + 편육", "Soondae + pyeonyuk combo", "猪血肠 + 猪耳卷", "スンデ＋ピョニュク盛り合わせ", "Combo lòng dồi + giò tai"),
      it(432000, "bokkeum", "곱창 순대 볶음", "Spicy stir-fried offal & soondae", "炒辣猪杂碎 + 猪血肠", "ホルモンとスンデの辛炒め", "Lòng + dồi xào cay", { spicy: true }),
      it(540000, null, "술국", "Special pork soup (sul-guk)", "特别猪肉汤", "特製豚スープ（スルグク）", "Canh thịt lợn đặc biệt"),
      it(540000, "suyuk", "모듬 수육", "Ginger-steamed pork (suyuk)", "姜蒸猪肉", "生姜蒸し豚（スユク）", "Thịt lợn hấp gừng"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒类 · 饮料", "お酒・ドリンク", "Rượu · Đồ uống"),
    items: [
      it(132000, null, "소주", "Soju", "烧酒", "焼酎（ソジュ）", "Rượu soju"),
      it(55000, null, "맥주", "Beer", "啤酒", "ビール", "Bia"),
      it(66000, null, "생맥주", "Draft beer", "生啤酒", "生ビール", "Bia tươi"),
      it(154000, null, "막걸리", "Makgeolli (Korean rice wine)", "韩国米酒（马格利）", "マッコリ", "Rượu gạo Hàn Quốc"),
      it(110000, null, "보드카", "Vodka", "伏特加", "ウォッカ", "Vodka"),
      it(21600, null, "음료수", "Soft drink", "汽水", "清涼飲料", "Nước ngọt"),
    ],
  },
  {
    id: "takeout",
    name: T("포장 김치", "Takeaway kimchi", "外带泡菜", "持ち帰りキムチ", "Kim chí mang về"),
    items: [
      it(162000, null, "김치", "Kimchi", "泡菜", "キムチ", "Kim chí"),
      it(162000, null, "깍두기", "Kkakdugi (cubed radish kimchi)", "萝卜块泡菜", "カクテキ", "Củ cải muối"),
    ],
  },
];
