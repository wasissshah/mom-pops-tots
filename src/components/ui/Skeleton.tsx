import type { CSSProperties } from "react";

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  className?: string;
  style?: CSSProperties;
};

// One grey shimmering block. Build any loading layout by combining these.
export default function Skeleton({
  width = "100%",
  height = "1rem",
  radius = "0.5rem",
  className = "",
  style,
}: SkeletonProps) {
  return (
    <span
      className={`skeleton ${className}`.trim()}
      style={{ display: "block", flexShrink: 0, width, height, borderRadius: radius, ...style }}
      aria-hidden="true"
    />
  );
}
