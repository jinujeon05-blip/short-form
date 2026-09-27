import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import type {
  GeneratorInput,
  HookAnalysis,
  Platform,
  SearchKeyword,
  SearchPeriod,
  VideoSearchItem,
  VideoSearchPlatform,
  VideoSearchPlatformStatus,
} from "../types";
import * as videoSearchApi from "../lib/videoSearchApi";
import Icon from "../components/ui/Icon";

const PLATFORMS: VideoSearchPlatform[] = ["youtube", "tiktok", "instagram", "douyin", "xiaohongshu"];

type SortKey = "views" | "comments" | "engagement";

const PERIODS: SearchPeriod[] = ["all", "week", "month", "quarter", "year"];

// 탐색한 영상을 생성기로 넘길 때, 그 플랫폼에서 만들 법한 결과물 형식을 기본값으로 고름
const TARGET_PLATFORM: Record<VideoSearchPlatform, Platform> = {
  youtube: "shorts",
  instagram: "reels",
  tiktok: "tiktok",
  douyin: "tiktok",
  xiaohongshu: "reels",
};

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
  const navigate = useNavigate();

  const [statuses, setStatuses] = useState<VideoSearchPlatformStatus[]>([]);
  const [keywords, setKeywords] = useState<SearchKeyword[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [keywordError, setKeywordError] = useState("");

  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [shortOnly, setShortOnly] = useState(true);
  const [period, setPeriod] = useState<SearchPeriod>("all");
  const [sort, setSort] = useState<SortKey>("views");
  const [items, setItems] = useState<VideoSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [analysis, setAnalysis] = useState<HookAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

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

  // 조회수가 수백만인 숏폼에서 댓글 비율은 보통 0.01% 미만이라 소수점 자리수를 고정하면 전부 0.00%로
  // 뭉개짐 — 유효숫자 2자리로 표시해서 0.00038%든 1.2%든 항상 차이가 보이게 함
  const engagementFormat = useMemo(
    () => new Intl.NumberFormat(language === "ko" ? "ko-KR" : language === "vi" ? "vi-VN" : "en-US", { maximumSignificantDigits: 2 }),
    [language]
  );

  const sorted = useMemo(() => {
    // 참여율 = 댓글수 / 조회수. 조회수는 적어도 댓글이 유난히 많이 달린 영상(= 반응이 뜨거운 소재)을
    // 찾으려는 것. 댓글을 막아둔 영상은 비교 대상이 아니라서 항상 맨 뒤로 보냄(-1)
    const value = (item: VideoSearchItem) => {
      if (sort === "views") return item.views;
      if (sort === "comments") return item.comments ?? -1;
      return item.comments == null || item.views === 0 ? -1 : item.comments / item.views;
    };
    return [...items].sort((a, b) => value(b) - value(a));
  }, [items, sort]);

  async function runSearch(q: string) {
    const trimmed = q.trim();
    if (!trimmed || loading) return;
    setQuery(trimmed);
    setLoading(true);
    setError("");
    setAnalysis(null);
    setAnalysisError("");
    try {
      setItems(
        await videoSearchApi.searchVideos(platform, trimmed, { shortOnly: platform === "youtube" && shortOnly, period })
      );
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

  async function handleAnalyzeHooks() {
    if (analyzing || sorted.length === 0) return;
    setAnalyzing(true);
    setAnalysisError("");
    try {
      setAnalysis(
        await videoSearchApi.analyzeHooks(
          sorted.map((item) => item.title),
          searchedQuery,
          language
        )
      );
    } catch (err) {
      setAnalysisError(err instanceof Error ? err.message : String(err));
    } finally {
      setAnalyzing(false);
    }
  }

  function handleUseVideo(item: VideoSearchItem) {
    // 제목의 해시태그는 화면에 큰 글씨로 얹을 훅 문구로는 방해만 되므로 빼고 넘김
    const headline = item.title.replace(/#[^\s#]+/g, "").replace(/\s+/g, " ").trim() || item.title;
    const prefill: Partial<GeneratorInput> = {
      sourceInfo: `${item.title}\n${item.url}`,
      platform: TARGET_PLATFORM[platform],
      channel: item.channel,
      headline,
      views: numberFormat.format(item.views),
      comments: item.comments == null ? "" : numberFormat.format(item.comments),
    };
    navigate("/", { state: { prefill } });
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
        <select
          className="input"
          style={{ width: 140 }}
          value={period}
          onChange={(e) => setPeriod(e.target.value as SearchPeriod)}
          disabled={!available}
        >
          {PERIODS.map((p) => (
            <option key={p} value={p}>
              {t(`trends.period.${p}`)}
            </option>
          ))}
        </select>
        <select className="input" style={{ width: 160 }} value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
          <option value="views">{t("trends.sort.views")}</option>
          <option value="comments">{t("trends.sort.comments")}</option>
          <option value="engagement">{t("trends.sort.engagement")}</option>
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
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
            <p style={{ fontSize: 13, color: "var(--sub)", flex: "1 1 240px" }}>
              {t("trends.results.count").replace("{query}", searchedQuery).replace("{count}", String(sorted.length))}
              {sort !== "views" && platform === "youtube" && ` · ${t("trends.sort.rerankNote")}`}
            </p>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleAnalyzeHooks} disabled={analyzing}>
              <Icon name="sparkles" size={14} />
              {analyzing ? t("trends.hooks.loading") : t("trends.hooks.button")}
            </button>
          </div>

          {analysisError && (
            <div className="card" style={{ borderColor: "var(--danger)", color: "var(--danger)", fontSize: 14, marginBottom: 12 }}>
              {analysisError}
            </div>
          )}

          {analysis && <HookReport analysis={analysis} t={t} onClose={() => setAnalysis(null)} />}

          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {sorted.map((item, index) => (
              <li key={item.id} className="card" style={{ display: "flex", gap: 12, alignItems: "center", padding: 10 }}>
                <span style={{ width: 32, flexShrink: 0, textAlign: "center", fontWeight: 700, color: index < 3 ? "var(--primary)" : "var(--sub)" }}>
                  {index + 1}
                </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0, flex: 1 }}
                >
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
                      {item.comments != null && item.views > 0 && (
                        <span style={{ fontWeight: sort === "engagement" ? 700 : 500, color: "var(--sub)" }}>
                          {t("trends.stat.engagement")} {engagementFormat.format((item.comments / item.views) * 100)}%
                        </span>
                      )}
                    </p>
                  </div>
                </a>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ flexShrink: 0 }}
                  onClick={() => handleUseVideo(item)}
                >
                  <Icon name="sparkles" size={14} />
                  {t("trends.use")}
                </button>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

function HookReport({
  analysis,
  t,
  onClose,
}: {
  analysis: HookAnalysis;
  t: (key: string) => string;
  onClose: () => void;
}) {
  return (
    <section className="card" style={{ marginBottom: 16, borderColor: "var(--primary)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <h2 style={{ fontSize: 16, flex: 1 }}>{t("trends.hooks.title")}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("trends.hooks.close")}
          title={t("trends.hooks.close")}
          style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--sub)", display: "inline-flex", padding: 4 }}
        >
          <Icon name="close" size={16} />
        </button>
      </div>

      <p style={{ fontSize: 14, marginBottom: 16 }}>{analysis.summary}</p>

      <h3 style={{ fontSize: 14, marginBottom: 8 }}>{t("trends.hooks.patterns")}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {analysis.patterns.map((pattern) => (
          <div key={pattern.name} style={{ background: "var(--bg)", borderRadius: 10, padding: 12 }}>
            <p style={{ fontWeight: 700, color: "#191f28", fontSize: 14 }}>{pattern.name}</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>{pattern.explanation}</p>
            <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontSize: 12, color: "var(--sub)" }}>
              {pattern.examples.map((example, i) => (
                <li key={i}>{example}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 14, marginBottom: 8 }}>{t("trends.hooks.keywords")}</h3>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {analysis.keywords.map((keyword) => (
          <span key={keyword} className="badge">
            {keyword}
          </span>
        ))}
      </div>

      <h3 style={{ fontSize: 14, marginBottom: 8 }}>{t("trends.hooks.suggestions")}</h3>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, display: "flex", flexDirection: "column", gap: 6 }}>
        {analysis.suggestions.map((suggestion, i) => (
          <li key={i}>{suggestion}</li>
        ))}
      </ul>
    </section>
  );
}
