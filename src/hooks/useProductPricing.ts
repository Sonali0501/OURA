import { useEffect, useState } from "react";
import type { Product } from "../data/products";
import { isShopifyConfigured } from "../lib/shopify";
import { fetchProductPricing } from "../lib/shopifyProduct";

export type PricingState = {
  price?: number;
  compareAt: number | null;
  currency: string;
  availableForSale: boolean;
  /** True while the live price is in flight — render a placeholder, not a stale number. */
  loading: boolean;
  /** True when showing the local fallback because Shopify didn't answer. */
  isFallback: boolean;
};

const fallbackOf = (product: Product): PricingState => ({
  price: product.price,
  compareAt: product.compareAt ?? null,
  currency: "INR",
  availableForSale: product.available,
  loading: false,
  isFallback: true,
});

/**
 * Live price for a product, from Shopify when available.
 *
 * Falls back to the price in data/products.ts if Shopify isn't configured, the
 * product isn't mapped, or the request fails — so the page always shows
 * something, and never a price we know to be wrong while loading.
 *
 * Fetches once on mount. Callers render this per product page and should key
 * the component by product id so a different product starts clean.
 */
export function useProductPricing(product: Product): PricingState {
  const productId = isShopifyConfigured ? product.shopify_product_id : undefined;

  const [state, setState] = useState<PricingState>(() =>
    productId ? { ...fallbackOf(product), loading: true } : fallbackOf(product)
  );

  useEffect(() => {
    if (!productId) return;

    let cancelled = false;

    fetchProductPricing(productId)
      .then((pricing) => {
        if (cancelled) return;
        // A null result means the product is missing or unpublished.
        setState(
          pricing
            ? {
                price: pricing.price,
                compareAt: pricing.compareAt,
                currency: pricing.currency,
                availableForSale: pricing.availableForSale,
                loading: false,
                isFallback: false,
              }
            : fallbackOf(product)
        );
      })
      .catch(() => {
        if (!cancelled) setState(fallbackOf(product));
      });

    return () => {
      cancelled = true;
    };
    // `product` is only read inside the callbacks to build the fallback,
    // and the caller remounts on product change — see the note above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return state;
}
