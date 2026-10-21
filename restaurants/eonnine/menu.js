// 언니네 Chị ơi (9 Đ. Hoàng Hoa Thám, Võ Cường, Bắc Ninh) 메뉴 데이터 — 국수·김밥·덮밥·손만두 + 술 안주·전골
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "언니네" 폴더의 구글 지도 캡처 18장. 메뉴는 가게 계정이 1년 전 올린 인쇄 메뉴판
//   (한국어+베트남어판, 중국어+베트남어판) 65개 기준. 음료는 인쇄판에 없어 2년 전 손님 칠판 사진 값.
// 한국어·베트남어·중국어는 메뉴판 표기(명백한 오타만 고침), 영어·일본어는 새로 번역.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// it(가격, 한국어, 영어, 중국어, 일본어, 베트남어, 추가 설정) — 추가 설정: { spicy, tag: "best", desc }
window.RESTAURANT = {
  brand: { ko: "언니네", en: "Chị ơi", branch: "Bắc Ninh" },
  phone: "0968 902 083",
  address: "9 Đ. Hoàng Hoa Thám, Võ Cường, Bắc Ninh",
  mapQuery: "언니네 Chị ơi",
  wifi: null,
};

const it = (price, ko, en, zh, ja, vi, x = {}) => ({ price, name: { ko, en, zh, ja, vi }, ...x });
const HOT = { spicy: true };
const KR = (x = {}) => ({ desc: { ko: "한국산", en: "From Korea", zh: "韩国产", ja: "韓国産", vi: "Hàng Hàn Quốc" }, ...x });
const WAIT = { desc: { ko: "30분 걸려요", en: "Takes 30 min", zh: "需30分钟", ja: "30分かかります", vi: "Mất 30 phút" } };

window.MENU = [
  {
    id: "noodle",
    photo: "img/noodle.jpg",
    name: { ko: "대박집 국수 & 면", en: "Noodles", zh: "面条", ja: "麺類", vi: "Mỳ" },
    note: { ko: "양이 푸짐한 언니네 잔치국수 · 칼국수", en: "Generous bowls — try the janchi-guksu and kalguksu", zh: "分量十足的喜面·刀切面", ja: "ボリューム満点のチャンチグクス・カルグクス", vi: "Phần ăn nhiều — mỳ chan chi và mỳ khan" },
    items: [
      it(140000, "잔치국수", "Warm Noodle Soup (Janchi-guksu)", "韩国喜面", "チャンチグクス（温かい素麺）", "Mỳ chan chi", { tag: "best" }),
      it(140000, "비빔국수", "Spicy Mixed Noodles", "拌面", "ビビングクス", "Mỳ bi bim", HOT),
      it(150000, "콩국수", "Cold Soy Milk Noodles", "豆浆面", "コングクス（豆乳麺）", "Mỳ đậu nành"),
      it(150000, "열무국수", "Young Radish Kimchi Noodles", "萝卜缨泡菜面", "ヨルムグクス（大根葉キムチ麺）", "Mỳ củ cải xanh"),
      it(150000, "메밀 냉국수", "Cold Buckwheat Noodles", "荞麦冷面", "冷たいそば", "Mỳ lạnh kiều mạch"),
      it(150000, "냉국수", "Cold Noodle Soup", "凉面", "冷やし素麺", "Mỳ lạnh"),
      it(150000, "칼국수 (빨강)", "Spicy Knife-cut Noodles (Red)", "刀切面（辣红汤）", "カルグクス（辛い赤スープ）", "Mỳ khan cay", HOT),
      it(150000, "칼국수 (하얀)", "Knife-cut Noodles (White)", "刀切面（白汤）", "カルグクス（白スープ）", "Mỳ khan không cay", { tag: "best" }),
      it(180000, "바지락 칼국수 (하얀)", "Clam Knife-cut Noodles", "蛤蜊刀切面", "アサリのカルグクス", "Mỳ khan ngao"),
      it(170000, "칼국수 + 만두 2개", "Knife-cut Noodles + 2 Dumplings", "刀切面 + 饺子2个", "カルグクス＋餃子2個", "Mỳ khan + 2 màn thầu"),
      it(150000, "물냉면", "Cold Naengmyeon in Broth", "水冷面", "水冷麺", "Mỳ lạnh nước"),
      it(150000, "비빔냉면", "Spicy Mixed Naengmyeon", "拌冷面", "ビビン冷麺", "Mỳ lạnh trộn", HOT),
      it(100000, "계란라면", "Ramen with Egg", "鸡蛋拉面", "卵ラーメン", "Mỳ tôm trứng"),
    ],
  },
  {
    id: "gimbap",
    photo: "img/gimbap.jpg",
    name: { ko: "언니네 명품 김밥", en: "Gimbap", zh: "紫菜包饭", ja: "キンパ", vi: "Kimbap" },
    items: [
      it(80000, "김치김밥", "Kimchi Gimbap", "泡菜紫菜包饭", "キムチキンパ", "Kimbap kim chi"),
      it(90000, "충무김밥", "Chungmu Gimbap (with Spicy Squid)", "忠武紫菜包饭（配辣鱿鱼）", "チュンムキンパ（イカの辛味和え付き）", "Kimbap mực"),
      it(80000, "계란지단김밥", "Egg Gimbap", "鸡蛋紫菜包饭", "卵焼きキンパ", "Kimbap trứng", { tag: "best" }),
      it(70000, "멸치땡초김밥", "Spicy Anchovy Gimbap", "辣鳀鱼紫菜包饭", "じゃこと青唐辛子のキンパ", "Kimbap cá cơm cay", HOT),
      it(90000, "참치김밥", "Tuna Gimbap", "金枪鱼紫菜包饭", "ツナキンパ", "Kimbap cá ngừ"),
      it(90000, "제육김밥", "Spicy Pork Gimbap", "辣炒猪肉紫菜包饭", "チェユク（豚の辛味炒め）キンパ", "Kimbap thịt lợn", HOT),
    ],
  },
  {
    id: "rice",
    photo: "img/rice.jpg",
    name: { ko: "언니네 즉석 덮밥", en: "Rice Bowls & Fried Rice", zh: "盖饭 · 炒饭", ja: "丼・チャーハン", vi: "Cơm" },
    items: [
      it(150000, "오므라이스", "Omurice", "蛋包饭", "オムライス", "Cơm rang trứng (omurice)"),
      it(160000, "제육덮밥", "Spicy Pork Rice Bowl", "辣炒猪肉盖饭", "チェユク丼", "Cơm thịt lợn xào", { spicy: true, tag: "best" }),
      it(160000, "스팸 김치 볶음밥", "Spam Kimchi Fried Rice", "午餐肉泡菜炒饭", "スパムキムチチャーハン", "Cơm rang kim chi Spam"),
      it(150000, "김치 볶음밥", "Kimchi Fried Rice", "泡菜炒饭", "キムチチャーハン", "Cơm rang kim chi"),
      it(160000, "돌솥 소불고기 비빔밥", "Beef Bulgogi Stone Pot Bibimbap", "石锅牛肉拌饭", "牛プルコギ石焼ビビンバ", "Cơm trộn nồi đá bò bulgogi"),
      it(160000, "스팸마요덮밥", "Spam Mayo Rice Bowl", "午餐肉蛋黄酱盖饭", "スパムマヨ丼", "Cơm Spam sốt mayonnaise"),
      it(170000, "오징어덮밥", "Spicy Squid Rice Bowl", "鱿鱼盖饭", "イカ丼（辛口）", "Cơm mực xào cay", HOT),
      it(150000, "시래기국밥", "Dried Radish Greens Soup with Rice", "干萝卜缨汤饭", "シレギクッパ（干し大根葉スープご飯）", "Cơm canh rau cải khô"),
    ],
  },
  {
    id: "mandu",
    photo: "img/mandu.jpg",
    name: { ko: "매일 직접 빚은 손만두", en: "Handmade Dumplings", zh: "手工饺子", ja: "手作り餃子（マンドゥ）", vi: "Màn thầu tự làm" },
    note: { ko: "매일 매일 직접 빚어요", en: "Made by hand every day", zh: "每天亲手包制", ja: "毎日手作りしています", vi: "Gói tay mỗi ngày" },
    items: [
      it(170000, "떡만두국", "Rice Cake & Dumpling Soup", "年糕饺子汤", "トックマンドゥクッ（餅と餃子のスープ）", "Canh bánh gạo màn thầu"),
      it(170000, "손만두국", "Handmade Dumpling Soup", "手工饺子汤", "手作りマンドゥクッ", "Canh màn thầu", { tag: "best" }),
      it(150000, "고기 손만두", "Steamed Pork Dumplings", "猪肉手工饺子", "肉マンドゥ（蒸し）", "Màn thầu thịt hấp"),
      it(150000, "김치 손만두", "Steamed Kimchi Dumplings", "泡菜手工饺子", "キムチマンドゥ（蒸し）", "Màn thầu kim chi hấp"),
      it(150000, "고기 + 김치 반반 손만두", "Half Pork, Half Kimchi Dumplings", "猪肉 + 泡菜 半半手工饺子", "肉＋キムチ ハーフ＆ハーフマンドゥ", "Màn thầu thập cẩm (thịt + kim chi)"),
    ],
  },
  {
    id: "anju",
    name: { ko: "술 안주", en: "Bar Dishes", zh: "下酒菜", ja: "おつまみ", vi: "Món nhắm" },
    items: [
      it(500000, "더덕구이 (양념)", "Grilled Deodeok Root (Seasoned)", "烤沙参（调味）", "トドク（ツルニンジン）焼き", "Sâm nướng", KR()),
      it(500000, "간재미찜 (양념)", "Braised Skate (Seasoned)", "辣炖鳐鱼", "カンジェミ（エイ）の蒸し煮", "Cá đuối hấp", KR(HOT)),
      it(400000, "반건조 박대구이 (양념)", "Grilled Semi-dried Sole", "半干烤鳎鱼", "半干しシタビラメ焼き", "Cá bơn khô nướng", KR()),
      it(250000, "고등어구이", "Grilled Mackerel", "烤鲭鱼", "サバの塩焼き", "Cá thu nướng", KR()),
      it(600000, "홍어회", "Fermented Skate Sashimi", "洪鱼生鱼片", "ホンオの刺身", "Cá đuối ăn sống",
        { desc: { ko: "대청도 · 한국산", en: "From Daecheongdo, Korea", zh: "大青岛 · 韩国产", ja: "大青島・韓国産", vi: "Đảo Daecheong, Hàn Quốc" } }),
      it(400000, "수육", "Boiled Pork Slices (Suyuk)", "水煮五花肉", "スユク（茹で豚）", "Thịt luộc", WAIT),
      it(1000000, "홍어회 + 수육", "Skate Sashimi + Boiled Pork", "洪鱼生鱼片 + 水煮肉", "ホンオの刺身＋スユク", "Cá đuối + thịt luộc", WAIT),
      it(400000, "홍어무침", "Spicy Skate Salad", "凉拌洪鱼", "ホンオの和え物", "Cá đuối trộn", HOT),
      it(300000, "제육 두부김치", "Spicy Pork with Tofu & Kimchi", "辣炒猪肉豆腐泡菜", "豚キムチと豆腐", "Đậu phụ thịt lợn xào kim chi", HOT),
      it(300000, "제육볶음 (2인)", "Spicy Stir-fried Pork (for 2)", "辣炒猪肉（2人份）", "チェユクポックム（2人前）", "Thịt lợn xào (2 người)", HOT),
      it(300000, "오징어 초무침", "Spicy Vinegared Squid Salad", "醋拌鱿鱼", "イカの酢和え", "Mực nộm", HOT),
      it(300000, "오징어볶음", "Spicy Stir-fried Squid", "辣炒鱿鱼", "イカの辛味炒め", "Mực xào", HOT),
      it(300000, "골뱅이무침", "Spicy Sea Snail Salad", "凉拌海螺", "ツブ貝の辛味和え", "Ốc nộm", HOT),
      it(200000, "연어머리 버터구이", "Butter-grilled Salmon Head", "黄油烤三文鱼头", "サーモンカマのバター焼き", "Đầu cá hồi nướng bơ"),
      it(200000, "삼겹살구이", "Grilled Pork Belly", "烤五花肉", "サムギョプサル焼き", "Thịt ba chỉ nướng"),
      it(200000, "오리훈제", "Smoked Duck", "熏鸭肉", "鴨の燻製", "Vịt hun khói"),
      it(200000, "해물 김치전", "Seafood Kimchi Pancake", "海鲜泡菜饼", "海鮮キムチチヂミ", "Bánh kim chi hải sản"),
      it(200000, "해물 파전", "Seafood Green Onion Pancake", "海鲜葱饼", "海鮮ネギチヂミ", "Bánh hành hải sản"),
      it(200000, "통마늘 닭똥집", "Chicken Gizzards with Whole Garlic", "大蒜炒鸡胗", "砂肝のにんにく炒め", "Mề gà xào tỏi", HOT),
      it(200000, "오징어입 버터구이", "Butter-grilled Squid Mouths", "黄油烤鱿鱼嘴", "イカトンビのバター焼き", "Răng mực nướng bơ",
        { tag: "best", desc: { ko: "언니네 최애 메뉴", en: "House favorite", zh: "本店最爱", ja: "お店イチオシ", vi: "Món được yêu thích nhất" } }),
      it(150000, "계란말이", "Rolled Omelette", "鸡蛋卷", "韓国風卵焼き", "Trứng cuộn"),
      it(250000, "스팸 계란말이", "Spam Rolled Omelette", "午餐肉鸡蛋卷", "スパム入り卵焼き", "Trứng cuộn Spam"),
      it(200000, "민물 새우깡 튀김", "Fried River Shrimp", "油炸小河虾", "川エビの唐揚げ", "Tôm sông chiên"),
      it(150000, "먹태구이", "Grilled Dried Pollock", "烤明太鱼干", "モクテ（干しスケトウダラ）焼き", "Cá minh thái khô nướng"),
      it(150000, "은행 마늘구이", "Roasted Ginkgo Nuts & Garlic", "烤银杏大蒜", "銀杏とにんにく焼き", "Hạt ngân hạnh nướng tỏi"),
    ],
  },
  {
    id: "stew",
    name: { ko: "전골 · 탕", en: "Hot Pots & Soups", zh: "火锅 · 汤", ja: "鍋・スープ", vi: "Lẩu · Canh" },
    items: [
      it(300000, "오뎅탕", "Fish Cake Hot Pot", "鱼饼汤", "おでん鍋", "Canh chả cá",
        { tag: "best", desc: { ko: "인기 메뉴", en: "Popular", zh: "人气菜", ja: "人気メニュー", vi: "Món được ưa chuộng" } }),
      it(300000, "즉석 떡볶이 전골", "Tteokbokki Hot Pot (with Ramen)", "现煮炒年糕锅（含拉面）", "即席トッポッキ鍋（ラーメン入り）", "Lẩu bánh gạo cay (kèm mì gói)", HOT),
      it(350000, "해물 누룽지탕", "Seafood Scorched Rice Soup", "海鲜锅巴汤", "海鮮おこげスープ", "Canh hải sản cơm cháy"),
      it(350000, "해물 짬뽕탕", "Spicy Seafood Jjamppong Soup", "海鲜辣汤", "海鮮チャンポン鍋", "Canh hải sản cay", HOT),
      it(300000, "민물 얼큰 새우탕", "Spicy River Shrimp Soup", "淡水辣虾汤", "川エビの辛いスープ", "Canh tôm cay", HOT),
      it(200000, "홍합탕", "Mussel Soup", "贻贝汤", "ムール貝スープ", "Canh vẹm"),
      it(400000, "부대찌개", "Army Stew (Budae-jjigae)", "部队锅", "プデチゲ", "Lẩu xúc xích thập cẩm", HOT),
      it(400000, "손만두 전골", "Handmade Dumpling Hot Pot", "手工饺子火锅", "手作りマンドゥ鍋", "Lẩu màn thầu"),
    ],
  },
  {
    id: "drinks",
    name: { ko: "주류", en: "Drinks", zh: "酒水", ja: "お酒", vi: "Đồ uống" },
    note: { ko: "2년 전 칠판 메뉴 기준 · 가게에서 확인해 주세요", en: "From a 2-year-old chalkboard — please confirm with staff", zh: "根据2年前的黑板菜单，请向店员确认", ja: "2年前の黒板メニュー基準・店員にご確認ください", vi: "Theo bảng phấn 2 năm trước — vui lòng hỏi nhân viên" },
    items: [
      it(130000, "소주", "Soju", "烧酒", "焼酎", "Rượu soju"),
      it(50000, "맥주", "Beer", "啤酒", "ビール", "Bia"),
      it(140000, "막걸리", "Makgeolli (Rice Wine)", "韩国米酒", "マッコリ", "Rượu gạo Hàn Quốc"),
    ],
  },
];
