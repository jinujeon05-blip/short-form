// 메뉴판 맨 위 왼쪽의 "QR MENU" 로고 — 누르면 가게 찾기 페이지(https://qrmenuasia.com/stores/)로 이동한다. (사용자 지시 2026-10-22)
// 원본은 restaurants/_shared/ 에만 두고, sync-home.sh 로 각 가게 폴더(qr-home.js·qr-menu-logo.png)에 복사한다.
// 페이지 맨 위 왼쪽 구석(언어 선택 버튼의 반대편)에 붙고 스크롤하면 같이 올라간다. 언어는 <html lang>을 따른다.
(function () {
  const URL = "https://qrmenuasia.com/stores/";
  const LABEL = { ko: "QR 메뉴판 가게 더 보기", vi: "Xem thêm quán có thực đơn QR", en: "More places with QR menus", zh: "更多提供二维码菜单的店铺", ja: "QRメニューのお店をもっと見る" };
  const SHORT = { ko: "가게 더 보기", vi: "Xem thêm quán", en: "More places", zh: "更多店铺", ja: "他のお店" };
  // 오른쪽 위 언어 버튼(lang-menu.js)과 같은 알약 모양·높이·그림자로 맞춰 양쪽 구석에 짝을 이룬다
  const css = `
    .qr-home { position: absolute; z-index: 60; top: calc(10px + env(safe-area-inset-top)); left: max(12px, env(safe-area-inset-left)); box-sizing: border-box;
      display: flex; align-items: center; gap: 6px; margin: 0; padding: 4px 11px 4px 4px; text-decoration: none; white-space: nowrap;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Noto Sans SC", "Noto Sans JP", sans-serif;
      font-size: 13.5px; font-weight: 700; line-height: 1; letter-spacing: 0; color: #222; background: rgba(255,255,255,.94); border: 1px solid rgba(0,0,0,.12);
      border-radius: 999px; box-shadow: 0 4px 14px rgba(0,0,0,.18); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); }
    .qr-home img { display: block; flex: none; width: 19px; height: 19px; border-radius: 6px; }
    .qr-home:focus-visible { outline: 2px solid var(--pt-accent, #e0452b); outline-offset: 2px; }
    @media print { .qr-home { display: none !important; } }
  `;
  const langOf = () => {
    const l = (document.documentElement.lang || "en").toLowerCase().split("-")[0];
    return LABEL[l] ? l : "en";
  };
  function mount() {
    if (document.querySelector(".qr-home")) return;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    const a = document.createElement("a");
    a.className = "qr-home";
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = '<img src="qr-menu-logo.png" width="19" height="19" alt="QR MENU"><span class="qr-home-t"></span>';
    const render = () => {
      const l = langOf();
      a.href = `${URL}?lang=${l}`;
      a.setAttribute("aria-label", LABEL[l]);
      a.title = LABEL[l];
      a.querySelector(".qr-home-t").textContent = SHORT[l];
    };
    render();
    document.body.appendChild(a);
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
