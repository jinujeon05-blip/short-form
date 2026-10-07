import { Sparkles } from 'lucide-react';
import { Emoji } from '../components/Emoji';
import { useState } from 'react';
import { Lean, TAEMONG, TAEMONG_TEXT } from '../content/taemong';
import { useI18n } from '../i18n';
import { Link } from '../router';
import { AdSlot } from '../components/AdSlot';
import { dreamPath } from './DreamPage';

export function TaemongPage() {
  const { lang } = useI18n();
  const x = TAEMONG_TEXT[lang];
  const [filter, setFilter] = useState<'all' | Lean>('all');
  const list = TAEMONG.filter((s) => filter === 'all' || s.lean === filter);

  return (
    <article className="article dream">
      <p className="eyebrow left">{x.eyebrow}</p>
      <h1 className="article-title">{x.title}</h1>
      <p className="article-lead">{x.lead}</p>

      <div className="seg wrap dream-cats" role="group">
        {(['all', 'boy', 'girl', 'either'] as const).map((k) => (
          <button key={k} type="button" className={filter === k ? 'on' : ''} onClick={() => setFilter(k)}>{x.filters[k]}</button>
        ))}
      </div>

      <div className="taemong-grid">
        {list.map((s) => (
          <Link key={s.slug} to={dreamPath(s.slug)} className="panel taemong-card">
            <span className="taemong-head">
              <span className="dream-emoji" aria-hidden="true"><Emoji e={s.emoji} /></span>
              <b>{s[lang].name}</b>
              <span className={`tag lean-${s.lean}`}>{x.leanTag[s.lean]}</span>
            </span>
            <span className="small">{s[lang].meaning}</span>
            <span className="small gold">{x.more}</span>
          </Link>
        ))}
      </div>

      <p className="muted small">{x.disclaimer}</p>
      <AdSlot name="article" />

      <h2 className="article-h">{x.faqTitle}</h2>
      {x.faq.map((f) => (
        <section key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </section>
      ))}

      <p className="panel center"><Link to="/naming"><Sparkles className="line-icon" aria-hidden="true" /> {x.toNaming}</Link></p>
      <p className="center"><Link to="/dream">{x.toDream}</Link></p>
    </article>
  );
}
