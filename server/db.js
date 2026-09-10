import { DatabaseSync } from "node:sqlite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");
fs.mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(path.join(dataDir, "history.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS history (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    input TEXT NOT NULL,
    content TEXT NOT NULL
  )
`);

// 영상 탐색 페이지의 저장 검색어(플랫폼별로 따로 관리). 테이블을 처음 만들 때만 기본 검색어를
// 넣음 — 매 시작마다 "비어 있으면 채우기"로 하면 사용자가 전부 지운 뒤 재시작했을 때 되살아나버림
const hadKeywordTable = db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'search_keywords'").get();
db.exec(`
  CREATE TABLE IF NOT EXISTS search_keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT NOT NULL,
    keyword TEXT NOT NULL,
    created_at TEXT NOT NULL,
    UNIQUE (platform, keyword)
  )
`);

const DEFAULT_KEYWORDS = {
  youtube: ["꿀템", "살림템", "자취템", "다이소 추천템"],
  tiktok: ["꿀템", "살림템", "tiktok made me buy it"],
  instagram: ["살림템", "꿀템추천", "주방템"],
  douyin: ["好物推荐", "家居好物", "厨房神器"],
  xiaohongshu: ["好物分享", "家居好物", "平价好物"],
};

if (!hadKeywordTable) {
  const insert = db.prepare("INSERT OR IGNORE INTO search_keywords (platform, keyword, created_at) VALUES (?, ?, ?)");
  const now = new Date().toISOString();
  for (const [platform, keywords] of Object.entries(DEFAULT_KEYWORDS)) {
    for (const keyword of keywords) insert.run(platform, keyword, now);
  }
}

export function listKeywords(platform) {
  return db
    .prepare("SELECT id, platform, keyword FROM search_keywords WHERE platform = ? ORDER BY id")
    .all(platform)
    .map((row) => ({ ...row }));
}

export function addKeyword(platform, keyword) {
  db.prepare("INSERT OR IGNORE INTO search_keywords (platform, keyword, created_at) VALUES (?, ?, ?)").run(
    platform,
    keyword,
    new Date().toISOString()
  );
  const row = db.prepare("SELECT id, platform, keyword FROM search_keywords WHERE platform = ? AND keyword = ?").get(platform, keyword);
  return { ...row };
}

export function deleteKeyword(id) {
  return db.prepare("DELETE FROM search_keywords WHERE id = ?").run(id).changes > 0;
}

function rowToResult(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    input: JSON.parse(row.input),
    ...JSON.parse(row.content),
  };
}

export function listHistory() {
  const rows = db.prepare("SELECT id, created_at, input, content FROM history ORDER BY created_at DESC").all();
  return rows.map(rowToResult);
}

export function insertHistory(result) {
  const { structureAnalysis, narrationScript, subtitleGuide, actionPlan, bgm } = result;
  db.prepare("INSERT INTO history (id, created_at, input, content) VALUES (?, ?, ?, ?)").run(
    result.id,
    result.createdAt,
    JSON.stringify(result.input),
    JSON.stringify({ structureAnalysis, narrationScript, subtitleGuide, actionPlan, bgm })
  );
}
