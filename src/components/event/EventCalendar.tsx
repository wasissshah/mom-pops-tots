"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import type { DayCellContentArg } from "@fullcalendar/core";
import CalendarSkeleton from "@/components/skeletons/CalendarSkeleton";
import { calendarEvents } from "@/data/home";
import { getEvents, type EventItem } from "@/api/events";
import { useApi } from "@/hooks/useApi";
import { formatLongDate, formatTime } from "@/lib/eventDate";

type Color = "yellow" | "green" | "pink" | "blue";
type CalItem = { id?: number; img: string; time: string; title: string; place: string; color: Color };
type Group = { key: string; items: CalItem[] }; // one calendar day + its events
type LegendItem = { label: string; color: Color };

const TYPE_COLORS: Color[] = ["yellow", "green", "pink", "blue"]; // one color per event type
const fetchCalendarEvents = () => getEvents({ page: 1, per_page: 50 }); // stable fn for useApi

const detailHref = (id?: number) => (id ? `/event-detail?id=${id}` : "/event-detail");
const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

// shown only when the API request fails (the error is logged by useApi)
const staticGroups: Group[] = [
  { key: "2026-01-18", items: calendarEvents.map((e) => ({ ...e, color: "green" as Color })) },
];
const staticLegend: LegendItem[] = [
  { label: "Baby & Toddler", color: "yellow" },
  { label: "Kids Parenting", color: "green" },
  { label: "Family Outdoor", color: "pink" },
];

// API events -> one group per day (an event with 3 dates appears on 3 days), sorted by date
function buildGroups(events: EventItem[], typeIds: number[]): Group[] {
  const days = new Map<string, (CalItem & { start: string })[]>();
  events.forEach((e) => {
    const typeIndex = typeIds.indexOf(e.types[0]?.id);
    const color = TYPE_COLORS[(typeIndex < 0 ? 0 : typeIndex) % TYPE_COLORS.length];
    e.dates.forEach((d) => {
      const list = days.get(d.date) ?? [];
      list.push({
        id: e.id,
        img: e.cover_image ?? "/assets/images/img1.jpg",
        time: formatTime(d.start),
        title: e.title,
        place: [e.venue.name, e.cities[0]?.name].filter(Boolean).join(", "),
        color,
        start: d.start,
      });
      days.set(d.date, list);
    });
  });
  return [...days]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, items]) => ({ key, items: items.sort((a, b) => a.start.localeCompare(b.start)) }));
}

function CalendarView({ groups, legend }: { groups: Group[]; legend: LegendItem[] }) {
  const [selectedKey, setSelectedKey] = useState(groups[0]?.key ?? dateKey(new Date()));
  const calendarRef = useRef<FullCalendar>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef(new Map<string, HTMLDivElement>());
  const ignoreScrollUntil = useRef(0);

  // colors of the dots shown on each calendar day (max 3 different colors)
  const dotsByDay = new Map<string, Color[]>();
  groups.forEach((g) => dotsByDay.set(g.key, [...new Set(g.items.map((i) => i.color))].slice(0, 3)));

  // click a day with events -> list jumps to that date
  function jumpTo(key: string) {
    const list = listRef.current;
    const el = groupRefs.current.get(key);
    if (!list || !el) return;
    ignoreScrollUntil.current = Date.now() + 150; // don't let the scroll handler fight this jump
    list.scrollTo({ top: el.offsetTop });
    setSelectedKey(key);
  }

  // scrolling the list -> the date at the top becomes the selected day (calendar follows)
  function onScroll() {
    const list = listRef.current;
    if (!list || Date.now() < ignoreScrollUntil.current) return;
    let current = groups[0]?.key;
    for (const g of groups) {
      const el = groupRefs.current.get(g.key);
      if (el && el.offsetTop <= list.scrollTop + 8) current = g.key;
    }
    if (!current || current === selectedKey) return;
    setSelectedKey(current);
    const api = calendarRef.current?.getApi();
    if (api && dateKey(api.getDate()).slice(0, 7) !== current.slice(0, 7)) api.gotoDate(current);
  }

  return (
    <>
      <div className="col-lg-6 p-0">
        <div className="calendar__wrapper">
          <div className="calendar__fc">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              initialDate={selectedKey}
              firstDay={1}
              height="auto"
              showNonCurrentDates={false}
              fixedWeekCount={false}
              headerToolbar={{ left: "title", right: "prev,next" }}
              dayHeaderFormat={{ weekday: "long" }}
              dayCellClassNames={(arg) => (dateKey(arg.date) === selectedKey ? ["is-selected"] : [])}
              dayCellContent={(arg: DayCellContentArg) => {
                const dots = dotsByDay.get(dateKey(arg.date));
                return (
                  <>
                    {arg.dayNumberText}
                    {dots && (
                      <span className="calendar__dots">
                        {dots.map((color) => (
                          <i className={`calendar__dot calendar__dot--${color}`} key={color} />
                        ))}
                      </span>
                    )}
                  </>
                );
              }}
              dateClick={(info: DateClickArg) => {
                const key = dateKey(info.date);
                if (dotsByDay.has(key)) jumpTo(key);
              }}
            />
          </div>
          <ul className="calendar__legend">
            {legend.map((item) => (
              <li key={item.label}>
                <i className={`calendar__dot calendar__dot--${item.color}`} /> {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-lg-6 p-0">
        <div className="calendar__panel">
          <div className="calendar__list" ref={listRef} onScroll={onScroll}>
            {groups.length === 0 && <h3>No upcoming events</h3>}
            {groups.map((group) => (
              <div
                key={group.key}
                ref={(el) => {
                  if (el) groupRefs.current.set(group.key, el);
                  else groupRefs.current.delete(group.key);
                }}
              >
                <h3>{formatLongDate(group.key)}</h3>
                {group.items.map((event, i) => (
                  <Link className="calendar-event" href={detailHref(event.id)} key={`${event.id}-${i}`}>
                    <div className="calendar-event__thumb"><img src={event.img} alt="" /><span className="tag">Event</span></div>
                    <div className="calendar-event__body">
                      <span className="calendar-event__time">{event.time}</span>
                      <h4>{event.title}</h4>
                      <p><svg><use href="#i-pin" /></svg> {event.place}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function EventCalendar() {
  const { data, loading, error } = useApi(fetchCalendarEvents, "Calendar events");

  let groups = staticGroups;
  let legend = staticLegend;
  if (!error && data) {
    // one color per event type (sorted by type id), the legend lists the types in use
    const types = new Map<number, string>();
    data.items.forEach((e) => e.types.forEach((t) => types.set(t.id, t.name)));
    const typeIds = [...types.keys()].sort((a, b) => a - b);
    groups = buildGroups(data.items, typeIds);
    legend = typeIds.map((id, i) => ({ label: types.get(id) ?? "", color: TYPE_COLORS[i % TYPE_COLORS.length] }));
  }

  return (
    <section className="event-calendar">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Upcoming Events</span>
          <h2 className="section-title section-title--center">Community Calendar</h2>
        </div>
      </div>
      <div className="calendar" data-calendar>
        <div className="container">
          <div className="row">
            {loading ? <CalendarSkeleton /> : <CalendarView groups={groups} legend={legend} />}
          </div>
        </div>
      </div>
    </section>
  );
}
