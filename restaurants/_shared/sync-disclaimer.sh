#!/bin/sh
# 가게 찾기용 하단 안내 문구 원본(_shared/disclaimer.js)을 가게 찾기용 가게 폴더에 복사하고, stores-link.js 바로 다음에 넣는다.
# 가게 찾기용(sales/stores/data.js 의 listing: true) 가게만 SHOPS에 넣는다. 정식(사장님 동의·비용) 가게는 넣지 않는다.
cd "$(dirname "$0")/.." || exit 1
SHOPS="suwonseong haru dada mujigae donamdong hellochicken kyodong choongman youone jokbal daekuk boknara samwon bangatgan chuam eonnine ureong goodday lacherie snackshack holoi ijang baba orimyeongga"
for s in $SHOPS; do
  cp _shared/disclaimer.js "$s/"
  grep -q 'src="disclaimer.js"' "$s/index.html" || sed -i 's#<script src="stores-link.js"></script>#<script src="stores-link.js"></script>\n<script src="disclaimer.js"></script>#' "$s/index.html"
  grep -q 'src="disclaimer.js"' "$s/index.html" || echo "!! $s: stores-link.js 줄을 못 찾음"
  echo "synced $s"
done
