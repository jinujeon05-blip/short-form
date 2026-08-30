import { useLanguage } from "../context/LanguageContext";
import type { GeneratedResult } from "../types";
import Icon from "./ui/Icon";
import VideoWithSubtitles from "./VideoWithSubtitles";
import NarrationPreviewButton from "./NarrationPreviewButton";

interface Props {
  result: GeneratedResult;
  onSave?: () => void;
  saved?: boolean;
}

export default function GeneratedResultView({ result, onSave, saved }: Props) {
  const { t } = useLanguage();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <section className="card">
        <h2 style={{ fontSize: 17, marginBottom: 14 }}>{t("generator.result.structureTitle")}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {result.structureAnalysis.beats.map((beat) => (
            <div key={beat.label} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
              <span className="badge">{beat.timestamp}</span>
              <div>
                <strong style={{ fontSize: 14 }}>{beat.label}</strong>
                <p style={{ fontSize: 13, color: "var(--sub)", marginTop: 2 }}>{beat.note}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, fontSize: 13, background: "var(--bg)", borderRadius: 10, padding: 12 }}>
          <strong>{t("generator.result.reuseGuide")}: </strong>
          {result.structureAnalysis.reuseGuide}
        </p>
      </section>

      <section className="card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
          <h2 style={{ fontSize: 17 }}>{t("generator.result.narrationTitle")}</h2>
          <NarrationPreviewButton text={`${result.narrationScript.hook} ${result.narrationScript.body}`} />
        </div>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>{t("generator.result.hook")}</p>
        <p style={{ marginTop: 4, marginBottom: 14 }}>{result.narrationScript.hook}</p>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>{t("generator.result.body")}</p>
        <p style={{ marginTop: 4, lineHeight: 1.6 }}>{result.narrationScript.body}</p>
      </section>

      <section className="card">
        <h2 style={{ fontSize: 17, marginBottom: 14 }}>{t("generator.result.subtitleTitle")}</h2>
        {result.input.sourceVideo && (
          <VideoWithSubtitles src={result.input.sourceVideo.url} cues={result.subtitleGuide.cues} />
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {result.subtitleGuide.cues.map((cue, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "56px 1fr auto",
                gap: 10,
                alignItems: "center",
                fontSize: 13,
                borderBottom: "1px solid var(--border)",
                paddingBottom: 8,
              }}
            >
              <span style={{ color: "var(--sub)" }}>{cue.timestamp}</span>
              <span style={{ fontWeight: 600 }}>{cue.text}</span>
              <span className="badge">{cue.position}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, fontSize: 13, background: "var(--bg)", borderRadius: 10, padding: 12 }}>
          <strong>{t("generator.result.styleNote")}: </strong>
          {result.subtitleGuide.styleNote}
        </p>
        {result.input.sourceVideo && (
          <p style={{ marginTop: 10, fontSize: 12, color: "var(--sub)" }}>{t("generator.result.bakeNote")}</p>
        )}
      </section>

      <section className="card">
        <h2 style={{ fontSize: 17, marginBottom: 14 }}>{t("generator.result.actionPlanTitle")}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {result.actionPlan.map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <Icon name="check" size={16} color="var(--success)" />
              <strong style={{ minWidth: 110 }}>{item.label}</strong>
              <span style={{ color: "var(--sub)" }}>{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {onSave && (
        <button className="btn-secondary btn" onClick={onSave} disabled={saved} style={{ alignSelf: "flex-start" }}>
          <Icon name="clock" size={16} />
          {saved ? t("generator.result.saved") : t("generator.result.saveToHistory")}
        </button>
      )}
    </div>
  );
}
