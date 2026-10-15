// 다산(DASAN) 인력공급 파트너 배너 — 메뉴판 맨 아래에 붙는다.
// 원본은 restaurants/_shared/ 에만 두고, sync-dasan.sh 로 각 가게 폴더에 복사한다.
// 메뉴판 언어(<html lang>)가 바뀌면 배너 문구도 따라 바뀐다.
(function () {
  const BIZ = { href: "https://dasanhr.com/ko/business", tel: "0917 302 200" };
  const T = {
    ko: { tag: "파트너", title: "베트남 북부 인력공급 · 다산 DASAN", sub: "생산직 파견 · 단기 인력 · 전자부품 선별 대행 | 한국어 상담",
      cta: "기업 인력 의뢰", contact: "전화 · Zalo · 카카오톡", ...BIZ,
      corp: "다산무역서비스 유한책임회사 · 근로자파견업 허가 No.68/2023/SBN" },
    en: { tag: "Partner", title: "Manpower Supply in Northern Vietnam · DASAN", sub: "Licensed labor supply · Korean-speaking support",
      cta: "Request workers", contact: "Phone · Zalo · KakaoTalk", ...BIZ,
      corp: "DASAN Trading & Services Co., Ltd. · Labor leasing license No.68/2023/SBN" },
    zh: { tag: "合作伙伴", title: "越南北部人力供应 · DASAN", sub: "生产线派遣 · 短期用工 · 电子零件筛选代工 | 可韩语咨询",
      cta: "企业用工咨询", contact: "电话 · Zalo · KakaoTalk", ...BIZ,
      corp: "DASAN 贸易服务有限责任公司 · 劳务派遣许可 No.68/2023/SBN" },
    ja: { tag: "パートナー", title: "ベトナム北部の人材供給 · DASAN", sub: "製造ライン派遣・短期人材・電子部品の選別代行｜韓国語対応",
      cta: "人材のご依頼", contact: "電話・Zalo・カカオトーク", ...BIZ,
      corp: "DASAN貿易サービス有限責任会社・労働者派遣許可 No.68/2023/SBN" },
    vi: { tag: "Đối tác", title: "Việc làm uy tín tại các KCN miền Bắc · DASAN", sub: "Không thu phí · Ứng tuyển online, gọi lại trong 24 giờ",
      cta: "Ứng tuyển ngay", contact: "Zalo", href: "https://dasanhr.com/vi", tel: "0937 250 787", zalo: "https://zalo.me/0937250787",
      corp: "Công ty TNHH Thương mại và Dịch vụ DASAN · Giấy phép cho thuê lại lao động số 68/2023/SBN" },
  };

  const css = `
    .dasan { box-sizing: border-box; max-width: 560px; margin: 0 auto; padding: 18px 16px calc(22px + env(safe-area-inset-bottom)); font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Noto Sans SC", "Noto Sans JP", sans-serif; }
    .dasan * { box-sizing: border-box; }
    .dasan-card { position: relative; display: block; text-decoration: none; color: #0e2a4f; background: #fff; border-radius: 16px; padding: 14px 14px 12px; border-top: 4px solid #c8102e; box-shadow: 0 6px 18px rgba(14,42,79,.18); line-height: 1.35; }
    .dasan-tag { position: absolute; top: 10px; right: 12px; font-size: 10.5px; font-weight: 700; letter-spacing: .3px; color: #6b7a90; border: 1px solid #d5dbe4; border-radius: 4px; padding: 1px 6px; }
    .dasan-logo { display: block; height: 30px; width: auto; }
    .dasan-title { margin: 10px 0 0; font-size: 15.5px; font-weight: 800; color: #0e2a4f; }
    .dasan-sub { margin: 3px 0 0; font-size: 13px; color: #44546b; }
    .dasan-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 11px; }
    .dasan-tel { font-size: 13px; color: #0e2a4f; }
    .dasan-tel b { font-size: 15px; font-weight: 800; white-space: nowrap; }
    .dasan-tel small { display: block; font-size: 11px; color: #6b7a90; }
    .dasan-cta { flex: none; font-size: 13px; font-weight: 800; color: #fff; background: #c8102e; border-radius: 999px; padding: 8px 13px; white-space: nowrap; }
    .dasan-corp { margin: 9px 0 0; padding-top: 8px; border-top: 1px solid #e6eaf0; font-size: 10.5px; color: #8391a5; }
    :lang(ko) .dasan { word-break: keep-all; }
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
    const box = document.createElement("aside");
    box.className = "dasan";
    const footer = document.querySelector("footer");
    if (footer) footer.after(box); else document.body.appendChild(box);

    const render = () => {
      const t = T[langOf()];
      box.innerHTML = `
        <a class="dasan-card" href="${t.href}" target="_blank" rel="noopener">
          <span class="dasan-tag">${esc(t.tag)}</span>
          <img class="dasan-logo" src="dasan-logo.png" alt="DASAN" width="360" height="85" loading="lazy">
          <p class="dasan-title">${esc(t.title)}</p>
          <p class="dasan-sub">${esc(t.sub)}</p>
          <div class="dasan-row">
            <div class="dasan-tel"><small>${esc(t.contact)}</small><b>${esc(t.tel)}</b></div>
            <span class="dasan-cta">${esc(t.cta)} →</span>
          </div>
          <p class="dasan-corp">${esc(t.corp)}</p>
        </a>`;
    };
    render();
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
