import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  UtensilsCrossed,
  ShieldCheck,
  HeartPulse,
  Leaf,
  Share2,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  Product,
  ProductCategory,
  PRODUCTS,
  RECIPES,
} from '../data/delamarisData';
import { SmartImage } from './SmartImage';
import { ProductTinImage } from './ProductTinImage';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onSelectCategory: (category: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
  onOpenRecipeById: (recipeId: string) => void;
  onInquireProduct?: (productName: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onSelectCategory,
  onSelectProduct,
  onOpenRecipeById,
  onInquireProduct,
}) => {
  // Find linked recipe if exists
  const pairedRecipe = RECIPES.find(
    (r) => r.id === product.recommendedRecipeId || r.featuredProductId === product.id
  );

  // Other products in the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  // Ensure scroll position is aligned to the top of the section when switching products
  useEffect(() => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [product.id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} — Delamaris`,
        text: product.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const handleInquire = () => {
    if (onInquireProduct) {
      onInquireProduct(product.name);
    } else {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-12 lg:space-y-16"
    >
      {/* Top Breadcrumb & Back Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#0D2C44]/10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-[13.5px] font-semibold text-[#0D2C44] bg-[#EFEAE0] hover:bg-[#0D2C44] hover:text-[#FAF7F2] rounded-lg transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D46146]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Products</span>
          </button>

          <span className="hidden sm:inline text-[#0D2C44]/25">/</span>

          {/* Breadcrumb path */}
          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-[13px] text-[#0D2C44]/70">
            <button
              type="button"
              onClick={() => {
                onSelectCategory(product.category);
                onBack();
              }}
              className="hover:text-[#D46146] transition-colors cursor-pointer font-medium"
            >
              {product.category}
            </button>
            <span className="text-[#0D2C44]/30">/</span>
            <span className="text-[#0D2C44] font-semibold truncate max-w-[240px]">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Share & Category Jump */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-[#24636C]/10 text-[#24636C]">
            <Leaf className="w-3.5 h-3.5" />
            <span>100% Natural</span>
          </span>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Share product"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#EFEAE0] hover:bg-[#E2D9C9] text-[#0D2C44] transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Cinematic Photography & Quality Badges */}
        <div className="lg:col-span-6 space-y-6">
          {product.tinCrop && (
            <div className="p-6 bg-[#FFFFFF] rounded-2xl border border-[#0D2C44]/8 shadow-sm flex flex-col items-center justify-center text-center">
              <span className="text-[12px] font-semibold text-[#24636C] uppercase tracking-wider mb-2">
                Official Delamaris Packaging
              </span>
              <ProductTinImage product={product} className="h-[135px] w-full" />
              <div className="mt-3">
                <div className="font-sans font-extrabold text-[18px] uppercase text-[#0D2C44]">
                  {product.brandTitle}
                </div>
                <div className="font-sans font-bold text-[12.5px] uppercase text-[#0D2C44]/80">
                  {product.subTitle}
                </div>
              </div>
            </div>
          )}

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFEAE0] border border-[#0D2C44]/10 shadow-[0_16px_40px_rgba(13,44,68,0.08)]">
            <SmartImage
              src={product.image}
              alt={product.imageAlt}
              priority
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />

            {/* Overlaid Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-md text-[12px] font-semibold tracking-wide bg-[#0D2C44]/90 text-[#FAF7F2] backdrop-blur-md">
                {product.category}
              </span>
              <span className="px-3 py-1 rounded-md text-[12px] font-semibold tracking-wide bg-[#FAF7F2]/90 text-[#0D2C44] backdrop-blur-md shadow-sm">
                Net {product.netWeight}
              </span>
            </div>

            <div className="absolute bottom-4 right-4">
              <span className="px-3 py-1 rounded-md text-[11.5px] font-semibold tracking-wide bg-[#D46146] text-[#FAF7F2] shadow-sm">
                Zero Preservatives
              </span>
            </div>
          </div>

          {/* Quick Action Bar under image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pairedRecipe && (
              <button
                type="button"
                onClick={() => onOpenRecipeById(pairedRecipe.id)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#24636C] hover:bg-[#1a4a51] text-[#FAF7F2] text-[13.5px] font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-sm hover:-translate-y-0.5"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Pair With Recipe</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleInquire}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#0D2C44] hover:bg-[#D46146] text-[#FAF7F2] text-[13.5px] font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-sm hover:-translate-y-0.5"
            >
              <span>Inquire / Where to Buy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#0D2C44]/8 space-y-3">
            <div className="flex items-center gap-3 text-[13px] text-[#0D2C44]/80">
              <ShieldCheck className="w-4.5 h-4.5 text-[#24636C] shrink-0" />
              <span>Certified European production standards (IFS, ISO 9001, HACCP).</span>
            </div>
            <div className="flex items-center gap-3 text-[13px] text-[#0D2C44]/80">
              <HeartPulse className="w-4.5 h-4.5 text-[#D46146] shrink-0" />
              <span>Naturally rich in essential Omega-3 fatty acids and complete marine protein.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative, Dietary Notes, Ingredients & Nutrition */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#24636C] mb-2">
              <span>Authentic Adriatic Specialty</span>
              <span>·</span>
              <span>Since 1879</span>
            </div>

            <h2 className="font-serif text-[clamp(2.1rem,3.8vw,3rem)] font-semibold text-[#0D2C44] leading-[1.12] mb-4">
              {product.name}
            </h2>

            <p className="text-[17px] leading-relaxed font-medium text-[#0D2C44]/85 mb-4">
              {product.shortDescription}
            </p>

            <p className="text-[15.5px] leading-[1.72] text-[#0D2C44]/75">
              {product.fullDescription}
            </p>
          </div>

          {/* Dietary & Quality Highlights */}
          <div className="p-5 bg-[#FFFFFF] rounded-xl border border-[#0D2C44]/8">
            <h3 className="text-[13px] font-semibold text-[#24636C] uppercase tracking-wider mb-3">
              Key Quality Attributes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.dietaryNotes.map((note) => (
                <div
                  key={note}
                  className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[#0D2C44]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#24636C]/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#24636C]" strokeWidth={2.6} />
                  </div>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Natural Ingredients */}
          <div>
            <h3 className="font-serif text-[19px] font-semibold text-[#0D2C44] mb-3">
              Ingredients
            </h3>
            <div className="p-5 bg-[#FFFFFF] rounded-xl border border-[#0D2C44]/8 space-y-2">
              <ul className="space-y-1.5 text-[14.5px] text-[#0D2C44]/80">
                {product.ingredients.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#D46146] font-bold">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="pt-2 text-[12.5px] text-[#0D2C44]/55 border-t border-[#0D2C44]/6">
                100% natural wild fish, fine oils, and selected vegetables. Zero artificial flavors, colors, or preservatives.
              </p>
            </div>
          </div>

          {/* Nutritional Values Table */}
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="font-serif text-[19px] font-semibold text-[#0D2C44]">
                Nutritional Values
              </h3>
              <span className="text-[12.5px] text-[#0D2C44]/55">
                Per 100 g edible portion
              </span>
            </div>

            <div className="bg-[#FFFFFF] rounded-xl border border-[#0D2C44]/8 divide-y divide-[#0D2C44]/8 overflow-hidden">
              {[
                { label: 'Energy', val: product.nutritionPer100g.energy, highlight: false },
                { label: 'Protein', val: product.nutritionPer100g.protein, highlight: true },
                { label: 'Omega-3 Fatty Acids', val: product.nutritionPer100g.omega3, highlight: true },
                { label: 'Fat', val: product.nutritionPer100g.fat, highlight: false },
                { label: '— of which saturates', val: product.nutritionPer100g.saturatedFat, highlight: false },
                { label: 'Carbohydrates', val: product.nutritionPer100g.carbohydrates, highlight: false },
                { label: 'Salt', val: product.nutritionPer100g.salt, highlight: false },
              ].map((row) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-5 py-3 text-[14px] ${
                    row.highlight ? 'bg-[#24636C]/5 font-semibold' : ''
                  }`}
                >
                  <span className={row.highlight ? 'text-[#24636C]' : 'text-[#0D2C44]/75'}>
                    {row.label}
                  </span>
                  <span className="tabular-nums font-semibold text-[#0D2C44]">
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Serving Suggestion */}
          <div className="p-6 rounded-xl bg-[#EFEAE0] border border-[#0D2C44]/8 space-y-2">
            <div className="text-[12.5px] font-semibold text-[#24636C] uppercase tracking-wider">
              Serving Suggestion
            </div>
            <p className="text-[14.5px] leading-relaxed text-[#0D2C44]/85">
              {product.servingSuggestion}
            </p>
          </div>
        </div>
      </div>

      {/* Paired Recipe Feature Banner */}
      {pairedRecipe && (
        <div className="p-7 lg:p-9 rounded-2xl bg-[#0D2C44] text-[#FAF7F2] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-[#E6A492] tracking-wider uppercase">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Featured Culinary Pairing</span>
              </div>
              <h3 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] font-semibold text-[#FAF7F2] leading-snug">
                {pairedRecipe.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#FAF7F2]/80 max-w-[58ch]">
                {pairedRecipe.shortDescription}
              </p>
              <div className="flex items-center gap-5 pt-2 text-[13px] text-[#FAF7F2]/70">
                <span>⏱ {pairedRecipe.prepTime}</span>
                <span>·</span>
                <span>🍽 {pairedRecipe.servings} Servings</span>
                <span>·</span>
                <span>Difficulty: {pairedRecipe.difficulty}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <button
                type="button"
                onClick={() => onOpenRecipeById(pairedRecipe.id)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D46146] hover:bg-[#BA4E35] text-[#FAF7F2] text-[14px] font-semibold rounded-xl transition-colors cursor-pointer shadow-md"
              >
                <span>View Full Recipe Steps</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onBack}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/15 text-[#FAF7F2] text-[14px] font-semibold rounded-xl transition-colors cursor-pointer border border-[#FAF7F2]/15"
              >
                <span>Browse Other Products</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explore More in this Category */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-[#0D2C44]/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12.5px] font-semibold text-[#24636C] uppercase tracking-wider mb-1">
                More Delamaris Specialties
              </p>
              <h3 className="font-serif text-[24px] font-semibold text-[#0D2C44]">
                Also in {product.category}
              </h3>
            </div>
            <button
              type="button"
              onClick={onBack}
              className="text-[13.5px] font-semibold text-[#24636C] hover:text-[#D46146] transition-colors cursor-pointer"
            >
              See All Products ({PRODUCTS.length}) →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                onClick={() => onSelectProduct(relProduct)}
                className="group p-4 bg-[#FFFFFF] rounded-xl border border-[#0D2C44]/8 hover:shadow-[0_16px_36px_rgba(13,44,68,0.08)] transition-all duration-200 cursor-pointer flex gap-4 items-center"
              >
                <div className="w-24 h-20 rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 flex items-center justify-center p-1">
                  <ProductTinImage product={relProduct} className="w-full h-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11.5px] font-semibold text-[#24636C] mb-0.5">
                    {relProduct.netWeight}
                  </div>
                  <h4 className="font-sans font-extrabold text-[14px] text-[#0D2C44] leading-tight group-hover:text-[#D46146] transition-colors truncate">
                    {relProduct.brandTitle || relProduct.name}
                  </h4>
                  <p className="font-sans font-bold text-[11.5px] text-[#0D2C44]/75 truncate">
                    {relProduct.subTitle || relProduct.category}
                  </p>
                  <div className="inline-flex items-center gap-1 text-[12px] font-bold text-[#24636C] mt-1 group-hover:translate-x-1 transition-transform">
                    <span>See product</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
