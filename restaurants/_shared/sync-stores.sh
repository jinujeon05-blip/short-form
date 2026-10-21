#!/bin/sh
# "가게 찾기" 링크 원본(_shared/stores-link.js)을 각 가게 폴더에 복사하고, </body> 바로 앞(파트너 배너 스크립트 다음)에 넣는다.
# 가게 찾기 목록(sales/stores/data.js)에 올라간 가게만 SHOPS에 넣는다.
cd "$(dirname "$0")/.." || exit 1
SHOPS="sutkkui eros anvoi baekcheon gamasot biobeauty suwonseong hellochicken kyodong choongman youone kimshotel jokbal daekuk boknara chibaengi samwon bangatgan chuam eonnine ureong goodday lacherie"
for s in $SHOPS; do
  cp _shared/stores-link.js "$s/"
  grep -q 'src="stores-link.js"' "$s/index.html" || sed -i 's#</body>#<script src="stores-link.js"></script>\n</body>#' "$s/index.html"
  echo "synced $s"
done
