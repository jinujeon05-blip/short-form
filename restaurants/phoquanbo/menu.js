// 퍼 꾸언 보 Phở quân bò (56 P. Lương Ngọc Quyến, Kinh Bắc, Bắc Ninh) 메뉴 데이터 — 가게 찾기용(2026-11-27)
// ※ 사장님 동의·비용 없이 만든 손님 검색용 메뉴판. 장바구니·주문 없음.
// 출처: 구글 지도 사진 — 매장 벽 메뉴판(음식 / 음료·토핑). 가격 단위 VND(메뉴판의 40K = 40,000). 메뉴/가격 수정은 이 파일만 고치면 됩니다.
window.RESTAURANT = {
  brand: { ko: "퍼 꾸언 보", en: "Phở quân bò" },
  phone: "0367 006 833",
  address: "56 P. Lương Ngọc Quyến, Kinh Bắc, Bắc Ninh",
  wifi: { ssid: "PHOQUAN", password: "16091987" },
  hours: { ko: "05:00 – 11:00 (오전에만 영업)", en: "05:00 – 11:00 (mornings only)", zh: "05:00 – 11:00（仅上午营业）", ja: "5:00～11:00（午前のみ営業）", vi: "05:00 – 11:00 (chỉ bán buổi sáng)" },
  mapUrl: "https://www.google.com/maps/place/Ph%E1%BB%9F+qu%C3%A2n+b%C3%B2/@21.1904815,106.0584295,16z/data=!4m6!3m5!1s0x31350dff5b27b811:0xd97aff6f4782a57a!8m2!3d21.1904815!4d106.0679567",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, name, extra = {}) => ({ name, price, ...extra });

window.MENU = [
  {
    id: "pho",
    name: T("소고기 쌀국수", "Beef phở", "牛肉河粉", "牛肉のフォー", "Phở bò"),
    note: T("부위 이름만 보고 골라요. 모두 같은 가격(사태만 50,000)이에요.", "Pick your beef cut. Every bowl is the same price (Bắp is 50,000).", "按牛肉部位选择。每碗价格相同（仅牛腱为50,000）。", "牛肉の部位を選びます。どれも同じ価格です（牛すね肉のみ50,000）。", "Chọn loại thịt bò. Giá đồng nhất (riêng Bắp 50.000)."),
    items: [
      it(40000, T("살짝 익힌 소고기 (따이)", "Rare beef (Tái)", "半熟牛肉 (Tái)", "レア牛肉 (Tái)", "Tái"), { photo: "img/tai.jpg", tag: "must" }),
      it(40000, T("푹 익힌 소고기 (찐)", "Well-done beef (Chín)", "全熟牛肉 (Chín)", "よく火を通した牛肉 (Chín)", "Chín"), { photo: "img/chin.jpg" }),
      it(40000, T("차돌양지 (거우)", "Beef brisket (Gầu)", "牛腩 (Gầu)", "牛バラ肉・ブリスケット (Gầu)", "Gầu"), { photo: "img/gau.jpg" }),
      it(40000, T("살짝 익힌 소고기 + 차돌양지", "Rare beef + brisket (Tái gầu)", "半熟牛肉 + 牛腩 (Tái gầu)", "レア牛肉 + ブリスケット (Tái gầu)", "Tái gầu"), { photo: "img/taigau.jpg" }),
      it(40000, T("차돌양지 + 익힌 소고기", "Brisket + well-done beef (Gầu chín)", "牛腩 + 全熟牛肉 (Gầu chín)", "ブリスケット + よく火を通した牛肉 (Gầu chín)", "Gầu chín"), { photo: "img/gauchin.jpg" }),
      it(40000, T("생 차돌양지 (거우 뜨어이)", "Fresh brisket (Gầu tươi)", "鲜牛腩 (Gầu tươi)", "新鮮ブリスケット (Gầu tươi)", "Gầu tươi")),
      it(40000, T("살짝 익힌 소고기 + 힘줄 (따이 건)", "Rare beef + tendon (Tái gân)", "半熟牛肉 + 牛筋 (Tái gân)", "レア牛肉 + 牛すじ (Tái gân)", "Tái gân")),
      it(40000, T("안심 밑살 (데 탄)", "Beef under-loin (Đế thăn)", "牛里脊下部肉 (Đế thăn)", "ヒレ下の肉 (Đế thăn)", "Đế thăn")),
      it(50000, T("소 사태 (밥)", "Beef shank (Bắp)", "牛腱 (Bắp)", "牛すね肉 (Bắp)", "Bắp")),
      it(40000, T("볶은 소고기 쌀국수 (싸오 란)", "Stir-fried beef phở (Xào lăn)", "炒牛肉河粉 (Xào lăn)", "牛肉の炒めフォー (Xào lăn)", "Xào lăn")),
    ],
  },
  {
    id: "sotvang",
    name: T("와인 소고기 스튜 (솟 방)", "Beef red-wine stew (Sốt vang)", "红酒炖牛肉 (Sốt vang)", "牛肉の赤ワイン煮込み (Sốt vang)", "Sốt vang"),
    items: [
      it(40000, T("소고기 와인 스튜 쌀국수", "Red-wine beef stew phở", "红酒炖牛肉河粉 (Sốt vang)", "赤ワイン煮込みのフォー (Sốt vang)", "Phở sốt vang")),
      it(40000, T("소고기 와인 스튜 반미", "Sốt vang with bánh mì", "红酒炖牛肉配法棍 (Bánh mì sốt vang)", "赤ワイン煮込みとバインミー (Bánh mì sốt vang)", "Bánh mì sốt vang")),
    ],
  },
  {
    id: "lau",
    name: T("전골 · 접시 요리", "Hotpot & dishes", "火锅 · 盘装菜", "鍋・一品料理", "Lẩu & món đĩa"),
    note: T("양에 따라 가격이 달라요. 메뉴판에 적힌 가격 범위예요.", "Price depends on the portion. Ranges are as shown on the menu board.", "价格因份量而异，以菜单牌上标示的价格为准。", "量によって価格が変わります。メニュー表に記載の価格帯です。", "Giá tuỳ theo suất, theo bảng menu của quán."),
    items: [
      { name: T("차돌양지 전골 (러우 거우)", "Beef brisket hotpot (Lẩu gầu)", "牛腩火锅 (Lẩu gầu)", "ブリスケット鍋 (Lẩu gầu)", "Lẩu gầu"), sizes: [["S", 350000], ["L", 500000]] },
      { name: T("와인 스튜 전골 (러우 솟 방)", "Red-wine stew hotpot (Lẩu sốt vang)", "红酒炖牛肉火锅 (Lẩu sốt vang)", "赤ワイン煮込み鍋 (Lẩu sốt vang)", "Lẩu sốt vang"), sizes: [["S", 350000], ["L", 500000]] },
      { name: T("소고기 볶음 접시 (디어 싸오)", "Stir-fried beef plate (Đĩa xào)", "炒牛肉盘 (Đĩa xào)", "牛肉の炒め皿 (Đĩa xào)", "Đĩa xào"), sizes: [["S", 120000], ["M", 150000], ["L", 200000]] },
      { name: T("샤브 소고기 한 그릇 (밧 늉)", "Beef dipped in broth bowl (Bát nhúng)", "涮牛肉一碗 (Bát nhúng)", "しゃぶしゃぶ牛肉の器 (Bát nhúng)", "Bát nhúng"), sizes: [["S", 150000], ["L", 200000]] },
      { name: T("와인 스튜 한 그릇 (밧 솟 방)", "Red-wine stew bowl (Bát sốt vang)", "红酒炖牛肉一碗 (Bát sốt vang)", "赤ワイン煮込みの器 (Bát sốt vang)", "Bát sốt vang"), sizes: [["S", 150000], ["L", 250000]] },
    ],
  },
  {
    id: "drink",
    name: T("음료", "Drinks", "饮品", "ドリンク", "Đồ uống"),
    items: [
      it(5000, T("차 (냉차·따뜻한 차)", "Tea (iced or hot)", "茶（冷／热）", "お茶（冷・温）", "Trà đá, nóng")),
      it(10000, T("레몬차 · 금귤차", "Lemon tea · Kumquat tea", "柠檬茶 · 金桔茶", "レモンティー・金柑茶", "Trà chanh, quất")),
      it(20000, T("패션후르츠 주스", "Passion fruit juice", "百香果汁", "パッションフルーツジュース", "Chanh leo")),
      it(25000, T("오렌지 주스", "Orange juice", "橙汁", "オレンジジュース", "Nước cam")),
      it(20000, T("소금 커피", "Salt coffee", "海盐咖啡", "塩コーヒー", "Cà phê muối")),
      it(10000, T("연유 커피", "Coffee with condensed milk", "炼乳咖啡", "コンデンスミルクコーヒー", "Cà phê sữa")),
      it(25000, T("사과 착즙 주스", "Fresh apple juice", "鲜榨苹果汁", "生搾りりんごジュース", "Nước ép táo")),
      it(25000, T("파인애플 착즙 주스", "Fresh pineapple juice", "鲜榨菠萝汁", "生搾りパイナップルジュース", "Nước ép dứa")),
      it(25000, T("셀러리 착즙 주스", "Fresh celery juice", "鲜榨芹菜汁", "生搾りセロリジュース", "Nước ép cần tây")),
      it(25000, T("수박 착즙 주스", "Fresh watermelon juice", "鲜榨西瓜汁", "生搾りスイカジュース", "Nước ép dưa hấu")),
    ],
  },
  {
    id: "topping",
    name: T("토핑 · 간식", "Toppings & snacks", "配料 · 小吃", "トッピング・おつまみ", "Topping"),
    items: [
      it(5000, T("알로에 토핑", "Aloe vera topping", "芦荟配料", "アロエトッピング", "Nha đam")),
      it(5000, T("화이트 펄 토핑", "White pearl topping", "白珍珠配料", "白パールトッピング", "Trân châu trắng")),
      it(15000, T("해바라기씨", "Sunflower seeds", "葵花籽", "ひまわりの種", "Hướng dương")),
    ],
  },
];
