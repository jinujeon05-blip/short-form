import { useEffect, useState } from 'react';
import { MoonPhase as phaseAngle } from 'astronomy-engine';
import type { Lang } from '../i18n';

/** Lit part of the moon for phase p (0 = new, 0.5 = full), seen from the northern hemisphere. */
export function litPath(p: number, r = 46, c = 50): string {
  const x = r * Math.cos(2 * Math.PI * p);
  const rx = Math.abs(x).toFixed(2);
  const top = `${c} ${c - r}`;
  const bottom = `${c} ${c + r}`;
  return p <= 0.5
    ? `M${top}A${r} ${r} 0 0 1 ${bottom}A${rx} ${r} 0 0 ${x > 0 ? 0 : 1} ${top}Z` // waxing: right side lit
    : `M${top}A${r} ${r} 0 0 0 ${bottom}A${rx} ${r} 0 0 ${x > 0 ? 1 : 0} ${top}Z`; // waning: left side lit
}

const NAMES: Record<Lang, string[]> = {
  ko: ['삭(새달)', '초승달', '상현달', '차오르는 달', '보름달', '기우는 달', '하현달', '그믐달'],
  vi: ['Trăng non', 'Trăng lưỡi liềm đầu tháng', 'Trăng thượng huyền', 'Trăng gần tròn', 'Trăng rằm', 'Trăng khuyết dần', 'Trăng hạ huyền', 'Trăng lưỡi liềm cuối tháng'],
};

export const phaseName = (p: number, lang: Lang) => NAMES[lang][Math.floor(((p * 8) + 0.5) % 8)];

const ease = (t: number) => 1 - (1 - t) ** 3;

/** Today's moon: animates from new moon to the real phase on load. */
export function MoonPhase({ onPhase }: { onPhase?: (p: number) => void }) {
  const [p, setP] = useState(0.02);
  useEffect(() => {
    const target = phaseAngle(new Date()) / 360;
    onPhase?.(target);
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setP(target); return; }
    const start = performance.now();
    const ms = 2400;
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      setP(0.02 + (target - 0.02) * ease(t));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const lit = (1 - Math.cos(2 * Math.PI * p)) / 2;
  return (
    <svg className="moon-svg" viewBox="0 0 100 100" style={{ filter: `drop-shadow(0 0 ${6 + lit * 18}px rgba(226,192,122,${0.15 + lit * 0.35}))` }}>
      <defs>
        <radialGradient id="moon-lit" cx="40%" cy="40%" r="70%">
          <stop offset="0" stopColor="#fff6dc" />
          <stop offset="0.55" stopColor="#e9cd8c" />
          <stop offset="1" stopColor="#b48f4b" />
        </radialGradient>
        <clipPath id="moon-clip"><path d={litPath(p)} /></clipPath>
      </defs>
      <circle cx="50" cy="50" r="46" fill="rgba(226,192,122,0.06)" stroke="rgba(226,192,122,0.25)" strokeWidth="0.6" />
      <path d={litPath(p)} fill="url(#moon-lit)" />
      <g clipPath="url(#moon-clip)" fill="rgba(0,0,0,0.08)">
        <circle cx="36" cy="38" r="6" />
        <circle cx="62" cy="60" r="9" />
        <circle cx="56" cy="30" r="4" />
        <circle cx="40" cy="66" r="3.5" />
      </g>
    </svg>
  );
}
