// 하루 HARU 御厨 Omakase 박닌점 (Nhà Hàng HaRu Korea · 26N5 Đường Võ Cường 4, Võ Cường, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격 / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "하루 박닌점" 폴더의 구글 지도 캡처 13장(가게 계정이 4개월 전 올린 메뉴판 3면 + 주류 1면, 음식·간판 사진, 지도 정보).
// 메뉴판에 한국어·베트남어·중국어가 있어 그대로 쓰고, 영어·일본어만 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "하루", en: "HARU", branch: { ko: "박닌점", en: "Bắc Ninh" } },
  phone: "0832 683 153",
  address: "26N5 Đường Võ Cường 4, Phường Võ Cường, Bắc Ninh",
  mapQuery: "HARU Nhà Hàng HaRu Korea 26N5 Đường Võ Cường 4 Bắc Ninh",
  wifi: null, // 예: { ssid: "HARU", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const P = (n, a) => T(`${n}${a[0]}`, `${n} ${a[1]}`, `${n}${a[2]}`, `${n}${a[3]}`, `${n} ${a[4]}`);
const PCS = (n) => P(n, ["조각", "pcs", "片", "切れ", "miếng"]);
const SKEWER = (n) => P(n, ["꼬치", "skewers", "串", "本", "xiên"]);
const ML = (n) => T(`${n}ml`, `${n}ml`, `${n}ml`, `${n}ml`, `${n}ml`);

window.MENU = [
  {
    id: "sashimi",
    name: T("사시미 · 초밥", "Sashimi & sushi", "刺身 · 寿司", "刺身・寿司", "Sashimi · Sushi"),
    items: [
      it(300000, "tataki", "참치타다끼", "Seared tuna tataki", "炙烧金枪鱼", "まぐろのたたき", "Cá ngừ tataki áp chảo tái"),
      it(200000, "salmonsashimi", "연어 사시미", "Salmon sashimi", "三文鱼刺身", "サーモン刺身", "Sashimi cá hồi", { unit: PCS(8) }),
      it(200000, "tunasashimi", "참치회", "Tuna sashimi", "金枪鱼刺身", "まぐろ刺身", "Sashimi cá ngừ", { unit: PCS(6) }),
      it(200000, "sushi", "초밥", "Sushi", "寿司", "寿司", "Sushi", { unit: T("8개", "8 pcs", "8件", "8貫", "8 miếng") }),
    ],
  },
  {
    id: "grill",
    name: T("구이 · 꼬치", "Grilled dishes & skewers", "烧烤 · 串烧", "焼き物・串", "Món nướng · Xiên"),
    items: [
      it(250000, "kushi", "모듬 꼬치구이", "Assorted grilled skewers", "综合烤串", "串焼き盛り合わせ", "Xiên nướng tổng hợp"),
      it(150000, "tsukune", "츠쿠네 (고기완자)", "Tsukune (grilled meatball)", "日式肉丸", "つくね（肉団子）", "Thịt viên nướng kiểu Nhật"),
      it(100000, "tomato", "토마토 베이컨말이", "Bacon-wrapped tomato", "培根番茄卷", "トマトのベーコン巻き", "Cà chua cuộn bacon", { unit: SKEWER(4) }),
      it(200000, "saba", "고등어구이", "Grilled mackerel", "烤青花鱼", "さばの塩焼き", "Cá thu nướng"),
      it(200000, "mentaiyaki", "명란 버터구이", "Butter-grilled pollock roe", "黄油烤明太子", "明太子のバター焼き", "Trứng cá minh thái nướng bơ"),
      it(300000, "awabi", "전복 버터구이", "Butter-grilled abalone", "黄油烤鲍鱼", "あわびのバター焼き", "Bào ngư nướng bơ"),
      it(300000, "kairi", "가리비 새우 버터찜", "Butter-steamed scallops & shrimp", "黄油蒸扇贝虾", "ホタテと海老のバター蒸し", "Sò điệp & tôm hấp bơ"),
    ],
  },
  {
    id: "fry",
    name: T("튀김 · 계란말이", "Fried dishes & rolled omelets", "炸物 · 玉子烧", "揚げ物・だし巻き", "Món chiên · Trứng cuộn"),
    items: [
      it(150000, "karaage", "토리 가라아게 (닭튀김)", "Chicken karaage", "唐扬炸鸡", "鶏の唐揚げ", "Gà karaage chiên giòn"),
      it(150000, "croquette", "치즈 감자 고로케", "Cheese potato croquettes", "芝士土豆可乐饼", "チーズポテトコロッケ", "Bánh khoai tây phô mai chiên"),
      it(130000, "agedashi", "아게다시도후 (두부튀김)", "Agedashi tofu", "炸豆腐", "揚げ出し豆腐", "Đậu phụ chiên sốt dashi"),
      it(200000, "bocuon", "차돌 숙주 볶음 계란말이", "Beef brisket & bean sprout stir-fry with rolled omelet", "豆芽炒肥牛配玉子烧", "牛バラともやし炒めとだし巻き玉子", "Bò cuộn giá xào & trứng cuộn"),
      it(170000, "cheeseegg", "치즈 계란말이", "Cheese rolled omelet", "芝士玉子烧", "チーズだし巻き玉子", "Trứng cuộn phô mai"),
    ],
  },
  {
    id: "hot",
    name: T("탕 · 면 · 찜", "Soups, noodles & steamed dishes", "汤 · 面 · 蒸菜", "鍋・麺・蒸し物", "Lẩu · Mì · Món hấp"),
    items: [
      it(250000, "oden", "오뎅탕", "Fish cake soup (oden)", "鱼饼汤", "おでん鍋", "Canh chả cá Hàn Quốc"),
      it(250000, "champon", "나가사키 짬뽕", "Nagasaki seafood noodle soup", "长崎海鲜汤面", "長崎ちゃんぽん", "Mì hải sản Nagasaki"),
      it(150000, "yakisoba", "야끼소바 (볶음면)", "Yakisoba (stir-fried noodles)", "日式炒面", "焼きそば", "Mì xào Yakisoba"),
      it(150000, "asari", "조개술찜", "Clams steamed in sake", "清酒蒸贝类", "貝の酒蒸し", "Nghêu hấp rượu"),
      it(150000, "chickencream", "치킨 크림 (삼계탕)", "Chicken in cream sauce (samgyetang style)", "奶油参鸡汤", "クリーム参鶏湯", "Gà sốt kem kiểu sâm gà"),
    ],
  },
  {
    id: "salad",
    name: T("샐러드 · 두부", "Salads & tofu", "沙拉 · 豆腐", "サラダ・豆腐", "Salad · Đậu hũ"),
    items: [
      it(200000, "salmonsalad", "연어 샐러드", "Salmon salad", "三文鱼沙拉", "サーモンサラダ", "Salad cá hồi"),
      it(130000, "baconsalad", "베이컨 감자 샐러드", "Bacon potato salad", "培根土豆沙拉", "ベーコンポテトサラダ", "Salad khoai tây bacon"),
      it(200000, "tofumentai", "두부 튀김 명란 샐러드", "Fried tofu & pollock roe salad", "明太子豆腐沙拉", "揚げ豆腐と明太子のサラダ", "Salad trứng cá minh thái với đậu phụ chiên"),
      it(130000, "mochidofu", "모찌리도후 (쫀득한 일본 두부)", "Mochiri tofu (chewy Japanese tofu)", "日式麻薯豆腐", "もちり豆腐（もちもち食感）", "Đậu hũ mochi Nhật dẻo"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒类 · 饮料", "お酒・ドリンク", "Rượu · Đồ uống"),
    items: [
      it(130000, null, "참이슬", "Chamisul soju", "真露烧酒", "チャミスル（焼酎）", "Soju Chamisul"),
      it(130000, null, "처음처럼", "Chum Churum soju", "初饮初乐烧酒", "チョウムチョロム（焼酎）", "Soju Chum Churum"),
      it(130000, null, "진로", "Jinro soju", "真露烧酒", "ジンロ（焼酎）", "Soju Jinro"),
      it(130000, null, "새로", "Saero soju", "새로烧酒", "セロ（焼酎）", "Soju Saero"),
      it(50000, null, "타이거", "Tiger beer", "虎牌啤酒", "タイガービール", "Bia Tiger"),
      it(50000, null, "사이공", "Saigon beer", "西贡啤酒", "サイゴンビール", "Bia Sài Gòn"),
      it(80000, null, "삿포로 생맥주", "Sapporo draft beer", "札幌生啤", "サッポロ生ビール", "Bia tươi Sapporo"),
      it(100000, null, "보드카", "Vodka", "伏特加", "ウォッカ", "Vodka"),
      it(80000, null, "블루 레몬 하이볼", "Blue lemon highball", "蓝柠檬嗨棒", "ブルーレモンハイボール", "Highball chanh xanh"),
      it(80000, null, "오렌지 레몬 하이볼", "Orange lemon highball", "橙子柠檬嗨棒", "オレンジレモンハイボール", "Highball cam chanh"),
      it(20000, null, "콜라", "Coca-Cola", "可乐", "コーラ", "Coca Cola"),
      it(20000, null, "사이다", "Sprite", "雪碧", "スプライト", "Sprite / soda chanh"),
    ],
  },
  {
    id: "sake",
    name: T("사케", "Sake", "清酒", "日本酒", "Sake"),
    items: [
      it(60000, null, "도쿠리", "Tokkuri (sake flask)", "清酒壶", "徳利", "Bình sake Tokkuri", { unit: ML(200) }),
      it(650000, null, "사와노츠루 디럭스 준마이", "Sawanotsuru Deluxe Junmai", "泽之鹤纯米清酒", "沢の鶴 デラックス純米", "Sawanotsuru Deluxe Junmai"),
      it(1600000, null, "쿠보타 준마이 다이긴죠", "Kubota Junmai Daiginjo", "久保田纯米大吟酿", "久保田 純米大吟醸", "Kubota Junmai Daiginjo", { unit: ML(720) }),
      it(3200000, null, "호린 준마이 다이긴죠", "Hourin Junmai Daiginjo", "凤麟纯米大吟酿", "鳳麟 純米大吟醸", "Hourin Junmai Daiginjo", { unit: ML(720) }),
    ],
  },
];
