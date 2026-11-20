import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Send,
  CheckCircle2,
} from 'lucide-react';
import {
  VERIFIED_CONTACT,
  ProductCategory,
} from '../data/delamarisData';
import { DelamarisLogo } from './DelamarisLogo';

interface ContactFooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  inquiryProduct?: string | null;
}

const FOOTER_CATEGORIES: ProductCategory[] = [
  'Mackerel',
  'Tuna',
  'Sardines',
  'Pâté',
  'Fish Salads',
  'All Products',
];

export const ContactFooter: React.FC<ContactFooterProps> = ({
  onSelectCategory,
  inquiryProduct,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (inquiryProduct) {
      setTopic(`Product Inquiry: ${inquiryProduct}`);
      setMessage(`Hello Delamaris team, I would like to inquire about ${inquiryProduct} (product details, distribution, and store availability).`);
      setSubmitted(false);
    }
  }, [inquiryProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete your name, email address, and message.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setTopic('Product Inquiry');
    setMessage('');
    setSubmitted(false);
    setError('');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategoryJump = (category: ProductCategory) => {
    onSelectCategory(category);
    scrollToSection('products');
  };

  return (
    <>
      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#0D2C44]/8 scroll-mt-[112px]"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Verified Business Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.06em] text-[#24636C] mb-3">
                  Get in Touch
                </p>
                <h2 className="font-serif text-[clamp(2rem,3.4vw,2.85rem)] font-semibold text-[#0D2C44] leading-[1.15] mb-4">
                  Connect With Delamaris
                </h2>
                <p className="text-[15.5px] leading-[1.68] text-[#0D2C44]/74">
                  Questions about our products, international retail
                  distribution, or recipe collaborations? Our team in Slovenia
                  is happy to assist.
                </p>
              </div>

              <div className="space-y-5 pt-4 border-t border-[#0D2C44]/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EFEAE0] flex items-center justify-center text-[#24636C] shrink-0">
                    <MapPin className="w-4.5 h-4.5" strokeWidth={1.7} />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#24636C]">
                      Headquarters & Production
                    </div>
                    <div className="text-[15px] font-semibold text-[#0D2C44] mt-0.5">
                      {VERIFIED_CONTACT.companyName}
                    </div>
                    <div className="text-[14.5px] text-[#0D2C44]/74">
                      {VERIFIED_CONTACT.addressLine1},{' '}
                      {VERIFIED_CONTACT.addressLine2}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EFEAE0] flex items-center justify-center text-[#24636C] shrink-0">
                    <Phone className="w-4.5 h-4.5" strokeWidth={1.7} />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#24636C]">
                      Telephone
                    </div>
                    <a
                      href={VERIFIED_CONTACT.phoneHref}
                      className="text-[15px] font-semibold text-[#0D2C44] hover:text-[#D46146] transition-colors tabular-nums"
                    >
                      {VERIFIED_CONTACT.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EFEAE0] flex items-center justify-center text-[#24636C] shrink-0">
                    <Mail className="w-4.5 h-4.5" strokeWidth={1.7} />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#24636C]">
                      Email
                    </div>
                    <a
                      href={VERIFIED_CONTACT.emailHref}
                      className="text-[15px] font-semibold text-[#0D2C44] hover:text-[#D46146] transition-colors"
                    >
                      {VERIFIED_CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EFEAE0] flex items-center justify-center text-[#24636C] shrink-0">
                    <Clock className="w-4.5 h-4.5" strokeWidth={1.7} />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#24636C]">
                      Office Hours
                    </div>
                    <div className="text-[14.5px] text-[#0D2C44]/78 tabular-nums">
                      {VERIFIED_CONTACT.hours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-[#0D2C44]/10">
                <div className="text-[13px] font-semibold text-[#24636C] mb-3">
                  Follow Delamaris
                </div>
                <div className="flex flex-wrap items-center gap-5">
                  {VERIFIED_CONTACT.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[14.5px] font-semibold text-[#0D2C44] hover:text-[#D46146] transition-colors"
                    >
                      <span>{social.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Contact Form */}
            <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl border border-[#0D2C44]/10 p-7 sm:p-10">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#24636C]/12 text-[#24636C] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-[26px] font-semibold text-[#0D2C44]">
                    Thank You for Reaching Out
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#0D2C44]/74 max-w-[42ch] mx-auto">
                    Your inquiry regarding <strong>{topic}</strong> has been
                    prepared for our team at {VERIFIED_CONTACT.email}. We
                    typically reply within two business days.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-2 inline-flex items-center justify-center px-5 py-2.5 text-[14px] font-semibold text-[#0D2C44] bg-[#EFEAE0] hover:bg-[#E2D9C9] rounded-md transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <h3 className="font-serif text-[24px] font-semibold text-[#0D2C44]">
                      Send Us a Message
                    </h3>
                    <p className="text-[14px] text-[#0D2C44]/65 mt-1">
                      All fields marked with * are required.
                    </p>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-lg bg-[#D46146]/10 border border-[#D46146]/30 text-[13.5px] font-medium text-[#A13D27]"
                    >
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[13.5px] font-semibold text-[#0D2C44] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ana Kovač"
                        className="w-full px-4 py-3 text-[14.5px] text-[#0D2C44] bg-[#FAF7F2] border border-[#0D2C44]/16 rounded-lg focus:outline-none focus:border-[#24636C] focus:ring-2 focus:ring-[#24636C]/15 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[13.5px] font-semibold text-[#0D2C44] mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ana@example.eu"
                        className="w-full px-4 py-3 text-[14.5px] text-[#0D2C44] bg-[#FAF7F2] border border-[#0D2C44]/16 rounded-lg focus:outline-none focus:border-[#24636C] focus:ring-2 focus:ring-[#24636C]/15 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-[13.5px] font-semibold text-[#0D2C44] mb-1.5"
                    >
                      Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-3 text-[14.5px] text-[#0D2C44] bg-[#FAF7F2] border border-[#0D2C44]/16 rounded-lg focus:outline-none focus:border-[#24636C] focus:ring-2 focus:ring-[#24636C]/15 transition-all"
                    >
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Retail & Export Distribution">
                        Retail & Export Distribution
                      </option>
                      <option value="Quality & Nutrition">
                        Quality & Nutrition
                      </option>
                      <option value="Media & Press">Media & Press</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[13.5px] font-semibold text-[#0D2C44] mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 text-[14.5px] text-[#0D2C44] bg-[#FAF7F2] border border-[#0D2C44]/16 rounded-lg focus:outline-none focus:border-[#24636C] focus:ring-2 focus:ring-[#24636C]/15 transition-all resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0D2C44] hover:bg-[#D46146] text-[#FAF7F2] text-[14.5px] font-semibold rounded-md transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D46146]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Deep Ocean Footer */}
      <footer className="bg-[#081E30] text-[#FAF7F2]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#FAF7F2]/12">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-5">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('home');
                }}
                aria-label="Delamaris Home"
              >
                <DelamarisLogo variant="light" size="lg" />
              </a>
              <p className="text-[14.5px] leading-[1.68] text-[#FAF7F2]/72 max-w-[34ch]">
                Authentic Adriatic and Mediterranean canned fish specialties
                crafted with 100% natural ingredients since 1879. Part of the{' '}
                {VERIFIED_CONTACT.groupName}.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="lg:col-span-2 space-y-3.5">
              <h3 className="font-serif text-[17px] font-semibold text-[#FAF7F2]">
                Explore
              </h3>
              <ul className="space-y-2.5 text-[14px] text-[#FAF7F2]/72">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'products', label: 'Products' },
                  { id: 'recipes', label: 'Recipes' },
                  { id: 'our-story', label: 'Our Story' },
                  { id: 'quality', label: 'Quality' },
                  { id: 'news', label: 'News' },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      className="hover:text-[#E6A492] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Categories Column */}
            <div className="lg:col-span-3 space-y-3.5">
              <h3 className="font-serif text-[17px] font-semibold text-[#FAF7F2]">
                Product Categories
              </h3>
              <ul className="space-y-2.5 text-[14px] text-[#FAF7F2]/72">
                {FOOTER_CATEGORIES.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => handleCategoryJump(category)}
                      className="hover:text-[#E6A492] transition-colors cursor-pointer"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Contact Column */}
            <div className="lg:col-span-3 space-y-3.5">
              <h3 className="font-serif text-[17px] font-semibold text-[#FAF7F2]">
                Contact
              </h3>
              <address className="not-italic space-y-2 text-[14px] text-[#FAF7F2]/72 leading-relaxed">
                <div className="text-[#FAF7F2] font-medium">
                  {VERIFIED_CONTACT.companyName}
                </div>
                <div>
                  {VERIFIED_CONTACT.addressLine1},{' '}
                  {VERIFIED_CONTACT.addressLine2}
                </div>
                <div>
                  <a
                    href={VERIFIED_CONTACT.phoneHref}
                    className="hover:text-[#E6A492] transition-colors tabular-nums"
                  >
                    {VERIFIED_CONTACT.phone}
                  </a>
                </div>
                <div>
                  <a
                    href={VERIFIED_CONTACT.emailHref}
                    className="hover:text-[#E6A492] transition-colors"
                  >
                    {VERIFIED_CONTACT.email}
                  </a>
                </div>
              </address>
            </div>
          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#FAF7F2]/58">
            <div>
              © {new Date().getFullYear()} {VERIFIED_CONTACT.companyName} All
              rights reserved.
            </div>
            <div className="flex items-center gap-6">
              {VERIFIED_CONTACT.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF7F2] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
