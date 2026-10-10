import Skeleton from "@/components/ui/Skeleton";
import BannerSkeleton from "./BannerSkeleton";

export default function DetailSkeleton() {
  return (
    <>
      <BannerSkeleton />
      <section className="event-detail" aria-busy="true" aria-label="Loading event">
        <div className="container">
          <Skeleton width="14rem" height="1rem" className="mb-4" />
          <div className="row g-4">
            <div className="col-lg-8">
              <Skeleton width="40%" height="2rem" className="mb-4" />
              {[0, 1, 2, 3, 4].map((i) => (
                <Skeleton key={i} height="1rem" className="mb-2" width={i === 4 ? "60%" : "100%"} />
              ))}
              <Skeleton height="14rem" radius="14px" className="mt-5" />
            </div>
            <div className="col-lg-4">
              <Skeleton height="22rem" radius="14px" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
