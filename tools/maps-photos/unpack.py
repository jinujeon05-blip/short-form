#!/usr/bin/env python3
"""클라우드 세션용: 사진 수집기 묶음(claude_bundle_*.zip)을 풀고 요약한다.

드라이브 download_file_content 결과가 큰 파일로 저장되면
(…/tool-results/mcp-Google_Drive-download_file_content-<숫자>.txt, JSON {content: base64})
그 경로를 그대로 넘긴다. 이미 받은 .zip 경로도 된다.

  python3 -I tools/maps-photos/unpack.py <출력폴더> <결과.txt|묶음.zip> [...]
"""
import base64
import io
import json
import sys
import zipfile
from pathlib import Path


def open_zip(path):
  p = Path(path)
  data = p.read_bytes()
  if data[:2] != b"PK":  # 드라이브 도구 결과(JSON 안의 base64)
    obj = json.loads(data)
    if isinstance(obj, list):  # [{type: text, text: "{...}"}] 형태로 저장될 때
      obj = json.loads(obj[0]["text"])
    data = base64.b64decode(obj["content"])
  return zipfile.ZipFile(io.BytesIO(data))


def main():
  if len(sys.argv) < 3:
    sys.exit(__doc__)
  out = Path(sys.argv[1])
  out.mkdir(parents=True, exist_ok=True)
  for src in sys.argv[2:]:
    with open_zip(src) as z:
      for name in z.namelist():
        if "/" in name or "\\" in name or name.startswith("."):
          continue  # 폴더 경로가 든 이름은 풀지 않는다
        (out / name).write_bytes(z.read(name))
      print(f"{src} → {len(z.namelist())}개")
  info = out / "store_info.json"
  if not info.is_file():
    sys.exit("store_info.json이 없어요.")
  m = json.loads(info.read_text("utf-8"))
  have = {p.name for p in out.glob("*.jpg")}
  lost = [p["file"] for p in m["photos"] if p["file"] not in have]
  s = m["store"]
  print(f"\n가게: {s.get('name')} | {s.get('category')} | 평점 {s.get('rating')}")
  print(f"주소: {s.get('address')}\n전화: {s.get('phone') or '없음'}\n영업: {s.get('hours') or '모름'}")
  print(f"지도: {s.get('maps_url')}\n메모: {m.get('memo') or '-'}")
  print(f"사진: {m['counts']} → {out}")
  owner = [p["file"] for p in m["photos"] if p["owner"]]
  print(f"가게 계정 사진: {', '.join(owner) or '없음'}")
  recent = sorted((p for p in m["photos"] if p["latest_rank"]), key=lambda p: p["latest_rank"])[:10]
  print("최신 탭 순서: " + ", ".join(p["file"] for p in recent))
  if lost:
    print(f"\n아직 안 받은 사진 {len(lost)}장 — 묶음 파일 {m['bundles']} 중 빠진 것을 더 받으세요.")


if __name__ == "__main__":
  main()
