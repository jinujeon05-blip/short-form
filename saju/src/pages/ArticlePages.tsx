import config from '../../site.config.json';
import articles from '../content/articles.json';
import { Lang, useI18n } from '../i18n';
import { Link, RoutePath } from '../router';
import { Section } from '../components/common';
import { AdSlot } from '../components/AdSlot';

export type Block = { h?: string; p?: string; ul?: string[] };
interface Doc {
  title: string;
  description: string;
  blocks: Block[];
  cta?: string;
}
export interface Guide {
  slug: string;
  date: string;
  cta: string;
  ko: Doc;
  vi: Doc;
}

export const GUIDES = articles.guides as Guide[];
const PAGES = articles.pages as Record<'about' | 'privacy' | 'terms', Record<Lang, Doc>>;

function withEmail(text: string, pending: string) {
  return text.replace(/\{\{email\}\}/g, config.contactEmail || pending);
}

function Blocks({ blocks, adAfter }: { blocks: Block[]; adAfter?: number }) {
  const { t } = useI18n();
  return (
    <>
      {blocks.map((b, i) => (
        <div key={i}>
          {b.h && <h2 className="article-h">{b.h}</h2>}
          {b.p && <p>{withEmail(b.p, t.guide.emailPending)}</p>}
          {b.ul && (
            <ul className="article-list">
              {b.ul.map((li) => <li key={li}>{li}</li>)}
            </ul>
          )}
          {adAfter === i && <AdSlot name="article" />}
        </div>
      ))}
    </>
  );
}

export function GuideList({ limit }: { limit?: number }) {
  const { lang, t } = useI18n();
  return (
    <div className="guide-grid">
      {GUIDES.slice(0, limit).map((g) => (
        <Link key={g.slug} to={`/guide/${g.slug}`} className="guide-card">
          <h3>{g[lang].title}</h3>
          <p className="muted small">{g[lang].description}</p>
          <span className="gold small">{t.guide.read} →</span>
        </Link>
      ))}
    </div>
  );
}

export function GuideIndexPage() {
  const { t } = useI18n();
  return (
    <Section eyebrow="讀 · BÀI VIẾT" title={t.guide.title}>
      <GuideList />
    </Section>
  );
}

export function GuidePage({ slug }: { slug: string }) {
  const { lang, t } = useI18n();
  const g = GUIDES.find((x) => x.slug === slug) ?? GUIDES[0];
  const doc = g[lang];
  const others = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 3);
  return (
    <article className="article">
      <p className="eyebrow left">
        <Link to="/guide">← {t.guide.back}</Link>
      </p>
      <h1 className="article-title">{doc.title}</h1>
      <p className="muted small">{t.guide.updated} {g.date}</p>
      <p className="article-lead">{doc.description}</p>
      <Blocks blocks={doc.blocks} adAfter={Math.min(3, doc.blocks.length - 1)} />
      {doc.cta && (
        <p className="center">
          <Link to={g.cta as RoutePath} className="btn btn-gold">{doc.cta} →</Link>
        </p>
      )}
      <AdSlot name="article" />
      <h2 className="article-h">{t.guide.related}</h2>
      <ul className="article-list">
        {others.map((o) => (
          <li key={o.slug}><Link to={`/guide/${o.slug}`}>{o[lang].title}</Link></li>
        ))}
      </ul>
    </article>
  );
}

export function InfoPage({ page }: { page: 'about' | 'privacy' | 'terms' }) {
  const { lang } = useI18n();
  const doc = PAGES[page][lang];
  return (
    <article className="article">
      <h1 className="article-title">{doc.title}</h1>
      <Blocks blocks={doc.blocks} />
    </article>
  );
}
