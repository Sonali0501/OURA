import { storefront, toAmount } from "./shopify";

/**
 * Live product pricing from the Storefront API.
 *
 * Shopify is the authority on price — it is what the cart and checkout charge.
 * The `price` in data/products.ts is only a fallback for when Shopify is
 * unreachable or not yet connected, so the page is never priceless.
 */

export type ShopifyPricing = {
  price: number;
  /** "Compare at" price, when the variant is discounted. */
  compareAt: number | null;
  currency: string;
  availableForSale: boolean;
  /** First variant's GID — handy for carting without a second lookup. */
  variantId: string;
};

type RawProduct = {
  id: string;
  availableForSale: boolean;
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      price: { amount: string; currencyCode: string };
      compareAtPrice: { amount: string } | null;
    }[];
  };
};

/** Returns null when the product isn't found or has no variants. */
export async function fetchProductPricing(productId: string): Promise<ShopifyPricing | null> {
  const data = await storefront<{ product: RawProduct | null }>(
    /* GraphQL */ `
      query ProductPricing($id: ID!) {
        product(id: $id) {
          id
          availableForSale
          variants(first: 1) {
            nodes {
              id
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
              }
            }
          }
        }
      }
    `,
    { id: productId }
  );

  const variant = data.product?.variants.nodes[0];
  if (!variant) return null;

  const compareAt = variant.compareAtPrice ? toAmount(variant.compareAtPrice.amount) : null;
  const price = toAmount(variant.price.amount);

  return {
    price,
    // Shopify leaves compareAtPrice set after a sale ends; ignore it unless
    // it is genuinely higher than the current price.
    compareAt: compareAt && compareAt > price ? compareAt : null,
    currency: variant.price.currencyCode,
    availableForSale: variant.availableForSale,
    variantId: variant.id,
  };
}
