import { ymdFromJdn, weekdayFromJdn } from '../engine/astro';
import { FestivalRow, festivalRows, rowDiffers, yearHolidays } from '../engine/festivals';
import { todayJdn } from '../engine/daily';
import { HOLIDAYS } from '../content/holidays';
import { Lang, useI18n } from '../i18n';
import { Dict } from '../i18n/ko';
import { Link } from '../router';
import { AdSlot } from '../components/AdSlot';

function dateText(jdn: number, t: Dict, lang: Lang, withYear = false) {
  const { y, m, d } = ymdFromJdn(jdn);
  const wd = t.calendar.weekdays[weekdayFromJdn(jdn)];
  if (lang === 'vi') return `${wd}, ${d}/${m}${withYear ? `/${y}` : ''}`;
  return `${withYear ? `${y}년 ` : ''}${m}월 ${d}일 (${wd})`;
}

/** Compact date for the table: 2.7(일) / 6/2 (T7) */
function Cell({ jdn, other }: { jdn: number; other: number }) {
  const { t, lang } = useI18n();
  const { m, d } = ymdFromJdn(jdn);
  const wd = t.calendar.weekdays[weekdayFromJdn(jdn)];
  return <td className={jdn !== other ? 'gold' : 'muted'}>{lang === 'vi' ? `${d}/${m} (${wd})` : `${m}.${d}(${wd})`}</td>;
}

export function HolidaysPage() {
  const { t, lang } = useI18n();
  const x = HOLIDAYS[lang];
  const today = todayJdn(lang === 'vi' ? 'VN' : 'KR');
  const thisYear = ymdFromJdn(today).y;
  const rows = festivalRows(2000, 2045);
  const next: FestivalRow | undefined = rows.find((r) => rowDiffers(r) && Math.max(r.seollal, r.chuseok) >= today);
  const nextIsSeol = next ? next.seollal !== next.tet && next.seollal >= today : false;
  const listYear = ymdFromJdn(today).m >= 11 ? thisYear + 1 : thisYear;
  const kr = yearHolidays(listYear, 'KR');
  const vn = yearHolidays(listYear, 'VN');

  return (
    <article className="article holidays">
      <p className="eyebrow left">節日 · LỄ TẾT</p>
      <h1 className="article-title">{x.title}</h1>
      <p className="article-lead">{x.lead}</p>

      {next && (
        <p className="warn">
          {x.nextDiff(
            next.year,
            dateText(nextIsSeol ? next.seollal : next.chuseok, t, lang, true),
            dateText(nextIsSeol ? next.tet : next.trungThu, t, lang, true),
            nextIsSeol ? `${x.seollal} / ${x.tet}` : `${x.chuseok} / ${x.trungThu}`,
          )}
        </p>
      )}

      <h2 className="article-h">{x.tableTitle}</h2>
      <p className="muted">{x.tableDesc} {x.sameNote}</p>
      <div className="table-wrap">
        <table className="month-table fest-table">
          <thead>
            <tr><th>{x.year}</th><th>{x.seollal}</th><th>{x.tet}</th><th>{x.chuseok}</th><th>{x.trungThu}</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.year} className={`${rowDiffers(r) ? 'differs' : ''} ${r.year === thisYear ? 'on' : ''}`}>
                <th scope="row">
                  {r.year}
                  {rowDiffers(r) && <span className="pill">{x.differs}</span>}
                </th>
                <Cell jdn={r.seollal} other={r.tet} />
                <Cell jdn={r.tet} other={r.seollal} />
                <Cell jdn={r.chuseok} other={r.trungThu} />
                <Cell jdn={r.trungThu} other={r.chuseok} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="article-h">{x.history}</h2>
      <ul className="birth-lines">
        {x.historyRows.map((h) => (
          <li key={h.year}><b>{h.year}</b><span>{h.text}</span></li>
        ))}
      </ul>

      <AdSlot name="article" />

      <h2 className="article-h">{x.listTitle(listYear)}</h2>
      <p className="muted">{x.listDesc}</p>
      <div className="hol-cols">
        {([[x.korea, kr], [x.vietnam, vn]] as const).map(([label, list]) => (
          <div className="panel" key={label}>
            <h3 className="panel-title">{label}</h3>
            <ul className="hol-list">
              {list.map((h) => (
                <li key={`${h.jdn}-${h.key}`}>
                  <span className="muted small">{dateText(h.jdn, t, lang)}</span>
                  <b>{t.holidays[h.key]}</b>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="article-h">{x.whyTitle}</h2>
      {x.why.map((w) => (
        <section key={w.h}>
          <h3>{w.h}</h3>
          <p>{w.p}</p>
        </section>
      ))}
      <p><Link to="/calendar">{x.calendarLink}</Link></p>
    </article>
  );
}
