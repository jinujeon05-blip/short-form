// 메뉴 글자 자동 번역 (Vercel AI Gateway, OpenAI 호환 주소). 실패하면 번역 없이 원문만 두고 알려 준다.
const LANG_NAME = { ko: 'Korean', en: 'English', zh: 'Simplified Chinese', ja: 'Japanese', vi: 'Vietnamese' };

function tokenFrom(req) {
  return process.env.AI_GATEWAY_API_KEY || (req && req.headers && req.headers['x-vercel-oidc-token']) || process.env.VERCEL_OIDC_TOKEN || '';
}

// jobs: [{ text, from, to: ['en','zh'] }]  →  결과 배열 [{en:'..', zh:'..'}, ...] (실패한 것은 빈 객체)
async function translate(req, jobs) {
  const out = jobs.map(() => ({}));
  if (!jobs.length) return { out, ok: true };
  const token = tokenFrom(req);
  if (!token) return { out, ok: false, why: 'no_token' };
  const model = process.env.TRANSLATE_MODEL || 'anthropic/claude-haiku-4.5';
  const items = jobs.map((j, i) => ({ id: i, from: LANG_NAME[j.from], to: j.to.map((l) => LANG_NAME[l]), text: j.text }));
  const prompt = `You translate restaurant menu texts (dish names, short descriptions, notes) for a customer-facing menu.
Keep it short and natural, keep proper nouns/dish names recognizable, keep numbers and units. Do not add explanations.
Return ONLY a JSON object mapping each id to an object whose keys are the language codes ${JSON.stringify(Object.keys(LANG_NAME))} (use the codes: Korean=ko, English=en, Simplified Chinese=zh, Japanese=ja, Vietnamese=vi) for the requested target languages only.
Input: ${JSON.stringify(items)}`;
  try {
    const r = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
      body: JSON.stringify({ model, temperature: 0, messages: [{ role: 'user', content: prompt }] }),
    });
    if (!r.ok) return { out, ok: false, why: 'http_' + r.status };
    const j = await r.json();
    const txt = j.choices?.[0]?.message?.content || '';
    const m = txt.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(m ? m[0] : '{}');
    jobs.forEach((job, i) => {
      const o = parsed[i] || parsed[String(i)] || {};
      for (const l of job.to) if (typeof o[l] === 'string' && o[l].trim()) out[i][l] = o[l].trim().slice(0, 300);
    });
    return { out, ok: true };
  } catch (e) {
    return { out, ok: false, why: 'error' };
  }
}

module.exports = { translate, LANG_NAME };
