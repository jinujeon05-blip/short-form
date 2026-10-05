import { BirthInput } from '../engine/pillars';
import { PLACES, getPlace } from '../engine/timezone';
import { Lang, useI18n } from '../i18n';

export interface BirthForm {
  name: string;
  calendar: 'solar' | 'lunar';
  leap: boolean;
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  unknownTime: boolean;
  gender: 'M' | 'F';
  place: string;
  solarTime: boolean;
  splitZi: boolean;
}

export function defaultBirth(lang: Lang, overrides: Partial<BirthForm> = {}): BirthForm {
  return {
    name: '', calendar: 'solar', leap: false, year: '1990', month: '1', day: '1', hour: '12', minute: '0',
    unknownTime: false, gender: 'M', place: lang === 'vi' ? 'hanoi' : 'seoul', solarTime: true, splitZi: false,
    ...overrides,
  };
}

export function toInput(f: BirthForm): BirthInput {
  return {
    calendar: f.calendar,
    year: Number(f.year), month: Number(f.month), day: Number(f.day), leap: f.leap,
    hour: f.unknownTime ? null : Number(f.hour),
    minute: Number(f.minute),
    gender: f.gender,
    place: getPlace(f.place),
    solarTime: f.solarTime,
    splitZi: f.splitZi,
  };
}

/** Compact one-string encoding for share links: date~cal~time~gender~place~opts~name */
export function encodeBirth(f: BirthForm): string {
  return [
    `${f.year}-${f.month}-${f.day}`,
    f.calendar === 'lunar' ? (f.leap ? 'L' : 'l') : 's',
    f.unknownTime ? 'x' : `${f.hour}:${f.minute}`,
    f.gender,
    f.place,
    `${f.solarTime ? 1 : 0}${f.splitZi ? 1 : 0}`,
    f.name.replace(/~/g, ''),
  ].join('~');
}

export function decodeBirth(s: string | null): BirthForm | null {
  if (!s) return null;
  const [d, c = 's', tm = 'x', g = 'M', p = 'seoul', o = '10', name = ''] = s.split('~');
  const date = d?.split('-');
  if (!date || date.length !== 3 || date.some((x) => !/^\d+$/.test(x))) return null;
  const [hh, mm] = tm === 'x' ? ['12', '0'] : tm.split(':');
  return {
    name,
    calendar: c === 's' ? 'solar' : 'lunar',
    leap: c === 'L',
    year: date[0], month: date[1], day: date[2],
    hour: hh ?? '12', minute: mm ?? '0',
    unknownTime: tm === 'x',
    gender: g === 'F' ? 'F' : 'M',
    place: getPlace(p).id,
    solarTime: o[0] !== '0',
    splitZi: o[1] === '1',
  };
}

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

export function BirthFields({ value: f, onChange, namePlaceholder }: {
  value: BirthForm;
  onChange: (f: BirthForm) => void;
  namePlaceholder?: string;
}) {
  const { t, lang } = useI18n();
  const set = <K extends keyof BirthForm>(k: K, v: BirthForm[K]) => onChange({ ...f, [k]: v });
  const thisYear = new Date().getFullYear();

  return (
    <>
      <label className="field">
        <span>{t.saju.name}</span>
        <input value={f.name} maxLength={20} placeholder={namePlaceholder ?? t.saju.namePh} onChange={(e) => set('name', e.target.value)} />
      </label>

      <div className="field">
        <span>{t.saju.calendar}</span>
        <div className="seg">
          <button type="button" className={f.calendar === 'solar' ? 'on' : ''} onClick={() => set('calendar', 'solar')}>{t.saju.solar}</button>
          <button type="button" className={f.calendar === 'lunar' ? 'on' : ''} onClick={() => set('calendar', 'lunar')}>{t.saju.lunar}</button>
          {f.calendar === 'lunar' && (
            <label className="check inline">
              <input type="checkbox" checked={f.leap} onChange={(e) => set('leap', e.target.checked)} /> {t.saju.leap}
            </label>
          )}
        </div>
      </div>

      <div className="field">
        <span>{t.saju.birthDate}</span>
        <div className="row3">
          <select value={f.year} onChange={(e) => set('year', e.target.value)} aria-label={t.saju.year}>
            {range(1930, thisYear).reverse().map((y) => <option key={y} value={y}>{y}{lang === 'ko' ? '년' : ''}</option>)}
          </select>
          <select value={f.month} onChange={(e) => set('month', e.target.value)} aria-label={t.saju.month}>
            {range(1, 12).map((m) => <option key={m} value={m}>{lang === 'ko' ? `${m}월` : m}</option>)}
          </select>
          <select value={f.day} onChange={(e) => set('day', e.target.value)} aria-label={t.saju.day}>
            {range(1, f.calendar === 'lunar' ? 30 : 31).map((d) => <option key={d} value={d}>{lang === 'ko' ? `${d}일` : d}</option>)}
          </select>
        </div>
      </div>

      <div className="field">
        <span>{t.saju.time}</span>
        <div className="row2">
          <select value={f.hour} disabled={f.unknownTime} onChange={(e) => set('hour', e.target.value)} aria-label={t.saju.time}>
            {range(0, 23).map((h) => <option key={h} value={h}>{String(h).padStart(2, '0')}{lang === 'ko' ? '시' : 'h'}</option>)}
          </select>
          <select value={f.minute} disabled={f.unknownTime} onChange={(e) => set('minute', e.target.value)} aria-label="minute">
            {range(0, 59).map((m) => <option key={m} value={m}>{String(m).padStart(2, '0')}{lang === 'ko' ? '분' : "'"}</option>)}
          </select>
        </div>
        <label className="check">
          <input type="checkbox" checked={f.unknownTime} onChange={(e) => set('unknownTime', e.target.checked)} /> {t.saju.unknownTime}
        </label>
      </div>

      <div className="field">
        <span>{t.saju.gender}</span>
        <div className="seg">
          <button type="button" className={f.gender === 'M' ? 'on' : ''} onClick={() => set('gender', 'M')}>{t.saju.male}</button>
          <button type="button" className={f.gender === 'F' ? 'on' : ''} onClick={() => set('gender', 'F')}>{t.saju.female}</button>
        </div>
      </div>

      <label className="field">
        <span>{t.saju.place}</span>
        <select value={f.place} onChange={(e) => set('place', e.target.value)}>
          <optgroup label={`🇰🇷 ${t.saju.placeKR}`}>
            {PLACES.filter((p) => p.country === 'KR').map((p) => <option key={p.id} value={p.id}>{p[lang]}</option>)}
          </optgroup>
          <optgroup label={`🇻🇳 ${t.saju.placeVN}`}>
            {PLACES.filter((p) => p.country === 'VN').map((p) => <option key={p.id} value={p.id}>{p[lang]}</option>)}
          </optgroup>
        </select>
      </label>
    </>
  );
}
