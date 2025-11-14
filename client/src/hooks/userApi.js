import { useState, useCallback } from 'react';

export default function useApi(apiFn) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const call = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn(...args);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data || { message: err.message });
      setLoading(false);
      throw err;
    }
  }, [apiFn]);

  return { call, loading, error };
}
