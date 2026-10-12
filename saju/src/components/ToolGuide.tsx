import articles from '../content/articles.json';
import { TOOL_GUIDES, ToolGuideId } from '../content/toolGuides';
import { useI18n } from '../i18n';
import { Link } from '../router';

/** Explanatory text under a tool, so the page carries real content before anyone uses the tool. */
export function ToolGuide({ id }: { id: ToolGuideId }) {
  const { lang } = useI18n();
  const g = TOOL_GUIDES[id];
  const x = g[lang];
  const related = g.guides.map((s) => articles.guides.find((a) => a.slug === s)).filter((a): a is (typeof articles.guides)[number] => !!a);
  return (
    <section className="section tool-guide">
      <h2 className="article-h">{x.title}</h2>
      {x.sections.map((s) => (
        <section key={s.h}>
          <h3>{s.h}</h3>
          <p>{s.p}</p>
        </section>
      ))}
      {related.length > 0 && (
        <ul className="article-list">
          {related.map((a) => <li key={a.slug}><Link to={`/guide/${a.slug}`}>{a[lang].title} →</Link></li>)}
        </ul>
      )}
    </section>
  );
}
