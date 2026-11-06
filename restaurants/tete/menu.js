// 떼떼분식 박닌점 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음). 출처: 구글 지도에 올라온 메뉴판 사진(2026-11-06 수집). 같은 메뉴가 사진마다 다르면 높은 쪽 가격(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "떼떼분식", en: "Tê Tê Kimbap & Tokkbokki" },
  phone: "0961198949",
  address: "124 Nguyễn Cao, Bắc Ninh",
  wifi: null,
  hours: "10:00 – 22:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

// 순살치킨 맛 공통 크기·가격(양념 계열)
const CH = [["5조각 (5pcs)", 89000], ["8조각 (8pcs)", 129000], ["11조각 (11pcs)", 169000]];

window.MENU = [
  {
    id: "tokbokki",
    name: T("떡볶이", "Tteokbokki", "辣炒年糕", "トッポッキ", "Tokbokki"),
    items: [
      it(129000, "rose", T("로제떡볶이", "Rose Tteokbokki", "玫瑰酱辣炒年糕", "ロゼトッポッキ", "Tokbokki Rose Tê Tê"), { tag: "best" }),
      it(109000, null, T("미니 로제떡볶이", "Mini Rose Tteokbokki", "迷你玫瑰酱辣炒年糕", "ミニロゼトッポッキ", "Tokbokki Rose Tê Tê Mini")),
      it(89000, null, T("떼떼떡볶이", "Tê Tê Tteokbokki", "Tê Tê辣炒年糕", "テテ・トッポッキ", "Tokbokki Tê Tê"), { tag: "must" }),
      it(155000, null, T("마라떡볶이", "Mala Tteokbokki (numbing spicy)", "麻辣辣炒年糕", "マーラートッポッキ(しびれ辛)", "Tokbokki MaLa"), { spicy: true }),
      it(159000, null, T("마라로제 떡볶이", "Mala Rose Tteokbokki (numbing spicy, creamy)", "麻辣玫瑰酱辣炒年糕", "マーラーロゼトッポッキ(しびれ辛・クリーミー)", "Tokbokki Rose MaLa"), { spicy: true }),
      it(139000, null, T("떼떼닭볶이", "Tê Tê Spicy Chicken Tteokbokki (Dakbokki)", "Tê Tê辣炒鸡", "テテ・タッポキ(辛い鶏炒め)", "Tokbokki Gà cay"), { spicy: true, desc: T("매운 닭볶이", "Spicy chicken stir-fry", "辣味炒鸡", "辛い鶏炒め", "Gà xào cay") }),
      it(99000, null, T("짜장떡볶이", "Black Bean Tteokbokki (Jjajang)", "炸酱辣炒年糕", "チャジャン・トッポッキ", "Tokbokki Tương đen")),
      it(99000, null, T("치즈떡볶이", "Cheese Tteokbokki", "芝士辣炒年糕", "チーズトッポッキ", "Tokbokki Cheese")),
      it(179000, null, T("떼떼모듬떡볶이", "Tê Tê Tteokbokki with Assorted Fried Snacks", "Tê Tê辣炒年糕配什锦炸物", "テテ・トッポッキ+揚げ物盛り合わせ", "Tokbokki Tê Tê + Bánh chiên tổng hợp"), { desc: T("떼떼떡볶이 + 모듬튀김", "Tê Tê Tteokbokki + assorted fried snacks", "Tê Tê辣炒年糕 + 什锦炸物", "テテ・トッポッキ + 揚げ物盛り合わせ", "Tokbokki Tê Tê + bánh chiên tổng hợp") }),
    ],
  },
  {
    id: "topping",
    name: T("떡볶이 토핑 추가", "Tteokbokki Toppings", "辣炒年糕加料", "トッポッキ追加トッピング", "Thêm topping cho Tokbokki"),
    items: [
      it(25000, null, T("떡", "Rice Cake (Tteok)", "年糕", "トック(餅)", "Tok")),
      it(25000, null, T("어묵", "Fish Cake (Eomuk)", "鱼饼", "おでん(練り物)", "Chả cá")),
      it(25000, null, T("통유부", "Whole Fried Tofu Pouch (Yubu)", "整块油豆腐", "丸ごと油揚げ", "Đậu khô")),
      it(10000, null, T("삶은계란", "Boiled Egg", "煮鸡蛋", "ゆで卵", "Trứng luộc")),
      it(35000, null, T("분모자", "Flat Konjac-Starch Cakes (Bunmoja)", "魔芋粉年糕", "プンモジャ(春雨もち)", "Tok Trung Quốc")),
      it(35000, null, T("소시지", "Sausage", "香肠", "ソーセージ", "Xúc xích")),
      it(25000, null, T("치즈", "Extra Cheese", "加芝士", "チーズ追加", "Thêm cheese")),
      it(25000, null, T("건두부면", "Dried Tofu Noodles", "干豆腐丝", "乾燥豆腐麺", "Sợi mì đậu")),
      it(35000, null, T("중국당면", "Chinese Glass Noodles", "中式粉丝", "中国春雨", "Miến Trung Quốc")),
    ],
  },
  {
    id: "fried",
    name: T("튀김 · 어묵", "Fried Snacks & Fish Cakes", "炸物 · 鱼饼", "揚げ物 · おでん", "Đồ chiên · Chả cá"),
    items: [
      it(119000, null, T("모듬튀김", "Assorted Fried Snacks Set", "什锦炸物套餐", "揚げ物盛り合わせ", "Set Bánh Chiên ăn kèm Tokbokki Tê Tê"), { desc: T("해시브라운·오징어튀김·만두튀김·김말이튀김·고구마튀김·봉어묵튀김·새우튀김·깻잎튀김·고추튀김 각 1개", "1 each: hash brown, fried squid, fried dumpling, fried gimmari (glass-noodle roll), fried sweet potato, fried fish-cake stick, fried shrimp, fried perilla leaf, fried chili pepper", "薯饼、炸鱿鱼、炸饺子、炸紫菜卷、炸红薯、炸鱼饼棒、炸虾、炸紫苏叶、炸辣椒各1个", "ハッシュブラウン・イカ天・揚げ餃子・キムマリ天・サツマイモ天・棒おでん天・エビ天・えごまの葉天・唐辛子天 各1個", "Mỗi loại 1 cái: khoai tây chiên, mực chiên, màn thầu chiên, bánh kim chiên, khoai lang chiên, chả cá dài chiên, tôm chiên, lá mè chiên, ớt chiên") }),
      it(39000, null, T("오징어튀김 (2개)", "Fried Squid (2 pcs)", "炸鱿鱼(2个)", "イカ天(2個)", "Mực chiên 2pcs")),
      it(39000, null, T("해시브라운 (2개)", "Hash Brown (2 pcs)", "薯饼(2个)", "ハッシュブラウン(2個)", "Khoai tây chiên 2pcs")),
      it(39000, null, T("치킨너겟 (5개)", "Chicken Nuggets (5 pcs)", "鸡块(5个)", "チキンナゲット(5個)", "Gà vòng chiên 5pcs")),
      it(29000, null, T("김말이튀김 (3개)", "Fried Gimmari, Glass-Noodle Seaweed Roll (3 pcs)", "炸紫菜卷(3个)", "キムマリ天(3個)", "Bánh kim chiên 3pcs")),
      it(19000, null, T("새우튀김 (1개)", "Fried Shrimp (1 pc)", "炸虾(1个)", "エビ天(1個)", "Tôm chiên 1pcs")),
      it(15000, null, T("고구마튀김 (1개)", "Fried Sweet Potato (1 pc)", "炸红薯(1个)", "サツマイモ天(1個)", "Khoai lang chiên 1pcs")),
      it(15000, null, T("봉어묵튀김 (1개)", "Fried Fish-Cake Stick (1 pc)", "炸鱼饼棒(1个)", "棒おでん天(1個)", "Chả cá dài chiên 1pcs")),
      it(15000, null, T("만두튀김 (1개)", "Fried Dumpling (1 pc)", "炸饺子(1个)", "揚げ餃子(1個)", "Màn thầu chiên 1pcs")),
      it(19000, null, T("깻잎튀김 (1개)", "Fried Perilla Leaf (1 pc)", "炸紫苏叶(1个)", "えごまの葉天(1個)", "Lá mè chiên 1pcs")),
      it(19000, null, T("고추튀김 (1개)", "Fried Chili Pepper (1 pc)", "炸辣椒(1个)", "唐辛子天(1個)", "Ớt chiên 1pcs")),
      it(19000, null, T("야채튀김 (1개)", "Fried Vegetables (1 pc)", "炸蔬菜(1个)", "野菜天(1個)", "Rau củ chiên 1pcs")),
      it(69000, null, T("어묵탕", "Fish Cake Soup (Eomuk-tang)", "鱼饼汤", "おでん汁(オムクタン)", "Canh chả cá")),
      it(20000, null, T("어묵 꼬치 추가 (1개)", "Extra Fish Cake Skewer (1 pc)", "加鱼饼串(1串)", "おでん串追加(1本)", "Thêm 1 xiên chả cá")),
    ],
  },
  {
    id: "kimbap",
    name: T("김밥", "Kimbap", "紫菜包饭", "キンパ", "Kimbap"),
    items: [
      it(55000, "kimbap", T("떼떼 김밥", "Tê Tê Kimbap", "Tê Tê紫菜包饭", "テテ・キンパ", "Kimbap Tê Tê"), { tag: "must" }),
      it(65000, null, T("참치 김밥", "Tuna Kimbap", "金枪鱼紫菜包饭", "ツナキンパ", "Kimbap Cá Ngừ")),
      it(65000, null, T("우엉 김밥", "Burdock Root Kimbap", "牛蒡紫菜包饭", "ごぼうキンパ", "Kimbap Ngưu Bàng")),
      it(95000, null, T("스팸 김밥", "Spam Kimbap", "午餐肉紫菜包饭", "スパムキンパ", "Kimbap Spam")),
      it(65000, null, T("진미채 김밥", "Seasoned Dried Squid Kimbap (Jinmichae)", "调味鱿鱼丝紫菜包饭", "味付けイカ干しキンパ(チンミチェ)", "Kimbap Mực khô")),
      it(65000, null, T("치즈 김밥", "Cheese Kimbap", "芝士紫菜包饭", "チーズキンパ", "Kimbap Cheese")),
      it(65000, null, T("소불고기 김밥", "Beef Bulgogi Kimbap", "牛肉烤肉紫菜包饭", "牛プルコギキンパ", "Kimbap Thịt bò")),
      it(65000, null, T("유부 김밥", "Fried Tofu Pouch Kimbap (Yubu)", "油豆腐紫菜包饭", "油揚げキンパ", "Kimbap Đậu khô")),
      it(65000, null, T("양념치킨 김밥", "Seasoned Fried Chicken Kimbap (Yangnyeom)", "甜辣炸鸡紫菜包饭", "ヤンニョムチキンキンパ", "Kimbap Gà sốt gia vị")),
      it(65000, null, T("치킨마요 김밥", "Chicken Mayo Kimbap", "鸡肉蛋黄酱紫菜包饭", "チキンマヨキンパ", "Kimbap Gà mayo")),
      it([["3개 (3pcs)", 55000], ["12개 (12pcs)", 159000]], null, T("꼬마김밥", "Mini Kimbap (Kkoma Kimbap)", "迷你紫菜包饭", "ミニキンパ(コマキンパ)", "Kimbap Mini")),
      it(65000, null, T("진미채 꼬마김밥 (4개)", "Mini Seasoned Dried Squid Kimbap (4 pcs)", "调味鱿鱼丝迷你紫菜包饭(4个)", "ミニ味付けイカ干しキンパ(4個)", "Kimbap mực Mini 4pcs")),
    ],
  },
  {
    id: "keto",
    name: T("키토김밥", "Keto Kimbap", "生酮紫菜包饭", "ケトキンパ", "Kimbap Keto"),
    items: [
      it(65000, null, T("떼떼 키토김밥", "Tê Tê Keto Kimbap", "Tê Tê生酮紫菜包饭", "テテ・ケトキンパ", "Kimbap Keto Tê Tê")),
      it(85000, null, T("참치 키토김밥", "Tuna Keto Kimbap", "金枪鱼生酮紫菜包饭", "ツナケトキンパ", "Kimbap Keto Cá Ngừ")),
      it(85000, null, T("소불고기 키토김밥", "Beef Bulgogi Keto Kimbap", "牛肉烤肉生酮紫菜包饭", "牛プルコギケトキンパ", "Kimbap Keto Thịt bò")),
    ],
  },
  {
    id: "set",
    name: T("김밥 도시락", "Kimbap Lunch Sets", "紫菜包饭套餐", "キンパ弁当", "Set Kimbap"),
    items: [
      it(109000, null, T("김밥 도시락 세트", "Kimbap Lunch Set", "紫菜包饭套餐(含炸鸡)", "キンパ弁当セット", "Set Kimbap + Gà"), { desc: T("김밥 1종 + 치킨 1종 선택. 기본 떼떼 김밥, 변경 시 추가금: 참치·우엉·진미채·치즈·소불고기·유부·양념치킨·치킨마요 +20,000 / 스팸 +50,000. 치킨: 후라이드·양념·간장·양파크림·마라·뿌링클·고추마요", "Choose 1 kimbap + 1 chicken. Default is Tê Tê Kimbap; to change, extra charge: tuna, burdock, seasoned dried squid, cheese, beef bulgogi, fried tofu pouch, seasoned chicken, chicken mayo +20,000 / Spam +50,000. Chicken: fried, seasoned, soy, onion cream, Mala, Bburinkle (cheese seasoning), chili mayo", "紫菜包饭1种 + 炸鸡1种任选。默认Tê Tê紫菜包饭,更换需加价:金枪鱼、牛蒡、调味鱿鱼丝、芝士、牛肉烤肉、油豆腐、甜辣炸鸡、鸡肉蛋黄酱 +20,000 / 午餐肉 +50,000。炸鸡:原味、甜辣、酱油、洋葱奶油、麻辣、芝士粉(Bburinkle)、辣椒蛋黄酱", "キンパ1種 + チキン1種を選択。基本はテテ・キンパ、変更時の追加料金:ツナ・ごぼう・味付けイカ干し・チーズ・牛プルコギ・油揚げ・ヤンニョムチキン・チキンマヨ +20,000 / スパム +50,000。チキン:フライド・ヤンニョム・醤油・オニオンクリーム・マーラー・ブリンクル(チーズシーズニング)・唐辛子マヨ", "Chọn 1 loại kimbap + 1 loại gà. Mặc định là Kimbap Tê Tê, đổi loại phụ thu: cá ngừ, ngưu bàng, mực khô, cheese, thịt bò, đậu khô, gà sốt gia vị, gà mayo +20,000 / Spam +50,000. Gà: chiên truyền thống, sốt gia vị, sốt nước tương, sốt kem hành, Mala, rắc phô mai, mayo ớt") }),
      it(119000, null, T("충무김밥 도시락 세트", "Chungmu Kimbap Lunch Set", "忠武紫菜包饭套餐", "チュンムキンパ弁当セット", "Set Kimbap Chungmu"), { desc: T("충무김밥 + 오징어어묵 무침 + 단무지 무침", "Chungmu kimbap + seasoned squid and fish cake + seasoned pickled radish", "忠武紫菜包饭 + 凉拌鱿鱼鱼饼 + 凉拌腌萝卜", "チュンムキンパ + イカとおでんの和え物 + たくあん和え", "Kimbap Chungmu + mực chả cá trộn + củ cải muối trộn") }),
    ],
  },
  {
    id: "rice",
    name: T("밥 · 유부초밥", "Rice Dishes & Tofu Pouch Rice", "米饭 · 豆腐包饭", "ご飯もの · いなり寿司", "Cơm"),
    items: [
      it(89000, null, T("치킨마요 덮밥", "Chicken Mayo Rice Bowl", "鸡肉蛋黄酱盖饭", "チキンマヨ丼", "Cơm gà mayo")),
      it(89000, null, T("참치마요 덮밥", "Tuna Mayo Rice Bowl", "金枪鱼蛋黄酱盖饭", "ツナマヨ丼", "Cơm cá ngừ mayo")),
      it(89000, "chickenrice", T("양념치킨 덮밥", "Seasoned Fried Chicken Rice Bowl (Yangnyeom)", "甜辣炸鸡盖饭", "ヤンニョムチキン丼", "Cơm gà gia vị")),
      it(129000, "bibimbap", T("소고기 비빔밥", "Beef Bibimbap", "牛肉拌饭", "牛肉ビビンバ", "Bibimbap thịt bò")),
      it([["1조각 (1pc)", 145000], ["2조각 (2pcs)", 199000]], null, T("돈가스 도시락", "Pork Cutlet Lunch Box (Donkatsu)", "炸猪排便当", "とんかつ弁当(トンカツ)", "Set Thịt chiên xù Tonkasu")),
      it(45000, null, T("대왕 계란 유부초밥", "Giant Egg Tofu Pouch Rice (Yubu-chobap)", "超大鸡蛋豆腐包饭", "特大卵いなり寿司", "Cơm Túi Đậu Trứng")),
      it(55000, null, T("대왕 참치 유부초밥", "Giant Tuna Tofu Pouch Rice (Yubu-chobap)", "超大金枪鱼豆腐包饭", "特大ツナいなり寿司", "Cơm Túi Đậu Cá Ngừ")),
      it(55000, null, T("대왕 소불고기 유부초밥", "Giant Beef Bulgogi Tofu Pouch Rice (Yubu-chobap)", "超大牛肉烤肉豆腐包饭", "特大牛プルコギいなり寿司", "Cơm Túi Đậu Bò")),
    ],
  },
  {
    id: "noodle",
    name: T("면", "Noodles", "面食", "麺類", "Mỳ"),
    items: [
      it(109000, "jjajang", T("짜장면", "Black Bean Noodles (Jjajangmyeon)", "炸酱面", "ジャジャン麺", "Mỳ tương đen")),
      it(109000, null, T("쫄면", "Chewy Spicy Cold Noodles (Jjolmyeon)", "辣拌筋道面(Jjolmyeon)", "チョルミョン(もちもち辛い麺)", "Mỳ lạnh dai cay Jjolmyeon"), { spicy: true }),
      it(109000, null, T("비빔국수", "Spicy Mixed Noodles (Bibimguksu)", "韩式辣拌面", "ビビン麺(ビビムクスク)", "Mỳ trộn cay ngọt Bibimkuksu"), { spicy: true }),
      it(79000, null, T("라면", "Instant Ramen (Ramyeon)", "拉面(方便面)", "ラーメン(ラミョン)", "Mỳ tôm")),
      it(129000, null, T("불마요 메밀국수", "Spicy Mayo Buckwheat Noodles (Bul-mayo Memil)", "辣味蛋黄酱荞麦面", "ブルマヨそば", "Mỳ kiều mạch sốt BTS"), { spicy: true, desc: T("들기름·매콤 마요 소스 메밀면", "Buckwheat noodles with perilla oil and spicy mayo sauce", "香油辣味蛋黄酱酱汁荞麦面", "えごま油と辛口マヨソースのそば", "Mỳ kiều mạch sốt dầu mè và mayo cay") }),
      it(109000, null, T("들기름 메밀국수", "Perilla Oil Buckwheat Noodles (Deulgireum Memil)", "香油荞麦面", "えごま油そば", "Mỳ kiều mạch sốt mè")),
      it(109000, null, T("물냉면", "Cold Broth Noodles (Mul Naengmyeon)", "冷汤面", "水冷麺(ムルネンミョン)", "Mỳ Lạnh Nước")),
      it(109000, null, T("비빔냉면", "Spicy Mixed Cold Noodles (Bibim Naengmyeon)", "辣拌冷面", "ビビン冷麺", "Mỳ Lạnh Trộn"), { spicy: true }),
      it(99000, null, T("냉모밀", "Cold Soba Noodles (Naengmomil)", "冷荞麦面", "冷やしそば(ネンモミル)", "Mỳ lạnh Soba")),
    ],
  },
  {
    id: "sundae",
    name: T("순대", "Sundae (Korean Blood Sausage)", "血肠(顺大)", "スンデ(韓国風血ソーセージ)", "Dồi"),
    items: [
      it(109000, null, T("순대 · 내장 반반 (순대 50% + 내장 50%)", "Half Sundae, Half Offal (50% Sundae + 50% Offal)", "血肠 · 内脏各半(血肠50% + 内脏50%)", "スンデ・内臓半々(スンデ50% + 内臓50%)", "Dồi 50% + Lòng 50%")),
      it(109000, null, T("순대 100%", "Sundae 100%", "血肠100%", "スンデ100%", "Dồi 100%")),
      it(109000, null, T("내장 100% (간·허파·염통·울대)", "Offal 100% (liver, lung, heart, windpipe)", "内脏100%(肝、肺、心、气管)", "内臓100%(レバー・肺・ハツ・気管)", "Lòng 100%")),
      it(189000, null, T("순대 + 내장 (각 100%)", "Sundae + Offal (100% each)", "血肠 + 内脏(各100%)", "スンデ + 内臓(各100%)", "Dồi 100% + Lòng 100%")),
      it(10000, null, T("장 추가 (막장·초장·쌈장)", "Extra Sauce (Makjang / Chojang / Ssamjang)", "加酱料(大酱 / 醋辣酱 / 包饭酱)", "タレ追加(マクチャン・チョジャン・サムジャン)", "Thêm sốt (Makchang / Chojang / Samjang)")),
    ],
  },
  {
    id: "chicken",
    name: T("치킨", "Fried Chicken", "炸鸡", "チキン", "Gà chiên"),
    items: [
      it([["5조각 (5pcs)", 75000], ["8조각 (8pcs)", 119000], ["11조각 (11pcs)", 159000]], null, T("후라이드 순살치킨", "Boneless Fried Chicken (Original)", "原味无骨炸鸡", "フライド・骨なしチキン", "Gà chiên truyền thống"), { tag: "best" }),
      it(CH, null, T("양념 순살치킨", "Boneless Sweet & Spicy Chicken (Yangnyeom)", "甜辣无骨炸鸡", "ヤンニョム・骨なしチキン", "Gà sốt gia vị cay ngọt")),
      it(CH, null, T("간장 순살치킨", "Boneless Soy Garlic Chicken (Ganjang)", "酱油无骨炸鸡", "醤油・骨なしチキン", "Gà sốt nước tương")),
      it(CH, null, T("마라 순살치킨", "Boneless Mala Chicken (numbing spicy)", "麻辣无骨炸鸡", "マーラー・骨なしチキン(しびれ辛)", "Gà sốt Mala cay"), { spicy: true }),
      it(CH, null, T("양파크림 순살치킨", "Boneless Onion Cream Chicken", "洋葱奶油无骨炸鸡", "オニオンクリーム・骨なしチキン", "Gà sốt kem hành")),
      it(CH, null, T("고추마요 순살치킨", "Boneless Chili Mayo Chicken", "辣椒蛋黄酱无骨炸鸡", "唐辛子マヨ・骨なしチキン", "Gà sốt mayo ớt")),
      it(CH, null, T("뿌링클 순살치킨", "Boneless Bburinkle Chicken (cheese seasoning)", "芝士粉(Bburinkle)无骨炸鸡", "ブリンクル・骨なしチキン(チーズシーズニング)", "Gà rắc phô mai")),
    ],
  },
  {
    id: "salad",
    name: T("샐러드", "Salads", "沙拉", "サラダ", "Salad"),
    note: T("소스 1가지 기본 선택 (사우전·참깨·상큼치즈·매콤치즈·오리엔탈) · 소스 추가 33,000₫", "Choose 1 sauce (Thousand Island · Sesame · Sweet Cheese · Spicy Cheese · Oriental) · Extra sauce 33,000₫", "可选1种酱汁(千岛酱 · 芝麻酱 · 清爽奶酪酱 · 香辣奶酪酱 · 东方酱)· 加酱汁 33,000₫", "ソース1種類を選択(サウザン・ごま・さっぱりチーズ・ピリ辛チーズ・オリエンタル)· ソース追加 33,000₫", "Chọn 1 loại sốt (Thousand Island · Mè rang · Phô mai trắng · Phô mai cay · Oriental) · Thêm sốt 33,000₫"),
    items: [
      it(169000, null, T("훈제오리 샐러드", "Smoked Duck Salad", "烟熏鸭肉沙拉", "燻製鴨サラダ", "Salad Vịt hun khói")),
      it(109000, null, T("닭가슴살 샐러드", "Chicken Breast Salad", "鸡胸肉沙拉", "鶏むね肉サラダ", "Salad Ức gà")),
      it(109000, null, T("치킨 샐러드", "Fried Chicken Salad", "炸鸡沙拉", "フライドチキンサラダ", "Salad Gà chiên")),
      it(109000, null, T("새우 샐러드", "Shrimp Salad", "虾仁沙拉", "エビサラダ", "Salad Tôm")),
      it(109000, null, T("참치 샐러드", "Tuna Salad", "金枪鱼沙拉", "ツナサラダ", "Salad Cá ngừ")),
      it(109000, null, T("유부 샐러드", "Fried Tofu Pouch Salad (Yubu)", "油豆腐沙拉", "油揚げサラダ", "Salad Đậu")),
      it(89000, null, T("콥 샐러드", "Cobb Salad", "科布沙拉", "コブサラダ", "Salad Cobe")),
    ],
  },
  {
    id: "side",
    name: T("사이드", "Sides", "小食", "サイドメニュー", "Món phụ"),
    items: [
      it(39000, null, T("꼬치 없는 떡꼬치", "Fried Rice Cake Skewer without Stick (Tteok-kkochi)", "无签炸年糕串", "串なしトッコチ(餅の串焼き)", "Bánh gạo chiên")),
      it(49000, null, T("꼬치 없는 소떡소떡", "Fried Sausage & Rice Cake without Stick (Sotteok-sotteok)", "无签香肠年糕串", "串なしソトクソトク(ソーセージ餅)", "Bánh gạo xúc xích chiên")),
    ],
  },
  {
    id: "drink",
    name: T("음료 · 주류", "Drinks & Alcohol", "饮料 · 酒类", "ドリンク · お酒", "Đồ uống"),
    items: [
      it(25000, null, T("펩시", "Pepsi", "百事可乐", "ペプシ", "Pepsi")),
      it(25000, null, T("오렌지 음료", "Orange Drink", "橙汁饮料", "オレンジドリンク", "Nước cam")),
      it(25000, null, T("사이다 (세븐업)", "Cider (7up)", "汽水(七喜)", "サイダー(セブンアップ)", "7up")),
      it(25000, null, T("콜라", "Coca-Cola", "可口可乐", "コカ・コーラ", "Coca")),
      it(39000, null, T("아침햇살 / 아침대추 / 아침마차", "Rice Drink (Achimhaetsal) / Jujube Drink / Matcha Drink", "大米饮料 / 红枣饮料 / 抹茶饮料", "米ドリンク(アチムヘッサル) / ナツメドリンク / 抹茶ドリンク", "Rice Drink / Jujube tea / Matcha drink")),
      it(119000, null, T("소주", "Soju", "烧酒", "焼酎(ソジュ)", "Soju")),
      it(45000, null, T("맥주", "Beer", "啤酒", "ビール", "Bia")),
      it(55000, null, T("생맥주 (350ml)", "Draft Beer (350ml)", "生啤酒(350毫升)", "生ビール(350ml)", "Bia tươi (350ml)")),
    ],
  },
];
