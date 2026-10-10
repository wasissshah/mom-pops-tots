import Skeleton from "@/components/ui/Skeleton";

// Same wrapper classes as the real hero, so the page height doesn't jump when data arrives
export default function HeroSkeleton() {
  return (
    <section className="hero" aria-busy="true" aria-label="Loading highlights">
      <div className="hero__slider">
        <div className="hero__slide">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-xxl-6">
                <Skeleton width="10rem" height="1.25rem" className="mb-4" />
                <Skeleton width="85%" height="3.5rem" className="mb-3" />
                <Skeleton width="60%" height="3.5rem" className="mb-4" />
                <Skeleton width="90%" height="1.1rem" className="mb-2" />
                <Skeleton width="75%" height="1.1rem" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
