// 용갈비 Yong Galbi BBQ 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 사진 중 매장 벽 간판·입간판(2026-11-05 수집, 올린 날짜 미상, 안티그래비티 읽기+Claude Sonnet 재대조). 간판에 있는 메뉴만 넣음(갈비탕 등 가격 없는 메뉴는 뺌)
// 간판에 정상가(취소선)와 '무한리필 주문 시 50% 할인가'가 같이 있어, 정상가(높은 쪽)를 price 로 쓰고 할인가는 desc 에 적음
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "용갈비", en: "Yong Galbi BBQ" },
  phone: "0369 991 912",
  address: "09 Đ. Lý Đạo Thành, P. Kinh Bắc, Bắc Ninh",
  wifi: null,
  hours: { ko: "11:30 – 14:00 / 16:30 – 21:00", en: "11:30 – 14:00 / 16:30 – 21:00", zh: "11:30 – 14:00 / 16:30 – 21:00", ja: "11:30 – 14:00 / 16:30 – 21:00", vi: "11:30 – 14:00 / 16:30 – 21:00" },
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price: price ?? null, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

window.MENU = [
  {
    id: "unlimited",
    name: T("무한리필", "All-You-Can-Eat", "无限畅吃", "食べ放題", "ĂN SƯỜN RỒNG THỎA THÍCH"),
    note: T(
      "1인 280,000동에 돼지 양념 갈비 무제한",
      "Unlimited marinated pork ribs, 280,000₫ per person",
      "每人280,000越南盾，腌制猪排骨无限畅吃",
      "お一人様280,000ドンで味付け豚カルビ食べ放題",
      "Sườn rồng không giới hạn, 280.000₫/người"
    ),
    items: [
      it(280000, "yangnyeom", "돼지 양념 갈비 무제한 (1인)", "Unlimited Marinated Pork Ribs (Yangnyeom Galbi) – per person", "无限量腌制猪排骨 (양념 갈비) – 每人", "味付け豚カルビ食べ放題 (양념 갈비) – お一人様", "Sườn rồng không giới hạn (1 người)", { tag: "best" }),
    ],
  },
  {
    id: "grill",
    name: T("구이", "Grill", "烧烤", "焼肉", "THỊT NƯỚNG"),
    note: T(
      "무한리필을 주문하면 아래 고기를 50% 할인 가격으로 드실 수 있어요",
      "Order the all-you-can-eat and enjoy the meats below at 50% off",
      "点无限畅吃套餐，下列肉类可享5折优惠",
      "食べ放題をご注文いただくと、下記のお肉が半額でお召し上がりいただけます",
      "Gọi ăn sườn rồng thỏa thích để được giảm 50% các món thịt dưới đây"
    ),
    items: [
      it(220000, null, "항정살", "Hangjeongsal (Pork Jowl)", "猪颈肉 (항정살)", "豚トロ (항정살)", "Thịt vai", { desc: T("무한리필 주문 시 110,000₫", "110,000₫ with all-you-can-eat order", "点无限畅吃时 110,000₫", "食べ放題ご注文時 110,000₫", "Khi gọi ăn thỏa thích: 110.000₫") }),
      it(220000, null, "돼지 생갈비", "Fresh Pork Ribs (Saeng Galbi)", "生猪排 (생갈비)", "生豚カルビ (생갈비)", "Sườn non", { desc: T("무한리필 주문 시 110,000₫", "110,000₫ with all-you-can-eat order", "点无限畅吃时 110,000₫", "食べ放題ご注文時 110,000₫", "Khi gọi ăn thỏa thích: 110.000₫") }),
      it(200000, "samgyeop", "생삼겹살", "Fresh Pork Belly (Saengsamgyeopsal)", "生五花肉 (생삼겹살)", "生豚バラ (생삼겹살)", "Thịt ba chỉ lợn", { desc: T("무한리필 주문 시 100,000₫", "100,000₫ with all-you-can-eat order", "点无限畅吃时 100,000₫", "食べ放題ご注文時 100,000₫", "Khi gọi ăn thỏa thích: 100.000₫") }),
      it(200000, null, "목살", "Pork Neck (Moksal)", "梅花肉 (목살)", "豚肩ロース (목살)", "Thịt cổ", { desc: T("무한리필 주문 시 100,000₫", "100,000₫ with all-you-can-eat order", "点无限畅吃时 100,000₫", "食べ放題ご注文時 100,000₫", "Khi gọi ăn thỏa thích: 100.000₫") }),
      it(300000, null, "차돌박이", "Beef Brisket (Chadolbaegi)", "牛胸腹肉 (차돌박이)", "牛バラ薄切り (차돌박이)", "Gầu bò", { desc: T("무한리필 주문 시 150,000₫", "150,000₫ with all-you-can-eat order", "点无限畅吃时 150,000₫", "食べ放題ご注文時 150,000₫", "Khi gọi ăn thỏa thích: 150.000₫") }),
      it(280000, "sogalbisal", "소갈비살", "Boneless US Beef Short Rib (Sogalbisal)", "美国去骨牛小排 (소갈비살)", "アメリカ産骨なし牛カルビ (소갈비살)", "Sườn bò Mỹ không xương", { desc: T("무한리필 주문 시 140,000₫", "140,000₫ with all-you-can-eat order", "点无限畅吃时 140,000₫", "食べ放題ご注文時 140,000₫", "Khi gọi ăn thỏa thích: 140.000₫") }),
    ],
  },
];
