"use client";

import { useEffect, useState } from "react";

type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: unknown;
};

/**
 * Reusable loader for every API.
 *   const { data, loading, error } = useApi(getCities, "Cities");
 *
 * 1. loading = true  -> show your skeleton
 * 2. success         -> data is filled, loading = false
 * 3. failure         -> error is console.log'ed, loading = false, data stays null
 *
 * `fetcher` must be a stable function (an imported API function), `label` is only for the log.
 */
export function useApi<T>(fetcher: () => Promise<T>, label: string): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let active = true;
    fetcher()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        console.log(`[API] ${label} failed:`, error);
        if (active) setState({ data: null, loading: false, error });
      });
    return () => {
      active = false;
    };
  }, [fetcher, label]);

  return state;
}
