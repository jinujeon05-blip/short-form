import { createContext, ReactNode, useContext, useMemo } from 'react';
import { ko, Dict } from './ko';
import { vi } from './vi';

export type Lang = 'ko' | 'vi';
const dicts: Record<Lang, Dict> = { ko, vi };

export function readStore(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStore(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

/** Language the visitor prefers when the URL does not say: saved choice, then browser language. */
export function preferredLang(): Lang {
  const saved = readStore('mw.lang');
  if (saved === 'ko' || saved === 'vi') return saved;
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('vi') ? 'vi' : 'ko';
}

interface Ctx {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<Ctx | null>(null);

/** The language comes from the URL (/vi/…); `onChangeLang` switches to the other language's URL. */
export function I18nProvider({ lang, onChangeLang, children }: {
  lang: Lang;
  onChangeLang: (l: Lang) => void;
  children: ReactNode;
}) {
  const value = useMemo<Ctx>(() => ({
    lang,
    t: dicts[lang],
    setLang: (l) => {
      writeStore('mw.lang', l);
      onChangeLang(l);
    },
  }), [lang, onChangeLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('I18nProvider missing');
  return ctx;
}
