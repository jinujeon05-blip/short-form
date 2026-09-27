import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useHistory } from "../context/HistoryContext";
import { PLATFORM_LABELS } from "../data/mockResults";
import { EXAMPLES } from "../data/examples";
import { analyzeVideo, generateContent } from "../lib/api";
import { rescaleTimingToVideoDuration } from "../lib/subtitleTiming";
import { PHOTO_SECONDS_PER_IMAGE, photoSlideshowSeconds } from "../lib/photoSlideshow";
import type { GeneratedResult, GeneratorInput, Platform, VideoTemplate } from "../types";
import Icon from "../components/ui/Icon";
import GeneratedResultView from "../components/GeneratedResultView";

const PLATFORMS: Platform[] = ["tiktok", "reels", "shorts"];
const TEMPLATES: VideoTemplate[] = ["branded", "overlay", "none", "photo"];

const emptyInput: GeneratorInput = {
  sourceInfo: "",
  platform: "tiktok",
  template: "branded",
  targetAudience: "",
  sellingPoint: "",
  commentKeyword: "",
  channel: "",
  headline: "",
  views: "",
  comments: "",
};

export default function GeneratorPage() {
  const { t, language } = useLanguage();
  const { addItem } = useHistory();

  // 영상 탐색 페이지에서 "이 영상으로 만들기"로 넘어오면 그 영상 정보가 state로 실려 옴
  const location = useLocation();
  const [input, setInput] = useState<GeneratorInput>(() => {
    const prefill = (location.state as { prefill?: Partial<GeneratorInput> } | null)?.prefill;
    return prefill ? { ...emptyInput, ...prefill } : emptyInput;
  });
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [sourceVideoFile, setSourceVideoFile] = useState<File | null>(null);
  const [isAnalyzingVideo, setIsAnalyzingVideo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const exampleIndexRef = useRef(0);
  const photos = input.sourcePhotos ?? [];

  // 사진은 올린 순서대로 슬라이드쇼가 되므로 기존 목록 뒤에 붙인다(같은 파일을 다시 고르면 또 추가됨)
  function handlePhotosSelect(files: FileList | null) {
    if (!files || files.length === 0) return;
    const added = Array.from(files).map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    setInput((prev) => ({ ...prev, sourcePhotos: [...(prev.sourcePhotos ?? []), ...added] }));
    setSaved(false);
    if (photoInputRef.current) photoInputRef.current.value = "";
  }

  function handlePhotoRemove(url: string) {
    setInput((prev) => ({ ...prev, sourcePhotos: (prev.sourcePhotos ?? []).filter((photo) => photo.url !== url) }));
    setSaved(false);
  }

  function update<K extends keyof GeneratorInput>(key: K, value: GeneratorInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleFillExample() {
    const examples = EXAMPLES[language];
    const example = examples[exampleIndexRef.current % examples.length];
    exampleIndexRef.current += 1;
    setInput((prev) => ({ ...prev, ...example }));
    setError(false);
    setApiError(null);
    setSaved(false);
  }

  // object URL은 저장된 이력에서도 계속 재생돼야 하므로 교체/제거 시 해제하지 않음
  // (탭을 닫으면 브라우저가 알아서 정리 — 이력 영속성이 없는 이 단계에서는 감수 가능한 트레이드오프)
  function handleVideoSelect(file: File | undefined) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    update("sourceVideo", { name: file.name, url });
    setSourceVideoFile(file);

    // 나레이션/자막 타이밍을 실제 영상 길이에 맞추려면 실제 재생 시간이 필요함(생성 프롬프트 + 내보내기 동기화에 사용)
    const probe = document.createElement("video");
    probe.preload = "metadata";
    probe.onloadedmetadata = () => {
      const durationSeconds = probe.duration;
      setInput((prev) =>
        prev.sourceVideo?.url === url ? { ...prev, sourceVideo: { ...prev.sourceVideo, durationSeconds } } : prev
      );
    };
    probe.src = url;
  }

  function handleVideoRemove() {
    update("sourceVideo", undefined);
    setSourceVideoFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleAnalyzeVideo() {
    if (!sourceVideoFile) return;
    setApiError(null);
    setIsAnalyzingVideo(true);
    try {
      const { sourceInfo, sellingPoint } = await analyzeVideo(sourceVideoFile, language);
      update("sourceInfo", sourceInfo);
      update("sellingPoint", sellingPoint);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsAnalyzingVideo(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !input.sourceInfo.trim() ||
      !input.targetAudience.trim() ||
      !input.sellingPoint.trim() ||
      // 댓글 유도 키워드는 체크를 켰을 때만 필수
      (input.useCommentKeyword !== false && !input.commentKeyword.trim()) ||
      // 채널명은 파란 브랜드 헤더에만 쓰이고, 훅 문구는 글자를 넣는 템플릿에서만 쓰인다
      (input.template === "branded" || input.template === undefined ? !input.channel.trim() : false) ||
      (input.template !== "none" && !input.headline.trim())
    ) {
      setError(true);
      return;
    }
    setError(false);
    setApiError(null);
    setIsGenerating(true);
    setResult(null);

    try {
      const content = await generateContent(input, language);
      const durationSeconds = input.sourceVideo?.durationSeconds ?? photoSlideshowSeconds(input);
      const adjusted = durationSeconds ? rescaleTimingToVideoDuration(content, durationSeconds) : content;
      setResult({
        id: `result-${Date.now()}`,
        createdAt: new Date().toISOString(),
        input,
        ...adjusted,
      });
    } catch (err) {
      setApiError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSave() {
    if (!result) return;
    try {
      await addItem(result);
      setSaved(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 64px" }}>
      <h1 style={{ fontSize: 26 }}>{t("generator.title")}</h1>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginTop: 8, marginBottom: 28 }}>
        <p style={{ color: "var(--sub)" }}>{t("generator.subtitle")}</p>
        <button type="button" className="btn-secondary btn-sm" onClick={handleFillExample} style={{ flexShrink: 0 }}>
          <Icon name="sparkles" size={14} />
          {t("generator.fillExample")}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Field icon="video" label={t("generator.form.sourceInfo")}>
          <textarea
            className="input"
            rows={3}
            placeholder={t("generator.form.sourceInfoPlaceholder")}
            value={input.sourceInfo}
            onChange={(e) => update("sourceInfo", e.target.value)}
            style={{ resize: "vertical" }}
          />
        </Field>

        {/* 사진 슬라이드쇼 템플릿은 영상 대신 사진 여러 장을 올린다 */}
        {input.template === "photo" ? (
          <Field icon="upload" label={t("generator.form.sourcePhotos")}>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => handlePhotosSelect(e.target.files)}
            />
            {photos.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {photos.map((photo, i) => (
                  <div key={photo.url} style={{ position: "relative" }}>
                    <img
                      src={photo.url}
                      alt=""
                      style={{ width: 64, height: 96, objectFit: "cover", borderRadius: 8, display: "block", background: "var(--bg)" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: 4,
                        top: 4,
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "1px 5px",
                      }}
                    >
                      {i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePhotoRemove(photo.url)}
                      aria-label={`remove photo ${i + 1}`}
                      style={{
                        position: "absolute",
                        right: 2,
                        top: 2,
                        background: "rgba(0,0,0,0.6)",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        color: "#fff",
                        display: "flex",
                        padding: 2,
                      }}
                    >
                      <Icon name="close" size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              className="btn-secondary btn-sm"
              style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 8 }}
              onClick={() => photoInputRef.current?.click()}
            >
              <Icon name="upload" size={14} />
              {t("generator.form.sourcePhotosSelect")}
            </button>
            <span style={{ fontSize: 12, color: "var(--sub)" }}>
              {photos.length > 0
                ? t("generator.form.sourcePhotosCount")
                    .replace("{count}", String(photos.length))
                    .replace("{seconds}", String(photos.length * PHOTO_SECONDS_PER_IMAGE))
                : t("generator.form.sourcePhotosHint")}
            </span>
          </Field>
        ) : (
        <Field icon="upload" label={t("generator.form.sourceVideo")}>
          {input.sourceVideo ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "10px 14px",
                }}
              >
                <span style={{ fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {input.sourceVideo.name}
                </span>
                <button
                  type="button"
                  onClick={handleVideoRemove}
                  aria-label="remove video"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sub)", display: "flex" }}
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
              {sourceVideoFile && (
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 8 }}
                  onClick={handleAnalyzeVideo}
                  disabled={isAnalyzingVideo}
                >
                  <Icon name="sparkles" size={14} />
                  {isAnalyzingVideo ? t("generator.form.analyzingVideo") : t("generator.form.analyzeVideo")}
                </button>
              )}
              {/* 큰 영상은 업로드+분석에 몇 분씩 걸려서(95MB 실측 약 3분 30초) 안내가 없으면 멈춘 걸로 보임 */}
              {isAnalyzingVideo && (
                <p style={{ fontSize: 12, color: "var(--sub)" }}>{t("generator.form.analyzingVideoNote")}</p>
              )}
            </div>
          ) : (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                onChange={(e) => handleVideoSelect(e.target.files?.[0])}
              />
              <button
                type="button"
                className="btn-secondary btn-sm"
                style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 8 }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Icon name="upload" size={14} />
                {t("generator.form.sourceVideoSelect")}
              </button>
            </>
          )}
          <span style={{ fontSize: 12, color: "var(--sub)" }}>{t("generator.form.sourceVideoHint")}</span>
        </Field>
        )}

        <Field icon="target" label={t("generator.form.platform")}>
          <select
            className="input"
            value={input.platform}
            onChange={(e) => update("platform", e.target.value as Platform)}
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {t(`platform.${p}`) || PLATFORM_LABELS[p]}
              </option>
            ))}
          </select>
        </Field>

        <Field icon="video" label={t("generator.form.template")}>
          <select
            className="input"
            value={input.template ?? "branded"}
            onChange={(e) => update("template", e.target.value as VideoTemplate)}
          >
            {TEMPLATES.map((tpl) => (
              <option key={tpl} value={tpl}>
                {t(`template.${tpl}`)}
              </option>
            ))}
          </select>
          <span style={{ fontSize: 12, color: "var(--sub)" }}>{t(`template.${input.template ?? "branded"}.hint`)}</span>
        </Field>

        <Field icon="users" label={t("generator.form.targetAudience")}>
          <input
            className="input"
            placeholder={t("generator.form.targetAudiencePlaceholder")}
            value={input.targetAudience}
            onChange={(e) => update("targetAudience", e.target.value)}
          />
        </Field>

        <Field icon="tag" label={t("generator.form.sellingPoint")}>
          <input
            className="input"
            placeholder={t("generator.form.sellingPointPlaceholder")}
            value={input.sellingPoint}
            onChange={(e) => update("sellingPoint", e.target.value)}
          />
        </Field>

        <Field icon="message" label={t("generator.form.commentKeyword")}>
          {/* 체크를 끄면 대본에 댓글 유도 멘트를 아예 넣지 않는다(입력칸도 잠금) */}
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={input.useCommentKeyword !== false}
              onChange={(e) => update("useCommentKeyword", e.target.checked)}
            />
            {t("generator.form.useCommentKeyword")}
          </label>
          {input.useCommentKeyword !== false && (
            <>
              <input
                className="input"
                placeholder={t("generator.form.commentKeywordPlaceholder")}
                value={input.commentKeyword}
                onChange={(e) => update("commentKeyword", e.target.value)}
              />
              <span style={{ fontSize: 12, color: "var(--sub)" }}>{t("generator.form.commentKeywordHint")}</span>
            </>
          )}
        </Field>

        {/* 채널명·조회수·댓글수는 파란 브랜드 헤더에만 들어가는 값이라 다른 템플릿에서는 숨긴다 */}
        {(input.template ?? "branded") === "branded" && (
          <Field icon="tag" label={t("generator.form.channel")}>
            <input
              className="input"
              placeholder={t("generator.form.channelPlaceholder")}
              value={input.channel}
              onChange={(e) => update("channel", e.target.value)}
            />
          </Field>
        )}

        {/* 훅 문구는 화면에 글자를 얹는 템플릿에서만 쓰인다 */}
        {input.template !== "none" && (
          <Field icon="sparkles" label={t("generator.form.headline")}>
            <input
              className="input"
              placeholder={t("generator.form.headlinePlaceholder")}
              value={input.headline}
              onChange={(e) => update("headline", e.target.value)}
            />
            <span style={{ fontSize: 12, color: "var(--sub)" }}>
              {t(
                (input.template ?? "branded") === "branded"
                  ? "generator.form.headlineHint"
                  : "generator.form.headlineHintOverlay"
              )}
            </span>
          </Field>
        )}

        <div
          style={{
            display: (input.template ?? "branded") === "branded" ? "grid" : "none",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <Field icon="users" label={t("generator.form.views")}>
            <input
              className="input"
              placeholder="12.5만"
              value={input.views ?? ""}
              onChange={(e) => update("views", e.target.value)}
            />
          </Field>
          <Field icon="message" label={t("generator.form.comments")}>
            <input
              className="input"
              placeholder="1,024"
              value={input.comments ?? ""}
              onChange={(e) => update("comments", e.target.value)}
            />
          </Field>
        </div>

        {error && (
          <p style={{ color: "var(--danger)", fontSize: 13, fontWeight: 600 }}>{t("generator.form.required")}</p>
        )}
        {apiError && (
          <p style={{ color: "var(--danger)", fontSize: 13, fontWeight: 600 }}>{apiError}</p>
        )}

        <button type="submit" className="btn" disabled={isGenerating}>
          <Icon name="sparkles" size={18} />
          {isGenerating ? t("generator.form.generating") : t("generator.form.submit")}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 24 }}>
          <GeneratedResultView result={result} onSave={handleSave} saved={saved} />
        </div>
      )}
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: "video" | "target" | "users" | "tag" | "upload" | "message" | "sparkles";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "#191f28" }}>
        <Icon name={icon} size={16} />
        {label}
      </span>
      {children}
    </label>
  );
}
