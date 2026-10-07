// 기일·제사 / ngày giỗ: the lunar death anniversary mapped onto solar dates.
import { CalendarCountry, lunarToSolar, solarToLunar } from './lunar';
import { ymdFromJdn, weekdayFromJdn } from './astro';

export interface MemorialRow {
  /** Lunar year of this anniversary */
  year: number;
  jdn: number;
  ymd: { y: number; m: number; d: number };
  weekday: number;
  /** Lunar day actually used (29 when the month has no 30th that year) */
  day: number;
  /** 1 = first anniversary (소상 / giỗ đầu) … when the death year is known */
  nth: number | null;
  /** The same anniversary under the other country's lunar calendar, when it falls on a different solar day */
  otherJdn: number | null;
}

/**
 * Anniversaries of lunar month/day for `count` lunar years from `fromYear`.
 * Customs used in both countries: a leap-month death is remembered in the regular month of the same number,
 * and a 30th that does not exist in a given year moves to the 29th (그믐 / ngày cuối tháng).
 */
export function memorialDates(
  month: number, day: number, country: CalendarCountry, fromYear: number, count: number, deathYear: number | null,
): MemorialRow[] {
  const other: CalendarCountry = country === 'KR' ? 'VN' : 'KR';
  const at = (y: number, c: CalendarCountry) => {
    const exact = lunarToSolar(y, month, day, false, c);
    return exact !== null ? { jdn: exact, day } : { jdn: lunarToSolar(y, month, day - 1, false, c)!, day: day - 1 };
  };
  const rows: MemorialRow[] = [];
  for (let y = fromYear; y < fromYear + count; y++) {
    const { jdn, day: used } = at(y, country);
    const alt = at(y, other).jdn;
    rows.push({
      year: y,
      jdn,
      ymd: ymdFromJdn(jdn),
      weekday: weekdayFromJdn(jdn),
      day: used,
      nth: deathYear !== null && y > deathYear ? y - deathYear : null,
      otherJdn: alt !== jdn ? alt : null,
    });
  }
  return rows;
}

/** Lunar date of a solar date of death. */
export const lunarOfDeath = (jdn: number, country: CalendarCountry) => solarToLunar(jdn, country);

const pad = (n: number) => String(n).padStart(2, '0');
const icsDate = (jdn: number) => { const { y, m, d } = ymdFromJdn(jdn); return `${y}${pad(m)}${pad(d)}`; };

/** iCalendar file with one all-day event per anniversary. */
export function memorialIcs(rows: MemorialRow[], title: (r: MemorialRow) => string, description: string): string {
  const esc = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const events = rows.map((r) => [
    'BEGIN:VEVENT',
    `UID:myeongwol-${r.year}-${r.jdn}@myeongwol.net`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${icsDate(r.jdn)}`,
    `DTEND;VALUE=DATE:${icsDate(r.jdn + 1)}`,
    `SUMMARY:${esc(title(r))}`,
    `DESCRIPTION:${esc(description)}`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${esc(title(r))}`, 'TRIGGER:-P1D', 'END:VALARM',
    'END:VEVENT',
  ].join('\r\n'));
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Myeongwol//Memorial//KO', 'CALSCALE:GREGORIAN', ...events, 'END:VCALENDAR', ''].join('\r\n');
}
