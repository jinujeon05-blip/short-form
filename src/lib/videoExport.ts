import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import type { SubtitleCue, VideoTemplate } from "../types";
import { timestampToSeconds } from "../utils/time";
import {
  OUTPUT_CANVAS_W,
  OUTPUT_CANVAS_H,
  CAPTION_FONT_SIZE,
  CAPTION_LINE_H,
  brandedHeaderHeight,
  captionBarHeight,
  loadCaptionFont,
  loadHeaderFont,
  renderBrandedHeaderPng,
} from "./brandedHeader";
import {
  OVERLAY_CAPTION_BORDER_W,
  OVERLAY_CAPTION_CENTER_Y,
  OVERLAY_CAPTION_FONT_SIZE,
  OVERLAY_CAPTION_LINE_H,
  OVERLAY_HOOK_BORDER_W,
  OVERLAY_HOOK_FIRST_LINE_CENTER_Y,
  OVERLAY_HOOK_FONT_SIZE,
  OVERLAY_HOOK_LINE_H,
  wrapOverlayCaption,
  wrapOverlayHook,
} from "./overlayTemplate";
import { PHOTO_SECONDS_PER_IMAGE, PHOTO_TRANSITION_SECONDS, photoTransitionAt } from "./photoSlideshow";

// 휴대폰·카메라 사진은 3000x4000처럼 커서, 그대로 브라우저 안 ffmpeg(wasm)에 넣으면 한 장을
// 펼치는 데만 수십 MB씩 먹는다 — 사진 여러 장이면 메모리가 터지면서 "Aborted()"로 인코딩이
// 통째로 실패한다(실제로 3000x4000 7장으로 재현됨). 어차피 출력은 1080x1920이라, 화면을 덮을
// 수 있는 최소 크기까지 미리 줄여서 넘긴다(작은 사진은 그대로 두고 절대 키우지 않는다).
async function shrinkPhotoForExport(url: string): Promise<Blob> {
  const original = await fetch(url).then((res) => res.blob());
  const bitmap = await createImageBitmap(original);
  const scale = Math.min(1, Math.max(OUTPUT_CANVAS_W / bitmap.width, OUTPUT_CANVAS_H / bitmap.height));
  if (scale >= 1) {
    bitmap.close();
    return original;
  }

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("사진을 변환하지 못했어요."))),
      "image/jpeg",
      0.92
    );
  });
}

// 사진들을 같은 크기로 맞춘 뒤 xfade로 한 장씩 겹쳐 넘긴다. 전환 효과는 사진이 바뀔 때마다
// 다른 것이 나오도록 순서대로 돌려 쓴다(fade → wipeleft → circleopen → ...).
// fps/format/setpts를 맞춰두지 않으면 xfade가 사진마다 타임스탬프·픽셀 포맷이 달라 실패한다.
function buildPhotoSlideshowFilter(
  photoIdxs: number[],
  videoAreaFilter: string,
  photoSeconds: number,
  transitionSeconds: number
): string[] {
  const parts = photoIdxs.map(
    (idx, i) => `[${idx}:v]${videoAreaFilter},fps=25,format=yuv420p,setpts=PTS-STARTPTS[p${i}]`
  );
  if (photoIdxs.length === 1) {
    parts.push("[p0]null[vpre]");
    return parts;
  }
  let prev = "[p0]";
  for (let i = 1; i < photoIdxs.length; i++) {
    const out = i === photoIdxs.length - 1 ? "[vpre]" : `[x${i}]`;
    // 앞쪽 결과물은 이미 i장이 이어진 상태라, 다음 전환이 시작되는 지점은 i*(표시시간-겹침시간)
    const offset = i * (photoSeconds - transitionSeconds);
    parts.push(
      `${prev}[p${i}]xfade=transition=${photoTransitionAt(i - 1)}:` +
        `duration=${transitionSeconds.toFixed(3)}:offset=${offset.toFixed(3)}${out}`
    );
    prev = out;
  }
  return parts;
}

// module 타입 워커에서는 importScripts가 없어서 UMD 빌드 대신 esm 빌드를 써야
// worker.js 내부의 `self.createFFmpegCore = (await import(coreURL)).default`가 실제로 값을 채워줌
const CORE_BASE_URL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";
// 자막바 폰트(GmarketSansTTFBold) — shorts_template.py 캡션과 동일한 폰트
const CAPTION_FONT_URL = "/fonts/GmarketSansTTFBold.ttf";
// 오버레이 템플릿의 훅 문구 폰트(잘난체) — 브랜드 헤더와 같은 폰트라 톤이 이어진다
const HEADER_FONT_URL = "/fonts/Jalnan2.ttf";

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
  template?: VideoTemplate;
  /** photo 템플릿에서 슬라이드쇼로 이어붙일 사진들(순서대로) */
  photoUrls?: string[];
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
  template,
  photoUrls,
  onProgress,
}: ExportOptions): Promise<Blob> {
  const ffmpeg = await loadFFmpeg();

  // ffmpeg가 실패하면 마지막 로그에 진짜 이유가 찍힌다 — 화면 에러 메시지에 그대로 붙여주려고 모아둔다
  const logLines: string[] = [];
  const logHandler = ({ message }: { message: string }) => {
    if (message.trim()) logLines.push(message);
    if (logLines.length > 80) logLines.shift();
  };
  ffmpeg.on("log", logHandler);

  const unsubscribeProgress = onProgress
    ? (() => {
        const handler = ({ progress }: { progress: number }) => onProgress(Math.min(1, Math.max(0, progress)));
        ffmpeg.on("progress", handler);
        return () => ffmpeg.off("progress", handler);
      })()
    : null;

  try {
    // photo: 원본 영상 대신 사진 여러 장을 이어붙임 / none: 글자를 아예 안 넣음
    const isPhoto = template === "photo";
    const isPlain = template === "none";
    // 훅 문구·자막을 영상 위에 직접 얹는 템플릿(브랜드 헤더·자막바를 쓰지 않음)
    const hasOverlayText = template === "overlay" || isPhoto;
    const isBranded = !hasOverlayText && !isPlain;
    const photos = isPhoto ? (photoUrls ?? []) : [];
    if (isPhoto && photos.length === 0) {
      throw new Error("사진을 한 장 이상 올려주세요.");
    }

    const [videoDuration] = await Promise.all([
      isPhoto ? Promise.resolve(0) : probeVideoDuration(videoUrl),
      loadMeasureFont(),
      // 오버레이 글자는 줄바꿈을 실제 폰트로 재서 나눠야 해서 두 폰트를 먼저 브라우저에 로드한다
      ...(hasOverlayText ? [loadHeaderFont(), loadCaptionFont()] : []),
    ]);
    // 사진 슬라이드쇼는 나레이션 길이에 맞춰 전체 길이를 정하고(음성이 없으면 장당 기본 시간),
    // 그 길이를 사진 수로 똑같이 나눠 한 장씩 보여준다
    const probedDuration = isPhoto
      ? narrationDurationSeconds && narrationDurationSeconds > 0
        ? narrationDurationSeconds
        : photos.length * PHOTO_SECONDS_PER_IMAGE
      : videoDuration;

    // 브랜드 헤더 템플릿만 헤더·자막바가 자리를 차지하고, 나머지는 화면 전체(1080x1920)를 채운다
    const headerH = isBranded ? brandedHeaderHeight(OUTPUT_CANVAS_W) : 0;
    const captionBarH = isBranded ? captionBarHeight(OUTPUT_CANVAS_W) : 0;
    const videoAreaH = OUTPUT_CANVAS_H - headerH - captionBarH;

    const photoNames: string[] = [];
    if (isPhoto) {
      for (let i = 0; i < photos.length; i++) {
        const blob = await shrinkPhotoForExport(photos[i]);
        // ffmpeg는 확장자로 이미지 포맷을 짐작하므로 실제 타입에 맞는 이름으로 써준다
        const name = `p${i}.${blob.type === "image/png" ? "png" : blob.type === "image/webp" ? "webp" : "jpg"}`;
        await ffmpeg.writeFile(name, await fetchFile(blob));
        photoNames.push(name);
      }
    } else {
      await ffmpeg.writeFile("input.mp4", await fetchFile(videoUrl));
    }
    await ffmpeg.writeFile("caption-font.ttf", await fetchFile(CAPTION_FONT_URL));
    if (hasOverlayText) {
      await ffmpeg.writeFile("header-font.ttf", await fetchFile(HEADER_FONT_URL));
      await ffmpeg.writeFile("hook.txt", wrapOverlayHook(headline).join("\n"));
    } else if (isBranded) {
      const headerPngBlob = await renderBrandedHeaderPng({ width: OUTPUT_CANVAS_W, channel, headline, views, comments });
      await ffmpeg.writeFile("header.png", await fetchFile(headerPngBlob));
    }
    if (narrationBlob) {
      await ffmpeg.writeFile("narration.wav", await fetchFile(narrationBlob));
    }
    if (bgmUrl) {
      await ffmpeg.writeFile("bgm.mp3", await fetchFile(bgmUrl));
    }

    // none 템플릿은 글자를 아예 넣지 않으므로 자막 자체를 버린다
    const sorted = isPlain
      ? []
      : [...cues].sort((a, b) => timestampToSeconds(a.timestamp) - timestampToSeconds(b.timestamp));
    const maxCaptionLines = Math.max(Math.floor((captionBarH - 20) / CAPTION_LINE_H_PX), 1);
    for (let i = 0; i < sorted.length; i++) {
      await ffmpeg.writeFile(
        `cue${i}.txt`,
        hasOverlayText
          ? wrapOverlayCaption(sorted[i].text).join("\n")
          : wrapCaptionText(sorted[i].text, OUTPUT_CANVAS_W - 100, maxCaptionLines)
      );
    }

    // 자막바 안에서 세로 가운데 정렬(텍스트가 한 줄이든 두 줄이든 text_h가 알아서 반영됨)
    const captionBarCenterY = headerH + captionBarH / 2;
    const drawtextSteps = sorted.map((cue, i) => {
      const start = timestampToSeconds(cue.timestamp);
      const end = i + 1 < sorted.length ? timestampToSeconds(sorted[i + 1].timestamp) : start + 3;
      if (hasOverlayText) {
        // 자막바가 없으니 영상 위 고정 높이에 흰 글씨+검은 테두리로 직접 얹는다
        return (
          `drawtext=fontfile=caption-font.ttf:textfile=cue${i}.txt:` +
          `fontsize=${OVERLAY_CAPTION_FONT_SIZE}:fontcolor=white:bordercolor=black:borderw=${OVERLAY_CAPTION_BORDER_W}:` +
          `line_spacing=${OVERLAY_CAPTION_LINE_H - OVERLAY_CAPTION_FONT_SIZE}:` +
          `x=(w-text_w)/2:y=${OVERLAY_CAPTION_CENTER_Y}-text_h/2:enable='between(t,${start},${end})'`
        );
      }
      return (
        `drawtext=fontfile=caption-font.ttf:textfile=cue${i}.txt:` +
        `fontsize=${CAPTION_FONT_SIZE_PX}:fontcolor=0xFFD100:bordercolor=black:borderw=4:` +
        `x=(w-text_w)/2:y=${captionBarCenterY}-text_h/2:enable='between(t,${start},${end})'`
      );
    });

    // 훅 문구는 영상 내내 그대로 떠 있으므로 enable 조건 없이 맨 앞에 한 번만 그린다
    if (hasOverlayText && headline.trim()) {
      drawtextSteps.unshift(
        `drawtext=fontfile=header-font.ttf:textfile=hook.txt:` +
          `fontsize=${OVERLAY_HOOK_FONT_SIZE}:fontcolor=0xFFD100:bordercolor=black:borderw=${OVERLAY_HOOK_BORDER_W}:` +
          `line_spacing=${OVERLAY_HOOK_LINE_H - OVERLAY_HOOK_FONT_SIZE}:` +
          `x=(w-text_w)/2:y=${OVERLAY_HOOK_FIRST_LINE_CENTER_Y - Math.round(OVERLAY_HOOK_LINE_H / 2)}`
      );
    }

    const inputArgs: string[] = [];
    let nextInputIndex = 0;
    function addInput(...args: string[]): number {
      inputArgs.push(...args);
      return nextInputIndex++;
    }
    // 입력 파일들을 순서대로 등록하면서 각자의 ffmpeg 인풋 인덱스를 기억해둔다 — 음성/BGM은
    // 사용자가 껐을 수 있어(다운로드 전 체크박스) 항상 같은 번호가 아니므로 하드코딩하지 않는다.
    // 사진 슬라이드쇼는 사진마다 "이 사진을 D초 동안 보여주는 영상 입력"을 하나씩 만든다.
    // 전환 효과는 앞뒤 사진이 겹치는 구간이라 그만큼 전체 길이가 줄어든다 — 원하는 총 길이를
    // 유지하려면 사진 한 장을 겹치는 시간만큼 더 길게 잡아야 한다.
    // (사진이 아주 짧게 넘어갈 때는 전환이 화면을 다 잡아먹지 않도록 표시 시간의 40%로 제한)
    const transitionSeconds =
      isPhoto && photos.length > 1 ? Math.min(PHOTO_TRANSITION_SECONDS, (probedDuration / photos.length) * 0.4) : 0;
    const photoSeconds = isPhoto ? (probedDuration + transitionSeconds * (photos.length - 1)) / photos.length : 0;
    const photoIdxs = photoNames.map((name) => addInput("-loop", "1", "-t", photoSeconds.toFixed(3), "-i", name));
    const videoIdx = isPhoto ? null : addInput("-i", "input.mp4");
    const headerIdx = isBranded ? addInput("-i", "header.png") : null;
    const narrationIdx = narrationBlob ? addInput("-i", "narration.wav") : null;
    const bgmIdx = bgmUrl ? addInput("-i", "bgm.mp3") : null;

    // 원본 영상을 실제 해상도와 무관하게 항상 고정된 출력 캔버스(OUTPUT_CANVAS_W x
    // OUTPUT_CANVAS_H, shorts_template.py와 동일한 1080x1920)에 맞춰 조립한다:
    // 검은 배경 -> 헤더 PNG(0,0) -> 흰 자막바 배경(0,headerH) -> 원본 영상을
    // "헤더+자막바 아래 남는 영역"에 cover-crop으로 꽉 채워 그 아래(0,headerH+captionBarH)에
    // 올리고, 마지막으로 자막 텍스트를 자막바 위치에 그린다.
    const videoAreaFilter = [
      `scale=${OUTPUT_CANVAS_W}:${videoAreaH}:force_original_aspect_ratio=increase`,
      // crop은 기본이 가운데 기준이라 위아래가 똑같이 잘려서, 제품이 화면 아래쪽에 있는 영상은
      // 정작 보여줘야 할 부분이 날아갔음 — y=in_h-out_h로 "아래쪽 기준"으로 맞춰서 원본 하단은
      // 그대로 남기고 잘리는 부분을 전부 위쪽(헤더에 어차피 가려지는 쪽)으로 몰아준다
      `crop=${OUTPUT_CANVAS_W}:${videoAreaH}:0:in_h-${videoAreaH}`,
      "setsar=1",
    ].join(",");

    const filterParts = isPhoto
      ? buildPhotoSlideshowFilter(photoIdxs, videoAreaFilter, photoSeconds, transitionSeconds)
      : !isBranded
        ? // 오버레이·글자없음 템플릿은 합성할 헤더·자막바가 없어서 영상만 캔버스 크기로 맞추면 끝
          [`[${videoIdx}:v]${videoAreaFilter}[vpre]`]
        : [
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
    // 사진 슬라이드쇼는 반대로 영상(사진 표시 시간)을 나레이션에 맞춰 만들었으므로 음성 속도는 건드리지 않는다
    const tempoRatio =
      !isPhoto && videoDurationSeconds && narrationDurationSeconds && videoDurationSeconds > 0 && narrationDurationSeconds > 0
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

    // exec은 실패해도 예외를 던지지 않고 종료 코드만 돌려준다 — 확인하지 않으면 그대로 진행하다가
    // output.mp4를 읽는 데서 엉뚱한 에러가 나서 진짜 원인(필터 오류 등)이 보이지 않는다
    const exitCode = await ffmpeg.exec([
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

    if (exitCode !== 0) {
      const tail = logLines.slice(-10).join("\n");
      console.error("ffmpeg failed", { exitCode, filter, log: logLines });
      throw new Error(`영상 인코딩에 실패했어요 (ffmpeg 종료 코드 ${exitCode}).\n${tail}`);
    }

    const data = await ffmpeg.readFile("output.mp4");
    return new Blob([new Uint8Array(data as Uint8Array)], { type: "video/mp4" });
  } finally {
    ffmpeg.off("log", logHandler);
    unsubscribeProgress?.();
    const cleanupFiles = [
      "input.mp4",
      "narration.wav",
      "caption-font.ttf",
      "header.png",
      "header-font.ttf",
      "hook.txt",
      "output.mp4",
      ...cues.map((_, i) => `cue${i}.txt`),
      ...(photoUrls ?? []).flatMap((_, i) => [`p${i}.jpg`, `p${i}.png`, `p${i}.webp`]),
    ];
    if (bgmUrl) cleanupFiles.push("bgm.mp3");
    for (const name of cleanupFiles) {
      await ffmpeg.deleteFile(name).catch(() => {});
    }
  }
}
