// 정성(JUNGSUNG) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(2026-11-09 수집, 대부분 손님이 올림)
// 검은 포스터(menu_01·04~07·13·15·28~32) + 흰 메뉴책(menu_09~12·14·18·20·22~24) + 점심특선·신메뉴 안내(menu_25·26)를 합침.
// 판끼리 다른 가격은 높은 쪽: 면사리 50K(메뉴책 30K) · 한우 미나리 육회 600K(메뉴책 500K) · 해물칼국수 220K(메뉴책 200K) (docs/todo.md)
// 숙성 돼지고기 1인분 무게는 포스터 180g, 메뉴책 150g로 달라 무게는 안 씀. 메뉴판에 'VAT 별도'.
// 안티그래비티(제미나이) 판독 → 운영 감찰관(agy Claude Sonnet) 재대조: 가격 차이 0, 빠진 것 '수제만두 반반' 1건 반영
// price: 한 가지 가격 / sizes: [["라벨", 가격], ...] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "정성", en: "JUNGSUNG" },
  phone: "0812 463 798",
  address: "Ô đất CT8, The Emerald, Đ. Mỹ Đình – Mễ Trì, KĐT Mới, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:00 – 22:00", // 구글 지도 '오전 11:00~오후 10:00'. 메뉴판엔 점심특선 시간(평일 11:00~14:00)만 있음
};

const T = (ko, en = "", zh = "", ja = "", vi = "") => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "signature",
    name: T("정성 시그니처", "Jungsung Signature", "JUNGSUNG 招牌菜", "JUNGSUNG シグネチャー", "Món đặc trưng của nhà hàng"),
    items: [
      it([["300g", 1400000], ["500g", 2300000]], "cube", T("큐브 꽃살 스테이크", "Cube Flower-Cut Steak (Cube Kkotsal Steak)", "方块花腹肉牛排（Kkotsal）", "キューブ花サル ステーキ（コッサル）", "Bít tết thịt hoa cắt vuông (Kkotsal)"), { tag: "must", desc: T("눈꽃처럼 부드럽고 육즙이 풍부한 꽃살", "Snowflake-marbled, tender and juicy flower-cut beef", "如雪花般细腻柔嫩、肉汁丰盈的花腹肉", "雪の花のように柔らかく、肉汁たっぷりの花サル", "Thịt hoa vân mỡ như tuyết, mềm và nhiều nước thịt") }),
      it(580000, null, T("프라임 안창살", "Prime Inside Skirt Steak (Anchangsal)", "特级牛横膈膜（Anchangsal）", "プライム ハラミ（アンチャンサル）", "Thịt hoành bò thượng hạng (Anchangsal)"), { desc: T("1인 150g", "150g per person", "每人150g", "1人前 150g", "150g/người") }),
      it(630000, null, T("한우 차돌박이", "Hanwoo Beef Brisket (Chadolbaegi)", "韩牛牛胸肉薄片（Chadolbaegi）", "韓牛チャドルバギ（牛バラ薄切り）", "Thịt ngực bò Hanwoo thái mỏng (Chadolbaegi)"), { desc: T("1인 150g", "150g per person", "每人150g", "1人前 150g", "150g/người") }),
      it(800000, null, T("차돌삼합", "Brisket Samhap (Chadol Samhap)", "牛胸肉三合（Chadol Samhap）", "チャドル三合（サムハプ）", "Chadol Samhap (bò ngực, sò điệp, kimchi)"), { tag: "best", desc: T("1인 150g · 한우 차돌박이 + 키조개 관자 + 김치(갓김치·파김치) + 버섯", "150g per person · Hanwoo brisket + king scallop + kimchi (mustard green & green onion) + mushrooms", "每人150g · 韩牛牛胸肉 + 扇贝柱 + 泡菜（芥菜泡菜·小葱泡菜）+ 蘑菇", "1人前 150g ・ 韓牛チャドルバギ + ホタテ貝柱 + キムチ（カラシナ・ネギ）+ きのこ", "150g/người · Thịt ngực bò Hanwoo + sò điệp + kim chi (cải cay, hành lá) + nấm") }),
      it(200000, null, T("차돌삼합 관자 추가 (8쪽)", "Extra Scallops for Chadol Samhap (8 pcs)", "三合加扇贝柱（8块）", "チャドル三合 ホタテ追加（8個）", "Thêm sò điệp cho Chadol Samhap (8 miếng)")),
      it(1200000, null, T("보일링 시푸드", "Boiling Seafood", "香辣水煮海鲜", "ボイリングシーフード", "Hải sản luộc cay (Boiling Seafood)"), { spicy: true, desc: T("3~4인 · 신선한 해산물에 매콤한 특제 시즈닝", "3–4 people · Fresh seafood with a spicy house seasoning", "3~4人 · 新鲜海鲜配香辣特制调料", "3〜4人前 ・ 新鮮な海鮮にピリ辛の特製シーズニング", "3–4 người · Hải sản tươi với gia vị cay đặc chế") }),
      it(800000, "shrimp", T("보일링 쉬림프", "Boiling Shrimp", "香辣水煮虾", "ボイリングシュリンプ", "Tôm luộc cay (Boiling Shrimp)"), { tag: "best", spicy: true, desc: T("2인 · 매콤한 특제 시즈닝 새우 요리", "2 people · Shrimp with a spicy house seasoning", "2人 · 香辣特制调料虾", "2人前 ・ ピリ辛特製シーズニングのエビ料理", "2 người · Tôm với gia vị cay đặc chế") }),
      it(100000, null, T("보일링 면 추가", "Extra Noodles for Boiling", "水煮加面", "ボイリング 麺追加", "Thêm mì cho món Boiling")),
      it(80000, null, T("보일링 빵 추가", "Extra Bread for Boiling", "水煮加面包", "ボイリング パン追加", "Thêm bánh mì cho món Boiling")),
    ],
  },
  {
    id: "set",
    name: T("세트 메뉴", "Set Menu", "套餐", "セットメニュー", "Set thịt nướng"),
    items: [
      it([["소 300g", 1100000], ["대 500g", 1700000]], null, T("소고기 모둠", "Assorted Beef Platter (Sogogi Modum)", "牛肉拼盘", "牛肉盛り合わせ（ソゴギ モドゥム）", "Combo thịt bò"), { desc: T("소: 한우 차돌박이·꽃갈비살·늑간살 / 대: + 안창살·살치살", "Small: Hanwoo brisket, flower rib meat, rib finger meat / Large: + inside skirt, marbled chuck flap", "小份：韩牛牛胸肉·花排肉·肋间肉 / 大份：+ 横膈膜·雪花肉", "小：韓牛チャドルバギ・花カルビ・ルンガムサル / 大：＋ハラミ・サルチサル", "Nhỏ: ngực bò Hanwoo, sườn hoa, thịt sườn non / Lớn: + thịt hoành, thịt vai bò vân mỡ") }),
      it([["소 300g", 480000], ["대 500g", 780000]], null, T("돼지고기 모둠", "Assorted Pork Platter (Dwaejigogi Modum)", "猪肉拼盘", "豚肉盛り合わせ（テジゴギ モドゥム）", "Combo thịt heo"), { desc: T("소: 삼겹살·목살·항정살 / 대: + 꼬들살", "Small: pork belly, pork neck, pork jowl / Large: + pork skirt meat", "小份：五花肉·猪颈肉·猪颈脂 / 大份：+ 猪横膈肉", "小：サムギョプサル・豚肩ロース・豚トロ / 大：＋コドゥルサル", "Nhỏ: ba chỉ, thịt cổ, thịt má heo / Lớn: + thịt cơ hoành heo") }),
    ],
  },
  {
    id: "beef",
    name: T("프리미엄 소고기", "Premium Beef", "优质牛肉", "プレミアム牛肉", "Thịt bò cao cấp"),
    note: T("1인 150g", "150g per person", "每人150g", "1人前 150g", "150g/người"),
    items: [
      it(680000, null, T("꽃갈비살", "Flower Rib Meat (Kkotgalbisal)", "花排肉（Kkotgalbisal，肋排上方的花纹牛肉）", "花カルビ（コッカルビサル）", "Thịt sườn hoa (Kkotgalbisal)")),
      it(500000, null, T("살치살", "Marbled Chuck Flap (Salchisal)", "雪花牛肩肉（Salchisal）", "サルチサル（肩ロースの霜降り）", "Thịt vai bò vân mỡ (Salchisal)")),
      it(480000, null, T("안창살", "Inside Skirt Steak (Anchangsal)", "牛横膈膜（Anchangsal）", "ハラミ（アンチャンサル）", "Thịt hoành bò (Anchangsal)")),
      it(380000, null, T("늑간살", "Rib Finger Meat (Neukgansal)", "肋间肉（Neukgansal）", "ルンガムサル（肋骨の間の肉）", "Thịt sườn non giữa xương (Neukgansal)")),
      it(380000, null, T("토시살", "Hanger Steak (Tosisal)", "牛膈肌肉（Tosisal）", "トシサル（ハラミ近くの横隔膜の肉）", "Thịt thăn treo bò (Tosisal)")),
    ],
  },
  {
    id: "pork",
    name: T("숙성 돼지고기", "Aged Pork", "熟成猪肉", "熟成豚肉", "Thịt heo ủ lạnh"),
    note: T("1인분 · 저온 숙성 돼지고기", "Per serving · Low-temperature aged pork", "每份 · 低温熟成猪肉", "1人前 ・ 低温熟成豚肉", "Khẩu phần 1 người · Thịt heo ủ lạnh ở nhiệt độ thấp"),
    items: [
      it(290000, null, T("항정살", "Pork Jowl (Hangjeongsal)", "猪颈脂肉（Hangjeongsal）", "豚トロ（ハンジョンサル）", "Thịt má heo (Hangjeongsal)")),
      it(240000, null, T("꼬들살", "Pork Skirt Meat (Kkodeulsal)", "猪横膈肉（Kkodeulsal）", "コドゥルサル（豚の横隔膜周りの肉）", "Thịt cơ hoành heo (Kkodeulsal)")),
      it(220000, null, T("삼겹살", "Pork Belly (Samgyeopsal)", "五花肉（Samgyeopsal）", "サムギョプサル", "Ba chỉ heo (Samgyeopsal)")),
      it(220000, null, T("목살", "Pork Neck (Moksal)", "猪颈肉（Moksal）", "豚肩ロース（モクサル）", "Thịt cổ heo (Moksal)")),
      it(240000, null, T("족구이", "Grilled Pig's Feet (Jokgui)", "烤猪蹄（Jokgui）", "豚足焼き（チョッグイ）", "Chân giò heo nướng (Jokgui)"), { desc: T("1인 300g", "300g per person", "每人300g", "1人前 300g", "300g/người") }),
    ],
  },
  {
    id: "marinated",
    name: T("양념류", "Marinated Meats", "腌制烤肉", "味付け肉", "Thịt tẩm ướp"),
    items: [
      it(550000, null, T("LA갈비", "LA Galbi (Marinated Short Ribs)", "LA烤牛排骨", "LAカルビ", "Sườn bò LA (LA Galbi)"), { desc: T("1인 250g", "250g per person", "每人250g", "1人前 250g", "250g/người") }),
      it(380000, null, T("양념 늑간살", "Marinated Rib Finger Meat (Yangnyeom Neukgansal)", "腌制肋间肉（Yangnyeom Neukgansal）", "味付けルンガムサル（ヤンニョム ヌッカンサル）", "Thịt sườn non tẩm ướp (Yangnyeom Neukgansal)"), { desc: T("1인 150g", "150g per person", "每人150g", "1人前 150g", "150g/người") }),
      it(250000, null, T("양념 우삼겹", "Marinated Beef Short Plate (Yangnyeom Usamgyeop)", "腌制牛五花（Yangnyeom Usamgyeop）", "味付け牛バラ（ヤンニョム ウサムギョプ）", "Ba chỉ bò tẩm ướp (Yangnyeom Usamgyeop)"), { desc: T("1인 150g", "150g per person", "每人150g", "1人前 150g", "150g/người") }),
      it(280000, null, T("진 돼지갈비", "Jin Pork Galbi (Marinated Pork Ribs)", "特制腌猪排（Jin Dwaeji Galbi）", "ジン豚カルビ（味付け豚カルビ）", "Sườn heo tẩm ướp (Jin Dwaeji Galbi)"), { desc: T("1인 250g", "250g per person", "每人250g", "1人前 250g", "250g/người") }),
    ],
  },
  {
    id: "grill",
    name: T("구이 곁들임", "Grill Sides", "烧烤配菜", "焼き物のおかず", "Món nướng ăn kèm"),
    items: [
      it(300000, null, T("매콤 불오징어", "Spicy Grilled Squid (Maekom Bul-ojingeo)", "香辣火烤鱿鱼", "ピリ辛 焼きイカ（プルオジンオ）", "Mực nướng cay"), { spicy: true, desc: T("1마리", "1 squid", "1只", "1杯", "1 con") }),
      it(250000, null, T("새우구이", "Grilled Shrimp (Saeu-gui)", "烤虾", "エビの塩焼き", "Tôm nướng"), { desc: T("10마리", "10 pieces", "10只", "10尾", "10 con") }),
      it(200000, null, T("키조개 관자", "King Scallop Adductor (Kijogae Gwanja)", "扇贝柱", "ホタテ貝柱", "Sò điệp"), { desc: T("8쪽", "8 pieces", "8块", "8個", "8 miếng") }),
      it(100000, null, T("한치구이", "Grilled Hanchi Squid (Hanchi-gui)", "烤小鱿鱼（Hanchi）", "ヤリイカ焼き（ハンチ）", "Mực hanchi nướng"), { desc: T("1마리", "1 squid", "1只", "1杯", "1 con") }),
      it(50000, null, T("모둠 구이 야채", "Assorted Grilled Vegetables", "什锦烤蔬菜", "焼き野菜盛り合わせ", "Rau nướng tổng hợp")),
    ],
  },
  {
    id: "special",
    name: T("정성 스페셜", "Jungsung Specials", "JUNGSUNG 特色菜", "JUNGSUNG スペシャル", "Món đặc biệt"),
    items: [
      it(340000, null, T("샤브샤브", "Shabu-Shabu", "涮涮锅", "しゃぶしゃぶ", "Lẩu Shabu-shabu"), { desc: T("1인 · 2인 이상 주문", "Per person · Minimum 2 orders", "每人 · 2人起点", "1人前 ・ 2人前から注文可", "Giá/người · Gọi từ 2 người") }),
      it(700000, null, T("산더미 불고기", "Mountain-High Bulgogi (Sandeomi Bulgogi)", "小山般的烤肉（Sandeomi Bulgogi）", "山盛りプルコギ（サンドミ プルコギ）", "Bulgogi núi (Sandeomi Bulgogi)"), { spicy: true, desc: T("2~3인 · 매콤한 불고기", "2–3 people · Spicy bulgogi", "2~3人 · 香辣烤肉", "2〜3人前 ・ ピリ辛プルコギ", "2–3 người · Bulgogi cay") }),
      it(600000, "yukhoe", T("한우 미나리 육회", "Hanwoo Beef Tartare with Minari (Hanwoo Minari Yukhoe)", "韩牛芹菜生拌牛肉（Yukhoe）", "韓牛セリのユッケ", "Gỏi bò Hanwoo rau cần nước (Yukhoe)"), { tag: "must" }),
      it(600000, null, T("얼큰 해장 전골", "Spicy Hangover Hot Pot (Eolkeun Haejang Jeongol)", "辣味醒酒火锅（Eolkeun Haejang Jeongol）", "ピリ辛 解酒チョンゴル（二日酔い鍋）", "Lẩu giải rượu cay (Eolkeun Haejang Jeongol)"), { spicy: true, desc: T("공기밥 별도", "Rice served separately", "米饭另点", "ご飯は別料金", "Cơm gọi riêng") }),
      it(500000, null, T("고기듬뿍 김치전골", "Kimchi Hot Pot with Plenty of Meat (Gogi Deumppuk Kimchi Jeongol)", "满满肉的泡菜火锅（Kimchi Jeongol）", "お肉たっぷり キムチチョンゴル", "Lẩu kim chi nhiều thịt (Kimchi Jeongol)"), { spicy: true, desc: T("공기밥 별도", "Rice served separately", "米饭另点", "ご飯は別料金", "Cơm gọi riêng") }),
      it(600000, null, T("모둠 해물 구이", "Assorted Grilled Seafood (Modum Haemul Gui)", "什锦烤海鲜", "海鮮焼き盛り合わせ", "Hải sản nướng tổng hợp"), { tag: "special", desc: T("불오징어 + 양념 쭈꾸미 + 새우", "Grilled squid + marinated webfoot octopus + shrimp", "火烤鱿鱼 + 腌制小章鱼 + 虾", "焼きイカ + 味付けイイダコ + エビ", "Mực nướng + bạch tuộc nhỏ tẩm ướp + tôm") }),
      it(180000, null, T("고기 추가", "Extra Meat", "加肉", "お肉追加", "Thêm thịt")),
      it(60000, null, T("야채 추가", "Extra Vegetables", "加蔬菜", "野菜追加", "Thêm rau")),
      it(50000, null, T("면사리", "Extra Noodles (Myeonsari)", "加面条", "麺追加（ミョンサリ）", "Thêm mì")),
      it(50000, null, T("당면사리", "Extra Glass Noodles (Dangmyeonsari)", "加粉丝", "春雨追加（タンミョンサリ）", "Thêm miến")),
      it(30000, null, T("죽 추가", "Extra Porridge (Juk)", "加粥", "お粥追加（ジュク）", "Thêm cháo")),
    ],
    tip: T("추가 메뉴는 1인 1메뉴 주문 시 가능", "Add-ons are available when each person orders one menu item", "每人点一道菜时方可加点", "追加メニューは1人1品ご注文の場合にご利用いただけます", "Món gọi thêm áp dụng khi mỗi người gọi 1 món"),
  },
  {
    id: "side",
    name: T("사이드", "Sides", "小菜", "サイド", "Món ăn kèm"),
    items: [
      it(500000, null, T("새우 소금구이", "Salt-Grilled Shrimp (Saeu Sogeum-gui)", "盐烤虾", "エビの塩焼き", "Tôm nướng muối"), { desc: T("600g · 새우 머리 버터구이 포함", "600g · Includes butter-grilled shrimp heads", "600g · 含黄油烤虾头", "600g ・ エビの頭のバター焼き付き", "600g · Kèm đầu tôm nướng bơ") }),
      it(430000, null, T("철판 오징어볶음", "Sizzling Stir-Fried Squid (Cheolpan Ojingeo-bokkeum)", "铁板炒鱿鱼（Ojingeo-bokkeum）", "鉄板イカ炒め（オジンオポックム）", "Mực xào áp chảo"), { spicy: true, desc: T("소면 포함 · 2인 이상 추천", "Includes thin noodles · Recommended for 2 or more", "含细面条 · 推荐2人以上", "素麺付き ・ 2人以上におすすめ", "Kèm mì sợi nhỏ · Phù hợp từ 2 người") }),
      it(50000, null, T("소면 추가", "Extra Thin Noodles (Somyeon)", "加细面条", "素麺追加（ソミョン）", "Thêm mì sợi nhỏ")),
      it(300000, null, T("냉제육", "Cold Sliced Pork (Naengjeyuk)", "冷拌猪肉（Naengjeyuk）", "冷製豚肉（ネンジェユク）", "Thịt heo luộc nguội (Naengjeyuk)")),
      it(150000, null, T("수제만두 (고기 · 김치 · 반반)", "Handmade Dumplings (Meat · Kimchi · Half & Half) (Sujae Mandu)", "手工饺子（肉馅 · 泡菜馅 · 各半）", "手作り餃子（肉・キムチ・半々）（スジェ マンドゥ）", "Bánh xếp thủ công (nhân thịt · kim chi · mỗi loại một nửa)")),
    ],
  },
  {
    id: "meal",
    name: T("식사류", "Meals", "主食", "お食事", "Món cơm và món nước"),
    items: [
      it(200000, null, T("경상도식 장터국밥", "Gyeongsang-Style Market Gukbap (Gyeongsangdo-sik Jangteo Gukbap)", "庆尚道式市场汤饭（Jangteo Gukbap）", "慶尚道風 市場クッパ（チャントクッパ）", "Cháo cơm bò kiểu Gyeongsang (Jangteo Gukbap)"), { spicy: true }),
      it(180000, null, T("김치찌개 (참치 · 돼지고기)", "Kimchi Stew (Tuna · Pork) (Kimchi-jjigae)", "泡菜汤（金枪鱼 · 猪肉）（Kimchi-jjigae）", "キムチチゲ（ツナ・豚肉）", "Canh kim chi (cá ngừ · thịt heo)"), { spicy: true }),
      it(180000, null, T("우삼겹 된장찌개", "Beef Brisket Soybean Paste Stew (Usamgyeop Doenjang-jjigae)", "牛五花大酱汤（Usamgyeop Doenjang-jjigae）", "牛バラ入り味噌チゲ（ウサムギョプ テンジャンチゲ）", "Canh tương đậu bò ba chỉ (Usamgyeop Doenjang-jjigae)")),
      it(180000, null, T("충남식 애호박찌개", "Chungnam-Style Zucchini Stew (Chungnam-sik Aehobak-jjigae)", "忠南式西葫芦汤（Aehobak-jjigae）", "忠清南道風 ズッキーニチゲ（エホバクチゲ）", "Canh bí ngòi kiểu Chungnam (Aehobak-jjigae)"), { spicy: true }),
      it(220000, "kalguksu", T("해물 칼국수", "Seafood Knife-Cut Noodle Soup (Haemul Kalguksu)", "海鲜刀削面汤（Haemul Kalguksu）", "海鮮カルグクス", "Mì cắt tay hải sản (Haemul Kalguksu)"), { desc: T("수제비 · 칼제비로 변경 가능", "Can be changed to sujebi (hand-torn dough) or kaljebi (mixed)", "可换成面片汤（Sujebi）或刀削面片混合（Kaljebi）", "スジェビ・カルジェビに変更可能", "Có thể đổi sang sujebi (bột vắt) hoặc kaljebi (mì + bột vắt)") }),
      it(200000, null, T("얼큰 칼국수", "Spicy Knife-Cut Noodle Soup (Eolkeun Kalguksu)", "香辣刀削面汤（Eolkeun Kalguksu）", "ピリ辛カルグクス", "Mì cắt tay cay (Eolkeun Kalguksu)"), { spicy: true, desc: T("수제비 · 칼제비로 변경 가능", "Can be changed to sujebi (hand-torn dough) or kaljebi (mixed)", "可换成面片汤（Sujebi）或刀削面片混合（Kaljebi）", "スジェビ・カルジェビに変更可能", "Có thể đổi sang sujebi (bột vắt) hoặc kaljebi (mì + bột vắt)") }),
      it(200000, null, T("얼큰 만두국", "Spicy Dumpling Soup (Eolkeun Mandu-guk)", "香辣饺子汤（Eolkeun Mandu-guk）", "ピリ辛 餃子スープ（マンドゥクク）", "Canh bánh xếp cay (Eolkeun Mandu-guk)"), { spicy: true }),
      it([["식사", 200000], ["후식", 100000]], "naengmyeon", T("물냉면", "Cold Buckwheat Noodles in Broth (Mul Naengmyeon)", "冷面（汤）（Mul Naengmyeon）", "水冷麺（ムルネンミョン）", "Mì lạnh nước (Mul Naengmyeon)")),
      it([["식사", 200000], ["후식", 100000]], null, T("비빔냉면", "Spicy Mixed Cold Noodles (Bibim Naengmyeon)", "辣拌冷面（Bibim Naengmyeon）", "ビビン冷麺（ビビンネンミョン）", "Mì lạnh trộn cay (Bibim Naengmyeon)"), { spicy: true }),
      it(200000, "jeyuk", T("김치 제육볶음", "Kimchi Stir-Fried Spicy Pork (Kimchi Jeyuk-bokkeum)", "泡菜辣炒猪肉（Jeyuk-bokkeum）", "キムチ豚肉炒め（ジェユクポックム）", "Thịt heo xào kim chi cay (Jeyuk-bokkeum)"), { spicy: true, desc: T("밥 포함", "Rice included", "含米饭", "ご飯付き", "Kèm cơm") }),
      it(80000, null, T("납작 불고기", "Flat Bulgogi (Napjak Bulgogi)", "薄片烤肉（Napjak Bulgogi）", "薄切りプルコギ（ナプチャク プルコギ）", "Bulgogi bò thái mỏng (Napjak Bulgogi)")),
      it(50000, null, T("계란찜", "Steamed Egg (Gyeran-jjim)", "蒸蛋", "韓国風茶碗蒸し（ケランチム）", "Trứng hấp (Gyeran-jjim)")),
      it(20000, null, T("계란 후라이", "Fried Egg", "煎蛋", "目玉焼き", "Trứng ốp la")),
      it(20000, null, T("공기밥", "Steamed Rice (Gongibap)", "米饭", "ご飯", "Cơm trắng")),
    ],
  },
  {
    id: "lunch",
    name: T("점심 특선", "Lunch Specials", "午间特餐", "ランチ特選", "Set trưa đặc biệt"),
    note: T("평일 11:00 – 14:00", "Weekdays 11:00 – 14:00", "工作日 11:00 – 14:00", "平日 11:00 – 14:00", "Ngày thường 11:00 – 14:00"),
    items: [
      it(320000, null, T("샤브샤브 세트", "Shabu-Shabu Set", "涮涮锅套餐", "しゃぶしゃぶセット", "Set lẩu Shabu-shabu"), { desc: T("정가 370K · 샤브샤브 + 죽 또는 면사리 · 2인 이상", "Regular price 370K · Shabu-shabu + porridge or noodles · 2 or more people", "原价 370K · 涮涮锅 + 粥或面条 · 2人以上", "定価 370K ・ しゃぶしゃぶ + お粥または麺 ・ 2人以上", "Giá gốc 370K · Shabu-shabu + cháo hoặc mì · Từ 2 người") }),
      it(200000, null, T("정성 파스타", "Jungsung Pasta", "JUNGSUNG 意面", "JUNGSUNG パスタ", "Mì Ý Jungsung"), { desc: T("정가 220K · 실속형 보일링 쉬림프", "Regular price 220K · Value-size boiling shrimp", "原价 220K · 实惠版香辣水煮虾", "定価 220K ・ お得なボイリングシュリンプ", "Giá gốc 220K · Tôm luộc cay phần tiết kiệm") }),
      it(250000, null, T("만두 + 면 세트", "Dumpling + Noodle Set (Mandu + Myeon Set)", "饺子 + 面套餐", "餃子＋麺セット", "Set bánh xếp + mì"), { desc: T("정가 275K · 고기만두 2 + 김치만두 2 + 면 택1(얼큰 칼국수·해물 칼국수·물냉면·비빔냉면)", "Regular price 275K · 2 meat dumplings + 2 kimchi dumplings + 1 noodle of choice (spicy kalguksu, seafood kalguksu, mul naengmyeon, bibim naengmyeon)", "原价 275K · 肉馅饺子2个 + 泡菜饺子2个 + 面条任选1种（香辣刀削面·海鲜刀削面·冷面汤·辣拌冷面）", "定価 275K ・ 肉餃子2個 + キムチ餃子2個 + 麺1品選択（ピリ辛カルグクス・海鮮カルグクス・水冷麺・ビビン冷麺）", "Giá gốc 275K · 2 bánh xếp thịt + 2 bánh xếp kim chi + chọn 1 loại mì (mì cắt tay cay, mì cắt tay hải sản, mì lạnh nước, mì lạnh trộn)") }),
    ],
  },
  {
    id: "alcohol",
    name: T("주류", "Alcohol", "酒类", "お酒", "Đồ uống có cồn"),
    items: [
      it(900000, null, T("일품진로", "Ilpum Jinro", "Ilpum Jinro（一品真露）", "一品眞露（イルプム ジンロ）", "Ilpum Jinro")),
      it(400000, null, T("화요 17°", "Hwayo 17°", "Hwayo 17°（火曜烧酒）", "火曜 17°（ファヨ）", "Hwayo 17°")),
      it(400000, null, T("설원 (450ml)", "Seolwon (450ml)", "Seolwon（雪原）450ml", "雪原（ソルォン）450ml", "Seolwon (450ml)")),
      it(500000, null, T("연태고량주 (250ml)", "Yantai Gaoliang Liquor (250ml)", "烟台高粱酒 250ml", "煙台高粱酒 250ml", "Rượu Yantai Gaoliang (250ml)")),
      it(350000, null, T("보해 복분자", "Bohae Bokbunja", "Bohae 覆盆子酒", "ボヘ 復盆子酒（ポクプンジャ）", "Bohae Bokbunja (rượu mâm xôi đen)")),
      it(250000, null, T("백세주", "Baekseju", "百岁酒（Baekseju）", "百歳酒（ペクセジュ）", "Baekseju")),
      it(250000, null, T("별빛청하", "Byeolbit Cheongha", "Byeolbit Cheongha（星光清河）", "星明かり 清河（ピョルビッ チョンハ）", "Byeolbit Cheongha")),
      it(180000, null, T("막걸리", "Makgeolli", "马格利米酒（Makgeolli）", "マッコリ", "Rượu gạo Makgeolli")),
      it(150000, null, T("참이슬", "Chamisul", "真露 Chamisul", "チャミスル", "Chamisul")),
      it(150000, null, T("처음처럼", "Chum-churum", "初饮初乐 Chum-churum", "チョウムチョロム", "Chum-churum")),
      it(150000, null, T("새로", "Saero", "Saero 烧酒", "セロ", "Saero")),
      it(150000, null, T("진로이즈백", "Jinro Is Back", "Jinro Is Back（真露）", "ジンロ イズバック", "Jinro Is Back")),
      it(150000, null, T("선양", "Sunyang", "Sunyang 烧酒", "ソニャン", "Sunyang")),
      it(150000, null, T("좋은데이", "Good Day", "Good Day 烧酒", "チョウンデイ", "Good Day")),
      it(180000, null, T("선양 오크", "Sunyang Oak", "Sunyang Oak 烧酒", "ソニャン オーク", "Sunyang Oak")),
      it(50000, null, T("타이거", "Tiger", "Tiger 啤酒（虎牌）", "タイガービール", "Bia Tiger")),
      it(50000, null, T("타이거 크리스탈", "Tiger Crystal", "Tiger Crystal 啤酒", "タイガー クリスタル", "Bia Tiger Crystal")),
      it(50000, null, T("사이공", "Saigon", "Saigon 啤酒（西贡）", "サイゴンビール", "Bia Sài Gòn")),
      it(70000, null, T("삿포로 생맥주", "Sapporo Draft Beer", "札幌生啤", "サッポロ生ビール", "Bia tươi Sapporo")),
    ],
  },
  {
    id: "drink",
    name: T("음료", "Drinks", "饮料", "ドリンク", "Nước giải khát"),
    items: [
      it(30000, null, T("코카콜라", "Coca-Cola", "可口可乐", "コカ・コーラ", "Coca-Cola")),
      it(30000, null, T("코카콜라 제로", "Coca-Cola Zero", "零度可口可乐", "コカ・コーラ ゼロ", "Coca-Cola Zero")),
      it(30000, null, T("스프라이트", "Sprite", "雪碧", "スプライト", "Sprite")),
      it(30000, null, T("환타 오렌지", "Fanta Orange", "芬达橙味", "ファンタ オレンジ", "Fanta cam")),
      it(40000, null, T("솔의 눈", "Sol-ui Nun (Pine Bud Soda)", "松芽汽水（Sol-ui Nun）", "ソルの目（松の芽ソーダ）", "Sol-ui Nun (soda nụ thông)")),
      it(200000, null, T("홍초", "Hongcho (Red Vinegar Drink)", "红醋饮（Hongcho）", "紅酢ドリンク（ホンチョ）", "Hongcho (nước giấm đỏ)")),
    ],
  },
];
