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
  const { structureAnalysis, narrationScript, subtitleGuide, actionPlan } = result;
  db.prepare("INSERT INTO history (id, created_at, input, content) VALUES (?, ?, ?, ?)").run(
    result.id,
    result.createdAt,
    JSON.stringify(result.input),
    JSON.stringify({ structureAnalysis, narrationScript, subtitleGuide, actionPlan })
  );
}
