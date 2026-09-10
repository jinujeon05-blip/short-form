// shorts_template.py(다른 파이썬 프로젝트)의 build_header_image()를 기반으로 옮기되,
// 휴대폰 화면에서 직접 확인해보니 글자가 작다는 피드백을 받아 원본 비율보다 폰트·영역을
// 전반적으로 키움. 크기 비율은 전부 1080폭 캔버스 기준 수치라, 실제 영상 폭에 맞춰
// 스케일만 다르게 한다.
//
// 채널명·훅문구는 같은 폰트(HEADER_FONT_FAMILY=잘난체)를 쓰지만, 자막은 다른 폰트
// (CAPTION_FONT_FAMILY=지마켓산스 Bold)를 쓴다 — 실제 캔버스에 그려서 측정해보니
// 같은 pt 값이라도 지마켓산스가 잘난체보다 실제 렌더링 높이가 약 12% 작게 나와서
// (예: 60pt 기준 잘난체 58px vs 지마켓산스 53px), 세 요소가 "비슷한 크기"로 보이려면
// pt 값을 그대로 맞추면 안 되고 이 차이를 보정해야 한다 — 채널명·훅문구는 64pt로
// 통일하고, 자막은 지마켓산스가 더 작게 나오는 만큼 70pt로 더 크게 잡음(실측 결과
// 셋 다 렌더링 높이 약 62px 근처로 맞춰짐).
const REF_W = 1080;
const REF_HEADER_H = 470;
// 실제로 플랫폼(예: 페이스북/인스타그램 릴스)에 올려서 보면 자체 뒤로가기·검색창 UI가
// 영상 맨 위를 덮는 경우가 있어서, 상단바 맨 위는 빈 파란 여백으로 비워두고 채널명·
// 아이콘은 그 아래쪽(안전 영역)에 배치한다 — 그 여백 높이가 REF_BAR_SAFE_TOP.
const REF_BAR_SAFE_TOP = 90;
const REF_BAR_H = 150; // 채널명·아이콘이 실제로 놓이는 콘텐츠 줄의 높이
const REF_DIVIDER_H = 6;
const REF_CHANNEL_FONT_SIZE = 64;
const REF_HEADLINE_FONT_SIZE = 64;
const REF_HEADLINE_LINE_H = 77;

const COLOR_HEADER_BG = "#174bb2"; // rgb(23,75,168)
const COLOR_WHITE = "#ffffff";
const COLOR_BLACK = "#141414"; // rgb(20,20,20)
const COLOR_GRAY = "#787878"; // rgb(120,120,120)
const REF_STAT_FONT_SIZE = 38;
const REF_STAT_BLOCK_H = 56;

// 최종 출력 캔버스는 업로드된 원본 영상의 실제 해상도와 무관하게 항상 이 크기로 고정한다
// (틱톡/릴스/쇼츠 전부 9:16) — 예전엔 원본 영상 자체의 가로/세로를 그대로 캔버스 크기로
// 썼는데, 그러면 원본이 9:16이 아닌 영상(예: 4:5로 촬영된 영상)을 올렸을 때 최종 결과물도
// 그 비율 그대로 나가면서 헤더·자막 글자 크기가 매번 다르게 느껴지는 문제가 있었다.
export const OUTPUT_CANVAS_W = 1080;
export const OUTPUT_CANVAS_H = 1920;

// 헤더 바로 아래, 흰 배경에 노란 글씨(검은 테두리)로 자막을 보여주는 고정 자막바 —
// shorts_template.py의 CAPTION_BAR_H(160)보다 키움(휴대폰에서 작게 보인다는 피드백).
const REF_CAPTION_BAR_H = 200;
export const CAPTION_FONT_SIZE = 70;
export const CAPTION_LINE_H = 80;
const COLOR_YELLOW = "#ffd100"; // rgb(255,209,0)

export const CAPTION_FONT_FAMILY = "BrandedCaptionFont";
let captionFontPromise: Promise<void> | null = null;

export function loadCaptionFont(): Promise<void> {
  if (!captionFontPromise) {
    captionFontPromise = (async () => {
      const face = new FontFace(CAPTION_FONT_FAMILY, "url(/fonts/GmarketSansTTFBold.ttf)");
      await face.load();
      document.fonts.add(face);
    })();
  }
  return captionFontPromise;
}

export function captionBarHeight(width: number): number {
  return Math.round((width * REF_CAPTION_BAR_H) / REF_W);
}

// 자막바 텍스트를 캔버스에 그린다 — 미리보기(VideoWithSubtitles.tsx)에서 활성 자막을
// 표시할 때 쓴다. 내보내기(videoExport.ts)는 같은 모양을 ffmpeg drawbox+drawtext로
// 별도로 그린다(영상 위에 실시간으로 합성해야 해서 PNG 오버레이 방식이 아니라 필터 방식).
export function drawCaptionBar(canvas: HTMLCanvasElement, width: number, text: string) {
  const s = width / REF_W;
  const barH = captionBarHeight(width);
  canvas.width = width;
  canvas.height = barH;

  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, width, barH);
  ctx.fillStyle = COLOR_WHITE;
  ctx.fillRect(0, 0, width, barH);

  if (!text) return;

  const fontPx = CAPTION_FONT_SIZE * s;
  ctx.font = `${fontPx}px "${CAPTION_FONT_FAMILY}"`;
  const maxWidth = width - 100 * s;
  const lineH = CAPTION_LINE_H * s;
  const maxLines = Math.max(Math.floor((barH - 20 * s) / lineH), 1);

  let lines = wrapTextCharwise(ctx, text, maxWidth);
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    let last = lines[lines.length - 1];
    while (last.length > 0 && ctx.measureText(`${last}...`).width > maxWidth) {
      last = last.slice(0, -1);
    }
    lines[lines.length - 1] = `${last}...`;
  }

  const totalH = lines.length * lineH;
  let y = (barH - totalH) / 2 + lineH / 2;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";
  ctx.lineWidth = 4 * s;
  ctx.strokeStyle = COLOR_BLACK;
  ctx.fillStyle = COLOR_YELLOW;
  for (const line of lines) {
    ctx.strokeText(line, width / 2, y);
    ctx.fillText(line, width / 2, y);
    y += lineH;
  }
}

export const HEADER_FONT_FAMILY = "BrandedHeaderFont";
let headerFontPromise: Promise<void> | null = null;

export function loadHeaderFont(): Promise<void> {
  if (!headerFontPromise) {
    headerFontPromise = (async () => {
      const face = new FontFace(HEADER_FONT_FAMILY, "url(/fonts/Jalnan2.ttf)");
      await face.load();
      document.fonts.add(face);
    })();
  }
  return headerFontPromise;
}

// 한글은 어절보다 글자 단위 줄바꿈이 자연스러움(원본 파이썬 wrap_text와 동일한 방식)
function wrapTextCharwise(ctx: CanvasRenderingContext2D, text: string, maxWidthPx: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const ch of text) {
    const candidate = current + ch;
    if (!current || ctx.measureText(candidate).width <= maxWidthPx) {
      current = candidate;
    } else {
      lines.push(current);
      current = ch;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawSearchIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, s: number) {
  const lensR = r * 0.68;
  const lensCx = cx - r * 0.18;
  const lensCy = cy - r * 0.18;
  ctx.lineWidth = 9 * s;
  ctx.strokeStyle = COLOR_WHITE;
  ctx.beginPath();
  ctx.arc(lensCx, lensCy, lensR, 0, Math.PI * 2);
  ctx.stroke();

  const angle = (45 * Math.PI) / 180;
  const startX = lensCx + lensR * Math.cos(angle);
  const startY = lensCy + lensR * Math.sin(angle);
  const handleLen = r * 0.75;
  ctx.lineWidth = 10 * s;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + handleLen * Math.cos(angle), startY + handleLen * Math.sin(angle));
  ctx.stroke();
  ctx.lineCap = "butt";
}

function drawCartIcon(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, s: number) {
  const lw = 6 * s;
  ctx.strokeStyle = COLOR_WHITE;
  ctx.lineJoin = "round";

  const handleR = w * 0.1;
  const handleCx = x + handleR;
  const handleCy = y + handleR * 1.2;
  ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.arc(handleCx, handleCy, handleR, 0, Math.PI * 2);
  ctx.stroke();

  const basketLeft = x + w * 0.22;
  const basketTop = y + h * 0.2;
  const basketRight = x + w;
  const basketBottom = y + h * 0.62;
  const basketBl = x + w * 0.34;
  const basketBr = x + w * 0.88;

  ctx.beginPath();
  ctx.moveTo(handleCx + handleR * 0.6, handleCy + handleR * 0.5);
  ctx.lineTo(basketLeft, basketTop);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(basketLeft, basketTop);
  ctx.lineTo(basketRight, basketTop);
  ctx.lineTo(basketBr, basketBottom);
  ctx.lineTo(basketBl, basketBottom);
  ctx.closePath();
  ctx.stroke();

  const midY = (basketTop + basketBottom) / 2;
  const midLeft = (basketLeft + basketBl) / 2;
  const midRight = (basketRight + basketBr) / 2;
  ctx.lineWidth = Math.max(lw - 1 * s, 3 * s);
  ctx.beginPath();
  ctx.moveTo(midLeft, midY);
  ctx.lineTo(midRight, midY);
  ctx.stroke();

  const wheelR = w * 0.085;
  const wheelY = y + h * 0.86;
  ctx.fillStyle = COLOR_WHITE;
  for (const wx of [basketBl + wheelR * 0.6, basketBr - wheelR * 0.6]) {
    ctx.beginPath();
    ctx.arc(wx, wheelY, wheelR, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.lineJoin = "miter";
}

export interface BrandedHeaderOptions {
  width: number;
  channel: string;
  headline: string;
  views?: string;
  comments?: string;
}

/** 실제 헤더 영역 높이(px, width 비율로 스케일됨) — 캡션/비디오 배치 계산에 필요 */
export function brandedHeaderHeight(width: number): number {
  return Math.round((width * REF_HEADER_H) / REF_W);
}

/** 파란 상단바 맨 위, 플랫폼 자체 UI(검색창 등)가 겹쳐도 되는 빈 여백의 높이 —
 * 미리보기에서 실제 플랫폼 내비게이션 목업을 이 위에 겹쳐 그릴 때 필요하다. */
export function headerSafeTopHeight(width: number): number {
  return Math.round((width * REF_BAR_SAFE_TOP) / REF_W);
}

/** canvas에 브랜드 헤더를 그린다. canvas.width/height는 미리 (width, brandedHeaderHeight(width))로 맞춰둘 것. */
export function drawBrandedHeader(
  canvas: HTMLCanvasElement,
  { width, channel, headline, views, comments }: BrandedHeaderOptions
) {
  const s = width / REF_W; // 1080 기준 스케일 비율
  const headerH = brandedHeaderHeight(width);
  canvas.width = width;
  canvas.height = headerH;

  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, width, headerH);

  const barSafeTop = REF_BAR_SAFE_TOP * s;
  const barContentH = REF_BAR_H * s;
  const barH = barSafeTop + barContentH; // 파란 바 전체 높이(빈 안전 여백 + 콘텐츠 줄)
  const barCy = barSafeTop + barContentH / 2; // 채널명·아이콘은 이 지점을 중심으로 배치

  // 흰 배경(훅 문구 영역) 먼저
  ctx.fillStyle = COLOR_WHITE;
  ctx.fillRect(0, 0, width, headerH);

  // 파란 상단바 — 맨 위 barSafeTop 만큼은 텍스트/아이콘 없이 순수 여백으로 비워둠
  ctx.fillStyle = COLOR_HEADER_BG;
  ctx.fillRect(0, 0, width, barH);

  // 아이콘도 휴대폰에서 작게 보인다는 피드백으로 원본(검색 r=22, 카트 46x42)보다 키움
  drawSearchIcon(ctx, 64 * s + 29 * s, barCy, 29 * s, s);
  const cartW = 60 * s;
  const cartH = 55 * s;
  drawCartIcon(ctx, width - 64 * s - cartW, barCy - cartH / 2, cartW, cartH, s);

  // 채널명 + 드롭다운 화살표(중앙 정렬)
  const channelFontPx = REF_CHANNEL_FONT_SIZE * s;
  ctx.font = `${channelFontPx}px "${HEADER_FONT_FAMILY}"`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  const channelW = ctx.measureText(channel).width;
  const triW = 24 * s;
  const triH = 14 * s;
  const triGap = 16 * s;
  const groupW = channelW + triGap + triW;
  const channelX = (width - groupW) / 2;
  ctx.fillStyle = COLOR_WHITE;
  ctx.fillText(channel, channelX, barCy);

  const triLeft = channelX + channelW + triGap;
  const triTop = barCy - triH / 2;
  ctx.beginPath();
  ctx.moveTo(triLeft, triTop);
  ctx.lineTo(triLeft + triW, triTop);
  ctx.lineTo(triLeft + triW / 2, triTop + triH);
  ctx.closePath();
  ctx.fill();

  // 훅 문구 (자동 줄바꿈, 세로 가운데 정렬) + 조회수/댓글 수(선택)
  const headlineFontPx = REF_HEADLINE_FONT_SIZE * s;
  ctx.font = `${headlineFontPx}px "${HEADER_FONT_FAMILY}"`;
  const maxWidth = width - 100 * s;
  const lines = wrapTextCharwise(ctx, headline, maxWidth);
  const lineH = REF_HEADLINE_LINE_H * s;
  const dividerH = REF_DIVIDER_H * s;
  const hasStat = Boolean(views || comments);
  const statBlockH = hasStat ? REF_STAT_BLOCK_H * s : 0;
  const availableH = headerH - barH - dividerH;
  const totalH = lines.length * lineH + statBlockH;
  let y = barH + Math.max((availableH - totalH) / 2, 0) + lineH / 2;

  ctx.fillStyle = COLOR_BLACK;
  ctx.textAlign = "center";
  for (const line of lines) {
    ctx.fillText(line, width / 2, y);
    y += lineH;
  }

  if (hasStat) {
    const parts: string[] = [];
    if (views) parts.push(`조회수 ${views}`);
    if (comments) parts.push(`댓글 ${comments}`);
    const statText = parts.join("  |  ");
    const statFontPx = REF_STAT_FONT_SIZE * s;
    ctx.font = `${statFontPx}px "${HEADER_FONT_FAMILY}"`;
    ctx.fillStyle = COLOR_GRAY;
    ctx.fillText(statText, width / 2, y + 6 * s);
  }

  // 훅 문구 아래 검은 구분선
  ctx.fillStyle = COLOR_BLACK;
  ctx.fillRect(0, headerH - dividerH, width, dividerH);
}

/** 내보내기(ffmpeg)용 — 오프스크린 캔버스에 그려서 PNG Blob으로 반환 */
export async function renderBrandedHeaderPng(options: BrandedHeaderOptions): Promise<Blob> {
  await loadHeaderFont();
  const canvas = document.createElement("canvas");
  drawBrandedHeader(canvas, options);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("헤더 이미지를 만들지 못했어요."));
    }, "image/png");
  });
}
