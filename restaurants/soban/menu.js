// 소반 SOBAN 소꼬리 전문점 (215 Nguyễn Cao, Kinh Bắc, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// price: 가격(null이면 '가격 문의') / sizes: [[라벨, 가격], …] / unit / tag: "best"·"new"·"must" / spicy: true / desc / photo
// 원본: 구글 드라이브 "소반" 폴더의 구글 지도 캡처 6장 — 손님(damnstew)이 2개월 전 올린 벽 메뉴판(한국어·베트남어), 손님 음식 사진 3장(소꼬리 수육 모듬 2년 전·곰탕 8개월 전), 간판, 지도 정보.
// 메뉴판에 한국어·베트남어가 있어 그대로 쓰고 영어·중국어·일본어는 새로 옮김.
window.RESTAURANT = {
  brand: { ko: "소반", en: "SOBAN", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0766 478 077",
  address: "215 Nguyễn Cao, Kinh Bắc, Bắc Ninh",
  mapQuery: "소반 Soban Bắc Ninh",
  wifi: null, // 예: { ssid: "SOBAN", password: "12345678" }
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

window.MENU = [
  {
    id: "oxtail",
    name: T("소꼬리 수육", "Boiled oxtail", "牛尾白切", "牛テールの茹で肉", "Đuôi bò hầm"),
    note: T("소꼬리 요리를 드신 뒤 남은 육수에 칼국수 사리를 넣어 드시는 분이 많아요.", "Many guests add kalguksu noodles to the leftover broth after the oxtail.", "吃完牛尾后，很多客人会把刀削面加进剩下的汤里。", "牛テールを食べた後、残ったスープにカルグクスを足して食べる方が多いです。", "Nhiều khách ăn xong đuôi bò sẽ cho thêm mì kalguksu vào nước dùng còn lại."),
    items: [
      it(null, "suyuk", "소꼬리 수육 모듬", "Assorted boiled oxtail (suyuk)", "牛尾白切拼盘（수육）", "牛テールの茹で肉盛り合わせ（スユク）", "Các món đuôi bò hầm", { tag: "must", sizes: [[T("소", "Small", "小份", "小", "Nhỏ"), 750000], [T("대", "Large", "大份", "大", "Lớn"), 1100000]] }),
      it(330000, null, "수육 추가", "Extra boiled oxtail", "加点牛尾肉", "スユク追加", "Thêm thịt hầm"),
    ],
  },
  {
    id: "soup",
    name: T("식사류", "Soups & meals", "汤饭", "お食事", "Món chính"),
    items: [
      it(195000, "gomtang", "꼬리곰탕", "Oxtail soup (kkori-gomtang)", "牛尾汤（꼬리곰탕）", "テールコムタン（牛テールスープ）", "Canh đuôi bò"),
      it(195000, null, "도가니탕", "Beef knee cartilage soup (doganitang)", "牛膝软骨汤（도가니탕）", "牛膝軟骨のスープ（トガニタン）", "Canh gân bò"),
      it(185000, null, "소머리국", "Beef head soup (somori-guk)", "牛头汤（소머리국）", "牛頭スープ（ソモリクク）", "Canh đầu bò"),
      it(185000, null, "설렁탕", "Seolleongtang (beef bone soup)", "雪浓汤（설렁탕）", "ソルロンタン（牛骨スープ）", "Súp nạc bò"),
    ],
  },
  {
    id: "side",
    name: T("사리 · 밥", "Noodles & rice", "加面 · 米饭", "追加麺・ご飯", "Món phụ"),
    items: [
      it(55000, null, "칼국수", "Kalguksu noodles", "刀削面（칼국수）", "カルグクス", "Mỳ gạo"),
      it(45000, null, "소면", "Somyeon thin noodles", "细面（소면）", "ソミョン（細麺）", "Mỳ sợi"),
      it(20000, null, "공기밥", "Steamed rice", "米饭", "ご飯", "Cơm trắng"),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Drinks", "酒水 · 饮料", "お酒・ドリンク", "Đồ uống"),
    items: [
      it(130000, null, "소주", "Soju", "烧酒", "ソジュ（焼酎）", "Rượu soju"),
      it(110000, null, "보드카", "Vodka", "伏特加", "ウォッカ", "Vodka"),
      it(160000, null, "막걸리", "Makgeolli", "马格利酒", "マッコリ", "Rượu gạo"),
      it(55000, null, "맥주", "Beer", "啤酒", "ビール", "Bia"),
      it(20000, null, "음료", "Soft drink", "饮料", "ソフトドリンク", "Nước ngọt"),
    ],
  },
];
