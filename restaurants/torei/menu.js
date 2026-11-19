// Torei이자카야 TOREI 메뉴 데이터 — 출처: 구글 지도 손님 메뉴판 사진(수집 2026-11-08). 새 메뉴책(세금 포함 가격, menu_03·04·06·08·10·14·15·17) 기준.
// 옛 판(menu_01·09·22·24, 150k 같은 값)은 더 낮은 가격이라 안 씀. 옛 판에만 있는 메뉴(명란계란말이·고등어봉초밥·꿀토마토·사케·글렌피딕 등)는 새 책에 없어 뺌(docs/todo.md)
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480)
window.RESTAURANT = {
  brand: { ko: "토레이 이자카야", en: "TOREI" },
  phone: "0827408588",
  address: "1 Ngõ 179 Đình Thôn, Mỹ Đình, Nam Từ Liêm, Hà Nội",
  wifi: null,
  hours: "17:00 – 01:00", // 구글 지도 '오후 5:00~오전 1:00'
};

window.MENU = [
  {
    "id": "yakitori",
    "name": {"ko": "야키토리", "en": "Yakitori (Grilled Chicken Skewers)", "zh": "日式烤串(Yakitori)", "ja": "やきとり", "vi": "Xiên nướng Yakitori"},
    "items": [
      {"name": {"ko": "야키토리 5종 모듬", "en": "Yakitori 5-Skewer Platter", "zh": "烤鸡串5种拼盘", "ja": "やきとり 5種盛り合わせ", "vi": "Set 5 loại xiên nướng"},
       "desc": {"ko": "네기마 · 닭날개 · 닭염통 · 닭목살 · 삼겹 아스파라거스", "en": "Negima · Tebasaki (wing) · Hatsu (heart) · Seseri (neck) · Pork belly asparagus roll", "zh": "葱烧鸡腿肉 · 鸡翅 · 鸡心 · 鸡颈肉 · 五花肉卷芦笋", "ja": "ねぎま・てばさき・はつ・せせり・アスパラ豚バラ巻き", "vi": "Đùi gà xiên hành · Cánh gà · Tim gà · Thịt cổ gà · Ba chỉ cuộn măng tây"},
       "price": 210600, "tag": "must", "photo": "img/yakitori.jpg"},
      {"name": {"ko": "야키토리 7종 모듬", "en": "Yakitori 7-Skewer Platter", "zh": "烤鸡串7种拼盘", "ja": "やきとり 7種盛り合わせ", "vi": "Set 7 loại xiên nướng"},
       "desc": {"ko": "네기마 · 닭날개 · 닭염통 · 닭목살 · 닭껍질 · 삼겹 아스파라거스 · 마늘", "en": "Negima · Tebasaki (wing) · Hatsu (heart) · Seseri (neck) · Torikawa (skin) · Pork belly asparagus roll · Garlic", "zh": "葱烧鸡腿肉 · 鸡翅 · 鸡心 · 鸡颈肉 · 鸡皮 · 五花肉卷芦笋 · 大蒜", "ja": "ねぎま・てばさき・はつ・せせり・とりかわ・アスパラ豚バラ巻き・にんにく", "vi": "Đùi gà xiên hành · Cánh gà · Tim gà · Thịt cổ gà · Da gà · Ba chỉ cuộn măng tây · Tỏi"},
       "price": 280800},
      {"name": {"ko": "네기마 (닭다리살 대파)", "en": "Negima (chicken thigh & leek)", "zh": "葱烧鸡腿肉串(Negima)", "ja": "ねぎま", "vi": "Đùi gà xiên hành nướng (Negima)"}, "price": 48600},
      {"name": {"ko": "닭염통", "en": "Hatsu (chicken heart)", "zh": "鸡心串(Hatsu)", "ja": "はつ", "vi": "Tim gà xiên nướng"}, "price": 48600},
      {"name": {"ko": "닭날개", "en": "Grilled Tebasaki (chicken wing)", "zh": "烤鸡翅串(Tebasaki)", "ja": "てばさき串", "vi": "Cánh gà xiên nướng"}, "price": 48600},
      {"name": {"ko": "닭똥집", "en": "Sunagimo (chicken gizzard)", "zh": "鸡胗串(Sunagimo)", "ja": "すなぎも", "vi": "Mề gà xiên nướng"}, "price": 48600},
      {"name": {"ko": "닭목살", "en": "Seseri (chicken neck meat)", "zh": "鸡颈肉串(Seseri)", "ja": "せせり", "vi": "Thịt cổ gà xiên nướng"}, "price": 48600},
      {"name": {"ko": "닭껍질", "en": "Torikawa (chicken skin)", "zh": "鸡皮串(Torikawa)", "ja": "とりかわ", "vi": "Da gà xiên nướng"}, "price": 37800},
      {"name": {"ko": "삼겹살 대파", "en": "Butabara Negima (pork belly & leek)", "zh": "五花肉大葱串", "ja": "ぶたばらねぎま", "vi": "Ba chỉ xiên hành nướng"}, "price": 48600},
      {"name": {"ko": "마늘", "en": "Grilled Garlic (Ninniku)", "zh": "烤大蒜串", "ja": "にんにく串", "vi": "Tỏi xiên nướng"}, "price": 37800},
      {"name": {"ko": "은행", "en": "Grilled Ginnan (ginkgo nuts)", "zh": "烤银杏串(Ginnan)", "ja": "ぎんなん串", "vi": "Bạch quả xiên nướng"}, "price": 48600},
      {"name": {"ko": "양파", "en": "Grilled Onion (Tamanegi)", "zh": "烤洋葱串", "ja": "たまねぎ串", "vi": "Hành tây xiên nướng"}, "price": 37800},
      {"name": {"ko": "삼겹 아스파라거스", "en": "Pork Belly Asparagus Roll", "zh": "五花肉卷芦笋串", "ja": "アスパラ豚バラ巻き", "vi": "Ba chỉ cuộn măng tây nướng"}, "price": 48600},
      {"name": {"ko": "삼겹 방울토마토", "en": "Pork Belly Cherry Tomato Roll", "zh": "五花肉卷小番茄串", "ja": "ミニトマト豚バラ巻き", "vi": "Ba chỉ cuộn cà chua bi nướng"}, "price": 48600},
      {"name": {"ko": "삼겹 팽이버섯 부추", "en": "Pork Belly Enoki & Chive Roll", "zh": "五花肉卷金针菇韭菜串", "ja": "えのきにら豚バラ巻き", "vi": "Ba chỉ cuộn nấm hẹ nướng"}, "price": 48600},
      {"name": {"ko": "삼겹 새우", "en": "Pork Belly Shrimp Roll", "zh": "五花肉卷虾串", "ja": "えび豚バラ巻き", "vi": "Tôm cuộn ba chỉ heo nướng"}, "price": 59400}
    ]
  },
  {
    "id": "kushikatsu",
    "name": {"ko": "쿠시카츠", "en": "Kushikatsu (Deep-Fried Skewers)", "zh": "日式炸串(Kushikatsu)", "ja": "串カツ", "vi": "Xiên chiên Kushikatsu"},
    "items": [
      {"name": {"ko": "쿠시카츠 5종 모듬", "en": "Kushikatsu 5-Skewer Platter", "zh": "炸串5种拼盘", "ja": "串カツ 5種盛り合わせ", "vi": "Set 5 loại xiên chiên"},
       "desc": {"ko": "닭날개 · 삼겹살 양파 · 은행 · 메추리알 · 연근", "en": "Tebasaki (wing) · Pork belly & onion · Ginnan (ginkgo) · Quail egg · Lotus root", "zh": "鸡翅 · 五花肉洋葱 · 银杏 · 鹌鹑蛋 · 莲藕", "ja": "てばさき・豚バラたまねぎ・ぎんなん・うずらのたまご・れんこん", "vi": "Cánh gà · Ba chỉ hành tây · Bạch quả · Trứng cút · Củ sen"},
       "price": 167400},
      {"name": {"ko": "쿠시카츠 7종 모듬", "en": "Kushikatsu 7-Skewer Platter", "zh": "炸串7种拼盘", "ja": "串カツ 7種盛り合わせ", "vi": "Set 7 loại xiên chiên"},
       "desc": {"ko": "닭날개 · 삼겹살 양파 · 은행 · 메추리알 · 연근 · 시샤모 · 오징어", "en": "Tebasaki (wing) · Pork belly & onion · Ginnan (ginkgo) · Quail egg · Lotus root · Shishamo (smelt) · Squid", "zh": "鸡翅 · 五花肉洋葱 · 银杏 · 鹌鹑蛋 · 莲藕 · 柳叶鱼 · 鱿鱼", "ja": "てばさき・豚バラたまねぎ・ぎんなん・うずらのたまご・れんこん・ししゃも・いか", "vi": "Cánh gà · Ba chỉ hành tây · Bạch quả · Trứng cút · Củ sen · Cá Shishamo · Mực"},
       "price": 205200},
      {"name": {"ko": "닭날개", "en": "Fried Tebasaki (chicken wing)", "zh": "炸鸡翅串(Tebasaki)", "ja": "てばさき串カツ", "vi": "Cánh gà xiên chiên"}, "price": 43200},
      {"name": {"ko": "삼겹살 양파", "en": "Fried Pork Belly & Onion", "zh": "炸五花肉洋葱串", "ja": "豚バラたまねぎ", "vi": "Ba chỉ hành tây xiên chiên"}, "price": 43200},
      {"name": {"ko": "은행", "en": "Fried Ginnan (ginkgo nuts)", "zh": "炸银杏串(Ginnan)", "ja": "ぎんなん串カツ", "vi": "Bạch quả xiên chiên"}, "price": 43200},
      {"name": {"ko": "메추리알", "en": "Fried Quail Egg", "zh": "炸鹌鹑蛋串", "ja": "うずらのたまご", "vi": "Trứng cút xiên chiên"}, "price": 32400},
      {"name": {"ko": "양파", "en": "Fried Onion (Tamanegi)", "zh": "炸洋葱串", "ja": "たまねぎ串カツ", "vi": "Hành tây xiên chiên"}, "price": 32400},
      {"name": {"ko": "오징어", "en": "Fried Squid", "zh": "炸鱿鱼串", "ja": "いか", "vi": "Mực xiên chiên"}, "price": 32400},
      {"name": {"ko": "고구마", "en": "Fried Sweet Potato", "zh": "炸红薯串", "ja": "さつまいも", "vi": "Khoai lang xiên chiên"}, "price": 27000},
      {"name": {"ko": "가지", "en": "Fried Eggplant", "zh": "炸茄子串", "ja": "なす", "vi": "Cà tím xiên chiên"}, "price": 27000},
      {"name": {"ko": "시샤모", "en": "Fried Shishamo (smelt)", "zh": "炸柳叶鱼串(Shishamo)", "ja": "ししゃも串カツ", "vi": "Cá Shishamo xiên chiên"}, "price": 27000},
      {"name": {"ko": "연근", "en": "Fried Lotus Root", "zh": "炸莲藕串", "ja": "れんこん", "vi": "Củ sen xiên chiên"}, "price": 27000}
    ]
  },
  {
    "id": "agemono",
    "name": {"ko": "튀김", "en": "Fried Dishes (Agemono)", "zh": "炸物(Agemono)", "ja": "揚げ物", "vi": "Món chiên"},
    "items": [
      {"name": {"ko": "치킨난반", "en": "Chicken Nanban (fried chicken with tartar sauce)", "zh": "南蛮炸鸡(塔塔酱)", "ja": "チキン南蛮", "vi": "Gà Nanban chiên sốt tartar"}, "price": 162000, "tag": "best", "photo": "img/nanban.jpg"},
      {"name": {"ko": "테바사키 (닭날개 튀김)", "en": "Tebasaki (fried chicken wings)", "zh": "炸鸡翅(Tebasaki)", "ja": "手羽先", "vi": "Cánh gà chiên Tebasaki"},
       "desc": {"ko": "6개", "en": "6 pieces", "zh": "6个", "ja": "6本", "vi": "6 cánh"},
       "price": 118800},
      {"name": {"ko": "치킨 가라아게 + 할라피뇨 타르타르 소스", "en": "Chicken Karaage + Jalapeño Tartar Sauce", "zh": "日式炸鸡块+墨西哥辣椒塔塔酱", "ja": "鶏からあげ + ハラペーニョタルタルソース", "vi": "Gà chiên Karaage + sốt tartar jalapeño"}, "price": 162000},
      {"name": {"ko": "감자 고로케", "en": "Potato Croquette", "zh": "土豆可乐饼", "ja": "じゃがいもコロッケ", "vi": "Khoai tây nghiền chiên xù"}, "price": 162000},
      {"name": {"ko": "통새우 튀김", "en": "Whole Fried Shrimp", "zh": "整只炸虾", "ja": "まるごとえび唐揚げ", "vi": "Tôm chiên xù"}, "price": 37800},
      {"name": {"ko": "새우깡 (민물새우 튀김)", "en": "Fried Freshwater Shrimp (Saeugang)", "zh": "酥炸河虾", "ja": "川えび唐揚げ", "vi": "Tôm đồng chiên"}, "price": 97200, "photo": "img/ebi.jpg"},
      {"name": {"ko": "시샤모 튀김", "en": "Fried Shishamo (smelt with roe)", "zh": "酥炸柳叶鱼(Shishamo)", "ja": "子持ちししゃも唐揚げ", "vi": "Cá Shishamo chiên giòn"},
       "desc": {"ko": "5마리", "en": "5 fish", "zh": "5条", "ja": "5匹", "vi": "5 con"},
       "price": 86400},
      {"name": {"ko": "이카게소 (오징어 다리 튀김)", "en": "Ikageso (fried squid legs)", "zh": "酥炸鱿鱼须(Ikageso)", "ja": "いかげそ", "vi": "Râu mực chiên giòn"}, "price": 162000},
      {"name": {"ko": "유린기", "en": "Yurinchi (fried chicken with scallion-vinegar sauce)", "zh": "油淋鸡", "ja": "油淋鶏", "vi": "Gà sốt dầu hành kiểu Trung"}, "price": 248400},
      {"name": {"ko": "교자만두", "en": "Gyoza (pan-fried dumplings)", "zh": "日式煎饺(Gyoza)", "ja": "焼き餃子", "vi": "Gyoza áp chảo kiểu Nhật"}, "price": 106920}
    ]
  },
  {
    "id": "yakimono",
    "name": {"ko": "구이", "en": "Grilled Dishes (Yakimono)", "zh": "烤物(Yakimono)", "ja": "焼き物", "vi": "Món nướng"},
    "items": [
      {"name": {"ko": "고등어구이", "en": "Grilled Mackerel (Saba Shioyaki)", "zh": "盐烤青花鱼", "ja": "サバの塩焼き", "vi": "Cá thu nướng"}, "price": 140400, "photo": "img/saba.jpg"},
      {"name": {"ko": "새우구이", "en": "Salt-Grilled Shrimp", "zh": "盐烤虾", "ja": "エビの塩焼き", "vi": "Tôm nướng muối"},
       "desc": {"ko": "1마리", "en": "1 shrimp", "zh": "1只", "ja": "1尾", "vi": "1 con"},
       "price": 37800},
      {"name": {"ko": "야키니쿠", "en": "Yakiniku (grilled meat)", "zh": "日式烤肉(Yakiniku)", "ja": "焼肉", "vi": "Thịt nướng Yakiniku"},
       "desc": {"ko": "150g · 고기 추가 150g 216,000", "en": "150g · Extra meat 150g 216,000", "zh": "150g · 加肉150g 216,000", "ja": "150g ・追加肉150g 216,000", "vi": "150g · Thêm thịt 150g 216.000"},
       "price": 302400},
      {"name": {"ko": "시샤모구이", "en": "Grilled Shishamo (smelt with roe)", "zh": "烤柳叶鱼(Shishamo)", "ja": "ししゃも焼き", "vi": "Cá Shishamo nướng"},
       "desc": {"ko": "5마리", "en": "5 fish", "zh": "5条", "ja": "5匹", "vi": "5 con"},
       "price": 86400},
      {"name": {"ko": "명란구이", "en": "Grilled Mentaiko (spicy cod roe)", "zh": "烤明太子", "ja": "明太子焼き", "vi": "Trứng cá minh thái nướng"}, "price": 162000}
    ]
  },
  {
    "id": "ippin",
    "name": {"ko": "일품 · 사시미", "en": "Specialties & Sashimi (Ippin)", "zh": "精选小菜·刺身(Ippin)", "ja": "一品", "vi": "Món lẻ · Sashimi"},
    "items": [
      {"name": {"ko": "연어 사시미", "en": "Salmon Sashimi", "zh": "三文鱼刺身", "ja": "サーモン刺身", "vi": "Cá hồi sashimi"}, "price": 313200, "photo": "img/salmon.jpg"},
      {"name": {"ko": "시메사바 (초절임 고등어)", "en": "Shimesaba (vinegar-cured mackerel)", "zh": "醋渍青花鱼(Shimesaba)", "ja": "しめさば", "vi": "Shimesaba (cá thu ngâm giấm)"}, "price": 324000},
      {"name": {"ko": "차돌박이 숙주볶음", "en": "Stir-Fried Beef Brisket & Bean Sprouts", "zh": "牛胸肉炒豆芽", "ja": "牛もやし", "vi": "Thịt bò xào giá đỗ"}, "price": 162000},
      {"name": {"ko": "야키소바", "en": "Yakisoba (Japanese stir-fried noodles)", "zh": "日式炒面(Yakisoba)", "ja": "焼きそば", "vi": "Mì xào Yakisoba"}, "price": 237600},
      {"name": {"ko": "토마토 나폴리탄", "en": "Tomato Napolitan (Japanese-style spaghetti)", "zh": "番茄那不勒斯意面(日式)", "ja": "ナポリタン", "vi": "Mì Ý sốt cà kiểu Nhật"}, "price": 237600}
    ]
  },
  {
    "id": "nabe",
    "name": {"ko": "나베 · 면", "en": "Hot Pot & Noodles (Nabe)", "zh": "火锅·面类(Nabe)", "ja": "汁物・鍋", "vi": "Lẩu · Mì"},
    "items": [
      {"name": {"ko": "모듬 오뎅나베", "en": "Assorted Oden Hot Pot", "zh": "什锦关东煮锅", "ja": "おでん鍋", "vi": "Lẩu Oden tổng hợp"}, "price": 270000, "photo": "img/oden.jpg"},
      {"name": {"ko": "나가사키 짬뽕나베", "en": "Nagasaki Champon Hot Pot", "zh": "长崎强棒面锅", "ja": "長崎ちゃんぽん鍋", "vi": "Lẩu Nagasaki kiểu mì champon"}, "price": 270000},
      {"name": {"ko": "해물 신라면", "en": "Spicy Seafood Shin Ramyun", "zh": "海鲜辛拉面(辣)", "ja": "辛い海鮮ラーメン", "vi": "Mì Shin Ramyun hải sản cay"}, "price": 162000, "spicy": true},
      {"name": {"ko": "김치 추가", "en": "Extra Kimchi", "zh": "加泡菜", "ja": "キムチ追加", "vi": "Thêm kim chi"}, "price": 43200}
    ]
  },
  {
    "id": "salad",
    "name": {"ko": "샐러드 · 간단 안주", "en": "Salads & Light Bites", "zh": "沙拉·小吃", "ja": "サラダ・おつまみ", "vi": "Salad · Món nhẹ"},
    "items": [
      {"name": {"ko": "감자 샐러드", "en": "Potato Salad", "zh": "土豆沙拉", "ja": "ポテトサラダ", "vi": "Salad khoai tây"}, "price": 70200},
      {"name": {"ko": "오이 시오콘부 샐러드", "en": "Cucumber & Shio-Kombu Salad", "zh": "黄瓜盐昆布沙拉", "ja": "きゅうり塩昆布サラダ", "vi": "Salad dưa leo rong biển muối"}, "price": 70200},
      {"name": {"ko": "에다마메", "en": "Edamame (boiled soybeans)", "zh": "毛豆(Edamame)", "ja": "枝豆", "vi": "Đậu nành Nhật luộc muối"}, "price": 54000},
      {"name": {"ko": "게살 샐러드", "en": "Crab Stick Salad", "zh": "蟹肉棒沙拉", "ja": "かにサラダ", "vi": "Salad thanh cua"}, "price": 43200}
    ]
  },
  {
    "id": "special",
    "name": {"ko": "특선", "en": "Specials", "zh": "特选", "ja": "特選", "vi": "Món đặc biệt theo mùa"},
    "items": [
      {"name": {"ko": "대방어", "en": "Daebang-eo (large yellowtail)", "zh": "大鰤鱼", "ja": "寒ブリ", "vi": "Cá cam Nhật lớn (Daebang-eo)"},
       "desc": {"ko": "150g", "en": "150g", "zh": "150g", "ja": "150g", "vi": "150g"},
       "price": 745200, "tag": "special"},
      {"name": {"ko": "통영 생굴", "en": "Fresh Oysters from Tongyeong (Korea)", "zh": "韩国统营生蚝", "ja": "統営産 生牡蠣", "vi": "Hàu sống Tongyeong"},
       "desc": {"ko": "100g", "en": "100g", "zh": "100g", "ja": "100g", "vi": "100g"},
       "price": 302400, "tag": "special"}
    ]
  },
  {
    "id": "drinks",
    "name": {"ko": "술", "en": "Alcohol", "zh": "酒类", "ja": "お酒", "vi": "Đồ uống có cồn"},
    "items": [
      {"name": {"ko": "참이슬", "en": "Chamisul Soju", "zh": "Chamisul 烧酒", "ja": "チャミスル", "vi": "Soju Chamisul"}, "price": 165000},
      {"name": {"ko": "처음처럼", "en": "Chum Churum Soju", "zh": "Chum Churum 烧酒", "ja": "チョウムチョロム", "vi": "Soju Chum Churum"}, "price": 165000},
      {"name": {"ko": "진로", "en": "Jinro Soju", "zh": "Jinro 烧酒", "ja": "ジンロ", "vi": "Soju Jinro"}, "price": 165000},
      {"name": {"ko": "새로", "en": "Saero Soju", "zh": "Saero 烧酒", "ja": "セロ", "vi": "Soju Saero"}, "price": 165000},
      {"name": {"ko": "화요 25 세트", "en": "Hwayo 25 Set", "zh": "Hwayo 25 套餐", "ja": "ファヨ25 セット", "vi": "Set Hwayo 25"},
       "desc": {"ko": "소다 · 레몬 포함", "en": "Soda & lemon included", "zh": "含苏打水和柠檬", "ja": "ソーダ・レモン付き", "vi": "Kèm soda và chanh"},
       "price": 800000},
      {"name": {"ko": "국순당 생막걸리", "en": "Kooksoondang Fresh Makgeolli (Korean rice wine)", "zh": "国顺堂生米酒(Makgeolli)", "ja": "麹醇堂 生マッコリ", "vi": "Rượu makgeolli Hàn Quốc"}, "price": 176000},
      {"name": {"ko": "삿포로 생맥주", "en": "Sapporo Draft Beer", "zh": "札幌生啤", "ja": "サッポロ生ビール", "vi": "Bia tươi Sapporo"}, "price": 82500},
      {"name": {"ko": "삿포로 병맥주", "en": "Sapporo Bottled Beer", "zh": "札幌瓶装啤酒", "ja": "サッポロ瓶ビール", "vi": "Bia chai Sapporo"}, "price": 82500},
      {"name": {"ko": "타이거 캔맥주", "en": "Tiger Canned Beer", "zh": "虎牌罐装啤酒", "ja": "タイガー缶ビール", "vi": "Bia lon Tiger"}, "price": 60500},
      {"name": {"ko": "짐빔 하이볼", "en": "Jim Beam Highball", "zh": "金宾嗨棒(Highball)", "ja": "ジムビーム ハイボール", "vi": "Highball Jim Beam"}, "price": 150700},
      {"name": {"ko": "조니워커 하이볼", "en": "Johnnie Walker Highball", "zh": "尊尼获加嗨棒(Highball)", "ja": "ジョニーウォーカー ハイボール", "vi": "Highball Johnnie Walker"}, "price": 161700},
      {"name": {"ko": "산토리 하이볼", "en": "Suntory Highball", "zh": "三得利嗨棒(Highball)", "ja": "サントリー ハイボール", "vi": "Highball Suntory"}, "price": 170500},
      {"name": {"ko": "하이볼 샷 추가", "en": "Extra Highball Shot", "zh": "嗨棒加一份(Shot)", "ja": "ショット追加", "vi": "Thêm shot"},
       "desc": {"ko": "30ml", "en": "30ml", "zh": "30ml", "ja": "30ml", "vi": "30ml"},
       "price": 66000},
      {"name": {"ko": "산토리 위스키", "en": "Suntory Whisky", "zh": "三得利威士忌", "ja": "サントリー ウイスキー", "vi": "Whisky Suntory"}, "sizes": [["Shot", 165000], ["Bottle", 1980000]]},
      {"name": {"ko": "메이커스 마크", "en": "Maker's Mark", "zh": "美格威士忌(Maker's Mark)", "ja": "メーカーズマーク", "vi": "Whisky Maker's Mark"}, "sizes": [["Shot", 154000], ["Bottle", 1815000]]},
      {"name": {"ko": "더 치타", "en": "The Chita (Suntory whisky)", "zh": "知多威士忌(The Chita)", "ja": "ザ・チタ", "vi": "Whisky The Chita"}, "sizes": [["Shot", 297000], ["Bottle", 3300000]]}
    ]
  },
  {
    "id": "soft",
    "name": {"ko": "음료", "en": "Soft Drinks", "zh": "软饮", "ja": "ソフトドリンク", "vi": "Nước giải khát"},
    "note": {"ko": "콜키지 1병당 400,000", "en": "Corkage fee: 400,000 per bottle", "zh": "开瓶费:每瓶400,000", "ja": "持ち込み料 1本 400,000", "vi": "Phí mở chai mang vào 400.000/chai"},
    "items": [
      {"name": {"ko": "코카콜라", "en": "Coca-Cola", "zh": "可口可乐", "ja": "コカ・コーラ", "vi": "Coca-Cola"}, "price": 32400},
      {"name": {"ko": "코카콜라 제로", "en": "Coca-Cola Zero", "zh": "零度可口可乐", "ja": "コカ・コーラ ゼロ", "vi": "Coca-Cola Zero"}, "price": 32400},
      {"name": {"ko": "스프라이트", "en": "Sprite", "zh": "雪碧", "ja": "スプライト", "vi": "Sprite"}, "price": 32400},
      {"name": {"ko": "환타", "en": "Fanta", "zh": "芬达", "ja": "ファンタ", "vi": "Fanta"}, "price": 32400},
      {"name": {"ko": "싱하 소다", "en": "Singha Soda", "zh": "Singha 苏打水", "ja": "シンハーソーダ", "vi": "Soda Singha"}, "price": 32400},
      {"name": {"ko": "토닉워터", "en": "Tonic Water", "zh": "汤力水", "ja": "トニックウォーター", "vi": "Tonic water"}, "price": 32400},
      {"name": {"ko": "아이스티", "en": "Iced Tea", "zh": "冰茶", "ja": "アイスティー", "vi": "Trà đá"}, "price": 54000},
      {"name": {"ko": "레몬 슬라이스", "en": "Lemon Slices", "zh": "柠檬片", "ja": "レモンスライス", "vi": "Lát chanh"}, "price": 43200}
    ]
  }
];
