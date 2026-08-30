import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useHistory } from "../context/HistoryContext";
import { PLATFORM_LABELS } from "../data/mockResults";
import type { Platform } from "../types";
import Icon from "../components/ui/Icon";

type SortOrder = "newest" | "oldest";

export default function HistoryPage() {
  const { t } = useLanguage();
  const { items, loading } = useHistory();

  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [sort, setSort] = useState<SortOrder>("newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = items.filter((item) => {
      if (platform !== "all" && item.input.platform !== platform) return false;
      if (!q) return true;
      const haystack = `${item.input.sourceInfo} ${item.input.targetAudience} ${item.input.sellingPoint}`.toLowerCase();
      return haystack.includes(q);
    });
    list = [...list].sort((a, b) => {
      const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sort === "newest" ? -diff : diff;
    });
    return list;
  }, [items, query, platform, sort]);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 64px" }}>
      <h1 style={{ fontSize: 26 }}>{t("history.title")}</h1>
      <p style={{ color: "var(--sub)", marginTop: 8, marginBottom: 24 }}>{t("history.subtitle")}</p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <Icon name="search" size={16} color="var(--sub)" />
          </span>
          <input
            className="input"
            style={{ paddingLeft: 38 }}
            placeholder={t("history.search.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select className="input" style={{ width: 160 }} value={platform} onChange={(e) => setPlatform(e.target.value as Platform | "all")}>
          <option value="all">{t("history.filter.allPlatforms")}</option>
          {(Object.keys(PLATFORM_LABELS) as Platform[]).map((p) => (
            <option key={p} value={p}>
              {t(`platform.${p}`) || PLATFORM_LABELS[p]}
            </option>
          ))}
        </select>

        <select className="input" style={{ width: 140 }} value={sort} onChange={(e) => setSort(e.target.value as SortOrder)}>
          <option value="newest">{t("history.sort.newest")}</option>
          <option value="oldest">{t("history.sort.oldest")}</option>
        </select>
      </div>

      {loading ? (
        <p style={{ color: "var(--sub)", textAlign: "center", padding: "40px 0" }}>{t("history.loading")}</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: "var(--sub)", textAlign: "center", padding: "40px 0" }}>{t("history.empty")}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((item) => (
            <Link key={item.id} to={`/history/${item.id}`} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span className="badge">{t(`platform.${item.input.platform}`) || PLATFORM_LABELS[item.input.platform]}</span>
                  <span style={{ fontSize: 12, color: "var(--sub)" }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.input.sourceInfo}
                </p>
                <p style={{ fontSize: 13, color: "var(--sub)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.input.targetAudience} · {item.input.sellingPoint}
                </p>
              </div>
              <Icon name="chevronRight" size={20} color="var(--sub)" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
