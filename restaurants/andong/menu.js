// 안동곱창(Andong Hanu Gopchang, 한식 곱창·고기구이·국밥, 하노이 Nam Từ Liêm) 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음). 출처: 구글 지도 메뉴판 사진(2026-11-07 수집, 가게 계정이 올린 메뉴판 menu_07~19 + 손님이 찍은 메뉴책). 같은 메뉴가 사진마다 다르면 높은 쪽 가격(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "안동곱창", en: "Andong Hanu Gopchang" },
  phone: "024 8886 9292",
  address: "18 ngách 39/70 Đ. Đình Thôn, Mỹ Đình 1, Nam Từ Liêm, Hà Nội",
  wifi: null,
  hours: "10:00 – 24:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "hanwoo",
    name: T("명품 한우", "Premium Hanwoo (Korean Beef)", "韩牛精选", "高級韓牛", "Bò Hàn Quốc cao cấp"),
    items: [
      it(640000, null, T("한우 곱창", "Hanwoo Gopchang (Premium Korean Beef Small Intestine)", "韩牛牛小肠", "韓牛コプチャン", "Lòng bò non Hàn Quốc"), { unit: "150g" }),
      it(640000, null, T("한우 대창", "Hanwoo Daechang (Premium Korean Beef Large Intestine)", "韩牛牛大肠", "韓牛テチャン", "Lòng già Hàn Quốc"), { unit: "150g" }),
    ],
  },
  {
    id: "gopchang",
    name: T("소곱창 구이", "Grilled Beef Intestines", "烤牛内脏", "牛ホルモン焼き", "Lòng bò nướng"),
    note: T("1인분 가격 · 2인분 이상 주문", "Price per serving · minimum 2 servings", "单人份价格 · 须点2份以上", "1人前の価格 · 2人前から注文", "Giá 1 phần · gọi từ 2 phần trở lên"),
    items: [
      it(270000, "gopchang-modum", T("소곱창 모듬", "Sogopchang Modeum (Assorted Beef Intestines)", "烤牛内脏拼盘", "牛ホルモン盛り合わせ", "Lòng bò thập cẩm"), { unit: "170g", tag: "must", desc: T("곱창 · 대창 · 막창 · 양깃머리 · 염통 · 우삼겹", "Small intestine · Large intestine · Abomasum · Tripe · Heart · Beef belly", "牛小肠 · 牛大肠 · 牛百叶胃 · 牛肚头 · 牛心 · 牛五花", "コプチャン · テチャン · マクチャン · ミノ · ハツ · 牛カルビ(バラ)", "Lòng non · Lòng già · Khấu đuôi · Guốc bò · Tim · Ba chỉ bò") }),
      it(240000, null, T("곱창", "Gopchang (Grilled Beef Small Intestine)", "牛小肠", "コプチャン", "Lòng bò"), { unit: "150g" }),
      it(240000, null, T("대창", "Daechang (Beef Large Intestine)", "牛大肠", "テチャン", "Lòng già"), { unit: "150g" }),
      it(240000, null, T("막창", "Makchang (Beef Abomasum)", "牛皱胃", "マクチャン(第四胃)", "Khấu đuôi"), { unit: "150g" }),
      it(240000, null, T("양깃머리 (특양)", "Yanggitmeori (Beef Tripe, premium)", "牛肚头(特选)", "ミノ(特上)", "Guốc bò"), { unit: "150g" }),
      it(240000, null, T("염통", "Yeomtong (Beef Heart)", "牛心", "ハツ", "Tim bò"), { unit: "150g" }),
    ],
  },
  {
    id: "beef",
    name: T("소고기 구이", "Grilled Beef", "烤牛肉", "牛肉焼き", "Bò nướng"),
    items: [
      it(440000, null, T("갈비살", "Galbisal (Beef Rib Meat)", "牛肋条肉", "カルビ身", "Dẻ sườn bò"), { unit: "150g" }),
      it(580000, null, T("안창살", "Anchangsal (Beef Skirt Steak)", "牛横隔膜肉", "ハラミ(インサイドスカート)", "Diềm thăn bò"), { unit: "150g" }),
      it(540000, null, T("등심 살치살", "Deungsim Salchisal (Ribeye & Chuck Flap)", "牛里脊 · 雪花牛肉", "リブロース · ザブトン", "Thăn bò"), { unit: "150g" }),
      it(540000, null, T("차돌박이", "Chadolbaegi (Thinly Sliced Beef Brisket)", "牛胸腹薄片", "チャドルバギ(牛バラ薄切り)", "Thịt ức bò"), { unit: "150g" }),
    ],
  },
  {
    id: "pork",
    name: T("뒷고기 구이", "Grilled Pork (Dwitgogi)", "烤猪肉", "豚肉焼き(トゥィッコギ)", "Thịt heo nướng"),
    items: [
      it(270000, null, T("뒷고기 모듬", "Dwitgogi Modeum (Assorted Pork Cuts)", "烤猪肉拼盘", "豚肉盛り合わせ", "Thịt heo thập cẩm"), { unit: "200g", desc: T("뒷덜미살 · 통 항정살 · 가브리살 · 1인분, 2인분 이상 주문", "Pork neck · Whole jowl · Pork rib-finger meat · Price per serving, min. 2 servings", "猪颈肉 · 整块猪颊肉 · 猪肋间肉 · 单人份价格,须点2份以上", "豚トロ(首肉) · 厚切りトントロ · カブリ · 1人前の価格、2人前から注文", "Thịt gáy · Thịt má · Thịt đầu rồng · giá 1 phần, gọi từ 2 phần") }),
      it(220000, null, T("미나리 꽃삼겹", "Minari Kkotsamgyeop (Pork Belly with Water Dropwort)", "芹菜花五花肉", "セリ添え花サムギョプサル", "Thịt ba chỉ hoa rau cần"), { unit: "180g" }),
      it(220000, null, T("가브리살", "Gabeurisal (Pork Rib-finger Meat)", "猪肋间肉", "カブリ(豚肩ロース先)", "Thịt đầu rồng hảo hạng"), { unit: "180g" }),
      it(220000, null, T("뒷덜미살", "Dwitdeolmisal (Pork Neck)", "猪颈肉", "豚トロ(首肉)", "Thịt gáy heo"), { unit: "180g" }),
      it(220000, null, T("통 항정살", "Tong Hangjeongsal (Whole Pork Jowl)", "整块猪颊肉", "厚切りトントロ(豚頬肉)", "Thịt má heo"), { unit: "180g" }),
    ],
  },
  {
    id: "jjim",
    name: T("찜 · 전골", "Braised Dishes · Hot Pot", "炖菜 · 火锅", "蒸し煮 · 鍋", "Món hầm · Lẩu"),
    note: T("1인분 가격 · 2인분 이상 주문", "Price per serving · minimum 2 servings", "单人份价格 · 须点2份以上", "1人前の価格 · 2人前から注文", "Giá 1 phần · gọi từ 2 phần trở lên"),
    items: [
      it(380000, "galbijjim", T("곱대 매운 갈비찜", "Spicy Galbijjim with Gopchang & Daechang (Braised Beef Ribs)", "辣炖牛排骨配牛小肠大肠", "ホルモン入り辛口カルビチム", "Sườn bò hầm cay lòng non & lòng già"), { tag: "best", spicy: true, desc: T("곱창 & 대창 + 소갈비 · 강력 추천", "Small & large intestine + beef short ribs · Highly recommended", "牛小肠和牛大肠 + 牛排骨 · 强力推荐", "コプチャン&テチャン + 牛カルビ · イチオシ", "Lòng non & lòng già + sườn bò · món đề cử") }),
      it(240000, null, T("곱창 전골", "Gopchang Jeongol (Beef Intestine Hot Pot)", "牛小肠火锅", "コプチャン鍋", "Lẩu lòng bò")),
      it(220000, null, T("미나리 차돌 된장전골", "Minari Chadol Doenjang Jeongol (Brisket & Water Dropwort Soybean Paste Hot Pot)", "芹菜牛胸肉大酱火锅", "セリとチャドルの味噌鍋", "Lẩu ức bò tương đậu rau cần")),
      it(220000, null, T("뒷고기 김치전골", "Dwitgogi Kimchi Jeongol (Pork & Kimchi Hot Pot)", "猪肉泡菜火锅", "豚肉キムチ鍋", "Lẩu kim chi thịt heo"), { spicy: true }),
      it(280000, null, T("뼈전골 (감자탕)", "Ppyeo Jeongol (Gamjatang, Pork Bone Hot Pot)", "猪骨火锅(土豆汤)", "豚骨鍋(カムジャタン)", "Lẩu xương heo"), { spicy: true }),
      it(290000, null, T("묵은지 뼈전골", "Mukeunji Ppyeo Jeongol (Pork Bone Hot Pot with Aged Kimchi)", "老泡菜猪骨火锅", "熟成キムチの豚骨鍋", "Lẩu xương hầm kim chi"), { spicy: true }),
    ],
  },
  {
    id: "meal",
    name: T("식사", "Meals", "主食", "食事", "Món ăn"),
    items: [
      it(180000, null, T("안동 뼈해장국", "Andong Ppyeo Haejangguk (Pork Bone Hangover Soup)", "安东猪骨醒酒汤", "安東風豚骨ヘジャンクク", "Canh xương heo"), { tag: "special" }),
      it(220000, null, T("안동 뼈해장국 (특)", "Andong Ppyeo Haejangguk (Large)", "安东猪骨醒酒汤(特大)", "安東風豚骨ヘジャンクク(特盛)", "Canh xương heo (lớn)")),
      it(180000, null, T("안동 소고기 국밥", "Andong Beef Gukbap (Beef Soup with Rice)", "安东牛肉汤饭", "安東風牛肉クッパ", "Canh thịt bò")),
      it(180000, null, T("얼큰 소고기 국밥", "Spicy Beef Gukbap", "辣牛肉汤饭", "辛口牛肉クッパ", "Canh thịt bò cay"), { spicy: true }),
      it(180000, null, T("안동 소내장 국밥", "Andong Beef Offal Gukbap", "安东牛杂汤饭", "安東風牛ホルモンクッパ", "Canh lòng bò")),
      it(180000, null, T("얼큰 소내장 국밥", "Spicy Beef Offal Gukbap", "辣牛杂汤饭", "辛口牛ホルモンクッパ", "Canh lòng bò cay"), { spicy: true }),
      it(180000, null, T("새우 순두부찌개", "Saeu Sundubu Jjigae (Shrimp Soft Tofu Stew)", "虾仁嫩豆腐汤", "海老のスンドゥブチゲ", "Canh đậu hũ non tôm"), { spicy: true }),
      it(180000, null, T("뒷고기 김치찌개", "Dwitgogi Kimchi Jjigae (Pork Kimchi Stew)", "猪肉泡菜汤", "豚肉キムチチゲ", "Canh thịt heo kim chi"), { spicy: true }),
      it(180000, null, T("미나리 차돌 된장찌개", "Minari Chadol Doenjang Jjigae (Brisket & Water Dropwort Soybean Paste Stew)", "芹菜牛胸肉大酱汤", "セリとチャドルの味噌チゲ", "Canh ức bò tương đậu rau cần")),
      it(180000, null, T("돌솥 육회비빔밥", "Dolsot Yukhoe Bibimbap (Stone Pot Bibimbap with Raw Beef)", "石锅生牛肉拌饭", "石焼きユッケビビンバ", "Cơm trộn thịt bò sống")),
      it(180000, "mul-naengmyeon", T("물냉면", "Mul Naengmyeon (Cold Noodles in Broth)", "冷汤面", "水冷麺", "Mì lạnh nước"), { desc: T("직접 뽑는 자가 제면", "Noodles made in-house", "店内自制面条", "自家製麺", "Mì do quán tự làm") }),
      it(180000, "bibim-naengmyeon", T("비빔냉면", "Bibim Naengmyeon (Spicy Cold Noodles)", "辣拌冷面", "ビビン冷麺", "Mì lạnh trộn"), { spicy: true, desc: T("직접 뽑는 자가 제면", "Noodles made in-house", "店内自制面条", "自家製麺", "Mì do quán tự làm") }),
    ],
  },
  {
    id: "side",
    name: T("사이드", "Sides", "小菜 · 配餐", "サイドメニュー", "Món phụ"),
    items: [
      it(30000, "gyeranjjim", T("계란찜", "Gyeranjjim (Steamed Egg)", "蒸蛋", "ケランチム(卵蒸し)", "Trứng hấp")),
      it(60000, null, T("치즈 폭탄 계란찜", "Cheese Bomb Steamed Egg", "芝士爆浆蒸蛋", "チーズたっぷり卵蒸し", "Trứng hấp phô mai")),
      it(60000, null, T("들기름 철판 계란후라이", "Perilla Oil Fried Egg on Iron Plate", "紫苏油铁板煎蛋", "エゴマ油の鉄板目玉焼き", "Trứng ốp la rắc vừng")),
      it(70000, null, T("추억의 도시락", "Memory Dosirak (Nostalgic Lunch Box)", "怀旧便当", "思い出のお弁当", "Hộp cơm truyền thống")),
      it(60000, null, T("볶음밥", "Bokkeumbap (Fried Rice)", "炒饭", "チャーハン(ポックンパ)", "Cơm chiên")),
      it(100000, null, T("양밥", "Yangbap (Fried Rice with Beef Tripe)", "牛肚炒饭", "ミノ入りチャーハン", "Cơm chiên guốc bò")),
      it(120000, null, T("치즈 양밥", "Cheese Yangbap (Cheesy Fried Rice with Beef Tripe)", "芝士牛肚炒饭", "チーズミノチャーハン", "Cơm chiên guốc bò phô mai")),
      it(40000, null, T("치즈 추가", "Extra Cheese", "加芝士", "チーズ追加", "Thêm phô mai")),
      it(40000, null, T("미나리 추가", "Extra Water Dropwort (Minari)", "加芹菜", "セリ追加", "Thêm rau cần")),
    ],
  },
  {
    id: "takeout",
    name: T("양념육 포장 판매", "Marinated Meat (Takeout)", "腌制肉类(外带)", "味付け肉(お持ち帰り)", "Thịt tẩm ướp mang về"),
    items: [
      it(780000, null, T("양념 LA 꽃갈비", "Marinated LA Galbi (Beef Short Ribs)", "腌制LA牛排骨", "味付けLAカルビ", "Sườn bò LA tẩm gia vị"), { unit: "1kg" }),
      it(410000, null, T("양념 부채살 소불고기", "Marinated Beef Bulgogi (Top Blade)", "腌制牛肩肉烤肉", "味付け牛プルコギ(肩肉)", "Bò bulgogi tẩm gia vị"), { unit: "1kg" }),
      it(230000, null, T("양념 돼지갈비 목살", "Marinated Pork Galbi & Neck", "腌制猪排骨和梅花肉", "味付け豚カルビ・豚肩ロース", "Sườn và nạc vai heo tẩm gia vị"), { unit: "1kg" }),
      it(230000, null, T("양념 돼지 불고기", "Marinated Pork Bulgogi", "腌制猪肉烤肉", "味付け豚プルコギ", "Thịt heo bulgogi tẩm gia vị"), { unit: "1kg" }),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒类 · 饮料", "お酒 · ドリンク", "Đồ uống"),
    items: [
      it(140000, null, T("소주", "Soju", "烧酒", "焼酎(ソジュ)", "Soju"), { desc: T("참이슬 · 처음처럼 · 진로이즈백 · 새로 · 좋은데이", "Chamisul · Chum Churum · Jinro Is Back · Saero · Good Day", "真露 · 初饮初乐 · 真露Is Back · Saero · Good Day", "チャミスル · チョウムチョロム · ジンロイズバック · セロ · グッデー", "Chamisul · Chum Churum · Jinro Is Back · Saero · Good Day") }),
      it(40000, null, T("맥주 (타이거 · 사이공)", "Beer (Tiger · Saigon)", "啤酒(虎牌 · 西贡)", "ビール(タイガー · サイゴン)", "Bia (Tiger · Saigon)")),
      it(160000, null, T("막걸리", "Makgeolli (Korean Rice Wine)", "马格利米酒", "マッコリ", "Rượu gạo truyền thống")),
      it(300000, null, T("백세주", "Baekseju (Herbal Rice Wine)", "百岁酒", "ペクセジュ", "Rượu Baekseju")),
      it(300000, null, T("복분자", "Bokbunja (Korean Black Raspberry Wine)", "覆盆子酒", "復盆子酒(ポクブンジャ)", "Rượu Bokbunja")),
      it(120000, null, T("멘 보드카", "Men Vodka", "Men 伏特加", "メン ウォッカ", "Vodka Men")),
      it(340000, null, T("명인 안동소주 22도", "Myeongin Andong Soju 22%", "名人安东烧酒 22度", "名人安東焼酎 22度", "Rượu Myeongin Andong Soju 22°"), { unit: "360ml" }),
      it(560000, null, T("명인 안동소주 35도", "Myeongin Andong Soju 35%", "名人安东烧酒 35度", "名人安東焼酎 35度", "Rượu Myeongin Andong Soju 35°"), { unit: "360ml" }),
      it(1500000, null, T("명인 안동소주 호리병 45도", "Myeongin Andong Soju 45% (Gourd Bottle)", "名人安东烧酒 45度(葫芦瓶)", "名人安東焼酎 45度(ひょうたん瓶)", "Rượu Myeongin Andong Soju 45° (bình hồ lô)"), { unit: "400ml" }),
      it(2500000, null, T("명인 안동소주 호리병 45도", "Myeongin Andong Soju 45% (Gourd Bottle)", "名人安东烧酒 45度(葫芦瓶)", "名人安東焼酎 45度(ひょうたん瓶)", "Rượu Myeongin Andong Soju 45° (bình hồ lô)"), { unit: "800ml" }),
      it(1900000, null, T("명인 안동소주 양반탈 45도", "Myeongin Andong Soju 45% (Yangban Mask Bottle)", "名人安东烧酒 45度(两班面具瓶)", "名人安東焼酎 45度(両班仮面瓶)", "Rượu Myeongin Andong Soju 45° (bình mặt nạ Yangban)"), { unit: "400ml" }),
      it(20000, null, T("생수", "Bottled Water", "矿泉水", "ミネラルウォーター", "Nước suối")),
      it(20000, null, T("캔 음료", "Canned Drink", "罐装饮料", "缶ドリンク", "Nước ngọt (lon)")),
    ],
  },
];
