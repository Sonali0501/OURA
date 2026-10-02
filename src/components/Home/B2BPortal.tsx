import { useEffect, useRef, useState, type FormEvent } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const STATS = [
  { value: 3200, suffix: "", label: "Farmer Employment" },
  { value: 14080, suffix: "", label: "Families Supported" },
  { value: 22000, suffix: "+", label: "Loved by Customers" },
];

const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");

const STEP = 10;

/** Counts up from 1 the first time the card scrolls into view. */
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 1);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(value);
      return;
    }
    const controls = animate(1, value, {
      duration: 3.5,
      ease: [0.33, 1, 0.68, 1],
      // Tick in steps of 5 so the last digit settles instead of flickering.
      onUpdate: (v) => setShown(Math.max(1, Math.round(v / STEP) * STEP)),
      onComplete: () => setShown(value),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <div className="bg-ivory p-8 text-center shadow-sm">
      <p
        ref={ref}
        className="font-display font-semibold text-gold leading-none tabular-nums"
        style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)" }}
        aria-label={`${fmt(value)}${suffix}`}
      >
        {fmt(shown)}
        {suffix}
      </p>
      <p className="mt-3 text-sm md:text-base font-sans-ui font-medium tracking-[0.12em] uppercase text-gold/80">{label}</p>
    </div>
  );
}

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

const labelClass =
  "text-[10px] font-sans-ui tracking-luxe uppercase text-gold/70";
const inputClass =
  "mt-2 w-full bg-transparent border border-palm/25 px-4 py-3 text-sm text-gold placeholder:text-gold/40 focus:border-palm focus:outline-none transition";

export default function B2BPortal() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:contact@ouracoconut.com?subject=${encodeURIComponent(
      "Bulk Order Enquiry — OURA"
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <>
      {/* Impact */}
      <section id="b2b" className="relative bg-theme-gradient text-ivory">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20 lg:py-28">
          <Reveal>
            <h2
              className="font-display font-semibold leading-tight text-center max-w-3xl mx-auto"
              style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)" }}
            >
              Every order goes straight to artisan families in Kerala.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
              {STATS.map((s) => (
                <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="relative bg-parchment grain text-gold">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20 lg:py-28">
          <div className="flex flex-col gap-10 lg:gap-12">
            <div>
              <Reveal>
                {/* Heading left, intro right — same header layout as the Spectrum section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <p className="text-gold/70 text-[11px] font-sans-ui tracking-luxe uppercase">
                      Get in Touch
                    </p>
                    <h2
                      className="mt-4 font-display font-semibold leading-tight text-gold"
                      style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
                    >
                      Talk To Us
                    </h2>
                  </div>
                  <p className="max-w-md text-gold/80 text-base md:text-lg leading-relaxed">
                    Tell us what you need. We&apos;ll reply with pricing, delivery timelines, and a
                    report on the impact of your order.
                  </p>
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.1}>
                <div className="bg-ivory border border-palm/15 p-6 lg:p-10 shadow-sm">
                  {submitted ? (
                    <div>
                      <p className="text-gold text-[10px] font-sans-ui tracking-luxe uppercase font-semibold">
                        Your message is ready
                      </p>
                      <p className="mt-3 text-sm text-gold/85 leading-relaxed">
                        We&apos;ve opened your email app with the details filled in. If nothing
                        opened, just write to us at{" "}
                        <a
                          href="mailto:contact@ouracoconut.com"
                          className="font-semibold underline underline-offset-2"
                        >
                          contact@ouracoconut.com
                        </a>
                        .
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setForm(EMPTY_FORM);
                        }}
                        className="mt-6 text-[10px] font-sans-ui tracking-luxe uppercase text-gold/70 hover:text-gold transition"
                      >
                        Write another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* One row of four on desktop, two by two on tablet, stacked on phones */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                          <label htmlFor="b2b-name" className={labelClass}>Name</label>
                          <input
                            id="b2b-name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => updateField("name", e.target.value)}
                            placeholder="Your name"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="b2b-company" className={labelClass}>Company</label>
                          <input
                            id="b2b-company"
                            type="text"
                            required
                            value={form.company}
                            onChange={(e) => updateField("company", e.target.value)}
                            placeholder="Company name"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="b2b-email" className={labelClass}>Email</label>
                          <input
                            id="b2b-email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="you@company.com"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="b2b-phone" className={labelClass}>
                            Phone <span className="normal-case tracking-normal text-gold/45">(optional)</span>
                          </label>
                          <input
                            id="b2b-phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            placeholder="+91"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="b2b-message" className={labelClass}>Message</label>
                        <textarea
                          id="b2b-message"
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => updateField("message", e.target.value)}
                          placeholder="How many units do you need, by when, and which products?"
                          className={`${inputClass} resize-y min-h-[120px]`}
                        />
                      </div>

                      <button
                        type="submit"
                        className="inline-flex items-center gap-3 h-12 px-7 bg-palm text-ivory border-2 border-palm font-semibold text-[11px] font-sans-ui tracking-[0.18em] uppercase hover:bg-gold hover:border-gold transition"
                      >
                        Send message <span aria-hidden="true">→</span>
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
