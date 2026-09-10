import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import type { SubtitleCue } from "../types";
import { timestampToSeconds } from "../utils/time";
import {
  OUTPUT_CANVAS_W,
  OUTPUT_CANVAS_H,
  CAPTION_FONT_SIZE,
  CAPTION_LINE_H,
  brandedHeaderHeight,
  captionBarHeight,
  renderBrandedHeaderPng,
} from "./brandedHeader";

// module 타입 워커에서는 importScripts가 없어서 UMD 빌드 대신 esm 빌드를 써야
// worker.js 내부의 `self.createFFmpegCore = (await import(coreURL)).default`가 실제로 값을 채워줌
const CORE_BASE_URL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";
// 자막바 폰트(GmarketSansTTFBold) — shorts_template.py 캡션과 동일한 폰트
const CAPTION_FONT_URL = "/fonts/GmarketSansTTFBold.ttf";

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

function probeVideoDuration(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => resolve(video.duration);
    video.onerror = () => reject(new Error("영상 정보를 읽지 못했어요."));
    video.src = url;
  });
}

let measureFontPromise: Promise<void> | null = null;
function loadMeasureFont(): Promise<void> {
  if (!measureFontPromise) {
    measureFontPromise = (async () => {
      const face = new FontFace("CaptionMeasureFont", `url(${CAPTION_FONT_URL})`);
      await face.load();
      document.fonts.add(face);
    })();
  }
  return measureFontPromise;
}

// brandedHeader.ts가 내보내는 값을 그대로 써서 미리보기(drawCaptionBar)와 크기가
// 어긋나지 않게 한다 — OUTPUT_CANVAS_W(1080) 기준 값이라 별도 스케일 계산 필요 없음
// (내보내기 캔버스 폭이 항상 OUTPUT_CANVAS_W로 고정이므로).
const CAPTION_FONT_SIZE_PX = CAPTION_FONT_SIZE;
const CAPTION_LINE_H_PX = CAPTION_LINE_H;

// 미리보기(brandedHeader.ts의 drawCaptionBar)는 캔버스 폭 안에서 자동으로 줄바꿈해주지만,
// ffmpeg drawtext는 자동 줄바꿈이 없어서 긴 자막이 세로 영상(좁은 폭)에서 화면 양옆으로
// 잘려나가는 문제가 있었음 — 실제 텍스트 폭을 측정해서 직접 줄바꿈하고, 자막바 높이를
// 넘길 만큼 길면(자동 생성 문구가 예상보다 길 수 있음) 잘라내서 "..."을 붙인다.
function wrapCaptionText(text: string, maxWidthPx: number, maxLines: number): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.font = `${CAPTION_FONT_SIZE_PX}px CaptionMeasureFont`;

  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (!current || ctx.measureText(candidate).width <= maxWidthPx) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  if (lines.length > maxLines) {
    lines.length = maxLines;
    let last = lines[maxLines - 1];
    while (last.length > 0 && ctx.measureText(`${last}...`).width > maxWidthPx) {
      last = last.slice(0, -1);
    }
    lines[maxLines - 1] = `${last}...`;
  }
  return lines.join("\n");
}

// atempo 필터는 한 번에 0.5~2.0배 범위만 받아서, 그보다 크게 늘리거나 줄여야 하면 여러 개를 이어붙여야 함
// (음정은 그대로 유지한 채 속도만 바꾸는 필터라 목소리가 다람쥐처럼 변하지 않음)
function atempoFilterChain(ratio: number): string {
  if (!Number.isFinite(ratio) || ratio <= 0) return "anull";
  const steps: number[] = [];
  let remaining = ratio;
  while (remaining > 2) {
    steps.push(2);
    remaining /= 2;
  }
  while (remaining < 0.5) {
    steps.push(0.5);
    remaining /= 0.5;
  }
  steps.push(remaining);
  return steps.map((s) => `atempo=${s.toFixed(4)}`).join(",");
}

interface ExportOptions {
  videoUrl: string;
  cues: SubtitleCue[];
  /** 나레이션 음성 — 없으면(사용자가 "음성 포함" 체크를 끈 경우) 음성 없이 내보냄 */
  narrationBlob?: Blob;
  videoDurationSeconds?: number;
  narrationDurationSeconds?: number;
  /** 자동 선택된 배경음악 파일 URL (없으면 BGM 없이 나레이션만 나감) */
  bgmUrl?: string;
  /** 배경음악 상대 볼륨 (0~1, 나레이션보다 조용하게). 기본 0.15 */
  bgmVolume?: number;
  /** 상단 브랜드 헤더(파란 상단바+채널명+훅 문구) — shorts_template.py 템플릿과 동일한 디자인 */
  channel: string;
  headline: string;
  views?: string;
  comments?: string;
  onProgress?: (ratio: number) => void;
}

export async function exportVideoWithSubtitlesAndNarration({
  videoUrl,
  cues,
  narrationBlob,
  videoDurationSeconds,
  narrationDurationSeconds,
  bgmUrl,
  bgmVolume = 0.15,
  channel,
  headline,
  views,
  comments,
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
    const [probedDuration] = await Promise.all([probeVideoDuration(videoUrl), loadMeasureFont()]);

    const headerH = brandedHeaderHeight(OUTPUT_CANVAS_W);
    const captionBarH = captionBarHeight(OUTPUT_CANVAS_W);
    const videoAreaH = OUTPUT_CANVAS_H - headerH - captionBarH;
    const headerPngBlob = await renderBrandedHeaderPng({ width: OUTPUT_CANVAS_W, channel, headline, views, comments });

    await ffmpeg.writeFile("input.mp4", await fetchFile(videoUrl));
    await ffmpeg.writeFile("caption-font.ttf", await fetchFile(CAPTION_FONT_URL));
    await ffmpeg.writeFile("header.png", await fetchFile(headerPngBlob));
    if (narrationBlob) {
      await ffmpeg.writeFile("narration.wav", await fetchFile(narrationBlob));
    }
    if (bgmUrl) {
      await ffmpeg.writeFile("bgm.mp3", await fetchFile(bgmUrl));
    }

    const sorted = [...cues].sort((a, b) => timestampToSeconds(a.timestamp) - timestampToSeconds(b.timestamp));
    const maxCaptionLines = Math.max(Math.floor((captionBarH - 20) / CAPTION_LINE_H_PX), 1);
    for (let i = 0; i < sorted.length; i++) {
      await ffmpeg.writeFile(
        `cue${i}.txt`,
        wrapCaptionText(sorted[i].text, OUTPUT_CANVAS_W - 100, maxCaptionLines)
      );
    }

    // 자막바 안에서 세로 가운데 정렬(텍스트가 한 줄이든 두 줄이든 text_h가 알아서 반영됨)
    const captionBarCenterY = headerH + captionBarH / 2;
    const drawtextSteps = sorted.map((cue, i) => {
      const start = timestampToSeconds(cue.timestamp);
      const end = i + 1 < sorted.length ? timestampToSeconds(sorted[i + 1].timestamp) : start + 3;
      return (
        `drawtext=fontfile=caption-font.ttf:textfile=cue${i}.txt:` +
        `fontsize=${CAPTION_FONT_SIZE_PX}:fontcolor=0xFFD100:bordercolor=black:borderw=4:` +
        `x=(w-text_w)/2:y=${captionBarCenterY}-text_h/2:enable='between(t,${start},${end})'`
      );
    });

    const inputArgs: string[] = [];
    let nextInputIndex = 0;
    function addInput(...args: string[]): number {
      inputArgs.push(...args);
      return nextInputIndex++;
    }
    // 입력 파일들을 순서대로 등록하면서 각자의 ffmpeg 인풋 인덱스를 기억해둔다 — 음성/BGM은
    // 사용자가 껐을 수 있어(다운로드 전 체크박스) 항상 같은 번호가 아니므로 하드코딩하지 않는다.
    const videoIdx = addInput("-i", "input.mp4");
    const headerIdx = addInput("-i", "header.png");
    const narrationIdx = narrationBlob ? addInput("-i", "narration.wav") : null;
    const bgmIdx = bgmUrl ? addInput("-i", "bgm.mp3") : null;

    // 원본 영상을 실제 해상도와 무관하게 항상 고정된 출력 캔버스(OUTPUT_CANVAS_W x
    // OUTPUT_CANVAS_H, shorts_template.py와 동일한 1080x1920)에 맞춰 조립한다:
    // 검은 배경 -> 헤더 PNG(0,0) -> 흰 자막바 배경(0,headerH) -> 원본 영상을
    // "헤더+자막바 아래 남는 영역"에 cover-crop으로 꽉 채워 그 아래(0,headerH+captionBarH)에
    // 올리고, 마지막으로 자막 텍스트를 자막바 위치에 그린다.
    const videoAreaFilter = [
      `scale=${OUTPUT_CANVAS_W}:${videoAreaH}:force_original_aspect_ratio=increase`,
      `crop=${OUTPUT_CANVAS_W}:${videoAreaH}`,
      "setsar=1",
    ].join(",");

    const filterParts = [
      `[${videoIdx}:v]${videoAreaFilter}[vcap]`,
      `color=c=black:s=${OUTPUT_CANVAS_W}x${OUTPUT_CANVAS_H}:d=${(probedDuration + 1).toFixed(3)}[bg]`,
      `[bg][${headerIdx}:v]overlay=0:0[bg2]`,
      `[bg2]drawbox=x=0:y=${headerH}:w=${OUTPUT_CANVAS_W}:h=${captionBarH}:color=white:t=fill[bg3]`,
      `[bg3][vcap]overlay=0:${headerH + captionBarH}:shortest=1[vpre]`,
    ];
    const lastVideoLabel = drawtextSteps.length > 0 ? "[vout]" : "[vpre]";
    if (drawtextSteps.length > 0) {
      filterParts.push(`[vpre]${drawtextSteps.join(",")}[vout]`);
    }

    // 나레이션 대본 길이가 실제 영상 길이와 딱 맞게 써지지 않을 수 있어서, 나레이션 오디오 속도를 영상 길이에
    // 맞춰 보정해 자막·나레이션·영상이 항상 정확히 같은 길이로 끝나도록 함(-shortest만으로는 남는 나레이션이
    // 중간에 뚝 잘리는 문제를 막을 수 없었음)
    const tempoRatio =
      videoDurationSeconds && narrationDurationSeconds && videoDurationSeconds > 0 && narrationDurationSeconds > 0
        ? narrationDurationSeconds / videoDurationSeconds
        : null;
    const audioFilter = tempoRatio ? atempoFilterChain(tempoRatio) : "anull";

    // 음성/배경음 조합 4가지(둘 다 없음 / 음성만 / BGM만 / 둘 다)를 전부 처리한다.
    let audioOutLabel: string | null = null;
    if (narrationIdx !== null && bgmIdx !== null) {
      // 나레이션(영상 길이에 맞춰 속도 보정됨) 위에 BGM을 낮은 볼륨으로 섞는다. aloop로
      // 무한 반복시켜두고 amix의 duration=first가 나레이션 길이에 맞춰 알아서 잘라준다.
      filterParts.push(`[${narrationIdx}:a]${audioFilter}[an]`);
      filterParts.push(`[${bgmIdx}:a]aloop=loop=-1:size=2000000000,volume=${bgmVolume}[bgm]`);
      filterParts.push(`[an][bgm]amix=inputs=2:duration=first:dropout_transition=0[aout]`);
      audioOutLabel = "[aout]";
    } else if (narrationIdx !== null) {
      filterParts.push(`[${narrationIdx}:a]${audioFilter}[aout]`);
      audioOutLabel = "[aout]";
    } else if (bgmIdx !== null) {
      // 나레이션이 없으면 맞춰 늘릴 기준이 없으므로, BGM을 원본 영상 길이에 직접 맞춰 자른다.
      filterParts.push(
        `[${bgmIdx}:a]aloop=loop=-1:size=2000000000,atrim=0:${probedDuration.toFixed(3)},volume=${bgmVolume}[aout]`
      );
      audioOutLabel = "[aout]";
    }
    // 음성도 BGM도 다 껐으면 오디오 트랙 없이 무음 영상으로 내보낸다.
    const filter = filterParts.join(";");

    await ffmpeg.exec([
      ...inputArgs,
      "-filter_complex",
      filter,
      "-map",
      lastVideoLabel,
      ...(audioOutLabel ? ["-map", audioOutLabel] : []),
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "23",
      ...(audioOutLabel ? ["-c:a", "aac"] : []),
      "-shortest",
      "output.mp4",
    ]);

    const data = await ffmpeg.readFile("output.mp4");
    return new Blob([new Uint8Array(data as Uint8Array)], { type: "video/mp4" });
  } finally {
    unsubscribeProgress?.();
    const cleanupFiles = [
      "input.mp4",
      "narration.wav",
      "caption-font.ttf",
      "header.png",
      "output.mp4",
      ...cues.map((_, i) => `cue${i}.txt`),
    ];
    if (bgmUrl) cleanupFiles.push("bgm.mp3");
    for (const name of cleanupFiles) {
      await ffmpeg.deleteFile(name).catch(() => {});
    }
  }
}
