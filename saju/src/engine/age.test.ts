import { describe, expect, it } from 'vitest';
import { jdnFromYmd, ymdFromJdn } from './astro';
import { calculateAge } from './age';

const J = jdnFromYmd;

describe('calculateAge', () => {
  const ref = J(2026, 10, 5);
  it('1990-05-03 on 2026-10-05', () => {
    const a = calculateAge(J(1990, 5, 3), ref, 'KR');
    expect([a.intl, a.extraMonths, a.extraDays]).toEqual([36, 5, 2]);
    expect(a.yearAge).toBe(36);
    expect(a.koreanAge).toBe(37);
    expect(a.tuoiMu).toBe(37);
    expect(a.zodiac).toBe(6); // horse
    expect(ymdFromJdn(a.nextBirthday)).toEqual({ y: 2027, m: 5, d: 3 });
  });
  it('born before Tết belongs to the previous lunar year', () => {
    const a = calculateAge(J(1990, 1, 20), ref, 'VN');
    expect(a.zodiac).toBe(5); // snake
    expect(a.tuoiMu).toBe(38);
    expect(a.koreanAge).toBe(37);
  });
  it('birthday not yet reached this year', () => {
    expect(calculateAge(J(2000, 12, 25), ref, 'KR').intl).toBe(25);
    expect(calculateAge(J(2000, 10, 5), ref, 'KR').intl).toBe(26);
  });
  it('school grades in Korea and Vietnam', () => {
    const a = calculateAge(J(2015, 5, 1), ref, 'KR');
    expect(a.schoolKR).toEqual({ stage: 'elem', grade: 5 });
    expect(a.schoolVN).toEqual({ stage: 'mid', grade: 1 });
    expect(calculateAge(J(2008, 3, 1), ref, 'KR').schoolKR).toEqual({ stage: 'high', grade: 3 });
  });
  it('next lunar birthday falls after the reference date', () => {
    const a = calculateAge(J(1990, 5, 3), ref, 'KR');
    expect(a.nextLunarBirthday!).toBeGreaterThan(ref);
    expect(a.nextLunarBirthday! - ref).toBeLessThanOrEqual(385);
  });
});
