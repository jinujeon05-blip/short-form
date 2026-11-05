// 현대갈비 Hyundai Galbi 메뉴 데이터 — 가게 찾기용(사장님 동의·비용 없음)
// 출처: 구글 지도 메뉴판 사진 20장(2026-11-05 수집, 올린 날짜 미상, 안티그래비티 읽기+Claude Sonnet 재대조)
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
window.RESTAURANT = {
  brand: { ko: "현대갈비", en: "Hyundai Galbi" },
  phone: "0969 607 177",
  address: "SH05.ĐN2, SH06.ĐN2, kiot 03 toà CT4, khu đô thị Mỹ Đình Sông Đà, Từ Liêm, Hà Nội",
  wifi: null,
  hours: { ko: "11:30 – 14:00 / 17:00 – 22:00", en: "11:30 – 14:00 / 17:00 – 22:00", zh: "11:30 – 14:00 / 17:00 – 22:00", ja: "11:30 – 14:00 / 17:00 – 22:00", vi: "11:30 – 14:00 / 17:00 – 22:00" },
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price: price ?? null, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });
const G = (n) => T(`${n}g`, `${n}g`, `${n}克`, `${n}g`, `${n}g`);

window.MENU = [
  {
    id: "beef",
    name: T("소고기 구이", "GRILLED BEEF", "烤牛肉", "牛肉の焼肉", "THỊT BÒ NƯỚNG"),
    items: [
      it(630000, null, "현대 전통 양념갈비", "Modern Korean-Style Marinated Short Ribs", "现代传统腌制排骨", "ヒョンデ伝統味付けカルビ", "Sườn bò ướp sốt truyền thống Hàn Quốc", { tag: "special", desc: G(220) }),
      it(630000, null, "1960 생갈비", "Saeng Galbi 1960 (Fresh Beef Rib)", "1960生排骨（Saeng Galbi 1960）", "1960生カルビ（セン・カルビ）", "Sườn tươi cắt 1960", { desc: G(200) }),
      it(580000, null, "안동식 안창살", "Andong-Style Beef Thin Skirt", "安东式牛横隔膜肉", "安東式ハラミ（アンチャンサル）", "Diềm thăn bò", { desc: G(130) }),
      it(350000, null, "우설", "Wu Seol (Grilled Beef Tongue)", "烤牛舌（Useol）", "牛タン焼き（ウソル）", "Lưỡi bò nướng", { desc: G(100) }),
      it(1100000, null, "프리미엄 특생갈비", "Premium Galbi (Prime Beef Rib)", "顶级特选生排骨", "プレミアム特上生カルビ", "Sườn tươi hảo hạng", { tag: "best", desc: G(200) }),
      it(950000, null, "수원 왕갈비", "Suwon Marinated Grilled Beef Galbi", "水原王排骨（Suwon Wang Galbi）", "水原王カルビ（スウォン・ワンカルビ）", "Sườn hoàng đế Suwon", { desc: G(230) }),
    ],
  },
  {
    id: "eel",
    name: T("장어", "GRILLED EEL", "鳗鱼", "うなぎ", "CÁ CHÌNH NƯỚNG"),
    note: T("장어구이 1마리 이상 주문 시 장어탕을 드려요. 소금·고추장 반반 선택 가능.", "Order one whole grilled eel or more and get eel stew included. You can choose half salt, half red chili paste.", "点烤鳗鱼1条以上，赠送鳗鱼汤。可选一半盐烤、一半辣椒酱。", "うなぎの焼き物を1匹以上ご注文で、うなぎ湯（タン）をサービスします。塩とコチュジャンを半分ずつ選べます。", "Gọi từ 1 con cá chình nướng trở lên được tặng canh cá chình. Có thể chọn một nửa muối, một nửa tương ớt."),
    items: [
      it(null, null, "장어구이 (소금, 고추장)", "Grilled Eel (Salted, Red Chili Paste)", "烤鳗鱼（盐烤、辣椒酱）", "うなぎ焼き（塩・コチュジャン）", "Cá chình nướng (muối, tẩm gia vị)", {
        sizes: [["1마리", 1400000], ["반마리", 720000]],
      }),
      it(200000, null, "장어탕", "Spicy Eel Stew", "鳗鱼汤", "うなぎ湯（チャンオタン）", "Canh cá chình", { desc: T("장어 뼈를 6시간 끓인 얼큰한 탕", "Eel bones simmered for 6 hours", "鳗鱼骨熬煮6小时的香辣汤", "うなぎの骨を6時間煮込んだピリ辛スープ", "Xương cá chình ninh 6 tiếng") }),
    ],
  },
  {
    id: "signature",
    name: T("특선요리", "SIGNATURE DISHES", "特色料理", "特選料理", "MÓN ĐẶC BIỆT"),
    items: [
      it(550000, null, "낙지볶음", "Spicy Stir-Fried Octopus", "辣炒小章鱼", "ナクチポックム（テナガダコの辛炒め）", "Bạch tuộc xào cay", { spicy: true }),
      it(420000, null, "채끝 양송이 탕수육", "Beef Tang Su Yuk (Sweet and Sour Beef)", "牛里脊口蘑糖醋肉", "牛サーロインとマッシュルームの酢豚風（タンスユク）", "Tang su yuk bò (bò chua ngọt)"),
      it(380000, null, "문어 카르파치오", "Octopus Carpaccio", "章鱼卡帕奇欧", "タコのカルパッチョ", "Salad bạch tuộc"),
      it(360000, "pajeon", "바싹 새우 미나리전", "Crispy Shrimp-Parsley Pancake", "香脆虾仁芹菜煎饼", "カリカリ海老とセリのチヂミ", "Bánh xèo kiểu Hàn tôm rau cần nước giòn"),
    ],
  },
  {
    id: "fresh",
    name: T("신선요리", "FRESH DISHES", "新鲜料理", "新鮮料理", "MÓN TƯƠI"),
    items: [
      it(490000, "chungmu", "육회 + 충무김밥", "Hanwoo Beef Tartare + Chungmu Kimbap", "生拌牛肉（육회）+ 忠武紫菜饭卷", "ユッケ＋忠武キンパ（チュンムキンパ）", "Gỏi bò sống + Chungmu kimbap", { desc: T("육회와 함께 곁들여 먹는 꼬마김밥", "Mini kimbap served with the beef tartare", "搭配生拌牛肉食用的迷你紫菜饭卷", "ユッケと一緒に食べる小さなのり巻き", "Kimbap mini ăn kèm gỏi bò") }),
      it(380000, "yukhoe", "육회", "Beef Tartare", "生拌牛肉（육회）", "ユッケ", "Gỏi bò"),
    ],
  },
  {
    id: "meals",
    name: T("식사", "MEALS", "主食", "お食事", "MÓN ĂN CHÍNH"),
    items: [
      it(250000, null, "갈비탕", "Galbitang (Beef Rib Soup)", "排骨汤", "カルビタン", "Canh sườn bò", { desc: T("왕갈빗대를 이용한 현대 시그니처 갈비탕", "Hyundai signature soup with king-size beef ribs", "选用大块排骨熬制的现代招牌排骨汤", "大きなカルビを使ったヒョンデ自慢のカルビタン", "Canh sườn bò đặc trưng của Hyundai") }),
      it(280000, null, "육개장갈비탕", "Korean-Style Spicy Beef Rib Soup", "辣牛肉排骨汤（육개장）", "ユッケジャン風カルビタン", "Canh sườn bò cay", { spicy: true }),
      it(200000, null, "순두부찌개", "Hyundai Soft Tofu Stew", "嫩豆腐汤", "スンドゥブチゲ", "Canh đậu hũ non", { spicy: true }),
      it(230000, null, "쫄면 치즈 순두부찌개", "Soft Tofu Stew with Chewy Noodles & Cheese", "芝士筋道面嫩豆腐汤", "チーズ・チョルミョン入りスンドゥブチゲ", "Canh đậu hũ non phô mai với mì dai", { spicy: true }),
      it(250000, "bibimbap", "육회 비빔밥", "Hanwoo Beef Tartare Bibimbap", "生拌牛肉拌饭", "ユッケビビンバ", "Cơm trộn gỏi bò"),
      it(250000, null, "불고기 비빔밥", "Bulgogi Bibimbap", "烤肉拌饭", "プルコギビビンバ", "Cơm trộn bulgogi"),
      it(180000, null, "김치찌개", "Kimchi Stew", "泡菜汤", "キムチチゲ", "Canh kim chi", { spicy: true }),
      it(180000, null, "갈비 된장찌개", "Soybean Stew with Beef Brisket", "排骨大酱汤", "カルビ入りテンジャンチゲ", "Canh đậu nành hầm thịt bò"),
    ],
  },
  {
    id: "noodles",
    name: T("냉면", "COLD NOODLES", "冷面", "冷麺", "MÌ LẠNH"),
    note: T("직접 만든 면으로 만든 함흥식 냉면이에요.", "Hamheung-style cold noodles made with in-house noodles.", "使用自制面条制作的咸兴式冷面。", "自家製麺で作る咸興（ハムン）式冷麺です。", "Mì lạnh kiểu Hamheung làm từ sợi mì tự làm."),
    items: [
      it(280000, null, "육회물회", "Hyundai Yukhoe Cold Soup", "生拌牛肉冷汤（육회물회）", "ユッケ・ムルフェ（牛肉の冷製スープ）", "Súp lạnh gỏi bò sống kiểu Hàn"),
      it(200000, null, "현대 함흥식 코다리냉면", "Hyundai Hamheung Cold Noodles with Raw Pollack", "现代咸兴式半干明太鱼冷面", "ヒョンデ咸興式コダリ冷麺（半干しスケトウダラ入り）", "Mì lạnh Hamheung cá minh thái bán khô", { spicy: true }),
      it(180000, "naengmyeon", "현대 함흥식 물냉면", "Hyundai Hamheung Cold Noodle Soup", "现代咸兴式水冷面", "ヒョンデ咸興式水冷麺（ムルネンミョン）", "Mì lạnh Hamheung nước"),
      it(180000, null, "현대 함흥식 비빔냉면", "Hyundai Hamheung Spicy Cold Noodles", "现代咸兴式拌冷面", "ヒョンデ咸興式ビビン冷麺", "Mì lạnh Hamheung trộn", { spicy: true }),
      it(20000, null, "땡초 추가", "Extra Chili (add-on)", "加辣椒（加购）", "青唐辛子トッピング（追加）", "Thêm ớt (tuỳ chọn)", { spicy: true }),
    ],
  },
  {
    id: "side",
    name: T("곁들임", "SIDE DISHES", "配菜", "サイドメニュー", "MÓN ĂN KÈM"),
    note: T("'후식' 메뉴는 식사 마무리용 작은 양이에요.", "The after-meal items are small portions to finish your meal.", "“餐后”菜品为用餐收尾的小份。", "「後食」メニューは、食事の締めにぴったりの少量サイズです。", "Các món tráng miệng là suất nhỏ để kết thúc bữa ăn."),
    items: [
      it(400000, null, "전복구이 (5pcs)", "Hyundai Butter Grilled Abalone (5 pcs)", "黄油烤鲍鱼（5只）", "アワビのバター焼き（5個）", "Bào ngư nướng bơ (5 con)"),
      it(250000, null, "전복죽", "Hyundai Abalone Porridge", "鲍鱼粥", "アワビ粥", "Cháo bào ngư"),
      it(200000, null, "갈릭버터 새우구이 (5p)", "Garlic Butter Grilled Jumbo Shrimp (5 pcs)", "蒜香黄油烤大虾（5只）", "ガーリックバター海老焼き（5尾）", "Tôm nướng bơ tỏi (5 con)"),
      it(150000, null, "시래기 볶음밥", "Fried Rice with Dried Radish Greens", "干萝卜叶炒饭", "干し大根葉のチャーハン", "Cơm rang lá củ cải sấy"),
      it(100000, null, "트리플 치즈 계란찜", "Triple Cheese Steamed Egg", "三重芝士蒸蛋", "トリプルチーズの茶碗蒸し風卵蒸し", "Trứng hấp ba loại phô mai"),
      it(140000, null, "후식 김치찌개 (소)", "After-Meal Kimchi Stew (small)", "餐后泡菜汤（小）", "後食キムチチゲ（小）", "Canh kim chi suất nhỏ", { spicy: true }),
      it(140000, null, "후식 갈비 된장찌개 (소)", "After-Meal Soybean Stew with Beef Brisket (small)", "餐后排骨大酱汤（小）", "後食カルビ入りテンジャンチゲ（小）", "Canh đậu nành hầm thịt bò suất nhỏ"),
      it(140000, null, "후식 함흥냉면 물 (소)", "After-Meal Hamheung Cold Noodle Soup (small)", "餐后咸兴水冷面（小）", "後食 咸興水冷麺（小）", "Mì lạnh Hamheung nước suất nhỏ"),
      it(140000, null, "후식 함흥냉면 비빔 (소)", "After-Meal Hamheung Spicy Cold Noodles (small)", "餐后咸兴拌冷面（小）", "後食 咸興ビビン冷麺（小）", "Mì lạnh Hamheung trộn suất nhỏ", { spicy: true }),
    ],
  },
  {
    id: "lunch",
    name: T("점심특선", "LUNCH SPECIAL", "午市特餐", "ランチ特選", "SUẤT TRƯA ĐẶC BIỆT"),
    note: T("1인 가격. 갈비류 세트는 2인 이상부터 주문 가능하고, 식사(냉면 또는 된장찌개 중 택1)가 함께 나와요.", "Price per person. Galbi sets are for 2 or more people and come with a meal (cold noodles or soybean stew).", "价格为每人份。排骨类套餐2人起点，并附主食（冷面或大酱汤二选一）。", "1人分の価格です。カルビ系セットは2名様から注文でき、お食事（冷麺またはテンジャンチゲから1つ選択）が付きます。", "Giá mỗi người. Set sườn từ 2 người trở lên, kèm 1 món ăn (mì lạnh hoặc canh đậu nành)."),
    items: [
      it(280000, null, "고등어구이 세트 (반마리) + 순두부찌개", "Boneless Grilled Mackerel Set (half) + Soft Tofu Stew", "无骨烤青花鱼套餐（半条）+ 嫩豆腐汤", "骨なし焼きサバセット（半身）＋スンドゥブチゲ", "Set cá thu nướng không xương (nửa con) + canh đậu hũ non"),
      it(290000, null, "뼈없는 갈치구이 세트 (반마리) + 순두부찌개", "Boneless Grilled Hairtail Set (half) + Soft Tofu Stew", "无骨烤带鱼套餐（半条）+ 嫩豆腐汤", "骨なし焼きタチウオセット（半身）＋スンドゥブチゲ", "Set cá hố nướng không xương (nửa con) + canh đậu hũ non"),
      it(290000, null, "돼지 갈비", "Soy-Marinated Grilled Pork Galbi", "酱腌烤猪排骨", "豚カルビ（醤油味付け焼き）", "Sườn heo tẩm gia vị ướp"),
      it(380000, null, "양념소갈비", "Suwon Marinated Grilled Beef Galbi", "腌制牛小排（양념소갈비）", "味付け牛カルビ（ヤンニョムソカルビ）", "Sườn hoàng đế Suwon"),
      it(420000, null, "생갈비살 소금구이", "Salt-Grilled Fresh Beef Short Ribs", "盐烤生牛排骨肉", "生カルビ身の塩焼き", "Thịt sườn bò tươi nướng muối"),
      it(610000, null, "1960 생갈비", "Saeng Galbi 1960 (Fresh Beef Rib)", "1960生排骨（Saeng Galbi 1960）", "1960生カルビ（セン・カルビ）", "Sườn tươi cắt 1960"),
      it(610000, null, "프리미엄 안창살", "Premium Beef Thin Skirt", "顶级牛横隔膜肉", "プレミアムハラミ（アンチャンサル）", "Diềm thăn bò"),
      it(30000, null, "쫄면 추가", "Extra Chewy Noodles (add-on)", "加筋道面（加购）", "チョルミョン追加", "Thêm mì dai (tuỳ chọn)"),
      it(30000, null, "치즈 추가", "Extra Cheese (add-on)", "加芝士（加购）", "チーズ追加", "Thêm phô mai (tuỳ chọn)"),
    ],
  },
  {
    id: "set",
    name: T("세트 메뉴", "SET MENU", "套餐", "セットメニュー", "SET MENU"),
    items: [
      it(2300000, null, "현대 프리미엄 갈비 & 새우 세트 (2인)", "Hyundai Premium Galbi & Shrimp Set (for 2)", "现代顶级排骨＆虾套餐（2人）", "ヒョンデ プレミアムカルビ＆海老セット（2名様）", "Combo thịt nướng cao cấp & tôm (cho 2 người)", {
        tag: "special",
        desc: T("행사가 · 프리미엄 금생갈비 + 현대 전통 양념갈비 + 꽃살 + 새우 5마리", "Special price · Premium Galbi + Modern Marinated Short Ribs + Beef Ribeye Cap + 5 shrimp", "活动价 · 顶级特选生排骨 + 现代传统腌制排骨 + 花肉 + 5只虾", "特別価格 · プレミアム生カルビ＋ヒョンデ伝統味付けカルビ＋ハナサル（リブアイキャップ）＋海老5尾", "Giá khuyến mãi · Sườn cao cấp + sườn ướp truyền thống + thịt hoa bò + 5 con tôm"),
      }),
    ],
  },
  {
    id: "liquor",
    name: T("주류", "ALCOHOLIC BEVERAGES", "酒类", "アルコール", "ĐỒ UỐNG CÓ CỒN"),
    note: T("하이볼은 산토리 위스키만 사용해요. 외부 주류 반입 시 콜키지 비용이 있어요.", "Highballs use Suntory whisky only. A corkage fee applies to outside bottles.", "威士忌highball只使用三得利威士忌。自带酒水需收开瓶费。", "ハイボールはサントリーウイスキーのみ使用しています。お酒の持ち込みはコルケージ料がかかります。", "Highball chỉ dùng whisky Suntory. Mang rượu ngoài vào sẽ tính phí corkage."),
    items: [
      it(180000, null, "막걸리", "Makgeolli", "马格利酒（米酒）", "マッコリ", "Rượu gạo"),
      it(150000, null, "참이슬", "Chamisul", "真露烧酒（Chamisul）", "チャミスル", "Soju Chamisul"),
      it(150000, null, "진로", "Jinro Is Back", "真露复古烧酒（Jinro）", "ジンロ イズバック", "Soju Jinro Is Back"),
      it(150000, null, "새로", "Saero", "新露烧酒（Saero）", "セロ", "Soju Saero"),
      it(150000, null, "처음처럼", "Chum Churum", "初饮初乐烧酒（Chum Churum）", "チョウムチョロム", "Soju Chum Churum"),
      it(120000, null, "오리지널 하이볼", "Original Highball", "原味highball", "オリジナルハイボール", "Highball nguyên bản"),
      it(140000, null, "매실 하이볼", "Plum Highball", "青梅highball", "梅ハイボール", "Highball mận"),
      it(140000, null, "얼그레이 하이볼", "Earl Grey Highball", "伯爵茶highball", "アールグレイハイボール", "Highball trà Bá Tước"),
      it(100000, null, "삿포로 흑 생맥주", "Sapporo Draft Beer (Black)", "札幌黑生啤", "サッポロ黒生ビール", "Bia tươi đen Sapporo"),
      it(70000, null, "삿포로 생맥주", "Sapporo Draft Beer", "札幌生啤", "サッポロ生ビール", "Bia tươi vàng Sapporo"),
      it(70000, null, "하이네켄 0.0", "Heineken 0.0 (non-alcoholic)", "喜力0.0（无酒精）", "ハイネケン 0.0（ノンアルコール）", "Bia Heineken không cồn"),
      it(60000, null, "타이거 병맥주", "Tiger Beer (bottle)", "虎牌瓶装啤酒", "タイガービール（瓶）", "Bia chai Tiger"),
      it(60000, null, "사이공 병맥주", "Saigon Beer (bottle)", "西贡瓶装啤酒", "サイゴンビール（瓶）", "Bia chai Sài Gòn"),
      it(800000, null, "일품진로", "Ilpoom Jinro Premium Soju", "一品真露高级烧酒（Ilpoom Jinro）", "一品ジンロ（プレミアム焼酎）", "Soju Jinro Ilpoom"),
      it(350000, null, "화요 17도", "Hwayo 17 Premium Soju", "火曜17度烧酒（Hwayo 17）", "火曜（ファヨ）17度", "Rượu Hwayo 17 độ"),
      it(350000, null, "보해 복분자", "Bohae Bokbunja (Black Raspberry Wine)", "宝海覆盆子酒（Bohae Bokbunja）", "保海 覆盆子酒（ポヘ・ボクブンジャ）", "Rượu Hàn Quốc Bok Bun Ja"),
      it(200000, null, "백세주", "Baekseju", "百岁酒（Baekseju）", "百歳酒（ペクセジュ）", "Rượu sâm Hàn Quốc Baekseju"),
      it(500000, null, "콜키지 · 양주, 꼬냑", "Corkage · Whisky, Cognac", "开瓶费 · 洋酒、干邑", "持ち込み料 · ウイスキー・コニャック", "Corkage · Whisky, Cognac"),
      it(300000, null, "콜키지 · 와인, 로컬 주류", "Corkage · Wine, Local Spirits", "开瓶费 · 葡萄酒、本地酒类", "持ち込み料 · ワイン・現地のお酒", "Corkage · Rượu vang, rượu Việt Nam"),
    ],
  },
  {
    id: "drinks",
    name: T("음료", "SOFT DRINKS & JUICE", "饮料", "ドリンク", "NƯỚC GIẢI KHÁT & NƯỚC ÉP"),
    items: [
      it(60000, null, "오렌지 생과일 주스", "Fresh Orange Juice", "鲜榨橙汁", "生オレンジジュース", "Nước cam"),
      it(60000, null, "패션후르츠 생과일 주스", "Fresh Passion Fruit Juice", "鲜榨百香果汁", "生パッションフルーツジュース", "Nước chanh leo"),
      it(50000, null, "라임 생과일 주스", "Fresh Lime Juice", "鲜榨青柠汁", "生ライムジュース", "Nước chanh"),
      it(30000, null, "코카콜라", "Coca-Cola", "可口可乐", "コカ・コーラ", "Coca-Cola"),
      it(30000, null, "제로 콜라", "Coca-Cola Zero", "零度可口可乐", "コカ・コーラ ゼロ", "Coca-Cola Zero"),
      it(30000, null, "스프라이트", "Sprite", "雪碧", "スプライト", "Sprite"),
      it(30000, null, "환타", "Fanta", "芬达", "ファンタ", "Fanta"),
      it(20000, null, "제주삼다수", "Jeju Samdasoo (water)", "济州三多水（矿泉水）", "済州サムダス（ミネラルウォーター）", "Nước suối Jeju Samdasoo"),
      it(70000, null, "페리에", "Perrier (sparkling water)", "巴黎水（气泡水）", "ペリエ（炭酸水）", "Nước khoáng có gas Perrier"),
    ],
  },
];
