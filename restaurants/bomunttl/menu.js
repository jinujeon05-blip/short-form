// 보문뜰 BOMUNTTL (간판 NHÀ HÀNG NƯỚNG HÀN QUỐC · 30 Đ. Ng Tất Tố, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "보문뜰" 폴더의 구글 지도 캡처 21장(가게 인쇄 메뉴책 사진 — 돼지고기·소고기 양념/원미·세트·석쇠구이·전골·면·밥·단품·주류 — 같은 쪽을 찍은 사진이 여러 장, 가게 앞 사진, 지도 정보, 가게 홈페이지 bomunttl.com).
// 메뉴책에 한국어·베트남어·중국어가 있어 한·베·중은 메뉴책 표기를 따르되(명백한 오기·부위 이름은 바로잡음), 영어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "보문뜰", en: "BOMUNTTL", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0852 884 900",
  address: "30 Đ. Ng Tất Tố, Võ Cường, Bắc Ninh",
  mapQuery: "보문뜰 BOMUNTTL 30 Ng Tất Tố Võ Cường Bắc Ninh",
  wifi: null, // 예: { ssid: "BOMUNTTL", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const G = (n) => T(`${n}g`, `${n}g`, `${n}克`, `${n}g`, `${n}g`);
const PLUS = (a, b) => T(`고기 추가 ${a}₫` + (b ? ` · 야채 추가 ${b}₫` : ""), `Extra meat ${a}₫` + (b ? ` · extra vegetables ${b}₫` : ""), `加肉 ${a}₫` + (b ? ` · 加蔬菜 ${b}₫` : ""), `肉の追加 ${a}₫` + (b ? ` · 野菜の追加 ${b}₫` : ""), `Thêm thịt ${a}₫` + (b ? ` · Thêm rau ${b}₫` : ""));

// 소고기 부위(양념·원미 공통, 메뉴책 표기)
const BEEF = {
  kkotgalbi: ["꽃갈비살", "Flower short rib (kkot-galbisal)", "牛肋肉", "コッカルビサル（花カルビ）", "Nạc sườn bò hoa"],
  anchang: ["안창살", "Skirt steak (anchangsal)", "牛横膈膜肉", "ハラミ（アンチャンサル）", "Diềm thăn bò"],
  galbisal: ["갈비살", "Boneless short rib (galbisal)", "牛肋眼", "カルビサル", "Thăn sườn bò"],
  buchae: ["부채살", "Top blade (buchaesal)", "牛肩芯", "ミスジ（ブチェサル）", "Lõi vai bò"],
  usam: ["우삼겹", "Beef belly (usamgyeop)", "牛五花肉", "ウサムギョプ（牛バラ）", "Ba chỉ bò"],
  gopchang: ["곱창", "Beef small intestine (gopchang)", "牛小肠", "牛コプチャン（小腸）", "Lòng non"],
  deungsim: ["꽃등심", "Marbled ribeye (kkot-deungsim)", "牛后腰肉", "コットゥンシム（霜降りリブロース）", "Nạc lưng bò"],
};
const beef = (price, key, g = 150, x = {}) => it(price, null, ...BEEF[key], { unit: G(g), ...x });

window.MENU = [
  {
    id: "pork",
    name: T("돼지고기", "Pork", "猪肉", "豚肉", "Thịt heo"),
    items: [
      it(350000, null, "돼지갈비 (양념)", "Marinated pork ribs", "香烤猪排骨", "味付け豚カルビ", "Sườn heo tẩm gia vị", { unit: G(300) }),
      it(230000, null, "항정살", "Pork jowl (hangjeongsal)", "猪颊肉", "豚トロ（ハンジョンサル）", "Thịt má heo thái lát nguyên vị", { unit: G(180) }),
      it(230000, null, "양념 항정살", "Marinated pork jowl", "调味猪颊肉", "味付け豚トロ（ハンジョンサル）", "Thịt má heo thái lát tẩm gia vị", { unit: G(180) }),
      it(210000, null, "삼겹살", "Thick-cut pork belly (samgyeopsal)", "五花肉", "厚切りサムギョプサル", "Ba chỉ heo cắt dày", { unit: G(180) }),
      it(210000, null, "대패삼겹살", "Thin-sliced pork belly (daepae)", "原味五花猪肉片", "薄切りサムギョプサル（テペ）", "Ba chỉ heo thái lát nguyên vị", { unit: G(180) }),
      it(210000, null, "양념 대패삼겹살", "Marinated thin-sliced pork belly", "调味五花猪肉片", "味付け薄切りサムギョプサル", "Ba chỉ heo thái lát tẩm gia vị", { unit: G(180) }),
      it(180000, null, "막창", "Pork makchang (large intestine)", "扣猪尾", "豚マクチャン（大腸）", "Khấu đuôi lợn", { unit: G(180) }),
    ],
  },
  {
    id: "beefm",
    name: T("소고기 양념", "Marinated beef", "调味牛肉", "味付け牛肉", "Thịt bò tẩm gia vị"),
    items: [
      beef(570000, "kkotgalbi"),
      beef(380000, "anchang"),
      beef(250000, "galbisal"),
      beef(250000, "buchae"),
      beef(210000, "usam"),
      beef(210000, "gopchang", 180),
    ],
  },
  {
    id: "beef",
    name: T("소고기 구이 (원미)", "Beef, plain", "原味牛肉", "牛肉（味付けなし）", "Thịt bò nguyên vị"),
    items: [
      beef(570000, "kkotgalbi"),
      beef(470000, "deungsim"),
      beef(250000, "buchae"),
      beef(250000, "galbisal"),
      beef(210000, "usam"),
      beef(210000, "gopchang", 180),
    ],
  },
  {
    id: "set",
    name: T("세트", "Sets", "套餐", "セット", "Set"),
    items: [
      it(600000, "setpork", "돼지고기 구이 세트", "Pork BBQ set", "猪肉套餐", "豚肉焼きセット", "Set thịt heo", { desc: T("삼겹살 + 대패삼겹살 + 항정살", "Thick-cut pork belly + thin-sliced pork belly + pork jowl", "五花肉 + 五花肉片 + 猪颊肉", "サムギョプサル + 薄切りサムギョプサル + ハンジョンサル", "Ba chỉ lợn cắt dày + Ba chỉ lát mỏng + má heo") }),
      it(800000, "setbeefm", "소고기 양념 세트", "Marinated beef set", "调味牛肉套餐", "味付け牛肉セット", "Set thịt bò tẩm vị", { desc: T("갈비살 + 우삼겹 + 안창살 + 부채살", "Boneless short rib + beef belly + skirt steak + top blade", "牛肋眼 + 牛五花肉 + 牛横膈膜肉 + 牛肩芯", "カルビサル + ウサムギョプ + ハラミ + ミスジ", "Thăn sườn bò + Ba chỉ bò + Diềm thăn bò + Lõi vai bò") }),
      it(900000, "setbeef", "소고기 구이 세트 (원미)", "Plain beef BBQ set", "原味牛肉套餐", "牛肉焼きセット（味付けなし）", "Set thịt bò nguyên vị", { desc: T("갈비살 + 우삼겹 + 꽃등심 + 부채살", "Boneless short rib + beef belly + marbled ribeye + top blade", "牛肋眼 + 牛五花肉 + 牛后腰肉 + 牛肩芯", "カルビサル + ウサムギョプ + コットゥンシム + ミスジ", "Thăn sườn bò + Ba chỉ bò + Nạc lưng bò + Lõi vai bò") }),
    ],
  },
  {
    id: "grill",
    name: T("석쇠구이", "Wire-rack grill", "熟烤肉", "網焼き", "Thịt nướng sẵn"),
    items: [
      it(420000, "bulgogi", "언양식 석쇠 불고기 (소고기)", "Eonyang-style beef bulgogi on a wire rack", "韩式烤架牛肉 (Bulgogi)", "彦陽式 牛プルコギ（網焼き）", "Bò Bulgogi nướng vỉ", { unit: G(300) }),
      it(380000, "bulgogi", "돼지 간장 석쇠 불고기", "Soy-marinated pork bulgogi on a wire rack", "酱油烤架猪肉", "醤油味 豚プルコギ（網焼き）", "Heo sốt xì dầu nướng vỉ", { unit: G(300) }),
      it(380000, "bulgogi", "돼지 고추장 석쇠 불고기", "Gochujang pork bulgogi on a wire rack", "辣酱烤架猪肉", "コチュジャン味 豚プルコギ（網焼き）", "Heo sốt cay nướng vỉ", { unit: G(300), spicy: true }),
    ],
  },
  {
    id: "stew",
    name: T("전골 · 찜 · 탕", "Hot pots & stews", "火锅 · 炖汤", "鍋・蒸し煮・スープ", "Lẩu · Hầm · Canh"),
    note: T("2~3인분 기준이에요.", "Each pot serves 2–3 people.", "每份适合2-3人食用。", "1つで2〜3人前です。", "Mỗi phần dành cho 2–3 người ăn."),
    items: [
      it(600000, null, "곱창 전골", "Beef offal hot pot (gopchang jeongol)", "韩式牛杂汤", "コプチャンチョンゴル（ホルモン鍋）", "Canh lòng bò"),
      it(550000, null, "불고기 전골", "Korean bulgogi hot pot", "韩式 Bulgogi 牛肉火锅", "プルコギ鍋", "Lẩu thịt bò Bulgogi Hàn Quốc", { desc: PLUS("250,000") }),
      it(520000, null, "등갈비 김치찜", "Braised pork ribs with kimchi", "韩式泡菜炖猪排骨", "豚スペアリブのキムチ蒸し煮", "Sườn heo hầm kim chi"),
      it(500000, null, "소고기 샤브샤브", "Beef shabu-shabu hot pot", "牛肉火锅", "牛肉しゃぶしゃぶ", "Lẩu thịt bò", { desc: PLUS("250,000", "50,000") }),
      it(300000, null, "오뎅나베 (어묵 전골)", "Korean fish cake hot pot", "韩国鱼丸火锅", "おでん鍋", "Lẩu cá viên Hàn Quốc"),
      it(30000, null, "사리 추가 (라면 · 우동 · 당면)", "Add noodles (ramen, udon or glass noodles)", "加面（方便面/乌冬面）", "麺の追加（ラーメン・うどん・春雨）", "Thêm mì (mì tôm, mì udong, miến)"),
    ],
  },
  {
    id: "noodle",
    name: T("면", "Noodles", "面", "麺", "Mì"),
    items: [
      it(150000, null, "칼국수", "Kalguksu (knife-cut noodle soup)", "韩式刀切面", "カルグクス", "Mì Kalguksu"),
      it(150000, null, "유부쫄면", "Yubu-jjolmyeon (chewy noodles with fried tofu)", "韩式炸豆腐面", "ユブチョルミョン（油揚げ入りもちもち麺）", "Mì đậu phụ chiên kiểu Hàn"),
      it(150000, "naengmyeon", "냉면", "Cold buckwheat noodles (naengmyeon)", "韩式冷面", "冷麺", "Mì lạnh"),
      it(150000, null, "비빔냉면", "Spicy mixed cold noodles (bibim-naengmyeon)", "韩式辣酱拌冷面", "ビビン冷麺", "Mì lạnh trộn sốt cay", { tag: "must", spicy: true }),
      it(80000, null, "라면", "Instant ramen", "方便面", "ラーメン", "Mì tôm"),
    ],
  },
  {
    id: "rice",
    name: T("밥 종류", "Rice meals", "套餐饭", "ご飯もの", "Cơm"),
    items: [
      it(250000, "galbitang", "갈비탕 정식", "Beef short rib soup with rice", "牛排骨汤饭", "カルビタン定食", "Cơm canh sườn bò"),
      it(230000, null, "불고기 정식", "Beef bulgogi set meal", "炒牛肉饭", "プルコギ定食", "Cơm thịt bò xào"),
      it(220000, null, "돼지 두루치기 정식", "Spicy stir-fried pork set meal (duruchigi)", "辣炒猪肉饭", "豚トゥルチギ定食", "Cơm thịt heo xào cay", { spicy: true }),
      it(190000, "bibimbap", "돌솥 비빔밥", "Stone-pot bibimbap with beef", "牛肉拌饭", "石焼ビビンバ（牛肉）", "Cơm trộn thịt bò bát đá"),
      it(180000, null, "육개장 정식", "Spicy shredded beef soup with rice (yukgaejang)", "香辣牛肉汤", "ユッケジャン定食", "Canh thịt bò xé cay", { spicy: true }),
    ],
  },
  {
    id: "side",
    name: T("단품 · 안주", "Dishes & sides", "小菜", "一品料理", "Ăn chơi"),
    items: [
      it(200000, null, "파전", "Scallion pancake (pajeon)", "葱香煎饼", "ネギチヂミ（パジョン）", "Bánh xèo hành lá"),
      it(200000, null, "오징어 무침", "Spicy squid salad", "香辣拌鱿鱼", "イカの和え物（辛口）", "Gỏi mực trộn cay", { spicy: true }),
      it(150000, null, "김치찌개", "Kimchi stew", "韩式泡菜汤", "キムチチゲ", "Canh kim chi"),
      it(150000, null, "된장찌개", "Soybean paste stew", "韩式大酱汤", "テンジャンチゲ", "Canh đậu tương"),
      it(150000, null, "김치볶음밥", "Kimchi fried rice", "韩式泡菜拌饭", "キムチチャーハン", "Cơm rang kim chi"),
      it(100000, null, "계란볶음밥", "Egg fried rice", "鸡蛋炒饭", "卵チャーハン", "Cơm rang trứng"),
      it(100000, null, "떡볶이", "Spicy stir-fried rice cakes (tteokbokki)", "香辣炒年糕", "トッポッキ", "Bánh gạo sốt cay", { spicy: true }),
      it(60000, null, "계란찜", "Steamed egg (gyeran-jjim)", "韩式蒸蛋", "韓国風茶碗蒸し（ケランチム）", "Trứng hấp"),
      it(20000, null, "공깃밥", "Steamed rice", "米饭", "白ご飯", "Cơm trắng"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒水 · 饮料", "お酒・ドリンク", "Rượu · Nước ngọt"),
    items: [
      it(160000, null, "막걸리", "Makgeolli (Korean rice wine)", "韩式米酒", "マッコリ", "Rượu gạo"),
      it(120000, null, "소주", "Soju", "韩国烧酒", "焼酎（ソジュ）", "Rượu soju"),
      it(55000, null, "맥주 (타이거)", "Tiger beer", "老虎啤酒", "タイガービール", "Bia Tiger"),
      it(35000, null, "아침 햇살 (쌀 음료)", "Rice drink (Achim Haetsal)", "韩式米水", "米ドリンク（アチムヘッサル）", "Nước gạo"),
      it(20000, null, "음료수 (콜라 · 오렌지주스 · 펩시)", "Soft drinks (Coca, orange juice, Pepsi)", "汽水（可乐、橙汁、百事可乐）", "ソフトドリンク（コーラ・オレンジジュース・ペプシ）", "Nước ngọt (coca, nước cam, pepsi)"),
    ],
  },
];
