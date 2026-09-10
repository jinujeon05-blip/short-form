import { useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { exportVideoWithSubtitlesAndNarration } from "../lib/videoExport";
import { DEFAULT_VOICE, VOICES } from "../data/voices";
import type { SubtitleCue } from "../types";
import Icon from "./ui/Icon";

const VOICE_STORAGE_KEY = "shortform-repurposing-voice";

function readStoredVoice(): string {
  const stored = localStorage.getItem(VOICE_STORAGE_KEY);
  return stored && VOICES.some((v) => v.id === stored) ? stored : DEFAULT_VOICE;
}

interface Props {
  videoUrl: string;
  videoDurationSeconds?: number;
  cues: SubtitleCue[];
  narrationText: string;
  bgmUrl?: string;
  channel: string;
  headline: string;
  views?: string;
  comments?: string;
}

type Status = "idle" | "fetchingAudio" | "encoding" | "done" | "error";

// 오디오 blob에서 실제 재생 길이를 읽음(narration.wav를 그대로 영상 길이에 맞춰 속도 보정하기 위해 필요)
function readAudioDuration(blob: Blob): Promise<number> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio();
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(audio.duration);
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("나레이션 길이를 읽지 못했어요."));
    };
    audio.src = url;
  });
}

export default function VideoExportButton({
  videoUrl,
  videoDurationSeconds,
  cues,
  narrationText,
  bgmUrl,
  channel,
  headline,
  views,
  comments,
}: Props) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  // 다운로드 전에 어떤 요소를 뺄지 고를 수 있게 — 자막/음성/배경음 각각 켜고 끌 수 있다.
  const [includeCaptions, setIncludeCaptions] = useState(true);
  const [includeNarration, setIncludeNarration] = useState(true);
  const [includeBgm, setIncludeBgm] = useState(true);

  async function handleExport() {
    setStatus("fetchingAudio");
    setProgress(0);
    setErrorMessage(null);
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setDownloadUrl(null);

    try {
      let narrationBlob: Blob | undefined;
      let narrationDurationSeconds: number | undefined;
      if (includeNarration) {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: narrationText.replace(/\/\//g, ". "), voice: readStoredVoice() }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error || `요청이 실패했어요 (${res.status})`);
        }
        narrationBlob = await res.blob();
        narrationDurationSeconds = await readAudioDuration(narrationBlob).catch(() => undefined);
      }

      setStatus("encoding");
      const output = await exportVideoWithSubtitlesAndNarration({
        videoUrl,
        cues: includeCaptions ? cues : [],
        narrationBlob,
        videoDurationSeconds,
        narrationDurationSeconds,
        bgmUrl: includeBgm ? bgmUrl : undefined,
        channel,
        headline,
        views,
        comments,
        onProgress: setProgress,
      });

      const url = URL.createObjectURL(output);
      objectUrlRef.current = url;
      setDownloadUrl(url);
      setStatus("done");
    } catch (err) {
      console.error("Video export failed:", err);
      setErrorMessage(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  }

  const isBusy = status === "fetchingAudio" || status === "encoding";
  const label =
    status === "fetchingAudio"
      ? t("generator.result.exportPreparing")
      : status === "encoding"
        ? `${t("generator.result.exportEncoding")} ${Math.round(progress * 100)}%`
        : status === "error"
          ? t("generator.result.exportRetry")
          : status === "done"
            ? t("generator.result.exportStart")
            : t("generator.result.exportStart");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={includeCaptions}
            onChange={(e) => setIncludeCaptions(e.target.checked)}
            disabled={isBusy}
          />
          {t("generator.result.exportIncludeCaptions")}
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={includeNarration}
            onChange={(e) => setIncludeNarration(e.target.checked)}
            disabled={isBusy}
          />
          {t("generator.result.exportIncludeNarration")}
        </label>
        {bgmUrl && (
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={includeBgm}
              onChange={(e) => setIncludeBgm(e.target.checked)}
              disabled={isBusy}
            />
            {t("generator.result.exportIncludeBgm")}
          </label>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button type="button" className="btn-secondary btn btn-sm" onClick={handleExport} disabled={isBusy}>
          <Icon name={isBusy ? "sparkles" : "upload"} size={14} />
          {label}
        </button>
        {status === "done" && downloadUrl && (
          <a href={downloadUrl} download="repurposed-video.mp4" className="btn-secondary btn btn-sm">
            <Icon name="upload" size={14} />
            {t("generator.result.exportDownload")}
          </a>
        )}
      </div>
      {status === "error" && errorMessage && (
        <p style={{ fontSize: 12, color: "var(--danger)" }}>{errorMessage}</p>
      )}
    </div>
  );
}
