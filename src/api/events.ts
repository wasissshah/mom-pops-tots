// Events API — GET /api/v1/events?page=1&per_page=12&city=&lang=
import { apiGet } from "./client";

export type EventItem = {
  id: number;
  title: string;
  excerpt: string;
  pricing: { is_paid: boolean; price: number | null; currency: string | null; label: string };
  venue: { name: string; address: string; latitude: number | null; longitude: number | null };
  next_date: string; // "2026-12-04"
  dates: { date: string; start: string; end: string }[];
  date_count: number;
  cities: { id: number; name: string }[];
  languages: { id: number; name: string; code: string }[];
  types: { id: number; name: string }[];
  tags: string[];
  cover_image: string | null;
  qr: { svg: string; png: string; target: string; colour: string } | null;
  images: { url: string; width: number; height: number }[];
};

export type Pagination = {
  page: number;
  per_page: number;
  count: number;
  total: number;
  total_pages: number;
  has_more: boolean;
  next_page: number | null;
};

export type EventsPage = { items: EventItem[]; pagination: Pagination };

type EventsParams = { page?: number; per_page?: number; city?: number; lang?: string };

export async function getEvents(params?: EventsParams): Promise<EventsPage> {
  const json = await apiGet<{ data: { items: EventItem[] }; meta: { pagination: Pagination } }>(
    "/api/v1/events",
    params,
  );
  return { items: json.data.items, pagination: json.meta.pagination };
}
