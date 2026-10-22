// 최소 서비스 워커 — 아무것도 저장하지 않고 요청을 그대로 통과시킨다.
// 목적: 소개서(/)·가게 찾기(/stores/)를 "웹앱으로 설치"할 수 있게 해서, 홈 화면 아이콘에 브라우저 배지(지구본 모양)가 안 붙게 한다.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {}); // 응답을 만들지 않음 → 브라우저가 평소처럼 네트워크로 처리
