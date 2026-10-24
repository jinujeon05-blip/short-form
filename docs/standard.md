# 메뉴판 표준 = 가마솥 (사용자 지시 2026-10-24)

기준 가게: `restaurants/gamasot` (https://gamasot.qrmenuasia.com/?lang=ko). 가마솥은 실제 메뉴판·간판·색을 바탕으로 만든 표준이다.
**새 가게는 항상 이 구조로 만든다.** 다른 가게(하루·꽃돼지·짜장도둑 등 큰 hero 사진형)를 복사하지 않는다.

## 만드는 순서
1. `node tools/new-shop.mjs <가게id> <listing|full> <logo|sign>`: 가마솥에서 복사하고, 공용 파일은 `_shared`에서 가져온다.
   - `listing` = 가게 찾기용: `order.js`를 빼고, 하단 줄에 5개 언어 '구글 지도' 문구가 자동으로 들어간다.
   - `full` = 정식: 장바구니·주문서가 들어간다.
   - `logo` = 가게 로고 `img/logo.png`. `sign` = 로고가 없을 때 간판이 보이는 사진 `img/sign.jpg`(16:9로 잘림).
2. 아래 **바꾸는 것**만 가게에 맞게 바꾼다. **구조는 그대로 둔다.**
3. 등록한다. 대상은 `_shared/sync-lang.sh`·`sync-dasan.sh`·`sync-stores.sh`(가게 찾기용)·`sync-home.sh`(sync-lang을 따라감), `tools/seo.mjs`, `tools/export.sh`, `sales/stores/data.js`, `node tools/demo.mjs <가게>`, `node tools/analytics.mjs`.
4. `node tools/check-standard.mjs <가게id>`와 `node tools/check-listing.mjs`가 둘 다 통과해야 한다. 그다음 `node tools/shot.mjs <가게>`로 화면을 확인하고, reviewer 담당이 점검한다.

## 화면 구조 (위→아래, 바꾸지 않는다)
1. **왼쪽 위**: QR MENU 동그란 버튼(`qr-home.js`). **오른쪽 위**: 언어 버튼(`lang-menu.js`).
2. **맨 위 그림**: 로고가 있으면 **로고**, 없으면 **간판이 보이는 가게 사진**.
   - 로고는 수집기가 '기타'로 분류한 사진에도 있다. 모음 이미지(contact sheet)로 전부 보고 찾는다.
3. **가게 이름** `h1`(한글) + 영문 이름 `.en`.
4. **한 줄 소개** `tagline` + **특징 칩** `chips`(포장·배달 등). 메뉴판·간판에 있는 사실만 쓴다.
5. **분류 탭** `nav`: 위에 붙어 따라오고, 스크롤에 맞춰 강조된다.
6. **분류마다**:
   - 제목(현재 언어 + 아래 작은 글씨로 베트남어, 한국어 화면이면 한국어)
   - 안내 `note`(있을 때만)
   - 메뉴 줄
   - 팁 `tip`(있을 때만)
7. **메뉴 줄**:
   - 왼쪽에 사진(4:3 칸, 누르면 확대). 사진이 없으면 칸도 없다.
   - 태그: Must Try·BEST·스페셜·🌶 매운.
   - 이름 ……… 가격. S/L 등 크기별 가격은 `sizes`, 시가는 `price: null`.
   - 설명.
   - 둘째 언어 이름.
   - 정식은 '담기' 버튼이 붙는다(`order.js`).
8. **가게 정보** `footer`:
   - 인사 문구 `quote`
   - 와이파이(있을 때만)
   - 전화 · 주소·지도
   - **가격 단위 줄**(가게 찾기용은 끝에 '구글 지도에 올린 메뉴판 기준…' 5개 언어)
9. **다산 파트너 배너**(`dasan.js`, 색은 `partner-theme`) → **가게 더 보기**(`stores-link.js`).
10. 점주 편집 반영(`api/override?shop=<가게>`) → 방문 기록(`api/hit`, analytics 블록).

**이 밖의 요소는 넣지 않는다.** 예: 맨 아래 사진, 별도 문구 상자, hero 큰 사진, 새 버튼. 꼭 필요해 보이면 배포 전에 사용자에게 먼저 묻는다.

## 바꾸는 것 (가게 느낌에 맞춰, 사용자 지시 2026-10-22)
- **색**: `:root`의 `--paper`·`--band`·`--ink`·`--rust`·`--gold` 등과 `partner-theme`(다산 배너 색)을 바꾼다. 메뉴판·간판 색에서 뽑는다.
  - 주점은 어둡고 세련되게, 분식은 밝고 가볍게.
- **머리 장식**: 가마솥의 물결 무늬·모서리 선 자리에, 가게 메뉴판의 무늬를 쓰거나 장식을 뺀다. **크기·위치 구조는 그대로 둔다.**
- **글자**:
  - `<title>`·`description`·`theme-color`·`h1`·`.en`
  - `UI`의 `tagline`·`chips`·`quote`·`call`(배달이 없으면 '전화 · 예약')
  - 지도 검색어는 `R.brand.en`을 자동으로 쓴다.
- **글꼴**: 본문 글꼴 하나로 통일한다(사용자 지시 2026-10-24). 가마솥은 분류 제목 아래·둘째 언어 이름에 Georgia를 쓰지만, 새 가게는 쓰지 않는다. `new-shop.mjs`가 자동으로 빼고, `check-standard.mjs`가 섞임을 오류로 잡는다. 웹 글꼴도 섞지 않는다.
- **이미 완성된 가게**(가마솥 포함)는 그대로 둔다(사용자 지시 2026-10-24).

## 데이터 (`menu.js`, 형식은 가마솥과 같음)
- `RESTAURANT`: `brand{ko,en}`·`phone`·`address`·`wifi`(없으면 null).
- `MENU`: 분류 `{id, name{5개 언어}, note?, tip?, items}`.
  - 메뉴는 `{name{5개 언어}, desc?, price | sizes, tag?, spicy?, photo?, unit?}`.
- 메뉴판 사진끼리 가격이 다르면 **높은 쪽**을 쓰고, 그 사실을 `docs/todo.md`에 적는다.
- 사진: 그 요리의 **고화질 사진만**(긴 변 640px 정도) 쓴다.
  - **메뉴판 속 작은 그림을 잘라 쓰지 않는다.** 맞는 사진이 없으면 사진을 빼고, 다른 요리 사진을 돌려 쓰지 않는다.
  - 가마솥처럼 사장님 메뉴판 PDF 원본 사진(투명 배경)이 있으면 그것을 쓴다.

## 표준 이전 가게
짜장도둑·만냥포차 등 2026-10-24 이전 가게는 hero 사진형이라 `check-standard.mjs`의 구조 항목에서 걸린다. **그대로 둔다**(사용자 지시 2026-10-24: 현재까지 완료된 것은 그대로). 표준은 새 가게부터 적용한다.
