import { describe, expect, it } from 'vitest';
import { ymdFromJdn } from './astro';
import { festivalRow, festivalRows, rowDiffers, yearHolidays } from './festivals';

const ymd = (j: number) => ymdFromJdn(j);

describe('Korean vs Vietnamese festivals', () => {
  it('2027: Tết a day before 설날', () => {
    const r = festivalRow(2027);
    expect(ymd(r.seollal)).toEqual({ y: 2027, m: 2, d: 7 });
    expect(ymd(r.tet)).toEqual({ y: 2027, m: 2, d: 6 });
  });
  it('1985: Vietnam celebrated Tết a month earlier', () => {
    const r = festivalRow(1985);
    expect(ymd(r.tet)).toEqual({ y: 1985, m: 1, d: 21 });
    expect(ymd(r.seollal)).toEqual({ y: 1985, m: 2, d: 20 });
  });
  it('2007 differs, 2026 matches', () => {
    expect(rowDiffers(festivalRow(2007))).toBe(true);
    expect(rowDiffers(festivalRow(2026))).toBe(false);
  });
  it('lists holidays in date order', () => {
    const kr = yearHolidays(2027, 'KR');
    expect(kr[0].key).toBe('newYear');
    expect(kr.some((h) => h.key === 'seollal')).toBe(true);
    expect(festivalRows(2020, 2040)).toHaveLength(21);
  });
});
