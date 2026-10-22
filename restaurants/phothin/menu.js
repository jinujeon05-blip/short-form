// 퍼틴 PHỞ THÌN 미딩 직영점 (13 Lò Đúc 브랜드 · Lô 5, TT1 Đình Thôn, Mỹ Đình, Từ Liêm, Hà Nội) 메뉴 데이터
// ※ 정식(사장님 의뢰·동의) 메뉴판: 장바구니 · Zalo 주문서 · QR 카드 포함.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격 / sizes: [[{ko,en,…}, 가격], …] / unit / tag: "best"·"special"·"new" / spicy: true / desc / photo
// 원본: 구글 드라이브 "퍼틴 pho thin" 폴더의 구글 지도 캡처 29장(가게 계정·손님이 올린 메뉴판 여러 시기, 음식·간판 사진, 지도 정보).
// 메뉴판이 시기마다 가격이 달라 가장 최근 판(쌀국수 80K대·곁들임 55K 넴·음료 코카 25K)을 썼고, 안주류는 1년 전 스티커 가격판 기준.
// 한국어·영어·중국어 이름은 메뉴판 표기, 일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "퍼틴", en: "PHỞ THÌN", branch: { ko: "미딩 직영점", en: "Mỹ Đình" } },
  phone: "0355 677 566",
  address: "Lô 5, TT1 Đình Thôn, Mỹ Đình, Từ Liêm, Hà Nội",
  mapQuery: "Phở Thìn Đình Thôn 13 Lò Đúc",
  wifi: null, // 예: { ssid: "PHOTHIN", password: "12345678" }
};

// 장바구니·주문서 (_shared/order.js). staff = 주문서 언어(직원이 읽는 언어), zalo = 주문 받을 Zalo 번호
window.ORDER = { staff: "vi", currency: "₫", zalo: "0355677566" }; // 가게 전화번호를 Zalo로 씀 (사장님 확인 필요)

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, photo: `img/${photo}.jpg`, name: { ko, en, zh, ja, vi }, ...x });
const sz = (pairs, photo, ko, en, zh, ja, vi, x = {}) => ({ sizes: pairs, photo: `img/${photo}.jpg`, name: { ko, en, zh, ja, vi }, ...x });
const BIG = T("대", "Large", "大", "大", "Lớn");
const SMALL = T("소", "Small", "小", "小", "Nhỏ");

window.MENU = [
  {
    id: "special",
    name: T("시그니처 쌀국수", "Signature phở", "招牌河粉", "名物フォー", "Phở đặc trưng"),
    note: T("포장은 1인분당 10,000₫가 추가돼요", "Take-out costs 10,000₫ extra per portion", "外带每份另加 10,000₫", "お持ち帰りは1人前につき10,000₫追加", "Mang về tính thêm 10.000₫ mỗi phần"),
    items: [
      it(150000, "suon", "왕갈비 쌀국수", "Short rib beef phở", "牛排河粉", "牛スペアリブのフォー", "Phở sườn", { tag: "best", desc: T("큼직한 소갈비를 얹은 쌀국수", "Phở topped with a big piece of beef short rib", "配大块牛排骨的河粉", "大きな牛スペアリブをのせたフォー", "Phở với miếng sườn bò lớn") }),
      it(170000, "suoncay", "매운 갈비 쌀국수", "Spicy short rib phở", "辣排骨河粉", "辛口スペアリブのフォー", "Phở sườn cay", { tag: "new", spicy: true, desc: T("신메뉴 · 매콤한 양념 소갈비를 얹은 쌀국수", "New · phở with spicy-glazed beef short rib", "新品 · 配香辣酱牛排骨的河粉", "新メニュー・ピリ辛味付けのスペアリブをのせたフォー", "Món mới · phở với sườn bò sốt cay") }),
      it(130000, "long", "곱창 쌀국수", "Beef phở with offal", "牛杂河粉", "牛ホルモンのフォー", "Phở lòng bò", { spicy: true, desc: T("소 곱창을 듬뿍 넣은 쌀국수", "Phở with plenty of beef offal", "加入大量牛杂的河粉", "牛ホルモンをたっぷり入れたフォー", "Phở với nhiều lòng bò") }),
      it(100000, "dacbiet", "스페셜 쌀국수", "Special combination phở", "特别河粉", "スペシャルフォー（全部のせ）", "Phở Thìn đặc biệt", { tag: "special", desc: T("여러 부위를 한 그릇에 담은 퍼틴 스페셜", "Phở Thìn's special with several cuts in one bowl", "一碗集合多种部位的 Phở Thìn 特别版", "いろいろな部位を一杯に盛ったフォー・ティンのスペシャル", "Phở Thìn đặc biệt gồm nhiều loại thịt trong một tô") }),
      it(100000, "bapbo", "사태 쌀국수", "Fillet beef phở", "牛肩肉河粉", "牛すね肉のフォー", "Bắp bò"),
      it(90000, "tangan", "도가니 쌀국수", "Beef tendon phở", "牛膝骨河粉", "牛すじ（腱）のフォー", "Tái gân"),
      it(90000, "sotvang", "황금소스 쌀국수", "Red wine beef stew phở", "红酒酱河粉", "赤ワインビーフシチューのフォー", "Sốt vang"),
    ],
  },
  {
    id: "classic",
    name: T("전통 쌀국수", "Classic phở", "传统河粉", "定番フォー", "Phở truyền thống"),
    note: T("소고기 부위와 익힘 정도를 골라요", "Choose your cut of beef and how well done", "可选择牛肉部位与熟度", "牛肉の部位と火の通し加減をお選びください", "Chọn phần thịt bò và độ chín"),
    items: [
      it(80000, "lan", "전통 쌀국수", "Traditional stir-fried beef phở", "传统河粉", "伝統フォー（炒め牛肉）", "Tái lăn truyền thống", { tag: "best" }),
      it(80000, "chan", "설익은 쌀국수", "Rare beef phở", "生肉河粉", "レアビーフのフォー", "Tái chần"),
      it(80000, "chin", "반익힘 쌀국수", "Medium rare beef phở", "半熟肉河粉", "ミディアムレアのフォー", "Tái chín"),
      it(80000, "phochin", "익힘 쌀국수", "Well done beef phở", "全熟肉河粉", "ウェルダンのフォー", "Phở chín"),
      it(80000, "nam", "업진살 쌀국수", "Flank beef phở", "后胸肉河粉", "牛バラ（ネーム）のフォー", "Tái nạm"),
      it(80000, "namgau", "차돌박이 쌀국수", "Brisket with flank beef phở", "牛胸腩河粉", "牛ブリスケットとバラのフォー", "Nạm gầu"),
      it(80000, "gau", "양지 쌀국수", "Brisket beef phở", "胸肉河粉", "牛ブリスケットのフォー", "Tái gầu"),
    ],
  },
  {
    id: "mix",
    name: T("비빔 · 볶음 · 밥", "Mixed, stir-fried & rice", "拌粉 · 炒粉 · 炒饭", "混ぜ・炒め・ごはん", "Trộn · Xào · Cơm"),
    items: [
      it(90000, "tron", "비빔 쌀국수", "Mixed beef phở (dry noodles)", "牛肉拌河粉", "混ぜフォー（ビビム）", "Phở trộn bò", { desc: T("국물 없이 비벼 먹는 쌀국수", "Dry phở tossed with beef and herbs", "不带汤、拌着吃的河粉", "スープなしで混ぜて食べるフォー", "Phở trộn không nước") }),
      it(90000, "xao", "볶음 쌀국수", "Stir-fried phở with beef & cabbage", "牛肉炒河粉", "牛肉と白菜の焼きフォー", "Phở xào bò cải thảo"),
      it(90000, "comrang", "볶음밥", "Fried rice with beef & cabbage", "牛肉炒饭", "牛肉と白菜のチャーハン", "Cơm rang bò cải thảo"),
    ],
  },
  {
    id: "side",
    name: T("곁들임 메뉴", "Side dishes", "小菜 · 配菜", "サイドメニュー", "Món phụ"),
    items: [
      it(55000, "nem", "넴 (스프링롤)", "Spring rolls (nem)", "春卷", "揚げ春巻き（ネム）", "Nem"),
      it(70000, "phocuon", "퍼꾸온", "Phở rolls", "蒸越南春卷", "フォークオン（米粉ロール）", "Phở cuốn"),
      it(150000, "xeotom", "새우 부추전", "Shrimp & chive pancake", "虾韭菜煎饼", "海老ニラのチヂミ", "Bánh xèo hẹ tôm"),
      it(120000, "xeohanh", "양파전", "Green onion pancakes", "葱饼", "ねぎのチヂミ", "Bánh xèo hành"),
      it(120000, "trungthit", "고기전", "Fried egg with meat", "肉煎饼", "肉入り卵焼き", "Bánh trứng thịt chiên"),
    ],
  },
  {
    id: "extra",
    name: T("추가 · 반찬", "Extras", "加料 · 配菜", "追加・副菜", "Món thêm"),
    items: [
      it(5000, "quay", "꾸어이 (튀김빵)", "Vietnamese doughnut (quẩy)", "越南油条", "ベトナム揚げパン（クァイ）", "Quẩy", { desc: T("쌀국수 국물에 찍어 먹는 튀김빵", "Fried dough to dip in your broth", "可蘸汤汁吃的油条", "スープにつけて食べる揚げパン", "Bánh quẩy chấm nước phở") }),
      it(10000, "kimchi", "김치", "Kimchi", "韩国泡菜", "キムチ", "Kimchi"),
      it(10000, "trungchan", "수란", "Poached egg", "半熟蛋", "ポーチドエッグ", "Trứng chần"),
      it(55000, "themthit", "고기 추가", "Extra meat", "加肉", "お肉追加", "Thêm thịt"),
      it(20000, "thempho", "면 추가", "Extra phở noodles", "加米粉", "麺追加", "Thêm phở"),
      it(20000, "themcom", "공기밥", "Extra rice", "米饭", "ごはん（追加）", "Thêm cơm"),
    ],
  },
  {
    id: "drink",
    name: T("음료 · 주류", "Drinks", "饮料 · 酒类", "ドリンク・お酒", "Đồ uống"),
    items: [
      it(5000, "trada", "녹차 (냉/온)", "Tea (cold / hot)", "冷茶 / 热茶", "お茶（冷／温）", "Trà đá / nóng"),
      it(10000, "nuoc", "물", "Water", "矿泉水", "お水", "Nước"),
      it(25000, "coca", "콜라 · 사이다", "Coca-Cola / Sprite", "可口可乐 / 雪碧", "コーラ／スプライト", "Coca / Sprite"),
      it(55000, "beer", "맥주", "Beer", "啤酒", "ビール", "Bia"),
      it(150000, "soju", "소주", "Soju", "韩国烧酒", "韓国焼酎", "Rượu soju"),
      it(170000, "rugao", "막걸리", "Makgeolli (rice wine)", "韩国米酒", "マッコリ", "Rượu gạo"),
      it(170000, "vodka", "보드카 맨", "Men vodka", "Men 伏特加", "ウォッカ・メン", "Rượu vodka Men"),
    ],
  },
];
