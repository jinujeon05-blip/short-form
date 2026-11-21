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
- **주방으로 주문 보내기**(2026-11-10): admin '주문·주방 기기'에서 켠 가게만 버튼이 보인다(기본 꺼짐). 상세 `docs/admin-system.md` 끝.
- **품절 메뉴 담기 막기**(2026-11-10, 아직 어느 가게에도 복사 안 함 — 첫 가게 주방 주문 켤 때 같이 들어감): 점주가 품절로 바꾼 메뉴(`soldOut`, override가 MENU에 넣음)는 '+ 담기' 버튼을 안 붙이고(품절 배지는 override가 붙임), 지난번 장바구니에 있던 품절 메뉴는 빼고 '품절된 메뉴는 장바구니에서 뺐어요'(5개 언어)를 한 번 띄운다.
- **요청 원터치 버튼**(2026-11-21 캡틴 가-1·나-1, order.js 쓰는 11곳 + testshop에 복사): 주문서 입력칸 아래 '자주 하는 요청' 6개(🌿고수 빼기·🌶️안 맵게·🧂MSG 빼기·🧊얼음 따로·🍽️앞접시·🥡포장, `ASK`·`ASKS`, 5개 언어). 고른 것은 직원 화면·주문서 글·주방 주문(`note`, 서버 200자 제한에 맞춤)에 **직원 언어**로 붙고, 손님이 쓴 요청 글은 그 뒤에 그대로. 직원 화면 요청 상자 아래에 손님 언어로 작게 한 번 더. 장바구니와 같이 저장(`asks`), 비우기·주방 전송 뒤 지워짐. 확인: 폰 375·PC 1440 넘침 0, ko·en, 콘솔 오류 0. 10월판을 쓰던 8곳(가마솥·숯꾸이 등)은 이때 주방 주문·직원 호출·품절 담기 막기 코드도 같이 들어갔지만, 관리 화면에서 주방 주문을 켜기 전엔 안 보인다(가마솥에서 확인). `sync-order.sh` 가게 목록에 진미·박닌반점·testshop 추가. **2026-11-21 10곳 배포**(커밋 0364d2b, 실제 주소 10곳 모두 새 order.js·메뉴 파일 확인, 숯꾸이 실제 주소에서 버튼 눌러 봄).
- **손님 돈으로 대략 환산**(2026-11-21 캡틴 가-2, 지금은 `testshop`에만): 동(₫) 가게에서 손님 언어가 한국어면 원·영어면 달러·일본어면 엔·중국어면 위안으로 메뉴마다 가격 아래 작게 `≈ 6,200원`(크기별 가격은 `≈ 최저 ~ 최고`). 베트남어 화면·원화 가게(백천)·시가 메뉴는 안 나옴. 주문서 합계 안내 줄에도 `≈ … (환율 날짜 기준, 대략)`. 환율은 고정값(`order.js` 맨 위 `FX_DATE`·`FX`, 출처 open.er-api.com 2026-11-20: 1원=19.31동·1달러=25,641동·1엔=161.11동·1위안=3,846.15동) — 손님 화면에서 인터넷으로 환율을 받지 않는다(비용·실패 없음). 환율이 크게 바뀌면 그 두 줄만 고쳐 복사·배포. 가게에서 끄려면 `menu.js`의 `window.ORDER`에 `fx: false`. 확인: 폰 375·PC 1440 넘침 0, ko·en·vi, 가마솥(크기별 가격) 범위 표시, 콘솔 오류 0.
- 테이블 번호: QR 주소에 `?t=5`를 붙이면 주문서에 자동으로 들어간다 (테이블별 QR을 만들 때 사용).
- 장바구니는 휴대폰에 6시간 저장된다(언어를 바꿔도 유지, 다음 방문 때는 비어 있음).

## 다산(DASAN) 파트너 배너
- **2026-11-09 사용자 지시로 꺼짐**: `_shared/dasan.js` 맨 위 `const ON = false;` → 모든 메뉴판·가게 찾기 페이지에서 안 나온다. 다시 켜려면 `true`로 바꾸고 `sync-dasan.sh` + `sales/stores/dasan.js` 복사 후 배포.
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
- **다산 배너 위치(2026-10-23 사용자 지시)**: 가게 찾기 페이지(`sales/stores/index.html`, 원본 복사본 `sales/stores/dasan.js`)는 처음 화면에서 **정식 계약 가게 바로 다음**(가게 찾기용 앞)에 다산 배너가 나오고, **지역(하노이·박닌 등)만 골라도 같은 위치**, 검색·종류를 고르면 **맨 아래(footer 다음)**로 간다. 정식 가게는 목록 앞쪽에 정렬된다. 정식/찾기용 구분은 `data.js`의 `listing: true` 여부이고(관리 화면 기본값과 같음), **관리 화면에서 상태를 바꿔도 공개 페이지는 안 바뀐다** → 가게가 정식으로 바뀌면 `data.js`에서 그 가게의 `listing: true`를 지운다. `restaurants/_shared/dasan.js`를 고치면 `sales/stores/dasan.js`에도 복사한다.
- 새 가게는 사장님 동의를 받고 `STORES`에 추가한다. 목록에 넣은 가게는 `sync-stores.sh`의 SHOPS에도 넣는다. 지역·종류가 새로 생기면 `REGIONS`·`CATS`에도 넣는다. 15~20곳이 넘으면 지역을 나라/도시 두 단계로 나누는 것을 검토한다.

## 점주용 자료
- **점주 전자책 「QR 메뉴판 사장님 안내서」(2026-11-18 시작, 캡틴 가-1·나-1·다-1·라-1)**: `owner-book/ko.html`(A4 인쇄 + 폰 폭에서도 읽힘, 글꼴 맑은 고딕 하나) → `node tools/pdf.mjs owner-book/ko.html owner-book/owner-book-ko.pdf`. 화면 사진은 `node .scratch/ebook/shots.mjs ko`(진미식당 메뉴판 + 모의 Blob 시험 서버 `.scratch/voice-test/server.cjs`, 실제 저장소·비밀번호 안 씀) → `img/ko/*.jpg`(PNG를 JPG로 줄임). 넘침 검사 `node .scratch/ebook/check.mjs <html>`. 한국어 1~10장 완성(56쪽, 2026-11-18). 4~6장 사진은 `node .scratch/ebook/shots2.mjs ko`(서버 `.scratch/ebook/server.cjs` = 소리함 시험 서버 + `/__seed` 가짜 주문 40일·방문 기록, `/__rtok`), 주방 불만 띠는 `.scratch/voice-test/v4-kitchen.png` 위쪽을 잘라 씀, 영수증 예시는 치뱅이 시험 그림. 원고 조각 `.scratch/ebook/ch4-6.html`·`ch7-10.html`(이미 ko.html에 붙음). **베트남어판 `vi.html` → `owner-book-vi.pdf`(56쪽, 2026-11-18, polisher 번역, 화면 글자는 실제 vi 문구, 사진 `img/vi/` = `shots.mjs vi`·`shots2.mjs vi`)**. 베트남어판은 글이 길어 상자·표 글자를 조금 줄인 CSS가 따로 있다(같은 글꼴 맑은 고딕). 남은 확인은 `docs/todo.md`. 예전 4쪽 설명서(`guide-ko.html`)는 그대로 둠.
- **점주 메뉴 관리 설명서 + 로드맵(2026-10-23, 한국어·베트남어 A4 4쪽, 가게 공통)**: `sales/owner/guide-ko.html`·`guide-vi.html` → `node tools/pdf.mjs sales/owner/guide-ko.html sales/print/owner-guide-ko.pdf`(vi도 같게). 내용: 할 수 있는 일·로그인·화면 둘러보기(빨간 번호 1~15)·상황별 방법·알아 둘 것·방문 리포트·로드맵(지금/준비 중/의견으로 정함)·문의처. 화면 그림은 `node tools/owner-shots.mjs`(가짜 서버로 편집기를 띄워 데모 데이터로 캡처 → `sales/owner/guide-img/`). **편집기(`sales/menu-editor.js`)·로그인 화면이 바뀌면 캡처와 두 HTML을 같이 고친다.** 로드맵의 '준비 중'은 `docs/admin-system.md`의 '나중에'·번역 현황과 맞춘 것이라, 그쪽이 바뀌면 로드맵도 고친다(시기는 약속하지 않음). 점주에게 보낼 때 파일 이름은 `점주설명서_한국어.pdf`·`Huong-dan_thuc-don_vi.pdf`처럼 복사해서 보낸다.
- Ăn Vội: `restaurants/anvoi/print/huong-dan-su-dung.pdf` (베트남어 사용설명서·주문 처리 순서, A4 2쪽, 원본 `huong-dan.html`, 화면 캡처 `print/img/g*.jpg`). 다른 가게도 같은 형식으로 만든다.
- 가마솥: `restaurants/gamasot/print/guide-gamasot.pdf` (한국어 활용 가이드북, A4 3쪽: 손님 화면·기능별 좋은 점·상황별 활용·링크 문구·수정 방법, 원본 `guide.html`, 캡처 `print/img/g*.jpg`).
- Ăn Vội 메뉴판에는 장바구니 + Zalo 주문 기능이 있다 (주문서는 항상 베트남어로 작성).

## 메뉴 게임 (2026-10-31, `sales/stores/game.html`)
- 가게 찾기 맨 위 '🎮 오늘 뭐 먹지? 메뉴 게임' 버튼 → 음식 이상형 월드컵(16강) · 오늘 뭐 먹지 룰렛(매운 것만 칩) · 어느 가게 갈까? 간판 룰렛(지역·종류 고르기) · 사다리타기(누가 계산할까, 이름 넣기) · 틀린 그림 찾기(고깃집 한 상) — **지금 5가지**(간판 룰렛·사다리타기는 커밋 af94da5·4c15ad8에서 추가). 5개 언어, 지역 칩.
- **틀린 그림 찾기(2026-11-11, 그림은 2026-11-12 만화풍으로 바꿈, `sales/stores/spot.html`, 따로 있는 화면)**: 음식·소품 그림 **50장**과 식탁 배경은 캡틴이 제미나이 앱(나노바나나)에서 직접 만든 만화풍 스티커 시트 10장을 `.scratch/spot-art/cutall.py`로 하나씩 잘라 낸 것(`sales/stores/spot-art/*.webp` + `table.jpg`, 합계 약 1.5MB, 한 판에 9장만 불러옴). 붙여 넣은 문구는 흰 바탕·2×2 또는 3×2 칸·음식 사이 넓게·글자 없음(같은 대화에서 시안 그림을 첨부해 그림체를 맞춤). 코드로 그린 첫 그림은 캡틴이 "퀄리티가 떨어진다"고 해서 버림. 틀린 곳은 그림 파일을 화면에서 바꿔 만든다(색 hue · 좌우 뒤집기 · 돌리기 · 크기 · 없애기, `mutsFor()`가 종류별로 정함, 색을 바꿔도 티가 안 나는 흰 음식은 `NOHUE`). 종류별 자리(`TYPES`: 큰 요리·그릇·작은 접시·종지·병·맥주잔·소품) 배치 2가지×좌우 뒤집기, 단계(1단계 음식 6·차이 3·60초 → 3단계부터 음식 9·차이 5, 뒤로 갈수록 어려운 차이·짧은 시간), 틀리면 5초 감점, 힌트 2번, 효과음(끄기 버튼)·축하 효과, 최고 기록은 그 폰에만 저장. **음식을 더하려면** 시트를 `cutall.py`의 `SHEETS`에 넣어 자르고 `TYPES`·`ASPECT`에 이름을 더한다. agy 이미지 생성은 하루 한도가 작다(2026-11-12: 3장 뒤 `429`) — 여러 장이면 캡틴이 제미나이 앱에서 만드는 쪽이 빠르다.
- 데이터는 `node tools/game-data.mjs`가 만든 `sales/stores/game-data.js`(음식점마다 **사진 있는 메뉴 전부**, 태그 메뉴 먼저). **`register-shop.mjs`·`check-shop.mjs`가 자동으로 다시 만든다**(2026-11-16). 사진은 각 가게 배포 주소에서 불러오므로 배포 안 된 사진은 다른 메뉴로 자동 대체된다.
- **가게가 다 안 나오던 건(2026-11-16 캡틴 지적)**: 원인은 ① game-data.mjs를 손으로 돌려야 했는데 11-06 뒤로 안 돌림(등록 도구에 안 들어 있었음), ② 가게당 6개 제한. 고침: 등록·점검 도구에 연결하고, 6개 제한을 없앰(캡틴 가-1: 사진 메뉴 전부, 사진 없는 메뉴는 안 넣음). 결과: 가게 81→116곳, 메뉴 403→979개, 간판 룰렛 105→141곳(음식점 143곳 중 커피숍 2곳은 지시대로 뺌). 파일 177KB→360KB(압축 약 89KB). **아직 빠진 27곳은 메뉴에 사진이 하나도 없는 가게**(숯꾸이·에로스·수원성·헬로치킨 등) — 메뉴 사진이 생기면 자동으로 들어감. **배포 `aa01fe0`(qrmenu-intro, 2026-11-16)·실서버 확인**: game-data.js 메뉴 979개, game.html 200, 폰 폭 간판 룰렛 '후보 141곳'·뽑기 사진 정상·콘솔 오류 0, 사이트맵 148(직전과 같음).
- **배포**: 2026-10-31 `qrmenu-intro`(커밋 0187465, 수정판 ef9ff7b) — https://qrmenuasia.com/stores/game.html 실제 주소 확인. 방문 기록은 `tools/analytics.mjs` 목록에 game.html 추가.
- **거르기(2026-10-31 사용자 지시)**: 음식점만(호텔·사진관·마사지·미용 빼기), 흐린 사진(메뉴판에서 오려 낸 것 등)은 `tools/sharpness.py` 점수 1100 미만이면 뺀다. 게임 화면 맨 아래에 '구글 지도 기준이라 사진·가격이 다를 수 있음' 안내(5개 언어). 지역 고르기는 각 게임 안(월드컵 시작 화면·룰렛 위), 룰렛은 약 4초.
- 페이지는 안티그래비티(`agy --mode accept-edits -p`, 파일 쓰기 시험 합격)가 설계서대로 만들었고, 메인은 화면 확인·작은 수정만 했다.

## 사장님 비용 계산기 (2026-11-17, quicktables.site 벤치마킹 1번, 배포 b260fc0 → https://qrmenuasia.com/savings/)
- 소개서 가격표 아래(`#price` 안 `.calc-link`, 문구 `content.js` 각 언어 `calcLink`)에서 연결, 링크는 `/savings/?lang=<현재 언어>`(캡틴 가-1).
- `sales/savings/index.html`(주소 `/savings/`, `noindex`). ① 종이 메뉴판 1년 비용 vs QR(기본형+연 관리) ② 배달앱 수수료 vs 직접 주문(Zalo 주문서 옵션) 계산기 ③ 종이·배달앱·QR 비교표 ④ 가게 이름 한 칸 → Zalo·전화로 보낼 문구 + 가게 찾기 링크.
- 가격·연락처는 `/content.js`의 `PRICES`·`CONTACT`를 그대로 씀. 문구 5개 언어(중·일·영은 polisher, 2026-11-17 캡틴 "맞음" 뒤). 언어는 소개서와 같은 순서(?lang= → localStorage `sales-lang` 공유 → 휴대폰 언어). 계산기 기본값(메뉴판 10권·1권 150,000₫·연 3번·번역 1,000,000₫ / 배달 300건·150,000₫·25%·10%)은 메인이 정한 가정값.
- quicktables의 "우리 이름 안 붙임" 문구는 넣지 않음: 우리 메뉴판엔 가게 찾기 링크·파트너 배너가 있어 사실이 아님. "48시간 안에 완성" 약속도 캡틴 결정 전이라 뺌.

## 투자 제안서 (2026-11-18, 캡틴 가-1 10억 동·나-1 지분 투자·다-2 저장소 기록만·라-1 PDF 2개)
- **새판(2026-11-18 캡틴 '이모지 줄이고 사진·그림 위주로, HTML·PPT도')**: 16:9 20장. 글은 `investor/deck/content_<ko|vi>.json` 한 곳, `python investor/deck/build.py <ko|vi>` → `investor/QR메뉴판_투자제안서_<한국어|베트남어>.html`·`.pptx`(Noto Sans KR 하나, 그래프·표는 PPT에서 고칠 수 있음). 점검 `node investor/deck/shots.mjs <ko|vi>`(넘침 [] 이어야 함, 장별 PNG는 `out/`), PDF `node tools/pdf.mjs investor/deck/out/deck_<ko|vi>.html "investor/QR메뉴판_투자제안서_<..>.pdf"`. PPT 모양 확인은 PowerPoint COM으로 장을 PNG로 내보내 본다(LibreOffice 없음). 한국어 줄바꿈이 낱말 중간에서 끊기면 글자 `lang=ko-KR`이 빠진 것.
- (옛 A4판) `investor/ko.html`·`vi.html`(A4 24쪽, 맑은 고딕 하나) → `node tools/pdf.mjs investor/<ko|vi>.html "investor/QR메뉴판_투자제안서_<한국어|베트남어>.pdf"`. 넘침 검사 `node investor/check.mjs <html>`(쪽마다 남는 mm, 음수면 넘침), 모음 이미지 `node investor/shot.mjs <html> <png>`.
- **2026-11-19 캡틴 결정**: 대표 급여 월 3,000만 동·영업용 차량+기사 월 3,000만 동(하노이 7인승 기사 포함 시세 월 2,250만~3,000만)·가격 기본 250만·프리미엄 500만·월 35만(POS 주문 앱 월 10만~25만은 사장님이 직접 만듦)·투자 12억 동. 그대로 두면 필요 자금 13.6억이라 가격·투자액을 같이 올림. 새판(16:9)만 반영, 옛 A4판과 qrmenuasia.com 공개 가격은 아직 옛 가격.
- 계획 숫자는 전부 `investor/model.mjs`(가정: 제작비 평균 325만·옵션 40만·월 관리 31.5만·해지 월 2%, 투자금 사용 도넛·지분율·지분 가치도 이 파일이 출력, 시나리오 보수/기본/공격 = 월 새 계약 6·15·30 / 10·25·50 / 15·40·80). 가정을 바꾸면 이 파일을 돌려 3·13·15~17·20쪽 숫자와 16쪽 막대를 같이 고친다. vi판은 억 동 → tỷ/triệu로 환산.
- 실적 숫자: 실제 가게 147곳(`restaurants/testshop`은 시험용이라 뺌), 사이트맵 149 = 가게 147 + 대표 2. 시장 숫자 출처는 8쪽 아래.

