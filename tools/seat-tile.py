"""빈 사무실 그림과 '사람을 넣은' 편집본에서 자리 조각(사람 부분만)을 잘라 내기.
사용:
  python tools/seat-tile.py <빈.jpg> <편집본.jpg> <x1> <y1> <x2> <y2> <출력.webp>   (한 장)
  python tools/seat-tile.py --build                                              (사무실 전체: 아래 SEATS 표)
Flow 편집은 나머지를 거의 그대로 두므로, 상자 안에서 '빈 그림과 달라진 곳(=사람)'만 부드럽게 남긴다.
상자가 겹치는 자리(캡틴 바로 앞 비서실장 등)도 사람 부분만 칠해져 서로 가리지 않는다.
--build 는 dashboard/static/rooms/new/tiles/*.webp 와 tiles.js(화면 % 좌표)를 만든다.
"""
import json
import sys
import numpy as np
from PIL import Image, ImageFilter

N = 'dashboard/static/rooms/new/'


def tile(empty, edited, box, out, thr=28, grow=25, soft=10):
    E = Image.open(empty).convert('RGB')
    A = Image.open(edited).convert('RGB')
    assert E.size == A.size, f'크기가 다름: {E.size} vs {A.size}'
    W, H = E.size
    x1, y1, x2, y2 = box
    e = np.asarray(E.crop(box), np.float32)
    a = np.asarray(A.crop(box), np.float32)
    d = (np.abs(a - e).max(axis=2) > thr).astype(np.uint8) * 255
    m = Image.fromarray(d).filter(ImageFilter.MedianFilter(5))          # 잔무늬 지우기
    m = m.filter(ImageFilter.MaxFilter(grow | 1))                         # 사람 둘레를 조금 넓힘
    m = m.filter(ImageFilter.GaussianBlur(soft))                          # 가장자리 부드럽게
    # 상자 테두리 12px 는 항상 투명으로 서서히
    edge = Image.new('L', m.size, 0)
    edge.paste(255, (12, 12, m.width - 12, m.height - 12))
    edge = edge.filter(ImageFilter.GaussianBlur(6))
    alpha = (np.asarray(m, np.float32) * np.asarray(edge, np.float32) / 255).astype(np.uint8)
    t = A.crop(box)
    t.putalpha(Image.fromarray(alpha))
    t.save(out, 'WEBP', quality=90, method=6)
    return {'left': round(x1 / W * 100, 3), 'top': round(y1 / H * 100, 3), 'width': round((x2 - x1) / W * 100, 3)}


# 자리 상자(원본 2752×1536 좌표) — 2026-11-21 all-work.jpg 와 빈 그림 차이로 잼
SEATS = {
    'captain':  (1220, 0, 1540, 300),
    'chief':    (1190, 150, 1530, 450),
    'visual':   (300, 560, 700, 880),     # 시각 정보 비서(미디어 관제실)
    'menu':     (950, 560, 1325, 880),    # 메뉴 검사관
    'reader':   (1325, 560, 1700, 880),   # 자료 해석 비서
    'codex':    (1800, 560, 2150, 880),   # 운영 감찰관
    'auditor':  (2150, 560, 2510, 880),   # 데이터 감사관
    'trans':    (330, 960, 740, 1350),    # 수석 번역관
    'staffing': (1190, 960, 1530, 1330),  # 인력 공급팀
    'sorting':  (1950, 940, 2310, 1330),  # 선별팀
}
# 상태별 원본 그림: 9명은 한 장에 다 들어 있고, 비서실장은 따로 만든 그림
SRC = {
    'idle': 'all-idle.jpg', 'work': 'all-work.jpg', 'ok': 'all-ok.jpg',
}
CHIEF = {'idle': 'seat-x2.jpg', 'work': 'seat-x2.jpg', 'ok': 'seat-x1.jpg'}


def build():
    import os
    os.makedirs(N + 'tiles', exist_ok=True)
    pos = {}
    for seat, box in SEATS.items():
        for st in ('idle', 'work', 'ok'):
            src = CHIEF[st] if seat == 'chief' else SRC[st]
            out = f'{N}tiles/{seat}-{st}.webp'
            pos[seat] = tile(N + 'empty-a.jpg', N + src, box, out)
    # 비서실장이 캡틴에게 서류를 건네는 장면(캡틴·비서실장 자리를 함께 덮음)
    pos['handoff'] = tile(N + 'empty-a.jpg', N + 'handoff.jpg', (1150, 0, 1600, 540), f'{N}tiles/handoff.webp')
    open(N + 'tiles.js', 'w', encoding='utf-8').write('window.TILE_POS=' + json.dumps(pos, ensure_ascii=False) + ';\n')
    print(json.dumps(pos, ensure_ascii=False))


if __name__ == '__main__':
    if sys.argv[1:] == ['--build']:
        build()
    else:
        e, a = sys.argv[1], sys.argv[2]
        print(tile(e, a, tuple(map(int, sys.argv[3:7])), sys.argv[7]))
