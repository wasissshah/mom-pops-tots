import { getLang, isLocalizedPath } from "@/lib/locale";

// Shared API helpers used by every API file.
// Calls go through the Next.js route at /mpt-api (src/app/mpt-api/[...path]/route.ts),
// which adds the token on the server.
export const API_BASE_URL = "/mpt-api";

type Params = Record<string, string | number | undefined>;

// Thrown for every non-2xx response. For validation errors (422) `fields` holds one message per field.
export class ApiError extends Error {
  status: number;
  code?: string;
  fields: Record<string, string>;

  constructor(status: number, path: string, body?: { error?: { code?: string; message?: string; fields?: Record<string, string> } }) {
    super(body?.error?.message ?? `API failed: ${status} ${path}`);
    this.status = status;
    this.code = body?.error?.code;
    this.fields = body?.error?.fields ?? {};
  }
}

async function readError(res: Response, path: string) {
  const body = await res.json().catch(() => undefined);
  return new ApiError(res.status, path, body);
}

export async function apiGet<T>(path: string, params?: Params): Promise<T> {
  const qs = new URLSearchParams();
  // the language picked in the header is added to every localized request automatically
  const lang = getLang();
  if (lang && isLocalizedPath(path)) qs.set("lang", lang);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") qs.set(key, String(value));
  });
  const url = `${API_BASE_URL}${path}${qs.toString() ? `?${qs}` : ""}`;

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new ApiError(res.status, path);
  return res.json();
}

// POST as x-www-form-urlencoded (same as the Postman requests)
export async function apiPost<T>(path: string, data: Record<string, string>): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data).toString(),
  });
  if (!res.ok) throw await readError(res, path);
  return res.json();
}

// POST with a JSON body (nested data such as children / adults / sessions)
export async function apiPostJson<T>(path: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await readError(res, path);
  return res.json();
}
