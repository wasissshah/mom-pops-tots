"use client";

import { useState } from "react";
import Link from "next/link";
import DoodleSection from "@/components/ui/DoodleSection";
import Skeleton from "@/components/ui/Skeleton";
import Select2 from "@/components/ui/Select2";
import { eventListItems as staticEventList, featuredEvent as staticFeatured } from "@/data/home";
import type { EventListItem, FeaturedEvent } from "@/data/home";
import { getHomeEvents, type HomeEvent } from "@/api/home";
import { useApi } from "@/hooks/useApi";
import EventsSkeleton from "@/components/skeletons/EventsSkeleton";
import { formatDay, formatTime, formatWeekdayMonth } from "@/lib/eventDate";

// events from the API carry their id so the buttons can open the right event
type WithId<T> = T & { id?: number };
const detailHref = (id?: number) => (id ? `/event-detail?id=${id}` : "/event-detail");

// API event -> shape used by the featured card
function toFeatured(event: HomeEvent): WithId<FeaturedEvent> {
  const { weekday, monthYear } = formatWeekdayMonth(event.next_date);
  const first = event.dates[0];
  return {
    id: event.id,
    img: event.cover_image ?? staticFeatured.img,
    day: formatDay(event.next_date),
    date: `${weekday}<br>${monthYear}`,
    title: event.title,
    text: event.excerpt,
    time: first ? `${formatTime(first.start)} - ${formatTime(first.end)}` : "",
    place: event.venue.name,
  };
}

// API event -> shape used by the list on the right
function toListItem(event: HomeEvent): WithId<EventListItem> {
  const { weekday, monthYear } = formatWeekdayMonth(event.next_date);
  return {
    id: event.id,
    img: event.cover_image ?? "/assets/images/img1.jpg",
    title: event.title,
    day: formatDay(event.next_date),
    date: `${weekday}\n${monthYear}`,
  };
}

export default function EventsSection() {
  const { data: section, loading } = useApi(getHomeEvents, "Events");
  const [typeId, setTypeId] = useState(""); // selected "Select Type" value ("" = all)
  const [tag, setTag] = useState(""); // selected "Filter" value ("" = all)

  const events = section?.items ?? [];
  const types = section?.filters.types ?? [];
  // The API's tag counts cover every event in the system; count only the events loaded here
  // so the number in the dropdown matches the cards, and hide tags with no loaded event.
  const tags = (section?.filters.tags ?? [])
    .map((t) => ({ ...t, count: events.filter((e) => e.tags.includes(t.name)).length }))
    .filter((t) => t.count > 0);

  // dropdown filters work on the events returned by the API
  const filtered = events.filter(
    (e) => (!typeId || e.types.some((t) => String(t.id) === typeId)) && (!tag || e.tags.includes(tag)),
  );

  // API events when loaded; on failure (error is logged by useApi) fall back to the static design
  const hasApi = events.length > 0;
  const hasEvents = filtered.length > 0;
  const featuredEvent: WithId<FeaturedEvent> = hasEvents ? toFeatured(filtered[0]) : staticFeatured; // first event = big card
  const eventListItems: WithId<EventListItem>[] = hasEvents ? filtered.slice(1).map(toListItem) : staticEventList; // the rest = list

  return (
    <DoodleSection className="events">
      <img className="doodle events__doodle events__doodle--clock" src="/assets/images/clock.svg" alt="" />
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Upcoming</span>
          <h2 className="section-title section-title--center">Events &amp; Exhibitions</h2>
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
                {types.length ? (
                  <>
                    <option value="all">All types</option>
                    {types.map((t) => (
                      <option value={t.id} key={t.id}>{t.name}</option>
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
                {tags.length ? (
                  <>
                    <option value="all">All</option>
                    {tags.map((t) => (
                      <option value={t.name} key={t.id}>{t.name} ({t.count})</option>
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
          <EventsSkeleton />
        ) : hasApi && !hasEvents ? (
          <p className="text-center py-5">No events match this filter.</p>
        ) : (
        <div className="row g-4">
          <div className="col-lg-6">
            <article className="event-feature">
              <div className="event-feature__card">
                <div className="event-feature__photo">
                  <img src={featuredEvent.img} alt="" />
                  <span className="tag">Event</span>
                </div>
                <div className="event-feature__bar">
                  <div className="event-date">
                    <strong>{featuredEvent.day}</strong>
                    <span dangerouslySetInnerHTML={{ __html: featuredEvent.date }} />
                  </div>
                  <Link className="btn btn-primary" href={`${detailHref(featuredEvent.id)}#register`}>RSVP Now</Link>
                </div>
              </div>
              <h3 className="event-feature__title">{featuredEvent.title}</h3>
              <p className="event-feature__text">{featuredEvent.text}</p>
              <hr className="divider-gradient" />
              <ul className="event-feature__meta">
                <li><img src="/assets/images/clock-icon.svg" alt="" width={16} height={16} /> {featuredEvent.time}</li>
                <li><img src="/assets/images/pin-icon.svg" alt="" width={16} height={16} /> {featuredEvent.place}</li>
              </ul>
            </article>
          </div>
          <div className="col-lg-6">
            <div className="events__list">
              {eventListItems.map((item, i) => (
                <Link className="event-item" href={detailHref(item.id)} key={i}>
                  <div className="event-item__thumb"><img src={item.img} alt="" /><span className="tag">Event</span></div>
                  <div className="event-item__body">
                    <h4 className="event-item__title">{item.title}</h4>
                    <hr className="divider-gradient" />
                    <div className="event-item__foot">
                      <div className="event-date">
                        <strong>{item.day}</strong>
                        <span>
                          {item.date.split("\n").map((line, li, arr) => (
                            <div key={li}>
                              {line}
                              {li < arr.length - 1 && <br />}
                            </div>
                          ))}
                        </span>
                      </div>
                      <span className="link-arrow">Explore <img src="/assets/images/arrow-line-dark.svg" alt="" /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        )}

        <div className="text-center mt-3 mt-md-4">
          <Link className="btn btn-primary btn-primary--green" href="/event">View all events</Link>
        </div>
      </div>
    </DoodleSection>
  );
}
