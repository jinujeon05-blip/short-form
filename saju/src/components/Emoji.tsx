import SET from '../content/emojiSet.json';

// Fluent Emoji Flat (MIT, Microsoft) — same look on every device. See scripts/gen-emoji.py.
const HAS = new Set<string>(SET);

export const emojiKey = (e: string) => [...e].filter((c) => c !== '️').map((c) => c.codePointAt(0)!.toString(16)).join('-');

export function Emoji({ e, className = '' }: { e: string; className?: string }) {
  const k = emojiKey(e);
  return HAS.has(k)
    ? <img className={`emo ${className}`} src={`/emoji/${k}.svg`} alt="" aria-hidden="true" width={32} height={32} decoding="async" />
    : <span className={className} aria-hidden="true">{e}</span>;
}
