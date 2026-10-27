// Claude Code 상태줄(statusLine) 명령: 입력으로 받은 rate_limits(5시간·주간 %)를
// ~/.claude/qrmenu-usage.json 에 남겨 대시보드가 읽게 하고, 상태줄에는 짧게 보여 준다.
// 설정(~/.claude/settings.json): "statusLine": { "type": "command", "command": "node D:/qrmenu/dashboard/claude-usage.mjs" }
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

let raw = '';
process.stdin.on('data', d => { raw += d; });
process.stdin.on('end', () => {
  let input = {};
  try { input = JSON.parse(raw); } catch {}
  const rl = input.rate_limits;
  if (rl && (rl.five_hour || rl.seven_day)) {
    const file = path.join(os.homedir(), '.claude', 'qrmenu-usage.json');
    try { fs.writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), rate_limits: rl })); } catch {}
  }
  const pct = w => (w ? `${Math.round(w.used_percentage)}%` : '-');
  const model = input.model?.display_name || '';
  process.stdout.write(rl ? `${model} · 5시간 ${pct(rl.five_hour)} · 주간 ${pct(rl.seven_day)}` : model);
});
