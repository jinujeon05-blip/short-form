import { useEffect, useState } from 'react';
import { useI18n } from './i18n';
import { MoonLogo } from './components/common';
import { Home } from './pages/Home';
import { CalendarPage } from './pages/CalendarPage';
import { SajuPage } from './pages/SajuPage';
import { MatchPage } from './pages/MatchPage';

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [path, query = ''] = raw.split('?');
  return { path, query };
}

export function App() {
  const { t, lang, setLang } = useI18n();
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onHash = () => {
      const next = parseHash();
      setRoute((prev) => {
        if (prev.path !== next.path) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const links = [
    { href: '#/', path: '/', label: t.nav.today },
    { href: '#/calendar', path: '/calendar', label: t.nav.calendar },
    { href: '#/match', path: '/match', label: t.nav.match },
    { href: '#/saju', path: '/saju', label: t.nav.saju },
  ];

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#/">
            <MoonLogo />
            <span className="brand-text">
              <span className="brand-name">{t.brand}</span>
              <span className="brand-sub">{t.brandSub}</span>
            </span>
          </a>
          <nav className="nav" aria-label="main">
            {links.map((l) => (
              <a key={l.path} href={l.href} className={route.path === l.path ? 'on' : ''}>{l.label}</a>
            ))}
          </nav>
          <div className="lang" role="group" aria-label="language">
            <button className={lang === 'ko' ? 'on' : ''} onClick={() => setLang('ko')} aria-pressed={lang === 'ko'}>KO</button>
            <button className={lang === 'vi' ? 'on' : ''} onClick={() => setLang('vi')} aria-pressed={lang === 'vi'}>VI</button>
          </div>
        </div>
      </header>

      <main className="main">
        {route.path === '/calendar' ? (
          <CalendarPage />
        ) : route.path === '/saju' ? (
          <SajuPage query={route.query} />
        ) : route.path === '/match' ? (
          <MatchPage query={route.query} />
        ) : (
          <Home />
        )}
      </main>

      <footer className="footer">
        <div className="footer-brand"><MoonLogo size={28} /> <b>{t.brand}</b> <span className="muted">明月</span></div>
        <p>{t.footer.about}</p>
        <p className="muted small">{t.footer.disclaimer} {t.footer.privacy}</p>
        <p className="muted small">© {new Date().getFullYear()} Minh Nguyệt · 명월</p>
      </footer>
    </div>
  );
}
