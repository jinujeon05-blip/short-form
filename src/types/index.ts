export type Platform = "tiktok" | "reels" | "shorts";

export interface SourceVideo {
  name: string;
  url: string;
  durationSeconds?: number;
}

export interface GeneratorInput {
  sourceInfo: string;
  platform: Platform;
  targetAudience: string;
  sellingPoint: string;
  commentKeyword: string;
  sourceVideo?: SourceVideo;
  /** 상단 브랜드 헤더에 표시할 채널명 */
  channel: string;
  /** 상단 브랜드 헤더의 흰 배경 영역에 표시할 훅 문구(나레이션 훅과 별개로, 화면에 큰 글씨로 보일 문구) */
  headline: string;
  /** 헤더 아래 회색 텍스트로 표시할 조회수(선택, 그대로 문자열로 표시됨) */
  views?: string;
  /** 헤더 아래 회색 텍스트로 표시할 댓글 수(선택) */
  comments?: string;
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

export interface BgmTrack {
  url: string;
  name: string;
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
  /** 서버가 나레이션 분위기에 맞춰 로컬 BGM 폴더에서 자동 선택한 배경음악(없을 수 있음) */
  bgm?: BgmTrack;
}

export type VideoSearchPlatform = "youtube" | "tiktok" | "instagram" | "douyin" | "xiaohongshu";

export interface VideoSearchPlatformStatus {
  id: VideoSearchPlatform;
  available: boolean;
  /** no-provider: 이 플랫폼용 데이터 소스가 아직 없음 / no-key: 코드는 있는데 서버 .env에 키가 없음 */
  reason: "no-provider" | "no-key" | null;
}

export interface SearchKeyword {
  id: number;
  platform: VideoSearchPlatform;
  keyword: string;
}

export interface VideoSearchItem {
  id: string;
  url: string;
  title: string;
  channel: string;
  thumbnail: string;
  publishedAt: string | null;
  views: number;
  /** 댓글을 막아둔 영상은 null */
  comments: number | null;
  likes: number | null;
}

export interface GeneratedResult extends GeneratedContent {
  id: string;
  createdAt: string;
  input: GeneratorInput;
}
