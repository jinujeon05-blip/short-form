// Daily zodiac fortune, derived from today's day pillar vs. the zodiac branch.
import {
  Element, branchElement, cycleBranch, cycleStem, generatorOf, isClash, isHarm, isPunish,
  isSixHarmony, isThreeHarmony, mod, stemElement,
} from './ganzhi';

export type Relation = 'sixHarmony' | 'threeHarmony' | 'same' | 'neutral' | 'harm' | 'punish' | 'clash';

export interface ZodiacFortune {
  branch: number;
  relation: Relation;
  /** 1..5 */
  stars: number;
  areas: { love: number; money: number; work: number; health: number };
  luckyElement: Element;
  luckyNumber: number;
  /** pick index for message variants */
  seed: number;
}

export function relationOf(dayBranch: number, zodiac: number): Relation {
  if (isSixHarmony(dayBranch, zodiac)) return 'sixHarmony';
  if (isThreeHarmony(dayBranch, zodiac)) return 'threeHarmony';
  if (isClash(dayBranch, zodiac)) return 'clash';
  if (dayBranch === zodiac) return 'same';
  if (isPunish(dayBranch, zodiac)) return 'punish';
  if (isHarm(dayBranch, zodiac)) return 'harm';
  return 'neutral';
}

const BASE: Record<Relation, number> = {
  sixHarmony: 5, threeHarmony: 4, same: 3, neutral: 3, harm: 2, punish: 2, clash: 1,
};

function hash(...n: number[]): number {
  let h = 2166136261;
  for (const x of n) {
    h ^= x;
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const clamp = (n: number) => Math.max(1, Math.min(5, n));

export function zodiacFortune(dayCycle: number, jdn: number, zodiac: number): ZodiacFortune {
  const dayBranch = cycleBranch(dayCycle);
  const relation = relationOf(dayBranch, zodiac);
  const zEl = branchElement(zodiac);
  const dEl = stemElement(cycleStem(dayCycle));
  // Day stem that nourishes the zodiac element lifts the mood a little.
  let stars = BASE[relation];
  if (mod(zEl - dEl, 5) === 1 && stars < 5) stars += 1;
  if (mod(dEl - zEl, 5) === 2 && stars > 1) stars -= 1;
  const h = hash(jdn, zodiac);
  const wobble = (k: number) => ((h >> (k * 3)) % 3) - 1;
  // Wealth relates to the element the zodiac controls, work to the element controlling it.
  const money = clamp(stars + wobble(1) + (mod(dEl - zEl, 5) === 2 ? 1 : 0));
  const work = clamp(stars + wobble(2));
  const love = clamp(stars + wobble(3) + (relation === 'sixHarmony' ? 1 : 0));
  const health = clamp(stars + wobble(4) + (relation === 'clash' ? -1 : 0));
  const luckyElement = generatorOf(zEl);
  const luckyNumber = [3, 2, 5, 4, 1][luckyElement] + ((h >> 15) % 2) * 5;
  return {
    branch: zodiac, relation, stars,
    areas: { love, money, work, health },
    luckyElement, luckyNumber, seed: h,
  };
}
