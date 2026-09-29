import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "../../context/cartContext";
import { formatMoney } from "../../data/products";

export default function CartDrawer() {
  const {
    lines,
    itemCount,
    subtotal,
    currency,
    checkoutUrl,
    isSyncing,
    error,
    updateQty,
    removeItem,
    checkout,
    isOpen,
    closeCart,
  } = useCart();

  // Lock page scroll and allow Esc to close while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping cart">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-obsidian/45 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-ivory flex flex-col shadow-[0_0_60px_rgba(42,103,17,0.25)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-palm/10 shrink-0">
              <p className="text-[11px] font-sans-ui tracking-luxe uppercase text-gold">
                Your Cart {itemCount > 0 && `(${itemCount})`}
              </p>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="w-10 h-10 -mr-2 flex items-center justify-center text-gold/60 hover:text-gold transition"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Lines */}
            {lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
                <ShoppingBag className="w-8 h-8 text-gold/25" strokeWidth={1} />
                <p className="font-display text-2xl text-gold">Your cart is empty</p>
                <p className="text-sm text-gold/65 leading-relaxed">
                  Every OURA piece is cold-pressed in Kerala and made in small batches.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-2 h-12 px-7 border border-palm/30 text-gold text-[11px] font-sans-ui tracking-[0.18em] uppercase hover:bg-theme-gradient hover:text-ivory transition"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-palm/10">
                {lines.map((line) => (
                  <div key={line.id} className="flex gap-4 py-5 first:pt-0">
                    <div className="w-20 h-24 shrink-0 bg-parchment overflow-hidden">
                      <img src={line.img} alt={line.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-display text-lg font-semibold text-gold leading-snug">
                          {line.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(line.id)}
                          aria-label={`Remove ${line.name}`}
                          className="text-gold/40 hover:text-gold transition shrink-0"
                        >
                          <X className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center border border-palm/20">
                          <button
                            type="button"
                            onClick={() => updateQty(line.id, line.qty - 1)}
                            aria-label={`Decrease quantity of ${line.name}`}
                            className="w-9 h-9 flex items-center justify-center text-gold hover:bg-parchment transition"
                          >
                            <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                          <span className="w-9 text-center font-sans-ui text-sm text-gold">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(line.id, line.qty + 1)}
                            aria-label={`Increase quantity of ${line.name}`}
                            className="w-9 h-9 flex items-center justify-center text-gold hover:bg-parchment transition"
                          >
                            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                        </div>

                        <p className="font-display text-lg font-semibold text-gold">
                          {formatMoney(line.price * line.qty, currency)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {lines.length > 0 && (
              <div className="border-t border-palm/10 px-6 py-6 shrink-0">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] font-sans-ui tracking-luxe uppercase text-gold/55">
                    Subtotal
                  </span>
                  <span className="font-display text-3xl font-semibold text-gold">
                    {formatMoney(subtotal, currency)}
                  </span>
                </div>
                <p className="mt-2 text-[10px] font-sans-ui tracking-luxe uppercase text-gold/45">
                  Shipping and taxes calculated at checkout
                </p>

                {error && (
                  <p className="mt-4 text-sm text-destructive leading-relaxed" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={checkout}
                  disabled={!checkoutUrl || isSyncing}
                  className="mt-5 w-full h-14 inline-flex items-center justify-center gap-2 bg-[#FAF6EC] text-gold border-2 border-palm font-semibold text-[11px] font-sans-ui tracking-[0.18em] uppercase hover:bg-[#F2EBDA] transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#FAF6EC]"
                >
                  {isSyncing && <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />}
                  Proceed to checkout
                </button>

                {!checkoutUrl && !isSyncing && (
                  <p className="mt-3 text-[10px] font-sans-ui tracking-luxe uppercase text-gold/45 text-center">
                    Checkout unavailable — store not connected
                  </p>
                )}
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-3 w-full h-12 text-[10px] font-sans-ui tracking-luxe uppercase text-gold/60 hover:text-gold transition"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
