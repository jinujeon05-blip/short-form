# 공통 기능 상세 (언어 선택·장바구니·다산·JS welink·소개서·가게 찾기·점주 자료)

> 이 파일은 CLAUDE.md에서 옮겨 온 상세 기록이다(2026-10-23, 사용량 절약). 필요할 때만 읽는다.

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
- 연락처: 한국어 상담 전화·Zalo 0917 302 200, 카카오톡 jjw4164 / 베트남어 상담 전화·Zalo 0937 250 787(2026-10-21 추가, `content.js`의 `CONTACT.vi`). 문의하기 칸은 상담 언어별 두 묶음, 베트남어 화면에서는 베트남어 상담이 먼저 나온다. 인쇄본(PDF)에서는 두 묶음을 한 줄에 나란히 놓아 2쪽을 유지한다.


## 가게 찾기 페이지 (손님용)
- https://qrmenuasia.com/stores/ (`sales/stores/`, 소개서와 같은 Vercel 프로젝트). 소개서 데모 칸 아래 링크로 연결됨.
- 가게 목록·지역·종류·태그·화면 문구(5개 언어)는 `sales/stores/data.js` 하나에 있다. 사진은 소개서와 같은 `sales/img/demo-<가게>.jpg`.
- 검색은 모든 언어의 이름·종류·지역·주소와 `keywords`(화면에 안 보임, 요리 이름 등)를 대상으로 하고 베트남어 성조를 무시한다 ("an voi" → Ăn Vội). 조건은 주소창(`?q=&region=&cat=`)에 남아 링크로 공유된다.
- **웹앱 설치 버튼(2026-10-22)**: 가게 찾기 맨 위 "앱으로 설치하기" 버튼(`sales/stores/index.html`의 `<!-- install:start/end -->`, 5개 언어). 안드로이드 크롬은 `beforeinstallprompt`로 설치 창을 바로 띄우고, 아이폰·그 외 브라우저는 "홈 화면에 추가" 방법 안내 창을 보여 준다. 이미 앱으로 열었으면(standalone) 버튼 숨김. 삼성 인터넷은 설치하면 구글 Play 프로텍트가 '안전하지 않은 앱 차단됨'(Android 이전 버전용 앱)을 띄우므로(사용자 폰 확인 2026-10-22, 브라우저가 만든 설치 파일 탓으로 우리가 못 고침) **UA가 SamsungBrowser면 설치 창을 띄우지 않고 '크롬에서 열어 설치' 안내만 보여 준다**.
- 각 가게 메뉴판 맨 아래(파트너 배너 다음)에 "QR 메뉴판 가게 더 보기" 링크가 있다. 원본은 `restaurants/_shared/stores-link.js` 하나, 고친 뒤 `restaurants/_shared/sync-stores.sh`로 복사하고 가게마다 다시 배포한다. 메뉴판 언어를 따라 문구와 `?lang=`이 바뀌고, 색은 가게 `partner-theme`(`--pt-*`)를 따른다.
- **다산 배너 위치(2026-10-23 사용자 지시)**: 가게 찾기 페이지(`sales/stores/index.html`, 원본 복사본 `sales/stores/dasan.js`)는 처음 화면에서 **정식 계약 가게 바로 다음**(가게 찾기용 앞)에 다산 배너가 나오고, 검색·지역·종류를 고르면 **맨 아래(footer 다음)**로 간다. 정식 가게는 목록 앞쪽에 정렬된다. 정식/찾기용 구분은 `data.js`의 `listing: true` 여부이고(관리 화면 기본값과 같음), **관리 화면에서 상태를 바꿔도 공개 페이지는 안 바뀐다** → 가게가 정식으로 바뀌면 `data.js`에서 그 가게의 `listing: true`를 지운다. `restaurants/_shared/dasan.js`를 고치면 `sales/stores/dasan.js`에도 복사한다.
- 새 가게는 사장님 동의를 받고 `STORES`에 추가한다. 목록에 넣은 가게는 `sync-stores.sh`의 SHOPS에도 넣는다. 지역·종류가 새로 생기면 `REGIONS`·`CATS`에도 넣는다. 15~20곳이 넘으면 지역을 나라/도시 두 단계로 나누는 것을 검토한다.

## 점주용 자료
- **점주 메뉴 관리 설명서 + 로드맵(2026-10-23, 한국어·베트남어 A4 4쪽, 가게 공통)**: `sales/owner/guide-ko.html`·`guide-vi.html` → `node tools/pdf.mjs sales/owner/guide-ko.html sales/print/owner-guide-ko.pdf`(vi도 같게). 내용: 할 수 있는 일·로그인·화면 둘러보기(빨간 번호 1~15)·상황별 방법·알아 둘 것·방문 리포트·로드맵(지금/준비 중/의견으로 정함)·문의처. 화면 그림은 `node tools/owner-shots.mjs`(가짜 서버로 편집기를 띄워 데모 데이터로 캡처 → `sales/owner/guide-img/`). **편집기(`sales/menu-editor.js`)·로그인 화면이 바뀌면 캡처와 두 HTML을 같이 고친다.** 로드맵의 '준비 중'은 `docs/admin-system.md`의 '나중에'·번역 현황과 맞춘 것이라, 그쪽이 바뀌면 로드맵도 고친다(시기는 약속하지 않음). 점주에게 보낼 때 파일 이름은 `점주설명서_한국어.pdf`·`Huong-dan_thuc-don_vi.pdf`처럼 복사해서 보낸다.
- Ăn Vội: `restaurants/anvoi/print/huong-dan-su-dung.pdf` (베트남어 사용설명서·주문 처리 순서, A4 2쪽, 원본 `huong-dan.html`, 화면 캡처 `print/img/g*.jpg`). 다른 가게도 같은 형식으로 만든다.
- 가마솥: `restaurants/gamasot/print/guide-gamasot.pdf` (한국어 활용 가이드북, A4 3쪽: 손님 화면·기능별 좋은 점·상황별 활용·링크 문구·수정 방법, 원본 `guide.html`, 캡처 `print/img/g*.jpg`).
- Ăn Vội 메뉴판에는 장바구니 + Zalo 주문 기능이 있다 (주문서는 항상 베트남어로 작성).
