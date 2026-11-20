import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NEWS_ARTICLES, NewsArticle } from '../data/delamarisData';
import { SmartImage } from './SmartImage';

export const NewsSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [activeArticle]);

  return (
    <section
      id="news"
      className="py-20 lg:py-28 bg-[#EFEAE0]/55 border-t border-[#0D2C44]/8 scroll-mt-[112px]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-[560px]">
            <p className="text-[13px] font-semibold tracking-[0.06em] text-[#24636C] mb-3">
              Journal & Brand News
            </p>
            <h2 className="font-serif text-[clamp(2rem,3.4vw,3rem)] font-semibold text-[#0D2C44] leading-[1.14]">
              Stories from the Coast & Kitchen
            </h2>
          </div>

          <p className="text-[15px] leading-[1.66] text-[#0D2C44]/72 max-w-[400px]">
            Updates on our heritage exhibitions, Mediterranean nutrition
            insights, and responsible seafood production.
          </p>
        </div>

        {/* 3 Editorial Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ARTICLES.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col"
            >
              <div
                onClick={() => setActiveArticle(article)}
                className="cursor-pointer aspect-[4/3] rounded-xl overflow-hidden bg-[#E5DDD0] mb-5 border border-[#0D2C44]/8"
              >
                <SmartImage
                  src={article.image}
                  alt={article.imageAlt}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Clean Unboxed Metadata */}
              <div className="flex items-center gap-2 text-[12.5px] font-medium text-[#24636C] mb-2.5">
                <span>{article.category}</span>
                <span aria-hidden="true" className="text-[#0D2C44]/30">
                  ·
                </span>
                <span className="text-[#0D2C44]/60">{article.date}</span>
                <span aria-hidden="true" className="text-[#0D2C44]/30">
                  ·
                </span>
                <span className="text-[#0D2C44]/60">{article.readTime}</span>
              </div>

              <h3
                onClick={() => setActiveArticle(article)}
                className="cursor-pointer font-serif text-[22px] font-semibold text-[#0D2C44] leading-snug mb-3 group-hover:text-[#D46146] transition-colors"
              >
                {article.title}
              </h3>

              <p className="text-[14.5px] leading-[1.66] text-[#0D2C44]/74 mb-5 flex-1">
                {article.excerpt}
              </p>

              <button
                type="button"
                onClick={() => setActiveArticle(article)}
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0D2C44] hover:text-[#D46146] transition-colors self-start cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D46146]"
              >
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 z-50 bg-[#081E30]/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[720px] max-h-[90vh] bg-[#FAF7F2] rounded-2xl overflow-y-auto shadow-2xl border border-[#0D2C44]/12"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#0D2C44]/10">
                <div className="flex items-center gap-2 text-[13px] font-medium text-[#24636C]">
                  <span>{activeArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#0D2C44]/65">{activeArticle.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#0D2C44]/65">{activeArticle.readTime}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  aria-label="Close article"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#0D2C44] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-9 space-y-6">
                <h3
                  id="article-modal-title"
                  className="font-serif text-[28px] sm:text-[32px] font-semibold text-[#0D2C44] leading-tight"
                >
                  {activeArticle.title}
                </h3>

                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#EFEAE0]">
                  <SmartImage
                    src={activeArticle.image}
                    alt={activeArticle.imageAlt}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4 text-[16px] leading-[1.78] text-[#0D2C44]/82">
                  {activeArticle.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
