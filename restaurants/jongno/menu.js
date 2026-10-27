// 종로포차 JONGRO POCHA (Nhà hàng Jongno Pocha, Đình Thôn, Hà Nội) 메뉴 데이터
// 출처: 구글 지도 메뉴판 사진 1장(사진 수집기 2026-10-27, menu_01.jpg). 가격 단위: VND
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시
// 요리 사진은 없음(구글 지도에 음식 사진 0장, 메뉴판 속 그림은 잘라 쓰지 않음)
window.RESTAURANT = {
  brand: { ko: "종로포차", en: "JONGRO POCHA" },
  phone: "098 392 0600",
  address: "44 ngõ 39/70 Đình Thôn, Từ Liêm, Hà Nội",
  wifi: null,
};

window.MENU = [
  {
    id: "skewer",
    name: { ko: "꼬치류", en: "Skewers", zh: "串烧", ja: "串焼き", vi: "Xiên nướng" },
    items: [
      { price: 120000, name: { ko: "닭꼬치", en: "Chicken Skewers", zh: "鸡肉串", ja: "鶏串", vi: "Xiên gà nướng" } },
      { price: 120000, name: { ko: "염통꼬치", en: "Chicken Heart Skewers", zh: "鸡心串", ja: "ハツ串", vi: "Xiên tim gà nướng" } },
      { price: 140000, name: { ko: "삼겹팽이꼬치", en: "Pork Belly Enoki Skewers", zh: "五花肉金针菇卷串", ja: "豚バラえのき巻き串", vi: "Xiên ba chỉ cuộn nấm kim châm" },
        desc: { ko: "삼겹살로 팽이버섯을 말아 구운 꼬치", en: "Enoki mushrooms wrapped in pork belly and grilled", zh: "用五花肉卷金针菇烤制的串", ja: "豚バラ肉でえのき茸を巻いて焼いた串", vi: "Nấm kim châm cuộn thịt ba chỉ nướng" } },
    ],
  },
  {
    id: "stew",
    name: { ko: "탕류", en: "Soups & Stews", zh: "汤锅类", ja: "鍋・スープ類", vi: "Món lẩu · canh" },
    items: [
      { price: 230000, name: { ko: "오뎅탕", en: "Fish Cake Soup (Odeng-tang)", zh: "鱼饼汤 (Odeng-tang)", ja: "おでん鍋(オデンタン)", vi: "Lẩu chả cá Hàn Quốc (Odeng)" } },
      { price: 300000, name: { ko: "홍합탕", en: "Mussel Soup", zh: "青口贝汤", ja: "ムール貝のスープ", vi: "Canh vẹm" } },
      { price: 300000, spicy: true, name: { ko: "순살닭도리탕", en: "Boneless Spicy Braised Chicken (Dakdoritang)", zh: "无骨辣炖鸡 (Dakdoritang)", ja: "骨なしタットリタン(鶏の辛い煮込み)", vi: "Gà om cay không xương (Dakdoritang)" } },
      { price: 350000, name: { ko: "동태탕", en: "Spicy Pollock Stew (Dongtae-tang)", zh: "冻明太鱼辣汤 (Dongtae-tang)", ja: "トンテタン(冷凍スケトウダラの辛い鍋)", vi: "Canh cá minh thái cay (Dongtae-tang)" } },
    ],
  },
  {
    id: "stirfry",
    name: { ko: "볶음류", en: "Stir-fries", zh: "炒菜类", ja: "炒め物", vi: "Món xào" },
    items: [
      { price: 180000, name: { ko: "닭똥집 마늘볶음", en: "Garlic Stir-fried Chicken Gizzards", zh: "蒜香炒鸡胗", ja: "砂肝のにんにく炒め", vi: "Mề gà xào tỏi" } },
      { price: 300000, spicy: true, name: { ko: "쭈꾸미볶음", en: "Spicy Stir-fried Baby Octopus (Jjukkumi)", zh: "辣炒小章鱼 (Jjukkumi)", ja: "ジュクミ(小ダコ)の辛い炒め", vi: "Bạch tuộc nhỏ xào cay (Jjukkumi)" } },
      { price: 350000, spicy: true, name: { ko: "낙지볶음", en: "Spicy Stir-fried Long-arm Octopus (Nakji)", zh: "辣炒长腕小章鱼 (Nakji)", ja: "ナクチ(手長ダコ)の辛い炒め", vi: "Bạch tuộc Nakji xào cay" } },
      { price: 250000, spicy: true, name: { ko: "제육볶음", en: "Spicy Stir-fried Pork (Jeyuk)", zh: "辣炒猪肉 (Jeyuk)", ja: "豚肉のピリ辛炒め(ジェユク)", vi: "Thịt heo xào cay (Jeyuk)" } },
      { price: 200000, name: { ko: "소시지야채볶음", en: "Sausage & Vegetable Stir-fry", zh: "香肠炒蔬菜", ja: "ソーセージと野菜炒め", vi: "Xúc xích xào rau củ" } },
    ],
  },
  {
    id: "grill",
    name: { ko: "구이 · 직화류", en: "Grilled Snacks", zh: "烧烤类", ja: "焼き物・炙り", vi: "Món nướng" },
    items: [
      { price: 180000, name: { ko: "쥐포 + 땅콩", en: "Grilled Dried Filefish + Peanuts", zh: "烤鱼片 + 花生", ja: "カワハギ干物(ジュイポ) + ピーナッツ", vi: "Khô cá chỉ vàng + đậu phộng" } },
      { price: 230000, name: { ko: "마른오징어 + 땅콩", en: "Grilled Dried Squid + Peanuts", zh: "烤鱿鱼干 + 花生", ja: "焼きするめ + ピーナッツ", vi: "Mực khô nướng + đậu phộng" } },
      { price: 250000, name: { ko: "먹태 + 땅콩", en: "Half-dried Pollock (Meoktae) + Peanuts", zh: "半干明太鱼 (Meoktae) + 花生", ja: "半干しスケトウダラ(モクテ) + ピーナッツ", vi: "Cá minh thái bán khô (Meoktae) + đậu phộng" } },
    ],
  },
  {
    id: "jeon",
    name: { ko: "전 · 만두류", en: "Pancakes & Dumplings", zh: "煎饼·饺子类", ja: "チヂミ・餃子類", vi: "Bánh kếp · Mandu" },
    items: [
      { price: 150000, name: { ko: "새우부추전", en: "Shrimp & Chive Pancake", zh: "虾仁韭菜煎饼", ja: "エビとニラのチヂミ", vi: "Bánh kếp Hàn Quốc tôm hẹ" } },
      { price: 200000, name: { ko: "삼겹살 김치전", en: "Pork Belly Kimchi Pancake", zh: "五花肉泡菜煎饼", ja: "豚バラキムチチヂミ", vi: "Bánh kếp kim chi thịt ba chỉ" } },
      { price: 200000, name: { ko: "비빔만두", en: "Fried Dumplings in Sweet-Spicy Sauce (Bibim Mandu)", zh: "酸辣拌煎饺 (Bibim Mandu)", ja: "揚げ餃子の甘酸っぱ辛い和え(ビビンマンドゥ)", vi: "Mandu chiên trộn chua cay (Bibim Mandu)" } },
    ],
  },
  {
    id: "fried",
    name: { ko: "튀김류", en: "Fried Dishes", zh: "炸物类", ja: "揚げ物", vi: "Món chiên" },
    items: [
      { price: 200000, name: { ko: "모듬튀김", en: "Assorted Fried Platter", zh: "综合炸物拼盘", ja: "揚げ物盛り合わせ", vi: "Chiên thập cẩm" } },
      { price: 250000, name: { ko: "순살치킨", en: "Boneless Fried Chicken", zh: "无骨炸鸡", ja: "骨なしフライドチキン", vi: "Gà rán không xương" } },
      { price: 150000, name: { ko: "돈까스", en: "Pork Cutlet (Donkatsu)", zh: "炸猪排 (Donkatsu)", ja: "とんかつ(ドンカス)", vi: "Thịt heo chiên xù (Donkatsu)" } },
    ],
  },
  {
    id: "pocha",
    name: { ko: "포차메뉴", en: "Pocha Menu", zh: "布帐马车小吃", ja: "ポチャ(屋台)メニュー", vi: "Món nhắm Pocha" },
    items: [
      { price: 300000, spicy: true, name: { ko: "국물닭발", en: "Spicy Chicken Feet Soup", zh: "带汤辣鸡爪", ja: "汁ありタッパル(辛い鶏の足)", vi: "Chân gà cay nước" } },
      { price: 100000, spicy: true, name: { ko: "신라면", en: "Shin Ramyun (Spicy Instant Noodles)", zh: "辛拉面", ja: "辛ラーメン", vi: "Mì cay Shin Ramyun" } },
      { price: 150000, name: { ko: "두부김치", en: "Tofu with Stir-fried Kimchi", zh: "豆腐配炒泡菜", ja: "豆腐と炒めキムチ", vi: "Đậu hũ ăn kèm kim chi xào" } },
      { price: 150000, name: { ko: "계란말이", en: "Rolled Omelet (Gyeran-mari)", zh: "韩式鸡蛋卷", ja: "韓国風卵焼き(ケランマリ)", vi: "Trứng cuộn Hàn Quốc" } },
      { price: 250000, name: { ko: "계절과일", en: "Seasonal Fruit Plate", zh: "时令水果拼盘", ja: "季節のフルーツ盛り合わせ", vi: "Đĩa trái cây theo mùa" } },
      { price: 250000, name: { ko: "과일화채", en: "Fruit Punch (Hwachae)", zh: "韩式水果冷饮 (Hwachae)", ja: "フルーツ・ファチェ(冷たいフルーツポンチ)", vi: "Hwachae trái cây (nước trái cây lạnh)" } },
      { price: 150000, name: { ko: "콘치즈", en: "Corn Cheese", zh: "芝士焗玉米", ja: "コーンチーズ", vi: "Bắp phô mai nướng" } },
      { price: 150000, name: { ko: "황도", en: "Yellow Peach", zh: "黄桃", ja: "黄桃", vi: "Đào vàng" },
        desc: { ko: "황도 복숭아 통조림", en: "Canned yellow peaches", zh: "黄桃罐头", ja: "黄桃の缶詰", vi: "Đào vàng đóng hộp" } },
    ],
  },
];
