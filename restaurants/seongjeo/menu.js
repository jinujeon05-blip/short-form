// 성저최고돼지국밥 Seongjeo Choego Dwaeji Gukbap(한국식 돼지국밥집, 박닌시 Võ Cường) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음). 출처: 구글 지도 메뉴판 사진 10장(menu_01~09·etc_02, 2026-11-11 수집). 가격 단위: VND. 같은 메뉴가 사진마다 다르면 높은 쪽 가격(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "성저최고돼지국밥", en: "Seongjeo Choego Dwaeji Gukbap" },
  phone: "0398 223 776",
  address: "05A-N6 Nguyễn Cao, Phường Võ Cường, Bắc Ninh",
  wifi: null,
  hours: "09:30 – 22:00",
};

window.MENU = [
  {
    id: "gukbap",
    name: { ko: "순대국밥", en: "Sundae Gukbap", zh: "血肠汤饭", ja: "スンデクッパ", vi: "Cơm canh lòng" },
    items: [
      { name: { ko: "고기순대국밥", en: "Pork & Korean Blood Sausage (Sundae) Soup with Rice", zh: "猪肉血肠汤饭(Sundae Gukbap)", ja: "肉入りスンデクッパ(豚肉とスンデ)", vi: "Canh thịt + lòng" }, price: 190000 },
      { name: { ko: "순대만국밥", en: "Korean Blood Sausage (Sundae) Soup with Rice", zh: "纯血肠汤饭(Sundae Gukbap)", ja: "スンデのみクッパ", vi: "Canh lòng" }, price: 190000 },
      { name: { ko: "고기+김치순대국밥", en: "Pork & Kimchi Sundae Soup with Rice", zh: "猪肉泡菜血肠汤饭", ja: "肉入りキムチスンデクッパ", vi: "Canh thịt + lòng kimchi" }, price: 190000 },
      { name: { ko: "김치순대만국밥", en: "Kimchi Sundae Soup with Rice", zh: "泡菜血肠汤饭", ja: "キムチスンデのみクッパ", vi: "Canh lòng kim chi" }, price: 190000 },
    ],
  },
  {
    id: "sundae",
    name: { ko: "순대", en: "Korean Blood Sausage (Sundae)", zh: "血肠(Sundae)", ja: "スンデ(韓国風腸詰め)", vi: "Lòng" },
    note: { ko: "대 = L · 중 = M · 소 = S (접시 크기)", en: "L = Large · M = Medium · S = Small (plate size)", zh: "大 = L · 中 = M · 小 = S（盘子大小）", ja: "大 = L · 中 = M · 小 = S(皿の大きさ)", vi: "L = Lớn · M = Vừa · S = Nhỏ (cỡ đĩa)" },
    items: [
      { name: { ko: "순대(고기순대)", en: "Pork Sundae", zh: "猪肉血肠(Sundae)", ja: "肉スンデ(スンデ)", vi: "Thịt nhồi lòng đĩa" }, sizes: [["L", 380000], ["M", 320000], ["S", 160000]] },
      { name: { ko: "김치순대", en: "Kimchi Sundae", zh: "泡菜血肠(Kimchi Sundae)", ja: "キムチスンデ", vi: "Lòng nhồi thịt kimchi đĩa" }, sizes: [["L", 380000], ["M", 320000], ["S", 160000]] },
      { name: { ko: "순대반반(고기순대+김치순대)", en: "Half & Half Sundae (Pork + Kimchi)", zh: "双拼血肠(猪肉+泡菜)", ja: "スンデ半々(肉スンデ+キムチスンデ)", vi: "Lòng 2 màu" }, sizes: [["L", 380000], ["M", 320000]] },
      { name: { ko: "찹쌀순대", en: "Glutinous Rice Sundae", zh: "糯米血肠(Chapssal Sundae)", ja: "もち米スンデ(チャプサルスンデ)", vi: "Lòng miến đĩa" }, sizes: [["M", 280000], ["S", 140000]] },
      { name: { ko: "모듬순대", en: "Assorted Sundae", zh: "什锦血肠(Modeum Sundae)", ja: "盛り合わせスンデ(モドゥムスンデ)", vi: "Lòng thập cẩm" }, price: 380000 },
      { name: { ko: "삼색순대", en: "Three-Color Sundae", zh: "三色血肠(Samsaek Sundae)", ja: "三色スンデ(サムセクスンデ)", vi: "Lòng 3 màu" }, price: 320000 },
    ],
  },
  {
    id: "suyuk",
    name: { ko: "수육", en: "Boiled Pork (Suyuk)", zh: "白切肉(Suyuk)", ja: "スユク(茹で豚)", vi: "Thịt luộc" },
    items: [
      { name: { ko: "모듬수육", en: "Assorted Boiled Pork & Offal (Suyuk)", zh: "什锦白切肉(Modeum Suyuk)", ja: "盛り合わせスユク(モドゥムスユク)", vi: "Thịt lòng thập cẩm" }, sizes: [["L", 750000], ["M", 650000]] },
      { name: { ko: "수육", en: "Boiled Pork (Suyuk)", zh: "白切肉(Suyuk)", ja: "スユク(茹で豚)", vi: "Thịt lòng đĩa" }, sizes: [["L", 750000], ["M", 650000]] },
      { name: { ko: "내장수육", en: "Boiled Pork Offal (Naejang Suyuk)", zh: "白切内脏(Naejang Suyuk)", ja: "内臓スユク(ネジャンスユク)", vi: "Dạ dày luộc" }, sizes: [["L", 750000], ["M", 650000]] },
    ],
  },
  {
    id: "dakgalbi",
    name: { ko: "닭갈비", en: "Dakgalbi (Spicy Stir-Fried Chicken)", zh: "辣炒鸡排(Dakgalbi)", ja: "タッカルビ", vi: "Gà xào" },
    note: { ko: "750g = 3인분 · 500g = 2인분", en: "750g = 3 servings · 500g = 2 servings", zh: "750g = 3人份 · 500g = 2人份", ja: "750g = 3人前 · 500g = 2人前", vi: "750g = 3 người · 500g = 2 người" },
    items: [
      { name: { ko: "닭갈비", en: "Dakgalbi (Stir-Fried Chicken)", zh: "辣炒鸡排(Dakgalbi)", ja: "タッカルビ", vi: "Thịt gà xào" }, sizes: [["750g", 620000], ["500g", 420000]] },
      { name: { ko: "치즈닭갈비", en: "Cheese Dakgalbi", zh: "芝士辣炒鸡排(Cheese Dakgalbi)", ja: "チーズタッカルビ", vi: "Gà xào phô mai" }, sizes: [["750g", 680000], ["500g", 450000]] },
    ],
  },
  {
    id: "snack",
    name: { ko: "분식·안주", en: "Snacks & Side Dishes", zh: "小吃·下酒菜", ja: "軽食・おつまみ", vi: "Món ăn vặt & đồ nhậu" },
    items: [
      { name: { ko: "치즈돈까스(안주용)", en: "Cheese Pork Cutlet (Donkatsu, for sharing)", zh: "芝士猪排(Donkatsu，下酒份)", ja: "チーズとんかつ(トンカツ・おつまみ用)", vi: "Thịt chiên phô mai, đồ nhậu" }, price: 300000 },
      { name: { ko: "치즈돈까스", en: "Cheese Pork Cutlet (Donkatsu)", zh: "芝士猪排(Donkatsu)", ja: "チーズとんかつ(トンカツ)", vi: "Thịt chiên phô mai" }, price: 190000 },
      { name: { ko: "계란말이", en: "Rolled Omelette (Gyeranmari)", zh: "鸡蛋卷(Gyeranmari)", ja: "卵焼き(ケランマリ)", vi: "Trứng cuộn" }, price: 100000 },
      { name: { ko: "김치전", en: "Kimchi Pancake (Kimchijeon)", zh: "泡菜煎饼(Kimchijeon)", ja: "キムチチヂミ(キムチジョン)", vi: "Bột kimchi rán" }, price: 120000 },
      { name: { ko: "부추전", en: "Chive Pancake (Buchujeon)", zh: "韭菜煎饼(Buchujeon)", ja: "ニラチヂミ(プチュジョン)", vi: "Bột hẹ rán" }, price: 120000 },
      { name: { ko: "김말이(10개)+만두튀김(8개)", en: "Fried Seaweed Noodle Rolls (10 pcs) + Fried Dumplings (8 pcs)", zh: "炸紫菜卷(10个)+炸饺子(8个)", ja: "キムマリ揚げ(10個)+揚げ餃子(8個)", vi: "Miến cuộn kim (10 cái) + Mandu chiên (8 cái)" }, price: 150000 },
      { name: { ko: "만두튀김(10개)", en: "Fried Dumplings (Mandu, 10 pcs)", zh: "炸饺子(Mandu，10个)", ja: "揚げ餃子(マンドゥ・10個)", vi: "Mandu chiên (10 cái)" }, price: 100000 },
      { name: { ko: "공기밥 추가", en: "Extra Bowl of Rice", zh: "加米饭", ja: "ご飯追加", vi: "Thêm cơm" }, price: 20000 },
    ],
  },
  {
    id: "soup",
    name: { ko: "국물류", en: "Stews & Hot Pots", zh: "汤锅类", ja: "鍋・チゲ類", vi: "Món nước & lẩu" },
    note: { ko: "2~3인 기준", en: "Serves 2–3 people", zh: "适合2~3人", ja: "2~3人前", vi: "Dùng cho 2–3 người" },
    items: [
      { name: { ko: "해물순두부", en: "Seafood Soft Tofu Stew (Sundubu Jjigae)", zh: "海鲜嫩豆腐汤(Sundubu Jjigae)", ja: "海鮮スンドゥブ", vi: "Canh đậu hũ non hải sản" }, sizes: [["S", 240000], ["L", 290000]], spicy: true },
      { name: { ko: "돼지고기김치전골", en: "Pork & Kimchi Hot Pot (Jeongol)", zh: "猪肉泡菜火锅(Jeongol)", ja: "豚キムチ鍋(ジョンゴル)", vi: "Lẩu kim chi thịt heo" }, price: 300000, spicy: true },
      { name: { ko: "칼칼한 어묵탕", en: "Spicy Fish Cake Soup (Eomuktang)", zh: "辣味鱼饼汤(Eomuktang)", ja: "ピリ辛おでん鍋(オムクタン)", vi: "Canh chả cá" }, price: 200000, spicy: true },
      { name: { ko: "호박고추장찌개", en: "Zucchini Gochujang Stew", zh: "南瓜辣酱汤(Hobak Gochujang Jjigae)", ja: "ズッキーニコチュジャンチゲ", vi: "Canh bí ngòi nấu tương ớt" }, price: 320000, spicy: true },
      { name: { ko: "스지수육전골", en: "Beef Tendon & Boiled Pork Hot Pot (Jeongol)", zh: "牛筋白切肉火锅(Jeongol)", ja: "牛すじスユク鍋(ジョンゴル)", vi: "Lẩu gân bò thịt luộc" }, price: 600000 },
      { name: { ko: "옛맛서울불고기", en: "Old-Style Seoul Bulgogi", zh: "老式首尔烤牛肉(Bulgogi)", ja: "昔ながらのソウルプルコギ", vi: "Thịt bò xào nước tương" }, price: 450000 },
    ],
  },
  {
    id: "meal",
    name: { ko: "식사류", en: "Meals", zh: "主食类", ja: "食事", vi: "Món cơm & canh" },
    items: [
      { name: { ko: "보리비빔밥", en: "Barley Bibimbap", zh: "大麦拌饭(Bibimbap)", ja: "麦ビビンバ", vi: "Cơm trộn lúa mạch" }, price: 180000 },
      { name: { ko: "청국장", en: "Fermented Soybean Stew (Cheonggukjang)", zh: "清曲酱汤(Cheonggukjang)", ja: "チョングッチャン(納豆チゲ)", vi: "Canh tương đậu lên men" }, price: 150000 },
      { name: { ko: "돌솥비빔밥", en: "Stone Pot Bibimbap (Dolsot Bibimbap)", zh: "石锅拌饭(Dolsot Bibimbap)", ja: "石焼ビビンバ(トルソッビビンバ)", vi: "Cơm thố đá trộn" }, price: 180000 },
      { name: { ko: "설렁탕", en: "Beef Bone Soup (Seolleongtang)", zh: "牛骨汤(Seolleongtang)", ja: "ソルロンタン(牛骨スープ)", vi: "Canh xương bò hầm" }, price: 180000 },
      { name: { ko: "떡만둣국", en: "Rice Cake & Dumpling Soup (Tteokmanduguk)", zh: "年糕饺子汤(Tteokmanduguk)", ja: "トックマンドゥクッ(餅と餃子のスープ)", vi: "Canh bánh gạo & hả cảo" }, price: 180000 },
      { name: { ko: "육개장", en: "Spicy Beef Soup (Yukgaejang)", zh: "辣牛肉汤(Yukgaejang)", ja: "ユッケジャン", vi: "Canh thịt bò cay" }, price: 180000, spicy: true },
      { name: { ko: "황태탕", en: "Dried Pollack Soup (Hwangtaetang)", zh: "干明太鱼汤(Hwangtaetang)", ja: "ファンテタン(干しスケトウダラのスープ)", vi: "Canh cá minh thái khô" }, price: 180000 },
      { name: { ko: "검은콩 들깨수제비", en: "Black Bean & Perilla Sujebi (Hand-Pulled Dough Soup)", zh: "黑豆紫苏叶面片汤(Sujebi)", ja: "黒豆エゴマ水団(スジェビ)", vi: "Canh bánh bột mì nấu mè" }, price: 180000 },
    ],
  },
  {
    id: "alcohol",
    name: { ko: "주류", en: "Alcohol", zh: "酒类", ja: "お酒", vi: "Đồ uống có cồn" },
    items: [
      { name: { ko: "타이거 맥주", en: "Tiger Beer", zh: "虎牌啤酒", ja: "タイガービール", vi: "Bia Tiger" }, price: 50000 },
      { name: { ko: "사이공 맥주", en: "Saigon Beer", zh: "西贡啤酒", ja: "サイゴンビール", vi: "Bia Sài Gòn" }, price: 50000 },
      { name: { ko: "알밤막걸리", en: "Chestnut Makgeolli", zh: "栗子马格利酒(Makgeolli)", ja: "栗マッコリ", vi: "Rượu gạo Makgeolli hạt dẻ" }, price: 120000 },
      { name: { ko: "국순당 막걸리(쌀)", en: "Kooksoondang Rice Makgeolli", zh: "麴醇堂大米马格利酒(Makgeolli)", ja: "国純堂マッコリ(米)", vi: "Rượu gạo Makgeolli Kooksoondang" }, price: 120000 },
      { name: { ko: "참이슬", en: "Chamisul Soju", zh: "真露烧酒(Chamisul)", ja: "チャミスル(焼酎)", vi: "Rượu soju Chamisul" }, price: 120000 },
      { name: { ko: "처음처럼", en: "Chum-Churum Soju", zh: "初饮初乐烧酒(Chum-Churum)", ja: "チョウムチョロム(焼酎)", vi: "Rượu soju Chum-Churum" }, price: 120000 },
      { name: { ko: "좋은데이", en: "Good Day Soju", zh: "好日子烧酒(Good Day)", ja: "チョウンデイ(焼酎)", vi: "Rượu soju Good Day" }, price: 100000 },
      { name: { ko: "진로", en: "Jinro Soju", zh: "真露烧酒(Jinro)", ja: "ジンロ(焼酎)", vi: "Rượu soju Jinro" }, price: 120000 },
      { name: { ko: "새로", en: "Saero Soju", zh: "新露烧酒(Saero)", ja: "セロ(焼酎)", vi: "Rượu soju Saero" }, price: 120000 },
      { name: { ko: "보드카맨", en: "Vodka Man", zh: "伏特加曼(Vodka Man)", ja: "ウォッカマン", vi: "Vodka Man" }, price: 100000 },
    ],
  },
  {
    id: "drink",
    name: { ko: "음료", en: "Soft Drinks", zh: "饮料", ja: "ドリンク", vi: "Nước giải khát" },
    items: [
      { name: { ko: "제로콜라", en: "Coke Zero", zh: "零度可乐", ja: "コカ・コーラ ゼロ", vi: "Coca Zero" }, price: 30000 },
      { name: { ko: "콜라", en: "Coke", zh: "可乐", ja: "コーラ", vi: "Coca-Cola" }, price: 20000 },
      { name: { ko: "환타", en: "Fanta", zh: "芬达", ja: "ファンタ", vi: "Fanta" }, price: 20000 },
      { name: { ko: "스프라이트", en: "Sprite", zh: "雪碧", ja: "スプライト", vi: "Sprite" }, price: 20000 },
    ],
  },
];
