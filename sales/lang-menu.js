// 언어 선택 드롭다운 — 화면 오른쪽 위 버튼 하나, 누르면 국기와 함께 언어 목록이 아래로 펼쳐진다.
// 원본은 restaurants/_shared/ 에만 두고, sync-lang.sh 로 각 가게 폴더와 sales/ 에 복사한다.
// 페이지의 기존 언어 버튼(#langs 안의 button[data-lang])은 숨기고, 항목을 고르면 그 버튼을 대신 눌러 준다.
// 그래서 페이지마다 있는 언어 바꾸기 코드는 그대로 쓴다. 바깥을 누르거나 Esc 를 누르면 닫힌다.
(function () {
  // 국기 (이모지 국기는 윈도우에서 글자로 보여서 작은 SVG로 그린다)
  const FLAGS = {
    ko: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><g transform="rotate(33.7 15 10)"><circle cx="15" cy="10" r="5" fill="#0047a0"/><path d="M10 10a5 5 0 0 1 10 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 0-5 0z" fill="#cd2e3a"/></g><g fill="#000"><rect x="4.6" y="3.15" width="4" height=".7" transform="rotate(33.7 6.6 4.6)"/><rect x="4.6" y="4.25" width="4" height=".7" transform="rotate(33.7 6.6 4.6)"/><rect x="4.6" y="5.35" width="4" height=".7" transform="rotate(33.7 6.6 4.6)"/><rect x="21.4" y="13.950000000000001" width="4" height=".7" transform="rotate(33.7 23.4 15.4)"/><rect x="21.4" y="15.05" width="4" height=".7" transform="rotate(33.7 23.4 15.4)"/><rect x="21.4" y="16.150000000000002" width="4" height=".7" transform="rotate(33.7 23.4 15.4)"/><rect x="21.4" y="3.15" width="4" height=".7" transform="rotate(-33.7 23.4 4.6)"/><rect x="21.4" y="4.25" width="4" height=".7" transform="rotate(-33.7 23.4 4.6)"/><rect x="21.4" y="5.35" width="4" height=".7" transform="rotate(-33.7 23.4 4.6)"/><rect x="4.6" y="13.950000000000001" width="4" height=".7" transform="rotate(-33.7 6.6 15.4)"/><rect x="4.6" y="15.05" width="4" height=".7" transform="rotate(-33.7 6.6 15.4)"/><rect x="4.6" y="16.150000000000002" width="4" height=".7" transform="rotate(-33.7 6.6 15.4)"/></g></svg>',
    en: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.6"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#c8102e" stroke-width="3.4"/></svg>',
    zh: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#de2910"/><path d="M5 2.6l1.18 3.62H10l-3.08 2.24 1.18 3.62L5 9.84l-3.08 2.24 1.18-3.62L0 6.22h3.82z" fill="#ffde00"/><g fill="#ffde00"><circle cx="10" cy="2" r=".8"/><circle cx="12" cy="4" r=".8"/><circle cx="12" cy="7" r=".8"/><circle cx="10" cy="9" r=".8"/></g></svg>',
    ja: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#bc002d"/></svg>',
    vi: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#da251d"/><path d="M15 4l1.76 5.41h5.69l-4.6 3.35 1.76 5.41L15 14.82l-4.61 3.35 1.76-5.41-4.6-3.35h5.69z" fill="#ffcd00"/></svg>',
  };
  const T = { ko: "언어 선택", en: "Language", zh: "选择语言", ja: "言語を選択", vi: "Chọn ngôn ngữ" };

  const css = `
    #langs { display: none !important; }
    .lm { position: absolute; z-index: 60; top: calc(10px + env(safe-area-inset-top)); right: max(12px, env(safe-area-inset-right));
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Noto Sans SC", "Noto Sans JP", sans-serif; }
    .lm * { box-sizing: border-box; }
    .lm-btn { display: flex; align-items: center; gap: 7px; margin: 0; font: inherit; font-size: 13.5px; font-weight: 700; line-height: 1;
      color: #222; background: rgba(255,255,255,.94); border: 1px solid rgba(0,0,0,.12); border-radius: 999px; padding: 6px 10px 6px 7px;
      box-shadow: 0 4px 14px rgba(0,0,0,.18); cursor: pointer; -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); }
    .lm-btn:focus-visible, .lm-item:focus-visible { outline: 2px solid var(--pt-accent, #e0452b); outline-offset: 2px; }
    .lm-flag { flex: none; display: block; width: 22px; height: 15px; border-radius: 3px; overflow: hidden; box-shadow: 0 0 0 1px rgba(0,0,0,.12); }
    .lm-flag svg { display: block; width: 100%; height: 100%; }
    .lm-caret { width: 10px; height: 10px; transition: transform .15s; }
    .lm.open .lm-caret { transform: rotate(180deg); }
    .lm-list { display: block; gap: 0; border: 0; position: absolute; top: calc(100% + 6px); right: 0; min-width: 172px; margin: 0; padding: 6px; list-style: none;
      background: #fff; border-radius: 14px; box-shadow: 0 12px 32px rgba(0,0,0,.22), 0 0 0 1px rgba(0,0,0,.06);
      opacity: 0; transform: translateY(-6px) scale(.98); transform-origin: top right; pointer-events: none; transition: opacity .15s, transform .15s; }
    .lm.open .lm-list { opacity: 1; transform: none; pointer-events: auto; }
    .lm-list > li { all: unset; display: block; }
    .lm-item { display: flex; align-items: center; gap: 10px; width: 100%; margin: 0; font: inherit; font-size: 15px; font-weight: 600; text-align: left;
      color: #222; background: none; border: 0; border-radius: 10px; padding: 10px 10px; cursor: pointer; }
    .lm-item:hover { background: #f3f1ee; }
    .lm-item[aria-checked="true"] { color: var(--pt-accent, #e0452b); background: #faf4f0; }
    .lm-item .lm-check { margin-left: auto; font-size: 14px; visibility: hidden; }
    .lm-item[aria-checked="true"] .lm-check { visibility: visible; }
    @media print { .lm { display: none !important; } }
  `;

  function mount() {
    const src = document.getElementById("langs");
    if (!src) return;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    const box = document.createElement("div");
    box.className = "lm";
    box.innerHTML = `<button class="lm-btn" type="button" aria-haspopup="menu" aria-expanded="false"></button><ul class="lm-list" role="menu"></ul>`;
    document.body.appendChild(box);
    const btn = box.querySelector(".lm-btn"), list = box.querySelector(".lm-list");
    const caret = '<svg class="lm-caret" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const flag = (c) => `<span class="lm-flag" aria-hidden="true">${FLAGS[c] || ""}</span>`;

    // 페이지가 언어를 바꿀 때마다 #langs 를 다시 그리므로, 그걸 보고 드롭다운도 맞춘다
    function sync() {
      const opts = [...src.querySelectorAll("button[data-lang]")].map((b) => ({ code: b.dataset.lang, label: b.textContent.trim(), on: b.getAttribute("aria-pressed") === "true" }));
      if (!opts.length) return;
      const cur = opts.find((o) => o.on) || opts[0];
      const ui = T[cur.code] || T.en;
      btn.innerHTML = `${flag(cur.code)}<span>${cur.label}</span>${caret}`;
      btn.setAttribute("aria-label", `${ui}: ${cur.label}`);
      list.setAttribute("aria-label", ui);
      list.innerHTML = opts.map((o) => `<li role="none"><button class="lm-item" type="button" role="menuitemradio" aria-checked="${o.on}" data-lang="${o.code}">${flag(o.code)}<span>${o.label}</span><span class="lm-check" aria-hidden="true">✓</span></button></li>`).join("");
    }
    sync();
    new MutationObserver(sync).observe(src, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-pressed"] });

    const open = (v) => {
      box.classList.toggle("open", v);
      btn.setAttribute("aria-expanded", String(v));
      if (v) (list.querySelector('[aria-checked="true"]') || list.querySelector(".lm-item"))?.focus({ preventScroll: true });
    };
    btn.addEventListener("click", () => open(!box.classList.contains("open")));
    list.addEventListener("click", (e) => {
      const item = e.target.closest(".lm-item");
      if (!item) return;
      open(false);
      btn.focus({ preventScroll: true });
      src.querySelector(`button[data-lang="${item.dataset.lang}"]`)?.click(); // 페이지의 원래 언어 버튼을 대신 누름
    });
    // 바깥을 누르면 닫힘
    document.addEventListener("click", (e) => { if (!box.contains(e.target)) open(false); });
    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") { open(false); btn.focus({ preventScroll: true }); return; }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const items = [...list.querySelectorAll(".lm-item")];
        const i = items.indexOf(document.activeElement);
        items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
        e.preventDefault();
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
