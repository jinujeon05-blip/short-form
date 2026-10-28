// 최고집 CHOE GO JIP (SH-14, Tòa E3, CT8 Emerald, Từ Liêm, Hà Nội) 메뉴 데이터
// 출처: 구글 지도에 손님이 올린 메뉴판 사진(2026-10-28 수집, 올린 날짜 모름). 판이 두 가지:
//   새 판(지도 '메뉴' 탭 menu_01~04, 번호 21~68 + 점심특선 A~F) — 21번부터는 이것을 씀(가격이 더 높음)
//   옛 판(menu_09·11·12·13) — 새 판 사진이 없는 1~20번(소고기·소곱창·돼지고기·특선)만 여기서 씀. 주류는 menu_16
//   옛 판에만 있던 소고기무국·옛 전골&조림(21~25)은 새 판에서 빠져 넣지 않음
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게)
// 메뉴판 사진끼리 가격이 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "최고집", en: "CHOE GO JIP" },
  phone: "076 920 7949",
  address: "SH-14, Tòa E3, CT8 Emerald, Từ Liêm, Hà Nội",
  wifi: null,
};

window.MENU = [
  {
    id: "lunch",
    name: { ko: "점심 특선", en: "Lunch Specials", zh: "午餐特选", ja: "ランチ特選", vi: "Bữa trưa" },
    items: [
      { price: 300000,
        name: { ko: "전복 버섯 영양솥밥", en: "Abalone & Mushroom Pot Rice", zh: "鲍鱼蘑菇营养锅饭", ja: "アワビときのこの栄養釜飯", vi: "Cơm nồi nấm bào ngư" },
        desc: { ko: "1인 · 청국장 또는 된장찌개 선택", en: "1 person · choice of cheonggukjang or doenjang stew", zh: "1人份 · 可选清麴酱汤或大酱汤", ja: "1人前 · チョングクチャンまたはテンジャンチゲから選択", vi: "1 người · Lựa chọn canh đậu tương lên men hoặc canh đậu tương" } },
      { price: 250000,
        name: { ko: "곤드레 영양솥밥", en: "Gondre (Thistle Greens) Pot Rice", zh: "高丽蓟菜营养锅饭", ja: "コンドゥレ栄養釜飯", vi: "Cơm nồi dinh dưỡng gondre" },
        desc: { ko: "1인 · 청국장 또는 된장찌개 선택", en: "1 person · choice of cheonggukjang or doenjang stew", zh: "1人份 · 可选清麴酱汤或大酱汤", ja: "1人前 · チョングクチャンまたはテンジャンチゲから選択", vi: "1 người · Lựa chọn canh đậu tương lên men hoặc canh đậu tương" } },
      { price: 250000,
        name: { ko: "톳 영양솥밥", en: "Hijiki Seaweed Pot Rice", zh: "羊栖菜营养锅饭", ja: "ひじきの栄養釜飯", vi: "Cơm nồi rong biển Hijiki" },
        desc: { ko: "1인 · 청국장 또는 된장찌개 선택", en: "1 person · choice of cheonggukjang or doenjang stew", zh: "1人份 · 可选清麴酱汤或大酱汤", ja: "1人前 · チョングクチャンまたはテンジャンチゲから選択", vi: "1 người · Lựa chọn canh đậu tương lên men hoặc canh đậu tương" } },
      { price: 250000,
        name: { ko: "강황쌀 보리밥 정식", en: "Turmeric Rice & Barley Set", zh: "姜黄米大麦饭套餐", ja: "ウコン米の麦ご飯定食", vi: "Gạo lúa mạch curcuma" },
        desc: { ko: "1인 · 제육볶음 또는 주꾸미볶음 선택", en: "1 person · choice of spicy stir-fried pork or spicy stir-fried octopus", zh: "1人份 · 可选辣炒猪肉或辣炒小章鱼", ja: "1人前 · 豚肉の辛味炒めまたはイイダコ炒めから選択", vi: "1 người · Lựa chọn thịt lợn xào hoặc bạch tuộc nhỏ xào" } },
      { price: 250000,
        name: { ko: "소고기 샤브샤브", en: "Beef Shabu-shabu", zh: "牛肉涮锅", ja: "牛肉しゃぶしゃぶ", vi: "Lẩu bò đặc biệt" },
        desc: { ko: "1인 · 2인 이상 주문", en: "Per person · order for 2 or more", zh: "1人份 · 2人起点", ja: "1人前 · 2人前から注文", vi: "1 người · 2 người trở lên" } },
      { price: 250000,
        name: { ko: "해산물 샤브샤브", en: "Seafood Shabu-shabu", zh: "海鲜涮锅", ja: "海鮮しゃぶしゃぶ", vi: "Lẩu hải sản đặc biệt" },
        desc: { ko: "1인 · 2인 이상 주문", en: "Per person · order for 2 or more", zh: "1人份 · 2人起点", ja: "1人前 · 2人前から注文", vi: "1 người · 2 người trở lên" } },
    ],
  },
  {
    id: "beef",
    name: { ko: "소고기", en: "Beef", zh: "牛肉", ja: "牛肉", vi: "Thịt bò" },
    items: [
      { price: 1500000, name: { ko: "소고기 모듬", en: "Beef Platter", zh: "牛肉拼盘", ja: "牛肉盛り合わせ", vi: "Thịt bò thập cẩm" },
        desc: { ko: "꽃살 · 차돌 · 안창살 · 갈비살", en: "Bottom sirloin triangle · brisket · thin skirt · rib finger", zh: "花肉 · 牛胸腹肉 · 牛横膈膜 · 牛肋条肉", ja: "ハナサル · チャドル · ハラミ · 骨なしカルビ", vi: "Bít tết · Thịt ức bò · Thăn bò nướng · Thịt sườn bò" } },
      { price: 550000, name: { ko: "꽃살", en: "Bottom Sirloin Triangle (Kkotsal)", zh: "花肉", ja: "ハナサル", vi: "Bít tết" } },
      { price: 550000, photo: "img/la-galbi.jpg", name: { ko: "LA갈비", en: "LA-style Beef Ribs (LA Galbi)", zh: "LA牛小排", ja: "LAカルビ", vi: "Sườn bò Mỹ" } },
      { price: 550000, name: { ko: "LA갈비 (양념)", en: "LA-style Beef Ribs, Soy-marinated", zh: "LA牛小排(腌制)", ja: "LAカルビ(味付け)", vi: "Sườn bò Mỹ ướp gia vị nướng" } },
      { price: 480000, name: { ko: "안창살", en: "Beef Thin Skirt (Anchangsal)", zh: "牛横膈膜", ja: "ハラミ(アンチャンサル)", vi: "Thăn bò nướng" } },
      { price: 480000, name: { ko: "갈비살", en: "Beef Rib Finger (Galbisal)", zh: "牛肋条肉", ja: "骨なしカルビ(カルビサル)", vi: "Thịt sườn bò" } },
      { price: 480000, name: { ko: "갈비살 (양념)", en: "Seasoned Beef Rib Finger", zh: "牛肋条肉(腌制)", ja: "骨なしカルビ(味付け)", vi: "Thịt sườn bò ướp gia vị" } },
      { price: 300000, name: { ko: "차돌박이", en: "Beef Brisket (Chadolbaegi)", zh: "牛胸腹肉(薄片)", ja: "チャドルバギ(牛バラ薄切り)", vi: "Thịt ức bò" } },
      { price: 300000, name: { ko: "육회", en: "Beef Tartare (Yukhoe)", zh: "韩式生拌牛肉", ja: "ユッケ", vi: "Gỏi ức bò" } },
    ],
  },
  {
    id: "gopchang",
    name: { ko: "소곱창", en: "Beef Intestines", zh: "牛小肠", ja: "牛コプチャン", vi: "Lòng bò" },
    items: [
      { price: 600000, name: { ko: "소곱창 모듬", en: "Beef Intestines Platter", zh: "牛肠拼盘", ja: "牛ホルモン盛り合わせ", vi: "Lòng bò thập cẩm" },
        desc: { ko: "1인분 · 곱창 · 막창 · 2인 이상 주문", en: "Per person · small intestines & abomasum · order for 2 or more", zh: "1人份 · 小肠 · 皱胃 · 2人起点", ja: "1人前 · コプチャン · マクチャン · 2人前から注文", vi: "1 phần · Lòng bò · Dạ dày bò · Từ 2 người trở lên" } },
      { price: 450000, desc: { ko: "1인분", en: "Per person", zh: "1人份", ja: "1人前", vi: "1 phần" }, name: { ko: "소곱창", en: "Beef Small Intestines (Gopchang)", zh: "牛小肠", ja: "牛コプチャン(小腸)", vi: "Lòng bò" } },
      { price: 450000, desc: { ko: "1인분", en: "Per person", zh: "1人份", ja: "1人前", vi: "1 phần" }, name: { ko: "소막창", en: "Beef Abomasum (Makchang)", zh: "牛皱胃", ja: "牛マクチャン(第四胃)", vi: "Dạ dày bò" } },
    ],
  },
  {
    id: "pork",
    name: { ko: "돼지고기", en: "Pork", zh: "猪肉", ja: "豚肉", vi: "Thịt lợn" },
    items: [
      { price: 300000, name: { ko: "돼지 양념갈비", en: "Marinated Pork Ribs", zh: "腌制猪排骨", ja: "豚の味付けカルビ", vi: "Sườn lợn ướp gia vị" } },
      { price: 250000, name: { ko: "항정살", en: "Pork Jowl (Hangjeongsal)", zh: "猪颈肉", ja: "豚トロ(ハンジョンサル)", vi: "Má lợn" } },
      { price: 250000, photo: "img/samgyeopsal.jpg", name: { ko: "삼겹살", en: "Pork Belly (Samgyeopsal)", zh: "五花肉", ja: "サムギョプサル(豚バラ)", vi: "Thịt ba chỉ" } },
      { price: 220000, name: { ko: "대패삼겹살", en: "Thin-sliced Pork Belly (Daepae Samgyeopsal)", zh: "薄片五花肉", ja: "薄切り豚バラ(テペサムギョプサル)", vi: "Thịt ba chỉ lát mỏng" } },
      { price: 180000, name: { ko: "벌집 돼지껍데기", en: "Grilled Pork Skin, Honeycomb Cut", zh: "蜂窝烤猪皮", ja: "蜂の巣豚皮焼き", vi: "Bì lợn" } },
    ],
  },
  {
    id: "special",
    name: { ko: "특선 메뉴", en: "Specials", zh: "特选菜", ja: "特選メニュー", vi: "Đặc biệt" },
    items: [
      { sizes: [["500g", 750000], ["1kg", 1500000]], name: { ko: "장어구이 (소금 · 양념)", en: "Grilled Eel (Salt or Sauce)", zh: "烤鳗鱼(盐烤 · 酱烤)", ja: "ウナギの焼き物(塩・タレ)", vi: "Cá chình nướng than hoa (muối / gia vị)" } },
      { price: 1200000, desc: { ko: "1마리", en: "Whole duck", zh: "整只", ja: "1羽", vi: "1 con" }, name: { ko: "생오리구이", en: "Grilled Fresh Duck", zh: "烤鲜鸭", ja: "生鴨の焼き物", vi: "Vịt nướng" } },
      { price: 1200000, name: { ko: "생오리백숙", en: "Duck Stew (Baeksuk)", zh: "鲜鸭炖汤", ja: "鴨のペクスク(水炊き)", vi: "Vịt hầm" } },
      { price: 1200000, name: { ko: "생닭백숙", en: "Chicken Stew (Baeksuk)", zh: "鲜鸡炖汤", ja: "鶏のペクスク(水炊き)", vi: "Gà hầm" } },
      { price: 1000000, spicy: true, name: { ko: "닭볶음탕", en: "Spicy Braised Chicken (Dakbokkeumtang)", zh: "辣炖鸡块", ja: "タッポックムタン(辛い鶏の煮込み)", vi: "Thịt gà hầm khoai tây" } },
    ],
    tip: { ko: "생오리구이·생오리백숙·생닭백숙·닭볶음탕은 2시간 전에 예약해 주세요.", en: "Please reserve 2 hours ahead for the grilled duck, duck stew, chicken stew, and spicy braised chicken.", zh: "烤鲜鸭、鲜鸭炖汤、鲜鸡炖汤、辣炖鸡块请提前2小时预约。", ja: "生鴨の焼き物・鴨のペクスク・鶏のペクスク・タッポックムタンは、2時間前までにご予約ください。", vi: "Vịt nướng, vịt hầm, gà hầm và gà hầm khoai tây vui lòng đặt trước 2 tiếng." },
  },
  {
    id: "braise",
    name: { ko: "찜 · 조림", en: "Braised Dishes", zh: "蒸菜 · 炖菜", ja: "蒸し物・煮付け", vi: "Hấp & Kho" },
    items: [
      { price: 1000000, spicy: true, name: { ko: "동태찜", en: "Braised Spicy Pollack (Dongtaejjim)", zh: "辣蒸明太鱼", ja: "スケトウダラの辛い蒸し煮(トンテチム)", vi: "Cá pollack hấp cay" } },
      { price: 600000, name: { ko: "갈치조림", en: "Braised Cutlassfish (Galchi Jorim)", zh: "酱炖带鱼", ja: "タチウオの煮付け", vi: "Cá kiếm kho" } },
      { price: 500000, name: { ko: "김치 고등어조림", en: "Braised Mackerel with Kimchi", zh: "泡菜炖青花鱼", ja: "キムチとサバの煮付け", vi: "Cá thu & kimchi kho" } },
      { price: 400000, name: { ko: "두부조림", en: "Braised Tofu (Dubu Jorim)", zh: "酱炖豆腐", ja: "豆腐の煮付け", vi: "Đậu phụ kho" } },
    ],
  },
  {
    id: "jeongol",
    name: { ko: "전골", en: "Hot Pots", zh: "火锅", ja: "チョンゴル(鍋)", vi: "Lẩu" },
    items: [
      { sizes: [["M", 650000], ["L", 750000]], name: { ko: "곱창전골", en: "Beef Intestine Hot Pot (Gopchang Jeongol)", zh: "牛肠火锅", ja: "コプチャン鍋", vi: "Lẩu lòng bò" } },
      { sizes: [["M", 600000], ["L", 700000]], spicy: true, name: { ko: "동태전골", en: "Spicy Pollack Hot Pot (Dongtae Jeongol)", zh: "辣明太鱼火锅", ja: "スケトウダラの辛い鍋", vi: "Lẩu cá pollack cay" } },
      { sizes: [["M", 600000], ["L", 700000]], name: { ko: "소고기 버섯전골", en: "Beef & Mushroom Hot Pot", zh: "牛肉蘑菇火锅", ja: "牛肉ときのこの鍋", vi: "Lẩu nấm và thịt bò" } },
      { sizes: [["M", 600000], ["L", 700000]], name: { ko: "김치전골", en: "Kimchi Hot Pot (Kimchi Jeongol)", zh: "泡菜火锅", ja: "キムチ鍋", vi: "Lẩu kimchi" } },
    ],
  },
  {
    id: "grill",
    name: { ko: "구이", en: "Grilled Fish & More", zh: "烤鱼等烧烤", ja: "焼き物(魚ほか)", vi: "Nướng" },
    items: [
      { price: 550000, name: { ko: "보리굴비", en: "Dried Yellow Croaker (Bori Gulbi)", zh: "大麦干黄花鱼", ja: "干しイシモチ(ボリクルビ)", vi: "Cá vàng nướng" } },
      { price: 400000, name: { ko: "참가자미구이", en: "Grilled Flounder", zh: "烤鲽鱼", ja: "カレイの焼き物", vi: "Cá bơn nướng" },
        desc: { ko: "한국산", en: "Product of Korea", zh: "韩国产", ja: "韓国産", vi: "Hàng Hàn Quốc" } },
      { price: 400000, name: { ko: "옥돔구이", en: "Grilled Red Tilefish (Okdom)", zh: "烤方头鱼", ja: "アマダイの焼き物", vi: "Cá hồng nướng" } },
      { price: 250000, name: { ko: "고등어구이", en: "Grilled Mackerel", zh: "烤青花鱼", ja: "サバの塩焼き", vi: "Cá thu nướng" } },
      { price: 500000, name: { ko: "생더덕구이", en: "Grilled Deodeok Root", zh: "烤生羊乳(더덕)", ja: "生トドクの焼き物", vi: "Deodeok nướng" } },
    ],
  },
  {
    id: "jeon",
    name: { ko: "전", en: "Korean Pancakes", zh: "韩式煎饼", ja: "チヂミ(ジョン)", vi: "Bánh" },
    items: [
      { price: 250000, photo: "img/haemul-pajeon.jpg", name: { ko: "해물파전", en: "Seafood & Scallion Pancake (Haemul Pajeon)", zh: "海鲜葱饼", ja: "海鮮ねぎチヂミ", vi: "Bánh hải sản hành" } },
      { price: 200000, name: { ko: "오징어부추전", en: "Squid & Chive Pancake", zh: "鱿鱼韭菜煎饼", ja: "イカとニラのチヂミ", vi: "Bánh mực và hẹ" } },
      { price: 200000, name: { ko: "김치전", en: "Kimchi Pancake (Kimchijeon)", zh: "泡菜煎饼", ja: "キムチチヂミ", vi: "Bánh kim chi" } },
      { price: 300000, name: { ko: "육전", en: "Pan-fried Beef Slices (Yukjeon)", zh: "煎牛肉片", ja: "ユクジョン(牛肉の衣焼き)", vi: "Bánh thịt bò" } },
    ],
  },
  {
    id: "meal",
    name: { ko: "식사", en: "Soups & Meals", zh: "汤饭 · 餐食", ja: "お食事", vi: "Bữa ăn" },
    items: [
      { price: 400000, name: { ko: "능이갈비탕", en: "Beef Short Rib Soup with Neungi Mushroom (Neungi Galbitang)", zh: "能耳菇牛排骨汤", ja: "ヌンイ茸入りカルビタン", vi: "Canh sườn bò nấm" } },
      { price: 250000, name: { ko: "갈비탕", en: "Beef Short Rib Soup (Galbitang)", zh: "牛排骨汤", ja: "カルビタン", vi: "Canh sườn bò" } },
      { price: 230000, name: { ko: "나주곰탕", en: "Naju-style Beef Bone Soup (Naju Gomtang)", zh: "罗州牛骨汤", ja: "ナジュコムタン(牛骨スープ)", vi: "Súp xương ống bò Naju" } },
      { price: 230000, spicy: true, name: { ko: "육개장", en: "Spicy Beef Soup (Yukgaejang)", zh: "辣牛肉汤", ja: "ユッケジャン", vi: "Canh bò cay" } },
      { price: 230000, name: { ko: "추어탕", en: "Loach Soup (Chueotang)", zh: "泥鳅汤", ja: "チュオタン(ドジョウ汁)", vi: "Súp cá chạch" } },
      { price: 230000, name: { ko: "황태해장국", en: "Dried Pollack Soup (Hwangtae Haejangguk)", zh: "干明太鱼醒酒汤", ja: "ファンテヘジャンクク(干しスケトウダラのスープ)", vi: "Súp cá pollack" } },
      { price: 250000, spicy: true, name: { ko: "동태탕", en: "Spicy Pollack Soup (Dongtaetang)", zh: "辣明太鱼汤", ja: "トンテタン(スケトウダラの辛いスープ)", vi: "Canh cá pollack cay" } },
      { price: 230000, name: { ko: "해물순두부", en: "Seafood Soft Tofu Stew (Haemul Sundubu)", zh: "海鲜嫩豆腐汤", ja: "海鮮スンドゥブ", vi: "Canh đậu phụ hải sản" } },
      { price: 200000, name: { ko: "미역국", en: "Seaweed Soup (Miyeokguk)", zh: "海带汤", ja: "わかめスープ(ミヨックク)", vi: "Canh rong biển" } },
      { price: 200000, name: { ko: "김치찌개", en: "Kimchi Stew (Kimchi Jjigae)", zh: "泡菜汤", ja: "キムチチゲ", vi: "Súp kim chi" } },
      { price: 200000, name: { ko: "된장찌개", en: "Soybean Paste Stew (Doenjang Jjigae)", zh: "大酱汤", ja: "テンジャンチゲ", vi: "Súp đậu tương" } },
      { price: 200000, name: { ko: "청국장", en: "Rich Fermented Soybean Stew (Cheonggukjang)", zh: "清麴酱", ja: "チョングクチャン", vi: "Canh đậu tương lên men" } },
      { price: 250000, name: { ko: "육회비빔밥", en: "Bibimbap with Beef Tartare (Yukhoe Bibimbap)", zh: "生拌牛肉拌饭", ja: "ユッケビビンバ", vi: "Cơm trộn gỏi ức bò" } },
      { price: 250000, spicy: true, photo: "img/jjukkumi.jpg", name: { ko: "주꾸미볶음", en: "Spicy Stir-fried Webfoot Octopus (Jjukkumi Bokkeum)", zh: "辣炒小章鱼", ja: "イイダコ炒め(ジュクミポックム)", vi: "Bạch tuộc nhỏ xào cay" } },
      { price: 250000, spicy: true, name: { ko: "제육볶음", en: "Spicy Stir-fried Pork (Jeyuk Bokkeum)", zh: "辣炒猪肉", ja: "豚肉の辛味炒め(ジェユクポックム)", vi: "Thịt lợn xào cay" } },
      { price: 250000, name: { ko: "떡만둣국", en: "Rice Cake & Dumpling Soup (Tteok Mandu Guk)", zh: "年糕饺子汤", ja: "トックマンドゥクク(餅と餃子のスープ)", vi: "Canh bánh bao và tteok" } },
      { price: 200000, name: { ko: "떡국", en: "Rice Cake Soup (Tteokguk)", zh: "年糕汤", ja: "トックク(餅スープ)", vi: "Canh bánh tteok" } },
    ],
  },
  {
    id: "noodle",
    name: { ko: "면", en: "Noodles", zh: "面食", ja: "麺類", vi: "Mì" },
    items: [
      { price: 200000, photo: "img/kongguksu.jpg", name: { ko: "콩국수", en: "Cold Soybean Noodles (Kongguksu)", zh: "冷豆浆面", ja: "コングクス(冷たい豆乳麺)", vi: "Mỳ lạnh đậu tương" } },
      { price: 200000, name: { ko: "물냉면", en: "Cold Noodles in Broth (Mul Naengmyeon)", zh: "水冷面", ja: "水冷麺(ムルネンミョン)", vi: "Mỳ lạnh nước" } },
      { price: 200000, spicy: true, name: { ko: "비빔냉면", en: "Spicy Mixed Cold Noodles (Bibim Naengmyeon)", zh: "辣拌冷面", ja: "ビビン冷麺", vi: "Mỳ lạnh miến trộn" } },
      { price: 200000, name: { ko: "잔치국수", en: "Warm Noodle Soup (Janchi Guksu)", zh: "热汤面(宴会面)", ja: "チャンチククス(温かい素麺)", vi: "Mỳ Hàn Quốc" } },
      { price: 200000, name: { ko: "김치말이국수", en: "Cold Kimchi Noodles (Kimchi Mari Guksu)", zh: "泡菜冷汤面", ja: "キムチマリククス(冷たいキムチ麺)", vi: "Mỳ kim chi Hàn Quốc" } },
      { price: 120000, name: { ko: "후식 물냉면", en: "Small Cold Noodles in Broth", zh: "小份水冷面", ja: "ミニ水冷麺", vi: "Mỳ lạnh nước (nhỏ)" } },
      { price: 120000, spicy: true, name: { ko: "후식 비빔냉면", en: "Small Spicy Mixed Cold Noodles", zh: "小份辣拌冷面", ja: "ミニビビン冷麺", vi: "Mỳ lạnh miến trộn (nhỏ)" } },
    ],
  },
  {
    id: "side",
    name: { ko: "사이드", en: "Sides", zh: "小吃 · 加点", ja: "サイドメニュー", vi: "Thêm" },
    items: [
      { price: 200000, name: { ko: "잡채", en: "Stir-fried Glass Noodles (Japchae)", zh: "杂菜炒粉丝", ja: "チャプチェ", vi: "Miến xào" } },
      { price: 100000, unit: "×6", name: { ko: "튀김만두", en: "Fried Dumplings (Mandu)", zh: "炸饺子", ja: "揚げ餃子", vi: "Bánh bao chiên" } },
      { price: 100000, name: { ko: "김밥", en: "Gimbap", zh: "紫菜包饭", ja: "キンパ(のり巻き)", vi: "Cơm cuộn" } },
      { price: 100000, name: { ko: "라면", en: "Ramyeon", zh: "拉面", ja: "ラーメン(ラミョン)", vi: "Mỳ ramen" } },
      { price: 60000, name: { ko: "볶음밥", en: "Fried Rice (Bokkeumbap)", zh: "炒饭", ja: "チャーハン", vi: "Cơm chiên" } },
      { price: 40000, name: { ko: "우동사리", en: "Extra Udon Noodles", zh: "加乌冬面", ja: "うどん追加", vi: "Thêm mì udon" } },
      { price: 40000, name: { ko: "라면사리", en: "Extra Ramyeon Noodles", zh: "加拉面", ja: "ラーメン追加", vi: "Thêm ramen" } },
    ],
  },
  {
    id: "drink",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水 · 饮料", ja: "お酒・ドリンク", vi: "Đồ uống" },
    items: [
      { price: 150000, name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "ソジュ(焼酎)", vi: "Soju" } },
      { price: 60000, name: { ko: "맥주", en: "Beer", zh: "啤酒", ja: "ビール", vi: "Bia" } },
      { price: 170000, name: { ko: "막걸리", en: "Makgeolli (Rice Wine)", zh: "马格利酒(米酒)", ja: "マッコリ", vi: "Rượu gạo" } },
      { price: 140000, name: { ko: "보드카", en: "Vodka", zh: "伏特加", ja: "ウォッカ", vi: "Vodka" } },
      { price: 320000, name: { ko: "복분자", en: "Bokbunja (Black Raspberry Wine)", zh: "覆盆子酒", ja: "覆盆子酒(ポクブンジャ)", vi: "Rượu dâu" } },
      { price: 300000, name: { ko: "백세주", en: "Baekseju (Herbal Rice Wine)", zh: "百岁酒", ja: "ペクセジュ(百歳酒)", vi: "Rượu sâm" } },
      { price: 250000, name: { ko: "홍초", en: "Hongcho (Red Vinegar Drink)", zh: "红醋饮", ja: "ホンチョ(紅酢ドリンク)", vi: "Hong cho" } },
      { price: 20000, name: { ko: "음료", en: "Soft Drinks", zh: "饮料", ja: "ソフトドリンク", vi: "Nước ngọt" },
        desc: { ko: "콜라 · 환타 · 세븐업", en: "Coca-Cola · Fanta · 7Up", zh: "可乐 · 芬达 · 七喜", ja: "コーラ · ファンタ · セブンアップ", vi: "Coca cola · Fanta · 7Up" } },
    ],
  },
];
