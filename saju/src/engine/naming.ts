// 한·베 작명 helpers: Korean-style names for Vietnamese people, and cross-language sound checks.
import { HANJA } from '../content/hanja';
import { KO_CHARS, KO_NAMES, KoName, Tag, VI_TAGS } from '../content/koNames';
import STROKES from '../content/nameStrokes.json';
import { stripTones, vietnameseToHangul } from './hangul';
import { initialLaw, koReading, parseVietnamese, romanizeName, stripVi } from './names';

const S_BASE = 0xac00;
const isSyllable = (c: string) => c >= '가' && c <= '힣';
const jamo = (c: string) => {
  const code = c.charCodeAt(0) - S_BASE;
  return [Math.floor(code / 588), Math.floor((code % 588) / 28), code % 28] as const;
};

// Similar-sounding initials and vowels (indexes in the Hangul block).
const L_GROUP = [0, 0, 1, 2, 2, 3, 4, 5, 5, 6, 6, 7, 8, 8, 8, 0, 2, 5, 9];
const V_GROUP = [0, 1, 0, 1, 2, 1, 2, 1, 3, 0, 1, 1, 3, 4, 2, 1, 4, 4, 5, 5, 5];

/** 0–5: how alike two Hangul syllables sound. */
export function syllableSimilarity(a: string, b: string): number {
  if (!isSyllable(a) || !isSyllable(b)) return 0;
  if (a === b) return 5;
  const [la, va, ta] = jamo(a);
  const [lb, vb, tb] = jamo(b);
  let s = 0;
  if (la === lb) s += 2;
  else if (L_GROUP[la] === L_GROUP[lb]) s += 1;
  if (va === vb) s += 2;
  else if (V_GROUP[va] === V_GROUP[vb]) s += 1;
  if (ta === tb) s += 0.5;
  return Math.min(s, 4.5);
}

/** Hangul syllables of how a Vietnamese word is pronounced (NIKL transcription). */
const viSound = (word: string) => [...vietnameseToHangul(word).hangul].filter(isSyllable);

const MIDDLE = ['thi', 'van'];

export interface VietName {
  surname: string;
  surnameKo: string;
  surnameHanja: string;
  /** Given-name syllables without Thị / Văn */
  given: string[];
  gender: 'f' | 'm' | null;
}

export function readVietName(full: string): VietName | null {
  const words = full.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return null;
  const sur = parseVietnamese(words[0])[0];
  const entry = sur?.candidates[0];
  const middle = words.slice(1).map((w) => stripVi(w));
  const gender = middle.includes('thi') ? 'f' : middle.includes('van') ? 'm' : null;
  const rest = words.slice(1);
  const given = rest.filter((w, i) => !(i < rest.length - 1 && MIDDLE.includes(stripVi(w))));
  return {
    surname: words[0],
    surnameKo: entry ? koReading(entry, 0) : viSound(words[0]).join(''),
    surnameHanja: entry?.h ?? '',
    given: given.length ? given : words.length === 1 ? [] : rest,
    gender,
  };
}

export type Reason =
  | { kind: 'sound'; vi: string; ko: string }
  | { kind: 'meaning'; vi: string; hanja: string; tag: Tag }
  | { kind: 'same'; vi: string; hanja: string };

export interface Suggestion {
  name: KoName;
  hanja: string;
  score: number;
  reasons: Reason[];
  flags: SoundFlag[];
}

const tagsOf = (word: string): Tag[] => VI_TAGS[word.normalize('NFC').toLowerCase()] ?? [];

/** Korean names whose sound, meaning or hanja connect to a Vietnamese given name. */
export function suggestKoreanNames(v: VietName, gender: 'f' | 'm' | 'all', count = 6): Suggestion[] {
  // Only the usual hanja of each Vietnamese syllable counts as "the same" (Hà → 河, not 霞).
  const viHanja = v.given.map((w) => parseVietnamese(`x ${w}`)[1]?.candidates[0]?.h);
  const pool = KO_NAMES.filter((n) => gender === 'all' || n.g === gender || n.g === 'u');
  const out = pool.map((name, rank) => {
    const syl = [...name.name];
    const reasons: Reason[] = [];
    let score = 1 - rank / pool.length; // gentle popularity bonus

    // Sound: align Vietnamese words with the Korean syllables in order.
    v.given.forEach((w, i) => {
      const heard = viSound(w);
      const targets = v.given.length === 1 ? syl : [syl[Math.min(i, syl.length - 1)]];
      let best = 0;
      let bestKo = '';
      for (const t of targets) for (const h of heard.slice(0, 2)) {
        const s = syllableSimilarity(h, t);
        if (s > best) { best = s; bestKo = t; }
      }
      score += best;
      if (best >= 3.5) reasons.push({ kind: 'sound', vi: w, ko: bestKo });
    });

    // Meaning and shared hanja: pick the hanja spelling that connects best.
    let bestHanja = name.hanja[0];
    let bestBonus = -1;
    let bestReasons: Reason[] = [];
    for (const h of name.hanja) {
      let bonus = 0;
      const rs: Reason[] = [];
      const used = new Set<string>();
      v.given.forEach((w, i) => {
        const same = [...h].find((c) => c === viHanja[i] && !used.has(c));
        if (same) { used.add(same); bonus += 4; rs.push({ kind: 'same', vi: w, hanja: same }); return; }
        const want = tagsOf(w);
        for (const c of h) {
          const tag = used.has(c) ? undefined : KO_CHARS[c]?.tags.find((t) => want.includes(t));
          if (tag) { used.add(c); bonus += 2.5; rs.push({ kind: 'meaning', vi: w, hanja: c, tag }); return; }
        }
      });
      if (bonus > bestBonus) { bestBonus = bonus; bestHanja = h; bestReasons = rs; }
    }
    score += bestBonus;
    const flags = koreanNameFlags(name.name);
    score -= flags.reduce((s, f) => s + (f.level === 'strong' ? 20 : 3), 0);
    return { name, hanja: bestHanja, score, reasons: [...reasons, ...bestReasons], flags };
  });
  return out.sort((a, b) => b.score - a.score).slice(0, count);
}

// ---------- Sound checks ----------

export interface SoundFlag {
  /** The part of the name that causes it */
  part: string;
  /** What it sounds like */
  like: string;
  level: 'strong' | 'mild';
  ko: string;
  vi: string;
}

const F = (part: string, like: string, level: SoundFlag['level'], ko: string, vi: string): SoundFlag => ({ part, like, level, ko, vi });

/** Korean syllables that Vietnamese listeners may hear as an awkward word. */
const KO_SYLLABLE_FLAGS: Record<string, SoundFlag> = {
  구: F('구 (Gu)', 'cu', 'strong', '베트남어 cu는 남자아이 성기를 가리키는 속어로 쓰입니다.', '“Cu” là từ lóng chỉ bộ phận sinh dục nam.'),
  두: F('두 (Du)', 'đụ', 'strong', '베트남어 đụ는 성관계를 뜻하는 비속어입니다.', '“Đụ” là từ tục tĩu.'),
  담: F('담 (Dam)', 'dâm', 'strong', '베트남어 dâm은 "음란하다"는 뜻입니다.', '“Dâm” nghĩa là dâm dục.'),
  론: F('론 (Ron)', 'lồn', 'strong', '베트남어로 읽으면 여성 성기를 가리키는 비속어와 비슷하게 들릴 수 있습니다.', 'Dễ nghe giống một từ tục chỉ bộ phận sinh dục nữ.'),
  준: F('준 (Jun)', 'giun', 'mild', '베트남 사람은 Jun을 giun(지렁이)처럼 읽기 쉽습니다. 친구들이 장난칠 수 있어요.', '“Jun” dễ bị đọc thành “giun” (con giun).'),
  보: F('보 (Bo)', 'bò', 'mild', '베트남어 bò는 "소"입니다. 놀림감이 될 수 있어요.', '“Bo” dễ nghe thành “bò” (con bò).'),
  몽: F('몽 (Mong)', 'mông', 'mild', '베트남어 mông은 "엉덩이"입니다.', '“Mong” dễ nghe thành “mông”.'),
  디: F('디 (Di)', 'đĩ', 'mild', '성조에 따라 매춘부를 뜻하는 đĩ로 들릴 수 있습니다.', 'Tùy thanh điệu có thể nghe thành “đĩ”.'),
  부: F('부 (Bu)', 'bú', 'mild', '베트남어 bú는 "젖을 빨다"라는 뜻입니다.', '“Bu” dễ nghe thành “bú”.'),
  찬: F('찬 (Chan)', 'chán', 'mild', '베트남어 chán은 "지루하다, 싫증 나다"입니다. 큰 문제는 아니에요.', '“Chan” nghe như “chán” — không nghiêm trọng.'),
  조: F('조 (Jo)', 'chó', 'mild', '성조에 따라 chó(개)처럼 들릴 수 있습니다.', 'Tùy thanh điệu có thể nghe thành “chó”.'),
  도: F('도 (Do)', 'đồ', 'mild', '"đồ ngốc(바보)"처럼 욕할 때 쓰는 đồ와 비슷합니다. 대부분은 괜찮아요.', 'Gần với “đồ” trong “đồ ngốc” — thường không sao.'),
  마: F('마 (Ma)', 'ma', 'mild', '베트남어 ma는 "귀신"입니다.', '“Ma” nghĩa là con ma.'),
  쿠: F('쿠 (Ku)', 'cu', 'strong', '베트남어 cu(속어)처럼 들립니다.', 'Nghe như “cu” (từ lóng).'),
};

/** Korean name → what Vietnamese listeners may hear. */
export function koreanNameFlags(given: string): SoundFlag[] {
  return [...new Set([...given].filter(isSyllable))].map((s) => KO_SYLLABLE_FLAGS[s]).filter((f): f is SoundFlag => !!f);
}

/** Vietnamese name syllables (no tones) that sound awkward to Korean or English speakers. */
const VI_WORD_FLAGS: Record<string, SoundFlag> = {
  bich: F('Bích', 'bitch', 'strong', '영어 욕설 bitch처럼 들려 영어권에서 놀림받기 쉽습니다. 한국 학교·회사에서도 장난의 대상이 될 수 있어요.', 'Đọc giống từ chửi tiếng Anh “bitch”.'),
  phuc: F('Phúc', 'f*ck', 'strong', '영어 욕설처럼 들립니다. 한국에서 영어 이름 표기(Phuc)를 볼 때 특히 그렇습니다.', 'Viết “Phuc” dễ bị đọc như từ tục tiếng Anh.'),
  dung: F('Dung', 'dung / 똥', 'mild', '영어 dung은 "가축의 똥"이고, 한국 아이들이 "둥/똥"으로 장난칠 수 있습니다.', 'Tiếng Anh “dung” là phân; trẻ Hàn có thể trêu “똥”.'),
  dong: F('Đông', '똥', 'mild', '로마자 Dong을 한국 아이들이 "똥"으로 바꿔 놀릴 수 있습니다.', 'Trẻ Hàn có thể trêu “Dong” thành “똥” (phân).'),
  phat: F('Phát', 'fat', 'mild', '영어 fat(뚱뚱한)처럼 들릴 수 있습니다.', 'Nghe như “fat” (béo) trong tiếng Anh.'),
  phi: F('Phi', '피', 'mild', '한국어 "피(血)"처럼 들립니다. 큰 문제는 아니에요.', 'Nghe như “피” (máu) trong tiếng Hàn — không nghiêm trọng.'),
  sang: F('Sang', '쌍', 'mild', '한국어 욕설 "쌍-"을 연상시킬 수 있습니다.', 'Có thể gợi tiếng chửi “쌍” trong tiếng Hàn.'),
};

export interface KoreanEar {
  hangul: string;
  flags: SoundFlag[];
  /** Hard for Korean speakers: ng- initials, ư/ơ, etc. */
  hard: { part: string; ko: string; vi: string }[];
}

/** Vietnamese name → how Koreans will write and hear it. */
export function vietnameseNameCheck(full: string): KoreanEar {
  const words = full.trim().split(/\s+/).filter(Boolean);
  const flags = words.flatMap((w) => { const f = VI_WORD_FLAGS[stripVi(w)]; return f ? [{ ...f, part: w }] : []; });
  const hard: KoreanEar['hard'] = [];
  for (const w of words) {
    const s = stripVi(w);
    if (/^ng/.test(s)) hard.push({ part: w, ko: `${w}의 "ng-" 첫소리는 한국어에 없어 "응-"으로 늘어집니다.`, vi: `Âm đầu “ng-” trong ${w} không có trong tiếng Hàn, thành “응-”.` });
    else if (/^(tr|ch)/.test(s) && s.length > 2) hard.push({ part: w, ko: `${w}는 한국어로 "쩌/찌"처럼 된소리로 적혀 다르게 들릴 수 있습니다.`, vi: `“${w}” viết bằng Hangul thành âm căng “ㅉ”.` });
    else if (/[ươ]/.test(stripTones(w))) hard.push({ part: w, ko: `${w}의 ư/ơ 모음은 한국 사람이 "으/어"로 바꿔 발음합니다.`, vi: `Nguyên âm ư/ơ trong ${w} người Hàn đọc thành “으/어”.` });
  }
  return { hangul: vietnameseToHangul(full).hangul, flags, hard };
}

// ---------- Hanja: readings, strokes, 81수리 ----------

const STROKE: Record<string, number> = STROKES as Record<string, number>;
export const strokesOf = (h: string) => STROKE[h];

export interface HanjaInfo { h: string; ko: string; hun?: string; vi?: string; mVi?: string }

/** Korean-reading → hanja candidates for a name syllable (curated name characters first). */
export function hanjaFor(syllable: string): HanjaInfo[] {
  const seen = new Set<string>();
  const out: HanjaInfo[] = [];
  const match = (ko: string) => ko === syllable || initialLaw(ko) === syllable;
  for (const [h, c] of Object.entries(KO_CHARS)) {
    if (match(c.ko) && !seen.has(h)) { seen.add(h); out.push({ h, ko: c.ko, hun: c.hun, vi: c.vi, mVi: c.mVi }); }
  }
  for (const e of HANJA) {
    if (e.roles.includes('g') && match(e.ko) && !seen.has(e.h)) { seen.add(e.h); out.push({ h: e.h, ko: e.ko, hun: e.mKo, vi: e.vi, mVi: e.mVi }); }
  }
  return out;
}

/** Most common hanja for Korean surnames. */
export const KO_SURNAME_HANJA: Record<string, string> = {
  김: '金', 이: '李', 박: '朴', 최: '崔', 정: '鄭', 강: '姜', 조: '趙', 윤: '尹', 장: '張', 임: '林', 한: '韓', 오: '吳', 서: '徐',
  신: '申', 권: '權', 황: '黃', 안: '安', 송: '宋', 유: '柳', 류: '柳', 홍: '洪', 전: '全', 고: '高', 문: '文', 양: '梁', 손: '孫',
  배: '裵', 백: '白', 허: '許', 노: '盧', 심: '沈', 하: '河', 곽: '郭', 성: '成', 차: '車', 주: '朱', 우: '禹', 구: '具', 민: '閔',
  진: '陳', 나: '羅', 지: '池', 엄: '嚴', 채: '蔡', 원: '元', 천: '千', 방: '方', 공: '孔', 현: '玄', 함: '咸', 변: '卞', 염: '廉',
  여: '呂', 추: '秋', 도: '都', 소: '蘇', 석: '石', 선: '宣', 설: '薛', 마: '馬', 길: '吉', 연: '延', 위: '魏', 표: '表', 명: '明',
  기: '奇', 반: '潘', 왕: '王', 금: '琴', 옥: '玉', 육: '陸', 인: '印', 맹: '孟', 제: '諸', 모: '牟', 남: '南', 탁: '卓', 국: '鞠',
  어: '魚', 은: '殷', 용: '龍', 예: '芮', 경: '慶', 봉: '奉', 사: '史', 부: '夫', 완: '阮', 범: '范', 무: '武', 등: '鄧', 두: '杜',
  호: '胡', 단: '段', 매: '梅', 동: '董',
};

/** 81수리 numbers traditionally read as auspicious (schools differ slightly). */
const LUCKY = new Set([1, 3, 5, 6, 7, 8, 11, 13, 15, 16, 17, 18, 21, 23, 24, 25, 29, 31, 32, 33, 35, 37, 39, 41, 45, 47, 48, 52, 57, 61, 63, 65, 67, 68, 81]);
const norm81 = (n: number) => ((n - 1) % 80) + 1;

export interface Grid { key: 'won' | 'hyeong' | 'i' | 'jeong'; n: number; lucky: boolean }

/** 원격·형격·이격·정격 for a one-character surname and a two-character given name. */
export function fourGrids(sur: number, g1: number, g2: number): Grid[] {
  const g = (key: Grid['key'], n: number): Grid => ({ key, n, lucky: LUCKY.has(norm81(n)) });
  return [g('won', g1 + g2), g('hyeong', sur + g1), g('i', sur + g2), g('jeong', sur + g1 + g2)];
}

/** Hán-Việt reading of a hanja string, when every character is known. */
export function hanVietOf(hanja: string): string | null {
  const parts = [...hanja].map((h) => KO_CHARS[h]?.vi ?? HANJA.find((e) => e.h === h)?.vi);
  return parts.every(Boolean) ? parts.join(' ') : null;
}

export const fullRoman = (sur: string, given: string) => romanizeName(sur, [...given]);

let tablePromise: Promise<Map<string, { s: number; ko: string }>> | null = null;
/** Full Unihan 원획 table (~7,500 hanja), loaded only when someone types a hanja outside the name data. */
export function loadStrokeTable() {
  tablePromise ??= import('../content/strokeTable').then(({ STROKE_TABLE }) => {
    const m = new Map<string, { s: number; ko: string }>();
    for (const e of STROKE_TABLE.split(',')) {
      const r = e.match(/^(.)(\d+)(.*)$/u);
      if (r) m.set(r[1], { s: Number(r[2]), ko: r[3] });
    }
    return m;
  });
  return tablePromise;
}
