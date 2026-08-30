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
  cues: SubtitleCue[];
  narrationText: string;
}

type Status = "idle" | "fetchingAudio" | "encoding" | "done" | "error";

export default function VideoExportButton({ videoUrl, cues, narrationText }: Props) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  async function handleExport() {
    setStatus("fetchingAudio");
    setProgress(0);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: narrationText.replace(/\/\//g, ". "), voice: readStoredVoice() }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `요청이 실패했어요 (${res.status})`);
      }
      const narrationBlob = await res.blob();

      setStatus("encoding");
      const output = await exportVideoWithSubtitlesAndNarration({
        videoUrl,
        cues,
        narrationBlob,
        onProgress: setProgress,
      });

      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      const url = URL.createObjectURL(output);
      objectUrlRef.current = url;
      setDownloadUrl(url);
      setStatus("done");
    } catch (err) {
      console.error("Video export failed:", err);
      setStatus("error");
    }
  }

  if (status === "done" && downloadUrl) {
    return (
      <a href={downloadUrl} download="repurposed-video.mp4" className="btn-secondary btn btn-sm" style={{ alignSelf: "flex-start" }}>
        <Icon name="upload" size={14} />
        {t("generator.result.exportDownload")}
      </a>
    );
  }

  const isBusy = status === "fetchingAudio" || status === "encoding";
  const label =
    status === "fetchingAudio"
      ? t("generator.result.exportPreparing")
      : status === "encoding"
        ? `${t("generator.result.exportEncoding")} ${Math.round(progress * 100)}%`
        : status === "error"
          ? t("generator.result.exportRetry")
          : t("generator.result.exportStart");

  return (
    <button type="button" className="btn-secondary btn btn-sm" onClick={handleExport} disabled={isBusy} style={{ alignSelf: "flex-start" }}>
      <Icon name={isBusy ? "sparkles" : "upload"} size={14} />
      {label}
    </button>
  );
}
