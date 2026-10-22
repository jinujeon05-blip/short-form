// 가게 찾기용(사장님 동의·비용 없이 손님 검색용으로 만든 메뉴판) 하단 안내 문구 — 메뉴판 맨 아래(가게 더 보기 링크 다음)에 붙는다.
// 원본은 restaurants/_shared/ 에만 두고, sync-disclaimer.sh 로 가게 찾기용 가게 폴더에 복사한다. (정식 가게에는 넣지 않는다)
// 메뉴판 언어(<html lang>)가 바뀌면 문구도 따라 바뀐다. 색은 가게의 --pt-* 변수를 따른다.
(function () {
  const T = {
    ko: { a: "구글 지도에 올린 메뉴판 기준이며 바뀔 수 있어요.", b: "사장님 동의 없이 손님 안내용으로 만든 페이지라 정보가 정확하지 않을 수 있어요." },
    vi: { a: "Dựa trên thực đơn đăng trên Google Maps, có thể thay đổi.", b: "Trang này được tạo để hỗ trợ khách, chưa có sự đồng ý của chủ quán nên thông tin có thể chưa chính xác." },
    en: { a: "Based on the menu posted on Google Maps and may change.", b: "This page was made for customer convenience without the owner's consent, so the information may not be accurate." },
    zh: { a: "以上依据谷歌地图上传的菜单，内容可能有变动。", b: "本页面未经店家同意、仅为方便顾客而制作，信息可能不准确。" },
    ja: { a: "Googleマップに掲載されたメニューに基づいており、変更になる場合があります。", b: "店舗の同意なくお客様の便宜のために作成したページのため、情報が正確でない可能性があります。" },
  };

  const css = `
    .qr-notice { box-sizing: border-box; max-width: 560px; margin: 0 auto; padding: 0 16px calc(28px + env(safe-area-inset-bottom)); font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Noto Sans SC", "Noto Sans JP", sans-serif; }
    .qr-notice p { margin: 0; padding: 11px 14px; text-align: center; font-size: 12.5px; line-height: 1.6; color: var(--pt-muted, #777); background: var(--pt-bg, #fff); border: 1px solid var(--pt-line, #e5e5e5); border-radius: 14px; letter-spacing: 0; text-transform: none; }
    .qr-notice b { display: block; font-weight: 800; color: var(--pt-ink, #222); }
    :lang(ko) .qr-notice { word-break: keep-all; }
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
    const box = document.createElement("div");
    box.className = "qr-notice";
    box.setAttribute("role", "note");
    document.body.appendChild(box); // 가게 더 보기 링크(stores-link.js) 다음 — 스크립트 순서대로 붙음

    const render = () => {
      const t = T[langOf()];
      box.innerHTML = `<p><b>${esc(t.a)}</b>${esc(t.b)}</p>`;
    };
    render();
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
