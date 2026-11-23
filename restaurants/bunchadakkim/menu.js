// 분짜닥킴 (Bún Chả Đắc Kim) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(2026-11-23 수집). 옛 판·새 판(스페셜 에디션) 두 가지가 있어 높은 쪽(새 판) 가격을 씀
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3)
window.RESTAURANT = {
  brand: { ko: "분짜닥킴", en: "Bún Chả Đắc Kim" },
  phone: "02438287060",
  address: "1 P. Hàng Mành, Phố cổ Hà Nội, Hoàn Kiếm, Hà Nội",
  mapUrl: "https://www.google.com/maps/place/%EB%B6%84%EC%A7%9C%EB%8B%A5%ED%82%B4/@21.0322542,105.8433386,17z/data=!4m6!3m5!1s0x3135abbe40899a17:0x9aa20a2ad5a0f0e4!8m2!3d21.0322493!4d105.8482095!16s%2Fg%2F1thpz5ms",
  wifi: null,
  hours: "09:00 – 21:00",
};

window.MENU = [
  {
    id: "main",
    name: { ko: "분짜 · 넴", en: "Bún Chả & Nem", zh: "烤肉米线 · 春卷", ja: "ブンチャー・ネム", vi: "Bún chả & Nem" },
    items: [
      { name: { ko: "분짜 & 게살 춘권 콤보", en: "Bún Chả & Crab Spring Rolls Combo", zh: "烤肉米线+蟹肉春卷套餐", ja: "ブンチャー＆蟹春巻きコンボ", vi: "Combo Bún chả và Nem cua bể" }, price: 140000, tag: "must", photo: "img/combo.jpg" },
      { name: { ko: "분짜", en: "Bún Chả (Grilled Pork Rice Noodles)", zh: "烤肉米线", ja: "ブンチャー", vi: "Bún chả" }, price: 80000, tag: "best", photo: "img/buncha.jpg" },
      { name: { ko: "분넴꾸어베", en: "Bún Nem Cua Bể (Noodles with 3 Crab Spring Rolls)", zh: "蟹肉春卷米线（3个）", ja: "蟹春巻きブン（3本）", vi: "Bún nem cua bể" }, price: 100000, photo: "img/bunnem.jpg" },
      { name: { ko: "분넴짜이 (채식 춘권)", en: "Bún Nem Chay (Vegetarian Spring Rolls)", zh: "素春卷米线", ja: "ベジタリアン春巻きブン", vi: "Bún nem chay" }, price: 70000 },
      { name: { ko: "넴꾸어베 (게살 튀김 춘권 1개)", en: "Nem Cua Bể (Fried Crab Spring Roll, per piece)", zh: "炸蟹肉春卷（每个）", ja: "揚げ蟹春巻き（1本）", vi: "Nem cua bể (1 cái)" }, price: 30000, photo: "img/nem.jpg" },
    ],
  },
  {
    id: "drink",
    name: { ko: "음료", en: "Drinks", zh: "饮品", ja: "ドリンク", vi: "Đồ uống" },
    items: [
      { name: { ko: "하노이 맥주", en: "Hanoi Beer", zh: "河内啤酒", ja: "ハノイビール", vi: "Bia Hà Nội" }, price: 30000, photo: "img/beer.jpg" },
      { name: { ko: "탄산음료 (코카콜라·펩시·세븐업 등)", en: "Soft Drink (Coca-Cola, Pepsi, 7up...)", zh: "汽水（可口可乐、百事、七喜等）", ja: "ソフトドリンク（コカ・コーラ、ペプシ、7up等）", vi: "Nước ngọt (Coca-Cola, Pepsi, 7up...)" }, price: 20000 },
      { name: { ko: "생수", en: "Mineral Water", zh: "矿泉水", ja: "ミネラルウォーター", vi: "Nước khoáng" }, price: 10000 },
    ],
  },
];
