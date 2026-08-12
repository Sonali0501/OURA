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
          className="h-full bg-gold transition-all duration-300"
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
      `Projected annual units: ${fmt(units)}`,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:contact@ouracoconut.com?subject=${encodeURIComponent(
      "B2B Partnership Inquiry — OURA"
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <section id="b2b" className="relative bg-palm text-ivory">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-24 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          {/* Impact Console */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-husk text-[11px] font-sans-ui tracking-luxe uppercase">
                B2B &amp; Corporate Portal
              </p>
              <h2
                className="mt-4 font-display font-semibold leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
              >
                Scaling Purity
              </h2>
              <p className="mt-4 max-w-lg text-ivory/80">
                Measure your environmental offset in real time. Slide to project the impact of your
                commitment across plastic saved, carbon reduced, and artisan communities supported.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10">
                <div className="flex items-end justify-between mb-4">
                  <span className="text-[10px] font-sans-ui tracking-luxe uppercase text-ivory/70">
                    Annual Units
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
                  aria-label="Annual units"
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
                <StatCard label="Carbon Offset" value={fmt(carbon)} unit="kg" pct={pct(carbon, 21000)} />
                <StatCard label="Artisan Families" value={fmt(families)} unit="" pct={pct(families, 200)} />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 flex items-center gap-3 text-ivory/75 text-sm">
                <span className="block h-px w-8 bg-husk/70" />
                Direct support delivered to local artisan communities across Kerala.
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
                  Partner With Us
                </h3>
                <p className="mt-3 text-sm text-ivory/75 leading-relaxed">
                  Share your requirements and our team will reach out with tailored supply,
                  sustainability reporting, and partnership options.
                </p>

                {submitted ? (
                  <div className="mt-8 border border-ivory/15 p-6">
                    <p className="text-husk text-[10px] font-sans-ui tracking-luxe uppercase">
                      Inquiry prepared
                    </p>
                    <p className="mt-3 text-sm text-ivory/85 leading-relaxed">
                      Your message is ready to send. If your mail client did not open, email us
                      directly at{" "}
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
                      Send another inquiry
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
                          placeholder="Organisation"
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
                        placeholder="Tell us about your volume, timeline, and product needs…"
                        className={`${inputClass} resize-y min-h-[120px]`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 h-12 px-7 bg-gold text-ivory text-[11px] font-sans-ui tracking-luxe uppercase hover:brightness-110 transition"
                    >
                      Send inquiry <span aria-hidden="true">→</span>
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
