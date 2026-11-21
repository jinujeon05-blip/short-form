"""초록 배경 캐릭터 시트를 동작별 투명 그림으로 자르기.
사용: python tools/chroma-cut.py <시트.jpg> <출력 접두어>   → <접두어>-1.webp, -2.webp ...
Flow(Nano Banana)로 만든 '초록(#00FF00) 배경 + 여러 동작 나란히' 그림용. 새 프로그램 설치 없음(Pillow·numpy).
"""
import sys
import numpy as np
from PIL import Image

src, prefix = sys.argv[1], sys.argv[2]
a = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
# 초록이 빨강·파랑보다 얼마나 센가 → 클수록 배경
spill = g - np.maximum(r, b)
alpha = np.clip(1 - (spill - 30) / 60, 0, 1)          # 30 이하 = 사람, 90 이상 = 배경
# 가장자리 초록 번짐 빼기(초록을 빨강·파랑 중 큰 값까지 낮춤)
g2 = np.where(spill > 0, np.maximum(r, b) + np.minimum(spill, 0) , g)
out = np.dstack([r, np.minimum(g, g2), b, alpha * 255]).clip(0, 255).astype(np.uint8)

# 세로 열마다 사람이 있는지 보고, 비어 있는 열로 나눔
cols = (alpha > 0.5).sum(axis=0) > 3
parts, start = [], None
for x, on in enumerate(list(cols) + [False]):
    if on and start is None:
        start = x
    elif not on and start is not None:
        if x - start > 40:
            parts.append((start, x))
        start = None
# 너무 가까운 조각(손·서류가 떨어진 경우)은 합침
merged = []
for p in parts:
    if merged and p[0] - merged[-1][1] < 25:
        merged[-1] = (merged[-1][0], p[1])
    else:
        merged.append(p)

for i, (x1, x2) in enumerate(merged, 1):
    rows = np.where((alpha[:, x1:x2] > 0.5).sum(axis=1) > 2)[0]
    y1, y2 = max(rows[0] - 8, 0), min(rows[-1] + 8, alpha.shape[0])
    x1, x2 = max(x1 - 8, 0), min(x2 + 8, alpha.shape[1])
    im = Image.fromarray(out[y1:y2, x1:x2], 'RGBA')
    path = f'{prefix}-{i}.webp'
    im.save(path, 'WEBP', quality=92, method=6)
    print(path, im.size)
