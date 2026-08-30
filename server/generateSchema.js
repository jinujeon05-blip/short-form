import { z } from "zod";

export const StructureBeatSchema = z.object({
  label: z.string().describe("훅(Hook) / 문제 제기 / 제품 시연 / CTA 중 하나"),
  timestamp: z.string().describe("mm:ss - mm:ss 형식의 구간, 예: 0:00 - 0:03"),
  note: z.string(),
});

export const SubtitleCueSchema = z.object({
  timestamp: z.string().describe("mm:ss 형식, 예: 0:05"),
  text: z.string().describe("화면에 표시할 짧은 자막 문구"),
  position: z.string().describe("예: 화면 상단 중앙 / 화면 중앙 / 화면 하단"),
  emphasis: z.string().describe("색상·굵기 등 강조 방식 설명"),
});

export const ActionChecklistItemSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const GeneratedContentSchema = z.object({
  structureAnalysis: z.object({
    beats: z.array(StructureBeatSchema).length(4),
    reuseGuide: z.string().describe("저작권·중복 콘텐츠 감지를 피하기 위한 재구성 가이드"),
  }),
  narrationScript: z.object({
    hook: z.string().describe("첫 3초 안에 이탈을 막는 훅 문구"),
    body: z.string().describe("구어체 본문 대본, 호흡·강조 표시 포함"),
  }),
  subtitleGuide: z.object({
    cues: z.array(SubtitleCueSchema).min(3).max(6),
    styleNote: z.string(),
  }),
  actionPlan: z.array(ActionChecklistItemSchema).length(4),
});
