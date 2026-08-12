import { Star, Quote } from "lucide-react";
import Reveal from "./Reveal";

const reviews = [
  {
    name: "Aravind Krishnan",
    city: "Kochi, Kerala",
    text: "The cold-pressed oil has become a staple in my mother's kitchen. It tastes exactly like the oil she remembers from her childhood — pure, fragrant, and honest.",
    initials: "AK",
  },
  {
    name: "Meera Nair",
    city: "Borivali, Mumbai",
    text: "I brought a bottle back to Mumbai and it completely changed how I cook. You can tell the difference the moment you open it. Real Kerala heritage in a bottle.",
    initials: "MN",
  },
  {
    name: "Vishnu Pillai",
    city: "Indiranagar, Bangalore",
    text: "As someone who grew up around coconut palms, OURA is the first brand that actually honors the source. No shortcuts, no pretense — just purity.",
    initials: "VP",
  },
  {
    name: "Divya Menon",
    city: "Saket, Delhi",
    text: "Living in Delhi, I had almost forgotten what real coconut oil smelled like. OURA brought Kerala back into my home. The quality is institutional-grade.",
    initials: "DM",
  },
  {
    name: "Sreelekshmi Warrier",
    city: "Thiruvananthapuram, Kerala",
    text: "It's rare to come across a brand that stays true to Kerala's traditions. OURA feels like a genuine sign of purity in a market full of compromises.",
    initials: "SW",
  },
  {
    name: "Anand Sharma",
    city: "Mayur Vihar, Delhi",
    text: "Finding a brand you can trust isn't easy anymore. OURA stands out as a refreshing reminder that purity, honesty, and quality still exist.",
    initials: "AS",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-ivory text-palm grain py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <div className="mb-12 md:mb-16 max-w-4xl">
            <p className="text-gold text-[11px] font-sans-ui tracking-luxe uppercase">
              Voices
            </p>
            <h2
              className="mt-4 font-display font-semibold leading-tight text-palm"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.4rem)" }}
            >
              Loved Across India &amp; Beyond
            </h2>
            <p className="mt-4 text-base md:text-lg text-palm/75 max-w-2xl leading-relaxed">
              From Kerala to Delhi, Bangalore, Chennai, Hyderabad, Mumbai and Pune — families who keep
              OURA on their table and in their story.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={0.05 * (i % 3)}>
              <div
                className="border border-palm/15 p-6 md:p-8 bg-ivory hover:border-gold/40 transition-colors flex flex-col h-full"
              >
                <div className="flex gap-4 items-center justify-between w-full">
                    <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" strokeWidth={1.5} />
                    ))}
                    </div>
                    <img src="google-logo.svg" alt="google" className="h-8 w-8" />
                </div>
                <Quote className="w-7 h-7 text-gold/25 mb-3" strokeWidth={1.5} />
                <p className="text-base text-palm/80 leading-relaxed mb-6 flex-1">{r.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-palm/10">
                  <div
                    className="w-10 h-10 rounded-full bg-palm flex items-center justify-center text-ivory font-sans-ui text-xs font-medium"
                  >
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-display font-medium text-palm">{r.name}</p>
                    <p className="font-sans-ui text-[10px] tracking-luxe uppercase text-palm/55">
                      {r.city}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
