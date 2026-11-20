/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { MotionConfig } from 'motion/react';
import { ProductCategory, PRODUCTS } from './data/delamarisData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductsSection } from './components/ProductsSection';
import { BrandStorySection } from './components/BrandStorySection';
import { QualitySection } from './components/QualitySection';
import { RecipesSection } from './components/RecipesSection';
import { NewsSection } from './components/NewsSection';
import { ContactFooter } from './components/ContactFooter';

// Ordered to match the exact Navigation Bar sequence:
// Home -> Products -> Recipes -> Our Story -> Quality -> News -> Contact
const SECTION_IDS = [
  'home',
  'products',
  'recipes',
  'our-story',
  'quality',
  'news',
  'contact',
] as const;

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>('All Products');
  const [linkedRecipeId, setLinkedRecipeId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [inquiryProduct, setInquiryProduct] = useState<string | null>(null);

  // Sync URL hash for direct product links and browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product/')) {
        const prodId = hash.replace('#product/', '');
        const exists = PRODUCTS.some((p) => p.id === prodId);
        if (exists) {
          setSelectedProductId(prodId);
          setActiveSection('products');
          const el = document.getElementById('products');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      } else if (hash === '#products') {
        setSelectedProductId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Accurate scroll-spy aligned with sticky navbar height & bottom-of-page detection
  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // If near the very bottom, ensure Contact is highlighted
      if (scrollPosition + viewportHeight >= docHeight - 80) {
        setActiveSection('contact');
        return;
      }

      const offset = 140;
      let current: string = 'home';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollPosition;
        if (scrollPosition + offset >= top) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const navigateToSection = useCallback((id: string) => {
    setActiveSection(id);
    if (id === 'products') {
      setSelectedProductId(null);
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectProduct = useCallback((productId: string | null) => {
    setSelectedProductId(productId);
    if (productId) {
      window.history.pushState(null, '', `#product/${productId}`);
      setActiveSection('products');
    } else {
      window.history.pushState(null, '', '#products');
    }
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleOpenRecipeById = useCallback((recipeId: string) => {
    setLinkedRecipeId(recipeId);
    setActiveSection('recipes');
    const el = document.getElementById('recipes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleClearExternalRecipe = useCallback(() => {
    setLinkedRecipeId(null);
  }, []);

  const handleInquireProduct = useCallback((productName: string) => {
    setInquiryProduct(productName);
    setActiveSection('contact');
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FAF7F2] text-[#0D2C44] flex flex-col">
        <Navbar
          activeSection={activeSection}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSelectedProductId(null);
          }}
          onNavigateSection={navigateToSection}
          onSelectProduct={handleSelectProduct}
        />

        <main className="flex-1">
          <Hero
            onExploreProducts={() => {
              setSelectedProductId(null);
              navigateToSection('products');
            }}
            onDiscoverRecipes={() => navigateToSection('recipes')}
          />

          <ProductsSection
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onOpenRecipeById={handleOpenRecipeById}
            selectedProductId={selectedProductId}
            onSelectProduct={handleSelectProduct}
            onInquireProduct={handleInquireProduct}
          />

          <RecipesSection
            externalRecipeId={linkedRecipeId}
            onClearExternalRecipe={handleClearExternalRecipe}
            onSelectProduct={handleSelectProduct}
          />

          <BrandStorySection />

          <QualitySection />

          <NewsSection />
        </main>

        <ContactFooter
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSelectedProductId(null);
          }}
          inquiryProduct={inquiryProduct}
        />
      </div>
    </MotionConfig>
  );
}
