import { useEffect, useState, type RefObject } from "react";

/**
 * True once the element comes within `rootMargin` of the viewport, and stays
 * true. Used to hold back heavy media below the fold so the hero video gets
 * the connection to itself on first load.
 */
export function useNearViewport(ref: RefObject<Element | null>, rootMargin = "400px"): boolean {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, near]);

  return near;
}
