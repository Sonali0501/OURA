import { motion, useReducedMotion } from "framer-motion"

const HERO_VIDEO = "coconut_no_thumbnail.mp4";
const HERO_POSTER = "hero_poster.png";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-palm">
      <div className="absolute inset-0 overflow-hidden flex justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          className="h-full w-auto lg:w-full max-w-none object-cover"
          aria-hidden
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-palm/55 via-palm/30 to-palm/85" />
        <div className="absolute inset-0 bg-palm/20 mix-blend-multiply" />
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

        <motion.a
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
        </motion.a>
      </div>

      <span className="hidden lg:block absolute right-3 top-1/2 -translate-y-1/2 rotate-90 origin-center text-[10px] font-sans-ui tracking-luxe text-ivory/45 uppercase z-10">
        Index
      </span>

      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-ivory/15">
          <p className="text-[10px] font-sans-ui tracking-luxe text-ivory/55 uppercase text-center">
            Sisiram Private Limited <span className="opacity-40">.</span> Kochi, India
          </p>
          <p className="text-[10px] font-sans-ui tracking-luxe text-ivory/55 uppercase">
            A Promise of Pure Heritage
          </p>
        </div>
      </div>
    </section>
  );
}