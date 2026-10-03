import { useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { PLATFORM_LABELS } from "../data/mockResults";
import { imageToAnalysisPayload } from "../lib/imageResize";
import { createVideoPrompt } from "../lib/promptStudioApi";
import type { Platform, PromptConcept, PromptImage, VideoPromptResult } from "../types";
import Icon from "../components/ui/Icon";

const PLATFORMS: Platform[] = ["tiktok", "reels", "shorts"];
const DURATIONS = [15, 30, 45, 60];
// 사용자가 쓰는 영상 생성 AI들 — 체크한 도구마다 붙여넣을 프롬프트를 따로 만들어준다
const TOOL_OPTIONS = ["Dola AI", "Google Gemini (Veo)", "Meta AI", "Runway", "Kling", "공통(어떤 도구에나)"];
const DEFAULT_TOOLS = ["Dola AI", "Google Gemini (Veo)", "Meta AI", "공통(어떤 도구에나)"];
const MAX_IMAGES = 12;
const CONCEPTS: PromptConcept[] = ["ugc", "pov", "unboxing"];

export default function PromptStudioPage() {
  const { t, language } = useLanguage();

  const [images, setImages] = useState<PromptImage[]>([]);
  const [productName, setProductName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [platform, setPlatform] = useState<Platform>("tiktok");
  const [durationSeconds, setDurationSeconds] = useState(30);
  const [tools, setTools] = useState<string[]>(DEFAULT_TOOLS);
  const [concepts, setConcepts] = useState<PromptConcept[]>([]);
  const [customTool, setCustomTool] = useState("");
  const [extraNote, setExtraNote] = useState("");

  const [result, setResult] = useState<VideoPromptResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 실제 파일은 분석할 때만 쓰므로 화면 상태(PromptImage)와 분리해서 보관한다
  const filesRef = useRef(new Map<string, File>());
  const productInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);

  const productCount = images.filter((img) => img.kind === "product").length;

  function addImages(fileList: FileList | null, kind: "product" | "model") {
    if (!fileList || fileList.length === 0) return;
    const room = MAX_IMAGES - images.length;
    if (room <= 0) {
      setError(t("prompt.error.tooMany").replace("{max}", String(MAX_IMAGES)));
      return;
    }
    const added = Array.from(fileList)
      .slice(0, room)
      .map((file) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        filesRef.current.set(id, file);
        return { id, name: file.name, url: URL.createObjectURL(file), kind };
      });
    setImages((prev) => [...prev, ...added]);
    setError("");
    if (productInputRef.current) productInputRef.current.value = "";
    if (modelInputRef.current) modelInputRef.current.value = "";
  }

  function removeImage(id: string) {
    filesRef.current.delete(id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  function toggleTool(tool: string) {
    setTools((prev) => (prev.includes(tool) ? prev.filter((x) => x !== tool) : [...prev, tool]));
  }

  function addCustomTool() {
    const name = customTool.trim();
    if (!name || tools.includes(name)) return;
    setTools((prev) => [...prev, name]);
    setCustomTool("");
  }

  async function copy(key: string, text: string) {
    const ok = await copyToClipboard(text);
    if (!ok) {
      setError(t("prompt.error.copy"));
      return;
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1500);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (productCount === 0) {
      setError(t("prompt.error.needProduct"));
      return;
    }
    if (tools.length === 0) {
      setError(t("prompt.error.needTool"));
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    try {
      const payload = await Promise.all(
        images.map(async (img) => {
          const file = filesRef.current.get(img.id)!;
          const { data, mimeType } = await imageToAnalysisPayload(file);
          return { data, mimeType, kind: img.kind };
        })
      );
      setResult(
        await createVideoPrompt({
          images: payload,
          productName,
          targetAudience,
          platform,
          durationSeconds,
          tools,
          concepts,
          extraNote,
          language,
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  const captionsText = result?.captions.map((c) => `${c.timestamp}  ${c.text}`).join("\n") ?? "";

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px 64px" }}>
      <h1 style={{ fontSize: 26 }}>{t("prompt.title")}</h1>
      <p style={{ color: "var(--sub)", marginTop: 8, marginBottom: 24 }}>{t("prompt.subtitle")}</p>

      <form onSubmit={handleSubmit} className="card" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <Label icon="upload" text={t("prompt.form.photos")} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            <input
              ref={productInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => addImages(e.target.files, "product")}
            />
            <input
              ref={modelInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => addImages(e.target.files, "model")}
            />
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => productInputRef.current?.click()}>
              <Icon name="plus" size={14} />
              {t("prompt.form.addProduct")}
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => modelInputRef.current?.click()}>
              <Icon name="users" size={14} />
              {t("prompt.form.addModel")}
            </button>
          </div>

          {images.length > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              {images.map((img) => (
                <div key={img.id} style={{ position: "relative" }}>
                  <img
                    src={img.url}
                    alt=""
                    style={{ width: 72, height: 96, objectFit: "cover", borderRadius: 8, display: "block", background: "var(--bg)" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: 4,
                      bottom: 4,
                      background: img.kind === "model" ? "var(--primary)" : "rgba(0,0,0,0.65)",
                      color: "#fff",
                      borderRadius: 6,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "1px 5px",
                    }}
                  >
                    {t(img.kind === "model" ? "prompt.badge.model" : "prompt.badge.product")}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    aria-label={`remove ${img.name}`}
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
          <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 8 }}>{t("prompt.form.photosHint")}</p>
        </div>

        <div>
          <Label icon="tag" text={t("prompt.form.productName")} />
          <input
            className="input"
            style={{ marginTop: 8 }}
            placeholder={t("prompt.form.productNamePlaceholder")}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div>
          <Label icon="users" text={t("prompt.form.audience")} />
          <input
            className="input"
            style={{ marginTop: 8 }}
            placeholder={t("prompt.form.audiencePlaceholder")}
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <Label icon="target" text={t("prompt.form.platform")} />
            <select
              className="input"
              style={{ marginTop: 8 }}
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {t(`platform.${p}`) || PLATFORM_LABELS[p]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label icon="clock" text={t("prompt.form.duration")} />
            <select
              className="input"
              style={{ marginTop: 8 }}
              value={durationSeconds}
              onChange={(e) => setDurationSeconds(Number(e.target.value))}
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                  {t("prompt.form.seconds")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label icon="video" text={t("prompt.form.concepts")} />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {CONCEPTS.map((concept) => {
              const active = concepts.includes(concept);
              return (
                <button
                  key={concept}
                  type="button"
                  onClick={() =>
                    setConcepts((prev) => (prev.includes(concept) ? prev.filter((c) => c !== concept) : [...prev, concept]))
                  }
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: "1px solid",
                    borderColor: active ? "var(--primary)" : "var(--border)",
                    background: active ? "var(--primary)" : "var(--surface)",
                    color: active ? "#fff" : "var(--text)",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {active && <Icon name="check" size={13} />}
                  {t(`prompt.concept.${concept}`)}
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 8 }}>
            {concepts.length === 0
              ? t("prompt.form.conceptsHint")
              : concepts.map((concept) => t(`prompt.concept.${concept}.hint`)).join(" ")}
          </p>
        </div>

        <div>
          <Label icon="sparkles" text={t("prompt.form.tools")} />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
            {Array.from(new Set([...TOOL_OPTIONS, ...tools])).map((tool) => (
              <label key={tool} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
                <input type="checkbox" checked={tools.includes(tool)} onChange={() => toggleTool(tool)} />
                {tool}
              </label>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <input
              className="input"
              style={{ padding: "8px 12px", fontSize: 14 }}
              placeholder={t("prompt.form.customTool")}
              value={customTool}
              onChange={(e) => setCustomTool(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomTool();
                }
              }}
            />
            <button type="button" className="btn btn-secondary btn-sm" onClick={addCustomTool} disabled={!customTool.trim()}>
              <Icon name="plus" size={14} />
              {t("prompt.form.addTool")}
            </button>
          </div>
        </div>

        <div>
          <Label icon="message" text={t("prompt.form.note")} />
          <textarea
            className="input"
            style={{ marginTop: 8, minHeight: 70, resize: "vertical" }}
            placeholder={t("prompt.form.notePlaceholder")}
            value={extraNote}
            onChange={(e) => setExtraNote(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "var(--danger)", fontSize: 13, fontWeight: 600 }}>{error}</p>}

        <button type="submit" className="btn" disabled={loading}>
          <Icon name="sparkles" size={16} />
          {loading ? t("prompt.form.loading") : t("prompt.form.submit")}
        </button>
        {loading && <p style={{ fontSize: 12, color: "var(--sub)" }}>{t("prompt.form.loadingNote")}</p>}
      </form>

      {result && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
          <section className="card">
            <h2 style={{ fontSize: 17, marginBottom: 10 }}>{t("prompt.result.analysis")}</h2>
            <p style={{ fontSize: 14, lineHeight: 1.6 }}>{result.productAnalysis}</p>
            {result.modelAnalysis && (
              <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 10, color: "var(--text)" }}>{result.modelAnalysis}</p>
            )}
          </section>

          <section className="card">
            <CopyHeader
              title={t("prompt.result.script")}
              copied={copiedKey === "script"}
              onCopy={() => copy("script", `${result.hook}\n\n${result.narration}`)}
              copyLabel={t("common.copy")}
              copiedLabel={t("common.copied")}
            />
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>{t("prompt.result.hook")}</p>
            <p style={{ marginTop: 4, marginBottom: 12, fontSize: 15, fontWeight: 600, color: "#191f28" }}>{result.hook}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>{t("prompt.result.narration")}</p>
            <p style={{ marginTop: 4, lineHeight: 1.7, fontSize: 14 }}>{result.narration}</p>
          </section>

          <section className="card">
            <CopyHeader
              title={t("prompt.result.captions")}
              copied={copiedKey === "captions"}
              onCopy={() => copy("captions", captionsText)}
              copyLabel={t("common.copy")}
              copiedLabel={t("common.copied")}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {result.captions.map((caption, i) => (
                <div key={i} style={{ display: "flex", gap: 12, fontSize: 14, borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
                  <span style={{ color: "var(--sub)", width: 48, flexShrink: 0 }}>{caption.timestamp}</span>
                  <span>{caption.text}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2 style={{ fontSize: 17, marginBottom: 12 }}>{t("prompt.result.scenes")}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {result.scenes.map((scene, i) => (
                <div key={i} style={{ background: "var(--bg)", borderRadius: 10, padding: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, color: "#191f28", fontSize: 14 }}>{scene.title}</span>
                    <span className="badge">{scene.seconds}</span>
                    <span style={{ fontSize: 12, color: "var(--sub)" }}>{scene.imageToUse}</span>
                  </div>
                  <p style={{ fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>{scene.visual}</p>
                </div>
              ))}
            </div>
          </section>

          {result.toolPrompts.map((toolPrompt, i) => (
            <section key={i} className="card" style={{ borderColor: "var(--primary)" }}>
              <CopyHeader
                title={toolPrompt.tool}
                copied={copiedKey === `tool-${i}`}
                onCopy={() => copy(`tool-${i}`, toolPrompt.prompt)}
                copyLabel={t("prompt.result.copyPrompt")}
                copiedLabel={t("common.copied")}
              />
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "inherit",
                  fontSize: 13.5,
                  lineHeight: 1.65,
                  background: "var(--bg)",
                  borderRadius: 10,
                  padding: 12,
                  margin: 0,
                }}
              >
                {toolPrompt.prompt}
              </pre>
              {toolPrompt.tips && (
                <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 8 }}>{toolPrompt.tips}</p>
              )}
            </section>
          ))}

          <section className="card">
            <CopyHeader
              title={t("prompt.result.hashtags")}
              copied={copiedKey === "hashtags"}
              onCopy={() => copy("hashtags", result.hashtags.join(" "))}
              copyLabel={t("common.copy")}
              copiedLabel={t("common.copied")}
            />
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {result.hashtags.map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

// 클립보드 API는 창이 포커스를 잃었거나 권한이 막히면 거부당한다(NotAllowedError) —
// 그럴 때는 임시 textarea를 만들어 예전 방식으로 복사한다
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.cssText = "position:fixed;top:-1000px;opacity:0";
      document.body.appendChild(area);
      area.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(area);
      return copied;
    } catch {
      return false;
    }
  }
}

function Label({ icon, text }: { icon: string; text: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "#191f28" }}>
      <Icon name={icon} size={16} color="var(--primary)" />
      {text}
    </span>
  );
}

function CopyHeader({
  title,
  copied,
  onCopy,
  copyLabel,
  copiedLabel,
}: {
  title: string;
  copied: boolean;
  onCopy: () => void;
  copyLabel: string;
  copiedLabel: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
      <h2 style={{ fontSize: 17, flex: 1 }}>{title}</h2>
      <button type="button" className="btn btn-secondary btn-sm" onClick={onCopy}>
        <Icon name={copied ? "check" : "copy"} size={14} />
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
