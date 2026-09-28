"use client";

import { useSyncExternalStore, type InputHTMLAttributes } from "react";

const emptySubscribe = () => () => {};

/**
 * Browser extensions like LastPass scan the server-rendered HTML for
 * text/email/tel inputs and inject their own icon element into the DOM
 * before React hydrates. That extra node makes React's hydration diff fail
 * with an uncaught error (dev-only overlay, but still disruptive).
 *
 * Rendering nothing for this input until after mount means there is no
 * server-rendered <input> in the initial HTML for the extension to touch,
 * so there is nothing for hydration to mismatch against. The placeholder
 * keeps the exact same box size (via the same className) to avoid layout
 * shift while swapping in. useSyncExternalStore (rather than an effect
 * calling setState) is the documented pattern for a value that must differ
 * between the server-rendered snapshot and the client one.
 */
export default function SafeInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) {
    return <div className={props.className} aria-hidden />;
  }

  return <input {...props} data-lpignore="true" />;
}
