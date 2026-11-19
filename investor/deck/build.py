import sys
# 투자 제안서 슬라이드: 문구 파일 하나 → HTML(화면·PDF용) + PPTX
# 사용: python investor/deck/build.py ko   (저장소 루트에서)
# 결과: investor/deck/out/deck_<lang>.html · investor/QR메뉴판_투자제안서_<언어>.pptx
import json, sys, os, re, hashlib, html as H
from PIL import Image
from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.chart.data import CategoryChartData
from pptx.enum.chart import XL_CHART_TYPE, XL_LEGEND_POSITION, XL_LABEL_POSITION
from pptx.oxml.ns import qn

LANG = sys.argv[1] if len(sys.argv) > 1 else 'ko'
ROOT = os.getcwd()
DECK = os.path.join(ROOT, 'investor', 'deck')
GEN = os.path.join(DECK, 'img', 'gen')
OUT = os.path.join(DECK, 'out')
os.makedirs(GEN, exist_ok=True); os.makedirs(OUT, exist_ok=True)
C = json.load(open(os.path.join(DECK, f'content_{LANG}.json'), encoding='utf-8'))
FONT = C['font']
W, HH = 1280, 720

# 색 (짙은 먹색 + 고추색 + 초록)
INK = '1D2129'; SOFT = '5F6673'; MUTED = '8B919C'; LINE = 'E3E5EA'; BG2 = 'F4F5F7'
DARK = '15181F'; DARK2 = '232833'; ACC = 'E0552B'; ACC2 = 'F6E1D8'; GRN = '2F8F6B'; GRN2 = 'E2F2EA'; WHITE = 'FFFFFF'

# ---------- 그림 준비 ----------
def prep(src, w, h, focus='top'):
    """src를 w:h 비율로 잘라 2배 크기 jpg로 저장, 경로(저장소 기준) 반환"""
    p = os.path.join(ROOT, src)
    assert os.path.exists(p), src
    key = hashlib.md5(f'{src}|{w}|{h}|{focus}'.encode()).hexdigest()[:12]
    out = os.path.join(GEN, key + '.jpg')
    if not os.path.exists(out):
        im = Image.open(p).convert('RGB'); iw, ih = im.size; r = w / h
        if iw / ih > r:  # 가로가 넓음 → 양옆 자름
            nw = int(ih * r); x0 = (iw - nw) // 2; im = im.crop((x0, 0, x0 + nw, ih))
        else:
            nh = int(iw / r)
            y0 = 0 if focus == 'top' else (ih - nh) // 2
            im = im.crop((0, y0, iw, y0 + nh))
        im = im.resize((int(w * 2), int(h * 2)), Image.LANCZOS)
        im.save(out, quality=86)
    return out

# ---------- 요소 ----------
S = []  # slides: list of dict(bg, els)
def slide(bg=WHITE):
    s = {'bg': bg, 'els': []}; S.append(s); return s['els']
def rect(e, x, y, w, h, fill, r=0, line=None):
    e.append(dict(t='rect', x=x, y=y, w=w, h=h, fill=fill, r=r, line=line))
def text(e, x, y, w, h, s, size=20, color=INK, bold=False, align='l', va='t', lh=1.35):
    e.append(dict(t='text', x=x, y=y, w=w, h=h, s=s, size=size, color=color, bold=bold, align=align, va=va, lh=lh))
def img(e, x, y, w, h, src, r=0, frame=False, focus='top'):
    if frame:  # 폰 틀: 검은 테두리 8px
        rect(e, x, y, w, h, '111318', r=max(r, 22))
        x, y, w, h, r = x + 8, y + 8, w - 16, h - 16, max(r - 8, 14)
    e.append(dict(t='img', x=x, y=y, w=w, h=h, src=prep(src, w, h, focus), r=r))
def circ(e, x, y, d, fill, label, color=WHITE, size=16):
    e.append(dict(t='circ', x=x, y=y, d=d, fill=fill, label=label, color=color, size=size))
def chart(e, **k):
    k['t'] = 'chart'; e.append(k)
def table(e, **k):
    k['t'] = 'table'; e.append(k)

def kicker(e, s, x=72, y=58, color=ACC):
    text(e, x, y, 900, 26, s, size=15, color=color, bold=True)
def title(e, s, x=72, y=88, w=1100, color=INK, size=40):
    n = s.count('\n') + 1
    text(e, x, y, w, int(size * 1.3 * n) + 6, s, size=size, color=color, bold=True, lh=1.22)
    return y + int(size * 1.22 * n) + 10
def footer(e, n, dark=False, x=72):
    text(e, x, 680, 600, 20, C['footer'], size=11, color=('6F7685' if dark else MUTED))
    text(e, 1108, 680, 100, 20, str(n), size=11, color=('6F7685' if dark else MUTED), align='r')
def demo(name): return f'sales/img/demo-{name}.jpg'
def sign(name):
    for f in ('sign.jpg', 'hero.jpg'):
        p = f'restaurants/{name}/img/{f}'
        if os.path.exists(os.path.join(ROOT, p)): return p
    raise SystemExit('간판 사진 없음: ' + name)

# ---------- 슬라이드 종류 ----------
def s_cover(d, n):
    e = slide(DARK)
    text(e, 72, 70, 700, 24, d['kicker'], size=15, color='F0A486', bold=True)
    text(e, 72, 130, 640, 190, d['title'], size=56, color=WHITE, bold=True, lh=1.18)
    text(e, 72, 300, 600, 34, d['sub'], size=22, color='C9CDD6')
    for i, (a, b) in enumerate(d['stats']):
        x = 72 + i * 200
        text(e, x, 520, 190, 46, a, size=34, color=WHITE, bold=True)
        text(e, x, 566, 190, 44, b, size=14, color='A9AFBB', lh=1.3)
    ph = d['phones']
    img(e, 730, 150, 190, 385, ph[0], frame=True)
    img(e, 1050, 150, 190, 385, ph[2], frame=True)
    img(e, 875, 100, 220, 446, ph[1], frame=True)

def s_letter(d, n):
    e = slide(WHITE); kicker(e, d['kicker'])
    title(e, d['title'], size=40, w=700)
    y = 230
    for p in d['paras']:
        text(e, 72, y, 680, 110, p, size=19, color=SOFT, lh=1.6); y += 118
    text(e, 72, 600, 600, 30, d['sign'], size=19, color=INK, bold=True)
    rect(e, 860, 0, 420, 720, BG2)
    img(e, 930, 80, 270, 548, d['image'], frame=True)
    text(e, 860, 640, 420, 24, d['caption'], size=13, color=MUTED, align='c')
    footer(e, n)

def s_problem(d, n):
    e = slide(WHITE)
    img(e, 0, 0, 470, 720, d['image'], focus='center')
    kicker(e, d['kicker'], x=530)
    title(e, d['title'], x=530, w=700, size=40)
    for i, (h, t) in enumerate(d['items']):
        x = 530 + (i % 2) * 340; y = 250 + (i // 2) * 150
        circ(e, x, y, 40, ACC, str(i + 1), size=18)
        text(e, x + 54, y + 4, 270, 30, h, size=19, bold=True)
        text(e, x + 54, y + 38, 270, 90, t, size=15, color=SOFT, lh=1.5)
    rect(e, 530, 560, 680, 92, BG2, r=12)
    text(e, 554, 572, 636, 70, d['note'], size=14, color=SOFT, lh=1.5, va='m')
    footer(e, n, x=530)

def s_solution(d, n):
    e = slide(WHITE); kicker(e, d['kicker'])
    title(e, d['title'], size=44, w=520)
    text(e, 72, 222, 470, 60, d['lead'], size=18, color=SOFT, lh=1.5)
    for i, (h, t) in enumerate(d['points']):
        y = 330 + i * 100
        circ(e, 72, y, 40, INK, str(i + 1), size=18)
        text(e, 128, y + 2, 400, 30, h, size=19, bold=True)
        text(e, 128, y + 36, 400, 50, t, size=15, color=SOFT)
    img(e, 600, 70, 280, 606, d['image'], frame=True)
    for i, l in enumerate(d['langs']):
        y = 150 + i * 86
        rect(e, 930, y, 250, 62, ACC2 if i == 0 else BG2, r=31)
        text(e, 930, y, 250, 62, l, size=22, bold=True, color=ACC if i == 0 else INK, align='c', va='m')
    footer(e, n)

def s_product(d, n):
    e = slide(BG2); kicker(e, d['kicker']); title(e, d['title'], size=36)
    xs = [72, 312, 552]
    for i, (src, h, t) in enumerate(d['shots'][:3]):
        img(e, xs[i], 170, 210, 420, src, frame=True)
        text(e, xs[i], 600, 210, 26, h, size=17, bold=True, align='c')
        text(e, xs[i], 628, 210, 24, t, size=13, color=SOFT, align='c')
    src, h, t = d['shots'][3]
    img(e, 800, 200, 410, 300, src, r=14, focus='top')
    text(e, 800, 520, 410, 26, h, size=17, bold=True, align='c')
    text(e, 800, 548, 410, 24, t, size=13, color=SOFT, align='c')
    text(e, 800, 600, 410, 24, d['note'], size=11, color=MUTED, align='c')
    footer(e, n)

def s_market(d, n):
    e = slide(DARK)
    names = ['butumak', 'cheonguk', 'doya', 'eosusa', 'jinmi', 'jjajang', 'badasho', 'seoseo']
    for i, nm in enumerate(names):
        img(e, i * 160, 0, 160, 210, sign(nm), focus='center')
    rect(e, 0, 0, 1280, 210, DARK)  # 반투명 대신 아래에 따로 덮음(밑 참고)
    e[-1]['alpha'] = 55
    kicker(e, d['kicker'], y=240, color='F0A486')
    title(e, d['title'], y=270, size=38, color=WHITE)
    for i, (a, b, c) in enumerate(d['stats']):
        x = 72 + i * 285
        text(e, x, 404, 270, 68, a, size=46, color='F0A486', bold=True)
        text(e, x, 474, 260, 28, b, size=17, color=WHITE, bold=True)
        text(e, x, 504, 260, 26, c, size=14, color='A9AFBB')
    rect(e, 72, 560, 1136, 56, DARK2, r=10)
    text(e, 96, 560, 1090, 56, d['tail'], size=16, color=WHITE, va='m')
    text(e, 72, 628, 1136, 40, d['source'], size=10, color='7D8494', lh=1.4)
    footer(e, n, dark=True)

def s_traction(d, n):
    e = slide(WHITE); kicker(e, d['kicker'])
    text(e, 72, 92, 420, 40, d['title'], size=30, bold=True)
    text(e, 66, 142, 330, 166, d['big'], size=130, color=ACC, bold=True, lh=1.0)
    text(e, 76, 290, 300, 30, d['bigLabel'], size=20, bold=True)
    tot = sum(v for _, v in d['regions']); x = 72; cols = [ACC, INK, MUTED]
    for i, (nm, v) in enumerate(d['regions']):
        w = int(400 * v / tot); rect(e, x, 345, w - 3, 14, cols[i], r=7)
        text(e, x, 365, max(w, 60), 24, f'{nm} {v}', size=14, color=SOFT); x += w
    for i, (a, b) in enumerate(d['milestones']):
        y = 420 + i * 46
        circ(e, 72, y + 4, 16, ACC if i == 3 else INK, '', size=8)
        text(e, 100, y, 90, 26, a, size=15, bold=True)
        text(e, 190, y, 280, 26, b, size=15, color=SOFT)
    text(e, 72, 610, 420, 60, d['note'], size=13, color=SOFT, lh=1.5)
    for i, nm in enumerate(d['gallery']):
        x = 530 + (i % 6) * 115; y = 70 + (i // 6) * 300
        img(e, x, y, 105, 280, demo(nm), r=10)
    footer(e, n)

def s_signs(d, n):
    e = slide(DARK)
    for i, nm in enumerate(d['images']):
        x = (i % 6) * 214; y = (i // 6) * 240
        img(e, x, y, 212, 238, sign(nm), focus='center')
    rect(e, 0, 0, 1280, 720, DARK); e[-1]['alpha'] = 45
    rect(e, 290, 270, 700, 180, DARK, r=18); e[-1]['alpha'] = 15
    text(e, 290, 292, 700, 110, d['title'], size=36, color=WHITE, bold=True, align='c', lh=1.25)
    text(e, 290, 400, 700, 36, d['sub'], size=14, color='C9CDD6', align='c')
    footer(e, n, dark=True)

def s_why(d, n):
    e = slide(WHITE); kicker(e, d['kicker']); title(e, d['title'], size=36)
    for i, (h, t, src, cap) in enumerate(d['cols']):
        x = 72 + i * 384
        rect(e, x, 165, 360, 500, BG2, r=16)
        img(e, x + 95, 185, 170, 250, src, frame=True)
        circ(e, x + 24, 455, 34, ACC, str(i + 1), size=15)
        text(e, x + 68, 455, 280, 34, h, size=18, bold=True, va='m')
        text(e, x + 24, 500, 316, 130, t, size=14, color=SOFT, lh=1.55)
        text(e, x + 24, 628, 316, 22, cap, size=11, color=MUTED)
    footer(e, n)

def s_compare(d, n):
    e = slide(WHITE); kicker(e, d['kicker']); title(e, d['title'], size=36)
    mark = {0: '○', 1: '◐', 2: '●'}
    rows = [d['head']] + [[r[0]] + [mark[v] for v in r[1:]] for r in d['rows']]
    table(e, x=72, y=170, w=1136, cw=[280, 200, 200, 228, 228], rh=56, rows=rows, hl=4)
    text(e, 72, 570, 1136, 24, d['legend'], size=12, color=MUTED)
    rect(e, 72, 605, 1136, 56, GRN2, r=10)
    text(e, 96, 605, 1090, 56, d['note'], size=15, color=INK, va='m')
    footer(e, n)

def s_pricing(d, n):
    e = slide(WHITE); kicker(e, d['kicker']); title(e, d['title'], size=40)
    for i, (nm, price, unit, desc) in enumerate(d['cards']):
        x = 72 + i * 384; hl = i == d['highlight']
        rect(e, x, 175, 360, 300, DARK if hl else BG2, r=18)
        text(e, x + 32, 205, 300, 30, nm, size=20, bold=True, color=('F0A486' if hl else ACC))
        text(e, x + 32, 250, 300, 60, price, size=44, bold=True, color=(WHITE if hl else INK))
        text(e, x + 32, 312, 300, 26, unit, size=16, color=('C9CDD6' if hl else SOFT))
        text(e, x + 32, 370, 300, 80, desc, size=15, color=('C9CDD6' if hl else SOFT), lh=1.5)
    text(e, 72, 505, 1136, 28, d['extra'], size=16, color=INK, bold=True)
    text(e, 72, 545, 1136, 28, d['future'], size=15, color=SOFT)
    text(e, 72, 590, 1136, 24, d['note'], size=12, color=MUTED)
    footer(e, n)

def s_unit(d, n):
    e = slide(WHITE); kicker(e, d['kicker']); title(e, d['title'], size=36, w=760)
    text(e, 66, 230, 400, 140, d['big'], size=110, bold=True, color=ACC, lh=1.0)
    text(e, 76, 370, 360, 28, d['bigLabel'], size=17, color=SOFT)
    mx = max(v for _, v, _ in d['bars'])
    for i, (nm, v, lab) in enumerate(d['bars']):
        y = 240 + i * 90
        text(e, 520, y, 400, 26, nm, size=16, bold=True)
        w = int(470 * v / mx); rect(e, 520, y + 32, w, 34, ACC if i == 0 else 'B9BEC8', r=6)
        text(e, 520 + w + 12, y + 32, 160, 34, lab, size=16, bold=True, va='m')
    for i, (a, b) in enumerate(d['facts']):
        x = 520 + i * 230
        rect(e, x, 440, 210, 90, BG2, r=12)
        text(e, x + 20, 452, 180, 24, a, size=13, color=SOFT)
        text(e, x + 20, 480, 180, 36, b, size=22, bold=True)
    text(e, 72, 590, 1136, 60, d['note'], size=12, color=MUTED, lh=1.5)
    footer(e, n)

def s_sales(d, n):
    e = slide(WHITE); kicker(e, d['kicker']); title(e, d['title'], size=40, w=760)
    for i, (h, t) in enumerate(d['steps']):
        y = 190 + i * 92
        circ(e, 72, y, 46, ACC if i == 3 else INK, str(i + 1), size=19)
        text(e, 136, y, 560, 28, h, size=20, bold=True)
        text(e, 136, y + 32, 600, 50, t, size=15, color=SOFT)
    rect(e, 72, 568, 680, 100, GRN2, r=14)
    text(e, 96, 580, 640, 30, d['goal'], size=19, bold=True, color=GRN)
    text(e, 96, 612, 640, 50, d['goalSub'], size=13, color=INK, lh=1.45)
    img(e, 880, 70, 290, 600, d['image'], frame=True)
    footer(e, n)

def s_plan(d, n):
    e = slide(WHITE); kicker(e, d['kicker']); title(e, d['title'], size=36, w=760)
    chart(e, kind='bar', x=72, y=200, w=760, h=440, cats=d['cats'], series=d['series'], colors=[INK, ACC, 'C3C8D1'], unit=d['unit'])
    for i, (a, b) in enumerate(d['facts']):
        y = 200 + i * 104
        rect(e, 880, y, 328, 90, BG2 if i else ACC2, r=12)
        text(e, 904, y + 12, 300, 40, a, size=28, bold=True, color=ACC if i == 0 else INK)
        text(e, 904, y + 54, 300, 24, b, size=14, color=SOFT)
    text(e, 72, 650, 1136, 24, d['note'], size=11, color=MUTED)
    footer(e, n)

def s_scenario(d, n):
    e = slide(WHITE); kicker(e, d['kicker']); title(e, d['title'], size=40)
    rows = [[''] + d['cols']] + d['rows']
    table(e, x=72, y=170, w=1136, cw=[296, 280, 280, 280], rh=58, rows=rows, hl=2)
    rect(e, 72, 540, 1136, 110, ACC2, r=14)
    text(e, 100, 540, 1080, 110, d['warn'], size=16, color=INK, va='m', lh=1.55)
    footer(e, n)

def s_funds(d, n):
    e = slide(WHITE); kicker(e, d['kicker']); title(e, d['title'], size=40)
    chart(e, kind='donut', x=72, y=180, w=420, h=420, items=d['items'], colors=[INK, ACC, '4A5262', GRN, 'E8A33D', 'C3C8D1'], center=f"{sum(v for _, v in d['items']):,}", centerSub=d['unit'])
    tot = sum(v for _, v in d['items']); cols = [INK, ACC, '4A5262', GRN, 'E8A33D', 'C3C8D1']
    for i, (nm, v) in enumerate(d['items']):
        y = 190 + i * 44
        rect(e, 530, y + 6, 18, 18, cols[i], r=4)
        text(e, 562, y, 360, 30, nm, size=16)
        text(e, 900, y, 120, 30, f'{v:,}', size=16, bold=True, align='r')
        text(e, 1030, y, 70, 30, f'{round(v * 100 / tot)}%', size=15, color=SOFT, align='r')
    for i, (h, t) in enumerate(d['goals']):
        y = 470 + i * 84
        rect(e, 530, y, 678, 72, BG2, r=12)
        text(e, 552, y, 170, 72, h, size=16, bold=True, color=ACC, va='m')
        text(e, 720, y, 470, 72, t, size=14, color=INK, va='m', lh=1.45)
    text(e, 72, 640, 1136, 24, d['note'], size=12, color=MUTED)
    footer(e, n)

def s_deal(d, n):
    e = slide(WHITE); kicker(e, d['kicker']); title(e, d['title'], size=36)
    for i, (a, b) in enumerate(d['terms']):
        y = 165 + i * 60
        text(e, 72, y, 130, 50, a, size=15, bold=True, color=ACC)
        text(e, 205, y, 360, 50, b, size=15, color=INK, lh=1.4)
    text(e, 72, 480, 480, 26, d['valTitle'], size=16, bold=True)
    for i, (a, b) in enumerate(d['vals']):
        y = 514 + i * 40
        rect(e, 72, y, 480, 34, ACC2 if i == 1 else BG2, r=8)
        text(e, 90, y, 340, 34, a, size=14, va='m')
        text(e, 420, y, 115, 34, b, size=16, bold=True, align='r', va='m')
    text(e, 640, 165, 568, 26, d['retTitle'], size=16, bold=True)
    mx = max(v for _, v, _ in d['rets'])
    for i, (a, v, m) in enumerate(d['rets']):
        y = 205 + i * 78
        text(e, 640, y, 560, 24, a, size=14, color=SOFT)
        w = int(380 * v / mx); rect(e, 640, y + 28, w, 30, ACC if i == 2 else ('C3C8D1' if i == 0 else INK), r=6)
        text(e, 640 + w + 10, y + 28, 200, 30, f'{v}{d["retUnit"]} · {m}', size=14, bold=True, va='m')
    rect(e, 640, 535, 568, 105, BG2, r=12)
    text(e, 660, 535, 530, 105, d['note'], size=12, color=SOFT, va='m', lh=1.5)
    footer(e, n)

def s_roadmap(d, n):
    e = slide(WHITE)
    img(e, 0, 0, 1280, 250, d['image'], focus='center')
    rect(e, 0, 0, 1280, 250, DARK); e[-1]['alpha'] = 22
    kicker(e, d['kicker'], y=120, color='F6C1AC'); title(e, d['title'], y=150, size=42, color=WHITE)
    rect(e, 72, 333, 1136, 4, LINE)
    for i, (when, h, t) in enumerate(d['steps']):
        x = 72 + i * 290
        circ(e, x, 318, 34, ACC if i == 0 else INK, str(i + 1), size=15)
        text(e, x, 368, 270, 26, when, size=15, color=ACC, bold=True)
        text(e, x, 396, 270, 32, h, size=21, bold=True)
        text(e, x, 434, 260, 80, t, size=14, color=SOFT, lh=1.5)
    rect(e, 72, 545, 1136, 100, BG2, r=14)
    text(e, 100, 545, 1080, 100, d['vision'], size=17, color=INK, va='m', lh=1.6)
    footer(e, n)

def s_risk(d, n):
    e = slide(WHITE); kicker(e, d['kicker']); title(e, d['title'], size=36)
    for i, (h, t) in enumerate(d['items']):
        x = 72 + (i % 3) * 384; y = 170 + (i // 3) * 240
        rect(e, x, y, 360, 220, BG2, r=16)
        circ(e, x + 24, y + 24, 34, INK, str(i + 1), size=15)
        text(e, x + 24, y + 74, 312, 30, h, size=18, bold=True)
        text(e, x + 24, y + 110, 312, 100, t, size=14, color=SOFT, lh=1.55)
    footer(e, n)

def s_closing(d, n):
    e = slide(DARK)
    kicker(e, d['kicker'], color='F0A486')
    title(e, d['title'], size=40, color=WHITE)
    for i, (h, t) in enumerate(d['steps']):
        x = 72 + i * 384
        circ(e, x, 250, 40, ACC, str(i + 1), size=17)
        text(e, x, 304, 340, 30, h, size=20, bold=True, color=WHITE)
        text(e, x, 340, 330, 60, t, size=15, color='A9AFBB', lh=1.5)
    rect(e, 72, 450, 1136, 170, DARK2, r=16)
    text(e, 104, 472, 600, 24, d['contactTitle'], size=14, color='A9AFBB')
    text(e, 104, 500, 600, 40, 'QR MENU ASIA', size=28, bold=True, color=WHITE)
    for i, c in enumerate(d['contacts']):
        text(e, 104 + (0 if i == 0 else 0), 548 + i * 0, 0, 0, '', size=1)
    text(e, 560, 478, 620, 130, '\n'.join(d['contacts']), size=17, color=WHITE, lh=1.75, va='m')
    text(e, 72, 636, 1136, 26, d['disclaimer'], size=14, color='A9AFBB')

R = dict(cover=s_cover, letter=s_letter, problem=s_problem, solution=s_solution, product=s_product, market=s_market,
         traction=s_traction, signs=s_signs, why=s_why, compare=s_compare, pricing=s_pricing, unit=s_unit, sales=s_sales,
         plan=s_plan, scenario=s_scenario, funds=s_funds, deal=s_deal, roadmap=s_roadmap, risk=s_risk, closing=s_closing)
for i, d in enumerate(C['slides']):
    R[d['type']](d, i + 1)
for s in S:  # 빈 글자 상자 제거
    s['els'] = [x for x in s['els'] if not (x['t'] == 'text' and not x['s'])]

# ---------- HTML ----------
def rich(s):
    s = H.escape(s).replace('\n', '<br>')
    return re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
def hx(c): return '#' + c
def svg_bar(el):
    x0, y0, w, h = 50, 20, el['w'] - 60, el['h'] - 70
    import math
    mx = math.ceil(max(max(v) for _, v in el['series']) / 10) * 10; steps = mx // 10
    nc, ns = len(el['cats']), len(el['series']); gw = w / nc; bw = gw * 0.7 / ns
    out = [f'<svg width="{el["w"]}" height="{el["h"]}" viewBox="0 0 {el["w"]} {el["h"]}">']
    for k in range(steps + 1):
        v = 10 * k; yy = y0 + h - h * k / steps
        out.append(f'<line x1="{x0}" x2="{x0 + w}" y1="{yy:.1f}" y2="{yy:.1f}" stroke="#{LINE}"/>')
        out.append(f'<text x="{x0 - 8}" y="{yy + 4:.1f}" font-size="12" fill="#{MUTED}" text-anchor="end">{v:.0f}</text>')
    for ci, cat in enumerate(el['cats']):
        for si, (nm, vals) in enumerate(el['series']):
            v = vals[ci]; bh = h * v / mx; bx = x0 + gw * ci + gw * 0.15 + bw * si
            out.append(f'<rect x="{bx:.1f}" y="{y0 + h - bh:.1f}" width="{bw - 4:.1f}" height="{bh:.1f}" rx="3" fill="#{el["colors"][si]}"/>')
            out.append(f'<text x="{bx + (bw - 4) / 2:.1f}" y="{y0 + h - bh - 6:.1f}" font-size="13" font-weight="700" fill="#{INK}" text-anchor="middle">{v:.1f}</text>')
        out.append(f'<text x="{x0 + gw * ci + gw / 2:.1f}" y="{y0 + h + 24}" font-size="15" font-weight="700" fill="#{INK}" text-anchor="middle">{H.escape(cat)}</text>')
    lx = x0
    for si, (nm, _) in enumerate(el['series']):
        out.append(f'<rect x="{lx}" y="{el["h"] - 18}" width="12" height="12" rx="2" fill="#{el["colors"][si]}"/><text x="{lx + 18}" y="{el["h"] - 8}" font-size="13" fill="#{SOFT}">{H.escape(nm)}</text>')
        lx += 18 + len(nm) * 13 + 30
    out.append(f'<text x="{x0 + w}" y="{el["h"] - 8}" font-size="12" fill="#{MUTED}" text-anchor="end">{H.escape(el["unit"])}</text></svg>')
    return ''.join(out)
def svg_donut(el):
    import math
    cx = cy = el['w'] / 2; ro = el['w'] / 2 - 4; ri = ro * 0.58; tot = sum(v for _, v in el['items']); a = -math.pi / 2
    out = [f'<svg width="{el["w"]}" height="{el["h"]}" viewBox="0 0 {el["w"]} {el["h"]}">']
    for i, (_, v) in enumerate(el['items']):
        b = a + 2 * math.pi * v / tot; lg = 1 if b - a > math.pi else 0
        p = (f'M{cx + ro * math.cos(a):.1f},{cy + ro * math.sin(a):.1f} A{ro},{ro} 0 {lg} 1 {cx + ro * math.cos(b):.1f},{cy + ro * math.sin(b):.1f} '
             f'L{cx + ri * math.cos(b):.1f},{cy + ri * math.sin(b):.1f} A{ri},{ri} 0 {lg} 0 {cx + ri * math.cos(a):.1f},{cy + ri * math.sin(a):.1f} Z')
        out.append(f'<path d="{p}" fill="#{el["colors"][i]}" stroke="#fff" stroke-width="3"/>'); a = b
    out.append(f'<text x="{cx}" y="{cy + 6}" font-size="40" font-weight="700" fill="#{INK}" text-anchor="middle">{el["center"]}</text>')
    out.append(f'<text x="{cx}" y="{cy + 36}" font-size="15" fill="#{SOFT}" text-anchor="middle">{H.escape(el["centerSub"])}</text></svg>')
    return ''.join(out)
def html_table(el):
    out = ['<table class="tb">']
    for ri, row in enumerate(el['rows']):
        out.append('<tr>')
        for ci, c in enumerate(row):
            cls = []
            if ri == 0: cls.append('h')
            if ci == el['hl']: cls.append('hl')
            if ci == 0: cls.append('f')
            out.append(f'<td class="{" ".join(cls)}" style="width:{el["cw"][ci]}px;height:{el["rh"]}px">{H.escape(str(c))}</td>')
        out.append('</tr>')
    return ''.join(out) + '</table>'

def build_html():
    import base64  # 그림을 파일 안에 넣어 HTML 하나만 보내도 열리게
    rel = lambda p: 'data:image/jpeg;base64,' + base64.b64encode(open(p, 'rb').read()).decode()
    parts = []
    for s in S:
        els = []
        for el in s['els']:
            st = f'left:{el["x"]}px;top:{el["y"]}px;'
            if el['t'] == 'rect':
                op = f'opacity:{1 - el.get("alpha", 0) / 100 if "alpha" in el else 1};' if 'alpha' in el else ''
                els.append(f'<div class="r" style="{st}width:{el["w"]}px;height:{el["h"]}px;background:#{el["fill"]};border-radius:{el["r"]}px;{op}"></div>')
            elif el['t'] == 'text':
                jc = {'t': 'flex-start', 'm': 'center', 'b': 'flex-end'}[el['va']]
                ta = {'l': 'left', 'c': 'center', 'r': 'right'}[el['align']]
                els.append(f'<div class="x" style="{st}width:{el["w"]}px;height:{el["h"]}px;font-size:{el["size"]}px;line-height:{el["lh"]};color:#{el["color"]};font-weight:{700 if el["bold"] else 400};justify-content:{jc};text-align:{ta}"><span>{rich(el["s"])}</span></div>')
            elif el['t'] == 'img':
                els.append(f'<img class="i" style="{st}width:{el["w"]}px;height:{el["h"]}px;border-radius:{el["r"]}px" src="{rel(el["src"])}" alt="">')
            elif el['t'] == 'circ':
                els.append(f'<div class="c" style="{st}width:{el["d"]}px;height:{el["d"]}px;background:#{el["fill"]};color:#{el["color"]};font-size:{el["size"]}px">{H.escape(el["label"])}</div>')
            elif el['t'] == 'chart':
                svg = svg_bar(el) if el['kind'] == 'bar' else svg_donut(el)
                els.append(f'<div class="r" style="{st}width:{el["w"]}px;height:{el["h"]}px">{svg}</div>')
            elif el['t'] == 'table':
                els.append(f'<div class="r" style="{st}width:{el["w"]}px">{html_table(el)}</div>')
        parts.append(f'<section class="s" style="background:#{s["bg"]}">{"".join(els)}</section>')
    title_txt = H.escape(C['footer'])
    font_q = FONT.replace(' ', '+')
    return f'''<!doctype html>
<html lang="{LANG}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>{title_txt}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family={font_q}:wght@400;700&display=swap" rel="stylesheet">
<style>
@page {{ size: 1280px 720px; margin: 0; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html {{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
body {{ background: #2a2e37; font-family: "{FONT}", "Malgun Gothic", sans-serif; color: #{INK}; word-break: keep-all; overflow-wrap: break-word; }}
.wrap {{ padding: 24px 0; }}
.s {{ position: relative; width: 1280px; height: 720px; overflow: hidden; margin: 0 auto 24px; transform-origin: top left; }}
.r, .x, .i, .c {{ position: absolute; }}
.x {{ display: flex; flex-direction: column; letter-spacing: -0.01em; }}
.x b {{ font-weight: 700; }}
.i {{ object-fit: cover; display: block; }}
.c {{ border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; }}
.tb {{ border-collapse: collapse; width: 100%; font-size: 17px; }}
.tb td {{ border-bottom: 1px solid #{LINE}; text-align: center; padding: 0 10px; color: #{INK}; }}
.tb td.f {{ text-align: left; font-weight: 700; }}
.tb td.h {{ background: #{DARK}; color: #fff; font-weight: 700; font-size: 15px; }}
.tb td.hl {{ background: #{ACC2}; font-weight: 700; color: #{ACC}; }}
.tb td.h.hl {{ background: #{ACC}; color: #fff; }}
@media print {{ body {{ background: none; }} .wrap {{ padding: 0; }} .s {{ margin: 0; page-break-after: always; break-after: page; }} }}
@media screen and (max-width: 1300px) {{ .s {{ margin-left: 0; }} }}
</style></head><body><div class="wrap">{"".join(parts)}</div>
<script>
function fit(){{var w=Math.min(window.innerWidth,1280),k=w/1280;document.querySelectorAll('.s').forEach(function(s){{s.style.transform=k<1?'scale('+k+')':'';s.style.marginBottom=k<1?(24-720*(1-k))+'px':'24px';}});}}
if(!window.matchMedia('print').matches){{window.addEventListener('resize',fit);fit();}}
</script></body></html>'''

# ---------- PPTX ----------
EMU = 9525
def E(v): return Emu(int(v * EMU))
def rgb(c): return RGBColor.from_string(c)
def set_alpha(shape, alpha):  # alpha = 투명도 % (0~100)
    sf = shape.fill._xPr.find(qn('a:solidFill'))
    clr = sf[0]; a = clr.makeelement(qn('a:alpha'), {'val': str(int((100 - alpha) * 1000))}); clr.append(a)
def round_rect(sl, x, y, w, h, fill, r):
    shp = sl.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if r else MSO_SHAPE.RECTANGLE, E(x), E(y), E(w), E(h))
    if r: shp.adjustments[0] = min(0.5, r / min(w, h))
    shp.fill.solid(); shp.fill.fore_color.rgb = rgb(fill); shp.line.fill.background(); shp.shadow.inherit = False
    return shp
def add_runs(p, s, size, color, bold):
    p._p.get_or_add_pPr().set('eaLnBrk', '0')  # 한국어를 단어 단위로 줄바꿈
    for k, part in enumerate(re.split(r'(\*\*.+?\*\*)', s)):
        if not part: continue
        b = part.startswith('**')
        r = p.add_run(); r.text = part[2:-2] if b else part
        f = r.font; f.size = Pt(size); f.bold = bold or b; f.color.rgb = rgb(color); f.name = FONT
        rPr = r._r.get_or_add_rPr(); rPr.set('lang', {'ko': 'ko-KR', 'vi': 'vi-VN'}[LANG]); rPr.set('altLang', 'en-US'); ea = rPr.makeelement(qn('a:ea'), {'typeface': FONT}); rPr.append(ea)
def textbox(sl, el):
    tb = sl.shapes.add_textbox(E(el['x']), E(el['y']), E(el['w']), E(el['h']))
    tf = tb.text_frame; tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = {'t': MSO_ANCHOR.TOP, 'm': MSO_ANCHOR.MIDDLE, 'b': MSO_ANCHOR.BOTTOM}[el['va']]
    size = el['size'] * 0.75
    for i, line in enumerate(el['s'].split('\n')):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = {'l': PP_ALIGN.LEFT, 'c': PP_ALIGN.CENTER, 'r': PP_ALIGN.RIGHT}[el['align']]
        p.line_spacing = el['lh'] * 0.84
        add_runs(p, line, size, el['color'], el['bold'])
    return tb
def ppt_chart(sl, el):
    if el['kind'] == 'bar':
        cd = CategoryChartData(); cd.categories = el['cats']
        for nm, vals in el['series']: cd.add_series(nm, vals)
        gf = sl.shapes.add_chart(XL_CHART_TYPE.COLUMN_CLUSTERED, E(el['x']), E(el['y']), E(el['w']), E(el['h']), cd); ch = gf.chart
        ch.has_legend = True; ch.legend.position = XL_LEGEND_POSITION.BOTTOM; ch.legend.include_in_layout = False
        ch.legend.font.size = Pt(10); ch.legend.font.name = FONT
        for i, s in enumerate(ch.series):
            s.format.fill.solid(); s.format.fill.fore_color.rgb = rgb(el['colors'][i])
            s.data_labels.show_value = True; s.data_labels.number_format = '0.0'; s.data_labels.number_format_is_linked = False
            s.data_labels.font.size = Pt(10); s.data_labels.font.bold = True; s.data_labels.font.name = FONT
            s.data_labels.position = XL_LABEL_POSITION.OUTSIDE_END
        ca = ch.category_axis; ca.tick_labels.font.size = Pt(11); ca.tick_labels.font.bold = True; ca.tick_labels.font.name = FONT
        ca.format.line.color.rgb = rgb(LINE)
        va = ch.value_axis; va.tick_labels.font.size = Pt(9); va.tick_labels.font.color.rgb = rgb(MUTED); va.tick_labels.font.name = FONT
        va.major_gridlines.format.line.color.rgb = rgb(LINE); va.format.line.fill.background()
        ch.plots[0].gap_width = 60; ch.plots[0].overlap = -10
        ch.has_title = True; ch.chart_title.text_frame.text = el['unit']
        tp = ch.chart_title.text_frame.paragraphs[0]; tp.font.size = Pt(10); tp.font.color.rgb = rgb(MUTED); tp.font.name = FONT; tp.font.bold = False
    else:
        cd = CategoryChartData(); cd.categories = [n for n, _ in el['items']]; cd.add_series('', [v for _, v in el['items']])
        gf = sl.shapes.add_chart(XL_CHART_TYPE.DOUGHNUT, E(el['x']), E(el['y']), E(el['w']), E(el['h']), cd); ch = gf.chart
        ch.has_legend = False
        pts = ch.plots[0].series[0].points
        for i in range(len(el['items'])):
            pts[i].format.fill.solid(); pts[i].format.fill.fore_color.rgb = rgb(el['colors'][i])
            pts[i].format.line.color.rgb = rgb(WHITE)
        hs = ch.plots[0]._element.find(qn('c:holeSize'))
        if hs is not None: hs.set('val', '58')
        textbox(sl, dict(x=el['x'], y=el['y'] + el['h'] / 2 - 34, w=el['w'], h=44, s=el['center'], size=40, color=INK, bold=True, align='c', va='m', lh=1.0))
        textbox(sl, dict(x=el['x'], y=el['y'] + el['h'] / 2 + 12, w=el['w'], h=24, s=el['centerSub'], size=15, color=SOFT, bold=False, align='c', va='m', lh=1.0))
def ppt_table(sl, el):
    rows = el['rows']; nr, nc = len(rows), len(rows[0])
    gf = sl.shapes.add_table(nr, nc, E(el['x']), E(el['y']), E(el['w']), E(el['rh'] * nr)); tb = gf.table
    tblPr = gf._element.graphic.graphicData.tbl.tblPr
    sid = tblPr.find(qn('a:tableStyleId'))
    if sid is not None: sid.text = '{5940675A-B579-460E-94D1-54222C63F5DA}'  # 스타일 없음·격자 없음
    tblPr.set('firstRow', '0'); tblPr.set('bandRow', '0')
    for ci, w in enumerate(el['cw']): tb.columns[ci].width = E(w)
    for ri in range(nr):
        tb.rows[ri].height = E(el['rh'])
        for ci in range(nc):
            cell = tb.cell(ri, ci); cell.margin_left = cell.margin_right = E(10); cell.margin_top = cell.margin_bottom = 0
            cell.vertical_anchor = MSO_ANCHOR.MIDDLE
            head = ri == 0; hl = ci == el['hl']
            fill = (ACC if hl else DARK) if head else (ACC2 if hl else WHITE)
            cell.fill.solid(); cell.fill.fore_color.rgb = rgb(fill)
            color = WHITE if head else (ACC if hl else INK)
            tf = cell.text_frame; p = tf.paragraphs[0]; p.alignment = PP_ALIGN.LEFT if ci == 0 else PP_ALIGN.CENTER
            add_runs(p, str(rows[ri][ci]), 11.5 if head else 13, color, head or hl or ci == 0)
            # 아래쪽 선만
            tcPr = cell._tc.get_or_add_tcPr()
            for tag in ('a:lnL', 'a:lnR', 'a:lnT'):
                ln = tcPr.makeelement(qn(tag), {'w': '0'}); ln.append(ln.makeelement(qn('a:noFill'), {})); tcPr.append(ln)
            ln = tcPr.makeelement(qn('a:lnB'), {'w': '9525'}); sf = ln.makeelement(qn('a:solidFill'), {})
            sf.append(sf.makeelement(qn('a:srgbClr'), {'val': LINE})); ln.append(sf); tcPr.append(ln)

def build_pptx(path):
    prs = Presentation(); prs.slide_width = E(W); prs.slide_height = E(HH)
    blank = prs.slide_layouts[6]
    for s in S:
        sl = prs.slides.add_slide(blank)
        bg = sl.background.fill; bg.solid(); bg.fore_color.rgb = rgb(s['bg'])
        for el in s['els']:
            if el['t'] == 'rect':
                shp = round_rect(sl, el['x'], el['y'], el['w'], el['h'], el['fill'], el['r'])
                if 'alpha' in el: set_alpha(shp, el['alpha'])
            elif el['t'] == 'text': textbox(sl, el)
            elif el['t'] == 'img':
                pic = sl.shapes.add_picture(el['src'], E(el['x']), E(el['y']), E(el['w']), E(el['h']))
                if el['r']:
                    sp = pic._element.spPr; pg = sp.find(qn('a:prstGeom'))
                    pg.set('prst', 'roundRect'); av = pg.find(qn('a:avLst'))
                    gd = av.makeelement(qn('a:gd'), {'name': 'adj', 'fmla': f'val {int(min(50000, el["r"] / min(el["w"], el["h"]) * 100000))}'}); av.append(gd)
            elif el['t'] == 'circ':
                shp = sl.shapes.add_shape(MSO_SHAPE.OVAL, E(el['x']), E(el['y']), E(el['d']), E(el['d']))
                shp.fill.solid(); shp.fill.fore_color.rgb = rgb(el['fill']); shp.line.fill.background(); shp.shadow.inherit = False
                if el['label']:
                    tf = shp.text_frame; tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
                    tf.vertical_anchor = MSO_ANCHOR.MIDDLE; p = tf.paragraphs[0]; p.alignment = PP_ALIGN.CENTER
                    add_runs(p, el['label'], el['size'] * 0.75, el['color'], True)
            elif el['t'] == 'chart': ppt_chart(sl, el)
            elif el['t'] == 'table': ppt_table(sl, el)
    prs.core_properties.title = C['footer']; prs.core_properties.author = 'QR MENU ASIA'
    prs.save(path)

NAME = {'ko': '한국어', 'vi': '베트남어'}[LANG]
hp = os.path.join(OUT, f'deck_{LANG}.html'); open(hp, 'w', encoding='utf-8').write(build_html())
import shutil; shutil.copy(hp, os.path.join(ROOT, 'investor', f'QR메뉴판_투자제안서_{NAME}.html')); print('HTML', hp)
pp = os.path.join(ROOT, 'investor', f'QR메뉴판_투자제안서_{NAME}.pptx')
try:
    build_pptx(pp); print('PPTX', pp)
except PermissionError:
    sys.exit('PPTX 저장 실패: PowerPoint에서 파일을 닫고 다시 돌리세요 → ' + pp)
print('슬라이드', len(S))
