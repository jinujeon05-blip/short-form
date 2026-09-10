import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { NavLink, Navigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import type { SearchKeyword, VideoSearchItem, VideoSearchPlatform, VideoSearchPlatformStatus } from "../types";
import * as videoSearchApi from "../lib/videoSearchApi";
import Icon from "../components/ui/Icon";

const PLATFORMS: VideoSearchPlatform[] = ["youtube", "tiktok", "instagram", "douyin", "xiaohongshu"];

type SortKey = "views" | "comments";

function isPlatform(value: string | undefined): value is VideoSearchPlatform {
  return PLATFORMS.includes(value as VideoSearchPlatform);
}

export default function TrendsPage() {
  const { platform } = useParams();
  if (!isPlatform(platform)) return <Navigate to="/trends/youtube" replace />;
  // key로 플랫폼마다 상태(검색어·결과)를 완전히 분리 — 탭을 바꾸면 각자 별개 페이지처럼 동작
  return <PlatformTrends key={platform} platform={platform} />;
}

function PlatformTrends({ platform }: { platform: VideoSearchPlatform }) {
  const { language, t } = useLanguage();

  const [statuses, setStatuses] = useState<VideoSearchPlatformStatus[]>([]);
  const [keywords, setKeywords] = useState<SearchKeyword[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [keywordError, setKeywordError] = useState("");

  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [shortOnly, setShortOnly] = useState(true);
  const [sort, setSort] = useState<SortKey>("views");
  const [items, setItems] = useState<VideoSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    videoSearchApi.listVideoSearchPlatforms().then(setStatuses).catch(() => setStatuses([]));
    videoSearchApi.listKeywords(platform).then(setKeywords).catch((err) => setKeywordError(err.message));
  }, [platform]);

  const status = statuses.find((s) => s.id === platform);
  const available = status?.available ?? false;

  const numberFormat = useMemo(
    () => new Intl.NumberFormat(language === "ko" ? "ko-KR" : language === "vi" ? "vi-VN" : "en-US", { notation: "compact", maximumFractionDigits: 1 }),
    [language]
  );

  const sorted = useMemo(() => {
    const value = (item: VideoSearchItem) => (sort === "views" ? item.views : item.comments ?? -1);
    return [...items].sort((a, b) => value(b) - value(a));
  }, [items, sort]);

  async function runSearch(q: string) {
    const trimmed = q.trim();
    if (!trimmed || loading) return;
    setQuery(trimmed);
    setLoading(true);
    setError("");
    try {
      setItems(await videoSearchApi.searchVideos(platform, trimmed, platform === "youtube" && shortOnly));
      setSearchedQuery(trimmed);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setItems([]);
      setSearchedQuery("");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddKeyword(e: FormEvent) {
    e.preventDefault();
    const keyword = newKeyword.trim();
    if (!keyword) return;
    setKeywordError("");
    try {
      const saved = await videoSearchApi.addKeyword(platform, keyword);
      setKeywords((prev) => (prev.some((k) => k.id === saved.id) ? prev : [...prev, saved]));
      setNewKeyword("");
    } catch (err) {
      setKeywordError(err instanceof Error ? err.message : String(err));
    }
  }

  async function handleDeleteKeyword(id: number) {
    setKeywordError("");
    try {
      await videoSearchApi.deleteKeyword(id);
      setKeywords((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      setKeywordError(err instanceof Error ? err.message : String(err));
    }
  }

  const tabStyle = ({ isActive }: { isActive: boolean }) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 999,
    fontWeight: 600,
    fontSize: 14,
    border: "1px solid",
    borderColor: isActive ? "var(--primary)" : "var(--border)",
    color: isActive ? "#fff" : "var(--text)",
    background: isActive ? "var(--primary)" : "var(--surface)",
  });

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px 64px" }}>
      <h1 style={{ fontSize: 26 }}>{t("trends.title")}</h1>
      <p style={{ color: "var(--sub)", marginTop: 8, marginBottom: 20 }}>{t("trends.subtitle")}</p>

      <nav style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {PLATFORMS.map((p) => {
          const pStatus = statuses.find((s) => s.id === p);
          return (
            <NavLink key={p} to={`/trends/${p}`} style={tabStyle}>
              {t(`trends.platform.${p}`)}
              {pStatus?.reason === "no-provider" && <span style={{ fontSize: 11, opacity: 0.75 }}>· {t("trends.comingSoon")}</span>}
            </NavLink>
          );
        })}
      </nav>

      {status && !available && (
        <div className="card" style={{ marginBottom: 16, borderColor: "var(--warning)", background: "#fffbea", fontSize: 14 }}>
          {t(status.reason === "no-key" ? "trends.unavailable.noKey" : "trends.unavailable.noProvider")}
        </div>
      )}

      <section className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
          <h2 style={{ fontSize: 16 }}>{t("trends.keywords.title")}</h2>
          <span style={{ fontSize: 12, color: "var(--sub)" }}>{t("trends.keywords.hint")}</span>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {keywords.length === 0 && <span style={{ fontSize: 13, color: "var(--sub)" }}>{t("trends.keywords.empty")}</span>}
          {keywords.map((k) => {
            const active = k.keyword === searchedQuery;
            return (
              <span
                key={k.id}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: 999,
                  border: "1px solid",
                  borderColor: active ? "var(--primary)" : "var(--border)",
                  background: active ? "#e8f3ff" : "var(--bg)",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <button
                  type="button"
                  onClick={() => runSearch(k.keyword)}
                  disabled={!available || loading}
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: "6px 4px 6px 12px",
                    font: "inherit",
                    color: active ? "var(--primary)" : "var(--text)",
                    cursor: available && !loading ? "pointer" : "default",
                  }}
                >
                  {k.keyword}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteKeyword(k.id)}
                  aria-label={`${t("trends.keywords.delete")} ${k.keyword}`}
                  title={t("trends.keywords.delete")}
                  style={{ border: "none", background: "transparent", padding: "6px 10px 6px 4px", cursor: "pointer", color: "var(--sub)", display: "inline-flex" }}
                >
                  <Icon name="close" size={13} />
                </button>
              </span>
            );
          })}
        </div>

        <form onSubmit={handleAddKeyword} style={{ display: "flex", gap: 8 }}>
          <input
            className="input"
            style={{ padding: "8px 12px", fontSize: 14 }}
            placeholder={t("trends.keywords.addPlaceholder")}
            value={newKeyword}
            maxLength={50}
            onChange={(e) => setNewKeyword(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary btn-sm" disabled={!newKeyword.trim()}>
            <Icon name="plus" size={14} />
            {t("trends.keywords.add")}
          </button>
        </form>
        {keywordError && <p style={{ color: "var(--danger)", fontSize: 13, marginTop: 8 }}>{keywordError}</p>}
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(query);
        }}
        style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}
      >
        <div style={{ position: "relative", flex: "1 1 260px" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <Icon name="search" size={16} color="var(--sub)" />
          </span>
          <input
            className="input"
            style={{ paddingLeft: 38 }}
            placeholder={t("trends.search.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={!available}
          />
        </div>
        <button type="submit" className="btn" disabled={!available || loading || !query.trim()}>
          {t("trends.search.button")}
        </button>
        <select className="input" style={{ width: 150 }} value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
          <option value="views">{t("trends.sort.views")}</option>
          <option value="comments">{t("trends.sort.comments")}</option>
        </select>
      </form>

      {platform === "youtube" && (
        <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, marginBottom: 16, cursor: "pointer" }}>
          <input type="checkbox" checked={shortOnly} onChange={(e) => setShortOnly(e.target.checked)} />
          {t("trends.search.shortOnly")}
        </label>
      )}

      {error && (
        <div className="card" style={{ borderColor: "var(--danger)", color: "var(--danger)", fontSize: 14, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: "var(--sub)", textAlign: "center", padding: "40px 0" }}>{t("trends.results.loading")}</p>
      ) : !searchedQuery ? (
        !error && <p style={{ color: "var(--sub)", textAlign: "center", padding: "40px 0" }}>{t("trends.results.idle")}</p>
      ) : sorted.length === 0 ? (
        <p style={{ color: "var(--sub)", textAlign: "center", padding: "40px 0" }}>{t("trends.results.empty")}</p>
      ) : (
        <>
          <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 10 }}>
            {t("trends.results.count").replace("{query}", searchedQuery).replace("{count}", String(sorted.length))}
            {sort === "comments" && platform === "youtube" && ` · ${t("trends.sort.commentsNote")}`}
          </p>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {sorted.map((item, index) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card"
                  style={{ display: "flex", gap: 12, alignItems: "center", padding: 10 }}
                >
                  <span style={{ width: 32, flexShrink: 0, textAlign: "center", fontWeight: 700, color: index < 3 ? "var(--primary)" : "var(--sub)" }}>
                    {index + 1}
                  </span>
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt=""
                      loading="lazy"
                      style={{ width: 144, height: 81, objectFit: "cover", borderRadius: 8, flexShrink: 0, background: "var(--bg)" }}
                    />
                  )}
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p
                      style={{
                        fontWeight: 600,
                        color: "#191f28",
                        fontSize: 14,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.title}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.channel}
                      {item.publishedAt && ` · ${new Date(item.publishedAt).toLocaleDateString()}`}
                    </p>
                    <p style={{ fontSize: 13, marginTop: 4, display: "flex", gap: 12 }}>
                      <span style={{ fontWeight: sort === "views" ? 700 : 500 }}>
                        {t("trends.stat.views")} {numberFormat.format(item.views)}
                      </span>
                      <span style={{ fontWeight: sort === "comments" ? 700 : 500 }}>
                        {t("trends.stat.comments")} {item.comments == null ? t("trends.stat.commentsOff") : numberFormat.format(item.comments)}
                      </span>
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
