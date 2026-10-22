// 장수천 민물장어 Jang su cheon (간판 NHÀ HÀNG LƯƠN NƯỚNG HÀN QUỐC 장수천 민물장어 · 22 P Bùi Thị Xuân, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "장수천 민물장어" 폴더의 구글 지도 캡처 10장(가게 계정이 올린 메뉴판 4면: 소고기·주류·식사류·한방 민물장어, 간판·장어 구이 손님 사진, 지도 정보).
// 메뉴판에 한·영·중·베트남어(일부)가 있어 한·베·영은 메뉴판 표기를 따르고, 없는 언어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "장수천 민물장어", en: "Jang su cheon", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0777 386 760",
  address: "22 P. Bùi Thị Xuân, Võ Cường, Bắc Ninh",
  mapQuery: "장수천 민물장어 Jang su cheon 22 Bùi Thị Xuân Bắc Ninh",
  wifi: null, // 예: { ssid: "JSC", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const G = (n) => T(`${n}g`, `${n}g`, `${n}克`, `${n}g`, `${n}g`);
const ML = (n) => T(`${n}ml`, `${n}ml`, `${n}毫升`, `${n}ml`, `${n}ml`);
// 상표 이름: 한국어 + 알파벳 표기(영·중·일·베 공통)
const B = (price, ko, latin, x = {}) => it(price, null, ko, latin, latin, latin, latin, x);

const VAT = T(
  "아래 가격은 부가세(VAT) 10% 별도예요.",
  "Prices below do not include 10% VAT.",
  "以下价格不含10%增值税。",
  "以下の価格は付加価値税（VAT）10%別です。",
  "Giá dưới đây chưa bao gồm 10% VAT."
);

window.MENU = [
  {
    id: "eel",
    name: T("민물장어", "Freshwater eel", "淡水鳗鱼", "淡水うなぎ", "Cá chình"),
    note: T(
      "무항생제 · 해양수산부 HACCP 인증 · 장수천 직영 양식장에서 직접 키운 장어예요.",
      "Antibiotic-free and HACCP certified, raised on the shop's own farm.",
      "无抗生素、通过HACCP认证，由店家直营养殖场亲自养殖的鳗鱼。",
      "無抗生物質・HACCP認証。直営の養殖場で育てたうなぎです。",
      "Không kháng sinh, đạt chứng nhận HACCP, nuôi tại trang trại riêng của quán."
    ),
    items: [
      it(650000, "eel", "한방 민물장어 (한국산)", "Korean freshwater eel (Hanbang)", "烤淡水鳗鱼（韩国产）", "韓国産 淡水うなぎ焼き", "Cá chình Hàn Quốc", { unit: G(250) }),
    ],
  },
  {
    id: "beef",
    name: T("소고기", "Beef", "牛肉", "牛肉", "Thịt bò"),
    note: VAT,
    items: [
      it(600000, "sogalbi", "소생갈비", "Beef ribs", "生鲜牛排骨", "生ソカルビ（牛の骨付きカルビ）", "Sườn bò tươi", { unit: G(250) }),
      it(350000, "galbisal", "생갈비살 (늑간살)", "Rib finger meat", "生鲜牛排骨肉（牛肋条）", "センカルビサル（肋骨まわりの肉）", "Thịt dẻ sườn bò tươi", { unit: G(150) }),
      it(750000, "kkotsal", "꽃살", "Beef chuck flap (kkot-sal)", "雪花肉", "コッサル（霜降り）", "Sườn bò rút xương", { unit: G(150) }),
      it(650000, "kkotdeungsim", "꽃등심", "Marbled ribeye (kkot-deungsim)", "霜降里脊肉", "コットゥンシム（霜降りリブロース）", "Thịt lườn bò", { unit: G(150) }),
      it(400000, "yukhoe", "육회", "Korean-style raw beef (yukhoe)", "生拌牛肉", "ユッケ（牛生肉）", "Gỏi bò", { unit: G(200) }),
    ],
  },
  {
    id: "meal",
    name: T("식사류", "Meals", "饭 · 汤", "食事", "Cơm & canh"),
    note: T(
      "사진은 실제와 조금 다를 수 있어요.",
      "Photos may differ slightly from the actual dishes.",
      "图片与实物可能略有不同。",
      "写真は実物と多少異なる場合があります。",
      "Hình ảnh có thể khác so với thực tế một chút."
    ),
    items: [
      it(200000, "jangeotang", "장어탕 + 가마솥밥", "Eel soup + cauldron rice", "鳗鱼汤 + 铁锅饭", "うなぎスープ + 釜飯", "Canh cá chình + Cơm niêu"),
      it(200000, "kkorigomtang", "꼬리곰탕 + 가마솥밥", "Oxtail soup + cauldron rice", "牛尾汤 + 铁锅饭", "テールスープ + 釜飯", "Canh đuôi bò + Cơm niêu"),
      it(200000, "doganitang", "도가니탕 + 가마솥밥", "Beef knee soup + cauldron rice", "牛膝骨汤 + 铁锅饭", "牛の膝軟骨スープ + 釜飯", "Canh gân bò + Cơm niêu"),
      it(160000, "sundubu", "소고기 순두부 + 가마솥밥", "Spicy beef & soft tofu soup + cauldron rice", "牛肉嫩豆腐汤 + 铁锅饭", "牛肉スンドゥブ + 釜飯", "Canh đậu phụ non thịt bò + Cơm niêu", { spicy: true }),
      it(160000, "naengi", "냉이 된장찌개 + 가마솥밥", "Shepherd's purse soybean stew + cauldron rice", "荠菜大酱汤 + 铁锅饭", "ナズナのテンジャンチゲ + 釜飯", "Canh cải ngựa + Cơm niêu"),
      it(60000, "gamasotbap", "가마솥밥 + 작은 된장찌개", "Cauldron rice + small shepherd's purse stew", "铁锅饭 + 小份荠菜大酱汤", "釜飯 + 小ナズナテンジャンチゲ", "Cơm niêu + Canh cải ngựa nhỏ"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒水 · 饮料", "お酒・ドリンク", "Đồ uống"),
    note: VAT,
    items: [
      B(140000, "참이슬", "Chamisul"),
      B(140000, "진로이즈백", "Jinro Is Back"),
      B(130000, "처음처럼", "Chum-churum"),
      B(120000, "좋은데이", "Good Day"),
      it(55000, null, "칼스버그 생맥주", "Draft beer Carlsberg", "卡尔斯伯格生啤", "カールスバーグ 生ビール", "Bia tươi Carlsberg", { unit: ML(330) }),
      it(50000, null, "타이거 병맥주", "Tiger beer (bottle)", "虎牌瓶装啤酒", "タイガー 瓶ビール", "Bia chai Tiger", { unit: ML(330) }),
      it(null, null, "보드카", "Vodka", "伏特加", "ウォッカ", "Vodka", { sizes: [[ML(300), 100000], [ML(500), 150000]] }),
      B(270000, "백세주", "BaekSeJu"),
      it(270000, null, "복분자", "Bokbunja (Korean black raspberry wine)", "覆盆子酒", "覆盆子酒（ポクブンジャ）", "Rượu phúc bồn tử Bokbunja"),
      it(170000, null, "생막걸리", "Fresh makgeolli", "生米酒（马格利）", "生マッコリ", "Makgeolli tươi"),
      it(30000, null, "칠성사이다", "Chilsung Cider", "七星汽水", "七星サイダー", "Chilsung Cider"),
      it(20000, null, "콜라 · 스프라이트 · 환타", "Coca-Cola / Sprite / Fanta", "可乐 · 雪碧 · 芬达", "コーラ・スプライト・ファンタ", "Coca / Sprite / Fanta"),
    ],
  },
];
