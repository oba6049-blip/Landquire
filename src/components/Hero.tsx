/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenInquiry: () => void;
}

export default function Hero({ onOpenInquiry }: HeroProps) {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const scrollToProperty = () => {
    const element = document.getElementById('property');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-primary">
      {/* Background Image with Deep Blue Overlay & Vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600')`,
        }}
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Hero content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Brand Copy */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Tagline Indicator - Geometric left-gold border */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block border-l-4 border-brand-gold pl-4 text-brand-gold font-bold tracking-widest uppercase text-xs sm:text-sm"
          >
            Investment Opportunity
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white tracking-tight"
          >
            Own a Piece of the Future in <span className="text-brand-gold">Agbara, Lagos</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed mb-10"
          >
            Invest in El Mirage Estate – a rapidly developing property location with affordable pricing, secure documentation, and high growth potential.
          </motion.p>

          {/* Key Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 gap-4 pt-2 max-w-md"
          >
            <div className="flex items-center space-x-2 text-white/90">
              <CheckCircle2 className="h-4.5 w-4.5 text-brand-gold shrink-0" />
              <span className="text-xs font-bold tracking-wider uppercase">Registered Survey</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <CheckCircle2 className="h-4.5 w-4.5 text-brand-gold shrink-0" />
              <span className="text-xs font-bold tracking-wider uppercase">Instant Allocation</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 pt-4"
          >
            <button
              onClick={scrollToProperty}
              className="bg-brand-gold text-white px-8 py-4 font-bold uppercase tracking-widest text-xs shadow-xl transition-all duration-200 hover:bg-[#b88c2b] hover:cursor-pointer"
            >
              View Available Plots
            </button>
            <button
              onClick={scrollToContact}
              className="border border-white/30 px-8 py-4 font-bold uppercase tracking-widest text-xs text-white hover:bg-white/10 transition-colors hover:cursor-pointer"
            >
              Contact Sales
            </button>
          </motion.div>
        </div>

        {/* Right Side: Showcase Luxury Pricing Frame */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full max-w-sm glass-card p-8 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 bg-brand-gold text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
              FEATURED PROJECT
            </div>

            <h3 className="text-2xl font-bold mb-2 text-brand-primary uppercase mt-2">El Mirage Estate</h3>
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-6 font-medium italic">
              <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
              <span>Agbara, Lagos (Near Opic Estate)</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="text-gray-600 font-bold uppercase tracking-wider text-[10px]">300 SQM Plot</div>
                <div className="text-lg font-bold text-brand-primary">₦2.7 Million</div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="text-gray-600 font-bold uppercase tracking-wider text-[10px]">500 SQM Plot</div>
                <div className="text-lg font-bold text-brand-primary">₦4.0 Million</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-600 font-bold uppercase tracking-wider text-[10px]">Title Status</div>
                <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">Registered Survey</div>
              </div>
            </div>

            {/* CTA action inside the pricing card */}
            <div className="mt-8 space-y-4">
              <button
                onClick={onOpenInquiry}
                className="w-full py-3.5 text-center text-xs font-bold uppercase tracking-widest text-white bg-brand-primary hover:bg-brand-secondary transition-colors shadow-md hover:cursor-pointer"
              >
                Inquire Instantly
              </button>
              
              <div className="grid grid-cols-2 gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-widest pt-3 border-t border-gray-100">
                <span>• Secure Ownership</span>
                <span>• Road Network</span>
                <span>• High Appreciation</span>
                <span>• Residential Ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
