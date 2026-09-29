import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeOffIcon } from 'lucide-react';
import { PRODUCTS, productPath, type Product } from '../../data/products';

function ProductCard({ product }: { product: Product }) {
  const card = (
    <div className="group flex flex-col h-full bg-ivory border border-palm/10 rounded-xl overflow-hidden hover:border-gold/40 transition-colors">
      {/* Landscape image — top */}
      <div className="relative aspect-[2/1] overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            product.available ? 'group-hover:scale-105' : 'blur-sm brightness-[0.45] saturate-50'
          }`}
        />

        {/* Category badge sits above the coming-soon overlay */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pl-2.5 pr-3.5 py-1.5 rounded-full bg-ivory/90 backdrop-blur-sm border border-palm/10">
          <product.icon className="w-3.5 h-3.5 text-golden shrink-0" strokeWidth={1.5} />
          <span className="text-golden text-[10px] uppercase tracking-[0.2em] leading-none">
            {product.tag}
          </span>
        </div>

        {!product.available && (
          <div className="absolute inset-0 z-10 flex flex-col gap-3 items-center justify-center p-4 pointer-events-none bg-obsidian/20">
            <EyeOffIcon color="white" />
            <div className="px-3 py-2 border border-palm/20 bg-white/85 backdrop-blur-sm">
              <p className="font-sans-ui text-[10px] uppercase tracking-[0.45em] text-gold/90 text-center">
                Coming Soon
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content — below */}
      <div className="flex-1 p-5 lg:p-6 flex flex-col">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-obsidian leading-tight">
          {product.name}
        </h3>

        <p className="mt-2 mb-2 text-obsidian/70 text-sm leading-relaxed">{product.desc}</p>

        {/* Specs are for products you can actually buy */}
        {product.available && (
          <div className="mt-auto pt-4 grid grid-cols-3 gap-3 border-t border-obsidian/10">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <p className="text-golden text-[9px] uppercase tracking-widest mb-1">{spec.label}</p>
                <p className="text-obsidian text-xs font-medium">{spec.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return product.available ? (
    <Link to={productPath(product.id)} aria-label={`View ${product.name}`} className="block h-full">
      {card}
    </Link>
  ) : (
    <div className="h-full cursor-default">{card}</div>
  );
}

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
            <p className="text-golden text-xs uppercase tracking-[0.3em] mb-4">Core product suite</p>
            <h2 className="font-display text-5xl md:text-8xl font-bold text-gold leading-[1.1] md:leading-[1.1]">
              The Spectrum
              <br />
              of <span className="italic text-golden">Utility</span>
            </h2>
          </div>
          <p className="text-gold/70 text-base md:text-lg max-w-md leading-relaxed">
            Four lines, one promise — pure, cold-pressed, zero-waste heritage engineered with
            institutional precision. Each piece carries its own story and spec.
          </p>
        </motion.div>

        {/* Two landscape cards per row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
