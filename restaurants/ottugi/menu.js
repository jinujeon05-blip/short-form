// 오뚜기식당 OTTUGI (간판 오뚜기식당 OTTUGI · Ngõ 179 Đ. Đình Thôn, Từ Liêm, Hà Nội) 메뉴 데이터 — 한국식 고기구이(삼겹살·한우차돌·육회·찌개)
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/오뚜기식당"(사진 수집기 v1.6) — 메뉴판 사진은 손님이 올린 것(가게 계정 사진은 음식 1·매장 2장뿐).
// 가격표가 두 가지(2026-10-23 사용자 선택: **새 가격표**): 새 가격표 = 베트남어 고기 메뉴 menu_05 + 일본어 menu_07(고기·주류·음료)·menu_08(추가 메뉴),
// 옛 가격표 = 한국어 차림표 menu_01·03 + 베트남어 menu_04(고기 돈차돌 180,000·꽃항정 180,000·생삼겹살 한판 600,000·반판 300,000, 김치찌개 90,000 등).
// 옛 차림표에만 있던 항목(점심 오뚜기 찌개 백반 150,000, 구이추가메뉴 미나리·버섯 등, 식사메뉴 활 바지락 칼국수·비빔 칼국수·진주 물냉면 150,000)은 새 가격표에 없어 뺐다 — docs/todo.md.
// 항목 이름은 한국어 차림표(menu_01) 순서대로 일본어·베트남어 메뉴와 1:1로 맞춤. 항목 사진은 손님이 올린 음식 사진(food_*)에서 확실히 맞는 것만 씀.
window.RESTAURANT = {
  brand: { ko: "오뚜기식당", en: "Ottugi", branch: { ko: "하노이", en: "Hà Nội" } },
  phone: "0942 441 531",
  address: "Ngõ 179 Đ. Đình Thôn, Đình Thôn, Từ Liêm, Hà Nội",
  mapQuery: "오뚜기식당 OTTUGI Ngõ 179 Đình Thôn Từ Liêm Hà Nội",
  mapUrl: "https://www.google.com/maps/place/%EC%98%A4%EB%9A%9C%EA%B8%B0%EC%8B%9D%EB%8B%B9/@21.0176922,105.7768856,17z/data=!3m1!4b1!4m6!3m5!1s0x313455d03ec58205:0x71326178eea1de3!8m2!3d21.0176922!4d105.7768856!16s%2Fg%2F11l5dldgzw",
  wifi: null, // 예: { ssid: "OTTUGI", password: "12345678" }
};

window.MENU = [
  {
    id: "meat",
    name: {"ko": "고기 메뉴", "en": "Meat Menu", "zh": "肉类菜单", "ja": "肉メニュー", "vi": "Thịt"},
    note: {"ko": "첫 주문은 1판 또는 2인분 이상이에요.", "en": "*First order: 1 tray or at least 2 servings", "zh": "*首次点单需1盘或2人份以上", "ja": "*初回注文:1皿または2人前以上〜", "vi": "*Khi order lần đầu phải gọi 1 khay hoặc 2 phần trở lên"},
    items: [
      {"price": 180000, "unit": "150g", "name": {"ko": "냉동 삼겹살", "en": "Frozen Pork Belly (Samgyeopsal)", "zh": "冷冻五花肉", "ja": "冷凍サムギョプサル", "vi": "Thịt Ba Chỉ Đông Lạnh"}},
      {"price": 200000, "photo": "img/kkot-daepae.jpg", "unit": "150g", "name": {"ko": "꽃 대패 삼겹살", "en": "Thinly Sliced Pork Belly (Kkot Daepae Samgyeopsal)", "zh": "花刨片五花肉", "ja": "花サムギョプサル", "vi": "Thịt Ba Chỉ Hoa"}},
      {"price": 180000, "unit": "150g", "name": {"ko": "돈차돌", "en": "Don-chadol (pork)", "zh": "Don-chadol(猪肉)", "ja": "豚カタバラ", "vi": "Thịt Gáy"}},
      {"price": 220000, "unit": "150g", "name": {"ko": "꽃항정", "en": "Pork Jowl (Kkot Hangjeong)", "zh": "花颈肉(Kkot-hangjeong)", "ja": "豚トロ", "vi": "Thịt Má"}},
      {"price": 380000, "unit": "150g", "name": {"ko": "1++ 한우차돌", "en": "1++ Korean Beef Chadol (Hanwoo brisket)", "zh": "1++韩牛牛腩片(Chadol)", "ja": "1++韓牛肩バラ", "vi": "1++ Thịt Gầu Bò Hàn Quốc"}},
      {"price": 680000, "photo": "img/saeng-samgyeop.jpg", "unit": "500g", "name": {"ko": "생 삼겹살 한판", "en": "Fresh Pork Belly (Full Tray)", "zh": "鲜五花肉(整盘)", "ja": "生サムギョプサル", "vi": "Thịt Ba Chỉ Tươi (Một Khay)"}},
      {"price": 340000, "unit": "250g", "name": {"ko": "추가 반판", "en": "Extra Half Tray", "zh": "加量半盘", "ja": "追加", "vi": "Gọi Thêm (Nửa Khay)"}},
    ],
  },
  {
    id: "extra",
    name: {"ko": "추가 메뉴", "en": "Extra Menu", "zh": "加购菜单", "ja": "追加メニュー", "vi": "Món gọi thêm"},
    items: [
      {"price": 280000, "photo": "img/yukhoe.jpg", "unit": "150g", "name": {"ko": "영천식 육회", "en": "Yeongcheon-style Yukhoe (marinated raw beef)", "zh": "永川式生拌牛肉(Yukhoe)", "ja": "ユッケ", "vi": "Thịt bò sống trộn kiểu Yeongcheon (Yukhoe)"}, "desc": {"ko": "신선한 소고기를 향신료에 재운 요리", "en": "Fresh beef marinated in spices", "zh": "用香料腌制的新鲜牛肉料理", "ja": "新鮮な牛肉をスパイスでマリネした料理", "vi": "Món thịt bò tươi ướp gia vị"}},
      {"price": 380000, "unit": "150g", "name": {"ko": "대구식 뭉티기", "en": "Daegu-style Mungtigi (raw beef)", "zh": "大邱式生牛肉片(Mungtigi)", "ja": "ムンティギ", "vi": "Thịt bò sống kiểu Daegu (Mungtigi)"}, "desc": {"ko": "생소고기를 고춧가루로 만든 디핑소스와 함께 드세요", "en": "Enjoy raw beef with a dipping sauce made from chili powder", "zh": "生牛肉搭配辣椒粉调制的蘸酱食用", "ja": "生牛肉をチリパウダーから作ったディップソースでいただきます。", "vi": "Thưởng thức thịt bò sống cùng nước chấm làm từ bột ớt"}},
      {"price": 180000, "name": {"ko": "김치찌개", "en": "Kimchi Stew (Kimchi Jjigae)", "zh": "泡菜汤(Kimchi jjigae)", "ja": "キムチチゲ", "vi": "Canh kim chi (Kimchi jjigae)"}},
      {"price": 180000, "name": {"ko": "된장찌개", "en": "Soybean Paste Stew (Doenjang Jjigae)", "zh": "大酱汤(Doenjang jjigae)", "ja": "味噌チゲ", "vi": "Canh tương đậu (Doenjang jjigae)"}},
      {"price": 80000, "name": {"ko": "냄비 라면", "en": "Pot Ramyeon (Korean instant noodles)", "zh": "锅煮拉面", "ja": "韓国風ラーメン", "vi": "Mì cay Hàn Quốc nấu nồi"}},
      {"price": 80000, "name": {"ko": "짜파게티", "en": "Chapaghetti (black bean instant noodles)", "zh": "炸酱拌面(Chapaghetti)", "ja": "チャパゲティ", "vi": "Mì tương đen Chapaghetti"}},
      {"price": 80000, "name": {"ko": "팔도 비빔면", "en": "Paldo Bibim Myeon (spicy cold mixed noodles)", "zh": "八道拌面(Paldo Bibim Myeon)", "ja": "パルドビビン麺", "vi": "Mì trộn Paldo (Bibim myeon)"}},
      {"price": 80000, "name": {"ko": "볶음밥", "en": "Fried Rice (Bokkeumbap)", "zh": "炒饭", "ja": "チャーハン", "vi": "Cơm chiên"}},
      {"price": 80000, "name": {"ko": "치즈 볶음밥", "en": "Cheese Fried Rice", "zh": "芝士炒饭", "ja": "チーズチャーハン", "vi": "Cơm chiên phô mai"}},
      {"price": 80000, "photo": "img/cheese-gamjajeon.jpg", "name": {"ko": "치즈 감자전", "en": "Cheese Potato Pancake (Gamjajeon)", "zh": "芝士土豆饼", "ja": "チーズチヂミ", "vi": "Bánh khoai tây phô mai (Gamjajeon)"}},
      {"price": 80000, "name": {"ko": "추억의 팥빙수", "en": "Nostalgic Red Bean Shaved Ice (Patbingsu)", "zh": "怀旧红豆刨冰(Patbingsu)", "ja": "韓国風かき氷", "vi": "Bingsu đậu đỏ hoài niệm (Patbingsu)"}},
      {"price": 0, "name": {"ko": "공기밥", "en": "Steamed Rice", "zh": "米饭", "ja": "ライス", "vi": "Cơm trắng"}},
    ],
  },
  {
    id: "drink",
    name: {"ko": "주류", "en": "Alcoholic Drinks", "zh": "酒类", "ja": "飲み物メニュー(酒類)", "vi": "Đồ uống có cồn"},
    items: [
      {"price": 150000, "name": {"ko": "참이슬 (소주)", "en": "Chamisul (Soju)", "zh": "Chamisul(烧酒)", "ja": "チャミスル(焼酎)", "vi": "Chamisul (Soju)"}},
      {"price": 150000, "name": {"ko": "진로 (소주)", "en": "Jinro (Soju)", "zh": "Jinro(烧酒)", "ja": "ジンロ(焼酎)", "vi": "Jinro (Soju)"}},
      {"price": 150000, "name": {"ko": "처음처럼 (소주)", "en": "Chum Churum (Soju)", "zh": "Chum Churum(烧酒)", "ja": "チュムチュルム(焼酎)", "vi": "Chum Churum (Soju)"}},
      {"price": 150000, "name": {"ko": "제로 (소주)", "en": "Zero (Soju)", "zh": "Zero(烧酒)", "ja": "ゼロ(焼酎)", "vi": "Zero (Soju)"}},
      {"price": 150000, "name": {"ko": "좋은데이 (소주)", "en": "Good Day (Soju)", "zh": "Good Day(烧酒)", "ja": "良い一日(焼酎)", "vi": "Good Day (Soju)"}},
      {"price": 160000, "name": {"ko": "쌀술", "en": "Rice Wine", "zh": "米酒", "ja": "米酒", "vi": "Rượu gạo"}},
      {"price": 140000, "name": {"ko": "보드카맨", "en": "Vodka Men", "zh": "Vodka Men", "ja": "ウォッカメン", "vi": "Vodka Men"}},
      {"price": 120000, "name": {"ko": "하이볼", "en": "Highball", "zh": "高球鸡尾酒(Highball)", "ja": "ハイボール", "vi": "Highball"}},
      {"price": 50000, "name": {"ko": "타이거 맥주", "en": "Tiger (Beer)", "zh": "Tiger(啤酒)", "ja": "タイガー(ビール)", "vi": "Tiger (Bia)"}},
      {"price": 50000, "name": {"ko": "사이공 맥주", "en": "Saigon (Beer)", "zh": "Saigon(啤酒)", "ja": "サイゴン(ビール)", "vi": "Saigon (Bia)"}},
    ],
  },
  {
    id: "bev",
    name: {"ko": "음료", "en": "Soft Drinks", "zh": "饮料", "ja": "ソフトドリンク", "vi": "Nước giải khát"},
    items: [
      {"price": 20000, "name": {"ko": "콜라", "en": "Coca Cola", "zh": "Coca Cola(可乐)", "ja": "コカ・コーラ", "vi": "Coca Cola"}},
      {"price": 20000, "name": {"ko": "스프라이트", "en": "Sprite", "zh": "Sprite(雪碧)", "ja": "スプライト", "vi": "Sprite"}},
    ],
  },
];
