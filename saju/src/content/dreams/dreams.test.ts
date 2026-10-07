import { describe, expect, it } from 'vitest';
import { DREAMS, POPULAR, dreamBySlug, searchDreams } from './index';

describe('dream content', () => {
  it('has 150 unique, complete entries', () => {
    expect(DREAMS).toHaveLength(150);
    expect(new Set(DREAMS.map((d) => d.slug)).size).toBe(150);
    for (const d of DREAMS) {
      for (const l of ['ko', 'vi'] as const) {
        expect(d[l].summary.length).toBeGreaterThan(20);
        expect(d[l].korea.length).toBeGreaterThan(40);
        expect(d[l].vietnam.length).toBeGreaterThan(20);
        expect(d[l].cases.length).toBe(4);
      }
    }
    POPULAR.forEach((s) => expect(dreamBySlug(s)).toBeTruthy());
  });
  it('searches both languages', () => {
    expect(searchDreams('돼지꿈').map((d) => d.slug)).toContain('pig');
    expect(searchDreams('rang').map((d) => d.slug)).toContain('teeth');
    expect(searchDreams('nằm mơ thấy rắn').map((d) => d.slug)).toContain('snake');
    expect(searchDreams('이빨 빠지는 꿈').map((d) => d.slug)).toContain('teeth');
    expect(searchDreams('ma').map((d) => d.slug)).toEqual(['ghost']);
    expect(searchDreams('cầu vồng').map((d) => d.slug)).toEqual(['rainbow']);
    expect(searchDreams('귀신')[0].slug).toBe('ghost');
    expect(searchDreams('코끼리')[0].slug).toBe('elephant');
    expect(searchDreams('voi')[0].slug).toBe('elephant');
    expect(searchDreams('제비').map((d) => d.slug)).toEqual(['swallow']);
    expect(searchDreams('dơi')[0].slug).toBe('bat');
    expect(searchDreams('오줌')[0].slug).toBe('urine');
    expect(searchDreams('xác chết')[0].slug).toBe('corpse');
    expect(searchDreams('기린')[0].slug).toBe('giraffe');
    expect(searchDreams('mây').map((d) => d.slug)).toEqual(['cloud']);
  });
});
