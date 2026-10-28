// 비원 BIWON (Cửa E, TTTM The Garden, The Manor, Từ Liêm, Hà Nội) 메뉴 데이터
// 출처: 구글 지도에 손님이 올린 메뉴판 사진(2026-10-28 수집, 올린 날짜 모름). 판이 두 가지:
//   새 판(검은 표지, 지도 '메뉴' 탭 menu_01~05·07) — 이것을 씀(가격이 더 높고 갈비살·꼬리곰탕 등 NEW 메뉴)
//   옛 판(금색 표지, menu_06·09·10) — 가격이 낮음. 옛 판에만 있는 갈비찜(4시간 전 예약)은 뺌 → docs/todo.md
//   menu_08(경남 랜드마크 타워 9층 점심특선)은 다른 지점 메뉴라 뺌
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만 — 정사각형이면 양옆 흰 여백)
// 메뉴판 사진끼리 가격이 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "비원", en: "BIWON" },
  phone: "024 6282 3300",
  address: "Cửa E, TTTM The Garden, The Manor, Từ Liêm, Hà Nội",
  wifi: null,
};

window.MENU = [
  {
    id: "grill",
    name: { ko: "비원특선 · 숯불구이", en: "BIWON Best Choice · Charcoal Grill", zh: "BIWON特选 · 炭火烤肉", ja: "BIWON特選 · 炭火焼き", vi: "Đặc biệt BIWON · Nướng than hoa" },
    note: { ko: "가격은 VAT 별도", en: "Prices exclude VAT", zh: "价格不含增值税", ja: "価格はVAT別", vi: "Giá chưa bao gồm thuế GTGT" },
    items: [
      { price: 650000, name: { ko: "꽃살", en: "Beef Chuck Flap (Kkotsal)", zh: "牛肩胛花肉 (Kkotsal)", ja: "牛フラップミート (コッサル)", vi: "Sườn bò rút xương" } },
      { price: 650000, name: { ko: "생갈비", en: "Beef Ribs, Unseasoned (Saeng Galbi)", zh: "生牛排骨 (Saeng Galbi)", ja: "牛カルビ・味付けなし (センカルビ)", vi: "Thịt sườn bò không tẩm gia vị" } },
      { price: 620000, name: { ko: "양념갈비", en: "Marinated Beef Ribs (Yangnyeom Galbi)", zh: "腌制牛排骨 (Yangnyeom Galbi)", ja: "味付け牛カルビ (ヤンニョムカルビ)", vi: "Sườn bò tẩm gia vị" } },
      { price: 360000, photo: "img/bulgogi.jpg", name: { ko: "불고기", en: "Bulgogi", zh: "烤牛肉 (Bulgogi)", ja: "プルコギ", vi: "Thịt bò sốt" },
        desc: { ko: "간장 양념에 재운 얇은 소고기", en: "Thin slices of beef marinated in soy sauce", zh: "用酱油调料腌制的薄牛肉片", ja: "醤油ダレに漬け込んだ薄切り牛肉", vi: "Thịt bò thái mỏng ướp sốt xì dầu" } },
      { price: 300000, name: { ko: "갈비살", en: "Boneless Beef Rib (Galbisal)", zh: "无骨牛排肉 (Galbisal)", ja: "牛カルビ肉 (カルビサル)", vi: "Thịt sườn bò" } },
      { price: 320000, name: { ko: "양념 갈비살", en: "Marinated Boneless Beef Rib", zh: "腌制无骨牛排肉", ja: "味付け牛カルビ肉", vi: "Thịt sườn bò tẩm gia vị" } },
      { price: 280000, photo: "img/dwaeji-galbi.jpg", name: { ko: "돼지갈비", en: "Marinated Pork Ribs (Dwaeji Galbi)", zh: "腌制猪排骨 (Dwaeji Galbi)", ja: "味付け豚カルビ (テジカルビ)", vi: "Sườn lợn tẩm gia vị" } },
      { price: 240000, photo: "img/samgyeopsal.jpg", name: { ko: "삼겹살", en: "Pork Belly (Samgyeopsal)", zh: "五花肉 (Samgyeopsal)", ja: "豚バラ肉 (サムギョプサル)", vi: "Thịt ba chỉ" } },
    ],
  },
  {
    id: "special",
    name: { ko: "비원스페셜 · 전골", en: "BIWON Special · Hot Pots", zh: "BIWON招牌 · 火锅", ja: "BIWONスペシャル · 鍋料理", vi: "Đặc biệt BIWON · Lẩu" },
    items: [
      { sizes: [["중", 680000], ["대", 880000]], name: { ko: "낙곱전골", en: "Octopus & Beef Intestine Hot Pot (Nakgop Jeongol)", zh: "章鱼牛肠火锅 (Nakgop Jeongol)", ja: "タコとホルモンの鍋 (ナッコプチョンゴル)", vi: "Lẩu bạch tuộc và lòng bò" } },
      { sizes: [["중", 680000], ["대", 880000]], name: { ko: "불낙전골", en: "Beef & Octopus Hot Pot (Bulnak Jeongol)", zh: "牛肉章鱼火锅 (Bulnak Jeongol)", ja: "牛肉とタコの鍋 (プルナクチョンゴル)", vi: "Lẩu bạch tuộc và thịt bò" } },
      { sizes: [["중", 680000], ["대", 880000]], name: { ko: "곱창전골", en: "Beef Intestine Hot Pot (Gopchang Jeongol)", zh: "牛肠火锅 (Gopchang Jeongol)", ja: "ホルモン鍋 (コプチャンチョンゴル)", vi: "Lẩu lòng bò" } },
      { price: 680000, name: { ko: "도가니수육", en: "Boiled Ox Knee (Dogani Suyuk)", zh: "水煮牛膝筋 (Dogani Suyuk)", ja: "牛すね軟骨の茹で肉 (トガニスユク)", vi: "Gân gối bò luộc" } },
      { price: 680000, spicy: true, name: { ko: "닭볶음탕", en: "Spicy Braised Chicken (Dakbokkeumtang)", zh: "辣炖鸡 (Dakbokkeumtang)", ja: "タッポックムタン (鶏肉の辛煮込み)", vi: "Lẩu gà hầm cay" } },
      { price: 680000, name: { ko: "감자탕", en: "Pork Back-bone Stew (Gamjatang)", zh: "土豆猪骨汤 (Gamjatang)", ja: "カムジャタン (豚骨とじゃがいもの鍋)", vi: "Canh xương lợn hầm khoai tây" } },
    ],
  },
  {
    id: "extra",
    name: { ko: "전골 추가", en: "Hot Pot Add-ons", zh: "火锅加料", ja: "鍋の追加", vi: "Gọi thêm cho lẩu" },
    items: [
      { price: 50000, name: { ko: "국수사리", en: "Extra Noodles", zh: "加面条", ja: "麺の追加", vi: "Mì thêm" } },
      { price: 50000, name: { ko: "라면사리", en: "Extra Ramen Noodles", zh: "加拉面", ja: "ラーメンの追加", vi: "Mì ramen thêm" } },
      { price: 300000, name: { ko: "도가니 추가", en: "Extra Ox Knee", zh: "加牛膝筋", ja: "牛すね軟骨の追加", vi: "Gân gối bò thêm" } },
      { price: 250000, name: { ko: "곱창 추가", en: "Extra Beef Intestines", zh: "加牛肠", ja: "ホルモンの追加", vi: "Lòng bò thêm" } },
      { price: 250000, name: { ko: "낙지 추가", en: "Extra Octopus", zh: "加章鱼", ja: "タコの追加", vi: "Bạch tuộc thêm" } },
      { price: 300000, name: { ko: "불고기 추가", en: "Extra Bulgogi Beef", zh: "加烤牛肉", ja: "プルコギの追加", vi: "Thịt bò thêm" } },
    ],
  },
  {
    id: "rice",
    name: { ko: "식사 · 밥", en: "Meals · Rice", zh: "主食 · 米饭", ja: "お食事 · ご飯", vi: "Cơm" },
    items: [
      { price: 220000, photo: "img/dolsot_bibimbap.jpg", name: { ko: "돌솥비빔밥", en: "Stone Pot Bibimbap", zh: "石锅拌饭", ja: "石焼ビビンバ", vi: "Cơm trộn niêu đá" } },
      { price: 200000, name: { ko: "비빔밥", en: "Bibimbap", zh: "拌饭", ja: "ビビンバ", vi: "Cơm trộn" } },
      { price: 250000, spicy: true, name: { ko: "낙지덮밥", en: "Spicy Octopus over Rice", zh: "辣章鱼盖饭", ja: "ナクチ丼 (辛いタコ炒めのせご飯)", vi: "Cơm bạch tuộc xào cay" } },
      { price: 250000, name: { ko: "알밥", en: "Fish Roe Rice (Albap)", zh: "鱼籽拌饭 (Albap)", ja: "アルパプ (魚卵ご飯)", vi: "Cơm trộn trứng cá" } },
      { price: 250000, name: { ko: "황태구이", en: "Grilled Seasoned Dried Pollack", zh: "烤明太鱼干", ja: "干しスケトウダラの焼き物 (ファンテグイ)", vi: "Cá minh thái khô nướng" } },
      { price: 250000, name: { ko: "뚝배기 불고기", en: "Bulgogi in Hot Pot (Ttukbaegi Bulgogi)", zh: "砂锅烤牛肉 (Ttukbaegi Bulgogi)", ja: "トゥッペギプルコギ (土鍋プルコギ)", vi: "Thịt bò sốt nồi đất" } },
    ],
  },
  {
    id: "soup",
    name: { ko: "식사 · 탕 · 국", en: "Meals · Soups", zh: "主食 · 汤", ja: "お食事 · スープ", vi: "Canh" },
    items: [
      { price: 250000, name: { ko: "꼬리곰탕", en: "Oxtail Soup (Kkori Gomtang)", zh: "牛尾汤 (Kkori Gomtang)", ja: "牛テールスープ (コリコムタン)", vi: "Canh xương đuôi bò" } },
      { price: 220000, name: { ko: "설렁탕", en: "Ox Bone Soup (Seolleongtang)", zh: "牛骨汤 (Seolleongtang)", ja: "ソルロンタン (牛骨スープ)", vi: "Canh thịt bò" } },
      { price: 240000, name: { ko: "갈비탕", en: "Beef Short Rib Soup (Galbitang)", zh: "牛排骨汤 (Galbitang)", ja: "カルビタン (牛カルビスープ)", vi: "Canh sườn bò" } },
      { price: 220000, spicy: true, name: { ko: "육개장", en: "Spicy Beef Soup (Yukgaejang)", zh: "辣牛肉汤 (Yukgaejang)", ja: "ユッケジャン (辛い牛肉スープ)", vi: "Canh thịt bò cay" } },
      { price: 240000, name: { ko: "삼계탕", en: "Ginseng Chicken Soup (Samgyetang)", zh: "参鸡汤 (Samgyetang)", ja: "サムゲタン (参鶏湯)", vi: "Gà tần sâm" } },
      { price: 180000, name: { ko: "뼈해장국", en: "Pork Bone Hangover Soup", zh: "猪骨醒酒汤", ja: "豚骨のヘジャンクク (酔い覚ましスープ)", vi: "Canh xương lợn hầm" } },
      { price: 240000, name: { ko: "도가니탕", en: "Ox Knee Soup (Doganitang)", zh: "牛膝筋汤 (Doganitang)", ja: "牛すね軟骨スープ (トガニタン)", vi: "Canh gân gối bò" } },
      { price: 160000, name: { ko: "미역국", en: "Seaweed Soup (Miyeokguk)", zh: "海带汤 (Miyeokguk)", ja: "わかめスープ (ミヨックク)", vi: "Canh rong biển" } },
      { price: 200000, name: { ko: "사골떡국", en: "Rice Cake Soup in Ox Bone Broth", zh: "牛骨年糕汤", ja: "牛骨スープのトックク (餅スープ)", vi: "Canh bánh gạo" } },
    ],
  },
  {
    id: "noodle",
    name: { ko: "식사 · 냉면 · 찌개", en: "Meals · Noodles & Stews", zh: "主食 · 冷面 · 炖汤", ja: "お食事 · 冷麺 · チゲ", vi: "Mì · Canh hầm" },
    items: [
      { price: 190000, photo: "img/naengmyeon.jpg", name: { ko: "물냉면", en: "Cold Buckwheat Noodles in Broth (Mul Naengmyeon)", zh: "汤冷面 (Mul Naengmyeon)", ja: "水冷麺 (ムルネンミョン)", vi: "Mì lạnh" } },
      { price: 200000, spicy: true, name: { ko: "비빔냉면", en: "Spicy Mixed Cold Noodles (Bibim Naengmyeon)", zh: "辣拌冷面 (Bibim Naengmyeon)", ja: "ビビン冷麺 (辛い和え冷麺)", vi: "Mì lạnh cay" } },
      { price: 160000, name: { ko: "된장찌개", en: "Soybean Paste Stew (Doenjang Jjigae)", zh: "大酱汤 (Doenjang Jjigae)", ja: "テンジャンチゲ (味噌チゲ)", vi: "Canh đậu tương" } },
      { price: 160000, spicy: true, name: { ko: "김치찌개", en: "Kimchi Stew (Kimchi Jjigae)", zh: "泡菜汤 (Kimchi Jjigae)", ja: "キムチチゲ", vi: "Canh kim chi" } },
      { price: 160000, name: { ko: "잔치국수", en: "Warm Wheat Noodle Soup (Janchi Guksu)", zh: "宴会汤面 (Janchi Guksu)", ja: "チャンチグクス (温かい素麺)", vi: "Mì nóng Hàn Quốc" } },
      { price: 150000, name: { ko: "누룽지", en: "Scorched Rice Porridge (Nurungji)", zh: "锅巴粥 (Nurungji)", ja: "おこげ粥 (ヌルンジ)", vi: "Cháo cơm cháy" } },
    ],
  },
  {
    id: "taste",
    name: { ko: "맛보기 메뉴", en: "Small Tasting Portions", zh: "小份尝鲜", ja: "ミニサイズメニュー", vi: "Phần nhỏ" },
    note: { ko: "비원특선(고기 구이)을 드시는 분만 주문할 수 있어요", en: "Only available with a BIWON Best Choice grilled beef or pork order", zh: "仅限点了BIWON特选烤肉的客人订购", ja: "BIWON特選(焼き肉)をご注文の方のみ注文できます", vi: "Chỉ áp dụng khi quý khách gọi thịt bò hoặc thịt lợn nướng" },
    items: [
      { price: 110000, name: { ko: "맛보기 물냉면", en: "Small Mul Naengmyeon", zh: "小份汤冷面", ja: "ミニ水冷麺", vi: "Mì lạnh (phần nhỏ)" } },
      { price: 120000, spicy: true, name: { ko: "맛보기 비빔냉면", en: "Small Bibim Naengmyeon", zh: "小份辣拌冷面", ja: "ミニビビン冷麺", vi: "Mì lạnh cay (phần nhỏ)" } },
      { price: 100000, name: { ko: "맛보기 잔치국수", en: "Small Janchi Guksu", zh: "小份宴会汤面", ja: "ミニチャンチグクス", vi: "Mì nóng Hàn Quốc (phần nhỏ)" } },
      { price: 80000, name: { ko: "맛보기 누룽지", en: "Small Nurungji", zh: "小份锅巴粥", ja: "ミニおこげ粥", vi: "Cháo cơm cháy (phần nhỏ)" } },
      { price: 60000, name: { ko: "맛보기 된장찌개", en: "Small Doenjang Jjigae", zh: "小份大酱汤", ja: "ミニテンジャンチゲ", vi: "Canh đậu tương (phần nhỏ)" } },
      { price: 20000, name: { ko: "공기밥", en: "Steamed Rice", zh: "米饭", ja: "白ご飯", vi: "Cơm trắng" } },
    ],
  },
];
