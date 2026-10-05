import { useEffect, useMemo, useState } from 'react';
import { BRANCH_HANJA, STEM_HANJA, branchElement, cycleStem, stemElement, tenGod, yearCycle } from '../engine/ganzhi';
import { InvalidDateError, SajuResult, calculateSaju } from '../engine/pillars';
import { useI18n } from '../i18n';
import { ELEMENT_CLASS, GanzhiChip, Section, cycleName } from '../components/common';
import { BirthFields, BirthForm, decodeBirth, defaultBirth, encodeBirth, toInput } from '../components/BirthFields';
import { ShareImageButton } from '../components/ShareImage';
import { drawSajuCard } from '../components/cards';

/** Reads `b=` (current) or the first-release `d=&c=&t=…` link format. */
function fromQuery(q: string): BirthForm | null {
  const p = new URLSearchParams(q);
  if (p.get('b')) return decodeBirth(p.get('b'));
  const d = p.get('d');
  if (!d) return null;
  return decodeBirth([d, p.get('c') ?? 's', p.get('t') ?? 'x', p.get('g') ?? 'M', p.get('p') ?? 'seoul', p.get('o') ?? '10', p.get('n') ?? ''].join('~'));
}

export function SajuPage({ query }: { query: string }) {
  const { t, lang } = useI18n();
  const [form, setForm] = useState<BirthForm>(() => fromQuery(query) ?? defaultBirth(lang));
  const [error, setError] = useState('');

  const parsed = useMemo(() => fromQuery(query), [query]);
  const result = useMemo<SajuResult | null>(() => {
    if (!parsed) return null;
    try {
      return calculateSaju(toInput(parsed));
    } catch {
      return null;
    }
  }, [parsed]);

  useEffect(() => {
    if (parsed) setForm(parsed);
  }, [parsed]);

  useEffect(() => {
    if (result) document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
  }, [result]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      calculateSaju(toInput(form));
      setError('');
      window.location.hash = `#/saju?b=${encodeURIComponent(encodeBirth(form))}`;
    } catch (err) {
      setError(err instanceof InvalidDateError ? t.saju.invalid : String(err));
    }
  };

  const thisYear = new Date().getFullYear();

  return (
    <>
      <Section eyebrow="四柱八字 · TỨ TRỤ" title={t.saju.title} desc={t.saju.desc}>
        <form className="saju-form panel" onSubmit={submit}>
          <BirthFields value={form} onChange={setForm} />

          <details className="field advanced">
            <summary>{t.saju.advanced}</summary>
            <label className="check">
              <input type="checkbox" checked={form.solarTime} onChange={(e) => setForm({ ...form, solarTime: e.target.checked })} /> {t.saju.solarTime}
            </label>
            <p className="muted small">{t.saju.solarTimeHelp}</p>
            <label className="check">
              <input type="checkbox" checked={form.splitZi} onChange={(e) => setForm({ ...form, splitZi: e.target.checked })} /> {t.saju.splitZi}
            </label>
          </details>

          {error && <p className="error" role="alert">{error}</p>}
          <button className="btn btn-gold block" type="submit">{t.saju.submit}</button>
          <p className="muted small center">🔒 {t.saju.privacy}</p>
        </form>
      </Section>

      {result && <SajuResultView result={result} name={parsed?.name ?? ''} thisYear={thisYear} />}
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
        <ShareImageButton
          filename="myeongwol-saju.png"
          draw={(ctx) => drawSajuCard(ctx, r, name, t, lang)}
        />
        <button className="btn btn-ghost" onClick={share}>{copied ? t.result.copied : t.result.share}</button>
        <a className="btn btn-ghost" href="#/saju">{t.result.again}</a>
      </div>
      <p className="muted small center">{t.result.disclaimer}</p>
    </Section>
  );
}
