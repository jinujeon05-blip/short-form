// Builds a single-file copy of the game with the art embedded as data URIs.
// Run from the repo root:  node rpg-demo/build-standalone.mjs
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
let html = await readFile(join(dir, "index.html"), "utf8");
for (const name of ["portrait-elder", "portrait-merchant", "portrait-kid", "title"]) {
  const path = `art/${name}.jpg`;
  if (!html.includes(`'${path}'`)) throw new Error(`${path} is not referenced in index.html`);
  const data = (await readFile(join(dir, path))).toString("base64");
  html = html.replaceAll(`'${path}'`, `'data:image/jpeg;base64,${data}'`);
}
const out = join(dir, "등불마을이야기.html");
await writeFile(out, `<!doctype html>\n<html lang="ko">\n${html}`);
console.log(`wrote ${out} (${Math.round(Buffer.byteLength(html) / 1024)} KB)`);
