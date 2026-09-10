import type { SearchKeyword, VideoSearchItem, VideoSearchPlatform, VideoSearchPlatformStatus } from "../types";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `요청이 실패했어요 (${res.status})`);
  }
  if (res.status === 204) return undefined as T;
  // 서버를 재시작하지 않아 이 API 라우트가 아직 없으면 Vite의 SPA 폴백이 index.html을 200으로
  // 돌려줘서, 그대로 res.json()하면 "Unexpected token '<'" 같은 의미 없는 에러가 화면에 뜸
  if (!res.headers.get("content-type")?.includes("application/json")) {
    throw new Error("서버 응답을 읽지 못했어요. 개발 서버(npm run dev)를 껐다가 다시 켜주세요.");
  }
  return res.json();
}

export function listVideoSearchPlatforms() {
  return request<VideoSearchPlatformStatus[]>("/api/video-search/platforms");
}

export function searchVideos(platform: VideoSearchPlatform, query: string, shortOnly: boolean) {
  const params = new URLSearchParams({ q: query, ...(shortOnly ? { short: "1" } : {}) });
  return request<VideoSearchItem[]>(`/api/video-search/${platform}?${params}`);
}

export function listKeywords(platform: VideoSearchPlatform) {
  return request<SearchKeyword[]>(`/api/search-keywords/${platform}`);
}

export function addKeyword(platform: VideoSearchPlatform, keyword: string) {
  return request<SearchKeyword>(`/api/search-keywords/${platform}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keyword }),
  });
}

export function deleteKeyword(id: number) {
  return request<void>(`/api/search-keywords/${id}`, { method: "DELETE" });
}
