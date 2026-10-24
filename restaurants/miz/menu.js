// 미즈 MIZ (미즈(MIZ) 레스토랑 · Lô 29 - TT4, P. Trần Văn Lai, Từ Liêm, Hà Nội) 메뉴 데이터 — 일식(초밥·회·참치 코스·점심 메뉴)
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND — **디지털 메뉴 페이지에 'GIÁ TRÊN MENU ĐÃ BAO GỒM THUẾ VAT'(메뉴 가격에 부가세 포함)** 이라고 적혀 있음
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/미즈 레스토랑"(사진 수집기 v1.6, 사진 60장: 메뉴판 22·음식 34·매장 4) — 메뉴판 사진은 전부 손님이 올린 것(가게 계정 사진 없음).
// 가격은 **검정 바탕 디지털 메뉴 페이지(menu_01·04·05·06·07·08~11)** 기준(VAT 포함). 실물 메뉴책을 찍은 사진(menu_12~22)은 값이 더 낮고 'VAT 불포함'이라 옛 판으로 보고 쓰지 않았다 — docs/todo.md.
window.RESTAURANT = {
  brand: { ko: "미즈", en: "MIZ", branch: { ko: "하노이", en: "Hà Nội" } },
  phone: "0916 894 411",
  address: "Lô 29 - TT4, P. Trần Văn Lai, Từ Liêm, Hà Nội",
  mapQuery: "미즈(MIZ) 레스토랑 MIZ Lô 29 - TT4 P. Trần Văn Lai Từ Liêm Hà Nội",
  mapUrl: "https://www.google.com/maps/place/%EB%AF%B8%EC%A6%88(MIZ)+%EB%A0%88%EC%8A%A4%ED%86%A0%EB%9E%91/@21.017803,105.7789663,17z/data=!3m1!4b1!4m6!3m5!1s0x313455d61f99b281:0xff9be3444871bd00!8m2!3d21.017803!4d105.7789663!16s%2Fg%2F11h4yr4qws",
  wifi: null, // 예: { ssid: "MIZ", password: "12345678" }
};

window.MENU = [
  {
    id: "lunch",
    name: {"ko": "점심 메뉴", "en": "Lunch Menu", "zh": "午餐菜单", "ja": "ランチメニュー", "vi": "Thực đơn trưa"},
    note: {"ko": "가격은 모두 부가세(VAT) 포함이에요.", "en": "All prices include VAT.", "zh": "所有价格均含增值税(VAT)。", "ja": "価格はすべて付加価値税(VAT)込みです。", "vi": "Tất cả giá đã bao gồm VAT."},
    items: [
      {"price": 650000, "unit": {"ko": "12pcs", "en": "12pcs", "zh": "12pcs", "ja": "12pcs", "vi": "12pcs"}, "name": {"ko": "장어초밥", "en": "Eel Sushi", "zh": "鳗鱼寿司", "ja": "うなぎ寿司", "vi": "Sushi lươn Nhật"}},
      {"price": 560000, "name": {"ko": "장어덮밥", "en": "Eel Rice Bowl", "zh": "鳗鱼盖饭", "ja": "うな丼", "vi": "Cơm lươn Nhật"}},
      {"price": 560000, "unit": {"ko": "12pcs", "en": "12pcs", "zh": "12pcs", "ja": "12pcs", "vi": "12pcs"}, "name": {"ko": "새우초밥", "en": "Shrimp Sushi", "zh": "虾寿司", "ja": "海老握り", "vi": "Sushi tôm"}},
      {"price": 520000, "unit": {"ko": "12pcs", "en": "12pcs", "zh": "12pcs", "ja": "12pcs", "vi": "12pcs"}, "tag": "must", "name": {"ko": "모둠초밥", "en": "Assorted Sushi", "zh": "寿司拼盘", "ja": "握り寿司盛り合わせ", "vi": "Sushi tổng hợp"}},
      {"price": 520000, "unit": {"ko": "12pcs", "en": "12pcs", "zh": "12pcs", "ja": "12pcs", "vi": "12pcs"}, "name": {"ko": "회초밥", "en": "White Fish Sushi", "zh": "白肉鱼寿司", "ja": "白身魚の握り寿司", "vi": "Sushi cá trắng"}},
      {"price": 530000, "unit": {"ko": "12pcs", "en": "12pcs", "zh": "12pcs", "ja": "12pcs", "vi": "12pcs"}, "name": {"ko": "연어초밥", "en": "Salmon Sushi", "zh": "三文鱼寿司", "ja": "サーモン握り寿司", "vi": "Sushi cá hồi"}},
      {"price": 520000, "tag": "must", "name": {"ko": "회정식", "en": "Sashimi Set (1 person)", "zh": "刺身套餐(1人份)", "ja": "刺身定食(1人前)", "vi": "Suất Sashimi cá tổng hợp nhỏ"}},
      {"price": 520000, "name": {"ko": "연어회정식", "en": "Salmon Sashimi Set (1 person)", "zh": "三文鱼刺身套餐(1人份)", "ja": "サーモン刺身定食(1人前)", "vi": "Suất Sashimi cá hồi nhỏ"}},
      {"price": 560000, "tag": "must", "name": {"ko": "보리굴비", "en": "Grilled Boori Gulbi (Yellow Croaker) with Barley Tea", "zh": "烤大麦茶泡干黄花鱼 Boori Gulbi", "ja": "ボリグルビ(焼き・麦茶添え)", "vi": "Cá Bulri nướng dùng kèm trà gạo mạch"}, "desc": {"ko": "굽는 데 20~25분 걸려요.", "en": "Grilling takes 20~25 minutes.", "zh": "烤制需要20~25分钟。", "ja": "焼き上がりまで20~25分かかります。", "vi": "Thời gian nướng mất 20~25 phút."}},
      {"price": 400000, "name": {"ko": "회덮밥", "en": "Mixed Rice with Sashimi", "zh": "刺身拌饭", "ja": "刺身丼", "vi": "Cơm trộn topping cá trắng"}},
      {"price": 420000, "name": {"ko": "연어덮밥", "en": "Mixed Rice with Salmon", "zh": "三文鱼拌饭", "ja": "サーモン丼", "vi": "Cơm trộn topping cá hồi"}},
      {"price": 430000, "spicy": true, "name": {"ko": "물회", "en": "Chilled Sashimi Soup with Udon Noodles", "zh": "冷汤刺身 Mulhoe(配乌冬面)", "ja": "ムルフェ(うどん入り冷製刺身)", "vi": "Sashimi cá trắng kèm sốt lạnh cay và sợi mì Udon"}},
    ],
  },
  {
    id: "lunch2",
    name: {"ko": "점심 단품 · 탕 · 튀김", "en": "À la carte · Soups · Fried", "zh": "午餐单点 · 汤锅 · 炸物", "ja": "ランチ単品・鍋・揚げ物", "vi": "Món lẻ · Canh · Đồ chiên"},
    note: {"ko": "가격은 모두 부가세(VAT) 포함이에요.", "en": "All prices include VAT.", "zh": "所有价格均含增值税(VAT)。", "ja": "価格はすべて付加価値税(VAT)込みです。", "vi": "Tất cả giá đã bao gồm VAT."},
    items: [
      {"price": 280000, "name": {"ko": "알밥", "en": "Fried Rice with Fish Roe", "zh": "鱼籽炒饭", "ja": "アルパプ(魚卵ご飯)", "vi": "Cơm đảo nóng trộn trứng cá"}},
      {"price": 70000, "name": {"ko": "미니알밥", "en": "Fried Rice with Fish Roe (small, for kids)", "zh": "迷你鱼籽炒饭(儿童小份)", "ja": "ミニアルパプ(お子様サイズ)", "vi": "Cơm đảo nóng trộn trứng cá size nhỏ trẻ em"}},
      {"price": 260000, "name": {"ko": "튀김우동", "en": "Udon with Tempura", "zh": "天妇罗乌冬面", "ja": "天ぷらうどん", "vi": "Mì Udon và đồ chiên"}},
      {"price": 330000, "spicy": true, "name": {"ko": "알탕", "en": "Spicy Fish Roe Soup", "zh": "辣鱼籽汤", "ja": "アルタン(辛い魚卵鍋)", "vi": "Canh trứng cá minh thái"}},
      {"price": 330000, "spicy": true, "name": {"ko": "동태탕", "en": "Spicy Pollack Soup", "zh": "辣明太鱼汤", "ja": "トンテタン(スケトウダラの辛い鍋)", "vi": "Canh cá minh thái"}},
      {"price": 330000, "name": {"ko": "동태지리", "en": "Pollack Soup (not spicy)", "zh": "清炖明太鱼汤(不辣)", "ja": "トンテジリ(スケトウダラの辛くない鍋)", "vi": "Canh cá minh thái không cay"}},
      {"sizes": [[{"ko": "4pcs", "en": "4pcs", "zh": "4pcs", "ja": "4pcs", "vi": "4pcs"}, 440000], [{"ko": "8pcs", "en": "8pcs", "zh": "8pcs", "ja": "8pcs", "vi": "8pcs"}, 760000]], "name": {"ko": "새우튀김", "en": "Fried Shrimp", "zh": "炸虾", "ja": "海老フライ", "vi": "Tôm chiên xù"}},
      {"price": 240000, "name": {"ko": "생선까스", "en": "Fish Cutlet", "zh": "炸鱼排", "ja": "魚のカツ", "vi": "Cá chiên xù"}},
      {"price": 60000, "name": {"ko": "생선까스 추가 (1pcs)", "en": "Extra Fish Cutlet (1 pc)", "zh": "加炸鱼排(1pcs)", "ja": "魚のカツ追加(1pcs)", "vi": "Thêm cá chiên xù (1 miếng)"}},
      {"price": 60000, "name": {"ko": "우동 면사리 추가", "en": "Extra Udon Noodles", "zh": "加乌冬面", "ja": "うどん麺追加", "vi": "Gói mì Udon thêm"}},
      {"sizes": [[{"ko": "S", "en": "S", "zh": "S", "ja": "S", "vi": "S"}, 100000], [{"ko": "L", "en": "L", "zh": "L", "ja": "L", "vi": "L"}, 150000]], "name": {"ko": "가오리찜 추가", "en": "Extra Steamed Skate", "zh": "加蒸鳐鱼", "ja": "エイの蒸し物(カオリチム)追加", "vi": "Cá đuối hấp"}},
    ],
  },
  {
    id: "course",
    name: {"ko": "저녁 코스", "en": "Dinner Course", "zh": "晚餐套餐", "ja": "ディナーコース", "vi": "Set tối"},
    note: {"ko": "가격은 모두 부가세(VAT) 포함이에요. 사이드 음식을 단품으로 추가하면 2인분 170,000동 / 3인분 250,000동 / 4인분 330,000동이 별도로 추가돼요.", "en": "All prices include VAT. If you add side dishes à la carte, an extra charge applies: 170,000 VND for 2 people / 250,000 VND for 3 people / 330,000 VND for 4 people.", "zh": "所有价格均含增值税(VAT)。单点追加配菜时，另收2人份170,000越南盾 / 3人份250,000越南盾 / 4人份330,000越南盾。", "ja": "価格はすべて付加価値税(VAT)込みです。サイドメニューを単品で追加される場合は、2名様分170,000ドン / 3名様分250,000ドン / 4名様分330,000ドンが別途かかります。", "vi": "Tất cả giá đã bao gồm VAT. Nếu gọi thêm món ăn kèm lẻ, sẽ tính thêm 170,000 đồng cho 2 người / 250,000 đồng cho 3 người / 330,000 đồng cho 4 người."},
    items: [
      {"sizes": [[{"ko": "1인", "en": "1 pax", "zh": "1人", "ja": "1名", "vi": "1 người"}, 1000000], [{"ko": "2인", "en": "2 pax", "zh": "2人", "ja": "2名", "vi": "2 người"}, 2000000], [{"ko": "3인", "en": "3 pax", "zh": "3人", "ja": "3名", "vi": "3 người"}, 2900000], [{"ko": "4인", "en": "4 pax", "zh": "4人", "ja": "4名", "vi": "4 người"}, 3800000], [{"ko": "5인", "en": "5 pax", "zh": "5人", "ja": "5名", "vi": "5 người"}, 4700000]], "tag": "best", "name": {"ko": "모둠회 코스", "en": "Assorted Sashimi Course (no tuna)", "zh": "刺身拼盘套餐(不含金枪鱼)", "ja": "刺身盛り合わせコース(マグロなし)", "vi": "Gỏi cá tổng hợp (không cá ngừ)"}, "desc": {"ko": "전채 · 회 사시미 · 회/회초밥/해산물 모둠 · 특선요리 · 튀김요리 · 매운탕 · 식사 · 후식 (참치 제외)", "en": "Appetizer · Sashimi · Assorted sashimi / sushi / seafood · Chef's special dish · Fried dish · Spicy fish stew (Maeuntang) · Meal · Dessert (excluding tuna)", "zh": "前菜 · 生鱼片 · 刺身/寿司/海鲜拼盘 · 特色料理 · 炸物 · 辣鱼汤(Maeuntang) · 主食 · 甜点 (不含金枪鱼)", "ja": "前菜 · 刺身 · 刺身/握り寿司/海鮮盛り合わせ · 特選料理 · 揚げ物 · メウンタン(辛い魚鍋) · 食事 · デザート (マグロ除く)", "vi": "Món khai vị · Sashimi · Tổng hợp sashimi/sushi/hải sản · Món đặc biệt · Món chiên · Lẩu cá cay (Maeuntang) · Món chính · Tráng miệng (không có cá ngừ)"}},
      {"sizes": [[{"ko": "1인 · 12pcs", "en": "1 pax · 12pcs", "zh": "1人 · 12pcs", "ja": "1名 · 12pcs", "vi": "1 người · 12pcs"}, 1900000], [{"ko": "2인 · 20pcs", "en": "2 pax · 20pcs", "zh": "2人 · 20pcs", "ja": "2名 · 20pcs", "vi": "2 người · 20pcs"}, 3100000], [{"ko": "3인 · 30pcs", "en": "3 pax · 30pcs", "zh": "3人 · 30pcs", "ja": "3名 · 30pcs", "vi": "3 người · 30pcs"}, 4400000], [{"ko": "4인 · 40pcs", "en": "4 pax · 40pcs", "zh": "4人 · 40pcs", "ja": "4名 · 40pcs", "vi": "4 người · 40pcs"}, 5700000], [{"ko": "5인 · 50pcs", "en": "5 pax · 50pcs", "zh": "5人 · 50pcs", "ja": "5名 · 50pcs", "vi": "5 người · 50pcs"}, 7100000]], "tag": "best", "name": {"ko": "참다랑어 머리살 코스", "en": "Bluefin Tuna Cheek Course", "zh": "蓝鳍金枪鱼头肉套餐", "ja": "本マグロ頭肉コース", "vi": "Gỏi thịt má cá ngừ cao cấp"}, "desc": {"ko": "전채 · 참다랑어 머리살 · 회/회초밥/해산물 모둠 · 특선요리 · 튀김요리 · 매운탕 · 식사 · 후식", "en": "Appetizer · Bluefin tuna cheek · Assorted sashimi / sushi / seafood · Chef's special dish · Fried dish · Spicy fish stew (Maeuntang) · Meal · Dessert", "zh": "前菜 · 蓝鳍金枪鱼头肉 · 刺身/寿司/海鲜拼盘 · 特色料理 · 炸物 · 辣鱼汤(Maeuntang) · 主食 · 甜点", "ja": "前菜 · 本マグロ頭肉 · 刺身/握り寿司/海鮮盛り合わせ · 特選料理 · 揚げ物 · メウンタン(辛い魚鍋) · 食事 · デザート", "vi": "Món khai vị · Thịt má cá ngừ vây xanh · Tổng hợp sashimi/sushi/hải sản · Món đặc biệt · Món chiên · Lẩu cá cay (Maeuntang) · Món chính · Tráng miệng"}},
      {"sizes": [[{"ko": "1인 · 12pcs", "en": "1 pax · 12pcs", "zh": "1人 · 12pcs", "ja": "1名 · 12pcs", "vi": "1 người · 12pcs"}, 1900000], [{"ko": "2인 · 20pcs", "en": "2 pax · 20pcs", "zh": "2人 · 20pcs", "ja": "2名 · 20pcs", "vi": "2 người · 20pcs"}, 3100000], [{"ko": "3인 · 30pcs", "en": "3 pax · 30pcs", "zh": "3人 · 30pcs", "ja": "3名 · 30pcs", "vi": "3 người · 30pcs"}, 4400000], [{"ko": "4인 · 40pcs", "en": "4 pax · 40pcs", "zh": "4人 · 40pcs", "ja": "4名 · 40pcs", "vi": "4 người · 40pcs"}, 5700000], [{"ko": "5인 · 50pcs", "en": "5 pax · 50pcs", "zh": "5人 · 50pcs", "ja": "5名 · 50pcs", "vi": "5 người · 50pcs"}, 7100000]], "tag": "best", "name": {"ko": "참치도로 코스 (참다랑어 1등급 윗뱃살)", "en": "Tuna Toro Course (top-grade bluefin belly)", "zh": "金枪鱼大腹套餐(蓝鳍金枪鱼一级上腹肉)", "ja": "マグロ大トロコース(本マグロ上級トロ)", "vi": "Gỏi thịt bụng cá ngừ cao cấp"}, "desc": {"ko": "전채 · 참다랑어 오도로 · 회/회초밥/해산물 모둠 · 특선요리 · 튀김요리 · 매운탕 · 식사 · 후식", "en": "Appetizer · Bluefin tuna otoro · Assorted sashimi / sushi / seafood · Chef's special dish · Fried dish · Spicy fish stew (Maeuntang) · Meal · Dessert", "zh": "前菜 · 蓝鳍金枪鱼大腹(大トロ) · 刺身/寿司/海鲜拼盘 · 特色料理 · 炸物 · 辣鱼汤(Maeuntang) · 主食 · 甜点", "ja": "前菜 · 本マグロ大トロ · 刺身/握り寿司/海鮮盛り合わせ · 特選料理 · 揚げ物 · メウンタン(辛い魚鍋) · 食事 · デザート", "vi": "Món khai vị · Otoro cá ngừ vây xanh · Tổng hợp sashimi/sushi/hải sản · Món đặc biệt · Món chiên · Lẩu cá cay (Maeuntang) · Món chính · Tráng miệng"}},
      {"sizes": [[{"ko": "1인 · 12pcs", "en": "1 pax · 12pcs", "zh": "1人 · 12pcs", "ja": "1名 · 12pcs", "vi": "1 người · 12pcs"}, 1900000], [{"ko": "2인 · 20pcs", "en": "2 pax · 20pcs", "zh": "2人 · 20pcs", "ja": "2名 · 20pcs", "vi": "2 người · 20pcs"}, 3100000], [{"ko": "3인 · 30pcs", "en": "3 pax · 30pcs", "zh": "3人 · 30pcs", "ja": "3名 · 30pcs", "vi": "3 người · 30pcs"}, 4400000], [{"ko": "4인 · 40pcs", "en": "4 pax · 40pcs", "zh": "4人 · 40pcs", "ja": "4名 · 40pcs", "vi": "4 người · 40pcs"}, 5700000], [{"ko": "5인 · 50pcs", "en": "5 pax · 50pcs", "zh": "5人 · 50pcs", "ja": "5名 · 50pcs", "vi": "5 người · 50pcs"}, 7100000]], "name": {"ko": "참다랑어 울대살 코스", "en": "Bluefin Tuna Neck Course", "zh": "蓝鳍金枪鱼颈肉套餐", "ja": "本マグロ首肉コース", "vi": "Gỏi thịt cổ cá ngừ cao cấp"}, "desc": {"ko": "전채 · 참다랑어 울대살 · 회/회초밥/해산물 모둠 · 특선요리 · 튀김요리 · 매운탕 · 식사 · 후식", "en": "Appetizer · Bluefin tuna neck · Assorted sashimi / sushi / seafood · Chef's special dish · Fried dish · Spicy fish stew (Maeuntang) · Meal · Dessert", "zh": "前菜 · 蓝鳍金枪鱼颈肉 · 刺身/寿司/海鲜拼盘 · 特色料理 · 炸物 · 辣鱼汤(Maeuntang) · 主食 · 甜点", "ja": "前菜 · 本マグロ首肉 · 刺身/握り寿司/海鮮盛り合わせ · 特選料理 · 揚げ物 · メウンタン(辛い魚鍋) · 食事 · デザート", "vi": "Món khai vị · Thịt cổ cá ngừ vây xanh · Tổng hợp sashimi/sushi/hải sản · Món đặc biệt · Món chiên · Lẩu cá cay (Maeuntang) · Món chính · Tráng miệng"}},
      {"sizes": [[{"ko": "4pcs", "en": "4pcs", "zh": "4pcs", "ja": "4pcs", "vi": "4pcs"}, 490000], [{"ko": "8pcs", "en": "8pcs", "zh": "8pcs", "ja": "8pcs", "vi": "8pcs"}, 870000]], "name": {"ko": "머리살 추가", "en": "Extra Tuna Cheek", "zh": "加金枪鱼头肉", "ja": "マグロ頭肉追加", "vi": "Thêm thịt má cá ngừ"}},
      {"sizes": [[{"ko": "4pcs", "en": "4pcs", "zh": "4pcs", "ja": "4pcs", "vi": "4pcs"}, 490000], [{"ko": "8pcs", "en": "8pcs", "zh": "8pcs", "ja": "8pcs", "vi": "8pcs"}, 870000]], "name": {"ko": "참치도로 추가", "en": "Extra Tuna Toro", "zh": "加金枪鱼大腹", "ja": "マグロ大トロ追加", "vi": "Thêm thịt bụng cá ngừ"}},
      {"sizes": [[{"ko": "4pcs", "en": "4pcs", "zh": "4pcs", "ja": "4pcs", "vi": "4pcs"}, 490000], [{"ko": "8pcs", "en": "8pcs", "zh": "8pcs", "ja": "8pcs", "vi": "8pcs"}, 870000]], "name": {"ko": "울대살 추가", "en": "Extra Tuna Neck", "zh": "加金枪鱼颈肉", "ja": "マグロ首肉追加", "vi": "Thêm thịt cổ cá ngừ"}},
    ],
  },
  {
    id: "alacart",
    name: {"ko": "저녁 단품", "en": "Dinner À la carte", "zh": "晚餐单点", "ja": "ディナー一品料理", "vi": "Món lẻ buổi tối"},
    note: {"ko": "가격은 모두 부가세(VAT) 포함이에요.", "en": "All prices include VAT.", "zh": "所有价格均含增值税(VAT)。", "ja": "価格はすべて付加価値税(VAT)込みです。", "vi": "Tất cả giá đã bao gồm VAT."},
    items: [
      {"price": 500000, "name": {"ko": "양미리구이 10마리 (겨울철)", "en": "Grilled Yangmiri (sand lance), 10 pieces · winter season", "zh": "烤玉筋鱼 Yangmiri 10条(冬季)", "ja": "ヤンミリ(イカナゴ)焼き 10匹(冬季)", "vi": "Cá yangmiri nướng"}, "desc": {"ko": "굽는 데 30분 걸려요.", "en": "Grilling takes 30 minutes.", "zh": "烤制需要30分钟。", "ja": "焼き上がりまで30分かかります。", "vi": "Thời gian nướng mất 30 phút."}},
      {"price": 100000, "unit": {"ko": "1인", "en": "1 pax", "zh": "1人", "ja": "1名", "vi": "1 người"}, "name": {"ko": "고노와다", "en": "Konowata (sea cucumber innards & sake) Dipping Sauce", "zh": "海参肠酒渍酱(Konowata)", "ja": "このわた(なまこの腸と日本酒のつけダレ)", "vi": "Sốt chấm gỏi (ruột hải sâm & sake)"}},
      {"price": 1300000, "unit": {"ko": "1인", "en": "1 pax", "zh": "1人", "ja": "1名", "vi": "1 người"}, "name": {"ko": "돌문어숙회", "en": "Octopus Sashimi (blanched)", "zh": "水煮章鱼片", "ja": "真ダコの湯引き", "vi": "Gỏi bạch tuộc Nhật"}},
      {"price": 1300000, "unit": {"ko": "1인", "en": "1 pax", "zh": "1人", "ja": "1名", "vi": "1 người"}, "name": {"ko": "참소라숙회", "en": "Chamsora (turban shell) Sashimi (blanched)", "zh": "水煮海螺片 Chamsora", "ja": "チャムソラ(巻貝)の湯引き", "vi": "Gỏi ốc Hàn Quốc"}},
      {"price": 1200000, "unit": {"ko": "1인", "en": "1 pax", "zh": "1人", "ja": "1名", "vi": "1 người"}, "name": {"ko": "갑오징어회", "en": "Cuttlefish Sashimi", "zh": "墨鱼刺身", "ja": "甲イカ刺身", "vi": "Gỏi mực mai"}},
      {"price": 1000000, "unit": {"ko": "1인", "en": "1 pax", "zh": "1人", "ja": "1名", "vi": "1 người"}, "name": {"ko": "연어회", "en": "Salmon Sashimi", "zh": "三文鱼刺身", "ja": "サーモン刺身", "vi": "Gỏi cá hồi"}},
    ],
  },
  {
    id: "liquor",
    name: {"ko": "주류 · 음료", "en": "Liquor & Drinks", "zh": "酒类 · 饮品", "ja": "お酒・ドリンク", "vi": "Rượu · Đồ uống"},
    note: {"ko": "가격은 모두 부가세(VAT) 포함이에요. 외부 주류를 가져오시면 콜키지는 1병당 300,000동이에요.", "en": "All prices include VAT. If you bring your own alcohol, the corkage fee is 300,000 VND per bottle.", "zh": "所有价格均含增值税(VAT)。自带酒水的开瓶费为每瓶300,000越南盾。", "ja": "価格はすべて付加価値税(VAT)込みです。お酒の持ち込みの場合、持ち込み料は1本につき300,000ドンです。", "vi": "Tất cả giá đã bao gồm VAT. Nếu mang rượu từ bên ngoài vào, phí mở rượu là 300,000 đồng cho mỗi chai."},
    items: [
      {"price": 770000, "name": {"ko": "화요 25도", "en": "Hwayo 25", "zh": "火尧 Hwayo 25度", "ja": "ファヨ25度", "vi": "Rượu Hwayo 25"}},
      {"price": 550000, "name": {"ko": "복분자", "en": "Bokbunja (black raspberry wine)", "zh": "覆盆子酒 Bokbunja", "ja": "ポクブンジャ(覆盆子酒)", "vi": "Rượu dâu Bokbunja"}},
      {"price": 330000, "name": {"ko": "백세주", "en": "Baekseju", "zh": "百岁酒 Baekseju", "ja": "ペクセジュ(百歳酒)", "vi": "Rượu sâm Baekseju"}},
      {"price": 270000, "name": {"ko": "청하", "en": "Chungha (Korean sake)", "zh": "清河 Chungha(韩国清酒)", "ja": "チョンハ(韓国の清酒)", "vi": "Rượu sake Hàn Chungha"}},
      {"price": 220000, "name": {"ko": "막걸리", "en": "Makgeolli", "zh": "马格利 Makgeolli(韩国米酒)", "ja": "マッコリ", "vi": "Rượu gạo Makkeoli"}},
      {"price": 180000, "name": {"ko": "참이슬 / 진로", "en": "Chamisul / Jinro Soju", "zh": "真露 Chamisul / Jinro 烧酒", "ja": "チャミスル / ジンロ(焼酎)", "vi": "Rượu Soju"}},
      {"price": 180000, "name": {"ko": "처음처럼 / 새로", "en": "Chum Churum / Saero Soju", "zh": "初饮初乐 Chum Churum / Saero 烧酒", "ja": "チョウムチョロム / セロ(焼酎)", "vi": "Rượu Soju"}},
      {"price": 170000, "name": {"ko": "좋은데이", "en": "Good Day Soju", "zh": "好天天 Good Day 烧酒", "ja": "チョウンデー(焼酎)", "vi": "Rượu Gooday"}},
      {"price": 280000, "name": {"ko": "홍초", "en": "Hongcho", "zh": "红醋 Hongcho", "ja": "ホンチョ", "vi": "Rượu phúc bồn tử Hongcho"}},
      {"sizes": [[{"ko": "300ml", "en": "300ml", "zh": "300ml", "ja": "300ml", "vi": "300ml"}, 180000], [{"ko": "500ml", "en": "500ml", "zh": "500ml", "ja": "500ml", "vi": "500ml"}, 330000]], "name": {"ko": "보드카맨", "en": "Vodkaman", "zh": "Vodkaman 伏特加", "ja": "ボードカマン", "vi": "Vodkaman"}},
      {"price": 70000, "name": {"ko": "사이곤", "en": "Saigon Beer", "zh": "西贡啤酒", "ja": "サイゴンビール", "vi": "Bia Saigon"}},
      {"price": 80000, "name": {"ko": "타이거", "en": "Tiger Beer", "zh": "虎牌啤酒", "ja": "タイガービール", "vi": "Bia Tiger"}},
      {"price": 45000, "name": {"ko": "음료수", "en": "Soft Drinks", "zh": "饮料", "ja": "ソフトドリンク", "vi": "Nước ngọt"}},
    ],
  },
  {
    id: "sake",
    name: {"ko": "일본 청주", "en": "Japanese Sake", "zh": "日本清酒", "ja": "日本酒", "vi": "Rượu sake Nhật"},
    note: {"ko": "가격은 모두 부가세(VAT) 포함이에요. 외부 주류를 가져오시면 콜키지는 1병당 300,000동이에요.", "en": "All prices include VAT. If you bring your own alcohol, the corkage fee is 300,000 VND per bottle.", "zh": "所有价格均含增值税(VAT)。自带酒水的开瓶费为每瓶300,000越南盾。", "ja": "価格はすべて付加価値税(VAT)込みです。お酒の持ち込みの場合、持ち込み料は1本につき300,000ドンです。", "vi": "Tất cả giá đã bao gồm VAT. Nếu mang rượu từ bên ngoài vào, phí mở rượu là 300,000 đồng cho mỗi chai."},
    items: [
      {"sizes": [[{"ko": "300ml", "en": "300ml", "zh": "300ml", "ja": "300ml", "vi": "300ml"}, 1400000], [{"ko": "720ml", "en": "720ml", "zh": "720ml", "ja": "720ml", "vi": "720ml"}, 2500000]], "name": {"ko": "하쿠시카 준마이 다이긴죠", "en": "Hakushika Junmai Daiginjo", "zh": "白鹿 纯米大吟酿", "ja": "白鹿 純米大吟醸", "vi": "Hakushika Junmai Daiginjo"}},
      {"price": 1800000, "unit": {"ko": "1800ml", "en": "1800ml", "zh": "1800ml", "ja": "1800ml", "vi": "1800ml"}, "name": {"ko": "카센 하쿠시카", "en": "Kasen Hakushika", "zh": "Kasen 白鹿", "ja": "カセン ハクシカ", "vi": "Kasen Hakushika"}},
      {"price": 500000, "unit": {"ko": "360ml", "en": "360ml", "zh": "360ml", "ja": "360ml", "vi": "360ml"}, "name": {"ko": "사케 (주전자)", "en": "Sake (kettle)", "zh": "清酒(壶装)", "ja": "日本酒(徳利)", "vi": "Sake (bình)"}},
      {"price": 300000, "unit": {"ko": "180ml", "en": "180ml", "zh": "180ml", "ja": "180ml", "vi": "180ml"}, "name": {"ko": "사케 컵", "en": "Sake (cup)", "zh": "清酒(杯装)", "ja": "日本酒(カップ)", "vi": "Sake (ly)"}},
    ],
  },
];
