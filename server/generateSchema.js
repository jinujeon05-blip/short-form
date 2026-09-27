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

export const HookAnalysisSchema = z.object({
  summary: z.string().describe("이 검색어의 인기 영상들이 전반적으로 어떤 식으로 만들어져 있는지 2~3문장 요약"),
  patterns: z
    .array(
      z.object({
        name: z.string().describe("훅 패턴 이름, 예: 가격 충격 / 실패담 고백 / 비교 실험"),
        explanation: z.string().describe("이 패턴이 왜 통하는지 한두 문장 설명"),
        examples: z.array(z.string()).min(1).max(3).describe("목록에서 실제로 이 패턴에 해당하는 제목"),
      })
    )
    .min(3)
    .max(6),
  keywords: z.array(z.string()).min(3).max(12).describe("제목에서 반복적으로 등장하는 단어·표현"),
  suggestions: z.array(z.string()).min(3).max(6).describe("이 분석을 바탕으로 바로 쓸 수 있는 새 훅 문구 제안"),
});

export const VideoAnalysisSchema = z.object({
  sourceInfo: z
    .string()
    .describe("업로드된 영상을 보고 작성한 1~3문장 요약: 어떤 제품인지, 영상이 어떤 장면들로 구성돼 있는지, 특징적인 포인트"),
  sellingPoint: z
    .string()
    .describe("영상에서 드러나는 제품의 핵심 소구점(구매 욕구를 자극하는 특징·장점) 한 문장. 판매 링크나 URL이 아니라 실제 소구점 문구여야 함"),
});
