import { storefront, toAmount } from "./shopify";

/**
 * Live product pricing from the Storefront API.
 *
 * Shopify is the authority on price and stock — it is what the cart and
 * checkout charge. The numbers in data/products.ts are only a fallback for
 * when Shopify is unreachable or not yet connected, so the page is never
 * priceless.
 */

export type ShopifyVariant = {
  /** ProductVariant GID — what the Cart API wants as `merchandiseId`. */
  id: string;
  /** Variant title, e.g. '1 Litre' ("Default Title" on single-variant products). */
  title: string;
  /** Option values keyed by lowercased option name, e.g. { size: '1 Litre' }. */
  options: Record<string, string>;
  price: number;
  /** "Compare at" price, when the variant is discounted. */
  compareAt: number | null;
  currency: string;
  availableForSale: boolean;
  /** Variant image, when one is assigned in Shopify. */
  img: string | null;
};

export type ShopifyProduct = {
  id: string;
  availableForSale: boolean;
  /** Option names as Shopify orders them, e.g. ['Size']. */
  optionNames: string[];
  /** Every product image, in the order set in the admin. */
  images: string[];
  variants: ShopifyVariant[];
};

type RawVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string } | null;
  image: { url: string } | null;
};

type RawProduct = {
  id: string;
  availableForSale: boolean;
  options: { name: string }[];
  images: { nodes: { url: string }[] };
  variants: { nodes: RawVariant[] };
};

function normalizeVariant(v: RawVariant): ShopifyVariant {
  const price = toAmount(v.price.amount);
  const compareAt = v.compareAtPrice ? toAmount(v.compareAtPrice.amount) : null;

  return {
    id: v.id,
    title: v.title,
    options: Object.fromEntries(
      v.selectedOptions.map((o) => [o.name.trim().toLowerCase(), o.value])
    ),
    price,
    // Shopify leaves compareAtPrice set after a sale ends; ignore it unless
    // it is genuinely higher than the current price.
    compareAt: compareAt && compareAt > price ? compareAt : null,
    currency: v.price.currencyCode,
    availableForSale: v.availableForSale,
    img: v.image?.url ?? null,
  };
}

/**
 * Every variant of a product, in the order Shopify lists them.
 * Returns null when the product isn't found or isn't published to this channel.
 */
export async function fetchProduct(productId: string): Promise<ShopifyProduct | null> {
  const data = await storefront<{ product: RawProduct | null }>(
    /* GraphQL */ `
      query ProductVariants($id: ID!) {
        product(id: $id) {
          id
          availableForSale
          options {
            name
          }
          images(first: 30) {
            nodes {
              url
            }
          }
          variants(first: 50) {
            nodes {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
              }
              image {
                url
              }
            }
          }
        }
      }
    `,
    { id: productId }
  );

  if (!data.product) return null;

  return {
    id: data.product.id,
    availableForSale: data.product.availableForSale,
    optionNames: data.product.options.map((o) => o.name),
    images: data.product.images.nodes.map((i) => i.url),
    variants: data.product.variants.nodes.map(normalizeVariant),
  };
}
