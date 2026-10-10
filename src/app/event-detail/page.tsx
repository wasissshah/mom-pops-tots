import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import EventDetailView from "@/components/event-detail/EventDetailView";
import TribeSection from "@/components/home/TribeSection";
import CtaBanners from "@/components/event/CtaBanners";
import Advertising from "@/components/home/Advertising";
import { activityTribeItems } from "@/data/home";

// /event-detail?id=12
export default async function EventDetailPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  const eventId = Number(id) || undefined;

  return (
    <>
      <SiteHeader />
      <main className="event-detail-page">
        <EventDetailView id={eventId} />

        <TribeSection
          eyebrow="Explore More"
          title="Family Activities"
          items={activityTribeItems}
          variant="s2"
          cta={{ label: "VIEW MORE OFFERS" }}
        />
        <CtaBanners />
        <Advertising />
      </main>
      <SiteFooter />
    </>
  );
}
