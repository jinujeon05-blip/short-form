import { CircleCheck, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { NAMING } from '../content/naming';
import { KO_CHARS } from '../content/koNames';
import {
  KO_SURNAME_HANJA, Suggestion, fourGrids, fullRoman, hanVietOf, hanjaFor, koreanNameFlags, loadStrokeTable,
  readVietName, strokesOf, suggestKoreanNames, vietnameseNameCheck,
} from '../engine/naming';
import { romanizeSyllable } from '../engine/names';
import { useI18n } from '../i18n';
import { Link, hrefFor } from '../router';
import { AdSlot } from '../components/AdSlot';
import { ShareImageButton } from '../components/ShareImage';
import { drawNameCard } from '../components/cards';

type Tab = 'suggest' | 'check';
type GenderPick = 'auto' | 'f' | 'm' | 'all';

const SUGGEST_EXAMPLES = ['Nguyễn Minh Anh', 'Trần Thị Thu Hà', 'Lê Văn Hùng', 'Phạm Ngọc Linh', 'Hoàng Gia Bảo'];
const CHECK_EXAMPLES = ['김서준', '이구', '박하은', 'Trần Ngọc Bích', 'Nguyễn Văn Phúc'];
const COMPOUND = ['남궁', '제갈', '선우', '황보', '독고', '사공'];
const hasHangul = (s: string) => /[가-힣]/.test(s);

export function NamingPage({ query }: { query: string }) {
  const { t, lang } = useI18n();
  const x = NAMING[lang];
  const init = useMemo(() => new URLSearchParams(query), [query]);
  const [tab, setTab] = useState<Tab>(init.get('t') === 'c' ? 'check' : 'suggest');
  const [text, setText] = useState(init.get('t') === 'c' ? '' : init.get('q') ?? '');
  const [shown, setShown] = useState(init.get('t') === 'c' ? '' : init.get('q') ?? '');
  const [gender, setGender] = useState<GenderPick>('auto');
  const [checkText, setCheckText] = useState(init.get('t') === 'c' ? init.get('q') ?? '' : '');
  const [checked, setChecked] = useState(init.get('t') === 'c' ? init.get('q') ?? '' : '');
  const [direct, setDirect] = useState(init.get('h') ?? '');
  const [picks, setPicks] = useState<Record<number, string>>({});

  useEffect(() => {
    const p = new URLSearchParams();
    if (tab === 'check') {
      p.set('t', 'c');
      if (checked) p.set('q', checked);
      if (direct) p.set('h', direct);
    } else if (shown) p.set('q', shown);
    const s = p.toString();
    history.replaceState(null, '', hrefFor('/naming', lang, s ? `?${s}` : ''));
  }, [tab, shown, checked, direct, lang]);

  const openCheck = (name: string, hanja: string) => {
    setTab('check');
    setCheckText(name);
    setChecked(name);
    setDirect(hanja);
    setPicks({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="article naming">
      <p className="eyebrow left">{x.eyebrow}</p>
      <h1 className="article-title">{x.title}</h1>
      <p className="article-lead">{x.lead}</p>

      <div className="seg" role="group">
        <button type="button" className={tab === 'suggest' ? 'on' : ''} onClick={() => setTab('suggest')}>{x.tabSuggest}</button>
        <button type="button" className={tab === 'check' ? 'on' : ''} onClick={() => setTab('check')}><Search className="line-icon" aria-hidden="true" /> {x.tabCheck}</button>
      </div>

      {tab === 'suggest' ? (
        <SuggestTab
          text={text} setText={setText} shown={shown} setShown={setShown}
          gender={gender} setGender={setGender} onCheck={openCheck}
        />
      ) : (
        <CheckTab
          text={checkText} setText={setCheckText} checked={checked}
          setChecked={(v) => { setChecked(v); setPicks({}); setDirect(''); }}
          direct={direct} setDirect={setDirect} picks={picks} setPicks={setPicks}
          onSuggest={(v) => { setTab('suggest'); setText(v); setShown(v); }}
        />
      )}

      <AdSlot name="article" />

      <h2 className="article-h">{x.aboutTitle}</h2>
      {x.about.map((a) => (
        <section key={a.h}>
          <h3>{a.h}</h3>
          <p>{a.p}</p>
        </section>
      ))}
      <p className="muted small">{x.disclaimer}</p>
      <p className="small"><Link to="/name">{t.name.title} →</Link> · <Link to="/hangul">{lang === 'vi' ? 'Phiên âm Hangul' : '한글 표기 변환'} →</Link></p>
    </article>
  );
}

function SuggestTab({ text, setText, shown, setShown, gender, setGender, onCheck }: {
  text: string; setText: (v: string) => void; shown: string; setShown: (v: string) => void;
  gender: GenderPick; setGender: (g: GenderPick) => void; onCheck: (name: string, hanja: string) => void;
}) {
  const { t, lang } = useI18n();
  const x = NAMING[lang];
  const v = shown.trim() ? readVietName(shown) : null;
  const g = gender === 'auto' ? v?.gender ?? 'all' : gender;
  const list = v && v.given.length ? suggestKoreanNames(v, g) : [];
  const [sel, setSel] = useState(0);
  const pick = list[Math.min(sel, list.length - 1)];

  const run = (value: string) => { setText(value); setShown(value); setSel(0); };

  return (
    <>
      <form className="hangul-form" onSubmit={(e) => { e.preventDefault(); run(text); }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder={x.phVi} aria-label={x.inputVi} maxLength={60} lang="vi" />
        <button className="btn btn-gold" type="submit">{x.suggest}</button>
      </form>
      <div className="other-zodiacs">
        {SUGGEST_EXAMPLES.map((e) => <button key={e} type="button" className="chip" onClick={() => run(e)}>{e}</button>)}
      </div>
      <div className="seg small-seg" role="group" aria-label={x.gender}>
        {(['auto', 'f', 'm', 'all'] as const).map((k) => (
          <button key={k} type="button" className={gender === k ? 'on' : ''} onClick={() => { setGender(k); setSel(0); }}>{x.genders[k]}</button>
        ))}
      </div>

      {v && !v.given.length && <p className="muted">{x.noGiven}</p>}
      {v && list.length > 0 && pick && (
        <>
          <h2 className="article-h">{x.sugTitle(v.given.join(' '))}</h2>
          <p className="muted">{x.sugDesc}</p>
          <div className="sug-list">
            {list.map((s, i) => (
              <SuggestionCard key={s.name.name} s={s} sur={v.surnameKo} on={i === sel} onClick={() => setSel(i)} />
            ))}
          </div>
          {v.surnameHanja && <p className="muted small">{x.surnameNote(v.surname, v.surnameKo, v.surnameHanja)}</p>}
          <div className="result-actions">
            <button type="button" className="btn btn-ghost" onClick={() => onCheck(v.surnameKo + pick.name.name, (KO_SURNAME_HANJA[v.surnameKo] ?? v.surnameHanja) + pick.hanja)}>
              {pick.name.name} · {x.checkThis}
            </button>
            <ShareImageButton
              filename="myeongwol-korean-name.png"
              draw={(ctx) => drawNameCard(ctx, {
                mode: 'toKo',
                koName: v.surnameKo + pick.name.name,
                roman: fullRoman(v.surnameKo, pick.name.name),
                hanja: v.surnameHanja + pick.hanja,
                viName: shown.trim(),
                chars: [...pick.hanja].map((h, i) => ({
                  h, ko: [...pick.name.name][i], vi: KO_CHARS[h]?.vi ?? '',
                  meaning: lang === 'vi' ? KO_CHARS[h]?.mVi ?? '' : KO_CHARS[h]?.hun ?? '',
                })),
              }, t, lang)}
            />
          </div>
        </>
      )}
    </>
  );
}

function SuggestionCard({ s, sur, on, onClick }: { s: Suggestion; sur: string; on: boolean; onClick: () => void }) {
  const { lang } = useI18n();
  const x = NAMING[lang];
  const reasons = s.reasons.length ? s.reasons.map((r) =>
    r.kind === 'sound' ? x.reasonSound(r.vi, r.ko)
      : r.kind === 'same' ? x.reasonSame(r.vi, r.hanja)
      : x.reasonMeaning(r.vi, r.hanja, x.tags[r.tag]),
  ) : [x.reasonPopular];
  return (
    <button type="button" className={`panel sug-card${on ? ' on' : ''}`} onClick={onClick} aria-pressed={on}>
      <span className="sug-name">{s.name.name} <span className="hanja-line">{s.hanja}</span></span>
      <span className="muted small">{sur}{s.name.name} · {fullRoman(sur, s.name.name)}</span>
      <span className="sug-chars small">
        {[...s.hanja].map((h, i) => {
          const c = KO_CHARS[h];
          return <span key={h + i}>{h} {lang === 'vi' ? `${c?.vi} — ${c?.mVi}` : `${c?.hun} ${[...s.name.name][i]}`}</span>;
        })}
      </span>
      <span className="sug-reasons">{reasons.map((r) => <span key={r} className="tag tag-good">{r}</span>)}</span>
      {s.flags.map((f) => <span key={f.part} className="small bad">⚠ {f.part} → {f.like}</span>)}
    </button>
  );
}

function CheckTab({ text, setText, checked, setChecked, direct, setDirect, picks, setPicks, onSuggest }: {
  text: string; setText: (v: string) => void; checked: string; setChecked: (v: string) => void;
  direct: string; setDirect: (v: string) => void; picks: Record<number, string>; setPicks: (p: Record<number, string>) => void;
  onSuggest: (v: string) => void;
}) {
  const { lang } = useI18n();
  const x = NAMING[lang];
  const run = (value: string) => { setText(value); setChecked(value.trim()); };

  return (
    <>
      <form className="hangul-form" onSubmit={(e) => { e.preventDefault(); run(text); }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder={x.phCheck} aria-label={x.inputCheck} maxLength={60} />
        <button className="btn btn-gold" type="submit">{x.check}</button>
      </form>
      <div className="other-zodiacs">
        {CHECK_EXAMPLES.map((e) => <button key={e} type="button" className="chip" onClick={() => run(e)}>{e}</button>)}
      </div>
      <p className="muted small">{x.checkHint}</p>
      {checked && (hasHangul(checked)
        ? <KoreanCheck name={checked.replace(/[^가-힣]/g, '')} direct={direct} setDirect={setDirect} picks={picks} setPicks={setPicks} />
        : <VietnameseCheck name={checked} onSuggest={onSuggest} />)}
    </>
  );
}

function KoreanCheck({ name, direct, setDirect, picks, setPicks }: {
  name: string; direct: string; setDirect: (v: string) => void; picks: Record<number, string>; setPicks: (p: Record<number, string>) => void;
}) {
  const { lang } = useI18n();
  const x = NAMING[lang];
  const sylls = [...name];
  const surLen = sylls.length >= 3 ? (COMPOUND.includes(sylls.slice(0, 2).join('')) ? 2 : 1) : 0;
  const sur = sylls.slice(0, surLen).join('');
  const given = sylls.slice(surLen);
  const flags = koreanNameFlags(sur + given.join(''));
  const roman = sur ? fullRoman(sur, given.join('')) : given.map(romanizeSyllable).join('').replace(/^./, (c) => c.toUpperCase());

  // Hanja: typed directly, else picked per syllable (surname uses its most common hanja).
  const typed = [...direct].filter((c) => /[一-鿿]/.test(c));
  const units = surLen ? [sur, ...given] : given;
  const auto = units.map((u, i) => (surLen && i === 0 ? KO_SURNAME_HANJA[u] ?? '' : picks[i] ?? hanjaFor(u)[0]?.h ?? ''));
  const hanja = typed.length === units.length ? typed : typed.length === given.length && surLen ? [auto[0], ...typed] : auto;

  const [table, setTable] = useState<Map<string, { s: number; ko: string }> | null>(null);
  useEffect(() => {
    if (!table && hanja.some((h) => h && strokesOf(h) === undefined)) loadStrokeTable().then(setTable);
  }, [hanja.join(''), table]);
  const strokes = hanja.map((h) => (h ? strokesOf(h) ?? table?.get(h)?.s : undefined));
  const hv = hanja.every(Boolean) ? hanVietOf(hanja.join('')) : null;
  const grids = surLen === 1 && given.length === 2 && strokes.every((s) => s !== undefined)
    ? fourGrids(strokes[0]!, strokes[1]!, strokes[2]!) : null;

  return (
    <>
      <div className="panel">
        <h2 className="panel-title">{x.viEarTitle}</h2>
        <p><span className="muted small">{x.romanLabel}</span> <b>{roman}</b></p>
        {flags.length ? flags.map((f) => <Flag key={f.part} f={f} />) : <p className="good"><CircleCheck className="line-icon" aria-hidden="true" /> {x.viEarOk}</p>}
      </div>

      <div className="panel">
        <h2 className="panel-title">{x.hanjaTitle}</h2>
        <div className="name-cols">
          {units.map((u, i) => {
            const isSur = surLen > 0 && i === 0;
            const cands = isSur ? [] : hanjaFor(u).slice(0, 8);
            const h = hanja[i];
            const c = h ? KO_CHARS[h] : undefined;
            const info = c ? (lang === 'vi' ? `${c.vi} — ${c.mVi}` : `${c.hun} ${c.ko}`)
              : cands.find((k) => k.h === h) ? (lang === 'vi' ? `${cands.find((k) => k.h === h)!.vi}` : cands.find((k) => k.h === h)!.hun ?? '') : '';
            return (
              <div className="name-col" key={u + i}>
                <span className="name-hanja">{h || '?'}</span>
                <b>{u}</b>
                {info && <span className="small">{info}</span>}
                {strokes[i] !== undefined && <span className="muted small">{x.strokes} {strokes[i]}</span>}
                {!typed.length && cands.length > 1 && (
                  <div className="cand" role="group" aria-label={x.hanjaPick}>
                    {cands.map((k) => (
                      <button key={k.h} type="button" className={k.h === h ? 'on' : ''} title={`${k.hun ?? ''} · ${k.vi ?? ''}`}
                        onClick={() => setPicks({ ...picks, [i]: k.h })}>{k.h}</button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <label className="field">
          <span className="small">{x.hanjaDirect}</span>
          <input value={direct} onChange={(e) => setDirect(e.target.value)} placeholder={x.hanjaDirectPh} maxLength={6} lang="zh-Hant" />
        </label>
        {hv && <p>{x.hanViet(hv)}</p>}
      </div>

      {grids && (
        <div className="panel">
          <h2 className="panel-title">{x.strokesTitle}</h2>
          <div className="grid4">
            {grids.map((g) => (
              <div key={g.key} className={g.lucky ? 'good' : 'bad'}>
                <b>{x.grids[g.key]} {g.n}</b>
                <span className="small">{g.lucky ? x.lucky : x.unlucky}</span>
                <span className="muted small">{x.gridDesc[g.key]}</span>
              </div>
            ))}
          </div>
          <p className="muted small">{x.gridNote}</p>
        </div>
      )}
    </>
  );
}

function VietnameseCheck({ name, onSuggest }: { name: string; onSuggest: (v: string) => void }) {
  const { lang } = useI18n();
  const x = NAMING[lang];
  const r = vietnameseNameCheck(name);
  return (
    <>
      <div className="panel">
        <h2 className="panel-title">{x.koEarTitle}</h2>
        <p><span className="muted small">{x.hangulLabel}</span> <b lang="ko">{r.hangul}</b></p>
        {r.flags.length ? r.flags.map((f) => <Flag key={f.part} f={f} />) : <p className="good"><CircleCheck className="line-icon" aria-hidden="true" /> {x.koEarOk}</p>}
        {r.hard.length > 0 && (
          <>
            <h3 className="small">{x.hardTitle}</h3>
            <ul className="small">{r.hard.map((h) => <li key={h.part}>{lang === 'vi' ? h.vi : h.ko}</li>)}</ul>
          </>
        )}
      </div>
      <p className="small">
        <button type="button" className="linklike" onClick={() => onSuggest(name)}>{x.toSuggest}</button>
        {' · '}
        <Link to="/name" search={`?m=ko&q=${encodeURIComponent(name)}`}>{x.toName}</Link>
      </p>
    </>
  );
}

function Flag({ f }: { f: { part: string; like: string; level: 'strong' | 'mild'; ko: string; vi: string } }) {
  const { lang } = useI18n();
  const x = NAMING[lang];
  return (
    <p className={`name-flag ${f.level}`}>
      <span className="tag">{f.level === 'strong' ? x.levelStrong : x.levelMild}</span>{' '}
      <b>{f.part}</b> → “{f.like}” · {lang === 'vi' ? f.vi : f.ko}
    </p>
  );
}
