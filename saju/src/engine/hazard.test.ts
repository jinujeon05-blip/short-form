import { describe, expect, it } from 'vitest';
import { checkYear, hoangOcOf, houseOk, kimLauOf, samjaeRuns, weddingOk } from './hazard';

describe('Kim Lâu', () => {
  it('flags folk ages with remainder 1, 3, 6, 8 by 9', () => {
    expect([19, 21, 24, 26, 28, 30, 33, 35].map(kimLauOf)).toEqual([1, 3, 6, 8, 1, 3, 6, 8]);
    expect([20, 22, 23, 25, 27, 29].map(kimLauOf)).toEqual([0, 0, 0, 0, 0, 0]);
  });
});

describe('Hoang Ốc', () => {
  it('starts each decade at its palace and steps one per year', () => {
    expect(hoangOcOf(9)).toBeNull();
    expect(hoangOcOf(10)).toBe(0); // Nhất Cát
    expect(hoangOcOf(12)).toBe(2); // Tam Địa Sát
    expect(hoangOcOf(15)).toBe(5); // Lục Hoang Ốc
    expect(hoangOcOf(20)).toBe(1); // Nhì Nghi
    expect(hoangOcOf(30)).toBe(2);
    expect(hoangOcOf(40)).toBe(3); // Tứ Tấn Tài
    expect(hoangOcOf(60)).toBe(5);
    expect(hoangOcOf(70)).toBe(0);
  });
});

describe('checkYear', () => {
  it('1995 (Ất Hợi) in 2025: Tam Tai first year, age 31', () => {
    const c = checkYear(1995, 2025);
    expect(c.age).toBe(31);
    expect(c.samjae).toBe(1);
    expect(c.kimLau).toBe(0);
    expect(c.hoangOc).toBe(3);
    expect(weddingOk(c, 'VN')).toBe(true);
    expect(houseOk(c, 'VN')).toBe(false);
  });
  it('1990 (horse) in 2026 is its own year; 2020 is a clash year', () => {
    expect(checkYear(1990, 2026).own).toBe(true);
    expect(checkYear(1990, 2020).clash).toBe(true);
  });
  it('아홉수 blocks a Korean wedding', () => {
    const c = checkYear(1998, 2026); // count age 29
    expect(c.nine).toBe(true);
    expect(weddingOk(c, 'KR')).toBe(false);
  });
  it('samjae runs for the rat group start in 寅 years', () => {
    expect(samjaeRuns(0, 2020, 2040)).toEqual([2022, 2034]);
    expect(samjaeRuns(11, 2020, 2040)).toEqual([2025, 2037]);
  });
});
