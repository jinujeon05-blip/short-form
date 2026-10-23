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
import hmac
import ipaddress
import secrets
import socket
import json
import os
import re
import shutil
import subprocess
import sys
import threading
import time
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

VERSION = "1.6"
PORT = int(os.environ.get("QRMENU_PORT", "8765"))
HOME = Path.home() / ".qrmenu_photos"
JOBS = HOME / "jobs"
BUNDLE_LIMIT = int(4.5 * 1024 * 1024)  # 8MB 넘는 묶음은 드라이브 연결 도구가 받다가 끊김(2026-10-23)
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
    self.debug = []
    self.logged_out = False  # 단계별 화면 캡처·화면 구조 요약 (구글 지도 구조가 바뀌었을 때 고치려고)
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
          "debug": self.debug, "logged_out": self.logged_out,
      }

  def persist(self):
    data = self.public()
    data["logs"] = data["logs"][-60:]
    (self.dir / "job.json").write_text(json.dumps(data, ensure_ascii=False), "utf-8")

  @classmethod
  def load(cls, path):
    d = json.loads(path.read_text("utf-8"))
    job = cls(d["params"], d["id"])
    for k in ("status", "info", "candidates", "tabs_found", "photos", "saved", "logs", "debug", "logged_out"):
      setattr(job, k, d.get(k) or getattr(job, k))
    if job.status == "running":
      job.status = "stopped"
    return job


STATE = {"job": None, "login_proc": None}

PROFILE_BUSY = ("로그인용 크롬 창이 아직 열려 있어요. 그 크롬 창(Google 지도·about:blank 탭이 있는 창)을 "
                "모두 닫은 뒤 '수집 시작'을 다시 눌러 주세요.")


def login_open():
  proc = STATE["login_proc"]
  return proc is not None and proc.poll() is None


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

# 가게 화면(개요·메뉴 탭)의 사진을 바로 위 제목(메뉴·하이라이트 등)과 함께 읽는다.
JS_SECTIONS = """() => {
  const vis = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const root = document.querySelector('div[role=main]') || document.body;
  const heads = [...root.querySelectorAll('h1,h2,h3,[role=heading]')].filter(vis);
  const pics = [];
  root.querySelectorAll('img').forEach(img => {
    const s = img.currentSrc || img.src || '';
    if (/googleusercontent|ggpht/.test(s)) pics.push([img, s]);
  });
  root.querySelectorAll('[style*="background-image"]').forEach(el => {
    const m = (el.getAttribute('style') || '').match(/url\\(["']?(https:[^"')]+)["']?\\)/);
    if (m && /googleusercontent|ggpht/.test(m[1])) pics.push([el, m[1]]);
  });
  const out = [];
  for (const [el, u] of pics) {
    const r = el.getBoundingClientRect();
    if (r.width < 60 && r.height < 60) continue;  // 리뷰 작성자 얼굴 등
    let sec = '';
    for (const h of heads) if (h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) sec = h.innerText.trim();
    out.push({u, sec});
  }
  const sc = [root, ...root.querySelectorAll('div')].find(d => d.scrollHeight > d.clientHeight + 50 &&
               /(auto|scroll)/.test(getComputedStyle(d).overflowY));
  if (sc) sc.scrollBy(0, 700);
  return out;
}"""

# 제목 글자(words)가 들어간 칸의 첫 사진을 누른다 → 크게 보기 화면
JS_CLICK_SECTION = """(words) => {
  const root = document.querySelector('div[role=main]') || document.body;
  const heads = [...root.querySelectorAll('h1,h2,h3,[role=heading]')];
  const h = heads.find(h => words.some(w => h.innerText.trim().toLowerCase().includes(w)));
  if (!h) return false;
  const imgs = [...root.querySelectorAll('img, [style*="background-image"]')].filter(el =>
    (h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) &&
    /googleusercontent|ggpht/.test((el.currentSrc || el.src || el.getAttribute('style') || '')) &&
    el.getBoundingClientRect().width >= 60);
  if (!imgs.length) return false;
  const t = imgs[0].closest('button,a,[role=button],[jsaction]') || imgs[0];
  t.scrollIntoView({block: 'center'}); t.click();
  return true;
}"""

# 화면에서 가장 크게 보이는 사진 (크게 보기 화면의 지금 사진)
JS_BIG = """() => {
  const cand = [...document.querySelectorAll('img')].map(e => [e, e.currentSrc || e.src || '']);
  document.querySelectorAll('[style*="background-image"]').forEach(e => {
    const m = (e.getAttribute('style') || '').match(/url\\(["']?(https:[^"')]+)["']?\\)/);
    if (m) cand.push([e, m[1]]);
  });
  let best = '', area = 0;
  for (const [e, u] of cand) {
    if (!/googleusercontent|ggpht/.test(u)) continue;
    const r = e.getBoundingClientRect();
    const w = Math.min(r.right, innerWidth) - Math.max(r.left, 0);
    const h = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
    if (w > 0 && h > 0 && w * h > area) { area = w * h; best = u; }
  }
  return {u: best, frac: area / (innerWidth * innerHeight)};
}"""

# 진단: 지금 화면의 구조 요약
JS_DIAG = """() => {
  const vis = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const t = el => (el.getAttribute('aria-label') || el.innerText || '').trim().slice(0, 60);
  return {
    tabs: [...document.querySelectorAll('[role=tab]')].filter(vis).map(t),
    heads: [...document.querySelectorAll('h1,h2,h3,[role=heading]')].filter(vis).map(t).slice(0, 20),
    photo_buttons: [...document.querySelectorAll('button[aria-label],a[aria-label]')].filter(vis).map(t)
      .filter(s => /사진|photo|ảnh|hình|메뉴|menu/i.test(s)).slice(0, 20),
    photo_index_links: document.querySelectorAll('a[data-photo-index]').length,
    photo_imgs: [...document.querySelectorAll('img')].filter(i => /googleusercontent|ggpht/.test(i.currentSrc || i.src || '')).length,
  };
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


def close_profile_chrome(profile):
  """수집기 전용 프로필(profile)을 쓰는 크롬·엣지만 찾아 끈다(평소 쓰는 크롬은 그대로). 끈 개수."""
  path = str(profile)
  try:
    if sys.platform.startswith("win"):
      ps = ("$p='" + path.replace("'", "''") + "'; $n=0; "
            "Get-CimInstance Win32_Process -Filter \"Name='chrome.exe' or Name='msedge.exe'\" | "
            "Where-Object { $_.CommandLine -and $_.CommandLine.Contains($p) } | "
            "ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue; $n++ }; $n")
      out = subprocess.run(["powershell", "-NoProfile", "-Command", ps], capture_output=True,
                           text=True, timeout=30, creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0))
      return int((out.stdout or "0").strip().splitlines()[-1] or 0)
    out = subprocess.run(["ps", "-eo", "pid=,comm=,args="], capture_output=True, text=True)
    n = 0
    for line in out.stdout.splitlines():
      pid, comm, args = (line.strip().split(None, 2) + ["", ""])[:3]
      if re.search(r"chrom|msedge", comm, re.I) and path in args:
        os.kill(int(pid), 9)
        n += 1
    return n
  except Exception:
    return 0


def launch(p, job):
  profile = HOME / "chrome-profile"  # 로봇 확인·동의를 한 번 하면 기억된다
  profile.mkdir(parents=True, exist_ok=True)
  opts = dict(headless=not job.params.get("show_browser", True), locale="ko-KR",
              viewport={"width": 1400, "height": 900},
              args=["--disable-blink-features=AutomationControlled"])
  if login_open():
    raise RuntimeError(PROFILE_BUSY)
  errors = []
  for channel in ("chrome", "msedge", None):
    try:
      kw = dict(opts, channel=channel) if channel else opts
      ctx = p.chromium.launch_persistent_context(str(profile), **kw)
      job.log(f"브라우저 시작: {channel or '내장 Chromium'}")
      return ctx
    except Exception as exc:
      if "has been closed" in str(exc):  # 같은 프로필을 다른 크롬이 쓰는 중(창을 닫아도 뒤에 남은 크롬)
        n = close_profile_chrome(profile)
        job.log(f"수집용 프로필을 쓰던 크롬 {n}개를 닫고 다시 엽니다.")
        time.sleep(3)
        try:
          ctx = p.chromium.launch_persistent_context(str(profile), **kw)
          job.log(f"브라우저 시작: {channel or '내장 Chromium'}")
          return ctx
        except Exception:
          raise RuntimeError(PROFILE_BUSY)
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


# 가게 맨 위 큰 사진 버튼: 이름이 '<가게> 사진'(로그인 안 한 화면에서 확인, 2026-10-23 청식당).
# 리뷰 사진('…님의 리뷰에 포함된…')·리뷰어 얼굴('<사람> 사진')·'사진 추가'는 뺀다.
JS_HERO = """(name) => {
  const bad = /추가|올리기|님의|리뷰|review|Add|Thêm|đánh giá/i;
  const btns = [...document.querySelectorAll('button[aria-label],a[aria-label]')].filter(b => {
    const r = b.getBoundingClientRect(); return r.width > 0 && r.height > 0;
  });
  const lab = b => b.getAttribute('aria-label').trim();
  const hit = btns.find(b => name && lab(b) === name + ' 사진') ||
              btns.find(b => name && lab(b).startsWith(name) && /사진|photo|ảnh/i.test(lab(b)) && !bad.test(lab(b))) ||
              btns.find(b => /^(Photo of|Ảnh về|Hình ảnh)/i.test(lab(b)) && !bad.test(lab(b))) ||
              document.querySelector('button.aoRNLd');
  if (!hit) return '';
  hit.click();
  return lab(hit) || 'button.aoRNLd';
}"""


def open_gallery(page, job):
  """맨 위 큰 사진을 누른다 → 'grid'(탭 있는 사진 목록) / 'viewer'(크게 보기) / ''(실패)."""
  job.step = "사진 갤러리 여는 중"
  try:
    label = page.evaluate(JS_HERO, job.info.get("name") or "")
  except Exception:
    label = ""
  if not label:
    job.log("맨 위 사진 버튼을 못 찾았어요.")
    return ""
  job.log(f"사진 버튼 누름: {label}")
  for _ in range(10):
    page.wait_for_timeout(800)
    if page.locator("a[data-photo-index]").count():
      job.log("사진 목록(갤러리) 열림")
      return "grid"
  if in_viewer(page):
    job.log("크게 보기 화면 열림")
    return "viewer"
  snap(page, job, "after_photo_click")
  job.log("사진 버튼을 눌렀지만 갤러리가 안 보여요.")
  return ""


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


MENU_WORDS = ["메뉴", "menu", "thực đơn"]
FOOD_WORDS = ["하이라이트", "highlight", "nổi bật", "인기"]
OVERVIEW_WORDS = ["개요", "overview", "tổng quan"]


def snap(page, job, name):
  """진단용 화면 캡처 + 구조 요약 (저장할 때 드라이브 묶음에 같이 들어간다)."""
  try:
    d = job.dir / "debug"
    d.mkdir(parents=True, exist_ok=True)
    f = d / f"debug_{len(job.debug) + 1:02d}_{name}.jpg"
    page.screenshot(path=str(f), type="jpeg", quality=55)
    info = page.evaluate(JS_DIAG)
    info.update(step=name, file=f.name, url=page.url[:300])
    job.debug.append(info)
  except Exception as exc:
    job.log(f"  진단 캡처 실패({name}): {str(exc).splitlines()[0][:80]}")


def click_tab(page, words):
  """보이는 탭 중 이름에 words가 든 첫 탭을 누른다."""
  for t in page.evaluate(JS_TABS):
    label = t["label"].lower()
    if t["visible"] and any(w in label for w in words):
      try:
        page.locator("[role=tab]").nth(t["i"]).click(timeout=5000)
        page.wait_for_timeout(2500)
        return True
      except Exception:
        return False
  return False


def on_place(page):
  try:
    return page.locator("h1.DUwDvf, button[data-item-id='address']").first.is_visible()
  except Exception:
    return False


def back_to_place(page, job):
  for action in ("esc", "back", "goto"):
    if on_place(page):
      return
    try:
      if action == "esc":
        page.keyboard.press("Escape")
      elif action == "back":
        page.go_back(wait_until="domcontentloaded", timeout=20000)
      else:
        page.goto(job.info["maps_url"], wait_until="domcontentloaded", timeout=40000)
    except Exception:
      pass
    page.wait_for_timeout(2500)


def viewer_walk(page, job, key, limit):
  """크게 보기 화면에서 → 키로 넘기며 큰 사진 주소를 모은다(화면 구조에 덜 의존)."""
  urls, seen, same = [], set(), 0
  for _ in range(limit * 2 + 6):
    job.check()
    r = page.evaluate(JS_BIG)
    k = photo_key(r["u"]) if r["u"] and r["frac"] > 0.12 else None
    if k and k not in seen:
      seen.add(k)
      urls.append(r["u"])
      same = 0
    else:
      same += 1
    if same >= 4 or len(urls) >= limit:
      break
    page.keyboard.press("ArrowRight")
    page.wait_for_timeout(1100)
  job.log(f"  {TAB_KO.get(key, key)}: 크게 보기에서 {len(urls)}장")
  return urls


def in_viewer(page):
  try:
    return page.evaluate(JS_BIG)["frac"] > 0.25
  except Exception:
    return False


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

  def add_sections(items):
    for it in items:
      sec = it["sec"].lower()
      tab = ("menu" if any(w in sec for w in MENU_WORDS) else
             "food" if any(w in sec for w in FOOD_WORDS) else "all")
      add([it["u"]], tab)

  snap(page, job, "place")
  try:
    job.logged_out = page.evaluate("""() => [...document.querySelectorAll('a[href*="ServiceLogin"],a[aria-label],button[aria-label]')]
      .some(e => { const r = e.getBoundingClientRect();
        return r.width > 0 && (/ServiceLogin/.test(e.href || '') || /^(로그인|Sign in|Đăng nhập)$/.test((e.getAttribute('aria-label') || e.innerText || '').trim())); })""")
  except Exception:
    job.logged_out = False
  if job.logged_out:
    job.log("⚠ 수집용 크롬이 구글에 로그인돼 있지 않아요 → '메뉴' 탭이 안 보일 수 있어요. 대시보드의 '구글 로그인' 버튼으로 한 번 로그인하세요.")
  # 1) 가게 첫 화면(개요)에 보이는 사진
  job.step = "가게 화면 사진 읽는 중"
  for _ in range(4):
    add_sections(page.evaluate(JS_SECTIONS))
    page.wait_for_timeout(700)

  # 2) 가게 화면의 '메뉴' 탭: 메뉴 칸 = 메뉴판, 하이라이트 칸 = 음식
  job.check()
  if click_tab(page, MENU_WORDS):
    job.step = "메뉴 탭 읽는 중"
    before = len(found)
    for _ in range(8):
      add_sections(page.evaluate(JS_SECTIONS))
      page.wait_for_timeout(800)
    snap(page, job, "menu_tab")
    job.log(f"메뉴 탭: 사진 {len(found) - before}장 더 찾음")
    # 메뉴 칸 첫 사진을 크게 열어 → 키로 메뉴판 사진을 모두 넘겨 본다
    if page.evaluate(JS_CLICK_SECTION, MENU_WORDS):
      page.wait_for_timeout(3000)
      snap(page, job, "menu_viewer")
      if in_viewer(page):
        add(viewer_walk(page, job, "menu", limit), "menu")
      back_to_place(page, job)
    click_tab(page, OVERVIEW_WORDS)
  else:
    job.log("가게 화면에 '메뉴' 탭이 없어요.")

  # 3) 사진 갤러리 (전체·최신·메뉴·음식·가게 제공 탭)
  job.check()
  mode = open_gallery(page, job)
  if mode == "viewer":
    snap(page, job, "hero_viewer")
    add(viewer_walk(page, job, "all", limit), "all")
  elif mode == "grid":
    page.wait_for_timeout(2000)
    snap(page, job, "gallery")
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
    job.log("사진 갤러리를 못 열었어요 → 가게 화면에 보이는 사진만 모읍니다.")
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
    short = str(exc).strip().splitlines()[0][:200] if str(exc).strip() else type(exc).__name__
    job.status, job.step = "error", f"오류: {short}"
    job.log(f"오류: {short}")
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
    if re.fullmatch(r"(menu|food|store|etc)_\d+\.jpg|claude_bundle_\d+\.zip|debug_\d+_\w+\.jpg", f.name):
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
  debug_files = sorted((job.dir / "debug").glob("debug_*.jpg")) if (job.dir / "debug").is_dir() else []
  parts, cur, size = [], [], sum(f.stat().st_size for f in debug_files)
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
      "debug": job.debug,
      "notes": ("tabs=구글 지도 갤러리에서 그 사진이 보인 탭. owner=가게(소유자)가 올린 사진. "
                "latest_rank=최신 탭 순서(1이 가장 최근). 올린 날짜·올린 사람 이름은 수집하지 않음."),
  }
  mjson = json.dumps(manifest, ensure_ascii=False, indent=2)
  (dest / "store_info.json").write_text(mjson, "utf-8")
  guide = make_guide(manifest)
  (dest / "클로드_안내.md").write_text(guide, "utf-8")
  for f in debug_files:
    shutil.copyfile(f, dest / f.name)
  for n, (bname, part) in enumerate(zip(bundles, parts)):
    with zipfile.ZipFile(dest / bname, "w", zipfile.ZIP_STORED) as z:
      z.writestr("store_info.json", mjson)
      z.writestr("클로드_안내.md", guide)
      for it in part:
        z.write(dest / it["file"], it["file"])
      if n == 0:  # 진단 캡처는 첫 묶음에
        for f in debug_files:
          z.write(f, f.name)

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
# ---------------------------------------------------------------------------
# 휴대폰에서 쓰기 (Tailscale 등으로 PC에 접속). 기본은 꺼짐, PC 화면에서만 켤 수 있다.
# ---------------------------------------------------------------------------
REMOTE_PORT = PORT + 1
SETTINGS_FILE = HOME / "settings.json"
TAILSCALE_NET = ipaddress.ip_network("100.64.0.0/10")
FAILS = {}  # ip → [틀린 횟수, 막힌 시각까지]
REMOTE = {"server": None}


def load_settings():
  try:
    s = json.loads(SETTINGS_FILE.read_text("utf-8"))
  except Exception:
    s = {}
  s.setdefault("remote", False)
  s.setdefault("lan", False)
  s.setdefault("pin_hash", "")
  s.setdefault("salt", secrets.token_hex(8))
  s.setdefault("secret", secrets.token_hex(16))
  return s


def save_settings(s):
  HOME.mkdir(parents=True, exist_ok=True)
  SETTINGS_FILE.write_text(json.dumps(s), "utf-8")


def hash_pin(pin, salt):
  return hashlib.pbkdf2_hmac("sha256", pin.encode(), salt.encode(), 200_000).hex()


def remote_token(s):
  """PIN이 바뀌면 같이 바뀐다 → 예전에 로그인한 휴대폰은 다시 PIN을 넣어야 한다."""
  return hmac.new(s["secret"].encode(), s["pin_hash"].encode(), "sha256").hexdigest()


def ip_allowed(ip, s):
  try:
    a = ipaddress.ip_address(ip)
  except ValueError:
    return False
  if a.is_loopback or a in TAILSCALE_NET:
    return True
  return bool(s.get("lan")) and a.is_private


def local_addresses():
  """이 PC의 주소들: Tailscale(100.x)과 같은 와이파이용 주소."""
  ips = set()
  for target in ("100.100.100.100", "8.8.8.8"):
    try:
      sk = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
      sk.connect((target, 80))
      ips.add(sk.getsockname()[0])
      sk.close()
    except OSError:
      pass
  try:
    ips.update(socket.gethostbyname_ex(socket.gethostname())[2])
  except OSError:
    pass
  out = []
  for ip in sorted(ips):
    a = ipaddress.ip_address(ip)
    if a.is_loopback:
      continue
    out.append({"ip": ip, "tailscale": a in TAILSCALE_NET})
  return out


def start_remote():
  if REMOTE["server"]:
    return
  srv = ThreadingHTTPServer(("0.0.0.0", REMOTE_PORT), RemoteHandler)
  REMOTE["server"] = srv
  threading.Thread(target=srv.serve_forever, daemon=True).start()
  print(f"휴대폰 접속 켬 — 포트 {REMOTE_PORT}")


def stop_remote():
  srv = REMOTE["server"]
  if srv:
    REMOTE["server"] = None
    threading.Thread(target=srv.shutdown, daemon=True).start()
    print("휴대폰 접속 끔")


def remote_status():
  s = load_settings()
  host = socket.gethostname().lower()
  addrs = local_addresses()
  urls = [{"url": f"http://{a['ip']}:{REMOTE_PORT}", "tailscale": a["tailscale"]}
          for a in addrs if a["tailscale"] or s["lan"]]
  if any(a["tailscale"] for a in addrs):
    urls.insert(0, {"url": f"http://{host}:{REMOTE_PORT}", "tailscale": True})
  return {"enabled": bool(REMOTE["server"]), "has_pin": bool(s["pin_hash"]), "lan": s["lan"],
          "port": REMOTE_PORT, "urls": urls,
          "tailscale": any(a["tailscale"] for a in addrs)}


def set_remote(body):
  s = load_settings()
  pin = str(body.get("pin") or "").strip()
  if pin:
    if not re.fullmatch(r"\d{6,12}", pin):
      raise ValueError("PIN은 숫자 6~12자리로 정해 주세요.")
    s["pin_hash"] = hash_pin(pin, s["salt"])
  s["lan"] = bool(body.get("lan"))
  want = bool(body.get("enabled"))
  if want and not s["pin_hash"]:
    raise ValueError("먼저 PIN(숫자 6자리 이상)을 정해 주세요.")
  s["remote"] = want
  save_settings(s)
  if want:
    try:
      start_remote()
    except OSError as exc:
      s["remote"] = False
      save_settings(s)
      raise ValueError(f"휴대폰 접속을 켜지 못했어요(포트 {REMOTE_PORT}): {exc}")
  else:
    stop_remote()
  return remote_status()


PIN_PAGE = """<!doctype html><html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>QR메뉴 사진 수집기</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f5f3ef;
font:16px/1.5 system-ui,-apple-system,"Segoe UI","Malgun Gothic",sans-serif;color:#1d1b18}
@media (prefers-color-scheme:dark){body{background:#171614;color:#eee9e1}input{background:#22201d;color:#eee9e1}}
form{width:min(320px,90vw);text-align:center}input{width:100%;box-sizing:border-box;font-size:24px;letter-spacing:6px;
text-align:center;padding:12px;border:1px solid #ccc;border-radius:10px;margin:14px 0}
button{width:100%;padding:12px;font-size:17px;border:0;border-radius:10px;background:#e8590c;color:#fff;font-weight:700}
p{color:#888;font-size:14px}#e{color:#c92a2a}</style></head><body>
<form id="f"><b>QR메뉴 사진 수집기</b><p>PC에서 정한 PIN을 넣어 주세요</p>
<input id="pin" type="password" inputmode="numeric" autocomplete="current-password" autofocus>
<button>열기</button><p id="e"></p></form>
<script>document.getElementById('f').onsubmit=async e=>{e.preventDefault();
const r=await fetch('/api/pin',{method:'POST',headers:{'Content-Type':'application/json','X-QR':'1'},
body:JSON.stringify({pin:document.getElementById('pin').value})});
if(r.ok)location.reload();else document.getElementById('e').textContent=(await r.json()).error;};</script></body></html>"""


class Handler(BaseHTTPRequestHandler):
  remote = False

  def log_message(self, *a):
    pass

  def _send(self, code, body, ctype="application/json; charset=utf-8", headers=None):
    if isinstance(body, (dict, list)):
      body = json.dumps(body, ensure_ascii=False).encode("utf-8")
    elif isinstance(body, str):
      body = body.encode("utf-8")
    self.send_response(code)
    self.send_header("Content-Type", ctype)
    self.send_header("Content-Length", str(len(body)))
    self.send_header("Cache-Control", "no-store")
    for k, v in (headers or {}).items():
      self.send_header(k, v)
    self.end_headers()
    self.wfile.write(body)

  def _authed(self):
    """휴대폰(원격) 요청: 허용된 주소 + PIN 쿠키가 있어야 한다. PC 안 요청은 항상 통과."""
    if not self.remote:
      return True
    s = load_settings()
    cookie = self.headers.get("Cookie") or ""
    m = re.search(r"(?:^|;\s*)qrpin=([0-9a-f]{64})", cookie)
    return bool(s["pin_hash"]) and bool(m) and hmac.compare_digest(m.group(1), remote_token(s))

  def _gate(self):
    """원격 접속에서 막아야 하면 응답을 보내고 True."""
    if not self.remote:
      return False
    if not ip_allowed(self.client_address[0], load_settings()):
      self._send(403, {"error": "허용되지 않은 주소예요(Tailscale로 접속해 주세요)."})
      return True
    return False

  def do_GET(self):
    if self._gate():
      return
    u = urlparse(self.path)
    job = STATE["job"]
    if u.path == "/":
      if not self._authed():
        return self._send(200, PIN_PAGE, "text/html; charset=utf-8")
      return self._send(200, PAGE.replace("__REMOTE__", "true" if self.remote else "false"),
                        "text/html; charset=utf-8")
    if not self._authed():
      return self._send(401, {"error": "PIN을 넣어 주세요."})
    if u.path == "/api/remote":
      if self.remote:
        return self._send(403, {"error": "PC에서만 바꿀 수 있어요."})
      return self._send(200, remote_status())
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
    if self._gate():
      return
    try:
      body = json.loads(self.rfile.read(int(self.headers.get("Content-Length") or 0)) or b"{}")
    except Exception:
      return self._send(400, {"error": "잘못된 요청"})
    if self.remote and self.path == "/api/pin":
      return self._pin(body)
    if not self._authed():
      return self._send(401, {"error": "PIN을 넣어 주세요."})
    if self.remote and self.path in ("/api/open", "/api/login", "/api/remote"):
      return self._send(403, {"error": "이 기능은 PC에서만 쓸 수 있어요."})
    job = STATE["job"]
    try:
      if self.path == "/api/remote":
        return self._send(200, set_remote(body))
      if self.path == "/api/login":
        open_login()
        return self._send(200, {"ok": True})
      if self.path == "/api/start":
        if job and job.status == "running":
          return self._send(409, {"error": "이미 수집 중이에요."})
        if login_open():
          return self._send(409, {"error": PROFILE_BUSY})
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


class RemoteHandler(Handler):
  remote = True

  def _pin(self, body):
    ip = self.client_address[0]
    cnt, until = FAILS.get(ip, [0, 0])
    if until > time.time():
      return self._send(429, {"error": "여러 번 틀려서 10분 동안 막혔어요."})
    s = load_settings()
    pin = str(body.get("pin") or "")
    if s["pin_hash"] and hmac.compare_digest(hash_pin(pin, s["salt"]), s["pin_hash"]):
      FAILS.pop(ip, None)
      return self._send(200, {"ok": True}, headers={
          "Set-Cookie": f"qrpin={remote_token(s)}; Max-Age=2592000; Path=/; HttpOnly; SameSite=Strict"})
    cnt += 1
    FAILS[ip] = [0, time.time() + 600] if cnt >= 5 else [cnt, 0]
    return self._send(403, {"error": "PIN이 틀렸어요." + (" 10분 뒤에 다시 해 주세요." if cnt >= 5 else "")})


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


def find_chrome():
  """PC에 깔린 크롬 실행 파일 (없으면 None)."""
  if sys.platform.startswith("win"):
    for env in ("PROGRAMFILES", "PROGRAMFILES(X86)", "LOCALAPPDATA"):
      base = os.environ.get(env)
      if base:
        p = Path(base) / "Google" / "Chrome" / "Application" / "chrome.exe"
        if p.is_file():
          return str(p)
  elif sys.platform == "darwin":
    p = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
    if p.is_file():
      return str(p)
  return shutil.which("google-chrome") or shutil.which("chrome")


def open_login():
  chrome = find_chrome()
  if not chrome:
    raise ValueError("크롬을 찾지 못했어요. 크롬을 설치해 주세요.")
  job = STATE["job"]
  if job and job.status == "running":
    raise ValueError("수집이 끝난 뒤에 로그인해 주세요.")
  profile = HOME / "chrome-profile"
  profile.mkdir(parents=True, exist_ok=True)
  STATE["login_proc"] = subprocess.Popen([chrome, f"--user-data-dir={profile}", "--no-first-run", "--new-window",
                    "https://accounts.google.com/ServiceLogin?continue=https://www.google.com/maps"])


def open_dashboard(url):
  """대시보드는 크롬으로 연다(기본 브라우저가 엣지여도). 크롬이 없으면 기본 브라우저."""
  chrome = find_chrome()
  if chrome:
    try:
      subprocess.Popen([chrome, "--new-window", url])
      return
    except OSError:
      pass
  webbrowser.open(url)


def main():
  JOBS.mkdir(parents=True, exist_ok=True)
  restore_last_job()
  try:
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
  except OSError:
    print(f"이미 실행 중이에요 → http://127.0.0.1:{PORT}")
    open_dashboard(f"http://127.0.0.1:{PORT}")
    return
  url = f"http://127.0.0.1:{PORT}"
  print(f"QR메뉴 사진 수집기 v{VERSION} — {url}\n이 창을 닫으면 대시보드가 꺼집니다.")
  if load_settings()["remote"]:
    try:
      start_remote()
    except OSError as exc:
      print(f"휴대폰 접속을 켜지 못했어요: {exc}")
  if "--no-browser" not in sys.argv:
    threading.Timer(0.8, lambda: open_dashboard(url)).start()
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
*{box-sizing:border-box}[hidden]{display:none!important}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,-apple-system,"Segoe UI","Malgun Gothic",sans-serif}
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
@media (max-width:600px){main{padding:10px}.photos{grid-template-columns:repeat(2,1fr)}header .muted{display:none}.lb .bar{font-size:13px}.lb .bar button{padding:8px 10px}}
.remote-only{display:none}body.remote .remote-only{display:block}body.remote .pc-only{display:none!important}
.qr{background:#fff;padding:8px;border-radius:8px;display:inline-block}.urls{display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start}
</style></head><body>
<header><b>QR메뉴 사진 수집기</b><span class="v" id="ver"></span><span class="muted" style="margin-left:auto">구글 지도 → 고르기 → 드라이브 → Claude</span></header>
<main>
<div class="notice" id="notice" hidden></div>
<div class="card remote-only muted">휴대폰으로 PC의 수집기를 쓰는 중이에요. 수집은 PC에서 돌아가고, 저장도 PC의 드라이브 폴더로 가요. 구글 로봇 확인이 뜨면 PC 앞에서만 체크할 수 있어요.</div>

<section class="card">
  <h2>1. 가게 찾기</h2>
  <div class="grid2">
    <div><label>가게 이름 또는 구글 지도 링크</label><input id="q" placeholder="예: 박닌 수원성  /  https://maps.app.goo.gl/…"></div>
    <div><label>드라이브 폴더 이름 (비우면 지도의 가게 이름)</label><input id="name" placeholder="예: 수원성"></div>
    <div class="pc-only"><label>저장 위치</label><input id="base"></div>
    <div><label>탭마다 최대 사진 수</label><input id="max" type="number" min="10" max="300" value="80"></div>
  </div>
  <div class="row" style="margin-top:10px">
    <label class="check"><input type="checkbox" id="show" checked> 크롬 창 보이기 (로봇 확인이 뜨면 직접 체크)</label>
    <span style="flex:1"></span>
    <button id="login" class="pc-only" title="수집용 크롬에서 구글에 로그인합니다(처음 한 번). 로그인 후 그 크롬 창을 닫으세요.">구글 로그인</button>
    <button id="stop" hidden>멈춤</button>
    <button class="primary" id="start">수집 시작</button>
  </div>
  <p class="muted" style="margin:8px 0 0">링크가 가장 정확해요. 이름으로 찾으면 검색 결과 첫 가게를 고릅니다.<span class="pc-only"> 처음 한 번은 <b>구글 로그인</b>을 눌러 로그인하고 그 크롬 창을 닫으세요(로그인해야 '메뉴' 탭이 보여요).</span></p>
</section>

<section class="card" id="statusCard" hidden>
  <div class="row"><span class="step" id="step"></span><span style="flex:1"></span><button id="toggleLog">기록 보기</button></div>
  <div class="notice" id="loginWarn" hidden style="margin:8px 0 0">수집용 크롬이 구글에 로그인돼 있지 않아 '메뉴' 탭이 안 보였을 수 있어요. 위의 <b>구글 로그인</b>을 눌러 로그인하고 그 크롬 창을 닫은 뒤 다시 수집해 주세요.</div>
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
  <div class="row" style="margin-top:8px"><button id="copy">문장 복사</button><button id="openDir" class="pc-only">폴더 열기</button><span class="muted" id="savedPath"></span></div>
</section>

<section class="card pc-only" id="remoteCard">
  <h2>휴대폰에서 쓰기 <span class="muted">— 외근 중에도 휴대폰으로 이 수집기를 씁니다(PC는 켜 두기)</span></h2>
  <div class="grid2">
    <div><label>PIN (숫자 6~12자리, 휴대폰에서 처음 한 번 입력)</label><input id="pin" type="password" inputmode="numeric" placeholder="바꿀 때만 입력"></div>
    <div><label>&nbsp;</label><label class="check"><input type="checkbox" id="remoteOn"> 휴대폰 접속 켜기</label>
      <label class="check"><input type="checkbox" id="remoteLan"> 같은 와이파이에서도 허용(Tailscale 없이)</label></div>
  </div>
  <div class="row" style="margin-top:8px"><button class="primary" id="remoteSave">저장</button><span class="muted" id="remoteMsg"></span></div>
  <div class="urls" id="remoteUrls" style="margin-top:10px"></div>
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
const REMOTE = __REMOTE__;  // 서버가 휴대폰 문으로 들어온 요청인지 알려 줌
if (REMOTE) document.body.classList.add('remote');
let S = null, CLASSES = [], TAB_KO = {}, filter = 'all', lbIndex = -1, timer = null, infoFilled = '';
const api = (path, body) => fetch(path, body === undefined ? {} : {method:'POST', headers:{'Content-Type':'application/json','X-QR':'1'}, body:JSON.stringify(body)})
  .then(async r => { if (r.status === 401) { location.reload(); throw new Error('PIN'); } const j = await r.json(); if (!r.ok) throw new Error(j.error || r.status); return j; });
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const INFO_FIELDS = [['name','가게 이름'],['category','업종'],['address','주소'],['phone','전화'],['hours','영업시간'],['website','웹사이트'],['rating','평점'],['maps_url','구글 지도 링크']];

async function load(first) {
  const st = await api('/api/state');
  CLASSES = st.classes; TAB_KO = st.tab_ko; $('ver').textContent = 'v' + st.version;
  if (first) { $('base').value = localStorage.getItem('qr_base') || st.default_base; loadHist(); if (!REMOTE) loadRemote(); }
  S = st.job; render();
  clearTimeout(timer);
  if (S && S.status === 'running') timer = setTimeout(() => load(false), 1000);
}

function render() {
  const running = S && S.status === 'running';
  $('start').disabled = running; $('stop').hidden = !running;
  $('notice').hidden = !(S && S.notice); if (S && S.notice) $('notice').textContent = S.notice + (REMOTE ? ' (휴대폰으로는 체크할 수 없어요 — PC 앞에서 체크하거나 멈춤을 누르세요.)' : '');
  $('statusCard').hidden = !S;
  if (!S) return;
  first_fill();
  $('step').textContent = (running ? '⏳ ' : S.status === 'done' ? '✅ ' : S.status === 'error' ? '⚠️ ' : '') + (S.step || '');
  $('loginWarn').hidden = !(S.logged_out && !running);
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
let touchX = null;
$('lb').addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, {passive: true});
$('lb').addEventListener('touchend', e => {
  if (touchX === null || lbIndex < 0) return;
  const dx = e.changedTouches[0].clientX - touchX; touchX = null;
  if (Math.abs(dx) < 50) return;
  lbIndex = Math.max(0, Math.min(lbList.length - 1, lbIndex + (dx < 0 ? 1 : -1))); showLb();
});
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
    filter = 'all'; infoFilled = ''; $('memo').value = ''; load(false);
  } catch (e) { alert(e.message); }
};
$('stop').onclick = () => api('/api/stop', {});
$('login').onclick = () => api('/api/login', {}).then(() => alert('크롬 창이 열려요. 구글에 로그인한 뒤 그 크롬 창을 꼭 닫고(X) 수집을 시작하세요.')).catch(e => alert(e.message));
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
function copyText(t) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t);
  const ta = document.createElement('textarea'); ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove();
  return ok ? Promise.resolve() : Promise.reject(new Error('copy'));
}
$('copy').onclick = () => copyText($('prompt').textContent)
  .then(() => { $('copy').textContent = '복사됨'; setTimeout(() => $('copy').textContent = '문장 복사', 1500); })
  .catch(() => alert('복사가 안 되면 문장을 길게 눌러 복사해 주세요.'));
$('openDir').onclick = () => api('/api/open', {path: S.saved.path}).catch(e => alert(e.message));
function showRemote(r) {
  $('remoteOn').checked = r.enabled; $('remoteLan').checked = r.lan;
  $('remoteMsg').textContent = (r.has_pin ? 'PIN 설정됨. ' : 'PIN을 먼저 정해 주세요. ') +
    (r.enabled ? '휴대폰 접속 켜짐.' : '휴대폰 접속 꺼짐.') + (r.tailscale ? '' : ' Tailscale이 이 PC에서 안 보여요(설치·로그인 확인).');
  const box = $('remoteUrls'); box.innerHTML = '';
  if (!r.enabled) return;
  if (!r.urls.length) { box.innerHTML = '<span class="muted">접속 주소가 없어요. Tailscale을 켜거나 \'같은 와이파이에서도 허용\'을 켜 주세요.</span>'; return; }
  r.urls.forEach(u => {
    const d = document.createElement('div');
    d.innerHTML = `<div class="qr"></div><div class="muted" style="margin-top:4px">${esc(u.url)}<br>${u.tailscale ? '어디서나(Tailscale)' : '같은 와이파이에서만'}</div>`;
    box.appendChild(d);
    loadQR().then(() => new QRCode(d.firstChild, {text: u.url, width: 130, height: 130}))
      .catch(() => d.firstChild.remove());  // QR을 못 그려도 주소 글자는 보인다
  });
}
// QR 그림 도구는 필요할 때만 따로 불러온다(못 불러와도 화면이 멈추지 않게)
function loadQR() {
  if (window.QRCode) return Promise.resolve();
  return new Promise((ok, no) => {
    const sc = document.createElement('script');
    sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    sc.onload = ok; sc.onerror = no; setTimeout(no, 8000); document.head.appendChild(sc);
  });
}
async function loadRemote() { try { showRemote(await api('/api/remote')); } catch (e) {} }
$('remoteSave').onclick = async () => {
  try { showRemote(await api('/api/remote', {pin: $('pin').value, enabled: $('remoteOn').checked, lan: $('remoteLan').checked})); $('pin').value = ''; }
  catch (e) { alert(e.message); }
};
async function loadHist() {
  const h = await api('/api/history?base=' + encodeURIComponent($('base').value));
  $('hist').innerHTML = h.length ? h.map(r => `<tr><td>${esc(r.folder)}</td><td class="muted">${esc(r.at.replace('T', ' '))}</td><td>${r.count}장</td><td><button class="pc-only" data-open="${esc(r.path)}">폴더 열기</button></td></tr>`).join('') : '<tr><td class="muted">아직 없음</td></tr>';
}
load(true);
</script></body></html>
"""

if __name__ == "__main__":
  main()
