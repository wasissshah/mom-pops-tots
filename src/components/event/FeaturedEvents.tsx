"use client";

import { useState } from "react";
import Link from "next/link";
import Select2 from "@/components/ui/Select2";
import Skeleton from "@/components/ui/Skeleton";
import CardsSkeleton from "@/components/skeletons/CardsSkeleton";
import { cardV2Items, type CardV2 } from "@/data/home";
import { getEvents, type EventItem } from "@/api/events";
import { useApi } from "@/hooks/useApi";
import { formatDayRange, formatMonthShort } from "@/lib/eventDate";

const PER_PAGE = 12;
const fetchFirstPage = () => getEvents({ page: 1, per_page: PER_PAGE }); // stable fn for useApi

type Card = CardV2 & { id?: number; month: string };

const detailHref = (id?: number) => (id ? `/event-detail?id=${id}` : "/event-detail");

// API event -> shape used by the card
function toCard(e: EventItem): Card {
  return {
    id: e.id,
    img: e.cover_image ?? "/assets/images/img1.jpg",
    status: e.pricing.is_paid ? "Paid" : "Free",
    date: formatDayRange(e.dates, e.next_date),
    month: formatMonthShort(e.next_date),
    cat: e.types.map((t) => t.name).join(", "),
    title: e.title,
    text: e.excerpt,
    place: [e.venue.name, e.cities[0]?.name].filter(Boolean).join(", "),
  };
}

const staticCards: Card[] = cardV2Items.map((c) => ({ ...c, month: "Aug" }));

export default function FeaturedEvents() {
  const { data, loading } = useApi(fetchFirstPage, "Events page");
  const [typeId, setTypeId] = useState(""); // "" = all types
  const [tag, setTag] = useState(""); // "" = all tags
  const [more, setMore] = useState<{ items: EventItem[]; page: number; hasMore: boolean } | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const events = [...(data?.items ?? []), ...(more?.items ?? [])];
  const hasMore = more ? more.hasMore : (data?.pagination.has_more ?? false);
  const nextPage = (more?.page ?? 1) + 1;

  // dropdown options come from the loaded events (with how many events use each)
  const typeOptions = new Map<number, { name: string; count: number }>();
  const tagOptions = new Map<string, number>();
  events.forEach((e) => {
    e.types.forEach((t) => typeOptions.set(t.id, { name: t.name, count: (typeOptions.get(t.id)?.count ?? 0) + 1 }));
    e.tags.forEach((t) => tagOptions.set(t, (tagOptions.get(t) ?? 0) + 1));
  });
  const types = [...typeOptions].sort((a, b) => a[1].name.localeCompare(b[1].name));
  const tags = [...tagOptions].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const filtered = events.filter(
    (e) => (!typeId || e.types.some((t) => String(t.id) === typeId)) && (!tag || e.tags.includes(tag)),
  );

  // API events when loaded; on failure (error is logged by useApi) fall back to the static design
  const hasApi = events.length > 0;
  const cards: Card[] = hasApi ? filtered.map(toCard) : staticCards;

  async function loadMore() {
    setLoadingMore(true);
    try {
      const page = await getEvents({ page: nextPage, per_page: PER_PAGE });
      setMore({ items: [...(more?.items ?? []), ...page.items], page: nextPage, hasMore: page.pagination.has_more });
    } catch (err) {
      console.log("[API] Events load more failed:", err);
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <section className="events">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Upcoming Events</span>
          <h2 className="section-title section-title--center">Featured Events</h2>
        </div>
        <div className="events__filters">
          {loading ? (
            <>
              <Skeleton width="14rem" height="3rem" radius="1rem" />
              <Skeleton width="14rem" height="3rem" radius="1rem" />
            </>
          ) : (
            <>
              <Select2
                key={`types-${types.length}`}
                className="select-outline"
                data-placeholder="Select Type"
                aria-label="Select type"
                defaultValue=""
                onValueChange={(v) => setTypeId(v === "all" ? "" : v)}
              >
                <option />
                {hasApi ? (
                  <>
                    <option value="all">All types</option>
                    {types.map(([id, t]) => (
                      <option value={id} key={id}>{t.name} ({t.count})</option>
                    ))}
                  </>
                ) : (
                  <>
                    <option>Events</option>
                    <option>Exhibitions</option>
                  </>
                )}
              </Select2>
              <Select2
                key={`tags-${tags.length}`}
                className="select-outline select-outline--filter"
                data-placeholder="Filter"
                aria-label="Filter"
                defaultValue=""
                onValueChange={(v) => setTag(v === "all" ? "" : v)}
              >
                <option />
                {hasApi ? (
                  <>
                    <option value="all">All</option>
                    {tags.map(([name, count]) => (
                      <option value={name} key={name}>{name} ({count})</option>
                    ))}
                  </>
                ) : (
                  <>
                    <option>This week</option>
                    <option>This month</option>
                  </>
                )}
              </Select2>
            </>
          )}
        </div>

        {loading ? (
          <CardsSkeleton />
        ) : hasApi && cards.length === 0 ? (
          <p className="text-center py-5">No events match this filter.</p>
        ) : (
          <div className="thumbnails thumbnails--grid">
            {cards.map((item, i) => (
              <Link className="card-v2" href={detailHref(item.id)} key={item.id ?? i}>
                <div className="card-v2__media">
                  <img src={item.img} alt="" />
                  <span className="tag tag--green card-v2__status">{item.status}</span>
                  <span className="card-v2__date"><strong>{item.date}</strong><small>{item.month}</small></span>
                </div>
                <span className="card-v2__cat">{item.cat}</span>
                <h3 className="card-v2__title">{item.title}</h3>
                <p className="card-v2__text">{item.text}</p>
                <p className="card-v2__place"><svg><use href="#i-pin" /></svg> {item.place}</p>
              </Link>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="text-center mt-3 mt-md-4">
            <button className="btn btn-primary btn-primary--green" type="button" onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? "Loading..." : "View all events"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
