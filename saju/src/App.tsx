import { useCallback, useEffect, useState } from 'react';
import { I18nProvider, Lang, preferredLang, useI18n } from './i18n';
import { Link, Route, RouteContext, RoutePath, hrefFor, legacyHashTarget, navigate, parseLocation, subscribe } from './router';
import { MoonLogo } from './components/common';
import { Home } from './pages/Home';
import { CalendarPage } from './pages/CalendarPage';
import { SajuPage } from './pages/SajuPage';
import { MatchPage } from './pages/MatchPage';
import { NamePage } from './pages/NamePage';
import { DAILY } from './content/daily';
import type { Purpose } from './engine/almanac';
import { HazardPage } from './pages/HazardPage';
import { AgePage } from './pages/AgePage';
import { HangulPage } from './pages/HangulPage';
import { HolidaysPage } from './pages/HolidaysPage';
import { DailyIndexPage, DailyZodiacPage } from './pages/DailyPage';
import { metaFor } from './meta';
import { GuideIndexPage, GuidePage, InfoPage } from './pages/ArticlePages';
import { YearlyIndexPage, YearlyZodiacPage } from './pages/YearlyPage';
import { ANIMAL_SLUGS } from './engine/yearly';

const current = () => parseLocation(window.location.pathname, window.location.search);

function initialRoute(): Route {
  // Links shared before path routing (/#/saju?b=…) keep working.
  const legacy = legacyHashTarget(window.location.hash, preferredLang());
  if (legacy) history.replaceState(null, '', legacy);
  // Vietnamese visitors landing on the Korean home go to /vi.
  else if (window.location.pathname === '/' && !window.location.search && preferredLang() === 'vi') {
    history.replaceState(null, '', '/vi');
  }
  return current();
}

export function App() {
  const [route, setRoute] = useState<Route>(initialRoute);

  useEffect(() => subscribe(() => {
    const next = current();
    setRoute((prev) => {
      if (prev.path !== next.path) window.scrollTo(0, 0);
      return next;
    });
  }), []);

  useEffect(() => {
    const meta = metaFor(route.path, route.lang);
    document.documentElement.lang = route.lang;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [route.lang, route.path]);

  const changeLang = useCallback((l: Lang) => {
    const r = current();
    navigate(hrefFor(r.path, l, r.search));
  }, []);

  return (
    <RouteContext.Provider value={route}>
      <I18nProvider lang={route.lang} onChangeLang={changeLang}>
        <Shell route={route} />
      </I18nProvider>
    </RouteContext.Provider>
  );
}

function Shell({ route }: { route: Route }) {
  const { t, lang, setLang } = useI18n();
  const links: { path: RoutePath; label: string }[] = [
    { path: '/', label: t.nav.today },
    { path: '/calendar', label: t.nav.calendar },
    { path: '/match', label: t.nav.match },
    { path: '/name', label: t.nav.name },
    { path: '/saju', label: t.nav.saju },
  ];

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" to="/">
            <MoonLogo />
            <span className="brand-text">
              <span className="brand-name">{t.brand}</span>
              <span className="brand-sub">{t.brandSub}</span>
            </span>
          </Link>
          <nav className="nav" aria-label="main">
            {links.map((l) => (
              <Link key={l.path} to={l.path} className={route.path === l.path ? 'on' : ''}>{l.label}</Link>
            ))}
          </nav>
          <div className="lang" role="group" aria-label="language">
            <a
              href={hrefFor(route.path, 'ko', route.search)}
              hrefLang="ko"
              className={lang === 'ko' ? 'on' : ''}
              onClick={(e) => { e.preventDefault(); setLang('ko'); }}
            >
              KO
            </a>
            <a
              href={hrefFor(route.path, 'vi', route.search)}
              hrefLang="vi"
              className={lang === 'vi' ? 'on' : ''}
              onClick={(e) => { e.preventDefault(); setLang('vi'); }}
            >
              VI
            </a>
          </div>
        </div>
      </header>

      <main className="main">
        {route.path === '/calendar' || route.path.startsWith('/calendar/') ? (
          <CalendarPage key={route.path} purpose={route.path === '/calendar' ? null : (route.path.slice(10) as Purpose)} />
        ) : route.path === '/saju' ? (
          <SajuPage query={route.search} />
        ) : route.path === '/match' ? (
          <MatchPage query={route.search} />
        ) : route.path === '/name' ? (
          <NamePage query={route.search} />
        ) : route.path === '/holidays' ? (
          <HolidaysPage />
        ) : route.path === '/hangul' ? (
          <HangulPage query={route.search} />
        ) : route.path === '/age' ? (
          <AgePage query={route.search} />
        ) : route.path === '/daily' ? (
          <DailyIndexPage query={route.search} />
        ) : route.path.startsWith('/daily/') ? (
          <DailyZodiacPage zodiac={ANIMAL_SLUGS.indexOf(route.path.slice(7))} query={route.search} />
        ) : route.path === '/samjae' ? (
          <HazardPage query={route.search} />
        ) : route.path.startsWith('/fortune/') ? (
          <YearlyRoute path={route.path} />
        ) : route.path === '/guide' ? (
          <GuideIndexPage />
        ) : route.path.startsWith('/guide/') ? (
          <GuidePage slug={route.path.slice(7)} />
        ) : route.path === '/about' || route.path === '/method' || route.path === '/privacy' || route.path === '/terms' ? (
          <InfoPage page={route.path.slice(1) as 'about' | 'method' | 'privacy' | 'terms'} />
        ) : (
          <Home />
        )}
      </main>

      <footer className="footer">
        <div className="footer-brand"><MoonLogo size={28} /> <b>{t.brand}</b> <span className="muted">明月</span></div>
        <p>{t.footer.about}</p>
        <nav className="footer-links" aria-label="footer">
          {links.map((l) => <Link key={l.path} to={l.path}>{l.label}</Link>)}
          <Link to="/daily">{DAILY[lang].indexTitle}</Link>
          <Link to="/fortune/2027">{YEARLY_LINK[lang]}</Link>
          <Link to="/samjae">{SAMJAE_LINK[lang]}</Link>
          <Link to="/age">{AGE_LINK[lang]}</Link>
          <Link to="/hangul">{HANGUL_LINK[lang]}</Link>
          <Link to="/holidays">{HOLIDAY_LINK[lang]}</Link>
          <Link to="/guide">{t.guide.title}</Link>
          <Link to="/about">{t.info.about}</Link>
          <Link to="/method">{METHOD_LINK[lang]}</Link>
          <Link to="/privacy">{t.info.privacy}</Link>
          <Link to="/terms">{t.info.terms}</Link>
          <a href={hrefFor(route.path, lang === 'ko' ? 'vi' : 'ko')} hrefLang={lang === 'ko' ? 'vi' : 'ko'}>
            {lang === 'ko' ? 'Tiếng Việt' : '한국어'}
          </a>
        </nav>
        <p className="muted small">{t.footer.disclaimer} {t.footer.privacy}</p>
        <p className="muted small">© {new Date().getFullYear()} Minh Nguyệt · 명월</p>
      </footer>
    </div>
  );
}

const YEARLY_LINK: Record<Lang, string> = { ko: '2027 신년운세', vi: 'Tử vi 2027' };
const METHOD_LINK: Record<Lang, string> = { ko: '계산 방식', vi: 'Cách tính' };
const HOLIDAY_LINK: Record<Lang, string> = { ko: '설날·Tết 날짜 비교', vi: 'Tết Việt – Hàn' };
const HANGUL_LINK: Record<Lang, string> = { ko: '한글 표기 변환', vi: 'Phiên âm Hangul' };
const AGE_LINK: Record<Lang, string> = { ko: '나이 계산기', vi: 'Tính tuổi' };
const SAMJAE_LINK: Record<Lang, string> = { ko: '삼재 계산기', vi: 'Tam Tai · Kim Lâu' };

function YearlyRoute({ path }: { path: string }) {
  const [, , year, slug] = path.split('/');
  return slug ? <YearlyZodiacPage year={Number(year)} zodiac={ANIMAL_SLUGS.indexOf(slug)} /> : <YearlyIndexPage year={Number(year)} />;
}
