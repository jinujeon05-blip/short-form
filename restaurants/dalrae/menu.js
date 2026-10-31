// 달래네 (NHÀ HÀNG ĐAL LÊ, 128 Nguyễn Cao, Kinh Bắc, Bắc Ninh) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진(2026-10-30 수집, 올린 날짜 미상) — 검은 책자 메뉴판 menu_01~07 우선(높은 가격), 흰 메뉴판 menu_08~10 보충
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "달래네", en: "Nhà hàng Đal Lê" },
  phone: "0354 373 286",
  address: "128 Nguyễn Cao, Kinh Bắc, Bắc Ninh",
  wifi: null,
  hours: "10:00 – 22:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ ...(price != null ? { price } : {}), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const ds = (ko, en, zh, ja, vi) => ({ desc: { ko, en, zh, ja, vi } });

window.MENU = [
  {
    id: "meal",
    name: T("식사류", "Meals", "餐食", "お食事", "Cơm & món nước"),
    items: [
      it(300000, null, "재첩정식", "Freshwater Clam Set (Jaecheop Jeongsik)", "河蚬套餐", "シジミ定食", "Cơm phần hến", ds("재첩국 · 재첩회무침", "Clam soup · spicy raw clam salad", "河蚬汤 · 凉拌河蚬", "シジミ汁・シジミの和え物", "Canh hến · hến trộn")),
      it(300000, null, "다슬기탕 정식", "Freshwater Snail Soup Set (Daseulgitang Jeongsik)", "田螺汤套餐", "タニシ（ダスルギ）スープ定食", "Cơm phần canh ốc suối", ds("다슬기비빔장 · 다슬기탕수제비", "Snail seasoned sauce · snail soup with dough flakes", "田螺拌酱 · 田螺汤面片", "ダスルギ和えダレ・ダスルギスープすいとん", "Ốc suối trộn sốt · canh ốc suối bánh bột")),
      it(200000, null, "달래정식", "Dallae Set (Dallae Jeongsik)", "达莱套餐", "タルレ定食", "Cơm phần Đal Lê", ds("매일 메뉴가 달라져요", "The menu changes daily", "每天菜品不同", "毎日メニューが変わります", "Thực đơn thay đổi mỗi ngày")),
      it(200000, null, "달래 점심 한상", "Dallae Lunch Table (Dallae Jeomsim Hansang)", "达莱午餐套餐", "タルレ ランチ膳", "Mâm cơm trưa Đal Lê"),
      it(180000, null, "몸보신 어죽국수", "Fish Porridge Noodles (Eojuk Guksu)", "滋补鱼粥面", "滋養魚粥そうめん（オジュク）", "Mì cháo cá bồi bổ (Eojuk)", ds("밥으로 선택 가능", "Rice can be chosen instead of noodles", "可换成米饭", "ご飯に変更できます", "Có thể đổi sang cơm")),
      it(400000, null, "바삭불고기+상추쌈밥", "Crispy Bulgogi with Lettuce Wrap Rice", "香脆烤肉生菜包饭", "カリカリプルコギとサンチュ包みご飯", "Bulgogi giòn + cơm cuốn xà lách"),
      it(160000, null, "얼큰 파닭계장", "Spicy Chicken & Scallion Soup (Padak Gyejang)", "辣味葱鸡汤", "辛口ネギ鶏スープ（パダッケジャン）", "Canh gà hành cay (Padak Gyejang)", { spicy: true }),
      it(200000, null, "뚝배기 김치우동", "Kimchi Udon in Stone Pot", "石锅泡菜乌冬", "土鍋キムチうどん", "Udon kim chi nồi đất"),
      it(150000, null, "주문즉시 직접 간 콩국수", "Fresh-Ground Soybean Noodles (Kongguksu)", "现磨豆浆冷面", "注文後に挽く豆乳そうめん（コングクス）", "Mì sữa đậu nành xay tại chỗ (Kongguksu)"),
      it(180000, null, "열무 냉국수", "Young Radish Cold Noodles (Yeolmu Naengguksu)", "小萝卜冷汤面", "ヨルム大根の冷麺", "Mì lạnh củ cải non (Yeolmu Naengguksu)"),
      it(180000, null, "멸치 칼국수", "Anchovy Kalguksu", "鳀鱼刀削面", "煮干しカルグクス", "Mì cắt tay nước cá cơm (Kalguksu)"),
      it(150000, null, "해장라면+꽁다리 김밥", "Hangover Ramyeon with Kkongdari Gimbap", "醒酒拉面+边角紫菜包饭", "ヘジャンラーメン＋ココンダリキンパ", "Mì cay giải rượu + Kimbap Kkongdari"),
      it(70000, null, "달래네 김밥", "Dallae-ne Gimbap", "达莱家紫菜包饭", "タルレネ キンパ", "Kimbap Đal Lê"),
      it(50000, null, "꽁다리 김밥", "Kkongdari Gimbap (End-piece Gimbap)", "边角紫菜包饭", "ココンダリキンパ", "Kimbap Kkongdari (phần đầu cuộn)"),
      it(50000, null, "파김 주먹밥", "Scallion Kimchi Rice Ball", "葱泡菜饭团", "ネギキムチおにぎり", "Cơm nắm hành kim chi"),
      it(10000, null, "추가 공기밥", "Extra Rice", "加饭", "ご飯追加", "Thêm cơm"),
    ],
  },
  {
    id: "grill",
    name: T("무침·구이·볶음류", "Salads, Grills & Stir-fries", "凉拌·烧烤·炒菜", "和え物・焼き物・炒め物", "Trộn · Nướng · Xào"),
    items: [
      it(600000, null, "매운 불오징어", "Spicy Fire Squid", "辣火烤鱿鱼", "辛い火イカ", "Mực nướng lửa cay", { spicy: true, ...ds("통오징어 2마리 + 소면", "2 whole squid + thin noodles", "整只鱿鱼2只 + 细面", "イカ丸ごと2杯＋そうめん", "2 con mực nguyên con + mì sợi nhỏ") }),
      it(400000, "deunggalbi", "숯불 등갈비구이", "Charcoal-grilled Pork Back Ribs (Deunggalbi)", "炭烤猪脊骨", "炭火豚スペアリブ焼き（トゥンカルビ）", "Sườn non nướng than (Deunggalbi)", { tag: "best", ...ds("왕등갈비 6대 · 추가 1대 50,000동", "6 large ribs · extra rib 50,000 VND each", "特大猪脊骨6根 · 加1根50,000越南盾", "特大スペアリブ6本・追加1本50,000ドン", "6 miếng sườn lớn · thêm 1 miếng 50.000đ") }),
      it(300000, null, "숯불 매운 무뼈닭발구이", "Charcoal-grilled Spicy Boneless Chicken Feet", "炭烤辣无骨鸡爪", "炭火辛口骨なし鶏足焼き", "Chân gà không xương nướng than cay", { spicy: true }),
      it(200000, null, "숯불 닭대파 꼬치구이", "Charcoal-grilled Chicken & Scallion Skewers", "炭烤鸡肉大葱串", "炭火ネギ鶏串焼き", "Xiên gà hành nướng than", ds("3꼬치", "3 skewers", "3串", "3本", "3 xiên")),
      it(600000, null, "돼지고기 모듬구이", "Assorted Grilled Pork", "什锦烤猪肉", "豚肉盛り合わせ焼き", "Thịt lợn nướng thập cẩm", ds("700g · 사전예약", "700 g · Reservation required", "700克 · 需提前预约", "700g・要事前予約", "700g · Đặt trước")),
      it(500000, null, "다슬기 초무침", "Freshwater Snail Salad with Vinegar Sauce (Daseulgi Chomuchim)", "醋拌田螺", "ダスルギの酢和え", "Ốc suối trộn chua ngọt (Daseulgi Chomuchim)", ds("간에 좋은 국내산 자연산 다슬기", "Wild freshwater snails, good for the liver", "对肝脏有益的天然田螺", "肝臓によい天然ダスルギ", "Ốc suối tự nhiên, tốt cho gan")),
      it(500000, null, "재첩회무침", "Spicy Raw Freshwater Clam Salad (Jaecheop Hoemuchim)", "凉拌河蚬", "シジミの和え物（ジェチョプフェムチム）", "Hến trộn (Jaecheop Hoemuchim)"),
      it(450000, null, "강원도 평창 더덕구이", "Grilled Deodeok from Pyeongchang, Gangwon", "江原道平昌烤沙参", "江原道平昌のトドク焼き", "Rễ đảng sâm nướng Pyeongchang, Gangwon (Deodeok)"),
      it(350000, null, "연탄불고기", "Briquette-grilled Pork Bulgogi", "煤炭烤肉", "練炭プルコギ", "Thịt lợn nướng than tổ ong", ds("돼지고기 600g", "600 g pork", "猪肉600克", "豚肉600g", "600g thịt lợn")),
      it(350000, null, "고추장 연탄불고기", "Briquette-grilled Pork in Gochujang", "辣酱煤炭烤肉", "コチュジャン練炭プルコギ", "Thịt lợn nướng than sốt gochujang", ds("돼지고기 600g", "600 g pork", "猪肉600克", "豚肉600g", "600g thịt lợn")),
      it(500000, null, "꽈리고추 닭볶음", "Stir-fried Chicken with Shishito Peppers", "尖椒炒鸡", "シシトウと鶏の炒め", "Gà xào ớt cựa gà", ds("닭다리살 600g + 넙적당면", "600 g chicken thigh + flat glass noodles", "鸡腿肉600克 + 宽粉条", "鶏もも肉600g＋平たい春雨", "600g đùi gà + miến bản to")),
      it(500000, "haemulbokkeum", "철판 매운해물볶음", "Spicy Seafood Stir-fry on Iron Plate", "铁板辣炒海鲜", "鉄板辛口海鮮炒め", "Hải sản xào cay chảo sắt", { spicy: true, ...ds("우동 또는 쫄면 사리", "Choice of udon or jjolmyeon noodles", "可选乌冬或辣拌面", "うどんまたはチョルミョンを選べます", "Chọn thêm udon hoặc mì jjolmyeon") }),
      it(200000, null, "은행구이 먹태 세트", "Grilled Ginkgo & Dried Pollock Set (Meoktae)", "烤银杏黑明太鱼套餐", "ぎんなん焼きとモクテ（干しスケトウダラ）セット", "Set bạch quả nướng + cá tuyết khô (Meoktae)"),
    ],
  },
  {
    id: "jeon",
    name: T("전류", "Savory Pancakes", "煎饼类", "チヂミ・ジョン", "Các loại bánh xèo Hàn"),
    items: [
      it(300000, null, "철판 다슬기 부추전", "Freshwater Snail & Chive Pancake on Iron Plate", "铁板田螺韭菜煎饼", "鉄板ダスルギとニラのチヂミ", "Bánh xèo ốc suối & hẹ chảo sắt (Buchujeon)"),
      it(300000, "pajeon", "철판 해물파전", "Seafood & Scallion Pancake on Iron Plate (Haemul Pajeon)", "铁板海鲜葱饼", "鉄板海鮮ネギチヂミ（ヘムルパジョン）", "Bánh xèo hải sản hành chảo sắt (Haemul Pajeon)"),
      it(200000, null, "감자전", "Potato Pancake (Gamjajeon)", "土豆煎饼", "ジャガイモのチヂミ（カムジャジョン）", "Bánh khoai tây (Gamjajeon)"),
    ],
  },
  {
    id: "tang",
    name: T("탕·전골류", "Stews & Hot Pots", "汤·火锅", "鍋・チョンゴル", "Lẩu & Canh"),
    note: T("부가세(VAT)는 별도예요", "VAT is not included", "价格不含增值税（VAT）", "付加価値税（VAT）は別です", "Giá chưa bao gồm VAT"),
    items: [
      it(null, null, "빠가사리 매운탕", "Spicy Korean Bullhead Catfish Stew (Maeuntang)", "辣味鮠鱼汤", "バガサリ（コウライギギ）辛口鍋", "Lẩu cá lăng cay (Maeuntang)", { sizes: [["대 L", 900000], ["소 S", 550000]], spicy: true, ...ds("국산 빠가사리 + 참게 + 수제비", "Korean bullhead catfish + freshwater crab + dough flakes", "国产鮠鱼 + 河蟹 + 面片", "国産バガサリ＋淡水ガニ＋すいとん", "Cá lăng Hàn Quốc + cua đồng + bánh bột") }),
      it(null, null, "민물새우 매운탕", "Spicy Freshwater Shrimp Stew (Maeuntang)", "辣味淡水虾汤", "淡水エビ辛口鍋", "Lẩu tôm đồng cay (Maeuntang)", { sizes: [["대 L", 700000], ["소 S", 400000]], spicy: true, ...ds("세뱅이 + 참게", "Freshwater shrimp (Sebaeng-i) + freshwater crab", "淡水虾（Sebaengi） + 河蟹", "淡水エビ（セベンイ）＋淡水ガニ", "Tôm đồng (Sebaengi) + cua đồng") }),
      it(null, "dakbokkeum", "솥뚜껑 닭볶음탕", "Spicy Braised Chicken on Cauldron Lid (Dakbokkeumtang)", "锅盖辣炖鸡", "釜の蓋で作る鶏の甘辛煮込み（タッポックムタン）", "Gà om cay trên nắp vạc (Dakbokkeumtang)", { sizes: [["대 L", 700000], ["소 S", 500000]], tag: "best", spicy: true, ...ds("쫄면 또는 볶음밥", "Choice of jjolmyeon noodles or fried rice", "辣拌面或炒饭", "チョルミョンまたはポックンパ", "Chọn mì jjolmyeon hoặc cơm chiên") }),
      it(600000, "dakhanmari", "동대문 한방 닭한마리", "Dongdaemun Herbal Whole Chicken Hot Pot (Dakhanmari)", "东大门药膳整鸡火锅", "東大門 薬膳タッカンマリ", "Lẩu gà nguyên con thuốc bắc kiểu Dongdaemun (Dakhanmari)", { tag: "best", ...ds("칼국수 포함", "Kalguksu noodles included", "含刀削面", "カルグクス付き", "Kèm mì kalguksu") }),
      it(700000, null, "손만두 전골", "Handmade Dumpling Hot Pot (Mandu Jeongol)", "手工饺子火锅", "手作り餃子チョンゴル", "Lẩu sủi cảo thủ công (Mandu Jeongol)", ds("김치왕만두 4 + 고기왕만두 4 + 칼국수", "4 kimchi dumplings + 4 meat dumplings + kalguksu", "泡菜大饺子4个 + 肉大饺子4个 + 刀削面", "キムチ餃子4＋肉餃子4＋カルグクス", "4 sủi cảo kim chi + 4 sủi cảo thịt + mì kalguksu")),
      it(500000, null, "매운 돼지갈비찜", "Spicy Braised Pork Ribs (Galbijjim)", "辣炖猪排骨", "辛口豚カルビチム", "Sườn lợn hầm cay (Galbijjim)", { spicy: true, ...ds("돼지갈비 700g + 면사리", "700 g pork ribs + noodles", "猪排骨700克 + 面条", "豚カルビ700g＋麺", "700g sườn lợn + mì thêm") }),
      it(300000, null, "빨간 오뎅탕", "Spicy Fish Cake Soup (Odeng-tang)", "辣鱼饼汤", "辛口おでん鍋", "Canh chả cá cay (Odeng-tang)", ds("콩나물 많이 + 꼬치오뎅 8개", "Lots of bean sprouts + 8 fish cake skewers", "大量豆芽 + 鱼饼串8串", "もやしたっぷり＋おでん串8本", "Nhiều giá đỗ + 8 xiên chả cá")),
      it(250000, null, "홍합오뎅탕", "Mussel & Fish Cake Soup", "青口鱼饼汤", "ムール貝おでん鍋", "Canh chả cá & vẹm xanh"),
      it(200000, null, "맑은 홍합탕", "Clear Mussel Soup (Hongaptang)", "清炖青口汤", "ムール貝の澄まし汁", "Canh vẹm xanh nước trong"),
      it(10000, null, "오뎅 추가 1개", "Extra Fish Cake (1 piece)", "加鱼饼（1个）", "おでん追加（1個）", "Thêm 1 chả cá"),
      it(50000, null, "일반 오뎅꼬치 3개", "Plain Fish Cake Skewers (3 pcs)", "原味鱼饼串（3串）", "普通のおでん串（3本）", "3 xiên chả cá thường"),
      it(60000, null, "마라 오뎅꼬치 3개", "Mala Fish Cake Skewers (3 pcs)", "麻辣鱼饼串（3串）", "麻辣おでん串（3本）", "3 xiên chả cá mala", { spicy: true }),
    ],
  },
  {
    id: "season",
    name: T("계절 특별 메뉴", "Seasonal Specials", "季节特色菜", "季節の特別メニュー", "Món theo mùa"),
    note: T("계절에 따라 달라요", "Changes with the season", "随季节变化", "季節によって変わります", "Thay đổi theo mùa"),
    items: [
      it(null, null, "두릅숙회", "Blanched Aralia Shoots (Durup Sukhoe)", "焯楤木芽", "タラの芽のゆでもの（トゥルップスクフェ）", "Durup (mầm non rau rừng) luộc (Durup Sukhoe)", { price: null, tag: "special", ...ds("참두릅/개두릅 + 수육", "True/false aralia shoots + boiled pork", "楤木芽/刺楤芽 + 白切肉", "タラの芽（本・外）＋ゆで豚（スユク）", "Mầm tầm ma (thật/dại) + thịt luộc") }),
      it(null, null, "한국 제철횟감", "Korean Seasonal Sashimi", "韩国时令生鱼片", "韓国旬の刺身", "Sashimi theo mùa của Hàn Quốc", { price: null, tag: "special", ...ds("도다리 세꼬시 · 숭어 · 우럭 등", "Flounder (sekkosi), mullet, rockfish, etc.", "比目鱼（连骨切片）· 鲻鱼 · 黑鲪等", "カレイのセコシ・ボラ・ソイなど", "Cá bơn thái lát cả xương, cá đối, cá mú đá, v.v.") }),
    ],
  },
  {
    id: "drinks",
    name: T("주류·음료", "Drinks", "酒水·饮料", "お酒・ドリンク", "Đồ uống"),
    items: [
      it(140000, null, "소주 (참이슬·처음처럼·새로·진로)", "Soju (Chamisul · Chum Churum · Saero · Jinro)", "烧酒（真露·初饮初乐·新乐·Jinro）", "焼酎（チャミスル・チョウムチョロム・セロ・ジンロ）", "Soju (Chamisul · Chum Churum · Saero · Jinro)"),
      it(150000, null, "막걸리", "Makgeolli", "马格利", "マッコリ", "Rượu gạo Makgeolli"),
      it(50000, null, "맥주", "Beer", "啤酒", "ビール", "Bia"),
      it(120000, null, "보드카맨", "Vodkaman", "伏特加曼", "ボドカマン", "Vodkaman"),
      it(20000, null, "콜라", "Cola", "可乐", "コーラ", "Coca-Cola"),
      it(20000, null, "사이다", "Sprite (Lemon-lime Soda)", "汽水（柠檬味）", "サイダー", "Sprite"),
      it(20000, null, "환타", "Fanta", "芬达", "ファンタ", "Fanta"),
    ],
  },
];
