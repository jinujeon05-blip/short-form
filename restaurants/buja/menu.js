// 부자감자탕 BUJA (207 Nguyễn Cao, Kinh Bắc, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "부자감자탕" 폴더 — 가게의 한국어·중국어·베트남어 메뉴판 이미지 7장(식사류 2면·고기류·탕&전골 2면·볶음·생선조림, 사진 포함) + 연락처 면,
//   손님 사진(우거지 감자탕·솥뚜껑삼겹살·대패삼겹살 실제 사진), 간판·지도 정보·와이파이 안내(5년 전 손님 사진).
// 메뉴판에 한국어·중국어·베트남어가 있어 한·베는 그대로, 영어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "부자감자탕", en: "Buja Gamjatang", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "070 226 7489",
  address: "207 Nguyễn Cao, Kinh Bắc, Bắc Ninh",
  mapQuery: "부자감자탕 Nhà hàng Buja Bắc Ninh",
  wifi: { ssid: "BUJA", password: "99999999" }, // 간판 안내 사진(5년 전 손님 사진) 기준
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const S3 = (a, b, c) => [[T("소", "Small", "小", "小", "Nhỏ"), a], [T("중", "Medium", "中", "中", "Vừa"), b], [T("대", "Large", "大", "大", "Lớn"), c]];
const SL = (a, b) => [[T("소", "Small", "小", "小", "Nhỏ"), a], [T("대", "Large", "大", "大", "Lớn"), b]];
const P1 = T("1인분", "per person", "每人", "1名分", "1 người");
const G200 = T("200g · 1인분", "200 g / person", "200克/人", "200g・1名分", "200g · 1 người");
const G150 = T("150g · 1인분", "150 g / person", "150克/人", "150g・1名分", "150g · 1 người");

window.MENU = [
  {
    id: "meal",
    name: T("식사류", "Meals", "主食", "お食事", "Món chính"),
    items: [
      it(null, "bbyeo", "뼈해장국", "Pork bone hangover soup (ppyeo-haejangguk)", "猪骨汤（뼈해장국）", "豚の背骨のヘジャンクク（二日酔いスープ）", "Canh xương heo", { tag: "must", sizes: [[T("보통", "Regular", "普通", "並", "Thường"), 190000], [T("곱빼기", "Large", "加量", "大盛り", "Phần lớn"), 220000]] }),
      it(180000, "ttukbae", "뚝배기불고기", "Bulgogi in a stone pot (ttukbaegi-bulgogi)", "韩式砂锅烤牛肉", "牛プルコギの土鍋", "Canh bò"),
      it(180000, "bulgogi-dup", "불고기덮밥", "Bulgogi rice bowl", "烤牛肉盖饭", "プルコギ丼", "Cơm thịt bò xào"),
      it(170000, "ojingeo-dup", "오징어덮밥", "Spicy squid rice bowl", "铁板鱿鱼盖饭", "イカ炒め丼（辛口）", "Cơm mực xào cay", { spicy: true }),
      it(170000, "jeyuk-dup", "제육덮밥", "Spicy pork rice bowl (jeyuk-deopbap)", "铁板炒猪肉盖饭", "豚肉の辛口炒め丼（チェユクトッパプ）", "Cơm thịt lợn xào cay", { spicy: true }),
      it(170000, "yeontan", "연탄불고기", "Charcoal-grilled bulgogi (yeontan-bulgogi)", "韩式炭火烤肉（연탄불고기）", "練炭プルコギ（炭火焼き）", "Thịt nướng bằng than"),
      it(150000, "cheonggukjang", "청국장", "Cheonggukjang (fermented soybean stew)", "清麴酱汤（청국장）", "チョングッチャン（納豆チゲ）", "Súp đậu nành lên men"),
      it(200000, "dakgomtang", "닭곰탕", "Chicken gomtang (chicken soup)", "炖鸡汤", "鶏コムタン（鶏スープ）", "Canh gà"),
      it(200000, "dakkal", "닭칼국수", "Chicken kalguksu (noodle soup)", "鸡丝刀切面", "鶏カルグクス", "Mì gà kalguksu"),
    ],
  },
  {
    id: "meat",
    name: T("고기류", "Grilled meat", "肉类", "焼肉", "Thịt nướng"),
    note: T("고기류는 2인분 이상 주문해 주세요. 무한리필은 1인 가격이에요.", "Grilled meat is ordered for 2 or more people. Buffet prices are per person.", "肉类请点 2 人份以上。畅吃为每人价格。", "焼肉は2名様分以上でご注文ください。食べ放題は1名様の料金です。", "Món thịt nướng gọi từ 2 người trở lên. Giá buffet tính theo đầu người."),
    items: [
      it(190000, "sottukkeong", "솥뚜껑삼겹살", "Pork belly on a cauldron-lid grill", "锅盖五花肉", "釜蓋サムギョプサル", "Thịt ba chỉ lợn", { unit: G200 }),
      it(190000, "daepae", "대패삼겹살", "Thinly sliced pork belly", "刨子五花肉", "薄切りサムギョプサル", "Thịt lợn thái mỏng", { unit: G200 }),
      it(210000, "usamgyeop", "우삼겹", "Beef brisket slices (usamgyeop)", "牛后胸（우삼겹）", "牛バラ肉スライス（ウサムギョプ）", "Thịt ba chỉ bò", { unit: G150 }),
      it(210000, "hangjeong", "항정살", "Pork jowl (hangjeongsal)", "雪花猪肉（항정살）", "豚トロ（ハンジョンサル）", "Thịt nạc vai heo", { unit: G150 }),
      it(300000, "buffet", "무한리필: 삼겹살 + 대패삼겹", "All-you-can-eat: pork belly + thin-sliced pork belly", "无限畅吃：五花肉 + 刨子五花肉", "食べ放題：サムギョプサル＋薄切りサムギョプサル", "Buffet: ba chỉ lợn + ba chỉ lợn thái mỏng", { unit: P1 }),
      it(330000, "buffet", "무한리필: 우삼겹 + 삼겹살 + 대패삼겹", "All-you-can-eat: beef brisket + pork belly + thin-sliced pork belly", "无限畅吃：牛后胸 + 五花肉 + 刨子五花肉", "食べ放題：ウサムギョプ＋サムギョプサル＋薄切りサムギョプサル", "Buffet: ba chỉ bò + ba chỉ lợn + ba chỉ lợn thái mỏng", { unit: P1 }),
    ],
  },
  {
    id: "stew",
    name: T("탕 · 전골", "Stews & hot pots", "汤 · 火锅", "鍋・チゲ", "Canh & Lẩu"),
    items: [
      it(null, "ugeoji", "우거지 감자탕", "Ugeoji gamjatang (pork bone stew with dried cabbage)", "猪骨土豆汤（우거지 감자탕）", "ウゴジ入りカムジャタン（豚骨ジャガイモ鍋）", "Canh xương thịt heo hầm với cải thảo", { tag: "must", sizes: S3(490000, 600000, 760000) }),
      it(null, "mushroom", "버섯 소불고기", "Beef bulgogi hot pot with mushrooms", "烤牛肉蘑菇锅", "きのこ牛プルコギ鍋", "Canh thịt bò kèm với nấm", { sizes: S3(490000, 650000, 760000) }),
      it(null, "kimchijjigae", "돼지 김치찌개", "Pork kimchi jjigae", "辣白菜火锅", "豚キムチチゲ", "Canh kim chi", { spicy: true, sizes: SL(440000, 600000) }),
      it(null, "galbijjim", "등갈비 김치찜 (30분 소요)", "Braised pork ribs with kimchi (takes 30 min)", "酸泡菜炖排骨（约需30分钟）", "スペアリブのキムチ蒸し煮（約30分）", "Sườn non om kim chi (mất 30 phút)", { spicy: true, sizes: SL(540000, 710000) }),
      it(null, "dakbokkeum", "닭볶음탕 (사전 예약)", "Spicy braised chicken (dak-bokkeum-tang) · reserve in advance", "辣炖鸡块（需提前预约）", "タッポックンタン（事前予約）", "Gà kho cay (đặt trước)", { spicy: true, sizes: [[T("1마리", "1 chicken", "1只", "1羽", "1 con"), 600000], [T("2마리", "2 chickens", "2只", "2羽", "2 con"), 920000]] }),
      it(760000, "baeksuk", "닭/오리 백숙 + 죽 (2시간 전 예약 필수)", "Chicken/duck baeksuk + porridge (reserve 2 hours ahead)", "鸡/鸭褒汤 + 粥（需提前2小时预约）", "鶏／鴨のペクスク＋お粥（2時間前までに要予約）", "Súp gà/vịt + cháo (đặt trước 2 giờ)"),
      it(980000, "baeksuk", "엄나무 백숙 + 죽 (2시간 전 예약 필수)", "Baeksuk with eomnamu (prickly ash) + porridge (reserve 2 hours ahead)", "刺楸（엄나무）褒汤 + 粥（需提前2小时预约）", "オムナム（ハリギリ）入りペクスク＋お粥（2時間前までに要予約）", "Súp hầm eomnamu + cháo (đặt trước 2 giờ)"),
    ],
  },
  {
    id: "stirfry",
    name: T("볶음류", "Stir-fried dishes", "炒菜", "炒め物", "Món xào"),
    note: T("공기밥은 별도예요.", "Steamed rice is extra.", "米饭另计。", "ご飯は別料金です。", "Cơm trắng tính riêng."),
    items: [
      it(330000, "jeyuk-bokkeum", "제육볶음", "Spicy stir-fried pork (jeyuk-bokkeum)", "辣炒猪肉", "豚肉の辛口炒め（チェユクポックン）", "Thịt lợn xào", { spicy: true }),
      it(380000, "ojingeo-bokkeum", "오징어볶음", "Spicy stir-fried squid", "辣炒鱿鱼", "イカ炒め（辛口）", "Mực xào", { spicy: true }),
      it(440000, "nakji-bokkeum", "낙지볶음", "Spicy stir-fried small octopus (nakji-bokkeum)", "辣炒章鱼", "ナクチポックン（テナガダコ炒め）", "Bạch tuộc xào", { spicy: true }),
    ],
  },
  {
    id: "fish",
    name: T("생선조림", "Braised fish", "炖鱼", "魚の煮付け", "Cá kho"),
    note: T("모두 2인분 기준이에요.", "All dishes serve 2 people.", "均为 2 人份。", "すべて2名様分です。", "Tất cả là phần cho 2 người."),
    items: [
      it(440000, "gajami", "가자미조림", "Braised flatfish", "酱炖比目鱼", "カレイの煮付け", "Món cá bơn kho"),
      it(440000, "godeungeo", "고등어조림", "Braised mackerel", "炖青花鱼", "サバの煮付け", "Món cá thu kho"),
      it(500000, "galchi", "갈치조림", "Braised cutlassfish", "辣炖带鱼", "太刀魚の煮付け", "Cá kiếm kho"),
    ],
  },
];
