// 청식당 (간판 NHÀ HÀNG HÀN QUỐC 청식당 · Lý Nhân Tông, Võ Cường, Bắc Ninh) 메뉴 데이터 — 한국식 중화요리
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag / spicy: true / desc / photo
// 원본: 구글 드라이브 "QR메뉴판/청식당" 폴더(사진 수집기 v1.5) — 가게 계정이 올린 메뉴책 5쪽(menu_07~11: 짜장·반반·짬뽕/탕·찌개·밥/면),
// 손님이 찍은 메뉴책 3쪽(menu_01 대표 요리·세트, menu_04 부대찌개·불낙전골, menu_06 덮밥)과 벽 메뉴판 1장(menu_05: 요리·식사·주류).
// 메뉴책 가격을 먼저 쓰고, 메뉴책에 없는 메뉴만 벽 메뉴판 값(비스듬히 찍혀 줄 맞춤으로 읽음).
// 메뉴판은 한국어뿐(찌개·전골만 베트남어 있음)이라 다른 언어는 새로 옮김.
// 항목 사진은 메뉴책 속 사진을 잘라 씀(img/, 인쇄물이라 실제 접시와 다를 수 있음). real-*.jpg는 손님이 올린 실제 음식 사진.
window.RESTAURANT = {
  brand: { ko: "청식당", en: "Cheong Sikdang", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0972 948 055",
  address: "54 Lý Nhân Tông, Võ Cường, Bắc Ninh",
  mapQuery: "청식당 Nhà hàng Hàn Quốc Lý Nhân Tông Võ Cường Bắc Ninh",
  wifi: null, // 예: { ssid: "CHEONG", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const SM = T("소", "S", "小", "小", "Nhỏ");
const MD = T("중", "M", "中", "中", "Nhỡ");
const LG = T("대", "L", "大", "大", "Lớn");
const P1 = T("1인분", "1 serving", "1人份", "1人前", "1 người");
const P2 = T("2인분", "2 servings", "2人份", "2人前", "2 người");

window.MENU = [
  {
    id: "dish",
    name: T("요리", "Dishes", "菜肴", "料理", "Món ăn"),
    items: [
      it(null, "real-tangsuyuk", "탕수육", "Tangsuyuk (sweet & sour pork)", "糖醋肉", "タンスユク(酢豚)", "Thịt heo chiên xốt chua ngọt", { sizes: [[SM, 250000], [LG, 350000]] }),
      it(300000, null, "사천탕수육", "Sichuan Tangsuyuk (spicy sweet & sour pork)", "川味糖醋肉", "四川風タンスユク(辛い酢豚)", "Thịt heo chiên xốt chua ngọt cay Tứ Xuyên", { spicy: true }),
      it(300000, null, "깐풍기", "Kkanpunggi (spicy fried chicken)", "干烹鸡", "カンプンギ(鶏肉の辛口炒め)", "Gà chiên xốt cay Kkanpunggi", { spicy: true }),
      it(300000, null, "깐풍육", "Kkanpungyuk (spicy fried pork)", "干烹肉", "カンプンユク(豚肉の辛口炒め)", "Thịt heo chiên xốt cay Kkanpungyuk", { spicy: true }),
      it(400000, null, "깐쇼새우", "Kkansyo Shrimp (shrimp in chili sauce)", "干烧虾仁", "カンショーエビ(エビのチリソース)", "Tôm xào xốt ớt Kkansyo", { spicy: true }),
      it(400000, null, "깐풍새우", "Kkanpung Shrimp (spicy fried shrimp)", "干烹虾仁", "カンプンエビ(エビの辛口炒め)", "Tôm chiên xốt cay Kkanpung", { spicy: true }),
      it(350000, "nanja", "난자완스", "Nanjawanseu (pan-fried meatballs)", "南煎丸子", "ナンジャワンス(肉団子の煎り煮)", "Thịt viên chiên xốt Nanjawanseu"),
      it(500000, null, "팔보채", "Palbochae (eight-treasure stir-fry)", "八宝菜", "パルボチェ(八宝菜)", "Bát bảo thái (Palbochae)"),
      it(500000, null, "유산슬", "Yusanseul (stir-fried seafood & meat in starch sauce)", "溜三丝", "ユサンスル(海鮮と肉のとろみ炒め)", "Yusanseul (hải sản, thịt xào xốt sệt)"),
      it(650000, null, "전가복", "Jeongabok (mixed seafood & meat stir-fry)", "全家福", "全家福(五目海鮮炒め)", "Jeongabok (hải sản thập cẩm xào)"),
      it(300000, null, "고추잡채", "Gochu Japchae (pepper & meat strips)", "青椒肉丝", "チンジャオロース(青椒肉絲)", "Thịt heo xào ớt chuông"),
      it(350000, null, "제육볶음", "Jeyuk Bokkeum (spicy stir-fried pork)", "辣炒猪肉", "豚肉の辛味炒め(ジェユクポックム)", "Thịt heo xào cay", { spicy: true }),
      it(200000, null, "잡채", "Japchae (stir-fried glass noodles)", "韩式炒粉丝", "チャプチェ(春雨炒め)", "Miến xào Japchae"),
      it(200000, null, "마파두부", "Mapo Tofu", "麻婆豆腐", "マーボー豆腐", "Đậu hũ Mapo", { spicy: true }),
      it(100000, null, "군만두", "Gunmandu (fried dumplings)", "煎饺", "焼き餃子", "Bánh xếp chiên"),
    ],
  },
  {
    id: "tang",
    name: T("누룽지탕 · 짬뽕탕", "Scorched Rice Soup · Jjamppong Soup", "锅巴汤 · 炒码汤", "おこげスープ · チャンポンスープ", "Súp cơm cháy · Lẩu hải sản cay"),
    items: [
      it(700000, "nurungji", "해물누룽지탕", "Seafood Nurungji-tang (scorched rice soup)", "海鲜锅巴汤", "海鮮おこげスープ", "Súp cơm cháy hải sản"),
      it(500000, "maesaengi-nurungji", "매생이 누룽지탕", "Maesaengi Seaweed Nurungji-tang", "海藻锅巴汤", "メセンイ(海藻)おこげスープ", "Súp cơm cháy rong maesaengi"),
      it(500000, "aljjamppongtang", "알짬뽕탕", "Fish Roe Jjamppong-tang (spicy seafood soup)", "鱼籽炒码汤", "魚卵チャンポンスープ", "Lẩu hải sản cay trứng cá", { spicy: true }),
      it(600000, null, "술국 해물짬뽕탕", "Seafood Jjamppong-tang (drinking soup)", "下酒海鲜炒码汤", "海鮮チャンポンスープ(酒の肴スープ)", "Lẩu hải sản cay (canh nhậu)", { spicy: true }),
    ],
  },
  {
    id: "set",
    name: T("세트", "Sets", "套餐", "セット", "Set (Combo)"),
    items: [
      it(400000, null, "Set 1", "Set 1", "Set 1", "Set 1", "Set 1", { desc: T("짜장면 2 + 사천탕수육", "Jjajangmyeon 2 + Sichuan Tangsuyuk", "炸酱面 2 + 川味糖醋肉", "チャジャン麺 2 + 四川風タンスユク", "Mì tương đen 2 + Thịt heo chiên xốt chua ngọt Tứ Xuyên") }),
      it(430000, null, "Set 2", "Set 2", "Set 2", "Set 2", "Set 2", { desc: T("짬뽕 2 + 사천탕수육", "Jjamppong 2 + Sichuan Tangsuyuk", "炒码面 2 + 川味糖醋肉", "チャンポン 2 + 四川風タンスユク", "Mì hải sản cay 2 + Thịt heo chiên xốt chua ngọt Tứ Xuyên") }),
      it(430000, null, "Set 3", "Set 3", "Set 3", "Set 3", "Set 3", { desc: T("짬뽕 + 볶음밥 + 사천탕수육", "Jjamppong + Fried rice + Sichuan Tangsuyuk", "炒码面 + 炒饭 + 川味糖醋肉", "チャンポン + チャーハン + 四川風タンスユク", "Mì hải sản cay + Cơm rang + Thịt heo chiên xốt chua ngọt Tứ Xuyên") }),
      it(550000, null, "Set 4", "Set 4", "Set 4", "Set 4", "Set 4", { desc: T("깐풍기 + 짬뽕 + 짜장면 + 볶음밥", "Kkanpunggi + Jjamppong + Jjajangmyeon + Fried rice", "干烹鸡 + 炒码面 + 炸酱面 + 炒饭", "カンプンギ + チャンポン + チャジャン麺 + チャーハン", "Gà chiên xốt cay Kkanpunggi + Mì hải sản cay + Mì tương đen + Cơm rang") }),
      it(550000, null, "Set 5", "Set 5", "Set 5", "Set 5", "Set 5", { desc: T("사천탕수육 + 짬뽕 + 짜장면 + 볶음밥", "Sichuan Tangsuyuk + Jjamppong + Jjajangmyeon + Fried rice", "川味糖醋肉 + 炒码面 + 炸酱面 + 炒饭", "四川風タンスユク + チャンポン + チャジャン麺 + チャーハン", "Thịt heo chiên xốt chua ngọt Tứ Xuyên + Mì hải sản cay + Mì tương đen + Cơm rang") }),
      it(1300000, null, "Set 6", "Set 6", "Set 6", "Set 6", "Set 6", { desc: T("사천탕수육 + 고추잡채 + 깐풍새우 + 쟁반짜장 + 설원고량주", "Sichuan Tangsuyuk + Gochu Japchae + Kkanpung Shrimp + Jaengban Jjajang + Seolwon Gaoliang liquor", "川味糖醋肉 + 青椒肉丝 + 干烹虾仁 + 大盘炸酱面 + 雪原高粱酒", "四川風タンスユク + チンジャオロース + カンプンエビ + 大皿チャジャン麺 + ソルウォン高粱酒", "Thịt heo chiên xốt chua ngọt Tứ Xuyên + Thịt heo xào ớt chuông + Tôm chiên xốt cay Kkanpung + Mì tương đen khay lớn + Rượu cao lương Seolwon") }),
      it(450000, null, "Set 7", "Set 7", "Set 7", "Set 7", "Set 7", { desc: T("짜장면 + 짬뽕 + 깐풍기", "Jjajangmyeon + Jjamppong + Kkanpunggi", "炸酱面 + 炒码面 + 干烹鸡", "チャジャン麺 + チャンポン + カンプンギ", "Mì tương đen + Mì hải sản cay + Gà chiên xốt cay Kkanpunggi") }),
      it(2000000, null, "Set 8", "Set 8", "Set 8", "Set 8", "Set 8", { desc: T("탕수육 + 깐쇼새우 + 양장피 + 팔보채 + 쟁반짜장 + 백년호도", "Tangsuyuk + Kkansyo Shrimp + Yangjangpi + Palbochae + Jaengban Jjajang + Baeknyeon Hodo baijiu", "糖醋肉 + 干烧虾仁 + 两张皮 + 八宝菜 + 大盘炸酱面 + 百年糊涂", "タンスユク + カンショーエビ + ヤンジャンピ + パルボチェ + 大皿チャジャン麺 + 百年糊塗(白酒)", "Thịt heo chiên xốt chua ngọt + Tôm xào xốt ớt Kkansyo + Yangjangpi + Bát bảo thái + Mì tương đen khay lớn + Rượu Baeknyeon Hodo") }),
    ],
  },
  {
    id: "jjajang",
    name: T("짜장", "Jjajang", "炸酱面类", "チャジャン麺", "Mì tương đen"),
    items: [
      it(100000, "jjajang", "짜장면", "Jjajangmyeon (black bean noodles)", "炸酱面", "チャジャン麺", "Mì tương đen"),
      it(120000, "ganjjajang", "간짜장", "Ganjjajang (black bean noodles, sauce stir-fried separately)", "干炸酱面", "カンジャジャン(別炒めチャジャン麺)", "Mì tương đen xào khô Ganjjajang"),
      it(120000, "yuni", "유니짜장", "Yuni Jjajang (minced meat black bean noodles)", "肉末炸酱面", "ユニチャジャン(ひき肉のチャジャン麺)", "Mì tương đen thịt băm"),
      it(150000, "samseon-jjajang", "삼선짜장", "Samseon Jjajang (seafood black bean noodles)", "三鲜炸酱面", "三鮮チャジャン麺(海鮮入り)", "Mì tương đen hải sản"),
      it(null, "jaengban", "쟁반짜장", "Jaengban Jjajang (tray-style black bean noodles)", "大盘炸酱面", "チェンバンチャジャン(大皿チャジャン麺)", "Mì tương đen khay lớn", { sizes: [[P1, 160000], [P2, 300000]] }),
    ],
  },
  {
    id: "jjamppong",
    name: T("짬뽕 · 우동", "Jjamppong · Udon", "炒码面 · 乌冬面", "チャンポン · うどん", "Mì hải sản cay · Udon"),
    note: T("짬뽕 가격은 직원에게 물어봐 주세요.", "Please ask the staff for the jjamppong price.", "炒码面价格请询问店员。", "チャンポンの価格は店員にお尋ねください。", "Vui lòng hỏi nhân viên giá mì hải sản cay (Jjamppong)."),
    items: [
      it(null, null, "짬뽕", "Jjamppong (spicy seafood noodle soup)", "炒码面(韩式海鲜辣汤面)", "チャンポン(韓国式)", "Mì hải sản cay (Jjamppong)", { spicy: true }),
      it(170000, "samseon-maesaengi", "삼선짬뽕 매생이", "Samseon Jjamppong with Maesaengi (3 seafoods)", "三鲜炒码面(海藻)", "三鮮チャンポン メセンイ入り", "Mì hải sản cay 3 loại với rong maesaengi"),
      it(190000, "altang-jjamppong", "알탕짬뽕", "Fish Roe Jjamppong", "鱼籽炒码面", "魚卵チャンポン", "Mì hải sản cay trứng cá", { spicy: true }),
      it(170000, "odeng", "오뎅짬뽕", "Fish Cake Jjamppong", "鱼饼炒码面", "おでんチャンポン", "Mì hải sản cay chả cá", { spicy: true }),
      it(170000, null, "차돌박이짬뽕", "Brisket Jjamppong", "牛腩炒码面", "牛バラ肉チャンポン", "Mì hải sản cay ba chỉ bò", { spicy: true }),
      it(150000, null, "백짬뽕", "White Jjamppong (not spicy)", "白炒码面(不辣)", "白チャンポン(辛くない)", "Mì hải sản nước trắng (không cay)"),
      it(170000, null, "삼선우동", "Samseon Udon (3 seafoods)", "三鲜乌冬面", "三鮮うどん(海鮮入り)", "Udon hải sản"),
    ],
  },
  {
    id: "half",
    name: T("반반 (짬짜면 · 탕짬면)", "Half & half", "双拼", "ハーフ&ハーフ", "Combo nửa nửa"),
    items: [
      it(160000, "jjamjja", "짬짜면", "Jjamjjamyeon (half jjamppong, half jjajang)", "炒码炸酱双拼面", "チャンチャ麺(チャンポン+チャジャン麺)", "Mì nửa cay nửa tương đen (Jjamjjamyeon)", { desc: T("짬뽕 + 짜장면", "Jjamppong + Jjajangmyeon", "炒码面 + 炸酱面", "チャンポン + チャジャン麺", "Mì hải sản cay + Mì tương đen") }),
      it(160000, "bokjjam", "볶짬면", "Bokjjammyeon (half fried rice, half jjamppong)", "炒饭炒码面双拼", "ポクチャム麺(チャーハン+チャンポン)", "Cơm rang + mì hải sản cay (Bokjjam)", { desc: T("볶음밥 + 짬뽕", "Fried rice + Jjamppong", "炒饭 + 炒码面", "チャーハン + チャンポン", "Cơm rang + Mì hải sản cay") }),
      it(160000, "bokjja", "볶짜면", "Bokjjamyeon (half fried rice, half jjajang)", "炒饭炸酱面双拼", "ポクチャ麺(チャーハン+チャジャン麺)", "Cơm rang + mì tương đen (Bokjja)", { desc: T("볶음밥 + 짜장면", "Fried rice + Jjajangmyeon", "炒饭 + 炸酱面", "チャーハン + チャジャン麺", "Cơm rang + Mì tương đen") }),
      it(180000, "tangjjam", "탕짬면", "Tangjjammyeon (Tangsuyuk + jjamppong)", "糖醋肉炒码面双拼", "タンチャム麺(タンスユク+チャンポン)", "Thịt chiên chua ngọt + mì hải sản cay (Tangjjam)", { desc: T("탕수육 + 짬뽕", "Tangsuyuk + Jjamppong", "糖醋肉 + 炒码面", "タンスユク + チャンポン", "Thịt heo chiên xốt chua ngọt + Mì hải sản cay") }),
      it(180000, "tangjja", "탕짜면", "Tangjjamyeon (Tangsuyuk + jjajangmyeon)", "糖醋肉炸酱面双拼", "タンチャ麺(タンスユク+チャジャン麺)", "Thịt chiên chua ngọt + mì tương đen (Tangjja)", { desc: T("탕수육 + 짜장면", "Tangsuyuk + Jjajangmyeon", "糖醋肉 + 炸酱面", "タンスユク + チャジャン麺", "Thịt heo chiên xốt chua ngọt + Mì tương đen") }),
      it(180000, "tangbok", "탕볶밥", "Tangbokbap (Tangsuyuk + fried rice)", "糖醋肉炒饭双拼", "タンボッパ(タンスユク+チャーハン)", "Thịt chiên chua ngọt + cơm rang (Tangbokbap)", { desc: T("탕수육 + 볶음밥", "Tangsuyuk + Fried rice", "糖醋肉 + 炒饭", "タンスユク + チャーハン", "Thịt heo chiên xốt chua ngọt + Cơm rang") }),
      it(200000, null, "탕볶짬", "Tangbokjjam (Tangsuyuk + fried rice + jjamppong)", "糖醋肉炒饭炒码面", "タンボクチャム(タンスユク+チャーハン+チャンポン)", "Thịt chiên chua ngọt + cơm rang + mì hải sản cay (Tangbokjjam)", { desc: T("탕수육 + 볶음밥 + 짬뽕", "Tangsuyuk + Fried rice + Jjamppong", "糖醋肉 + 炒饭 + 炒码面", "タンスユク + チャーハン + チャンポン", "Thịt heo chiên xốt chua ngọt + Cơm rang + Mì hải sản cay") }),
      it(200000, null, "탕볶짜", "Tangbokjja (Tangsuyuk + fried rice + jjajangmyeon)", "糖醋肉炒饭炸酱面", "タンボクチャ(タンスユク+チャーハン+チャジャン麺)", "Thịt chiên chua ngọt + cơm rang + mì tương đen (Tangbokjja)", { desc: T("탕수육 + 볶음밥 + 짜장면", "Tangsuyuk + Fried rice + Jjajangmyeon", "糖醋肉 + 炒饭 + 炸酱面", "タンスユク + チャーハン + チャジャン麺", "Thịt heo chiên xốt chua ngọt + Cơm rang + Mì tương đen") }),
    ],
  },
  {
    id: "noodle",
    name: T("냉면 · 국수", "Cold Noodles · Noodles", "冷面 · 面条", "冷麺 · 麺類", "Mì lạnh · Mì"),
    items: [
      it(120000, "naengudong", "냉우동", "Cold Udon", "冷乌冬面", "冷やしうどん", "Udon lạnh"),
      it(140000, "bibimguksu", "중화비빔국수", "Chinese-style Spicy Mixed Noodles", "中式辣拌面", "中華風ビビン麺(辛口)", "Mì trộn cay kiểu Hoa", { spicy: true }),
      it(120000, "real-naengmyeon", "물냉면", "Mul Naengmyeon (cold broth noodles)", "汤冷面", "ムルネンミョン(水冷麺)", "Mì lạnh nước (Mul naengmyeon)"),
      it(140000, null, "비빔냉면", "Bibim Naengmyeon (spicy cold noodles)", "辣拌冷面", "ビビン冷麺", "Mì lạnh trộn cay (Bibim naengmyeon)", { spicy: true }),
      it(120000, null, "콩국수", "Kongguksu (cold soy milk noodles)", "豆浆冷面", "コングクス(冷たい豆乳麺)", "Mì lạnh sữa đậu nành"),
    ],
  },
  {
    id: "rice",
    name: T("볶음밥 · 덮밥", "Fried Rice · Rice Bowls", "炒饭 · 盖饭", "チャーハン · 丼", "Cơm rang · Cơm phủ"),
    items: [
      it(120000, "bokkeumbap", "볶음밥", "Fried Rice", "炒饭", "チャーハン", "Cơm rang"),
      it(150000, "samseon-bokkeumbap", "삼선볶음밥", "Samseon Fried Rice (3 seafoods)", "三鲜炒饭", "三鮮チャーハン(海鮮入り)", "Cơm rang hải sản"),
      it(150000, "saeu-bokkeumbap", "새우볶음밥", "Shrimp Fried Rice", "虾仁炒饭", "エビチャーハン", "Cơm rang tôm"),
      it(120000, null, "김치볶음밥", "Kimchi Fried Rice", "泡菜炒饭", "キムチチャーハン", "Cơm rang kim chi"),
      it(120000, null, "짜장밥", "Jjajangbap (black bean sauce over rice)", "炸酱盖饭", "チャジャン丼", "Cơm sốt tương đen"),
      it(120000, null, "짬뽕밥", "Jjamppongbap (spicy seafood soup with rice)", "炒码汤饭", "チャンポンクッパ", "Cơm canh hải sản cay", { spicy: true }),
      it(170000, null, "삼선짬뽕밥", "Samseon Jjamppongbap (3 seafoods)", "三鲜炒码汤饭", "三鮮チャンポンクッパ", "Cơm canh hải sản cay 3 loại", { spicy: true }),
      it(170000, null, "차돌박이짬뽕밥", "Brisket Jjamppongbap", "牛腩炒码汤饭", "牛バラ肉チャンポンクッパ", "Cơm canh hải sản cay ba chỉ bò", { spicy: true }),
      it(140000, "mapa", "마파두부덮밥", "Mapo Tofu Rice Bowl", "麻婆豆腐盖饭", "マーボー豆腐丼", "Cơm đậu hũ Mapo", { spicy: true }),
      it(140000, "gochu", "고추덮밥", "Gochu Deopbap (pepper stir-fry over rice)", "青椒肉丝盖饭", "チンジャオロース丼", "Cơm thịt xào ớt chuông"),
      it(140000, "bibimbap", "중화비빔밥", "Chinese-style Bibimbap", "中式拌饭", "中華風ビビンバ", "Cơm trộn kiểu Hoa", { spicy: true }),
      it(140000, null, "잡채밥", "Japchaebap (japchae over rice)", "杂菜盖饭", "チャプチェ丼", "Cơm miến xào Japchae"),
      it(150000, null, "제육덮밥", "Jeyuk Deopbap (spicy pork over rice)", "辣炒猪肉盖饭", "豚肉辛味炒め丼", "Cơm thịt heo xào cay", { spicy: true }),
      it(150000, "songi", "송이덮밥", "Songi Mushroom Rice Bowl", "菌菇盖饭", "きのこ丼(ソンイ)", "Cơm nấm phủ (Songi)"),
      it(180000, "yusanseul", "유산슬밥", "Yusanseulbap (stir-fry over rice)", "溜三丝盖饭", "ユサンスル丼", "Cơm Yusanseul (hải sản, thịt xào xốt sệt)"),
      it(180000, "japtang", "잡탕밥", "Japtangbap (mixed seafood & meat over rice)", "杂烩盖饭", "五目あんかけ丼(チャプタン)", "Cơm thập cẩm xốt"),
    ],
  },
  {
    id: "stew",
    name: T("찌개 · 전골", "Stews · Hot Pots", "炖汤 · 火锅", "チゲ · 鍋", "Canh · Lẩu"),
    items: [
      it(150000, "sundubu", "순두부 김치찌개", "Soft Tofu Kimchi Stew", "嫩豆腐泡菜汤", "スンドゥブキムチチゲ", "Canh kim chi đậu hũ non", { spicy: true }),
      it(150000, "kimchi", "돼지 삼겹살 김치찌개", "Pork Belly Kimchi Stew", "五花肉泡菜汤", "豚バラキムチチゲ", "Canh kim chi ba chỉ heo", { spicy: true }),
      it(null, "budae", "부대찌개", "Budae-jjigae (army stew)", "部队锅", "プデチゲ", "Lẩu xúc xích", { spicy: true, sizes: [[SM, 350000], [MD, 450000], [LG, 550000]] }),
      it(null, "bullak", "불낙전골", "Bulnak Jeongol (beef & octopus hot pot)", "牛肉章鱼火锅", "プルナク鍋(牛肉とタコ)", "Lẩu bò bạch tuộc", { spicy: true, sizes: [[SM, 400000], [MD, 500000], [LG, 600000]] }),
    ],
  },
  {
    id: "drink",
    name: T("주류", "Alcohol", "酒类", "お酒", "Đồ uống có cồn"),
    items: [
      it(600000, null, "백년호도", "Baeknyeon Hodo (Chinese baijiu)", "百年糊涂(白酒)", "百年糊塗(中国白酒)", "Rượu Baeknyeon Hodo (bạch tửu Trung Quốc)"),
      it(300000, null, "설원 고량주", "Seolwon Gaoliang Liquor", "雪原高粱酒", "ソルウォン高粱酒", "Rượu cao lương Seolwon"),
      it(120000, null, "소주", "Soju", "烧酒", "焼酎(ソジュ)", "Rượu Soju"),
      it(100000, null, "보드카맨", "Vodka Men", "Vodka Men(伏特加)", "Vodka Men(ウォッカ)", "Vodka Men"),
    ],
  },
];
