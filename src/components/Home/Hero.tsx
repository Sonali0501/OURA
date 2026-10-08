import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion"
import { startDeferredMedia } from "../../lib/deferredMedia";

const HERO_VIDEO = "/video1.mp4";
/** Same clip at a lower bitrate (1 MB vs 2.2 MB) - starts sooner on phone connections. */
const HERO_VIDEO_MOBILE = "/video1_mobile.mp4";
const HERO_POSTER = "/hero_poster.jpg";

/* Older iOS and the Android WeChat/X5 engines only honour their own vendor
   spellings of playsinline; they aren't in React's prop types. */
const inlineAttrs = {
  "webkit-playsinline": "true",
  "x5-playsinline": "true",
} as Record<string, string>;

export default function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // React sets `muted` as a DOM property after the element exists, so the
  // attribute can be missing at the moment the browser first decides whether
  // autoplay is allowed - Safari and some Chromium builds then refuse and put
  // a play button over the poster. Force it muted ourselves, ask to play, and
  // if the browser still says no (iOS Low Power Mode is the usual culprit),
  // retry the next time the tab is shown or the visitor touches the page.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");

    let settled = false;

    const attempt = () => {
      if (settled) return;
      const started = video.play();
      if (started === undefined) return;
      started
        .then(() => {
          settled = true;
          cleanup();
          // Hero is up - let the rest of the page's media start downloading.
          startDeferredMedia();
        })
        .catch(() => {
          /* Blocked for now - the listeners below will try again. */
        });
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") attempt();
    };

    const gestures = ["pointerdown", "touchstart", "keydown", "scroll"] as const;

    const cleanup = () => {
      video.removeEventListener("loadeddata", attempt);
      video.removeEventListener("canplay", attempt);
      document.removeEventListener("visibilitychange", onVisibility);
      gestures.forEach((type) => window.removeEventListener(type, attempt));
    };

    video.addEventListener("loadeddata", attempt);
    video.addEventListener("canplay", attempt);
    document.addEventListener("visibilitychange", onVisibility);
    gestures.forEach((type) =>
      window.addEventListener(type, attempt, { passive: true })
    );

    attempt();
    return cleanup;
  }, []);

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-theme-gradient">
      <div className="absolute inset-0 overflow-hidden flex justify-center">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          {...inlineAttrs}
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
          tabIndex={-1}
          preload="auto"
          poster={HERO_POSTER}
          className="bg-video h-full w-auto lg:w-full max-w-none object-cover"
          aria-hidden
        >
          {/* Browsers take the first <source> whose media query matches */}
          <source src={HERO_VIDEO_MOBILE} type="video/mp4" media="(max-width: 767px)" />
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        {/* Matches the live site: its overlay uses the original deep green, #163A2E */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#163A2E]/55 via-[#163A2E]/30 to-[#163A2E]/85" />
        <div className="absolute inset-0 bg-[#163A2E]/20 mix-blend-multiply" />
      </div>

      <div className="relative z-10 gap-3 lg:gap-6 flex min-h-screen flex-col items-center justify-center px-6 lg:pt-20 text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-husk text-[11px] sm:text-xs font-sans-ui tracking-luxe uppercase"
        >
          Organic <span className="opacity-40">.</span> Untouched{" "}
          <span className="opacity-40">.</span> Raw <span className="opacity-40">.</span> Authentic
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display font-bold leading-[0.82] text-ivory"
          style={{ fontSize: "clamp(6rem, 22vw, 20rem)", textShadow: "0 8px 60px rgba(0,0,0,0.45)" }}
        >
          OURA
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-display italic text-ivory/90"
          style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.6rem)" }}
        >
          The Complete Coconut Story
        </motion.p>

        {/* <motion.a
          href="#genesis"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] font-sans-ui tracking-luxe text-ivory/60 uppercase">Scroll</span>
          <span className="relative block h-16 w-px bg-ivory/25 overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-8 bg-husk animate-pulse-down" />
          </span>
        </motion.a> */}
      </div>

      {/* <span className="hidden lg:block absolute right-3 top-1/2 -translate-y-1/2 rotate-90 origin-center text-[10px] font-sans-ui tracking-luxe text-ivory/45 uppercase z-10">
        Index
      </span> */}

      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-ivory/15">
          <p className="text-[10px] font-sans-ui tracking-luxe text-ivory/55 uppercase text-center">
            Sisiram Group <span className="opacity-40">.</span> Kochi, India
          </p>
          <p className="text-[10px] font-sans-ui tracking-luxe text-ivory/55 uppercase">
            A Promise of Pure Heritage
          </p>
        </div>
      </div>
    </section>
  );
}