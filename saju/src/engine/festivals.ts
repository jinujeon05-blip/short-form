// Korean vs Vietnamese lunar festival dates (설날/Tết, 추석/Trung Thu) and yearly holiday lists.
import { jdnFromYmd } from './astro';
import { HolidayKey, dayInfo, holidaysOf } from './almanac';
import { CalendarCountry, lunarToSolar } from './lunar';

export interface FestivalRow {
  year: number;
  seollal: number;
  tet: number;
  chuseok: number;
  trungThu: number;
}

export function festivalRow(year: number): FestivalRow {
  return {
    year,
    seollal: lunarToSolar(year, 1, 1, false, 'KR')!,
    tet: lunarToSolar(year, 1, 1, false, 'VN')!,
    chuseok: lunarToSolar(year, 8, 15, false, 'KR')!,
    trungThu: lunarToSolar(year, 8, 15, false, 'VN')!,
  };
}

export const festivalRows = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => festivalRow(from + i));

export const rowDiffers = (r: FestivalRow) => r.seollal !== r.tet || r.chuseok !== r.trungThu;

export interface HolidayEntry { jdn: number; key: HolidayKey }

/** All holidays of a Gregorian year for one country, in date order. */
export function yearHolidays(year: number, basis: CalendarCountry): HolidayEntry[] {
  const out: HolidayEntry[] = [];
  const start = jdnFromYmd(year, 1, 1);
  const end = jdnFromYmd(year + 1, 1, 1);
  for (let j = start; j < end; j++) {
    for (const key of holidaysOf(dayInfo(j, basis), basis)) out.push({ jdn: j, key });
  }
  return out;
}
