import type { Metadata } from "next";
import "../globals.css";
import "./admin.css";

export const metadata: Metadata = {
  title: "DASAN Admin",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // Labels are bilingual on purpose; stop browser auto-translate from rewriting the Vietnamese half.
    <html lang="vi" translate="no" className="notranslate">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="admin">{children}</body>
    </html>
  );
}
