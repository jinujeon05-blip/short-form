// Downloads the Fish Audio voice clips listed in lines.json next to this file.
// Run once with Node 18+:  node rpg-demo/voice/fetch-voices.mjs
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const lines = JSON.parse(await readFile(join(dir, "lines.json"), "utf8"));
for (const line of lines) {
  const res = await fetch(line.url);
  if (!res.ok) throw new Error(`${line.id}: HTTP ${res.status}`);
  await writeFile(join(dir, `${line.id}.mp3`), Buffer.from(await res.arrayBuffer()));
  console.log(`saved ${line.id}.mp3`);
}
