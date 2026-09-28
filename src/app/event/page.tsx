import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageBanner from "@/components/event/PageBanner";
import FeaturedEvents from "@/components/event/FeaturedEvents";
import EventCalendar from "@/components/event/EventCalendar";
import TribeSection from "@/components/home/TribeSection";
import WhyEvents from "@/components/event/WhyEvents";
import CtaBanners from "@/components/event/CtaBanners";
import Advertising from "@/components/home/Advertising";
import { activityTribeItems, cityEventItems } from "@/data/home";

export default function EventPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageBanner showBar />
        <FeaturedEvents />
        <EventCalendar />
        <TribeSection
          eyebrow="This Week"
          title="What's Happening In Your City"
          items={cityEventItems}
          variant="s2"
          filterPlaceholder="Explore Your City"
          showMeta
        />
        <WhyEvents />
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
