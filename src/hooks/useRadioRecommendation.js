import { useCallback, useEffect, useRef, useState } from "react";
import {
  fallbackRecommendation,
  getRadioRecommendation,
} from "../services/radioService.js";

export function useRadioRecommendation(weatherData) {
  const [recommendation, setRecommendation] = useState(() =>
    fallbackRecommendation(),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);

  const refresh = useCallback(async () => {
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
      const next = await getRadioRecommendation(weatherData, now);
      if (id === requestIdRef.current) setRecommendation(next);
    } catch {
      if (id !== requestIdRef.current) return;
      setRecommendation(fallbackRecommendation(weatherData));
      setError("AI radio tidak tersedia. Memakai rekomendasi default.");
    } finally {
      if (id === requestIdRef.current) setLoading(false);
    }
  }, [weatherData]);

  useEffect(() => {
    if (weatherData) refresh();
  }, [weatherData, refresh]);

  return { recommendation, loading, error, refresh };
}

export default useRadioRecommendation;
