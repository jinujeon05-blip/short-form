#!/bin/sh
# 다산 배너 원본(_shared)을 배너를 넣는 가게 폴더에 복사한다. 가게를 추가·제외하면 SHOPS만 고친다.
cd "$(dirname "$0")/.." || exit 1
SHOPS="sutkkui eros anvoi gamasot biobeauty suwonseong hellochicken kyodong choongman youone kimshotel jokbal daekuk boknara chibaengi samwon bangatgan chuam eonnine ureong goodday lacherie snackshack holoi ijang baba orimyeongga phothin haru dada mujigae donamdong badasho kkotdwaeji sujeong yukdeok naegohyang madang anjirang jangolang donggoone soban buja sopung jangsucheon bomunttl geumdwaeji cheong joseon namme"
for s in $SHOPS; do
  cp _shared/dasan.js _shared/dasan-logo.png _shared/dasan-logo-white.png "$s/"
  grep -q 'src="dasan.js"' "$s/index.html" || sed -i 's#</body>#<script src="dasan.js"></script>\n</body>#' "$s/index.html"
  echo "synced $s"
done
