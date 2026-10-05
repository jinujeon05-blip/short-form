import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
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

function initialLang(): Lang {
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

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'vi'
      ? 'Minh Nguyệt 明月 · Lịch âm Hàn–Việt, ngày tốt, Tứ trụ'
      : '명월 明月 · 한·베 음력 달력, 좋은 날, 무료 사주';
  }, [lang]);
  const value = useMemo<Ctx>(() => ({
    lang,
    t: dicts[lang],
    setLang: (l) => {
      writeStore('mw.lang', l);
      setLangState(l);
    },
  }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('I18nProvider missing');
  return ctx;
}
