// 부뚜막 BUTOOMAC (290 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진 34장(2026-10-30 수집, 올린 날짜 미상). 구판(đ 표기: menu_01·06·26)과 신판(k 표기) 중 신판 기준, 가격 단위 VND
// 신판 가격은 대부분 '부가세 별도'(점심 스페셜만 10% 포함). 구판에만 있는 메뉴(가오리찜·오뎅탕·미니족발·돼지갈비 등)는 넣지 않음 — docs/todo.md
// price: 한 가지 가격 / sizes: [["350g", 가격], …] / price: null = 시가
// tag: "best" = 메뉴판의 BEST
window.RESTAURANT = {
  brand: { ko: "부뚜막", en: "Butoomac" },
  phone: "038 383 4885",
  address: "290 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh",
  wifi: null,
  hours: "11:00 – 24:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ ...(price != null ? { price } : {}), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const ds = (ko, en, zh, ja, vi) => ({ desc: { ko, en, zh, ja, vi } });
const BEEF5 = [["350g", 590000], ["500g", 890000], ["850g", 1490000], ["1.2kg", 1790000], ["1.6kg", 2380000]];

window.MENU = [
  {
    id: "beef",
    name: T("소고기·소곱창", "Beef & Beef Offal", "牛肉·牛杂", "牛肉・ホルモン", "Thịt bò & lòng bò"),
    note: T("가격은 부가세 별도예요 (점심 스페셜만 포함)", "Prices exclude VAT (lunch special includes it)", "价格不含增值税（午餐特惠含税）", "価格は税別です（ランチスペシャルのみ税込）", "Giá chưa gồm VAT (riêng set trưa đã gồm)"),
    items: [
      it(null, null, "양념소갈비살", "Marinated Boneless Short Rib", "腌制牛小排肉", "味付け牛カルビ身", "Sườn không xương ướp gia vị", { tag: "best", sizes: BEEF5, ...ds("8년 연속 판매 1등", "No. 1 seller for 8 years in a row", "连续8年销量第一", "8年連続販売1位", "Bán chạy số 1 suốt 8 năm") }),
      it(null, null, "소갈비살", "Boneless Short Rib (unseasoned)", "牛小排肉（原味）", "牛カルビ身（味付けなし）", "Sườn không xương không gia vị", { sizes: BEEF5 }),
      it(null, null, "양념소갈비살 + 생소갈비살 반반", "Half Marinated, Half Plain Short Rib", "腌制+原味牛小排肉 各半", "味付け・生カルビ身 半々", "Sườn không xương ướp + không ướp", { tag: "best", sizes: BEEF5, ...ds("고기 추가 1인분 280,000₫ (리필)", "Extra meat 280,000₫ per person", "加肉每人280,000₫", "追加肉1人分 280,000₫", "Thêm thịt 280.000₫/suất") }),
      it(null, null, "횡성한우 소곱창 (항공특송)", "Hoengseong Hanwoo Beef Intestines (air-freighted)", "横城韩牛牛小肠（空运）", "横城韓牛コプチャン（空輸）", "Lòng bò Hoengseong (vận chuyển hàng không)", { sizes: [["350g", 1120000], ["500g", 2190000], ["800g", 2800000]], ...ds("350g 2~3인 · 500g 4~5인 · 800g 5~6인", "350g for 2-3 · 500g for 4-5 · 800g for 5-6", "350克2~3人·500克4~5人·800克5~6人", "350g 2~3人・500g 4~5人・800g 5~6人", "350g 2-3 người · 500g 4-5 người · 800g 5-6 người") }),
      it(null, null, "미국산 소곱창 (항공특송)", "US Beef Intestines (air-freighted)", "美国牛小肠（空运）", "米国産コプチャン（空輸）", "Lòng bò Mỹ (vận chuyển hàng không)", { sizes: [["350g", 980000], ["550g", 1590000]] }),
      it(null, null, "모듬소특수부위", "Assorted Beef Special Cuts", "什锦牛特殊部位", "牛特殊部位盛り合わせ", "Lòng bò thập cẩm", { sizes: [["400g", 990000], ["800g", 1890000]], ...ds("곱창·막창·대창·특양", "Small intestine, abomasum, large intestine, special tripe", "小肠·牛皱胃·大肠·特选牛肚", "コプチャン・マクチャン・テチャン・特上ミノ", "Lòng non, dạ dày, ruột già, dạ dày đặc biệt") }),
      it(580000, null, "8년연속 1등 소막창 (항공특송)", "Beef Abomasum (Makchang, air-freighted)", "牛皱胃（空运）", "牛マクチャン（空輸）", "Nõn đuôi bò nhập khẩu", ds("1인분", "per person", "每人", "1人分", "1 suất")),
      it(450000, null, "오발탄 소특양", "Beef Special Tripe (So-teugyang)", "特选牛肚", "牛特上ミノ（特ヤン）", "Dạ dày bò nhập khẩu", ds("1인분", "per person", "每人", "1人分", "1 suất")),
      it(590000, null, "블랙앵거스 프라임 ++깍두기 꽃살", "Black Angus Prime Ribeye Cap", "黑安格斯极上牛肋眼", "ブラックアンガス プライム花サル（リブロース）", "Thịt thăn bò Black Angus", ds("1인분", "per person", "每人", "1人分", "1 suất")),
      it(890000, null, "우대갈비", "Bone-in Beef Short Rib (Udae-galbi)", "带骨牛大排", "骨付き牛カルビ（ウデカルビ）", "Sườn bò có xương", ds("600g", "600 g", "600克", "600g", "600g")),
      it(380000, null, "살치살", "Chuck Flap Tail (Salchisal)", "牛肩胛肉", "サルチサル（牛肩ロース）", "Thịt bẹ vai bò", ds("1인분 120g", "120 g per person", "每人120克", "1人分 120g", "120g/suất")),
      it(400000, null, "투뿔++ 눈꽃 안창살", "Snowflake Beef Skirt (Anchangsal)", "雪花牛横膈膜", "霜降りアンチャンサル", "Thịt diềm bò", ds("1인분 120g", "120 g per person", "每人120克", "1人分 120g", "120g/suất")),
      it(400000, null, "++프라임 생갈비", "Prime Raw Short Rib (LA-style)", "极上生牛排骨", "プライム生カルビ", "Sườn có xương LA", ds("200g", "200 g", "200克", "200g", "200g")),
      it(null, null, "모듬소고기", "Assorted Beef", "什锦牛肉", "牛肉盛り合わせ", "Thịt bò thập cẩm", { sizes: [["600g", 1490000], ["1kg", 1990000]], ...ds("소갈비살·안창살·부채살·생갈비·꽃살", "Short rib meat, skirt, flat iron, raw short rib, ribeye cap", "牛小排肉·横膈膜·牛肩肉·生排骨·牛肋条", "カルビ身・アンチャンサル・肩ロース・生カルビ・花サル", "Sườn không xương, diềm bò, bắp hoa, sườn tươi, thăn bò") }),
    ],
  },
  {
    id: "pork",
    name: T("돼지고기·쪽갈비", "Pork & Ribs", "猪肉·排骨", "豚肉・リブ", "Thịt heo & sườn"),
    items: [
      it(240000, null, "참나무 훈제 삼겹살", "Oak-smoked Pork Belly", "橡木熏五花肉", "オーク燻製サムギョプサル", "Thịt ba chỉ hun khói", ds("1인분 · 12시간 훈연", "per person · smoked 12 hours", "每人·熏制12小时", "1人分・12時間燻製", "1 suất · hun khói 12 giờ")),
      it(240000, null, "항정살", "Pork Jowl (Hangjeongsal)", "猪颈肉", "豚トロ（ハンジョンサル）", "Thịt má heo", ds("1인분", "per person", "每人", "1人分", "1 suất")),
      it(160000, null, "옛날식 돼지껍데기", "Old-style Pork Skin", "传统猪皮", "昔ながらの豚皮", "Da heo", ds("1인분 · 콩고물", "per person · with roasted soybean powder", "每人·配黄豆粉", "1人分・きな粉添え", "1 suất · ăn kèm bột đậu nành")),
      it(250000, null, "돼지 특수부위 (항정살 + 가리비살 + 껍데기)", "Pork Special Cuts (jowl + pork neck + skin)", "猪特殊部位（猪颈肉+猪颈脊肉+猪皮）", "豚の特殊部位（ハンジョンサル＋カリビサル＋皮）", "Thịt heo đặc biệt (má + cổ + da)", ds("1인분", "per person", "每人", "1人分", "1 suất")),
      it(350000, null, "소금구이 쪽갈비", "Salt-grilled Pork Ribs", "盐烤猪小排", "塩焼きポッカルビ", "Dẻ sườn heo nướng muối", ds("1인분", "per person", "每人", "1人分", "1 suất")),
      it(380000, null, "바베큐 쪽갈비", "BBQ Pork Ribs", "烧烤猪小排", "バーベキューポッカルビ", "Dẻ sườn heo BBQ", ds("1인분", "per person", "每人", "1人分", "1 suất")),
      it(380000, "cheese-jjokgalbi", "매운치즈 쪽갈비", "Spicy Cheese Pork Ribs", "香辣芝士猪小排", "辛口チーズポッカルビ", "Dẻ sườn heo xốt cay phô mai", { spicy: true, ...ds("1인분", "per person", "每人", "1人分", "1 suất") }),
      it(null, "banban-jjokgalbi", "반반쪽갈비 (2가지 선택)", "Half & Half Pork Ribs (choose 2)", "双拼猪小排（任选2种）", "ハーフ＆ハーフ・ポッカルビ（2種選択）", "Sườn heo nửa nọ nửa kia (chọn 2 vị)", { sizes: [["800g", 890000], ["1.2kg", 1380000]] }),
      it(690000, null, "매운 돼지등갈비찜", "Spicy Braised Pork Back Ribs", "辣味炖猪排骨", "辛い豚スペアリブの煮込み", "Sườn heo hầm cay", { spicy: true }),
      it(690000, null, "간장 돼지등갈비찜", "Soy-braised Pork Back Ribs", "酱油炖猪排骨", "醤油味の豚スペアリブ煮込み", "Sườn heo hầm xì dầu"),
    ],
  },
  {
    id: "eel",
    name: T("장어·꼼장어", "Eel & Hagfish", "鳗鱼·盲鳗", "うなぎ・コムジャンオ", "Lươn"),
    items: [
      it(null, null, "숯불장어구이 (소금)", "Charcoal-grilled Eel (salt)", "炭烤鳗鱼（盐味）", "炭火焼きうなぎ（塩）", "Lươn nướng than muối", { sizes: [["500g", 790000], ["1kg", 1200000]] }),
      it(null, null, "부산 양념꼼장어볶음", "Busan-style Spicy Stir-fried Hagfish (Kkomjangeo)", "釜山辣炒盲鳗", "釜山風コムジャンオ（ヌタウナギ）の辛味炒め", "Lươn xào cay kiểu Busan", { spicy: true, sizes: [["300g", 690000], ["600g", 1380000]] }),
    ],
  },
  {
    id: "anju",
    name: T("안주", "Side Dishes", "下酒菜", "おつまみ", "Món nhậu"),
    items: [
      it(null, "hongeo-samhap", "국내산 홍어 삼합", "Fermented Skate Samhap (Korean skate)", "韩国产发酵鳐鱼三合", "韓国産ホンオ三合", "Hongeo samhap (cá đuối lên men)", { sizes: [["½", 890000], ["1", 1290000]], ...ds("반 접시 / 한 접시", "half plate / full plate", "半份 / 一份", "半皿 / 1皿", "nửa đĩa / 1 đĩa") }),
      it(null, null, "홍어전", "Fermented Skate Pancake (Hongeo-jeon)", "发酵鳐鱼煎饼", "ホンオのチヂミ", "Bánh cá đuối lên men", { sizes: [["½", 890000], ["1", 1290000]], ...ds("반 접시 / 한 접시", "half plate / full plate", "半份 / 一份", "半皿 / 1皿", "nửa đĩa / 1 đĩa") }),
      it(580000, null, "대전 방앗간 들기름 육회", "Beef Tartare with Perilla Oil", "紫苏油生拌牛肉", "エゴマ油ユッケ", "Gỏi bò dầu tía tô", ds("1인분", "per person", "每人", "1人分", "1 suất")),
      it(580000, null, "전라도식 순창 고추장 육회", "Beef Tartare with Sunchang Gochujang", "淳昌辣酱生拌牛肉", "スンチャン・コチュジャンユッケ", "Gỏi bò tương ớt Sunchang", ds("1인분", "per person", "每人", "1人分", "1 suất")),
      it(890000, null, "한우 육사시미 (항공특송)", "Hanwoo Beef Sashimi (air-freighted)", "韩牛生牛肉片（空运）", "韓牛の牛刺し（空輸）", "Gỏi bò Hanwoo cắt lát (vận chuyển hàng không)", ds("1인분", "per person", "每人", "1人分", "1 suất")),
      it(250000, null, "김치전", "Kimchi Pancake", "泡菜煎饼", "キムチチヂミ", "Bánh kim chi"),
      it(300000, "haemul-pajeon", "해물파전", "Seafood & Scallion Pancake", "海鲜葱饼", "海鮮ネギチヂミ", "Bánh hành hải sản Hàn Quốc"),
      it(300000, null, "두부김치", "Tofu with Stir-fried Kimchi", "豆腐配炒泡菜", "豆腐キムチ", "Đậu phụ xào kim chi"),
      it(580000, null, "문어코다리", "Octopus & Semi-dried Pollack", "章鱼半干明太鱼", "タコとコダリ（半干しスケトウダラ）", "Bạch tuộc & cá minh thái"),
      it(390000, null, "파갈비", "Scallion Galbi (Pa-galbi)", "葱香排骨", "ネギカルビ", "Sườn nướng hành"),
      it(300000, null, "편육", "Sliced Boiled Pork (Pyeonyuk)", "切片白煮肉", "ピョンユク（薄切りゆで肉）", "Thịt luộc thái mỏng"),
      it(380000, null, "막순대", "Korean Blood Sausage (Mak-sundae)", "韩式血肠", "マクスンデ（韓国風腸詰め）", "Dồi lợn"),
      it(650000, null, "굴김치", "Oyster Kimchi", "牡蛎泡菜", "カキキムチ", "Kim chi hàu", ds("大", "large", "大份", "大", "phần lớn")),
      it(null, null, "원조 술국", "Original Sulguk (hangover hot pot)", "元祖解酒汤锅（Sulguk）", "元祖スルグク（酔い覚ましの鍋）", "Sulguk (lẩu giải rượu)", { sizes: [["2", 380000], ["4", 680000]], ...ds("2인분 / 4인분 · 1회 주문 시 무한리필", "for 2 / for 4 · free refills", "2人份 / 4人份·可无限续汤", "2人前 / 4人前・おかわり自由", "2 người / 4 người · được thêm nước không giới hạn") }),
    ],
  },
  {
    id: "meal",
    name: T("식사·찌개", "Noodles, Soups & Rice", "主食·汤", "お食事・チゲ", "Món chính & canh"),
    items: [
      it(160000, null, "물냉면", "Cold Buckwheat Noodles (Mul-naengmyeon)", "水冷面", "水冷麺", "Mì lạnh nước", ds("후식 사이즈 100,000₫", "Small size 100,000₫", "小份 100,000₫", "ミニサイズ 100,000₫", "Cỡ nhỏ 100.000₫")),
      it(160000, null, "비빔냉면", "Spicy Mixed Cold Noodles (Bibim-naengmyeon)", "拌冷面", "ビビン冷麺", "Mì lạnh trộn", { spicy: true, ...ds("후식 사이즈 100,000₫", "Small size 100,000₫", "小份 100,000₫", "ミニサイズ 100,000₫", "Cỡ nhỏ 100.000₫") }),
      it(200000, null, "코다리냉면", "Semi-dried Pollack Cold Noodles", "明太鱼冷面", "コダリ冷麺", "Mì lạnh cá minh thái", ds("후식 사이즈 120,000₫", "Small size 120,000₫", "小份 120,000₫", "ミニサイズ 120,000₫", "Cỡ nhỏ 120.000₫")),
      it(180000, null, "조개칼국수", "Clam Kalguksu (knife-cut noodle soup)", "蛤蜊刀切面汤", "あさりカルグクス", "Mì cắt tay hải sản"),
      it(null, null, "들깨수제비", "Perilla Sujebi (hand-torn dough soup)", "紫苏面片汤", "エゴマすいとん", "Bột mì vo viên canh tía tô", { sizes: [["S", 200000], ["L", 400000]] }),
      it(200000, null, "나주곰탕", "Naju Gomtang (beef bone soup)", "罗州牛骨汤", "羅州コムタン", "Canh xương bò Naju"),
      it(200000, null, "도가니곰탕", "Beef Knee Cartilage Gomtang", "牛膝软骨汤", "トガニコムタン（牛の膝軟骨）", "Canh gân bò hầm"),
      it(180000, null, "돼지국밥", "Pork Rice Soup (Dwaeji-gukbap)", "猪肉汤饭", "豚クッパ", "Cơm canh thịt heo"),
      it(180000, null, "순대국밥", "Sundae Rice Soup", "血肠汤饭", "スンデクッパ", "Cơm canh dồi heo"),
      it(180000, null, "전주 콩나물해장국", "Jeonju Bean Sprout Hangover Soup", "全州豆芽解酒汤", "全州風もやしヘジャングク", "Canh giá đỗ Jeonju"),
      it(160000, null, "김치찌개", "Kimchi Stew", "泡菜锅", "キムチチゲ", "Canh kim chi", { spicy: true }),
      it(160000, null, "된장찌개", "Soybean Paste Stew", "大酱汤", "テンジャンチゲ", "Canh đậu tương"),
      it(180000, null, "순두부찌개", "Soft Tofu Stew", "嫩豆腐锅", "スンドゥブチゲ", "Canh đậu phụ non", { spicy: true }),
      it(100000, null, "누룽지", "Scorched Rice (Nurungji)", "锅巴汤", "おこげ", "Cơm cháy"),
      it(50000, null, "볶음밥", "Fried Rice", "炒饭", "チャーハン", "Cơm rang", ds("소곱창·모듬소특수부위·꼼장어 주문 시 가능", "Available with beef intestines, assorted special cuts or hagfish", "点牛小肠、什锦特殊部位或盲鳗时可点", "コプチャン・特殊部位盛り合わせ・コムジャンオ注文時のみ", "Gọi kèm lòng bò, thập cẩm bò hoặc lươn")),
      it(60000, null, "매운 볶음밥", "Spicy Fried Rice", "辣炒饭", "辛口チャーハン", "Cơm rang cay", { spicy: true }),
      it(70000, null, "치즈 볶음밥", "Cheese Fried Rice", "芝士炒饭", "チーズチャーハン", "Cơm rang phô mai"),
    ],
  },
  {
    id: "jeongol",
    name: T("전골·탕", "Hot Pots", "火锅·汤锅", "鍋料理", "Lẩu"),
    note: T("전골 가격은 사진에 단위가 없어 천 동 단위로 읽었어요 — 주문 전 확인해 주세요", "Prices have no unit in the menu photo; read as thousands of VND — please confirm when ordering", "菜单照片未标注单位，按千越南盾理解——点餐前请确认", "メニュー写真に単位がなく千ドン単位として読んでいます。ご注文前にご確認ください", "Ảnh menu không ghi đơn vị, đang hiểu là nghìn đồng — vui lòng xác nhận khi gọi món"),
    items: [
      it(550000, null, "도래곱창전골", "Beef Intestine Hot Pot (Dorae-gopchang)", "牛小肠火锅", "コプチャン鍋", "Lẩu lòng bò non", { spicy: true }),
      it(null, null, "도가니수육전골", "Beef Knee Cartilage & Boiled Beef Hot Pot", "牛膝软骨白切肉火锅", "トガニ（牛の膝軟骨）とスユクの鍋", "Lẩu nhúng gân, lưỡi má bò", { sizes: [["M", 600000], ["L", 800000]] }),
      it(500000, null, "부대찌개전골", "Budae Jjigae Hot Pot (Army Stew)", "部队火锅", "プデチゲ鍋", "Lẩu thập cẩm kim chi, xúc xích", { spicy: true }),
      it(550000, null, "불고기전골", "Bulgogi Hot Pot", "烤肉火锅", "プルコギ鍋", "Lẩu bulgogi thịt bò"),
      it(600000, null, "감자탕", "Gamjatang (Pork Bone Stew)", "土豆排骨汤", "カムジャタン", "Lẩu xương heo hầm", { spicy: true }),
      it(600000, null, "양평전골", "Yangpyeong Hot Pot (tripe & ox blood)", "杨平火锅（牛肚牛血）", "ヤンピョン鍋（牛ミノ・牛の血）", "Lẩu dạ dày, tiết bò"),
      it(700000, null, "해물탕", "Spicy Seafood Stew (Haemul-tang)", "海鲜汤", "海鮮鍋（ヘムルタン）", "Hải sản hầm cay", { spicy: true }),
      it(500000, null, "알고니탕", "Spicy Roe Soup (Algoni-tang)", "鱼籽汤", "アルコニタン（魚卵スープ）", "Canh trứng cá cay", { spicy: true }),
      it(500000, null, "동태탕", "Pollack Soup (Dongtae-tang)", "明太鱼汤", "ドンテタン（スケトウダラ鍋）", "Lẩu canh cá minh thái", { spicy: true }),
      it(500000, null, "소고기 샤브샤브", "Beef Shabu-shabu", "牛肉涮锅", "牛しゃぶしゃぶ", "Lẩu nhúng thịt bò lát mềm"),
      it(580000, null, "반반전골 (부대찌개 + 불고기)", "Half & Half Hot Pot (Budae + Bulgogi)", "双拼火锅（部队+烤肉）", "ハーフ＆ハーフ鍋（プデ＋プルコギ）", "Lẩu hai ngăn (kim chi xúc xích + bulgogi)", ds("대", "large", "大份", "大", "cỡ lớn")),
      it(680000, null, "반반전골 (감자탕 + 도가니수육)", "Half & Half Hot Pot (Gamjatang + Beef Knee Cartilage)", "双拼火锅（土豆排骨汤+牛膝软骨）", "ハーフ＆ハーフ鍋（カムジャタン＋トガニスユク）", "Lẩu hai ngăn (xương heo + gân bò)", ds("대", "large", "大份", "大", "cỡ lớn")),
    ],
  },
  {
    id: "lunch",
    name: T("점심 스페셜", "Lunch Special", "午餐特惠", "ランチスペシャル", "Set trưa đặc biệt"),
    note: T("모듬고기 · 인원수에 맞게 공기밥 제공 · 10% 부가세 포함 · 요일·시간은 가게에 확인해 주세요", "Assorted meat · rice served per person · includes 10% VAT · please confirm days and hours with the restaurant", "什锦烤肉·按人数配米饭·含10%增值税·供应日期和时间请向店家确认", "盛り合わせ・人数分のご飯付き・10%税込・提供曜日・時間は店舗にご確認ください", "Thịt thập cẩm · kèm cơm theo số người · đã gồm VAT 10% · vui lòng hỏi quán về ngày và giờ áp dụng"),
    items: [
      it(null, null, "모듬고기", "Assorted Grilled Meat Set", "什锦烤肉套餐", "焼肉盛り合わせセット", "Thịt nướng thập cẩm", { sizes: [["2인 380g", 418000], ["3인 580g", 627000], ["4인 800g", 836000], ["5인 1kg", 1045000]], ...ds("양념소갈비 + 생소갈비 + 삼겹살 + 항정살 + 껍데기 + 훈제삼겹살", "Marinated & plain short rib, pork belly, jowl, pork skin, smoked pork belly", "腌制与原味牛小排+五花肉+猪颈肉+猪皮+熏五花肉", "味付け・生カルビ、サムギョプサル、ハンジョンサル、皮、燻製サムギョプサル", "Sườn bò ướp & tươi, ba chỉ, má heo, da heo, ba chỉ hun khói") }),
    ],
  },
  {
    id: "drink",
    name: T("주류·음료", "Drinks", "酒类·饮料", "お酒・ドリンク", "Đồ uống"),
    items: [
      it(140000, null, "참이슬", "Chamisul Soju", "真露烧酒", "チャミスル", "Soju Chamisul"),
      it(140000, null, "진로이즈백", "Jinro Is Back Soju", "真露 Is Back 烧酒", "ジンロ イズバック", "Soju Jinro Is Back"),
      it(140000, null, "좋은데이", "Good Day Soju", "Good Day 烧酒", "チョウンデイ", "Soju Good Day"),
      it(140000, null, "새로 소주", "Saero Soju", "Saero 烧酒", "セロ ソジュ", "Soju Saero"),
      it(140000, null, "처음처럼", "Chum-churum Soju", "初饮初乐烧酒", "チョウムチョロム", "Soju Chum-churum"),
      it(140000, null, "과일주", "Fruit Soju", "水果烧酒", "果実酒", "Rượu hoa quả"),
      it(180000, null, "청하", "Chungha (sake)", "清河（韩国清酒）", "チョンハ（清酒）", "Rượu Chungha"),
      it(180000, null, "막걸리", "Makgeolli (rice wine)", "玛格丽米酒", "マッコリ", "Rượu gạo Makgeolli"),
      it(300000, null, "복분자", "Bokbunja (black raspberry wine)", "覆盆子酒", "ポクブンジャ（覆盆子酒）", "Rượu Bokbunja"),
      it(300000, null, "백세주", "Baekseju (herbal rice wine)", "百岁酒", "ペクセジュ", "Rượu Baekseju"),
      it(120000, null, "보드카", "Vodka", "伏特加", "ウォッカ", "Rượu vodka"),
      it(50000, null, "맥주", "Beer", "啤酒", "ビール", "Bia"),
      it(30000, null, "콜라 / 제로콜라", "Coke / Coke Zero", "可乐 / 零度可乐", "コーラ / コーラゼロ", "Coca-Cola / Coke Zero"),
      it(30000, null, "스프라이트 / 환타", "Sprite / Fanta", "雪碧 / 芬达", "スプライト / ファンタ", "Sprite / Fanta"),
      it(60000, null, "초록매실", "Green Plum Drink", "青梅饮料", "青梅ドリンク", "Nước ép mận xanh"),
      it(80000, null, "아침햇살", "Morning Sun Rice Drink", "晨光米饮", "アチムヘッサル（ライスドリンク）", "Nước gạo Morning Sun"),
      it(100000, null, "컨디션", "Condition (hangover drink)", "Condition 解酒饮", "コンディション（二日酔いドリンク）", "Condition (giải rượu)"),
      it(150000, null, "여명", "Yeomyeong (hangover drink)", "黎明解酒饮", "ヨミョン（二日酔いドリンク）", "Yeomyeong (giải rượu)"),
    ],
  },
];
// 원어민 확인 필요: 가리비살(돼지 특수부위) en 'pork neck'·zh '猪颈脊肉'·ja 'カリビサル' / 막순대 en·zh / 블랙앵거스 꽃살(리브로스 추정) / 양평전골 zh '杨平' / 문어코다리 ja·zh / vi는 메뉴판 원문 그대로(소막창 'Nõn đuôi bò', 소특양 'Dạ dày bò' 등 한국어와 부위 불일치 가능)
