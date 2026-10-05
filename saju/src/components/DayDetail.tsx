import { DayInfo, holidaysOf, personalClash } from '../engine/almanac';
import { CalendarCountry } from '../engine/lunar';
import { useI18n } from '../i18n';
import { GanzhiChip, cycleName, hourRange, lunarText } from './common';

export function DayDetail({ info, basis, personalBranch, title }: {
  info: DayInfo;
  basis: CalendarCountry;
  personalBranch?: number | null;
  title?: string;
}) {
  const { t, lang } = useI18n();
  const advice = t.officerAdvice[info.officer];
  const holidays = holidaysOf(info, basis);
  const clash = personalClash(info, personalBranch);
  const { y, m, d } = info.ymd;
  const dateLabel = lang === 'vi' ? `${t.calendar.weekdays[info.weekday]}, ${d}/${m}/${y}` : `${y}. ${m}. ${d}. (${t.calendar.weekdays[info.weekday]})`;

  return (
    <article className={`day-card level-${info.level}`}>
      <header className="day-card-head">
        <div>
          <p className="muted small">{title ?? t.day.title}</p>
          <h3 className="day-date">{dateLabel}</h3>
          <p className="muted small">
            {t.today.lunarKR} {lunarText(info.lunar.KR, t, lang)} · {t.today.lunarVN} {lunarText(info.lunar.VN, t, lang)}
          </p>
        </div>
        <div className="level-badge" title={t.day.levels[info.level]}>
          <span className="level-text">{t.day.levels[info.level]}</span>
        </div>
      </header>

      <div className="day-grid">
        <div className="kv">
          <span className="k">{t.today.dayPillar}</span>
          <span className="v"><GanzhiChip cycle={info.dayCycle} /> <span className="muted">{cycleName(info.dayCycle, t)}</span></span>
        </div>
        <div className="kv">
          <span className="k">{t.day.star}</span>
          <span className={`v ${info.starGood ? 'good' : 'bad'}`}>
            {info.starGood ? t.day.good : t.day.bad} · {t.stars[info.star]}
          </span>
        </div>
        <div className="kv">
          <span className="k">{t.day.officer}</span>
          <span className="v">{t.officers[info.officer]}</span>
        </div>
        {info.term !== null && (
          <div className="kv">
            <span className="k">{t.day.term}</span>
            <span className="v gold">{t.terms[info.term]}</span>
          </div>
        )}
      </div>

      {holidays.length > 0 && (
        <p className="holiday-line">{holidays.map((h) => t.holidays[h]).join(' · ')}</p>
      )}

      <div className="advice">
        <div><span className="tag tag-good">{t.day.goodFor}</span> {advice.good}</div>
        <div><span className="tag tag-bad">{t.day.avoid}</span> {advice.avoid}</div>
      </div>

      <ul className="notes">
        {clash && <li className="note-bad">{t.day.clash}</li>}
        {basis === 'VN' && info.tamNuong && <li className="note-bad">{t.day.tamNuong}</li>}
        {basis === 'VN' && info.nguyetKy && <li className="note-bad">{t.day.nguyetKy}</li>}
        {info.sonEomneun && <li className="note-good">{t.day.sonEomneun}</li>}
      </ul>

      <div className="hours">
        <p className="k">{t.day.goodHours}</p>
        <div className="hour-list">
          {info.goodHours.map((b) => (
            <span key={b} className="hour">
              <b>{t.hourLabel(b)}</b> <span className="muted">{hourRange(b)}</span>
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
