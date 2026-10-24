// 예가 Yega (하노이 누룽지백숙·훈제 전문 · The Emerald Vietnam CT8, Từ Liêm) 메뉴 데이터 — 한식
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의', 0이면 무료) / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/예가" — 메뉴판 쪽이 여러 장이지만 같은 메뉴 가격 불일치는 없음.
// 사진의 '11번 누룽지 오리쪽(죽?) 350,000'은 번호가 겹쳐(스모크치킨도 11번) 뺐고, 누룽지죽 350,000은 쪽 4에서 넣음.
// 쪽 2 머리글에 '산촌 하노이점' 표기가 있으나 나머지 쪽은 모두 예가.
window.RESTAURANT = {
  brand: { ko: "예가", en: "Yega", branch: { ko: "하노이", en: "Hà Nội" } },
  phone: "039 353 1840",
  address: "The Emerald Vietnam, E3-(SH16), 1 Floor, CT8, Từ Liêm, Hà Nội",
  mapQuery: "예가 YEGA The Emerald CT8 Từ Liêm Hà Nội",
  mapUrl: "https://www.google.com/maps/place/%EC%98%88%EA%B0%80+(%ED%95%98%EB%85%B8%EC%9D%B4+%EB%B0%B1%EC%88%99+%EB%B0%8F+%ED%9B%88%EC%A0%9C%EC%A0%84%EB%AC%B8%EC%A0%90)/@21.0168985,105.7742497,17z/data=!3m1!4b1!4m6!3m5!1s0x313454ac0fffffe9:0xaa50365c0a9ab43e!8m2!3d21.0168985!4d105.7742497!16s%2Fg%2F11c58kk6qc",
  wifi: { password: "88888888" },
};

window.MENU = [
  {
    id: "baeksuk",
    name: {"ko": "누룽지·약재 백숙", "en": "Baeksuk (Korean boiled chicken & duck soup)", "zh": "锅巴·药材白熟(炖鸡/鸭)", "ja": "ヌルンジ・薬材ペクスク(鶏・鴨の水炊き)", "vi": "Gà/vịt hầm nurungji (Baeksuk)"},
    note: {"ko": "백숙은 미리 예약하면 바로 드실 수 있어요(닭 20분 전, 오리 1시간 20분 전, 엄나무 1시간~1시간 30분 전, 능이 1시간 30분 전). 1마리 기준, 누룽지죽 포함.", "en": "Reserve ahead and your baeksuk is ready when you arrive (chicken 20 min ahead, duck 1 hr 20 min, eomnamu 1 hr to 1 hr 30 min, neungi 1 hr 30 min). Prices are per whole bird and include nurungji porridge.", "zh": "提前预约即可到店马上享用(鸡提前20分钟,鸭提前1小时20分钟,刺楸提前1小时至1小时30分钟,能耳菇提前1小时30分钟)。价格按每只计算,含锅巴粥。", "ja": "事前予約で、すぐにお召し上がりいただけます(鶏は20分前、鴨は1時間20分前、オムナムは1時間〜1時間30分前、ヌンイは1時間30分前)。1羽の価格で、おこげ粥付きです。", "vi": "Đặt trước để dùng ngay khi đến (gà trước 20 phút, vịt trước 1 giờ 20 phút, ba kích/eomnamu trước 1 giờ đến 1 giờ 30 phút, nấm neungi trước 1 giờ 30 phút). Giá tính theo 1 con, đã gồm cháo nurungji."},
    items: [
      {"price": 1000000, "tag": "best", "photo": "img/baeksuk.jpg", "name": {"ko": "누룽지 닭 백숙", "en": "Nurungji Chicken Baeksuk (Korean chicken soup with scorched rice)", "zh": "锅巴炖鸡(韩式白熟鸡汤)", "ja": "ヌルンジ鶏ペクスク(鶏の水炊き・おこげ付き)", "vi": "Gà hầm nurungji (Baeksuk gà)"}},
      {"price": 1150000, "name": {"ko": "누룽지 오리 백숙", "en": "Nurungji Duck Baeksuk (Korean duck soup with scorched rice)", "zh": "锅巴炖鸭(韩式白熟鸭汤)", "ja": "ヌルンジ鴨ペクスク(鴨の水炊き・おこげ付き)", "vi": "Vịt hầm nurungji (Baeksuk vịt)"}},
      {"price": 1150000, "name": {"ko": "엄나무 닭 백숙", "en": "Eomnamu Chicken Baeksuk (chicken soup with prickly castor oil tree)", "zh": "刺楸炖鸡(韩式白熟鸡汤)", "ja": "オムナム鶏ペクスク(エゾウコギ風味の鶏の水炊き)", "vi": "Gà hầm ba kích Eomnamu (Baeksuk gà)"}},
      {"price": 1300000, "name": {"ko": "엄나무 오리 백숙", "en": "Eomnamu Duck Baeksuk (duck soup with prickly castor oil tree)", "zh": "刺楸炖鸭(韩式白熟鸭汤)", "ja": "オムナム鴨ペクスク(エゾウコギ風味の鴨の水炊き)", "vi": "Vịt hầm ba kích Eomnamu (Baeksuk vịt)"}},
      {"price": 1450000, "name": {"ko": "능이 닭 백숙", "en": "Neungi Chicken Baeksuk (chicken soup with neungi mushroom)", "zh": "能耳菇炖鸡(韩式白熟鸡汤)", "ja": "ヌンイ鶏ペクスク(ヌンイ茸入り鶏の水炊き)", "vi": "Gà hầm nấm Neungi (Baeksuk gà)"}},
      {"price": 1600000, "name": {"ko": "능이 오리 백숙", "en": "Neungi Duck Baeksuk (duck soup with neungi mushroom)", "zh": "能耳菇炖鸭(韩式白熟鸭汤)", "ja": "ヌンイ鴨ペクスク(ヌンイ茸入り鴨の水炊き)", "vi": "Vịt hầm nấm Neungi (Baeksuk vịt)"}},
      {"price": 350000, "photo": "img/nurungji-juk.jpg", "name": {"ko": "누룽지 죽", "en": "Nurungji Juk (scorched rice porridge)", "zh": "锅巴粥", "ja": "ヌルンジ粥(おこげ粥)", "vi": "Cháo nurungji (cháo cơm cháy)"}, "desc": {"ko": "45분 전 예약", "en": "Reserve 45 minutes ahead", "zh": "需提前45分钟预约", "ja": "45分前までにご予約ください", "vi": "Đặt trước 45 phút"}},
    ],
  },
  {
    id: "smoked",
    name: {"ko": "훈제·구이", "en": "Smoked & grilled", "zh": "烟熏·烧烤", "ja": "燻製・焼き物", "vi": "Món hun khói"},
    note: {"ko": "생고기를 24시간 숙성한 뒤 훈제한 하노이 유일 냉장 훈제 · 방부제·연육제·냉동육 없음 · 훈제오리 반마리 이상, 삼겹살·떡갈비 3인분 이상 주문 시 들깨수제비 서비스", "en": "The only chilled smoked meat in Hà Nội: fresh meat aged 24 hours, then smoked · No preservatives, no meat tenderizer, no frozen meat · Free perilla sujebi with half a smoked duck or more, or 3+ servings of pork belly or tteok-galbi", "zh": "河内唯一冷藏烟熏:鲜肉腌制熟成24小时后烟熏 · 无防腐剂、无嫩肉剂、无冷冻肉 · 点烟熏鸭半只以上,或五花肉、韩式肉饼3人份以上,赠送紫苏面疙瘩汤", "ja": "ハノイで唯一の冷蔵燻製:生肉を24時間熟成してから燻製 · 防腐剤・軟化剤・冷凍肉は不使用 · 燻製鴨は半羽以上、サムギョプサル・トッカルビは3人前以上のご注文でエゴマすいとんをサービス", "vi": "Món hun khói ướp lạnh duy nhất tại Hà Nội: thịt tươi ủ 24 giờ rồi mới hun khói · Không chất bảo quản, không chất làm mềm thịt, không thịt đông lạnh · Tặng canh bột mì vừng khi gọi vịt hun khói từ nửa con, hoặc thịt ba chỉ/chả thịt bò từ 3 phần"},
    items: [
      {"price": 1200000, "name": {"ko": "훈제오리 1마리 + 들깨수제비", "en": "Whole Smoked Duck + Perilla Sujebi", "zh": "烟熏鸭整只 + 紫苏面疙瘩汤", "ja": "燻製鴨1羽 + エゴマすいとん", "vi": "Vịt hun khói 1 con + canh bột mì vừng"}, "desc": {"ko": "3~4인분 · 들깨수제비 포함", "en": "Serves 3-4 · includes perilla sujebi", "zh": "3~4人份 · 含紫苏面疙瘩汤", "ja": "3〜4人前 · エゴマすいとん付き", "vi": "3-4 người · kèm canh bột mì vừng"}},
      {"price": 650000, "tag": "best", "photo": "img/smoked-duck.jpg", "name": {"ko": "훈제오리 반마리 + 들깨수제비", "en": "Half Smoked Duck + Perilla Sujebi", "zh": "烟熏鸭半只 + 紫苏面疙瘩汤", "ja": "燻製鴨半羽 + エゴマすいとん", "vi": "Vịt hun khói 0,5 con + canh bột mì vừng"}, "desc": {"ko": "2인분 · 들깨수제비 포함", "en": "Serves 2 · includes perilla sujebi", "zh": "2人份 · 含紫苏面疙瘩汤", "ja": "2人前 · エゴマすいとん付き", "vi": "2 người · kèm canh bột mì vừng"}},
      {"price": 250000, "name": {"ko": "훈제 삼겹살", "en": "Smoked Pork Belly (Samgyeopsal)", "zh": "烟熏五花肉", "ja": "燻製サムギョプサル", "vi": "Thịt ba chỉ hun khói"}},
      {"price": 250000, "name": {"ko": "수제 떡갈비", "en": "Handmade Tteok-galbi (Korean grilled short rib patty)", "zh": "手工韩式牛肉饼(Tteok-galbi)", "ja": "手作りトッカルビ(韓国風焼き肉団子)", "vi": "Chả thịt bò Tteok-galbi tự làm"}},
      {"price": 480000, "name": {"ko": "진꽃살(소고기 갈비 부위)", "en": "Jinkkotsal (boneless beef short rib)", "zh": "Jinkkotsal(无骨牛小排)", "ja": "チンコッサル(牛カルビ部位)", "vi": "Jinkkotsal (sườn bò non không xương)"}},
      {"price": 200000, "name": {"ko": "스모크치킨(훈제 닭다리)", "en": "Smoked Chicken (Smoked Drumsticks)", "zh": "烟熏鸡(烟熏鸡腿)", "ja": "スモークチキン(燻製鶏もも)", "vi": "Gà hun khói (đùi gà hun khói)"}},
      {"price": 150000, "name": {"ko": "훈제 소시지", "en": "Smoked Sausage", "zh": "烟熏香肠", "ja": "燻製ソーセージ", "vi": "Xúc xích hun khói"}},
    ],
  },
  {
    id: "set",
    name: {"ko": "세트", "en": "Sets", "zh": "套餐", "ja": "セット", "vi": "Combo"},
    items: [
      {"price": 1450000, "name": {"ko": "모듬 A", "en": "Assorted Set A", "zh": "拼盘A", "ja": "盛り合わせA", "vi": "Món tổng hợp A"}, "desc": {"ko": "오리 + 삼겹살 + 떡갈비 + 들깨수제비", "en": "Duck + pork belly + tteok-galbi + perilla sujebi", "zh": "鸭肉 + 五花肉 + 韩式肉饼 + 紫苏面疙瘩汤", "ja": "鴨 + サムギョプサル + トッカルビ + エゴマすいとん", "vi": "Vịt + ba chỉ + chả thịt bò + canh bột mì vừng"}},
      {"price": 1550000, "name": {"ko": "모듬 B", "en": "Assorted Set B", "zh": "拼盘B", "ja": "盛り合わせB", "vi": "Món tổng hợp B"}, "desc": {"ko": "오리 + 삼겹살 + 떡갈비 + 소시지 + 훈제 닭다리 + 들깨수제비", "en": "Duck + pork belly + tteok-galbi + sausage + smoked drumsticks + perilla sujebi", "zh": "鸭肉 + 五花肉 + 韩式肉饼 + 香肠 + 烟熏鸡腿 + 紫苏面疙瘩汤", "ja": "鴨 + サムギョプサル + トッカルビ + ソーセージ + 燻製鶏もも + エゴマすいとん", "vi": "Vịt + ba chỉ + chả thịt bò + xúc xích + đùi gà hun khói + canh bột mì vừng"}},
      {"price": 1650000, "name": {"ko": "모듬 C", "en": "Assorted Set C", "zh": "拼盘C", "ja": "盛り合わせC", "vi": "Món tổng hợp C"}, "desc": {"ko": "진꽃살 + 오리 + 떡갈비 + 들깨수제비", "en": "Jinkkotsal + duck + tteok-galbi + perilla sujebi", "zh": "无骨牛小排 + 鸭肉 + 韩式肉饼 + 紫苏面疙瘩汤", "ja": "チンコッサル + 鴨 + トッカルビ + エゴマすいとん", "vi": "Jinkkotsal + vịt + chả thịt bò + canh bột mì vừng"}},
      {"sizes": [[{"ko": "중 (700g)", "en": "Medium (700g)", "zh": "中(700g)", "ja": "中(700g)", "vi": "Vừa (700g)"}, 700000], [{"ko": "대 (1kg)", "en": "Large (1kg)", "zh": "大(1kg)", "ja": "大(1kg)", "vi": "Lớn (1kg)"}, 900000]], "name": {"ko": "새우 소금구이", "en": "Salt-Grilled Shrimp (Saeu Sogeum-gui)", "zh": "盐烤大虾", "ja": "エビの塩焼き", "vi": "Tôm nướng muối"}, "desc": {"ko": "살아 있는 새우 · 17시 전까지 사전 예약", "en": "Live shrimp · reserve in advance, before 17:00", "zh": "使用活虾 · 请在17点前提前预约", "ja": "活きたエビを使用 · 17時までに事前予約", "vi": "Tôm còn sống · đặt trước 17:00"}},
    ],
  },
  {
    id: "main",
    name: {"ko": "탕·식사", "en": "Stews & dishes", "zh": "汤锅·餐食", "ja": "鍋・お食事", "vi": "Món ăn"},
    items: [
      {"price": 850000, "spicy": true, "photo": "img/dakbokkeum.jpg", "name": {"ko": "닭볶음탕(1마리)", "en": "Spicy Braised Chicken (Dakbokkeumtang, whole chicken)", "zh": "辣炖鸡块(整只)", "ja": "タッポックムタン(鶏1羽)", "vi": "Gà nấu cay khoai tây (Dakbokkeumtang, 1 con)"}, "desc": {"ko": "조리 시간 35분", "en": "Cooking time 35 minutes", "zh": "烹饪时间35分钟", "ja": "調理時間35分", "vi": "Thời gian nấu 35 phút"}},
      {"price": 30000, "name": {"ko": "볶음밥(1인분)", "en": "Fried Rice (1 serving)", "zh": "炒饭(1人份)", "ja": "チャーハン(1人前)", "vi": "Cơm rang (1 suất)"}, "desc": {"ko": "닭볶음탕 마무리용", "en": "To finish off the dakbokkeumtang", "zh": "适合作为辣炖鸡的收尾", "ja": "タッポックムタンの締めに", "vi": "Dùng để ăn cuối với gà nấu cay"}},
      {"price": 350000, "spicy": true, "name": {"ko": "제육볶음", "en": "Spicy Stir-fried Pork (Jeyuk-bokkeum)", "zh": "辣炒猪肉", "ja": "豚肉の辛味炒め(チェユクポックム)", "vi": "Thịt heo xào cay (Jeyuk-bokkeum)"}},
      {"price": 250000, "name": {"ko": "도토리 묵무침", "en": "Seasoned Acorn Jelly Salad (Dotori Muk-muchim)", "zh": "凉拌橡子冻", "ja": "どんぐりゼリーの和え物(トトリムク)", "vi": "Gỏi thạch hạt dẻ (Dotori muk-muchim)"}},
      {"price": 190000, "name": {"ko": "메밀 전병", "en": "Buckwheat Pancake Rolls (Memil Jeonbyeong)", "zh": "荞麦煎饼卷", "ja": "そば粉のチョンビョン(韓国風クレープ巻き)", "vi": "Bánh kiều mạch cuộn (Memil jeonbyeong)"}},
      {"price": 500000, "name": {"ko": "문어 숙회", "en": "Blanched Octopus (Muneo Sukhoe)", "zh": "白灼章鱼", "ja": "タコのスクフェ(茹でダコ)", "vi": "Bạch tuộc luộc (Muneo sukhoe)"}, "desc": {"ko": "한 마리 700~800g", "en": "One octopus, 700-800g", "zh": "一只约700~800g", "ja": "1杯 700〜800g", "vi": "Một con 700-800g"}},
    ],
  },
  {
    id: "noodle",
    name: {"ko": "면·수제비", "en": "Noodles", "zh": "面·面疙瘩汤", "ja": "麺・すいとん", "vi": "Mì"},
    items: [
      {"price": 350000, "spicy": true, "photo": "img/jaengban.jpg", "name": {"ko": "쟁반 막국수", "en": "Jaengban Makguksu (Spicy Buckwheat Noodles on a Tray)", "zh": "大盘辣拌荞麦面", "ja": "チェンバンマッククス(大皿の辛い和えそば)", "vi": "Mì kiều mạch trộn cay khay lớn (Jaengban makguksu)"}},
      {"price": 160000, "photo": "img/makguksu.jpg", "name": {"ko": "봉평 막국수(물)", "en": "Bongpyeong Makguksu (Cold Buckwheat Noodles in Broth)", "zh": "凤坪荞麦冷面(汤)", "ja": "奉平マッククス(冷たいスープ麺)", "vi": "Mì kiều mạch Bongpyeong (nước)"}},
      {"price": 160000, "spicy": true, "name": {"ko": "봉평 막국수(비빔)", "en": "Bongpyeong Makguksu (Spicy Mixed Buckwheat Noodles)", "zh": "凤坪荞麦拌面", "ja": "奉平マッククス(辛い和え麺)", "vi": "Mì kiều mạch Bongpyeong (trộn)"}},
      {"price": 150000, "name": {"ko": "들깨 수제비", "en": "Perilla Sujebi (Hand-pulled Dough Soup with Perilla Seeds)", "zh": "紫苏面疙瘩汤", "ja": "エゴマすいとん", "vi": "Canh bột mì vừng (Deulkkae sujebi)"}},
      {"price": 150000, "name": {"ko": "들깨 메밀국수", "en": "Perilla Buckwheat Noodles (Deulkkae Memil Guksu)", "zh": "紫苏荞麦面", "ja": "エゴマそば", "vi": "Mì kiều mạch vừng (Deulkkae memil guksu)"}},
      {"price": 40000, "name": {"ko": "수제비·라면 사리", "en": "Extra Sujebi or Ramyeon Noodles", "zh": "加面疙瘩或拉面", "ja": "すいとん・ラーメン追加", "vi": "Thêm bột mì sujebi hoặc mì ăn liền"}},
    ],
  },
  {
    id: "lunch",
    name: {"ko": "평일 점심 특선", "en": "Weekday lunch special", "zh": "工作日午餐特选", "ja": "平日ランチ特選", "vi": "Combo buổi trưa ngày thường"},
    note: {"ko": "월~금요일 10:30~14:00 · 공휴일·초복·중복·말복 제외 · 공기밥 무제한 무료", "en": "Mon-Fri 10:30-14:00 · Not available on public holidays or the three boknal days (Chobok, Jungbok, Malbok) · Free unlimited rice", "zh": "周一至周五 10:30~14:00 · 公休日及初伏、中伏、末伏除外 · 米饭无限量免费", "ja": "月〜金曜日 10:30〜14:00 · 祝日および初伏・中伏・末伏は除く · ご飯おかわり無料", "vi": "Thứ hai đến thứ sáu 10:30-14:00 · Trừ ngày lễ và các ngày Sơ phục, Trung phục, Mạt phục · Cơm trắng miễn phí không giới hạn"},
    items: [
      {"price": 700000, "tag": "best", "name": {"ko": "누룽지 닭백숙 1마리(3~4인)", "en": "Nurungji Chicken Baeksuk, whole chicken (serves 3-4)", "zh": "锅巴炖鸡整只(3~4人)", "ja": "ヌルンジ鶏ペクスク1羽(3〜4人前)", "vi": "Gà hầm nurungji 1 con (3-4 người)"}, "desc": {"ko": "20분 전에만 연락 주시면 바로 드실 수 있어요", "en": "Call 20 minutes ahead and it will be ready when you arrive", "zh": "只需提前20分钟联系,到店即可享用", "ja": "20分前にご連絡いただければ、すぐにお召し上がりいただけます", "vi": "Chỉ cần báo trước 20 phút là có thể dùng ngay"}},
      {"price": 190000, "name": {"ko": "제육 한상(제육볶음 300g + 들깨수제비, 2인 이상, 1인)", "en": "Jeyuk Hansang (300g spicy pork + perilla sujebi, per person, min. 2)", "zh": "辣炒猪肉套餐(辣炒猪肉300g + 紫苏面疙瘩汤,2人起,每人)", "ja": "チェユク定食(豚肉辛味炒め300g + エゴマすいとん、2人前から、1人分)", "vi": "Mâm thịt heo xào cay (300g + canh bột mì vừng, từ 2 người, giá 1 người)"}, "desc": {"ko": "2인 이상 주문 · 1인 가격", "en": "Min. 2 orders · price per person", "zh": "2人起点 · 每人价格", "ja": "2人前以上のご注文 · 1人分の価格", "vi": "Gọi từ 2 người · giá cho 1 người"}},
      {"price": 190000, "name": {"ko": "훈제삼겹 한상(훈제 삼겹살 300g + 들깨수제비, 2인 이상, 1인)", "en": "Smoked Pork Belly Hansang (300g smoked pork belly + perilla sujebi, per person, min. 2)", "zh": "烟熏五花肉套餐(烟熏五花肉300g + 紫苏面疙瘩汤,2人起,每人)", "ja": "燻製サムギョプサル定食(燻製サムギョプサル300g + エゴマすいとん、2人前から、1人分)", "vi": "Mâm ba chỉ hun khói (300g + canh bột mì vừng, từ 2 người, giá 1 người)"}, "desc": {"ko": "2인 이상 주문 · 1인 가격", "en": "Min. 2 orders · price per person", "zh": "2人起点 · 每人价格", "ja": "2人前以上のご注文 · 1人分の価格", "vi": "Gọi từ 2 người · giá cho 1 người"}},
      {"price": 190000, "name": {"ko": "수제떡갈비 한상(떡갈비 400g + 들깨수제비, 2인 이상, 1인)", "en": "Handmade Tteok-galbi Hansang (400g tteok-galbi + perilla sujebi, per person, min. 2)", "zh": "手工韩式肉饼套餐(肉饼400g + 紫苏面疙瘩汤,2人起,每人)", "ja": "手作りトッカルビ定食(トッカルビ400g + エゴマすいとん、2人前から、1人分)", "vi": "Mâm chả thịt bò tự làm (400g + canh bột mì vừng, từ 2 người, giá 1 người)"}, "desc": {"ko": "2인 이상 주문 · 1인 가격", "en": "Min. 2 orders · price per person", "zh": "2人起点 · 每人价格", "ja": "2人前以上のご注文 · 1人分の価格", "vi": "Gọi từ 2 người · giá cho 1 người"}},
    ],
  },
];
