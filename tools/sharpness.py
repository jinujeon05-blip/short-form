# 사진 선명도 점수(가장자리 분산). 줄마다 사진 경로를 받아 {경로: 점수} JSON을 낸다. tools/game-data.mjs 가 씀.
import sys, json
from PIL import Image, ImageFilter, ImageStat
out = {}
for p in sys.stdin.read().split('\n'):
    if not p: continue
    try:
        im = Image.open(p).convert('L').resize((320, 240))
        out[p] = round(ImageStat.Stat(im.filter(ImageFilter.FIND_EDGES)).var[0], 1)
    except Exception: out[p] = -1
print(json.dumps(out))
