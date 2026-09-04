import { useState, useEffect, useCallback } from "react";
import { getTrivia } from "../services/triviaService";

const CACHE_KEY = "volt-trivia-cache";
const CACHE_TTL_MS = 4 * 60 * 60 * 1000; // 4 jam

/**
 * @returns {{ trivia: string|null, loading: boolean, error: string|null, refresh: () => void }}
 */
export function useTrivia() {
  const [trivia, setTrivia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrivia = useCallback(async (skipCache = false) => {
    // Cek cache dulu (kecuali skipCache)
    if (!skipCache) {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const cached = JSON.parse(raw);
          const age = Date.now() - cached.timestamp;
          if (age < CACHE_TTL_MS && cached.trivia) {
            setTrivia(cached.trivia);
            return;
          }
        }
      } catch {
        // cache corrupt, abaikan
      }
    }

    setLoading(true);
    setError(null);

    try {
      const text = await getTrivia();

      // Simpan ke cache
      const cacheData = { trivia: text, timestamp: Date.now() };
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      } catch {
        // localStorage penuh / tidak tersedia
      }

      setTrivia(text);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Gagal memuat trivia. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchTrivia();
  }, [fetchTrivia]);

  return { trivia, loading, error, refresh: () => fetchTrivia(true) };
}
