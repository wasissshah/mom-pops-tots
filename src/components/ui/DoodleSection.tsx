"use client";

import type { ReactNode } from "react";
import { useDoodleInView } from "@/hooks/useDoodleInView";

type DoodleSectionProps = {
  className: string;
  children: ReactNode;
};

export default function DoodleSection({ className, children }: DoodleSectionProps) {
  const ref = useDoodleInView<HTMLElement>();

  return (
    <section ref={ref} className={className} data-doodles>
      {children}
    </section>
  );
}
