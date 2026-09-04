import { useState, useEffect, useRef, useCallback } from "react";
import { getBriefing } from "../services/aiService";

/**
 * @param {object|null} weatherData - data cuaca dari useWeather
 * @returns {{ briefing: string|null, loading: boolean, error: string|null, refresh: () => void }}
 */
export function useBriefing(weatherData) {
  const [briefing, setBriefing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // deteksi perubahan kota untuk auto-regenerate
  const lastCityRef = useRef(null);
  const requestIdRef = useRef(0);

  const fetchBriefing = useCallback(async () => {
    if (!weatherData) return;

    const id = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const now = new Date().toLocaleString("id-ID", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      });

      const text = await getBriefing(weatherData, now);
      if (id === requestIdRef.current) {
        setBriefing(text);
        lastCityRef.current = weatherData.name;
      }
    } catch (err) {
      if (id !== requestIdRef.current) return;
      setError("Gagal membuat briefing. Coba lagi.");
      setBriefing(null);
    } finally {
      if (id === requestIdRef.current) setLoading(false);
    }
  }, [weatherData]);

  useEffect(() => {
    if (!weatherData) return;

    // auto-fetch saat kota berubah
    if (weatherData.name !== lastCityRef.current) {
      fetchBriefing();
    }
  }, [weatherData, fetchBriefing]);

  return { briefing, loading, error, refresh: fetchBriefing };
}