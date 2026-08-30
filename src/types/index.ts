export type Platform = "tiktok" | "reels" | "shorts";

export interface SourceVideo {
  name: string;
  url: string;
}

export interface GeneratorInput {
  sourceInfo: string;
  platform: Platform;
  targetAudience: string;
  sellingPoint: string;
  sourceVideo?: SourceVideo;
}

export interface StructureBeat {
  label: string;
  timestamp: string;
  note: string;
}

export interface SubtitleCue {
  timestamp: string;
  text: string;
  position: string;
  emphasis: string;
}

export interface ActionChecklistItem {
  label: string;
  value: string;
}

export interface GeneratedContent {
  structureAnalysis: {
    beats: StructureBeat[];
    reuseGuide: string;
  };
  narrationScript: {
    hook: string;
    body: string;
  };
  subtitleGuide: {
    cues: SubtitleCue[];
    styleNote: string;
  };
  actionPlan: ActionChecklistItem[];
}

export interface GeneratedResult extends GeneratedContent {
  id: string;
  createdAt: string;
  input: GeneratorInput;
}
