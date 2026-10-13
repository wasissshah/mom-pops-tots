"use client";

// Global language choice (header dropdown) shared by every page and every API call.
//   - null  = the visitor has not chosen a language -> no `lang` filter is sent to the API
//   - "en"  = sent as ?lang=en on every localized request (see apiGet)
// The choice is remembered in localStorage, so it survives page changes and refreshes.
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "mpt-lang";
const listeners = new Set<() => void>();
let current: string | null = null;
let loaded = false;

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    current = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    /* storage blocked: keep it in memory only */
  }
}

export function getLang(): string | null {
  load();
  return current;
}

export function setLang(code: string) {
  load();
  current = code.toLowerCase();
  try {
    window.localStorage.setItem(STORAGE_KEY, current);
  } catch {
    /* ignore */
  }
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// React hook: re-renders the component whenever the language changes
export const useLang = () => useSyncExternalStore(subscribe, getLang, () => null);

// Lookup lists and single-event pages are not filtered by language
export const isLocalizedPath = (path: string) =>
  !/^\/api\/v1\/(cities|languages)(\/|$)/.test(path) && !/^\/api\/v1\/events\/\d+/.test(path);
