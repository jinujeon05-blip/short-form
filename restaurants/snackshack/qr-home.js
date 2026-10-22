// 메뉴판 맨 위 왼쪽의 "QR MENU" 로고 — 누르면 가게 찾기 페이지(https://qrmenuasia.com/stores/)로 이동한다. (사용자 지시 2026-10-22)
// 원본은 restaurants/_shared/ 에만 두고, sync-home.sh 로 각 가게 폴더(qr-home.js·qr-menu-logo.png)에 복사한다.
// 페이지 맨 위 왼쪽 구석(언어 선택 버튼의 반대편)에 붙고 스크롤하면 같이 올라간다. 언어는 <html lang>을 따른다.
(function () {
  const URL = "https://qrmenuasia.com/stores/";
  const LABEL = { ko: "QR 메뉴판 가게 더 보기", vi: "Xem thêm quán có thực đơn QR", en: "More places with QR menus", zh: "更多提供二维码菜单的店铺", ja: "QRメニューのお店をもっと見る" };
  const css = `
    .qr-home { position: absolute; top: 12px; left: 12px; z-index: 60; display: block; width: 38px; height: 38px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,.35); line-height: 0; }
    .qr-home img { display: block; width: 100%; height: 100%; border-radius: 10px; }
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
    a.innerHTML = '<img src="qr-menu-logo.png" width="38" height="38" alt="QR MENU">';
    const render = () => {
      const l = langOf();
      a.href = `${URL}?lang=${l}`;
      a.setAttribute("aria-label", LABEL[l]);
      a.title = LABEL[l];
    };
    render();
    document.body.appendChild(a);
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
