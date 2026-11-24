"""방문 현황 담당(선별팀 팀장) — 오늘 방문자를 30분마다 기록하고 쉬운 말 보고를 만든다 (2026-11-24, 캡틴 결정 가-1·나-1·다-1).

- 데이터: qrmenuasia.com/api/stats?days=1 (관리자 키 QRMENU_ADMIN_KEY, server.user_env 로 그때그때 읽음, 저장·출력 안 함)
- 기록: dashboard/out/visits/<베트남 날짜>.jsonl — 한 줄 = 한 번 찍은 결과(방문 있는 가게만). git 에 안 올라감(out/).
- 자동: 베트남 시간 08:00~22:00, 매시 00분·30분(가-1). 그 밖 시간은 '지금 보고해'(수동)만.
- 사이트(qrmenuasia.com)는 고치지 않는다. 읽기(GET)만 한다.
"""
import json
import threading
import time
import urllib.request
from datetime import datetime, timedelta, timezone

M = None  # server 모듈 (init 에서 받음)
VN = timezone(timedelta(hours=7))
HOURS = (8, 22)          # 자동 기록 시간대(포함)
MANUAL_GAP = 120         # '지금 보고해'는 2분에 한 번만 실제로 읽음(무료 한도 아끼기)
LOCK = threading.Lock()
STATE = {"error": None, "errorAt": None, "lastManual": 0}

# 들어온 경로 → 누구나 아는 말 (sales/api/_lib.js srcOf 기준)
SRC = {
    "qr": ("QR 찍고", "꼬리표 달린 새 QR을 찍고 들어옴"),
    "direct": ("주소창·즐겨찾기·옛 QR", "주소를 직접 쳤거나 저장한 링크, 또는 꼬리표 없는 예전 인쇄 QR(구분이 안 돼 여기 섞여요)"),
    "site": ("우리 소개서·가게 찾기에서", "qrmenuasia.com 소개서·가게 찾기·다른 가게 메뉴판에서 넘어옴"),
    "stores": ("가게 찾기 목록에서", "가게 찾기 페이지의 가게 버튼을 눌러 들어옴"),
    "search": ("구글·네이버 검색", "검색창에 찾아보고 들어옴"),
    "social": ("SNS(페북·잘로·인스타 등)", "SNS·메신저에 올라간 링크를 눌러 들어옴"),
    "link": ("다른 사이트 링크", "위에 없는 다른 사이트에 걸린 링크"),
}
PSEUDO = {"stores": "가게 찾기 페이지", "intro": "소개서(qrmenuasia.com)"}
CC = {"vn": "베트남", "kr": "한국", "us": "미국", "cn": "중국", "jp": "일본", "tw": "대만", "th": "태국", "sg": "싱가포르",
      "my": "말레이시아", "au": "호주", "ru": "러시아", "in": "인도", "ph": "필리핀", "id": "인도네시아", "fr": "프랑스",
      "de": "독일", "gb": "영국", "ca": "캐나다", "hk": "홍콩", "kh": "캄보디아", "la": "라오스", "nl": "네덜란드", "it": "이탈리아", "es": "스페인", "nz": "뉴질랜드", "na": "알 수 없음"}
LANG = {"ko": "한국어", "vi": "베트남어", "en": "영어", "zh": "중국어", "ja": "일본어", "ru": "러시아어", "th": "태국어", "fr": "프랑스어", "na": "알 수 없음"}


def init(main):
    global M
    M = main
    M.OUT.joinpath("visits").mkdir(parents=True, exist_ok=True)


def now_vn():
    return datetime.now(VN)


def day_file(date):
    return M.OUT / "visits" / f"{date}.jsonl"


def read_day(date):
    f = day_file(date)
    rows = []
    if not f.exists():
        return rows
    for line in f.read_text(encoding="utf-8").splitlines():
        try:
            r = json.loads(line)
            if isinstance(r, dict) and isinstance(r.get("shops"), dict):
                rows.append(r)
        except Exception:
            continue  # 한 줄이 이상해도 나머지는 읽는다
    return rows


def fetch_today():
    key = M.user_env("QRMENU_ADMIN_KEY")
    if not key:
        raise RuntimeError("관리자 키(QRMENU_ADMIN_KEY)가 이 PC 사용자 환경변수에 없어요")
    req = urllib.request.Request("https://qrmenuasia.com/api/stats?days=1", headers={"x-admin-key": key})
    with urllib.request.urlopen(req, timeout=25) as r:
        data = json.loads(r.read().decode("utf-8"))
    shops = {}
    for sid, v in (data.get("shops") or {}).items():
        if not isinstance(v, dict) or not (v.get("vis") or v.get("pv")):
            continue
        shops[sid] = {k: v.get(k) or {} for k in ("src", "cc", "dev", "lang")}
        shops[sid].update(vis=int(v.get("vis") or 0), pv=int(v.get("pv") or 0))
    dates = data.get("dates") or []
    return (dates[-1] if dates else now_vn().strftime("%Y-%m-%d")), shops


def snapshot(manual=False):
    """지금 방문 현황을 읽어 오늘 파일에 한 줄 더한다. 실패하면 오류만 남기고 None."""
    with LOCK:
        try:
            date, shops = fetch_today()
        except Exception as e:
            STATE.update(error=str(e)[:200], errorAt=time.time())
            print("방문 현황 읽기 실패:", str(e)[:200])
            return None
        n = now_vn()
        row = {"t": int(time.time()), "date": date, "hm": n.strftime("%H:%M"), "manual": manual, "shops": shops}
        with open(day_file(date), "a", encoding="utf-8") as f:
            f.write(json.dumps(row, ensure_ascii=False, separators=(",", ":")) + "\n")
        STATE.update(error=None, errorAt=None)
        return row


def slot_of(n):
    return f"{n.hour:02d}:{0 if n.minute < 30 else 30:02d}"


def loop():
    """20초마다: 08:00~22:00 사이 새 30분 칸이 시작됐는데 그 칸 기록이 없으면 한 번 찍는다."""
    while True:
        try:
            n = now_vn()
            if HOURS[0] <= n.hour <= HOURS[1] and not (n.hour == HOURS[1] and n.minute >= 30):
                slot = slot_of(n)
                done = any(not r.get("manual") and slot_of(datetime.fromtimestamp(r["t"], VN)) == slot
                           for r in read_day(n.strftime("%Y-%m-%d"))[-3:])
                fail_wait = STATE["errorAt"] and time.time() - STATE["errorAt"] < 300  # 실패하면 5분 뒤 다시
                if not done and not fail_wait:
                    snapshot(manual=False)
        except Exception as e:
            print("방문 현황 자동 기록 오류:", e)
        time.sleep(20)


def start():
    threading.Thread(target=loop, daemon=True).start()


def refresh():
    """'지금 보고해' — 2분 안에 다시 누르면 마지막 기록을 그대로 쓴다."""
    if time.time() - STATE["lastManual"] < MANUAL_GAP:
        return None
    STATE["lastManual"] = time.time()
    return snapshot(manual=True)


# ---------------------------------------------------------------- 보고 만들기
def total(row):
    return sum(s["vis"] for s in row["shops"].values()), sum(s["pv"] for s in row["shops"].values())


def merge(row, field):
    out = {}
    for s in row["shops"].values():
        for k, v in (s.get(field) or {}).items():
            out[k] = out.get(k, 0) + int(v or 0)
    return out


def names():
    try:
        st = M.cached("stores", 30, M.build_stores).get("stores", [])
    except Exception:
        st = []
    nm = {s["id"]: s["name"] for s in st}
    nm.update(PSEUDO)
    full = [s["id"] for s in st if s.get("kind") == "full"]
    return nm, full


def pct(a, b):
    return round(a * 100 / b) if b else 0


def build_report(row, prev, yday_row, nm, full):
    vis, pv = total(row)
    pvis = total(prev)[0] if prev else 0
    d30 = vis - pvis if prev else None
    shops = []
    for sid, s in row["shops"].items():
        before = prev["shops"].get(sid, {}).get("vis", 0) if prev else 0
        src = max((s.get("src") or {"direct": 0}).items(), key=lambda kv: kv[1])[0]
        foreign = sum(v for k, v in (s.get("cc") or {}).items() if k not in ("vn", "na"))
        shops.append({"id": sid, "name": nm.get(sid, sid), "vis": s["vis"], "pv": s["pv"], "d30": s["vis"] - before if prev else None,
                      "mainSrc": SRC.get(src, (src,))[0], "foreign": foreign, "mobile": int((s.get("dev") or {}).get("mobile", 0)),
                      "pseudo": sid in PSEUDO, "full": sid in full})
    shops.sort(key=lambda r: (-r["vis"], -r["pv"]))
    src = merge(row, "src")
    sources = [{"key": k, "label": SRC.get(k, (k, ""))[0], "help": SRC.get(k, ("", ""))[1], "vis": v, "pct": pct(v, vis)}
               for k, v in sorted(src.items(), key=lambda kv: -kv[1]) if v]
    cc = merge(row, "cc")
    countries = [{"key": k, "label": CC.get(k, k.upper()), "vis": v, "pct": pct(v, vis)} for k, v in sorted(cc.items(), key=lambda kv: -kv[1]) if v]
    lang = merge(row, "lang")
    langs = [{"key": k, "label": LANG.get(k, k), "vis": v, "pct": pct(v, vis)} for k, v in sorted(lang.items(), key=lambda kv: -kv[1]) if v]
    foreign = sum(v for k, v in cc.items() if k not in ("vn", "na"))
    mobile = merge(row, "dev").get("mobile", 0)
    new_today = [r["name"] for r in shops if prev and r["vis"] and not prev["shops"].get(r["id"], {}).get("vis")]
    spikes = [{"name": r["name"], "d30": r["d30"]} for r in shops if r["d30"] and r["d30"] >= 5]
    zero_full = [nm.get(sid, sid) for sid in full if not row["shops"].get(sid, {}).get("vis")]
    yv = total(yday_row)[0] if yday_row else None
    real = [r for r in shops if not r["pseudo"]]

    # ---- 쉬운 말 보고 (위에서부터 중요한 순서)
    lines = []
    head = f"오늘 {row['hm']}까지 방문자 {vis}명, 페이지를 연 횟수 {pv}번이에요."
    if d30 is not None:
        head += f" 지난 보고({prev['hm']}) 뒤로 {'새로 ' + str(d30) + '명 들어왔어요' if d30 > 0 else '새 방문자는 없어요'}."
    lines.append(head)
    if yv is not None:
        diff = vis - yv
        lines.append(f"어제 같은 시각({yday_row['hm']})엔 {yv}명이었어요 → 오늘이 " + (f"{diff}명 많아요 ▲" if diff > 0 else f"{-diff}명 적어요 ▼" if diff < 0 else "똑같아요") + ".")
    else:
        lines.append("어제 같은 시각 기록은 아직 없어요(기록은 오늘부터 쌓여요).")
    if real:
        top = ", ".join(f"{r['name']} {r['vis']}명" for r in real[:3])
        lines.append(f"손님이 가장 많이 본 메뉴판: {top}. 오늘 손님이 온 가게는 모두 {len(real)}곳이에요.")
    ps = [r for r in shops if r["pseudo"] and r["vis"]]
    if ps:
        lines.append("영업용 페이지: " + ", ".join(f"{r['name']} {r['vis']}명" for r in ps) + ".")
    if sources:
        lines.append("어떻게 들어왔나: " + ", ".join(f"{s['label']} {s['vis']}명({s['pct']}%)" for s in sources[:4]) + ".")
    if vis:
        far = ", ".join(f"{c['label']} {c['vis']}명" for c in countries if c["key"] not in ("vn", "na"))[:80]
        lines.append(f"외국에서 본 사람 {foreign}명({pct(foreign, vis)}%)" + (f" — {far}" if far else "") + f". 휴대폰으로 본 사람 {pct(mobile, vis)}%.")
    if spikes:
        lines.append("⚡ 갑자기 늘었어요(30분에 5명 이상): " + ", ".join(f"{s['name']} +{s['d30']}" for s in spikes) + ".")
    if new_today:
        lines.append("🆕 오늘 첫 손님이 생긴 가게: " + ", ".join(new_today[:6]) + ("…" if len(new_today) > 6 else "") + ".")
    if zero_full:
        lines.append(f"⚠ 정식 계약 가게인데 오늘 아직 0명: " + ", ".join(zero_full[:8]) + ("…" if len(zero_full) > 8 else "") + " (사장님 QR 위치 확인 필요할 수 있어요).")
    lead = (f" · 1위 {real[0]['name'][:14]} {real[0]['vis']}명" if real and (len(real) == 1 or real[0]["vis"] > real[1]["vis"])
            else f" · 손님 온 가게 {len(real)}곳" if real else "")
    speech = f"📊 {row['hm']} 방문 보고: 오늘 {vis}명" + (f" (30분 새 {d30}명)" if d30 else "") + lead
    return {"id": row["t"], "date": row["date"], "hm": row["hm"], "manual": row.get("manual", False), "vis": vis, "pv": pv,
            "d30": d30, "prevHm": prev["hm"] if prev else None, "ydayVis": yv, "ydayHm": yday_row["hm"] if yday_row else None,
            "shopCount": len(real), "shops": shops, "sources": sources, "countries": countries, "langs": langs,
            "foreign": foreign, "foreignPct": pct(foreign, vis), "mobilePct": pct(mobile, vis),
            "newShops": new_today, "spikes": spikes, "zeroFull": zero_full, "lines": lines, "speech": speech}


def at_or_before(rows, hm):
    best = None
    for r in rows:
        if r["hm"] <= hm:
            best = r
    return best


def today(date=None):
    """대시보드용: 그날 마지막 보고 + 30분 칸별 흐름 + 어제 흐름."""
    n = now_vn()
    date = date or n.strftime("%Y-%m-%d")
    rows = read_day(date)
    yday = (datetime.strptime(date, "%Y-%m-%d") - timedelta(days=1)).strftime("%Y-%m-%d")
    yrows = read_day(yday)
    key_ok = bool(M.user_env("QRMENU_ADMIN_KEY"))
    days = sorted(p.stem for p in (M.OUT / "visits").glob("*.jsonl"))[-14:]
    base = {"date": date, "days": days, "hours": f"{HOURS[0]:02d}:00~{HOURS[1]:02d}:00, 30분마다", "keyOk": key_ok,
            "error": STATE["error"], "errorAt": STATE["errorAt"]}
    if not rows:
        return {**base, "status": "empty" if key_ok else "연결 필요", "report": None, "series": [], "yseries": []}
    nm, full = names()
    last = rows[-1]
    prev = rows[-2] if len(rows) > 1 else None
    rep = build_report(last, prev, at_or_before(yrows, last["hm"]), nm, full)

    def series(rs):
        out, before = [], 0
        for r in rs:
            v, p = total(r)
            out.append({"hm": r["hm"], "vis": v, "pv": p, "add": v - before, "manual": r.get("manual", False)})
            before = v
        return out
    return {**base, "status": "ok", "report": rep, "series": series(rows), "yseries": series(yrows)}
