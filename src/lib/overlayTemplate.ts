// "훅+자막 오버레이" 템플릿 — 파란 브랜드 헤더와 흰 자막바가 없고, 영상이 화면 전체를 채우며
// 그 위에 훅 문구(상단)와 자막(하단)만 얹힌다. 수치는 전부 1080x1920 출력 캔버스 기준이고,
// 미리보기는 폭에 맞춰 스케일만 다르게 쓴다.
//
// 미리보기(VideoWithSubtitles)와 내보내기(videoExport)가 서로 다른 수치를 쓰면 화면과 결과물이
// 어긋나므로, 좌표·폰트 크기·줄바꿈 로직을 전부 이 파일 하나에서만 정의한다.
import { CAPTION_FONT_FAMILY, HEADER_FONT_FAMILY, OUTPUT_CANVAS_H, OUTPUT_CANVAS_W } from "./brandedHeader";

const REF_W = OUTPUT_CANVAS_W;

export const OVERLAY_HOOK_FONT_SIZE = 96;
export const OVERLAY_HOOK_LINE_H = 116;
/** 훅 문구 첫 줄의 세로 중심 y — 플랫폼 자체 UI가 덮는 최상단은 피해서 아래로 내림 */
export const OVERLAY_HOOK_FIRST_LINE_CENTER_Y = 300;
export const OVERLAY_MAX_HOOK_LINES = 3;

export const OVERLAY_CAPTION_FONT_SIZE = 64;
export const OVERLAY_CAPTION_LINE_H = 78;
/** 자막 블록의 세로 중심 y — 플랫폼 하단 UI(채널명·설명)에 가리지 않는 높이 */
export const OVERLAY_CAPTION_CENTER_Y = 1420;
export const OVERLAY_MAX_CAPTION_LINES = 3;

export const OVERLAY_SIDE_MARGIN = 60;
export const OVERLAY_HOOK_COLOR = "#ffd100";
export const OVERLAY_CAPTION_COLOR = "#ffffff";
export const OVERLAY_BORDER_COLOR = "#141414";
export const OVERLAY_HOOK_BORDER_W = 8;
export const OVERLAY_CAPTION_BORDER_W = 6;

export function overlayTextMaxWidth(width: number): number {
  return width - (OVERLAY_SIDE_MARGIN * 2 * width) / REF_W;
}

// 띄어쓰기가 있으면 어절 단위로 끊고(베트남어·영어), 한 어절이 한 줄보다 길거나 띄어쓰기가
// 아예 없으면(한국어·중국어) 글자 단위로 끊는다
export function wrapOverlayLines(
  text: string,
  fontPx: number,
  fontFamily: string,
  maxWidthPx: number,
  maxLines: number
): string[] {
  const ctx = document.createElement("canvas").getContext("2d")!;
  ctx.font = `${fontPx}px "${fontFamily}"`;

  const lines: string[] = [];
  let current = "";
  const pushChunk = (chunk: string) => {
    const candidate = current ? `${current} ${chunk}` : chunk;
    if (!current || ctx.measureText(candidate).width <= maxWidthPx) {
      current = candidate;
      return;
    }
    lines.push(current);
    current = chunk;
  };

  for (const word of text.split(/\s+/).filter(Boolean)) {
    if (ctx.measureText(word).width <= maxWidthPx) {
      pushChunk(word);
      continue;
    }
    // 한 어절 자체가 한 줄을 넘으면 글자 단위로 쪼갬
    for (const ch of word) {
      const candidate = current + ch;
      if (!current || ctx.measureText(candidate).width <= maxWidthPx) {
        current = candidate;
      } else {
        lines.push(current);
        current = ch;
      }
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
  return lines;
}

export function wrapOverlayHook(hook: string, width = REF_W): string[] {
  const s = width / REF_W;
  return wrapOverlayLines(
    hook,
    OVERLAY_HOOK_FONT_SIZE * s,
    HEADER_FONT_FAMILY,
    overlayTextMaxWidth(width),
    OVERLAY_MAX_HOOK_LINES
  );
}

export function wrapOverlayCaption(caption: string, width = REF_W): string[] {
  const s = width / REF_W;
  return wrapOverlayLines(
    caption,
    OVERLAY_CAPTION_FONT_SIZE * s,
    CAPTION_FONT_FAMILY,
    overlayTextMaxWidth(width),
    OVERLAY_MAX_CAPTION_LINES
  );
}

interface OverlayDrawOptions {
  hook: string;
  caption: string;
}

// 미리보기용 — 영상 위에 겹쳐 놓은 투명 캔버스에 훅 문구와 현재 자막을 그린다.
// 내보내기(videoExport.ts)는 같은 좌표·폰트를 ffmpeg drawtext로 그린다(영상에 실제로 굽는 것).
export function drawOverlayTexts(canvas: HTMLCanvasElement, width: number, { hook, caption }: OverlayDrawOptions) {
  const s = width / REF_W;
  const height = Math.round((width * OUTPUT_CANVAS_H) / REF_W);
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, width, height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";

  if (hook) {
    const lines = wrapOverlayHook(hook, width);
    ctx.font = `${OVERLAY_HOOK_FONT_SIZE * s}px "${HEADER_FONT_FAMILY}"`;
    ctx.lineWidth = OVERLAY_HOOK_BORDER_W * 2 * s; // strokeText는 선 중심 기준이라 2배로 그려야 테두리 두께가 맞음
    ctx.strokeStyle = OVERLAY_BORDER_COLOR;
    ctx.fillStyle = OVERLAY_HOOK_COLOR;
    let y = OVERLAY_HOOK_FIRST_LINE_CENTER_Y * s;
    for (const line of lines) {
      ctx.strokeText(line, width / 2, y);
      ctx.fillText(line, width / 2, y);
      y += OVERLAY_HOOK_LINE_H * s;
    }
  }

  if (caption) {
    const lines = wrapOverlayCaption(caption, width);
    ctx.font = `${OVERLAY_CAPTION_FONT_SIZE * s}px "${CAPTION_FONT_FAMILY}"`;
    ctx.lineWidth = OVERLAY_CAPTION_BORDER_W * 2 * s;
    ctx.strokeStyle = OVERLAY_BORDER_COLOR;
    ctx.fillStyle = OVERLAY_CAPTION_COLOR;
    const lineH = OVERLAY_CAPTION_LINE_H * s;
    let y = OVERLAY_CAPTION_CENTER_Y * s - ((lines.length - 1) * lineH) / 2;
    for (const line of lines) {
      ctx.strokeText(line, width / 2, y);
      ctx.fillText(line, width / 2, y);
      y += lineH;
    }
  }
}
