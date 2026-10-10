import Skeleton from "@/components/ui/Skeleton";

const WIDTHS = ["80%", "65%", "90%", "70%"];

// Items shown inside an open dropdown while its list is loading
export default function DropdownSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <li className="px-3 py-2" key={i} aria-hidden="true">
          <Skeleton width={WIDTHS[i % WIDTHS.length]} height="1rem" />
        </li>
      ))}
    </>
  );
}
