// 온반(ONBAN) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(세워 둔 큰 메뉴판 menu_01·04·05·06·07·09·10 같은 판, 2026-11-09 수집)
// 여름 별미 세움 간판(menu_11)과 대조: 물막국수만 그쪽이 높음(180K ↔ 160K) → 높은 쪽 씀. 닭냉채·오징어는 큰 메뉴판이 높음 (docs/todo.md)
// 공기밥은 큰 메뉴판에 손글씨로 25K로 고쳐 씀(원래 15K로 보임) → 25K
// 점심특선 10%·저녁 소주 100K(menu_08)는 2026/06/01~06/15 행사라 넣지 않음
// 베트남어 이름은 menu_08·11·12·14 포스터 표기를 따름
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만)
window.RESTAURANT = {
  brand: { ko: "온반", en: "ONBAN" },
  phone: "039 368 3795",
  address: "TT3-C18 Five Star, Ngõ 154 Đình Thôn, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:00 – 22:00", // 구글 지도 '오전 11:00~오후 10:00'. 메뉴판엔 시간 없음
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ price: price ?? null, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "main",
    name: T("요리", "Main Dishes", "主菜", "料理", "Món chính"),
    items: [
      it(530000, "hangjeong", T("온반 항정 전골", "Onban Pork Jowl Hot Pot", "ONBAN 猪颈肉火锅", "オンバン 豚トロ鍋", "Lẩu thịt heo nọng Onban"), { tag: "must", desc: T("깔끔한 곰탕과 시원한 조개 육수의 만남, 온반의 명품 맑은 항정살 전골", "Clear pork bone soup meets a cool clam broth in Onban's signature pork jowl hot pot", "清爽的猪骨汤与鲜美的蛤蜊高汤相遇,ONBAN 招牌清汤猪颈肉火锅", "すっきりしたコムタンと爽やかなあさり出汁が出会う、オンバン自慢の澄んだ豚トロ鍋", "Nước dùng hầm trong vắt hòa cùng nước dùng nghêu mát lành, lẩu thịt heo nọng thanh đạm đặc trưng của Onban") }),
      it(560000, "bossam", T("온반 보쌈", "Onban Bossam (Boiled Pork Wraps)", "ONBAN 菜包肉(Bossam)", "オンバン ポッサム(茹で豚の包み)", "Bossam Hàn Quốc"), { desc: T("촉촉한 삼겹 수육과 감칠맛 폭발 보쌈속 환상궁합", "Juicy boiled pork belly with savory bossam kimchi filling, a perfect match", "鲜嫩多汁的水煮五花肉配上鲜味十足的菜包馅料,绝妙搭配", "しっとり茹でた豚バラ肉と旨みたっぷりのポッサムの具が絶妙な組み合わせ", "Thịt ba chỉ luộc mềm ẩm ăn cùng nhân bossam đậm vị, một sự kết hợp tuyệt vời") }),
      it(590000, null, T("닭볶음탕", "Spicy Braised Chicken (Dakbokkeumtang)", "辣炖鸡(Dakbokkeumtang)", "タッポックンタン(鶏の辛煮込み)", "Gà hầm cay kiểu Hàn"), { spicy: true, desc: T("매콤달콤 특제 양념이 쏙 밴 밥도둑 닭볶음탕 · 조리 30분", "Chicken braised in a sweet and spicy house sauce, great with rice · Cooking time about 30 min", "浸满香辣微甜特制酱料的炖鸡,非常下饭 · 烹饪时间约30分钟", "甘辛い特製ダレがしみ込んだ、ご飯が進む鶏の辛煮込み · 調理時間 約30分", "Gà hầm với sốt đặc biệt cay ngọt thấm đượm, rất đưa cơm · Thời gian chế biến khoảng 30 phút") }),
      it(590000, "jjimdak", T("온반 찜닭", "Onban Braised Chicken in Soy Sauce (Jjimdak)", "ONBAN 酱焖鸡(Jjimdak)", "オンバン チムタク(鶏の醤油煮込み)", "Gà om tương kiểu Hàn"), { desc: T("단짠단짠 비법 간장 소스의 푸짐한 별미 찜닭 · 조리 30분", "Hearty braised chicken in a secret sweet-salty soy sauce · Cooking time about 30 min", "秘制酱油酱汁甜咸适口,分量十足的酱焖鸡 · 烹饪时间约30分钟", "甘じょっぱい秘伝の醤油ダレで煮込んだボリューム満点のチムタク · 調理時間 約30分", "Gà om sốt tương bí quyết ngọt mặn hài hòa, phần ăn đầy đặn · Thời gian chế biến khoảng 30 phút") }),
      it(360000, null, T("산더미 파채 대패두루치기", "Duruchigi (Spicy Thin Pork Belly Stir-Fry with Scallions)", "葱丝堆山薄切五花肉辣炒(Duruchigi)", "山盛りネギの薄切り豚バラ炒め(トゥルチギ)", "Heo xào cay hành sợi"), { spicy: true, desc: T("불맛 나게 볶은 대패삼겹과 파절이 가득, 자작한 매콤 전골", "Fire-grilled thin-sliced pork belly piled with scallion salad, in a spicy simmering sauce", "爆炒出锅气的薄切五花肉配满满的葱丝,汤汁浓稠的香辣火锅", "香ばしく炒めた薄切り豚バラとネギサラダたっぷり、煮汁少なめのピリ辛鍋", "Thịt ba chỉ thái mỏng xào lửa lớn thơm khói cùng thật nhiều hành sợi, nước sốt cay sền sệt") }),
      it(300000, null, T("오징어 볶칼면", "Spicy Stir-Fried Squid with Knife-Cut Noodles", "辣炒鱿鱼刀切面", "イカ炒めカルグクス", "Mì xào mực cay"), { spicy: true, desc: T("화끈한 불맛 오징어볶음과 쫄깃한 칼국수면", "Fiery stir-fried squid with chewy knife-cut noodles", "火辣爆炒鱿鱼配上筋道的刀切面", "火の香り豊かなイカ炒めと、もちもちのカルグクス麺", "Mực xào cay đậm vị lửa cùng sợi mì cắt dai ngon") }),
      it(290000, null, T("온반 닭냉채", "Onban Cold Chicken Salad", "ONBAN 凉拌鸡肉", "オンバン 鶏の冷菜", "Gỏi gà lạnh kiểu Hàn"), { desc: T("부드러운 닭가슴살과 톡 쏘는 상큼 닭냉채", "Tender chicken breast in a tangy, refreshing cold salad", "嫩滑鸡胸肉配上酸爽开胃的凉拌汁", "やわらかい鶏むね肉とピリッと爽やかな冷菜", "Ức gà mềm trộn nước sốt chua nhẹ the mát, ăn lạnh") }),
    ],
  },
  {
    id: "meal",
    name: T("곰탕 · 막국수", "Pork Soup · Buckwheat Noodles", "猪骨汤 · 荞麦面", "コムタン · マッククス", "Canh hầm · Mì kiều mạch"),
    items: [
      it(180000, "gomtang", T("맑은 돼지곰탕", "Clear Pork Bone Soup (Gomtang)", "清汤猪骨汤(Gomtang)", "澄んだ豚コムタン", "Canh thịt heo hầm"), { tag: "best", desc: T("깊고 맑은 육수, 담백하고 깔끔한 돼지곰탕", "Deep, clear broth in a light and clean pork soup", "汤底浓郁清澈,清淡爽口的猪骨汤", "深みがあって澄んだスープの、あっさりすっきり豚コムタン", "Nước dùng đậm đà trong vắt, canh thịt heo hầm thanh đạm") }),
      it(180000, null, T("얼큰 돼지곰탕", "Spicy Pork Bone Soup (Gomtang)", "香辣猪骨汤(Gomtang)", "辛口 豚コムタン", "Canh thịt heo hầm cay"), { spicy: true, desc: T("특제 양념으로 완성한 칼칼하고 시원한 해장곰탕", "A hot, refreshing hangover soup finished with a special seasoning", "特制调味,辛辣爽口的解酒猪骨汤", "特製ダレで仕上げた、辛くてすっきりした二日酔い向けコムタン", "Canh hầm cay nồng mát lành nêm sốt đặc biệt, rất hợp để giải rượu") }),
      it(180000, null, T("물막국수", "Cold Buckwheat Noodles in Broth (Mul Makguksu)", "冷汤荞麦面(Mul Makguksu)", "水マッククス(冷たいそば)", "Mì kiều mạch nước lạnh"), { desc: T("새콤달콤한 비법 육수로 가슴까지 시원한 여름별미", "A summer treat with a sweet and tangy secret broth that cools you down", "酸甜秘制冷汤,透心凉的夏日美味", "甘酸っぱい秘伝のスープで胸まですっきり、夏の味", "Món mùa hè với nước dùng bí quyết chua ngọt, mát lạnh sảng khoái") }),
      it(160000, "deulgireum", T("들기름 막국수", "Perilla Oil Buckwheat Noodles", "紫苏油荞麦拌面", "エゴマ油マッククス", "Mì kiều mạch dầu tía tô"), { desc: T("고소한 들기름과 김가루, 풍미 가득한 비빔 막국수", "Mixed buckwheat noodles with nutty perilla oil and seaweed flakes", "香浓紫苏油与海苔碎,风味十足的拌荞麦面", "香ばしいエゴマ油と刻み海苔、風味豊かな和えマッククス", "Mì kiều mạch trộn dầu tía tô béo thơm và rong biển vụn, đậm hương vị") }),
    ],
  },
  {
    id: "side",
    name: T("수육 · 전", "Boiled Pork · Pancake", "水煮肉 · 煎饼", "スユク · チヂミ", "Thịt luộc · Bánh chiên"),
    items: [
      it(200000, null, T("불향간장수육", "Fire-Flavored Soy Sauce Boiled Pork (Suyuk)", "火香酱油水煮肉(Suyuk)", "香ばし醤油スユク(茹で豚)", "Thịt luộc xốt tương khò lửa"), { desc: T("은은한 불향과 간장 소스, 입안에서 녹는 부드러운 수육", "Soft boiled pork with a subtle smoky flavor and soy sauce that melts in your mouth", "淡淡火香配酱油酱汁,入口即化的软嫩水煮肉", "ほのかな火の香りと醤油ダレ、口の中でとろけるやわらかスユク", "Thịt luộc mềm tan trong miệng, thoang thoảng mùi khói lửa và sốt tương") }),
      it(180000, "gamjajeon", T("바삭 감자채전", "Crispy Shredded Potato Pancake", "香脆土豆丝煎饼", "サクサク じゃがいもチヂミ", "Bánh khoai tây sợi giòn"), { desc: T("그라나파다노 치즈와 사워크림, 바삭함을 살린 별미전", "A crispy pancake topped with Grana Padano cheese and sour cream", "搭配格拉娜帕达诺奶酪和酸奶油,口感酥脆的特色煎饼", "グラナ・パダーノチーズとサワークリームをのせた、サクサク食感のチヂミ", "Bánh chiên giòn rụm ăn cùng phô mai Grana Padano và kem chua") }),
    ],
  },
  {
    id: "extra",
    name: T("추가 메뉴", "Extras", "加点", "追加メニュー", "Món thêm"),
    items: [
      it(25000, null, T("공기밥", "Steamed Rice", "米饭", "ご飯", "Cơm trắng")),
      it(60000, null, T("볶음밥", "Fried Rice", "炒饭", "チャーハン", "Cơm chiên"), { desc: T("닭볶음탕 주문 시 가능", "Available when ordering Spicy Braised Chicken", "点辣炖鸡时可加点", "タッポックンタンご注文時のみ", "Chỉ gọi được khi đặt món gà hầm cay") }),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Alcohol · Drinks", "酒水 · 饮料", "お酒 · ドリンク", "Rượu · Đồ uống"),
    items: [
      it(150000, null, T("소주", "Soju", "烧酒", "焼酎(ソジュ)", "Soju"), { desc: T("참이슬 · 처음처럼 · 진로 · 새로 · 좋은데이", "Chamisul · Chum Churum · Jinro · Saero · Good Day", "真露(Chamisul) · Chum Churum · Jinro · Saero · Good Day", "チャミスル · チョウムチョロム · ジンロ · セロ · グッデー", "Chamisul · Chum Churum · Jinro · Saero · Good Day") }),
      it(50000, null, T("맥주", "Beer", "啤酒", "ビール", "Bia"), { desc: T("타이거 · 사이공", "Tiger · Saigon", "虎牌(Tiger) · 西贡(Saigon)", "タイガー · サイゴン", "Tiger · Saigon") }),
      it(160000, null, T("막걸리", "Makgeolli (Rice Wine)", "马格利酒(Makgeolli)", "マッコリ", "Makgeolli (rượu gạo Hàn Quốc)"), { desc: T("장수 막걸리", "Jangsu Makgeolli", "长寿马格利酒(Jangsu Makgeolli)", "長寿マッコリ", "Jangsu Makgeolli") }),
      it(25000, null, T("음료", "Soft Drinks", "饮料", "ドリンク", "Nước giải khát")),
    ],
  },
];
