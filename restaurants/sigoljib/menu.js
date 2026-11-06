// 시골집 Sigol Jib 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도에 올라온 메뉴판 사진(2026-11-06 수집), 가게 찾기용(사장님 동의·비용 없음). 같은 메뉴가 사진마다 다르면 높은 쪽 가격(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "시골집", en: "Sigol Jib" },
  phone: "035 555 4636",
  address: "122 Nguyễn Cao, Kinh Bắc, Bắc Ninh",
  wifi: { ssid: "SIGOL JIB", password: "77778888" },
  hours: {
    ko: "11:00 – 21:00 (휴식 14:00 – 16:00)",
    en: "11:00 – 21:00 (Break 14:00 – 16:00)",
    zh: "11:00 – 21:00(休息 14:00 – 16:00)",
    ja: "11:00 – 21:00(休憩 14:00 – 16:00)",
    vi: "11:00 – 21:00 (nghỉ 14:00 – 16:00)",
  },
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "set",
    name: T("정식 · 식사", "Set Meals & Mains", "套餐 · 正餐", "定食 · お食事", "Món set · Món ăn chính"),
    items: [
      it(140000, "bapsang", T("시골 밥상 정식", "Country Table Set (Sigol Bapsang Jeongsik)", "乡村饭桌套餐", "田舎の食卓定食(シゴル・パプサン)", "Set cơm quê Sigol"), { tag: "best", desc: T("밑반찬 12개 · 제육볶음 · 가자미구이 · 냉이 된장국 · 계란 후라이 / 배달 가능(박닌 시내 · 공단 배달 120,000, 배달료 별도)", "12 side dishes · Spicy stir-fried pork · Grilled flatfish · Shepherd's purse soybean paste soup · Fried egg / Delivery available (Bắc Ninh city · industrial zones 120,000, delivery fee extra)", "12样小菜 · 辣炒猪肉 · 烤鲽鱼 · 荠菜大酱汤 · 煎蛋 / 可外送(北宁市区 · 工业区外送价 120,000,另收配送费)", "おかず12品 · 豚肉の辛味炒め · カレイの焼き魚 · ナズナのテンジャンスープ · 目玉焼き / 配達可(バクニン市内 · 工業団地への配達は120,000、配達料別)", "12 món ăn kèm · Thịt heo xào cay · Cá bơn nướng · Canh đậu tương rau ngải · Trứng ốp la / Có giao hàng (nội thành Bắc Ninh · khu công nghiệp 120,000, phí ship tính riêng)") }),
      it(180000, null, T("소 내장탕 (1인 특선)", "Beef Offal Soup (Special for 1)", "牛杂汤(1人特选)", "牛ホルモンスープ(1人前特選)", "Canh lòng bò (suất đặc biệt 1 người)")),
      it(220000, null, T("삼계탕", "Ginseng Chicken Soup (Samgyetang)", "参鸡汤", "参鶏湯(サムゲタン)", "Gà hầm sâm (Samgyetang)")),
      it(250000, null, T("전복 삼계탕", "Ginseng Chicken Soup with Abalone (Jeonbok Samgyetang)", "鲍鱼参鸡汤", "アワビ入り参鶏湯(チョンボク・サムゲタン)", "Gà hầm sâm với bào ngư")),
      it(260000, null, T("낙지 삼계탕", "Ginseng Chicken Soup with Octopus (Nakji Samgyetang)", "章鱼参鸡汤", "テナガダコ入り参鶏湯(ナクチ・サムゲタン)", "Gà hầm sâm với bạch tuộc")),
      it(300000, null, T("해신 삼계탕 (전복 + 낙지)", "Sea God Ginseng Chicken Soup, Abalone + Octopus (Haesin Samgyetang)", "海神参鸡汤(鲍鱼 + 章鱼)", "海神参鶏湯(アワビ + テナガダコ)", "Gà hầm sâm hải thần (bào ngư + bạch tuộc)")),
      it(250000, null, T("뚝배기 소 불고기", "Beef Bulgogi in a Stone Pot (Ttukbaegi Bulgogi)", "砂锅牛肉烤肉", "トゥッペギ牛プルコギ", "Bò bulgogi nồi đất"), { desc: T("150g", "150g", "150克", "150g", "150g") }),
      it(30000, null, T("볶음밥", "Fried Rice (Bokkeumbap)", "炒饭", "チャーハン(ポックンパプ)", "Cơm chiên")),
    ],
  },
  {
    id: "grill",
    name: T("구이", "Grill", "烧烤", "焼き物", "Món nướng"),
    items: [
      it(220000, "samgyeop", T("생 오겹살", "Fresh Pork Belly with Skin (Saeng Ogyeopsal)", "鲜五花肉(带皮)", "生オギョプサル(皮付き豚バラ)", "Thịt 5 chỉ tươi"), { tag: "best", desc: T("1인분 200g", "1 serving 200g", "1人份 200克", "1人前 200g", "1 phần 200g") }),
      it(220000, null, T("생 목살", "Fresh Pork Neck (Saeng Moksal)", "鲜猪颈肉", "生モクサル(豚肩ロース)", "Thịt cổ tươi"), { desc: T("1인분 200g", "1 serving 200g", "1人份 200克", "1人前 200g", "1 phần 200g") }),
      it(200000, null, T("항정살", "Pork Jowl (Hangjeongsal)", "猪颈下肉(项正肉)", "ハンジョンサル(豚トロ)", "Thịt heo má (Hangjeongsal)"), { desc: T("1인분 150g", "1 serving 150g", "1人份 150克", "1人前 150g", "1 phần 150g") }),
      it(200000, null, T("꽃 냉동 삼겹살", "Frozen Pork Belly (Kkot Naengdong Samgyeopsal)", "花纹冷冻五花肉", "花冷凍サムギョプサル", "Thịt ba chỉ đông lạnh"), { desc: T("1인분 150g", "1 serving 150g", "1人份 150克", "1人前 150g", "1 phần 150g") }),
      it([["1인분 (150g)", 200000], ["450g", 600000]], null, T("연탄불 고추장 삼겹살", "Charcoal-Grilled Pork Belly in Chili Paste (Gochujang Samgyeopsal)", "炭火辣酱五花肉", "練炭焼きコチュジャン・サムギョプサル", "Ba chỉ tẩm tương ớt nướng than")),
      it(300000, null, T("등갈비 소금 구이", "Salt-Grilled Pork Ribs (Deunggalbi Sogeum Gui)", "盐烤猪排骨", "豚スペアリブの塩焼き", "Sườn heo nướng muối"), { desc: T("300g", "300g", "300克", "300g", "300g") }),
      it(200000, null, T("연탄불 닭 목살 구이 (소금 / 양념)", "Charcoal-Grilled Chicken Neck (Salt / Seasoned) (Dak Moksal Gui)", "炭火烤鸡颈肉(盐味 / 调味)", "練炭焼きダッ・モクサル(塩 / ヤンニョム)", "Cổ gà nướng than (muối / tẩm gia vị)"), { desc: T("250g", "250g", "250克", "250g", "250g") }),
      it([["소 (300g)", 350000], ["중 (450g)", 500000], ["대 (600g)", 600000]], null, T("소 불고기", "Beef Bulgogi (So Bulgogi)", "韩式烤牛肉", "牛プルコギ", "Thịt bò xào bulgogi")),
      it(280000, null, T("돼지 물갈비", "Pork Ribs in Broth (Dwaeji Mul-galbi)", "猪排骨汤锅烤肉(水排骨)", "豚ムルカルビ(スープ煮込みカルビ)", "Sườn heo nước"), { desc: T("1인 300g", "300g per person", "每人300克", "1人 300g", "300g / người") }),
      it([["중", 800000], ["대", 1000000]], null, T("돈마호크", "Pork Tomahawk (Don-mahokeu)", "猪战斧排", "豚トマホーク", "Tomahawk heo")),
      it([["중 3~4인분 (800g)", 800000], ["대 4~5인분 (1kg)", 1000000]], null, T("돼지 모듬 구이", "Assorted Pork Grill Platter (Dwaeji Modum Gui)", "猪肉拼盘烧烤", "豚肉盛り合わせ焼き", "Thịt heo nướng thập cẩm"), { desc: T("중: 돈마호크 300~400g + 흑돼지 오겹살 200g + 흑돼지 목살 200g + 김치찌개 / 대: 돈마호크 400~500g + 흑돼지 오겹살 200g + 흑돼지 목살 200g + 항정살 150g + 김치찌개", "M: Tomahawk 300-400g + Black pork belly 200g + Black pork neck 200g + Kimchi stew / L: Tomahawk 400-500g + Black pork belly 200g + Black pork neck 200g + Pork jowl 150g + Kimchi stew", "中:战斧排 300~400克 + 黑猪五花肉 200克 + 黑猪颈肉 200克 + 泡菜汤 / 大:战斧排 400~500克 + 黑猪五花肉 200克 + 黑猪颈肉 200克 + 猪颈下肉 150克 + 泡菜汤", "中:トマホーク 300〜400g + 黒豚バラ 200g + 黒豚肩ロース 200g + キムチチゲ / 大:トマホーク 400〜500g + 黒豚バラ 200g + 黒豚肩ロース 200g + ハンジョンサル 150g + キムチチゲ", "Vừa: Tomahawk 300-400g + 5 chỉ heo đen 200g + cổ heo đen 200g + canh kim chi / Lớn: Tomahawk 400-500g + 5 chỉ heo đen 200g + cổ heo đen 200g + heo má 150g + canh kim chi") }),
      it(500000, null, T("조기 구이", "Grilled Yellow Croaker (Jogi Gui)", "烤黄花鱼", "イシモチの焼き魚(チョギ焼き)", "Cá lanh nướng")),
      it(500000, null, T("갈치 or 옥돔 구이", "Grilled Hairtail or Tilefish (Galchi / Okdom Gui)", "烤带鱼或方头鱼", "タチウオまたはアマダイの焼き魚", "Cá hố hoặc cá đục nướng")),
    ],
  },
  {
    id: "stir",
    name: T("볶음 · 찜 · 전골", "Stir-Fries, Braises & Hot Pots", "炒菜 · 炖菜 · 火锅", "炒め · 蒸し煮 · 鍋", "Xào · Hầm · Lẩu"),
    items: [
      it([["중", 300000], ["대", 450000]], "jukkumi", T("오징어 볶음", "Spicy Stir-Fried Squid (Ojingeo Bokkeum)", "辣炒鱿鱼", "イカ炒め(オジンオ・ポックン)", "Mực xào"), { spicy: true, desc: T("국수 사리 서비스", "Free noodles included", "赠送面条", "麺サービス", "Tặng kèm mì") }),
      it([["중", 300000], ["대", 450000]], null, T("주꾸미 볶음", "Spicy Stir-Fried Webfoot Octopus (Jukkumi Bokkeum)", "辣炒小章鱼", "イイダコ炒め(ジュクミ・ポックン)", "Bạch tuộc xào"), { spicy: true, desc: T("국수 사리 서비스", "Free noodles included", "赠送面条", "麺サービス", "Tặng kèm mì") }),
      it([["중", 450000], ["대", 650000]], null, T("꼼장어 볶음", "Spicy Stir-Fried Hagfish (Kkomjangeo Bokkeum)", "辣炒盲鳗", "ヌタウナギ炒め(コムジャンオ・ポックン)", "Lươn biển xào"), { spicy: true }),
      it([["중", 350000], ["대", 500000]], null, T("오삼 불고기 (오징어 + 삼겹살)", "Squid & Pork Belly Bulgogi (Osam Bulgogi)", "鱿鱼五花肉烤肉(鱿鱼 + 五花肉)", "イカと豚バラのプルコギ(オサム・プルコギ)", "Mực xào thịt ba chỉ (Osam Bulgogi)")),
      it(260000, null, T("한치 불고기", "Stir-Fried Hanchi Squid (Hanchi Bulgogi)", "韩式烤小鱿鱼", "ハンチ(ヤリイカ)プルコギ", "Mực hanchi xào bulgogi"), { desc: T("1인분", "1 serving", "1人份", "1人前", "1 phần") }),
      it(260000, null, T("갑오징어 불고기", "Cuttlefish Bulgogi (Gabojingeo Bulgogi)", "韩式烤墨鱼", "コウイカのプルコギ", "Mực nang xào bulgogi"), { desc: T("1인분", "1 serving", "1人份", "1人前", "1 phần") }),
      it([["소", 650000], ["중", 1000000], ["대", 1300000]], null, T("LA 갈비 찜", "Braised LA-Cut Beef Short Ribs (LA Galbi-jjim)", "LA炖排骨", "LAカルビ煮込み(LAカルビチム)", "Sườn bò kho (LA Galbi-jjim)")),
      it([["중", 800000], ["대", 1200000]], null, T("등갈비 김치찜 (묵은지 등갈비찜)", "Braised Pork Ribs with Aged Kimchi (Deunggalbi Kimchi-jjim)", "泡菜炖排骨(老泡菜猪排骨)", "豚スペアリブと熟成キムチの蒸し煮", "Sườn heo kho kim chi muối chua"), { spicy: true }),
      it([["중", 450000], ["대", 650000]], null, T("닭 볶음탕", "Spicy Braised Chicken (Dak Bokkeumtang)", "辣炖鸡块", "タッポックンタン(鶏の辛味煮込み)", "Gà hầm cay (Dak Bokkeumtang)"), { spicy: true, desc: T("묵은지 김치 추가 +100,000", "Add aged kimchi +100,000", "加老泡菜 +100,000", "熟成キムチ追加 +100,000", "Thêm kim chi muối chua +100,000") }),
      it(600000, null, T("묵은지 닭 볶음탕", "Spicy Braised Chicken with Aged Kimchi (Mugeunji Dak Bokkeumtang)", "老泡菜辣炖鸡块", "熟成キムチ入りタッポックンタン", "Gà hầm cay kim chi muối chua"), { spicy: true }),
      it([["중", 500000], ["대", 650000]], null, T("갈치 or 옥돔 조림", "Braised Hairtail or Tilefish (Galchi / Okdom Jorim)", "红烧带鱼或方头鱼", "タチウオまたはアマダイの煮付け", "Cá hố hoặc cá đục kho")),
      it([["중", 500000], ["대", 650000]], null, T("조기 조림", "Braised Yellow Croaker (Jogi Jorim)", "红烧黄花鱼", "イシモチの煮付け(チョギ煮)", "Cá lanh kho")),
      it([["중", 450000], ["대", 800000]], null, T("병어 조림", "Braised Butterfish (Byeongeo Jorim)", "红烧鲳鱼", "マナガツオの煮付け(ピョンオ煮)", "Cá chim kho")),
      it([["중", 450000], ["대", 600000]], "gopchang", T("곱창 전골", "Beef Tripe Hot Pot (Gopchang Jeongol)", "牛肠火锅", "ホルモン鍋(コプチャン・ジョンゴル)", "Lẩu lòng bò"), { tag: "best", spicy: true }),
      it(250000, null, T("동태전", "Pan-Fried Pollack Fillets (Dongtae-jeon)", "煎明太鱼片", "スケトウダラのチヂミ(トンテジョン)", "Cá phi lê tẩm bột chiên")),
      it(200000, null, T("해물 파전", "Seafood & Green Onion Pancake (Haemul Pajeon)", "海鲜葱饼", "海鮮ネギチヂミ(ヘムル・パジョン)", "Bánh xèo hải sản")),
      it(300000, "komak", T("꼬막 무침 (계절 메뉴)", "Seasoned Cockles (Seasonal) (Kkomak Muchim)", "凉拌血蚶(季节限定)", "ハマグリ和え(季節限定メニュー、コマク・ムチム)", "Sò huyết trộn (món theo mùa)"), { desc: T("500g", "500g", "500克", "500g", "500g") }),
    ],
  },
  {
    id: "imo",
    name: T("이모카세 (칠판 · 오늘의 특선)", "Imokase (Chalkboard · Today's Specials)", "阿姨特选(黑板 · 今日特选)", "イモカセ(黒板 · 本日のおすすめ)", "Imokase (bảng đen · món đặc biệt hôm nay)"),
    note: T("칠판에 적어 두는 메뉴라 날마다 달라질 수 있어요", "These dishes are written on the chalkboard, so they may change from day to day", "这些菜品写在黑板上,每天可能有所不同", "黒板に書かれるメニューのため、日によって変わることがあります", "Đây là các món ghi trên bảng đen nên có thể thay đổi theo từng ngày"),
    items: [
      it(500000, "muneo", T("문어 숙회", "Blanched Octopus (Muneo Sukhoe)", "白灼章鱼", "タコの湯引き(ムノ・スッケ)", "Bạch tuộc luộc")),
      it([["중", 550000], ["대", 650000]], null, T("아롱사태 수육", "Boiled Beef Shank Slices (Aarong-satae Suyuk)", "水煮牛腱肉", "牛すね肉の茹で(アロンサテ・スユク)", "Bắp bò luộc (Suyuk)")),
      it(500000, null, T("한치 초무침", "Seasoned Hanchi Squid in Vinegar Sauce (Hanchi Chomuchim)", "醋拌小鱿鱼", "ヤリイカの酢和え(ハンチ・チョムチム)", "Mực hanchi trộn giấm")),
      it([["중", 550000], ["대", 650000]], null, T("한치 보쌈", "Hanchi Squid Bossam (Hanchi Bossam)", "小鱿鱼包肉", "ヤリイカのポッサム", "Mực hanchi cuốn kiểu bossam")),
      it([["중", 550000], ["대", 650000]], null, T("갑오징어 보쌈", "Cuttlefish Bossam (Gabojingeo Bossam)", "墨鱼包肉", "コウイカのポッサム", "Mực nang cuốn kiểu bossam")),
      it(450000, null, T("소곱창 내장 전골 (우동사리)", "Beef Intestine Hot Pot with Udon Noodles (Sogopchang Naejang Jeongol)", "牛肠杂火锅(含乌冬面)", "牛ホルモン鍋(うどん入り)", "Lẩu lòng bò (kèm mì udon)")),
      it(600000, null, T("연탄불 고추장 불고기", "Charcoal-Grilled Chili Paste Bulgogi (Gochujang Bulgogi)", "炭火辣酱烤肉", "練炭焼きコチュジャン・プルコギ", "Thịt xào tương ớt nướng than")),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒水 · 饮料", "お酒 · ドリンク", "Rượu · Đồ uống"),
    items: [
      it(130000, null, T("소주 (참이슬 · 진로 · 처음처럼 · 새로)", "Soju (Chamisul · Jinro · Chum-churum · Saero)", "烧酒(Chamisul · Jinro · 初饮初乐 · Saero)", "焼酎(チャミスル · ジンロ · チョウムチョロム · セロ)", "Rượu soju (Chamisul · Jinro · Chum-churum · Saero)")),
      it(60000, null, T("생맥주 (SAPPORO)", "Draft Beer (SAPPORO)", "生啤酒(SAPPORO)", "生ビール(SAPPORO)", "Bia tươi (SAPPORO)")),
      it(50000, null, T("맥주 (타이거 · 사이공)", "Beer (Tiger · Saigon)", "啤酒(Tiger · 西贡)", "ビール(タイガー · サイゴン)", "Bia (Tiger · Sài Gòn)")),
      it(20000, null, T("콜라 · 사이다 · 환타 (코카콜라·스프라이트·환타)", "Cola · Lemon-Lime Soda · Fanta (Coca-Cola · Sprite · Fanta)", "可乐 · 柠檬汽水 · 芬达(可口可乐 · 雪碧 · 芬达)", "コーラ · サイダー · ファンタ(コカ・コーラ · スプライト · ファンタ)", "Coca · Sprite · Fanta (Coca-Cola · Sprite · Fanta)")),
    ],
  },
];
