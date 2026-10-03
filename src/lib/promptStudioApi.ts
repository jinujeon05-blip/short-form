import type { Platform, PromptConcept, VideoPromptResult } from "../types";
import type { Language } from "../i18n/translations";

export interface PromptStudioRequest {
  images: { data: string; mimeType: string; kind: "product" | "model" }[];
  productName: string;
  targetAudience: string;
  platform: Platform;
  durationSeconds: number;
  tools: string[];
  concepts: PromptConcept[];
  extraNote: string;
  language: Language;
}

export async function createVideoPrompt(request: PromptStudioRequest): Promise<VideoPromptResult> {
  const res = await fetch("/api/video-prompt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `요청이 실패했어요 (${res.status})`);
  }
  return res.json();
}
