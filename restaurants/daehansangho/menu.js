// 대한상회 고깃집 (Daehan Sanghoe) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(menu_01~05, 2026-11-11 수집, 가게 계정 업로드). 메뉴판에 '코리아타운 1층 DECEMBER (구. 대한상회)' 표기가 있음
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "대한상회 고깃집", en: "Daehan Sanghoe" },
  phone: "0372324880",
  address: "Korea Town, Phố Nguyên Hồng Ngọc Hân Công Chúa, Võ Cường, Bắc Ninh",
  wifi: null,
  hours: {
    ko: "10:30 – 14:00 / 16:00 – 21:30",
    en: "10:30 – 14:00 / 16:00 – 21:30",
    zh: "10:30 – 14:00 / 16:00 – 21:30",
    ja: "10:30 – 14:00 / 16:00 – 21:30",
    vi: "10:30 – 14:00 / 16:00 – 21:30",
  },
};

window.MENU = [
  {
    id: "grill",
    name: { ko: "돼지고기 구이", en: "Pork BBQ", zh: "烤猪肉", ja: "豚肉焼き", vi: "Thịt heo nướng" },
    note: {
      ko: "1인분 150g · 파격 할인가",
      en: "150 g per serving · special discount price",
      zh: "每份150克 · 特惠价",
      ja: "1人前150g · 特別割引価格",
      vi: "1 suất 150g · giá ưu đãi đặc biệt",
    },
    items: [
      { name: { ko: "삼겹살", en: "Pork Belly (Samgyeopsal)", zh: "五花肉", ja: "サムギョプサル(豚バラ)", vi: "Ba chỉ heo" }, price: 120000, tag: "best", photo: "img/grill.jpg" },
      { name: { ko: "목살", en: "Pork Neck (Moksal)", zh: "猪颈肉", ja: "モクサル(豚肩ロース)", vi: "Thịt cổ heo" }, price: 120000, photo: "img/samgyeopsal.jpg" },
      { name: { ko: "냉동삼겹살 (냉삼)", en: "Frozen Pork Belly (Naengsam)", zh: "冷冻五花肉", ja: "冷凍サムギョプサル(ネンサム)", vi: "Ba chỉ heo đông lạnh" }, price: 120000, photo: "img/moksal.jpg" },
      { name: { ko: "대패삼겹살 (대패)", en: "Thin-sliced Pork Belly (Daepae)", zh: "薄切五花肉", ja: "薄切りサムギョプサル(テペ)", vi: "Ba chỉ heo thái mỏng" }, price: 120000 },
    ],
  },
  {
    id: "set",
    name: { ko: "세트 메뉴", en: "Set Menu", zh: "套餐", ja: "セットメニュー", vi: "Set menu" },
    items: [
      {
        name: { ko: "3~4인 돼지한판 (600g)", en: "Pork Platter for 3–4 (600 g)", zh: "3~4人猪肉拼盘(600克)", ja: "3〜4人前 豚肉盛り合わせ(600g)", vi: "Set thịt heo cho 3–4 người (600g)" },
        desc: {
          ko: "삼겹살·목살·냉삼·대패 중 2가지 + 항정살·갈매기살 중 2가지 / 찌개 2개 + 계란찜 + 공깃밥 + 기본반찬",
          en: "2 of pork belly / neck / frozen belly / thin-sliced + 2 of pork jowl / skirt meat. Includes 2 stews, steamed egg, rice and side dishes",
          zh: "五花肉/猪颈肉/冷冻五花/薄切五花任选2种 + 猪项肉/横膈膜任选2种。含2份汤锅、蒸蛋、米饭、小菜",
          ja: "サムギョプサル・モクサル・ネンサム・テペから2種 + カンジョンサル・カルメギサルから2種。チゲ2品、卵蒸し、ご飯、おかず付き",
          vi: "Chọn 2 loại: ba chỉ / thịt cổ / ba chỉ đông lạnh / ba chỉ thái mỏng + chọn 2 loại: thịt nọng / thịt cơ hoành. Kèm 2 món canh/lẩu, trứng hấp, cơm và món ăn kèm",
        },
        price: 590000,
        tag: "special",
        photo: "img/hanpan.jpg",
      },
    ],
  },
  {
    id: "lunch",
    name: { ko: "점심 특선", en: "Lunch Special", zh: "午餐特选", ja: "ランチスペシャル", vi: "Set trưa đặc biệt" },
    items: [
      { name: { ko: "소고기 장터국밥", en: "Beef Market Soup with Rice (Jangteo Gukbap)", zh: "牛肉汤饭(Jangteo Gukbap)", ja: "牛肉クッパ(ジャンターグッパ)", vi: "Canh cơm thịt bò kiểu chợ" }, price: 100000 },
      { name: { ko: "제육덮밥", en: "Spicy Stir-fried Pork Rice Bowl", zh: "辣炒猪肉盖饭", ja: "豚肉の辛炒め丼(チェユクトッパプ)", vi: "Cơm thịt heo xào cay" }, price: 100000, spicy: true },
      { name: { ko: "장칼국수", en: "Knife-cut Noodles in Spicy Paste Broth (Jang Kalguksu)", zh: "辣酱手擀刀切面(Jang Kalguksu)", ja: "ジャンカルグクス(辛味噌のカルグクス)", vi: "Mì cắt tay nước dùng tương cay" }, price: 100000, spicy: true },
      { name: { ko: "김치찌개", en: "Kimchi Stew", zh: "泡菜汤", ja: "キムチチゲ", vi: "Canh kim chi" }, price: 100000, spicy: true },
      { name: { ko: "된장찌개", en: "Soybean Paste Stew", zh: "大酱汤", ja: "テンジャンチゲ", vi: "Canh tương đậu Hàn" }, price: 100000 },
      { name: { ko: "미역국밥", en: "Seaweed Soup with Rice", zh: "海带汤饭", ja: "わかめスープクッパ", vi: "Canh rong biển với cơm" }, price: 100000 },
      { name: { ko: "콩국수", en: "Cold Soybean Noodle Soup (Kongguksu)", zh: "冷豆浆面", ja: "コングクス(冷たい豆乳麺)", vi: "Mì lạnh sữa đậu nành" }, price: 100000 },
      { name: { ko: "김치말이국수", en: "Cold Kimchi Noodle Soup", zh: "泡菜冷汤面", ja: "冷やしキムチ麺(キムチマリグクス)", vi: "Mì lạnh nước kim chi" }, price: 100000 },
      { name: { ko: "라면+공기밥", en: "Ramyeon + Rice", zh: "拉面+米饭", ja: "ラーメン+ご飯", vi: "Mì ramyeon + cơm" }, price: 100000 },
    ],
  },
  {
    id: "soju",
    name: { ko: "소주 행사", en: "Soju Promotion", zh: "烧酒促销", ja: "焼酎キャンペーン", vi: "Khuyến mãi soju" },
    note: {
      ko: "9월 16일 ~ 11월 30일 행사가",
      en: "Promotion price: Sep 16 – Nov 30",
      zh: "促销价:9月16日~11月30日",
      ja: "キャンペーン価格:9月16日〜11月30日",
      vi: "Giá khuyến mãi: 16/9 – 30/11",
    },
    items: [
      { name: { ko: "소주 전품목 (참이슬·진로·처음처럼·새로)", en: "All Soju (Chamisul · Jinro · Chum Churum · Saero)", zh: "全部烧酒(Chamisul·Jinro·Chum Churum·Saero)", ja: "焼酎全品(チャミスル・ジンロ・チョウムチョロム・セロ)", vi: "Tất cả soju (Chamisul · Jinro · Chum Churum · Saero)" }, price: 90000 },
    ],
  },
];
