import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { useDeferredMedia } from "../../lib/deferredMedia";

const PORTRAIT = "founder_sreejith.webp";

export default function DeepDiveLink() {
  // Lazy until the hero is playing, then fetched in the background before the visitor scrolls here.
  const imgLoading = useDeferredMedia() ? "eager" : "lazy";
  return (
    <section className="bg-ivory text-gold border-y-2 border-palm">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4">
            <div className="overflow-hidden rounded-sm">
              <img
                src={PORTRAIT}
                loading={imgLoading}
                decoding="async"
                alt="Sreejith Murali, Founder & CEO of OURA"
                className="w-full h-auto fill"
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-gold/70 text-[11px] font-sans-ui tracking-luxe uppercase">Leadership</p>
              <h2 className="mt-4 font-display font-semibold leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                Take a Deep Dive
              </h2>
              <p className="mt-3 max-w-xl text-gold/80">
                Meet the leadership behind OURA — the Kerala roots, the decade in global work, and the
                moment that turned heritage into a promise of purity.
              </p>
              <Link
                to="/founder"
                className="mt-6 inline-flex items-center gap-3 h-12 px-7 bg-palm text-ivory border-2 border-palm font-semibold text-[11px] font-sans-ui tracking-[0.18em] uppercase hover:bg-gold hover:border-gold transition"
              >
                Meet the Team <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}