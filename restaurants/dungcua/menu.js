// 해산물 식당 중꾸아 Dung Cua (21C4 Trần Quốc Toản, Kinh Bắc, Bắc Ninh) 메뉴 데이터
// ※ 가게 찾기용(손님 검색용, 사장님 동의·비용 없음): 메뉴 보기만. 장바구니·Zalo 주문 없음. 가격 단위: VND
// 원본: 구글 드라이브 "hải sản Dung Cua" 폴더의 구글 지도 메뉴판 사진 32장(가게 계정 3장 포함: 시세표 5종·조리법 메뉴판·영수증·태블릿 화면). 올린 날짜는 모름.
// 해산물은 시세표(1kg·1마리 기준)라 사진마다 가격이 달라서 높은 쪽을 썼다 — 다른 값은 docs/todo.md
window.RESTAURANT = {
  brand: { ko: "중꾸아 해산물 식당", en: "Dung Cua Seafood", branch: { ko: "박닌", en: "Bắc Ninh" } },
  phone: "0766 661 999",
  address: "21C4 Trần Quốc Toản, Kinh Bắc, Bắc Ninh",
  mapQuery: "Nhà hàng hải sản Dung Cua 21C4 Trần Quốc Toản Bắc Ninh",
  wifi: null,
  hours: "09:00 – 22:30",
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, ko, en, zh, ja, vi, x = {}) => ({ price, ...(photo ? { photo: `img/${photo}.jpg` } : {}), name: { ko, en, zh, ja, vi }, ...x });

const U_kg = T("1kg", "1 kg", "1公斤", "1kg", "1kg");
const U_con = T("1마리", "1 piece", "1只", "1匹", "1 con");
const U_set = T("1세트", "1 set", "1套", "1セット", "1 set");
const U_chai = T("1병", "1 bottle", "1瓶", "1本", "1 chai");
const U_bat = T("1그릇", "1 bowl", "1碗", "1杯", "1 bát");
const U_lon = T("1캔", "1 can", "1罐", "1缶", "1 lon");
const U_dia = T("1접시", "1 plate", "1盘", "1皿", "1 đĩa");

window.MENU = [
  {
    id: "lobster",
    name: T("랍스터", "Lobster", "龙虾", "ロブスター", "Tôm hùm"),
    note: T("가격은 1kg(또는 표시한 단위) 기준 시세예요. 시세표는 날마다 바뀔 수 있어요.", "Prices are market prices per 1 kg (or the unit shown). They may change daily.", "价格为每公斤(或标注单位)的时价,每天可能变动。", "価格は1kg(または表示の単位)あたりの時価です。日によって変わることがあります。", "Giá theo thời giá cho 1kg (hoặc đơn vị ghi kèm). Bảng giá có thể thay đổi theo ngày."),
    items: [
      it(1590000, null, "알래스카 랍스터", "Alaskan lobster", "阿拉斯加龙虾", "アラスカロブスター", "Tôm hùm Alaska", { unit: U_kg, tag: "best", desc: T("조리법: 선지회·버터마늘 볶음·찜·소금 볶음·구이", "Cooking: sashimi, butter garlic stir-fry, steamed, salt stir-fry, grilled", "做法:刺身、蒜香黄油炒、清蒸、椒盐炒、烧烤", "調理法:刺身・バターガーリック炒め・蒸し・塩炒め・焼き", "Cách chế biến: sashimi, xào bơ tỏi, hấp, rang muối, nướng") }),
      it(1990000, null, "무늬 랍스터 (1~1.3kg)", "Spiny lobster (1–1.3 kg) (Tôm hùm bông)", "花龙虾 (1~1.3公斤)", "イセエビ類 (1~1.3kg)", "Tôm hùm bông (1kg–1,3kg)", { unit: U_kg }),
      it(2490000, null, "무늬 랍스터 (1.3~1.5kg)", "Spiny lobster (1.3–1.5 kg) (Tôm hùm bông)", "花龙虾 (1.3~1.5公斤)", "イセエビ類 (1.3~1.5kg)", "Tôm hùm bông (1,3kg–1,5kg)", { unit: U_kg }),
      it(2790000, "lobster", "무늬 랍스터 (1.6~1.9kg)", "Spiny lobster (1.6–1.9 kg) (Tôm hùm bông)", "花龙虾 (1.6~1.9公斤)", "イセエビ類 (1.6~1.9kg)", "Tôm hùm bông (1,6kg–1,9kg)", { unit: U_kg, tag: "must", desc: T("조리법: 찜·구이·버터마늘 볶음", "Cooking: steamed, grilled, butter garlic stir-fry", "做法:清蒸、烧烤、蒜香黄油炒", "調理法:蒸し・焼き・バターガーリック炒め", "Cách chế biến: hấp, nướng, xào bơ tỏi") }),
      it(3090000, null, "무늬 랍스터 (1.5~1.8kg)", "Spiny lobster (1.5–1.8 kg) (Tôm hùm bông)", "花龙虾 (1.5~1.8公斤)", "イセエビ類 (1.5~1.8kg)", "Tôm hùm bông (1,5kg–1,8kg)", { unit: U_kg }),
      it(3590000, null, "대형 랍스터 (2kg 이상)", "Giant lobster (over 2 kg) (Tôm hùm đại)", "大龙虾 (2公斤以上)", "大型ロブスター (2kg以上)", "Tôm hùm đại (từ 2kg)", { unit: U_kg }),
      it(1450000, null, "그린 랍스터", "Green lobster (Tôm hùm xanh)", "绿龙虾", "グリーンロブスター", "Tôm hùm xanh", { unit: U_kg }),
      it(1990000, null, "호주산 랍스터", "Australian lobster", "澳洲龙虾", "オーストラリア産ロブスター", "Tôm hùm Úc", { unit: U_kg }),
    ],
  },
  {
    id: "crab",
    name: T("게", "Crab", "螃蟹", "カニ", "Cua ghẹ"),
    note: T("킹크랩은 치즈구이·수프·전골·타마린드 볶음·갈릭버터 소스로 먹을 수 있어요.", "King crab can be served cheese-baked, as soup, in hot pot, tamarind stir-fried, or with garlic butter sauce.", "帝王蟹可做成芝士焗、汤、火锅、罗望子酱炒、蒜香黄油酱等。", "タラバガニはチーズ焼き・スープ・鍋・タマリンド炒め・ガーリックバターソースでお召し上がりいただけます。", "Cua hoàng đế có thể ăn kiểu nướng phô mai, nấu súp, lẩu, rang me hoặc sốt bơ tỏi."),
    items: [
      it(2790000, "kingcrab", "킹크랩", "King crab", "帝王蟹", "タラバガニ", "Cua hoàng đế", { unit: U_kg, tag: "best", desc: T("치즈 오븐구이·수프·전골·타마린드 볶음·갈릭버터", "Cheese oven-baked, soup, hot pot, tamarind stir-fry, garlic butter", "芝士焗烤、汤、火锅、罗望子酱炒、蒜香黄油", "チーズオーブン焼き・スープ・鍋・タマリンド炒め・ガーリックバター", "Nướng phô mai, súp, lẩu, rang me, bơ tỏi") }),
      it(2599000, null, "대게", "Snow crab (Cua tuyết)", "雪蟹", "ズワイガニ", "Cua tuyết", { unit: U_kg }),
      it(750000, null, "노르웨이 브라운크랩", "Norwegian brown crab", "挪威面包蟹", "ノルウェー産ブラウンクラブ", "Cua nâu Nauy", { unit: U_kg }),
      it(1190000, null, "일본 게 (대)", "Japanese crab (large)", "日本蟹 (大)", "日本のカニ (大)", "Cua Nhật (size to)", { unit: U_kg }),
      it(860000, null, "알배기 머드크랩", "Roe mud crab (Cua gạch)", "满黄青蟹", "卵付きマッドクラブ", "Cua gạch", { unit: U_kg }),
      it(650000, null, "살 머드크랩", "Meaty mud crab (Cua thịt)", "肉蟹", "身入りマッドクラブ", "Cua thịt", { unit: U_kg }),
      it(680000, null, "꽃게", "Blue swimming crab (Ghẹ)", "花蟹", "ワタリガニ", "Ghẹ", { unit: U_kg }),
    ],
  },
  {
    id: "shrimp",
    name: T("새우·갯가재", "Shrimp · Mantis shrimp", "虾·皮皮虾", "エビ・シャコ", "Tôm · Bề bề"),
    items: [
      it(620000, "tiger-shrimp", "블랙타이거 새우", "Black tiger shrimp (Tôm sú)", "黑虎虾", "ブラックタイガー", "Tôm sú", { unit: U_kg }),
      it(650000, null, "큰 민물새우", "Giant freshwater prawn (Tôm càng sen)", "大淡水虾", "大型淡水エビ", "Tôm càng sen", { unit: U_kg }),
      it(1190000, null, "흰 부채새우", "White slipper lobster (Mũ ni trắng)", "白色扇虾", "白いセミエビ", "Mũ ni trắng", { unit: U_kg }),
      it(660000, "mantis", "갯가재", "Mantis shrimp", "皮皮虾", "シャコ", "Bề bề", { unit: U_kg, tag: "must", desc: T("조리법: 찜·구이·타마린드 소스·소금 볶음·맥주찜·튀김", "Cooking: steamed, grilled, tamarind sauce, salt stir-fry, beer-steamed, fried", "做法:清蒸、烧烤、罗望子酱、椒盐炒、啤酒蒸、油炸", "調理法:蒸し・焼き・タマリンドソース・塩炒め・ビール蒸し・揚げ", "Cách chế biến: hấp, nướng, sốt me, rang muối, hấp bia, chiên") }),
      it(2200000, null, "대왕 갯가재", "Giant mantis shrimp (Bề bề chúa)", "巨型皮皮虾", "特大シャコ", "Bề bề chúa", { unit: U_kg }),
    ],
  },
  {
    id: "shell",
    name: T("조개·굴·전복", "Shellfish · Oyster · Abalone", "贝类·生蚝·鲍鱼", "貝・牡蠣・アワビ", "Hải sản có vỏ"),
    items: [
      it(25000, "oyster", "굴 파기름 구이", "Grilled oyster with scallion oil", "葱油烤生蚝", "牡蠣のネギ油焼き", "Hàu nướng mỡ hành", { unit: U_con, tag: "best", desc: T("생굴회·파기름 구이·찜", "Raw oyster, grilled with scallion oil, steamed", "生蚝刺身、葱油烧烤、清蒸", "生牡蠣・ネギ油焼き・蒸し", "Hàu sống, nướng mỡ hành, hấp") }),
      it(35000, null, "치즈 구이 굴", "Cheese-baked oyster", "芝士焗生蚝", "牡蠣のチーズ焼き", "Hàu nướng phô mai", { unit: U_con }),
      it(140000, null, "미국산 굴", "American oyster", "美国生蚝", "アメリカ産牡蠣", "Hàu Mỹ", { unit: U_con }),
      it(170000, null, "전복", "Abalone", "鲍鱼", "アワビ", "Bào ngư", { unit: U_con, desc: T("수프·죽·무침·느억맘 소스", "Soup, porridge, salad, fish sauce (nước mắm)", "汤、粥、凉拌、鱼露酱", "スープ・お粥・和え物・ヌックマムソース", "Súp, cháo, gỏi, sốt nước mắm") }),
      it(250000, null, "큰 전복", "Large abalone (Bào ngư to)", "大鲍鱼", "大きなアワビ", "Bào ngư to", { unit: U_con }),
      it(2699000, null, "호주산 전복", "Australian abalone", "澳洲鲍鱼", "オーストラリア産アワビ", "Bào ngư Úc", { unit: U_kg }),
      it(250000, null, "가리비", "Scallop", "扇贝", "ホタテ", "Sò điệp", { unit: U_con, desc: T("치즈구이도 가능", "Cheese-baked is also available", "也可做芝士焗", "チーズ焼きも可能", "Có thể nướng phô mai") }),
      it(1199000, null, "캐나다 코끼리조개", "Canadian geoduck (Tu hài)", "加拿大象拔蚌", "カナダ産ミルガイ", "Tu hài Canada", { unit: U_kg, desc: T("조리법: 찜·버섯 볶음·사시미·파기름 구이·치즈구이·죽", "Cooking: steamed, mushroom stir-fry, sashimi, scallion oil grilled, cheese-baked, porridge", "做法:清蒸、蘑菇炒、刺身、葱油烧烤、芝士焗、粥", "調理法:蒸し・きのこ炒め・刺身・ネギ油焼き・チーズ焼き・お粥", "Cách chế biến: hấp, xào nấm, sashimi, nướng mỡ hành, nướng phô mai, cháo") }),
      it(1790000, null, "캐나다 황금 코끼리조개", "Canadian golden geoduck (Tu hài vàng)", "加拿大金象拔蚌", "カナダ産ゴールデンミルガイ", "Tu hài Canada vàng", { unit: U_kg }),
      it(30000, null, "작은 코끼리조개", "Small geoduck (Tu hài bé)", "小象拔蚌", "小さなミルガイ", "Tu hài bé", { unit: U_con }),
      it(600000, "whelk", "꽝닌 향고둥", "Quang Ninh spotted babylon (Ốc hương)", "广宁香螺", "クアンニン産ツブ貝", "Ốc hương Quảng Ninh", { unit: U_kg }),
      it(560000, null, "응안 조개", "Ngan clam (Ngán)", "牙贝 (Ngán)", "ガン貝 (Ngán)", "Ngán", { unit: U_kg }),
      it(350000, null, "큰 바다조개 (트엉)", "Large sea clam (Thưng)", "大海蚌 (Thưng)", "大型の海の貝 (Thưng)", "Thưng", { unit: U_kg }),
      it(350000, null, "꽃조개 (대)", "Flower clam (large)", "花蛤 (大)", "ハマグリ (大)", "Ngao hoa loại to", { unit: U_kg, desc: T("레몬그라스 찜·칠리 볶음·파기름 구이", "Lemongrass steamed, chili stir-fry, scallion oil grilled", "香茅蒸、辣椒炒、葱油烧烤", "レモングラス蒸し・チリ炒め・ネギ油焼き", "Hấp sả, xào ớt, nướng mỡ hành") }),
      it(350000, null, "맛조개", "Razor clam", "竹蛏", "マテ貝", "Móng tay", { unit: U_kg }),
      it(280000, null, "쌍관자 조개", "Twin-adductor clam (Ngao hai cùi)", "双壳贝", "二枚貝 (Ngao hai cùi)", "Ngao hai cùi", { unit: U_kg }),
      it(390000, null, "피조개 (꼬막)", "Blood cockle", "血蚶", "赤貝 (サルボウ)", "Sò huyết đại", { unit: U_kg }),
      it(120000, null, "해삼", "Sea cucumber", "海参", "ナマコ", "Hải sâm", { unit: U_con }),
    ],
  },
  {
    id: "fish",
    name: T("생선·회", "Fish · Sashimi", "鱼·刺身", "魚・刺身", "Cá"),
    note: T("생선은 사시미·찜·구이·전골·죽·국으로 조리해 줘요.", "Fish can be prepared as sashimi, steamed, grilled, hot pot, porridge, or soup.", "鱼可做成刺身、清蒸、烧烤、火锅、粥或汤。", "魚は刺身・蒸し・焼き・鍋・お粥・スープに調理します。", "Cá có thể chế biến thành sashimi, hấp, nướng, lẩu, cháo hoặc canh."),
    items: [
      it(2190000, null, "황광어", "Yellow flounder (Cá bơn vàng)", "黄比目鱼", "黄ヒラメ", "Cá bơn vàng", { unit: U_kg }),
      it(1290000, null, "청광어", "Blue flounder (Cá bơn xanh)", "青比目鱼", "青ヒラメ", "Cá bơn xanh", { unit: U_kg, desc: T("사시미·간장 찜·소금 구이·녹두죽", "Sashimi, soy sauce steamed, salt-grilled, mung bean porridge", "刺身、酱油蒸、盐烤、绿豆粥", "刺身・醤油蒸し・塩焼き・緑豆粥", "Sashimi, hấp xì dầu, nướng muối, cháo đậu xanh") }),
      it(2490000, null, "붉은 다금바리", "Red grouper (Cá mú đỏ)", "红石斑鱼", "赤いハタ", "Cá mú đỏ", { unit: U_kg }),
      it(990000, null, "청점 다금바리", "Blue-spotted grouper (Cá mú sao xanh)", "青斑石斑鱼", "青点ハタ", "Cá mú sao xanh", { unit: U_kg }),
      it(490000, null, "꽝닌 호랑이 다금바리", "Quang Ninh tiger grouper (Cá song hổ)", "广宁虎斑石斑鱼", "クアンニン産タイガーハタ", "Cá song hổ Quảng Ninh", { unit: U_kg }),
      it(720000, null, "노르웨이 연어", "Norwegian salmon", "挪威三文鱼", "ノルウェー産サーモン", "Cá hồi Nauy", { unit: U_set, desc: T("전골·사시미·찜·튀김", "Hot pot, sashimi, steamed, fried", "火锅、刺身、清蒸、油炸", "鍋・刺身・蒸し・揚げ", "Lẩu, sashimi, hấp, chiên") }),
      it(580000, null, "철갑상어", "Sturgeon (Cá tầm)", "鲟鱼", "チョウザメ", "Cá tầm", { unit: U_kg }),
      it(750000, null, "청어", "Herring (Cá trích)", "鲱鱼", "ニシン", "Cá trích", { unit: U_set }),
      it(690000, null, "독가시치", "Rabbitfish (Cá rìa)", "臭肚鱼 (Cá rìa)", "アイゴ", "Cá rìa", { unit: U_kg }),
    ],
  },
  {
    id: "squid",
    name: T("오징어", "Squid", "鱿鱼", "イカ", "Mực"),
    items: [
      it(450000, null, "한치 (총알오징어)", "Tube squid (Mực ống)", "长筒鱿鱼", "ヤリイカ", "Mực ống", { unit: U_kg }),
      it(500000, null, "알오징어", "Roe squid (Mực trứng)", "满籽鱿鱼", "卵付きイカ", "Mực trứng", { unit: U_kg }),
      it(550000, null, "갑오징어", "Cuttlefish (Mực mai)", "墨鱼", "コウイカ", "Mực mai", { unit: U_kg }),
    ],
  },
  {
    id: "meal",
    name: T("전채·국·식사", "Starters · Soup · Meals", "前菜·汤·主食", "前菜・スープ・食事", "Khai vị · Súp · Cháo · Cơm"),
    note: T("가격이 표시된 것만 가격을 적었어요. 가격이 없는 메뉴는 가게에 문의해 주세요.", "Prices are shown only where listed. Please ask the restaurant for items without a price.", "仅标注了菜单上有价格的菜品。未标价的菜品请向店家咨询。", "価格が表示されているものだけ記載しています。価格のないメニューはお店にお問い合わせください。", "Chỉ ghi giá những món có niêm yết giá. Món chưa có giá xin vui lòng hỏi nhà hàng."),
    items: [
      it(40000, null, "해산물 수프", "Seafood soup", "海鲜汤", "海鮮スープ", "Súp hải sản", { unit: U_bat }),
      it(80000, null, "해산물 죽", "Seafood porridge", "海鲜粥", "海鮮お粥", "Cháo hải sản", { unit: U_bat }),
      it(190000, null, "해산물 샐러드", "Seafood salad", "海鲜沙拉", "海鮮サラダ", "Salad hải sản", { unit: U_dia }),
      it(50000, null, "베텔잎(라롯) 생선국", "Fish soup with betel leaf (lá lốt)", "蒌叶鱼汤", "ラロットの葉の魚スープ", "Canh cá lá lốt", { unit: U_bat }),
      it(50000, null, "새콤달콤 생선국", "Sweet and sour fish soup (Canh chua cá)", "酸甜鱼汤", "甘酸っぱい魚スープ", "Canh chua cá", { unit: U_bat }),
      it(null, null, "조개 죽", "Clam porridge", "蛤蜊粥", "貝のお粥", "Cháo ngao"),
      it(null, null, "해산물 볶음면", "Seafood stir-fried noodles", "海鲜炒面", "海鮮焼きそば", "Mỳ xào hải sản"),
      it(null, null, "해물 볶음밥", "Seafood fried rice", "海鲜炒饭", "海鮮チャーハン", "Cơm rang hải sản"),
      it(null, null, "게살 당면 볶음", "Stir-fried glass noodles with crab meat", "蟹肉炒粉丝", "カニ身入り春雨炒め", "Miến xào cua"),
      it(null, null, "감자 튀김", "French fries", "炸薯条", "フライドポテト", "Khoai tây chiên"),
      it(null, null, "옥수수 튀김", "Fried corn", "炸玉米", "コーンの揚げ物", "Ngô chiên"),
    ],
  },
  {
    id: "drink",
    name: T("주류·음료", "Alcohol · Drinks", "酒类·饮料", "お酒・ドリンク", "Rượu · Bia · Nước"),
    items: [
      it(12000, null, "하노이 맥주", "Hanoi Beer", "河内啤酒", "ハノイビール", "Bia Hà Nội", { unit: U_chai }),
      it(15000, null, "사이공 맥주", "Saigon Beer", "西贡啤酒", "サイゴンビール", "Bia Sài Gòn", { unit: U_chai }),
      it(25000, null, "하이네켄 맥주", "Heineken Beer", "喜力啤酒", "ハイネケン", "Bia Heineken", { unit: U_chai }),
      it(30000, null, "따오메오(사과) 술", "Tao Meo (wild apple) wine (Rượu táo mèo)", "野苹果酒 (Táo mèo)", "タオメオ(山リンゴ)酒", "Rượu táo mèo", { unit: U_chai }),
      it(30000, null, "바나나 술", "Banana seed wine (Rượu chuối hột)", "香蕉籽酒", "バナナ酒", "Rượu chuối hột", { unit: U_chai }),
      it(30000, null, "찹쌀 술", "Sticky rice wine (Rượu nếp)", "糯米酒", "もち米酒", "Rượu nếp", { unit: U_chai }),
      it(50000, null, "멘 보드카 (소)", "Men vodka (small) (Rượu men M)", "Men 伏特加 (小)", "メン・ウォッカ (小)", "Rượu men M bé", { unit: U_chai }),
      it(80000, null, "멘 보드카 (대)", "Men vodka (large) (Rượu men M)", "Men 伏特加 (大)", "メン・ウォッカ (大)", "Rượu men M to", { unit: U_chai }),
      it(15000, null, "콜라 · 펩시 · 오렌지주스 · 레드불", "Coca-Cola · Pepsi · Orange juice · Red Bull", "可乐 · 百事 · 橙汁 · 红牛", "コーラ・ペプシ・オレンジジュース・レッドブル", "Cocacola · Pepsi · Nước cam · Bò húc", { unit: U_chai }),
      it(10000, null, "생수", "Bottled water", "矿泉水", "ミネラルウォーター", "Nước suối", { unit: U_lon }),
    ],
  },
];
