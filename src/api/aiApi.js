const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * @param {string} model - OpenRouter model ID (e.g. "anthropic/claude-haiku-4.5")
 * @param {object} options
 * @param {string} options.system - System prompt
 * @param {string} options.user - User message
 * @param {number} [options.maxTokens=256]
 * @returns {Promise<string>}
 */
export async function openRouterChat(model, { system, user, maxTokens = 256 }) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
    "HTTP-Referer": window.location.origin,
    "X-Title": "Volt Weather App",
  };

  const body = {
    model,
    max_tokens: maxTokens,
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
    throw new Error(err.error?.message ?? `HTTP ${res.status}: Gagal menghubungi OpenRouter`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "Tidak dapat membuat briefing saat ini.";
}

export default { openRouterChat };