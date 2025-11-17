// frontend/src/hooks/useDebounce.ts
"use client";

import { useEffect, useState } from "react";

/**
 * useDebounce
 * Returns a debounced value that updates `delay` ms after the source value stops changing.
 */
export default function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
