import type { Lang } from '../i18n';
import type { Tag } from './koNames';

interface NamingText {
  eyebrow: string;
  title: string;
  lead: string;
  tabSuggest: string;
  tabCheck: string;
  // suggest
  inputVi: string;
  phVi: string;
  gender: string;
  genders: { auto: string; f: string; m: string; all: string };
  suggest: string;
  sugTitle: (given: string) => string;
  sugDesc: string;
  surnameNote: (vi: string, ko: string, h: string) => string;
  reasonSound: (vi: string, ko: string) => string;
  reasonMeaning: (vi: string, h: string, tag: string) => string;
  reasonSame: (vi: string, h: string) => string;
  reasonPopular: string;
  checkThis: string;
  noGiven: string;
  // check
  inputCheck: string;
  phCheck: string;
  check: string;
  checkHint: string;
  hanjaPick: string;
  hanjaDirect: string;
  hanjaDirectPh: string;
  viEarTitle: string;
  viEarOk: string;
  romanLabel: string;
  hanjaTitle: string;
  hanViet: (s: string) => string;
  strokesTitle: string;
  strokes: string;
  grids: Record<'won' | 'hyeong' | 'i' | 'jeong', string>;
  gridDesc: Record<'won' | 'hyeong' | 'i' | 'jeong', string>;
  lucky: string;
  unlucky: string;
  gridNote: string;
  koEarTitle: string;
  koEarOk: string;
  hangulLabel: string;
  hardTitle: string;
  toName: string;
  toSuggest: string;
  levelStrong: string;
  levelMild: string;
  tags: Record<Tag, string>;
  aboutTitle: string;
  about: { h: string; p: string }[];
  disclaimer: string;
}

export const NAMING: Record<Lang, NamingText> = {
  ko: {
    eyebrow: '作名 · ĐẶT TÊN',
    title: '한·베 작명 — 나에게 어울리는 한국 이름 · 이름 발음 검사',
    lead: '베트남 이름의 소리와 뜻을 살린 요즘 한국 이름을 추천하고, 한국 이름이 베트남에서 이상하게 들리지 않는지, 베트남 이름이 한국에서 놀림받을 소리는 없는지 확인해 드립니다.',
    tabSuggest: '🇻🇳→🇰🇷 한국 이름 추천',
    tabCheck: '이름 검사',
    inputVi: '베트남 이름 (성 포함)',
    phVi: '예: Nguyễn Minh Anh',
    gender: '성별',
    genders: { auto: '자동', f: '여자', m: '남자', all: '모두' },
    suggest: '추천받기',
    sugTitle: (g) => `${g}에게 어울리는 한국 이름`,
    sugDesc: '소리가 닮았거나, 뜻이 이어지거나, 같은 한자를 쓰는 요즘 인기 이름을 골랐습니다. 이름을 누르면 자세히 검사할 수 있어요.',
    surnameNote: (vi, ko, h) => `성은 ${vi}의 한자 ${h}를 한국식으로 읽은 "${ko}"입니다. 한국에서 성 없이 이름만 불러도 자연스럽습니다.`,
    reasonSound: (vi, ko) => `${vi} ↔ ${ko} 소리가 닮았어요`,
    reasonMeaning: (vi, h, tag) => `${vi}처럼 "${tag}" 뜻의 ${h}`,
    reasonSame: (vi, h) => `${vi}와 같은 한자 ${h}`,
    reasonPopular: '요즘 한국에서 인기 있는 이름',
    checkThis: '이 이름 자세히 검사 →',
    noGiven: '이름(성 다음 부분)까지 입력해 주세요.',
    inputCheck: '검사할 이름 (한국 이름 또는 베트남 이름)',
    phCheck: '예: 김서준 / Trần Ngọc Bích',
    check: '검사하기',
    checkHint: '한글로 입력하면 베트남 사람 귀에 어떻게 들리는지, 로마자(베트남어)로 입력하면 한국 사람 귀에 어떻게 들리는지 확인합니다.',
    hanjaPick: '한자 고르기',
    hanjaDirect: '한자 직접 입력 (선택)',
    hanjaDirectPh: '예: 金瑞俊',
    viEarTitle: '🇻🇳 베트남 사람에게는 어떻게 들릴까?',
    viEarOk: '베트남어로 이상하게 들리는 소리가 없어요.',
    romanLabel: '로마자 표기',
    hanjaTitle: '한자 이름 풀이',
    hanViet: (s) => `베트남에서는 이 한자 이름을 "${s}"로 읽습니다.`,
    strokesTitle: '획수와 수리 (전통 작명)',
    strokes: '원획',
    grids: { won: '원격', hyeong: '형격', i: '이격', jeong: '정격' },
    gridDesc: { won: '이름 두 글자 · 초년운', hyeong: '성+이름 첫 글자 · 청년운', i: '성+이름 끝 글자 · 중년운', jeong: '전체 · 말년·총운' },
    lucky: '길',
    unlucky: '흉',
    gridNote: '획수는 강희자전 부수 기준 원획(氵=4, 艹=6 등)입니다. 81수리 길흉은 전통 작명법의 하나로 학파마다 조금씩 다르며 과학적 근거는 없습니다. 참고로만 보세요.',
    koEarTitle: '🇰🇷 한국 사람에게는 어떻게 들릴까?',
    koEarOk: '한국어·영어로 놀림받을 만한 소리가 없어요.',
    hangulLabel: '한글 표기',
    hardTitle: '한국 사람이 발음하기 어려운 부분',
    toName: '한자 그대로 한국식으로 읽으면? →',
    toSuggest: '어울리는 한국 이름 추천받기 →',
    levelStrong: '피하세요',
    levelMild: '참고',
    tags: {
      bright: '밝음', beauty: '아름다움', jewel: '보석', flower: '꽃', wisdom: '지혜', virtue: '어짊', luck: '복', water: '물',
      sky: '하늘', peace: '평안', strong: '굳셈', great: '큼', joy: '기쁨', art: '예술', grace: '우아함', excellent: '뛰어남',
      wealth: '넉넉함', long: '오래감', season: '계절', start: '시작', pure: '깨끗함',
    },
    aboutTitle: '이렇게 추천하고 검사합니다',
    about: [
      { h: '왜 한자 그대로 읽은 이름이 아닌가요?', p: 'Nguyễn Minh Anh을 한자 그대로 읽으면 완명영(阮明英)이 됩니다. 뜻은 좋지만 1970년대 이름처럼 들려서, 한국 친구들이 부르기엔 어색할 수 있습니다. 그래서 요즘 실제로 많이 쓰는 이름 가운데 원래 이름과 소리나 뜻이 이어지는 이름을 고릅니다.' },
      { h: '소리·뜻·한자, 세 가지로 연결합니다', p: 'Minh은 "민", Anh은 "아"처럼 소리가 닮은 이름을 찾고, Minh(밝을 明)처럼 뜻이 "밝음"인 이름에는 昭(밝을 소)·炫(밝을 현) 같은 한자를 씁니다. Hà(河)처럼 같은 한자를 쓰는 한국 이름이 있으면 우선합니다.' },
      { h: '한·베 가정 아이 이름에 꼭 확인하세요', p: '한국에서 예쁜 이름도 베트남어로는 다른 뜻으로 들릴 수 있습니다. 예를 들어 "준(Jun)"은 giun(지렁이), "구(Gu)"는 속어 cu처럼 들립니다. 반대로 베트남 이름 Bích·Phúc은 영어 욕설처럼 들려 한국 학교에서 놀림받기도 합니다. 두 나라 가족 모두가 편하게 부를 수 있는지 미리 확인해 보세요.' },
      { h: '획수 계산', p: '한자 획수는 작명에서 쓰는 원획법으로, 부수를 본래 글자의 획수로 셉니다(氵→水 4획, 艹→艸 6획, 阝→阜 8획). 성과 이름 두 글자의 획수로 원·형·이·정 네 가지 격을 만들고 81수리 길흉을 표시합니다.' },
    ],
    disclaimer: '이름 추천과 발음 검사는 참고용입니다. 실제 출생신고 시에는 대법원 인명용 한자인지 꼭 확인하세요. 비속어 목록은 계속 보완하고 있습니다.',
  },
  vi: {
    eyebrow: '作名 · ĐẶT TÊN',
    title: 'Đặt tên tiếng Hàn hợp với bạn · Kiểm tra tên Việt – Hàn',
    lead: 'Gợi ý tên Hàn hiện đại giữ được âm hoặc nghĩa tên Việt của bạn; kiểm tra tên Hàn có nghe “kỳ” trong tiếng Việt không, và tên Việt có dễ bị trêu ở Hàn Quốc không.',
    tabSuggest: '🇻🇳→🇰🇷 Gợi ý tên Hàn',
    tabCheck: 'Kiểm tra tên',
    inputVi: 'Họ tên tiếng Việt',
    phVi: 'VD: Nguyễn Minh Anh',
    gender: 'Giới tính',
    genders: { auto: 'Tự động', f: 'Nữ', m: 'Nam', all: 'Tất cả' },
    suggest: 'Gợi ý',
    sugTitle: (g) => `Tên Hàn hợp với ${g}`,
    sugDesc: 'Chọn từ những tên Hàn đang phổ biến, có âm gần giống, nghĩa liên quan hoặc cùng chữ Hán với tên bạn. Bấm vào tên để kiểm tra chi tiết.',
    surnameNote: (vi, ko, h) => `Họ “${ko}” là cách đọc tiếng Hàn của chữ ${h} (${vi}). Ở Hàn Quốc gọi tên không kèm họ cũng rất tự nhiên.`,
    reasonSound: (vi, ko) => `${vi} ↔ ${ko}: âm gần giống`,
    reasonMeaning: (vi, h, tag) => `${h} mang nghĩa “${tag}” như ${vi}`,
    reasonSame: (vi, h) => `Cùng chữ Hán ${h} với ${vi}`,
    reasonPopular: 'Tên đang phổ biến ở Hàn Quốc',
    checkThis: 'Kiểm tra tên này →',
    noGiven: 'Hãy nhập cả tên (phần sau họ).',
    inputCheck: 'Tên cần kiểm tra (tên Hàn hoặc tên Việt)',
    phCheck: 'VD: 김서준 / Trần Ngọc Bích',
    check: 'Kiểm tra',
    checkHint: 'Nhập bằng chữ Hàn để xem người Việt nghe thế nào; nhập tiếng Việt để xem người Hàn nghe thế nào.',
    hanjaPick: 'Chọn chữ Hán',
    hanjaDirect: 'Nhập chữ Hán (không bắt buộc)',
    hanjaDirectPh: 'VD: 金瑞俊',
    viEarTitle: '🇻🇳 Người Việt nghe tên này thế nào?',
    viEarOk: 'Không có âm nào nghe kỳ trong tiếng Việt.',
    romanLabel: 'Phiên âm Latin',
    hanjaTitle: 'Ý nghĩa chữ Hán',
    hanViet: (s) => `Đọc theo âm Hán Việt, tên này là “${s}”.`,
    strokesTitle: 'Số nét và số lý (cách đặt tên truyền thống Hàn)',
    strokes: 'Số nét gốc',
    grids: { won: 'Nguyên cách', hyeong: 'Hình cách', i: 'Lợi cách', jeong: 'Trinh cách' },
    gridDesc: { won: 'Hai chữ tên · vận tuổi nhỏ', hyeong: 'Họ + chữ đầu · vận tuổi trẻ', i: 'Họ + chữ cuối · vận trung niên', jeong: 'Tổng · vận về già' },
    lucky: 'Tốt',
    unlucky: 'Xấu',
    gridNote: 'Số nét tính theo bộ thủ Khang Hy (氵= 4, 艹= 6…). Số lý 81 là một phương pháp đặt tên truyền thống, mỗi trường phái hơi khác nhau và không có cơ sở khoa học — chỉ để tham khảo.',
    koEarTitle: '🇰🇷 Người Hàn nghe tên này thế nào?',
    koEarOk: 'Không có âm dễ bị trêu trong tiếng Hàn hay tiếng Anh.',
    hangulLabel: 'Viết bằng chữ Hàn',
    hardTitle: 'Phần người Hàn khó phát âm',
    toName: 'Đọc theo đúng chữ Hán bằng âm Hàn? →',
    toSuggest: 'Gợi ý tên Hàn hợp với bạn →',
    levelStrong: 'Nên tránh',
    levelMild: 'Lưu ý',
    tags: {
      bright: 'sáng', beauty: 'đẹp', jewel: 'ngọc', flower: 'hoa', wisdom: 'trí tuệ', virtue: 'đức', luck: 'phúc', water: 'nước',
      sky: 'trời', peace: 'bình an', strong: 'mạnh mẽ', great: 'lớn lao', joy: 'vui', art: 'nghệ thuật', grace: 'dịu dàng', excellent: 'xuất sắc',
      wealth: 'sung túc', long: 'lâu dài', season: 'mùa', start: 'khởi đầu', pure: 'trong sáng',
    },
    aboutTitle: 'Cách gợi ý và kiểm tra',
    about: [
      { h: 'Sao không dùng tên đọc thẳng theo chữ Hán?', p: 'Nguyễn Minh Anh đọc thẳng theo chữ Hán là 완명영 (阮明英). Nghĩa rất đẹp nhưng nghe như tên người Hàn những năm 1970. Vì vậy Minh Nguyệt chọn trong các tên Hàn đang được đặt nhiều hiện nay, những tên có âm hoặc nghĩa nối với tên gốc của bạn.' },
      { h: 'Nối bằng âm, nghĩa và chữ Hán', p: 'Minh gần âm “민”, Anh gần “아”; Minh (明 sáng) thì chọn chữ cũng mang nghĩa sáng như 昭, 炫. Nếu tên Hàn dùng cùng chữ Hán với tên bạn (như 河 Hà) thì được ưu tiên.' },
      { h: 'Gia đình Việt – Hàn đặt tên cho con', p: 'Tên đẹp trong tiếng Hàn có thể nghe kỳ trong tiếng Việt: “준 (Jun)” dễ thành “giun”, “구 (Gu)” nghe như “cu”. Ngược lại tên Bích, Phúc đọc giống từ chửi tiếng Anh, dễ bị trêu ở trường Hàn. Hãy kiểm tra để cả hai bên gia đình đều gọi tên bé thoải mái.' },
      { h: 'Cách tính số nét', p: 'Số nét tính theo cách đặt tên của người Hàn: bộ thủ được tính theo chữ gốc (氵→ 水 4 nét, 艹→ 艸 6 nét, 阝→ 阜 8 nét). Từ số nét của họ và hai chữ tên, tính bốn “cách” và xem tốt xấu theo 81 số lý.' },
    ],
    disclaimer: 'Gợi ý và kiểm tra chỉ để tham khảo. Khi làm giấy khai sinh ở Hàn Quốc, hãy kiểm tra chữ Hán có nằm trong danh sách chữ dùng cho tên người không. Danh sách từ nhạy cảm sẽ tiếp tục được bổ sung.',
  },
};
