"use client";

import { useEffect, useRef, type SelectHTMLAttributes } from "react";

type Select2Props = SelectHTMLAttributes<HTMLSelectElement> & {
  dropdownCssClass?: string;
};

type Select2Window = Window & { jQuery?: unknown; $?: unknown };

export default function Select2({
  dropdownCssClass = "select2-brand",
  className,
  children,
  ...rest
}: Select2Props) {
  const ref = useRef<HTMLSelectElement>(null);

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
    })();

    return () => {
      cancelled = true;
      if ($el) $el.select2("destroy");
    };
  }, [dropdownCssClass, className]);

  return (
    <select ref={ref} className={className} {...rest}>
      {children}
    </select>
  );
}
