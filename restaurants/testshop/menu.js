// QR 시험 식당 (testshop) — 실제 가게가 아님. 주방 주문(손님 주문 → 주방 화면) 시험용 가짜 메뉴 (2026-11-15, 캡틴 결정 '가-1·나-1·다-1·라-1')
// 가격은 시험용으로 정한 값. 사진 없음. 시가 1개(price: null), 크기별 가격 1개(sizes) 포함
window.RESTAURANT = {
  brand: { ko: "QR 시험 식당", en: "QR TEST" },
  phone: "시험용 (전화 없음)",
  address: "시험용 가상 가게 · 실제 주소 없음",
  wifi: null,
  hours: "10:00 – 22:00",
};

// 장바구니·주문서 (_shared/order.js). staff = 주문서 언어, zalo = 주문 받을 Zalo 번호
window.ORDER = { staff: "vi", currency: "₫", zalo: null };

window.MENU = [
  {
    id: "stew",
    name: { ko: "찌개", en: "Stews", zh: "炖汤", ja: "チゲ", vi: "Canh hầm" },
    items: [
      { name: { ko: "김치찌개", en: "Kimchi Stew", zh: "泡菜汤", ja: "キムチチゲ", vi: "Canh kimchi" }, price: 120000, tag: "best", spicy: true },
      { name: { ko: "된장찌개", en: "Soybean Paste Stew", zh: "大酱汤", ja: "テンジャンチゲ", vi: "Canh tương Hàn Quốc" }, price: 110000 },
    ],
  },
  {
    id: "rice",
    name: { ko: "밥", en: "Rice", zh: "米饭", ja: "ご飯", vi: "Cơm" },
    items: [
      { name: { ko: "비빔밥", en: "Bibimbap", zh: "拌饭", ja: "ビビンバ", vi: "Cơm trộn" }, price: 120000, tag: "must" },
      { name: { ko: "제육덮밥", en: "Spicy Pork Rice Bowl", zh: "辣炒猪肉盖饭", ja: "豚肉炒め丼", vi: "Cơm thịt lợn xào cay" }, price: 130000, spicy: true },
    ],
  },
  {
    id: "dish",
    name: { ko: "요리", en: "Dishes", zh: "菜品", ja: "料理", vi: "Món chính" },
    items: [
      { name: { ko: "해물파전", en: "Seafood Pancake", zh: "海鲜葱饼", ja: "海鮮チヂミ", vi: "Bánh xèo hải sản Hàn Quốc" }, sizes: [["S", 150000], ["L", 220000]] },
      { name: { ko: "광어회", en: "Flatfish Sashimi", zh: "比目鱼生鱼片", ja: "ヒラメの刺身", vi: "Gỏi cá bơn" }, price: null, desc: { ko: "시가 — 주문 뒤 가게에서 금액을 알려 드려요", en: "Market price — the shop will tell you the price", zh: "时价 — 下单后店家告知价格", ja: "時価 — 注文後にお店から金額をお知らせします", vi: "Thời giá — quán sẽ báo giá sau khi gọi món" } },
    ],
  },
  {
    id: "drink",
    name: { ko: "음료 · 주류", en: "Drinks", zh: "饮料 · 酒类", ja: "ドリンク・お酒", vi: "Đồ uống" },
    items: [
      { name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "焼酎", vi: "Rượu soju" }, price: 80000 },
      { name: { ko: "콜라", en: "Coca-Cola", zh: "可乐", ja: "コーラ", vi: "Coca-Cola" }, price: 25000 },
    ],
  },
];
