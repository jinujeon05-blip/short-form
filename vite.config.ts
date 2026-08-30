import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // @ffmpeg/ffmpeg의 내부 워커(worker.js)는 esbuild 사전 번들링을 거치면
  // import.meta.url 기준 상대 경로가 깨져서 워커 스크립트가 404가 남 — 사전 번들링에서 제외해야 함
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  },
});
