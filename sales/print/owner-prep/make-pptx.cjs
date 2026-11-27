// 정식 계약 사장님 준비 안내서 PPT(16:9). 내용은 같은 폴더 prep-ko.html(PDF)과 같게 유지한다.
// 실행: NODE_PATH=<pptxgenjs 설치 폴더>/node_modules node sales/print/owner-prep/make-pptx.cjs <출력.pptx>
// 가격은 sales/content.js PRICES(2026-11-19) 값.
const pptxgen = require('pptxgenjs');
const out = process.argv[2] || 'prep-ko.pptx';
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9'; // 10 x 5.625 in
pres.title = '정식 계약 사장님 준비 안내서';
pres.author = 'QR MENU';
const F = 'Malgun Gothic';
pres.theme = { headFontFace: F, bodyFontFace: F };
const K = { ink: '16130F', paper: 'FAF7F2', card: 'FFFFFF', line: 'E9E2D7', muted: '6F675D', accent: 'E0452B', gold: 'C99A3E', soft: 'FBEAE6', ok: '2F7D4F', okSoft: 'E7F1EA', optSoft: 'F3ECDF', optInk: '8A6A2A', dark2: '221D17' };

pres.defineSlideMaster({ title: 'LIGHT', background: { color: K.paper },
  objects: [{ text: { text: 'QR MENU', options: { x: 0.5, y: 5.22, w: 2, h: 0.25, fontFace: F, fontSize: 9, bold: true, color: K.accent, margin: 0 } } }],
  slideNumber: { x: 9.0, y: 5.22, w: 0.5, h: 0.25, fontFace: F, fontSize: 9, color: K.muted, align: 'right' } });
pres.defineSlideMaster({ title: 'DARK', background: { color: K.ink } });

const T = (s, text, o) => s.addText(text, Object.assign({ fontFace: F, isTextBox: true, margin: 0, valign: 'top', color: K.ink }, o));
const head = (s, kicker, title, lead) => {
  T(s, kicker, { x: 0.5, y: 0.35, w: 9, h: 0.25, fontSize: 10, bold: true, color: K.accent });
  T(s, title, { x: 0.5, y: 0.6, w: 9, h: 0.55, fontSize: 26, bold: true });
  if (lead) T(s, lead, { x: 0.5, y: 1.18, w: 9, h: 0.3, fontSize: 12, color: K.muted });
};
const card = (s, x, y, w, h, fill = K.card, line = K.line) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { color: line, width: 0.75 } });
const num = (s, n, x, y, d = 0.38, color = K.accent) => {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color }, line: { color } });
  T(s, String(n), { x, y, w: d, h: d, fontSize: 13, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
};
const pill = (s, text, x, y, w, fill, color) => {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.24, rectRadius: 0.12, fill: { color: fill }, line: { color: fill } });
  T(s, text, { x, y, w, h: 0.24, fontSize: 9, bold: true, color, align: 'center', valign: 'middle' });
};
const bullets = (arr, size = 11) => arr.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < arr.length - 1, fontSize: size, paraSpaceAfter: 3 } }));

// 1. 표지
{
  const s = pres.addSlide({ masterName: 'DARK' });
  T(s, 'QR MENU · qrmenuasia.com', { x: 0.7, y: 0.55, w: 6, h: 0.3, fontSize: 12, bold: true, color: K.accent });
  T(s, '정식 계약 사장님\n준비 안내서', { x: 0.7, y: 1.25, w: 6, h: 1.5, fontSize: 38, bold: true, color: 'FFFFFF', lineSpacingMultiple: 1.05 });
  T(s, '고퀄리티 5개 언어 QR 메뉴판을 위해 보내 주실 것과 진행 순서', { x: 0.7, y: 2.85, w: 5.6, h: 0.6, fontSize: 14, color: 'D9D2C6' });
  ['한국어 · 베트남어 · 영어 · 중국어 · 일본어', '앱 설치 없음', '휴대폰으로 직접 수정'].forEach((t, i) => {
    const w = [3.2, 1.35, 1.8][i], x = [0.7, 4.0, 5.45][i];
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 3.65, w, h: 0.36, rectRadius: 0.18, fill: { color: K.ink }, line: { color: '4A4238', width: 0.75 } });
    T(s, t, { x, y: 3.65, w, h: 0.36, fontSize: 10.5, color: 'EFE8DC', align: 'center', valign: 'middle' });
  });
  card(s, 0.7, 4.3, 8.6, 0.85, K.dark2, K.dark2);
  T(s, [{ text: '사장님은 사진과 정보만 보내 주세요. ', options: { bold: true, color: 'FFB7A8' } },
        { text: '번역·디자인·QR 카드·홍보 이미지는 저희가 만들고, 모든 가격은 오픈 전에 사장님께 한 번 더 확인받습니다.', options: { color: 'FFFFFF' } }],
    { x: 0.95, y: 4.4, w: 8.1, h: 0.65, fontSize: 12, valign: 'middle' });
  // 오른쪽 QR 느낌 장식(정사각 칸 묶음)
  const ox = 7.25, oy = 0.9, c = 0.24;
  const pat = ['1110111', '1010101', '1110111', '0001000', '1101011', '0110110', '1011101'];
  pat.forEach((row, r) => [...row].forEach((v, k) => { if (v === '1') s.addShape(pres.shapes.RECTANGLE, { x: ox + k * c, y: oy + r * c, w: c - 0.03, h: c - 0.03, fill: { color: r + k < 4 ? K.accent : '3A332B' }, line: { type: 'none' } }); }));
  T(s, '2026년 11월판', { x: 0.7, y: 5.3, w: 3, h: 0.2, fontSize: 9, color: '9A9184' });
}

// 2. 진행 순서
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, '한눈에 보기', '진행 순서', '사장님이 하실 일은 ①과 ③ 두 번뿐입니다. 나머지는 저희가 합니다.');
  const st = [['자료 보내기', '메뉴판 사진·가게 정보를 Zalo·카카오톡으로', '사장님', 1], ['제작·검수', '메뉴 정리, 5개 언어 번역, 맞춤 디자인, 가격 대조', '저희', 0],
              ['시안 확인', '휴대폰 링크로 열어 보고 고칠 곳만 말씀', '사장님', 1], ['오픈', '가게 주소 연결, QR 카드·SNS 이미지 전달', '저희', 0], ['운영', '가격·품절은 직접 수정 또는 메시지로 요청', '함께', 1]];
  const w = 1.66, g = 0.175;
  st.forEach(([t, d, who, me], i) => {
    const x = 0.5 + i * (w + g), y = 1.75;
    card(s, x, y, w, 2.75);
    num(s, i + 1, x + w / 2 - 0.24, y + 0.25, 0.48);
    T(s, t, { x, y: y + 0.9, w, h: 0.35, fontSize: 14, bold: true, align: 'center' });
    T(s, d, { x: x + 0.15, y: y + 1.3, w: w - 0.3, h: 0.85, fontSize: 10.5, color: K.muted, align: 'center' });
    pill(s, who, x + 0.33, y + 2.28, w - 0.66, me ? K.soft : K.okSoft, me ? K.accent : K.ok);
    if (i < 4) T(s, '›', { x: x + w - 0.02, y: y + 1.15, w: g + 0.04, h: 0.4, fontSize: 18, bold: true, color: K.gold, align: 'center' });
  });
  T(s, '※ QR 주소는 바뀌지 않습니다. 메뉴·가격을 고쳐도 카드를 다시 인쇄할 필요가 없습니다.', { x: 0.5, y: 4.7, w: 9, h: 0.3, fontSize: 10.5, color: K.muted });
}

// 3. 받으시는 것
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, '정식 계약 결과물', '받으시는 것', '정식 계약 가게에는 아래 8가지를 빠짐없이 드립니다.');
  const it = [['5개 언어 메뉴판', '가게 전용 주소, 손님 휴대폰 언어로 자동으로 열림'], ['가게 맞춤 디자인', '간판·기존 메뉴판의 색과 분위기를 닮게'],
              ['테이블 QR 카드 PDF', 'A6 크기, A4 한 장에 4장, 인쇄소에서 바로 출력'], ['SNS 홍보 이미지 2종', '정사각형·스토리, 페이스북·인스타·Zalo용'],
              ['사장님 수정 화면', '가격·메뉴·사진·영업시간·품절을 휴대폰으로, 약 1분 안에 반영'], ['방문 리포트', '최근 30일 방문 수, 나라·언어별 손님'],
              ['버튼 3개', '와이파이 비밀번호 복사, 전화 걸기, 구글 지도 길찾기'], ['검색·가게 찾기 등록', '구글 검색과 QR 메뉴판 가게 찾기에 함께 노출']];
  const w = 2.12, h = 1.62, g = 0.173;
  it.forEach(([t, d], i) => {
    const x = 0.5 + (i % 4) * (w + g), y = 1.7 + Math.floor(i / 4) * (h + 0.2);
    card(s, x, y, w, h);
    num(s, i + 1, x + 0.18, y + 0.18, 0.34, i < 4 ? K.accent : K.gold);
    T(s, t, { x: x + 0.18, y: y + 0.62, w: w - 0.3, h: 0.3, fontSize: 12.5, bold: true });
    T(s, d, { x: x + 0.18, y: y + 0.95, w: w - 0.3, h: 0.62, fontSize: 10, color: K.muted });
  });
}

// 4. 필수 1~3
const must = [
  ['지금 쓰시는 메뉴판 사진 — 전부', '메뉴 이름·가격의 기준. 이 사진에 있는 것만 옮깁니다.', ['앞·뒤·별지·벽 메뉴·음료판까지 모든 면을 한 장에 한 면씩', '정면, 가장자리까지, 빛 반사 없이 — 가격 숫자가 읽히게', '실제 가격이 다르면 지금 가격을 메시지로', '메뉴판이 없으면 "메뉴 – 가격" 목록 글도 OK']],
  ['가격 기준 정보', '손님이 계산대에서 놀라지 않도록 표시 방식을 맞춥니다.', ['크기·인분별 가격(소/중/대, 1인분/2인분)', '세트·추가 메뉴, 시가 메뉴', '부가세(VAT)·봉사료 포함 여부', '계절·한정 메뉴, 지금 품절인 메뉴']],
  ['가게 기본 정보', '가게 정보 칸과 구글 검색에 그대로 들어갑니다.', ['상호 — 한글 + 간판의 영어·베트남어 표기 그대로', '주소, 가게 전화(손님이 거는 번호)', '영업시간·휴무일', '브레이크타임·라스트오더']],
  ['로고 파일 또는 간판 사진', '메뉴판 맨 위 얼굴이자 디자인 색의 기준입니다.', ['로고 원본(투명 배경 PNG·AI·PDF)이 가장 좋습니다', '없으면 간판이 정면으로 보이는 낮 사진 1~2장']],
  ['대표 음식 사진 4~6장', '실제 가게 음식 사진만 씁니다(AI 그림은 쓰지 않습니다).', ['잘 팔리는·자신 있는 메뉴 위주, 메뉴 이름과 함께', '없으면 구글 지도 공개 사진으로 먼저 만들고 나중에 교체']]];
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, '필수 준비 · 약 30분', '꼭 보내 주실 것 5가지 (1/2)', '이 5가지가 모이면 바로 제작을 시작합니다.');
  const w = 2.88, g = 0.18;
  must.slice(0, 3).forEach(([t, why, b], i) => {
    const x = 0.5 + i * (w + g), y = 1.7;
    card(s, x, y, w, 3.35);
    num(s, i + 1, x + 0.2, y + 0.2);
    T(s, t, { x: x + 0.7, y: y + 0.2, w: w - 0.85, h: 0.42, fontSize: 13, bold: true, valign: 'middle', fit: 'shrink' });
    T(s, why, { x: x + 0.2, y: y + 0.75, w: w - 0.4, h: 0.5, fontSize: 10, color: K.muted });
    T(s, bullets(b, 10.5), { x: x + 0.2, y: y + 1.3, w: w - 0.4, h: 1.95, color: K.ink });
  });
}
// 5. 필수 4~5 + 사진 찍는 법
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, '필수 준비 · 약 30분', '꼭 보내 주실 것 5가지 (2/2)', '음식 사진은 휴대폰 카메라로 충분합니다. 오른쪽만 지켜 주세요.');
  must.slice(3).forEach(([t, why, b], i) => {
    const x = 0.5, y = 1.7 + i * 1.72;
    card(s, x, y, 4.05, 1.57);
    num(s, i + 4, x + 0.2, y + 0.2);
    T(s, t, { x: x + 0.7, y: y + 0.2, w: 3.2, h: 0.38, fontSize: 13, bold: true, valign: 'middle' });
    T(s, why, { x: x + 0.2, y: y + 0.66, w: 3.7, h: 0.28, fontSize: 10, color: K.muted });
    T(s, bullets(b, 10.5), { x: x + 0.2, y: y + 0.95, w: 3.7, h: 0.6 });
  });
  // 사진 팁
  card(s, 4.75, 1.7, 2.3, 3.29);
  T(s, '✓ 이렇게', { x: 4.93, y: 1.85, w: 2.0, h: 0.3, fontSize: 12.5, bold: true, color: K.ok });
  T(s, bullets(['가로로, 접시가 꽉 차게', '창가 자연광, 위에서 45도', '나온 직후 바로', 'Zalo는 HD, 카톡은 원본으로 보내기'], 10), { x: 4.93, y: 2.2, w: 2.0, h: 1.75 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 4.05, w: 1.2, h: 0.8, rectRadius: 0.06, fill: { color: 'FFFFFF' }, line: { color: K.ink, width: 3 } });
  T(s, '4 : 3', { x: 5.3, y: 4.05, w: 1.2, h: 0.8, fontSize: 13, bold: true, align: 'center', valign: 'middle' });
  card(s, 7.2, 1.7, 2.3, 3.29);
  T(s, '✕ 피해 주세요', { x: 7.38, y: 1.85, w: 2.0, h: 0.3, fontSize: 12.5, bold: true, color: K.accent });
  T(s, bullets(['세로 사진, 잘린 접시', '어두운·노란 조명', '필터·글자·워터마크', '다른 가게·인터넷 사진', '캡처 화면'], 10), { x: 7.38, y: 2.2, w: 2.0, h: 2.6 });
}

// 6. 선택 항목
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, '있으면 더 좋은 것', '선택 준비 항목', '없어도 제작은 됩니다. 보내 주시면 메뉴판이 한층 친절해집니다.');
  const it = [['손님용 와이파이', '이름·비밀번호 → 메뉴판에 \'복사\' 버튼', '선택'], ['추천·안내 표시', '대표·추천 메뉴, 매운맛, 해산물·땅콩 등 재료, 고수 빼기', '선택'],
              ['가게 소개 한두 줄', '자랑하고 싶은 점, 원하는 색·분위기, 참고 가게', '선택'], ['테이블 수', 'QR 카드 인쇄 장수 맞춤. 아크릴 스탠드는 별도 상담', '선택'],
              ['Zalo 주문서(장바구니)', '손님이 고른 메뉴를 가게 Zalo로. 주문 받을 가게 Zalo 번호 필요', '옵션'], ['구글 지도 연결', '사장님 계정에서 저희를 \'관리자\'로 초대만 — 비밀번호 필요 없음', '선택']];
  const w = 2.88, h = 1.55, g = 0.18;
  it.forEach(([t, d, tag], i) => {
    const x = 0.5 + (i % 3) * (w + g), y = 1.7 + Math.floor(i / 3) * (h + 0.2);
    card(s, x, y, w, h);
    pill(s, tag, x + 0.2, y + 0.2, 0.55, K.optSoft, K.optInk);
    T(s, t, { x: x + 0.85, y: y + 0.17, w: w - 1.0, h: 0.3, fontSize: 12.5, bold: true });
    T(s, d, { x: x + 0.2, y: y + 0.6, w: w - 0.4, h: 0.85, fontSize: 10.5, color: K.muted });
  });
}

// 7. 약속
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, '약속드립니다', '이렇게 만들고, 이렇게 지킵니다', '메뉴판은 가게의 얼굴이자 가격표입니다. 정확함과 정보 보호를 먼저 둡니다.');
  const it = [['가격 두 번 대조 + 사장님 최종 확인', '읽기 어려운 글자는 짐작하지 않고 여쭙니다. 가격이 하나라도 확인되지 않으면 오픈하지 않습니다.'],
              ['가게 정보만 다룹니다', '가게 전화·주소·메뉴만 받습니다. 개인 연락처·신분증·계정 비밀번호는 받지도 저장하지도 않습니다.'],
              ['실제 음식 사진만', 'AI로 만든 음식 그림은 메뉴 사진으로 쓰지 않습니다.'],
              ['알아듣는 번역', '메뉴마다 한국어·베트남어 이름이 함께 나와 직원도 손님 화면을 바로 알아봅니다.'],
              ['오픈 후에도 계속', '휴대폰으로 직접 수정하거나 메시지만 보내셔도 대신 고쳐 드립니다. QR은 그대로입니다.']];
  it.forEach(([t, d], i) => {
    const col = i < 3 ? 0 : 1, row = i < 3 ? i : i - 3;
    const x = 0.5 + col * 4.6, y = 1.7 + row * 1.1, w = 4.4;
    card(s, x, y, w, 0.98);
    num(s, i + 1, x + 0.2, y + 0.27, 0.44, K.ink);
    T(s, t, { x: x + 0.8, y: y + 0.12, w: w - 1.0, h: 0.3, fontSize: 12.5, bold: true });
    T(s, d, { x: x + 0.8, y: y + 0.43, w: w - 1.0, h: 0.5, fontSize: 9.5, color: K.muted });
  });
  card(s, 5.1, 3.9, 4.4, 1.08, K.soft, 'F2CFC6');
  T(s, '시안을 보실 때 이것만', { x: 5.3, y: 3.98, w: 4, h: 0.28, fontSize: 11.5, bold: true, color: K.accent });
  T(s, bullets(['메뉴 이름과 가격이 맞는지 — 가장 중요', '빠진 메뉴·안 파는 메뉴, 영업시간·전화·주소'], 10), { x: 5.3, y: 4.3, w: 4.0, h: 0.62 });
}

// 8. 체크리스트
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, '보내기 전 확인', '준비 체크리스트', '확인하고 한 번에 보내 주세요. 나눠 보내셔도 괜찮습니다.');
  const rows = [['메뉴판 사진 — 모든 면(음료·별지·벽 메뉴 포함)', '필수'], ['바뀐 가격·품절·계절 메뉴, 부가세·봉사료 포함 여부', '필수'],
                ['상호(한글·간판 표기), 주소, 가게 전화, 영업시간·휴무·라스트오더', '필수'], ['로고 원본 파일 또는 간판 정면 사진', '필수'],
                ['대표 음식 사진 4~6장(가로·자연광) + 메뉴 이름', '필수'], ['손님용 와이파이 이름·비밀번호', '선택'],
                ['추천 메뉴·매운맛·재료 안내, 가게 소개, 원하는 분위기', '선택'], ['테이블 수, Zalo 주문서를 쓸 경우 가게 Zalo 번호', '선택'],
                ['구글 지도 연결 원하면 \'관리자\' 초대(비밀번호 필요 없음)', '선택']];
  const hdr = { fontFace: F, bold: true, color: 'FFFFFF', fill: { color: K.ink }, fontSize: 10 };
  const data = [[{ text: '', options: hdr }, { text: '항목', options: hdr }, { text: '구분', options: Object.assign({}, hdr, { align: 'center' }) }]]
    .concat(rows.map(([t, k]) => [{ text: '☐', options: { fontSize: 13, align: 'center', color: K.ink } }, { text: t, options: { fontSize: 10.5 } },
      { text: k, options: { fontSize: 9.5, bold: true, align: 'center', color: k === '필수' ? K.accent : K.optInk } }]));
  s.addTable(data, { x: 0.5, y: 1.65, w: 9, colW: [0.55, 7.45, 1.0], rowH: 0.34, fontFace: F, color: K.ink, fill: { color: 'FFFFFF' }, border: { type: 'solid', pt: 0.5, color: K.line }, valign: 'middle', margin: [0.03, 0.08, 0.03, 0.08] });
}

// 9. 요금 + 연락처
{
  const s = pres.addSlide({ masterName: 'DARK' });
  T(s, '요금 안내 · 상담', { x: 0.5, y: 0.35, w: 9, h: 0.25, fontSize: 10, bold: true, color: K.accent });
  T(s, '요금과 연락처', { x: 0.5, y: 0.6, w: 6, h: 0.55, fontSize: 26, bold: true, color: 'FFFFFF' });
  T(s, '베트남 동(VND), 2026년 11월 기준', { x: 0.5, y: 1.18, w: 9, h: 0.3, fontSize: 12, color: 'B9B0A3' });
  const hdr = { fontFace: F, bold: true, color: 'FFFFFF', fill: { color: '3A332B' }, fontSize: 10 };
  const r = (a, b, c) => [{ text: a, options: { bold: true, fontSize: 11 } }, { text: b, options: { fontSize: 9.5 } }, { text: c, options: { bold: true, align: 'right', fontSize: 10.5 } }];
  s.addTable([[{ text: '상품', options: hdr }, { text: '포함 내용', options: hdr }, { text: '요금', options: Object.assign({}, hdr, { align: 'right' }) }],
    r('기본형', '5개 언어 메뉴판, 기존 메뉴판 사진·로고 활용, QR 카드 PDF, SNS 이미지 2종, 와이파이·전화·지도 버튼', '2,500,000 (1회)'),
    r('프리미엄', '기본형 전체 + 가게 맞춤 디자인, 음식 사진 정리·배치, 시안 수정, SNS 홍보영상 2회', '5,000,000 (1회)'),
    r('월 관리', '사이트 유지, 수정 화면, 직접 수정 무제한·맡기는 수정 월 2회, 방문 리포트 (연 3,500,000 = 2개월 무료)', '350,000 / 월'),
    r('옵션', 'Zalo 주문서(장바구니) 화면 +2,500,000 · 전용 도메인 연 500,000부터 · 아크릴 스탠드·테이블 주문 별도 상담', '별도')],
    { x: 0.5, y: 1.6, w: 9, colW: [1.1, 6.2, 1.7], rowH: 0.46, fontFace: F, color: K.ink, fill: { color: 'FFFFFF' }, border: { type: 'solid', pt: 0.5, color: K.line }, valign: 'middle', margin: [0.03, 0.09, 0.03, 0.09] });
  T(s, '※ 월 관리가 끝나면 메뉴판 사이트 운영도 멈춥니다.', { x: 0.5, y: 4.05, w: 9, h: 0.25, fontSize: 9.5, color: 'B9B0A3' });
  card(s, 0.5, 4.4, 4.4, 0.9, K.dark2, K.dark2); card(s, 5.1, 4.4, 4.4, 0.9, K.dark2, K.dark2);
  T(s, [{ text: '한국어 상담', options: { bold: true, color: 'FFB7A8', breakLine: true } }, { text: '전화·Zalo 0917 302 200 · 카카오톡 jjw4164', options: { color: 'FFFFFF' } }], { x: 0.7, y: 4.5, w: 4.1, h: 0.7, fontSize: 11.5, valign: 'middle' });
  T(s, [{ text: 'Tư vấn tiếng Việt', options: { bold: true, color: 'FFB7A8', breakLine: true } }, { text: 'Điện thoại · Zalo 0937 250 787 · qrmenuasia.com', options: { color: 'FFFFFF' } }], { x: 5.3, y: 4.5, w: 4.1, h: 0.7, fontSize: 11.5, valign: 'middle' });
}

(async () => {
  const JSZip = require('jszip'); const fs = require('fs');
  const zip = await JSZip.loadAsync(await pres.write({ outputType: 'nodebuffer' }));
  const z2 = new JSZip();
  for (const [name, f] of Object.entries(zip.files)) {
    if (f.dir) continue;
    let data = await f.async('nodebuffer');
    if (/^ppt\/slides\/slide\d+\.xml$/.test(name)) {
      let x = data.toString('utf8');
      x = x.replace(/<a:pPr(?![^>]*LnBrk)/g, '<a:pPr eaLnBrk="0" latinLnBrk="0"');
      x = x.replace(/lang="en-US"/g, 'lang="ko-KR" altLang="en-US"');
      x = x.replace(/<a:p>(?!<a:pPr)/g, '<a:p><a:pPr eaLnBrk="0" latinLnBrk="0"/>');
      data = Buffer.from(x, 'utf8');
    }
    z2.file(name, data, { createFolders: false });
  }
  fs.writeFileSync(out, await z2.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
  console.log('완료', out);
})();
