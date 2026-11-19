# 슬라이드 PNG 모음 이미지: python investor/deck/sheet.py ko <출력.jpg> [시작번호] [끝번호]
import sys, glob
from PIL import Image
lang, out = sys.argv[1], sys.argv[2]
a = int(sys.argv[3]) if len(sys.argv) > 3 else 1
b = int(sys.argv[4]) if len(sys.argv) > 4 else 99
fs = sorted(glob.glob(f'investor/deck/out/{lang}-*.png'))[a - 1:b]
W, H = 800, 450; cols = 2; rows = (len(fs) + cols - 1) // cols
sh = Image.new('RGB', (W * cols, H * rows), 'white')
for i, f in enumerate(fs):
    sh.paste(Image.open(f).convert('RGB').resize((W, H)), ((i % cols) * W, (i // cols) * H))
sh.save(out, quality=85); print(len(fs))
