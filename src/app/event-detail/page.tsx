import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageBanner from "@/components/event/PageBanner";
import AboutEvent from "@/components/event-detail/AboutEvent";
import Activities from "@/components/event-detail/Activities";
import LocationBlock from "@/components/event-detail/LocationBlock";
import HostedBy from "@/components/event-detail/HostedBy";
import Sidebar from "@/components/event-detail/Sidebar";
import RegisterForm from "@/components/event-detail/RegisterForm";
import TribeSection from "@/components/home/TribeSection";
import CtaBanners from "@/components/event/CtaBanners";
import Advertising from "@/components/home/Advertising";
import { activityTribeItems } from "@/data/home";

export default function EventDetailPage() {
  return (
    <>
      <SiteHeader />
      <main className="event-detail-page">
        <PageBanner sm />

        <section className="event-detail">
          <div className="container">
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item"><Link href="/event">Events</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Kids fun day program</li>
              </ol>
            </nav>
            <div className="row g-4">
              <div className="col-lg-8">
                <AboutEvent />
                <Activities />
                <LocationBlock />
                <HostedBy />
              </div>
              <div className="col-lg-4">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>

        <RegisterForm />

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
