import { useEffect, useMemo, useState } from 'react';
import { BRANCH_HANJA, STEM_HANJA, branchElement, cycleStem, stemElement, tenGod, yearCycle } from '../engine/ganzhi';
import { BirthInput, InvalidDateError, SajuResult, calculateSaju } from '../engine/pillars';
import { PLACES, getPlace } from '../engine/timezone';
import { useI18n } from '../i18n';
import { ELEMENT_CLASS, GanzhiChip, Section, cycleName } from '../components/common';

interface FormState {
  name: string;
  calendar: 'solar' | 'lunar';
  leap: boolean;
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  unknownTime: boolean;
  gender: 'M' | 'F';
  place: string;
  solarTime: boolean;
  splitZi: boolean;
}

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

function toQuery(f: FormState): string {
  const p = new URLSearchParams({
    d: `${f.year}-${f.month}-${f.day}`,
    c: f.calendar === 'lunar' ? (f.leap ? 'L' : 'l') : 's',
    t: f.unknownTime ? 'x' : `${f.hour}:${f.minute}`,
    g: f.gender,
    p: f.place,
    o: `${f.solarTime ? 1 : 0}${f.splitZi ? 1 : 0}`,
  });
  if (f.name) p.set('n', f.name);
  return p.toString();
}

function fromQuery(q: string): FormState | null {
  const p = new URLSearchParams(q);
  const d = p.get('d')?.split('-');
  if (!d || d.length !== 3) return null;
  const tm = p.get('t') ?? 'x';
  const [hh, mm] = tm === 'x' ? ['12', '0'] : tm.split(':');
  const c = p.get('c') ?? 's';
  const o = p.get('o') ?? '10';
  return {
    name: p.get('n') ?? '',
    calendar: c === 's' ? 'solar' : 'lunar',
    leap: c === 'L',
    year: d[0], month: d[1], day: d[2],
    hour: hh ?? '12', minute: mm ?? '0',
    unknownTime: tm === 'x',
    gender: p.get('g') === 'F' ? 'F' : 'M',
    place: getPlace(p.get('p') ?? 'seoul').id,
    solarTime: o[0] !== '0',
    splitZi: o[1] === '1',
  };
}

function toInput(f: FormState): BirthInput {
  return {
    calendar: f.calendar,
    year: Number(f.year), month: Number(f.month), day: Number(f.day), leap: f.leap,
    hour: f.unknownTime ? null : Number(f.hour),
    minute: Number(f.minute),
    gender: f.gender,
    place: getPlace(f.place),
    solarTime: f.solarTime,
    splitZi: f.splitZi,
  };
}

export function SajuPage({ query }: { query: string }) {
  const { t, lang } = useI18n();
  const [form, setForm] = useState<FormState>(() => fromQuery(query) ?? {
    name: '', calendar: 'solar', leap: false, year: '1990', month: '1', day: '1', hour: '12', minute: '0',
    unknownTime: false, gender: 'M', place: lang === 'vi' ? 'hanoi' : 'seoul', solarTime: true, splitZi: false,
  });
  const [error, setError] = useState('');

  const result = useMemo<SajuResult | null>(() => {
    if (!fromQuery(query)) return null;
    try {
      return calculateSaju(toInput(fromQuery(query)!));
    } catch {
      return null;
    }
  }, [query]);

  useEffect(() => {
    const f = fromQuery(query);
    if (f) setForm(f);
  }, [query]);

  useEffect(() => {
    if (result) document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
  }, [result]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      calculateSaju(toInput(form));
      setError('');
      window.location.hash = `#/saju?${toQuery(form)}`;
    } catch (err) {
      setError(err instanceof InvalidDateError ? t.saju.invalid : String(err));
    }
  };

  const thisYear = new Date().getFullYear();

  return (
    <>
      <Section eyebrow="四柱八字 · TỨ TRỤ" title={t.saju.title} desc={t.saju.desc}>
        <form className="saju-form panel" onSubmit={submit}>
          <label className="field">
            <span>{t.saju.name}</span>
            <input value={form.name} maxLength={20} placeholder={t.saju.namePh} onChange={(e) => set('name', e.target.value)} />
          </label>

          <div className="field">
            <span>{t.saju.calendar}</span>
            <div className="seg">
              <button type="button" className={form.calendar === 'solar' ? 'on' : ''} onClick={() => set('calendar', 'solar')}>{t.saju.solar}</button>
              <button type="button" className={form.calendar === 'lunar' ? 'on' : ''} onClick={() => set('calendar', 'lunar')}>{t.saju.lunar}</button>
              {form.calendar === 'lunar' && (
                <label className="check inline">
                  <input type="checkbox" checked={form.leap} onChange={(e) => set('leap', e.target.checked)} /> {t.saju.leap}
                </label>
              )}
            </div>
          </div>

          <div className="field">
            <span>{t.saju.birthDate}</span>
            <div className="row3">
              <select value={form.year} onChange={(e) => set('year', e.target.value)} aria-label={t.saju.year}>
                {range(1930, thisYear).reverse().map((y) => <option key={y} value={y}>{y}{lang === 'ko' ? '년' : ''}</option>)}
              </select>
              <select value={form.month} onChange={(e) => set('month', e.target.value)} aria-label={t.saju.month}>
                {range(1, 12).map((m) => <option key={m} value={m}>{lang === 'ko' ? `${m}월` : `${t.saju.month} ${m}`}</option>)}
              </select>
              <select value={form.day} onChange={(e) => set('day', e.target.value)} aria-label={t.saju.day}>
                {range(1, form.calendar === 'lunar' ? 30 : 31).map((d) => <option key={d} value={d}>{lang === 'ko' ? `${d}일` : `${t.saju.day} ${d}`}</option>)}
              </select>
            </div>
          </div>

          <div className="field">
            <span>{t.saju.time}</span>
            <div className="row2">
              <select value={form.hour} disabled={form.unknownTime} onChange={(e) => set('hour', e.target.value)} aria-label={t.saju.time}>
                {range(0, 23).map((h) => <option key={h} value={h}>{String(h).padStart(2, '0')}{lang === 'ko' ? '시' : 'h'}</option>)}
              </select>
              <select value={form.minute} disabled={form.unknownTime} onChange={(e) => set('minute', e.target.value)} aria-label="minute">
                {range(0, 59).map((m) => <option key={m} value={m}>{String(m).padStart(2, '0')}{lang === 'ko' ? '분' : "'"}</option>)}
              </select>
            </div>
            <label className="check">
              <input type="checkbox" checked={form.unknownTime} onChange={(e) => set('unknownTime', e.target.checked)} /> {t.saju.unknownTime}
            </label>
          </div>

          <div className="field">
            <span>{t.saju.gender}</span>
            <div className="seg">
              <button type="button" className={form.gender === 'M' ? 'on' : ''} onClick={() => set('gender', 'M')}>{t.saju.male}</button>
              <button type="button" className={form.gender === 'F' ? 'on' : ''} onClick={() => set('gender', 'F')}>{t.saju.female}</button>
            </div>
          </div>

          <label className="field">
            <span>{t.saju.place}</span>
            <select value={form.place} onChange={(e) => set('place', e.target.value)}>
              <optgroup label={`🇰🇷 ${t.saju.placeKR}`}>
                {PLACES.filter((p) => p.country === 'KR').map((p) => <option key={p.id} value={p.id}>{p[lang]}</option>)}
              </optgroup>
              <optgroup label={`🇻🇳 ${t.saju.placeVN}`}>
                {PLACES.filter((p) => p.country === 'VN').map((p) => <option key={p.id} value={p.id}>{p[lang]}</option>)}
              </optgroup>
            </select>
          </label>

          <details className="field advanced">
            <summary>{t.saju.advanced}</summary>
            <label className="check">
              <input type="checkbox" checked={form.solarTime} onChange={(e) => set('solarTime', e.target.checked)} /> {t.saju.solarTime}
            </label>
            <p className="muted small">{t.saju.solarTimeHelp}</p>
            <label className="check">
              <input type="checkbox" checked={form.splitZi} onChange={(e) => set('splitZi', e.target.checked)} /> {t.saju.splitZi}
            </label>
          </details>

          {error && <p className="error" role="alert">{error}</p>}
          <button className="btn btn-gold block" type="submit">{t.saju.submit}</button>
          <p className="muted small center">🔒 {t.saju.privacy}</p>
        </form>
      </Section>

      {result && <SajuResultView result={result} name={fromQuery(query)?.name ?? ''} thisYear={thisYear} />}
    </>
  );
}

function SajuResultView({ result: r, name, thisYear }: { result: SajuResult; name: string; thisYear: number }) {
  const { t, lang } = useI18n();
  const [copied, setCopied] = useState(false);
  const columns = [r.hour, r.day, r.month, r.year];
  const total = r.elements.reduce((a, b) => a + b, 0);
  const dm = t.dayMasters[r.dayMaster];
  const age = thisYear - r.solar.y;
  const currentLuck = [...r.luck.pillars].reverse().find((p) => p.startAge <= age);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: t.result.title(name), url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* cancelled */
    }
  };

  const offsetH = r.offsetMin / 60;
  const solarHm = r.solarTimeMinutes !== null
    ? `${String(Math.floor(r.solarTimeMinutes / 60)).padStart(2, '0')}:${String(r.solarTimeMinutes % 60).padStart(2, '0')}`
    : null;

  return (
    <Section id="result" eyebrow="命式 · LÁ SỐ" title={t.result.title(name)}>
      <div className="pillars panel">
        {columns.map((p, i) => (
          <div className={`pillar ${i === 1 ? 'is-day' : ''}`} key={i}>
            <div className="pillar-label">{t.result.pillars[i]}</div>
            {p ? (
              <>
                <div className="pillar-god">{t.tenGods[p.stemGod]}</div>
                <div className={`pillar-char ${ELEMENT_CLASS[stemElement(p.stem)]}`}>
                  <span className="hanja">{STEM_HANJA[p.stem]}</span>
                  <span className="reading">{t.stems[p.stem]} · {t.elements[stemElement(p.stem)]}</span>
                </div>
                <div className={`pillar-char ${ELEMENT_CLASS[branchElement(p.branch)]}`}>
                  <span className="hanja">{BRANCH_HANJA[p.branch]}</span>
                  <span className="reading">{t.branches[p.branch]} · {t.elements[branchElement(p.branch)]}</span>
                </div>
                <div className="pillar-god">{t.tenGods[p.branchGod]}</div>
                <div className="pillar-meta" title={t.result.hidden}>{p.hidden.map((s) => STEM_HANJA[s]).join(' ')}</div>
                <div className="pillar-meta" title={t.result.stage}>{t.stages[p.stage]}</div>
              </>
            ) : (
              <div className="pillar-unknown">{t.result.unknown}</div>
            )}
          </div>
        ))}
      </div>
      <p className="muted small center">
        {t.result.tenGod} · {t.result.hidden} · {t.result.stage}
      </p>

      {r.nearTermBoundary && <p className="warn">⚠ {t.result.boundaryWarn}</p>}

      <div className="result-grid">
        <div className="panel">
          <h3 className="panel-title">{t.result.dayMaster}</h3>
          <div className="dm-head">
            <span className={`dm-char ${ELEMENT_CLASS[stemElement(r.dayMaster)]}`}>{STEM_HANJA[r.dayMaster]}</span>
            <h4>{dm.title}</h4>
          </div>
          <p>{dm.text}</p>
          <p><b className="gold">✦</b> {dm.strengths}</p>
          <p className="muted">{dm.caution}</p>
        </div>

        <div className="panel">
          <h3 className="panel-title">{t.result.elements}</h3>
          <div className="el-bars">
            {r.elements.map((n, e) => (
              <div className="el-row" key={e}>
                <span className={`el-name ${ELEMENT_CLASS[e]}`}>{t.elementLong[e]}</span>
                <span className="el-track"><span className={`el-fill ${ELEMENT_CLASS[e]}`} style={{ width: `${(n / total) * 100}%` }} /></span>
                <span className="el-count">{n}</span>
              </div>
            ))}
          </div>
          <h3 className="panel-title mt">{t.result.strength}</h3>
          <p><b>{r.strength.strong ? t.result.strong : t.result.weak}</b></p>
          <p className="muted">{r.strength.strong ? t.result.strongDesc : t.result.weakDesc}</p>
          <h3 className="panel-title mt">{t.result.favorable}</h3>
          <ul className="fav-list">
            {r.favorable.slice(0, 2).map((e) => (
              <li key={e}>
                <span className={`fav-el ${ELEMENT_CLASS[e]}`}>{t.elementLong[e]}</span>
                <span>{t.result.color}: {t.elementColor[e]} · {t.result.direction}: {t.elementDirection[e]} · {t.result.number}: {[3, 2, 5, 4, 1][e]}, {[8, 7, 10, 9, 6][e]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="panel">
        <h3 className="panel-title">{t.result.luck}</h3>
        <p className="muted small">{t.result.luckStart(r.luck.startAgeYears, r.luck.startAgeMonths, r.luck.forward)}</p>
        <div className="luck-row">
          {r.luck.pillars.map((p) => (
            <div key={p.startAge} className={`luck ${p === currentLuck ? 'now' : ''}`}>
              <span className="luck-age">{p.startAge}{lang === 'ko' ? t.result.age : ''}</span>
              <GanzhiChip cycle={p.cycle} />
              <span className="muted small">{t.tenGods[tenGod(r.dayMaster, p.stem)]}</span>
              <span className="muted small">{p.startYear}</span>
              {p === currentLuck && <span className="now-tag">{t.result.now}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h3 className="panel-title">{t.result.yearly}</h3>
        <div className="yearly">
          {[thisYear, thisYear + 1].map((y) => {
            const c = yearCycle(y);
            const g = tenGod(r.dayMaster, cycleStem(c));
            return (
              <div key={y} className="yearly-item">
                <div className="yearly-head">
                  <b>{t.result.yearlyLabel(y)}</b> <GanzhiChip cycle={c} /> <span className="muted">{cycleName(c, t)}</span>
                  <span className="pill">{t.tenGods[g]}</span>
                </div>
                <p>{t.yearGod[g]}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel small-info">
        <p className="muted small">
          {t.result.solarInfo}: {r.solar.y}-{String(r.solar.m).padStart(2, '0')}-{String(r.solar.d).padStart(2, '0')}
          {' · '}{t.result.utcOffset} UTC{offsetH >= 0 ? '+' : ''}{offsetH}
          {solarHm && <> · {t.result.solarTimeLabel} {solarHm}</>}
        </p>
      </div>

      <div className="result-actions">
        <button className="btn btn-gold" onClick={share}>{copied ? t.result.copied : t.result.share}</button>
        <a className="btn btn-ghost" href="#/saju">{t.result.again}</a>
      </div>
      <p className="muted small center">{t.result.disclaimer}</p>
    </Section>
  );
}
