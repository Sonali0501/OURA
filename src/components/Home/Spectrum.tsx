import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { PRODUCTS, formatMoney, productPath, type Product } from '../../data/products';
import { useCart } from '../../context/cartContext';
import { useProductVariants } from '../../hooks/useProductVariants';
import { useDeferredMedia } from '../../lib/deferredMedia';

/** Size picker, price and cart actions - only rendered for products on sale. */
function CardPurchase({ product }: { product: Product }) {
  const state = useProductVariants(product);
  const { addItem, buyNow, openCart, isSyncing } = useCart();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const variant = state.variants.find((v) => v.id === selectedId) ?? state.variants[0];
  const soldOut = !state.loading && !variant.availableForSale;
  const busy = isSyncing || state.loading;

  const selection = {
    variantId: variant.id,
    title: state.hasChoice ? `${product.name} - ${variant.label}` : product.name,
    img: variant.images[0] ?? product.img,
    price: variant.price,
    shopifyVariantId: variant.shopifyVariantId,
  };

  const handleAddToCart = async () => {
    await addItem(product, 1, selection);
    openCart();
  };

  const detailsHref = state.hasChoice
    ? `${productPath(product.id)}?size=${encodeURIComponent(variant.id)}`
    : productPath(product.id);

  return (
    <div className="mt-5 pt-5 border-t border-obsidian/10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Price - placeholder until Shopify answers, never a number we may replace */}
        {state.loading ? (
          <div className="h-7 w-20 bg-palm/10 animate-pulse" aria-label="Loading price" />
        ) : (
          variant.price !== undefined && (
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-gold">
                {formatMoney(variant.price, variant.currency)}
              </span>
              {variant.compareAt && (
                <span className="text-sm text-gold/45 line-through">
                  {formatMoney(variant.compareAt, variant.currency)}
                </span>
              )}
            </div>
          )
        )}

        {state.hasChoice && (
          <div
            role="radiogroup"
            aria-label={state.optionName}
            className="inline-flex flex-wrap gap-1 p-1 rounded-lg border border-palm/20 bg-parchment"
          >
            {state.variants.map((v) => {
              const isSelected = v.id === variant.id;
              const vSoldOut = !v.availableForSale;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={vSoldOut}
                  title={vSoldOut ? 'Sold out' : undefined}
                  onClick={() => setSelectedId(v.id)}
                  className={`h-8 px-3 rounded-md text-[10px] font-sans-ui font-semibold tracking-[0.12em] uppercase whitespace-nowrap transition-colors ${
                    isSelected ? 'bg-palm text-ivory' : 'text-gold/70 hover:text-gold hover:bg-palm/5'
                  } ${vSoldOut ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={busy || soldOut}
          className="inline-flex items-center justify-center gap-2 h-11 px-3 border border-palm text-gold text-[10px] font-sans-ui font-semibold tracking-[0.18em] uppercase hover:bg-palm hover:text-ivory transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gold"
        >
          {isSyncing && <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />}
          {soldOut ? 'Sold out' : 'Add to Cart'}
        </button>
        <button
          type="button"
          onClick={() => buyNow(product, 1, selection)}
          disabled={busy || soldOut}
          className="inline-flex items-center justify-center gap-2 h-11 px-3 bg-palm border border-palm text-ivory text-[10px] font-sans-ui font-semibold tracking-[0.18em] uppercase hover:bg-gold hover:border-gold transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-palm disabled:hover:border-palm"
        >
          Buy Now
        </button>
      </div>

      <Link
        to={detailsHref}
        className="mt-4 inline-flex items-center gap-2 text-[11px] font-sans-ui font-semibold tracking-[0.18em] uppercase text-gold underline-offset-4 hover:underline"
      >
        View details <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

/**
 * `featured` is the wide, side-by-side card used for products on sale - it
 * carries the buy controls, so it gets its own row instead of stretching the
 * compact coming-soon cards next to it.
 */
function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  // Lazy until the hero is playing, then fetched in the background before the visitor scrolls here.
  const imgLoading = useDeferredMedia() ? "eager" : "lazy";
  const card = (
    <div className={`group flex flex-col h-full bg-ivory border border-palm/10 rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(42,103,17,0.08)] hover:shadow-[0_12px_32px_rgba(42,103,17,0.14)] hover:border-gold/40 transition-[border-color,box-shadow] duration-300 ${featured ? 'lg:flex-row' : ''}`}>
      {/* Landscape image - top */}
      <div className={`relative aspect-[3/2] overflow-hidden ${featured ? 'lg:aspect-auto lg:w-1/2 lg:min-h-[440px]' : ''}`}>
        {product.available ? (
          <Link to={productPath(product.id)} tabIndex={-1} aria-hidden="true" className="block w-full h-full">
            <img
              src={product.img}
              loading={imgLoading}
              decoding="async"
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${featured ? 'lg:absolute lg:inset-0' : ''}`}
            />
          </Link>
        ) : (
          <img src={product.img} alt={product.name} loading={imgLoading} decoding="async" className="w-full h-full object-cover" />
        )}

        {/* Light wash so unavailable products read as not-yet-on-sale */}
        {!product.available && (
          <div className="absolute inset-0 z-[5] bg-gold/25 pointer-events-none" aria-hidden="true" />
        )}

        {!product.available && (
          <div className="absolute inset-x-0 bottom-0 z-10 py-2 bg-palm pointer-events-none">
            <p className="font-sans-ui text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory text-center">
              Coming Soon
            </p>
          </div>
        )}
      </div>

      {/* Content - below */}
      <div className={`flex-1 flex flex-col ${featured ? 'p-5 lg:p-10' : 'p-5 lg:p-6'}`}>
        {/* Category */}
        <div className="mb-3 flex items-center gap-2">
          <product.icon className="w-3.5 h-3.5 text-gold shrink-0" strokeWidth={1.5} />
          <span className="text-gold/80 text-[10px] font-sans-ui font-semibold uppercase tracking-[0.2em] leading-none">
            {product.tag}
          </span>
        </div>

        <h3 className={`font-display font-bold text-obsidian leading-tight ${featured ? 'text-2xl lg:text-4xl' : 'text-2xl'}`}>
          {product.available ? (
            <Link to={productPath(product.id)}>
              {product.name}
            </Link>
          ) : (
            product.name
          )}
        </h3>

        <p className={`mt-2 mb-2 text-obsidian/70 leading-relaxed ${featured ? 'text-sm lg:text-base' : 'text-sm'}`}>{product.desc}</p>

        <ul className="mt-auto pt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 border-t border-obsidian/10">
          {product.pointers.map((point) => (
            <li key={point} className="flex items-start gap-2 text-obsidian text-xs font-medium leading-snug">
              <Check className="w-3.5 h-3.5 mt-px shrink-0 text-obsidian" strokeWidth={2} />
              {point}
            </li>
          ))}
        </ul>

        {product.available && <CardPurchase product={product} />}
      </div>
    </div>
  );

  return <div className="h-full">{card}</div>;
}

const AVAILABLE = PRODUCTS.filter((p) => p.available);
const UPCOMING = PRODUCTS.filter((p) => !p.available);

export default function Spectrum() {
  return (
    <section id="spectrum" className="relative bg-parchment grain text-gold py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4">Core product suite</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-gold leading-[1.1] md:leading-[1.1]">
              The Spectrum of <span className="italic text-gold">Utility</span>
            </h2>
          </div>
          <p className="text-gold/70 text-base md:text-lg max-w-md leading-relaxed">
            Four lines, one promise - pure, cold-pressed, zero-waste heritage engineered with
            institutional precision. Each piece carries its own story and spec.
          </p>
        </motion.div>

        {/* On sale: one wide card each, image beside the buy controls */}
        <div id="shop" className="flex flex-col gap-8 lg:gap-10">
          {AVAILABLE.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} featured />
            </motion.div>
          ))}
        </div>

        {/* Coming soon: compact cards, three per row on desktop; a short last row stays centred */}
        {UPCOMING.length > 0 && (
          <div className="mt-8 lg:mt-10 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
            {UPCOMING.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-5rem)/3)]"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
