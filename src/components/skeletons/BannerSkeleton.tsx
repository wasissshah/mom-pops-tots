import Skeleton from "@/components/ui/Skeleton";

// Same wrapper classes as the real banner, so the page height doesn't jump
export default function BannerSkeleton() {
  return (
    <section className="page-banner" aria-busy="true" aria-label="Loading featured event">
      <div className="page-banner__wrapper">
        <div className="d-flex flex-column align-items-center" style={{ paddingTop: "3rem" }}>
          <Skeleton width="45%" height="4rem" className="mb-3" />
          <Skeleton width="25%" height="4rem" />
        </div>
      </div>
    </section>
  );
}
