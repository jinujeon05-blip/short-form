// 궁합 / Xem tuổi hợp: compatibility of two charts.
import { suitsPurpose, dayInfo } from './almanac';
import { Element, cycleBranch, mod, stemElement } from './ganzhi';
import { Relation, relationOf } from './fortune';
import { CalendarCountry } from './lunar';
import { SajuResult } from './pillars';

/** 납음오행 / Nạp âm: element of each pair of the 60-cycle. */
const NAYIN_ELEMENT: Element[] = [3, 1, 0, 2, 3, 1, 4, 2, 3, 0, 4, 2, 1, 0, 4, 3, 1, 0, 2, 3, 1, 4, 2, 3, 0, 4, 2, 1, 0, 4];
export const nayinIndex = (cycle: number) => Math.floor(cycle / 2);
export const nayinElement = (cycle: number) => NAYIN_ELEMENT[nayinIndex(cycle)];

export type StemRelation = 'combine' | 'generate' | 'same' | 'control';
export type NayinRelation = 'generate' | 'same' | 'control';
export type Balance = 'high' | 'mid' | 'low';
export type Grade = 'destined' | 'great' | 'good' | 'fair' | 'effort';

export interface MatchPart<T extends string> {
  type: T;
  points: number;
  max: number;
}

export interface MatchResult {
  score: number;
  grade: Grade;
  stem: MatchPart<StemRelation>;
  dayBranch: MatchPart<Relation>;
  zodiac: MatchPart<Relation>;
  nayin: MatchPart<NayinRelation>;
  balance: MatchPart<Balance>;
  zodiacA: number;
  zodiacB: number;
  nayinA: number;
  nayinB: number;
  /** Elements each person lacks most */
  weakA: Element[];
  weakB: Element[];
  /** Upcoming wedding-friendly days (JDN) that clash with neither zodiac */
  goodDays: number[];
}

export function stemRelation(a: number, b: number): StemRelation {
  if (a !== b && a % 5 === b % 5) return 'combine';
  const ea = stemElement(a);
  const eb = stemElement(b);
  if (ea === eb) return 'same';
  const d = mod(eb - ea, 5);
  return d === 1 || d === 4 ? 'generate' : 'control';
}

export function nayinRelation(a: Element, b: Element): NayinRelation {
  if (a === b) return 'same';
  const d = mod(b - a, 5);
  return d === 1 || d === 4 ? 'generate' : 'control';
}

const BRANCH_POINTS: Record<Relation, number> = {
  sixHarmony: 1, threeHarmony: 0.88, neutral: 0.6, same: 0.52, harm: 0.32, punish: 0.28, clash: 0.15,
};

function weakest(elements: number[]): Element[] {
  const min = Math.min(...elements);
  return elements.map((n, e) => (n === min ? e : -1)).filter((e) => e >= 0) as Element[];
}

export function matchCharts(a: SajuResult, b: SajuResult, fromJdn: number, basis: CalendarCountry): MatchResult {
  const sRel = stemRelation(a.dayMaster, b.dayMaster);
  const stem = { type: sRel, max: 25, points: { combine: 25, generate: 20, same: 15, control: 8 }[sRel] };

  const dRel = relationOf(a.day.branch, b.day.branch);
  const dayBranch = { type: dRel, max: 25, points: Math.round(25 * BRANCH_POINTS[dRel]) };

  const zodiacA = cycleBranch(a.lunarYearCycle);
  const zodiacB = cycleBranch(b.lunarYearCycle);
  const zRel = relationOf(zodiacA, zodiacB);
  const zodiac = { type: zRel, max: 20, points: Math.round(20 * BRANCH_POINTS[zRel]) };

  const nRel = nayinRelation(nayinElement(a.lunarYearCycle), nayinElement(b.lunarYearCycle));
  const nayin = { type: nRel, max: 15, points: { generate: 15, same: 11, control: 5 }[nRel] };

  const weakA = weakest(a.elements);
  const weakB = weakest(b.elements);
  const give = (weak: Element[], other: number[]) => Math.max(...weak.map((e) => other[e]));
  const fill = Math.min(give(weakA, b.elements), 2) + Math.min(give(weakB, a.elements), 2);
  const balancePoints = Math.round((fill / 4) * 15);
  const balance = {
    type: (fill >= 3 ? 'high' : fill >= 2 ? 'mid' : 'low') as Balance,
    max: 15,
    points: balancePoints,
  };

  const raw = stem.points + dayBranch.points + zodiac.points + nayin.points + balance.points;
  const score = Math.max(35, Math.min(99, Math.round(30 + raw * 0.7)));
  const grade: Grade = score >= 90 ? 'destined' : score >= 82 ? 'great' : score >= 72 ? 'good' : score >= 62 ? 'fair' : 'effort';

  const goodDays: number[] = [];
  for (let jdn = fromJdn + 1; jdn < fromJdn + 180 && goodDays.length < 3; jdn++) {
    const info = dayInfo(jdn, basis);
    if (info.level !== 'great' && info.level !== 'good') continue;
    if (suitsPurpose(info, 'wedding', basis, zodiacA) && suitsPurpose(info, 'wedding', basis, zodiacB)) goodDays.push(jdn);
  }

  return {
    score, grade, stem, dayBranch, zodiac, nayin, balance,
    zodiacA, zodiacB,
    nayinA: nayinIndex(a.lunarYearCycle), nayinB: nayinIndex(b.lunarYearCycle),
    weakA, weakB, goodDays,
  };
}
