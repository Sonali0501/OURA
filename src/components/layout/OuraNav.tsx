import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type LinkObj = { label: string; to?: string; href?: string }

const LINKS = [
//   { label: "The Complete Story", href: "#top" },
  { label: "Genesis", href: "#genesis" },
  { label: "Foundation", to: "/founder" },
  { label: "Spectrum", href: "#spectrum" },
  { label: "Soil to Sip", href: "#soil-to-sip" },
  { label: "Roadmap", href: "#b2b" }
];

export default function OuraNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ivory on dark hero; palm on light glass after scroll or when mobile menu is open
  const lightChrome = scrolled || open;
  const linkColor = lightChrome ? "text-palm/80 hover:text-palm" : "text-ivory/90 hover:text-ivory";
  const logoColor = lightChrome ? "text-palm" : "text-ivory";

  const renderItem = (l: LinkObj, close = false) =>
    l.to ? (
      <Link key={l.label} to={l.to} onClick={close ? () => setOpen(false) : undefined} className={`text-[11px] font-sans-ui tracking-luxe uppercase transition-colors ${linkColor}`}>{l.label}</Link>
    ) : (
      <a key={l.label} href={l.href} onClick={close ? () => setOpen(false) : undefined} className={`text-[11px] font-sans-ui tracking-luxe uppercase transition-colors ${linkColor}`}>{l.label}</a>
    );

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${lightChrome ? "glass border-b border-palm/10" : "bg-transparent"}`}
    >
      <nav className="mx-auto max-w-[1440px] px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/" className={`font-display text-2xl font-bold leading-none transition-colors ${logoColor}`}>OURA</Link>

        <ul className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => <li key={l.label}>{renderItem(l)}</li>)}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#b2b" className="hidden sm:inline-flex items-center h-10 px-5 bg-gold text-ivory text-[11px] font-sans-ui tracking-luxe uppercase hover:brightness-110 transition">Partner With Us</a>
          <button onClick={() => setOpen((v) => !v)} className={`lg:hidden inline-flex items-center justify-center w-11 h-11 ${lightChrome ? "text-palm" : "text-ivory"}`} aria-label="Toggle menu">
            <span className="text-xl">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden glass border-t border-palm/10 px-6">
            {LINKS.map((l) => (
              <div key={l.label} className="py-3">{renderItem(l, true)}</div>
            ))}
            <a href="#b2b" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center h-11 px-6 bg-gold text-ivory text-[11px] font-sans-ui tracking-luxe uppercase">Partner With Us</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}