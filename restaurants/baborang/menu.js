// 바보랑 회 센터 Baborang Seafood 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진(2026-11-04 수집, 올린 날짜 미상), 가격이 다르면 높은 쪽(연포탕 460K·750K → 750K)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "바보랑 회 센터", en: "Baborang Seafood" },
  phone: "0889 451 687",
  address: "M4-02 Hoàng Trọng Mậu, Nam Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:00 – 14:00 · 17:00 – 22:00", // 구글 지도 '오전 10:00~오후 2:00 / 오후 5:00~10:00' (휴식 시간 있음)
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price: price ?? null, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
// 크기 3단계(소·중·대) / 가격은 천동 단위로 받아 ×1000
const sml = (s, m, l) => ({ sizes: [["S", s * 1000], ["M", m * 1000], ["L", l * 1000]] });

window.MENU = [
  {
    id: "sashimi",
    name: T("활어회 단품", "Live Fish Sashimi (À la carte)", "活鱼刺身单点", "活魚の刺身（単品）", "Cá sống (món lẻ)"),
    note: T(
      "기본차림으로 전복죽·샐러드·전·생선구이·콘치즈·국이 함께 나와요",
      "Comes with abalone porridge, salad, pancake, grilled fish, corn cheese and soup",
      "附赠鲍鱼粥、沙拉、煎饼、烤鱼、芝士玉米和汤",
      "基本のお膳として、あわび粥・サラダ・チヂミ・焼き魚・コーンチーズ・スープが付きます",
      "Kèm cháo bào ngư, salad, bánh kếp, cá nướng, bắp phô mai và canh"
    ),
    items: [
      it(null, null, "완도 대광어", "Wando Large Olive Flounder (Daegwang-eo)", "莞岛大比目鱼", "莞島の大型ヒラメ（テグァンオ）", "Cá bơn Wando cỡ lớn", sml(900, 1450, 1950)),
      it(null, null, "완도 광어", "Wando Olive Flounder (Gwang-eo)", "莞岛牙鲆", "莞島のヒラメ（クァンオ）", "Cá bơn Wando", sml(800, 1350, 1850)),
      it(null, null, "병어", "Silver Pomfret (Byeong-eo)", "银鲳鱼", "マナガツオ（ピョンオ）", "Cá chim bạc", sml(560, 960, 1360)),
      it(null, null, "흑돔", "Black Sea Bream (Heukdom)", "黑鲷", "黒鯛（フクドム）", "Cá tráp đen", sml(560, 960, 1360)),
      it(null, null, "다금바리", "Longtooth Grouper (Dageumbari)", "石斑鱼（多金巴里）", "タグムバリ（高級ハタ）", "Cá song", sml(560, 960, 1360)),
      it(null, null, "연어", "Salmon", "三文鱼", "サーモン", "Cá hồi", sml(560, 960, 1360)),
      it(null, null, "기본 모듬회", "Basic Assorted Sashimi", "基本什锦刺身", "基本の刺身盛り合わせ", "Sashimi tổng hợp cơ bản", {
        ...sml(590, 990, 1390),
        desc: T("병어·다금바리·흑돔·연어", "Silver pomfret, grouper, black sea bream, salmon", "银鲳鱼·石斑鱼·黑鲷·三文鱼", "マナガツオ・ハタ・黒鯛・サーモン", "Cá chim bạc, cá song, cá tráp đen, cá hồi"),
      }),
      it(null, null, "광어 모듬회", "Flounder Assorted Sashimi", "牙鲆什锦刺身", "ヒラメの刺身盛り合わせ", "Sashimi cá bơn tổng hợp", {
        ...sml(720, 1220, 1620),
        desc: T("광어·병어·흑돔·다금바리·연어", "Flounder, silver pomfret, black sea bream, grouper, salmon", "牙鲆·银鲳鱼·黑鲷·石斑鱼·三文鱼", "ヒラメ・マナガツオ・黒鯛・ハタ・サーモン", "Cá bơn, cá chim bạc, cá tráp đen, cá song, cá hồi"),
      }),
      it(null, "tunamodum", "참치 모듬회", "Tuna Assorted Sashimi", "金枪鱼什锦刺身", "マグロ入り刺身盛り合わせ", "Sashimi cá ngừ tổng hợp", {
        ...sml(890, 1490, 1990),
        tag: "must",
        desc: T("참치·광어·병어·흑돔·다금바리·연어", "Tuna, flounder, silver pomfret, black sea bream, grouper, salmon", "金枪鱼·牙鲆·银鲳鱼·黑鲷·石斑鱼·三文鱼", "マグロ・ヒラメ・マナガツオ・黒鯛・ハタ・サーモン", "Cá ngừ, cá bơn, cá chim bạc, cá tráp đen, cá song, cá hồi"),
      }),
      it(null, null, "매운탕 추가", "Add Spicy Fish Stew (Maeuntang)", "加点辣鱼汤（Maeuntang）", "メウンタン追加（辛い魚鍋）", "Thêm lẩu cá cay", { sizes: [["M", 200000], ["L", 300000]] }),
    ],
  },
  {
    id: "set",
    name: T("활어회 세트 · 한상차림", "Sashimi Set Meals", "活鱼刺身套餐", "活魚の刺身セット（一膳）", "Set cá sống & mâm cơm"),
    note: T(
      "새우장·전복회·물회·튀김·생선까스·매운탕이 기본으로 나와요",
      "Shrimp jang, abalone sashimi, mulhoe, tempura, fish cutlet and spicy fish stew are included",
      "基本配有酱虾、鲍鱼刺身、冷汤刺身、炸物、炸鱼排和辣鱼汤",
      "エビジャン・アワビ刺身・ムルフェ・天ぷら・魚カツ・メウンタンが基本で付きます",
      "Kèm sẵn tôm ngâm tương, gỏi bào ngư, mulhoe, đồ chiên, cá chiên xù và lẩu cá cay"
    ),
    items: [
      it(null, null, "완도 대광어 세트", "Wando Large Flounder Set", "莞岛大比目鱼套餐", "莞島の大型ヒラメセット", "Set cá bơn Wando cỡ lớn", sml(1390, 2200, 2950)),
      it(null, null, "완도 광어 세트", "Wando Flounder Set", "莞岛牙鲆套餐", "莞島のヒラメセット", "Set cá bơn Wando", sml(1290, 2100, 2850)),
      it(null, null, "병어 세트", "Silver Pomfret Set", "银鲳鱼套餐", "マナガツオセット", "Set cá chim bạc", sml(1060, 1700, 2360)),
      it(null, null, "흑돔 세트", "Black Sea Bream Set", "黑鲷套餐", "黒鯛セット", "Set cá tráp đen", sml(1060, 1700, 2360)),
      it(null, null, "다금바리 세트", "Longtooth Grouper Set", "石斑鱼套餐", "タグムバリセット", "Set cá song", sml(1060, 1700, 2360)),
      it(null, null, "연어 세트", "Salmon Set", "三文鱼套餐", "サーモンセット", "Set cá hồi", sml(1060, 1700, 2360)),
      it(null, null, "기본 모듬회 세트", "Basic Assorted Sashimi Set", "基本什锦刺身套餐", "基本の刺身盛り合わせセット", "Set sashimi tổng hợp cơ bản", sml(1090, 1720, 2390)),
      it(null, null, "광어 모듬회 세트", "Flounder Assorted Sashimi Set", "牙鲆什锦刺身套餐", "ヒラメ刺身盛り合わせセット", "Set sashimi cá bơn tổng hợp", sml(1220, 1970, 2620)),
      it(null, null, "참치 모듬회 세트", "Tuna Assorted Sashimi Set", "金枪鱼什锦刺身套餐", "マグロ入り刺身盛り合わせセット", "Set sashimi cá ngừ tổng hợp", sml(1390, 2240, 2990)),
    ],
  },
  {
    id: "vip",
    name: T("바보랑 VIP 세트", "Baborang VIP Set", "Baborang VIP 套餐", "バボラン VIPセット", "Set VIP Baborang"),
    note: T(
      "실장 특선 요리·생선회·크레이 피쉬·계절 해산물·보쌈·매운탕·전복죽·생선구이·전·샐러드",
      "Manager's special dish, sashimi, crayfish, seasonal seafood, bossam, spicy fish stew, abalone porridge, grilled fish, pancake and salad",
      "经理特选料理、生鱼片、小龙虾、时令海鲜、菜包肉、辣鱼汤、鲍鱼粥、烤鱼、煎饼、沙拉",
      "支配人おすすめ料理・刺身・ザリガニ（クレイフィッシュ）・旬の海鮮・ポッサム・メウンタン・アワビ粥・焼き魚・チヂミ・サラダ",
      "Món đặc biệt của quản lý, sashimi, tôm hùm đất, hải sản theo mùa, thịt luộc bossam, lẩu cá cay, cháo bào ngư, cá nướng, bánh kếp, salad"
    ),
    items: [
      it(4500000, null, "VIP 세트 (2인)", "VIP Set (2 people)", "VIP 套餐（2人）", "VIPセット（2人前）", "Set VIP (2 người)"),
      it(6900000, null, "VIP 세트 (3인)", "VIP Set (3 people)", "VIP 套餐（3人）", "VIPセット（3人前）", "Set VIP (3 người)"),
      it(7900000, null, "VIP 세트 (4인)", "VIP Set (4 people)", "VIP 套餐（4人）", "VIPセット（4人前）", "Set VIP (4 người)"),
    ],
  },
  {
    id: "premium",
    name: T("참치 · 스페셜", "Tuna & Specials", "金枪鱼·特色", "マグロ・スペシャル", "Cá ngừ & món đặc biệt"),
    items: [
      it(null, null, "참다랑어", "Bluefin Tuna (Chamdarang-eo)", "蓝鳍金枪鱼", "本マグロ（チャムダランオ）", "Cá ngừ vây xanh", {
        sizes: [["S", 1590000], ["M", 2290000], ["L", 2990000]],
        tag: "best",
        desc: T("배꼽살·뱃살·황새치 뱃살·등살·가마도로", "Navel, belly, swordfish belly, back and kamadoro cuts", "脐肉·腹肉·剑鱼腹肉·背肉·鱼颔肉（kamadoro）", "へそ身・腹身・メカジキの腹身・背身・カマトロ", "Thịt rốn, bụng, bụng cá kiếm, lưng và kamadoro"),
      }),
      it(null, null, "킹크랩", "King Crab", "帝王蟹", "タラバガニ", "Cua hoàng đế"),
      it(null, "lobstersashimi", "랍스터 회", "Lobster Sashimi", "龙虾刺身", "ロブスターの刺身", "Sashimi tôm hùm"),
      it(null, null, "랍스터 찜", "Steamed Lobster", "清蒸龙虾", "ロブスターの蒸し物", "Tôm hùm hấp"),
      it(null, "lobsterbutter", "랍스터 버터구이", "Butter-grilled Lobster", "黄油烤龙虾", "ロブスターのバター焼き", "Tôm hùm nướng bơ", { tag: "best" }),
      it(null, null, "크레이 피쉬 회", "Crayfish Sashimi", "小龙虾刺身", "クレイフィッシュの刺身", "Sashimi tôm hùm đất"),
      it(null, null, "크레이 피쉬 찜", "Steamed Crayfish", "清蒸小龙虾", "クレイフィッシュの蒸し物", "Tôm hùm đất hấp"),
    ],
  },
  {
    id: "season",
    name: T("계절 메뉴", "Seasonal Menu", "时令菜单", "季節メニュー", "Món theo mùa"),
    note: T(
      "제철 식재료라 시가예요",
      "Priced at market rate because the ingredients are in season",
      "时令食材，按时价计算",
      "旬の食材のため、時価です",
      "Nguyên liệu theo mùa nên giá theo thời điểm"
    ),
    items: [
      it(null, null, "대방어", "Large Yellowtail (Daebang-eo)", "大鰤鱼", "大型ブリ（デバンオ）", "Cá cam lớn"),
      it(null, null, "농어", "Sea Bass (Nong-eo)", "鲈鱼", "スズキ（ノンオ）", "Cá vược"),
      it(null, null, "과메기", "Gwamegi (Semi-dried Pacific Saury)", "半干青鱼（Gwamegi）", "クァメギ（半干しサンマ）", "Cá thu đao bán khô Gwamegi"),
      it(null, null, "석화", "Oysters (Seokhwa)", "牡蛎", "牡蠣（ソクァ）", "Hàu"),
    ],
  },
  {
    id: "seafood",
    name: T("낙지 · 해산물", "Octopus & Seafood", "章鱼·海鲜", "テナガダコ・海鮮", "Bạch tuộc & hải sản"),
    items: [
      it(460000, null, "낙지 탕탕이", "Chopped Live Octopus (Nakji Tangtangi)", "拌生章鱼（Nakji Tangtangi）", "活きタコのたたき（ナクチタンタンイ）", "Bạch tuộc sống băm"),
      it(590000, null, "육회 낙지 탕탕이", "Beef Tartare with Chopped Octopus (Yukhoe Nakji Tangtangi)", "生牛肉拌章鱼（Yukhoe Nakji Tangtangi）", "ユッケ入り活きタコのたたき（ユッケナクチタンタンイ）", "Bạch tuộc sống băm trộn thịt bò sống"),
      it(460000, null, "전복 활어회 (4마리)", "Live Abalone Sashimi (4 pieces)", "鲜鲍鱼刺身（4只）", "活アワビの刺身（4匹）", "Sashimi bào ngư sống (4 con)"),
      it(480000, "abalone", "완도 전복 버터구이 (4마리)", "Wando Butter-grilled Abalone (4 pieces)", "莞岛黄油烤鲍鱼（4只）", "莞島アワビのバター焼き（4匹）", "Bào ngư Wando nướng bơ (4 con)", { tag: "best" }),
      it(480000, null, "완도 전복 찜 (4마리)", "Wando Steamed Abalone (4 pieces)", "莞岛清蒸鲍鱼（4只）", "莞島アワビの蒸し物（4匹）", "Bào ngư Wando hấp (4 con)"),
      it(800000, null, "전가복", "Jeongabok (Abalone, Sea Cucumber, Shrimp, Clam and Mushroom)", "全家福（Jeongabok）", "チョンガボク（アワビ・ナマコ・エビ・貝・キノコの盛り合わせ）", "Món Jeongabok (hải sản tổng hợp)", {
        desc: T("전복·해삼·새우·조개살·버섯", "Abalone, sea cucumber, shrimp, clam meat and mushrooms", "鲍鱼·海参·虾·蛤肉·蘑菇", "アワビ・ナマコ・エビ・貝のむき身・キノコ", "Bào ngư, hải sâm, tôm, thịt nghêu và nấm"),
      }),
      it(600000, "abalonestir", "전복 청경채 새송이버섯 볶음", "Stir-fried Abalone with Bok Choy and King Oyster Mushrooms", "鲍鱼青江菜杏鲍菇炒", "アワビ・チンゲン菜・エリンギの炒め", "Bào ngư xào cải thìa và nấm đùi gà"),
      it(290000, null, "완도 전복 파스타", "Wando Abalone Pasta", "莞岛鲍鱼意面", "莞島アワビのパスタ", "Mì Ý bào ngư Wando"),
      it(460000, null, "생굴", "Raw Oysters", "生蚝", "生牡蠣", "Hàu sống"),
      it(460000, null, "멍게", "Sea Squirt (Meongge)", "海鞘（Meongge）", "ホヤ（モンゲ）", "Hải tiêu (Meongge)"),
      it(520000, null, "개불", "Spoon Worm (Gaebul)", "海肠（Gaebul）", "ユムシ（ケブル）", "Giun biển (Gaebul)"),
      it(520000, null, "해삼", "Sea Cucumber", "海参", "ナマコ", "Hải sâm"),
      it(null, null, "문어숙회", "Blanched Octopus (Muneo Sukhoe)", "白灼章鱼（Muneo Sukhoe）", "タコの湯引き（ムノスッフェ）", "Bạch tuộc luộc", sml(650, 1050, 1450)),
      it(null, null, "모듬 해산물", "Assorted Seafood Platter", "海鲜拼盘", "海鮮盛り合わせ", "Hải sản tổng hợp", sml(700, 1290, 1790)),
    ],
  },
  {
    id: "soup",
    name: T("탕 · 찜", "Stews & Steamed Dishes", "汤·蒸菜", "鍋・蒸し料理", "Lẩu & món hấp"),
    items: [
      it(null, null, "연포탕", "Yeonpotang (Octopus Soup)", "章鱼汤（Yeonpotang）", "ヨンポタン（タコ入りスープ）", "Lẩu bạch tuộc Yeonpotang", { sizes: [["M", 750000]] }),
      it(null, null, "모듬 조개찜", "Assorted Steamed Shellfish", "什锦蒸贝类", "貝の盛り合わせ蒸し", "Nghêu sò hấp tổng hợp", { sizes: [["M", 900000], ["L", 1150000]] }),
      it(null, null, "통 자바리탕 (지리 / 매운)", "Whole Grouper Soup (Clear / Spicy)", "整条石斑鱼汤（清汤/辣味）", "ハタ一尾鍋（あっさり／辛口）", "Lẩu cá song nguyên con (nước trong / cay)", { sizes: [["M", 1090000], ["L", 1290000]], spicy: true }),
      it(null, null, "해물탕", "Spicy Seafood Stew (Haemultang)", "海鲜汤（Haemultang）", "海鮮鍋（ヘムルタン）", "Lẩu hải sản cay", { sizes: [["M", 1090000], ["L", 1290000]], spicy: true }),
      it(680000, null, "참굴비 조림 (6마리)", "Braised Yellow Croaker (Chamgulbi, 6 pieces)", "红烧黄花鱼（6条）", "イシモチの煮付け（6匹）", "Cá đù om (6 con)"),
      it(null, null, "해물찜", "Spicy Braised Seafood (Haemuljjim)", "辣炖海鲜（Haemuljjim）", "海鮮蒸し（ヘムルチム）", "Hải sản hấp cay", { sizes: [["M", 1090000], ["L", 1290000]], spicy: true }),
      it(null, null, "꽃게찜", "Steamed Blue Crab (Kkotgejjim)", "清蒸花蟹（Kkotgejjim）", "ワタリガニの蒸し物（コッケチム）", "Ghẹ hấp", { sizes: [["M", 650000], ["L", 800000]] }),
      it(null, null, "양념 꽃게찜", "Spicy Seasoned Steamed Blue Crab", "香辣花蟹（Yangnyeom Kkotgejjim）", "ワタリガニの辛味蒸し（ヤンニョムコッケチム）", "Ghẹ hấp sốt cay", { sizes: [["M", 960000], ["L", 1360000]], spicy: true }),
      it(null, null, "반건조 우럭 찜", "Steamed Semi-dried Rockfish", "半干黑鲪鱼蒸", "半干しメバルの蒸し物", "Cá hấp bán khô (cá rockfish)", {
        sizes: [["×1", 800000], ["×2", 1500000]],
        desc: T("×1 = 1마리, ×2 = 2마리", "×1 = 1 fish, ×2 = 2 fish", "×1 = 1条，×2 = 2条", "×1 = 1匹、×2 = 2匹", "×1 = 1 con, ×2 = 2 con"),
      }),
      it(null, null, "반건조 우럭 지리", "Semi-dried Rockfish Clear Soup (Jiri)", "半干黑鲪鱼清汤（Jiri）", "半干しメバルのあっさり鍋（チリ）", "Lẩu cá bán khô nước trong", {
        sizes: [["×1", 800000], ["×2", 1500000]],
        desc: T("×1 = 1마리, ×2 = 2마리", "×1 = 1 fish, ×2 = 2 fish", "×1 = 1条，×2 = 2条", "×1 = 1匹、×2 = 2匹", "×1 = 1 con, ×2 = 2 con"),
      }),
      it(null, null, "반건조 우럭 매운탕", "Semi-dried Rockfish Spicy Stew (Maeuntang)", "半干黑鲪鱼辣汤（Maeuntang）", "半干しメバルの辛い鍋（メウンタン）", "Lẩu cá bán khô cay", {
        sizes: [["×1", 800000], ["×2", 1500000]],
        spicy: true,
        desc: T("×1 = 1마리, ×2 = 2마리", "×1 = 1 fish, ×2 = 2 fish", "×1 = 1条，×2 = 2条", "×1 = 1匹、×2 = 2匹", "×1 = 1 con, ×2 = 2 con"),
      }),
      it(1900000, null, "해신탕", "Haesintang (Seafood & Chicken Royal Stew)", "海神汤（Haesintang）", "ヘシンタン（海鮮入り宮廷鍋）", "Lẩu Haesintang", {
        desc: T("최소 1시간 전 예약 필수", "Reservation required at least 1 hour in advance", "需至少提前1小时预订", "最低1時間前までの予約が必須です", "Bắt buộc đặt trước ít nhất 1 giờ"),
      }),
    ],
  },
  {
    id: "meal",
    name: T("식사", "Meals", "主食", "お食事", "Cơm & món ăn chính"),
    items: [
      it(200000, null, "꼬막 비빔밥", "Cockle Bibimbap (Kkomak Bibimbap)", "蚶子拌饭（Kkomak Bibimbap）", "コマク（赤貝）ビビンバ", "Cơm trộn sò huyết"),
      it(350000, null, "회 정식", "Sashimi Set Meal (Hoe Jeongsik)", "刺身定食", "刺身定食（フェ定食）", "Cơm set sashimi"),
      it(260000, null, "회덮밥 정식", "Sashimi Rice Bowl Set (Hoedeopbap Jeongsik)", "刺身盖饭定食", "海鮮丼定食（フェトッパプ定食）", "Cơm set sashimi trộn"),
      it(260000, null, "물회 정식", "Cold Spicy Sashimi Soup Set (Mulhoe Jeongsik)", "冷汤刺身定食（Mulhoe）", "ムルフェ定食（冷たい刺身スープ）", "Cơm set gỏi cá nước lạnh (mulhoe)", { spicy: true }),
      it(290000, null, "초밥 정식", "Sushi Set Meal", "寿司定食", "寿司定食", "Cơm set sushi"),
      it(220000, null, "알밥 정식", "Fish Roe Rice Set (Albap Jeongsik)", "鱼籽饭定食（Albap）", "魚卵ご飯定食（アルパプ定食）", "Cơm set trứng cá"),
      it(210000, null, "해물 순두부 정식", "Seafood Soft Tofu Stew Set (Sundubu Jeongsik)", "海鲜嫩豆腐汤定食（Sundubu）", "海鮮スンドゥブ定食", "Cơm set đậu phụ non hải sản", { spicy: true }),
      it(250000, null, "낙지 볶음 정식", "Stir-fried Octopus Set (Nakji Bokkeum Jeongsik)", "辣炒章鱼定食（Nakji Bokkeum）", "テナガダコ炒め定食（ナクチポックム）", "Cơm set bạch tuộc xào cay", { spicy: true }),
      it(250000, null, "오징어 볶음 정식", "Stir-fried Squid Set (Ojingeo Bokkeum Jeongsik)", "辣炒鱿鱼定食（Ojingeo Bokkeum）", "イカ炒め定食（オジンオポックム）", "Cơm set mực xào cay", { spicy: true }),
      it(240000, null, "참굴비 정식", "Yellow Croaker Set (Chamgulbi Jeongsik)", "黄花鱼定食（Chamgulbi）", "イシモチ定食（チャムグルビ定食）", "Cơm set cá đù"),
      it(240000, null, "고등어구이 정식", "Grilled Mackerel Set", "烤青花鱼定食", "サバ焼き定食", "Cơm set cá thu nướng"),
      it(240000, null, "갈치구이 정식", "Grilled Hairtail Set (Galchi-gui Jeongsik)", "烤带鱼定食（Galchi-gui）", "タチウオ焼き定食（カルチグイ定食）", "Cơm set cá hố nướng"),
      it(400000, null, "보리굴비 정식", "Barley-aged Yellow Croaker Set (Borigulbi Jeongsik)", "大麦黄花鱼定食（Borigulbi）", "ボリグルビ定食（麦で熟成させたイシモチ）", "Cơm set cá đù ướp lúa mạch"),
      it(450000, null, "전복장 정식", "Soy-marinated Abalone Set (Jeonbokjang Jeongsik)", "酱鲍鱼定食（Jeonbokjang）", "アワビのしょうゆ漬け定食（チョンボクジャン定食）", "Cơm set bào ngư ngâm tương"),
      it(290000, null, "새우장 정식", "Soy-marinated Shrimp Set (Saeujang Jeongsik)", "酱虾定食（Saeujang）", "エビのしょうゆ漬け定食（セウジャン定食）", "Cơm set tôm ngâm tương"),
      it(350000, null, "전복장 + 새우장 정식", "Soy-marinated Abalone & Shrimp Set", "酱鲍鱼+酱虾定食", "アワビ＋エビのしょうゆ漬け定食", "Cơm set bào ngư + tôm ngâm tương"),
      it(430000, null, "간장게장 정식", "Soy-marinated Crab Set (Ganjang Gejang Jeongsik)", "酱油蟹定食（Ganjang Gejang）", "カンジャンケジャン定食（ワタリガニのしょうゆ漬け）", "Cơm set ghẹ ngâm tương"),
      it(280000, null, "완도 활전복 죽", "Wando Live Abalone Porridge (Jeonbokjuk)", "莞岛鲜鲍鱼粥（Jeonbokjuk）", "莞島活アワビ粥（チョンボクチュク）", "Cháo bào ngư sống Wando"),
      it(120000, null, "해물 라면", "Spicy Seafood Ramyeon", "海鲜拉面", "海鮮ラーメン", "Mì ramen hải sản", { spicy: true }),
      it(180000, null, "해물 칼국수", "Seafood Kalguksu (Knife-cut Noodle Soup)", "海鲜刀削面汤（Kalguksu）", "海鮮カルグクス（手打ちうどん風スープ）", "Mì cắt tay hải sản (kalguksu)"),
      it(190000, null, "매생이 굴국", "Seaweed (Maesaengi) and Oyster Soup", "海藻牡蛎汤（Maesaengi）", "メセンイとカキのスープ", "Canh rong biển maesaengi và hàu"),
      it(170000, null, "돈까스 정식", "Pork Cutlet Set (Donkatsu Jeongsik)", "炸猪排定食（Donkatsu）", "とんかつ定食（トンカツ）", "Cơm set heo chiên xù"),
      it(170000, null, "생선까스 정식", "Fish Cutlet Set", "炸鱼排定食", "魚カツ定食", "Cơm set cá chiên xù"),
      it(190000, null, "모듬 까스 정식", "Assorted Cutlet Set", "什锦炸排定食", "ミックスカツ定食", "Cơm set chiên xù tổng hợp"),
      it(190000, null, "메밀 소바 정식", "Buckwheat Soba Set", "荞麦面定食", "そば定食", "Cơm set mì soba kiều mạch"),
    ],
  },
  {
    id: "side",
    name: T("사이드", "Sides", "小食", "サイドメニュー", "Món phụ"),
    items: [
      it(null, null, "새우회", "Raw Shrimp Sashimi", "生虾刺身", "エビの刺身", "Sashimi tôm", { sizes: [["500g", 600000], ["1kg", 1100000]] }),
      it(null, null, "새우구이", "Grilled Shrimp", "烤虾", "エビの焼き物", "Tôm nướng", { sizes: [["500g", 550000], ["1kg", 1000000]] }),
      it(400000, null, "꼼장어 소금구이", "Salt-grilled Hagfish (Kkomjangeo)", "盐烤七鳃鳗（Kkomjangeo）", "ヌタウナギの塩焼き（コムジャンオ）", "Lươn biển nướng muối"),
      it(450000, null, "양념 꼼장어", "Spicy Seasoned Hagfish (Yangnyeom Kkomjangeo)", "香辣七鳃鳗（Yangnyeom Kkomjangeo）", "ヌタウナギの辛味焼き（ヤンニョムコムジャンオ）", "Lươn biển nướng sốt cay", { spicy: true }),
      it(150000, null, "새우튀김", "Fried Shrimp", "炸虾", "エビフライ", "Tôm chiên"),
      it(230000, null, "통오징어 숙회", "Whole Blanched Squid (Sukhoe)", "白灼整只鱿鱼（Sukhoe）", "イカ丸ごとの湯引き（スッフェ）", "Mực nguyên con luộc"),
      it(120000, null, "콘치즈", "Corn Cheese", "芝士玉米", "コーンチーズ", "Bắp phô mai"),
      it(250000, null, "해물파전", "Seafood and Green Onion Pancake (Haemul Pajeon)", "海鲜葱饼（Haemul Pajeon）", "海鮮ネギチヂミ（ヘムルパジョン）", "Bánh kếp hải sản hành lá"),
      it(190000, null, "새우장", "Soy-marinated Shrimp (Saeujang)", "酱虾（Saeujang）", "エビのしょうゆ漬け（セウジャン）", "Tôm ngâm tương"),
      it(350000, null, "간장게장", "Soy-marinated Crab (Ganjang Gejang)", "酱油蟹（Ganjang Gejang）", "カンジャンケジャン（ワタリガニのしょうゆ漬け）", "Ghẹ ngâm tương"),
      it(450000, null, "보리굴비", "Barley-aged Yellow Croaker (Borigulbi)", "大麦黄花鱼（Borigulbi）", "ボリグルビ（麦で熟成させたイシモチ）", "Cá đù ướp lúa mạch"),
      it(100000, null, "고등어 구이", "Grilled Mackerel", "烤青花鱼", "サバ焼き", "Cá thu nướng"),
      it(100000, null, "갈치 구이", "Grilled Hairtail (Galchi-gui)", "烤带鱼（Galchi-gui）", "タチウオ焼き（カルチグイ）", "Cá hố nướng"),
      it(400000, null, "우럭 구이", "Grilled Rockfish (Ureok-gui)", "烤黑鲪鱼（Ureok-gui）", "メバル焼き（ウロクグイ）", "Cá rockfish nướng"),
      it(600000, null, "모듬 생선 구이", "Assorted Grilled Fish", "什锦烤鱼", "焼き魚の盛り合わせ", "Cá nướng tổng hợp"),
      it(150000, null, "바지락 찜", "Steamed Clams", "蒸蛤蜊", "アサリの蒸し物", "Nghêu hấp"),
      it(100000, null, "꼬막 찜", "Steamed Cockles (Kkomak Jjim)", "蒸蚶子（Kkomak Jjim）", "コマク（赤貝）の蒸し物", "Sò huyết hấp"),
      it(60000, null, "폭탄 계란찜", "Bomb Steamed Egg (Poktan Gyeranjjim)", "爆款蒸蛋（Poktan Gyeranjjim）", "ふわふわ爆弾茶碗蒸し（ポクタンケランチム）", "Trứng hấp phồng"),
      it(50000, null, "초밥 밥", "Sushi Rice", "寿司饭", "寿司用ご飯", "Cơm sushi"),
      it(20000, null, "공기밥", "Steamed Rice", "米饭", "ご飯", "Cơm trắng"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒水·饮料", "お酒・ドリンク", "Đồ uống"),
    items: [
      it(120000, null, "소주 (좋은데이)", "Soju (Good Day)", "烧酒（Good Day）", "焼酎（チョウンデイ）", "Soju Good Day"),
      it(140000, null, "소주 (참이슬 · 처음처럼 · 진로이즈백 · 새로 · 선양 오리지널)", "Soju (Chamisul, Chum-churum, Jinro Is Back, Saero, Seonyang Original)", "烧酒（真露·初饮初乐·Jinro Is Back·Saero·鲜阳Original）", "焼酎（チャミスル・チョウムチョロム・ジンロイズバック・セロ・ソニャン オリジナル）", "Soju (Chamisul, Chum-churum, Jinro Is Back, Saero, Seonyang Original)"),
      it(160000, null, "선양 오크 소주", "Seonyang Oak Soju", "鲜阳橡木烧酒", "ソニャン オーク焼酎", "Soju Seonyang Oak"),
      it(140000, null, "과일 소주 (자몽 · 청포도 · 자두 · 딸기 · 복숭아 · 레몬)", "Fruit Soju (Grapefruit, Green Grape, Plum, Strawberry, Peach, Lemon)", "水果烧酒（西柚·青提·李子·草莓·桃子·柠檬）", "フルーツ焼酎（グレープフルーツ・マスカット・プラム・いちご・桃・レモン）", "Soju trái cây (bưởi, nho xanh, mận, dâu, đào, chanh)"),
      it(800000, null, "일품 진로", "Iljum Jinro (Premium Soju)", "一品真露（高端烧酒）", "イルプム ジンロ（プレミアム焼酎）", "Iljum Jinro"),
      it(650000, null, "화요", "Hwayo (Premium Soju)", "华耀（Hwayo，高端烧酒）", "ファヨ（プレミアム焼酎）", "Hwayo"),
      it(50000, null, "병맥주 (타이거)", "Bottled Beer (Tiger)", "瓶装啤酒（虎牌）", "瓶ビール（タイガー）", "Bia chai Tiger"),
      it(70000, null, "생맥주 (삿뽀로)", "Draft Beer (Sapporo)", "鲜啤（札幌）", "生ビール（サッポロ）", "Bia tươi Sapporo"),
      it(180000, null, "청하", "Chung Ha (Sake)", "清河清酒（Chung Ha）", "チョンハ（清酒）", "Chung Ha"),
      it(350000, null, "백세주", "Baekseju (Herbal Rice Wine)", "百岁酒（Baekseju）", "ペクセジュ（薬草入り米酒）", "Rượu Baekseju"),
      it(180000, null, "생 막걸리 (국순당)", "Draft Makgeolli (Kooksoondang)", "鲜米酒（麴醇堂）", "生マッコリ（国純堂）", "Makgeolli tươi (Kooksoondang)"),
      it(170000, null, "과일 막걸리 (국순당)", "Fruit Makgeolli (Kooksoondang)", "水果米酒（麴醇堂）", "フルーツマッコリ（国純堂）", "Makgeolli trái cây (Kooksoondang)"),
      it(100000, null, "알밤 막걸리 (캔 350ml)", "Chestnut Makgeolli (350ml can)", "栗子米酒（罐装350ml）", "栗マッコリ（缶350ml）", "Makgeolli hạt dẻ (lon 350ml)"),
      it(200000, null, "보드카", "Vodka", "伏特加", "ウォッカ", "Vodka"),
      it(20000, null, "콜라 · 사이다 · 환타", "Coke, Sprite (Cider), Fanta", "可乐·雪碧·芬达", "コーラ・サイダー・ファンタ", "Coca, Sprite, Fanta"),
      it(50000, null, "아침햇살 · 솔의눈 · 밀키스", "Morning Sunshine (Rice Drink), Pine Bud Drink, Milkis", "朝日阳光（大米饮料）·松之雪·Milkis", "朝の光（アチムヘッサル）・ソルの目・ミルキス", "Achimhaetsal (nước gạo), Solui-nun, Milkis"),
      it(40000, null, "왕라오지", "Wanglaoji (Herbal Tea)", "王老吉凉茶", "王老吉（ハーブティー）", "Trà thảo mộc Wanglaoji"),
    ],
  },
];
