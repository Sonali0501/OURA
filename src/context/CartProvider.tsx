import { useCallback, useEffect, useMemo, useState } from "react";
import { CartContext, type CartLine, type CartSelection } from "./cartContext";
import type { Product } from "../data/products";
import { isShopifyConfigured } from "../lib/shopify";
import {
  addCartLines,
  createCart,
  fetchCart,
  removeCartLine,
  updateCartLine,
  type ShopifyCart,
} from "../lib/shopifyCart";

const LINES_KEY = "oura_cart_v1";
const CART_ID_KEY = "oura_shopify_cart_id";

/* ------------------------------------------------------------------ */
/* localStorage helpers                                                */
/* ------------------------------------------------------------------ */

const readStoredLines = (): CartLine[] => {
  try {
    const raw = window.localStorage.getItem(LINES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Drop anything that doesn't look like a line - the shape may have moved on.
    return parsed.filter(
      (l): l is CartLine =>
        !!l &&
        typeof l === "object" &&
        typeof (l as CartLine).id === "string" &&
        typeof (l as CartLine).price === "number" &&
        typeof (l as CartLine).qty === "number"
    );
  } catch {
    return [];
  }
};

const readStoredCartId = (): string | null => {
  try {
    return window.localStorage.getItem(CART_ID_KEY);
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: string | null) => {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // Private mode / quota - the cart just won't survive a reload.
  }
};

const errorMessage = (e: unknown) =>
  e instanceof Error ? e.message : "Something went wrong. Please try again.";

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() =>
    isShopifyConfigured ? [] : readStoredLines()
  );
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [currency, setCurrency] = useState("INR");
  const [shopifySubtotal, setShopifySubtotal] = useState<number | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  /** Shopify is the source of truth once connected - mirror its response. */
  const applyCart = useCallback((cart: ShopifyCart) => {
    setCartId(cart.id);
    setCheckoutUrl(cart.checkoutUrl);
    setCurrency(cart.currency);
    setShopifySubtotal(cart.subtotal);
    setLines(
      cart.lines.map((l) => ({
        id: l.id,
        name: l.name,
        img: l.img,
        price: l.price,
        qty: l.qty,
      }))
    );
    writeStorage(CART_ID_KEY, cart.id);
  }, []);

  const dropCart = useCallback(() => {
    setCartId(null);
    setCheckoutUrl(null);
    setShopifySubtotal(null);
    setLines([]);
    writeStorage(CART_ID_KEY, null);
  }, []);

  // Rehydrate an existing Shopify cart on mount. A completed or expired cart
  // comes back null, in which case we start clean.
  useEffect(() => {
    if (!isShopifyConfigured) return;
    const stored = readStoredCartId();
    if (!stored) return;

    let cancelled = false;
    (async () => {
      try {
        const cart = await fetchCart(stored);
        if (cancelled) return;
        if (cart) applyCart(cart);
        else dropCart();
      } catch {
        if (!cancelled) dropCart();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [applyCart, dropCart]);

  // Local mode only - Shopify carts are keyed by id, not mirrored wholesale.
  useEffect(() => {
    if (isShopifyConfigured) return;
    writeStorage(LINES_KEY, JSON.stringify(lines));
  }, [lines]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  /** Wraps a Shopify call with the syncing flag and error capture. */
  const run = useCallback(async (fn: () => Promise<void>) => {
    setIsSyncing(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const addItem = useCallback(
    async (product: Product, qty = 1, selection?: CartSelection) => {
      const price = selection?.price ?? product.price;
      if (price === undefined) return;

      const merchandiseId = selection?.shopifyVariantId ?? product.shopifyVariantId;

      // Local fallback: no Shopify, or this size isn't mapped to a variant.
      if (!isShopifyConfigured || !merchandiseId) {
        // One line per size, so 1 L and 500 ml never collapse into each other.
        const lineId = selection ? `${product.id}:${selection.variantId}` : product.id;
        setLines((prev) => {
          const existing = prev.find((l) => l.id === lineId);
          if (existing) {
            return prev.map((l) => (l.id === lineId ? { ...l, qty: l.qty + qty } : l));
          }
          return [
            ...prev,
            {
              id: lineId,
              name: selection?.title ?? product.name,
              img: selection?.img ?? product.img,
              price,
              qty,
            },
          ];
        });
        return;
      }

      const variantId = merchandiseId;
      await run(async () => {
        const line = { variantId, qty };
        // Adding to a stale cart id fails; fall back to a fresh cart.
        if (cartId) {
          try {
            applyCart(await addCartLines(cartId, [line]));
            return;
          } catch {
            dropCart();
          }
        }
        applyCart(await createCart([line]));
      });
    },
    [cartId, applyCart, dropCart, run]
  );

  const updateQty = useCallback(
    async (lineId: string, qty: number) => {
      if (!isShopifyConfigured || !cartId) {
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.id !== lineId)
            : prev.map((l) => (l.id === lineId ? { ...l, qty } : l))
        );
        return;
      }

      await run(async () => {
        const cart =
          qty <= 0
            ? await removeCartLine(cartId, lineId)
            : await updateCartLine(cartId, lineId, qty);
        applyCart(cart);
      });
    },
    [cartId, applyCart, run]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!isShopifyConfigured || !cartId) {
        setLines((prev) => prev.filter((l) => l.id !== lineId));
        return;
      }
      await run(async () => applyCart(await removeCartLine(cartId, lineId)));
    },
    [cartId, applyCart, run]
  );

  /**
   * Clears our reference to the cart. Shopify carts are immutable records -
   * abandoning ours is the intended way to start over.
   */
  const clear = useCallback(() => {
    if (isShopifyConfigured) dropCart();
    else setLines([]);
  }, [dropCart]);

  const checkout = useCallback(() => {
    if (!checkoutUrl) return;
    window.location.href = checkoutUrl;
  }, [checkoutUrl]);

  /** A separate cart so Buy Now doesn't disturb what's already in the drawer. */
  const buyNow = useCallback(
    async (product: Product, qty = 1, selection?: CartSelection) => {
      const variantId = selection?.shopifyVariantId ?? product.shopifyVariantId;
      if (!isShopifyConfigured || !variantId) {
        setError("Checkout isn't connected yet.");
        return;
      }
      await run(async () => {
        const cart = await createCart([{ variantId, qty }]);
        window.location.href = cart.checkoutUrl;
      });
    },
    [run]
  );

  const value = useMemo(() => {
    const itemCount = lines.reduce((n, l) => n + l.qty, 0);
    // Prefer Shopify's subtotal - it accounts for discounts we don't model.
    const subtotal = shopifySubtotal ?? lines.reduce((n, l) => n + l.price * l.qty, 0);
    return {
      lines,
      itemCount,
      subtotal,
      currency,
      checkoutUrl,
      isSyncing,
      error,
      addItem,
      updateQty,
      removeItem,
      clear,
      checkout,
      buyNow,
      isOpen,
      openCart,
      closeCart,
    };
  }, [
    lines,
    shopifySubtotal,
    currency,
    checkoutUrl,
    isSyncing,
    error,
    addItem,
    updateQty,
    removeItem,
    clear,
    checkout,
    buyNow,
    isOpen,
    openCart,
    closeCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
