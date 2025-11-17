// frontend/src/hooks/useLocalStorage.ts
"use client";

import { useEffect, useState } from "react";

/**
 * Generic useLocalStorage hook
 * Returns tuple [value, setValue] typed as const (so destructuring keeps tuple types)
 */
export default function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem(key) : null;
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore write errors
    }
  }, [key, state]);

  return [state, setState] as const;
}
