// Path-based routing: Korean at /…, Vietnamese at /vi/…
import { AnchorHTMLAttributes, MouseEvent, ReactNode, createContext, useContext } from 'react';
import type { Lang } from './i18n';
import articles from './content/articles.json';
import { ANIMAL_SLUGS, FORTUNE_YEARS } from './engine/yearly';

export const ROUTES = ['/', '/calendar', '/match', '/name', '/saju', '/samjae', '/daily', '/age', '/hangul', '/guide', '/about', '/privacy', '/terms'] as const;
export const GUIDE_SLUGS: string[] = articles.guides.map((g) => g.slug);
/** A static route, or /guide/<slug> */
export type RoutePath = (typeof ROUTES)[number] | `/guide/${string}` | `/fortune/${string}` | `/daily/${string}`;

export function isKnownPath(p: string): p is RoutePath {
  if ((ROUTES as readonly string[]).includes(p)) return true;
  const m = p.match(/^\/guide\/([a-z0-9-]+)$/);
  if (m) return GUIDE_SLUGS.includes(m[1]);
  const dz = p.match(/^\/daily\/([a-z]+)$/);
  if (dz) return ANIMAL_SLUGS.includes(dz[1]);
  const f = p.match(/^\/fortune\/(\d{4})(?:\/([a-z]+))?$/);
  return !!f && FORTUNE_YEARS.includes(Number(f[1])) && (!f[2] || ANIMAL_SLUGS.includes(f[2]));
}

export interface Route {
  lang: Lang;
  path: RoutePath;
  search: string;
}

const NAV_EVENT = 'mw:navigate';

export function parseLocation(pathname: string, search: string): Route {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const isVi = clean === '/vi' || clean.startsWith('/vi/');
  const rest = isVi ? clean.slice(3) || '/' : clean;
  const path: RoutePath = isKnownPath(rest) ? rest : '/';
  return { lang: isVi ? 'vi' : 'ko', path, search };
}

export function hrefFor(path: RoutePath, lang: Lang, search = ''): string {
  const base = lang === 'vi' ? (path === '/' ? '/vi' : `/vi${path}`) : path;
  return base + search;
}

export function navigate(url: string, replace = false) {
  if (replace) history.replaceState(null, '', url);
  else history.pushState(null, '', url);
  window.dispatchEvent(new Event(NAV_EVENT));
}

export function subscribe(cb: () => void): () => void {
  window.addEventListener('popstate', cb);
  window.addEventListener(NAV_EVENT, cb);
  return () => {
    window.removeEventListener('popstate', cb);
    window.removeEventListener(NAV_EVENT, cb);
  };
}

/** Converts first-release links like /#/saju?b=… to /saju?b=… */
export function legacyHashTarget(hash: string, lang: Lang): string | null {
  if (!hash.startsWith('#/')) return null;
  const [p, q] = hash.slice(1).split('?');
  const path: RoutePath = isKnownPath(p) ? p : '/';
  return hrefFor(path, lang, q ? `?${q}` : '');
}

export const RouteContext = createContext<Route>({ lang: 'ko', path: '/', search: '' });
export const useRoute = () => useContext(RouteContext);

/** Internal link that keeps the current language and navigates without a reload. */
export function Link({ to, search = '', children, onClick, ...rest }: {
  to: RoutePath;
  search?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const { lang } = useRoute();
  const href = hrefFor(to, lang, search);
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(href);
  };
  return <a href={href} onClick={handle} {...rest}>{children}</a>;
}
