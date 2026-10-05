// Folk "bad year" checks by birth year: 삼재 / Tam Tai, Kim Lâu, Hoang Ốc, 아홉수, 본명년 / năm tuổi, 충 / xung Thái Tuế.
import { cycleBranch, isClash, mod, yearCycle } from './ganzhi';
import { Samjae, samjaeOf } from './yearly';

/** Remainder of the folk age divided by 9 that marks Kim Lâu: 1 Thân, 3 Thê, 6 Tử, 8 Lục súc. */
export type KimLau = 0 | 1 | 3 | 6 | 8;
/** 0 Nhất Cát … 5 Lục Hoang Ốc */
export type HoangOc = 0 | 1 | 2 | 3 | 4 | 5;
export const HOANG_OC_BAD: HoangOc[] = [2, 4, 5];

/** Age counted the folk way: 1 in the birth year, +1 every lunar new year. */
export const countAge = (birthYear: number, year: number) => year - birthYear + 1;

export function kimLauOf(age: number): KimLau {
  const r = age % 9;
  return r === 1 || r === 3 || r === 6 || r === 8 ? r : 0;
}

/**
 * Hoang Ốc: 10 starts at Nhất Cát, 20 at Nhì Nghi, … 60 at Lục Hoang Ốc, 70 back at Nhất Cát;
 * each extra year steps to the next palace. Not counted before age 10.
 */
export function hoangOcOf(age: number): HoangOc | null {
  if (age < 10) return null;
  const tens = Math.floor(age / 10);
  return mod(tens - 1 + (age % 10), 6) as HoangOc;
}

/** 아홉수: folk ages ending in 9 */
export const isNine = (age: number) => age % 10 === 9;

export interface YearCheck {
  year: number;
  cycle: number;
  age: number;
  samjae: Samjae;
  kimLau: KimLau;
  hoangOc: HoangOc | null;
  nine: boolean;
  /** year branch equals the birth branch (본명년 / năm tuổi) */
  own: boolean;
  /** year branch clashes the birth branch (충 / xung Thái Tuế) */
  clash: boolean;
}

export function checkYear(birthYear: number, year: number): YearCheck {
  const zodiac = cycleBranch(yearCycle(birthYear));
  const cycle = yearCycle(year);
  const yb = cycleBranch(cycle);
  const age = countAge(birthYear, year);
  return {
    year,
    cycle,
    age,
    samjae: samjaeOf(yb, zodiac),
    kimLau: kimLauOf(age),
    hoangOc: hoangOcOf(age),
    nine: isNine(age),
    own: yb === zodiac,
    clash: isClash(yb, zodiac),
  };
}

export type Custom = 'KR' | 'VN';

/** Good year for a wedding by each country's custom. */
export function weddingOk(c: YearCheck, custom: Custom): boolean {
  return custom === 'VN' ? c.kimLau === 0 : !c.nine && c.samjae === 0;
}

/** Good year to build or buy a house (VN) / move (KR) by each country's custom. */
export function houseOk(c: YearCheck, custom: Custom): boolean {
  if (custom === 'KR') return c.samjae === 0;
  return c.kimLau === 0 && c.samjae === 0 && (c.hoangOc === null || !HOANG_OC_BAD.includes(c.hoangOc));
}

/** Years in [from, to] when a zodiac's three-harmony group has 삼재 (first year of each run). */
export function samjaeRuns(zodiac: number, from: number, to: number): number[] {
  const out: number[] = [];
  for (let y = from; y <= to; y++) {
    if (samjaeOf(cycleBranch(yearCycle(y)), zodiac) === 1) out.push(y);
  }
  return out;
}
