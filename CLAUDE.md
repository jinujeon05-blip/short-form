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
| `restaurants/suwonseong` | 수원성 시푸차점 SUWONSUNG (Ciputra, Hà Nội) — **가게 찾기용**(사용자 확인 2026-10-20, 장바구니는 그대로 둠) | `suwonseong-menu` (팀 jinwoo8) | https://suwonseong.qrmenuasia.com / suwonseong-menu.vercel.app |
| `restaurants/hellochicken` | 헬로치킨 Hello Chicken Beer & Pocha (Sunshine City, Ciputra, Hà Nội) — **가게 찾기용** | `hellochicken-menu` (팀 jinwoo8) | https://hellochicken.qrmenuasia.com |
| `restaurants/kyodong` | 교동치킨 Kyodong Chicken (Sunshine City, Ciputra, Hà Nội) — **가게 찾기용** | `kyodong-menu` (팀 jinwoo8) | https://kyodong.qrmenuasia.com |
| `restaurants/choongman` | 충만치킨 Choong Man Chicken (S3 SH01 Sunshine City, Hà Nội) — **가게 찾기용** | `choongman-menu` (팀 jinwoo8) | https://choongman.qrmenuasia.com |
| `restaurants/youone` | 유원핫도그 Youone Hotdog (Tòa S1, Sunshine City, Hà Nội) — **가게 찾기용** | `youone-menu` (팀 jinwoo8) | https://youone.qrmenuasia.com |
| `restaurants/kimshotel` | 킴스호텔 Kim's Hotel (Bắc Ninh) — **정식(사장님 의뢰)**, 객실 안내 + 1층 한식당 | `kimshotel-menu` (팀 jinwoo8) | https://kimshotel.qrmenuasia.com |
| `restaurants/jokbal` | 족발신선생 박닌점 Jokbal Sinseonsaeng (195 Ngọc Hân Công Chúa, Bắc Ninh) — **가게 찾기용** | `jokbal-menu` (팀 jinwoo8) | https://jokbal.qrmenuasia.com |
| `restaurants/daekuk` | 대국 NHÀ HÀNG DAEKUK (16 Bùi Thị Xuân, Bắc Ninh) — **가게 찾기용** | `daekuk-menu` (팀 jinwoo8) | https://daekuk.qrmenuasia.com |
| `restaurants/boknara` | 복나라 NHÀ HÀNG BOKNARA 복어·활어회 (Ngọc Hân Công Chúa, Bắc Ninh) — **가게 찾기용** | `boknara-menu` (팀 jinwoo8) | https://boknara.qrmenuasia.com |
| `restaurants/chibaengi` | 치뱅이 박닌본점 GOLBAENGI CHICKEN 치킨·골뱅이 호프 (16 Ngọc Hân Công Chúa, Bắc Ninh) — **정식(사장님 의뢰)**, 장바구니·Zalo 주문·QR 카드 | `chibaengi-menu` (팀 jinwoo8) | https://chibaengi.qrmenuasia.com |
| `restaurants/samwon` | 삼원 박닌점 NHÀ HÀNG SAMWON 숯불구이 (1 Ngọc Hân Công Chúa, Bắc Ninh) — **가게 찾기용** | `samwon-menu` (팀 jinwoo8) | https://samwon.qrmenuasia.com |
| `restaurants/bangatgan` | 방앗간 박닌 본점 BANG A GAN Korean Pocha (20N3 Ngọc Hân Công Chúa, Bắc Ninh) — **가게 찾기용** | `bangatgan-menu` (팀 jinwoo8) | https://bangatgan.qrmenuasia.com |
| `restaurants/chuam` | 추암 Choo Am 약선요리식당 (Lô 1N3 Hoàng Hoa Thám, Bắc Ninh) — **가게 찾기용** | `chuam-menu` (팀 jinwoo8) | https://chuam.qrmenuasia.com |
| `restaurants/eonnine` | 언니네 Chị ơi 국수·김밥·손만두·안주 (9 Đ. Hoàng Hoa Thám, Bắc Ninh) — **가게 찾기용** | `eonnine-menu` (팀 jinwoo8) | https://eonnine.qrmenuasia.com |
| `restaurants/ureong` | 우렁쌈밥 韓式包飯 (220 Đ. Hoàng Hoa Thám, Bắc Ninh) — **가게 찾기용** | `ureong-menu` (팀 jinwoo8) | https://ureong.qrmenuasia.com |
| `restaurants/goodday` | 굿데이 김밥 Good Day Kimbap 김밥·떡볶이·쫄면 (Sunshine City, Ciputra, Hà Nội) — **가게 찾기용** | `goodday-menu` (팀 jinwoo8) | https://goodday.qrmenuasia.com |
| `restaurants/lacherie` | La Cherie Coffee 카페·빙수 (Sunshine City, Ciputra, Hà Nội — 굿데이 김밥 위층) — **가게 찾기용** | `lacherie-menu` (팀 jinwoo8) | https://lacherie.qrmenuasia.com |
| `restaurants/snackshack` | Snack Shack 스포츠 바·버거·타코·수제맥주·키즈 놀이방 (Shophouse A5-11, Sunshine City, Ciputra, Hà Nội) — **가게 찾기용** | `snackshack-menu` (팀 jinwoo8) | https://snackshack.qrmenuasia.com |

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
- 교동치킨은 **가게 찾기용**(2026-10-19): 헬로치킨 페이지를 복사해 색을 로고·메뉴판의 청록·빨강으로 바꿈. 원본은 드라이브 `교동치킨 시푸차` 폴더(구글 지도 캡처 28장). 메뉴는 가게가 최근 올린 메뉴판(신메뉴 포함) 기준, 2년 전 메뉴판은 안 씀. 주소·전화는 구글 지도 기준(Mặt sau tòa S6, 0949 495 006, 오후 11시 종료). 사진은 `img/`(분류 사진 900×600, `logo.jpg`).
- 충만치킨은 **가게 찾기용**(2026-10-19): 교동치킨 페이지를 복사해 메뉴판의 짙은 청록 + 로고 주황으로 바꿈. 원본은 드라이브 `충만치킨 션샤인` 폴더(구글 지도 캡처 14장: 메뉴판 9면·홍보 사진·매장 정보). 주소·전화는 구글 지도 기준(S3 SH01, 0336 562 936, 오후 11시 종료·주방 10시 30분). 가격은 부가세 별도. 분류 사진은 메뉴판의 접시 사진 3개를 동그랗게 잘라 한 장으로 붙임(`img/`, 900×450), `chicken.jpg`·`store.jpg`·`logo.jpg`는 홍보 사진에서 잘라냄.
- 유원핫도그는 **가게 찾기용**(2026-10-19): 충만치킨 페이지를 복사해 간판의 파랑 + 주황으로 바꿈. 원본은 드라이브 `유원핫도그 션샤인` 폴더(구글 지도 캡처 28장). 메뉴 이름·설명은 구글 지도 메뉴 탭(가격 없음), 가격은 손님이 올린 매장 메뉴판 사진 두 장(11개월 전·1년 전)에서 읽어 화질이 낮음 → 음료·사이드 일부는 추정. 전화번호 없음, 영업 오후 9시 30분까지. 로고는 간판 사진에서 잘라냄.
- 킴스호텔은 **정식**(2026-10-19 사장님 의뢰, 고급스럽게): 명함의 짙은 남색 + 금색으로 새로 디자인(`index.html` 직접 작성, 글꼴은 기기 기본 하나). 위쪽 로고는 금색 글씨 `img/wordmark.png`(KIM’S / HOTEL, 서버 글꼴 Bitstream Charter를 Playwright로 투명 PNG 렌더 — 사용자 요청으로 명함 엠블럼 대신, 2026-10-19). 외부 글꼴 다운로드는 네트워크가 막혀 안 됨. 객실(`menu.js`의 `window.ROOMS`, `#menu` 밖이라 장바구니 없음, Zalo·전화 예약 문의)과 1층 한식당(`window.MENU`, 장바구니 + Zalo 주문, 주문서 '테이블 번호'를 '객실·테이블 번호'로 바꿈 → QR에 `?t=305` 붙이면 객실 번호 자동). 원본은 드라이브 `Kims hotel` 폴더(숙박비 안내문 2025-01-01: 1인실 800k·1인실 대형 900k·2인실 1,200k, 조식·세탁 포함 / 명함: Kim Si Hyung, 034 742 0256, Lô 13 Đ. Hoàng Hoa Thám, P. Võ Cường, T. Bắc Ninh / 카톡 메뉴: 칼국수·수제비·칼제비 150k, 손만두·손만두국 180k). 가게 찾기에 종류 `hotel` 새로 추가. 소개서 데모 칸에 들어감(2026-10-20, 수원성 대신).
- 족발신선생 박닌점은 **가게 찾기용**(2026-10-21): 유원핫도그 페이지를 복사해 간판의 검정 + 빨강으로 바꿈. 원본은 드라이브 `족발신선생 박닌점` 폴더(구글 지도 캡처 31장, 보조 에이전트가 읽어 정리). 가게 계정 디지털 메뉴판과 2년 전 손님 사진의 가격이 같음(가격이 2년 이상 됐을 수 있음). 주소·전화는 구글 지도(195 Ngọc Hân Công Chúa, 0328 561 918, 오전 11시 영업 시작, 마감 시간 모름). 로고는 길거리 간판 사진(저화질)에서 잘라냄.
- 대국(DAEKUK)은 **가게 찾기용**(2026-10-21): 족발신선생 페이지를 복사해 메뉴책의 갈색 + 로고 주황으로 바꿈. 원본은 드라이브 `대국 박닌` 폴더(구글 지도 캡처 26장, 가게 계정이 2개월 전 올린 메뉴책 21면, 보조 에이전트가 읽어 정리). 로고는 지도 아이콘(45px)뿐이라 주황 원 + DAEKUK + 네 고리 문양으로 다시 그림(`img/logo.png`, Playwright 렌더). 주소는 구글 지도, 전화·마감 시간 없음, 웹사이트 daekukbbq.com.
- 복나라(BOKNARA)는 **가게 찾기용**(2026-10-21): 대국 페이지를 복사해 간판의 적갈색 + 금색으로 바꿈. 원본은 드라이브 `복나라` 폴더(구글 지도 손님 사진: 복 요리·SET 11개월 전, 해산물·회 2년 전, 음료 3년 전 → 가격이 오래됐을 수 있음, 보조 에이전트가 읽어 정리). 메뉴판이 한국어뿐이라 다른 언어는 번역. 로고는 간판 사진이 지저분해 🐡 + "복나라"(잘난체)로 다시 그림(`img/logo.png`, Playwright 렌더). 가격은 부가세 별도.
- 치뱅이는 **정식**(2026-10-21 사장님 의뢰: QR 카드·Zalo 주문·주문서): 수원성 페이지(장바구니 포함)를 복사해 간판의 빨강 + 검정으로 바꿈, 글꼴은 기기 기본 하나. 원본은 드라이브 `치뱅이 박닌본점` 폴더(구글 지도 캡처 16장, 가게 계정이 올린 7개월 전 메뉴책 9쪽 기준, 보조 에이전트가 읽어 정리). 로고는 홍보 카드의 닭 엠블럼(GOLBAENGI CHICKEN)을 3배 키움(`img/logo.png`). 분류 사진은 메뉴책 사진을 2:1로 자르거나 두 장을 붙임. 가격 부가세 10% 별도. 주문서 언어 베트남어, Zalo는 가게 전화 0967 291 230. QR 카드 `print/`(사진 4장 `print/img/c-*.jpg`), SNS 이미지 vi. 소개서 `DEMOS`에는 `hidden: true`로만 넣음(데모 7칸 유지).
- 삼원 박닌점은 **가게 찾기용**(2026-10-21): 복나라 페이지를 복사해 간판의 짙은 남색 + 주황빛 노랑으로 바꿈. 명조·Georgia 글꼴을 빼고 기기 기본 글꼴 하나로 통일(수원성에서 복사한 가게 8곳 — 수원성·헬로치킨·교동·충만·유원·족발·대국·복나라 — 도 2026-10-21 같은 방식으로 고쳐 다시 배포함). 원본은 드라이브 `삼원 박닌점` 폴더(구글 지도 캡처 11장, 모두 손님 사진, 보조 에이전트가 읽어 정리). 메뉴는 손님이 1년 전 올린 메뉴판 한 장(01~42번) 기준. 로고는 야간 간판의 연두색 원 손가락 엠블럼을 동그랗게 잘라냄(`img/logo.png`, 124px 원본이라 흐림). 와이파이는 비밀번호만(`ssid: ""` → "Wi-Fi"로 표시, 이 가게 index.html만 고침). 공기밥은 `price: 0` → "무료"로 표시(UI `free`).
- 방앗간(BANG A GAN)은 **가게 찾기용**(2026-10-21): 삼원 페이지를 복사해 로고의 빨강 + 배너의 노랑으로 바꿈. 원본은 드라이브 `방앗간` 폴더(구글 지도 캡처 23장, 모두 손님 사진, 보조 에이전트가 읽어 정리). 메뉴는 인쇄 메뉴책 1~9번 86개(대부분 2년 전 사진, 신선 메뉴만 1년 전에도 같은 가격). 메뉴책에 한·중·베 이름이 다 있어 그대로 쓰고 영어·일본어만 번역. `menu.js`는 `it(가격, ko, en, zh, ja, vi, 추가)` 짧은 함수로 씀. 로고는 디지털 메뉴의 빨간 사각 로고(114px, 3배 확대). 분류 사진은 노란 배너·디지털 메뉴의 작은 음식 사진을 동그랗게 잘라 노란 바탕에 2~3개 붙임(건어물·사리·주류·하이볼은 사진 없음).
- 추암(Choo Am)은 **가게 찾기용**(2026-10-21): 방앗간 페이지를 복사해 간판의 짙은 나무색 + 금색으로 바꿈, 위쪽은 명함의 붓글씨 로고를 금색 투명 PNG로 바꿔 씀(`img/logo.png`, h1 없음). 원본은 드라이브 `추암` 폴더(구글 지도 캡처 22장, 보조 에이전트가 읽어 정리). 메뉴 사진은 매니저(추승준)가 6~7년 전 올린 것뿐 — 6년 전 메뉴판(6~51번) 기준, 1~5번 약선 특별 메뉴는 7년 전 메뉴판에서 가져옴. 메뉴판에 한·베 이름이 있어 그대로 쓰고 영·중·일은 번역. 가격 부가세 10% 별도. 카카오톡 Luza4040, 다른 전화 070 340 4420(명함).
- 언니네(Chị ơi)는 **가게 찾기용**(2026-10-21): 방앗간 페이지를 복사해 나무 간판색(갈색) + 크림으로 바꿈, 로고가 없어 위쪽은 글자(h1 "언니네" + CHỊ ƠI)만. 원본은 드라이브 `언니네` 폴더(구글 지도 캡처 18장, 보조 에이전트가 읽어 정리). 메뉴는 가게 계정이 1년 전 올린 인쇄 메뉴판(한·베판 + 중·베판) 65개 기준, 영어·일본어만 번역. 음료(소주·맥주·막걸리)는 인쇄판에 없어 2년 전 손님 칠판 값으로 넣고 화면에 "확인해 주세요" 표시. 술 안주·전골·주류는 사진 없음.
- 우렁쌈밥은 **가게 찾기용**(2026-10-21): 언니네 페이지를 복사해 로고(달팽이 껍데기)의 보라 + 간판의 금색으로 바꿈, 로고가 72px뿐이라 위쪽은 글자(h1 "우렁쌈밥" + 韓式包飯)만. 원본은 드라이브 `우렁쌈밥` 폴더(구글 지도 캡처 13장, 보조 에이전트가 읽어 정리). 메뉴는 손님이 1년 전 올린 손글씨 화이트보드 3장 22개 기준, 한국어뿐이라 다른 언어는 모두 번역. 분류 사진 중 생선조림·꼬막비빔밥·굴 뚝배기는 홍보용(스톡) 사진으로 보임. 음료 메뉴 없음.
- 굿데이 김밥은 **가게 찾기용**(2026-10-21): 추암 페이지를 복사해 메뉴판의 겨자색 + 남색으로 바꿈, 로고가 없어 위쪽은 글자(h1 "굿데이 김밥" + GOOD DAY KIMBAP)만. 원본은 드라이브 `굿데이 김밥` 폴더(구글 지도 캡처 12장). 메뉴는 가게 계정이 3개월 전 올린 메뉴판 한 장(9개, 한·영·베 표기 그대로, 중·일 번역) 기준. 분류 사진은 손님 사진(김밥 / 떡볶이+모듬튀김 / 쫄면+냉쫄면 두 장 붙임), `store.jpg`는 입구 사진. 전화 0868 484 530, 오후 9시 종료(구글 지도). 위치는 La Cherie 커피 1층.
- La Cherie Coffee는 **가게 찾기용**(2026-10-21, 첫 카페 → 가게 찾기 종류 `cafe` 새로 추가, seo 종류 `CafeOrCoffeeShop`): 굿데이 김밥 페이지를 복사해 커피색 + 캐러멜로 바꿈, 위쪽은 매장 벽 네온 간판 원을 잘라 로고로 씀(`img/logo.png`). 원본은 드라이브 `La cherie` 폴더(구글 지도 캡처 16장; 사용자는 "굿데이 la cherie"라고 부름). 음료·빙수는 손님이 4개월 전 올린 "SELA MENU & BINGSU" 메뉴판(아래 La Cherie-Selina-Selena) 기준 — 1년 전 메뉴판보다 5k씩 비쌈. 음식(반미·크루아상·피자·티라미수·아이스크림)은 3년 전 가게 사진에만 있어 `price: null`(가격 문의). 전화번호·영업시간 없음(지도 정보 캡처 없음).
- Snack Shack은 **가게 찾기용**(2026-10-21, 가게 찾기 종류 `western`(버거·양식) 새로 추가, seo 종류 `BarOrPub`): 굿데이 김밥 페이지를 복사해 칠판 검정 + 노랑·빨강으로 바꿈, 위쪽은 포스터의 네온 버거 로고를 동그랗게 잘라 씀(`img/logo.png`) + h1 "SNACK SHACK". 원본은 드라이브 `Snack snack` 폴더(구글 지도 캡처 19장). 가격은 손님이 3일 전 올린 큰 메뉴판 + "BUILD YOUR BURGER" 판 기준(1년 전 포스터보다 오른 메뉴 있음), 키즈 메뉴는 가게 계정 5개월 전 포스터, 놀이방 입장권(월~목 100k·금~일 140k)은 3일 전 안내판. 사이즈 라벨이 `3×3 · 180g` 같은 글자라 `menu.js`에 `L()`·`sz()` 함수를 씀. 분류 사진은 1년 전 포스터의 버거 2개(가격표 빼고 잘라냄)와 키즈 포스터만 — 치킨·감자튀김 사진은 옛 가격표가 같이 찍혀 안 씀. 전화 0362 191 901, 매일 11:00~23:00.
- 수원성은 손님 가게 찾기용으로 만든 것(사장님 의뢰 아님) → 소개서 데모에서 뺌(`DEMOS`의 `hidden: true`), 가게 찾기 목록에 `listing: true`. 소개서 데모 7칸: 숯꾸이·EROS·Ăn Vội·백천·가마솥·바이오&뷰티·킴스호텔.
- 수원성은 매장 인쇄 메뉴판 사진과 구글 지도의 디지털 메뉴판 이미지(여러 판, 일부 지워짐)를 대조해 만들었다. 공식 영문 표기는 SUWONSUNG.
- 사진·로고는 사장님 메뉴판 디자인 원본에서 잘라 `restaurants/<가게>/img/`에 둔다.

## 작업 도구 (`tools/`)
저장소 루트에서 실행한다. 모두 이 클라우드 환경(Playwright 전역 설치, poppler)에서 검증했다.
- `node tools/qr.cjs <URL> <출력.svg> [L|M|Q|H]` — QR 만들기 (기본 Q). 같은 이름의 `.json`도 생긴다.
- `python3 tools/qr-check.py <qr.json>` — QR을 직접 해독해 URL 확인 (버전 3만 가능 → 안 되면 `M`으로 다시 만든다). 확인 후 `.json`은 지운다.
- `node tools/card.mjs <가게>` — `print/table-card.html` → `table-card.png`·`table-card-A6.pdf`, `table-card-A4.html`이 있으면 `table-card-A4x4.pdf`. 카드 밖으로 넘친 요소도 알려 준다. **만든 PDF는 항상 사용자에게 보낸다.**
- `node tools/sns.mjs <가게> [vi|ko…] [버튼 글자, 기본 MENU] [가게 이름]` — SNS 홍보 이미지 `print/sns-square.png`(1080×1080, 게시물·Zalo)·`sns-story.png`(1080×1920, 스토리). 메뉴판 첫 화면+QR+주소, 색은 가게 `partner-theme`. 가게 이름·종류는 `sales/content.js`의 `DEMOS`에서 가져오므로 새 가게는 DEMOS에 먼저 넣는다. 한국 매장은 `ko`, 바이오&뷰티는 `vi SHOP "Bio & Beauty"`. 기본형에 포함이라 새 가게마다 만들어 사용자에게 보낸다. QR 아래 안내 문구는 정사각형·스토리 모두 **5개 언어(베트남어·한국어·영어·중국어·일본어)를 항상 다 넣는다**(사용자 지시 2026-10-21, 예전 정사각형은 3개 언어였음 — 다른 가게는 다시 만들 때 반영).
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
- **유원핫도그**(가게 찾기용): 전화번호 없음(`phone: null`). 가격이 약 1년 전 손님 사진 기준이고 흐릿함 — 특히 곡물 라떼(65K/85K), 블루레몬에이드(40K/45K), 감자튀김(45K/40K), 치킨팝(55K?)은 두 사진이 다르거나 안 보임. 싱글 콤보 구성 모름. 최신 메뉴판 사진이 생기면 확인.
- **킴스호텔**: Zalo 번호를 명함 전화(0347420256)로 넣음 — 맞는지. 객실 사진은 사용자 확인 후 싱글↔디럭스를 바꿈(트윈은 그대로), 요금이 1박 기준인지(안내문에 단위 없음). 객실 이름(싱글룸·디럭스 싱글룸·트윈룸)은 안내문의 1인실·1인실 대형·2인실을 바꿔 부른 것. 식당 영업시간·음료 메뉴·와이파이 없음. 1층 식당 주문서 언어는 베트남어(`ORDER.staff: "vi"`) — 사장님(한국인)이 받으면 `ko`로.
- **족발신선생**(가게 찾기용): 마감 시간 모름, 뼈해장국은 '160,000₫부터'만 있음, 보쌈 베트남어 이름이 메뉴판마다 다름(ba chỉ / má lợn → 메뉴판의 'Thịt ba chỉ hầm' 씀), 손님 사진의 콘치즈·제육볶음·냉면은 메뉴판에 없어 뺌. 고화질 로고가 있으면 교체.
- **대국**(가게 찾기용): 전화번호·마감 시간 없음. 돼지고기 3종은 페이지 머리의 100,000₫를 각각 가격으로 넣음(확인 필요). 샤브샤브는 중(2~3인)만 있음. 메뉴 번호가 비어 있어 사진에 없는 페이지가 더 있을 수 있음. 타이거 라거 40K·금색 타이거 35K는 메뉴책 그대로.
- **복나라**(가게 찾기용): 주소 번지 "Lô 28N5"가 흐려 확실치 않음(2BN5일 수도). 영업 시작 시간 모름(마감 21:30, 아침 식사 가능). SET1·SET2 구성의 양(반 마리 등) 불확실. 소주 140K·맥주 50K가 병/몇 병 단위인지 불확실. 가격이 11개월~3년 전 사진 기준.
- **치뱅이**: Zalo 주문 번호를 가게 전화(0967291230)로 넣음 — 맞는지. 음료(맥주·소주) 메뉴 사진 없음. 마감 시간·와이파이 모름. 1년 전 사진에만 있는 순살치킨 4종·윙봉치킨 6종·치킨 샐러드·숯불바베큐+누룽지 세트는 뺐음 — 지금도 파는지. 1년 전과 가격이 다른 것(바베큐치킨 400k→500k, 라면 추가 50k→60k, 안동찜닭 500k→600k)은 최신 메뉴책 값. 주문서 언어(`ORDER.staff: "vi"`), 소개서 데모 칸에 넣을지.
- **삼원**(가게 찾기용): 전화번호가 구글 지도(0393 811 008, 넣은 값)와 간판(0928 410 578, 옛 현수막 096 275 2586)이 다름. 마감 시간 모름(오후 3시 영업 시작). 28번 메뉴 이름이 스티커에 가려져 중국어 排骨汤만 보여 갈비탕(150k)으로 추정. 가격은 1년 전 손님 사진 기준. 와이파이 네트워크 이름 모름(비밀번호 0000088888). 1인분 g 수 없음.
- **방앗간**(가게 찾기용): 마감 시간 모름(오후 4시 30분 영업 시작). 가격 대부분 2년 전 손님 사진 기준. 소불고기 가격이 한 사진에서 종이로 가려짐(바뀌었거나 판매 중지?). 해물 조개찜은 인쇄 메뉴 600k·옛 디지털 메뉴 500k(600k 넣음). 소주 130k·타이거 60k가 병/세트 단위인지 모름. 배너에만 있는 "…ng mỡ hành" 메뉴는 뺌. 와이파이 없음.
- **추암**(가게 찾기용): 메뉴·가격이 6~7년 전 기준이라 많이 바뀌었을 수 있음(최신 메뉴판 사진 필요). 1~5번 약선 특별 메뉴는 6년 전 판에 사진이 없어 7년 전 값. 흐려서 짐작한 값: 알탕 소 600k, 부대찌개 대 900k, 갈치조림 800k, 황태해장국·돼지고추장찌개·제육덮밥 가격, 타이거 50k(7년 전 40k), 생막걸리 200k, 40번 "말린 열기" 이름. 손님 사진의 해신탕·갈비찜·삼계탕은 메뉴판에 없어 뺌. 영업 시작 시간 모름(마감 오후 10시).
- **언니네**(가게 찾기용): 영업 시작·마감 시간 모름(오후 3~4시 쉬는 시간만 확인). 음료 가격은 2년 전 칠판 기준. 칠판에만 있는 갈치조림·고등어무조림·돼지불고기전골(2년 전)·콩나물해장라면·문어초무침·제육두루치기(1년 전)는 뺌 — 지금도 파는지. 1년 전 칠판과 값이 다른 메뉴 있음(해물누룽지탕 500k/350k, 민물얼큰새우탕 500k/300k, 계란말이 90k/150k 등, 인쇄판 값 넣음). 와이파이 없음.
- **우렁쌈밥**(가게 찾기용): 영업 시작 시간 모름(마감 오후 10시). 돼지고기 김치전골이 보드에 600k/500k 두 가격("(밥 [?])" 지워짐) → "가격 문의"로 두고 두 가격을 설명에 적음. 가자미조림의 빨간 ※ 뜻(추천/품절?) 모름. 4년 전 보드에만 있는 멍게비빔밥·동태전·연포탕, 옛 사진의 마라샹궈는 뺌. 음료 메뉴·와이파이 없음. 가격 1년 전 기준.
- **굿데이 김밥**(가게 찾기용): 음료 메뉴 없음(메뉴판에 없음). 영업 시작 시간 모름(마감 오후 9시). 와이파이 없음.
- **La Cherie**(가게 찾기용): 전화번호·영업시간·정확한 번지 없음(`phone: null`, 주소는 Sunshine City Ciputra까지만). 음식 메뉴 가격 모름(3년 전 사진뿐, 지금도 파는지). 코코넛 커피 59k는 흐려서 짐작. 와이파이 없음.
- **Snack Shack**(가게 찾기용): 7개월 전 맥주판에만 있는 Beach Blonde Ale·Dragon IPA 등은 뺌(3일 전 판 기준). 놀이방 공휴일 요금 모름. 와이파이 없음.
- 답을 받으면 해당 `menu.js`만 고치고 커밋·푸시 → 그 가게만 다시 배포 → 이 목록에서 지운다.

## 언어 선택 드롭다운 (모든 메뉴판·소개서·가게 찾기)
- 화면 오른쪽 위 버튼 하나(현재 언어 국기+이름) → 누르면 국기와 함께 5개 언어가 펼쳐진다. 바깥 클릭·Esc로 닫힘, 위아래 화살표로 이동.
- 원본 `restaurants/_shared/lang-menu.js` 하나. 페이지의 기존 `#langs` 버튼은 숨기고 고른 언어의 버튼을 대신 눌러 주므로, 페이지별 언어 코드는 그대로 둔다. 국기는 SVG(윈도우는 국기 이모지가 글자로 보임).
- 고친 뒤 `restaurants/_shared/sync-lang.sh`로 7개 가게와 `sales/`(소개서·가게 찾기 공용)에 복사하고 모두 다시 배포한다. 새 가게는 SHOPS에 넣는다.

## 장바구니 · 주문서 (모든 메뉴판)
- 메뉴마다 "+ 담기" 버튼(S/L·한 마리/반 마리·후식 가격은 버튼이 따로) → 아래쪽 장바구니 막대 → 주문서: 수량 조절, 테이블 번호, 요청사항, **직원에게 보여주기**(직원 언어로 크게, 손님 언어는 작게), Zalo로 보내기(주문서 복사 후 zalo.me 열기).
- 원본 `restaurants/_shared/order.js` 하나. 고친 뒤 `restaurants/_shared/sync-order.sh`로 복사하고 다시 배포한다. 대상: 숯꾸이·EROS·가마솥·수원성·백천·킴스호텔 (Ăn Vội·바이오&뷰티는 자체 장바구니가 따로 있음).
- 가게 설정은 `menu.js`의 `window.ORDER = { staff, currency, zalo, labels }`(`labels`로 문구 바꾸기, 예: 킴스호텔의 '객실·테이블 번호') — `staff`는 주문서 언어(베트남 매장 `vi`, 백천 `ko`), `zalo: null`이면 Zalo 버튼 숨김.
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
