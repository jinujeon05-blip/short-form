# 그림 속 QR 읽기 확인: python tools/qr-img-check.py <기대 주소> <그림.png> [...]
# SNS 이미지·QR 카드(디자인 틀, tools/promo-designs.mjs)가 사진·장식 위에서도 QR이 읽히는지 본다.
# OpenCV(cv2)가 없으면 '건너뜀'만 출력하고 통과시킨다(설치하지 않음). 읽히지 않거나 주소가 다르면 종료 코드 1.
import sys
try:
    import cv2
except ImportError:
    print('QR 그림 확인 건너뜀(OpenCV 없음)'); sys.exit(0)
want, files = sys.argv[1], sys.argv[2:]
det, bad = cv2.QRCodeDetector(), 0
for f in files:
    im = cv2.imread(f)
    txt = det.detectAndDecode(im)[0] if im is not None else ''
    if not txt and im is not None:
        h, w = im.shape[:2]; s = 1000 / max(h, w)
        txt = det.detectAndDecode(cv2.resize(im, (int(w * s), int(h * s))))[0]
    ok = txt == want
    bad += not ok
    print(f"QR {'읽힘' if ok else '안 읽힘!'} {f.replace(chr(92), '/').split('/')[-1]}{'' if ok else ' → ' + (txt or '못 읽음')}")
sys.exit(1 if bad else 0)
