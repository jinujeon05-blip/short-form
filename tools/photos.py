#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""가게 사진 준비 (2026-10-29). 담당이 파일 쓰기 명령 없이 한 줄로 부르게 만든 도구.

  python tools/photos.py sheet  <사진폴더> <출력.jpg>   — 모든 사진(jpg·png·webp)을 번호 붙인 모음 이미지 한 장으로 (finder)
  python tools/photos.py shrink <사진폴더> <출력폴더>    — menu_*.* 를 긴 변 1600px jpg로 줄여 복사 (안티그래비티에 넘길 때)
  python tools/photos.py prep   <가게id> <드라이브 폴더 이름>  — 새 가게 준비를 한 번에(2026-11-11, 토큰 줄이기):
        드라이브 G:/내 드라이브/QR메뉴판/<폴더> 사진을 .scratch/<가게id>/src 로 복사 → 모음 이미지 sheet.jpg → 메뉴판 줄이기 menus/
        → 가게 정보(이름·주소·전화·영업시간·지도·메모)와 사진별 정보(가게 계정이 올린 것·최신 순서), 같은 가게가 이미 있는지, agy 명령 묶음을 보여 준다

안티그래비티(agy)는 사진이 크거나 한 번에 많으면 실패한다(2026-10-29 토정삼계탕: 10장 → 400 오류, 큰 사진 → 스스로 명령을 돌리려다 거절).
그래서 줄인 사진을 한 번에 5장 이하로 넘긴다.
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

EXT = {".jpg", ".jpeg", ".png", ".webp"}


def photos(src):
    return sorted(p for p in Path(src).iterdir() if p.suffix.lower() in EXT)


def sheet(src, out, cell=240, cols=6):
    items = photos(src)
    if not items:
        sys.exit("사진이 없음: " + src)
    rows = (len(items) + cols - 1) // cols
    canvas = Image.new("RGB", (cols * cell, rows * (cell + 22)), "white")
    draw = ImageDraw.Draw(canvas)
    for i, p in enumerate(items):
        try:
            im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
        except Exception:
            continue
        im.thumbnail((cell - 6, cell - 6))
        x, y = (i % cols) * cell, (i // cols) * (cell + 22)
        canvas.paste(im, (x + (cell - im.width) // 2, y + 3))
        draw.text((x + 4, y + cell + 4), f"{i + 1}. {p.name}"[:34], fill="black")
    Path(out).parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out, quality=82)
    print(f"모음 이미지 {out} ({len(items)}장)")
    for i, p in enumerate(items):
        print(f"{i + 1}. {p.name}")


def shrink(src, dst, size=1600):
    Path(dst).mkdir(parents=True, exist_ok=True)
    n = 0
    for p in photos(src):
        if not p.name.lower().startswith("menu"):
            continue
        im = ImageOps.exif_transpose(Image.open(p)).convert("RGB")
        im.thumbnail((size, size))
        im.save(Path(dst) / (p.stem + ".jpg"), quality=85)
        n += 1
    print(f"메뉴판 {n}장을 {dst} 에 긴 변 {size}px로 줄임 — agy 에는 한 번에 5장 이하로 넘긴다")


DRIVE = Path("G:/내 드라이브/QR메뉴판")


def prep(shop, folder):
    import json, re, shutil
    root = Path(__file__).resolve().parent.parent
    src = DRIVE / folder
    if not src.is_dir():
        near = [p.name for p in DRIVE.iterdir() if p.is_dir() and (folder[:2] in p.name)][:10] if DRIVE.is_dir() else []
        sys.exit(f"드라이브 폴더가 없음: {src} · 비슷한 이름: {near}")
    if (root / "restaurants" / shop).exists():
        print(f"※ restaurants/{shop} 가 이미 있음 — 새로 만들지 말고 확인")
    work = root / ".scratch" / shop
    dst = work / "src"
    dst.mkdir(parents=True, exist_ok=True)
    n = 0
    for p in photos(src):
        if p.name.lower().startswith("debug"):
            continue
        if not (dst / p.name).exists():
            shutil.copy2(p, dst / p.name)
        n += 1
    print(f"사진 {n}장 → .scratch/{shop}/src")

    info = {}
    if (src / "store_info.json").exists():
        info = json.loads((src / "store_info.json").read_text(encoding="utf-8"))
    st = info.get("store") or {}
    print("■ 가게 정보(수집기)")
    for k, v in st.items():
        if v not in (None, "", [], {}):
            print(f"  {k}: {str(v)[:400]}")
    print(f"  memo: {info.get('memo') or '-'} · 수집 {info.get('collected_at', '?')} · 사진 수 {info.get('counts')}")
    own = [p["file"] for p in info.get("photos", []) if p.get("owner")]
    new = sorted((p["latest_rank"], p["file"]) for p in info.get("photos", []) if p.get("latest_rank"))
    print(f"  가게 계정이 올린 사진: {' '.join(own) if own else '없음'}")
    print(f"  최신 순서(앞이 최근): {' '.join(f for _, f in new[:15]) if new else '정보 없음'}")

    # 같은 가게가 이미 있는지 (이름 앞부분·전화번호)
    name = str(st.get("name") or folder)
    keys = {name.split()[0], folder.split()[0], re.sub(r"\D", "", str(st.get("phone") or ""))[-7:]} - {""}
    hits = []
    for f in ("docs/stores.md", "docs/todo.md"):
        for i, line in enumerate((root / f).read_text(encoding="utf-8").splitlines(), 1):
            if any(k in line.replace(" ", "") or k in line for k in keys):
                hits.append(f"  {f}:{i}: {line[:160]}")
    print("■ 이미 있는 가게인지: " + ("있음 ↓" if hits else "기록에 없음(새 가게)"))
    for h in hits[:8]:
        print(h)

    print("■ 모음 이미지")
    sheet(str(dst), str(work / "sheet.jpg"))
    shrink(str(dst), str(work / "menus"))
    menus = sorted(p.name for p in (work / "menus").iterdir())
    print("■ 메뉴판 읽기 명령(한 번에 5장 이하, 한 메시지에서 같이 실행)")
    for i in range(0, len(menus), 5):
        print(f'  cd .scratch/{shop}/menus && agy --mode plan -p "명령(command·터미널) 도구는 절대 쓰지 말고, 파일 보기 도구로만 {" ".join(menus[i:i + 5])} 를 읽어 메뉴 표(분류 | 한국어 이름 | 원문 | 가격 | 근거 사진)를 만들어 줘. 모르는 글자는 ?로. 답은 한국어로"')
    if not menus:
        print("  메뉴판 사진(menu_*)이 없음 — 모음 이미지에서 메뉴판을 찾아 본다")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # 창 없는 실행(cp949)에서 한글 출력으로 죽던 것(2026-10-29 구미관)
    if len(sys.argv) != 4 or sys.argv[1] not in ("sheet", "shrink", "prep"):
        sys.exit(__doc__)
    {"sheet": sheet, "shrink": shrink, "prep": prep}[sys.argv[1]](sys.argv[2], sys.argv[3])
