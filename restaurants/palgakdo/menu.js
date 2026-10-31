// 팔각도 하노이(PALGAKDO HÀ NỘI) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진 20장(2026-10-31 수집, 올린 날짜 미상), 가격 단위 VND, VAT 별도
// price: 한 가지 가격 / sizes: [["소", 가격], ["중", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만)
// 메뉴판 사진끼리 가격이 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "팔각도 하노이", en: "PALGAKDO HÀ NỘI" },
  phone: "0866600906",
  address: "123-TT3 P. Trần Văn Lai, Khu đô thị Mỹ Đình, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:30 – 24:00",
};

window.MENU = [
  {
    id: "lunch",
    name: { ko: "점심특선", en: "Lunch Special", zh: "午餐特选", ja: "ランチ特選", vi: "Set trưa đặc biệt" },
    note: {
      ko: "11:00~15:00 (사진에 16:00 표기도 있어요) · 2인분 이상 주문 · 인당 1가지 무료 선택: 해물순두부찌개·된장해물순두부찌개·돼지김치찌개·돼지순두부찌개·참치김치찌개·냉모밀·비빔모밀·매콤 닭철판 볶음밥·콘치즈·계란찜·날치알 주먹밥·참치 주먹밥·공깃밥",
      en: "11:00-15:00 (some photos show 16:00) · Order for 2 or more · Each person picks 1 free item: seafood soft tofu stew, doenjang seafood soft tofu stew, pork kimchi stew, pork soft tofu stew, tuna kimchi stew, cold soba, spicy mixed soba, spicy chicken teppan fried rice, corn cheese, steamed egg, flying fish roe rice ball, tuna rice ball, or steamed rice",
      zh: "11:00~15:00(部分照片标注为16:00)· 2人份以上可点 · 每人可免费选1样:海鲜嫩豆腐汤·大酱海鲜嫩豆腐汤·猪肉泡菜汤·猪肉嫩豆腐汤·金枪鱼泡菜汤·冷荞麦面·拌荞麦面·香辣鸡肉铁板炒饭·芝士玉米·蒸蛋·飞鱼籽饭团·金枪鱼饭团·白米饭",
      ja: "11:00~15:00(写真には16:00の表記もあります)・2人前以上で注文・お一人様1品無料で選択:海鮮スンドゥブチゲ・テンジャン海鮮スンドゥブチゲ・豚キムチチゲ・豚スンドゥブチゲ・ツナキムチチゲ・冷やしそば・ビビンそば・ピリ辛チキン鉄板チャーハン・コーンチーズ・卵蒸し・とびこおにぎり・ツナおにぎり・ご飯",
      vi: "11:00-15:00 (một số ảnh ghi 16:00) · Gọi từ 2 phần · Mỗi người được chọn 1 món miễn phí: canh đậu phụ non hải sản, canh đậu phụ non hải sản tương, canh kim chi thịt heo, canh đậu phụ non thịt heo, canh kim chi cá ngừ, mì soba lạnh, mì soba trộn cay, cơm chiên gà chảo gang cay, bắp phô mai, trứng hấp, cơm nắm trứng cá chuồn, cơm nắm cá ngừ hoặc cơm trắng",
    },
    items: [
      { price: 220000, spicy: true, name: { ko: "맵불 닭갈비 세트", en: "Spicy Fire Dakgalbi Set", zh: "辣火鸡排骨套餐", ja: "激辛タッカルビセット", vi: "Set gà nướng cay (Dakgalbi)" } },
      { price: 220000, tag: "best", name: { ko: "숯불닭갈비 세트", en: "Charcoal Dakgalbi Set", zh: "炭火鸡排骨套餐", ja: "炭火タッカルビセット", vi: "Set gà nướng than hoa" } },
      { price: 220000, name: { ko: "닭목살 간장 세트", en: "Chicken Neck Meat Set (Soy Sauce)", zh: "酱油鸡颈肉套餐", ja: "鶏ネック醤油セット", vi: "Set thịt cổ gà sốt tương" } },
      { price: 220000, name: { ko: "닭목살 고추장 세트", en: "Chicken Neck Meat Set (Gochujang)", zh: "辣酱鸡颈肉套餐", ja: "鶏ネックコチュジャンセット", vi: "Set thịt cổ gà sốt gochujang" } },
      { price: 220000, name: { ko: "삼겹살 180g", en: "Pork Belly 180g (Samgyeopsal)", zh: "五花肉 180g", ja: "サムギョプサル 180g", vi: "Ba chỉ heo 180g" } },
      { price: 220000, name: { ko: "돼지 목살 180g", en: "Pork Neck 180g (Moksal)", zh: "猪颈肉 180g", ja: "豚トロ(首肉) 180g", vi: "Thịt cổ heo 180g" } },
      { price: 280000, name: { ko: "LA갈비 200g", en: "LA-Style Beef Short Rib 200g", zh: "LA牛排骨 200g", ja: "LAカルビ 200g", vi: "Sườn bò LA 200g" } },
      { price: 200000, tag: "best", name: { ko: "닭장각 크림 삼계탕", en: "Creamy Chicken Drumstick Samgyetang", zh: "奶油鸡腿参鸡汤", ja: "鶏ドラムスティックのクリーム参鶏湯", vi: "Gà hầm sâm kem (đùi gà)" }, desc: { ko: "점심 한정 · 정가 250,000동", en: "Lunch only · Regular price 250,000 VND", zh: "仅限午餐 · 原价 250,000盾", ja: "ランチ限定・通常価格 250,000ドン", vi: "Chỉ bán buổi trưa · Giá gốc 250.000đ" } },
      { price: 200000, name: { ko: "짬뽕크림파스타", en: "Jjamppong Cream Pasta", zh: "海鲜辣汤奶油意面", ja: "チャンポンクリームパスタ", vi: "Mì Ý kem jjamppong" }, desc: { ko: "정가 220,000동", en: "Regular price 220,000 VND", zh: "原价 220,000盾", ja: "通常価格 220,000ドン", vi: "Giá gốc 220.000đ" } },
      { price: 150000, name: { ko: "짬뽕순두부 칼국수", en: "Jjamppong Soft Tofu Kalguksu", zh: "海鲜辣汤嫩豆腐刀削面", ja: "チャンポンスンドゥブカルグクス", vi: "Mì cắt kalguksu đậu phụ non jjamppong" } },
      { price: 150000, name: { ko: "고추장 불고기", en: "Gochujang Bulgogi", zh: "辣酱烤肉", ja: "コチュジャンプルコギ", vi: "Bulgogi sốt gochujang" }, desc: { ko: "정가 180,000동", en: "Regular price 180,000 VND", zh: "原价 180,000盾", ja: "通常価格 180,000ドン", vi: "Giá gốc 180.000đ" } },
      { price: 150000, name: { ko: "간장불고기", en: "Soy Sauce Bulgogi", zh: "酱油烤肉", ja: "醤油プルコギ", vi: "Bulgogi sốt tương" }, desc: { ko: "정가 180,000동", en: "Regular price 180,000 VND", zh: "原价 180,000盾", ja: "通常価格 180,000ドン", vi: "Giá gốc 180.000đ" } },
    ],
  },
  {
    id: "sig",
    name: { ko: "시그니처 숯불 닭갈비", en: "Signature Charcoal Dakgalbi", zh: "招牌炭火鸡排骨", ja: "シグネチャー炭火タッカルビ", vi: "Gà nướng than hoa đặc trưng" },
    items: [
      { price: 210000, spicy: true, tag: "best", photo: "img/dakgalbi.jpg", name: { ko: "맵불 닭갈비", en: "Spicy Fire Dakgalbi", zh: "辣火鸡排骨", ja: "激辛タッカルビ", vi: "Gà nướng cay (Dakgalbi)" }, desc: { ko: "220g", en: "220g", zh: "220g", ja: "220g", vi: "220g" } },
      { price: 210000, tag: "best", name: { ko: "숯불 닭갈비", en: "Charcoal Dakgalbi", zh: "炭火鸡排骨", ja: "炭火タッカルビ", vi: "Gà nướng than hoa" }, desc: { ko: "220g", en: "220g", zh: "220g", ja: "220g", vi: "220g" } },
    ],
  },
  {
    id: "parts",
    name: { ko: "닭 특수부위", en: "Special Chicken Cuts", zh: "鸡特殊部位", ja: "鶏の特殊部位", vi: "Bộ phận đặc biệt của gà" },
    note: {
      ko: "음식은 약 40~45분 걸려요. 미리 주문해 주시면 감사해요.",
      en: "Food takes about 40-45 minutes. We appreciate it if you order in advance.",
      zh: "上菜约需40~45分钟,提前点餐更好。",
      ja: "お料理には約40~45分かかります。事前にご注文いただけると助かります。",
      vi: "Món ăn mất khoảng 40-45 phút. Rất mong quý khách gọi món trước.",
    },
    items: [
      { price: 210000, name: { ko: "닭연골", en: "Chicken Cartilage", zh: "鸡软骨", ja: "鶏軟骨", vi: "Sụn gà" }, desc: { ko: "180g · 고추장 양념", en: "180g · Gochujang marinade", zh: "180g · 辣酱腌制", ja: "180g・コチュジャン味付け", vi: "180g · ướp gochujang" } },
      { price: 210000, name: { ko: "닭목살", en: "Chicken Neck Meat", zh: "鸡颈肉", ja: "鶏ネック(首肉)", vi: "Thịt cổ gà" }, desc: { ko: "180g · 간장 또는 고추장 중 택1", en: "180g · Choose soy sauce or gochujang", zh: "180g · 酱油或辣酱二选一", ja: "180g・醤油またはコチュジャンから1つ選択", vi: "180g · chọn sốt tương hoặc gochujang" } },
      { price: 240000, name: { ko: "닭 안창살", en: "Chicken Skirt Meat", zh: "鸡横膈膜", ja: "鶏ハラミ(横隔膜)", vi: "Thịt hoành gà" }, desc: { ko: "180g · 고추장 양념", en: "180g · Gochujang marinade", zh: "180g · 辣酱腌制", ja: "180g・コチュジャン味付け", vi: "180g · ướp gochujang" } },
      { price: 250000, spicy: true, name: { ko: "불닭발", en: "Spicy Fire Chicken Feet", zh: "辣鸡爪", ja: "激辛チキンの足(タッカルバル)", vi: "Chân gà cay" } },
    ],
  },
  {
    id: "set",
    name: { ko: "세트", en: "Sets", zh: "套餐", ja: "セット", vi: "Set" },
    items: [
      { price: 940000, name: { ko: "각도 세트", en: "Gakdo Set", zh: "Gakdo 套餐", ja: "カクト セット", vi: "Set Gakdo" }, desc: { ko: "3인 · 총 1,020g: 숯불 닭갈비 660g + 닭 특수부위 360g + 신선 모듬야채 · 정가 1,066,000동 → 940,000동 할인", en: "For 3 · Total 1,020g: charcoal dakgalbi 660g + special chicken cuts 360g + fresh assorted vegetables · Regular price 1,066,000 VND, discounted to 940,000 VND", zh: "3人份 · 共1,020g:炭火鸡排骨660g + 鸡特殊部位360g + 新鲜什锦蔬菜 · 原价 1,066,000盾,优惠价 940,000盾", ja: "3名様・計1,020g:炭火タッカルビ660g + 鶏の特殊部位360g + 新鮮盛り合わせ野菜・通常価格 1,066,000ドン → 940,000ドンに割引", vi: "Cho 3 người · Tổng 1.020g: gà nướng than hoa 660g + bộ phận đặc biệt của gà 360g + rau tươi thập cẩm · Giá gốc 1.066.000đ, giảm còn 940.000đ" } },
      { sizes: [["소", 770000], ["중", 920000]], name: { ko: "가브리살 보쌈세트", en: "Pork Gabrisal Bossam Set", zh: "猪肩胛肉菜包肉套餐", ja: "カブリサル ポッサムセット", vi: "Set bossam thịt gáy heo (Gabrisal)" }, desc: { ko: "소: 가브리살 보쌈 300g / 중: 400g · 구성: 가브리살 보쌈 + 김치속 + 무김치 + 바다해물칼국수", en: "Small: bossam 300g / Medium: 400g · Includes: gabrisal bossam + kimchi filling + radish kimchi + seafood kalguksu", zh: "小:菜包肉300g / 中:400g · 含:猪肩胛肉菜包肉 + 泡菜馅 + 萝卜泡菜 + 海鲜刀削面", ja: "小:ポッサム300g / 中:400g・内容:カブリサルポッサム + キムチ餡 + 大根キムチ + 海鮮カルグクス", vi: "Nhỏ: bossam 300g / Vừa: 400g · Gồm: bossam thịt gáy heo + nhân kim chi + kim chi củ cải + mì kalguksu hải sản" } },
      { price: 600000, name: { ko: "프리미엄 돼지 세트", en: "Premium Pork Set", zh: "高级猪肉套餐", ja: "プレミアム豚セット", vi: "Set heo cao cấp" }, desc: { ko: "450g: 삼겹살 150g + 목심 150g + 목살 150g", en: "450g: pork belly 150g + pork shoulder 150g + pork neck 150g", zh: "450g:五花肉150g + 猪梅花肉150g + 猪颈肉150g", ja: "450g:サムギョプサル150g + 肩ロース150g + 豚トロ150g", vi: "450g: ba chỉ heo 150g + thịt vai heo 150g + thịt cổ heo 150g" } },
      { price: 1050000, name: { ko: "프리미엄 소고기 세트", en: "Premium Beef Set", zh: "高级牛肉套餐", ja: "プレミアム牛肉セット", vi: "Set bò cao cấp" }, desc: { ko: "300g: 갈비·안창살·꽃갈비살 각 100g", en: "300g: short rib, skirt steak, and flower short rib meat, 100g each", zh: "300g:牛排骨·牛横膈膜·花排骨肉 各100g", ja: "300g:カルビ・アンチャンサル・花カルビ 各100g", vi: "300g: Sườn bò, Ba chỉ bò nội, Dẻ sườn bò, mỗi loại 100g" } },
      { price: 1600000, name: { ko: "시그니처 소고기 세트", en: "Signature Beef Set", zh: "招牌牛肉套餐", ja: "シグネチャー牛肉セット", vi: "Set bò đặc trưng" }, desc: { ko: "500g: 200g + 150g + 150g", en: "500g: 200g + 150g + 150g", zh: "500g:200g + 150g + 150g", ja: "500g:200g + 150g + 150g", vi: "500g: 200g + 150g + 150g" } },
    ],
  },
  {
    id: "special",
    name: { ko: "특별메뉴", en: "Special Dishes", zh: "特色菜", ja: "特別メニュー", vi: "Món đặc biệt" },
    note: {
      ko: "조리에 40~45분 걸려요. 사전 주문을 권해요.",
      en: "Cooking takes 40-45 minutes. Pre-ordering is recommended.",
      zh: "烹饪需40~45分钟,建议提前点餐。",
      ja: "調理に40~45分かかります。事前のご注文をおすすめします。",
      vi: "Thời gian chế biến 40-45 phút. Nên gọi món trước.",
    },
    items: [
      { price: 480000, name: { ko: "묵은지 닭찜", en: "Braised Chicken with Aged Kimchi", zh: "老泡菜炖鸡", ja: "熟成キムチの鶏蒸し煮", vi: "Gà hầm kim chi chua" } },
      { price: 480000, spicy: true, photo: "img/dakbokkeum.jpg", name: { ko: "감자 닭볶음탕", en: "Spicy Braised Chicken with Potatoes (Dakbokkeumtang)", zh: "土豆辣炖鸡", ja: "じゃがいも入り鶏の辛口煮込み(タッポックンタン)", vi: "Gà hầm cay khoai tây (Dakbokkeumtang)" } },
    ],
  },
  {
    id: "beef",
    name: { ko: "소고기", en: "Beef", zh: "牛肉", ja: "牛肉", vi: "Thịt bò" },
    items: [
      { price: 370000, name: { ko: "갈비살", en: "Beef Rib Meat (Galbisal)", zh: "牛肋条肉", ja: "カルビサル", vi: "Thịt sườn bò (Galbisal)" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" } },
      { price: 500000, name: { ko: "소안창살", en: "Beef Skirt Steak (Anchangsal)", zh: "牛横膈膜", ja: "牛アンチャンサル(ハラミ)", vi: "Thịt hoành bò (Anchangsal)" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" } },
      { price: 650000, name: { ko: "소 꽃살", en: "Beef Flower Meat (Kkotsal)", zh: "牛花肉", ja: "牛花サル(霜降り)", vi: "Thịt bò hoa (Kkotsal)" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" } },
      { price: 450000, name: { ko: "LA 갈비", en: "LA-Style Beef Short Rib", zh: "LA牛排骨", ja: "LAカルビ", vi: "Sườn bò LA" }, desc: { ko: "250g", en: "250g", zh: "250g", ja: "250g", vi: "250g" } },
    ],
  },
  {
    id: "pork",
    name: { ko: "돼지고기", en: "Pork", zh: "猪肉", ja: "豚肉", vi: "Thịt heo" },
    items: [
      { price: 220000, photo: "img/samgyeopsal.jpg", name: { ko: "삼겹살", en: "Pork Belly (Samgyeopsal)", zh: "五花肉", ja: "サムギョプサル", vi: "Ba chỉ heo" }, desc: { ko: "180g", en: "180g", zh: "180g", ja: "180g", vi: "180g" } },
      { price: 220000, name: { ko: "돼지 목살", en: "Pork Neck (Moksal)", zh: "猪颈肉", ja: "豚トロ(首肉)", vi: "Thịt cổ heo" }, desc: { ko: "180g", en: "180g", zh: "180g", ja: "180g", vi: "180g" } },
      { price: 240000, name: { ko: "돼지 항정살", en: "Pork Jowl (Hangjeongsal)", zh: "猪项肉", ja: "豚ハンジョンサル(豚の首下肉)", vi: "Thịt má heo (Hangjeongsal)" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" } },
    ],
  },
  {
    id: "stew",
    name: { ko: "찌개·면", en: "Stews & Noodles", zh: "汤锅·面", ja: "チゲ・麺", vi: "Canh/Lẩu & Mì" },
    items: [
      { price: 150000, spicy: true, photo: "img/sundubu.jpg", name: { ko: "해물 순두부찌개", en: "Seafood Soft Tofu Stew", zh: "海鲜嫩豆腐汤", ja: "海鮮スンドゥブチゲ", vi: "Canh đậu phụ non hải sản" } },
      { price: 150000, name: { ko: "된장 해물순두부찌개", en: "Doenjang Seafood Soft Tofu Stew", zh: "大酱海鲜嫩豆腐汤", ja: "テンジャン海鮮スンドゥブチゲ", vi: "Canh đậu phụ non hải sản tương" }, desc: { ko: "밥 포함", en: "Rice included", zh: "含米饭", ja: "ご飯付き", vi: "Kèm cơm" } },
      { price: 150000, name: { ko: "돼지 김치찌개", en: "Pork Kimchi Stew", zh: "猪肉泡菜汤", ja: "豚キムチチゲ", vi: "Canh kim chi thịt heo" } },
      { price: 150000, spicy: true, name: { ko: "돼지순두부찌개", en: "Pork Soft Tofu Stew", zh: "猪肉嫩豆腐汤", ja: "豚スンドゥブチゲ", vi: "Canh đậu phụ non thịt heo" } },
      { price: 150000, name: { ko: "참치김치찌개", en: "Tuna Kimchi Stew", zh: "金枪鱼泡菜汤", ja: "ツナキムチチゲ", vi: "Canh kim chi cá ngừ" } },
      { price: 180000, name: { ko: "게라면 된장전골", en: "Crab Ramen Doenjang Hot Pot", zh: "螃蟹拉面大酱火锅", ja: "カニラーメンのテンジャン鍋", vi: "Lẩu tương mì ramen cua" } },
      { price: 150000, spicy: true, name: { ko: "짬뽕 칼국수 (또는 밥)", en: "Jjamppong Kalguksu (or Rice)", zh: "海鲜辣汤刀削面(或米饭)", ja: "チャンポンカルグクス(またはご飯)", vi: "Mì kalguksu jjamppong (hoặc cơm)" } },
      { price: 150000, name: { ko: "냉모밀 국수", en: "Cold Soba Noodles", zh: "冷荞麦面", ja: "冷やしそば", vi: "Mì soba lạnh" } },
      { price: 150000, spicy: true, name: { ko: "비빔 모밀국수", en: "Spicy Mixed Soba Noodles", zh: "拌荞麦面", ja: "ビビンそば", vi: "Mì soba trộn cay" } },
      { price: 180000, name: { ko: "사골 만두칼국수", en: "Beef Bone Broth Dumpling Kalguksu", zh: "牛骨饺子刀削面", ja: "牛骨スープの餃子カルグクス", vi: "Mì kalguksu bánh xếp nước xương bò" }, desc: { ko: "계란 또는 소고기 중 택1", en: "Choose egg or beef", zh: "鸡蛋或牛肉二选一", ja: "卵または牛肉から1つ選択", vi: "Chọn trứng hoặc thịt bò" } },
    ],
  },
  {
    id: "side",
    name: { ko: "안주·사이드", en: "Side Dishes", zh: "下酒菜·配菜", ja: "おつまみ・サイド", vi: "Món nhắm & Món phụ" },
    items: [
      { price: 140000, name: { ko: "라우몽(공심채) 마늘볶음", en: "Stir-Fried Morning Glory with Garlic", zh: "蒜炒空心菜", ja: "空心菜のニンニク炒め", vi: "Rau muống xào tỏi" } },
      { price: 140000, name: { ko: "오일 관자 (9개)", en: "Scallops in Oil (9 pcs)", zh: "油浸扇贝(9个)", ja: "ホタテのオイル煮(9個)", vi: "Sò điệp ngâm dầu (9 con)" } },
      { price: 100000, spicy: true, photo: "img/bokkeumbap.jpg", name: { ko: "매콤 닭철판 볶음밥", en: "Spicy Chicken Teppan Fried Rice", zh: "香辣鸡肉铁板炒饭", ja: "ピリ辛チキン鉄板チャーハン", vi: "Cơm chiên gà chảo gang cay" }, desc: { ko: "콘치즈랑 비벼 드셔 보세요", en: "Try mixing it with the corn cheese", zh: "试试和芝士玉米拌着吃", ja: "コーンチーズと混ぜて召し上がってみてください", vi: "Hãy thử trộn với bắp phô mai" } },
      { price: 70000, name: { ko: "고소한 콘치즈", en: "Savory Corn Cheese", zh: "香浓芝士玉米", ja: "香ばしいコーンチーズ", vi: "Bắp phô mai béo ngậy" } },
      { price: 90000, photo: "img/corncheese.jpg", name: { ko: "콘치즈 계란찜 / 치즈 없는 계란찜", en: "Corn Cheese Steamed Egg / Plain Steamed Egg (no cheese)", zh: "芝士玉米蒸蛋 / 无芝士蒸蛋", ja: "コーンチーズ卵蒸し / チーズなし卵蒸し", vi: "Trứng hấp bắp phô mai / Trứng hấp không phô mai" } },
      { price: 90000, name: { ko: "날치알 주먹밥 / 참치 주먹밥", en: "Flying Fish Roe Rice Ball / Tuna Rice Ball", zh: "飞鱼籽饭团 / 金枪鱼饭团", ja: "とびこおにぎり / ツナおにぎり", vi: "Cơm nắm trứng cá chuồn / Cơm nắm cá ngừ" } },
      { price: 20000, name: { ko: "공깃밥", en: "Steamed Rice", zh: "白米饭", ja: "ご飯", vi: "Cơm trắng" } },
    ],
  },
  {
    id: "drink",
    name: { ko: "주류·음료", en: "Drinks", zh: "酒水·饮料", ja: "お酒・ドリンク", vi: "Đồ uống" },
    items: [
      { price: 150000, name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "焼酎(ソジュ)", vi: "Soju" } },
      { price: 180000, name: { ko: "막걸리", en: "Makgeolli", zh: "米酒(马格利)", ja: "マッコリ", vi: "Makgeolli" } },
      { price: 200000, name: { ko: "청하", en: "Chung Ha (Sake)", zh: "清河清酒", ja: "チョンハ(清酒)", vi: "Chung Ha (rượu sake Hàn)" } },
      { price: 150000, name: { ko: "맨보드카", en: "Vodkamen", zh: "Vodkamen 伏特加", ja: "ウォッカメン", vi: "Vodkamen" } },
      { price: 30000, name: { ko: "음료수", en: "Soft Drinks", zh: "饮料", ja: "ソフトドリンク", vi: "Nước ngọt" }, desc: { ko: "콜라·스프라이트·환타·제로", en: "Coke, Sprite, Fanta, Zero", zh: "可乐·雪碧·芬达·零度", ja: "コーラ・スプライト・ファンタ・ゼロ", vi: "Coca, Sprite, Fanta, Zero" } },
      { price: 70000, name: { ko: "삿포로 생맥주 330ml", en: "Sapporo Draft Beer 330ml", zh: "札幌生啤 330ml", ja: "サッポロ生ビール 330ml", vi: "Bia tươi Sapporo 330ml" } },
      { price: 60000, name: { ko: "타이거 병맥주", en: "Tiger Bottled Beer", zh: "虎牌瓶装啤酒", ja: "タイガー瓶ビール", vi: "Bia chai Tiger" } },
    ],
  },
];
