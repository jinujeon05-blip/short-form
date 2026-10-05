// Text for the Hangul transcription page. All wording is original.
import type { Lang } from '../i18n';

interface HangulText {
  title: string;
  lead: string;
  modeVi: string;
  modeKo: string;
  phVi: string;
  phKo: string;
  convert: string;
  examples: string;
  result: string;
  custom: (s: string) => string;
  unknown: (s: string) => string;
  colInput: string;
  colHangul: string;
  colParts: string;
  initial: string;
  vowel: string;
  final: string;
  copy: string;
  copied: string;
  romanNote: string;
  hanjaLink: string;
  hanjaDesc: string;
  rulesTitle: string;
  rulesDesc: string;
  consonants: string;
  vowels: string;
  finals: string;
  aboutTitle: string;
  about: { h: string; p: string }[];
}

export const HANGUL: Record<Lang, HangulText> = {
  ko: {
    title: '베트남어 한글 표기 변환 · 베트남 이름을 한글로',
    lead: '베트남 사람 이름이나 지명을 국립국어원 외래어 표기법(베트남어 표기 세칙)에 따라 한글로 바꿔 드립니다. 예: Nguyễn Thị Lan → 응우옌 티 란. 한국 이름을 로마자로 바꾸는 기능도 있습니다.',
    modeVi: '베트남어 → 한글',
    modeKo: '한국 이름 → 로마자',
    phVi: '예: Nguyễn Thị Lan',
    phKo: '예: 김민준',
    convert: '변환하기',
    examples: '예시',
    result: '한글 표기',
    custom: (s) => `관용 표기: ${s}`,
    unknown: (s) => `베트남어 음절로 읽을 수 없는 부분: ${s}`,
    colInput: '음절',
    colHangul: '한글',
    colParts: '첫소리 · 모음 · 끝소리',
    initial: '첫소리',
    vowel: '모음',
    final: '끝소리',
    copy: '복사',
    copied: '복사했습니다',
    romanNote: '국어의 로마자 표기법 기준이며, 성씨는 여권에서 많이 쓰는 철자(Kim, Lee, Park…)로 적습니다.',
    hanjaLink: '한자 뜻으로 바꾸고 싶다면? 이름 변환 →',
    hanjaDesc: '이 페이지는 소리대로 적는 표기입니다. 같은 한자의 한국식 읽기(예: Nguyễn → 완 阮)는 이름 변환에서 볼 수 있습니다.',
    rulesTitle: '베트남어 한글 표기 규칙 요약',
    rulesDesc: '국립국어원 「외래어 표기법」 베트남어 표기 세칙을 바탕으로 정리했습니다. 성조 부호는 표기에 반영하지 않습니다.',
    consonants: '첫소리',
    vowels: '모음',
    finals: '끝소리',
    aboutTitle: '알아 두면 좋은 것',
    about: [
      { h: '왜 Nguyễn이 응우옌일까?', p: 'ng는 우리말 받침 ㅇ과 같은 소리로 시작하기 때문에 첫소리에 올 때 \'응\'으로 적습니다. uyê는 \'우예\'로 적고 끝소리 n이 붙어 \'응우옌\'이 됩니다. 예전에는 \'구엔\', \'누엔\'처럼 쓰기도 했지만 지금 공식 표기는 \'응우옌\'입니다.' },
      { h: '된소리가 많은 이유', p: '베트남어의 t, c·k·q, p, tr·ch, x는 숨을 거의 내뱉지 않는 소리여서 ㄸ, ㄲ, ㅃ, ㅉ, ㅆ로 적습니다. 반대로 th, kh, ph는 숨이 섞인 소리라 ㅌ, ㅋ, ㅍ으로 적습니다. 그래서 Trần은 \'쩐\', Thanh은 \'타인\'이 됩니다.' },
      { h: '관용 표기', p: '오래 써 온 이름은 규칙과 다르게 굳어진 경우가 있습니다. Việt Nam은 \'비엣남\' 대신 \'베트남\', Hồ Chí Minh은 \'호찌민\'으로 적습니다.' },
    ],
  },
  vi: {
    title: 'Phiên âm tên tiếng Việt sang chữ Hàn (Hangul)',
    lead: 'Chuyển tên người, địa danh tiếng Việt sang chữ Hàn theo quy tắc phiên âm chính thức của Viện Quốc ngữ Hàn Quốc. Ví dụ: Nguyễn Thị Lan → 응우옌 티 란. Có thêm chức năng chuyển tên Hàn sang chữ Latin.',
    modeVi: 'Tiếng Việt → Hangul',
    modeKo: 'Tên Hàn → chữ Latin',
    phVi: 'VD: Nguyễn Thị Lan',
    phKo: 'VD: 김민준',
    convert: 'Chuyển đổi',
    examples: 'Ví dụ',
    result: 'Viết bằng chữ Hàn',
    custom: (s) => `Cách viết quen dùng: ${s}`,
    unknown: (s) => `Không đọc được như âm tiết tiếng Việt: ${s}`,
    colInput: 'Âm tiết',
    colHangul: 'Hangul',
    colParts: 'Phụ âm đầu · vần · âm cuối',
    initial: 'Phụ âm đầu',
    vowel: 'Nguyên âm',
    final: 'Âm cuối',
    copy: 'Sao chép',
    copied: 'Đã sao chép',
    romanNote: 'Theo quy tắc La-tinh hóa tiếng Hàn; họ được viết theo cách thường dùng trên hộ chiếu (Kim, Lee, Park…).',
    hanjaLink: 'Muốn đổi theo nghĩa chữ Hán? Tên tiếng Hàn →',
    hanjaDesc: 'Trang này phiên âm theo cách đọc. Muốn có tên Hàn theo cùng chữ Hán (VD: Nguyễn → 완 阮) hãy dùng trang Tên tiếng Hàn.',
    rulesTitle: 'Tóm tắt quy tắc phiên âm tiếng Việt sang Hangul',
    rulesDesc: 'Dựa trên quy tắc phiên âm tiếng Việt của Viện Quốc ngữ Quốc gia Hàn Quốc. Dấu thanh không được thể hiện khi viết bằng Hangul.',
    consonants: 'Phụ âm đầu',
    vowels: 'Nguyên âm',
    finals: 'Âm cuối',
    aboutTitle: 'Nên biết',
    about: [
      { h: 'Vì sao Nguyễn viết là 응우옌?', p: 'Tiếng Hàn không có phụ âm “ng” đứng đầu âm tiết, nên “ng” được viết thành âm tiết riêng 응 (eung). Vần “uyê” thành 우예, cộng với “n” cuối thành 옌. Trước đây có người viết 구엔, 누엔 nhưng cách viết chính thức hiện nay là 응우옌.' },
      { h: 'Khi nào dùng cách viết này?', p: 'Khi điền giấy tờ, hồ sơ visa, hợp đồng, thẻ ngoại kiều hay danh thiếp ở Hàn Quốc, người Hàn thường cần tên bạn viết bằng Hangul. Hãy ghi kèm tên tiếng Việt có dấu để tránh nhầm lẫn.' },
      { h: 'Cách viết quen dùng', p: 'Một số tên quen thuộc được viết khác quy tắc: Việt Nam là 베트남, Hồ Chí Minh là 호찌민.' },
    ],
  },
};

/** Rule tables shown on the page (Vietnamese letters → Hangul). */
export const RULES = {
  consonants: [
    ['b', 'ㅂ'], ['c · k · q', 'ㄲ'], ['ch · tr', 'ㅉ'], ['d · gi', 'ㅈ'], ['đ', 'ㄷ'], ['g · gh', 'ㄱ'], ['h', 'ㅎ'], ['kh', 'ㅋ'],
    ['l · r', 'ㄹ'], ['m', 'ㅁ'], ['n', 'ㄴ'], ['ng · ngh', '응'], ['nh', 'ㄴ+ㅣ (냐·녀…)'], ['p', 'ㅃ'], ['ph', 'ㅍ'], ['s', 'ㅅ'],
    ['t', 'ㄸ'], ['th', 'ㅌ'], ['v', 'ㅂ'], ['x', 'ㅆ'],
  ],
  vowels: [
    ['a · ă', 'ㅏ'], ['â · ơ', 'ㅓ'], ['e', 'ㅐ'], ['ê', 'ㅔ'], ['i · y', 'ㅣ'], ['o · ô', 'ㅗ'], ['u', 'ㅜ'], ['ư', 'ㅡ'],
    ['iê · yê', '이에'], ['ia', '이어'], ['uô', '우오'], ['ua', '우어'], ['ươ · ưa', '으어'], ['uyê', '우예'], ['oa', '오아'], ['uy', '우이'],
  ],
  finals: [['c · ch', 'ㄱ'], ['m', 'ㅁ'], ['n · nh', 'ㄴ'], ['ng', 'ㅇ'], ['p', 'ㅂ'], ['t', 'ㅅ'], ['anh · ach', '아인 · 아익']],
};
