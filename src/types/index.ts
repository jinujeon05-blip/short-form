export type Platform = "tiktok" | "reels" | "shorts";

/**
 * 영상 템플릿 —
 * branded: 파란 브랜드 헤더(채널명·훅문구)+흰 자막바,
 * overlay: 헤더 없이 영상이 화면을 꽉 채우고 훅 문구·자막만 영상 위에 얹힘,
 * none: 글자를 아예 넣지 않고 원본 영상에 음성(+배경음)만 입힘,
 * photo: 영상 대신 제품 사진 여러 장을 슬라이드쇼로 이어붙이고 훅 문구·자막·음성을 넣음.
 * 값이 없는 예전 이력은 branded로 취급한다.
 */
export type VideoTemplate = "branded" | "overlay" | "none" | "photo";

export interface SourceVideo {
  name: string;
  url: string;
  durationSeconds?: number;
}

export interface SourcePhoto {
  name: string;
  url: string;
}

export interface GeneratorInput {
  sourceInfo: string;
  platform: Platform;
  /** 없으면 branded(기존 결과물과 동일) */
  template?: VideoTemplate;
  /** photo 템플릿에서 슬라이드쇼로 이어붙일 사진들 */
  sourcePhotos?: SourcePhoto[];
  /** 없으면 true — false면 댓글 유도 키워드를 아예 쓰지 않는다 */
  useCommentKeyword?: boolean;
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

/** 검색 기간 필터 — 서버에서 유튜브 publishedAfter로 변환됨 */
export type SearchPeriod = "all" | "week" | "month" | "quarter" | "year";

export interface HookPattern {
  name: string;
  explanation: string;
  examples: string[];
}

export interface HookAnalysis {
  summary: string;
  patterns: HookPattern[];
  keywords: string[];
  suggestions: string[];
}

export interface GeneratedResult extends GeneratedContent {
  id: string;
  createdAt: string;
  input: GeneratorInput;
}
