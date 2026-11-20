import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, X, Check, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RECIPES, PRODUCTS, Recipe } from '../data/delamarisData';
import { SmartImage } from './SmartImage';

type RecipeFilter = 'All Recipes' | 'Quick & Light' | 'Salads & Bowls' | 'Warm Dishes';

const RECIPE_FILTERS: RecipeFilter[] = [
  'All Recipes',
  'Quick & Light',
  'Salads & Bowls',
  'Warm Dishes',
];

interface RecipesSectionProps {
  externalRecipeId: string | null;
  onClearExternalRecipe: () => void;
  onSelectProduct?: (productId: string) => void;
}

export const RecipesSection: React.FC<RecipesSectionProps> = ({
  externalRecipeId,
  onClearExternalRecipe,
  onSelectProduct,
}) => {
  const [filter, setFilter] = useState<RecipeFilter>('All Recipes');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [servingMultiplier, setServingMultiplier] = useState<1 | 2>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (externalRecipeId) {
      const found = RECIPES.find((r) => r.id === externalRecipeId);
      if (found) {
        setActiveRecipe(found);
        setServingMultiplier(1);
        setCheckedIngredients({});
      }
      onClearExternalRecipe();
    }
  }, [externalRecipeId, onClearExternalRecipe]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveRecipe(null);
    };
    if (activeRecipe) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [activeRecipe]);

  const openRecipe = (recipe: Recipe) => {
    setActiveRecipe(recipe);
    setServingMultiplier(1);
    setCheckedIngredients({});
  };

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const formatAmount = (amount: number) => {
    const val = amount * servingMultiplier;
    return Number.isInteger(val) ? String(val) : val.toFixed(1).replace(/\.0$/, '');
  };

  const filteredRecipes =
    filter === 'All Recipes'
      ? RECIPES
      : RECIPES.filter((r) => r.category === filter);

  const featuredProduct = activeRecipe
    ? PRODUCTS.find((p) => p.id === activeRecipe.featuredProductId)
    : null;

  return (
    <section
      id="recipes"
      className="py-20 lg:py-28 bg-[#EFEAE0]/55 border-t border-[#0D2C44]/8 scroll-mt-[112px]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Header & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="max-w-[600px]">
            <p className="text-[13px] font-semibold tracking-[0.06em] text-[#24636C] mb-3">
              Mediterranean Kitchen Inspiration
            </p>
            <h2 className="font-serif text-[clamp(2rem,3.4vw,3rem)] font-semibold text-[#0D2C44] leading-[1.14]">
              Effortless Seafood Recipes for Every Table
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter recipes by dish type"
            className="flex flex-wrap items-center gap-2"
          >
            {RECIPE_FILTERS.map((item) => {
              const selected = filter === item;
              return (
                <button
                  key={item}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-2 text-[13.5px] font-semibold rounded-md transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D46146] ${
                    selected
                      ? 'bg-[#0D2C44] text-[#FAF7F2]'
                      : 'bg-[#EFEAE0]/80 text-[#0D2C44]/80 hover:bg-[#E2D9C9]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Authentic Recipe Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredRecipes.map((recipe) => (
              <motion.article
                key={recipe.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col bg-[#FFFFFF] rounded-xl border border-[#0D2C44]/8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(13,44,68,0.09)]"
              >
                <div
                  onClick={() => openRecipe(recipe)}
                  className="cursor-pointer aspect-[4/3] overflow-hidden bg-[#EFEAE0]"
                >
                  <SmartImage
                    src={recipe.image}
                    alt={recipe.imageAlt}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col flex-1 p-6">
                  {/* Quiet Unboxed Recipe Metadata */}
                  <div className="flex items-center gap-2 text-[12.5px] font-medium text-[#24636C] mb-2">
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Clock className="w-3.5 h-3.5" />
                      {recipe.prepTime}
                    </span>
                    <span aria-hidden="true" className="text-[#0D2C44]/30">
                      ·
                    </span>
                    <span className="text-[#0D2C44]/60 tabular-nums">
                      {recipe.servings} servings
                    </span>
                    <span aria-hidden="true" className="text-[#0D2C44]/30">
                      ·
                    </span>
                    <span className="text-[#0D2C44]/60">{recipe.difficulty}</span>
                  </div>

                  <h3 className="font-serif text-[21px] font-semibold text-[#0D2C44] leading-snug mb-2.5">
                    {recipe.title}
                  </h3>

                  <p className="text-[14.5px] leading-[1.64] text-[#0D2C44]/72 mb-6 flex-1">
                    {recipe.shortDescription}
                  </p>

                  <div className="pt-4 border-t border-[#0D2C44]/8 flex items-center justify-between">
                    <span className="text-[12.5px] text-[#0D2C44]/55">
                      {recipe.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => openRecipe(recipe)}
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0D2C44] hover:text-[#D46146] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D46146]"
                    >
                      <span>View Recipe</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Recipe Modal */}
      <AnimatePresence>
        {activeRecipe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveRecipe(null)}
            className="fixed inset-0 z-50 bg-[#081E30]/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recipe-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[820px] max-h-[90vh] bg-[#FAF7F2] rounded-2xl overflow-y-auto shadow-2xl border border-[#0D2C44]/12"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#0D2C44]/10">
                <div className="flex items-center gap-2.5 text-[13px] font-medium text-[#24636C]">
                  <span>{activeRecipe.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums text-[#0D2C44]/70">
                    {activeRecipe.prepTime}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums text-[#0D2C44]/70">
                    {activeRecipe.servings * servingMultiplier} servings
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveRecipe(null)}
                  aria-label="Close recipe"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#0D2C44] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-6 aspect-[4/3] rounded-xl overflow-hidden bg-[#EFEAE0]">
                    <SmartImage
                      src={activeRecipe.image}
                      alt={activeRecipe.imageAlt}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-6 space-y-4">
                    <h3
                      id="recipe-modal-title"
                      className="font-serif text-[28px] font-semibold text-[#0D2C44] leading-tight"
                    >
                      {activeRecipe.title}
                    </h3>
                    <p className="text-[15px] leading-[1.68] text-[#0D2C44]/78">
                      {activeRecipe.shortDescription}
                    </p>
                    {featuredProduct && (
                      <div className="pt-3 border-t border-[#0D2C44]/10 text-[13.5px] flex items-center justify-between">
                        <div>
                          <span className="text-[#24636C] font-semibold">
                            Featured Product:{' '}
                          </span>
                          <span className="text-[#0D2C44] font-medium">
                            {featuredProduct.name}
                          </span>
                        </div>
                        {onSelectProduct && (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveRecipe(null);
                              onSelectProduct(featuredProduct.id);
                            }}
                            className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#D46146] hover:underline cursor-pointer ml-2"
                          >
                            <span>View Product →</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Ingredients & Instructions */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-[#0D2C44]/10">
                  {/* Checkable Ingredients */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-[20px] font-semibold text-[#0D2C44]">
                        Ingredients
                      </h4>
                      <div className="inline-flex items-center gap-1 p-0.5 bg-[#EFEAE0] rounded-md">
                        <button
                          type="button"
                          onClick={() => setServingMultiplier(1)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[12px] font-semibold rounded transition-colors cursor-pointer tabular-nums ${
                            servingMultiplier === 1
                              ? 'bg-[#0D2C44] text-[#FAF7F2]'
                              : 'text-[#0D2C44]/70 hover:text-[#0D2C44]'
                          }`}
                        >
                          <Users className="w-3 h-3" />
                          <span>{activeRecipe.servings}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setServingMultiplier(2)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[12px] font-semibold rounded transition-colors cursor-pointer tabular-nums ${
                            servingMultiplier === 2
                              ? 'bg-[#0D2C44] text-[#FAF7F2]'
                              : 'text-[#0D2C44]/70 hover:text-[#0D2C44]'
                          }`}
                        >
                          <Users className="w-3 h-3" />
                          <span>{activeRecipe.servings * 2}</span>
                        </button>
                      </div>
                    </div>

                    <ul className="space-y-2.5">
                      {activeRecipe.ingredients.map((ing, idx) => {
                        const checked = !!checkedIngredients[idx];
                        return (
                          <li key={idx}>
                            <button
                              type="button"
                              onClick={() => toggleIngredient(idx)}
                              className="w-full text-left flex items-start gap-3 py-1 text-[14px] leading-snug cursor-pointer group"
                            >
                              <span
                                className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                  checked
                                    ? 'bg-[#24636C] border-[#24636C] text-[#FAF7F2]'
                                    : 'border-[#0D2C44]/30 group-hover:border-[#D46146]'
                                }`}
                              >
                                {checked && <Check className="w-3 h-3" strokeWidth={2.5} />}
                              </span>
                              <span
                                className={
                                  checked
                                    ? 'line-through text-[#0D2C44]/40'
                                    : 'text-[#0D2C44]/82'
                                }
                              >
                                <strong className="font-semibold text-[#0D2C44] tabular-nums">
                                  {formatAmount(ing.amount)} {ing.unit}
                                </strong>{' '}
                                {ing.item}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div className="md:col-span-7 space-y-4">
                    <h4 className="font-serif text-[20px] font-semibold text-[#0D2C44]">
                      Preparation
                    </h4>
                    <ol className="space-y-4">
                      {activeRecipe.steps.map((step, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3.5 text-[14.5px] leading-[1.68] text-[#0D2C44]/82"
                        >
                          <span className="font-serif text-[16px] font-semibold text-[#D46146] tabular-nums shrink-0 w-5">
                            {idx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-6 p-4 rounded-xl bg-[#EFEAE0] text-[14px] leading-relaxed text-[#0D2C44]/85">
                      <span className="font-semibold text-[#24636C]">
                        Kitchen Note:{' '}
                      </span>
                      {activeRecipe.chefTip}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
