#!/usr/bin/env python3
"""QR메뉴 사진 수집기 (대시보드형) — 사장님 PC에서 실행.

구글 지도에서 가게 정보와 사진(전체·최신·메뉴·음식·가게 제공 탭)을 모아
브라우저 대시보드에서 메뉴판/음식/매장/기타/제외로 고른 뒤,
구글 드라이브 폴더(QR메뉴판/<가게>)에 저장한다.
클라우드 세션의 Claude는 그 폴더의 claude_bundle_*.zip(사진 + store_info.json)을
드라이브 연결 도구로 받아 메뉴판을 만든다. (저장소 CLAUDE.md "구글 지도 사진 수집기" 참고)

실행: python qrmenu_photos.py  (또는 run_dashboard.bat 더블클릭)
필요: pip install playwright pillow  (크롬이 깔려 있으면 브라우저 추가 설치 불필요)
"""

import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import threading
import time
import traceback
import uuid
import webbrowser
import zipfile
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, quote, urlparse
from urllib.request import Request, urlopen

try:
  from PIL import Image
except ImportError:  # 없어도 동작한다(크기 표시·webp 변환만 빠짐)
  Image = None

VERSION = "1.0"
PORT = int(os.environ.get("QRMENU_PORT", "8765"))
HOME = Path.home() / ".qrmenu_photos"
JOBS = HOME / "jobs"
BUNDLE_LIMIT = 8 * 1024 * 1024  # 드라이브 연결 도구가 10MB 넘는 파일을 못 받음
PHOTO_SIZE = 1600
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36")

# 분류: 키, 화면 이름, 저장 파일 앞글자
CLASSES = [("menu", "메뉴판", "menu"), ("food", "음식", "food"),
           ("store", "매장", "store"), ("other", "기타", "etc"),
           ("skip", "제외", None)]
CLASS_KO = {k: ko for k, ko, _ in CLASSES}
CLASS_PREFIX = {k: p for k, _, p in CLASSES}

# 구글 지도 사진 갤러리 탭 (한·영·베 화면 이름)
TABS = [
    ("all", "전체", ["전체", "all", "tất cả"]),
    ("latest", "최신", ["최신", "latest", "mới nhất", "gần đây"]),
    ("menu", "메뉴", ["메뉴", "menu", "thực đơn"]),
    ("food", "음식·음료", ["음식", "food", "đồ ăn", "món ăn", "thức ăn"]),
    ("owner", "가게 제공", ["소유자", "업체", "by owner", "owner", "chủ sở hữu"]),
    ("vibe", "분위기", ["분위기", "vibe", "không khí"]),
]
TAB_KO = {k: ko for k, ko, _ in TABS}
TAB_SKIP = ["동영상", "video", "360", "스트리트", "street", "셀카", "selfie"]


class StopJob(Exception):
  pass


# ---------------------------------------------------------------------------
# 작업 상태
# ---------------------------------------------------------------------------
class Job:

  def __init__(self, params, job_id=None):
    self.id = job_id or datetime.now().strftime("%m%d-%H%M%S-") + uuid.uuid4().hex[:4]
    self.params = params
    self.status = "running"  # running / done / error / stopped
    self.step = ""
    self.notice = ""  # 사용자가 브라우저에서 해야 할 일
    self.logs = []
    self.info = {}
    self.candidates = []
    self.tabs_found = []
    self.photos = []  # dict(id, file, tabs, latest_rank, url, bytes, w, h, cls)
    self.saved = None
    self.stop = False
    self.dir = JOBS / self.id
    self.lock = threading.Lock()

  def log(self, msg):
    line = f"{datetime.now():%H:%M:%S} {msg}"
    with self.lock:
      self.logs.append(line)
      del self.logs[:-300]
    try:
      print(line, flush=True)
    except Exception:
      pass

  def check(self):
    if self.stop:
      raise StopJob()

  def public(self):
    with self.lock:
      return {
          "id": self.id, "status": self.status, "step": self.step,
          "notice": self.notice, "logs": list(self.logs), "info": self.info,
          "candidates": self.candidates, "tabs_found": self.tabs_found,
          "photos": self.photos, "params": self.params, "saved": self.saved,
      }

  def persist(self):
    data = self.public()
    data["logs"] = data["logs"][-60:]
    (self.dir / "job.json").write_text(json.dumps(data, ensure_ascii=False), "utf-8")

  @classmethod
  def load(cls, path):
    d = json.loads(path.read_text("utf-8"))
    job = cls(d["params"], d["id"])
    for k in ("status", "info", "candidates", "tabs_found", "photos", "saved", "logs"):
      setattr(job, k, d.get(k) or getattr(job, k))
    if job.status == "running":
      job.status = "stopped"
    return job


STATE = {"job": None}


# ---------------------------------------------------------------------------
# 구글 지도 수집 (Playwright, 작업 스레드 하나에서만 실행)
# ---------------------------------------------------------------------------
JS_TABS = """() => [...document.querySelectorAll('[role=tab]')].map((el, i) => {
  const r = el.getBoundingClientRect();
  return {i, label: (el.getAttribute('aria-label') || el.innerText || '').trim(),
          visible: r.width > 0 && r.height > 0};
})"""

# 갤러리 썸네일(a[data-photo-index])을 읽고 한 화면씩 아래로 내린다.
JS_GRAB = """() => {
  const vis = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const anchors = [...document.querySelectorAll('a[data-photo-index]')].filter(vis);
  const items = [];
  for (const a of anchors) {
    let u = '';
    for (const el of [a, ...a.querySelectorAll('*')]) {
      const bg = el.style && el.style.backgroundImage;
      const m = bg && bg.match(/url\\(["']?(.*?)["']?\\)/);
      if (m) { u = m[1]; break; }
    }
    if (!u) { const img = a.querySelector('img'); if (img) u = img.currentSrc || img.src || ''; }
    if (u && !u.startsWith('data:')) items.push({u, i: +a.dataset.photoIndex});
  }
  let sc = anchors[0] && anchors[0].parentElement;
  while (sc && !(sc.scrollHeight > sc.clientHeight + 10 &&
                 /(auto|scroll)/.test(getComputedStyle(sc).overflowY))) sc = sc.parentElement;
  let atEnd = true;
  if (sc) {
    sc.scrollBy(0, Math.max(300, sc.clientHeight * 0.8));
    atEnd = sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 5;
  }
  return {items, count: anchors.length, atEnd};
}"""

# 갤러리를 못 열었을 때: 가게 화면에 보이는 사진이라도 모은다.
JS_GRAB_LOOSE = """() => {
  const root = document.querySelector('[role=main]') || document.body;
  const out = [];
  root.querySelectorAll('img').forEach(img => {
    const s = img.currentSrc || img.src || '';
    if (/googleusercontent|ggpht/.test(s) && (img.naturalWidth >= 80 || img.width >= 80)) out.push(s);
  });
  root.querySelectorAll('[style*="background-image"]').forEach(el => {
    const m = (el.getAttribute('style') || '').match(/url\\(["']?(https:[^"')]+)["']?\\)/);
    if (m && /googleusercontent|ggpht/.test(m[1])) out.push(m[1]);
  });
  return out;
}"""

# 영업시간: aria-label에 요일이 여러 번 나오는 가장 긴 글
JS_HOURS = """() => {
  let best = '';
  document.querySelectorAll('[aria-label]').forEach(el => {
    const t = el.getAttribute('aria-label');
    const n = (t.match(/요일|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Thứ|Chủ nhật/g) || []).length;
    if (n >= 3 && t.length > best.length && t.length < 800) best = t;
  });
  return best;
}"""


def maps_search_url(q):
  return f"https://www.google.com/maps/search/{quote(q)}?hl=ko"


def photo_key(url):
  """썸네일 주소 → 크기 꼬리(=w203-h152…)를 뗀 원본 주소. 사진이 아니면 None."""
  if url.startswith("//"):
    url = "https:" + url
  u = urlparse(url)
  if not ("googleusercontent.com" in u.netloc or "ggpht.com" in u.netloc):
    return None
  if u.path.startswith(("/a/", "/a-/")) or "streetview" in url or "/cbk" in u.path:
    return None  # 프로필 사진·스트리트뷰
  i = url.rfind("=")
  return url[:i] if i > url.rfind("/") else url


def _text(page, sel):
  try:
    loc = page.locator(sel).first
    if loc.count():
      return loc.inner_text(timeout=2000).strip()
  except Exception:
    pass
  return ""


def _attr(page, sel, name):
  try:
    loc = page.locator(sel).first
    if loc.count():
      return (loc.get_attribute(name, timeout=2000) or "").strip()
  except Exception:
    pass
  return ""


def _strip_label(s):
  """'주소: 123 …' → '123 …'"""
  head, sep, rest = s.partition(": ")
  return rest.strip() if sep and len(head) < 15 else s.strip()


def launch(p, job):
  profile = HOME / "chrome-profile"  # 로봇 확인·동의를 한 번 하면 기억된다
  profile.mkdir(parents=True, exist_ok=True)
  opts = dict(headless=not job.params.get("show_browser", True), locale="ko-KR",
              viewport={"width": 1400, "height": 900},
              args=["--disable-blink-features=AutomationControlled"])
  errors = []
  for channel in ("chrome", "msedge", None):
    try:
      kw = dict(opts, channel=channel) if channel else opts
      ctx = p.chromium.launch_persistent_context(str(profile), **kw)
      job.log(f"브라우저 시작: {channel or '내장 Chromium'}")
      return ctx
    except Exception as exc:
      errors.append(f"{channel or 'chromium'}: {str(exc).splitlines()[0][:120]}")
  job.log("크롬·엣지를 못 열어 내장 Chromium을 설치합니다(처음 한 번, 몇 분).")
  for e in errors:
    job.log("  " + e)
  subprocess.run([sys.executable, "-m", "playwright", "install", "chromium"], check=False)
  return p.chromium.launch_persistent_context(str(profile), **opts)


def wait_for_human(page, job):
  """로봇 확인(/sorry/)·쿠키 동의 화면이면 사용자가 처리할 때까지 기다린다."""
  for label in ("모두 수락", "Accept all", "Chấp nhận tất cả"):
    try:
      btn = page.get_by_role("button", name=label)
      if btn.count():
        btn.first.click(timeout=3000)
        page.wait_for_timeout(2000)
    except Exception:
      pass
  if "/sorry/" not in page.url:
    return
  job.notice = "구글 로봇 확인 화면이 떴어요. 열린 크롬 창에서 '로봇이 아닙니다'를 체크해 주세요 (5분까지 기다림)."
  job.log("로봇 확인 대기 중…")
  for _ in range(150):
    job.check()
    page.wait_for_timeout(2000)
    if "/sorry/" not in page.url:
      break
  job.notice = ""
  if "/sorry/" in page.url:
    raise RuntimeError("로봇 확인이 끝나지 않았어요. 조금 뒤 다시 시도해 주세요.")
  page.wait_for_timeout(3000)


def open_place(page, job):
  q = job.params["query"].strip()
  url = q if re.match(r"https?://", q) else maps_search_url(q)
  job.step = "구글 지도 여는 중"
  job.log(f"여는 주소: {url}")
  page.goto(url, wait_until="domcontentloaded", timeout=60000)
  page.wait_for_timeout(3000)
  for _ in range(3):
    job.check()
    wait_for_human(page, job)
    u = urlparse(page.url)
    if "/maps" in u.path:
      break
    # share.google 등 → 일반 구글 검색 화면: 검색어를 뽑아 지도로 간다
    query = parse_qs(u.query).get("q", [""])[0] or q
    job.log(f"구글 검색 화면 → 지도에서 '{query}' 검색")
    page.goto(maps_search_url(query), wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(3000)

  try:
    page.wait_for_selector("h1.DUwDvf, a.hfpxzc, button[data-item-id='address']", timeout=20000)
  except Exception:
    pass
  results = page.locator("a.hfpxzc")
  if not page.locator("h1.DUwDvf").count() and results.count():
    names = [results.nth(i).get_attribute("aria-label") or "" for i in range(min(results.count(), 8))]
    job.candidates = [n for n in names if n]
    job.log(f"검색 결과 {results.count()}곳 → 첫 번째 '{names[0]}' 선택. 다른 가게면 그 가게의 구글 지도 링크로 다시 하세요.")
    results.first.click(timeout=8000)
  try:
    page.wait_for_selector("h1.DUwDvf, button[data-item-id='address']", timeout=20000)
  except Exception:
    raise RuntimeError("가게 화면을 찾지 못했어요. 구글 지도에서 가게를 연 뒤 주소창 링크를 넣어 주세요.")
  page.wait_for_timeout(2000)


def read_info(page, job):
  job.step = "가게 정보 읽는 중"
  phone_id = _attr(page, "button[data-item-id^='phone:tel:']", "data-item-id")
  info = {
      "name": _text(page, "h1.DUwDvf") or _attr(page, "div[role='main'][aria-label]", "aria-label"),
      "category": _text(page, "button.DkEaL"),
      "rating": _text(page, "div.F7nice span[aria-hidden='true']"),
      "address": _strip_label(_attr(page, "button[data-item-id='address']", "aria-label")
                              or _text(page, "button[data-item-id='address']")),
      "phone": phone_id.replace("phone:tel:", "") if phone_id else "",
      "website": _attr(page, "a[data-item-id='authority']", "href"),
      "plus_code": _strip_label(_attr(page, "button[data-item-id='oloc']", "aria-label")),
      "hours": "",
      "maps_url": page.url,
      "lat": None, "lng": None,
  }
  try:
    info["hours"] = page.evaluate(JS_HOURS)
  except Exception:
    pass
  m = re.search(r"!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)", page.url) or re.search(r"@(-?\d+\.\d+),(-?\d+\.\d+)", page.url)
  if m:
    info["lat"], info["lng"] = float(m.group(1)), float(m.group(2))
  job.info = info
  job.log(f"가게: {info['name']} | {info['category']} | {info['address']} | {info['phone'] or '전화 없음'}")


def open_gallery(page, job):
  job.step = "사진 갤러리 여는 중"
  sels = ["button.aoRNLd",  # 가게 맨 위 큰 사진
          "button[aria-label$='의 사진']", "button[aria-label^='Photo of']",
          "button[aria-label^='Ảnh']", "button[aria-label*='사진 및 동영상']",
          "button[aria-label*='Photos']"]
  for sel in sels:
    loc = page.locator(sel).first
    try:
      if not loc.count():
        continue
      label = loc.get_attribute("aria-label") or ""
      if re.search(r"추가|올리기|Add|Thêm", label):
        continue
      loc.click(timeout=5000)
      page.wait_for_selector("a[data-photo-index]", timeout=8000)
      job.log("사진 갤러리 열림")
      return True
    except Exception:
      continue
  job.log("사진 갤러리를 못 열었어요 → 가게 화면에 보이는 사진만 모읍니다.")
  return False


def grab_tab(page, job, key, limit):
  """지금 열린 탭의 사진 주소를 순서대로 (최대 limit장)."""
  by_index, quiet, rounds = {}, 0, 0
  while rounds < 80 and len(by_index) < limit:
    job.check()
    rounds += 1
    res = page.evaluate(JS_GRAB)
    before = len(by_index)
    for it in res["items"]:
      by_index.setdefault(it["i"], it["u"])
    quiet = quiet + 1 if len(by_index) == before else 0
    if res["atEnd"] and quiet >= 2:
      break
    if quiet >= 5:
      break
    page.wait_for_timeout(900)
  urls = [by_index[i] for i in sorted(by_index)][:limit]
  job.log(f"  {TAB_KO.get(key, key)} 탭: {len(urls)}장")
  return urls


def collect(page, job):
  limit = int(job.params.get("max_per_tab") or 80)
  found = {}  # key(원본 주소) → {"url", "tabs": [], "latest_rank", "order"}

  def add(urls, tab):
    for n, raw in enumerate(urls, 1):
      key = photo_key(raw)
      if not key:
        continue
      rec = found.setdefault(key, {"url": key, "tabs": [], "latest_rank": None, "order": len(found)})
      if tab not in rec["tabs"]:
        rec["tabs"].append(tab)
      if tab == "latest" and rec["latest_rank"] is None:
        rec["latest_rank"] = n

  if open_gallery(page, job):
    page.wait_for_timeout(2000)
    tabs = page.evaluate(JS_TABS)
    plan = []
    for t in tabs:
      label = t["label"].lower()
      if not t["visible"] or not label or any(s in label for s in TAB_SKIP):
        continue
      for key, _, words in TABS:
        if any(w in label for w in words) and key not in [k for k, _ in plan]:
          plan.append((key, t["i"]))
          break
    job.tabs_found = [TAB_KO[k] for k, _ in plan]
    job.log("갤러리 탭: " + (", ".join(job.tabs_found) or "없음(한 화면)"))
    if not plan:
      job.step = "사진 모으는 중"
      add(grab_tab(page, job, "all", limit), "all")
    for key, idx in plan:
      job.check()
      job.step = f"사진 모으는 중: {TAB_KO[key]} 탭"
      try:
        page.locator("[role=tab]").nth(idx).click(timeout=5000)
        page.wait_for_timeout(2500)
        add(grab_tab(page, job, key, limit), key)
      except StopJob:
        raise
      except Exception as exc:
        job.log(f"  {TAB_KO[key]} 탭 실패: {str(exc).splitlines()[0][:100]}")
  else:
    for _ in range(4):
      page.mouse.wheel(0, 1500)
      page.wait_for_timeout(1000)
    add(page.evaluate(JS_GRAB_LOOSE), "all")
  job.log(f"모은 사진 주소(중복 뺌): {len(found)}개")
  return list(found.values())


def scrape(job):
  try:
    from playwright.sync_api import sync_playwright
  except ImportError:
    raise RuntimeError("Playwright가 없어요. 명령창에서: python -m pip install playwright pillow")
  with sync_playwright() as p:
    ctx = launch(p, job)
    try:
      page = ctx.pages[0] if ctx.pages else ctx.new_page()
      open_place(page, job)
      read_info(page, job)
      return collect(page, job)
    finally:
      try:
        ctx.close()
      except Exception:
        pass


# ---------------------------------------------------------------------------
# 사진 받기
# ---------------------------------------------------------------------------
def fetch(url):
  req = Request(url, headers={"User-Agent": UA, "Referer": "https://www.google.com/maps/"})
  with urlopen(req, timeout=30) as r:
    return r.read(), r.headers.get("Content-Type", "")


def download_one(job, rec, n):
  raw_dir = job.dir / "raw"
  for suffix in (f"=s{PHOTO_SIZE}", f"=w{PHOTO_SIZE}", ""):
    try:
      data, ctype = fetch(rec["url"] + suffix)
    except Exception:
      continue
    if "image" not in ctype or len(data) < 2048:
      continue
    w = h = None
    path = raw_dir / f"{n:03d}.jpg"
    if Image is not None:
      try:
        from io import BytesIO
        img = Image.open(BytesIO(data))
        w, h = img.size
        if img.format != "JPEG":  # webp·png → jpg (메뉴판 작업은 jpg 기준)
          buf = BytesIO()
          img.convert("RGB").save(buf, "JPEG", quality=92)
          data = buf.getvalue()
      except Exception:
        pass
    elif "jpeg" not in ctype and "jpg" not in ctype:
      path = path.with_suffix("." + ctype.split("/")[-1].split(";")[0])
    path.write_bytes(data)
    return {"file": path.name, "bytes": len(data), "w": w, "h": h,
            "sha": hashlib.sha1(data).hexdigest()}
  return None


def default_class(tabs):
  if "menu" in tabs:
    return "menu"
  if "food" in tabs:
    return "food"
  if "vibe" in tabs:
    return "store"
  return "other"


def download_all(job, recs):
  job.step = "사진 받는 중"
  (job.dir / "raw").mkdir(parents=True, exist_ok=True)
  done = [0]

  def work(args):
    n, rec = args
    if job.stop:
      return n, rec, None
    res = download_one(job, rec, n)
    done[0] += 1
    job.step = f"사진 받는 중 {done[0]}/{len(recs)}"
    return n, rec, res

  photos, seen, fails, tiny = [], set(), 0, 0
  with ThreadPoolExecutor(6) as ex:
    for n, rec, res in ex.map(work, list(enumerate(recs, 1))):
      if res is None:
        fails += 1
        continue
      if res["sha"] in seen:
        (job.dir / "raw" / res["file"]).unlink(missing_ok=True)
        continue
      if res["w"] and max(res["w"], res["h"]) < 250:  # 아이콘·지도 조각
        tiny += 1
        (job.dir / "raw" / res["file"]).unlink(missing_ok=True)
        continue
      seen.add(res["sha"])
      photos.append({"id": n, "file": res["file"], "tabs": rec["tabs"],
                     "latest_rank": rec["latest_rank"], "order": rec["order"],
                     "url": rec["url"], "bytes": res["bytes"], "w": res["w"], "h": res["h"],
                     "cls": default_class(rec["tabs"])})
  job.check()
  order = {k: i for i, (k, _, _) in enumerate(CLASSES)}
  photos.sort(key=lambda p: (order[p["cls"]], p["latest_rank"] or 9999, p["order"]))
  job.photos = photos
  job.log(f"받은 사진 {len(photos)}장 (실패 {fails}, 너무 작아 뺌 {tiny})")


def run_job(job):
  try:
    job.dir.mkdir(parents=True, exist_ok=True)
    recs = scrape(job)
    job.check()
    if not recs:
      raise RuntimeError("사진을 하나도 못 찾았어요. 구글 지도 링크로 다시 해 보거나, 화면 캡처로 올려 주세요.")
    download_all(job, recs)
    job.status, job.step = "done", "완료 — 사진을 고른 뒤 '드라이브에 저장'을 누르세요"
  except StopJob:
    job.status, job.step = "stopped", "멈춤"
    job.log("사용자가 멈춤")
  except Exception as exc:
    job.status, job.step = "error", f"오류: {exc}"
    job.log(f"오류: {exc}")
    job.log(traceback.format_exc().strip().splitlines()[-1])
  finally:
    job.notice = ""
    try:
      job.persist()
    except Exception:
      pass


# ---------------------------------------------------------------------------
# 드라이브 폴더로 저장
# ---------------------------------------------------------------------------
def detect_drive_dir():
  roots = [Path(f"{d}:/") for d in "GHIJKLMNOPQRSTUVWXYZDEF"] + [Path.home() / "Google Drive", Path.home()]
  for root in roots:
    for mine in ("내 드라이브", "My Drive"):
      p = root / mine
      try:
        if p.is_dir():
          return p / "QR메뉴판"
      except OSError:
        continue
  return HOME / "output"


def safe_name(s):
  s = re.sub(r'[\\/*?:"<>|]', "_", (s or "").strip())
  return re.sub(r"\s+", " ", s).strip(" .")[:80]


def drive_relative(path):
  parts = path.parts
  for mine in ("내 드라이브", "My Drive"):
    if mine in parts:
      return "/".join(parts[parts.index(mine) + 1:])
  return str(path)


def save_job(job, body):
  name = safe_name(body.get("name") or job.info.get("name") or "가게")
  if not name:
    raise ValueError("폴더 이름이 비었어요.")
  dest = Path(body.get("base") or detect_drive_dir()) / name
  dest.mkdir(parents=True, exist_ok=True)
  # 예전에 이 수집기로 저장한 파일만 지운다(사용자가 넣은 다른 파일은 둔다)
  for f in dest.iterdir():
    if re.fullmatch(r"(menu|food|store|etc)_\d+\.jpg|claude_bundle_\d+\.zip", f.name):
      f.unlink()

  info = dict(job.info)
  info.update({k: v for k, v in (body.get("info") or {}).items() if isinstance(v, str)})
  counters, items = {}, []
  order = {k: i for i, (k, _, _) in enumerate(CLASSES)}
  for p in sorted(job.photos, key=lambda p: order[p["cls"]]):
    if p["cls"] == "skip":
      continue
    pre = CLASS_PREFIX[p["cls"]]
    counters[pre] = counters.get(pre, 0) + 1
    fname = f"{pre}_{counters[pre]:02d}.jpg"
    shutil.copyfile(job.dir / "raw" / p["file"], dest / fname)
    items.append({"file": fname, "class": p["cls"], "class_ko": CLASS_KO[p["cls"]],
                  "tabs": [TAB_KO.get(t, t) for t in p["tabs"]],
                  "owner": "owner" in p["tabs"], "latest_rank": p["latest_rank"],
                  "width": p["w"], "height": p["h"], "bytes": p["bytes"], "source": p["url"]})
  if not items:
    raise ValueError("저장할 사진이 없어요(모두 '제외').")

  # 8MB 단위로 묶음 나누기 (드라이브 연결 도구 10MB 제한)
  parts, cur, size = [], [], 0
  for it in items:
    if cur and size + it["bytes"] > BUNDLE_LIMIT:
      parts.append(cur)
      cur, size = [], 0
    cur.append(it)
    size += it["bytes"]
  parts.append(cur)
  bundles = [f"claude_bundle_{i}.zip" for i in range(1, len(parts) + 1)]

  manifest = {
      "tool": "qrmenu_photos", "version": VERSION,
      "collected_at": datetime.now().isoformat(timespec="seconds"),
      "query": job.params.get("query"), "folder": name,
      "store": info, "gallery_tabs": job.tabs_found, "search_candidates": job.candidates,
      "memo": body.get("memo", ""), "bundles": bundles,
      "counts": {CLASS_KO[k]: sum(1 for i in items if i["class"] == k) for k, _, p in CLASSES if p},
      "photos": items,
      "notes": ("tabs=구글 지도 갤러리에서 그 사진이 보인 탭. owner=가게(소유자)가 올린 사진. "
                "latest_rank=최신 탭 순서(1이 가장 최근). 올린 날짜·올린 사람 이름은 수집하지 않음."),
  }
  mjson = json.dumps(manifest, ensure_ascii=False, indent=2)
  (dest / "store_info.json").write_text(mjson, "utf-8")
  guide = make_guide(manifest)
  (dest / "클로드_안내.md").write_text(guide, "utf-8")
  for bname, part in zip(bundles, parts):
    with zipfile.ZipFile(dest / bname, "w", zipfile.ZIP_STORED) as z:
      z.writestr("store_info.json", mjson)
      z.writestr("클로드_안내.md", guide)
      for it in part:
        z.write(dest / it["file"], it["file"])

  rel = drive_relative(dest)
  job.saved = {
      "path": str(dest), "rel": rel, "count": len(items), "bundles": bundles,
      "prompt": (f"드라이브 `{rel}` 폴더에 사진 수집기로 올렸어 "
                 f"(사진 {len(items)}장, {', '.join(bundles)}). "
                 f"{body.get('kind') or '가게 찾기용'}으로 만들어줘."),
  }
  job.log(f"저장 완료: {dest} (사진 {len(items)}장, 묶음 {len(bundles)}개)")
  job.persist()
  return job.saved


def make_guide(m):
  s = m["store"]
  c = ", ".join(f"{k} {v}장" for k, v in m["counts"].items())
  return "\n".join([
      f"# {s.get('name') or m['folder']} — 구글 지도 사진 수집 결과",
      "",
      f"- 수집: {m['collected_at']} (QR메뉴 사진 수집기 v{m['version']}), 검색: {m['query']}",
      f"- 주소: {s.get('address')}", f"- 전화: {s.get('phone') or '없음'}",
      f"- 업종: {s.get('category')} / 평점: {s.get('rating')}",
      f"- 영업시간: {s.get('hours') or '모름'}", f"- 웹사이트: {s.get('website') or '없음'}",
      f"- 지도: {s.get('maps_url')}",
      f"- 사진: {c} (파일 앞글자 menu_/food_/store_/etc_)",
      f"- 메모: {m.get('memo') or '-'}",
      "",
      "Claude: claude_bundle_*.zip을 받아 풀고 store_info.json의 photos를 본다.",
      "owner=true는 가게 계정이 올린 사진, latest_rank가 작을수록 최근 사진이다.",
      "올린 날짜는 없으니 메뉴판 가격이 오래됐을 수 있다는 점은 사용자에게 확인한다.",
      "",
  ])


def history(base):
  out = []
  try:
    for d in Path(base).iterdir():
      f = d / "store_info.json"
      if f.is_file():
        try:
          m = json.loads(f.read_text("utf-8"))
        except Exception:
          continue
        if m.get("tool") == "qrmenu_photos":
          out.append({"folder": d.name, "path": str(d), "at": m.get("collected_at", ""),
                      "count": len(m.get("photos", [])), "name": m.get("store", {}).get("name", "")})
  except OSError:
    pass
  return sorted(out, key=lambda x: x["at"], reverse=True)[:20]


def open_folder(path):
  p = Path(path)
  if not p.is_dir():
    raise ValueError("폴더가 없어요.")
  if sys.platform.startswith("win"):
    os.startfile(str(p))  # noqa
  elif sys.platform == "darwin":
    subprocess.Popen(["open", str(p)])
  else:
    subprocess.Popen(["xdg-open", str(p)])


# ---------------------------------------------------------------------------
# 대시보드 서버 (127.0.0.1 전용)
# ---------------------------------------------------------------------------
class Handler(BaseHTTPRequestHandler):

  def log_message(self, *a):
    pass

  def _send(self, code, body, ctype="application/json; charset=utf-8"):
    if isinstance(body, (dict, list)):
      body = json.dumps(body, ensure_ascii=False).encode("utf-8")
    elif isinstance(body, str):
      body = body.encode("utf-8")
    self.send_response(code)
    self.send_header("Content-Type", ctype)
    self.send_header("Content-Length", str(len(body)))
    self.send_header("Cache-Control", "no-store")
    self.end_headers()
    self.wfile.write(body)

  def do_GET(self):
    u = urlparse(self.path)
    job = STATE["job"]
    if u.path == "/":
      return self._send(200, PAGE, "text/html; charset=utf-8")
    if u.path == "/api/state":
      return self._send(200, {"job": job.public() if job else None, "version": VERSION,
                              "default_base": str(detect_drive_dir()),
                              "classes": [[k, ko] for k, ko, _ in CLASSES], "tab_ko": TAB_KO})
    if u.path == "/api/history":
      base = parse_qs(u.query).get("base", [str(detect_drive_dir())])[0]
      return self._send(200, history(base))
    m = re.fullmatch(r"/photo/([\w-]+)/(\d{3}\.\w+)", u.path)
    if m and job and m.group(1) == job.id:
      f = job.dir / "raw" / m.group(2)
      if f.is_file():
        ctype = "image/jpeg" if f.suffix == ".jpg" else "image/" + f.suffix[1:]
        return self._send(200, f.read_bytes(), ctype)
    self._send(404, {"error": "없음"})

  def do_POST(self):
    # 다른 웹사이트가 이 서버로 요청을 보내지 못하게 (사용자 정의 머리글은 교차 출처에서 막힌다)
    if self.headers.get("X-QR") != "1":
      return self._send(403, {"error": "forbidden"})
    try:
      body = json.loads(self.rfile.read(int(self.headers.get("Content-Length") or 0)) or b"{}")
    except Exception:
      return self._send(400, {"error": "잘못된 요청"})
    job = STATE["job"]
    try:
      if self.path == "/api/start":
        if job and job.status == "running":
          return self._send(409, {"error": "이미 수집 중이에요."})
        if not (body.get("query") or "").strip():
          return self._send(400, {"error": "가게 이름이나 구글 지도 링크를 넣어 주세요."})
        job = Job({"query": body["query"].strip(), "name": body.get("name", ""),
                   "base": body.get("base", ""), "max_per_tab": body.get("max_per_tab") or 80,
                   "show_browser": bool(body.get("show_browser", True))})
        STATE["job"] = job
        threading.Thread(target=run_job, args=(job,), daemon=True).start()
        return self._send(200, {"ok": True, "id": job.id})
      if not job:
        return self._send(400, {"error": "작업이 없어요."})
      if self.path == "/api/stop":
        job.stop = True
        return self._send(200, {"ok": True})
      if self.path == "/api/cls":
        ids = set(body.get("ids") or [])
        if body.get("cls") not in CLASS_KO:
          return self._send(400, {"error": "분류 없음"})
        for p in job.photos:
          if p["id"] in ids:
            p["cls"] = body["cls"]
        return self._send(200, {"ok": True})
      if self.path == "/api/save":
        if job.status == "running":
          return self._send(409, {"error": "수집이 끝난 뒤 저장해 주세요."})
        return self._send(200, save_job(job, body))
      if self.path == "/api/open":
        open_folder(body.get("path", ""))
        return self._send(200, {"ok": True})
    except (ValueError, OSError) as exc:
      return self._send(400, {"error": str(exc)})
    self._send(404, {"error": "없음"})


def restore_last_job():
  if not JOBS.is_dir():
    return
  cutoff = time.time() - 14 * 86400
  latest = None
  for d in sorted(JOBS.iterdir()):
    if d.stat().st_mtime < cutoff:
      shutil.rmtree(d, ignore_errors=True)  # 2주 지난 임시 사진은 지운다
      continue
    if (d / "job.json").is_file():
      latest = d
  if latest:
    try:
      STATE["job"] = Job.load(latest / "job.json")
    except Exception:
      pass


def main():
  JOBS.mkdir(parents=True, exist_ok=True)
  restore_last_job()
  try:
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
  except OSError:
    print(f"이미 실행 중이에요 → http://127.0.0.1:{PORT}")
    webbrowser.open(f"http://127.0.0.1:{PORT}")
    return
  url = f"http://127.0.0.1:{PORT}"
  print(f"QR메뉴 사진 수집기 v{VERSION} — {url}\n이 창을 닫으면 대시보드가 꺼집니다.")
  if "--no-browser" not in sys.argv:
    threading.Timer(0.8, lambda: webbrowser.open(url)).start()
  try:
    server.serve_forever()
  except KeyboardInterrupt:
    pass


PAGE = r"""<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>QR메뉴 사진 수집기</title>
<style>
:root{--bg:#f5f3ef;--card:#fff;--ink:#1d1b18;--muted:#6f6a62;--line:#e3ded5;--accent:#e8590c;--accent-ink:#fff;
--menu:#e8590c;--food:#2b8a3e;--store:#1971c2;--other:#7950f2;--skip:#868e96;--warn:#fff3bf;--warn-ink:#5c4400}
@media (prefers-color-scheme:dark){:root{--bg:#171614;--card:#22201d;--ink:#eee9e1;--muted:#a39d93;--line:#3a3631;--warn:#4a3d00;--warn-ink:#ffe8a3}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,-apple-system,"Segoe UI","Malgun Gothic",sans-serif}
header{padding:14px 20px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--line);background:var(--card)}
header b{font-size:17px}header .v{color:var(--muted);font-size:12px}
main{max-width:1280px;margin:0 auto;padding:16px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:14px}
.card h2{font-size:15px;margin:0 0 10px}
.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px}
label{display:block;font-size:12px;color:var(--muted);margin-bottom:3px}
input,textarea,select{width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink);font:inherit}
textarea{min-height:56px}
.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
button{font:inherit;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:8px;padding:7px 12px;cursor:pointer}
button.primary{background:var(--accent);border-color:var(--accent);color:var(--accent-ink);font-weight:600}
button:disabled{opacity:.5;cursor:default}
.check{display:flex;gap:6px;align-items:center;font-size:14px;color:var(--ink)}.check input{width:auto}
.notice{background:var(--warn);color:var(--warn-ink);border-radius:10px;padding:12px 14px;margin-bottom:14px;font-weight:600}
.step{font-weight:600}.muted{color:var(--muted);font-size:13px}
pre.log{max-height:180px;overflow:auto;background:var(--bg);border-radius:8px;padding:8px 10px;font-size:12px;margin:8px 0 0;white-space:pre-wrap}
.chips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.chip{border-radius:999px;padding:4px 11px;font-size:13px}.chip.on{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.photos{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px}
.ph{border:2px solid var(--line);border-radius:10px;overflow:hidden;background:var(--bg);position:relative}
.ph img{display:block;width:100%;aspect-ratio:1;object-fit:cover;cursor:zoom-in;background:#0001}
.ph.skip img{opacity:.3}
.ph .meta{padding:5px 7px;font-size:11px;color:var(--muted);display:flex;flex-wrap:wrap;gap:4px}
.tag{background:var(--card);border:1px solid var(--line);border-radius:5px;padding:0 5px}
.tag.owner{border-color:var(--accent);color:var(--accent)}
.ph .cls{display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid var(--line)}
.ph .cls button{border:0;border-radius:0;padding:5px 0;font-size:11px;background:transparent}
.ph .cls button.on{color:#fff;font-weight:700}
.c-menu{border-color:var(--menu)}.c-food{border-color:var(--food)}.c-store{border-color:var(--store)}.c-other{border-color:var(--other)}.c-skip{border-color:var(--skip)}
.cls .on[data-c=menu]{background:var(--menu)}.cls .on[data-c=food]{background:var(--food)}.cls .on[data-c=store]{background:var(--store)}.cls .on[data-c=other]{background:var(--other)}.cls .on[data-c=skip]{background:var(--skip)}
.savebar{position:sticky;bottom:0;background:var(--card);border-top:1px solid var(--line);padding:10px 16px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;z-index:5}
.ok{border-color:var(--food)}
.box{background:var(--bg);border-radius:8px;padding:10px;font-size:14px;user-select:all}
.lb{position:fixed;inset:0;background:#000d;display:none;align-items:center;justify-content:center;flex-direction:column;z-index:20}
.lb.open{display:flex}.lb img{max-width:94vw;max-height:80vh;object-fit:contain}
.lb .bar{color:#fff;margin-top:10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center}
.lb .bar button{background:#fff2;color:#fff;border-color:#fff4}.lb .bar button.on{background:#fff;color:#000}
table.hist{width:100%;border-collapse:collapse;font-size:13px}table.hist td{padding:5px 4px;border-top:1px solid var(--line)}
@media (max-width:600px){main{padding:10px}.photos{grid-template-columns:repeat(2,1fr)}}
</style></head><body>
<header><b>QR메뉴 사진 수집기</b><span class="v" id="ver"></span><span class="muted" style="margin-left:auto">구글 지도 → 고르기 → 드라이브 → Claude</span></header>
<main>
<div class="notice" id="notice" hidden></div>

<section class="card">
  <h2>1. 가게 찾기</h2>
  <div class="grid2">
    <div><label>가게 이름 또는 구글 지도 링크</label><input id="q" placeholder="예: 박닌 수원성  /  https://maps.app.goo.gl/…"></div>
    <div><label>드라이브 폴더 이름 (비우면 지도의 가게 이름)</label><input id="name" placeholder="예: 수원성"></div>
    <div><label>저장 위치</label><input id="base"></div>
    <div><label>탭마다 최대 사진 수</label><input id="max" type="number" min="10" max="300" value="80"></div>
  </div>
  <div class="row" style="margin-top:10px">
    <label class="check"><input type="checkbox" id="show" checked> 크롬 창 보이기 (로봇 확인이 뜨면 직접 체크)</label>
    <span style="flex:1"></span>
    <button id="stop" hidden>멈춤</button>
    <button class="primary" id="start">수집 시작</button>
  </div>
  <p class="muted" style="margin:8px 0 0">링크가 가장 정확해요. 이름으로 찾으면 검색 결과 첫 가게를 고릅니다.</p>
</section>

<section class="card" id="statusCard" hidden>
  <div class="row"><span class="step" id="step"></span><span style="flex:1"></span><button id="toggleLog">기록 보기</button></div>
  <div class="muted" id="cands"></div>
  <pre class="log" id="log" hidden></pre>
</section>

<section class="card" id="infoCard" hidden>
  <h2>2. 가게 정보 (고칠 수 있어요)</h2>
  <div class="grid2" id="info"></div>
  <div style="margin-top:10px"><label>Claude에게 남길 메모</label><textarea id="memo" placeholder="예: 가게 찾기용. 1번 메뉴판이 가장 최신."></textarea></div>
</section>

<section class="card" id="photoCard" hidden>
  <h2>3. 사진 고르기 <span class="muted">— 사진을 누르면 크게 보고 키보드 1~5로 분류, ←→ 이동</span></h2>
  <div class="chips" id="filters"></div>
  <div class="row" style="margin-bottom:10px"><span class="muted">보이는 사진 모두:</span><span id="bulk" class="row"></span></div>
  <div class="photos" id="photos"></div>
</section>

<section class="card" id="savedCard" hidden>
  <h2>4. 저장 완료 → Claude 세션에 아래 문장을 보내세요</h2>
  <div class="box" id="prompt"></div>
  <div class="row" style="margin-top:8px"><button id="copy">문장 복사</button><button id="openDir">폴더 열기</button><span class="muted" id="savedPath"></span></div>
</section>

<section class="card">
  <h2>최근 저장</h2><table class="hist" id="hist"></table>
</section>
</main>
<div class="savebar" id="savebar" hidden>
  <span id="counts" class="muted"></span><span style="flex:1"></span>
  <select id="kind" style="width:auto"><option>가게 찾기용</option><option>정식(사장님 동의·비용)</option></select>
  <button class="primary" id="save">드라이브에 저장</button>
</div>
<div class="lb" id="lb"><img id="lbImg" alt=""><div class="bar" id="lbBar"></div></div>

<script>
const $ = id => document.getElementById(id);
let S = null, CLASSES = [], TAB_KO = {}, filter = 'all', lbIndex = -1, timer = null, infoFilled = '';
const api = (path, body) => fetch(path, body === undefined ? {} : {method:'POST', headers:{'Content-Type':'application/json','X-QR':'1'}, body:JSON.stringify(body)})
  .then(async r => { const j = await r.json(); if (!r.ok) throw new Error(j.error || r.status); return j; });
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const INFO_FIELDS = [['name','가게 이름'],['category','업종'],['address','주소'],['phone','전화'],['hours','영업시간'],['website','웹사이트'],['rating','평점'],['maps_url','구글 지도 링크']];

async function load(first) {
  const st = await api('/api/state');
  CLASSES = st.classes; TAB_KO = st.tab_ko; $('ver').textContent = 'v' + st.version;
  if (first) { $('base').value = localStorage.getItem('qr_base') || st.default_base; loadHist(); }
  S = st.job; render();
  clearTimeout(timer);
  if (S && S.status === 'running') timer = setTimeout(() => load(false), 1000);
}

function render() {
  const running = S && S.status === 'running';
  $('start').disabled = running; $('stop').hidden = !running;
  $('notice').hidden = !(S && S.notice); if (S && S.notice) $('notice').textContent = S.notice;
  $('statusCard').hidden = !S;
  if (!S) return;
  first_fill();
  $('step').textContent = (running ? '⏳ ' : S.status === 'done' ? '✅ ' : S.status === 'error' ? '⚠️ ' : '') + (S.step || '');
  $('cands').textContent = S.candidates && S.candidates.length > 1 ? '검색 결과: ' + S.candidates.join(' · ') : '';
  const log = $('log'); const atBottom = log.scrollTop + log.clientHeight >= log.scrollHeight - 5;
  log.textContent = S.logs.join('\n'); if (atBottom) log.scrollTop = log.scrollHeight;
  if (S.status === 'error') log.hidden = false;
  $('infoCard').hidden = !S.info || !S.info.name;
  if (infoFilled !== S.id && S.info && S.info.name) {
    $('info').innerHTML = INFO_FIELDS.map(([k, l]) => `<div><label>${l}</label><input data-k="${k}" value="${esc(S.info[k])}"></div>`).join('');
    infoFilled = S.id;
  }
  const done = S.photos && S.photos.length && !running;
  $('photoCard').hidden = !done; $('savebar').hidden = !done;
  if (done) renderPhotos();
  $('savedCard').hidden = !S.saved;
  if (S.saved) { $('prompt').textContent = S.saved.prompt; $('savedPath').textContent = S.saved.path; }
}
function first_fill() {
  if (S && S.params && !$('q').value) { $('q').value = S.params.query || ''; $('name').value = S.params.name || ''; }
}

function visible() {
  return S.photos.filter(p => filter === 'all' ? true : filter === 'owner' ? p.tabs.includes('owner') : filter === 'latest' ? p.latest_rank : p.cls === filter);
}
function renderPhotos() {
  const n = c => S.photos.filter(p => p.cls === c).length;
  const f = [['all', '전체 ' + S.photos.length], ...CLASSES.map(([k, ko]) => [k, ko + ' ' + n(k)]),
    ['owner', '가게 제공 ' + S.photos.filter(p => p.tabs.includes('owner')).length], ['latest', '최신 탭']];
  $('filters').innerHTML = f.map(([k, l]) => `<button class="chip ${filter === k ? 'on' : ''}" data-f="${k}">${l}</button>`).join('');
  $('bulk').innerHTML = CLASSES.map(([k, ko]) => `<button data-bulk="${k}">${ko}</button>`).join('');
  let list = visible();
  if (filter === 'latest') list = list.slice().sort((a, b) => a.latest_rank - b.latest_rank);
  $('photos').innerHTML = list.map(p => card(p)).join('') || '<p class="muted">사진 없음</p>';
  const keep = S.photos.filter(p => p.cls !== 'skip').length;
  $('counts').textContent = `저장할 사진 ${keep}장 · ` + CLASSES.filter(c => c[0] !== 'skip').map(([k, ko]) => `${ko} ${n(k)}`).join(' · ');
}
function card(p) {
  const tags = p.tabs.filter(t => t !== 'all').map(t => `<span class="tag ${t === 'owner' ? 'owner' : ''}">${TAB_KO[t] || t}${t === 'latest' ? ' ' + p.latest_rank : ''}</span>`).join('');
  return `<div class="ph c-${p.cls} ${p.cls === 'skip' ? 'skip' : ''}" data-id="${p.id}">
    <img loading="lazy" src="/photo/${S.id}/${p.file}" data-zoom="${p.id}" alt="">
    <div class="meta">${tags}<span>${p.w ? p.w + '×' + p.h : ''} · ${Math.round(p.bytes / 1024)}KB</span></div>
    <div class="cls">${CLASSES.map(([k, ko]) => `<button data-c="${k}" data-set="${p.id}" class="${p.cls === k ? 'on' : ''}">${ko}</button>`).join('')}</div></div>`;
}
async function setCls(ids, cls) {
  S.photos.forEach(p => { if (ids.includes(p.id)) p.cls = cls; });
  renderPhotos(); if (lbIndex >= 0) showLb();
  try { await api('/api/cls', {ids, cls}); } catch (e) { alert(e.message); }
}

// 크게 보기
let lbList = [];
function openLb(id) { lbList = visible(); lbIndex = lbList.findIndex(p => p.id === id); showLb(); }
function showLb() {
  const p = lbList[lbIndex]; if (!p) return closeLb();
  $('lb').classList.add('open'); $('lbImg').src = `/photo/${S.id}/${p.file}`;
  $('lbBar').innerHTML = `<button data-lb="-1">←</button>` + CLASSES.map(([k, ko], i) => `<button data-lbc="${k}" class="${p.cls === k ? 'on' : ''}">${i + 1} ${ko}</button>`).join('') +
    `<button data-lb="1">→</button><span>${lbIndex + 1}/${lbList.length} ${p.tabs.includes('owner') ? '· 가게 제공' : ''} ${p.latest_rank ? '· 최신 ' + p.latest_rank : ''}</span><button data-lb="0">닫기 (Esc)</button>`;
}
function closeLb() { $('lb').classList.remove('open'); lbIndex = -1; }
document.addEventListener('keydown', e => {
  if (lbIndex < 0) return;
  if (e.key === 'Escape') closeLb();
  else if (e.key === 'ArrowRight') { lbIndex = Math.min(lbIndex + 1, lbList.length - 1); showLb(); }
  else if (e.key === 'ArrowLeft') { lbIndex = Math.max(lbIndex - 1, 0); showLb(); }
  else if (/^[1-5]$/.test(e.key)) { setCls([lbList[lbIndex].id], CLASSES[+e.key - 1][0]); if (lbIndex < lbList.length - 1) { lbIndex++; showLb(); } }
});
$('lb').addEventListener('click', e => {
  const t = e.target;
  if (t.dataset.lb !== undefined) { const d = +t.dataset.lb; if (!d) return closeLb(); lbIndex = Math.max(0, Math.min(lbList.length - 1, lbIndex + d)); showLb(); }
  else if (t.dataset.lbc) setCls([lbList[lbIndex].id], t.dataset.lbc);
  else if (t === $('lb')) closeLb();
});
document.addEventListener('click', e => {
  const t = e.target;
  if (t.dataset.f) { filter = t.dataset.f; renderPhotos(); }
  else if (t.dataset.set) setCls([+t.dataset.set], t.dataset.c);
  else if (t.dataset.bulk) setCls(visible().map(p => p.id), t.dataset.bulk);
  else if (t.dataset.zoom) openLb(+t.dataset.zoom);
  else if (t.dataset.open) api('/api/open', {path: t.dataset.open}).catch(e => alert(e.message));
});

$('start').onclick = async () => {
  try {
    localStorage.setItem('qr_base', $('base').value);
    await api('/api/start', {query: $('q').value, name: $('name').value, base: $('base').value, max_per_tab: +$('max').value, show_browser: $('show').checked});
    filter = 'all'; infoFilled = ''; load(false);
  } catch (e) { alert(e.message); }
};
$('stop').onclick = () => api('/api/stop', {});
$('toggleLog').onclick = () => { $('log').hidden = !$('log').hidden; };
$('save').onclick = async () => {
  const info = {}; document.querySelectorAll('#info input').forEach(i => info[i.dataset.k] = i.value);
  $('save').disabled = true;
  try {
    await api('/api/save', {name: $('name').value || info.name, base: $('base').value, info, memo: $('memo').value, kind: $('kind').value.split('(')[0]});
    await load(false); loadHist(); $('savedCard').scrollIntoView({behavior: 'smooth'});
  } catch (e) { alert(e.message); }
  $('save').disabled = false;
};
$('copy').onclick = () => navigator.clipboard.writeText($('prompt').textContent).then(() => { $('copy').textContent = '복사됨'; setTimeout(() => $('copy').textContent = '문장 복사', 1500); });
$('openDir').onclick = () => api('/api/open', {path: S.saved.path}).catch(e => alert(e.message));
async function loadHist() {
  const h = await api('/api/history?base=' + encodeURIComponent($('base').value));
  $('hist').innerHTML = h.length ? h.map(r => `<tr><td>${esc(r.folder)}</td><td class="muted">${esc(r.at.replace('T', ' '))}</td><td>${r.count}장</td><td><button data-open="${esc(r.path)}">폴더 열기</button></td></tr>`).join('') : '<tr><td class="muted">아직 없음</td></tr>';
}
load(true);
</script></body></html>
"""

if __name__ == "__main__":
  main()
