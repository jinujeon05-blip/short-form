import { NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import type { Language } from "../../i18n/translations";
import Icon from "../ui/Icon";

const LANGUAGE_LABELS: Record<Language, string> = {
  ko: "한국어",
  en: "English",
  vi: "Tiếng Việt",
};

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: "8px 12px",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 14,
    color: isActive ? "var(--primary)" : "var(--text)",
    background: isActive ? "var(--bg)" : "transparent",
  });

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        className="flex"
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <NavLink to="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--primary)" }}>
          <Icon name="sparkles" size={22} />
          <span style={{ fontWeight: 700, fontSize: 17, color: "#191f28" }}>{t("app.name")}</span>
        </NavLink>

        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <NavLink to="/" end style={navLinkStyle}>
            {t("nav.generator")}
          </NavLink>
          <NavLink to="/history" style={navLinkStyle}>
            {t("nav.history")}
          </NavLink>
          <label
            style={{
              marginLeft: 8,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Icon name="globe" size={16} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              aria-label="language"
              style={{ border: "none", background: "transparent", font: "inherit", cursor: "pointer" }}
            >
              {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
                <option key={lang} value={lang}>
                  {LANGUAGE_LABELS[lang]}
                </option>
              ))}
            </select>
          </label>
        </nav>
      </div>
    </header>
  );
}
