// 매출 화면(점주 화면 '매출' 버튼 · 관리 화면 '매출' 탭 공용). 2026-11-16 캡틴 결정 가-1·나-1·다-2.
// 달력에서 날짜를 누르면 그날 주문 수·매출·잘 팔린 음식 순위·시간대별 주문, 기간(최근 7일·이번 달·지난달·직접 고르기)도 같은 모양.
// 엑셀 CSV(음식별 = 날짜×음식 한 줄씩, 일별 합계)로 내려받아 리포트 데이터로 쓴다.
// 데이터: GET /api/owner?shop=&op=sales&from=&to= (주방 주문 기록, 취소 뺌). Revenue.mount(el, { shop, ui, headers, onAuthFail })
(function () {
  const T = {
    ko: {
      title: '매출', month: (y, m) => `${y}년 ${m}월`, wk: ['월', '화', '수', '목', '금', '토', '일'], monthAll: '이 달 전체 보기',
      today: '오늘', yday: '어제', last7: '최근 7일', thisM: '이번 달', lastM: '지난달', show: '보기', from: '시작', to: '끝',
      sales: '매출', orders: '주문', avg: '주문 평균', cnt: (n) => `${n}건`, rank: '잘 팔린 음식', byQ: '수량순', byA: '매출순',
      food: '음식', qty: '수량', amt: '매출', share: '비중', hours: '시간대별 주문', daily: '날짜별 매출', none: '이 기간에는 주문이 없어요',
      csvF: '음식별 CSV', csvD: '날짜별 CSV', loading: '불러오는 중…', fail: '불러오지 못했어요. 잠시 뒤 다시 눌러 주세요.', reload: '새로 고침',
      cancelled: (n) => `취소 ${n}건은 뺐어요`, open: (n) => `아직 완료 안 된 주문 ${n}건 포함`, market: (n) => `가격 미정(시가) ${n}개는 매출에 안 들어가요`,
      live: '오늘·어제는 주문이 더 들어오거나 바뀔 수 있어요', note: '손님이 메뉴판에서 주방으로 보낸 주문만 셉니다(주방 주문을 켠 날부터).',
      tooLong: '기간은 93일까지 볼 수 있어요', day: (d) => { const x = new Date(d + 'T00:00:00Z'); return `${x.getUTCMonth() + 1}월 ${x.getUTCDate()}일 (${'일월화수목금토'[x.getUTCDay()]})`; },
      csv: { date: '날짜', food: '음식', sub: '다른 언어 이름', qty: '수량', mq: '가격 미정 수량', amt: '매출', orders: '주문 수', avg: '주문 평균', cancel: '취소', open: '미완료' },
    },
    vi: {
      title: 'Doanh thu', month: (y, m) => `Tháng ${m}/${y}`, wk: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], monthAll: 'Xem cả tháng',
      today: 'Hôm nay', yday: 'Hôm qua', last7: '7 ngày qua', thisM: 'Tháng này', lastM: 'Tháng trước', show: 'Xem', from: 'Từ', to: 'Đến',
      sales: 'Doanh thu', orders: 'Đơn', avg: 'TB mỗi đơn', cnt: (n) => `${n} đơn`, rank: 'Món bán chạy', byQ: 'Theo số lượng', byA: 'Theo doanh thu',
      food: 'Món', qty: 'SL', amt: 'Doanh thu', share: 'Tỷ lệ', hours: 'Đơn theo giờ', daily: 'Doanh thu theo ngày', none: 'Không có đơn trong khoảng này',
      csvF: 'CSV theo món', csvD: 'CSV theo ngày', loading: 'Đang tải…', fail: 'Không tải được. Vui lòng thử lại sau.', reload: 'Tải lại',
      cancelled: (n) => `Đã bỏ ${n} đơn bị hủy`, open: (n) => `Gồm ${n} đơn chưa hoàn thành`, market: (n) => `${n} món thời giá không tính vào doanh thu`,
      live: 'Hôm nay và hôm qua có thể còn thay đổi', note: 'Chỉ tính đơn khách gửi vào bếp từ thực đơn (từ ngày bật gọi món).',
      tooLong: 'Chỉ xem tối đa 93 ngày', day: (d) => { const x = new Date(d + 'T00:00:00Z'); return `${['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][x.getUTCDay()]}, ${x.getUTCDate()}/${x.getUTCMonth() + 1}`; },
      csv: { date: 'Ngày', food: 'Món', sub: 'Tên khác', qty: 'Số lượng', mq: 'SL thời giá', amt: 'Doanh thu', orders: 'Số đơn', avg: 'TB mỗi đơn', cancel: 'Hủy', open: 'Chưa xong' },
    },
  };
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const DAY = 86400000;
  const iso = (t) => new Date(t).toISOString().slice(0, 10);
  const add = (d, n) => iso(Date.parse(d + 'T00:00:00Z') + n * DAY);
  const span = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / DAY) + 1;
  const vnToday = () => iso(Date.now() + 7 * 3600e3);
  const num = (n) => Math.round(n || 0).toLocaleString('en-US');
  const short = (n) => (n >= 1e9 ? (n / 1e9).toFixed(n >= 1e10 ? 0 : 1) + 'B' : n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 0 : 1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'K' : String(Math.round(n)));

  const CSS = `
  .rv{--rv-a:var(--accent,#e8590c);--rv-l:var(--line,#e7e0d2);--rv-m:var(--muted,#7a7466);--rv-c:var(--card,#fff);--rv-b:var(--bg,#f6f3ee);display:grid;gap:12px;min-width:0}
  .rv *{box-sizing:border-box}.rv .c{background:var(--rv-c);border:1px solid var(--rv-l);border-radius:14px;padding:14px;min-width:0}
  .rv h3{margin:0 0 10px;font-size:16px}.rv .mut{color:var(--rv-m);font-size:13px}
  .rv .ch{display:flex;align-items:center;gap:8px;margin-bottom:8px}.rv .ch b{flex:1;text-align:center;font-size:17px}
  .rv button{font:inherit;cursor:pointer;color:inherit}
  .rv .nav{border:1px solid var(--rv-l);background:var(--rv-b);border-radius:10px;width:38px;height:34px;font-size:18px}
  .rv .nav:disabled{opacity:.35;cursor:default}
  .rv .ms{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px;font-size:14px}.rv .ms span{flex:1;min-width:0}
  .rv .lnk{border:1px solid var(--rv-a);color:var(--rv-a);background:transparent;border-radius:999px;padding:4px 12px;font-size:13px}
  .rv .cal{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px}
  .rv .wk{text-align:center;font-size:12px;color:var(--rv-m);padding:2px 0}
  .rv .d{position:relative;border:1px solid var(--rv-l);background:var(--rv-b);border-radius:10px;min-height:58px;padding:4px 3px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:1px;overflow:hidden}
  .rv .d i{position:absolute;inset:0;background:var(--rv-a);pointer-events:none}
  .rv .d>*{position:relative}.rv .d .n{font-size:13px;font-weight:700}.rv .d .v{font-size:12px;font-weight:700;white-space:nowrap}.rv .d .o{font-size:11px;color:var(--rv-m);white-space:nowrap}
  .rv .d.today .n{color:var(--rv-a)}.rv .d.sel{outline:2px solid var(--rv-a);outline-offset:-1px}.rv .d:disabled{opacity:.35;cursor:default}.rv .d.pad{visibility:hidden}
  .rv .pr{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
  .rv .chip{border:1px solid var(--rv-l);background:var(--rv-b);border-radius:999px;padding:6px 12px;font-size:14px}
  .rv .chip[aria-pressed=true]{background:var(--rv-a);border-color:var(--rv-a);color:#fff}
  .rv .rg{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:10px;font-size:14px}
  .rv input[type=date]{font:inherit;font-size:14px;padding:6px 8px;border:1px solid var(--rv-l);border-radius:10px;background:var(--rv-b);color:inherit;min-width:0;max-width:100%}
  .rv .go{border:0;background:var(--rv-a);color:#fff;border-radius:10px;padding:7px 14px;font-weight:700}
  .rv .cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:8px}
  .rv .cards div{background:var(--rv-b);border-radius:12px;padding:10px;min-width:0}.rv .cards small{display:block;color:var(--rv-m);font-size:12px}.rv .cards b{display:block;font-size:20px;overflow-wrap:anywhere}
  .rv .notes{margin:0 0 6px;padding-left:18px;font-size:13px;color:var(--rv-m)}
  .rv table{width:100%;border-collapse:collapse;font-size:14px;table-layout:fixed}
  .rv th,.rv td{padding:7px 4px;border-bottom:1px solid var(--rv-l);text-align:right;vertical-align:top}
  .rv th{font-size:12px;color:var(--rv-m);font-weight:600}.rv th:nth-child(2),.rv td:nth-child(2){text-align:left}
  .rv td:nth-child(2){overflow-wrap:anywhere}.rv td small{display:block;color:var(--rv-m);font-size:12px}
  .rv .bar{height:6px;border-radius:3px;background:var(--rv-l);margin-top:4px;overflow:hidden}.rv .bar i{display:block;height:100%;background:var(--rv-a)}
  .rv .tabs{display:flex;gap:6px;margin-bottom:6px}
  .rv .hb{display:flex;align-items:flex-end;gap:3px;height:120px;padding-top:14px}
  .rv .hb div{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%}
  .rv .hb i{display:block;width:100%;max-width:28px;background:var(--rv-a);border-radius:4px 4px 0 0;min-height:2px}
  .rv .hb em{font-style:normal;font-size:11px;color:var(--rv-m);margin-bottom:2px}.rv .hb span{font-size:11px;color:var(--rv-m);margin-top:3px;white-space:nowrap}
  .rv .dl{display:flex;gap:8px;flex-wrap:wrap}.rv .dl button{border:1px solid var(--rv-l);background:var(--rv-b);border-radius:10px;padding:8px 14px;font-size:14px}
  .rv .err{color:#e03131}
  @media (max-width:520px){.rv .cards{grid-template-columns:1fr 1fr}.rv .cards div:first-child{grid-column:1/-1}.rv .cards b{font-size:17px}.rv .d{min-height:52px}.rv .d .v{font-size:11px}.rv .d .o{display:none}.rv .c{padding:12px}.rv .hide-s{display:none}}
  `;

  function mount(el, opt) {
    if (!document.getElementById('rv-css')) { const s = document.createElement('style'); s.id = 'rv-css'; s.textContent = CSS; document.head.appendChild(s); }
    const t = T[opt.ui] || T.ko, shop = opt.shop;
    const cache = new Map(), got = new Map(); // 날짜 → 하루 집계, 받은 시각(오늘·어제는 30초 지나면 다시 받음)
    let today = vnToday(), month = today.slice(0, 7), sel = { from: today, to: today, key: 'today' }, sortBy = 'q', busy = 0;

    el.innerHTML = `<div class="rv"><div class="c" data-r="cal"></div><div class="c" data-r="pick"></div><div class="c" data-r="out"></div></div>`;
    const box = (r) => el.querySelector(`[data-r="${r}"]`);

    async function fetchRange(from, to, force) {
      const need = [];
      for (let d = from; d <= to && d <= today; d = add(d, 1)) if (force || !cache.has(d) || (d >= add(today, -1) && Date.now() - got.get(d) > 30000)) need.push(d);
      if (!need.length) return;
      const r = await fetch(`/api/owner?shop=${encodeURIComponent(shop)}&op=sales&from=${need[0]}&to=${need[need.length - 1]}`, { headers: opt.headers(), cache: 'no-store' });
      if (r.status === 401) { opt.onAuthFail && opt.onAuthFail(); throw new Error('auth'); }
      if (!r.ok) throw new Error('fail');
      const j = await r.json();
      if (j.today) today = j.today;
      for (const d of j.days || []) { cache.set(d.day, d); got.set(d.day, Date.now()); }
    }
    const monthRange = (m) => { const a = m + '-01', b = add(iso(Date.UTC(+m.slice(0, 4), +m.slice(5, 7), 1)), -1); return [a, b]; };

    function sum(from, to) {
      const s = { orders: 0, revenue: 0, cancelled: 0, open: 0, market: 0, currency: '', hours: Array.from({ length: 24 }, () => [0, 0]), items: {}, days: [] };
      for (let d = from; d <= to && d <= today; d = add(d, 1)) {
        const x = cache.get(d); if (!x) continue;
        s.days.push(x);
        s.orders += x.orders; s.revenue += x.revenue; s.cancelled += x.cancelled; s.open += x.open; s.market += x.market;
        if (!s.currency && x.currency) s.currency = x.currency;
        x.hours.forEach((h, i) => { s.hours[i][0] += h[0]; s.hours[i][1] += h[1]; });
        for (const [k, it] of Object.entries(x.items)) { const o = s.items[k] || (s.items[k] = { name: it.name, sub: '', q: 0, amt: 0, mq: 0 }); if (!o.sub && it.sub) o.sub = it.sub; o.q += it.q; o.amt += it.amt; o.mq += it.mq; }
      }
      return s;
    }
    const money = (n, cur) => num(n) + (cur || '₫');

    function drawCal() {
      const [a, b] = monthRange(month), y = +month.slice(0, 4), m = +month.slice(5, 7);
      const s = sum(a, b), vals = [];
      for (let d = a; d <= b; d = add(d, 1)) vals.push((cache.get(d) || {}).revenue || 0);
      const max = Math.max(1, ...vals), lead = (new Date(a + 'T00:00:00Z').getUTCDay() + 6) % 7;
      let cells = t.wk.map((w) => `<div class="wk">${w}</div>`).join('') + '<div class="d pad"></div>'.repeat(lead);
      for (let d = a; d <= b; d = add(d, 1)) {
        const x = cache.get(d), fut = d > today, on = d >= sel.from && d <= sel.to && sel.key !== 'month' ? ' sel' : '';
        const v = x && x.revenue ? short(x.revenue) : '', o = x && x.orders ? t.cnt(x.orders) : '';
        const op = x && x.revenue ? (0.12 + 0.5 * (x.revenue / max)).toFixed(2) : 0;
        cells += `<button type="button" class="d${d === today ? ' today' : ''}${on}" data-day="${d}"${fut ? ' disabled' : ''} aria-label="${esc(t.day(d))} ${esc(v)} ${esc(o)}">${op ? `<i style="opacity:${op}"></i>` : ''}<span class="n">${+d.slice(8)}</span><span class="v">${v || '&nbsp;'}</span><span class="o">${o || '&nbsp;'}</span></button>`;
      }
      box('cal').innerHTML = `<div class="ch"><button type="button" class="nav" data-mv="-1" aria-label="prev">‹</button><b>${esc(t.month(y, m))}</b><button type="button" class="nav" data-mv="1" aria-label="next"${month >= today.slice(0, 7) ? ' disabled' : ''}>›</button></div>
        <div class="ms"><span>${esc(t.sales)} <b>${esc(money(s.revenue, s.currency))}</b> · ${esc(t.cnt(s.orders))}</span><button type="button" class="lnk" data-all="1">${esc(t.monthAll)}</button></div>
        <div class="cal">${cells}</div>`;
    }
    function drawPick() {
      const chips = [['today', t.today], ['yday', t.yday], ['last7', t.last7], ['thisM', t.thisM], ['lastM', t.lastM]];
      box('pick').innerHTML = `<div class="pr">${chips.map(([k, l]) => `<button type="button" class="chip" data-k="${k}" aria-pressed="${sel.key === k}">${esc(l)}</button>`).join('')}</div>
        <div class="rg"><label>${esc(t.from)} <input type="date" data-f="from" value="${sel.from}" max="${today}"></label><label>${esc(t.to)} <input type="date" data-f="to" value="${sel.to}" max="${today}"></label><button type="button" class="go" data-go="1">${esc(t.show)}</button></div>`;
    }
    function drawOut(msg) {
      const o = box('out');
      if (msg) { o.innerHTML = `<p class="${msg === t.loading ? 'mut' : 'err'}">${esc(msg)}</p>${msg === t.loading ? '' : `<button type="button" class="chip" data-reload="1">${esc(t.reload)}</button>`}`; return; }
      const s = sum(sel.from, sel.to), cur = s.currency, multi = sel.from !== sel.to;
      const head = multi ? `${t.day(sel.from)} ~ ${t.day(sel.to)}` : t.day(sel.from);
      const notes = [s.cancelled && t.cancelled(s.cancelled), s.open && t.open(s.open), s.market && t.market(s.market), sel.to >= add(today, -1) && t.live].filter(Boolean);
      const items = Object.values(s.items).sort((a, b) => (sortBy === 'q' ? b.q - a.q || b.amt - a.amt : b.amt - a.amt || b.q - a.q));
      const base = sortBy === 'q' ? items.reduce((n, x) => n + x.q, 0) : s.revenue;
      const rows = items.map((x, i) => { const v = sortBy === 'q' ? x.q : x.amt, pc = base ? Math.round((v / base) * 1000) / 10 : 0;
        return `<tr><td>${i + 1}</td><td>${esc(x.name)}${x.sub ? `<small>${esc(x.sub)}</small>` : ''}<div class="bar"><i style="width:${Math.min(100, pc)}%"></i></div></td><td>${num(x.q)}</td><td>${x.amt ? num(x.amt) : '–'}${x.mq ? `<small>+${x.mq}</small>` : ''}</td><td class="hide-s">${pc}%</td></tr>`; }).join('');
      const used = s.hours.map((h, i) => (h[0] ? i : -1)).filter((i) => i >= 0);
      let hours = '';
      if (used.length) {
        const a = Math.min(...used), b = Math.max(...used), mx = Math.max(...s.hours.map((h) => h[0]));
        hours = `<h3 style="margin-top:16px">${esc(t.hours)}</h3><div class="hb">${s.hours.slice(a, b + 1).map((h, k) => `<div title="${a + k}h · ${t.cnt(h[0])} · ${money(h[1], cur)}"><em>${h[0] || ''}</em><i style="height:${(h[0] / mx) * 100}%"></i><span>${a + k}</span></div>`).join('')}</div>`;
      }
      let daily = '';
      if (multi && s.days.length > 1) {
        const mx = Math.max(1, ...s.days.map((d) => d.revenue)), step = Math.ceil(s.days.length / 10);
        daily = `<h3 style="margin-top:16px">${esc(t.daily)}</h3><div class="hb">${s.days.map((d, k) => `<div title="${esc(t.day(d.day))} · ${t.cnt(d.orders)} · ${money(d.revenue, cur)}"><i style="height:${(d.revenue / mx) * 100}%"></i><span>${k % step ? '&nbsp;' : +d.day.slice(8)}</span></div>`).join('')}</div>`;
      }
      o.innerHTML = `<h3>${esc(head)}</h3>
        <div class="cards"><div><small>${esc(t.sales)}</small><b>${esc(money(s.revenue, cur))}</b></div><div><small>${esc(t.orders)}</small><b>${esc(t.cnt(s.orders))}</b></div><div><small>${esc(t.avg)}</small><b>${s.orders ? esc(money(s.revenue / s.orders, cur)) : '–'}</b></div></div>
        ${notes.length ? `<ul class="notes">${notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
        ${items.length ? `<h3 style="margin-top:14px">${esc(t.rank)}</h3><div class="tabs"><button type="button" class="chip" data-sort="q" aria-pressed="${sortBy === 'q'}">${esc(t.byQ)}</button><button type="button" class="chip" data-sort="a" aria-pressed="${sortBy === 'a'}">${esc(t.byA)}</button></div>
        <table><colgroup><col style="width:30px"><col><col style="width:52px"><col style="width:96px"><col class="hide-s" style="width:58px"></colgroup><thead><tr><th>#</th><th>${esc(t.food)}</th><th>${esc(t.qty)}</th><th>${esc(t.amt)}</th><th class="hide-s">${esc(t.share)}</th></tr></thead><tbody>${rows}</tbody></table>` : `<p class="mut">${esc(t.none)}</p>`}
        ${hours}${daily}
        <div class="dl" style="margin-top:16px"><button type="button" data-csv="f">⬇ ${esc(t.csvF)}</button><button type="button" data-csv="d">⬇ ${esc(t.csvD)}</button></div>
        <p class="mut" style="margin:10px 0 0">${esc(t.note)}</p>`;
    }
    function csv(kind) {
      const c = t.csv, q = (v) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
      const lines = [];
      for (let d = sel.from; d <= sel.to && d <= today; d = add(d, 1)) {
        const x = cache.get(d); if (!x) continue;
        if (kind === 'd') lines.push([d, x.orders, x.revenue, x.orders ? Math.round(x.revenue / x.orders) : 0, x.cancelled, x.open, x.market]);
        else Object.values(x.items).sort((a, b) => b.q - a.q).forEach((it) => lines.push([d, it.name, it.sub, it.q, it.mq, it.amt]));
      }
      const head = kind === 'd' ? [c.date, c.orders, c.amt, c.avg, c.cancel, c.open, c.mq] : [c.date, c.food, c.sub, c.qty, c.mq, c.amt];
      const text = '﻿' + [head, ...lines].map((r) => r.map(q).join(',')).join('\r\n');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
      a.download = `${shop}_${kind === 'd' ? 'sales-daily' : 'sales-items'}_${sel.from}_${sel.to}.csv`;
      document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    }

    async function show(next, force) {
      if (next) sel = next;
      if (sel.to > today) sel.to = today;
      if (sel.from > sel.to) sel = { ...sel, from: sel.to };
      if (span(sel.from, sel.to) > 93) { drawPick(); return drawOut(t.tooLong); }
      if (sel.key !== 'month') month = sel.to.slice(0, 7);
      const my = ++busy;
      drawPick(); drawOut(t.loading);
      try {
        const [a, b] = monthRange(month);
        await fetchRange(sel.from, sel.to, force);
        await fetchRange(a, b, false); // 달력(같은 달이면 이미 받아 둠)
      } catch (e) { if (my === busy && e.message !== 'auth') drawOut(t.fail); return; }
      if (my !== busy) return;
      drawCal(); drawPick(); drawOut();
    }
    function preset(k) {
      const m = today.slice(0, 7), pm = iso(Date.UTC(+m.slice(0, 4), +m.slice(5, 7) - 2, 1)).slice(0, 7);
      const r = { today: [today, today], yday: [add(today, -1), add(today, -1)], last7: [add(today, -6), today], thisM: monthRange(m), lastM: monthRange(pm) }[k];
      if (k === 'lastM') month = pm; if (k === 'thisM') month = m;
      return { from: r[0], to: r[1], key: k };
    }

    el.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b || b.disabled) return;
      if (b.dataset.day) show({ from: b.dataset.day, to: b.dataset.day, key: b.dataset.day === today ? 'today' : b.dataset.day === add(today, -1) ? 'yday' : 'day' });
      else if (b.dataset.mv) { const y = +month.slice(0, 4), m = +month.slice(5, 7) + Number(b.dataset.mv); month = iso(Date.UTC(y, m - 1, 1)).slice(0, 7); const [a, z] = monthRange(month); show({ from: a, to: z, key: 'month' }); }
      else if (b.dataset.all) { const [a, z] = monthRange(month); show({ from: a, to: z, key: 'month' }); }
      else if (b.dataset.k) show(preset(b.dataset.k));
      else if (b.dataset.go) { const f = el.querySelector('[data-f=from]').value, z = el.querySelector('[data-f=to]').value; if (f && z) show(f <= z ? { from: f, to: z, key: 'range' } : { from: z, to: f, key: 'range' }); }
      else if (b.dataset.sort) { sortBy = b.dataset.sort; drawOut(); }
      else if (b.dataset.csv) csv(b.dataset.csv);
      else if (b.dataset.reload) show(null, true);
    });
    show();
    return { reload: () => show(null, true) };
  }
  window.Revenue = { mount };
})();
