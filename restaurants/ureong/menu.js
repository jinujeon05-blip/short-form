// 우렁쌈밥 NHÀ HÀNG 우렁쌈밥 韓式包飯 (220 Đ. Hoàng Hoa Thám, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "우렁쌈밥" 폴더의 구글 지도 캡처 13장. 메뉴는 손님이 1년 전 올린 손글씨 화이트보드 3장
//   (22개) 기준. 보드가 한국어뿐이라 다른 언어는 모두 번역. 가격이 "N만동"으로 적혀 있음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// it(가격, 한국어, 영어, 중국어, 일본어, 베트남어, 추가 설정) — 추가 설정: { spicy, tag: "best", desc }
window.RESTAURANT = {
  brand: { ko: "우렁쌈밥", en: "Urong Ssambap", branch: "Bắc Ninh" },
  phone: "0392 410 007",
  address: "220 Đ. Hoàng Hoa Thám, Võ Cường, Bắc Ninh",
  mapQuery: "우렁쌈밥 Hoàng Hoa Thám",
  wifi: null,
};

const it = (price, ko, en, zh, ja, vi, x = {}) => ({ price, name: { ko, en, zh, ja, vi }, ...x });
const HOT = { spicy: true };
const d = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const MIN2 = d("2인분 이상 주문 · 1인분 가격", "Min. 2 servings · price per person", "2人份起点 · 每人价格", "2人前から・1人前の価格", "Gọi từ 2 suất · giá 1 người");
const RICE_EXTRA = d("밥 별도", "Rice not included", "米饭另计", "ご飯別", "Chưa gồm cơm");
const KR = d("한국산", "From Korea", "韩国产", "韓国産", "Hàng Hàn Quốc");

window.MENU = [
  {
    id: "rice",
    photo: "img/rice.jpg",
    name: { ko: "대표 식사", en: "Signature Rice Meals", zh: "招牌饭食", ja: "看板の食事", vi: "Cơm đặc trưng" },
    note: { ko: "우렁강된장에 쌈 채소와 대패삼겹·고등어구이를 곁들이는 우렁쌈밥이 대표 메뉴입니다",
      en: "Our signature: ssam greens with snail soybean-paste sauce, thin pork belly and grilled mackerel",
      zh: "招牌田螺包饭：生菜包配田螺大酱、薄五花肉和烤鲭鱼",
      ja: "看板はタニシ味噌と包み野菜、薄切り豚バラ・焼きサバのウロンサムパプ",
      vi: "Món chính: rau cuốn với tương ốc, ba chỉ thái mỏng và cá thu nướng" },
    items: [
      it(250000, "우렁쌈밥", "Urong Ssambap (Snail Paste Lettuce-wrap Set)", "田螺包饭套餐", "ウロンサムパプ（タニシ味噌の包みご飯定食）", "Cơm cuốn rau với tương ốc", { tag: "best", desc: MIN2 }),
      it(200000, "산채 비빔밥", "Mountain Greens Bibimbap", "山菜拌饭", "山菜ビビンバ", "Cơm trộn rau rừng",
        { desc: d("누룽지 숭늉 · 나물 한국산", "With scorched-rice tea · Korean greens", "配锅巴茶 · 韩国产山菜", "おこげ湯付き・山菜は韓国産", "Kèm nước cơm cháy · rau Hàn Quốc") }),
      it(230000, "보리 산채 비빔밥", "Barley Mountain Greens Bibimbap", "大麦山菜拌饭", "麦ごはんの山菜ビビンバ", "Cơm lúa mạch trộn rau rừng",
        { desc: d("우렁쌈장 · 누룽지 숭늉", "With snail ssamjang & scorched-rice tea", "配田螺包饭酱 · 锅巴茶", "タニシサムジャン・おこげ湯付き", "Kèm tương ốc · nước cơm cháy") }),
      it(150000, "청국장", "Cheonggukjang (Fermented Soybean Stew)", "清麴酱汤", "チョングッチャン（納豆チゲ）", "Canh tương đậu lên men"),
      it(150000, "콩나물 비빔밥", "Bean Sprout Bibimbap", "豆芽拌饭", "豆もやしビビンバ", "Cơm trộn giá đỗ"),
      it(220000, "꼬막 비빔밥", "Cockle Bibimbap", "血蚶拌饭", "赤貝（コマク）ビビンバ", "Cơm trộn sò huyết", { spicy: true, desc: d("벌교 꼬막 · 한국산", "Beolgyo cockles from Korea", "宝城筏桥血蚶 · 韩国产", "筏橋産コマク・韓国産", "Sò huyết Beolgyo, Hàn Quốc") }),
      it(250000, "떡갈비 정식", "Tteokgalbi Set (Grilled Short Rib Patty)", "牛肉饼套餐", "トッカルビ定食", "Cơm chả sườn nướng tteokgalbi", { tag: "best", desc: d("떡갈비 한국산", "Korean tteokgalbi", "韩国产牛肉饼", "トッカルビは韓国産", "Tteokgalbi Hàn Quốc") }),
    ],
  },
  {
    id: "stew",
    photo: "img/stew.jpg",
    name: { ko: "전골 · 탕", en: "Hot Pots", zh: "火锅 · 汤锅", ja: "鍋料理", vi: "Lẩu" },
    items: [
      it(null, "돼지고기 김치전골", "Pork Kimchi Hot Pot", "猪肉泡菜火锅", "豚肉キムチ鍋", "Lẩu kim chi thịt lợn",
        { spicy: true, desc: d("메뉴판에 600,000₫ · 500,000₫ 두 가격 — 가게에 확인", "Board shows 600,000₫ and 500,000₫ — ask staff", "菜单写有600,000₫和500,000₫两个价格，请向店员确认", "メニューに600,000₫と500,000₫の2つの価格・店員にご確認ください", "Bảng ghi 600,000₫ và 500,000₫ — hỏi nhân viên") }),
      it(600000, "동태 전골", "Pollock Hot Pot", "明太鱼火锅", "スケトウダラ鍋", "Lẩu cá minh thái", { spicy: true, desc: RICE_EXTRA }),
      it(600000, "닭볶음탕", "Spicy Braised Chicken", "辣炖鸡块", "タッポックムタン（鶏の辛煮込み）", "Gà hầm cay", { spicy: true, desc: RICE_EXTRA }),
    ],
  },
  {
    id: "meat",
    photo: "img/meat.jpg",
    name: { ko: "고기", en: "Meat", zh: "肉类", ja: "肉料理", vi: "Thịt" },
    items: [
      it(220000, "꽃삼겹살", "Premium Pork Belly (Kkot-samgyeopsal)", "雪花五花肉", "コッサムギョプサル（上豚バラ）", "Ba chỉ hoa nướng", { tag: "best", desc: MIN2 }),
    ],
  },
  {
    id: "fish",
    photo: "img/fish.jpg",
    name: { ko: "생선 조림 · 구이", en: "Braised & Grilled Fish", zh: "炖鱼 · 烤鱼", ja: "魚の煮付け・焼き魚", vi: "Cá kho · Cá nướng" },
    items: [
      it(700000, "갈치 조림", "Braised Hairtail", "辣炖带鱼", "タチウオの煮付け", "Cá hố kho", HOT),
      it(700000, "민물장어 구이", "Grilled Freshwater Eel", "烤淡水鳗鱼", "川うなぎ焼き", "Lươn nướng", { desc: d("1kg", "1kg", "1公斤", "1kg", "1kg") }),
      it(700000, "병어 조림", "Braised Butterfish", "辣炖鲳鱼", "マナガツオの煮付け", "Cá chim kho", HOT),
      it(600000, "가자미 조림", "Braised Flounder", "辣炖鲽鱼", "カレイの煮付け", "Cá bơn kho", HOT),
      it(250000, "고등어 구이", "Grilled Mackerel", "烤鲭鱼", "サバの塩焼き", "Cá thu nướng"),
      it(250000, "두부 조림", "Braised Tofu", "酱焖豆腐", "豆腐の煮付け", "Đậu phụ kho"),
    ],
  },
  {
    id: "special",
    photo: "img/special.jpg",
    name: { ko: "특선 요리 · 안주", en: "Specials & Bar Dishes", zh: "特色菜 · 下酒菜", ja: "特選料理・おつまみ", vi: "Món đặc biệt · Món nhắm" },
    items: [
      it(400000, "꼬막 무침", "Spicy Cockle Salad", "凉拌血蚶", "赤貝（コマク）の和え物", "Sò huyết trộn", { spicy: true, tag: "best", desc: d("벌교 꼬막 · 한국산", "Beolgyo cockles from Korea", "宝城筏桥血蚶 · 韩国产", "筏橋産コマク・韓国産", "Sò huyết Beolgyo, Hàn Quốc") }),
      it(200000, "오징어 숙회", "Blanched Squid", "白灼鱿鱼", "イカの湯引き", "Mực luộc"),
      it(700000, "구룡포 과메기", "Guryongpo Gwamegi (Half-dried Saury)", "九龙浦半干秋刀鱼", "九龍浦クァメギ（半干しサンマ）", "Cá thu đao khô Guryongpo", { desc: KR }),
      it(700000, "연잎 보쌈", "Lotus Leaf Bossam (Steamed Pork)", "荷叶菜包肉", "蓮の葉ポッサム", "Thịt luộc lá sen"),
      it(350000, "쭈꾸미 볶음", "Spicy Stir-fried Webfoot Octopus", "辣炒小章鱼", "イイダコの辛味炒め", "Bạch tuộc nhỏ xào cay", HOT),
    ],
  },
];
