// 퍼 탄 Phở Thành (64 P. Quán Sứ, Cửa Nam, Hà Nội) 메뉴 데이터 — 가게 찾기용(2026-11-27)
// ※ 사장님 동의·비용 없이 만든 손님 검색용 메뉴판. 장바구니·주문 없음.
// 출처: 구글 지도 메뉴판 사진 20장(빨간 벽 메뉴판 스티커 최신가 · 테이블 메뉴 · 포장 메뉴 · 영수증). 가격 단위 VND.
// 옛 검은 판(45k~75k)과 가격이 달라 스티커로 고친 최신가(높은 쪽)를 썼다. 메뉴/가격 수정은 이 파일만 고치면 됩니다.
window.RESTAURANT = {
  brand: { ko: "퍼 탄", en: "Phở Thành" },
  phone: "0979 538 883",
  address: "64 P. Quán Sứ, Cửa Nam, Hà Nội",
  wifi: null,
  hours: "06:00 – 21:00",
  mapUrl: "https://www.google.com/maps/place/Ph%E1%BB%9F+Th%C3%A0nh/@21.025577,105.8450762,21z/data=!4m6!3m5!1s0x3135ab01aae16d2d:0x7f9eca29efad5775!8m2!3d21.0256626!4d105.8451664",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, name, extra = {}) => ({ name, price, ...extra });

window.MENU = [
  {
    id: "pho",
    name: T("쌀국수 (한 가지 부위)", "Phở (single cut)", "牛肉河粉（单一部位）", "フォー（1種類の部位）", "Phở một loại thịt"),
    note: T("부위 이름만 보고 골라요. 모두 소고기 쌀국수예요.", "Pick your beef cut. All bowls are beef phở.", "请按牛肉部位选择，全部都是牛肉河粉。", "牛肉の部位を選んでください。すべて牛肉のフォーです。", "Chọn loại thịt bò bạn thích. Tất cả đều là phở bò."),
    items: [
      it(50000, T("살짝 익힌 소고기 (따이)", "Rare beef (Tái)", "半生牛肉 (Tái)", "レア牛肉 (Tái)", "Phở Tái"), { photo: "img/tai.jpg", tag: "must" }),
      it(50000, T("푹 익힌 소고기 (찐)", "Well-done beef (Chín)", "熟牛肉 (Chín)", "よく火の通った牛肉 (Chín)", "Phở Chín"), { photo: "img/chin.jpg" }),
      it(50000, T("양지 (남)", "Beef flank (Nạm)", "牛腩 (Nạm)", "バラ肉 (Nạm)", "Phở Nạm")),
      it(50000, T("소 힘줄 (건)", "Beef tendon (Gân)", "牛筋 (Gân)", "牛すじ (Gân)", "Phở Gân"), { photo: "img/gan.jpg" }),
      it(55000, T("소 목심 (우 바이)", "Beef chuck (U vai)", "牛肩肉 (U vai)", "肩肉 (U vai)", "Phở U vai")),
      it(55000, T("차돌양지 (거우)", "Beef brisket (Gầu)", "肥牛腩 (Gầu)", "脂身のバラ肉 (Gầu)", "Phở Gầu")),
      it(65000, T("꽃사태 (밥 호아)", "Beef shank (Bắp hoa)", "花腱 (Bắp hoa)", "すね肉 (Bắp hoa)", "Phở Bắp hoa")),
      it(80000, T("아롱사태 (로이 루아)", "Beef shank core (Lõi rùa)", "牛腱芯 (Lõi rùa)", "すね肉の芯 (Lõi rùa)", "Phở Lõi rùa")),
    ],
  },
  {
    id: "mix",
    name: T("쌀국수 (섞어서)", "Phở (mixed cuts)", "牛肉河粉（混合）", "フォー（ミックス）", "Phở kết hợp"),
    note: T("살짝 익힌 소고기(따이)에 다른 부위를 더한 조합이에요.", "Rare beef plus a second cut.", "半生牛肉搭配另一种部位。", "レア牛肉（Tái）にもう1種類の部位を合わせた組み合わせです。", "Thịt tái kết hợp thêm một loại thịt khác."),
    items: [
      it(50000, T("살짝 익힌 소고기 + 익힌 고기", "Rare + well-done beef", "半生牛肉 + 熟牛肉", "レア牛肉 + よく火の通った牛肉", "Phở Tái + chín")),
      it(50000, T("살짝 익힌 소고기 + 양지", "Rare beef + flank", "半生牛肉 + 牛腩", "レア牛肉 + バラ肉", "Phở Tái + nạm")),
      it(50000, T("살짝 익힌 소고기 + 힘줄", "Rare beef + tendon", "半生牛肉 + 牛筋", "レア牛肉 + 牛すじ", "Phở Tái + gân")),
      it(55000, T("살짝 익힌 소고기 + 목심", "Rare beef + chuck", "半生牛肉 + 牛肩肉", "レア牛肉 + 肩肉", "Phở Tái + u vai")),
      it(55000, T("살짝 익힌 소고기 + 차돌양지", "Rare beef + brisket", "半生牛肉 + 肥牛腩", "レア牛肉 + 脂身のバラ肉", "Phở Tái + gầu")),
    ],
  },
  {
    id: "special",
    name: T("특선 쌀국수", "Specialty phở", "特色河粉", "スペシャルフォー", "Phở đặc biệt"),
    items: [
      it(60000, T("볶은 소고기 쌀국수 (따이 란)", "Lightly seared beef phở (Tái lăn)", "半生炒牛肉河粉 (Tái lăn)", "軽く炒めた牛肉のフォー (Tái lăn)", "Phở Tái lăn")),
      it(60000, T("소고기 와인 스튜 쌀국수 (솟 방)", "Beef in red wine sauce phở (Sốt vang)", "红酒炖牛肉河粉 (Sốt vang)", "牛肉の赤ワイン煮込みフォー (Sốt vang)", "Phở Sốt vang"), { photo: "img/sotvang.jpg", tag: "best" }),
    ],
  },
  {
    id: "extra",
    name: T("추가 · 음료", "Extras & drinks", "加料 · 饮品", "トッピング・ドリンク", "Món thêm · Đồ uống"),
    items: [
      it(7000, T("수란 (달걀 추가)", "Poached egg", "水煮蛋（加蛋）", "ポーチドエッグ（卵追加）", "Trứng gà chần")),
      it(10000, T("꽈이 (튀김빵)", "Quẩy (Vietnamese fried dough)", "油条 (Quẩy)", "揚げパン（ユーティヤオ） (Quẩy)", "Quẩy"), { photo: "img/quay.jpg" }),
      it(5000, T("차", "Tea", "茶", "お茶", "Trà")),
    ],
  },
  {
    id: "takeaway",
    name: T("포장 메뉴 (집에서 먹기)", "Takeaway (to cook at home)", "外带菜品（在家享用）", "テイクアウト（ご自宅用）", "Đồ mua về"),
    note: T("소고기 전골과 포장 메뉴는 미리 주문해야 해요.", "Beef hotpot and takeaway items must be ordered in advance.", "牛肉火锅和外带菜品需提前预订。", "牛肉の鍋とテイクアウトは事前注文のみ承ります。", "Nhà hàng chỉ nhận order trước lẩu bò và đồ mua về."),
    items: [
      it(300000, T("차돌 심지 (생)", "Brisket core, raw (Nhân gầu sống)", "生牛腩芯 (Nhân gầu sống)", "ブリスケットの芯・生 (Nhân gầu sống)", "Nhân gầu sống"), { unit: "1kg" }),
      it(550000, T("차돌 심지 (익힘)", "Brisket core, cooked (Nhân gầu chín)", "熟牛腩芯 (Nhân gầu chín)", "ブリスケットの芯・加熱済み (Nhân gầu chín)", "Nhân gầu chín"), { unit: "1kg" }),
      it(500000, T("꽃사태 (손질 완료)", "Beef shank, trimmed (Bắp hoa)", "花腱（已处理） (Bắp hoa)", "すね肉・下処理済み (Bắp hoa)", "Bắp hoa (đã lọc sạch)"), { unit: "1kg" }),
      it(700000, T("아롱사태 (손질 완료)", "Beef shank core, trimmed (Lõi rùa)", "牛腱芯（已处理） (Lõi rùa)", "すね肉の芯・下処理済み (Lõi rùa)", "Lõi rùa (đã lọc sạch)"), { unit: "1kg" }),
      it(210000, T("양지 (생)", "Flank, raw (Nạm sống)", "生牛腩 (Nạm sống)", "バラ肉・生 (Nạm sống)", "Nạm sống"), { unit: "1kg" }),
      it(400000, T("양지 (익힘)", "Flank, cooked (Nạm chín)", "熟牛腩 (Nạm chín)", "バラ肉・加熱済み (Nạm chín)", "Nạm chín"), { unit: "1kg" }),
      it(300000, T("소 목살 마블링 부위 (생)", "Marbled chuck, raw (U hoa sống)", "生雪花牛肩肉 (U hoa sống)", "霜降りの肩肉・生 (U hoa sống)", "U hoa sống"), { unit: "1kg" }),
      it(550000, T("소 목살 마블링 부위 (익힘)", "Marbled chuck, cooked (U hoa chín)", "熟雪花牛肩肉 (U hoa chín)", "霜降りの肩肉・加熱済み (U hoa chín)", "U hoa chín"), { unit: "1kg" }),
      it(400000, T("Y자 소 힘줄 (익힘)", "Y-cut tendon, cooked (Gân Y chín)", "熟Y形牛筋 (Gân Y chín)", "Y字の牛すじ・加熱済み (Gân Y chín)", "Gân Y chín"), { unit: "1kg" }),
      it(400000, T("소꼬리", "Oxtail (Đuôi bò)", "牛尾 (Đuôi bò)", "牛テール (Đuôi bò)", "Đuôi bò"), { unit: "1kg" }),
      it(150000, T("소고기 와인 스튜 (고기 400g)", "Beef red wine stew (400 g meat)", "红酒炖牛肉（肉 400 克） (Sốt vang)", "牛肉の赤ワイン煮込み（肉400g） (Sốt vang)", "Sốt vang (= 400 gram thịt)"), { unit: "1 box" }),
      it(10000, T("쌀국수 육수", "Phở broth", "河粉汤底", "フォーのスープ", "Nước phở"), { unit: "1L" }),
      it(70000, T("전골 육수 소 (1냄비 분량)", "Hotpot broth, small (1 pot)", "火锅汤底（小，约 1 锅）", "鍋用スープ・小（1鍋分）", "Nước lẩu túi nhỏ (= 1 nồi)"), { unit: "1 bag" }),
      it(120000, T("전골 육수 대 (2~3냄비 분량)", "Hotpot broth, large (2-3 pots)", "火锅汤底（大，约 2-3 锅）", "鍋用スープ・大（2〜3鍋分）", "Nước lẩu túi to (= 2-3 nồi)"), { unit: "1 bag" }),
    ],
  },
];
