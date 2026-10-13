import Link from "next/link";
import type { EventItem } from "@/api/events";
import { formatDayRange, formatMonthShort } from "@/lib/eventDate";

const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// "Kids Fun Day Program" -> pink "Kids Fun Day" + yellow "Program" (last word)
function renderTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return <span>{title}</span>;
  return (
    <>
      <span>{words.slice(0, -1).join(" ")}</span> {words[words.length - 1]}
    </>
  );
}

// Banner filled from one event. sm = smaller banner without the bottom bar (detail page)
type BannerEvent = Omit<EventItem, "next_date"> & { next_date: string | null };

export default function EventBanner({ event, sm }: { event: BannerEvent; sm?: boolean }) {
  // next_date can be null (e.g. an event that has already ended), so fall back to the first session date
  const first = event.dates[0]?.date ?? event.next_date ?? "";
  const range = first ? formatDayRange(event.dates, first) : "";
  const month = first ? MONTHS_LONG[Number(first.slice(5, 7)) - 1] : "";
  const place = [event.venue.name, event.cities[0]?.name].filter(Boolean).join(", ");
  const left = (event.tags.length ? event.tags : event.types.map((t) => t.name)).join(", ");

  return (
    <section className={`page-banner${sm ? " sm" : ""}`}>
      {left && (
        <div className="left">
          <h3 className="title">{left}</h3>
        </div>
      )}
      <div className="right">
        <h3 className="title month">{month}</h3>
        <h3 className="title date">{range.replace(/ /g, "")}</h3>
        <p className="location text-uppercase">{place}</p>
      </div>

      <div
        className="page-banner__wrapper"
        style={{ backgroundImage: `url('${event.cover_image ?? "/assets/images/event-banner.jpg"}')` }}
      >
        <h1 className="page-banner__title">{renderTitle(event.title)}</h1>
        {!sm && (
          <div className="page-banner__bar">
            <div className="container">
              <div className="d-md-flex align-items-center">
                <span className="page-banner__date">
                  <strong>{range}</strong>
                  <small>{first ? formatMonthShort(first) : ""}</small>
                </span>
                <div className="page-banner__info">
                  <h2>{event.title}</h2>
                  <p><svg><use href="#i-pin" /></svg> {[event.venue.name, event.venue.address].filter(Boolean).join(", ")}</p>
                </div>
                <Link className="btn btn-primary" href={`/event-detail?id=${event.id}`}>Buy tickets</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
