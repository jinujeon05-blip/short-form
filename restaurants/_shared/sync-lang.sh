#!/bin/sh
# 언어 선택 드롭다운 원본(_shared/lang-menu.js)을 각 가게 폴더와 소개서(sales/)에 복사하고, 페이지 맨 끝에 넣는다.
# 새 가게를 만들면 SHOPS에 넣는다. 소개서·가게 찾기 페이지는 sales/lang-menu.js 하나를 같이 쓴다.
cd "$(dirname "$0")/.." || exit 1
SHOPS="sutkkui eros anvoi baekcheon gamasot biobeauty suwonseong hellochicken kyodong choongman youone kimshotel jokbal daekuk boknara chibaengi samwon bangatgan chuam eonnine ureong goodday lacherie snackshack holoi ijang baba orimyeongga phothin haru dada mujigae donamdong badasho kkotdwaeji sujeong yukdeok naegohyang madang jangsucheon"
for s in $SHOPS; do
  cp _shared/lang-menu.js "$s/"
  grep -q 'src="lang-menu.js"' "$s/index.html" || sed -i 's#</body>#<script src="lang-menu.js"></script>\n</body>#' "$s/index.html"
  echo "synced $s"
done
cp _shared/lang-menu.js ../sales/
grep -q 'src="lang-menu.js"' ../sales/index.html || sed -i 's#</body>#<script src="lang-menu.js"></script>\n</body>#' ../sales/index.html
grep -q 'src="/lang-menu.js"' ../sales/stores/index.html || sed -i 's#</body>#<script src="/lang-menu.js"></script>\n</body>#' ../sales/stores/index.html
echo "synced sales"
