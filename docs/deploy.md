# 배포·main 머지 순서 (2026-11-05 CLAUDE.md 3장에서 옮김)

> **배포하거나 main에 합치기 직전에 반드시 읽는다.** 사건 상세는 `docs/mistakes.md` 2026-10-22 장수천 건. 도구 원문은 `docs/tools.md`.

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
- **배포 뒤 '완료' 보고 전에 `https://<가게>.qrmenuasia.com`이 실제로 열리는지 본다**(vercel.app 주소만 보지 않음, 2026-10-31 구이구이 도메인 빠짐 건).
- **도메인 `qrmenuasia.com`**:
  - 2026-10-18 Vercel에서 구매했다. 팀 jinwoo8, 자동 갱신, 등록자 JEON JIN WOO.
  - 가게는 `<가게>.qrmenuasia.com`, 소개서·가게 찾기는 `qrmenuasia.com`.
  - 옛 `*.vercel.app` 주소도 계속 열린다. 이미 인쇄한 QR은 그대로 두고, 새로 인쇄하는 것부터 새 주소를 쓴다.
- **비용**: 돈은 주로 배포(Build CPU)에서 든다. 고칠 것을 모아 한 번에 배포한다. 사주 사이트 `myeongwol`은 main만 빌드한다(Ignored Build Step).
- **"main 머지해줘"**:
  1. 다른 세션의 열린 PR·브랜치와 충돌이 없는지 확인한다.
  2. squash 머지한다. **PC 로컬 세션은 `gh`가 없으니 PR 없이**(사용자 결정 2026-10-28): `git checkout -B merge-tmp origin/main` → `git merge --squash <작업 브랜치>` → 커밋 제목 끝에 `(<브랜치> squash)` → `git push origin HEAD:main`. 클라우드 세션은 PR을 만들어 squash 머지해도 된다.
  3. 작업 브랜치를 `origin/main`으로 리셋한다(원격에 있으면 `--force-with-lease`로 푸시). `merge-tmp`는 지운다.
  4. 보고에 "main이 바뀌면 `myeongwol`이 다시 빌드됨(평소 일)"을 한 줄 적는다.
