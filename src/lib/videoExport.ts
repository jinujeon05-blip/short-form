import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import type { SubtitleCue } from "../types";
import { timestampToSeconds } from "../utils/time";

// module 타입 워커에서는 importScripts가 없어서 UMD 빌드 대신 esm 빌드를 써야
// worker.js 내부의 `self.createFFmpegCore = (await import(coreURL)).default`가 실제로 값을 채워줌
const CORE_BASE_URL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";
const FONT_URL = "/fonts/NotoSansKR-Variable.ttf";

let ffmpegPromise: Promise<FFmpeg> | null = null;

async function loadFFmpeg(): Promise<FFmpeg> {
  if (!ffmpegPromise) {
    ffmpegPromise = (async () => {
      const ffmpeg = new FFmpeg();
      // unpkg가 CORS를 허용해서 blob URL로 변환하지 않고 CDN URL을 직접 넘겨도 워커에서 import 가능
      await ffmpeg.load({
        coreURL: `${CORE_BASE_URL}/ffmpeg-core.js`,
        wasmURL: `${CORE_BASE_URL}/ffmpeg-core.wasm`,
      });
      return ffmpeg;
    })();
  }
  return ffmpegPromise;
}

// ffmpeg의 textfile= 옵션으로 자막 텍스트를 파일로 넘기면 drawtext 필터 문법 이스케이프(: ' , \)를 신경 쓸 필요가 없음
function cueYExpr(position: string): string {
  if (position.includes("상단") || position.toLowerCase().includes("top")) return "40";
  if (position.includes("하단") || position.toLowerCase().includes("bottom")) return "h-text_h-40";
  return "(h-text_h)/2";
}

interface ExportOptions {
  videoUrl: string;
  cues: SubtitleCue[];
  narrationBlob: Blob;
  onProgress?: (ratio: number) => void;
}

export async function exportVideoWithSubtitlesAndNarration({
  videoUrl,
  cues,
  narrationBlob,
  onProgress,
}: ExportOptions): Promise<Blob> {
  const ffmpeg = await loadFFmpeg();

  const unsubscribeProgress = onProgress
    ? (() => {
        const handler = ({ progress }: { progress: number }) => onProgress(Math.min(1, Math.max(0, progress)));
        ffmpeg.on("progress", handler);
        return () => ffmpeg.off("progress", handler);
      })()
    : null;

  try {
    await ffmpeg.writeFile("input.mp4", await fetchFile(videoUrl));
    await ffmpeg.writeFile("narration.wav", await fetchFile(narrationBlob));
    await ffmpeg.writeFile("font.ttf", await fetchFile(FONT_URL));

    const sorted = [...cues].sort((a, b) => timestampToSeconds(a.timestamp) - timestampToSeconds(b.timestamp));
    for (let i = 0; i < sorted.length; i++) {
      await ffmpeg.writeFile(`cue${i}.txt`, sorted[i].text);
    }

    const drawtextSteps = sorted.map((cue, i) => {
      const start = timestampToSeconds(cue.timestamp);
      const end = i + 1 < sorted.length ? timestampToSeconds(sorted[i + 1].timestamp) : start + 3;
      return (
        `drawtext=fontfile=font.ttf:textfile=cue${i}.txt:` +
        `fontsize=h*0.045:fontcolor=white:box=1:boxcolor=black@0.55:boxborderw=14:` +
        `x=(w-text_w)/2:y=${cueYExpr(cue.position)}:enable='between(t,${start},${end})'`
      );
    });

    const filter = drawtextSteps.length > 0 ? `[0:v]${drawtextSteps.join(",")}[vout]` : "[0:v]copy[vout]";

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-i",
      "narration.wav",
      "-filter_complex",
      filter,
      "-map",
      "[vout]",
      "-map",
      "1:a",
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "23",
      "-c:a",
      "aac",
      "-shortest",
      "output.mp4",
    ]);

    const data = await ffmpeg.readFile("output.mp4");
    return new Blob([new Uint8Array(data as Uint8Array)], { type: "video/mp4" });
  } finally {
    unsubscribeProgress?.();
    for (const name of ["input.mp4", "narration.wav", "font.ttf", "output.mp4", ...cues.map((_, i) => `cue${i}.txt`)]) {
      await ffmpeg.deleteFile(name).catch(() => {});
    }
  }
}
