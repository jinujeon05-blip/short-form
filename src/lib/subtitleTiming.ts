import type { GeneratedContent } from "../types";
import { timestampToSeconds } from "../utils/time";

function secondsToTimestamp(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

function rescaleRangeString(range: string, scale: number): string {
  const [start, end] = range.split("-").map((p) => p.trim());
  const startSeconds = timestampToSeconds(start ?? "0:00") * scale;
  const endSeconds = timestampToSeconds(end ?? start ?? "0:00") * scale;
  return `${secondsToTimestamp(startSeconds)} - ${secondsToTimestamp(endSeconds)}`;
}

// AI가 타임코드를 가정한 길이(예: 30초)로 썼는데 실제 업로드 영상이 더 짧으면, 뒷부분 구간/자막이 영상이 끝난 뒤의
// 시점을 가리키게 돼 미리보기·내보내기에서 절대 나오지 않는 문제가 생김. 이미 실제 길이 안에 들어오는 경우는
// 손대지 않고, 넘칠 때만 비율대로 압축해서 마지막 자막이 영상 끝나기 직전에 딱 맞게 배치되도록 함.
export function rescaleTimingToVideoDuration<T extends GeneratedContent>(content: T, actualDurationSeconds: number): T {
  if (!Number.isFinite(actualDurationSeconds) || actualDurationSeconds <= 0) return content;

  const beatEnds = content.structureAnalysis.beats.map((b) => {
    const [, end] = b.timestamp.split("-").map((p) => p.trim());
    return timestampToSeconds(end ?? b.timestamp);
  });
  const cueStarts = content.subtitleGuide.cues.map((c) => timestampToSeconds(c.timestamp));
  const assumedTotal = Math.max(0, ...beatEnds, ...cueStarts);

  const targetTotal = actualDurationSeconds * 0.92; // 영상 끝나기 직전에 마지막 자막이 배치되도록 약간의 여유
  if (assumedTotal === 0 || assumedTotal <= targetTotal) return content;

  const scale = targetTotal / assumedTotal;

  return {
    ...content,
    structureAnalysis: {
      ...content.structureAnalysis,
      beats: content.structureAnalysis.beats.map((b) => ({ ...b, timestamp: rescaleRangeString(b.timestamp, scale) })),
    },
    subtitleGuide: {
      ...content.subtitleGuide,
      cues: content.subtitleGuide.cues.map((c) => ({
        ...c,
        timestamp: secondsToTimestamp(timestampToSeconds(c.timestamp) * scale),
      })),
    },
  };
}
