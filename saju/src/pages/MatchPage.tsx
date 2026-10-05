import { useEffect, useMemo, useState } from 'react';
import { dayInfo } from '../engine/almanac';
import { MatchResult, matchCharts } from '../engine/match';
import { InvalidDateError, calculateSaju } from '../engine/pillars';
import { Lang, useI18n } from '../i18n';
import { ko } from '../i18n/ko';
import { vi } from '../i18n/vi';
import { BirthFields, BirthForm, decodeBirth, defaultBirth, encodeBirth, toInput } from '../components/BirthFields';
import { ELEMENT_CLASS, Section, localTodayJdn } from '../components/common';
import { cycleBranch } from '../engine/ganzhi';
import { ShareImageButton } from '../components/ShareImage';
import { drawMatchCard } from '../components/cards';
import { AdSlot } from '../components/AdSlot';
import { Link, hrefFor, navigate } from '../router';

export function MatchPage({ query }: { query: string }) {
  const { t, lang } = useI18n();
  const parsed = useMemo(() => {
    const p = new URLSearchParams(query);
    const a = decodeBirth(p.get('a'));
    const b = decodeBirth(p.get('b'));
    return a && b ? { a, b, invited: p.get('i') === '1' } : null;
  }, [query]);
  /** Invite link: only the sender's birth data is in the URL */
  const inviter = useMemo(() => {
    const p = new URLSearchParams(query);
    return p.get('b') ? null : decodeBirth(p.get('invite'));
  }, [query]);

  const [a, setA] = useState<BirthForm>(() => parsed?.a ?? defaultBirth(lang, { place: lang === 'vi' ? 'hanoi' : 'seoul', gender: lang === 'vi' ? 'F' : 'M' }));
  const [b, setB] = useState<BirthForm>(() => parsed?.b ?? (inviter
    ? defaultBirth(lang, { gender: inviter.gender === 'M' ? 'F' : 'M', year: '1995' })
    : defaultBirth(lang, { place: lang === 'vi' ? 'seoul' : 'hanoi', gender: lang === 'vi' ? 'M' : 'F', year: '1995' })));
  const [error, setError] = useState('');

  useEffect(() => {
    if (parsed) {
      setA(parsed.a);
      setB(parsed.b);
    }
  }, [parsed]);

  const basis = lang === 'vi' ? 'VN' : 'KR';
  const result = useMemo<MatchResult | null>(() => {
    if (!parsed) return null;
    try {
      return matchCharts(calculateSaju(toInput(parsed.a)), calculateSaju(toInput(parsed.b)), localTodayJdn(), basis);
    } catch {
      return null;
    }
  }, [parsed, basis]);

  useEffect(() => {
    if (result) document.getElementById('match-result')?.scrollIntoView({ behavior: 'smooth' });
  }, [result]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const first = inviter ?? a;
    try {
      calculateSaju(toInput(first));
      calculateSaju(toInput(b));
      setError('');
      navigate(hrefFor('/match', lang, `?a=${encodeURIComponent(encodeBirth(first))}&b=${encodeURIComponent(encodeBirth(b))}${inviter ? '&i=1' : ''}`));
    } catch (err) {
      setError(err instanceof InvalidDateError ? t.saju.invalid : String(err));
    }
  };

  const names: [string, string] = [
    parsed?.a.name || t.match.personA,
    parsed?.b.name || t.match.personB,
  ];

  if (inviter && !parsed) {
    const name = inviter.name || t.match.personA;
    let animal = '';
    try {
      animal = t.animals[cycleBranch(calculateSaju(toInput(inviter)).lunarYearCycle)];
    } catch {
      /* invalid link */
    }
    return (
      <Section eyebrow="宮合 · HỢP TUỔI" title={t.match.ask.title(name)} desc={t.match.ask.body(name, animal)}>
        <form className="match-form invite-form" onSubmit={submit}>
          <div className="panel person">
            <h3 className="panel-title">💙 {t.match.ask.you}</h3>
            <BirthFields value={b} onChange={setB} namePlaceholder={t.match.personB} />
          </div>
          <div className="match-submit">
            {error && <p className="error" role="alert">{error}</p>}
            <button className="btn btn-gold block" type="submit">{t.match.submit} ♥</button>
            <p className="muted small center">🔒 {t.match.ask.note}</p>
          </div>
        </form>
      </Section>
    );
  }

  return (
    <>
      <Section eyebrow="宮合 · HỢP TUỔI" title={t.match.title} desc={t.match.desc}>
        <form className="match-form" onSubmit={submit}>
          <div className="panel person">
            <h3 className="panel-title">💛 {t.match.personA}</h3>
            <BirthFields value={a} onChange={setA} namePlaceholder={t.match.personA} />
            <InviteBox a={a} />
          </div>
          <div className="panel person">
            <h3 className="panel-title">💙 {t.match.personB}</h3>
            <BirthFields value={b} onChange={setB} namePlaceholder={t.match.personB} />
          </div>
          <div className="match-submit">
            {error && <p className="error" role="alert">{error}</p>}
            <button className="btn btn-gold block" type="submit">{t.match.submit} ♥</button>
            <p className="muted small center">🔒 {t.saju.privacy}</p>
          </div>
        </form>
      </Section>

      {result && <MatchResultView m={result} names={names} invited={!!parsed?.invited} />}
    </>
  );
}

const OTHER: Record<Lang, Lang> = { ko: 'vi', vi: 'ko' };
const DICTS = { ko, vi };

/** Lets the first person send a link with only their own birth data. */
function InviteBox({ a }: { a: BirthForm }) {
  const { t, lang } = useI18n();
  const [linkLang, setLinkLang] = useState<Lang>(lang);
  const [msg, setMsg] = useState('');
  const send = async () => {
    if (!a.name.trim()) {
      setMsg(t.match.ask.needName);
      return;
    }
    try {
      calculateSaju(toInput(a));
    } catch {
      setMsg(t.saju.invalid);
      return;
    }
    // Text in the share sheet follows the recipient's language.
    const it = DICTS[linkLang].match.ask;
    const url = `${location.origin}${hrefFor('/match', linkLang, `?invite=${encodeURIComponent(encodeBirth(a))}`)}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: it.shareTitle(a.name), text: it.shareText, url });
        setMsg('');
        return;
      }
      await navigator.clipboard.writeText(`${it.shareTitle(a.name)}\n${it.shareText}\n${url}`);
      setMsg(t.match.ask.copied);
    } catch {
      /* cancelled */
    }
  };
  return (
    <div className="invite-box">
      <p className="muted small">{t.match.ask.makeDesc}</p>
      <div className="seg" role="group" aria-label={t.match.ask.linkLang}>
        <span className="muted small">{t.match.ask.linkLang}</span>
        <button type="button" className={linkLang === lang ? 'on' : ''} onClick={() => setLinkLang(lang)}>{lang === 'ko' ? '한국어' : 'Tiếng Việt'}</button>
        <button type="button" className={linkLang !== lang ? 'on' : ''} onClick={() => setLinkLang(OTHER[lang])}>{lang === 'ko' ? 'Tiếng Việt' : '한국어'}</button>
      </div>
      <button type="button" className="btn btn-ghost block" onClick={send}>{t.match.ask.make}</button>
      {msg && <p className="small gold" role="status">{msg}</p>}
    </div>
  );
}

function MatchResultView({ m, names, invited }: { m: MatchResult; names: [string, string]; invited: boolean }) {
  const { t, lang } = useI18n();
  const [copied, setCopied] = useState(false);
  const grade = t.match.grades[m.grade];
  const parts = [
    { key: 'stem', label: t.match.parts.stem, p: m.stem, text: t.match.stemText[m.stem.type] },
    { key: 'dayBranch', label: t.match.parts.dayBranch, p: m.dayBranch, text: t.match.branchText[m.dayBranch.type] },
    { key: 'zodiac', label: t.match.parts.zodiac, p: m.zodiac, text: t.match.zodiacText[m.zodiac.type] },
    { key: 'nayin', label: t.match.parts.nayin, p: m.nayin, text: t.match.nayinText[m.nayin.type] },
    { key: 'balance', label: t.match.parts.balance, p: m.balance, text: t.match.balanceText[m.balance.type] },
  ];
  const ringDeg = Math.round((m.score / 100) * 360);

  const shareLink = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${t.match.title} ${m.score}`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* cancelled */
    }
  };

  const dateLabel = (jdn: number) => {
    const info = dayInfo(jdn, lang === 'vi' ? 'VN' : 'KR');
    const { y, m: mo, d } = info.ymd;
    const wd = t.calendar.weekdays[info.weekday];
    return lang === 'vi' ? `${wd}, ${d}/${mo}/${y}` : `${y}.${mo}.${d} (${wd})`;
  };

  return (
    <Section id="match-result" eyebrow="結果 · KẾT QUẢ" title={`${names[0]} ♥ ${names[1]}`}>
      <div className="match-hero panel">
        <div className="match-person">
          <span className="match-emoji" aria-hidden="true">{t.animalEmoji[m.zodiacA]}</span>
          <b>{names[0]}</b>
          <span className="muted small">{t.animals[m.zodiacA]} · {t.nayin[m.nayinA]}</span>
        </div>
        <div className="score-ring" style={{ background: `conic-gradient(var(--gold) ${ringDeg}deg, rgba(255,255,255,0.08) 0)` }}>
          <div className="score-inner">
            <span className="muted small">{t.match.scoreLabel}</span>
            <span className="score-num">{m.score}</span>
          </div>
        </div>
        <div className="match-person">
          <span className="match-emoji" aria-hidden="true">{t.animalEmoji[m.zodiacB]}</span>
          <b>{names[1]}</b>
          <span className="muted small">{t.animals[m.zodiacB]} · {t.nayin[m.nayinB]}</span>
        </div>
        <div className="match-grade">
          <h3 className="gold">{grade.title}</h3>
          <p>{grade.text}</p>
        </div>
      </div>

      <div className="panel">
        {parts.map(({ key, label, p, text }) => (
          <div className="match-part" key={key}>
            <div className="match-part-head">
              <b>{label}</b>
              <span className="muted small">{p.points} / {p.max}</span>
            </div>
            <span className="el-track"><span className="el-fill gold-fill" style={{ width: `${(p.points / p.max) * 100}%` }} /></span>
            <p className="muted">{text}</p>
          </div>
        ))}
      </div>

      <div className="result-grid">
        <div className="panel">
          <h3 className="panel-title">{t.match.parts.balance}</h3>
          {([[names[0], m.weakA], [names[1], m.weakB]] as const).map(([n, weak]) => (
            <p key={n}>
              {t.match.weakLabel(n)}:{' '}
              {weak.map((e) => <b key={e} className={`${ELEMENT_CLASS[e]} weak-el`}>{t.elementLong[e]}</b>)}
            </p>
          ))}
        </div>
        <div className="panel">
          <h3 className="panel-title">{t.match.goodDays}</h3>
          {m.goodDays.length ? (
            <ul className="good-days">
              {m.goodDays.map((d) => <li key={d}>🌕 {dateLabel(d)}</li>)}
            </ul>
          ) : (
            <p className="muted">{t.match.noGoodDays}</p>
          )}
          <Link to="/calendar" className="small">{t.nav.calendar} →</Link>
        </div>
      </div>

      <div className="result-actions">
        <ShareImageButton filename="myeongwol-match.png" draw={(ctx) => drawMatchCard(ctx, m, names, t, lang)} />
        <button className={`btn ${invited ? 'btn-gold' : 'btn-ghost'}`} onClick={shareLink}>
          {copied ? t.result.copied : invited ? t.match.ask.sendBack(names[0]) : t.result.share}
        </button>
        <Link className="btn btn-ghost" to="/match">{t.match.again}</Link>
      </div>
      <p className="muted small center">{t.match.disclaimer}</p>
      <AdSlot name="result" />
    </Section>
  );
}
