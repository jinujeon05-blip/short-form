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

import base64
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

VERSION = "1.9"
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
      "folder": dest.name, "kind": body.get("kind") or "가게 찾기용",
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


# 앱 아이콘(따뜻한 음식 카드, 2026-11-27 캡틴 지시) — 파일 하나로 옮겨 다니도록 안에 넣어 둔다.
# 폰 '홈 화면에 추가' 시 주소창 없는 앱 화면·아이콘·시작 화면에 쓴다. PIN 없이 줘도 되는 공개 그림이다.
APP_ICONS = {
  "/icon-512.png": "iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAADAFBMVEX9+/k4N0X8lwP9pwP8hwP9tgP8eAL9wgP8agL12cQrKjn3WAVoZ3TERwLs6ef759O8RwNHR1PpSgRvqRTW1tgyMT3Ix8uop62Ih49ZWGRUkg21tbmUk5pSjQ17eoRzcnv617NTUlz91pD8tjD95LGbm6L9yG9APksvLkD9uE78qCv98df8yJC9vMH8xFP3yq37hzD7uI38tm/e3uD8llD7eCv8p27RZgTKVgW3PAH8ly78pk9zsRRgXmnYdgTpPAD3mWz80nYbGyz7iEfAvsPvqYtqmRDJuKv9wTGgnqXTw7aAfobzaym1ppuxpwuPlg7xjGiPjAzTqQjMYzSlnJc+QE7TeE+Mpg/g3+HuvKWxeAiUwlJeYGzMswo+iA+riQzEPQDHWiaysw2EeXiMgH2+wMSfoKaJtBXYggSzVgfZhVmFtS0gHi3f4OJxiQvdkm6wmAh6tCmRbQeozHWHewofIDPtWiHQppLK3avO4rN/gIj0fU5Mog+w04RQT2A+kg/94J/d6czbj2+vZQXB3p8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADG+jHgAAABAHRSTlP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE+3t1gAARxVJREFUeNrtnYlj28aZ6EEAZCiIBgwH4BHKIilKom7ZVhxfsV/sOHHutEmTpt12226P7d779j7e/d4f/nBjBpgZzAxmBiClaerERxRJ32+++/tGe0vl6SJP8Mv577/VJf3RFh8jONjfC/8ystM1wJ81e7QWANBNAegmf62h8EsCT34ERN8t/P2aARBKtovVAflvrOHdjwkI/ypf/JgNSP6GcS0BIAk2/r21lHyq/PNrniv9Ft73JjUA+aznvU90f3bLY3lnAHTbLn2lGqACgLfaTIEB2/nkH1Nxg9/PLmAH2gyAnvxN11RJn0K4b7X5rieGPtf5RvarsGmHA4J2X39dKgBdOKB7a30tfKbW4TsNuPhlB6/92l+XDkD0fyq3vr2uvwH497CwMyWAce3bD4AuFYBUqG+ta2QHOfNdjGQx97zbegzi6y8NgG5qALprLH6j7Md1i0JHWPlurhm6rbb+EgHoZgx01/pwBXLd9bABMgHopv9f/8OXv2u/+y9XA6xzTrdw/7lv8rUGIHf/1p2AzT2SAVh3/W9sOgS6LB+guxkAwEm+zb3+MjTA+nv/Rtvz+EIJ0OQ4gJvg+98AwKP8uxtxjA0/AgHoon66NkUetNO3yVe/4AHUBaDbLRV91wIAuG4P0rDpV78g/poAZAmfNPO3JvLP2vi6YCuXsfHy13UpAHTTbt61cP8wnRrX4e4nwjdEApBpgfYGAFDhDu3mpSbgut1+MRqgAEBbBzaA6H7jnXyK/I8wJ7Dlet/oFotz11X6EgCIu31aCwDYxXVzJAAQeX9d2o5fxcF9/rc1a9RTLf9aALRroMcAf4hjvJvrXyn/egC0r+nDSLq3b+QNhn9AD6hYH6Cbj/M0ioIBlG+uQyqf494LBwAc6b8p3awBB+J9gOaln83m3UR5TOl/sWHgWy0I82+kzC3/Ok5gngdocjr7RsTV419S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",
  "/icon-192.png": "iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAADAFBMVEX9+/g4N0X8lwP9pwP8hwP9tgP8eAMrKjn9wgP8awP12cRpaHP4WARHRlPr6Oj75tDX1tlaWWXERwKIh4+oqK3Ix8u1tLkyMT68RQN6eoOVlJvqSQJ0c3xuqROcm6L8yHD82K7947P81pFSUV38uEv8tjH8yowcGyxTkg38xFP5t4y9vcFOjQ37qCvJVgX6y6v8pmv+8dr8lk7WZwP7hi35iUr5ei38uHHe3uBAPkv8li78pk+4PAHWdgXvaTBhXWX903W0pJllmRD4mWfVxbiAfoeLqA4vLkDMpQbJvLIgHzClmZTZk3DUe02umQWQlArteEfzqoiDenrAv8PBOwC/wMTg3+L+wztniQ3DWSOgn6VrsxXnPwCzhg2zfAy9UQ2PjhA/QEyEti+ftBGfoKeax1ra6sXdtA3f4OHNcTmIeAmfbAj94JJ5sCLNYSl3qyPyi2G7sg35vKGhyVjT4rv90FilyWwdIDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+p8YJAAABAHRSTlP/////////////////////////////////////////////////////////////////////////////////////////////////////////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",
  "/splash.png": "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAADAFBMVEX9+/g4N0X8lwP9twP9pwP8iAP8dwP9wgMAAAD8bAMrKjn22cT4WARoZ3Pq6OdHRlP759LIx8uop63ERwLX1tlZWGSIh48yMT28RgO1tLhuqRPqSwSUlJp6eoOcm6P617Fzc3z8x278tS/81pJSUV3947NUkg38qCv7uE78yJC9vcH//wDe3uD/fwBQjQ1APkv+0gn1yq7/AAD8xFHKVQX8tm/98dj8hzL////4to//qlX/f3/6p3D/qgD7eCr8l1EcGyu4PAH8li/4iU/SaAT7pk/WcwTnPAD/vwD+qyr903X//3/2mmxgXmf9iTD9phcvLkD9hy39fBn/VQD9uSn9tDHJuKv8t0z91Cz8yRj+uBnrqIr8qDD0yJD81DH610f65/b91TD90hrYxbb8rDb718qQpw39ulL/x6/9uUmMlxH//1X9xTX9wzLLZzn8u4j/1HP82on71rD7zSS2owlxshX8x0v7izr/k0b5xnD+1CGilY79mVPCPQDWhw3GnQT8tzn8ySnY6MP/ycn72DX9007+nxv9o2v9pxyAf4n810P/qkncmHjxi2P9pSP/41X2ssz8yG79uib8rUj6qHb/+LT/pmS/wMP/0OegnqX8tRq/fz/g3+H8vTT+ly+vegv4uGv3unG5WAT9zR3Av8T9xyT8gyb5yUpsiAv7xUaTgwz94Zs/QE6DeXb+fiP9fib/fz+Hewn/2Gn/VVUgHjD8ghv/AP/U///f4OL8jDjU57ja2v/6iUf3jkf6j0bAr6H/mQD/kj3ajGbYgVf/nVX5nGL8pDn/r0LdXCPuqoj4qoWpz3OhyVi/vz+4tA+yopn1qqD/qv/9sR29nwCggw7/vz//tED/sYv/tqO/PwCfx2SSvzyPsRP4vKb7wDH/wYvuz8D/zP/90h7/8NJ///99syn/5mpmlw7/5Zl/f///4qphWl9fYGr/5cz/84XvaCMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACVvaMSAAABAHRSTlP///7+/v7+/gD+/////////////////////////////////v/////+////Af8C///8/wH//////wP/AwL/A/////////////8Erv8C//+O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",
}
APP_MANIFEST = json.dumps({
  "name": "QR메뉴 사진 수집기", "short_name": "사진 수집기", "id": "/", "start_url": "/", "scope": "/",
  "display": "standalone", "background_color": "#FF9A00", "theme_color": "#FF9A00",
  "icons": [{"src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
            {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
            {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]}, ensure_ascii=False)
APP_HEAD = """<link rel="manifest" href="/manifest.json"><meta name="theme-color" content="#FF9A00">
<meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="사진 수집기"><link rel="icon" type="image/png" href="/icon-192.png">
<link rel="apple-touch-icon" href="/icon-192.png">"""
# 시작 화면: 폰(손가락 화면)·홈 화면 앱으로 열 때 한 번만 1.3초쯤 보여 준다. PC 브라우저에선 안 보임.
SPLASH = """<style>#splash{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;
background:radial-gradient(circle at 30% 20%,#FFC21A 0%,#FF9A00 50%,#FF6A00 100%);color:#fff;transition:opacity .45s ease,visibility .45s;
font-family:system-ui,-apple-system,"Segoe UI","Malgun Gothic",sans-serif;text-shadow:0 1px 3px rgba(120,50,0,.35)}
#splash img{width:132px;height:132px;filter:drop-shadow(0 10px 24px rgba(120,50,0,.35));animation:sp-pop .7s cubic-bezier(.2,1.4,.4,1) both}
#splash b{font-size:24px;animation:sp-up .6s .25s ease both}#splash small{font-size:13px;opacity:.9;animation:sp-up .6s .4s ease both}
#splash i{display:flex;gap:6px}#splash i span{width:7px;height:7px;border-radius:50%;background:#fff;opacity:.4;animation:sp-dot 1s infinite}
#splash i span:nth-child(2){animation-delay:.15s}#splash i span:nth-child(3){animation-delay:.3s}
#splash.out{opacity:0;visibility:hidden}html.nosplash #splash{display:none}
@keyframes sp-pop{from{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes sp-up{from{transform:translateY(10px);opacity:0}to{transform:none;opacity:1}}
@keyframes sp-dot{50%{opacity:1;transform:translateY(-4px)}}</style>
<div id="splash" aria-hidden="true"><img src="/splash.png" alt=""><b>QR메뉴 사진 수집기</b><small>맛있는 사진 모으는 중</small><i><span></span><span></span><span></span></i></div>
<script>(function(){var show=false;try{show=(matchMedia('(display-mode: standalone)').matches||navigator.standalone||matchMedia('(pointer: coarse)').matches)&&!sessionStorage.getItem('splashSeen');sessionStorage.setItem('splashSeen','1')}catch(e){}
if(!show){document.documentElement.className+=' nosplash';return}
var t0=Date.now();function hide(){var s=document.getElementById('splash');if(!s)return;setTimeout(function(){s.classList.add('out');setTimeout(function(){s.remove()},500)},Math.max(0,1300-(Date.now()-t0)))}
addEventListener('load',hide);setTimeout(hide,3500)})();</script>"""


PIN_PAGE = """<!doctype html><html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>QR메뉴 사진 수집기</title>
""" + APP_HEAD + """
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
    if u.path in APP_ICONS:  # 앱 아이콘·홈 화면 설정은 PIN 없이(폰이 쿠키 없이 받아 감)
      return self._send(200, base64.b64decode(APP_ICONS[u.path]), "image/png")
    if u.path == "/manifest.json":
      return self._send(200, APP_MANIFEST, "application/manifest+json; charset=utf-8")
    if u.path == "/":
      if not self._authed():
        return self._send(200, PIN_PAGE, "text/html; charset=utf-8")
      return self._send(200, PAGE.replace("__REMOTE__", "true" if self.remote else "false")
                        .replace("__APPHEAD__", APP_HEAD).replace("__SPLASH__", SPLASH),
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
__APPHEAD__
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
__SPLASH__
<header><img src="/icon-192.png" alt="" width="30" height="30" style="border-radius:8px;flex:none"><b>QR메뉴 사진 수집기</b><span class="v" id="ver"></span><span class="muted" style="margin-left:auto">구글 지도 → 고르기 → 드라이브 → Claude</span></header>
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
  <h2>4. 저장 완료 → 아래 문장을 대시보드 지시창이나 Claude 세션에 보내세요</h2>
  <div class="box" id="prompt"></div>
  <div class="row" style="margin-top:8px"><button id="copy">문장 복사</button><button id="openDir" class="pc-only">폴더 열기</button><span class="muted" id="savedPath" style="overflow-wrap:anywhere;min-width:0"></span></div>
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
  if (S.saved) {
    $('prompt').textContent = S.saved.prompt; $('savedPath').textContent = S.saved.path;
  }
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
