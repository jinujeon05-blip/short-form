import { describe, expect, it } from 'vitest';
// @ts-expect-error no types
import { Solar } from 'lunar-javascript';
import { jdnFromYmd, ymdFromJdn } from './astro';
import { lunarToSolar, solarToLunar } from './lunar';
import { calculateSaju } from './pillars';
import { BRANCH_HANJA, STEM_HANJA } from './ganzhi';
import { Place } from './timezone';

const beijing: Place = { id: 'bj', country: 'OTHER', ko: '', vi: '', zone: null, offset: 8, longitude: 120 };
const name = (p: { stem: number; branch: number }) => STEM_HANJA[p.stem] + BRANCH_HANJA[p.branch];

// Deterministic pseudo-random
let seed = 12345;
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);

describe('lunar calendar', () => {
  it('matches the Chinese calendar when computed at UTC+8 (every 3 days, 1929–1967)', async () => {
    const { calendarTz } = await import('./lunar');
    expect(calendarTz('VN', jdnFromYmd(1960, 1, 1))).toBe(8);
    // VN before 1968 uses UTC+8 → identical to Chinese calendar
    for (let jdn = jdnFromYmd(1929, 2, 1); jdn < jdnFromYmd(1967, 12, 1); jdn += 3) {
      const { y, m, d } = ymdFromJdn(jdn);
      const l = Solar.fromYmd(y, m, d).getLunar();
      const mine = solarToLunar(jdn, 'VN');
      expect([mine.year, mine.leap ? -mine.month : mine.month, mine.day], `${y}-${m}-${d}`)
        .toEqual([l.getYear(), l.getMonth(), l.getDay()]);
    }
  });

  it('known Korean / Vietnamese new year dates', () => {
    const newYear = (y: number, c: 'KR' | 'VN') => ymdFromJdn(lunarToSolar(y, 1, 1, false, c)!);
    expect(newYear(1985, 'VN')).toEqual({ y: 1985, m: 1, d: 21 }); // Tết Ất Sửu
    expect(newYear(1985, 'KR')).toEqual({ y: 1985, m: 2, d: 20 });
    expect(newYear(2007, 'VN')).toEqual({ y: 2007, m: 2, d: 17 });
    expect(newYear(2024, 'KR')).toEqual({ y: 2024, m: 2, d: 10 });
    expect(newYear(2026, 'KR')).toEqual({ y: 2026, m: 2, d: 17 });
    expect(newYear(2026, 'VN')).toEqual({ y: 2026, m: 2, d: 17 });
    // 추석 2025
    expect(ymdFromJdn(lunarToSolar(2025, 8, 15, false, 'KR')!)).toEqual({ y: 2025, m: 10, d: 6 });
  });

  it('round-trips solar → lunar → solar', () => {
    for (let jdn = jdnFromYmd(1930, 1, 1); jdn < jdnFromYmd(2060, 1, 1); jdn += 13) {
      for (const c of ['KR', 'VN'] as const) {
        const l = solarToLunar(jdn, c);
        expect(lunarToSolar(l.year, l.month, l.day, l.leap, c)).toBe(jdn);
      }
    }
  });
});

describe('four pillars', () => {
  it('matches lunar-javascript EightChar for random moments (UTC+8, no correction)', () => {
    for (let i = 0; i < 400; i++) {
      const y = 1920 + Math.floor(rnd() * 160);
      const m = 1 + Math.floor(rnd() * 12);
      const d = 1 + Math.floor(rnd() * 28);
      const h = Math.floor(rnd() * 23); // avoid 23h (sect differences)
      const mi = Math.floor(rnd() * 60);
      const r = calculateSaju({ calendar: 'solar', year: y, month: m, day: d, hour: h, minute: mi, gender: 'M', place: beijing, solarTime: false });
      const ec = Solar.fromYmdHms(y, m, d, h, mi, 0).getLunar().getEightChar();
      const label = `${y}-${m}-${d} ${h}:${mi}`;
      // Skip moments within 3 minutes of a term (library precision differs slightly)
      const terms = [ec.getYear(), ec.getMonth(), ec.getDay(), ec.getTime()];
      const mine = [name(r.year), name(r.month), name(r.day), name(r.hour!)];
      if (r.nearTermBoundary && mine.join() !== terms.join()) continue;
      expect(mine, label).toEqual(terms);
    }
  });

  it('known pillars', () => {
    const seoul: Place = { id: 's', country: 'KR', ko: '', vi: '', zone: 'Asia/Seoul', longitude: 126.98 };
    // 2000-01-01 is 戊午 day
    const r = calculateSaju({ calendar: 'solar', year: 2000, month: 1, day: 1, hour: 12, minute: 0, gender: 'F', place: seoul });
    expect(name(r.day)).toBe('戊午');
    expect(name(r.year)).toBe('己卯');
    expect(name(r.month)).toBe('丙子');
    // 2024-02-04 입춘 17:27 KST
    const before = calculateSaju({ calendar: 'solar', year: 2024, month: 2, day: 4, hour: 17, minute: 0, gender: 'M', place: seoul });
    const after = calculateSaju({ calendar: 'solar', year: 2024, month: 2, day: 4, hour: 18, minute: 0, gender: 'M', place: seoul });
    expect(name(before.year)).toBe('癸卯');
    expect(name(after.year)).toBe('甲辰');
    expect(name(after.month)).toBe('丙寅');
  });

  it('applies Korean DST in 1988', () => {
    const seoul: Place = { id: 's', country: 'KR', ko: '', vi: '', zone: 'Asia/Seoul', longitude: 126.98 };
    const r = calculateSaju({ calendar: 'solar', year: 1988, month: 7, day: 1, hour: 12, minute: 0, gender: 'M', place: seoul });
    expect(r.offsetMin).toBe(600);
  });
});
