// Event detail — GET /api/v1/events/{id}
import { apiGet } from "./client";
import type { EventItem } from "./events";

export type EventSession = {
  id: number;
  start: string; // "15:00"
  end: string;
  slots: number | null;
  description: string | null; // e.g. "age 4+"
  places_left: number | null;
  is_full: boolean;
  bookable: boolean;
};

export type EventActivity = {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  schedule: { date: string; sessions: EventSession[] }[];
};

export type EventHosts = { names: string[]; emails: string[]; whatsapp: string[] };

export type RegistrationInfo = {
  open: boolean;
  endpoint: string;
  relationships: { value: string; label: string }[];
  cities: { id: number; name: string }[];
  limits: {
    child_age: { min: number; max: number };
    adult_age: { min: number; max: number };
    max_children: number;
    max_adults: number;
    max_sessions: number;
  };
};

// Same fields as a list item, plus what only the detail endpoint returns.
// Note: next_date can be null here, use dates[0] instead.
export type EventDetail = Omit<EventItem, "next_date"> & {
  next_date: string | null;
  description?: string | null;
  hosts?: EventHosts;
  activities?: EventActivity[];
  registration?: RegistrationInfo;
};

export async function getEventDetail(id: number): Promise<EventDetail> {
  const json = await apiGet<{ data: { event: EventDetail } }>(`/api/v1/events/${id}`);
  return json.data.event;
}
