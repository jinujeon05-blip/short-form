// 마당 돌판구이 MADANG (Song Da Building CT5, Mễ Trì, Từ Liêm, Hà Nội) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND (부가세 별도 — 메뉴판 표기)
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "마당 돌판구이" 폴더의 구글 지도 캡처 21장(가게 계정 Madang이 3주~2개월 전 올린 메뉴판 페이지 18장, 간판·지도 정보).
// 메뉴판에 한국어·베트남어(일부 영어)가 있어 한·베는 그대로, 영·중·일 번역.
window.RESTAURANT = {
  brand: { ko: "마당 돌판구이", en: "Madang", branch: { ko: "미딩", en: "Mễ Trì" } },
  phone: "0793 021 234",
  address: "Song Da Building CT5, Mễ Trì, Từ Liêm, Hà Nội",
  mapQuery: "마당 돌판구이 Madang Song Da Building CT5 Mễ Trì Từ Liêm Hà Nội",
  wifi: null, // 예: { ssid: "MADANG", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const G = (n) => T(`${n}g`, `${n}g`, `${n}克`, `${n}g`, `${n}g`);
const G1 = (n) => T(`${n}g · 1인`, `${n}g · 1 person`, `${n}克 · 1人份`, `${n}g · 1人前`, `${n}g · 1 người`);
const FREE = T(
  "고기를 드시는 모든 테이블에 황제 조개전골을 무한으로 드려요.",
  "Every table ordering meat gets unlimited emperor clam hot pot.",
  "点烤肉的每桌都免费无限享用皇帝蛤蜊火锅。",
  "お肉をご注文の全テーブルに、皇帝あさり鍋を食べ放題でご提供します。",
  "Mọi bàn gọi món thịt đều được ăn lẩu hải sản Hoàng Đế không giới hạn."
);

window.MENU = [
  {
    id: "set",
    name: T("세트 · 모듬", "Sets", "套餐", "セット", "Set"),
    note: FREE,
    items: [
      it(1990000, "bestset", "베스트 프리미엄 세트", "Best premium set (large groups)", "招牌高级套餐（多人）", "ベストプレミアムセット（大人数）", "Set premium best (đông người)", { unit: T("1kg · 5~6인", "1 kg · 5–6 people", "1公斤 · 5~6人", "1kg · 5〜6名", "1kg · 5~6 người"), desc: T("교차 숙성 삼겹살 + 교차 숙성 목살 + 냉동 삼겹살 + 눈꽃 안창살 + 프라임 생갈비 + 고소한 차돌배기 + 태극전 + 육회", "Aged pork belly + aged pork shoulder + frozen pork belly + snowflake skirt steak + prime ribs + beef brisket + taegeuk-jeon + yukhoe", "熟成五花肉 + 熟成猪梅花肉 + 冷冻五花肉 + 雪花牛横膈膜 + 特级牛排骨 + 牛腩片 + 太极煎饼 + 生拌牛肉", "熟成サムギョプサル + 熟成豚肩ロース + 冷凍サムギョプサル + 雪花ハラミ + プライム生カルビ + 牛バラ薄切り + 太極チヂミ + ユッケ", "Ba chỉ ủ + nạc vai ủ + ba chỉ đông lạnh + thịt diềm bò + sườn bò prime + gầu bò + bánh thái cực + gỏi bò"), tag: "best" }),
      it(null, "pigintestine", "돼지막창 실속 세트", "Pork intestine value set", "猪肠实惠套餐", "豚マクチャン お得セット", "Set lòng heo nướng tiết kiệm", { sizes: [[T("2~3인 (300g)", "2–3 people (300g)", "2~3人（300克）", "2〜3名（300g）", "2~3 người (300g)"), 1290000], [T("4~5인 (600g)", "4–5 people (600g)", "4~5人（600克）", "4〜5名（600g）", "4~5 người (600g)"), 1790000]], desc: T("숙성 삼겹살 + 숙성 목살 + 돼지막창(2인) + 술국 + 구워먹는 치즈 4~6개 + 마무리 볶음밥 1~2개 (한국 직송 막창)", "Aged pork belly + aged pork neck + pork intestine (2 servings) + intestine soup + grilled cheese 4–6 pcs + fried rice 1–2 servings (Korea direct import)", "熟成五花肉 + 熟成猪颈肉 + 猪肠（2人份）+ 醒酒汤 + 烤芝士4~6块 + 炒饭1~2份（韩国直送）", "熟成サムギョプサル + 熟成豚肩ロース + 豚マクチャン（2人前）+ スルグク + 焼きチーズ4〜6個 + 〆のチャーハン1〜2人前（韓国直送）", "Ba chỉ ủ + nạc vai ủ + lòng heo nướng (2 người) + canh nhậu + phô mai nướng 4~6 miếng + cơm rang 1~2 suất (nhập từ Hàn Quốc)") }),
      it(290000, "samgyeop", "교차 숙성 삼겹살 + 목살", "Aged pork belly + shoulder", "熟成五花肉 + 猪梅花肉", "熟成サムギョプサル＋豚肩ロース", "Ba chỉ + nạc vai heo ủ chín", { unit: G1(200), desc: T("22일 저온 교차 숙성", "Cross-aged for 22 days at low temperature", "低温交叉熟成22天", "22日間の低温クロス熟成", "Ủ kết hợp 22 ngày ở nhiệt độ thấp") }),
      it(360000, null, "추억의 돼지구이 (5종 모듬)", "Nostalgic pork grill (5 cuts)", "怀旧烤猪肉（5种拼盘）", "懐かしの豚焼き（5種盛り）", "Heo nướng hoài niệm (5 loại)", { unit: G1(200), desc: T("교차 숙성 삼겹살 + 목살 + 항정살 + 육즙 가브리살 + 껍데기", "Aged pork belly + shoulder + jowl + juicy gabeuri-sal + pork skin", "熟成五花肉 + 猪梅花肉 + 猪颈肉 + 多汁猪颈背肉 + 猪皮", "熟成サムギョプサル + 豚肩ロース + ハンジョンサル + ジューシーカブリ + 豚皮", "Ba chỉ + nạc vai + má heo + đệm thăn + da heo ủ chín") }),
      it(180000, null, "돌돌이 대패삼겹살 + 냉동삼겹살", "Rolled thin pork belly + frozen pork belly", "卷切五花肉 + 冷冻五花肉", "巻き薄切りサムギョプサル＋冷凍サムギョプサル", "Ba chỉ heo cuộn + ba chỉ đông lạnh", { unit: G1(150) }),
    ],
  },
  {
    id: "beef",
    name: T("프리미엄 소고기", "Premium beef", "优质牛肉", "プレミアム牛肉", "Thịt bò cao cấp"),
    note: T("앳에이징 프리미엄 저온 숙성(-1℃) 고기예요.", "Premium low-temperature aged beef (−1 °C).", "优质低温熟成牛肉（-1℃）。", "プレミアム低温熟成（-1℃）のお肉です。", "Thịt ủ lạnh premium ở nhiệt độ -1 độ C."),
    items: [
      it(890000, "wagyu", "와규 A5 프라임 등심", "Wagyu A5 prime sirloin", "和牛A5特级西冷", "和牛A5 プライムロース", "Thăn lưng bò Wagyu A5 prime", { unit: G(150), tag: "best" }),
      it(590000, "kkotsal", "프라임 꽃살", "Prime chuck flap (kkot-sal)", "特级牛花肉", "プライム コッサル", "Thịt thăn bò prime (kkot-sal)", { unit: G(200) }),
      it(550000, "anchang", "눈꽃 안창살", "Snowflake skirt steak (anchangsal)", "雪花牛横膈膜", "雪花ハラミ（アンチャンサル）", "Thịt diềm bò (anchang-sal)", { unit: G(200), tag: "best" }),
      it(490000, "saenggalbi", "프라임 생갈비", "Prime bone-in short rib", "特级带骨牛排骨", "プライム生カルビ", "Sườn bò có xương prime", { unit: G(200) }),
      it(490000, null, "프라임 양념생갈비", "Prime marinated bone-in short rib", "特级腌制带骨牛排骨", "プライム味付け生カルビ", "Sườn bò ướp có xương prime", { unit: G(180) }),
      it(230000, "chadol", "고소한 차돌배기", "Beef brisket (chadol-baegi)", "香嫩牛腩片", "香ばしい牛バラ（チャドルバギ）", "Thịt gầu bò (chadol)", { unit: G(150) }),
    ],
  },
  {
    id: "pork",
    name: T("돼지고기 단품", "Pork à la carte", "猪肉单点", "豚肉単品", "Thịt heo gọi lẻ"),
    note: FREE,
    items: [
      it(290000, "samgyeop", "교차 숙성 삼겹살", "Cross-aged pork belly", "交叉熟成五花肉", "クロス熟成サムギョプサル", "Ba chỉ heo ủ chín", { unit: G(200), tag: "best" }),
      it(290000, "moksal", "교차 숙성 목살", "Cross-aged pork shoulder", "交叉熟成猪梅花肉", "クロス熟成豚肩ロース", "Nạc vai heo ủ chín", { unit: G(200), tag: "best" }),
      it(320000, "gabeuri", "교차 숙성 가브리살", "Cross-aged pork gabeuri-sal", "交叉熟成猪颈背肉", "クロス熟成カブリ（豚肩ロース先）", "Thịt đệm thăn ủ mát", { unit: G(200) }),
      it(300000, "hangjeong", "교차 숙성 항정살", "Cross-aged pork jowl", "交叉熟成猪颈肉", "クロス熟成ハンジョンサル", "Thịt má heo ủ chín", { unit: G(200) }),
      it(180000, "daepae", "옛날식 대패삼겹살", "Old-style thin-sliced pork belly", "老式薄切五花肉", "昔ながらの薄切りサムギョプサル", "Ba chỉ heo cuộn kiểu xưa", { unit: G(150) }),
      it(180000, "frozen", "냉동 삼겹살", "Frozen pork belly", "冷冻五花肉", "冷凍サムギョプサル", "Ba chỉ heo đông lạnh", { unit: G(150) }),
      it(160000, "skin", "옛날식 돼지껍데기", "Old-style pork skin", "老式猪皮", "昔ながらの豚皮", "Da heo kiểu xưa", { unit: G(150) }),
    ],
  },
  {
    id: "special",
    name: T("특수 부위 · 구이", "Specialty cuts & grill", "特色部位 · 烧烤", "特殊部位・焼き物", "Món nướng đặc biệt"),
    note: T("정량의 90%를 미리 구워 내서 다른 메뉴보다 15분 이상 걸릴 수 있어요.", "Served 90% pre-grilled, so it can take 15+ minutes longer than other dishes.", "分量的90%预先烤制，可能比其他菜多花15分钟以上。", "分量の90%を先に焼いて提供するため、他のメニューより15分以上かかる場合があります。", "Món được nướng sẵn 90% trước khi mang ra nên có thể lâu hơn các món khác 15 phút."),
    items: [
      it(400000, "teukyang", "한국 직송 특양", "Korea-direct beef tripe (teugyang)", "韩国直送牛胃（特羊）", "韓国直送 テギャン（牛の胃）", "Dạ dày bò Hàn Quốc", { unit: G(160) }),
      it(300000, "makchang", "한국 바삭 돼지막창", "Korean crispy pork intestine", "韩国脆香猪大肠", "韓国産 カリカリ豚マクチャン", "Khấu đuôi lợn", { unit: G(160) }),
      it(290000, "scallop", "관자구이", "Grilled scallops", "烤扇贝柱", "ホタテ焼き", "Cồi sò điệp nướng", { unit: T("5개", "5 pcs", "5个", "5個", "5 cồi") }),
      it(490000, "abalone", "완도산 전복 버터구이", "Wando abalone butter-grilled", "莞岛鲍鱼黄油烧", "莞島産アワビのバター焼き", "Bào ngư Wando nướng bơ"),
      it(420000, "deodeok", "한국 직송 돌판 더덕구이", "Korea-direct deodeok on stone plate", "韩国直送石板烤沙参", "韓国直送 石板トドック焼き", "Rễ đẳng sâm (deodeok) nướng chảo đá"),
      it(490000, "cuttlefish", "갑오징어구이", "Grilled cuttlefish", "烤墨鱼", "コウイカ焼き", "Mực mai nướng"),
      it(890000, "eel_spicy", "돌판 양념 꼼장어", "Spicy marinated grilled eel on stone plate", "石板辣酱烤鳗鱼（꼼장어）", "石板 ピリ辛味付け ヌタウナギ焼き", "Lươn ướp cay nướng đá", { unit: T("한판", "Full plate", "整盘", "1皿", "Một chảo"), spicy: true, desc: T("한국 직송. 2인 기준이며 1인은 주방 사정에 따라 가능해요.", "Korea-direct. Sized for 2; a single serving may be possible depending on the kitchen.", "韩国直送。按2人份，1人份视厨房情况而定。", "韓国直送。2人前が基準で、1人前は厨房の状況により対応します。", "Nhập trực tiếp từ Hàn Quốc. Khẩu phần cho 2 người; 1 người tùy bếp.") }),
      it(890000, "eel_salt", "돌판 소금 꼼장어", "Salted grilled eel on stone plate", "石板盐烤鳗鱼（꼼장어）", "石板 塩味 ヌタウナギ焼き", "Lươn ướp muối nướng đá", { unit: T("한판", "Full plate", "整盘", "1皿", "Một chảo"), desc: T("한국 직송. 2인 기준이며 1인은 주방 사정에 따라 가능해요.", "Korea-direct. Sized for 2; a single serving may be possible depending on the kitchen.", "韩国直送。按2人份，1人份视厨房情况而定。", "韓国直送。2人前が基準で、1人前は厨房の状況により対応します。", "Nhập trực tiếp từ Hàn Quốc. Khẩu phần cho 2 người; 1 người tùy bếp.") }),
    ],
  },
  {
    id: "duck",
    name: T("돌판 오리", "Stone-plate duck", "石板鸭肉", "石板ダック", "Vịt nướng đá"),
    note: T("돌판 오리 한 판을 시키면 오리탕을 무료로 드려요!", "Order a full plate of stone-plate duck and get duck soup free!", "点一整盘石板鸭肉，免费送鸭汤！", "石板ダックを1皿ご注文でダックスープ無料！", "Gọi nguyên chảo vịt đá được tặng canh vịt!"),
    items: [
      it(null, "duck_salt", "돌판 오리소금구이", "Grilled duck with salt on hot stone plate", "石板盐烤鸭", "石板ダックの塩焼き", "Thịt vịt nướng muối trên đá nóng", { sizes: [[T("반판", "Half", "半盘", "半皿", "Nửa chảo"), 750000], [T("한판", "Full", "整盘", "1皿", "Nguyên chảo"), 1150000]], tag: "best" }),
      it(null, "duck_spicy", "돌판 오리주물럭", "Spicy stir-fried duck on hot stone plate", "石板辣炒鸭", "石板ダックのピリ辛炒め", "Thịt vịt nướng ướp cay trên đá nóng", { sizes: [[T("반판", "Half", "半盘", "半皿", "Nửa chảo"), 790000], [T("한판", "Full", "整盘", "1皿", "Nguyên chảo"), 1190000]], tag: "best", spicy: true }),
      it(690000, "duck_smoked", "돌판 오리훈제", "Smoked duck on hot stone plate", "石板烟熏鸭", "石板燻製ダック", "Thịt vịt hun khói nướng trên đá nóng", { tag: "best" }),
      it(250000, "duck_soup", "오리탕", "Duck soup", "鸭汤", "ダックスープ", "Canh vịt"),
    ],
  },
  {
    id: "sea",
    name: T("신선 회 별미", "Fresh sashimi", "新鲜刺身", "新鮮なお刺身", "Hải sản tươi"),
    note: T("바다의 신선한 맛을 마당에서 만나보세요.", "Enjoy the fresh taste of the sea at Madang.", "在马当品尝大海的新鲜味道。", "新鮮な海の味をマダンでどうぞ。", "Hải sản tươi ngon đặc biệt của MaDang."),
    items: [
      it(390000, "yukhoe", "육회", "Beef tartare (yukhoe)", "生拌牛肉", "ユッケ", "Gỏi bò"),
      it(390000, "sannakji", "산낙지 (4마리 기준)", "Live octopus sashimi (sannakji), 4 pcs", "活章鱼刺身（4只）", "活ダコの刺身（サンナクチ）4匹", "Gỏi bạch tuộc sống (4 con)"),
      it(720000, "tangtangi", "육회탕탕이", "Beef tartare & live octopus (yukhoe tangtangi)", "生拌牛肉章鱼（육회탕탕이）", "ユッケタンタンイ（ユッケ＋活ダコ）", "Gỏi bò bạch tuộc sống"),
      it(690000, "byeongeo", "병어회", "Butterfish (pomfret) sashimi", "鲳鱼刺身", "マナガツオの刺身", "Sashimi cá chim"),
      it(690000, "munge", "멍게회", "Sea squirt sashimi (munge)", "海鞘刺身", "ホヤの刺身（ミョンゲ）", "Sashimi hải tiêu (sea squirt)"),
      it(690000, "hanchi", "한치회", "Arrow squid sashimi (hanchi)", "枪乌贼刺身", "ヤリイカの刺身（ハンチ）", "Sashimi mực ống"),
    ],
  },
  {
    id: "region",
    name: T("팔도 별미", "Regional specialties", "八道特色", "八道の味", "Đặc sản vùng miền"),
    note: T("한국 각 지방의 대표 음식이에요. 한국 직송 재료가 많아요.", "Signature dishes from across Korea, many made with Korea-direct ingredients.", "韩国各地的代表美食，多使用韩国直送食材。", "韓国各地の名物料理です。韓国直送の食材も多く使っています。", "Các món đặc trưng của các vùng miền Hàn Quốc, nhiều nguyên liệu nhập trực tiếp từ Hàn Quốc."),
    items: [
      it(850000, "mungtigi", "한우 직송 뭉티기", "Korean beef mungtigi (raw beef sashimi)", "韩牛直送生牛肉片（뭉티기）", "韓牛直送 ムンティギ（生牛刺し）", "Sashimi bò Hàn Quốc"),
      it(990000, "hongeosamhap", "국내산 홍어삼합", "Korean hongeo samhap (skate, pork & kimchi)", "韩国产红鱼三合", "韓国産ホンオサンハプ", "Gỏi cá đuối Hàn Quốc"),
      it(690000, "hongeo", "맛보기 홍어", "Hongeo (skate) tasting plate", "红鱼品尝份", "ホンオ お試し盛り", "Gỏi cá đuối ăn thử"),
      it(690000, "anago", "한국 아나고회", "Korean conger eel sashimi (anago)", "韩国星鳗刺身", "韓国産アナゴの刺身", "Gỏi cá Hàn Quốc"),
      it(390000, "oyster", "한국 굴 사시미", "Korean oyster sashimi", "韩国生蚝刺身", "韓国産生ガキ", "Sashimi hàu"),
      it(490000, "sora", "한국 직송 참소라 무침", "Korea-direct spicy whelk salad", "韩国直送拌海螺", "韓国直送 サザエの和え物", "Ốc xà cừ Hàn Quốc trộn cay (vận chuyển hàng không)", { spicy: true }),
      it(390000, "gulkimchi", "통영 굴 김치", "Tongyeong oyster kimchi", "统营生蚝泡菜", "統営 牡蠣キムチ", "Kim chi hàu Tongyeong", { spicy: true }),
      it(650000, "kkomak", "벌교 꼬막무침 + 곱창김", "Beolgyo cockle salad + gopchang seaweed", "筏桥拌血蛤 + 韩国紫菜", "ボルギョ産コマク和え＋コプチャン海苔", "Ngao trộn + Lá kim"),
      it(400000, "hwangtae", "용대리 황태구이", "Yongdaeri grilled dried pollack", "龙大里烤干明太鱼", "龍大里 干しスケトウダラ焼き", "Cá khô ướp cay nướng", { spicy: true }),
      it(890000, "gwamegi", "포항 과메기 (10월~4월)", "Pohang gwamegi (Oct–Apr)", "浦项过眼鱼干（10月~4月）", "浦項 クァメギ（10月〜4月）", "Cá trích khô Pohang (Tháng 10 - Tháng 4)"),
      it(400000, "muk", "묵무침", "Acorn jelly salad (muk-muchim)", "拌橡子凉粉", "ドングリ寒天の和え物", "Thạch trộn Hàn Quốc"),
      it(490000, "octopus", "문어 숙회", "Boiled octopus (muneo sukhoe)", "白灼章鱼", "タコの湯引き", "Bạch tuộc hấp"),
      it(390000, null, "마당 술국", "Madang sul-guk (hangover soup)", "马当醒酒汤", "マダン スルグク（二日酔いスープ）", "Canh nhậu Madang"),
    ],
  },
  {
    id: "jeon",
    name: T("전 나와라", "Korean pancakes (jeon)", "煎饼", "チヂミ", "Các loại bánh"),
    items: [
      it(200000, "baechujeon", "배추전", "Napa cabbage pancake", "白菜煎饼", "白菜チヂミ", "Bánh cải thảo"),
      it(250000, "buchujeon", "부추전", "Chive pancake", "韭菜煎饼", "ニラチヂミ", "Bánh hẹ"),
      it(300000, "haemuljeon", "해물파전", "Seafood scallion pancake", "海鲜葱饼", "海鮮パジョン", "Bánh hành hải sản"),
      it(490000, "guljeon", "통영 굴전", "Tongyeong oyster pancake", "统营生蚝煎饼", "統営 牡蠣チヂミ", "Bánh hàu"),
      it(690000, "hongeojeon", "홍어전", "Skate pancake (hongeo-jeon)", "红鱼煎饼", "ホンオ チヂミ", "Bánh cá đuối"),
      it(690000, "dongtaejeon", "동태전", "Pollack pancake (dongtae-jeon)", "明太鱼煎饼", "スケトウダラのチヂミ", "Bánh cá minh thái"),
      it(350000, "taegeukjeon", "태극전", "Taegeuk pancake", "太极煎饼", "太極チヂミ", "Bánh thái cực"),
    ],
  },
  {
    id: "stew",
    name: T("얼큰 전골", "Spicy hot pots", "麻辣火锅", "ピリ辛鍋", "Lẩu cay"),
    items: [
      it(850000, "dongtae", "마당 동태찌개", "Madang pollack stew", "马当明太鱼汤", "マダン スケトウダラチゲ", "Lẩu cá minh thái Madang đậm đà", { unit: T("3~4인", "3–4 people", "3~4人", "3〜4名", "3~4 người"), spicy: true }),
      it(690000, "shrimp", "잔새우 매운탕 + 수제비", "Spicy small-shrimp hot pot + sujebi", "小虾辣汤 + 面片", "小エビのピリ辛鍋＋スジェビ", "Lẩu tôm nhỏ cay + Mì", { tag: "new", spicy: true }),
      it(null, "eel_jeongol", "파김치 장어전골", "Green-onion kimchi eel hot pot", "葱泡菜鳗鱼火锅", "ネギキムチうなぎ鍋", "Lẩu kimchi cá chình", { sizes: [[T("2~3인", "2–3 people", "2~3人", "2〜3名", "2~3 người"), 890000], [T("3~4인", "3–4 people", "3~4人", "3〜4名", "3~4 người"), 1290000]], tag: "new", spicy: true }),
      it(700000, null, "장어 파김치 추가", "Extra eel & green-onion kimchi", "加量鳗鱼葱泡菜", "うなぎ・ネギキムチ追加", "Thêm cá chình và kim chi hành", { unit: G(500) }),
    ],
  },
  {
    id: "noodle",
    name: T("면 요리", "Noodles", "面类", "麺料理", "Món mì"),
    items: [
      it(100000, "paldo", "팔도 비빔면", "Paldo spicy mixed noodles", "八道拌面", "パルド ビビン麺", "Mì lạnh trộn Paldo"),
      it(null, "mulnaeng", "함흥식 물냉면", "Hamheung-style cold noodles in broth", "咸兴式冷面（汤）", "咸興式 水冷麺", "Mì lạnh Hamheung (nước)", { sizes: [[T("보통", "Regular", "标准", "普通", "Thường"), 180000], [T("후식", "Dessert size", "餐后小份", "デザートサイズ", "Ăn tráng miệng"), 120000]] }),
      it(null, "bibimnaeng", "함흥식 비빔냉면", "Hamheung-style spicy cold noodles", "咸兴式拌冷面", "咸興式 ビビン冷麺", "Mì lạnh trộn Hamheung", { sizes: [[T("보통", "Regular", "标准", "普通", "Thường"), 180000], [T("후식", "Dessert size", "餐后小份", "デザートサイズ", "Ăn tráng miệng"), 120000]], spicy: true }),
      it(200000, "muksabal", "묵사발", "Acorn jelly cold soup (muk-sabal)", "橡子凉粉冷汤", "ドングリ寒天の冷スープ", "Súp thạch đậu (muk) rau củ"),
      it(160000, "udon", "유부우동", "Fried tofu udon", "油豆腐乌冬面", "きつねうどん", "Mì udon đậu hũ chiên"),
      it(100000, "shin", "신라면", "Shin Ramyun", "辛拉面", "辛ラーメン", "Mì Shin Ramyun", { spicy: true }),
      it(180000, "hongeoramen", "홍어라면", "Skate ramyun", "红鱼拉面", "ホンオラーメン", "Mì cá đuối", { spicy: true }),
    ],
  },
  {
    id: "meal",
    name: T("식사 · 사리 · 구울거리", "Meals, add-ons & grill extras", "饭类 · 加料 · 烤物", "食事・追加・焼き物", "Cơm · Gọi thêm · Đồ nướng"),
    note: T("솥밥 세트는 점심에만 주문할 수 있어요.", "The stone-pot rice sets are available at lunch only.", "石锅饭套餐仅限午餐供应。", "石鍋ご飯セットはランチのみです。", "Set cơm nồi đá chỉ áp dụng vào buổi trưa."),
    items: [
      it(290000, "solbap", "마당 갈비탕 + 솥밥 (점심)", "Madang galbi-tang + stone-pot rice (lunch)", "马当排骨汤 + 石锅饭（午餐）", "マダン カルビタン＋石鍋ご飯（ランチ）", "Canh sườn bò + Cơm thố (trưa)"),
      it(270000, "solbap", "마당 추어탕 + 솥밥 (점심)", "Madang chueo-tang (loach soup) + stone-pot rice (lunch)", "马当泥鳅汤 + 石锅饭（午餐）", "マダン チュオタン（どじょう汁）＋石鍋ご飯（ランチ）", "Canh cá chạch + Cơm thố (trưa)"),
      it(290000, "solbap", "마당 술국 + 솥밥 (점심)", "Madang sul-guk + stone-pot rice (lunch)", "马当醒酒汤 + 石锅饭（午餐）", "マダン スルグク＋石鍋ご飯（ランチ）", "Canh nhậu Madang + Cơm thố (trưa)"),
      it(70000, null, "구워먹는 치즈 6개 + 꿀", "Grilled cheese (6 pcs) + honey", "烤芝士6块 + 蜂蜜", "焼きチーズ6個＋はちみつ", "Phô mai sữa nướng 6 miếng + Mật ong"),
      it(40000, null, "고기 드신 후 볶음밥", "Fried rice (after meat)", "吃完肉后的炒饭", "お肉の後のチャーハン", "Cơm rang (sau khi ăn thịt)"),
      it(70000, null, "고기 드신 후 치즈 볶음밥", "Cheese fried rice (after meat)", "吃完肉后的芝士炒饭", "お肉の後のチーズチャーハン", "Cơm rang phô mai (sau khi ăn thịt)"),
      it(40000, null, "볶음밥 치즈 추가", "Add cheese to fried rice", "炒饭加芝士", "チャーハンにチーズ追加", "Thêm phô mai cơm rang"),
      it(60000, null, "가래떡 5개 + 꿀", "Garaetteok rice cakes (5) + honey", "条糕5条 + 蜂蜜", "カレトック5本＋はちみつ", "Bánh gạo 5 thanh + Mật ong"),
      it(60000, null, "감자 칼국수 사리", "Potato kalguksu noodles (add-on)", "土豆刀切面加料", "ジャガイモカルグクス（追加）", "Mì cắt khoai tây (gọi thêm)"),
      it(60000, null, "수제비 사리", "Sujebi dough flakes (add-on)", "面片加料", "スジェビ（追加）", "Sujebi (gọi thêm)"),
      it(50000, null, "곱창 돌김", "Gopchang seaweed (toasted gim)", "韩国紫菜", "コプチャン海苔", "Rong biển kẹp (gopchang gim)"),
    ],
  },
];
