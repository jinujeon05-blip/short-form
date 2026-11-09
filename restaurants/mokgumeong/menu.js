// 목구멍 하노이 미딩점 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(menu_01·02·05~10, 2026-11-09 수집). 사진끼리 가격 차이 없음
// price: 한 가지 가격 / sizes: [["S", 가격], ["L", 가격]] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만 — 정사각형이면 양옆 흰 여백)
// 메뉴판 사진끼리 가격이 다르면 높은 쪽 (다른 사실은 docs/todo.md 에)
window.RESTAURANT = {
  brand: { ko: "목구멍", en: "Moggumung" },
  phone: "0973 851 400",
  address: "122 P. Trần Văn Lai, Mỹ Đình, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "11:00 – 14:30 · 16:30 – 22:00",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "platter",
    name: T("목구멍 플래터", "MogGuMung Platter", "Moggumung 拼盘", "モックグモン プラッター", "MogGuMung Platter"),
    note: T("모든 가격은 부가세 포함 · 추가 요금 없음", "All prices include VAT · No extra charges", "所有价格已含增值税 · 无额外费用", "全て税込価格 · 追加料金なし", "Tất cả giá đã bao gồm VAT · Không có phụ phí"),
    items: [
      it(2600000, null, T("목구멍 플래터", "MogGuMung Platter", "Moggumung 拼盘", "モックグモン プラッター", "MogGuMung Platter"), { tag: "special",
        desc: T("미박삼겹살 · 특목살 · 항정살 · 갈비본살 · 우대갈비 · 미나리 (정가 2,770,000)", "Skin-on pork belly · Pork neck (special cut) · Pork jowl · Boneless beef short rib · Beef short rib (bone-in) · Water dropwort (list price 2,770,000)", "带皮五花肉 · 特选猪颈肉 · 猪颔肉 · 无骨牛小排 · 带骨牛小排 · 水芹菜 (原价 2,770,000)", "皮付きサムギョプサル · 特上豚ネック · トントロ(豚ほほ肉) · 骨なしカルビ · 骨付きカルビ · セリ (定価 2,770,000)", "Thịt ba chỉ · Thịt cổ · Thịt nọng heo đặc biệt · Thịt sườn bò không xương · Sườn non bò · Rau cần nước (giá gốc 2.770.000)") }),
      it(1400000, null, T("하프 플래터 (2인)", "Half Platter (for 2)", "半份拼盘 (2人)", "ハーフプラッター (2名様)", "Set thịt nướng Half Platter dành cho 2 người")),
    ],
  },
  {
    id: "set",
    name: T("베스트 세트", "Best Sets", "人气套餐", "ベストセット", "Best Set"),
    items: [
      it(1420000, null, T("Best 1", "Best 1", "Best 1", "Best 1", "Best 1"), {
        desc: T("미박삼겹살 1 · 항정살 1 · 갈비본살 1", "Skin-on pork belly 1 · Pork jowl 1 · Boneless beef short rib 1", "带皮五花肉 1 · 猪颔肉 1 · 无骨牛小排 1", "皮付きサムギョプサル 1 · トントロ 1 · 骨なしカルビ 1", "Thịt ba chỉ 1 · Thịt nọng heo đặc biệt 1 · Thịt sườn bò không xương 1") }),
      it(1040000, null, T("Best 2", "Best 2", "Best 2", "Best 2", "Best 2"), {
        desc: T("미박삼겹살 2 · 항정살 2", "Skin-on pork belly 2 · Pork jowl 2", "带皮五花肉 2 · 猪颔肉 2", "皮付きサムギョプサル 2 · トントロ 2", "Thịt ba chỉ 2 · Thịt nọng heo đặc biệt 2") }),
      it(1710000, null, T("Best 3", "Best 3", "Best 3", "Best 3", "Best 3"), {
        desc: T("미박삼겹살 1 · 특목살 1 · 항정살 1 · 우대갈비 1", "Skin-on pork belly 1 · Pork neck (special cut) 1 · Pork jowl 1 · Beef short rib (bone-in) 1", "带皮五花肉 1 · 特选猪颈肉 1 · 猪颔肉 1 · 带骨牛小排 1", "皮付きサムギョプサル 1 · 特上豚ネック 1 · トントロ 1 · 骨付きカルビ 1", "Thịt ba chỉ 1 · Thịt cổ 1 · Thịt nọng heo đặc biệt 1 · Sườn non bò 1") }),
    ],
  },
  {
    id: "bbq",
    name: T("구이", "Grill", "烧烤", "焼き肉", "Thịt nướng"),
    items: [
      it(240000, "samgyeop", T("미박삼겹살", "Skin-on Pork Belly (Mibak Samgyeopsal)", "带皮五花肉", "皮付きサムギョプサル", "Thịt ba chỉ"), { tag: "must", unit: "180g" }),
      it(240000, null, T("특목살", "Pork Neck, Special Cut (Teuk Moksal)", "特选猪颈肉", "特上豚ネック", "Thịt cổ"), { unit: "180g" }),
      it(280000, null, T("항정살", "Pork Jowl (Hangjeongsal)", "猪颔肉", "トントロ(豚ほほ肉)", "Thịt nọng heo đặc biệt"), { tag: "best", unit: "150g" }),
      it(950000, null, T("우대갈비", "Beef Short Rib, Bone-in (Udaegalbi)", "带骨牛小排", "骨付きカルビ", "Sườn non bò"), { desc: T("1대", "1 rib", "1根", "1本", "1 miếng sườn") }),
      it(900000, null, T("갈비본살", "Boneless Beef Short Rib (Galbi Bonsal)", "无骨牛小排", "骨なしカルビ", "Thịt sườn bò không xương"), { tag: "best", unit: "180g" }),
      it(100000, null, T("미나리", "Water Dropwort (Minari)", "水芹菜", "セリ", "Rau cần nước")),
    ],
  },
  {
    id: "side",
    name: T("사이드 메뉴", "Side Dishes", "小食", "サイドメニュー", "Món phụ"),
    items: [
      it(160000, "naengmyeon", T("냉면", "Cold Noodles (Naengmyeon)", "冷面", "冷麺", "Mì lạnh"), { tag: "best" }),
      it(160000, null, T("비빔냉면", "Spicy Mixed Cold Noodles (Bibim Naengmyeon)", "拌冷面", "ビビン冷麺", "Mì lạnh trộn"), { spicy: true }),
      it(140000, null, T("도가니 된장찌개", "Soybean Paste Stew with Beef Knee Cartilage (Doganni Doenjang Jjigae)", "牛膝软骨大酱汤", "牛すじ入りテンジャンチゲ", "Canh đậu tương gân bò")),
      it(140000, "kimchijjigae", T("돼지김치찌개", "Pork Kimchi Stew (Kimchi Jjigae)", "猪肉泡菜汤", "豚キムチチゲ", "Canh kimchi thịt heo"), { tag: "best", spicy: true }),
      it(20000, null, T("한국쌀밥", "Steamed Korean Rice", "韩国米饭", "韓国ご飯", "Cơm trắng")),
      it(80000, "sotbap", T("솥뚜껑볶음밥", "Fried Rice on Cauldron Lid (Sotttukkeong Bokkeumbap)", "锅盖炒饭", "釜蓋チャーハン", "Cơm chiên nắp gang")),
      it(60000, "gyeranjjim", T("계란찜", "Steamed Egg (Gyeran Jjim)", "蒸蛋", "韓国式茶碗蒸し", "Trứng hấp"), { tag: "best" }),
    ],
  },
  {
    id: "ramyun",
    name: T("라면", "Ramyeon", "拉面", "ラーメン", "Mì Hàn Quốc"),
    items: [
      it(100000, null, T("신라면", "Shin Ramyun", "辛拉面", "辛ラーメン", "Mì Shin"), { spicy: true }),
      it(100000, null, T("너구리", "Neoguri", "乌冬拉面 (Neoguri)", "ノグリ", "Mì Neoguri")),
      it(100000, null, T("짜파게티", "Chapaghetti", "炸酱面 (Chapaghetti)", "チャパゲティ", "Mì đen Chapagetti")),
      it(100000, null, T("팔도비빔면", "Paldo Bibim Men", "八道拌面", "パルドビビン麺", "Mì trộn Paldo"), { spicy: true }),
      it(100000, null, T("불닭볶음면", "Buldak Spicy Chicken Ramen", "火鸡面", "ブルダック炒め麺", "Mì Gà cay"), { spicy: true }),
    ],
  },
  {
    id: "soju",
    name: T("소주", "Soju", "烧酒", "焼酎", "Soju"),
    items: [
      it(150000, null, T("참이슬", "Chamisul", "Chamisul", "チャミスル", "Chamisul")),
      it(150000, null, T("좋은데이", "Good Day", "好日子 (Good Day)", "チョウンデイ", "Good Day")),
      it(150000, null, T("처음처럼", "Chum-churum", "初饮初乐 (Chum-churum)", "チョウムチョロム", "Chum-churum")),
      it(150000, null, T("진로", "Jinro", "Jinro 真露", "ジンロ", "Jinro")),
      it(150000, null, T("새로", "Saero", "新乐 (Saero)", "セロ", "Saero")),
      it(180000, null, T("한라산", "Hallasan", "汉拿山", "ハルラサン", "Hallasan")),
      it(180000, null, T("별빛청하", "Chungha Sparkling", "星光清河 (气泡)", "ピョルビッチョンハ", "Chungha Sparkling")),
      it(180000, null, T("청하", "Chungha", "清河", "チョンハ", "Chungha")),
      it(150000, null, T("과일소주 (블루베리 · 청포도 · 딸기 · 복숭아)", "Fruit Soju (Blueberry · Green Grape · Strawberry · Peach)", "水果烧酒 (蓝莓 · 青葡萄 · 草莓 · 水蜜桃)", "フルーツ焼酎 (ブルーベリー · 青ブドウ · いちご · もも)", "Soju trái cây (Việt quất · Nho xanh · Dâu · Đào)")),
    ],
  },
  {
    id: "liquor",
    name: T("전통주", "Traditional Korean Liquor", "韩国传统酒", "韓国伝統酒", "Rượu truyền thống Hàn Quốc"),
    items: [
      it(400000, null, T("복분자", "Black Raspberry Wine (Bokbunja)", "覆盆子酒 (Bokbunja)", "覆盆子酒 (ポクブンジャ)", "Rượu phúc bồn tử (Bokbunja)")),
      it(180000, null, T("국순당 생막걸리", "Original Makgeolli", "麴醇堂 生米酒", "麹醇堂 生マッコリ", "Makgeolli gạo nguyên bản (Kooksoondang)")),
      it(180000, null, T("국순당 밤막걸리", "Chestnut Makgeolli", "麴醇堂 栗子米酒", "麹醇堂 栗マッコリ", "Makgeolli hạt dẻ (Kooksoondang)")),
      it(180000, null, T("국순당 복숭아막걸리", "Peach Makgeolli", "麴醇堂 水蜜桃米酒", "麹醇堂 桃マッコリ", "Makgeolli đào (Kooksoondang)")),
      it(180000, null, T("국순당 딸기막걸리", "Strawberry Makgeolli", "麴醇堂 草莓米酒", "麹醇堂 いちごマッコリ", "Makgeolli dâu (Kooksoondang)")),
      it(450000, null, T("화요 17도", "Hwayo Soju 17", "火尧 17度", "火堯 17度", "Hwayo Soju 17 độ")),
      it(600000, null, T("화요 25도", "Hwayo Soju 25", "火尧 25度", "火堯 25度", "Hwayo Soju 25 độ")),
    ],
  },
  {
    id: "beer",
    name: T("맥주", "Beer", "啤酒", "ビール", "Bia"),
    items: [
      it(40000, null, T("맥주 (타이거 · 사이공)", "Beer (Tiger · Saigon)", "啤酒 (虎牌 · 西贡)", "ビール (タイガー · サイゴン)", "Bia (Tiger · Sài Gòn)")),
      it(60000, null, T("맥주 (하이네켄 실버)", "Beer (Heineken Silver)", "啤酒 (喜力银)", "ビール (ハイネケン シルバー)", "Bia (Heineken Silver)")),
      it(60000, null, T("생맥주 (삿포로)", "Draft Beer (Sapporo)", "生啤 (札幌)", "生ビール (サッポロ)", "Bia tươi (Sapporo)"), { unit: "330cc" }),
    ],
  },
  {
    id: "drink",
    name: T("음료", "Soft Drinks", "饮料", "ドリンク", "Nước giải khát"),
    items: [
      it(30000, null, T("콜라 · 제로콜라", "Coke · Zero Coke", "可乐 · 零度可乐", "コーラ · コーラゼロ", "Coca · Coca Zero")),
      it(30000, null, T("소다", "Soda", "苏打水", "ソーダ", "Soda")),
      it(30000, null, T("스프라이트", "Sprite", "雪碧", "スプライト", "Sprite")),
      it(30000, null, T("환타 (오렌지 · 포도)", "Fanta (Orange · Grape)", "芬达 (橙子 · 葡萄)", "ファンタ (オレンジ · ぶどう)", "Fanta (Cam · Nho)")),
      it(30000, null, T("스팅 에너지 (딸기)", "Sting Energy (Strawberry)", "Sting能量饮料 (草莓味)", "スティング エナジー (いちご)", "Sting (Dâu)")),
    ],
  },
];
