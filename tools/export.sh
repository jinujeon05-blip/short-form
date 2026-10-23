#!/bin/sh
# 사용자에게 보낼 파일을 "<상호>_<파일>" 이름으로 복사한다 (보낸 파일이 가게별로 구분되게).
# 사용법: sh tools/export.sh <출력폴더> [가게폴더명...]   (가게를 안 주면 7곳 전부, 소개서는 sales 를 넣으면 포함)
# 저장소 안의 원본 이름은 도구들이 쓰므로 바꾸지 않는다. 새 가게는 아래 name() 에 상호를 추가한다.
cd "$(dirname "$0")/.." || exit 1
out="${1:?출력폴더를 주세요}"; shift
[ $# -eq 0 ] && set -- sutkkui eros anvoi baekcheon gamasot biobeauty suwonseong
name() {
  case "$1" in
    sutkkui) echo "숯꾸이" ;; eros) echo "EROS" ;; anvoi) echo "AnVoi" ;; baekcheon) echo "백천화덕아나고" ;;
    gamasot) echo "가마솥" ;; sopung) echo "소풍" ;; phothin) echo "퍼틴" ;; haru) echo "하루" ;; mujigae) echo "무지개식당" ;; donamdong) echo "돈암동찌개" ;; badasho) echo "바다쇼" ;; kkotdwaeji) echo "꽃돼지" ;; sujeong) echo "수정곱창" ;; yukdeok) echo "육덕" ;; naegohyang) echo "내고향" ;; madang) echo "마당돌판구이" ;; jangsucheon) echo "장수천민물장어" ;; bomunttl) echo "보문뜰" ;; geumdwaeji) echo "금돼지" ;; cheong) echo "청식당" ;; studioan) echo "스튜디오안사진관" ;; jamaedang) echo "자매당" ;; anjirang) echo "안지랑곱창막창" ;; buja) echo "부자감자탕" ;; soban) echo "소반" ;; donggoone) echo "동구네" ;; jangolang) echo "장어랑고기랑" ;; dada) echo "다다식당" ;; biobeauty) echo "바이오뷰티" ;; suwonseong) echo "수원성" ;; hellochicken) echo "헬로치킨" ;; kyodong) echo "교동치킨" ;; choongman) echo "충만치킨" ;; youone) echo "유원핫도그" ;; kimshotel) echo "킴스호텔" ;; jokbal) echo "족발신선생" ;; daekuk) echo "대국" ;; boknara) echo "복나라" ;; chibaengi) echo "치뱅이" ;; samwon) echo "삼원" ;; bangatgan) echo "방앗간" ;; chuam) echo "추암" ;; eonnine) echo "언니네" ;; ureong) echo "우렁쌈밥" ;; goodday) echo "굿데이김밥" ;; lacherie) echo "LaCherie" ;; snackshack) echo "SnackShack" ;; holoi) echo "퍼보호러이" ;; ijang) echo "이장네돈가" ;; baba) echo "바바" ;; orimyeongga) echo "오리명가" ;; sales) echo "QR메뉴판소개서" ;;
    joseon) echo "조선시대" ;;
    namme) echo "남매식당" ;;
    inyeon) echo "인연식당" ;;
    *) echo "$1" ;;
  esac
}
mkdir -p "$out"
for s in "$@"; do
  n=$(name "$s")
  if [ "$s" = sales ]; then dir=sales/print; else dir="restaurants/$s/print"; fi
  [ -d "$dir" ] || { echo "없음: $dir"; continue; }
  for f in "$dir"/*.pdf "$dir"/*.png "$dir"/qr.svg; do
    [ -f "$f" ] || continue
    cp "$f" "$out/${n}_$(basename "$f")"
  done
  echo "$n: $(ls "$out" | grep -c "^${n}_")개"
done
