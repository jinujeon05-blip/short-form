// 일류 사시미(IL RYU Korean Sashimi) 메뉴 데이터 — 출처: 구글 지도 손님 메뉴판 사진(2026-11-09 수집)
// 파란 테두리 새 판(menu_01·03·04·05·06·07·15·16)을 씀. 분홍 꽃무늬 판(menu_08~14: 사시미 소·중·대, 소주 120K·맥주 60K)은
// 주류 값이 더 낮아 옛 판으로 봄 → 안 씀(계절 황적퉁돔회·담배 포함, docs/todo.md)
// 같은 값이 두 번 적힌 것(단품 판의 1인 회 3개, Special의 갑오징어 = 회 메뉴 갑오징어 2인)은 한 번만 넣음
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "일류 사시미", en: "IL RYU Korean Sashimi" },
  phone: "039 218 5251",
  address: "176 Đ. Đình Thôn, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:00 – 14:00 · 16:00 – 22:30", // 구글 지도 '오전 11:00~오후 2:00 / 오후 4:00~10:30'. 메뉴판엔 시간 없음
};

const T = (ko, en = "", zh = "", ja = "", vi = "") => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "set",
    name: T("회 세트", "Sashimi Sets", "生鱼片套餐", "刺身セット", "Set sashimi"),
    note: T(
      "세트는 스끼다시(곁들이 요리) 포함 · 1인 세트는 10가지 · 호박죽·계란찜·탕수 열기·샐러드·오징어볶음·두부구이·새우깡·야채튀김·조개탕·초밥·치킨강정·마늘꼬치·감자전·매운탕·과일 중에서 나와요",
      "Sets include sukidashi (Japanese-style small side dishes). A set for 1 comes with 10 of these: pumpkin porridge, steamed egg, sweet and sour dish, salad, stir-fried squid, grilled tofu, shrimp crackers, vegetable tempura, clam soup, sushi, sweet crispy chicken, garlic skewers, potato pancake, spicy fish stew, fruit",
      "套餐含小菜（日式前菜）。1人套餐含10种，从以下选出：南瓜粥、蒸蛋、糖醋类菜品、沙拉、炒鱿鱼、烤豆腐、虾片、蔬菜天妇罗、蛤蜊汤、寿司、甜辣炸鸡、蒜串、土豆饼、辣鱼汤、水果",
      "セットには突き出し（付け合わせ）が付きます。1人前セットは10品で、かぼちゃ粥・茶碗蒸し・酢豚風料理・サラダ・イカ炒め・焼き豆腐・えびせん・野菜天ぷら・あさり汁・寿司・甘辛チキン・ガーリック串・じゃがいもチヂミ・辛い魚鍋・フルーツの中から出ます",
      "Set đã gồm các món ăn kèm (sukidashi). Set 1 người có 10 món, chọn trong: cháo bí đỏ, trứng hấp, món chua ngọt, salad, mực xào, đậu phụ nướng, bánh phồng tôm, rau củ chiên giòn, canh nghêu, sushi, gà rán sốt ngọt cay, xiên tỏi, bánh khoai tây, lẩu cá cay, trái cây"
    ),
    items: [
      it([["1P", 750000], ["2P", 1400000], ["3P", 1900000], ["4P", 2400000]], "moduem", T("모듬회 세트 (다금바리·병어·흑돔)", "Assorted Sashimi Set (Grouper · Pomfret · Black Sea Bream)", "拼盘生鱼片套餐（九孔鲈·鲳鱼·黑鲷）", "盛り合わせ刺身セット（ハタ・マナガツオ・クロダイ）", "Cá tổng hợp (Cá song - Cá chim - Cá thác)"), { tag: "must" }),
      it([["1P", 1050000], ["2P", 2000000], ["3P", 2800000], ["4P", 3600000]], null, T("광어회 세트", "Flatfish Sashimi Set (Gwangeo-hoe)", "比目鱼生鱼片套餐", "ヒラメ刺身セット", "Cá bơn (JEJU)"), { tag: "best", desc: T("제주 광어", "Jeju olive flounder", "济州比目鱼", "済州島産ヒラメ", "Cá bơn đảo Jeju") }),
      it([["2P", 1500000], ["3P", 2100000], ["4P", 2700000]], null, T("다금바리회 세트", "Grouper Sashimi Set (Dageumbari-hoe)", "九孔鲈生鱼片套餐", "ハタ刺身セット", "Cá song")),
      it([["2P", 1400000], ["3P", 1900000], ["4P", 2400000]], null, T("병어회 세트", "Pomfret Sashimi Set (Byeongeo-hoe)", "鲳鱼生鱼片套餐", "マナガツオ刺身セット", "Cá chim")),
      it([["2P", 1400000], ["3P", 1900000], ["4P", 2400000]], null, T("흑돔회 세트", "Black Sea Bream Sashimi Set (Heukdom-hoe)", "黑鲷生鱼片套餐", "クロダイ刺身セット", "Cá thác")),
      it([["2P", 1500000]], null, T("갑오징어회 세트", "Cuttlefish Sashimi Set (Gabojingeo-hoe)", "墨鱼生鱼片套餐", "コウイカ刺身セット", "Set sashimi mực nang (cuttlefish)")),
    ],
  },
  {
    id: "sashimi",
    name: T("회 단품", "Sashimi à la carte", "单点生鱼片", "刺身単品", "Sashimi gọi lẻ"),
    note: T(
      "기본 쌈채소·소스·백김치 포함",
      "Includes lettuce wraps, sauce and white kimchi",
      "含基础生菜等包饭蔬菜、酱料和白泡菜",
      "サンチュなどの包み野菜・ソース・白キムチ付き",
      "Kèm rau cuốn, nước chấm và kim chi trắng"
    ),
    items: [
      it(550000, null, T("1인 모듬회", "Assorted Sashimi for 1", "1人份拼盘生鱼片", "1人前 盛り合わせ刺身", "Cá tổng hợp (1 người)")),
      it(850000, null, T("1인 광어회", "Flatfish Sashimi for 1 (Gwangeo-hoe)", "1人份比目鱼生鱼片", "1人前 ヒラメ刺身", "Cá bơn (1 người)")),
      it([["1P", 600000], ["2P", 1200000]], null, T("갑오징어회", "Cuttlefish Sashimi (Gabojingeo-hoe)", "墨鱼生鱼片", "コウイカ刺身", "Sashimi mực nang")),
      it(400000, "yeoneo", T("연어회", "Salmon Sashimi (Yeoneo-hoe)", "三文鱼生鱼片", "サーモン刺身", "Sashimi cá hồi")),
      it(500000, null, T("회 추가", "Extra Sashimi", "加点生鱼片", "刺身追加", "Cá thêm")),
    ],
  },
  {
    id: "special",
    name: T("스페셜", "Special", "特色菜", "スペシャル", "Special menu"),
    note: T(
      "SET = 2인 기준 상차림 포함 · ONLY = 요리만",
      "SET = table setting for 2 included · ONLY = the dish only",
      "SET = 含2人份餐桌配菜 · ONLY = 仅主菜",
      "SET = 2人前の付け合わせ込み · ONLY = 料理のみ",
      "SET = kèm bàn ăn cho 2 người · ONLY = chỉ món chính"
    ),
    items: [
      it([["SET", 1400000], ["ONLY", 1000000]], null, T("아나고", "Conger Eel (Anago)", "星鳗", "アナゴ", "Cá anago (lươn biển)")),
      it([["SET", 1300000], ["ONLY", 1000000]], null, T("문어삼합", "Octopus Samhap (Octopus · Boiled Pork · Kimchi)", "章鱼三合（章鱼·水煮肉·泡菜）", "タコ三合（タコ・茹で豚・キムチ）", "Samhap bạch tuộc (bạch tuộc - thịt luộc - kim chi)")),
      it([["SET", 1400000], ["ONLY", 1000000]], null, T("새우 소금구이", "Salt-Grilled Shrimp (Saeu Sogeum-gui)", "盐烤虾", "エビの塩焼き", "Tôm nướng muối")),
    ],
  },
  {
    id: "dish",
    name: T("요리", "Dishes", "热菜", "料理", "Món ăn"),
    items: [
      it(400000, "jangeo", T("장어양념구이", "Spicy Marinated Grilled Eel (Jangeo Yangnyeom-gui)", "酱烤鳗鱼", "ウナギのピリ辛焼き", "Lươn nướng sốt cay")),
      it(350000, null, T("물회", "Mulhoe (Cold Spicy Raw Fish Soup)", "冷辣汤拌生鱼片（Mulhoe）", "ムルフェ（冷たい辛味の刺身スープ）", "Mulhoe (Súp lạnh cay với cá sống)")),
      it([["M", 300000], ["L", 400000]], "sannakji", T("산낙지", "Sannakji (Live Octopus)", "活章鱼（山落枝）", "サンナクチ（活きタコ）", "Sannakji (Bạch tuộc con sống)")),
      it(200000, "jogae", T("조개술찜", "Jogae Sul-jjim (Steamed Clams in Liquor)", "酒蒸蛤蜊", "貝の酒蒸し", "Nghêu hấp rượu")),
      it(300000, null, T("탕수육 / 치킨탕수 / 탕수어", "Tangsuyuk / Chicken Tangsu / Tangsu-eo (Sweet and Sour Pork / Chicken / Fish, choose 1 of 3)", "糖醋肉 / 糖醋鸡 / 糖醋鱼（任选1种）", "酢豚 / 鶏の甘酢あん / 魚の甘酢あん（1品選択）", "Thịt heo / gà / cá chiên sốt chua ngọt (chọn 1 trong 3)")),
      it(300000, null, T("칠리새우", "Chili Shrimp (Chili Saeu)", "干烧虾仁（辣椒酱虾）", "エビのチリソース", "Tôm sốt ớt chua ngọt")),
      it(200000, null, T("새우튀김", "Fried Shrimp (Saeu Twigim)", "炸虾", "エビフライ", "Tôm chiên giòn")),
      it(250000, null, T("해물파전", "Haemul Pajeon (Seafood Scallion Pancake)", "海鲜葱饼", "海鮮ネギチヂミ", "Haemul Pajeon (Bánh xèo hành hải sản)")),
    ],
  },
  {
    id: "lunch",
    name: T("점심 메뉴", "Lunch Menu", "午餐菜单", "ランチメニュー", "Thực đơn trưa"),
    items: [
      it(250000, null, T("모듬초밥", "Assorted Sushi (Modeum Chobap)", "什锦寿司", "盛り合わせ寿司", "Sushi tổng hợp")),
      it(250000, null, T("연어초밥", "Salmon Sushi (Yeoneo Chobap)", "三文鱼寿司", "サーモン寿司", "Sushi cá hồi")),
      it(250000, null, T("후토마끼", "Futomaki (Thick Sushi Roll)", "太卷寿司", "太巻き", "Futomaki (Sushi cuộn lớn)")),
      it(250000, null, T("회덮밥", "Hoedeopbap (Raw Fish Rice Bowl)", "生鱼片盖饭", "刺身丼（ホェドッパプ）", "Hoedeopbap (Cơm cá sống)")),
      it(250000, null, T("연어덮밥", "Yeoneo Deopbap (Salmon Rice Bowl)", "三文鱼盖饭", "サーモン丼", "Cơm cá hồi")),
      it(250000, null, T("장어덮밥", "Jangeo Deopbap (Eel Rice Bowl)", "鳗鱼盖饭", "うな丼", "Cơm lươn")),
      it(200000, null, T("생선까스 / 돈까스", "Fish Cutlet / Pork Cutlet (Saengseon Gaseu / Donkatsu)", "炸鱼排 / 炸猪排", "魚カツ / とんかつ", "Cá chiên xù / Heo chiên xù")),
      it(250000, null, T("냉메밀", "Naengmemil (Cold Buckwheat Noodles)", "冷荞麦面", "冷たいそば（ネンメミル）", "Naengmemil (Mì kiều mạch lạnh)")),
      it(250000, null, T("비빔메밀", "Bibim Memil (Spicy Mixed Buckwheat Noodles)", "辣拌荞麦面", "辛い和えそば（ビビンメミル）", "Bibim Memil (Mì kiều mạch trộn cay)")),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Alcohol · Drinks", "酒水 · 饮料", "お酒・ドリンク", "Rượu · Đồ uống"),
    items: [
      it(150000, null, T("소주 (좋은데이·처음처럼·참이슬·진로·새로)", "Soju", "烧酒（Good Day · Chum Churum · Chamisul · Jinro · Saero）", "焼酎（Good Day・Chum Churum・Chamisul・Jinro・Saero）", "Soju (Good Day, Chum Churum, Chamisul, Jinro, Saero)")),
      it(70000, null, T("맥주 (타이거·사이공)", "Beer (Tiger · Saigon)", "啤酒（虎牌·西贡）", "ビール（タイガー・サイゴン）", "Bia (Tiger · Saigon)")),
      it(250000, null, T("막걸리 · 백세주", "Makgeolli · Baekseju", "马格利 · 百岁酒", "マッコリ・ペクセジュ", "Makgeolli · Baekseju")),
      it(200000, null, T("청하", "Chung Ha (Sake-style Rice Wine)", "清河（Chung Ha）清酒", "チョンハ（清河）", "Chung Ha (Rượu gạo kiểu sake)")),
      it(350000, null, T("복분자 · 화요 17°", "Bokbunja (Korean Black Raspberry Wine) · Hwayo 17°", "覆盆子酒 · HWAYO 17°", "覆盆子酒・ファヨ（HWAYO）17°", "Bokbunja (Rượu mâm xôi đen) · Hwayo 17°")),
      it([["330ml", 200000], ["500ml", 300000]], null, T("보드카 MEN", "Vodka MEN", "伏特加 MEN", "ウォッカ MEN", "Vodka MEN")),
      it([["300ml", 250000], ["720ml", 550000]], null, T("사케 에츠노하지메", "Sake Etsu no Hajime", "清酒 Etsu no Hajime", "日本酒 エツノハジメ（Etsu no Hajime）", "Sake Etsu no Hajime")),
      it(20000, null, T("음료 (콜라·스프라이트·환타·소다)", "Cola · Sprite · Fanta · Soda", "饮料（可乐·雪碧·芬达·苏打水）", "ドリンク（コーラ・スプライト・ファンタ・ソーダ）", "Nước ngọt (Cola · Sprite · Fanta · Soda)")),
      it(200000, null, T("콜키지 (1병당)", "Corkage (per bottle)", "开瓶费（每瓶）", "持ち込み料（1本につき）", "Phí mở rượu (mỗi chai)")),
    ],
  },
];
