// Text for the age calculator. All wording is original.
import type { Lang } from '../i18n';
import type { SchoolStage } from '../engine/age';

interface AgeText {
  title: string;
  lead: string;
  birth: string;
  refDate: string;
  calc: string;
  intl: string;
  intlNote: string;
  intlDetail: (m: number, d: number) => string;
  yearAge: string;
  yearAgeNote: string;
  koreanAge: string;
  koreanAgeNote: string;
  tuoiMu: string;
  tuoiMuNote: string;
  years: (n: number) => string;
  zodiac: string;
  lunarBirth: string;
  bornOn: string;
  daysLived: string;
  days: (n: number) => string;
  nextBirthday: string;
  nextLunarBirthday: string;
  dday: (n: number) => string;
  day10000: string;
  schoolKR: string;
  schoolVN: string;
  school: Record<'KR' | 'VN', Record<SchoolStage, (g: number) => string>>;
  milestones: string;
  milestone: { label: string; offset: number; note: string }[];
  adult: (age: number) => string;
  tableTitle: (y: number) => string;
  tableDesc: string;
  colBirth: string;
  colIntl: string;
  colCount: string;
  colZodiac: string;
  aboutTitle: string;
  about: { h: string; p: string }[];
  share: string;
  copied: string;
}

export const AGE: Record<Lang, AgeText> = {
  ko: {
    title: '나이 계산기 · 만 나이, 연 나이, 세는나이',
    lead: '생년월일만 넣으면 만 나이와 연 나이, 세는나이, 베트남식 나이(tuổi mụ), 띠, 학년, 다음 생일과 음력 생일까지 한 번에 계산합니다.',
    birth: '생년월일',
    refDate: '기준일',
    calc: '계산하기',
    intl: '만 나이',
    intlNote: '2023년 6월부터 법·행정의 기준 나이입니다.',
    intlDetail: (m, d) => `생일 뒤 ${m}개월 ${d}일`,
    yearAge: '연 나이',
    yearAgeNote: '올해 − 태어난 해. 병역·청소년보호법 등에서 씁니다.',
    koreanAge: '세는나이',
    koreanAgeNote: '태어나면 1살, 새해마다 1살씩 더하는 한국 전통 나이입니다.',
    tuoiMu: '베트남 나이 (tuổi mụ)',
    tuoiMuNote: '음력 설(뗏)마다 1살씩 더하는 베트남 전통 나이입니다.',
    years: (n) => `${n}살`,
    zodiac: '띠',
    lunarBirth: '음력 생일',
    bornOn: '태어난 요일',
    daysLived: '살아온 날',
    days: (n) => `${n.toLocaleString('ko-KR')}일`,
    nextBirthday: '다음 생일',
    nextLunarBirthday: '다음 음력 생일',
    dday: (n) => (n === 0 ? 'D-DAY' : `D-${n}`),
    day10000: '태어난 지 10,000일',
    schoolKR: '한국 학년',
    schoolVN: '베트남 학년',
    school: {
      KR: {
        pre: () => '미취학', elem: (g) => `초등학교 ${g}학년`, mid: (g) => `중학교 ${g}학년`, high: (g) => `고등학교 ${g}학년`, done: () => '고등학교 졸업 이후',
      },
      VN: {
        pre: () => '미취학 (mầm non)', elem: (g) => `초등 ${g}학년 (lớp ${g})`, mid: (g) => `중학 ${g}학년 (lớp ${g + 5})`, high: (g) => `고등 ${g}학년 (lớp ${g + 9})`, done: () => '고등학교 졸업 이후',
      },
    },
    milestones: '기념일',
    milestone: [
      { label: '환갑 (還甲)', offset: 60, note: '세는나이 61세, 태어난 해의 간지가 돌아오는 해' },
      { label: '칠순 (七旬)', offset: 69, note: '세는나이 70세' },
      { label: '팔순 (八旬)', offset: 79, note: '세는나이 80세' },
    ],
    adult: (a) => `성인 (만 ${a}세)`,
    tableTitle: (y) => `${y}년 나이표 · 띠표`,
    tableDesc: '태어난 해별 만 나이(생일 전/후)와 세는나이, 띠입니다. 1~2월생은 설 이전이면 앞 해의 띠입니다.',
    colBirth: '출생 연도',
    colIntl: '만 나이 (생일 전/후)',
    colCount: '세는나이',
    colZodiac: '띠',
    aboutTitle: '나이 셈법 정리',
    about: [
      { h: '만 나이', p: '태어난 날을 0살로 보고 생일이 지날 때마다 1살씩 더합니다. 2023년 6월 28일부터 한국의 법령·계약·행정은 원칙적으로 만 나이를 씁니다. 베트남의 공식 나이도 만 나이입니다.' },
      { h: '연 나이', p: '현재 연도에서 태어난 연도를 뺀 나이입니다. 생일과 상관없이 같은 해에 태어난 사람은 같은 나이가 되어, 병역 의무나 청소년 보호법처럼 학년·연도 단위로 정하는 제도에 쓰입니다.' },
      { h: '세는나이와 tuổi mụ', p: '세는나이는 태어나면 1살, 양력 1월 1일마다 1살을 더합니다. 베트남의 tuổi mụ도 태어나면 1살이지만 음력 설(Tết)에 1살을 더합니다. 그래서 1~2월생은 두 나이가 다를 수 있습니다. 결혼·집짓기 택일(Kim Lâu, Hoang Ốc)은 tuổi mụ로 봅니다.' },
    ],
    share: '결과 링크 복사',
    copied: '복사했습니다',
  },
  vi: {
    title: 'Tính tuổi · tuổi thật, tuổi mụ, tuổi Hàn Quốc',
    lead: 'Nhập ngày sinh để biết tuổi thật, tuổi mụ, tuổi kiểu Hàn Quốc, con giáp, lớp học, ngày sinh nhật tiếp theo (dương và âm lịch) và nhiều mốc đặc biệt.',
    birth: 'Ngày sinh',
    refDate: 'Tính đến ngày',
    calc: 'Tính tuổi',
    intl: 'Tuổi thật (tuổi tròn)',
    intlNote: 'Tuổi dùng trong giấy tờ ở Việt Nam và Hàn Quốc.',
    intlDetail: (m, d) => `thêm ${m} tháng ${d} ngày`,
    yearAge: 'Tuổi theo năm',
    yearAgeNote: 'Năm nay − năm sinh. Hàn Quốc dùng cho nghĩa vụ quân sự, luật thanh thiếu niên.',
    koreanAge: 'Tuổi Hàn Quốc (세는나이)',
    koreanAgeNote: 'Sinh ra là 1 tuổi, mỗi 1/1 dương lịch thêm 1 tuổi.',
    tuoiMu: 'Tuổi mụ',
    tuoiMuNote: 'Sinh ra là 1 tuổi, mỗi Tết âm lịch thêm 1 tuổi — dùng khi xem Kim Lâu, Hoang Ốc.',
    years: (n) => `${n} tuổi`,
    zodiac: 'Con giáp',
    lunarBirth: 'Ngày sinh âm lịch',
    bornOn: 'Sinh vào',
    daysLived: 'Số ngày đã sống',
    days: (n) => `${n.toLocaleString('vi-VN')} ngày`,
    nextBirthday: 'Sinh nhật tới',
    nextLunarBirthday: 'Sinh nhật âm lịch tới',
    dday: (n) => (n === 0 ? 'Hôm nay!' : `còn ${n} ngày`),
    day10000: 'Tròn 10.000 ngày tuổi',
    schoolKR: 'Lớp ở Hàn Quốc',
    schoolVN: 'Lớp ở Việt Nam',
    school: {
      KR: {
        pre: () => 'Chưa đi học', elem: (g) => `Tiểu học lớp ${g}`, mid: (g) => `THCS lớp ${g + 6}`, high: (g) => `THPT lớp ${g + 9}`, done: () => 'Đã tốt nghiệp THPT',
      },
      VN: {
        pre: () => 'Mầm non', elem: (g) => `Lớp ${g} (tiểu học)`, mid: (g) => `Lớp ${g + 5} (THCS)`, high: (g) => `Lớp ${g + 9} (THPT)`, done: () => 'Đã tốt nghiệp THPT',
      },
    },
    milestones: 'Mốc đáng nhớ',
    milestone: [
      { label: 'Hoa giáp (lục tuần)', offset: 60, note: 'Tròn một vòng 60 năm can chi' },
      { label: 'Thất thập', offset: 69, note: '70 tuổi mụ' },
      { label: 'Bát thập', offset: 79, note: '80 tuổi mụ' },
    ],
    adult: (a) => `Đủ ${a} tuổi (trưởng thành)`,
    tableTitle: (y) => `Bảng tra tuổi năm ${y}`,
    tableDesc: 'Tuổi thật (trước/sau sinh nhật), tuổi mụ theo năm và con giáp theo năm sinh. Sinh tháng 1–2 trước Tết thì thuộc con giáp năm trước.',
    colBirth: 'Năm sinh',
    colIntl: 'Tuổi thật (trước/sau SN)',
    colCount: 'Tuổi mụ',
    colZodiac: 'Con giáp',
    aboutTitle: 'Các cách tính tuổi',
    about: [
      { h: 'Tuổi thật', p: 'Tính từ 0 tuổi lúc mới sinh, qua mỗi sinh nhật thêm 1 tuổi. Đây là tuổi dùng trong giấy tờ ở Việt Nam, và Hàn Quốc cũng chuyển sang dùng tuổi này từ 28/6/2023.' },
      { h: 'Tuổi mụ', p: 'Mới sinh đã tính 1 tuổi (tính cả thời gian trong bụng mẹ), mỗi Tết Nguyên đán thêm 1 tuổi. Tuổi mụ dùng khi xem tuổi cưới hỏi, làm nhà (Kim Lâu, Hoang Ốc, Tam Tai).' },
      { h: 'Tuổi Hàn Quốc', p: 'Người Hàn có cách tính giống tuổi mụ nhưng thêm tuổi vào ngày 1/1 dương lịch thay vì Tết âm lịch, nên người sinh tháng 1–2 có thể chênh 1 tuổi so với tuổi mụ.' },
    ],
    share: 'Sao chép liên kết',
    copied: 'Đã sao chép',
  },
};
