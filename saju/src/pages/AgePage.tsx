import { useMemo, useState } from 'react';
import { jdnFromYmd, weekdayFromJdn, ymdFromJdn } from '../engine/astro';
import { yearCycle } from '../engine/ganzhi';
import { AgeResult, ageTable, calculateAge } from '../engine/age';
import { todayJdn } from '../engine/daily';
import { lunarToSolar } from '../engine/lunar';
import { AGE } from '../content/age';
import { Lang, useI18n } from '../i18n';
import { Dict } from '../i18n/ko';
import { Link, hrefFor } from '../router';
import { GanzhiChip, cycleName, lunarText } from '../components/common';
import { AdSlot } from '../components/AdSlot';
import { dailyPath } from './DailyPage';

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const basisOf = (lang: Lang) => (lang === 'vi' ? 'VN' : 'KR');

interface Form { cal: 'solar' | 'lunar'; leap: boolean; y: string; m: string; d: string; ref: string }

function isoOf(jdn: number) {
  const { y, m, d } = ymdFromJdn(jdn);
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function dateText(jdn: number, t: Dict, lang: Lang) {
  const { y, m, d } = ymdFromJdn(jdn);
  const wd = t.calendar.weekdays[weekdayFromJdn(jdn)];
  return lang === 'vi' ? `${wd}, ${d}/${m}/${y}` : `${y}년 ${m}월 ${d}일 (${wd})`;
}

/** Birth form → solar JDN, or null when the date does not exist. */
function birthJdn(f: Form, lang: Lang): number | null {
  const y = Number(f.y), m = Number(f.m), d = Number(f.d);
  if (f.cal === 'lunar') return lunarToSolar(y, m, d, f.leap, basisOf(lang));
  const j = jdnFromYmd(y, m, d);
  return ymdFromJdn(j).d === d ? j : null;
}

export function AgePage({ query }: { query: string }) {
  const { t, lang } = useI18n();
  const x = AGE[lang];
  const today = todayJdn(basisOf(lang));
  const thisYear = ymdFromJdn(today).y;

  const initial = useMemo(() => {
    const p = new URLSearchParams(query);
    const b = p.get('b')?.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    const r = p.get('r')?.match(/^\d{4}-\d{2}-\d{2}$/) ? p.get('r')! : '';
    const form: Form = {
      cal: p.get('cal') === 'l' ? 'lunar' : 'solar',
      leap: p.get('leap') === '1',
      y: b?.[1] ?? '1990', m: b ? String(Number(b[2])) : '1', d: b ? String(Number(b[3])) : '1',
      ref: r,
    };
    return { form, submitted: !!b };
  }, [query]);

  const [f, setF] = useState<Form>(initial.form);
  const [shown, setShown] = useState<Form | null>(initial.submitted ? initial.form : null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF({ ...f, [k]: v });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthJdn(f, lang) === null) {
      setError(t.saju.invalid);
      return;
    }
    setError('');
    setShown(f);
    const q = `?b=${f.y}-${f.m}-${f.d}${f.cal === 'lunar' ? `&cal=l${f.leap ? '&leap=1' : ''}` : ''}${f.ref ? `&r=${f.ref}` : ''}`;
    history.replaceState(null, '', hrefFor('/age', lang, q));
    setTimeout(() => document.getElementById('age-result')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const result: AgeResult | null = useMemo(() => {
    if (!shown) return null;
    const b = birthJdn(shown, lang);
    if (b === null) return null;
    const r = shown.ref ? (() => { const [y, m, d] = shown.ref.split('-').map(Number); return jdnFromYmd(y, m, d); })() : today;
    return calculateAge(b, r, basisOf(lang));
  }, [shown, lang, today]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <article className="article age">
      <p className="eyebrow left">年齡 · TÍNH TUỔI</p>
      <h1 className="article-title">{x.title}</h1>
      <p className="article-lead">{x.lead}</p>

      <form className="panel age-form" onSubmit={submit}>
        <div className="field">
          <span>{x.birth}</span>
          <div className="seg">
            <button type="button" className={f.cal === 'solar' ? 'on' : ''} onClick={() => set('cal', 'solar')}>{t.saju.solar}</button>
            <button type="button" className={f.cal === 'lunar' ? 'on' : ''} onClick={() => set('cal', 'lunar')}>{t.saju.lunar}</button>
            {f.cal === 'lunar' && (
              <label className="check inline">
                <input type="checkbox" checked={f.leap} onChange={(e) => set('leap', e.target.checked)} /> {t.saju.leap}
              </label>
            )}
          </div>
          <div className="row3">
            <select value={f.y} onChange={(e) => set('y', e.target.value)} aria-label={t.saju.year}>
              {range(1920, thisYear).reverse().map((y) => <option key={y} value={y}>{y}{lang === 'ko' ? '년' : ''}</option>)}
            </select>
            <select value={f.m} onChange={(e) => set('m', e.target.value)} aria-label={t.saju.month}>
              {range(1, 12).map((m) => <option key={m} value={m}>{lang === 'ko' ? `${m}월` : m}</option>)}
            </select>
            <select value={f.d} onChange={(e) => set('d', e.target.value)} aria-label={t.saju.day}>
              {range(1, f.cal === 'lunar' ? 30 : 31).map((d) => <option key={d} value={d}>{lang === 'ko' ? `${d}일` : d}</option>)}
            </select>
          </div>
        </div>
        <label className="field">
          <span>{x.refDate}</span>
          <input type="date" value={f.ref || isoOf(today)} onChange={(e) => set('ref', e.target.value === isoOf(today) ? '' : e.target.value)} />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn btn-gold block" type="submit">{x.calc}</button>
      </form>

      {result && <AgeResultView a={result} />}
      {result && (
        <div className="result-actions">
          <button type="button" className="btn btn-ghost" onClick={copy}>{copied ? x.copied : `🔗 ${x.share}`}</button>
          <Link className="btn btn-ghost" to={dailyPath(result.zodiac)}>{t.animalEmoji[result.zodiac]} {t.zodiac.title} →</Link>
          <Link className="btn btn-ghost" to="/samjae" search={`?b=${result.lunarBirth.year}`}>{lang === 'vi' ? 'Tam Tai · Kim Lâu' : '삼재 계산기'} →</Link>
        </div>
      )}

      <AdSlot name="article" />

      <AgeTable year={thisYear} />

      <h2 className="article-h">{x.aboutTitle}</h2>
      {x.about.map((a) => (
        <section key={a.h}>
          <h3>{a.h}</h3>
          <p>{a.p}</p>
        </section>
      ))}
    </article>
  );
}

function AgeResultView({ a }: { a: AgeResult }) {
  const { t, lang } = useI18n();
  const x = AGE[lang];
  const all = [
    { k: x.intl, v: x.years(a.intl), note: `${x.intlDetail(a.extraMonths, a.extraDays)} · ${x.intlNote}`, main: true },
    { k: x.tuoiMu, v: x.years(a.tuoiMu), note: x.tuoiMuNote, main: lang === 'vi' },
    { k: x.koreanAge, v: x.years(a.koreanAge), note: x.koreanAgeNote, main: false },
    { k: x.yearAge, v: x.years(a.yearAge), note: x.yearAgeNote, main: false },
  ];
  // Korean readers care about 세는나이 / 연 나이 first; Vietnamese readers about tuổi mụ.
  const ages = lang === 'vi' ? all : [all[0], all[2], all[3], all[1]];
  const { y: refY } = ymdFromJdn(a.refJdn);
  const adultAge = lang === 'vi' ? 18 : 19;
  const adultJdn = jdnFromYmd(a.birth.y + adultAge, a.birth.m, a.birth.d);
  const birthCycle = yearCycle(a.lunarBirth.year);
  const facts = [
    { k: x.zodiac, v: <>{t.animalEmoji[a.zodiac]} {t.animals[a.zodiac]} · <GanzhiChip cycle={birthCycle} /> {cycleName(birthCycle, t)}</> },
    { k: x.lunarBirth, v: `${a.lunarBirth.year}${lang === 'ko' ? '년 ' : ' · '}${lunarText(a.lunarBirth, t, lang)}` },
    { k: x.bornOn, v: dateText(a.birthJdn, t, lang) },
    { k: x.daysLived, v: x.days(a.daysLived) },
    { k: x.nextBirthday, v: `${dateText(a.nextBirthday, t, lang)} · ${x.dday(a.nextBirthday - a.refJdn)}` },
    ...(a.nextLunarBirthday !== null ? [{ k: x.nextLunarBirthday, v: `${dateText(a.nextLunarBirthday, t, lang)} · ${x.dday(a.nextLunarBirthday - a.refJdn)}` }] : []),
    { k: x.day10000, v: `${dateText(a.day10000, t, lang)}${a.day10000 >= a.refJdn ? ` · ${x.dday(a.day10000 - a.refJdn)}` : ''}` },
    { k: x.schoolKR, v: x.school.KR[a.schoolKR.stage](a.schoolKR.grade) },
    { k: x.schoolVN, v: x.school.VN[a.schoolVN.stage](a.schoolVN.grade) },
  ];
  const milestones = [
    { label: x.adult(adultAge), y: a.birth.y + adultAge, note: dateText(adultJdn, t, lang) },
    ...x.milestone.map((m) => ({ label: m.label, y: a.birth.y + m.offset, note: m.note })),
  ];

  return (
    <section id="age-result">
      <div className="age-grid">
        {ages.map((g) => (
          <div key={g.k} className={`panel age-card ${g.main ? 'main' : ''}`}>
            <span className="muted small">{g.k}</span>
            <b className="age-num">{g.v}</b>
            <span className="small muted">{g.note}</span>
          </div>
        ))}
      </div>
      <div className="panel">
        <dl className="age-facts">
          {facts.map((fa) => (
            <div key={fa.k}><dt className="muted small">{fa.k}</dt><dd>{fa.v}</dd></div>
          ))}
        </dl>
      </div>
      <h2 className="article-h">{x.milestones}</h2>
      <ul className="birth-lines">
        {milestones.map((m) => (
          <li key={m.label}>
            <b>{m.y}</b>
            <span>{m.label} <span className={`small ${m.y < refY ? 'muted' : 'gold'}`}>· {m.note}</span></span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AgeTable({ year }: { year: number }) {
  const { t, lang } = useI18n();
  const x = AGE[lang];
  const rows = ageTable(year, year - 90);
  return (
    <>
      <h2 className="article-h">{x.tableTitle(year)}</h2>
      <p className="muted">{x.tableDesc}</p>
      <div className="table-wrap">
        <table className="month-table age-table">
          <thead>
            <tr><th>{x.colBirth}</th><th>{x.colIntl}</th><th>{x.colCount}</th><th>{x.colZodiac}</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.year}>
                <th scope="row">{r.year}</th>
                <td>{Math.max(0, r.intlBefore)} / {r.intlAfter}</td>
                <td>{r.count}</td>
                <td>{t.animalEmoji[r.zodiac]} {t.animals[r.zodiac]} <span className="muted small">{cycleName(r.cycle, t)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
