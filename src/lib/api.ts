import type { GeneratedContent, GeneratorInput } from "../types";
import type { Language } from "../i18n/translations";

export async function generateContent(input: GeneratorInput, language: Language): Promise<GeneratedContent> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sourceInfo: input.sourceInfo,
      platform: input.platform,
      targetAudience: input.targetAudience,
      sellingPoint: input.sellingPoint,
      language,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `요청이 실패했어요 (${res.status})`);
  }

  return res.json();
}
