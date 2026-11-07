#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Jinwoo 에이전트 — QR메뉴 사업용 대시보드 (127.0.0.1:8899 전용).

- 가짜 데이터 없음: 저장소 파일·git·CLI 기록을 요청 때마다 읽는다(짧게 캐시).
- 바로 실행하는 것은 안전한 점검 3가지(check-standard·check-listing·shot)와 지시창(Claude Code 실행, 아래 '지시' 참고)이다.
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
import urllib.error
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


# 사용자가 직접 넣는 비밀값(Windows 사용자 환경변수). 서버를 켠 뒤에 넣어도 읽히게 레지스트리(HKCU\Environment)를
# 그때그때 직접 읽는다(2026-10-30: 탐색기가 옛 환경을 갖고 있어 다시 켜도 QRMENU_ADMIN_KEY 가 안 읽힌 건). 저장·출력하지 않는다.
SECRET_ENV = ("QRMENU_ADMIN_KEY", "VERCEL_TOKEN", "JINWOO_HR_EMAIL", "JINWOO_HR_PASSWORD", "JINWOO_HR_URL", "JINWOO_HR_KEY")


def user_env(name):
    try:
        import winreg
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, "Environment") as k:
            v = str(winreg.QueryValueEx(k, name)[0]).strip()
            if v:
                return v
    except (ImportError, OSError):
        pass
    return (os.environ.get(name) or "").strip() or None


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
    codex_note = next((b for b in bullets if "운영 감찰관" in b), "")
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
    "codex": r"codex|코덱스|운영 감찰관|재대조",
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
    key = user_env("QRMENU_ADMIN_KEY")
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


# ---------------------------------------------------------------- 인력 앱(jinwoo-hr) 읽기 전용
# - 계정: 사용자가 jinwoo-hr '사용자 관리'에서 직접 만든 대시보드 전용 현장관리자 계정(2026-10-29 결정 가-1).
#   이메일·비밀번호는 사용자가 직접 넣은 Windows 사용자 환경변수 JINWOO_HR_EMAIL·JINWOO_HR_PASSWORD (저장·출력하지 않음).
# - Supabase 주소·공개(publishable) 키는 jinwoo-hr 공개 화면 파일에서 읽는다(JINWOO_HR_URL·JINWOO_HR_KEY 가 있으면 그것).
# - 로그인(토큰 받기) 말고는 GET 만 한다. insert/update/delete 를 보내는 코드는 없다.
# - 화면에는 거래처·제품 이름까지, AI(비서실장)에게는 숫자 합계만(out/hr.json) 넘긴다. 근로자 이름·연락처는 읽지도 않는다.
HR_SITE = "https://jinwoo-hr.vercel.app"
HR_AI_FILE = OUT / "hr.json"
HR_HOW = ("인력 앱을 읽으려면 대시보드 전용 현장관리자 계정이 필요해요. jinwoo-hr '사용자 관리'에서 계정을 만들고(권한: 현장관리자, 담당 거래처는 지정하지 않음), "
          "Windows 사용자 환경변수 JINWOO_HR_EMAIL·JINWOO_HR_PASSWORD 에 직접 넣은 뒤 대시보드를 다시 켜 주세요(docs/dashboard.md '인력 앱 계정 넣기').")
_hr_auth = {}


def hr_config():
    url, key = user_env("JINWOO_HR_URL"), user_env("JINWOO_HR_KEY")
    if url and key:
        return url.rstrip("/"), key

    def scrape():
        with urllib.request.urlopen(HR_SITE + "/", timeout=15) as r:
            html = r.read().decode("utf-8", "replace")
        for js in re.findall(r'src="(/assets/[^"]+\.js)"', html):
            with urllib.request.urlopen(HR_SITE + js, timeout=20) as r:
                code = r.read().decode("utf-8", "replace")
            u = re.search(r"https://[a-z0-9]+\.supabase\.co", code)
            k = re.search(r"sb_publishable_[A-Za-z0-9_-]{10,}", code)
            if u and k:
                return u.group(0), k.group(0)
        raise RuntimeError("인력 앱 화면 파일에서 Supabase 주소를 못 찾음")
    return cached("hr_config", 24 * 3600, scrape)


def hr_token(url, key):
    if _hr_auth.get("token") and time.time() < _hr_auth.get("until", 0):
        return _hr_auth["token"]
    body = json.dumps({"email": user_env("JINWOO_HR_EMAIL"), "password": user_env("JINWOO_HR_PASSWORD")}).encode()
    req = urllib.request.Request(url + "/auth/v1/token?grant_type=password", data=body, method="POST",
                                 headers={"apikey": key, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            d = json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise RuntimeError("로그인 실패(이메일·비밀번호 확인)" if e.code in (400, 401) else f"로그인 실패 {e.code}")
    _hr_auth.update(token=d["access_token"], until=time.time() + int(d.get("expires_in", 3600)) - 120)
    return _hr_auth["token"]


def hr_get(url, key, token, table, query):
    """읽기만(GET). 1000줄씩 끝까지."""
    rows, off = [], 0
    while True:
        req = urllib.request.Request(f"{url}/rest/v1/{table}?{query}&limit=1000&offset={off}",
                                     headers={"apikey": key, "Authorization": "Bearer " + token})
        with urllib.request.urlopen(req, timeout=20) as r:
            part = json.loads(r.read().decode("utf-8"))
        rows += part
        if len(part) < 1000:
            return rows
        off += 1000


def build_hr():
    if not (user_env("JINWOO_HR_EMAIL") and user_env("JINWOO_HR_PASSWORD")):
        return {"status": "연결 필요", "how": HR_HOW}
    try:
        url, key = hr_config()
        token = hr_token(url, key)
    except Exception as e:
        _hr_auth.clear()
        return {"status": "연결 필요", "how": HR_HOW, "error": str(e)[:200]}
    vn = datetime.now(timezone.utc).timestamp() + 7 * 3600  # 베트남 시간 기준 날짜
    today = datetime.fromtimestamp(vn, timezone.utc).strftime("%Y-%m-%d")
    days = [datetime.fromtimestamp(vn - i * 86400, timezone.utc).strftime("%Y-%m-%d") for i in (2, 1, 0)]  # 그저께·어제·오늘
    m0 = today[:8] + "01"
    errors = []

    def get(table, query):
        try:
            return hr_get(url, key, token, table, query)
        except Exception as e:
            errors.append(f"{table}: " + (f"{e.code}" if hasattr(e, "code") else str(e)[:80]))
            return None
    names = {c["id"]: c["name"] for c in get("client_labels", "select=id,name") or []}
    entries = get("daily_entries", f"select=client_id,entry_date,shift,headcount&entry_date=gte.{min(m0, days[0])}&entry_date=lte.{today}") or []
    plans = get("headcount_plans", f"select=client_id,plan_date,shift,headcount&plan_date=gte.{m0}&plan_date=lte.{today[:8]}31")
    prods = {p["id"]: p["name"] for p in get("sorting_products", "select=id,name") or []}
    sorts = get("sorting_records", f"select=product_id,record_date,inspected,defect_counts&record_date=gte.{m0}&record_date=lte.{today}") or []

    num = lambda v: float(v or 0)
    per = {}

    def c(cid):
        return per.setdefault(cid, {"name": names.get(cid, "?"), "today": 0, "todayPlan": 0, "month": 0, "monthPlan": 0,
                                    "days": {d: {"day": 0, "night": 0} for d in days}})
    t = {"day": 0, "night": 0}
    month = 0
    for e in entries:
        h = num(e["headcount"])
        if e["entry_date"] in days:
            dd = c(e["client_id"])["days"][e["entry_date"]]
            dd[e["shift"]] = dd.get(e["shift"], 0) + h
        if e["entry_date"] < m0:  # 월초에는 지난달 어제·그저께도 읽는다(3일 표용)
            continue
        month += h
        c(e["client_id"])["month"] += h
        if e["entry_date"] == today:
            t[e["shift"]] = t.get(e["shift"], 0) + h
            c(e["client_id"])["today"] += h
    plan_today = plan_to_date = plan_month = 0
    for p in plans or []:
        h = num(p["headcount"])
        plan_month += h
        if p["plan_date"] <= today:
            plan_to_date += h
            c(p["client_id"])["monthPlan"] += h
        if p["plan_date"] == today:
            plan_today += h
            c(p["client_id"])["todayPlan"] += h
    srt = {"todayInspected": 0, "todayDefects": 0, "monthInspected": 0, "monthDefects": 0}
    byprod = {}
    for r in sorts:
        ins = num(r["inspected"])
        dfc = sum(num(v) for v in (r.get("defect_counts") or {}).values())
        srt["monthInspected"] += ins
        srt["monthDefects"] += dfc
        if r["record_date"] == today:
            srt["todayInspected"] += ins
            srt["todayDefects"] += dfc
        b = byprod.setdefault(r["product_id"], {"name": prods.get(r["product_id"], "?"), "inspected": 0, "defects": 0})
        b["inspected"] += ins
        b["defects"] += dfc
    rate = lambda d, i: round(d / i * 100, 2) if i else None
    srt["todayRate"] = rate(srt["todayDefects"], srt["todayInspected"])
    srt["monthRate"] = rate(srt["monthDefects"], srt["monthInspected"])
    srt["products"] = sorted(({**b, "rate": rate(b["defects"], b["inspected"])} for b in byprod.values()), key=lambda b: -b["inspected"])[:12]
    res = {"status": "ok", "date": today, "days": days, "at": datetime.now().strftime("%H:%M"), "errors": errors,
           "today": {"day": t["day"], "night": t["night"], "total": t["day"] + t["night"], "plan": plan_today if plans is not None else None},
           "month": {"actual": month, "planToDate": plan_to_date if plans is not None else None, "planMonth": plan_month if plans is not None else None,
                     "pct": round(month / plan_to_date * 100) if plans and plan_to_date else None},
           "clients": sorted(per.values(), key=lambda x: (-x["today"], -sum(v["day"] + v["night"] for v in x["days"].values()), -x["month"])),
           "sorting": srt,
           # 오늘 주간·야간 보고(daily_entries 한 줄이라도 있으면 보고함). 표를 못 읽었으면 None → 사무실에 표시 안 함
           "report": None if any(x.startswith("daily_entries") for x in errors) else
                     {s: any(e["entry_date"] == today and e["shift"] == s for e in entries) for s in ("day", "night")}}
    # AI(비서실장)용: 숫자 합계만, 이름 없음
    try:
        OUT.mkdir(exist_ok=True)
        HR_AI_FILE.write_text(json.dumps({"date": today, "at": res["at"], "today": res["today"], "month": res["month"],
                                          "clients": len(per), "sorting": {k: v for k, v in srt.items() if k != "products"}},
                                         ensure_ascii=False, indent=1), encoding="utf-8")
    except OSError:
        pass
    return res


def hr_line():
    h = cached("hr", 120, build_hr)
    if h["status"] != "ok":
        return "인력: 연결 필요(인력공급팀 자리를 눌러 안내 보기)"
    n = lambda v: f"{v:g}"
    s = f"인력: 오늘 투입 {n(h['today']['total'])}명(주 {n(h['today']['day'])}·야 {n(h['today']['night'])})"
    if h["month"]["pct"] is not None:
        s += f" · 이번 달 계획 대비 {h['month']['pct']}%"
    if h["sorting"]["monthRate"] is not None:
        s += f" · 선별 불량률 {h['sorting']['monthRate']}%"
    return s


# ---------------------------------------------------------------- ⑤ 할당량
def build_quota():
    # 칸 3개(2026-11-03 캡틴 지시): Claude · Gemini(Flash·Pro) · 안티그래비티(Claude·GPT·Argon). ChatGPT(Codex) 칸은 지움(코덱스는 2026-10-30부터 안 씀)
    now = time.time()
    g = gemini_quota(now)
    flash = [b for b in g["bars"] if b["label"].startswith("Gemini") and not b.get("spare")]
    rest = sorted([b for b in g["bars"] if b not in flash], key=lambda b: bool(b.get("spare")))  # 예비(Argon)는 맨 아래
    gem = dict(g, name="Gemini (Flash·Pro)", bars=[dict(b, label=b["label"].replace("Gemini(Flash·Pro) ", "")) for b in flash])
    agy = dict(g, name="안티그래비티 (Claude·GPT·Argon)", bars=rest)
    for q in (gem, agy):
        if g["status"] == "ok" and not q["bars"]:
            q.update(status="확인 불가", how="안티그래비티 앱에서 이 묶음의 한도가 오지 않았다. 앱 설정의 모델 사용량 화면에서 본다.")
    return {
        "claude": claude_quota(now),
        "gemini": gem,
        "agy": agy,
        "checkedAt": datetime.now().strftime("%H:%M:%S"),
    }


CLAUDE_USAGE = HOME / ".claude" / "qrmenu-usage.json"  # dashboard/claude-usage.mjs(상태줄)가 쓴다


def claude_quota(now):
    """Claude Code 상태줄 입력의 rate_limits(5시간·주간)를 claude-usage.mjs 가 파일로 남긴 것을 읽는다."""
    q = {"name": "Claude", "status": "확인 불가", "bars": [],
         "how": "대시보드에서 지시를 한 번 실행하면 그때의 5시간·주간 %가 기록된다(Claude 앱의 플랜 사용량과 같은 값). "
                "데스크톱 앱(Code 탭)은 상태줄을 돌리지 않아 따로 기록이 안 생긴다. "
                "터미널에서 claude 를 열어 한 번 대화하면 그때의 5시간·주간 %가 기록된다. "
                "그 전에는 Claude 앱 입력창 아래 사용량 표시나 claude.ai → 설정 → 사용량에서 본다."}
    d, src = None, "~/.claude/qrmenu-usage.json"
    try:
        d = json.loads(CLAUDE_USAGE.read_text(encoding="utf-8"))
    except Exception:
        pass
    ev = latest_order_limits()
    if ev and (not d or ev["mtime"] > CLAUDE_USAGE.stat().st_mtime):
        d, src = ev["data"], "대시보드 지시 실행 기록"
    if not d:
        return q
    for key, label in (("five_hour", "5시간"), ("seven_day", "주간")):
        w = (d.get("rate_limits") or {}).get(key)
        if not w:
            continue
        reset = w.get("resets_at")
        q["bars"].append({"label": label, "used": round(float(w.get("used_percentage", 0)), 1), "resetsAt": reset,
                          "resetIn": max(0, int(reset - now)) if reset else None, "stale": bool(reset and reset < now)})
    if q["bars"]:
        q.update(status="ok", recordedAt=d.get("at"), source=src,
                 note="대시보드 지시를 실행할 때마다 새로 기록됨(Claude 앱의 플랜 사용량과 같은 값)")
    return q


def latest_order_limits():
    """가장 최근 지시 기록(orders/*.jsonl)의 마지막 rate_limit_event → claude_quota 가 읽는 모양으로."""
    files = sorted(ORDERS_DIR.glob("*.jsonl"), key=lambda f: f.stat().st_mtime, reverse=True)[:5] if ORDERS_DIR.is_dir() else []
    for f in files:
        try:
            lines = f.read_text(encoding="utf-8", errors="replace").splitlines()
        except Exception:
            continue
        for line in reversed(lines):
            if '"rate_limit_event"' not in line:
                continue
            try:
                w = json.loads(line)["rate_limit_info"]["unifiedWindows"]
            except Exception:
                continue
            mt = f.stat().st_mtime
            rl = {k: {"used_percentage": round(float(v.get("utilization", 0)) * 100, 1), "resets_at": v.get("resetsAt")}
                  for k, v in w.items() if k in ("five_hour", "seven_day")}
            return {"mtime": mt, "data": {"rate_limits": rl, "at": datetime.fromtimestamp(mt, timezone.utc).isoformat()}}
    return None


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
    def ask(method):
        for port in [p.strip() for p in ports.splitlines() if p.strip().isdigit()]:
            try:
                req = urllib.request.Request(
                    f"https://127.0.0.1:{port}/exa.language_server_pb.LanguageServerService/{method}",
                    data=json.dumps({"metadata": {"ideName": "antigravity", "extensionName": "antigravity"}}).encode(),
                    headers={"Content-Type": "application/json", "Connect-Protocol-Version": "1",
                             "X-Codeium-Csrf-Token": tok.group(1)})
                with urllib.request.urlopen(req, timeout=5, context=ctx) as r:
                    return json.loads(r.read().decode("utf-8"))
            except Exception:
                continue
        return None
    data = (ask("GetUserStatus") or {}).get("userStatus")
    if not data:
        return q
    plan = ((data.get("planStatus") or {}).get("planInfo") or {}).get("planName")
    # 앱 설정 '모델 사용량' 화면과 같은 값(2026-11-03): 묶음마다 5시간·주간이 따로 온다.
    # GetUserStatus 의 모델별 값은 '가장 가까운 초기화' 한 칸뿐이라 주간을 못 보고, Argon 주간을 '5시간'으로 잘못 붙였다.
    fams = {"Gemini Models": "Gemini(Flash·Pro)", "Claude and GPT models": "Claude·GPT"}  # 카드 제목이 안티그래비티라 짧게(긴 이름은 칸에서 잘려 5시간·주간이 안 보였다)
    wins = {"5h": "5시간", "weekly": "주간"}
    for g in ((ask("RetrieveUserQuotaSummary") or {}).get("response") or {}).get("groups", []):
        name = g.get("displayName") or ""
        spare = "Argon" in name  # 예비 모델(2026-11-03 캡틴 결정 '라-1'): 카드 경고·'한도 풀리면' 계산에서 뺀다
        for b in g.get("buckets", []):
            if "remainingFraction" not in b:
                continue
            try:
                reset = datetime.fromisoformat(b["resetTime"].replace("Z", "+00:00")).timestamp()
            except Exception:
                reset = None
            q["bars"].append({"label": f"{fams.get(name, name)} {wins.get(b.get('window'), b.get('window') or '한도')}",
                              "used": round((1 - float(b["remainingFraction"])) * 100, 1), "resetsAt": reset,
                              "resetIn": max(0, int(reset - now)) if reset else None, "stale": False, "spare": spare})
    if q["bars"]:
        q.update(status="ok", plan=plan, recordedAt=datetime.now(timezone.utc).isoformat(),
                 source="안티그래비티 앱(로컬, 설정의 모델 사용량과 같은 값)", note="앱이 켜져 있을 때 1분마다 새로 읽음")
        return q
    groups = {}  # 요약을 못 읽은 옛 앱일 때만: 모델별 한 칸
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
                          "resetIn": max(0, int(left)) if left is not None else None, "stale": False, "spare": "Argon" in fam})
    q["bars"].sort(key=lambda b: (not b["label"].startswith("Gemini"), b["label"]))
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


# ---------------------------------------------------------------- 지시 → 비서실장(Claude Code) 자동 실행 (2026-10-28)
# 대시보드 지시창에서 보낸 말을 이 PC의 Claude Code(claude -p, 창 없이)로 저장소에서 실행한다.
# - Pro 구독 로그인으로만 돈다: API 키 환경변수는 지워서 넘긴다(추가 비용 0원).
# - 외부 연결(MCP: Vercel·드라이브 등)은 끈다 → 배포는 여기서 할 수 없다. push·merge·reset·삭제 명령도 막는다.
# - 한 번에 하나만. Claude 한도 90% 이상이면 받지 않는다.
# - 결과는 결재함에 올라오고, '확정'·'답하기'는 같은 대화를 이어서(--resume) 실행한다.
ORDERS_DIR = HERE / "orders"  # 지시 기록 (git 제외)
ORDERS, PROCS = {}, {}
ORDER_LOCK = threading.Lock()
ORDER_TIMEOUT = 40 * 60
CODEX_POSIX = "/" + str(Path(os.environ.get("APPDATA", "")) / "npm" / "codex").replace(":", "").replace("\\", "/")
CODEX_POSIX = CODEX_POSIX[0] + CODEX_POSIX[1].lower() + CODEX_POSIX[2:]  # /c/Users/.../npm/codex


ORDER_RULES = """이 지시는 사용자(캡틴)가 대시보드 'Jinwoo 에이전트'에서 보낸 것이다. CLAUDE.md·docs 규칙을 그대로 따른다.
- 사용자에게 되물을 수 없다. 결정이 필요하면 거기서 멈추고, 끝 보고에 번호 보기 2~3개(추천 표시)를 쓴다. 사용자가 결재함에서 답하면 이 대화가 이어진다.
- 이 실행에는 외부 연결(Vercel·드라이브 커넥터)이 없다. 배포·git push·main 머지·결제·외부 발송·삭제는 하지 않는다. 드라이브 사진은 동기화 폴더 G:\\내 드라이브\\QR메뉴판 에서 읽는다.
- 너는 배포하지 않는다. 가게가 점검(check-standard·check-listing·shot·reviewer)을 통과하고 커밋까지 끝나 배포만 남았으면, 결재 줄 대신 맨 끝 줄을 '배포준비: <가게id>'(여러 곳이면 쉼표)로 쓴다. 캡틴이 결재함에서 [배포 확정]을 누르면 대시보드가 직접 배포한다.
- 너는 '비서실장'(지휘)이다. 일은 CLAUDE.md 5장 순서대로 담당에게 맡긴다: 사진 고르기·모음 이미지 = finder, 메뉴판 읽기 = 안티그래비티(`agy -p`, 계획 모드) → 안 되면 menu-reader, 가격 재확인 = 운영 감찰관(안티그래비티 안 Claude Sonnet, 아래 명령) → 2번 실패하면 reviewer, 꾸미기 = designer, 번역 = polisher, 마지막 점검 = reviewer. 직접 하지 않는다.
- 담당이 막히지 않게(2026-10-29 토정삼계탕 건): finder 의 모음 이미지는 `python tools/photos.py sheet <사진폴더> .scratch/<가게>/sheet.jpg` 한 줄로(파일 쓰기 명령 `cat >` 금지). 안티그래비티는 먼저 `python tools/photos.py shrink <사진폴더> .scratch/<가게>/menus`로 줄인 뒤 `cd .scratch/<가게>/menus && agy --mode plan -p "menu_01.jpg … menu_05.jpg …"`처럼 **한 번에 5장 이하**. 가격·빠진 메뉴 재대조(2026-10-30 사용자 결정 '다-1')는 같은 줄인 사진 폴더에서 `cd .scratch/<가게>/menus && agy --mode plan --model claude-sonnet-5-5-medium -p "명령(command·터미널) 도구는 절대 쓰지 말고, 파일 보기 도구로만 menu_01.jpg … menu_05.jpg 를 열어 아래 표와 대조해줘. 가격이 다른 것·빠진 메뉴만 짧게. 못 열면 '사진 못 봄'. <표>"`(5장 이하씩). "명령 도구는 쓰지 말고 파일 보기 도구로만"을 빼면 막힌다. 코덱스·GPT-OSS는 쓰지 않는다. 제미나이 4 Argon(2026-11-03 캡틴 결정 '가-1'): **정식(계약) 가게**의 메뉴판 읽기는 항상 Argon으로 한다 — `agy --mode plan --model gemini-4-argon-medium -p "명령(command·터미널) 도구는 절대 쓰지 말고, 파일 보기 도구로만 menu_01.jpg … 를 열어 …"`(5장 이하씩). 가게 찾기용은 캡틴이 [Argon 사용]을 체크했을 때(아래 'Argon 사용' 줄이 있을 때)나 지시문에 'Argon'이라고 썼을 때만 쓰고, 그 밖에는 기본 제미나이·Claude 한도가 다 찼을 때만 예비로 쓴다. Argon이 2번 실패하면 기본 agy → menu-reader 순서로 넘긴다. 가격 재대조(운영 감찰관)는 그대로 Claude Sonnet. 화면 꾸미기(index.html 스타일)는 designer 가 하고 비서실장은 직접 고치지 않는다. 담당이 실패하면 2번까지 다시 맡기고, 그래도 안 되면 보고에 이유를 쓴다.
- 비서실장이 이미지를 직접 보는 것은 메뉴판·모음 이미지·최종 화면, 모두 3~4번까지다.
- 마지막 보고 끝에 '담당별 사용' 표(담당 | 한 일 | 토큰)와 이미지 직접 본 횟수를 붙인다. 빠진 담당이 있으면 이유를 쓴다.
- 고친 파일은 지금 브랜치에 커밋한다(push 안 함). seo·analytics 도구가 내 가게 밖(다른 가게 sitemap 날짜 등)을 바꿨으면 커밋하지 말고 `git restore -- <그 파일들>`로 되돌려 작업 폴더를 깨끗하게 둔다.
- 가게를 만들거나 고쳤으면 끝에 `node tools/shot.mjs <가게id> ko dashboard/out`으로 폰 화면 캡처를 만들고(맨 위 로고·간판 사진이 보이는지 직접 확인), 보고에 '캡처: <가게id>-ko.png' 줄을 쓴다. 캡틴은 결재함에서 이 캡처를 본다. 백그라운드 실행·sleep 대기는 쓰지 않는다(창 없는 실행이라 마지막 보고가 덮인다).
- 인력 현황(인력공급·선별) 질문은 dashboard/out/hr.json(대시보드 /api/hr 요약, 숫자만)을 읽어 보고한다. 인력 앱(jinwoo-hr)·Supabase에 직접 접속하거나 그 데이터를 고치지 않는다. 파일이 없으면 '인력 앱 연결 필요'라고 쓴다.
- 말하는 방식(2026-11-01): 캡틴이 대시보드 '팀 대화'에서 비서실장·담당이 주고받는 말을 실시간으로 읽는다. 도구 사이에 하는 말, 담당에게 주는 지시, 담당 보고는 모두 한국어로 쉽게 쓴다. 담당에게 맡기기 전에 '누구에게 무엇을 왜' 한 줄을 먼저 말한다. 담당 지시문 끝에는 '중간 말과 보고는 한국어로', agy 지시문에는 '답은 한국어로'를 붙인다.
- 회의(2026-11-01 캡틴 결정 '나-2', 필요할 때만): 담당끼리 의견이 다르거나(감사관 지적 ↔ designer 의도, 메뉴 검사관 표 ↔ 운영 감찰관 대조가 다름, 사진이 어느 메뉴인지 애매 등) 비서실장 혼자 정하기 어려울 때만 연다. 관련 담당에게 Agent 설명(description)을 '회의: <주제>'로 시작해 의견을 3줄 이내로 받고, 한쪽 의견을 다른 쪽에 보여 주고 한 번만 답을 받은 뒤 비서실장이 정한다. 회의는 지시 하나에 2번까지. 문제가 없으면 회의하지 않는다(사용량 아끼기). 회의를 했으면 보고에 '회의: <주제> → <결론>' 한 줄.
- 마지막 답: 결론부터 3줄(쉬운 말). 이 대화에서 이어 할 결정이 있을 때만 맨 끝 줄을 '결재: <무엇을 확정할지 한 줄>'로 쓴다. 결재할 것이 없으면 결재 줄을 쓰지 않는다."""
ORDER_RULES = ORDER_RULES.replace("CODEX_PATH", CODEX_POSIX)
# 지시창 [Argon 사용] 체크(2026-11-03 '가-1'): 이 지시의 메뉴판 읽기를 가게 종류와 상관없이 Argon으로
ARGON_RULE = "\n- Argon 사용: 캡틴이 이 지시에 [Argon 사용]을 체크했다. 가게 종류와 상관없이 메뉴판 읽기는 `--model gemini-4-argon-medium`으로 한다(실패 시 위 순서대로 넘김). 보고의 담당별 사용 표에 'Argon'을 쓴다."
ORDER_ALLOW = ["Read", "Edit", "Write", "Glob", "Grep", "Agent", "TodoWrite",
               "Bash(node:*)", "Bash(python:*)", "Bash(python3:*)", "Bash(sh tools/*)", "Bash(bash _shared/*)",
               "Bash(git status:*)", "Bash(git diff:*)", "Bash(git log:*)", "Bash(git show:*)", "Bash(git add:*)", "Bash(git commit:*)", "Bash(git restore:*)",
               "Bash(ls:*)", "Bash(cp:*)", "Bash(mkdir:*)", "Bash(cat:*)", "Bash(head:*)", "Bash(grep:*)", "Bash(find:*)", "Bash(wc:*)",
               "Bash(ffmpeg:*)", "Bash(magick:*)", "Bash(agy:*)", "Bash(codex exec:*)", "Bash(codex.cmd exec:*)", f"Bash({CODEX_POSIX} exec:*)", "Bash(cd:*)", "Bash(rm sales/img/qr-*.json)", "Bash(rm -f sales/img/qr-*.json)"]
ORDER_DENY = ["Bash(git push:*)", "Bash(git merge:*)", "Bash(git reset:*)", "Bash(git checkout:*)", "Bash(git switch:*)",
              "Bash(git rebase:*)", "Bash(git clean:*)", "Bash(rm -rf:*)", "Bash(rm -r:*)", "Bash(git branch -D:*)", "Bash(curl:*)", "Bash(npx vercel:*)", "Bash(vercel:*)",
              "WebFetch", "WebSearch"]


def claude_exe():
    """데스크톱 앱이 받아 둔 Claude Code 실행 파일(가장 새 버전). 앱이 업데이트되면 폴더가 바뀐다."""
    found = which("claude")
    if found:
        return found
    base = Path(os.environ.get("LOCALAPPDATA", "")) / "Claude-Data"
    exes = list(base.glob("*/claude-code/*/*/claude.exe")) if base.is_dir() else []
    ver = lambda f: tuple(int(x) for x in re.findall(r"\d+", f.parent.parent.name)[:3])
    return str(max(exes, key=ver)) if exes else None


def save_order(o):
    ORDERS_DIR.mkdir(exist_ok=True)
    keep = {k: v for k, v in o.items() if not k.startswith("_")}
    (ORDERS_DIR / f"{o['id']}.json").write_text(json.dumps(keep, ensure_ascii=False, indent=1), encoding="utf-8")


def load_orders():
    if not ORDERS_DIR.is_dir():
        return
    for f in ORDERS_DIR.glob("*.json"):
        try:
            o = json.loads(f.read_text(encoding="utf-8"))
        except Exception:
            continue
        if o.get("status") == "running":  # 대시보드를 껐다 켜면 실행 중이던 것은 끊긴다
            o["status"] = "stopped"
            o.setdefault("turns", []).append({"by": "system", "text": "대시보드를 다시 켜서 실행이 끊겼습니다. '답하기'로 이어서 시킬 수 있어요.", "at": time.time()})
        ORDERS[o["id"]] = o


def step_text(block):
    """도구 사용 한 번을 한 줄로 (진행 상황 표시용)."""
    name, inp = block.get("name", ""), (block.get("input") if isinstance(block.get("input"), dict) else {})
    what = inp.get("description") or inp.get("file_path") or inp.get("pattern") or inp.get("command") or inp.get("prompt") or ""
    what = str(what).replace(str(ROOT), "").replace("\\", "/").strip()
    return f"{name} · {what[:90]}" if what else name


# 일하는 담당 알아보기: Agent 도구의 subagent_type, 또는 비서실장이 돌린 agy·codex 명령 → 사무실 자리 id
DESK_OF = {"finder": "finder", "menu-reader": "menu-reader", "reviewer": "reviewer", "polisher": "polisher", "designer": "designer"}


def desk_of(block):
    name, inp = block.get("name"), (block.get("input") if isinstance(block.get("input"), dict) else {})
    if name in ("Agent", "Task"):
        return DESK_OF.get(inp.get("subagent_type") or "", None)
    if name == "Bash":
        cmd = str(inp.get("command") or "")
        if re.search(r"(^|[\s;&|/])agy(\.exe)?\s", cmd):
            # 안티그래비티 안 Claude 모델 = 운영 감찰관(가격 재대조, 2026-10-30), 나머지 = 메뉴 검사관(메뉴판 읽기)
            return "codex" if re.search(r"--model[ =]claude-", cmd) else "agy"
        if re.search(r"(^|[\s;&|/])codex(\.cmd)?\s+exec", cmd):
            return "codex"
    return None


# ---------------------------------------------------------------- 팀 대화 (2026-11-01, 캡틴 결정 '나-2'·'다-1')
# 실행 기록(stream-json)에서 '누가 누구에게 무엇을' 말했는지만 뽑는다: 비서실장 → 담당 지시(Agent prompt·agy -p),
# 담당이 일하며 한 말, 담당 보고(tool_result), 비서실장 말. 추가 토큰 없이 이미 받는 기록만 쓴다.
# 화면 '팀 대화' 탭·결재함 옆 창에 실시간으로 보이고, 지시마다 orders/<id>-대화.md 로 남는다(git 제외).
TALK_MAX = 600
TALK_NAME = {"captain": "캡틴", "claude": "비서실장", "finder": "시각 정보 비서", "agy": "메뉴 검사관", "menu-reader": "자료 해석 비서",
             "codex": "운영 감찰관", "reviewer": "데이터 감사관", "polisher": "수석 번역관", "designer": "designer"}
TALK_KIND = {"ask": "지시", "say": "말", "report": "보고", "meet": "회의"}


def ev_blocks(ev):
    """실행 기록 한 줄의 message.content 블록(dict)만. message 가 글자로 오는 줄(permission_denied 등)도 있어서
    .get 을 바로 부르면 실행 전체가 죽었다(2026-11-04 태백산 'str' object has no attribute 'get' 건)."""
    msg = ev.get("message") if isinstance(ev, dict) else None
    content = msg.get("content") if isinstance(msg, dict) else None
    return [b for b in content if isinstance(b, dict)] if isinstance(content, list) else []


def text_of(content):
    if isinstance(content, str):
        return content
    return "\n".join(str(b.get("text") or "") for b in content or [] if isinstance(b, dict) and b.get("type") == "text")


def talk_clean(text):
    # 담당 보고 끝에 붙는 실행 정보(agentId·<usage>)는 대화가 아니라서 뺀다
    return re.sub(r"<usage>.*?</usage>|^agentId:.*$", "", str(text or ""), flags=re.S | re.M).strip()[:3000]


def agy_prompt(cmd):
    m = re.search(r'\s-p\s+"(.*)"', cmd, re.S) or re.search(r"\s-p\s+'(.*)'", cmd, re.S)
    return m.group(1) if m else cmd


class Talk:
    """실행 기록 한 줄(ev)씩 받아 o['talk']에 대화를 쌓는다. at 을 주면(옛 기록 되살리기) 그 시각을 쓴다."""

    def __init__(self, o, at=None):
        self.o, self.at, self.by, self.meet, self.agents = o, at, {}, set(), set()  # by: 도구 호출 id → 그 일을 받은 담당
        o.setdefault("talk", [])

    def add(self, who, to, kind, text):
        text = talk_clean(text)
        if not text:
            return
        t = self.o["talk"]
        t.append({"i": t[-1]["i"] + 1 if t else 0, "who": who, "to": to, "kind": kind, "text": text, "at": self.at or time.time()})
        del t[:-TALK_MAX]

    def report(self, tid, text):
        """담당 일이 끝남: 마지막 말과 같으면 그 말을 '보고'로 바꾸고, 다르면(또는 처음이면) 보고를 새로 남긴다."""
        who, kind = self.by.pop(tid), "meet" if tid in self.meet else "report"
        last = next((t for t in reversed(self.o["talk"][-30:]) if t["who"] == who), None)
        if last and last["kind"] == "say" and (text is None or last["text"] == talk_clean(text)):
            last.update(kind=kind, to="claude")
        else:
            self.add(who, "claude", kind, text or "일을 마쳤습니다(보고 글은 실행 기록에 남지 않음).")

    def feed(self, ev):
        if not isinstance(ev, dict):
            return
        ptid = ev.get("parent_tool_use_id")
        blocks = ev_blocks(ev)
        if ev.get("type") == "system" and ev.get("subtype") == "permission_denied":
            # 금지 목록·자동 판단에 걸려 거절된 명령: 실패가 아니라 '막힘'으로 한 줄 남긴다(비서실장은 다른 방법으로 계속한다)
            who = self.by.get(ev.get("tool_use_id")) or "claude"
            msg = ev.get("message") if isinstance(ev.get("message"), str) else ""
            self.add(who, None, "say", f"⛔ 막힘: {ev.get('tool_name') or '도구'} 명령이 거절됐습니다. {msg[:200]}")
        elif ev.get("type") == "assistant":
            speaker = self.by.get(ptid) if ptid else "claude"
            for b in blocks:
                if b.get("type") == "text" and speaker:
                    self.add(speaker, None, "say", b.get("text"))
                elif b.get("type") == "tool_use" and not ptid:
                    name, inp = b.get("name"), (b.get("input") if isinstance(b.get("input"), dict) else {})
                    if name in ("Agent", "Task"):
                        d = DESK_OF.get(inp.get("subagent_type") or "") or inp.get("subagent_type") or "agent"
                        meet = str(inp.get("description") or "").startswith("회의")
                        self.by[b.get("id")] = d
                        self.agents.add(b.get("id"))
                        if meet:
                            self.meet.add(b.get("id"))
                        self.add("claude", d, "meet" if meet else "ask", inp.get("prompt"))
                    elif name == "Bash" and desk_of(b) in ("agy", "codex"):
                        d = desk_of(b)
                        self.by[b.get("id")] = d
                        self.add("claude", d, "ask", agy_prompt(str(inp.get("command") or "")))
        elif ev.get("type") == "user" and not ptid:
            for b in blocks:
                tid = b.get("tool_use_id")
                if b.get("type") == "tool_result" and tid in self.by:
                    text = text_of(b.get("content"))
                    if text.startswith("Async agent launched"):
                        continue  # 백그라운드 담당: 일하며 하는 말이 계속 오고, 끝나면 task_notification 이 온다
                    self.report(tid, text)
        elif ev.get("type") == "system" and ev.get("subtype") == "task_notification" and ev.get("tool_use_id") in self.by:
            # 백그라운드 담당 끝: 보고 글은 handback_report.text 에 온다. 백그라운드 명령(agy)은 뒤에 오는 tool_result 를 기다린다
            hb, tid = ev.get("handback_report"), ev["tool_use_id"]
            text = hb.get("text") if isinstance(hb, dict) else None
            if text or tid in self.agents:
                self.report(tid, text)
        elif ev.get("type") == "result" and ev.get("result"):
            r = talk_clean(ev["result"])
            for t in reversed(self.o["talk"][-5:]):
                if t["who"] == "claude" and t["kind"] == "say" and t["text"] == r:
                    t.update(kind="report", to="captain")  # 비서실장의 마지막 말 = 캡틴에게 하는 보고
                    break
            else:
                self.add("claude", "captain", "report", r)


def talk_backfill(o):
    """대화 기록 기능 전(2026-11-01 전) 지시: orders/<id>.jsonl 을 다시 읽어 대화를 만든다. 시각은 캡틴이 보낸 시각(대략)."""
    log = ORDERS_DIR / f"{o['id']}.jsonl"
    o["talk"] = []
    if not log.is_file():
        return
    mine = [t for t in o.get("turns") or [] if t.get("by") == "me"]
    tk, k = Talk(o, at=o.get("createdAt")), -1
    with open(log, encoding="utf-8", errors="replace") as f:
        for line in f:
            try:
                ev = json.loads(line)
            except Exception:
                continue
            if not isinstance(ev, dict):
                continue
            if ev.get("type") == "system" and ev.get("subtype") == "init":
                k += 1  # 실행 한 번(처음 지시·답하기·확정)마다 init 이 하나
                if k < len(mine):
                    tk.at = mine[k]["at"]
                    tk.add("captain", "claude", "ask", mine[k]["text"])
            try:
                tk.feed(ev)
            except Exception:
                pass  # 한 줄이 이상해도 나머지 대화는 되살린다(2026-11-04)
    o["talkFrom"] = "log"


def write_talk_md(o):
    """다-1: 지시마다 읽기 쉬운 대화 기록 파일 (dashboard/orders/<id>-대화.md, git 제외)."""
    st = lambda t: datetime.fromtimestamp(t).strftime("%m-%d %H:%M:%S")
    lines = [f"# {o['title']} — 팀 대화 기록", "",
             f"- 지시 {o['id']} · {datetime.fromtimestamp(o['createdAt']).strftime('%Y-%m-%d %H:%M')} · {'폰' if o.get('via') == 'phone' else 'PC'}에서 지시"
             + (" · 시각은 대략(옛 기록에서 되살림)" if o.get("talkFrom") == "log" else ""), ""]
    for t in o.get("talk") or []:
        to = f" → {TALK_NAME.get(t['to'], t['to'])}" if t.get("to") else ""
        lines += [f"## {st(t['at'])} {TALK_NAME.get(t['who'], t['who'])}{to} ({TALK_KIND.get(t['kind'], t['kind'])})", "", t["text"], ""]
    try:
        ORDERS_DIR.mkdir(exist_ok=True)
        (ORDERS_DIR / f"{o['id']}-대화.md").write_text("\n".join(lines), encoding="utf-8")
    except Exception as e:
        print("대화 기록 저장 실패:", e)


def talk_view(oid, frm):
    with ORDER_LOCK:
        o = ORDERS.get(oid)
        if not o:
            return {"items": []}
        if "talk" not in o and o.get("status") not in ("running", "stopping", "scheduled"):
            talk_backfill(o)
            save_order(o)
            write_talk_md(o)
        return {"items": [dict(t) for t in o.get("talk") or [] if t["i"] >= frm], "approx": o.get("talkFrom") == "log",
                "file": f"dashboard/orders/{o['id']}-대화.md" if o.get("talk") else None}


def show_event(o, ev, owners, talk):
    """실행 기록 한 줄 → 진행 단계(o['steps'])·일하는 담당·팀 대화. ORDER_LOCK 안에서 부른다."""
    if ev.get("session_id"):
        o["sessionId"] = ev["session_id"]
    parent = owners.get(ev.get("parent_tool_use_id"))
    if ev.get("type") == "assistant":
        for b in ev_blocks(ev):
            if b.get("type") == "tool_use":
                who = desk_of(b) if not parent else None
                if who:
                    owners[b.get("id")] = who
                o["steps"] = (o.get("steps") or [])[-29:] + [{"text": step_text(b), "who": who or parent or "claude", "at": time.time()}]
            elif b.get("type") == "text" and str(b.get("text") or "").strip():
                o["last"] = str(b["text"]).strip()[-400:]
    elif ev.get("type") == "user" and not parent:
        for b in ev_blocks(ev):
            if b.get("type") == "tool_result":
                owners.pop(b.get("tool_use_id"), None)
    talk.feed(ev)
    o["active"] = sorted(set(owners.values()))
    # 이 지시에서 일한 자리(끝나면 녹색 '작업 완료'로 남는다, 2026-10-30)
    o["worked"] = sorted(set(o.get("worked") or ["claude"]) | set(owners.values()))


END_GRACE = 60  # 정상 끝 보고 뒤 이만큼(초) 지나도 claude -p 가 안 꺼지면 대시보드가 끈다


class EndWatch:
    """claude -p 가 정상 끝 보고(result success)를 내고도 스스로 안 꺼지는 경우를 알아챈다.
    2026-11-07 도야짬뽕: 14:28 끝 보고·커밋 뒤에도 안 꺼져 40분 제한(14:40)까지 '실행 중'이었다(캡틴 결정 가-1).
    끝 보고가 없거나, 백그라운드 담당(background_tasks_changed)·백그라운드 명령(task_started → task_notification)이
    남아 있으면 지금처럼 기다린다. 40분 제한(ORDER_TIMEOUT)은 그대로."""

    def __init__(self, grace=END_GRACE):
        self.grace, self.done_at, self.last = grace, None, time.time()
        self.agents, self.started = set(), set()  # 남은 백그라운드 담당 task_id, 끝 알림을 아직 못 받은 tool_use_id

    def feed(self, ev, now=None):
        now = now or time.time()
        self.last = now
        t, st = ev.get("type"), ev.get("subtype")
        if t == "result":
            self.done_at = now if (st == "success" and not ev.get("is_error")) else None
        elif t in ("assistant", "user"):
            self.done_at = None  # 다시 일하기 시작함(백그라운드 담당 보고를 받고 이어 가는 경우 등)
        elif t == "system" and st == "background_tasks_changed":
            self.agents = {x.get("task_id") for x in (ev.get("tasks") or []) if isinstance(x, dict)}
        elif t == "system" and st == "task_started" and ev.get("tool_use_id"):
            self.started.add(ev["tool_use_id"])
        elif t == "system" and st == "task_notification":
            self.started.discard(ev.get("tool_use_id"))

    def stuck(self, now=None):
        now = now or time.time()
        return bool(self.done_at and not self.agents and not self.started and now - max(self.done_at, self.last) >= self.grace)


def end_watch_loop(o, p, watch, every=5):
    """실행 중 몇 초마다 확인 → 끝 보고 뒤 안 꺼진 채 grace 가 지나면 프로그램을 끈다(출력이 닫혀 run_order 가 '끝남'으로 마무리)."""
    while p.poll() is None:
        time.sleep(every)
        with ORDER_LOCK:
            hit = p.poll() is None and watch.stuck() and o.get("status") == "running"
            if hit:
                o["autoEnded"] = time.time()
        if hit:
            print(f"지시 {o['id']}: 끝 보고 뒤 {watch.grace}초 지나도 claude -p 가 안 꺼져 대시보드가 끕니다")
            try:
                p.kill()
            except Exception:
                pass
            return


def run_order(o, prompt):
    try:
        cached("hr", 120, build_hr)  # 비서실장이 읽을 out/hr.json 을 새로 만든다
    except Exception:
        pass
    exe = claude_exe()
    args = [exe, "-p", "--output-format", "stream-json", "--verbose", "--permission-mode", "auto",
            "--strict-mcp-config", "--append-system-prompt", ORDER_RULES + (ARGON_RULE if o.get("argon") else ""),
            "--add-dir", r"G:\내 드라이브\QR메뉴판",
            "--allowedTools", *ORDER_ALLOW, "--disallowedTools", *ORDER_DENY]
    if o.get("sessionId"):
        args += ["--resume", o["sessionId"]]
    env = {k: v for k, v in os.environ.items() if k not in ("ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "CLAUDECODE", "CLAUDE_CODE_ENTRYPOINT", *SECRET_ENV)}  # 비밀값은 AI에게 안 넘김
    # 코덱스(npm 설치)·안티그래비티 폴더를 PATH 앞에 붙인다: 창 없는 실행의 셸에서 'codex: command not found'가 났다(2026-10-29)
    extra = [str(Path(os.environ.get("APPDATA", "")) / "npm"), str(Path(os.environ.get("LOCALAPPDATA", "")) / "agy" / "bin")]
    env.update(PYTHONUTF8="1", PYTHONIOENCODING="utf-8")  # 한글 경로·출력에서 python 도구가 죽지 않게
    env["PATH"] = os.pathsep.join([d for d in extra if Path(d).is_dir()] + [env.get("PATH", "")])
    log = ORDERS_DIR / f"{o['id']}.jsonl"
    result, err, used = None, None, 0
    owners = {}  # 도구 호출 id → 그 일을 하는 담당 (담당 안에서 부른 도구도 그 담당 몫)
    o["active"] = []
    with ORDER_LOCK:
        if "talk" not in o and o.get("sessionId"):
            talk_backfill(o)  # 기능 전 지시를 '답하기'로 이어 가면 앞 대화부터 채운다
        talk = Talk(o)
        talk.add("captain", "claude", "ask", prompt)
    try:
        p = subprocess.Popen(args, cwd=str(ROOT), stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                             env=env, creationflags=NO_WINDOW)
        PROCS[o["id"]] = p
        p.stdin.write(prompt.encode("utf-8"))  # 지시문은 표준 입력으로 (명령줄 따옴표·길이 문제 없음)
        p.stdin.close()
        killer = threading.Timer(ORDER_TIMEOUT, p.kill)
        killer.start()
        watch = EndWatch()
        threading.Thread(target=end_watch_loop, args=(o, p, watch), daemon=True).start()
        with open(log, "ab") as f:
            for raw in p.stdout:
                f.write(raw)
                try:
                    ev = json.loads(raw)
                except Exception:
                    continue
                if not isinstance(ev, dict):
                    continue
                with ORDER_LOCK:
                    watch.feed(ev)
                    if ev.get("type") == "result":
                        result = ev
                        # 담당이 백그라운드로 일하면 한 실행에 result 가 여러 번 온다 → 모두 더한다(마지막 것만 세면 0으로 나왔다, 2026-11-01)
                        u = ev.get("usage") if isinstance(ev.get("usage"), dict) else {}
                        used += sum(int(u.get(k) or 0) for k in ("input_tokens", "output_tokens", "cache_creation_input_tokens", "cache_read_input_tokens"))
                    # 화면 표시(진행 단계·팀 대화)는 한 줄 해석이 틀려도 그 줄만 건너뛴다.
                    # 여기서 죽으면 비서실장은 아직 일하는데 지시가 '실패'가 됐다(2026-11-04 태백산 'str' object has no attribute 'get' 건)
                    try:
                        show_event(o, ev, owners, talk)
                    except Exception as e:
                        print("실행 기록 한 줄 건너뜀:", o["id"], ev.get("type"), ev.get("subtype"), repr(e)[:200])
        p.wait()
        killer.cancel()
    except Exception as e:
        err = str(e)[:300]
    with ORDER_LOCK:
        PROCS.pop(o["id"], None)
        o["active"] = []
        if o.get("status") == "stopping":
            o["status"], text = "stopped", "사용자가 멈췄습니다."
        elif result and not result.get("is_error"):
            o["status"], text = "done", (result.get("result") or "").strip()
        else:
            o["status"] = "fail"
            text = (result or {}).get("result") or err or "실행이 끝났지만 결과가 없습니다(시간 초과 또는 로그인 문제). 기록: dashboard/orders/" + log.name
            if "Not logged in" in text or "/login" in text:  # 데스크톱 앱 로그인은 앱 안에만 있어서 따로 한 번 로그인해야 한다
                text = ("Claude Code 로그인이 필요합니다(처음 한 번만). dashboard\\claude-login.bat 을 두 번 눌러 "
                        "'Claude account with subscription'으로 로그인한 뒤 /exit 하고, 여기서 '답하기'로 다시 보내 주세요.")
        m = re.search(r"^\s*결재\s*[:：]\s*(.+)$", text, re.M)
        # '결재: 없음(…)'은 결재가 아니다 (2026-10-28 확정이 되풀이된 건)
        o["approval"] = m.group(1).strip() if (m and o["status"] == "done" and not re.match(r"(없음|없습니다|해당 없음)", m.group(1).strip())) else None
        o["decision"] = None
        o["seenAt"] = None  # 새 보고 → 캡틴이 결재함에서 다시 열어 볼 때까지 '작업 완료' 표시
        # 캡처: 보고의 '캡처: <파일>.png' 줄 → 결재함에 그림으로 보여 준다(dashboard/out 안 파일만)
        shots = [Path(x).name for x in re.findall(r"^\s*캡처\s*[:：]\s*`?([^\s`]+\.png)", text, re.M)]
        o["images"] = sorted(set((o.get("images") or []) + [f for f in shots if (OUT / f).is_file()]))
        d = re.search(r"^\s*배포\s*준비\s*[:：]\s*(.+)$", text, re.M)
        o["deploy"] = [x for x in re.findall(r"[a-z0-9]+", d.group(1)) if (ROOT / "restaurants" / x / "index.html").exists()] if (d and o["status"] == "done") else None
        o["deployState"] = None
        if result:
            o["tokens"] = (o.get("tokens") or 0) + used
            o["tokensVersion"] = 2  # 2026-10-28부터 다시 읽은 것(cache read)까지 센다. 그 전 기록은 적게 나옴
        o["turns"].append({"by": "claude", "text": text, "at": time.time()})
        if o["status"] != "done" and (not o["talk"] or o["talk"][-1]["text"] != talk_clean(text)):
            talk.add("claude", "captain", "report", text)  # 실패·멈춤 이유도 대화에 남긴다
        o["endedAt"] = time.time()
        save_order(o)
        write_talk_md(o)
    _cache.pop("recent", None)
    _cache.pop("stores", None)


def order_blocked():
    if not claude_exe():
        return "Claude Code 실행 파일을 찾지 못함(Claude 데스크톱 앱이 설치돼 있어야 함)"
    if any(o["status"] in ("running", "stopping") for o in ORDERS.values()):
        return "이전 지시가 아직 실행 중이에요. 끝나거나 멈춘 뒤에 보내 주세요."
    bars = cached("quota", 60, build_quota)["claude"]["bars"]
    if any(b["used"] >= 90 and not b["stale"] for b in bars):
        return "Claude 한도가 90%를 넘어 새 일을 받지 않아요(CLAUDE.md: 한도 경고면 멈춤)."
    return None


# ---------------------------------------------------------------- 예약 실행 (2026-11-01, 캡틴 결정 '가-1·가-2')
# 캡틴이 지시창에서 직접 고른 예약만 돈다(AI가 스스로 예약을 만들지 않음). '한도 풀리면' = 90% 넘은 한도가 초기화되는 때,
# 없으면 Claude 5시간 초기화 때(+1분). 대시보드 서버가 켜져 있어야 시작한다(꺼져 있던 동안 지난 예약은 켜질 때 시작).
def next_reset():
    q, now = cached("quota", 60, build_quota), time.time()
    bars = [("Claude " + b["label"], b) for b in q["claude"]["bars"]] + [(b["label"] if b["label"].startswith("Gemini") else "Gemini(Flash·Pro) " + b["label"], b) for b in q["gemini"]["bars"] if not b.get("spare")]
    hot = [(n, b["resetsAt"]) for n, b in bars if b["used"] >= 90 and b.get("resetsAt") and b["resetsAt"] > now]
    if not hot:
        hot = [("Claude 5시간", b["resetsAt"]) for b in q["claude"]["bars"] if b["label"] == "5시간" and b.get("resetsAt") and b["resetsAt"] > now]
    if not hot and any(b["label"] == "5시간" for b in q["claude"]["bars"]):
        return None, ("마지막 기록으로는 Claude 5시간 한도가 이미 초기화됐어요(그 뒤 Claude 앱에서 쓴 양은 대시보드가 몰라요). "
                      "지금 보내거나 '시각 정해서 실행'을 써 주세요.")
    if not hot:
        return None, "Claude 한도 초기화 시각을 몰라요(기록 없음). '시각 정해서 실행'으로 골라 주세요."
    name, at = max(hot, key=lambda x: x[1])
    return at + 60, f"{name} 초기화 뒤"


def when_to_run(when):
    """(시작 시각, 이유) 또는 (None, 오류). when = 'reset' 또는 초 단위 시각."""
    if when == "reset":
        return next_reset()
    try:
        at = float(when)
    except (TypeError, ValueError):
        return None, "예약 시각이 이상해요"
    if at < time.time() + 60:
        return None, "지금보다 1분 이상 뒤 시각을 골라 주세요"
    if at > time.time() + 8 * 86400:
        return None, "예약은 8일 안쪽만 돼요"
    return at, "캡틴이 정한 시각"


def schedule(o, text, when):
    at, why = when_to_run(when)
    if at is None:
        return why
    o.update(status="scheduled", runAt=at, runWhy=why, pending=text, waitWhy=None)
    return None


def scheduler():
    """20초마다: 시각이 된 예약을 하나씩 시작한다. 앞 지시가 실행 중이거나 한도가 막혀 있으면 기다린다."""
    while True:
        time.sleep(20)
        try:
            due = None
            with ORDER_LOCK:
                now = time.time()
                ready = sorted((o for o in ORDERS.values() if o["status"] == "scheduled" and o.get("runAt", 0) <= now), key=lambda o: o["runAt"])
                if ready:
                    err = order_blocked()
                    if err:
                        for o in ready:
                            o["waitWhy"] = err
                    else:
                        due = ready[0]
                        late = now - due["runAt"]
                        if late > 600:
                            due["turns"].append({"by": "system", "text": f"예약 시각보다 {int(late // 60)}분 늦게 시작했어요(대시보드가 꺼져 있었거나 앞 지시가 실행 중이었음).", "at": now})
                        text = due.pop("pending", None) or due["turns"][0]["text"]
                        due.update(status="running", waitWhy=None, startedAt=now, steps=[], last=None)
                        save_order(due)
            if due:
                threading.Thread(target=run_order, args=(due, text), daemon=True).start()
        except Exception as e:
            print("예약 확인 오류:", e)


def start_order(text, via, when=None, argon=False):
    text = text.strip()[:2000]
    if not text:
        return None, "지시를 적어 주세요"
    with ORDER_LOCK:
        err = order_blocked() if not when else (None if claude_exe() else "Claude Code 실행 파일을 찾지 못함")
        if err:
            return None, err
        oid, n = datetime.now().strftime("%m%d-%H%M%S"), 1
        while oid in ORDERS:  # 같은 초에 두 번 보내면 번호가 겹쳐 앞 지시가 덮였다(2026-11-01)
            n += 1
            oid = datetime.now().strftime("%m%d-%H%M%S") + f"-{n}"
        o = {"id": oid, "title": text.splitlines()[0][:60], "status": "running", "via": via, "createdAt": time.time(),
             "turns": [{"by": "me", "text": text, "at": time.time()}], "steps": [], "argon": bool(argon)}
        if when:
            err = schedule(o, text, when)
            if err:
                return None, err
        ORDERS[oid] = o
        save_order(o)
    if not when:
        threading.Thread(target=run_order, args=(o, text), daemon=True).start()
    return o, None


def reply_order(oid, text, approve, when=None):
    with ORDER_LOCK:
        o = ORDERS.get(oid)
        if not o:
            return None, "없는 지시"
        if o["status"] in ("running", "stopping", "scheduled"):
            return None, "아직 실행 중이거나 예약된 지시예요"
        err = order_blocked() if not when else None
        if err:
            return None, err
        text = text.strip()[:2000]
        if o["status"] == "fail" and not o.get("tokens"):
            # 로그인 문제 등으로 한 번도 못 돈 지시 → 처음 지시를 새 대화로 다시 보낸다
            o["sessionId"] = None
            text = o["turns"][0]["text"] + (f"\n\n(덧붙임) {text}" if text else "")
        elif not o.get("sessionId"):
            return None, "이어 갈 대화가 없어요. 새 지시로 보내 주세요."
        elif approve:
            text = f"확정했어({o.get('approval') or '보고한 내용'}). 다음 단계 진행해." + (f" {text}" if text else "")
        elif not text:
            return None, "답(또는 고칠 점)을 적어 주세요"
        if when:
            err = schedule(o, text, when)
            if err:
                return None, err
        else:
            o["status"] = "running"
        o.update(decision="approved" if approve else "replied", approval=None, steps=[], last=None)
        o["turns"].append({"by": "me", "text": text, "at": time.time(), "approve": approve})
        save_order(o)
    if not when:
        threading.Thread(target=run_order, args=(o, text), daemon=True).start()
    return o, None


def seen_order(oid):
    """캡틴이 결재함에서 끝난 지시를 열어 봄 → 배포 없는 지시는 사무실 '작업 완료' 표시가 사라진다(폰·PC 같이)."""
    with ORDER_LOCK:
        o = ORDERS.get(oid)
        if not o:
            return "없는 지시"
        if o["status"] == "done" and not o.get("seenAt"):
            o["seenAt"] = time.time()
            save_order(o)
    return None


def stop_order(oid):
    with ORDER_LOCK:
        o, p = ORDERS.get(oid), PROCS.get(oid)
        if o and o["status"] == "scheduled":  # 예약 취소
            o.update(status="stopped", pending=None, waitWhy=None)
            o["turns"].append({"by": "system", "text": "캡틴이 예약을 취소했어요.", "at": time.time()})
            save_order(o)
            return None
        if not o or not p:
            return "실행 중이 아님"
        o["status"] = "stopping"
    p.kill()
    return None


def open_order_terminal(oid):
    """PC에서 그 지시의 대화를 Claude Code 창(터미널)으로 연다. 창 없는 실행이라 Claude 앱 목록에는 안 보이기 때문."""
    with ORDER_LOCK:
        o = ORDERS.get(oid)
        if not o or not o.get("sessionId"):
            return "열 대화가 없어요"
        if o["status"] in ("running", "stopping"):
            return "실행 중에는 열 수 없어요. 끝난 뒤에 열어 주세요."
        sid = o["sessionId"]
    if not re.fullmatch(r"[0-9a-f-]{36}", sid):
        return "대화 ID가 이상해요"
    exe = claude_exe()
    if not exe:
        return "Claude Code 실행 파일을 찾지 못함"
    subprocess.Popen(["cmd.exe", "/c", "start", "Claude Code", exe, "--resume", sid], cwd=str(ROOT), shell=False)
    return None


def orders_view():
    with ORDER_LOCK:
        rows = sorted(ORDERS.values(), key=lambda o: -o["createdAt"])[:40]
        # 대화(talk)는 길어서 빼고 마지막 번호만 보낸다 → 화면이 /api/talk 로 새것만 받아 간다
        return [json.loads(json.dumps({**{k: v for k, v in o.items() if not k.startswith("_") and k not in ("talk", "pending")},
                                       "talkLast": o["talk"][-1]["i"] if o.get("talk") else None})) for o in rows]


# ---------------------------------------------------------------- 배포 확정 → Vercel (2026-10-28, 사용자 결정 '다-1')
# 캡틴이 결재함에서 [배포 확정]을 누를 때만 돈다. AI(claude -p)는 토큰을 보지도 쓰지도 않는다 — 이 서버가 직접 한다.
# - 토큰: 사용자가 직접 넣은 Windows 사용자 환경변수 VERCEL_TOKEN (저장·출력하지 않음). 넣은 뒤 대시보드를 다시 켜야 읽힌다.
# - 순서(CLAUDE.md 3장): 작업 브랜치만 push(main 금지) → main 포함 확인 → 가게 배포(gitSource) → 새 가게면 로그인 보호·도메인
#   → 가게 찾기용이면 qrmenu-intro 도 같은 커밋으로(직전 배포 커밋이 내 브랜치에 들어 있을 때만) → 사이트맵 주소 수 확인.
# - 결제·요금제·도메인 구매 API 는 부르지 않는다.
VERCEL_TEAM = "team_0rG2nNozGYqyREs926yHTVBs"  # jinwoo8
GIT_ORG, GIT_REPO = "jinujeon05-blip", "short-form"
DEPLOYS = {}  # 주문 id → 진행 상태


def vercel_token():
    return user_env("VERCEL_TOKEN") or ""


def vapi(method, path, body=None, tries=3):
    """Vercel API 호출. 인터넷이 잠깐 끊기면(WinError 10060 등) 몇 초 쉬고 tries 번까지 다시 묻는다
    (2026-11-04 바보랑 건: 한 번 끊김에 배포는 됐는데 '배포 멈춤'이 뜸). 그래도 안 되면 OSError 를 그대로 올린다."""
    sep = "&" if "?" in path else "?"
    for i in range(tries):
        req = urllib.request.Request(f"https://api.vercel.com{path}{sep}teamId={VERCEL_TEAM}", method=method,
                                     data=json.dumps(body).encode() if body is not None else None,
                                     headers={"Authorization": "Bearer " + vercel_token(), "Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.status, json.loads(r.read().decode("utf-8") or "{}")
        except urllib.error.HTTPError as e:
            try:
                return e.code, json.loads(e.read().decode("utf-8") or "{}")
            except Exception:
                return e.code, {}
        except OSError:  # URLError·시간 초과·연결 끊김(HTTP 응답이 아예 없음)
            if i == tries - 1:
                raise
            time.sleep(5 * (i + 1))


def find_deploy(project, sha, since_ms):
    """배포 요청 중에 연결이 끊겼을 때: 그 요청이 실제로 Vercel 에 닿아 배포가 생겼는지 찾는다(중복 배포·비용 방지)."""
    code, lst = vapi("GET", f"/v6/deployments?projectId={project}&target=production&limit=5&since={since_ms}")
    for d in lst.get("deployments") or []:
        if (d.get("meta") or {}).get("githubCommitSha") == sha:
            return d.get("uid") or d.get("id")
    return None


def deploy_one(project, root, branch, sha, new_ok, log):
    """프로젝트 하나를 gitSource 로 production 배포하고 READY 까지 기다린다."""
    code, prj = vapi("GET", f"/v9/projects/{project}")
    is_new = code == 404
    if not is_new:  # 같은 커밋이 이미 배포돼 있으면 다시 빌드하지 않는다(다시 누를 때 비용 아낌)
        c2, lst = vapi("GET", f"/v6/deployments?projectId={project}&target=production&limit=1")
        last = (lst.get("deployments") or [{}])[0]
        prev = (last.get("meta") or {}).get("githubCommitSha")
        same = prev == sha or (prev and sh(["git", "diff", "--quiet", prev, sha, "--", root])[0] == 0)
        if same and (last.get("readyState") or last.get("state")) == "READY":
            log(f"{project}: 배포된 것과 {root} 내용이 같아 건너뜀")
            return False
    if is_new and not new_ok:
        raise RuntimeError(f"{project} 프로젝트가 없어요")
    body = {"name": project, "project": project, "target": "production",
            "gitSource": {"type": "github", "org": GIT_ORG, "repo": GIT_REPO, "ref": branch, "sha": sha}}
    if is_new:
        body["projectSettings"] = {"rootDirectory": root, "framework": None, "buildCommand": None,
                                   "outputDirectory": None, "installCommand": None, "devCommand": None}
    log(f"{project}: 배포 시작" + (" (새 프로젝트)" if is_new else ""))
    did = None
    since = int(time.time() * 1000) - 60000
    for attempt in range(2):  # 배포 요청은 자동 반복하지 않는다 — 끊기면 먼저 실제로 생겼는지 보고, 없을 때만 한 번 더
        try:
            code, d = vapi("POST", "/v13/deployments", body, tries=1)
        except OSError as e:
            time.sleep(10)
            did = find_deploy(project, sha, since)
            if did:
                log(f"{project}: 연결이 잠깐 끊겼지만 배포는 시작돼 있음")
                break
            if attempt == 1:
                raise RuntimeError(f"{project} 배포 요청 중 연결 끊김(두 번): {e}")
            log(f"{project}: 연결이 끊겨 배포 요청을 한 번 더 보냄")
            continue
        if code >= 300:
            raise RuntimeError(f"{project} 배포 요청 실패: {(d.get('error') or {}).get('message', code)}")
        did = d["id"]
        break
    st, fails = None, 0
    for _ in range(120):  # 최대 10분. 확인 중 끊김은 6번(약 3분) 연속일 때만 멈춘다
        time.sleep(5)
        try:
            code, d = vapi("GET", f"/v13/deployments/{did}")
        except OSError as e:
            fails += 1
            if fails >= 6:
                raise RuntimeError(f"{project} 배포 확인 중 인터넷 연결이 계속 끊김: {e} (Vercel 화면에서 결과 확인)")
            continue
        fails = 0
        st = d.get("readyState") or d.get("status")
        if st in ("READY", "ERROR", "CANCELED"):
            break
    if st != "READY":
        raise RuntimeError(f"{project} 배포 {st or '시간 초과'} (Vercel 화면에서 기록 확인)")
    log(f"{project}: 배포 완료")
    if is_new:
        vapi("PATCH", f"/v9/projects/{project}", {"ssoProtection": {"deploymentType": "prod_deployment_urls_and_all_previews"}})
    return is_new


def run_deploy(o, shops):
    def log(t):
        with ORDER_LOCK:
            o["deployLog"] = (o.get("deployLog") or []) + [t]
    try:
        code, branch = sh(["git", "branch", "--show-current"])
        branch = branch.strip()
        if not branch or branch == "main":
            raise RuntimeError("main 브랜치에서는 배포하지 않아요(작업 브랜치에서만)")
        # 배포는 push 한 커밋으로 하므로, 배포할 가게 폴더와 sales 에 커밋 안 한 수정이 없으면 된다.
        # (seo 도구가 다른 가게 sitemap 날짜를 바꿔 둔 것은 배포와 상관없다 — 2026-10-29 바삭치킨 건)
        code, dirty = sh(["git", "status", "--porcelain", "--untracked-files=no", "--", "sales", *[f"restaurants/{s}" for s in shops]])
        if dirty.strip():
            raise RuntimeError("배포할 가게·가게 찾기 파일에 커밋 안 한 수정이 있어요: " + " ".join(l[3:] for l in dirty.splitlines()[:5]))
        sh(["git", "fetch", "origin", "main"], timeout=120)
        code, _ = sh(["git", "merge-base", "--is-ancestor", "origin/main", "HEAD"])
        if code != 0:
            # 비서실장(claude -p)은 git merge 가 금지라 합칠 수 없다 → 캡틴이 [배포 확정]을 누르면 서버가 직접 합친다
            # (2026-11-07 안동곱창·육대장 '배포 대기'가 계속 남은 건, 캡틴 결정 다-1). 충돌이 있으면 합치지 않고 멈춘다.
            code, out = sh(["git", "merge-tree", "--write-tree", "HEAD", "origin/main"])
            if code != 0:
                raise RuntimeError("이 브랜치에 최신 main이 없고, 합치면 충돌이 나요(" + " ".join(out.split()[1:6]) + "). PC Claude 앱에서 'main 합쳐줘'로 충돌을 풀어 주세요.")
            code, dirty_all = sh(["git", "status", "--porcelain", "--untracked-files=no"])
            if dirty_all.strip():
                raise RuntimeError("이 브랜치에 최신 main이 없는데, 커밋 안 한 수정이 있어 합치지 않았어요: " + " ".join(l[3:] for l in dirty_all.splitlines()[:5]))
            n = sh(["git", "rev-list", "--count", "HEAD..origin/main"])[1].strip()
            code, out = sh(["git", "merge", "--no-edit", "origin/main"], timeout=120)
            if code != 0:
                sh(["git", "merge", "--abort"])
                raise RuntimeError("main 합치기 실패(되돌림): " + out.strip()[-200:])
            log(f"최신 main(커밋 {n}개)을 이 브랜치에 합침(충돌 없음)")
        code, out = sh(["git", "push", "origin", f"HEAD:refs/heads/{branch}"], timeout=180)
        if code != 0:
            raise RuntimeError("깃허브에 올리기(push) 실패: " + out.strip()[-200:])
        sha = sh(["git", "rev-parse", "HEAD"])[1].strip()
        log(f"깃허브에 올림: {branch} {sha[:7]}")
        listing = False
        for shop in shops:
            deploy_one(f"{shop}-menu", f"restaurants/{shop}", branch, sha, True, log)
            # 새 프로젝트가 아니어도 도메인이 없으면 붙인다(프로젝트만 먼저 생기고 도메인이 빠진 경우 — 2026-10-31 구이구이 404 건)
            code, _ = vapi("GET", f"/v9/projects/{shop}-menu/domains/{shop}.qrmenuasia.com")
            if code == 404:
                code, d = vapi("POST", f"/v10/projects/{shop}-menu/domains", {"name": f"{shop}.qrmenuasia.com"})
                log(f"도메인 {shop}.qrmenuasia.com " + ("연결" if code < 300 else f"연결 실패({(d.get('error') or {}).get('message', code)})"))
            listing = listing or f"id: '{shop}'" in read("sales/stores/data.js") or f'id: "{shop}"' in read("sales/stores/data.js")
        if listing:
            # 가게 찾기·사이트맵: 직전 production 배포 커밋이 내 브랜치에 들어 있어야 다른 가게가 빠지지 않는다
            code, lst = vapi("GET", "/v6/deployments?projectId=qrmenu-intro&target=production&limit=1")
            prev = ((lst.get("deployments") or [{}])[0].get("meta") or {}).get("githubCommitSha")
            # squash 머지를 쓰면 커밋이 이어지지 않으므로(2026-10-28 한사리 c0b58a2 건) 가게 목록으로 비교한다:
            # 직전 배포의 가게가 모두 지금 목록에 있어야 한다
            if prev and sh(["git", "merge-base", "--is-ancestor", prev, "HEAD"])[0] != 0:
                sh(["git", "fetch", "origin", prev], timeout=120)
                code, old = sh(["git", "show", f"{prev}:sales/stores/data.js"])
                ids = lambda t: set(re.findall(r"^\s*\{ id: [\"']([a-z0-9]+)", t, re.M))
                if code != 0:
                    raise RuntimeError(f"qrmenu-intro 직전 배포({prev[:7]})의 가게 목록을 읽지 못해 멈췄어요.")
                missing = ids(old) - ids(read("sales/stores/data.js"))
                if missing:
                    raise RuntimeError(f"qrmenu-intro 직전 배포({prev[:7]})에 있던 가게가 이 브랜치에 없어요: {', '.join(sorted(missing))}. 먼저 합쳐야 해요.")
                log(f"qrmenu-intro 직전 배포({prev[:7]})의 가게는 모두 들어 있음")
            deploy_one("qrmenu-intro", "sales", branch, sha, False, log)
            try:
                with urllib.request.urlopen("https://qrmenuasia.com/sitemap.xml", timeout=30) as r:
                    n = r.read().decode("utf-8").count("<loc>")
                stores = len(re.findall(r"^\s*\{ id:", read("sales/stores/data.js"), re.M))
                log(f"사이트맵 주소 {n}개 (가게 {stores}곳 + 2 = {stores + 2}개여야 함)" + (" ✔" if n == stores + 2 else " ✘ 확인 필요"))
            except Exception as e:
                log(f"사이트맵 확인 실패: {e}")
        with ORDER_LOCK:
            o["deployState"] = "done"
            o["turns"].append({"by": "system", "text": "배포 완료: " + ", ".join(f"https://{s}.qrmenuasia.com" for s in shops)
                               + "\n" + "\n".join(o.get("deployLog") or []), "at": time.time()})
    except Exception as e:
        with ORDER_LOCK:
            o["deployState"] = "fail"
            o["deployErr"] = str(e)[:300]  # 결재함에 빨간 글씨로 보여 줌
            o["turns"].append({"by": "system", "text": "배포 멈춤: " + str(e)[:300] + "\n" + "\n".join(o.get("deployLog") or []), "at": time.time()})
    with ORDER_LOCK:
        save_order(o)
    _cache.pop("stores", None)


def start_deploy(oid):
    if not vercel_token():
        return "Vercel 토큰이 없어요. 대시보드 안내대로 VERCEL_TOKEN 을 넣고 대시보드를 다시 켜 주세요."
    with ORDER_LOCK:
        o = ORDERS.get(oid)
        if not o or not o.get("deploy"):
            return "배포할 가게가 없는 지시예요"
        if o["status"] in ("running", "stopping") or any(x.get("deployState") == "running" for x in ORDERS.values()):
            return "실행 중인 일이 끝난 뒤에 눌러 주세요"
        o.update(deployState="running", deployLog=[], deployErr=None)
        o["turns"].append({"by": "me", "text": "배포 확정: " + ", ".join(o["deploy"]), "at": time.time(), "approve": True})
        save_order(o)
    threading.Thread(target=run_deploy, args=(o, list(o["deploy"])), daemon=True).start()
    return None


# ---------------------------------------------------------------- 브리핑·업무 기록
def build_activity():
    """업무 기록: 최근 커밋 + 지시 + 점검을 시간순으로."""
    code, out = sh(["git", "log", "-40", "--format=%ct\t%h\t%s"], timeout=30)
    items = []
    for line in out.splitlines():
        t, sha, msg = (line.split("\t", 2) + ["", ""])[:3]
        if t.isdigit():
            who = "claude"  # 커밋은 비서실장이 한다(설명 글자로 담당을 짐작하면 틀림)
            items.append({"at": int(t), "who": who, "kind": "commit", "text": msg, "ref": sha})
    for o in orders_view():
        for tr in o["turns"]:
            if tr["by"] == "system":
                continue
            items.append({"at": tr["at"], "who": "captain" if tr["by"] == "me" else "claude", "kind": "order", "ref": o["id"],
                          "text": ("지시: " if tr["by"] == "me" else "보고: ") + tr["text"].strip().splitlines()[0][:120]})
    with JOB_LOCK:
        for j in JOBS.values():
            items.append({"at": j["startedAt"], "who": j.get("desk") or "claude", "kind": "job",
                          "text": f"{j['label']} {j.get('shop') or ''} · {({'ok': '통과', 'fail': '문제 있음'}).get(j['status'], '실행 중')}"})
    return sorted(items, key=lambda i: -i["at"])[:50]


def build_brief():
    """오늘 브리핑 3줄: 어제·오늘 한 일 / 기다리는 결재 / 남은 할 일·한도. 예약 작업 없이 화면을 열 때 계산한다."""
    since = time.time() - 36 * 3600
    code, out = sh(["git", "log", f"--since={int(since)}", "--format=%s"], timeout=30)
    msgs = [m for m in out.splitlines() if m.strip()]
    shops = sorted({m.group(1).strip() for s in msgs for m in [re.search(r"새 가게 ([^(]+)\(", s)] if m})
    line1 = f"최근 하루 반 동안 커밋 {len(msgs)}건" + (f" · 새 가게: {', '.join(shops)}" if shops else "") if msgs else "최근 하루 반 동안 커밋이 없습니다."
    ov = orders_view()
    wait = [o for o in ov if o["status"] == "done" and o.get("approval")]
    run = [o for o in ov if o["status"] in ("running", "stopping")]
    sched = sorted((o for o in ov if o["status"] == "scheduled"), key=lambda o: o["runAt"])
    line2 = (f"결재 기다림 {len(wait)}건: {wait[0]['approval'][:40]}" if wait else "결재 기다리는 일 없음") + (f" · 실행 중 {len(run)}건" if run else "") \
        + (f" · 예약 {len(sched)}건(다음 {datetime.fromtimestamp(sched[0]['runAt']).strftime('%H:%M')})" if sched else "")
    todo = sum(1 for l in read("docs/todo.md").splitlines() if re.match(r"^- \*\*", l))
    bars = cached("quota", 60, build_quota)["claude"]["bars"]
    worst = max((b["used"] for b in bars if not b["stale"]), default=None)
    line3 = f"남은 할 일 {todo}건 · Claude 한도 " + (f"{worst}% 사용" if worst is not None else "확인 불가(Claude 앱 입력창 아래에서 확인)")
    try:
        line4 = hr_line()
    except Exception:
        line4 = "인력: 읽기 실패(잠시 뒤 새로고침)"
    return {"lines": [line1, line2, line3, line4], "at": datetime.now().strftime("%H:%M")}


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
        if p == "/api/orders":
            return self.json({"orders": orders_view(), "ready": claude_exe() is not None, "vercel": bool(vercel_token())})
        if p == "/api/talk":
            qs = parse_qs(u.query)
            frm = (qs.get("from") or ["0"])[0]
            return self.json(talk_view((qs.get("id") or [""])[0], int(frm) if frm.isdigit() else 0))
        if p == "/api/order/when":
            at, why = next_reset()
            return self.json({"at": at, "why": why} if at else {"error": why})
        if p == "/api/activity":
            return self.json({"items": build_activity()})
        if p == "/api/hr":
            return self.json(cached("hr", 120, build_hr))
        if p == "/api/brief":
            return self.json(build_brief())
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
        path = urlparse(self.path).path
        if path == "/api/deploy":
            err = start_deploy(str(body.get("id", "")))
            return self.json({"error": err} if err else {"ok": True}, 400 if err else 200)
        if path == "/api/order/seen":
            err = seen_order(str(body.get("id", "")))
            return self.json({"error": err} if err else {"ok": True}, 400 if err else 200)
        if path == "/api/order/open":
            if isinstance(self, RemoteHandler):
                return self.json({"error": "대화 창은 PC에서만 열 수 있어요"}, 400)
            err = open_order_terminal(str(body.get("id", "")))
            return self.json({"error": err} if err else {"ok": True}, 400 if err else 200)
        if path in ("/api/order", "/api/order/reply", "/api/order/stop"):
            via = "phone" if isinstance(self, RemoteHandler) else "pc"
            when = body.get("when") or None  # 예약: 'reset'(한도 풀리면) 또는 초 단위 시각
            if path == "/api/order":
                o, err = start_order(str(body.get("text", "")), via, when, bool(body.get("argon")))
            elif path == "/api/order/reply":
                o, err = reply_order(str(body.get("id", "")), str(body.get("text", "")), bool(body.get("approve")), when)
            else:
                o, err = None, stop_order(str(body.get("id", "")))
            return self.json({"error": err} if err else {"ok": True, "id": o and o["id"]}, 400 if err else 200)
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
<title>Jinwoo 에이전트</title><style>body{font-family:system-ui,sans-serif;background:#f3f4f6;margin:0;display:grid;place-items:center;min-height:100vh}
form{background:#fff;padding:24px;border-radius:14px;box-shadow:0 2px 12px #0001;width:min(320px,90vw)}h1{font-size:18px;margin:0 0 6px}
p{color:#666;font-size:13px;margin:0 0 14px}input,button{width:100%;box-sizing:border-box;font-size:18px;padding:10px;border-radius:8px}
input{border:1px solid #ccc;margin-bottom:10px;letter-spacing:4px;text-align:center}button{border:0;background:#2563eb;color:#fff}#e{color:#c00}</style>
<form method="post" action="/pin"><h1>Jinwoo 에이전트</h1><p>사진 수집기와 같은 PIN을 넣어 주세요.</p><input name="pin" type="password" inputmode="numeric" autocomplete="current-password" autofocus>
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
    load_orders()
    threading.Thread(target=scheduler, daemon=True).start()
    srv = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Jinwoo 에이전트(QR메뉴 대시보드): http://{HOST}:{PORT}  (이 PC에서만 열림, 끄려면 이 창을 닫거나 Ctrl+C)")
    start_remote()
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass
