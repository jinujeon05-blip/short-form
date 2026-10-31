// 훌랄라치킨 HOOLALA 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진(2026-10-31 수집, 올린 날짜 미상), 가격이 다르면 높은 쪽
// 영업시간: 구글 지도 '오전 11:00~오전 12:00'를 11:00부터 자정(24:00)까지로 해석
// 눈꽃 치즈: 메뉴판 한글이 일부 안 보여 베트남어 PHÔ MAI TUYẾT(눈꽃 치즈) 뜻을 따른 이름
// BBQ 쌈치킨: 한글 이름 일부 불명, 베트남어 GÀ BBQ CUỐN LÁ(잎에 싸 먹는 BBQ 치킨) 뜻을 따른 이름
// 라면사리·우동사리 가격은 손글씨로 덧써 있어 40,000(우동)은 확인 필요
// 그롤쉬·요펜 슈퍼두파는 사진마다 110,000/120,000 → 높은 쪽(120,000)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "훌랄라치킨", en: "HOOLALA" },
  phone: "0355 738 102",
  address: "Block B 005, The Manor, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:00 – 24:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ ...(price != null ? { price } : {}), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const ds = (ko, en, zh, ja, vi) => ({ desc: { ko, en, zh, ja, vi } });

window.MENU = [
  {
    id: "chicken",
    name: T("후라이드 치킨", "Fried Chicken", "炸鸡", "フライドチキン", "Gà chiên"),
    note: T("뼈 없는 순살로 선택 가능(+20,000동)", "Boneless available (+20,000 VND)", "可选无骨鸡肉（+20,000越南盾）", "骨なしに変更可能（+20,000ドン）", "Có thể lựa chọn gà không xương, thêm 20.000VND"),
    items: [
      it(340000, "friedchicken", "전통 후라이드", "Traditional Fried Chicken", "传统炸鸡", "オリジナルフライド", "Gà chiên truyền thống", { tag: "best" }),
      it(360000, null, "달콤매콤 후라이드", "Sweet & Spicy Fried Chicken", "甜辣炸鸡", "甘辛フライド", "Gà chiên cay ngọt"),
      it(360000, null, "초강력 매운 후라이드", "Super Spicy Fried Chicken", "超辣炸鸡", "激辛フライド", "Gà chiên siêu cay", { spicy: true }),
      it(360000, null, "허니 후라이드", "Honey Fried Chicken", "蜂蜜炸鸡", "ハニーフライド", "Gà chiên mật ong"),
    ],
  },
  {
    id: "bbq",
    name: T("대표 바베큐", "Best Barbecue", "招牌烤鸡", "人気バーベキュー", "Gà nướng"),
    note: T("뼈 없는 순살로 선택 가능(+20,000동)", "Boneless available (+20,000 VND)", "可选无骨鸡肉（+20,000越南盾）", "骨なしに変更可能（+20,000ドン）", "Có thể lựa chọn gà không xương, thêm 20.000VND"),
    items: [
      it(340000, null, "참숯 소금구이 바베큐", "Charcoal Salt-grilled Barbecue Chicken", "炭烤盐烤鸡", "炭火塩焼きバーベキュー", "Gà nướng truyền thống"),
      it(360000, null, "참숯 핫 바베큐", "Charcoal Hot Barbecue Chicken", "炭烤辣味烤鸡", "炭火ホットバーベキュー", "Gà nướng sốt cay", { spicy: true }),
      it(360000, null, "참숯 스위트 바베큐", "Charcoal Sweet Barbecue Chicken", "炭烤甜味烤鸡", "炭火スイートバーベキュー", "Gà nướng sốt cay ngọt"),
      it(380000, null, "참숯 한국식 매운 바베큐", "Charcoal Korean Super Spicy Barbecue Chicken", "炭烤韩式超辣烤鸡", "炭火韓国風激辛バーベキュー", "Gà nướng sốt Hàn siêu cay", { spicy: true }),
      it(380000, null, "간장 바베큐", "Soy Sauce Barbecue Chicken", "酱油烤鸡", "醤油バーベキュー", "Gà nướng sốt tương đen"),
      it(400000, null, "참숯 갈릭 바베큐", "Charcoal Garlic Barbecue Chicken", "炭烤蒜香烤鸡", "炭火ガーリックバーベキュー", "Gà nướng sốt tỏi"),
    ],
  },
  {
    id: "hit",
    name: T("순살 바베큐", "Hit Barbecue (Boneless)", "无骨烤鸡", "骨なしバーベキュー", "Gà nướng không xương"),
    items: [
      it(420000, null, "BBQ 쌈치킨", "BBQ Wrap Chicken", "BBQ包菜鸡", "BBQ包みチキン", "Gà BBQ cuốn lá"),
      it(480000, null, "로제 바베큐 치킨", "Rose Barbecue Chicken", "玫瑰酱烤鸡", "ロゼバーベキューチキン", "Gà nướng sốt Rose"),
      it(400000, null, "순살 파닭 바베큐", "Boneless Scallion Barbecue Chicken (Padak)", "无骨葱香烤鸡（葱鸡）", "骨なしネギバーベキューチキン（パダク）", "Gà nướng hành", ds("매운맛 보통 / 매운맛 많이 선택", "Choose medium or extra spicy", "可选中辣或特辣", "辛さは普通／辛め多めから選択", "Cay vừa / Cay nhiều")),
      it(460000, "snowcheese", "눈꽃 치즈 바베큐", "Snow Cheese Barbecue Chicken", "雪花芝士烤鸡", "雪花チーズバーベキュー", "Gà nướng phô mai tuyết sốt cay", { spicy: true }),
      it(480000, null, "눈꽃 치즈 초강력 바베큐", "Snow Cheese Super Spicy Barbecue Chicken", "雪花芝士超辣烤鸡", "雪花チーズ激辛バーベキュー", "Gà nướng phô mai tuyết sốt siêu cay", { spicy: true }),
    ],
  },
  {
    id: "snack",
    name: T("안주", "Snacks", "下酒菜", "おつまみ", "Đồ ăn nhẹ"),
    items: [
      it(280000, null, "오징어쥐포 세트", "Dried Squid & Filefish Set", "鱿鱼马面鱼干套餐", "イカ・カワハギ干しセット", "Set mực, cá bò, đậu phộng"),
      it(250000, null, "오뎅탕", "Fish Cake Soup (Odeng-tang)", "鱼糕汤", "おでん鍋", "Canh chả cá"),
      it(250000, null, "똥집 튀김", "Fried Chicken Gizzards (Ttongjip)", "炸鸡胗", "鶏の砂肝揚げ（トンジプ）", "Mề gà chiên"),
      it(270000, null, "치즈 나초", "Cheese Nachos", "芝士玉米片", "チーズナチョス", "Nachos phô mai"),
      it(200000, null, "황도", "Yellow Peach (Hwang-do)", "黄桃", "黄桃（ファンド）", "Nước đào Hwang-do"),
      it(120000, "fries", "감자튀김", "French Fries", "炸薯条", "フライドポテト", "Khoai tây chiên"),
      it(100000, null, "치즈스틱 5개", "Cheese Sticks (5 pcs)", "芝士条（5根）", "チーズスティック（5本）", "Phô mai que 5 chiếc"),
    ],
  },
  {
    id: "pizza",
    name: T("피자", "Pizza", "披萨", "ピザ", "Pizza"),
    items: [
      it(260000, "gorgonzola", "고르곤졸라", "Gorgonzola", "戈贡佐拉", "ゴルゴンゾーラ", "Gorgonzola"),
      it(260000, null, "마르게리따", "Margherita", "玛格丽特", "マルゲリータ", "Margherita"),
      it(270000, null, "고구마 피자", "Sweet Potato Pizza", "红薯披萨", "さつまいもピザ", "Pizza khoai lang"),
      it(270000, null, "빠따떼", "Patate (Potato Pizza)", "土豆披萨", "パタテ（ポテトピザ）", "Pizza Patate"),
      it(270000, null, "디아볼라", "Diavola", "魔鬼辣肠披萨", "ディアボラ", "Diavola", { spicy: true }),
      it(290000, null, "우삼겹 샐러드 피자", "Beef Loin Salad Pizza", "牛五花沙拉披萨", "牛バラサラダピザ", "Pizza salad ba chỉ bò"),
    ],
  },
  {
    id: "pasta-cream",
    name: T("크림 파스타", "Cream Pasta", "奶油意面", "クリームパスタ", "Mì Ý sốt kem"),
    items: [
      it(180000, null, "까르보나라", "Carbonara", "奶油培根意面", "カルボナーラ", "Carbonara"),
      it(200000, "pasta", "게살 크림 파스타", "Creamy Crab Pasta", "蟹肉奶油意面", "カニクリームパスタ", "Mì Ý kem thịt cua"),
      it(200000, null, "해산물 크림 파스타", "Seafood Cream Pasta", "海鲜奶油意面", "シーフードクリームパスタ", "Mì Ý kem hải sản"),
      it(220000, null, "상하이 해산물 파스타", "Shanghai Seafood Pasta", "上海海鲜意面", "上海風シーフードパスタ", "Mì Ý hải sản Thượng Hải", { spicy: true }),
      it(220000, null, "상하이 게살 파스타", "Shanghai Crab Pasta", "上海蟹肉意面", "上海風カニパスタ", "Mì Ý thịt cua Thượng Hải", { spicy: true }),
      it(220000, null, "로제 왕새우 파스타", "Rose King Prawn Pasta", "玫瑰酱大虾意面", "ロゼ大エビパスタ", "Mì Ý sốt Rose tôm lớn"),
      it(220000, null, "로제 치킨 파스타", "Rose Chicken Pasta", "玫瑰酱鸡肉意面", "ロゼチキンパスタ", "Mì Ý sốt Rose gà"),
      it(240000, null, "빠네 파스타", "Pane Pasta (Bacon or Seafood)", "面包盅意面（培根或海鲜）", "パネパスタ（ベーコンまたはシーフード）", "Mì Ý Pane (thịt xông khói hoặc hải sản)"),
    ],
  },
  {
    id: "pasta-tomato",
    name: T("토마토 파스타", "Tomato Pasta", "番茄意面", "トマトパスタ", "Mì Ý sốt cà chua"),
    items: [
      it(180000, null, "볼로네제", "Bolognese", "肉酱意面", "ボロネーゼ", "Bolognese"),
      it(200000, null, "해산물 토마토 파스타", "Seafood Tomato Pasta", "海鲜番茄意面", "シーフードトマトパスタ", "Mì Ý cà chua hải sản"),
      it(200000, null, "모짜렐라 파스타", "Mozzarella Pasta", "马苏里拉意面", "モッツァレラパスタ", "Mì Ý mozzarella"),
      it(200000, null, "아마트리치아나", "Amatriciana", "阿马特里斯意面", "アマトリチャーナ", "Amatriciana", { spicy: true }),
      it(220000, null, "쉬림프 파스타", "Shrimp Pasta", "鲜虾意面", "シュリンプパスタ", "Mì Ý tôm", { spicy: true }),
      it(220000, null, "우삼겹 토마토 파스타", "Beef Belly Tomato Pasta", "牛五花番茄意面", "牛バラトマトパスタ", "Mì Ý cà chua ba chỉ bò", { spicy: true }),
    ],
  },
  {
    id: "pasta-oil",
    name: T("오일 파스타", "Oil Pasta", "油醋意面", "オイルパスタ", "Mì Ý sốt dầu"),
    items: [
      it(200000, null, "봉골레 파스타", "Vongole Pasta", "蛤蜊意面", "ボンゴレパスタ", "Mì Ý Vongole"),
      it(200000, null, "상하이 오일 파스타", "Shanghai Oil Pasta", "上海油炒意面", "上海風オイルパスタ", "Mì Ý dầu Thượng Hải", { spicy: true }),
      it(220000, null, "우삼겹 오일 파스타", "Beef Belly Oil Pasta", "牛五花油醋意面", "牛バラオイルパスタ", "Mì Ý dầu ba chỉ bò", { spicy: true }),
    ],
  },
  {
    id: "rice",
    name: T("리조또 · 필라프", "Risotto & Pilaf", "烩饭 · 抓饭", "リゾット・ピラフ", "Risotto & Pilaf"),
    note: T("리조또 위에 치즈 추가(도리아) +30,000동", "Add cheese on top of risotto (Doria) +30,000 VND", "烩饭加芝士焗烤（Doria）+30,000越南盾", "リゾットにチーズ追加（ドリア）+30,000ドン", "Thêm phô mai lên risotto (Doria) +30.000VND"),
    items: [
      it(200000, null, "게살 크림 리조또", "Creamy Crab Risotto", "蟹肉奶油烩饭", "カニクリームリゾット", "Risotto kem thịt cua"),
      it(200000, null, "해산물 리조또", "Seafood Risotto (Tomato or Cream)", "海鲜烩饭（番茄或奶油）", "シーフードリゾット（トマトまたはクリーム）", "Risotto hải sản (cà chua hoặc kem)"),
      it(200000, null, "김치 필라프", "Kimchi Pilaf", "泡菜抓饭", "キムチピラフ", "Pilaf kim chi", { spicy: true }),
      it(200000, null, "새우 필라프", "Shrimp Pilaf", "鲜虾抓饭", "エビピラフ", "Pilaf tôm"),
      it(200000, null, "베이컨 버섯 필라프", "Bacon & Mushroom Pilaf", "培根蘑菇抓饭", "ベーコンきのこピラフ", "Pilaf thịt xông khói nấm"),
    ],
  },
  {
    id: "salad",
    name: T("샐러드", "Salad", "沙拉", "サラダ", "Salad"),
    items: [
      it(160000, null, "치킨 샐러드", "Chicken Salad", "鸡肉沙拉", "チキンサラダ", "Salad gà"),
      it(160000, "mangosalad", "망고 샐러드", "Mango Salad", "芒果沙拉", "マンゴーサラダ", "Salad xoài"),
    ],
  },
  {
    id: "side",
    name: T("사이드 · 토핑", "Side & Toppings", "配菜 · 加料", "サイド・トッピング", "Món thêm & Topping"),
    items: [
      it(30000, null, "라면사리", "Extra Ramyeon Noodles", "加拉面", "ラーメン追加", "Mì Ramen"),
      it(40000, null, "우동사리", "Extra Udon Noodles", "加乌冬面", "うどん追加", "Mì Udon"),
      it(80000, null, "치즈 / 눈꽃 치즈", "Cheese / Snow Cheese", "芝士 / 雪花芝士", "チーズ／雪花チーズ", "Phô mai chảy / Phô mai tuyết"),
      it(30000, null, "쌀떡", "Rice Cakes (Ssal Tteok)", "年糕", "米餅（ソルトク）", "Bánh gạo"),
      it(50000, null, "치즈떡", "Cheese Rice Cakes", "芝士年糕", "チーズ餅", "Bánh gạo phô mai"),
      it(40000, null, "파채", "Shredded Scallions (Pachae)", "葱丝", "ネギの千切り（パチェ）", "Hành baro"),
      it(30000, null, "햇반 150g", "Steamed Rice 150g (Hetbahn)", "米饭 150g", "ご飯 150g（ヘッパン）", "Cơm 150g"),
    ],
  },
  {
    id: "beer",
    name: T("생맥주 · 캔 · 소주", "Draft, Can & Soju", "生啤 · 罐装 · 烧酒", "生ビール・缶・焼酎", "Bia tươi, lon & Soju"),
    items: [
      it(90000, null, "1664 블랑 생맥주", "1664 Blanc Draft Beer", "1664白啤生啤", "1664ブラン生ビール", "Bia tươi 1664 Blanc"),
      it(60000, null, "칼스버그 생맥주", "Carlsberg Draft Beer", "嘉士伯生啤", "カールスバーグ生ビール", "Bia tươi Carlsberg"),
      it(40000, null, "타이거 캔맥주", "Tiger Canned Beer", "虎牌罐装啤酒", "タイガー缶ビール", "Bia lon Tiger"),
      it(130000, null, "소주(참이슬·처음처럼·진로이즈백·좋은데이)", "Soju (Chamisul · Chum Churum · Jinro Is Back · Good Day)", "烧酒（真露·初饮初乐·真露IS BACK·好日子）", "焼酎（チャミスル・チョウムチョロム・ジンロイズバック・チョウンデー）", "Rượu Soju (Chamisul · Chum Churum · Jinro Is Back · Gooday)"),
    ],
  },
  {
    id: "bottle",
    name: T("병맥주", "Bottled Beer", "瓶装啤酒", "瓶ビール", "Bia chai"),
    items: [
      it(80000, null, "레프 블론드", "Leffe Blonde", "乐芙金黄啤酒", "レフ・ブロンド", "Leffe Blonde"),
      it(80000, null, "레프 브라운", "Leffe Brune", "乐芙棕色啤酒", "レフ・ブラウン", "Leffe Brune"),
      it(80000, null, "크리스토펠 화이트", "Kristoffel White", "克里斯托弗白啤", "クリストッフェル・ホワイト", "Kristoffel White"),
      it(80000, null, "호가든", "Hoegaarden", "福佳白啤", "ヒューガルデン", "Hoegaarden"),
      it(90000, null, "스텔라 아르투아", "Stella Artois", "时代啤酒", "ステラ・アルトア", "Stella Artois"),
      it(130000, null, "시메이 블루", "Chimay Blue", "智美蓝帽", "シメイ・ブルー", "Chimay Blue"),
      it(150000, null, "두블(Duvel)", "Duvel", "督威", "デュベル", "Duvel"),
      it(90000, null, "스타로프라멘", "Staropramen", "斯达罗布拉门", "スタロプラメン", "Staropramen"),
      it(110000, null, "필스너 우르켈", "Pilsner Urquell", "皮尔森欧克", "ピルスナー・ウルケル", "Pilsner Urquell"),
      it(120000, null, "그롤쉬", "Grolsch", "喜力格罗尔施", "グロールシュ", "Grolsch"),
      it(120000, null, "요펜 슈퍼두파", "Jopen Super Dupa", "约彭超级杜帕", "ヨッペン・スーパーデュパ", "Jopen Super Dupa"),
      it(120000, null, "요펜 노스시 IPA", "Jopen Northsea IPA", "约彭北海IPA", "ヨッペン・ノースシーIPA", "Jopen Northsea IPA"),
      it(140000, null, "라트라페 블론드", "La Trappe Blond", "拉特拉普金黄啤酒", "ラ・トラップ・ブロンド", "La Trappe Blond"),
      it(150000, null, "라트라페 트리펠", "La Trappe Tripel", "拉特拉普三料啤酒", "ラ・トラップ・トリペル", "La Trappe Tripel"),
      it(80000, null, "1664 블랑", "1664 Blanc", "1664白啤", "1664ブラン", "1664 Blanc"),
      it(70000, null, "버드와이저", "Budweiser", "百威", "バドワイザー", "Budweiser"),
      it(80000, null, "코로나 엑스트라", "Corona Extra", "科罗娜", "コロナ・エキストラ", "Corona Extra"),
      it(50000, null, "타이거 크리스탈", "Tiger Crystal", "虎牌水晶啤酒", "タイガー・クリスタル", "Tiger Crystal"),
      it(40000, null, "사이공", "Saigon", "西贡啤酒", "サイゴン", "Bia Sài Gòn"),
      it(50000, null, "쭉박", "Trúc Bạch", "竹白啤酒", "チュックバック", "Trúc Bạch"),
      it(50000, null, "하이네켄", "Heineken", "喜力", "ハイネケン", "Heineken"),
    ],
  },
];
