import { describe, expect, it } from 'vitest';
import { memorialDates, memorialIcs, lunarOfDeath } from './memorial';
import { jdnFromYmd } from './astro';

describe('memorial dates', () => {
  it('maps the lunar date per country and notes when Korea and Vietnam differ', () => {
    const [r] = memorialDates(1, 1, 'KR', 2027, 1, null);
    expect(r.ymd).toEqual({ y: 2027, m: 2, d: 7 }); // Korean 설날 2027
    expect(r.otherJdn).toBe(jdnFromYmd(2027, 2, 6)); // Vietnamese Tết 2027
  });
  it('moves a missing 30th to the 29th', () => {
    const rows = memorialDates(12, 30, 'KR', 2025, 12, null);
    expect(rows.every((r) => r.jdn > 0)).toBe(true);
    expect(rows.some((r) => r.day === 29)).toBe(true);
    expect(rows.some((r) => r.day === 30)).toBe(true);
  });
  it('counts anniversaries from the lunar death year', () => {
    const rows = memorialDates(3, 15, 'VN', 2024, 3, 2024);
    expect(rows.map((r) => r.nth)).toEqual([null, 1, 2]);
  });
  it('reads the lunar date of a solar date of death', () => {
    expect(lunarOfDeath(jdnFromYmd(2027, 2, 7), 'KR')).toMatchObject({ year: 2027, month: 1, day: 1 });
  });
  it('writes an iCalendar file', () => {
    const ics = memorialIcs(memorialDates(3, 15, 'KR', 2026, 10, null), (r) => `기일 ${r.year}`, '음력 3월 15일');
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(10);
    expect(ics).toContain('DTSTART;VALUE=DATE:');
  });
});
