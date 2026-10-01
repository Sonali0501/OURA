import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, X } from "lucide-react";

const CODE = "OURA10";
const OPEN_DELAY_MS = 1200;
/** Per browser session: shown on the first load, not on refreshes or later pages. */
const SEEN_KEY = "oura_welcome_offer_seen";

const seenThisSession = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* Blocked storage — the offer may simply show again. */
  }
};

export default function WelcomeOffer() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Greets the first load of a visit; a short pause lets the hero appear first.
  useEffect(() => {
    if (seenThisSession()) return;
    const timer = window.setTimeout(() => {
      setOpen(true);
      markSeen();
    }, OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close, then bring the first product card into view. Navigates within the
  // app (no reload) and waits for the scroll lock to lift — and, from another
  // page, for the home page to render.
  const continueShopping = () => {
    setOpen(false);
    const onHome = pathname === "/";
    if (!onHome) navigate("/");
    window.setTimeout(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, onHome ? 50 : 300);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable — the code stays on screen to copy by hand. */
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-5"
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-offer-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden bg-ivory shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close offer"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full text-ivory/90 hover:bg-ivory/15 flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-theme-gradient text-ivory text-center px-8 pt-10 pb-8">
              <p className="text-[11px] font-sans-ui font-semibold tracking-[0.3em] uppercase text-ivory/85">
                Welcome to OURA
              </p>
              <h2
                id="welcome-offer-title"
                className="mt-3 font-display font-bold leading-none"
                style={{ fontSize: "clamp(3rem, 12vw, 4.5rem)" }}
              >
                10% OFF
              </h2>
              <p className="mt-3 text-base text-ivory/90">on your first order above ₹500</p>
            </div>

            <div className="px-8 pt-7 pb-8 text-center">
              <p className="text-[11px] font-sans-ui font-semibold tracking-[0.2em] uppercase text-gold/70">
                Use code at checkout
              </p>

              <div className="mt-3 flex items-stretch border-2 border-dashed border-palm/50">
                <span className="flex-1 flex items-center justify-center py-3 font-display text-3xl font-bold tracking-[0.12em] text-gold select-all">
                  {CODE}
                </span>
                <button
                  type="button"
                  onClick={copyCode}
                  aria-label={copied ? "Code copied" : "Copy code"}
                  className="inline-flex items-center gap-2 px-4 border-l-2 border-dashed border-palm/50 text-[11px] font-sans-ui font-semibold tracking-[0.18em] uppercase text-gold hover:bg-parchment transition"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <button
                type="button"
                onClick={continueShopping}
                className="mt-6 w-full inline-flex items-center justify-center gap-3 h-12 px-7 bg-palm text-ivory font-semibold text-[11px] font-sans-ui tracking-[0.18em] uppercase hover:bg-gold transition-colors"
              >
                Continue shopping <span aria-hidden="true">→</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
