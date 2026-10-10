// Languages API — GET /api/v1/languages (used site-wide)
import { apiGet } from "./client";

export type Language = {
    id: number;
    code: string;
    name: string;
};

export async function getLanguages(): Promise<Language[]> {
    const json = await apiGet<{ data: { languages: Language[] } }>("/api/v1/languages");
    return json.data.languages;
}