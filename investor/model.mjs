// 투자 제안서 3년 수익 계산 (모든 값은 가정 — 제안서 '가정' 쪽과 같은 숫자)
// 2026-11-19 캡틴 결정: 대표 급여 월 3,000만 동, 차량+기사 월 3,000만 동, 가격 기본 250만·프리미엄 500만·월 35만, 투자 12억 동
const A = {
  setupAvg: 3_250_000,   // 기본형 250만·프리미엄 500만, 7:3 섞음
  optAvg: 400_000,       // 장바구니·도메인 옵션 평균(새 가게당)
  monthly: 315_000,      // 월 관리 35만, 연결제 할인 섞어 평균(90%)
  churn: 0.02,           // 매달 해지 2%
};
const INVEST = 1_200_000_000;
const S = { // 달마다 새 계약 수 [1년차, 2년차, 3년차]
  보수: [6, 15, 30], 기본: [10, 25, 50], 공격: [15, 40, 80],
};
// 비용(동/월) 1~3년차, 항목별
const costParts = (y, newShops, active) => {
  const staff = [[2,1,0],[3,2,1],[5,3,1]][y]; // 영업, 제작·CS, 관리
  return {
    인력: staff[0]*12e6 + staff[1]*11e6 + staff[2]*14e6,
    대표: 30e6,
    차량: 30e6,                         // 출근·한국 가게 영업용 차량 임대+기사(하노이 7인승 시세 월 2,250만~3,000만)
    사무실: [5e6, 10e6, 20e6][y],
    마케팅: [10e6, 20e6, 40e6][y] + newShops * A.setupAvg * 0.10 + newShops * 150_000, // 광고 + 영업 수당 10% + QR 카드·스탠드
    기술: [5e6, 8e6, 12e6][y] + active * 5_000, // AI 구독·서버·도메인
  };
};
const sum = o => Object.values(o).reduce((a, b) => a + b, 0);
const r = x => Math.round(x / 1e6);
for (const [name, per] of Object.entries(S)) {
  let active = 0, cum = 0, be = null, min = 0, minAt = 0; const out = []; const deficit = {};
  const byMonth = [];
  for (let y = 0; y < 3; y++) {
    let rev = 0, c = 0, rec = 0;
    for (let m = 0; m < 12; m++) {
      const n = per[y];
      active = active * (1 - A.churn) + n;
      const r1 = n * (A.setupAvg + A.optAvg); const r2 = active * A.monthly;
      const parts = costParts(y, n, active); const cc = sum(parts);
      rev += r1 + r2; rec += r2; c += cc; cum += r1 + r2 - cc;
      byMonth.push(parts);
      if (cum < min) { min = cum; minAt = y*12 + m + 1; }
      if (be === null && r1 + r2 - cc > 0) be = y*12+m+1;
    }
    out.push({ y: y+1, active: Math.round(active), rev: r(rev), recurring: r(rec), cost: r(c), profit: r(rev-c) });
  }
  console.log(`\n== ${name} == 흑자 첫 달: ${be} | 누적 최저(백만동): ${r(min)} (${minAt}개월째) | 3년 누적: ${r(cum)} | 3년차 말 월 반복매출: ${r(active*A.monthly)} | 연 반복매출: ${r(active*A.monthly*12)}`);
  console.table(out);
  if (name === '기본') {
    // 투자금 사용: 누적 최저까지 쓴 비용을 항목별로 나눠 적자분(=-min)을 배분, 나머지는 예비비
    const tot = {}; byMonth.slice(0, minAt).forEach(p => { for (const k in p) tot[k] = (tot[k] || 0) + p[k]; });
    const all = sum(tot); const use = {};
    for (const k in tot) use[k] = Math.round(-min * tot[k] / all / 1e6);
    use.예비비 = r(INVEST) - sum(use);
    console.log('투자금 사용(백만동):', use);
    // 가게 하나의 경제성
    const life = 1 / A.churn;
    const ltv = A.setupAvg + A.optAvg + A.monthly * life;
    const cac = (2*12e6 + 10e6) / per[0] + A.setupAvg * 0.10 + 150_000;
    console.log(`평생 매출 ${r(ltv*100)/100}백만 · 얻는 비용 ${r(cac*100)/100}백만 · ${(ltv/cac).toFixed(1)}배 · 첫해 매출 ${r((A.setupAvg+A.optAvg+A.monthly*12)*100)/100}백만`);
    const yr = active * A.monthly * 12;
    for (const pre of [30e8, 40e8, 50e8]) {
      const sh = INVEST / (pre + INVEST);
      console.log(`투자 전 ${pre/1e8}억 → 지분 ${(sh*100).toFixed(1)}%`);
    }
    globalThis.baseYr = yr;
  }
  if (name === '보수') globalThis.consYr = active * A.monthly * 12;
}
// 3년 뒤 지분 가치 예시 (투자 전 가치 40억 = 지분 23.1%)
const sh = INVEST / (40e8 + INVEST);
for (const [k, yr, mult] of [['보수 2배', globalThis.consYr, 2], ['기본 2배', globalThis.baseYr, 2], ['기본 4배', globalThis.baseYr, 4], ['기본 6배', globalThis.baseYr, 6]])
  console.log(`${k}: 지분 가치 ${(yr*mult*sh/1e8).toFixed(1)}억 = 투자금의 ${(yr*mult*sh/INVEST).toFixed(1)}배`);
