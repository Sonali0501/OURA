import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import Reveal from "./Reveal";
import { useNearViewport } from "../../hooks/useNearViewport";
import { useDeferredMedia } from "../../lib/deferredMedia";
import { CREATOR_VIDEOS, type CreatorVideo } from "../../data/creatorVideos";

const reelLabel = (video: CreatorVideo) =>
  video.handle ? `Reel by @${video.handle}` : "Creator reel about OURA";

/** Instagram glyph in its brand gradient. */
function InstagramLogo({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id={id} cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
      />
    </svg>
  );
}

/**
 * One reel preview. Every reel downloads in the background once the hero is
 * playing (or as the section approaches, if sooner), so nothing waits when the
 * visitor arrives. Each plays muted only while on screen. Clicking the card
 * opens the reel on Instagram.
 */
function ReelCard({
  video,
  load,
  soundOn,
  onToggleSound,
}: {
  video: CreatorVideo;
  /** Set once below-the-fold media may load; until then nothing downloads. */
  load: boolean;
  /** Only one reel in the row may have sound — the section decides which. */
  soundOn: boolean;
  onToggleSound: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.6,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible) {
      el.play().catch(() => {
        /* Autoplay refused (e.g. Low Power Mode) — the first frame stays up. */
      });
    } else {
      el.pause();
    }
  }, [visible]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = !soundOn;
    if (soundOn) el.play().catch(() => {});
  }, [soundOn]);

  return (
    <li className="snap-start shrink-0 w-[70vw] max-w-[280px] sm:w-[260px]">
      <div className="group relative aspect-[9/16] overflow-hidden rounded-xl bg-palm/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
        <video
          ref={ref}
          // #t= nudges iOS Safari into painting the first frame as a poster
          src={load ? `${video.src}#t=0.1` : undefined}
          muted
          loop
          playsInline
          preload={load ? "auto" : "none"}
          disablePictureInPicture
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          aria-hidden="true"
        />

        {/* The whole card opens the reel on Instagram */}
        <a
          href={video.reelUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${reelLabel(video)} — watch on Instagram`}
          className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors"
        />

        {/* Sits above the link so toggling sound doesn't open Instagram */}
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundOn ? "Mute reel" : "Unmute reel"}
          className={`absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-ivory flex items-center justify-center hover:bg-black/60 focus-visible:opacity-100 transition ${
            // Hover-reveal only where hovering exists — touch screens always show it
            soundOn ? "opacity-100" : "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
          }`}
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <InstagramLogo className="absolute top-3.5 right-3.5 z-10 w-7 h-7 pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]" />

        {video.handle && (
          <>
            {/* Scrim so the handle stays legible over any footage */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="pointer-events-none absolute left-4 right-4 bottom-4 text-ivory text-sm font-sans-ui font-semibold truncate">
              @{video.handle}
            </span>
          </>
        )}
      </div>

      {video.caption && (
        <p className="mt-3 text-sm text-ivory/85 leading-relaxed line-clamp-2">{video.caption}</p>
      )}
    </li>
  );
}

export default function CreatorVideos() {
  const trackRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  // All reels load together — in the background once the hero is playing, or as
  // the section approaches if that comes first — never card by card on swipe.
  const ready = useDeferredMedia();
  const near = useNearViewport(sectionRef, "600px");
  const [soundSrc, setSoundSrc] = useState<string | null>(null);

  if (CREATOR_VIDEOS.length === 0) return null;

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrowClass =
    "w-11 h-11 rounded-full border border-ivory/40 text-ivory flex items-center justify-center hover:bg-ivory hover:border-ivory hover:text-gold transition";

  return (
    <section ref={sectionRef} id="creators" className="bg-theme-gradient text-ivory py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-ivory/80 text-xs uppercase tracking-[0.3em] mb-4">From the community</p>
              <h2
                className="font-display font-bold leading-[1.1] text-ivory"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                <span className="text-[0.8em]">They&apos;re talking about</span> OURA
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous reels" className={arrowClass}>
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button type="button" onClick={() => scrollBy(1)} aria-label="Next reels" className={arrowClass}>
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul
            ref={trackRef}
            className="mt-10 md:mt-14 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
          >
            {CREATOR_VIDEOS.map((video) => (
              <ReelCard
                key={video.src}
                video={video}
                load={ready || near}
                soundOn={soundSrc === video.src}
                onToggleSound={() => setSoundSrc((cur) => (cur === video.src ? null : video.src))}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
