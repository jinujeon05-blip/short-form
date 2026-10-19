# 프로젝트 방향 (2026-10 기준)

> 사용자와의 대화·보고는 **항상 한국어**로 한다.

이 저장소는 앞으로 **음식점 메뉴판 제작** 작업에 사용한다.

## 세션 규칙 (여러 세션이 같은 저장소를 이어서 쓴다)
- **시작**: SessionStart 훅(`.claude/hooks/session-start.sh`)이 최신 main을 받아 작업 브랜치를 맞추고(main에 없는 커밋이 없을 때만 fast-forward) 상태를 요약해 준다. 이 파일의 "남은 할 일"부터 확인한다. 이전 대화 내용은 모르는 게 정상이니, 사용자가 "아까 그거"라고 하면 이 파일·git log·노션 메모리에서 찾는다.
- **배포 직전**: `git fetch origin main` 후 `git merge-base --is-ancestor origin/main HEAD`로 main이 브랜치에 들어 있는지 확인한다. 아니면 `git merge origin/main` 먼저. 뒤처진 브랜치로 배포하면 다른 세션이 반영한 내용(와이파이 등)이 사이트에서 사라진다.
- **알게 된 것은 바로 기록**: 사장님 답(와이파이·가격 등), 새 가게, 새 방법·막혔던 문제의 해결법은 그때그때 이 파일에 적는다. 대화에만 남기면 다음 세션이 모른다. 해결된 "남은 할 일"은 지운다.
- **"main 머지해줘"** = 작업 브랜치로 PR을 만들어 squash 머지 → 작업 브랜치를 `origin/main`으로 리셋하고 `--force-with-lease` 푸시. 머지 전에 다른 세션의 열린 PR·브랜치와 충돌이 없는지 본다.
- **사용자 선호**: 대화는 한국어. 만든 PDF(QR 카드·소개서 등)는 항상 보낸다. **보내는 파일 이름 앞에는 반드시 가게 상호를 붙인다** (`sh tools/export.sh <스크래치폴더> <가게…>`로 `숯꾸이_table-card-A6.pdf`처럼 복사해서 보냄, 저장소 원본 이름은 그대로). 한 페이지 안에서 글꼴을 섞지 않는다. 파트너 배너 색은 메뉴판 색에 맞춘다. 컨텍스트가 70%를 넘으면 새 세션을 권한다.

## 새 QR 메뉴판을 시작할 때 (반드시)
- **항상 사용자에게 먼저 묻는다: "사장님 동의·비용을 받고 만드는 가게인가, 손님 가게 찾기용(무동의·무료)인가?"**
- **정식(사장님 동의·비용)**: 지금까지의 기본형 전부 — 장바구니·주문서(Zalo), 파트너 배너(다산 등), 테이블 QR 카드·SNS 이미지·점주 자료.
- **가게 찾기용(손님 검색용, 사장님 동의·비용 없음)**: 메뉴 보기만. **Zalo 연결·장바구니·주문서 없음**. **파트너 배너(다산 등)는 항상 넣는다**(사용자 지시 2026-10-19). 언어 선택·"가게 더 보기" 링크·검색 등록(seo)·가게 찾기 목록은 넣는다. `sales/stores/data.js`에 `listing: true`로 표시.

## 작업 범위
- 음식점별 **웹/앱(모바일 웹) 메뉴판 페이지** 제작
- 테이블에 세워둘 **QR 코드** 제작 (메뉴판 URL로 연결, 인쇄용 이미지/PDF)
- 음식점마다 **Vercel에 별도 프로젝트로 배포**

## 원칙
- 음식점 하나 = 독립된 사이트 = Vercel 프로젝트 하나
- QR 코드는 해당 음식점의 Vercel 배포 URL(또는 연결된 도메인)을 가리키도록 생성
- 메뉴 데이터(이름, 가격, 사진, 설명)는 코드와 분리해 수정이 쉽도록 관리
- 모바일 화면(휴대폰으로 QR 스캔 후 열람) 우선으로 디자인

## 참고
- 기존 폴더(`src/`, `saju/`, `rpg-demo/`, `server/` 등)는 이전 숏폼 리퍼포징 프로젝트의 산출물이다.

## 음식점 목록
| 폴더 | 가게 | Vercel 프로젝트 | 주소 (새 주소 / 기존 주소, 둘 다 열림) |
|---|---|---|---|
| `restaurants/sutkkui` | 숯꾸이 (Bắc Ninh) | `sutkkui-menu` (팀 jinwoo8) | https://sutkkui.qrmenuasia.com / sutkkui-menu.vercel.app |
| `restaurants/eros` | EROS 바 | `eros-menu` (팀 jinwoo8) | https://eros.qrmenuasia.com / eros-menu.vercel.app |
| `restaurants/anvoi` | Ăn Vội 비빔면 (Quảng Ngãi) | `anvoi-menu` (팀 jinwoo8) | https://anvoi.qrmenuasia.com / anvoi-menu.vercel.app |
| `restaurants/baekcheon` | 백천화덕아나고 (경북 경산, 한국) | `baekcheon-menu` (팀 jinwoo8) | https://baekcheon.qrmenuasia.com / baekcheon-menu.vercel.app |
| `restaurants/gamasot` | 가마솥 GAMASOT 한식당 (Hà Nội) | `gamasot-menu` (팀 jinwoo8) | https://gamasot.qrmenuasia.com / gamasot-menu.vercel.app |
| `restaurants/biobeauty` | 바이오&뷰티 (한국 화장품 할인 판매) | `biobeauty-menu` (팀 jinwoo8) | https://biobeauty.qrmenuasia.com / biobeauty-menu.vercel.app |
| `restaurants/suwonseong` | 수원성 시푸차점 SUWONSUNG (Ciputra, Hà Nội) | `suwonseong-menu` (팀 jinwoo8) | https://suwonseong.qrmenuasia.com / suwonseong-menu.vercel.app |
| `restaurants/hellochicken` | 헬로치킨 Hello Chicken Beer & Pocha (Sunshine City, Ciputra, Hà Nội) — **가게 찾기용** | `hellochicken-menu` (팀 jinwoo8) | https://hellochicken.qrmenuasia.com |

- **도메인 `qrmenuasia.com`** (2026-10-18 Vercel에서 구매, 7개 가게·소개서 프로젝트에 연결 완료, 팀 jinwoo8, 자동 갱신 켜짐, 등록자 JEON JIN WOO). 가게별 하위 주소 `<가게>.qrmenuasia.com`, 소개서·가게 찾기는 `qrmenuasia.com`. 기존 `*.vercel.app` 주소도 계속 열리므로 이미 인쇄한 QR은 그대로 둔다. 새로 인쇄하는 QR·카드·SNS·포장재부터 새 주소로.
- 검색 등록: 구글 서치 콘솔 도메인 확인용 TXT(`google-site-verification=…`)를 Vercel DNS의 qrmenuasia.com 루트에 넣음(2026-10-18). 서치 콘솔 소유권 확인 완료(도메인 속성, 하위 주소 전부 포함), 사이트맵은 `https://qrmenuasia.com/sitemap.xml` 하나만 제출하면 됨. 2026-10-18 구글·네이버 모두 소유 확인과 사이트맵 제출 완료(구글: 9개 주소 발견, 성공). 네이버 서치어드바이저는 `https://qrmenuasia.com`을 HTML 태그 방식으로 확인(태그는 `tools/seo.mjs`가 소개서 머리에 넣음). 네이버는 하위 주소를 따로 등록해야 해서, 가게 주소는 필요하면 각각 추가 등록 → 백천(`https://baekcheon.qrmenuasia.com`) 등록함, 코드는 `tools/seo.mjs` SHOPS의 `naver`. 애드센스는 사장님 반발·낮은 수익 때문에 보류(가게 찾기 페이지 방문자가 늘면 그 페이지만 재검토).
- Vercel 팀 기본값이 "모든 배포 로그인 보호"라서, 새 프로젝트마다 Deployment Protection을 `prod_deployment_urls_and_all_previews`로 바꿔야 손님이 로그인 없이 열 수 있다.
- 테이블 QR 카드는 `restaurants/<가게>/print/`에 둔다: `qr.svg`(QR), `table-card.html`(A6 카드 원본), `table-card-A6.pdf`, `table-card-A4x4.pdf`(A4 한 장에 4개), `table-card.png`(300dpi). 폰트는 `public/fonts`(잘난체, G마켓 산스)를 쓴다.
- 배포 방법: Vercel MCP `create_deployment`에 `gitSource`(github, org `jinujeon05-blip`, repo `short-form`, 브랜치·커밋 sha)와 `projectSettings.rootDirectory: "restaurants/<가게>"`를 넘긴다. 먼저 커밋·푸시해야 한다. (사진 등 바이너리도 함께 배포됨)
- 백천화덕아나고는 한국 매장이라 가격 단위가 원(KRW)이고, 메뉴에 원산지·리뷰 이벤트가 있다. 와이파이 정보는 아직 없음(`menu.js`의 `wifi: null`). QR은 버전 3에 맞추려고 오류정정 M 레벨로 만들었다.
- 가마솥은 사장님 메뉴판 PDF(12쪽)에서 `pdfimages`로 음식 사진(투명 배경)을 뽑아 크림색 배경에 얹었다. S/L 가격은 `menu.js`의 `sizes`, 시가는 `price: null`.
- 바이오&뷰티는 음식점이 아니라 화장품 할인 판매 페이지다 (센테카솔 80%·오가믹스 70%, 가격은 드라이브 전단지 기준). 상담원 2명(`menu.js`의 `contacts`: 0917 302 200 한국어+카카오톡, 0937 250 787 베트남어)에게 장바구니 주문서를 Zalo로 보낸다. 제품 사진(`img/p/<id>.jpg`, 3:4)은 카탈로그 PDF 페이지를 렌더해 잘라냈다. 제품별 효능·사용법·임상 결과는 `menu.js`의 `window.INFO`(카탈로그 원문 기준), 메뉴에서 접었다 펴는 칸으로 보인다. 소개서 데모에도 들어가 있다. 다산 배너 있음 (상담 섹션이 `<footer>`라 그 아래에 붙음).
- Vercel 비용: 메뉴판은 정적 페이지라 트래픽 비용이 거의 없고, 돈은 주로 배포할 때(Build CPU) 든다. 같은 저장소에 Git 연결된 사주 사이트 `myeongwol`(Vite)이 메뉴판 작업 브랜치 푸시마다 같이 빌드돼 비용이 났었다 → 2026-10-17 Ignored Build Step을 `[ "$VERCEL_GIT_COMMIT_REF" != "main" ]`로 바꿔 main만 빌드한다. 메뉴판 배포도 고칠 것을 모아서 한 번에 하는 게 좋다.
- 구글 드라이브 연결 도구는 10MB 넘는 파일을 못 받는다. 큰 PDF는 나눠 올려 달라고 하거나 `read_file_content`로 글자만 읽는다.
- 드라이브 사진 받기: `download_file_content` 결과가 크면(약 6만 글자 이상) 하네스가 `/root/.claude/projects/<프로젝트>/<세션>/tool-results/mcp-Google_Drive-download_file_content-<숫자>.txt`(JSON `{content: base64, title, …}`)에 저장하고 경로를 알려 준다 → 알려 준 경로를 그대로 python으로 base64 풀어 저장. 작은 파일(약 45KB 이하)은 대화로 바로 들어와 저장할 수 없으니 사용자에게 채팅 첨부나 원본 크기 업로드를 부탁한다. WebP는 PIL로 jpg 변환.
- 헬로치킨은 **가게 찾기용**(2026-10-19, 사장님 동의·비용 없음): 메뉴 보기만(주문·Zalo·QR 카드 없음), 다산 파트너 배너는 있음. 수원성 메뉴판을 바탕으로 색만 간판의 초록·노랑으로 바꿈. 원본은 드라이브 `QR메뉴판/헬로치킨`(메뉴판 사진 063~082·085, 음식 사진, zip). 주소·전화는 구글 지도 기준(사용자 제공). 사진이 작아(294×220) 분류 사진은 2:1로 잘라 씀.
- 수원성은 매장 인쇄 메뉴판 사진과 구글 지도의 디지털 메뉴판 이미지(여러 판, 일부 지워짐)를 대조해 만들었다. 공식 영문 표기는 SUWONSUNG.
- 사진·로고는 사장님 메뉴판 디자인 원본에서 잘라 `restaurants/<가게>/img/`에 둔다.

## 작업 도구 (`tools/`)
저장소 루트에서 실행한다. 모두 이 클라우드 환경(Playwright 전역 설치, poppler)에서 검증했다.
- `node tools/qr.cjs <URL> <출력.svg> [L|M|Q|H]` — QR 만들기 (기본 Q). 같은 이름의 `.json`도 생긴다.
- `python3 tools/qr-check.py <qr.json>` — QR을 직접 해독해 URL 확인 (버전 3만 가능 → 안 되면 `M`으로 다시 만든다). 확인 후 `.json`은 지운다.
- `node tools/card.mjs <가게>` — `print/table-card.html` → `table-card.png`·`table-card-A6.pdf`, `table-card-A4.html`이 있으면 `table-card-A4x4.pdf`. 카드 밖으로 넘친 요소도 알려 준다. **만든 PDF는 항상 사용자에게 보낸다.**
- `node tools/sns.mjs <가게> [vi|ko…] [버튼 글자, 기본 MENU] [가게 이름]` — SNS 홍보 이미지 `print/sns-square.png`(1080×1080, 게시물·Zalo)·`sns-story.png`(1080×1920, 스토리). 메뉴판 첫 화면+QR+주소, 색은 가게 `partner-theme`. 가게 이름·종류는 `sales/content.js`의 `DEMOS`에서 가져오므로 새 가게는 DEMOS에 먼저 넣는다. 한국 매장은 `ko`, 바이오&뷰티는 `vi SHOP "Bio & Beauty"`. 기본형에 포함이라 새 가게마다 만들어 사용자에게 보낸다.
- `node tools/shot.mjs <가게> [ko,vi] [저장폴더]` — 휴대폰 크기 전체 화면 캡처 + 자바스크립트 오류·못 불러온 파일 확인.
- `node tools/demo.mjs <가게>` — 소개서용 데모 화면 `sales/img/demo-<가게>.jpg`. 새 가게는 `sales/content.js`의 `DEMOS`에도 추가하고 QR을 `sales/img/qr-<가게>.svg`로 복사.
- `node tools/sales-pdf.mjs` — 소개서 PDF 5개 언어. 각각 **2쪽**인지 출력해 준다 (데모가 늘면 인쇄용 `.demos` 칸 수 조정, 지금 7칸). `DEMOS`에 `hidden: true`를 붙이면 소개서에는 안 보이고 SNS 도구용 데이터로만 쓰인다.
- `node tools/mockup.mjs <가게>` — 포장재 시안 그림 `print/packaging-mockup.html` → `packaging-mockup.png`(2000×1250: 로고+QR 종이컵·배달 봉투·컵 스티커). 영업용 시안(인쇄 원고 아님). 지금은 Ăn Vội만 있음, 다른 가게는 html을 복사해 로고·문구·색만 바꾼다.
- `node tools/app-icon.mjs` — 소개서·가게 찾기 웹앱 아이콘(페이지의 주황 "QR" 로고) → `sales/icons/`(192·512·maskable·apple-touch·favicon). 웹앱 설정은 `sales/manifest.webmanifest`(소개서, 이름 QR Menu)·`sales/stores/manifest.webmanifest`(가게 찾기, 이름 QR Stores, 시작 /stores/). 가게 메뉴판에는 아직 웹앱 아이콘 없음.
- `node tools/seo.mjs` — 검색 등록 준비: 가게 `index.html` 머리에 대표 주소(canonical, `<가게>.qrmenuasia.com`)·링크 미리보기(og, 이미지는 `print/sns-square.png`)·가게 정보 JSON-LD(메뉴·가격 포함)를 `<!-- seo:start/end -->` 사이에 넣고 `robots.txt`·`sitemap.xml`을 만든다. 소개서에는 전체 사이트맵 `qrmenuasia.com/sitemap.xml`(모든 가게 포함). **메뉴·가격·주소를 고치거나 새 가게를 추가하면 다시 돌린다** (새 가게는 스크립트의 SHOPS에 추가).
- `sh tools/export.sh <출력폴더> [가게…|sales]` — 보낼 파일(print/의 PDF·PNG·qr.svg)을 `<상호>_<파일>` 이름으로 복사. 새 가게는 스크립트의 `name()`에 상호 추가.
- `node tools/pdf.mjs <입력.html> <출력.pdf>` — 점주용 가이드 등 HTML → PDF.
- `python3 -I tools/thumb.py <페이지.png> x0 y0 x1 y1 <출력.jpg>` — 카탈로그·메뉴판 페이지 그림에서 사진을 3:4로 잘라냄 (빈 곳은 배경을 흐리게 채움). 페이지 그림은 `pdftoppm -r 160 -png -f N -l N 파일.pdf 이름`으로 만든다. 투명 배경 사진은 `pdfimages -png -p`가 더 낫다.
- `.claude/agents/`: finder(찾기, haiku)·polisher(글 다듬기, sonnet)·reviewer(검토, opus). 양 많은 찾기·번역 초안은 맡기면 메인 대화가 덜 길어진다.

## 남은 할 일 (사장님·사용자 답 기다리는 중)
- **EROS**: 전화번호·와이파이가 임시 값(`0900 000 000`, `EROS`/`00000000`) → 실제 값으로 교체. 잭다니엘 가격(메뉴판 두 장이 3,000k/2,500k로 다름, 지금 3,000k).
- **가마솥**: 보신(개고기) 메뉴를 외국어 화면에도 보일지. 사진 4장 짝이 맞는지.
- **백천화덕아나고**: 와이파이(`wifi: null`), 영업시간.
- **Ăn Vội**: 와이파이(`wifi: null`).
- **바이오&뷰티**: 두 번째 연락처 0937 250 787을 "베트남어 상담"으로 표시함 — 맞는지. 가격은 드라이브 전단지 기준이라 바뀌면 `menu.js`의 `was`/`price` 수정.
- **수원성**: 와이파이(`wifi: null`). 제육볶음 가격(인쇄본 400,000에 취소선, 디지털판 220,000 → 지금 220,000). 회냉면·갈비탕(디지털판에서 빠짐, 갈비탕은 뺐음)·새우구이·양념닭발·마늘치킨(최근 디지털판에서 지워져 뺐음)이 지금도 파는지.
- **장바구니 Zalo 주문**: 지금은 5곳 모두 꺼 둠(`menu.js`의 `window.ORDER.zalo: null`, 직원에게 보여주기만). 숯꾸이·가마솥·수원성은 사장님이 원하시면 주석에 적힌 번호로 켜기. EROS는 실제 번호를 받으면 켜기. 백천은 한국 매장이라 카카오톡 채널이 있으면 연결 검토.
- **헬로치킨**(가게 찾기용): 추가 주문 '어묵' 가격이 메뉴판 두 장에서 100K/80K로 다름(지금 100K). 영업시간(구글 지도: 자정까지).
- 답을 받으면 해당 `menu.js`만 고치고 커밋·푸시 → 그 가게만 다시 배포 → 이 목록에서 지운다.

## 언어 선택 드롭다운 (모든 메뉴판·소개서·가게 찾기)
- 화면 오른쪽 위 버튼 하나(현재 언어 국기+이름) → 누르면 국기와 함께 5개 언어가 펼쳐진다. 바깥 클릭·Esc로 닫힘, 위아래 화살표로 이동.
- 원본 `restaurants/_shared/lang-menu.js` 하나. 페이지의 기존 `#langs` 버튼은 숨기고 고른 언어의 버튼을 대신 눌러 주므로, 페이지별 언어 코드는 그대로 둔다. 국기는 SVG(윈도우는 국기 이모지가 글자로 보임).
- 고친 뒤 `restaurants/_shared/sync-lang.sh`로 7개 가게와 `sales/`(소개서·가게 찾기 공용)에 복사하고 모두 다시 배포한다. 새 가게는 SHOPS에 넣는다.

## 장바구니 · 주문서 (모든 메뉴판)
- 메뉴마다 "+ 담기" 버튼(S/L·한 마리/반 마리·후식 가격은 버튼이 따로) → 아래쪽 장바구니 막대 → 주문서: 수량 조절, 테이블 번호, 요청사항, **직원에게 보여주기**(직원 언어로 크게, 손님 언어는 작게), Zalo로 보내기(주문서 복사 후 zalo.me 열기).
- 원본 `restaurants/_shared/order.js` 하나. 고친 뒤 `restaurants/_shared/sync-order.sh`로 복사하고 다시 배포한다. 대상: 숯꾸이·EROS·가마솥·수원성·백천 (Ăn Vội·바이오&뷰티는 자체 장바구니가 따로 있음).
- 가게 설정은 `menu.js`의 `window.ORDER = { staff, currency, zalo }` — `staff`는 주문서 언어(베트남 매장 `vi`, 백천 `ko`), `zalo: null`이면 Zalo 버튼 숨김.
- 각 가게 `index.html`은 손대지 않는다. `#menu > section`(MENU 순서) `> ul > li`(items 순서)에 버튼을 붙이므로, 메뉴 화면 구조를 바꿀 때 이 순서를 지킨다. 시가(`price: null`)는 합계에서 빼고 "시가 메뉴 별도"로 표시.
- 테이블 번호: QR 주소에 `?t=5`를 붙이면 주문서에 자동으로 들어간다 (테이블별 QR을 만들 때 사용).
- 장바구니는 휴대폰에 6시간 저장된다(언어를 바꿔도 유지, 다음 방문 때는 비어 있음).

## 다산(DASAN) 파트너 배너
- 사용자가 베트남 파트너와 하는 인력공급 회사 다산(https://dasanhr.com) 배너를 메뉴판 맨 아래(footer 다음)에 넣는다. 대상: 숯꾸이·EROS·Ăn Vội·가마솥·바이오&뷰티·수원성·헬로치킨 (백천화덕아나고는 한국 매장이라 다산 대신 JS welink). **가게 찾기용 메뉴판에도 항상 넣는다.**
- 원본은 `restaurants/_shared/dasan.js`·`dasan-logo.png` 하나뿐이다. 고친 뒤 `restaurants/_shared/sync-dasan.sh`로 각 가게 폴더에 복사하고 가게마다 다시 배포한다 (Vercel 루트가 가게 폴더라 공통 폴더를 직접 못 씀).
- 언어별: ko/en/zh/ja는 기업 의뢰(dasanhr.com/ko/business, 0917 302 200), vi는 구직자용(dasanhr.com/vi, Zalo 0937 250 787). `<html lang>`이 바뀌면 문구도 따라 바뀐다.
- 새 가게는 (정식·가게 찾기용 모두) `sync-dasan.sh`의 SHOPS에 넣는다.
- 배너 색은 가게 `index.html`의 `<style id="partner-theme">`(`--pt-mode`·`--pt-bg`·`--pt-ink`·`--pt-muted`·`--pt-line`·`--pt-accent`·`--pt-btn`·`--pt-btn-ink`·`--pt-shadow`)로 메뉴판 색에 맞춘다. 회사 색은 로고에만 남긴다. `--pt-mode: dark`면 흰 로고(`dasan-logo-white.png`, `jswelink-logo-dark.png`), light면 컬러 로고(`dasan-logo.png`, `jswelink-logo-light.png`). 새 가게에도 이 블록을 넣는다.

## JS welink 파트너 배너
- 제이에스 위링크(https://www.jswelink.co.kr, 베트남 인력·유학생 한국 송입) 배너. 대상: 백천화덕아나고만 (한국 매장).
- 원본 `restaurants/_shared/jswelink.js`·`jswelink-logo-dark.png`·`jswelink-logo-light.png`, 문구·주소는 jswelink 배너 키트 그대로. 고친 뒤 `restaurants/_shared/sync-jswelink.sh`로 복사하고 다시 배포.
- 언어별 이동: vi → jswelink.co.kr/en/ (베트남어판), 나머지 → jswelink.co.kr. 다산 배너가 있는 가게에 넣으면 다산 배너 아래에 붙는다.

## 영업용 소개서
- `sales/`: 가게 사장님께 보여줄 소개서·가격표 (ko/vi/zh/ja/en). 문구·가격·연락처는 `sales/content.js`, 데모 화면·QR은 `sales/img/`, 인쇄용 PDF는 `sales/print/intro-<언어>.pdf`(A4 2쪽).
- Vercel 프로젝트 `qrmenu-intro` → https://qrmenuasia.com (www는 여기로 이동, 기존 https://qrmenu-intro.vercel.app 도 열림)
- "함께 드리는 것" 섹션(`#kit`)은 숯꾸이 예시 그림 `sales/img/kit-a6.jpg`·`kit-a4.jpg`·`kit-sns-square.jpg`·`kit-sns-story.jpg`를 쓴다.
- 소개서는 페이지 전체를 기기 기본 글꼴 하나로 통일한다. 잘난체·G마켓 산스에는 베트남어 성조 글자가 없어, 쓰면 베트남어에서 글꼴이 섞인다.
- 연락처: 전화·Zalo 0917 302 200, 카카오톡 jjw4164

## 가게 찾기 페이지 (손님용)
- https://qrmenuasia.com/stores/ (`sales/stores/`, 소개서와 같은 Vercel 프로젝트). 소개서 데모 칸 아래 링크로 연결됨.
- 가게 목록·지역·종류·태그·화면 문구(5개 언어)는 `sales/stores/data.js` 하나에 있다. 사진은 소개서와 같은 `sales/img/demo-<가게>.jpg`.
- 검색은 모든 언어의 이름·종류·지역·주소와 `keywords`(화면에 안 보임, 요리 이름 등)를 대상으로 하고 베트남어 성조를 무시한다 ("an voi" → Ăn Vội). 조건은 주소창(`?q=&region=&cat=`)에 남아 링크로 공유된다.
- 각 가게 메뉴판 맨 아래(파트너 배너 다음)에 "QR 메뉴판 가게 더 보기" 링크가 있다. 원본은 `restaurants/_shared/stores-link.js` 하나, 고친 뒤 `restaurants/_shared/sync-stores.sh`로 복사하고 가게마다 다시 배포한다. 메뉴판 언어를 따라 문구와 `?lang=`이 바뀌고, 색은 가게 `partner-theme`(`--pt-*`)를 따른다.
- 새 가게는 사장님 동의를 받고 `STORES`에 추가한다. 목록에 넣은 가게는 `sync-stores.sh`의 SHOPS에도 넣는다. 지역·종류가 새로 생기면 `REGIONS`·`CATS`에도 넣는다. 15~20곳이 넘으면 지역을 나라/도시 두 단계로 나누는 것을 검토한다.

## 점주용 자료
- Ăn Vội: `restaurants/anvoi/print/huong-dan-su-dung.pdf` (베트남어 사용설명서·주문 처리 순서, A4 2쪽, 원본 `huong-dan.html`, 화면 캡처 `print/img/g*.jpg`). 다른 가게도 같은 형식으로 만든다.
- 가마솥: `restaurants/gamasot/print/guide-gamasot.pdf` (한국어 활용 가이드북, A4 3쪽: 손님 화면·기능별 좋은 점·상황별 활용·링크 문구·수정 방법, 원본 `guide.html`, 캡처 `print/img/g*.jpg`).
- Ăn Vội 메뉴판에는 장바구니 + Zalo 주문 기능이 있다 (주문서는 항상 베트남어로 작성).
