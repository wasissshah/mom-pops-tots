// Shared API helper used by every API file — GET wrapper.
// Calls go through the Next.js route at /mpt-api (src/app/mpt-api/[...path]/route.ts),
// which adds the token on the server.
export const API_BASE_URL = "/mpt-api";

export async function apiGet<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
    const qs = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => {
        if (value !== undefined && value !== "") qs.set(key, String(value));
    });
    const url = `${API_BASE_URL}${path}${qs.toString() ? `?${qs}` : ""}`;

    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`API failed: ${res.status} ${path}`);
    return res.json();
}