import { useEffect, useMemo, useState } from 'react';
import { CalendarPlus } from 'lucide-react';
import { JESA } from '../content/jesa';
import { CalendarCountry, solarToLunar } from '../engine/lunar';
import { jdnFromYmd, weekdayFromJdn, ymdFromJdn } from '../engine/astro';
import { MemorialRow, lunarOfDeath, memorialDates, memorialIcs } from '../engine/memorial';
import { localTodayJdn, lunarText } from '../components/common';
import { AdSlot } from '../components/AdSlot';
import { useI18n } from '../i18n';
import { hrefFor } from '../router';

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const THIS_YEAR = new Date().getFullYear();

export function JesaPage({ query }: { query: string }) {
  const { t, lang } = useI18n();
  const x = JESA[lang];
  const init = useMemo(() => new URLSearchParams(query), [query]);
  const [mode, setMode] = useState<'lunar' | 'solar'>(init.get('s') ? 'solar' : 'lunar');
  const [lm, setLm] = useState(Number(init.get('m') ?? 1) || 1);
  const [ld, setLd] = useState(Number(init.get('d') ?? 1) || 1);
  const [leap, setLeap] = useState(init.get('l') === '1');
  const [dy, setDy] = useState(init.get('y') ?? '');
  const [solar, setSolar] = useState(init.get('s') ?? `${THIS_YEAR - 1}-01-01`);
  const [name, setName] = useState(init.get('n') ?? '');
  const [basis, setBasis] = useState<CalendarCountry>(init.get('b') === 'kr' ? 'KR' : init.get('b') === 'vn' ? 'VN' : lang === 'vi' ? 'VN' : 'KR');
  const [shown, setShown] = useState(init.has('m') || init.has('s'));

  // Lunar month/day (and lunar death year) from either input mode.
  const solarParts = solar.split('-').map(Number);
  const deathLunar = mode === 'solar' && solarParts.length === 3 && solarParts.every(Boolean)
    ? lunarOfDeath(jdnFromYmd(solarParts[0], solarParts[1], solarParts[2]), basis) : null;
  const month = deathLunar ? deathLunar.month : lm;
  const day = deathLunar ? deathLunar.day : ld;
  const wasLeap = deathLunar ? deathLunar.leap : leap;
  const deathYear = deathLunar ? deathLunar.year : dy && Number(dy) > 1900 ? Number(dy) : null;

  const today = localTodayJdn();
  const fromYear = solarToLunar(today, basis).year;
  const all = shown ? memorialDates(month, day, basis, fromYear, 11, deathYear) : [];
  // This year's date if it has passed, then the next 10 anniversaries.
  const upcoming = all.filter((r) => r.jdn >= today).slice(0, 10);
  const rows = [...all.filter((r) => r.jdn < today), ...upcoming];
  const next = upcoming[0];

  useEffect(() => {
    if (!shown) return;
    const p = new URLSearchParams({ b: basis === 'KR' ? 'kr' : 'vn' });
    if (mode === 'solar') p.set('s', solar);
    else {
      p.set('m', String(lm));
      p.set('d', String(ld));
      if (leap) p.set('l', '1');
      if (dy) p.set('y', dy);
    }
    if (name) p.set('n', name);
    history.replaceState(null, '', hrefFor('/jesa', lang, `?${p.toString()}`));
  }, [shown, basis, mode, solar, lm, ld, leap, dy, name, lang]);

  const fmt = (jdn: number) => {
    const { y, m, d } = ymdFromJdn(jdn);
    const w = t.calendar.weekdays[weekdayFromJdn(jdn)];
    return lang === 'vi' ? `${w}, ${d}/${m}/${y}` : `${y}. ${m}. ${d}. (${w})`;
  };
  const lunarLabel = lunarText({ year: 0, month, day, leap: false, monthLength: 30 }, t, lang);

  const download = () => {
    const ics = memorialIcs(upcoming, (r) => x.icsTitle(name.trim(), r.nth), x.icsDesc(lunarLabel));
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'myeongwol-memorial.ics';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const note = (r: MemorialRow) => [
    r.nth ? x.nth(r.nth) : '',
    r.day !== day ? x.moved : '',
    r.otherJdn !== null ? x.other(fmt(r.otherJdn), basis === 'KR') : '',
  ].filter(Boolean).join(' · ');

  return (
    <article className="article jesa">
      <p className="eyebrow left">{x.eyebrow}</p>
      <h1 className="article-title">{x.title}</h1>
      <p className="article-lead">{x.lead}</p>

      <form className="panel jesa-form" onSubmit={(e) => { e.preventDefault(); setShown(true); }}>
        <div className="seg" role="group">
          <button type="button" className={mode === 'lunar' ? 'on' : ''} onClick={() => setMode('lunar')}>{x.modeLunar}</button>
          <button type="button" className={mode === 'solar' ? 'on' : ''} onClick={() => setMode('solar')}>{x.modeSolar}</button>
        </div>

        {mode === 'lunar' ? (
          <>
            <label className="field">
              <span>{x.lunarLabel}</span>
              <span className="row-inputs">
                <select value={lm} onChange={(e) => setLm(Number(e.target.value))} aria-label={t.saju.month}>
                  {range(1, 12).map((m) => <option key={m} value={m}>{lang === 'ko' ? `${m}월` : `Tháng ${m}`}</option>)}
                </select>
                <select value={ld} onChange={(e) => setLd(Number(e.target.value))} aria-label={t.saju.day}>
                  {range(1, 30).map((d) => <option key={d} value={d}>{lang === 'ko' ? `${d}일` : `Ngày ${d}`}</option>)}
                </select>
                <label className="check"><input type="checkbox" checked={leap} onChange={(e) => setLeap(e.target.checked)} /> {x.leap}</label>
              </span>
            </label>
            {leap && <p className="muted small">{x.leapNote}</p>}
            <label className="field">
              <span>{x.deathYear}</span>
              <input inputMode="numeric" value={dy} onChange={(e) => setDy(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder={x.deathYearPh} />
            </label>
          </>
        ) : (
          <label className="field">
            <span>{x.solarLabel}</span>
            <input type="date" value={solar} max={`${THIS_YEAR}-12-31`} onChange={(e) => setSolar(e.target.value)} />
            {deathLunar && <span className="muted small">{x.solarNote(lunarText(deathLunar, t, lang))}</span>}
          </label>
        )}

        <label className="field">
          <span>{x.nameLabel}</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={x.namePh} maxLength={20} />
        </label>

        <div className="seg" role="group">
          <button type="button" className={basis === 'KR' ? 'on' : ''} onClick={() => setBasis('KR')}>{x.basisKR}</button>
          <button type="button" className={basis === 'VN' ? 'on' : ''} onClick={() => setBasis('VN')}>{x.basisVN}</button>
        </div>
        <button className="btn btn-gold block" type="submit">{lang === 'vi' ? 'Xem ngày giỗ' : '기일 계산하기'}</button>
      </form>

      {rows.length > 0 && (
        <>
          {next && (
            <p className="jesa-next">
              <b>{name.trim() ? `${name.trim()} · ` : ''}{lang === 'vi' ? `${lunarLabel} âm lịch` : `음력 ${lunarLabel}`}</b>
              <span>{x.next(next.jdn - today)}</span>
              <span className="gold">{fmt(next.jdn)}</span>
            </p>
          )}
          {wasLeap && mode === 'solar' && <p className="muted small">{x.leapNote}</p>}
          <div className="table-wrap">
            <table className="month-table jesa-table">
              <thead><tr><th>{x.colYear}</th><th>{x.colDate}</th><th>{x.colEve}</th><th>{x.colNote}</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.year} className={r.jdn < today ? 'muted' : r === next ? 'jesa-row-next' : ''}>
                    <th scope="row">{r.ymd.y}</th>
                    <td className={r.weekday === 0 || r.weekday === 6 ? 'gold' : ''}>{fmt(r.jdn)}{r.jdn < today ? ` · ${x.past}` : ''}</td>
                    <td className="small">{fmt(r.jdn - 1)}</td>
                    <td className="small">{note(r)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p><button type="button" className="btn btn-ghost" onClick={download}><CalendarPlus className="line-icon" aria-hidden="true" /> {x.ics}</button></p>
        </>
      )}

      <AdSlot name="article" />

      <h2 className="article-h">{x.faqTitle}</h2>
      {x.faq.map((f) => (
        <section key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </section>
      ))}
      <p className="muted small">{x.disclaimer}</p>
    </article>
  );
}
