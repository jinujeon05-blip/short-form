// 손님 메뉴판: 시크릿 고객 소리함 (2026-11-18 캡틴 가-1·나-1·다-1·라-1, api/override 가 window.QM_VOICE 를 넣고 이 파일을 불러온다)
// - 테이블 QR(?t=&k=)로 들어온 손님에게만 보인다(2026-11-18 캡틴 가-2). 서버도 테이블 열쇠가 맞아야 받는다.
// - 메뉴 맨 아래 '💬 오늘 식사는 어떠셨나요?' 버튼(늘 있음) + 직원 호출에서 '계산서'를 누르면 한 번 뜬다(같은 날 이미 보냈으면 안 뜸).
// - 별점 1~5 + 한마디 → /api/loyal op:'voice'. 1~3점은 주방 화면에 '불만 알림'.
// - 구글 리뷰 버튼은 별점과 상관없이 모두에게 같은 문구로 보인다(구글 지도 정책: 부정 리뷰를 막거나 긍정 리뷰만 골라 요청 금지).
(function () {
  var C = window.QM_VOICE;
  if (!C || C._done) return;
  C._done = 1;
  var T = {
    ko: { btn: '오늘 식사는 어떠셨나요?', title: '오늘 식사는 어떠셨나요?', sub: '사장님만 보는 의견이에요. 편하게 알려 주세요.', stars: ['별로였어요', '아쉬웠어요', '보통이에요', '좋았어요', '최고예요'], ph: '하고 싶은 말 (선택)', phLow: '무엇이 불편하셨나요? (선택)', table: '테이블', badKey: '테이블 QR을 다시 찍어 주세요.', send: '보내기', pick: '별을 눌러 주세요', thanks: '소중한 의견 고마워요!', sorry: '불편을 드려 죄송해요. 사장님께 바로 전했어요.', come: '직원이 곧 찾아갈게요.', review: '구글 지도에 솔직한 후기를 남겨 주셔도 좋아요.', reviewBtn: 'Google 리뷰 쓰기', close: '닫기', fail: '보내지 못했어요. 잠시 뒤 다시 시도해 주세요.', many: '조금 뒤에 다시 보내 주세요.' },
    vi: { btn: 'Bữa ăn hôm nay thế nào?', title: 'Bữa ăn hôm nay thế nào?', sub: 'Chỉ chủ quán đọc ý kiến này. Cứ thoải mái chia sẻ nhé.', stars: ['Không ngon', 'Chưa hài lòng', 'Bình thường', 'Ngon', 'Tuyệt vời'], ph: 'Bạn muốn nói gì thêm? (không bắt buộc)', phLow: 'Bạn chưa hài lòng điều gì? (không bắt buộc)', table: 'Bàn', badKey: 'Vui lòng quét lại mã QR trên bàn.', send: 'Gửi', pick: 'Hãy chọn số sao', thanks: 'Cảm ơn ý kiến của bạn!', sorry: 'Xin lỗi vì đã làm bạn không hài lòng. Chúng tôi đã báo ngay cho chủ quán.', come: 'Nhân viên sẽ đến bàn bạn ngay.', review: 'Bạn cũng có thể để lại đánh giá thật lòng trên Google Maps.', reviewBtn: 'Viết đánh giá Google', close: 'Đóng', fail: 'Không gửi được. Vui lòng thử lại sau.', many: 'Vui lòng gửi lại sau ít phút.' },
    en: { btn: 'How was your meal today?', title: 'How was your meal today?', sub: 'Only the owner reads this. Feel free to tell us anything.', stars: ['Bad', 'Disappointing', 'Okay', 'Good', 'Excellent'], ph: 'Anything to tell us? (optional)', phLow: 'What went wrong? (optional)', table: 'Table', badKey: 'Please scan the table QR again.', send: 'Send', pick: 'Please tap a star', thanks: 'Thank you for your feedback!', sorry: 'We are sorry. The owner has been told right away.', come: 'A staff member will come to you shortly.', review: 'You are also welcome to leave an honest review on Google Maps.', reviewBtn: 'Write a Google review', close: 'Close', fail: 'Could not send. Please try again later.', many: 'Please try again in a few minutes.' },
    zh: { btn: '今天的用餐还满意吗？', title: '今天的用餐还满意吗？', sub: '只有店主会看到，请放心告诉我们。', stars: ['不好', '不太满意', '一般', '不错', '非常好'], ph: '想说的话（可不填）', phLow: '哪里让您不满意？（可不填）', table: '桌号', badKey: '请重新扫描桌上的二维码。', send: '发送', pick: '请点选星星', thanks: '谢谢您的宝贵意见！', sorry: '非常抱歉，已立即转告店主。', come: '服务员马上过来。', review: '也欢迎您在 Google 地图留下真实评价。', reviewBtn: '写 Google 评价', close: '关闭', fail: '发送失败，请稍后再试。', many: '请过几分钟再发送。' },
    ja: { btn: '本日のお食事はいかがでしたか？', title: '本日のお食事はいかがでしたか？', sub: 'オーナーだけが読むご意見です。お気軽にどうぞ。', stars: ['よくなかった', '残念だった', 'ふつう', 'よかった', '最高'], ph: 'ご意見（任意）', phLow: '何がご不満でしたか？（任意）', table: 'テーブル', badKey: 'テーブルのQRをもう一度読み取ってください。', send: '送信', pick: '星を選んでください', thanks: '貴重なご意見ありがとうございます！', sorry: 'ご不便をおかけして申し訳ありません。すぐにオーナーに伝えました。', come: 'スタッフがすぐに伺います。', review: 'Google マップに率直なレビューを書いていただくこともできます。', reviewBtn: 'Google レビューを書く', close: '閉じる', fail: '送信できませんでした。しばらくしてからもう一度お試しください。', many: '数分後にもう一度お送りください。' },
  };
  var SENT = 'qm_voice_' + C.shop;
  function lang() { var l = (document.documentElement.lang || '').toLowerCase().split('-')[0]; return T[l] ? l : 'en'; }
  function t(k) { return T[lang()][k]; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function today() { return new Date().toISOString().slice(0, 10); }
  function sentToday() { try { return localStorage.getItem(SENT) === today(); } catch (e) { return false; } }
  // 테이블 QR(?t=5&k=열쇠)로 들어온 손님만 소리함을 쓴다(캡틴 가-2, 2026-11-18 — 가게 밖에서 가짜 불만으로 주방을 울리는 것 막기).
  // 주소에 없으면 주문서(order.js)가 6시간 저장해 둔 테이블 열쇠를 쓴다.
  function tableKey() {
    var q = new URLSearchParams(location.search), t = q.get('t') || q.get('table'), k = q.get('k');
    if (t && k) return { table: t.slice(0, 12), k: k.slice(0, 20) };
    try { var s = JSON.parse(localStorage.getItem('qo-cart-v1') || 'null'); if (s && Date.now() - s.t < 6 * 3600e3 && s.tkey && s.tkey.table && s.tkey.k) return { table: String(s.tkey.table).slice(0, 12), k: String(s.tkey.k).slice(0, 20) }; } catch (e) {}
    return null;
  }
  var TK = null;

  var css = document.createElement('style');
  css.textContent = '#qm-voice{max-width:760px;margin:18px auto 8px;padding:0 12px;position:relative;z-index:1}' +
    '#qm-voice button{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:1px solid rgba(128,128,128,.35);background:rgba(128,128,128,.08);color:inherit;border-radius:12px;padding:12px 14px;font:inherit;font-weight:700;cursor:pointer}' +
    '.qm-vm{position:fixed;inset:0;z-index:2147483002;display:grid;place-items:center;padding:16px;background:rgba(10,10,10,.6)}' +
    '.qm-vm .bx{width:100%;max-width:400px;max-height:calc(100vh - 32px);overflow:auto;background:#fff;color:#1f2430;border-radius:18px;padding:20px;font-size:15px;line-height:1.45;box-shadow:0 20px 50px rgba(0,0,0,.35);font-family:inherit}' +
    '.qm-vm h3{margin:0 0 4px;font-size:19px;text-align:center}.qm-vm .sub{margin:0 0 12px;color:#6b6b6b;font-size:13.5px;text-align:center}' +
    '.qm-vm .st{display:flex;justify-content:center;gap:4px;margin:6px 0 2px}.qm-vm .st button{border:0;background:none;padding:2px 3px;font-size:38px;line-height:1;cursor:pointer;color:#d5d0c6;transition:transform .1s}' +
    '.qm-vm .st button.on{color:#f5a400}.qm-vm .st button:active{transform:scale(1.15)}.qm-vm .sl{text-align:center;font-weight:800;min-height:22px;color:#444;margin-bottom:8px}' +
    '.qm-vm textarea,.qm-vm input{width:100%;box-sizing:border-box;font:inherit;font-size:16px;border:1px solid #d9d2c4;border-radius:10px;padding:9px 11px;margin-top:8px;background:#fff;color:#1f2430}.qm-vm textarea{min-height:76px;resize:vertical}' +
    '.qm-vm .act{width:100%;margin-top:12px;font:inherit;font-weight:800;font-size:16px;border:0;border-radius:12px;padding:12px;cursor:pointer;background:#e8590c;color:#fff}.qm-vm .act:disabled{opacity:.5}' +
    '.qm-vm .cl{width:100%;margin-top:8px;font:inherit;font-weight:700;border:0;border-radius:12px;padding:10px;cursor:pointer;background:#f1ece3;color:#1f2430}' +
    '.qm-vm .tl{margin:10px 0 0;font-size:14px;font-weight:700;color:#555;text-align:center}.qm-vm .msg{min-height:20px;margin-top:6px;color:#e03131;font-size:14px;text-align:center}.qm-vm .ok{font-size:44px;text-align:center;margin:4px 0}' +
    '.qm-vm .note{background:#fff3e0;color:#9a4a00;border-radius:12px;padding:10px 12px;font-weight:700;margin:10px 0}.qm-vm .rv{margin:12px 0 0;color:#555;text-align:center}' +
    '.qm-vm .gbtn{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:8px;text-decoration:none;font-weight:800;border:1px solid #dadce0;border-radius:12px;padding:11px;color:#1f2430;background:#fff}';
  document.head.appendChild(css);

  function modal() {
    var old = document.querySelector('.qm-vm'); if (old) old.remove();
    var m = document.createElement('div'); m.className = 'qm-vm';
    m.innerHTML = '<div class="bx" role="dialog" aria-modal="true"></div>';
    m.addEventListener('click', function (e) { if (e.target === m || (e.target.classList && e.target.classList.contains('cl'))) m.remove(); });
    document.body.appendChild(m);
    return m;
  }
  function reviewHtml() {
    if (!C.review) return '';
    return '<p class="rv">' + esc(t('review')) + '</p><a class="gbtn" href="' + esc(C.review) + '" target="_blank" rel="noopener">⭐ ' + esc(t('reviewBtn')) + '</a>';
  }
  function open() {
    var m = modal(), bx = m.querySelector('.bx'), stars = 0;
    var sb = ''; for (var i = 1; i <= 5; i++) sb += '<button type="button" data-s="' + i + '" aria-label="' + i + '">★</button>';
    bx.innerHTML = '<h3>💬 ' + esc(t('title')) + '</h3><p class="sub">🔒 ' + esc(t('sub')) + '</p><div class="st">' + sb + '</div><div class="sl" id="qv-sl"></div>' +
      '<textarea id="qv-tx" maxlength="300" placeholder="' + esc(t('ph')) + '"></textarea><p class="tl">🪑 ' + esc(t('table')) + ' ' + esc(TK.table) + '</p>' +
      '<button type="button" class="act" id="qv-go">' + esc(t('send')) + '</button><div class="msg" id="qv-m"></div><button type="button" class="cl">' + esc(t('close')) + '</button>';
    var q = function (s) { return bx.querySelector(s); };
    q('.st').onclick = function (e) {
      var b = e.target.closest('button'); if (!b) return;
      stars = Number(b.dataset.s);
      bx.querySelectorAll('.st button').forEach(function (x) { x.classList.toggle('on', Number(x.dataset.s) <= stars); });
      q('#qv-sl').textContent = t('stars')[stars - 1];
      q('#qv-tx').placeholder = stars <= 3 ? t('phLow') : t('ph');
      q('#qv-m').textContent = '';
    };
    q('#qv-go').onclick = function () {
      if (!stars) { q('#qv-m').textContent = t('pick'); return; }
      var go = q('#qv-go'); go.disabled = true;
      fetch(C.base + '/api/loyal', { method: 'POST', headers: { 'content-type': 'text/plain' }, body: JSON.stringify({ op: 'voice', shop: C.shop, stars: stars, text: q('#qv-tx').value.trim(), table: TK.table, k: TK.k, lang: lang() }) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j._s = r.status; return j; }); })
        .then(function (j) {
          if (!j.ok) { go.disabled = false; q('#qv-m').textContent = j._s === 429 ? t('many') : j._s === 403 ? t('badKey') : t('fail'); return; }
          try { localStorage.setItem(SENT, today()); } catch (e) {}
          bx.innerHTML = '<div class="ok">' + (stars <= 3 ? '🙏' : '😊') + '</div><h3>' + esc(t('thanks')) + '</h3>' +
            (stars <= 3 ? '<div class="note">' + esc(t('sorry')) + (j.alerted ? ' ' + esc(t('come')) : '') + '</div>' : '') +
            reviewHtml() + '<button type="button" class="cl">' + esc(t('close')) + '</button>';
        })
        .catch(function () { go.disabled = false; q('#qv-m').textContent = t('fail'); });
    };
  }

  var box;
  function render() { if (box) box.innerHTML = '<button type="button" id="qm-vb">💬 ' + esc(t('btn')) + '</button>'; }
  function start() {
    TK = tableKey();
    if (!TK) return; // 테이블 QR 없이 들어옴(가게 찾기·검색·링크) → 소리함 안 보임
    box = document.createElement('div'); box.id = 'qm-voice';
    var menu = document.getElementById('menu');
    if (menu && menu.parentNode) menu.parentNode.insertBefore(box, menu.nextSibling); else document.body.appendChild(box);
    render();
    box.addEventListener('click', function (e) { if (e.target.closest('#qm-vb')) open(); });
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    // 직원 호출에서 '계산서'를 누르면(주문서 order.js) 잠깐 뒤 한 번 묻는다. 오늘 이미 보냈으면 안 묻는다.
    var asked = false;
    document.addEventListener('click', function (e) {
      var b = e.target && e.target.closest && e.target.closest('[data-req="bill"]');
      if (!b || asked || sentToday()) return;
      asked = true;
      setTimeout(function () { if (!document.querySelector('.qm-vm')) open(); }, 1600);
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
