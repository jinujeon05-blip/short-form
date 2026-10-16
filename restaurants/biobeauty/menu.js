// 바이오&뷰티 — 센테카솔·오가믹스 할인 제품 목록 (전단지 기준)
// 제품/가격 수정은 이 파일만 고치면 됩니다. 가격 단위: VND. was = 정가, price = 할인가
window.RESTAURANT = {
  brand: { ko: "바이오&뷰티", en: "Bio & Beauty" },
  // 상담 연락처 (위에서부터 순서대로 표시). zalo: 숫자만, kakao: 카카오톡 ID
  contacts: [
    { tel: "0917 302 200", zalo: "0917302200", kakao: "jjw4164", lang: "ko" },
    { tel: "0937 250 787", zalo: "0937250787", lang: "vi" },
  ],
};

window.MENU = [
  {
    id: "centecassol",
    brand: "CENTECASSOL",
    off: 80,
    photo: "img/centecassol-line.jpg",
    name: { ko: "센테카솔 연고 크림 라인", en: "Centecassol Ointment Cream Line", zh: "Centecassol 修护软膏霜系列", ja: "センテカソル 軟膏クリームライン", vi: "Dòng kem Centecassol Ointment" },
    about: {
      ko: "한국 한솔바이오의 더마 코스메틱. 리포좀 공법으로 유효 성분이 깊이 흡수돼요. 피부 자극 테스트 완료 · 파라벤·중금속 무첨가.",
      en: "Derma cosmetics by Hansol Bio, Korea. Liposome technology for deep absorption. Skin-irritation tested · no parabens or heavy metals.",
      zh: "韩国Hansol Bio药妆品牌。脂质体技术让有效成分深层吸收。已完成皮肤刺激测试 · 无防腐剂、无重金属。",
      ja: "韓国ハンソルバイオのダーマコスメ。リポソーム技術で有効成分が深く浸透。皮膚刺激テスト済み・パラベン/重金属不使用。",
      vi: "Dược mỹ phẩm Hansol Bio, Hàn Quốc. Công nghệ liposome giúp hoạt chất thẩm thấu sâu. Đã thử nghiệm kích ứng da · không paraben, không kim loại nặng.",
    },
    items: [
      { id: "c-a", photo: "img/p/c-a.jpg", color: "#e5427e", was: 760000, price: 152000,
        name: { ko: "레이저 A 크림", en: "Laser A Cream", zh: "Laser A 焕肤霜", ja: "レーザーAクリーム", vi: "Kem Laser A" },
        desc: { ko: "AHA·BHA·PHA 각질 케어로 매끈하고 환한 피부결", en: "AHA·BHA·PHA exfoliating care for smooth, bright skin", zh: "AHA·BHA·PHA 温和去角质，肌肤光滑透亮", ja: "AHA・BHA・PHAで角質ケア、なめらかで明るい肌へ", vi: "AHA–BHA–PHA loại bỏ tế bào chết, da mịn màng, tươi sáng" } },
      { id: "c-m", photo: "img/p/c-m.jpg", color: "#1d1d1f", was: 760000, price: 152000,
        name: { ko: "멜라 토닝 M 크림", en: "Mela Toning M Cream", zh: "Mela Toning M 亮白霜", ja: "メラトーニングMクリーム", vi: "Kem Mela Toning M" },
        desc: { ko: "트라넥삼산·글루타치온으로 기미·잡티 케어, 맑은 피부톤", en: "Tranexamic acid & glutathione for dark spots and an even tone", zh: "传明酸·谷胱甘肽淡化色斑，提亮肤色", ja: "トラネキサム酸・グルタチオンでシミケア、明るいトーンに", vi: "Axit tranexamic & glutathione giúp mờ thâm nám, đều màu da" } },
      { id: "c-r", photo: "img/p/c-r.jpg", color: "#c4262e", was: 760000, price: 152000,
        name: { ko: "레드 릴리프 R 크림", en: "Red Relief R Cream", zh: "Red Relief R 舒缓霜", ja: "レッドリリーフRクリーム", vi: "Kem Red Relief R" },
        desc: { ko: "플랑크톤 추출물로 건조·가려움 진정, 민감 피부 집중 보습", en: "Plankton extract calms dryness and itching, deep moisture for sensitive skin", zh: "浮游生物提取物舒缓干燥瘙痒，敏感肌深层保湿", ja: "プランクトンエキスで乾燥・かゆみを鎮め、敏感肌を集中保湿", vi: "Chiết xuất phù du biển làm dịu ngứa do khô da, dưỡng ẩm da nhạy cảm" } },
      { id: "c-k", photo: "img/p/c-k.jpg", color: "#f07a2a", was: 760000, price: 152000,
        name: { ko: "비타 리페어 K 크림", en: "Vita Repair K Cream", zh: "Vita Repair K 修护霜", ja: "ビタリペアKクリーム", vi: "Kem Vita Repair K" },
        desc: { ko: "비타민 K로 칙칙함·멍 자국 회복, 탄력 케어", en: "Vitamin K revives dull skin, fades bruise marks, boosts elasticity", zh: "维生素K改善暗沉与淤青痕迹，提升弹性", ja: "ビタミンKでくすみ・あざ跡をケア、ハリアップ", vi: "Vitamin K phục hồi da xỉn màu, mờ vết bầm, tăng độ đàn hồi" } },
      { id: "c-t", photo: "img/p/c-t.jpg", color: "#2f7a3a", was: 760000, price: 152000,
        name: { ko: "테카 캄 T 크림", en: "TECA Calm T Cream", zh: "TECA Calm T 镇静霜", ja: "テカカームTクリーム", vi: "Kem TECA Calm T" },
        desc: { ko: "병풀(TECA) 성분으로 붉은기·자극 진정, 피부 면역 강화", en: "TECA centella soothes redness and irritation, strengthens skin", zh: "积雪草TECA成分舒缓泛红刺激，增强肌肤抵抗力", ja: "ツボクサ(TECA)で赤み・刺激を鎮静、肌を強く", vi: "Rau má TECA làm dịu da ửng đỏ, kích ứng, tăng sức đề kháng cho da" } },
      { id: "c-c", photo: "img/p/c-c.jpg", color: "#6cc1d6", was: 760000, price: 152000,
        name: { ko: "세라마이드 C 크림", en: "Ceramide C Cream", zh: "Ceramide C 屏障霜", ja: "セラミドCクリーム", vi: "Kem Ceramide C" },
        desc: { ko: "세라마이드·판테놀로 피부 장벽 강화, 건조 피부 집중 보습", en: "Ceramide & panthenol strengthen the barrier, intensive hydration", zh: "神经酰胺·泛醇强化屏障，干燥肌深层保湿", ja: "セラミド・パンテノールでバリア強化、乾燥肌を集中保湿", vi: "Ceramide & panthenol tăng cường hàng rào bảo vệ, dưỡng ẩm sâu" } },
    ],
  },
  {
    id: "ogamix",
    brand: "OGAMIX",
    off: 70,
    photo: "img/ogamix-line.jpg",
    name: { ko: "오가믹스 프리미엄 아로마 스노위 라인", en: "Ogamix Premium Aroma Snowy Line", zh: "Ogamix 臻选香氛雪润系列", ja: "オガミックス プレミアム アロマスノーウィ ライン", vi: "Dòng Ogamix Premium Aroma Snowy" },
    about: {
      ko: "캄보디아 원시림의 딥테로카르푸스 성분으로 미백·주름 개선. 2019 한-아세안 특별정상회의에서 정상 배우자 선물로 쓰인 라인이에요.",
      en: "Dipterocarpus intricatus from Cambodian forests for brightening and anti-wrinkle care. Chosen as the gift for leaders' spouses at the 2019 Korea–ASEAN Special Summit.",
      zh: "取自柬埔寨原始森林的龙脑香树成分，美白淡纹。2019年韩国-东盟特别峰会选作领导人配偶礼品。",
      ja: "カンボジアの森のフタバガキ成分で美白・シワ改善。2019年韓国-ASEAN特別首脳会議で首脳夫人への贈り物に選ばれたライン。",
      vi: "Chiết xuất Dipterocarpus intricatus từ rừng Campuchia giúp trắng da, cải thiện nếp nhăn. Được chọn làm quà tặng các Đệ nhất phu nhân tại Hội nghị Hàn Quốc – ASEAN 2019.",
    },
    items: [
      { id: "o-set", photo: "img/p/o-set.jpg", color: "#1f4a3d", was: 15880000, price: 4764000, hot: true,
        name: { ko: "프리미엄 아로마 스노위 10종 세트", en: "Premium Aroma Snowy 10-piece Set", zh: "臻选香氛雪润10件套", ja: "プレミアム アロマスノーウィ 10点セット", vi: "Bộ 10 sản phẩm Premium Aroma Snowy" },
        desc: { ko: "토너·에멀전·세럼·아쿠아크림·영양크림·크림팩트·아이크림·클렌징폼·마스크팩·비비크림", en: "Toner, emulsion, serum, aqua cream, nutrition cream, cream pact, eye cream, cleansing foam, mask pack, BB cream", zh: "爽肤水、乳液、精华、水润霜、营养霜、粉饼、眼霜、洁面泡沫、面膜、BB霜", ja: "化粧水・乳液・美容液・アクアクリーム・栄養クリーム・クリームパクト・アイクリーム・洗顔フォーム・パック・BBクリーム", vi: "Toner, sữa dưỡng, serum, kem Aqua, kem dinh dưỡng, phấn nền, kem mắt, sữa rửa mặt, mặt nạ, kem BB" } },
      { id: "o-toner", photo: "img/p/o-toner.jpg", color: "#7fa9a3", was: 1380000, price: 414000,
        name: { ko: "토너", en: "Toner", zh: "爽肤水", ja: "化粧水（トナー）", vi: "Nước hoa hồng" },
        desc: { ko: "보습·결 정돈·각질과 모공 케어, 진정", en: "Hydrates, refines texture, cares for pores and dead skin", zh: "保湿、细致纹理、护理角质与毛孔", ja: "保湿・キメ整え・角質と毛穴ケア", vi: "Cấp ẩm, cải thiện kết cấu da, chăm sóc lỗ chân lông" } },
      { id: "o-emul", photo: "img/p/o-emul.jpg", color: "#2c5a4c", was: 1450000, price: 435000,
        name: { ko: "에멀전", en: "Emulsion", zh: "乳液", ja: "乳液（エマルジョン）", vi: "Sữa dưỡng (nhũ tương)" },
        desc: { ko: "가볍게 스며드는 유수분 밸런스, 탄력 있는 피부", en: "Light, fast-absorbing oil–moisture balance", zh: "轻盈好吸收，平衡水油", ja: "軽くなじみ、水分と油分のバランスを整える", vi: "Thẩm thấu nhanh, cân bằng dầu và độ ẩm" } },
      { id: "o-serum", photo: "img/p/o-serum.jpg", color: "#9cc3bd", was: 2420000, price: 726000,
        name: { ko: "세럼", en: "Serum", zh: "精华液", ja: "美容液（セラム）", vi: "Tinh chất (Serum)" },
        desc: { ko: "병풀·알란토인·엑토인으로 진정과 깊은 보습, 50ml", en: "Centella, allantoin & ectoin to soothe and deeply hydrate, 50ml", zh: "积雪草·尿囊素·依克多因 舒缓深层保湿，50ml", ja: "ツボクサ・アラントイン・エクトインで鎮静と深い保湿、50ml", vi: "Rau má, allantoin, ectoin làm dịu và dưỡng ẩm sâu, 50ml" } },
      { id: "o-aqua", photo: "img/p/o-aqua.jpg", color: "#a7cdd0", was: 1480000, price: 444000,
        name: { ko: "아쿠아 크림", en: "Aqua Cream", zh: "水润霜", ja: "アクアクリーム", vi: "Kem Aqua" },
        desc: { ko: "시원하고 촉촉한 수분 크림, 매끈한 피부결", en: "Cool, refreshing moisture cream for smooth skin", zh: "清凉水润面霜，肌肤细滑", ja: "ひんやりみずみずしい保湿クリーム", vi: "Kem dưỡng ẩm mát lạnh, da mịn màng" } },
      { id: "o-nutri", photo: "img/p/o-nutri.jpg", color: "#1f4a3d", was: 2460000, price: 738000,
        name: { ko: "영양 크림", en: "Nutrition Cream", zh: "营养霜", ja: "栄養クリーム", vi: "Kem dinh dưỡng" },
        desc: { ko: "끈적임 없이 영양 공급, 유수분 밸런스", en: "Rich nourishment without stickiness", zh: "滋养不黏腻，平衡水油", ja: "べたつかずに栄養補給", vi: "Nuôi dưỡng da, không nhờn dính" } },
      { id: "o-eye", photo: "img/p/o-eye.jpg", color: "#2c5a4c", was: 1160000, price: 348000,
        name: { ko: "아이크림", en: "Eye Cream", zh: "眼霜", ja: "アイクリーム", vi: "Kem mắt" },
        desc: { ko: "특허 성분 5종으로 눈가 주름·탄력 케어", en: "5 patented ingredients for eye wrinkles and firmness", zh: "5种专利成分，淡化眼纹提升弹性", ja: "特許成分5種で目元のシワ・ハリケア", vi: "5 thành phần độc quyền chăm sóc nếp nhăn vùng mắt" } },
      { id: "o-foam", photo: "img/p/o-foam.jpg", color: "#5b6b66", was: 660000, price: 198000,
        name: { ko: "화산재 클렌징 폼", en: "Volcanic Ash Cleansing Foam", zh: "火山灰洁面泡沫", ja: "火山灰洗顔フォーム", vi: "Sữa rửa mặt tro núi lửa" },
        desc: { ko: "제주 화산재로 모공 속 노폐물 세정, 설페이트 프리", en: "Jeju volcanic ash cleans pores, sulfate-free", zh: "济州火山灰清洁毛孔，无硫酸盐", ja: "済州の火山灰で毛穴汚れを洗浄、サルフェートフリー", vi: "Tro núi lửa Jeju làm sạch lỗ chân lông, không sulfate" } },
      { id: "o-mask", photo: "img/p/o-mask.jpg", color: "#3d4b47", was: 960000, price: 288000,
        name: { ko: "화산재 마스크 팩", en: "Volcanic Ash Mask Pack", zh: "火山灰面膜", ja: "火山灰マスクパック", vi: "Mặt nạ tro núi lửa" },
        desc: { ko: "피지 흡착·모공 케어 클레이 팩, 주 2~3회", en: "Clay mask that absorbs sebum and tightens pores, 2–3× a week", zh: "吸附油脂、收敛毛孔的泥膜，每周2~3次", ja: "皮脂を吸着し毛穴を引き締めるクレイパック、週2〜3回", vi: "Mặt nạ đất sét hút bã nhờn, se lỗ chân lông, 2–3 lần/tuần" } },
      { id: "o-bb", photo: "img/p/o-bb.jpg", color: "#d9c3a8", was: 1360000, price: 408000,
        name: { ko: "비비 크림", en: "BB Cream", zh: "BB霜", ja: "BBクリーム", vi: "Kem BB" },
        desc: { ko: "자연스러운 톤 보정, 민감 피부도 OK", en: "Natural, even tone; suitable for sensitive skin", zh: "自然修饰肤色，敏感肌可用", ja: "自然にトーン補正、敏感肌にも", vi: "Điều chỉnh tông da tự nhiên, phù hợp da nhạy cảm" } },
    ],
  },
];

// 제품별 효능·사용법 (카탈로그 원문 기준). 메뉴에서 "효능·사용법"을 누르면 펼쳐진다.
// good = 효능(줄마다 한 가지), how = 사용법, test = 임상 결과(있을 때만)
const CC_HOW = {
  ko: "스킨케어 마지막 단계에서 적당량을 필요한 부위에 부드럽게 펴 발라 주세요.",
  en: "As the last step of your routine, gently spread a suitable amount over the area that needs care.",
  zh: "在护肤最后一步，取适量轻轻涂抹于需要护理的部位。",
  ja: "スキンケアの最後に、適量をケアしたい部分にやさしくなじませます。",
  vi: "Ở bước cuối cùng của quy trình dưỡng da, thoa nhẹ nhàng một lượng vừa đủ lên vùng da cần chăm sóc.",
};
const CC_SAFE = { ko: "피부 자극 테스트 완료 · 파라벤·중금속 무첨가", en: "Skin-irritation tested · no parabens or heavy metals", zh: "已完成皮肤刺激测试 · 无防腐剂、无重金属", ja: "皮膚刺激テスト済み・パラベン/重金属不使用", vi: "Đã thử nghiệm kích ứng da · không paraben, kim loại nặng" };

window.INFO = {
  "c-a": {
    good: {
      ko: ["AHA·BHA·PHA 3가지 각질 성분으로 묵은 각질·노폐물 제거", "거친 피부결을 매끈하게 — 피부과 시술 없이", "세라마이드로 장벽 강화·보습, 그린토마토로 탄력"],
      en: ["Three exfoliants (AHA·BHA·PHA) clear dead skin and impurities", "Smooths rough texture — no clinic treatment needed", "Ceramide strengthens the barrier; green tomato boosts firmness"],
      zh: ["AHA·BHA·PHA三重去角质，清除老废角质与杂质", "改善粗糙肌理，无需医美也能光滑", "神经酰胺强化屏障保湿，青番茄提升弹性"],
      ja: ["AHA・BHA・PHAの3成分で古い角質と汚れをオフ", "ごわつく肌をなめらかに — 施術いらず", "セラミドでバリア・保湿、グリーントマトでハリ"],
      vi: ["3 thành phần AHA–BHA–PHA loại bỏ tế bào chết, tạp chất", "Cải thiện da thô ráp, mịn màng mà không cần can thiệp da liễu", "Ceramide tăng cường hàng rào ẩm, cà chua xanh tăng đàn hồi"],
    },
    how: CC_HOW,
    test: { ko: "1회 사용 후 피부 거칠기 57.58% 감소", en: "Skin roughness reduced by 57.58% after one use", zh: "使用一次后粗糙度降低57.58%", ja: "1回の使用で肌のざらつき57.58%減少", vi: "Giảm 57,58% độ thô ráp chỉ sau một lần dùng" },
  },
  "c-m": {
    good: {
      ko: ["트라넥삼산·글루타치온이 멜라닌 생성을 억제해 기미·잡티 완화", "칙칙한 피부톤을 맑고 고르게", "언제 어디서나 촉촉하게, 탄탄하고 건강한 피부"],
      en: ["Tranexamic acid & glutathione curb melanin to fade spots", "Brightens and evens out dull skin tone", "Keeps skin moist, firm and healthy day and night"],
      zh: ["传明酸·谷胱甘肽抑制黑色素，淡化色斑", "改善暗沉，肤色更透亮均匀", "日夜保湿，肌肤紧致健康"],
      ja: ["トラネキサム酸・グルタチオンがメラニンを抑えシミをケア", "くすんだ肌を明るく均一に", "いつでもうるおい、ハリのある健やかな肌に"],
      vi: ["Axit tranexamic & glutathione ức chế melanin, mờ thâm nám", "Làm sáng, đều màu da xỉn", "Dưỡng ẩm mọi lúc, da săn chắc khỏe mạnh cả ngày lẫn đêm"],
    },
    how: CC_HOW,
    test: { ko: "1회 사용 후 피부톤 균일도 5.24% 개선", en: "Skin-tone evenness improved 5.24% after one use", zh: "使用一次后肤色均匀度提升5.24%", ja: "1回の使用で肌トーンの均一さ5.24%改善", vi: "Cải thiện 5,24% độ đều màu da sau một lần dùng" },
  },
  "c-r": {
    good: {
      ko: ["환경 자극·벌레 물림으로 붉어진 피부 진정", "해양 플랑크톤 추출물로 피부 면역·회복력 강화", "건조로 지친 피부에 집중 보습, 피지 조절"],
      en: ["Calms redness from irritation or insect bites", "Marine plankton extract boosts skin immunity and recovery", "Intensive moisture for stressed, dry skin; controls excess oil"],
      zh: ["舒缓环境刺激或蚊虫叮咬引起的泛红", "海洋浮游生物提取物增强肌肤免疫与修复力", "为干燥疲惫的肌肤深层保湿，调节油脂"],
      ja: ["外的刺激や虫刺されによる赤みを鎮静", "海洋プランクトンエキスで肌の免疫・回復力アップ", "乾燥で疲れた肌を集中保湿、皮脂もコントロール"],
      vi: ["Làm dịu da ửng đỏ do môi trường, côn trùng đốt", "Chiết xuất phù du biển tăng miễn dịch và phục hồi da", "Dưỡng ẩm chuyên sâu cho da khô, kiểm soát bã nhờn"],
    },
    how: CC_HOW,
    test: { ko: "1회 사용 후 피부 자극 5.89% 감소", en: "Skin irritation reduced 5.89% after one use", zh: "使用一次后刺激感降低5.89%", ja: "1回の使用で肌刺激5.89%減少", vi: "Giảm 5,89% kích ứng da sau một lần dùng" },
  },
  "c-k": {
    good: {
      ko: ["비타민 K로 칙칙한 피부 회복", "혈액순환을 도와 붉은 실핏줄(모세혈관) 비침 완화", "부딪힘·상처로 생긴 멍·자국 빠른 회복, 탄력 강화"],
      en: ["Vitamin K revives dull skin", "Improves circulation to reduce visible capillaries", "Speeds recovery of bruises and marks; boosts elasticity"],
      zh: ["维生素K改善暗沉", "促进血液循环，减轻红血丝", "加速淤青与伤痕恢复，增强弹性"],
      ja: ["ビタミンKでくすんだ肌を回復", "血行を促し、毛細血管の赤み透けを軽減", "打ち身やあざ跡の回復をサポート、ハリアップ"],
      vi: ["Bổ sung vitamin K, phục hồi làn da xỉn màu", "Tăng lưu thông máu, giảm lộ mao mạch", "Mau hồi phục vết bầm, vết thâm do va chạm; tăng đàn hồi"],
    },
    how: CC_HOW,
    test: { ko: "1회 사용 후 눈 밑 피부톤 8.79% 개선", en: "Under-eye tone improved 8.79% after one use", zh: "使用一次后眼下肤色改善8.79%", ja: "1回の使用で目の下のトーン8.79%改善", vi: "Cải thiện 8,79% tông màu da dưới mắt sau một lần dùng" },
  },
  "c-t": {
    good: {
      ko: ["고순도 병풀 유효성분(TECA)으로 붉은기·자극 진정", "건조로 인한 가려움·당김 집중 케어", "리포좀 공법·4가지 오일로 속까지 오래 촉촉"],
      en: ["High-purity centella actives (TECA) calm redness and irritation", "Intensive care for itchy, tight, dry skin", "Liposome tech + 4 oils keep moisture locked in deep"],
      zh: ["高纯度积雪草活性成分TECA舒缓泛红刺激", "集中护理干燥引起的瘙痒与紧绷", "脂质体技术+4种精油，深层持久保湿"],
      ja: ["高純度ツボクサ成分TECAで赤み・刺激を鎮静", "乾燥によるかゆみ・つっぱりを集中ケア", "リポソーム技術と4種のオイルで奥までうるおいキープ"],
      vi: ["Chiết xuất rau má TECA tinh khiết làm dịu da ửng đỏ, kích ứng", "Chăm sóc chuyên sâu da khô, ngứa, căng", "Công nghệ liposome + 4 loại tinh dầu giữ ẩm sâu lâu dài"],
    },
    how: CC_HOW,
    test: { ko: "1회 사용 후 건조로 인한 당김 5.00% 감소", en: "Dryness-related tightness reduced 5.00% after one use", zh: "使用一次后干燥紧绷感降低5.00%", ja: "1回の使用で乾燥によるつっぱり5.00%減少", vi: "Giảm 5,00% tình trạng căng da do khô sau một lần dùng" },
  },
  "c-c": {
    good: {
      ko: ["건조한 피부에 집중 보습·진정", "세라마이드·판테놀로 손상된 피부 장벽 회복", "알란토인으로 피부 재생, 환하고 탄력 있는 피부"],
      en: ["Intensive hydration and soothing for dry skin", "Ceramide & panthenol repair a damaged barrier", "Allantoin supports renewal for bright, elastic skin"],
      zh: ["为干燥肌深层保湿舒缓", "神经酰胺·泛醇修护受损屏障", "尿囊素促进再生，肌肤透亮有弹性"],
      ja: ["乾燥肌を集中保湿・鎮静", "セラミド・パンテノールで傷んだバリアを修復", "アラントインで再生をサポート、明るくハリのある肌へ"],
      vi: ["Dưỡng ẩm, làm dịu chuyên sâu cho da khô", "Ceramide & panthenol phục hồi hàng rào da bị tổn thương", "Allantoin hỗ trợ tái tạo, da rạng rỡ, đàn hồi"],
    },
    how: CC_HOW,
    test: { ko: "1회 사용 후 피부 보습 37.15% 증가", en: "Skin hydration up 37.15% after one use", zh: "使用一次后保湿度提升37.15%", ja: "1回の使用で肌の保湿37.15%アップ", vi: "Dưỡng ẩm sâu tới 37,15% sau một lần dùng" },
  },

  "o-set": {
    good: {
      ko: ["토너·에멀전·세럼·아쿠아크림·영양크림·크림팩트·아이크림·클렌징폼·마스크팩·비비크림 10종", "딥테로카르푸스 성분으로 미백·주름 개선, 피부 자생력 강화", "선물용 고급 케이스 — 2019 한-아세안 정상회의 영부인 선물"],
      en: ["10 items: toner, emulsion, serum, aqua cream, nutrition cream, cream pact, eye cream, cleansing foam, mask pack, BB cream", "Dipterocarpus intricatus brightens, reduces wrinkles, restores balance", "Luxury gift box — the 2019 Korea–ASEAN Summit gift for First Ladies"],
      zh: ["10件：爽肤水、乳液、精华、水润霜、营养霜、气垫粉、眼霜、洁面、面膜、BB霜", "龙脑香树成分美白淡纹，增强肌肤自愈力", "高级礼盒 — 2019韩国-东盟峰会第一夫人礼品"],
      ja: ["トナー・エマルジョン・セラム・アクアクリーム・栄養クリーム・クリームパクト・アイクリーム・洗顔・パック・BBクリームの10点", "フタバガキ成分で美白・シワ改善、肌本来の力を強化", "高級ギフトボックス — 2019年韓国-ASEAN首脳会議のファーストレディへの贈り物"],
      vi: ["10 sản phẩm: toner, sữa dưỡng, serum, kem aqua, kem dinh dưỡng, phấn nền, kem mắt, sữa rửa mặt, mặt nạ, kem BB", "Dipterocarpus intricatus giúp trắng da, cải thiện nếp nhăn, cân bằng da", "Hộp quà sang trọng — quà tặng Đệ nhất phu nhân Hội nghị Hàn Quốc–ASEAN 2019"],
    },
    how: { ko: "클렌징폼 → 토너 → 에멀전 → 세럼 → 아쿠아/영양크림 → 아이크림 순서로, 메이크업은 비비크림·크림팩트. 마스크팩은 주 2~3회.", en: "Cleansing foam → toner → emulsion → serum → aqua/nutrition cream → eye cream; BB cream and cream pact for makeup. Mask pack 2–3 times a week.", zh: "洁面 → 爽肤水 → 乳液 → 精华 → 水润/营养霜 → 眼霜；底妆用BB霜和气垫粉。面膜每周2–3次。", ja: "洗顔 → トナー → エマルジョン → セラム → アクア/栄養クリーム → アイクリーム。メイクはBBクリームとクリームパクト。パックは週2〜3回。", vi: "Sữa rửa mặt → toner → sữa dưỡng → serum → kem aqua/dinh dưỡng → kem mắt; trang điểm với kem BB và phấn nền. Mặt nạ 2–3 lần/tuần." },
  },
  "o-toner": {
    good: { ko: ["갈락토미세스 발효 성분으로 보습·유수분 밸런스", "묵은 각질 정돈, 모공 케어", "병풀 추출물로 피부 진정"], en: ["Galactomyces ferment hydrates and balances", "Helps clear dead skin and tighten pores", "Centella extract soothes"], zh: ["半乳糖酵母发酵成分保湿平衡", "温和去角质，收敛毛孔", "积雪草提取物舒缓肌肤"], ja: ["ガラクトミセス発酵成分で保湿・バランス", "古い角質を整え、毛穴ケア", "ツボクサエキスで鎮静"], vi: ["Thành phần lên men Galactomyces cấp ẩm, cân bằng da", "Hỗ trợ loại bỏ tế bào chết, se khít lỗ chân lông", "Chiết xuất rau má làm dịu da"] },
    how: { ko: "세안 후 첫 단계에 적당량을 펴 바르고 손끝으로 가볍게 마사지. 화장솜에 듬뿍 적셔 10~15분 팩으로 써도 좋아요.", en: "First step after cleansing: spread and massage in with fingertips. Or soak cotton pads and use as a 10–15 min mask.", zh: "洁面后第一步，取适量涂抹并用指腹轻轻按摩。也可浸湿化妆棉敷10–15分钟。", ja: "洗顔後の最初に適量をなじませ、指先で軽くマッサージ。コットンにたっぷり含ませて10〜15分パックにも。", vi: "Sau khi rửa mặt, thoa đều và massage nhẹ bằng đầu ngón tay. Hoặc thấm đẫm bông tẩy trang đắp 10–15 phút." },
  },
  "o-emul": {
    good: { ko: ["가볍고 부드럽게 스며드는 보습", "유수분 밸런스, 피부결 개선", "민감 피부 진정, 탄력 있는 피부"], en: ["Light, silky texture that absorbs fast", "Balances oil and moisture, refines texture", "Soothes sensitive skin; leaves it firm and bouncy"], zh: ["质地轻盈，快速吸收", "平衡水油，改善肤质", "舒缓敏感肌，肌肤紧致有弹性"], ja: ["軽くなめらかにすっと浸透", "油分と水分のバランス、キメを整える", "敏感肌を鎮静、ハリのある肌に"], vi: ["Kết cấu nhẹ, mềm mịn, thẩm thấu nhanh", "Cân bằng dầu và độ ẩm, cải thiện kết cấu da", "Làm dịu da nhạy cảm, da căng bóng đàn hồi"] },
    how: { ko: "토너 다음, 적당량(지름 1.2cm 정도)을 얼굴 전체에 펴 바르고 가볍게 마사지해 흡수시켜요.", en: "After toner, spread about 0.4 ml (1.2 cm dot) over the face and massage lightly.", zh: "爽肤水后，取约0.4ml（直径1.2cm）涂满全脸，轻轻按摩吸收。", ja: "トナーの後、約0.4ml（直径1.2cm）を顔全体になじませ、軽くマッサージ。", vi: "Sau toner, thoa khoảng 0,4ml (đường kính 1,2cm) lên toàn mặt, massage nhẹ để thẩm thấu." },
  },
  "o-serum": {
    good: { ko: ["병풀·알란토인·엑토인으로 민감해진 피부 진정", "깊은 보습으로 당김 없이 촉촉", "탄력·광채, 자외선·활성산소로부터 피부 보호"], en: ["Centella, allantoin & ectoin calm sensitized skin", "Deep moisture without tightness", "Firmness and glow; protects against free radicals and UV"], zh: ["积雪草·尿囊素·依克多因舒缓敏感肌", "深层保湿，不紧绷", "紧致亮泽，抵御自由基与紫外线"], ja: ["ツボクサ・アラントイン・エクトインで敏感な肌を鎮静", "つっぱらない深いうるおい", "ハリとツヤ、活性酸素・紫外線から肌を守る"], vi: ["Rau má, allantoin, ectoin làm dịu da nhạy cảm", "Cấp ẩm sâu, da không khô căng", "Săn chắc, sáng da; bảo vệ khỏi gốc tự do và tia UV"] },
    how: { ko: "에멀전 다음, 적당량을 피부결 따라 펴 바르고 손끝으로 두드려 흡수. 안쪽에서 바깥쪽으로 원을 그리며 마사지해요.", en: "After emulsion, spread along the skin, pat in with fingertips and massage in circles from the center outward.", zh: "乳液后取适量顺肤纹涂抹，用指腹轻拍吸收，由内向外打圈按摩。", ja: "エマルジョンの後、肌に沿って広げ指先でなじませ、内側から外側へ円を描くようにマッサージ。", vi: "Sau sữa dưỡng, thoa dọc theo kết cấu da, vỗ nhẹ để thẩm thấu, massage tròn từ trong ra ngoài." },
  },
  "o-aqua": {
    good: { ko: ["산뜻하고 시원한 사용감의 수분 크림", "풍부한 보습, 매끈한 피부결", "히알루론산이 보호막을 만들어 건강한 피부"], en: ["Fresh, cooling water cream", "Rich hydration and smoother texture", "Sodium hyaluronate forms a protective layer"], zh: ["清爽凉感的水润霜", "丰盈保湿，肌肤细滑", "透明质酸钠形成保护膜"], ja: ["さっぱりひんやりの水分クリーム", "たっぷり保湿、なめらかなキメ", "ヒアルロン酸Naが保護膜をつくる"], vi: ["Kem dưỡng ẩm cảm giác mát lạnh", "Dưỡng ẩm phong phú, mịn kết cấu da", "Natri hyaluronate tạo lớp bảo vệ cho da khỏe"] },
    how: { ko: "세럼 다음, 적당량(지름 1.2cm 정도)을 얼굴 중앙에서 바깥쪽으로 부드럽게 펴 발라요.", en: "After serum, spread about 0.4 ml (1.2 cm dot) from the center of the face outward.", zh: "精华后，取约0.4ml（直径1.2cm）由面部中央向外轻轻推开。", ja: "セラムの後、約0.4ml（直径1.2cm）を顔の中心から外側へやさしく広げます。", vi: "Sau serum, thoa khoảng 0,4ml (1,2cm) và tán đều từ giữa mặt ra ngoài." },
  },
  "o-nutri": {
    good: { ko: ["끈적임 없이 촉촉한 영양 크림", "유럽 밤 오일·마데카식산으로 탄력·주름 케어", "피부 재생, 유수분 밸런스"], en: ["Nourishing cream that moisturizes without stickiness", "Chestnut oil & madecassic acid for elasticity and wrinkles", "Supports skin renewal and oil–moisture balance"], zh: ["滋养不粘腻", "欧洲栗油·羟基积雪草酸改善弹性与细纹", "促进肌肤再生，平衡水油"], ja: ["べたつかずしっとり栄養クリーム", "ヨーロッパグリ油・マデカシン酸でハリ・シワケア", "肌の再生と油水分バランス"], vi: ["Kem dinh dưỡng ẩm mà không nhờn dính", "Dầu hạt dẻ châu Âu, axit madecassic tăng đàn hồi, giảm nếp nhăn", "Hỗ trợ tái tạo da, cân bằng dầu và độ ẩm"] },
    how: { ko: "에멀전·세럼 다음, 적당량을 피부결 따라 펴 바르고 두드려 흡수. 안쪽에서 바깥쪽으로 원을 그리며 마사지해요.", en: "After emulsion/serum, spread along the skin, pat in and massage in circles outward.", zh: "乳液/精华后取适量顺肤纹涂抹，轻拍吸收，由内向外打圈按摩。", ja: "エマルジョン・セラムの後、肌に沿って広げてなじませ、内側から外側へ円を描くようにマッサージ。", vi: "Sau sữa dưỡng/serum, thoa dọc theo kết cấu da, vỗ nhẹ, massage tròn từ trong ra ngoài." },
  },
  "o-eye": {
    good: { ko: ["얇은 눈가 피부의 주름 집중 케어", "마카다미아 오일로 노화 방지, 탄력", "메도우폼 오일로 촉촉하고 부드럽게"], en: ["Targets wrinkles on delicate eye skin", "Macadamia oil for anti-aging and firmness", "Meadowfoam oil keeps it moist and soft"], zh: ["集中改善眼周细纹", "夏威夷果油抗老紧致", "白池花籽油滋润柔软"], ja: ["薄い目もとのシワを集中ケア", "マカダミアオイルでエイジングケア・ハリ", "メドウフォームオイルでしっとりやわらか"], vi: ["Chăm sóc chuyên sâu nếp nhăn vùng mắt mỏng manh", "Dầu macadamia chống lão hóa, tăng đàn hồi", "Dầu meadowfoam giữ ẩm, làm mềm da"] },
    how: { ko: "소량(0.05~0.1ml)을 눈가에 콕콕 찍어 톡톡 두드려 흡수시켜요.", en: "Dot a small amount (0.05–0.1 ml) around the eyes and pat gently to absorb.", zh: "取少量（0.05–0.1ml）点在眼周，轻拍吸收。", ja: "少量（0.05〜0.1ml）を目もとに置き、やさしくたたいてなじませます。", vi: "Chấm nhẹ một lượng nhỏ (0,05–0,1ml) quanh mắt, vỗ nhẹ để thẩm thấu." },
  },
  "o-foam": {
    good: { ko: ["제주 화산송이가 피지·노폐물을 흡착, 모공 정화", "설페이트 없는 부드러운 미세 거품", "세안 후에도 당기지 않고 산뜻"], en: ["Jeju volcanic ash absorbs oil and impurities, purifies pores", "Sulfate-free, fine and gentle foam", "Fresh, never tight after washing"], zh: ["济州火山灰吸附油脂与污垢，净化毛孔", "无硫酸盐，绵密泡沫", "洗后清爽不紧绷"], ja: ["済州火山灰が皮脂・汚れを吸着、毛穴すっきり", "サルフェートフリーのきめ細かい泡", "洗い上がりもつっぱらずさっぱり"], vi: ["Tro núi lửa Jeju hút dầu thừa, bụi bẩn, làm sạch lỗ chân lông", "Không chứa sulfate, bọt mịn", "Sảng khoái, không khô căng sau khi rửa"] },
    how: { ko: "적당량을 물과 함께 거품 내 얼굴 전체를 부드럽게 마사지한 뒤 물로 깨끗이 헹궈요.", en: "Lather with water, massage gently over the face, then rinse well.", zh: "取适量加水起泡，轻柔按摩全脸后用清水洗净。", ja: "適量を水で泡立て、顔全体をやさしくマッサージしてから洗い流します。", vi: "Tạo bọt với nước, massage nhẹ toàn mặt rồi rửa sạch." },
  },
  "o-mask": {
    good: { ko: ["제주 화산송이 클레이로 피지 흡착, 모공 축소", "모공 속 노폐물 관리", "건조함 없이 촉촉하게 마무리"], en: ["Jeju volcanic clay absorbs sebum, tightens pores", "Clears impurities deep in pores", "Leaves skin moist, not dry"], zh: ["济州火山泥吸附皮脂，收缩毛孔", "清理毛孔深层污垢", "洗后滋润不干燥"], ja: ["済州火山クレイが皮脂を吸着、毛穴を引き締め", "毛穴の奥の汚れをケア", "乾燥せずしっとり仕上がる"], vi: ["Đất sét núi lửa Jeju hút bã nhờn, se khít lỗ chân lông", "Kiểm soát bụi bẩn trong lỗ chân lông", "Giữ ẩm, không gây khô ráp"] },
    how: { ko: "세안 후 피지가 많은 부위 중심으로 얼굴 전체에 바르고 10~15분 뒤 물로 씻어내요. 주 2~3회.", en: "After cleansing, apply over the face (focus on oily areas), rinse off after 10–15 min. 2–3 times a week.", zh: "洁面后涂满全脸（重点油性部位），10–15分钟后洗净。每周2–3次。", ja: "洗顔後、皮脂の多い部分を中心に顔全体に塗り、10〜15分後に洗い流します。週2〜3回。", vi: "Sau khi rửa mặt, thoa toàn mặt, nhất là vùng tiết dầu; giữ 10–15 phút rồi rửa sạch. 2–3 lần/tuần." },
  },
  "o-bb": {
    good: { ko: ["끈적임 없이 자연스럽고 고른 피부톤", "스쿠알란·토코페롤로 건조·민감 피부 보습·진정", "붉은기 커버"], en: ["Natural, even tone without stickiness", "Squalane & tocopherol moisturize and soothe dry, sensitive skin", "Covers redness"], zh: ["自然均匀肤色，不粘腻", "角鲨烷·维生素E滋润舒缓干燥敏感肌", "遮盖泛红"], ja: ["べたつかず自然で均一な肌トーン", "スクワラン・トコフェロールで乾燥・敏感肌を保湿・鎮静", "赤みをカバー"], vi: ["Tông da tự nhiên, đều màu, không nhờn dính", "Squalane & tocopherol cấp ẩm, làm dịu da khô, nhạy cảm", "Che phủ tình trạng đỏ mặt"] },
    how: { ko: "적당량을 덜어 퍼프로 얼굴 전체에 고르게 펴 발라요.", en: "Take a suitable amount and blend evenly over the face with a sponge.", zh: "取适量，用粉扑均匀推开于全脸。", ja: "適量をとり、パフで顔全体に均一に広げます。", vi: "Lấy một lượng vừa đủ, dùng bông mút tán đều lên toàn mặt." },
  },
};
