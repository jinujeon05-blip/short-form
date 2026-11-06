// 불향 Bul Hyang 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진 25장(2026-11-04 수집, 올린 날짜 미상), 가격이 다르면 높은 쪽
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "불향", en: "Bul Hyang" },
  phone: "0968 499 957",
  address: "CT4, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:00 – 23:00", // 구글 지도 '오전 11:00-오후 11:00'
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price: price ?? null, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

window.MENU = [
  {
    id: "signature",
    name: T("시그니처", "SIGNATURE", "招牌菜", "シグネチャー", "SIGNATURE"),
    items: [
      it(270000, "zzusam", "불향 쭈꾸미 삼겹살 직화볶음", "Bulhyang Fire-Grilled Stir-Fried Baby Octopus & Pork Belly (Jjukkumi Samgyeopsal Jikhwa Bokkeum)", "火香直火小章鱼五花肉炒", "プルヒャン 直火炒め ジュクミ（小ダコ）と豚バラ肉", "Bạch tuộc Bulhyang thịt ba chỉ xào cay", {
        tag: "best", spicy: true,
        desc: T("1인분 · 2인분부터 주문 가능 · 순한맛 / 중간맛 / 매운맛 / 가장 매운맛 선택", "1 serving · Minimum order 2 servings · Choose mild / medium / spicy / extra spicy", "每份 · 2份起订 · 可选微辣 / 中辣 / 辣 / 特辣", "1人前 · 2人前から注文可能 · 辛さ選択：マイルド / 中辛 / 辛い / 激辛", "1 suất · từ 2 suất · Hơi cay / Cay / Rất cay / Siêu siêu cay"),
      }),
      it(240000, "zzukkumi", "불향 쭈꾸미 직화볶음", "Bulhyang Fire-Grilled Stir-Fried Baby Octopus (Jjukkumi Jikhwa Bokkeum)", "火香直火小章鱼炒", "プルヒャン 直火炒め ジュクミ（小ダコ）", "Bạch tuộc Bulhyang xào cay", {
        spicy: true,
        desc: T("1인분 · 순한맛 / 중간맛 / 매운맛 / 가장 매운맛 선택", "1 serving · Choose mild / medium / spicy / extra spicy", "每份 · 可选微辣 / 中辣 / 辣 / 特辣", "1人前 · 辛さ選択：マイルド / 中辛 / 辛い / 激辛", "1 suất · Hơi cay / Cay / Rất cay / Siêu siêu cay"),
      }),
      it(null, null, "코다리 조림", "Braised Half-Dried Pollack (Kodari Jorim)", "红烧半干明太鱼", "コダリ（半干しスケトウダラ）の煮付け", "Cá minh thái kho", {
        sizes: [["1인분", 250000], ["소", 750000], ["중", 1000000], ["대", 1250000]],
      }),
    ],
  },
  {
    id: "soup",
    name: T("국물 요리", "SOUPS & HOT POTS", "汤锅类", "スープ・鍋料理", "MÓN CANH"),
    items: [
      it(null, "yeonpotang", "연포탕", "Octopus Soup (Yeonpotang)", "章鱼汤", "ヨンポタン（タコ鍋）", "Canh bạch tuộc", { sizes: [["중", 900000], ["대", 1700000]] }),
      it(100000, null, "연포탕 소고기 추가 (100g)", "Yeonpotang Add-on: Beef (100g)", "章鱼汤加牛肉（100g）", "ヨンポタン 牛肉追加（100g）", "Canh bạch tuộc - thêm thịt bò (100g)"),
      it(150000, null, "연포탕 산낙지 추가 (100g)", "Yeonpotang Add-on: Live Octopus (100g)", "章鱼汤加活章鱼（100g）", "ヨンポタン 活ダコ追加（100g）", "Canh bạch tuộc - thêm bạch tuộc (100g)"),
      it(null, null, "쭈꾸미 & 소고기 샤브샤브", "Baby Octopus & Beef Shabu-Shabu (Jjukkumi Sogogi Shabushabu)", "小章鱼牛肉涮锅", "ジュクミ（小ダコ）と牛肉のしゃぶしゃぶ", "Lẩu bạch tuộc thịt bò", { sizes: [["중", 800000], ["대", 1500000]] }),
      it(100000, null, "샤브샤브 소고기 추가 (100g)", "Shabu-Shabu Add-on: Beef (100g)", "涮锅加牛肉（100g）", "しゃぶしゃぶ 牛肉追加（100g）", "Lẩu - thêm thịt bò (100g)"),
      it(100000, null, "샤브샤브 쭈꾸미 추가 (100g)", "Shabu-Shabu Add-on: Baby Octopus (100g)", "涮锅加小章鱼（100g）", "しゃぶしゃぶ ジュクミ（小ダコ）追加（100g）", "Lẩu - thêm bạch tuộc (100g)"),
      it(200000, null, "사골 우거지탕", "Beef Bone Soup with Dried Cabbage (Sagol Ugeoji-tang)", "牛骨白菜干汤", "牛骨ウゴジタン（干し白菜のスープ）", "Canh xương hầm cải thảo"),
      it(200000, null, "매생이 낙지탕", "Seaweed (Maesaengi) & Octopus Soup (Maesaengi Nakji-tang)", "海苔章鱼汤", "メセンイ（海苔）とテナガダコのスープ", "Canh tảo biển bạch tuộc"),
    ],
  },
  {
    id: "special",
    name: T("특선 메뉴", "SPECIALS", "特色菜", "特選メニュー", "ĐẶC BIỆT"),
    items: [
      it(240000, null, "직화 삼겹살", "Fire-Grilled Pork Belly (Jikhwa Samgyeopsal)", "火烤五花肉", "直火焼き 豚バラ肉（サムギョプサル）", "Ba chỉ xào hành"),
      it(330000, null, "불향 무뼈 닭발", "Bulhyang Spicy Boneless Chicken Feet (Mubbyeo Dalkbal)", "火香香辣无骨鸡爪", "プルヒャン 骨なし鶏足（タッパル）", "Chân gà không xương xào cay", {
        spicy: true,
        desc: T("순한맛 / 중간맛 / 매운맛 / 가장 매운맛 선택", "Choose mild / medium / spicy / extra spicy", "可选微辣 / 中辣 / 辣 / 特辣", "辛さ選択：マイルド / 中辛 / 辛い / 激辛", "Hơi cay / Cay vừa / Rất cay / Siêu siêu cay"),
      }),
      it(400000, null, "낙지 호롱이 (4마리)", "Grilled Octopus on Skewers (Nakji Horongi, 4 pieces)", "烤章鱼串（4只）", "テナガダコの串焼き（ホロンイ・4匹）", "Bạch tuộc xiên nướng"),
      it(400000, null, "산낙지", "Live Octopus (Sannakji)", "活章鱼", "活ダコ（サンナクチ）", "Bạch tuộc sống"),
      it(400000, null, "보리굴비", "Barley-Aged Yellow Croaker (Bori Gulbi)", "大麦腌黄花鱼", "麦漬けイシモチ（ポリクルビ）", "Cá ướp lúa mạch"),
      it(60000, "gyeranjjim", "계란찜", "Steamed Egg (Gyeranjjim)", "蒸蛋", "韓国式茶碗蒸し（ケランチム）", "Trứng hấp"),
    ],
  },
  {
    id: "side",
    name: T("사이드 메뉴", "SIDES", "小吃配菜", "サイドメニュー", "SIDE MENU"),
    items: [
      it(150000, null, "쭈꾸미 파전", "Baby Octopus Scallion Pancake (Jjukkumi Pajeon)", "小章鱼葱饼", "ジュクミ（小ダコ）のパジョン（ネギチヂミ）", "Bánh xèo bạch tuộc"),
      it(140000, "donkatsu", "돈가스", "Pork Cutlet (Donkatsu)", "炸猪排", "とんかつ（ドンカツ）", "Thịt heo chiên xù"),
      it(160000, null, "치즈 돈가스", "Cheese Pork Cutlet (Cheese Donkatsu)", "芝士炸猪排", "チーズとんかつ（チーズドンカツ）", "Thịt heo chiên xù phô mai"),
      it(120000, "mandu", "만두", "Dumplings (Mandu)", "饺子", "餃子（マンドゥ）", "Màn thầu"),
      it(150000, null, "새우 튀김", "Fried Shrimp (Saeu Twigim)", "炸虾", "エビ天（エビのフライ）", "Tôm chiên xù"),
    ],
  },
  {
    id: "extra",
    name: T("추가 메뉴", "EXTRAS", "加点菜品", "追加メニュー", "ĐỒ GỌI THÊM"),
    items: [
      it(20000, null, "볶음밥", "Fried Rice (Bokkeumbap)", "炒饭", "チャーハン（ポックンパ）", "Cơm rang"),
      it(40000, null, "사리 (라면 / 소면 / 칼국수 / 우동)", "Extra Noodles (Ramyeon / Somyeon / Kalguksu / Udon)", "加面（拉面 / 细面 / 刀削面 / 乌冬面）", "サリ（追加麺：ラーメン / ソミョン / カルグクス / うどん）", "Mỳ tôm / Mỳ / Mỳ cắt / Mỳ udon"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "DRINKS", "酒水饮料", "お酒・ドリンク", "ĐỒ UỐNG"),
    items: [
      it(150000, null, "참이슬 / 진로 / 새로 / 처음처럼", "Soju (Chamisul / Jinro / Saero / Chum Churum)", "烧酒（真露 / Jinro / 新乐 / 初饮初乐）", "焼酎（チャミスル / ジンロ / セロ / チョウムチョロム）", "Rượu Jinro Soju"),
      it(150000, null, "좋은데이", "Soju (Good Day)", "烧酒（好日子 Good Day）", "焼酎（チョウンデイ）", "Rượu Good Day Soju"),
      it(150000, null, "막걸리", "Makgeolli (Korean Rice Wine)", "马格利米酒", "マッコリ", "Rượu gạo"),
      it(null, null, "연태 고량주", "Yantai Gaoliang Liquor", "烟台高粱酒", "煙台高粱酒", "Rượu Yeon Tae", { sizes: [["250ml", 450000], ["500ml", 750000]] }),
      it(50000, null, "타이거 맥주", "Tiger Beer", "虎牌啤酒", "タイガービール", "Bia Tiger"),
      it(120000, null, "보드카맨", "Vodka Men", "Vodka Men 伏特加", "ウォッカマン（Vodka Men）", "Rượu Vodka Men"),
      it(20000, null, "코카콜라 / 스프라이트 / 환타", "Coca-Cola / Sprite / Fanta", "可口可乐 / 雪碧 / 芬达", "コカ・コーラ / スプライト / ファンタ", "Cocacola / Sprite / Fanta"),
    ],
  },
];
