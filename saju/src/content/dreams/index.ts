import type { Lang } from '../../i18n';
import type { Dream, DreamCategory, DreamTone } from './types';
import { ANIMAL_DREAMS } from './animals';
import { PEOPLE_DREAMS } from './people';
import { NATURE_DREAMS } from './nature';
import { SITUATION_DREAMS } from './situations';
import { ANIMAL_DREAMS_2 } from './animals2';
import { ANIMAL_DREAMS_3 } from './animals3';
import { PEOPLE_DREAMS_2 } from './people2';
import { NATURE_DREAMS_2 } from './nature2';
import { SITUATION_DREAMS_2 } from './situations2';

export type { Dream, DreamCategory, DreamTone } from './types';

export const DREAMS: Dream[] = [
  ...ANIMAL_DREAMS, ...ANIMAL_DREAMS_2, ...ANIMAL_DREAMS_3,
  ...PEOPLE_DREAMS, ...PEOPLE_DREAMS_2,
  ...NATURE_DREAMS, ...NATURE_DREAMS_2,
  ...SITUATION_DREAMS, ...SITUATION_DREAMS_2,
];
export const DREAM_SLUGS = DREAMS.map((d) => d.slug);
export const CATEGORIES: DreamCategory[] = ['animal', 'people', 'nature', 'situation'];
/** Shown first on the index page */
export const POPULAR = ['pig', 'snake', 'teeth', 'poop', 'deceased', 'fire', 'ghost', 'fruit'];

export const dreamBySlug = (slug: string) => DREAMS.find((d) => d.slug === slug);

// Recompose with NFC so Hangul syllables are not left split into jamo.
const fold = (s: string) => s.toLowerCase().replace(/đ/g, 'd').normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC').replace(/\s+/g, '');
/** Removes only the five Vietnamese tone marks, keeping ă â ê ô ơ ư (so dơi ≠ dòi). */
const foldTone = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300\u0301\u0303\u0309\u0323]/g, '').normalize('NFC').replace(/\s+/g, '');
const isLatin = (s: string) => /^[a-z0-9]+$/.test(s);
/** Short Latin words (cá, ong, ma…) only match exactly; Hangul needs 2+ syllables to match inside a query. */
const longEnough = (w: string) => (isLatin(w) ? w.length >= 4 : w.length >= 2);

/** Matches names and keywords in both languages, ignoring spaces and Vietnamese tone marks. Exact matches first. */
export function searchDreams(query: string): Dream[] {
  const raw = query.replace(/(꿈|해몽|nằm mơ thấy|mơ thấy|giấc mơ)/gi, '');
  const q = fold(raw);
  const qTone = foldTone(raw);
  if (!q) return DREAMS;
  const score = (d: Dream) => {
    const all = [d.ko.name, ...d.ko.keywords, d.vi.name, ...d.vi.keywords];
    if (all.some((w) => foldTone(w) === qTone)) return 4;
    const words = all.map((w) => fold(w).replace(/꿈$/, ''));
    if (words.some((w) => w === q)) return 3;
    if ((!isLatin(q) || q.length >= 3) && words.some((w) => w.includes(q))) return 2;
    if (words.some((w) => longEnough(w) && q.includes(w))) return 1;
    return 0;
  };
  return DREAMS.map((d) => ({ d, s: score(d) }))
    .filter((x) => x.s > 0)
    .sort((x, y) => y.s - x.s)
    .map((x) => x.d);
}

interface DreamUi {
  title: string;
  lead: string;
  searchPh: string;
  popular: string;
  all: string;
  categories: Record<DreamCategory, string>;
  tone: Record<DreamTone, string>;
  noResult: (q: string) => string;
  pageTitle: (name: string) => string;
  pageDesc: (name: string, summary: string) => string;
  korea: string;
  vietnam: string;
  cases: string;
  related: string;
  back: string;
  dailyCta: string;
  disclaimer: string;
  note: string;
}

export const DREAM_UI: Record<Lang, DreamUi> = {
  ko: {
    title: '꿈해몽 · 한국과 베트남은 이 꿈을 어떻게 볼까?',
    lead: '돼지꿈, 뱀꿈, 이빨 빠지는 꿈… 자주 꾸는 꿈 100가지를 한국 전통 해몽과 베트남 풀이로 나란히 정리했습니다. 상황별 의미도 함께 확인하세요.',
    searchPh: '꿈 검색 (예: 돼지, 이빨, 똥)',
    popular: '많이 찾는 꿈',
    all: '전체',
    categories: { animal: '동물', people: '사람·몸', nature: '자연', situation: '상황·물건' },
    tone: { good: '길몽', bad: '조심', mixed: '상황따라' },
    noResult: (q) => `"${q}"에 맞는 꿈이 아직 없습니다. 비슷한 단어로 검색하거나 아래 목록을 둘러보세요.`,
    pageTitle: (n) => `${n} 해몽`,
    pageDesc: (n, s) => `${n} 해몽: ${s}`,
    korea: '🇰🇷 한국 전통 해몽',
    vietnam: '🇻🇳 베트남에서는',
    cases: '상황별 풀이',
    related: '같이 많이 찾는 꿈',
    back: '← 꿈해몽 전체 보기',
    dailyCta: '오늘의 띠별 운세도 보기 →',
    disclaimer: '꿈해몽은 전통 풍습과 속설에 따른 재미·참고용 풀이입니다. 같은 꿈이 반복되거나 불안·불면이 계속되면 몸과 마음의 피로 신호일 수 있으니 충분히 쉬고, 필요하면 전문가와 상담하세요.',
    note: '베트남 사이트에서 흔히 보이는 꿈 번호(lô đề) 풀이는 불법 도박과 관련되어 제공하지 않습니다.',
  },
  vi: {
    title: 'Giải mã giấc mơ · Người Hàn và người Việt hiểu giấc mơ này thế nào?',
    lead: 'Mơ thấy lợn, rắn, rụng răng… 100 giấc mơ phổ biến được giải theo quan niệm truyền thống Hàn Quốc và Việt Nam, kèm ý nghĩa từng tình huống.',
    searchPh: 'Tìm giấc mơ (VD: rắn, rụng răng, tiền)',
    popular: 'Giấc mơ được tìm nhiều',
    all: 'Tất cả',
    categories: { animal: 'Con vật', people: 'Con người', nature: 'Thiên nhiên', situation: 'Tình huống, đồ vật' },
    tone: { good: 'Điềm lành', bad: 'Nên cẩn thận', mixed: 'Tùy tình huống' },
    noResult: (q) => `Chưa có giấc mơ phù hợp với “${q}”. Hãy thử từ khác hoặc xem danh sách bên dưới.`,
    pageTitle: (n) => `${n} có ý nghĩa gì?`,
    pageDesc: (n, s) => `${n}: ${s}`,
    korea: '🇰🇷 Người Hàn giải mộng thế nào',
    vietnam: '🇻🇳 Quan niệm của người Việt',
    cases: 'Ý nghĩa theo từng tình huống',
    related: 'Giấc mơ liên quan',
    back: '← Xem tất cả giấc mơ',
    dailyCta: 'Xem tử vi hôm nay theo tuổi →',
    disclaimer: 'Giải mộng dựa trên quan niệm dân gian, chỉ mang tính tham khảo, giải trí. Nếu thường xuyên gặp ác mộng, mất ngủ hay lo âu, đó có thể là dấu hiệu cơ thể mệt mỏi — hãy nghỉ ngơi và tìm đến chuyên gia khi cần.',
    note: 'Minh Nguyệt không cung cấp “con số” lô đề theo giấc mơ vì liên quan đến cờ bạc bất hợp pháp.',
  },
};
