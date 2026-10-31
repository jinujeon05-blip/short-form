// CTQ 텍사스 BBQ 미딩점 (CTQ TEXAS BBQ) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진(menu_01·04~13·15~26 (02·03·14는 음식·홍보 사진), 2026-10-31 수집, 올린 날짜 미상), 가격이 다르면 높은 쪽
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "CTQ 텍사스 BBQ 미딩점", en: "CTQ TEXAS BBQ" },
  phone: "096 232 2111",
  address: "Tòa nhà CT1 (giao Trần Văn Lai – Vũ Quỳnh), KĐT Mỹ Đình, Xuân Phương, Hà Nội",
  wifi: null,
  hours: { ko: "10:30 – 14:00 · 16:30 – 22:00", en: "10:30 – 14:00 · 16:30 – 22:00", zh: "10:30 – 14:00 · 16:30 – 22:00", ja: "10:30 – 14:00 · 16:30 – 22:00", vi: "10:30 – 14:00 · 16:30 – 22:00" }, // 구글 지도(2026-10-31)
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ ...(typeof price === "number" ? { price } : { sizes: price }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

window.MENU = [
  {
    id: "pork",
    name: T("훈제 돼지고기", "Smoked Pork", "烟熏猪肉", "スモーク豚肉", "Thịt heo xông khói"),
    items: [
      it([["350g", 299000], ["500g", 399000]], "ribs", "6시간 훈제 돼지갈비", "6-Hour Smoked Pork Ribs", "6小时烟熏猪肋排", "6時間スモーク豚スペアリブ", "Sườn heo 6H", { tag: "must" }),
      it([["200g", 199000], ["350g", 299000]], null, "6시간 훈제 프리미엄 돼지 어깨살", "6-Hour Smoked Premium Pork Shoulder", "6小时烟熏优质猪肩肉", "6時間スモーク プレミアム豚肩肉", "Vai heo đầu rồng 6H"),
      it(168000, null, "6시간 훈제 삼겹살 롤", "6-Hour Smoked Pork Belly Rolls", "6小时烟熏五花肉卷", "6時間スモーク豚バラロール", "Ba chỉ cuốn 6H"),
      it(168000, null, "4시간 훈제 돼지 볼살", "4-Hour Smoked Pork Cheeks", "4小时烟熏猪颊肉", "4時間スモーク豚ほほ肉", "Má heo 4H"),
    ],
  },
  {
    id: "beef",
    name: T("훈제 소고기", "Smoked Beef", "烟熏牛肉", "スモーク牛肉", "Thịt bò xông khói"),
    items: [
      it([["200g", 299000], ["350g", 399000]], null, "8시간 훈제 텍스멕스 우삼겹", "8-Hour Smoked Tex-Mex Beef Belly", "8小时烟熏德墨风味牛腩", "8時間スモーク テクスメクス風牛バラ", "Ba chỉ bò Texmex 8H"),
      it([["350g", 680000], ["500g", 980000]], null, "10시간 훈제 소 양지·어깨살", "10-Hour Smoked Beef Brisket / Shoulder", "10小时烟熏牛胸肉/牛肩肉", "10時間スモーク 牛ブリスケット/肩肉", "Ức/vai bò 10H"),
      it([["500g", 980000], ["700g", 1350000]], null, "12시간 훈제 프리미엄 AAA 소갈비", "12-Hour Smoked Premium AAA Beef Ribs", "12小时烟熏优质AAA牛肋排", "12時間スモーク プレミアムAAA牛カルビ", "Sườn bò AAA cao cấp 12H", { tag: "best" }),
    ],
  },
  {
    id: "salmon",
    name: T("훈제 사파 연어", "Smoked Sapa Salmon", "烟熏沙坝三文鱼", "スモークサパサーモン", "Cá hồi Sapa xông khói"),
    items: [
      it([["반 마리 (4인)", 850000], ["한 마리 (8인)", 1550000]], "salmon", "8시간 저온 훈제 사파 연어", "8-Hour Low & Slow Smoked Sapa Salmon", "8小时低温慢熏沙坝三文鱼", "8時間低温スモーク サパサーモン", "Cá hồi Sapa chín chậm 8H", { tag: "special" }),
    ],
  },
  {
    id: "best",
    name: T("더 베스트 텍사스 BBQ", "The Best Texas BBQ", "最佳德州BBQ", "ザ・ベスト テキサスBBQ", "The Best Texas BBQ"),
    note: T("소시지 포함 세트 · 2인용 / 4인용", "Includes Texas sausage · for 2 / for 4", "含德州香肠套餐 · 2人 / 4人份", "テキサスソーセージ付きセット · 2人前 / 4人前", "Kèm xúc xích Texas · cho 2 / 4 người"),
    items: [
      it([["2인 350g", 680000], ["4인 500g", 980000]], "beef", "소 양지·어깨살 + 텍사스 소시지", "Beef Brisket / Shoulder + Texas Sausage", "牛胸肉/牛肩肉 + 德州香肠", "牛ブリスケット/肩肉 + テキサスソーセージ", "Ức/vai bò 10H + xúc xích Texas", { tag: "best" }),
      it([["2인 500g", 980000], ["4인 700g", 1350000]], null, "프리미엄 AAA 소갈비 + 텍사스 소시지", "Premium AAA Beef Ribs + Texas Sausage", "优质AAA牛肋排 + 德州香肠", "プレミアムAAA牛カルビ + テキサスソーセージ", "Sườn bò AAA + xúc xích Texas"),
    ],
  },
  {
    id: "combo",
    name: T("콤보 세트", "Combo Sets", "组合套餐", "コンボセット", "Combo"),
    items: [
      it(499000, null, "텍사스 A (2~3인)", "Texas A (2–3 people)", "德州A套餐(2~3人)", "テキサスA(2〜3人前)", "Texas A (2–3 người)", { desc: T("돼지갈비 350g · 돼지 어깨살 200g · 소시지", "Pork ribs 350g · pork shoulder 200g · sausage", "猪肋排350g · 猪肩肉200g · 香肠", "豚スペアリブ350g · 豚肩肉200g · ソーセージ", "Sườn heo 350g · vai heo 200g · xúc xích") }),
      it(499000, null, "텍사스 B (2~3인)", "Texas B (2–3 people)", "德州B套餐(2~3人)", "テキサスB(2〜3人前)", "Texas B (2–3 người)", { desc: T("우삼겹 200g · 돼지 어깨살 200g · 소시지", "Beef belly 200g · pork shoulder 200g · sausage", "牛腩200g · 猪肩肉200g · 香肠", "牛バラ200g · 豚肩肉200g · ソーセージ", "Ba chỉ bò 200g · vai heo 200g · xúc xích") }),
      it(599000, null, "텍사스 C (2~3인)", "Texas C (2–3 people)", "德州C套餐(2~3人)", "テキサスC(2〜3人前)", "Texas C (2–3 người)", { desc: T("돼지갈비 350g · 우삼겹 200g · 소시지", "Pork ribs 350g · beef belly 200g · sausage", "猪肋排350g · 牛腩200g · 香肠", "豚スペアリブ350g · 牛バラ200g · ソーセージ", "Sườn heo 350g · ba chỉ bò 200g · xúc xích") }),
      it(799000, null, "텍사스 D (2~3인)", "Texas D (2–3 people)", "德州D套餐(2~3人)", "テキサスD(2〜3人前)", "Texas D (2–3 người)", { desc: T("돼지갈비 350g · 우삼겹 200g · 돼지 어깨살 200g · 소시지", "Pork ribs 350g · beef belly 200g · pork shoulder 200g · sausage", "猪肋排350g · 牛腩200g · 猪肩肉200g · 香肠", "豚スペアリブ350g · 牛バラ200g · 豚肩肉200g · ソーセージ", "Sườn heo 350g · ba chỉ bò 200g · vai heo 200g · xúc xích") }),
      it(699000, "combo", "텍사스 콤보 (등갈비·치킨·사이드, 2~3인)", "Texas Combo: Ribs, Chicken & Sides (2–3 people)", "德州组合(肋排·鸡肉·配菜,2~3人)", "テキサスコンボ(スペアリブ・チキン・サイド、2〜3人前)", "Combo Texas: sườn, gà & món phụ (2–3 người)", { desc: T("등갈비 500g · 훈제 치킨 · 소시지 · 수프 · 맥앤치즈 · 매시드 포테이토 · 샌드위치 · 피클", "Ribs 500g · smoked chicken · sausage · soup · mac & cheese · mashed potato · sandwich · pickles", "肋排500g · 烟熏鸡肉 · 香肠 · 汤 · 芝士通心粉 · 土豆泥 · 三明治 · 腌菜", "スペアリブ500g · スモークチキン · ソーセージ · スープ · マカロニチーズ · マッシュポテト · サンドイッチ · ピクルス", "Sườn 500g · gà xông khói · xúc xích · súp · mì ống phô mai · khoai tây nghiền · sandwich · đồ muối") }),
      it(699000, null, "카우보이 A (5~6인)", "Cowboy A (5–6 people)", "牛仔A套餐(5~6人)", "カウボーイA(5〜6人前)", "Cowboy A (5–6 người)", { desc: T("돼지갈비 500g · 돼지 어깨살 350g · 소시지", "Pork ribs 500g · pork shoulder 350g · sausage", "猪肋排500g · 猪肩肉350g · 香肠", "豚スペアリブ500g · 豚肩肉350g · ソーセージ", "Sườn heo 500g · vai heo 350g · xúc xích") }),
      it(699000, null, "카우보이 B (5~6인)", "Cowboy B (5–6 people)", "牛仔B套餐(5~6人)", "カウボーイB(5〜6人前)", "Cowboy B (5–6 người)", { desc: T("우삼겹 350g · 돼지 어깨살 350g · 소시지", "Beef belly 350g · pork shoulder 350g · sausage", "牛腩350g · 猪肩肉350g · 香肠", "牛バラ350g · 豚肩肉350g · ソーセージ", "Ba chỉ bò 350g · vai heo 350g · xúc xích") }),
      it(799000, null, "카우보이 C (5~6인)", "Cowboy C (5–6 people)", "牛仔C套餐(5~6人)", "カウボーイC(5〜6人前)", "Cowboy C (5–6 người)", { desc: T("돼지갈비 500g · 우삼겹 350g · 소시지", "Pork ribs 500g · beef belly 350g · sausage", "猪肋排500g · 牛腩350g · 香肠", "豚スペアリブ500g · 牛バラ350g · ソーセージ", "Sườn heo 500g · ba chỉ bò 350g · xúc xích") }),
      it(1115000, null, "카우보이 D (5~6인)", "Cowboy D (5–6 people)", "牛仔D套餐(5~6人)", "カウボーイD(5〜6人前)", "Cowboy D (5–6 người)", { desc: T("돼지갈비 500g · 우삼겹 350g · 돼지 어깨살 350g · 소시지", "Pork ribs 500g · beef belly 350g · pork shoulder 350g · sausage", "猪肋排500g · 牛腩350g · 猪肩肉350g · 香肠", "豚スペアリブ500g · 牛バラ350g · 豚肩肉350g · ソーセージ", "Sườn heo 500g · ba chỉ bò 350g · vai heo 350g · xúc xích") }),
    ],
  },
  {
    id: "party",
    name: T("파티·프리미엄 세트", "Party & Premium Sets", "派对·高级套餐", "パーティー・プレミアムセット", "Mâm tiệc & set cao cấp"),
    items: [
      it(2800000, null, "텍사스 BBQ 럭셔리 (토마호크 1kg)", "Texas BBQ Luxury (1kg Tomahawk)", "德州BBQ奢华套餐(战斧牛排1kg)", "テキサスBBQ ラグジュアリー(トマホーク1kg)", "Texas BBQ Luxury (Tomahawk 1kg)", { desc: T("토마호크 1kg · 소시지 · 수프 · 매시드 포테이토 · 치아바타 · 피클 (금박 추가 +200,000₫)", "Tomahawk 1kg · sausage · soup · mashed potato · ciabatta · pickles (gold leaf +200,000₫)", "战斧牛排1kg · 香肠 · 汤 · 土豆泥 · 恰巴塔面包 · 腌菜(加金箔 +200,000₫)", "トマホーク1kg · ソーセージ · スープ · マッシュポテト · チャバタ · ピクルス(金箔追加 +200,000₫)", "Tomahawk 1kg · xúc xích · súp · khoai tây nghiền · bánh mì ciabatta · đồ muối (dát vàng +200.000₫)"), tag: "special" }),
      it(3090000, null, "카우보이 파티 플래터 6B (6인)", "Cowboy Party Platter 6B", "牛仔派对拼盘6B(6人)", "カウボーイ パーティープラッター6B(6人前)", "Mâm tiệc thịt nướng Cao Bồi 6B", { desc: T("텍사스 BBQ 스페셜 · 텍사스 2.3 · 삼겹살 또는 치킨 · 샐러드 · 물 또는 수제 맥주 6잔", "Texas BBQ Special · Texas 2.3 · pork belly or chicken · salad · 6 water or craft beers", "德州BBQ特选 · 德州2.3 · 五花肉或鸡肉 · 沙拉 · 6杯水或精酿啤酒", "テキサスBBQスペシャル · テキサス2.3 · 豚バラまたはチキン · サラダ · 水またはクラフトビール6杯", "Texas BBQ Special · Texas 2.3 · ba chỉ heo hoặc gà · salad · 6 ly nước hoặc bia thủ công") }),
      it(3290000, null, "카우보이 파티 플래터 8A (8인)", "Cowboy Party Platter 8A", "牛仔派对拼盘8A(8人)", "カウボーイ パーティープラッター8A(8人前)", "Mâm tiệc thịt nướng Cao Bồi 8A", { desc: T("텍사스 4.1 ×2 · 삼겹살 또는 치킨 ×2 · 샐러드 ×2 · 물 또는 수제 맥주 8잔", "Texas 4.1 ×2 · pork belly or chicken ×2 · salad ×2 · 8 water or craft beers", "德州4.1 ×2 · 五花肉或鸡肉 ×2 · 沙拉 ×2 · 8杯水或精酿啤酒", "テキサス4.1 ×2 · 豚バラまたはチキン ×2 · サラダ ×2 · 水またはクラフトビール8杯", "Texas 4.1 ×2 · ba chỉ heo hoặc gà ×2 · salad ×2 · 8 ly nước hoặc bia thủ công") }),
    ],
  },
  {
    id: "smoked-side",
    name: T("훈제 단품", "Smoked Bites", "烟熏小食", "スモーク単品", "Món xông khói"),
    items: [
      it(168000, null, "훈제 치킨 윙", "Smoked Chicken Wings", "烟熏鸡翅", "スモークチキンウィング", "Cánh gà xông khói"),
      it(168000, null, "베이컨 고추말이", "Bacon-Wrapped Peppers", "培根辣椒卷", "ベーコン巻きペッパー", "Ớt cuộn bacon"),
      it(168000, null, "3가지 소스 치킨", "Fried Chicken with 3 Sauces", "三味酱炸鸡", "3種ソースのフライドチキン", "Gà chiên tam vị", { desc: T("매콤 패션후르츠 · 새콤달콤 라임 · 크리미 바질", "Spicy passion fruit · sweet-sour lime · creamy basil", "香辣百香果 · 酸甜青柠 · 奶油罗勒", "ピリ辛パッションフルーツ · 甘酸っぱいライム · クリーミーバジル", "Chanh leo cay · chanh xanh chua ngọt · kem húng quế tây") }),
      it(99000, null, "텍사스 훈제 소시지", "Texas Smoked Sausage", "德州烟熏香肠", "テキサススモークソーセージ", "Xúc xích khói Texas"),
      it(99000, null, "황개미 훈제 돼지고기", "Smoked Pork with Weaver Ants", "黄猄蚁烟熏猪肉", "ツムギアリ入りスモーク豚肉", "Heo xông khói kiến vàng"),
    ],
  },
  {
    id: "hot",
    name: T("철판·스튜·파스타", "Skillets, Stews & Pasta", "铁板·炖菜·意面", "鉄板・シチュー・パスタ", "Chảo, hầm & mì Ý"),
    items: [
      it(168000, null, "훈제 베이컨 맥앤치즈 철판", "Mac & Cheese Skillet with Smoked Bacon", "烟熏培根芝士通心粉铁板", "スモークベーコンのマカロニチーズ鉄板", "Chảo mac cheese thịt xông khói"),
      it(168000, null, "치즈 치킨 철판", "Cheese Chicken Skillet", "芝士鸡肉铁板", "チーズチキン鉄板", "Chảo gà phô mai"),
      it(168000, null, "돼지고기 야채 파이", "Pork & Vegetable Pie", "猪肉蔬菜派", "豚肉と野菜のパイ", "Bánh pie heo rau củ"),
      it([["소", 235000], ["대", 285000]], null, "스페셜 케이준 소고기 스튜", "Special Cajun Beef Stew", "特制卡津牛肉炖菜", "スペシャル ケイジャンビーフシチュー", "Bò hầm Cajun đặc biệt"),
      it([["소", 235000], ["대", 285000]], null, "스페셜 염란(솔티드 에그) 소고기 스튜", "Special Salted Egg Beef Stew", "特制咸蛋牛肉炖菜", "スペシャル 塩卵ビーフシチュー", "Bò hầm trứng muối đặc biệt"),
      it(120000, null, "볼로네제 스파게티", "Spaghetti Bolognese", "肉酱意大利面", "ボロネーゼスパゲッティ", "Mỳ Ý bò băm"),
      it(120000, null, "크림 스파게티 (까르보나라)", "Creamy Spaghetti (Carbonara)", "奶油意大利面(卡邦尼)", "クリームスパゲッティ(カルボナーラ)", "Mỳ Ý sốt kem"),
    ],
  },
  {
    id: "salad",
    name: T("샐러드·사이드", "Salads & Sides", "沙拉·配菜", "サラダ・サイド", "Salad & món phụ"),
    items: [
      it(168000, "seaweed", "간보 해초 샐러드", "Ganbo Seaweed Salad", "Ganbo海藻沙拉", "Ganbo海藻サラダ", "Salad rong biển Ganbo", { tag: "must" }),
      it(168000, null, "궁채 나물 무침", "Celtuce Stem Salad", "凉拌贡菜", "貢菜（ステムレタス）のナムル和え", "Nộm rau tiến vua"),
      it(168000, null, "카우보이 콜드 크림 감자", "Cowboy Cold Creamy Potato", "牛仔冷奶油土豆", "カウボーイ 冷製クリームポテト", "Khoai kem lạnh Cowboy"),
      it(168000, null, "연줄기 샐러드", "Lotus Stem Salad", "莲茎沙拉", "蓮の茎サラダ", "Salad ngó sen"),
      it(129000, null, "양배추 코울슬로", "Cole Slaw", "卷心菜凉拌沙拉", "キャベツのコールスロー", "Salad bắp cải"),
      it(129000, null, "그린 가든 닭가슴살 샐러드", "Green Garden Chicken Breast Salad", "田园鸡胸肉沙拉", "グリーンガーデン 鶏むね肉サラダ", "Salad vườn xanh ức gà"),
      it(80000, null, "카우보이 가든 샐러드", "Cowboy Garden Salad", "牛仔田园沙拉", "カウボーイ ガーデンサラダ", "Salad vườn Cao Bồi"),
      it(80000, null, "헬시 코울슬로 샐러드", "Healthy Cole Slaw Salad", "健康卷心菜沙拉", "ヘルシーコールスローサラダ", "Salad bắp cải healthy"),
      it(80000, null, "헬시 양상추 샐러드", "Healthy Lettuce Salad", "健康生菜沙拉", "ヘルシーレタスサラダ", "Salad xà lách healthy"),
      it(68000, null, "고구마튀김", "Sweet Potato Fries", "炸红薯条", "さつまいもフライ", "Khoai lang chiên"),
      it(68000, null, "감자튀김", "French Fries", "炸薯条", "フライドポテト", "Khoai tây chiên"),
      it(68000, null, "케이준 버섯튀김", "Cajun Fried Mushrooms", "卡津炸蘑菇", "ケイジャン風マッシュルームフライ", "Nấm chiên Cajun"),
      it(68000, null, "클래식 나초", "Classic Nachos", "经典玉米片", "クラシックナチョス", "Nachos classic"),
      it(68000, null, "빵 세트", "Bread Set", "面包套餐", "パンセット", "Set bánh mì"),
    ],
  },
  {
    id: "drink",
    name: T("음료·주류", "Drinks & Beer", "饮料·酒类", "ドリンク・お酒", "Đồ uống & bia"),
    items: [
      it(45000, null, "수제 맥주 페일 / 스카이", "Craft Beer Pale / Sky", "精酿啤酒 淡色/天空", "クラフトビール ペール/スカイ", "Bia thủ công Pale / Sky"),
      it(48000, null, "수제 흑맥주 (블랙)", "Craft Black Beer", "精酿黑啤", "クラフト黒ビール(ブラック)", "Bia thủ công Black"),
      it(68000, null, "삿포로 생맥주", "Sapporo Draft Beer", "札幌生啤", "サッポロ生ビール", "Bia tươi Sapporo"),
      it(499000, null, "삿포로 생맥주 타워", "Sapporo Draft Beer Tower", "札幌生啤塔", "サッポロ生ビールタワー", "Tháp bia tươi Sapporo"),
      it(20000, null, "하노이 / 사이공 맥주", "Hanoi / Saigon Beer", "河内/西贡啤酒", "ハノイ/サイゴンビール", "Bia Hà Nội / Sài Gòn"),
      it(120000, null, "소주", "Soju", "烧酒", "焼酎(ソジュ)", "Rượu Soju"),
      it(89000, null, "계절 과일차 (1리터)", "Seasonal Fruit Tea (1L)", "时令水果茶(1升)", "季節のフルーツティー(1リットル)", "Trà hoa quả theo mùa (1 lít)"),
      it(15000, null, "코카콜라 / 콜라 제로", "Coca-Cola / Zero", "可口可乐/零度可乐", "コカ・コーラ/コーラゼロ", "Coca-Cola / Coca 0 calo"),
      it(10000, null, "생수", "Water", "矿泉水", "ミネラルウォーター", "Nước lọc"),
    ],
  },
];
