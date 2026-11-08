// 스마일회관 SMILE 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(수집 2026-11-08, menu_01~17), 번호는 메뉴판 번호(08~10번은 사진 없음)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만 — 정사각형이면 양옆 흰 여백)
// 메뉴판 사진끼리 가격이 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "스마일회관", en: "SMILE" },
  phone: "0366018000", // 구글 지도. 간판에는 0387030022 (docs/todo.md)
  address: "19 Ngõ 179 Đình Thôn, Mỹ Đình, Nam Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:30 – 14:00 · 16:00 – 23:00", // 구글 지도 '오전 10:30~오후 2:00 / 오후 4:00~11:00' (휴식 시간 있음)
};

window.MENU = [
  {
    id: "combo",
    name: { ko: "모듬 구이", en: "Grilled Pork Combos", zh: "拼盘烤肉", ja: "盛り合わせ焼き", vi: "Combo thịt nướng" },
    items: [
      { name: { ko: "스마일 모듬", en: "Smile Combo", zh: "微笑拼盘", ja: "スマイル盛り合わせ", vi: "Combo Smile" },
        desc: { ko: "400g · 2~3인분 · 냉삼 + 대패 + 천겹살 + 벌집껍데기", en: "400g · Serves 2–3 · Naengsam (frozen pork belly) + Daepae (thin-sliced pork belly) + Cheongyeopsal (pork jowl) + Beoljip Kkeopdegi (honeycomb-cut pork skin)", zh: "400g · 2~3人份 · 冷冻五花肉 + 薄切五花肉 + 猪颈肉 + 蜂窝猪皮", ja: "400g · 2~3人前 · ネンサム(冷凍豚バラ)+ テペ(薄切り豚バラ)+ チョンギョプサル(豚トロ)+ ハチの巣カットの豚皮", vi: "400g · 2–3 người · Ba chỉ đông lạnh + Ba chỉ thái lát + Thịt heo ngàn lớp + Da heo" },
        price: 490000, photo: "img/smile-set.jpg" },
      { name: { ko: "새마을 모듬", en: "Saemaeul Combo", zh: "新村拼盘", ja: "セマウル盛り合わせ", vi: "Combo Saemaeul" },
        desc: { ko: "700g · 3~4인분 · 냉삼 + 대패 + 천겹살 + 쪽갈비", en: "700g · Serves 3–4 · Naengsam (frozen pork belly) + Daepae (thin-sliced pork belly) + Cheongyeopsal (pork jowl) + Jjokgalbi (pork ribs)", zh: "700g · 3~4人份 · 冷冻五花肉 + 薄切五花肉 + 猪颈肉 + 猪排骨", ja: "700g · 3~4人前 · ネンサム(冷凍豚バラ)+ テペ(薄切り豚バラ)+ チョンギョプサル(豚トロ)+ チョッカルビ(豚スペアリブ)", vi: "700g · 3–4 người · Ba chỉ đông lạnh + Ba chỉ thái lát + Thịt heo ngàn lớp + Sườn heo" },
        price: 790000 },
      { name: { ko: "동네 이장 세트", en: "Village Chief Set (Dongne Ijang)", zh: "村长套餐", ja: "村長セット(トンネ・イジャン)", vi: "Combo Ijang" },
        desc: { ko: "400g · 3% 뒷고기 + 생 소금구이 + 천겹살", en: "400g · 3% Dwitgogi (special pork cuts) + Fresh salt-grilled pork + Cheongyeopsal (pork jowl)", zh: "400g · 3%猪特殊部位 + 鲜盐烤猪肉 + 猪颈肉", ja: "400g · 3% トゥィッコギ(豚の希少部位)+ 生塩焼き + チョンギョプサル(豚トロ)", vi: "400g · Thịt heo đặc biệt 3% + Thịt heo nướng muối + Thịt heo ngàn lớp" },
        price: 590000 },
    ],
  },
  {
    id: "grill",
    name: { ko: "단품 구이", en: "Grilled Pork (À la carte)", zh: "单点烤肉", ja: "単品焼き", vi: "Thịt nướng gọi lẻ" },
    items: [
      { name: { ko: "스마일 생 소금구이", en: "Smile Salt-Grilled Fresh Pork", zh: "微笑鲜盐烤猪肉", ja: "スマイル生塩焼き", vi: "Smile Thịt heo nướng muối" },
        desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 130000 },
      { name: { ko: "스마일 대패 로스구이", en: "Smile Daepae (Thin-Sliced Pork Belly)", zh: "微笑薄切五花肉", ja: "スマイル・テペ(薄切り豚バラ焼き)", vi: "Smile Thịt ba chỉ thái lát" },
        desc: { ko: "150g", en: "150g", zh: "150g", ja: "150g", vi: "150g" }, price: 130000, photo: "img/daepae.jpg" },
      { name: { ko: "-45° 정석 특 냉삼", en: "-45° Special Naengsam (Frozen Pork Belly)", zh: "-45°特级冷冻五花肉", ja: "-45° 特製ネンサム(冷凍豚バラ)", vi: "Thịt ba chỉ đông lạnh đặc biệt -45°" },
        desc: { ko: "150g · 냉동 삼겹살", en: "150g · Frozen pork belly", zh: "150g · 冷冻五花肉", ja: "150g · 冷凍豚バラ", vi: "150g" }, price: 130000, photo: "img/naengsam.jpg" },
      { name: { ko: "천겹살 (항정살)", en: "Cheongyeopsal (Pork Jowl)", zh: "猪颈肉(项脊肉)", ja: "チョンギョプサル(豚トロ)", vi: "Thịt heo ngàn lớp (Thịt má heo)" },
        desc: { ko: "120g", en: "120g", zh: "120g", ja: "120g", vi: "120g" }, price: 180000 },
      { name: { ko: "참숯 석쇠 간장 불고기", en: "Charcoal-Grilled Soy Pork Bulgogi", zh: "炭火酱油烤猪肉", ja: "炭火網焼き醤油プルコギ(豚)", vi: "Thịt heo nướng than hoa sốt tương" },
        desc: { ko: "300g", en: "300g", zh: "300g", ja: "300g", vi: "300g" }, price: 280000 },
      { name: { ko: "정석 얼음 차돌박이", en: "Chadolbaegi (Thin-Sliced Beef Brisket)", zh: "冰镇牛胸肉片", ja: "チャドルバギ(薄切り牛肩バラ)", vi: "Thịt gầu bò" },
        desc: { ko: "120g", en: "120g", zh: "120g", ja: "120g", vi: "120g" }, price: 250000 },
    ],
  },
  {
    id: "dish",
    name: { ko: "요리 · 식사", en: "Dishes & Meals", zh: "料理 · 主食", ja: "料理・食事", vi: "Món ăn · Cơm mì" },
    items: [
      { name: { ko: "특별한 육회", en: "Special Yukhoe (Korean Beef Tartare)", zh: "特制生拌牛肉", ja: "特製ユッケ", vi: "Gỏi bò đặc biệt" }, price: 200000, photo: "img/yukhoe.jpg" },
      { name: { ko: "조개 흰 칼국수", en: "Clam Kalguksu (Non-Spicy Knife-Cut Noodle Soup)", zh: "蛤蜊刀削面汤(不辣)", ja: "あさりのカルグクス(辛くない)", vi: "Mì hải sản không cay" },
        desc: { ko: "S 후식용 · L 보통", en: "S: small, for after the meat · L: regular bowl", zh: "S:小份,烤肉后当甜点 · L:普通一碗", ja: "S:お肉の後のデザート用の小盛り · L:通常の一人前", vi: "S suất nhỏ · L suất lớn" },
        sizes: [["S", 80000], ["L", 160000]] },
      { name: { ko: "된장술밥", en: "Doenjang Sulbap (Rice Simmered in Soybean Paste Stew)", zh: "大酱泡饭锅", ja: "テンジャンスルバプ(味噌チゲご飯)", vi: "Cơm niêu Smile" }, price: 150000 },
      { name: { ko: "된장찌개", en: "Doenjang Jjigae (Soybean Paste Stew)", zh: "大酱汤", ja: "テンジャンチゲ(韓国味噌鍋)", vi: "Canh tương đậu" }, price: 160000, photo: "img/doenjang.jpg" },
      { name: { ko: "물냉면", en: "Mul Naengmyeon (Cold Noodles in Broth)", zh: "冷面(汤)", ja: "ムルネンミョン(冷麺)", vi: "Mì lạnh nước" },
        desc: { ko: "S 후식용 · L 보통", en: "S: small, for after the meat · L: regular bowl", zh: "S:小份,烤肉后当甜点 · L:普通一碗", ja: "S:お肉の後のデザート用の小盛り · L:通常の一人前", vi: "S suất nhỏ · L suất lớn" },
        sizes: [["S", 80000], ["L", 160000]] },
      { name: { ko: "비빔냉면", en: "Bibim Naengmyeon (Spicy Mixed Cold Noodles)", zh: "拌冷面(辣)", ja: "ビビンネンミョン(辛い和え冷麺)", vi: "Mì lạnh trộn cay" },
        desc: { ko: "S 후식용 · L 보통", en: "S: small, for after the meat · L: regular bowl", zh: "S:小份,烤肉后当甜点 · L:普通一碗", ja: "S:お肉の後のデザート用の小盛り · L:通常の一人前", vi: "S suất nhỏ · L suất lớn" },
        sizes: [["S", 80000], ["L", 160000]], spicy: true },
      { name: { ko: "돌판 치즈 볶음밥", en: "Cheese Fried Rice on a Stone Plate", zh: "石板芝士炒饭", ja: "石板チーズチャーハン", vi: "Cơm rang phô mai chảo đá" },
        desc: { ko: "고기를 드신 뒤 돌판에 볶아 드려요", en: "Order after your meat; we stir-fry it on the stone plate", zh: "吃完烤肉后点,在石板上为您炒制", ja: "お肉の後に注文すると、石板で炒めてお出しします", vi: "Gọi sau khi ăn thịt, rang trên chảo đá" },
        price: 50000, photo: "img/bokkeumbap.jpg" },
    ],
  },
  {
    id: "side",
    name: { ko: "추가", en: "Extras", zh: "加点", ja: "追加", vi: "Gọi thêm" },
    items: [
      { name: { ko: "소면 비빔 추가", en: "Extra Somyeon Bibim (Spicy Mixed Thin Noodles)", zh: "加点辣拌细面", ja: "ソミョンビビン追加(辛い和え素麺)", vi: "Thêm mì trộn cay" }, price: 40000, spicy: true },
      { name: { ko: "구워 먹는 치즈", en: "Grilling Cheese", zh: "烤芝士", ja: "焼きチーズ", vi: "Phô mai nướng" }, price: 60000 },
    ],
  },
  {
    id: "lunch",
    name: { ko: "점심 특선", en: "Lunch Special", zh: "午餐特惠", ja: "ランチ特選", vi: "Bữa trưa đặc biệt" },
    note: { ko: "월~금 점심만 · 부가세 별도", en: "Mon–Fri lunch only · VAT not included", zh: "仅限周一至周五午餐 · 不含增值税", ja: "月〜金のランチのみ · 税別", vi: "Áp dụng từ thứ Hai đến thứ Sáu, buổi trưa · Giá chưa bao gồm thuế" },
    items: [
      { name: { ko: "특별한 점심 특선", en: "Special Lunch Set", zh: "特色午餐套餐", ja: "特別ランチセット", vi: "Bữa trưa đặc biệt" },
        desc: { ko: "2인 냉동 180g · 3인 240g · 4인 320g + 청국장 + 곁들임 + 누룽지탕", en: "Frozen pork: 180g for 2 · 240g for 3 · 320g for 4 + Cheonggukjang (fermented soybean stew) + side dishes + Nurungji-tang (scorched rice soup)", zh: "冷冻猪肉:2人180g · 3人240g · 4人320g + 清曲酱汤 + 小菜 + 锅巴汤", ja: "冷凍豚肉:2人前180g · 3人前240g · 4人前320g + チョングクチャン(発酵大豆チゲ)+ おかず + ヌルンジタン(おこげスープ)", vi: "Suất 2 người: thịt heo đông lạnh 180g · 3 người: 240g · 4 người: 320g + canh tương đậu lên men + panchan + súp cơm cháy" },
        price: 130000 },
    ],
  },
];
