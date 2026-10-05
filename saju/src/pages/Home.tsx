import { dayInfo } from '../engine/almanac';
import { useI18n } from '../i18n';
import { DayDetail } from '../components/DayDetail';
import { ZodiacGrid } from '../components/ZodiacGrid';
import { GanzhiChip, Section, cycleName, localTodayJdn, lunarText } from '../components/common';
import { Link } from '../router';
import { GuideList } from './ArticlePages';
import { AdSlot } from '../components/AdSlot';
import { HAZARD } from '../content/hazard';
import { AGE } from '../content/age';
import { InstallApp } from '../components/InstallApp';
import { YEARLY } from '../content/yearly';

export function Home() {
  const { t, lang } = useI18n();
  const jdn = localTodayJdn();
  const basis = lang === 'vi' ? 'VN' : 'KR';
  const info = dayInfo(jdn, basis);
  const kr = info.lunar.KR;
  const vn = info.lunar.VN;
  const differ = kr.day !== vn.day || kr.month !== vn.month || kr.leap !== vn.leap;
  const { y, m, d } = info.ymd;

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero-title">
            {t.hero.title1}
            <br />
            <span className="gold">{t.hero.title2}</span>
          </h1>
          <p className="hero-desc">{t.hero.desc}</p>
          <div className="hero-cta">
            <Link className="btn btn-gold" to="/saju">{t.hero.ctaSaju} →</Link>
            <Link className="btn btn-ghost" to="/calendar">{t.hero.ctaCalendar}</Link>
          </div>
        </div>
        <div className="hero-moon" aria-hidden="true">
          <div className="moon-orbit">
            <div className="moon" />
            <span className="orbit-label orbit-kr">음력</span>
            <span className="orbit-label orbit-vn">Âm lịch</span>
          </div>
        </div>
      </section>

      <section className="today-strip" aria-label={t.today.title}>
        <div className="today-cell">
          <span className="k">{t.today.solar}</span>
          <span className="today-big">{lang === 'vi' ? `${d}/${m}/${y}` : `${y}.${m}.${d}`}</span>
          <span className="muted small">{t.calendar.weekdays[info.weekday]}</span>
        </div>
        <div className={`today-cell ${differ ? 'diff' : ''}`}>
          <span className="k">🇰🇷 {t.today.lunarKR}</span>
          <span className="today-big">{lunarText(kr, t, lang)}</span>
          <span className="muted small">{kr.year}</span>
        </div>
        <div className={`today-cell ${differ ? 'diff' : ''}`}>
          <span className="k">🇻🇳 {t.today.lunarVN}</span>
          <span className="today-big">{lunarText(vn, t, lang)}</span>
          <span className="muted small">{vn.year}</span>
        </div>
        <div className="today-cell">
          <span className="k">{t.today.dayPillar}</span>
          <span className="today-big"><GanzhiChip cycle={info.dayCycle} /></span>
          <span className="muted small">{cycleName(info.dayCycle, t)}</span>
        </div>
        <p className={`today-note ${differ ? 'gold' : 'muted'}`}>{differ ? t.today.differ : t.today.same}</p>
      </section>

      <Link to="/fortune/2027" className="year-banner">
        <span className="year-banner-emoji" aria-hidden="true">{lang === 'vi' ? '🐐' : '🐑'}</span>
        <span>
          <b>{YEARLY[lang].homeBand(2027)}</b>
          <span className="muted small">{YEARLY[lang].homeBandDesc}</span>
        </span>
        <span className="gold">→</span>
      </Link>

      <InstallApp />

      <Section eyebrow="今日 · HÔM NAY" title={t.day.title}>
        <DayDetail info={info} basis={basis} />
        <p className="muted small center">
          {t.day.basisNote}: {basis === 'VN' ? t.calendar.basisVN : t.calendar.basisKR} ·{' '}
          <Link to="/calendar">{t.nav.calendar} →</Link>
        </p>
      </Section>

      <AdSlot name="home" />

      <Section eyebrow="十二支 · 12 CON GIÁP" title={t.zodiac.title} desc={t.zodiac.desc}>
        <ZodiacGrid jdn={jdn} dayCycle={info.dayCycle} />
      </Section>

      <section className="cta-band">
        <div>
          <h2 className="section-title">💛 {t.match.title} 💙</h2>
          <p className="section-desc">{t.match.desc}</p>
        </div>
        <Link className="btn btn-gold" to="/match">{t.match.submit} ♥</Link>
      </section>

      <section className="cta-band">
        <div>
          <h2 className="section-title">🇻🇳 {t.name.title} 🇰🇷</h2>
          <p className="section-desc">{t.name.desc}</p>
        </div>
        <Link className="btn btn-gold" to="/name">{lang === 'vi' ? t.name.toKo : t.name.toVi} →</Link>
      </section>

      <section className="cta-band">
        <div>
          <h2 className="section-title">🎂 {AGE[lang].title}</h2>
          <p className="section-desc">{AGE[lang].lead}</p>
        </div>
        <Link className="btn btn-gold" to="/age">{AGE[lang].calc} →</Link>
      </section>

      <section className="cta-band">
        <div>
          <h2 className="section-title">🛡️ {HAZARD[lang].title}</h2>
          <p className="section-desc">{HAZARD[lang].lead}</p>
        </div>
        <Link className="btn btn-gold" to="/samjae">{HAZARD[lang].check} →</Link>
      </section>

      <section className="cta-band">
        <div>
          <h2 className="section-title">{t.saju.title}</h2>
          <p className="section-desc">{t.saju.desc}</p>
        </div>
        <Link className="btn btn-gold" to="/saju">{t.hero.ctaSaju} →</Link>
      </section>

      <Section eyebrow="讀 · BÀI VIẾT" title={t.guide.title}>
        <GuideList limit={3} />
        <p className="center"><Link to="/guide">{t.guide.more} →</Link></p>
      </Section>
    </>
  );
}
