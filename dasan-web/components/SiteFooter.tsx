import { COMPANY, type Dict, type Locale } from "@/lib/i18n";

export default function SiteFooter({ lang, t }: { lang: Locale; t: Dict["footer"] }) {
  return (
    <footer className="site-footer">
      <div className="container inner">
        <div>
          <strong>{lang === "ko" ? COMPANY.nameKo : COMPANY.nameVi}</strong>
          <br />
          {COMPANY.nameEn}
          <br />
          MST {COMPANY.taxCode} · {lang === "ko" ? "근로자파견업 허가" : "Giấy phép CTLLĐ"} {COMPANY.license}
          <br />
          {lang === "ko" ? COMPANY.addressKo : COMPANY.addressVi}
        </div>
        <div>
          <a href={COMPANY.phoneHref}>{COMPANY.phone}</a> · <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          <br />© {new Date().getFullYear()} DASAN. {t.rights} · <a href="/admin">{t.admin}</a>
        </div>
      </div>
    </footer>
  );
}
