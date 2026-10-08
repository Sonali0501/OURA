/**
 * Minimal Shopify Storefront API client.
 *
 * The Storefront token is a public credential - it is meant to ship in the
 * browser bundle and is scoped to unauthenticated read/checkout operations.
 * The Admin API token is a different thing entirely and must never appear here.
 */

const DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || "2025-01";

/**
 * False until both env vars are set. The cart falls back to local-only state
 * when this is false, so the site still works before Shopify is connected.
 */
export const isShopifyConfigured = Boolean(DOMAIN && TOKEN);

const endpoint = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export class ShopifyError extends Error {}

export async function storefront<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!isShopifyConfigured) {
    throw new ShopifyError(
      "Shopify is not configured - set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN."
    );
  }

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN as string,
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch {
    throw new ShopifyError("Could not reach Shopify. Check your connection and try again.");
  }

  if (!res.ok) {
    throw new ShopifyError(`Shopify returned ${res.status}. Check your store domain and token.`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;

  // Transport-level GraphQL errors (bad query, bad scopes, throttling)
  if (json.errors?.length) {
    throw new ShopifyError(json.errors[0].message);
  }
  if (!json.data) {
    throw new ShopifyError("Shopify returned an empty response.");
  }

  return json.data;
}

/**
 * Shopify returns user-facing validation failures in a `userErrors` array
 * rather than as GraphQL errors - sold out, invalid variant, and so on.
 */
export function assertNoUserErrors(errors?: { message: string }[]) {
  if (errors?.length) throw new ShopifyError(errors[0].message);
}

/** Money comes back as a decimal string; the UI wants a number. */
export const toAmount = (value: string) => Number.parseFloat(value) || 0;
