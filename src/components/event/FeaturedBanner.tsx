"use client";

import PageBanner from "@/components/event/PageBanner";
import EventBanner from "@/components/event/EventBanner";
import BannerSkeleton from "@/components/skeletons/BannerSkeleton";
import { getFeaturedEvent } from "@/api/featuredEvent";
import { useApi } from "@/hooks/useApi";

export default function FeaturedBanner() {
  const { data: event, loading, error } = useApi(getFeaturedEvent, "Featured event banner");

  if (loading) return <BannerSkeleton />;
  if (error || !event) return <PageBanner showBar />; // static banner as fallback
  return <EventBanner event={event} />;
}
