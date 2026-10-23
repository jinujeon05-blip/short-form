// 자매당 JAMAEDANG (간판 자매당 JAMAEDANG · Ngõ 176 Đình Thôn, D7-Fivestar, Từ Liêm, Hà Nội) 메뉴 데이터 — 한식(코스·갈치조림·홍어·탕·전·고기)
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND (VAT 별도 — 메뉴책 안내사항 쪽)
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/자매당"(사진 수집기 v1.5) 메뉴책 12쪽 중 메뉴 쪽 menu_01·04~10(가게 계정이 올린 쪽: 04·08~12). 메뉴판은 한국어+베트남어+영어(일부)라 영·중·일은 새로 옮김.
// 항목 사진은 메뉴책 속 사진을 잘라 씀(img/, 인쇄물·스톡풍이라 실제 접시와 다를 수 있음 — 메뉴책에도 '상기 이미지는 실제와 다를 수 있습니다' 안내).
window.RESTAURANT = {
  brand: { ko: "자매당", en: "Jamaedang", branch: { ko: "하노이", en: "Hà Nội" } },
  phone: "0925 692 817",
  address: "Ngõ 176 Đ. Đình Thôn, D7 - Fivestar, Từ Liêm, Hà Nội",
  mapQuery: "자매당 JAMAEDANG 한식당 Ngõ 176 Đình Thôn Từ Liêm Hà Nội",
  mapUrl: "https://www.google.com/maps/place/%EC%9E%90%EB%A7%A4%EB%8B%B9(JAMAEDANG)/@21.0187419,105.7748437,20z/data=!4m6!3m5!1s0x3134550069736633:0x95868d6644bea2d6!8m2!3d21.0189347!4d105.7749861!16s%2Fg%2F11y8p8r7n3",
  wifi: null, // 예: { ssid: "JAMAEDANG", password: "12345678" }
};

window.MENU = [
  {
    id: "signature",
    name: {"ko": "대표 메뉴", "en": "Signature", "zh": "招牌菜", "ja": "看板メニュー", "vi": "Món đặc trưng"},
    items: [
      {"price": 950000, "photo": "img/course.jpg", "unit": {"ko": "1인", "en": "1 pax", "zh": "每人", "ja": "1名様", "vi": "1 khách"}, "name": {"ko": "자매 한식카세", "en": "JAMAEDANG KOREAN COURSE", "zh": "자매당韩式主厨套餐", "ja": "자매당 韓国料理おまかせコース", "vi": "Set ẩm thực Hàn Quốc cao cấp"}, "desc": {"ko": "신선한 제철 식재료로 정성껏 준비한 자매당 프리미엄 코스 요리 (식전죽 · 모둠회 · 해산물 · 소갈비살 · 수육 · 홍어 · 초무침 · 꽃게탕 · 식사 · 후식)", "en": "Premium course made with fresh seasonal ingredients. (Appetizer porridge · Assorted sashimi · Seafood · Beef short rib · Boiled pork · Fermented skate · Spicy seasoned salad · Spicy crab stew · Meal · Dessert)", "zh": "选用新鲜时令食材精心准备的자매당高级套餐。(开胃粥 · 什锦生鱼片 · 海鲜 · 牛小排肉 · 白切肉 · 发酵鳐鱼 · 醋拌小菜 · 花蟹汤 · 主食 · 甜点)", "ja": "新鮮な旬の食材で心を込めて準備した자매당のプレミアムコース料理。(前菜のお粥 · 刺身盛り合わせ · 海鮮 · 牛カルビ肉 · ゆで豚 · ホンオ(発酵エイ) · 酢和え · ワタリガニのスープ · お食事 · デザート)", "vi": "Thực đơn cao cấp được chế biến từ nguyên liệu tươi ngon theo mùa. (Cháo khai vị · Sashimi tổng hợp · Hải sản · Thịt sườn bò · Thịt luộc · Cá đuối lên men · Gỏi trộn cay · Canh ghẹ · Mỳ/Cơm · Tráng miệng)"}, "tag": "best"},
      {"price": 1650000, "photo": "img/cutlassfish.jpg", "name": {"ko": "통갈치조림", "en": "BRAISED WHOLE CUTLASSFISH", "zh": "红烧整条带鱼", "ja": "太刀魚の丸ごと煮付け", "vi": "Cá Hố Kho Cay"}, "desc": {"ko": "통갈치를 매콤한 양념에 신선한 해산물과 함께 푸짐하게 조려낸 자매당의 대표 메뉴", "en": "Whole cutlassfish braised generously in a spicy sauce with fresh seafood, a signature dish of Jamaedang", "zh": "整条带鱼配新鲜海鲜,用香辣酱汁满满炖煮而成,자매당的招牌菜", "ja": "太刀魚を丸ごと、新鮮な海鮮と一緒にピリ辛のタレでたっぷり煮込んだ、자매당の看板メニュー", "vi": "Món cá hố nguyên con được kho với sốt cay đặc biệt cùng hải sản tươi ngon, mang hương vị đặc trưng của Jamaedang."}, "tag": "best", "spicy": true},
    ],
  },
  {
    id: "set",
    name: {"ko": "홍어 세트", "en": "SKATE SET", "zh": "发酵鳐鱼套餐", "ja": "ホンオセット", "vi": "Set Cá Đuối"},
    items: [
      {"price": 1850000, "photo": "img/hongeo-set.jpg", "name": {"ko": "스페셜 1", "en": "SET 1", "zh": "特选套餐 1", "ja": "スペシャル1", "vi": "Special 1"}, "desc": {"ko": "홍어, 전복, 문어, 갑오징어, 수육, 대구탕", "en": "Fermented skate, abalone, octopus, cuttlefish, boiled pork slices, cod soup", "zh": "发酵鳐鱼、鲍鱼、章鱼、墨鱼、白切肉、鳕鱼汤", "ja": "ホンオ(発酵エイ)、アワビ、タコ、コウイカ、ゆで豚、タラ鍋", "vi": "Cá Đuối, Bào Ngư, Bạch Tuộc, Mực, Thịt Luộc, Canh Cá Tuyết"}, "tag": "best"},
      {"price": 1650000, "name": {"ko": "스페셜 2", "en": "SET 2", "zh": "特选套餐 2", "ja": "スペシャル2", "vi": "Special 2"}, "desc": {"ko": "홍어, 문어, 갑오징어, 수육, 대구탕", "en": "Fermented skate, octopus, cuttlefish, boiled pork slices, cod soup", "zh": "发酵鳐鱼、章鱼、墨鱼、白切肉、鳕鱼汤", "ja": "ホンオ(発酵エイ)、タコ、コウイカ、ゆで豚、タラ鍋", "vi": "Cá Đuối, Bạch Tuộc, Mực, Thịt Luộc, Canh Cá Tuyết"}},
      {"price": 1450000, "name": {"ko": "스페셜 3", "en": "SET 3", "zh": "特选套餐 3", "ja": "スペシャル3", "vi": "Special 3"}, "desc": {"ko": "홍어, 갑오징어, 수육, 대구탕", "en": "Fermented skate, cuttlefish, boiled pork slices, cod soup", "zh": "发酵鳐鱼、墨鱼、白切肉、鳕鱼汤", "ja": "ホンオ(発酵エイ)、コウイカ、ゆで豚、タラ鍋", "vi": "Cá Đuối, Mực, Thịt Luộc, Canh Cá Tuyết"}},
      {"price": 1200000, "name": {"ko": "스페셜 4", "en": "SET 4", "zh": "特选套餐 4", "ja": "スペシャル4", "vi": "Special 4"}, "desc": {"ko": "홍어, 수육, 대구탕", "en": "Fermented skate, boiled pork slices, cod soup", "zh": "发酵鳐鱼、白切肉、鳕鱼汤", "ja": "ホンオ(発酵エイ)、ゆで豚、タラ鍋", "vi": "Cá Đuối, Thịt Luộc, Canh Cá Tuyết"}},
    ],
  },
  {
    id: "tang",
    name: {"ko": "탕", "en": "Soups & Hot pots", "zh": "汤与火锅", "ja": "スープ・鍋", "vi": "Canh / Lẩu"},
    items: [
      {"price": 2000000, "photo": "img/haesintang.jpg", "name": {"ko": "해신탕", "en": "Seafood and chicken hot pot (haesintang)", "zh": "海神汤(海鲜炖鸡)", "ja": "ヘシンタン(海鮮と鶏の鍋)", "vi": "Lẩu Hải Sản Gà Hầm"}},
      {"price": null, "name": {"ko": "아귀지리", "en": "Monkfish clear soup (aguji)", "zh": "清炖鮟鱇鱼汤", "ja": "アンコウのチリ(あっさり鍋)", "vi": "Canh Cá Mặt Quỷ"}, "sizes": [["M", 850000], ["L", 1250000]]},
      {"price": null, "photo": "img/haemultang.jpg", "name": {"ko": "해물탕", "en": "Spicy seafood hot pot (haemultang)", "zh": "海鲜锅", "ja": "海鮮鍋(ヘムルタン)", "vi": "Lẩu Hải Sản"}, "sizes": [["M", 950000], ["L", 1350000]]},
      {"price": null, "name": {"ko": "꽃게탕", "en": "Spicy blue crab stew (kkotgyetang)", "zh": "花蟹汤", "ja": "ワタリガニのスープ(コッケタン)", "vi": "Canh Ghẹ"}, "sizes": [["M", 850000], ["L", 1100000]]},
      {"price": null, "name": {"ko": "대구탕", "en": "Cod soup (daegutang)", "zh": "鳕鱼汤", "ja": "タラ鍋(テグタン)", "vi": "Canh Cá Tuyết"}, "sizes": [["M", 950000], ["L", 1250000]]},
    ],
  },
  {
    id: "jjim",
    name: {"ko": "찜", "en": "Steamed dishes", "zh": "焖菜", "ja": "蒸し煮料理", "vi": "Món hấp / xào"},
    items: [
      {"price": null, "photo": "img/agujjim.jpg", "name": {"ko": "아귀찜", "en": "Spicy braised monkfish (agujjim)", "zh": "麻辣焖鮟鱇鱼", "ja": "アンコウの蒸し煮(アグチム)", "vi": "Cá Mặt Quỷ Xào Cay"}, "spicy": true, "sizes": [["M", 850000], ["L", 1250000]]},
      {"price": null, "photo": "img/haemuljjim.jpg", "name": {"ko": "해물찜", "en": "Spicy braised seafood (haemuljjim)", "zh": "麻辣焖海鲜", "ja": "海鮮のピリ辛蒸し煮(ヘムルチム)", "vi": "Hải Sản Xào Cay"}, "spicy": true, "sizes": [["M", 950000], ["L", 1350000]]},
    ],
  },
  {
    id: "jeon",
    name: {"ko": "전", "en": "Korean pancakes", "zh": "煎饼", "ja": "チヂミ", "vi": "Các loại bánh"},
    items: [
      {"price": 550000, "name": {"ko": "육전", "en": "Beef pancake (yukjeon)", "zh": "牛肉煎饼", "ja": "ユクチョン(牛肉のチヂミ)", "vi": "Bánh Thịt Bò"}, "desc": {"ko": "테이블 자리에서 정성껏 만들어드립니다.", "en": "Made fresh at your table.", "zh": "在餐桌旁为您精心现做。", "ja": "テーブルで心を込めてお作りします。", "vi": "Được chế biến trực tiếp tại bàn."}},
      {"price": 450000, "name": {"ko": "새우전", "en": "Shrimp pancake (saeujeon)", "zh": "虾煎饼", "ja": "エビのチヂミ", "vi": "Bánh tôm"}, "desc": {"ko": "테이블 자리에서 정성껏 만들어드립니다.", "en": "Made fresh at your table.", "zh": "在餐桌旁为您精心现做。", "ja": "テーブルで心を込めてお作りします。", "vi": "Được chế biến trực tiếp tại bàn."}},
      {"price": 500000, "name": {"ko": "관자전", "en": "Scallop pancake (gwanjajeon)", "zh": "扇贝煎饼", "ja": "帆立のチヂミ", "vi": "Bánh sò điệp"}, "desc": {"ko": "테이블 자리에서 정성껏 만들어드립니다.", "en": "Made fresh at your table.", "zh": "在餐桌旁为您精心现做。", "ja": "テーブルで心を込めてお作りします。", "vi": "Được chế biến trực tiếp tại bàn."}},
      {"price": 700000, "photo": "img/jeon-mix.jpg", "name": {"ko": "모둠전", "en": "Assorted pancakes (modumjeon)", "zh": "什锦煎饼", "ja": "チヂミ盛り合わせ", "vi": "Bánh thập cẩm"}, "desc": {"ko": "테이블 자리에서 정성껏 만들어드립니다.", "en": "Made fresh at your table.", "zh": "在餐桌旁为您精心现做。", "ja": "テーブルで心を込めてお作りします。", "vi": "Được chế biến trực tiếp tại bàn."}},
      {"price": 350000, "photo": "img/haemulpajeon.jpg", "name": {"ko": "해물파전", "en": "Seafood scallion pancake (haemul pajeon)", "zh": "海鲜葱煎饼", "ja": "海鮮ネギチヂミ", "vi": "Bánh Hành Hải Sản"}},
      {"price": 350000, "name": {"ko": "해물김치전", "en": "Seafood kimchi pancake", "zh": "海鲜泡菜煎饼", "ja": "海鮮キムチチヂミ", "vi": "Bánh kim chi hải sản"}},
    ],
  },
  {
    id: "dish",
    name: {"ko": "요리류", "en": "Korean dishes", "zh": "韩式料理", "ja": "韓国料理", "vi": "Món ăn Hàn Quốc"},
    items: [
      {"price": null, "photo": "img/makhoe.jpg", "name": {"ko": "막회", "en": "Raw fish salad (makhoe)", "zh": "生鱼片拌菜", "ja": "刺身の和え物(マッフェ)", "vi": "Gỏi cá sống"}, "sizes": [["M", 500000], ["L", 800000]]},
      {"price": 650000, "name": {"ko": "홍어", "en": "Fermented skate (hongeo)", "zh": "发酵鳐鱼", "ja": "ホンオ(発酵エイ)", "vi": "Cá đuối lên men"}},
      {"price": 450000, "name": {"ko": "오징어초무침", "en": "Squid in spicy vinegar dressing (ojingeo chomuchim)", "zh": "醋拌鱿鱼", "ja": "イカの酢和え(ピリ辛)", "vi": "Mực trộn cay"}, "spicy": true},
      {"price": 550000, "name": {"ko": "모둠생선구이 (고등어, 갈치)", "en": "Assorted grilled fish (mackerel, cutlassfish)", "zh": "烤什锦鱼(青花鱼、带鱼)", "ja": "焼き魚盛り合わせ(サバ、太刀魚)", "vi": "Cá nướng thập cẩm (cá thu, cá hố)"}},
      {"price": 450000, "name": {"ko": "골뱅이무침", "en": "Spicy whelk salad (golbaengi muchim)", "zh": "辣拌海螺", "ja": "つぶ貝のピリ辛和え(コルベンイ)", "vi": "Ốc Cay Trộn"}, "spicy": true},
      {"price": 600000, "photo": "img/mandu-jeongol.jpg", "name": {"ko": "김치손만두전골", "en": "Kimchi handmade dumpling hot pot", "zh": "泡菜手工饺子火锅", "ja": "キムチ手作り餃子鍋", "vi": "Lẩu mandu kim chi"}},
      {"price": 750000, "name": {"ko": "불고기손만두전골", "en": "Bulgogi handmade dumpling hot pot", "zh": "烤肉手工饺子火锅", "ja": "プルコギ手作り餃子鍋", "vi": "Lẩu mandu bulgogi"}},
    ],
  },
  {
    id: "meat",
    name: {"ko": "고기", "en": "Meat", "zh": "肉类", "ja": "お肉", "vi": "Thịt"},
    items: [
      {"price": 450000, "photo": "img/la-galbi.jpg", "name": {"ko": "LA갈비", "en": "LA-style beef short ribs (LA galbi)", "zh": "LA牛排骨", "ja": "LAカルビ", "vi": "Sườn Bò LA"}},
      {"price": 350000, "photo": "img/garlic-galbi.jpg", "name": {"ko": "마늘듬뿍 양념소갈비살", "en": "Garlic-marinated beef short rib meat", "zh": "蒜香腌制牛小排肉", "ja": "ニンニクたっぷり味付け牛カルビ肉", "vi": "Sườn Bò Nướng Ướp Tỏi"}},
      {"price": 280000, "photo": "img/pork-galbi.jpg", "name": {"ko": "(뼈)돼지갈비", "en": "Pork ribs (bone-in)", "zh": "猪排骨(带骨)", "ja": "豚カルビ(骨付き)", "vi": "Sườn Heo Nướng (Có Xương)"}},
      {"price": 500000, "photo": "img/suyuk.jpg", "name": {"ko": "수육", "en": "Boiled pork slices (suyuk)", "zh": "白切肉(水煮猪肉)", "ja": "ゆで豚(スユク)", "vi": "Thịt Luộc"}},
    ],
  },
  {
    id: "meal",
    name: {"ko": "식사", "en": "Meals", "zh": "主食餐点", "ja": "お食事", "vi": "Món ăn"},
    items: [
      {"price": 250000, "photo": "img/kkomak.jpg", "name": {"ko": "꼬막비빔밥정식", "en": "Cockle bibimbap set meal", "zh": "蚶子拌饭套餐", "ja": "コマク(赤貝に似た貝)ビビンバ定食", "vi": "Cơm Trộn Sò Huyết"}},
      {"price": 240000, "name": {"ko": "제육쌈밥정식", "en": "Spicy stir-fried pork ssam rice set meal", "zh": "辣炒猪肉包饭套餐", "ja": "豚肉のピリ辛炒めサムパプ定食", "vi": "Cơm thịt heo xào cay"}, "spicy": true},
      {"price": 260000, "name": {"ko": "(뼈)돼지갈비정식", "en": "Pork ribs (bone-in) set meal", "zh": "猪排骨(带骨)套餐", "ja": "豚カルビ(骨付き)定食", "vi": "Cơm Sườn Heo Nướng"}},
      {"price": 250000, "photo": "img/mackerel.jpg", "name": {"ko": "고등어구이정식", "en": "Grilled mackerel set meal", "zh": "烤青花鱼套餐", "ja": "サバ焼き定食", "vi": "Cá Thu Nướng"}},
      {"price": 250000, "name": {"ko": "고등어조림정식", "en": "Braised mackerel set meal", "zh": "红烧青花鱼套餐", "ja": "サバの煮付け定食", "vi": "Cá Thu Kho"}},
      {"price": 250000, "name": {"ko": "갈치구이정식", "en": "Grilled cutlassfish set meal", "zh": "烤带鱼套餐", "ja": "太刀魚焼き定食", "vi": "Cá Hố Nướng"}},
      {"price": 250000, "name": {"ko": "갈치조림정식", "en": "Braised cutlassfish set meal", "zh": "红烧带鱼套餐", "ja": "太刀魚の煮付け定食", "vi": "Cá Hố Kho"}},
      {"price": 300000, "photo": "img/haemul-kalguksu.jpg", "name": {"ko": "해물칼국수", "en": "Seafood kalguksu (knife-cut noodle soup)", "zh": "海鲜刀削面汤", "ja": "海鮮カルグクス", "vi": "Mỳ Hải Sản"}},
      {"price": 180000, "name": {"ko": "시골칼국수", "en": "Country-style kalguksu (knife-cut noodle soup)", "zh": "乡村刀削面汤", "ja": "田舎風カルグクス", "vi": "Mỳ Cắt Truyền Thống"}},
      {"price": 200000, "name": {"ko": "들깨수제비", "en": "Perilla seed sujebi (hand-torn dough soup)", "zh": "紫苏籽面片汤", "ja": "エゴマスジェビ(手ちぎりすいとん)", "vi": "Sujebi Súp Tia Tô"}},
      {"price": 180000, "name": {"ko": "콩나물국밥", "en": "Bean sprout rice soup (kongnamul gukbap)", "zh": "豆芽汤饭", "ja": "もやしクッパ", "vi": "Cơm Canh Giá Đỗ"}},
      {"price": 200000, "name": {"ko": "해물된장찌개", "en": "Seafood soybean paste stew (doenjang jjigae)", "zh": "海鲜大酱汤", "ja": "海鮮テンジャンチゲ", "vi": "Canh Tương Đậu Hải Sản"}},
    ],
  },
  {
    id: "drink",
    name: {"ko": "주류", "en": "Drinks", "zh": "酒类", "ja": "お酒", "vi": "Đồ cồn"},
    items: [
      {"price": 60000, "name": {"ko": "맥주 (사이공, 타이거, 타이거크리스탈)", "en": "Beer (Saigon, Tiger, Tiger Crystal)", "zh": "啤酒 (Saigon、Tiger、Tiger Crystal)", "ja": "ビール (Saigon、Tiger、Tiger Crystal)", "vi": "Bia (Sài Gòn, Tiger, Tiger Crystal)"}},
      {"price": 160000, "name": {"ko": "소주 (참이슬 후레쉬, 처음처럼, 이즈백, 새로)", "en": "Soju (Chamisul Fresh, Chum Churum, Jinro Is Back, Saero)", "zh": "烧酒 (Chamisul Fresh、Chum Churum、Jinro Is Back、Saero)", "ja": "焼酎 (Chamisul Fresh、Chum Churum、Jinro Is Back、Saero)", "vi": "Rượu Soju (Chamisul, Chum Churum, Jinro Is Back, Saero)"}},
      {"price": 500000, "name": {"ko": "화요17", "en": "Hwayo 17", "zh": "Hwayo 17", "ja": "Hwayo 17", "vi": "Rượu Hwayo 17"}},
      {"price": 800000, "name": {"ko": "화요25", "en": "Hwayo 25", "zh": "Hwayo 25", "ja": "Hwayo 25", "vi": "Rượu Hwayo 25"}},
      {"price": 850000, "name": {"ko": "일품 진로", "en": "Ilpum Jinro", "zh": "Ilpum Jinro", "ja": "Ilpum Jinro", "vi": "Ilpum Jinro"}},
      {"price": 450000, "name": {"ko": "복분자", "en": "Bokbunja (Korean black raspberry wine)", "zh": "覆盆子酒(Bokbunja)", "ja": "覆盆子酒(ポクプンジャ)", "vi": "Rượu Bokbunja (Rượu mâm xôi)"}},
      {"price": 200000, "name": {"ko": "막걸리", "en": "Makgeolli (Korean rice wine)", "zh": "马格利(韩国米酒)", "ja": "マッコリ(韓国のお米のお酒)", "vi": "Rượu gạo Hàn Quốc (Makgeolli)"}},
      {"price": 150000, "name": {"ko": "보드카", "en": "Vodka", "zh": "伏特加", "ja": "ウォッカ", "vi": "Vodka"}},
    ],
  },
  {
    id: "bev",
    name: {"ko": "음료", "en": "Beverage", "zh": "饮料", "ja": "ソフトドリンク", "vi": "Nước uống"},
    items: [
      {"price": 30000, "name": {"ko": "콜라", "en": "Coca Cola", "zh": "Coca Cola", "ja": "Coca Cola", "vi": "Coca Cola"}},
      {"price": 30000, "name": {"ko": "스프라이트", "en": "Sprite", "zh": "Sprite", "ja": "Sprite", "vi": "Sprite"}},
      {"price": 50000, "name": {"ko": "진로 토닉 워터", "en": "Jinro Tonic Water", "zh": "Jinro 汤力水", "ja": "Jinro トニックウォーター", "vi": "Nước Tonic Jinro"}},
    ],
  },
];
