import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from "lucide-react";
import Reveal from "./Reveal";
import InstagramLogo from "./InstagramLogo";
import { useNearViewport } from "../../hooks/useNearViewport";
import { useDeferredMedia } from "../../lib/deferredMedia";
import { COOK_VIDEOS, type CookVideo } from "../../data/cookVideos";

/** Card sizes in px. The highlighted card sits in the middle; the rest flank it. */
const SIZES = {
  desktop: { sideW: 180, sideH: 320, videoW: 248, detailsW: 320, activeH: 440, gap: 20 },
  mobile: { sideW: 124, sideH: 220, videoW: 202, detailsW: 0, activeH: 360, gap: 12 },
};

const EASE = [0.22, 1, 0.36, 1] as const;

function useIsMobile() {
  const query = "(max-width: 767px)";
  const [mobile, setMobile] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mobile;
}

/** Signed distance from the highlighted card, wrapped so the row loops (loop mode only). */
const offsetOf = (index: number, active: number, n: number) => {
  const half = Math.floor(n / 2);
  return ((index - active + n + half) % n) - half;
};

function CaptionPanel({ video, className = "" }: { video: CookVideo; className?: string }) {
  return (
    <div className={`bg-ivory text-left ${className}`}>
      <h3 className="font-sans-ui text-xl font-bold text-gold leading-snug">{video.title}</h3>
      <p className="mt-4 text-sm text-gold/75 leading-relaxed whitespace-pre-line">{video.subtitle}</p>
      <a
        href={video.reelUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`@${video.handle} - watch on Instagram`}
        className="group mt-6 pt-6 border-t border-palm/15 flex items-center gap-3"
      >
        <InstagramLogo className="w-6 h-6 shrink-0" />
        <span className="text-sm font-sans-ui font-bold text-gold truncate">
          @{video.handle}
        </span>
      </a>
    </div>
  );
}

function RecipeItem({
  video,
  offset,
  x,
  loop,
  load,
  mobile,
  onSelect,
}: {
  video: CookVideo;
  /** Signed distance from the highlighted card - ±1 shows the ‹ › arrows. */
  offset: number;
  /** Centre of this card relative to the centre of the row, in px. */
  x: number;
  /** In loop mode a card can wrap from one end to the other. */
  loop: boolean;
  load: boolean;
  mobile: boolean;
  onSelect: () => void;
}) {
  const s = mobile ? SIZES.mobile : SIZES.desktop;
  const active = offset === 0;
  const activeW = s.videoW + s.detailsW;
  const width = active ? activeW : s.sideW;
  const height = active ? s.activeH : s.sideH;

  // A card that wraps from one end of the loop to the other jumps instead of sliding across.
  const prevOffset = useRef(offset);
  const wrapped =
    loop && Math.abs(offset - prevOffset.current) > 1 && Math.sign(offset) !== Math.sign(prevOffset.current);
  useEffect(() => {
    prevOffset.current = offset;
  }, [offset]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Only the highlighted card plays; the others hold their first frame.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !load) return;
    if (active) {
      el.play().catch(() => {
        /* Autoplay refused (e.g. Low Power Mode) - the first frame stays up. */
      });
    } else {
      el.pause();
      el.muted = true;
      setMuted(true);
    }
  }, [active, load]);

  const toggleSound = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <motion.li
      initial={false}
      animate={{ x: x - width / 2, width, height, y: -height / 2 }}
      transition={wrapped ? { duration: 0 } : { duration: 0.5, ease: EASE }}
      className={`absolute left-1/2 top-1/2 ${active ? "z-20" : "z-10"}`}
    >
      <div
        className={`relative flex h-full overflow-hidden rounded-xl ${
          active ? "bg-ivory shadow-[0_20px_50px_rgba(0,0,0,0.35)]" : "shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
        }`}
      >
        {/* Video */}
        <div className="relative h-full shrink-0" style={{ width: active ? s.videoW : s.sideW }}>
          <video
            ref={videoRef}
            // #t= nudges iOS Safari into painting the first frame as a poster
            src={load ? `${video.src}#t=0.1` : undefined}
            muted
            loop
            playsInline
            preload={load ? (active ? "auto" : "metadata") : "none"}
            disablePictureInPicture
            className="w-full h-full object-cover bg-palm/30"
            aria-hidden="true"
          />

          {!active && (
            <>
              <div className="pointer-events-none absolute inset-0 bg-black/15" />
              <button
                type="button"
                onClick={onSelect}
                aria-label={`Show recipe: ${video.title}`}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="w-11 h-11 rounded-full bg-black/35 backdrop-blur-sm text-ivory flex items-center justify-center">
                  {offset === -1 ? (
                    <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                  ) : offset === 1 ? (
                    <ChevronRight className="w-5 h-5" strokeWidth={2} />
                  ) : (
                    <Play className="w-4 h-4 translate-x-px" fill="currentColor" />
                  )}
                </span>
              </button>
            </>
          )}

          {active && (
            <>
              <button
                type="button"
                onClick={toggleSound}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-ivory flex items-center justify-center hover:bg-black/55 transition"
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="pointer-events-none absolute left-4 right-4 bottom-4 text-ivory text-xs sm:text-sm font-sans-ui font-semibold truncate">
            @{video.handle}
          </span>
        </div>

        {/* Caption beside the video (desktop); on phones it sits under the row */}
        {active && !mobile && <CaptionPanel video={video} className="p-7 overflow-y-auto" />}
      </div>
    </motion.li>
  );
}

export default function CookWithOura() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const [rowW, setRowW] = useState(0);
  // Start on the middle recipe (the earlier of the two middles for an even count).
  const [active, setActive] = useState(() => Math.floor((COOK_VIDEOS.length - 1) / 2));
  const mobile = useIsMobile();
  // Same loading rule as the creator reels: in the background once the hero is
  // playing, or as the section approaches if that comes first.
  const ready = useDeferredMedia();
  const near = useNearViewport(sectionRef, "600px");
  const load = ready || near;

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => setRowW(row.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  if (COOK_VIDEOS.length === 0) return null;

  // Each recipe appears once. If they're wider than the screen, the row loops
  // edge to edge with the highlighted card centred; otherwise the whole row is
  // centred as one group and the highlighted card expands in place.
  const items = COOK_VIDEOS;
  const n = items.length;
  const s = mobile ? SIZES.mobile : SIZES.desktop;
  const activeW = s.videoW + s.detailsW;
  const rowTotal = activeW + (n - 1) * (s.sideW + s.gap);
  const loop = rowW > 0 && rowTotal > rowW;

  const layout = (() => {
    if (loop) {
      return items.map((_, i) => {
        const offset = offsetOf(i, active, n);
        const dist = Math.abs(offset);
        const x =
          offset === 0 ? 0 : Math.sign(offset) * (activeW / 2 + s.gap + s.sideW / 2 + (dist - 1) * (s.sideW + s.gap));
        return { offset, x };
      });
    }
    let left = -rowTotal / 2;
    return items.map((_, i) => {
      const w = i === active ? activeW : s.sideW;
      const x = left + w / 2;
      left += w + s.gap;
      return { offset: i - active, x };
    });
  })();

  return (
    <section ref={sectionRef} id="cook" className="bg-theme-gradient text-ivory py-14 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          {/* Title left, intro right - same header layout as the Spectrum section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div>
              <p className="flex items-center gap-3 text-ivory/85 text-[11px] font-sans-ui font-semibold uppercase tracking-[0.2em]">
                {/* <span aria-hidden="true" className="block w-6 h-px bg-ivory/85" /> */}
                OURA In Your Kitchen
              </p>
              <h2
                className="mt-3 font-display font-bold leading-[1.1] text-ivory"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
              >
                Cook with OURA
              </h2>
            </div>
            <p className="max-w-md text-ivory/85 text-base md:text-lg leading-relaxed">
              Recipes, pairings, and creative ideas from our community of OURA lovers.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Full-bleed row: loops when it overflows, otherwise centred */}
      <Reveal delay={0.1}>
        <ul ref={rowRef} className="relative mt-8 md:mt-10" style={{ height: s.activeH + 24 }}>
          {items.map((video, i) => (
            <RecipeItem
              key={i}
              video={video}
              offset={layout[i].offset}
              x={layout[i].x}
              loop={loop}
              load={load}
              mobile={mobile}
              onSelect={() => setActive(i)}
            />
          ))}
        </ul>
      </Reveal>

      {mobile && (
        <div className="px-6 mt-6">
          <CaptionPanel video={items[active]} className="rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]" />
        </div>
      )}
    </section>
  );
}
