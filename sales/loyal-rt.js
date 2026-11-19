// 손님 메뉴판: 오늘의 할인 배너 + 단골 도장 카드 (2026-11-17, api/override 가 window.QM_LOYAL 을 넣고 이 파일을 불러온다)
// 카드 번호는 이 가게 주소의 localStorage 'qm_card_<가게>'. 카운터 QR(?stamp= / ?use=)로 들어오면 도장·혜택 사용을 처리한다.
(function () {
  var C = window.QM_LOYAL;
  if (!C || C._done) return;
  C._done = 1;
  var T = {
    ko: { stamp: '도장', card: '내 도장 카드', how: '계산할 때 카운터의 도장 QR을 찍으면 1개씩 쌓여요 (하루 1번)', goal: function (g, r) { return g + '개 모으면 ' + r; }, ready: '혜택을 받을 수 있어요! 직원에게 "혜택 사용" QR을 보여 달라고 하세요.', got: '도장 1개를 받았어요', dup: '오늘은 이미 도장을 받았어요', exp: 'QR 시간이 지났어요. 카운터 QR을 다시 찍어 주세요.', used: '혜택 사용 완료', usedSub: '이 화면을 직원에게 보여 주세요', notEnough: '도장이 아직 모자라요', fail: '잠시 뒤 다시 시도해 주세요', code: '복구 번호', codeHint: '폰을 바꾸면 이 번호로 도장을 다시 불러올 수 있어요', restore: '복구 번호로 불러오기', restoreBtn: '불러오기', noCard: '그 번호의 카드가 없어요', close: '닫기', off: '지금은 적립을 쉬고 있어요' },
    vi: { stamp: 'Tem', card: 'Thẻ tích tem', how: 'Khi thanh toán, quét mã QR tích tem ở quầy để nhận 1 tem (mỗi ngày 1 lần)', goal: function (g, r) { return 'Đủ ' + g + ' tem: ' + r; }, ready: 'Bạn đã đủ tem! Hãy nhờ nhân viên mở mã QR "Dùng ưu đãi".', got: 'Bạn nhận được 1 tem', dup: 'Hôm nay bạn đã nhận tem rồi', exp: 'Mã QR đã hết hạn. Vui lòng quét lại mã ở quầy.', used: 'Đã dùng ưu đãi', usedSub: 'Hãy đưa màn hình này cho nhân viên', notEnough: 'Bạn chưa đủ tem', fail: 'Vui lòng thử lại sau', code: 'Mã khôi phục', codeHint: 'Đổi điện thoại vẫn lấy lại tem bằng mã này', restore: 'Khôi phục bằng mã', restoreBtn: 'Khôi phục', noCard: 'Không có thẻ với mã này', close: 'Đóng', off: 'Hiện quán tạm dừng tích tem' },
    en: { stamp: 'Stamps', card: 'My stamp card', how: 'Scan the stamp QR at the counter when you pay to get 1 stamp (once a day)', goal: function (g, r) { return g + ' stamps: ' + r; }, ready: 'You can get your reward! Ask the staff to show the "Use reward" QR.', got: 'You got 1 stamp', dup: 'You already got a stamp today', exp: 'This QR has expired. Please scan the counter QR again.', used: 'Reward used', usedSub: 'Show this screen to the staff', notEnough: 'Not enough stamps yet', fail: 'Please try again later', code: 'Recovery code', codeHint: 'Use this code to get your stamps back on a new phone', restore: 'Restore with a code', restoreBtn: 'Restore', noCard: 'No card with that code', close: 'Close', off: 'Stamps are paused right now' },
    zh: { stamp: '印章', card: '我的集章卡', how: '结账时扫描柜台的集章二维码，每次得1个章（每天1次）', goal: function (g, r) { return '集满' + g + '个：' + r; }, ready: '可以领取优惠了！请让店员出示「使用优惠」二维码。', got: '获得1个印章', dup: '今天已经领过印章了', exp: '二维码已过期，请重新扫描柜台二维码。', used: '优惠已使用', usedSub: '请把此画面给店员看', notEnough: '印章还不够', fail: '请稍后再试', code: '恢复码', codeHint: '换手机后可用此码找回印章', restore: '用恢复码找回', restoreBtn: '找回', noCard: '没有这个号码的卡', close: '关闭', off: '暂停集章中' },
    ja: { stamp: 'スタンプ', card: 'スタンプカード', how: 'お会計のときにカウンターのスタンプQRを読み取ると1個たまります（1日1回）', goal: function (g, r) { return g + '個で' + r; }, ready: '特典が使えます！スタッフに「特典を使う」QRを見せてもらってください。', got: 'スタンプを1個もらいました', dup: '今日はもうスタンプをもらっています', exp: 'QRの有効時間が過ぎました。カウンターのQRをもう一度読み取ってください。', used: '特典を使いました', usedSub: 'この画面をスタッフに見せてください', notEnough: 'スタンプがまだ足りません', fail: 'しばらくしてからもう一度お試しください', code: '復元番号', codeHint: '機種変更してもこの番号でスタンプを戻せます', restore: '復元番号で読み込む', restoreBtn: '読み込む', noCard: 'その番号のカードはありません', close: '閉じる', off: '現在スタンプはお休み中です' },
  };
  var KEY = 'qm_card_' + C.shop;
  var st = { n: 0, card: '' };
  try { st.card = localStorage.getItem(KEY) || ''; } catch (e) {}
  function lang() { var l = (document.documentElement.lang || '').toLowerCase().split('-')[0]; return T[l] ? l : 'en'; }
  function t(k) { return T[lang()][k]; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function save(card) { st.card = card; try { localStorage.setItem(KEY, card); } catch (e) {} }
  function api(body) {
    return fetch(C.base + '/api/loyal', { method: 'POST', headers: { 'content-type': 'text/plain' }, body: JSON.stringify(Object.assign({ shop: C.shop, card: st.card }, body)) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j._s = r.status; return j; }); });
  }

  var css = document.createElement('style');
  css.textContent = '#qm-loyal{margin:10px auto 14px;max-width:760px;padding:0 12px;font-family:inherit}' +
    '#qm-loyal .qm-bn{border:1px solid rgba(255,170,0,.55);background:rgba(255,190,40,.16);color:inherit;border-radius:12px;padding:10px 14px;font-weight:700;line-height:1.4;margin-bottom:8px}' +
    '#qm-loyal .qm-st{display:flex;align-items:center;gap:10px;width:100%;border:1px solid rgba(128,128,128,.35);background:rgba(128,128,128,.08);color:inherit;border-radius:12px;padding:9px 12px;font:inherit;text-align:left;cursor:pointer}' +
    '#qm-loyal .qm-st b{white-space:nowrap}#qm-loyal .qm-st span{flex:1;font-size:13px;opacity:.85;line-height:1.35}#qm-loyal .qm-st i{font-style:normal;font-weight:800;white-space:nowrap}' +
    '.qm-lm{position:fixed;inset:0;z-index:2147483001;display:grid;place-items:center;padding:16px;background:rgba(10,10,10,.6)}' +
    '.qm-lm .bx{width:100%;max-width:380px;background:#fff;color:#1f2430;border-radius:18px;padding:20px;font-size:15px;line-height:1.45;box-shadow:0 20px 50px rgba(0,0,0,.35)}' +
    '.qm-lm h3{margin:0 0 4px;font-size:19px}.qm-lm p{margin:6px 0;color:#555}.qm-lm .big{font-size:22px;font-weight:900;color:#1f2430;text-align:center;margin:8px 0}' +
    '.qm-lm .dots{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:14px 0}.qm-lm .dots b{aspect-ratio:1;border-radius:50%;border:2px dashed #d9d2c4;display:grid;place-items:center;font-size:18px}' +
    '.qm-lm .dots b.on{border:0;background:#e8590c;color:#fff}.qm-lm .ok{background:#e9f7ef;color:#1f8a4c;border-radius:12px;padding:10px;font-weight:700;margin:8px 0}' +
    '.qm-lm .code{font-weight:800;font-size:18px;letter-spacing:2px}.qm-lm .row{display:flex;gap:6px;margin-top:6px}' +
    '.qm-lm input{flex:1;min-width:0;font:inherit;font-size:16px;border:1px solid #d9d2c4;border-radius:10px;padding:8px 10px;text-transform:lowercase}' +
    '.qm-lm button{font:inherit;font-weight:700;border:0;border-radius:10px;padding:9px 14px;cursor:pointer;background:#f1ece3;color:#1f2430}.qm-lm .cl{width:100%;margin-top:14px;background:#1f2430;color:#fff}' +
    '.qm-lm details{margin-top:10px;font-size:14px}.qm-lm .done{text-align:center;font-size:44px;margin:4px 0}';
  document.head.appendChild(css);

  var box;
  function render() {
    if (!box) return;
    var h = '';
    if (C.banner) h += '<div class="qm-bn">📣 ' + esc(C.banner) + '</div>';
    if (C.on) h += '<button type="button" class="qm-st" id="qm-st"><b>🎁 ' + esc(t('stamp')) + '</b><span>' + esc(t('goal')(C.goal, C.reward)) + '</span><i>' + Math.max(0, st.n) + ' / ' + C.goal + '</i></button>';
    box.innerHTML = h;
    var b = document.getElementById('qm-st');
    if (b) b.onclick = function () { cardModal(); };
  }
  function modal(html) {
    var old = document.querySelector('.qm-lm'); if (old) old.remove();
    var m = document.createElement('div'); m.className = 'qm-lm';
    m.innerHTML = '<div class="bx">' + html + '<button type="button" class="cl">' + esc(t('close')) + '</button></div>';
    m.addEventListener('click', function (e) { if (e.target === m || e.target.classList.contains('cl')) m.remove(); });
    document.body.appendChild(m);
    return m;
  }
  function dots() {
    var h = '<div class="dots">';
    for (var i = 0; i < C.goal; i++) h += '<b class="' + (i < st.n ? 'on' : '') + '">' + (i < st.n ? '✓' : '') + '</b>';
    return h + '</div>';
  }
  function fmt(c) { return c ? c.slice(0, 4) + '-' + c.slice(4) : ''; }
  function cardModal(note) {
    var h = '<h3>🎁 ' + esc(t('card')) + '</h3>' + (note || '') + '<p>' + esc(t('goal')(C.goal, C.reward)) + '</p>' + dots() +
      '<div class="big">' + Math.max(0, st.n) + ' / ' + C.goal + '</div>' +
      (st.n >= C.goal ? '<div class="ok">' + esc(t('ready')) + '</div>' : '<p>' + esc(t('how')) + '</p>');
    if (st.card) h += '<p style="margin-top:12px">' + esc(t('code')) + ': <span class="code">' + fmt(st.card) + '</span><br><small>' + esc(t('codeHint')) + '</small></p>';
    h += '<details><summary>' + esc(t('restore')) + '</summary><div class="row"><input id="qm-rc" maxlength="9" autocomplete="off" placeholder="abcd-efgh"><button type="button" id="qm-rb">' + esc(t('restoreBtn')) + '</button></div><p id="qm-rm"></p></details>';
    var m = modal(h);
    m.querySelector('#qm-rb').onclick = function () {
      var v = m.querySelector('#qm-rc').value.toLowerCase().replace(/[^a-z0-9]/g, '');
      api({ op: 'restore', card: v }).then(function (j) {
        if (j.ok) { save(j.card); st.n = j.n; render(); cardModal(); }
        else m.querySelector('#qm-rm').textContent = j._s === 404 || j._s === 400 ? t('noCard') : t('fail');
      }).catch(function () { m.querySelector('#qm-rm').textContent = t('fail'); });
    };
  }
  function fromQr() {
    var q = new URLSearchParams(location.search), give = q.get('stamp'), use = q.get('use');
    if (!give && !use) return false;
    q.delete('stamp'); q.delete('use');
    try { history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : '') + location.hash); } catch (e) {}
    if (!C.on) { modal('<p>' + esc(t('off')) + '</p>'); return true; }
    api(give ? { op: 'stamp', code: give } : { op: 'use', code: use }).then(function (j) {
      if (j.card) save(j.card);
      if (typeof j.n === 'number') st.n = j.n;
      render();
      if (j.used) return modal('<div class="done">✅</div><h3 style="text-align:center">' + esc(t('used')) + '</h3><div class="big">' + esc(j.reward || C.reward) + '</div><p style="text-align:center">' + esc(t('usedSub')) + '</p><p style="text-align:center;color:#999">' + new Date().toLocaleString() + '</p>');
      if (j._s === 410) return modal('<p>' + esc(t('exp')) + '</p>');
      if (j.error === 'not_enough') return cardModal('<div class="ok" style="background:#fff3e0;color:#b45309">' + esc(t('notEnough')) + '</div>');
      if (j.ok) return cardModal('<div class="ok">' + esc(j.dup ? t('dup') : '✓ ' + t('got')) + '</div>');
      modal('<p>' + esc(t('fail')) + '</p>');
    }).catch(function () { modal('<p>' + esc(t('fail')) + '</p>'); });
    return true;
  }
  function refresh() {
    if (!C.on || !st.card) return;
    fetch(C.base + '/api/loyal?shop=' + encodeURIComponent(C.shop) + '&card=' + encodeURIComponent(st.card))
      .then(function (r) { return r.json(); }).then(function (j) { if (typeof j.n === 'number') { st.n = j.n; render(); } }).catch(function () {});
  }
  function start() {
    box = document.createElement('div'); box.id = 'qm-loyal';
    var menu = document.getElementById('menu');
    if (menu && menu.parentNode) menu.parentNode.insertBefore(box, menu); else document.body.insertBefore(box, document.body.firstChild);
    render();
    if (!fromQr()) refresh();
    // 손님이 언어를 바꾸면 글자도 바꾼다
    new MutationObserver(function () { render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
