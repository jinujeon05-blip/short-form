// 서서갈비 Seoseo Galbi (백년식당, 9 Đ. Hoàng Hoa Thám, Võ Cường, Bắc Ninh) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진(2026-10-30 수집, 올린 날짜 미상) — 책자 menu_02·03, 포스터 menu_04·08·11. 가격 단위 VND(메뉴판 표기 '000 VND)
// 메뉴판 가격은 부가세(10%) 별도. 구이류(돼지왕갈비 외) 가격표 사진은 수집기에 없음 — docs/todo.md
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "서서갈비", en: "Seoseo Galbi" },
  phone: "0777 386 760",
  address: "9 Đ. Hoàng Hoa Thám, Võ Cường, Bắc Ninh",
  wifi: null,
  hours: "11:00 – 22:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ ...(price != null ? { price } : {}), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const ds = (ko, en, zh, ja, vi) => ({ desc: { ko, en, zh, ja, vi } });

window.MENU = [
  {
    id: "grill",
    name: T("숯불구이", "Charcoal Grill", "炭火烤肉", "炭火焼き", "Nướng than hoa"),
    note: T("참숯불에 구워 드세요", "Grilled over charcoal at your table", "在桌边用炭火烤制", "テーブルで炭火焼き", "Nướng bằng than hoa tại bàn"),
    items: [
      it(null, "wang-galbi", "돼지왕갈비", "Pork King Galbi", "猪王排骨", "豚王カルビ", "Sườn heo King", { price: null, tag: "best", ...ds("200g · 갈비째 양념에 재워 숙성해 참숯불에 구워요 (가격은 매장에 문의)", "200 g · marinated on the bone, aged, then charcoal-grilled (ask the restaurant for the price)", "200克 · 带骨腌制熟成后炭火烤制（价格请咨询店家）", "200g · 骨付きのまま漬け込み熟成して炭火焼き（価格は店舗へ）", "200g · ướp nguyên xương, ủ rồi nướng than hoa (hỏi quán về giá)") }),
    ],
  },
  {
    id: "lunch",
    name: T("점심메뉴", "Lunch Menu", "午餐菜单", "ランチメニュー", "Thực đơn trưa"),
    items: [
      it(230000, null, "점심특선", "Lunch Special", "午餐特选", "ランチ特選", "Set trưa đặc biệt", { tag: "special", ...ds("수제돼지갈비 180g + 비빔/물냉면 또는 가마솥밥 선택 · 평일 11시~14시, 2인분부터, 주말·공휴일 제외", "Handmade pork galbi 180 g + mixed/cold noodles or iron-pot rice · weekdays 11:00–14:00, min. 2 servings, no weekends/holidays", "手工猪排骨180克 + 拌/冷面或釜锅饭（任选）· 工作日11:00–14:00，2人份起，周末·节假日除外", "手作り豚カルビ180g + ビビン/水冷麺またはかまど飯（選択）· 平日11:00〜14:00、2人前から、週末・祝日除く", "Sườn heo thủ công 180g + mì trộn/mì lạnh hoặc cơm niêu (chọn 1) · T2–T6 11:00–14:00, từ 2 suất, trừ cuối tuần/lễ") }),
      it(200000, null, "육쌈냉면 (비빔)", "Pork Galbi + Mixed Noodles", "排骨拌冷面套餐", "豚カルビ＋ビビン冷麺", "Sườn heo + mì trộn cay", ds("돼지갈비 180g + 비빔냉면", "Grilled pork 180 g + mixed noodles", "烤猪排180克 + 拌冷面", "焼き豚カルビ180g + ビビン冷麺", "Sườn heo nướng 180g + mì trộn cay")),
      it(200000, null, "육쌈냉면 (물)", "Pork Galbi + Cold Noodles", "排骨冷面套餐", "豚カルビ＋水冷麺", "Sườn heo + mì lạnh", ds("돼지갈비 180g + 물냉면", "Grilled pork 180 g + cold noodles", "烤猪排180克 + 冷面", "焼き豚カルビ180g + 水冷麺", "Sườn heo nướng 180g + mì lạnh")),
      it(180000, null, "양념게장정식", "Spicy Marinated Crab Set", "酱蟹套餐", "ヤンニョムケジャン定食", "Set ghẹ sốt", ds("양념게장 + 된장찌개 또는 계란찜", "Spicy marinated crab + bean paste stew or steamed egg", "酱蟹 + 大酱汤或蒸蛋", "ヤンニョムケジャン + テンジャンチゲまたは卵蒸し", "Ghẹ sốt + canh tương hoặc trứng hấp")),
      it(180000, null, "뚝불(소고기)정식", "Beef Bulgogi Set", "牛肉烤肉套餐", "牛プルコギ定食", "Set thịt bò sốt", ds("소불고기 + 된장찌개 또는 계란찜", "Bulgogi + bean paste stew or steamed egg", "牛烤肉 + 大酱汤或蒸蛋", "牛プルコギ + テンジャンチゲまたは卵蒸し", "Thịt bò sốt + canh tương hoặc trứng hấp")),
      it(240000, null, "소갈비탕", "Beef Short Rib Soup", "牛排骨汤", "牛カルビタン", "Canh sườn bò"),
    ],
  },
  {
    id: "meal",
    name: T("식사·찌개", "Meals & Stews", "餐食·汤锅", "お食事・チゲ", "Món ăn chính & lẩu"),
    note: T("가격은 부가세(10%) 별도예요", "Prices exclude 10% VAT", "价格不含10%增值税", "価格は税別（10%VAT）です", "Giá chưa bao gồm 10% VAT"),
    tip: T("김치한근탕·반근탕: 냄비의 김치를 알맞게 자르고 → 끓으면 고기 → 야채·두부 순으로 넣어 5분 끓여요. 라면사리는 찌개가 1/3 남았을 때 육수 2컵과 함께 넣어요.", "Kimchi stew: cut the kimchi in the pot, add the meat once it boils, then vegetables and tofu, and simmer 5 minutes. Add ramen when about 1/3 of the stew is left, with 2 cups of broth.", "泡菜锅：先把锅里的泡菜剪成适当大小，煮开后放肉，再放蔬菜、豆腐煮5分钟。加拉面时，待汤锅剩约1/3，加2杯高汤再放面。", "キムチ鍋：鍋のキムチを食べやすく切り、煮立ったらお肉、野菜、豆腐の順に入れて5分煮ます。ラーメンは鍋が1/3ほど残ったらスープ2杯と一緒に入れてください。", "Lẩu kim chi: cắt kim chi trong nồi, khi sôi cho thịt, rồi rau và đậu phụ, nấu 5 phút. Thêm mì khi nước lẩu còn khoảng 1/3, đổ thêm 2 chén nước dùng."),
    items: [
      it(480000, "kimchi-hangeuntang", "김치한근탕", "Kimchi Stew with Pork (Large)", "泡菜猪肉锅（大）", "キムチ鍋 豚肉（大）", "Lẩu kim chi thịt heo (lớn)", ds("돼지고기 한 근 · 4인분", "Pork, 600 g · serves 4", "猪肉600克 · 4人份", "豚肉600g · 4人前", "Thịt heo 600g · 4 người"), { spicy: true }),
      it(280000, null, "김치반근탕", "Kimchi Stew with Pork (Medium)", "泡菜猪肉锅（中）", "キムチ鍋 豚肉（中）", "Lẩu kim chi thịt heo (vừa)", ds("돼지고기 반 근 · 2인분", "Pork, 300 g · serves 2", "猪肉300克 · 2人份", "豚肉300g · 2人前", "Thịt heo 300g · 2 người"), { spicy: true }),
      it(180000, null, "소불고기", "Beef Bulgogi", "牛烤肉", "牛プルコギ", "Thịt bò sốt", ds("1인분 기준 · 2인 이상 주문", "Per person · order for 2 or more", "每人份 · 2人以上点餐", "1人前 · 2人前以上でご注文", "Giá 1 suất · gọi từ 2 người")),
      it(200000, null, "육회비빔밥", "Raw Beef Bibimbap", "生拌牛肉拌饭", "ユッケビビンバ", "Cơm trộn gỏi bò"),
      it(140000, "bibim-naengmyeon", "비빔냉면", "Spicy Mixed Cold Noodles", "辣拌冷面", "ビビン冷麺", "Mì trộn cay", { spicy: true }),
      it(140000, null, "물냉면", "Cold Noodle Soup", "冷汤面", "水冷麺", "Mì lạnh"),
      it(130000, null, "냉이된장", "Shepherd's Purse Bean Paste Stew", "荠菜大酱汤", "ナズナのテンジャンチゲ", "Canh tương cây tầm gió và bò", ds("소고기와 냉이를 넣은 된장찌개", "Bean paste stew with beef and shepherd's purse", "牛肉荠菜大酱汤", "牛肉とナズナのテンジャンチゲ", "Canh tương với thịt bò và rau tầm gió")),
      it(200000, "yangnyeom-gejang", "양념게장", "Spicy Marinated Crab", "辣酱腌蟹", "ヤンニョムケジャン", "Ghẹ sốt cay"),
      it(100000, null, "김치전", "Kimchi Pancake", "泡菜煎饼", "キムチチヂミ", "Bánh kim chi"),
      it(100000, null, "부추해물전", "Leek & Seafood Pancake", "韭菜海鲜煎饼", "ニラ海鮮チヂミ", "Bánh hẹ hải sản"),
      it(40000, null, "된장찌개", "Bean Paste Stew", "大酱汤", "テンジャンチゲ", "Canh đậu tương", { tag: "special", ...ds("후식(식사 마무리)", "To finish the meal", "餐后", "〆のお食事", "Món dùng cuối bữa") }),
      it(80000, null, "비빔/물냉면 (후식)", "Mixed or Cold Noodles (small)", "拌冷面/冷面（餐后）", "ビビン/水冷麺（〆）", "Mì trộn cay / mì lạnh (cuối bữa)", ds("고기 드신 뒤 후식용", "To finish after grilled meat", "烤肉后的收尾面", "焼き肉のあとの〆に", "Dùng sau khi ăn thịt nướng")),
      it(50000, null, "가마솥밥", "Iron-Pot Rice", "釜锅饭", "かまど飯", "Cơm niêu đá"),
      it(20000, null, "공기밥", "Steamed Rice", "米饭", "ご飯", "Cơm trắng"),
      it(20000, null, "라면사리", "Ramen Noodles", "拉面", "追加ラーメン", "Mì Hàn Quốc"),
    ],
  },
  {
    id: "drink",
    name: T("주류·음료", "Drinks", "酒水·饮料", "お酒・ドリンク", "Đồ uống"),
    items: [
      it(100000, null, "대선소주", "Daisun Soju", "大鲜烧酒", "テソンソジュ", "Soju Daisun"),
      it(130000, null, "처음처럼", "Chum-churum", "初饮初乐", "チョウムチョロム", "Chum-churum"),
      it(120000, null, "좋은데이·청춘", "Good Day · Chungchun", "好日子·青春", "グッデー・チョンチュン", "Good Day · Chungchun"),
      it(130000, null, "참이슬·진로", "Chamisul · Jinro", "真露", "チャミスル・ジンロ", "Chamisul · Jinro"),
      it(50000, null, "타이거맥주", "Tiger Beer", "虎牌啤酒", "タイガービール", "Bia Tiger"),
      it(null, null, "보드카", "Vodka", "伏特加", "ウォッカ", "Vodka", { sizes: [["330ml", 100000], ["500ml", 150000]] }),
      it(160000, null, "막걸리", "Makgeolli", "马格利酒", "マッコリ", "Makgeolli"),
      it(230000, null, "백세주", "Baekseju", "百岁酒", "ペクセジュ", "Baekseju"),
      it(null, null, "복분자", "Bokbunja (Black Raspberry Wine)", "覆盆子酒", "覆盆子酒（ポクプンジャ）", "Rượu phúc bồn tử", { sizes: [["선운사", 270000], ["보해", 300000]] }),
      it(30000, null, "사이다", "Cider (Soda)", "汽水", "サイダー", "Cider"),
      it(20000, null, "음료수", "Soft Drinks", "饮料", "ソフトドリンク", "Nước ngọt", ds("콜라·스프라이트·환타", "Cola · Sprite · Fanta", "可乐·雪碧·芬达", "コーラ・スプライト・ファンタ", "Cola · Sprite · Fanta")),
    ],
  },
];
