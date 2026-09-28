import { aboutParagraphs } from "@/data/eventDetail";

export default function AboutEvent() {
  return (
    <section className="event-detail__block">
      <div className="text-center"><h2 className="section-title section-title--center">About this event</h2></div>
      {aboutParagraphs.map((text, i) => (
        <p className="event-detail__text" key={i}>{text}</p>
      ))}
    </section>
  );
}
