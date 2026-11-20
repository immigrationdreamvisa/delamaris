import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { DelamarisLogo } from './DelamarisLogo';
import { VERIFIED_CONTACT, ProductCategory } from '../data/delamarisData';

interface NavbarProps {
  activeSection: string;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onNavigateSection: (sectionId: string) => void;
  onSelectProduct?: (productId: string | null) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'recipes', label: 'Recipes' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'quality', label: 'Quality' },
  { id: 'news', label: 'News' },
  { id: 'contact', label: 'Contact' },
] as const;

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectCategory,
  onNavigateSection,
  onSelectProduct,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (sectionId === 'products') {
      onSelectCategory('All Products');
      if (onSelectProduct) {
        onSelectProduct(null);
      }
    }
    onNavigateSection(sectionId);
  };

  const handleExploreCatalog = () => {
    onSelectCategory('All Products');
    if (onSelectProduct) {
      onSelectProduct(null);
    }
    setMobileMenuOpen(false);
    onNavigateSection('products');
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/98 backdrop-blur-md shadow-[0_10px_30px_rgba(13,44,68,0.08)]'
          : 'bg-[#FAF7F2]'
      } border-b border-[#0D2C44]/10`}
    >
      {/* Upper Section: Brand Identity & Quick Contact Utility Bar */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-200 ${
            scrolled ? 'h-[60px]' : 'h-[72px]'
          }`}
        >
          {/* Authentic Delamaris Brand Logo & Heritage Tagline */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              aria-label="Delamaris Home"
              className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D46146] rounded-sm shrink-0"
            >
              <DelamarisLogo
                variant="dark"
                imgClassName={
                  scrolled
                    ? 'h-9 sm:h-10 transition-all duration-200'
                    : 'h-10 sm:h-12 md:h-[48px] transition-all duration-200'
                }
              />
            </a>
            <div className="hidden xl:block h-6 w-px bg-[#0D2C44]/15" />
            <span className="hidden xl:inline text-[13px] font-medium text-[#0D2C44]/65 tracking-wide">
              Taste of the Adriatic Sea · Since 1879
            </span>
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Contact quick links on medium & large screens */}
            <div className="hidden md:flex items-center gap-5 text-[13px] text-[#0D2C44]/75">
              <a
                href={VERIFIED_CONTACT.phoneHref}
                className="inline-flex items-center gap-1.5 hover:text-[#D46146] transition-colors tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#24636C]" />
                <span>{VERIFIED_CONTACT.phone}</span>
              </a>
              <a
                href={VERIFIED_CONTACT.emailHref}
                className="hidden lg:inline-flex items-center gap-1.5 hover:text-[#D46146] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#24636C]" />
                <span>{VERIFIED_CONTACT.email}</span>
              </a>
            </div>

            {/* Catalog Action */}
            <button
              type="button"
              onClick={handleExploreCatalog}
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2 text-[13px] font-semibold text-[#FAF7F2] bg-[#0D2C44] hover:bg-[#D46146] rounded-md transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D46146]"
            >
              <span>Explore Catalog</span>
            </button>

            {/* Mobile / Tablet Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-[#0D2C44] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Navigation Section: Pure Direct Links, Zero Dropdowns */}
      <div className="border-t border-[#0D2C44]/10 bg-[#EFEAE0]/55">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="relative flex items-center justify-center h-[48px]">
            {/* Primary Navigation Container holding All Clean Nav Links */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-7 xl:gap-9"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative py-2.5 text-[14px] font-medium transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D46146] rounded-sm ${
                      isActive
                        ? 'text-[#0D2C44] font-semibold'
                        : 'text-[#0D2C44]/75 hover:text-[#0D2C44]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="absolute left-0 right-0 bottom-1 h-[2px] bg-[#D46146] rounded-full"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Mobile / Tablet active location indicator */}
            <div className="lg:hidden absolute left-0 flex items-center gap-2 text-[12px] font-semibold text-[#24636C] uppercase tracking-wider">
              <span>Navigation</span>
              <span className="text-[#0D2C44]/30">·</span>
              <span className="text-[#0D2C44]/75 font-medium lowercase capitalize">
                {activeSection.replace('-', ' ')}
              </span>
            </div>

            {/* Subtle brand assurances pinned to right side */}
            <div className="hidden xl:flex items-center gap-4 text-[12px] text-[#0D2C44]/70 absolute right-0">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#24636C]" />
                100% Natural Wild Fish
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D46146]" />
                Zero Preservatives
              </span>
              <button
                type="button"
                onClick={() => handleNavClick('recipes')}
                className="text-[12px] font-semibold text-[#24636C] hover:text-[#D46146] transition-colors cursor-pointer"
              >
                Recipe Ideas →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Reading Progress Hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: smoothProgress }}
        className={`h-[2px] bg-[#D46146] origin-left will-change-transform transition-opacity duration-200 ${
          scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Responsive Mobile & Tablet Navigation Drawer (No Dropdowns) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-[#FAF7F2] border-t border-[#0D2C44]/10 shadow-[0_20px_40px_rgba(13,44,68,0.12)]"
          >
            <nav
              aria-label="Mobile navigation"
              className="px-6 py-5 space-y-1 max-h-[82vh] overflow-y-auto"
            >
              {/* Dedicated Mobile Nav Section Header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#0D2C44]/10">
                <span className="text-[12px] font-semibold text-[#24636C] uppercase tracking-wider">
                  All Navigation Sections
                </span>
                <span className="text-[11.5px] font-medium text-[#0D2C44]/60">
                  {NAV_ITEMS.length} Sections
                </span>
              </div>

              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`block py-3 text-[16px] font-medium border-b border-[#0D2C44]/8 transition-colors ${
                      isActive
                        ? 'text-[#D46146] font-semibold'
                        : 'text-[#0D2C44]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

              {/* Quick Contact Footer inside Mobile Nav */}
              <div className="pt-4 mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#0D2C44]/75">
                <a
                  href={VERIFIED_CONTACT.phoneHref}
                  className="inline-flex items-center gap-1.5 hover:text-[#D46146] tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#24636C]" />
                  <span>{VERIFIED_CONTACT.phone}</span>
                </a>
                <a
                  href={VERIFIED_CONTACT.emailHref}
                  className="inline-flex items-center gap-1.5 hover:text-[#D46146]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#24636C]" />
                  <span>{VERIFIED_CONTACT.email}</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
