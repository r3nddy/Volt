import { useCallback, useEffect, useRef, useState } from "react";
import { getCryptoSnapshot } from "../api/cryptoApi";
import { mapCryptoSnapshot } from "../services/cryptoService";

export function useCrypto() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);

  const fetchCrypto = useCallback(async () => {
    const id = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const snapshot = await getCryptoSnapshot();
      if (id === requestIdRef.current) setData(mapCryptoSnapshot(snapshot));
    } catch {
      if (id === requestIdRef.current) {
        setData(null);
        setError("Gagal memuat data crypto. Coba lagi.");
      }
    } finally {
      if (id === requestIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCrypto();
  }, [fetchCrypto]);

  return { data, loading, error, retry: fetchCrypto };
}
