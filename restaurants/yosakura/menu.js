// 규카츠 요사쿠라 메뉴 — 출처: 구글 지도 메뉴판 사진(입간판·주문 화면, 2026-11-27). 가격 VND
// 와규 장어 세트(set wagyu unagi)는 가격을 읽지 못해 뺐다.
window.RESTAURANT = {
  brand: { ko: "요사쿠라", en: "GYUKATSU YOSAKURA" },
  phone: "0866500293",
  address: "146 P. Phan Kế Bính, Ngọc Hà, Hà Nội",
  wifi: null,
  hours: "10:30 – 14:30 / 17:00 – 22:00",
};

const N = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });

window.MENU = [
  {
    id: "gyukatsu",
    name: N("규카츠 정식", "Gyukatsu Sets", "炸牛排套餐", "牛カツ定食", "Set bò chiên xù Gyukatsu"),
    tip: N("테이블 위 돌판에 원하는 만큼 구워 소금 → 간 무 폰즈 → 오리지널 소스 순서로 드세요.", "Grill it on the table stone to your liking: salt first, then grated-radish ponzu, then the original sauce.", "在桌上石板按喜好烤熟，依次蘸盐、萝卜泥柚子醋、特制酱汁。", "卓上の焼き石でお好みの焼き加減に。塩、おろしポン酢、オリジナルソースの順がおすすめ。", "Tự nướng trên đá nóng theo ý thích, chấm muối, rồi ponzu củ cải, cuối cùng là sốt đặc biệt."),
    items: [
      { name: N("요사쿠라 규카츠", "Yosakura Gyukatsu", "世桜炸牛排套餐", "世桜牛カツ", "Set bò Gyukatsu Yosakura"), desc: N("대표 규카츠 정식", "Signature beef cutlet set", "招牌炸牛排套餐", "看板の牛カツ定食", "Set bò chiên xù đặc trưng"), price: 300000, tag: "must", photo: "img/yosakura-gyukatsu.jpg" },
      { name: N("와규 규카츠", "Wagyu Gyukatsu", "和牛炸牛排套餐", "和牛牛カツ", "Set bò Wagyu chiên xù"), price: 720000, tag: "best" },
      { name: N("요사쿠라 규카츠 연어알 극상 밥 정식", "Yosakura Gyukatsu · Premium Salmon Roe Rice Set", "世桜炸牛排 · 鲑鱼子极上饭套餐", "世桜牛カツ いくら極ご飯定食", "Gyukatsu Yosakura cơm trứng cá hồi thượng hạng"), price: 480000, photo: "img/ikura-set.jpg" },
      { name: N("요사쿠라 규카츠 장어 밥 정식", "Yosakura Gyukatsu · Unagi Rice Set", "世桜炸牛排 · 鳗鱼饭套餐", "世桜牛カツ うなぎご飯定食", "Gyukatsu Yosakura cơm lươn"), price: 460000 },
      { name: N("프리미엄 연어알 와규 규카츠 정식", "Premium Salmon Roe Wagyu Gyukatsu Set", "顶级鲑鱼子和牛炸牛排套餐", "プレミアムいくら和牛牛カツ定食", "Set Wagyu Gyukatsu trứng cá hồi thượng hạng"), price: 900000, tag: "special", photo: "img/premium-ikura.jpg" },
    ],
  },
  {
    id: "unagi",
    name: N("장어 히츠마부시", "Unagi Hitsumabushi", "鳗鱼三吃", "鰻ひつまぶし", "Lươn Nhật nướng Hitsumabushi"),
    items: [
      { name: N("장어 히츠마부시 특상 (1마리)", "Unagi Hitsumabushi Premium (whole eel)", "鳗鱼三吃 特上（1条）", "鰻ひつまぶし 特上（1尾）", "Lươn Nhật nướng Hitsumabushi Premium (1 con)"), price: 650000, tag: "best", photo: "img/hitsumabushi.jpg" },
      { name: N("장어 히츠마부시 보통 (1/2마리)", "Unagi Hitsumabushi Regular (half eel)", "鳗鱼三吃 普通（半条）", "鰻ひつまぶし 並（1/2尾）", "Lươn Nhật nướng Hitsumabushi Regular (1/2 con)"), price: 420000 },
    ],
  },
];
