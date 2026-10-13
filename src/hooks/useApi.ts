"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/locale";

type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: unknown;
};

type Settled<T> = { data: T | null; error: unknown; key: string };

/**
 * Reusable loader for every API.
 *   const { data, loading, error } = useApi(getCities, "Cities", { localized: false });
 *
 * 1. loading = true  -> show your skeleton
 * 2. success         -> data is filled, loading = false
 * 3. failure         -> error is console.log'ed, loading = false, data stays null
 *
 * `fetcher` must be a stable function (an imported API function), `label` is only for the log.
 * By default the request runs again (skeleton first) when the visitor changes the language in the
 * header. Pass { localized: false } for lists that do not depend on the language.
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  label: string,
  options?: { localized?: boolean },
): ApiState<T> {
  const lang = useLang();
  const key = options?.localized === false ? "-" : (lang ?? "-");
  const [settled, setSettled] = useState<Settled<T> | null>(null);

  useEffect(() => {
    let active = true;
    fetcher()
      .then((data) => {
        if (active) setSettled({ data, error: null, key });
      })
      .catch((error) => {
        console.log(`[API] ${label} failed:`, error);
        if (active) setSettled({ data: null, error, key });
      });
    return () => {
      active = false;
    };
  }, [fetcher, label, key]);

  // results of an older language are treated as "still loading"
  const ready = settled !== null && settled.key === key;
  return { data: ready ? settled.data : null, loading: !ready, error: ready ? settled.error : null };
}
