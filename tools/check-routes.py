"""사무실 동선 점검: 걷는 길이 화분 바닥·가구 칸을 지나가는지 본다.
사용: python tools/check-routes.py [--draw 출력.jpg]
routes.js 의 OFFICE 값을 읽어 길을 2px 간격으로 따라가며, 발 위치가 화분 상자(+여유 12px) 또는 가구 상자 안이면 실패.
--draw 는 빈 사무실 위에 화분(빨강)·가구(회색)·길(초록)을 그려 눈으로 확인하게 한다.
"""
import json
import re
import sys

ROOT = 'dashboard/static/rooms/new/'
src = re.sub(r'//[^\n]*', '', open(ROOT + 'routes.js', encoding='utf-8').read())


def grab(name):
    m = re.search(name + r':\s*(\[.*?\]\s*\]|\{.*?\}\s*\})', src, re.S)
    return json.loads(re.sub(r'//[^\n]*', '', m.group(1)).replace("'", '"'))


plants = grab('PLANTS')
blocks = grab('BLOCKS')
routes_txt = re.search(r'ROUTES:\s*\{(.*?)\n  \}', src, re.S).group(1)
routes = {k: json.loads(p) for k, p in re.findall(r'(\w+):\s*\{[^}]*path:\s*(\[\[.*?\]\])', routes_txt)}
MARGIN = 8  # 발(바닥 닿는 점)과 화분 바닥 사이 최소 여유
bad = 0
for who, path in routes.items():
    hits = set()
    near = 9e9
    for (x1, y1), (x2, y2) in zip(path, path[1:]):
        n = max(int(max(abs(x2 - x1), abs(y2 - y1)) / 2), 1)
        for i in range(n + 1):
            x = x1 + (x2 - x1) * i / n
            y = y1 + (y2 - y1) * i / n
            for j, (a, b, c, d) in enumerate(plants):
                dx = max(a - x, 0, x - c)
                dy = max(b - y, 0, y - d)
                dist = (dx * dx + dy * dy) ** .5
                near = min(near, dist)
                if dist < MARGIN:
                    hits.add(f'화분{j + 1}')
            for j, (a, b, c, d) in enumerate(blocks):
                if a < x < c and b < y < d:
                    hits.add(f'가구{j + 1}')
    ok = not hits
    bad += not ok
    print(('통과' if ok else '실패'), who, f'화분까지 가장 가까운 거리 {near:.0f}px', '' if ok else sorted(hits))

if '--draw' in sys.argv:
    from PIL import Image, ImageDraw
    im = Image.open(ROOT + 'empty-a.jpg').convert('RGB')
    d = ImageDraw.Draw(im, 'RGBA')
    for b in blocks:
        d.rectangle(b, fill=(80, 80, 80, 60), outline=(60, 60, 60, 200), width=3)
    for p in plants:
        d.rectangle([p[0] - MARGIN, p[1] - MARGIN, p[2] + MARGIN, p[3] + MARGIN], fill=(255, 0, 0, 110))
    for who, path in routes.items():
        d.line([tuple(p) for p in path], fill=(0, 200, 0, 255), width=8)
        for p in path:
            d.ellipse([p[0] - 10, p[1] - 10, p[0] + 10, p[1] + 10], fill=(0, 120, 0, 255))
    im.resize((1376, 768)).save(sys.argv[sys.argv.index('--draw') + 1], quality=88)
sys.exit(1 if bad else 0)
