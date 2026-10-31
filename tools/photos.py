#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""가게 사진 준비 (2026-10-29). 담당이 파일 쓰기 명령 없이 한 줄로 부르게 만든 도구.

  python tools/photos.py sheet  <사진폴더> <출력.jpg>   — 모든 사진(jpg·png·webp)을 번호 붙인 모음 이미지 한 장으로 (finder)
  python tools/photos.py shrink <사진폴더> <출력폴더>    — menu_*.* 를 긴 변 1600px jpg로 줄여 복사 (안티그래비티에 넘길 때)

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


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # 창 없는 실행(cp949)에서 한글 출력으로 죽던 것(2026-10-29 구미관)
    if len(sys.argv) != 4 or sys.argv[1] not in ("sheet", "shrink"):
        sys.exit(__doc__)
    (sheet if sys.argv[1] == "sheet" else shrink)(sys.argv[2], sys.argv[3])
