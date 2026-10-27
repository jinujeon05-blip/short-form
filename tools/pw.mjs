import { fileURLToPath, pathToFileURL } from 'node:url';
// Playwright 불러오기 (클라우드 환경은 전역 설치본, 아니면 일반 import)
let pw;
try { pw = await import('/opt/node22/lib/node_modules/playwright/index.mjs'); }
catch { pw = await import('playwright'); }
export const { chromium } = pw;
// 윈도우 PC(D:\qrmenu)에서도 맞는 경로가 나오게 fileURLToPath·pathToFileURL을 쓴다
export const ROOT = fileURLToPath(new URL('..', import.meta.url)).replace(/[\\/]$/, '');
export const fileUrl = (p) => pathToFileURL(p).href;
