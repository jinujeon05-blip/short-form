// Astronomical primitives: solar terms (절기 / tiết khí) and new moons.
// All instants are UTC milliseconds.
import { SearchMoonPhase, SearchSunLongitude } from 'astronomy-engine';

export const DAY_MS = 86_400_000;

/**
 * The 24 solar terms of a Gregorian year, indexed 0..23 starting at 소한(小寒, 285°).
 * Even indexes are 절(節, month boundaries); odd indexes are 중기(中氣, major terms).
 */
export const TERM_LONGITUDES = Array.from({ length: 24 }, (_, i) => (285 + 15 * i) % 360);

const termCache = new Map<number, number[]>();

/** UTC instants of the 24 solar terms falling in Gregorian `year`. */
export function solarTermsOfYear(year: number): number[] {
  const cached = termCache.get(year);
  if (cached) return cached;
  const jan1 = Date.UTC(year, 0, 1);
  const terms = TERM_LONGITUDES.map((lon, i) => {
    // 소한 falls around Jan 5; each term is ~15.2 days apart.
    const approx = jan1 + (4.5 + i * 15.218) * DAY_MS;
    const t = SearchSunLongitude(lon, new Date(approx - 6 * DAY_MS), 12);
    if (!t) throw new Error(`solar term ${i} of ${year} not found`);
    return t.date.getTime();
  });
  termCache.set(year, terms);
  return terms;
}

/** First new moon at or after `ms`. */
export function nextNewMoon(ms: number): number {
  const t = SearchMoonPhase(0, new Date(ms), 40);
  if (!t) throw new Error('new moon not found');
  return t.date.getTime();
}

/** Day number (JDN) of the local civil date containing instant `ms` at UTC offset `tzHours`. */
export function localJdn(ms: number, tzHours: number): number {
  return Math.floor(ms / DAY_MS + tzHours / 24) + 2440588;
}

export function jdnFromYmd(y: number, m: number, d: number): number {
  return Math.round(Date.UTC(y, m - 1, d) / DAY_MS) + 2440588;
}

export function ymdFromJdn(jdn: number): { y: number; m: number; d: number } {
  const dt = new Date((jdn - 2440588) * DAY_MS);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

/** 0 = Sunday … 6 = Saturday */
export function weekdayFromJdn(jdn: number): number {
  return (((jdn + 1) % 7) + 7) % 7;
}
