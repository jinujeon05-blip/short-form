#!/bin/bash
# 새 세션이 시작될 때: 최신 main을 받아 작업 브랜치를 맞추고, 지금 상태를 요약해 Claude에게 알려 준다.
# (여기서 출력한 글은 세션 맨 앞에 들어간다. 공통 규칙은 CLAUDE.md, 가게 목록·남은 할 일은 docs/stores.md·docs/todo.md)
set -uo pipefail
[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || exit 0
cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

for i in 1 2 3; do git fetch -q origin main 2>/dev/null && break; sleep $((i * 2)); done
branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
ahead=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "?")
behind=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo "?")
dirty=$(git status --porcelain 2>/dev/null | grep -v '^??' | head -1)

echo "## 세션 시작 자동 점검 (.claude/hooks/session-start.sh)"
if [ "$behind" != "0" ] && [ "$behind" != "?" ] && [ "$ahead" = "0" ] && [ -z "$dirty" ]; then
  if git merge -q --ff-only origin/main 2>/dev/null; then
    echo "- 작업 브랜치 \`$branch\`가 main보다 ${behind}커밋 뒤처져 있어 최신 main으로 맞췄다 (fast-forward)."
  else
    echo "- ⚠️ \`$branch\`를 main으로 맞추지 못했다. 직접 \`git merge origin/main\` 할 것."
  fi
elif [ "$behind" != "0" ] && [ "$behind" != "?" ]; then
  echo "- ⚠️ \`$branch\`에 main에 없는 커밋 ${ahead}개가 있고 main보다 ${behind}커밋 뒤처졌다. 배포·머지 전에 \`git merge origin/main\` 먼저."
else
  echo "- 작업 브랜치 \`$branch\`는 최신 main을 포함한다 (main에 없는 커밋 ${ahead}개)."
fi
echo "- main 최근 커밋:"
git log --oneline -5 origin/main 2>/dev/null | sed 's/^/  - /'
echo "- 담당 4명(finder 찾기·menu-reader 메뉴판 읽기·polisher 글·reviewer 검토, .claude/agents)이 있다. \"담당별로\" 나누라는 말은 CLAUDE.md의 \"담당(AI 에이전트) 분담\" 표대로 나누는 것이다."
echo "- 다른 세션도 같은 저장소를 고친다. CLAUDE.md(공통 규칙·도구)와 docs/(가게 목록·남은 할 일)를 기준으로 이어서 일하고, **배포 직전에는 항상 \`git fetch origin main\` 후 main이 브랜치에 포함됐는지 확인**한다 (뒤처진 브랜치로 배포하면 다른 세션 작업이 사이트에서 사라진다)."
echo "- **표준 = 가마솥** (docs/standard.md): 새 가게는 \`node tools/new-shop.mjs <가게> <listing|full> <logo|sign>\`로 만들고(로고 있으면 로고, 없으면 간판 사진), 배포 전 \`node tools/check-standard.mjs <가게>\`·\`check-listing.mjs\` 통과. 표준에 없는 요소는 넣지 말고 먼저 묻기. 실수 규칙은 CLAUDE.md 2장."
exit 0
