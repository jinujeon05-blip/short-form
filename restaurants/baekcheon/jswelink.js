// JS welink(제이에스 위링크) 파트너 배너 — 메뉴판 맨 아래에 붙는다. (현재 백천화덕아나고만)
// 원본은 restaurants/_shared/ 에만 두고, sync-jswelink.sh 로 각 가게 폴더에 복사한다.
// 문구·주소는 jswelink 배너 키트(README_jswelink_banner.md) 그대로. 메뉴판 언어(<html lang>)를 따라 바뀐다.
(function () {
  const T = {
    ko: { tag: "파트너", head: "베트남 인재 채용·한국 유학 상담은 JS welink",
      intro: "베트남 숙련인력(E-7)·유학생(D-2·D-4)을 한국 기업과 학교에 연결하는 인력송입 전문기업",
      cta: "자세히 보기", url: "https://www.jswelink.co.kr" },
    en: { tag: "Partner", head: "Hiring Vietnamese talent or studying in Korea? Talk to JS welink",
      intro: "Connecting skilled Vietnamese workers (E-7) and students (D-2·D-4) with Korean companies and schools.",
      cta: "Learn more", url: "https://www.jswelink.co.kr" },
    vi: { tag: "Đối tác", head: "Tìm việc làm hoặc du học tại Hàn Quốc? Liên hệ JS welink",
      intro: "Kết nối lao động tay nghề (E-7) và du học sinh (D-2·D-4) Việt Nam với doanh nghiệp, trường học Hàn Quốc.",
      cta: "Xem chi tiết", url: "https://www.jswelink.co.kr/en/" },
    zh: { tag: "合作伙伴", head: "招聘越南人才、赴韩留学咨询，请找 JS welink",
      intro: "连接越南技术人才（E-7）、留学生（D-2·D-4）与韩国企业和学校。",
      cta: "了解更多", url: "https://www.jswelink.co.kr" },
    ja: { tag: "パートナー", head: "ベトナム人材の採用・韓国留学のご相談は JS welink へ",
      intro: "ベトナムの熟練人材（E-7）・留学生（D-2・D-4）と韓国の企業・学校をつなぎます。",
      cta: "詳しく見る", url: "https://www.jswelink.co.kr" },
  };
  const SLOGAN = "From Vietnam to Korea · Link the Future";

  const css = `
    .jsw { box-sizing: border-box; max-width: 560px; margin: 0 auto; padding: 18px 16px calc(22px + env(safe-area-inset-bottom)); font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Noto Sans SC", "Noto Sans JP", sans-serif; }
    .jsw * { box-sizing: border-box; }
    .jsw-card { position: relative; display: block; overflow: hidden; text-decoration: none; color: #fff; border-radius: 16px; padding: 16px 16px 13px; line-height: 1.4;
      background: radial-gradient(120% 90% at 100% 0%, rgba(201,163,90,.22), transparent 55%), linear-gradient(160deg, #0B1A33, #070B16);
      border: 1px solid rgba(201,163,90,.55); box-shadow: 0 8px 22px rgba(7,11,22,.35); }
    .jsw-tag { position: absolute; top: 11px; right: 12px; font-size: 10.5px; font-weight: 700; letter-spacing: .3px; color: #C9A35A; border: 1px solid rgba(201,163,90,.6); border-radius: 4px; padding: 1px 6px; }
    .jsw-logo { display: block; height: 30px; width: auto; }
    .jsw-head { margin: 12px 0 0; font-size: 15.5px; font-weight: 800; color: #fff; }
    .jsw-intro { margin: 4px 0 0; font-size: 12.8px; color: #c4cbd8; }
    .jsw-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 12px; padding-top: 11px; border-top: 1px solid rgba(201,163,90,.3); }
    .jsw-slogan { font-family: Georgia, "Times New Roman", serif; font-style: italic; font-size: 12px; color: #C9A35A; }
    .jsw-cta { flex: none; font-size: 13px; font-weight: 800; color: #0B1A33; background: linear-gradient(135deg, #e3c27e, #C9A35A); border-radius: 999px; padding: 8px 14px; white-space: nowrap; }
    :lang(ko) .jsw { word-break: keep-all; }
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
    box.className = "jsw";
    // 다른 파트너 배너가 있으면 그 아래, 없으면 footer 바로 아래
    const after = document.querySelector("aside.dasan") || document.querySelector("footer");
    if (after) after.after(box); else document.body.appendChild(box);

    const render = () => {
      const t = T[langOf()];
      box.innerHTML = `
        <a class="jsw-card" href="${t.url}" target="_blank" rel="noopener">
          <span class="jsw-tag">${esc(t.tag)}</span>
          <img class="jsw-logo" src="jswelink-logo.png" alt="JS welink" width="440" height="98" loading="lazy">
          <p class="jsw-head">${esc(t.head)}</p>
          <p class="jsw-intro">${esc(t.intro)}</p>
          <div class="jsw-row"><span class="jsw-slogan">${SLOGAN}</span><span class="jsw-cta">${esc(t.cta)} →</span></div>
        </a>`;
    };
    render();
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
