import React from 'react';
import {
  Leaf,
  Waves,
  ShieldCheck,
  ScanSearch,
  HeartPulse,
  Award,
} from 'lucide-react';
import { motion } from 'motion/react';
import { QUALITY_PILLARS } from '../data/delamarisData';
import { SmartImage } from './SmartImage';

const PILLAR_ICONS = [
  Leaf,
  Waves,
  ShieldCheck,
  ScanSearch,
  HeartPulse,
  Award,
];

export const QualitySection: React.FC = () => {
  return (
    <section
      id="quality"
      className="py-20 lg:py-28 bg-[#FAF7F2] scroll-mt-[112px]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <p className="text-[13px] font-semibold tracking-[0.06em] text-[#24636C] mb-3">
              Quality & Marine Sustainability
            </p>
            <h2 className="font-serif text-[clamp(2rem,3.4vw,3rem)] font-semibold text-[#0D2C44] leading-[1.14]">
              Pure Ingredients, Rigorous Standards, Respect for the Ocean
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[15.5px] leading-[1.68] text-[#0D2C44]/75">
              True shelf stability needs no artificial preservatives. Through
              gentle thermal sterilization and audited European quality control,
              every tin locks in natural nutrition and coastal freshness.
            </p>
          </div>
        </div>

        {/* Full-Width Natural Ingredients Editorial Photograph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 lg:mb-16"
        >
          <div className="aspect-[16/9] max-h-[520px] w-full rounded-xl overflow-hidden border border-[#0D2C44]/10">
            <SmartImage
              src="/src/assets/images/quality_natural_ingredients_1795154817029.jpg"
              alt="Overhead editorial flat-lay of fresh silver Atlantic mackerel on ice, ripe vine plum tomatoes, extra-virgin olive oil, organic carrots, rosemary, bay leaves, sea salt, and fresh lemons on limestone"
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Six Quality & Sustainability Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {QUALITY_PILLARS.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length];
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: (index % 3) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group pt-6 border-t border-[#0D2C44]/14"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#0D2C44]/10 flex items-center justify-center text-[#24636C] transition-colors duration-200 group-hover:bg-[#0D2C44] group-hover:text-[#FAF7F2]">
                    <Icon className="w-5 h-5" strokeWidth={1.6} />
                  </div>
                  <span className="text-[12.5px] font-semibold text-[#24636C]">
                    {pillar.metric}
                  </span>
                </div>

                <h3 className="font-serif text-[21px] font-semibold text-[#0D2C44] mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-[14.5px] leading-[1.66] text-[#0D2C44]/74">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
