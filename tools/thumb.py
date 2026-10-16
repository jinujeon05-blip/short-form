# 카탈로그 페이지 그림에서 제품 사진 잘라내기 (3:4, 빈 곳은 배경을 흐리게 늘려 채움)
# 사용법: python3 -I tools/thumb.py <페이지.png> <x0> <y0> <x1> <y1> <출력.jpg>
# 페이지 그림은 pdftoppm -r 160 -png -f N -l N 카탈로그.pdf out 로 만든다. 좌표는 그 그림의 픽셀.
import sys
from PIL import Image, ImageFilter, ImageDraw
src, x0, y0, x1, y1, out = sys.argv[1], *map(int, sys.argv[2:6]), sys.argv[6]
c = Image.open(src).convert('RGB').crop((x0, y0, x1, y1)); w, h = c.size
W, H = (int(h * 0.75), h) if w / h < 0.75 else (w, int(w / 0.75))
bg = c.resize((W, H)).filter(ImageFilter.GaussianBlur(max(W, H) // 10))
f = max(8, min(w, h) // 14); m = Image.new('L', (w, h), 0)
ImageDraw.Draw(m).rectangle((0 if W == w else f, 0 if H == h else f, w if W == w else w - f, h if H == h else h - f), fill=255)
bg.paste(c, ((W - w) // 2, (H - h) // 2), m.filter(ImageFilter.GaussianBlur(f / 2)))
bg.resize((360, 480), Image.LANCZOS).save(out, quality=84)
print('완료', out)
