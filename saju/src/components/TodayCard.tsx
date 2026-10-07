import { Emoji } from './Emoji';
import { useEffect, useState } from 'react';
import { DayInfo, holidaysOf } from '../engine/almanac';
import { CalendarCountry } from '../engine/lunar';
import { cycleBranch, yearCycle } from '../engine/ganzhi';
import { TODAY } from '../content/today';
import { useI18n } from '../i18n';
import { Dict } from '../i18n/ko';
import { Lang } from '../i18n';
import { GanzhiChip, cycleName, hourRange, lunarText } from './common';
import { ShareImageButton } from './ShareImage';
import { drawTodayCard } from './cards';

/** Branch index of the current two-hour period (子 = 23:00–01:00). */
const currentBranch = (date: Date) => Math.floor(((date.getHours() + 1) % 24) / 2);

/** Notable facts for today, most important first. */
export function todayNotes(info: DayInfo, basis: CalendarCountry, t: Dict, lang: Lang): string[] {
  const x = TODAY[lang];
  const notes: string[] = holidaysOf(info, basis).map((h) => t.holidays[h]);
  if (info.term !== null) notes.push(`${t.day.term}: ${t.terms[info.term]}`);
  if (basis === 'KR' && info.sonEomneun) notes.push(t.day.sonEomneun);
  if (basis === 'VN' && info.tamNuong) notes.push(t.day.tamNuong);
  if (basis === 'VN' && info.nguyetKy) notes.push(t.day.nguyetKy);
  notes.push(x.starLine(info.starGood, t.stars[info.star], t.officers[info.officer]));
  return notes;
}

export function TodayCard({ info, basis }: { info: DayInfo; basis: CalendarCountry }) {
  const { t, lang } = useI18n();
  const x = TODAY[lang];
  // The current hour is only known in the browser; render without it on the server.
  const [nowBranch, setNowBranch] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNowBranch(currentBranch(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const advice = t.officerAdvice[info.officer];
  const notes = todayNotes(info, basis, t, lang);
  const { y, m, d } = info.ymd;
  const kr = info.lunar.KR;
  const vn = info.lunar.VN;
  const differ = kr.day !== vn.day || kr.month !== vn.month || kr.leap !== vn.leap;
  const folkYear = yearCycle(info.lunar[basis].year);
  const zodiac = cycleBranch(folkYear);
  const dateText = lang === 'vi' ? `${t.calendar.weekdays[info.weekday]}, ${d}/${m}/${y}` : `${y}년 ${m}월 ${d}일 (${t.calendar.weekdays[info.weekday]})`;

  return (
    <section className={`today-card level-${info.level}`} aria-label={x.title}>
      <div className="today-head">
        <div>
          <p className="eyebrow left">{x.title}</p>
          <h2 className="today-date">{dateText}</h2>
        </div>
        <div className="level-badge" title={t.day.levels[info.level]}>
          <span className="level-text">{t.day.levels[info.level]}</span>
        </div>
      </div>

      <div className="today-facts">
        <div className={differ ? 'diff' : ''}>
          <span className="k">🇰🇷 {t.today.lunarKR}</span>
          <b>{lunarText(kr, t, lang)}</b>
        </div>
        <div className={differ ? 'diff' : ''}>
          <span className="k">🇻🇳 {t.today.lunarVN}</span>
          <b>{lunarText(vn, t, lang)}</b>
        </div>
        <div>
          <span className="k">{t.today.dayPillar}</span>
          <b><GanzhiChip cycle={info.dayCycle} /> <span className="small">{cycleName(info.dayCycle, t)}</span></b>
        </div>
        <div>
          <span className="k">{lang === 'vi' ? 'Năm' : '띠'}</span>
          <b><Emoji e={t.animalEmoji[zodiac]} /> {t.animals[zodiac]} <span className="small muted">{cycleName(folkYear, t)}</span></b>
        </div>
      </div>
      {differ && <p className="today-differ gold small">{t.today.differ}</p>}

      <p className="today-verdict">{x.verdict[info.level]}</p>
      <ul className="today-lines">
        <li><span className="tag tag-good">{x.good}</span> {advice.good}</li>
        <li><span className="tag tag-bad">{x.avoid}</span> {advice.avoid}</li>
        <li><span className="tag">{x.note}</span> {notes[0]}</li>
      </ul>

      <h3 className="today-sub">{x.timeline}</h3>
      <ol className="hour-line" aria-label={x.timeline}>
        {Array.from({ length: 12 }, (_, b) => {
          const good = info.goodHours.includes(b);
          return (
            <li key={b} className={`${good ? 'good' : ''} ${nowBranch === b ? 'now' : ''}`} title={good ? x.goodHour : undefined}>
              <span className="hl-name">{t.hourLabel(b)}</span>
              <span className="hl-time">{hourRange(b)}</span>
              {nowBranch === b && <span className="hl-now">{x.now}</span>}
            </li>
          );
        })}
      </ol>
      <p className="muted small">{x.timelineDesc}</p>

      <div className="result-actions">
        <ShareImageButton
          filename={`myeongwol-today-${y}-${m}-${d}.png`}
          draw={(ctx) => drawTodayCard(ctx, {
            dateText,
            lunarKR: `${t.today.lunarKR} ${lunarText(kr, t, lang)}`,
            lunarVN: `${t.today.lunarVN} ${lunarText(vn, t, lang)}`,
            pillar: `${t.today.dayPillar} ${cycleName(info.dayCycle, t)}`,
            dayCycle: info.dayCycle,
            level: t.day.levels[info.level],
            verdict: x.verdict[info.level],
            good: `${x.good}: ${advice.good}`,
            avoid: `${x.avoid}: ${advice.avoid}`,
            hours: `${x.goodHour}: ${info.goodHours.map((b) => `${t.hourLabel(b)} ${hourRange(b)}`).join(' · ')}`,
            title: x.cardTitle,
          }, t, lang)}
        />
      </div>
    </section>
  );
}
