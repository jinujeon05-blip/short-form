// 킴스호텔 Kim's Hotel (Bắc Ninh) — 객실 안내 + 1층 한식당 메뉴 데이터
// ※ 정식(사장님 의뢰): 1층 식당 메뉴는 장바구니·Zalo 주문, 객실은 Zalo·전화 예약 문의.
// 원본: 구글 드라이브 "QR메뉴판/Kims hotel" 폴더 (숙박비 안내문 2025-01-01 적용, 명함, 객실 사진, 카톡 메뉴 목록, 구글 지도 사진).
// 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
window.RESTAURANT = {
  brand: { ko: "킴스호텔", en: "Kim's Hotel", sub: "Hotel & Korean Kitchen", branch: "Bắc Ninh" },
  phone: "034 742 0256",
  zalo: "0347420256",          // 예약 문의 Zalo (명함 전화번호와 같은 번호로 넣음 — 확인 필요)
  address: "Lô 13 Đ. Hoàng Hoa Thám, P. Võ Cường, T. Bắc Ninh",
  mapQuery: "Kim's Hotel",
  wifi: null,
};

// 1층 식당 주문서: 직원 언어 베트남어, Zalo로 받기. 테이블 번호 칸을 "객실 번호"로 바꿔 씀.
window.ORDER = {
  staff: "vi", currency: "₫", zalo: "0347420256",
  labels: {
    table: { ko: "객실 · 테이블 번호", en: "Room / table no.", zh: "房间号 / 桌号", ja: "部屋番号・テーブル番号", vi: "Số phòng / bàn" },
    tablePh: { ko: "예: 305", en: "e.g. 305", zh: "例：305", ja: "例：305", vi: "VD: 305" },
    notePh: { ko: "덜 맵게, 김치 더 주세요 등", en: "Less spicy, extra kimchi…", zh: "少辣、多给泡菜等", ja: "辛さ控えめ、キムチ多めなど", vi: "Ít cay, thêm kim chi…" },
  },
};

// 객실 (숙박비 안내문 기준, 1박 요금). 사진은 객실 종류와 짝이 맞는지 사장님 확인 필요.
const INCL = [
  { ko: "조식", en: "Breakfast", zh: "早餐", ja: "朝食", vi: "Bữa sáng" },
  { ko: "세탁 서비스", en: "Laundry", zh: "洗衣服务", ja: "ランドリー", vi: "Giặt là" },
  { ko: "창문 있는 객실", en: "Window room", zh: "有窗客房", ja: "窓付き客室", vi: "Phòng có cửa sổ" },
];
window.ROOMS = [
  { id: "single", price: 800000, guests: 1, photo: "img/room-single.jpg",
    name: { ko: "싱글룸", en: "Single Room", zh: "单人房", ja: "シングルルーム", vi: "Phòng đơn" },
    desc: { ko: "혼자 머무는 출장·장기 투숙에 알맞은 아늑한 객실", en: "A cozy room for solo business trips and long stays", zh: "适合出差和长住的舒适单人房", ja: "出張や長期滞在にぴったりの落ち着いた客室", vi: "Phòng ấm cúng cho khách công tác và ở dài ngày" } },
  { id: "deluxe", price: 900000, guests: 1, photo: "img/room-deluxe.jpg",
    name: { ko: "디럭스 싱글룸", en: "Deluxe Single Room", zh: "豪华单人房", ja: "デラックスシングル", vi: "Phòng đơn lớn" },
    desc: { ko: "넓은 공간과 작업 책상, 티 테이블을 갖춘 대형 1인실", en: "A larger single room with a work desk and tea table", zh: "空间宽敞，配有办公桌和茶桌", ja: "ワークデスクとティーテーブル付きの広めの1人部屋", vi: "Phòng đơn rộng, có bàn làm việc và bàn trà" } },
  { id: "twin", price: 1200000, guests: 2, photo: "img/room-twin.jpg",
    name: { ko: "트윈룸", en: "Twin Room", zh: "双床房", ja: "ツインルーム", vi: "Phòng đôi" },
    desc: { ko: "침대 두 개, 동료·가족 두 분이 함께 머무는 객실", en: "Two beds — ideal for colleagues or family", zh: "两张床，适合同事或家人同住", ja: "ベッド2台、同僚やご家族と一緒に", vi: "Hai giường, phù hợp đồng nghiệp hoặc gia đình" } },
];
window.ROOM_INCL = INCL;

// 1층 한식당 (사장님이 보내 주신 메뉴 목록 기준, 손으로 직접 만드는 칼국수·만두)
window.MENU = [
  {
    id: "noodle",
    photo: "img/noodle.jpg",
    name: { ko: "손칼국수 · 수제비", en: "Handmade Noodle Soups", zh: "手工面 · 面片汤", ja: "手打ち麺・スジェビ", vi: "Mì & canh bột tự làm" },
    note: { ko: "매일 직접 반죽해 끓여 드립니다", en: "Dough made by hand every day", zh: "每天亲手和面现煮", ja: "毎日手ごねの生地で作ります", vi: "Bột được nhào tay mỗi ngày" },
    items: [
      { price: 150000, tag: "best", name: { ko: "칼국수", en: "Kalguksu (Knife-cut Noodle Soup)", zh: "韩式刀切面", ja: "カルグクス（手打ちうどん）", vi: "Mì cắt tay Kalguksu" },
        desc: { ko: "손으로 썬 면에 시원한 국물", en: "Hand-cut noodles in a light, savory broth", zh: "手切面配清爽汤底", ja: "手切り麺にあっさりスープ", vi: "Sợi mì cắt tay, nước dùng thanh ngọt" } },
      { price: 150000, name: { ko: "수제비", en: "Sujebi (Hand-torn Dough Soup)", zh: "韩式面片汤", ja: "スジェビ（すいとん）", vi: "Canh bột xé Sujebi" },
        desc: { ko: "손으로 떼어 넣은 쫄깃한 반죽", en: "Chewy hand-torn dough pieces in broth", zh: "手撕面片，口感筋道", ja: "手でちぎったもちもち生地", vi: "Miếng bột xé tay dai mềm" } },
      { price: 150000, name: { ko: "칼제비", en: "Kaljebi (Noodles + Sujebi)", zh: "刀切面＋面片汤", ja: "カルジェビ（カルグクス＋スジェビ）", vi: "Kaljebi (mì cắt + bột xé)" },
        desc: { ko: "칼국수와 수제비를 한 그릇에", en: "Kalguksu and sujebi in one bowl", zh: "刀切面与面片一碗双享", ja: "カルグクスとスジェビを一杯で", vi: "Mì cắt và bột xé trong một tô" } },
    ],
  },
  {
    id: "mandu",
    photo: "img/food.jpg",
    name: { ko: "손만두", en: "Handmade Dumplings", zh: "手工饺子", ja: "手作りマンドゥ", vi: "Mandu tự làm" },
    items: [
      { price: 180000, tag: "best", name: { ko: "손만두", en: "Handmade Mandu (Dumplings)", zh: "手工饺子", ja: "手作りマンドゥ（餃子）", vi: "Mandu hấp tự làm" } },
      { price: 180000, name: { ko: "손만두국", en: "Mandu-guk (Dumpling Soup)", zh: "手工饺子汤", ja: "マンドゥクッ（餃子スープ）", vi: "Canh Mandu tự làm" } },
    ],
  },
];
