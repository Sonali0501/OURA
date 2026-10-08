import { assertNoUserErrors, storefront, toAmount } from "./shopify";

/**
 * Shopify Cart API operations.
 *
 * The Cart API replaced the deprecated Checkout API - a cart carries its own
 * `checkoutUrl`, which is where we send the buyer to pay. We never build a
 * checkout ourselves; Shopify hosts it.
 */

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  currency: string;
  lines: ShopifyCartLine[];
};

export type ShopifyCartLine = {
  /** Cart line id - the handle for update/remove, not the variant id. */
  id: string;
  variantId: string;
  productId: string;
  name: string;
  img: string;
  price: number;
  qty: number;
};

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            image {
              url
              altText
            }
            price {
              amount
            }
            product {
              id
              title
              handle
              featuredImage {
                url
              }
            }
          }
        }
      }
    }
  }
`;

/* ---------- raw response shapes ---------- */

type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        image?: { url: string; altText?: string } | null;
        price: { amount: string };
        product: {
          id: string;
          title: string;
          handle: string;
          featuredImage?: { url: string } | null;
        };
      };
    }[];
  };
};

type UserErrors = { userErrors?: { message: string }[] };

function normalize(cart: RawCart): ShopifyCart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: toAmount(cart.cost.subtotalAmount.amount),
    currency: cart.cost.subtotalAmount.currencyCode,
    lines: cart.lines.nodes.map((node) => {
      const v = node.merchandise;
      return {
        id: node.id,
        variantId: v.id,
        productId: v.product.id,
        // Variant title is "Default Title" for single-variant products
        name:
          v.title && v.title !== "Default Title"
            ? `${v.product.title} - ${v.title}`
            : v.product.title,
        img: v.image?.url ?? v.product.featuredImage?.url ?? "",
        price: toAmount(v.price.amount),
        qty: node.quantity,
      };
    }),
  };
}

/* ---------- operations ---------- */

export async function createCart(
  lines: { variantId: string; qty: number }[] = []
): Promise<ShopifyCart> {
  const data = await storefront<{ cartCreate: { cart: RawCart } & UserErrors }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation CartCreate($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart {
            ...CartFields
          }
          userErrors {
            message
          }
        }
      }
    `,
    { lines: lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.qty })) }
  );

  assertNoUserErrors(data.cartCreate.userErrors);
  return normalize(data.cartCreate.cart);
}

/** Returns null when the cart has expired or was already checked out. */
export async function fetchCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await storefront<{ cart: RawCart | null }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      query Cart($id: ID!) {
        cart(id: $id) {
          ...CartFields
        }
      }
    `,
    { id: cartId }
  );

  return data.cart ? normalize(data.cart) : null;
}

export async function addCartLines(
  cartId: string,
  lines: { variantId: string; qty: number }[]
): Promise<ShopifyCart> {
  const data = await storefront<{ cartLinesAdd: { cart: RawCart } & UserErrors }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
          userErrors {
            message
          }
        }
      }
    `,
    {
      cartId,
      lines: lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.qty })),
    }
  );

  assertNoUserErrors(data.cartLinesAdd.userErrors);
  return normalize(data.cartLinesAdd.cart);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  qty: number
): Promise<ShopifyCart> {
  const data = await storefront<{ cartLinesUpdate: { cart: RawCart } & UserErrors }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
          userErrors {
            message
          }
        }
      }
    `,
    { cartId, lines: [{ id: lineId, quantity: qty }] }
  );

  assertNoUserErrors(data.cartLinesUpdate.userErrors);
  return normalize(data.cartLinesUpdate.cart);
}

export async function removeCartLine(cartId: string, lineId: string): Promise<ShopifyCart> {
  const data = await storefront<{ cartLinesRemove: { cart: RawCart } & UserErrors }>(
    /* GraphQL */ `
      ${CART_FRAGMENT}
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...CartFields
          }
          userErrors {
            message
          }
        }
      }
    `,
    { cartId, lineIds: [lineId] }
  );

  assertNoUserErrors(data.cartLinesRemove.userErrors);
  return normalize(data.cartLinesRemove.cart);
}
