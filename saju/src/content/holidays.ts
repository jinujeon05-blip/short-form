// Text for the Korea–Vietnam festival comparison page. All wording is original.
import type { Lang } from '../i18n';

interface HolidaysText {
  title: string;
  lead: string;
  nextDiff: (year: number, kr: string, vn: string, name: string) => string;
  sameNote: string;
  tableTitle: string;
  tableDesc: string;
  year: string;
  seollal: string;
  tet: string;
  chuseok: string;
  trungThu: string;
  differs: string;
  dayEarlier: (n: number) => string;
  history: string;
  historyRows: { year: number; text: string }[];
  listTitle: (y: number) => string;
  listDesc: string;
  korea: string;
  vietnam: string;
  whyTitle: string;
  why: { h: string; p: string }[];
  calendarLink: string;
}

export const HOLIDAYS: Record<Lang, HolidaysText> = {
  ko: {
    title: '설날 vs 뗏(Tết), 추석 vs 쭝투(Trung Thu) 날짜 비교',
    lead: '한국과 베트남은 같은 음력을 쓰지만 기준 시간이 2시간 달라 명절 날짜가 하루, 드물게는 한 달까지 어긋납니다. 2000~2045년 두 나라의 설날·추석 날짜를 한눈에 비교해 보세요.',
    nextDiff: (y, kr, vn, name) => `다음으로 날짜가 다른 해는 ${y}년입니다. ${name}: 한국 ${kr}, 베트남 ${vn}.`,
    sameNote: '날짜가 같은 해는 회색, 다른 해는 금색으로 표시했습니다.',
    tableTitle: '연도별 설날·추석 날짜 (한국 / 베트남)',
    tableDesc: '양력 날짜입니다. 한국 설·추석 연휴는 보통 그 전날과 다음 날까지 3일입니다.',
    year: '연도',
    seollal: '🇰🇷 설날',
    tet: '🇻🇳 Tết',
    chuseok: '🇰🇷 추석',
    trungThu: '🇻🇳 Trung Thu',
    differs: '다름',
    dayEarlier: (n) => (n === 1 ? '베트남이 하루 빠름' : n === -1 ? '한국이 하루 빠름' : n > 0 ? `베트남이 ${n}일 빠름` : `한국이 ${-n}일 빠름`),
    history: '기억할 만한 해',
    historyRows: [
      { year: 1968, text: '무신년 설. 북베트남은 1967년에 UTC+7로 바꿨고 남베트남은 UTC+8을 썼기 때문에, 같은 나라 안에서도 Tết이 1월 29일(북)과 30일(남)로 갈렸습니다.' },
      { year: 1985, text: '베트남의 Tết이 1월 21일로, 한국·중국의 설(2월 20일)보다 한 달 가까이 빨랐습니다. 동지와 초하루 계산이 시간대에 따라 달라져 윤달 위치가 바뀌었기 때문입니다.' },
      { year: 2007, text: '베트남 Tết 2월 17일, 한국 설날 2월 18일. 신문에 "올해는 Tết이 하루 먼저"라는 기사가 실렸던 해입니다.' },
      { year: 2027, text: '다가오는 차이. 베트남 Tết은 2월 6일(토), 한국 설날은 2월 7일(일)입니다. 한·베 가족이라면 명절 일정을 미리 맞춰 두세요.' },
    ],
    listTitle: (y) => `${y}년 한국·베트남 명절과 공휴일`,
    listDesc: '양력 공휴일과 음력 명절을 함께 정리했습니다. 대체공휴일·임시공휴일은 정부 발표를 확인하세요.',
    korea: '🇰🇷 한국',
    vietnam: '🇻🇳 베트남',
    whyTitle: '왜 날짜가 달라질까?',
    why: [
      { h: '기준 시간이 2시간 다르다', p: '음력 한 달은 달과 해가 겹치는 순간(합삭)이 있는 날에 시작합니다. 한국은 동경 135도(UTC+9), 베트남은 동경 105도(UTC+7) 시간을 씁니다. 합삭이 한국 시간으로 자정을 막 넘긴 0~2시 사이에 일어나면, 베트남에서는 아직 전날 밤이라 초하루가 하루 앞당겨집니다.' },
      { h: '하루 차이가 한 달 차이가 되기도 한다', p: '동지나 중기(中氣)가 자정 근처에 걸리면 어느 달이 윤달이 되는지까지 달라질 수 있습니다. 1985년처럼 베트남의 설이 한 달 가까이 빨랐던 해가 이런 경우입니다.' },
      { h: '명월은 두 달력을 따로 계산합니다', p: '명월의 만세력은 천문 계산으로 합삭과 절기 시각을 구한 뒤 한국 시간과 베트남 시간(1968년 이전은 UTC+8)으로 각각 날짜를 정합니다. 그래서 오늘 화면과 달력에서 두 나라 음력이 다른 날을 바로 확인할 수 있습니다.' },
    ],
    calendarLink: '좋은 날 달력에서 두 나라 음력 보기 →',
  },
  vi: {
    title: 'Tết Nguyên Đán và Tết Trung Thu: Việt Nam – Hàn Quốc khác ngày ra sao?',
    lead: 'Việt Nam và Hàn Quốc cùng dùng âm lịch nhưng múi giờ chênh nhau 2 tiếng, nên ngày Tết đôi khi lệch một ngày, hiếm hoi có năm lệch cả tháng. So sánh ngày Tết và Trung Thu của hai nước từ 2000 đến 2045.',
    nextDiff: (y, kr, vn, name) => `Năm gần nhất hai nước khác ngày là ${y}. ${name}: Hàn Quốc ${kr}, Việt Nam ${vn}.`,
    sameNote: 'Năm trùng ngày tô xám, năm khác ngày tô vàng.',
    tableTitle: 'Ngày Tết và Trung Thu theo từng năm (Hàn Quốc / Việt Nam)',
    tableDesc: 'Ngày dương lịch. Kỳ nghỉ Seollal và Chuseok ở Hàn Quốc thường kéo dài 3 ngày (trước, chính và sau ngày lễ).',
    year: 'Năm',
    seollal: '🇰🇷 Seollal',
    tet: '🇻🇳 Tết',
    chuseok: '🇰🇷 Chuseok',
    trungThu: '🇻🇳 Trung Thu',
    differs: 'Khác',
    dayEarlier: (n) => (n === 1 ? 'Việt Nam sớm 1 ngày' : n === -1 ? 'Hàn Quốc sớm 1 ngày' : n > 0 ? `Việt Nam sớm ${n} ngày` : `Hàn Quốc sớm ${-n} ngày`),
    history: 'Những năm đáng nhớ',
    historyRows: [
      { year: 1968, text: 'Tết Mậu Thân. Miền Bắc chuyển sang giờ UTC+7 từ năm 1967 còn miền Nam vẫn dùng UTC+8, nên ngay trong Việt Nam, Tết rơi vào 29/1 (miền Bắc) và 30/1 (miền Nam).' },
      { year: 1985, text: 'Tết Việt Nam rơi vào 21/1, sớm gần một tháng so với Hàn Quốc và Trung Quốc (20/2), vì cách tính ngày Đông chí và mùng một theo múi giờ khác nhau làm thay đổi vị trí tháng nhuận.' },
      { year: 2007, text: 'Tết Việt Nam 17/2, Seollal Hàn Quốc 18/2 — năm báo chí từng đưa tin “Tết Việt đến sớm hơn một ngày”.' },
      { year: 2027, text: 'Sắp tới: Tết Việt Nam là thứ Bảy 6/2, còn Seollal Hàn Quốc là Chủ nhật 7/2. Gia đình Việt – Hàn nên sắp xếp lịch về quê sớm.' },
    ],
    listTitle: (y) => `Ngày lễ, Tết năm ${y} của Hàn Quốc và Việt Nam`,
    listDesc: 'Gồm ngày lễ dương lịch và lễ tết âm lịch. Ngày nghỉ bù, nghỉ thêm hãy theo thông báo chính thức.',
    korea: '🇰🇷 Hàn Quốc',
    vietnam: '🇻🇳 Việt Nam',
    whyTitle: 'Vì sao ngày Tết có thể khác nhau?',
    why: [
      { h: 'Múi giờ lệch 2 tiếng', p: 'Mỗi tháng âm lịch bắt đầu vào ngày có điểm sóc (trăng non). Hàn Quốc dùng giờ kinh tuyến 135° Đông (UTC+9), Việt Nam dùng 105° Đông (UTC+7). Nếu điểm sóc xảy ra trong khoảng 0–2 giờ sáng giờ Hàn Quốc, thì ở Việt Nam vẫn còn là tối hôm trước — nên mùng một ở Việt Nam sớm hơn một ngày.' },
      { h: 'Lệch một ngày có thể thành lệch một tháng', p: 'Khi Đông chí hoặc trung khí rơi sát nửa đêm, tháng nhuận cũng có thể khác giữa hai nước. Năm 1985, Tết Việt Nam sớm gần một tháng chính vì lý do này.' },
      { h: 'Minh Nguyệt tính riêng hai bộ lịch', p: 'Minh Nguyệt tính thời điểm trăng non và tiết khí bằng thiên văn, rồi xác định ngày theo giờ Hàn Quốc và giờ Việt Nam (trước 1968 dùng UTC+8). Vì vậy bạn có thể thấy ngay những ngày âm lịch hai nước khác nhau trên trang chủ và lịch.' },
    ],
    calendarLink: 'Xem âm lịch hai nước trên Lịch ngày tốt →',
  },
};
