import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { SubtitleCue } from "../types";
import { timestampToSeconds } from "../utils/time";

interface Props {
  src: string;
  cues: SubtitleCue[];
}

function positionStyle(position: string): CSSProperties {
  const base: CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    maxWidth: "88%",
    textAlign: "center",
    padding: "5px 12px",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 1.3,
  };
  if (position.includes("상단") || position.toLowerCase().includes("top")) {
    return { ...base, top: 16, background: "rgba(255,255,255,0.95)", color: "#191F28" };
  }
  if (position.includes("하단") || position.toLowerCase().includes("bottom")) {
    return { ...base, bottom: 16, background: "var(--primary)", color: "#fff" };
  }
  return { ...base, top: "50%", transform: "translate(-50%, -50%)", background: "rgba(0,0,0,0.6)", color: "#fff" };
}

export default function VideoWithSubtitles({ src, cues }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeCue, setActiveCue] = useState<SubtitleCue | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sorted = [...cues].sort((a, b) => timestampToSeconds(a.timestamp) - timestampToSeconds(b.timestamp));

    function handleTimeUpdate() {
      if (!video) return;
      const t = video.currentTime;
      let current: SubtitleCue | null = null;
      for (let i = 0; i < sorted.length; i++) {
        const start = timestampToSeconds(sorted[i].timestamp);
        const end = i + 1 < sorted.length ? timestampToSeconds(sorted[i + 1].timestamp) : start + 3;
        if (t >= start && t < end) {
          current = sorted[i];
          break;
        }
      }
      setActiveCue(current);
    }

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [cues]);

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        background: "#000",
        maxWidth: 260,
        margin: "0 auto 16px",
      }}
    >
      <video ref={videoRef} src={src} controls style={{ display: "block", width: "100%", maxHeight: 460 }} />
      {activeCue && <span style={positionStyle(activeCue.position)}>{activeCue.text}</span>}
    </div>
  );
}
