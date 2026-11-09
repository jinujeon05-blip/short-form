// 새우공장(ㅅㅇㄱㅈ Pocha & Pub) 메뉴 데이터 — 출처: 구글 지도 손님 메뉴판 사진(2026-11-10 수집)
// 세트 menu_04·05(같은 값) · 사이드 menu_01·05(판마다 값 다름 → 높은 쪽, 얼큰 파스타는 menu_05에만) · 주류 menu_01·06(하노이·사이공 맥주는 menu_06에만)
// 메뉴판 읽기 agy(제미나이) → 운영 감찰관(agy 안 Claude Sonnet) 재대조 가격 차이 0
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만)
window.RESTAURANT = {
  brand: { ko: "새우공장", en: "ㅅㅇㄱㅈ" },
  phone: "0368 178 543",
  address: "Kiosk 11B2, tầng 1, tòa CT4, KĐT Mỹ Đình Sông Đà, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "15:00 – 00:30", // 구글 지도엔 화요일 '오후 3:00~오전 12:30'만 있음(다른 요일 미확인, 수집기는 '모름'). 메뉴판엔 시간 없음
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });
const WT = (w, t) => [["WHITE", w], ["TIGER", t]];
const ML = (glass, bottle) => [["50ml", glass], ["700ml", bottle]];

window.MENU = [
  {
    id: "set",
    name: T("새우카세 (1kg)", "Shrimp-kase Set (1kg)", "虾Omakase套餐（1kg）", "エビおまかせセット（1kg）", "Tôm kase (1kg)"),
    note: T("1kg 기준 · WHITE = 흰다리새우, TIGER = 타이거새우 · 오뎅탕 + 새우얼큰라면 + 새우볶음밥 + 새우머리 버터튀김 + 계란찜이 무료로 함께 나와요",
      "Per 1kg · WHITE = whiteleg shrimp, TIGER = tiger prawn · Comes with free fish cake soup + spicy shrimp ramyeon + shrimp fried rice + butter-fried shrimp heads + steamed egg",
      "以1kg计 · WHITE = 白虾（白腿虾），TIGER = 虎虾 · 免费附赠鱼饼汤 + 辣虾拉面 + 虾炒饭 + 黄油炸虾头 + 蒸蛋",
      "1kgあたり · WHITE = バナメイエビ、TIGER = ブラックタイガー · おでん鍋 + エビ辛ラーメン + エビチャーハン + エビ頭のバター揚げ + 卵蒸しが無料でつきます",
      "Tính theo 1kg · WHITE = tôm thẻ chân trắng, TIGER = tôm sú · Tặng kèm: canh chả cá + mì tôm cay + cơm chiên tôm + đầu tôm chiên bơ + trứng hấp"),
    tip: T("1인 500g 구이 · 회도 있어요(메뉴판 표기: 메인 메뉴 50%) · 이때 무료: 오뎅탕 + 계란찜 + 새우머리 버터튀김",
      "500g grilled per person · Sashimi is also available (menu note: main menu 50%) · In this case, free: fish cake soup + steamed egg + butter-fried shrimp heads",
      "每人500g烧烤 · 也可点生鱼片（菜单标注：主菜50%）· 此时免费附赠：鱼饼汤 + 蒸蛋 + 黄油炸虾头",
      "お一人様500gの焼き物 · 刺身もあります（メニュー表記：メインメニュー50%）· この場合の無料サービス：おでん鍋 + 卵蒸し + エビ頭のバター揚げ",
      "Nướng 500g mỗi người · Cũng có sashimi (menu ghi: món chính 50%) · Khi đó tặng kèm: canh chả cá + trứng hấp + đầu tôm chiên bơ"),
    items: [
      it(WT(1080000, 1250000), "salt", T("A. 활새우 소금구이", "A. Live Shrimp Salt-Grilled", "A. 活虾盐烤", "A. 活エビの塩焼き", "Tôm tươi hấp muối"), { tag: "must" }),
      it(WT(1180000, 1350000), "sashimi", T("B. 활새우회", "B. Live Shrimp Sashimi", "B. 活虾刺身", "B. 活エビの刺身", "Tôm sashimi"), { tag: "best" }),
      it(WT(1330000, 1500000), null, T("C. 활새우 양념무침", "C. Live Shrimp in Spicy Sauce", "C. 活虾辣酱拌", "C. 活エビのピリ辛和え", "Tôm tươi trộn sốt cay"), { spicy: true }),
    ],
  },
  {
    id: "side",
    name: T("사이드 · 안주", "Sides & Bar Snacks", "配菜 · 下酒菜", "サイド・おつまみ", "Món phụ · Đồ nhắm"),
    items: [
      it(290000, null, T("김치전골", "Kimchi Hot Pot", "泡菜火锅", "キムチ鍋", "Canh kimchi")),
      it(290000, null, T("쭈꾸미 볶음", "Stir-fried Spicy Webfoot Octopus (Jjukkumi)", "辣炒章鱼仔", "イイダコの辛炒め", "Bạch tuộc xào cay"), { spicy: true }),
      it(280000, null, T("닭갈비 구이", "Grilled Spicy Chicken (Dakgalbi)", "烤辣鸡排", "タッカルビ焼き", "Gà nướng sốt cay"), { spicy: true }),
      it(270000, "odeng", T("오뎅탕", "Fish Cake Soup (Odeng-tang)", "鱼饼汤", "おでん鍋", "Canh chả cá")),
      it(270000, null, T("대패삼겹 떡볶이", "Tteokbokki with Thin-sliced Pork Belly", "薄切五花肉炒年糕", "薄切り豚バラのトッポッキ", "Tteokbokki thịt ba chỉ"), { spicy: true }),
      it(270000, null, T("통오징어 버터구이", "Whole Squid Grilled in Butter", "黄油烤整只鱿鱼", "イカ丸ごとバター焼き", "Mực nướng bơ tỏi")),
      it(270000, null, T("훈제오리 부추무침", "Smoked Duck with Seasoned Chives", "烟熏鸭肉拌韭菜", "燻製鴨のニラ和え", "Vịt xông khói trộn hẹ")),
      it(250000, null, T("대패삼겹 숙주볶음", "Thin-sliced Pork Belly Stir-fried with Bean Sprouts", "薄切五花肉炒豆芽", "薄切り豚バラともやし炒め", "Thịt ba chỉ xào giá đỗ")),
      it(270000, null, T("먹태 · 황태채", "Dried Pollack (Meoktae) · Shredded Dried Pollack (Hwangtae)", "黑干明太鱼 · 干明太鱼丝", "燻製スケトウダラ（モクテ）・干しスケトウダラの細切り（ファンテチェ）", "Cá khô")),
      it(450000, null, T("매콤 등갈비찜", "Spicy Braised Pork Ribs", "香辣焖猪肋排", "ピリ辛スペアリブ蒸し", "Sườn heo hấp cay"), { spicy: true }),
      it(320000, null, T("쭈꾸미 삼겹 볶음", "Stir-fried Webfoot Octopus & Pork Belly", "辣炒章鱼仔五花肉", "イイダコと豚バラの炒め", "Bạch tuộc ba chỉ xào cay"), { spicy: true }),
      it(120000, "rice", T("새우 볶음밥", "Shrimp Fried Rice", "虾炒饭", "エビチャーハン", "Cơm chiên tôm")),
      it(120000, "ramyeon", T("새우 얼큰라면", "Spicy Shrimp Ramyeon", "辣虾拉面", "エビ辛ラーメン", "Mì tôm cay"), { spicy: true }),
      it(180000, null, T("얼큰 파스타", "Spicy Pasta", "辣味意面", "ピリ辛パスタ", "Mì Ý cay"), { spicy: true }),
      it(140000, null, T("수박빙수", "Watermelon Bingsu (Shaved Ice)", "西瓜刨冰", "スイカかき氷（ピンス）", "Dưa hấu bingsu")),
      it(160000, null, T("달달 토마토", "Sugared Tomato Slices", "糖渍番茄", "砂糖がけトマト", "Cà chua ngọt nướng")),
      it(170000, null, T("황도", "Canned Yellow Peaches", "罐头黄桃", "缶詰の黄桃", "Đào vàng")),
      it(290000, null, T("미니 게 튀김 (후라이드 반 · 양념 반)", "Fried Mini Crabs (half plain · half seasoned)", "炸小螃蟹（一半原味 · 一半调味酱）", "ミニカニ揚げ（プレーン半分・ヤンニョム半分）", "Ghẹ chiên sốt Hàn Quốc")),
    ],
  },
  {
    id: "drink",
    name: T("소주 · 맥주 · 막걸리", "Soju · Beer · Makgeolli", "烧酒 · 啤酒 · 马格利酒", "焼酎・ビール・マッコリ", "Soju · Bia · Makgeolli"),
    items: [
      it(160000, null, T("소주 (참이슬 · 새로 · 처음처럼 · 진로 · 좋은데이)", "Soju (Chamisul · Saero · Chum Churum · Jinro · Good Day)", "烧酒（Chamisul · Saero · Chum Churum · Jinro · Good Day）", "焼酎（チャミスル・セロ・チョウムチョロム・ジンロ・グッドデー）", "Soju (Chamisul · Saero · Chum Churum · Jinro · Good Day)")),
      it(50000, null, T("맥주 (타이거 · 하노이 · 사이공)", "Beer (Tiger · Hanoi · Saigon)", "啤酒（虎牌 · 河内 · 西贡）", "ビール（タイガー・ハノイ・サイゴン）", "Bia (Tiger · Hà Nội · Sài Gòn)")),
      it(160000, null, T("막걸리", "Makgeolli (Korean Rice Wine)", "马格利酒（韩国米酒）", "マッコリ", "Makgeolli")),
      it(20000, null, T("음료 (소다 · 레드불 · 콜라 · 사이다)", "Soft Drinks (Soda · Red Bull · Cola · Lemon-lime Soda)", "饮料（苏打水 · 红牛 · 可乐 · 雪碧类汽水）", "ドリンク（ソーダ・レッドブル・コーラ・サイダー）", "Nước ngọt (Soda · Red Bull · Coca · Sprite)")),
    ],
  },
  {
    id: "highball",
    name: T("하이볼", "Highball", "Highball（威士忌苏打）", "ハイボール", "Highball"),
    note: T("10~12년산 위스키 하이볼 · 시럽 없음",
      "Highballs made with 10–12-year-old whisky · No syrup",
      "选用10~12年威士忌调制 · 不加糖浆",
      "10〜12年物ウイスキーのハイボール・シロップ不使用",
      "Highball whisky 10–12 năm · Không dùng siro"),
    items: [
      it(190000, null, T("글렌피딕 하이볼", "Glenfiddich Highball", "格兰菲迪 Highball", "グレンフィディック ハイボール", "Glenfiddich highball")),
      it(190000, null, T("싱글톤 하이볼", "Singleton Highball", "苏格登 Highball", "シングルトン ハイボール", "Singleton highball")),
      it(190000, null, T("보모어 하이볼", "Bowmore Highball", "波摩 Highball", "ボウモア ハイボール", "Bowmore highball")),
      it(190000, null, T("아드벡 하이볼", "Ardbeg Highball", "雅柏 Highball", "アードベッグ ハイボール", "Ardbeg highball")),
      it(140000, null, T("복분자 하이볼", "Bokbunja (Korean Black Raspberry) Highball", "覆盆子 Highball", "覆盆子（ポクブンジャ）ハイボール", "Highball phúc bồn tử")),
      it(120000, null, T("백세주 하이볼", "Baekseju (Herbal Rice Wine) Highball", "百岁酒 Highball", "百歳酒（ペクセジュ）ハイボール", "Highball Baekseju")),
      it(110000, null, T("에너지 하이볼 (무알콜)", "Energy Highball (Non-alcoholic)", "能量 Highball（无酒精）", "エナジーハイボール（ノンアルコール）", "Energy highball (không cồn)")),
    ],
  },
  {
    id: "whisky",
    name: T("위스키", "Whisky", "威士忌", "ウイスキー", "Whisky"),
    note: T("50ml = 한 잔 · 700ml = 한 병",
      "50ml = 1 glass · 700ml = 1 bottle",
      "50ml = 一杯 · 700ml = 一瓶",
      "50ml = グラス1杯 · 700ml = ボトル1本",
      "50ml = 1 ly · 700ml = 1 chai"),
    items: [
      it(ML(330000, 4800000), null, T("아드벡 10년", "Ardbeg 10 Years", "雅柏10年", "アードベッグ 10年", "Ardbeg 10")),
      it(ML(300000, 4300000), null, T("보모어 12년", "Bowmore 12 Years", "波摩12年", "ボウモア 12年", "Bowmore 12")),
      it(ML(300000, 4300000), null, T("싱글톤 12년", "Singleton 12 Years", "苏格登12年", "シングルトン 12年", "Singleton 12")),
      it(ML(300000, 4300000), null, T("글렌피딕 12년", "Glenfiddich 12 Years", "格兰菲迪12年", "グレンフィディック 12年", "Glenfiddich 12")),
      it(ML(570000, 7800000), null, T("글렌피딕 18년", "Glenfiddich 18 Years", "格兰菲迪18年", "グレンフィディック 18年", "Glenfiddich 18")),
      it(11400000, null, T("조니워커 블루라벨 (한 병)", "Johnnie Walker Blue Label (bottle)", "尊尼获加蓝牌（一瓶）", "ジョニーウォーカー ブルーラベル（ボトル）", "Johnnie Walker Blue Label (chai)")),
      it(10400000, null, T("발렌타인 23년 (한 병)", "Ballantine's 23 Years (bottle)", "百龄坛23年（一瓶）", "バランタイン 23年（ボトル）", "Ballantine's 23 (chai)")),
    ],
  },
];
