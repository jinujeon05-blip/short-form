import type { DepthText } from '../content/depthTypes';

/** Page-specific explanatory text under a page built from a shared template. */
export function Depth({ text }: { text?: DepthText }) {
  if (!text) return null;
  return (
    <section className="section tool-guide">
      <h2 className="article-h">{text.title}</h2>
      {text.sections.map((s) => (
        <section key={s.h}>
          <h3>{s.h}</h3>
          <p>{s.p}</p>
        </section>
      ))}
    </section>
  );
}
