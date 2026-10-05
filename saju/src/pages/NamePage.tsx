import { useEffect, useMemo, useState } from 'react';
import { HanjaEntry } from '../content/hanja';
import { Flow, elementFlow, koReading, parseKorean, parseVietnamese, romanizeName, soundElement } from '../engine/names';
import { Element } from '../engine/ganzhi';
import { useI18n } from '../i18n';
import { ELEMENT_CLASS, Section } from '../components/common';
import { ShareImageButton } from '../components/ShareImage';
import { NameCardData, drawNameCard } from '../components/cards';
import { AdSlot } from '../components/AdSlot';
import { hrefFor } from '../router';

type Mode = 'toKo' | 'toVi';

const EXAMPLES: Record<Mode, string[]> = {
  toKo: ['Nguyễn Minh Anh', 'Trần Thu Hà', 'Lê Văn Hùng', 'Phạm Ngọc Lan', 'Hoàng Đức Huy'],
  toVi: ['김민준', '이서연', '박지훈', '최수아', '정하준'],
};

interface Chosen {
  index: number;
  input: string;
  entry: HanjaEntry | null;
  candidates: HanjaEntry[];
  fuzzy: boolean;
  middle: boolean;
}

export function NamePage({ query }: { query: string }) {
  const { t, lang } = useI18n();
  const initial = useMemo(() => new URLSearchParams(query), [query]);
  const [mode, setMode] = useState<Mode>(
    initial.get('m') === 'vi' ? 'toVi' : initial.get('m') === 'ko' ? 'toKo' : lang === 'vi' ? 'toKo' : 'toVi',
  );
  const [text, setText] = useState(initial.get('q') ?? '');
  const [picks, setPicks] = useState<number[]>(() => (initial.get('s') ?? '').split('.').filter(Boolean).map(Number));
  const [omitMiddle, setOmitMiddle] = useState(initial.get('o') !== '0');

  // Keep the URL shareable without triggering navigation.
  useEffect(() => {
    const p = new URLSearchParams({ m: mode === 'toKo' ? 'ko' : 'vi', q: text });
    if (picks.some((x) => x > 0)) p.set('s', picks.join('.'));
    if (!omitMiddle) p.set('o', '0');
    history.replaceState(null, '', hrefFor('/name', lang, `?${p.toString()}`));
  }, [mode, text, picks, omitMiddle, lang]);

  const syllables = useMemo(() => (mode === 'toKo' ? parseVietnamese(text) : parseKorean(text)), [mode, text]);
  const chosen: Chosen[] = syllables
    .map((s, i) => ({
      index: i,
      input: s.input,
      candidates: s.candidates,
      entry: s.candidates[Math.min(picks[i] ?? 0, s.candidates.length - 1)] ?? null,
      fuzzy: s.fuzzy,
      middle: s.middle,
    }))
    .filter((c) => !(mode === 'toKo' && omitMiddle && c.middle));

  // Korean → Vietnamese keeps the syllables as typed (e.g. 이, not 리).
  const koSyllables = chosen.map((c, i) => (mode === 'toVi' || !c.entry ? c.input : koReading(c.entry, i)));
  const koName = mode === 'toKo' ? koSyllables.join('') : text.replace(/\s+/g, '');
  const roman = koSyllables.length ? romanizeName(koSyllables[0], koSyllables.slice(1)) : '';
  const hanja = chosen.map((c) => c.entry?.h ?? '?').join('');
  const viName = chosen.map((c) => c.entry?.vi ?? c.input).join(' ');

  const elements = [...koName].map(soundElement).filter((e): e is Element => e !== null);
  const flows: Flow[] = elements.slice(1).map((e, i) => elementFlow(elements[i], e));
  const controls = flows.filter((f) => f === 'control' || f === 'controlled').length;
  const summary = controls === 0 ? 'good' : controls === 1 ? 'mixed' : 'clash';

  const setPick = (i: number, k: number) => {
    const next = [...picks];
    while (next.length <= i) next.push(0);
    next[i] = k;
    setPicks(next);
  };
  const changeText = (v: string) => {
    setText(v);
    setPicks([]);
  };
  const changeMode = (m: Mode) => {
    setMode(m);
    setText('');
    setPicks([]);
  };

  const ready = chosen.length > 0 && chosen.some((c) => c.entry);
  const card: NameCardData = {
    mode,
    koName,
    roman,
    hanja,
    viName,
    chars: chosen.map((c, i) => ({
      h: c.entry?.h ?? '?',
      ko: koSyllables[i],
      vi: c.entry?.vi ?? c.input,
      meaning: c.entry ? (lang === 'vi' ? c.entry.mVi : c.entry.mKo) : '',
    })),
  };

  return (
    <Section eyebrow="姓名 · HỌ TÊN" title={t.name.title} desc={t.name.desc}>
      <div className="panel name-panel">
        <div className="seg center-seg" role="group">
          <button className={mode === 'toKo' ? 'on' : ''} onClick={() => changeMode('toKo')} aria-pressed={mode === 'toKo'}>🇻🇳 → 🇰🇷 {t.name.toKo}</button>
          <button className={mode === 'toVi' ? 'on' : ''} onClick={() => changeMode('toVi')} aria-pressed={mode === 'toVi'}>🇰🇷 → 🇻🇳 {t.name.toVi}</button>
        </div>

        <label className="field">
          <span>{mode === 'toKo' ? t.name.inputVi : t.name.inputKo}</span>
          <input
            className="name-input"
            value={text}
            maxLength={40}
            placeholder={mode === 'toKo' ? t.name.phVi : t.name.phKo}
            onChange={(e) => changeText(e.target.value)}
            autoComplete="off"
          />
        </label>
        <div className="examples">
          <span className="k">{t.name.examples}</span>
          {EXAMPLES[mode].map((ex) => (
            <button key={ex} className="chip" onClick={() => changeText(ex)}>{ex}</button>
          ))}
        </div>
        {mode === 'toKo' && (
          <>
            <p className="muted small">{t.name.noDiacritics}</p>
            <label className="check">
              <input type="checkbox" checked={omitMiddle} onChange={(e) => setOmitMiddle(e.target.checked)} /> {t.name.omitMiddle}
            </label>
          </>
        )}
      </div>

      {!ready ? (
        <p className="muted center">{t.name.empty}</p>
      ) : (
        <>
          <div className="name-result panel">
            <p className="k center">{mode === 'toKo' ? t.name.resultKo : t.name.resultVi}</p>
            {mode === 'toKo' ? (
              <>
                <h3 className="name-big">{koName}</h3>
                <p className="name-sub"><span className="hanja-line">{hanja}</span> · {roman}</p>
              </>
            ) : (
              <>
                <h3 className="name-big vi">{viName}</h3>
                <p className="name-sub"><span className="hanja-line">{hanja}</span> · {koName} ({roman})</p>
              </>
            )}

            <div className="name-cols">
              {chosen.map((c, i) => (
                <div className="name-col" key={c.index}>
                  <span className="muted small">{c.input}{c.middle ? ` · ${t.name.middleNote}` : ''}</span>
                  {c.entry ? (
                    <>
                      <span className={`name-hanja ${ELEMENT_CLASS[soundElement(koSyllables[i]) ?? 2]}`}>{c.entry.h}</span>
                      <b>{mode === 'toKo' ? koSyllables[i] : c.entry.vi}</b>
                      <span className="muted small">{mode === 'toKo' ? c.entry.vi : koSyllables[i]}</span>
                      <span className="small">{lang === 'vi' ? c.entry.mVi : c.entry.mKo}</span>
                      {c.fuzzy && <span className="tag tag-good">{t.name.fuzzy}</span>}
                      {c.candidates.length > 1 && (
                        <div className="cand" role="group" aria-label={t.name.pick}>
                          {c.candidates.map((e, k) => (
                            <button
                              key={`${e.h}${e.vi}`}
                              className={e === c.entry ? 'on' : ''}
                              onClick={() => setPick(c.index, k)}
                              title={`${e.vi} · ${lang === 'vi' ? e.mVi : e.mKo}`}
                            >
                              {e.h}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="name-hanja muted">?</span>
                  )}
                  {!c.entry && <span className="small bad">{t.name.notFound}</span>}
                </div>
              ))}
            </div>
            {chosen.some((c) => c.candidates.length > 1) && <p className="muted small center">{t.name.pick}</p>}
          </div>

          {elements.length > 1 && (
            <div className="panel">
              <h3 className="panel-title">{t.name.sound}</h3>
              <div className="flow">
                {elements.map((e, i) => (
                  <span key={i} className="flow-item">
                    {i > 0 && <span className={`flow-arrow ${flows[i - 1]}`}>→ {t.name.flow[flows[i - 1]]} →</span>}
                    <span className={`flow-el ${ELEMENT_CLASS[e]}`}>{[...koName][i]} <small>{t.elements[e]}</small></span>
                  </span>
                ))}
              </div>
              <p>{t.name.flowSummary[summary]}</p>
              <p className="muted small">{t.name.soundDesc}</p>
            </div>
          )}

          <div className="result-actions">
            <ShareImageButton filename="myeongwol-name.png" draw={(ctx) => drawNameCard(ctx, card, t, lang)} />
          </div>
          <p className="muted small center">{t.name.disclaimer}</p>
          <AdSlot name="result" />
        </>
      )}
    </Section>
  );
}
