// Text for the 삼재 · Tam Tai · Kim Lâu · Hoang Ốc calculator. All wording is original.
import type { Lang } from '../i18n';

interface HazardText {
  title: string;
  lead: string;
  birthYear: string;
  birthPh: string;
  lunarNote: string;
  check: string;
  targetYear: string;
  custom: string;
  customKR: string;
  customVN: string;
  ageText: (age: number) => string;
  resultTitle: (y: number) => string;
  samjae: string;
  samjaeName: [string, string, string, string];
  samjaeText: [string, string, string, string];
  samjaeShort: [string, string, string, string];
  kimLau: string;
  kimLauName: Record<0 | 1 | 3 | 6 | 8, string>;
  kimLauText: Record<0 | 1 | 3 | 6 | 8, string>;
  hoangOc: string;
  hoangOcName: [string, string, string, string, string, string];
  hoangOcText: (bad: boolean) => string;
  hoangOcYoung: string;
  nine: string;
  nineText: (on: boolean) => string;
  own: string;
  ownText: string;
  clash: string;
  clashText: string;
  none: string;
  tableTitle: string;
  colYear: string;
  colAge: string;
  colWedding: string;
  colHouse: string;
  ok: string;
  avoid: string;
  goodWedding: string;
  goodHouse: string;
  ruleKR: string;
  ruleVN: string;
  groupsTitle: string;
  groupsDesc: string;
  groupCol: string;
  yearsCol: string;
  aboutTitle: string;
  about: { h: string; p: string }[];
  fortuneCta: (y: number) => string;
  share: string;
  disclaimer: string;
}

export const HAZARD: Record<Lang, HazardText> = {
  ko: {
    title: '삼재 계산기 · 내 삼재는 언제?',
    lead: '태어난 해만 넣으면 들삼재·눌삼재·날삼재가 언제인지, 올해가 본명년(띠 해)이나 충년인지, 아홉수인지 한 번에 알려 드립니다. 베트남 사람들이 결혼·집짓기 전에 꼭 보는 Kim Lâu, Hoang Ốc도 함께 계산합니다.',
    birthPh: '예: 1990',
    birthYear: '태어난 해',
    lunarNote: '1~2월 설 이전 출생이면 앞 해를 넣으세요(띠 기준).',
    check: '확인하기',
    targetYear: '보는 해',
    custom: '기준',
    customKR: '한국 풍습',
    customVN: '베트남 풍습',
    ageText: (a) => `${a}세 (세는나이)`,
    resultTitle: (y) => `${y}년 결과`,
    samjae: '삼재',
    samjaeName: ['삼재 아님', '들삼재', '눌삼재', '날삼재'],
    samjaeShort: ['', '들삼재', '눌삼재', '날삼재'],
    samjaeText: [
      '올해는 삼재에 해당하지 않습니다.',
      '삼재가 들어오는 첫해입니다. 새 일을 크게 벌이기보다 준비와 점검에 힘을 쓰세요.',
      '삼재의 가운데 해로, 예부터 가장 무겁게 여겼습니다. 건강과 안전, 계약서를 꼼꼼히 챙기세요.',
      '삼재가 나가는 해입니다. 마무리를 잘하면 다음 해부터 흐름이 가벼워집니다.',
    ],
    kimLau: 'Kim Lâu (베트남)',
    kimLauName: { 0: '해당 없음', 1: 'Kim Lâu Thân (자신)', 3: 'Kim Lâu Thê (배우자)', 6: 'Kim Lâu Tử (자녀)', 8: 'Kim Lâu Lục súc (재산)' },
    kimLauText: {
      0: '세는나이를 9로 나눈 나머지가 1·3·6·8이 아니어서 Kim Lâu가 아닙니다.',
      1: '세는나이를 9로 나눈 나머지가 1입니다. 베트남에서는 이 해에 결혼·집짓기를 미루는 집이 많습니다.',
      3: '나머지가 3으로, 배우자에게 좋지 않다고 보아 특히 신부의 결혼 연도를 볼 때 피합니다.',
      6: '나머지가 6으로, 자녀에게 좋지 않다고 봅니다.',
      8: '나머지가 8로, 예전에는 가축·재산에 손해가 난다고 보았습니다.',
    },
    hoangOc: 'Hoang Ốc (베트남)',
    hoangOcName: ['Nhất Cát (길)', 'Nhì Nghi (길)', 'Tam Địa Sát (흉)', 'Tứ Tấn Tài (길)', 'Ngũ Thọ Tử (흉)', 'Lục Hoang Ốc (흉)'],
    hoangOcText: (bad) => (bad ? '집을 짓거나 사기에 좋지 않은 궁에 듭니다. 베트남에서는 다른 가족 명의로 짓기도 합니다.' : '집을 짓기에 괜찮은 궁입니다.'),
    hoangOcYoung: '10세 미만은 보지 않습니다.',
    nine: '아홉수',
    nineText: (on) => (on ? '세는나이가 9로 끝나는 해입니다. 결혼 같은 큰일을 피하는 풍습이 있습니다.' : '아홉수가 아닙니다.'),
    own: '본명년',
    ownText: '내 띠의 해(본명년)입니다. 변화가 많으니 무리한 확장은 조심하세요.',
    clash: '충년',
    clashText: '올해의 띠가 내 띠와 정면으로 부딪히는(충) 해입니다. 이동·이사·사고에 유의하세요.',
    none: '해당 없음',
    tableTitle: '앞으로 12년 한눈에 보기',
    colYear: '연도',
    colAge: '나이',
    colWedding: '결혼',
    colHouse: '이사·집',
    ok: '○',
    avoid: '✕',
    goodWedding: '결혼하기 무난한 해',
    goodHouse: '이사·집 마련하기 무난한 해',
    ruleKR: '한국 풍습 기준: 결혼은 아홉수·삼재를, 이사는 삼재를 피한 해입니다.',
    ruleVN: '베트남 풍습 기준: 결혼은 Kim Lâu를, 집짓기는 Kim Lâu·Hoang Ốc·Tam Tai를 피한 해입니다.',
    groupsTitle: '띠별 삼재 연도표',
    groupsDesc: '삼재는 삼합(三合)으로 묶인 세 띠가 함께 겪습니다. 아래는 각 묶음의 삼재 3년입니다.',
    groupCol: '띠',
    yearsCol: '삼재 기간',
    aboutTitle: '알아 두면 좋은 것',
    about: [
      { h: '삼재(三災)란?', p: '12년마다 3년씩 돌아오는 시기로, 들어오는 해(들삼재)·머무는 해(눌삼재)·나가는 해(날삼재)로 나눕니다. 신자진(원숭이·쥐·용) 띠는 인묘진년, 사유축(뱀·닭·소) 띠는 해자축년, 인오술(호랑이·말·개) 띠는 신유술년, 해묘미(돼지·토끼·양) 띠는 사오미년에 삼재가 듭니다.' },
      { h: '베트남의 Tam Tai', p: '베트남에서도 같은 규칙으로 Tam Tai를 봅니다. 차이는 결혼·집짓기를 볼 때 Tam Tai보다 Kim Lâu와 Hoang Ốc를 더 중요하게 여긴다는 점입니다.' },
      { h: 'Kim Lâu와 Hoang Ốc', p: 'Kim Lâu는 세는나이(tuổi mụ)를 9로 나눈 나머지가 1·3·6·8인 해입니다. 결혼 때는 주로 신부 나이로, 집짓기 때는 집주인 나이로 봅니다. Hoang Ốc는 나이를 여섯 궁에 돌려 짚어 Tam Địa Sát·Ngũ Thọ Tử·Lục Hoang Ốc에 들면 집짓기를 피합니다.' },
      { h: '아홉수', p: '세는나이 9·19·29·39…처럼 9로 끝나는 해에는 결혼 같은 큰일을 미루는 한국 풍습입니다. 근거가 있는 규칙이라기보다 조심하자는 마음가짐에 가깝습니다.' },
    ],
    fortuneCta: (y) => `${y} 띠별 신년운세 보기`,
    share: '결과 링크 복사',
    disclaimer: '삼재·Kim Lâu·Hoang Ốc는 전통 풍습에 따른 참고용 정보입니다. 중요한 결정은 현실 여건을 먼저 살피세요.',
  },
  vi: {
    title: 'Tính hạn Tam Tai, Kim Lâu, Hoang Ốc',
    lead: 'Chỉ cần nhập năm sinh để biết năm nào gặp hạn Tam Tai, phạm Kim Lâu, Hoang Ốc, năm tuổi hay xung Thái Tuế — và năm nào hợp để cưới hỏi, làm nhà. Có thêm cách xem “삼재 · 아홉수” của người Hàn để tham khảo.',
    birthPh: 'VD: 1990',
    birthYear: 'Năm sinh (âm lịch)',
    lunarNote: 'Sinh tháng 1–2 dương lịch trước Tết thì nhập năm trước.',
    check: 'Xem ngay',
    targetYear: 'Năm cần xem',
    custom: 'Phong tục',
    customKR: 'Hàn Quốc',
    customVN: 'Việt Nam',
    ageText: (a) => `${a} tuổi mụ`,
    resultTitle: (y) => `Kết quả năm ${y}`,
    samjae: 'Tam Tai',
    samjaeName: ['Không phạm', 'Tam Tai năm đầu', 'Tam Tai năm giữa', 'Tam Tai năm cuối'],
    samjaeShort: ['', 'Đầu', 'Giữa', 'Cuối'],
    samjaeText: [
      'Năm này không phạm Tam Tai.',
      'Năm đầu của hạn Tam Tai. Nên chuẩn bị, rà soát kỹ hơn là khởi sự việc lớn.',
      'Năm giữa của Tam Tai, xưa nay được xem là nặng nhất. Chú ý sức khỏe, an toàn và giấy tờ.',
      'Năm cuối của Tam Tai. Khép lại mọi việc cho gọn, năm sau sẽ nhẹ nhõm hơn.',
    ],
    kimLau: 'Kim Lâu',
    kimLauName: { 0: 'Không phạm', 1: 'Kim Lâu Thân', 3: 'Kim Lâu Thê', 6: 'Kim Lâu Tử', 8: 'Kim Lâu Lục súc' },
    kimLauText: {
      0: 'Tuổi mụ chia 9 không dư 1, 3, 6, 8 nên không phạm Kim Lâu.',
      1: 'Tuổi mụ chia 9 dư 1 — hại cho bản thân. Nhiều gia đình hoãn cưới hỏi, làm nhà năm này.',
      3: 'Dư 3 — hại cho vợ/chồng, thường kiêng khi xem tuổi cô dâu.',
      6: 'Dư 6 — hại cho con cái.',
      8: 'Dư 8 — xưa cho là hại vật nuôi, tài sản.',
    },
    hoangOc: 'Hoang Ốc',
    hoangOcName: ['Nhất Cát (tốt)', 'Nhì Nghi (tốt)', 'Tam Địa Sát (xấu)', 'Tứ Tấn Tài (tốt)', 'Ngũ Thọ Tử (xấu)', 'Lục Hoang Ốc (xấu)'],
    hoangOcText: (bad) => (bad ? 'Rơi vào cung xấu, không nên làm nhà. Có thể mượn tuổi người khác đứng ra làm.' : 'Rơi vào cung tốt, có thể làm nhà.'),
    hoangOcYoung: 'Dưới 10 tuổi không xét.',
    nine: '아홉수 (Hàn)',
    nineText: (on) => (on ? 'Tuổi mụ tận cùng là 9 — người Hàn thường tránh cưới hỏi năm này.' : 'Không rơi vào tuổi tận cùng 9.'),
    own: 'Năm tuổi',
    ownText: 'Năm trùng con giáp của bạn (năm tuổi). Nên giữ nhịp ổn định, tránh mở rộng quá sức.',
    clash: 'Xung Thái Tuế',
    clashText: 'Con giáp của năm xung với tuổi bạn. Cẩn thận khi đi xa, chuyển nhà, lái xe.',
    none: 'Không',
    tableTitle: '12 năm tới trong một bảng',
    colYear: 'Năm',
    colAge: 'Tuổi',
    colWedding: 'Cưới',
    colHouse: 'Nhà',
    ok: '○',
    avoid: '✕',
    goodWedding: 'Năm hợp cưới hỏi',
    goodHouse: 'Năm hợp làm nhà',
    ruleKR: 'Theo phong tục Hàn: cưới tránh 아홉수 và Tam Tai, chuyển nhà tránh Tam Tai.',
    ruleVN: 'Theo phong tục Việt: cưới tránh Kim Lâu; làm nhà tránh Kim Lâu, Hoang Ốc, Tam Tai.',
    groupsTitle: 'Bảng năm Tam Tai theo tuổi',
    groupsDesc: 'Ba con giáp trong cùng nhóm tam hợp gặp Tam Tai cùng lúc, mỗi lần kéo dài 3 năm.',
    groupCol: 'Tuổi',
    yearsCol: 'Các năm Tam Tai',
    aboutTitle: 'Nên biết',
    about: [
      { h: 'Tam Tai là gì?', p: 'Cứ 12 năm có 3 năm liền gặp hạn Tam Tai. Thân Tý Thìn gặp ở các năm Dần Mão Thìn; Tỵ Dậu Sửu gặp ở Hợi Tý Sửu; Dần Ngọ Tuất gặp ở Thân Dậu Tuất; Hợi Mão Mùi gặp ở Tỵ Ngọ Mùi.' },
      { h: 'Kim Lâu', p: 'Lấy tuổi mụ chia cho 9, dư 1, 3, 6, 8 là phạm Kim Lâu (Thân, Thê, Tử, Lục súc). Khi cưới thường xem tuổi cô dâu; khi làm nhà xem tuổi gia chủ.' },
      { h: 'Hoang Ốc', p: '10 tuổi khởi ở Nhất Cát, 20 ở Nhì Nghi, 30 Tam Địa Sát, 40 Tứ Tấn Tài, 50 Ngũ Thọ Tử, 60 Lục Hoang Ốc, 70 quay lại Nhất Cát; số lẻ đếm tiếp sang cung kế. Rơi vào Tam Địa Sát, Ngũ Thọ Tử, Lục Hoang Ốc thì tránh làm nhà.' },
      { h: 'Người Hàn xem thế nào?', p: 'Người Hàn gọi Tam Tai là 삼재 (sam-jae) với cùng quy tắc, và kiêng cưới vào 아홉수 — năm tuổi mụ tận cùng là 9. Họ không xét Kim Lâu, Hoang Ốc.' },
    ],
    fortuneCta: (y) => `Xem tử vi ${y} theo tuổi`,
    share: 'Sao chép liên kết',
    disclaimer: 'Tam Tai, Kim Lâu, Hoang Ốc là thông tin tham khảo theo phong tục dân gian. Việc lớn nên cân nhắc điều kiện thực tế trước.',
  },
};
