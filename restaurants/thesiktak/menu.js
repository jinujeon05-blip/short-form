// 더 식탁(The Sik Tak) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(크림색 인쇄본 menu_01 사시미·04 사이드·05 점심특선 초밥·06 덮밥/면류·09 주류, 2026-11-09 수집)
// 같은 판 코팅본(menu_15·16·17·21·22)과 대조: menu_16 도미·모듬 사시미 '소'만 20만 낮음 → 높은 쪽(인쇄본) 씀 (docs/todo.md)
// 검은 옛 판(menu_07·11·13·14)·칠판(menu_18·23·27)은 안 씀
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만)
window.RESTAURANT = {
  brand: { ko: "더 식탁", en: "The Sik Tak" },
  phone: "0902 291 836",
  address: "C11 KĐT Five Star, Ngõ 154 Đình Thôn, Mỹ Đình, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:30 – 14:00 · 16:30 – 22:00", // 구글 지도 '오전 11:30~오후 2:00 / 오후 4:30~10:00'. 메뉴판엔 '5시 이후 금액'만 있음
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });
const SML = (s, m, l) => [["S", s], ["M", m], ["L", l]];
const LD = (lunch, dinner) => [["~17:00", lunch], ["17:00~", dinner]];

window.MENU = [
  {
    id: "sashimi",
    name: T("사시미", "Sashimi", "刺身", "刺身", "Sashimi"),
    note: T("소(S) 7가지 · 중(M) 11가지 · 대(L) 13가지 요리가 함께 나와요 · 요리 구성은 계절에 따라 달라질 수 있어요",
      "Small (S) comes with 7 side dishes, Medium (M) with 11, Large (L) with 13. Side dishes may change with the season.",
      "小份(S)附7道菜，中份(M)附11道菜，大份(L)附13道菜。菜品会随季节有所变化。",
      "小(S)は7品、中(M)は11品、大(L)は13品の料理が付きます。料理の内容は季節によって変わることがあります。",
      "Phần nhỏ (S) kèm 7 món, phần vừa (M) kèm 11 món, phần lớn (L) kèm 13 món. Các món ăn kèm có thể thay đổi theo mùa."),
    items: [
      it(SML(1950000, 2600000, 2900000), null, T("도미 사시미", "Sea Bream Sashimi", "鲷鱼刺身", "鯛の刺身", "Sashimi cá tráp")),
      it(SML(2150000, 2950000, 3400000), "moodeum_sashimi", T("모듬 사시미", "Assorted Sashimi", "综合刺身拼盘", "刺身盛り合わせ", "Sashimi tổng hợp"), { desc: T("도미 · 광어 · 자바리 · 연어", "Sea bream · Flounder · Longtooth grouper · Salmon", "鲷鱼 · 比目鱼 · 长牙石斑鱼 · 三文鱼", "鯛 · ヒラメ · ジャバリ(ハタ) · サーモン", "Cá tráp · Cá bơn · Cá mú · Cá hồi") }),
      it(SML(2500000, 3400000, 3800000), null, T("광어 사시미", "Flounder Sashimi", "比目鱼刺身", "ヒラメの刺身", "Sashimi cá bơn")),
      it(SML(2700000, 3800000, 4200000), null, T("참다랑어 사시미", "Bluefin Tuna Sashimi", "蓝鳍金枪鱼刺身", "本マグロの刺身", "Sashimi cá ngừ vây xanh")),
      it(SML(2700000, 3800000, 4200000), null, T("고급 어종 3종 또는 제철 고급 사시미", "Premium Sashimi: 3 Kinds of Premium Fish or Seasonal Premium Fish", "三种高级鱼刺身或当季高级刺身", "高級魚3種または旬の高級刺身", "Sashimi cao cấp: 3 loại cá cao cấp hoặc cá cao cấp theo mùa")),
    ],
    tip: T("사시미 추가: 일반 사시미 800,000 · 참치·고급 어종 1,800,000",
      "Extra sashimi: regular sashimi 800,000 · tuna or premium fish 1,800,000",
      "加点刺身：普通刺身 800,000 · 金枪鱼·高级鱼 1,800,000",
      "刺身の追加：通常の刺身 800,000 · マグロ・高級魚 1,800,000",
      "Gọi thêm sashimi: sashimi thường 800,000 · cá ngừ, cá cao cấp 1,800,000"),
  },
  {
    id: "sushi",
    name: T("점심 특선 · 초밥", "Lunch Special · Sushi", "午市特餐 · 寿司", "ランチ特選 · 寿司", "Set trưa đặc biệt · Sushi"),
    note: T("~17:00 = 점심 특선 가격 · 17:00~ = 오후 5시 이후 가격 · 소바는 우동으로 바꿀 수 있어요",
      "~17:00 = lunch special price · 17:00~ = price after 5 PM · Soba can be swapped for udon.",
      "~17:00 = 午市特餐价 · 17:00~ = 下午5点后的价格 · 荞麦面可换成乌冬面。",
      "~17:00 = ランチ特選価格 · 17:00~ = 午後5時以降の価格 · そばはうどんに変更できます。",
      "~17:00 = giá set trưa · 17:00~ = giá sau 17:00 · Có thể đổi soba thành udon."),
    items: [
      it(LD(280000, 400000), "sushi_set", T("모듬 초밥 10p + 소바 + 새우튀김", "Assorted Sushi (10 pcs) + Soba + Shrimp Tempura", "综合寿司10贯 + 荞麦面 + 炸虾", "盛り合わせ寿司10貫 + そば + 海老天", "Sushi tổng hợp 10 miếng + Soba + Tôm chiên tempura")),
      it(LD(260000, 350000), null, T("도미 초밥 10p + 소바 + 새우튀김", "Sea Bream Sushi (10 pcs) + Soba + Shrimp Tempura", "鲷鱼寿司10贯 + 荞麦面 + 炸虾", "鯛寿司10貫 + そば + 海老天", "Sushi cá tráp 10 miếng + Soba + Tôm chiên tempura")),
      it(LD(280000, 400000), null, T("연어 초밥 10p + 소바 + 새우튀김", "Salmon Sushi (10 pcs) + Soba + Shrimp Tempura", "三文鱼寿司10贯 + 荞麦面 + 炸虾", "サーモン寿司10貫 + そば + 海老天", "Sushi cá hồi 10 miếng + Soba + Tôm chiên tempura")),
      it(LD(280000, 400000), null, T("도미 + 연어 초밥 10p + 소바 + 새우튀김", "Sea Bream + Salmon Sushi (10 pcs) + Soba + Shrimp Tempura", "鲷鱼 + 三文鱼寿司10贯 + 荞麦面 + 炸虾", "鯛 + サーモン寿司10貫 + そば + 海老天", "Sushi cá tráp + cá hồi 10 miếng + Soba + Tôm chiên tempura")),
      it(LD(260000, 350000), null, T("새우 초밥 10p + 소바 + 새우튀김", "Shrimp Sushi (10 pcs) + Soba + Shrimp Tempura", "虾寿司10贯 + 荞麦面 + 炸虾", "海老寿司10貫 + そば + 海老天", "Sushi tôm 10 miếng + Soba + Tôm chiên tempura")),
      it(LD(300000, 450000), "futomaki", T("후토마키 1줄 + 소바 + 새우튀김", "Futomaki (1 roll) + Soba + Shrimp Tempura", "太卷寿司1条 + 荞麦面 + 炸虾", "太巻き1本 + そば + 海老天", "Futomaki 1 cuộn + Soba + Tôm chiên tempura")),
      it(LD(600000, 800000), null, T("참다랑어 초밥 10p + 소바 + 새우튀김", "Bluefin Tuna Sushi (10 pcs) + Soba + Shrimp Tempura", "蓝鳍金枪鱼寿司10贯 + 荞麦面 + 炸虾", "本マグロ寿司10貫 + そば + 海老天", "Sushi cá ngừ vây xanh 10 miếng + Soba + Tôm chiên tempura")),
    ],
  },
  {
    id: "rice",
    name: T("점심 특선 · 덮밥 · 면류", "Lunch Special · Rice Bowls · Noodles", "午市特餐 · 盖饭 · 面类", "ランチ特選 · 丼 · 麺類", "Set trưa đặc biệt · Cơm tô · Mì"),
    note: T("~17:00 = 점심 특선 가격 · 17:00~ = 오후 5시 이후 가격 · 소바는 우동으로 바꿀 수 있어요",
      "~17:00 = lunch special price · 17:00~ = price after 5 PM · Soba can be swapped for udon.",
      "~17:00 = 午市特餐价 · 17:00~ = 下午5点后的价格 · 荞麦面可换成乌冬面。",
      "~17:00 = ランチ特選価格 · 17:00~ = 午後5時以降の価格 · そばはうどんに変更できます。",
      "~17:00 = giá set trưa · 17:00~ = giá sau 17:00 · Có thể đổi soba thành udon."),
    items: [
      it(LD(280000, 400000), null, T("연어덮밥 + 소바", "Salmon Rice Bowl + Soba", "三文鱼盖饭 + 荞麦面", "サーモン丼 + そば", "Cơm cá hồi + Soba")),
      it(LD(280000, 400000), null, T("사시미덮밥 + 소바", "Sashimi Rice Bowl + Soba", "刺身盖饭 + 荞麦面", "刺身丼 + そば", "Cơm sashimi + Soba")),
      it(LD(400000, 450000), "jangeo", T("장어덮밥 + 소바", "Grilled Eel Rice Bowl + Soba", "鳗鱼盖饭 + 荞麦面", "うなぎ丼 + そば", "Cơm lươn nướng + Soba")),
      it(LD(600000, 800000), null, T("특사시미덮밥 + 소바", "Special Sashimi Rice Bowl + Soba", "特级刺身盖饭 + 荞麦面", "特上刺身丼 + そば", "Cơm sashimi đặc biệt + Soba"), { desc: T("참다랑어 포함", "Includes bluefin tuna", "含蓝鳍金枪鱼", "本マグロ入り", "Có cá ngừ vây xanh") }),
      it(LD(280000, 450000), null, T("회덮밥 + 미소된장국", "Hoedeopbap (Korean Raw Fish Rice Bowl) + Miso Soup", "韩式生鱼片拌饭(Hoedeopbap) + 味噌汤", "フェドッパ(韓国風刺身丼) + 味噌汁", "Hoedeopbap (Cơm trộn cá sống kiểu Hàn) + Súp miso"), { desc: T("한국식 회비빔밥", "Korean-style raw fish bibimbap", "韩式生鱼片拌饭", "韓国風の刺身ビビンバ", "Cơm trộn cá sống kiểu Hàn Quốc") }),
      it(LD(350000, 400000), null, T("물회 + 초밥 5p", "Mulhoe (Korean Cold Raw Fish Soup) + Sushi (5 pcs)", "韩式冷汤生鱼片(Mulhoe) + 寿司5贯", "ムルフェ(韓国風冷製刺身スープ) + 寿司5貫", "Mulhoe (Súp lạnh cá sống kiểu Hàn) + Sushi 5 miếng")),
      it(LD(250000, 300000), null, T("우동 또는 소바 + 모듬튀김", "Udon or Soba + Assorted Tempura", "乌冬面或荞麦面 + 什锦天妇罗", "うどんまたはそば + 天ぷら盛り合わせ", "Udon hoặc Soba + Tempura tổng hợp")),
      it(LD(250000, 300000), null, T("돈까스 + 캘리포니아롤", "Pork Cutlet (Donkatsu) + California Roll", "日式炸猪排(Donkatsu) + 加州卷", "とんかつ(ドンカツ) + カリフォルニアロール", "Cốt lết heo chiên xù (Donkatsu) + California roll")),
    ],
  },
  {
    id: "side",
    name: T("사이드 메뉴", "Side Dishes", "小菜 · 单点", "サイドメニュー", "Món ăn kèm"),
    items: [
      it(1300000, "haemul", T("한국산 모듬 해물", "Assorted Korean Seafood", "韩国产什锦海鲜", "韓国産海鮮盛り合わせ", "Hải sản tổng hợp Hàn Quốc")),
      it(1400000, null, T("크랩 박스", "Crab Box", "蟹盒", "クラブボックス", "Hộp cua")),
      it(500000, null, T("개불 1접시", "Spoon Worm (Gaebul), 1 plate", "海肠 1盘", "ケブル(ユムシ)1皿", "Gaebul (giun biển Hàn Quốc) 1 đĩa")),
      it(550000, null, T("해삼 1접시", "Sea Cucumber, 1 plate", "海参1盘", "ナマコ1皿", "Hải sâm 1 đĩa")),
      it(550000, null, T("멍게 1접시", "Sea Squirt (Meongge), 1 plate", "海鞘1盘", "ホヤ1皿", "Sung biển (Meongge) 1 đĩa")),
      it([["1/2", 500000], ["1", 900000]], null, T("우니 (성게알) 판", "Sea Urchin Roe (Uni) Tray", "海胆(Uni) 板", "ウニ(雲丹)パック", "Khay trứng nhím biển (Uni)")),
      it(200000, null, T("전복 1미", "Abalone, 1 piece", "鲍鱼1只", "アワビ1個", "Bào ngư 1 con")),
      it(650000, null, T("연어 사시미 (300g)", "Salmon Sashimi (300g)", "三文鱼刺身(300克)", "サーモン刺身(300g)", "Sashimi cá hồi (300g)")),
      it(300000, null, T("활새우 사시미 (10마리)", "Live Shrimp Sashimi (10 pcs)", "活虾刺身(10只)", "活き海老の刺身(10尾)", "Sashimi tôm sống (10 con)")),
      it(750000, null, T("메로구이", "Grilled Chilean Sea Bass (Mero)", "烤银鳕鱼(Mero)", "メロの塩焼き", "Cá tuyết bạc nướng (Mero)")),
      it(300000, "ebi_tempura", T("새우튀김 (7마리)", "Shrimp Tempura (7 pcs)", "炸虾(7只)", "海老天(7尾)", "Tôm chiên tempura (7 con)")),
      it(20000, null, T("라면사리", "Extra Ramen Noodles", "加拉面", "ラーメン追加", "Thêm mì ramen")),
      it(20000, null, T("우동사리", "Extra Udon Noodles", "加乌冬面", "うどん追加", "Thêm mì udon")),
      it(20000, null, T("공기밥", "Steamed Rice", "米饭", "ライス", "Cơm trắng")),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Alcohol · Drinks", "酒水 · 饮料", "お酒 · ドリンク", "Rượu · Đồ uống"),
    note: T("외부 주류 반입 시 1병당 콜키지 300,000",
      "Corkage fee for outside alcohol: 300,000 per bottle",
      "自带酒水开瓶费：每瓶 300,000",
      "お酒の持ち込みは1本につきコルク代 300,000",
      "Phí mang rượu từ ngoài vào: 300,000 mỗi chai"),
    items: [
      it(150000, null, T("소주 (참이슬 · 처음처럼 · 진로 · 새로)", "Soju (Chamisul · Chum Churum · Jinro · Saero)", "烧酒(真露Chamisul · 初饮初乐 · Jinro · Saero)", "焼酎(チャミスル · チョウムチョロム · ジンロ · セロ)", "Soju (Chamisul · Chum Churum · Jinro · Saero)")),
      it(70000, null, T("삿뽀로 생맥주", "Sapporo Draft Beer", "札幌生啤", "サッポロ生ビール", "Bia tươi Sapporo")),
      it(60000, null, T("타이거 병맥주", "Tiger Bottled Beer", "虎牌瓶装啤酒", "タイガー瓶ビール", "Bia chai Tiger")),
      it(200000, null, T("막걸리", "Makgeolli (Korean Rice Wine)", "马格利(韩国米酒)", "マッコリ", "Makgeolli (Rượu gạo Hàn Quốc)")),
      it(200000, null, T("청하", "Chungha (Sake)", "清河清酒(Chungha)", "チョンハ(清酒)", "Chungha (Rượu sake Hàn Quốc)")),
      it(300000, null, T("보드카 맨", "Vodka Man", "Vodka Man 伏特加", "ウォッカ マン", "Vodka Man")),
      it(650000, null, T("화요 25", "Hwayo 25", "火曜 Hwayo 25", "火曜(ファヨ)25", "Hwayo 25")),
      it(500000, null, T("복분자", "Bokbunja (Korean Black Raspberry Wine)", "覆盆子酒(Bokbunja)", "覆盆子酒(ポクブンジャ)", "Bokbunja (Rượu phúc bồn tử Hàn Quốc)")),
      it(300000, null, T("백세주", "Baekseju", "百岁酒(Baekseju)", "ペクセジュ(百歳酒)", "Baekseju")),
      it(1850000, null, T("쿠보타 준마이 다이긴조 720ml", "Kubota Junmai Daiginjo 720ml", "久保田 纯米大吟酿 720ml", "久保田 純米大吟醸 720ml", "Kubota Junmai Daiginjo 720ml")),
      it(1850000, null, T("닷사이 준마이 다이긴조 45 720ml", "Dassai Junmai Daiginjo 45 720ml", "獭祭 纯米大吟酿45 720ml", "獺祭 純米大吟醸45 720ml", "Dassai Junmai Daiginjo 45 720ml")),
      it([["720ml", 850000], ["1.8L", 1500000]], null, T("에츠노 하지메 (사케)", "Etsuno Hajime (Sake)", "越乃初(Etsuno Hajime)清酒", "越の初 エツノハジメ(日本酒)", "Etsuno Hajime (Rượu sake)")),
      it(30000, null, T("음료수 (콜라 · 환타 · 스프라이트)", "Soft Drinks (Coke · Fanta · Sprite)", "饮料(可乐 · 芬达 · 雪碧)", "ソフトドリンク(コーラ · ファンタ · スプライト)", "Nước ngọt (Coca · Fanta · Sprite)")),
    ],
  },
];
