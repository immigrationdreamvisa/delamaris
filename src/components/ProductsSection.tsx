import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  Product,
  ProductCategory,
} from '../data/delamarisData';
import { ProductTinImage } from './ProductTinImage';
import { ProductDetailView } from './ProductDetailView';

interface ProductsSectionProps {
  selectedCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
  onOpenRecipeById: (recipeId: string) => void;
  selectedProductId?: string | null;
  onSelectProduct?: (productId: string | null) => void;
  onInquireProduct?: (productName: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  selectedCategory,
  onCategoryChange,
  onOpenRecipeById,
  selectedProductId,
  onSelectProduct,
  onInquireProduct,
}) => {
  const [internalActiveProduct, setInternalActiveProduct] =
    useState<Product | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Sync external selectedProductId if provided
  useEffect(() => {
    if (selectedProductId !== undefined) {
      if (selectedProductId) {
        const found = PRODUCTS.find((p) => p.id === selectedProductId);
        setInternalActiveProduct(found || null);
      } else {
        setInternalActiveProduct(null);
      }
    }
  }, [selectedProductId]);

  const activeProduct = internalActiveProduct;

  const handleSelectProduct = (product: Product | null) => {
    setInternalActiveProduct(product);
    if (onSelectProduct) {
      onSelectProduct(product ? product.id : null);
    }
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredProducts =
    selectedCategory === 'All Products'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const checkScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [filteredProducts]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = 280;
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      id="products"
      className="py-20 lg:py-28 bg-[#FFFFFF] scroll-mt-[112px]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {activeProduct ? (
          /* Specific Dedicated Product Detail Section (Opened on "See product") */
          <ProductDetailView
            product={activeProduct}
            onBack={() => handleSelectProduct(null)}
            onSelectCategory={(cat) => {
              onCategoryChange(cat);
              handleSelectProduct(null);
            }}
            onSelectProduct={(p) => handleSelectProduct(p)}
            onOpenRecipeById={onOpenRecipeById}
            onInquireProduct={onInquireProduct}
          />
        ) : (
          /* Official Delamaris Tin Carousel Layout */
          <div>
            {/* Header & Category Tabs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#0D2C44]/8">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.08em] text-[#24636C] uppercase mb-2">
                  Mediterranean Specialties · Since 1879
                </p>
                <h2 className="font-serif text-[clamp(2.1rem,3.6vw,3.15rem)] font-semibold text-[#0D2C44] leading-tight">
                  Our Products
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div
                role="tablist"
                aria-label="Filter products by category"
                className="flex flex-wrap items-center gap-2"
              >
                {PRODUCT_CATEGORIES.map((category) => {
                  const isSelected = selectedCategory === category;
                  const count =
                    category === 'All Products'
                      ? PRODUCTS.length
                      : PRODUCTS.filter((p) => p.category === category).length;

                  return (
                    <button
                      key={category}
                      role="tab"
                      type="button"
                      aria-selected={isSelected}
                      onClick={() => onCategoryChange(category)}
                      className={`px-3.5 py-2 text-[13px] font-bold rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#0D2C44] text-[#FAF7F2] shadow-sm'
                          : 'bg-[#F4F5F7] text-[#0D2C44]/75 hover:bg-[#EAECEF] hover:text-[#0D2C44]'
                      }`}
                    >
                      <span>{category}</span>
                      <span
                        className={`ml-1.5 text-[11.5px] tabular-nums ${
                          isSelected ? 'text-[#FAF7F2]/75' : 'text-[#0D2C44]/45'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Official Products Carousel Container */}
            <div className="relative group/carousel">
              {/* Left Arrow Button */}
              {canScrollLeft && (
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  aria-label="Previous products"
                  className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#FAF7F2] border border-[#0D2C44]/15 shadow-md flex items-center justify-center text-[#0D2C44] hover:bg-[#0D2C44] hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Scrollable Track */}
              <div
                ref={carouselRef}
                onScroll={checkScroll}
                className="flex items-stretch gap-6 sm:gap-8 overflow-x-auto scroll-smooth pb-6 pt-2 no-scrollbar snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="w-[260px] sm:w-[280px] shrink-0 snap-start flex flex-col justify-between items-center text-center p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] hover:bg-[#FAF7F2]/50 border border-[#0D2C44]/8 hover:border-[#0D2C44]/16 hover:shadow-[0_16px_36px_rgba(13,44,68,0.08)] transition-all duration-300 group"
                  >
                    {/* Packaging Tin Shot */}
                    <div
                      onClick={() => handleSelectProduct(product)}
                      className="w-full flex items-center justify-center cursor-pointer mb-6 h-[145px]"
                    >
                      <ProductTinImage product={product} />
                    </div>

                    {/* Titles Matching Official Delamaris Styling */}
                    <div className="w-full flex flex-col items-center flex-1">
                      <h3
                        onClick={() => handleSelectProduct(product)}
                        className="font-sans font-extrabold text-[19px] sm:text-[21px] tracking-tight uppercase text-[#0D2C44] leading-tight mb-1.5 cursor-pointer hover:text-[#D46146] transition-colors"
                      >
                        {product.brandTitle}
                      </h3>

                      <p className="font-sans font-bold text-[12.5px] sm:text-[13.5px] tracking-tight uppercase text-[#0D2C44]/85 leading-snug min-h-[36px] flex items-center justify-center">
                        {product.subTitle}
                      </p>
                    </div>

                    {/* Official "See product" Action Button */}
                    <button
                      type="button"
                      onClick={() => handleSelectProduct(product)}
                      className="mt-6 w-full max-w-[160px] py-2.5 px-5 bg-[#F1F3F6] group-hover:bg-[#0D2C44] text-[#0D2C44] group-hover:text-[#FAF7F2] text-[13.5px] font-bold rounded-md transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
                    >
                      <span>See product</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Right Arrow Button (Matching the screenshot arrow) */}
              {canScrollRight && (
                <button
                  type="button"
                  onClick={() => scrollCarousel('right')}
                  aria-label="Next products"
                  className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#FAF7F2] border border-[#0D2C44]/15 shadow-md flex items-center justify-center text-[#0D2C44] hover:bg-[#0D2C44] hover:text-[#FAF7F2] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
