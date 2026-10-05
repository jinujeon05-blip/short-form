# 명월 明月 · Minh Nguyệt

한국인과 베트남인을 위한 무료 음력·좋은 날·사주 사이트.
"같은 달, 두 나라의 달력 / Một vầng trăng, hai cuốn lịch"

## 1단계 기능
- **오늘**: 양력 · 한국 음력 · 베트남 음력을 함께 표시 (두 나라 날짜가 다르면 강조), 일진, 오늘의 길흉
- **좋은 날 달력**: 황도일/흑도일, 12직, 황도시, 절기, 공휴일
  - 한국식: 손 없는 날 / 베트남식: Tam Nương · Nguyệt Kỵ 흉일
  - 목적별(결혼·개업·이사·계약·여행) 좋은 날 표시, 내 띠와 충하는 날 제외
- **띠별 운세**: 오늘 일진과 12띠의 합·충·형·해 관계로 풀이 (베트남판은 토끼 대신 고양이)
- **무료 사주**: 사주팔자, 십신, 지장간, 12운성, 오행 분포, 일간 풀이, 신강/신약(간이), 대운, 세운
- 한국어 / 베트남어 전환, 결과 링크 공유

## 2단계 기능
- **한·베 궁합** (`#/match`): 일간(성향) · 일지(생활) · 띠 · 납음오행(Nạp âm, 베트남식 "mệnh") · 오행 보완 5가지로 100점 만점 점수
  - 띠와 납음은 설날/Tết 기준 연도로 계산
  - 두 사람 모두와 충하지 않는 다가오는 결혼·약속 좋은 날 3개 추천
- **공유 이미지 카드**: 궁합·사주 결과를 1080×1350 PNG로 만들어 모바일 공유창(카카오톡·Zalo 등)으로 바로 보내거나 저장
- 모든 계산은 브라우저에서 처리 (서버 없음, 개인정보 저장 없음)

## 계산 방식
- 절기·합삭: `astronomy-engine`으로 천문 계산 (분 단위)
- 음력: 한국 UTC+9, 베트남 UTC+7 (1968년 이전 UTC+8) 기준으로 각각 계산
- 출생 시각: 브라우저의 IANA 시간대 정보로 과거 서머타임(1948–60, 1987–88)과 UTC+8:30 시기 반영
- 일주·시주: 출생지 경도 보정(진태양시, 선택), 야자시 구분(선택)
- 검증: `npm test` — 기존 만세력 라이브러리(lunar-javascript)와 사주 기둥 400건 대조, 음력 1929–1967 대조, 알려진 설날 날짜 확인

## 실행
```bash
cd saju
npm install
npm run dev      # 개발 서버
npm test         # 계산 엔진 테스트
npm run build    # dist/ 에 정적 사이트 생성
```

## 검색 노출 (SEO)
- 주소: 한국어 `/`, `/calendar`, `/match`, `/name`, `/saju` · 베트남어 `/vi`, `/vi/calendar` … (예전 `/#/…` 링크는 자동으로 새 주소로 이동)
- `npm run build`가 페이지·언어별 HTML(제목, 설명, canonical, hreflang, 미리보기 태그)과 `sitemap.xml`, `robots.txt`를 만듭니다 (`scripts/prerender.mjs`)
- 페이지별 검색 제목·설명: `src/seo.json`
- 사이트 주소·검색엔진 인증값: `site.config.json` (도메인을 바꾸면 `siteUrl`만 수정)
- 링크 미리보기 이미지: `public/og-image.png` (1200×630)

### 검색엔진 등록 순서
1. **Google Search Console** (베트남 검색의 대부분, 한국도 중요)
   - 속성 추가 → "URL 접두어"에 사이트 주소 입력 → 확인 방법 "HTML 태그" 선택
   - 태그의 `content="…"` 값을 `site.config.json`의 `verification.google`에 넣고 배포 → "확인"
   - 왼쪽 "Sitemaps"에 `sitemap.xml` 제출
2. **네이버 서치어드바이저** (searchadvisor.naver.com)
   - 웹마스터 도구 → 사이트 등록 → "HTML 태그" 방식 → 값을 `verification.naver`에 넣고 배포 → 소유 확인
   - 요청 → 사이트맵 제출에 `sitemap.xml` 입력
3. **Bing 웹마스터 도구**: Google Search Console에서 가져오기로 바로 등록 가능 (값은 `verification.bing`)


정적 사이트라 Vercel / Cloudflare Pages / Netlify 무료 요금제로 배포할 수 있습니다.
- Vercel: 새 프로젝트 → 이 저장소 선택 → Root Directory `saju` → Framework `Vite` → Deploy

## 3단계 기능
- **한·베 이름 변환** (`#/name`)
  - 베트남 이름 → 한국 이름: Nguyễn Minh Anh → 완명영(阮明英), 성씨·이름 첫 글자 두음법칙(黎 려→여), 영문 표기
  - 한국 이름 → 베트남 이름: 이서연 → Lý Thụy Nghiên(李瑞姸)
  - 음절마다 한자 후보를 골라 바꿀 수 있음, 성조 없이 입력해도 인식, 중간 이름(Thị·Văn) 빼기
  - 발음오행(첫소리 오행)의 상생·상극 흐름, 공유 이미지 카드
  - 한자 사전: `src/content/hanja.ts` (약 350자, 줄 단위로 추가 가능)
