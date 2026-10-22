#!/bin/sh
# 장바구니·주문서 원본(_shared/order.js)을 가게 폴더에 복사한다. 가게를 추가·제외하면 SHOPS만 고친다.
# Ăn Vội(배달 주문)·바이오&뷰티(상담 주문)는 자체 장바구니가 있어 제외. 가게 설정은 각 menu.js 의 window.ORDER.
cd "$(dirname "$0")/.." || exit 1
SHOPS="sutkkui eros gamasot suwonseong baekcheon kimshotel chibaengi phothin"
for s in $SHOPS; do
  cp _shared/order.js "$s/"
  grep -q 'src="order.js"' "$s/index.html" || sed -i 's#</body>#<script src="order.js"></script>\n</body>#' "$s/index.html"
  echo "synced $s"
done
