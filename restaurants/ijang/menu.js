// 이장네 돈가 박닌점 IJANG BBQ BẮC NINH (10 Lý Nhân Tông, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "이장네 돈가" 폴더의 구글 지도 캡처 11장(가게 계정이 올린 메뉴판 이미지·인쇄 메뉴판·1년 전 손님 사진·간판) + 골프존 안내판 사진 1장(이 가게와 무관해 안 씀).
// 한국어·베트남어는 메뉴판 표기, 영어·중국어·일본어는 새로 번역. 가격 단위: VND (메뉴판은 "120.000" 형식)
// 메뉴/가격 수정은 이 파일만 고치면 됩니다.
// it(가격, 한국어, 영어, 중국어, 일본어, 베트남어, 추가 설정) — 추가 설정: { spicy, tag: "best", desc, unit }
window.RESTAURANT = {
  brand: { ko: "이장네 돈가", en: "Ijang BBQ", branch: "Bắc Ninh · Võ Cường" },
  phone: "0837 825 868",
  address: "10 Lý Nhân Tông, Võ Cường, Bắc Ninh",
  mapQuery: "이장네 돈가 IJANG BBQ BẮC NINH",
  wifi: null,
};

const it = (price, ko, en, zh, ja, vi, x = {}) => ({ price, name: { ko, en, zh, ja, vi }, ...x });
const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const U = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi }); // 가격 옆 작은 글씨 (양)
const G = (n) => U(`${n}g`, `${n}g`, `${n}g`, `${n}g`, `${n}g`);
const SETU = U("600g(1근)", "600g", "600g（1斤）", "600g", "600g");

// 부위 이름 (메뉴판 한국어 → 5개 언어). 세트 구성 설명에 씀.
const P = {
  "양념생갈비살": T("양념생갈비살", "Marinated fresh short rib meat", "腌制鲜牛小排肉", "味付け生カルビ", "Dẻ sườn bò Mỹ ướp gia vị"),
  "생소갈비살": T("생소갈비살", "Fresh short rib meat", "鲜牛小排肉", "生カルビ", "Dẻ sườn bò Mỹ tươi"),
  "목살": T("목살", "Pork shoulder", "猪梅花肉", "豚肩ロース", "Thịt vai loại 1"),
  "항정살": T("항정살", "Pork jowl", "猪颊肉（松板肉）", "豚トロ", "Thịt má heo"),
  "삼겹살": T("삼겹살", "Pork belly", "五花肉", "豚バラ", "Thịt ba chỉ loại 1"),
  "가브리살": T("가브리살", "Pork shoulder ridge", "猪脆肩肉", "豚の肩ロース脂身（カブリサル）", "Thịt vai giòn"),
  "꼬들살": T("꼬들살", "Pork neck", "猪颈肉", "豚首肉（コドゥルサル）", "Thịt gáy heo"),
};
const set = (letter, price, parts, ko, vi) => {
  const l = (lang) => parts.map((p) => P[p][lang]).join(" + ");
  return it(price, `${letter} 세트`, `Set ${letter}`, `套餐 ${letter}`, `セット ${letter}`, `Set ${letter}`,
    { unit: SETU, desc: T(ko, l("en"), l("zh"), l("ja"), vi) });
};

window.MENU = [
  {
    id: "set",
    photo: "img/set.jpg",
    name: T("세트 메뉴", "Set menus", "套餐", "セットメニュー", "Set menu"),
    note: T("고기 3인분 주문 시 테이블당 된장술밥 또는 비빔국수를 1회 서비스로 드려요",
      "Order 3 servings of meat and get one doenjang rice or bibim noodles per table, free",
      "点3人份肉类，每桌赠送一次大酱饭或拌面",
      "お肉を3人前注文すると、テーブルごとに味噌ごはんまたはビビン麺を1回サービス",
      "Gọi từ 3 phần thịt, mỗi bàn được tặng 1 phần cơm tương hoặc mì trộn"),
    items: [
      set("A", 700000, ["양념생갈비살", "목살", "항정살"], "양념생갈비살 + 목살 + 항정살", "Dẻ sườn bò Mỹ ướp gia vị + Thịt vai loại 1 + Thịt má heo"),
      set("B", 680000, ["생소갈비살", "삼겹살", "가브리살"], "생소갈비살 + 삼겹살 + 가브리살", "Dẻ sườn bò Mỹ tươi + Thịt ba chỉ loại 1 + Thịt vai giòn"),
      set("C", 480000, ["삼겹살", "목살", "가브리살"], "삼겹살 + 목살 + 가브리살", "Thịt ba chỉ loại 1 + Thịt vai loại 1 + Thịt vai giòn"),
      set("D", 520000, ["목살", "항정살", "꼬들살"], "목살 + 항정살 + 꼬들살", "Thịt vai loại 1 + Thịt má heo + Thịt gáy heo"),
    ],
  },
  {
    id: "pork",
    photo: "img/pork.jpg",
    name: T("메인 메뉴 (돼지고기)", "Main menu · Pork", "主菜 · 猪肉", "メイン・豚肉", "Món chính · Thịt heo"),
    note: T("꼬들살이 맛있다는 평이 많아요", "Guests often praise the kkodeulsal (pork neck)", "不少顾客称赞猪颈肉（꼬들살）", "コドゥルサル（豚首肉）が美味しいと評判です", "Nhiều khách khen thịt gáy heo (꼬들살)"),
    items: [
      it(120000, "삼겹살", "Pork belly (samgyeopsal)", "五花肉", "豚バラ（サムギョプサル）", "Thịt ba chỉ loại 1", { unit: G(150) }),
      it(120000, "목살", "Pork shoulder (moksal)", "猪梅花肉", "豚肩ロース（モクサル）", "Thịt vai loại 1", { unit: G(150) }),
      it(150000, "항정살", "Pork jowl (hangjeongsal)", "猪颊肉（松板肉）", "豚トロ（ハンジョンサル）", "Thịt má heo (nạc nọng heo)", { unit: G(150) }),
      it(150000, "꼬들살", "Pork neck (kkodeulsal)", "猪颈肉", "豚首肉（コドゥルサル）", "Thịt gáy heo", { unit: G(150), tag: "best" }),
      it(150000, "가브리살", "Pork shoulder ridge (gabrisal)", "猪脆肩肉", "豚の肩ロース脂身（カブリサル）", "Thịt vai giòn", { unit: G(150) }),
      it(220000, "돼지양념갈비", "Marinated pork ribs", "腌制猪排", "味付け豚カルビ", "Thịt heo ướp gia vị", { unit: G(250) }),
    ],
  },
  {
    id: "usbeef",
    photo: "img/us.jpg",
    name: T("미국 소고기", "US beef", "美国牛肉", "アメリカ産牛肉", "Bò Mỹ"),
    items: [
      it(480000, "꽃살 (Prime)", "Boneless short rib (US Prime)", "美国Prime无骨牛小排", "米国産プライム骨なしカルビ（コッサル）", "Sườn bò Mỹ Prime (không xương)", { unit: G(150) }),
      it(260000, "생소갈비살", "Fresh short rib meat", "鲜牛小排肉", "生カルビ", "Dẻ sườn bò Mỹ tươi", { unit: G(150) }),
      it(280000, "양념소갈비살", "Marinated short rib meat", "腌制牛小排肉", "味付けカルビ", "Dẻ sườn bò Mỹ ướp gia vị", { unit: G(150) }),
    ],
  },
  {
    id: "vnbeef",
    photo: "img/raw.jpg",
    name: T("베트남 소고기 · 생고기", "Vietnamese beef · Raw", "越南牛肉 · 生肉", "ベトナム産牛肉・生肉", "Bò Việt Nam · Món sống"),
    items: [
      it(400000, "육사시미", "Beef sashimi", "牛肉刺身", "牛刺し（ユクサシミ）", "Bò sashimi", { unit: G(200) }),
      it(250000, "육회", "Beef tartare (yukhoe)", "生拌牛肉", "ユッケ", "Gỏi bò", { unit: G(150) }),
    ],
  },
  {
    id: "meal",
    photo: "img/meal.jpg",
    name: T("식사 메뉴", "Meals", "正餐", "お食事", "Món ăn chính"),
    items: [
      it(180000, "소고기된장찌개", "Beef doenjang stew (with rice)", "牛肉大酱汤（含米饭）", "牛肉入り味噌チゲ（ご飯付き）", "Canh tương đậu bò"),
      it(180000, "김치찌개", "Kimchi stew (with rice)", "泡菜汤（含米饭）", "キムチチゲ（ご飯付き）", "Canh kim chi", { spicy: true }),
      it(180000, "육회비빔밥", "Beef tartare bibimbap", "生拌牛肉拌饭", "ユッケビビンバ", "Cơm trộn gỏi bò"),
    ],
  },
  {
    id: "dessert",
    photo: "img/dessert.jpg",
    name: T("후식 메뉴", "After-meal menu", "饭后菜单", "締めメニュー", "Món ăn sau bữa"),
    items: [
      it(50000, "공기밥 + 된장찌개", "Rice + doenjang stew", "米饭 + 大酱汤", "ご飯 + 味噌チゲ", "Cơm trắng + Canh tương đậu"),
      it(100000, "김치말이국수", "Cold kimchi noodle soup", "泡菜冷汤面", "キムチ冷やし麺（キムチマリククス）", "Mỳ kim chi"),
      it(80000, "비빔국수", "Spicy mixed noodles (bibim guksu)", "拌面", "ビビン麺（ビビンクスク）", "Mỳ trộn", { spicy: true }),
      it(80000, "냄비라면", "Korean ramen in a pot", "韩式锅煮拉面", "鍋ラーメン", "Mỳ Hàn Quốc", { spicy: true }),
      it(40000, "계란찜", "Steamed egg", "蒸蛋", "卵蒸し（ケランチム）", "Trứng hấp"),
      it(20000, "공기밥", "Steamed rice", "米饭", "ご飯", "Cơm trắng"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒水 · 饮料", "お酒・ドリンク", "Rượu · Đồ uống"),
    note: T("술값이 저렴하다는 평이 많아요", "Guests like the reasonable drink prices", "不少顾客称赞酒水价格实惠", "お酒が手頃な価格だと評判です", "Nhiều khách khen giá rượu bia phải chăng"),
    items: [
      it(160000, "막걸리", "Makgeolli (rice wine)", "马格利（米酒）", "マッコリ", "Rượu gạo"),
      it(100000, "참이슬", "Chamisul (soju)", "真露 Chamisul（烧酒）", "チャミスル（焼酎）", "Rượu Chamisul"),
      it(100000, "처음처럼", "Chum-churum (soju)", "初饮初乐 Chum-churum（烧酒）", "チャミスル処音（焼酎）", "Rượu Chumchurum"),
      it(100000, "새로", "Saero (soju)", "Saero（烧酒）", "セロ（焼酎）", "Sae Ro"),
      it(100000, "진로", "Jinro (soju)", "真露 Jinro（烧酒）", "ジンロ（焼酎）", "Jinro"),
      it(70000, "좋은데이", "Good Day (soju)", "Good Day（烧酒）", "グッデイ（焼酎）", "Good Day"),
      it(100000, "보드카", "Vodka", "伏特加", "ウォッカ", "Rượu Vodka"),
      it(50000, "맥주", "Beer", "啤酒", "ビール", "Bia"),
      it(20000, "콜라 · 사이다 · 환타 · 제로콜라", "Coke, Sprite, Fanta, Coke Zero", "可乐 · 雪碧 · 芬达 · 零度可乐", "コーラ・サイダー・ファンタ・コーラゼロ", "Coca, Sprite, Fanta, Coca không calo"),
    ],
  },
];
