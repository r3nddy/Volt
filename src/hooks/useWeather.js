import { useCallback, useEffect, useRef, useState } from "react";
import { getCurrentWeather } from "../services/weatherService";

export function useWeather(city) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // agar respons request lama tidak menimpa request baru
  const requestIdRef = useRef(0);

  const fetchWeather = useCallback(async () => {
    if (!city) return;
    const id = ++requestIdRef.current;
    setLoading(true);
    setError(null);
    try {
      const result = await getCurrentWeather(city);
      if (id === requestIdRef.current) setData(result);
    } catch (err) {
      if (id !== requestIdRef.current) return;
      const status = err.response?.status;
      if (status === 404) {
        setError(`Kota "${city}" tidak ditemukan`);
      } else if (status === 401) {
        setError("API key OpenWeather tidak valid (cek VITE_OPENWEATHER_KEY)");
      } else {
        setError("Gagal mengambil data cuaca. Coba lagi.");
      }
      setData(null);
    } finally {
      if (id === requestIdRef.current) setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { data, loading, error, retry: fetchWeather };
}
