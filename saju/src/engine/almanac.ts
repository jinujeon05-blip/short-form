// Daily almanac (택일 / xem ngày tốt xấu).
import { DAY_MS, localJdn, solarTermsOfYear, weekdayFromJdn, ymdFromJdn } from './astro';
import { cycleBranch, cycleIndex, dayCycle, isClash, mod, yearCycle } from './ganzhi';
import { CalendarCountry, LunarDate, calendarTz, solarToLunar } from './lunar';

/** 12 day stars; hoàng đạo (황도) indexes */
export const GOOD_STARS = [0, 1, 4, 5, 7, 10];
/** 12 officers (12직 / thập nhị trực) */
export const GOOD_OFFICERS = [1, 4, 5, 8, 10];
export const BAD_OFFICERS = [6, 7, 11];

export type Purpose = 'wedding' | 'opening' | 'moving' | 'contract' | 'travel' | 'groundbreaking' | 'vehicle' | 'haircut';
export const PURPOSES: Purpose[] = ['wedding', 'opening', 'moving', 'contract', 'travel', 'groundbreaking', 'vehicle', 'haircut'];
// 12 officers: 0 建 1 除 2 滿 3 平 4 定 5 執 6 破 7 危 8 成 9 收 10 開 11 閉
const PURPOSE_OFFICERS: Record<Purpose, number[]> = {
  wedding: [4, 8, 10],
  opening: [2, 4, 8, 10],
  moving: [1, 4, 8, 10],
  contract: [4, 5, 8, 10],
  travel: [1, 4, 8, 10],
  // 동토 / động thổ: 平·定·成·開
  groundbreaking: [3, 4, 8, 10],
  // Buying a vehicle: 定 (settle), 成, 收 (receive), 開
  vehicle: [4, 8, 9, 10],
  // Haircut: 除 (removing) is the classic day, plus 平·成·開
  haircut: [1, 3, 8, 10],
};

export type DayLevel = 'great' | 'good' | 'normal' | 'bad';

export interface DayInfo {
  jdn: number;
  ymd: { y: number; m: number; d: number };
  weekday: number;
  lunar: Record<CalendarCountry, LunarDate>;
  yearCycle: number;
  monthCycle: number;
  dayCycle: number;
  star: number;
  starGood: boolean;
  officer: number;
  goodHours: number[];
  /** Vietnamese bad days by lunar day */
  tamNuong: boolean;
  nguyetKy: boolean;
  /** Korean 손 없는 날 (good for moving) */
  sonEomneun: boolean;
  /** Solar term index (0..23) starting on this date, if any */
  term: number | null;
  score: number;
  level: DayLevel;
}

const starStart = (branch: number) => mod(branch - 2, 6) * 2;

export function starOf(monthBranch: number, dayBranch: number) {
  return mod(dayBranch - starStart(monthBranch), 12);
}

export function goodHoursOf(dayBranch: number): number[] {
  const s = starStart(dayBranch);
  return Array.from({ length: 12 }, (_, h) => h).filter((h) => GOOD_STARS.includes(mod(h - s, 12)));
}

/** Month pillar (by 절) and year pillar at local noon of `jdn`. */
function solarMonthYear(jdn: number, tz: number): { year: number; month: number } {
  const noonUtc = (jdn - 2440588) * DAY_MS + (12 - tz) * 3600_000;
  const gy = new Date(noonUtc).getUTCFullYear();
  const terms = [...solarTermsOfYear(gy - 1), ...solarTermsOfYear(gy)];
  let idx = terms.length - 2;
  while (terms[idx] > noonUtc) idx -= 2;
  const termIdx = idx % 24;
  const monthBranch = mod(termIdx / 2 + 1, 12);
  const lichun = solarTermsOfYear(gy)[2];
  const year = yearCycle(noonUtc < lichun ? gy - 1 : gy);
  const yStem = year % 10;
  const mStem = mod((yStem % 5) * 2 + 2 + mod(monthBranch - 2, 12), 10);
  return { year, month: cycleIndex(mStem, monthBranch) };
}

const infoCache = new Map<string, DayInfo>();

export function dayInfo(jdn: number, basis: CalendarCountry): DayInfo {
  const key = `${jdn}:${basis}`;
  const hit = infoCache.get(key);
  if (hit) return hit;
  const tz = calendarTz(basis, jdn);
  const lunar = { KR: solarToLunar(jdn, 'KR'), VN: solarToLunar(jdn, 'VN') };
  const l = lunar[basis];
  const dc = dayCycle(jdn);
  const dBranch = cycleBranch(dc);
  const { year, month } = solarMonthYear(jdn, tz);
  const mBranch = cycleBranch(month);

  // Day star follows the lunar month (month 1 = 寅), as in Vietnamese and Korean almanacs.
  const lunarMonthBranch = mod(l.month + 1, 12);
  const star = starOf(lunarMonthBranch, dBranch);
  const starGood = GOOD_STARS.includes(star);
  // 12 officers follow the solar-term month.
  const officer = mod(dBranch - mBranch, 12);

  const tamNuong = [3, 7, 13, 18, 22, 27].includes(lunar.VN.day);
  const nguyetKy = [5, 14, 23].includes(lunar.VN.day);
  const sonEomneun = lunar.KR.day % 10 === 9 || lunar.KR.day % 10 === 0;

  const ymd = ymdFromJdn(jdn);
  let term: number | null = null;
  solarTermsOfYear(ymd.y).forEach((ms, i) => {
    if (localJdn(ms, tz) === jdn) term = i;
  });

  let score = starGood ? 2 : -1;
  if (GOOD_OFFICERS.includes(officer)) score += 1;
  if (BAD_OFFICERS.includes(officer)) score -= 1;
  if (basis === 'VN' && (tamNuong || nguyetKy)) score -= 2;
  const level: DayLevel = score >= 3 ? 'great' : score >= 1 ? 'good' : score >= -1 ? 'normal' : 'bad';

  const info: DayInfo = {
    jdn, ymd, weekday: weekdayFromJdn(jdn), lunar,
    yearCycle: year, monthCycle: month, dayCycle: dc,
    star, starGood, officer, goodHours: goodHoursOf(dBranch),
    tamNuong, nguyetKy, sonEomneun, term, score, level,
  };
  infoCache.set(key, info);
  return info;
}

/** Whether a day suits a purpose. `personalBranch` = the person's zodiac branch (to avoid clashing days). */
export function suitsPurpose(info: DayInfo, purpose: Purpose, basis: CalendarCountry, personalBranch?: number | null): boolean {
  if (!info.starGood || !PURPOSE_OFFICERS[purpose].includes(info.officer)) return false;
  if (basis === 'VN' && (info.tamNuong || info.nguyetKy)) return false;
  if (personalBranch != null && isClash(personalBranch, cycleBranch(info.dayCycle))) return false;
  return true;
}

/** Next `count` days (from `fromJdn`, within `maxDays`) that suit a purpose. */
export function upcomingDays(purpose: Purpose, basis: CalendarCountry, fromJdn: number, count = 12, maxDays = 120, personalBranch?: number | null): DayInfo[] {
  const out: DayInfo[] = [];
  for (let j = fromJdn; j < fromJdn + maxDays && out.length < count; j++) {
    const info = dayInfo(j, basis);
    if (suitsPurpose(info, purpose, basis, personalBranch)) out.push(info);
  }
  return out;
}

export function personalClash(info: DayInfo, personalBranch: number | null | undefined): boolean {
  return personalBranch != null && isClash(personalBranch, cycleBranch(info.dayCycle));
}

/** Zodiac branch of a person born in Gregorian `year` (lunar new year boundary approximated by 입춘). */
export const zodiacOfYear = (year: number) => cycleBranch(yearCycle(year));

export type HolidayKey =
  | 'newYear' | 'seollal' | 'samil' | 'children' | 'buddha' | 'memorial' | 'liberation' | 'chuseok'
  | 'foundation' | 'hangul' | 'christmas'
  | 'tet' | 'tetEve' | 'hungKings' | 'reunification' | 'labour' | 'national' | 'midAutumn'
  | 'lantern' | 'vuLan' | 'kitchenGods';

export function holidaysOf(info: DayInfo, basis: CalendarCountry): HolidayKey[] {
  const { m, d } = info.ymd;
  const out: HolidayKey[] = [];
  if (m === 1 && d === 1) out.push('newYear');
  if (basis === 'KR') {
    const l = info.lunar.KR;
    const nextLunar = solarToLunar(info.jdn + 1, 'KR');
    const prevLunar = solarToLunar(info.jdn - 1, 'KR');
    const isSeollal = (x: LunarDate) => !x.leap && x.month === 1 && x.day === 1;
    const isChuseok = (x: LunarDate) => !x.leap && x.month === 8 && x.day === 15;
    if (isSeollal(l) || isSeollal(nextLunar) || isSeollal(prevLunar)) out.push('seollal');
    if (isChuseok(l) || isChuseok(nextLunar) || isChuseok(prevLunar)) out.push('chuseok');
    if (!l.leap && l.month === 4 && l.day === 8) out.push('buddha');
    const fixed: [number, number, HolidayKey][] = [
      [3, 1, 'samil'], [5, 5, 'children'], [6, 6, 'memorial'], [8, 15, 'liberation'],
      [10, 3, 'foundation'], [10, 9, 'hangul'], [12, 25, 'christmas'],
    ];
    fixed.forEach(([fm, fd, k]) => fm === m && fd === d && out.push(k));
  } else {
    const l = info.lunar.VN;
    if (!l.leap && l.month === 1 && l.day <= 3) out.push('tet');
    if (!l.leap && l.month === 12 && l.day === l.monthLength) out.push('tetEve');
    if (!l.leap && l.month === 1 && l.day === 15) out.push('lantern');
    if (!l.leap && l.month === 3 && l.day === 10) out.push('hungKings');
    if (!l.leap && l.month === 7 && l.day === 15) out.push('vuLan');
    if (!l.leap && l.month === 8 && l.day === 15) out.push('midAutumn');
    if (!l.leap && l.month === 12 && l.day === 23) out.push('kitchenGods');
    const fixed: [number, number, HolidayKey][] = [[4, 30, 'reunification'], [5, 1, 'labour'], [9, 2, 'national']];
    fixed.forEach(([fm, fd, k]) => fm === m && fd === d && out.push(k));
  }
  return out;
}

export function todayJdn(tz: number): number {
  return localJdn(Date.now(), tz);
}
