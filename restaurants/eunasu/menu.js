// 은아수 Eun-a-su 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진 5장(2026-11-06 수집, 올린 날짜 미상, 사진 버전이 3가지). 같은 메뉴가 사진마다 다르면 높은 쪽 가격(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "은아수", en: "Eun-a-su" },
  phone: "0972 968 819",
  address: "130 Nguyễn Cao, Kinh Bắc, Bắc Ninh",
  wifi: null,
  hours: "10:00 – 22:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "set",
    name: T("정식메뉴", "Set Meals", "套餐", "定食メニュー", "Món set (suất ăn)"),
    items: [
      it(550000, "ganjang", T("간장게장 알배기 암게 정식", "Soy-Marinated Raw Crab Set, Roe-Filled Female Crab (Ganjang Gejang)", "酱蟹套餐(满黄母蟹)", "カンジャンケジャン定食(卵たっぷりのメスガニ)", "Set ghẹ ngâm nước tương (ghẹ cái đầy gạch)"), { tag: "best", desc: T("압력솥밥 · 새우장 · 된장찌개 · 부추전", "Pressure-cooker rice · Soy-marinated shrimp · Soybean paste stew · Chive pancake", "高压锅米饭 · 酱虾 · 大酱汤 · 韭菜煎饼", "圧力釜ご飯 · エビのしょうゆ漬け · テンジャンチゲ · ニラチヂミ", "Cơm nồi áp suất · Tôm ngâm nước tương · Canh đậu tương · Bánh hẹ chiên") }),
      it(480000, null, T("간장게장 알배기 암게 (게만 추가 · 포장)", "Soy-Marinated Raw Crab, Roe-Filled Female Crab (Crab only, add-on · takeaway)", "酱蟹(满黄母蟹)(仅蟹,加点 · 打包)", "カンジャンケジャン(卵たっぷりのメスガニ)(カニのみ追加 · お持ち帰り)", "Ghẹ cái ngâm nước tương (chỉ ghẹ, gọi thêm · mang về)")),
      it(480000, null, T("간장게장 숫게 정식 (한국 안면도산)", "Soy-Marinated Raw Crab Set, Male Crab (Ganjang Gejang), from Anmyeondo, Korea", "酱蟹套餐(公蟹,韩国安眠岛产)", "カンジャンケジャン定食(オスガニ、韓国・安眠島産)", "Set ghẹ đực ngâm nước tương (nhập từ đảo Anmyeondo, Hàn Quốc)"), { desc: T("압력솥밥 · 된장찌개 · 부추전", "Pressure-cooker rice · Soybean paste stew · Chive pancake", "高压锅米饭 · 大酱汤 · 韭菜煎饼", "圧力釜ご飯 · テンジャンチゲ · ニラチヂミ", "Cơm nồi áp suất · Canh đậu tương · Bánh hẹ chiên") }),
      it(430000, null, T("간장게장 숫게 (게만 추가 · 포장)", "Soy-Marinated Raw Crab, Male Crab (Crab only, add-on · takeaway)", "酱蟹(公蟹)(仅蟹,加点 · 打包)", "カンジャンケジャン(オスガニ)(カニのみ追加 · お持ち帰り)", "Ghẹ đực ngâm nước tương (chỉ ghẹ, gọi thêm · mang về)")),
      it(450000, null, T("양념게장 정식", "Spicy Marinated Raw Crab Set (Yangnyeom Gejang)", "调味蟹套餐(辣酱蟹)", "ヤンニョムケジャン定食(辛口味付けワタリガニ)", "Set ghẹ sốt cay"), { desc: T("압력솥밥 · 계란찜 · 부추전", "Pressure-cooker rice · Steamed egg · Chive pancake", "高压锅米饭 · 蒸蛋 · 韭菜煎饼", "圧力釜ご飯 · 卵蒸し · ニラチヂミ", "Cơm nồi áp suất · Trứng hấp · Bánh hẹ chiên") }),
      it(400000, null, T("양념게장 (게만 추가 · 포장)", "Spicy Marinated Raw Crab (Crab only, add-on · takeaway)", "调味蟹(仅蟹,加点 · 打包)", "ヤンニョムケジャン(カニのみ追加 · お持ち帰り)", "Ghẹ sốt cay (chỉ ghẹ, gọi thêm · mang về)")),
    ],
  },
  {
    id: "meal",
    name: T("식사류", "Meals", "正餐", "お食事", "Món ăn chính"),
    items: [
      it(150000, null, T("김치찌개", "Kimchi Stew (Kimchi Jjigae)", "泡菜汤", "キムチチゲ", "Canh kim chi")),
      it(120000, null, T("된장찌개", "Soybean Paste Stew (Doenjang Jjigae)", "大酱汤", "テンジャンチゲ", "Canh đậu tương")),
      it(180000, null, T("양평해장국", "Beef Rib & Offal Hangover Soup, Yangpyeong Style (Yangpyeong Haejangguk)", "杨平解酒汤", "ヤンピョン式ヘジャンクク(牛骨と内臓のスープ)", "Canh sườn/lòng bò kiểu Yangpyeong")),
      it(140000, null, T("콩나물해장국", "Bean Sprout Hangover Soup (Kongnamul Haejangguk)", "豆芽解酒汤", "もやしのヘジャンクク", "Canh giá đỗ giải rượu")),
      it(200000, null, T("동태탕", "Pollack Stew (Dongtae-tang)", "鳕鱼汤", "スケトウダラ鍋(トンテタン)", "Canh cá")),
      it(220000, "galbitang", T("갈비탕", "Beef Short Rib Soup (Galbitang)", "排骨汤", "カルビタン(牛カルビスープ)", "Canh sườn bò")),
      it(220000, null, T("꽃게해장국", "Blue Crab Hangover Soup (Kkotge Haejangguk)", "花蟹解酒汤", "ワタリガニのヘジャンクク", "Canh ghẹ")),
      it(140000, null, T("뚝배기 오뎅탕", "Fish Cake Soup in a Stone Pot (Ttukbaegi Odeng-tang)", "砂锅鱼糕汤", "トゥッペギ入りオデンスープ(練り物のスープ)", "Canh chả cá nồi đất")),
      it(400000, "budae", T("부대찌개 (2인분)", "Army Stew with Sausage & Ham (Budae Jjigae) (2 servings)", "部队锅(2人份)", "プデチゲ(2人前)", "Súp xúc xích kiểu quân đội (Budae Jjigae) (2 phần)")),
      it(200000, null, T("제육덮밥 (미니 된장찌개)", "Spicy Pork Rice Bowl (Jeyuk Deopbap) (with mini soybean paste stew)", "猪肉盖饭(附迷你大酱汤)", "豚肉の辛味炒めご飯(チェユクトッパプ)(ミニテンジャンチゲ付き)", "Cơm thịt xào (kèm canh đậu tương mini)")),
      it(250000, null, T("소고기 불고기", "Marinated Beef Bulgogi", "烤牛肉(韩式烤肉)", "牛肉のプルコギ", "Bò xào bulgogi")),
      it(40000, null, T("압력솥밥 별도 추가", "Extra Pressure-Cooker Rice (add-on)", "高压锅米饭(另加)", "圧力釜ご飯(追加)", "Cơm nồi áp suất (gọi thêm)")),
    ],
  },
  {
    id: "anju",
    name: T("안주류", "Dishes to Share with Drinks", "下酒菜", "おつまみ", "Món nhắm"),
    items: [
      it(700000, null, T("게국지 (꽃게탕)", "Spicy Blue Crab Hot Pot (Gegukji)", "蟹汤(花蟹汤)", "ゲグクチ(ワタリガニ鍋)", "Lẩu ghẹ")),
      it(800000, null, T("LA갈비찜", "Braised LA-Cut Beef Short Ribs (LA Galbi-jjim)", "LA炖排骨", "LAカルビ煮込み(LAカルビチム)", "Sườn bò kiểu LA hầm")),
      it(550000, null, T("삼겹살 고추장 볶음", "Stir-Fried Pork Belly in Chili Paste (Samgyeopsal Gochujang Bokkeum)", "辣酱炒五花肉", "豚バラのコチュジャン炒め", "Thịt ba chỉ xào tương ớt")),
      it(500000, null, T("소곱창전골 (3~4인)", "Beef Intestine Hot Pot (Sogopchang Jeongol) (3-4 people)", "牛肠火锅(3~4人)", "牛ホルモン鍋(3〜4人前)", "Lẩu lòng bò (3-4 người)")),
      it(550000, "duruchigi", T("두루치기 (제육볶음)", "Spicy Stir-Fried Pork (Duruchigi / Jeyuk Bokkeum)", "炒五花肉(辣炒猪肉)", "豚肉の辛味炒め(トゥルチギ)", "Thịt xào cay (Duruchigi)")),
      it(750000, null, T("소고기 샤브샤브 (3~4인)", "Beef Shabu-Shabu Hot Pot (3-4 people)", "牛肉火锅(3~4人)", "牛肉しゃぶしゃぶ(3〜4人前)", "Lẩu bò (3-4 người)")),
      it(300000, "shrimp", T("새우튀김", "Fried Shrimp (Saeu Twigim)", "炸虾", "エビの天ぷら", "Tôm chiên giòn")),
      it(400000, null, T("모듬튀김", "Assorted Fried Platter (Modum Twigim)", "什锦炸物", "天ぷら盛り合わせ", "Đồ chiên thập cẩm")),
      it(350000, null, T("얼큰 오뎅탕", "Spicy Fish Cake Soup (Eolkeun Odeng-tang)", "辣鱼糕汤", "辛い練り物スープ(オデンタン)", "Canh chả cá cay")),
      it(350000, null, T("오뎅탕", "Fish Cake Soup (Odeng-tang)", "鱼糕汤", "練り物スープ(オデンタン)", "Canh chả cá")),
      it(200000, "samgyeop", T("냉동삼겹살 (200g / 1인)", "Frozen Pork Belly BBQ (Naengdong Samgyeopsal) (200g / 1 person)", "冷冻五花肉(200克/1人)", "冷凍サムギョプサル(200g / 1人前)", "Thịt ba chỉ đông lạnh nướng (200g / 1 người)")),
      it(200000, null, T("김치전", "Kimchi Pancake (Kimchi-jeon)", "泡菜煎饼", "キムチチヂミ", "Bánh kim chi chiên")),
      it(300000, null, T("해물파전", "Seafood & Green Onion Pancake (Haemul Pajeon)", "海鲜葱饼", "海鮮ネギチヂミ", "Bánh hành hải sản chiên")),
      it(200000, null, T("조개탕", "Clam Soup (Jogae-tang)", "蛤蜊汤", "アサリのスープ", "Canh nghêu")),
      it(200000, null, T("홍합탕", "Mussel Soup (Honghap-tang)", "贻贝汤", "ムール貝のスープ", "Canh vẹm")),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒水 · 饮料", "お酒 · ドリンク", "Rượu · Đồ uống"),
    items: [
      it(120000, null, T("소주 (참이슬 · 진로 · 세로)", "Soju (Chamisul · Jinro · Saero)", "烧酒(Chamisul · Jinro · Saero)", "焼酎(チャミスル · ジンロ · セロ)", "Rượu soju (Chamisul · Jinro · Saero)")),
      it(40000, null, T("맥주 (Tiger)", "Beer (Tiger)", "啤酒(Tiger)", "ビール(Tiger)", "Bia (Tiger)")),
      it(100000, null, T("보드카 (Vodka Men)", "Vodka (Vodka Men)", "伏特加(Vodka Men)", "ウォッカ(Vodka Men)", "Vodka (Vodka Men)")),
      it(20000, null, T("코카콜라", "Coca-Cola", "可口可乐", "コカ・コーラ", "Coca-Cola")),
      it(20000, null, T("사이다", "Cider (lemon-lime soda)", "汽水(Cider)", "サイダー", "Soda chanh (Cider)")),
      it(20000, null, T("환타", "Fanta", "芬达", "ファンタ", "Fanta")),
    ],
  },
];
