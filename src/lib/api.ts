import type { GeneratedContent, GeneratorInput } from "../types";
import type { Language } from "../i18n/translations";
import { photoSlideshowSeconds } from "./photoSlideshow";

export async function analyzeVideo(file: File, language: Language): Promise<{ sourceInfo: string; sellingPoint: string }> {
  // 예전엔 base64 JSON으로 감쌌는데 그러면 원본의 4/3배로 부풀어서 큰 영상이 그대로 막혔음 —
  // 파일 바이트를 그대로 보내고, 서버가 Gemini Files API로 업로드해서 분석함
  const res = await fetch(`/api/analyze-video?language=${encodeURIComponent(language)}`, {
    method: "POST",
    headers: { "Content-Type": file.type || "video/mp4" },
    body: file,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `요청이 실패했어요 (${res.status})`);
  }

  return res.json();
}

export async function generateContent(input: GeneratorInput, language: Language): Promise<GeneratedContent> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sourceInfo: input.sourceInfo,
      platform: input.platform,
      targetAudience: input.targetAudience,
      sellingPoint: input.sellingPoint,
      // 체크를 꺼두면 아예 빈 값으로 보내서 서버가 댓글 CTA 자체를 빼도록 한다
      commentKeyword: input.useCommentKeyword === false ? "" : input.commentKeyword,
      language,
      videoDurationSeconds: input.sourceVideo?.durationSeconds ?? photoSlideshowSeconds(input),
      photoCount: input.template === "photo" ? input.sourcePhotos?.length : undefined,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `요청이 실패했어요 (${res.status})`);
  }

  return res.json();
}
