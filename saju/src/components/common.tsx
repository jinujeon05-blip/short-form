import { ReactNode } from 'react';
import { jdnFromYmd } from '../engine/astro';
import { BRANCH_HANJA, STEM_HANJA, cycleBranch, cycleStem, stemElement, branchElement } from '../engine/ganzhi';
import { LunarDate } from '../engine/lunar';
import { Lang, useI18n } from '../i18n';
import { Dict } from '../i18n/ko';

export const ELEMENT_CLASS = ['el-wood', 'el-fire', 'el-earth', 'el-metal', 'el-water'];

export function localTodayJdn(): number {
  const now = new Date();
  return jdnFromYmd(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export function lunarText(l: LunarDate, t: Dict, lang: Lang): string {
  const leap = l.leap ? ` (${t.today.leap})` : '';
  return lang === 'vi' ? `${l.day}/${l.month}${leap}` : `${l.leap ? '윤' : ''}${l.month}월 ${l.day}일`;
}

export function cycleName(cycle: number, t: Dict): string {
  return `${t.stems[cycleStem(cycle)]} ${t.branches[cycleBranch(cycle)]}`;
}

export function cycleHanja(cycle: number): string {
  return STEM_HANJA[cycleStem(cycle)] + BRANCH_HANJA[cycleBranch(cycle)];
}

export function hourRange(branch: number): string {
  const start = (branch * 2 + 23) % 24;
  const end = (start + 2) % 24;
  return `${String(start).padStart(2, '0')}–${String(end).padStart(2, '0')}`;
}

/** Hanja chip colored by element. */
export function GanzhiChip({ cycle }: { cycle: number }) {
  const s = cycleStem(cycle);
  const b = cycleBranch(cycle);
  return (
    <span className="gz-chip" aria-label={cycleHanja(cycle)}>
      <span className={ELEMENT_CLASS[stemElement(s)]}>{STEM_HANJA[s]}</span>
      <span className={ELEMENT_CLASS[branchElement(b)]}>{BRANCH_HANJA[b]}</span>
    </span>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <span className="stars" aria-label={`${n}/5`}>
      {'★★★★★'.slice(0, n)}
      <span className="stars-off">{'★★★★★'.slice(n)}</span>
    </span>
  );
}

export function Section({ eyebrow, title, desc, children, id }: {
  eyebrow?: string; title: string; desc?: string; children: ReactNode; id?: string;
}) {
  return (
    <section className="section" id={id}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
      {children}
    </section>
  );
}

export function MoonLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity=".6" />
      <path d="M30 9a16 16 0 1 0 0 30a13 13 0 1 1 0-30z" fill="var(--gold)" />
    </svg>
  );
}

export function useT() {
  return useI18n();
}
