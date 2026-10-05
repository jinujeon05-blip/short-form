import { useMemo, useState } from 'react';
import { vietnameseToHangul } from '../engine/hangul';
import { parseKorean, romanizeName } from '../engine/names';
import { HANGUL, RULES } from '../content/hangul';
import { useI18n } from '../i18n';
import { Link, hrefFor } from '../router';
import { AdSlot } from '../components/AdSlot';

type Mode = 'vi' | 'ko';

const EXAMPLES: Record<Mode, string[]> = {
  vi: ['Nguyễn Thị Lan', 'Trần Văn Minh', 'Lê Thanh Hương', 'Phạm Ngọc Anh', 'Hoàng Quốc Tuấn', 'Đà Nẵng', 'Phú Quốc'],
  ko: ['김민준', '이서연', '박지훈', '최수아', '남궁민'],
};

export function HangulPage({ query }: { query: string }) {
  const { lang } = useI18n();
  const x = HANGUL[lang];
  const initial = useMemo(() => {
    const p = new URLSearchParams(query);
    return { mode: (p.get('m') === 'ko' ? 'ko' : 'vi') as Mode, q: p.get('q') ?? '' };
  }, [query]);
  const [mode, setMode] = useState<Mode>(initial.mode);
  const [text, setText] = useState(initial.q);
  const [shown, setShown] = useState(initial.q);
  const [copied, setCopied] = useState(false);

  const run = (value: string, m: Mode = mode) => {
    setShown(value);
    const q = value.trim() ? `?${m === 'ko' ? 'm=ko&' : ''}q=${encodeURIComponent(value.trim())}` : '';
    history.replaceState(null, '', hrefFor('/hangul', lang, q));
  };
  const switchMode = (m: Mode) => {
    setMode(m);
    setText('');
    setShown('');
    history.replaceState(null, '', hrefFor('/hangul', lang, m === 'ko' ? '?m=ko' : ''));
  };

  const vi = mode === 'vi' && shown.trim() ? vietnameseToHangul(shown) : null;
  const ko = mode === 'ko' && shown.trim() ? (() => {
    const parts = parseKorean(shown);
    return parts.length ? romanizeName(parts[0].input, parts.slice(1).map((p) => p.input)) : '';
  })() : '';
  const output = vi ? vi.hangul : ko;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <article className="article hangul">
      <p className="eyebrow left">한글 · HANGUL · PHIÊN ÂM</p>
      <h1 className="article-title">{x.title}</h1>
      <p className="article-lead">{x.lead}</p>

      <div className="seg" role="group">
        <button type="button" className={mode === 'vi' ? 'on' : ''} onClick={() => switchMode('vi')}>{x.modeVi}</button>
        <button type="button" className={mode === 'ko' ? 'on' : ''} onClick={() => switchMode('ko')}>{x.modeKo}</button>
      </div>

      <form className="hangul-form" onSubmit={(e) => { e.preventDefault(); run(text); }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={mode === 'vi' ? x.phVi : x.phKo}
          aria-label={mode === 'vi' ? x.modeVi : x.modeKo}
          maxLength={80}
          lang={mode === 'vi' ? 'vi' : 'ko'}
        />
        <button className="btn btn-gold" type="submit">{x.convert}</button>
      </form>
      <div className="other-zodiacs">
        <span className="muted small">{x.examples}:</span>
        {EXAMPLES[mode].map((e) => (
          <button key={e} type="button" className="chip" onClick={() => { setText(e); run(e); }}>{e}</button>
        ))}
      </div>

      {output && (
        <div className="panel hangul-result">
          <span className="muted small">{mode === 'vi' ? x.result : 'Romanization'}</span>
          <p className="hangul-big" lang={mode === 'vi' ? 'ko' : 'en'}>{output}</p>
          {vi?.custom && <p className="gold">{x.custom(vi.custom)}</p>}
          {vi && vi.unknown.length > 0 && <p className="bad small">{x.unknown(vi.unknown.join(', '))}</p>}
          {mode === 'ko' && <p className="muted small">{x.romanNote}</p>}
          <button type="button" className="btn btn-ghost" onClick={copy}>{copied ? x.copied : `📋 ${x.copy}`}</button>
        </div>
      )}

      {vi && vi.words.length > 0 && (
        <div className="table-wrap">
          <table className="month-table hangul-table">
            <thead><tr><th>{x.colInput}</th><th>{x.colHangul}</th><th>{x.colParts}</th></tr></thead>
            <tbody>
              {vi.words.map((w, i) => (
                <tr key={`${w.input}-${i}`}>
                  <th scope="row">{w.input}</th>
                  <td className="gold">{w.hangul}</td>
                  <td className="small muted">{[w.initial || '–', w.nucleus, w.final || '–'].join(' · ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="small">
        <Link to="/name">{x.hanjaLink}</Link>
        <br />
        <span className="muted">{x.hanjaDesc}</span>
      </p>

      <AdSlot name="article" />

      <h2 className="article-h">{x.rulesTitle}</h2>
      <p className="muted">{x.rulesDesc}</p>
      <div className="rule-grid">
        {([['consonants', x.consonants], ['vowels', x.vowels], ['finals', x.finals]] as const).map(([k, label]) => (
          <div className="panel" key={k}>
            <h3 className="panel-title">{label}</h3>
            <dl className="rule-list">
              {RULES[k].map(([a, b]) => (
                <div key={a}><dt>{a}</dt><dd>{b}</dd></div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <h2 className="article-h">{x.aboutTitle}</h2>
      {x.about.map((a) => (
        <section key={a.h}>
          <h3>{a.h}</h3>
          <p>{a.p}</p>
        </section>
      ))}
    </article>
  );
}
