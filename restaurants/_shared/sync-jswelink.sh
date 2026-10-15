#!/bin/sh
# JS welink 배너 원본(_shared)을 배너를 넣는 가게 폴더에 복사한다. 가게를 추가·제외하면 SHOPS만 고친다.
cd "$(dirname "$0")/.." || exit 1
SHOPS="baekcheon"
for s in $SHOPS; do
  cp _shared/jswelink.js _shared/jswelink-logo.png "$s/"
  grep -q 'src="jswelink.js"' "$s/index.html" || sed -i 's#</body>#<script src="jswelink.js"></script>\n</body>#' "$s/index.html"
  echo "synced $s"
done
