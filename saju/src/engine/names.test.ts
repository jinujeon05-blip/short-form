import { describe, expect, it } from 'vitest';
import { initialLaw, koReading, parseKorean, parseVietnamese, romanizeName, soundElement } from './names';

describe('names', () => {
  it('applies 두음법칙', () => {
    expect(initialLaw('려')).toBe('여');
    expect(initialLaw('리')).toBe('이');
    expect(initialLaw('림')).toBe('임');
    expect(initialLaw('라')).toBe('나');
    expect(initialLaw('령')).toBe('영');
    expect(initialLaw('녀')).toBe('여');
    expect(initialLaw('명')).toBe('명');
  });

  it('converts a Vietnamese name to Korean', () => {
    const s = parseVietnamese('Nguyễn Minh Anh');
    expect(s.map((x) => x.candidates[0].h).join('')).toBe('阮明英');
    expect(s.map((x, i) => koReading(x.candidates[0], i)).join('')).toBe('완명영');
  });

  it('handles names typed without diacritics and middle names', () => {
    const s = parseVietnamese('le thi thu ha');
    expect(s[0].candidates[0].h).toBe('黎');
    expect(koReading(s[0].candidates[0], 0)).toBe('여');
    expect(s[1].middle).toBe(true);
    expect(s[2].candidates.map((c) => c.h)).toContain('秋');
    expect(s[3].candidates.map((c) => c.h)).toEqual(expect.arrayContaining(['河', '霞']));
  });

  it('converts a Korean name to Vietnamese', () => {
    const s = parseKorean('김민준');
    expect(s[0].candidates[0].vi).toBe('Kim');
    expect(s[1].candidates.map((c) => c.vi)).toContain('Mẫn');
    expect(s[2].candidates.map((c) => c.vi)).toContain('Tuấn');
    const lee = parseKorean('이서연');
    expect(lee[0].candidates[0].h).toBe('李');
    expect(lee.map((x) => x.candidates[0].vi).join(' ')).toBe('Lý Thụy Nghiên');
    expect(parseKorean('남궁민')[0].candidates[0].vi).toBe('Nam Cung');
    const has = (name: string, i: number, h: string) => expect(parseKorean(name)[i].candidates.map((c) => c.h)).toContain(h);
    has('전진우', 1, '津');
    has('전현욱', 2, '昱');
    has('전현준', 1, '泫');
    expect(parseKorean('전현욱')[2].candidates[0].vi).toBe('Húc');
  });

  it('romanizes and finds sound elements', () => {
    expect(romanizeName('김', ['민', '준'])).toBe('Kim Minjun');
    expect(romanizeName('완', ['명', '영'])).toBe('Wan Myeongyeong');
    expect(soundElement('김')).toBe(0);
    expect(soundElement('명')).toBe(4);
    expect(soundElement('영')).toBe(2);
    expect(soundElement('서')).toBe(3);
    expect(soundElement('란')).toBe(1);
  });
});
