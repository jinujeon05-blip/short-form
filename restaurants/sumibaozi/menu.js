// 수미보오즈 SUMIBOZU 炭ぼうず 메뉴 — 출처: 구글 지도 메뉴판 사진 74장(2026-11-22 수집, 일본어·베트남어 메뉴판, 시기별로 가격이 달라 같은 메뉴는 높은 쪽 — docs/todo.md). 프리미엄 사케·와인 일부와 타 가게 메뉴판(千房)은 뺌
window.RESTAURANT = {
  brand: { ko: "수미보오즈", en: "SUMIBOZU" },
  phone: "02432115580",
  address: "ngõ 535 P. Kim Mã, Giảng Võ, Hà Nội",
  wifi: null,
  hours: "11:00 – 14:00 / 17:00 – 23:00",
};

window.MENU = [
{ id: "recommend", name: {"ko":"추천 메뉴","en":"Recommended","zh":"推荐菜品","ja":"おすすめメニュー","vi":"Món đề xuất"}, note: {"ko":"스미보즈 추천·기간 한정 메뉴","en":"Sumibaozi recommendations and limited-time items","zh":"炭坊主推荐及限时菜品","ja":"炭ぼうずのおすすめ・期間限定メニュー","vi":"Món đề xuất và món giới hạn thời gian của Sumibaozi"}, items: [
  { name: {"ko":"치킨카츠 조림","en":"Chicken Katsuni","zh":"炸鸡排煮","ja":"チキンカツ煮","vi":"Gà katsu nấu (Chicken Katsuni)"}, desc: {"ko":"치킨 가츠니","en":"Simmered chicken cutlet","zh":"炖煮炸鸡排","ja":"チキンカツの煮物","vi":"Gà chiên xù nấu"}, price: 160000, photo: "img/katsuni.jpg", tag: "must" },
  { name: {"ko":"정통 사천풍 닭고기 마파두부","en":"Authentic Sichuan-Style Chicken Mapo Tofu","zh":"正宗四川风味鸡肉麻婆豆腐","ja":"本格四川風 鶏の麻婆豆腐","vi":"Đậu hũ Mapo gà kiểu Tứ Xuyên chính gốc"}, price: 160000, tag: "must", spicy: true },
  { name: {"ko":"스팸 주먹밥 (1개)","en":"Spam Rice Ball (1 pc)","zh":"午餐肉饭团（1个）","ja":"スパムおにぎり（1個）","vi":"Cơm nắm Spam (1 cái)"}, price: 65000, tag: "must" },
  { name: {"ko":"스팸 & 감자튀김","en":"Spam & French Fries","zh":"午餐肉配薯条","ja":"スパム＆ポテト","vi":"Spam & khoai tây chiên"}, price: 130000, photo: "img/spam-fries.jpg" },
  { name: {"ko":"새콤달콤 닭고기 볶음","en":"Sweet & Sour Stir-Fried Chicken","zh":"糖醋炒鸡肉","ja":"甘酢チキン炒め","vi":"Gà xào chua ngọt"}, price: 150000 },
  { name: {"ko":"비빔밥풍 닭고기 김치볶음","en":"Bibimbap-Style Chicken Kimchi Stir-Fry","zh":"拌饭风味鸡肉泡菜炒","ja":"ビビンバ風 鶏キムチ炒め","vi":"Gà xào kim chi kiểu bibimbap"}, price: 120000, photo: "img/kimchi-stirfry.jpg", spicy: true },
  { name: {"ko":"포크 계란 덮밥","en":"Pork & Egg Rice Bowl","zh":"猪肉鸡蛋盖饭","ja":"ポークたまご丼","vi":"Cơm thịt heo trứng (Pork Tamago Don)"}, price: 140000 },
  { name: {"ko":"소고기 멘치카츠 꼬치","en":"Beef Menchi-Katsu Skewer","zh":"牛肉炸肉饼串","ja":"牛メンチカツ串","vi":"Xiên chả bò chiên xù (Menchi Katsu)"}, desc: {"ko":"1꼬치 / 2꼬치 / 3꼬치 가격","en":"Price for 1 / 2 / 3 skewers","zh":"1串 / 2串 / 3串的价格","ja":"1本・2本・3本の価格","vi":"Giá cho 1 / 2 / 3 xiên"}, sizes: [["1",70000],["2",140000],["3",200000]] },
  { name: {"ko":"시시토 꼬치","en":"Shishito Pepper Skewer","zh":"狮子唐辛子串","ja":"ししとう串","vi":"Xiên ớt shishito"}, desc: {"ko":"꽈리고추, 기간 한정","en":"Shishito peppers, limited time","zh":"青椒（狮子唐辛子），限时供应","ja":"期間限定","vi":"Ớt shishito, giới hạn thời gian"}, price: 40000 },
  { name: {"ko":"타코와사비","en":"Tako Wasabi","zh":"芥末章鱼","ja":"タコわさび","vi":"Bạch tuộc wasabi (Tako Wasabi)"}, desc: {"ko":"문어 와사비, 기간 한정","en":"Octopus with wasabi, limited time","zh":"芥末章鱼，限时供应","ja":"期間限定","vi":"Bạch tuộc trộn wasabi, giới hạn thời gian"}, price: 120000 },
  { name: {"ko":"츠쿠네 연골 꼬치","en":"Tsukune Cartilage Skewer","zh":"鸡肉丸软骨串","ja":"つくね軟骨","vi":"Xiên chả gà sụn (Tsukune Nankotsu)"}, price: 40000 }
] },
{ id: "skewer", name: {"ko":"꼬치구이","en":"Grilled Skewers","zh":"烤串","ja":"串焼き","vi":"Xiên nướng"}, note: {"ko":"숯불에 구운 닭·돼지 꼬치 (1꼬치 가격)","en":"Chicken and pork skewers grilled over charcoal (price per skewer)","zh":"炭火烤鸡肉、猪肉串（每串价格）","ja":"炭火で焼いた鶏・豚の串（1本の価格）","vi":"Xiên gà, heo nướng than hoa (giá mỗi xiên)"}, items: [
  { name: {"ko":"네기마","en":"Negima","zh":"葱鸡肉串（Negima）","ja":"ねぎま","vi":"Gà xen hành (Negima)"}, desc: {"ko":"닭다리살과 대파","en":"Chicken thigh and leek","zh":"鸡腿肉和大葱","ja":"鶏もも肉と長ねぎ","vi":"Đùi gà và hành boa rô"}, price: 45000 },
  { name: {"ko":"모모","en":"Momo","zh":"鸡腿肉串（Momo）","ja":"もも","vi":"Đùi gà (Momo)"}, desc: {"ko":"닭다리살","en":"Chicken thigh","zh":"鸡腿肉","ja":"鶏もも肉","vi":"Thịt đùi gà"}, price: 40000 },
  { name: {"ko":"테바사키","en":"Tebasaki","zh":"鸡翅串（Tebasaki）","ja":"手羽先","vi":"Cánh gà (Tebasaki)"}, desc: {"ko":"닭날개","en":"Chicken wing","zh":"鸡翅","ja":"鶏の手羽先","vi":"Cánh gà"}, price: 45000 },
  { name: {"ko":"레바","en":"Reba","zh":"鸡肝串（Reba）","ja":"レバー","vi":"Gan gà (Reba)"}, desc: {"ko":"닭간","en":"Chicken liver","zh":"鸡肝","ja":"鶏のレバー","vi":"Gan gà"}, price: 40000 },
  { name: {"ko":"하츠","en":"Hatsu","zh":"鸡心串（Hatsu）","ja":"ハツ","vi":"Tim gà (Hatsu)"}, desc: {"ko":"닭염통","en":"Chicken heart","zh":"鸡心","ja":"鶏の心臓","vi":"Tim gà"}, price: 40000 },
  { name: {"ko":"스나기모","en":"Sunagimo","zh":"鸡胗串（Sunagimo）","ja":"砂肝","vi":"Mề gà (Sunagimo)"}, desc: {"ko":"닭모래집","en":"Chicken gizzard","zh":"鸡胗","ja":"鶏の砂肝","vi":"Mề gà"}, price: 35000 },
  { name: {"ko":"넥","en":"Neck","zh":"鸡颈肉串（Neck）","ja":"ネック","vi":"Cổ gà (Neck)"}, desc: {"ko":"닭목살","en":"Chicken neck","zh":"鸡颈肉","ja":"鶏の首肉","vi":"Thịt cổ gà"}, price: 40000 },
  { name: {"ko":"본보치","en":"Bonbochi","zh":"鸡尾肉串（Bonbochi）","ja":"ぼんぼち","vi":"Phao câu gà (Bonbochi)"}, desc: {"ko":"닭꼬리살","en":"Chicken tail","zh":"鸡尾肉","ja":"鶏の尾の付け根","vi":"Phần đuôi gà"}, price: 35000 },
  { name: {"ko":"카와","en":"Kawa","zh":"鸡皮串（Kawa）","ja":"かわ","vi":"Da gà (Kawa)"}, desc: {"ko":"닭껍질","en":"Chicken skin","zh":"鸡皮","ja":"鶏皮","vi":"Da gà"}, price: 40000 },
  { name: {"ko":"난코츠","en":"Nankotsu","zh":"鸡软骨串（Nankotsu）","ja":"なんこつ","vi":"Sụn gà (Nankotsu)"}, desc: {"ko":"닭연골","en":"Chicken cartilage","zh":"鸡软骨","ja":"鶏の軟骨","vi":"Sụn gà"}, price: 40000 },
  { name: {"ko":"부타바라","en":"Butabara","zh":"五花肉串（Butabara）","ja":"豚バラ","vi":"Ba chỉ heo (Butabara)"}, desc: {"ko":"삼겹살","en":"Pork belly","zh":"五花肉","ja":"豚バラ肉","vi":"Thịt ba chỉ heo"}, price: 40000 },
  { name: {"ko":"부타바라 와사비","en":"Butabara Wasabi","zh":"芥末五花肉串","ja":"豚バラ わさび","vi":"Ba chỉ heo wasabi (Butabara Wasabi)"}, desc: {"ko":"와사비 삼겹살","en":"Pork belly with wasabi","zh":"配芥末的五花肉","ja":"わさび添えの豚バラ","vi":"Ba chỉ heo với wasabi"}, price: 45000, photo: "img/butabara-wasabi.jpg" },
  { name: {"ko":"부타바라 고추장","en":"Butabara Gochujang","zh":"辣酱五花肉串","ja":"豚バラ コチュジャン","vi":"Ba chỉ heo gochujang (Butabara Gochujang)"}, desc: {"ko":"고추장 삼겹살","en":"Pork belly with gochujang","zh":"配韩式辣酱的五花肉","ja":"コチュジャン添えの豚バラ","vi":"Ba chỉ heo với tương ớt gochujang"}, price: 45000, spicy: true }
] },
{ id: "mune", name: {"ko":"닭가슴살 꼬치","en":"Chicken Breast Skewers","zh":"鸡胸肉串","ja":"ムネ串","vi":"Xiên ức gà"}, note: {"ko":"닭가슴살 꼬치 (1꼬치 가격)","en":"Chicken breast skewers (price per skewer)","zh":"鸡胸肉串（每串价格）","ja":"鶏むね肉の串（1本の価格）","vi":"Xiên ức gà (giá mỗi xiên)"}, items: [
  { name: {"ko":"닭가슴살 와사비","en":"Chicken Breast Wasabi","zh":"芥末鸡胸肉串","ja":"ムネ串 わさび","vi":"Ức gà wasabi"}, price: 40000 },
  { name: {"ko":"닭가슴살 명란","en":"Chicken Breast Mentaiko","zh":"明太子鸡胸肉串","ja":"ムネ串 明太子","vi":"Ức gà trứng cá tuyết (Mentaiko)"}, price: 40000 },
  { name: {"ko":"닭가슴살 매실 시소","en":"Chicken Breast Ume-Shiso","zh":"梅子紫苏鸡胸肉串","ja":"ムネ串 梅しそ","vi":"Ức gà mơ muối tía tô (Ume Shiso)"}, desc: {"ko":"우메지소","en":"Pickled plum and shiso leaf","zh":"腌梅子和紫苏叶","ja":"梅と大葉","vi":"Mơ muối và lá tía tô"}, price: 45000 }
] },
{ id: "tsukune", name: {"ko":"생 츠쿠네","en":"Fresh Tsukune","zh":"鲜肉鸡肉丸","ja":"生つくね","vi":"Chả gà tươi (Tsukune)"}, note: {"ko":"닭고기 완자 꼬치 (1꼬치 가격)","en":"Chicken meatball skewers (price per skewer)","zh":"鸡肉丸串（每串价格）","ja":"鶏つくねの串（1本の価格）","vi":"Xiên chả gà viên (giá mỗi xiên)"}, items: [
  { name: {"ko":"생 츠쿠네","en":"Fresh Tsukune","zh":"鲜肉鸡肉丸串","ja":"生つくね","vi":"Chả gà tươi (Tsukune)"}, price: 40000 },
  { name: {"ko":"명란 생 츠쿠네","en":"Mentaiko Fresh Tsukune","zh":"明太子鲜肉鸡肉丸串","ja":"明太子 生つくね","vi":"Chả gà tươi trứng cá tuyết (Mentaiko Tsukune)"}, price: 45000, photo: "img/tsukune-mentai.jpg" },
  { name: {"ko":"매실 시소 생 츠쿠네","en":"Ume-Shiso Fresh Tsukune","zh":"梅子紫苏鲜肉鸡肉丸串","ja":"梅しそ 生つくね","vi":"Chả gà tươi mơ muối tía tô (Ume Shiso Tsukune)"}, price: 45000 },
  { name: {"ko":"치즈 츠쿠네","en":"Cheese Tsukune","zh":"芝士鸡肉丸串","ja":"チーズつくね","vi":"Chả gà phô mai (Cheese Tsukune)"}, price: 45000, photo: "img/tsukune-cheese.jpg" },
  { name: {"ko":"츠키미 츠쿠네","en":"Tsukimi Tsukune","zh":"月见鸡肉丸串","ja":"月見つくね","vi":"Chả gà viên kèm lòng đỏ trứng (Tsukimi Tsukune)"}, desc: {"ko":"달걀 노른자, 2꼬치부터 주문","en":"With egg yolk, minimum order 2 skewers","zh":"配蛋黄，2串起点","ja":"卵黄添え、2本から注文","vi":"Kèm lòng đỏ trứng, đặt từ 2 xiên"}, price: 45000, photo: "img/tsukimi.jpg" }
] },
{ id: "maki", name: {"ko":"말이 꼬치·채소 꼬치","en":"Pork-Wrapped & Vegetable Skewers","zh":"肉卷串・蔬菜串","ja":"巻き串・野菜串","vi":"Xiên cuộn thịt & xiên rau củ"}, note: {"ko":"삼겹살 말이 꼬치와 채소 꼬치 (1꼬치 가격)","en":"Pork belly-wrapped skewers and vegetable skewers (price per skewer)","zh":"五花肉卷串和蔬菜串（每串价格）","ja":"豚バラ巻き串と野菜串（1本の価格）","vi":"Xiên ba chỉ heo cuộn và xiên rau củ (giá mỗi xiên)"}, items: [
  { name: {"ko":"아스파라거스 삼겹살 말이","en":"Asparagus Pork Roll","zh":"芦笋五花肉卷","ja":"アスパラ巻き","vi":"Măng tây cuộn ba chỉ heo"}, price: 40000 },
  { name: {"ko":"토마토 삼겹살 말이","en":"Tomato Pork Roll","zh":"番茄五花肉卷","ja":"トマト巻き","vi":"Cà chua cuộn ba chỉ heo"}, price: 40000, photo: "img/tomato-maki.jpg" },
  { name: {"ko":"팽이버섯 삼겹살 말이","en":"Enoki Mushroom Pork Roll","zh":"金针菇五花肉卷","ja":"えのき巻き","vi":"Nấm kim châm cuộn ba chỉ heo"}, price: 40000 },
  { name: {"ko":"오크라 삼겹살 말이","en":"Okra Pork Roll","zh":"秋葵五花肉卷","ja":"オクラ巻き","vi":"Đậu bắp cuộn ba chỉ heo"}, price: 40000 },
  { name: {"ko":"떡(오모치) 삼겹살 말이","en":"Rice Cake (Omochi) Pork Roll","zh":"年糕五花肉卷","ja":"お餅巻き","vi":"Bánh gạo (Omochi) cuộn ba chỉ heo"}, desc: {"ko":"2꼬치부터 주문","en":"Minimum order 2 skewers","zh":"2串起点","ja":"2本から注文","vi":"Đặt từ 2 xiên"}, price: 45000 },
  { name: {"ko":"표고버섯 고기말이","en":"Shiitake Meat Roll (Nabekura Maki)","zh":"香菇肉卷（Nabekura Maki）","ja":"ナベクラ巻き 椎茸肉巻き","vi":"Nấm hương cuộn thịt (Nabekura Maki)"}, desc: {"ko":"나베쿠라 마키","en":"Shiitake mushroom wrapped in meat","zh":"肉卷香菇","ja":"椎茸の肉巻き","vi":"Nấm hương cuộn thịt"}, price: 45000 },
  { name: {"ko":"대파 꼬치","en":"Leek Skewer","zh":"大葱串","ja":"長ねぎ","vi":"Xiên hành boa rô"}, price: 40000 },
  { name: {"ko":"양파 꼬치","en":"Onion Skewer","zh":"洋葱串","ja":"玉ねぎ","vi":"Xiên hành tây"}, price: 40000 },
  { name: {"ko":"메추리알 꼬치","en":"Quail Egg Skewer","zh":"鹌鹑蛋串","ja":"うずら卵","vi":"Xiên trứng cút"}, price: 35000, photo: "img/quail-egg.jpg" },
  { name: {"ko":"마늘 꼬치","en":"Garlic Skewer","zh":"大蒜串","ja":"にんにく","vi":"Xiên tỏi"}, price: 35000 },
  { name: {"ko":"은행 꼬치","en":"Ginkgo Nut Skewer","zh":"银杏串","ja":"ぎんなん","vi":"Xiên bạch quả (Ginnan)"}, price: 40000, photo: "img/ginkgo.jpg" }
] },
{ id: "course", name: {"ko":"꼬치구이 코스","en":"Skewer Course","zh":"烤串套餐","ja":"串焼きコース","vi":"Set xiên nướng"}, note: {"ko":"꼬치 5종 + 미니 샐러드 + 닭 육수 수프","en":"5 skewers + mini salad + chicken broth soup","zh":"5种烤串 + 迷你沙拉 + 鸡汤","ja":"串5本 + ミニサラダ + 鶏スープ","vi":"5 xiên + salad mini + súp nước dùng gà"}, items: [
  { name: {"ko":"꼬치구이 코스","en":"Skewer Course","zh":"烤串套餐","ja":"串焼きコース","vi":"Set xiên nướng"}, desc: {"ko":"꼬치 5개 · 미니 샐러드 · 닭 육수 수프","en":"5 skewers, mini salad, chicken broth soup","zh":"5串烤串、迷你沙拉、鸡汤","ja":"串5本・ミニサラダ・鶏スープ","vi":"5 xiên, salad mini, súp nước dùng gà"}, price: 200000, tag: "best" }
] },
{ id: "friedskewer", name: {"ko":"꼬치튀김","en":"Fried Skewers","zh":"炸串","ja":"串揚げ","vi":"Xiên chiên"}, note: {"ko":"바삭하게 튀긴 꼬치와 사이드 메뉴 (꼬치는 1꼬치 가격)","en":"Crispy fried skewers and sides","zh":"酥脆炸串和小食","ja":"サクサクの串揚げとサイドメニュー","vi":"Xiên chiên giòn và món ăn kèm"}, items: [
  { name: {"ko":"삼겹살 꼬치튀김","en":"Fried Pork Belly Skewer","zh":"炸五花肉串","ja":"豚バラ串揚げ","vi":"Xiên ba chỉ heo chiên"}, price: 50000 },
  { name: {"ko":"닭다리살 꼬치튀김","en":"Fried Chicken Thigh Skewer","zh":"炸鸡腿肉串","ja":"とりもも串揚げ","vi":"Xiên đùi gà chiên"}, price: 50000 },
  { name: {"ko":"3종 치즈 감자튀김","en":"Three-Cheese French Fries","zh":"三种芝士薯条","ja":"3種チーズポテト","vi":"Khoai tây chiên 3 loại phô mai"}, price: 150000 },
  { name: {"ko":"소고기 소보로 덮밥","en":"Beef Soboro Rice Bowl","zh":"牛肉碎盖饭","ja":"牛そぼろ丼","vi":"Cơm thịt bò xào vụn (Gyu Soboro Don)"}, price: 85000 }
] },
{ id: "fried", name: { ko: "튀김", en: "Fried Dishes", zh: "炸物", ja: "揚げ物", vi: "Món chiên" }, note: { ko: "닭튀김과 안주 튀김", en: "Fried chicken and fried snacks", zh: "炸鸡和下酒炸物", ja: "唐揚げとおつまみ揚げ物", vi: "Gà chiên và các món chiên nhắm rượu" }, items: [
  { name: { ko: "파 매운맛 닭튀김", en: "Spicy Green Onion Tatsuta-age", zh: "葱辣竜田炸鸡", ja: "ねぎ辛 竜田揚げ", vi: "Gà chiên Tatsuta-age hành cay" }, desc: { ko: "네기카라 타츠타아게", en: "Negi-kara Tatsuta-age", zh: "葱辣竜田炸", ja: "ねぎ辛の竜田揚げ", vi: "Negi-kara Tatsuta-age" }, price: 160000, photo: "img/negi-tatsuta.jpg", spicy: true },
  { name: { ko: "야키토리집 가라아게", en: "Yakitori-ya Karaage", zh: "烤鸡肉串店炸鸡", ja: "焼鳥屋の唐揚げ", vi: "Gà chiên Karaage kiểu quán yakitori" }, desc: { ko: "닭튀김", en: "Japanese fried chicken", zh: "日式炸鸡", ja: "鶏の唐揚げ", vi: "Gà chiên kiểu Nhật" }, price: 160000, photo: "img/karaage.jpg" },
  { name: { ko: "갈릭 가라아게", en: "Garlic Karaage", zh: "蒜香炸鸡", ja: "ガーリック唐揚げ", vi: "Gà chiên Karaage tỏi" }, price: 160000 },
  { name: { ko: "스파이시 치즈 가라아게", en: "Spicy Cheese Karaage", zh: "香辣芝士炸鸡", ja: "スパイシーチーズ唐揚げ", vi: "Gà chiên Karaage phô mai cay" }, price: 160000, spicy: true },
  { name: { ko: "치킨 난반", en: "Chicken Nanban", zh: "南蛮炸鸡", ja: "チキン南蛮", vi: "Gà Nanban" }, price: 160000, photo: "img/chicken-nanban.jpg" },
  { name: { ko: "유린치", en: "Yurinchi", zh: "油淋鸡", ja: "油淋鶏", vi: "Gà chiên sốt Yurinchi" }, desc: { ko: "중국식 닭튀김", en: "Chinese-style fried chicken", zh: "中式炸鸡", ja: "中華風の鶏の唐揚げ", vi: "Gà chiên kiểu Trung Hoa" }, price: 160000, photo: "img/yurinchi.jpg" },
  { name: { ko: "치킨카츠", en: "Chicken Katsu", zh: "炸鸡排", ja: "チキンカツ", vi: "Gà chiên xù Katsu" }, price: 160000 },
  { name: { ko: "테바사키 가라아게", en: "Tebasaki Karaage", zh: "炸鸡翅", ja: "手羽先唐揚げ", vi: "Cánh gà chiên Tebasaki" }, desc: { ko: "한입 닭날개 튀김", en: "Bite-sized fried chicken wings", zh: "一口大小的炸鸡翅", ja: "一口サイズの手羽先の唐揚げ", vi: "Cánh gà chiên cỡ miếng ăn" }, price: 140000, photo: "img/tebasaki.jpg" },
  { name: { ko: "난코츠 가라아게", en: "Nankotsu Karaage", zh: "炸鸡软骨", ja: "なんこつ唐揚げ", vi: "Sụn gà chiên Nankotsu" }, desc: { ko: "닭연골 튀김", en: "Fried chicken cartilage", zh: "炸鸡软骨", ja: "鶏の軟骨の唐揚げ", vi: "Sụn gà chiên giòn" }, price: 120000 },
  { name: { ko: "굴튀김", en: "Fried Oysters (Kaki Fry)", zh: "炸牡蛎", ja: "カキフライ", vi: "Hàu chiên xù (Kaki Fry)" }, price: 200000 },
  { name: { ko: "토리텐 이소베아게", en: "Tori-ten Isobe-age", zh: "海苔炸鸡胸肉", ja: "とり天 磯辺揚げ", vi: "Tori-ten Isobe-age" }, desc: { ko: "닭가슴살 김튀김", en: "Chicken breast tempura with nori", zh: "裹海苔的炸鸡胸肉", ja: "鶏むね肉の海苔入り天ぷら", vi: "Ức gà tempura với rong biển" }, price: 140000 },
  { name: { ko: "오모치 이소베아게", en: "Omochi Isobe-age", zh: "海苔炸年糕", ja: "お餅 磯辺揚げ", vi: "Bánh mochi chiên Isobe-age" }, desc: { ko: "떡 김튀김", en: "Rice cake tempura with nori", zh: "裹海苔的炸年糕", ja: "お餅の海苔入り天ぷら", vi: "Bánh mochi chiên với rong biển" }, price: 145000 },
  { name: { ko: "아게다시 두부", en: "Agedashi Tofu", zh: "炸豆腐", ja: "揚げ出し豆腐", vi: "Đậu hũ chiên Agedashi" }, price: 105000, photo: "img/agedashi.jpg" },
  { name: { ko: "감자튀김", en: "French Fries", zh: "炸薯条", ja: "ポテトフライ", vi: "Khoai tây chiên" }, price: 85000 },
  { name: { ko: "스파이시 닭날개", en: "Spicy Chicken Wings", zh: "香辣鸡翅", ja: "スパイシー手羽先", vi: "Cánh gà cay" }, price: 35000, sizes: [["1", 35000], ["3", 100000], ["5", 160000], ["7", 230000]], spicy: true }
] },
{ id: "dish", name: { ko: "일품요리", en: "Small Dishes", zh: "单点小菜", ja: "一品料理", vi: "Món lẻ" }, note: { ko: "안주·곁들임 요리", en: "Snacks and side dishes", zh: "下酒菜和配菜", ja: "おつまみ・小皿料理", vi: "Món nhắm và món ăn kèm" }, items: [
  { name: { ko: "우마미 타타키 큐우리", en: "Umami Tataki Kyuri", zh: "拍黄瓜", ja: "うまみ叩ききゅうり", vi: "Dưa leo đập Umami Tataki" }, desc: { ko: "두드린 오이무침", en: "Smashed cucumber salad", zh: "凉拌拍黄瓜", ja: "叩ききゅうりの和え物", vi: "Dưa leo đập trộn gia vị" }, price: 80000, photo: "img/cucumber.jpg" },
  { name: { ko: "스나기모노 폰즈", en: "Sunagimo Ponzu", zh: "柚子醋拌鸡胗", ja: "砂肝ポン酢", vi: "Mề gà trộn Ponzu" }, desc: { ko: "닭모래집 폰즈무침", en: "Chicken gizzard with ponzu", zh: "鸡胗拌柚子醋", ja: "砂肝のポン酢和え", vi: "Mề gà trộn sốt Ponzu" }, price: 80000 },
  { name: { ko: "레바노 산쇼 무시", en: "Steamed Liver with Sansho", zh: "山椒蒸鸡肝", ja: "レバーの山椒蒸し", vi: "Gan gà hấp tiêu Sansho" }, desc: { ko: "닭간 산초찜", en: "Chicken liver steamed with Sichuan-style pepper", zh: "山椒蒸鸡肝", ja: "鶏レバーの山椒蒸し", vi: "Gan gà hấp với tiêu Sansho" }, price: 105000 },
  { name: { ko: "부추 계란 볶음", en: "Chive and Egg Stir-fry (Nira-tama)", zh: "韭菜炒蛋", ja: "ニラ玉", vi: "Trứng xào hẹ (Nira-tama)" }, price: 120000 },
  { name: { ko: "히야얏코", en: "Hiyayakko", zh: "冷豆腐", ja: "冷奴", vi: "Đậu hũ lạnh (Hiyayakko)" }, desc: { ko: "냉두부", en: "Chilled tofu", zh: "凉拌豆腐", ja: "冷たい豆腐", vi: "Đậu hũ ăn lạnh" }, price: 55000, photo: "img/hiyayakko.jpg" },
  { name: { ko: "히야얏코풍 크림치즈", en: "Hiyayakko-style Cream Cheese", zh: "冷豆腐风味奶油奶酪", ja: "冷奴風クリームチーズ", vi: "Phô mai kem kiểu Hiyayakko" }, price: 105000 },
  { name: { ko: "계란 푼 두부", en: "Tofu with Egg (Tamago-toji)", zh: "蛋花豆腐", ja: "卵とじ豆腐", vi: "Đậu hũ nấu trứng" }, price: 105000 },
  { name: { ko: "에다마메", en: "Edamame", zh: "毛豆", ja: "枝豆", vi: "Đậu nành Edamame" }, desc: { ko: "찐 풋콩", en: "Steamed young soybeans", zh: "水煮毛豆", ja: "茹でた枝豆", vi: "Đậu nành non luộc" }, price: 70000, photo: "img/edamame.jpg" },
  { name: { ko: "김치 모둠", en: "Assorted Kimchi", zh: "泡菜拼盘", ja: "キムチ盛り合わせ", vi: "Kim chi thập cẩm" }, price: 70000 },
  { name: { ko: "일본식 오징어젓", en: "Ika no Shiokara", zh: "日式盐渍鱿鱼", ja: "イカの塩辛", vi: "Mực muối kiểu Nhật (Shiokara)" }, desc: { ko: "시오카라", en: "Salted fermented squid", zh: "盐渍发酵鱿鱼", ja: "イカの塩辛", vi: "Mực lên men muối" }, price: 125000 },
  { name: { ko: "안주용 크림치즈", en: "Cream Cheese Snack", zh: "下酒奶油奶酪", ja: "おつまみクリームチーズ", vi: "Phô mai kem nhắm rượu" }, price: 110000 }
] },
{ id: "salad", name: { ko: "샐러드", en: "Salads", zh: "沙拉", ja: "サラダ", vi: "Salad" }, note: { ko: "신선한 채소 샐러드", en: "Fresh vegetable salads", zh: "新鲜蔬菜沙拉", ja: "新鮮野菜のサラダ", vi: "Salad rau tươi" }, items: [
  { name: { ko: "스미보즈 샐러드", en: "Sumibozu Salad", zh: "炭坊主沙拉", ja: "炭ぼうずサラダ", vi: "Salad Sumibozu" }, desc: { ko: "참깨 드레싱", en: "Sesame dressing", zh: "芝麻酱汁", ja: "ごまドレッシング", vi: "Sốt mè" }, price: 160000 },
  { name: { ko: "야키니쿠풍 샐러드", en: "Yakiniku-style Salad", zh: "烤肉风味沙拉", ja: "焼肉風サラダ", vi: "Salad kiểu Yakiniku" }, price: 180000 },
  { name: { ko: "돼지고기 폰즈 샐러드", en: "Pork Ponzu Salad", zh: "猪肉柚子醋沙拉", ja: "豚肉ポン酢サラダ", vi: "Salad thịt heo sốt Ponzu" }, price: 180000 },
  { name: { ko: "가라아게 시저 샐러드", en: "Karaage Caesar Salad", zh: "炸鸡凯撒沙拉", ja: "唐揚げシーザーサラダ", vi: "Salad Caesar gà chiên Karaage" }, price: 200000, photo: "img/caesar-karaage.jpg" },
  { name: { ko: "무 샐러드", en: "Daikon Radish Salad", zh: "萝卜沙拉", ja: "大根サラダ", vi: "Salad củ cải trắng" }, desc: { ko: "매실 드레싱", en: "Plum dressing", zh: "梅子酱汁", ja: "梅ドレッシング", vi: "Sốt mơ muối" }, price: 140000 },
  { name: { ko: "양배추 모둠", en: "Cabbage Plate (Kyabetsu)", zh: "卷心菜拼盘", ja: "キャベツ盛り", vi: "Đĩa bắp cải (Kyabetsu)" }, price: 120000, photo: "img/cabbage.jpg" },
  { name: { ko: "양파 슬라이스", en: "Sliced Onion", zh: "洋葱丝", ja: "オニオンスライス", vi: "Hành tây thái lát" }, price: 125000 }
] },
{ id: "fish", name: { ko: "생선 요리", en: "Fish Dishes", zh: "鱼类料理", ja: "魚料理", vi: "Món cá" }, note: { ko: "직화로 겉을 구운 생선", en: "Fish seared over an open flame", zh: "明火炙烤表面的鱼", ja: "直火で表面を炙った魚", vi: "Cá được áp chảo trên lửa trực tiếp" }, items: [
  { name: { ko: "시메사바 아부리", en: "Seared Shime-saba", zh: "炙烤醋渍青花鱼", ja: "しめ鯖 炙り", vi: "Cá thu ngâm giấm áp chảo (Shime-saba Aburi)" }, desc: { ko: "식초에 절인 고등어 직화구이", en: "Vinegar-cured mackerel, flame-seared", zh: "醋渍青花鱼明火炙烤", ja: "酢でしめた鯖を直火で炙ったもの", vi: "Cá thu ngâm giấm, áp chảo lửa trực tiếp" }, price: 210000, photo: "img/shimesaba.jpg" },
  { name: { ko: "연어 아부리", en: "Seared Salmon (Aburi)", zh: "炙烤三文鱼", ja: "サーモン炙り", vi: "Cá hồi áp chảo (Aburi)" }, desc: { ko: "연어 표면구이", en: "Salmon seared on the surface", zh: "三文鱼表面炙烤", ja: "サーモンの表面を炙ったもの", vi: "Cá hồi áp chảo bề mặt" }, price: 200000 },
  { name: { ko: "오늘의 생선구이", en: "Today's Grilled Fish", zh: "今日烤鱼", ja: "本日の焼き魚", vi: "Cá nướng của ngày" }, desc: { ko: "직원에게 문의", en: "Please ask our staff", zh: "请询问店员", ja: "スタッフにお尋ねください", vi: "Vui lòng hỏi nhân viên" }, price: null }
] },
{ id: "meal", name: { ko: "식사", en: "Meals", zh: "主食", ja: "お食事", vi: "Cơm và món no" }, note: { ko: "덮밥·죽·라멘·주먹밥", en: "Rice bowls, rice porridge, ramen and rice balls", zh: "盖饭、粥、拉面、饭团", ja: "丼・雑炊・ラーメン・おにぎり", vi: "Cơm tô, cháo, ramen và cơm nắm" }, items: [
  { name: { ko: "오야코동", en: "Oyakodon", zh: "亲子丼", ja: "親子丼", vi: "Cơm gà trứng (Oyakodon)" }, desc: { ko: "닭고기 계란 덮밥", en: "Chicken and egg rice bowl", zh: "鸡肉鸡蛋盖饭", ja: "鶏肉と卵の丼", vi: "Cơm tô gà và trứng" }, price: 170000, photo: "img/oyakodon.jpg" },
  { name: { ko: "야키토리동", en: "Yakitori-don", zh: "烤鸡肉串盖饭", ja: "焼鳥丼", vi: "Cơm gà nướng Yakitori" }, desc: { ko: "꼬치구이 덮밥", en: "Grilled skewer rice bowl", zh: "烤串盖饭", ja: "焼鳥の丼", vi: "Cơm tô gà xiên nướng" }, price: 185000 },
  { name: { ko: "야키니쿠동", en: "Yakiniku-don", zh: "烤肉盖饭", ja: "焼肉丼", vi: "Cơm thịt nướng Yakiniku" }, desc: { ko: "고기 덮밥", en: "Grilled meat rice bowl", zh: "烤肉盖饭", ja: "焼肉の丼", vi: "Cơm tô thịt nướng" }, price: 170000 },
  { name: { ko: "소스 치킨카츠동", en: "Sauce Chicken Katsu-don", zh: "酱汁炸鸡排盖饭", ja: "ソースチキンカツ丼", vi: "Cơm gà chiên xù sốt" }, price: 170000 },
  { name: { ko: "오므라이스동", en: "Omurice-don", zh: "蛋包饭盖饭", ja: "オムライス丼", vi: "Cơm trứng cuộn Omurice" }, price: 170000 },
  { name: { ko: "토리 라멘", en: "Tori Ramen", zh: "鸡汤拉面", ja: "鶏ラーメン", vi: "Ramen gà" }, desc: { ko: "닭 육수 미소 / 닭 육수 간장", en: "Chicken broth, miso or soy sauce", zh: "鸡汤底，味噌或酱油", ja: "鶏出汁の味噌 / 醤油", vi: "Nước dùng gà, vị miso hoặc shoyu" }, price: 170000, photo: "img/ramen.jpg" },
  { name: { ko: "조스이", en: "Zosui", zh: "杂炊粥", ja: "雑炊", vi: "Cháo Zosui" }, desc: { ko: "일본식 죽", en: "Japanese rice porridge", zh: "日式粥", ja: "日本風のおじや", vi: "Cháo kiểu Nhật" }, price: 140000, photo: "img/zosui.jpg" },
  { name: { ko: "오차즈케", en: "Ochazuke", zh: "茶泡饭", ja: "お茶漬け", vi: "Cơm chan trà (Ochazuke)" }, desc: { ko: "매실·연어·명란", en: "Plum, salmon or cod roe", zh: "梅子、三文鱼、明太子", ja: "梅・鮭・明太子", vi: "Mơ muối, cá hồi hoặc trứng cá tuyết" }, price: 130000 },
  { name: { ko: "오니기리", en: "Onigiri", zh: "饭团", ja: "おにぎり", vi: "Cơm nắm Onigiri" }, desc: { ko: "매실·연어·명란 주먹밥", en: "Rice ball: plum, salmon or cod roe", zh: "饭团：梅子、三文鱼、明太子", ja: "梅・鮭・明太子のおにぎり", vi: "Cơm nắm: mơ muối, cá hồi hoặc trứng cá tuyết" }, price: 60000 },
  { name: { ko: "구운 주먹밥", en: "Yaki Onigiri", zh: "烤饭团", ja: "焼きおにぎり", vi: "Cơm nắm nướng (Yaki Onigiri)" }, price: 60000, photo: "img/yaki-onigiri.jpg" }
] },
{ id: "udon", name: { ko: "스미보즈 특제 우동", en: "Sumibozu Special Udon", zh: "炭坊主特制乌冬", ja: "炭ぼうず特製うどん", vi: "Udon đặc biệt Sumibozu" }, note: { ko: "스미보즈 특제 우동 · 타코야키 · 김치", en: "Sumibozu special udon, takoyaki and kimchi", zh: "炭坊主特制乌冬 · 章鱼烧 · 泡菜", ja: "炭ぼうず特製うどん・たこ焼き・キムチ", vi: "Udon đặc biệt Sumibozu, Takoyaki và kim chi" }, items: [
  { name: { ko: "따뜻한 떡 유부주머니 우동", en: "Hot Udon with Mochi Kinchaku", zh: "热年糕福袋乌冬", ja: "温かい餅きんちゃくうどん", vi: "Udon nóng túi đậu hũ nhân mochi" }, price: 160000 },
  { name: { ko: "닭튀김(토리텐) 냉우동", en: "Cold Udon with Tori-ten", zh: "炸鸡天妇罗冷乌冬", ja: "とり天 冷やしうどん", vi: "Udon lạnh gà chiên Tori-ten" }, price: 160000 },
  { name: { ko: "온천계란 명란 냉우동", en: "Cold Udon with Hot Spring Egg and Mentaiko", zh: "温泉蛋明太子冷乌冬", ja: "温玉明太 冷やしうどん", vi: "Udon lạnh trứng onsen và trứng cá Mentaiko" }, price: 160000, photo: "img/udon-mentaiko.jpg" },
  { name: { ko: "따뜻한 튀김 우동", en: "Hot Tempura Udon", zh: "热天妇罗乌冬", ja: "温かい天ぷらうどん", vi: "Udon nóng tempura" }, price: 160000, photo: "img/udon-tempura.jpg" },
  { name: { ko: "타코야키 - 기본 소스", en: "Takoyaki - Classic Sauce", zh: "章鱼烧 - 经典酱汁", ja: "たこ焼き ソース", vi: "Takoyaki - sốt truyền thống" }, price: 110000 },
  { name: { ko: "타코야키 - 명란 마요", en: "Takoyaki - Mentaiko Mayo", zh: "章鱼烧 - 明太子蛋黄酱", ja: "たこ焼き 明太マヨ", vi: "Takoyaki - mayonnaise trứng cá Mentaiko" }, price: 110000 },
  { name: { ko: "타코야키 - 난반풍", en: "Takoyaki - Nanban Style", zh: "章鱼烧 - 南蛮风味", ja: "たこ焼き 南蛮風", vi: "Takoyaki - kiểu Nanban" }, price: 110000 },
  { name: { ko: "타코야키 - 양념 치즈", en: "Takoyaki - Seasoned Cheese", zh: "章鱼烧 - 调味芝士", ja: "たこ焼き 味付けチーズ", vi: "Takoyaki - phô mai tẩm gia vị" }, price: 110000 },
  { name: { ko: "스미보즈 자랑의 수제 김치", en: "Sumibozu's Homemade Kimchi", zh: "炭坊主自豪的自制泡菜", ja: "自慢の手作りキムチ", vi: "Kim chi tự làm của Sumibozu" }, price: 70000, spicy: true },
  { name: { ko: "치즈 김치 구운 주먹밥", en: "Cheese Kimchi Yaki Onigiri", zh: "芝士泡菜烤饭团", ja: "チーズキムチ焼きおにぎり", vi: "Cơm nắm nướng kim chi phô mai" }, price: 75000 },
  { name: { ko: "김치 구운 주먹밥", en: "Kimchi Yaki Onigiri", zh: "泡菜烤饭团", ja: "キムチ焼きおにぎり", vi: "Cơm nắm nướng kim chi" }, price: 70000, spicy: true }
] },
{ id: "nabe", name: { ko: "전골", en: "Hot Pot", zh: "火锅", ja: "鍋料理", vi: "Lẩu" }, note: { ko: "2인분부터 주문", en: "Order from 2 servings", zh: "2人份起点", ja: "2人前からご注文いただけます", vi: "Gọi từ 2 phần" }, items: [
  { name: { ko: "닭완자 전골", en: "Chicken Meatball Hot Pot (Tsukune Nabe)", zh: "鸡肉丸火锅", ja: "鶏団子鍋", vi: "Lẩu gà viên (Tori Dango Nabe)" }, desc: { ko: "2인분~", en: "From 2 servings", zh: "2人份起", ja: "2人前〜", vi: "Từ 2 phần" }, price: 500000 },
  { name: { ko: "닭 소금완자 전골", en: "Salt-flavored Chicken Meatball Hot Pot", zh: "盐味鸡肉丸火锅", ja: "鶏塩団子鍋", vi: "Lẩu gà viên vị muối" }, desc: { ko: "2인분~", en: "From 2 servings", zh: "2人份起", ja: "2人前〜", vi: "Từ 2 phần" }, price: 500000 },
  { name: { ko: "두부와 닭고기 찌개 전골", en: "Tofu and Chicken Jjigae Hot Pot", zh: "豆腐鸡肉泡菜锅", ja: "豆腐と鶏のチゲ鍋", vi: "Lẩu Jjigae đậu hũ và gà" }, desc: { ko: "2인분~", en: "From 2 servings", zh: "2人份起", ja: "2人前〜", vi: "Từ 2 phần" }, price: 500000 },
  { name: { ko: "전골 마무리(시메) 밥·라멘 추가", en: "Hot Pot Finish (Shime): Add Rice or Ramen", zh: "火锅收尾(〆) 加饭·拉面", ja: "〆 ご飯・ラーメン", vi: "Kết thúc lẩu (Shime): thêm cơm hoặc ramen" }, desc: { ko: "60,000~", en: "From 60,000", zh: "60,000起", ja: "60,000〜", vi: "Từ 60,000" }, price: 60000 }
] },
{ id: "lunch", name: { ko: "점심 세트", en: "Lunch Sets", zh: "午餐套餐", ja: "ランチセット", vi: "Set ăn trưa" }, note: { ko: "점심 세트 · 미니 샐러드·미소국·녹차 포함", en: "Lunch sets include mini salad, miso soup and green tea", zh: "午餐套餐 · 含迷你沙拉、味噌汤、绿茶", ja: "ランチセット・ミニサラダ、味噌汁、緑茶付き", vi: "Set ăn trưa, kèm salad mini, súp miso và trà xanh" }, items: [
  { name: { ko: "야키니쿠동 세트", en: "Yakiniku-don Set", zh: "烤肉盖饭套餐", ja: "焼肉丼セット", vi: "Set cơm thịt nướng Yakiniku" }, price: 200000 },
  { name: { ko: "오므라이스동 세트", en: "Omurice-don Set", zh: "蛋包饭盖饭套餐", ja: "オムライス丼セット", vi: "Set cơm trứng cuộn Omurice" }, price: 200000 },
  { name: { ko: "소스 치킨카츠동 세트", en: "Sauce Chicken Katsu-don Set", zh: "酱汁炸鸡排盖饭套餐", ja: "ソースチキンカツ丼セット", vi: "Set cơm gà chiên xù sốt" }, price: 200000 },
  { name: { ko: "야키토리동 세트", en: "Yakitori-don Set", zh: "烤鸡肉串盖饭套餐", ja: "焼鳥丼セット", vi: "Set cơm gà nướng Yakitori" }, price: 200000 },
  { name: { ko: "닭죽 세트", en: "Chicken Zosui Set", zh: "鸡肉杂炊粥套餐", ja: "鶏雑炊セット", vi: "Set cháo gà Zosui" }, price: 200000 },
  { name: { ko: "라멘 세트", en: "Ramen Set", zh: "拉面套餐", ja: "ラーメンセット", vi: "Set ramen" }, desc: { ko: "미소·간장, 밥 포함", en: "Miso or soy sauce, rice included", zh: "味噌或酱油，含米饭", ja: "味噌・醤油、ご飯付き", vi: "Vị miso hoặc shoyu, kèm cơm" }, price: 200000 },
  { name: { ko: "야키토리집 가라아게 세트", en: "Yakitori-ya Karaage Set", zh: "烤鸡肉串店炸鸡套餐", ja: "焼鳥屋の唐揚げ定食", vi: "Set gà chiên Karaage kiểu quán yakitori" }, price: 200000 },
  { name: { ko: "갈릭 가라아게 세트", en: "Garlic Karaage Set", zh: "蒜香炸鸡套餐", ja: "ガーリック唐揚げ定食", vi: "Set gà chiên Karaage tỏi" }, price: 200000 },
  { name: { ko: "매운 파 타츠타아게 세트", en: "Spicy Green Onion Tatsuta-age Set", zh: "葱辣竜田炸鸡套餐", ja: "ねぎ辛竜田揚げ定食", vi: "Set gà chiên Tatsuta-age hành cay" }, price: 200000, spicy: true },
  { name: { ko: "유린치 세트", en: "Yurinchi Set", zh: "油淋鸡套餐", ja: "油淋鶏定食", vi: "Set gà chiên sốt Yurinchi" }, price: 200000 },
  { name: { ko: "치킨 난반 세트", en: "Chicken Nanban Set", zh: "南蛮炸鸡套餐", ja: "チキン南蛮定食", vi: "Set gà Nanban" }, price: 200000 },
  { name: { ko: "스파이시 치즈 가라아게 세트", en: "Spicy Cheese Karaage Set", zh: "香辣芝士炸鸡套餐", ja: "スパイシーチーズ唐揚げ定食", vi: "Set gà chiên Karaage phô mai cay" }, price: 200000, spicy: true },
  { name: { ko: "치킨카츠 세트", en: "Chicken Katsu Set", zh: "炸鸡排套餐", ja: "チキンカツ定食", vi: "Set gà chiên xù Katsu" }, price: 200000 }
] },
{ id: "drink", name: { ko: "주류·음료", en: "Drinks", zh: "酒类·饮料", ja: "ドリンク", vi: "Đồ uống" }, note: { ko: "병은 1병, 샷은 1잔 가격", en: "Bottle price is per bottle, shot price is per glass", zh: "瓶装为每瓶价格，Shot为每杯价格", ja: "ボトルは1本、ショットは1杯の価格です", vi: "Giá chai tính theo 1 chai, giá shot tính theo 1 ly" }, items: [
  { name: { ko: "삿포로 생맥주", en: "Sapporo Draft Beer", zh: "札幌生啤", ja: "サッポロ生ビール", vi: "Bia tươi Sapporo" }, price: 70000, photo: "img/beer.jpg" },
  { name: { ko: "우롱하이", en: "Oolong Highball", zh: "乌龙烧酒", ja: "ウーロンハイ", vi: "Oolong Hai" }, desc: { ko: "소주+우롱차", en: "Shochu with oolong tea", zh: "烧酒加乌龙茶", ja: "焼酎のウーロン茶割り", vi: "Shochu pha trà ô long" }, price: 70000 },
  { name: { ko: "녹차와리", en: "Green Tea Wari", zh: "绿茶烧酒", ja: "緑茶割り", vi: "Ryokucha Wari" }, desc: { ko: "소주+녹차", en: "Shochu with green tea", zh: "烧酒加绿茶", ja: "焼酎の緑茶割り", vi: "Shochu pha trà xanh" }, price: 70000 },
  { name: { ko: "생레몬 사와", en: "Fresh Lemon Sour", zh: "鲜柠檬沙瓦", ja: "生レモンサワー", vi: "Sour chanh tươi" }, price: 90000 },
  { name: { ko: "우메보시 사와", en: "Umeboshi Sour", zh: "梅干沙瓦", ja: "梅干しサワー", vi: "Sour mơ muối Umeboshi" }, price: 90000 },
  { name: { ko: "초야 기슈 매실주", en: "Choya Kishu Plum Wine", zh: "Choya纪州梅酒", ja: "チョーヤ 紀州", vi: "Rượu mơ Choya Kishu" }, price: 120000, sizes: [["Shot", 120000], ["Btl", 990000]] },
  { name: { ko: "일본주 코시노이치", en: "Sake Koshi no Ichi", zh: "日本酒 越之一", ja: "越の一", vi: "Sake Koshi no Ichi" }, desc: { ko: "1홉 180ml", en: "1 go (180ml)", zh: "1合 180ml", ja: "1合 180ml", vi: "1 go (180ml)" }, price: 150000 },
  { name: { ko: "일본주 스이신", en: "Sake Suishin", zh: "日本酒 酔心", ja: "酔心", vi: "Sake Suishin" }, desc: { ko: "1홉 180ml", en: "1 go (180ml)", zh: "1合 180ml", ja: "1合 180ml", vi: "1 go (180ml)" }, price: 330000 },
  { name: { ko: "일본주 핫카이산", en: "Sake Hakkaisan", zh: "日本酒 八海山", ja: "八海山", vi: "Sake Hakkaisan" }, desc: { ko: "1홉 180ml", en: "1 go (180ml)", zh: "1合 180ml", ja: "1合 180ml", vi: "1 go (180ml)" }, price: 330000 },
  { name: { ko: "쇼치쿠바이 교토 준마이 후시미즈지타테", en: "Shochikubai Kyoto Junmai Fushimizu-jitate", zh: "松竹梅 京都纯米 伏水仕立", ja: "松竹梅 京都純米 伏水仕立て", vi: "Shochikubai Kyoto Junmai Fushimizu-jitate" }, price: 600000, sizes: [["300ml", 600000], ["1.8L", 2100000]] },
  { name: { ko: "쿠보타 센주", en: "Kubota Senju", zh: "久保田 千寿", ja: "久保田 千寿", vi: "Kubota Senju" }, desc: { ko: "1800ml", en: "1800ml", zh: "1800ml", ja: "1800ml", vi: "1800ml" }, price: 3300000 },
  { name: { ko: "닷사이 준마이다이긴조 45", en: "Dassai Junmai Daiginjo 45", zh: "獺祭 纯米大吟酿45", ja: "獺祭 純米大吟醸45", vi: "Dassai Junmai Daiginjo 45" }, desc: { ko: "1800ml", en: "1800ml", zh: "1800ml", ja: "1800ml", vi: "1800ml" }, price: 3600000 },
  { name: { ko: "쿠보타 만주", en: "Kubota Manju", zh: "久保田 萬寿", ja: "久保田 萬寿", vi: "Kubota Manju" }, desc: { ko: "1800ml", en: "1800ml", zh: "1800ml", ja: "1800ml", vi: "1800ml" }, price: 6500000 },
  { name: { ko: "쿠로키리시마 고구마 소주", en: "Kuro Kirishima Sweet Potato Shochu", zh: "黑雾岛 红薯烧酒", ja: "黒霧島", vi: "Shochu khoai lang Kuro Kirishima" }, price: 140000, sizes: [["Shot", 140000], ["Btl", 990000]] },
  { name: { ko: "아카루이노손 고구마 소주", en: "Akarui Noson Sweet Potato Shochu", zh: "明朗农村 红薯烧酒", ja: "明るい農村", vi: "Shochu khoai lang Akarui Noson" }, price: 150000, sizes: [["Shot", 150000], ["Btl", 1250000]] },
  { name: { ko: "이모 다이리쿠 고구마 소주", en: "Imo Tairiku Sweet Potato Shochu", zh: "芋 大陆 红薯烧酒", ja: "芋 大陸", vi: "Shochu khoai lang Imo Tairiku" }, price: 90000, sizes: [["Shot", 90000], ["Btl", 750000]] },
  { name: { ko: "간노코 보리 소주", en: "Kannoko Barley Shochu", zh: "かんのこ 大麦烧酒", ja: "かんのこ", vi: "Shochu lúa mạch Kannoko" }, price: 140000, sizes: [["Shot", 140000], ["Btl", 990000]] },
  { name: { ko: "무기 다이리쿠 보리 소주", en: "Mugi Tairiku Barley Shochu", zh: "麦 大陆 大麦烧酒", ja: "麦 大陸", vi: "Shochu lúa mạch Mugi Tairiku" }, price: 90000, sizes: [["Shot", 90000], ["Btl", 750000]] },
  { name: { ko: "잔파 아와모리", en: "Zanpa Awamori", zh: "残波 泡盛", ja: "残波 泡盛", vi: "Awamori Zanpa" }, price: 150000, sizes: [["Shot", 150000], ["Btl", 990000]] },
  { name: { ko: "위스키 산토리 가쿠", en: "Suntory Kaku Whisky", zh: "三得利角瓶威士忌", ja: "サントリー 角", vi: "Whisky Suntory Kaku" }, price: 150000, sizes: [["Shot", 150000], ["Btl", 1500000]] },
  { name: { ko: "위스키 잭 다니엘", en: "Jack Daniel's Whiskey", zh: "杰克丹尼威士忌", ja: "ジャックダニエル", vi: "Whiskey Jack Daniel's" }, price: 150000, sizes: [["Shot", 150000], ["Btl", 1500000]] },
  { name: { ko: "위스키 조니워커 블랙", en: "Johnnie Walker Black Label Whisky", zh: "尊尼获加黑牌威士忌", ja: "ジョニーウォーカー ブラック", vi: "Whisky Johnnie Walker Black Label" }, price: 150000, sizes: [["Shot", 150000], ["Btl", 1500000]] },
  { name: { ko: "코카콜라 / 코카콜라 제로", en: "Coca-Cola / Coca-Cola Zero", zh: "可口可乐 / 零度可乐", ja: "コカ・コーラ / ゼロ", vi: "Coca-Cola / Coca-Cola Zero" }, price: 40000 },
  { name: { ko: "우롱차", en: "Oolong Tea", zh: "乌龙茶", ja: "ウーロン茶", vi: "Trà ô long" }, price: 40000 },
  { name: { ko: "시즈오카 녹차", en: "Shizuoka Green Tea", zh: "静冈绿茶", ja: "静岡緑茶", vi: "Trà xanh Shizuoka" }, price: 45000 },
  { name: { ko: "오렌지 주스", en: "Orange Juice", zh: "橙汁", ja: "オレンジジュース", vi: "Nước cam" }, price: 45000 },
  { name: { ko: "레몬 주스", en: "Lemon Juice", zh: "柠檬汁", ja: "レモンジュース", vi: "Nước chanh" }, price: 45000 },
  { name: { ko: "소다", en: "Soda", zh: "苏打水", ja: "ソーダ", vi: "Soda" }, desc: { ko: "탄산수", en: "Sparkling water", zh: "气泡水", ja: "炭酸水", vi: "Nước có ga" }, price: 30000, photo: "img/soda.jpg" },
  { name: { ko: "생수", en: "Water", zh: "矿泉水", ja: "お水", vi: "Nước suối" }, price: 30000 }
] }
];
