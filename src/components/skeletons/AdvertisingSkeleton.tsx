import Skeleton from "@/components/ui/Skeleton";

// Placeholder for the advertising banner(s) while the ads load
export default function AdvertisingSkeleton() {
  return (
    <div className="container" aria-busy="true" aria-label="Loading advertisement">
      <Skeleton height="14rem" radius="32px" />
    </div>
  );
}
