// Age calculator: 만 나이 / 연 나이 / 세는나이 / tuổi mụ, school grade, birthdays and milestones.
import { jdnFromYmd, weekdayFromJdn, ymdFromJdn } from './astro';
import { cycleBranch, yearCycle } from './ganzhi';
import { CalendarCountry, LunarDate, lunarToSolar, solarToLunar } from './lunar';

export type SchoolStage = 'pre' | 'elem' | 'mid' | 'high' | 'done';
export interface School { stage: SchoolStage; grade: number }

export interface AgeResult {
  birthJdn: number;
  refJdn: number;
  birth: { y: number; m: number; d: number };
  lunarBirth: LunarDate;
  weekdayBorn: number;
  /** 만 나이 (international age, Korea's legal age since 2023) */
  intl: number;
  /** months and days past the last birthday */
  extraMonths: number;
  extraDays: number;
  /** 연 나이: reference year − birth year */
  yearAge: number;
  /** 세는나이: Korean count age by calendar year */
  koreanAge: number;
  /** tuổi mụ: count age by lunar (Tết) years */
  tuoiMu: number;
  /** 띠 by the lunar new year */
  zodiac: number;
  daysLived: number;
  nextBirthday: number;
  nextLunarBirthday: number | null;
  day10000: number;
  schoolKR: School;
  schoolVN: School;
}

const before = (m1: number, d1: number, m2: number, d2: number) => m1 < m2 || (m1 === m2 && d1 < d2);

/** Last valid day for a month: Feb 29 → Feb 28 in common years. */
function safeJdn(y: number, m: number, d: number): number {
  let dd = d;
  while (dd > 28) {
    const j = jdnFromYmd(y, m, dd);
    if (ymdFromJdn(j).m === m) return j;
    dd--;
  }
  return jdnFromYmd(y, m, dd);
}

function lunarBirthdayOn(lunarYear: number, b: LunarDate, country: CalendarCountry): number | null {
  // A leap-month birthday is kept in the regular month; day 30 falls back to 29 in short months.
  return lunarToSolar(lunarYear, b.month, b.day, false, country) ?? lunarToSolar(lunarYear, b.month, b.day - 1, false, country);
}

function school(refY: number, refM: number, birthY: number, startMonth: number, firstGradeOffset: number, levels: [number, number, number]): School {
  const schoolYear = refM >= startMonth ? refY : refY - 1;
  const g = schoolYear - (birthY + firstGradeOffset) + 1;
  if (g < 1) return { stage: 'pre', grade: 0 };
  if (g <= levels[0]) return { stage: 'elem', grade: g };
  if (g <= levels[1]) return { stage: 'mid', grade: g - levels[0] };
  if (g <= levels[2]) return { stage: 'high', grade: g - levels[1] };
  return { stage: 'done', grade: 0 };
}

export function calculateAge(birthJdn: number, refJdn: number, country: CalendarCountry): AgeResult {
  const birth = ymdFromJdn(birthJdn);
  const ref = ymdFromJdn(refJdn);
  const lunarBirth = solarToLunar(birthJdn, country);
  const lunarRef = solarToLunar(refJdn, country);

  const intl = ref.y - birth.y - (before(ref.m, ref.d, birth.m, birth.d) ? 1 : 0);
  const lastBirthday = safeJdn(birth.y + intl, birth.m, birth.d);
  let months = 0;
  let cursor = lastBirthday;
  for (;;) {
    const c = ymdFromJdn(cursor);
    const next = safeJdn(c.m === 12 ? c.y + 1 : c.y, c.m === 12 ? 1 : c.m + 1, birth.d);
    if (next > refJdn) break;
    cursor = next;
    months++;
  }

  let nextBirthday = safeJdn(ref.y, birth.m, birth.d);
  if (nextBirthday <= refJdn) nextBirthday = safeJdn(ref.y + 1, birth.m, birth.d);

  let nextLunarBirthday = lunarBirthdayOn(lunarRef.year, lunarBirth, country);
  if (nextLunarBirthday !== null && nextLunarBirthday <= refJdn) nextLunarBirthday = lunarBirthdayOn(lunarRef.year + 1, lunarBirth, country);

  return {
    birthJdn,
    refJdn,
    birth,
    lunarBirth,
    weekdayBorn: weekdayFromJdn(birthJdn),
    intl,
    extraMonths: months,
    extraDays: refJdn - cursor,
    yearAge: ref.y - birth.y,
    koreanAge: ref.y - birth.y + 1,
    tuoiMu: lunarRef.year - lunarBirth.year + 1,
    zodiac: cycleBranch(yearCycle(lunarBirth.year)),
    daysLived: refJdn - birthJdn,
    nextBirthday,
    nextLunarBirthday,
    day10000: birthJdn + 10000,
    // Korea: school year from March, 1st grade in the year one turns 7 (count 8); 6-3-3.
    schoolKR: school(ref.y, ref.m, birth.y, 3, 7, [6, 9, 12]),
    // Vietnam: school year from September, lớp 1 in the year one turns 6; 5-4-3.
    schoolVN: school(ref.y, ref.m, birth.y, 9, 6, [5, 9, 12]),
  };
}

/** Rows for the "age by birth year" table of a reference year. */
export function ageTable(refYear: number, from = refYear - 100) {
  const rows = [];
  for (let y = refYear; y >= from; y--) {
    rows.push({ year: y, intlBefore: refYear - y - 1, intlAfter: refYear - y, count: refYear - y + 1, zodiac: cycleBranch(yearCycle(y)), cycle: yearCycle(y) });
  }
  return rows;
}
