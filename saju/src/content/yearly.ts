// Text for the yearly zodiac fortune pages. All wording is original.
import type { Lang } from '../i18n';
import type { Relation } from '../engine/fortune';
import type { NayinRelation } from '../engine/match';

type Level = 1 | 2 | 3 | 4 | 5;

interface YearlyText {
  ganzhi: (stem: string, branch: string, hanja: string) => string;
  indexTitle: (y: number, ganzhi: string) => string;
  indexDesc: string;
  yearIntro: Record<number, string>;
  zodiacTitle: (y: number, animal: string) => string;
  zodiacDesc: (y: number, animal: string, ganzhi: string) => string;
  ranking: string;
  findMine: string;
  yearPh: string;
  go: string;
  lunarNote: string;
  overall: string;
  areas: Record<'love' | 'money' | 'work' | 'health', string>;
  lucky: string;
  color: string;
  number: string;
  direction: string;
  monthly: string;
  monthLabel: (i: number) => string;
  birthYears: string;
  colYear: string;
  colAge: string;
  colNayin: string;
  ageText: (count: number, intl: number) => string;
  nayinNote: Record<NayinRelation, string>;
  others: string;
  sajuCta: string;
  sajuCtaDesc: string;
  disclaimer: string;
  homeBand: (y: number) => string;
  homeBandDesc: string;
  traits: string[];
  relation: Record<Relation, { head: string; body: string }>;
  area: Record<'love' | 'money' | 'work' | 'health', Record<Level, string>>;
  month: Record<Level, string>;
  samjae: { badge: string[]; text: string[] };
}

const ko: YearlyText = {
  ganzhi: (s, b, h) => `${s}${b}년(${h}年)`,
  indexTitle: (y, g) => `${y}년 ${g} 띠별 신년운세`,
  indexDesc: '올해의 간지와 12띠의 합·충 관계, 오행의 흐름으로 띠별 한 해 운세와 월별 흐름을 풀어 드립니다.',
  yearIntro: {
    2027: '2027년은 정미년(丁未年)입니다. 천간 정(丁)은 촛불처럼 은은한 불, 지지 미(未)는 한여름의 뜨거운 흙이라, 따뜻한 기운이 흙을 데워 결실을 준비하는 해로 봅니다. 띠로는 양띠(베트남은 염소띠)의 해이고, 납음오행은 하늘의 은하수를 뜻하는 천하수(天河水)입니다. 서두르기보다 차분히 쌓은 것이 빛을 보는 흐름입니다.',
  },
  zodiacTitle: (y, a) => `${y}년 ${a}띠 운세`,
  zodiacDesc: (y, a, g) => `${y}년 ${g} ${a}띠의 총운과 재물·애정·일·건강, 삼재 여부, 월별 운세와 출생 연도별 풀이를 무료로 확인하세요.`,
  ranking: '띠별 운세 순위',
  findMine: '내 띠 운세 보기',
  yearPh: '출생 연도 (예: 1990)',
  go: '보기',
  lunarNote: '1~2월생은 설 이전이면 앞 해의 띠입니다.',
  overall: '총운',
  areas: { love: '애정', money: '재물', work: '일·학업', health: '건강' },
  lucky: '행운을 부르는 것',
  color: '색', number: '숫자', direction: '방향',
  monthly: '월별 운세 (절기 기준)',
  monthLabel: (i) => `${i + 1}월`,
  birthYears: '출생 연도별 풀이',
  colYear: '출생 연도', colAge: '나이', colNayin: '납음오행',
  ageText: (c, i) => `${c}세 (만 ${i}세)`,
  nayinNote: {
    generate: '해의 기운과 서로 살려 주는 관계 — 도움이 들어옵니다',
    same: '해의 기운과 같은 성질 — 무난하고 안정적입니다',
    control: '해의 기운과 부딪히는 관계 — 무리한 확장은 피하세요',
  },
  others: '다른 띠 운세',
  sajuCta: '내 사주로 보는 올해 운세',
  sajuCtaDesc: '띠 운세는 태어난 해만 봅니다. 생년월일시로 사주를 세우면 올해 들어오는 기운(세운)을 더 자세히 볼 수 있습니다.',
  disclaimer: '띠별 운세는 전통 명리학의 합·충·오행 관계를 바탕으로 한 참고용 풀이입니다.',
  homeBand: (y) => `${y} 정미년 띠별 신년운세`,
  homeBandDesc: '12띠의 한 해 총운과 월별 흐름, 삼재까지 무료로 확인하세요.',
  traits: [
    '쥐띠는 눈치가 빠르고 기회를 먼저 알아보는 영리함이 있습니다.',
    '소띠는 묵묵히 꾸준하게 쌓아 올리는 끈기가 가장 큰 무기입니다.',
    '호랑이띠는 앞장서는 용기와 정의감으로 사람을 이끕니다.',
    '토끼띠는 섬세하고 다정하며 분위기를 부드럽게 만드는 재주가 있습니다.',
    '용띠는 큰 꿈을 품고 사람들의 시선을 모으는 존재감이 있습니다.',
    '뱀띠는 차분한 통찰력으로 일의 흐름을 깊이 읽어 냅니다.',
    '말띠는 활동적이고 솔직해 어디서든 에너지를 불어넣습니다.',
    '양띠는 온화하고 배려심이 깊어 주변에 사람이 모입니다.',
    '원숭이띠는 재치와 손재주가 뛰어나 문제를 영리하게 풉니다.',
    '닭띠는 꼼꼼하고 부지런해 맡은 일을 깔끔하게 마무리합니다.',
    '개띠는 의리와 책임감이 강해 믿고 맡길 수 있는 사람입니다.',
    '돼지띠는 너그럽고 복이 많아 사람과 재물이 따르는 편입니다.',
  ],
  relation: {
    sixHarmony: { head: '올해와 육합(六合)을 이루는 해', body: '한 해의 기운과 내 띠가 짝을 이루어 손발이 잘 맞습니다. 귀인의 도움과 좋은 인연이 자연스럽게 찾아오고, 미뤄 둔 계획을 시작하기에 알맞은 시기입니다.' },
    threeHarmony: { head: '올해와 삼합(三合)으로 뜻이 맞는 해', body: '올해의 흐름이 내 띠를 북돋아 주어 노력한 만큼 결과가 나옵니다. 같은 목표를 가진 사람들과 손잡으면 힘이 몇 배가 됩니다.' },
    neutral: { head: '큰 굴곡 없이 무난한 해', body: '올해의 기운과 내 띠 사이에 특별한 부딪힘이 없어 안정적으로 흘러갑니다. 화려한 변화보다 기본을 다지는 데 힘쓰면 연말에 단단한 성과가 남습니다.' },
    same: { head: '내 띠의 해, 본명년(本命年)', body: '올해는 내 띠와 같은 해입니다. 기운이 겹쳐 존재감은 커지지만 그만큼 고집과 부담도 커질 수 있습니다. 새 일은 신중히 시작하고, 몸과 마음의 균형을 챙기면 오히려 도약의 해가 됩니다.' },
    harm: { head: '작은 오해를 조심해야 하는 해', body: '올해와 내 띠가 해(害)의 관계라 가까운 사람과 서운함이 생기기 쉽습니다. 말은 한 번 더 생각하고, 약속과 기록을 분명히 하면 무난하게 지나갑니다.' },
    punish: { head: '규칙과 절차를 지켜야 하는 해', body: '올해와 내 띠가 형(刑)의 관계라 서류, 계약, 법규 같은 일에서 마찰이 생길 수 있습니다. 서두르지 말고 절차를 꼼꼼히 지키면 오히려 신뢰를 쌓는 계기가 됩니다.' },
    clash: { head: '변화와 이동이 많은 해', body: '올해와 내 띠가 충(沖)의 관계라 이사, 이직, 환경 변화가 생기기 쉽습니다. 흔들림은 크지만 새 판을 짜는 기회이기도 합니다. 큰 결정은 충분히 준비한 뒤 내리고, 건강과 안전을 특히 챙기세요.' },
  },
  area: {
    love: {
      5: '좋은 인연이 들어오는 해입니다. 연애 중이라면 관계가 한 단계 깊어지고, 혼자라면 소개나 모임에서 마음이 통하는 사람을 만날 수 있습니다.',
      4: '마음을 표현할수록 관계가 따뜻해집니다. 가족과 연인에게 시간을 쓰면 그만큼 돌아옵니다.',
      3: '큰 변화 없이 잔잔한 애정운입니다. 익숙함에 소홀해지지 않도록 작은 이벤트를 챙기세요.',
      2: '사소한 말다툼이 길어질 수 있습니다. 서운한 점은 쌓아 두지 말고 그때그때 부드럽게 풀어 주세요.',
      1: '관계에 시험이 찾아올 수 있는 해입니다. 감정적으로 결정하기보다 시간을 두고 대화하는 것이 좋습니다.',
    },
    money: {
      5: '재물이 들어오는 길이 넓어집니다. 부업이나 새 거래에서 기대 이상의 성과를 볼 수 있습니다.',
      4: '꾸준히 모은 만큼 쌓이는 해입니다. 계획적인 저축과 분산 투자가 잘 맞습니다.',
      3: '수입과 지출이 균형을 이룹니다. 큰 욕심보다 새는 돈을 막는 것이 이득입니다.',
      2: '예상하지 못한 지출이 생기기 쉽습니다. 보증이나 큰 투자는 신중히 판단하세요.',
      1: '돈이 들고 나는 폭이 큰 해입니다. 빌려주는 돈과 충동구매를 특히 조심하세요.',
    },
    work: {
      5: '능력을 인정받고 자리가 올라가는 해입니다. 승진, 합격, 좋은 제안이 따를 수 있습니다.',
      4: '노력한 결과가 눈에 보이는 해입니다. 새로운 역할을 맡으면 실력을 보여 줄 기회가 됩니다.',
      3: '맡은 일을 성실히 해내면 무리 없이 흘러갑니다. 하반기에 기회가 열릴 수 있습니다.',
      2: '책임은 늘고 결과는 더디게 느껴질 수 있습니다. 혼자 떠안기보다 도움을 요청하세요.',
      1: '조직 안의 변화나 갈등에 휘말리기 쉽습니다. 기록을 남기고 감정적인 대응은 피하세요.',
    },
    health: {
      5: '몸과 마음 모두 활력이 넘치는 해입니다. 새로운 운동을 시작하기에 좋습니다.',
      4: '전반적으로 건강하지만 규칙적인 생활을 유지하면 더 좋습니다.',
      3: '무리하지 않으면 무난합니다. 계절이 바뀔 때 컨디션 관리에 신경 쓰세요.',
      2: '피로가 쌓이기 쉬운 해입니다. 수면과 식사를 규칙적으로 챙기고 정기 검진을 받으세요.',
      1: '건강과 안전을 가장 먼저 챙겨야 하는 해입니다. 과로와 무리한 운전, 위험한 활동을 피하세요.',
    },
  },
  month: {
    5: '기운이 활짝 열리는 달 — 중요한 일을 추진하세요',
    4: '도움이 들어오는 달 — 협력하면 잘 풀립니다',
    3: '무난한 달 — 하던 일을 차분히 이어 가세요',
    2: '조심할 달 — 말과 지출을 아끼세요',
    1: '부딪힘이 있는 달 — 큰 결정은 미루세요',
  },
  samjae: {
    badge: ['', '들삼재', '눌삼재', '날삼재'],
    text: [
      '',
      '올해는 삼재가 시작되는 들삼재입니다. 새로운 일을 크게 벌이기보다 기존의 것을 지키며 준비하는 해로 삼으세요.',
      '올해는 삼재의 한가운데인 눌삼재입니다. 무리한 확장을 피하고 건강과 인간관계를 차분히 챙기세요.',
      '올해는 삼재가 끝나는 날삼재입니다. 마무리를 잘하면 내년부터 기운이 다시 열립니다.',
    ],
  },
};

const vi: YearlyText = {
  ganzhi: (s, b) => `${s} ${b}`,
  indexTitle: (y, g) => `Tử vi 12 con giáp năm ${y} ${g}`,
  indexDesc: 'Luận vận trình cả năm và từng tháng cho 12 con giáp, dựa trên quan hệ hợp – xung giữa Can Chi của năm và tuổi của bạn.',
  yearIntro: {
    2027: 'Năm 2027 là năm Đinh Mùi. Thiên can Đinh là lửa nhỏ như ngọn nến, Địa chi Mùi là đất nóng giữa hè — năm của hơi ấm ủ đất, chuẩn bị cho mùa gặt. Đây là năm con Dê (người Hàn gọi là năm con Cừu), mệnh Nạp âm Thiên Hà Thủy — nước của dải Ngân Hà. Những gì được vun đắp bền bỉ sẽ có dịp tỏa sáng.',
  },
  zodiacTitle: (y, a) => `Tử vi tuổi ${a} năm ${y}`,
  zodiacDesc: (y, a, g) => `Tử vi tuổi ${a} năm ${y} ${g}: tổng quan, tình cảm, tài lộc, công việc, sức khỏe, Tam Tai, vận từng tháng và luận theo năm sinh — miễn phí.`,
  ranking: 'Xếp hạng 12 con giáp',
  findMine: 'Xem tuổi của tôi',
  yearPh: 'Năm sinh (vd: 1990)',
  go: 'Xem',
  lunarNote: 'Sinh tháng 1–2 trước Tết thì tính theo tuổi năm trước.',
  overall: 'Tổng quan',
  areas: { love: 'Tình cảm', money: 'Tài lộc', work: 'Công việc', health: 'Sức khỏe' },
  lucky: 'Mang lại may mắn',
  color: 'Màu', number: 'Số', direction: 'Hướng',
  monthly: 'Vận từng tháng (theo tiết khí)',
  monthLabel: (i) => `Tháng ${i + 1}`,
  birthYears: 'Luận theo năm sinh',
  colYear: 'Năm sinh', colAge: 'Tuổi', colNayin: 'Mệnh',
  ageText: (c) => `${c} tuổi`,
  nayinNote: {
    generate: 'Mệnh tương sinh với năm — có quý nhân, thuận lợi',
    same: 'Mệnh cùng hành với năm — ổn định, êm ả',
    control: 'Mệnh tương khắc với năm — tránh mở rộng quá sức',
  },
  others: 'Tử vi các tuổi khác',
  sajuCta: 'Xem vận năm nay theo lá số Tứ trụ',
  sajuCtaDesc: 'Tử vi con giáp chỉ dựa vào năm sinh. Lập lá số theo ngày giờ sinh để xem kỹ hơn năng lượng của năm nay (Lưu niên).',
  disclaimer: 'Tử vi con giáp dựa trên quan hệ hợp – xung và Ngũ hành của mệnh lý truyền thống, chỉ mang tính tham khảo.',
  homeBand: (y) => `Tử vi ${y} Đinh Mùi cho 12 con giáp`,
  homeBandDesc: 'Xem miễn phí vận cả năm, từng tháng và Tam Tai của 12 con giáp.',
  traits: [
    'Người tuổi Tý nhanh nhạy, tinh ý và luôn nhìn ra cơ hội trước người khác.',
    'Người tuổi Sửu bền bỉ, chăm chỉ — sự kiên trì là vũ khí lớn nhất.',
    'Người tuổi Dần dũng cảm, chính trực và có khả năng dẫn dắt.',
    'Người tuổi Mão tinh tế, hiền hòa, khéo làm không khí dịu lại.',
    'Người tuổi Thìn có hoài bão lớn và sức hút tự nhiên.',
    'Người tuổi Tỵ điềm tĩnh, sâu sắc, đọc được dòng chảy của sự việc.',
    'Người tuổi Ngọ năng động, thẳng thắn, mang lại năng lượng ở bất cứ đâu.',
    'Người tuổi Mùi ôn hòa, chu đáo nên luôn được mọi người quý mến.',
    'Người tuổi Thân lanh lợi, khéo tay, giải quyết vấn đề rất thông minh.',
    'Người tuổi Dậu cẩn thận, siêng năng, làm việc gọn gàng chu đáo.',
    'Người tuổi Tuất trọng nghĩa, có trách nhiệm, rất đáng tin cậy.',
    'Người tuổi Hợi rộng lượng, phúc hậu, dễ có người và tiền tìm đến.',
  ],
  relation: {
    sixHarmony: { head: 'Năm Lục hợp với tuổi của bạn', body: 'Năng lượng của năm và tuổi bạn kết thành đôi, mọi việc dễ ăn ý. Quý nhân và nhân duyên tốt tự tìm đến — thời điểm đẹp để bắt đầu kế hoạch còn dang dở.' },
    threeHarmony: { head: 'Năm Tam hợp, thuận chí hướng', body: 'Dòng chảy của năm nâng đỡ tuổi bạn, cố gắng bao nhiêu sẽ có kết quả bấy nhiêu. Hợp tác với người cùng mục tiêu, sức mạnh sẽ nhân lên nhiều lần.' },
    neutral: { head: 'Năm bình ổn, ít sóng gió', body: 'Không có xung khắc đặc biệt giữa năm và tuổi bạn nên mọi việc diễn ra ổn định. Tập trung củng cố nền tảng thay vì thay đổi lớn, cuối năm sẽ có thành quả vững chắc.' },
    same: { head: 'Năm tuổi của bạn', body: 'Năm nay trùng với tuổi của bạn. Năng lượng chồng lên nhau giúp bạn nổi bật nhưng cũng dễ cố chấp và áp lực hơn. Khởi sự mới cần thận trọng; giữ cân bằng thân – tâm thì năm tuổi lại thành năm bứt phá.' },
    harm: { head: 'Năm cần cẩn thận hiểu lầm nhỏ', body: 'Năm nay và tuổi bạn ở thế Tương hại, dễ phát sinh tủi thân với người thân quen. Nghĩ kỹ trước khi nói, rõ ràng trong hẹn ước và giấy tờ thì mọi việc sẽ êm.' },
    punish: { head: 'Năm cần tuân thủ quy tắc, thủ tục', body: 'Năm nay và tuổi bạn ở thế Tương hình, dễ va chạm trong giấy tờ, hợp đồng, luật lệ. Đừng vội vàng, làm đúng thủ tục sẽ trở thành dịp tạo dựng uy tín.' },
    clash: { head: 'Năm nhiều thay đổi, di chuyển', body: 'Năm nay xung với tuổi bạn nên dễ có chuyển nhà, đổi việc, thay đổi môi trường. Biến động lớn nhưng cũng là cơ hội làm lại từ đầu. Quyết định lớn cần chuẩn bị kỹ; đặc biệt chú ý sức khỏe và an toàn.' },
  },
  area: {
    love: {
      5: 'Năm có nhân duyên đẹp. Đang yêu thì tình cảm sâu đậm hơn, còn độc thân dễ gặp người hợp ý qua giới thiệu hay các buổi gặp gỡ.',
      4: 'Càng bày tỏ, tình cảm càng ấm áp. Dành thời gian cho gia đình và người yêu sẽ được đáp lại xứng đáng.',
      3: 'Tình cảm êm đềm, ít biến động. Đừng để sự quen thuộc làm nguội lạnh — hãy chăm chút những điều nhỏ.',
      2: 'Cãi vã nhỏ dễ kéo dài. Điều không vui đừng giữ trong lòng, hãy nhẹ nhàng nói ra ngay.',
      1: 'Năm tình cảm có thử thách. Đừng quyết định theo cảm xúc, hãy cho nhau thời gian để trò chuyện.',
    },
    money: {
      5: 'Đường tài lộc rộng mở. Việc làm thêm hay giao dịch mới có thể mang lại kết quả ngoài mong đợi.',
      4: 'Tích lũy đều đặn sẽ thấy rõ thành quả. Tiết kiệm có kế hoạch và đầu tư phân tán là hợp nhất.',
      3: 'Thu chi cân bằng. Bịt các khoản chi lãng phí có lợi hơn là ham lớn.',
      2: 'Dễ có khoản chi bất ngờ. Bảo lãnh hay đầu tư lớn cần cân nhắc kỹ.',
      1: 'Tiền vào ra thất thường. Đặc biệt cẩn thận khi cho vay và mua sắm bốc đồng.',
    },
    work: {
      5: 'Năm được ghi nhận năng lực, thăng tiến. Có thể đón tin vui về thăng chức, thi đỗ hay lời mời hấp dẫn.',
      4: 'Thành quả nỗ lực hiện rõ. Nhận vai trò mới là dịp thể hiện bản lĩnh.',
      3: 'Làm tốt phần việc của mình thì mọi việc trôi chảy. Cơ hội có thể đến vào nửa cuối năm.',
      2: 'Trách nhiệm tăng nhưng kết quả có vẻ chậm. Đừng ôm hết một mình, hãy nhờ hỗ trợ.',
      1: 'Dễ bị cuốn vào thay đổi hay mâu thuẫn trong tổ chức. Lưu lại bằng chứng, tránh phản ứng cảm tính.',
    },
    health: {
      5: 'Thân tâm tràn đầy sinh lực. Thời điểm tốt để bắt đầu một môn thể thao mới.',
      4: 'Sức khỏe nhìn chung tốt; giữ nếp sinh hoạt điều độ sẽ càng tốt hơn.',
      3: 'Không quá sức thì ổn. Lưu ý giữ sức khỏe khi giao mùa.',
      2: 'Dễ tích tụ mệt mỏi. Ngủ nghỉ, ăn uống điều độ và đi khám định kỳ.',
      1: 'Năm cần ưu tiên sức khỏe và an toàn. Tránh làm việc quá sức, lái xe ẩu và các hoạt động nguy hiểm.',
    },
  },
  month: {
    5: 'Tháng hanh thông — đẩy mạnh việc quan trọng',
    4: 'Tháng có quý nhân — hợp tác sẽ thuận lợi',
    3: 'Tháng bình ổn — cứ đều đặn mà làm',
    2: 'Tháng cần cẩn trọng — giữ lời nói và chi tiêu',
    1: 'Tháng có xung đột — hoãn quyết định lớn',
  },
  samjae: {
    badge: ['', 'Tam Tai năm đầu', 'Tam Tai năm giữa', 'Tam Tai năm cuối'],
    text: [
      '',
      'Năm nay là năm đầu của hạn Tam Tai. Nên giữ gìn những gì đang có, chuẩn bị thay vì khởi sự lớn.',
      'Năm nay là năm giữa của hạn Tam Tai. Tránh mở rộng quá sức, chú ý sức khỏe và các mối quan hệ.',
      'Năm nay là năm cuối của hạn Tam Tai. Khép lại mọi việc chu đáo, từ năm sau vận khí sẽ mở trở lại.',
    ],
  },
};

export const YEARLY: Record<Lang, YearlyText> = { ko, vi };
