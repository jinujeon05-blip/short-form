// 왕대포 꼬치구이 WANG DEA PHO (미딩점, 16 P. Trần Văn Lai, Từ Liêm, Hà Nội) 메뉴 데이터
// 출처: 구글 지도에 손님이 올린 메뉴판 사진(2026-10-28 수집, 올린 날짜 모름). 판이 세 가지:
//   새 판(지도 '메뉴' 탭 menu_01~04, 양꼬치 250,000) — 꼬치·닭·마라·세트는 이것
//   중간 판(menu_05·06·12, 양꼬치 220,000)·옛 판(menu_09, 190,000) — 새 판 사진이 없는 구이·볶음은 여기서
//   같은 메뉴가 판마다 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
//   menu_14(명함형 전체 목록)는 가격이 없어 무침·주식류는 뺌. 짝태는 가격이 손가락에 가려 뺌
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만 — 정사각형이면 양옆 흰 여백)
window.RESTAURANT = {
  brand: { ko: "왕대포 꼬치구이", en: "WANG DEA PHO" },
  phone: "032 7800 789",
  address: "16 P. Trần Văn Lai, Từ Liêm, Hà Nội",
  wifi: null,
};

window.MENU = [
  {
    id: "kkochi",
    name: { ko: "양꼬치 · 소갈비살 꼬치", en: "Lamb & Beef Short Rib Skewers", zh: "羊肉串 · 牛肋条串", ja: "ラム串 · 牛カルビ串", vi: "Xiên cừu · Xiên dẻ sườn bò" },
    note: { ko: "10꼬치 1인분", en: "10 skewers per serving", zh: "每份10串", ja: "10本 / 1人前", vi: "10 xiên / 1 phần" },
    items: [
      { price: 250000, photo: "img/yang-kkochi.jpg", name: { ko: "양꼬치", en: "Lamb Skewers (Yang-kkochi)", zh: "羊肉串", ja: "ラム串 (ヤンコチ)", vi: "Thịt cừu xiên nướng" } },
      { price: 270000, name: { ko: "특색 양꼬치", en: "Special Lamb Skewers", zh: "特色羊肉串", ja: "特製ラム串", vi: "Cừu đặc biệt xiên nướng" } },
      { price: 270000, name: { ko: "양갈비살 꼬치", en: "Lamb Rib Meat Skewers", zh: "羊肋条串", ja: "ラムカルビ串", vi: "Dẻ sườn cừu xiên nướng" } },
      { price: 260000, spicy: true, name: { ko: "마라 양꼬치", en: "Mala Lamb Skewers", zh: "麻辣羊肉串", ja: "麻辣ラム串", vi: "Thịt cừu xiên nướng cay tê" } },
      { price: 260000, name: { ko: "카레 양꼬치", en: "Curry Lamb Skewers", zh: "咖喱羊肉串", ja: "カレーラム串", vi: "Thịt cừu Cari xiên nướng" } },
      { price: 260000, name: { ko: "소갈비살 꼬치", en: "Beef Short Rib Skewers", zh: "牛肋条串", ja: "牛カルビ串", vi: "Dẻ sườn bò xiên nướng" } },
      { price: 270000, name: { ko: "양념 소갈비살 꼬치", en: "Marinated Beef Short Rib Skewers", zh: "腌制牛肋条串", ja: "味付け牛カルビ串", vi: "Dẻ sườn bò sốt xiên nướng" } },
      { price: 270000, spicy: true, name: { ko: "매운양념 소갈비살 꼬치", en: "Spicy Marinated Beef Short Rib Skewers", zh: "香辣腌制牛肋条串", ja: "辛口味付け牛カルビ串", vi: "Bò sốt cay" } },
      { price: 270000, spicy: true, name: { ko: "마라 소갈비살 꼬치", en: "Mala Beef Short Rib Skewers", zh: "麻辣牛肋条串", ja: "麻辣牛カルビ串", vi: "Dẻ sườn bò xiên nướng cay tê" } },
    ],
  },
  {
    id: "chicken",
    name: { ko: "닭 꼬치", en: "Chicken Skewers", zh: "鸡肉串", ja: "鶏串", vi: "Xiên gà nướng" },
    items: [
      { price: 180000, desc: { ko: "10꼬치 1인분", en: "10 skewers per serving", zh: "每份10串", ja: "10本 / 1人前", vi: "10 xiên / 1 phần" }, name: { ko: "닭꼬치", en: "Chicken Skewers (Dak-kkochi)", zh: "鸡肉串", ja: "焼き鳥 (タッコチ)", vi: "Thịt gà xiên nướng" } },
      { price: 180000, desc: { ko: "10꼬치 1인분", en: "10 skewers per serving", zh: "每份10串", ja: "10本 / 1人前", vi: "10 xiên / 1 phần" }, name: { ko: "닭연골", en: "Chicken Cartilage (Dak-yeongol)", zh: "鸡软骨", ja: "鶏の軟骨 (タギョンゴル)", vi: "Sụn gà nướng" } },
      { price: 200000, desc: { ko: "10꼬치 1인분", en: "10 skewers per serving", zh: "每份10串", ja: "10本 / 1人前", vi: "10 xiên / 1 phần" }, name: { ko: "닭가슴 오돌뼈", en: "Chicken Breast Cartilage (Odolppyeo)", zh: "鸡胸脆骨", ja: "鶏むね軟骨 (オドルッピョ)", vi: "Sụn ức gà nướng" } },
      { price: 80000, desc: { ko: "5꼬치 1인분", en: "5 skewers per serving", zh: "每份5串", ja: "5本 / 1人前", vi: "5 xiên / 1 phần" }, name: { ko: "닭심장", en: "Chicken Hearts (Dak-simjang)", zh: "鸡心", ja: "鶏ハツ (タクシムジャン)", vi: "Tim gà xiên nướng" } },
      { price: 80000, desc: { ko: "5꼬치 1인분", en: "5 skewers per serving", zh: "每份5串", ja: "5本 / 1人前", vi: "5 xiên / 1 phần" }, name: { ko: "닭똥집", en: "Chicken Gizzards (Dak-ttongjip)", zh: "鸡胗", ja: "砂肝 (タクトンジプ)", vi: "Mề gà nướng" } },
      { price: 100000, desc: { ko: "2꼬치 1인분", en: "2 skewers per serving", zh: "每份2串", ja: "2本 / 1人前", vi: "2 xiên / 1 phần" }, name: { ko: "닭날개", en: "Chicken Wings (Dak-nalgae)", zh: "鸡翅", ja: "手羽先 (タンナルゲ)", vi: "Cánh gà nướng" } },
      { price: 100000, desc: { ko: "5꼬치 1인분", en: "5 skewers per serving", zh: "每份5串", ja: "5本 / 1人前", vi: "5 xiên / 1 phần" }, name: { ko: "닭발구이", en: "Grilled Chicken Feet (Dakbal-gui)", zh: "烤鸡爪", ja: "鶏足の串焼き (タッパルグイ)", vi: "Chân gà xiên nướng" } },
    ],
  },
  {
    id: "grill",
    name: { ko: "구이", en: "Grilled Dishes", zh: "烧烤", ja: "焼き物", vi: "Món nướng" },
    items: [
      { price: 400000, desc: { ko: "300g 1인분", en: "300g per serving", zh: "每份300克", ja: "300g / 1人前", vi: "300g / 1 phần" }, name: { ko: "양갈비", en: "Lamb Ribs (Yang-galbi)", zh: "羊排", ja: "ラムリブ (ヤンカルビ)", vi: "Dẻ sườn cừu nướng" } },
      { price: 450000, desc: { ko: "300g 1인분", en: "300g per serving", zh: "每份300克", ja: "300g / 1人前", vi: "300g / 1 phần" }, name: { ko: "LA갈비", en: "LA-style Beef Ribs (LA Galbi)", zh: "LA牛排骨", ja: "LAカルビ", vi: "Sườn bò LA" } },
      { price: 650000, desc: { ko: "250g 1인분", en: "250g per serving", zh: "每份250克", ja: "250g / 1人前", vi: "250g / 1 phần" }, name: { ko: "꽃살", en: "Beef Chuck Flap (Kkotsal)", zh: "牛肩胛花肉", ja: "牛フラップミート (コッサル)", vi: "Sườn bò nướng" } },
      { price: 380000, name: { ko: "장어구이", en: "Grilled Eel (Jangeo-gui)", zh: "烤鳗鱼", ja: "うなぎの蒲焼き (チャンオグイ)", vi: "Lươn nướng" } },
      { price: 250000, desc: { ko: "10꼬치 1인분", en: "10 skewers per serving", zh: "每份10串", ja: "10本 / 1人前", vi: "10 xiên / 1 phần" }, name: { ko: "소곱창 꼬치", en: "Beef Small Intestine Skewers (So-gopchang)", zh: "牛小肠串", ja: "牛小腸串 (ソコプチャン)", vi: "Lòng bò non" } },
      { price: 250000, desc: { ko: "10꼬치 1인분", en: "10 skewers per serving", zh: "每份10串", ja: "10本 / 1人前", vi: "10 xiên / 1 phần" }, name: { ko: "소대창 꼬치", en: "Beef Large Intestine Skewers (So-daechang)", zh: "牛大肠串", ja: "牛大腸串 (ソデチャン)", vi: "Lòng bò nướng" } },
      { price: 180000, photo: "img/samgyeop-kkochi.jpg", desc: { ko: "10꼬치 1인분", en: "10 skewers per serving", zh: "每份10串", ja: "10本 / 1人前", vi: "10 xiên / 1 phần" }, name: { ko: "삼겹살 꼬치", en: "Pork Belly Skewers (Samgyeopsal-kkochi)", zh: "五花肉串", ja: "豚バラ串 (サムギョプサルコチ)", vi: "Ba chỉ lợn xiên nướng" } },
      { price: 150000, desc: { ko: "4꼬치 1인분", en: "4 skewers per serving", zh: "每份4串", ja: "4本 / 1人前", vi: "4 xiên / 1 phần" }, name: { ko: "우삼겹 부추말이", en: "Beef Belly Wrapped Chives", zh: "肥牛韭菜卷", ja: "牛バラのニラ巻き", vi: "Ba chỉ bò cuộn hẹ" } },
      { price: 150000, desc: { ko: "4꼬치 1인분", en: "4 skewers per serving", zh: "每份4串", ja: "4本 / 1人前", vi: "4 xiên / 1 phần" }, name: { ko: "우삼겹 팽이버섯말이", en: "Beef Belly Wrapped Enoki Mushrooms", zh: "肥牛金针菇卷", ja: "牛バラのえのき巻き", vi: "Ba chỉ bò cuộn nấm kim" } },
      { price: 100000, desc: { ko: "5꼬치 1인분", en: "5 skewers per serving", zh: "每份5串", ja: "5本 / 1人前", vi: "5 xiên / 1 phần" }, name: { ko: "소힘줄", en: "Beef Tendon Skewers (So-himjul)", zh: "牛蹄筋串", ja: "牛スジ串 (ソヒムジュル)", vi: "Gân bò xiên nướng" } },
      { price: 250000, desc: { ko: "10꼬치 1인분", en: "10 skewers per serving", zh: "每份10串", ja: "10本 / 1人前", vi: "10 xiên / 1 phần" }, name: { ko: "새우꼬치", en: "Shrimp Skewers (Saeu-kkochi)", zh: "虾串", ja: "エビ串 (セウコチ)", vi: "Xiên tôm nướng" } },
      { price: 160000, desc: { ko: "5꼬치 1인분", en: "5 skewers per serving", zh: "每份5串", ja: "5本 / 1人前", vi: "5 xiên / 1 phần" }, name: { ko: "쭈꾸미구이", en: "Grilled Baby Octopus (Jjukkumi-gui)", zh: "烤小章鱼", ja: "イイダコ焼き (ッチュクミグイ)", vi: "Mực xiên nướng" } },
      { price: 120000, desc: { ko: "5꼬치 1인분", en: "5 skewers per serving", zh: "每份5串", ja: "5本 / 1人前", vi: "5 xiên / 1 phần" }, name: { ko: "오징어꼬치", en: "Squid Skewers (Ojingeo-kkochi)", zh: "鱿鱼串", ja: "イカ串 (オジンオコチ)", vi: "Mực xiên nướng" } },
    ],
  },
  {
    id: "veg",
    name: { ko: "채소 · 버섯 꼬치", en: "Vegetable & Mushroom Skewers", zh: "蔬菜 · 蘑菇串", ja: "野菜 · きのこ串", vi: "Xiên rau · nấm nướng" },
    note: { ko: "5꼬치 1인분", en: "5 skewers per serving", zh: "每份5串", ja: "5本 / 1人前", vi: "5 xiên / 1 phần" },
    items: [
      { price: 70000, name: { ko: "팽이버섯 구이", en: "Grilled Enoki Mushrooms", zh: "烤金针菇", ja: "えのき焼き", vi: "Nấm kim châm nướng" } },
      { price: 70000, name: { ko: "표고버섯 꼬치", en: "Shiitake Mushroom Skewers", zh: "香菇串", ja: "しいたけ串", vi: "Nấm hương nướng" } },
      { price: 70000, name: { ko: "새송이버섯 꼬치", en: "King Oyster Mushroom Skewers", zh: "杏鲍菇串", ja: "エリンギ串", vi: "Nấm đùi gà nướng" } },
      { price: 70000, name: { ko: "가지구이 꼬치", en: "Grilled Eggplant Skewers", zh: "烤茄子串", ja: "焼きなす串", vi: "Cà tím xiên nướng" } },
      { price: 70000, name: { ko: "마늘쫑 꼬치", en: "Garlic Scape Skewers", zh: "蒜薹串", ja: "ニンニクの芽串", vi: "Ngồng tỏi" } },
      { price: 70000, name: { ko: "감자구이", en: "Grilled Potato Skewers", zh: "烤土豆串", ja: "じゃがいも串焼き", vi: "Khoai tây nướng" } },
      { price: 70000, name: { ko: "줄기콩 꼬치", en: "Green Bean Skewers", zh: "四季豆串", ja: "さやいんげん串", vi: "Đậu cô ve nướng" } },
      { price: 70000, name: { ko: "부추구이", en: "Grilled Chives", zh: "烤韭菜", ja: "ニラ焼き", vi: "Hẹ nướng" } },
      { price: 80000, name: { ko: "건두부 고수말이", en: "Dried Tofu Wrapped Cilantro", zh: "干豆腐香菜卷", ja: "干し豆腐のパクチー巻き", vi: "Váng đậu cuộn rau mùi" } },
      { price: 80000, name: { ko: "건두부 팽이버섯말이", en: "Dried Tofu Wrapped Enoki Mushrooms", zh: "干豆腐金针菇卷", ja: "干し豆腐のえのき巻き", vi: "Váng đậu cuộn nấm kim" } },
    ],
  },
  {
    id: "mala",
    name: { ko: "마라 요리", en: "Mala Dishes", zh: "麻辣料理", ja: "麻辣料理", vi: "Món cay tê" },
    items: [
      { price: 450000, spicy: true, name: { ko: "마라롱샤", en: "Mala Crayfish (Mala Longxia)", zh: "麻辣小龙虾", ja: "麻辣ザリガニ (マーラーロンシャ)", vi: "Tôm hùm đất xào cay tê" } },
      { price: 450000, spicy: true, name: { ko: "마라 새우", en: "Mala Shrimp", zh: "麻辣虾", ja: "麻辣エビ", vi: "Tôm xào cay tê" } },
      { price: 420000, spicy: true, name: { ko: "마라샹궈", en: "Mala Xiangguo (Dry Pot)", zh: "麻辣香锅", ja: "麻辣香鍋 (マーラーシャングオ)", vi: "Lẩu xào" } },
      { price: 600000, spicy: true, name: { ko: "마라 샤브꼬치", en: "Mala Shabu Skewers", zh: "麻辣涮串", ja: "麻辣しゃぶ串", vi: "Lẩu xiên Trung Quốc" } },
      { price: 400000, spicy: true, name: { ko: "마라탕", en: "Malatang (Mala Soup)", zh: "麻辣烫", ja: "麻辣湯 (マーラータン)", vi: "Thập cẩm canh Malatang" } },
    ],
  },
  {
    id: "sari",
    name: { ko: "마라 사리 추가", en: "Mala Add-ons (Noodles)", zh: "麻辣加料(面类)", ja: "麻辣のトッピング(麺類)", vi: "Gọi thêm mì" },
    items: [
      { price: 60000, name: { ko: "옥수수면", en: "Corn Noodles", zh: "玉米面", ja: "とうもろこし麺", vi: "Mỳ ngô" } },
      { price: 60000, name: { ko: "넓은 당면", en: "Wide Glass Noodles", zh: "宽粉", ja: "幅広春雨", vi: "Mỳ khoai" } },
      { price: 60000, name: { ko: "우동면", en: "Udon Noodles", zh: "乌冬面", ja: "うどん", vi: "Mỳ Udon" } },
      { price: 60000, name: { ko: "분모자", en: "Bunmoza (Thick Starch Noodles)", zh: "粉耗子", ja: "フェンモーズ", vi: "Bunmoza" } },
    ],
  },
  {
    id: "stirfry",
    name: { ko: "볶음 요리", en: "Stir-fried Dishes", zh: "炒菜", ja: "炒め物", vi: "Các món xào" },
    items: [
      { price: 280000, photo: "img/guobaorou.jpg", name: { ko: "꿔바로우", en: "Crispy Sweet & Sour Pork (Guobaorou)", zh: "锅包肉", ja: "鍋包肉 (グオバオロウ)", vi: "Thịt lợn bao chiên sốt chua ngọt" } },
      { price: 150000, photo: "img/mapo-tofu.jpg", spicy: true, name: { ko: "마파두부", en: "Mapo Tofu", zh: "麻婆豆腐", ja: "麻婆豆腐", vi: "Đậu phụ sốt cay" } },
      { price: 250000, spicy: true, desc: { ko: "닭고기 · 땅콩 · 건고추", en: "Chicken · Peanuts · Dried chili", zh: "鸡肉 · 花生 · 干辣椒", ja: "鶏肉・ピーナッツ・乾燥唐辛子", vi: "Thịt gà · Lạc · Ớt khô" }, name: { ko: "라즈지", en: "Spicy Chicken with Chilies (Lazi Ji)", zh: "辣子鸡", ja: "辣子鶏 (ラーズージー)", vi: "Gà rang ớt" } },
      { price: 200000, name: { ko: "돼지고기 고추볶음", en: "Stir-fried Pork with Chili Peppers", zh: "辣椒炒肉", ja: "豚肉と唐辛子の炒め", vi: "Thịt lợn xào ớt" } },
      { price: 220000, spicy: true, name: { ko: "향라육사", en: "Spicy Shredded Pork (Xianglarousi)", zh: "香辣肉丝", ja: "香辣肉絲 (シャンラーロースー)", vi: "Thịt lợn xào cay" } },
      { price: 200000, name: { ko: "어향육사", en: "Yuxiang Shredded Pork (Eoyang Yuksa)", zh: "鱼香肉丝", ja: "魚香肉絲 (ユーシャンロースー)", vi: "Thịt lợn xào tổng hợp" } },
      { price: 220000, name: { ko: "경장육사", en: "Shredded Pork in Beijing Sauce (Jingjiangrousi)", zh: "京酱肉丝", ja: "京醤肉絲 (ジンジャンロースー)", vi: "Váng đậu cuốn thịt heo" } },
      { price: 280000, spicy: true, name: { ko: "마라 소고기볶음", en: "Mala Stir-fried Beef", zh: "麻辣炒牛肉", ja: "麻辣牛肉炒め", vi: "Bò xào cay tê" } },
      { price: 200000, name: { ko: "닭똥집 볶음", en: "Stir-fried Chicken Gizzards", zh: "炒鸡胗", ja: "砂肝炒め", vi: "Mề gà xào" } },
      { price: 160000, name: { ko: "두부 김치볶음", en: "Stir-fried Kimchi with Tofu", zh: "豆腐炒泡菜", ja: "豆腐とキムチの炒め", vi: "Kim chi xào đậu phụ" } },
      { price: 220000, name: { ko: "명태고니 볶음", en: "Stir-fried Pollack Milt (Myeongtae-goni)", zh: "炒明太鱼白", ja: "スケトウダラの白子炒め (ミョンテゴニ)", vi: "Mỡ cá xào" } },
      { price: 220000, name: { ko: "마약 먹태", en: "Addictive Dried Pollack (Mayak Meoktae)", zh: "让人上瘾的干明太鱼", ja: "やみつき干しスケトウダラ (マヤク モクテ)", vi: "Cá khô nướng" } },
      { price: 100000, name: { ko: "토마토 계란볶음", en: "Tomato & Egg Stir-fry", zh: "番茄炒蛋", ja: "トマトと卵の炒め", vi: "Trứng sốt cà chua" } },
      { price: 100000, name: { ko: "부추 계란볶음", en: "Chive & Egg Stir-fry", zh: "韭菜炒蛋", ja: "ニラ卵炒め", vi: "Trứng xào hẹ" } },
      { price: 100000, name: { ko: "청경채 볶음", en: "Stir-fried Bok Choy", zh: "炒青梗菜", ja: "チンゲン菜炒め", vi: "Cải chíp xào" } },
      { price: 100000, name: { ko: "감자 볶음", en: "Stir-fried Potatoes", zh: "炒土豆", ja: "じゃがいも炒め", vi: "Khoai tây xào" } },
      { price: 120000, name: { ko: "양배추 볶음", en: "Stir-fried Cabbage", zh: "炒卷心菜", ja: "キャベツ炒め", vi: "Cải thảo xào" } },
    ],
  },
  {
    id: "set",
    name: { ko: "세트", en: "Set Menus", zh: "套餐", ja: "セット", vi: "Set" },
    items: [
      { price: 580000, name: { ko: "A 세트", en: "Set A", zh: "A套餐", ja: "Aセット", vi: "Set A" }, desc: { ko: "양꼬치 + 닭꼬치 + 돼지고기 고추볶음", en: "Lamb Skewers + Chicken Skewers + Stir-fried Pork with Chili Peppers", zh: "羊肉串 + 鸡肉串 + 辣椒炒肉", ja: "ラム串 + 焼き鳥 + 豚肉と唐辛子の炒め", vi: "Thịt cừu xiên nướng + Thịt gà xiên nướng + Thịt lợn xào ớt" } },
      { price: 650000, name: { ko: "B 세트", en: "Set B", zh: "B套餐", ja: "Bセット", vi: "Set B" }, desc: { ko: "양꼬치 + 소갈비살 꼬치 + 꿔바로우", en: "Lamb Skewers + Beef Short Rib Skewers + Crispy Sweet & Sour Pork", zh: "羊肉串 + 牛肋条串 + 锅包肉", ja: "ラム串 + 牛カルビ串 + 鍋包肉", vi: "Thịt cừu xiên nướng + Dẻ sườn bò xiên nướng + Thịt lợn bao chiên sốt chua ngọt" } },
      { price: 700000, name: { ko: "C 세트", en: "Set C", zh: "C套餐", ja: "Cセット", vi: "Set C" }, desc: { ko: "양갈비 + 양꼬치 + 마파두부", en: "Lamb Ribs + Lamb Skewers + Mapo Tofu", zh: "羊排 + 羊肉串 + 麻婆豆腐", ja: "ラムリブ + ラム串 + 麻婆豆腐", vi: "Dẻ sườn cừu nướng + Thịt cừu xiên nướng + Đậu phụ sốt cay" } },
    ],
  },
];
