import { describe, expect, it } from 'vitest';
import { BRANCH_HANJA, STEM_HANJA, cycleBranch, cycleStem } from './ganzhi';
import { samjaeOf, yearFortune, yearRanking } from './yearly';

const name = (c: number) => STEM_HANJA[cycleStem(c)] + BRANCH_HANJA[cycleBranch(c)];

describe('yearly fortune', () => {
  it('삼재 / Tam Tai groups', () => {
    // 2025 巳, 2026 午, 2027 未 → pig, rabbit, goat (들·눌·날)
    expect([11, 3, 7].map((z) => samjaeOf(5, z))).toEqual([1, 1, 1]);
    expect([11, 3, 7].map((z) => samjaeOf(7, z))).toEqual([3, 3, 3]);
    expect(samjaeOf(7, 0)).toBe(0);
    // 2028 申 → tiger, horse, dog begin
    expect([2, 6, 10].map((z) => samjaeOf(8, z))).toEqual([1, 1, 1]);
    // 2022 寅 → monkey, rat, dragon begin
    expect([8, 0, 4].map((z) => samjaeOf(2, z))).toEqual([1, 1, 1]);
  });

  it('2027 丁未 relations and months', () => {
    const horse = yearFortune(2027, 6);
    expect(horse.relation).toBe('sixHarmony');
    expect(yearFortune(2027, 1).relation).toBe('clash');
    expect(yearFortune(2027, 0).relation).toBe('harm');
    expect(yearFortune(2027, 7).relation).toBe('same');
    expect(name(horse.yearCycle)).toBe('丁未');
    expect(name(horse.months[0].cycle)).toBe('壬寅');
    expect(name(horse.months[11].cycle)).toBe('癸丑');
    expect(new Date(horse.months[0].startMs + 9 * 3600e3).toISOString().slice(0, 10)).toBe('2027-02-04');
    expect(horse.birthYears.map((r) => r.year)).toContain(1990);
    const ranking = yearRanking(2027);
    expect(ranking[0].zodiac).toBe(6);
    expect(ranking).toHaveLength(12);
  });
});
