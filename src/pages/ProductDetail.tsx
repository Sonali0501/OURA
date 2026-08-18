import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  Loader2,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import Reveal from "../components/Home/Reveal";
import OuraLayout from "../components/layout/OuraLayout";
import {
  PRODUCTS,
  formatMoney,
  getProductById,
  productPath,
  type Product,
} from "../data/products";
import { getReviewsByProductTags, type Review } from "../data/reviews";
import { useCart } from "../context/cartContext";
import { useProductPricing } from "../hooks/useProductPricing";

const WHATSAPP_NUMBER = "918138014300";

const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const eyebrow = "text-gold text-[11px] font-sans-ui tracking-luxe uppercase";

/* ------------------------------------------------------------------ */
/* Unknown id                                                          */
/* ------------------------------------------------------------------ */

function ProductNotFound({ id }: { id?: string }) {
  return (
    <section className="mx-auto max-w-[900px] px-6 lg:px-12 pt-32 pb-24 text-center">
      <p className={eyebrow}>Not found</p>
      <h1
        className="mt-5 font-display font-semibold leading-tight text-palm"
        style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
      >
        We couldn't find that product
      </h1>
      <p className="mt-4 text-palm/75">
        {id ? (
          <>
            Nothing in the OURA suite matches <span className="italic">“{id}”</span>.
          </>
        ) : (
          "No product was specified."
        )}{" "}
        Here is everything we make.
      </p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {PRODUCTS.map((p) => (
          <ProductMiniCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function ProductMiniCard({ product }: { product: Product }) {
  return (
    <Link
      to={productPath(product.id)}
      className="group block border border-palm/15 hover:border-gold/50 transition-colors"
    >
      <div className="aspect-square overflow-hidden bg-parchment">
        <img
          src={product.img}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            product.available ? "" : "brightness-[0.75] saturate-75"
          }`}
        />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-sans-ui tracking-luxe uppercase text-palm/55">
          {product.tag}
        </p>
        <p className="mt-2 font-display text-xl font-semibold text-palm">{product.name}</p>
        <p className="mt-2 text-[10px] font-sans-ui tracking-luxe uppercase text-gold">
          {product.available ? "Available now" : "Coming soon"}
        </p>
      </div>
    </Link>
  );
}

function Accordion({ items }: { items: { title: string; body: string }[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.title ?? null);

  return (
    <div className="border-t border-palm/15">
      {items.map((item) => {
        const isOpen = open === item.title;
        return (
          <div key={item.title} className="border-b border-palm/15">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.title)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-xl font-semibold text-palm">{item.title}</span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-palm/50 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                strokeWidth={1.5}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-8 text-base text-palm/80 leading-relaxed">{item.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const images = product.gallery.length ? product.gallery : [product.img];
  const current = images[Math.min(active, images.length - 1)];

  // Wrap around at both ends so the arrows never dead-end.
  const step = (delta: number) =>
    setActive((i) => (i + delta + images.length) % images.length);

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center " +
    "bg-ivory/85 backdrop-blur-sm border border-palm/10 text-palm " +
    "hover:bg-ivory transition opacity-0 group-hover:opacity-100 focus-visible:opacity-100 " +
    "max-lg:opacity-100";

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible no-scrollbar">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${product.name}`}
              aria-current={i === active}
              className={`shrink-0 w-16 h-16 lg:w-20 lg:h-20 overflow-hidden border transition-colors ${
                i === active ? "border-gold" : "border-palm/15 hover:border-palm/40"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="relative flex-1 bg-parchment overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${current}-${active}`}
            src={current}
            alt={product.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full aspect-[4/5] object-cover"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className={`${arrowClass} left-4`}
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className={`${arrowClass} right-4`}
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-ivory/85 backdrop-blur-sm border border-palm/10">
              <span className="text-[10px] font-sans-ui tracking-luxe uppercase text-palm/70">
                {Math.min(active, images.length - 1) + 1} / {images.length}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reviews marquee                                                     */
/* ------------------------------------------------------------------ */

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="shrink-0 w-[min(85vw,400px)]">
      <div className="border border-palm/15 p-6 md:p-8 h-full flex flex-col hover:border-gold/40 transition-colors">
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" strokeWidth={1.5} />
          ))}
        </div>
        <p className="text-base text-palm/80 leading-relaxed flex-1">{review.text}</p>
        <div className="mt-6 pt-4 border-t border-palm/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-palm flex items-center justify-center text-ivory font-sans-ui text-xs shrink-0">
            {review.initials}
          </div>
          <div>
            <p className="font-display font-medium text-palm">{review.name}</p>
            <p className="font-sans-ui text-[10px] tracking-luxe uppercase text-palm/55">
              {review.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsMarquee({ reviews }: { reviews: Review[] }) {
  // The track holds two identical runs and slides exactly -50%, so the second
  // run lands where the first began and the loop is seamless. Short lists get
  // repeated first, otherwise a single run can't fill the viewport.
  const base: Review[] = [];
  while (base.length < 4) base.push(...reviews);

  return (
    <section id="reviews" className="py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <p className={eyebrow}>Voices</p>
          <h2
            className="mt-4 font-display font-semibold text-palm leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            What Families Say
          </h2>
        </Reveal>
      </div>

      {/* Full-bleed so cards enter and leave past the page edge */}
      <div className="marquee mt-10 group">
        <div className="marquee-track flex gap-6 w-max group-hover:[animation-play-state:paused]">
          {base.map((r, i) => (
            <ReviewCard key={`a-${i}-${r.name}`} review={r} />
          ))}
          {base.map((r, i) => (
            <div key={`b-${i}-${r.name}`} aria-hidden="true" className="contents">
              <ReviewCard review={r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Buy panel                                                           */
/* ------------------------------------------------------------------ */

function BuyPanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addItem, buyNow, openCart, isSyncing } = useCart();

  const handleAddToCart = async () => {
    await addItem(product, qty);
    openCart();
  };

  // Live from Shopify, falling back to the price in data/products.ts
  const { price, currency, loading: priceLoading } = useProductPricing(product);

  const enquiry = product.available
    ? `Hello OURA, I'd like to order ${qty} × ${product.name}.`
    : `Hello OURA, please let me know when ${product.name} becomes available.`;

  if (!product.available) {
    return (
      <div className="mt-8">
        <div className="border border-palm/15 bg-parchment p-6">
          <p className="text-[10px] font-sans-ui tracking-luxe uppercase text-palm/55">
            Coming soon
          </p>
          <p className="mt-3 text-sm text-palm/80 leading-relaxed">
            {product.launchNote ??
              "This line is still in development. Register your interest and we will write to you the day it opens."}
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={waLink(enquiry)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 h-12 px-7 bg-gold text-ivory text-[11px] font-sans-ui tracking-luxe uppercase hover:brightness-110 transition"
          >
            Notify me <span aria-hidden="true">→</span>
          </a>
          <a
            href="/#b2b"
            className="inline-flex items-center justify-center h-12 px-7 border border-palm/30 text-palm text-[11px] font-sans-ui tracking-luxe uppercase hover:bg-palm hover:text-ivory transition"
          >
            Bulk enquiry
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Price — a placeholder while loading, never a number we may replace */}
      {priceLoading ? (
        <div className="h-10 w-32 bg-palm/10 animate-pulse" aria-label="Loading price" />
      ) : (
        price !== undefined && (
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-display text-4xl font-semibold text-palm">
            {formatMoney(price, currency)}
          </span>
          {/* {compareAt && (
            <span className="text-lg text-palm/45 line-through">{formatINR(compareAt)}</span>
          )}
          {discount > 0 && (
            <span className="px-2 py-1 bg-gold/10 text-gold text-[10px] font-sans-ui tracking-luxe uppercase">
              {discount}% off
            </span>
          )} */}
        </div>
        )
      )}
      <p className="mt-2 text-[11px] font-sans-ui tracking-luxe uppercase text-palm/50">
        Inclusive of all taxes
      </p>

      {/* Quantity */}
      <div className="mt-8">
        <p className="text-[10px] font-sans-ui tracking-luxe uppercase text-palm/55">Quantity</p>
        <div className="mt-3 inline-flex items-center border border-palm/25">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-12 h-12 flex items-center justify-center text-palm hover:bg-parchment transition"
          >
            <Minus className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <span className="w-12 text-center font-sans-ui text-sm text-palm">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            aria-label="Increase quantity"
            className="w-12 h-12 flex items-center justify-center text-palm hover:bg-parchment transition"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* CTAs — Add to Cart syncs the Shopify cart, Buy Now skips to checkout */}
      <div className="mt-8 w-full flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isSyncing}
          className="w-full inline-flex items-center justify-center gap-2 h-14 px-8 border border-palm text-palm text-[11px] font-sans-ui tracking-luxe uppercase hover:bg-palm hover:text-ivory transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-palm"
        >
          {isSyncing && <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />}
          Add to Cart
        </button>
        <button
          type="button"
          onClick={() => buyNow(product, qty)}
          disabled={isSyncing}
          className="w-full inline-flex items-center justify-center gap-3 h-14 px-8 bg-gold text-ivory text-[11px] font-sans-ui tracking-luxe uppercase hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
        >
          Buy Now <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Assurances */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-palm/10 pt-6">
        {[
          { icon: Truck, label: "Ships from Kochi in 2 days" },
          { icon: Leaf, label: "Zero additives, zero refining" },
          { icon: ShieldCheck, label: "Cold-pressed, lab checked" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-start gap-3">
            <Icon className="w-4 h-4 mt-0.5 text-gold shrink-0" strokeWidth={1.5} />
            <span className="text-xs text-palm/70 leading-relaxed">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);
  const reviews = product ? getReviewsByProductTags(product.product_tags) : [];

  if (!product) {
    return (
      <OuraLayout solidNav>
        <ProductNotFound id={id} />
      </OuraLayout>
    );
  }

  return (
    <OuraLayout solidNav>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-24 lg:pt-28">
        <nav aria-label="Breadcrumb" className="text-[10px] font-sans-ui tracking-luxe uppercase text-palm/50">
          <Link to="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <Link to="/#spectrum" className="hover:text-gold transition-colors">
            Spectrum
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-palm/80">{product.name}</span>
        </nav>
      </div>

      {/* Gallery + buy panel */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-8 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              {/* key: reset gallery/panel state when navigating between products */}
              <Gallery key={product.id} product={product} />
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <Reveal delay={0.08}>
              <div className="flex items-center gap-3">
                <product.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                <span className="text-[10px] font-sans-ui tracking-luxe uppercase text-palm/55">
                  {product.tag}
                </span>
                {!product.available && (
                  <span className="px-2 py-1 border border-palm/20 text-[9px] font-sans-ui tracking-luxe uppercase text-palm/60">
                    Coming soon
                  </span>
                )}
              </div>

              <h1
                className="mt-4 font-display font-semibold text-palm leading-[1.05]"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)" }}
              >
                {product.name}
              </h1>
              <p className="mt-3 font-display italic text-xl text-palm/70">{product.tagline}</p>

              {reviews.length > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" strokeWidth={1.5} />
                    ))}
                  </span>
                  <a
                    href="#reviews"
                    className="text-[10px] font-sans-ui tracking-luxe uppercase text-palm/55 hover:text-gold transition-colors"
                  >
                    {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                  </a>
                </div>
              )}

              <p className="mt-5 text-base text-palm/80 leading-relaxed">{product.desc}</p>

              <BuyPanel key={product.id} product={product} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-palm text-ivory">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-20">
          <Reveal>
            <p className="text-husk text-[11px] font-sans-ui tracking-luxe uppercase">
              Why it is different
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.highlights.map((h, i) => (
              <Reveal key={h} delay={i * 0.06}>
                <div className="border border-ivory/15 p-6 h-full">
                  <Leaf className="w-5 h-5 text-husk" strokeWidth={1.5} />
                  <p className="mt-4 text-sm text-ivory/85 leading-relaxed">{h}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story + accordion */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <p className={eyebrow}>The Making</p>
              <h2
                className="mt-4 font-display font-semibold text-palm leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
              >
                From Kerala, Without Compromise
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4">
              {product.story.map((p, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <p className="text-base text-palm/80 leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-palm/10 pt-6">
                {product.specs.map((s) => (
                  <div key={s.label}>
                    <p className="text-[10px] font-sans-ui tracking-luxe uppercase text-palm/50 mb-1">
                      {s.label}
                    </p>
                    <p className="text-sm text-palm font-medium">{s.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <Accordion items={product.details} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* In the box + care */}
      <section className="bg-parchment grain">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-24">
          <Reveal>
            <p className={eyebrow}>Specification</p>
            <h2
              className="mt-4 font-display font-semibold text-palm leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              What Arrives, and How to Keep It
            </h2>
          </Reveal>

          {/* 3/2 split mirrors the content weight — more spec rows than care notes */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Reveal className="lg:col-span-3">
              <div className="h-full bg-ivory border border-palm/12 p-7 lg:p-9">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 flex items-center justify-center bg-gold/10 shrink-0">
                    <Package className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-palm">In the Box</h3>
                </div>

                <dl className="mt-7">
                  {product.boxContents.map((b) => (
                    <div
                      key={b.label}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 border-b border-palm/10 last:border-0 last:pb-0"
                    >
                      <dt className="text-[10px] font-sans-ui tracking-[0.2em] uppercase text-palm/50">
                        {b.label}
                      </dt>
                      <dd className="font-display text-lg text-palm">{b.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-2">
              <div className="h-full bg-ivory border border-palm/12 p-7 lg:p-9">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 flex items-center justify-center bg-gold/10 shrink-0">
                    <Heart className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-palm">Care &amp; Storage</h3>
                </div>

                <ol className="mt-7 space-y-6">
                  {product.care.map((c, i) => (
                    <li key={c} className="flex gap-4">
                      <span
                        className="font-display text-lg font-semibold text-gold/70 leading-none pt-1 shrink-0"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-palm/80 leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && <ReviewsMarquee reviews={reviews} />}

    </OuraLayout>
  );
}
