# 프로젝트 방향 (2026-10 기준)

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

- Vercel 팀 기본값이 "모든 배포 로그인 보호"라서, 새 프로젝트마다 Deployment Protection을 `prod_deployment_urls_and_all_previews`로 바꿔야 손님이 로그인 없이 열 수 있다.
- 테이블 QR 카드는 `restaurants/<가게>/print/`에 둔다: `qr.svg`(QR), `table-card.html`(A6 카드 원본), `table-card-A6.pdf`, `table-card-A4x4.pdf`(A4 한 장에 4개), `table-card.png`(300dpi). 폰트는 `public/fonts`(잘난체, G마켓 산스)를 쓴다.
- 배포 방법: Vercel MCP `create_deployment`에 `gitSource`(github, org `jinujeon05-blip`, repo `short-form`, 브랜치·커밋 sha)와 `projectSettings.rootDirectory: "restaurants/<가게>"`를 넘긴다. 먼저 커밋·푸시해야 한다. (사진 등 바이너리도 함께 배포됨)
- 사진·로고는 사장님 메뉴판 디자인 원본에서 잘라 `restaurants/<가게>/img/`에 둔다.

## 영업용 소개서
- `sales/`: 가게 사장님께 보여줄 소개서·가격표 (ko/vi/zh/ja/en). 문구·가격·연락처는 `sales/content.js`, 데모 화면·QR은 `sales/img/`, 인쇄용 PDF는 `sales/print/intro-<언어>.pdf`(A4 2쪽).
- Vercel 프로젝트 `qrmenu-intro` → https://qrmenu-intro.vercel.app
- 연락처는 아직 임시 값(`0900 000 000`)이다.
