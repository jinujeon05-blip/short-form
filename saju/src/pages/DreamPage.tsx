import { Baby } from 'lucide-react';
import { Emoji } from '../components/Emoji';
import { useMemo, useState } from 'react';
import { CATEGORIES, DREAMS, DREAM_UI, Dream, DreamCategory, POPULAR, dreamBySlug, searchDreams } from '../content/dreams';
import { DREAM_DEEP } from '../content/dreams/deep';
import { FEELINGS, FEELING_UI, Feeling, feelingBySlug, feelingPath, feelingsOfDream, searchFeelings } from '../content/dreams/feelings';
import { useI18n } from '../i18n';
import { Link, RoutePath, hrefFor } from '../router';
import { AdSlot } from '../components/AdSlot';

export const dreamPath = (slug?: string): RoutePath => (slug ? `/dream/${slug}` : '/dream') as RoutePath;

function DreamCard({ d }: { d: Dream }) {
  const { lang } = useI18n();
  const ui = DREAM_UI[lang];
  return (
    <Link to={dreamPath(d.slug)} className="dream-card">
      <span className="dream-emoji" aria-hidden="true"><Emoji e={d.emoji} /></span>
      <span className="dream-card-body">
        <b>{d[lang].name}</b>
        <span className={`tone tone-${d.tone}`}>{ui.tone[d.tone]}</span>
      </span>
    </Link>
  );
}

function FeelingChips({ list, current }: { list: Feeling[]; current?: string }) {
  const { lang } = useI18n();
  return (
    <div className="feeling-chips">
      {list.map((f) => (
        <Link key={f.slug} to={feelingPath(f.slug)} className={`feeling-chip${f.slug === current ? ' on' : ''}`}>
          <Emoji e={f.emoji} /> {f[lang].name}
        </Link>
      ))}
    </div>
  );
}

export function DreamIndexPage({ query }: { query: string }) {
  const { lang } = useI18n();
  const ui = DREAM_UI[lang];
  const initial = useMemo(() => new URLSearchParams(query).get('q') ?? '', [query]);
  const [q, setQ] = useState(initial);
  const [cat, setCat] = useState<DreamCategory | null>(null);

  const results = searchDreams(q).filter((d) => !cat || d.category === cat);
  const feelings = q.trim() ? searchFeelings(q, lang) : [];
  const fui = FEELING_UI[lang];
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

      {feelings.length > 0 && (
        <section className="panel feeling-match">
          <h2 className="panel-title">{fui.matched}</h2>
          <FeelingChips list={feelings} />
        </section>
      )}

      {!q && !cat && (
        <>
          <h2 className="article-h">{fui.heading}</h2>
          <FeelingChips list={FEELINGS} />
          <p className="panel center"><Link to="/taemong"><Baby className="line-icon" aria-hidden="true" /> {lang === 'vi' ? 'Giấc mơ báo có thai: mơ thấy gì sinh con trai, con gái? →' : '태몽 모음: 아들 태몽·딸 태몽 속설 31가지 →'}</Link></p>
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
      ) : feelings.length ? null : (
        <>
          <p className="muted">{ui.noResult(q)}</p>
          <h2 className="article-h">{fui.heading}</h2>
          <FeelingChips list={FEELINGS} />
        </>
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
  const deep = DREAM_DEEP[d.slug]?.[lang];
  // Neighbours in the same category, starting right after this dream, so every page links to different ones.
  const same = DREAMS.filter((o) => o.category === d.category);
  const at = same.findIndex((o) => o.slug === d.slug);
  const related = [...same.slice(at + 1), ...same.slice(0, at)].slice(0, 8);

  return (
    <article className="article dream">
      <p className="eyebrow left"><Link to="/dream">{ui.back}</Link></p>
      <div className="yearly-hero">
        <span className="yearly-emoji" aria-hidden="true"><Emoji e={d.emoji} /></span>
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

      {deep && (
        <>
          <h2 className="article-h">{ui.why}</h2>
          <p>{deep.why}</p>
          <h2 className="article-h">{ui.tips}</h2>
          <ul>
            {deep.tips.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </>
      )}

      <AdSlot name="article" />

      {feelingsOfDream(d.slug).length > 0 && (
        <>
          <h2 className="article-h">{FEELING_UI[lang].ofDream}</h2>
          <FeelingChips list={feelingsOfDream(d.slug)} />
        </>
      )}

      <h2 className="article-h">{ui.related}</h2>
      <div className="dream-grid">
        {related.map((o) => <DreamCard key={o.slug} d={o} />)}
      </div>
      <p className="center"><Link to="/daily">{ui.dailyCta}</Link></p>
      <p className="muted small">{ui.disclaimer}</p>
    </article>
  );
}

export function FeelingPage({ slug }: { slug: string }) {
  const { lang } = useI18n();
  const ui = DREAM_UI[lang];
  const fui = FEELING_UI[lang];
  const f = feelingBySlug(slug)!;
  const x = f[lang];
  const dreams = f.dreams.map((s) => dreamBySlug(s)).filter((d): d is Dream => !!d);

  return (
    <article className="article dream">
      <p className="eyebrow left"><Link to="/dream">{fui.back}</Link></p>
      <div className="yearly-hero">
        <span className="yearly-emoji" aria-hidden="true"><Emoji e={f.emoji} /></span>
        <div>
          <h1 className="article-title">{x.title}</h1>
          <p className="muted small">{fui.heading}</p>
        </div>
      </div>
      <p className="article-lead">{x.lead}</p>

      <h2 className="article-h">{fui.why}</h2>
      <p>{x.why}</p>
      <h2 className="article-h">{fui.tradition}</h2>
      <p>{x.tradition}</p>

      <h2 className="article-h">{fui.dreams}</h2>
      <div className="dream-grid">
        {dreams.map((d) => <DreamCard key={d.slug} d={d} />)}
      </div>

      <h2 className="article-h">{fui.tips}</h2>
      <ul>
        {x.tips.map((t) => <li key={t}>{t}</li>)}
      </ul>

      <AdSlot name="article" />

      <h2 className="article-h">{fui.others}</h2>
      <FeelingChips list={FEELINGS} current={f.slug} />
      <p className="muted small">{ui.disclaimer}</p>
    </article>
  );
}
