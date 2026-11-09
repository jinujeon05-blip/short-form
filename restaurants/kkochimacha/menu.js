// 꼬치마차(KO CHI MA CHA) 메뉴 데이터 — 출처: 구글 지도 메뉴판 사진(가게 계정이 올린 최신 인쇄본 menu_01 한국어·menu_02 베트남어, 2026-11-09 수집)
// 옛 판(손글씨 클립보드 menu_04·05: 닭꼬치 35,000~39,000, 항정살·삼겹살·쯔꾸네 꼬치, 두부 된장찌개, 장충동 편육 등)은 안 씀 (docs/todo.md)
// 베트남어는 menu_02 그대로 쓰되 메뉴판 오타(tóng→tổng, tâm→tằm, Đạp→Đào)만 고침
// price: 한 가지 가격 / sizes: [["S", 가격], …] / price: null = 시가
// tag: "must"(Must Try) · "best"(BEST) · "special"(스페셜) / spicy: true = 매운 표시 / photo: "img/<이름>.jpg"(640×480, 4:3으로 꽉 차게 자른 고화질만)
window.RESTAURANT = {
  brand: { ko: "꼬치마차", en: "KO CHI MA CHA" },
  phone: "0335 222 854",
  address: "Đ. Mỹ Đình, Đình Thôn, Từ Liêm, Hà Nội",
  wifi: null,
  hours: "16:30 – 00:30", // 구글 지도 '오후 4:30~오전 12:30'. 메뉴판·간판에 시간 없음
};

const T = (ko, en, zh, ja, vi) => ({ ko, en, zh, ja, vi });
const it = (price, photo, name, x = {}) => ({ ...(Array.isArray(price) ? { sizes: price } : { price: price ?? null }), ...(photo ? { photo: `img/${photo}.jpg` } : {}), name, ...x });

window.MENU = [
  {
    id: "skewer",
    name: T("숯불 꼬치 안주", "Charcoal-Grilled Skewers", "炭火烤串", "炭火串焼き", "Món xiên nướng than"),
    items: [
      it(42000, "maekom", T("매콤 닭꼬치", "Spicy Chicken Skewer", "香辣鸡肉串", "ピリ辛チキン串", "Xiên gà cay"), { spicy: true }),
      it(42000, null, T("간장 닭꼬치", "Soy Sauce Chicken Skewer", "酱油鸡肉串", "醤油チキン串", "Xiên gà sốt xì dầu")),
      it(38000, "sogeum", T("소금 닭꼬치", "Salt Chicken Skewer", "盐烤鸡肉串", "塩チキン串", "Xiên gà muối")),
      it(49000, null, T("치즈 닭꼬치", "Cheese Chicken Skewer", "芝士鸡肉串", "チーズチキン串", "Xiên gà phô mai")),
      it(18000, null, T("숯불 파꼬치", "Charcoal-Grilled Scallion Skewer", "炭火葱串", "炭火ネギ串", "Xiên hành lá nướng than")),
      it(180000, "moodeum", T("모듬 꼬치 (5종류)", "Assorted Skewers (5 kinds)", "什锦烤串（5种）", "盛り合わせ串（5種類）", "Xiên tổng hợp (5 loại)")),
    ],
  },
  {
    id: "soup",
    name: T("국물 안주", "Soup Dishes", "汤类下酒菜", "汁物のおつまみ", "Món canh"),
    items: [
      it(360000, null, T("존슨 부대찌개", "Johnson Army Stew (Budae-jjigae)", "约翰逊部队锅（部队火锅）", "ジョンソン部隊チゲ（プデチゲ）", "Lẩu quân đội Johnson")),
      it(280000, "odeng", T("오뎅탕", "Fish Cake Soup (Odeng-tang)", "鱼饼汤", "おでん鍋（オデンタン）", "Canh chả cá")),
      it(160000, null, T("얼큰 번데기탕", "Spicy Silkworm Pupa Soup (Beondegi-tang)", "辣味蚕蛹汤", "辛口カイコのさなぎ鍋（ポンデギタン）", "Súp nhộng tằm cay"), { spicy: true }),
    ],
  },
  {
    id: "snack",
    name: T("일반 안주", "Regular Snacks", "普通下酒菜", "一般のおつまみ", "Món nhắm thường"),
    items: [
      it(180000, "gotgam", T("곶감 치즈 말이 (8조각)", "Dried Persimmon Cream Cheese Rolls (8 pieces)", "柿饼奶油芝士卷（8片）", "干し柿クリームチーズ巻き（8切れ）", "Quả hồng khô cuộn phô mai (8 lát)")),
      it(260000, null, T("토마토 카프레제", "Tomato Caprese", "番茄卡布里沙拉", "トマトのカプレーゼ", "Cà chua Caprese")),
      it(120000, null, T("황도", "Canned Yellow Peach (Hwangdo)", "黄桃罐头", "黄桃の缶詰（ファンド）", "Đào vàng")),
      it(140000, null, T("팥빙수", "Red Bean Shaved Ice (Patbingsu)", "红豆刨冰", "小豆かき氷（パッピンス）", "Bingsu đậu đỏ")),
      it(240000, null, T("매운 무뼈 닭발", "Spicy Boneless Chicken Feet (Dakbal)", "香辣无骨鸡爪", "辛口骨なし鶏の足（タッパル）", "Chân gà rút xương cay"), { spicy: true }),
      it(220000, null, T("제육 볶음", "Spicy Stir-fried Pork (Jeyuk-bokkeum)", "辣炒猪肉", "豚肉の辛口炒め（チェユクポックム）", "Thịt heo xào cay"), { spicy: true }),
    ],
  },
  {
    id: "dry",
    name: T("마른 안주", "Dry Snacks", "干货下酒菜", "乾き物のおつまみ", "Món khô"),
    items: [
      it(280000, null, T("반건조 통 노가리 (크기별 3~4마리)", "Semi-dried Whole Pollack (Nogari, 3-4 pieces by size)", "半干整条小明太鱼（按大小3~4条）", "半乾燥ノガリ丸ごと（サイズにより3～4匹）", "Cá minh thái khô một nắng (3~4 con tùy kích cỡ)")),
      it(260000, "ojingeo", T("반건조 왕 오징어", "Semi-dried Giant Squid", "半干大鱿鱼", "半乾燥の大イカ", "Mực khô cỡ lớn một nắng")),
      it(240000, null, T("숯불 마른 한치 · 쥐포구이 세트", "Charcoal-Grilled Dried Hanchi Squid & Filefish Jerky Set", "炭火干小鱿鱼与烤鱼片套餐", "炭火の干しヤリイカ・カワハギ干し焼きセット", "Set mực khô và cá ép khô nướng than")),
      it(120000, null, T("숯불 쥐포 구이", "Charcoal-Grilled Filefish Jerky (Jwipo)", "炭火烤鱼片", "炭火焼きカワハギ干し（チュイポ）", "Cá ép khô nướng than")),
    ],
  },
  {
    id: "drink",
    name: T("주류 · 음료", "Alcohol & Drinks", "酒水 · 饮料", "お酒・ドリンク", "Rượu & Đồ uống"),
    items: [
      it(140000, null, T("소주 (참이슬 · 처음처럼 · 새로 · 진로)", "Soju (Chamisul, Chum Churum, Saero, Jinro)", "烧酒（Chamisul · Chum Churum · Saero · Jinro）", "焼酎（Chamisul・Chum Churum・Saero・Jinro）", "Soju (Cham, Cheoeum, Saero, Jinro)")),
      it(60000, null, T("생맥주 SAPPORO", "SAPPORO Draft Beer", "SAPPORO生啤", "生ビール SAPPORO", "Bia tươi SAPPORO")),
      it(50000, null, T("병맥주 SAPPORO / TIGER", "SAPPORO / TIGER Bottled Beer", "SAPPORO / TIGER瓶装啤酒", "瓶ビール SAPPORO / TIGER", "Bia chai SAPPORO / TIGER")),
      it(20000, null, T("음료", "Soft Drink", "饮料", "ソフトドリンク", "Nước ngọt")),
      it(30000, null, T("싱하 소다", "Singha Soda", "胜狮苏打水", "シンハーソーダ", "Soda Singha")),
      it([["S", 80000], ["L", 140000]], null, T("하이볼 츄하이 (캔)", "Highball Chuhai (can)", "高球查嗨（罐装）", "ハイボール チューハイ（缶）", "Highball Chuhai (lon)")),
      it(160000, null, T("산토리 토키 위스키 하이볼 (잔 · 45ml)", "Suntory Toki Whisky Highball (glass · 45ml)", "三得利Toki威士忌高球（杯 · 45ml）", "サントリー ウイスキー 季（トキ）ハイボール（グラス・45ml）", "Highball whisky Suntory Toki (ly · shot 45ml)")),
    ],
  },
];
