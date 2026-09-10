import type { GeneratedContent, GeneratorInput } from "../types";
import type { Language } from "../i18n/translations";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function analyzeVideo(file: File, language: Language): Promise<{ sourceInfo: string; sellingPoint: string }> {
  const data = await fileToBase64(file);
  const res = await fetch("/api/analyze-video", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, mimeType: file.type, language }),
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
      commentKeyword: input.commentKeyword,
      language,
      videoDurationSeconds: input.sourceVideo?.durationSeconds,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `요청이 실패했어요 (${res.status})`);
  }

  return res.json();
}
