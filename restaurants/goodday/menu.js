// 굿데이 김밥 Good Day Kimbap (Sunshine City · Ciputra, Hà Nội) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용) 메뉴판 — 사장님 동의·비용 없이 만듦. 장바구니·Zalo 주문 없음 (파트너 배너는 있음).
// 원본: 구글 드라이브 "굿데이 김밥" 폴더의 구글 지도 캡처 12장. 메뉴는 가게 계정이 3개월 전에 올린 메뉴판 한 장(9개) 기준.
// 한국어·영어·베트남어는 메뉴판 표기, 중국어·일본어는 새로 번역. 음료 메뉴는 사진이 없어 넣지 않음.
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// it(가격, 한국어, 영어, 중국어, 일본어, 베트남어, 추가 설정) — 추가 설정: { spicy, tag: "best", desc }
window.RESTAURANT = {
  brand: { ko: "굿데이 김밥", en: "Good Day Kimbap", branch: "Sunshine City" },
  phone: "0868 484 530",
  address: "Sunshine City, 12 P Khu đô thị Ciputra, Phú Thượng, Hà Nội",
  mapQuery: "Good day kimbap",
  wifi: null,
};

const it = (price, ko, en, zh, ja, vi, x = {}) => ({ price, name: { ko, en, zh, ja, vi }, ...x });
const HOT = { spicy: true };

window.MENU = [
  {
    id: "kimbap",
    photo: "img/kimbap.jpg",
    name: { ko: "김밥", en: "Kimbap", zh: "紫菜包饭", ja: "キンパ", vi: "Kimbap" },
    items: [
      it(70000, "굿데이 김밥", "Good Day Kimbap", "Good Day 招牌紫菜包饭", "グッデイキンパ", "Kimbap truyền thống", { tag: "best" }),
      it(80000, "진미 김밥", "Squid Kimbap", "鱿鱼丝紫菜包饭", "さきイカキンパ", "Kimbap mực khô"),
      it(80000, "멸치 김밥", "Anchovy Kimbap", "小鳀鱼紫菜包饭", "じゃこキンパ", "Kimbap cá cơm"),
      it(90000, "불어묵 김밥", "Spicy Fish Cake Kimbap", "辣鱼饼紫菜包饭", "激辛さつま揚げキンパ", "Kimbap chả cá cay",
        { spicy: true, desc: { ko: "매운맛 🌶🌶🌶", en: "Very spicy 🌶🌶🌶", zh: "特辣 🌶🌶🌶", ja: "激辛 🌶🌶🌶", vi: "Rất cay 🌶🌶🌶" } }),
    ],
  },
  {
    id: "snack",
    photo: "img/snack.jpg",
    name: { ko: "떡볶이 · 튀김 · 라면", en: "Tteokbokki, Fries & Ramen", zh: "炒年糕 · 炸物 · 拉面", ja: "トッポッキ・揚げ物・ラーメン", vi: "Tokbokki · Đồ chiên · Mì" },
    items: [
      it(100000, "떡볶이", "Tokbokki (Spicy Rice Cake)", "辣炒年糕", "トッポッキ", "Tokbokki (bánh gạo cay)", { spicy: true, tag: "best" }),
      it(100000, "모듬튀김", "Korean Fried Platter", "韩式炸物拼盘", "韓国揚げ物盛り合わせ（ティギム）", "Món chiên tổng hợp"),
      it(80000, "라면", "Ramen (Korean Style)", "韩式拉面", "韓国ラーメン", "Mì ramen Hàn Quốc", HOT),
    ],
  },
  {
    id: "noodle",
    photo: "img/noodle.jpg",
    name: { ko: "쫄면", en: "Jjolmyeon", zh: "筋道冷面", ja: "チョルミョン", vi: "Mì trộn cay" },
    note: { ko: "양이 푸짐하고 매콤새콤한 쫄면이 인기예요",
      en: "Popular for big portions and a sweet, tangy, spicy sauce",
      zh: "分量足、酸甜微辣，深受欢迎",
      ja: "ボリュームたっぷり、甘酸っぱくピリ辛で人気です",
      vi: "Món được yêu thích: phần ăn lớn, vị chua ngọt cay" },
    items: [
      it(180000, "쫄면", "Jjolmyeon (Spicy Chewy Noodles)", "辣拌筋道面", "チョルミョン（ピリ辛和え麺）", "Mì trộn cay Hàn Quốc", { spicy: true, tag: "best" }),
      it(190000, "냉쫄면", "Cold Jjolmyeon (Cold Spicy Noodles)", "冰镇辣拌筋道面", "冷やしチョルミョン", "Mì trộn lạnh cay", HOT),
    ],
  },
];
