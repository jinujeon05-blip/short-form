import type { Lang } from '../i18n';

interface JesaText {
  eyebrow: string;
  title: string;
  lead: string;
  modeLunar: string;
  modeSolar: string;
  lunarLabel: string;
  leap: string;
  deathYear: string;
  deathYearPh: string;
  solarLabel: string;
  solarNote: (lunar: string) => string;
  nameLabel: string;
  namePh: string;
  basisKR: string;
  basisVN: string;
  next: (d: number) => string;
  today: string;
  colYear: string;
  colDate: string;
  colEve: string;
  colNote: string;
  past: string;
  nth: (n: number) => string;
  moved: string;
  /** The anniversary under the other country's lunar calendar */
  other: (date: string, otherIsVN: boolean) => string;
  ics: string;
  icsTitle: (name: string, n: number | null) => string;
  icsDesc: (lunar: string) => string;
  leapNote: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  disclaimer: string;
}

export const JESA: Record<Lang, JesaText> = {
  ko: {
    eyebrow: '忌日 · NGÀY GIỖ',
    title: '제사·기일 계산기 · 음력 기일을 양력 날짜로',
    lead: '음력 기일을 넣으면 앞으로 10년 동안의 양력 날짜와 요일을 한 번에 알려 드립니다. 한국 음력과 베트남 음력이 하루 다른 해도 표시하고, 휴대폰 달력에 바로 저장할 수 있어요.',
    modeLunar: '음력 기일로',
    modeSolar: '양력 돌아가신 날로',
    lunarLabel: '음력 기일',
    leap: '윤달',
    deathYear: '돌아가신 해 (선택)',
    deathYearPh: '예: 2019',
    solarLabel: '돌아가신 날 (양력)',
    solarNote: (l) => `음력으로는 ${l}입니다.`,
    nameLabel: '누구의 기일인가요? (선택)',
    namePh: '예: 할아버지',
    basisKR: '🇰🇷 한국 음력',
    basisVN: '🇻🇳 베트남 음력',
    next: (d) => (d === 0 ? '오늘이 기일입니다' : `다음 기일까지 ${d}일 남았어요`),
    today: '오늘',
    colYear: '해',
    colDate: '기일 (양력)',
    colEve: '전날 (제사 준비)',
    colNote: '참고',
    past: '지남',
    nth: (n) => (n === 1 ? '1주기 (소상)' : n === 2 ? '2주기 (대상)' : `${n}주기`),
    moved: '그해 음력 30일이 없어 29일',
    other: (d, vn) => `${vn ? '베트남' : '한국'} 음력은 ${d}`,
    ics: '휴대폰 달력에 10년치 저장 (.ics)',
    icsTitle: (n, k) => `${n ? `${n} ` : ''}기일${k ? ` · ${k}주기` : ''}`,
    icsDesc: (l) => `음력 ${l} · 명월 myeongwol.net`,
    leapNote: '윤달에 돌아가신 경우, 보통 같은 숫자의 평달에 기일을 지냅니다.',
    faqTitle: '기일·제사, 이런 게 궁금해요',
    faq: [
      { q: '기일은 음력으로 지내나요, 양력으로 지내나요?', a: '전통적으로 음력 기일을 지내므로 해마다 양력 날짜가 바뀝니다. 요즘은 가족이 모이기 쉬운 양력 날짜나 주말로 정하는 집도 많습니다. 가족이 정한 방식을 따르면 됩니다.' },
      { q: '제사는 기일 당일인가요, 전날인가요?', a: '전통 제사는 돌아가신 날이 시작되는 자시(밤 11시~새벽 1시)에 지내서, 실제로는 전날 밤에 준비하고 지냈습니다. 요즘은 기일 당일 저녁에 지내는 집이 많습니다. 표의 "전날"은 전통 방식으로 지낼 때 준비하는 날입니다.' },
      { q: '음력 30일에 돌아가셨는데 30일이 없는 해는요?', a: '음력 한 달은 29일 또는 30일입니다. 그해 그 달에 30일이 없으면 그믐인 29일에 지내는 것이 일반적입니다. 계산기는 자동으로 29일로 바꿔 표시합니다.' },
      { q: '윤달에 돌아가셨으면요?', a: '윤달은 몇 년에 한 번만 오므로, 보통 같은 숫자의 평달(예: 윤4월이면 4월)에 지냅니다. 윤달 체크를 해도 평달 날짜로 계산합니다.' },
      { q: '밤늦게 돌아가셨으면 어느 날이 기일인가요?', a: '전통적으로 하루는 자시(밤 11시)에 시작한다고 보아, 밤 11시 이후에 돌아가시면 다음 날을 기일로 삼는 집이 있습니다. 베트남에서도 비슷하게 giờ Tý 이후면 다음 날로 보기도 합니다. 집안의 관례를 확인하세요.' },
      { q: '한국 음력과 베트남 음력이 다를 수 있나요?', a: '네. 두 나라는 기준 시간이 2시간 달라서 초하루가 하루 차이 나는 해가 있습니다. 한·베 가정이라면 어느 쪽 음력으로 지낼지 정해 두세요. 표의 "참고"에 다른 나라 음력 날짜를 함께 보여 드립니다.' },
      { q: '베트남의 giỗ와 같은가요?', a: '베트남도 음력 기일(ngày giỗ)에 가족이 모여 제사를 지냅니다. 기일 전날에는 조상께 알리는 Tiên thường 의례를 하고, 첫 기일(giỗ đầu)과 탈상하는 giỗ hết을 특히 크게 지냅니다.' },
    ],
    disclaimer: '날짜는 천문 계산으로 구한 음력을 기준으로 합니다. 제사 방식과 날짜는 집안마다 다를 수 있습니다.',
  },
  vi: {
    eyebrow: '忌日 · NGÀY GIỖ',
    title: 'Tính ngày giỗ · Đổi ngày giỗ âm lịch sang dương lịch',
    lead: 'Nhập ngày giỗ âm lịch để biết ngày dương lịch và thứ trong 10 năm tới. Có ghi chú năm nào âm lịch Việt và Hàn lệch nhau, và lưu thẳng vào lịch điện thoại.',
    modeLunar: 'Theo ngày giỗ âm lịch',
    modeSolar: 'Theo ngày mất dương lịch',
    lunarLabel: 'Ngày giỗ (âm lịch)',
    leap: 'Tháng nhuận',
    deathYear: 'Năm mất (không bắt buộc)',
    deathYearPh: 'VD: 2019',
    solarLabel: 'Ngày mất (dương lịch)',
    solarNote: (l) => `Theo âm lịch là ${l}.`,
    nameLabel: 'Giỗ của ai? (không bắt buộc)',
    namePh: 'VD: Ông nội',
    basisKR: '🇰🇷 Âm lịch Hàn',
    basisVN: '🇻🇳 Âm lịch Việt',
    next: (d) => (d === 0 ? 'Hôm nay là ngày giỗ' : `Còn ${d} ngày nữa đến ngày giỗ`),
    today: 'Hôm nay',
    colYear: 'Năm',
    colDate: 'Ngày giỗ (dương lịch)',
    colEve: 'Tiên thường (hôm trước)',
    colNote: 'Ghi chú',
    past: 'Đã qua',
    nth: (n) => (n === 1 ? 'Giỗ đầu' : n === 2 ? 'Giỗ hết (2 năm)' : `Giỗ năm thứ ${n}`),
    moved: 'Năm đó tháng thiếu, lấy ngày 29',
    other: (d, vn) => `Âm lịch ${vn ? 'Việt' : 'Hàn'}: ${d}`,
    ics: 'Lưu 10 năm vào lịch điện thoại (.ics)',
    icsTitle: (n, k) => `Giỗ${n ? ` ${n}` : ''}${k === 1 ? ' (giỗ đầu)' : ''}`,
    icsDesc: (l) => `Âm lịch ${l} · Minh Nguyệt myeongwol.net`,
    leapNote: 'Mất vào tháng nhuận thì thường cúng giỗ vào tháng chính cùng số.',
    faqTitle: 'Những câu hỏi thường gặp về ngày giỗ',
    faq: [
      { q: 'Giỗ tính theo âm lịch hay dương lịch?', a: 'Theo truyền thống, ngày giỗ tính theo âm lịch nên mỗi năm rơi vào một ngày dương lịch khác. Nhiều gia đình ngày nay chọn ngày cuối tuần gần đó để con cháu về đông đủ.' },
      { q: 'Tiên thường là gì?', a: 'Là lễ cúng hôm trước ngày giỗ chính (chính kỵ) để mời tổ tiên về dự giỗ. Cột “Tiên thường” trong bảng là ngày hôm trước.' },
      { q: 'Mất ngày 30 mà năm đó tháng chỉ có 29 ngày?', a: 'Tháng âm lịch có 29 hoặc 30 ngày. Năm nào tháng đó thiếu thì thường cúng vào ngày cuối tháng (29). Công cụ tự đổi sang ngày 29.' },
      { q: 'Mất vào tháng nhuận thì sao?', a: 'Tháng nhuận mấy năm mới có một lần, nên thường cúng giỗ vào tháng chính cùng số (VD: nhuận tháng 4 thì cúng tháng 4).' },
      { q: 'Mất lúc nửa đêm thì tính ngày nào?', a: 'Dân gian coi ngày mới bắt đầu từ giờ Tý (23h), nên nhiều nhà tính người mất sau 23h là mất vào ngày hôm sau. Hãy hỏi lại người lớn trong gia đình.' },
      { q: 'Âm lịch Việt và Hàn có khác nhau không?', a: 'Có. Hai nước dùng múi giờ chênh 2 tiếng nên có năm ngày mùng 1 lệch nhau một ngày. Gia đình Việt – Hàn nên thống nhất dùng âm lịch nước nào; cột “Ghi chú” hiển thị ngày theo âm lịch nước kia.' },
      { q: 'Người Hàn có giỗ không?', a: 'Có, gọi là “jesa” (제사) vào ngày “giil” (기일). Theo truyền thống họ cúng vào giờ Tý đầu ngày mất, tức là đêm hôm trước; ngày nay nhiều nhà cúng vào tối ngày mất.' },
    ],
    disclaimer: 'Ngày được tính theo âm lịch thiên văn. Cách cúng giỗ và ngày cụ thể có thể khác nhau tùy gia đình.',
  },
};
