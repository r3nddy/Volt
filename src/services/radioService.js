import { openRouterChat } from "../api/aiApi";
import {
  buildRadioPrompt,
  fallbackRecommendation,
  parseRadioRecommendation,
} from "./radioRecommendation.js";

const MODEL = "anthropic/claude-haiku-4-5";

const SYSTEM_PROMPT = `Kamu memilih satu channel radio internet untuk aplikasi Volt.
Pilih hanya dari station ID yang diberikan.
Balas JSON valid tanpa markdown dengan format: {"stationId":"...","reason":"..."}.
Reason harus singkat dalam Bahasa Indonesia, maksimal 120 karakter.`;

export async function getRadioRecommendation(weatherData, timeString) {
  const raw = await openRouterChat(MODEL, {
    system: SYSTEM_PROMPT,
    user: buildRadioPrompt(weatherData, timeString),
    maxTokens: 128,
  });

  return parseRadioRecommendation(raw);
}

export { fallbackRecommendation, parseRadioRecommendation };

export default { getRadioRecommendation, parseRadioRecommendation };
