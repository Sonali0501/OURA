/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** myshop.myshopify.com — the .myshopify.com domain, not a custom domain */
  readonly VITE_SHOPIFY_STORE_DOMAIN?: string;
  /** Public Storefront API access token. Safe in the client bundle. */
  readonly VITE_SHOPIFY_STOREFRONT_TOKEN?: string;
  /** Storefront API version, e.g. 2025-01. Optional. */
  readonly VITE_SHOPIFY_API_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
