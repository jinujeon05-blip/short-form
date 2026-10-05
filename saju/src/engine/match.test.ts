import { describe, expect, it } from 'vitest';
import { yearCycle } from './ganzhi';
import { matchCharts, nayinElement, stemRelation } from './match';
import { calculateSaju } from './pillars';
import { getPlace } from './timezone';
import { jdnFromYmd } from './astro';

describe('match', () => {
  it('nạp âm of known years', () => {
    expect(nayinElement(yearCycle(1984))).toBe(3); // Hải Trung Kim
    expect(nayinElement(yearCycle(1990))).toBe(2); // Lộ Bàng Thổ
    expect(nayinElement(yearCycle(1986))).toBe(1); // Lư Trung Hỏa
    expect(nayinElement(yearCycle(1992))).toBe(3); // Kiếm Phong Kim
    expect(nayinElement(yearCycle(1996))).toBe(4); // Giản Hạ Thủy
    expect(nayinElement(yearCycle(2000))).toBe(3); // Bạch Lạp Kim
  });

  it('stem combinations', () => {
    expect(stemRelation(0, 5)).toBe('combine'); // 甲己
    expect(stemRelation(3, 8)).toBe('combine'); // 丁壬
    expect(stemRelation(0, 2)).toBe('generate'); // 木→火
    expect(stemRelation(0, 4)).toBe('control'); // 木剋土
    expect(stemRelation(0, 1)).toBe('same');
  });

  it('uses the lunar new year for the zodiac and gives a bounded score', () => {
    // 1990-01-20 is before Tết 1990 (Jan 27) → Kỷ Tỵ (snake)
    const a = calculateSaju({ calendar: 'solar', year: 1990, month: 1, day: 20, hour: null, minute: 0, gender: 'M', place: getPlace('seoul') });
    const b = calculateSaju({ calendar: 'solar', year: 1995, month: 8, day: 20, hour: 9, minute: 0, gender: 'F', place: getPlace('hanoi') });
    const r = matchCharts(a, b, jdnFromYmd(2026, 10, 5), 'VN');
    expect(r.zodiacA).toBe(5);
    expect(r.zodiacB).toBe(11);
    expect(r.zodiac.type).toBe('clash'); // 巳亥沖
    expect(r.score).toBeGreaterThanOrEqual(35);
    expect(r.score).toBeLessThanOrEqual(99);
    expect(r.goodDays.length).toBe(3);
  });
});
