// EROS 메뉴 데이터
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND (화면에는 "k" = 1,000동으로 표시)
// 주소·와이파이·연락처가 정해지면 아래 RESTAURANT에 채우면 화면 하단에 자동으로 나타납니다.
window.RESTAURANT = {
  brand: "EROS",
  phone: null,      // 예: "0900 000 000"
  address: null,    // 예: "123 Nguyễn ..., TP. ..."
  mapUrl: "https://maps.app.goo.gl/mV2aUGsGAk4gE4Gy6",  // 구글 지도 위치 (주소 글자 없이도 지도 버튼 표시)
  wifi: null,       // 예: { ssid: "EROS", password: "12345678" }
};

window.MENU = [
  {
    id: "set",
    icon: "img/set.jpg",
    note: { ko: "모든 세트에 모듬과일 + 마른안주 포함", en: "Every set includes a fruit platter + dried snacks", zh: "所有套餐均含什锦水果 + 干果小吃", ja: "全セットにフルーツ盛り合わせ＋乾き物付き", vi: "Mỗi combo kèm trái cây thập cẩm + đồ khô" },
    name: { ko: "세트 메뉴", en: "Set Menu", zh: "套餐", ja: "セットメニュー", vi: "Combo" },
    items: [
      { price: 1500000, name: { ko: "소주세트", en: "Soju Set", zh: "烧酒套餐", ja: "焼酎セット", vi: "Combo Soju" },
        desc: { ko: "소주 6병 + 모듬과일 + 마른안주", en: "6 soju + fruit platter + dried snacks", zh: "烧酒6瓶 + 什锦水果 + 干果小吃", ja: "焼酎6本＋フルーツ盛り合わせ＋乾き物", vi: "6 chai soju + trái cây thập cẩm + đồ khô" } },
      { price: 1500000, name: { ko: "맥주세트", en: "Beer Set", zh: "啤酒套餐", ja: "ビールセット", vi: "Combo Bia" },
        desc: { ko: "맥주 10병 + 모듬과일 + 마른안주", en: "10 beers + fruit platter + dried snacks", zh: "啤酒10瓶 + 什锦水果 + 干果小吃", ja: "ビール10本＋フルーツ盛り合わせ＋乾き物", vi: "10 chai bia + trái cây thập cẩm + đồ khô" } },
      { price: 1500000, name: { ko: "소맥세트", en: "Soju & Beer Set", zh: "烧酒啤酒套餐", ja: "焼酎＆ビールセット", vi: "Combo Soju & Bia" },
        desc: { ko: "소주 3병 + 맥주 6병 + 모듬과일 + 마른안주", en: "3 soju + 6 beers + fruit platter + dried snacks", zh: "烧酒3瓶 + 啤酒6瓶 + 什锦水果 + 干果小吃", ja: "焼酎3本＋ビール6本＋フルーツ盛り合わせ＋乾き物", vi: "3 chai soju + 6 chai bia + trái cây thập cẩm + đồ khô" } },
    ],
  },
  {
    id: "whisky",
    art: "img/bottle.jpg",
    name: { ko: "위스키 · 양주", en: "Whisky & Premium", zh: "威士忌 · 洋酒", ja: "ウイスキー・洋酒", vi: "Whisky & Rượu ngoại" },
    items: [
      { price: 2300000, name: { ko: "예거마이스터", en: "Jägermeister", zh: "野格", ja: "イエーガーマイスター", vi: "Jägermeister" } },
      { price: 2500000, name: { ko: "몽키숄더", en: "Monkey Shoulder", zh: "三只猴子", ja: "モンキーショルダー", vi: "Monkey Shoulder" } },
      // 메뉴판 두 장의 가격이 다름 (3,000k / 2,500k). 3,000k로 넣음 — 확인 필요
      { price: 3000000, name: { ko: "잭다니엘", en: "Jack Daniel's", zh: "杰克丹尼", ja: "ジャックダニエル", vi: "Jack Daniel's" } },
      { price: 2500000, name: { ko: "잭다니엘 허니", en: "Jack Daniel's Honey", zh: "杰克丹尼 蜂蜜", ja: "ジャックダニエル ハニー", vi: "Jack Daniel's Honey" } },
      { price: 2500000, name: { ko: "조니워커 블랙", en: "Johnnie Walker Black Label", zh: "尊尼获加 黑牌", ja: "ジョニーウォーカー ブラック", vi: "Johnnie Walker Black Label" } },
      { price: 4000000, name: { ko: "조니워커 골드", en: "Johnnie Walker Gold Label", zh: "尊尼获加 金牌", ja: "ジョニーウォーカー ゴールド", vi: "Johnnie Walker Gold Label" } },
      { price: 5000000, name: { ko: "발렌타인 17년", en: "Ballantine's 17", zh: "百龄坛 17年", ja: "バランタイン 17年", vi: "Ballantine's 17" } },
      { price: 5500000, name: { ko: "시바스 리갈 18년", en: "Chivas Regal 18", zh: "芝华士 18年", ja: "シーバスリーガル 18年", vi: "Chivas Regal 18" } },
      { price: 6000000, name: { ko: "글렌피딕 15년", en: "Glenfiddich 15", zh: "格兰菲迪 15年", ja: "グレンフィディック 15年", vi: "Glenfiddich 15" } },
      { price: 6000000, name: { ko: "맥캘란 12년", en: "Macallan 12", zh: "麦卡伦 12年", ja: "マッカラン 12年", vi: "Macallan 12" } },
      { price: 6500000, name: { ko: "글렌피딕 18년", en: "Glenfiddich 18", zh: "格兰菲迪 18年", ja: "グレンフィディック 18年", vi: "Glenfiddich 18" } },
      { price: 8000000, name: { ko: "발렌타인 21년", en: "Ballantine's 21", zh: "百龄坛 21年", ja: "バランタイン 21年", vi: "Ballantine's 21" } },
      { price: 8000000, name: { ko: "달모어 12년", en: "Dalmore 12", zh: "大摩 12年", ja: "ダルモア 12年", vi: "Dalmore 12" } },
      { price: 9000000, name: { ko: "조니워커 블루", en: "Johnnie Walker Blue Label", zh: "尊尼获加 蓝牌", ja: "ジョニーウォーカー ブルー", vi: "Johnnie Walker Blue Label" } },
      { price: 9000000, name: { ko: "로얄 살루트 21년", en: "Royal Salute 21", zh: "皇家礼炮 21年", ja: "ロイヤルサルート 21年", vi: "Royal Salute 21" } },
    ],
  },
  {
    id: "cocktail",
    name: { ko: "칵테일", en: "Cocktails", zh: "鸡尾酒", ja: "カクテル", vi: "Cocktail" },
    items: [
      { price: 350000, name: { ko: "섹스 온 더 비치", en: "Sex on the Beach", zh: "性感海滩", ja: "セックス・オン・ザ・ビーチ", vi: "Sex on the Beach" } },
      { price: 350000, name: { ko: "오르가즘", en: "Orgasm", zh: "高潮", ja: "オーガズム", vi: "Orgasm" } },
      { price: 350000, name: { ko: "지스팟", en: "G-Spot", zh: "G点", ja: "Gスポット", vi: "G-Spot" } },
      { price: 150000, name: { ko: "예거밤", en: "Jägerbomb", zh: "野格炸弹", ja: "イエーガーボム", vi: "Jägerbomb" } },
    ],
  },
  {
    id: "beer",
    icon: "img/drinks.jpg",
    name: { ko: "소주 · 맥주", en: "Soju & Beer", zh: "烧酒 · 啤酒", ja: "焼酎・ビール", vi: "Soju & Bia" },
    items: [
      { price: 150000, name: { ko: "소주", en: "Soju", zh: "烧酒", ja: "焼酎（ソジュ）", vi: "Soju" } },
      { price: 100000, name: { ko: "맥주", en: "Beer", zh: "啤酒", ja: "ビール", vi: "Bia" } },
      { price: 150000, name: { ko: "블랑", en: "1664 Blanc", zh: "1664 白啤", ja: "1664 ブラン", vi: "1664 Blanc" } },
      { price: 150000, name: { ko: "호가든", en: "Hoegaarden", zh: "福佳白", ja: "ヒューガルデン", vi: "Hoegaarden" } },
      { price: 150000, name: { ko: "하이네켄", en: "Heineken", zh: "喜力", ja: "ハイネケン", vi: "Heineken" } },
    ],
  },
  {
    id: "dry",
    icon: "img/dry.jpg",
    name: { ko: "마른안주", en: "Dried Snacks", zh: "干果小吃", ja: "乾き物", vi: "Đồ khô nhắm" },
    items: [
      { price: 400000, name: { ko: "오징어 구이", en: "Grilled Dried Squid", zh: "烤鱿鱼", ja: "焼きスルメ", vi: "Mực khô nướng" } },
      { price: 250000, name: { ko: "먹태 구이", en: "Grilled Dried Pollack", zh: "烤明太鱼干", ja: "焼きモクテ（干しスケトウダラ）", vi: "Cá minh thái khô nướng" } },
      { price: 250000, name: { ko: "한치 & 쥐포", en: "Dried Mitre Squid & Filefish Jerky", zh: "小鱿鱼 & 鱼片干", ja: "ハンチ＆カワハギ干し", vi: "Mực ống khô & khô cá bò" } },
      { price: 400000, name: { ko: "마른안주 세트", en: "Dried Snack Platter", zh: "干果小吃拼盘", ja: "乾き物盛り合わせ", vi: "Khay đồ khô tổng hợp" },
        desc: { ko: "오징어구이, 먹태구이, 한치, 쥐포, 스낵류", en: "Grilled squid, dried pollack, mitre squid, filefish jerky, snacks", zh: "烤鱿鱼、明太鱼干、小鱿鱼、鱼片干、零食", ja: "焼きスルメ・モクテ・ハンチ・カワハギ・スナック", vi: "Mực nướng, cá minh thái khô, mực ống khô, khô cá bò, snack" } },
    ],
  },
  {
    id: "dish",
    icon: "img/dish.jpg",
    name: { ko: "요리", en: "Dishes", zh: "料理", ja: "料理", vi: "Món nấu" },
    items: [
      { price: 400000, name: { ko: "골뱅이소면", en: "Spicy Whelk Salad with Somen", zh: "凉拌海螺素面", ja: "コルベンイ素麺（ツブ貝の辛味和え）", vi: "Gỏi ốc trộn mì somen" } },
      { price: 350000, name: { ko: "쏘세지야채볶음", en: "Stir-fried Sausage & Vegetables", zh: "香肠炒蔬菜", ja: "ソーセージと野菜炒め", vi: "Xúc xích xào rau củ" } },
      { price: 400000, name: { ko: "케이준치킨샐러드", en: "Cajun Chicken Salad", zh: "卡真鸡肉沙拉", ja: "ケイジャンチキンサラダ", vi: "Salad gà Cajun" } },
      { price: 200000, name: { ko: "라면", en: "Korean Ramyeon", zh: "韩式拉面", ja: "ラーメン（韓国ラミョン）", vi: "Mì ramyeon Hàn Quốc" } },
    ],
  },
  {
    id: "fried",
    icon: "img/fried.jpg",
    name: { ko: "튀김", en: "Fried", zh: "炸物", ja: "揚げ物", vi: "Đồ chiên" },
    items: [
      { price: 250000, name: { ko: "감자튀김", en: "French Fries", zh: "炸薯条", ja: "フライドポテト", vi: "Khoai tây chiên" } },
      { price: 300000, name: { ko: "튀김만두", en: "Fried Dumplings", zh: "炸饺子", ja: "揚げ餃子", vi: "Bánh xếp chiên" } },
      { price: 300000, name: { ko: "새우튀김", en: "Fried Shrimp", zh: "炸虾", ja: "エビフライ", vi: "Tôm chiên" } },
      { price: 300000, name: { ko: "미니돈가스", en: "Mini Pork Cutlets", zh: "迷你炸猪排", ja: "ミニとんかつ", vi: "Thịt heo chiên xù mini" } },
    ],
  },
  {
    id: "fruit",
    icon: "img/fruit.jpg",
    name: { ko: "과일", en: "Fruit", zh: "水果", ja: "フルーツ", vi: "Trái cây" },
    items: [
      { price: 400000, name: { ko: "모듬과일", en: "Fruit Platter", zh: "什锦水果", ja: "フルーツ盛り合わせ", vi: "Đĩa trái cây thập cẩm" } },
      { price: 300000, name: { ko: "과일화채", en: "Korean Fruit Punch (Hwachae)", zh: "韩式水果宾治", ja: "フルーツポンチ（ファチェ）", vi: "Chè trái cây Hàn Quốc" } },
      { price: 250000, name: { ko: "황도", en: "Yellow Peaches", zh: "黄桃", ja: "黄桃", vi: "Đào vàng ngâm" } },
      { price: 300000, name: { ko: "까나페", en: "Canapés", zh: "开胃小点", ja: "カナッペ", vi: "Bánh canapé" } },
    ],
  },
  {
    id: "bev",
    name: { ko: "음료", en: "Soft Drinks", zh: "饮料", ja: "ソフトドリンク", vi: "Nước uống" },
    items: [
      { price: 30000, name: { ko: "스프라이트", en: "Sprite", zh: "雪碧", ja: "スプライト", vi: "Sprite" } },
      { price: 30000, name: { ko: "코카콜라", en: "Coca-Cola", zh: "可口可乐", ja: "コカ・コーラ", vi: "Coca-Cola" } },
      { price: 60000, name: { ko: "딸기우유", en: "Strawberry Milk", zh: "草莓牛奶", ja: "いちごミルク", vi: "Sữa dâu" } },
      { price: 60000, name: { ko: "흰우유", en: "White Milk", zh: "纯牛奶", ja: "牛乳", vi: "Sữa tươi" } },
      { price: 50000, name: { ko: "레드불", en: "Red Bull", zh: "红牛", ja: "レッドブル", vi: "Red Bull" } },
    ],
  },
];
