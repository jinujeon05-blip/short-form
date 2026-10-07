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

// Canvas share cards: draw the same illustrations (preloaded so drawing stays synchronous).
const images = new Map<string, HTMLImageElement>();

function emojiImage(e: string): HTMLImageElement | null {
  const k = emojiKey(e);
  if (!HAS.has(k) || typeof Image === 'undefined') return null;
  let img = images.get(k);
  if (!img) {
    img = new Image();
    img.src = `/emoji/${k}.svg`;
    images.set(k, img);
  }
  return img;
}

export async function preloadEmojis(list: readonly string[]) {
  await Promise.all(list.map((e) => emojiImage(e)?.decode().catch(() => undefined)));
}

/** Draws emoji `e` centred on `cx` sitting on text baseline `y`, like fillText at font size `size`. */
export function drawEmoji(ctx: CanvasRenderingContext2D, e: string, cx: number, y: number, size: number) {
  const img = emojiImage(e);
  if (img?.complete && img.naturalWidth) ctx.drawImage(img, cx - size / 2, y - size * 0.85, size, size);
  else {
    ctx.font = `${size}px sans-serif`;
    ctx.fillText(e, cx, y);
  }
}
