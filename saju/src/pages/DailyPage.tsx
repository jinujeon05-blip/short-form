import { useMemo, useState } from 'react';
import { jdnFromYmd, ymdFromJdn } from '../engine/astro';
import { zodiacOfYear } from '../engine/almanac';
import { DailyDetail, dailyDetail, dailyRanking, todayJdn } from '../engine/daily';
import { ANIMAL_SLUGS, FORTUNE_YEARS } from '../engine/yearly';
import { DAILY } from '../content/daily';
import { Lang, useI18n } from '../i18n';
import { Dict } from '../i18n/ko';
import { Link, RoutePath, hrefFor, navigate } from '../router';
import { GanzhiChip, Stars, cycleName, hourRange, lunarText } from '../components/common';
import { AdSlot } from '../components/AdSlot';
import { ShareImageButton } from '../components/ShareImage';
import { drawDailyCard } from '../components/cards';
import { fortunePath } from './YearlyPage';

export const dailyPath = (zodiac?: number): RoutePath =>
  (zodiac === undefined ? '/daily' : `/daily/${ANIMAL_SLUGS[zodiac]}`) as RoutePath;

type Level = 1 | 2 | 3 | 4 | 5;

const basisOf = (lang: Lang) => (lang === 'vi' ? 'VN' : 'KR');

/** ?d=YYYY-MM-DD → JDN, else today in the page language's country. */
function useDay(query: string, lang: Lang) {
  return useMemo(() => {
    const today = todayJdn(basisOf(lang));
    const m = new URLSearchParams(query).get('d')?.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    const jdn = m ? jdnFromYmd(Number(m[1]), Number(m[2]), Number(m[3])) : today;
    return { jdn, today };
  }, [query, lang]);
}

const dParam = (jdn: number, today: number) => {
  if (jdn === today) return '';
  const { y, m, d } = ymdFromJdn(jdn);
  return `?d=${y}-${m}-${d}`;
};

function dateLine(d: DailyDetail['info'], t: Dict, lang: Lang) {
  const x = DAILY[lang];
  return x.dateLine(d.ymd.y, d.ymd.m, d.ymd.d, t.calendar.weekdays[d.weekday], lunarText(d.lunar[basisOf(lang)], t, lang));
}

function DayNav({ path, jdn, today }: { path: RoutePath; jdn: number; today: number }) {
  const { lang } = useI18n();
  const x = DAILY[lang];
  return (
    <div className="seg day-nav" role="group">
      <Link to={path} search={dParam(jdn - 1, today)} className="chip">{x.yesterday}</Link>
      <Link to={path} search={dParam(today, today)} className={`chip ${jdn === today ? 'on' : ''}`}>{x.today}</Link>
      <Link to={path} search={dParam(jdn + 1, today)} className="chip">{x.tomorrow}</Link>
    </div>
  );
}

export function DailyIndexPage({ query }: { query: string }) {
  const { t, lang } = useI18n();
  const x = DAILY[lang];
  const { jdn, today } = useDay(query, lang);
  const basis = basisOf(lang);
  const ranking = dailyRanking(jdn, basis);
  const info = dailyDetail(jdn, 0, basis).info;
  const [birth, setBirth] = useState('');

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const b = Number(birth);
    if (b > 1900 && b < 2100) navigate(hrefFor(dailyPath(zodiacOfYear(b)), lang, dParam(jdn, today)));
  };

  return (
    <article className="article daily">
      <p className="eyebrow left">今日運勢 · TỬ VI HÔM NAY</p>
      <h1 className="article-title">{x.indexTitle}</h1>
      <p className="gold">{dateLine(info, t, lang)}</p>
      <p className="muted small">{x.dayPillar}: <GanzhiChip cycle={info.dayCycle} /> {cycleName(info.dayCycle, t)}</p>
      <DayNav path="/daily" jdn={jdn} today={today} />

      <form className="find-zodiac" onSubmit={go}>
        <input
          inputMode="numeric"
          placeholder={t.zodiac.yearPlaceholder}
          value={birth}
          onChange={(e) => setBirth(e.target.value.replace(/\D/g, '').slice(0, 4))}
          aria-label={t.zodiac.yearPlaceholder}
        />
        <button className="btn btn-gold" type="submit">{t.zodiac.findMine}</button>
        <span className="muted small">{t.zodiac.yearNote}</span>
      </form>

      <h2 className="article-h">{x.ranking}</h2>
      <ol className="rank-list">
        {ranking.map((f, i) => (
          <li key={f.branch}>
            <Link to={dailyPath(f.branch)} search={dParam(jdn, today)} className="rank-item">
              <span className="rank-no">{i + 1}</span>
              <span className="rank-emoji" aria-hidden="true">{t.animalEmoji[f.branch]}</span>
              <span className="rank-body">
                <b>{t.animals[f.branch]} <span className="muted small">{t.branches[f.branch]}</span></b>
                <span className="muted small">{t.fortune.overall[f.stars as Level][f.seed % 3]}</span>
              </span>
              <span className="rank-side"><Stars n={f.stars} /></span>
            </Link>
          </li>
        ))}
      </ol>
      <AdSlot name="article" />
      <p className="muted small center">{x.disclaimer}</p>
    </article>
  );
}

export function DailyZodiacPage({ zodiac, query }: { zodiac: number; query: string }) {
  const { t, lang } = useI18n();
  const x = DAILY[lang];
  const { jdn, today } = useDay(query, lang);
  const d = dailyDetail(jdn, zodiac, basisOf(lang));
  const { f, info } = d;
  const animal = t.animals[zodiac];
  const text = t.fortune.overall[f.stars as Level][f.seed % 3];
  const areaLabel = { love: t.zodiac.love, money: t.zodiac.money, work: t.zodiac.work, health: t.zodiac.health };
  const areaText = (a: 'love' | 'money' | 'work' | 'health') =>
    a === 'health' ? x.health[f.areas.health as Level] : t.fortune[a][f.areas[a] as Level];
  const wd = (j: number) => {
    const { m, d: dd } = ymdFromJdn(j);
    return lang === 'vi' ? `${dd}/${m}` : `${m}.${dd}`;
  };

  return (
    <article className="article daily">
      <p className="eyebrow left"><Link to="/daily" search={dParam(jdn, today)}>← {x.indexTitle}</Link></p>
      <div className="yearly-hero">
        <span className="yearly-emoji" aria-hidden="true">{t.animalEmoji[zodiac]}</span>
        <div>
          <h1 className="article-title">{x.zodiacTitle(animal)}</h1>
          <p className="gold small">{dateLine(info, t, lang)}</p>
          <p className="muted"><Stars n={f.stars} /></p>
        </div>
      </div>
      <DayNav path={dailyPath(zodiac)} jdn={jdn} today={today} />

      <div className="panel">
        <p className="fortune-big">{text}</p>
        <p className="muted small">
          {x.dayPillar}: <GanzhiChip cycle={info.dayCycle} /> {cycleName(info.dayCycle, t)} — {x.relation[f.relation]}
        </p>
      </div>

      <div className="area-grid">
        {(['love', 'money', 'work', 'health'] as const).map((a) => (
          <div className="panel area" key={a}>
            <div className="area-head"><b>{areaLabel[a]}</b> <Stars n={f.areas[a]} /></div>
            <p className="muted">{areaText(a)}</p>
          </div>
        ))}
      </div>

      <div className="panel lucky-panel">
        <p><span className="muted small">{x.luckyHours}</span><br /><b>{d.luckyHours.map((b) => `${t.branches[b]} ${hourRange(b)}`).join(' · ')}</b></p>
        <p><span className="muted small">{x.cautionHour}</span><br /><b className="bad">{t.branches[d.cautionHour]} {hourRange(d.cautionHour)}</b></p>
        <p><span className="muted small">{x.luckyColor}</span><br /><b>{t.elementColor[f.luckyElement]}</b></p>
        <p><span className="muted small">{x.luckyNumber} · {x.luckyDirection}</span><br /><b>{f.luckyNumber} · {t.elementDirection[f.luckyElement]}</b></p>
      </div>

      <AdSlot name="article" />

      <h2 className="article-h">{x.byYear}</h2>
      <ul className="birth-lines">
        {d.birthLines.map((l) => (
          <li key={l.year}>
            <b>{x.yearLabel(l.year)}</b>
            <span className={l.tone === 2 ? 'good' : l.tone === 0 ? 'bad' : ''}>{x.lines[l.tone][l.pick % x.lines[l.tone].length]}</span>
          </li>
        ))}
      </ul>

      <h2 className="article-h">{x.week}</h2>
      <div className="week-bars">
        {d.week.map((w) => (
          <Link key={w.jdn} to={dailyPath(zodiac)} search={dParam(w.jdn, today)} className={`week-bar ${w.jdn === jdn ? 'on' : ''}`}>
            <span className="week-fill" style={{ height: `${w.stars * 20}%` }} />
            <span className="small">{wd(w.jdn)}</span>
          </Link>
        ))}
      </div>

      <div className="result-actions">
        <ShareImageButton
          filename={`myeongwol-daily-${ANIMAL_SLUGS[zodiac]}.png`}
          draw={(ctx) => drawDailyCard(ctx, {
            dateText: dateLine(info, t, lang),
            zodiac,
            title: x.zodiacTitle(animal),
            stars: f.stars,
            text,
            areas: (['love', 'money', 'work', 'health'] as const).map((a) => ({ label: areaLabel[a], stars: f.areas[a] })),
            lucky: `${x.luckyColor}: ${t.elementColor[f.luckyElement]} · ${x.luckyNumber}: ${f.luckyNumber}`,
          }, t, lang)}
        />
        {FORTUNE_YEARS.map((y) => (
          <Link key={y} className="btn btn-ghost" to={fortunePath(y, zodiac)}>{x.yearlyCta} →</Link>
        ))}
      </div>

      <h2 className="article-h">{x.others}</h2>
      <div className="other-zodiacs">
        {t.animals.map((a, z) => (z === zodiac ? null : (
          <Link key={z} to={dailyPath(z)} search={dParam(jdn, today)} className="chip">{t.animalEmoji[z]} {a}</Link>
        )))}
      </div>
      <p className="muted small center">{x.disclaimer}</p>
    </article>
  );
}
