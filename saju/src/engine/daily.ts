// Daily zodiac fortune pages: today's fortune per zodiac with lucky hours, a 7-day trend and birth-year lines.
import { localJdn } from './astro';
import { DayInfo, dayInfo } from './almanac';
import { cycleBranch, isClash, isSixHarmony, isThreeHarmony, yearCycle } from './ganzhi';
import { CalendarCountry } from './lunar';
import { ZodiacFortune, hash, zodiacFortune } from './fortune';

/** Today's JDN in Korea (UTC+9) or Vietnam (UTC+7). */
export const todayJdn = (basis: CalendarCountry, now = Date.now()) => localJdn(now, basis === 'VN' ? 7 : 9);

export interface BirthLine {
  year: number;
  /** 0 caution, 1 steady, 2 good */
  tone: 0 | 1 | 2;
  pick: number;
}

export interface DailyDetail {
  jdn: number;
  info: DayInfo;
  f: ZodiacFortune;
  /** Hour branches that harmonize with the zodiac (lucky hours) */
  luckyHours: number[];
  /** Hour branch that clashes with the zodiac */
  cautionHour: number;
  week: { jdn: number; stars: number }[];
  birthLines: BirthLine[];
}

export function dailyFortune(jdn: number, zodiac: number, basis: CalendarCountry): ZodiacFortune {
  return zodiacFortune(dayInfo(jdn, basis).dayCycle, jdn, zodiac);
}

export function dailyDetail(jdn: number, zodiac: number, basis: CalendarCountry): DailyDetail {
  const info = dayInfo(jdn, basis);
  const f = zodiacFortune(info.dayCycle, jdn, zodiac);
  const luckyHours = Array.from({ length: 12 }, (_, b) => b).filter((b) => isSixHarmony(b, zodiac) || isThreeHarmony(b, zodiac));
  const cautionHour = Array.from({ length: 12 }, (_, b) => b).find((b) => isClash(b, zodiac))!;
  const week = Array.from({ length: 7 }, (_, i) => ({ jdn: jdn + i, stars: dailyFortune(jdn + i, zodiac, basis).stars }));

  const year = info.ymd.y;
  const birthLines: BirthLine[] = [];
  for (let y = year - 90; y <= year; y++) {
    if (cycleBranch(yearCycle(y)) !== zodiac) continue;
    const h = hash(jdn, y, 7);
    const lean = f.stars + ((h % 3) - 1); // each birth year leans a little either way
    birthLines.push({ year: y, tone: lean >= 4 ? 2 : lean >= 3 ? 1 : 0, pick: h >>> 4 });
  }
  return { jdn, info, f, luckyHours, cautionHour, week, birthLines };
}

/** All 12 zodiacs for a day, best first. */
export function dailyRanking(jdn: number, basis: CalendarCountry): ZodiacFortune[] {
  return Array.from({ length: 12 }, (_, z) => dailyFortune(jdn, z, basis)).sort((a, b) => {
    const sa = a.stars * 100 + a.areas.love + a.areas.money + a.areas.work + a.areas.health;
    const sb = b.stars * 100 + b.areas.love + b.areas.money + b.areas.work + b.areas.health;
    return sb - sa || a.branch - b.branch;
  });
}
