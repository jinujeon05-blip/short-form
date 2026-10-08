"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { FlagKR, FlagVN } from "./Flags";

export default function SiteHeader({ lang, t }: { lang: Locale; t: Dict["nav"] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? `/${lang}`;
  const swap = (to: Locale) => pathname.replace(/^\/(vi|ko)(?=\/|$)/, `/${to}`);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container inner">
        <Link href={`/${lang}`} className="logo" onClick={close}>
          <img src="/images/logo.jpg" alt="DASAN" width={115} height={34} />
        </Link>
        <nav className={`nav${open ? " open" : ""}`}>
          <Link href={`/${lang}#about`} onClick={close}>{t.about}</Link>
          <Link href={`/${lang}/jobs`} onClick={close}>{t.jobs}</Link>
          <Link href={`/${lang}/partner`} onClick={close}>{t.partner}</Link>
          <Link href={`/${lang}#faq`} onClick={close}>{t.faq}</Link>
          <Link href={`/${lang}#contact`} onClick={close}>{t.contact}</Link>
          <span className="lang" aria-label="Language">
            <Link href={swap("vi")} className={lang === "vi" ? "active" : ""} onClick={close} aria-label="Tiếng Việt" title="Tiếng Việt">
              <FlagVN /> VI
            </Link>
            <Link href={swap("ko")} className={lang === "ko" ? "active" : ""} onClick={close} aria-label="한국어" title="한국어">
              <FlagKR /> KO
            </Link>
          </span>
          <Link href={`/${lang}/apply`} className="btn btn-red btn-small" onClick={close}>{t.apply}</Link>
        </nav>
        <button className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
