// 플랫폼별 인기 영상 검색 — 유튜브는 공식 YouTube Data API v3로 실제 동작한다.
// 틱톡/인스타/도우인/샤오홍슈는 일반 앱이 쓸 수 있는 공개 검색 API가 없어서(틱톡은 연구자 전용,
// 인스타는 비즈니스 계정 해시태그 검색만, 도우인/샤오홍슈는 아예 없음) 유료 데이터 제공 서비스를
// 붙여야 한다 — 지금은 search가 없는 "틀"만 두고, 나중에 search 함수만 채우면 바로 동작하게 해둠.

const MAX_RESULTS = 200;
// 같은 검색어를 다시 누를 때마다 유튜브 쿼터(검색 1회=100유닛, 200개=400유닛)를 또 쓰지 않도록 캐시
const CACHE_TTL_MS = 30 * 60 * 1000;

export class VideoSearchError extends Error {
  constructor(httpStatus, message) {
    super(message);
    this.httpStatus = httpStatus;
  }
}

async function youtubeGet(endpoint, params) {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
  for (const [key, value] of Object.entries({ ...params, key: process.env.YOUTUBE_API_KEY })) {
    url.searchParams.set(key, String(value));
  }

  const res = await fetch(url);
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const reason = body?.error?.errors?.[0]?.reason;
    console.error("YouTube API error:", res.status, reason, body?.error?.message);
    if (reason === "quotaExceeded" || reason === "dailyLimitExceeded") {
      throw new VideoSearchError(
        429,
        "오늘 유튜브 API 무료 사용량(하루 10,000유닛 — 200개 검색 약 25번)을 다 썼어요. 한국 시간 오후 4~5시쯤 초기화돼요."
      );
    }
    if (res.status === 400 || res.status === 403) {
      throw new VideoSearchError(
        500,
        "YOUTUBE_API_KEY가 올바르지 않거나, 그 키의 Google Cloud 프로젝트에 YouTube Data API v3가 활성화돼 있지 않아요."
      );
    }
    throw new VideoSearchError(502, "유튜브 검색 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
  }
  return body;
}

async function searchYoutube(query, { shortOnly }) {
  // search.list는 한 번에 최대 50개라 pageToken으로 4페이지까지 넘김.
  // order=viewCount라 유튜브 전체에서 조회수 높은 순으로 200개를 받아옴.
  const ids = [];
  let pageToken;
  while (ids.length < MAX_RESULTS) {
    const page = await youtubeGet("search", {
      part: "id",
      q: query,
      type: "video",
      order: "viewCount",
      maxResults: 50,
      ...(shortOnly ? { videoDuration: "short" } : {}),
      ...(pageToken ? { pageToken } : {}),
    });
    for (const item of page.items ?? []) {
      const id = item.id?.videoId;
      if (id && !ids.includes(id)) ids.push(id);
    }
    pageToken = page.nextPageToken;
    if (!pageToken) break;
  }

  // search.list 결과엔 조회수/댓글수가 없어서 videos.list(50개씩, 1유닛)로 통계를 따로 받음
  const byId = new Map();
  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50);
    const page = await youtubeGet("videos", { part: "snippet,statistics", id: chunk.join(","), maxResults: 50 });
    for (const v of page.items ?? []) byId.set(v.id, v);
  }

  return ids
    .slice(0, MAX_RESULTS)
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map((v) => ({
      id: v.id,
      url: `https://www.youtube.com/watch?v=${v.id}`,
      title: v.snippet?.title ?? "",
      channel: v.snippet?.channelTitle ?? "",
      thumbnail: v.snippet?.thumbnails?.medium?.url ?? v.snippet?.thumbnails?.default?.url ?? "",
      publishedAt: v.snippet?.publishedAt ?? null,
      views: Number(v.statistics?.viewCount ?? 0),
      // 댓글을 막아둔 영상은 commentCount 필드 자체가 없음 — 0과 구분하려고 null로 둠
      comments: v.statistics?.commentCount != null ? Number(v.statistics.commentCount) : null,
      likes: v.statistics?.likeCount != null ? Number(v.statistics.likeCount) : null,
    }));
}

const PLATFORMS = {
  youtube: { envKey: "YOUTUBE_API_KEY", search: searchYoutube },
  tiktok: { envKey: null, search: null },
  instagram: { envKey: null, search: null },
  douyin: { envKey: null, search: null },
  xiaohongshu: { envKey: null, search: null },
};

export function isVideoSearchPlatform(platform) {
  return Object.hasOwn(PLATFORMS, platform);
}

function platformStatus(id) {
  const { envKey, search } = PLATFORMS[id];
  if (!search) return { id, available: false, reason: "no-provider" };
  if (envKey && !process.env[envKey]) return { id, available: false, reason: "no-key" };
  return { id, available: true, reason: null };
}

export function listVideoSearchPlatforms() {
  return Object.keys(PLATFORMS).map(platformStatus);
}

const cache = new Map();

export async function searchVideos(platform, query, { shortOnly = false } = {}) {
  const status = platformStatus(platform);
  if (!status.available) {
    throw new VideoSearchError(
      503,
      status.reason === "no-key"
        ? `서버에 ${PLATFORMS[platform].envKey}가 설정돼 있지 않아요. .env 파일에 키를 추가한 뒤 서버를 다시 시작해주세요.`
        : "이 플랫폼은 아직 데이터 API가 연결되지 않았어요."
    );
  }

  const cacheKey = `${platform}|${shortOnly ? 1 : 0}|${query}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.items;

  const items = await PLATFORMS[platform].search(query, { shortOnly });
  cache.set(cacheKey, { at: Date.now(), items });
  return items;
}
