import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import { CARD_H, CARD_W } from './cards';

async function waitForFonts() {
  try {
    await Promise.all([
      document.fonts.load('900 64px "Noto Serif KR"'),
      document.fonts.load('700 40px "Noto Serif"'),
      document.fonts.load('500 26px "Noto Sans KR"'),
      document.fonts.load('500 26px "Be Vietnam Pro"'),
    ]);
  } catch {
    /* fall back to system fonts */
  }
}

/** Renders a share card to PNG, opens the share sheet where supported, and shows a preview to save. */
export function ShareImageButton({ draw, filename }: {
  draw: (ctx: CanvasRenderingContext2D) => void;
  filename: string;
}) {
  const { t } = useI18n();
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url);
  }, [url]);

  const make = async () => {
    setBusy(true);
    try {
      await waitForFonts();
      const canvas = document.createElement('canvas');
      canvas.width = CARD_W;
      canvas.height = CARD_H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      draw(ctx);
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
      if (!blob) return;
      const file = new File([blob], filename, { type: 'image/png' });
      setUrl(URL.createObjectURL(blob));
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file] });
        } catch {
          /* cancelled or not allowed: preview below stays available */
        }
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button className="btn btn-gold" onClick={make} disabled={busy}>
        {busy ? t.share.making : `🖼 ${t.share.image}`}
      </button>
      {url && (
        <div className="share-preview" role="dialog" aria-label={t.share.image} onClick={() => setUrl(null)}>
          <div className="share-preview-inner" onClick={(e) => e.stopPropagation()}>
            <img src={url} alt={t.share.image} />
            <p className="muted small center">{t.share.hint}</p>
            <div className="result-actions">
              <a className="btn btn-gold" href={url} download={filename}>⬇ {t.share.image}</a>
              <button className="btn btn-ghost" onClick={() => setUrl(null)}>✕</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
