import Skeleton from "@/components/ui/Skeleton";

// Goes inside the calendar's "row": left = month grid, right = list of events
export default function CalendarSkeleton() {
  return (
    <>
      <div className="col-lg-6 p-0" aria-busy="true" aria-label="Loading calendar">
        <div className="calendar__wrapper">
          <Skeleton width="45%" height="1.6rem" className="mb-4" />
          <Skeleton height="22rem" radius="0.5rem" />
        </div>
      </div>
      <div className="col-lg-6 p-0">
        <div className="calendar__panel">
          <Skeleton width="55%" height="1.4rem" className="mb-4" />
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} height="5.5rem" radius="14px" className="mb-3" />
          ))}
        </div>
      </div>
    </>
  );
}
