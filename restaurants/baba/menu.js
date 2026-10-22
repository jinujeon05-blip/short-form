// 바바 BABA (227 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "바바 Baba" 폴더의 구글 지도 캡처 21장 (가게 계정이 올린 메뉴판 — 음식 1년 전·음료 8개월 전, 손님(3CO)이 1년 전 올린 인쇄 메뉴판, 지도 정보).
// 한국어·영어 표기는 메뉴판 그대로, 중국어·일본어·베트남어는 새로 번역. 가격 단위: VND (메뉴판은 "270K"·"150.000" 형식)
// 메뉴/가격 수정은 이 파일만 고치면 됩니다.
// it(가격, 한국어, 영어, 중국어, 일본어, 베트남어, 추가 설정) — 추가 설정: { spicy, tag: "best"|"special"|"new", desc, unit }
window.RESTAURANT = {
  brand: { ko: "바바", en: "BABA", branch: "Bắc Ninh · Võ Cường" },
  phone: "0354 671 233",
  address: "227 Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh",
  mapQuery: "바바 BABA",
  wifi: null,
};

const it = (price, ko, en, zh, ja, vi, x = {}) => ({ price, name: { ko, en, zh, ja, vi }, ...x });
const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const S = (s) => T(s, s, s, s, s); // 모든 언어에서 같은 글자 (재료·도수 등 영어 표기)
// 칵테일: 이름과 재료는 메뉴판 영어 표기 그대로
const ck = (price, name, ing, x = {}) => it(price, name, name, name, name, name, { desc: S(ing), ...x });
// 사이즈별 가격: sz([[라벨, 가격], …], 한국어, 영어, 중국어, 일본어, 베트남어, 추가 설정)
const sz = (pairs, ko, en, zh, ja, vi, x = {}) => ({ sizes: pairs, name: { ko, en, zh, ja, vi }, ...x });
const GLASS = T("잔", "Glass", "杯", "グラス", "Ly");
const TOWER = T("타워 3000cc", "Tower 3000cc", "啤酒塔 3000cc", "タワー 3000cc", "Tháp 3000cc");
const SHOT50 = T("샷 50ml", "Shot 50ml", "单杯 50ml", "ショット 50ml", "Shot 50ml");
const BOTTLE = T("병 700ml", "Bottle 700ml", "整瓶 700ml", "ボトル 700ml", "Chai 700ml");
const SERV = (a, b) => T(`${a}~${b}인분`, `Serves ${a}–${b}`, `${a}–${b}人份`, `${a}〜${b}人前`, `${a}–${b} người`);
const VATNOTE = T("음식 가격은 부가세 8% 별도, 세트(콤보)는 10% 별도예요", "Food prices exclude 8% VAT; combos exclude 10% VAT", "餐食价格不含 8% 增值税，套餐不含 10% 增值税", "料理の価格は付加価値税8%別、コンボは10%別です", "Giá món ăn chưa gồm VAT 8%, combo chưa gồm VAT 10%");

window.MENU = [
  {
    id: "combo",
    photo: "img/combo.jpg",
    name: T("바바 콤보", "BABA Combo", "BABA 套餐", "BABAコンボ", "Combo BABA"),
    note: T("세트 메뉴에는 부가세 10%가 별도로 부과돼요", "A 10% VAT is applicable to all combo menus", "套餐另加 10% 增值税", "コンボメニューには付加価値税10%が別途かかります", "Combo chưa gồm VAT 10%"),
    items: [
      it(1150000, "맥주타워 콤보", "Beer tower combo", "啤酒塔套餐", "ビールタワーコンボ", "Combo tháp bia",
        { unit: SERV(3, 4), desc: T("떡볶이 + 모둠튀김 + 후라이드 치킨 + 생맥주 3000cc 타워 (정가 1,290,000₫)", "Tteokbokki + mixed fried platter + fried chicken + 3000cc draft beer tower (regular price 1,290,000₫)", "辣炒年糕 + 炸物拼盘 + 炸鸡 + 3000cc 生啤塔（原价 1,290,000₫）", "トッポッキ + 揚げ物盛り合わせ + フライドチキン + 生ビール3000ccタワー（通常価格 1,290,000₫）", "Tteokbokki + đồ chiên thập cẩm + gà rán + tháp bia tươi 3000cc (giá gốc 1.290.000₫)") }),
      it(1000000, "소주 콤보", "Soju combo", "烧酒套餐", "焼酎コンボ", "Combo soju",
        { unit: SERV(2, 3), desc: T("오뎅탕 + 골뱅이 소면 + 소주 3병 (정가 1,150,000₫)", "Fish cake soup + spicy whelk somen + 3 bottles of soju (regular price 1,150,000₫)", "鱼饼汤 + 辣拌海螺素面 + 烧酒 3 瓶（原价 1,150,000₫）", "おでん鍋 + ツブ貝そうめん + 焼酎3本（通常価格 1,150,000₫）", "Lẩu chả cá + ốc biển trộn mì somen + 3 chai soju (giá gốc 1.150.000₫)") }),
      it(1880000, "와인 콤보", "Wine combo", "红酒套餐", "ワインコンボ", "Combo rượu vang",
        { unit: SERV(1, 2), desc: T("스테이크 플래터 + 레드와인(소노로소 벨벳) (정가 2,090,000₫)", "Steak platter + red wine (Sonoroso Velvet) (regular price 2,090,000₫)", "牛排拼盘 + 红酒（Sonoroso Velvet）（原价 2,090,000₫）", "ステーキプラッター + 赤ワイン（ソノロソ・ベルベット）（通常価格 2,090,000₫）", "Đĩa bít tết + rượu vang đỏ (Sonoroso Velvet) (giá gốc 2.090.000₫)") }),
    ],
  },
  {
    id: "korean",
    photo: "img/korean.jpg",
    name: T("한식", "Korean menu", "韩式料理", "韓国料理", "Món Hàn"),
    note: VATNOTE,
    items: [
      it(150000, "떡볶이", "Tteokbokki", "辣炒年糕", "トッポッキ", "Tteokbokki (bánh gạo cay)", { desc: T("국물 안주의 원조, 쫄깃한 떡과 매콤한 양념", "The original soup-style bar snack: chewy rice cakes in spicy sauce", "汤汁下酒菜的鼻祖，软糯年糕配香辣酱", "汁物おつまみの元祖。もちもちのお餅とピリ辛ソース", "Món nhắm nước dùng kinh điển: bánh gạo dai trong sốt cay"), spicy: true }),
      it(250000, "해물 오븐 치즈 떡볶이", "Seafood oven cheese tteokbokki", "海鲜烤芝士炒年糕", "海鮮オーブンチーズトッポッキ", "Tteokbokki hải sản phô mai nướng", { desc: T("해물, 치즈, 떡볶이를 오븐에 구워 진한 맛을 담았어요", "Seafood, cheese and tteokbokki baked in the oven for a rich flavor", "海鲜、芝士和年糕一同入烤箱，味道浓郁", "海鮮・チーズ・トッポッキをオーブンで焼いた濃厚な味わい", "Hải sản, phô mai và tteokbokki nướng lò, đậm đà hương vị"), tag: "special" }),
      it(400000, "골뱅이 소면", "Spicy whelk with somen noodles", "辣拌海螺素面", "ピリ辛ツブ貝のそうめん", "Ốc biển trộn mì somen cay", { desc: T("쏘주 한 병 부르는 그 맛, 매콤새콤한 골뱅이와 소면", "The taste that calls for a bottle of soju: tangy spicy whelk with thin noodles", "让人想来一瓶烧酒的味道，酸辣海螺配素面", "焼酎が進む味。甘酸っぱくピリ辛のツブ貝とそうめん", "Vị khiến bạn muốn gọi thêm chai soju: ốc biển chua cay với mì somen"), tag: "special", spicy: true }),
      it(350000, "골뱅이 볶음", "Stir-fried whelk", "炒海螺", "ツブ貝の炒め", "Ốc biển xào", { desc: T("매콤달콤한 양념에 볶아낸 골뱅이, 술맛을 살리는 안주", "Whelk stir-fried in sweet and spicy sauce — a snack that brings out the drink", "甜辣酱炒海螺，衬托酒香的下酒菜", "甘辛いタレで炒めたツブ貝。お酒が進むおつまみ", "Ốc biển xào sốt cay ngọt, món nhắm làm nổi vị rượu"), tag: "special", spicy: true }),
      it(300000, "어묵탕", "Fish cake soup", "鱼饼汤", "おでん鍋", "Lẩu chả cá", { desc: T("술이 계속된다면, 따끈한 국물과 탱글한 어묵이 속까지 풀어줘요", "Hot broth and bouncy fish cakes to warm you up as the drinks keep coming", "酒喝不停时，热汤和弹牙鱼饼暖胃解酒", "お酒が進むなら、熱々のスープとぷりぷりのおでんで胃を温めて", "Nước dùng nóng và chả cá dai ngon, giúp dịu dạ dày khi uống tiếp") }),
      it(450000, "해물 짬뽕탕", "Seafood jjamppong soup", "海鲜辣汤", "海鮮チャンポンスープ", "Canh hải sản kiểu jjamppong", { desc: T("신선한 해산물을 푸짐하게 넣은 국물 안주의 끝판왕", "The ultimate soup snack, generously loaded with fresh seafood", "满满新鲜海鲜的汤类下酒菜之王", "新鮮な海鮮たっぷりの汁物おつまみの王様", "Món nhắm nước dùng đỉnh cao với thật nhiều hải sản tươi"), spicy: true }),
    ],
  },
  {
    id: "dried",
    photo: "img/dried.jpg",
    name: T("마른안주", "Dried seafood & snacks", "干货下酒菜", "乾き物", "Mồi khô"),
    items: [
      it(270000, "반건조 오징어", "Semi-dried squid", "半干鱿鱼", "半乾燥イカ", "Mực bán khô", { desc: T("씹을수록 술이 당겨요. 불향과 쫄깃함이 살아있는 클래식 마른안주", "Chewier, tastier with every bite — smoky classic dried snack", "越嚼越想喝酒，烟熏香气与嚼劲十足的经典干货", "噛むほどにお酒が進む。炙りの香りと弾力の定番", "Càng nhai càng muốn uống: mồi khô kinh điển thơm lửa và dai ngon") }),
      it(250000, "먹태", "Grilled dried pollack (meoktae)", "烤干明太鱼（먹태）", "焼きミョクテ（干しスケトウダラ）", "Cá minh thái khô nướng (meoktae)", { desc: T("한 손에 먹태, 한 손에 소주. 바삭함 속 고소한 풍미의 구운 황태", "Meoktae in one hand, soju in the other — crispy, nutty grilled pollack", "一手干明太鱼，一手烧酒；酥脆中带着香醇", "片手にミョクテ、片手に焼酎。サクサクで香ばしい焼き干しスケトウダラ", "Một tay meoktae, một tay soju — cá minh thái nướng giòn thơm béo") }),
      it(270000, "한치 & 쥐포", "Hanchi squid & dried filefish", "小鱿鱼与马面鱼干", "ヤリイカ＆カワハギの干物", "Mực hanchi & cá bò khô", { desc: T("쫄깃한 한치와 달콤한 쥐포, 맥주 안주로 제격", "Chewy hanchi squid and sweet dried filefish — great with beer", "嚼劲十足的小鱿鱼和香甜马面鱼干，最适合配啤酒", "コリコリのヤリイカと甘いカワハギ。ビールにぴったり", "Mực hanchi dai và cá bò khô ngọt, rất hợp với bia") }),
      it(350000, "모둠 마른 안주", "Mixed dried snacks", "干货拼盘", "乾き物盛り合わせ", "Mồi khô thập cẩm", { desc: T("바삭하게, 다양하게, 넉넉하게! 마른안주 모음 세트", "Crispy, varied and generous — a set of assorted dried snacks", "酥脆、丰富、量足的干货合集", "サクサク、多彩、たっぷり。乾き物の盛り合わせ", "Giòn, đa dạng, đầy đặn — set mồi khô tổng hợp") }),
      it(450000, "용궁 세트", "Dragon Palace set", "龙宫套餐", "竜宮セット", "Set Long Cung", { desc: T("말린 바다의 종합 선물세트. 먹태, 오징어, 한치&쥐포까지 인기 메뉴만 한 판에", "A gift box of the dried sea: meoktae, squid, hanchi and filefish in one platter", "干海味综合礼盒：明太鱼干、鱿鱼、小鱿鱼和马面鱼干一盘尽享", "乾燥した海のギフトセット。ミョクテ・イカ・ヤリイカ・カワハギを一皿に", "Hộp quà hải sản khô: meoktae, mực, hanchi và cá bò khô trên một đĩa") }),
      it(449000, "치즈바바", "Cheese BABA platter", "BABA 芝士拼盘", "チーズBABA", "Đĩa phô mai BABA", { desc: T("와인 없어도 치즈는 진리. 다양한 치즈를 조합한 풍미 가득한 안주 세트", "Cheese is a must, even without wine — a platter of assorted cheeses", "没有红酒也少不了芝士：多种芝士拼成的下酒拼盘", "ワインがなくてもチーズは正義。多彩なチーズの盛り合わせ", "Phô mai luôn là chân ái dù không có rượu vang: đĩa nhiều loại phô mai") }),
    ],
  },
  {
    id: "chicken",
    photo: "img/chicken.jpg",
    name: T("치킨", "Chicken", "炸鸡", "チキン", "Gà rán"),
    items: [
      it(350000, "후라이드 치킨", "Fried chicken (boneless)", "炸鸡（无骨）", "フライドチキン（骨なし）", "Gà rán không xương", { desc: T("튀김의 기본은 바삭함. 겉은 바삭, 속은 촉촉한 순살 후라이드 치킨", "Crispy outside, juicy inside — boneless fried chicken", "外酥里嫩的无骨炸鸡", "外はサクサク、中はジューシーな骨なしフライドチキン", "Giòn bên ngoài, mềm ẩm bên trong — gà rán không xương") }),
      it(360000, "간장 치킨", "Soy garlic chicken", "酱油炸鸡", "醤油チキン", "Gà sốt xì dầu", { desc: T("짭짤하고 달큰한 매력. 간장 베이스 양념에 고소함을 더한 순살 치킨", "Salty-sweet charm: boneless chicken in a soy-based glaze", "咸甜兼具：酱油底酱汁的无骨炸鸡", "甘じょっぱい魅力。醤油ベースのタレの骨なしチキン", "Mặn ngọt hài hòa: gà không xương sốt nền xì dầu") }),
      it(360000, "양념 치킨", "Yangnyeom (sweet & spicy) chicken", "甜辣炸鸡", "ヤンニョムチキン", "Gà sốt cay ngọt (yangnyeom)", { desc: T("달달한 양념엔 맥주가 필수. 중독성 있는 매콤달콤 양념의 클래식한 조합", "Sweet sauce calls for beer — the classic, addictive sweet-and-spicy combo", "甜辣酱汁必配啤酒：让人上瘾的经典组合", "甘いタレにはビールが必須。クセになる甘辛の定番", "Sốt ngọt nên uống cùng bia: kết hợp cay ngọt gây nghiện") }),
      it(360000, "반반 치킨", "Half & half chicken", "半半炸鸡", "ハーフ＆ハーフチキン", "Gà nửa rán nửa sốt", { desc: T("고민될 땐 둘 다 가자. 후라이드와 양념을 반반으로 즐기는 세트", "Can't decide? Get both — half fried, half yangnyeom", "纠结时就都来：炸鸡与甜辣各一半", "迷ったら両方。フライドとヤンニョムを半々で", "Phân vân thì chọn cả hai: nửa gà rán, nửa gà sốt cay") }),
    ],
  },
  {
    id: "pizza",
    photo: "img/pizza.jpg",
    name: T("피자", "Pizza", "披萨", "ピザ", "Pizza"),
    items: [
      it(250000, "마르게리타", "Margherita", "玛格丽特披萨", "マルゲリータ", "Pizza Margherita", { desc: T("바질 + 토마토 + 모짜렐라의 완벽한 삼각관계", "Basil, tomato and mozzarella — the perfect trio", "罗勒、番茄和马苏里拉的完美三重奏", "バジル・トマト・モッツァレラの完璧なトリオ", "Bộ ba hoàn hảo: húng quế, cà chua, mozzarella") }),
      it(280000, "고르곤졸라", "Gorgonzola", "戈贡佐拉披萨", "ゴルゴンゾーラ", "Pizza Gorgonzola", { desc: T("고르곤졸라의 짭짤한 맛과 꿀 한 스푼의 달콤한 밀당", "Salty gorgonzola meets a spoonful of sweet honey", "咸香的戈贡佐拉配一勺甜蜜蜂蜜", "ゴルゴンゾーラの塩気とハチミツの甘さの駆け引き", "Gorgonzola mặn béo gặp một thìa mật ong ngọt"), tag: "special" }),
      it(250000, "하와이안", "Hawaiian", "夏威夷披萨", "ハワイアン", "Pizza Hawaii", { desc: T("피자에 파인애플? 당연히 YES! 단짠단짠의 정석", "Pineapple on pizza? Of course — the sweet-and-salty classic", "披萨上放菠萝？当然要！经典的甜咸搭配", "ピザにパイナップル？もちろんYES！甘じょっぱい定番", "Dứa trên pizza? Tất nhiên rồi! Ngọt mặn kinh điển") }),
      it(250000, "치즈 프리타타", "Cheese frittata", "芝士蛋饼", "チーズフリッタータ", "Frittata phô mai", { desc: T("치즈의 풍미, 바삭한 크래커와 함께하는 완벽한 한 조각", "Rich cheese flavor with crispy crackers — a perfect slice", "浓郁芝士风味，搭配酥脆饼干的完美一块", "濃厚チーズの風味とサクサククラッカーの完璧な一切れ", "Vị phô mai đậm đà cùng bánh quy giòn — một miếng hoàn hảo"), tag: "special" }),
    ],
  },
  {
    id: "grill",
    photo: "img/grill.jpg",
    name: T("오븐 & 그릴", "Oven & Grill", "烤箱与烧烤", "オーブン＆グリル", "Nướng lò & Grill"),
    items: [
      it(220000, "케사디야", "Quesadilla", "墨西哥芝士饼", "ケサディーヤ", "Quesadilla", { desc: T("치즈 한입, 기분 업! 노릇하게 구운 또르띠야 속 치즈가 술맛을 살려줘요", "One bite of cheese lifts your mood — melted cheese in a golden tortilla", "一口芝士心情大好：金黄烤饼里的芝士衬托酒香", "チーズの一口で気分アップ！こんがり焼いたトルティーヤのチーズがお酒を引き立てます", "Một miếng phô mai là vui ngay — phô mai trong bánh tortilla nướng vàng"), tag: "special" }),
      it(250000, "모둠 소시지", "Mixed sausage platter", "香肠拼盘", "ソーセージ盛り合わせ", "Xúc xích thập cẩm", { desc: T("소시지엔 맥주가 국룰. 짭짤한 그릴 소시지와 감자, 든든한 안주 한 판", "Sausages and beer, the golden rule — grilled sausages and fries on one plate", "香肠配啤酒是铁律：烤香肠和薯条的丰盛下酒盘", "ソーセージにはビール。グリルソーセージとポテトのボリューム皿", "Xúc xích và bia là chân lý — xúc xích nướng và khoai tây chiên đầy đặn") }),
      it(450000, "찹스테이크", "Chop steak", "切块牛排", "チョップステーキ", "Bò áp chảo cắt miếng (chop steak)", { desc: T("육즙에 진심인 분들을 위해 풍미 가득한 스테이크를 노릇하게 구웠어요", "For juicy-meat lovers — flavorful steak pieces grilled golden", "献给热爱肉汁的你：烤得金黄、风味十足的牛排块", "肉汁にこだわる方へ。風味たっぷりのステーキをこんがり焼き上げました", "Dành cho người mê nước thịt: bò cắt miếng nướng vàng đậm vị"), tag: "special" }),
      it(590000, "스테이크 플래터", "Steak platter", "牛排拼盘", "ステーキプラッター", "Đĩa bít tết", { desc: T("고기는 늘 옳다. 그릴에 구워낸 두툼한 스테이크와 감자", "Meat is always right — thick grilled steak with potatoes", "肉永远是对的：烤得厚实的牛排配土豆", "お肉は常に正義。グリルで焼いた厚切りステーキとポテト", "Thịt luôn đúng — bít tết dày nướng kèm khoai tây") }),
    ],
  },
  {
    id: "fried",
    photo: "img/fried.jpg",
    name: T("튀김", "Deep-fried", "油炸类", "揚げ物", "Món chiên"),
    items: [
      it(60000, "어묵채 튀김", "Fish cake strip fries", "鱼饼丝天妇罗", "細切りおでん揚げ", "Chả cá chiên sợi", { desc: T("맥주 안주로 이만한 게 없다. 겉은 바삭, 속은 쫄깃, 시원한 맥주와 최고의 조합", "Nothing beats it with beer — crispy outside, chewy inside", "配啤酒最合适：外酥里韧，与冰啤酒绝配", "ビールのおつまみにこれ以上なし。外はサクサク、中はもちもち", "Hợp bia nhất: giòn ngoài, dai trong, kết hợp tuyệt vời với bia lạnh"), tag: "special" }),
      it(250000, "오븐 치즈 감자튀김", "Oven cheese fries", "烤芝士薯条", "オーブンチーズポテト", "Khoai tây chiên phô mai nướng", { desc: T("감자 위에 치즈, 그 위엔 술! 오븐에 치즈를 듬뿍 얹은 진한 맛의 감자 안주", "Cheese on potatoes, drinks on top — oven-baked fries loaded with cheese", "薯条上铺满芝士再来一杯：烤箱烤出的浓郁芝士薯条", "ポテトの上にチーズ、その上にお酒！オーブンでチーズたっぷりの濃厚ポテト", "Phô mai phủ khoai tây, rồi đến rượu — khoai chiên phủ nhiều phô mai nướng lò") }),
      it(300000, "돈까스", "Pork cutlet", "炸猪排", "とんかつ", "Thịt heo chiên xù (tonkatsu)", { desc: T("바바 특제 소스 돈까스. 바삭한 튀김옷과 촉촉한 속살, 누구나 좋아하는 메뉴", "BABA's special-sauce cutlet — crispy coating, juicy meat, a crowd-pleaser", "BABA 特制酱汁猪排：酥脆外衣、嫩滑多汁，人人喜爱", "BABA特製ソースのとんかつ。サクサクの衣としっとりのお肉", "Thịt heo chiên xù sốt đặc biệt của BABA — vỏ giòn, thịt mềm, ai cũng thích") }),
      it(200000, "모둠튀김", "Mixed fried platter", "炸物拼盘", "揚げ物盛り合わせ", "Đồ chiên thập cẩm", { desc: T("이것저것 골라 먹는 재미. 고추, 만두, 김말이 등 다양한 튀김을 한 접시에", "The fun of picking a bit of everything — peppers, dumplings, gimmari and more", "各种都尝一点的乐趣：辣椒、饺子、紫菜卷等多种炸物同盘", "あれこれ選ぶ楽しさ。唐辛子・餃子・のり巻き揚げなど色々な揚げ物を一皿に", "Niềm vui gắp đủ thứ — ớt, há cảo, gimmari và nhiều món chiên trên một đĩa") }),
    ],
  },
  {
    id: "salad",
    photo: "img/salad.jpg",
    name: T("샐러드", "Salad", "沙拉", "サラダ", "Salad"),
    items: [
      it(350000, "케이준 샐러드", "Cajun salad", "卡津沙拉", "ケイジャンサラダ", "Salad Cajun", { desc: T("샐러드의 묘미를 담다. 바삭한 케이준 치킨과 채소가 만나 완성한 샐러드", "The charm of salad — crispy Cajun chicken with fresh vegetables", "沙拉的精髓：酥脆卡津鸡肉与蔬菜的结合", "サラダの醍醐味。サクサクのケイジャンチキンと野菜", "Tinh túy của salad: gà Cajun giòn cùng rau tươi") }),
      it(270000, "멕시칸 샐러드", "Mexican salad", "墨西哥沙拉", "メキシカンサラダ", "Salad Mexico", { desc: T("햄, 삶은 달걀, 신선한 채소까지! 달콤·고소한 한국식 멕시칸 샐러드", "Ham, boiled egg and fresh vegetables — a sweet, nutty Korean-style Mexican salad", "火腿、水煮蛋和新鲜蔬菜！香甜的韩式墨西哥沙拉", "ハム・ゆで卵・新鮮野菜まで！甘くて香ばしい韓国式メキシカンサラダ", "Giăm bông, trứng luộc và rau tươi! Salad Mexico kiểu Hàn ngọt bùi") }),
      it(270000, "비프 샐러드", "Beef salad", "牛肉沙拉", "ビーフサラダ", "Salad bò", { desc: T("샐러드에 불맛을 입히다. 그릴에 구운 소고기와 채소가 술을 부릅니다", "Salad with a grilled kick — grilled beef and vegetables that call for a drink", "给沙拉添上火烤香：烤牛肉与蔬菜，最适合配酒", "サラダに炙りの香りを。グリルした牛肉と野菜がお酒を呼びます", "Salad thêm hương nướng: bò nướng và rau rất hợp với rượu"), tag: "special" }),
      it(270000, "아보카도 닭가슴살 샐러드", "Avocado chicken breast salad", "牛油果鸡胸肉沙拉", "アボカドと鶏むね肉のサラダ", "Salad bơ ức gà", { desc: T("부드러운 아보카도, 담백한 닭가슴살. 깔끔한 맛으로 어울리는 프리미엄 샐러드", "Creamy avocado and light chicken breast — a clean-tasting premium salad", "绵软牛油果配清淡鸡胸肉：口味清爽的高级沙拉", "なめらかなアボカドとあっさり鶏むね肉。すっきり味のプレミアムサラダ", "Bơ mềm mịn, ức gà thanh đạm — salad cao cấp vị thanh nhẹ") }),
      it(220000, "요거트 과일 샐러드", "Yogurt fruit salad", "酸奶水果沙拉", "ヨーグルトフルーツサラダ", "Salad trái cây sữa chua", { desc: T("가볍게, 상큼하게, 예쁘게. 입가심처럼 즐기는 과일 디저트 샐러드", "Light, fresh and pretty — a fruit dessert salad to cleanse the palate", "轻盈、清新、好看：像清口小点一样的水果甜点沙拉", "軽やかで爽やかで可愛い。口直しのようなフルーツデザートサラダ", "Nhẹ nhàng, tươi mát, đẹp mắt — salad trái cây tráng miệng") }),
    ],
  },
  {
    id: "finger",
    photo: "img/finger.jpg",
    name: T("핑거푸드", "Finger food", "手指小食", "フィンガーフード", "Finger food"),
    items: [
      it(250000, "카나페", "Canapé", "开胃小点", "カナッペ", "Canapé", { desc: T("한 입에 즐기는 작은 미식. 크래커 위에 신선한 토핑을 얹은 바바 스타일 카나페", "A small delicacy in one bite — BABA-style canapés with fresh toppings on crackers", "一口享受的小美味：饼干上放新鲜配料的 BABA 风格开胃点", "ひと口で楽しむ小さな美食。クラッカーに新鮮なトッピングを乗せたBABAスタイルのカナッペ", "Món nhỏ ngon trong một miếng: canapé kiểu BABA với topping tươi trên bánh quy") }),
      it(130000, "방울토마토 핑거", "Cherry tomato fingers", "圣女果小串", "ミニトマトのピンチョス", "Cà chua bi xiên", { desc: T("상큼함으로 시작하는 한 입. 방울토마토와 치즈의 조화, 가볍게 즐기는 핑거푸드", "A fresh start — cherry tomatoes and cheese, a light finger food", "以清爽开场的一口：圣女果与芝士的搭配，轻松享用", "爽やかに始まる一口。ミニトマトとチーズの調和、軽く楽しむフィンガーフード", "Khởi đầu tươi mát: cà chua bi và phô mai, món nhẹ nhàng dễ ăn") }),
      it(200000, "양송이버섯 치즈구이", "Cheese-baked mushrooms", "芝士烤蘑菇", "マッシュルームのチーズ焼き", "Nấm mỡ nướng phô mai", { desc: T("치즈의 풍미를 품은 한 입. 신선한 양송이에 치즈를 올려 바삭하게 구워낸 요리", "A bite full of cheesy flavor — fresh mushrooms topped with cheese and baked crisp", "满含芝士香的一口：新鲜蘑菇铺上芝士烤至酥香", "チーズの風味を抱いた一口。新鮮なマッシュルームにチーズを乗せて香ばしく焼き上げ", "Một miếng đậm vị phô mai: nấm mỡ tươi phủ phô mai nướng giòn"), tag: "special" }),
      it(150000, "참치마요 오이롤", "Tuna mayo cucumber rolls", "金枪鱼蛋黄酱黄瓜卷", "ツナマヨきゅうりロール", "Cuộn dưa leo cá ngừ sốt mayo", { desc: T("시원하게 즐기는 한 입 안주. 참치마요를 오이로 감싼 깔끔한 맛", "A cool one-bite snack — tuna mayo wrapped in cucumber", "清爽的一口下酒菜：黄瓜卷着金枪鱼蛋黄酱", "ひんやり一口おつまみ。ツナマヨをきゅうりで巻いたさっぱり味", "Món nhắm mát lạnh một miếng: cá ngừ sốt mayo cuộn dưa leo") }),
    ],
  },
  {
    id: "meals",
    photo: "img/meals.jpg",
    name: T("식사류", "Meals", "主食", "食事", "Món ăn chính"),
    items: [
      it(220000, "새우 커리 크림 우동", "Shrimp curry cream udon", "咖喱奶油虾乌冬", "エビカレークリームうどん", "Udon tôm cà ri kem", { desc: T("진한 향과 부드러운 면발. 새우와 커리, 크림이 어우러진 부드러운 퓨전 우동", "Rich aroma and smooth noodles — fusion udon with shrimp, curry and cream", "香气浓郁、面条顺滑：虾、咖喱和奶油交融的创意乌冬", "濃厚な香りとなめらかな麺。エビ・カレー・クリームが絡む創作うどん", "Hương thơm đậm, sợi mì mềm — udon fusion tôm, cà ri và kem"), tag: "special" }),
      it(250000, "해산물 볶음 우동", "Spicy seafood stir-fried udon", "海鲜炒乌冬", "海鮮炒めうどん", "Udon xào hải sản", { desc: T("불향과 감칠맛, 한 그릇 완성. 쫄깃한 우동에 매콤한 해산물을 더한 철판 스타일 볶음", "Smoky and savory in one bowl — chewy udon with spicy seafood, teppan style", "火香与鲜味合一：弹牙乌冬加香辣海鲜的铁板炒", "炙りの香りとうま味の一杯。もちもちうどんにピリ辛海鮮を加えた鉄板風炒め", "Thơm lửa, đậm vị trong một tô: udon dai xào hải sản cay kiểu teppan"), spicy: true }),
    ],
  },
  {
    id: "fruit",
    photo: "img/fruit.jpg",
    name: T("과일", "Fruit", "水果", "フルーツ", "Trái cây"),
    items: [
      it(320000, "모둠 과일 안주", "Mixed fruit platter", "水果拼盘", "フルーツ盛り合わせ", "Đĩa trái cây thập cẩm", { desc: T("달콤한 과일로 술자리를 쉬어가요. 알코올 사이사이, 입가심처럼 즐기는 과일 한 접시", "Take a sweet break from drinking — a fruit plate to enjoy between rounds", "用香甜水果给酒局歇口气：酒与酒之间清口的水果盘", "甘いフルーツで一息。お酒の合間の口直しの一皿", "Nghỉ ngơi giữa buổi nhậu với trái cây ngọt — đĩa trái cây tráng miệng") }),
      it(270000, "열대과일 화채", "Tropical fruit punch bowl", "热带水果冰饮", "トロピカルフルーツ・ファチェ", "Chè trái cây nhiệt đới (hwachae)", { desc: T("입도 시원, 기분도 시원. 과일과 얼음을 가득 담은 디저트 같은 안주", "Cool for the mouth and the mood — a dessert-like dish full of fruit and ice", "口爽心也爽：装满水果与冰块的甜点式下酒菜", "口もスッキリ、気分もスッキリ。フルーツと氷たっぷりのデザートのような一品", "Mát miệng, mát lòng — món nhắm như tráng miệng đầy trái cây và đá") }),
    ],
  },
  {
    id: "beer",
    photo: "img/beer.jpg",
    name: T("맥주", "Beer", "啤酒", "ビール", "Bia"),
    note: T("크래프트 비어 6종 · 생맥주 4종 (맥주 타워는 3000cc)", "6 craft beers and 4 draft beers (beer tower is 3000cc)", "精酿啤酒 6 款、生啤 4 款（啤酒塔为 3000cc）", "クラフトビール6種・生ビール4種（ビールタワーは3000cc）", "6 loại bia thủ công và 4 loại bia tươi (tháp bia 3000cc)"),
    items: [
      it(99000, "Jasmine IPA", "Jasmine IPA", "Jasmine IPA", "Jasmine IPA", "Jasmine IPA", { desc: S("Craft beer · ABV 6.5%") }),
      it(99000, "Pomelo IPA", "Pomelo IPA", "Pomelo IPA", "Pomelo IPA", "Pomelo IPA", { desc: S("Craft beer · ABV 6.2%") }),
      it(99000, "Nitro Irish", "Nitro Irish", "Nitro Irish", "Nitro Irish", "Nitro Irish", { desc: S("Craft beer · ABV 4.5%") }),
      it(99000, "Amber Ale", "Amber Ale", "Amber Ale", "Amber Ale", "Amber Ale", { desc: S("Craft beer · ABV 4.5%") }),
      it(99000, "Salted Lime", "Salted Lime", "Salted Lime", "Salted Lime", "Salted Lime", { desc: S("Craft beer · ABV 2.2%") }),
      it(99000, "Passion Ale", "Passion Ale", "Passion Ale", "Passion Ale", "Passion Ale", { desc: S("Craft beer · ABV 4%"), tag: "new" }),
      sz([[GLASS, 70000], [TOWER, 590000]], "Carlsberg", "Carlsberg", "Carlsberg", "Carlsberg", "Carlsberg", { desc: S("Draft beer · ABV 5%") }),
      sz([[GLASS, 70000], [TOWER, 590000]], "1664 Blanc", "1664 Blanc", "1664 Blanc", "1664 Blanc", "1664 Blanc", { desc: S("Draft beer · ABV 5%") }),
      sz([[GLASS, 70000], [TOWER, 590000]], "Sapporo", "Sapporo", "Sapporo", "Sapporo", "Sapporo", { desc: S("Draft beer · ABV 5%") }),
      it(90000, "Sapporo Black", "Sapporo Black", "Sapporo Black", "Sapporo Black", "Sapporo Black", { desc: S("Draft beer · ABV 5%") }),
    ],
  },
  {
    id: "signature",
    photo: "img/signature.jpg",
    name: T("시그니처 칵테일", "Signature cocktails", "特色鸡尾酒", "シグネチャーカクテル", "Cocktail đặc trưng"),
    items: [
      ck(220000, "Peachy Melody", "Havana Club 3 Años · Peach liqueur · Elder flower syrup · Lemon juice · Basil leaf"),
      ck(220000, "Euphoria", "Havana Club 3 Años · Banana liqueur · Frangelico · Pineapple & lime juice"),
      ck(240000, "Salut", "Giffard Abricot · Giffard Violette · Fino sherry · Lillet Blanc · Lemon juice · Peychaud's bitter"),
      ck(220000, "All About Grape", "Hennessy Cognac VSOP · Lemon juice · Grenadine · Chocolate bitter · Dark grape"),
      ck(200000, "Zest", "Lemon vodka · Sweet vermouth · Coffee liqueur · Orange juice · Free Tree tonic"),
      ck(200000, "Coffee Melody", "Coffee liqueur · Sweet vermouth · Fino sherry"),
      ck(220000, "Green Fairy", "Beefeater gin · Pineapple & lime juice · Melon liqueur · Mint leaves · Rose syrup"),
      ck(240000, "Good Old Day", "Tanqueray gin · Passion syrup · Limon juice · Shiso leave · Sesame oil & soda"),
      ck(240000, "Coco Mango", "Mixed mango rum · Smoky whisky · Coconut yogurt liqueur · Mango puree · Lemon juice"),
      ck(220000, "Tropi Cassion", "Lemon vodka · Passion & coconut syrup · Pineapple & lime juice · Coconut cream"),
      ck(250000, "Jack's Whirlwind", "Pandan jackfruit Bacardi · Maraschino Luxardo · Popcorn syrup · Pineapple juice · Coconut & lime juice · Aloe vera yogurt"),
      ck(240000, "Merhii Martini", "Roku gin & sloe gin · Dry vermouth · Cherry liqueur · Orange bitter"),
    ],
  },
  {
    id: "classic",
    photo: "img/classic.jpg",
    name: T("클래식 칵테일", "Classic cocktails", "经典鸡尾酒", "クラシックカクテル", "Cocktail cổ điển"),
    items: [
      ck(170000, "Margarita", "Tequila Jose silver · Orange liqueur · Lime juice"),
      ck(170000, "Whiskey Sour", "Jim Beam · Angostura bitter · Lime juice & egg white"),
      ck(190000, "Song Of The Birds", "Rittenhouse rye whisky · Sweet vermouth · Orange & lemon juice · Grenadine · Peychaud bitter"),
      ck(190000, "Fallen Angel", "Tanqueray gin · Crème de menthe · Lemon juice · Angostura bitter"),
      ck(190000, "Pornstar NOVA", "White rum · Apricot & orange liqueur · Apple & lime juice · Passion syrup"),
      ck(180000, "Mai Tai", "White & dark rum · Orange liqueur · Lime juice · Almond syrup"),
      ck(150000, "Black Russian", "Vodka · Coffee liqueur"),
      ck(150000, "White Russian", "Vodka · Coffee liqueur · Cream"),
      ck(170000, "Negroni", "Beefeater gin · Sweet vermouth · Campari"),
      ck(200000, "Ping Pong Cocktail", "Sloe gin · Dry & sweet vermouth · Cynar · Orange bitter"),
      ck(200000, "10.7.1 Cock's Tail", "Patrón Reposado · Maker's Mark · Sweet vermouth · White cacao liqueur · Agave syrup · Absinthe 69"),
      ck(180000, "El Presidente", "White rum · Dry vermouth · Blue curaçao · Grenadine syrup · Saline solution"),
    ],
  },
  {
    id: "mix",
    photo: "img/mix.jpg",
    name: T("믹스 드링크", "Mixed drinks", "调和饮品", "ミックスドリンク", "Đồ uống pha"),
    items: [
      ck(150000, "Gin Tonic", "Beefeater gin · Tonic water"),
      ck(150000, "Highball", "JW Black Label · Soda water or Coke"),
      ck(150000, "Tequila Pop", "Jose Blanco · Sprite"),
      ck(150000, "Jäger Bomb", "Jägermeister · Red Bull"),
      ck(150000, "Rum Coke", "Bacardi white rum · Coke"),
      ck(150000, "Vodka Red Bull", "SKY vodka · Red Bull"),
    ],
  },
  {
    id: "mocktail",
    photo: "img/mocktail.jpg",
    name: T("모크테일 (무알코올)", "Mocktails (non-alcoholic)", "无酒精鸡尾酒", "モクテル（ノンアルコール）", "Mocktail (không cồn)"),
    items: [
      ck(100000, "Very Berry", "Cranberry juice · Lime juice · Grenadine syrup · Rose syrup"),
      ck(100000, "Cutie Tiny", "Orange juice · Passion syrup · Lime juice · Elder flower syrup"),
      ck(100000, "Dayjua", "Pineapple juice · Passion syrup · Limon juice · Mint leaf & soda water"),
      ck(100000, "Coco Passion", "Passion & limon juice · Pineapple juice · Coconut syrup & cream"),
      ck(100000, "Peachy Blueri", "Cranberry juice · Blueberry & peach syrup · Limon juice & soda"),
      ck(100000, "Oranginal", "Cranberry juice · Blueberry & peach syrup · Limon & orange juice"),
    ],
  },
  {
    id: "shot",
    photo: "img/shot.jpg",
    name: T("샷", "Shots", "烈酒小杯", "ショット", "Shot"),
    items: [
      ck(130000, "B52", "Coffee liqueur · Irish cream · Orange liqueur"),
      ck(130000, "B53", "Coffee liqueur · Irish cream · Smirnoff vodka"),
      ck(130000, "B54", "Coffee liqueur · Amaretto liqueur · Irish cream"),
      ck(130000, "B55", "Coffee liqueur · Irish cream · Absinthe 55"),
      ck(130000, "B57", "Coffee liqueur · Crème de menthe · Orange liqueur"),
      it(130000, "데킬라 샷", "Tequila shot", "龙舌兰 Shot", "テキーラショット", "Tequila shot", { desc: S("Tequila silver · Salt · Lime wedge") }),
    ],
  },
  {
    id: "bottled",
    photo: "img/bottled.jpg",
    name: T("바바 인퓨즈드 스피릿", "BABA bottled spirits", "BABA 自制浸泡酒", "BABA インフューズドスピリッツ", "Rượu ngâm BABA"),
    note: T("과일과 향신료로 천천히 우려낸 바바 수제 인퓨즈드 스피릿이에요. 가격은 1샷 기준입니다", "House-crafted infused spirits, slowly infused with fruits and spices. Prices are per shot", "用水果和香料慢慢浸泡而成的 BABA 自制酒，价格为每杯（shot）", "果物とスパイスでじっくり漬け込んだBABA自家製のスピリッツ。価格は1ショットあたり", "Rượu ngâm tại quán với trái cây và gia vị. Giá tính theo 1 shot"),
    items: [
      ck(170000, "Orange Whisky Cinnamon", "Mixed blend whisky · Orange peel · Cinnamon stick"),
      ck(150000, "Mango Rum", "Bacardi white rum · Diced mango"),
      ck(160000, "Jackmine Panda Rum", "Bacardi white rum · Chopped jackfruit · Pandan leaf"),
      ck(150000, "Lemon Vodka", "Mixed vodka · Lemon peel"),
      ck(170000, "Smoky Tequila Cinnamon", "Tequila Jose silver · Grilled pineapple peel · Cinnamon stick"),
      ck(150000, "Pineapple Gin", "Mixed dry gin · Sliced pineapple"),
      ck(160000, "Rossi Berry Gin", "Bombay Sapphire · Dried roses · Fresh berry mixture"),
      ck(160000, "Butterfly Bluecuracao Gin", "Beefeater dry gin · Butterfly flower · Orange peel · Blue curaçao liqueur"),
    ],
  },
  {
    id: "highball",
    name: T("하이볼", "Highballs", "高球", "ハイボール", "Highball"),
    note: T("1년 전 인쇄 메뉴판 기준이라 지금과 다를 수 있어요. 가게에 확인해 주세요", "Based on the printed menu from a year ago — please check with the staff", "根据一年前的纸质菜单，可能已有变动，请向店员确认", "1年前の紙のメニュー基準のため変更の可能性があります。店員にご確認ください", "Theo thực đơn in từ một năm trước, có thể đã thay đổi — vui lòng hỏi nhân viên"),
    items: [
      it(140000, "모히토 하이볼", "Mojito Highball", "莫吉托高球", "モヒートハイボール", "Mojito Highball", { desc: T("화이트 럼 · 라임 · 민트 · ABV 6.5% (+1 샷 45,000₫)", "White rum · Lime · Mint · ABV 6.5% (+1 shot 45,000₫)", "白朗姆 · 青柠 · 薄荷 · ABV 6.5%（加 1 shot 45,000₫）", "ホワイトラム・ライム・ミント・ABV 6.5%（+1ショット 45,000₫）", "Rum trắng · Chanh xanh · Bạc hà · ABV 6.5% (+1 shot 45.000₫)") }),
      it(130000, "톰 콜린스 하이볼", "Tom Collins Highball", "汤姆柯林斯高球", "トム・コリンズ・ハイボール", "Tom Collins Highball", { desc: T("진 · 라임 · 레몬 · ABV 6.9% (+1 샷 40,000₫)", "Gin · Lime · Lemon · ABV 6.9% (+1 shot 40,000₫)", "琴酒 · 青柠 · 柠檬 · ABV 6.9%（加 1 shot 40,000₫）", "ジン・ライム・レモン・ABV 6.9%（+1ショット 40,000₫）", "Gin · Chanh xanh · Chanh vàng · ABV 6.9% (+1 shot 40.000₫)") }),
      it(140000, "청포도 하이볼", "Green Grape Highball", "青葡萄高球", "マスカットハイボール", "Highball nho xanh", { desc: T("보드카 · 청포도 · 라임 · ABV 6.5% (+1 샷 40,000₫)", "Vodka · Green grape · Lime · ABV 6.5% (+1 shot 40,000₫)", "伏特加 · 青葡萄 · 青柠 · ABV 6.5%（加 1 shot 40,000₫）", "ウォッカ・青ぶどう・ライム・ABV 6.5%（+1ショット 40,000₫）", "Vodka · Nho xanh · Chanh xanh · ABV 6.5% (+1 shot 40.000₫)") }),
      it(170000, "롱아일랜드 아이스티", "Long Island Iced Tea", "长岛冰茶", "ロングアイランド・アイスティー", "Long Island Iced Tea", { desc: T("보드카 · 진 · 럼 · 데킬라 · 쿠앵트로 · ABV 8.6% (+1 샷 70,000₫)", "Vodka · Gin · Rum · Tequila · Cointreau · ABV 8.6% (+1 shot 70,000₫)", "伏特加 · 琴酒 · 朗姆酒 · 龙舌兰 · 君度橙酒 · ABV 8.6%（加 1 shot 70,000₫）", "ウォッカ・ジン・ラム・テキーラ・コアントロー・ABV 8.6%（+1ショット 70,000₫）", "Vodka · Gin · Rum · Tequila · Cointreau · ABV 8.6% (+1 shot 70.000₫)") }),
    ],
  },
  {
    id: "whisky",
    name: T("싱글 몰트 위스키", "Single malt whisky", "单一麦芽威士忌", "シングルモルトウイスキー", "Whisky đơn mạch"),
    note: T("1년 전 인쇄 메뉴판 기준이라 지금과 다를 수 있어요. 가게에 확인해 주세요", "Based on the printed menu from a year ago — please check with the staff", "根据一年前的纸质菜单，可能已有变动，请向店员确认", "1年前の紙のメニュー基準のため変更の可能性があります。店員にご確認ください", "Theo thực đơn in từ một năm trước, có thể đã thay đổi — vui lòng hỏi nhân viên"),
    items: [
      sz([[SHOT50, 250000], [BOTTLE, 2500000]], "글렌피딕 12년", "Glenfiddich 12", "格兰菲迪 12 年", "グレンフィディック12年", "Glenfiddich 12", { desc: T("ABV 40% · 배와 사과의 단맛, 부드럽고 균형 잡힌 맛 · 스트레이트 추천", "ABV 40% · Sweet pear and apple, soft and balanced · Best neat", "ABV 40% · 梨与苹果的甜香，柔和均衡 · 推荐纯饮", "ABV 40% · 洋梨とりんごの甘み、柔らかくバランス良い · ストレート推奨", "ABV 40% · Vị ngọt lê và táo, mềm và cân bằng · Nên uống nguyên chất") }),
      sz([[SHOT50, 300000], [BOTTLE, 3000000]], "글렌리벳 12년", "Glenlivet 12", "格兰威特 12 年", "グレンリベット12年", "Glenlivet 12", { desc: T("ABV 40% · 상큼한 감귤과 꽃향, 가볍고 산뜻한 맛 · 온더록 추천", "ABV 40% · Fresh citrus and floral notes, light and crisp · Best on the rocks", "ABV 40% · 清新柑橘与花香，轻盈爽口 · 推荐加冰", "ABV 40% · 爽やかな柑橘と花の香り、軽やか · オンザロック推奨", "ABV 40% · Cam quýt tươi và hương hoa, nhẹ và thanh · Nên uống với đá") }),
      sz([[SHOT50, 550000], [BOTTLE, 5500000]], "맥캘란 12년", "Macallan 12", "麦卡伦 12 年", "マッカラン12年", "Macallan 12", { desc: T("ABV 40% · 말린 과일과 바닐라의 단맛, 깊은 여운 · 스트레이트 또는 온더록", "ABV 40% · Dried fruit and vanilla sweetness, deep finish · Neat or on the rocks", "ABV 40% · 干果与香草的甜香，余韵深长 · 纯饮或加冰", "ABV 40% · ドライフルーツとバニラの甘み、深い余韻 · ストレートまたはオンザロック", "ABV 40% · Vị ngọt trái cây khô và vani, hậu vị sâu · Uống nguyên chất hoặc với đá") }),
    ],
  },
];
