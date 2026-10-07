import { describe, expect, it } from 'vitest';
import { KO_CHARS, KO_NAMES } from '../content/koNames';
import {
  fourGrids, hanVietOf, hanjaFor, koreanNameFlags, readVietName, strokesOf, suggestKoreanNames, syllableSimilarity, vietnameseNameCheck,
} from './naming';

describe('name data', () => {
  it('every name hanja is described, has strokes and matches the Hangul', () => {
    const names = new Set<string>();
    for (const n of KO_NAMES) {
      expect(names.has(n.name)).toBe(false);
      names.add(n.name);
      for (const h of n.hanja) {
        expect([...h]).toHaveLength(2);
        [...h].forEach((c, i) => {
          expect(KO_CHARS[c], c).toBeTruthy();
          expect(strokesOf(c), c).toBeGreaterThan(0);
          expect(hanjaFor([...n.name][i]).map((x) => x.h), `${n.name} ${c}`).toContain(c);
        });
      }
    }
  });
  it('uses 원획 stroke counts', () => {
    expect(strokesOf('瑞')).toBe(14); // 玉 radical counts 5
    expect(strokesOf('浩')).toBe(11); // 氵 counts 4
    expect(strokesOf('鄭')).toBe(19); // 阝(邑) counts 7
    expect(strokesOf('金')).toBe(8);
  });
});

describe('suggestions', () => {
  it('reads Vietnamese names', () => {
    expect(readVietName('Nguyễn Thị Thu Hà')).toMatchObject({ surnameKo: '완', given: ['Thu', 'Hà'], gender: 'f' });
    expect(readVietName('Lê Văn Hùng')).toMatchObject({ surnameKo: '여', given: ['Hùng'], gender: 'm' });
  });
  it('links Minh Anh to a 민 name by sound', () => {
    const top = suggestKoreanNames(readVietName('Nguyễn Minh Anh')!, 'f').map((s) => s.name.name);
    expect(top.some((n) => n.startsWith('민'))).toBe(true);
  });
  it('prefers shared hanja (Hà → 河)', () => {
    const s = suggestKoreanNames(readVietName('Trần Thu Hà')!, 'f');
    expect(s.some((x) => x.hanja.includes('河'))).toBe(true);
  });
  it('respects gender and avoids flagged names', () => {
    const s = suggestKoreanNames(readVietName('Lê Văn Hùng')!, 'm', 10);
    expect(s.every((x) => x.name.g !== 'f')).toBe(true);
    expect(s.every((x) => !x.flags.some((f) => f.level === 'strong'))).toBe(true);
  });
});

describe('sound checks', () => {
  it('flags Korean syllables that sound odd in Vietnamese', () => {
    expect(koreanNameFlags('서준').map((f) => f.like)).toEqual(['giun']);
    expect(koreanNameFlags('하은')).toEqual([]);
  });
  it('flags Vietnamese names that sound odd to Koreans', () => {
    const r = vietnameseNameCheck('Trần Ngọc Bích');
    expect(r.flags.map((f) => f.part)).toEqual(['Bích']);
    expect(r.hard.map((h) => h.part)).toContain('Ngọc');
    expect(vietnameseNameCheck('Lê Hoa').flags).toEqual([]);
  });
  it('scores similar syllables', () => {
    expect(syllableSimilarity('민', '민')).toBe(5);
    expect(syllableSimilarity('란', '린')).toBeGreaterThan(syllableSimilarity('란', '호'));
  });
});

describe('hanja', () => {
  it('reads Hán-Việt and computes the four grids', () => {
    expect(hanVietOf('金瑞俊')).toBe('Kim Thụy Tuấn');
    const g = fourGrids(8, 14, 9);
    expect(g.map((x) => x.n)).toEqual([23, 22, 17, 31]);
    expect(g.map((x) => x.lucky)).toEqual([true, false, true, true]);
  });
});
