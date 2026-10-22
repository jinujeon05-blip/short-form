// 다다식당 NHA HANG DADA 박닌 (53 Lý Nhân Tông, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격 / sizes: [[{ko,en,…}, 가격], …] / unit / tag: "best" / spicy: true / desc / photo
// 원본: 구글 드라이브 "다다식당" 폴더의 구글 지도 캡처 29장(가게 계정이 1년 전 올린 메뉴북 11면, 음식·간판 사진, 지도 정보).
// 메뉴북에 한국어·베트남어가 있어 그대로 쓰고, 영어·중국어·일본어는 새로 옮김.
// "300-450k"처럼 범위로 적힌 가격은 소·대 크기별 가격으로 넣음(메뉴판에 소/대 표기는 없음 → 확인 필요).
window.RESTAURANT = {
  brand: { ko: "다다식당", en: "DADA", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0334 215 316",
  address: "53 Lý Nhân Tông, Võ Cường, Bắc Ninh",
  mapQuery: "Nhà hàng DADA 다다식당 53 Lý Nhân Tông Võ Cường Bắc Ninh",
  wifi: null, // 예: { ssid: "DADA", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const sz = (pairs, photo, ko, en, zh, ja, vi, x = {}) => ({ sizes: pairs, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const S = T("소", "Small", "小", "小", "Nhỏ");
const M = T("중", "Medium", "中", "中", "Vừa");
const L = T("대", "Large", "大", "大", "Lớn");
const G = (n) => T(`${n}g`, `${n}g`, `${n}g`, `${n}g`, `${n}g`);
const SIZE_NOTE = T("소·대 크기별 가격이에요", "Prices by size (small / large)", "按份量（小/大）标价", "サイズ別（小・大）の価格です", "Giá theo cỡ (nhỏ / lớn)");

window.MENU = [
  {
    id: "bbq",
    name: T("고기구이", "Grilled meats", "烤肉", "焼肉", "Thịt nướng"),
    items: [
      it(200000, "mokgi", "소고기 목살·기살", "Beef chuck & rib finger", "牛肩颈肉·牛肋条", "牛ネック・カルビ", "Vai bò nướng", { unit: G(150) }),
      it(200000, "galbisal", "순살 소갈비살", "Boneless beef short rib", "无骨牛肋排", "骨なしカルビ", "Sườn bò non", { unit: G(150) }),
      it(200000, "chadol", "차돌박이", "Beef brisket", "牛胸腩", "牛バラ薄切り（チャドルバギ）", "Gầu bò Mỹ nướng"),
      it(150000, "hangjeong", "생항정살", "Fresh pork jowl", "鲜猪颈肉", "生ハンジョンサル（豚トロ）", "Thịt má nướng", { unit: G(150) }),
      it(100000, "samgyeop", "생삼겹살", "Fresh pork belly", "生五花肉", "生サムギョプサル", "Thịt ba chỉ nướng", { unit: G(130) }),
      it(100000, "daepae", "대패삼겹살", "Thinly sliced pork belly", "薄切五花肉", "薄切り豚バラ", "Ba chỉ lợn mỏng", { unit: G(130) }),
      it(150000, "makchang", "막창구이", "Grilled pork intestine (makchang)", "烤猪大肠", "マクチャン焼き（豚の大腸）", "Khấu đuôi nướng", { unit: G(150) }),
    ],
  },
  {
    id: "set",
    name: T("세트 · 콤보", "Sets & combos", "套餐 · 拼盘", "セット・コンボ", "Set · Combo"),
    note: SIZE_NOTE,
    items: [
      sz([[S, 300000], [L, 580000]], "set5", "차돌박이·삼겹살 세트", "Brisket & pork belly set", "牛胸腩·五花肉套餐", "牛バラ・豚バラセット", "Set gầu bò, ba chỉ"),
      sz([[S, 200000], [L, 380000]], "set6", "대패·삼겹살 세트", "Thin & thick pork belly set", "薄切·厚切五花肉套餐", "薄切り・厚切り豚バラセット", "Set ba chỉ dày + ba chỉ mỏng"),
      sz([[S, 250000], [L, 480000]], "set2", "삼겹살·항정살 세트", "Pork belly & jowl set", "五花肉·猪颈肉套餐", "豚バラ・ハンジョンサルセット", "Set ba chỉ, má heo nướng"),
      sz([[S, 250000], [L, 480000]], "set4", "삼겹살+막창 세트", "Pork belly & makchang set", "五花肉+大肠套餐", "豚バラ＋マクチャンセット", "Set ba chỉ + khấu đuôi"),
      sz([[S, 400000], [L, 880000]], "set1", "차돌박이·삼겹살·대패삼겹살 세트", "Brisket, pork belly & thin pork belly set", "牛胸腩·五花肉·薄切五花肉套餐", "牛バラ・豚バラ・薄切り豚バラセット", "Set gầu bò, ba chỉ, ba chỉ mỏng"),
      sz([[S, 580000], [L, 1150000]], "set3", "순살소갈비살·소목살·갈매기살 세트", "Boneless short rib, beef chuck & skirt set", "无骨牛肋·牛肩颈·横隔膜套餐", "骨なしカルビ・牛ネック・ハラミセット", "Set sườn non bò, vai bò, giải lợn"),
      sz([[S, 550000], [L, 950000]], "combo", "콤보 (소목살·순살소갈비·삼겹살)", "Combo (beef chuck, boneless short rib & pork belly)", "综合拼盘（牛肩颈·无骨牛肋·五花肉）", "コンボ（牛ネック・骨なしカルビ・豚バラ）", "Set vai bò, sườn non bò, ba chỉ"),
    ],
  },
  {
    id: "stew",
    name: T("찌개 · 국밥", "Stews & soups", "汤锅 · 汤饭", "チゲ・スープ", "Canh · Súp"),
    items: [
      it(150000, "tunajjigae", "참치김치찌개", "Tuna kimchi stew", "金枪鱼泡菜汤", "ツナキムチチゲ", "Canh kim chi cá ngừ", { tag: "best", desc: T("구글 지도 후기에서 손님들이 맛있다고 한 메뉴", "Praised by diners in Google Maps reviews", "谷歌地图上食客称赞的招牌菜", "Googleマップで好評のメニュー", "Món được khách khen trên Google Maps") }),
      it(130000, "kimchijjigae", "김치찌개", "Kimchi stew", "泡菜汤", "キムチチゲ", "Canh kim chi"),
      it(150000, "chadolmiso", "차돌 된장찌개", "Brisket soybean paste stew", "牛胸腩大酱汤", "牛バラ入り味噌チゲ", "Canh đậu tương"),
      it(130000, "dwaejijjigae", "돼지호박찌개", "Spicy pork & zucchini stew", "猪肉西葫芦辣汤", "豚肉ズッキーニのピリ辛チゲ", "Canh thịt bí ngòi cay", { spicy: true }),
      it(130000, "gochujang", "고추장찌개", "Gochujang stew", "辣椒酱汤", "コチュジャンチゲ", "Canh tương ớt", { spicy: true }),
      it(180000, "ugeoji", "우거지갈비탕", "Beef short rib soup with dried cabbage", "干菜牛排骨汤", "ウゴジ入りカルビタン", "Canh rau sườn bò"),
      it(150000, "haejang", "복어해장국", "Pufferfish hangover soup", "河豚醒酒汤", "フグのヘジャンクッ（二日酔いスープ）", "Canh cá xé"),
      it(150000, "miyeok", "미역국", "Seaweed soup with beef", "海带牛肉汤", "牛肉入りわかめスープ", "Canh rong biển thịt bò"),
      it(130000, "tteokmandu", "얼큰떡만두국", "Spicy rice cake & dumpling soup", "辣年糕饺子汤", "ピリ辛トックマンドゥクッ（餅・餃子スープ）", "Canh bánh gạo bánh bao", { spicy: true }),
    ],
  },
  {
    id: "jeongol",
    name: T("전골 · 탕", "Hot pots", "火锅 · 汤", "鍋料理", "Lẩu"),
    note: SIZE_NOTE,
    items: [
      sz([[S, 500000], [L, 700000]], "dakdori", "매콤 닭도리탕", "Spicy braised chicken stew (dakdoritang)", "辣炖鸡", "ピリ辛タットリタン", "Lẩu gà cay", { spicy: true }),
      sz([[S, 500000], [L, 700000]], "agu", "아구매운탕", "Spicy monkfish stew", "辣鮟鱇鱼汤", "アンコウの辛口鍋", "Lẩu cá mặt quỷ cay", { spicy: true }),
      sz([[S, 500000], [L, 700000]], "gopchang", "곱창전골", "Beef tripe hot pot", "牛杂火锅", "ホルモン鍋（コプチャンジョンゴル）", "Lẩu lòng bò"),
      sz([[S, 300000], [L, 500000]], "eomuk", "어묵탕", "Fish cake soup", "鱼饼汤", "おでん鍋", "Lẩu chả cá"),
      sz([[S, 200000], [M, 350000], [L, 500000]], "budae", "부대전골", "Army stew (budae jjigae)", "部队火锅", "プデチゲ（部隊鍋）", "Lẩu xúc xích"),
      sz([[S, 300000], [L, 450000]], "kkongchi", "꽁치김치찜", "Braised Pacific saury & kimchi", "秋刀鱼泡菜炖", "サンマとキムチの煮込み", "Cá thu đao hầm kim chi"),
    ],
  },
  {
    id: "rice",
    name: T("밥", "Rice dishes", "饭类", "ご飯もの", "Cơm"),
    items: [
      it(130000, "bibimbap", "소고기비빔밥", "Beef bibimbap", "牛肉拌饭", "牛肉ビビンバ", "Cơm trộn thịt bò"),
      it(130000, "nakjibibim", "낙지비빔밥", "Spicy octopus bibimbap", "章鱼拌饭", "テナガダコのビビンバ", "Cơm trộn bạch tuộc", { spicy: true }),
      it(130000, "jeyukdup", "제육덮밥", "Spicy stir-fried pork over rice", "辣炒猪肉盖饭", "豚肉の辛味炒めどんぶり", "Cơm lợn xào cay", { spicy: true }),
      it(130000, "ojingeodup", "오징어덮밥", "Spicy squid over rice", "辣炒鱿鱼盖饭", "イカ炒めどんぶり", "Cơm mực xào cay", { spicy: true }),
      it(130000, "dakdup", "닭고기덮밥", "Spicy chicken over rice", "辣炒鸡肉盖饭", "鶏肉の辛味炒めどんぶり", "Cơm gà xào cay", { spicy: true }),
      it(150000, "bulgogidup", "소불고기덮밥", "Beef bulgogi over rice", "烤牛肉盖饭", "牛プルコギどんぶり", "Cơm bò xào"),
      it(150000, null, "오므라이스", "Omelet rice", "蛋包饭", "オムライス", "Cơm rang cuộn trứng"),
      it(100000, "kimchirice", "김치볶음밥", "Kimchi fried rice", "泡菜炒饭", "キムチチャーハン", "Cơm chiên kim chi"),
      it(100000, "eggrice", "계란볶음밥", "Egg fried rice", "蛋炒饭", "卵チャーハン", "Cơm chiên trứng"),
      it(130000, "shrimprice", "새우볶음밥", "Shrimp fried rice", "虾仁炒饭", "海老チャーハン", "Cơm chiên tôm"),
      it(130000, "hamrice", "햄볶음밥", "Ham fried rice", "火腿炒饭", "ハムチャーハン", "Cơm chiên thịt"),
      it(130000, "cupramenrice", "컵라면 볶음밥", "Instant noodle fried rice", "杯面炒饭", "カップ麺チャーハン", "Cơm chiên mì tôm"),
      it(150000, "haemulrice", "해물볶음밥", "Seafood fried rice", "海鲜炒饭", "海鮮チャーハン", "Cơm chiên hải sản"),
      it(150000, "tunarice", "참치볶음밥", "Tuna fried rice", "金枪鱼炒饭", "ツナチャーハン", "Cơm rang cá ngừ"),
      it(100000, "tunagimbap", "참치 주먹밥", "Tuna rice balls", "金枪鱼饭团", "ツナおにぎり", "Cơm nắm cá ngừ"),
    ],
  },
  {
    id: "noodle",
    name: T("면", "Noodles", "面类", "麺類", "Mì"),
    items: [
      it(130000, "haemulramen", "해물라면", "Seafood ramyeon", "海鲜拉面", "海鮮ラーメン", "Mì tôm hải sản"),
      it(80000, "jinramen", "진라면", "Jin Ramyeon", "真拉面", "チンラーメン", "Mì tôm Hàn Quốc"),
      it(100000, "manduramen", "만두라면", "Dumpling ramyeon", "饺子拉面", "餃子ラーメン", "Mì tôm bánh bao"),
      it(120000, "bibimguksu", "비빔국수", "Spicy mixed noodles", "辣拌面", "ビビム麺（辛口あえ麺）", "Mì trộn", { spicy: true }),
      it(130000, "naengmyeon", "물냉면", "Cold buckwheat noodles (mul-naengmyeon)", "冷面", "水冷麺", "Mì đen lạnh"),
      it(120000, "kongguksu", "콩국수", "Cold soy milk noodles", "冷豆浆面", "コングクス（冷たい豆乳麺）", "Mì đỗ tương lạnh"),
    ],
  },
  {
    id: "snack",
    name: T("튀김 · 분식 · 안주", "Fried dishes & snacks", "炸物 · 小吃 · 下酒菜", "揚げ物・軽食・おつまみ", "Món chiên · Ăn vặt · Mồi nhậu"),
    items: [
      it(250000, "shrimpfry", "새우·고구마튀김", "Fried shrimp & sweet potato", "炸虾配地瓜", "海老と薩摩芋の天ぷら", "Tôm chiên + khoai lang chiên"),
      it(450000, "modeumfry", "모듬튀김 (새우·오징어·고구마·당근)", "Assorted fry (shrimp, squid, sweet potato, carrot)", "什锦炸物（虾·鱿鱼·地瓜·胡萝卜）", "天ぷら盛り合わせ（海老・イカ・薩摩芋・人参）", "Tôm chiên thập cẩm"),
      it(80000, "gyeranjjim", "계란찜", "Steamed egg", "蒸蛋", "韓国式茶碗蒸し（ケランチム）", "Trứng hấp"),
      it(100000, "gyeranmari", "계란말이", "Rolled omelet", "玉子烧", "卵焼き（ケランマリ）", "Trứng cuộn"),
      it(130000, "sotteok", "소떡소떡", "Sausage & rice cake skewers", "香肠年糕串", "ソトクソトク（ソーセージと餅の串）", "Bánh gạo chiên xúc xích"),
      it(130000, "manduzzim", "비비고 만두찜", "Steamed bibigo dumplings", "蒸饺子（bibigo）", "蒸し餃子（ビビゴ）", "Bánh bao hấp"),
      it(130000, "manduguel", "비비고 만두튀김", "Fried bibigo dumplings", "炸饺子（bibigo）", "揚げ餃子（ビビゴ）", "Bánh bao chiên"),
      it(130000, "jwipo", "쥐포구이", "Grilled filefish jerky", "烤马面鱼干", "カワハギの干物焼き", "Cá bò nướng"),
      it(200000, "ojingeo", "구운 말린오징어", "Grilled dried squid", "烤鱿鱼干", "干しイカ焼き", "Mực khô nướng"),
      it(130000, "muktae", "먹태채구이", "Grilled shredded dried pollock", "烤明太鱼丝", "ムクテ（干しスケトウダラ）焼き", "Cá khô nướng"),
      it(150000, "cheesecutlet", "치즈돈까스", "Cheese pork cutlet", "芝士猪排", "チーズとんかつ", "Thịt heo chiên xù phô mai"),
      it(200000, "gul", "굴 계란튀김", "Egg-battered fried oysters", "蛋液炸牡蛎", "牡蠣の卵衣揚げ", "Hàu sữa chiên"),
      it(150000, "mackerel", "고등어구이", "Grilled mackerel", "烤青花鱼", "さばの塩焼き", "Cá thu rán"),
      it(250000, "pajeon", "해물파전", "Seafood scallion pancake", "海鲜葱饼", "海鮮チヂミ（パジョン）", "Bánh hành hải sản"),
    ],
  },
  {
    id: "stirfry",
    name: T("볶음 · 찜 · 보쌈", "Stir-fries, braises & bossam", "炒菜 · 炖菜 · 菜包肉", "炒め・煮込み・ポッサム", "Xào · Hầm · Thịt luộc"),
    note: SIZE_NOTE,
    items: [
      sz([[S, 300000], [L, 450000]], "nakji", "낙지볶음", "Spicy stir-fried small octopus", "辣炒章鱼", "ナクチポックン（テナガダコ炒め）", "Bạch tuộc nhỏ xào cay", { spicy: true }),
      sz([[S, 350000], [L, 500000]], "munoh", "문어볶음", "Spicy stir-fried octopus", "辣炒大章鱼", "タコの辛味炒め", "Bạch tuộc xào cay", { spicy: true }),
      sz([[S, 300000], [L, 450000]], "ojingbokkeum", "오징어볶음", "Spicy stir-fried squid", "辣炒鱿鱼", "イカの辛味炒め", "Mực xào cay", { spicy: true }),
      sz([[S, 300000], [L, 450000]], "jeyukbokkeum", "제육볶음", "Spicy stir-fried pork", "辣炒猪肉", "豚肉の辛味炒め（ジェユクポックン）", "Thịt lợn xào cay", { spicy: true }),
      sz([[S, 250000], [M, 350000], [L, 500000]], "dakbal", "매운닭발", "Spicy chicken feet", "辣鸡爪", "激辛タッパル（鶏の足）", "Chân gà xào cay", { spicy: true }),
      sz([[S, 300000], [L, 500000]], "agujjim", "아구찜", "Spicy braised monkfish", "辣炖鮟鱇鱼", "アグチム（アンコウの辛味蒸し煮）", "Cá mặt quỷ xào cay", { spicy: true }),
      sz([[S, 300000], [L, 500000]], "jeori", "제오리 부추김치 (훈제오리 부추무침)", "Smoked duck with chive kimchi", "烟熏鸭肉拌韭菜", "燻製鴨のニラキムチ和え", "Vịt hun khói hẹ trộn"),
      sz([[S, 450000], [L, 600000]], "bossam", "보쌈 삼두부김치", "Bossam with tofu & kimchi", "菜包肉配豆腐泡菜", "ポッサム（豆腐・キムチ付き）", "Thịt luộc đậu hũ kim chi"),
    ],
  },
  {
    id: "braise",
    name: T("찜 · 불고기 (확인 필요)", "Braised dishes & bulgogi (please check)", "炖菜 · 烤肉（请确认）", "煮込み・プルコギ（要確認）", "Món hầm · Bò xào (vui lòng hỏi lại)"),
    note: T("사진이 흐려 읽은 가격이에요. 주문 전에 직원에게 확인해 주세요",
      "These prices were read from a blurry photo — please confirm with staff before ordering",
      "此页照片模糊，价格仅供参考，点餐前请向店员确认",
      "写真がぼやけて読み取った価格です。注文前に店員にご確認ください",
      "Giá đọc từ ảnh mờ — vui lòng hỏi nhân viên trước khi gọi món"),
    items: [
      sz([[S, 300000], [L, 450000]], null, "수육 (삶은 삼겹살)", "Boiled pork belly (suyuk)", "白切五花肉", "茹で豚バラ（スユク）", "Thịt ba chỉ luộc"),
      sz([[S, 300000], [L, 450000]], null, "햄두부김치", "Ham, tofu & kimchi", "火腿豆腐泡菜", "ハムと豆腐のキムチ炒め", "Thịt hộp nấu kim chi đậu"),
      sz([[S, 300000], [L, 500000]], null, "돼지갈비찜", "Braised pork ribs", "炖猪排骨", "豚カルビの煮込み", "Sườn lợn kho cay"),
      sz([[S, 350000], [L, 500000]], null, "소갈비찜", "Braised beef short ribs", "炖牛排骨", "牛カルビの煮込み", "Sườn bò kho"),
      sz([[S, 180000], [M, 350000], [L, 500000]], null, "소불고기", "Beef bulgogi", "烤牛肉", "牛プルコギ", "Thịt bò xào bulgogi"),
      it(300000, null, "매콤닭발과 주먹밥", "Spicy chicken feet with rice balls", "辣鸡爪配饭团", "激辛タッパルとおにぎり", "Chân gà xào cay và cơm nắm", { spicy: true }),
    ],
  },
  {
    id: "chicken",
    name: T("치킨", "Fried chicken", "炸鸡", "チキン", "Gà rán"),
    items: [
      it(230000, "chicken1", "순살치킨 (후라이드)", "Boneless fried chicken (original)", "无骨炸鸡（原味）", "骨なしフライドチキン（プレーン）", "Gà truyền thống"),
      it(230000, "chicken2", "순살매콤치킨", "Spicy boneless chicken", "香辣无骨鸡", "辛口骨なしチキン", "Gà rán cay", { spicy: true }),
      it(230000, "sweetchicken_big", "순살달콤양념치킨", "Sweet seasoned boneless chicken", "甜味调味无骨鸡", "甘口ヤンニョム骨なしチキン", "Gà rán ngọt"),
      it(230000, "wingspicy", "순살매콤양념윙", "Spicy seasoned chicken wings", "香辣调味鸡翅", "辛口味付けチキンウイング", "Cánh gà chiên cay", { spicy: true }),
      it(230000, "wingsweet", "순살달콤양념윙", "Sweet seasoned chicken wings", "甜味调味鸡翅", "甘口味付けチキンウイング", "Cánh gà chiên ngọt"),
      it(230000, "wing", "튀김 닭날개윙", "Fried chicken wings", "炸鸡翅", "揚げ手羽先", "Cánh gà chiên"),
    ],
  },
];
