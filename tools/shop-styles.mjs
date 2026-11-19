// 가게 만들기 '모양 스타일' (2026-11-13, 캡틴 결정 가-1·나-1)
// 스타일 = 가마솥 표준 구조는 그대로 두고 CSS(바탕 질감·제목 모양·분류 탭·메뉴 칸·가격 표시)만 덧씌운다.
// - 글꼴은 바꾸지 않는다(font-family 금지, 본문 글꼴 하나). 그림 파일·외부 글꼴 없이 CSS·SVG로만 그린다(추가 비용 0원).
// - 가마솥 모양(왼쪽 띠·물결 무늬·모서리 선)은 쓰지 않는다. 새 요소(사진·문구 상자·버튼)도 넣지 않는다.
// - 색은 :root 변수(--band·--rust·--paper 등)를 따라가므로 캡틴이 색을 바꾸면 스타일도 따라 바뀐다.
// 화면 쪽 이름·설명·기본 색·미리보기 그림은 dashboard/static/builder.js 의 STYLES 에 있다(id 가 같아야 함).
// 새 스타일 추가 방법: docs/shop-builder.md '모양 스타일'.

const svg = (s) => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;

// C = build-shop.mjs 가 계산한 색(paper·paper2·ink·muted·line·card·band·band2·accent·title·navInk), dark = 어두운 바탕, mix(a,b,t)
export const STYLES = {
  // 1. 기본: 지금까지의 모양(위쪽 띠·줄 목록) — 덧씌우는 것 없음
  basic: () => '',

  // 2. 간판 상자: 가게 이름을 두꺼운 테두리 상자(간판)로, 분류 탭·분류 제목은 사각 도장
  signbox: (C, dark) => `
  h1 { display: inline-block; max-width: 100%; border: 4px solid ${C.title}; border-radius: 4px; padding: 10px 16px 8px; box-shadow: 5px 5px 0 var(--band); background: var(--card); overflow-wrap: anywhere; }
  .en { margin-top: 12px; }
  nav a { border-radius: 3px; }
  nav a.active { box-shadow: inset 0 0 0 2px var(--band-2); }
  .head::before, .head::after { height: 3px; background: var(--band); }
  h2 { border: 3px solid var(--band); border-radius: 3px; padding: 6px 14px 5px; background: var(--card); }
  .tags span { border-radius: 2px; }
  .thumb { border-radius: 4px; border: 2px solid var(--band); }
  .price { color: ${dark ? C.accent : C.band2}; }`,

  // 3. 한지·먹: 한지 결 바탕, 가게 이름 아래 붓 획, 분류 제목 옆 매듭(마름모), 밑줄 탭
  hanji: (C, dark, mix) => `
  :root { ${dark ? '' : `--paper: ${mix('#f6f0e3', C.band, 0.04)}; --paper-2: ${mix('#ece3d0', C.band, 0.06)}; --card: #fbf8f0;`} }
  body { background-color: var(--paper); background-image: ${svg(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><g fill='none' stroke='${dark ? '#fff' : '#7a6a50'}' stroke-opacity='${dark ? '.05' : '.09'}' stroke-width='.8' stroke-linecap='round'><path d='M8 14q14-5 26 2M60 30q10 6 24 1M18 70q12-7 22 0M80 88q14 4 26-3M44 104q8-6 18 1M96 52q8 5 16 0'/></g><g fill='${dark ? '#fff' : '#8a7a5c'}' fill-opacity='${dark ? '.04' : '.08'}'><circle cx='30' cy='40' r='1'/><circle cx='90' cy='18' r='.8'/><circle cx='70' cy='64' r='1.1'/><circle cx='12' cy='96' r='.9'/><circle cx='108' cy='108' r='1'/></g></svg>`)}; }
  header { background: none; }
  h1::after { content: ""; display: block; width: min(70%, 220px); height: 9px; margin: 10px auto 0; background: var(--band); border-radius: 60% 40% 70% 30% / 70% 50% 50% 30%; transform: rotate(-1.5deg); opacity: .9;
    -webkit-mask: linear-gradient(90deg, transparent, #000 12%, #000 80%, transparent); mask: linear-gradient(90deg, transparent, #000 12%, #000 80%, transparent); }
  nav a { border-radius: 0; }
  nav a.active { color: ${C.navInk}; background: none; box-shadow: inset 0 -3px 0 var(--rust); }
  .head::before, .head::after { height: 1px; background: linear-gradient(90deg, transparent, var(--band)); }
  .head::after { background: linear-gradient(270deg, transparent, var(--band)); }
  h2::before { content: ""; display: block; width: 8px; height: 8px; margin: 0 auto 8px; background: var(--rust); transform: rotate(45deg); }
  h2 small { margin-top: 5px; }
  li { border-bottom: 1px dashed var(--line); }
  .tags span { border-radius: 2px; }`,

  // 4. 나무 판: 나무결 바탕, 메뉴 칸이 판자, 가격은 낙인 도장
  wood: (C, dark, mix) => {
    const wood = dark ? mix('#24170e', C.band, 0.35) : mix('#e9d6b8', C.band, 0.18);
    const plank = dark ? mix('#3a2617', C.band, 0.3) : '#fbf3e4';
    const grain = dark ? '#000' : '#7a5530';
    return `
  :root { --paper: ${wood}; --card: ${plank}; }
  body { background-color: var(--paper); background-image: ${svg(`<svg xmlns='http://www.w3.org/2000/svg' width='200' height='60'><g fill='none' stroke='${grain}' stroke-opacity='${dark ? '.28' : '.12'}' stroke-width='1.2'><path d='M0 8q50 6 100 0t100 0M0 22q40-5 90 1t110-2M0 37q60 7 110 0t90 2M0 52q50-6 100 0t100 0'/></g><ellipse cx='150' cy='30' rx='9' ry='4' fill='none' stroke='${grain}' stroke-opacity='${dark ? '.3' : '.14'}'/></svg>`)}; }
  header { background: none; }
  h1 { text-shadow: 0 2px 0 ${dark ? 'rgba(0,0,0,.6)' : 'rgba(255,255,255,.7)'}; }
  .tagline { color: ${dark ? C.muted : mix(C.ink, C.band, 0.3)}; }
  .chips span { background: var(--card); }
  .note { color: var(--ink); background: var(--card); }
  .tip { color: var(--ink); background: var(--card); }
  ul { margin-top: 12px; }
  li, li:last-child { background: var(--card); border: 0; border-radius: 6px; padding: 12px; margin-bottom: 10px;
    background-image: repeating-linear-gradient(0deg, transparent 0 9px, ${dark ? 'rgba(0,0,0,.12)' : 'rgba(122,85,48,.05)'} 9px 10px);
    box-shadow: inset 0 -3px 0 ${dark ? 'rgba(0,0,0,.35)' : 'rgba(122,85,48,.18)'}, 0 2px 5px rgba(0,0,0,${dark ? '.4' : '.15'}); }
  li::before { content: none; }
  .head::before, .head::after { height: 3px; border-radius: 2px; background: var(--band); }
  .price { color: ${dark ? C.accent : C.band2}; border: 2px solid currentColor; border-radius: 5px; padding: 1px 7px; transform: rotate(-2deg); }
  .row .leader { opacity: .6; }
  .thumb { border-radius: 4px; }`;
  },

  // 5. 칠판: 짙은 칠판 바탕(나무 틀), 흐린 분필 글씨 제목, 분필 점선
  chalk: (C, dark, mix) => {
    const board = mix('#1f2a24', C.band, 0.35);
    return `
  :root { --paper: ${board}; --paper-2: ${mix(board, '#ffffff', 0.08)}; --card: ${mix(board, '#ffffff', 0.05)}; --ink: #f3f1ea; --muted: #c9cfc6; --line: rgba(255,255,255,.22); }
  body { background-color: var(--paper); background-image: radial-gradient(ellipse at 20% 15%, rgba(255,255,255,.07), transparent 45%), radial-gradient(ellipse at 85% 60%, rgba(255,255,255,.05), transparent 40%), radial-gradient(ellipse at 40% 90%, rgba(255,255,255,.04), transparent 45%); background-attachment: fixed; }
  header { background: none; border-top: 10px solid ${mix('#8a6a43', C.band, 0.15)}; box-shadow: inset 0 6px 0 rgba(0,0,0,.25); }
  h1 { color: ${C.title}; text-shadow: 0 0 1px rgba(255,255,255,.7), 0 0 7px rgba(255,255,255,.18); }
  .en, .tagline { color: var(--muted); }
  .chips span { color: var(--ink); background: transparent; border: 1.5px dashed rgba(255,255,255,.45); }
  nav { background: ${mix(board, '#000000', 0.25)}; }
  nav a { color: #d9ddd5; }
  nav a.active { color: ${board}; background: #f3f1ea; }
  .head::before, .head::after { height: 0; border-top: 2px dashed rgba(255,255,255,.35); background: none; }
  h2 { text-shadow: 0 0 1px rgba(255,255,255,.6), 0 0 6px rgba(255,255,255,.15); }
  .note { color: var(--ink); background: rgba(255,255,255,.06); }
  .tip { color: var(--ink); background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.35); }
  li { border-bottom: 1.5px dashed rgba(255,255,255,.18); }
  .row .leader { border-bottom-color: rgba(255,255,255,.35); }
  .price { color: ${C.accent}; }
  .desc { color: #dfe3db; }
  .sizes span { background: transparent; border-color: rgba(255,255,255,.35); }
  .tags .hot { background: transparent; color: #ffb3a3; border-color: rgba(255,179,163,.6); }
  .thumb { background: var(--card); border-color: rgba(255,255,255,.25); }`;
  },

  // 6. 네온: 어두운 벽돌 벽, 빛나는 가게 이름·탭
  neon: (C, dark, mix) => {
    const wall = mix('#121016', C.band, 0.25);
    return `
  :root { --paper: ${wall}; --paper-2: ${mix(wall, '#ffffff', 0.07)}; --card: ${mix(wall, '#ffffff', 0.04)}; --ink: #f4f1fa; --muted: #bdb6cc; --line: rgba(255,255,255,.13); }
  body { background-color: var(--paper); background-image: ${svg(`<svg xmlns='http://www.w3.org/2000/svg' width='64' height='32'><path d='M0 .5H64M0 16.5H64M.5 0V16M32.5 16V32' fill='none' stroke='#fff' stroke-opacity='.06'/></svg>`)}; }
  header { background: radial-gradient(ellipse at 50% 55%, ${C.title}22, transparent 65%); border-top: 0; }
  h1 { color: ${C.title}; text-shadow: 0 0 2px #fff, 0 0 8px ${C.title}, 0 0 18px ${C.title}, 0 0 36px ${C.title}; }
  .en { color: ${C.accent}; text-shadow: 0 0 6px ${C.accent}; }
  .tagline { color: var(--muted); }
  .chips span { color: var(--ink); background: transparent; border: 1px solid ${C.accent}; box-shadow: 0 0 6px ${C.accent}66; }
  nav { background: ${mix(wall, '#000000', 0.4)}; box-shadow: 0 2px 0 ${C.accent}55, 0 4px 14px rgba(0,0,0,.5); }
  nav a { color: #d8d2e6; border: 1px solid transparent; margin: 0 2px; }
  nav a.active { color: ${C.title}; background: transparent; border-color: ${C.title}; box-shadow: 0 0 8px ${C.title}aa, inset 0 0 6px ${C.title}66; text-shadow: 0 0 6px ${C.title}; }
  .head::before, .head::after { height: 2px; background: ${C.accent}; box-shadow: 0 0 6px ${C.accent}; }
  h2 { color: #fff; text-shadow: 0 0 6px ${C.accent}, 0 0 14px ${C.accent}88; }
  .note { color: var(--ink); background: rgba(255,255,255,.05); border-left-color: ${C.accent}; }
  .tip { color: var(--ink); background: rgba(255,255,255,.04); border-color: ${C.accent}88; }
  li { border-bottom: 1px solid rgba(255,255,255,.1); }
  .row .leader { border-bottom-color: rgba(255,255,255,.25); }
  .price { color: ${C.title}; text-shadow: 0 0 6px ${C.title}88; }
  .desc { color: #d6d0e2; }
  .sizes span { background: transparent; border-color: ${C.title}88; }
  .tags .hot { background: transparent; color: #ff9db0; border-color: #ff9db088; }
  .thumb { background: var(--card); border-color: ${C.title}55; }`;
  },

  // 7. 분식 팝: 물방울 점 바탕, 굵은 그림자 카드·탭, 말풍선 가격
  pop: (C, dark) => `
  body { background-color: var(--paper); background-image: radial-gradient(${C.band}${dark ? '22' : '1f'} 22%, transparent 24%), radial-gradient(${C.accent}${dark ? '1a' : '17'} 22%, transparent 24%); background-size: 26px 26px; background-position: 0 0, 13px 13px; }
  header { background: none; }
  h1 { text-shadow: 3px 3px 0 ${C.accent}; }
  .chips span { color: var(--ink); background: var(--card); border: 2px solid var(--ink); box-shadow: 2px 2px 0 var(--ink); }
  nav .wrap { gap: 6px; }
  nav a { color: var(--ink); background: var(--card); border: 2px solid var(--ink); box-shadow: 2px 2px 0 var(--ink); padding: 6px 12px; }
  nav a.active { color: #fff; background: ${C.accent}; }
  .head::before, .head::after { height: 3px; border-radius: 3px; background: var(--ink); }
  h2 { background: var(--card); border: 2px solid var(--ink); border-radius: 999px; padding: 6px 16px 5px; box-shadow: 3px 3px 0 var(--band); }
  ul { margin-top: 12px; }
  li, li:last-child { background: var(--card); border: 2px solid var(--ink); border-radius: 16px; padding: 10px 12px; margin-bottom: 12px; box-shadow: 4px 4px 0 var(--band); }
  .thumb { border-radius: 10px; border: 2px solid var(--ink); }
  .row .leader { min-width: 6px; }
  .price { position: relative; color: #fff; background: ${C.accent}; border-radius: 10px; padding: 2px 8px; }
  .price small { color: rgba(255,255,255,.85); }
  .price::before { content: ""; position: absolute; left: -5px; top: 50%; margin-top: -4px; border: 4px solid transparent; border-right: 5px solid ${C.accent}; border-left: 0; }
  .tags span { border-radius: 99px; padding: 1px 8px; }`,

  // 10. 깔끔 모던: 장식 최소, 얇은 선, 넓은 여백, 밑줄 탭
  modern: (C, dark) => `
  header { border-top: 3px solid var(--band); background: var(--paper); }
  h1 { font-weight: 700; letter-spacing: 2px; }
  .en { font-weight: 600; letter-spacing: 6px; color: var(--muted); }
  .chips span { color: var(--muted); background: transparent; border: 1px solid var(--line); border-radius: 4px; }
  nav { background: var(--paper); box-shadow: 0 1px 0 var(--line), 0 6px 14px rgba(0,0,0,${dark ? '.3' : '.05'}); }
  nav a { color: var(--muted); border-radius: 0; }
  nav a.active { color: var(--ink); background: none; box-shadow: inset 0 -2px 0 ${C.accent}; }
  section { padding-top: 38px; }
  .head { justify-content: flex-start; }
  .head::before { content: none; }
  .head::after { background: var(--line); }
  h2 { text-align: left; font-size: 22px; font-weight: 700; letter-spacing: 0; }
  h2 small { font-size: 12.5px; }
  .note { border-left-width: 2px; border-radius: 0; background: none; }
  li { padding: 16px 0; }
  .row .leader { border-bottom: 1px solid var(--line); transform: translateY(-5px); }
  .price { font-weight: 700; }
  .tags span { border-radius: 2px; }
  .thumb { border-radius: 6px; }`,
};

export function styleCss(id, C, dark, mix) {
  const f = STYLES[id || 'basic'];
  if (!f) throw new Error(`모양 스타일 '${id}' 이 없음(가능: ${Object.keys(STYLES).join(', ')})`);
  const css = f(C, dark, mix).trim();
  return css ? `<style id="shop-style">\n  /* 가게 만들기 모양 스타일: ${id} (tools/shop-styles.mjs) */\n  ${css}\n</style>\n` : '';
}
