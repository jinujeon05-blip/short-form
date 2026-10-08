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
    <html lang="vi">
      <body className="admin">{children}</body>
    </html>
  );
}
