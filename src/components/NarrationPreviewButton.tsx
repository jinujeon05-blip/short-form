import { useEffect, useRef, useState } from "react";
import Icon from "./ui/Icon";
import { useLanguage } from "../context/LanguageContext";
import { VOICES, DEFAULT_VOICE } from "../data/voices";

interface Props {
  text: string;
}

type Status = "idle" | "loading" | "playing" | "error";

const VOICE_STORAGE_KEY = "shortform-repurposing-voice";

function readStoredVoice(): string {
  const stored = localStorage.getItem(VOICE_STORAGE_KEY);
  return stored && VOICES.some((v) => v.id === stored) ? stored : DEFAULT_VOICE;
}

export default function NarrationPreviewButton({ text }: Props) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [voice, setVoice] = useState<string>(readStoredVoice);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const cachedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    localStorage.setItem(VOICE_STORAGE_KEY, voice);
  }, [voice]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  function handleVoiceChange(next: string) {
    setVoice(next);
    if (status === "playing") {
      audioRef.current?.pause();
      setStatus("idle");
    }
  }

  async function handleClick() {
    if (status === "loading") return;

    if (status === "playing") {
      audioRef.current?.pause();
      setStatus("idle");
      return;
    }

    const cacheKey = `${voice}|${text}`;
    // 같은 텍스트·목소리로 이미 생성해둔 오디오가 있으면 API를 다시 호출하지 않고 재사용
    if (objectUrlRef.current && cachedKeyRef.current === cacheKey && audioRef.current) {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
      setStatus("playing");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.replace(/\/\//g, ". "), voice }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `요청이 실패했어요 (${res.status})`);
      }

      const blob = await res.blob();
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;
      cachedKeyRef.current = cacheKey;

      const audio = audioRef.current ?? new Audio();
      audio.src = url;
      audio.onended = () => setStatus("idle");
      audio.onerror = () => setStatus("error");
      audioRef.current = audio;

      await audio.play();
      setStatus("playing");
    } catch (err) {
      console.error("TTS playback failed:", err);
      setStatus("error");
    }
  }

  const label =
    status === "loading"
      ? t("generator.result.narrationLoading")
      : status === "playing"
        ? t("generator.result.narrationStop")
        : status === "error"
          ? t("generator.result.narrationError")
          : t("generator.result.narrationPreview");

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <select
        className="input"
        value={voice}
        onChange={(e) => handleVoiceChange(e.target.value)}
        style={{ padding: "6px 10px", fontSize: 12, width: 150 }}
        aria-label="voice"
      >
        {VOICES.map((v) => (
          <option key={v.id} value={v.id}>
            {v.label}
          </option>
        ))}
      </select>
      <button type="button" className="btn-secondary btn btn-sm" onClick={handleClick} disabled={status === "loading"}>
        <Icon name={status === "loading" ? "sparkles" : status === "playing" ? "pause" : "play"} size={14} />
        {label}
      </button>
    </div>
  );
}
