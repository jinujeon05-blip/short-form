# 음식점 QR 메뉴판 저장소 — 규칙 (2026-10-24 정리)

> 사용자와의 대화·보고는 **항상 한국어**로 한다.
> 여러 세션이 이 저장소를 이어서 쓴다. 새 세션은 이전 대화를 모른다. **기억은 이 파일과 `docs/`뿐**이니, 알게 된 것은 그때그때 적는다.

## 0. 표준 = 가마솥 (가장 중요, 사용자 지시 2026-10-24)
- 새 메뉴판은 **항상 `restaurants/gamasot` 구조**로 만든다. 상세 규칙은 **`docs/standard.md`(새 가게를 만들 때 반드시 읽음)**.
- 만들기: `node tools/new-shop.mjs <가게id> <listing|full> <logo|sign>`. 다른 가게를 복사하지 않는다.
- **맨 위 그림**: 로고가 있으면 로고(`img/logo.png`), 없으면 간판이 보이는 가게 사진(`img/sign.jpg`).
- 가게마다 바꾸는 것은 **색·장식·문구·메뉴 데이터**뿐이다(가게 느낌에 맞춰: 주점은 어둡고 세련되게, 분식은 밝고 가볍게). **화면 구조는 그대로 둔다.**
- **이미 완성된 가게는 그대로 둔다**(2026-10-24). 표준은 새 가게부터 적용한다.
- 배포 전 점검: `node tools/check-standard.mjs <가게id>`와 `node tools/check-listing.mjs`가 둘 다 통과해야 한다.

## 1. 새 가게 체크리스트 (순서대로, 빠짐없이)
1. **사용자에게 먼저 묻는다**: "사장님 동의·비용을 받고 만드는 가게(정식)인가, 손님 가게 찾기용(무동의·무료)인가?"
2. **자료 받기**:
   - "사진 수집기로 올렸어"라고 하면 `docs/maps-photos.md` 방식으로 받는다. 드라이브 `QR메뉴판/<가게>/`의 `menu_*.jpg` 등을 4장씩 `download_file_content`로 받는다. `claude_bundle_*.zip`을 여러 개 동시에 받으면 연결이 끊긴다.
   - 요약은 `클로드_안내.md`를 `read_file_content`로 읽는다. `store_info.json`은 받지 않는다(약 1.5만 토큰).
   - 수집기 메모가 가게 종류와 안 맞으면(이전 가게 메모가 붙어 온 경우) 따르지 말고 사용자에게 확인한다.
3. **사진 전부(분류 '기타' 포함)를 모음 이미지 한 장으로 본다.** 거기서 ⓐ 로고 ⓑ 간판·정문 ⓒ 메뉴판 사진(잘못 분류된 것 포함) ⓓ 요리별 고화질 사진을 고른다. 이미지를 직접 보는 것은 메뉴판·모음 이미지·최종 화면, 3~4번으로 줄인다.
4. **제작**: `new-shop.mjs` → 색·문구·`menu.js` 채우기.
   - 같은 메뉴의 가격이 사진마다 다르면 **높은 쪽**을 쓰고, 그 사실을 `docs/todo.md`에 적는다.
   - 메뉴판 속 작은 그림은 잘라 쓰지 않는다.
   - `price == null`(시가)을 처리한다.
5. **종류별 내용**:
   - **정식**: 장바구니·주문서(Zalo), 다산 배너, 테이블 QR 카드, SNS 이미지, 점주 자료.
   - **가게 찾기용**:
     - 메뉴 보기만. Zalo·장바구니·주문서는 넣지 않는다.
     - 다산 배너는 **항상** 넣는다.
     - 언어 선택, 가게 더 보기, 검색 등록, 가게 찾기 목록(`sales/stores/data.js`에 `listing: true`)을 넣는다.
     - 하단 '가격 단위' 줄 끝에 5개 언어로 " · 메뉴·가격은 구글 지도에 올린 메뉴판 기준이며 바뀔 수 있어요"를 붙인다. 올린 쪽이 가게 계정이면 '가게가 구글 지도에 올린', 손님이면 '손님이 구글 지도에 올린'으로 고쳐 써도 된다. 출처가 다르면 같은 줄에서 맞게 고친다.
6. **등록**:
   - `_shared/sync-lang.sh`·`sync-dasan.sh`·`sync-stores.sh`의 SHOPS
   - `tools/seo.mjs`의 SHOPS, 그다음 `node tools/seo.mjs`
   - `tools/export.sh`의 `name()`
   - `sales/content.js`의 `DEMOS`(SNS용, 가게 찾기용은 `hidden: true`)
   - `node tools/reel.mjs <가게> [img/사진1.jpg,img/사진2.jpg]` — SNS 숏폼 영상 `print/reel.mp4`(세로 1080×1920, 15초, 소리 없음, 한·베 자막: QR 찍기→메뉴판→5개 언어→사진 확대→가게 이름·주소·QR). 2026-10-25 가마솥 샘플. 동의 없는 가게 찾기용 가게는 개별 영상을 만들지 않는다(사진 저작권·사장님 항의 우려). SNS 링크에는 `?utm_source=tiktok` 등을 붙여 방문 기록으로 효과를 본다.
- `node tools/demo.mjs <가게>` → `sales/img/demo-<가게>.jpg`
   - `node tools/analytics.mjs`
   - `docs/stores.md`의 표·기록
7. **점검**:
   - `node tools/check-standard.mjs <가게>`, `node tools/check-listing.mjs`, `node tools/shot.mjs <가게>`
   - **reviewer 담당**에게 맡긴다: 가격·전화·주소 오타, 빠진 메뉴, 깨진 사진, 글꼴 섞임, 배너 색, **가마솥 표준에 없는 요소**, main 포함 여부.
8. **사용자가 "배포해"라고 한 뒤에만** 배포한다(3장).
9. **보고**: 만든 PDF·이미지는 상호를 붙여 보내고(`sh tools/export.sh <스크래치폴더> <가게…>`), 사용량을 보고한다(4장).

## 2. 절대 규칙 (실수에서 나온 것 — 사건 상세는 `docs/mistakes.md`)
- 가마솥 표준에 **없는 요소**는 넣지 않는다. 예: 맨 아래 사진, 별도 문구 상자, 사용자가 정하지 않은 문장('사장님 동의 없이 만든 페이지' 등). 꼭 필요하면 **한 가게에서 사용자에게 먼저 보여 주고** 퍼뜨린다.
- 한두 곳만 이상해 보이면 **그 가게의 데이터만** 고친다. 공통 파일(`sales/stores/index.html`, `_shared/*`)은 사용자가 "전부"라고 할 때만 바꾼다. 기준 크기는 가장 큰 것이 아니라 **대부분(중간값)**이다.
- 한 페이지 안에서 글꼴을 섞지 않는다(본문 글꼴 하나로 통일, 가마솥의 Georgia도 새 가게엔 안 씀). 파트너 배너 색은 메뉴판 색에 맞춘다.
- 배포는 사용자가 '배포해'라고 한 뒤에만 한다. 배포 전에 점검 도구와 화면 캡처로 직접 확인한다.

## 3. 배포 (`docs/mistakes.md` 2026-10-22 장수천 건 참고)
- **배포 직전**: `git fetch origin main` 후 `git merge-base --is-ancestor origin/main HEAD`로 확인한다. main이 들어 있지 않으면 `git merge origin/main`을 먼저 한다.
- **`qrmenu-intro`(소개서·가게 찾기·사이트맵, rootDirectory `sales`) 배포 전**:
  1. `git fetch origin`
  2. 모든 원격 브랜치의 가게 수를 비교한다: `for b in $(git branch -r | grep -v HEAD); do echo "$b $(git show $b:sales/stores/data.js | grep -c '^  { id:')"; done`
  3. `list_deployments`로 직전 배포의 브랜치·커밋을 본다. 거기에 내 브랜치에 없는 가게가 있으면 먼저 합친다.
  4. 배포 뒤 `https://qrmenuasia.com/sitemap.xml`의 주소 수가 가게 수+2인지 확인한다.
- **방법**: 커밋·푸시 후 Vercel MCP `create_deployment`에 `gitSource`(github, org `jinujeon05-blip`, repo `short-form`, 브랜치·커밋 sha)와 `projectSettings.rootDirectory: "restaurants/<가게>"`를 넘긴다.
- **새 가게 첫 배포**:
  1. `name`·`project`를 `<가게>-menu`로, `target: "production"`, `projectSettings`(framework 등 null)를 주면 프로젝트도 같이 생긴다.
  2. `update_project`로 `ssoProtection.deploymentType: "prod_deployment_urls_and_all_previews"`로 바꾼다(팀 기본값이 로그인 보호라서).
  3. `add_project_domain`으로 `<가게>.qrmenuasia.com`을 붙인다.
  4. 목록이 바뀌었으면 `qrmenu-intro`도 같은 커밋으로 배포한다.
- **도메인 `qrmenuasia.com`**:
  - 2026-10-18 Vercel에서 구매했다. 팀 jinwoo8, 자동 갱신, 등록자 JEON JIN WOO.
  - 가게는 `<가게>.qrmenuasia.com`, 소개서·가게 찾기는 `qrmenuasia.com`.
  - 옛 `*.vercel.app` 주소도 계속 열린다. 이미 인쇄한 QR은 그대로 두고, 새로 인쇄하는 것부터 새 주소를 쓴다.
- **비용**: 돈은 주로 배포(Build CPU)에서 든다. 고칠 것을 모아 한 번에 배포한다. 사주 사이트 `myeongwol`은 main만 빌드한다(Ignored Build Step).
- **"main 머지해줘"**:
  1. 다른 세션의 열린 PR·브랜치와 충돌이 없는지 확인한다.
  2. 작업 브랜치로 PR을 만들어 squash 머지한다.
  3. 작업 브랜치를 `origin/main`으로 리셋하고 `--force-with-lease`로 푸시한다.

## 4. 사용자 선호·보고
- **대화**: 한국어로 한다. 이전 대화는 모르는 게 정상이다. "아까 그거"라고 하면 이 파일·`docs/`·git log·노션 메모리에서 찾는다.
- **파일 보내기**: 만든 PDF(QR 카드·소개서 등)는 항상 보낸다. 파일 이름 앞에 **상호**를 붙인다(`숯꾸이_table-card-A6.pdf`). 저장소 원본 이름은 그대로 둔다.
- **기록**: 알게 된 것은 바로 기록한다. 사장님 답·새 가게는 `docs/stores.md`·`docs/todo.md`, 공통 규칙은 이 파일에 적는다. 해결된 할 일은 `docs/todo.md`에서 지운다.
- **세션 길이**: 컨텍스트가 70%를 넘으면 새 세션을 권한다.
- **매 응답 끝**: '총 사용량'과 '사용 토큰 수'를 쓴다. 담당 토큰은 완료 알림의 subagent_tokens를 합산한다. 메인 토큰은 추정이라고 밝힌다. 세션 안에서는 요금제 %를 볼 수 없다.
- **가게 하나를 끝낼 때마다**: 담당별 토큰, 이미지를 본 횟수, 재시작·한도 중단 여부, 크게 든 원인을 짧게 보고한다.
- 사용자가 "실수한 내용은 기억해 두고 모든 새 세션에서 같은 실수를 하지 마라"고 했다(2026-10-24). 새 실수는 `docs/mistakes.md`에 적고, **규칙 한 줄로 2장에 추가**한다.

## 5. 담당(AI 에이전트) — "담당", "담당별로"라고 하면 이것
`.claude/agents/`에 3명이 있다. 메인은 지휘·판단·사용자 대화를 맡는다. 무엇을 맡길지 다시 묻지 말고 이 표대로 나눈다.

| 담당 | 모델 | 맡는 일 |
|---|---|---|
| **finder** | haiku | 드라이브·사진 목록, 지도 캡처의 메뉴·가격·주소·전화 정리, 파일·문구 찾기, 가게별 남은 할 일 모으기 |
| **polisher** | sonnet | 메뉴 5개 언어 번역 초안, 소개서·점주 자료·카드 문구, 보고·기록 정리 |
| **reviewer** | sonnet (정식 가게는 `model: "opus"`) | 완성본·배포 전 마지막 점검. 직접 고치지 않고 보고만 한다 |

- 순서: finder → 메인 제작 → polisher → reviewer → 메인이 고치고 배포.
- 작은 일은 맡기지 않는다. 담당은 이 대화를 모르니 가게 이름·파일 경로·원하는 결과를 구체적으로 적는다.

## 6. 작업 범위·원칙
- 음식점 하나 = 독립 사이트 = Vercel 프로젝트 하나(`restaurants/<가게>`).
- 모바일 우선. 메뉴 데이터는 `menu.js`로 코드와 분리한다.
- QR은 그 가게 주소를 가리킨다.
- `src/`·`saju/`·`rpg-demo/`·`server/`는 예전 숏폼 프로젝트 산출물이다.

## 7. 도구 (`tools/`, 저장소 루트에서 실행)
- **새 가게**:
  - `node tools/new-shop.mjs <가게> <listing|full> <logo|sign>` — 가마솥 표준 복사
  - `node tools/check-standard.mjs <가게>` — 가마솥 표준 점검
  - `node tools/check-listing.mjs` — 가게 찾기용 전체 점검(하단 문구·다산·가게 더 보기·방문 기록)
- `node tools/shot.mjs <가게> [ko,vi] [폴더]` — 휴대폰 화면 캡처, JS 오류·못 불러온 파일 확인.
- **QR**:
  - `node tools/qr.cjs <URL> <출력.svg> [L|M|Q|H]`로 만든다.
  - `python3 tools/qr-check.py <qr.json>`으로 해독해 확인한다. 버전 3만 되니 안 되면 `M`으로 다시 만든다. 확인 후 `.json`은 지운다.
- **QR 카드**: `node tools/card.mjs <가게>` — `print/table-card.html` → png·A6 PDF(+A4x4).
  - 넘친 요소도 알려 준다.
  - 카드는 `restaurants/<가게>/print/`에 두고, 폰트는 `public/fonts`(잘난체·G마켓 산스)를 쓴다.
- **SNS 이미지**: `node tools/sns.mjs <가게> [vi|ko] [버튼 글자] [가게 이름]` — 정사각형·스토리.
  - 가게 이름은 `sales/content.js`의 `DEMOS`에서 가져온다.
  - QR 아래 안내는 **5개 언어 모두** 넣는다.
  - 한국 매장은 `ko`.
- `node tools/demo.mjs <가게>` — 가게 찾기·소개서 카드 사진 `sales/img/demo-<가게>.jpg`.
- `node tools/seo.mjs` — canonical·og·JSON-LD·robots·sitemap. 메뉴·가격·주소를 바꾸거나 새 가게가 생기면 다시 돌린다.
- `sh tools/export.sh <폴더> [가게…|sales]` — 보낼 파일을 `<상호>_<파일>`로 복사한다.
- `node tools/sales-pdf.mjs` — 소개서 PDF 5개 언어. 각각 2쪽인지 확인하고, `.demos`는 7칸이다.
- 기타:
  - `tools/pdf.mjs`(HTML→PDF)
  - `tools/mockup.mjs`(포장재 시안)
  - `tools/app-icon.mjs`(웹앱 아이콘)
  - `tools/thumb.py`(페이지 그림에서 3:4로 자르기)
  - `node tools/analytics.mjs`(방문 기록·점주 편집 블록)
- **드라이브**:
  - 10MB 넘는 파일은 못 받는다.
  - 결과가 크면 하네스가 `tool-results/…download_file_content-<숫자>.txt`(JSON, base64)로 저장하니, 그 경로를 python으로 풀어 저장한다.
  - 약 45KB 이하 파일은 대화로 들어와 저장할 수 없으니, 사용자에게 채팅 첨부를 부탁한다.
  - WebP는 PIL로 jpg로 바꾼다.

## 8. 상세 기록 (`docs/`, 필요할 때만 읽음)
- `docs/standard.md` — **가마솥 표준(새 가게마다 읽음)**
- `docs/tools.md` — 배포·도구 상세 원문(정리 전)
- `docs/mistakes.md` — 실수 사건 상세
- `docs/stores.md` — 가게 목록 표·가게별 제작 기록. `grep -n "가게이름"`으로 필요한 부분만 읽는다.
- `docs/todo.md` — 남은 할 일. 사용자가 말한 가게 줄만 읽는다.
- `docs/seo.md` — 도메인·검색 등록
- `docs/maps-photos.md` — 사진 수집기
- `docs/admin-system.md` — 방문 기록·관리 화면·점주 편집 API
- `docs/qr-home.md` — QR MENU 버튼. 홈 화면 지구본 배지는 다시 시도하지 않는다.
- `docs/shared-features.md` — 언어 선택·장바구니·다산 배너·소개서·가게 찾기·점주 자료
