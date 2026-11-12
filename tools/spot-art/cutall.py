# 제미나이로 만든 스티커 시트 9장에서 음식 50가지를 하나씩 잘라 투명 배경 그림(webp)으로 저장한다.
# 실행: python cutall.py  (이 폴더에서) → cut2/*.webp, cut2/_check1.jpg·_check2.jpg, cut2/manifest.json
import os, json
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

SHEETS = [  # 파일, 가로 칸, 세로 칸, 이름(왼쪽 위부터 가로로)
    ('g06.jpg', 2, 2, 'grill,ssam,stew,egg'),
    ('g01.jpg', 2, 2, 'naeng,rice,kimchi,paj'),
    ('g02.jpg', 3, 2, 'soju,beer,mug,glass,spoon,chop'),
    ('g03.jpg', 3, 2, 'jang,garlic,gchili,rchili,tongs,scissors'),
    ('g04.jpg', 3, 2, 'tteok,pajeon,japchae,mandu,gimbap,sundae'),
    ('g05.jpg', 3, 2, 'jjajang,jjamppong,tangsu,kimchijjigae,bibimbap,chicken'),
    ('g07.jpg', 3, 2, 'bulgogi,gukbap,friedrice,kalguksu,gyeranmari,bossam'),
    ('g08.jpg', 3, 2, 'kimchijeon,dakgalbi,galbitang,bibimnaeng,yukgaejang,eomuk'),
    ('g09.jpg', 3, 2, 'sundubu,dubukimchi,fish,jjimdak,jeon,oikimchi'),
]
OUT = 'cut2'; MAXSIDE = 360
os.makedirs(OUT, exist_ok=True)
manifest, sprites = {}, []
for src, cols, rows, names in SHEETS:
    names = names.split(',')
    im = Image.open(src).convert('RGB')
    a = np.asarray(im).astype(np.int16)
    mn, mx = a.min(axis=2), a.max(axis=2)
    light = (mn > 205) & ((mx - mn) < 26)            # 밝은 무채색 = 배경
    lab, n = ndi.label(light)
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    fg = ~np.isin(lab, list(edge))
    fg = ndi.binary_opening(fg, iterations=1)
    lab2, n2 = ndi.label(fg)
    H, W = fg.shape; cw, ch = W / cols, H / rows
    sizes = ndi.sum(fg, lab2, range(1, n2 + 1)); objs = ndi.find_objects(lab2)
    for idx, nm in enumerate(names):
        r, c = divmod(idx, cols)
        best, bs = None, 0
        for i, sl in enumerate(objs):
            cy, cx = (sl[0].start + sl[0].stop) / 2, (sl[1].start + sl[1].stop) / 2
            if c * cw <= cx < (c + 1) * cw and r * ch <= cy < (r + 1) * ch and sizes[i] > bs:
                best, bs = i, sizes[i]
        if best is None:
            print('MISSING', src, nm); continue
        sl = objs[best]; y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
        m = ndi.binary_fill_holes(lab2[y0:y1, x0:x1] == best + 1)
        out = Image.fromarray(np.asarray(im)[y0:y1, x0:x1]).convert('RGBA')
        out.putalpha(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.9)))
        canvas = Image.new('RGBA', (out.width + 6, out.height + 6), (0, 0, 0, 0)); canvas.paste(out, (3, 3))
        if max(canvas.size) > MAXSIDE:
            k = MAXSIDE / max(canvas.size)
            canvas = canvas.resize((round(canvas.width * k), round(canvas.height * k)), Image.LANCZOS)
        canvas.save(os.path.join(OUT, nm + '.webp'), 'WEBP', quality=88, method=6)
        manifest[nm] = round(canvas.height / canvas.width, 2)
        sprites.append((nm, canvas, (x1 - x0, y1 - y0)))
        print(src, nm, (x1 - x0, y1 - y0))
json.dump(manifest, open(os.path.join(OUT, 'manifest.json'), 'w'))
# 확인용 모음 그림 (나무색 바탕), 25개씩 2장
tw = 180
for part in range(2):
    sp = sprites[part * 25:(part + 1) * 25]
    chk = Image.new('RGB', (tw * 5, tw * 5), (176, 120, 68))
    for i, (nm, s, _) in enumerate(sp):
        t = s.copy(); t.thumbnail((tw - 14, tw - 14))
        chk.paste(t, ((i % 5) * tw + (tw - t.width) // 2, (i // 5) * tw + (tw - t.height) // 2), t)
    chk.save(os.path.join(OUT, '_check%d.jpg' % (part + 1)), quality=82)
# 식탁 배경
bg = Image.open('g10.jpg').convert('RGB').resize((1080, 900), Image.LANCZOS)
bg.save(os.path.join(OUT, 'table.jpg'), quality=80, optimize=True)
print(len(sprites), 'sprites', sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT) if f.endswith('.webp')) // 1024, 'KB', os.path.getsize(os.path.join(OUT, 'table.jpg')) // 1024, 'KB bg')
print(json.dumps(manifest))
