// 안지랑 곱창 막창 ANJIRANG GOPCHANG (Ngõ 179 Đ. Đình Thôn, Từ Liêm, Hà Nội) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "안지랑 곱창 막창" 폴더의 구글 지도 캡처 9장(가게 계정이 1개월 전 올린 메뉴판 이미지 — 한국어·베트남어 표기, 간판·지도 정보, 손님 사진).
// 메뉴판에 한국어·베트남어가 있어 그대로 쓰고 영어·중국어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "안지랑 곱창 막창", en: "Anjirang Gopchang", branch: { ko: "하노이", en: "Hà Nội" } },
  phone: "0982 099 759",
  address: "Ngõ 179 Đ. Đình Thôn, Đình Thôn, Từ Liêm, Hà Nội",
  mapQuery: "안지랑 곱창 막창 19C Đình Thôn Hà Nội",
  wifi: null, // 예: { ssid: "ANJIRANG", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

window.MENU = [
  {
    id: "grill",
    name: T("곱창 · 막창 구이", "Gopchang & Makchang grill", "烤牛杂 · 烤猪肠", "ホルモン焼き", "Nướng lòng · dạ dày"),
    items: [
      it(180000, "gopchang", "곱창", "Gopchang (seasoned grilled beef small intestine)", "调味烤牛小肠（곱창）", "味付けコプチャン焼き（牛小腸）", "Lòng nướng ướp gia vị"),
      it(180000, "makchang", "막창", "Makchang (grilled pork)", "烤猪肠（막창）", "豚マクチャン焼き", "Khấu heo nướng"),
      it(180000, "yeomtong", "염통구이", "Grilled heart (yeomtong)", "烤心脏（염통）", "心臓の焼き物（ヨムトン）", "Tim nướng"),
      it(95000, null, "대패삼겹살", "Thinly sliced pork belly (daepae-samgyeopsal)", "薄切五花肉（대패삼겹살）", "薄切りサムギョプサル（テペサムギョプサル）", "Ba chỉ heo thái mỏng nướng"),
    ],
  },
  {
    id: "meal",
    name: T("통닭 · 식사", "Fried chicken & meals", "炸鸡 · 主食", "チキン・食事", "Gà chiên · Món ăn kèm"),
    items: [
      it(200000, null, "옛날통닭", "Old-style whole fried chicken (yetnal-tongdak)", "传统整只炸鸡（옛날통닭）", "昔ながらの丸ごとフライドチキン（イェンナルトンダク）", "Gà chiên nguyên con kiểu truyền thống"),
      it(120000, null, "옛날통닭 (반마리)", "Old-style fried chicken (half)", "传统炸鸡（半只）", "昔ながらのフライドチキン（半羽）", "Gà chiên nửa con kiểu truyền thống"),
      it(120000, null, "된장찌개", "Doenjang jjigae (Korean soybean paste stew)", "韩式大酱汤", "テンジャンチゲ（韓国式味噌チゲ）", "Canh tương đậu kiểu Hàn"),
      it(20000, null, "공기밥", "Steamed rice", "米饭", "ご飯", "Cơm trắng"),
      it(60000, null, "볶음밥 추가", "Extra fried rice", "加点炒饭", "チャーハン追加", "Cơm rang thêm"),
    ],
  },
  {
    id: "set",
    name: T("세트메뉴", "Set menu", "套餐", "セットメニュー", "Set menu"),
    items: [
      it(400000, null, "막창 + 곱창 + 된장찌개", "Makchang + Gopchang + Doenjang jjigae", "烤猪肠 + 烤牛小肠 + 大酱汤", "マクチャン + コプチャン + テンジャンチゲ", "Dồi trường + Lòng non bò 150g + Canh tương đậu", {
        desc: T("곱창 150g 포함", "Includes 150g of gopchang", "含牛小肠 150 克", "コプチャン 150g 入り", "Gồm lòng non bò 150g"),
      }),
    ],
  },
  {
    id: "drink",
    name: T("주류", "Drinks", "酒水", "お酒", "Đồ uống"),
    items: [
      it(140000, null, "소주", "Soju", "烧酒", "ソジュ（焼酎）", "Soju"),
      it(50000, null, "맥주", "Beer", "啤酒", "ビール", "Bia"),
      it(65000, null, "생맥주 SAPORO", "Draft beer SAPORO", "生啤 SAPORO", "生ビール SAPORO", "Bia tươi Saporo"),
    ],
  },
];
