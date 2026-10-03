import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, createPartFromUri } from "@google/genai";
import { z } from "zod";
import { GeneratedContentSchema, VideoAnalysisSchema, HookAnalysisSchema, VideoPromptSchema } from "./generateSchema.js";
import { pcmToWav, parseL16MimeType } from "./audio.js";
import { listHistory, insertHistory, listKeywords, addKeyword, deleteKeyword } from "./db.js";
import { pickBgm, bgmDir } from "./bgm.js";
import { VideoSearchError, isVideoSearchPlatform, listVideoSearchPlatforms, searchVideos } from "./videoSearch.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5175;

const PLATFORM_LABELS = {
  tiktok: "틱톡",
  reels: "인스타그램 릴스",
  shorts: "유튜브 쇼츠",
};

const LANGUAGE_NAMES = {
  ko: "한국어",
  en: "영어(English)",
  vi: "베트남어(Tiếng Việt)",
};

const SYSTEM_PROMPT = `너는 이커머스 마케팅 전문 영상 프로듀서이자 숏폼 콘텐츠 기획자야. 제공되는 제품 영상 정보를 분석해서, 플랫폼 알고리즘의 중복 콘텐츠 감지를 피하는 독창적인 리유즈 숏폼 영상의 시나리오, 나레이션 대본, 자막 가이드를 작성해.

1. 영상 구조 분석: 영상을 훅(Hook)/문제 제기/제품 시연/CTA 4개 구간으로 나누고 각각 초 단위 타임코드(mm:ss - mm:ss)와 설명을 작성해. 입력에 "영상 전체 길이"가 주어지면 반드시 그 길이를 그대로 따르고(마지막 구간의 종료 타임코드가 그 길이와 정확히 일치해야 해), 주어지지 않으면 30초 내외로 가정해. 원본 순서를 비틀어 재배치하는 재구성 가이드를 제시해.
2. 나레이션 스크립트: 처음 3초 안에 이탈을 막는 강력한 훅 문구와, 기능 나열이 아닌 고객의 불편함(Pain Point)을 해소하는 스토리텔링 구조의 구어체 본문 대본을 작성해.
   - "댓글 유도 키워드"가 주어지면, 본문 대본의 마지막 문장은 반드시 그 키워드를 그대로 넣어서 댓글을 남기도록 유도하는 CTA로 끝나야 해(예: "댓글에 '키워드' 남겨주세요!"). 정확한 표현은 자연스럽게 바꿔도 되지만 키워드 단어 자체는 그대로 포함해야 해. 반대로 "(사용 안 함)"으로 주어지면 댓글 관련 멘트를 절대 넣지 말고 제품에 대한 관심을 남기는 문장으로 마무리해.
   - 대본 전체 분량은 소리 내어 자연스러운 속도로 읽었을 때 "영상 전체 길이" 안에 끝나야 해(언어별 자연스러운 발화 속도 기준, 한국어는 대략 초당 4~5음절). 너무 길게 써서 영상보다 나레이션이 오래 걸리면 안 돼.
   - 실제 사람이 친구에게 편하게 말하듯 자연스러운 구어체로 써. 문어체 표현, 억지로 압축한 신조어, 문법이 꼬여서 뜻이 헷갈리는 문장(예: "누워서 태블릿 보다 얼굴로 들이받으세요?" 같은 모호한 구조)은 피해.
   - 소리 내어 읽었을 때 자연스럽게 들리는지 스스로 검토한 뒤 작성해. 한 문장은 짧고 명확하게, 주어-목적어-서술어 관계가 분명하게 써.
   - 호흡이나 톤 변화가 필요한 지점은 괄호 안에 지시문이 아니라 실제로 소리 내어 읽을 수 있는 짧은 감탄사·구어체 표현으로 넣어(예: "(어우)", "(진짜)") — "(강조)", "(한 박자 쉬고)" 같은 메타 지시문은 쓰지 마, TTS가 그대로 읽어버려.
3. 자막 가이드: 시점별(mm:ss) 핵심 키워드 자막 3~6개와 화면 배치 위치, 강조 스타일(예: 핵심 숫자·혜택은 노란색 강조)을 지정해.
4. 편집 체크리스트: 컷 편집 속도, 화면 전환 효과, BGM 분위기, 해상도/비율(9:16) 4가지를 정리해.

입력된 타겟 플랫폼과 타겟층의 톤에 맞게 작성하고, 판매 링크가 아니라 소구점 자체를 자연스럽게 녹여내.

모든 텍스트(structureAnalysis, narrationScript, subtitleGuide, actionPlan 전부)는 사용자가 지정한 출력 언어로 작성해. 그 언어를 쓰는 사람이 실제로 말하듯 자연스러운 구어체를 쓰고, 다른 언어를 직역한 듯한 어색한 표현은 피해.`;

// Gemini SDK 에러의 err.message는 종종 {"error":{"code":503,...}} 같은 원본 JSON 문자열 그대로라서,
// 그걸 그대로 사용자에게 보여주면 화면에 JSON이 그대로 노출됨 — 상태 코드별로 친절한 문구로 변환해서 응답
function friendlyGeminiError(err, contextLabel) {
  const status = err?.status;
  if (status === 401 || status === 403) {
    return { httpStatus: 500, message: "서버에 GEMINI_API_KEY가 올바르게 설정되지 않았어요." };
  }
  if (status === 429) {
    return { httpStatus: 429, message: "요청이 몰려서 잠시 후 다시 시도해주세요." };
  }
  if (status === 503) {
    return { httpStatus: 503, message: "AI 모델이 지금 요청이 많아 잠시 사용할 수 없어요. 잠시 후 다시 시도해주세요." };
  }
  if (status) {
    return { httpStatus: 502, message: `${contextLabel} 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.` };
  }
  return { httpStatus: 500, message: "알 수 없는 오류가 발생했어요." };
}

const ai = new GoogleGenAI({});

// 쓰던 모델이 "This model is currently experiencing high demand"(503)로 통째로 막히는 일이 실제로
// 있었다(2026-09-29: gemini-3.6-flash가 계속 503, 사용자가 10번 넘게 실패). 한 모델이 막히면
// 다음 모델로 자동으로 넘어가도록 순서대로 시도한다. 앞에 있는 것이 기본 모델.
const TEXT_MODELS = ["gemini-3.8-flash", "gemini-3-flash-preview"];

async function generateWithFallback(params) {
  let lastError;
  for (const model of TEXT_MODELS) {
    try {
      return await ai.models.generateContent({ ...params, model });
    } catch (err) {
      // 과부하(503)·쿼터(429)일 때만 다음 모델로 넘어간다 — 그 외 오류는 모델을 바꿔도 똑같다
      if (err?.status !== 503 && err?.status !== 429) throw err;
      lastError = err;
      console.warn(`Gemini model ${model} unavailable (${err.status}), trying next model`);
    }
  }
  throw lastError;
}
const responseJsonSchema = z.toJSONSchema(GeneratedContentSchema);
const videoAnalysisJsonSchema = z.toJSONSchema(VideoAnalysisSchema);
const hookAnalysisJsonSchema = z.toJSONSchema(HookAnalysisSchema);
const videoPromptJsonSchema = z.toJSONSchema(VideoPromptSchema);

// 영상 파일을 base64로 인라인 전송하므로 기본 100kb 제한보다 넉넉하게 잡음(아래 MAX_VIDEO_BYTES
// 참고) — base64 인코딩 자체가 원본보다 약 4/3배 부풀고 JSON 오버헤드도 붙으므로, 18MB 체크가
// 실제로 걸리기 전에 이 한도에 먼저 막히지 않도록 여유를 넉넉히 둠(18MB * 4/3 ≈ 24MB)
const app = express();
app.use(express.json({ limit: "30mb" }));
// 로컬 BGM 폴더를 그대로 정적 서빙 — 내보내기(videoExport.ts)가 fetch로 받아서 ffmpeg.wasm에 넘김
app.use("/bgm-files", express.static(bgmDir()));

const COMMENT_CTA_FALLBACK = {
  ko: (keyword) => `댓글에 "${keyword}" 남겨주세요!`,
  en: (keyword) => `Drop a comment with "${keyword}"!`,
  vi: (keyword) => `Để lại bình luận "${keyword}" nhé!`,
};

app.post("/api/generate", async (req, res) => {
  const { sourceInfo, platform, targetAudience, sellingPoint, commentKeyword, language, videoDurationSeconds, photoCount } =
    req.body ?? {};
  const languageName = LANGUAGE_NAMES[language] ?? LANGUAGE_NAMES.ko;
  const durationLine =
    typeof videoDurationSeconds === "number" && Number.isFinite(videoDurationSeconds) && videoDurationSeconds > 0
      ? `영상 전체 길이: ${Math.round(videoDurationSeconds)}초\n`
      : "";
  // 사진 슬라이드쇼(photo 템플릿)는 장면 전환이 사진 단위로 끊기므로, 자막도 사진 수에 맞춰
  // 배치해야 화면과 글자가 따로 놀지 않는다
  const perPhotoSeconds =
    typeof photoCount === "number" && photoCount > 0 && typeof videoDurationSeconds === "number" && videoDurationSeconds > 0
      ? videoDurationSeconds / photoCount
      : 3;
  const photoLine =
    typeof photoCount === "number" && Number.isFinite(photoCount) && photoCount > 0
      ? `이 영상은 촬영된 영상이 아니라 제품 사진 ${Math.round(photoCount)}장을 같은 길이로 순서대로 보여주는 슬라이드쇼야` +
        `(사진 한 장당 약 ${perPhotoSeconds.toFixed(1)}초). ` +
        `자막 시점은 사진이 바뀌는 시점(0초, ${perPhotoSeconds.toFixed(1)}초, 그 배수)에 맞춰 잡고, ` +
        `카메라 움직임·손으로 들어 보이는 시연처럼 정지 사진으로는 보여줄 수 없는 표현은 쓰지 마.\n`
      : "";
  // 댓글 유도 키워드는 선택 — 안 쓰면 CTA를 구매 유도로 바꾸도록 지시한다
  const useCommentKeyword = typeof commentKeyword === "string" && commentKeyword.trim().length > 0;
  const commentLine = useCommentKeyword
    ? `댓글 유도 키워드: ${commentKeyword}`
    : "댓글 유도 키워드: (사용 안 함) — 댓글을 남겨달라는 멘트는 넣지 말고, 마지막 문장은 제품에 관심을 갖게 만드는 자연스러운 마무리 문장으로 끝내.";

  if (
    typeof sourceInfo !== "string" ||
    !sourceInfo.trim() ||
    typeof targetAudience !== "string" ||
    !targetAudience.trim() ||
    typeof sellingPoint !== "string" ||
    !sellingPoint.trim()
  ) {
    res.status(400).json({ error: "필수 입력값이 누락됐어요." });
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({
      error: "서버에 GEMINI_API_KEY가 설정돼 있지 않아요. .env 파일에 키를 추가한 뒤 서버를 다시 시작해주세요.",
    });
    return;
  }

  try {
    const response = await generateWithFallback({
      contents: `출력 언어: ${languageName}
${durationLine}${photoLine}원본 영상 링크 또는 주요 특징 요약: ${sourceInfo}
타겟 플랫폼: ${PLATFORM_LABELS[platform] ?? platform}
주요 타겟층: ${targetAudience}
핵심 소구점: ${sellingPoint}
${commentLine}`,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: responseJsonSchema,
      },
    });

    if (!response.text) {
      res.status(502).json({ error: "AI 응답을 해석하지 못했어요. 다시 시도해주세요." });
      return;
    }

    let parsed;
    try {
      parsed = GeneratedContentSchema.parse(JSON.parse(response.text));
    } catch (parseErr) {
      console.error("Gemini output parse/validation error:", parseErr);
      res.status(502).json({ error: "AI 응답 형식이 올바르지 않아요. 다시 시도해주세요." });
      return;
    }

    // AI가 지시를 안 따라서 댓글 유도 문구를 빼먹는 경우에 대비해, 키워드가 실제로 안 들어가 있으면
    // 항상 붙여줌(음성 멘트에 반드시 나와야 하는 요구사항이라 프롬프트만 믿을 수 없음)
    if (useCommentKeyword && !parsed.narrationScript.body.toLowerCase().includes(commentKeyword.trim().toLowerCase())) {
      const cta = (COMMENT_CTA_FALLBACK[language] ?? COMMENT_CTA_FALLBACK.ko)(commentKeyword.trim());
      parsed.narrationScript.body = `${parsed.narrationScript.body} ${cta}`;
    }

    // 배경음악 자동 선택 — 나레이션 훅+소구점의 분위기에 맞는 곡을 로컬 폴더에서 고른다.
    // AI 응답 스키마(GeneratedContentSchema) 검증이 끝난 뒤에 붙이는 부가 필드라 스키마를
    // 따로 손댈 필요는 없음(zod로 다시 파싱하지 않고 그대로 JSON 응답에 실어 보냄).
    const bgmFile = pickBgm(`${parsed.narrationScript.hook} ${sellingPoint}`);
    if (bgmFile) {
      parsed.bgm = { url: `/bgm-files/${encodeURIComponent(bgmFile)}`, name: bgmFile };
    }

    res.json(parsed);
  } catch (err) {
    console.error("Gemini API error:", err);
    const { httpStatus, message } = friendlyGeminiError(err, "AI 생성");
    res.status(httpStatus).json({ error: message });
  }
});

// 예전엔 영상을 base64 인라인 데이터로 보내서 Gemini의 요청당 20MB 제한에 걸렸고(그래서 18MB 컷),
// 이제는 Files API로 업로드한 뒤 URI로 참조함 — 파일당 2GB까지 가능해서 사실상 제한이 풀림.
// 전송도 base64(원본의 4/3배) 대신 파일 바이트 그대로 받아서 낭비가 없음.
const MAX_VIDEO_BYTES = 500 * 1024 * 1024;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 업로드 직후 파일은 PROCESSING 상태이고, 이때 바로 참조하면 요청이 실패함 — ACTIVE가 될 때까지 기다린다
async function waitForActiveFile(file, timeoutMs = 5 * 60 * 1000) {
  const startedAt = Date.now();
  let current = file;
  while (current.state === "PROCESSING") {
    if (Date.now() - startedAt > timeoutMs) throw new Error("Gemini file processing timed out");
    await sleep(2000);
    current = await ai.files.get({ name: current.name });
  }
  if (current.state !== "ACTIVE") throw new Error(`Gemini file state: ${current.state}`);
  return current;
}

app.post(
  "/api/analyze-video",
  express.raw({ type: ["video/*", "application/octet-stream"], limit: MAX_VIDEO_BYTES }),
  async (req, res) => {
  const mimeType = (req.get("content-type") ?? "").split(";")[0].trim();
  const languageName = LANGUAGE_NAMES[req.query.language] ?? LANGUAGE_NAMES.ko;

  if (!Buffer.isBuffer(req.body) || req.body.length === 0 || !mimeType.startsWith("video/")) {
    res.status(400).json({ error: "분석할 영상 데이터가 없어요." });
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({
      error: "서버에 GEMINI_API_KEY가 설정돼 있지 않아요. .env 파일에 키를 추가한 뒤 서버를 다시 시작해주세요.",
    });
    return;
  }

  let uploadedName = null;
  try {
    const uploaded = await ai.files.upload({
      file: new Blob([req.body], { type: mimeType }),
      config: { mimeType },
    });
    uploadedName = uploaded.name;
    const file = await waitForActiveFile(uploaded);

    const response = await generateWithFallback({
      contents: [
        {
          text: `너는 이커머스 숏폼 마케팅 영상 분석가야. 업로드된 영상을 보고 두 가지를 작성해.
1. "원본 영상 정보" 요약(1~3문장): 어떤 제품인지, 영상이 어떤 장면들로 구성돼 있는지(예: 언박싱, 기능 시연, 사용 장면 등), 특징적으로 보이는 포인트를 담아.
2. "핵심 소구점"(한 문장): 영상에서 드러나는 제품의 가장 매력적인 특징이나 장점을 구매 욕구를 자극하는 문구로 작성해(예: "손 안 대고 목에 걸기만 하면 끝"). 판매 링크나 URL이 아니라 실제 소구점 문구여야 해.
둘 다 자연스러운 서술형 문장으로 쓰고, 출력 언어는 ${languageName}로 작성해.`,
        },
        createPartFromUri(file.uri, file.mimeType ?? mimeType),
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: videoAnalysisJsonSchema,
      },
    });

    if (!response.text) {
      res.status(502).json({ error: "AI 응답을 해석하지 못했어요. 다시 시도해주세요." });
      return;
    }

    let parsed;
    try {
      parsed = VideoAnalysisSchema.parse(JSON.parse(response.text));
    } catch (parseErr) {
      console.error("Gemini video analysis parse/validation error:", parseErr);
      res.status(502).json({ error: "AI 응답 형식이 올바르지 않아요. 다시 시도해주세요." });
      return;
    }

    res.json(parsed);
  } catch (err) {
    console.error("Gemini video analysis error:", err);
    const { httpStatus, message } = friendlyGeminiError(err, "영상 분석");
    res.status(httpStatus).json({ error: message });
  } finally {
    // 올린 파일은 48시간 뒤 자동 삭제되지만, 분석이 끝나면 바로 지워서 계정 저장 용량(20GB)을 아낌
    if (uploadedName) {
      await ai.files.delete({ name: uploadedName }).catch((err) => console.error("Gemini file delete error:", err));
    }
  }
  }
);

// Gemini TTS는 목소리별 세부 톤(피치·감정)을 별도 파라미터로 조절하는 게 아니라, 입력 텍스트 앞에 자연어
// 지시문("Say in a ... tone: ")을 붙이는 방식으로 스티어링함(공식 문서 패턴) — 이 지시문은 실제로 소리 내어
// 읽히지 않고 스타일 지시로만 반영되는 것을 받아쓰기 테스트로 확인함. src/data/voices.ts의 한글 톤 설명과
// 짝을 맞춰서, 목소리를 고를 때 설명한 그 톤에 실제로 더 가깝게 들리도록 함(예: Leda="젊고 발랄한 톤" 선택 시
// 기본보다 더 젊고 높은 피치로 들림 — 사용자가 Google AI Studio에서 확인한 것과 동일한 효과)
const VOICE_STYLE_HINTS = {
  Zephyr: "bright",
  Puck: "upbeat and playful",
  Charon: "informative",
  Kore: "firm and confident",
  Fenrir: "excitable and energetic",
  Leda: "youthful, lively, higher-pitched",
  Orus: "firm",
  Aoede: "breezy and fresh",
  Callirrhoe: "easy-going",
  Autonoe: "bright",
  Enceladus: "breathy",
  Iapetus: "clear",
  Umbriel: "easy-going",
  Algieba: "smooth",
  Despina: "smooth",
  Erinome: "clear",
  Algenib: "gravelly",
  Rasalgethi: "informative",
  Laomedeia: "upbeat",
  Achernar: "calm and soft",
  Alnilam: "firm",
  Schedar: "even and steady",
  Gacrux: "mature",
  Pulcherrima: "assertive",
  Achird: "friendly",
  Zubenelgenubi: "casual",
  Vindemiatrix: "gentle and warm",
  Sadachbia: "lively",
  Sadaltager: "knowledgeable and professional",
  Sulafat: "warm",
};

// Gemini에는 목소리별로 "더 어린 버전"이 따로 있는 게 아니라서, 같은 기반 목소리에 훨씬 강한 스타일 지시문을
// 얹어서 흉내냄. 프론트에서 "Leda::young"처럼 "기반목소리::변형" 형태로 넘어오면 여기서 분리해서 처리함
const VOICE_STYLE_VARIANTS = {
  "Leda::young": "a very young teenage girl, bright, high-pitched, playful, bubbly",
};

app.post("/api/tts", async (req, res) => {
  const { text, voice } = req.body ?? {};

  if (typeof text !== "string" || !text.trim()) {
    res.status(400).json({ error: "읽을 텍스트가 없어요." });
    return;
  }
  const requestedVoice = typeof voice === "string" && voice.trim() ? voice : "Kore";
  const variantHint = VOICE_STYLE_VARIANTS[requestedVoice];
  const voiceName = variantHint ? requestedVoice.split("::")[0] : requestedVoice;
  const styleHint = variantHint ?? VOICE_STYLE_HINTS[voiceName];
  const styledInput = styleHint ? `Say in a ${styleHint} tone at a natural pace: ${text}` : text;

  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({
      error: "서버에 GEMINI_API_KEY가 설정돼 있지 않아요. .env 파일에 키를 추가한 뒤 서버를 다시 시작해주세요.",
    });
    return;
  }

  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-tts-preview",
      input: styledInput,
      response_format: { type: "audio" },
      generation_config: {
        speech_config: [{ voice: voiceName }],
      },
    });

    const audio = interaction.output_audio;
    if (!audio?.data) {
      res.status(502).json({ error: "음성을 생성하지 못했어요. 다시 시도해주세요." });
      return;
    }

    const { sampleRate, channels } = parseL16MimeType(audio.mime_type);
    const wav = pcmToWav(Buffer.from(audio.data, "base64"), sampleRate, channels, 16);

    res.set("Content-Type", "audio/wav");
    res.send(wav);
  } catch (err) {
    console.error("Gemini TTS error:", err);
    const { httpStatus, message } = friendlyGeminiError(err, "음성 생성");
    res.status(httpStatus).json({ error: message });
  }
});

app.get("/api/history", (_req, res) => {
  try {
    res.json(listHistory());
  } catch (err) {
    console.error("History list error:", err);
    res.status(500).json({ error: "이력을 불러오지 못했어요." });
  }
});

app.post("/api/history", (req, res) => {
  const item = req.body ?? {};
  if (typeof item.id !== "string" || typeof item.createdAt !== "string" || typeof item.input !== "object") {
    res.status(400).json({ error: "잘못된 요청이에요." });
    return;
  }

  try {
    insertHistory(item);
    res.status(201).json(item);
  } catch (err) {
    console.error("History insert error:", err);
    res.status(500).json({ error: "이력 저장에 실패했어요." });
  }
});

app.get("/api/video-search/platforms", (_req, res) => {
  res.json(listVideoSearchPlatforms());
});

const PERIOD_DAYS = { week: 7, month: 30, quarter: 90, year: 365 };

// 기준 시각을 시간 단위로 내림 — 매 요청마다 초 단위로 달라지면 캐시 키가 계속 바뀌어서
// 같은 조건을 다시 검색해도 캐시가 안 먹고 유튜브 쿼터만 새로 쓰게 됨
function publishedAfterFor(period) {
  const days = PERIOD_DAYS[period];
  if (!days) return null;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  since.setMinutes(0, 0, 0);
  return since.toISOString();
}

app.get("/api/video-search/:platform", async (req, res) => {
  const { platform } = req.params;
  const query = typeof req.query.q === "string" ? req.query.q.trim() : "";
  if (!isVideoSearchPlatform(platform)) {
    res.status(404).json({ error: "지원하지 않는 플랫폼이에요." });
    return;
  }
  if (!query) {
    res.status(400).json({ error: "검색어를 입력해주세요." });
    return;
  }

  try {
    res.json(
      await searchVideos(platform, query, {
        shortOnly: req.query.short === "1",
        publishedAfter: publishedAfterFor(req.query.period),
      })
    );
  } catch (err) {
    if (err instanceof VideoSearchError) {
      res.status(err.httpStatus).json({ error: err.message });
      return;
    }
    console.error("Video search error:", err);
    res.status(500).json({ error: "영상 검색 중 알 수 없는 오류가 발생했어요." });
  }
});

// 제품·모델 사진을 보고 (1) 영상에 쓸 멘트·훅 문구·자막과 (2) Dola AI·Gemini·Meta AI 같은
// 다른 영상 생성 AI에 그대로 붙여넣을 상세 프롬프트를 함께 만들어준다.
// 사진은 영상보다 훨씬 작아서 Files API 없이 인라인으로 보낸다(프론트에서 미리 축소해서 올림).
const MAX_PROMPT_IMAGES = 12;

// 영상 컨셉 — 고른 컨셉에 따라 말투·카메라 앵글·장면 구성이 완전히 달라지므로, 각 컨셉이
// 실제로 어떤 화면과 어떤 멘트를 뜻하는지 구체적으로 알려준다(이름만 주면 뻔한 결과가 나옴)
const CONCEPT_GUIDE = {
  ugc: `UGC(실사용자 후기) 컨셉: 광고처럼 보이면 안 된다. 일반인이 휴대폰으로 직접 찍은 느낌 —
핸드헬드라 미세하게 흔들리고, 조명은 집·사무실의 자연광이나 형광등 그대로, 배경에 생활감이 있다.
멘트는 "이거 진짜 사길 잘했어요" 같은 솔직한 후기 말투로 쓰고, 과장된 광고 문구나 성우 톤은 쓰지 마.
자막도 손으로 친 듯 짧고 구어체로.`,
  pov: `POV(1인칭 시점) 컨셉: 카메라가 시청자의 눈이다. 화면에 등장하는 건 손과 제품뿐이고,
얼굴은 나오지 않는다. 눈높이에서 제품을 집어 들고, 만지고, 쓰는 과정을 그대로 따라간다.
멘트와 자막은 "지금 막 열어봤는데", "여기를 누르면" 처럼 시청자가 직접 하고 있는 듯한 현재형으로 써.
장면 지시에 "1인칭 시점, 손만 프레임에 등장, 눈높이 앵글"을 반드시 포함해.`,
  unboxing: `언박싱 컨셉: 택배 상자가 도착한 순간부터 시작한다. 상자 개봉 → 포장재 제거 →
제품 첫 등장 → 구성품 하나씩 확인 → 실제로 써보기 순서로 구성해. 포장을 뜯는 소리와 첫인상
리액션이 핵심이고, 제품이 처음 모습을 드러내는 순간을 가장 공들여 연출해.
멘트는 뜯으면서 실시간으로 반응하는 말투로 써.`,
};

app.post("/api/video-prompt", async (req, res) => {
  const { images, productName, targetAudience, platform, durationSeconds, tools, language, extraNote, concepts } =
    req.body ?? {};
  const languageName = LANGUAGE_NAMES[language] ?? LANGUAGE_NAMES.ko;

  if (!Array.isArray(images) || images.length === 0) {
    res.status(400).json({ error: "제품 사진을 한 장 이상 올려주세요." });
    return;
  }
  if (images.length > MAX_PROMPT_IMAGES) {
    res.status(400).json({ error: `사진은 최대 ${MAX_PROMPT_IMAGES}장까지 분석할 수 있어요.` });
    return;
  }
  const validImages = images.filter(
    (img) => img && typeof img.data === "string" && img.data.trim() && typeof img.mimeType === "string" && img.mimeType.startsWith("image/")
  );
  if (validImages.length === 0) {
    res.status(400).json({ error: "사진을 읽지 못했어요. 다시 올려주세요." });
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({
      error: "서버에 GEMINI_API_KEY가 설정돼 있지 않아요. .env 파일에 키를 추가한 뒤 서버를 다시 시작해주세요.",
    });
    return;
  }

  const toolList =
    Array.isArray(tools) && tools.length > 0
      ? tools.filter((t) => typeof t === "string" && t.trim()).slice(0, 6)
      : ["Dola AI", "Google Gemini (Veo)", "Meta AI", "공통(어떤 도구에나)"];
  const seconds =
    typeof durationSeconds === "number" && Number.isFinite(durationSeconds) && durationSeconds > 0
      ? Math.round(durationSeconds)
      : 30;

  const selectedConcepts = Array.isArray(concepts) ? concepts.filter((c) => CONCEPT_GUIDE[c]) : [];
  const conceptBlock =
    selectedConcepts.length > 0
      ? `\n[영상 컨셉 — 아래 지시를 멘트·자막·장면·프롬프트 전부에 반영해]\n${selectedConcepts
          .map((c) => CONCEPT_GUIDE[c])
          .join("\n")}\n${
          selectedConcepts.length > 1
            ? "여러 컨셉이 선택됐으면 하나로 자연스럽게 합쳐라(예: POV+언박싱이면 1인칭 시점으로 상자를 뜯는 영상).\n"
            : ""
        }`
      : "";

  // 어떤 사진이 제품이고 어떤 사진이 모델인지 모델에게 알려줘야 장면 지시가 정확해진다
  const imageParts = [];
  const labels = [];
  let productIndex = 0;
  let modelIndex = 0;
  for (const img of validImages) {
    const isModel = img.kind === "model";
    const label = isModel ? `모델 사진 ${++modelIndex}번` : `제품 사진 ${++productIndex}번`;
    labels.push(label);
    imageParts.push({ text: `[${label}]` });
    imageParts.push({ inlineData: { data: img.data, mimeType: img.mimeType } });
  }

  try {
    const response = await generateWithFallback({
      contents: [
        {
          text: `너는 이커머스 숏폼 영상 기획자이자 영상 생성 AI 프롬프트 전문가야. 아래 사진들을 직접 보고 작업해.

[입력]
제품명/설명: ${typeof productName === "string" && productName.trim() ? productName : "(사진을 보고 추정해)"}
주요 타겟층: ${typeof targetAudience === "string" && targetAudience.trim() ? targetAudience : "(사진과 제품에 어울리게 정해)"}
타겟 플랫폼: ${PLATFORM_LABELS[platform] ?? platform ?? "틱톡"}
목표 영상 길이: ${seconds}초 (9:16 세로)
첨부한 사진: ${labels.join(", ")}
${typeof extraNote === "string" && extraNote.trim() ? `추가 요청: ${extraNote}\n` : ""}${conceptBlock}
[할 일]
1. 사진을 실제로 관찰해서 제품(그리고 인물)이 어떻게 생겼는지 구체적으로 적어. 색상·소재·형태·크기감처럼 눈에 보이는 것만 적고, 사진에 없는 기능을 지어내지 마.
2. 그 분석을 바탕으로 ${seconds}초 영상에 쓸 훅 문구, 나레이션 멘트 전문, 시점별 자막을 써.
3. 장면 구성을 나누고, 각 장면에 어떤 사진을 쓰면 좋은지 사진 번호로 지정해.
4. 아래 도구들 각각에 **그대로 붙여넣을 수 있는** 상세 프롬프트를 써: ${toolList.join(", ")}
   - 프롬프트에는 장면 순서, 카메라 움직임(예: 천천히 줌인, 슬로우 팬), 조명·분위기, 색감, 제품이 화면에서 차지하는 비중, 자막이 들어갈 위치, 영상 길이와 비율(9:16)을 구체적으로 적어.
   - 도구마다 입력 방식이 다르니, 그 도구에 맞는 형태로 써(예: 이미지 업로드 기반 도구는 "업로드한 제품 사진 1번을 기준으로"처럼 사진을 가리키게, 텍스트만 받는 도구는 장면을 글로 묘사).
   - 사진 속 제품의 생김새를 프롬프트 안에서 다시 묘사해서, 그 도구가 엉뚱한 제품을 만들지 않게 해.
5. 업로드용 해시태그도 뽑아.

모든 텍스트는 ${languageName}로 써. 다만 영어 프롬프트를 더 잘 받아들이는 도구라면 그 도구의 prompt 필드만 영어로 쓰고, tips에는 그 이유를 ${languageName}로 적어.`,
        },
        ...imageParts,
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: videoPromptJsonSchema,
      },
    });

    if (!response.text) {
      res.status(502).json({ error: "AI 응답을 해석하지 못했어요. 다시 시도해주세요." });
      return;
    }

    let parsed;
    try {
      parsed = VideoPromptSchema.parse(JSON.parse(response.text));
    } catch (parseErr) {
      console.error("Video prompt parse/validation error:", parseErr);
      res.status(502).json({ error: "AI 응답 형식이 올바르지 않아요. 다시 시도해주세요." });
      return;
    }

    res.json(parsed);
  } catch (err) {
    console.error("Video prompt error:", err);
    const { httpStatus, message } = friendlyGeminiError(err, "프롬프트 생성");
    res.status(httpStatus).json({ error: message });
  }
});

// 검색으로 찾은 인기 영상 제목들을 모아 어떤 훅이 통하는지 분석 — 영상은 보내지 않고
// 제목 텍스트만 보내므로 토큰도 적게 들고 /api/generate 파이프라인과도 완전히 분리돼 있음
app.post("/api/analyze-hooks", async (req, res) => {
  const { titles, query, language } = req.body ?? {};
  const languageName = LANGUAGE_NAMES[language] ?? LANGUAGE_NAMES.ko;

  if (!Array.isArray(titles) || titles.length < 5) {
    res.status(400).json({ error: "분석할 영상 제목이 충분하지 않아요. 먼저 검색을 해주세요." });
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({
      error: "서버에 GEMINI_API_KEY가 설정돼 있지 않아요. .env 파일에 키를 추가한 뒤 서버를 다시 시작해주세요.",
    });
    return;
  }

  const titleList = titles
    .filter((t) => typeof t === "string" && t.trim())
    .slice(0, 200)
    .map((t, i) => `${i + 1}. ${t.trim()}`)
    .join("\n");

  try {
    const response = await generateWithFallback({
      contents: `너는 숏폼 콘텐츠 소재 조사 전문가야. 아래는 "${typeof query === "string" ? query : ""}"로 검색해서 나온 조회수 상위 숏폼 영상들의 제목 목록이야.
이 제목들을 분석해서, 이 주제에서 실제로 통하는 훅(Hook) 패턴을 정리해줘.
- 제목을 그대로 나열하지 말고, 공통된 구조·심리 트리거를 패턴으로 묶어서 이름을 붙여.
- 각 패턴마다 목록에 실제로 있는 제목을 예시로 들어.
- 반복적으로 등장하는 단어·표현도 뽑아줘.
- 마지막으로 이 분석을 바탕으로 내가 바로 쓸 수 있는 새 훅 문구를 제안해줘(기존 제목 복사가 아니라 새로 쓴 문구여야 해).
모든 텍스트는 ${languageName}로 작성해.

${titleList}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: hookAnalysisJsonSchema,
      },
    });

    if (!response.text) {
      res.status(502).json({ error: "AI 응답을 해석하지 못했어요. 다시 시도해주세요." });
      return;
    }

    let parsed;
    try {
      parsed = HookAnalysisSchema.parse(JSON.parse(response.text));
    } catch (parseErr) {
      console.error("Hook analysis parse/validation error:", parseErr);
      res.status(502).json({ error: "AI 응답 형식이 올바르지 않아요. 다시 시도해주세요." });
      return;
    }

    res.json(parsed);
  } catch (err) {
    console.error("Hook analysis error:", err);
    const { httpStatus, message } = friendlyGeminiError(err, "훅 패턴 분석");
    res.status(httpStatus).json({ error: message });
  }
});

const MAX_KEYWORD_LENGTH = 50;

app.get("/api/search-keywords/:platform", (req, res) => {
  const { platform } = req.params;
  if (!isVideoSearchPlatform(platform)) {
    res.status(404).json({ error: "지원하지 않는 플랫폼이에요." });
    return;
  }
  res.json(listKeywords(platform));
});

app.post("/api/search-keywords/:platform", (req, res) => {
  const { platform } = req.params;
  const keyword = typeof req.body?.keyword === "string" ? req.body.keyword.trim() : "";
  if (!isVideoSearchPlatform(platform)) {
    res.status(404).json({ error: "지원하지 않는 플랫폼이에요." });
    return;
  }
  if (!keyword || keyword.length > MAX_KEYWORD_LENGTH) {
    res.status(400).json({ error: `검색어는 1~${MAX_KEYWORD_LENGTH}자로 입력해주세요.` });
    return;
  }
  res.status(201).json(addKeyword(platform, keyword));
});

app.delete("/api/search-keywords/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || !deleteKeyword(id)) {
    res.status(404).json({ error: "검색어를 찾을 수 없어요." });
    return;
  }
  res.status(204).end();
});

// express.json()의 크기 제한(아래 25mb)을 넘는 요청은 라우트 핸들러(analyze-video의
// 자체 MAX_VIDEO_BYTES 안내 메시지 포함)에 닿기도 전에 body-parser가 먼저 거절해버려서,
// 프론트에는 JSON이 아닌 응답이 와 "요청이 실패했어요 (413)"라는 의미 없는 메시지만
// 보였다 — 실제로 18MB짜리 영상도 base64로 부풀면(약 4/3배) + JSON 오버헤드가 겹치면
// 25mb 한도에 걸릴 수 있었음. 에러 핸들링 미들웨어로 이 경우를 잡아서 무슨 상황인지
// 알려주는 메시지로 바꿔준다.
app.use((err, _req, res, next) => {
  if (err?.type === "entity.too.large" || err?.status === 413) {
    res.status(413).json({
      error: "영상 파일이 너무 커요(요청 용량 제한 초과). \"영상 분석해서 채우기\"는 " +
        "500MB 이하 영상에서만 동작해요 — 더 큰 영상이면 이 버튼은 건너뛰고 " +
        "\"원본 영상 링크 또는 주요 특징 요약\"과 \"핵심 소구점\"을 직접 입력해주세요 " +
        "(영상 자체는 대본/자막 생성에 필요 없고, 나중에 내보내기 할 때만 브라우저에서 씁니다).",
    });
    return;
  }
  next(err);
});

if (isProd) {
  const distDir = path.join(__dirname, "..", "dist");
  app.use(express.static(distDir));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
} else {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    root: path.join(__dirname, ".."),
    // 이 프로젝트는 OneDrive 폴더 안에 있어서 파일 변경 알림이 Vite까지 오지 않는 경우가 있다 —
    // 그러면 소스를 고쳐도 서버가 예전에 변환해둔 코드를 계속 돌려줘서, 브라우저를 새로고침해도
    // 옛 코드가 실행된다(실제로 "shrinkPhotoForExport is not defined"로 한참 헤맴).
    // 폴링으로 직접 확인하게 해서 변경이 항상 반영되도록 한다.
    server: { middlewareMode: true, watch: { usePolling: true, interval: 400 } },
    appType: "spa",
  });
  app.use(vite.middlewares);
  app.listen(port, () => console.log(`Dev server running at http://localhost:${port}`));
}
