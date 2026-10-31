// 수변돼지국밥 박닌점 (SUBYEON · 수변최고 돼지국밥, 298 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진(2026-10-30 수집, 올린 날짜 미상) — 신형 menu_01(부가세 포함·높은 가격), 구형 menu_02~07, 음료 menu_08(맥주 Tuborg·Blance는 menu_08에만 있음)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "수변돼지국밥 박닌점", en: "Subyeon Pork Soup Bắc Ninh" },
  phone: "0347 472 336",
  address: "298 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh",
  wifi: { ssid: "Đệ nhất cơm canh thịt lợn", password: "87654321" },
  hours: "09:30 – 14:00 · 16:30 – 22:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ ...(price != null ? { price } : {}), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const ds = (ko, en, zh, ja, vi) => ({ desc: { ko, en, zh, ja, vi } });

window.MENU = [
  {
    id: "gukbap",
    name: T("식사류", "Soup & Rice", "餐食", "お食事", "Cơm canh"),
    note: T("전 메뉴 부가세 포함 가격이에요", "All prices include VAT", "所有价格均含增值税", "全メニュー税込価格です", "Giá đã bao gồm VAT"),
    items: [
      it(180000, "meat-gukbap", "고기국밥", "Pork Soup with Rice", "猪肉汤饭", "豚肉クッパ", "Cơm canh thịt lợn", { tag: "best" }),
      it(180000, null, "내장국밥", "Pork Offal Soup with Rice", "猪杂汤饭", "ホルモンクッパ", "Cơm canh nội tạng"),
      it(200000, null, "순대만 국밥", "Blood Sausage Soup with Rice", "血肠汤饭", "スンデクッパ", "Cơm canh dồi"),
      it(200000, null, "고기내장국밥", "Pork & Offal Soup with Rice", "猪肉猪杂汤饭", "豚肉・ホルモンクッパ", "Cơm canh thịt và nội tạng"),
      it(200000, null, "고기순대국밥", "Pork & Sausage Soup with Rice", "猪肉血肠汤饭", "豚肉・スンデクッパ", "Cơm canh thịt và dồi"),
      it(200000, null, "순대내장국밥", "Sausage & Offal Soup with Rice", "血肠猪杂汤饭", "スンデ・ホルモンクッパ", "Cơm canh dồi và nội tạng"),
      it(200000, "mixed-gukbap", "모듬국밥", "Assorted Pork Soup with Rice", "什锦汤饭", "盛り合わせクッパ", "Cơm canh thập cẩm", { tag: "must" }),
      it(220000, null, "수육백반", "Boiled Pork Set", "白切猪肉套餐", "茹で豚定食", "Cơm thịt luộc"),
      it(180000, null, "얼큰 고기우동", "Spicy Pork Udon", "辣味猪肉乌冬", "辛口豚肉うどん", "Mì udon thịt lợn cay", { tag: "special", spicy: true, ...ds("신메뉴 · 메뉴판 아래 포스터 기준", "New menu · from the poster under the menu board", "新品 · 以菜单下方海报为准", "新メニュー · メニュー板下のポスター基準", "Món mới · theo poster dưới bảng thực đơn") }),
    ],
  },
  {
    id: "dishes",
    name: T("요리류", "Side Dishes", "菜肴", "料理", "Món ăn kèm"),
    items: [
      it(760000, "mixed-suyuk", "모듬 수육", "Assorted Boiled Pork", "什锦白切猪肉", "盛り合わせ茹で豚", "Thịt luộc thập cẩm"),
      it(null, "suyuk", "수육", "Boiled Pork", "白切猪肉", "茹で豚（スユク）", "Thịt luộc", { sizes: [["대 L", 760000], ["중 M", 650000], ["소 S", 440000]] }),
      it(null, "sundae", "순대", "Korean Blood Sausage", "韩式血肠", "スンデ", "Dồi Hàn Quốc", { sizes: [["대 L", 400000], ["중 M", 320000], ["소 S", 220000]] }),
    ],
  },
  {
    id: "drinks",
    name: T("주류·음료", "Drinks", "酒水·饮料", "お酒・ドリンク", "Đồ uống"),
    items: [
      it(140000, null, "참이슬 · 진로", "Chamisul · Jinro Soju", "真露烧酒", "チャミスル・ジンロ", "Soju Chamisul · Jinro"),
      it(140000, null, "새로 · 처음처럼", "Saero · Chum Churum Soju", "新乐·初饮初乐烧酒", "セロ・チョウムチョロム", "Soju Saero · Chum Churum"),
      it(120000, null, "좋은데이", "Good Day Soju", "好日子烧酒", "チョウンデー", "Soju Good Day"),
      it(120000, null, "보드카맨 (330ml)", "Vodkaman (330 ml)", "伏特加曼（330毫升）", "ボドカマン（330ml）", "Vodkaman (330ml)"),
      it(160000, null, "생 막걸리", "Draft Makgeolli", "生马格利", "生マッコリ", "Makgeolli tươi"),
      it(50000, null, "Tiger", "Tiger Beer", "虎牌啤酒", "タイガービール", "Bia Tiger"),
      it(50000, null, "Tuborg", "Tuborg Beer", "乐堡啤酒", "ツボルグビール", "Bia Tuborg"),
      it(70000, null, "Blance", "Blance Beer", "Blance 啤酒", "Blance ビール", "Bia Blance"),
      it(20000, null, "음료수", "Soft Drink", "饮料", "ソフトドリンク", "Nước ngọt"),
    ],
  },
  {
    id: "takeout",
    name: T("포장", "Takeaway", "外带", "お持ち帰り", "Mang về"),
    note: T("전 메뉴 포장이 돼요", "All dishes available for takeaway", "所有菜品均可外带", "全メニューお持ち帰りできます", "Tất cả món đều có thể mang về"),
    items: [
      it(50000, null, "김치", "Kimchi", "泡菜", "キムチ", "Kim chi"),
      it(50000, null, "깍두기", "Radish Kimchi (Kkakdugi)", "萝卜泡菜", "カクテキ", "Kim chi củ cải"),
    ],
  },
];
