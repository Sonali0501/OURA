import { Baby, Cookie, Droplet, Sparkles, Utensils, Wheat, type LucideIcon } from 'lucide-react';

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
  desc: string;
  specs: { label: string; value: string }[];
  /** The four points listed on the Spectrum card. */
  pointers: string[];
  img: string;
  available: boolean;
  /** Matched against each review's `product_tag` in `data/reviews.ts`. */
  product_tags: string[];

  /* ---- detail page ---- */
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
  /** Heading of the dark highlights band. Generic line when absent. */
  highlightsTitle?: string;
  story: string[];
  details: { title: string; body: string }[];
  /** Shown when the product is not on sale yet (coming soon). */
  launchNote?: string;
};

/**
 * Image paths must be root-absolute (leading slash). A bare filename resolves
 * against the current URL, so it would 404 on nested routes like
 * /products/culinary (→ /products/culinary_square.png).
 */
const CULINARY_IMG = '/products/oura_culinary.jpg';
const SHELLS_IMG = '/products/OURA_SHELLS.jpeg';
const VITA_IMG = '/products/OURA_VITA.jpeg';
const SHREDS_IMG = '/products/OURA_SHREADS.jpeg';
const CRISPS_IMG = '/products/OURA_CRISPS.jpeg';
const LITTLES_IMG = '/products/OURA_LITTLES.jpeg';

export const PRODUCTS: Product[] = [
  {
    id: 'culinary',
    name: 'Oura Culinary',
    tag: 'COLD-PRESSED OIL',
    icon: Sparkles,
    desc: "Double-filtered coconut oil prepared from premium quality copra. Crystal-clear purity that preserves the delicate original flavors of your family's cooking.",
    specs: [
      { label: 'Process', value: 'Cold pressed' },
      { label: 'Additives', value: 'Zero' },
      { label: 'Uses', value: 'Care & Kitchen' },
    ],
    pointers: [
      'Cold-pressed under 45°C',
      'Crystal-clear & unrefined',
      'Zero chemical additives',
      'Rich natural aroma',
    ],
    img: CULINARY_IMG,
    available: true,
    product_tags: ['culinary', 'oil'],

    gallery: [CULINARY_IMG, CULINARY_IMG, CULINARY_IMG, CULINARY_IMG],
    price: 649,
    compareAt: 749,
    shopify_product_id: 'gid://shopify/Product/8710327795885',
    shopifyVariantId: 'gid://shopify/ProductVariant/47250512740525',
    highlightsTitle: 'Why Choose Oura Culinary?',
    highlights: [
      '100% Pure & Edible Grade: Crafted exclusively from premium quality copra with zero compromises on quality.',
      'Nutrient-Dense: Crystal-clear oil that locks in natural goodness, bringing authentic flavor to your everyday cooking.',
      'Rooted in Heritage: Sourced directly from the lush agrarian landscapes of Kochi, Kerala.',
    ],
    story: [
      'Oura Culinary begins where every honest oil should — at the tree. Mature coconuts are hand-picked from Kerala smallholdings, sun-dried in open air, and pressed the same week so nothing has time to go stale.',
      'We press cold, never above 45°C. Heat is what strips an oil of its lauric acid, its aroma, and the faint sweetness that tells you it came from a real coconut. Skipping the heat costs us yield. It is the whole point.',
      'What reaches your kitchen is unrefined and unapologetic: cloudy when cool, clear when warm, and unmistakably Kerala on the first spoon.',
    ],
    details: [
      // {
      //   title: 'Description',
      //   body: 'A single-ingredient virgin coconut oil, cold-pressed from fresh Kerala copra and filtered only through cloth. Nothing is added and nothing is taken away — no refining, no bleaching, no deodorising. Expect a soft coconut aroma, a clean finish, and a texture that turns solid below 24°C, which is exactly how pure oil should behave.',
      // },
      {
        title: 'How to use',
        body: 'Cook with it at everyday stove temperatures, finish a thoran or curry with a spoonful, stir it into coffee, or warm a little between your palms for hair and skin. It has a smoke point around 175°C, so it is suited to sautéing and shallow frying rather than aggressive deep frying.',
      },
      {
        title: 'Ingredients',
        body: '100% cold-pressed virgin coconut oil (Cocos nucifera). That is the entire list. No preservatives, no fragrance, no carrier oils.',
      },
      {
        title: 'Care & Storage',
        body: 'Store in a cool, dry place away from direct sunlight. Solidification below 24°C is natural — warm the bottle to liquefy. Use a dry spoon; moisture shortens the life of any unrefined oil.',
      },
      {
        title: 'Shipping',
        body: 'Dispatched from Kochi within 2 business days. Delivery typically 3–6 business days across India. If a bottle arrives damaged, send us a photo and we will replace it, no questions asked.',
      },
    ],
  },
  {
    id: 'water',
    name: 'Oura Vita',
    tag: 'RAW HYDRATION',
    icon: Droplet,
    desc: 'Drawn at source from tender Kerala coconuts. Pure, living, cold-pressed tender coconut water loaded with bio-available natural electrolytes.',
    specs: [
      { label: 'pH Level', value: '5.5–6.5' },
      { label: 'Temperature', value: '< 45°C' },
      { label: 'Origin', value: 'Kerala, India' },
    ],
    pointers: [
      '100% Raw & Unpasteurized',
      'Zero added sugars',
      'Natural isotonic hydration',
      'Untouched living nutrition',
    ],
    img: VITA_IMG,
    available: false,
    product_tags: ['water'],

    gallery: [VITA_IMG],
    highlights: [
      'Drawn from tender coconuts and sealed within hours of harvest',
      'No sugar, no concentrate, no reconstitution',
      'Naturally complete electrolyte profile',
    ],
    story: [
      'Oura Vita is the simplest product we make and the hardest to get right. Tender coconut water begins to change the moment it meets air, so everything depends on how little time passes between the tree and the seal.',
      'Our answer is to process at source rather than ship nuts to a distant plant — the water is drawn, chilled and sealed in Kerala, close to the grove it came from.',
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
    launchNote:
      'Oura Vita is in pilot production. Retail pricing and pack sizes will be announced at launch.',
  },
  {
    id: 'shreds',
    name: 'Oura Shreds',
    tag: 'FRESH PANTRY KERNEL',
    icon: Wheat,
    desc: 'Pure, raw, zero-waste Kerala coconut shreds. Processed with precision to maintain natural moisture, rich coconut milk content, and fresh taste.',
    specs: [],
    pointers: [
      'Freshly grated kernel',
      'Zero preservatives',
      'High natural oil content',
      'Ideal for curries & baking',
    ],
    img: SHREDS_IMG,
    available: false,
    product_tags: ['shreds'],

    gallery: [SHREDS_IMG],
    highlights: [],
    story: [],
    details: [],
  },
  {
    id: 'crisps',
    name: 'Oura Crisps',
    tag: 'OVEN-BAKED GOURMET',
    icon: Cookie,
    desc: 'Oven-baked, never fried. Delicate, toasted coconut slices crafted from mature Kerala coconuts, gently seasoned for an authentic wholesome crunch.',
    specs: [],
    pointers: [
      'Oven-baked non-fried snack',
      'Gluten-free & high fiber',
      '100% Natural plant-based',
      'Gourmet natural seasoning',
    ],
    img: CRISPS_IMG,
    available: false,
    product_tags: ['crisps'],

    gallery: [CRISPS_IMG],
    highlights: [],
    story: [],
    details: [],
  },
  {
    id: 'littles',
    name: 'Oura Littles',
    tag: 'GENTLE BABY CARE',
    icon: Baby,
    desc: 'Cold-pressed virgin coconut baby massage oil enriched with pure lavender essential oil. Formulated to nourish sensitive infant skin with total purity.',
    specs: [],
    pointers: [
      'Cold-pressed virgin coconut oil',
      'Pure soothing lavender',
      'Hypoallergenic formula',
      'Dermatologist tested',
    ],
    img: LITTLES_IMG,
    available: false,
    product_tags: ['littles'],

    gallery: [LITTLES_IMG],
    highlights: [],
    story: [],
    details: [],
  },
  {
    id: 'shells',
    name: 'Oura Shells',
    tag: 'HANDCRAFTED KITCHENWARE',
    icon: Utensils,
    desc: 'Artisanal coconut bowls and spoon sets hand-finished from reclaimed coconut shells. Chemical-free, durable, and 100% planet-friendly.',
    specs: [
      { label: 'Material', value: 'Repurposed Shell' },
      { label: 'Waste', value: '0% Discarded' },
      { label: 'Durability', value: 'Lifetime' },
    ],
    pointers: [
      'Repurposed coconut shells',
      'Zero lacquers or toxins',
      'Hand-carved by local artisans',
      'Sustainable kitchenware',
    ],
    img: SHELLS_IMG,
    available: false,
    product_tags: ['shells'],

    gallery: [SHELLS_IMG],
    highlights: [
      'Made from shells left over by our own oil press — nothing bought, nothing wasted',
      'Hand-finished by Kerala artisans, polished with coconut oil',
      'Fully biodegradable at end of life',
    ],
    story: [
      'Pressing oil leaves shells. Most of the industry burns them. We hand them to artisans instead.',
      'Every bowl, spoon and dish in this line starts as a by-product of the Culinary press, which is why the range is finite — we only make as much as we press.',
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
