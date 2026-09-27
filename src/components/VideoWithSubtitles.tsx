import { useEffect, useRef, useState } from "react";
import type { SubtitleCue, VideoTemplate } from "../types";
import { drawOverlayTexts } from "../lib/overlayTemplate";
import { PHOTO_SECONDS_PER_IMAGE, PHOTO_TRANSITION_SECONDS } from "../lib/photoSlideshow";
import { timestampToSeconds } from "../utils/time";
import {
  OUTPUT_CANVAS_H,
  OUTPUT_CANVAS_W,
  brandedHeaderHeight,
  captionBarHeight,
  drawBrandedHeader,
  drawCaptionBar,
  headerSafeTopHeight,
  loadCaptionFont,
  loadHeaderFont,
} from "../lib/brandedHeader";
import Icon from "./ui/Icon";

interface Props {
  src: string;
  cues: SubtitleCue[];
  channel: string;
  headline: string;
  views?: string;
  comments?: string;
  template?: VideoTemplate;
  /** photo 템플릿에서 슬라이드쇼로 보여줄 사진들 */
  photoUrls?: string[];
}

const PREVIEW_WIDTH = 260;
// 파란 헤더 맨 위 "빈 안전 여백"과 정확히 같은 높이 — 플랫폼 자체 내비게이션(검색창 등)은
// 별도 공간을 차지하는 게 아니라 이 여백 위에 그대로 겹쳐진다(실제 게시 화면 스크린샷으로
// 확인됨: 검색바가 파란 헤더를 밀어내리지 않고 그 위에 얹힌다).
const SAFE_TOP_H = headerSafeTopHeight(PREVIEW_WIDTH);
// 최종 mp4에서 영상이 실제로 보이는 영역(헤더·자막바를 뺀 나머지)의 가로세로 비율
const VIDEO_AREA_RATIO =
  OUTPUT_CANVAS_W / (OUTPUT_CANVAS_H - brandedHeaderHeight(OUTPUT_CANVAS_W) - captionBarHeight(OUTPUT_CANVAS_W));
// 오버레이 템플릿은 영상이 9:16 전체를 차지한다
const FULL_CANVAS_RATIO = OUTPUT_CANVAS_W / OUTPUT_CANVAS_H;

// 주어진 시점(초)에 보여줄 자막 — 다음 자막이 시작하기 전까지(마지막은 3초) 유지된다
function cueAt(cues: SubtitleCue[], seconds: number): SubtitleCue | null {
  const sorted = [...cues].sort((a, b) => timestampToSeconds(a.timestamp) - timestampToSeconds(b.timestamp));
  for (let i = 0; i < sorted.length; i++) {
    const start = timestampToSeconds(sorted[i].timestamp);
    const end = i + 1 < sorted.length ? timestampToSeconds(sorted[i + 1].timestamp) : start + 3;
    if (seconds >= start && seconds < end) return sorted[i];
  }
  return null;
}

export default function VideoWithSubtitles({
  src,
  cues,
  channel,
  headline,
  views,
  comments,
  template,
  photoUrls = [],
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const headerCanvasRef = useRef<HTMLCanvasElement>(null);
  const captionCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCue, setActiveCue] = useState<SubtitleCue | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [prevPhotoUrl, setPrevPhotoUrl] = useState<string | null>(null);
  const [photoFadedIn, setPhotoFadedIn] = useState(true);
  const shownPhotoIndexRef = useRef(0);
  const isPhoto = template === "photo" && photoUrls.length > 0;
  const isPlain = template === "none";
  // 훅 문구·자막을 영상 위에 얹는 템플릿(사진 슬라이드쇼도 같은 글자 스타일을 쓴다)
  const isOverlay = template === "overlay" || isPhoto;

  // 오버레이 템플릿 — 훅 문구(항상)와 현재 자막을 영상 위 투명 캔버스에 그린다
  useEffect(() => {
    if (!isOverlay) return;
    let cancelled = false;
    Promise.all([loadHeaderFont(), loadCaptionFont()]).then(() => {
      if (cancelled) return;
      const canvas = overlayCanvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      drawOverlayTexts(canvas, PREVIEW_WIDTH * dpr, { hook: headline, caption: activeCue?.text ?? "" });
    });
    return () => {
      cancelled = true;
    };
  }, [isOverlay, headline, activeCue]);

  useEffect(() => {
    let cancelled = false;
    loadHeaderFont().then(() => {
      if (cancelled) return;
      const canvas = headerCanvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      drawBrandedHeader(canvas, { width: PREVIEW_WIDTH * dpr, channel, headline, views, comments });
    });
    return () => {
      cancelled = true;
    };
  }, [channel, headline, views, comments]);

  // 헤더 바로 아래 고정 자막바 — shorts_template.py와 동일하게 흰 배경에 노란 글씨(검은
  // 테두리)로 현재 구간의 자막을 보여준다. 자막이 없는 순간에는 빈 흰 바만 보임.
  useEffect(() => {
    let cancelled = false;
    loadCaptionFont().then(() => {
      if (cancelled) return;
      const canvas = captionCanvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      drawCaptionBar(canvas, PREVIEW_WIDTH * dpr, activeCue?.text ?? "");
    });
    return () => {
      cancelled = true;
    };
  }, [activeCue]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function handleTimeUpdate() {
      if (!video) return;
      setActiveCue(cueAt(cues, video.currentTime));
    }

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [cues]);

  // 사진이 바뀌면 직전 사진을 바닥에 남긴 채 새 사진을 페이드로 띄운다
  useEffect(() => {
    if (!isPhoto || shownPhotoIndexRef.current === photoIndex) return;
    setPrevPhotoUrl(photoUrls[shownPhotoIndexRef.current] ?? null);
    shownPhotoIndexRef.current = photoIndex;
    setPhotoFadedIn(false);
    const frame = requestAnimationFrame(() => setPhotoFadedIn(true));
    return () => cancelAnimationFrame(frame);
  }, [isPhoto, photoIndex, photoUrls]);

  // 사진 슬라이드쇼는 재생할 영상이 없으므로 자체 타이머로 사진을 넘기면서 그 시점의 자막을 보여준다
  // (실제 내보내기에서는 나레이션 길이에 맞춰 장당 시간이 다시 계산된다)
  useEffect(() => {
    if (!isPhoto) return;
    const total = photoUrls.length * PHOTO_SECONDS_PER_IMAGE;
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = ((Date.now() - startedAt) / 1000) % total;
      setPhotoIndex(Math.min(photoUrls.length - 1, Math.floor(elapsed / PHOTO_SECONDS_PER_IMAGE)));
      setActiveCue(cueAt(cues, elapsed));
    }, 250);
    return () => window.clearInterval(timer);
  }, [isPhoto, photoUrls.length, cues]);

  return (
    <div
      style={{
        maxWidth: 260,
        margin: "0 auto 16px",
        borderRadius: 20,
        overflow: "hidden",
        background: "#000",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ position: "relative" }}>
        {isPhoto ? (
          // 사진 슬라이드쇼 — 영상 대신 사진이 순서대로 바뀌고, 그 위에 훅 문구·자막이 얹힌다
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: String(FULL_CANVAS_RATIO),
              overflow: "hidden",
              background: "#000",
            }}
          >
            {/* 이전 사진을 아래 깔고 새 사진을 서서히 띄워서 겹치게 넘긴다(내보내기는 사진마다
                fade·wipe·circleopen 같은 서로 다른 전환 효과가 들어간다) */}
            {prevPhotoUrl && (
              <img
                src={prevPhotoUrl}
                alt=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            <img
              src={photoUrls[photoIndex]}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: photoFadedIn ? 1 : 0,
                transition: `opacity ${PHOTO_TRANSITION_SECONDS}s ease`,
              }}
            />
            <canvas
              ref={overlayCanvasRef}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            />
          </div>
        ) : isPlain ? (
          // 글자 없음 — 원본 영상 그대로(음성·배경음만 입힘)
          <div style={{ width: "100%", aspectRatio: String(FULL_CANVAS_RATIO), overflow: "hidden" }}>
            <video
              ref={videoRef}
              src={src}
              controls
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "bottom" }}
            />
          </div>
        ) : isOverlay ? (
          // 훅+자막 오버레이 템플릿 — 헤더·자막바 없이 영상이 9:16 화면을 꽉 채우고,
          // 그 위에 투명 캔버스로 훅 문구와 현재 자막만 얹는다
          <div style={{ position: "relative", width: "100%", aspectRatio: String(FULL_CANVAS_RATIO), overflow: "hidden" }}>
            <video
              ref={videoRef}
              src={src}
              controls
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "bottom" }}
            />
            <canvas
              ref={overlayCanvasRef}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            />
          </div>
        ) : (
          <>
            <canvas ref={headerCanvasRef} style={{ display: "block", width: "100%", height: "auto" }} />
            <canvas ref={captionCanvasRef} style={{ display: "block", width: "100%", height: "auto" }} />
            {/* 내보내기(videoExport.ts)와 똑같은 비율·기준으로 잘라서 보여준다 — 예전엔 미리보기가
                원본 전체를 보여줘서 실제 mp4에서 무엇이 잘려나갈지 여기서는 알 수 없었다 */}
            <div style={{ width: "100%", aspectRatio: String(VIDEO_AREA_RATIO), overflow: "hidden" }}>
              <video
                ref={videoRef}
                src={src}
                controls
                style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "bottom" }}
              />
            </div>
          </>
        )}

        {/* 실제 틱톡 상단바 — 플랫폼 자체 UI는 파란 헤더 맨 위의 빈 안전 여백 위에 그대로
            얹힌다(별도 공간을 차지하지 않음). 틱톡은 중앙에 팔로잉/추천 탭, 우측에 검색만
            있고 LIVE 뱃지·햄버거 메뉴는 없다. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: SAFE_TOP_H,
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            overflow: "hidden",
            zIndex: 2,
          }}
        >
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 8, fontSize: 7, lineHeight: 1, whiteSpace: "nowrap", opacity: 0.85 }}>
            <span>팔로잉</span>
            <span style={{ fontWeight: 700, color: "#fff", opacity: 1, borderBottom: "1px solid #fff", paddingBottom: 1 }}>추천</span>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Icon name="search" size={9} />
          </div>
        </div>

        {/* 우측 참여(좋아요/댓글/저장/공유) 아이콘 컬럼 — 실제 앱에서 영상 위에 겹쳐 표시된다 */}
        <div
          style={{
            position: "absolute",
            right: 8,
            bottom: 58,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            textShadow: "0 1px 3px rgba(0,0,0,0.6)",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#333",
              border: "2px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {channel.trim().charAt(0) || "?"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Icon name="heart" size={24} />
            <span style={{ fontSize: 10 }}>{comments || "0"}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <Icon name="message" size={22} />
            <span style={{ fontSize: 10 }}>{views || "0"}</span>
          </div>
          <Icon name="bookmark" size={22} />
          <Icon name="share" size={22} />
        </div>

        {/* 좌측 하단 채널명 표시줄 — 실제 앱이 자체적으로 깔아주는 텍스트 영역이다 */}
        <div
          style={{
            position: "absolute",
            left: 10,
            right: 56,
            bottom: 8,
            fontSize: 11,
            fontWeight: 700,
            textShadow: "0 1px 3px rgba(0,0,0,0.6)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          @{channel || "channel"}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "8px 0",
          borderTop: "1px solid #222",
        }}
      >
        <Icon name="home" size={18} />
        <Icon name="users" size={18} />
        <div
          style={{
            width: 26,
            height: 20,
            borderRadius: 6,
            background: "#fff",
            color: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="plus" size={14} />
        </div>
        <Icon name="message" size={18} />
        <Icon name="user" size={18} />
      </div>
    </div>
  );
}
