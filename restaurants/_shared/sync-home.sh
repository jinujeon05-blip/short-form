#!/bin/sh
# 메뉴판 왼쪽 위 "QR MENU" 로고(가게 찾기로 이동) 원본(_shared/qr-home.js·qr-mark.png)을 모든 가게 폴더에 복사하고, lang-menu.js 바로 다음에 넣는다.
# 모든 메뉴판(정식·가게 찾기용)에 넣는다. 새 가게를 만들면 SHOPS에 추가한다.
cd "$(dirname "$0")/.." || exit 1
SHOPS="$(grep '^SHOPS=' _shared/sync-lang.sh | head -1 | sed 's/^SHOPS="//; s/"$//')"
for s in $SHOPS; do
  cp _shared/qr-home.js _shared/qr-mark.png "$s/"
  grep -q 'src="qr-home.js"' "$s/index.html" || sed -i 's#<script src="lang-menu.js"></script>#<script src="lang-menu.js"></script>\n<script src="qr-home.js"></script>#' "$s/index.html"
  grep -q 'src="qr-home.js"' "$s/index.html" || echo "!! $s: lang-menu.js 줄을 못 찾음"
  echo "synced $s"
done
