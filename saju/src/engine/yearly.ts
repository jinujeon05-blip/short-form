// Yearly zodiac fortune (신년운세 / tử vi năm): derived from the year's pillar vs. each zodiac branch.
import { DAY_MS, solarTermsOfYear } from './astro';
import {
  Element, branchElement, cycleBranch, cycleIndex, cycleStem, generatorOf, mod, stemElement, yearCycle,
} from './ganzhi';
import { Relation, relationOf } from './fortune';
import { NayinRelation, nayinElement, nayinIndex, nayinRelation } from './match';

export const FORTUNE_YEARS = [2027];
export const ANIMAL_SLUGS = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'];

export type Area = 'love' | 'money' | 'work' | 'health';
export type Samjae = 0 | 1 | 2 | 3; // none, entering(들), middle(눌), leaving(날)

export interface MonthFortune {
  /** 0 = 寅 month (starts at 입춘) … 11 = 丑 month */
  index: number;
  cycle: number;
  startMs: number;
  endMs: number;
  stars: number;
  relation: Relation;
}

export interface BirthYearRow {
  year: number;
  cycle: number;
  /** Age counted the Korean/Vietnamese folk way (born = 1) */
  countAge: number;
  intlAge: number;
  nayin: number;
  nayinRel: NayinRelation;
}

export interface YearFortune {
  year: number;
  yearCycle: number;
  zodiac: number;
  relation: Relation;
  overall: number;
  areas: Record<Area, number>;
  samjae: Samjae;
  months: MonthFortune[];
  birthYears: BirthYearRow[];
  luckyElement: Element;
  luckyNumber: number;
}

const clamp = (n: number) => Math.max(1, Math.min(5, Math.round(n)));

const BASE: Record<Relation, number> = {
  sixHarmony: 5, threeHarmony: 4, neutral: 3, same: 3, harm: 2, punish: 2, clash: 2,
};
const MONTH_SHIFT: Record<Relation, number> = {
  sixHarmony: 2, threeHarmony: 1, neutral: 0, same: 0, harm: -1, punish: -1, clash: -2,
};

/** 삼재 / Tam Tai: each three-harmony group meets it in the three years after its 'clash' corner. */
// Groups by zodiac % 4: 申子辰→寅卯辰, 巳酉丑→亥子丑, 寅午戌→申酉戌, 亥卯未→巳午未
const SAMJAE_START = [2, 11, 8, 5];

export function samjaeOf(yearBranch: number, zodiac: number): Samjae {
  const offset = mod(yearBranch - SAMJAE_START[zodiac % 4], 12);
  return offset < 3 ? ((offset + 1) as Samjae) : 0;
}

export function yearFortune(year: number, zodiac: number): YearFortune {
  const yc = yearCycle(year);
  const yBranch = cycleBranch(yc);
  const yEl = stemElement(cycleStem(yc));
  const zEl = branchElement(zodiac);
  const relation = relationOf(yBranch, zodiac);
  const base = BASE[relation];
  const samjae = samjaeOf(yBranch, zodiac);

  const rel = mod(yEl - zEl, 5); // year element relative to the zodiac element
  const areas: Record<Area, number> = {
    // The element the zodiac controls is its wealth.
    money: clamp(base + (rel === 2 ? 1 : 0) + (relation === 'clash' ? -1 : 0)),
    love: clamp(base + (relation === 'sixHarmony' || relation === 'threeHarmony' ? 1 : 0) + (relation === 'harm' ? -1 : 0)),
    // The element that controls the zodiac brings duty and recognition.
    work: clamp(base + (rel === 3 ? 1 : 0) + (rel === 1 ? 1 : 0) - (relation === 'punish' ? 1 : 0)),
    // Being nourished by the year helps health; clashes and 삼재 strain it.
    health: clamp(base + (rel === 4 ? 1 : 0) - (relation === 'clash' ? 1 : 0) - (samjae ? 1 : 0)),
  };
  const overall = clamp((base * 2 + areas.love + areas.money + areas.work + areas.health) / 6);

  // Months by solar term: 寅 month from 입춘 of `year` to 丑 month ending at 입춘 of year+1.
  const terms = [...solarTermsOfYear(year), ...solarTermsOfYear(year + 1)];
  const yStem = cycleStem(yc);
  const months: MonthFortune[] = Array.from({ length: 12 }, (_, i) => {
    const branch = mod(2 + i, 12);
    const stem = mod((yStem % 5) * 2 + 2 + i, 10);
    const r = relationOf(branch, zodiac);
    return {
      index: i,
      cycle: cycleIndex(stem, branch),
      startMs: terms[2 + i * 2],
      endMs: terms[4 + i * 2],
      stars: clamp(3 + MONTH_SHIFT[r] + (base - 3) / 2),
      relation: r,
    };
  });

  const yearNayin = nayinElement(yc);
  const birthYears: BirthYearRow[] = [];
  for (let y = 1936; y < year; y++) {
    const c = yearCycle(y);
    if (cycleBranch(c) !== zodiac) continue;
    birthYears.push({
      year: y,
      cycle: c,
      countAge: year - y + 1,
      intlAge: year - y,
      nayin: nayinIndex(c),
      nayinRel: nayinRelation(nayinElement(c), yearNayin),
    });
  }
  // Ages 0–90 are enough for the table.
  const rows = birthYears.filter((r) => r.intlAge <= 90);

  const luckyElement = generatorOf(zEl);
  const luckyNumber = [3, 2, 5, 4, 1][luckyElement] + (zodiac % 2) * 5;

  return { year, yearCycle: yc, zodiac, relation, overall, areas, samjae, months, birthYears: rows, luckyElement, luckyNumber };
}

/** Zodiacs ordered by overall fortune (best first). */
export function yearRanking(year: number): YearFortune[] {
  return Array.from({ length: 12 }, (_, z) => yearFortune(year, z)).sort((a, b) => {
    const sa = a.overall * 10 + a.areas.love + a.areas.money + a.areas.work + a.areas.health;
    const sb = b.overall * 10 + b.areas.love + b.areas.money + b.areas.work + b.areas.health;
    return sb - sa || a.zodiac - b.zodiac;
  });
}

export const monthLength = (m: MonthFortune) => Math.round((m.endMs - m.startMs) / DAY_MS);
