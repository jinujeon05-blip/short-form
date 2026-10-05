import { useEffect, useRef } from 'react';
import config from '../../site.config.json';
import { useI18n } from '../i18n';

type SlotName = keyof typeof config.adsense.slots;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A responsive AdSense unit. Renders nothing until `adsense.client` and the slot id
 * are filled in site.config.json (the page-level script is added by the build).
 */
export function AdSlot({ name }: { name: SlotName }) {
  const { t } = useI18n();
  const client = config.adsense.client;
  const slot = config.adsense.slots[name];
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || !slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* blocked by an ad blocker */
    }
  }, [client, slot]);

  if (!client || !slot) return null;
  return (
    <div className="ad-wrap" aria-label={t.guide.ad}>
      <span className="ad-label">{t.guide.ad}</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
