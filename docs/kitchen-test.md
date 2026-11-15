# 주방 주문 시험 가게 — QR 시험 식당 (`testshop`) 캡틴용 안내 (2026-11-15)

> 실제 가게(진미식당 등)에 주방 주문을 켜기 전에 캡틴이 직접 흐름 전체를 시험하는 가상 가게입니다. 캡틴 결정: 가-1 `testshop`/"QR 시험 식당" · 나-1 가짜 한식 8개(시가 1·크기별 1, 사진 없음) · 다-1 가게 찾기·사이트맵·검색 숨김 + noindex · 라-1 열쇠 없는 QR + admin 카드 둘 다.

## 만든 것
- 메뉴판 `restaurants/testshop`(가마솥 구조, 정식=장바구니·주문서, 맨 위 그림은 'QR TEST' 글자 로고). `robots.txt` 전체 막음 + `<meta name="robots" content="noindex">`.
- **일부러 뺀 등록**: `sales/stores/data.js`·sync-lang/dasan/stores·seo·export·DEMOS·demo·analytics(방문 기록 블록). 그래서 `check-standard.mjs testshop`은 '등록 없음' 오류를 내는 것이 정상(구조 항목은 통과).
- admin '주문·주방 기기' 탭은 가게 목록을 `data.js`에서 읽으므로, `sales/admin/kitchen.js`의 `TEST` 한 줄로 이 탭에서만 **맨 앞에 'QR 시험 식당 (시험용)'** 이 보이게 했다(이 탭 기본 선택도 시험 가게가 됨).
- 테이블 QR(열쇠 없음): `restaurants/testshop/print/test-qr.pdf`(A4 한 장에 1·2·3번), 주소 `https://testshop.qrmenuasia.com/?t=1`~`3`. QR은 해독해 주소 일치 확인함.
- 새 `order.js`는 `new-shop.mjs`가 `_shared/order.js`에서 이 가게에만 복사(같은 파일 확인). `sync-order.sh`는 다른 8곳에 한꺼번에 복사하는 스크립트라 돌리지 않았다.

## 로컬 시험 결과 (2026-11-15, 모의 서버 = `.scratch/kitchen-test/server.cjs`를 testshop용으로 바꿔 씀)
- 25개 항목 PASS: 꺼짐/켜짐 `GET /api/order` · 손님 폰(390) 주문서 → 주방 PC(1280·1366) 새 주문·소리·깜빡임·제목 '(1)' · (가) 브라우저 인쇄 → `window.print` 1번, 영수증 80mm(576px) · (나) 인쇄 안 함 → print 0번 · 접수→만드는 중→완료 · 주방 폰 폭 · admin PC·폰 폭 넘침 0, 화면 오류 0.
- 캡처: `docs/kitchen-test/guest-sheet.png`(손님 주문서) · `ga-2-new.png`(새 주문) · `ga-ticket-80mm.png`(영수증 그림) · `na-3-done.png`(인쇄 없이 완료) · `admin-pc.png`.
- **발견**: (나) '인쇄 안 함'이어도 주문 카드에 `🖨 인쇄` 버튼이 그대로 보이고 눌러도 아무 일이 없다(`sales/kitchen/index.html` `card()`). 고칠지 캡틴 결정 대기.
- **미확인**: 실제 프린터 출력(USB·LAN·RawBT), 아이폰 소리, 실서버(Vercel Blob)에서의 흐름, admin '테이블 QR로 들어온 손님만' + 카드 인쇄 흐름(실서버에서 캡틴이 확인).

## 배포 기록 (2026-11-15)
- 커밋 `32445f7`(main 합침) → 새 프로젝트 `testshop-menu`(로그인 보호 해제, `testshop.qrmenuasia.com` 붙임) + `qrmenu-intro` 재배포(admin `kitchen.js` 시험 가게 줄, owner-panel 미배포분 `2dc9c94` 진미 카드 자료 포함).
- 확인: `https://testshop.qrmenuasia.com/?t=1` 200·noindex·폰 폭 넘침 0(`docs/kitchen-test/live-phone.png`, 꺼져 있어 '주방으로 보내기' 숨김 = 정상) · `GET /api/order?shop=testshop` → `{on:false}` · 꺼진 상태 주문 POST → 409 · `/kitchen/?shop=testshop`·`/admin` 200 · 실서버 admin kitchen.js에 testshop 있음 · 사이트맵 148(저장소 파일과 같음, testshop 없음).
- **미확인**: 켠 뒤 `on:true`(admin 로그인이 필요해 캡틴이 켠 뒤 확인), 실제 폰 주문→주방 화면.

## 캡틴이 직접 할 일 (배포 뒤, 한 단계씩)
> 비밀번호·PIN 입력과 admin 로그인은 AI가 하지 않습니다. 캡틴이 직접 합니다.

**1. 주방 주문 켜기 (PC)**
1. `https://qrmenuasia.com/admin` 열기 → 관리자 비밀번호로 로그인.
2. 위쪽 탭 **'주문·주방 기기'** 누르기 → 가게 칸에 **'QR 시험 식당 (시험용)'** 이 골라져 있는지 확인.
3. **'주방 주문' 켜기** → **저장**.
4. **'PIN 만들기'**(이미 있으면 'PIN 새로 만들기') 누르기 → 나온 6자리 PIN을 적어 두기(복사 버튼 있음).
5. 프린터 기본값은 (가) 시험이면 `브라우저 인쇄`, (나) 시험이면 `인쇄 안 함`(기기마다 ⚙에서 바꿀 수 있어 그대로 둬도 됨).

**2. 주방 화면 열기 (PC)**
1. `https://qrmenuasia.com/kitchen/?shop=testshop` 열기.
2. PIN 6자리 입력 → 로그인 → **'주문 받기 시작'** 버튼(이걸 눌러야 소리가 납니다).
3. 오른쪽 위 **⚙** → 언어 `한국어`, 프린터 선택(아래 가·나), 용지 폭 `80mm` → 닫기.

**3. 폰으로 주문 넣기**
1. `test-qr.pdf`를 화면에 띄우거나 인쇄 → 폰 카메라로 **테이블 1** QR 찍기.
2. 메뉴에서 `+ 담기` 몇 개 → 아래 **주문서 보기** → 요청사항 적기 → **'주방으로 주문 보내기'**.
3. PC 주방 화면: '새 주문'에 **테이블 1** 카드가 깜빡이고 '띵동' 소리 → **접수** → '만드는 중' → **✓ 완료**.

**(가) 프린터 있는 가게**: ⚙ 프린터 = `브라우저 인쇄` → 카드의 **🖨 인쇄** → 윈도우 인쇄 창에서 영수증 프린터 고르기(용지 80mm, 여백 없음). 프린터가 없으면 'PDF로 저장'으로 모양만 확인.
**(나) 프린터 없는 작은 가게**: ⚙ 프린터 = `인쇄 안 함` → 주문은 소리·깜빡임·접수→완료만으로 처리. 소리를 끄고 싶으면 ⚙ '알림 소리' 해제(권하지 않음).

**4. '테이블 QR로 들어온 손님만' 시험 (선택)**
1. admin 같은 탭에서 '테이블 QR로 들어온 손님만' 켜기 → ③ **QR 카드 인쇄**(1~3번) → PDF로 저장.
2. 그 카드 QR로 주문 → 주방에 도착하는지. 열쇠 없는 `test-qr.pdf` QR로 주문하면 'QR을 다시 찍어 주세요'가 나와야 정상.

**5. 다 본 뒤 정리**
- admin 탭에서 '주방 주문' **끄기** + **'모든 기기 로그아웃'**. 주문 기록은 오늘·어제만 화면에 보이고 그 뒤엔 저절로 안 보입니다.
- 시험 가게 사이트를 아예 없애려면 캡틴에게 먼저 묻고 Vercel 프로젝트 `testshop-menu`를 지웁니다(삭제는 결재 대상).

## 배포 (캡틴이 "배포해"라고 한 뒤, `docs/deploy.md` 순서)
- 새 Vercel 프로젝트(`restaurants/testshop`) → 로그인 보호 해제 → `testshop.qrmenuasia.com` 서브도메인 연결(결제·도메인 구매 없음).
- `qrmenu-intro`도 배포(admin `kitchen.js` 시험 가게 줄). 사이트맵 주소 수는 그대로여야 함(시험 가게는 목록에 없음).
- 배포 뒤 확인: `GET https://qrmenuasia.com/api/order?shop=testshop` → 켜기 전 `on:false`, 켠 뒤 `on:true` · `https://testshop.qrmenuasia.com` 열림.
