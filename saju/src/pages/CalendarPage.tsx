import { useMemo, useState } from 'react';
import { jdnFromYmd } from '../engine/astro';
import { PURPOSES, Purpose, dayInfo, holidaysOf, personalClash, suitsPurpose, zodiacOfYear } from '../engine/almanac';
import { CalendarCountry } from '../engine/lunar';
import { readStore, useI18n, writeStore } from '../i18n';
import { DayDetail } from '../components/DayDetail';
import { Section, localTodayJdn } from '../components/common';
import { AdSlot } from '../components/AdSlot';

export function CalendarPage() {
  const { t, lang } = useI18n();
  const today = localTodayJdn();
  const now = new Date();
  const [ym, setYm] = useState({ y: now.getFullYear(), m: now.getMonth() + 1 });
  const savedBasis = readStore('mw.basis');
  const [basis, setBasisState] = useState<CalendarCountry>(
    savedBasis === 'KR' || savedBasis === 'VN' ? savedBasis : lang === 'vi' ? 'VN' : 'KR',
  );
  const [purpose, setPurpose] = useState<Purpose | null>(null);
  const [birthYear, setBirthYearState] = useState(readStore('mw.birthYear') ?? '');
  const [selected, setSelected] = useState<number>(today);

  const setBasis = (b: CalendarCountry) => {
    setBasisState(b);
    writeStore('mw.basis', b);
  };
  const setBirthYear = (v: string) => {
    const clean = v.replace(/\D/g, '').slice(0, 4);
    setBirthYearState(clean);
    writeStore('mw.birthYear', clean || null);
  };
  const by = Number(birthYear);
  const personalBranch = by > 1900 && by < 2100 ? zodiacOfYear(by) : null;

  const cells = useMemo(() => {
    const first = jdnFromYmd(ym.y, ym.m, 1);
    const days = new Date(Date.UTC(ym.y, ym.m, 0)).getUTCDate();
    const lead = dayInfo(first, basis).weekday;
    const out: (number | null)[] = Array(lead).fill(null);
    for (let i = 0; i < days; i++) out.push(first + i);
    while (out.length % 7) out.push(null);
    return out;
  }, [ym, basis]);

  const move = (delta: number) => {
    const idx = ym.y * 12 + ym.m - 1 + delta;
    setYm({ y: Math.floor(idx / 12), m: (idx % 12) + 1 });
  };

  return (
    <Section eyebrow="擇日 · XEM NGÀY" title={t.calendar.title} desc={t.calendar.desc}>
      <div className="cal-controls">
        <div className="seg" role="group" aria-label={t.calendar.basis}>
          <span className="k">{t.calendar.basis}</span>
          {(['KR', 'VN'] as const).map((b) => (
            <button key={b} className={basis === b ? 'on' : ''} onClick={() => setBasis(b)} aria-pressed={basis === b}>
              {b === 'KR' ? `🇰🇷 ${t.calendar.basisKR}` : `🇻🇳 ${t.calendar.basisVN}`}
            </button>
          ))}
        </div>
        <div className="seg wrap" role="group" aria-label={t.calendar.purpose}>
          <span className="k">{t.calendar.purpose}</span>
          <button className={purpose === null ? 'on' : ''} onClick={() => setPurpose(null)}>{t.calendar.all}</button>
          {PURPOSES.map((p) => (
            <button key={p} className={purpose === p ? 'on' : ''} onClick={() => setPurpose(p)} aria-pressed={purpose === p}>
              {t.purposes[p]}
            </button>
          ))}
        </div>
        <label className="my-year">
          <span className="k">{t.calendar.myYear}</span>
          <input inputMode="numeric" value={birthYear} placeholder="1990" onChange={(e) => setBirthYear(e.target.value)} />
          {personalBranch !== null && <span>{t.animalEmoji[personalBranch]} {t.animals[personalBranch]}</span>}
        </label>
      </div>

      <div className="cal-nav">
        <button className="btn btn-ghost sm" onClick={() => move(-1)} aria-label={t.calendar.prev}>‹</button>
        <h3>{t.calendar.monthTitle(ym.y, ym.m)}</h3>
        <button className="btn btn-ghost sm" onClick={() => move(1)} aria-label={t.calendar.next}>›</button>
        <button
          className="btn btn-ghost sm"
          onClick={() => {
            setYm({ y: now.getFullYear(), m: now.getMonth() + 1 });
            setSelected(today);
          }}
        >
          {t.calendar.todayBtn}
        </button>
      </div>

      <div className="cal-grid" role="grid">
        {t.calendar.weekdays.map((w, i) => (
          <div key={w} className={`cal-wd ${i === 0 ? 'sun' : i === 6 ? 'sat' : ''}`} role="columnheader">{w}</div>
        ))}
        {cells.map((jdn, i) => {
          if (jdn === null) return <div key={`e${i}`} className="cal-cell empty" />;
          const info = dayInfo(jdn, basis);
          const l = info.lunar[basis];
          const holidays = holidaysOf(info, basis);
          const suits = purpose ? suitsPurpose(info, purpose, basis, personalBranch) : false;
          const clash = personalClash(info, personalBranch);
          const dim = purpose !== null && !suits;
          return (
            <button
              key={jdn}
              role="gridcell"
              className={[
                'cal-cell',
                `lv-${info.level}`,
                jdn === today ? 'is-today' : '',
                jdn === selected ? 'is-selected' : '',
                suits ? 'suits' : '',
                dim ? 'dim' : '',
                info.weekday === 0 || holidays.length ? 'sun' : info.weekday === 6 ? 'sat' : '',
              ].join(' ')}
              onClick={() => setSelected(jdn)}
              aria-label={`${info.ymd.d} · ${t.day.levels[info.level]}`}
            >
              <span className="cal-d">{info.ymd.d}</span>
              <span className="cal-l">{l.day === 1 ? `${l.leap ? (lang === 'vi' ? 'N' : '윤') : ''}${l.month}/${l.day}` : l.day}</span>
              <span className="cal-mark">
                <i className={`dot dot-${info.level}`} />
                {clash && <i className="dot dot-clash" />}
                {basis === 'KR' && info.sonEomneun && <i className="dot dot-son" />}
              </span>
              {holidays.length > 0 && <span className="cal-h">{t.holidays[holidays[0]]}</span>}
              {holidays.length === 0 && info.term !== null && <span className="cal-h gold">{t.terms[info.term]}</span>}
            </button>
          );
        })}
      </div>

      <div className="legend">
        <span><i className="dot dot-great" /> {t.day.levels.great}</span>
        <span><i className="dot dot-good" /> {t.day.levels.good}</span>
        <span><i className="dot dot-normal" /> {t.day.levels.normal}</span>
        <span><i className="dot dot-bad" /> {t.day.levels.bad}</span>
        {basis === 'KR' && <span><i className="dot dot-son" /> {t.day.sonEomneun.split(' — ')[0]}</span>}
        {personalBranch !== null && <span><i className="dot dot-clash" /> {t.day.clash.split(' — ')[0]}</span>}
        {purpose && <span><i className="suits-swatch" /> {t.calendar.suits}</span>}
      </div>

      <DayDetail info={dayInfo(selected, basis)} basis={basis} personalBranch={personalBranch} title=" " />
      <AdSlot name="result" />
    </Section>
  );
}
