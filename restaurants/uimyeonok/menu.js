// 우이며녹 미딩점 (UI MYEO NOK) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진(menu_01·04·05·06·12, 2026-10-31 수집, 올린 날짜 미상), 가격이 다르면 높은 쪽
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "우이며녹 미딩점", en: "UI MYEO NOK" },
  phone: "024 3880 0010",
  address: "C005, The Manor, Đ. Mỹ Đình, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:00 – 22:00", // 구글 지도(2026-10-31)
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ ...(price != null ? { price } : {}), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

window.MENU = [
  {
    id: "signature",
    name: T("시그니처 칼국수", "Signature Kalguksu", "招牌刀削面", "シグネチャー カルグクス", "Mì cắt đặc trưng"),
    note: T("모든 메뉴 부가세(VAT) 별도 · 차돌·얼큰해물 칼국수는 2인분부터 주문", "All prices exclude VAT · Beef Brisket and Spicy Seafood Kalguksu: minimum 2 servings", "所有菜品价格不含VAT · 牛腩刀削面、辣海鲜刀削面2人份起订", "全メニュー税別（VAT別）・牛バラ／辛口海鮮カルグクスは2人前から", "Giá món chưa bao gồm VAT · Mì cắt gầu bò, mì cắt cay hải sản gọi từ 2 suất"),
    items: [
      it(200000, "beef", "차돌 칼국수 (얼큰 / 담백)", "Beef Brisket Kalguksu (Spicy / Mild)", "牛腩刀削面（辣 / 清淡）", "牛バラカルグクス（辛口／あっさり）", "Mì cắt gầu bò (cay / thanh)", { tag: "must", desc: T("1인 가격 · 2인분부터 주문", "Price per person · min. 2 servings", "每人价格 · 2人份起订", "1人前の価格・2人前から", "Giá 1 người · gọi từ 2 suất") }),
      it(170000, "clam", "백합칼국수", "Hard Clam Kalguksu", "蛤蜊刀削面", "ハマグリカルグクス", "Mì cắt nghêu", { tag: "best", desc: T("1인 가격", "Price per person", "每人价格", "1人前の価格", "Giá 1 người") }),
      it(200000, "seafood", "얼큰해물칼국수", "Spicy Seafood Kalguksu", "辣海鲜刀削面", "辛口海鮮カルグクス", "Mì cắt cay hải sản", { spicy: true, desc: T("1인 가격 · 2인분부터 주문", "Price per person · min. 2 servings", "每人价格 · 2人份起订", "1人前の価格・2人前から", "Giá 1 người · gọi từ 2 suất") }),
    ],
  },
  {
    id: "extra",
    name: T("추가 메뉴", "Add-ons", "加购菜品", "追加メニュー", "Món gọi thêm"),
    items: [
      it(150000, null, "차돌 추가 (100g)", "Extra Beef Brisket (100g)", "加牛腩（100g）", "牛バラ追加（100g）", "Thêm gầu bò (100g)"),
      it(150000, null, "낙지 샤브샤브 (2미)", "Octopus Shabu-shabu (2 pcs)", "章鱼涮锅（2只）", "タコしゃぶしゃぶ（2匹）", "Shabu shabu bạch tuộc (2 con)"),
      it(100000, null, "왕새우 5미", "5 Large Tiger Prawns", "大虾5只", "大エビ5尾", "5 con tôm sú lớn"),
      it(80000, null, "백합 추가 (500g)", "Extra Hard Clams (500g)", "加蛤蜊（500g）", "ハマグリ追加（500g）", "Thêm nghêu (500g)"),
      it(50000, null, "칼국수 사리", "Extra Kalguksu Noodles", "加刀削面", "カルグクス麺追加", "Mì cắt thêm"),
      it(50000, "porridge", "계란죽", "Egg Porridge", "鸡蛋粥", "卵がゆ", "Cháo trứng"),
    ],
  },
  {
    id: "side",
    name: T("사이드 메뉴", "Side Menu", "小吃", "サイドメニュー", "Món ăn kèm"),
    items: [
      it(200000, "pajeon", "해물파전", "Seafood Pajeon (Pancake)", "海鲜煎饼", "海鮮チヂミ", "Bánh xèo hải sản"),
      it(180000, null, "오징어 초무침", "Spicy & Sour Squid Salad", "酸辣拌鱿鱼", "イカの酢和え（ピリ辛）", "Gỏi mực chua cay", { spicy: true }),
      it(50000, "mandu", "만두튀김", "Fried Mandu (Dumplings)", "炸饺子", "揚げ餃子", "Mandu chiên"),
      it(150000, null, "우이지 냉국수", "Uiji Cold Noodles", "Uiji冷面", "ウイジ 冷麺", "Mì lạnh Uiji"),
      it(150000, null, "우이지 간장국수", "Uiji Soy Sauce Noodles", "Uiji酱油拌面", "ウイジ 醤油麺", "Mì nước tương Uiji"),
      it(150000, null, "우이지 고추장국수", "Uiji Spicy Gochujang Noodles", "Uiji辣酱拌面", "ウイジ コチュジャン麺", "Mì tương cay Uiji", { spicy: true }),
      it(20000, null, "공기밥", "Steamed Rice", "米饭", "ご飯", "Cơm trắng"),
    ],
  },
];
