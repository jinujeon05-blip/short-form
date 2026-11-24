// 피그윙 PIG WING KOREA BBQ 메뉴 데이터 — 출처: 구글 지도에 올라온 메뉴판 사진 7장(2026-11-24 수집)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// 메뉴판 두 판(테이프 스티커로 가격을 고친 새 판 / 옛 판)이 섞여 있어 가격은 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "피그윙", en: "PIG WING KOREA BBQ" },
  phone: "0973954319",
  address: "03N6 Nguyễn Cao, Võ Cường, Bắc Ninh",
  mapUrl: "https://www.google.com/maps/place/%ED%94%BC%EA%B7%B8%EC%9C%99+Korea+BBQ/@21.1733343,106.0573457,19z/data=!4m6!3m5!1s0x31350da879c4f0c9:0x33ee87c75dcaa7e4!8m2!3d21.1733343!4d106.0573457!16s%2Fg%2F11fst02s6q",
  wifi: null,
  hours: "10:00 – 23:00",
};

window.MENU = [
  {
    id: "sets",
    name: { ko: "셋트", en: "Sets", zh: "套餐", ja: "セット", vi: "Set" },
    items: [
      { name: { ko: "피그윙 숙성 셋트", en: "PigWing Aged Pork Set", zh: "PigWing 熟成猪肉套餐", ja: "ピッグウィング熟成セット", vi: "Set thịt ủ PigWing" }, desc: { ko: "베트남 1타 삼겹살 300g + 꽃목살 300g", en: "Vietnam's No.1 Pork Belly 300g + Pork Collar 300g", zh: "越南第一的五花肉300g + 梅花肉300g", ja: "ベトナムNo.1サムギョプサル300g + 豚肩ロース(コッモクサル)300g", vi: "Ba chỉ loại 1 300g + Nạc dăm 300g" }, price: 480000, tag: "best", photo: "img/set-aged.jpg" },
      { name: { ko: "피그윙 특수부위 셋트", en: "PigWing Special Cuts Set", zh: "PigWing 特殊部位套餐", ja: "ピッグウィング特殊部位セット", vi: "Set thịt ủ đặc biệt PIGWING" }, desc: { ko: "꼬들살·항정살·가브리살·뽈살 각 150g", en: "Crunchy Pork Neck (Kkodeulsal) · Pork Jowl · Pork Rib Cap (Gabrisal) · Pork Cheek, 150g each", zh: "脆颈肉·猪颈肉·里脊盖肉·猪脸肉 各150g", ja: "コドゥルサル・プルドゥンサル(豚トロ)・カブリサル・ホホ肉 各150g", vi: "Thịt gáy giòn, Nạc nọng, Thịt vai giòn, Thịt má — mỗi loại 150g" }, price: 600000 },
      { name: { ko: "피그윙 소고기 셋트", en: "PigWing Beef Set", zh: "PigWing 牛肉套餐", ja: "ピッグウィング牛肉セット", vi: "Set thịt bò PIGWING" }, desc: { ko: "소 등심살·생 소갈비·양념 소갈비 각 150g", en: "Beef Sirloin · Fresh Beef Short Rib · Marinated Beef Short Rib, 150g each", zh: "牛里脊·鲜牛排骨·腌制牛排骨 各150g", ja: "牛ロース・生カルビ・味付けカルビ 各150g", vi: "Lõi vai bò, Sườn bò tươi, Sườn bò tẩm gia vị — mỗi loại 150g" }, price: 790000 },
      { name: { ko: "미국산 소내창 셋트", en: "US Beef Intestine Set", zh: "美国产牛内脏套餐", ja: "アメリカ産牛ホルモンセット", vi: "Set lòng bò Mỹ" }, desc: { ko: "소곱창·소대창·소막창 각 150g", en: "Beef Small Intestine (Gopchang) · Beef Large Intestine · Beef Abomasum, 150g each", zh: "牛小肠·牛大肠·牛皱胃 各150g", ja: "牛小腸(コプチャン)・牛大腸(テチャン)・牛ギアラ(マクチャン) 各150g", vi: "Lòng non, lòng già, lòng khấu đuôi — mỗi loại 150g" }, price: 490000, photo: "img/gopchang-set.jpg" },
    ],
  },
  {
    id: "pork",
    name: { ko: "돼지고기", en: "Pork", zh: "猪肉", ja: "豚肉", vi: "Thịt lợn" },
    items: [
      { name: { ko: "삼겹살", en: "Pork Belly (Samgyeopsal)", zh: "五花肉 (Samgyeopsal)", ja: "サムギョプサル", vi: "Ba chỉ loại 1" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 120000, tag: "must", photo: "img/samgyeop.jpg" },
      { name: { ko: "꽃목살", en: "Pork Collar (Kkotmoksal)", zh: "梅花肉 (Kkotmoksal)", ja: "豚肩ロース(コッモクサル)", vi: "Nạc dăm" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 120000 },
      { name: { ko: "항정살", en: "Pork Jowl (Hangjeongsal)", zh: "猪颈肉 (Hangjeongsal)", ja: "豚トロ(ハンジョンサル)", vi: "Nạc nọng" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 150000 },
      { name: { ko: "가브리살", en: "Pork Rib Cap (Gabrisal)", zh: "里脊盖肉 (Gabrisal)", ja: "カブリサル(肩ロース周辺の希少部位)", vi: "Thịt vai giòn" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 150000 },
      { name: { ko: "꼬들살", en: "Crunchy Pork Neck (Kkodeulsal)", zh: "脆颈肉 (Kkodeulsal)", ja: "コドゥルサル(豚の首肉)", vi: "Thịt gáy giòn" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 150000 },
      { name: { ko: "뽈살", en: "Pork Cheek (Ppolsal)", zh: "猪脸肉 (Ppolsal)", ja: "豚ホホ肉(ポルサル)", vi: "Thịt má" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 150000 },
      { name: { ko: "양념 갈비", en: "Marinated Pork Ribs (Yangnyeom Galbi)", zh: "腌制猪排骨 (Yangnyeom Galbi)", ja: "味付け豚カルビ(ヤンニョムカルビ)", vi: "Sườn tẩm gia vị" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 180000 },
    ],
  },
  {
    id: "beef",
    name: { ko: "미국산 소고기", en: "US Beef", zh: "美国产牛肉", ja: "アメリカ産牛肉", vi: "Thịt bò Mỹ" },
    items: [
      { name: { ko: "소갈비살", en: "Beef Short Rib Meat (Fresh)", zh: "鲜牛排骨肉", ja: "牛カルビ(生)", vi: "Sườn bò tươi" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 250000 },
      { name: { ko: "양념 소갈비", en: "Marinated Beef Short Rib (Yangnyeom Galbi)", zh: "腌制牛排骨 (Yangnyeom Galbi)", ja: "味付け牛カルビ(ヤンニョムカルビ)", vi: "Sườn bò tẩm gia vị" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 290000 },
      { name: { ko: "소 등심살", en: "Beef Sirloin", zh: "牛里脊", ja: "牛ロース", vi: "Lõi vai bò" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 250000 },
      { name: { ko: "육회", en: "Beef Tartare (Yukhoe)", zh: "生拌牛肉 (Yukhoe)", ja: "ユッケ", vi: "Gỏi thịt bò tươi" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 290000 },
    ],
  },
  {
    id: "offal",
    name: { ko: "미국산 소내창", en: "US Beef Intestines", zh: "美国产牛内脏", ja: "アメリカ産牛ホルモン", vi: "Lòng bò Mỹ" },
    items: [
      { name: { ko: "소곱창", en: "Beef Small Intestine (Gopchang)", zh: "牛小肠 (Gopchang)", ja: "牛コプチャン(小腸)", vi: "Lòng non bò" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 180000 },
      { name: { ko: "소대창", en: "Beef Large Intestine (Daechang)", zh: "牛大肠 (Daechang)", ja: "牛テチャン(大腸)", vi: "Lòng già bò" }, desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 150000 },
    ],
  },
  {
    id: "meals",
    name: { ko: "식사·찌개", en: "Meals & Stews", zh: "主食与炖锅", ja: "お食事・チゲ", vi: "Món ăn kèm & lẩu" },
    items: [
      { name: { ko: "된장찌개 전골", en: "Doenjang Jjigae Hot Pot (Soybean Paste Stew)", zh: "大酱汤火锅 (Doenjang Jjigae)", ja: "テンジャンチゲ鍋", vi: "Lẩu canh tương đậu" }, price: 290000 },
      { name: { ko: "김치찌개 전골", en: "Kimchi Jjigae Hot Pot (Kimchi Stew)", zh: "泡菜汤火锅 (Kimchi Jjigae)", ja: "キムチチゲ鍋", vi: "Lẩu canh kim chi" }, price: 290000, photo: "img/kimchi-jjigae.jpg" },
      { name: { ko: "소곱창 전골", en: "Beef Small Intestine Hot Pot (Gopchang Jeongol)", zh: "牛小肠火锅 (Gopchang Jeongol)", ja: "牛コプチャン鍋(チョンゴル)", vi: "Lẩu lòng bò" }, price: 490000 },
      { name: { ko: "김치찌개 + 공기밥", en: "Kimchi Jjigae + Steamed Rice", zh: "泡菜汤 + 米饭", ja: "キムチチゲ + ご飯", vi: "Canh kim chi + Cơm trắng" }, price: 140000 },
      { name: { ko: "된장찌개 + 공기밥", en: "Doenjang Jjigae + Steamed Rice", zh: "大酱汤 + 米饭", ja: "テンジャンチゲ + ご飯", vi: "Canh tương đậu + Cơm trắng" }, price: 80000, photo: "img/doenjang-jjigae.jpg" },
      { name: { ko: "청국장 술밥", en: "Cheonggukjang (Fermented Soybean Stew)", zh: "清曲酱汤 (Cheonggukjang)", ja: "チョングッチャン(発酵大豆のチゲ)", vi: "Canh tương đậu đặc biệt" }, price: 80000 },
      { name: { ko: "김치말이국수", en: "Cold Kimchi Noodles (Kimchi Mari Guksu)", zh: "泡菜冷汤面 (Kimchi Mari Guksu)", ja: "キムチ冷やし麺(キムチマリグクス)", vi: "Mì lạnh kim chi" }, price: 80000 },
      { name: { ko: "비빔국수", en: "Spicy Mixed Noodles (Bibim Guksu)", zh: "拌面 (Bibim Guksu)", ja: "ビビム麺(ビビムグクス)", vi: "Mì trộn" }, price: 80000 },
      { name: { ko: "이태리 볶음밥", en: "Italian-style Fried Rice", zh: "意式炒饭", ja: "イタリア風チャーハン", vi: "Cơm rang Italy" }, price: 80000, photo: "img/italy-bokkeum.jpg" },
      { name: { ko: "계란찜", en: "Steamed Egg (Gyeran Jjim)", zh: "蒸蛋 (Gyeran Jjim)", ja: "ケランチム(韓国式茶碗蒸し)", vi: "Trứng hấp" }, price: 40000 },
      { name: { ko: "누룽지탕", en: "Scorched Rice Soup (Nurungji Tang)", zh: "锅巴汤 (Nurungji Tang)", ja: "おこげスープ(ヌルンジタン)", vi: "Canh cơm cháy" }, price: 40000 },
      { name: { ko: "공기밥", en: "Steamed Rice", zh: "米饭", ja: "ご飯", vi: "Cơm trắng" }, price: 20000 },
    ],
  },
  {
    id: "drinks",
    name: { ko: "주류·음료", en: "Alcohol & Drinks", zh: "酒类与饮料", ja: "お酒・ドリンク", vi: "Rượu bia & nước uống" },
    items: [
      { name: { ko: "참이슬", en: "Chamisul Soju", zh: "真露 Chamisul 烧酒", ja: "チャミスル", vi: "Soju Chamisul" }, price: 100000 },
      { name: { ko: "새로", en: "Saero Soju", zh: "Saero 烧酒", ja: "セロ", vi: "Soju Saero" }, price: 100000 },
      { name: { ko: "진로", en: "Jinro Soju", zh: "真露烧酒", ja: "ジンロ", vi: "Soju Jinro" }, price: 100000 },
      { name: { ko: "처음처럼", en: "Chum-Churum Soju", zh: "初饮初乐烧酒", ja: "チョウムチョロム", vi: "Soju Chum-Churum" }, price: 100000 },
      { name: { ko: "좋은데이", en: "Good Day Soju", zh: "Good Day 烧酒", ja: "チョウンデー", vi: "Soju Good Day" }, price: 80000 },
      { name: { ko: "보드카", en: "Vodka Hanoi", zh: "河内伏特加", ja: "ハノイ・ウォッカ", vi: "Vodka Hà Nội" }, price: 100000 },
      { name: { ko: "사이공 맥주", en: "Saigon Beer", zh: "西贡啤酒", ja: "サイゴンビール", vi: "Bia Sài Gòn" }, price: 50000 },
      { name: { ko: "타이거 맥주", en: "Tiger Beer", zh: "虎牌啤酒", ja: "タイガービール", vi: "Bia Tiger" }, price: 50000 },
      { name: { ko: "음료수", en: "Soft drink", zh: "饮料", ja: "ソフトドリンク", vi: "Nước ngọt" }, desc: { ko: "코카콜라·환타·스프라이트", en: "Coca-Cola · Fanta · Sprite", zh: "可口可乐·芬达·雪碧", ja: "コカ・コーラ・ファンタ・スプライト", vi: "Coca-Cola · Fanta · Sprite" }, price: 20000 },
    ],
  },
];
