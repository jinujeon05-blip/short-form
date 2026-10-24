# 도구 상세 (2026-10-24 CLAUDE.md 정리 전 원문 — 요약은 CLAUDE.md 7장)

## 배포·Vercel 공통
- **도메인 `qrmenuasia.com`** (2026-10-18 Vercel에서 구매, 7개 가게·소개서 프로젝트에 연결 완료, 팀 jinwoo8, 자동 갱신 켜짐, 등록자 JEON JIN WOO). 가게별 하위 주소 `<가게>.qrmenuasia.com`, 소개서·가게 찾기는 `qrmenuasia.com`. 기존 `*.vercel.app` 주소도 계속 열리므로 이미 인쇄한 QR은 그대로 둔다. 새로 인쇄하는 QR·카드·SNS·포장재부터 새 주소로.
- Vercel 팀 기본값이 "모든 배포 로그인 보호"라서, 새 프로젝트마다 Deployment Protection을 `prod_deployment_urls_and_all_previews`로 바꿔야 손님이 로그인 없이 열 수 있다.
- 테이블 QR 카드는 `restaurants/<가게>/print/`에 둔다: `qr.svg`(QR), `table-card.html`(A6 카드 원본), `table-card-A6.pdf`, `table-card-A4x4.pdf`(A4 한 장에 4개), `table-card.png`(300dpi). 폰트는 `public/fonts`(잘난체, G마켓 산스)를 쓴다.
- 배포 방법: Vercel MCP `create_deployment`에 `gitSource`(github, org `jinujeon05-blip`, repo `short-form`, 브랜치·커밋 sha)와 `projectSettings.rootDirectory: "restaurants/<가게>"`를 넘긴다. 먼저 커밋·푸시해야 한다. (사진 등 바이너리도 함께 배포됨)
- 새 가게 첫 배포(2026-10-23 청식당에서 확인): `create_deployment`에 `name`·`project`를 `<가게>-menu`로, `target: "production"`, `projectSettings`(rootDirectory, framework 등 null)를 주면 프로젝트가 같이 만들어진다 → `update_project`로 `ssoProtection.deploymentType: "prod_deployment_urls_and_all_previews"` → `add_project_domain`으로 `<가게>.qrmenuasia.com`(바로 verified) → 가게 찾기 목록이 바뀌었으면 `qrmenu-intro`도 같은 커밋으로 배포.
- Vercel 비용: 메뉴판은 정적 페이지라 트래픽 비용이 거의 없고, 돈은 주로 배포할 때(Build CPU) 든다. 같은 저장소에 Git 연결된 사주 사이트 `myeongwol`(Vite)이 메뉴판 작업 브랜치 푸시마다 같이 빌드돼 비용이 났었다 → 2026-10-17 Ignored Build Step을 `[ "$VERCEL_GIT_COMMIT_REF" != "main" ]`로 바꿔 main만 빌드한다. 메뉴판 배포도 고칠 것을 모아서 한 번에 하는 게 좋다.
- 구글 드라이브 연결 도구는 10MB 넘는 파일을 못 받는다. 큰 PDF는 나눠 올려 달라고 하거나 `read_file_content`로 글자만 읽는다.
- 드라이브 사진 받기: `download_file_content` 결과가 크면(약 6만 글자 이상) 하네스가 `/root/.claude/projects/<프로젝트>/<세션>/tool-results/mcp-Google_Drive-download_file_content-<숫자>.txt`(JSON `{content: base64, title, …}`)에 저장하고 경로를 알려 준다 → 알려 준 경로를 그대로 python으로 base64 풀어 저장. 작은 파일(약 45KB 이하)은 대화로 바로 들어와 저장할 수 없으니 사용자에게 채팅 첨부나 원본 크기 업로드를 부탁한다. WebP는 PIL로 jpg 변환.

## 작업 도구 (`tools/`)
저장소 루트에서 실행한다. 모두 이 클라우드 환경(Playwright 전역 설치, poppler)에서 검증했다.
- `node tools/qr.cjs <URL> <출력.svg> [L|M|Q|H]` — QR 만들기 (기본 Q). 같은 이름의 `.json`도 생긴다.
- `python3 tools/qr-check.py <qr.json>` — QR을 직접 해독해 URL 확인 (버전 3만 가능 → 안 되면 `M`으로 다시 만든다). 확인 후 `.json`은 지운다.
- `node tools/card.mjs <가게>` — `print/table-card.html` → `table-card.png`·`table-card-A6.pdf`, `table-card-A4.html`이 있으면 `table-card-A4x4.pdf`. 카드 밖으로 넘친 요소도 알려 준다. **만든 PDF는 항상 사용자에게 보낸다.**
- `node tools/sns.mjs <가게> [vi|ko…] [버튼 글자, 기본 MENU] [가게 이름]` — SNS 홍보 이미지 `print/sns-square.png`(1080×1080, 게시물·Zalo)·`sns-story.png`(1080×1920, 스토리). 메뉴판 첫 화면+QR+주소, 색은 가게 `partner-theme`. 가게 이름·종류는 `sales/content.js`의 `DEMOS`에서 가져오므로 새 가게는 DEMOS에 먼저 넣는다. 한국 매장은 `ko`, 바이오&뷰티는 `vi SHOP "Bio & Beauty"`. 기본형에 포함이라 새 가게마다 만들어 사용자에게 보낸다. QR 아래 안내 문구는 정사각형·스토리 모두 **5개 언어(베트남어·한국어·영어·중국어·일본어)를 항상 다 넣는다**(사용자 지시 2026-10-21, 예전 정사각형은 3개 언어였음 — 다른 가게는 다시 만들 때 반영).
- `node tools/check-listing.mjs` — **가게 찾기용 점검(새 가게를 만들거나 고친 뒤, 배포 전에 항상)**: 26곳 전부 하단 '가격 단위' 줄에 5개 언어 '구글 지도에 올린 메뉴판 기준' 문구가 있는지, 별도 문구 상자가 없는지, 다산 배너·가게 더 보기·방문 기록 코드가 있는지 검사. 문제가 있으면 종료 코드 1.
- `node tools/shot.mjs <가게> [ko,vi] [저장폴더]` — 휴대폰 크기 전체 화면 캡처 + 자바스크립트 오류·못 불러온 파일 확인.
- `node tools/demo.mjs <가게>` — 소개서용 데모 화면 `sales/img/demo-<가게>.jpg`. 새 가게는 `sales/content.js`의 `DEMOS`에도 추가하고 QR을 `sales/img/qr-<가게>.svg`로 복사.
- `node tools/sales-pdf.mjs` — 소개서 PDF 5개 언어. 각각 **2쪽**인지 출력해 준다 (데모가 늘면 인쇄용 `.demos` 칸 수 조정, 지금 7칸). `DEMOS`에 `hidden: true`를 붙이면 소개서에는 안 보이고 SNS 도구용 데이터로만 쓰인다.
- `node tools/mockup.mjs <가게>` — 포장재 시안 그림 `print/packaging-mockup.html` → `packaging-mockup.png`(2000×1250: 로고+QR 종이컵·배달 봉투·컵 스티커). 영업용 시안(인쇄 원고 아님). 지금은 Ăn Vội만 있음, 다른 가게는 html을 복사해 로고·문구·색만 바꾼다.
- `node tools/app-icon.mjs` — 소개서·가게 찾기 웹앱 아이콘(페이지의 주황 "QR" 로고) → `sales/icons/`(192·512·maskable·apple-touch·favicon). 웹앱 설정은 `sales/manifest.webmanifest`(소개서, 이름 QR Menu)·`sales/stores/manifest.webmanifest`(가게 찾기, 이름 QR Stores, 시작 /stores/). 가게 메뉴판에는 아직 웹앱 아이콘 없음.
- `node tools/seo.mjs` — 검색 등록 준비: 가게 `index.html` 머리에 대표 주소(canonical, `<가게>.qrmenuasia.com`)·링크 미리보기(og, 이미지는 `print/sns-square.png`)·가게 정보 JSON-LD(메뉴·가격 포함)를 `<!-- seo:start/end -->` 사이에 넣고 `robots.txt`·`sitemap.xml`을 만든다. 소개서에는 전체 사이트맵 `qrmenuasia.com/sitemap.xml`(모든 가게 포함). **메뉴·가격·주소를 고치거나 새 가게를 추가하면 다시 돌린다** (새 가게는 스크립트의 SHOPS에 추가).
- `sh tools/export.sh <출력폴더> [가게…|sales]` — 보낼 파일(print/의 PDF·PNG·qr.svg)을 `<상호>_<파일>` 이름으로 복사. 새 가게는 스크립트의 `name()`에 상호 추가.
- `node tools/pdf.mjs <입력.html> <출력.pdf>` — 점주용 가이드 등 HTML → PDF.
- `python3 -I tools/thumb.py <페이지.png> x0 y0 x1 y1 <출력.jpg>` — 카탈로그·메뉴판 페이지 그림에서 사진을 3:4로 잘라냄 (빈 곳은 배경을 흐리게 채움). 페이지 그림은 `pdftoppm -r 160 -png -f N -l N 파일.pdf 이름`으로 만든다. 투명 배경 사진은 `pdfimages -png -p`가 더 낫다.
- `.claude/agents/`: finder(찾기, haiku)·polisher(글 다듬기, sonnet)·reviewer(검토, sonnet — 정식 가게만 opus). 양 많은 찾기·번역 초안은 맡기면 메인 대화가 덜 길어진다.

