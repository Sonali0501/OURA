import { useEffect, useMemo, useState } from "react";
import type { Product } from "../data/products";
import { isShopifyConfigured } from "../lib/shopify";
import { fetchProduct, type ShopifyProduct, type ShopifyVariant } from "../lib/shopifyProduct";

/**
 * The sizes of a product, as Shopify defines them.
 *
 * Shopify is the source of truth for the whole variant: its name, its price
 * and its images. Nothing about a size is authored in data/products.ts - add
 * a variant in the admin and it appears here. The local product only supplies
 * the fallback shown when Shopify is unreachable or not yet connected.
 */

export type DisplayVariant = {
  /** URL-safe slug of the option value, e.g. '1-litre'. Used in `?size=`. */
  id: string;
  /** What the buyer sees on the selector, e.g. '1 Litre'. */
  label: string;
  price?: number;
  compareAt: number | null;
  currency: string;
  availableForSale: boolean;
  /** Gallery for this size - its own image first, then the product's others. */
  images: string[];
  /** ProductVariant GID, absent only on the local fallback. */
  shopifyVariantId?: string;
};

export type VariantsState = {
  variants: DisplayVariant[];
  /** True while Shopify is answering - the sizes aren't known yet. */
  loading: boolean;
  /** True when these came from data/products.ts because Shopify didn't answer. */
  isFallback: boolean;
  /** Shopify's option name, e.g. 'Size'. Labels the selector. */
  optionName: string;
  /** False for a product with a single, unnamed variant - nothing to choose. */
  hasChoice: boolean;
};

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Shopify's placeholder title on a product with no options. */
const isUnnamed = (v: ShopifyVariant) =>
  !v.title || v.title.toLowerCase() === "default title";

const localImages = (product: Product) =>
  product.gallery.length ? product.gallery : [product.img];

/** One synthetic size, so the page renders before/without Shopify. */
const fallbackVariants = (product: Product): DisplayVariant[] => [
  {
    id: "default",
    label: product.name,
    price: product.price,
    compareAt: product.compareAt ?? null,
    currency: "INR",
    availableForSale: product.available,
    images: localImages(product),
    shopifyVariantId: product.shopifyVariantId,
  },
];

/**
 * Shopify links exactly one image to a variant, so the gallery leads with that
 * image and follows it with the rest of the product's images. A product with
 * no images at all keeps the local gallery.
 */
function galleryFor(variant: ShopifyVariant, product: ShopifyProduct, local: Product): string[] {
  const rest = product.images.filter((url) => url !== variant.img);
  const images = variant.img ? [variant.img, ...rest] : product.images;
  return images.length ? images : localImages(local);
}

function toDisplay(product: ShopifyProduct, local: Product): DisplayVariant[] {
  return product.variants.map((v, i) => {
    const optionValue = Object.values(v.options)[0];
    const label = isUnnamed(v) ? local.name : optionValue ?? v.title;
    return {
      // Numeric suffix only if two sizes somehow slugify the same.
      id: slugify(label) || `variant-${i + 1}`,
      label,
      price: v.price,
      compareAt: v.compareAt,
      currency: v.currency,
      availableForSale: v.availableForSale,
      images: galleryFor(v, product, local),
      shopifyVariantId: v.id,
    };
  });
}

/**
 * Live variants for a product.
 *
 * Fetches once per product id. Falls back to a single variant built from
 * data/products.ts if Shopify isn't configured, the product isn't mapped, or
 * the request fails - so the page always renders, and never shows a price we
 * know to be wrong while loading.
 */
export function useProductVariants(product: Product): VariantsState {
  const productId = isShopifyConfigured ? product.shopify_product_id : undefined;

  // Kept together with the id it belongs to: if the id changes, whatever we
  // hold describes another product, which is the same as holding nothing.
  const [fetched, setFetched] = useState<{
    productId?: string;
    product: ShopifyProduct | null;
  }>({ product: null });

  const isStale = fetched.productId !== productId;
  const remote = isStale ? null : fetched.product;
  const loading = Boolean(productId) && isStale;

  useEffect(() => {
    if (!productId) return;

    let cancelled = false;

    fetchProduct(productId)
      // A null result means the product is missing or unpublished.
      .then((data) => {
        if (!cancelled) setFetched({ productId, product: data });
      })
      .catch(() => {
        if (!cancelled) setFetched({ productId, product: null });
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  return useMemo(() => {
    if (!remote?.variants.length) {
      return {
        variants: fallbackVariants(product),
        loading,
        isFallback: true,
        optionName: "Size",
        hasChoice: false,
      };
    }

    const variants = toDisplay(remote, product);
    return {
      variants,
      loading: false,
      isFallback: false,
      optionName: remote.optionNames[0] ?? "Size",
      // A lone "Default Title" variant is a product without options.
      hasChoice: variants.length > 1,
    };
  }, [remote, product, loading]);
}
