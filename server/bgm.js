import fs from "fs";
import os from "os";
import path from "path";

// 로컬 저작권 프리 BGM 모음 폴더 — shorts_template.py(다른 파이썬 프로젝트)와 동일한
// 폴더를 그대로 재사용한다.
const BGM_DIR = path.join(os.homedir(), "OneDrive", "바탕 화면", "음악,이미지 다운-확장프로그램", "배경음 모음");

// 나레이션/소구점 텍스트의 한국어 분위기 단어 → BGM 파일명 태그(영문) 매칭용
const BGM_MOOD_HINTS = {
  happy: ["신나", "즐거", "행복", "재밌", "재미", "웃"],
  advertising: ["할인", "특가", "세일", "구매", "쇼핑", "추천"],
  cook: ["요리", "음식", "맛", "먹"],
  funk: ["신나", "펑키", "리듬"],
  upbeat: ["빠르", "신나", "활기"],
  playful: ["귀엽", "장난", "발랄"],
  night: ["밤", "야간", "저녁"],
  walk: ["산책", "걷"],
  joyful: ["기쁘", "즐거", "신나"],
  background: [],
};

export function bgmDir() {
  return BGM_DIR;
}

/**
 * 텍스트(나레이션 훅+소구점 등)의 분위기 키워드로 로컬 BGM 폴더에서 가장 어울리는 곡을
 * 고른다. 뚜렷하게 어울리는 곡이 없으면 무작위로 하나 고른다(항상 뭔가는 붙임). 폴더가
 * 없거나 mp3가 하나도 없으면 null을 돌려준다.
 */
export function pickBgm(hintText) {
  let files;
  try {
    files = fs.readdirSync(BGM_DIR).filter((f) => f.toLowerCase().endsWith(".mp3"));
  } catch {
    return null;
  }
  if (files.length === 0) return null;

  const scored = files.map((file) => {
    const nameLower = path.parse(file).name.toLowerCase();
    let score = 0;
    for (const [tag, hints] of Object.entries(BGM_MOOD_HINTS)) {
      if (nameLower.includes(tag)) {
        score += hints.filter((hint) => hintText.includes(hint)).length;
      }
    }
    return { file, score };
  });

  const bestScore = Math.max(...scored.map((s) => s.score));
  const candidates = bestScore > 0 ? scored.filter((s) => s.score === bestScore) : scored;
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  return picked.file;
}
