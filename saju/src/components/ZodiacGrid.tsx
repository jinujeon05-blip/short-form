import { useState } from 'react';
import { zodiacOfYear } from '../engine/almanac';
import { zodiacFortune } from '../engine/fortune';
import { readStore, useI18n, writeStore } from '../i18n';
import { Stars } from './common';
import { Link } from '../router';
import { DAILY } from '../content/daily';
import { dailyPath } from '../pages/DailyPage';

export function ZodiacGrid({ jdn, dayCycle }: { jdn: number; dayCycle: number }) {
  const { t, lang } = useI18n();
  const saved = Number(readStore('mw.zodiac'));
  const [selected, setSelected] = useState<number | null>(Number.isInteger(saved) && readStore('mw.zodiac') !== null ? saved : null);
  const [year, setYear] = useState('');

  const pick = (b: number) => {
    setSelected(b);
    writeStore('mw.zodiac', String(b));
  };

  const f = selected !== null ? zodiacFortune(dayCycle, jdn, selected) : null;
  const level = f ? (f.stars as 1 | 2 | 3 | 4 | 5) : 3;

  return (
    <div className="zodiac">
      <div className="zodiac-grid" role="list">
        {t.animals.map((name, b) => {
          const s = zodiacFortune(dayCycle, jdn, b).stars;
          return (
            <button
              key={b}
              role="listitem"
              className={`zodiac-btn ${selected === b ? 'active' : ''}`}
              onClick={() => pick(b)}
              aria-pressed={selected === b}
            >
              <span className="zodiac-emoji" aria-hidden="true">{t.animalEmoji[b]}</span>
              <span className="zodiac-name">{name}</span>
              <span className="zodiac-mini"><Stars n={s} /></span>
            </button>
          );
        })}
      </div>

      <form
        className="find-zodiac"
        onSubmit={(e) => {
          e.preventDefault();
          const y = Number(year);
          if (y > 1900 && y < 2100) pick(zodiacOfYear(y));
        }}
      >
        <input
          inputMode="numeric"
          placeholder={t.zodiac.yearPlaceholder}
          value={year}
          onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
          aria-label={t.zodiac.yearPlaceholder}
        />
        <button type="submit" className="btn btn-ghost">{t.zodiac.findMine}</button>
        <span className="muted small">{t.zodiac.yearNote}</span>
      </form>

      {f ? (
        <div className="fortune-card">
          <div className="fortune-head">
            <span className="fortune-emoji" aria-hidden="true">{t.animalEmoji[f.branch]}</span>
            <div>
              <h3>{t.animals[f.branch]} · {t.branches[f.branch]}</h3>
              <Stars n={f.stars} />
            </div>
          </div>
          <p className="fortune-text">{t.fortune.overall[level][f.seed % 3]}</p>
          <dl className="fortune-areas">
            {(['love', 'money', 'work'] as const).map((k) => (
              <div key={k}>
                <dt>{t.zodiac[k]} <Stars n={f.areas[k]} /></dt>
                <dd>{t.fortune[k][f.areas[k] as 1 | 2 | 3 | 4 | 5]}</dd>
              </div>
            ))}
            <div>
              <dt>{t.zodiac.health} <Stars n={f.areas.health} /></dt>
            </div>
          </dl>
          <p className="center small"><Link to={dailyPath(f.branch)}>{DAILY[lang].homeLink} →</Link></p>
          <p className="lucky">
            <span>{t.zodiac.lucky}: <b>{t.elementColor[f.luckyElement]}</b></span>
            <span>{t.zodiac.luckyNumber}: <b>{f.luckyNumber}</b></span>
          </p>
        </div>
      ) : (
        <p className="muted center">{t.zodiac.pick}</p>
      )}
    </div>
  );
}
