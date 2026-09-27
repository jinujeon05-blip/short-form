import type { GeneratorInput } from "../types";

/** 나레이션이 없을 때 사진 한 장을 보여주는 기본 시간(초) */
export const PHOTO_SECONDS_PER_IMAGE = 3;

/** 사진이 바뀔 때 겹치는 전환 시간(초) */
export const PHOTO_TRANSITION_SECONDS = 0.5;

/**
 * 사진이 바뀔 때마다 돌아가며 쓰는 전환 효과(ffmpeg xfade의 transition 이름).
 * 브라우저용 ffmpeg 코어(@ffmpeg/core 0.12.10)에 xfade와 아래 효과 이름이 모두 들어 있는 것을
 * wasm 바이너리에서 직접 확인함. 장수가 많아도 바로 옆 사진끼리는 항상 다른 효과가 되도록
 * 순서대로 돌려 쓴다.
 */
export const PHOTO_TRANSITIONS = [
  "fade",
  "wipeleft",
  "circleopen",
  "slideup",
  "dissolve",
  "smoothright",
  "wipedown",
  "radial",
  "circleclose",
  "slideright",
];

export function photoTransitionAt(index: number): string {
  return PHOTO_TRANSITIONS[index % PHOTO_TRANSITIONS.length];
}

/**
 * 사진 슬라이드쇼의 기본 길이 — 대본 생성 프롬프트에 "영상 전체 길이"로 넘겨서, 나레이션이
 * 사진 장수에 비해 너무 길거나 짧게 써지지 않도록 한다. 실제 내보내기에서는 나레이션 음성이
 * 있으면 그 길이에 맞춰 사진 표시 시간을 다시 나눈다(videoExport.ts).
 */
export function photoSlideshowSeconds(input: Pick<GeneratorInput, "template" | "sourcePhotos">): number | undefined {
  if (input.template !== "photo") return undefined;
  const count = input.sourcePhotos?.length ?? 0;
  return count > 0 ? count * PHOTO_SECONDS_PER_IMAGE : undefined;
}
