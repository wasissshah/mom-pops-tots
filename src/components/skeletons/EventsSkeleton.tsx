import Skeleton from "@/components/ui/Skeleton";

// Placeholder for the "row g-4" block of the Events section (big card + list)
export default function EventsSkeleton() {
  return (
    <div className="row g-4" aria-busy="true" aria-label="Loading events">
      <div className="col-lg-6">
        <Skeleton height="21rem" radius="1.5rem" />
        <Skeleton width="70%" height="2rem" className="mt-4" />
        <Skeleton height="1rem" className="mt-3" />
        <Skeleton width="85%" height="1rem" className="mt-2" />
        <Skeleton width="45%" height="1rem" className="mt-4" />
      </div>
      <div className="col-lg-6">
        {[0, 1, 2, 3].map((i) => (
          <div className="d-flex gap-3 mb-4" key={i}>
            <Skeleton width="9rem" height="6.5rem" radius="1rem" />
            <div className="flex-grow-1">
              <Skeleton width="90%" height="1.3rem" />
              <Skeleton width="60%" height="1.3rem" className="mt-2" />
              <Skeleton width="30%" height="2rem" className="mt-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
