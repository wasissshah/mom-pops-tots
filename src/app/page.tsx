import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/home/Hero";
import Advertising from "@/components/home/Advertising";
import TribeSection from "@/components/home/TribeSection";
import EventsSection from "@/components/home/EventsSection";
import Magazine from "@/components/home/Magazine";
import Offers from "@/components/home/Offers";
import Community from "@/components/home/Community";
import Directory from "@/components/home/Directory";
import Recommendations from "@/components/home/Recommendations";
import Podcasts from "@/components/home/Podcasts";
import Vote from "@/components/home/Vote";
import Knowledge from "@/components/home/Knowledge";
import Tools from "@/components/home/Tools";
import SocialFeed from "@/components/home/SocialFeed";
import Connect from "@/components/home/Connect";
import { tribeItems } from "@/data/home";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Advertising />
        <TribeSection
          items={tribeItems}
          doodles={[
            { src: "/assets/images/bird.svg", className: "tribe__doodle--bird" },
            { src: "/assets/images/camera.svg", className: "tribe__doodle--camera" },
            { src: "/assets/images/rocket.svg", className: "tribe__doodle--rocket" },
            { src: "/assets/images/bulb.svg", className: "tribe__doodle--bulb" },
          ]}
        />
        <EventsSection />
        <Magazine />
        <Offers />
        <Community />
        <Directory />
        <Recommendations />
        <Podcasts />
        <Vote />
        <Advertising withDoodle />
        <Knowledge />
        <Tools />
        <SocialFeed />
        <Connect />
      </main>
      <SiteFooter />
    </>
  );
}
