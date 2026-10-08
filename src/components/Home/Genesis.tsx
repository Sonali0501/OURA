import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { useNearViewport } from "../../hooks/useNearViewport";
import { useDeferredMedia } from "../../lib/deferredMedia";

const BRAND_VIDEO = "/brand_video.mp4";
const BRAND_POSTER = "/canopy.webp";

const STORY = [
  "In Kerala, the coconut tree is not a plant - it is a pulse. It shades our homes, feeds our children, and holds the memory of generations. To grow up beneath its canopy is to learn, very early, that the finest things in life are quiet, patient, and entirely natural.",
  "OURA began as a simple question: what if the purity we grew up with - the untouched, the raw, the real - could be shared with the world without losing a single drop of its soul? No shortcuts. No synthetic disguise. Just the coconut, honored completely.",
  "So we return to the source. We cold-press, we reclaim, we hand-finish - turning every part of the coconut into something useful and beautiful, with zero waste. From a glass of living water to a bowl on your table, OURA is Kerala's heritage, carried whole, from our home to yours."
];

export default function Genesis() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Downloads in the background once the hero is playing (so it's ready before
  // the visitor scrolls here), and plays when it comes into range.
  const ready = useDeferredMedia();
  const near = useNearViewport(videoRef);
  const load = ready || near;

  useEffect(() => {
    const el = videoRef.current;
    if (!near || !el) return;
    // React sets `muted` as a property, which some mobile browsers check too late for autoplay.
    el.muted = true;
    el.play().catch(() => {
      /* Autoplay refused (e.g. Low Power Mode) - the poster stays up. */
    });
  }, [near]);

  return (
    <section id="genesis" className="relative bg-ivory text-gold grain">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-24">
        <Reveal>
          <p className="text-center text-gold text-[11px] font-sans-ui tracking-luxe uppercase">Founder's Vision</p>
          <h2 className="mt-4 text-center font-display font-semibold leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            The Genesis of Oura
            <span className="block italic text-gold/80 font-normal">A Love Affair with the Coconut Tree</span>
          </h2>
        </Reveal>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <Reveal>
              <div className="relative overflow-hidden rounded-sm">
                <video
                  ref={videoRef}
                  src={load ? BRAND_VIDEO : undefined}
                  loop
                  muted
                  playsInline
                  preload={load ? "auto" : "none"}
                  poster={BRAND_POSTER}
                  controls={false}
                  disablePictureInPicture
                  className="bg-video w-full aspect-[3/2] object-cover"
                  aria-label="OURA brand film"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <div>
                {STORY.map((p, i) => (
                  <p key={i} className={`mb-4 leading-relaxed ${i === 0 ? "text-xl font-display text-gold font-medium" : "text-base text-gold/85"}`}>
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 flex items-center gap-4">
                <span className="block h-px w-12 bg-theme-gradient" />
                <div>
                  <p className="font-display text-lg font-semibold text-gold">Sreejith Murali</p>
                  <p className="text-[10px] font-sans-ui tracking-luxe text-gold/65 uppercase">Founder &amp; CEO</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}