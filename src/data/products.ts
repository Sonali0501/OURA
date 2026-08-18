import { Droplet, Sparkles, Utensils, type LucideIcon } from 'lucide-react';

/**
 * Single source of truth for the product suite.
 * The Spectrum cards on the home page and the /products/:id detail page
 * both read from here, so a product only ever needs to be authored once.
 */

export type Product = {
  /* ---- shared with the Spectrum card ---- */
  id: string;
  name: string;
  tag: string;
  icon: LucideIcon;
  pct: string;
  purity: string;
  desc: string;
  specs: { label: string; value: string }[];
  img: string;
  accent: string;
  available: boolean;
  /** Matched against each review's `product_tag` in `data/reviews.ts`. */
  product_tags: string[];

  /* ---- detail page ---- */
  tagline: string;
  gallery: string[];
  /**
   * Fallback price, shown only when Shopify is unreachable or unmapped.
   * Shopify is the source of truth — see hooks/useProductPricing.
   */
  price?: number;
  compareAt?: number;
  /**
   * Shopify Product GID, e.g. 'gid://shopify/Product/8710327795885'.
   * Used to fetch live pricing and availability on the detail page.
   */
  shopify_product_id?: string;
  /**
   * Shopify ProductVariant GID, e.g. 'gid://shopify/ProductVariant/44123456789'.
   * Required for Add to Cart / Buy Now to reach Shopify. Without it the cart
   * falls back to local-only state.
   */
  shopifyVariantId?: string;
  highlights: string[];
  story: string[];
  boxContents: { label: string; value: string }[];
  details: { title: string; body: string }[];
  care: string[];
  /** Shown when the product is not on sale yet (coming soon). */
  launchNote?: string;
};

/**
 * Image paths must be root-absolute (leading slash). A bare filename resolves
 * against the current URL, so it would 404 on nested routes like
 * /products/culinary (→ /products/culinary_square.png).
 */
const CULINARY_IMG = '/culinary_landscape.png';
const SHELLS_IMG = '/shells_p_landscape.png';
const VITA_IMG = '/oura_vita_landscape.jpg';
const CARE_IMG = '/oura_care_landscape.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'culinary',
    name: 'Oura Culinary',
    tag: 'Oil',
    icon: Sparkles,
    pct: '92%',
    purity: '100% Purity',
    desc: 'Pure coconut oil, cold-pressed to hold every nutrient, scent and ritual of the source — for cooking that honors the harvest.',
    specs: [
      { label: 'Process', value: 'Cold pressed' },
      { label: 'Additives', value: 'Zero' },
      { label: 'Uses', value: 'Care & Kitchen' },
    ],
    img: CULINARY_IMG,
    accent: '#D4A373',
    available: true,
    product_tags: ['culinary', 'oil'],

    tagline: 'Cold-pressed virgin coconut oil — kitchen grade, heritage born.',
    gallery: [CULINARY_IMG, CULINARY_IMG, CULINARY_IMG, CULINARY_IMG],
    price: 649,
    compareAt: 749,
    shopify_product_id: 'gid://shopify/Product/8710327795885',
    shopifyVariantId: 'gid://shopify/ProductVariant/47250512740525',
    highlights: [
      'Cold-pressed below 45°C — nutrients, aroma and enzymes stay intact',
      'Zero additives, zero bleaching, zero deodorising',
      'Sourced direct from Kerala agrarian families, no middlemen',
      'Edible grade — equally at home in the kitchen and on skin',
    ],
    story: [
      'Oura Culinary begins where every honest oil should — at the tree. Mature coconuts are hand-picked from Kerala smallholdings, sun-dried in open air, and pressed the same week so nothing has time to go stale.',
      'We press cold, never above 45°C. Heat is what strips an oil of its lauric acid, its aroma, and the faint sweetness that tells you it came from a real coconut. Skipping the heat costs us yield. It is the whole point.',
      'What reaches your kitchen is unrefined and unapologetic: cloudy when cool, clear when warm, and unmistakably Kerala on the first spoon.',
    ],
    boxContents: [
      { label: 'Contents', value: 'Cold-pressed virgin coconut oil' },
      { label: 'Net volume', value: '1 litre' },
      { label: 'Packaging', value: 'Amber glass bottle, tamper seal' },
      { label: 'Shelf life', value: '18 months from press date' },
      { label: 'Origin', value: 'Aluva, Kerala, India' },
    ],
    details: [
      {
        title: 'Description',
        body: 'A single-ingredient virgin coconut oil, cold-pressed from fresh Kerala copra and filtered only through cloth. Nothing is added and nothing is taken away — no refining, no bleaching, no deodorising. Expect a soft coconut aroma, a clean finish, and a texture that turns solid below 24°C, which is exactly how pure oil should behave.',
      },
      {
        title: 'How to use',
        body: 'Cook with it at everyday stove temperatures, finish a thoran or curry with a spoonful, stir it into coffee, or warm a little between your palms for hair and skin. It has a smoke point around 175°C, so it is suited to sautéing and shallow frying rather than aggressive deep frying.',
      },
      {
        title: 'Ingredients',
        body: '100% cold-pressed virgin coconut oil (Cocos nucifera). That is the entire list. No preservatives, no fragrance, no carrier oils.',
      },
      {
        title: 'Shipping',
        body: 'Dispatched from Kochi within 2 business days. Delivery typically 3–6 business days across India. If a bottle arrives damaged, send us a photo and we will replace it, no questions asked.',
      },
    ],
    care: [
      'Store in a cool, dark place away from direct sunlight',
      'Solidifying below 24°C is natural — warm the bottle to liquefy',
      'Use a dry spoon; moisture shortens the life of any unrefined oil',
    ],
  },
  {
    id: 'water',
    name: 'Oura Vita',
    tag: 'Hydration',
    icon: Droplet,
    pct: '100%',
    purity: '100% Purity',
    desc: 'Cold-pressed at source from tender Kerala coconuts. Untouched, unfiltered, nutritionally complete.',
    specs: [
      { label: 'pH Level', value: '5.5–6.5' },
      { label: 'Temperature', value: '< 45°C' },
      { label: 'Origin', value: 'Kerala, India' },
    ],
    img: VITA_IMG,
    accent: '#4A5D23',
    available: false,
    product_tags: ['water'],

    tagline: 'Tender coconut water, drawn and sealed at the source.',
    gallery: [VITA_IMG, '/oura_vita.jpg', '/soli_to_sip_1.png'],
    highlights: [
      'Drawn from tender coconuts and sealed within hours of harvest',
      'No sugar, no concentrate, no reconstitution',
      'Naturally complete electrolyte profile',
    ],
    story: [
      'Oura Vita is the simplest product we make and the hardest to get right. Tender coconut water begins to change the moment it meets air, so everything depends on how little time passes between the tree and the seal.',
      'Our answer is to process at source rather than ship nuts to a distant plant — the water is drawn, chilled and sealed in Kerala, close to the grove it came from.',
    ],
    boxContents: [
      { label: 'Contents', value: 'Tender coconut water' },
      { label: 'Packaging', value: 'Under development' },
      { label: 'Origin', value: 'Kerala, India' },
    ],
    details: [
      {
        title: 'Description',
        body: 'A single-ingredient tender coconut water with nothing added and nothing concentrated — the pH sits naturally between 5.5 and 6.5 and the electrolyte profile is the one the coconut wrote, not one we blended back in.',
      },
      {
        title: 'Availability',
        body: 'Oura Vita is in pilot production. Formulation and packaging are locked; we are validating cold-chain logistics before opening retail orders. Write to us to be told first when it ships.',
      },
    ],
    care: ['Refrigerate on arrival', 'Best consumed within 48 hours of opening'],
    launchNote:
      'Oura Vita is in pilot production. Retail pricing and pack sizes will be announced at launch.',
  },
  {
    id: 'care',
    name: 'Oura Care',
    tag: 'Oil',
    icon: Sparkles,
    pct: '92%',
    purity: '100% Purity',
    desc: 'Two expressions of one promise — Care for hair and skin',
    specs: [
      { label: 'Press Temp', value: '< 45°C' },
      { label: 'Format', value: 'Care + Culinary' },
      { label: 'Grade', value: '100% Edible' },
    ],
    img: CARE_IMG,
    accent: '#D4A373',
    available: false,
    product_tags: ['care', 'oil'],

    tagline: 'The same pure press, formulated for hair and skin.',
    gallery: [CARE_IMG, '/oura_care.jpg', '/soli_to_sip_3.png'],
    highlights: [
      'Same cold-pressed base as Oura Culinary — edible grade throughout',
      'Formulated for scalp, hair length and body',
      'No mineral oil, no silicones, no synthetic fragrance',
    ],
    story: [
      'Oura Care exists because the oil we press is already good enough to eat — and anything you would happily eat is a reasonable thing to put on your skin.',
      'The line keeps that base untouched and builds around it: lighter cuts for daily hair use, richer ones for body and scalp ritual.',
    ],
    boxContents: [
      { label: 'Contents', value: 'Cold-pressed coconut oil, care format' },
      { label: 'Packaging', value: 'Under development' },
      { label: 'Origin', value: 'Aluva, Kerala, India' },
    ],
    details: [
      {
        title: 'Description',
        body: 'A hair and skin expression of the OURA press — cold-pressed below 45°C, unrefined, and edible grade. Nothing in the bottle exists to change how it feels on the shelf.',
      },
      {
        title: 'Availability',
        body: 'Oura Care is in final formulation. Reach out to be notified when the line opens.',
      },
    ],
    care: ['Store away from direct sunlight', 'Warm between palms before applying'],
    launchNote: 'Oura Care is in final formulation. Pack sizes and pricing follow at launch.',
  },
  {
    id: 'shells',
    name: 'Oura Shells',
    tag: 'Lifestyle',
    icon: Utensils,
    pct: 'Zero',
    purity: 'Zero-Waste',
    desc: 'Zero-waste lifestyle accessories crafted from repurposed coconut shells — beautiful, durable, planet-friendly.',
    specs: [
      { label: 'Material', value: 'Repurposed Shell' },
      { label: 'Waste', value: '0% Discarded' },
      { label: 'Durability', value: 'Lifetime' },
    ],
    img: SHELLS_IMG,
    accent: '#4A5D23',
    available: false,
    product_tags: ['shells'],

    tagline: 'What the press leaves behind, the artisan finishes by hand.',
    gallery: [SHELLS_IMG, '/shells_p.png'],
    highlights: [
      'Made from shells left over by our own oil press — nothing bought, nothing wasted',
      'Hand-finished by Kerala artisans, polished with coconut oil',
      'Fully biodegradable at end of life',
    ],
    story: [
      'Pressing oil leaves shells. Most of the industry burns them. We hand them to artisans instead.',
      'Every bowl, spoon and dish in this line starts as a by-product of the Culinary press, which is why the range is finite — we only make as much as we press.',
    ],
    boxContents: [
      { label: 'Material', value: '100% repurposed coconut shell' },
      { label: 'Finish', value: 'Hand-polished, coconut oil' },
      { label: 'Origin', value: 'Kerala, India' },
    ],
    details: [
      {
        title: 'Description',
        body: 'Zero-waste tableware and bath accessories cut from the shells our own press discards, then sanded, shaped and polished by hand. Each piece carries its own grain — no two are identical.',
      },
      {
        title: 'Availability',
        body: 'The Shells line is in artisan sampling. Bulk and corporate gifting enquiries are welcome now.',
      },
    ],
    care: [
      'Hand wash with mild soap; do not soak',
      'Avoid dishwashers, microwaves and extreme heat',
      'Re-oil occasionally with a drop of coconut oil to restore lustre',
    ],
    launchNote: 'Oura Shells is in artisan sampling. Bulk and gifting enquiries are open today.',
  },
];

export const getProductById = (id: string | undefined): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const productPath = (id: string) => `/products/${id}`;

export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/** Cart totals come from Shopify with their own currency code. */
export const formatMoney = (amount: number, currency = 'INR') => {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return formatINR(amount);
  }
};
