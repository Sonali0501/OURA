import { Link } from "react-router-dom";
import Reveal from "../components/Home/Reveal";
import OuraFooter from "../components/layout/OuraFooter";
import WhatsAppButton from "../components/layout/WhatsAppButton";

const PORTRAIT = "sreejith.jpg";
const CANOPY = "canopy.webp";

const ABOUT_SISIRAM =
  "Sisiram Group is headquartered in Kochi, Kerala, with our manufacturing unit. We are a Kerala-based house of nature-led brands, crafting nature's finest goodness — sourcing directly from agrarian communities, processing without chemical interference, and finishing by hand. Every output is a quiet act of respect: for the soil, the artisan, and the family that will finally hold it.";

const VISIONARY =
  "OURA is Sisiram Group's first visionary brand — born to institutionalize the purity of the coconut. Not merely a product line, but a promise: to carry Kerala's raw, untouched goodness from the tree to the global table, with zero waste and absolute integrity.";

const CEO_BRIEF =
  "Sreejith Murali is the founder and CEO of OURA. Over a decade he directed a $3.25M VC-backed portfolio across high-growth AI, SaaS and technology ventures, scaling businesses from scratch across the GCC, EMEA and North America, and holds specializations from the University of Oxford and Harvard Business School.";

const ORIGIN = [
  "In Kerala, the coconut tree is not a plant — it is a pulse. It shades our homes, feeds our children, and holds the memory of generations. To grow up beneath its canopy is to learn, very early, that the finest things in life are quiet, patient, and entirely natural.",
  "For ten years, Sreejith built a career in institutional execution across global technology ventures — mastering strategy and scale from the GCC to North America. Yet the further the world of machines carried him, the louder the call of the soil became. He realized that true modern luxury isn't found in industrial complexity; it is found in returning to the source.",
  "So he came home. OURA was born at that exact convergence — Kerala's raw botanical heritage married to Harvard-grade strategy and Oxford-vetted operational discipline. The mission was never merely to manufacture; it was to translate nature's language, cold-pressing the coconut into sustainable, zero-waste essentials that carry the soul of Kerala to the global table."
];

const QUOTE =
  "We don't manufacture purity. We simply refuse to take it away.";

const STORIES = [
  { k: "The Pulse", body: "A childhood beneath Kerala's coconut canopy — learning that nature speaks in quiet resilience and absolute purity." },
  { k: "The Pivot", body: "A decade directing global tech ventures — and the growing conviction that real luxury means returning to the source." },
  { k: "The Promise", body: "OURA: heritage married to institutional discipline, carrying purity from Kerala to the world." }
];

const HIGHLIGHTS = [
  { metric: "$3.25M", label: "VC-backed portfolio directed with full P&L ownership" },
  { metric: "$0 → $5M", label: "Regional operations scaled across GCC, EMEA & NAMER" },
  { metric: "Oxford", label: "AI Foundations for Business — Saïd Business School" },
  { metric: "Harvard", label: "Innovation & Strategy — Harvard Business School" }
];

export default function FounderProfile() {
  return (
    <div className="bg-ivory text-gold">
      {/* Sisiram hero */}
      <section className="relative bg-theme-gradient text-ivory pt-28 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={CANOPY} alt="" className="w-full h-full fill" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 text-center">
          <Reveal>
            <p className="text-husk text-[11px] font-sans-ui tracking-luxe uppercase">The House Behind OURA</p>
            <h1 className="mt-6 font-display font-bold leading-[0.92]" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
              Sisiram Group
            </h1>
            <p className="mt-5 font-display italic text-ivory/85 text-xl lg:text-2xl">Crafting Nature's Finest Goodness</p>
            <p className="mt-4 text-[11px] font-sans-ui tracking-luxe text-ivory/70 uppercase">Kochi, Kerala, India</p>
            <Link to="/" className="mt-8 inline-flex items-center gap-2 text-[11px] font-sans-ui tracking-luxe uppercase text-ivory/75 hover:text-husk transition">
              <span aria-hidden="true">←</span> Back to the story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* About Sisiram */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-4">
            <p className="text-gold text-[11px] font-sans-ui tracking-luxe uppercase">About Sisiram</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-gold leading-tight">
              Headquartered and <br />Crafted in Kochi
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <p className="text-xl font-display text-gold leading-relaxed">{ABOUT_SISIRAM}</p>
          </Reveal>
        </div>
      </section>

      {/* Our First Visionary Brand — OURA */}
      <section className="bg-theme-gradient text-ivory">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12 py-16 lg:py-24 text-center">
          <Reveal>
            <p className="text-husk text-[11px] font-sans-ui tracking-luxe uppercase">Our First Visionary Brand</p>
            <h2 className="mt-5 font-display font-bold leading-none" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
              OURA
            </h2>
            <p className="mt-3 font-display italic text-ivory/85 text-xl">A Promise of the Coconut</p>
            <p className="mt-6 max-w-2xl mx-auto text-ivory/80 leading-relaxed">{VISIONARY}</p>
          </Reveal>
        </div>
      </section>

      {/* The Founder & CEO */}
      <section className="bg-secondary text-gold">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-24">
          <Reveal>
            <p className="text-gold text-[11px] font-sans-ui tracking-luxe uppercase">The Founder &amp; CEO</p>
            <h2 className="mt-4 font-display font-semibold leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              Sreejith Murali
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <Reveal>
                <div className="overflow-hidden rounded-sm max-w-md">
                  <img src={PORTRAIT} alt="Sreejith Murali, Founder & CEO of OURA" />
                </div>
                <div className="mt-6 max-w-sm">
                  <p className="font-display text-2xl font-semibold text-gold leading-snug">“{QUOTE}”</p>
                  <p className="mt-3 text-[10px] font-sans-ui tracking-luxe uppercase text-gold/65">Sreejith Murali · Founder &amp; CEO</p>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-lg font-display text-gold leading-relaxed">{CEO_BRIEF}</p>
              </Reveal>
              <div className="mt-6 space-y-4">
                {ORIGIN.map((p, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <p className="text-base text-gold/85 leading-relaxed">{p}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.2}>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {STORIES.map((s) => (
                    <div key={s.k} className="border-t-2 border-palm/25 pt-4">
                      <p className="font-display text-xl font-semibold text-gold">{s.k}</p>
                      <p className="mt-2 text-sm text-gold/80 leading-relaxed">{s.body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pedigree */}
      <section className="bg-theme-gradient text-ivory">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-20">
          <Reveal>
            <p className="text-husk text-[11px] font-sans-ui tracking-luxe uppercase">Executive Pedigree</p>
            <h2 className="mt-4 font-display font-semibold leading-tight" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)" }}>Institutional Execution</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.metric} delay={i * 0.08}>
                <div className="border border-ivory/15 p-6">
                  <p className="font-display text-3xl font-semibold text-husk">{h.metric}</p>
                  <p className="mt-2 text-sm text-ivory/80 leading-relaxed">{h.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 text-[10px] font-sans-ui tracking-luxe uppercase text-ivory/65">
              Alumni: G-MBA, Liverpool John Moores University, UK &nbsp;|&nbsp; PG, IMT Ghaziabad
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-24 text-center">
        <Reveal>
          <h2 className="font-display font-semibold leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            Experience the Promise of Purity
          </h2>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/#shop" className="h-12 px-8 inline-flex items-center bg-[#FAF6EC] text-gold border-2 border-palm font-semibold text-[11px] font-sans-ui tracking-[0.18em] uppercase hover:bg-[#F2EBDA] transition">Shop the Suite</Link>
            <a href="/#b2b" className="h-12 px-8 inline-flex items-center border border-palm/30 text-gold text-[11px] font-sans-ui tracking-[0.18em] uppercase hover:border-palm hover:bg-theme-gradient hover:text-ivory transition">Partner With Us</a>
          </div>
        </Reveal>
      </section> */}
      <OuraFooter />
      <WhatsAppButton />
    </div>
  );
}
