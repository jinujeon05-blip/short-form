// Share-card drawings (1080×1350) for KakaoTalk / Zalo / Instagram.
import { BRANCH_HANJA, STEM_HANJA, branchElement, stemElement } from '../engine/ganzhi';
import { MatchResult } from '../engine/match';
import { SajuResult } from '../engine/pillars';
import { Lang } from '../i18n';
import { Dict } from '../i18n/ko';

export const CARD_W = 1080;
export const CARD_H = 1350;

const C = {
  bg: '#0b0d1a', bg2: '#151a33', panel: 'rgba(255,255,255,0.04)', line: 'rgba(226,192,122,0.28)',
  gold: '#e2c07a', goldSoft: '#f3e1b4', text: '#ece8de', muted: '#9c9db0',
};
export const ELEMENT_HEX = ['#5fb37a', '#e2654c', '#d2a64a', '#c9cdd6', '#5b8fd9'];

const fonts = (lang: Lang) => ({
  serif: lang === 'vi' ? '"Noto Serif", "Noto Serif KR", serif' : '"Noto Serif KR", "Noto Serif", serif',
  sans: lang === 'vi' ? '"Be Vietnam Pro", "Noto Sans KR", sans-serif' : '"Noto Sans KR", "Be Vietnam Pro", sans-serif',
});

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lineH: number, maxLines = 3): number {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const shown = lines.slice(0, maxLines);
  if (lines.length > maxLines) shown[maxLines - 1] = `${shown[maxLines - 1].replace(/.{2}$/, '')}…`;
  shown.forEach((l, i) => ctx.fillText(l, x, y + i * lineH));
  return y + shown.length * lineH;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function frame(ctx: CanvasRenderingContext2D, t: Dict, lang: Lang) {
  const f = fonts(lang);
  const g = ctx.createLinearGradient(0, 0, 0, CARD_H);
  g.addColorStop(0, C.bg2);
  g.addColorStop(1, C.bg);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // moon glow
  const glow = ctx.createRadialGradient(900, 170, 20, 900, 170, 320);
  glow.addColorStop(0, 'rgba(226,192,122,0.35)');
  glow.addColorStop(1, 'rgba(226,192,122,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(500, 0, 580, 600);
  const moon = ctx.createRadialGradient(880, 150, 10, 900, 170, 90);
  moon.addColorStop(0, '#fff6dc');
  moon.addColorStop(0.6, '#e9cd8c');
  moon.addColorStop(1, '#b48f4b');
  ctx.fillStyle = moon;
  ctx.beginPath();
  ctx.arc(900, 170, 90, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = C.line;
  ctx.lineWidth = 2;
  roundRect(ctx, 30, 30, CARD_W - 60, CARD_H - 60, 36);
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = C.goldSoft;
  ctx.font = `700 46px ${f.serif}`;
  ctx.fillText(t.brand, 80, 120);
  ctx.fillStyle = C.muted;
  ctx.font = `500 22px ${f.sans}`;
  ctx.fillText(t.brandSub, 80, 158);

  ctx.textAlign = 'center';
  ctx.fillStyle = C.muted;
  ctx.font = `500 26px ${f.sans}`;
  ctx.fillText(t.share.footer, CARD_W / 2, CARD_H - 112);
  ctx.fillStyle = C.gold;
  ctx.font = `600 30px ${f.sans}`;
  ctx.fillText(typeof window !== 'undefined' ? window.location.host : '', CARD_W / 2, CARD_H - 68);
}

export function drawSajuCard(ctx: CanvasRenderingContext2D, r: SajuResult, name: string, t: Dict, lang: Lang) {
  const f = fonts(lang);
  frame(ctx, t, lang);

  ctx.textAlign = 'left';
  ctx.fillStyle = C.text;
  ctx.font = `900 64px ${f.serif}`;
  ctx.fillText(name ? t.result.title(name) : t.share.sajuTitle, 80, 300);
  ctx.fillStyle = C.muted;
  ctx.font = `500 28px ${f.sans}`;
  ctx.fillText(`${r.solar.y}.${r.solar.m}.${r.solar.d}`, 80, 348);

  const cols = [r.hour, r.day, r.month, r.year];
  const boxW = 200;
  const gap = 26;
  const x0 = (CARD_W - (boxW * 4 + gap * 3)) / 2;
  cols.forEach((p, i) => {
    const x = x0 + i * (boxW + gap);
    ctx.textAlign = 'center';
    ctx.fillStyle = i === 1 ? C.gold : C.muted;
    ctx.font = `600 26px ${f.sans}`;
    ctx.fillText(t.result.pillars[i], x + boxW / 2, 420);
    [0, 1].forEach((row) => {
      const y = 440 + row * 210;
      ctx.fillStyle = C.panel;
      roundRect(ctx, x, y, boxW, 190, 22);
      ctx.fill();
      if (!p) {
        ctx.strokeStyle = C.line;
        ctx.setLineDash([8, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
        if (row === 0) {
          ctx.fillStyle = C.muted;
          ctx.font = `500 28px ${f.sans}`;
          ctx.fillText(t.result.unknown, x + boxW / 2, y + 200);
        }
        return;
      }
      const el = row === 0 ? stemElement(p.stem) : branchElement(p.branch);
      ctx.strokeStyle = ELEMENT_HEX[el];
      ctx.lineWidth = i === 1 && row === 0 ? 5 : 2;
      ctx.stroke();
      ctx.fillStyle = ELEMENT_HEX[el];
      ctx.font = `900 112px ${f.serif}`;
      ctx.fillText(row === 0 ? STEM_HANJA[p.stem] : BRANCH_HANJA[p.branch], x + boxW / 2, y + 125);
      ctx.fillStyle = C.text;
      ctx.font = `500 24px ${f.sans}`;
      const reading = row === 0 ? `${t.stems[p.stem]} · ${t.elements[el]}` : `${t.branches[p.branch]} · ${t.elements[el]}`;
      ctx.fillText(reading, x + boxW / 2, y + 168);
    });
  });

  // element bars
  const total = r.elements.reduce((a, b) => a + b, 0);
  const barX = 80;
  const barW = CARD_W - 160;
  let x = barX;
  r.elements.forEach((n, e) => {
    const w = (n / total) * barW;
    ctx.fillStyle = ELEMENT_HEX[e];
    ctx.fillRect(x, 880, w, 18);
    x += w;
  });
  ctx.textAlign = 'left';
  ctx.font = `600 24px ${f.sans}`;
  let lx = barX;
  r.elements.forEach((n, e) => {
    ctx.fillStyle = ELEMENT_HEX[e];
    const label = `${t.elements[e]} ${n}`;
    ctx.fillText(label, lx, 936);
    lx += ctx.measureText(label).width + 34;
  });

  const dm = t.dayMasters[r.dayMaster];
  ctx.fillStyle = C.goldSoft;
  ctx.font = `700 40px ${f.serif}`;
  ctx.fillText(dm.title, 80, 1020);
  ctx.fillStyle = C.text;
  ctx.font = `400 28px ${f.sans}`;
  const yEnd = wrap(ctx, dm.text, 80, 1070, CARD_W - 160, 42, 2);
  ctx.fillStyle = C.gold;
  ctx.font = `600 28px ${f.sans}`;
  ctx.fillText(`✦ ${dm.strengths}`, 80, yEnd + 12);
}

export function drawMatchCard(
  ctx: CanvasRenderingContext2D,
  m: MatchResult,
  names: [string, string],
  t: Dict,
  lang: Lang,
) {
  const f = fonts(lang);
  frame(ctx, t, lang);

  ctx.textAlign = 'center';
  ctx.fillStyle = C.gold;
  ctx.font = `600 30px ${f.sans}`;
  ctx.fillText(t.match.title, CARD_W / 2, 260);

  // two people
  const people: [string, number, number][] = [[names[0], m.zodiacA, m.nayinA], [names[1], m.zodiacB, m.nayinB]];
  people.forEach(([n, z, ny], i) => {
    const cx = i === 0 ? 290 : CARD_W - 290;
    ctx.font = `90px ${f.sans}`;
    ctx.fillText(t.animalEmoji[z], cx, 390);
    ctx.fillStyle = C.text;
    ctx.font = `700 40px ${f.serif}`;
    ctx.fillText(n, cx, 450, 340);
    ctx.fillStyle = C.muted;
    ctx.font = `500 24px ${f.sans}`;
    ctx.fillText(`${t.animals[z]} · ${t.nayin[ny]}`, cx, 490, 360);
    ctx.fillStyle = C.gold;
  });
  ctx.fillStyle = '#e2654c';
  ctx.font = `64px ${f.sans}`;
  ctx.fillText('♥', CARD_W / 2, 420);

  // score
  ctx.fillStyle = C.goldSoft;
  ctx.font = `900 200px ${f.serif}`;
  ctx.fillText(String(m.score), CARD_W / 2, 720);
  ctx.fillStyle = C.muted;
  ctx.font = `500 28px ${f.sans}`;
  ctx.fillText(t.match.scoreLabel, CARD_W / 2, 560);
  ctx.fillStyle = C.gold;
  ctx.font = `700 52px ${f.serif}`;
  ctx.fillText(t.match.grades[m.grade].title, CARD_W / 2, 800);

  // parts
  const parts = [
    [t.match.parts.stem, m.stem],
    [t.match.parts.dayBranch, m.dayBranch],
    [t.match.parts.zodiac, m.zodiac],
    [t.match.parts.nayin, m.nayin],
    [t.match.parts.balance, m.balance],
  ] as const;
  parts.forEach(([label, p], i) => {
    const y = 880 + i * 64;
    ctx.textAlign = 'left';
    ctx.fillStyle = C.text;
    ctx.font = `500 26px ${f.sans}`;
    ctx.fillText(label, 100, y + 22, 380);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    roundRect(ctx, 500, y, 400, 22, 11);
    ctx.fill();
    ctx.fillStyle = C.gold;
    roundRect(ctx, 500, y, Math.max(22, (p.points / p.max) * 400), 22, 11);
    ctx.fill();
    ctx.textAlign = 'right';
    ctx.fillStyle = C.muted;
    ctx.fillText(`${p.points}/${p.max}`, 980, y + 22);
  });
}
