import { describe, expect, it } from 'vitest';
import { jdnFromYmd } from './astro';
import { dailyDetail, dailyRanking, todayJdn } from './daily';

describe('daily zodiac fortune', () => {
  const jdn = jdnFromYmd(2026, 10, 5);
  it('ranks all 12 zodiacs best first', () => {
    const r = dailyRanking(jdn, 'KR');
    expect(r).toHaveLength(12);
    expect(new Set(r.map((f) => f.branch)).size).toBe(12);
    for (let i = 1; i < 12; i++) expect(r[i - 1].stars).toBeGreaterThanOrEqual(r[i].stars);
  });
  it('rat: lucky hours are 丑 (six harmony) and 申/辰 (three harmony), caution hour 午', () => {
    const d = dailyDetail(jdn, 0, 'KR');
    expect(d.luckyHours).toEqual([1, 4, 8]);
    expect(d.cautionHour).toBe(6);
    expect(d.week).toHaveLength(7);
    expect(d.birthLines.map((l) => l.year)).toEqual([1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020]);
  });
  it('is deterministic for a day', () => {
    expect(dailyDetail(jdn, 5, 'VN')).toEqual(dailyDetail(jdn, 5, 'VN'));
  });
  it('today differs by timezone just after midnight in Korea', () => {
    const ms = Date.UTC(2026, 9, 4, 15, 30); // 00:30 KST, 22:30 Vietnam
    expect(todayJdn('KR', ms) - todayJdn('VN', ms)).toBe(1);
  });
});
