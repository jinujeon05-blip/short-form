# 프로젝트 방향 (2026-10 기준)

> 사용자와의 대화·보고는 **항상 한국어**로 한다.

이 저장소는 앞으로 **음식점 메뉴판 제작** 작업에 사용한다.

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
| 폴더 | 가게 | Vercel 프로젝트 | 주소 |
|---|---|---|---|
| `restaurants/sutkkui` | 숯꾸이 (Bắc Ninh) | `sutkkui-menu` (팀 jinwoo8) | https://sutkkui-menu.vercel.app |
| `restaurants/eros` | EROS 바 | `eros-menu` (팀 jinwoo8) | https://eros-menu.vercel.app |
| `restaurants/anvoi` | Ăn Vội 비빔면 (Quảng Ngãi) | `anvoi-menu` (팀 jinwoo8) | https://anvoi-menu.vercel.app |
| `restaurants/baekcheon` | 백천화덕아나고 (경북 경산, 한국) | `baekcheon-menu` (팀 jinwoo8) | https://baekcheon-menu.vercel.app |
| `restaurants/gamasot` | 가마솥 GAMASOT 한식당 (Hà Nội) | `gamasot-menu` (팀 jinwoo8) | https://gamasot-menu.vercel.app |
| `restaurants/biobeauty` | 바이오&뷰티 (한국 화장품 할인 판매) | `biobeauty-menu` (팀 jinwoo8) | https://biobeauty-menu.vercel.app |

- Vercel 팀 기본값이 "모든 배포 로그인 보호"라서, 새 프로젝트마다 Deployment Protection을 `prod_deployment_urls_and_all_previews`로 바꿔야 손님이 로그인 없이 열 수 있다.
- 테이블 QR 카드는 `restaurants/<가게>/print/`에 둔다: `qr.svg`(QR), `table-card.html`(A6 카드 원본), `table-card-A6.pdf`, `table-card-A4x4.pdf`(A4 한 장에 4개), `table-card.png`(300dpi). 폰트는 `public/fonts`(잘난체, G마켓 산스)를 쓴다.
- 배포 방법: Vercel MCP `create_deployment`에 `gitSource`(github, org `jinujeon05-blip`, repo `short-form`, 브랜치·커밋 sha)와 `projectSettings.rootDirectory: "restaurants/<가게>"`를 넘긴다. 먼저 커밋·푸시해야 한다. (사진 등 바이너리도 함께 배포됨)
- 백천화덕아나고는 한국 매장이라 가격 단위가 원(KRW)이고, 메뉴에 원산지·리뷰 이벤트가 있다. 와이파이 정보는 아직 없음(`menu.js`의 `wifi: null`). QR은 버전 3에 맞추려고 오류정정 M 레벨로 만들었다.
- 가마솥은 사장님 메뉴판 PDF(12쪽)에서 `pdfimages`로 음식 사진(투명 배경)을 뽑아 크림색 배경에 얹었다. S/L 가격은 `menu.js`의 `sizes`, 시가는 `price: null`.
- 바이오&뷰티는 음식점이 아니라 화장품 할인 판매 페이지다 (센테카솔 80%·오가믹스 70%, 가격은 드라이브 전단지 기준). 상담원 2명(`menu.js`의 `contacts`: 0917 302 200 한국어+카카오톡, 0937 250 787 베트남어)에게 장바구니 주문서를 Zalo로 보낸다. 제품 사진(`img/p/<id>.jpg`, 3:4)은 카탈로그 PDF 페이지를 렌더해 잘라냈다. 제품별 효능·사용법·임상 결과는 `menu.js`의 `window.INFO`(카탈로그 원문 기준), 메뉴에서 접었다 펴는 칸으로 보인다. 소개서 데모에도 들어가 있다. 다산 배너 있음 (상담 섹션이 `<footer>`라 그 아래에 붙음).
- Vercel 비용: 메뉴판은 정적 페이지라 트래픽 비용이 거의 없고, 돈은 주로 배포할 때(Build CPU) 든다. 같은 저장소에 Git 연결된 사주 사이트 `myeongwol`(Vite)이 메뉴판 작업 브랜치 푸시마다 같이 빌드돼 비용이 났었다 → 2026-10-17 Ignored Build Step을 `[ "$VERCEL_GIT_COMMIT_REF" != "main" ]`로 바꿔 main만 빌드한다. 메뉴판 배포도 고칠 것을 모아서 한 번에 하는 게 좋다.
- 구글 드라이브 연결 도구는 10MB 넘는 파일을 못 받는다. 큰 PDF는 나눠 올려 달라고 하거나 `read_file_content`로 글자만 읽는다.
- 사진·로고는 사장님 메뉴판 디자인 원본에서 잘라 `restaurants/<가게>/img/`에 둔다.

## 작업 도구 (`tools/`)
저장소 루트에서 실행한다. 모두 이 클라우드 환경(Playwright 전역 설치, poppler)에서 검증했다.
- `node tools/qr.cjs <URL> <출력.svg> [L|M|Q|H]` — QR 만들기 (기본 Q). 같은 이름의 `.json`도 생긴다.
- `python3 tools/qr-check.py <qr.json>` — QR을 직접 해독해 URL 확인 (버전 3만 가능 → 안 되면 `M`으로 다시 만든다). 확인 후 `.json`은 지운다.
- `node tools/card.mjs <가게>` — `print/table-card.html` → `table-card.png`·`table-card-A6.pdf`, `table-card-A4.html`이 있으면 `table-card-A4x4.pdf`. 카드 밖으로 넘친 요소도 알려 준다. **만든 PDF는 항상 사용자에게 보낸다.**
- `node tools/shot.mjs <가게> [ko,vi] [저장폴더]` — 휴대폰 크기 전체 화면 캡처 + 자바스크립트 오류·못 불러온 파일 확인.
- `node tools/demo.mjs <가게>` — 소개서용 데모 화면 `sales/img/demo-<가게>.jpg`. 새 가게는 `sales/content.js`의 `DEMOS`에도 추가하고 QR을 `sales/img/qr-<가게>.svg`로 복사.
- `node tools/sales-pdf.mjs` — 소개서 PDF 5개 언어. 각각 **2쪽**인지 출력해 준다 (데모가 늘면 인쇄용 `.demos` 칸 수 조정).
- `node tools/pdf.mjs <입력.html> <출력.pdf>` — 점주용 가이드 등 HTML → PDF.
- `python3 -I tools/thumb.py <페이지.png> x0 y0 x1 y1 <출력.jpg>` — 카탈로그·메뉴판 페이지 그림에서 사진을 3:4로 잘라냄 (빈 곳은 배경을 흐리게 채움). 페이지 그림은 `pdftoppm -r 160 -png -f N -l N 파일.pdf 이름`으로 만든다. 투명 배경 사진은 `pdfimages -png -p`가 더 낫다.
- `.claude/agents/`: finder(찾기, haiku)·polisher(글 다듬기, sonnet)·reviewer(검토, opus). 양 많은 찾기·번역 초안은 맡기면 메인 대화가 덜 길어진다.

## 남은 할 일 (사장님·사용자 답 기다리는 중)
- **EROS**: 전화번호·와이파이가 임시 값(`0900 000 000`, `EROS`/`00000000`) → 실제 값으로 교체. 잭다니엘 가격(메뉴판 두 장이 3,000k/2,500k로 다름, 지금 3,000k).
- **가마솥**: 와이파이(`wifi: null`). 보신(개고기) 메뉴를 외국어 화면에도 보일지. 사진 4장 짝이 맞는지.
- **백천화덕아나고**: 와이파이(`wifi: null`), 영업시간.
- **Ăn Vội**: 와이파이(`wifi: null`).
- **바이오&뷰티**: 두 번째 연락처 0937 250 787을 "베트남어 상담"으로 표시함 — 맞는지. 가격은 드라이브 전단지 기준이라 바뀌면 `menu.js`의 `was`/`price` 수정.
- 답을 받으면 해당 `menu.js`만 고치고 커밋·푸시 → 그 가게만 다시 배포 → 이 목록에서 지운다.

## 다산(DASAN) 파트너 배너
- 사용자가 베트남 파트너와 하는 인력공급 회사 다산(https://dasanhr.com) 배너를 메뉴판 맨 아래(footer 다음)에 넣는다. 대상: 숯꾸이·EROS·Ăn Vội·가마솥·바이오&뷰티 (백천화덕아나고는 한국 매장이라 제외).
- 원본은 `restaurants/_shared/dasan.js`·`dasan-logo.png` 하나뿐이다. 고친 뒤 `restaurants/_shared/sync-dasan.sh`로 각 가게 폴더에 복사하고 가게마다 다시 배포한다 (Vercel 루트가 가게 폴더라 공통 폴더를 직접 못 씀).
- 언어별: ko/en/zh/ja는 기업 의뢰(dasanhr.com/ko/business, 0917 302 200), vi는 구직자용(dasanhr.com/vi, Zalo 0937 250 787). `<html lang>`이 바뀌면 문구도 따라 바뀐다.
- 새 가게를 추가할 때 사장님 동의를 받으면 `sync-dasan.sh`의 SHOPS에 넣는다.
- 배너 색은 가게 `index.html`의 `<style id="partner-theme">`(`--pt-mode`·`--pt-bg`·`--pt-ink`·`--pt-muted`·`--pt-line`·`--pt-accent`·`--pt-btn`·`--pt-btn-ink`·`--pt-shadow`)로 메뉴판 색에 맞춘다. 회사 색은 로고에만 남긴다. `--pt-mode: dark`면 흰 로고(`dasan-logo-white.png`, `jswelink-logo-dark.png`), light면 컬러 로고(`dasan-logo.png`, `jswelink-logo-light.png`). 새 가게에도 이 블록을 넣는다.

## JS welink 파트너 배너
- 제이에스 위링크(https://www.jswelink.co.kr, 베트남 인력·유학생 한국 송입) 배너. 대상: 백천화덕아나고만 (한국 매장).
- 원본 `restaurants/_shared/jswelink.js`·`jswelink-logo-dark.png`·`jswelink-logo-light.png`, 문구·주소는 jswelink 배너 키트 그대로. 고친 뒤 `restaurants/_shared/sync-jswelink.sh`로 복사하고 다시 배포.
- 언어별 이동: vi → jswelink.co.kr/en/ (베트남어판), 나머지 → jswelink.co.kr. 다산 배너가 있는 가게에 넣으면 다산 배너 아래에 붙는다.

## 영업용 소개서
- `sales/`: 가게 사장님께 보여줄 소개서·가격표 (ko/vi/zh/ja/en). 문구·가격·연락처는 `sales/content.js`, 데모 화면·QR은 `sales/img/`, 인쇄용 PDF는 `sales/print/intro-<언어>.pdf`(A4 2쪽).
- Vercel 프로젝트 `qrmenu-intro` → https://qrmenu-intro.vercel.app
- 소개서는 페이지 전체를 기기 기본 글꼴 하나로 통일한다. 잘난체·G마켓 산스에는 베트남어 성조 글자가 없어, 쓰면 베트남어에서 글꼴이 섞인다.
- 연락처: 전화·Zalo 0917 302 200, 카카오톡 jjw4164

## 점주용 자료
- Ăn Vội: `restaurants/anvoi/print/huong-dan-su-dung.pdf` (베트남어 사용설명서·주문 처리 순서, A4 2쪽, 원본 `huong-dan.html`, 화면 캡처 `print/img/g*.jpg`). 다른 가게도 같은 형식으로 만든다.
- 가마솥: `restaurants/gamasot/print/guide-gamasot.pdf` (한국어 활용 가이드북, A4 3쪽: 손님 화면·기능별 좋은 점·상황별 활용·링크 문구·수정 방법, 원본 `guide.html`, 캡처 `print/img/g*.jpg`).
- Ăn Vội 메뉴판에는 장바구니 + Zalo 주문 기능이 있다 (주문서는 항상 베트남어로 작성).
