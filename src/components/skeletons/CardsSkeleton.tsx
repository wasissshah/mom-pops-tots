import Skeleton from "@/components/ui/Skeleton";

// Placeholder for the "thumbnails" grid of event cards (4 per row)
export default function CardsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="thumbnails thumbnails--grid" aria-busy="true" aria-label="Loading events">
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <Skeleton height="13rem" radius="1.25rem" />
          <Skeleton width="35%" height="0.8rem" className="mt-3" />
          <Skeleton width="85%" height="1.3rem" className="mt-2" />
          <Skeleton height="0.9rem" className="mt-3" />
          <Skeleton width="70%" height="0.9rem" className="mt-2" />
          <Skeleton width="55%" height="0.9rem" className="mt-3" />
        </div>
      ))}
    </div>
  );
}
