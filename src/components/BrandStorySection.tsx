import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HERITAGE_MILESTONES } from '../data/delamarisData';
import { SmartImage } from './SmartImage';

export const BrandStorySection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>(
    HERITAGE_MILESTONES[0].year
  );

  const activeMilestone =
    HERITAGE_MILESTONES.find((m) => m.year === selectedYear) ||
    HERITAGE_MILESTONES[0];

  return (
    <section
      id="our-story"
      className="py-20 lg:py-28 bg-[#0D2C44] text-[#FAF7F2] scroll-mt-[112px]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Top Editorial Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch mb-16 lg:mb-20">
          {/* Left Narrative Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between space-y-8"
          >
            <div>
              <p className="text-[13px] font-semibold tracking-[0.08em] text-[#E6A492] mb-3">
                Our Heritage · Since 1879
              </p>
              <h2 className="font-serif text-[clamp(2rem,3.6vw,3.15rem)] font-semibold leading-[1.12] text-[#FAF7F2] mb-6">
                More Than 145 Years of Adriatic Mastery
              </h2>
              <p className="text-[16px] leading-[1.72] text-[#FAF7F2]/82 tracking-[0.01em] mb-5">
                Born along the sun-drenched harbor of Izola in 1879, Delamaris
                grew out of a deep respect for the Adriatic Sea and the coastal
                communities who knew how to preserve fish naturally—without
                shortcuts or chemical additives.
              </p>
              <p className="text-[15.5px] leading-[1.72] text-[#FAF7F2]/75 tracking-[0.01em]">
                Today, in our modern production facility in Kal pri Pivki, we
                pair generations of traditional seafood expertise with
                contemporary European food safety, creating natural, nourishing
                meals tailored to modern everyday lifestyles.
              </p>
            </div>

            {/* Interactive Heritage Timeline */}
            <div className="pt-7 border-t border-[#FAF7F2]/15">
              <div
                role="tablist"
                aria-label="Delamaris heritage milestones"
                className="flex flex-wrap items-center gap-2 mb-6"
              >
                {HERITAGE_MILESTONES.map((item) => {
                  const isActive = item.year === selectedYear;
                  return (
                    <button
                      key={item.year}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      onClick={() => setSelectedYear(item.year)}
                      className={`px-4 py-2 text-[13.5px] font-semibold rounded-md transition-colors duration-200 tabular-nums whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D46146] ${
                        isActive
                          ? 'bg-[#D46146] text-[#FAF7F2]'
                          : 'bg-[#FAF7F2]/10 text-[#FAF7F2]/75 hover:bg-[#FAF7F2]/18 hover:text-[#FAF7F2]'
                      }`}
                    >
                      {item.year}
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={activeMilestone.year}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="min-h-[120px]"
              >
                <div className="text-[12.5px] font-medium text-[#A8C5D4] mb-1.5">
                  {activeMilestone.location}
                </div>
                <h3 className="font-serif text-[23px] font-semibold text-[#FAF7F2] mb-2">
                  {activeMilestone.title}
                </h3>
                <p className="text-[14.5px] leading-[1.68] text-[#FAF7F2]/78">
                  {activeMilestone.summary}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Primary Documentary Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <figure className="h-full flex flex-col">
              <div className="flex-1 min-h-[340px] lg:min-h-0 rounded-xl overflow-hidden border border-[#FAF7F2]/12">
                <SmartImage
                  src="/src/assets/images/story_adriatic_heritage_1795154801411.jpg"
                  alt="Traditional wooden fishing boats moored in the historic stone harbor of Izola on the Slovenian Adriatic coast at golden hour dawn"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-[12.5px] text-[#A8C5D4] mt-3">
                Izola Harbor, Slovenian Adriatic Coast — birthplace of Delamaris
                maritime craft in 1879.
              </figcaption>
            </figure>
          </motion.div>
        </div>

        {/* Bottom Modern Craftsmanship Band */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-14 border-t border-[#FAF7F2]/12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#FAF7F2]/12">
              <SmartImage
                src="/src/assets/images/story_modern_craft_1795154799516.jpg"
                alt="European seafood specialist inspecting fresh silver mackerel fillets alongside bowls of ripe red tomatoes, herbs, and golden olive oil"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8"
          >
            {[
              {
                index: '01.',
                title: 'Traditional Seafood Expertise',
                body: 'Generations of careful fish selection, clean filleting, and gentle steam preparation preserve delicate coastal flavor and tender bite.',
              },
              {
                index: '02.',
                title: 'Quality Natural Ingredients',
                body: 'Wild-caught mackerel, sardines, and tuna paired exclusively with crisp vegetables, Mediterranean olive oil, and fragrant herbs.',
              },
              {
                index: '03.',
                title: 'Modern European Production',
                body: 'Our state-of-the-art plant in Kal pri Pivki ensures precision hygiene, natural thermal preservation, and full batch traceability.',
              },
              {
                index: '04.',
                title: 'Made for Modern Lifestyles',
                body: 'Wholesome, ready-to-serve seafood nourishment that fits effortlessly into busy workdays, family dinners, and outdoor adventures.',
              },
            ].map((pillar) => (
              <div key={pillar.title} className="space-y-2">
                <div className="text-[13px] font-semibold text-[#E6A492] tabular-nums">
                  {pillar.index}
                </div>
                <h3 className="font-serif text-[20px] font-semibold text-[#FAF7F2]">
                  {pillar.title}
                </h3>
                <p className="text-[14.5px] leading-[1.66] text-[#FAF7F2]/75">
                  {pillar.body}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
