import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");

type StatCardProps = {
  label: string;
  value: string;
  unit: string;
  pct: number;
};

function StatCard({ label, value, unit, pct }: StatCardProps) {
  return (
    <div className="border border-ivory/15 p-6">
      <div className="flex items-end justify-between">
        <span className="text-[10px] font-sans-ui tracking-luxe uppercase text-husk">{label}</span>
        <span className="text-[10px] font-sans-ui text-ivory/70">{pct}%</span>
      </div>
      <p className="mt-3 font-display text-4xl font-semibold text-ivory">
        {value}
        <span className="text-base text-ivory/70 font-body ml-1">{unit}</span>
      </p>
      <div className="mt-4 h-px bg-ivory/10 overflow-hidden">
        <div
          className="h-full bg-theme-gradient transition-all duration-300"
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
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
  "text-[10px] font-sans-ui tracking-luxe uppercase text-ivory/70";
const inputClass =
  "mt-2 w-full bg-transparent border border-ivory/15 px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-husk/60 focus:outline-none transition";

export default function B2BPortal() {
  const [units, setUnits] = useState(5000);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const plastic = units * 0.15;
  const carbon = units * 0.42;
  const families = Math.ceil(units / 250);

  const pct = (val: number, max: number) => Math.round((val / max) * 100);

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
      `Units per year: ${fmt(units)}`,
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
    <section id="b2b" className="relative bg-theme-gradient text-ivory">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-24 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          {/* Impact Console */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-husk text-[11px] font-sans-ui tracking-luxe uppercase">
                Bulk &amp; Business Orders
              </p>
              <h2
                className="mt-4 font-display font-semibold leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
              >
                Buy More, Waste Less
              </h2>
              <p className="mt-4 max-w-lg text-ivory/80">
                Move the slider to see what your yearly order adds up to: plastic kept out of
                landfill, carbon saved, and artisan families supported.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10">
                <div className="flex items-end justify-between mb-4">
                  <span className="text-[10px] font-sans-ui tracking-luxe uppercase text-ivory/70">
                    Units Per Year
                  </span>
                  <span className="font-display text-3xl font-semibold text-husk">
                    {fmt(units)}
                  </span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={50000}
                  step={500}
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  aria-label="Units per year"
                  className="w-full oura-range"
                />
                <div className="flex justify-between mt-2 text-[10px] font-sans-ui tracking-luxe uppercase text-ivory/55">
                  <span>2,000</span>
                  <span>50,000</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard label="Plastic Saved" value={fmt(plastic)} unit="kg" pct={pct(plastic, 7500)} />
                <StatCard label="Carbon Saved" value={fmt(carbon)} unit="kg" pct={pct(carbon, 21000)} />
                <StatCard label="Families Supported" value={fmt(families)} unit="" pct={pct(families, 200)} />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 flex items-center gap-3 text-ivory/75 text-sm">
                <span className="block h-px w-8 bg-husk/70" />
                Every order goes straight to artisan families in Kerala.
              </div>
            </Reveal>
          </div>

          {/* Get in Touch */}
          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <div className="border border-ivory/15 p-6 lg:p-8">
                <h3
                  className="mt-3 font-display font-semibold leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                >
                  Talk To Us
                </h3>
                <p className="mt-3 text-sm text-ivory/75 leading-relaxed">
                  Tell us what you need. We&apos;ll reply with pricing, delivery timelines, and a
                  report on the impact of your order.
                </p>

                {submitted ? (
                  <div className="mt-8 border border-ivory/15 p-6">
                    <p className="text-husk text-[10px] font-sans-ui tracking-luxe uppercase">
                      Your message is ready
                    </p>
                    <p className="mt-3 text-sm text-ivory/85 leading-relaxed">
                      We&apos;ve opened your email app with the details filled in. If nothing
                      opened, just write to us at{" "}
                      <a
                        href="mailto:contact@ouracoconut.com"
                        className="text-husk hover:underline"
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
                      className="mt-6 text-[10px] font-sans-ui tracking-luxe uppercase text-ivory/70 hover:text-husk transition"
                    >
                      Write another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                          Phone <span className="normal-case tracking-normal text-ivory/45">(optional)</span>
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
                      className="inline-flex items-center gap-3 h-12 px-7 bg-[#FAF6EC] text-gold border-2 border-palm font-semibold text-[11px] font-sans-ui tracking-[0.18em] uppercase hover:bg-[#F2EBDA] transition"
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
  );
}
