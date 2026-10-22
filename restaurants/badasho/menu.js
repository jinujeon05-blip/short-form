// 바다쇼 포장마차 (간판 NHÀ HÀNG HẢI SẢN 바다 Show · 232 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "바다쇼 포장마차" 폴더의 구글 지도 캡처 15장(손님이 올린 메뉴판 '활어회(MÓN GỎI)' 1면 사진 2장 — 6개월 전·1년 전, 간판·표지·음식 사진, 지도 정보).
// 메뉴판에 한국어·베트남어가 있어 그대로 쓰고, 영어·중국어·일본어는 새로 옮김. 올라온 메뉴판이 회 1면뿐이라 다른 요리는 없음.
window.RESTAURANT = {
  brand: { ko: "바다쇼 포장마차", en: "Bada Show", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0352 900 007",
  address: "232 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh",
  mapQuery: "바다쇼 포장마차 NHÀ HÀNG HẢI SẢN 232 Ngọc Hân Công Chúa Bắc Ninh",
  wifi: null, // 예: { ssid: "BADASHOW", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const KG = T("1kg", "1 kg", "1公斤", "1kg", "1kg");

// 회 사진은 손님 사진 한 장(활어회 접시)을 회 메뉴에 같이 씀 — 생선별 사진이 아님
window.MENU = [
  {
    id: "hoe",
    name: T("활어회", "Live fish sashimi", "活鱼刺身", "活魚の刺身", "Món gỏi (cá tươi)"),
    note: T("회는 1kg 기준 가격이에요.", "Sashimi prices are per 1 kg.", "刺身价格按1公斤计算。", "刺身の価格は1kg基準です。", "Giá gỏi tính theo 1kg."),
    items: [
      it(900000, "sashimi", "감성돔", "Black sea bream sashimi (gamseongdom)", "黑鲷刺身（感性鲷）", "クロダイの刺身（カムソンドム）", "Cá Gáy", { unit: KG }),
      it(900000, "sashimi", "병어", "Pomfret sashimi (byeongeo)", "鲳鱼刺身", "マナガツオの刺身（ピョンオ）", "Cá Chim", { unit: KG }),
      it(900000, "sashimi", "쥐치", "Filefish sashimi (jwichi)", "马面鲀刺身", "カワハギの刺身（チュィチ）", "Cá Thăn", { unit: KG, tag: "must" }),
      it(900000, "sashimi", "아나고 (하모)", "Conger eel (hamo) sashimi", "海鳗刺身", "アナゴ（ハモ）の刺身", "Cá Nhạc", { unit: KG }),
      it(950000, null, "오도리 (생새우)", "Raw sweet shrimp (odori)", "生甜虾（踊虾）", "生えび（踊り）の刺身", "Gỏi Tôm", { unit: KG }),
      it(900000, "sashimi", "갑오징어", "Cuttlefish sashimi", "墨鱼刺身", "コウイカの刺身", "Gỏi Mực Mai", { unit: KG }),
      it(100000, "nakji", "낙지탕탕 (1인)", "Chopped raw octopus (nakji-tangtang), 1 person", "生拌章鱼（1人份）", "ナクチタンタン（活ダコのぶつ切り）1人前", "Gỏi bạch tuộc (1 người)"),
      it(600000, "nakji", "낙지탕탕", "Chopped raw octopus (nakji-tangtang)", "生拌章鱼", "ナクチタンタン（活ダコのぶつ切り）", "Gỏi Bạch Tuộc"),
    ],
  },
];
