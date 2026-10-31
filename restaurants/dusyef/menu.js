// 두셰프의 돈가스&마우 (Two Chefs Tonkatsu & Mau) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진(2026-10-31 수집, 올린 날짜 미상), 가격이 다르면 높은 쪽
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "두셰프의 돈가스&마우", en: "Two Chefs Tonkatsu & Mau" },
  phone: "033 549 1733",
  address: "B004, The Manor, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:30 – 22:00", // 구글 지도(2026-10-31)
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ ...(price != null ? { price } : {}), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const sz = (sizes, photo, ko, en, zh, ja, vi, x = {}) => ({ sizes, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

window.MENU = [
  {
    id: "tonkatsu",
    name: T("돈가스 & 롤", "Tonkatsu & Rolls", "炸猪排 & 寿司卷", "とんかつ＆ロール", "Tonkatsu & Cơm cuộn"),
    note: T("모든 가격 VAT 포함(일부 메뉴판은 VAT 별도 표기)", "Prices include VAT (some menus list VAT separately)", "价格含VAT（部分菜单标注VAT另计）", "価格はVAT込み（一部のメニューはVAT別表記）", "Giá đã gồm VAT (một số menu ghi chưa gồm VAT)"),
    items: [
      sz([["M", 140000], ["L", 200000]], "tonkatsu", "두셰프 돈가스", "Two Chefs Tonkatsu", "双厨炸猪排", "ツーシェフ とんかつ", "Thịt heo chiên xù Two Chefs", { tag: "must" }),
      sz([["M", 150000], ["L", 210000]], null, "두셰프 고추돈가스", "Two Chefs Spicy Chili Tonkatsu", "双厨辣椒炸猪排", "ツーシェフ 唐辛子とんかつ", "Thịt heo chiên xù Two Chefs ớt cay", { spicy: true }),
      it(160000, null, "카레 돈가스", "Curry Tonkatsu (with rice)", "咖喱炸猪排（配米饭）", "カレーとんかつ（ご飯付き）", "Cơm cà ri + thịt heo chiên xù"),
      it(210000, null, "치즈 돈가스 & 롤", "Cheese Tonkatsu & Rolls", "芝士炸猪排 & 寿司卷", "チーズとんかつ＆ロール", "Thịt heo chiên xù phô mai & cơm cuộn"),
      it(195000, null, "두셰프 일식돈가스 & 롤", "Japanese-style Tonkatsu & Rolls", "双厨日式炸猪排 & 寿司卷", "ツーシェフ 日式とんかつ＆ロール", "Thịt heo chiên xù kiểu Nhật & cơm cuộn"),
      it(220000, null, "고구마치즈 돈가스 & 롤", "Sweet Potato Cheese Tonkatsu & Rolls", "地瓜芝士炸猪排 & 寿司卷", "さつまいもチーズとんかつ＆ロール", "Thịt heo chiên xù phô mai khoai lang & cơm cuộn"),
      it(200000, "shrimp-tonkatsu", "새우튀김 돈가스 & 롤", "Fried Shrimp Tonkatsu & Rolls", "炸虾猪排 & 寿司卷", "エビフライとんかつ＆ロール", "Thịt heo tôm chiên xù & cơm cuộn"),
      it(210000, null, "치즈 퐁듀 돈가스", "Cheese Fondue Tonkatsu", "芝士火锅炸猪排", "チーズフォンデュとんかつ", "Thịt heo chiên xù phô mai fondue"),
      it(120000, null, "돈가스 롤 9P", "Tonkatsu Rolls (9 pcs)", "炸猪排寿司卷（9块）", "とんかつロール（9個）", "Cơm cuộn tonkatsu 9 miếng"),
      it(130000, null, "새우튀김 롤 9P", "Fried Shrimp Rolls (9 pcs)", "炸虾寿司卷（9块）", "エビフライロール（9個）", "Cơm cuộn tôm chiên 9 miếng"),
    ],
  },
  {
    id: "set",
    name: T("돈가스 세트", "Tonkatsu Sets", "炸猪排套餐", "とんかつセット", "Set Tonkatsu"),
    note: T("시그니처 세트 5% 할인 · 패밀리 세트 10% 할인(선택한 메뉴 합계 기준, 피자 서비스)", "Signature Set 5% off · Family Set 10% off (on the total of chosen items, free pizza)", "招牌套餐9.5折 · 家庭套餐9折（按所选菜品合计，赠送披萨）", "シグネチャーセット5%割引・ファミリーセット10%割引（選択メニュー合計、ピザサービス）", "Set Signature giảm 5% · Set Family giảm 10% (tính trên tổng món chọn, tặng pizza)"),
    items: [
      it(160000, null, "세트1 · 떡볶이 + 돈가스 1장", "Set 1 · Tteokbokki + 1 Tonkatsu", "套餐1 · 炒年糕 + 炸猪排1块", "セット1・トッポギ＋とんかつ1枚", "Set 1 · Tokbokki + 1 miếng tonkatsu"),
      it(210000, null, "세트2 · 냉모밀 + 돈가스 1장", "Set 2 · Cold Soba + 1 Tonkatsu", "套餐2 · 冷荞麦面 + 炸猪排1块", "セット2・冷たいそば＋とんかつ1枚", "Set 2 · Mì soba lạnh + 1 miếng tonkatsu"),
      it(210000, null, "세트3 · 비빔모밀 or 쫄면 + 돈가스 1장", "Set 3 · Spicy Mixed Soba or Jjolmyeon + 1 Tonkatsu", "套餐3 · 拌荞麦面或辣拌面 + 炸猪排1块", "セット3・ビビンそばまたはチョルミョン＋とんかつ1枚", "Set 3 · Mì soba trộn hoặc mì jjolmyeon + 1 miếng tonkatsu", { spicy: true }),
      it(220000, null, "세트4 · 마약우동 + 돈가스 1장", "Set 4 · Addictive Udon + 1 Tonkatsu", "套餐4 · 上瘾乌冬 + 炸猪排1块", "セット4・マヤクうどん＋とんかつ1枚", "Set 4 · Mì udon gây nghiện + 1 miếng tonkatsu"),
      it(220000, null, "세트5 · 해물우동 + 돈가스 1장", "Set 5 · Seafood Udon + 1 Tonkatsu", "套餐5 · 海鲜乌冬 + 炸猪排1块", "セット5・海鮮うどん＋とんかつ1枚", "Set 5 · Mì udon hải sản + 1 miếng tonkatsu"),
      it(220000, null, "세트6 · 꽃게어묵우동 + 돈가스 1장", "Set 6 · Crab Fish-cake Udon + 1 Tonkatsu", "套餐6 · 花蟹鱼糕乌冬 + 炸猪排1块", "セット6・カニ入りおでんうどん＋とんかつ1枚", "Set 6 · Mì udon chả cá ghẹ + 1 miếng tonkatsu"),
      it(220000, null, "세트7 · 스파게티 + 돈가스 1장", "Set 7 · Spaghetti + 1 Tonkatsu", "套餐7 · 意面 + 炸猪排1块", "セット7・スパゲッティ＋とんかつ1枚", "Set 7 · Mì spaghetti + 1 miếng tonkatsu"),
      it(240000, null, "세트8 · 해물볶음우동 + 돈가스 1장", "Set 8 · Seafood Stir-fried Udon + 1 Tonkatsu", "套餐8 · 海鲜炒乌冬 + 炸猪排1块", "セット8・海鮮焼きうどん＋とんかつ1枚", "Set 8 · Udon xào hải sản + 1 miếng tonkatsu"),
      it(220000, null, "볶음우동 돈가스", "Stir-fried Noodles + Tonkatsu", "炒面 + 炸猪排", "焼きそば＋とんかつ", "Mì xào + thịt heo chiên xù"),
    ],
  },
  {
    id: "noodle",
    name: T("누들", "Noodles", "面类", "麺類", "Mì"),
    items: [
      it(200000, "cheese-udon", "치즈땡초 볶음우동", "Cheese & Chili Stir-fried Udon", "芝士辣椒炒乌冬", "チーズ唐辛子焼きうどん", "Udon xào phô mai ớt cay", { tag: "best", spicy: true }),
      it(195000, null, "눈꽃 볶음우동", "Snowy Cheese Spicy Stir-fried Udon", "雪花芝士辣炒乌冬", "雪花チーズ辛口焼きうどん", "Mì udon cay xào phô mai bào (tuyết)", { spicy: true }),
      it(180000, null, "해물 볶음우동", "Seafood Stir-fried Udon", "海鲜炒乌冬", "海鮮焼きうどん", "Udon xào hải sản"),
      it(160000, null, "마약 우동", "Addictive Udon (Mayak Udon)", "上瘾乌冬", "マヤクうどん", "Mì udon gây nghiện"),
      it(160000, null, "해물 우동", "Seafood Udon", "海鲜乌冬", "海鮮うどん", "Mì udon hải sản"),
      it(160000, null, "꽃게어묵 우동", "Crab Fish-cake Udon", "花蟹鱼糕乌冬", "カニ入りおでんうどん", "Mì udon chả cá ghẹ"),
      it(160000, null, "미트토마토 스파게티", "Meat Tomato Spaghetti", "肉酱番茄意面", "ミートトマトスパゲッティ", "Mì spaghetti thịt sốt cà chua"),
      it(150000, null, "냉모밀", "Cold Soba (Naengmomil)", "冷荞麦面", "冷やしそば", "Mì soba lạnh"),
      it(150000, null, "비빔모밀 or 쫄면", "Spicy Mixed Soba or Jjolmyeon", "拌荞麦面或辣拌面", "ビビンそばまたはチョルミョン", "Mì soba trộn hoặc mì jjolmyeon", { spicy: true }),
    ],
  },
  {
    id: "chicken",
    name: T("치킨 & 탕수육", "Chicken & Tangsuyuk", "炸鸡 & 糖醋肉", "チキン＆タンスユク", "Gà rán & Tangsuyuk"),
    items: [
      sz([["S", 80000], ["M", 160000]], "fried-chicken", "후라이드 순살치킨", "Boneless Fried Chicken", "无骨炸鸡", "骨なしフライドチキン", "Gà không xương không sốt", { tag: "best" }),
      sz([["S", 90000], ["M", 170000]], null, "허니양념 순살치킨", "Honey Spicy Boneless Chicken", "蜂蜜辣酱无骨炸鸡", "ハニーヤンニョム 骨なしチキン", "Gà không xương mật ong sốt cay", { spicy: true }),
      sz([["S", 90000], ["M", 170000]], null, "허니간장 순살치킨", "Honey Soy Boneless Chicken", "蜂蜜酱油无骨炸鸡", "ハニー醤油 骨なしチキン", "Gà không xương mật ong xì dầu"),
      sz([["S", 90000], ["M", 170000]], null, "마늘마요 순살치킨", "Garlic Mayo Boneless Chicken", "蒜香美乃滋无骨炸鸡", "ガーリックマヨ 骨なしチキン", "Gà không xương sốt tỏi mayonnaise"),
      it(180000, null, "데리야끼 BBQ", "Teriyaki BBQ Chicken", "照烧BBQ鸡", "照り焼きBBQチキン", "Gà xào sốt teriyaki BBQ"),
      it(180000, null, "땡초불닭 BBQ", "Hot Chili Fire Chicken BBQ", "辣椒火辣鸡BBQ", "激辛ブルダックBBQ", "Gà xào ớt cay BBQ", { spicy: true }),
      it(260000, null, "두셰프 순살치킨 3종", "Two Chefs Boneless Chicken (3 flavors)", "双厨无骨炸鸡三拼", "ツーシェフ 骨なしチキン3種", "Gà không xương 3 vị Two Chefs (chọn 3 vị)"),
      it(290000, "tangsuyuk", "두셰프 탕수육", "Two Chefs Tangsuyuk (Sweet & Sour Pork)", "双厨糖醋肉", "ツーシェフ タンスユク（酢豚）", "Thịt heo chiên sốt chua ngọt Two Chefs"),
      it(300000, null, "고추 탕수육", "Spicy Chili Tangsuyuk", "辣椒糖醋肉", "唐辛子タンスユク", "Thịt heo chiên chua ngọt ớt cay", { spicy: true }),
    ],
  },
  {
    id: "rice",
    name: T("덮밥", "Rice Bowls", "盖饭", "丼", "Cơm tô"),
    items: [
      it(160000, null, "포크스테이크 덮밥", "Pork Steak Rice Bowl", "炒猪肉盖饭", "ポークステーキ丼", "Cơm tô xào thịt heo"),
      it(160000, null, "볶음 돈가스 덮밥", "Stir-fried Tonkatsu Rice Bowl", "炒炸猪排盖饭", "炒めとんかつ丼", "Cơm tô thịt heo chiên xù xào"),
    ],
  },
  {
    id: "side",
    name: T("추가 메뉴", "Extras", "加点菜品", "追加メニュー", "Món gọi thêm"),
    items: [
      it(90000, "pizza", "두셰프 피자", "Two Chefs Pizza", "双厨披萨", "ツーシェフ ピザ", "Pizza Two Chefs", { tag: "must" }),
      it(90000, null, "떡볶이", "Tteokbokki (Spicy Rice Cakes)", "炒年糕", "トッポギ", "Tokbokki", { spicy: true }),
      it(60000, null, "돈가스 롤 (4P)", "Tonkatsu Rolls (4 pcs)", "炸猪排寿司卷（4块）", "とんかつロール（4個）", "Cơm cuộn tonkatsu 4 miếng"),
      it(50000, null, "새우튀김 (2P)", "Fried Shrimp (2 pcs)", "炸虾（2只）", "エビフライ（2尾）", "Tôm chiên 2 con"),
      it(40000, null, "치즈 퐁듀", "Cheese Fondue", "芝士火锅酱", "チーズフォンデュ", "Phô mai (fondue)"),
      it(40000, null, "카레", "Curry Sauce", "咖喱酱", "カレー", "Sốt cà ri"),
      it(20000, null, "주먹밥", "Rice Ball", "饭团", "おにぎり", "Cơm nắm"),
      it(20000, null, "공기밥", "Steamed Rice", "米饭", "ご飯", "Cơm trắng"),
    ],
  },
  {
    id: "drinks",
    name: T("아이스크림 · 음료 · 주류", "Ice Cream, Drinks & Alcohol", "冰淇淋 · 饮料 · 酒类", "アイス・ドリンク・お酒", "Kem, Nước & Rượu bia"),
    items: [
      it(25000, null, "요거트 아이스크림", "Yogurt Ice Cream", "酸奶冰淇淋", "ヨーグルトアイス", "Kem sữa chua"),
      it(35000, null, "요거트 아이스크림 쉘 추가", "Yogurt Ice Cream with Shell (choose 1: chocolate / strawberry / matcha / honey)", "酸奶冰淇淋加脆壳（巧克力/草莓/抹茶/蜂蜜任选1）", "ヨーグルトアイス シェル追加（チョコ/いちご/抹茶/はちみつから1つ）", "Kem sữa chua thêm vỏ (chọn 1 vị: chocolate / dâu / matcha / mật ong)"),
      it(50000, null, "딸기 에이드", "Strawberry Ade", "草莓气泡饮", "いちごエード", "Nước ade dâu"),
      it(50000, null, "블루베리 에이드", "Blueberry Ade", "蓝莓气泡饮", "ブルーベリーエード", "Nước ade việt quất"),
      it(50000, null, "복숭아 에이드", "Peach Ade", "蜜桃气泡饮", "桃エード", "Nước ade đào"),
      it(50000, null, "패션후르츠 에이드", "Passion Fruit Ade", "百香果气泡饮", "パッションフルーツエード", "Nước ade chanh dây"),
      it(50000, null, "청귤소다 에이드", "Green Tangerine Soda Ade", "青橘苏打气泡饮", "青みかんソーダエード", "Nước ade quýt xanh"),
      it(50000, null, "유자 에이드", "Yuja (Citron) Ade", "柚子气泡饮", "ゆずエード", "Nước ade thanh yên"),
      it(25000, null, "콜라", "Coca-Cola", "可乐", "コーラ", "Coca"),
      it(25000, null, "제로콜라", "Coke Zero", "零度可乐", "コーラゼロ", "Coca không đường"),
      it(25000, null, "사이다", "Sprite", "雪碧", "スプライト", "Sprite"),
      it(20000, null, "환타", "Fanta", "芬达", "ファンタ", "Fanta"),
      it(20000, null, "오렌지 주스", "Orange Juice", "橙汁", "オレンジジュース", "Nước cam trái cây"),
      it(20000, null, "과일 요거트", "Fruit Yogurt", "水果酸奶", "フルーツヨーグルト", "Sữa chua trái cây"),
      it(140000, null, "참이슬", "Chamisul Soju", "Chamisul烧酒", "チャミスル", "Chamisul"),
      it(140000, null, "진로", "Jinro Soju", "Jinro烧酒", "ジンロ", "Chinro"),
      it(140000, null, "새로", "Saero Soju", "Saero烧酒", "セロ", "Sero"),
      it(50000, null, "타이거 맥주", "Tiger Beer (bottle)", "虎牌啤酒（瓶）", "タイガービール（瓶）", "Tiger chai"),
      it(60000, null, "생맥주 삿포로", "Sapporo Draft Beer", "札幌生啤", "生ビール サッポロ", "Bia hơi Sapporo"),
    ],
  },
];
