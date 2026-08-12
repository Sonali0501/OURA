import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GROVE_IMG = 'soli_to_sip_1.png';
const FARMER_IMG = 'soli_to_sip_2.png';
const LAB_IMG = 'soli_to_sip_3.png';

const STAGES = [
  {
    label: '01 — The Soil',
    title: 'Volcanic Earth',
    desc: 'Micro-macro photography of Kerala\'s volcanic earth — the mineral-rich foundation that gives OURA its nutritional density.',
    img: GROVE_IMG,
    side: 'left',
  },
  {
    label: '02 — The Harvest',
    title: 'Farmer Partnership',
    desc: 'Direct sourcing from Kerala farmers with 15% better payouts than market rates — building loyalty and quality at the source.',
    img: FARMER_IMG,
    side: 'right',
  },
  {
    label: '03 — The Lab',
    title: '6° Cold-Pressing',
    desc: 'Processed under 45°C to preserve raw nutritional integrity. Shells and meal repurposed into OURA Crockery — nothing discarded.',
    img: LAB_IMG,
    side: 'left',
  },
];

export default function SoilToSip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const liquidFill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="soil-to-sip" ref={ref} className="relative bg-palm text-ivory py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-[1400px] mx-auto mb-20 md:mb-32"
      >
        <p className="text-husk text-xs uppercase tracking-[0.3em] mb-4">Sustainable Sourcing</p>
        <h2 className="font-display text-5xl md:text-8xl font-bold text-ivory leading-[0.9]">
          From Soil to <span className="italic text-husk">Sip</span>
        </h2>
      </motion.div>

      {/* Stages + stem — stem only spans this block, not the zero-waste footer */}
      <div className="relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-ivory/15 pointer-events-none">
          <motion.div
            style={{ height: liquidFill }}
            className="w-full bg-gradient-to-b from-husk via-husk to-gold relative"
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-husk shadow-lg" />
          </motion.div>
        </div>

        <div className="max-w-[1400px] mx-auto relative">
          <div className="space-y-16 md:space-y-24">
          {STAGES.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-150px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                stage.side === 'right' ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 pl-20 md:pl-0">
                <div className={`relative overflow-hidden ${stage.side === 'right' ? 'md:ml-20' : 'md:mr-20'}`}>
                  <motion.img
                    src={stage.img}
                    alt={stage.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-ivory/15" />
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 pl-20 md:pl-0">
                <div className={stage.side === 'right' ? 'md:mr-20' : 'md:ml-20'}>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-husk text-xs uppercase tracking-[0.3em] mb-4"
                  >
                    {stage.label}
                  </motion.p>
                  <h3 className="font-display text-4xl md:text-6xl font-bold text-ivory mb-6 leading-tight">
                    {stage.title}
                  </h3>
                  <p className="text-ivory/75 text-base md:text-lg leading-relaxed max-w-md">
                    {stage.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>

      {/* Zero-waste closing */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-[1400px] mx-auto mt-32 text-center"
      >
        <div className="inline-flex items-center gap-4 px-8 py-4 border border-ivory/15">
          <span className="text-2xl">♻️</span>
          <p className="font-display text-xl md:text-2xl text-ivory">
            Zero-Waste: Shells and meal repurposed into OURA Crockery — nothing discarded, everything valued.
          </p>
        </div>
      </motion.div>
    </section>
  );
}