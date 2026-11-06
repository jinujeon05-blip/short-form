// 제주도 오마카세 Jeju Omakase 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진(2026-11-05 수집, 올린 날짜 미상, 안티그래비티 읽기+Claude Sonnet 재대조). 빨간 취소선이 그어진 해산물 물회·개불·소라구이는 뺌
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜)
window.RESTAURANT = {
  brand: { ko: "제주도 오마카세", en: "Jeju Omakase" },
  phone: "0359 296 520",
  address: "44N4 Đường Võ Cường 6, Võ Cường, Bắc Ninh",
  wifi: null,
  hours: { ko: "10:00 – 14:00 / 16:00 – 23:00", en: "10:00 – 14:00 / 16:00 – 23:00", zh: "10:00 – 14:00 / 16:00 – 23:00", ja: "10:00 – 14:00 / 16:00 – 23:00", vi: "10:00 – 14:00 / 16:00 – 23:00" },
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price: price ?? null, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

window.MENU = [
  {
    id: "omakase",
    name: T("오마카세", "Omakase", "主厨发办", "おまかせ", "Omakase"),
    note: T(
      "주방장에게 맡긴다는 뜻으로, 제철 최고의 재료로 숙성회와 스시를 제공합니다. 코스: 스프·샐러드·전복찜 → 해산물 요리(문어·뿔소라·멍게·개불 등) → 숙성회(고등어·전갱이·삼치·광어·대방어·단새우) → 스시 3PS → 구이·조림 → 튀김 → 지리·매운탕. 계절과 날씨에 따라 숙성회와 해산물은 바뀔 수 있어요",
      "Omakase means leaving it to the chef. Aged sashimi and sushi made with the best seasonal ingredients. Course: soup, salad, steamed abalone → seafood dishes (octopus, horn snail, sea squirt, spoon worm, etc.) → aged sashimi (mackerel, horse mackerel, Spanish mackerel, flounder, amberjack, sweet shrimp) → 3 pcs sushi → grilled and braised dishes → tempura → clear fish soup or spicy fish stew. Sashimi and seafood may change with the season and weather.",
      "“发办”意为交给主厨安排，用当季最佳食材提供熟成生鱼片和寿司。套餐顺序：汤·沙拉·蒸鲍鱼 → 海鲜料理（章鱼·海螺·海鞘·海蚯蚓等） → 熟成生鱼片（青花鱼·竹荚鱼·鲅鱼·比目鱼·大鰤鱼·甜虾） → 寿司3件 → 烧烤·炖鱼 → 天妇罗 → 清汤或辣鱼汤。生鱼片和海鲜会随季节和天气变化。",
      "「おまかせ」は料理長にお任せという意味で、旬の最高の食材で熟成刺身と寿司をご提供します。コース：スープ・サラダ・鮑の蒸し物 → 海鮮料理（タコ・ツブ貝・ホヤ・ユムシなど） → 熟成刺身（サバ・アジ・サワラ・ヒラメ・カンパチ・甘エビ） → 寿司3貫 → 焼き物・煮付け → 天ぷら → チリ鍋・辛いお鍋。季節や天候により刺身と海鮮は変わることがあります。",
      "Omakase nghĩa là giao cho đầu bếp quyết định, phục vụ cá sống ủ và sushi từ nguyên liệu ngon nhất theo mùa. Thứ tự món: súp, salad, bào ngư hấp → hải sản (bạch tuộc, ốc, hải tiêu, giun biển...) → cá sống ủ (cá thu, cá nục, cá thu Nhật, cá bơn, cá cam, tôm ngọt) → 3 miếng sushi → món nướng, món kho → tempura → lẩu cá thanh hoặc lẩu cá cay. Cá sống và hải sản có thể thay đổi theo mùa và thời tiết."
    ),
    items: [
      it(750000, null, "오마카세", "Omakase (오마카세)", "发办套餐 (오마카세)", "おまかせ (오마카세)", "Omakase", { tag: "best" }),
      it(1150000, null, "스페셜 오마카세", "Special Omakase (스페셜 오마카세)", "特别发办套餐 (스페셜 오마카세)", "スペシャルおまかせ (스페셜 오마카세)", "Omakase đặc biệt", {
        desc: T("숙성회와 스시, 참치뱃살 제공", "Aged sashimi, sushi and fatty tuna belly", "提供熟成生鱼片、寿司和金枪鱼腩", "熟成刺身と寿司、マグロのトロをご提供", "Cá sống ủ, sushi và bụng cá ngừ béo"),
        tag: "special",
      }),
    ],
  },
  {
    id: "sashimi",
    name: T("회", "Sashimi", "生鱼片", "刺身", "Cá sống"),
    items: [
      it(450000, "modumhoe", "모둠회 (1인)", "Assorted Sashimi (Modumhoe) – per person", "拼盘生鱼片 (모둠회) – 每人", "刺身盛り合わせ (모둠회) – お一人様", "Cá sống thập cẩm (1 người)", {
        desc: T("1인분 가능, 취향에 맞게 골라 드실 수 있어요. 매니저·실장님과 상의 후 준비", "Single servings available; choose to your taste. Prepared after talking with the manager", "可点一人份，可按口味挑选。与经理商量后准备", "1人前からOK、お好みに合わせて選べます。マネージャーと相談のうえご用意します", "Có thể gọi 1 phần, chọn theo khẩu vị. Chuẩn bị sau khi trao đổi với quản lý"),
      }),
      it(450000, null, "제철 생선회 (1인)", "Seasonal Sashimi (Jecheol Saengseonhoe) – per person", "当季生鱼片 (제철 생선회) – 每人", "旬の刺身 (제철 생선회) – お一人様", "Cá sống theo mùa (1 người)", {
        desc: T("삼치·전갱이·청어·전어·대방어·학공치 등 제철 최고의 생선", "The best seasonal fish: Spanish mackerel, horse mackerel, herring, gizzard shad, amberjack, halfbeak and more", "当季最佳鱼类：鲅鱼·竹荚鱼·青鱼·鰶鱼·大鰤鱼·针鱼等", "旬の最高の魚：サワラ・アジ・ニシン・コノシロ・カンパチ・サヨリなど", "Cá ngon nhất theo mùa: cá thu Nhật, cá nục, cá trích, cá trích xương, cá cam, cá kim..."),
      }),
      it(950000, "tuna", "참치회 (1인)", "Tuna Sashimi (Chamchi-hoe) – per person", "金枪鱼生鱼片 (참치회) – 每人", "マグロ刺身 (참치회) – お一人様", "Cá ngừ sống (1 người)", {
        desc: T("각종 스끼다시와 해산물 요리, 튀김, 구이, 지리 제공", "Comes with assorted side dishes, seafood dishes, tempura, grilled fish and clear fish soup", "附各种前菜、海鲜料理、天妇罗、烧烤和清汤", "各種お通しと海鮮料理、天ぷら、焼き物、チリ鍋付き", "Kèm các món khai vị, hải sản, tempura, món nướng và lẩu cá thanh"),
      }),
    ],
  },
  {
    id: "meal",
    name: T("식사", "Meals", "主食", "お食事", "Món ăn chính"),
    note: T(
      "반찬 6가지·튀김·조림이 함께 나와요",
      "Comes with 6 side dishes, tempura and braised fish",
      "附6种小菜、天妇罗和炖鱼",
      "おかず6種・天ぷら・煮付けが付きます",
      "Kèm 6 món ăn kèm, tempura và món kho"
    ),
    items: [
      it(300000, "sushi", "모둠스시 12PS", "Assorted Sushi 12 pcs (Modum Sushi)", "什锦寿司12件 (모둠스시)", "盛り合わせ寿司12貫 (모둠스시)", "Sushi thập cẩm 12 miếng"),
      it(200000, null, "연어스시 10PS", "Salmon Sushi 10 pcs (Yeoneo Sushi)", "三文鱼寿司10件 (연어스시)", "サーモン寿司10貫 (연어스시)", "Sushi cá hồi 10 miếng"),
      it(200000, null, "어린이스시 (계란 5PS·새우 5PS)", "Kids Sushi – 5 egg, 5 shrimp (Eorini Sushi)", "儿童寿司 (鸡蛋5件·虾5件) (어린이스시)", "お子様寿司 (卵5貫・エビ5貫) (어린이스시)", "Sushi trẻ em (5 miếng trứng, 5 miếng tôm)"),
      it(200000, null, "생선스시 10PS", "Fish Sushi 10 pcs (Saengseon Sushi)", "鱼肉寿司10件 (생선스시)", "白身魚寿司10貫 (생선스시)", "Sushi cá 10 miếng"),
      it(400000, null, "참치스시 10PS", "Tuna Sushi 10 pcs (Chamchi Sushi)", "金枪鱼寿司10件 (참치스시)", "マグロ寿司10貫 (참치스시)", "Sushi cá ngừ 10 miếng"),
      it(200000, null, "회덮밥", "Sashimi Rice Bowl (Hoedeopbap)", "生鱼片盖饭 (회덮밥)", "刺身丼 (회덮밥)", "Cơm cá sống trộn"),
      it(300000, null, "매운탕·지리 (복 지리)", "Spicy Fish Stew / Clear Fish Soup – Pufferfish (Maeuntang / Jiri)", "麻辣鱼汤/清汤 (河豚) (매운탕·지리)", "辛いお鍋/チリ鍋 (フグのチリ) (매운탕·지리)", "Lẩu cá cay / lẩu cá thanh (lẩu cá nóc)"),
      it(300000, null, "해물뚝배기", "Seafood Stone Pot Stew (Haemul Ttukbaegi)", "海鲜砂锅 (해물뚝배기)", "海鮮トゥッペギ (해물뚝배기)", "Lẩu hải sản nồi đất"),
    ],
  },
  {
    id: "seafood",
    name: T("해산물 요리", "Seafood", "海鲜料理", "海鮮料理", "Hải sản"),
    items: [
      it(null, null, "해산물 모둠한상", "Seafood Platter Set (Haemul Modum Hansang)", "海鲜拼盘套餐 (해산물 모둠한상)", "海鮮盛り合わせ膳 (해산물 모둠한상)", "Mâm hải sản thập cẩm", {
        sizes: [["中", 950000], ["大", 1550000]],
        desc: T("제철 해산물(문어·뿔소라·전복·단새우·멍게·개불·해삼 등)", "Seasonal seafood (octopus, horn snail, abalone, sweet shrimp, sea squirt, spoon worm, sea cucumber, etc.)", "当季海鲜（章鱼·海螺·鲍鱼·甜虾·海鞘·海蚯蚓·海参等）", "旬の海鮮（タコ・ツブ貝・鮑・甘エビ・ホヤ・ユムシ・ナマコなど）", "Hải sản theo mùa (bạch tuộc, ốc, bào ngư, tôm ngọt, hải tiêu, giun biển, hải sâm...)"),
      }),
      it(550000, null, "뿔소라 (한 접시)", "Horn Snail (Ppulsora) – one plate", "海螺 (뿔소라) – 一盘", "サザエ (뿔소라) – 1皿", "Ốc sừng (1 đĩa)"),
      it(550000, null, "전복 (한 접시)", "Abalone (Jeonbok) – one plate", "鲍鱼 (전복) – 一盘", "鮑 (전복) – 1皿", "Bào ngư (1 đĩa)"),
      it(550000, null, "단새우 (한 접시)", "Sweet Shrimp (Dansaeu) – one plate", "甜虾 (단새우) – 一盘", "甘エビ (단새우) – 1皿", "Tôm ngọt (1 đĩa)"),
      it(550000, null, "멍게 (한 접시)", "Sea Squirt (Meongge) – one plate", "海鞘 (멍게) – 一盘", "ホヤ (멍게) – 1皿", "Hải tiêu (1 đĩa)"),
      it(550000, null, "산낙지 (한 접시)", "Live Octopus (Sannakji) – one plate", "活章鱼 (산낙지) – 一盘", "活きタコ (산낙지) – 1皿", "Bạch tuộc sống (1 đĩa)"),
    ],
  },
  {
    id: "single",
    name: T("단품메뉴", "A La Carte", "单点菜品", "単品メニュー", "Món lẻ"),
    items: [
      it(400000, null, "생선구이", "Grilled Fish (Saengseon Gui)", "烤鱼 (생선구이)", "焼き魚 (생선구이)", "Cá nướng"),
      it(400000, "jorim", "생선간장조림", "Soy-Braised Fish (Saengseon Ganjang Jorim)", "酱油炖鱼 (생선간장조림)", "魚の醤油煮付け (생선간장조림)", "Cá kho xì dầu"),
      it(300000, null, "새우튀김", "Shrimp Tempura (Saeu Twigim)", "炸虾 (새우튀김)", "エビ天ぷら (새우튀김)", "Tôm chiên tempura"),
      it(550000, "octopus", "문어숙회", "Boiled Octopus (Muneo Sukhoe)", "白灼章鱼 (문어숙회)", "タコの湯引き (문어숙회)", "Bạch tuộc luộc"),
    ],
  },
];
