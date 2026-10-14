// 숯꾸이 (Nhà Hàng Thịt Nướng) 메뉴 데이터
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
window.RESTAURANT = {
  brand: { ko: "숯꾸이", sub: "烤肉 · Nhà Hàng Thịt Nướng" },
  phone: "0985 409 705",
  address: "190 Nguyễn Cao, TP. Bắc Ninh",
  wifi: { ssid: "NHÀ HÀNG THỊT NƯỚNG", password: "992992992" },
};

window.MENU = [
  {
    id: "pork",
    name: { ko: "돼지고기", en: "Pork", zh: "猪肉", ja: "豚肉", vi: "Thịt lợn" },
    items: [
      { price: 100000, unit: "150g", name: { ko: "목살", en: "Pork Neck", zh: "猪肩颈肉", ja: "豚肩ロース（モクサル）", vi: "Thịt vai" } },
      { price: 100000, unit: "150g", name: { ko: "삼겹살", en: "Pork Belly", zh: "五花肉", ja: "サムギョプサル（豚バラ）", vi: "Ba chỉ" } },
      { price: 100000, unit: "120g", name: { ko: "항정살", en: "Pork Jowl", zh: "猪脸肉", ja: "豚トロ（ハンジョンサル）", vi: "Má lợn" } },
      { price: 100000, unit: "150g", name: { ko: "돼지갈비", en: "Marinated Pork Galbi", zh: "腌制猪肩肉", ja: "味付け豚カルビ", vi: "Thịt vai ngâm" } },
    ],
  },
  {
    id: "beef",
    name: { ko: "소고기", en: "Beef", zh: "牛肉", ja: "牛肉", vi: "Thịt bò" },
    items: [
      { price: 180000, unit: "100g", name: { ko: "꽃살", en: "Premium Marbled Beef", zh: "优质雪花牛肉", ja: "霜降り牛（コッサル）", vi: "Bò hảo hạng" } },
      { price: 140000, unit: "100g", name: { ko: "안창살", en: "Beef Skirt", zh: "牛裙边", ja: "ハラミ（アンチャンサル）", vi: "Diềm bò" } },
      { price: 120000, unit: "100g", name: { ko: "갈비살", en: "Boneless Short Rib", zh: "牛肋条", ja: "中落ちカルビ", vi: "Dẻ sườn" } },
      { price: 120000, name: { ko: "LA갈비", en: "Marinated LA Galbi", zh: "腌制LA排骨", ja: "味付けLAカルビ", vi: "Sườn LA ngâm" } },
    ],
  },
  {
    id: "side",
    name: { ko: "사이드 메뉴", en: "Side Dishes", zh: "炒菜", ja: "サイドメニュー", vi: "Món xào" },
    items: [
      { price: 120000, name: { ko: "떡볶이", en: "Tteokbokki (Spicy Rice Cakes)", zh: "辣炒年糕", ja: "トッポッキ", vi: "Tokboki" } },
      { price: 200000, name: { ko: "스팸&햄 구이", en: "Grilled Spam & Sausage", zh: "煎午餐肉&香肠", ja: "スパム＆ソーセージ焼き", vi: "Spam + xúc xích chiên" } },
      { price: 300000, name: { ko: "제육볶음", en: "Spicy Stir-fried Pork", zh: "辣炒猪肉", ja: "豚肉の辛味炒め（チェユクポックム）", vi: "Thịt lợn xào cay" } },
      { price: 300000, name: { ko: "고갈비", en: "Grilled Mackerel", zh: "烤青花鱼", ja: "サバの塩焼き（コガルビ）", vi: "Cá nướng" } },
    ],
  },
  {
    id: "meal",
    name: { ko: "식사 · 후식", en: "Stews & Noodles", zh: "汤 · 面条", ja: "お食事（チゲ・麺）", vi: "Mì - Miến" },
    items: [
      { price: 70000, name: { ko: "청국장", en: "Cheonggukjang (Fermented Soybean Stew)", zh: "清麴酱汤", ja: "チョングクチャン", vi: "Canh đậu tương lên men" } },
      { price: 50000, name: { ko: "된장찌개", en: "Doenjang Jjigae (Soybean Paste Stew)", zh: "大酱汤", ja: "テンジャンチゲ", vi: "Canh tương" } },
      { price: 60000, name: { ko: "냉면 (물/비빔)", en: "Naengmyeon – Cold Noodles (Broth / Spicy)", zh: "冷面（汤/拌）", ja: "冷麺（水／ビビン）", vi: "Miến lạnh (nước/trộn)" } },
    ],
  },
  {
    id: "hotpot",
    name: { ko: "찜 · 전골", en: "Braised & Hot Pot", zh: "炖菜 · 火锅", ja: "チム・鍋料理", vi: "Món hấp - Lẩu" },
    items: [
      { price: 350000, name: { ko: "찜닭", en: "Jjimdak (Soy Braised Chicken)", zh: "安东炖鸡", ja: "チムタク", vi: "Gà ngọt" } },
      { price: 350000, name: { ko: "닭볶음탕", en: "Spicy Braised Chicken", zh: "辣炖鸡", ja: "タッポックムタン", vi: "Gà cay" } },
      { price: 350000, name: { ko: "부대찌개", en: "Budae Jjigae (Army Stew)", zh: "部队火锅", ja: "プデチゲ", vi: "Lẩu xúc xích" } },
      { price: 400000, name: { ko: "소불고기전골", en: "Beef Bulgogi Hot Pot", zh: "牛肉烤肉火锅", ja: "牛プルコギ鍋", vi: "Lẩu thịt bò" } },
      { price: 400000, name: { ko: "매운갈비찜", en: "Spicy Braised Pork Ribs", zh: "辣炖排骨", ja: "辛口カルビチム", vi: "Sườn lợn hầm" } },
      { price: 400000, name: { ko: "동태탕", en: "Spicy Pollack Stew", zh: "冻明太鱼汤", ja: "トンテタン（スケトウダラ鍋）", vi: "Lẩu cá Dongthe" } },
      { price: 300000, name: { ko: "오뎅탕", en: "Fish Cake Hot Pot", zh: "鱼饼火锅", ja: "おでん鍋", vi: "Lẩu chả cá" } },
    ],
  },
  {
    id: "preorder",
    name: { ko: "예약 메뉴", en: "Pre-order Only", zh: "预订菜单", ja: "予約メニュー", vi: "Món đặt trước" },
    items: [
      // TODO: 사진에서 가격 끝자리가 잘림 ("70..."). 실제 가격 확인 필요
      { price: 700000, notice: "h90", name: { ko: "백숙", en: "Ginseng Chicken Soup (Baeksuk)", zh: "人参炖鸡", ja: "ペクスク（参鶏鍋）", vi: "Gà hầm sâm" } },
      { price: 700000, unit: "1kg", notice: "h120", name: { ko: "장어", en: "Grilled Eel", zh: "鳗鱼", ja: "ウナギ", vi: "Cá chình" } },
    ],
  },
  {
    id: "drinks",
    name: { ko: "주류 · 음료", en: "Drinks", zh: "酒水", ja: "ドリンク", vi: "Rượu - Đồ uống" },
    items: [
      { price: 130000, name: { ko: "새로", en: "Saero (Soju)", zh: "Saero 烧酒", ja: "セロ（焼酎）", vi: "Saero" } },
      { price: 130000, name: { ko: "참이슬", en: "Chamisul (Soju)", zh: "真露 Chamisul 烧酒", ja: "チャミスル（焼酎）", vi: "Chamisul" } },
      { price: 130000, name: { ko: "진로", en: "Jinro (Soju)", zh: "Jinro 烧酒", ja: "ジンロ（焼酎）", vi: "Jinro" } },
      { price: 130000, name: { ko: "처음처럼", en: "Chumchurum (Soju)", zh: "初饮初乐 烧酒", ja: "チョウムチョロム（焼酎）", vi: "Chumchurum" } },
      { price: 50000, name: { ko: "맥주", en: "Beer", zh: "啤酒", ja: "ビール", vi: "Bia" } },
      { price: 20000, name: { ko: "음료", en: "Soft Drink", zh: "汽水", ja: "ソフトドリンク", vi: "Nước ngọt" } },
    ],
  },
];
