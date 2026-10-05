// Vietnamese → Hangul transcription following the National Institute of Korean Language
// rules for Vietnamese (베트남어 표기 세칙), e.g. Nguyễn → 응우옌, Trần → 쩐, Thanh → 타인.

// Jamo indexes in the Unicode Hangul syllable block.
const CHO = { g: 0, kk: 1, n: 2, d: 3, tt: 4, r: 5, m: 6, b: 7, pp: 8, s: 9, ss: 10, none: 11, j: 12, jj: 13, ch: 14, k: 15, t: 16, p: 17, h: 18 };
const V = { a: 0, ae: 1, ya: 2, yae: 3, eo: 4, e: 5, yeo: 6, ye: 7, o: 8, wa: 9, wae: 10, yo: 12, u: 13, wo: 14, we: 15, wi: 16, yu: 17, eu: 18, i: 20 };
const JONG = { none: 0, k: 1, n: 4, m: 16, p: 17, t: 19, ng: 21 };

type VKey = keyof typeof V;

const INITIALS: [string, number][] = [
  ['ngh', -1], ['ng', -1], ['nh', CHO.n], ['ch', CHO.jj], ['gh', CHO.g], ['gi', CHO.j], ['kh', CHO.k], ['ph', CHO.p],
  ['qu', CHO.kk], ['th', CHO.t], ['tr', CHO.jj], ['b', CHO.b], ['c', CHO.kk], ['d', CHO.j], ['đ', CHO.d], ['g', CHO.g],
  ['h', CHO.h], ['k', CHO.kk], ['l', CHO.r], ['m', CHO.m], ['n', CHO.n], ['p', CHO.pp], ['r', CHO.r], ['s', CHO.s],
  ['t', CHO.tt], ['v', CHO.b], ['x', CHO.ss],
];

const FINALS: [string, number][] = [['ch', JONG.k], ['ng', JONG.ng], ['nh', JONG.n], ['c', JONG.k], ['m', JONG.m], ['n', JONG.n], ['p', JONG.p], ['t', JONG.t]];

const NUCLEI: [string, VKey[]][] = [
  ['iêu', ['i', 'e', 'u']], ['yêu', ['i', 'e', 'u']], ['uôi', ['u', 'o', 'i']], ['ươi', ['eu', 'eo', 'i']], ['ươu', ['eu', 'eo', 'u']],
  ['uyê', ['u', 'ye']], ['oai', ['o', 'a', 'i']], ['oay', ['o', 'a', 'i']], ['uây', ['u', 'eo', 'i']], ['uya', ['u', 'i', 'eo']],
  ['iê', ['i', 'e']], ['yê', ['i', 'e']], ['ia', ['i', 'eo']], ['ua', ['u', 'eo']], ['uô', ['u', 'o']], ['ưa', ['eu', 'eo']],
  ['ươ', ['eu', 'eo']], ['oa', ['o', 'a']], ['oă', ['o', 'a']], ['oe', ['o', 'ae']], ['uê', ['u', 'e']], ['uy', ['u', 'i']],
  ['uâ', ['u', 'eo']], ['ai', ['a', 'i']], ['ay', ['a', 'i']], ['ao', ['a', 'o']], ['au', ['a', 'u']], ['âu', ['eo', 'u']],
  ['ây', ['eo', 'i']], ['eo', ['ae', 'o']], ['êu', ['e', 'u']], ['iu', ['i', 'u']], ['oi', ['o', 'i']], ['ôi', ['o', 'i']],
  ['ơi', ['eo', 'i']], ['ui', ['u', 'i']], ['ưi', ['eu', 'i']], ['ưu', ['eu', 'u']], ['oo', ['o']],
  ['a', ['a']], ['ă', ['a']], ['â', ['eo']], ['e', ['ae']], ['ê', ['e']], ['i', ['i']], ['y', ['i']], ['o', ['o']],
  ['ô', ['o']], ['ơ', ['eo']], ['u', ['u']], ['ư', ['eu']],
];

const Y_GLIDE: Partial<Record<VKey, VKey>> = { a: 'ya', eo: 'yeo', o: 'yo', u: 'yu', ae: 'yae', e: 'ye' };
const W_GLIDE: Partial<Record<VKey, VKey>> = { a: 'wa', eo: 'wo', ae: 'wae', e: 'we' };

const syl = (cho: number, v: VKey, jong = 0) => String.fromCharCode(0xac00 + cho * 588 + V[v] * 28 + jong);

/** Removes the five tone marks but keeps ă â ê ô ơ ư đ. */
export function stripTones(s: string): string {
  return s.normalize('NFD').replace(/[̣̀́̃̉]/g, '').normalize('NFC').toLowerCase();
}

export interface SyllableParts {
  input: string;
  initial: string;
  nucleus: string;
  final: string;
  hangul: string;
}

/** Transcribes one Vietnamese syllable; returns null if it is not a Vietnamese syllable. */
export function viSyllableToHangul(word: string): SyllableParts | null {
  const w = stripTones(word);
  if (!/^[a-zăâđêôơư]+$/.test(w)) return null;
  let rest = w;
  let initial = '';
  let cho: number = CHO.none;
  for (const [k, c] of INITIALS) {
    if (rest.startsWith(k)) {
      initial = k;
      cho = c;
      rest = rest.slice(k.length);
      break;
    }
  }
  // gì, gìn: the i belongs to the vowel.
  if (initial === 'gi' && !/^[aăâeêioôơuưy]/.test(rest)) rest = `i${rest}`;
  let final = '';
  let jong: number = JONG.none;
  for (const [k, j] of FINALS) {
    if (rest.endsWith(k) && rest.length > k.length) {
      final = k;
      jong = j;
      rest = rest.slice(0, -k.length);
      break;
    }
  }
  const nuc = NUCLEI.find(([k]) => k === rest);
  if (!nuc) return null;
  let vowels = [...nuc[1]];
  // anh, ach → 아인, 아익
  if ((final === 'nh' || final === 'ch') && (rest === 'a' || rest === 'ă' || rest === 'oa')) vowels.push('i');

  let prefix = '';
  if (initial === 'ng' || initial === 'ngh') {
    prefix = syl(CHO.none, 'eu', JONG.ng); // 응
    cho = CHO.none;
  } else if (initial === 'nh' && Y_GLIDE[vowels[0]]) {
    vowels[0] = Y_GLIDE[vowels[0]]!;
  } else if (initial === 'qu') {
    if (W_GLIDE[vowels[0]]) vowels[0] = W_GLIDE[vowels[0]]!;
    else vowels = ['u', ...vowels];
  }

  const out = vowels.map((v, i) => syl(i === 0 ? cho : CHO.none, v, i === vowels.length - 1 ? jong : 0));
  return { input: word, initial, nucleus: rest, final, hangul: prefix + out.join('') };
}

/** Customary spellings that differ from the rule-based form. */
const CUSTOM: Record<string, string> = {
  'viet nam': '베트남', 'ho chi minh': '호찌민', 'sai gon': '사이공', 'ha noi': '하노이', 'da nang': '다낭',
};

export interface Transcription {
  words: SyllableParts[];
  unknown: string[];
  hangul: string;
  custom?: string;
}

/** Transcribes a Vietnamese name or phrase, syllable by syllable (spaces kept). */
export function vietnameseToHangul(text: string): Transcription {
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  const words: SyllableParts[] = [];
  const unknown: string[] = [];
  const parts = tokens.map((tk) => {
    const clean = tk.replace(/[.,!?;:"'()]/g, '');
    const s = viSyllableToHangul(clean);
    if (!s) {
      unknown.push(tk);
      return tk;
    }
    words.push(s);
    return s.hangul;
  });
  const key = tokens.map((t) => t.toLowerCase().replace(/đ/g, 'd').normalize('NFD').replace(/[\u0300-\u036f]/g, '')).join(' ');
  return { words, unknown, hangul: parts.join(' '), custom: CUSTOM[key] };
}
