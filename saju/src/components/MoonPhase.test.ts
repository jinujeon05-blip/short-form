import { describe, expect, it } from 'vitest';
import { litPath, phaseName } from './MoonPhase';

describe('moon phase', () => {
  it('names the eight phases', () => {
    expect(phaseName(0, 'ko')).toBe('삭(새달)');
    expect(phaseName(0.25, 'ko')).toBe('상현달');
    expect(phaseName(0.5, 'ko')).toBe('보름달');
    expect(phaseName(0.75, 'ko')).toBe('하현달');
    expect(phaseName(0.97, 'ko')).toBe('삭(새달)');
    expect(phaseName(0.5, 'vi')).toBe('Trăng rằm');
  });
  it('lights the right side while waxing and the left while waning', () => {
    expect(litPath(0.1)).toContain('A46 46 0 0 1 50 96'); // right limb
    expect(litPath(0.9)).toContain('A46 46 0 0 0 50 96'); // left limb
    expect(litPath(0.5)).toContain('A46.00 46 0 0 1 50 4'); // full: terminator is the left limb
  });
});
