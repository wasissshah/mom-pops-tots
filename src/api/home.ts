// Home page API — GET /api/v1/home
// One request returns every home section (banners, events, ...). Components pick
// their own section; requests made at the same time share one network call.
import { apiGet } from "./client";
import type { EventItem } from "./events";

type HomeParams = { city?: number; lang?: string };

// ---------- types ----------
export type BannerMedia = {
  kind: "image" | "video";
  url: string;
  type: string;
  width: number;
  height: number;
};

export type HomeBanner = {
  id: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  doodles: (string | null)[];
  media: BannerMedia | null;
};

export type HomeEvent = EventItem;

export type HomeAd = {
  id: number;
  title: string;
  subtitle: string | null;
  url: string;
  order: number;
  logo: string | { url: string } | null; // may be a plain url or an object with url
  media: { kind: string; url: string } | null; // banner background
};

export type EventType = { id: number; name: string; description: string };
export type EventTag = { id: number; name: string; count: number };

// The whole "events" section: items + filter lists for the two dropdowns + API path of the full list
export type HomeEventsSection = {
  items: HomeEvent[];
  filters: { types: EventType[]; tags: EventTag[] };
  more: string; // "/api/v1/events"
};

type HomeSection = { key: string; items: unknown[]; [extra: string]: unknown };
type HomeResponse = { data: { sections: HomeSection[]; ads?: HomeAd[] } };

// ---------- shared request ----------
const inFlight = new Map<string, Promise<HomeResponse>>();

function getHome(params?: HomeParams): Promise<HomeResponse> {
  const key = JSON.stringify(params ?? {});
  let request = inFlight.get(key);
  if (!request) {
    request = apiGet<HomeResponse>("/api/v1/home", params);
    inFlight.set(key, request);
    // forget it shortly after it settles so later visits fetch fresh data
    const forget = () => setTimeout(() => inFlight.delete(key), 2000);
    request.then(forget, forget);
  }
  return request;
}

async function getSection<T>(sectionKey: string, params?: HomeParams): Promise<T[]> {
  const json = await getHome(params);
  const section = json.data.sections.find((s) => s.key === sectionKey);
  return (section?.items ?? []) as T[];
}

async function getFullSection<T>(sectionKey: string, params?: HomeParams): Promise<T | null> {
  const json = await getHome(params);
  return (json.data.sections.find((s) => s.key === sectionKey) as T | undefined) ?? null;
}

// ---------- public functions ----------
export const getHomeBanners = (params?: HomeParams) => getSection<HomeBanner>("banners", params);
export const getHomeEvents = (params?: HomeParams) => getFullSection<HomeEventsSection>("events", params);

// Advertising banners (top-level "ads" of the home response), lowest `order` first
export async function getHomeAds(params?: HomeParams): Promise<HomeAd[]> {
  const json = await getHome(params);
  return [...(json.data.ads ?? [])].sort((a, b) => a.order - b.order);
}
