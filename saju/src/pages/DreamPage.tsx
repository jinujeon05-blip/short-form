import { useMemo, useState } from 'react';
import { CATEGORIES, DREAMS, DREAM_UI, Dream, DreamCategory, POPULAR, dreamBySlug, searchDreams } from '../content/dreams';
import { useI18n } from '../i18n';
import { Link, RoutePath, hrefFor } from '../router';
import { AdSlot } from '../components/AdSlot';

export const dreamPath = (slug?: string): RoutePath => (slug ? `/dream/${slug}` : '/dream') as RoutePath;

function DreamCard({ d }: { d: Dream }) {
  const { lang } = useI18n();
  const ui = DREAM_UI[lang];
  return (
    <Link to={dreamPath(d.slug)} className="dream-card">
      <span className="dream-emoji" aria-hidden="true">{d.emoji}</span>
      <span className="dream-card-body">
        <b>{d[lang].name}</b>
        <span className={`tone tone-${d.tone}`}>{ui.tone[d.tone]}</span>
      </span>
    </Link>
  );
}

export function DreamIndexPage({ query }: { query: string }) {
  const { lang } = useI18n();
  const ui = DREAM_UI[lang];
  const initial = useMemo(() => new URLSearchParams(query).get('q') ?? '', [query]);
  const [q, setQ] = useState(initial);
  const [cat, setCat] = useState<DreamCategory | null>(null);

  const results = searchDreams(q).filter((d) => !cat || d.category === cat);
  const onSearch = (value: string) => {
    setQ(value);
    history.replaceState(null, '', hrefFor('/dream', lang, value.trim() ? `?q=${encodeURIComponent(value.trim())}` : ''));
  };

  return (
    <article className="article dream">
      <p className="eyebrow left">夢 · GIẢI MỘNG</p>
      <h1 className="article-title">{ui.title}</h1>
      <p className="article-lead">{ui.lead}</p>

      <input
        className="dream-search"
        type="search"
        value={q}
        placeholder={ui.searchPh}
        aria-label={ui.searchPh}
        onChange={(e) => onSearch(e.target.value)}
      />

      {!q && !cat && (
        <>
          <h2 className="article-h">{ui.popular}</h2>
          <div className="dream-grid">
            {POPULAR.map((s) => <DreamCard key={s} d={dreamBySlug(s)!} />)}
          </div>
        </>
      )}

      <div className="seg wrap dream-cats" role="group">
        <button type="button" className={cat === null ? 'on' : ''} onClick={() => setCat(null)}>{ui.all}</button>
        {CATEGORIES.map((c) => (
          <button key={c} type="button" className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{ui.categories[c]}</button>
        ))}
      </div>

      {results.length ? (
        <div className="dream-grid">
          {results.map((d) => <DreamCard key={d.slug} d={d} />)}
        </div>
      ) : (
        <p className="muted">{ui.noResult(q)}</p>
      )}

      <AdSlot name="article" />
      <p className="muted small">{ui.disclaimer}</p>
      <p className="muted small">{ui.note}</p>
    </article>
  );
}

export function DreamDetailPage({ slug }: { slug: string }) {
  const { lang } = useI18n();
  const ui = DREAM_UI[lang];
  const d = dreamBySlug(slug)!;
  const x = d[lang];
  const related = DREAMS.filter((o) => o.category === d.category && o.slug !== d.slug).slice(0, 8);

  return (
    <article className="article dream">
      <p className="eyebrow left"><Link to="/dream">{ui.back}</Link></p>
      <div className="yearly-hero">
        <span className="yearly-emoji" aria-hidden="true">{d.emoji}</span>
        <div>
          <h1 className="article-title">{ui.pageTitle(x.name)}</h1>
          <p><span className={`tone tone-${d.tone}`}>{ui.tone[d.tone]}</span> <span className="muted small">{ui.categories[d.category]}</span></p>
        </div>
      </div>
      <p className="article-lead">{x.summary}</p>

      <div className="dream-views">
        <section className="panel">
          <h2 className="panel-title">{ui.korea}</h2>
          <p>{x.korea}</p>
        </section>
        <section className="panel">
          <h2 className="panel-title">{ui.vietnam}</h2>
          <p>{x.vietnam}</p>
        </section>
      </div>

      <h2 className="article-h">{ui.cases}</h2>
      <dl className="dream-cases">
        {x.cases.map(([situation, meaning]) => (
          <div key={situation}>
            <dt>{situation}</dt>
            <dd>{meaning}</dd>
          </div>
        ))}
      </dl>

      <AdSlot name="article" />

      <h2 className="article-h">{ui.related}</h2>
      <div className="dream-grid">
        {related.map((o) => <DreamCard key={o.slug} d={o} />)}
      </div>
      <p className="center"><Link to="/daily">{ui.dailyCta}</Link></p>
      <p className="muted small">{ui.disclaimer}</p>
    </article>
  );
}
