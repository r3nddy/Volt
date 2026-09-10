const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * @param {string} model - OpenRouter model ID (e.g. "anthropic/claude-haiku-4.5")
 * @param {object} options
 * @param {string} options.system - System prompt
 * @param {string} options.user - User message
 * @param {number} [options.maxTokens=1024]
 * @returns {Promise<string>}
 */
export async function openRouterChat(
  model,
  { system, user, maxTokens = 1024 },
) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
    "HTTP-Referer": window.location.origin,
    "X-Title": "Volt Weather App",
  };

  const body = {
    model,
    max_tokens: maxTokens,
    // openrouter/free bisa route ke model reasoning; tanpa ini raisoning menghabiskan max_tokens
    reasoning: { exclude: true },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message =
      err.error?.message ?? `HTTP ${res.status}: Gagal menghubungi OpenRouter`;

    if (res.status === 429) {
      console.error(
        "[OpenRouter Error 429] Batas limit harian/rate limit OpenRouter tercapai:",
        err,
      );
    } else {
      console.error(`[OpenRouter Error ${res.status}]`, err);
    }

    throw new Error(message);
  }

  const data = await res.json();
  return (
    data.choices?.[0]?.message?.content ??
    "Tidak dapat membuat briefing saat ini."
  );
}

export default { openRouterChat };
