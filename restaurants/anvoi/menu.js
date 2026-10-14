// Ăn Vội — Mì Trộn Siu Dính 메뉴 데이터
// 메뉴/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND
// prices: [Indomie, Koreno] 두 가지 가격 / price: 한 가지 가격 / priceText: 범위 가격
// photo: 메뉴 사진 (img/ 폴더). 없으면 생략
window.RESTAURANT = {
  brand: "Ăn Vội",
  tagline: "Mì Trộn Siu Dính",
  phones: ["0969 092 694", "0944 837 894"],
  zalo: "0969092694",   // Zalo 주문 받을 번호 (컵·간판에 적힌 번호)
  address: "157/45 Hùng Vương, Quảng Ngãi",
  mapUrl: null,     // 구글 지도 링크가 있으면 넣기 (없으면 주소로 검색)
  wifi: null,       // 예: { ssid: "An Voi", password: "12345678" } (null이면 숨김)
};

const NOODLE_COLS = ["Indomie", "Koreno"];

window.MENU = [
  {
    id: "noodles",
    photo: "img/mi-thanh-cua.jpg",
    cols: NOODLE_COLS,
    name: { ko: "비빔면", en: "Mixed Noodles", zh: "拌面", ja: "まぜ麺", vi: "Mì trộn" },
    notes: [
      { ko: "비빔면 한 그릇마다 음료 무료 (면 메뉴만)", en: "Free soft drink with every noodle bowl (noodles only)", zh: "每份拌面赠送汽水一瓶（仅限面类）", ja: "まぜ麺1杯ごとにソフトドリンク無料（麺のみ）", vi: "Tặng kèm nước ngọt mỗi phần mì (chỉ kèm mì)" },
      { ko: "면 3개 초과 주문 시 그릇당 3,000đ 추가", en: "+3,000đ per bowl when ordering more than 3 noodle packs", zh: "点超过3包面时每碗加收3,000đ", ja: "麺3玉を超える場合は1杯につき+3,000đ", vi: "Phụ thu 3.000đ/tô nếu gọi trên 3 gói mì" },
    ],
    items: [
      { prices: [25000, 35000], photo: "img/mi-trung.jpg", name: { ko: "계란 비빔면", en: "Egg Noodles", zh: "鸡蛋拌面", ja: "卵のまぜ麺", vi: "Mì Trứng" } },
      { prices: [32000, 40000], name: { ko: "소시지 비빔면", en: "Sausage Noodles", zh: "香肠拌面", ja: "ソーセージまぜ麺", vi: "Mì Xúc Xích" } },
      { prices: [32000, 40000], photo: "img/mi-ca-vien.jpg", name: { ko: "튀긴 어묵볼 비빔면", en: "Fried Fish Ball Noodles", zh: "炸鱼丸拌面", ja: "揚げ魚団子のまぜ麺", vi: "Mì Cá Viên Chiên" } },
      { prices: [32000, 40000], photo: "img/mi-vien-cam-mayo.jpg", name: { ko: "어묵볼 오렌지 마요 비빔면", en: "Fish Balls in Orange Mayo", zh: "橙味蛋黄酱丸子拌面", ja: "団子のオレンジマヨまぜ麺", vi: "Mì Viên Sốt Cam Mayo" } },
      { prices: [32000, 40000], name: { ko: "회오리 오징어 비빔면", en: "Spiral Squid Noodles", zh: "螺旋鱿鱼拌面", ja: "くるくるイカのまぜ麺", vi: "Mì Mực Xoắn" } },
      { prices: [32000, 40000], photo: "img/mi-tom-surimi.jpg", name: { ko: "새우 어묵 비빔면", en: "Surimi Shrimp Noodles", zh: "虾形鱼糜拌面", ja: "エビ風かまぼこのまぜ麺", vi: "Mì Tôm Surimi" } },
      { prices: [32000, 40000], name: { ko: "훠궈 완자 비빔면", en: "Hot-pot Ball Noodles", zh: "火锅丸拌面", ja: "鍋の具のまぜ麺", vi: "Mì Thả Lẩu" } },
      { prices: [32000, 40000], photo: "img/mi-mix.jpg", name: { ko: "믹스 비빔면", en: "Mix Noodles", zh: "综合拌面", ja: "ミックスまぜ麺", vi: "Mì Mix" },
        desc: { ko: "튀긴 어묵볼, 마요, 오징어, 새우, 훠궈 완자", en: "Fried fish balls, mayo, squid, shrimp, hot-pot balls", zh: "炸鱼丸、蛋黄酱、鱿鱼、虾、火锅丸", ja: "揚げ魚団子・マヨ・イカ・エビ・鍋の具", vi: "Cá viên chiên, mayo, mực, tôm, thả lẩu" } },
      { prices: [35000, 43000], photo: "img/mi-thanh-cua.jpg", name: { ko: "게맛살 비빔면", en: "Crab Stick Noodles", zh: "蟹柳拌面", ja: "カニカマのまぜ麺", vi: "Mì Thanh Cua" } },
      { prices: [50000, 55000], hot: true, name: { ko: "모둠 비빔면", en: "Deluxe Combo Noodles", zh: "什锦拌面", ja: "全部のせまぜ麺", vi: "Mì Thập Cẩm" },
        desc: { ko: "믹스, 계란, 소시지, 게맛살", en: "Mix, egg, sausage, crab stick", zh: "综合、鸡蛋、香肠、蟹柳", ja: "ミックス・卵・ソーセージ・カニカマ", vi: "Mì mix, trứng, xúc xích, thanh cua" } },
      { prices: [37000, 45000], photo: "img/mi-bo-trung.jpg", name: { ko: "소고기 계란 비빔면", en: "Beef & Egg Noodles", zh: "牛肉鸡蛋拌面", ja: "牛肉と卵のまぜ麺", vi: "Mì Bò Trứng" } },
      { prices: [40000, 48000], photo: "img/mi-thit-ap-chao.jpg", name: { ko: "버터 구운 고기 & 계란 비빔면", en: "Butter Pan-seared Meat & Egg", zh: "黄油煎肉鸡蛋拌面", ja: "バター焼き肉と卵のまぜ麺", vi: "Mì Thịt Áp Chảo Bơ Trứng" } },
      { prices: [70000, 78000], hot: true, name: { ko: "슈퍼 토핑 비빔면 (면 2개)", en: "Super Topping Noodles (2 packs)", zh: "超级配料拌面（2份面）", ja: "スーパートッピング（麺2玉）", vi: "Mì Siêu Topping (2 mì)" },
        desc: { ko: "토핑 전부 · Koreno는 매장 식사만", en: "All toppings · Koreno for dine-in only", zh: "全配料 · Koreno仅限堂食", ja: "全トッピング・Korenoは店内のみ", vi: "Đầy đủ topping · Koreno chỉ ăn tại chỗ" } },
    ],
  },
  {
    id: "combo",
    photo: "img/banner-combo.jpg",
    name: { ko: "콤보", en: "Combos", zh: "套餐", ja: "コンボ", vi: "Combo" },
    items: [
      { price: 69000, name: { ko: "콤보 69K", en: "Combo 69K", zh: "套餐 69K", ja: "コンボ 69K", vi: "Combo 69K" },
        list: [
          { ko: "믹스 비빔면 1 (Indomie, 토핑 5종)", en: "1 Mix noodles, 5 toppings (Indomie)", zh: "综合拌面1份（5种配料，Indomie）", ja: "ミックスまぜ麺1（5種、Indomie）", vi: "1 Mì mix 5 loại (Indomie)" },
          { ko: "치킨볼 1 (맛 선택)", en: "1 Chicken bites (any flavor)", zh: "鸡肉丸1份（任选口味）", ja: "チキンボール1（味は自由）", vi: "1 Gà (chọn vị bất kỳ)" },
          { ko: "음료 500ml 1", en: "1 Soft drink 500ml", zh: "汽水500ml 1瓶", ja: "ソフトドリンク500ml 1本", vi: "1 Nước ngọt 500ml" },
        ] },
      { price: 135000, name: { ko: "콤보 135K", en: "Combo 135K", zh: "套餐 135K", ja: "コンボ 135K", vi: "Combo 135K" },
        list: [
          { ko: "모둠 비빔면 1 (Indomie)", en: "1 Deluxe combo noodles (Indomie)", zh: "什锦拌面1份（Indomie）", ja: "全部のせまぜ麺1（Indomie）", vi: "1 Mì thập cẩm (Indomie)" },
          { ko: "3가지 맛 치킨볼 + 밥 1", en: "1 Three-flavor chicken bites + rice", zh: "三味鸡肉丸配米饭1份", ja: "3種チキンボール＋ご飯1", vi: "1 Gà mix 3 vị kèm cơm" },
          { ko: "음료 500ml 2", en: "2 Soft drinks 500ml", zh: "汽水500ml 2瓶", ja: "ソフトドリンク500ml 2本", vi: "2 Nước ngọt 500ml" },
        ] },
      { price: 199000, hot: true, name: { ko: "콤보 199K", en: "Combo 199K", zh: "套餐 199K", ja: "コンボ 199K", vi: "Combo 199K" },
        list: [
          { ko: "비빔면 2 (자유 선택, Indomie)", en: "2 Noodles of your choice (Indomie)", zh: "自选拌面2份（Indomie）", ja: "まぜ麺2（自由に選択、Indomie）", vi: "2 Mì tự chọn (Indomie)" },
          { ko: "3가지 맛 치킨볼 + 밥 1", en: "1 Three-flavor chicken bites + rice", zh: "三味鸡肉丸配米饭1份", ja: "3種チキンボール＋ご飯1", vi: "1 Gà mix 3 vị kèm cơm" },
          { ko: "음료 500ml 2", en: "2 Soft drinks 500ml", zh: "汽水500ml 2瓶", ja: "ソフトドリンク500ml 2本", vi: "2 Nước ngọt 500ml" },
          { ko: "금귤 매실차 1", en: "1 Kumquat tea with salted plum", zh: "金桔话梅茶1杯", ja: "金柑と話梅のお茶1", vi: "1 Trà tắc xí muội" },
        ],
        desc: { ko: "소고기 계란·슈퍼 토핑 비빔면은 선택 불가", en: "Beef & egg and Super topping noodles not included", zh: "不适用牛肉鸡蛋拌面和超级配料拌面", ja: "牛肉と卵・スーパートッピングは対象外", vi: "Không áp dụng mì bò trứng & mì siêu topping" } },
    ],
  },
  {
    id: "topping",
    name: { ko: "토핑 추가", en: "Extra Toppings", zh: "加料", ja: "トッピング追加", vi: "Topping" },
    items: [
      { prices: [8000, 13000], cols: NOODLE_COLS, name: { ko: "면 추가", en: "Extra Noodles", zh: "加面", ja: "麺追加", vi: "Mì Thêm" },
        desc: { ko: "소스 포함 · 채소 없음", en: "With sauce · no vegetables", zh: "含酱料 · 不含蔬菜", ja: "ソース付き・野菜なし", vi: "Có sốt · không rau củ" } },
      { price: 8000, name: { ko: "소시지", en: "Sausage", zh: "香肠", ja: "ソーセージ", vi: "Xúc Xích" } },
      { price: 10000, name: { ko: "게맛살", en: "Crab Stick", zh: "蟹柳", ja: "カニカマ", vi: "Thanh Cua" } },
      { price: 5000, name: { ko: "튀긴 어묵볼", en: "Fried Fish Balls", zh: "炸鱼丸", ja: "揚げ魚団子", vi: "Viên Chiên" } },
      { price: 3000, name: { ko: "새우 어묵", en: "Surimi Shrimp", zh: "虾形鱼糜", ja: "エビ風かまぼこ", vi: "Tôm Surimi" } },
      { price: 3000, name: { ko: "회오리 오징어 / 마요", en: "Spiral Squid / Mayo", zh: "螺旋鱿鱼 / 蛋黄酱", ja: "くるくるイカ／マヨ", vi: "Mực Xoắn / Mayo" } },
      { price: 4000, name: { ko: "훠궈 완자", en: "Hot-pot Balls", zh: "火锅丸", ja: "鍋の具", vi: "Thả Lẩu" } },
      { price: 7000, name: { ko: "버터 계란프라이", en: "Butter-fried Egg", zh: "黄油煎蛋", ja: "バター目玉焼き", vi: "Trứng Ốp Bơ" },
        desc: { ko: "식용유 없이 버터로", en: "No cooking oil, butter only", zh: "不用食用油", ja: "サラダ油不使用", vi: "Không dầu ăn" } },
      { price: 15000, name: { ko: "버터 구운 고기 (1장)", en: "Butter Pan-seared Meat (1 slice)", zh: "黄油煎肉（1片）", ja: "バター焼き肉（1枚）", vi: "Thịt Áp Chảo Chiên Bơ (1 lát)" } },
      { price: 12000, name: { ko: "다진 소고기", en: "Minced Beef", zh: "牛肉末", ja: "牛ひき肉", vi: "Thịt Bò Bằm" } },
      { price: 5000, name: { ko: "채소", en: "Vegetables", zh: "蔬菜", ja: "野菜", vi: "Rau Củ" } },
      { priceText: "2.000 – 7.000", photo: "img/phomai.jpg", name: { ko: "치즈 추가", en: "Extra Cheese", zh: "加芝士", ja: "チーズ追加", vi: "Phô Mai Thêm" },
        desc: { ko: "요청하시면 치즈 1스푼 무료", en: "1 spoon of cheese free on request", zh: "需要时免费赠送1勺芝士", ja: "ご希望でチーズ1杯無料", vi: "Tặng 1 muỗng phô mai khi khách yêu cầu" } },
    ],
  },
  {
    id: "drinks",
    name: { ko: "음료", en: "Drinks", zh: "饮料", ja: "ドリンク", vi: "Đồ uống" },
    items: [
      { priceText: "7.000 – 12.000", name: { ko: "태국 탄산음료", en: "Thai Soft Drinks", zh: "泰国汽水", ja: "タイのソフトドリンク", vi: "Nước Ngọt Thái" } },
      { prices: [5000, 10000], cols: ["500ml", "700ml"], name: { ko: "음료 사이즈 업", en: "Drink Upsize", zh: "饮料加大", ja: "ドリンクサイズアップ", vi: "Upsize Nước" } },
    ],
  },
];

// 하단 안내 (배달 등)
window.EXTRA = {
  delivery: { ko: "50,000đ 이상 배달 가능 (배달비 5,000đ부터)", en: "Delivery for orders from 50,000đ (fee from 5,000đ)", zh: "满50,000đ可外送（运费5,000đ起）", ja: "50,000đ以上で配達可（配達料5,000đ〜）", vi: "Nhận ship đơn từ 50.000đ (phí ship từ 5.000đ)" },
  takeaway: { ko: "포장 시 음료 + 물티슈 세트", en: "Takeaway comes with a drink + wet wipes", zh: "外带附饮料和湿巾", ja: "持ち帰りはドリンク＋おしぼり付き", vi: "Combo nước + khăn ướt mang đi" },
  homemade: { ko: "직접 만든 특제 소스", en: "Signature homemade sauce", zh: "自家特制酱料", ja: "自家製の特製ソース", vi: "Sốt đặc trưng nhà làm" },
  school: { ko: "학교·인근 단체 주문 – 배달비 무료", en: "Group orders for schools & nearby – free delivery", zh: "学校及附近团购 – 免运费", ja: "学校・近隣のまとめ注文 – 配達無料", vi: "Gom đơn trường học và lân cận - miễn phí ship" },
};
