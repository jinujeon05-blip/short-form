// 주방 배치도 장식 아이콘 (2026-11-16, 캡틴이 보여 준 POS 아이콘 그림의 '느낌'을 참고해 새로 그림 — 그림을 잘라 쓰지 않음).
// 아이콘은 그 장식의 크기(배치 단위)대로 SVG를 그때그때 그린다 → 크기를 바꾸거나 돌려도 선명하다.
// 긴 물건(카운터·소파·칸막이 등)은 세로로 돌리면 그림도 90도 돌아간다.
(function () {
  const LINE = "#5b5148";
  const n = (v) => Math.round(v * 10) / 10;
  const R = (x, y, w, h, rx, fill, stroke = LINE, sw = 2.5, extra = "") => `<rect x="${n(x)}" y="${n(y)}" width="${n(Math.max(1, w))}" height="${n(Math.max(1, h))}" rx="${n(rx)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;
  const C = (cx, cy, r, fill, stroke = LINE, sw = 2.5) => `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(Math.max(1, r))}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  const Ln = (x1, y1, x2, y2, stroke = LINE, sw = 2.5, extra = "") => `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" ${extra}/>`;
  const E = (cx, cy, rx, ry, rot, fill, stroke = LINE, sw = 2) => `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" transform="rotate(${n(rot)} ${n(cx)} ${n(cy)})" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  // 나뭇결(2026-11-17 나무 식당 가-1): 상자 안에 물결 결 3줄
  const grain = (x, y, w, h, col = "#8d6a45", k = 3) => { let o = ""; for (let i = 1; i <= k; i++) { const yy = y + (h * i) / (k + 1), a = Math.min(h / (k + 1), 6) * (i % 2 ? 0.5 : -0.5); o += `<path d="M ${n(x + 4)} ${n(yy)} Q ${n(x + w * 0.3)} ${n(yy - a)} ${n(x + w * 0.55)} ${n(yy)} T ${n(x + w - 4)} ${n(yy)}" fill="none" stroke="${col}" stroke-width="1.2" stroke-opacity=".55" stroke-linecap="round"/>`; } return o; };
  // 긴 물건: 가로(L×T)로 그리고, 세로로 놓이면 90도 돌린다
  const lin = (draw) => (w, h) => (w >= h ? draw(w, h) : `<g transform="translate(${w},0) rotate(90)">${draw(h, w)}</g>`);
  // 둥근 물건(화분·쓰레기통·문): 짧은 변 기준 정사각형을 가운데에
  const sq = (draw) => (w, h) => { const m = Math.min(w, h); return `<g transform="translate(${n((w - m) / 2)},${n((h - m) / 2)})">${draw(m)}</g>`; };

  const plant = (pot, leaves, len, wid, cols) => sq((m) => {
    const c = m / 2; let s = "";
    for (let i = 0; i < leaves; i++) {
      const a = (360 / leaves) * i - 90, r = (a * Math.PI) / 180, d = m * len * 0.55;
      s += E(c + Math.cos(r) * d, c + Math.sin(r) * d, m * len * 0.55, m * wid, a, cols[i % cols.length], "#3d6b31", 1.6);
    }
    return C(c, c, m * 0.27, pot, "#8a4a2c", 2) + s + C(c, c, m * 0.08, "#3d6b31", "#3d6b31", 1);
  });

  const K = {
    kitchen: { ko: "주방", vi: "Bếp", size: [240, 140], label: true, g: "k", draw: lin((L, T) =>
      R(2, 2, L - 4, T - 4, 10, "#e6e1d9") + R(8, 8, L - 16, T * 0.42, 6, "#cfc8bd") +
      R(16, 14, L * 0.2, T * 0.42 - 12, 5, "#bcd8ea", "#7fa7bf", 2) +
      C(L * 0.6, 8 + T * 0.21, Math.min(T * 0.12, 22), "#5b5148", LINE, 2) + C(L * 0.6, 8 + T * 0.21, Math.min(T * 0.05, 9), "#e07a5f", "#e07a5f", 1) +
      C(L * 0.8, 8 + T * 0.21, Math.min(T * 0.12, 22), "#5b5148", LINE, 2) + C(L * 0.8, 8 + T * 0.21, Math.min(T * 0.05, 9), "#e07a5f", "#e07a5f", 1) +
      R(8, T * 0.56, L - 16, T * 0.36, 5, "#d8d2c8") + Ln(L / 3, T * 0.56, L / 3, T * 0.92, LINE, 2) + Ln((L * 2) / 3, T * 0.56, (L * 2) / 3, T * 0.92, LINE, 2)) },
    cook: { ko: "조리대", vi: "Bàn bếp", size: [240, 80], g: "k", draw: lin((L, T) =>
      R(2, 2, L - 4, T - 4, 8, "#d3cdc3") + R(8, 7, L - 16, T * 0.5, 5, "#e9e5de") +
      R(L * 0.08, T * 0.15, L * 0.22, T * 0.34, 4, "#c99d6e", "#8d6a45", 2) +
      C(L * 0.5, T * 0.32, Math.min(T * 0.17, 20), "#b7b1aa") + Ln(L * 0.5 + Math.min(T * 0.17, 20), T * 0.32, L * 0.5 + Math.min(T * 0.17, 20) + 10, T * 0.32) +
      C(L * 0.75, T * 0.32, Math.min(T * 0.15, 18), "#9aa1a8") +
      Ln(L / 3, T * 0.66, L / 3, T - 6, LINE, 2) + Ln((L * 2) / 3, T * 0.66, (L * 2) / 3, T - 6, LINE, 2)) },
    fridge: { ko: "냉장고", vi: "Tủ lạnh", size: [80, 70], g: "k", draw: (w, h) =>
      R(2, 2, w - 4, h - 4, 6, "#e4e7ea") + R(2, 2, w - 4, h * 0.2, 6, "#cdd3d8") + Ln(w / 2, h * 0.2 + 2, w / 2, h - 3) +
      Ln(w / 2 - 6, h * 0.45, w / 2 - 6, h * 0.7, LINE, 3) + Ln(w / 2 + 6, h * 0.45, w / 2 + 6, h * 0.7, LINE, 3) },
    counter: { ko: "카운터", vi: "Quầy", size: [200, 70], label: true, g: "k", draw: lin((L, T) => {
      const mw = Math.min(T * 0.62, 46), mh = mw * 0.68;
      return R(2, 2, L - 4, T - 4, 10, "#c9a985") + grain(2, T * 0.4, L * 0.55, T * 0.55, "#8d6a45", 2) + R(7, 7, L - 14, T * 0.3, 6, "#b08d68", "#8d7254", 2) + grain(7, 7, L - 14, T * 0.3, "#6e4527", 2) +
        R(L * 0.72 - mw / 2, T * 0.42, mw, mh, 4, "#cfe6f3", "#5b7d93", 2) + Ln(L * 0.72, T * 0.42 + mh, L * 0.72, Math.min(T - 5, T * 0.42 + mh + 6), LINE, 3);
    }) },
    bar: { ko: "바 테이블", vi: "Quầy bar", size: [300, 110], g: "s", draw: lin((L, T) => {
      const cnt = Math.max(2, Math.floor(L / 70)), r = Math.min(T * 0.18, 20); let s = R(2, 2, L - 4, T * 0.42, 8, "#c8915f", "#6e4527") + grain(2, 2, L - 4, T * 0.42, "#6e4527", 2);
      for (let i = 0; i < cnt; i++) { const x = (L / cnt) * (i + 0.5); s += C(x, T * 0.74, r, "#b07a4f", "#5e3b21") + C(x, T * 0.74, r * 0.62, "#c8915f", "#8d6a45", 1.2); }
      return s;
    }) },
    sofa: { ko: "소파", vi: "Sofa", size: [220, 80], g: "s", draw: lin((L, T) => {
      const arm = Math.min(T * 0.3, 26), seg = Math.max(1, Math.round((L - 2 * arm) / 80)); let s = R(2, 2, L - 4, T * 0.34, 10, "#d4694c", "#a94f3a");
      s += R(2 + arm - 2, T * 0.28, L - 4 - 2 * arm + 4, T * 0.68, 8, "#ea8f72", "#a94f3a");
      for (let i = 1; i < seg; i++) { const x = 2 + arm + ((L - 4 - 2 * arm) / seg) * i; s += Ln(x, T * 0.34, x, T * 0.92, "#a94f3a", 2); }
      for (let i = 0; i < seg; i++) { const x0 = 2 + arm + ((L - 4 - 2 * arm) / seg) * i, sw = (L - 4 - 2 * arm) / seg; s += Ln(x0 + sw * 0.2, T * 0.45, x0 + sw * 0.8, T * 0.45, "#f6b9a4", 3); }
      return s + R(2, 2, arm, T - 4, 9, "#d4694c", "#a94f3a") + R(L - 2 - arm, 2, arm, T - 4, 9, "#d4694c", "#a94f3a");
    }) },
    divwood: { ko: "나무 칸막이", vi: "Vách gỗ", size: [200, 24], g: "d", draw: lin((L, T) =>
      R(1, 1, L - 2, T - 2, 4, "#c09468", "#6e4527", 2) + Ln(6, T * 0.38, L - 6, T * 0.32, "#9a7149", 1.4) + Ln(6, T * 0.66, L - 6, T * 0.7, "#9a7149", 1.4)) },
    divglass: { ko: "유리 칸막이", vi: "Vách kính", size: [200, 20], g: "d", draw: lin((L, T) =>
      R(1, 2, L - 2, T - 4, 3, "#d8eef9", "#7fa7bf", 2, 'fill-opacity="0.9"') + Ln(L * 0.15, T - 4, L * 0.28, 4, "#ffffff", 2) +
      R(0, 0, Math.min(T, 14), T, 2, "#7a8a96", "#5d6b75", 1.5) + R(L - Math.min(T, 14), 0, Math.min(T, 14), T, 2, "#7a8a96", "#5d6b75", 1.5)) },
    swing: { ko: "여닫이 문", vi: "Cửa mở", size: [90, 90], g: "d", draw: sq((m) =>
      `<path d="M ${n(m - 5)} ${n(m - 5)} A ${n(m - 12)} ${n(m - 12)} 0 0 0 7 7" fill="none" stroke="#8d8478" stroke-width="2" stroke-dasharray="5 4"/>` +
      Ln(4, m - 4, m - 4, m - 4, LINE, 4) + R(3, 7, 9, m - 12, 2, "#c09468", "#8d6a45", 2)) },
    slide: { ko: "미닫이 문", vi: "Cửa lùa", size: [160, 30], g: "d", draw: lin((L, T) =>
      Ln(2, T / 2, L - 2, T / 2, "#9a8f84", 2) + R(3, 3, L * 0.56, T * 0.42, 3, "#f3efe8") + R(L * 0.42, T * 0.55, L * 0.55, T * 0.4, 3, "#e8e0d2") +
      Ln(L * 0.62, T * 0.28, L * 0.8, T * 0.28, LINE, 2) + `<path d="M ${n(L * 0.62 + 6)} ${n(T * 0.28 - 5)} L ${n(L * 0.62)} ${n(T * 0.28)} L ${n(L * 0.62 + 6)} ${n(T * 0.28 + 5)}" fill="none" stroke="${LINE}" stroke-width="2" stroke-linecap="round"/>`) },
    stairs: { ko: "계단", vi: "Cầu thang", size: [150, 90], label: true, g: "d", draw: lin((L, T) => {
      let s = R(2, 2, L - 4, T - 4, 6, "#e6ddcf", "#8d8478");
      for (let x = 16; x < L - 6; x += 16) s += Ln(x, 4, x, T - 4, "#b3a693", 2);
      return s + Ln(10, T * 0.4, L - 14, T * 0.4, LINE, 2.5) + `<path d="M ${n(L - 22)} ${n(T * 0.4 - 6)} L ${n(L - 12)} ${n(T * 0.4)} L ${n(L - 22)} ${n(T * 0.4 + 6)}" fill="none" stroke="${LINE}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    }) },
    wc: { ko: "화장실", vi: "WC", size: [120, 100], label: true, g: "d", draw: (w, h) => {
      const s = Math.min(w * 0.22, h * 0.36), y = h * 0.16, cx1 = w / 2 - s * 0.75, cx2 = w / 2 + s * 0.75;
      return R(2, 2, w - 4, h - 4, 10, "#dfeaf5", "#9db6cf") +
        C(cx1, y + s * 0.22, s * 0.2, "#3b6ea8", "#3b6ea8", 1) + R(cx1 - s * 0.26, y + s * 0.48, s * 0.52, s * 0.72, 4, "#3b6ea8", "#3b6ea8", 1) +
        C(cx2, y + s * 0.22, s * 0.2, "#d9534f", "#d9534f", 1) + `<path d="M ${n(cx2)} ${n(y + s * 0.46)} L ${n(cx2 + s * 0.34)} ${n(y + s * 1.2)} L ${n(cx2 - s * 0.34)} ${n(y + s * 1.2)} Z" fill="#d9534f"/>` +
        Ln(w / 2, y, w / 2, y + s * 1.2, "#9db6cf", 2);
    } },
    trash: { ko: "쓰레기통", vi: "Thùng rác", size: [44, 44], g: "p", draw: sq((m) => C(m / 2, m / 2, m / 2 - 2, "#b8bec4", "#6c747b") + C(m / 2, m / 2, m * 0.32, "#9aa1a8", "#6c747b", 1.5)) },
    plant: { ko: "화분", vi: "Cây", size: [56, 56], g: "p", draw: plant("#d9774b", 6, 0.42, 0.11, ["#7fb069", "#6fa65a"]) },
    plant2: { ko: "큰 화분", vi: "Cây lớn", size: [80, 80], g: "p", draw: plant("#8aa0b0", 9, 0.5, 0.09, ["#4e8a3f", "#6fa65a", "#5d9a4b"]) },
    plant3: { ko: "잎 넓은 화분", vi: "Cây lá to", size: [90, 90], g: "p", draw: plant("#5f8fa8", 5, 0.48, 0.19, ["#3f7d3a", "#4e8a3f"]) },
  };
  const GROUPS = [
    { id: "k", ko: "주방·카운터", vi: "Bếp · Quầy" },
    { id: "s", ko: "좌석·가구", vi: "Chỗ ngồi · Nội thất" },
    { id: "d", ko: "문·벽·시설", vi: "Cửa · Vách · Tiện ích" },
    { id: "p", ko: "식물·소품", vi: "Cây · Đồ nhỏ" },
  ];
  window.QKIcons = {
    kinds: K, groups: GROUPS,
    // f: 여닫이 문 방향(아래 두 자리 = 90도씩 돌림, 4 = 좌우 뒤집기). 가운데를 기준으로 돌린다
    svg: (k, w, h, f) => { if (!K[k]) return ""; let g = K[k].draw(w, h); f = f | 0; if (f) { const cx = n(w / 2), cy = n(h / 2); g = `<g transform="rotate(${(f & 3) * 90} ${cx} ${cy})${f & 4 ? ` translate(${n(w)},0) scale(-1,1)` : ""}">${g}</g>`; } return `<svg class="ic" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">${g}</svg>`; },
  };
})();
