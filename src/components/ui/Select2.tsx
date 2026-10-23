"use client";

import { useEffect, useRef, useState, type SelectHTMLAttributes } from "react";
import Skeleton from "@/components/ui/Skeleton";

type Select2Props = SelectHTMLAttributes<HTMLSelectElement> & {
  dropdownCssClass?: string;
  /** Called with the new value when the user picks an option (select2 fires jQuery events, not React onChange). */
  onValueChange?: (value: string) => void;
};

type Select2Window = Window & { jQuery?: unknown; $?: unknown };

export default function Select2({
  dropdownCssClass = "select2-brand",
  onValueChange,
  className,
  children,
  ...rest
}: Select2Props) {
  const ref = useRef<HTMLSelectElement>(null);
  const [ready, setReady] = useState(false);
  const onValueChangeRef = useRef(onValueChange);

  useEffect(() => {
    onValueChangeRef.current = onValueChange;
  }, [onValueChange]);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let $el: any;

    (async () => {
      const { default: $ } = await import("jquery");
      const win = window as Select2Window;
      win.jQuery = $;
      win.$ = $;

      // select2's CJS build exports a factory `(root, jQuery) => void` that
      // attaches `.fn.select2` to the given jQuery instance — it must be
      // invoked explicitly, importing the module alone does nothing. The
      // "full" build (not the slim/core one `select2` resolves to by
      // default) is required for the dropdownCssClass/selectionCssClass
      // compat options used by the brand skin below.
      const select2Module = (await import("select2/dist/js/select2.full.js")) as unknown as {
        default: (root: Window, jq: typeof $) => void;
      };
      select2Module.default(window, $);

      if (cancelled || !ref.current) return;

      $el = $(ref.current);
      $el.select2({
        minimumResultsForSearch: Infinity,
        selectionCssClass: ":all:",
        dropdownCssClass,
      });
      $el.on("change.mptValue", (e: { target: HTMLSelectElement }) => onValueChangeRef.current?.(e.target.value));
      setReady(true);
    })();

    return () => {
      cancelled = true;
      if ($el) {
        $el.off("change.mptValue");
        $el.select2("destroy");
      }
    };
  }, [dropdownCssClass, className]);

  // Until select2 has replaced the native <select> (it loads asynchronously), show a skeleton of the
  // same size so the browser's own arrow never flashes next to the styled one.
  return (
    <>
      {!ready && <Skeleton width="190px" height="40px" radius="1rem" />}
      <select ref={ref} className={className} {...rest} style={ready ? rest.style : { ...rest.style, display: "none" }}>
        {children}
      </select>
    </>
  );
}
