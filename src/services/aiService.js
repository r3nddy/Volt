import { openRouterChat } from "../api/aiApi";

// Model OpenRouter — model gratis
const MODEL = "openrouter/free";

const SYSTEM_PROMPT = `Kamu adalah asisten cuaca untuk aplikasi Volt.
Beri ringkasan singkat (2-3 kalimat) dalam Bahasa Indonesia yang:
- Menjelaskan kondisi saat ini secara kontekstual
- Memberi rekomendasi praktis (pakaian, aktivitas, persiapan)
- Nada: santai, helpful, seperti teman ngasih tahu

Format output WAJIB 3 kalimat pendek, tidak lebih dari 250 karakter total.
Jangan gunakan markdown, bullet, atau list.`;

/**
 * @param {object} weatherData - Data cuaca dari OpenWeather API
 * @param {string} timeString - Waktu lokal yang diformat
 * @returns {Promise<string>}
 */
export async function getBriefing(weatherData, timeString) {
  if (!weatherData) throw new Error("Data cuaca tidak tersedia");

  const userPrompt = buildUserPrompt(weatherData, timeString);

  return openRouterChat(MODEL, {
    system: SYSTEM_PROMPT,
    user: userPrompt,
    maxTokens: 256,
  });
}

function buildUserPrompt(data, timeString) {
  const parts = [
    `Kota: ${data.name}`,
    `Suhu: ${data.main.temp}°C, terasa seperti ${data.main.feels_like}°C`,
    `Kondisi: ${data.weather?.[0]?.description ?? "tidak diketahui"}`,
    `Kelembapan: ${data.main.humidity}%`,
    `Angin: ${data.wind.speed} m/s`,
    `Tekanan: ${data.main.pressure} hPa`,
  ];

  if (timeString) {
    parts.push(`Waktu lokal: ${timeString}`);
  }

  parts.push("Berikan ringkasan dan rekomendasi singkat.");
  return parts.join("\n");
}
