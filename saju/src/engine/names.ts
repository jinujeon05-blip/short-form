// Vietnamese ↔ Korean name conversion through shared hanja (Hán-Việt / 한자음).
import { HANJA, HanjaEntry } from '../content/hanja';
import { Element, mod } from './ganzhi';

const S_BASE = 0xac00;
const isHangul = (c: string) => {
  const code = c.charCodeAt(0);
  return code >= S_BASE && code <= 0xd7a3;
};

function decompose(c: string): [number, number, number] {
  const code = c.charCodeAt(0) - S_BASE;
  return [Math.floor(code / 588), Math.floor((code % 588) / 28), code % 28];
}
const compose = (l: number, v: number, t: number) => String.fromCharCode(S_BASE + l * 588 + v * 28 + t);

const Y_VOWELS = [2, 6, 7, 12, 17, 20]; // ㅑ ㅕ ㅖ ㅛ ㅠ ㅣ

/** 두음법칙: 려→여, 리→이, 라→나, 녀→여 … */
export function initialLaw(syllable: string): string {
  if (!syllable || !isHangul(syllable[0])) return syllable;
  const [l, v, t] = decompose(syllable[0]);
  let nl = l;
  if (l === 5) nl = Y_VOWELS.includes(v) ? 11 : 2;
  else if (l === 2 && Y_VOWELS.includes(v)) nl = 11;
  return compose(nl, v, t) + syllable.slice(1);
}

const RR_L = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
const RR_V = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
const RR_T = ['', 'k', 'k', 'k', 'n', 'n', 'n', 't', 'l', 'k', 'm', 'l', 'l', 'l', 'p', 'l', 'm', 'p', 'p', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't'];
const SURNAME_ROMAN: Record<string, string> = {
  김: 'Kim', 이: 'Lee', 박: 'Park', 최: 'Choi', 정: 'Jung', 강: 'Kang', 조: 'Cho', 윤: 'Yoon', 장: 'Jang',
  임: 'Lim', 한: 'Han', 오: 'Oh', 서: 'Seo', 신: 'Shin', 권: 'Kwon', 황: 'Hwang', 안: 'Ahn', 송: 'Song',
  유: 'Yoo', 류: 'Ryu', 홍: 'Hong', 전: 'Jeon', 고: 'Ko', 문: 'Moon', 양: 'Yang', 손: 'Son', 배: 'Bae',
  백: 'Baek', 허: 'Heo', 노: 'Noh', 심: 'Shim', 하: 'Ha', 곽: 'Kwak', 성: 'Sung', 차: 'Cha', 주: 'Joo',
  우: 'Woo', 구: 'Koo', 민: 'Min', 진: 'Jin', 나: 'Na', 완: 'Wan', 여: 'Yeo', 범: 'Beom', 무: 'Mu',
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function romanizeSyllable(s: string): string {
  return [...s].map((c) => {
    if (!isHangul(c)) return c;
    const [l, v, t] = decompose(c);
    return RR_L[l] + RR_V[v] + RR_T[t];
  }).join('');
}

/** Romanizes a Korean name: customary spelling for the surname, given name joined (e.g. "Kim Minjun"). */
export function romanizeName(surname: string, given: string[]): string {
  const sur = SURNAME_ROMAN[surname] ?? cap(romanizeSyllable(surname));
  const g = given.map(romanizeSyllable).join('');
  return g ? `${sur} ${cap(g)}` : sur;
}

/** 발음오행 by initial consonant: ㄱㅋ木 ㄴㄷㄹㅌ火 ㅇㅎ土 ㅅㅈㅊ金 ㅁㅂㅍ水 */
export function soundElement(syllable: string): Element | null {
  if (!syllable || !isHangul(syllable[0])) return null;
  const l = decompose(syllable[0])[0];
  if ([0, 1, 15].includes(l)) return 0;
  if ([2, 3, 4, 5, 16].includes(l)) return 1;
  if ([11, 18].includes(l)) return 2;
  if ([9, 10, 12, 13, 14].includes(l)) return 3;
  return 4;
}

export type Flow = 'generate' | 'same' | 'control' | 'controlled';
export function elementFlow(a: Element, b: Element): Flow {
  if (a === b) return 'same';
  const d = mod(b - a, 5);
  if (d === 1) return 'generate';
  if (d === 4) return 'generate';
  return d === 2 ? 'control' : 'controlled';
}

export const stripVi = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
const normVi = (s: string) => s.normalize('NFC').toLowerCase();

export interface Syllable {
  /** original input token */
  input: string;
  candidates: HanjaEntry[];
  /** true when only diacritic-less matches were found */
  fuzzy: boolean;
  /** Vietnamese middle name like Thị / Văn */
  middle: boolean;
  role: 's' | 'g';
}

function findVi(token: string, role: 's' | 'g'): { list: HanjaEntry[]; fuzzy: boolean } {
  const exact = HANJA.filter((e) => normVi(e.vi) === normVi(token));
  const byRole = (l: HanjaEntry[]) => {
    const r = l.filter((e) => e.roles.includes(role));
    return r.length ? r : l;
  };
  if (exact.length) return { list: dedupe(byRole(exact)), fuzzy: false };
  const loose = HANJA.filter((e) => stripVi(e.vi) === stripVi(token));
  return { list: dedupe(byRole(loose)), fuzzy: loose.length > 0 };
}

function dedupe(list: HanjaEntry[]): HanjaEntry[] {
  const seen = new Set<string>();
  return list.filter((e) => {
    const k = `${e.h}|${e.ko}|${e.vi}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const MIDDLE = ['thi', 'van'];

/** Splits a Vietnamese full name (surname first) into syllables with hanja candidates. */
export function parseVietnamese(full: string): Syllable[] {
  const tokens = full.trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const out: Syllable[] = [];
  let i = 0;
  // Two-syllable surnames (Nam Cung, Gia Cát…)
  if (tokens.length >= 3) {
    const two = findVi(`${tokens[0]} ${tokens[1]}`, 's');
    if (two.list.length) {
      out.push({ input: `${tokens[0]} ${tokens[1]}`, candidates: two.list, fuzzy: two.fuzzy, middle: false, role: 's' });
      i = 2;
    }
  }
  for (; i < tokens.length; i++) {
    const role = i === 0 ? 's' : 'g';
    const { list, fuzzy } = findVi(tokens[i], role);
    const middle = i === 1 && tokens.length >= 3 && MIDDLE.includes(stripVi(tokens[i]));
    out.push({ input: tokens[i], candidates: list, fuzzy, middle, role });
  }
  return out;
}

/** Korean reading for a chosen entry at position `index` of the Korean name (0 = surname). */
export function koReading(e: HanjaEntry, index: number): string {
  // 두음법칙 for the surname and the first syllable of the given name.
  return index <= 1 ? initialLaw(e.ko) : e.ko;
}

const COMPOUND_KO = ['남궁', '제갈', '선우', '황보', '독고', '사공'];

/** Hanja most often chosen for Korean given-name syllables, most common first. */
const KO_GIVEN_PREFERRED: Record<string, string> = {
  서: '瑞書序舒', 연: '姸娟然延淵燕蓮緣', 민: '敏珉旻玟民', 준: '俊浚準埈峻駿', 지: '智志知芝',
  현: '賢炫玄鉉泫玹顯', 우: '宇祐佑友雨', 윤: '允潤胤', 하: '夏河霞', 은: '恩銀誾', 수: '秀洙守壽樹水垂',
  아: '雅娥兒', 훈: '勳薰訓', 원: '媛元源遠願原圓', 진: '眞珍振鎭晉津秦震進陳', 영: '英永榮泳映暎瑛',
  희: '熙姬喜希禧', 혜: '惠慧', 성: '成星聖晟誠城盛', 호: '浩皓昊晧鎬好豪', 재: '在才載宰哉財',
  정: '貞正晶廷定禎庭婷靜', 경: '慶京敬瓊景炅卿', 미: '美薇嵋', 선: '善仙宣', 유: '裕有柔維侑',
  주: '珠周柱宙', 채: '彩采', 소: '昭素韶', 린: '麟璘', 시: '時詩始', 예: '藝禮叡睿', 도: '道度桃',
  건: '建健乾', 태: '泰太', 승: '承勝昇', 상: '尙相祥霜', 석: '錫碩奭石', 빈: '彬斌', 규: '奎圭揆閨',
  찬: '燦讚', 환: '煥歡', 혁: '赫', 철: '哲澈喆', 한: '漢翰韓閑', 율: '律', 다: '多', 나: '娜',
  욱: '旭昱煜郁', 형: '亨炯衡馨', 병: '炳秉', 동: '東棟桐冬', 순: '順淳舜', 식: '植湜', 용: '勇容鎔溶龍',
  종: '鍾宗', 창: '昌彰', 의: '義宜意', 인: '仁寅', 홍: '弘紅鴻', 완: '完婉',
};

/** Splits a Korean name (hangul) and finds hanja candidates per syllable. */
export function parseKorean(full: string): Syllable[] {
  const chars = [...full.replace(/\s+/g, '')].filter(isHangul);
  if (!chars.length) return [];
  const joined = chars.join('');
  const surLen = chars.length >= 3 && COMPOUND_KO.includes(joined.slice(0, 2)) ? 2 : 1;
  const parts = [joined.slice(0, surLen), ...chars.slice(surLen)];
  return parts.map((p, i) => {
    const role = i === 0 ? 's' : 'g';
    const matches = HANJA.filter((e) => e.ko === p || initialLaw(e.ko) === p);
    const byRole = matches.filter((e) => e.roles.includes(role));
    // Prefer the most common Hán-Việt spelling first (entries listed earlier are more common).
    const list = dedupeHanja(byRole.length ? byRole : matches);
    const pref = role === 'g' ? KO_GIVEN_PREFERRED[p] ?? '' : '';
    const rank = (e: HanjaEntry) => {
      const k = pref.indexOf(e.h);
      return k >= 0 ? k : pref.length + (e.roles.includes('s') ? 1 : 0);
    };
    list.sort((x, y) => rank(x) - rank(y));
    return { input: p, candidates: list, fuzzy: false, middle: false, role };
  });
}

/** For Korean → Vietnamese, the same hanja may be listed with two Vietnamese spellings (Hoàng/Huỳnh); keep the first. */
function dedupeHanja(list: HanjaEntry[]): HanjaEntry[] {
  const seen = new Set<string>();
  return list.filter((e) => {
    if (seen.has(e.h)) return false;
    seen.add(e.h);
    return true;
  });
}
