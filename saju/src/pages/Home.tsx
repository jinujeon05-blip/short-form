import { Baby, Cake, CalendarHeart, Heart, Moon, Shield, Sparkles } from 'lucide-react';
import { Emoji } from '../components/Emoji';
import { useState } from 'react';
import { MoonPhase, phaseName } from '../components/MoonPhase';
import { dayInfo } from '../engine/almanac';
import { Lang, useI18n } from '../i18n';
import { DayDetail } from '../components/DayDetail';
import { ZodiacGrid } from '../components/ZodiacGrid';
import { Section, localTodayJdn } from '../components/common';
import { Link } from '../router';
import { GuideList } from './ArticlePages';
import { AdSlot } from '../components/AdSlot';
import { HAZARD } from '../content/hazard';
import { AGE } from '../content/age';
import { DREAM_UI } from '../content/dreams';
import { InstallApp } from '../components/InstallApp';
import { TodayCard } from '../components/TodayCard';
import { TODAY } from '../content/today';
import { YEARLY } from '../content/yearly';

export function Home() {
  const { t, lang } = useI18n();
  const jdn = localTodayJdn();
  const basis = lang === 'vi' ? 'VN' : 'KR';
  const info = dayInfo(jdn, basis);
  const lunar = info.lunar[basis];
  const [phase, setPhase] = useState<number | null>(null);

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
        <div className="hero-moon">
          <div className="moon-orbit" aria-hidden="true">
            <MoonPhase onPhase={setPhase} />
            <span className="orbit-label orbit-kr">음력</span>
            <span className="orbit-label orbit-vn">Âm lịch</span>
          </div>
          {phase !== null && (
            <p className="moon-caption">
              {lang === 'vi'
                ? `Trăng hôm nay · ${lunar.day}/${lunar.month}${lunar.leap ? ' (nhuận)' : ''} âm lịch · ${phaseName(phase, lang)}`
                : `오늘의 달 · 음력 ${lunar.leap ? '윤' : ''}${lunar.month}월 ${lunar.day}일 · ${phaseName(phase, lang)}`}
            </p>
          )}
        </div>
      </section>

      <TodayCard info={info} basis={basis} />

      <Link to="/fortune/2027" className="year-banner">
        <span className="year-banner-emoji" aria-hidden="true"><Emoji e={lang === 'vi' ? '🐐' : '🐑'} /></span>
        <span>
          <b>{YEARLY[lang].homeBand(2027)}</b>
          <span className="muted small">{YEARLY[lang].homeBandDesc}</span>
        </span>
        <span className="gold">→</span>
      </Link>

      <InstallApp />

      <Section eyebrow="今日 · HÔM NAY" title={TODAY[lang].detail}>
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
          <h2 className="section-title"><Heart className="line-icon" aria-hidden="true" />{t.match.title}</h2>
          <p className="section-desc">{t.match.desc}</p>
        </div>
        <Link className="btn btn-gold" to="/match">{t.match.submit} ♥</Link>
      </section>

      <section className="cta-band cta-new">
        <div>
          <span className="new-badge">NEW</span>
          <h2 className="section-title"><Sparkles className="line-icon" aria-hidden="true" />{HOME_NAMING[lang].title}</h2>
          <p className="section-desc">{HOME_NAMING[lang].desc}</p>
          <p className="cta-example">Nguyễn Minh Anh → <b>민아</b> <span className="hanja-line">敏雅</span> · 서준 → <span className="bad">giun?</span></p>
        </div>
        <Link className="btn btn-gold" to="/naming">{HOME_NAMING[lang].cta} →</Link>
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
          <h2 className="section-title"><Moon className="line-icon" aria-hidden="true" />{DREAM_UI[lang].title}</h2>
          <p className="section-desc">{DREAM_UI[lang].lead}</p>
        </div>
        <Link className="btn btn-gold" to="/dream">{lang === 'vi' ? 'Giải mộng' : '꿈해몽 보기'} →</Link>
      </section>

      <section className="cta-band">
        <div>
          <h2 className="section-title"><Baby className="line-icon" aria-hidden="true" />{HOME_TAEMONG[lang].title}</h2>
          <p className="section-desc">{HOME_TAEMONG[lang].desc}</p>
        </div>
        <Link className="btn btn-gold" to="/taemong">{HOME_TAEMONG[lang].cta} →</Link>
      </section>

      <section className="cta-band">
        <div>
          <h2 className="section-title"><Cake className="line-icon" aria-hidden="true" />{AGE[lang].title}</h2>
          <p className="section-desc">{AGE[lang].lead}</p>
        </div>
        <Link className="btn btn-gold" to="/age">{AGE[lang].calc} →</Link>
      </section>

      <section className="cta-band">
        <div>
          <h2 className="section-title"><CalendarHeart className="line-icon" aria-hidden="true" />{HOME_JESA[lang].title}</h2>
          <p className="section-desc">{HOME_JESA[lang].desc}</p>
        </div>
        <Link className="btn btn-gold" to="/jesa">{HOME_JESA[lang].cta} →</Link>
      </section>

      <section className="cta-band">
        <div>
          <h2 className="section-title"><Shield className="line-icon" aria-hidden="true" />{HAZARD[lang].title}</h2>
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

const HOME_NAMING: Record<Lang, { title: string; desc: string; cta: string }> = {
  ko: {
    title: '한·베 작명 · 나에게 어울리는 한국 이름',
    desc: '베트남 이름의 소리와 뜻을 살린 요즘 한국 이름을 추천하고, 아이 이름이 베트남어·한국어로 이상하게 들리지 않는지 검사합니다. 한자 획수까지 무료.',
    cta: '이름 추천받기',
  },
  vi: {
    title: 'Đặt tên tiếng Hàn hợp với bạn',
    desc: 'Gợi ý tên Hàn hiện đại giữ âm hoặc nghĩa tên Việt của bạn, và kiểm tra tên của bé có nghe “kỳ” trong tiếng Việt hay tiếng Hàn không. Miễn phí.',
    cta: 'Gợi ý tên Hàn',
  },
};

const HOME_TAEMONG: Record<Lang, { title: string; desc: string; cta: string }> = {
  ko: { title: '태몽 모음 · 아들 태몽, 딸 태몽', desc: '용, 호랑이, 뱀, 돼지, 꽃, 달… 대표 태몽 31가지의 아들·딸 속설과 베트남 풀이를 한눈에.', cta: '태몽 보기' },
  vi: { title: 'Giấc mơ báo có thai', desc: 'Mơ thấy rồng, hổ, rắn, lợn, hoa, trăng… 31 giấc mơ báo con trai hay con gái theo dân gian Hàn – Việt.', cta: 'Xem ngay' },
};

const HOME_JESA: Record<Lang, { title: string; desc: string; cta: string }> = {
  ko: { title: '제사·기일 계산기', desc: '음력 기일을 넣으면 앞으로 10년간 양력 날짜와 요일을 알려 드리고, 휴대폰 달력에 한 번에 저장할 수 있어요.', cta: '기일 계산하기' },
  vi: { title: 'Tính ngày giỗ', desc: 'Nhập ngày giỗ âm lịch để biết ngày dương lịch và thứ trong 10 năm tới, lưu một lần vào lịch điện thoại.', cta: 'Tính ngày giỗ' },
};
