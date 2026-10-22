// 금돼지 Gold Pig (간판 NHÀ HÀNG GOLD PIG 금돼지 · Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "금돼지" 폴더의 구글 지도 캡처 23장(손님이 2년 전·3년 전 올린 메뉴판 사진 — 메뉴 한 쪽에 메뉴 1~2개, 가게 앞 사진, 지도 정보, 손님 음식 사진).
// 메뉴판에 한국어·베트남어(일부 중국어)가 있어 한·베는 메뉴판 표기를 따르고, 영·중·일은 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "금돼지", en: "Gold Pig", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0854 447 000",
  address: "Võ Cường - 11, Võ Cường, Bắc Ninh",
  mapQuery: "금돼지 식당 Nhà hàng Gold Pig Võ Cường Bắc Ninh",
  wifi: null, // 예: { ssid: "GOLDPIG", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const SM = T("소", "S", "小", "小", "Nhỏ");
const LG = T("대", "L", "大", "大", "Lớn");
const P2 = T("2인분", "2 people", "2人份", "2人前", "2 người");
const P4 = T("4인분", "4 people", "4人份", "4人前", "4 người");

window.MENU = [
  {
    id: "pork",
    name: T("삼겹살 · 돼지고기 구이", "Pork BBQ", "烤猪肉", "豚肉焼き", "Thịt heo nướng"),
    items: [
      it(220000, "saengsam", "생삼겹살", "Fresh pork belly (saeng-samgyeopsal)", "烤鲜五花肉", "生サムギョプサル", "Thịt ba chỉ tươi", { tag: "must" }),
      it(220000, "naengdong", "냉동삼겹살", "Frozen pork belly", "冷冻五花肉", "冷凍サムギョプサル", "Thịt ba chỉ đông lạnh"),
      it(220000, "daepae", "대패삼겹살", "Thin-sliced pork belly (daepae)", "薄切五花肉", "薄切りサムギョプサル（テペ）", "Thịt ba chỉ bào mỏng"),
      it(230000, "hangjeong", "항정살", "Pork jowl (hangjeongsal)", "猪颊肉", "豚トロ（ハンジョンサル）", "Thịt má"),
      it(230000, "galmaegi", "갈매기살", "Pork skirt meat (galmaegisal)", "猪横膈膜肉", "豚ハラミ（カルメギサル）", "Thịt dải"),
    ],
  },
  {
    id: "dish",
    name: T("찜 · 볶음 · 안주", "Braised, stir-fried & bar dishes", "炖菜 · 炒菜 · 下酒菜", "蒸し煮・炒め物・おつまみ", "Món hầm · xào · nhắm"),
    items: [
      it(600000, "galbijjim", "매운양념 갈비찜", "Spicy braised pork ribs", "香辣炖猪排骨", "辛い味付け豚カルビチム", "Sườn heo sốt cay", { spicy: true }),
      it(600000, "kimchijjim", "김치찜", "Braised pork ribs with kimchi (kimchi-jjim)", "泡菜炖猪排骨", "豚スペアリブのキムチ蒸し煮", "Lẩu kim chi sườn heo"),
      it(500000, "jeyuk", "제육볶음", "Spicy stir-fried pork (jeyuk-bokkeum)", "韩式辣炒猪肉", "豚の辛炒め（チェユクポックム）", "Thịt lợn xào cay", { spicy: true }),
      it(null, "pabulgogi", "돼지특수부위 파불고기", "Pork special-cut bulgogi with scallions", "葱丝烤猪肉（特殊部位）", "ネギ豚プルコギ（特殊部位）", "Bulgogi thịt lợn xào hành", { sizes: [[SM, 400000], [LG, 600000]] }),
      it(500000, "gopchang", "왕십리 양념 돼지곱창", "Wangsimni-style spicy stir-fried pork intestine", "往十里辣味炒猪小肠", "往十里式 豚コプチャン炒め（辛口）", "Lòng lợn xào cay", { spicy: true }),
      it(500000, "golbaengi", "골뱅이 무침", "Spicy sea snail salad (golbaengi-muchim)", "辣拌海螺", "ツブ貝の和え物", "Ốc trộn", { spicy: true }),
      it(null, "gopchangjeongol", "곱창전골", "Offal hot pot (gopchang jeongol)", "内脏火锅", "ホルモン鍋（コプチャンチョンゴル）", "Lẩu lòng", { sizes: [[P2, 500000], [P4, 800000]] }),
      it(120000, "mandu", "비빔만두", "Fried dumplings with spicy mixed topping (bibim-mandu)", "拌煎饺", "ビビンマンドゥ（辛い和え餃子）", "Há cảo trộn", { spicy: true }),
      it(1000000, "eel", "장어", "Grilled eel", "烤鳗鱼", "うなぎ焼き", "Cá chình", { unit: T("1.5kg", "1.5 kg", "1.5公斤", "1.5kg", "1.5kg") }),
    ],
  },
  {
    id: "stew",
    name: T("찌개", "Stews", "汤", "チゲ", "Canh"),
    items: [
      it(200000, "kimchijjigae", "김치찌개", "Pork kimchi stew", "猪肉泡菜汤", "豚キムチチゲ", "Canh kim chi thịt lợn", { tag: "must" }),
      it(150000, "doenjang", "된장찌개", "Soybean paste stew", "韩式大酱汤", "テンジャンチゲ", "Canh đậu tương"),
    ],
  },
  {
    id: "noodle",
    name: T("면", "Noodles", "面", "麺", "Mì"),
    items: [
      it(120000, "bibimguksu", "비빔국수", "Spicy mixed noodles (bibim-guksu)", "韩式拌面", "ビビングクス", "Mỳ trộn sợi nhỏ", { spicy: true }),
      it(150000, "mulhoe", "오징어 물회국수", "Squid mulhoe noodles (cold spicy broth)", "鱿鱼冷汤拌面", "イカのムルフェ麺", "Mì hải sản"),
      it(120000, "naengjanchi", "냉잔치국수", "Cold banquet noodles (naeng-janchi-guksu)", "韩式冷汤面", "冷たいそうめん（ネンチャンチグクス）", "Mỳ lạnh"),
      it(120000, "jjolmyeon", "쫄면", "Jjolmyeon (spicy chewy noodles)", "辣拌筋面", "チョルミョン（辛い和え麺）", "Mỳ trộn sợi vàng", { spicy: true }),
      it(120000, "janchi", "잔치국수", "Warm banquet noodles (janchi-guksu)", "韩式热汤面", "温かいそうめん（チャンチグクス）", "Mỳ nóng"),
    ],
  },
  {
    id: "rice",
    name: T("밥", "Rice", "饭", "ご飯", "Cơm"),
    items: [
      it(50000, "bokkeumbap", "볶음밥", "Fried rice", "炒饭", "チャーハン", "Cơm rang"),
    ],
  },
];
