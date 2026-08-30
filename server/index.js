import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { GeneratedContentSchema } from "./generateSchema.js";
import { pcmToWav, parseL16MimeType } from "./audio.js";
import { listHistory, insertHistory } from "./db.js";

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

1. 영상 구조 분석: 영상을 훅(Hook)/문제 제기/제품 시연/CTA 4개 구간으로 나누고 각각 초 단위 타임코드(mm:ss - mm:ss)와 설명을 작성해. 전체 길이는 30초 내외로 가정하고, 원본 순서를 비틀어 재배치하는 재구성 가이드를 제시해.
2. 나레이션 스크립트: 처음 3초 안에 이탈을 막는 강력한 훅 문구와, 기능 나열이 아닌 고객의 불편함(Pain Point)을 해소하는 스토리텔링 구조의 구어체 본문 대본을 작성해.
   - 실제 사람이 친구에게 편하게 말하듯 자연스러운 구어체로 써. 문어체 표현, 억지로 압축한 신조어, 문법이 꼬여서 뜻이 헷갈리는 문장(예: "누워서 태블릿 보다 얼굴로 들이받으세요?" 같은 모호한 구조)은 피해.
   - 소리 내어 읽었을 때 자연스럽게 들리는지 스스로 검토한 뒤 작성해. 한 문장은 짧고 명확하게, 주어-목적어-서술어 관계가 분명하게 써.
   - 호흡이나 톤 변화가 필요한 지점은 괄호 안에 지시문이 아니라 실제로 소리 내어 읽을 수 있는 짧은 감탄사·구어체 표현으로 넣어(예: "(어우)", "(진짜)") — "(강조)", "(한 박자 쉬고)" 같은 메타 지시문은 쓰지 마, TTS가 그대로 읽어버려.
3. 자막 가이드: 시점별(mm:ss) 핵심 키워드 자막 3~6개와 화면 배치 위치, 강조 스타일(예: 핵심 숫자·혜택은 노란색 강조)을 지정해.
4. 편집 체크리스트: 컷 편집 속도, 화면 전환 효과, BGM 분위기, 해상도/비율(9:16) 4가지를 정리해.

입력된 타겟 플랫폼과 타겟층의 톤에 맞게 작성하고, 판매 링크가 아니라 소구점 자체를 자연스럽게 녹여내.

모든 텍스트(structureAnalysis, narrationScript, subtitleGuide, actionPlan 전부)는 사용자가 지정한 출력 언어로 작성해. 그 언어를 쓰는 사람이 실제로 말하듯 자연스러운 구어체를 쓰고, 다른 언어를 직역한 듯한 어색한 표현은 피해.`;

const ai = new GoogleGenAI({});
const responseJsonSchema = z.toJSONSchema(GeneratedContentSchema);

const app = express();
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  const { sourceInfo, platform, targetAudience, sellingPoint, language } = req.body ?? {};
  const languageName = LANGUAGE_NAMES[language] ?? LANGUAGE_NAMES.ko;

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
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `출력 언어: ${languageName}
원본 영상 링크 또는 주요 특징 요약: ${sourceInfo}
타겟 플랫폼: ${PLATFORM_LABELS[platform] ?? platform}
주요 타겟층: ${targetAudience}
핵심 소구점: ${sellingPoint}`,
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

    res.json(parsed);
  } catch (err) {
    console.error("Gemini API error:", err);
    const status = err?.status;
    if (status === 401 || status === 403) {
      res.status(500).json({ error: "서버에 GEMINI_API_KEY가 올바르게 설정되지 않았어요." });
    } else if (status === 429) {
      res.status(429).json({ error: "요청이 몰려서 잠시 후 다시 시도해주세요." });
    } else if (status) {
      res.status(502).json({ error: `AI 생성 중 오류가 발생했어요: ${err.message}` });
    } else {
      res.status(500).json({ error: "알 수 없는 오류가 발생했어요." });
    }
  }
});

app.post("/api/tts", async (req, res) => {
  const { text, voice } = req.body ?? {};

  if (typeof text !== "string" || !text.trim()) {
    res.status(400).json({ error: "읽을 텍스트가 없어요." });
    return;
  }
  const voiceName = typeof voice === "string" && voice.trim() ? voice : "Kore";

  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({
      error: "서버에 GEMINI_API_KEY가 설정돼 있지 않아요. .env 파일에 키를 추가한 뒤 서버를 다시 시작해주세요.",
    });
    return;
  }

  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-tts-preview",
      input: text,
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
    const status = err?.status;
    if (status === 401 || status === 403) {
      res.status(500).json({ error: "서버에 GEMINI_API_KEY가 올바르게 설정되지 않았어요." });
    } else if (status === 429) {
      res.status(429).json({ error: "요청이 몰려서 잠시 후 다시 시도해주세요." });
    } else if (status) {
      res.status(502).json({ error: `음성 생성 중 오류가 발생했어요: ${err.message}` });
    } else {
      res.status(500).json({ error: "알 수 없는 오류가 발생했어요." });
    }
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
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
  app.listen(port, () => console.log(`Dev server running at http://localhost:${port}`));
}
