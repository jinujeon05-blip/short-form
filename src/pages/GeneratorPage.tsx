import { useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useHistory } from "../context/HistoryContext";
import { PLATFORM_LABELS } from "../data/mockResults";
import { generateContent } from "../lib/api";
import type { GeneratedResult, GeneratorInput, Platform } from "../types";
import Icon from "../components/ui/Icon";
import GeneratedResultView from "../components/GeneratedResultView";

const PLATFORMS: Platform[] = ["tiktok", "reels", "shorts"];

const emptyInput: GeneratorInput = {
  sourceInfo: "",
  platform: "tiktok",
  targetAudience: "",
  sellingPoint: "",
};

export default function GeneratorPage() {
  const { t, language } = useLanguage();
  const { addItem } = useHistory();

  const [input, setInput] = useState<GeneratorInput>(emptyInput);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof GeneratorInput>(key: K, value: GeneratorInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  // object URL은 저장된 이력에서도 계속 재생돼야 하므로 교체/제거 시 해제하지 않음
  // (탭을 닫으면 브라우저가 알아서 정리 — 이력 영속성이 없는 이 단계에서는 감수 가능한 트레이드오프)
  function handleVideoSelect(file: File | undefined) {
    if (!file) return;
    update("sourceVideo", { name: file.name, url: URL.createObjectURL(file) });
  }

  function handleVideoRemove() {
    update("sourceVideo", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.sourceInfo.trim() || !input.targetAudience.trim() || !input.sellingPoint.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setApiError(null);
    setIsGenerating(true);
    setResult(null);

    try {
      const content = await generateContent(input, language);
      setResult({
        id: `result-${Date.now()}`,
        createdAt: new Date().toISOString(),
        input,
        ...content,
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
      <p style={{ color: "var(--sub)", marginTop: 8, marginBottom: 28 }}>{t("generator.subtitle")}</p>

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

        <Field icon="upload" label={t("generator.form.sourceVideo")}>
          {input.sourceVideo ? (
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
  icon: "video" | "target" | "users" | "tag" | "upload";
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
