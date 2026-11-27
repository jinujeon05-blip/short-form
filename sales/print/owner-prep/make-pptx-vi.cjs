// 베트남어판 PPT(16:9). make-pptx.cjs(한국어판)를 베트남어로 바꾼 것 — 내용은 prep-vi.html(PDF)과 같게 유지한다.
// 실행: NODE_PATH=<pptxgenjs 설치 폴더>/node_modules node sales/print/owner-prep/make-pptx-vi.cjs <출력.pptx>
// 가격은 sales/content.js PRICES(2026-11-19) 값.
const pptxgen = require('pptxgenjs');
const out = process.argv[2] || 'prep-vi.pptx';
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9'; // 10 x 5.625 in
pres.title = 'Hướng dẫn chuẩn bị dành cho chủ quán';
pres.author = 'QR MENU';
const F = 'Arial';
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
  T(s, 'Hướng dẫn chuẩn bị\ndành cho chủ quán', { x: 0.7, y: 1.25, w: 6, h: 1.5, fontSize: 34, bold: true, color: 'FFFFFF', lineSpacingMultiple: 1.05 });
  T(s, 'Những gì anh/chị cần gửi và các bước thực hiện để có thực đơn QR 5 ngôn ngữ chất lượng cao', { x: 0.7, y: 2.85, w: 5.6, h: 0.6, fontSize: 14, color: 'D9D2C6' });
  ['Hàn · Việt · Anh · Trung · Nhật', 'Không cần cài ứng dụng', 'Tự sửa trên điện thoại'].forEach((t, i) => {
    const w = [2.45, 2.1, 2.05][i], x = [0.7, 3.25, 5.45][i];
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 3.65, w, h: 0.36, rectRadius: 0.18, fill: { color: K.ink }, line: { color: '4A4238', width: 0.75 } });
    T(s, t, { x, y: 3.65, w, h: 0.36, fontSize: 10.5, color: 'EFE8DC', align: 'center', valign: 'middle' });
  });
  card(s, 0.7, 4.3, 8.6, 0.85, K.dark2, K.dark2);
  T(s, [{ text: 'Anh/chị chỉ cần gửi ảnh và thông tin. ', options: { bold: true, color: 'FFB7A8' } },
        { text: 'Dịch thuật, thiết kế, thẻ QR và ảnh quảng cáo do chúng tôi làm. Mọi giá món đều được anh/chị xác nhận lại trước khi đưa vào sử dụng.', options: { color: 'FFFFFF' } }],
    { x: 0.95, y: 4.4, w: 8.1, h: 0.65, fontSize: 12, valign: 'middle' });
  // 오른쪽 QR 느낌 장식(정사각 칸 묶음)
  const ox = 7.25, oy = 0.9, c = 0.24;
  const pat = ['1110111', '1010101', '1110111', '0001000', '1101011', '0110110', '1011101'];
  pat.forEach((row, r) => [...row].forEach((v, k) => { if (v === '1') s.addShape(pres.shapes.RECTANGLE, { x: ox + k * c, y: oy + r * c, w: c - 0.03, h: c - 0.03, fill: { color: r + k < 4 ? K.accent : '3A332B' }, line: { type: 'none' } }); }));
  T(s, 'Bản tháng 11/2026', { x: 0.7, y: 5.3, w: 3, h: 0.2, fontSize: 9, color: '9A9184' });
}

// 2. 진행 순서
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, 'TỔNG QUAN', 'Các bước thực hiện', 'Anh/chị chỉ cần làm bước ① và ③. Phần còn lại chúng tôi lo.');
  const st = [['Gửi tài liệu', 'Ảnh thực đơn, thông tin quán qua Zalo', 'Chủ quán', 1], ['Làm & kiểm tra', 'Sắp xếp món, dịch 5 ngôn ngữ, thiết kế, đối chiếu giá', 'Chúng tôi', 0],
              ['Xem bản mẫu', 'Mở link trên điện thoại, chỉ cần báo chỗ cần sửa', 'Chủ quán', 1], ['Đưa vào dùng', 'Gắn địa chỉ web, gửi thẻ QR và ảnh SNS', 'Chúng tôi', 0], ['Vận hành', 'Tự sửa giá, món hết hoặc nhắn tin nhờ sửa', 'Cùng nhau', 1]];
  const w = 1.66, g = 0.175;
  st.forEach(([t, d, who, me], i) => {
    const x = 0.5 + i * (w + g), y = 1.75;
    card(s, x, y, w, 2.75);
    num(s, i + 1, x + w / 2 - 0.24, y + 0.25, 0.48);
    T(s, t, { x, y: y + 0.9, w, h: 0.35, fontSize: 12.5, bold: true, align: 'center' });
    T(s, d, { x: x + 0.15, y: y + 1.3, w: w - 0.3, h: 0.85, fontSize: 10.5, color: K.muted, align: 'center' });
    pill(s, who, x + 0.33, y + 2.28, w - 0.66, me ? K.soft : K.okSoft, me ? K.accent : K.ok);
    if (i < 4) T(s, '›', { x: x + w - 0.02, y: y + 1.15, w: g + 0.04, h: 0.4, fontSize: 18, bold: true, color: K.gold, align: 'center' });
  });
  T(s, '※ Địa chỉ QR không bao giờ đổi. Sửa món hay giá cũng không cần in lại thẻ.', { x: 0.5, y: 4.7, w: 9, h: 0.3, fontSize: 10.5, color: K.muted });
}

// 3. 받으시는 것
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, 'SẢN PHẨM', 'Anh/chị nhận được', 'Quán ký hợp đồng chính thức nhận đầy đủ 8 sản phẩm dưới đây.');
  const it = [['Thực đơn 5 ngôn ngữ', 'Địa chỉ riêng của quán, tự mở theo ngôn ngữ điện thoại của khách'], ['Thiết kế riêng', 'Giống màu sắc, không khí biển hiệu và thực đơn của quán'],
              ['Thẻ QR để bàn (PDF)', 'Khổ A6, 4 thẻ trên một tờ A4, in ngay tại tiệm in'], ['2 ảnh quảng cáo SNS', 'Vuông và story, cho Facebook, Instagram, Zalo'],
              ['Tự sửa thực đơn', 'Tự sửa giá, món, ảnh, giờ mở cửa, hết món; cập nhật trong ~1 phút'], ['Báo cáo lượt xem', 'Lượt xem 30 ngày, khách theo nước và ngôn ngữ'],
              ['3 nút tiện ích', 'Sao chép mật khẩu Wi-Fi, gọi điện, chỉ đường Google Maps'], ['Hiện trên tìm kiếm', 'Xuất hiện trên Google và mục Tìm quán của QR MENU']];
  const w = 2.12, h = 1.62, g = 0.173;
  it.forEach(([t, d], i) => {
    const x = 0.5 + (i % 4) * (w + g), y = 1.7 + Math.floor(i / 4) * (h + 0.2);
    card(s, x, y, w, h);
    num(s, i + 1, x + 0.18, y + 0.18, 0.34, i < 4 ? K.accent : K.gold);
    T(s, t, { x: x + 0.18, y: y + 0.62, w: w - 0.3, h: 0.3, fontSize: 11.5, bold: true, fit: 'shrink' });
    T(s, d, { x: x + 0.18, y: y + 0.95, w: w - 0.3, h: 0.62, fontSize: 10, color: K.muted });
  });
}

// 4. 필수 1~3
const must = [
  ['Ảnh thực đơn đang dùng — tất cả', 'Căn cứ cho tên món và giá. Chỉ đưa lên những gì có trong ảnh.', ['Mọi mặt: trước, sau, tờ rời, trên tường, đồ uống — mỗi ảnh một trang', 'Chụp thẳng, đủ mép, không lóa — đọc rõ giá', 'Giá thực tế khác thì nhắn giá hiện tại', 'Chưa có thực đơn: gửi danh sách "món – giá" cũng được']],
  ['Thông tin về giá', 'Để khách không bất ngờ khi thanh toán.', ['Giá theo cỡ/suất (nhỏ/vừa/lớn, 1/2 người)', 'Combo, món thêm, món theo thời giá', 'Đã gồm VAT, phí phục vụ chưa', 'Món theo mùa, món đang hết']],
  ['Thông tin cơ bản của quán', 'Đưa nguyên vào phần thông tin quán và Google.', ['Tên quán đúng như biển hiệu', 'Địa chỉ, số điện thoại của quán (số khách gọi)', 'Giờ mở cửa, ngày nghỉ', 'Giờ nghỉ trưa, giờ nhận món cuối']],
  ['File logo hoặc ảnh biển hiệu', 'Là gương mặt đầu thực đơn và căn cứ màu thiết kế.', ['Tốt nhất là file logo gốc (PNG nền trong, AI, PDF)', 'Chưa có logo: 1–2 ảnh ban ngày thấy rõ biển hiệu']],
  ['4–6 ảnh món tiêu biểu', 'Chỉ dùng ảnh món thật của quán (không dùng ảnh AI).', ['Món bán chạy, món tự hào, ghi kèm tên món', 'Chưa có ảnh: dùng tạm ảnh công khai Google Maps']]];
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, 'BẮT BUỘC · KHOẢNG 30 PHÚT', '5 thứ cần gửi (1/2)', 'Đủ 5 thứ này là chúng tôi bắt đầu làm ngay.');
  const w = 2.88, g = 0.18;
  must.slice(0, 3).forEach(([t, why, b], i) => {
    const x = 0.5 + i * (w + g), y = 1.7;
    card(s, x, y, w, 3.35);
    num(s, i + 1, x + 0.2, y + 0.2);
    T(s, t, { x: x + 0.7, y: y + 0.2, w: w - 0.85, h: 0.42, fontSize: 12, bold: true, valign: 'middle', fit: 'shrink' });
    T(s, why, { x: x + 0.2, y: y + 0.75, w: w - 0.4, h: 0.5, fontSize: 10, color: K.muted });
    T(s, bullets(b, 10), { x: x + 0.2, y: y + 1.3, w: w - 0.4, h: 1.95, color: K.ink });
  });
}
// 5. 필수 4~5 + 사진 찍는 법
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, 'BẮT BUỘC · KHOẢNG 30 PHÚT', '5 thứ cần gửi (2/2)', 'Camera điện thoại là đủ để chụp món. Chỉ cần nhớ phần bên phải.');
  must.slice(3).forEach(([t, why, b], i) => {
    const x = 0.5, y = 1.7 + i * 1.72;
    card(s, x, y, 4.05, 1.57);
    num(s, i + 4, x + 0.2, y + 0.2);
    T(s, t, { x: x + 0.7, y: y + 0.2, w: 3.2, h: 0.38, fontSize: 13, bold: true, valign: 'middle' });
    T(s, why, { x: x + 0.2, y: y + 0.66, w: 3.7, h: 0.28, fontSize: 10, color: K.muted });
    T(s, bullets(b, 10), { x: x + 0.2, y: y + 0.95, w: 3.7, h: 0.6 });
  });
  // 사진 팁
  card(s, 4.75, 1.7, 2.3, 3.29);
  T(s, '✓ Nên', { x: 4.93, y: 1.85, w: 2.0, h: 0.3, fontSize: 12.5, bold: true, color: K.ok });
  T(s, bullets(['Chụp ngang, món lấp đầy khung', 'Ánh sáng tự nhiên, chéo 45 độ', 'Chụp ngay khi món vừa ra', 'Gửi Zalo chọn "HD"'], 10), { x: 4.93, y: 2.2, w: 2.0, h: 1.75 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 4.05, w: 1.2, h: 0.8, rectRadius: 0.06, fill: { color: 'FFFFFF' }, line: { color: K.ink, width: 3 } });
  T(s, '4 : 3', { x: 5.3, y: 4.05, w: 1.2, h: 0.8, fontSize: 13, bold: true, align: 'center', valign: 'middle' });
  card(s, 7.2, 1.7, 2.3, 3.29);
  T(s, '✕ Không nên', { x: 7.38, y: 1.85, w: 2.0, h: 0.3, fontSize: 12.5, bold: true, color: K.accent });
  T(s, bullets(['Ảnh dọc, đĩa bị cắt', 'Ảnh tối, đèn vàng', 'Filter, chữ, logo chèn', 'Ảnh quán khác, trên mạng', 'Ảnh chụp màn hình'], 10), { x: 7.38, y: 2.2, w: 2.0, h: 2.6 });
}

// 6. 선택 항목
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, 'CÓ THÌ TỐT HƠN', 'Thông tin bổ sung', 'Không có vẫn làm được. Có thì thực đơn sẽ chu đáo hơn với khách.');
  const it = [['Wi-Fi cho khách', 'Tên và mật khẩu → hiện trên thực đơn kèm nút sao chép', 'Tùy chọn'], ['Gợi ý & lưu ý món', 'Món gợi ý, độ cay, nguyên liệu (hải sản, đậu phộng), bỏ rau mùi', 'Tùy chọn'],
              ['Lời giới thiệu ngắn', 'Điều quán tự hào, màu sắc, phong cách mong muốn', 'Tùy chọn'], ['Số bàn', 'Để in đúng số thẻ QR. Kệ mica QR tư vấn riêng', 'Tùy chọn'],
              ['Đặt món qua Zalo', 'Khách chọn món, gửi đơn vào Zalo của quán. Cần số Zalo của quán', 'Gói thêm'], ['Gắn Google Maps', 'Chỉ cần mời chúng tôi làm "quản lý" — không cần mật khẩu', 'Tùy chọn']];
  const w = 2.88, h = 1.55, g = 0.18;
  it.forEach(([t, d, tag], i) => {
    const x = 0.5 + (i % 3) * (w + g), y = 1.7 + Math.floor(i / 3) * (h + 0.2);
    card(s, x, y, w, h);
    pill(s, tag, x + 0.2, y + 0.2, 0.8, K.optSoft, K.optInk);
    T(s, t, { x: x + 1.1, y: y + 0.17, w: w - 1.25, h: 0.3, fontSize: 11.5, bold: true, fit: 'shrink' });
    T(s, d, { x: x + 0.2, y: y + 0.6, w: w - 0.4, h: 0.85, fontSize: 10.5, color: K.muted });
  });
}

// 7. 약속
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, 'CAM KẾT', 'Cách chúng tôi làm và giữ lời', 'Thực đơn là gương mặt và bảng giá của quán. Chính xác và bảo vệ thông tin là trên hết.');
  const it = [['Đối chiếu giá 2 lần + chủ quán duyệt', 'Chữ khó đọc thì hỏi lại, không đoán. Còn một giá chưa xác nhận là chưa đưa vào dùng.'],
              ['Chỉ dùng thông tin của quán', 'Không nhận, không lưu số cá nhân, giấy tờ tùy thân hay mật khẩu tài khoản.'],
              ['Chỉ dùng ảnh món thật', 'Không dùng ảnh món ăn do AI tạo làm ảnh thực đơn.'],
              ['Dịch để khách hiểu', 'Mỗi món có tên tiếng Hàn và tiếng Việt, nhân viên nhìn là hiểu ngay.'],
              ['Hỗ trợ cả sau khi mở', 'Tự sửa trên điện thoại hoặc nhắn tin để chúng tôi sửa giúp. Mã QR giữ nguyên.']];
  it.forEach(([t, d], i) => {
    const col = i < 3 ? 0 : 1, row = i < 3 ? i : i - 3;
    const x = 0.5 + col * 4.6, y = 1.7 + row * 1.1, w = 4.4;
    card(s, x, y, w, 0.98);
    num(s, i + 1, x + 0.2, y + 0.27, 0.44, K.ink);
    T(s, t, { x: x + 0.8, y: y + 0.12, w: w - 1.0, h: 0.3, fontSize: 11.5, bold: true, fit: 'shrink' });
    T(s, d, { x: x + 0.8, y: y + 0.43, w: w - 1.0, h: 0.5, fontSize: 9.5, color: K.muted });
  });
  card(s, 5.1, 3.9, 4.4, 1.08, K.soft, 'F2CFC6');
  T(s, 'Khi xem bản mẫu, chỉ cần kiểm tra', { x: 5.3, y: 3.98, w: 4, h: 0.28, fontSize: 11.5, bold: true, color: K.accent });
  T(s, bullets(['Tên món và giá có đúng không — quan trọng nhất', 'Món thiếu, món đã ngừng bán, giờ mở cửa, điện thoại, địa chỉ'], 9.5), { x: 5.3, y: 4.3, w: 4.0, h: 0.62 });
}

// 8. 체크리스트
{
  const s = pres.addSlide({ masterName: 'LIGHT' });
  head(s, 'KIỂM TRA TRƯỚC KHI GỬI', 'Danh sách chuẩn bị', 'Kiểm tra rồi gửi một lần. Gửi làm nhiều lần cũng không sao.');
  const rows = [['Ảnh thực đơn — tất cả các mặt (đồ uống, tờ rời, trên tường)', 'Bắt buộc'], ['Giá đã đổi, món hết, món theo mùa; giá đã gồm VAT/phí phục vụ chưa', 'Bắt buộc'],
                ['Tên quán, địa chỉ, số điện thoại quán, giờ mở cửa, ngày nghỉ, giờ nhận món cuối', 'Bắt buộc'], ['File logo gốc hoặc ảnh biển hiệu chính diện', 'Bắt buộc'],
                ['4–6 ảnh món tiêu biểu (chụp ngang, ánh sáng tự nhiên) + tên món', 'Bắt buộc'], ['Tên và mật khẩu Wi-Fi cho khách', 'Tùy chọn'],
                ['Món gợi ý, độ cay, lưu ý nguyên liệu, lời giới thiệu, phong cách', 'Tùy chọn'], ['Số bàn; số Zalo của quán nếu dùng đặt món qua Zalo', 'Tùy chọn'],
                ['Mời "quản lý" Google Maps nếu muốn gắn link (không cần mật khẩu)', 'Tùy chọn']];
  const hdr = { fontFace: F, bold: true, color: 'FFFFFF', fill: { color: K.ink }, fontSize: 10 };
  const data = [[{ text: '', options: hdr }, { text: 'Nội dung', options: hdr }, { text: 'Loại', options: Object.assign({}, hdr, { align: 'center' }) }]]
    .concat(rows.map(([t, k]) => [{ text: '☐', options: { fontSize: 13, align: 'center', color: K.ink } }, { text: t, options: { fontSize: 10 } },
      { text: k, options: { fontSize: 9.5, bold: true, align: 'center', color: k === 'Bắt buộc' ? K.accent : K.optInk } }]));
  s.addTable(data, { x: 0.5, y: 1.65, w: 9, colW: [0.55, 7.25, 1.2], rowH: 0.34, fontFace: F, color: K.ink, fill: { color: 'FFFFFF' }, border: { type: 'solid', pt: 0.5, color: K.line }, valign: 'middle', margin: [0.03, 0.08, 0.03, 0.08] });
}

// 9. 요금 + 연락처
{
  const s = pres.addSlide({ masterName: 'DARK' });
  T(s, 'BẢNG GIÁ · TƯ VẤN', { x: 0.5, y: 0.35, w: 9, h: 0.25, fontSize: 10, bold: true, color: K.accent });
  T(s, 'Bảng giá và liên hệ', { x: 0.5, y: 0.6, w: 6, h: 0.55, fontSize: 26, bold: true, color: 'FFFFFF' });
  T(s, 'Đơn vị: đồng (VND), tháng 11/2026', { x: 0.5, y: 1.18, w: 9, h: 0.3, fontSize: 12, color: 'B9B0A3' });
  const hdr = { fontFace: F, bold: true, color: 'FFFFFF', fill: { color: '3A332B' }, fontSize: 10 };
  const r = (a, b, c) => [{ text: a, options: { bold: true, fontSize: 11 } }, { text: b, options: { fontSize: 9 } }, { text: c, options: { bold: true, align: 'right', fontSize: 10.5 } }];
  s.addTable([[{ text: 'Gói', options: hdr }, { text: 'Bao gồm', options: hdr }, { text: 'Giá', options: Object.assign({}, hdr, { align: 'right' }) }],
    r('Cơ bản', 'Thực đơn 5 ngôn ngữ, dùng ảnh thực đơn và logo sẵn có, thẻ QR (PDF), 2 ảnh SNS, nút Wi-Fi · gọi điện · bản đồ', '2.500.000 (1 lần)'),
    r('Cao cấp', 'Toàn bộ gói Cơ bản + thiết kế riêng, sắp xếp ảnh món, sửa bản mẫu, 2 video quảng cáo SNS', '5.000.000 (1 lần)'),
    r('Quản lý', 'Duy trì web, trang sửa, tự sửa không giới hạn, nhờ sửa 2 lần/tháng, báo cáo lượt xem (3.500.000/năm = tặng 2 tháng)', '350.000 / tháng'),
    r('Gói thêm', 'Đặt món qua Zalo (giỏ hàng) +2.500.000 · Tên miền riêng từ 500.000/năm · Kệ mica, gọi món tại bàn: tư vấn riêng', 'Riêng')],
    { x: 0.5, y: 1.6, w: 9, colW: [1.1, 6.0, 1.9], rowH: 0.46, fontFace: F, color: K.ink, fill: { color: 'FFFFFF' }, border: { type: 'solid', pt: 0.5, color: K.line }, valign: 'middle', margin: [0.03, 0.09, 0.03, 0.09] });
  T(s, '※ Khi ngừng gói quản lý, trang thực đơn cũng ngừng hoạt động.', { x: 0.5, y: 4.05, w: 9, h: 0.25, fontSize: 9.5, color: 'B9B0A3' });
  card(s, 0.5, 4.4, 4.4, 0.9, K.dark2, K.dark2); card(s, 5.1, 4.4, 4.4, 0.9, K.dark2, K.dark2);
  T(s, [{ text: 'Tư vấn tiếng Việt', options: { bold: true, color: 'FFB7A8', breakLine: true } }, { text: 'Điện thoại · Zalo 0937 250 787 · qrmenuasia.com', options: { color: 'FFFFFF' } }], { x: 0.7, y: 4.5, w: 4.1, h: 0.7, fontSize: 11.5, valign: 'middle' });
  T(s, [{ text: 'Tư vấn tiếng Hàn (한국어)', options: { bold: true, color: 'FFB7A8', breakLine: true } }, { text: 'Điện thoại · Zalo 0917 302 200 · KakaoTalk jjw4164', options: { color: 'FFFFFF' } }], { x: 5.3, y: 4.5, w: 4.1, h: 0.7, fontSize: 11.5, valign: 'middle' });
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
      x = x.replace(/lang="en-US"/g, 'lang="vi-VN" altLang="en-US"');
      x = x.replace(/<a:p>(?!<a:pPr)/g, '<a:p><a:pPr eaLnBrk="0" latinLnBrk="0"/>');
      data = Buffer.from(x, 'utf8');
    }
    z2.file(name, data, { createFolders: false });
  }
  fs.writeFileSync(out, await z2.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
  console.log('완료', out);
})();
