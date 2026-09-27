import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import type { GeneratedResult, SubtitleCue } from "../types";
import Icon from "./ui/Icon";
import VideoWithSubtitles from "./VideoWithSubtitles";
import NarrationPreviewButton from "./NarrationPreviewButton";
import VideoExportButton from "./VideoExportButton";

interface Props {
  result: GeneratedResult;
  onSave?: () => void;
  saved?: boolean;
}

export default function GeneratedResultView({ result, onSave, saved }: Props) {
  const { t } = useLanguage();

  // 자동 생성된 자막에 오타가 있을 수 있어서 직접 고칠 수 있게 로컬 편집 상태로 들고
  // 있는다 — 미리보기와 내보내기 둘 다 이 편집된 값을 사용한다. 새로 생성하거나 이력에서
  // 다른 결과를 열면(result.id가 바뀌면) 편집 상태를 그 결과의 원본 자막으로 초기화한다.
  const [cues, setCues] = useState<SubtitleCue[]>(result.subtitleGuide.cues);
  useEffect(() => {
    setCues(result.subtitleGuide.cues);
  }, [result.id, result.subtitleGuide.cues]);

  // 훅 문구도 만들어진 영상을 보고 바로 고칠 수 있게 — 미리보기와 내보내기 둘 다 이 값을 쓴다
  const [headline, setHeadline] = useState(result.input.headline);
  useEffect(() => {
    setHeadline(result.input.headline);
  }, [result.id, result.input.headline]);

  // 사진 슬라이드쇼 템플릿에서만 사진을 쓴다(다른 템플릿으로 저장된 이력에 사진이 남아 있어도 무시)
  const photos =
    result.input.template === "photo" ? (result.input.sourcePhotos ?? []).map((photo) => photo.url) : [];

  function updateCueText(index: number, text: string) {
    setCues((prev) => prev.map((cue, i) => (i === index ? { ...cue, text } : cue)));
  }

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

        {/* 훅 문구는 영상에 크게 박히는 글자라 결과를 보고 바로 고칠 수 있어야 한다
            (글자를 아예 안 넣는 none 템플릿에서는 쓸 일이 없어서 숨김) */}
        {result.input.template !== "none" && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>
              {t("generator.result.headlineEdit")}
            </label>
            <input
              className="input"
              style={{ marginTop: 6 }}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder={t("generator.form.headlinePlaceholder")}
            />
            <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 4 }}>{t("generator.result.headlineEditHint")}</p>
          </div>
        )}

        {(result.input.sourceVideo || photos.length > 0) && (
          <VideoWithSubtitles
            src={result.input.sourceVideo?.url ?? ""}
            photoUrls={photos}
            cues={cues}
            channel={result.input.channel}
            headline={headline}
            views={result.input.views}
            comments={result.input.comments}
            template={result.input.template}
          />
        )}
        <p style={{ fontSize: 12, color: "var(--sub)", marginBottom: 8 }}>{t("generator.result.cuesEditHint")}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {cues.map((cue, i) => (
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
              <input
                className="input"
                style={{ fontWeight: 600, padding: "6px 10px", fontSize: 13 }}
                value={cue.text}
                onChange={(e) => updateCueText(i, e.target.value)}
              />
              <span className="badge">{cue.position}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, fontSize: 13, background: "var(--bg)", borderRadius: 10, padding: 12 }}>
          <strong>{t("generator.result.styleNote")}: </strong>
          {result.subtitleGuide.styleNote}
        </p>
        {(result.input.sourceVideo || photos.length > 0) && (
          <div style={{ marginTop: 14 }}>
            <VideoExportButton
              videoUrl={result.input.sourceVideo?.url ?? ""}
              photoUrls={photos}
              videoDurationSeconds={result.input.sourceVideo?.durationSeconds}
              cues={cues}
              narrationText={`${result.narrationScript.hook} ${result.narrationScript.body}`}
              bgmUrl={result.bgm?.url}
              channel={result.input.channel}
              headline={headline}
              views={result.input.views}
              comments={result.input.comments}
              template={result.input.template}
            />
            <p style={{ marginTop: 8, fontSize: 12, color: "var(--sub)" }}>{t("generator.result.exportNote")}</p>
            {result.bgm && (
              <p style={{ marginTop: 4, fontSize: 12, color: "var(--sub)", display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="volume" size={12} />
                {t("generator.result.bgmAuto")}: {result.bgm.name}
              </p>
            )}
          </div>
        )}
        {/* 영상 파일이 없으면 내보내기 버튼 자체가 안 보여서 "왜 없지?"가 됨 — 이유와 방법을 알려줌
            (탐색에서 "이 영상으로 만들기"로 넘어오면 글자 정보만 채워지고 영상 파일은 없는 상태) */}
        {!result.input.sourceVideo && photos.length === 0 && (
          <p
            style={{
              marginTop: 14,
              fontSize: 13,
              background: "#fffbea",
              border: "1px solid var(--warning)",
              borderRadius: 10,
              padding: 12,
            }}
          >
            {t("generator.result.exportNeedsVideo")}
          </p>
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
