# 사업용 대시보드 (`dashboard/`, 2026-10-27)

## 0단계 조사 — 제미나이가 만든 대시보드 (`바탕 화면\(7)제미나이 에이전트`, 읽기만 함)
1. 할당량·통계 숫자(Claude 주간 82%, Gemini 94% 등, 가게 18곳)는 `server.py`의 `/api/status`와 `templates/index.html`에 **손으로 적어 넣은 고정값**이다. 화면은 `/api/status`를 부르지도 않는다.
2. 할 일·결재·브리핑·활동은 `data/*.json` 샘플이다. 지시 입력은 낱말로 팀을 고르는 가짜 배정일 뿐 실제로 실행하지 않는다. 브리핑 새로고침도 고정 문장을 다시 쓴다.
3. `0.0.0.0`에 열고 CORS `*`를 허용한다. 같은 와이파이의 누구나 열고 POST할 수 있다. 정적 파일 경로를 검사하지 않아 `../` 경로로 다른 파일을 읽을 수 있다.
4. 저장소(`D:\qrmenu`)를 읽지 않는다. 가게·메뉴·`docs/todo.md`·git 기록과 연결되지 않았다. 사무실은 생성 이미지(`virtual_office.jpg`)라 책상별 상태를 보여 줄 수 없다.
5. bat이 폴더 경로를 cp949로 박아 두어 폴더를 옮기면 깨진다. 실제 외부 연결은 구글 지도 사진 수집기(`127.0.0.1:8765`) 확인 하나뿐이다.
- **할당량 출처**: 어디서도 가져오지 않았다. 읽는 파일·명령·API가 없다. 숫자를 사람이 직접 적었다.

## 할당량 실제 출처 (2026-10-27 확인)
- **Codex**: `~/.codex/sessions/<년>/<월>/<일>/rollout-*.jsonl`의 `token_count` 줄 안 `rate_limits`(primary/secondary의 `used_percent`·`window_minutes`·`resets_at`). 코덱스를 쓸 때마다 기록된다. 무료 요금제는 primary 하나(30일 창)만 있다.
- **Claude**: 로컬에 % 기록이 없다(`~/.claude`에는 대화 기록뿐). → 확인 불가. Claude 앱 입력창 아래 사용량 표시 또는 claude.ai 설정 → 사용량에서 본다.
- **Gemini(안티그래비티)**: `~/.gemini/antigravity-cli/cli.log`에 `doRefreshQuota`만 남고 숫자는 없다. → 확인 불가. 안티그래비티 앱의 모델 사용량(설정) 화면에서 본다.

## 사용법
`dashboard\start-dashboard.bat`을 두 번 누르면 서버가 켜지고 브라우저에 http://127.0.0.1:8899 가 열린다(이 PC에서만 열림, 검은 창을 닫으면 꺼짐). 첫 화면은 사무실이다. 책상을 누르면 옆 창에 맡은 일(CLAUDE.md 5장)·최근 한 일(git log)·할당량·'일 시키기'가 나온다. 바로 실행되는 것은 파일을 고치지 않는 점검 3가지(`check-standard`·`check-listing`·`shot`)뿐이고, 실행 중에만 그 책상 모니터가 켜진다. 캡처는 `dashboard/out/`(git 제외)에 저장된다. 나머지 일은 '복사' 버튼으로 문장을 복사해 Claude 대화에 붙여 넣는다. 배포·삭제·push 버튼은 없다. 아래 탭은 가게 현황(`sales/stores/data.js`·`restaurants/*/menu.js`·`docs/stores.md`·git)·할 일(`docs/todo.md`)·방문 기록이다. 방문 기록은 관리자 비밀번호가 필요해 기본은 '연결 필요'이고, 사용자가 직접 Windows 환경변수 `QRMENU_ADMIN_KEY`를 넣으면 `qrmenuasia.com/api/stats`(30일)를 읽는다. 할당량은 Codex만 실제 기록(`~/.codex/sessions`)이 있고, Claude·Gemini는 '확인 불가'와 확인하는 법을 보여 준다. 80% 이상은 주황 '조심', 90% 이상은 빨강 '새 일 금지'. 화면을 고칠 때는 `dashboard/static/`(index.html·style.css·app.js), 데이터는 `dashboard/server.py`·`collect.mjs`를 고친다.

## 사무실 사진 (2026-10-27)
사무실 그림은 사용자가 ChatGPT로 만든 사진 2장이다(`dashboard/static/rooms/office.jpg` PC용 가로, `office-phone.jpg` 폭 700px 이하 세로, 원본 png는 git 제외). 간판 글자와 사람별 누르는 자리는 `static/app.js`의 `SCENES`에 사진 대비 % 좌표로 적혀 있다. 사진을 바꾸면 좌표도 다시 잰다(격자를 그린 사본을 보고 [x1, y1, x2, y2]). 인력공급팀·선별팀(`SOON`)은 사업 전이라 커서를 올리면 '준비 중'만 보이고 눌러도 아무것도 하지 않는다. 사업을 시작하면 `M`·`PROMPTS`에 담당을 추가하고 `SOON`에서 뺀다. 점검이 실행 중인 사람 자리는 파란 빛과 '작업 중…' 말풍선이 깜빡인다.

## 할당량 게이지 출처 갱신 (2026-10-27 오후)
- **Gemini(안티그래비티)**: 안티그래비티 앱이 켜져 있으면 로컬 `language_server.exe`의 `GetUserStatus`(https://127.0.0.1:<포트>, 자체 서명)를 읽기만 한다. 모델별 `remainingFraction`·`resetTime` → Gemini Flash(5시간)·Argon(주간)·안티그래비티 안 Claude·GPT로 묶어 보여 준다. 접속 확인값(`--csrf_token`)은 프로세스 실행 인자에서 그때그때 읽고 저장·출력하지 않는다. 앱이 꺼져 있으면 '확인 불가'.
- **Claude**: Claude Code 상태줄(statusLine) 입력 JSON에 `rate_limits.five_hour/seven_day`(`used_percentage`·`resets_at`)가 들어온다(2.1.308 실행 파일에서 확인). `dashboard/claude-usage.mjs`를 상태줄 명령으로 걸면 `~/.claude/qrmenu-usage.json`에 남고 대시보드가 읽는다. 2026-10-27 사용자 승인으로 `~/.claude/settings.json`(새로 만듦)에 `statusLine` 명령을 걸었다. 끄려면 그 파일에서 `statusLine`을 지운다. **데스크톱 앱 Code 탭은 상태줄을 돌리지 않는다**(2026-10-27 확인: 설정 후 이 세션에서 여러 번 대화해도 파일이 안 생김). 터미널 `claude`에서 대화할 때만 기록된다.
- **ChatGPT(Codex)**: 그대로 `~/.codex/sessions` 기록(무료 요금제는 30일 창 하나).
- **사진 수집기**: `D:\구글지도 사진 자동화\qrmenu_photos.py`(127.0.0.1:8765)의 `/api/state`·`/api/history`를 읽어 사진팀 옆 창에 보여 주고, 수집 중이면 사진팀 자리에 불이 켜진다. 꺼져 있으면 '수집기 켜기'로 `run_dashboard.bat`을 새 창에서 연다. 수집 시작·저장은 수집기 화면에서만 한다.
- **가게 현황**: 최근 수정한 12곳만 먼저 보이고 '전체 N곳 보기'로 펼친다. 검색하면 전부에서 찾는다.

## 숫자 기준 고침 (2026-10-27 저녁)
- **할 일 수** = `docs/todo.md`의 `- **…**` 줄 수(지금 60건). 예전엔 줄 안의 문장을 셌고 괄호 `)` 뒤에서도 잘라 304로 부풀었다. 문장 나누기(`split_sentences`)는 괄호 안·괄호 뒤에서 자르지 않고, 할 일 탭에 보여 줄 때만 쓴다.
- **최근 수정 순서** = 커밋 안 한 수정이 있는 가게 먼저, 그다음 마지막 커밋 **시각**(분까지). 파일 수정 시각은 브랜치를 바꿀 때마다 모든 파일에 새로 찍혀서(예: 10-27 09:07에 전부) 기준으로 쓰지 않는다. 한 커밋에 여러 가게가 들어 있으면 같은 시각이 된다.
- `server.py`를 고친 뒤에는 대시보드 검은 창을 닫고 다시 켜야 반영된다(화면 파일 `static/`은 새로고침만 하면 됨).

## 휴대폰에서 열기 — Tailscale (2026-10-27)
- 대시보드를 켜면 PC 화면용(127.0.0.1:8899)과 별도로 **이 PC의 Tailscale 주소(100.x)에만** 포트 8900을 연다. 같은 와이파이·인터넷에서는 안 열린다. 폰 주소: `http://desktop-o8iem05:8900`(또는 `http://100.74.49.87:8900`).
- PIN은 **사진 수집기와 같다**(`~/.qrmenu_photos/settings.json`의 pin_hash를 읽기만 함). 쿠키는 포트를 가리지 않아서, 폰이 수집기(8766)에 PIN을 넣었으면 대시보드도 바로 열린다. 수집기에서 PIN을 바꾸면 다시 넣어야 한다. 5번 틀리면 5분 막힌다.
- 수집기에 PIN이 없으면 폰 접속을 열지 않는다. 폰에서 연 대시보드의 '수집기 화면 열기'는 수집기 폰 주소(8766)로 간다.
- 폰에서도 PC와 같은 일(점검 3가지 실행, 수집기 켜기)만 된다. 배포·삭제·push는 여전히 없다.
- 폰 Tailscale에 'DNS unavailable' 경고가 뜨면 이름(`desktop-o8iem05`)이 안 풀릴 수 있다 → **IP 주소 `http://100.74.49.87:8900`**로 연다(2026-10-27).
- 제미나이 대시보드(`바탕 화면\(7)제미나이 에이전트\server.py`)가 **같은 8899를 0.0.0.0으로** 쓰며 켜져 있을 수 있다. 폰에서 `:8899`로 열면 그쪽이 나온다. 우리 폰 주소는 `:8900`.
