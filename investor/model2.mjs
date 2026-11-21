// 사업 제안서(투자금 제외판) 3년 매출·지출 계산 — 2026-11-21 캡틴: 보수 = 영업사원 2명이 매달 10곳(3년 내내)
// 가격·비용 가정은 model.mjs(2026-11-19)와 같다: 기본 250만·프리미엄 500만(7:3) / 월 35만(연결제 섞어 31.5만) / 대표 3,000만 / 차량+기사 3,000만
// 캡틴 '2년차부터 흑자가 오르는 구조'(2026-11-21): 1년차는 영업사원 1명 = 매달 5곳(보수와 같음),
// 2년차부터 소개·한인 상권 제휴·가게 찾기 문의로 1명당 7~8곳 → 기본 새 계약 10→30→50곳, 영업 2→4→6명
// 사용: node investor/model2.mjs
const A = { setupAvg: 3_250_000, optAvg: 400_000, monthly: 315_000, churn: 0.02 };
const S = {
  보수: { per: [10, 10, 10], staff: [[2,1,0],[2,1,0],[2,1,0]], office: [5e6,5e6,5e6], ads: [10e6,10e6,10e6] },
  기본: { per: [10, 30, 50], staff: [[2,1,0],[4,2,1],[6,3,1]], office: [5e6,8e6,15e6], ads: [10e6,15e6,30e6] },
  공격: { per: [15, 40, 80], staff: [[3,1,0],[5,2,1],[10,3,1]], office: [5e6,8e6,15e6], ads: [15e6,20e6,40e6] },
};
const PAY = [12e6, 11e6, 14e6]; // 영업, 제작·고객지원, 관리 (월 급여)
const out = {};
for (const [name, sc] of Object.entries(S)) {
  let active = 0, cum = 0, be = null, min = 0;
  const years = [];
  for (let y = 0; y < 3; y++) {
    const R = { 제작비: 0, 옵션: 0, 월관리: 0 };
    const C = { 직원급여: 0, 대표급여: 0, 차량기사: 0, 사무실: 0, 광고마케팅: 0, 영업수당: 0, 인쇄: 0, 서버도구: 0 };
    let first = null;
    for (let m = 0; m < 12; m++) {
      const n = sc.per[y]; active = active * (1 - A.churn) + n;
      const r = { 제작비: n * A.setupAvg, 옵션: n * A.optAvg, 월관리: active * A.monthly };
      const st = sc.staff[y];
      const c = { 직원급여: st[0]*PAY[0] + st[1]*PAY[1] + st[2]*PAY[2], 대표급여: 30e6, 차량기사: 30e6, 사무실: sc.office[y],
        광고마케팅: sc.ads[y], 영업수당: n * A.setupAvg * 0.10, 인쇄: n * 150_000, 서버도구: [5e6,8e6,12e6][y] + active * 5_000 };
      if (y === 0 && m === 0) first = { r, c };
      for (const k in r) R[k] += r[k]; for (const k in c) C[k] += c[k];
      const v = Object.values(r).reduce((a, b) => a + b) - Object.values(c).reduce((a, b) => a + b);
      cum += v; min = Math.min(min, cum); if (be === null && v > 0) be = y * 12 + m + 1;
    }
    const rev = Object.values(R).reduce((a, b) => a + b), cost = Object.values(C).reduce((a, b) => a + b);
    years.push({ y: y + 1, active: Math.round(active), staff: sc.staff[y].reduce((a, b) => a + b) + 1, R, C, rev, cost, profit: rev - cost, first });
  }
  out[name] = { years, be, cum, min, endMonthly: active * A.monthly };
}
const e = x => (x / 1e8).toFixed(2); // 억 동
for (const [name, o] of Object.entries(out)) {
  console.log(`\n== ${name} == 흑자 첫 달 ${o.be ?? '3년 안 없음'} | 3년 누적 ${e(o.cum)}억 | 누적 최저 ${e(o.min)}억 | 3년차 말 월 반복매출 ${e(o.endMonthly)}억`);
  for (const y of o.years) console.log(`${y.y}년차 가게 ${y.active} 인원 ${y.staff} | 매출 ${e(y.rev)} (제작 ${e(y.R.제작비)} 옵션 ${e(y.R.옵션)} 월관리 ${e(y.R.월관리)}) | 지출 ${e(y.cost)} (${Object.entries(y.C).map(([k, v]) => k + ' ' + e(v)).join(', ')}) | 이익 ${e(y.profit)}`);
}
const f = out.기본.years[0].first; const M = x => Math.round(x / 1e6);
console.log('\n첫해 한 달(첫 달 기준, 백만동) 지출:', Object.fromEntries(Object.entries(f.c).map(([k, v]) => [k, M(v)])), '합', M(Object.values(f.c).reduce((a, b) => a + b)));
