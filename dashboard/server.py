#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""QR메뉴 사업용 대시보드 (127.0.0.1:8899 전용).

- 가짜 데이터 없음: 저장소 파일·git·CLI 기록을 요청 때마다 읽는다(짧게 캐시).
- 바로 실행하는 것은 안전한 점검 3가지(check-standard·check-listing·shot)뿐이다.
- 배포·삭제·git push 기능은 없다.
실행: python dashboard/server.py  (또는 start-dashboard.bat)
"""

import hashlib
import hmac
import ipaddress
import json
import os
import re
import socket
import ssl
import subprocess
import threading
import time
import urllib.request
import uuid
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, quote, urlparse

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
STATIC = HERE / "static"
OUT = HERE / "out"  # 점검 캡처 저장 (git 제외)
HOST, PORT = "127.0.0.1", 8899
HOME = Path.home()
SHOP_RE = re.compile(r"^[a-z0-9]+$")
NO_WINDOW = getattr(subprocess, "CREATE_NO_WINDOW", 0)


def sh(args, timeout=60, cwd=ROOT):
    """명령을 돌려 (종료코드, 출력) 을 돌려준다. 출력은 UTF-8."""
    try:
        p = subprocess.run(args, cwd=str(cwd), capture_output=True, timeout=timeout,
                           creationflags=NO_WINDOW, shell=False)
        out = (p.stdout or b"").decode("utf-8", "replace") + (p.stderr or b"").decode("utf-8", "replace")
        return p.returncode, out
    except FileNotFoundError:
        return 127, "명령을 찾을 수 없음"
    except subprocess.TimeoutExpired:
        return 124, "시간 초과"


def which(name):
    """PATH 에서 실행 파일 찾기 (윈도우 .cmd/.exe 포함)."""
    # 윈도우에서는 확장자 없는 파일(npm 의 sh 스크립트)을 건너뛴다
    exts = os.environ.get("PATHEXT", ".EXE;.CMD;.BAT").split(";") if os.name == "nt" else [""]
    for d in os.environ.get("PATH", "").split(os.pathsep):
        for e in exts:
            f = Path(d) / (name + e)
            if f.is_file():
                return str(f)
    return None


_cache = {}


def cached(key, ttl, fn):
    now = time.time()
    hit = _cache.get(key)
    if hit and now - hit[0] < ttl:
        return hit[1]
    val = fn()
    _cache[key] = (now, val)
    return val


def read(rel):
    f = ROOT / rel
    return f.read_text(encoding="utf-8") if f.exists() else ""


# ---------------------------------------------------------------- ① 가게 현황
def stores_md_kinds():
    """docs/stores.md 표에서 가게별 종류(정식/가게 찾기용)를 읽는다."""
    kinds = {}
    for line in read("docs/stores.md").splitlines():
        m = re.match(r"^\| `restaurants/([a-z0-9]+)` \|(.*)", line)
        if not m:
            continue
        rest = m.group(2)
        if "가게 찾기용" in rest:
            kinds[m.group(1)] = "listing"
        elif "정식" in rest:
            kinds[m.group(1)] = "full"
        else:
            kinds[m.group(1)] = None
    return kinds


def git_last_dates():
    """restaurants/<가게> 별 마지막 커밋 시각 'YYYY-MM-DD HH:MM' (git log 한 번으로).
    파일 수정 시각은 브랜치를 바꿀 때마다 전부 새로 찍혀서 순서 기준으로 쓰지 않는다."""
    code, out = sh(["git", "log", "--format=@%cd", "--date=format-local:%Y-%m-%d %H:%M", "--name-only", "--", "restaurants"], timeout=60)
    dates, cur = {}, None
    for line in out.splitlines():
        if line.startswith("@"):
            cur = line[1:]
        elif line.startswith("restaurants/"):
            shop = line.split("/")[1]
            dates.setdefault(shop, cur)
    return dates


def git_dirty_shops():
    """커밋 안 한 변경이 있는 가게."""
    code, out = sh(["git", "status", "--porcelain", "--", "restaurants"], timeout=30)
    return {m.group(1) for m in re.finditer(r"restaurants/([^/\s]+)/", out)}


def build_stores():
    code, out = sh(["node", str(HERE / "collect.mjs")], timeout=60)
    try:
        data = json.loads(out)
    except Exception:
        return {"error": "가게 데이터를 읽지 못함: " + out[:300], "stores": []}
    listed = {s["id"]: s for s in data["stores"]}
    kinds = stores_md_kinds()
    dates = git_last_dates()
    dirty = git_dirty_shops()
    rows = []
    for d in sorted((ROOT / "restaurants").iterdir()):
        if not d.is_dir() or d.name.startswith("_") or not (d / "index.html").exists():
            continue
        sid = d.name
        s = listed.get(sid, {})
        m = data["menus"].get(sid, {})
        kind = kinds.get(sid) or ("listing" if s.get("listing") else ("full" if s else None))
        img = d / "img"
        photos = sum(1 for f in img.iterdir() if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp")) if img.is_dir() else 0
        newest = max((f.stat().st_mtime for f in d.rglob("*") if f.is_file()), default=0)
        rows.append({
            "id": sid,
            "name": s.get("name") or m.get("brand") or sid,
            "sub": s.get("sub", ""),
            "kind": kind,
            "inStores": bool(s),
            "url": f"https://{sid}.qrmenuasia.com",
            "menuItems": m.get("items", 0),
            "menuCats": m.get("cats", 0),
            "menuError": m.get("error"),
            "photos": photos,
            "lastCommit": dates.get(sid),
            "lastFile": datetime.fromtimestamp(newest).strftime("%Y-%m-%d %H:%M") if newest else None,
            "dirty": sid in dirty,
            "demo": (ROOT / "sales/img" / f"demo-{sid}.jpg").exists(),
        })
    return {"stores": rows, "listedCount": len(listed), "dataError": data.get("dataError")}


# ---------------------------------------------------------------- ② 남은 할 일
def build_todo(stores):
    rows = {}
    for line in read("docs/stores.md").splitlines():
        m = re.match(r"^\| `restaurants/([a-z0-9]+)` \| ([^|]+)", line)
        if m:
            rows[m.group(1)] = m.group(2)
    alias = {s["id"]: " ".join([s["name"], s["sub"], rows.get(s["id"], "")]).lower() for s in stores}
    groups = []
    for line in read("docs/todo.md").splitlines():
        m = re.match(r"^- \*\*(.+?)\*\*(.*)", line)
        if not m:
            continue
        title, body = m.group(1), m.group(2).lstrip(" :：")
        key = re.split(r"[(（]", title)[0].strip().lower()
        shop = next((sid for sid, a in alias.items() if len(key) >= 2 and key in a), None)
        first = key.split()[0] if key.split() else ""
        if not shop and len(first) >= 3:
            shop = next((sid for sid, a in alias.items() if first in a), None)
        note = ""
        n = re.match(r"^\(([^)]*)\)\s*:?\s*(.*)", body)
        if n:
            note, body = n.group(1), n.group(2)
        groups.append({"title": title, "shop": shop, "note": note, "items": split_sentences(body)})
    return groups


def split_sentences(body):
    """한 줄에 여러 할 일이 '. ' 로 이어져 있으므로 문장 단위로 나눈다.
    괄호 안의 '. '·'?'와 괄호 닫힘 뒤에서는 자르지 않는다."""
    parts, start, depth = [], 0, 0
    for i, c in enumerate(body):
        if c in "(（":
            depth += 1
        elif c in ")）":
            depth = max(0, depth - 1)
        elif c in ".?" and depth == 0 and re.match(r"\s+[가-힣A-Za-z`'‘\"(]", body[i + 1:]):
            parts.append(body[start:i + 1])
            start = i + 1
    parts.append(body[start:])
    return [p.strip() for p in parts if p.strip()]


# ---------------------------------------------------------------- ③ AI 팀
def claude_md_section5():
    text = read("CLAUDE.md")
    m = re.search(r"^## 5\..*?(?=^## 6\.)", text, re.S | re.M)
    return m.group(0) if m else ""


def build_team():
    sec = claude_md_section5()
    roles = {}
    for line in sec.splitlines():
        m = re.match(r"^\| \*\*([\w-]+)\*\* \| ([^|]+) \| ([^|]+) \|", line)
        if m:
            roles[m.group(1)] = {"model": m.group(2).strip(), "job": m.group(3).strip()}
    bullets = [re.sub(r"\*\*", "", l[2:]).strip() for l in sec.splitlines() if l.startswith("- ")]
    agy_note = next((b for b in bullets if "안티그래비티" in b), "")
    codex_note = next((b for b in bullets if "코덱스" in b), "")
    lead = re.search(r"메인은 ([^.]+)\.", sec)

    def ver(cmd):
        path = which(cmd)
        if not path:
            return {"installed": False, "version": None}
        code, out = sh([path, "--version"], timeout=20)
        line = out.strip().splitlines()[0] if out.strip() else ""
        return {"installed": code == 0, "version": line if code == 0 else None, "error": None if code == 0 else line[:120]}

    tools = cached("tool-versions", 600, lambda: {"agy": ver("agy"), "codex": ver("codex")})
    return {
        "roles": roles,
        "leadJob": lead.group(1) if lead else "",
        "agyNote": agy_note,
        "codexNote": codex_note,
        "order": next((b for b in bullets if b.startswith("순서")), ""),
        "tools": tools,
    }


RECENT_KEYS = {
    "captain": None,
    "claude": None,  # 모든 커밋
    "finder": r"finder|사진 고르|모음 이미지",
    "agy": r"agy|안티그래비티",
    "menu-reader": r"menu-reader|메뉴 읽기|메뉴판 읽",
    "codex": r"codex|코덱스",
    "reviewer": r"reviewer|검토|점검",
    "polisher": r"polisher|번역",
}


def build_recent():
    code, out = sh(["git", "log", "-200", "--format=%h\t%cs\t%s"], timeout=30)
    commits = [l.split("\t", 2) for l in out.splitlines() if l.count("\t") >= 2]
    res = {}
    for who, pat in RECENT_KEYS.items():
        if who == "captain":
            continue
        rows = commits if pat is None else [c for c in commits if re.search(pat, c[2], re.I)]
        res[who] = [{"sha": c[0], "date": c[1], "msg": c[2]} for c in rows[:6]]
    return res


# ---------------------------------------------------------------- ④ 방문 기록
def build_visits():
    key = os.environ.get("QRMENU_ADMIN_KEY")
    how = ("방문 수는 qrmenuasia.com 의 /api/stats(관리자 비밀번호 필요)에서만 나온다. "
           "연결하려면 이 PC 사용자 환경변수 QRMENU_ADMIN_KEY 에 관리자 비밀번호를 직접 넣고 대시보드를 다시 켠다. "
           "지금은 https://qrmenuasia.com/admin → 방문 현황에서 본다.")
    if not key:
        return {"status": "연결 필요", "how": how}
    try:
        req = urllib.request.Request("https://qrmenuasia.com/api/stats?days=30", headers={"x-admin-key": key})
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.loads(r.read().decode("utf-8"))
        shops = {k: {"visitors": v.get("vis", 0), "views": v.get("pv", 0)} for k, v in data.get("shops", {}).items()}
        return {"status": "ok", "days": 30, "generatedAt": data.get("generatedAt"), "shops": shops}
    except Exception as e:
        return {"status": "연결 필요", "how": how, "error": str(e)[:200]}


# ---------------------------------------------------------------- ⑤ 할당량
def latest_codex_limits():
    base = HOME / ".codex" / "sessions"
    if not base.is_dir():
        return None
    files = sorted(base.rglob("rollout-*.jsonl"), key=lambda f: f.stat().st_mtime, reverse=True)[:10]
    for f in files:
        try:
            lines = f.read_text(encoding="utf-8", errors="replace").splitlines()
        except Exception:
            continue
        for line in reversed(lines):
            if '"rate_limits"' not in line:
                continue
            try:
                obj = json.loads(line)
            except Exception:
                continue
            rl = obj.get("payload", {}).get("rate_limits") or obj.get("rate_limits")
            if not rl:
                continue
            return {"limits": rl, "at": obj.get("timestamp"), "file": str(f.relative_to(HOME))}
    return None


def window_name(minutes):
    if not minutes:
        return "한도"
    if minutes <= 300:
        return "5시간"
    if minutes <= 10080:
        return "주간"
    return f"{round(minutes / 1440)}일"


def build_quota():
    now = time.time()
    codex = {"name": "Codex", "status": "확인 불가", "bars": [],
             "how": "코덱스를 한 번 쓰면 ~/.codex/sessions 기록에 사용량이 남는다."}
    got = latest_codex_limits()
    if got:
        rl = got["limits"]
        for k in ("primary", "secondary"):
            w = rl.get(k)
            if not w:
                continue
            reset = w.get("resets_at")
            codex["bars"].append({
                "label": window_name(w.get("window_minutes")),
                "used": round(float(w.get("used_percent", 0)), 1),
                "resetsAt": reset,
                "resetIn": max(0, int(reset - now)) if reset else None,
                "stale": bool(reset and reset < now),
            })
        codex.update(status="ok" if codex["bars"] else "확인 불가", plan=rl.get("plan_type"),
                     recordedAt=got["at"], source="~/.codex/sessions 기록", note="코덱스를 쓸 때만 새로 기록됨")
        if not codex["bars"]:
            codex["how"] = "기록에 한도 창이 없다. 코덱스 앱 /status 로 확인한다."
    return {
        "claude": claude_quota(now),
        "codex": codex,
        "gemini": gemini_quota(now),
        "checkedAt": datetime.now().strftime("%H:%M:%S"),
    }


CLAUDE_USAGE = HOME / ".claude" / "qrmenu-usage.json"  # dashboard/claude-usage.mjs(상태줄)가 쓴다


def claude_quota(now):
    """Claude Code 상태줄 입력의 rate_limits(5시간·주간)를 claude-usage.mjs 가 파일로 남긴 것을 읽는다."""
    q = {"name": "Claude", "status": "확인 불가", "bars": [],
         "how": "상태줄 설정은 걸려 있지만 데스크톱 앱(Code 탭)은 상태줄을 돌리지 않아 기록이 안 생긴다. "
                "터미널에서 claude 를 열어 한 번 대화하면 그때의 5시간·주간 %가 기록된다. "
                "그 전에는 Claude 앱 입력창 아래 사용량 표시나 claude.ai → 설정 → 사용량에서 본다."}
    try:
        d = json.loads(CLAUDE_USAGE.read_text(encoding="utf-8"))
    except Exception:
        return q
    for key, label in (("five_hour", "5시간"), ("seven_day", "주간")):
        w = (d.get("rate_limits") or {}).get(key)
        if not w:
            continue
        reset = w.get("resets_at")
        q["bars"].append({"label": label, "used": round(float(w.get("used_percentage", 0)), 1), "resetsAt": reset,
                          "resetIn": max(0, int(reset - now)) if reset else None, "stale": bool(reset and reset < now)})
    if q["bars"]:
        q.update(status="ok", recordedAt=d.get("at"), source="~/.claude/qrmenu-usage.json",
                 note="Claude Code를 쓸 때만 새로 기록됨")
    return q


def gemini_quota(now):
    """켜져 있는 안티그래비티 앱(language_server)에 남은 한도를 묻는다. 읽기만 한다.
    앱이 실행할 때 받은 접속 확인값(csrf_token)은 그 자리에서만 쓰고 저장·출력하지 않는다."""
    q = {"name": "Gemini (안티그래비티)", "status": "확인 불가", "bars": [],
         "how": "안티그래비티 앱을 켜 두면 여기에 나온다(앱이 꺼져 있으면 읽을 곳이 없다). 앱 설정의 모델 사용량 화면에서도 본다."}
    if os.name != "nt":
        return q
    code, out = sh(["powershell", "-NoProfile", "-Command",
                    "Get-CimInstance Win32_Process -Filter \"Name='language_server.exe'\" | "
                    "ForEach-Object { $_.ProcessId; $_.CommandLine }"], timeout=20)
    lines = out.strip().splitlines()
    if len(lines) < 2:
        return q
    pid, cmd = lines[0].strip(), lines[1]
    tok = re.search(r"--csrf_token[= ](\S+)", cmd)
    if not tok or not pid.isdigit():
        return q
    code, ports = sh(["powershell", "-NoProfile", "-Command",
                      f"(Get-NetTCPConnection -OwningProcess {pid} -State Listen).LocalPort"], timeout=20)
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE  # 자기 PC 안의 자체 서명 인증서
    data = None
    for port in [p.strip() for p in ports.splitlines() if p.strip().isdigit()]:
        try:
            req = urllib.request.Request(
                f"https://127.0.0.1:{port}/exa.language_server_pb.LanguageServerService/GetUserStatus",
                data=json.dumps({"metadata": {"ideName": "antigravity", "extensionName": "antigravity"}}).encode(),
                headers={"Content-Type": "application/json", "Connect-Protocol-Version": "1",
                         "X-Codeium-Csrf-Token": tok.group(1)})
            with urllib.request.urlopen(req, timeout=5, context=ctx) as r:
                data = json.loads(r.read().decode("utf-8")).get("userStatus")
            break
        except Exception:
            continue
    if not data:
        return q
    groups = {}
    for c in (data.get("cascadeModelConfigData") or {}).get("clientModelConfigs", []):
        qi, label = c.get("quotaInfo") or {}, c.get("label") or ""
        if "remainingFraction" not in qi:
            continue
        fam = re.sub(r"\s*\(.*\)$", "", label) if label.startswith("Gemini") else "Claude·GPT (안티그래비티 안)"
        used = (1 - float(qi["remainingFraction"])) * 100
        try:
            reset = datetime.fromisoformat(qi["resetTime"].replace("Z", "+00:00")).timestamp()
        except Exception:
            reset = None
        g = groups.setdefault(fam, {"used": 0, "reset": reset})
        g["used"] = max(g["used"], used)
    for fam, g in groups.items():
        left = g["reset"] - now if g["reset"] else None
        win = "5시간" if left is not None and left <= 5 * 3600 + 600 else "주간" if left is not None and left <= 7 * 86400 + 3600 else "한도"
        q["bars"].append({"label": f"{fam} {win}", "used": round(g["used"], 1), "resetsAt": g["reset"],
                          "resetIn": max(0, int(left)) if left is not None else None, "stale": False})
    q["bars"].sort(key=lambda b: (not b["label"].startswith("Gemini"), b["label"]))
    plan = ((data.get("planStatus") or {}).get("planInfo") or {}).get("planName")
    if q["bars"]:
        q.update(status="ok", plan=plan, recordedAt=datetime.now(timezone.utc).isoformat(),
                 source="안티그래비티 앱(로컬)", note="앱이 켜져 있을 때 1분마다 새로 읽음")
    return q


# ---------------------------------------------------------------- 사진 수집기 (D:\구글지도 사진 자동화)
COLLECTOR_DIR = Path(r"D:\구글지도 사진 자동화")
COLLECTOR_URL = "http://127.0.0.1:8765"


def collector_get(path):
    req = urllib.request.Request(COLLECTOR_URL + path)
    with urllib.request.urlopen(req, timeout=3) as r:
        return json.loads(r.read().decode("utf-8"))


def build_collector():
    res = {"installed": (COLLECTOR_DIR / "qrmenu_photos.py").exists(), "running": False, "url": COLLECTOR_URL}
    try:
        st = collector_get("/api/state")
    except Exception:
        return res
    job = st.get("job") or {}
    info = job.get("info") or {}
    res.update(running=True, version=st.get("version"), base=st.get("default_base"),
               job={"status": job.get("status"), "step": job.get("step"), "store": info.get("name"),
                    "photos": len(job.get("photos") or []), "log": (job.get("logs") or [])[-1:]} if job else None)
    # 최근 수집 목록: 사용자가 고른 저장 폴더(보통 드라이브 QR메뉴판) 기준
    saved = (job.get("saved") or {}).get("path")
    base = str(Path(saved).parent) if saved else (st.get("default_base") or "")
    try:
        res["history"] = collector_get("/api/history?base=" + quote(base))[:6]
    except Exception:
        res["history"] = []
    return res


def launch_collector():
    bat = COLLECTOR_DIR / "run_dashboard.bat"
    if not bat.exists():
        return "사진 수집기(run_dashboard.bat)를 찾지 못함"
    if build_collector()["running"]:
        return None
    subprocess.Popen(["cmd.exe", "/c", "start", "", str(bat)], cwd=str(COLLECTOR_DIR), shell=False)
    return None


# ---------------------------------------------------------------- 점검 실행
JOBS = {}
JOB_LOCK = threading.Lock()
SAFE = {
    "check-standard": {"label": "가마솥 표준 점검", "needsShop": True},
    "check-listing": {"label": "가게 찾기용 전체 점검", "needsShop": False},
    "shot": {"label": "휴대폰 화면 캡처", "needsShop": True},
}


def run_job(job):
    tool, shop = job["tool"], job.get("shop")
    if tool == "check-standard":
        args = ["node", "tools/check-standard.mjs", shop]
    elif tool == "check-listing":
        args = ["node", "tools/check-listing.mjs"]
    else:
        OUT.mkdir(exist_ok=True)
        args = ["node", "tools/shot.mjs", shop, "ko", str(OUT)]
    code, out = sh(args, timeout=300)
    images = []
    if tool == "shot":
        f = OUT / f"{shop}-ko.png"
        if f.exists():
            images.append(f"/out/{f.name}?t={int(time.time())}")
    with JOB_LOCK:
        job.update(status="ok" if code == 0 else "fail", code=code, output=out[-8000:],
                   images=images, endedAt=time.time())


def start_job(tool, shop, desk):
    if tool not in SAFE:
        return None, "바로 실행할 수 없는 일"
    if SAFE[tool]["needsShop"]:
        if not shop or not SHOP_RE.match(shop) or not (ROOT / "restaurants" / shop / "index.html").exists():
            return None, "가게를 골라 주세요"
    else:
        shop = None
    with JOB_LOCK:
        if any(j["status"] == "running" and j["tool"] == tool and j.get("shop") == shop for j in JOBS.values()):
            return None, "같은 점검이 이미 실행 중"
        jid = uuid.uuid4().hex[:8]
        job = {"id": jid, "tool": tool, "label": SAFE[tool]["label"], "shop": shop, "desk": desk,
               "status": "running", "startedAt": time.time()}
        JOBS[jid] = job
        # 오래된 기록 정리 (최근 20개만)
        for old in sorted(JOBS.values(), key=lambda j: j["startedAt"])[:-20]:
            JOBS.pop(old["id"], None)
    threading.Thread(target=run_job, args=(job,), daemon=True).start()
    return job, None


# ---------------------------------------------------------------- HTTP
MIME = {".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml"}
ALLOWED_HOSTS = {f"127.0.0.1:{PORT}", f"localhost:{PORT}"}


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def guard(self):
        # 다른 사이트가 이 주소로 우회(DNS 리바인딩)하지 못하게 Host 를 확인한다
        if self.headers.get("Host", "") not in ALLOWED_HOSTS:
            self.send_error(403)
            return False
        return True

    def json(self, data, code=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def file(self, f, base):
        try:
            f = f.resolve()
            f.relative_to(base.resolve())  # 폴더 밖 파일은 거절
        except Exception:
            return self.send_error(404)
        if not f.is_file():
            return self.send_error(404)
        data = f.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", MIME.get(f.suffix.lower(), "application/octet-stream"))
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if not self.guard():
            return
        u = urlparse(self.path)
        p = u.path
        if p in ("/", "/index.html"):
            return self.file(STATIC / "index.html", STATIC)
        if p.startswith("/static/"):
            return self.file(STATIC / p[len("/static/"):], STATIC)
        if p.startswith("/demo/"):
            return self.file(ROOT / "sales/img" / f"demo-{p[6:]}.jpg", ROOT / "sales/img")
        if p.startswith("/out/"):
            return self.file(OUT / p[5:], OUT)
        if p == "/api/stores":
            return self.json(cached("stores", 30, build_stores))
        if p == "/api/todo":
            st = cached("stores", 30, build_stores)["stores"]
            return self.json({"groups": build_todo(st)})
        if p == "/api/team":
            return self.json({**build_team(), "recent": cached("recent", 30, build_recent)})
        if p == "/api/visits":
            return self.json(cached("visits", 300, build_visits))
        if p == "/api/quota":
            return self.json(cached("quota", 60, build_quota))
        if p == "/api/collector":
            return self.json(cached("collector", 3, build_collector))
        if p == "/api/jobs":
            with JOB_LOCK:
                jobs = sorted(JOBS.values(), key=lambda j: -j["startedAt"])
                return self.json({"jobs": [dict(j) for j in jobs]})
        return self.send_error(404)

    def do_POST(self):
        if not self.guard():
            return
        # 다른 사이트의 폼 전송을 막으려고 직접 정한 머리글이 있어야만 받는다
        if self.headers.get("X-Dashboard") != "1":
            return self.send_error(403)
        length = min(int(self.headers.get("Content-Length") or 0), 10000)
        try:
            body = json.loads(self.rfile.read(length) or b"{}")
        except Exception:
            body = {}
        if urlparse(self.path).path == "/api/collector/launch":
            err = launch_collector()
            _cache.pop("collector", None)
            return self.json({"error": err} if err else {"ok": True}, 400 if err else 200)
        if urlparse(self.path).path == "/api/run":
            job, err = start_job(body.get("tool"), body.get("shop"), str(body.get("desk", ""))[:20])
            if err:
                return self.json({"error": err}, 400)
            return self.json({"job": job})
        return self.send_error(404)


# ---------------------------------------------------------------- 휴대폰(Tailscale) 접속
# 이 PC의 Tailscale 주소(100.x)에만 따로 연다. 같은 와이파이·인터넷에서는 안 열린다.
# PIN은 사진 수집기(~/.qrmenu_photos/settings.json)의 것을 그대로 쓴다. 쿠키는 포트를 가리지 않아서
# 휴대폰이 수집기에 PIN을 넣었으면 대시보드도 바로 열린다. 수집기에서 PIN을 바꾸면 여기도 다시 넣어야 한다.
REMOTE_PORT = PORT + 1  # 8900
TAILSCALE_NET = ipaddress.ip_network("100.64.0.0/10")
PIN_FILE = HOME / ".qrmenu_photos" / "settings.json"
FAILS = {}  # ip → [틀린 횟수, 막힌 시각까지]


def pin_settings():
    try:
        return json.loads(PIN_FILE.read_text("utf-8"))
    except Exception:
        return {}


def pin_token(s):
    return hmac.new(s["secret"].encode(), s["pin_hash"].encode(), "sha256").hexdigest()


def tailscale_ips():
    ips = set()
    try:
        ips.update(socket.gethostbyname_ex(socket.gethostname())[2])
    except Exception:
        pass
    return sorted(ip for ip in ips if ipaddress.ip_address(ip) in TAILSCALE_NET)


PIN_PAGE = """<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>QR메뉴 사무실</title><style>body{font-family:system-ui,sans-serif;background:#f3f4f6;margin:0;display:grid;place-items:center;min-height:100vh}
form{background:#fff;padding:24px;border-radius:14px;box-shadow:0 2px 12px #0001;width:min(320px,90vw)}h1{font-size:18px;margin:0 0 6px}
p{color:#666;font-size:13px;margin:0 0 14px}input,button{width:100%;box-sizing:border-box;font-size:18px;padding:10px;border-radius:8px}
input{border:1px solid #ccc;margin-bottom:10px;letter-spacing:4px;text-align:center}button{border:0;background:#2563eb;color:#fff}#e{color:#c00}</style>
<form method="post" action="/pin"><h1>QR메뉴 사무실</h1><p>사진 수집기와 같은 PIN을 넣어 주세요.</p><input name="pin" type="password" inputmode="numeric" autocomplete="current-password" autofocus>
<button>열기</button><p id="e">{error}</p></form><script>
// 삼성 인터넷은 홈 화면 아이콘으로 열 때 예전 PIN 화면을 다시 불러오지 않고 보여 준다 → 이미 통과했으면 바로 첫 화면으로
function chk(){fetch('/api/jobs',{cache:'no-store'}).then(r=>{if(r.ok)location.replace('/')}).catch(()=>{})}
chk();addEventListener('pageshow',e=>{if(e.persisted)chk()});document.addEventListener('visibilitychange',()=>{if(!document.hidden)chk()});
</script></html>"""
PIN_ERRORS = {"wrong": "PIN이 틀렸어요.", "blocked": "여러 번 틀려서 5분 동안 막혔어요.", "nopin": "사진 수집기 PC 화면에서 PIN을 먼저 정해 주세요."}


class RemoteHandler(Handler):
    """휴대폰용: Tailscale 주소에서 온 요청 + PIN 쿠키만 받는다."""

    def guard(self):
        ip = self.client_address[0]
        if ipaddress.ip_address(ip) not in TAILSCALE_NET:
            self.send_error(403)
            return False
        p = urlparse(self.path).path
        if self.authed():
            if self.command == "POST" and p == "/pin":  # 예전 PIN 화면에서 또 보낸 경우
                self.go("/")
                return False
            return True
        if self.command == "GET" and p in ("/", "/index.html"):
            err = PIN_ERRORS.get(urlparse(self.path).query.removeprefix("e="), "")
            self.html(PIN_PAGE.replace("{error}", err))
        elif self.command == "POST" and p == "/pin" and self.same_origin():
            self.check_pin(ip)
        else:
            self.json({"error": "PIN을 넣어 주세요."}, 401)
        return False

    def authed(self):
        s = pin_settings()
        m = re.search(r"(?:^|;\s*)qrpin=([0-9a-f]{64})", self.headers.get("Cookie") or "")
        return bool(s.get("pin_hash") and s.get("secret") and m) and hmac.compare_digest(m.group(1), pin_token(s))

    def same_origin(self):
        # 다른 사이트에서 이 양식을 보내지 못하게 (보통 양식 전송이라 X-Dashboard 머리글을 못 씀)
        origin = self.headers.get("Origin")
        return origin is None or origin == "http://" + self.headers.get("Host", "")

    def check_pin(self, ip):
        """보통 양식 전송 → 성공하면 쿠키를 주면서 첫 화면으로 보낸다(303).
        fetch 응답의 쿠키 + location.reload 방식은 삼성 인터넷 홈 화면 아이콘에서 안 열렸다(2026-10-27)."""
        n, until = FAILS.get(ip, [0, 0])
        if until > time.time():
            return self.go("/?e=blocked")
        s = pin_settings()
        if not s.get("pin_hash"):
            return self.go("/?e=nopin")
        body = self.rfile.read(min(int(self.headers.get("Content-Length") or 0), 200)).decode("utf-8", "replace")
        pin = (parse_qs(body).get("pin") or [""])[0]
        good = hashlib.pbkdf2_hmac("sha256", pin.encode(), s["salt"].encode(), 200_000).hex()
        if not hmac.compare_digest(good, s["pin_hash"]):
            n += 1
            FAILS[ip] = [0, time.time() + 300] if n >= 5 else [n, 0]
            return self.go("/?e=wrong")
        FAILS.pop(ip, None)
        self.go("/", f"qrpin={pin_token(s)}; Path=/; Max-Age=2592000; HttpOnly; SameSite=Lax")

    def go(self, where, cookie=None):
        self.send_response(303)
        self.send_header("Location", where)
        self.send_header("Cache-Control", "no-store")
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.send_header("Content-Length", "0")
        self.end_headers()

    def html(self, text):
        body = text.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def start_remote():
    if not pin_settings().get("pin_hash"):
        print("휴대폰 접속 꺼짐: 사진 수집기에 PIN이 없음")
        return
    for ip in tailscale_ips():
        try:
            srv = ThreadingHTTPServer((ip, REMOTE_PORT), RemoteHandler)
        except OSError as e:
            print(f"휴대폰 접속 실패({ip}:{REMOTE_PORT}): {e}")
            continue
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        print(f"휴대폰(Tailscale): http://{socket.gethostname().lower()}:{REMOTE_PORT}  또는 http://{ip}:{REMOTE_PORT}  (PIN은 사진 수집기와 같음)")


if __name__ == "__main__":
    srv = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"QR메뉴 대시보드: http://{HOST}:{PORT}  (이 PC에서만 열림, 끄려면 이 창을 닫거나 Ctrl+C)")
    start_remote()
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass
