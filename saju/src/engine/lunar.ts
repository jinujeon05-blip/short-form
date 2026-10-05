// Lunisolar calendar (음력 / âm lịch) for Korea and Vietnam.
// Same rules for both countries; only the reference meridian differs:
//   Korea: UTC+9. Vietnam: UTC+7 since 1968, UTC+8 before (followed the Chinese calendar).
// Rules: a month starts on the local day of a new moon; month 11 contains the winter solstice;
// in a 13-month span between two month-11s, the first month without a 중기 is the leap month.
import { DAY_MS, localJdn, nextNewMoon, solarTermsOfYear, jdnFromYmd } from './astro';

export type CalendarCountry = 'KR' | 'VN';

export interface LunarDate {
  year: number;
  month: number;
  day: number;
  leap: boolean;
  /** Days in this lunar month (29 or 30) */
  monthLength: number;
}

interface LunarMonth {
  start: number; // JDN
  month: number;
  leap: boolean;
}

const VN_UTC7_FROM = jdnFromYmd(1968, 1, 1);

export function calendarTz(country: CalendarCountry, jdn: number): number {
  if (country === 'KR') return 9;
  return jdn < VN_UTC7_FROM ? 8 : 7;
}

const a11Cache = new Map<string, { jdn: number; ms: number }>();

/** Start of lunar month 11 of Gregorian year `y` (the month containing the winter solstice). */
function month11(y: number, tz: number): { jdn: number; ms: number } {
  const key = `${y}:${tz}`;
  const hit = a11Cache.get(key);
  if (hit) return hit;
  const solstice = solarTermsOfYear(y)[23];
  const solsticeDay = localJdn(solstice, tz);
  let nm = nextNewMoon(solstice - 32 * DAY_MS);
  for (;;) {
    const next = nextNewMoon(nm + DAY_MS);
    if (localJdn(next, tz) > solsticeDay) break;
    nm = next;
  }
  const res = { jdn: localJdn(nm, tz), ms: nm };
  a11Cache.set(key, res);
  return res;
}

const seqCache = new Map<string, { months: LunarMonth[]; end: number }>();

/** Months from month 11 of year y-1 (inclusive) to month 11 of year y (exclusive). */
function monthSequence(y: number, tz: number): { months: LunarMonth[]; end: number } {
  const key = `${y}:${tz}`;
  const hit = seqCache.get(key);
  if (hit) return hit;
  const from = month11(y - 1, tz);
  const to = month11(y, tz);
  const starts: number[] = [from.jdn];
  let nm = from.ms;
  for (;;) {
    nm = nextNewMoon(nm + DAY_MS);
    const d = localJdn(nm, tz);
    if (d >= to.jdn) break;
    starts.push(d);
  }
  let leapIndex = -1;
  if (starts.length === 13) {
    const majorDays = [...solarTermsOfYear(y - 1), ...solarTermsOfYear(y)]
      .filter((_, i) => i % 2 === 1)
      .map((ms) => localJdn(ms, tz));
    for (let i = 1; i < 13; i++) {
      const s = starts[i];
      const e = i + 1 < 13 ? starts[i + 1] : to.jdn;
      if (!majorDays.some((d) => d >= s && d < e)) {
        leapIndex = i;
        break;
      }
    }
  }
  const months: LunarMonth[] = [];
  let n = 11;
  starts.forEach((start, i) => {
    if (i === 0) {
      months.push({ start, month: 11, leap: false });
    } else if (i === leapIndex) {
      months.push({ start, month: n, leap: true });
    } else {
      n = (n % 12) + 1;
      months.push({ start, month: n, leap: false });
    }
  });
  const res = { months, end: to.jdn };
  seqCache.set(key, res);
  return res;
}

export function solarToLunar(jdn: number, country: CalendarCountry): LunarDate {
  const tz = calendarTz(country, jdn);
  const gy = new Date((jdn - 2440588) * DAY_MS).getUTCFullYear();
  let y = gy + 1;
  let seq = monthSequence(y, tz);
  if (jdn < seq.months[0].start) {
    y = gy;
    seq = monthSequence(y, tz);
  }
  const { months, end } = seq;
  let idx = months.length - 1;
  while (idx > 0 && months[idx].start > jdn) idx--;
  const m = months[idx];
  const nextStart = idx + 1 < months.length ? months[idx + 1].start : end;
  const firstMonthIdx = months.findIndex((x) => x.month === 1 && !x.leap);
  return {
    year: idx < firstMonthIdx ? y - 1 : y,
    month: m.month,
    day: jdn - m.start + 1,
    leap: m.leap,
    monthLength: nextStart - m.start,
  };
}

/** Returns JDN, or null when the lunar date does not exist. */
export function lunarToSolar(
  year: number,
  month: number,
  day: number,
  leap: boolean,
  country: CalendarCountry,
): number | null {
  // Approximate Gregorian date to pick the right time zone era.
  const tz = calendarTz(country, jdnFromYmd(year, Math.min(12, month + 1), 1));
  const seqYear = month >= 11 ? year + 1 : year;
  const { months, end } = monthSequence(seqYear, tz);
  const firstMonthIdx = months.findIndex((x) => x.month === 1 && !x.leap);
  const idx = months.findIndex(
    (x, i) => x.month === month && x.leap === leap && (month >= 11 ? i < firstMonthIdx : i >= firstMonthIdx),
  );
  if (idx < 0) return null;
  const nextStart = idx + 1 < months.length ? months[idx + 1].start : end;
  if (day < 1 || day > nextStart - months[idx].start) return null;
  return months[idx].start + day - 1;
}

/** Leap month number of lunar year `year`, or 0. */
export function leapMonthOf(year: number, country: CalendarCountry): number {
  const tz = calendarTz(country, jdnFromYmd(year, 6, 1));
  const { months } = monthSequence(year, tz);
  const next = monthSequence(year + 1, tz).months;
  const all = [...months, ...next];
  const leap = all.find((m, i) => m.leap && (i < months.length ? m.month <= 10 : m.month >= 11));
  return leap ? leap.month : 0;
}
