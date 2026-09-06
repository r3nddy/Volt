import {
  DEFAULT_RADIO_STATION,
  RADIO_STATIONS,
  getRadioStation,
} from "../data/radioStations.js";

const MAX_REASON_LENGTH = 120;

export function parseRadioRecommendation(raw) {
  let parsed;
  try {
    const cleaned = raw
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "");
    parsed = JSON.parse(cleaned);
  } catch {
    return fallbackRecommendation();
  }

  const station = getRadioStation(parsed?.stationId);
  if (!station) return fallbackRecommendation();

  const reason = typeof parsed.reason === "string" ? parsed.reason.trim() : "";
  return {
    station,
    reason:
      reason.slice(0, MAX_REASON_LENGTH) || "Dipilih untuk suasana saat ini",
  };
}

export function fallbackRecommendation(
  weatherData,
  hour = new Date().getHours(),
) {
  const description = weatherData?.weather?.[0]?.main?.toLowerCase() ?? "";
  const isMorning = hour >= 5 && hour < 11;
  const isRainy =
    description.includes("rain") || description.includes("drizzle");
  const stationId = isRainy
    ? "love-yourself-justin-bieber"
    : isMorning
      ? "axol-alex-skrindo-you"
      : "lifting-dreams";

  return {
    station: getRadioStation(stationId) ?? DEFAULT_RADIO_STATION,
    reason: "Pilihan radio default berdasarkan konteks saat ini",
  };
}

export function buildRadioPrompt(weatherData, timeString) {
  const context = [
    `Waktu lokal: ${timeString ?? "tidak diketahui"}`,
    weatherData?.name ? `Kota: ${weatherData.name}` : "Cuaca: tidak tersedia",
    weatherData?.weather?.[0]?.description
      ? `Kondisi: ${weatherData.weather[0].description}`
      : null,
    "Pilih satu channel untuk aktivitas kerja atau suasana latar.",
  ].filter(Boolean);

  const stations = RADIO_STATIONS.map(
    ({ id, name, description, moods }) =>
      `${id}: ${name} — ${description}; mood: ${moods.join(", ")}`,
  );

  return `${context.join("\n")}\n\nChannel tersedia:\n${stations.join("\n")}`;
}
