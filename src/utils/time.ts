// "0:05", "1:02:30" 같은 타임코드를 초 단위로 변환 (자막 오버레이 동기화용)
export function timestampToSeconds(timestamp: string): number {
  const parts = timestamp.split(":").map((p) => parseInt(p, 10) || 0);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] ?? 0;
}
