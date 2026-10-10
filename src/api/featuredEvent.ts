// Featured event banner on /event.
// Kept in its own file on purpose: for now it shows the latest event from the events API;
// when the backend gets a dedicated "featured" endpoint, change only this file.
import { getEvents, type EventItem } from "./events";

export type FeaturedEvent = EventItem;

export async function getFeaturedEvent(): Promise<FeaturedEvent | null> {
  const { items } = await getEvents({ page: 1, per_page: 1 });
  return items[0] ?? null;
}
