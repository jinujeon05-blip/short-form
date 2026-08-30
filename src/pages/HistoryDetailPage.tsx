import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useHistory } from "../context/HistoryContext";
import { PLATFORM_LABELS } from "../data/mockResults";
import GeneratedResultView from "../components/GeneratedResultView";
import Icon from "../components/ui/Icon";

export default function HistoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { items } = useHistory();

  const result = items.find((item) => item.id === id);

  if (!result) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 64px" }}>
        <p style={{ color: "var(--sub)" }}>{t("history.empty")}</p>
        <Link to="/history" className="btn-secondary btn" style={{ marginTop: 16 }}>
          {t("history.backToList")}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 64px" }}>
      <Link to="/history" style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--sub)", fontSize: 14, marginBottom: 16 }}>
        <Icon name="chevronLeft" size={16} />
        {t("history.backToList")}
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span className="badge">{t(`platform.${result.input.platform}`) || PLATFORM_LABELS[result.input.platform]}</span>
        <span style={{ fontSize: 12, color: "var(--sub)" }}>{new Date(result.createdAt).toLocaleString()}</span>
      </div>
      <h1 style={{ fontSize: 22, marginBottom: 24 }}>{result.input.sourceInfo}</h1>

      <GeneratedResultView result={result} />
    </div>
  );
}
