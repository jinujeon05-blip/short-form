# -*- coding: utf-8 -*-
"""운영자 모드 '가게 만들기' (2026-11-13, 캡틴 결정 가-1·나-1·다-1·라-1) — server.py 가 불러 쓴다.

캡틴이 대시보드 탭에서 가게 하나를 처음부터 끝까지 직접 만든다. 화면은 앞단이고, 실제 만들기는 저장소 도구가 한다.
- 초안: dashboard/out/builder/<가게id>/draft.json + img/ (git 제외). 사진은 화면(브라우저)에서 이미 잘라 온다
  (요리 4:3 640×480 JPEG, 간판 1280 폭 JPEG, 로고 PNG).
- [미리 만들기]  node tools/build-shop.mjs <id> <초안> build    → restaurants/<id> (가마솥 표준, 등록 전)
- [저장·점검]    node tools/build-shop.mjs <id> <초안> register → register-shop(+정식이면 QR·카드·SNS) → check-shop
- [커밋·결재함]  이 가게 파일과 등록 파일만 커밋 → 결재함에 '배포 대기' 카드(배포는 캡틴이 [배포 확정])
- 번역 [AI 번역]: 안티그래비티 agy(제미나이, 무료) 먼저, 실패하면 claude -p(Pro 한도). 결과는 빈 칸에만 '초안'으로 채운다.
  AI 실행 환경에는 비밀값(SECRET_ENV)을 넘기지 않는다. 파일을 고칠 수 없는 모드(agy 계획 모드, claude 는 도구 없음)로 돈다.
"""

import base64
import json
import os
import re
import shutil
import subprocess
import threading
import time
from datetime import datetime
from pathlib import Path

SV = None  # server 모듈 (init 에서 받음)
SHOP_RE = re.compile(r"^[a-z0-9]{2,30}$")
IMG_RE = re.compile(r"^(logo\.png|sign\.jpg|[a-z0-9-]{1,40}\.jpg)$")
JOBS = {}  # 가게 id → 저장·점검 진행 상태
LOCK = threading.Lock()
TR_LOCK = threading.Lock()  # 번역은 한 번에 하나
LANGS = ("ko", "en", "zh", "ja", "vi")
# 등록(register-shop)이 고치는 공통 파일 — 커밋 때 이 가게 것과 함께 넣는다. 저장 전에 다른 작업으로 이미 바뀌어 있으면 멈춘다(남의 변경이 섞이지 않게).
REG_FILES = ["restaurants/_shared/sync-lang.sh", "restaurants/_shared/sync-dasan.sh", "restaurants/_shared/sync-stores.sh",
             "tools/seo.mjs", "tools/export.sh", "sales/content.js", "sales/stores/data.js", "docs/stores.md",
             "sales/sitemap.xml", "sales/robots.txt"]


def init(server):
    global SV
    SV = server


def base():
    return SV.OUT / "builder"


def ddir(sid):
    return base() / sid


def tracked(sid):
    code, out = SV.sh(["git", "ls-files", "--", f"restaurants/{sid}"])
    return code == 0 and out.strip() != ""


def node(args, timeout=600):
    return SV.sh(["node", *args], timeout=timeout)


# ---------------------------------------------------------------- 읽기
def meta():
    def get():
        code, out = node(["tools/build-shop.mjs", "--meta"], 60)
        if code != 0:
            return {"error": out[-400:]}
        m = json.loads(out)
        m["drafts"] = drafts()
        return m
    m = SV.cached("builder-meta", 30, get)
    if "error" not in m:
        m = dict(m, drafts=drafts())
    return m


def drafts():
    rows = []
    if base().is_dir():
        for d in base().iterdir():
            f = d / "draft.json"
            if SHOP_RE.match(d.name) and f.is_file():
                try:
                    j = json.loads(f.read_text(encoding="utf-8"))
                except Exception:
                    continue
                rows.append({"id": d.name, "name": (j.get("name") or {}).get("ko") or d.name, "at": f.stat().st_mtime,
                             "state": state(d.name).get("stage")})
    return sorted(rows, key=lambda r: -r["at"])


def state(sid):
    f = ddir(sid) / "state.json"
    try:
        return json.loads(f.read_text(encoding="utf-8"))
    except Exception:
        return {}


def set_state(sid, **kw):
    s = {**state(sid), **kw, "at": time.time()}
    ddir(sid).mkdir(parents=True, exist_ok=True)
    (ddir(sid) / "state.json").write_text(json.dumps(s, ensure_ascii=False, indent=1), encoding="utf-8")
    return s


def load(sid):
    if not SHOP_RE.match(sid or ""):
        return {"error": "가게 id 는 영문 소문자·숫자 2~30자"}
    f = ddir(sid) / "draft.json"
    draft = json.loads(f.read_text(encoding="utf-8")) if f.is_file() else None
    imgs = sorted(p.name for p in (ddir(sid) / "img").glob("*") if IMG_RE.match(p.name)) if (ddir(sid) / "img").is_dir() else []
    exists = (SV.ROOT / "restaurants" / sid / "index.html").is_file()
    with LOCK:
        job = dict(JOBS[sid]) if sid in JOBS else None
    return {"id": sid, "draft": draft, "images": imgs, "state": state(sid), "job": job,
            "shopExists": exists, "tracked": exists and tracked(sid), "built": (ddir(sid) / "built.json").is_file()}


# ---------------------------------------------------------------- 쓰기
def save(sid, draft):
    if not SHOP_RE.match(sid or ""):
        return "가게 id 는 영문 소문자·숫자 2~30자"
    if not isinstance(draft, dict):
        return "초안 형식이 이상해요"
    if (SV.ROOT / "restaurants" / sid).exists() and not (ddir(sid) / "built.json").is_file() and not (ddir(sid) / "draft.json").is_file():
        return f"restaurants/{sid} 는 이미 있는 가게예요. 다른 id 를 쓰세요"
    ddir(sid).mkdir(parents=True, exist_ok=True)
    (ddir(sid) / "draft.json").write_text(json.dumps(draft, ensure_ascii=False, indent=1), encoding="utf-8")
    return None


def photo(sid, name, data):
    if not SHOP_RE.match(sid or "") or not IMG_RE.match(name or ""):
        return "사진 이름이 이상해요"
    m = re.match(r"^data:image/(jpeg|png);base64,(.+)$", data or "", re.S)
    if not m:
        return "JPEG·PNG 사진만 올릴 수 있어요"
    raw = base64.b64decode(m.group(2))
    if len(raw) > 4_000_000:
        return "사진이 너무 커요(4MB 이하)"
    is_png, is_jpg = raw[:8] == b"\x89PNG\r\n\x1a\n", raw[:3] == b"\xff\xd8\xff"
    if (name.endswith(".png") and not is_png) or (name.endswith(".jpg") and not is_jpg):
        return "사진 형식이 이름과 달라요"
    (ddir(sid) / "img").mkdir(parents=True, exist_ok=True)
    (ddir(sid) / "img" / name).write_bytes(raw)
    return None


def photo_delete(sid, name):
    if not SHOP_RE.match(sid or "") or not IMG_RE.match(name or ""):
        return "사진 이름이 이상해요"
    f = ddir(sid) / "img" / name
    if f.is_file():
        f.unlink()
    return None


def build(sid):
    if not (ddir(sid) / "draft.json").is_file():
        return None, "먼저 저장하세요"
    with LOCK:
        if JOBS.get(sid, {}).get("running"):
            return None, "저장·점검이 도는 중이에요. 끝난 뒤에 눌러 주세요"
    if state(sid).get("stage") in ("registered", "checked", "committed"):
        # 등록 뒤에도 메뉴·색·문구는 다시 만들 수 있다(등록 정보는 그대로). 커밋한 뒤에는 Claude 앱에서 고친다.
        if state(sid).get("stage") == "committed":
            return None, "이미 커밋한 가게예요. 고칠 것은 Claude 앱이나 점주 편집 화면에서 해 주세요"
    code, out = node(["tools/build-shop.mjs", sid, str(ddir(sid)), "build"], 120)
    if code != 0:
        return None, out.strip()[-1500:]
    st = state(sid).get("stage")
    set_state(sid, stage=st if st in ("registered", "checked") else "built", built=time.time())
    if st in ("registered", "checked"):
        # 등록한 뒤 다시 만들면 검색 정보(seo)·방문 기록 코드가 빠지므로 바로 다시 넣는다
        node(["tools/analytics.mjs", sid], 120)
        node(["tools/seo.mjs", sid], 120)
        set_state(sid, stage="registered")
    return out.strip(), None


def finish(sid):
    """저장·점검: 등록 → (정식 결과물) → check-shop. 1~3분 걸려서 따로 돈다."""
    if not (SV.ROOT / "restaurants" / sid / "menu.js").is_file():
        return "먼저 [미리 만들기]를 누르세요"
    if tracked(sid):
        return "이미 커밋한 가게예요"
    with LOCK:
        if JOBS.get(sid, {}).get("running"):
            return "이미 도는 중이에요"
        if any(j.get("running") for j in JOBS.values()):
            return "다른 가게 저장·점검이 도는 중이에요. 끝난 뒤에 눌러 주세요"
    if state(sid).get("stage") not in ("registered", "checked"):
        # 공통 파일이 이미 다른 작업으로 바뀌어 있으면 커밋 때 남의 변경이 섞인다 → 멈춘다
        code, out = SV.sh(["git", "status", "--porcelain", "--", *REG_FILES])
        dirty = [l[3:] for l in out.splitlines() if l.strip()]
        if dirty:
            return "등록할 공통 파일에 다른 작업의 커밋 안 한 수정이 있어요(섞이지 않게 멈춤): " + ", ".join(dirty[:6])
    with LOCK:
        JOBS[sid] = {"running": True, "log": [], "startedAt": time.time()}
    threading.Thread(target=run_finish, args=(sid,), daemon=True).start()
    return None


def run_finish(sid):
    def log(t):
        with LOCK:
            JOBS[sid]["log"].append(t)
    ok = False
    try:
        if state(sid).get("stage") not in ("registered", "checked"):
            log("① 등록(가게 찾기 목록·검색·카드 사진·방문 기록)" + (" + 정식 결과물(QR·테이블 카드·SNS)" if (json.loads((ddir(sid) / "draft.json").read_text(encoding="utf-8")).get("kind") == "full") else "") + " …")
            code, out = node(["tools/build-shop.mjs", sid, str(ddir(sid)), "register"], 900)
            log(out.strip()[-2500:])
            if code != 0:
                raise RuntimeError("등록이 멈췄어요")
            set_state(sid, stage="registered")
        else:
            log("① 등록: 이미 했어요(건너뜀)")
        log("② 점검(check-shop: 표준·목록·캡처·넘침) …")
        code, out = node(["tools/check-shop.mjs", sid], 600)
        log(out.strip()[-3000:])
        ok = code == 0
        set_state(sid, stage="checked" if ok else "registered", checkOk=ok, checkedAt=time.time())
        log("결과: 모두 통과 — [커밋하고 결재함에 올리기]를 누르면 돼요" if ok else "결과: 고칠 것이 있어요(위 ✘ 줄). 고친 뒤 [미리 만들기] → [저장·점검]을 다시 누르세요")
    except Exception as e:
        log("✘ " + str(e)[:500])
    finally:
        with LOCK:
            JOBS[sid]["running"] = False
            JOBS[sid]["ok"] = ok
            JOBS[sid]["endedAt"] = time.time()
        SV._cache.pop("stores", None)
        SV._cache.pop("builder-meta", None)


def commit(sid):
    st = state(sid)
    if st.get("stage") != "checked" or not st.get("checkOk"):
        return None, "먼저 [저장·점검]을 통과해야 해요"
    if tracked(sid):
        return None, "이미 커밋한 가게예요"
    draft = json.loads((ddir(sid) / "draft.json").read_text(encoding="utf-8"))
    name = (draft.get("name") or {}).get("ko") or sid
    kind = "가게 찾기용" if draft.get("kind") == "listing" else "정식"
    paths = [f"restaurants/{sid}", f"sales/img/demo-{sid}.jpg"] + [f for f in REG_FILES if (SV.ROOT / f).exists()]
    code, out = SV.sh(["git", "add", "--", *paths])
    if code != 0:
        return None, "git add 실패: " + out[-300:]
    msg = f"새 가게 {name}({sid}) {kind} — 대시보드 '가게 만들기'로 캡틴이 직접 입력\n\n메뉴 {sum(len(c.get('items') or []) for c in draft.get('cats') or [])}개, 맨 위 {'로고' if draft.get('top') == 'logo' else '간판 사진'}. check-shop 통과."
    code, out = SV.sh(["git", "commit", "-m", msg, "--", *paths])
    if code != 0:
        return None, "커밋 실패: " + out[-400:]
    sha = SV.sh(["git", "rev-parse", "--short", "HEAD"])[1].strip()
    set_state(sid, stage="committed", commit=sha)
    # 결재함 카드: 지시와 같은 모양(status done + deploy)이라 기존 [배포 확정]이 그대로 돈다
    with SV.ORDER_LOCK:
        oid, n = datetime.now().strftime("%m%d-%H%M%S"), 1
        while oid in SV.ORDERS:
            n += 1
            oid = datetime.now().strftime("%m%d-%H%M%S") + f"-{n}"
        shot = f"{sid}-ko.png"
        report = (f"'가게 만들기'로 {name}({sid}, {kind})를 만들고 점검(check-shop)을 통과해 커밋했어요({sha}).\n"
                  f"배포는 아래 [배포 확정]을 눌러야 해요. 배포 전에 폰 화면 캡처를 한 번 보세요.\n캡처: {shot}\n배포준비: {sid}")
        o = {"id": oid, "title": f"가게 만들기: {name} ({sid})", "status": "done", "via": "builder", "createdAt": time.time(),
             "turns": [{"by": "me", "text": f"가게 만들기 화면에서 {name}({sid}) 저장·커밋", "at": time.time()},
                       {"by": "claude", "text": report, "at": time.time()}],
             "steps": [], "deploy": [sid], "deployState": None, "images": [shot] if (SV.OUT / shot).is_file() else [],
             "approval": None, "decision": None, "seenAt": None, "endedAt": time.time(), "builder": True}
        SV.ORDERS[oid] = o
        SV.save_order(o)
    set_state(sid, order=oid)
    SV._cache.pop("recent", None)
    SV._cache.pop("stores", None)
    return {"commit": sha, "order": oid}, None


def discard(sid):
    """등록 전 초안·미리보기만 지운다(이 화면으로 만들고 커밋 안 한 것만). 등록한 뒤에는 공통 파일에 줄이 들어가 화면에서 못 지운다."""
    if not SHOP_RE.match(sid or ""):
        return "가게 id 가 이상해요"
    if tracked(sid):
        return "이미 커밋한 가게는 여기서 지우지 않아요"
    if state(sid).get("stage") in ("registered", "checked", "committed"):
        return "등록한 뒤라 화면에서 지울 수 없어요. Claude 앱에 '" + sid + " 가게 만들기 취소해줘'라고 말해 주세요"
    shop = SV.ROOT / "restaurants" / sid
    if shop.exists():
        if not (ddir(sid) / "built.json").is_file():
            return f"restaurants/{sid} 는 이 화면으로 만든 것이 아니라 지우지 않아요"
        shutil.rmtree(shop)
    if ddir(sid).exists():
        shutil.rmtree(ddir(sid))
    SV._cache.pop("builder-meta", None)
    return None


# ---------------------------------------------------------------- 번역 (agy 먼저 → claude -p)
TR_PROMPT = ("너는 베트남에 있는 한국 음식점 메뉴판 번역가다. 도구(명령·파일)는 절대 쓰지 말고 바로 답해. "
             "아래 JSON 의 각 값(한국어)을 영어(en)·중국어 간체(zh)·일본어(ja)·베트남어(vi)로 번역해. "
             "음식 이름은 손님이 알아보게: 영어는 널리 쓰는 이름(필요하면 괄호에 한국어 발음 로마자), 중국어·일본어는 그 나라에서 부르는 이름, 베트남어는 베트남 식당에서 쓰는 자연스러운 말. "
             "가게 이름·브랜드 이름은 번역하지 말고 로마자로. 숫자·가격·시간은 그대로. 줄바꿈(\\n)은 그대로 둬. "
             "답은 JSON 한 개만(설명·코드블록 없이): {\"키\":{\"en\":\"\",\"zh\":\"\",\"ja\":\"\",\"vi\":\"\"}}\n입력: ")


def ai_env():
    env = {k: v for k, v in os.environ.items() if k not in ("ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "CLAUDECODE", "CLAUDE_CODE_ENTRYPOINT", *SV.SECRET_ENV)}
    env.update(PYTHONUTF8="1", PYTHONIOENCODING="utf-8")
    return env


def agy_exe():
    f = SV.which("agy")
    if f:
        return f
    f = Path(os.environ.get("LOCALAPPDATA", "")) / "agy" / "bin" / "agy.exe"
    return str(f) if f.is_file() else None


def parse_json(text):
    a, b = text.find("{"), text.rfind("}")
    if a < 0 or b < a:
        raise ValueError("JSON 없음")
    return json.loads(text[a:b + 1])


def run_ai(engine, items):
    work = base() / "_translate"
    work.mkdir(parents=True, exist_ok=True)  # 저장소 밖 빈 폴더에서 돌린다(파일을 건드릴 것이 없게)
    prompt = TR_PROMPT + json.dumps(items, ensure_ascii=False)
    if engine == "agy":
        exe = agy_exe()
        if not exe:
            raise RuntimeError("안티그래비티(agy)를 찾지 못함")
        p = subprocess.run([exe, "--mode", "plan", "-p", prompt], cwd=str(work), capture_output=True, timeout=300,
                           env=ai_env(), creationflags=SV.NO_WINDOW)
    else:
        exe = SV.claude_exe()
        if not exe:
            raise RuntimeError("Claude Code 를 찾지 못함")
        p = subprocess.run([exe, "-p", "--model", "sonnet", "--output-format", "text", "--strict-mcp-config",
                            "--disallowedTools", "Bash", "Edit", "Write", "Read", "Glob", "Grep", "WebFetch", "WebSearch", "Agent", "NotebookEdit"],
                           cwd=str(work), input=prompt.encode("utf-8"), capture_output=True, timeout=300,
                           env=ai_env(), creationflags=SV.NO_WINDOW)
    out = (p.stdout or b"").decode("utf-8", "replace")
    if p.returncode != 0 and "{" not in out:
        raise RuntimeError(((p.stderr or b"").decode("utf-8", "replace") or out)[-300:] or f"종료 코드 {p.returncode}")
    got = parse_json(out)
    res = {}
    for k in items:
        v = got.get(k)
        if isinstance(v, dict) and all(isinstance(v.get(l), str) and v.get(l).strip() for l in ("en", "zh", "ja", "vi")):
            res[k] = {l: v[l].strip() for l in ("en", "zh", "ja", "vi")}
    return res


def translate(items, engine="auto"):
    """items = {키: 한국어}. 돌려주는 값 = ({키: {en,zh,ja,vi}}, 쓴 엔진, 실패 이유들)."""
    items = {str(k)[:80]: str(v)[:400] for k, v in (items or {}).items() if str(v).strip()}
    if not items:
        return {}, None, ["번역할 한국어 칸이 비어 있어요"]
    if len(items) > 400:
        return {}, None, ["한 번에 400칸까지만 번역해요"]
    if not TR_LOCK.acquire(blocking=False):
        return {}, None, ["다른 번역이 도는 중이에요. 잠시 뒤에 눌러 주세요"]
    try:
        # 명령줄 길이(윈도우 약 3만 자)를 넘지 않게 나눈다
        chunks, cur, size = [], {}, 0
        for k, v in items.items():
            if cur and (size + len(v) + len(k) > 3500 or len(cur) >= 60):
                chunks.append(cur)
                cur, size = {}, 0
            cur[k] = v
            size += len(v) + len(k) + 8
        if cur:
            chunks.append(cur)
        engines = ["agy", "claude"] if engine == "auto" else [engine]
        out, used, errs = {}, [], []
        for ch in chunks:
            left = dict(ch)
            for eng in engines:
                if not left:
                    break
                try:
                    got = run_ai(eng, left)
                    out.update(got)
                    if got:
                        used.append(eng)
                    left = {k: v for k, v in left.items() if k not in got}
                except Exception as e:
                    errs.append(f"{'안티그래비티' if eng == 'agy' else 'Claude'}: {str(e)[:200]}")
            if left:
                errs.append(f"{len(left)}칸은 번역을 못 받았어요")
        return out, ",".join(sorted(set(used))) or None, errs
    finally:
        TR_LOCK.release()
