import { COMPANY, KR_CONTACT, VN_CONTACTS, type Dict, type Locale } from "@/lib/i18n";

export default function SiteFooter({ lang, t }: { lang: Locale; t: Dict["footer"] }) {
  return (
    <footer className="site-footer">
      <div className="container inner">
        <div>
          <img src="/images/logo-white.png" alt="DASAN" className="footer-logo" width={128} height={30} />
          <strong>{lang === "ko" ? COMPANY.nameKo : COMPANY.nameVi}</strong>
          <br />
          {COMPANY.nameEn}
          <br />
          MST {COMPANY.taxCode} · {lang === "ko" ? "근로자파견업 허가" : "Giấy phép CTLLĐ"} {COMPANY.license}
          <br />
          {lang === "ko" ? COMPANY.addressKo : COMPANY.addressVi}
        </div>
        <div>
          {VN_CONTACTS.map((c) => (
            <span key={c.phone}>
              <a href={`tel:${c.tel}`}>{c.phone}</a> · <a href={`mailto:${c.email}`}>{c.email}</a>
              <br />
            </span>
          ))}
          {lang === "ko" ? "한국어" : "Tiếng Hàn"}: <a href={`tel:${KR_CONTACT.tel}`}>{KR_CONTACT.phone}</a> · <a href={`mailto:${KR_CONTACT.email}`}>{KR_CONTACT.email}</a>
          <br />© {new Date().getFullYear()} DASAN. {t.rights} · <a href="/admin">{t.admin}</a>
        </div>
      </div>
    </footer>
  );
}
