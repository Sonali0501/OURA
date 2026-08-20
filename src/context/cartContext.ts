import { createContext, useContext } from "react";
import type { Product } from "../data/products";

/**
 * Cart contract.
 *
 * Backed by the Shopify Cart API when the Storefront env vars are set; falls
 * back to local state + localStorage otherwise, so the site still works before
 * Shopify is connected. Consumers only see this interface either way.
 */

export type CartLine = {
  /** Shopify cart line id when connected, product id in local mode. */
  id: string;
  name: string;
  img: string;
  price: number;
  qty: number;
};

/**
 * The size being bought, resolved by the caller — price and GID come from
 * Shopify when it answered, from data/products.ts when it didn't. Omit it for
 * a product with a single size.
 */
export type CartSelection = {
  /** Local variant slug, e.g. '500ml'. Part of the line id in local mode. */
  variantId: string;
  /** Line label, e.g. 'Oura Culinary — 500 ml'. */
  title: string;
  img: string;
  price?: number;
  /** Shopify ProductVariant GID for this size. */
  shopifyVariantId?: string;
};

export type CartValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  currency: string;
  /** Shopify-hosted checkout URL. Null in local mode or an empty cart. */
  checkoutUrl: string | null;
  /** True while a Shopify mutation is in flight. */
  isSyncing: boolean;
  /** Last failure, for surfacing in the drawer. */
  error: string | null;
  addItem: (product: Product, qty?: number, selection?: CartSelection) => Promise<void>;
  updateQty: (lineId: string, qty: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clear: () => void;
  /** Send the buyer to Shopify checkout with the current cart. */
  checkout: () => void;
  /** One-off purchase — its own cart, straight to checkout, cart untouched. */
  buyNow: (product: Product, qty?: number, selection?: CartSelection) => Promise<void>;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

export const CartContext = createContext<CartValue | null>(null);

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a <CartProvider>");
  return ctx;
}
