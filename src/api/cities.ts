// Cities API — GET /api/v1/cities (used site-wide)
import { apiGet } from "./client";

export type City = {
    id: number;
    name: string;
    address: string;
};

export async function getCities(): Promise<City[]> {
    const json = await apiGet<{ data: { cities: City[] } }>("/api/v1/cities");
    return json.data.cities;
}