"use client";

import { useCallback } from "react";
import Link from "next/link";
import EventBanner from "@/components/event/EventBanner";
import PageBanner from "@/components/event/PageBanner";
import DetailSkeleton from "@/components/skeletons/DetailSkeleton";
import AboutEvent from "./AboutEvent";
import Activities from "./Activities";
import LocationBlock from "./LocationBlock";
import HostedBy from "./HostedBy";
import Sidebar from "./Sidebar";
import RegisterForm from "./RegisterForm";
import { getEventDetail } from "@/api/eventDetail";
import { useApi } from "@/hooks/useApi";

// Loads GET /api/v1/events/{id} and fills the page. Activities and Hosted By are still static.
export default function EventDetailView({ id }: { id?: number }) {
  const fetchDetail = useCallback(() => {
    if (!id) return Promise.reject(new Error("Missing event id in the URL (?id=)"));
    return getEventDetail(id);
  }, [id]);
  const { data: event, loading, error } = useApi(fetchDetail, `Event ${id ?? "?"}`);

  if (loading) return <DetailSkeleton />;

  if (error || !event) {
    return (
      <>
        <PageBanner sm />
        <section className="event-detail">
          <div className="container text-center">
            <h2 className="section-title section-title--center">Event not found</h2>
            <p className="event-detail__text">We couldn&apos;t load this event. It may have ended or the link is wrong.</p>
            <Link className="btn btn-primary" href="/event">Back to events</Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <EventBanner event={event} sm />

      <section className="event-detail">
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item"><Link href="/event">Events</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{event.title}</li>
            </ol>
          </nav>
          <div className="row g-4">
            <div className="col-lg-8">
              <AboutEvent event={event} />
              <Activities event={event} />
              <LocationBlock event={event} />
              <HostedBy />
            </div>
            <div className="col-lg-4">
              <Sidebar event={event} />
            </div>
          </div>
        </div>
      </section>

      <RegisterForm title={event.title} />
    </>
  );
}
