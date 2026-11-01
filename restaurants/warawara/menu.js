// 와라와라(WARA WARA) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진 26장(2026-11-01 수집, 막회 화면은 2026-03-12), 가격 단위 VND
// price: 한 가지 가격 / sizes: [["L", 가격], ["M", 가격], ["S", 가격]] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "와라와라", en: "WARA WARA" },
  phone: "0357321215",
  address: "Số 42 TT4, KĐT Mỹ Đình - Sông Đà, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "09:30 – 23:00",
};

const PPL = { ko: "왼쪽부터 3~4인 · 2~3인", en: "Left: 3–4 people · right: 2–3 people", zh: "左为3~4人份 · 右为2~3人份", ja: "左から3~4人前・2~3人前", vi: "Trái: 3–4 người · phải: 2–3 người" };

window.MENU = [
  {
    id: "rec",
    name: { ko: "와라와라 추천 메뉴", en: "WARA WARA Picks", zh: "WARA WARA 推荐", ja: "ワラワラおすすめ", vi: "Món đề xuất" },
    items: [
      { price: 680000, name: { ko: "꼬막 (계절 메뉴)", en: "Blood Cockles (seasonal)", zh: "血蚶(季节限定)", ja: "赤貝(季節メニュー)", vi: "Sò huyết (theo mùa)" } },
      { price: 650000, name: { ko: "생골뱅이", en: "Fresh Sea Snails", zh: "鲜海螺", ja: "生つぶ貝", vi: "Ốc sống" } },
      { sizes: [["3~4", 900000], ["2~3", 750000]], spicy: true, desc: PPL, name: { ko: "아구찜 (탕·지리)", en: "Braised Monkfish (or stew / clear soup)", zh: "炖鮟鱇鱼(汤·清汤)", ja: "アンコウの蒸し煮(鍋・ちり)", vi: "Cá cóc hấp cay (lẩu / canh)" } },
      { price: 1200000, tag: "special", name: { ko: "흑산도 홍어 삼합", en: "Heuksando Skate Samhap", zh: "黑山岛斑鳐三合", ja: "黒山島エイのサムハプ", vi: "Cá đuối Hàn Quốc (samhap)" } },
      { price: 800000, name: { ko: "홍어삼합 (칠레산)", en: "Skate Samhap (Chilean skate)", zh: "斑鳐三合(智利产)", ja: "エイのサムハプ(チリ産)", vi: "Cá đuối samhap (Chile)" } },
      { price: 800000, name: { ko: "굴보쌈", en: "Oyster Bossam", zh: "生蚝菜包肉", ja: "牡蠣ポッサム", vi: "Hàu cuốn thịt luộc" } },
      { price: 900000, name: { ko: "일식 장어구이", en: "Japanese Grilled Eel", zh: "日式烤鳗鱼", ja: "うなぎの蒲焼", vi: "Lươn nướng kiểu Nhật" } },
      { price: 1000000, name: { ko: "안주 물회", en: "Cold Raw Fish Soup (large, for sharing)", zh: "冷生鱼片汤(下酒用)", ja: "ムルフェ(つまみ用・大)", vi: "Gỏi cá nước lạnh (to)" } },
      { price: 300000, name: { ko: "식사 물회", en: "Cold Raw Fish Soup (meal size)", zh: "冷生鱼片汤(餐食用)", ja: "ムルフェ(食事用)", vi: "Gỏi cá nước lạnh (nhỏ)" } },
      { price: 160000, name: { ko: "굴칼국수", en: "Oyster Knife-cut Noodles", zh: "生蚝刀削面", ja: "牡蠣カルグクス", vi: "Mì hàu" } },
      { price: 180000, name: { ko: "매생이 굴칼국수", en: "Seaweed & Oyster Knife-cut Noodles", zh: "海藻生蚝刀削面", ja: "カキと青のりのカルグクス", vi: "Mì rong biển với hàu" } },
      { price: 180000, name: { ko: "매생이 굴국밥", en: "Seaweed & Oyster Rice Soup", zh: "海藻生蚝汤饭", ja: "カキと青のりのクッパ", vi: "Cơm canh rong biển với hàu" } },
      { price: 350000, name: { ko: "일식 장어덮밥", en: "Eel Rice Bowl (Unadon)", zh: "日式鳗鱼饭", ja: "うな丼", vi: "Cơm lươn kiểu Nhật" } },
      { sizes: [["3~4", 1000000], ["2~3", 800000]], desc: PPL, name: { ko: "과메기", en: "Gwamegi (Half-dried Herring)", zh: "半干鲱鱼", ja: "クァメギ(半干しニシン)", vi: "Cá trích phơi khô" } },
    ],
  },
  {
    id: "tuna",
    name: { ko: "참치·연어", en: "Tuna & Salmon", zh: "金枪鱼·三文鱼", ja: "マグロ・サーモン", vi: "Cá ngừ & cá hồi" },
    note: { ko: "1인 가격 · 참치는 2인 이상 주문할 수 있어요", en: "Price per person · tuna for 2 or more people", zh: "每人价格 · 金枪鱼2人起点", ja: "1人前の価格・マグロは2人前から", vi: "Giá 1 người · cá ngừ phục vụ từ 2 người" },
    items: [
      { price: 1800000, tag: "best", photo: "img/tuna.jpg", name: { ko: "참치 한 마리", en: "Whole Tuna Platter", zh: "金枪鱼全鱼拼盘", ja: "マグロ一尾盛り", vi: "Cá ngừ thập cẩm" } },
      { price: 1500000, name: { ko: "참치 A++", en: "Tuna A++", zh: "金枪鱼 A++", ja: "マグロ A++", vi: "Cá ngừ A++" } },
      { price: 1300000, name: { ko: "참치 A+", en: "Tuna A+", zh: "金枪鱼 A+", ja: "マグロ A+", vi: "Cá ngừ A+" } },
      { price: 1000000, name: { ko: "참치 (뱃살·아카미·메카도로)", en: "Tuna (belly, akami, mekajiki toro)", zh: "金枪鱼(腹肉·赤身·剑鱼腹)", ja: "マグロ(腹身・赤身・メカトロ)", vi: "Cá ngừ (bụng, akami, mekatoro)" } },
      { price: 850000, name: { ko: "참치 + 연어 + 회", en: "Tuna + Salmon + Sashimi", zh: "金枪鱼+三文鱼+生鱼片", ja: "マグロ+サーモン+刺身", vi: "Gỏi cá ngừ, cá hồi và cá" } },
      { price: 600000, name: { ko: "연어", en: "Salmon Sashimi", zh: "三文鱼刺身", ja: "サーモン刺身", vi: "Gỏi cá hồi" } },
    ],
  },
  {
    id: "modeum",
    name: { ko: "참치머리·모듬회", en: "Tuna Head & Assorted Sashimi", zh: "金枪鱼头·生鱼片拼盘", ja: "マグロの頭・刺身盛り合わせ", vi: "Đầu cá ngừ & gỏi thập cẩm" },
    items: [
      { price: 3800000, tag: "special", name: { ko: "참치 머리 한 상", en: "Tuna Head Feast", zh: "金枪鱼头宴", ja: "マグロの頭一式", vi: "Đầu cá ngừ 1 đĩa" } },
      { price: 1300000, photo: "img/modeum.jpg", name: { ko: "모듬회 2인", en: "Assorted Sashimi (2 people)", zh: "生鱼片拼盘(2人份)", ja: "刺身盛り合わせ(2人前)", vi: "Gỏi thập cẩm 2 người" } },
      { price: 1800000, name: { ko: "모듬회 3인", en: "Assorted Sashimi (3 people)", zh: "生鱼片拼盘(3人份)", ja: "刺身盛り合わせ(3人前)", vi: "Gỏi thập cẩm 3 người" } },
      { price: 2400000, name: { ko: "모듬회 4인", en: "Assorted Sashimi (4 people)", zh: "生鱼片拼盘(4人份)", ja: "刺身盛り合わせ(4人前)", vi: "Gỏi thập cẩm 4 người" } },
    ],
  },
  {
    id: "hoe",
    name: { ko: "고급 회", en: "Premium Sashimi", zh: "高级生鱼片", ja: "高級刺身", vi: "Gỏi cá cao cấp" },
    items: [
      { sizes: [["L", 3200000], ["M", 2600000]], name: { ko: "광어", en: "Flatfish (Halibut)", zh: "比目鱼", ja: "ヒラメ", vi: "Gỏi cá bơn" } },
      { sizes: [["L", 2000000], ["M", 1800000]], name: { ko: "다금바리", en: "Longtooth Grouper", zh: "石斑鱼", ja: "クエ", vi: "Gỏi cá song" } },
      { sizes: [["L", 2000000], ["M", 1700000]], name: { ko: "병어", en: "Pomfret", zh: "鲳鱼", ja: "マナガツオ", vi: "Gỏi cá chim" } },
      { sizes: [["L", 2000000], ["M", 1700000]], name: { ko: "흑돔", en: "Black Sea Bream", zh: "黑鲷", ja: "黒鯛", vi: "Gỏi cá thác" } },
      { sizes: [["L", 2200000], ["M", 1800000]], name: { ko: "감성돔", en: "Blackhead Seabream", zh: "黑棘鲷", ja: "クロダイ", vi: "Gỏi cá cháp" } },
    ],
  },
  {
    id: "makhoe",
    name: { ko: "막회", en: "Casual Sashimi (Makhoe)", zh: "家常生鱼片", ja: "マッフェ(気軽な刺身)", vi: "Gỏi cá bình dân" },
    note: { ko: "소스·쌈 채소·기본 반찬·배추전·고구마튀김·꼬치어묵·국·알밥이 함께 나와요", en: "Served with sauces, lettuce wraps, side dishes, cabbage pancake, fried sweet potato, fish cake skewers, soup and fish roe rice", zh: "附酱料、包菜、小菜、白菜煎饼、炸红薯、鱼糕串、汤和鱼籽饭", ja: "タレ・サンチュ・おかず・白菜チヂミ・さつまいも天・おでん串・汁物・魚卵ご飯付き", vi: "Kèm nước chấm, rau cuốn, món phụ, bánh cải thảo, khoai lang chiên, chả cá xiên, canh và cơm trứng cá" },
    items: [
      { price: 500000, tag: "best", name: { ko: "무한리필 막회 (1인)", en: "All-you-can-eat Makhoe (per person)", zh: "无限续生鱼片(每人)", ja: "マッフェ食べ放題(1人)", vi: "Gỏi cá ăn thả ga (1 người)" }, desc: { ko: "인원수대로 주문 · 초등학생부터 적용 · 남은 음식 포장 불가 · 2시간 30분", en: "Order for everyone at the table · from primary-school age · no takeaway of leftovers · 2.5 hours", zh: "需按人数点 · 小学生起计费 · 剩菜不可打包 · 限时2.5小时", ja: "人数分の注文・小学生から適用・持ち帰り不可・2時間30分", vi: "Gọi đủ số người · tính từ học sinh tiểu học · không mang về đồ thừa · 2 giờ 30 phút" } },
      { sizes: [["L", 980000], ["M", 750000], ["S", 490000]], name: { ko: "다금바리 막회", en: "Grouper Makhoe", zh: "石斑鱼生鱼片", ja: "クエのマッフェ", vi: "Gỏi cá song" } },
      { sizes: [["L", 980000], ["M", 750000], ["S", 490000]], name: { ko: "병어 막회", en: "Pomfret Makhoe", zh: "鲳鱼生鱼片", ja: "マナガツオのマッフェ", vi: "Gỏi cá chim" } },
      { sizes: [["L", 980000], ["M", 750000], ["S", 490000]], name: { ko: "흑돔 막회", en: "Black Sea Bream Makhoe", zh: "黑鲷生鱼片", ja: "黒鯛のマッフェ", vi: "Gỏi cá thác" } },
      { sizes: [["L", 1190000], ["M", 890000], ["S", 600000]], name: { ko: "연어 막회", en: "Salmon Makhoe", zh: "三文鱼生鱼片", ja: "サーモンのマッフェ", vi: "Gỏi cá hồi" } },
      { sizes: [["L", 1190000], ["M", 890000], ["S", 590000]], name: { ko: "감성돔 막회", en: "Blackhead Seabream Makhoe", zh: "黑棘鲷生鱼片", ja: "クロダイのマッフェ", vi: "Gỏi cá cháp" } },
      { sizes: [["L", 1690000], ["M", 1190000], ["S", 690000]], name: { ko: "광어 막회", en: "Flatfish Makhoe", zh: "比目鱼生鱼片", ja: "ヒラメのマッフェ", vi: "Gỏi cá bơn" } },
      { sizes: [["L", 400000], ["M", 300000], ["S", 200000]], spicy: true, name: { ko: "매운탕", en: "Spicy Fish Stew (Maeuntang)", zh: "辣鱼汤", ja: "メウンタン(辛い魚鍋)", vi: "Lẩu cá cay" } },
      { price: 20000, name: { ko: "어묵 추가 (1개)", en: "Extra Fish Cake (1)", zh: "加鱼糕(1个)", ja: "おでん追加(1本)", vi: "Thêm chả cá (1 cái)" } },
      { price: 80000, name: { ko: "알밥 추가 (1개)", en: "Extra Fish Roe Rice (1)", zh: "加鱼籽饭(1份)", ja: "魚卵ご飯追加(1つ)", vi: "Thêm cơm trứng cá (1 phần)" } },
      { price: 160000, name: { ko: "콜키지 (1인)", en: "Corkage (per person)", zh: "开瓶费(每人)", ja: "持ち込み料(1人)", vi: "Phí mang đồ uống (1 người)" } },
    ],
  },
  {
    id: "sushi",
    name: { ko: "초밥", en: "Sushi", zh: "寿司", ja: "寿司", vi: "Sushi" },
    items: [
      { price: 300000, name: { ko: "모듬초밥 (10pcs)", en: "Assorted Sushi (10 pcs)", zh: "什锦寿司(10个)", ja: "盛り合わせ寿司(10貫)", vi: "Sushi thập cẩm (10 miếng)" } },
      { price: 340000, name: { ko: "연어초밥 (10pcs)", en: "Salmon Sushi (10 pcs)", zh: "三文鱼寿司(10个)", ja: "サーモン寿司(10貫)", vi: "Sushi cá hồi (10 miếng)" } },
      { price: 300000, name: { ko: "새우초밥 (12pcs)", en: "Shrimp Sushi (12 pcs)", zh: "虾寿司(12个)", ja: "エビ寿司(12貫)", vi: "Sushi tôm (12 miếng)" } },
      { price: 400000, name: { ko: "장어초밥 (10pcs)", en: "Eel Sushi (10 pcs)", zh: "鳗鱼寿司(10个)", ja: "うなぎ寿司(10貫)", vi: "Sushi lươn (10 miếng)" } },
      { price: 300000, name: { ko: "회초밥 (10pcs)", en: "Fish Sushi (10 pcs)", zh: "生鱼片寿司(10个)", ja: "刺身寿司(10貫)", vi: "Sushi cá (10 miếng)" } },
    ],
  },
  {
    id: "japan",
    name: { ko: "일식 안주", en: "Japanese Side Dishes", zh: "日式下酒菜", ja: "和風おつまみ", vi: "Đồ nhắm Nhật Bản" },
    items: [
      { price: 650000, name: { ko: "산낙지", en: "Live Octopus (Sannakji)", zh: "活章鱼", ja: "サンナクチ(生タコ)", vi: "Bạch tuộc sống" } },
      { price: 500000, name: { ko: "멍게", en: "Sea Squirt", zh: "海鞘", ja: "ホヤ", vi: "Hải tiêu" } },
      { sizes: [["1마리", 1400000], ["½마리", 900000]], photo: "img/octopus.jpg", name: { ko: "통문어 숙회", en: "Boiled Whole Octopus", zh: "整只章鱼刺身", ja: "茹でタコ丸ごと", vi: "Gỏi bạch tuộc luộc" }, desc: { ko: "한 마리 · 반 마리", en: "Whole · half", zh: "整只 · 半只", ja: "一匹・半匹", vi: "Nguyên con · nửa con" } },
      { price: 400000, photo: "img/tempura.jpg", name: { ko: "새우튀김", en: "Shrimp Tempura", zh: "炸虾天妇罗", ja: "エビ天ぷら", vi: "Tôm chiên" } },
      { price: 400000, name: { ko: "연어머리구이", en: "Grilled Salmon Head", zh: "烤三文鱼头", ja: "サーモンのかま焼き", vi: "Đầu cá hồi nướng" } },
      { price: 220000, name: { ko: "간고등어", en: "Salted Grilled Mackerel", zh: "烤咸鲭鱼", ja: "塩サバ焼き", vi: "Cá thu muối nướng" } },
    ],
  },
  {
    id: "korea",
    name: { ko: "한식 안주", en: "Korean Side Dishes", zh: "韩式下酒菜", ja: "韓国風おつまみ", vi: "Đồ nhắm Hàn Quốc" },
    items: [
      { price: 780000, spicy: true, name: { ko: "갈치조림", en: "Braised Hairtail", zh: "炖带鱼", ja: "タチウオの煮付け", vi: "Cá kiếm sốt" } },
      { price: 750000, spicy: true, name: { ko: "병어조림", en: "Braised Pomfret", zh: "炖鲳鱼", ja: "マナガツオの煮付け", vi: "Cá chim sốt" } },
      { price: 680000, spicy: true, name: { ko: "코다리조림", en: "Braised Half-dried Pollock", zh: "炖半干明太鱼", ja: "半干しスケトウダラの煮付け", vi: "Cá minh thái khô sốt" } },
      { price: 800000, spicy: true, name: { ko: "알 동태 전골", en: "Pollock & Roe Hot Pot", zh: "鱼籽冻明太鱼火锅", ja: "タラコとスケトウダラの鍋", vi: "Lẩu trứng cá & cá minh thái" } },
    ],
  },
  {
    id: "pork",
    name: { ko: "돼지고기", en: "Pork", zh: "猪肉", ja: "豚肉", vi: "Thịt lợn" },
    items: [
      { price: 480000, tag: "best", name: { ko: "한근 삼겹살", en: "Pork Belly (600 g)", zh: "五花肉(一斤)", ja: "サムギョプサル(600g)", vi: "Ba chỉ tươi nướng" }, desc: { ko: "정가 540,000동 · 와라와라 추천", en: "Regular price 540,000 VND · house pick", zh: "原价540,000盾 · 店家推荐", ja: "定価540,000ドン・店のおすすめ", vi: "Giá gốc 540.000đ · món quán đề xuất" } },
      { price: 400000, spicy: true, name: { ko: "고추장 석쇠구이", en: "Gochujang Grilled Pork", zh: "辣酱烤猪肉", ja: "コチュジャン網焼き", vi: "Thịt nướng vỉ sốt cay" } },
      { price: 400000, spicy: true, name: { ko: "주꾸미 석쇠구이", en: "Grilled Spicy Baby Octopus", zh: "辣烤小章鱼", ja: "イイダコの網焼き", vi: "Bạch tuộc nướng vỉ" } },
    ],
  },
  {
    id: "beef",
    name: { ko: "소고기", en: "Beef", zh: "牛肉", ja: "牛肉", vi: "Thịt bò" },
    items: [
      { price: 600000, name: { ko: "꽃살 (미국산 150g)", en: "Marbled Beef (US, 150 g)", zh: "雪花牛肉(美国产150g)", ja: "霜降り肉(米国産150g)", vi: "Thăn hoa nướng (Mỹ, 150g)" } },
      { price: 380000, name: { ko: "갈비살 (미국산 150g)", en: "Beef Rib Finger (US, 150 g)", zh: "牛肋条(美国产150g)", ja: "カルビサル(米国産150g)", vi: "Dẻ sườn nướng (Mỹ, 150g)" } },
    ],
  },
  {
    id: "meal",
    name: { ko: "식사", en: "Meals", zh: "主食", ja: "食事", vi: "Món ăn no" },
    items: [
      { price: 220000, name: { ko: "회덮밥", en: "Raw Fish Rice Bowl", zh: "生鱼片盖饭", ja: "刺身丼", vi: "Cơm gỏi cá" } },
      { price: 220000, name: { ko: "멍게 회덮밥", en: "Sea Squirt Rice Bowl", zh: "海鞘盖饭", ja: "ホヤ丼", vi: "Cơm trộn hải tiêu" } },
      { price: 160000, spicy: true, name: { ko: "양지 육개장", en: "Spicy Beef Soup (Yukgaejang)", zh: "辣牛肉汤", ja: "ユッケジャン", vi: "Canh thịt bò hầm cay" } },
      { price: 150000, name: { ko: "설렁탕", en: "Ox Bone Soup (Seolleongtang)", zh: "牛骨汤", ja: "ソルロンタン", vi: "Canh thịt bò hầm không cay" } },
      { price: 240000, name: { ko: "꼬리곰탕", en: "Oxtail Soup", zh: "牛尾汤", ja: "テールスープ", vi: "Canh đuôi bò" } },
      { price: 220000, name: { ko: "올갱이 해장국", en: "Freshwater Snail Soup", zh: "田螺醒酒汤", ja: "タニシのヘジャンクク", vi: "Canh ốc" } },
      { price: 200000, name: { ko: "통북어 해장국", en: "Dried Pollock Soup", zh: "整条干明太鱼醒酒汤", ja: "干しダラのヘジャンクク", vi: "Canh cá minh thái khô" } },
      { price: 120000, spicy: true, photo: "img/kimchi.jpg", name: { ko: "김치찌개", en: "Kimchi Stew", zh: "泡菜汤", ja: "キムチチゲ", vi: "Canh kim chi" } },
      { price: 150000, name: { ko: "튀김우동", en: "Tempura Udon", zh: "天妇罗乌冬面", ja: "天ぷらうどん", vi: "Udon tôm chiên" } },
      { price: 150000, name: { ko: "소바", en: "Soba Noodles", zh: "荞麦面", ja: "そば", vi: "Mì soba" } },
      { price: 160000, name: { ko: "돈까스", en: "Pork Cutlet (Tonkatsu)", zh: "炸猪排", ja: "とんかつ", vi: "Thịt lợn chiên xù" } },
      { price: 120000, name: { ko: "잔치국수", en: "Anchovy Broth Noodles", zh: "韩式鳀鱼汤面", ja: "チャンチグクス(にゅうめん)", vi: "Mì nước cá cơm" } },
    ],
  },
];
