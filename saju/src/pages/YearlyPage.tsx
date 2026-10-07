import { Emoji } from '../components/Emoji';
import { useState } from 'react';
import { localJdn, ymdFromJdn } from '../engine/astro';
import { cycleBranch, cycleStem, yearCycle } from '../engine/ganzhi';
import { ANIMAL_SLUGS, YearFortune, yearFortune, yearRanking } from '../engine/yearly';
import { YEARLY } from '../content/yearly';
import { HAZARD } from '../content/hazard';
import { Lang, useI18n } from '../i18n';
import { Link, RoutePath, hrefFor, navigate } from '../router';
import { ELEMENT_CLASS, GanzhiChip, Stars, cycleHanja, cycleName } from '../components/common';
import { AdSlot } from '../components/AdSlot';
import { ShareImageButton } from '../components/ShareImage';
import { drawYearCard } from '../components/cards';

export const fortunePath = (year: number, zodiac?: number): RoutePath =>
  (zodiac === undefined ? `/fortune/${year}` : `/fortune/${year}/${ANIMAL_SLUGS[zodiac]}`) as RoutePath;

function dateText(ms: number, lang: Lang) {
  const { m, d } = ymdFromJdn(localJdn(ms, lang === 'vi' ? 7 : 9));
  return lang === 'vi' ? `${d}/${m}` : `${m}.${d}`;
}

export function YearlyIndexPage({ year }: { year: number }) {
  const { t, lang } = useI18n();
  const y = YEARLY[lang];
  const yc = yearCycle(year);
  const ganzhi = y.ganzhi(t.stems[cycleStem(yc)], t.branches[cycleBranch(yc)], cycleHanja(yc));
  const ranking = yearRanking(year);
  const [birth, setBirth] = useState('');

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const b = Number(birth);
    if (b > 1900 && b < 2100) navigate(hrefFor(fortunePath(year, cycleBranch(yearCycle(b))), lang));
  };

  return (
    <article className="article yearly">
      <p className="eyebrow left">{cycleHanja(yc)} · {year}</p>
      <h1 className="article-title">{y.indexTitle(year, ganzhi)}</h1>
      <p className="article-lead">{y.yearIntro[year] ?? y.indexDesc}</p>

      <form className="find-zodiac" onSubmit={go}>
        <input
          inputMode="numeric"
          placeholder={y.yearPh}
          value={birth}
          onChange={(e) => setBirth(e.target.value.replace(/\D/g, '').slice(0, 4))}
          aria-label={y.yearPh}
        />
        <button className="btn btn-gold" type="submit">{y.findMine}</button>
        <span className="muted small">{y.lunarNote}</span>
      </form>

      <h2 className="article-h">{y.ranking}</h2>
      <ol className="rank-list">
        {ranking.map((f, i) => (
          <li key={f.zodiac}>
            <Link to={fortunePath(year, f.zodiac)} className="rank-item">
              <span className="rank-no">{i + 1}</span>
              <span className="rank-emoji" aria-hidden="true"><Emoji e={t.animalEmoji[f.zodiac]} /></span>
              <span className="rank-body">
                <b>{t.animals[f.zodiac]} <span className="muted small">{t.branches[f.zodiac]}</span></b>
                <span className="muted small">{y.relation[f.relation].head}</span>
              </span>
              <span className="rank-side">
                <Stars n={f.overall} />
                {f.samjae > 0 && <span className="pill">{y.samjae.badge[f.samjae]}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <AdSlot name="article" />
      <p className="muted small center">{y.disclaimer}</p>
    </article>
  );
}

export function YearlyZodiacPage({ year, zodiac }: { year: number; zodiac: number }) {
  const { t, lang } = useI18n();
  const y = YEARLY[lang];
  const f: YearFortune = yearFortune(year, zodiac);
  const animal = t.animals[zodiac];
  const rel = y.relation[f.relation];

  return (
    <article className="article yearly">
      <p className="eyebrow left">
        <Link to={fortunePath(year)}>← {y.indexTitle(year, y.ganzhi(t.stems[cycleStem(f.yearCycle)], t.branches[cycleBranch(f.yearCycle)], cycleHanja(f.yearCycle)))}</Link>
      </p>
      <div className="yearly-hero">
        <span className="yearly-emoji" aria-hidden="true"><Emoji e={t.animalEmoji[zodiac]} /></span>
        <div>
          <h1 className="article-title">{y.zodiacTitle(year, animal)}</h1>
          <p className="muted">
            <GanzhiChip cycle={f.yearCycle} /> {cycleName(f.yearCycle, t)} · {y.overall} <Stars n={f.overall} />
          </p>
        </div>
      </div>

      <div className="panel">
        <h2 className="panel-title">{rel.head}</h2>
        <p>{rel.body}</p>
        <p className="muted">{y.traits[zodiac]}</p>
        {f.samjae > 0 && (
          <p className="warn"><b>{y.samjae.badge[f.samjae]}</b> — {y.samjae.text[f.samjae]} <Link to="/samjae">{HAZARD[lang].title} →</Link></p>
        )}
      </div>

      <div className="area-grid">
        {(['love', 'money', 'work', 'health'] as const).map((a) => (
          <div className="panel area" key={a}>
            <div className="area-head"><b>{y.areas[a]}</b> <Stars n={f.areas[a]} /></div>
            <p className="muted">{y.area[a][f.areas[a] as 1 | 2 | 3 | 4 | 5]}</p>
          </div>
        ))}
      </div>

      <div className="panel">
        <h2 className="panel-title">{y.lucky}</h2>
        <p>
          <span className={`fav-el ${ELEMENT_CLASS[f.luckyElement]}`}>{t.elementLong[f.luckyElement]}</span>
          {' · '}{y.color}: {t.elementColor[f.luckyElement]}
          {' · '}{y.direction}: {t.elementDirection[f.luckyElement]}
          {' · '}{y.number}: {f.luckyNumber}
        </p>
      </div>

      <AdSlot name="article" />

      <h2 className="article-h">{y.monthly}</h2>
      <div className="table-wrap">
        <table className="month-table">
          <tbody>
            {f.months.map((m) => (
              <tr key={m.index}>
                <th scope="row">
                  {y.monthLabel(m.index)}
                  <span className="muted small"> <GanzhiChip cycle={m.cycle} /></span>
                </th>
                <td className="muted small">{dateText(m.startMs, lang)}~{dateText(m.endMs - 86_400_000, lang)}</td>
                <td><Stars n={m.stars} /></td>
                <td className="small">{y.month[m.stars as 1 | 2 | 3 | 4 | 5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="article-h">{y.birthYears}</h2>
      <div className="table-wrap">
        <table className="month-table">
          <thead>
            <tr><th>{y.colYear}</th><th>{y.colAge}</th><th>{y.colNayin}</th><th /></tr>
          </thead>
          <tbody>
            {f.birthYears.map((r) => (
              <tr key={r.year}>
                <th scope="row">{r.year} <span className="muted small">{cycleName(r.cycle, t)}</span></th>
                <td className="small">{y.ageText(r.countAge, r.intlAge)}</td>
                <td className="small">{t.nayin[r.nayin]}</td>
                <td className="small muted">{y.nayinNote[r.nayinRel]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="result-actions">
        <ShareImageButton filename={`myeongwol-${year}-${ANIMAL_SLUGS[zodiac]}.png`} draw={(ctx) => drawYearCard(ctx, f, t, lang)} />
      </div>

      <div className="cta-band">
        <div>
          <h2 className="section-title">{y.sajuCta}</h2>
          <p className="section-desc">{y.sajuCtaDesc}</p>
        </div>
        <Link className="btn btn-gold" to="/saju">{t.hero.ctaSaju} →</Link>
      </div>

      <h2 className="article-h">{y.others}</h2>
      <div className="other-zodiacs">
        {t.animals.map((a, z) => (z === zodiac ? null : (
          <Link key={z} to={fortunePath(year, z)} className="chip"><Emoji e={t.animalEmoji[z]} /> {a}</Link>
        )))}
      </div>
      <p className="muted small center">{y.disclaimer}</p>
    </article>
  );
}
