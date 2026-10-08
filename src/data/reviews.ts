/**
 * Single source of truth for customer voices.
 * The home page Testimonials wall renders all of them; a product detail page
 * renders the subset whose `product_tag` appears in that product's `product_tags`.
 *
 * A review with no `product_tag` is brand-level - it shows on the home wall only.
 */

export type Review = {
  name: string;
  city: string;
  text: string;
  initials: string;
  product_tag?: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Aravind Krishnan",
    city: "Kochi, Kerala",
    text: "The cold-pressed oil has become a staple in my mother's kitchen. It tastes exactly like the oil she remembers from her childhood - pure, fragrant, and honest.",
    initials: "AK",
    product_tag: "culinary",
  },
  {
    name: "Meera Nair",
    city: "Borivali, Mumbai",
    text: "I brought a bottle back to Mumbai and it completely changed how I cook. You can tell the difference the moment you open it. Real Kerala heritage in a bottle.",
    initials: "MN",
    product_tag: "culinary",
  },
  {
    name: "Vishnu Pillai",
    city: "Indiranagar, Bangalore",
    text: "As someone who grew up around coconut palms, OURA is the first brand that actually honors the source. No shortcuts, no pretense - just purity.",
    initials: "VP",
    product_tag: "culinary",
  },
  {
    name: "Divya Menon",
    city: "Saket, Delhi",
    text: "Living in Delhi, I had almost forgotten what real coconut oil smelled like. OURA brought Kerala back into my home. The quality is institutional-grade.",
    initials: "DM",
    product_tag: "oil",
  },
  {
    name: "Sreelekshmi Warrier",
    city: "Thiruvananthapuram, Kerala",
    text: "It's rare to come across a brand that stays true to Kerala's traditions. OURA feels like a genuine sign of purity in a market full of compromises.",
    initials: "SW",
  },
  {
    name: "Anand Sharma",
    city: "Mayur Vihar, Delhi",
    text: "Finding a brand you can trust isn't easy anymore. OURA stands out as a refreshing reminder that purity, honesty, and quality still exist.",
    initials: "AS",
  },
];

/** Reviews tagged with any of the given product tags. */
export const getReviewsByProductTags = (tags: string[]): Review[] =>
  REVIEWS.filter((r) => !!r.product_tag && tags.includes(r.product_tag));
