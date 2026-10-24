// 화로상회 (화로 BBQ / Hoa Rô BBQ · 29N7 Đ. Ng Tất Tố, Võ Cường, Bắc Ninh) 메뉴 데이터 — 박닌 베트남 한식 고깃집(세트·소고기·돼지고기·해산물·점심 특선)
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/화로상회" — 메뉴판 사진 22장 중 가게 계정 사진은 menu_07·menu_08.
// 사진끼리 값이 다른 곳은 사용자 지시(2026-10-24): 사진마다 값이 다르면 높은 쪽을 쓴다 → 감자탕 M 389,000 / L 599,000, 냉면+고기 돼지 199,000 / 소 199,000(menu_21은 349·549, 돼지 179).
window.RESTAURANT = {
  brand: { ko: "화로상회", en: "Hwaro Sanghoe", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0349 241 281",
  address: "29N7 Đ. Ng Tất Tố, Võ Cường, Bắc Ninh",
  mapQuery: "화로상회 Hoa rô sang huê Bắc Ninh 29N7 Ng Tất Tố",
  mapUrl: "https://www.google.com/maps/place/Hoa+r%C3%B4+sang+hu%C3%AA+-+B%E1%BA%AFc+Ninh+(%ED%99%94%EB%A1%9C%EC%83%81%ED%9A%8C+-+%EB%B0%95%EB%8B%8C%EC%A0%90)/@21.1723009,106.058739,19z/data=!4m6!3m5!1s0x3135090ab56f112b:0x117a0b8a460e59e!8m2!3d21.1721203!4d106.0595032!16s%2Fg%2F11sbs53d6b",
  wifi: null, // 예: { ssid: "HWARO", password: "12345678" }
};

window.MENU = [
  {
    id: "set",
    name: {"ko": "세트 메뉴", "en": "Set Menu (Combo)", "zh": "套餐", "ja": "セットメニュー", "vi": "Combo"},
    note: {"ko": "모든 세트·단품에는 쿼이라인(셀프바) 무제한 이용이 포함돼요. 가격은 VAT 별도예요.", "en": "All sets and single items include unlimited self-bar (Quây line) access. Prices exclude VAT.", "zh": "所有套餐和单点均含自助吧(Quây line)无限畅享。价格不含VAT。", "ja": "すべてのセット・単品にセルフバー(クオイライン)食べ放題が含まれます。価格はVAT別です。", "vi": "Tất cả combo và món lẻ đều bao gồm quầy buffet (quầy line) không giới hạn. Giá chưa gồm VAT."},
    items: [
      {"sizes": [[{"ko": "2인분 (450g)", "en": "2 servings (450g)", "zh": "2人份(450g)", "ja": "2人前(450g)", "vi": "2 người (450g)"}, 799000], [{"ko": "3~4인분 (900g)", "en": "3-4 servings (900g)", "zh": "3-4人份(900g)", "ja": "3〜4人前(900g)", "vi": "3-4 người (900g)"}, 1549000]], "name": {"ko": "갈비살 세트", "en": "Beef Short Rib Finger Set (Galbi-sal)", "zh": "牛肋条套餐(Galbi-sal)", "ja": "カルビサル(牛ばら肉)セット", "vi": "Combo Dẻ Sườn Bò"}, "desc": {"ko": "갈비살 · 국 또는 비빔밥 포함 (2인분 1개, 3~4인분 2개)", "en": "Beef short rib finger · includes soup or bibimbap (1 for 2 servings, 2 for 3-4)", "zh": "牛肋条 · 含汤或拌饭(2人份1份,3-4人份2份)", "ja": "カルビサル · スープまたはビビンバ付き(2人前1個、3〜4人前2個)", "vi": "Dẻ sườn bò · kèm canh hoặc cơm trộn (2 người 1 phần, 3-4 người 2 phần)"}},
      {"sizes": [[{"ko": "2인분 (450g)", "en": "2 servings (450g)", "zh": "2人份(450g)", "ja": "2人前(450g)", "vi": "2 người (450g)"}, 849000], [{"ko": "3~4인분 (900g)", "en": "3-4 servings (900g)", "zh": "3-4人份(900g)", "ja": "3〜4人前(900g)", "vi": "3-4 người (900g)"}, 1649000]], "name": {"ko": "마늘 갈비살 세트", "en": "Garlic Beef Short Rib Finger Set", "zh": "蒜香牛肋条套餐", "ja": "ガーリックカルビサルセット", "vi": "Combo Dẻ Sườn Bò + Tỏi"}, "desc": {"ko": "갈비살 + 마늘 · 국 또는 비빔밥 포함 (2인분 1개, 3~4인분 2개)", "en": "Beef short rib finger + garlic · includes soup or bibimbap (1 for 2 servings, 2 for 3-4)", "zh": "牛肋条 + 蒜 · 含汤或拌饭(2人份1份,3-4人份2份)", "ja": "カルビサル + ガーリック · スープまたはビビンバ付き(2人前1個、3〜4人前2個)", "vi": "Dẻ sườn bò + tỏi · kèm canh hoặc cơm trộn (2 người 1 phần, 3-4 người 2 phần)"}},
      {"tag": "best", "photo": "img/beef-special.jpg", "sizes": [[{"ko": "2인분 (500g)", "en": "2 servings (500g)", "zh": "2人份(500g)", "ja": "2人前(500g)", "vi": "2 người (500g)"}, 799000], [{"ko": "3~4인분 (1000g)", "en": "3-4 servings (1000g)", "zh": "3-4人份(1000g)", "ja": "3〜4人前(1000g)", "vi": "3-4 người (1000g)"}, 1549000]], "name": {"ko": "소고기 스페셜 세트", "en": "Beef Special Set", "zh": "牛肉特选套餐", "ja": "牛肉スペシャルセット", "vi": "Combo Bò Bá Cháy"}, "desc": {"ko": "갈비살 · 토시살 · 부채살 · 우삼겹 · 국 또는 비빔밥 포함 (2인분 1개, 3~4인분 2개)", "en": "Short rib finger, skirt steak, chuck flap, beef belly · includes soup or bibimbap (1 for 2 servings, 2 for 3-4)", "zh": "牛肋条、牛横膈膜、牛肩胛、牛五花 · 含汤或拌饭(2人份1份,3-4人份2份)", "ja": "カルビサル・トシサル・プチェサル・ウサムギョプ · スープまたはビビンバ付き(2人前1個、3〜4人前2個)", "vi": "Dẻ sườn, thăn nội, lõi vai, ba chỉ bò · kèm canh hoặc cơm trộn (2 người 1 phần, 3-4 người 2 phần)"}},
      {"sizes": [[{"ko": "2인분 (450g)", "en": "2 servings (450g)", "zh": "2人份(450g)", "ja": "2人前(450g)", "vi": "2 người (450g)"}, 1349000], [{"ko": "3~4인분 (900g)", "en": "3-4 servings (900g)", "zh": "3-4人份(900g)", "ja": "3〜4人前(900g)", "vi": "3-4 người (900g)"}, 2699000]], "name": {"ko": "럭셔리 세트", "en": "LUXURY Combo", "zh": "LUXURY 豪华套餐", "ja": "LUXURYコンボ", "vi": "LUXURY Combo"}, "desc": {"ko": "꽃 갈비살 · 업진살 · 토시살 · 국 또는 비빔밥 포함 (2인분 1개, 3~4인분 2개)", "en": "Flower short rib, brisket flap, skirt steak · includes soup or bibimbap (1 for 2 servings, 2 for 3-4)", "zh": "花牛肋条、牛腹肉、牛横膈膜 · 含汤或拌饭(2人份1份,3-4人份2份)", "ja": "花カルビサル・オプチンサル・トシサル · スープまたはビビンバ付き(2人前1個、3〜4人前2個)", "vi": "Sườn bò hoa, diềm thăn bò, thăn nội bò · kèm canh hoặc cơm trộn (2 người 1 phần, 3-4 người 2 phần)"}},
      {"photo": "img/daechan.jpg", "sizes": [[{"ko": "구성 A: 갈비살·양념 부채살·양념 목살·삼겹살", "en": "Option A: short rib finger, marinated chuck flap, marinated pork neck, pork belly", "zh": "A款:牛肋条、腌制牛肩胛、腌制猪颈肉、五花肉", "ja": "構成A: カルビサル・味付けプチェサル・味付け豚トロ(モクサル)・サムギョプサル", "vi": "Loại A: dẻ sườn, lõi vai ướp, cổ heo ướp, ba chỉ heo"}, 2199000], [{"ko": "구성 B: 갈비살·양념 부채살·토시살·삼겹살", "en": "Option B: short rib finger, marinated chuck flap, skirt steak, pork belly", "zh": "B款:牛肋条、腌制牛肩胛、牛横膈膜、五花肉", "ja": "構成B: カルビサル・味付けプチェサル・トシサル・サムギョプサル", "vi": "Loại B: dẻ sườn, lõi vai ướp, thăn nội bò, ba chỉ heo"}, 2299000]], "name": {"ko": "스페셜 만찬 세트", "en": "Special Feast Set (Daechan)", "zh": "特选盛宴套餐", "ja": "スペシャル晩餐セット", "vi": "Đại Tiệc Combo"}, "desc": {"ko": "5~6인 · 1500g · 국 또는 비빔밥 2개 포함", "en": "5-6 people · 1500g · includes 2 soups or bibimbap", "zh": "5-6人 · 1500g · 含汤或拌饭2份", "ja": "5〜6人 · 1500g · スープまたはビビンバ2個付き", "vi": "5-6 người · 1500g · kèm 2 phần canh hoặc cơm trộn"}},
      {"tag": "best", "photo": "img/mix-set.jpg", "sizes": [[{"ko": "2인분 (500g)", "en": "2 servings (500g)", "zh": "2人份(500g)", "ja": "2人前(500g)", "vi": "2 người (500g)"}, 749000], [{"ko": "3~4인분 (1000g)", "en": "3-4 servings (1000g)", "zh": "3-4人份(1000g)", "ja": "3〜4人前(1000g)", "vi": "3-4 người (1000g)"}, 1549000]], "name": {"ko": "믹스 세트", "en": "Mix Set (Song Vị)", "zh": "混合套餐(Song Vị)", "ja": "ミックスセット(Song Vị)", "vi": "Song Vị Combo"}, "desc": {"ko": "소갈비살 · 양념 돼지목살 · 양념 부채살 · 삼겹살 · 국 또는 비빔밥 포함 (2인분 1개, 3~4인분 2개)", "en": "Beef short rib finger, marinated pork neck, marinated chuck flap, pork belly · includes soup or bibimbap (1 for 2 servings, 2 for 3-4)", "zh": "牛肋条、腌制猪颈肉、腌制牛肩胛、五花肉 · 含汤或拌饭(2人份1份,3-4人份2份)", "ja": "牛カルビサル・味付け豚モクサル・味付けプチェサル・サムギョプサル · スープまたはビビンバ付き(2人前1個、3〜4人前2個)", "vi": "Sườn bò, cổ heo ướp, lõi vai ướp, ba chỉ heo · kèm canh hoặc cơm trộn (2 người 1 phần, 3-4 người 2 phần)"}},
      {"sizes": [[{"ko": "2인분 (500g)", "en": "2 servings (500g)", "zh": "2人份(500g)", "ja": "2人前(500g)", "vi": "2 người (500g)"}, 649000], [{"ko": "3~4인분 (1000g)", "en": "3-4 servings (1000g)", "zh": "3-4人份(1000g)", "ja": "3〜4人前(1000g)", "vi": "3-4 người (1000g)"}, 1249000]], "name": {"ko": "특선 돼지고기 세트", "en": "Premium Pork Set", "zh": "特选猪肉套餐", "ja": "特選豚肉セット", "vi": "Heo Hảo Hạng Combo"}, "desc": {"ko": "삼겹살 · 양념 목살 · 매운 양념 삼겹살 · 껍데기 · 국 또는 비빔밥 포함 (2인분 1개, 3~4인분 2개)", "en": "Pork belly, marinated pork neck, spicy marinated pork belly, pork skin · includes soup or bibimbap (1 for 2 servings, 2 for 3-4)", "zh": "五花肉、腌制猪颈肉、辣酱五花肉、猪皮 · 含汤或拌饭(2人份1份,3-4人份2份)", "ja": "サムギョプサル・味付けモクサル・辛口味付けサムギョプサル・豚皮 · スープまたはビビンバ付き(2人前1個、3〜4人前2個)", "vi": "Ba chỉ heo, cổ heo ướp, ba chỉ heo sốt cay, bì heo · kèm canh hoặc cơm trộn (2 người 1 phần, 3-4 người 2 phần)"}},
    ],
  },
  {
    id: "beef",
    name: {"ko": "소고기 단품", "en": "Beef (À la carte)", "zh": "牛肉单点", "ja": "牛肉(単品)", "vi": "Thịt bò"},
    note: {"ko": "메뉴당 셀프바 1인 이용권이 포함돼요. 주문 인원을 넘으면 성인 99,000₫·어린이 69,000₫(1인)이 추가돼요. 남은 음식은 100g당 100,000₫.", "en": "Each menu item includes 1 self-bar pass. Extra guests beyond the order: adults 99,000₫, children 69,000₫ (per person). Leftover food: 100,000₫ per 100g.", "zh": "每份菜品含1人次自助吧。超出点单人数需另付:成人99,000₫、儿童69,000₫(每人)。剩菜每100g收费100,000₫。", "ja": "メニュー1品につきセルフバー1名分の利用券が含まれます。注文人数を超える場合は大人99,000₫・子ども69,000₫(1名)が追加されます。食べ残しは100gあたり100,000₫。", "vi": "Mỗi món đã gồm 1 suất quầy buffet. Vượt quá số người gọi món: người lớn 99.000₫, trẻ em 69.000₫ (mỗi người). Đồ ăn thừa 100.000₫ / 100g."},
    items: [
      {"price": 259000, "name": {"ko": "소곱창", "en": "Beef Small Intestine (Gopchang)", "zh": "牛小肠(Gopchang)", "ja": "牛コプチャン", "vi": "Lòng Bò"}},
      {"price": 229000, "name": {"ko": "우삼겹", "en": "Beef Belly (Usamgyeop)", "zh": "牛五花(Usamgyeop)", "ja": "牛サムギョプサル(ウサムギョプ)", "vi": "Ba Chỉ Bò"}},
      {"price": 289000, "name": {"ko": "토시살", "en": "Skirt Steak (Tosisal)", "zh": "牛横膈膜(Tosisal)", "ja": "トシサル(牛ハラミ)", "vi": "Thăn Nội Bò"}},
      {"price": 289000, "tag": "best", "name": {"ko": "갈비살", "en": "Beef Short Rib Finger (Galbi-sal)", "zh": "牛肋条(Galbi-sal)", "ja": "カルビサル", "vi": "Dẻ Sườn Bò"}},
      {"price": 299000, "name": {"ko": "L.A 갈비", "en": "L.A. Galbi", "zh": "L.A 牛排骨", "ja": "L.Aカルビ", "vi": "Sườn Bò L.A"}},
      {"price": 279000, "name": {"ko": "부채살", "en": "Chuck Flap (Buchaesal)", "zh": "牛肩胛(Buchaesal)", "ja": "プチェサル(牛肩ロース)", "vi": "Thịt Lõi Vai Bò"}},
    ],
  },
  {
    id: "premium",
    name: {"ko": "고급 소고기", "en": "Premium Beef", "zh": "高级牛肉", "ja": "高級牛肉", "vi": "Bò thượng hạng"},
    items: [
      {"price": 579000, "name": {"ko": "채끝살", "en": "Striploin (Chaekkeutsal)", "zh": "牛外脊(Chaekkeutsal)", "ja": "チェックッサル(サーロイン)", "vi": "Thăn Ngoại Bò"}},
      {"price": 479000, "name": {"ko": "업진살", "en": "Beef Brisket Flap (Eopjinsal)", "zh": "牛腹肉(Eopjinsal)", "ja": "オプチンサル(牛バラ)", "vi": "Diềm Thăn Bò"}},
      {"price": 689000, "tag": "best", "name": {"ko": "꽃 갈비살", "en": "Flower Short Rib Finger (Kkot Galbi-sal)", "zh": "花牛肋条(Kkot Galbi-sal)", "ja": "花カルビサル", "vi": "Sườn Bò Hoa"}},
    ],
  },
  {
    id: "pork",
    name: {"ko": "돼지고기 단품", "en": "Pork (À la carte)", "zh": "猪肉单点", "ja": "豚肉(単品)", "vi": "Thịt heo"},
    items: [
      {"price": 205000, "tag": "new", "name": {"ko": "돼지 항정살", "en": "Pork Jowl (Hangjeongsal)", "zh": "猪颈肉(Hangjeongsal)", "ja": "豚トロ(ハンジョンサル)", "vi": "Má heo"}},
      {"price": 225000, "tag": "new", "name": {"ko": "돼지갈비", "en": "Pork Ribs (Dwaeji Galbi)", "zh": "猪排骨(Dwaeji Galbi)", "ja": "豚カルビ", "vi": "Sườn heo"}},
      {"price": 205000, "tag": "best", "name": {"ko": "과일 간장 목살", "en": "Fruit Soy-marinated Pork Neck", "zh": "水果酱油猪颈肉", "ja": "フルーツ醤油モクサル", "vi": "Cổ heo ướp sốt hoa quả"}},
      {"price": 205000, "name": {"ko": "과일 간장 삼겹살", "en": "Fruit Soy-marinated Pork Belly", "zh": "水果酱油五花肉", "ja": "フルーツ醤油サムギョプサル", "vi": "Ba chỉ heo ướp sốt hoa quả"}},
      {"price": 145000, "name": {"ko": "껍데기", "en": "Pork Skin (Kkeopdegi)", "zh": "猪皮(Kkeopdegi)", "ja": "豚皮(コプデギ)", "vi": "Bì heo"}},
      {"price": 195000, "name": {"ko": "숙성 목살", "en": "Aged Pork Neck (Moksal)", "zh": "熟成猪颈肉(Moksal)", "ja": "熟成モクサル", "vi": "Thịt Cổ Heo"}},
      {"price": 195000, "tag": "best", "name": {"ko": "숙성 삼겹살", "en": "Aged Pork Belly (Samgyeopsal)", "zh": "熟成五花肉", "ja": "熟成サムギョプサル", "vi": "Ba chỉ heo"}},
      {"price": 205000, "spicy": true, "name": {"ko": "매운 양념 삼겹살", "en": "Spicy Marinated Pork Belly", "zh": "辣酱五花肉", "ja": "辛口味付けサムギョプサル", "vi": "Ba chỉ heo sốt cay"}},
    ],
  },
  {
    id: "seafood",
    name: {"ko": "해산물", "en": "Seafood", "zh": "海鲜", "ja": "海鮮", "vi": "Hải sản"},
    items: [
      {"price": 209000, "name": {"ko": "구운 새우", "en": "Grilled Shrimp", "zh": "烤虾", "ja": "焼きエビ", "vi": "Tôm nướng"}},
      {"price": 219000, "spicy": true, "name": {"ko": "매운 구운 새우", "en": "Spicy Grilled Shrimp", "zh": "辣烤虾", "ja": "辛口焼きエビ", "vi": "Tôm nướng cay"}},
      {"price": 189000, "name": {"ko": "구운 오징어 다리", "en": "Grilled Squid Tentacles", "zh": "烤鱿鱼须", "ja": "焼きイカゲソ", "vi": "Râu mực nướng"}},
      {"price": 199000, "spicy": true, "name": {"ko": "매운 오징어 다리", "en": "Spicy Squid Tentacles", "zh": "辣鱿鱼须", "ja": "辛口イカゲソ", "vi": "Râu mực cay"}},
    ],
  },
  {
    id: "meal",
    name: {"ko": "식사", "en": "Rice & Stew", "zh": "主食", "ja": "食事", "vi": "Cơm - Canh"},
    items: [
      {"price": 139000, "tag": "best", "spicy": true, "name": {"ko": "순두부찌개", "en": "Soft Tofu Stew (Sundubu Jjigae)", "zh": "嫩豆腐汤(Sundubu jjigae)", "ja": "スンドゥブチゲ", "vi": "Canh đậu hũ non"}},
      {"price": 129000, "spicy": true, "name": {"ko": "김치찌개", "en": "Kimchi Stew (Kimchi Jjigae)", "zh": "泡菜汤(Kimchi jjigae)", "ja": "キムチチゲ", "vi": "Canh Kim Chi"}},
      {"price": 129000, "name": {"ko": "된장찌개", "en": "Soybean Paste Stew (Doenjang Jjigae)", "zh": "大酱汤(Doenjang jjigae)", "ja": "味噌チゲ", "vi": "Canh đậu tương"}},
      {"price": 139000, "photo": "img/bibim-naengmyeon.jpg", "spicy": true, "name": {"ko": "비빔냉면", "en": "Spicy Cold Noodles (Bibim Naengmyeon)", "zh": "拌冷面(Bibim Naengmyeon)", "ja": "ビビン冷麺", "vi": "Mỳ lạnh trộn"}},
      {"price": 139000, "tag": "best", "name": {"ko": "냉면", "en": "Cold Noodles (Naengmyeon)", "zh": "冷面(Naengmyeon)", "ja": "冷麺", "vi": "Mỳ Lạnh"}},
      {"price": 139000, "photo": "img/bibimbap.jpg", "name": {"ko": "비빔밥", "en": "Bibimbap (Mixed Rice)", "zh": "拌饭(Bibimbap)", "ja": "ビビンバ", "vi": "Cơm trộn"}},
      {"price": 99000, "tag": "new", "name": {"ko": "계란찜", "en": "Steamed Egg (Gyeran-jjim)", "zh": "蒸蛋(Gyeran-jjim)", "ja": "ケランチム(韓国風茶碗蒸し)", "vi": "Trứng hấp"}},
    ],
  },
  {
    id: "lunch",
    name: {"ko": "점심 특선 (11:00~14:00)", "en": "Lunch Special (11:00-14:00)", "zh": "午餐特选(11:00~14:00)", "ja": "ランチ特選(11:00〜14:00)", "vi": "Món trưa đặc biệt (11:00-14:00)"},
    note: {"ko": "11:00~14:00 · 셀프바 99,000₫ → 49,000₫ · VAT 별도", "en": "11:00-14:00 · Self-bar 99,000₫ → 49,000₫ · VAT excluded", "zh": "11:00~14:00 · 自助吧 99,000₫ → 49,000₫ · 不含VAT", "ja": "11:00〜14:00 · セルフバー 99,000₫ → 49,000₫ · VAT別", "vi": "11:00-14:00 · Quầy buffet 99.000₫ → 49.000₫ · Chưa gồm VAT"},
    items: [
      {"price": 199000, "name": {"ko": "뼈해장국", "en": "Pork Bone Hangover Soup (Ppyeo Haejangguk)", "zh": "猪骨醒酒汤(Ppyeo Haejangguk)", "ja": "骨付き豚肉のヘジャンクク", "vi": "Canh Xương Hầm"}},
      {"price": 259000, "tag": "best", "name": {"ko": "갈비탕", "en": "Beef Short Rib Soup (Galbitang)", "zh": "牛排骨汤(Galbitang)", "ja": "カルビタン", "vi": "Canh Sườn Bò"}},
      {"sizes": [[{"ko": "M(중)", "en": "M (Medium)", "zh": "M(中)", "ja": "M(中)", "vi": "M (vừa)"}, 389000], [{"ko": "L(대)", "en": "L (Large)", "zh": "L(大)", "ja": "L(大)", "vi": "L (lớn)"}, 599000]], "name": {"ko": "감자탕", "en": "Pork Bone & Potato Soup (Gamjatang)", "zh": "土豆排骨汤(Gamjatang)", "ja": "カムジャタン", "vi": "Canh Xương Khoai Tây"}},
      {"tag": "best", "sizes": [[{"ko": "돼지", "en": "Pork", "zh": "猪肉", "ja": "豚肉", "vi": "Thịt heo"}, 199000], [{"ko": "소", "en": "Beef", "zh": "牛肉", "ja": "牛肉", "vi": "Thịt bò"}, 199000]], "name": {"ko": "냉면+고기", "en": "Cold Noodles with Grilled Meat", "zh": "冷面+烤肉", "ja": "冷麺+焼肉", "vi": "Mì Lạnh Thịt Nướng"}},
    ],
  },
  {
    id: "drink",
    name: {"ko": "주류·음료", "en": "Drinks & Alcohol", "zh": "酒水饮料", "ja": "お酒・ドリンク", "vi": "Đồ uống & rượu"},
    items: [
      {"price": 60000, "name": {"ko": "타이거 맥주", "en": "Tiger (Beer)", "zh": "Tiger(啤酒)", "ja": "タイガー(ビール)", "vi": "Bia Tiger"}},
      {"price": 50000, "name": {"ko": "사이공 맥주", "en": "Saigon (Beer)", "zh": "Saigon(啤酒)", "ja": "サイゴン(ビール)", "vi": "Bia Sài Gòn"}},
      {"price": 60000, "name": {"ko": "삿포로 생맥주", "en": "Sapporo Draft Beer", "zh": "札幌生啤", "ja": "サッポロ生ビール", "vi": "Bia tươi Sapporo"}},
      {"price": 50000, "name": {"ko": "하이네켄 제로", "en": "Heineken Zero", "zh": "喜力零酒精", "ja": "ハイネケン ゼロ", "vi": "Heineken Zero"}},
      {"price": 125000, "name": {"ko": "진로 (소주)", "en": "Jinro (Soju)", "zh": "Jinro(烧酒)", "ja": "ジンロ(焼酎)", "vi": "Jinro (Soju)"}},
      {"price": 125000, "name": {"ko": "참이슬 (소주)", "en": "Chamisul (Soju)", "zh": "Chamisul(烧酒)", "ja": "チャミスル(焼酎)", "vi": "Chamisul (Soju)"}},
      {"price": 125000, "name": {"ko": "처음처럼 (소주)", "en": "Chum Churum (Soju)", "zh": "Chum Churum(烧酒)", "ja": "チョウムチョロム(焼酎)", "vi": "Chum Churum (Soju)"}},
      {"price": 125000, "name": {"ko": "새로 (소주)", "en": "Saero (Soju)", "zh": "Saero(烧酒)", "ja": "セロ(焼酎)", "vi": "Sero (Soju)"}},
      {"price": 135000, "name": {"ko": "딸기 소주", "en": "Strawberry Soju", "zh": "草莓烧酒", "ja": "いちご焼酎", "vi": "Soju vị dâu tây"}},
      {"price": 135000, "name": {"ko": "청포도 소주", "en": "Green Grape Soju", "zh": "青葡萄烧酒", "ja": "青ぶどう焼酎", "vi": "Soju vị nho"}},
      {"price": 135000, "name": {"ko": "자몽 소주", "en": "Grapefruit Soju", "zh": "西柚烧酒", "ja": "グレープフルーツ焼酎", "vi": "Soju vị bưởi"}},
      {"price": 150000, "name": {"ko": "쌀막걸리 (국순당)", "en": "Rice Makgeolli (Kooksoondang)", "zh": "米酒马格利(国纯堂)", "ja": "米マッコリ(麹醇堂)", "vi": "Rượu gạo Makgeolli (Kooksoondang)"}},
      {"price": 155000, "name": {"ko": "알밤 막걸리 (우리술)", "en": "Chestnut Makgeolli (Woorisool)", "zh": "栗子马格利(Woorisool)", "ja": "栗マッコリ(ウリスル)", "vi": "Rượu gạo hạt dẻ Makgeolli (Woorisool)"}},
      {"price": 100000, "name": {"ko": "보드카맨", "en": "Vodka Men", "zh": "Vodka Men", "ja": "ウォッカメン", "vi": "Rượu Vodka Men"}},
      {"price": 20000, "name": {"ko": "코카콜라", "en": "Coca-Cola", "zh": "可口可乐", "ja": "コカ・コーラ", "vi": "Coca"}},
      {"price": 20000, "name": {"ko": "스프라이트", "en": "Sprite", "zh": "雪碧", "ja": "スプライト", "vi": "Sprite"}},
      {"price": 25000, "name": {"ko": "레드불", "en": "Red Bull", "zh": "红牛", "ja": "レッドブル", "vi": "Bò húc"}},
      {"price": 40000, "name": {"ko": "뽀로로", "en": "Pororo Drink", "zh": "啵乐乐饮料", "ja": "ポロロ", "vi": "Pororo"}},
      {"price": 30000, "name": {"ko": "아침햇살", "en": "Morning Sun (Roasted Rice Drink)", "zh": "朝阳(烤米饮料)", "ja": "アチムヘッサル(玄米ドリンク)", "vi": "Nước gạo rang"}},
      {"price": 10000, "name": {"ko": "생수", "en": "Mineral Water", "zh": "矿泉水", "ja": "ミネラルウォーター", "vi": "Nước suối"}},
      {"price": 20000, "name": {"ko": "오렌지 주스", "en": "Orange Juice", "zh": "橙汁", "ja": "オレンジジュース", "vi": "Nước cam"}},
      {"price": 50000, "name": {"ko": "알로에 음료", "en": "Aloe Vera Drink", "zh": "芦荟饮料", "ja": "アロエドリンク", "vi": "Nước nha đam"}},
      {"price": 40000, "name": {"ko": "치아씨드 음료", "en": "Chia Seed Drink", "zh": "奇亚籽饮料", "ja": "チアシードドリンク", "vi": "Nước hạt chia"}},
    ],
  },
];
