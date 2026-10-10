// Event detail — GET /api/v1/events/{id}
import { apiGet } from "./client";
import type { EventItem } from "./events";

// Same fields as a list item, plus the optional long text the detail endpoint may add
export type EventDetail = EventItem & {
  description?: string | null;
  content?: string | null;
  about?: string | null;
};

export async function getEventDetail(id: number): Promise<EventDetail> {
  const json = await apiGet<{ data: Record<string, unknown> }>(`/api/v1/events/${id}`);
  const d = json.data;
  // accept { data: {...} } as well as { data: { item|event: {...} } }
  return (d.item ?? d.event ?? d) as EventDetail;
}
