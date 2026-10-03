import { useSyncExternalStore } from "react";

/**
 * One switch for "the first screen is done — fetch everything else now".
 *
 * Heavy media below the fold (the Genesis film, creator reels, section images)
 * waits for this so the hero video gets the connection to itself, then loads
 * in the background before the visitor scrolls to it. The hero flips it as soon
 * as its video plays; a fallback flips it shortly after the page has loaded, for
 * pages without a hero or when autoplay is refused (e.g. iOS Low Power Mode).
 */

const FALLBACK_AFTER_LOAD_MS = 1500;

let started = false;
const listeners = new Set<() => void>();

export function startDeferredMedia() {
  if (started) return;
  started = true;
  listeners.forEach((notify) => notify());
}

if (typeof window !== "undefined") {
  const fallback = () => window.setTimeout(startDeferredMedia, FALLBACK_AFTER_LOAD_MS);
  if (document.readyState === "complete") fallback();
  else window.addEventListener("load", fallback, { once: true });
}

const subscribe = (notify: () => void) => {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
};

/** True once below-the-fold media may start downloading. */
export function useDeferredMedia(): boolean {
  return useSyncExternalStore(subscribe, () => started, () => false);
}
