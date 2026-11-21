"""대화방 프로필 얼굴 사진 만들기(256×256).
사용: python tools/office-faces.py
- 팀원 8명: 걷기 그림(투명, walk-*.webp) 맨 위 머리를 찾아 정사각형으로 자름
- 캡틴: 9명 엄지척 그림(all-ok.jpg)의 캡틴 자리, 비서실장: 4동작 시트 첫 그림(chief-1.webp)
머리 찾기: 위에서부터 불투명한 줄을 훑어 머리 폭(위 7% 줄들의 너비 중간값)과 중심을 잡는다.
결과: dashboard/static/rooms/new/faces/<자리>.webp + faces-sheet.jpg(확인용)
"""
import numpy as np
from PIL import Image

N = 'dashboard/static/rooms/new/'
WHO = {
    'visual': 'walk-a-1', 'menu': 'walk-a-2', 'reader': 'walk-a-3', 'codex': 'walk-a-4',
    'auditor': 'walk-b-1', 'trans': 'walk-b-2', 'staffing': 'walk-b-3', 'sorting': 'walk-b-4',
    'chief': 'chief-1',
}
BG = (238, 242, 247)


def face_from_sprite(path, size=256):
    im = Image.open(path).convert('RGBA')
    a = np.asarray(im)[..., 3] > 128
    rows = np.where(a.any(axis=1))[0]
    top = rows[0]
    H = rows[-1] - top
    band = a[top: top + int(H * 0.09)]               # 머리 부분(키의 약 9%)
    xs = [np.where(r)[0] for r in band if r.any()]
    lefts = np.array([x[0] for x in xs]); rights = np.array([x[-1] for x in xs])
    cx = int(np.median((lefts + rights) / 2))
    w = int(np.median(rights - lefts))
    side = int(max(w * 1.9, H * 0.15))                # 머리+어깨 조금
    x1 = cx - side // 2
    y1 = top - int(side * 0.08)
    crop = im.crop((x1, y1, x1 + side, y1 + side))
    bg = Image.new('RGBA', crop.size, BG + (255,))
    bg.alpha_composite(crop)
    return bg.convert('RGB').resize((size, size), Image.LANCZOS)


def main():
    import os
    os.makedirs(N + 'faces', exist_ok=True)
    out = {}
    for k, f in WHO.items():
        out[k] = face_from_sprite(N + f + '.webp')
    # 캡틴: all-ok.jpg 캡틴 얼굴(원본 좌표, 2026-11-21 측정)
    cap = Image.open(N + 'all-ok.jpg').convert('RGB').crop((1326, 8, 1436, 118))
    out['captain'] = cap.resize((256, 256), Image.LANCZOS)
    sheet = Image.new('RGB', (256 * 5 + 60, 256 * 2 + 30), (40, 40, 40))
    for i, (k, im) in enumerate(out.items()):
        im.save(f'{N}faces/{k}.webp', 'WEBP', quality=90)
        sheet.paste(im, (10 + (i % 5) * 266, 10 + (i // 5) * 266))
    sheet.save(N + 'faces-sheet.jpg', quality=88)
    print('얼굴', len(out), '장:', ', '.join(out))


if __name__ == '__main__':
    main()
