import type { EventDetail } from "@/api/eventDetail";

export default function AboutEvent({ event }: { event: EventDetail }) {
  const text = event.description || event.content || event.about || event.excerpt || "";
  const paragraphs = text.split(/\n+/).map((p) => p.trim()).filter(Boolean);
  return (
    <section className="event-detail__block">
      <div className="text-center"><h2 className="section-title section-title--center">About this event</h2></div>
      {paragraphs.map((p, i) => (
        <p className="event-detail__text" key={i}>{p}</p>
      ))}
    </section>
  );
}
