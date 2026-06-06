/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenInquiry: () => void;
  onNavigate?: (id: string) => void;
  currentPage?: 'home' | 'gallery';
}

export default function Navbar({ onOpenInquiry, onNavigate, currentPage = 'home' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Top micro-contact bar */}
      <div className="bg-[#102A72] text-[11px] text-white/80 py-2 border-b border-white/5 md:block hidden transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center font-mono">
          <div className="flex items-center space-x-6">
            <a href="tel:08124305552" className="flex items-center space-x-1 hover:text-[#D4A437] transition-colors">
              <Phone className="h-3.5 w-3.5 text-[#D4A437]" />
              <span>08124305552</span>
            </a>
            <a href="mailto:landiquireassociates@gmail.com" className="flex items-center space-x-1 hover:text-[#D4A437] transition-colors">
              <Mail className="h-3.5 w-3.5 text-[#D4A437]" />
              <span>landiquireassociates@gmail.com</span>
            </a>
          </div>
          <div className="text-[#D4A437] font-sans tracking-wider uppercase font-semibold">
            Licensed Registered Survey Properties
          </div>
        </div>
      </div>

      {/* Main glassmorphism navigation */}
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#102A72]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
            : 'bg-[#102A72]/85 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
        id="main-nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="flex items-center space-x-3">
                <img
                  src="https://imgur.com/WNdqBl3.png"
                  alt="Landiquire Logo"
                  className="h-10 w-10 object-contain bg-white/5 p-1 border border-brand-gold/30 transition-transform hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="font-sans text-lg font-bold tracking-tight text-white block uppercase">
                    Landiquire <span className="text-brand-gold">Associates</span>
                  </span>
                  <span className="text-[9px] tracking-[0.25em] text-white/50 uppercase block font-semibold leading-none">
                    Investment Partners
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center space-x-8">
              {[
                { name: 'Home', id: 'hero' },
                { name: 'About Partners', id: 'about' },
                { name: 'El Mirage', id: 'property' },
                { name: 'Why Invest', id: 'why-invest' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'FAQs', id: 'faq' },
                { name: 'Contact Us', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-xs font-bold uppercase tracking-widest text-[#F5F7FA]/90 hover:text-brand-gold transition-all relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-brand-gold after:transition-all hover:cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center px-6 py-2.5 bg-brand-gold text-white text-xs font-bold tracking-widest uppercase hover:bg-[#b88c2b] shadow-lg transition-colors hover:cursor-pointer"
                id="btn-nav-cta"
              >
                Book Inspection
              </button>
            </div>

            {/* Mobile Hamburger menu */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-[#D4A437] p-2 rounded-md transition-colors"
                id="btn-mobile-menu"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-brand-primary border-t border-white/5 px-2 pt-2 pb-4 space-y-1 shadow-inner animate-fade-in">
            {[
              { name: 'Home', id: 'hero' },
              { name: 'About Partners', id: 'about' },
              { name: 'El Mirage Estate', id: 'property' },
              { name: 'Why Invest Here', id: 'why-invest' },
              { name: 'Property Gallery', id: 'gallery' },
              { name: 'FAQs', id: 'faq' },
              { name: 'Contact Form', id: 'contact' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#F5F7FA]/90 hover:bg-brand-secondary hover:text-brand-gold transition-colors"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 px-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full text-center py-3 bg-brand-gold text-white text-xs font-bold tracking-widest uppercase transition-colors"
              >
                Book Inspection
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
