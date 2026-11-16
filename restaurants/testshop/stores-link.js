// "QR 메뉴판 가게 찾기" 링크 — 메뉴판 맨 아래(파트너 배너 다음)에 붙는다.
// 원본은 restaurants/_shared/ 에만 두고, sync-stores.sh 로 각 가게 폴더에 복사한다.
// 메뉴판 언어(<html lang>)가 바뀌면 문구와 링크 언어도 따라 바뀐다. 색은 가게의 --pt-* 변수를 따른다.
(function () {
  const URL = "https://qrmenuasia.com/stores/";
  const T = {
    ko: { title: "QR 메뉴판 가게 더 보기", sub: "다른 식당·가게를 지역과 종류로 찾아보세요" },
    vi: { title: "Xem thêm quán có thực đơn QR", sub: "Tìm nhà hàng, cửa hàng theo khu vực và loại" },
    en: { title: "More places with QR menus", sub: "Find restaurants and shops by area and type" },
    zh: { title: "更多提供二维码菜单的店铺", sub: "按地区和类型查找餐厅与店铺" },
    ja: { title: "QRメニューのお店をもっと見る", sub: "地域・種類で飲食店やお店を探せます" },
  };

  const css = `
    .qr-stores { box-sizing: border-box; max-width: 560px; margin: 0 auto; padding: 4px 16px calc(24px + env(safe-area-inset-bottom)); font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Noto Sans SC", "Noto Sans JP", sans-serif; }
    .qr-stores a { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--pt-ink, #222); background: var(--pt-bg, #fff); border: 1px solid var(--pt-line, #e5e5e5); border-radius: 14px; padding: 11px 14px; line-height: 1.3; }
    .qr-stores .qs-ico { flex: none; margin: 0; padding: 0; width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; font-style: normal; font-size: 16px; background: var(--pt-btn, #222); color: var(--pt-btn-ink, #fff); }
    .qr-stores .qs-txt { display: block; flex: 1; min-width: 0; margin: 0; padding: 0; background: none; border: 0; text-align: left; }
    .qr-stores .qs-txt b { display: block; margin: 0; font-size: 14px; font-weight: 800; color: var(--pt-ink, #222); letter-spacing: 0; text-transform: none; }
    .qr-stores .qs-txt small { display: block; margin: 2px 0 0; font-size: 12px; font-weight: 500; color: var(--pt-muted, #777); letter-spacing: 0; text-transform: none; }
    .qr-stores .qs-go { flex: none; margin: 0; padding: 0; background: none; font-style: normal; font-weight: 800; color: var(--pt-accent, #e0452b); }
    :lang(ko) .qr-stores { word-break: keep-all; }
  `;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const langOf = () => {
    const l = (document.documentElement.lang || "en").toLowerCase().split("-")[0];
    return T[l] ? l : "en";
  };

  function mount() {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    const box = document.createElement("nav");
    box.className = "qr-stores";
    document.body.appendChild(box); // 다산·JS welink 배너가 있으면 그 아래 (스크립트 순서대로 붙음)

    const render = () => {
      const l = langOf(), t = T[l];
      box.setAttribute("aria-label", t.title);
      box.innerHTML = `<a href="${URL}?lang=${l}" target="_blank" rel="noopener">
          <span class="qs-ico" aria-hidden="true">🔍</span><span class="qs-txt"><b>${esc(t.title)}</b><small>${esc(t.sub)}</small></span><span class="qs-go" aria-hidden="true">→</span>
        </a>`;
    };
    render();
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
