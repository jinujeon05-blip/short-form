// 메뉴판 맨 위 왼쪽의 "QR MENU" 로고 버튼 — 누르면 가게 찾기 페이지(https://qrmenuasia.com/stores/)로 이동한다. (사용자 지시 2026-10-22)
// 원본은 restaurants/_shared/ 에만 두고, sync-home.sh 로 각 가게 폴더(qr-home.js·qr-mark.png)에 복사한다.
// 글자 없이 로고만 쓴다(사용자: 글자가 없어야 홈 버튼처럼 보인다). 색은 가게 테마(partner-theme)를 따른다:
//   바탕 = --pt-btn(그 가게 버튼색), 로고 = --pt-btn-ink(버튼 글자색). 흰 테두리로 어떤 사진 위에서도 보이게 한다.
// 오른쪽 위 언어 버튼(lang-menu.js)과 같은 높이(29px)·위치로 좌우 짝을 이룬다. 언어는 <html lang>을 따른다(링크 ?lang=, 접근성 이름).
(function () {
  const URL = "https://qrmenuasia.com/stores/";
  const LABEL = { ko: "QR 메뉴판 가게 더 보기", vi: "Xem thêm quán có thực đơn QR", en: "More places with QR menus", zh: "更多提供二维码菜单的店铺", ja: "QRメニューのお店をもっと見る" };
  const css = `
    .qr-home { position: absolute; z-index: 60; top: calc(10px + env(safe-area-inset-top)); left: max(12px, env(safe-area-inset-left)); box-sizing: border-box;
      display: block; width: 29px; height: 29px; margin: 0; padding: 0; border-radius: 50%; border: 1.5px solid rgba(255,255,255,.92);
      background: var(--pt-btn, #222); box-shadow: 0 3px 10px rgba(0,0,0,.3); }
    .qr-home .qr-mark { position: absolute; inset: 4.5px; display: block; background-color: var(--pt-btn-ink, #fff);
      -webkit-mask: url(qr-mark.png) center / contain no-repeat; mask: url(qr-mark.png) center / contain no-repeat; }
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
    a.innerHTML = '<span class="qr-mark" aria-hidden="true"></span>';
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
