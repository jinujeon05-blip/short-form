import { useMemo, useState } from 'react';
import { cycleBranch, yearCycle } from '../engine/ganzhi';
import { Custom, HOANG_OC_BAD, YearCheck, checkYear, houseOk, samjaeRuns, weddingOk } from '../engine/hazard';
import { FORTUNE_YEARS } from '../engine/yearly';
import { HAZARD } from '../content/hazard';
import { useI18n } from '../i18n';
import { Link, hrefFor } from '../router';
import { GanzhiChip, cycleName } from '../components/common';
import { AdSlot } from '../components/AdSlot';
import { fortunePath } from './YearlyPage';

/** Three-harmony groups in the order 申子辰, 巳酉丑, 寅午戌, 亥卯未 */
const GROUPS = [[8, 0, 4], [5, 9, 1], [2, 6, 10], [11, 3, 7]];

/** Palace names without the ordinal, for the narrow table */
const HOANG_OC_SHORT = ['Cát', 'Nghi', 'Địa Sát', 'Tấn Tài', 'Thọ Tử', 'Hoang Ốc'];

const thisYear = () => new Date().getFullYear();
const validBirth = (b: number) => b >= 1900 && b <= thisYear();

export function HazardPage({ query }: { query: string }) {
  const { t, lang } = useI18n();
  const h = HAZARD[lang];
  const now = thisYear();
  const initial = useMemo(() => new URLSearchParams(query), [query]);
  const [birthText, setBirthText] = useState(initial.get('b') ?? '');
  const [birth, setBirth] = useState(() => {
    const b = Number(initial.get('b'));
    return validBirth(b) ? b : 0;
  });
  const [year, setYear] = useState(() => {
    const y = Number(initial.get('y'));
    return y >= now - 1 && y <= now + 11 ? y : now;
  });
  const [custom, setCustom] = useState<Custom>(() => {
    const c = initial.get('c');
    return c === 'KR' || c === 'VN' ? c : lang === 'vi' ? 'VN' : 'KR';
  });

  const sync = (b: number, y: number, c: Custom) => {
    if (!b) return;
    history.replaceState(null, '', hrefFor('/samjae', lang, `?b=${b}&y=${y}&c=${c}`));
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const b = Number(birthText);
    if (!validBirth(b)) return;
    setBirth(b);
    sync(b, year, custom);
  };
  const pickYear = (y: number) => { setYear(y); sync(birth, y, custom); };
  const pickCustom = (c: Custom) => { setCustom(c); sync(birth, year, c); };

  const zodiac = birth ? cycleBranch(yearCycle(birth)) : -1;
  const c = birth ? checkYear(birth, year) : null;
  const rows: YearCheck[] = birth ? Array.from({ length: 12 }, (_, i) => checkYear(birth, now + i)) : [];
  const years = Array.from({ length: 13 }, (_, i) => now - 1 + i);

  return (
    <article className="article hazard">
      <p className="eyebrow left">三災 · TAM TAI · KIM LÂU</p>
      <h1 className="article-title">{h.title}</h1>
      <p className="article-lead">{h.lead}</p>

      <form className="find-zodiac" onSubmit={submit}>
        <input
          inputMode="numeric"
          placeholder={h.birthPh}
          value={birthText}
          onChange={(e) => setBirthText(e.target.value.replace(/\D/g, '').slice(0, 4))}
          aria-label={h.birthYear}
        />
        <button className="btn btn-gold" type="submit">{h.check}</button>
        <span className="muted small">{h.lunarNote}</span>
      </form>

      {c && (
        <>
          <div className="hazard-controls">
            <label>
              <span className="muted small">{h.targetYear}</span>
              <select value={year} onChange={(e) => pickYear(Number(e.target.value))}>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </label>
            <div className="seg" role="group" aria-label={h.custom}>
              <button type="button" className={custom === 'KR' ? 'on' : ''} onClick={() => pickCustom('KR')}>{h.customKR}</button>
              <button type="button" className={custom === 'VN' ? 'on' : ''} onClick={() => pickCustom('VN')}>{h.customVN}</button>
            </div>
          </div>

          <div className="panel">
            <h2 className="panel-title">
              {h.resultTitle(year)} · {t.animalEmoji[zodiac]} {t.animals[zodiac]} · {h.ageText(c.age)}
            </h2>
            <p className="muted small"><GanzhiChip cycle={c.cycle} /> {cycleName(c.cycle, t)}</p>
            <div className="hazard-grid">
              <HazardItem label={h.samjae} value={h.samjaeName[c.samjae]} bad={c.samjae > 0} text={h.samjaeText[c.samjae]} />
              {custom === 'VN' ? (
                <>
                  <HazardItem label={h.kimLau} value={h.kimLauName[c.kimLau]} bad={c.kimLau > 0} text={h.kimLauText[c.kimLau]} />
                  <HazardItem
                    label={h.hoangOc}
                    value={c.hoangOc === null ? h.none : h.hoangOcName[c.hoangOc]}
                    bad={c.hoangOc !== null && HOANG_OC_BAD.includes(c.hoangOc)}
                    text={c.hoangOc === null ? h.hoangOcYoung : h.hoangOcText(HOANG_OC_BAD.includes(c.hoangOc))}
                  />
                </>
              ) : (
                <HazardItem label={h.nine} value={c.nine ? h.nine : h.none} bad={c.nine} text={h.nineText(c.nine)} />
              )}
              {c.own && <HazardItem label={h.own} value={h.own} bad text={h.ownText} />}
              {c.clash && <HazardItem label={h.clash} value={h.clash} bad text={h.clashText} />}
            </div>
            <p className="hazard-verdict">
              <span className={weddingOk(c, custom) ? 'good' : 'bad'}>{h.colWedding} {weddingOk(c, custom) ? h.ok : h.avoid}</span>
              <span className={houseOk(c, custom) ? 'good' : 'bad'}>{h.colHouse} {houseOk(c, custom) ? h.ok : h.avoid}</span>
            </p>
            <p className="muted small">{custom === 'VN' ? h.ruleVN : h.ruleKR}</p>
          </div>

          <AdSlot name="result" />

          <h2 className="article-h">{h.tableTitle}</h2>
          <div className="table-wrap">
            <table className="month-table hazard-table">
              <thead>
                <tr>
                  <th>{h.colYear}</th>
                  <th>{h.colAge}</th>
                  <th>{h.samjae}</th>
                  {custom === 'VN' ? <><th>Kim Lâu</th><th>Hoang Ốc</th></> : <th>{h.nine}</th>}
                  <th>{h.colWedding}</th>
                  <th>{h.colHouse}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.year} className={r.year === year ? 'on' : ''} onClick={() => pickYear(r.year)}>
                    <th scope="row">{r.year} <span className="muted small">{cycleName(r.cycle, t)}</span></th>
                    <td className="small">{r.age}</td>
                    <td className={`small ${r.samjae ? 'bad' : 'muted'}`}>{r.samjae ? h.samjaeShort[r.samjae] : '–'}</td>
                    {custom === 'VN' ? (
                      <>
                        <td className={`small ${r.kimLau ? 'bad' : 'muted'}`}>{r.kimLau ? h.kimLauName[r.kimLau].replace('Kim Lâu ', '') : '–'}</td>
                        <td className={`small ${r.hoangOc !== null && HOANG_OC_BAD.includes(r.hoangOc) ? 'bad' : 'muted'}`}>
                          {r.hoangOc === null ? '–' : HOANG_OC_SHORT[r.hoangOc]}
                        </td>
                      </>
                    ) : (
                      <td className={`small ${r.nine ? 'bad' : 'muted'}`}>{r.nine ? h.nine : '–'}</td>
                    )}
                    <td className={weddingOk(r, custom) ? 'good' : 'bad'}>{weddingOk(r, custom) ? h.ok : h.avoid}</td>
                    <td className={houseOk(r, custom) ? 'good' : 'bad'}>{houseOk(r, custom) ? h.ok : h.avoid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small">
            <b>{h.goodWedding}:</b> {rows.filter((r) => weddingOk(r, custom)).map((r) => r.year).join(', ') || '–'}
            <br />
            <b>{h.goodHouse}:</b> {rows.filter((r) => houseOk(r, custom)).map((r) => r.year).join(', ') || '–'}
          </p>
          <div className="result-actions">
            <button type="button" className="btn btn-ghost" onClick={() => navigator.clipboard?.writeText(location.href)}>
              🔗 {h.share}
            </button>
            {FORTUNE_YEARS.map((fy) => (
              <Link key={fy} className="btn btn-gold" to={fortunePath(fy, zodiac)}>{h.fortuneCta(fy)} →</Link>
            ))}
          </div>
        </>
      )}

      <h2 className="article-h">{h.groupsTitle}</h2>
      <p className="muted">{h.groupsDesc}</p>
      <div className="table-wrap">
        <table className="month-table">
          <thead><tr><th>{h.groupCol}</th><th>{h.yearsCol}</th></tr></thead>
          <tbody>
            {GROUPS.map((g) => (
              <tr key={g[0]} className={g.includes(zodiac) ? 'on' : ''}>
                <th scope="row">{g.map((z) => `${t.animalEmoji[z]} ${t.animals[z]}`).join(' · ')}</th>
                <td>{samjaeRuns(g[0], now - 2, now + 22).map((s) => `${s}–${s + 2}`).join(' / ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="article-h">{h.aboutTitle}</h2>
      {h.about.map((a) => (
        <section key={a.h}>
          <h3>{a.h}</h3>
          <p>{a.p}</p>
        </section>
      ))}
      <p className="muted small center">{h.disclaimer}</p>
    </article>
  );
}

function HazardItem({ label, value, bad, text }: { label: string; value: string; bad: boolean; text: string }) {
  return (
    <div className={`hazard-item ${bad ? 'is-bad' : 'is-ok'}`}>
      <span className="muted small">{label}</span>
      <b className={bad ? 'bad' : 'good'}>{value}</b>
      <span className="small">{text}</span>
    </div>
  );
}
