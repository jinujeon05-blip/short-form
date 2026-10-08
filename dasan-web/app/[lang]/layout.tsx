import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { COMPANY, getDict, isLocale } from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    title: { default: t.meta.title, template: `%s · DASAN` },
    description: t.meta.description,
    alternates: { languages: { vi: "/vi", ko: "/ko" } },
    openGraph: { title: t.meta.title, description: t.meta.description, images: ["/images/photo-canteen.jpg"], locale: lang === "vi" ? "vi_VN" : "ko_KR" },
    icons: { icon: "/favicon.svg" },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&family=Noto+Sans+KR:wght@400;600;700;800&display=swap"
        />
      </head>
      <body>
        <SiteHeader lang={lang} t={t.nav} />
        <main>{children}</main>
        <SiteFooter lang={lang} t={t.footer} />
        <a className="float-zalo" href={COMPANY.zalo} target="_blank" rel="noopener noreferrer">
          Zalo
        </a>
      </body>
    </html>
  );
}
