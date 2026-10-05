// 사주팔자 / Tứ trụ calculation.
// - Year and month pillars switch at the exact UTC instant of 입춘 and each 절.
// - Day and hour pillars use local mean solar time (longitude correction) when enabled.
import { DAY_MS, jdnFromYmd, solarTermsOfYear } from './astro';
import {
  Element, branchElement, cycleBranch, cycleIndex, cycleStem, dayCycle, mainHiddenStem, mod,
  stemElement, stemYang, tenGod, TenGod, twelveStage, yearCycle, HIDDEN_STEMS,
} from './ganzhi';
import { lunarToSolar, CalendarCountry } from './lunar';
import { Place, localToUtc } from './timezone';

export interface BirthInput {
  calendar: 'solar' | 'lunar';
  year: number;
  month: number;
  day: number;
  leap?: boolean;
  /** null = unknown birth time */
  hour: number | null;
  minute: number;
  gender: 'M' | 'F';
  place: Place;
  /** Apply longitude correction (진태양시 / giờ mặt trời địa phương). Default true. */
  solarTime?: boolean;
  /** 야자시: 23:00–24:00 keeps the same day pillar. Default false (day changes at 23:00). */
  splitZi?: boolean;
}

export interface Pillar {
  cycle: number;
  stem: number;
  branch: number;
  stemGod: TenGod | 'self';
  branchGod: TenGod;
  hidden: number[];
  stage: number;
}

export interface LuckPillar {
  cycle: number;
  stem: number;
  branch: number;
  startAge: number;
  startYear: number;
}

export interface SajuResult {
  solar: { y: number; m: number; d: number };
  utcMs: number;
  offsetMin: number;
  solarTimeMinutes: number | null;
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar | null;
  dayMaster: number;
  elements: number[];
  /** support score vs total for a simple strength estimate */
  strength: { support: number; total: number; strong: boolean };
  favorable: Element[];
  luck: { forward: boolean; startAgeYears: number; startAgeMonths: number; pillars: LuckPillar[] };
  nearTermBoundary: boolean;
}

export class InvalidDateError extends Error {}

function makePillar(cycle: number, dayMaster: number, isDay = false): Pillar {
  const stem = cycleStem(cycle);
  const branch = cycleBranch(cycle);
  return {
    cycle,
    stem,
    branch,
    stemGod: isDay ? 'self' : tenGod(dayMaster, stem),
    branchGod: tenGod(dayMaster, mainHiddenStem(branch)),
    hidden: HIDDEN_STEMS[branch],
    stage: twelveStage(dayMaster, branch),
  };
}

/** 절 instants around a moment: [previous, next] */
function surroundingJie(utcMs: number): { prev: number; prevIndex: number; next: number } {
  const y = new Date(utcMs).getUTCFullYear();
  const list: { ms: number; idx: number }[] = [];
  for (const yy of [y - 1, y, y + 1]) {
    solarTermsOfYear(yy).forEach((ms, idx) => {
      if (idx % 2 === 0) list.push({ ms, idx });
    });
  }
  let i = list.length - 1;
  while (list[i].ms > utcMs) i--;
  return { prev: list[i].ms, prevIndex: list[i].idx, next: list[i + 1].ms };
}

export function calculateSaju(input: BirthInput): SajuResult {
  const country: CalendarCountry = input.place.country === 'VN' ? 'VN' : 'KR';
  let solar = { y: input.year, m: input.month, d: input.day };
  if (input.calendar === 'lunar') {
    const jdn = lunarToSolar(input.year, input.month, input.day, !!input.leap, country);
    if (jdn === null) throw new InvalidDateError('lunar date does not exist');
    const dt = new Date((jdn - 2440588) * DAY_MS);
    solar = { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
  } else {
    const dt = new Date(Date.UTC(solar.y, solar.m - 1, solar.d));
    if (dt.getUTCMonth() !== solar.m - 1 || dt.getUTCDate() !== solar.d) throw new InvalidDateError('invalid date');
  }

  const timeKnown = input.hour !== null;
  // Unknown time: use local noon so year/month pillars are still reasonable.
  const { utcMs, offsetMin } = localToUtc(input.place, solar.y, solar.m, solar.d, input.hour ?? 12, timeKnown ? input.minute : 0);

  // Year pillar
  const lichun = solarTermsOfYear(solar.y)[2];
  const sajuYear = utcMs < lichun ? solar.y - 1 : solar.y;
  const yCycle = yearCycle(sajuYear);
  const yStem = cycleStem(yCycle);

  // Month pillar
  const jie = surroundingJie(utcMs);
  const mBranch = mod(jie.prevIndex / 2 + 1, 12);
  const mStem = mod((yStem % 5) * 2 + 2 + mod(mBranch - 2, 12), 10);
  const mCycle = cycleIndex(mStem, mBranch);

  // Day / hour pillars from local (solar) time
  const useSolar = input.solarTime !== false;
  const localMinutes = useSolar
    ? utcMs / 60000 + input.place.longitude * 4
    : utcMs / 60000 + offsetMin;
  const localDayStart = Math.floor(localMinutes / 1440);
  const minuteOfDay = localMinutes - localDayStart * 1440;
  let dayJdn = localDayStart + 2440588;
  const lateZi = timeKnown && minuteOfDay >= 23 * 60;
  if (lateZi && !input.splitZi) dayJdn += 1;
  const dCycle = dayCycle(dayJdn);
  const dayMaster = cycleStem(dCycle);

  let hour: Pillar | null = null;
  if (timeKnown) {
    const hBranch = Math.floor((minuteOfDay + 60) / 120) % 12;
    // With 야자시 the hour stem follows the next day.
    const stemBaseDay = lateZi && input.splitZi ? cycleStem(dayCycle(dayJdn + 1)) : dayMaster;
    const hStem = mod((stemBaseDay % 5) * 2 + hBranch, 10);
    hour = makePillar(cycleIndex(hStem, hBranch), dayMaster);
  }

  const year = makePillar(yCycle, dayMaster);
  const month = makePillar(mCycle, dayMaster);
  const day = makePillar(dCycle, dayMaster, true);

  // Element counts across visible characters
  const pillars = [year, month, day, hour].filter(Boolean) as Pillar[];
  const elements = [0, 0, 0, 0, 0];
  for (const p of pillars) {
    elements[stemElement(p.stem)]++;
    elements[branchElement(p.branch)]++;
  }

  // Simple strength estimate: same + resource elements, month branch counted double.
  const dmEl = stemElement(dayMaster);
  const supports = (e: Element) => e === dmEl || e === mod(dmEl - 1, 5);
  let support = 0;
  let total = 0;
  for (const p of pillars) {
    if (p !== day) {
      total++;
      if (supports(stemElement(p.stem))) support++;
    }
    const w = p === month ? 2 : 1;
    total += w;
    if (supports(branchElement(p.branch))) support += w;
  }
  const strong = support * 2 >= total;
  const favorable: Element[] = strong
    ? ([mod(dmEl + 1, 5), mod(dmEl + 2, 5), mod(dmEl + 3, 5)] as Element[])
    : ([mod(dmEl - 1, 5), dmEl] as Element[]);
  favorable.sort((a, b) => elements[a] - elements[b]);

  // 대운 / Đại vận
  const forward = stemYang(yStem) === (input.gender === 'M');
  const diffDays = forward ? (jie.next - utcMs) / DAY_MS : (utcMs - jie.prev) / DAY_MS;
  const ageFloat = diffDays / 3;
  let startAgeYears = Math.floor(ageFloat);
  let startAgeMonths = Math.round((ageFloat - startAgeYears) * 12);
  if (startAgeMonths === 12) { startAgeYears++; startAgeMonths = 0; }
  const baseAge = Math.max(1, Math.round(ageFloat));
  const luckPillars: LuckPillar[] = Array.from({ length: 10 }, (_, i) => {
    const cycle = mod(mCycle + (forward ? i + 1 : -(i + 1)), 60);
    const startAge = baseAge + i * 10;
    // Korean age convention aside, we show international age (만 나이).
    return { cycle, stem: cycleStem(cycle), branch: cycleBranch(cycle), startAge, startYear: solar.y + startAge };
  });

  const nearTermBoundary = Math.min(utcMs - jie.prev, jie.next - utcMs) < 2 * 3600_000 ||
    Math.abs(utcMs - lichun) < 2 * 3600_000;

  return {
    solar,
    utcMs,
    offsetMin,
    solarTimeMinutes: timeKnown ? Math.round(minuteOfDay) : null,
    year, month, day, hour,
    dayMaster,
    elements,
    strength: { support, total, strong },
    favorable,
    luck: { forward, startAgeYears, startAgeMonths, pillars: luckPillars },
    nearTermBoundary,
  };
}

/** Pillar for today's date (used by almanac). */
export function yearPillarOf(utcMs: number): number {
  const y = new Date(utcMs).getUTCFullYear();
  return yearCycle(utcMs < solarTermsOfYear(y)[2] ? y - 1 : y);
}

export { jdnFromYmd };
