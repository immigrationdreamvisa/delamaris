import React, { useRef } from 'react';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SmartImage } from './SmartImage';

interface HeroProps {
  onExploreProducts: () => void;
  onDiscoverRecipes: () => void;
}

const HERO_FACTS = [
  { value: 'Since 1879', label: 'Over 145 years of Adriatic heritage' },
  { value: '100% Natural', label: 'Wild fish, vegetables & fine oils' },
  { value: 'Zero Additives', label: 'Free from preservatives & gluten' },
  { value: 'Rich in Omega-3', label: 'Naturally nourishing everyday food' },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  onDiscoverRecipes,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Subtle compositor-only parallax on the hero photograph
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.09]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative bg-[#FAF7F2] overflow-hidden"
    >
      {/* Full-bleed Cinematic Coastal Seafood Hero */}
      <div className="relative min-h-[620px] lg:min-h-[720px] flex items-end lg:items-center overflow-hidden">
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0 will-change-transform"
        >
          <SmartImage
            src="/src/assets/images/hero_mediterranean_seafood_1795154799175.jpg"
            alt="Sunlit Adriatic table spread featuring plated mackerel fillets, silver sardines, flaky tuna, charred lemons, cherry tomatoes, olives, fresh herbs, and artisan bread overlooking the Mediterranean sea"
            priority
            containerClassName="w-full h-full"
            className="w-full h-full object-cover object-center"
          />
          {/* Measured editorial contrast scrim ensuring >= 4.5:1 text legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#081E30]/92 via-[#0D2C44]/72 to-[#0D2C44]/20"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#081E30]/80 via-transparent to-[#081E30]/20 lg:hidden"
          />
        </motion.div>

        {/* Hero Typography & Actions */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 py-20 lg:py-28">
          <div className="max-w-[650px]">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13.5px] font-medium tracking-[0.06em] text-[#E8DDD0] mb-5"
            >
              Adriatic Seafood Craftsmanship · Izola, Since 1879
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-serif text-[clamp(2.5rem,4.8vw,4.25rem)] font-semibold leading-[1.07] tracking-[-0.015em] text-[#FAF7F2] mb-6"
            >
              The Taste of the Sea, Made for Everyday.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[16px] sm:text-[17.5px] leading-[1.68] text-[#FAF7F2]/88 max-w-[54ch] mb-9 font-normal tracking-[0.01em]"
            >
              For over 145 years, Delamaris has brought the authentic richness of
              Mediterranean mackerel, sardines, and tuna straight to European
              tables—prepared strictly with natural ingredients, garden
              vegetables, and zero preservatives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.24,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={onExploreProducts}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#D46146] hover:bg-[#BA4E35] text-[#FAF7F2] text-[14.5px] font-semibold rounded-md transition-all duration-200 hover:-translate-y-0.5 shadow-[0_10px_28px_rgba(212,97,70,0.3)] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF7F2]"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onDiscoverRecipes}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#FAF7F2]/12 hover:bg-[#FAF7F2] text-[#FAF7F2] hover:text-[#0D2C44] border border-[#FAF7F2]/45 text-[14.5px] font-semibold rounded-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF7F2]"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Discover Our Recipes</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full-Width Editorial Proof Strip Below Hero */}
      <div className="relative z-10 bg-[#EFEAE0] border-b border-[#0D2C44]/10 shadow-[0_2px_8px_rgba(13,44,68,0.04)]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#0D2C44]/10">
            {HERO_FACTS.map((fact, idx) => (
              <motion.div
                key={fact.value}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.28 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${idx > 0 ? 'pt-4 sm:pt-0 lg:pl-8' : ''}`}
              >
                <div className="font-serif text-[20px] font-semibold text-[#0D2C44] tabular-nums">
                  {fact.value}
                </div>
                <div className="text-[13.5px] text-[#0D2C44]/70 mt-1">
                  {fact.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
