# -*- coding: utf-8 -*-
"""영업 탭 (2026-11-19) — server.py 가 불러 쓴다.

배포된 가게 사장님께 Zalo 영업 메시지를 반자동으로 보낼 수 있게 돕는다.
- 가게 정보: collect.mjs 를 건드리지 않고, 이 모듈이 restaurants/*/menu.js · sales/stores/data.js · docs/stores.md 를 직접 읽는다.
- 초안 만들기: 안티그래비티 CLI(agy --mode plan --model gemini-4-neon-medium)를 빈 폴더에서 실행한다(추가 비용 0원, Claude 한도 0).
  비밀값(SECRET_ENV)은 넘기지 않으며, 한 번에 한 가게만 실행한다.
- 기록 저장: dashboard/out/sales-log.json (git 제외), 항상 write_atomic() 으로 저장한다.
- 메시지를 자동으로 보내는 기능은 없다. 캡틴이 [복사] → [Zalo 열기] → 직접 전송 후 [보냄 표시]를 누른다.
"""

import json
import os
import re
import subprocess
import threading
import time
from datetime import datetime
from pathlib import Path

SV = None  # server 모듈 (init 에서 받음)
LOG_LOCK = threading.Lock()
DRAFT_LOCK = threading.Lock()
DRAFTING_ID = None

SITUATIONS = {
    "first": "첫 연락",
    "followup": "3일 뒤 답 없음(후속 연락)",
    "reply": "답장 응대",
    "price": "가격 문의 답장",
    "checkin": "안부·메뉴 수정 안내",
}
OWNER_LANGS = {
    "ko": "한국인",
    "vi": "베트남인",
}
OVERDUE_SEC = 3 * 86400  # 보낸 지 3일 넘음

# Node.js vm 으로 sales/stores/data.js 와 restaurants/*/menu.js 를 읽기만 하는 스크립트
_READ_JS = r"""
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
function run(file) {
  const win = {};
  const ctx = {
    window: win,
    document: { addEventListener() {}, querySelector() { return null; } },
    console: { log() {}, warn() {} },
  };
  ctx.self = win;
  try { vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx, { timeout: 2000 }); }
  catch (e) { return { error: e.message, win }; }
  return { win };
}

const data = run(path.join(ROOT, 'sales/stores/data.js'));
const REGIONS = data.win.REGIONS || {};
const CATS = data.win.CATS || {};
const listed = new Map();
for (const s of (data.win.STORES || [])) {
  const cats = Array.isArray(s.cats) ? s.cats.map(c => (CATS[c] && CATS[c].ko) || c) : [];
  const typeKo = (s.type && s.type.ko) || cats.join(' · ');
  const regionKo = (s.region && REGIONS[s.region] && REGIONS[s.region].ko) || '';
  listed.set(s.id, {
    name: s.name || '',
    sub: s.sub || '',
    listing: !!s.listing,
    typeKo,
    regionKo,
  });
}

const rows = [];
const restDir = path.join(ROOT, 'restaurants');
for (const d of fs.readdirSync(restDir).sort()) {
  if (d.startsWith('_')) continue;
  const idx = path.join(restDir, d, 'index.html');
  if (!fs.existsSync(idx)) continue;
  const mf = path.join(restDir, d, 'menu.js');
  let brandKo = '', brandEn = '', brandVi = '', phone = '', taglineKo = '';
  if (fs.existsSync(mf)) {
    const { win } = run(mf);
    const r = win.RESTAURANT || {};
    const b = r.brand || {};
    brandKo = String(b.ko || '').trim();
    brandEn = String(b.en || '').trim();
    brandVi = String(b.vi || '').trim();
    phone = String(r.phone || '').trim();
    taglineKo = String((r.tagline && r.tagline.ko) || '').trim();
  }
  const s = listed.get(d);
  rows.push({
    id: d,
    name: brandKo || (s && s.name) || d,
    nameEn: brandEn || brandVi || (s && s.sub) || '',
    sub: (s && s.sub) || '',
    category: (s && s.typeKo) || taglineKo || '',
    region: (s && s.regionKo) || '',
    inStores: !!s,
    dataListing: s ? s.listing : null,
    phone,
  });
}
process.stdout.write(JSON.stringify({ stores: rows, dataError: data.error || null }));
"""


def init(server):
    global SV
    SV = server


def log_path():
    custom = os.environ.get("DASH_SALES_LOG")
    return Path(custom) if custom else (SV.OUT / "sales-log.json")


def load_log():
    p = log_path()
    with LOG_LOCK:
        if not p.is_file():
            return {}
        try:
            d = json.loads(p.read_text(encoding="utf-8"))
            return d if isinstance(d, dict) else {}
        except Exception:
            return {}


def save_log(data):
    p = log_path()
    with LOG_LOCK:
        p.parent.mkdir(parents=True, exist_ok=True)
        SV.write_atomic(p, json.dumps(data, ensure_ascii=False, indent=2))


def update_entry(sid, fn):
    """한 가게의 기록을 안전하게 읽고 고쳐서 원자적으로 저장한다."""
    p = log_path()
    with LOG_LOCK:
        data = {}
        if p.is_file():
            try:
                loaded = json.loads(p.read_text(encoding="utf-8"))
                if isinstance(loaded, dict):
                    data = loaded
            except Exception:
                data = {}
        cur = dict(data.get(sid) or {})
        fn(cur)
        data[sid] = cur
        p.parent.mkdir(parents=True, exist_ok=True)
        SV.write_atomic(p, json.dumps(data, ensure_ascii=False, indent=2))
        return cur


def agy_exe():
    f = SV.which("agy")
    if f:
        return f
    f = Path(os.environ.get("LOCALAPPDATA", "")) / "agy" / "bin" / "agy.exe"
    return str(f) if f.is_file() else None


def ai_env():
    env = {
        k: v for k, v in os.environ.items()
        if k not in ("ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "CLAUDECODE", "CLAUDE_CODE_ENTRYPOINT", *SV.SECRET_ENV)
    }
    env.update(PYTHONUTF8="1", PYTHONIOENCODING="utf-8")
    return env


def read_stores_raw():
    """restaurants/*/menu.js · sales/stores/data.js · docs/stores.md 를 직접 읽어 가게 목록을 만든다."""
    try:
        p = subprocess.run(
            ["node", "--input-type=module"],
            cwd=str(SV.ROOT),
            input=_READ_JS.encode("utf-8"),
            capture_output=True,
            timeout=60,
            creationflags=SV.NO_WINDOW,
        )
        out = (p.stdout or b"").decode("utf-8", "replace")
        err = (p.stderr or b"").decode("utf-8", "replace")
        if p.returncode != 0:
            return {"error": "가게 정보를 읽지 못했어요: " + (err or out)[-300:], "stores": []}
        data = json.loads(out)
    except Exception as e:
        return {"error": "가게 정보를 읽지 못했어요: " + str(e)[:200], "stores": []}

    kinds = SV.stores_md_kinds()
    rows = []
    for r in data.get("stores", []):
        sid = r["id"]
        kind = kinds.get(sid) or ("listing" if r.get("dataListing") else ("full" if r.get("inStores") else None))
        digits = re.sub(r"\D", "", r.get("phone") or "")
        rows.append({
            "id": sid,
            "name": r["name"],
            "nameEn": r.get("nameEn") or "",
            "sub": r.get("sub") or "",
            "category": r.get("category") or "",
            "region": r.get("region") or "",
            "kind": kind,
            "inStores": bool(r.get("inStores")),
            "url": f"https://{sid}.qrmenuasia.com",
            "phone": r.get("phone") or "",
            "phoneDigits": digits,
            "landline": digits.startswith("02") if digits else False,
            "zaloUrl": f"https://zalo.me/{digits}" if digits else "",
        })
    return {"stores": rows, "dataError": data.get("dataError")}


def gem_rules():
    """docs/gem-sales.md 의 '--- 여기부터 ---' ~ '--- 여기까지 ---' 규칙을 읽는다."""
    text = SV.read("docs/gem-sales.md")
    m = re.search(r"^--- 여기부터 ---\r?\n(.*?)^--- 여기까지 ---", text, re.S | re.M)
    return m.group(1).strip() if m else ""


def build_sales():
    raw = SV.cached("sales-stores", 60, read_stores_raw)
    if raw.get("error"):
        return {"error": raw["error"], "stores": []}
    log = load_log()
    now = time.time()
    stores = []
    counts = {"overdue": 0, "unsent": 0, "sent": 0, "replied": 0, "listing": 0, "full": 0}

    for s in raw["stores"]:
        e = log.get(s["id"]) or {}
        sent_ts = e.get("sentTs")
        replied = bool(e.get("replied"))
        days_since = int((now - sent_ts) // 86400) if sent_ts else None
        overdue = bool(sent_ts and not replied and (now - sent_ts) >= OVERDUE_SEC)
        item = {
            **s,
            "sentAt": e.get("sentAt"),
            "sentTs": sent_ts,
            "replied": replied,
            "repliedAt": e.get("repliedAt"),
            "daysSince": days_since,
            "overdue": overdue,
            "draft": e.get("draft"),
        }
        stores.append(item)
        if s["kind"] == "listing":
            counts["listing"] += 1
        elif s["kind"] == "full":
            counts["full"] += 1
        if overdue:
            counts["overdue"] += 1
        elif replied:
            counts["replied"] += 1
        elif sent_ts:
            counts["sent"] += 1
        else:
            counts["unsent"] += 1

    # 정렬: ① 보낸 지 3일 넘고 답 없음(오래된 순) → ② 아직 안 보냄(이름순) → ③ 보냄 3일 이내(최근 순) → ④ 답장 받음(최근 순)
    def sort_key(x):
        if x["overdue"]:
            return (0, x["sentTs"] or 0, x["name"])
        if not x["sentTs"] and not x["replied"]:
            return (1, 0, x["name"])
        if not x["replied"]:
            return (2, -(x["sentTs"] or 0), x["name"])
        return (3, -(x["sentTs"] or 0), x["name"])

    stores.sort(key=sort_key)
    return {
        "stores": stores,
        "counts": counts,
        "drafting": DRAFTING_ID,
        "agyReady": agy_exe() is not None,
    }


def _parse_draft_json(text):
    a, b = text.find("{"), text.rfind("}")
    if a < 0 or b < a:
        raise ValueError("AI 응답에서 초안 형식(JSON)을 찾지 못했어요")
    d = json.loads(text[a:b + 1])
    if not isinstance(d, dict) or not (d.get("ko") or d.get("vi")):
        raise ValueError("초안 본문이 비어 있어요")
    return {
        "purpose": str(d.get("purpose") or "").strip(),
        "ko": str(d.get("ko") or "").strip(),
        "vi": str(d.get("vi") or "").strip(),
        "followup_ko": str(d.get("followup_ko") or "").strip(),
        "followup_vi": str(d.get("followup_vi") or "").strip(),
        "note": str(d.get("note") or "").strip(),
    }


def make_draft(sid, situation="first", owner_lang="ko", owner_msg=""):
    """안티그래비티 CLI(agy -p, 계획 모드, Gemini 4 Neon)로 영업 메시지 초안을 만든다."""
    global DRAFTING_ID
    sid = str(sid or "").strip()
    if not SV.SHOP_RE.match(sid):
        return None, "가게를 골라 주세요"
    raw = SV.cached("sales-stores", 60, read_stores_raw)
    store = next((s for s in raw.get("stores", []) if s["id"] == sid), None)
    if not store:
        return None, "가게 정보를 찾지 못했어요"

    situation = situation if situation in SITUATIONS else "first"
    owner_lang = owner_lang if owner_lang in OWNER_LANGS else "ko"
    owner_msg = str(owner_msg or "").strip()[:1000]

    # 정식 가게에는 '첫 연락' 금지(캡틴 지시)
    if store["kind"] == "full" and situation == "first":
        return None, "정식 가게에는 '첫 연락'을 고를 수 없어요. 다른 상황을 골라 주세요."

    rules = gem_rules()
    if not rules:
        return None, "docs/gem-sales.md 에서 영업 규칙을 읽지 못했어요"

    exe = agy_exe()
    if not exe:
        return None, "안티그래비티(agy)를 찾지 못했어요. PC에 설치되어 있는지 확인해 주세요."

    if not DRAFT_LOCK.acquire(blocking=False):
        return None, "다른 가게 초안을 만드는 중이에요. 끝난 뒤에 눌러 주세요."

    DRAFTING_ID = sid
    try:
        work = SV.OUT / "_sales_work"
        work.mkdir(parents=True, exist_ok=True)
        name_part = f"{store['name']} ({store['nameEn']})" if store["nameEn"] else store["name"]
        info_line = (
            f"가게: {name_part} / 주소: {store['url']} / "
            f"업종: {store['category'] or '음식점'} / "
            f"사장님: {OWNER_LANGS[owner_lang]} / 상황: {SITUATIONS[situation]}"
        )
        if store["kind"] == "full":
            info_line += " (이미 정식 계약한 가게)"
        if owner_msg:
            info_line += f"\n사장님이 보낸 글: {owner_msg}"

        prompt = (
            "도구(명령·파일)는 절대 쓰지 말고 바로 답해.\n"
            + rules
            + "\n\n아래 가게 정보로 위 규칙대로 초안을 써줘.\n"
            + "답은 반드시 JSON 한 개만(설명·코드블록 없이): "
            + '{"purpose":"한 줄 목적","ko":"한국어 초안","vi":"베트남어 초안",'
            + '"followup_ko":"3~4일 뒤 한국어 한 줄","followup_vi":"3~4일 뒤 베트남어 한 줄",'
            + '"note":"캡틴 확인 필요 사항(없으면 빈 문자열)"}\n'
            + info_line
        )
        try:
            p = subprocess.run(
                [exe, "--mode", "plan", "--model", "gemini-4-neon-medium", "-p", prompt],
                cwd=str(work),
                capture_output=True,
                timeout=180,
                env=ai_env(),
                creationflags=SV.NO_WINDOW,
            )
        except subprocess.TimeoutExpired:
            return None, "초안 만들기 시간이 3분을 넘겨 멈췄어요. 잠시 뒤 다시 시도해 주세요."
        except Exception as e:
            return None, f"안티그래비티 실행 실패: {str(e)[:200]}"

        out = (p.stdout or b"").decode("utf-8", "replace")
        err = (p.stderr or b"").decode("utf-8", "replace")
        if p.returncode != 0 and "{" not in out:
            reason = (err or out).strip()[-300:] or f"종료 코드 {p.returncode}"
            return None, f"초안 만들기 실패: {reason}"

        try:
            parsed = _parse_draft_json(out)
        except Exception as e:
            return None, f"초안 읽기 실패: {str(e)[:200]}"

        draft = {
            **parsed,
            "situation": situation,
            "situationLabel": SITUATIONS[situation],
            "ownerLang": owner_lang,
            "ownerMsg": owner_msg,
            "createdAt": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "createdTs": time.time(),
        }
        update_entry(sid, lambda cur: cur.__setitem__("draft", draft))
        return {"ok": True, "id": sid, "draft": draft}, None
    finally:
        DRAFTING_ID = None
        DRAFT_LOCK.release()


def mark_sent(sid, action="sent"):
    """보냄 표시 / 답장 받음 / 답 없음 / 보냄 취소 상태를 sales-log.json 에 기록한다."""
    sid = str(sid or "").strip()
    if not SV.SHOP_RE.match(sid):
        return None, "가게를 골라 주세요"
    raw = SV.cached("sales-stores", 60, read_stores_raw)
    if not any(s["id"] == sid for s in raw.get("stores", [])):
        return None, "가게 정보를 찾지 못했어요"

    today = datetime.now().strftime("%Y-%m-%d")
    now = time.time()

    def apply(cur):
        if action == "sent":
            cur["sentAt"] = today
            cur["sentTs"] = now
            cur["replied"] = False
            cur["repliedAt"] = None
        elif action == "replied":
            if not cur.get("sentTs"):
                cur["sentAt"] = today
                cur["sentTs"] = now
            cur["replied"] = True
            cur["repliedAt"] = today
        elif action == "unreplied":
            cur["replied"] = False
            cur["repliedAt"] = None
        elif action == "clear":
            cur.pop("sentAt", None)
            cur.pop("sentTs", None)
            cur.pop("replied", None)
            cur.pop("repliedAt", None)
        else:
            raise ValueError("알 수 없는 상태 변경이에요")

    try:
        saved = update_entry(sid, apply)
    except ValueError as e:
        return None, str(e)
    return {"ok": True, "id": sid, "record": saved}, None
