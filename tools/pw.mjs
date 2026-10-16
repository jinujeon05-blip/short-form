// Playwright 불러오기 (클라우드 환경은 전역 설치본, 아니면 일반 import)
let pw;
try { pw = await import('/opt/node22/lib/node_modules/playwright/index.mjs'); }
catch { pw = await import('playwright'); }
export const { chromium } = pw;
export const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
