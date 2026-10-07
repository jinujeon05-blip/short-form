// Title / description / h1 for every route, shared by the app and the prerender script.
import seo from './seo.json';
import articles from './content/articles.json';
import { YEARLY } from './content/yearly';
import { DAILY } from './content/daily';
import { PURPOSE_TEXT } from './content/purposes';
import type { Purpose } from './engine/almanac';
import { ko } from './i18n/ko';
import { vi } from './i18n/vi';
import type { Lang } from './i18n';
import { ANIMAL_SLUGS } from './engine/yearly';
import { BRANCH_HANJA, STEM_HANJA, cycleBranch, cycleStem, yearCycle } from './engine/ganzhi';

export interface PageMeta {
  title: string;
  description: string;
  h1: string;
}

const BRAND: Record<Lang, string> = { ko: '명월', vi: 'Minh Nguyệt' };
const DICT = { ko, vi };

export function metaFor(path: string, lang: Lang): PageMeta {
  const guide = articles.guides.find((g) => path === `/guide/${g.slug}`);
  if (guide) {
    const doc = guide[lang];
    return { title: `${doc.title} | ${BRAND[lang]}`, description: doc.description, h1: doc.title };
  }
  const cp = path.match(/^\/calendar\/([a-z]+)$/);
  if (cp && PURPOSE_TEXT[lang].pages[cp[1] as Purpose]) {
    const pg = PURPOSE_TEXT[lang].pages[cp[1] as Purpose];
    return { title: pg.title, description: pg.description, h1: pg.h1 };
  }
  const dz = path.match(/^\/daily\/([a-z]+)$/);
  if (dz) {
    const t = DICT[lang];
    const z = ANIMAL_SLUGS.indexOf(dz[1]);
    const animal = lang === 'vi' ? `${t.branches[z]} (${t.animals[z]})` : t.animals[z];
    const h1 = DAILY[lang].zodiacTitle(animal);
    return { title: `${h1} · ${lang === 'vi' ? 'Tử vi hằng ngày' : '띠별 운세'} | ${BRAND[lang]}`, description: DAILY[lang].zodiacDesc(animal), h1 };
  }
  const f = path.match(/^\/fortune\/(\d{4})(?:\/([a-z]+))?$/);
  if (f) {
    const year = Number(f[1]);
    const yc = yearCycle(year);
    const t = DICT[lang];
    const y = YEARLY[lang];
    const ganzhi = y.ganzhi(t.stems[cycleStem(yc)], t.branches[cycleBranch(yc)], STEM_HANJA[cycleStem(yc)] + BRANCH_HANJA[cycleBranch(yc)]);
    if (f[2]) {
      const z = ANIMAL_SLUGS.indexOf(f[2]);
      const animal = lang === 'vi' ? `${t.branches[z]} (${t.animals[z]})` : t.animals[z];
      const h1 = y.zodiacTitle(year, animal);
      return { title: `${h1} · ${ganzhi} | ${BRAND[lang]}`, description: y.zodiacDesc(year, animal, ganzhi), h1 };
    }
    const h1 = y.indexTitle(year, ganzhi);
    return { title: `${h1} | ${BRAND[lang]}`, description: y.indexDesc, h1 };
  }
  return (seo as Record<Lang, Record<string, PageMeta>>)[lang][path] ?? (seo as Record<Lang, Record<string, PageMeta>>)[lang]['/'];
}
