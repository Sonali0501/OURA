import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet, EyeOffIcon, Sparkles, Utensils, type LucideIcon } from 'lucide-react';

const CULINARY_IMG = 'culinary.png';
const SHELLS_IMG = 'shells_p.png';
const VITA_IMG = 'oura_vita.jpg';
const CARE_IMG = 'oura_care.jpg';

type Product = {
    id: string
    name: string
    tag: string
    icon: LucideIcon
    pct: string
    purity: string
    desc: string
    specs: { label: string; value: string }[]
    img: string
    accent: string
    available: boolean
}

const PRODUCTS: Product[] = [
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
  },
];

export default function Spectrum() {
  const [active, setActive] = useState(() => Math.max(0, PRODUCTS.findIndex((p) => p.available)));

  const handleOnClick = (product: Product, i: number) => {
    if (product.available) setActive(i)
  }

  return (
    <section id="spectrum" className="relative bg-parchment grain text-palm py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-husk text-xs uppercase tracking-[0.3em] mb-4">Core product suite</p>
            <h2 className="font-display text-5xl md:text-8xl font-bold text-palm leading-[1.1] md:leading-[1.1]">
              The Spectrum
              <br />
              of <span className="italic text-husk">Utility</span>
            </h2>
          </div>
          <p className="text-palm/70 text-base md:text-lg max-w-md leading-relaxed">
          Four lines, one promise — pure, cold-pressed, zero-waste heritage engineered with institutional precision. Hover any piece to reveal its story and spec.
          </p>
        </motion.div>

        {/* Kinetic carousel shards */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 h-auto md:h-[600px]">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              onHoverStart={() => handleOnClick(product, i)}
              onClick={() => handleOnClick(product, i)}
              animate={{ flex: active === i ? 2 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden group min-h-[400px] md:min-h-0 ${
                product.available ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <img
                src={product.img}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-[transform,filter] duration-700 ${
                  product.available
                    ? 'group-hover:scale-105'
                    : 'scale-100 blur-sm brightness-[0.45] saturate-50'
                }`}
              />
              <div
                className={`absolute inset-0 ${
                  product.available
                    ? 'bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/10'
                    : 'bg-obsidian/05'
                }`}
              />

              {!product.available && (
                <div className="absolute inset-0 z-10 flex flex-col gap-3 items-center justify-center p-4 pointer-events-none">
                    <EyeOffIcon color='white' />
                    <div className="relative px-3 py-2 md:px-4 md:py-3 border border-palm/20 bg-white/85 backdrop-blur-sm">
                        <p className="font-sans-ui text-[10px] md:text-xs uppercase tracking-[0.45em] text-palm/90 text-center">
                        Coming Soon
                        </p>
                    </div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className={`flex items-center gap-3 mb-3 ${product.available ? '' : 'opacity-80'}`}>
                  <product.icon className="w-5 h-5 text-husk" strokeWidth={1.5} />
                  <span className="text-husk text-xs uppercase tracking-[0.2em]">{product.tag}</span>
                </div>
                <h3
                  className={`font-display font-bold text-parchment mb-2 ${
                    product.available ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl opacity-90'
                  }`}
                >
                  {product.name}
                </h3>

                <motion.div
                  animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <p className="text-parchment/85 text-sm md:text-base leading-relaxed mb-6 mt-4 max-w-md">
                    {product.desc}
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-parchment/10">
                    {product.specs.map((spec) => (
                      <div key={spec.label}>
                        <p className="text-husk text-[10px] uppercase tracking-widest mb-1">{spec.label}</p>
                        <p className="text-parchment text-sm font-medium">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {active !== i && (
                  <p className="text-parchment/70 text-xs uppercase tracking-[0.2em] mt-2">
                    {product.available
                      ? `${product.purity} — Hover to expand`
                      : ''}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex items-center gap-3 justify-center text-palm/70"
        >
          <Leaf className="w-4 h-4" strokeWidth={1} />
          <p className="text-xs uppercase tracking-[0.2em]">Hover or tap each shard to reveal technical specifications</p>
        </motion.div> */}
      </div>
    </section>
  );
}