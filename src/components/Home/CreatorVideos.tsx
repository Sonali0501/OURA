import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Instagram, Play, X } from "lucide-react";
import Reveal from "./Reveal";
import { CREATOR_VIDEOS, type CreatorVideo } from "../../data/creatorVideos";

const reelLabel = (video: CreatorVideo) =>
  video.handle ? `Reel by @${video.handle}` : "Creator reel about OURA";

/**
 * One reel preview. Plays muted only while it is on screen — five full reels
 * are ~50 MB, so nothing downloads past the first frame until a card scrolls
 * into view. `suspended` holds it still while the full-screen player is open.
 */
function ReelCard({
  video,
  suspended,
  onOpen,
}: {
  video: CreatorVideo;
  suspended: boolean;
  onOpen: () => void;
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
    if (visible && !suspended) {
      el.play().catch(() => {
        /* Autoplay refused (e.g. Low Power Mode) — the first frame stays up. */
      });
    } else {
      el.pause();
    }
  }, [visible, suspended]);

  return (
    <li className="snap-start shrink-0 w-[70vw] max-w-[280px] sm:w-[260px]">
      <div className="group relative aspect-[9/16] overflow-hidden rounded-xl bg-palm/10 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
        <video
          ref={ref}
          // #t= nudges iOS Safari into painting the first frame as a poster
          src={`${video.src}#t=0.1`}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          aria-hidden="true"
        />

        {/* The whole card opens the full-screen player */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Play ${reelLabel(video).toLowerCase()} full screen`}
          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/15 transition-colors"
        >
          <span className="w-14 h-14 rounded-full bg-ivory/85 text-gold flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition">
            <Play className="w-6 h-6 translate-x-0.5" fill="currentColor" />
          </span>
        </button>

        {(video.handle || video.reelUrl) && (
          <>
            {/* Scrim so the handle stays legible over any footage */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3">
              {video.handle ? (
                <span className="text-ivory text-sm font-sans-ui font-semibold truncate">
                  @{video.handle}
                </span>
              ) : (
                <span />
              )}
              {video.reelUrl && (
                <a
                  href={video.reelUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Watch on Instagram"
                  className="pointer-events-auto shrink-0 w-9 h-9 rounded-full bg-ivory/90 text-gold flex items-center justify-center hover:bg-ivory transition"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </>
        )}
      </div>

      {video.caption && (
        <p className="mt-3 text-sm text-ivory/85 leading-relaxed line-clamp-2">{video.caption}</p>
      )}
    </li>
  );
}

/** Full-screen player over a dark backdrop, with the browser's own controls. */
function ReelPlayer({ video, onClose }: { video: CreatorVideo; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={reelLabel(video)}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-ivory/15 text-ivory flex items-center justify-center hover:bg-ivory/25 transition"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Clicks on the video itself shouldn't fall through to the backdrop */}
      <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <video
          src={video.src}
          controls
          autoPlay
          playsInline
          className="max-h-[85vh] max-w-[92vw] aspect-[9/16] rounded-lg bg-black"
        />
        {(video.handle || video.reelUrl) && (
          <div className="flex items-center gap-3 text-ivory text-sm font-sans-ui">
            {video.handle && <span className="font-semibold">@{video.handle}</span>}
            {video.reelUrl && (
              <a
                href={video.reelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ivory/80 hover:text-ivory underline-offset-4 hover:underline"
              >
                <Instagram className="w-4 h-4" /> Watch on Instagram
              </a>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default function CreatorVideos() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<CreatorVideo | null>(null);

  if (CREATOR_VIDEOS.length === 0) return null;

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrowClass =
    "w-11 h-11 rounded-full border border-ivory/40 text-ivory flex items-center justify-center hover:bg-ivory hover:border-ivory hover:text-gold transition";

  return (
    <section id="creators" className="bg-theme-gradient text-ivory py-16 md:py-24 overflow-hidden">
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
                suspended={open !== null}
                onOpen={() => setOpen(video)}
              />
            ))}
          </ul>
        </Reveal>
      </div>

      {open && <ReelPlayer video={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
